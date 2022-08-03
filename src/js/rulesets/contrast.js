// ============================================================
// Rulesets: Contrast
// Color contrast plugin by jasonday: https://github.com/jasonday/color-contrast
// ============================================================
import Lang from '../components/translation';
import { ERROR, WARNING } from '../components/constants';
import * as utilities from '../components/utilities';
import { annotate } from '../components/annotate';

export default function checkContrast() {
  let contrastErrors = {
    errors: [],
    warnings: [],
  };

  const elements = Sa11y.$contrast;
  const contrast = {
    // Parse rgb(r, g, b) and rgba(r, g, b, a) strings into an array.
    // Adapted from https://github.com/gka/chroma.js
    parseRgb(css) {
      let i;
      let m;
      let rgb;
      let f;
      let k;
      // eslint-disable-next-line no-useless-escape
      if (m = css.match(/rgb\(\s*(\-?\d+),\s*(\-?\d+)\s*,\s*(\-?\d+)\s*\)/)) {
        rgb = m.slice(1, 4);
        for (i = f = 0; f <= 2; i = ++f) {
          rgb[i] = +rgb[i];
        }
        rgb[3] = 1;
        // eslint-disable-next-line no-useless-escape
      } else if (m = css.match(/rgba\(\s*(\-?\d+),\s*(\-?\d+)\s*,\s*(\-?\d+)\s*,\s*([01]|[01]?\.\d+)\)/)) {
        rgb = m.slice(1, 5);
        for (i = k = 0; k <= 3; i = ++k) {
          rgb[i] = +rgb[i];
        }
      }
      return rgb;
    },
    // Based on http://www.w3.org/TR/WCAG20/#relativeluminancedef
    relativeLuminance(c) {
      const lum = [];
      for (let i = 0; i < 3; i++) {
        const v = c[i] / 255;
        // eslint-disable-next-line no-restricted-properties
        lum.push(v < 0.03928 ? v / 12.92 : Math.pow((v + 0.055) / 1.055, 2.4));
      }
      return (0.2126 * lum[0]) + (0.7152 * lum[1]) + (0.0722 * lum[2]);
    },
    // Based on http://www.w3.org/TR/WCAG20/#contrast-ratiodef
    contrastRatio(x, y) {
      const l1 = contrast.relativeLuminance(contrast.parseRgb(x));
      const l2 = contrast.relativeLuminance(contrast.parseRgb(y));
      return (Math.max(l1, l2) + 0.05) / (Math.min(l1, l2) + 0.05);
    },

    getBackground(el) {
      const styles = getComputedStyle(el);
      const bgColor = styles.backgroundColor;
      const bgImage = styles.backgroundImage;
      const rgb = `${contrast.parseRgb(bgColor)}`;
      const alpha = rgb.split(',');

      // if background has alpha transparency, flag manual check
      if (alpha[3] < 1 && alpha[3] > 0) {
        return 'alpha';
      }

      // if element has no background image, or transparent return bgColor
      if (bgColor !== 'rgba(0, 0, 0, 0)' && bgColor !== 'transparent' && bgImage === 'none' && alpha[3] !== '0') {
        return bgColor;
      } if (bgImage !== 'none') {
        return 'image';
      }

      // retest if not returned above
      if (el.tagName === 'HTML') {
        return 'rgb(255, 255, 255)';
      }
      return contrast.getBackground(el.parentNode);
    },
    check() {
      // resets results
      contrastErrors = {
        errors: [],
        warnings: [],
      };

      for (let i = 0; i < elements.length; i++) {
        const elem = elements[i];
        if (contrast) {
          const style = getComputedStyle(elem);
          const { color } = style;
          const { fill } = style;
          const fontSize = parseInt(style.fontSize, 10);
          const pointSize = fontSize * (3 / 4);
          const { fontWeight } = style;
          const htmlTag = elem.tagName;
          const background = contrast.getBackground(elem);
          const textString = [].reduce.call(elem.childNodes, (a, b) => a + (b.nodeType === 3 ? b.textContent : ''), '');
          const text = textString.trim();
          let ratio;
          let error;
          let warning;

          if (htmlTag === 'SVG') {
            ratio = Math.round(contrast.contrastRatio(fill, background) * 100) / 100;
            if (ratio < 3) {
              error = {
                elem,
                ratio: `${ratio}:1`,
              };
              contrastErrors.errors.push(error);
            }
          } else if (text.length || htmlTag === 'INPUT' || htmlTag === 'SELECT' || htmlTag === 'TEXTAREA') {
            // does element have a background image - needs to be manually reviewed
            if (background === 'image') {
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
              ratio = Math.round(contrast.contrastRatio(color, background) * 100) / 100;
              if (pointSize >= 18 || (pointSize >= 14 && fontWeight >= 700)) {
                if (ratio < 3) {
                  error = {
                    elem,
                    ratio: `${ratio}:1`,
                  };
                  contrastErrors.errors.push(error);
                }
              } else if (ratio < 4.5) {
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

  contrast.check();

  contrastErrors.errors.forEach((item) => {
    const name = item.elem;
    const cratio = item.ratio;
    const clone = name.cloneNode(true);
    const removeSa11yHeadingLabel = clone.querySelectorAll('.sa11y-heading-label');
    for (let i = 0; i < removeSa11yHeadingLabel.length; i++) {
      clone.removeChild(removeSa11yHeadingLabel[i]);
    }

    const nodetext = utilities.fnIgnore(clone, 'script').textContent;
    if (name.tagName === 'INPUT') {
      name.insertAdjacentHTML('beforebegin', annotate(ERROR, Lang.sprintf('CONTRAST_INPUT_ERROR', cratio)));
    } else {
      name.insertAdjacentHTML('beforebegin', annotate(ERROR, Lang.sprintf('CONTRAST_ERROR', cratio, nodetext)));
    }
  });

  contrastErrors.warnings.forEach((item) => {
    const name = item.elem;
    const clone = name.cloneNode(true);
    const removeSa11yHeadingLabel = clone.querySelectorAll('.sa11y-heading-label');
    for (let i = 0; i < removeSa11yHeadingLabel.length; i++) {
      clone.removeChild(removeSa11yHeadingLabel[i]);
    }
    const nodetext = utilities.fnIgnore(clone, 'script').textContent;
    name.insertAdjacentHTML('beforebegin', annotate(WARNING, Lang.sprintf('CONTRAST_WARNING', nodetext)));
  });
}
