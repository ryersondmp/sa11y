import Elements from '../utils/elements';
import * as Utils from '../utils/utils';
import Lang from '../utils/lang';
import { computeAccessibleName } from '../utils/computeAccessibleName';

export default function checkLabels(results, option) {
  if (option.formLabelsPlugin) {
    const toggleCheck = Utils.store.getItem('sa11y-remember-labels') === 'On';
    if (toggleCheck || option.headless || option.checkAllHideToggles) {
      Elements.Found.Inputs.forEach(($el) => {
        // Mission abort if input is hidden.
        if (Utils.isElementHidden($el)) return;

        // Compute accessible name on input.
        const computeInput = computeAccessibleName($el);
        const formattedInput = Utils.removeWhitespaceFromString(computeInput);

        // Get attributes.
        const alt = $el.getAttribute('alt');
        const type = $el.getAttribute('type');
        const hasTitle = $el.getAttribute('title');
        const tabindex = $el.getAttribute('tabindex');
        const hasAria = $el.getAttribute('aria-label') || $el.getAttribute('aria-labelledby');

        // Pass: Ignore if it's a submit or hidden button.
        if (type === 'submit' || type === 'button' || type === 'hidden' || tabindex === '-1') {
          return;
        }

        // Error: Input with type="image" without accessible name or alt.
        if (type === 'image' && (!alt || alt === ' ')) {
          if (!hasAria && !hasTitle) {
            results.push({
              element: $el,
              type: 'error',
              content: Lang.sprintf('LABELS_MISSING_IMAGE_INPUT_MESSAGE'),
              inline: false,
              position: 'beforebegin',
            });
          }
          return;
        }

        // Warning: to remove reset buttons.
        if (type === 'reset') {
          const key = Utils.prepareDismissal(`INPUT${formattedInput}`);
          results.push({
            element: $el,
            type: 'warning',
            content: Lang.sprintf('LABELS_INPUT_RESET_MESSAGE'),
            inline: false,
            position: 'beforebegin',
            dismiss: key,
          });
          return;
        }

        // Uses ARIA or title attribute. Warn them to ensure there's a visible label.
        if (hasAria || hasTitle) {
          const key = Utils.prepareDismissal(`INPUT${formattedInput}`);
          const sanitizedText = Utils.sanitizeHTML(formattedInput);
          results.push({
            element: $el,
            type: 'warning',
            content: Lang.sprintf('LABELS_ARIA_LABEL_INPUT_MESSAGE', sanitizedText),
            inline: false,
            position: 'beforebegin',
            dismiss: key,
          });
          return;
        }

        // Implicit label: <label>First name: <input type="text"/><label>
        const closestLabel = $el.closest('label');
        const computeLabel = (closestLabel) ? computeAccessibleName(closestLabel) : '';
        const formattedLabel = Utils.removeWhitespaceFromString(computeLabel);
        if (closestLabel && formattedLabel.length) {
          return;
        }

        // Check to see if each label has a matching for and it attribute.
        const id = $el.getAttribute('id');
        if (id) {
          // Find labels without a match.
          if (!Elements.Found.Labels.some((label) => label.getAttribute('for') === id)) {
            results.push({
              element: $el,
              type: 'error',
              content: Lang.sprintf('LABELS_NO_FOR_ATTRIBUTE_MESSAGE', id),
              inline: false,
              position: 'beforebegin',
            });
          }
        } else {
          // No id!
          results.push({
            element: $el,
            type: 'error',
            content: Lang.sprintf('LABELS_MISSING_LABEL_MESSAGE'),
            inline: false,
            position: 'beforebegin',
          });
        }
      });
    }
  }
  return results;
}
