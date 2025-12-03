import { getHex, ratioToDisplay, convertToRGBA, calculateContrast, suggestColorAPCA, suggestColorWCAG } from './utils';
import { fontLookupAPCA } from './apca';
import Lang from '../utils/lang';
import Constants from '../utils/constants';

/**
 * Inject contrast colour pickers into tooltip.
 * @param {HTMLElement} container The tooltip container to inject the contrast colour pickers.
 */
export function generateContrastTools(contrastDetails) {
  const { sanitizedText, color, background, fontWeight, fontSize, ratio, textUnderline } = contrastDetails;

  // Initialize variables.
  const hasBackgroundColor = background && background.type !== 'image';
  const backgroundHex = hasBackgroundColor ? getHex(background) : '#000000';
  const foregroundHex = color ? getHex(color) : '#000000';

  // Other properties.
  const hasFontWeight = fontWeight ? `font-weight:${fontWeight};` : '';
  const hasFontSize = fontSize ? `font-size:${fontSize}px;` : '';
  const textDecoration = textUnderline ? `text-decoration:${textUnderline};` : '';

  // If colour or background colour is unknown; visually indicate so.
  const unknownFG = color
    ? '' : 'class="unknown"';
  const unknownBG = background && background.type !== 'image'
    ? '' : 'class="unknown"';
  const unknownFGText = color
    ? '' : `<span class="visually-hidden">(${Lang._('UNKNOWN')})</span>`;
  const unknownBGText = background
    ? '' : `<span class="visually-hidden">(${Lang._('UNKNOWN')})</span>`;

  // Ratio to be displayed.
  let displayedRatio;
  if (Constants.Global.contrastAlgorithm === 'APCA') {
    // If APCA, don't show "unknown" when value is absolute 0.
    displayedRatio = Math.abs(ratio) === 0 ? 0 : (Math.abs(ratio) || Lang._('UNKNOWN'));
  } else {
    // WCAG 2.0 ratio.
    displayedRatio = ratio || Lang._('UNKNOWN');
  }

  // Generate HTML layout.
  const contrastTools = document.createElement('div');
  contrastTools.id = 'contrast-tools';
  contrastTools.innerHTML = `
      <hr aria-hidden="true">
      <div id="contrast" class="badge">${Lang._('CONTRAST')}</div>
      <div id="value" class="badge">${displayedRatio}</div>
      <div id="good" class="badge good-contrast" hidden>${Lang._('GOOD')} <span class="good-icon"></span></div>
      <div id="contrast-preview" style="color:${foregroundHex};${hasBackgroundColor ? `background:${backgroundHex};` : ''}${hasFontWeight + hasFontSize + textDecoration}">${sanitizedText}</div>
      <div id="color-pickers">
        <label for="fg-text">${Lang._('FG')} ${unknownFGText}
          <input type="color" id="fg-input" value="${foregroundHex}" ${unknownFG}/>
        </label>
        <label for="bg">${Lang._('BG')} ${unknownBGText}
          <input type="color" id="bg-input" value="${backgroundHex}" ${unknownBG}/>
        </label>
      </div>`;
  return contrastTools;
}

/**
 * Initializes colour eyedroppers for respective tooltip.
 * This function is referenced within './interface/tooltips.js'.
 * @param {HTMLElement} container The container where the color suggestion will be inserted.
 * @param {Object} contrastDetails Contrast details object containing colour, background, etc.
 */
