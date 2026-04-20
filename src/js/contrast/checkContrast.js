import Constants from '../utils/constants';
import Elements from '../utils/elements';
import Lang from '../utils/lang';
import * as Utils from '../utils/utils';
import * as Contrast from './utils';
import { convertToRGBA } from './convertColors';
import { State } from '../core/state';
import { pushResult } from '../utils/pushResult';

/**
 * Rulesets: Contrast
 * @returns Contrast results.
 * APCA contrast checking is experimental. References:
 * @link https://github.com/jasonday/color-contrast
 * @link https://github.com/gka/chroma.js
 * @link https://github.com/Myndex/SAPC-APCA
 */
export default function checkContrast() {
  if (!State.option.contrastPlugin) return;

  const contrastResults = [];
  const elements = Elements.Found.Contrast;
  const contrastAlgorithm = State.option.contrastAlgorithm;
  const shadowDetection = Constants.Global.shadowDetection;
  const inputTags = new Set(['SELECT', 'INPUT', 'TEXTAREA']);

  for (let i = 0; i < elements.length; i++) {
    const $el = elements[i];

    // Fast check for inputs or text existence before expensive style calls.
    const checkInputs = inputTags.has($el.tagName);
    let text = '';
    if (!checkInputs) {
      const nodes = $el.childNodes;
      for (let j = 0; j < nodes.length; j++) {
        if (nodes[j].nodeType === 3) text += nodes[j].textContent;
      }
      text = text.trim();
      if (!text) continue;
    }

    const style = Utils.getCachedStyle($el);

    // Early exit for hidden elements.
    const opacity = parseFloat(style.opacity);
    const fontSize = parseFloat(style.fontSize);
    if (opacity === 0 || fontSize === 0 || Utils.isElementHidden($el)) continue;
    if (Utils.isScreenReaderOnly($el)) continue;

    // Disabled elements.
    const getControl = (label) => (label?.getAttribute('for') === '' ? null : label?.control);
    if (
      Utils.isDisabled($el) ||
      Utils.isDisabled(getControl(Utils.getCachedClosest($el, 'label'))) ||
      Utils.isDisabled(Utils.getCachedClosest($el, 'fieldset')) ||
      Utils.isDisabled(Utils.getCachedClosest($el, '[role="group"]'))
    )
      continue;

    // Skip if the text contains absolutely no letters or numbers.
    if (!checkInputs && !/[\p{L}\p{N}]/u.test(text)) continue;

    // Expensive calculations only after we know the element is visible and has content.
    const color = convertToRGBA(style.color, opacity);
    const getFontWeight = style.fontWeight;
    const fontWeight = Contrast.normalizeFontWeight(getFontWeight);
    const background = Contrast.getBackground($el, shadowDetection);
    const isLargeText = fontSize >= 24 || (fontSize >= 18.67 && fontWeight >= 700);

    // Handle unsupported colour spaces.
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
      continue;
    }

    // Skip if foreground text is transparent.
    if (color && color[3] === 0) continue;

    // Process background images and gradients.
    if (background.type === 'image') {
      const extractColours = Contrast.extractColorFromString(background.value);
      const hasFailure =
        !extractColours ||
        extractColours.some((gradientStop) =>
          Contrast.checkElementContrast(
            $el,
            color,
            gradientStop,
            fontSize,
            fontWeight,
            opacity,
            contrastAlgorithm,
          ),
        );

      if (hasFailure || background.value.includes('url(')) {
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
    }

    // Compute standard text/input contrast.
    else if (Contrast.getHex(color) !== Contrast.getHex(background)) {
      const result = Contrast.checkElementContrast(
        $el,
        color,
        background,
        fontSize,
        fontWeight,
        opacity,
        contrastAlgorithm,
      );
      if (result) {
        result.type = checkInputs ? 'input' : 'text';
        contrastResults.push(result);
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
      const ref = Utils.getCachedStyle(shapes[0]);
      allSameColour = Array.from(shapes).every((node) => {
        const style = Utils.getCachedStyle(node);
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
      const style = Utils.getCachedStyle(shapes[0]);
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
          ? convertToRGBA(Utils.getCachedStyle(shapes[0]).color, opacity)
          : convertToRGBA(fill, opacity);

      // Get resolved stroke colour.
      const resolvedStroke =
        stroke === 'currentColor'
          ? convertToRGBA(Utils.getCachedStyle(shapes[0]).color, opacity)
          : convertToRGBA(stroke, opacity);

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
            State.option.contrastAlgorithm,
          );
          fillPasses =
            State.option.contrastAlgorithm === 'APCA'
              ? contrastValue.ratio >= 45
              : contrastValue.ratio >= 3;
        }

        if (hasStroke) {
          contrastValue = Contrast.calculateContrast(
            resolvedStroke,
            background,
            State.option.contrastAlgorithm,
          );
          strokePasses =
            State.option.contrastAlgorithm === 'APCA'
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
            ratio: Contrast.ratioToDisplay(contrastValue.ratio, State.option.contrastAlgorithm),
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
      const placeholder = Utils.getCachedStyle($el, '::placeholder');
      const pColor = convertToRGBA(placeholder.getPropertyValue('color'));
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
          State.option.contrastAlgorithm,
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
    if (State.option.contrastAlgorithm === 'APCA') {
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
    const element =
      $el.tagName === 'OPTION' ? Utils.getCachedClosest($el, 'datalist, select, optgroup') : $el;

    // Process text within element.
    const nodeText = Utils.fnIgnore(element, ['option:not(option:first-child)']);
    const text = Utils.getText(nodeText);

    // Content for tooltip.
    const truncatedText = Utils.truncateString(text, 80);

    // Preview text
    let previewText;
    if (item.type === 'placeholder' || item.type === 'placeholder-unsupported') {
      previewText = $el.placeholder;
    } else if (item.type === 'svg-error' || item.type === 'svg-warning') {
      previewText = '';
    } else {
      previewText = truncatedText;
    }
    updatedItem.previewText = previewText;

    // Reference necessary ratios for compliance.
    const isWcag =
      State.option.contrastAlgorithm === 'AA' || State.option.contrastAlgorithm === 'AAA';
    const normal = State.option.contrastAlgorithm === 'AAA' ? '7:1' : '4.5:1';
    const large = State.option.contrastAlgorithm === 'AAA' ? '4.5:1' : '3:1';
    const ratioToDisplay = item.isLargeText ? large : normal;
    const ratioRequirementKey = item.isLargeText ? 'CONTRAST_LARGE' : 'CONTRAST_NORMAL';

    // Push to results array.
    const logResult = (params) =>
      pushResult({
        element: $el,
        type: params.type || 'warning',
        dismiss: params.dismiss || previewText,
        contrastDetails: updatedItem,
        ...params,
      });

    // Iterate through contrast results based on type.
    switch (item.type) {
      case 'text':
        logResult({
          test: 'CONTRAST_ERROR',
          type: 'error',
          content: Lang.sprintf(
            isWcag
              ? `${Lang._('CONTRAST_ERROR')} ${Lang._(ratioRequirementKey)}`
              : Lang._('CONTRAST_ERROR'),
            ratioToDisplay,
          ),
          args: [ratioToDisplay],
        });
        break;
      case 'input':
        logResult({
          test: 'CONTRAST_INPUT',
          type: 'error',
          content: Lang.sprintf(
            isWcag
              ? `${Lang._('CONTRAST_INPUT')} ${Lang._(ratioRequirementKey)}`
              : Lang._('CONTRAST_INPUT'),
            ratio,
            ratioToDisplay,
          ),
          args: [ratio, ratioToDisplay],
          dismiss: $el.tagName + ($el.name || '') + ($el.id || ''),
          developer: true,
        });
        break;
      case 'placeholder':
        logResult({
          test: 'CONTRAST_PLACEHOLDER',
          type: 'error',
          content: Lang.sprintf(
            isWcag
              ? `${Lang._('CONTRAST_PLACEHOLDER')} ${Lang._(ratioRequirementKey)}`
              : Lang._('CONTRAST_PLACEHOLDER'),
            ratioToDisplay,
          ),
          args: [ratioToDisplay],
          position: 'afterend',
          dismiss: $el.tagName + ($el.id || '') + previewText,
          developer: true,
        });
        break;
      case 'svg-error':
        logResult({
          test: 'CONTRAST_ERROR_GRAPHIC',
          type: 'error',
          content: Lang.sprintf(
            State.option.contrastAlgorithm !== 'APCA'
              ? `${Lang._('CONTRAST_ERROR_GRAPHIC')} ${Lang._('CONTRAST_TIP_GRAPHIC')}`
              : Lang._('CONTRAST_ERROR_GRAPHIC'),
          ),
          dismiss: $el.outerHTML,
          developer: true,
          margin: '-25px',
        });
        break;
      case 'placeholder-unsupported':
        logResult({
          test: 'CONTRAST_PLACEHOLDER_UNSUPPORTED',
          content: Lang.sprintf(
            isWcag
              ? `${Lang._('CONTRAST_PLACEHOLDER_UNSUPPORTED')} ${Lang._(ratioRequirementKey)}`
              : Lang._('CONTRAST_PLACEHOLDER_UNSUPPORTED'),
            ratioToDisplay,
          ),
          args: [ratioToDisplay],
          position: 'afterend',
          dismiss: $el.tagName + ($el.id || '') + previewText,
          developer: true,
        });
        break;
      case 'svg-warning':
        logResult({
          test: 'CONTRAST_WARNING_GRAPHIC',
          content: Lang.sprintf(
            State.option.contrastAlgorithm !== 'APCA'
              ? `${Lang._('CONTRAST_WARNING_GRAPHIC')} ${Lang._('CONTRAST_TIP_GRAPHIC')}`
              : Lang._('CONTRAST_WARNING_GRAPHIC'),
          ),
          dismiss: $el.outerHTML,
          developer: true,
          margin: '-25px',
        });
        break;
      case 'background-image':
        logResult({
          test: 'CONTRAST_WARNING',
          content: Lang.sprintf(
            isWcag
              ? `${Lang._('CONTRAST_WARNING')} ${Lang._(ratioRequirementKey)}`
              : Lang._('CONTRAST_WARNING'),
            ratioToDisplay,
          ),
          args: [ratioToDisplay],
        });
        break;
      case 'unsupported':
        logResult({
          test: 'CONTRAST_UNSUPPORTED',
          content: Lang.sprintf(
            isWcag
              ? `${Lang._('CONTRAST_WARNING')} ${Lang._(ratioRequirementKey)}`
              : Lang._('CONTRAST_WARNING'),
            ratioToDisplay,
          ),
          args: [ratioToDisplay],
        });
        break;
      default:
        break;
    }
  });
}
