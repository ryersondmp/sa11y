import { alphaBlend, calcAPCA, sRGBtoY, fontLookupAPCA } from 'apca-w3';
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
export default function checkContrast(results, option) {
  let contrastResults = {
    errors: [],
    warnings: [],
  };

  /**
   * Determing whether an element is visually hidden based on computed properties.
   * @param {CSSStyleDeclaration} style The style object.
   * @returns {boolean} Returns true if visually hidden based on properties.
   */
  const isScreenReaderOnly = (style) => {
    const clipPath = style.getPropertyValue('clip-path');
    const { position } = style;
    const width = parseFloat(style.width);
    const height = parseFloat(style.height);
    const { overflow } = style;
    return (
      (clipPath === 'inset(50%)') || (position === 'absolute' && width === 1 && height === 1 && overflow === 'hidden')
    );
  };

  /**
   * Normalizes a given font weight to a numeric value. Maps keywords to their numeric equivalents.
   * @param {string|number} weight - The font weight, either as a number or a keyword.
   * @returns {number} - The numeric font weight.
  */
  const normalizeFontWeight = (weight) => {
    const numericWeight = parseInt(weight, 10);
    if (!Number.isNaN(numericWeight)) return numericWeight;
    const weightMap = {
      normal: 400,
      bold: 700,
      lighter: 100,
      bolder: 900,
    };
    return weightMap[weight] || 400;
  };

  /**
   * Convert colour string to RGBA format.
   * @param {string} color The colour string to convert.
   * @param {number} opacity The computed opacity of the element (0 to 1).
   * @returns Returns colour in rgba format with alpha value.
   */
  const convertToRGBA = (color, opacity) => {
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
  };

  /**
   * Retrieves the background colour of an element by traversing up the DOM tree.
   * @param {HTMLElement} $el - The DOM element from which to start searching for the background.
   * @returns {string} - The background color in RGBA format, or "image" if background image.
  */
  const getBackground = ($el) => {
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
  };

  // Relative luminance: http://www.w3.org/TR/2008/REC-WCAG20-20081211/#relativeluminancedef
  const getLuminance = (color) => {
    const rgb = color.slice(0, 3).map((x) => {
      const normalized = x / 255;
      return normalized <= 0.03928 ? normalized / 12.92 : ((normalized + 0.055) / 1.055) ** 2.4;
    });
    return 0.2126 * rgb[0] + 0.7152 * rgb[1] + 0.0722 * rgb[2];
  };

  // WCAG contrast ratio: http://www.w3.org/TR/2008/REC-WCAG20-20081211/#contrast-ratiodef
  const getContrastRatio = (l1, l2) => {
    const lighter = Math.max(l1, l2);
    const darker = Math.min(l1, l2);
    return (lighter + 0.05) / (darker + 0.05);
  };

  /**
   * Calculate the contrast ratio or value between two colours.
   * @param {Array} color Text colour in [R,G,B,A] format.
   * @param {Array} bg Backgrounud colour in [R,G,B,A] format.
   * @returns Either WCAG 2.0 contrast ratio or APCA contrast value.
   */
  const calculateContrast = (color, bg) => {
    let ratio;
    const blendedColor = alphaBlend(color, bg);

    if (option.contrastAPCA) {
      // Note: Shorthand APCA function does auto blending!
      ratio = calcAPCA(color, bg);
    } else {
      // Uses WCAG 2.0 contrast algorithm based on luminance.
      const foreground = getLuminance(blendedColor);
      const background = getLuminance(bg);
      ratio = getContrastRatio(foreground, background);
    }
    return { ratio, blendedColor };
  };

  /**
   * Brighten a foreground text colour.
   * @param {Array} color Text colour in [R,G,B,A] format.
   * @param {Number} amount Number or increment to brighten by.
   * @returns Lighter foreground text colour.
   */
  const brighten = (color, amount) => {
    const clampedAmount = Math.min(Math.max(amount, 0), 1);
    return color.map((value) => {
      const newValue = Math.round(value + (255 - value) * clampedAmount);
      return Math.min(newValue, 255);
    });
  };

  /**
   * Darken a foreground text colour.
   * @param {Array} color Text colour in [R,G,B,A] format.
   * @param {Number} amount Number or increment to darken by.
   * @returns Darker foreground text colour.
   */
  const darken = (color, amount) => {
    const clampedAmount = Math.min(Math.max(amount, 0), 1);
    return color.map((value) => {
      const newValue = Math.round(value - value * clampedAmount);
      return Math.max(newValue, 0);
    });
  };

  /**
   * Get the hex code equivalent of an RGB colour.
   * @param {Array} color Colour in [R,G,B,A] format.
   * @returns Hexcode equivalent.
   */
  const getHex = (color) => {
    const [r, g, b] = color.map((value) => Math.min(255, Math.max(0, value)));
    const hexR = r.toString(16).padStart(2, '0');
    const hexG = g.toString(16).padStart(2, '0');
    const hexB = b.toString(16).padStart(2, '0');
    return `#${hexR}${hexG}${hexB}`;
  };

  /**
   * Suggest a foreground colour with sufficient contrast.
   * @param {Array} color Text colour in [R,G,B,A] format.
   * @param {ColorString} background Background colour in [R,G,B,A] format.
   * @param {Number} ratio The current contrast ratio.
   * @param {Boolean} isLargeText Whether text is normal or large size.
   * @returns Compliant colour hexcode.
   */
  const suggestColorWCAG = (color, background, ratio, isLargeText) => {
    const minContrastRatio = isLargeText ? 3 : 4.5;
    const bgLuminance = getLuminance(background);
    const fgLuminance = getLuminance(color);

    const adjustColor = (foregroundColor, amount) => (fgLuminance > bgLuminance
      ? brighten(foregroundColor, amount)
      : darken(foregroundColor, amount));

    let currentContrast = ratio;
    let adjustedColor = color;
    let lastValidColor = adjustedColor;
    let iterations = 0;
    const step = 0.05; // Keep step tiny so it suggests a colour as close as possible to the original.
    const maxIterations = 100;

    while (currentContrast < minContrastRatio && iterations < maxIterations) {
      adjustedColor = adjustColor(adjustedColor, step);
      const newLuminance = getLuminance(adjustedColor);
      currentContrast = getContrastRatio(newLuminance, bgLuminance);
      if (currentContrast >= minContrastRatio) lastValidColor = adjustedColor;
      iterations += 1;
    }
    return getHex(lastValidColor);
  };

  /**
   * Suggests a new colour or font size based on APCA contrast algorithm.
   * @param {Array} color Text colour in [R,G,B,A] format.
   * @param {Array} background Background colour in [R,G,B,A] format.
   * @param {Number} ratio APCA contrast ratio.
   * @param {Number} fontWeight Current font weight of the element.
   * @param {Number} fontSize Current font size of the element.
   * @returns Compliant colour hexcode and/or font size combination.
   */
  const suggestColorAPCA = (color, background, ratio, fontWeight, fontSize) => {
    const adjustColor = (foregroundColor, amount) => {
      const fgLuminance = sRGBtoY(foregroundColor);
      const bgLuminance = sRGBtoY(background);
      const adjusted = fgLuminance > bgLuminance
        ? brighten(foregroundColor, amount)
        : darken(foregroundColor, amount);
      return adjusted;
    };

    let currentRatio = ratio;
    let adjustedColor = color;
    let lastValidColor = adjustedColor;
    let iterations = 0;
    const step = 0.01;
    const maxIterations = 1000;

    while (iterations < maxIterations) {
      const lookupArray = fontLookupAPCA(currentRatio);
      const minFontSize = lookupArray[Math.floor(fontWeight / 100)];
      const passes = fontSize >= minFontSize && minFontSize < 777;

      if (passes) {
        lastValidColor = adjustedColor;
        break;
      }

      adjustedColor = adjustColor(adjustedColor, step);
      const { ratio: newRatio } = calculateContrast(adjustedColor, background);
      currentRatio = newRatio;
      iterations += 1;
    }

    // TO-DO: If no valid colour, suggest new font size and weight.
    const originalHex = getHex(color);
    const suggestedHex = getHex(lastValidColor);
    if (suggestedHex === originalHex) {
      return getHex(adjustedColor);
    }
    return suggestedHex;
  };

  /**
   * Calculate an elements contrast based on WCAG 2.0 contrast algorithm.
   * @param {HTMLElement} $el The element in the DOM.
   * @param {Array} color Text colour in [R,G,B,A] format.
   * @param {Array} background Background colour in [R,G,B,A] format.
   * @param {Boolean} isVisuallyHidden Check if element is visually hidden.
   * @param {Number} fontSize Element's font size.
   * @param {Number} fontWeight Element's font weight.
   */
  const wcagAlgorithm = ($el, color, background, isVisuallyHidden, fontSize, fontWeight) => {
    const htmlTag = $el.tagName;
    const opacity = parseFloat($el.style.opacity);
    if (isVisuallyHidden || opacity === 0 || color === background) {
      // Visually hidden.
    } else if (htmlTag === 'SVG') {
      const ratio = calculateContrast($el.style.fill, background);
      if (ratio < 3) {
        contrastResults.errors.push({ $el, ratio: `${ratio.toFixed(2)}:1` });
      }
    } else if (background === 'image') {
      if (!['INPUT', 'SELECT', 'TEXTAREA'].includes(htmlTag)) {
        // Don't flag warning for inputs with background image...
        contrastResults.warnings.push({ $el });
      }
    } else {
      const { ratio, blendedColor } = calculateContrast(color, background);
      const isLargeText = fontSize >= 24 || (fontSize >= 18.67 && fontWeight >= 700);
      const hasLowContrast = ratio < 3;
      const hasLowContrastNormalText = ratio > 1 && ratio < 4.5;

      if (ratio === 1) {
        // 1:1 is obviously a failure, but most likely false positive.
      } else if (isLargeText && hasLowContrast) {
        const suggestedColor = suggestColorWCAG(blendedColor, background, ratio, isLargeText);
        contrastResults.errors.push({
          $el,
          ratio: `${ratio.toFixed(2)}:1`,
          suggestedColor,
          background: getHex(background),
        });
      } else if (!isLargeText && hasLowContrastNormalText) {
        const suggestedColor = suggestColorWCAG(blendedColor, background, ratio, false);
        contrastResults.errors.push({
          $el,
          ratio: `${ratio.toFixed(2)}:1`,
          suggestedColor,
          background: getHex(background),
        });
      }
    }
  };

  /**
   * Calculate an elements contrast based on APCA algorithm.
   * @param {HTMLElement} $el The element in the DOM.
   * @param {Array} color Text colour in [R,G,B,A] format.
   * @param {Array} background Background colour in [R,G,B,A] format.
   * @param {Boolean} isVisuallyHidden Check if element is visually hidden.
   * @param {Number} fontSize Element's font size.
   * @param {Number} fontWeight Element's font weight.
  */
  const apcaAlgorithm = ($el, color, background, isVisuallyHidden, fontSize, fontWeight) => {
    const opacity = parseFloat($el.style.opacity);
    if (isVisuallyHidden || opacity === 0 || color === background) {
      // Visually hidden.
    } else if (background === 'image') {
      if (!['INPUT', 'SELECT', 'TEXTAREA'].includes($el.tagName)) {
        // Don't flag warning for inputs with background image...
        contrastResults.warnings.push({ $el });
      }
    } else {
      const { ratio, blendedColor } = calculateContrast(color, background);

      const lookupArray = fontLookupAPCA(ratio);
      const minFontSize = lookupArray[Math.floor(fontWeight / 100)];
      const passes = fontSize >= minFontSize && minFontSize < 777;

      const suggestColor = suggestColorAPCA(blendedColor, background, ratio, fontWeight, fontSize);
      if (!passes) {
        contrastResults.errors.push({
          $el,
          ratio: `APCA ${ratio.toFixed(1)}`,
          suggestedColor: suggestColor,
          background: getHex(background),
        });
      }
    }
  };

  /**
   * Some additional processing before pushing to Sa11y's results array.
   * @param {Object} item A single item (object) from the contrast results object.
   * @returns Element, ratio, sanitized text for tooltip, suggested colour, and background colour.
   */
  const processContrastItem = (item) => {
    const { $el } = item;
    const { ratio } = item;
    const { suggestedColor } = item;
    const { background } = item;
    const clone = $el.cloneNode(true); // Ignore text within specific nodes.
    const ignoreTextWithinElements = 'script, style, noscript, select option:not(:first-child)';
    const nodeText = Utils.fnIgnore(clone, ignoreTextWithinElements);
    const text = Utils.getText(nodeText);
    const sanitizedText = Utils.sanitizeHTML(Utils.truncateString(text, 150));
    return { $el, ratio, sanitizedText, suggestedColor, background };
  };

  /**
  * Iterate through all elements on the page, calculating the contrast of each item with preferred algorthim.
  * @returns {Object[]} Returns a object containing all contrast errors and warnings.
  */
  (() => {
    contrastResults = {
      errors: [],
      warnings: [],
    };

    for (let i = 0; i < Elements.Found.Contrast.length; i++) {
      // Get computed styles of each element.
      const $el = Elements.Found.Contrast[i];
      const style = getComputedStyle($el);
      const { opacity } = style;
      const color = convertToRGBA(style.color, opacity);
      const fontSize = parseInt(style.fontSize, 10);
      const getFontWeight = style.fontWeight;
      const fontWeight = normalizeFontWeight(getFontWeight);
      const background = getBackground($el);

      // Check if element is visually hidden to screen readers.
      const isVisuallyHidden = isScreenReaderOnly(style);

      // Filter only text nodes.
      const textString = Array.from($el.childNodes)
        .filter((node) => node.nodeType === 3)
        .map((node) => node.textContent)
        .join('');
      const text = textString.trim();

      // Preferred contrast algorithm.
      const algorithm = option.contrastAPCA ? apcaAlgorithm : wcagAlgorithm;
      if (text.length !== 0 || ($el.tagName === 'INPUT' || $el.tagName === 'TEXTAREA')) {
        algorithm($el, color, background, isVisuallyHidden, fontSize, fontWeight);
      }
    }
    return contrastResults;
  })();

  /* Contrast errors */
  contrastResults.errors.forEach((item) => {
    const { $el, ratio, sanitizedText, suggestedColor, background } = processContrastItem(item);
    const suggestion = `<strong class="badge" style="color:${suggestedColor}!important;background-color:${background}">${suggestedColor}</strong>`;

    if ($el.tagName === 'INPUT' || $el.tagName === 'TEXTAREA') {
      if (option.checks.CONTRAST_INPUT) {
        results.push({
          element: $el,
          type: option.checks.CONTRAST_INPUT.type || 'error',
          content: option.checks.CONTRAST_INPUT.content || Lang.sprintf('CONTRAST_INPUT', suggestion, ratio),
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
        content: option.checks.CONTRAST_ERROR.content || Lang.sprintf('CONTRAST_ERROR', suggestion, ratio, sanitizedText),
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
