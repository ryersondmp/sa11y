import { alphaBlend, sRGBtoY, APCAcontrast, fontLookupAPCA } from 'apca-w3';
import Constants from '../utils/constants';
import Elements from '../utils/elements';
import * as Utils from '../utils/utils';
import Lang from '../utils/lang';

/**
 * Rulesets: Contrast
 * APCA contrast checking is experimental. References:
 * @link https://github.com/jasonday/color-contrast
 * @link https://github.com/gka/chroma.js
 * @link https://github.com/Myndex/SAPC-APCA
*/

/**
 * Normalizes a given font weight to a numeric value. Maps keywords to their numeric equivalents.
 * @param {string|number} weight - The font weight, either as a number or a keyword.
 * @returns {number} - The numeric font weight.
*/
export function normalizeFontWeight(weight) {
  const numericWeight = parseInt(weight, 10);
  if (!Number.isNaN(numericWeight)) return numericWeight;
  const weightMap = {
    lighter: 100,
    normal: 400,
    bold: 700,
    bolder: 900,
  };
  return weightMap[weight] || 400;
}

/**
 * Convert colour string to RGBA format.
 * @param {string} color The colour string to convert.
 * @param {number} opacity The computed opacity of the element (0 to 1).
 * @returns Returns colour in rgba format with alpha value.
 */
export function convertToRGBA(color, opacity) {
  const colorString = color;
  let r;
  let g;
  let b;
  let a = 1; // Initialize alpha to 1 by default.

  if (!colorString.startsWith('rgb')) {
    // Unsupported color spaces.
    if (colorString.startsWith('color(rec2020') || colorString.startsWith('color(display-p3')) {
      return 'unsupported';
    }

    // Let the browser do conversion in rgb for non-supported colour spaces.
    const canvas = document.createElement('canvas');
    const context = canvas.getContext('2d');
    context.fillStyle = colorString;
    context.fillRect(0, 0, 1, 1);
    const imageData = context.getImageData(0, 0, 1, 1);
    [r, g, b, a] = imageData.data;
    a = (a / 255).toFixed(2); // Convert alpha to range [0, 1]
  } else {
    // Parse RGB or RGBA values from the color string
    const rgbaArray = colorString.match(/[\d.]+/g).map(Number);
    [r, g, b, a] = rgbaArray.length === 4 ? rgbaArray : [...rgbaArray, 1];
  }

  // If element has opacity attribute, amend the foreground text color string.
  if (opacity && opacity < 1) {
    a = (a * opacity).toFixed(2); // Adjust alpha based on the opacity
  }
  return [r, g, b, Number(a)];
}

/**
 * Retrieves the background colour of an element by traversing up the DOM tree.
 * @param {HTMLElement} $el - The DOM element from which to start searching for the background.
 * @returns {string} - The background color in RGBA format, or "image" if background image.
*/
export function getBackground($el) {
  let targetEl = $el;
  while (targetEl && targetEl.nodeType === 1) {
    const styles = getComputedStyle(targetEl);
    const bgColor = convertToRGBA(styles.backgroundColor);
    const bgImage = styles.backgroundImage;
    if (bgImage !== 'none') {
      return 'image';
    }
    if (bgColor[3] !== 0 && bgColor !== 'transparent') {
      return bgColor; // Return the first non-transparent background color.
    }
    if (targetEl.tagName === 'HTML') {
      return [255, 255, 255]; // Default to white if we reach the HTML tag.
    }
    targetEl = targetEl.parentNode;
  }
  return [255, 255, 255]; // Default to white if no background color is found.
}

/** Get the relative luminance of a colour based on WCAG 2.0
 * @link http://www.w3.org/TR/2008/REC-WCAG20-20081211/#relativeluminancedef
 * @param {number[]} color Colour code in [R,G,B] format.
 * @returns Luminance value.
 */
export function getLuminance(color) {
  const rgb = color.slice(0, 3).map((x) => {
    const normalized = x / 255;
    return normalized <= 0.03928 ? normalized / 12.92 : ((normalized + 0.055) / 1.055) ** 2.4;
  });
  return 0.2126 * rgb[0] + 0.7152 * rgb[1] + 0.0722 * rgb[2];
}

/**
 * Get WCAG 2.0 contrast ratio from luminance value.
 * @link http://www.w3.org/TR/2008/REC-WCAG20-20081211/#contrast-ratiodef
 * @param {number} l1 Luminance value of foreground colour.
 * @param {number} l2 Luminance value of background colour.
 * @returns WCAG 2.0 contrast ratio.
 */
export function getWCAG2Ratio(l1, l2) {
  const lighter = Math.max(l1, l2);
  const darker = Math.min(l1, l2);
  return (lighter + 0.05) / (darker + 0.05);
}