export function initializeContrastTools(container, contrastDetails) {
  const contrastTools = container?.querySelector('#contrast-tools');
  if (contrastTools) {
    const { fontSize, fontWeight, type, isLargeText } = contrastDetails;

    // Cache selectors
    const contrast = container.querySelector('#contrast');
    const contrastPreview = container.querySelector('#contrast-preview');
    const fgInput = container.querySelector('#fg-input');
    const bgInput = container.querySelector('#bg-input');
    const ratio = container.querySelector('#value');
    const good = container.querySelector('#good');

    // Helper to update badge classes.
    const toggleBadges = (elements, condition) => {
      elements.forEach(($el) => {
        $el.classList.toggle('good-contrast', condition);
        $el.classList.toggle('error-badge', !condition);
      });
    };

    // Update preview colors and contrast on input change.
    const updatePreview = () => {
      const fgColor = fgInput.value;
      const bgColor = bgInput.value;

      // Remove question mark from inputs.
      [fgInput, bgInput].forEach((input) => input.classList.remove('unknown'));

      // Adjust colours in preview area.
      contrastPreview.style.color = fgColor;
      contrastPreview.style.backgroundColor = bgColor;
      contrastPreview.style.backgroundImage = 'none';

      // Get contrast ratio.
      const contrastValue = calculateContrast(
        convertToRGBA(fgColor),
        convertToRGBA(bgColor),
        Constants.Global.contrastAlgorithm,
      );
      const elementsToToggle = [ratio, contrast];

      // APCA
      if (Constants.Global.contrastAlgorithm === 'APCA') {
        const value = contrastValue.ratio;
        ratio.textContent = ratioToDisplay(value, Constants.Global.contrastAlgorithm);
        const fontArray = fontLookupAPCA(value).slice(1);
        const nonTextPasses = value >= 45 && fontArray[0] >= 0 && fontArray[0] <= 777;
        let passes;

        switch (type) {
          case 'svg-error':
          case 'svg-warning': {
            good.hidden = !nonTextPasses;
            passes = nonTextPasses;
            toggleBadges(elementsToToggle, passes);
            break;
          }
          default: {
            const minFontSize = fontArray[Math.floor(fontWeight / 100) - 1];
            passes = fontSize >= minFontSize;
            toggleBadges(elementsToToggle, passes);
            good.hidden = !passes;
            break;
          }
        }
      }

      // WCAG 2.0
      if (Constants.Global.contrastAlgorithm === 'AA' || Constants.Global.contrastAlgorithm === 'AAA') {
        const value = contrastValue.ratio;
        ratio.textContent = ratioToDisplay(value, Constants.Global.contrastAlgorithm);

        const useAAA = Constants.Global.contrastAlgorithm === 'AAA';
        const nonTextThreshold = 3;
        const normalTextThreshold = useAAA ? 7 : 4.5;
        const largeTextThreshold = useAAA ? 4.5 : 3;

        const passesNonText = value >= nonTextThreshold;
        const passesNormalText = value >= normalTextThreshold;
        const passesLargeText = value >= largeTextThreshold;

        switch (type) {
          case 'svg-error':
          case 'svg-text':
          case 'svg-warning': {
            good.hidden = !passesNonText;
            toggleBadges(elementsToToggle, passesNonText);
            break;
          }
          default: {
            if (isLargeText) {
              toggleBadges([ratio, contrast], passesLargeText);
              good.hidden = !passesLargeText;
            } else {
              toggleBadges([ratio, contrast], passesNormalText);
              good.hidden = !passesNormalText;
            }
            break;
          }
        }
      }
    };

    // Event listeners for both colour inputs.
    fgInput.addEventListener('input', updatePreview);
    bgInput.addEventListener('input', updatePreview);

    // Clicking on suggested colour updates preview and saves value to clipboard.
    setTimeout(() => {
      const suggest = container.querySelector('#suggest');
      if (suggest) {
        const updatePreviewWithSuggested = () => {
          const hex = suggest.textContent;
          fgInput.value = hex;
          updatePreview();
          navigator.clipboard.writeText(hex).catch(() => { });
        };
        suggest.addEventListener('click', updatePreviewWithSuggested);
      }
    }, 0);
  }
}

/**
 * Generates and inserts color suggestions for tooltip upon tooltip opening.
 * This function is referenced within './interface/tooltips.js'.
 * For performance reasons, it is only called upon tooltip opening.
 * @param {HTMLElement} container The container where the color suggestion will be inserted.
 */
export function generateColorSuggestion(contrastDetails) {
  let adviceContainer;
  const { color, background, fontWeight, fontSize, isLargeText, type } = contrastDetails;
  if (
    color && background && background.type !== 'image'
    && (type === 'text' || type === 'svg-error' || type === 'input')
  ) {
    const suggested = Constants.Global.contrastAlgorithm === 'APCA'
      ? suggestColorAPCA(color, background, fontWeight, fontSize)
      : suggestColorWCAG(color, background, isLargeText, Constants.Global.contrastAlgorithm);

    let advice;
    const hr = '<hr aria-hidden="true">';
    const style = `color:${suggested.color};background-color:${getHex(contrastDetails.background)};`;
    const colorBadge = `<button id="suggest" class="badge" style="${style}">${suggested.color}</button>`;
    const sizeBadge = `<strong class="normal-badge">${suggested.size}px</strong>`;

    if (Constants.Global.contrastAlgorithm === 'AA' || Constants.Global.contrastAlgorithm === 'AAA') {
      if (suggested.color === null) {
        advice = `${hr} ${Lang._('NO_SUGGESTION')}`;
      } else {
        advice = `${hr} ${Lang._('CONTRAST_COLOR')} ${colorBadge}`;
      }
    } else if (suggested.color && suggested.size) {
      advice = `${hr} ${Lang._('CONTRAST_APCA')} ${colorBadge} ${sizeBadge}`;
    } else if (suggested.color) {
      advice = `${hr} ${Lang._('CONTRAST_COLOR')} ${colorBadge}`;
    } else if (suggested.size) {
      advice = `${hr} ${Lang._('CONTRAST_SIZE')} ${sizeBadge}`;
    }

    // Append it to contrast details container.
    adviceContainer = document.createElement('div');
    adviceContainer.id = 'advice';

    // If low opacity, suggest increase opacity first.
    const suggestion = (contrastDetails.opacity < 1)
      ? `<hr aria-hidden="true"> ${Lang.sprintf('CONTRAST_OPACITY')}` : advice;

    // Append advice to contrast details container.
    adviceContainer.innerHTML = suggestion;
  }
  return adviceContainer;
}
