import { computeAccessibleName } from '../utils/computeAccessibleName';
import Elements from '../utils/elements';
import Lang from '../utils/lang';
import * as Utils from '../utils/utils';

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
      const hasPlaceholder = $el.placeholder && $el.placeholder !== 0;
      const hasAria = $el.getAttribute('aria-label') || $el.getAttribute('aria-labelledby');

      // Pass: Ignore if it's a submit or hidden button.
      if (type === 'submit' || type === 'button' || type === 'hidden') {
        return;
      }

      // Error: Input with type="image" without accessible name or alt.
      if (type === 'image') {
        if (
          option.checks.LABELS_MISSING_IMAGE_INPUT &&
          (!alt || alt.trim() === '') &&
          !hasAria &&
          !hasTitle
        ) {
          results.push({
            test: 'LABELS_MISSING_IMAGE_INPUT',
            element: $el,
            type: option.checks.LABELS_MISSING_IMAGE_INPUT.type || 'error',
            content: Lang.sprintf(
              option.checks.LABELS_MISSING_IMAGE_INPUT.content || 'LABELS_MISSING_IMAGE_INPUT',
            ),
            dismiss: Utils.prepareDismissal(`INPUTIMAGE${type + inputName}`),
            dismissAll: option.checks.LABELS_MISSING_IMAGE_INPUT.dismissAll
              ? 'LABELS_MISSING_IMAGE_INPUT'
              : false,
            developer: option.checks.LABELS_MISSING_IMAGE_INPUT.developer || true,
          });
        }
        return;
      }

      // Warning: to remove reset buttons.
      if (type === 'reset') {
        if (option.checks.LABELS_INPUT_RESET) {
          results.push({
            test: 'LABELS_INPUT_RESET',
            element: $el,
            type: option.checks.LABELS_INPUT_RESET.type || 'warning',
            content: Lang.sprintf(option.checks.LABELS_INPUT_RESET.content || 'LABELS_INPUT_RESET'),
            dismiss: Utils.prepareDismissal(`INPUTRESET${type + inputName}`),
            dismissAll: option.checks.LABELS_INPUT_RESET.dismissAll ? 'LABELS_INPUT_RESET' : false,
            developer: option.checks.LABELS_INPUT_RESET.developer || false,
          });
        }
        return;
      }

      // Uses ARIA or title attribute. Warn them to ensure there's a visible label.
      if (hasAria || hasTitle || hasPlaceholder) {
        // Avoid using placeholder attributes.
        if (hasPlaceholder && option.checks.LABELS_PLACEHOLDER) {
          results.push({
            test: 'LABELS_PLACEHOLDER',
            element: $el,
            type: option.checks.LABELS_PLACEHOLDER.type || 'warning',
            content: Lang.sprintf(option.checks.LABELS_PLACEHOLDER.content || 'LABELS_PLACEHOLDER'),
            dismiss: Utils.prepareDismissal(`INPUTPLACEHOLDER${type + inputName}`),
            dismissAll: option.checks.LABELS_PLACEHOLDER.dismissAll ? 'LABELS_PLACEHOLDER' : false,
            developer: option.checks.LABELS_PLACEHOLDER.developer || true,
          });
        } else if (inputName.length === 0) {
          if (option.checks.LABELS_MISSING_LABEL) {
            results.push({
              test: 'LABELS_MISSING_LABEL',
              element: $el,
              type: option.checks.LABELS_MISSING_LABEL.type || 'error',
              content: Lang.sprintf(
                option.checks.LABELS_MISSING_LABEL.content || 'LABELS_MISSING_LABEL',
              ),
              dismiss: Utils.prepareDismissal(`INPUTMISSING${type + inputName}`),
              dismissAll: option.checks.LABELS_MISSING_LABEL.dismissAll
                ? 'LABELS_MISSING_LABEL'
                : false,
              developer: option.checks.LABELS_MISSING_LABEL.developer || true,
            });
          }
        } else if (option.checks.LABELS_ARIA_LABEL_INPUT) {
          const sanitizedText = Utils.sanitizeHTML(inputName);
          results.push({
            test: 'LABELS_ARIA_LABEL_INPUT',
            element: $el,
            type: option.checks.LABELS_ARIA_LABEL_INPUT.type || 'warning',
            content: option.checks.LABELS_ARIA_LABEL_INPUT.content
              ? Lang.sprintf(option.checks.LABELS_ARIA_LABEL_INPUT.content, sanitizedText)
              : `${Lang.sprintf('LABELS_ARIA_LABEL_INPUT', sanitizedText)} ${Lang.sprintf('ACC_NAME_TIP')}`,
            dismiss: Utils.prepareDismissal(`INPUTARIA${type + inputName}`),
            dismissAll: option.checks.LABELS_ARIA_LABEL_INPUT.dismissAll
              ? 'LABELS_ARIA_LABEL_INPUT'
              : false,
            developer: option.checks.LABELS_ARIA_LABEL_INPUT.developer || true,
          });
        }
        return;
      }

      // Implicit label: <label>First name: <input type="text"/><label>
      const closestLabel = $el.closest('label');
      const labelName = closestLabel
        ? Utils.removeWhitespace(computeAccessibleName(closestLabel))
        : '';
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
              test: 'LABELS_NO_FOR_ATTRIBUTE',
              element: $el,
              type: option.checks.LABELS_NO_FOR_ATTRIBUTE.type || 'error',
              content: Lang.sprintf(
                option.checks.LABELS_NO_FOR_ATTRIBUTE.content || 'LABELS_NO_FOR_ATTRIBUTE',
                id,
              ),
              dismiss: Utils.prepareDismissal(`INPUTNOFOR${type + inputName}`),
              dismissAll: option.checks.LABELS_NO_FOR_ATTRIBUTE.dismissAll
                ? 'LABELS_NO_FOR_ATTRIBUTE'
                : false,
              developer: option.checks.LABELS_NO_FOR_ATTRIBUTE.developer || true,
            });
          }
        }
      } else if (option.checks.LABELS_MISSING_LABEL) {
        // No id!
        results.push({
          test: 'LABELS_MISSING_LABEL',
          element: $el,
          type: option.checks.LABELS_MISSING_LABEL.type || 'error',
          content: Lang.sprintf(
            option.checks.LABELS_MISSING_LABEL.content || 'LABELS_MISSING_LABEL',
          ),
          dismiss: Utils.prepareDismissal(`INPUTNOID${type + inputName}`),
          dismissAll: option.checks.LABELS_MISSING_LABEL.dismissAll
            ? 'LABELS_MISSING_LABEL'
            : false,
          developer: option.checks.LABELS_MISSING_LABEL.developer || true,
        });
      }
    });
  }
  return results;
}