/**
 * Brighten a foreground text colour.
 * @param {number[]} color Text colour in [R,G,B,A] format.
 * @param {number} amount Number or increment to brighten by.
 * @returns Lighter foreground text colour.
 */
export function brighten(color, amount) {
  return color.map((value, index) => {
    if (index < 3) { // Only brighten [R,G,B]
      const newValue = Math.ceil(value + (255 - value) * amount);
      return newValue >= 255 ? 255 : newValue;
    }
    return value;
  });
}

/**
 * Darken a foreground text colour.
 * @param {number[]} color Text colour in [R,G,B,A] format.
 * @param {number} amount Number or increment to darken by.
 * @returns Darker foreground text colour.
 */
export function darken(color, amount) {
  return color.map((value, index) => {
    if (index < 3) { // Only darken [R,G,B]
      const newValue = Math.floor(value * (1 - amount));
      return newValue <= 0 ? 0 : newValue;
    }
    return value;
  });
}

/**
 * Get the hex code equivalent of an RGB colour.
 * @param {number[]} color Colour in [R,G,B,A] format.
 * @returns Hexcode equivalent.
 */
export function getHex(color) {
  const [r, g, b] = color.map((value) => Math.min(255, Math.max(0, value)));
  const hexR = r.toString(16).padStart(2, '0');
  const hexG = g.toString(16).padStart(2, '0');
  const hexB = b.toString(16).padStart(2, '0');
  return `#${hexR}${hexG}${hexB}`;
}

/**
 * Calculate the contrast ratio or value between two colours.
 * @param {number[]} color Text colour in [R,G,B,A] format.
 * @param {Array} bg Background colour in [R,G,B,A] format.
 * @returns Either WCAG 2.0 contrast ratio or APCA contrast value.
 */
export function calculateContrast(color, bg) {
  let ratio;
  const blendedColor = alphaBlend(color, bg);

  if (Constants.Global.contrastAPCA) {
    const foreground = sRGBtoY(blendedColor);
    const background = sRGBtoY(bg);
    ratio = APCAcontrast(foreground, background);
  } else {
    // Uses WCAG 2.0 contrast algorithm based on luminance.
    const foreground = getLuminance(blendedColor);
    const background = getLuminance(bg);
    ratio = getWCAG2Ratio(foreground, background);
  }
  return { ratio, blendedColor };
}

/**
 * Suggest a foreground colour with sufficient contrast.
 * @param {number[]} color Text colour in [R,G,B,A] format.
 * @param {number[]} background Background colour in [R,G,B,A] format.
 * @param {boolean} isLargeText Whether text is normal or large size.
 * @returns Compliant colour hexcode.
 */
export function suggestColorWCAG(color, background, isLargeText) {
  const minContrastRatio = isLargeText ? 3 : 4.5;
  const fgLuminance = getLuminance(color);
  const bgLuminance = getLuminance(background);

  // Choose whether to lighten or darken text colour:
  // Check contrast of extreme luminance values to see if lightened/darkened text will meet contrast requirement.
  const adjustMode = fgLuminance > bgLuminance
    ? getWCAG2Ratio(1, bgLuminance) > minContrastRatio
    : getWCAG2Ratio(0, bgLuminance) < minContrastRatio;

  const adjustColor = (foregroundColor, amount, mode) => (
    mode ? brighten(foregroundColor, amount) : darken(foregroundColor, amount)
  );

  let adjustedColor = color;
  let lastValidColor = adjustedColor;
  let contrastRatio = getWCAG2Ratio(fgLuminance, bgLuminance);
  let bestContrast = contrastRatio;
  let previousColor = color;

  // Loop parameters.
  let step = 0.16;
  const percentChange = 0.5;
  const precision = 0.01;

  while (step >= precision) {
    adjustedColor = adjustColor(adjustedColor, step, adjustMode);
    const newLuminance = getLuminance(adjustedColor);
    contrastRatio = getWCAG2Ratio(newLuminance, bgLuminance);

    // console.log(`%c ${getHex(adjustedColor)} | ${contrastRatio}`, `color:${getHex(adjustedColor)};background:${getHex(background)}`);

    // Save valid colour, go back to previous, and continue with a smaller step.
    if (contrastRatio >= minContrastRatio) {
      // Ensure new colour is closer to the contrast minimum than old colour.
      lastValidColor = (contrastRatio <= bestContrast) ? adjustedColor : lastValidColor;
      bestContrast = contrastRatio;
      adjustedColor = previousColor;
      step *= percentChange;
    }

    previousColor = adjustedColor;
  }
  return { color: getHex(lastValidColor) };
}

