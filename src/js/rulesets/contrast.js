import Elements from '../utils/elements';
import * as Utils from '../utils/utils';
import Lang from '../utils/lang';

/**
 * Converts a color string in the format 'color(srgb r g b [a])' to RGBA format.
 * If alpha value is not provided, it defaults to 1 (fully opaque).
 * @param {string} colorString The color string in the format 'color(srgb r g b [a])'.
 * @returns {string} The RGBA color string in the format 'rgba(r, g, b, a)'.
 * Returns 'invalid-format' if the input format is invalid.
 */
const convertColorToRGBA = (colorString) => {
  if (colorString.startsWith('color(srgb')) {
    const rgbaRegex = /srgb\s+([\d.]+)\s+([\d.]+)\s+([\d.]+)(?:\s+([\d.]+))?/; // Added alpha value regex group
    const match = colorString.match(rgbaRegex);

    if (match && match.length >= 4) {
      const [r, g, b, a] = match.slice(1);

      // Ensure the parsed values are within the valid range [0, 1].
      const parsedR = Math.min(1, parseFloat(r));
      const parsedG = Math.min(1, parseFloat(g));
      const parsedB = Math.min(1, parseFloat(b));

      // Parse alpha value or default to 1 if not provided
      const alpha = a !== undefined ? Math.min(1, parseFloat(a)) : 1;

      // Converting RGB to RGBA.
      const rgbaColor = `rgba(${Math.round(parsedR * 255)}, ${Math.round(parsedG * 255)}, ${Math.round(parsedB * 255)}, ${alpha})`;

      return rgbaColor;
    }
    return 'invalid-format';
  }
  return colorString; // Return the original color if it's not in the color() format.
};

