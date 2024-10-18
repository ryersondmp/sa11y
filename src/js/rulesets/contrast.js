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
    normal: 400,
    bold: 700,
    lighter: 100,
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

  // Let the browser do conversion in rgb for non-supported colour spaces.
  if (!colorString.startsWith('rgb')) {
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
 * Suggests a new colour or font size based on APCA contrast algorithm.
 * @param {number[]} color Text colour in [R,G,B,A] format.
 * @param {Array} background Background colour in [R,G,B,A] format.
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
  const notGoodAtAnySize = minimumSizeRequired === 999 || minimumSizeRequired === 777;

  // Has low contrast, but font size is okay.
  // Lc of 60 is "sort of like" the old WCAG 2's 4.5:1.
  const lowContrastButSizeOk = contrast.ratio < 60;

  // Loop to find a new colour.
  if (notGoodAtAnySize || lowContrastButSizeOk) {
    const step = 0.05;
    const maxIterations = 500;
    let iterations = 0;
    let previousColor = null;
    while (iterations < maxIterations) {
      iterations += 1;
      adjustedColor = adjustColor(adjustedColor, step);
      contrast = calculateContrast(adjustedColor, background);
      fontLookup = fontLookupAPCA(contrast.ratio).slice(1);

      // console.log(`%c ${getHex(adjustedColor)} | ${contrast.ratio.toFixed(1)} | ${fontLookup}`, `color:${getHex(adjustedColor)};background:${getHex(background)}`);

      // Valid colour found.
      if (fontLookup[fontWeightIndex] <= fontSize) {
        return { color: getHex(adjustedColor), size: null };
      }

      // Break the loop once it starts suggesting the same colour. It means there's no valid colour at the current font size, so suggest recommended font size too.
      if (previousColor && getHex(previousColor) === getHex(adjustedColor)) {
        return { color: getHex(adjustedColor), size: Math.ceil(fontLookup[fontWeightIndex]) };
      }
      previousColor = adjustedColor;
    }
    return { color: getHex(adjustedColor), size: null };
  }

  // If good contrast, but text is too small, suggest minimimum font size.
  if (minimumSizeRequired > fontSize && contrast.ratio > 60) {
    return { color: null, size: Math.ceil(minimumSizeRequired) };
  }

  return { color: getHex(adjustedColor), size: null };
}

/**
 * Generate colour suggestions for tooltip upon tooltip opening.
 * This function is referenced within './interface/tooltips.js'
 * For performance reasons, it is only called upon tooltip opening.
 * @param {Object} details An object containing the colours, font weight, and size of an element.
 * @returns Suggested colour combinations for tooltip.
 */
export function generateColorSuggestion(details) {
  const { color, background, weight, size, isLargeText } = details;
  const suggested = Constants.Global.contrastAPCA
    ? suggestColorAPCA(color, background, weight, size)
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
  return advice;
}

/**
 * Check contrast.
 * @param {Array} results Sa11y's results array.
 * @param {Object} option Sa11y's options object.
 * @returns Contrast results.
 */