/**
 * Determines the optimal contrasting color (either #000 or #FFF) for a given background color and the minimum font size required to meet APCA.
 * @param {number[]} background The background color in [R, G, B, A] format.
 * @param {number} fontWeight The computed weight of the font.
 * @returns Object containing hex code (#000/#FFF) and the recommended font size.
 */
const getOptimalAPCACombo = (background, fontWeight) => {
  const contrastWithDark = calculateContrast(background, [0, 0, 0, 1]);
  const contrastWithLight = calculateContrast(background, [255, 255, 255, 1]);
  const isDarkBetter = Math.abs(contrastWithDark.ratio) > Math.abs(contrastWithLight.ratio);
  const suggestedColor = isDarkBetter ? [0, 0, 0, 1] : [255, 255, 255, 1];
  const bestContrastRatio = isDarkBetter ? contrastWithDark.ratio : contrastWithLight.ratio;
  const newFontLookup = fontLookupAPCA(bestContrastRatio).slice(1);
  const size = Math.ceil(newFontLookup[Math.floor(fontWeight / 100) - 1]);
  return { suggestedColor, size };
};

/**
 * Suggests a new colour or font size based on APCA contrast algorithm.
 * @param {number[]} color Text colour in [R,G,B,A] format.
 * @param {number[]} background Background colour in [R,G,B,A] format.
 * @param {number} fontWeight Current font weight of the element.
 * @param {number} fontSize Current font size of the element.
 * @returns Compliant colour hexcode and/or font size combination.
 */
