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
  const clampedAmount = Math.min(Math.max(amount, 0), 1);
  return color.map((value) => {
    const newValue = Math.round(value + (255 - value) * clampedAmount);
    return Math.min(newValue, 255);
  });
}

/**
 * Darken a foreground text colour.
 * @param {number[]} color Text colour in [R,G,B,A] format.
 * @param {number} amount Number or increment to darken by.
 * @returns Darker foreground text colour.
 */
export function darken(color, amount) {
  const clampedAmount = Math.min(Math.max(amount, 0), 1);
  return color.map((value) => {
    const newValue = Math.round(value - value * clampedAmount);
    return Math.max(newValue, 0);
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
 * @param {Array} bg Backgrounud colour in [R,G,B,A] format.
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
 * @param {number} ratio The current contrast ratio.
 * @param {boolean} isLargeText Whether text is normal or large size.
 * @returns Compliant colour hexcode.
 */
export function suggestColorWCAG(color, background, isLargeText) {
  const minContrastRatio = isLargeText ? 3 : 4.5;
  const fgLuminance = getLuminance(color);
  const bgLuminance = getLuminance(background);

  const adjustColor = (foregroundColor, amount, adjustMode) => (
    adjustMode ? brighten(foregroundColor, amount) : darken(foregroundColor, amount)
  );

  let adjustedColor = color;
  let lastValidColor = adjustedColor;
  let contrastRatio = getWCAG2Ratio(fgLuminance, bgLuminance);

  // Loop parameters.
  let iterations = 0;
  const step = 0.05;
  const maxIterations = 500;

  let adjustMode = true;
  let previousColor = null;
  while (contrastRatio < minContrastRatio && iterations < maxIterations) {
    adjustedColor = adjustColor(adjustedColor, step, adjustMode);
    const newLuminance = getLuminance(adjustedColor);
    contrastRatio = getWCAG2Ratio(newLuminance, bgLuminance);

    /* console.log(`%c ${getHex(adjustedColor)} | ${contrastRatio}`, `color:${getHex(adjustedColor)};background:${getHex(background)}`); */

    // If same colour keeps getting suggested; it means it can't find a valid colour:
    // Switch colours modes, starting from the original colour.
    if (previousColor && getHex(adjustedColor) === getHex(previousColor)) {
      adjustMode = !adjustMode; // Switch colour adjust modes.
      adjustedColor = color; // Adjust from original colour.
    }

    // Break the loop once minimum contrast is met!
    if (contrastRatio >= minContrastRatio) {
      lastValidColor = adjustedColor;
      break;
    }

    iterations += 1;
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
  const contrastWithDark = calculateContrast(background, [0, 0, 0]);
  const contrastWithLight = calculateContrast(background, [255, 255, 255]);
  const isDarkBetter = Math.abs(contrastWithDark.ratio) > Math.abs(contrastWithLight.ratio);
  const suggestedColor = isDarkBetter ? '#000000' : '#FFFFFF';
  const bestContrastRatio = isDarkBetter ? contrastWithDark.ratio : contrastWithLight.ratio;
  const newFontLookup = fontLookupAPCA(bestContrastRatio).slice(1);
  const size = Math.ceil(newFontLookup[Math.floor(fontWeight / 100) - 1]);
  return { suggestedColor, size };
};

/**
 * Suggests a new colour or font size based on APCA contrast algorithm.
 * @param {number[]} color Text colour in [R,G,B,A] format.
 * @param {number[]} background Background colour in [R,G,B,A] format.
 * @param {number} ratio APCA contrast ratio.
 * @param {number} fontWeight Current font weight of the element.
 * @param {number} fontSize Current font size of the element.
 * @returns Compliant colour hexcode and/or font size combination.
 */
export function suggestColorAPCA(color, background, fontWeight, fontSize) {
  const bgLuminance = sRGBtoY(background);
  const adjustColor = (foregroundColor, amount) => {
    const fgLuminance = sRGBtoY(color);
    let adjustedColor;
    // 0.9 and 0.1 to account for outliers.
    if (fgLuminance > bgLuminance) {
      adjustedColor = fgLuminance > 0.9
        ? darken(foregroundColor, amount)
        : brighten(foregroundColor, amount);
    } else {
      adjustedColor = fgLuminance < 0.1
        ? brighten(foregroundColor, amount)
        : darken(foregroundColor, amount);
    }
    return adjustedColor;
  };

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

  const step = 0.1;
  const maxIterations = 500;
  let iterations = 0;
  let previousColor = null;

  // Loop to find a new colour.
  if (fails) {
    while (iterations < maxIterations) {
      iterations += 1;
      adjustedColor = adjustColor(adjustedColor, step);
      contrast = calculateContrast(adjustedColor, background);
      fontLookup = fontLookupAPCA(contrast.ratio).slice(1);

      // console.log(`%c ${getHex(adjustedColor)} | ${contrast.ratio.toFixed(1)} | ${fontLookup}`, `color:${getHex(adjustedColor)};background:${getHex(background)}`);

      // Found a valid colour.
      if (fontLookup[fontWeightIndex] < fontSize) {
        return { color: getHex(adjustedColor), size: null };
      }

      // Break the loop once it starts suggesting the same colour. It means there's no valid colour at the current font size.
      if (previousColor && getHex(previousColor) === getHex(adjustedColor)) {
        break;
      }

      previousColor = adjustedColor;
    }
  }

  // Suggest either black or white, whatever provides highest contrast, and the suggested font size.
  const best = getOptimalAPCACombo(background, fontWeight);
  return { color: best.suggestedColor, size: best.size };
}

/**
 * Generates and inserts color suggestions for tooltip upon tooltip opening.
 * This function is referenced within './interface/tooltips.js'.
 * For performance reasons, it is only called upon tooltip opening.
 * @param {HTMLElement} container The container where the color suggestion will be inserted.
 */
export function generateColorSuggestion(container) {
  const hasContrastDetails = container?.querySelector('[data-sa11y-contrast-details]');
  if (hasContrastDetails) {
    const colorObject = hasContrastDetails?.getAttribute('data-sa11y-contrast-details');
    const details = JSON.parse(colorObject);
    const { color, background, fontWeight, fontSize, isLargeText } = details;

    if (color && background !== 'image') {
      const suggested = Constants.Global.contrastAPCA
        ? suggestColorAPCA(color, background, fontWeight, fontSize)
        : suggestColorWCAG(color, background, isLargeText);

      let advice;
      const hr = '<hr aria-hidden="true">';
      const style = `color:${suggested.color};background-color:${getHex(details.background)};`;
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
      const adviceContainer = document.createElement('div');
      adviceContainer.id = 'advice';

      // If low opacity, suggest increase opacity first.
      const suggestion = (details.opacity < 1)
        ? `<hr aria-hidden="true"> ${Lang.sprintf('CONTRAST_OPACITY')}` : advice;

      // Append advice to contrast details container.
      adviceContainer.innerHTML = suggestion;
      hasContrastDetails.appendChild(adviceContainer);
    }
  }
}

export function generateContrastTools(container) {
  const hasContrastDetails = container?.querySelector('[data-sa11y-contrast-details]');
  if (hasContrastDetails) {
    // Get the contrast details object.
    const colorObject = hasContrastDetails.getAttribute('data-sa11y-contrast-details' || '{}');
    const details = JSON.parse(colorObject);
    const { sanitizedText, color, background, fontWeight, fontSize, ratio } = details;

    // Initialize variables.
    const hasBackgroundColor = background && background !== 'image';
    const backgroundHex = hasBackgroundColor ? getHex(background) : '#ffffff';
    const foregroundHex = color ? getHex(color) : '#000000';
    const displayedRatio = Math.abs(ratio) === 0 ? 0 : Math.abs(ratio) || Lang._('UNKNOWN');

    // Generate HTML layout.
    const contrastTools = document.createElement('div');
    contrastTools.id = 'contrast-tools';
    contrastTools.innerHTML = `
      <hr aria-hidden="true">
      <strong id="contrast" class="badge">${Lang._('CONTRAST')}</strong>
      <strong id="value" class="badge">${displayedRatio}</strong>
      <strong id="large-text" class="badge good-badge" hidden>${Lang._('LARGE_TEXT')}</strong>
      <strong id="body-text" class="badge good-badge" hidden>${Lang._('BODY_TEXT')}</strong>
      <strong id="apca" class="badge good-badge" hidden>${Lang._('GOOD')} <span class="good-icon"></span></strong>
      <div class="contrast-preview" style="color:${foregroundHex};${hasBackgroundColor ? `background:${backgroundHex};` : ''}font-weight:${fontWeight};font-size:${fontSize}px;">
        ${sanitizedText}
      </div>
      <div class="color-pickers">
        <label for="fg-text">${Lang._('TEXT')}
          <input type="color" id="fg-text" value="${foregroundHex}"/>
        </label>
        <label for="bg">${Lang._('BG')}
          <input type="color" id="bg" value="${backgroundHex}"/>
        </label>
      </div>`;
    hasContrastDetails.appendChild(contrastTools);
  }
}

/**
 * Initializes colour eyedroppers for respective tooltip.
 * This function is referenced within './interface/tooltips.js'.
 * @param {HTMLElement} container The container where the color suggestion will be inserted.
 */
export function initializeContrastTools(container) {
  const contrastTools = container?.querySelector('[data-sa11y-contrast-details]');
  if (contrastTools) {
    const details = JSON.parse(contrastTools.getAttribute('data-sa11y-contrast-details') || '{}');
    const { fontSize, fontWeight } = details;

    // Cache selectors
    const contrast = container.querySelector('#contrast');
    const contrastPreview = container.querySelector('.contrast-preview');
    const fgInput = container.querySelector('#fg-text');
    const bgInput = container.querySelector('#bg');
    const bodyText = container.querySelector('#body-text');
    const largeText = container.querySelector('#large-text');
    const ratio = container.querySelector('#value');
    const apca = container.querySelector('#apca');

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

      contrastPreview.style.color = fgColor;
      contrastPreview.style.backgroundColor = bgColor;
      contrastPreview.style.backgroundImage = 'none';

      const contrastValue = calculateContrast(convertToRGBA(fgColor), convertToRGBA(bgColor));
      const elementsToToggle = [ratio, contrast];

      if (Constants.Global.contrastAPCA) {
        // APCA
        const value = Number(contrastValue.ratio.toFixed(1));
        ratio.textContent = Math.abs(value);
        const minFontSize = fontLookupAPCA(value).slice(1)[Math.floor(fontWeight / 100) - 1];
        const passes = fontSize > minFontSize;
        toggleBadges(elementsToToggle, passes);
        apca.hidden = !passes;
      } else {
        // WCAG 2.0
        const value = contrastValue.ratio.toFixed(2);
        ratio.textContent = `${value}:1`;
        const passes = value > 3;
        toggleBadges([ratio, contrast], passes);
        largeText.hidden = value < 3;
        bodyText.hidden = value < 4.5;
      }
    };

    // Attach event listeners.
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
      details: { color: blendedColor, background, fontSize, fontWeight, isLargeText, opacity },
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
      details: { color: blendedColor, background, fontWeight, fontSize, opacity },
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
  const contrastErrors = [];
  const contrastWarnings = [];

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
        contrastWarnings.push({
          $el,
          type: 'unsupported',
          details: {
            fontSize,
            fontWeight,
            opacity,
            ...(background !== 'unsupported' && { background }),
            ...(color !== 'unsupported' && { color }),
          },
        });
      } else if (background === 'image') {
        contrastWarnings.push({
          $el,
          type: 'background-image',
          details: { color, background, fontSize, fontWeight, opacity },
        });
      } else if ($el.tagName === 'text' && $el.closest('svg')) {
        contrastWarnings.push({
          $el,
          type: 'svg',
          details: { background, fontSize, fontWeight, opacity },
        });
      } else if (isHidden || getHex(color) === getHex(background)) {
        // Ignore visually hidden elements.
      } else {
        const result = checkElementContrast($el, color, background, fontSize, fontWeight, opacity);
        if (result) {
          result.type = checkInputs ? 'input' : 'text';
          contrastErrors.push(result);
        }
      }
    }
  }

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
        contrastErrors.push(result);
      }
    }
  });

  // Do some extra processing on warnings.
  const processWarnings = (warnings) => warnings.reduce((mergedWarnings, current) => {
    if (current.type === 'background-image') {
      // For background images, merge nodes that share similar properties to minimize number of annotations.
      const previous = mergedWarnings[mergedWarnings.length - 1];
      const hasSameColor = previous
        && JSON.stringify(current.details.color) === JSON.stringify(previous.details.color);
      const hasSameParent = previous
        && current.$el.parentNode === previous.$el.parentNode;

      if (!previous || !hasSameColor || !hasSameParent) {
        mergedWarnings.push({ ...current, mergeCount: 1 });
        return mergedWarnings;
      }

      // For APCA, font size and font weight matter.
      if (option.contrastAPCA) {
        const hasSameFont = current.details.fontSize === previous.details.fontSize
          && current.details.fontWeight === previous.details.fontWeight;
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
  const processedWarnings = processWarnings(contrastWarnings);

  // Merge errors & warnings arrays.
  const contrastResults = [...contrastErrors, ...processedWarnings];

  // Iterate through all contrast results.
  contrastResults.forEach((item) => {
    const { $el, ratio, details } = item;

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
      details.fontWeight = 400;
      details.fontSize = 15.5; // For merged objects, reset font size.
    } else if ($el.tagName === 'OPTION') {
      element = $el.closest('datalist, select, optgroup');
    } else if ($el.closest('svg')) {
      element = $el.closest('svg');
    } else {
      element = $el;
    }

    // Process text within element.
    const nodeText = Utils.fnIgnore(element, ['option:not(option:first-child)']);
    const text = Utils.getText(nodeText);

    // Content for tooltip.
    const truncatedText = Utils.truncateString(text, 80);
    const sanitizedText = Utils.sanitizeHTML(truncatedText);
    details.sanitizedText = item.type === 'placeholder' && $el.placeholder
      ? Utils.sanitizeHTML($el.placeholder) : sanitizedText;

    details.ratio = ratio;

    const contrastDetails = `<div data-sa11y-contrast-details='${JSON.stringify(details)}'></div>`;

    // Iterate through contrast results based on type.
    switch (item.type) {
      case 'text':
        if (option.checks.CONTRAST_ERROR) {
          results.push({
            element: $el,
            type: option.checks.CONTRAST_ERROR.type || 'error',
            content: option.checks.CONTRAST_ERROR.content
              || Lang.sprintf('CONTRAST_ERROR') + contrastDetails,
            inline: false,
            position: 'beforebegin',
            dismiss: Utils.prepareDismissal(`CONTRAST${sanitizedText}`),
            dismissAll: option.checks.CONTRAST_ERROR.dismissAll ? 'CONTRAST_ERROR' : false,
            developer: option.checks.CONTRAST_ERROR.developer || false,
          });
        }
        break;
      case 'input':
        if (option.checks.CONTRAST_INPUT) {
          results.push({
            element,
            type: option.checks.CONTRAST_INPUT.type || 'error',
            content: option.checks.CONTRAST_INPUT.content
              || Lang.sprintf('CONTRAST_INPUT', ratio) + contrastDetails,
            inline: false,
            position: 'beforebegin',
            dismiss: Utils.prepareDismissal(`CONTRAST${$el.getAttribute('class')}${$el.tagName}${ratio}`),
            dismissAll: option.checks.CONTRAST_INPUT.dismissAll ? 'CONTRAST_INPUT' : false,
            developer: option.checks.CONTRAST_INPUT.developer || true,
          });
        }
        break;
      case 'placeholder':
        if (option.checks.CONTRAST_PLACEHOLDER) {
          results.push({
            element: $el,
            type: option.checks.CONTRAST_PLACEHOLDER.type || 'error',
            content: option.checks.CONTRAST_PLACEHOLDER.content
              || Lang.sprintf('CONTRAST_PLACEHOLDER') + contrastDetails,
            inline: false,
            position: 'afterend',
            dismiss: Utils.prepareDismissal(`CPLACEHOLDER${$el.getAttribute('class')}${$el.tagName}${ratio}`),
            dismissAll: option.checks.CONTRAST_PLACEHOLDER.dismissAll ? 'CONTRAST_PLACEHOLDER' : false,
            developer: option.checks.CONTRAST_PLACEHOLDER.developer || true,
          });
        }
        break;
      case 'svg':
      case 'unsupported':
      case 'background-image':
        if (option.checks.CONTRAST_WARNING) {
          const apcaAdvice = (option.contrastAPCA)
            ? `<hr aria-hidden="true"> ${Lang._('APCA_ADVICE')}` : '';
          results.push({
            element,
            type: option.checks.CONTRAST_WARNING.type || 'warning',
            content: option.checks.CONTRAST_WARNING.content
              || `${Lang.sprintf('CONTRAST_WARNING')} ${contrastDetails} ${apcaAdvice}`,
            inline: false,
            position: 'beforebegin',
            dismiss: Utils.prepareDismissal(`CONTRAST${sanitizedText}`),
            dismissAll: option.checks.CONTRAST_WARNING.dismissAll ? 'CONTRAST_WARNING' : false,
            developer: option.checks.CONTRAST_WARNING.developer || false,
          });
        }
        break;
      default:
        break;
    }
  });
  return results;
}
