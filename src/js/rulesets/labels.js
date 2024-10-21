import Elements from '../utils/elements';
import * as Utils from '../utils/utils';
import Lang from '../utils/lang';
import { computeAccessibleName } from '../utils/computeAccessibleName';

export default function checkLabels(results, option) {
  if (option.formLabelsPlugin) {
    Elements.Found.Inputs.forEach(($el) => {
      // Ignore completely hidden elements.
      const ariaHidden = $el.getAttribute('aria-hidden') === 'true';
      const negativeTabindex = $el.getAttribute('tabindex') === '-1';
      const hidden = Utils.isElementHidden($el);
      if (hidden || (ariaHidden && negativeTabindex)) {
        return;
      }

      // Compute accessible name on input.
      const computeName = computeAccessibleName($el);
      const inputName = Utils.removeWhitespace(computeName);

      // Get attributes.
      const alt = $el.getAttribute('alt');
      const type = $el.getAttribute('type');
      const hasTitle = $el.getAttribute('title');
      const hasAria = $el.getAttribute('aria-label') || $el.getAttribute('aria-labelledby');

      // Pass: Ignore if it's a submit or hidden button.
      if (type === 'submit' || type === 'button' || type === 'hidden') {
        return;
      }

      // Create dismiss key.
      const key = Utils.prepareDismissal(`INPUT${type + inputName}`);

      // Error: Input with type="image" without accessible name or alt.
      if (type === 'image') {
        if (option.checks.LABELS_MISSING_IMAGE_INPUT && (!alt || alt.trim() === '') && !hasAria && !hasTitle) {
          results.push({
            element: $el,
            type: option.checks.LABELS_MISSING_IMAGE_INPUT.type || 'error',
            content: option.checks.LABELS_MISSING_IMAGE_INPUT.content || Lang.sprintf('LABELS_MISSING_IMAGE_INPUT'),
            inline: false,
            position: 'beforebegin',
            dismiss: key,
            dismissAll: option.checks.LABELS_MISSING_IMAGE_INPUT.dismissAll ? 'LABELS_MISSING_IMAGE_INPUT' : false,
            developer: option.checks.LABELS_MISSING_IMAGE_INPUT.developer || true,
          });
        }
        return;
      }

      // Warning: to remove reset buttons.
      if (type === 'reset') {
        if (option.checks.LABELS_INPUT_RESET) {
          results.push({
            element: $el,
            type: option.checks.LABELS_INPUT_RESET.type || 'warning',
            content: option.checks.LABELS_INPUT_RESET.content || Lang.sprintf('LABELS_INPUT_RESET'),
            inline: false,
            position: 'beforebegin',
            dismiss: key,
            dismissAll: option.checks.LABELS_INPUT_RESET.dismissAll ? 'LABELS_INPUT_RESET' : false,
            developer: option.checks.LABELS_INPUT_RESET.developer || false,
          });
        }
        return;
      }

      // Uses ARIA or title attribute. Warn them to ensure there's a visible label.
      if (hasAria || hasTitle) {
        if (inputName.length === 0) {
          if (option.checks.LABELS_MISSING_LABEL) {
            results.push({
              element: $el,
              type: option.checks.LABELS_MISSING_LABEL.type || 'error',
              content: option.checks.LABELS_MISSING_LABEL.content || Lang.sprintf('LABELS_MISSING_LABEL'),
              inline: false,
              position: 'beforebegin',
              dismiss: key,
              dismissAll: option.checks.LABELS_MISSING_LABEL.dismissAll ? 'LABELS_MISSING_LABEL' : false,
              developer: option.checks.LABELS_MISSING_LABEL.developer || true,
            });
          }
        } else if (option.checks.LABELS_ARIA_LABEL_INPUT) {
          const sanitizedText = Utils.sanitizeHTML(inputName);
          results.push({
            element: $el,
            type: option.checks.LABELS_ARIA_LABEL_INPUT.type || 'warning',
            content: option.checks.LABELS_ARIA_LABEL_INPUT.content || `${Lang.sprintf('LABELS_ARIA_LABEL_INPUT', sanitizedText)} ${Lang.sprintf('ACC_NAME_TIP')}`,
            inline: false,
            position: 'beforebegin',
            dismiss: key,
            dismissAll: option.checks.LABELS_ARIA_LABEL_INPUT.dismissAll ? 'LABELS_ARIA_LABEL_INPUT' : false,
            developer: option.checks.LABELS_ARIA_LABEL_INPUT.developer || true,
          });
        }
        return;
      }

      // Implicit label: <label>First name: <input type="text"/><label>
      const closestLabel = $el.closest('label');
      const labelName = (closestLabel) ? Utils.removeWhitespace(computeAccessibleName(closestLabel)) : '';
      if (closestLabel && labelName.length) {
        return;
      }

      // Check to see if each label has a matching for and it attribute.
      const id = $el.getAttribute('id');
      if (id) {
        // Find labels without a match.
        if (!Elements.Found.Labels.some((label) => label.getAttribute('for') === id)) {
          if (option.checks.LABELS_NO_FOR_ATTRIBUTE) {
            results.push({
              element: $el,
              type: option.checks.LABELS_NO_FOR_ATTRIBUTE.type || 'error',
              content: option.checks.LABELS_NO_FOR_ATTRIBUTE.content || Lang.sprintf('LABELS_NO_FOR_ATTRIBUTE', id),
              inline: false,
              position: 'beforebegin',
              dismiss: key,
              dismissAll: option.checks.LABELS_NO_FOR_ATTRIBUTE.dismissAll ? 'LABELS_NO_FOR_ATTRIBUTE' : false,
              developer: option.checks.LABELS_NO_FOR_ATTRIBUTE.developer || true,
            });
          }
        }
      } else if (option.checks.LABELS_MISSING_LABEL) {
        // No id!
        results.push({
          element: $el,
          type: option.checks.LABELS_MISSING_LABEL.type || 'error',
          content: option.checks.LABELS_MISSING_LABEL.content || Lang.sprintf('LABELS_MISSING_LABEL'),
          inline: false,
          position: 'beforebegin',
          dismiss: key,
          dismissAll: option.checks.LABELS_MISSING_LABEL.dismissAll ? 'LABELS_MISSING_LABEL' : false,
          developer: option.checks.LABELS_MISSING_LABEL.developer || true,
        });
      }

      // Avoid using placeholder attributes.
      if ($el.placeholder && $el.placeholder !== 0) {
        results.push({
          element: $el,
          type: option.checks.LABELS_PLACEHOLDER.type || 'warning',
          content: option.checks.LABELS_PLACEHOLDER.content || Lang.sprintf('LABELS_PLACEHOLDER'),
          inline: false,
          position: 'beforebegin',
          dismiss: key,
          dismissAll: option.checks.LABELS_PLACEHOLDER.dismissAll ? 'LABELS_PLACEHOLDER' : false,
          developer: option.checks.LABELS_PLACEHOLDER.developer || true,
        });
      }
    });
  }
  return results;
}