export function suggestColorAPCA(color, background, fontWeight, fontSize) {
  const bgLuminance = sRGBtoY(background);
  // https://medium.com/@mikeyullinger/how-chameleon-text-ensures-legibility-ae414d7b069a#:~:text=0.179
  const adjustColor = (foregroundColor, amount) => (bgLuminance <= 0.179
    ? brighten(foregroundColor, amount)
    : darken(foregroundColor, amount));

  let adjustedColor = color;

  // Returns 9 font sizes in px corresponding to weights 100 thru 900.
  // Returns ['LcValue',100,200,300,400,500,600,700,800,900]
  let contrast = calculateContrast(adjustedColor, background);
  let fontLookup = fontLookupAPCA(contrast.ratio).slice(1);

  // Index of the corresponding fontWeight.
  const fontWeightIndex = Math.floor(fontWeight / 100) - 1;
  const minimumSizeRequired = fontLookup[fontWeightIndex];

  // Find another colour, because nothing will work at any size.
  const fails = fontSize < minimumSizeRequired || minimumSizeRequired === 999 || minimumSizeRequired === 777;

  // Needs new font size - no colour will work at current size.
  const best = getOptimalAPCACombo(background, fontWeight);
  if (best.size > fontSize) {
    return { color: getHex(best.suggestedColor), size: best.size };
  }

  let previousColor = color;
  let lastValidColor = adjustedColor;
  let bestContrast = contrast.ratio;

  // Loop parameters.
  let step = 0.16;
  const percentChange = 0.5;
  const precision = 0.01;
  let iterations = 0;
  const maxIterations = 50;

  // Loop to find a new colour.
  if (fails) {
    while (step >= precision) {
      iterations += 1;
      adjustedColor = adjustColor(adjustedColor, step);
      contrast = calculateContrast(adjustedColor, background);
      fontLookup = fontLookupAPCA(contrast.ratio).slice(1);

      // console.log(`%c ${getHex(adjustedColor)} | ${contrast.ratio.toFixed(1)} | ${fontLookup}`, `color:${getHex(adjustedColor)};background:${getHex(background)}`);

      // Save valid colour, go back to previous, and continue with a smaller step.
      if (fontLookup[fontWeightIndex] <= fontSize) {
        // Ensure new colour is closer to the contrast minimum than old colour.
        lastValidColor = (Math.abs(contrast.ratio) <= Math.abs(bestContrast)) ? adjustedColor : lastValidColor;
        bestContrast = contrast.ratio;
        lastValidColor = adjustedColor;
        adjustedColor = previousColor;
        step *= percentChange;
      }

      previousColor = adjustedColor;

      // Just in case, break the loop.
      if (iterations === maxIterations) {
        return { color: getHex(best.suggestedColor), size: best.size };
      }
    }
  }

  // Found a valid colour.
  return { color: getHex(lastValidColor), size: null };
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
  if (color && background && background !== 'image' && type === 'text') {
    const suggested = Constants.Global.contrastAPCA
      ? suggestColorAPCA(color, background, fontWeight, fontSize)
      : suggestColorWCAG(color, background, isLargeText);

    let advice;
    const hr = '<hr aria-hidden="true">';
    const style = `color:${suggested.color};background-color:${getHex(contrastDetails.background)};`;
    const colorBadge = `<strong class="badge" style="${style}">${suggested.color}</strong>`;
    const sizeBadge = `<strong class="normal-badge">${suggested.size}px</strong>`;

    if (!Constants.Global.contrastAPCA) {
      advice = `${hr} ${Lang._('CONTRAST_COLOR')} ${colorBadge}`;
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

/**
 * Inject contrast colour pickers into tooltip.
 * @param {HTMLElement} container The tooltip container to inject the contrast colour pickers.
 */
export function generateContrastTools(contrastDetails) {
  const { sanitizedText, color, background, fontWeight, fontSize, ratio } = contrastDetails;

  // Initialize variables.
  const hasBackgroundColor = background && background !== 'image';
  const backgroundHex = hasBackgroundColor ? getHex(background) : '#000000';
  const foregroundHex = color ? getHex(color) : '#000000';
  const unknownFG = color ? '' : 'class="unknown"';
  const unknownBG = background && background !== 'image' ? '' : 'class="unknown"';
  const hasFontWeight = fontWeight ? `font-weight:${fontWeight};` : '';
  const hasFontSize = fontSize ? `font-size:${fontSize}px;` : '';

  // Ratio to be displayed.
  let displayedRatio;
  if (Constants.Global.contrastAPCA) {
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
      <div id="non-text" class="badge good-badge" hidden>${Lang._('NON_TEXT')}</div>
      <div id="large-text" class="badge good-badge" hidden>${Lang._('LARGE_TEXT')}</div>
      <div id="body-text" class="badge good-badge" hidden>${Lang._('BODY_TEXT')}</div>
      <div id="apca" class="badge good-badge" hidden>${Lang._('GOOD')}</div>
      <div id="apca-table" hidden></div>
      <div id="contrast-preview" style="color:${foregroundHex};${hasBackgroundColor ? `background:${backgroundHex};${sanitizedText.length ? '' : 'display: none;'}` : ''}${hasFontWeight}${hasFontSize}">${sanitizedText}</div>
      <div id="color-pickers">
        <label for="fg-text">${Lang._('FG')}
          <input type="color" id="fg-input" value="${foregroundHex}" ${unknownFG}/>
        </label>
        <label for="bg">${Lang._('BG')}
          <input type="color" id="bg-input" value="${backgroundHex}" ${unknownBG}/>
        </label>
      </div>`;
  return contrastTools;
}

export function createFontSizesTable(container, fontSizes) {
  const apcaTable = container;
  apcaTable.innerHTML = '';
  apcaTable.hidden = false;

  const row = document.createElement('div');
  row.classList.add('row');

  // Show only 200 thru 700 font weights.
  const filteredFontSizes = fontSizes.slice(1, 7);
  for (let i = 0; i < filteredFontSizes.length; i++) {
    const fontSize = filteredFontSizes[i];
    const fontWeight = (i + 2) * 100;

    // Only render the cell if font size is not 777 or 999.
    if (fontSize !== 777 && fontSize !== 999) {
      const cell = document.createElement('div');
      cell.classList.add('cell');

      // Font size.
      const sizeElement = document.createElement('div');
      sizeElement.classList.add('font-size');
      sizeElement.textContent = `${Math.ceil(fontSize)}px`;

      // Font weight.
      const weightElement = document.createElement('div');
      weightElement.classList.add('font-weight');
      weightElement.textContent = `${fontWeight}`;

      cell.appendChild(sizeElement);
      cell.appendChild(weightElement);
      row.appendChild(cell);
      apcaTable.appendChild(row);
    }
  }
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
    const { fontSize, fontWeight, type } = contrastDetails;

    // Cache selectors
    const contrast = container.querySelector('#contrast');
    const contrastPreview = container.querySelector('#contrast-preview');
    const fgInput = container.querySelector('#fg-input');
    const bgInput = container.querySelector('#bg-input');
    const nonText = container.querySelector('#non-text');
    const bodyText = container.querySelector('#body-text');
    const largeText = container.querySelector('#large-text');
    const ratio = container.querySelector('#value');
    const apca = container.querySelector('#apca');
    const apcaTable = container.querySelector('#apca-table');

    // Helper to update badge classes.
    const toggleBadges = (elements, condition) => {
      elements.forEach(($el) => {
        $el.classList.toggle('good-badge', condition);
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

      // Change SVG color if it contains a single <path> element.
      const path = contrastPreview.querySelectorAll('svg *');
      const { fill, stroke } = getComputedStyle(path[0]);
      if (path.length === 1 && fill !== 'none') path[0].style.fill = fgColor;
      if (path.length === 1 && stroke !== 'none') path[0].style.stroke = fgColor;

      // Get contrast ratio.
      const contrastValue = calculateContrast(convertToRGBA(fgColor), convertToRGBA(bgColor));
      const elementsToToggle = [ratio, contrast];

      // APCA
      if (Constants.Global.contrastAPCA) {
        const value = Math.abs(Number(contrastValue.ratio.toFixed(1)));
        ratio.textContent = value;
        const fontArray = fontLookupAPCA(value).slice(1);
        const nonTextPasses = value >= 45 && fontArray[0] >= 0 && fontArray[0] <= 777;
        let passes;

        switch (type) {
          case 'svg-error':
          case 'svg-warning': {
            nonText.hidden = !nonTextPasses;
            passes = nonTextPasses;
            toggleBadges(elementsToToggle, passes);
            break;
          }
          case 'svg-text': {
            nonText.hidden = !nonTextPasses;
            passes = fontArray.slice(1, 7).some((size) => size !== 999 && size !== 777);
            toggleBadges(elementsToToggle, passes);
            createFontSizesTable(apcaTable, fontArray);
            break;
          }
          default: {
            const minFontSize = fontArray[Math.floor(fontWeight / 100) - 1];
            passes = fontSize >= minFontSize;
            toggleBadges(elementsToToggle, passes);
            apca.hidden = !passes;
            break;
          }
        }
      }

      // WCAG 2.0
      if (!Constants.Global.contrastAPCA) {
        const value = contrastValue.ratio.toFixed(2);
        ratio.textContent = `${value}:1`;
        const passes = value >= 3;

        switch (type) {
          case 'svg-error':
          case 'svg-warning': {
            nonText.hidden = !passes;
            toggleBadges(elementsToToggle, passes);
            break;
          }
          case 'svg-text': {
            nonText.hidden = !passes;
            toggleBadges(elementsToToggle, passes);
            largeText.hidden = !passes;
            bodyText.hidden = value <= 4.5;
            break;
          }
          default: {
            toggleBadges([ratio, contrast], passes);
            largeText.hidden = !passes;
            bodyText.hidden = value <= 4.5;
            break;
          }
        }
      }
    };

    // Event listeners for both colour inputs.
    fgInput.addEventListener('input', updatePreview);
    bgInput.addEventListener('input', updatePreview);
  }
}

/**
  * Calculate an elements contrast based on WCAG 2.0 contrast algorithm.
  * @param {HTMLElement} $el The element in the DOM.
  * @param {number[]} color Text colour in [R,G,B,A] format.
  * @param {Array} background Background colour in [R,G,B,A] format.
  * @param {number} fontSize Element's font size.
  * @param {number} fontWeight Element's font weight.
  * @param {number} opacity Element's opacity value.
  * @returns {Object} Object containing the element, ratio, and extra details.
  */
export function wcagAlgorithm($el, color, background, fontSize, fontWeight, opacity) {
  const { ratio, blendedColor } = calculateContrast(color, background);
  const isLargeText = fontSize >= 24 || (fontSize >= 18.67 && fontWeight >= 700);
  const hasLowContrast = ratio < 3;
  const hasLowContrastNormalText = ratio > 1 && ratio < 4.5;

  if ((isLargeText && hasLowContrast) || (!isLargeText && hasLowContrastNormalText)) {
    return {
      $el,
      ratio: `${ratio.toFixed(2)}:1`,
      color: blendedColor,
      background,
      fontSize,
      fontWeight,
      isLargeText,
      opacity,
    };
  }
  return null;
}

/**
 * Calculate an elements contrast based on APCA algorithm.
 * @param {HTMLElement} $el The element in the DOM.
 * @param {number[]} color Text colour in [R,G,B,A] format.
 * @param {Array} background Background colour in [R,G,B,A] format.
 * @param {number} fontSize Element's font size.
 * @param {number} fontWeight Element's font weight.
 * @param {number} opacity Element's opacity value.
 * @returns {Object} Object containing the element, ratio, and extra details.
*/
export function apcaAlgorithm($el, color, background, fontSize, fontWeight, opacity) {
  const { ratio, blendedColor } = calculateContrast(color, background);

  // Returns 9 font sizes in px corresponding to weights 100 thru 900.
  // Returns ['LcValue',100,200,300,400,500,600,700,800,900]
  const fontLookup = fontLookupAPCA(ratio).slice(1);

  // Get minimum font size based on weight.
  const fontWeightIndex = Math.floor(fontWeight / 100) - 1;
  const minFontSize = fontLookup[fontWeightIndex];

  if (fontSize < minFontSize) {
    return {
      $el,
      ratio: Math.abs(ratio.toFixed(1)),
      color: blendedColor,
      background,
      fontWeight,
      fontSize,
      opacity,
    };
  }
  return null;
}

/**
 * Check an element's contrast based on APCA or WCAG 2.0 algorithm.
 * @param {HTMLElement} $el The element in the DOM.
 * @param {number[]} color Text colour in [R,G,B,A] format.
 * @param {Array} background Background colour in [R,G,B,A] format.
 * @param {number} fontSize Element's font size.
 * @param {number} fontWeight Element's font weight.
 * @param {number} opacity Element's opacity value.
 * @returns {Object} Object containing the element, ratio, and extra details.
 */
export function checkElementContrast($el, color, background, fontSize, fontWeight, opacity) {
  const algorithm = Constants.Global.contrastAPCA ? apcaAlgorithm : wcagAlgorithm;
  return algorithm($el, color, background, fontSize, fontWeight, opacity);
}

/**
 * Check contrast.
 * @param {Array} results Sa11y's results array.
 * @param {Object} option Sa11y's options object.
 * @returns Contrast results.
 */
export default function checkContrast(results, option) {
  // Initialize contrast results array.
  const contrastResults = [];

  // Iterate through all elements on the page and get computed styles.
  for (let i = 0; i < Elements.Found.Contrast.length; i++) {
    const $el = Elements.Found.Contrast[i];
    const style = getComputedStyle($el);

    // Get computed styles.
    const opacity = parseFloat(style.opacity);
    const color = convertToRGBA(style.color, opacity);
    const fontSize = parseFloat(style.fontSize);
    const getFontWeight = style.fontWeight;
    const fontWeight = normalizeFontWeight(getFontWeight);
    const background = getBackground($el);

    // Check if element is visually hidden to screen readers or explicitly hidden.
    const isVisuallyHidden = Utils.isScreenReaderOnly($el);
    const isExplicitlyHidden = Utils.isElementHidden($el);
    const isHidden = isExplicitlyHidden || isVisuallyHidden || opacity === 0;

    // Filter only text nodes.
    const textString = Array.from($el.childNodes)
      .filter((node) => node.nodeType === 3)
      .map((node) => node.textContent)
      .join('');
    const text = textString.trim();

    // Inputs to check
    const checkInputs = ['OPTION', 'INPUT', 'TEXTAREA'].includes($el.tagName);

    // Only check elements with text and inputs.
    if (text.length !== 0 || checkInputs) {
      if (color === 'unsupported' || background === 'unsupported') {
        contrastResults.push({
          $el,
          type: 'unsupported',
          fontSize,
          fontWeight,
          opacity,
          ...(background !== 'unsupported' && { background }),
          ...(color !== 'unsupported' && { color }),
        });
      } else if (background === 'image') {
        contrastResults.push({
          $el,
          type: 'background-image',
          color,
          background,
          fontSize,
          fontWeight,
          opacity,
        });
      } else if ($el.tagName === 'text' && $el.closest('svg')) {
        // Handle seperately.
      } else if (isHidden || getHex(color) === getHex(background)) {
        // Ignore visually hidden elements.
      } else {
        const result = checkElementContrast($el, color, background, fontSize, fontWeight, opacity);
        if (result) {
          result.type = checkInputs ? 'input' : 'text';
          contrastResults.push(result);
        }
      }
    }
  }

  Elements.Found.Svg.forEach(($el) => {
    const background = getBackground($el);

    // Handle SVGs with <text> element
    if ($el.querySelector('text')) {
      contrastResults.push({ $el, type: 'svg-text', background });
      return;
    }

    // Process simple SVGs with a single shape.
    const shapes = $el.querySelectorAll('path, polygon, circle, rect, ellipse');
    if (shapes.length === 1) {
      const style = getComputedStyle(shapes[0]);
      const { fill, opacity, stroke, strokeWidth } = style;

      // Background image.
      if (fill.startsWith('url(')) {
        contrastResults.push({ $el, type: 'svg-warning', background });
        return;
      }

      const hasFill = fill && fill !== 'none';
      const hasStroke = stroke && stroke !== 'none' && strokeWidth !== '0px';

      if (!hasFill && !hasStroke) {
        contrastResults.push({ $el, type: 'svg-warning', background });
        return;
      }

      let fillPasses = false;
      let strokePasses = false;
      let contrastValue;
      let colorValue;
      // Check fill contrast
      if (hasFill) {
        const resolvedFill = fill === 'currentColor'
          ? convertToRGBA(getComputedStyle($el).color, opacity)
          : convertToRGBA(fill, opacity);
        colorValue = resolvedFill;
        contrastValue = calculateContrast(resolvedFill, background);
        fillPasses = option.contrastAPCA
          ? contrastValue.ratio >= 45
          : contrastValue.ratio >= 3;
      }

      // Check stroke contrast
      if (hasStroke) {
        const resolvedStroke = stroke === 'currentColor'
          ? convertToRGBA(getComputedStyle($el).color, opacity)
          : convertToRGBA(stroke, opacity);
        colorValue = resolvedStroke;
        contrastValue = calculateContrast(resolvedStroke, background);
        strokePasses = option.contrastAPCA
          ? contrastValue.ratio >= 45
          : contrastValue.ratio >= 3;
      }

      // Failure conditions
      const failsBoth = hasFill && hasStroke && !fillPasses && !strokePasses;
      const failsFill = hasFill && !hasStroke && !fillPasses;
      const failsStroke = !hasFill && hasStroke && !strokePasses;

      if (failsBoth || failsFill || failsStroke) {
        contrastResults.push({
          $el,
          ratio: option.contrastAPCA
            ? Math.abs(Number(contrastValue.ratio.toFixed(1)))
            : contrastValue.ratio.toFixed(2),
          color: colorValue,
          type: 'svg-error',
          background,
        });
      }
    } else {
      // Warn for complex SVGs with multiple shapes
      contrastResults.push({ $el, type: 'svg-warning', background });
    }
  });

  // Check contrast of all placeholder elements.
  Elements.Found.Inputs.forEach(($el) => {
    if ($el.placeholder && $el.placeholder.length !== 0) {
      const placeholder = getComputedStyle($el, '::placeholder');
      const pColor = convertToRGBA(placeholder.getPropertyValue('color'));
      const pSize = parseFloat(placeholder.fontSize);
      const pWeight = normalizeFontWeight(placeholder.fontWeight);
      const pBackground = getBackground($el);
      const pOpacity = parseFloat(placeholder.opacity);
      const result = checkElementContrast($el, pColor, pBackground, pSize, pWeight, pOpacity);
      if (result) {
        result.type = 'placeholder';
        contrastResults.push(result);
      }
    }
  });

  // Do some extra processing on warnings.
  const processWarnings = (warnings) => warnings.reduce((mergedWarnings, current) => {
    if (current.type === 'background-image') {
      // For background images, merge nodes that share similar properties to minimize number of annotations.
      const previous = mergedWarnings[mergedWarnings.length - 1];
      const hasSameColor = previous
        && JSON.stringify(current.color) === JSON.stringify(previous.color);
      const hasSameParent = previous
        && current.$el.parentNode === previous.$el.parentNode;

      if (!previous || !hasSameColor || !hasSameParent) {
        mergedWarnings.push({ ...current, mergeCount: 1 });
        return mergedWarnings;
      }

      // For APCA, font size and font weight matter.
      if (option.contrastAPCA) {
        const hasSameFont = current.fontSize === previous.fontSize
          && current.fontWeight === previous.fontWeight;
        if (!hasSameFont) {
          mergedWarnings.push({ ...current });
        }
      } else {
        previous.mergeCount += 1;
      }
      return mergedWarnings;
    }

    // Return remaining warnings that don't need additional processing.
    mergedWarnings.push(current);
    return mergedWarnings;
  }, []);
  const processedResults = processWarnings(contrastResults);

  // Iterate through all contrast results.
  processedResults.forEach((item) => {
    const { $el, ratio } = item;
    const updatedItem = item;

    // Annotation placement.
    let element;
    if (item.type === 'background-image' && item.mergeCount > 1) {
      // Get the background image.
      let parent = $el.parentElement;
      while (parent) {
        const computedStyle = window.getComputedStyle(parent);
        if (computedStyle.backgroundImage !== 'none') break;
        parent = parent.parentElement;
      }
      element = parent || $el;
      updatedItem.fontWeight = 400;
      updatedItem.fontSize = 15.5; // For merged objects, reset font size.
    } else if ($el.tagName === 'OPTION') {
      element = $el.closest('datalist, select, optgroup');
    } else {
      element = $el;
    }

    // Process text within element.
    const nodeText = Utils.fnIgnore(element, ['option:not(option:first-child)']);
    const text = Utils.getText(nodeText);

    // Content for tooltip.
    const truncatedText = Utils.truncateString(text, 80);
    const sanitizedText = Utils.sanitizeHTML(truncatedText);

    // Preview text
    let previewText;
    if (item.type === 'placeholder' && $el.placeholder) {
      previewText = Utils.sanitizeHTML($el.placeholder);
    } else if (item.type === 'svg-error' || item.type === 'svg-warning' || item.type === 'svg-text') {
      const sanitizeSvg = Utils.sanitizeHTMLBlock(updatedItem.$el.outerHTML, true);
      previewText = Utils.removeWhitespace(sanitizeSvg);
    } else {
      previewText = sanitizedText;
    }
    updatedItem.sanitizedText = previewText;

    // Iterate through contrast results based on type.
    switch (item.type) {
      case 'text':
        if (option.checks.CONTRAST_ERROR) {
          results.push({
            element: $el,
            type: option.checks.CONTRAST_ERROR.type || 'error',
            content: option.checks.CONTRAST_ERROR.content
              || Lang.sprintf('CONTRAST_ERROR'),
            inline: false,
            position: 'beforebegin',
            dismiss: Utils.prepareDismissal(`CONTRAST${sanitizedText}`),
            dismissAll: option.checks.CONTRAST_ERROR.dismissAll ? 'CONTRAST_ERROR' : false,
            developer: option.checks.CONTRAST_ERROR.developer || false,
            contrastDetails: updatedItem,
          });
        }
        break;
      case 'input':
        if (option.checks.CONTRAST_INPUT) {
          results.push({
            element,
            type: option.checks.CONTRAST_INPUT.type || 'error',
            content: option.checks.CONTRAST_INPUT.content
              || Lang.sprintf('CONTRAST_INPUT', ratio),
            inline: false,
            position: 'beforebegin',
            dismiss: Utils.prepareDismissal(`CONTRAST${$el.getAttribute('class')}${$el.tagName}${ratio}`),
            dismissAll: option.checks.CONTRAST_INPUT.dismissAll ? 'CONTRAST_INPUT' : false,
            developer: option.checks.CONTRAST_INPUT.developer || true,
            contrastDetails: updatedItem,
          });
        }
        break;
      case 'placeholder':
        if (option.checks.CONTRAST_PLACEHOLDER) {
          results.push({
            element: $el,
            type: option.checks.CONTRAST_PLACEHOLDER.type || 'error',
            content: option.checks.CONTRAST_PLACEHOLDER.content
              || Lang.sprintf('CONTRAST_PLACEHOLDER'),
            inline: false,
            position: 'afterend',
            dismiss: Utils.prepareDismissal(`CPLACEHOLDER${$el.getAttribute('class')}${$el.tagName}${ratio}`),
            dismissAll: option.checks.CONTRAST_PLACEHOLDER.dismissAll ? 'CONTRAST_PLACEHOLDER' : false,
            developer: option.checks.CONTRAST_PLACEHOLDER.developer || true,
            contrastDetails: updatedItem,
          });
        }
        break;
      case 'svg-error':
        if (option.checks.CONTRAST_ERROR_GRAPHIC) {
          results.push({
            element: $el,
            type: option.checks.CONTRAST_ERROR_GRAPHIC.type || 'error',
            content: option.checks.CONTRAST_ERROR_GRAPHIC.content
              || Lang.sprintf('CONTRAST_ERROR_GRAPHIC'),
            inline: false,
            position: 'beforebegin',
            dismiss: Utils.prepareDismissal(`CONTRAST_GRAPHIC${sanitizedText}`),
            dismissAll: option.checks.CONTRAST_ERROR_GRAPHIC.dismissAll ? 'CONTRAST_ERROR_GRAPHIC' : false,
            developer: option.checks.CONTRAST_ERROR_GRAPHIC.developer || true,
            contrastDetails: updatedItem,
          });
        }
        break;
      case 'svg-warning':
      case 'svg-text':
        if (option.checks.CONTRAST_WARNING_GRAPHIC) {
          results.push({
            element: $el,
            type: option.checks.CONTRAST_WARNING_GRAPHIC.type || 'warning',
            content: option.checks.CONTRAST_WARNING_GRAPHIC.content
              || Lang.sprintf('CONTRAST_WARNING_GRAPHIC'),
            inline: false,
            position: 'beforebegin',
            dismiss: Utils.prepareDismissal(`CONTRASTGRAPHIC${sanitizedText}`),
            dismissAll: option.checks.CONTRAST_WARNING_GRAPHIC.dismissAll ? 'CONTRAST_WARNING_GRAPHIC' : false,
            developer: option.checks.CONTRAST_WARNING_GRAPHIC.developer || true,
            contrastDetails: updatedItem,
          });
        }
        break;
      case 'unsupported':
      case 'background-image':
        if (option.checks.CONTRAST_WARNING) {
          results.push({
            element,
            type: option.checks.CONTRAST_WARNING.type || 'warning',
            content: option.checks.CONTRAST_WARNING.content
              || Lang.sprintf('CONTRAST_WARNING'),
            inline: false,
            position: 'beforebegin',
            dismiss: Utils.prepareDismissal(`CONTRAST${sanitizedText}`),
            dismissAll: option.checks.CONTRAST_WARNING.dismissAll ? 'CONTRAST_WARNING' : false,
            developer: option.checks.CONTRAST_WARNING.developer || false,
            contrastDetails: updatedItem,
          });
        }
        break;
      default:
        break;
    }
  });
  return results;
}
