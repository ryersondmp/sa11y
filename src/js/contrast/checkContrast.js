import Constants from '../utils/constants';
import Elements from '../utils/elements';
import Lang from '../utils/lang';
import * as Utils from '../utils/utils';
import * as Contrast from './utils';

/**
 * Rulesets: Contrast
 * @param {Array} results Sa11y's results array.
 * @param {Object} option Sa11y's options object.
 * @returns Contrast results.
 * APCA contrast checking is experimental. References:
 * @link https://github.com/jasonday/color-contrast
 * @link https://github.com/gka/chroma.js
 * @link https://github.com/Myndex/SAPC-APCA
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
    const color = Contrast.convertToRGBA(style.color, opacity);
    const fontSize = parseFloat(style.fontSize);
    const getFontWeight = style.fontWeight;
    const fontWeight = Contrast.normalizeFontWeight(getFontWeight);
    const background = Contrast.getBackground($el, Constants.Global.shadowDetection);

    // Check if element is visually hidden to screen readers or explicitly hidden.
    const isVisuallyHidden = Utils.isScreenReaderOnly($el);
    const isExplicitlyHidden = Utils.isElementHidden($el);
    const isHidden = isExplicitlyHidden || isVisuallyHidden || opacity === 0 || fontSize === 0;

    // Filter only text nodes.
    const textString = Array.from($el.childNodes)
      .filter((node) => node.nodeType === 3)
      .map((node) => node.textContent)
      .join('');
    const text = textString.trim();

    // Inputs to check
    const checkInputs = ['SELECT', 'INPUT', 'TEXTAREA'].includes($el.tagName);

    // Only check elements with text and inputs.
    if (text.length !== 0 || checkInputs) {
      const isLargeText = fontSize >= 24 || (fontSize >= 18.67 && fontWeight >= 700);
      if (color === 'unsupported' || background === 'unsupported') {
        contrastResults.push({
          $el,
          type: 'unsupported',
          fontSize,
          fontWeight,
          isLargeText,
          opacity,
          ...(background !== 'unsupported' && { background }),
          ...(color !== 'unsupported' && { color }),
        });
      } else if (background.type === 'image') {
        if (!isHidden) {
          contrastResults.push({
            $el,
            type: 'background-image',
            color,
            isLargeText,
            background,
            fontSize,
            fontWeight,
            opacity,
          });
        }
      } else if (!isHidden && Contrast.getHex(color) !== Contrast.getHex(background)) {
        const result = Contrast.checkElementContrast(
          $el,
          color,
          background,
          fontSize,
          fontWeight,
          opacity,
          option.contrastAlgorithm,
        );
        if (result) {
          result.type = checkInputs ? 'input' : 'text';
          contrastResults.push(result);
        }
      }
    }
  }

  // Iterate through all SVGs on the page, separately.
  Elements.Found.Svg.forEach(($el) => {
    const generalWarning = { $el, type: 'svg-warning' };

    // Get background.
    const background = Contrast.getBackground($el, Constants.Global.shadowDetection);
    const hasBackground = background !== 'unsupported' && background.type !== 'image';

    // Process simple SVGs with a single shape.
    const shapes = $el.querySelectorAll('path, rect, circle, ellipse, polygon, text, use');

    // Push a general warning for any complex SVGs.
    const complex = $el.querySelectorAll(
      '*:not(path):not(rect):not(circle):not(ellipse):not(polygon):not(text):not(use):not(title)',
    );

    // Check if all nodes within the SVG have the same fill/stroke/opacity.
    let allSameColour = false;
    if (shapes.length) {
      const ref = getComputedStyle(shapes[0]);
      allSameColour = Array.from(shapes).every((node) => {
        const style = getComputedStyle(node);
        return (
          style.fill === ref.fill &&
          style.fillOpacity === ref.fillOpacity &&
          style.stroke === ref.stroke &&
          style.strokeOpacity === ref.strokeOpacity &&
          style.opacity === ref.opacity
        );
      });
    }

    // If simple SVG (single path) or complex SVG with same colour.
    if ((shapes.length === 1 || allSameColour) && complex.length === 0) {
      const style = getComputedStyle(shapes[0]);
      const { fill, stroke, strokeWidth, opacity } = style;

      // Get computed stroke width/convert % to number.
      let strokePx = 0;
      const { width, height } = $el.getBBox();
      if (stroke && stroke !== 'none') {
        if (strokeWidth.endsWith('%')) {
          strokePx = (parseFloat(strokeWidth) / 100) * Math.min(width, height);
        } else {
          strokePx = ['inherit', 'initial', 'unset'].includes(strokeWidth)
            ? 1
            : parseFloat(strokeWidth);
        }
      }

      // Threshold is arbitrary/not WCAG. Smaller threshold for smaller SVGs.
      const threshold = Math.min(width, height) < 50 ? 1 : 3;
      const hasStroke = stroke && strokePx >= threshold && stroke !== 'none';

      // Get resolved fill colour.
      const hasFill = fill && fill !== 'none' && !fill.startsWith('url(');
      const resolvedFill =
        fill === 'currentColor'
          ? Contrast.convertToRGBA(getComputedStyle(shapes[0]).color, opacity)
          : Contrast.convertToRGBA(fill, opacity);

      // Get resolved stroke colour.
      const resolvedStroke =
        stroke === 'currentColor'
          ? Contrast.convertToRGBA(getComputedStyle(shapes[0]).color, opacity)
          : Contrast.convertToRGBA(stroke, opacity);

      // If supported colours and has background, we can calculate contrast.
      const supported = ![resolvedFill, resolvedStroke].includes('unsupported');
      if (supported && hasBackground) {
        let contrastValue;
        let fillPasses = false;
        let strokePasses = false;

        if (hasFill) {
          contrastValue = Contrast.calculateContrast(
            resolvedFill,
            background,
            option.contrastAlgorithm,
          );
          fillPasses =
            option.contrastAlgorithm === 'APCA'
              ? contrastValue.ratio >= 45
              : contrastValue.ratio >= 3;
        }

        if (hasStroke) {
          contrastValue = Contrast.calculateContrast(
            resolvedStroke,
            background,
            option.contrastAlgorithm,
          );
          strokePasses =
            option.contrastAlgorithm === 'APCA'
              ? contrastValue.ratio >= 45
              : contrastValue.ratio >= 3;
        }

        // Calculate contrast of both stroke and fill.
        const failsBoth = hasFill && hasStroke && !fillPasses && !strokePasses;
        const failsFill = hasFill && !hasStroke && !fillPasses;
        const failsStroke = !hasFill && hasStroke && !strokePasses;

        // Fails
        if (failsBoth || failsFill || failsStroke) {
          // Get hex values.
          const bgHex = Contrast.getHex(background);
          const fillHex = Contrast.getHex(resolvedFill);
          const strokeHex = Contrast.getHex(resolvedStroke);

          // Ignore if foreground equals background.
          if ((fillHex === bgHex && !hasStroke) || (strokeHex === bgHex && !hasFill)) {
            return;
          }

          // Push an error for simple SVGs.
          contrastResults.push({
            $el,
            ratio: Contrast.ratioToDisplay(contrastValue.ratio, option.contrastAlgorithm),
            color: contrastValue.blendedColor,
            type: 'svg-error',
            isLargeText: true, // To push a suggested colour (3:1).
            background,
          });
        }
      } else {
        // General warning for complex SVGs with multiple shapes.
        // Push whatever colour is valid.
        if (hasFill && resolvedFill !== 'unsupported') {
          generalWarning.color = resolvedFill;
        } else if (hasStroke && resolvedStroke !== 'unsupported') {
          generalWarning.color = resolvedStroke;
        }
        if (hasBackground) {
          generalWarning.background = background;
        }
        contrastResults.push(generalWarning);
      }
    } else {
      // General warning for complex SVGs.
      if (hasBackground) {
        generalWarning.background = background;
      }
      contrastResults.push(generalWarning);
    }
  });

  // Check contrast of all placeholder elements.
  Elements.Found.Inputs.forEach(($el) => {
    if ($el.placeholder && $el.placeholder.length !== 0) {
      const placeholder = getComputedStyle($el, '::placeholder');
      const pColor = Contrast.convertToRGBA(placeholder.getPropertyValue('color'));
      const pSize = parseFloat(placeholder.fontSize);
      const pWeight = Contrast.normalizeFontWeight(placeholder.fontWeight);
      const pBackground = Contrast.getBackground($el, Constants.Global.shadowDetection);
      const pOpacity = parseFloat(placeholder.opacity);

      // Placeholder has background image.
      if (pColor === 'unsupported') {
        // Unsupported colour
        contrastResults.push({ $el, type: 'placeholder-unsupported' });
      } else if (pBackground.type === 'image') {
        // There will already be a warning.
      } else {
        const result = Contrast.checkElementContrast(
          $el,
          pColor,
          pBackground,
          pSize,
          pWeight,
          pOpacity,
          option.contrastAlgorithm,
        );
        if (result) {
          result.type = 'placeholder';
          contrastResults.push(result);
        }
      }
    }
  });

  // Do some extra processing on warnings.
  const processWarnings = (warnings) => {
    // Separate warnings based on type.
    const backgroundImages = warnings.filter((warning) => warning.type === 'background-image');
    const otherWarnings = warnings.filter((warning) => warning.type !== 'background-image');

    let processedBackgroundWarnings;

    // Process background-image warnings based on prop.
    if (option.contrastAlgorithm === 'APCA') {
      // Do not group warnings, return each warning as-is.
      processedBackgroundWarnings = backgroundImages.map((warning) => ({ ...warning }));
    } else {
      // Group background-image warnings if they share same BG and FG colours.
      const groupedWarnings = backgroundImages.reduce((groups, warning) => {
        const grouped = groups;
        const groupKey = JSON.stringify({
          background: warning.background.value,
          color: warning.color,
          isLargeText: warning.isLargeText,
        });
        if (!grouped[groupKey]) {
          grouped[groupKey] = [];
        }
        grouped[groupKey].push(warning);
        return grouped;
      }, {});

      // Process each group.
      processedBackgroundWarnings = Object.values(groupedWarnings).map((group) => ({
        ...group[0],
      }));
    }

    // Combine processed background-image warnings with other warnings.
    return [...processedBackgroundWarnings, ...otherWarnings];
  };

  const processedResults = processWarnings(contrastResults);

  // Iterate through all contrast results.
  processedResults.forEach((item) => {
    const { $el, ratio } = item;
    const updatedItem = item;

    // Annotation placement.
    const element = $el.tagName === 'OPTION' ? $el.closest('datalist, select, optgroup') : $el;

    // Process text within element.
    const nodeText = Utils.fnIgnore(element, ['option:not(option:first-child)']);
    const text = Utils.getText(nodeText);

    // Content for tooltip.
    const truncatedText = Utils.truncateString(text, 80);
    const sanitizedText = Utils.sanitizeHTML(truncatedText);

    // Preview text
    let previewText;
    if (item.type === 'placeholder' || item.type === 'placeholder-unsupported') {
      previewText = Utils.sanitizeHTML($el.placeholder);
    } else if (item.type === 'svg-error' || item.type === 'svg-warning') {
      previewText = '';
    } else {
      previewText = sanitizedText;
    }
    updatedItem.sanitizedText = previewText;

    // Reference necessary ratios for compliance.
    let ratioTip = '';
    if (option.contrastAlgorithm === 'AA' || option.contrastAlgorithm === 'AAA') {
      const normal = option.contrastAlgorithm === 'AAA' ? '7:1' : '4.5:1';
      const large = option.contrastAlgorithm === 'AAA' ? '4.5:1' : '3:1';
      const ratioToDisplay = item.isLargeText ? large : normal;
      const ratioRequirement = item.isLargeText ? 'CONTRAST_LARGE' : 'CONTRAST_NORMAL';
      ratioTip = ` ${Lang.sprintf(ratioRequirement, ratioToDisplay)}`;
    }
    const graphicsTip =
      option.contrastAlgorithm === 'APCA' ? '' : ` ${Lang.sprintf('CONTRAST_TIP_GRAPHIC')}`;

    // Iterate through contrast results based on type.
    switch (item.type) {
      case 'text':
        if (option.checks.CONTRAST_ERROR) {
          results.push({
            test: 'CONTRAST_ERROR',
            element: $el,
            type: option.checks.CONTRAST_ERROR.type || 'error',
            content: option.checks.CONTRAST_ERROR.content
              ? Lang.sprintf(option.checks.CONTRAST_ERROR.content)
              : Lang.sprintf('CONTRAST_ERROR') + ratioTip,
            dismiss: Utils.prepareDismissal(`CONTRAST${sanitizedText}`),
            dismissAll: option.checks.CONTRAST_ERROR.dismissAll ? 'CONTRAST_ERROR' : false,
            developer: option.checks.CONTRAST_ERROR.developer || false,
            contrastDetails: updatedItem,
          });
        }
        break;
      case 'input':
        if (option.checks.CONTRAST_INPUT) {
          const sanitizedInput = Utils.sanitizeHTMLBlock($el.outerHTML);
          results.push({
            test: 'CONTRAST_INPUT',
            element,
            type: option.checks.CONTRAST_INPUT.type || 'error',
            content: option.checks.CONTRAST_INPUT.content
              ? Lang.sprintf(option.checks.CONTRAST_INPUT.content)
              : Lang.sprintf('CONTRAST_INPUT', ratio) + ratioTip,
            dismiss: Utils.prepareDismissal(`CONTRAST${sanitizedInput}`),
            dismissAll: option.checks.CONTRAST_INPUT.dismissAll ? 'CONTRAST_INPUT' : false,
            developer: option.checks.CONTRAST_INPUT.developer || true,
            contrastDetails: updatedItem,
          });
        }
        break;
      case 'placeholder':
        if (option.checks.CONTRAST_PLACEHOLDER) {
          const sanitizedPlaceholder = Utils.sanitizeHTMLBlock($el.outerHTML);
          results.push({
            test: 'CONTRAST_PLACEHOLDER',
            element: $el,
            type: option.checks.CONTRAST_PLACEHOLDER.type || 'error',
            content: option.checks.CONTRAST_PLACEHOLDER.content
              ? Lang.sprintf(option.checks.CONTRAST_PLACEHOLDER.content)
              : Lang.sprintf('CONTRAST_PLACEHOLDER') + ratioTip,
            position: 'afterend',
            dismiss: Utils.prepareDismissal(`CPLACEHOLDER${sanitizedPlaceholder}`),
            dismissAll: option.checks.CONTRAST_PLACEHOLDER.dismissAll
              ? 'CONTRAST_PLACEHOLDER'
              : false,
            developer: option.checks.CONTRAST_PLACEHOLDER.developer || true,
            contrastDetails: updatedItem,
          });
        }
        break;
      case 'placeholder-unsupported':
        if (option.checks.CONTRAST_PLACEHOLDER_UNSUPPORTED) {
          const sanitizedPlaceholder = Utils.sanitizeHTMLBlock($el.outerHTML);
          results.push({
            test: 'CONTRAST_PLACEHOLDER_UNSUPPORTED',
            element: $el,
            type: option.checks.CONTRAST_PLACEHOLDER_UNSUPPORTED.type || 'warning',
            content: option.checks.CONTRAST_PLACEHOLDER_UNSUPPORTED.content
              ? Lang.sprintf(option.checks.CONTRAST_PLACEHOLDER_UNSUPPORTED.content)
              : Lang.sprintf('CONTRAST_PLACEHOLDER_UNSUPPORTED') + ratioTip,
            position: 'afterend',
            dismiss: Utils.prepareDismissal(`CPLACEHOLDERUN${sanitizedPlaceholder}`),
            dismissAll: option.checks.CONTRAST_PLACEHOLDER_UNSUPPORTED.dismissAll
              ? 'CONTRAST_PLACEHOLDER_UNSUPPORTED'
              : false,
            developer: option.checks.CONTRAST_PLACEHOLDER_UNSUPPORTED.developer || true,
            contrastDetails: updatedItem,
          });
        }
        break;
      case 'svg-error':
        if (option.checks.CONTRAST_ERROR_GRAPHIC) {
          const sanitizedSVG = Utils.sanitizeHTMLBlock($el.outerHTML);
          results.push({
            test: 'CONTRAST_ERROR_GRAPHIC',
            element: $el,
            type: option.checks.CONTRAST_ERROR_GRAPHIC.type || 'error',
            content: option.checks.CONTRAST_ERROR_GRAPHIC.content
              ? Lang.sprintf(option.checks.CONTRAST_ERROR_GRAPHIC.content)
              : Lang.sprintf('CONTRAST_ERROR_GRAPHIC') + graphicsTip,
            dismiss: Utils.prepareDismissal(`CONTRASTERROR${sanitizedSVG}`),
            dismissAll: option.checks.CONTRAST_ERROR_GRAPHIC.dismissAll
              ? 'CONTRAST_ERROR_GRAPHIC'
              : false,
            developer: option.checks.CONTRAST_ERROR_GRAPHIC.developer || true,
            contrastDetails: updatedItem,
            margin: '-25px',
          });
        }
        break;
      case 'svg-warning':
        if (option.checks.CONTRAST_WARNING_GRAPHIC) {
          const sanitizedSVG = Utils.sanitizeHTMLBlock($el.outerHTML);
          results.push({
            test: 'CONTRAST_WARNING_GRAPHIC',
            element: $el,
            type: option.checks.CONTRAST_WARNING_GRAPHIC.type || 'warning',
            content: option.checks.CONTRAST_WARNING_GRAPHIC.content
              ? Lang.sprintf(option.checks.CONTRAST_WARNING_GRAPHIC.content)
              : Lang.sprintf('CONTRAST_WARNING_GRAPHIC') + graphicsTip,
            dismiss: Utils.prepareDismissal(`CONTRASTWARNING${sanitizedSVG}`),
            dismissAll: option.checks.CONTRAST_WARNING_GRAPHIC.dismissAll
              ? 'CONTRAST_WARNING_GRAPHIC'
              : false,
            developer: option.checks.CONTRAST_WARNING_GRAPHIC.developer || true,
            contrastDetails: updatedItem,
            margin: '-25px',
          });
        }
        break;
      case 'background-image':
        if (option.checks.CONTRAST_WARNING) {
          results.push({
            test: 'CONTRAST_WARNING',
            element,
            type: option.checks.CONTRAST_WARNING.type || 'warning',
            content: option.checks.CONTRAST_WARNING.content
              ? Lang.sprintf(option.checks.CONTRAST_WARNING.content)
              : Lang.sprintf('CONTRAST_WARNING') + ratioTip,
            dismiss: Utils.prepareDismissal(`CONTRAST${sanitizedText}`),
            dismissAll: option.checks.CONTRAST_WARNING.dismissAll ? 'CONTRAST_WARNING' : false,
            developer: option.checks.CONTRAST_WARNING.developer || false,
            contrastDetails: updatedItem,
          });
        }
        break;
      case 'unsupported':
        if (option.checks.CONTRAST_UNSUPPORTED) {
          results.push({
            test: 'CONTRAST_UNSUPPORTED',
            element,
            type: option.checks.CONTRAST_UNSUPPORTED.type || 'warning',
            content: option.checks.CONTRAST_UNSUPPORTED.content
              ? Lang.sprintf(option.checks.CONTRAST_UNSUPPORTED.content)
              : Lang.sprintf('CONTRAST_WARNING') + ratioTip,
            dismiss: Utils.prepareDismissal(`CONTRAST${sanitizedText}`),
            dismissAll: option.checks.CONTRAST_UNSUPPORTED.dismissAll
              ? 'CONTRAST_UNSUPPORTED'
              : false,
            developer: option.checks.CONTRAST_UNSUPPORTED.developer || false,
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