export default function checkContrast(results, option) {
  // Initialize contrast object.
  const contrastResults = {
    errors: [],
    warnings: [],
  };

  /**
   * Calculate an elements contrast based on WCAG 2.0 contrast algorithm.
   * @param {HTMLElement} $el The element in the DOM.
   * @param {number[]} color Text colour in [R,G,B,A] format.
   * @param {Array} background Background colour in [R,G,B,A] format.
   * @param {boolean} isVisuallyHidden Check if element is visually hidden.
   * @param {number} fontSize Element's font size.
   * @param {number} fontWeight Element's font weight.
   */
  const wcagAlgorithm = ($el, color, background, fontSize, fontWeight, opacity) => {
    const { ratio, blendedColor } = calculateContrast(color, background);
    const isLargeText = fontSize >= 24 || (fontSize >= 18.67 && fontWeight >= 700);
    const hasLowContrast = ratio < 3;
    const hasLowContrastNormalText = ratio > 1 && ratio < 4.5;

    if ((isLargeText && hasLowContrast) || (!isLargeText && hasLowContrastNormalText)) {
      contrastResults.errors.push({
        $el,
        ratio: `${ratio.toFixed(2)}:1`,
        details: { color: blendedColor, background, isLargeText, opacity },
      });
    }
  };

  /**
   * Calculate an elements contrast based on APCA algorithm.
   * @param {HTMLElement} $el The element in the DOM.
   * @param {number[]} color Text colour in [R,G,B,A] format.
   * @param {Array} background Background colour in [R,G,B,A] format.
   * @param {boolean} isVisuallyHidden Check if element is visually hidden.
   * @param {number} fontSize Element's font size.
   * @param {number} fontWeight Element's font weight.
  */
  const apcaAlgorithm = ($el, color, background, fontSize, fontWeight, opacity) => {
    const { ratio, blendedColor } = calculateContrast(color, background);

    // Returns 9 font sizes in px corresponding to weights 100 thru 900.
    // Returns ['LcValue',100,200,300,400,500,600,700,800,900]
    const fontLookup = fontLookupAPCA(ratio).slice(1);

    // Get minimum font size based on weight.
    const fontWeightIndex = Math.floor(fontWeight / 100) - 1;
    const minFontSize = fontLookup[fontWeightIndex];

    if (fontSize < minFontSize) {
      contrastResults.errors.push({
        $el,
        ratio: `APCA ${Math.abs(ratio.toFixed(1))}`,
        details: { color: blendedColor, background, weight: fontWeight, size: fontSize, opacity },
      });
    }
  };

  // Iterate through all elements on the page.
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

    // Check if element is visually hidden to screen readers.
    const isVisuallyHidden = Utils.isScreenReaderOnly($el);

    // Filter only text nodes.
    const textString = Array.from($el.childNodes)
      .filter((node) => node.nodeType === 3)
      .map((node) => node.textContent)
      .join('');
    const text = textString.trim();

    // Inputs to check
    const checkInputs = ['SELECT', 'INPUT', 'TEXTAREA'].includes($el.tagName);

    // Contrast check only elements with text, inputs, and textareas.
    if (text.length !== 0 || checkInputs) {
      if (background === 'image') {
        // Warnings for elements with a background image, ignoring inputs.
        if (!checkInputs && !$el.closest('nav')) {
          contrastResults.warnings.push({ $el });
        }
      } else if (isVisuallyHidden || opacity === 0 || getHex(color) === getHex(background)) {
        // Ignore visually hidden elements.
      } else {
        // Preferred contrast algorithm.
        const algorithm = option.contrastAPCA ? apcaAlgorithm : wcagAlgorithm;
        algorithm($el, color, background, fontSize, fontWeight, opacity);
      }
    }
  }

  /**
   * Some additional processing before pushing to Sa11y's results array.
   * @param {Object} item A single item (object) from the contrast results object.
   * @returns Element, ratio, sanitized text for tooltip, suggested colour, and background colour.
   */
  const processContrastItem = ({ $el, ratio, details }) => {
    const clone = $el.cloneNode(true);
    const ignoreElements = ['script', 'style', 'noscript'];
    const nodeText = Utils.fnIgnore(clone, ignoreElements);
    const text = Utils.getText(nodeText);
    const truncatedText = Utils.truncateString(text, 100);
    const sanitizedText = Utils.sanitizeHTML(truncatedText);
    const suggestion = (option.contrastSuggestions && details !== undefined)
      ? `<div data-sa11y-suggestion='${JSON.stringify(details)}'></div>` : '';
    const opacity = (details !== undefined) ? details.opacity : '';
    return { $el, ratio, sanitizedText, suggestion, opacity };
  };

  /* Contrast errors */
  contrastResults.errors.forEach((item) => {
    const { $el, ratio, sanitizedText, suggestion, opacity } = processContrastItem(item);
    const advice = opacity < 1
      ? `<hr aria-hidden="true"> ${Lang.sprintf('CONTRAST_OPACITY')} <strong class="badge">${opacity}</strong>`
      : suggestion;

    if (['SELECT', 'INPUT', 'TEXTAREA'].includes($el.tagName)) {
      if (option.checks.CONTRAST_INPUT) {
        results.push({
          element: $el,
          type: option.checks.CONTRAST_INPUT.type || 'error',
          content: option.checks.CONTRAST_INPUT.content
            || Lang.sprintf('CONTRAST_INPUT', ratio) + advice,
          inline: false,
          position: 'beforebegin',
          dismiss: Utils.prepareDismissal(`CONTRAST${$el.getAttribute('class')}${$el.tagName}${ratio}`),
          dismissAll: option.checks.CONTRAST_INPUT.dismissAll ? 'CONTRAST_INPUT' : false,
          developer: option.checks.CONTRAST_INPUT.developer || true,
        });
      }
    } else if (option.checks.CONTRAST_ERROR && sanitizedText.length !== 0) {
      results.push({
        element: $el,
        type: option.checks.CONTRAST_ERROR.type || 'error',
        content: option.checks.CONTRAST_ERROR.content
          || Lang.sprintf('CONTRAST_ERROR', ratio, sanitizedText) + advice,
        inline: false,
        position: 'beforebegin',
        dismiss: Utils.prepareDismissal(`CONTRAST${sanitizedText}`),
        dismissAll: option.checks.CONTRAST_ERROR.dismissAll ? 'CONTRAST_ERROR' : false,
        developer: option.checks.CONTRAST_ERROR.developer || false,
      });
    }
  });

  /* Contrast warnings */
  if (option.checks.CONTRAST_WARNING) {
    contrastResults.warnings.forEach((item) => {
      const { $el, sanitizedText } = processContrastItem(item);
      if (sanitizedText.length !== 0) {
        results.push({
          element: $el,
          type: option.checks.CONTRAST_WARNING.type || 'warning',
          content: option.checks.CONTRAST_WARNING.content || Lang.sprintf('CONTRAST_WARNING', sanitizedText),
          inline: false,
          position: 'beforebegin',
          dismiss: Utils.prepareDismissal(`CONTRAST${sanitizedText}`),
          dismissAll: option.checks.CONTRAST_WARNING.dismissAll ? 'CONTRAST_WARNING' : false,
          developer: option.checks.CONTRAST_WARNING.developer || false,
        });
      }
    });
  }

  return results;
}
