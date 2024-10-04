import chroma from 'chroma-js';
import Elements from '../utils/elements';
import * as Utils from '../utils/utils';
import Lang from '../utils/lang';

/**
 * Rulesets: Contrast
 * With help of Jason Day (color-contrast) and Gregor Aisch (chroma.js).
 * APCA contrast checking is experimental.
 * @link https://github.com/jasonday/color-contrast
 * @link https://github.com/gka/chroma.js
 * @link https://github.com/Myndex/SAPC-APCA
*/
export default function checkContrast(results, option) {
  let contrastResults = {
    errors: [],
    warnings: [],
  };
  const contrastObject = {
    validateColor(color, opacity, type) {
      let colorString = color;

      // Let browser do conversion in rgb for non-supported colour spaces.
      if (!colorString.startsWith('rgb')) {
        const canvas = document.createElement('canvas');
        const context = canvas.getContext('2d');
        context.fillStyle = colorString;
        context.fillRect(0, 0, 1, 1);
        const imageData = context.getImageData(0, 0, 1, 1);
        const [r, g, b, a] = imageData.data; // values in [0, 255]
        const alpha = (a / 255).toFixed(6);
        return `rgba(${r}, ${g}, ${b}, ${alpha})`;
      }

      // If element has opacity attribute; ammend the foreground text color string.
      if (opacity && opacity < 1) {
        colorString = colorString.replace('rgb', 'rgba').replace(')', `, ${opacity})`);
      }

      // Validate colour with Chroma.js.
      if (type === 'color') {
        colorString = chroma.valid(colorString) ? colorString : 'invalidColor';
      }

      return colorString;
    },
    getBackground($el) {
      let targetEl = $el;
      while (targetEl && targetEl.nodeType === 1) {
        const styles = getComputedStyle(targetEl);
        const bgColor = this.validateColor(styles.backgroundColor);
        const bgImage = styles.backgroundImage;
        if (bgImage !== 'none') {
          return 'image';
        }
        if (bgColor !== 'rgba(0, 0, 0, 0)' && bgColor !== 'transparent') {
          return bgColor; // Return the first non-transparent background color.
        }
        if (targetEl.tagName === 'HTML') {
          return 'rgb(255, 255, 255)'; // Default to white if we reach the HTML tag.
        }
        targetEl = targetEl.parentNode;
      }
      return 'rgb(255, 255, 255)'; // Default to white if no background color is found.
    },
    normalizeFontWeight(weight) {
      const numericWeight = parseInt(weight, 10);
      if (!Number.isNaN(numericWeight)) return numericWeight;
      const weightMap = {
        normal: 400,
        bold: 700,
        lighter: 100,
        bolder: 900,
      };
      return weightMap[weight] || 400;
    },
    calculateContrast(textColor, bgColor) {
      // Convert colors to Chroma.js objects.
      const color = chroma(textColor);
      const bg = chroma(bgColor);

      // If text color has alpha, mix it with the background.
      if (color.alpha() < 1) {
        const mixed = chroma.mix(bg, color, color.alpha(), 'rgb').rgb();
        return option.contrastAPCA ? chroma.contrastAPCA(mixed, bg) : chroma.contrast(mixed, bg);
      }
      return option.contrastAPCA ? chroma.contrastAPCA(color, bg) : chroma.contrast(color, bg);
    },
    isScreenReaderOnly(style) {
      const clipPath = style.getPropertyValue('clip-path');
      const { position } = style;
      const width = parseFloat(style.width);
      const height = parseFloat(style.height);
      const { overflow } = style;
      return (
        (clipPath === 'inset(50%)') || (position === 'absolute' && width === 1 && height === 1 && overflow === 'hidden')
      );
    },
    wcagAlgorithm($el, style, srOnly, color, fontSize, fontWeight, background) {
      let ratio;
      const htmlTag = $el.tagName;
      const opacity = parseFloat(style.opacity);
      if (srOnly || opacity === 0 || color === background) {
        // Visually hidden.
      } else if (htmlTag === 'SVG') {
        ratio = this.calculateContrast(style.fill, background);
        if (ratio < 3) {
          contrastResults.errors.push({ $el, ratio: `${ratio.toFixed(2)}:1` });
        }
      } else if (background === 'image') {
        if (!['INPUT', 'SELECT', 'TEXTAREA'].includes(htmlTag)) {
          // Don't flag warning for inputs with background image...
          contrastResults.warnings.push({ $el });
        }
      } else {
        ratio = this.calculateContrast(color, background);
        const isLargeText = fontSize >= 24 || (fontSize >= 18.67 && fontWeight >= 700);
        const hasLowContrast = ratio < 3;
        const hasLowContrastNormalText = ratio > 1 && ratio < 4.5;

        if (ratio === 1) {
          // 1:1 is obviously a failure, but most likely false positive.
        } else if (isLargeText && hasLowContrast) {
          contrastResults.errors.push({ $el, ratio: `${ratio.toFixed(2)}:1` });
        } else if (!isLargeText && hasLowContrastNormalText) {
          contrastResults.errors.push({ $el, ratio: `${ratio.toFixed(2)}:1` });
        }
      }
    },
    apcaAlgorithm($el, style, srOnly, color, fontSize, fontWeight, background) {
      const opacity = parseFloat(style.opacity);
      if (srOnly || opacity === 0 || color === background) {
        // Visually hidden.
      } else if (background === 'image') {
        if (!['INPUT', 'SELECT', 'TEXTAREA'].includes($el.tagName)) {
          // Don't flag warning for inputs with background image...
          contrastResults.warnings.push({ $el });
        }
      } else {
        const contrast = this.calculateContrast(color, background);
        const fontSizes = [12, 14, 16, 18, 24, 30, 36, 48, 60, 72, 96, 120];
        const fontWeights = [200, 300, 400, 500, 600, 700];
        const minContrastTable = {
          12: { 200: false, 300: false, 400: false, 500: 100, 600: 90, 700: 80 },
          14: { 200: false, 300: false, 400: 100, 500: 90, 600: 80, 700: 60 },
          16: { 200: false, 300: 100, 400: 90, 500: 80, 600: 60, 700: 55 },
          18: { 200: false, 300: 90, 400: 80, 500: 60, 600: 55, 700: 50 },
          24: { 200: 100, 300: 80, 400: 60, 500: 55, 600: 50, 700: 40 },
          30: { 200: 90, 300: 70, 400: 55, 500: 50, 600: 40, 700: 38 },
          36: { 200: 80, 300: 60, 400: 50, 500: 40, 600: 38, 700: 35 },
          48: { 200: 70, 300: 55, 400: 40, 500: 38, 600: 35, 700: 30 },
          60: { 200: 60, 300: 50, 400: 38, 500: 35, 600: 30, 700: 25 },
          72: { 200: 55, 300: 40, 400: 35, 500: 30, 600: 25, 700: 20 },
          96: { 200: 50, 300: 35, 400: 30, 500: 25, 600: 20, 700: 20 },
          120: { 200: 40, 300: 30, 400: 25, 500: 20, 600: 20, 700: 20 },
        };

        // Normalize font size to nearest available size.
        const normalizedSize = fontSizes.reduce((prev, curr) => (Math.abs(curr - fontSize) < Math.abs(prev - fontSize)
          ? curr : prev));

        // Normalize font weight to nearest available weight.
        const normalizedWeight = fontWeights.reduce((prev, curr) => (Math.abs(curr - fontWeight) < Math.abs(prev - fontWeight)
          ? curr : prev));

        // Get minimum required contrast.
        const minContrast = minContrastTable[normalizedSize][normalizedWeight];

        // Check if contrast meets or exceeds the minimum required.
        const passes = minContrast !== false && Math.abs(contrast) >= minContrast;
        if (!passes) {
          contrastResults.errors.push({ $el, ratio: `APCA ${contrast.toFixed(1)}` });
          console.log(
            `Text: ${Utils.getText($el)}
           Foreground: ${color}
           Background: ${background}
           Font Weight: ${fontWeight}
           Font Size: ${fontSize}
           APCA: ${contrast},
           Opacity: ${style.opacity}`,
          );
        }
      }
    },
    check() {
      contrastResults = {
        errors: [],
        warnings: [],
      };

      for (let i = 0; i < Elements.Found.Contrast.length; i++) {
        // Get computed styles of each element.
        const $el = Elements.Found.Contrast[i];
        const style = getComputedStyle($el);
        const { opacity } = style;
        const color = this.validateColor(style.color, opacity, 'color');
        const fontSize = parseInt(style.fontSize, 10);
        const getFontWeight = style.fontWeight;
        const fontWeight = this.normalizeFontWeight(getFontWeight);
        const background = this.getBackground($el);

        // If element is visually hidden via screen reader only class.
        const srOnly = this.isScreenReaderOnly(style);

        // Filter only text nodes.
        const textString = Array.from($el.childNodes)
          .filter((node) => node.nodeType === 3)
          .map((node) => node.textContent)
          .join('');
        const text = textString.trim();

        // Preferred contrast algorithm.
        const algorithm = option.contrastAPCA ? 'apcaAlgorithm' : 'wcagAlgorithm';
        if (color === 'invalidColor') {
          // Throw console error if unsupported colour.
          throw new Error(`Sa11y: Unsupported color format for contrast testing: ${color}`);
        } else if (text.length !== 0 || ($el.tagName === 'INPUT' || $el.tagName === 'TEXTAREA')) {
          // Only check for contrast on nodes with text.
          this[algorithm]($el, style, srOnly, color, fontSize, fontWeight, background);
        }
      }
      return contrastResults;
    },
  };
  contrastObject.check();

  // Utility function to clone the element, get the text content, while ignoring text within specific elements.
  const processContrastItem = (item) => {
    const { $el } = item;
    const { ratio } = item;
    const clone = $el.cloneNode(true);
    const ignoreTextWithinElements = 'script, style, noscript, select option:not(:first-child)';
    const nodeText = Utils.fnIgnore(clone, ignoreTextWithinElements);
    const text = Utils.getText(nodeText);
    const sanitizedText = Utils.sanitizeHTML(Utils.truncateString(text, 150));
    return { $el, ratio, sanitizedText };
  };

  // Contrast errors
  contrastResults.errors.forEach((item) => {
    const { $el, ratio, sanitizedText } = processContrastItem(item);
    if ($el.tagName === 'INPUT' || $el.tagName === 'TEXTAREA') {
      if (option.checks.CONTRAST_INPUT) {
        results.push({
          element: $el,
          type: option.checks.CONTRAST_INPUT.type || 'error',
          content: option.checks.CONTRAST_INPUT.content || Lang.sprintf('CONTRAST_INPUT', ratio),
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
        content: option.checks.CONTRAST_ERROR.content || Lang.sprintf('CONTRAST_ERROR', ratio, sanitizedText),
        inline: false,
        position: 'beforebegin',
        dismiss: Utils.prepareDismissal(`CONTRAST${sanitizedText}`),
        dismissAll: option.checks.CONTRAST_ERROR.dismissAll ? 'CONTRAST_ERROR' : false,
        developer: option.checks.CONTRAST_ERROR.developer || false,
      });
    }
  });

  // Contrast warnings
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