/**
 * Rulesets: Contrast
 * Color contrast plugin by Jason Day.
 * @link https://github.com/jasonday/color-contrast
 * @link https://github.com/gka/chroma.js (Parse RGB)
*/
export default function checkContrast(results, option) {
  let contrastErrors = {
    errors: [],
    warnings: [],
  };

  /* eslint-disable */
  const contrastObject = {
    // Parse rgb(r, g, b) and rgba(r, g, b, a) strings into an array.
    parseRgb(css) {
      let i, m, rgb, f, k;
      if (m = css.match(/rgb\(\s*(\-?\d+),\s*(\-?\d+)\s*,\s*(\-?\d+)\s*\)/)) {
        rgb = m.slice(1, 4);
        for (i = f = 0; f <= 2; i = ++f) {
          rgb[i] = +rgb[i];
        }
        rgb[3] = 1;
      } else if (m = css.match(/rgba\(\s*(\-?\d+),\s*(\-?\d+)\s*,\s*(\-?\d+)\s*,\s*([01]|[01]?\.\d+)\)/)) {
        rgb = m.slice(1, 5);
        for (i = k = 0; k <= 3; i = ++k) {
          rgb[i] = +rgb[i];
        }
      }
      return rgb;
    },
    /** Based on @link http://www.w3.org/TR/WCAG20/#relativeluminancedef */
    relativeLuminance(c) {
      const lum = [];
      for (let i = 0; i < 3; i++) {
        const v = c[i] / 255;
        // eslint-disable-next-line no-restricted-properties
        lum.push(v < 0.03928 ? v / 12.92 : Math.pow((v + 0.055) / 1.055, 2.4));
      }
      return (0.2126 * lum[0]) + (0.7152 * lum[1]) + (0.0722 * lum[2]);
    },
    /** Based on @link http://www.w3.org/TR/WCAG20/#contrast-ratiodef */
    contrastRatio(x, y) {
      const l1 = contrastObject.relativeLuminance(contrastObject.parseRgb(x));
      const l2 = contrastObject.relativeLuminance(contrastObject.parseRgb(y));
      return (Math.max(l1, l2) + 0.05) / (Math.min(l1, l2) + 0.05);
    },
    getBackground(el) {
      // If item is shadowRoot (nodeType 11)
      if (el.nodeType === 11) {
        // find the parentNode outside shadow: most likely the inherited bg colour.
        const parent = el.getRootNode().host.parentNode;
        if (parent !== null) {
          el = parent;
        } else {
          // Return warning or manual check otherwise.
          return 'alpha';
        }
      }

      const styles = getComputedStyle(el);
      const bgColor = convertColorToRGBA(styles.backgroundColor);
      const bgImage = styles.backgroundImage;
      const rgb = `${contrastObject.parseRgb(bgColor)}`;
      const alpha = rgb.split(',');

      // if background has alpha transparency, flag manual check.
      if (alpha[3] < 1 && alpha[3] > 0) {
        return 'alpha';
      }

      if (bgColor !== 'rgba(0, 0, 0, 0)' && bgColor !== 'transparent' && bgImage === 'none' && alpha[3] !== '0') {
        // if element has no background image, or transparent return bgColor
        return bgColor;
      } if (bgImage !== 'none') {
        return 'image';
      }

      // retest if not returned above
      if (el.tagName === 'HTML') {
        return 'rgb(255, 255, 255)';
      }
      return contrastObject.getBackground(el.parentNode);
    },
    /* eslint-disable */
        check() {
          // resets results
          contrastErrors = {
            errors: [],
            warnings: [],
          };

          for (let i = 0; i < Elements.Found.Contrast.length; i++) {
            const elem = Elements.Found.Contrast[i];

            if (Elements.Found.Contrast) {
              let ratio;
              let error;
              let warning;

              const style = getComputedStyle(elem);
              const color = convertColorToRGBA(style.color);
              const { fill } = style;
              const fontSize = parseInt(style.fontSize, 10);
              const pointSize = fontSize * (3 / 4);
              const { fontWeight } = style;
              const htmlTag = elem.tagName;
              const background = contrastObject.getBackground(elem);
              const textString = [].reduce.call(elem.childNodes, (a, b) => a + (b.nodeType === 3 ? b.textContent : ''), '');
              const text = textString.trim();

              // Maybe visually hidden text.
              const computedStyle = window.getComputedStyle(elem);
              const opacity = computedStyle.getPropertyValue('opacity');
              const clip = computedStyle.clip.replace(/\s/g, '');
              const clipPath = computedStyle.getPropertyValue('clip-path');
              const width = parseFloat(computedStyle.width);
              const height = parseFloat(computedStyle.height);
              const maybeVisuallyHidden = (width === 1 && height === 1) &&
                (clipPath === 'inset(50%)' || /^(rect\(0(,\s*0){3}\)|rect\(1px(,\s*1px){3}\))$/.test(clip));

              // Ignore if visually hidden for screen readers.
              if (maybeVisuallyHidden) {
                // Do nothing.
              } else if (color.startsWith('color(') || opacity < 1) {
                // Push a warning if using a color() functional notation.
                warning = {
                  elem,
                };
                contrastErrors.warnings.push(warning);
              } else if (htmlTag === 'SVG') {
                ratio = Math.round(contrastObject.contrastRatio(fill, background) * 100) / 100;
                if (ratio < 3) {
                  error = {
                    elem,
                    ratio: `${ratio}:1`,
                  };
                  contrastErrors.errors.push(error);
                }
              } else if (text.length || htmlTag === 'INPUT' || htmlTag === 'SELECT' || htmlTag === 'TEXTAREA') {
                const type = elem.getAttribute('type');
                if (type === 'range' || type === 'color') {
                  // Ignore specific input types.
                } else if (background === 'image') {
                  warning = {
                    elem,
                  };
                  contrastErrors.warnings.push(warning);
                } else if (background === 'alpha') {
                  warning = {
                    elem,
                  };
                  contrastErrors.warnings.push(warning);
                } else {
                  ratio = Math.round(contrastObject.contrastRatio(color, background) * 100) / 100;
                  if (pointSize >= 18 || (pointSize >= 14 && fontWeight >= 700)) {
                    if (ratio === 1) {
                      // 1:1 is obviously a failure, but most likely false positive.
                      warning = {
                        elem,
                      };
                      contrastErrors.warnings.push(warning);
                    } else if (ratio < 3) {
                      error = {
                        elem,
                        ratio: `${ratio}:1`,
                      };
                      contrastErrors.errors.push(error);
                    }
                  } else if (ratio === 1) {
                    // 1:1 is obviously a failure, but most likely false positive.
                    warning = {
                      elem,
                    };
                    contrastErrors.warnings.push(warning);
                  } else if (ratio > 1 && ratio < 4.5) {
                    error = {
                      elem,
                      ratio: `${ratio}:1`,
                    };
                    contrastErrors.errors.push(error);
                  }
                }
              }
            }
          }
          return contrastErrors;
        },
      };

      contrastObject.check();

      contrastErrors.errors.forEach((item) => {
        const name = item.elem;
        const cratio = item.ratio;
        const clone = name.cloneNode(true);
        const nodeText = Utils.fnIgnore(clone, 'script, style, noscript, select option:not(:first-child)').textContent;
        const trimmed = Utils.removeWhitespace(nodeText);
        const truncateString = Utils.truncateString(trimmed, 150);
        const sanitizedText = Utils.sanitizeHTML(truncateString);

        if (name.tagName === 'INPUT') {
          if (option.checks.CONTRAST_INPUT) {
            results.push({
              element: name,
              type: option.checks.CONTRAST_INPUT.type || 'error',
              content: option.checks.CONTRAST_INPUT.content || Lang.sprintf('CONTRAST_INPUT', cratio),
              inline: false,
              position: 'beforebegin',
              dismiss: Utils.prepareDismissal(`CONTRAST${name.tagName}${cratio}`),
              dismissAll: option.checks.CONTRAST_WARNING.dismissAll ? 'CONTRAST_WARNING' : false,
              developer: option.checks.CONTRAST_INPUT.developer || true,
            });
          }
        } else {
          if (option.checks.CONTRAST_ERROR) {
            results.push({
              element: name,
              type: option.checks.CONTRAST_ERROR.type || 'error',
              content: option.checks.CONTRAST_ERROR.content || Lang.sprintf('CONTRAST_ERROR', cratio, sanitizedText),
              inline: false,
              position: 'beforebegin',
              dismiss: Utils.prepareDismissal(`CONTRAST${sanitizedText}`),
              dismissAll: option.checks.CONTRAST_ERROR.dismissAll ? 'CONTRAST_ERROR' : false,
              developer: option.checks.CONTRAST_ERROR.developer || false,
            });
          }
        }
      });

      if (option.checks.CONTRAST_WARNING) {
        contrastErrors.warnings.forEach((item) => {
          const name = item.elem;
          const clone = name.cloneNode(true);
          const nodeText = Utils.fnIgnore(clone, 'script, style, noscript, select option:not(:first-child)').textContent;
          const trimmed = Utils.removeWhitespace(nodeText);
          const truncateString = Utils.truncateString(trimmed, 150);
          const sanitizedText = Utils.sanitizeHTML(truncateString);

          results.push({
            element: name,
            type: option.checks.CONTRAST_WARNING.type || 'warning',
            content: option.checks.CONTRAST_WARNING.content || Lang.sprintf('CONTRAST_WARNING', sanitizedText),
            inline: false,
            position: 'beforebegin',
            dismiss: Utils.prepareDismissal(`CONTRAST${nodeText}`),
            dismissAll: option.checks.CONTRAST_WARNING.dismissAll ? 'CONTRAST_WARNING' : false,
            developer: option.checks.CONTRAST_WARNING.developer || false,
          });
        });
      }
  return results;
};
