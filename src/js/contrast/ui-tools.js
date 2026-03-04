import Constants from '../utils/constants';
import Lang from '../utils/lang';
import { fontLookupAPCA } from './apca';
import * as Contrast from './utils';
import { convertToRGBA } from './convertColors';

/**
 * Inject contrast colour pickers into tooltip.
 * @param {HTMLElement} container The tooltip container to inject the contrast colour pickers.
 */
export function generateContrastTools(contrastDetails) {
  const { sanitizedText, color, background, fontWeight, fontSize, ratio, textUnderline } =
    contrastDetails;

  // Initialize variables.
  const hasBackgroundColor = background && background.type !== 'image';
  const backgroundHex = hasBackgroundColor ? Contrast.getHex(background) : '#000000';
  const foregroundHex = color ? Contrast.getHex(color) : '#000000';

  // Other properties.
  const hasFontWeight = fontWeight ? `font-weight:${fontWeight};` : '';
  const hasFontSize = fontSize ? `font-size:${fontSize}px;` : '';
  const textDecoration = textUnderline ? `text-decoration:${textUnderline};` : '';

  // If colour or background colour is unknown; visually indicate so.
  const unknownFG = color ? '' : 'class="unknown"';
  const unknownBG = background && background.type !== 'image' ? '' : 'class="unknown"';
  const unknownFGText = color
    ? ''
    : `<span id="fg-input-unknown" class="visually-hidden">(${Lang._('UNKNOWN')})</span>`;
  const unknownBGText = background
    ? ''
    : `<span id="bg-input-unknown" class="visually-hidden">(${Lang._('UNKNOWN')})</span>`;

  // Ratio to be displayed.
  let displayedRatio;
  if (Constants.Global.contrastAlgorithm === 'APCA') {
    // If APCA, don't show "unknown" when value is absolute 0.
    displayedRatio = Math.abs(ratio) === 0 ? 0 : Math.abs(ratio) || Lang._('UNKNOWN');
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
          <div id="fg-color-wrapper" ${unknownFG}>
            <input type="color" id="fg-input" value="${foregroundHex}" ${unknownFG}/>
          </div>
        </label>
        <label for="bg">${Lang._('BG')} ${unknownBGText}
          <div id="bg-color-wrapper" ${unknownBG}>
            <input type="color" id="bg-input" value="${backgroundHex}" ${unknownBG}/>
          </div>
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
  if (!contrastTools) return;

  const { fontSize: initialFontSize, fontWeight, type, isLargeText } = contrastDetails;

  // Selectors.
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

  // Helper to get the current preview font size in px.
  const getPreviewFontSize = () => {
    // Prefer inline style if present (e.g., from #suggest-size click).
    if (contrastPreview.style.fontSize) {
      const match = contrastPreview.style.fontSize.match(/([\d.]+)/);
      if (match) return parseFloat(match[1]);
    }

    // Fallback to computed style.
    const computed = getComputedStyle(contrastPreview).fontSize;
    if (computed) {
      const match = computed.match(/([\d.]+)/);
      if (match) return parseFloat(match[1]);
    }

    // Final fallback to original size from contrastDetails.
    return initialFontSize;
  };

  // Update preview colors and contrast on input change.
  const updatePreview = (e) => {
    const fgColor = fgInput.value;
    const bgColor = bgInput.value;
    const currentFontSize = getPreviewFontSize();

    // Adjust colours in preview area.
    setTimeout(() => {
      const unknownFG = fgInput.classList.contains('unknown');
      const unknownBG = bgInput.classList.contains('unknown');
      contrastPreview.style.color = unknownFG ? '' : fgColor;
      contrastPreview.style.backgroundColor = unknownBG ? '' : bgColor;
      contrastPreview.style.backgroundImage = unknownBG ? '' : 'none';
    }, 0);

    // Remove question mark from inputs.
    if (e?.target) {
      e.target.classList.remove('unknown');
      e.target.parentElement.classList.remove('unknown');
      container.querySelector(`#${e.target.id}-unknown`)?.remove();
    }

    // Do not calculcate contrast or update badges if either FG or BG is unknown.
    if (fgInput.classList.contains('unknown') || bgInput.classList.contains('unknown')) return;

    // Get contrast ratio.
    const algorithm = Constants.Global.contrastAlgorithm;
    const contrastValue = Contrast.calculateContrast(
      convertToRGBA(fgColor),
      convertToRGBA(bgColor),
      Constants.Global.contrastAlgorithm,
    );
    const elementsToToggle = [ratio, contrast];

    // APCA
    if (algorithm === 'APCA') {
      const value = contrastValue.ratio;
      ratio.textContent = Contrast.displayAPCAValue(value);
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
          passes = currentFontSize >= minFontSize;
          toggleBadges(elementsToToggle, passes);
          good.hidden = !passes;
          break;
        }
      }
    } else {
      // WCAG
      const value = contrastValue.ratio;
      ratio.textContent = Contrast.displayWCAGRatio(value);

      const useAAA = algorithm === 'AAA';
      const nonTextThreshold = 3;
      const normalTextThreshold = useAAA ? 7 : 4.5;
      const largeTextThreshold = useAAA ? 4.5 : 3;
      const passesNonText = value >= nonTextThreshold;

      // WCAG: large = 18pt (~24px) normal, or 14pt (~18.66px) bold+.
      const dynamicIsLargeText =
        currentFontSize >= 24 || (currentFontSize >= 18.66 && fontWeight >= 700) || isLargeText;
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
          if (dynamicIsLargeText) {
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

  // Clicking on suggested colour or font size updates preview and saves value to clipboard.
  setTimeout(() => {
    const bindSuggest = (id, action) => {
      const el = container.querySelector(id);
      if (!el) return;
      el.addEventListener('click', () => {
        action(el.textContent);
        updatePreview();
        navigator.clipboard.writeText(el.textContent).catch(() => {});
      });
    };
    bindSuggest('#suggest', (val) => {
      fgInput.value = val;
    });
    bindSuggest('#suggest-size', (val) => {
      contrastPreview.style.fontSize = val;
    });
  }, 0);
}

/**
 * Generates and inserts color suggestions for tooltip upon tooltip opening.
 * This function is referenced within './interface/tooltips.js'.
 * For performance reasons, it is only called upon tooltip opening.
 * @param {HTMLElement} container The container where the color suggestion will be inserted.
 */
export function generateColorSuggestion(contrastDetails) {
  const { color, background, fontWeight, fontSize, isLargeText, type, opacity } = contrastDetails;

  if (
    !color ||
    !background ||
    background.type === 'image' ||
    !(type === 'text' || type === 'svg-error' || type === 'input')
  ) {
    return;
  }

  const suggested =
    Constants.Global.contrastAlgorithm === 'APCA'
      ? Contrast.suggestColorAPCA(color, background, fontWeight, fontSize)
      : Contrast.suggestColorWCAG(
          color,
          background,
          isLargeText,
          Constants.Global.contrastAlgorithm,
        );

  const adviceContainer = document.createElement('div');
  adviceContainer.id = 'advice';

  // Helper to create the <hr> element
  const createHr = () => {
    const hr = document.createElement('hr');
    hr.setAttribute('aria-hidden', 'true');
    return hr;
  };

  // Helper to create the Color Badge Button
  const createColorBadge = (suggestedColor) => {
    const btn = document.createElement('button');
    btn.id = 'suggest';
    btn.className = 'badge';
    const bgHex = Contrast.getHex(background);
    btn.style.color = suggestedColor;
    btn.style.backgroundColor = bgHex;
    btn.textContent = suggestedColor;
    return btn;
  };

  // Helper to create the Size Badge Button
  const createSizeBadge = (size) => {
    const btn = document.createElement('button');
    btn.id = 'suggest-size';
    btn.className = 'normal-badge';
    btn.textContent = `${size}px`;
    return btn;
  };

  // 1. Opacity Check.
  if (opacity < 1) {
    adviceContainer.append(createHr(), ' ', Lang.sprintf('CONTRAST_OPACITY'));
    return adviceContainer;
  }

  const algo = Constants.Global.contrastAlgorithm;

  // 2. WCAG Logic (AA / AAA)
  if (algo === 'AA' || algo === 'AAA') {
    if (suggested.color === null) {
      adviceContainer.append(createHr(), ' ', Lang._('NO_SUGGESTION'));
    } else {
      adviceContainer.append(
        createHr(),
        ' ',
        Lang._('CONTRAST_COLOR'),
        ' ',
        createColorBadge(suggested.color),
      );
    }
  }
  // 3. APCA / Size-based Logic
  else {
    const hasColor = !!suggested.color;
    const hasSize = !!suggested.size;

    if (hasColor || hasSize) {
      adviceContainer.append(createHr(), ' ');

      if (hasColor && hasSize) {
        adviceContainer.append(
          Lang._('CONTRAST_APCA'),
          ' ',
          createColorBadge(suggested.color),
          ' ',
          createSizeBadge(suggested.size),
        );
      } else if (hasColor) {
        adviceContainer.append(Lang._('CONTRAST_COLOR'), ' ', createColorBadge(suggested.color));
      } else if (hasSize) {
        adviceContainer.append(Lang._('CONTRAST_SIZE'), ' ', createSizeBadge(suggested.size));
      }
    }
  }

  return adviceContainer;
}
