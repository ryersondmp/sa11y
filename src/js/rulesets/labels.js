import Constants from '../utils/constants';
import Elements from '../utils/elements';
import * as Utils from '../utils/utils';
import Lang from '../utils/lang';

export default function checkLabels(results) {
  if (Constants.Global.formLabelsPlugin === true) {
    if (
      Utils.store.getItem('sa11y-remember-labels') === 'On'
      || Constants.Global.headless === true
      || Constants.Global.checkAllHideToggles === true
    ) {
      Elements.Found.Inputs.forEach(($el) => {
        // Ignore hidden inputs.
        if (Utils.isElementHidden($el) !== true) {
          let ariaLabel = Utils.computeAccessibleName($el);
          const type = $el.getAttribute('type');
          const tabindex = $el.getAttribute('tabindex');

          // If button type is submit or button: pass
          if (type === 'submit' || type === 'button' || type === 'hidden' || tabindex === '-1') {
            // Do nothing
          } else if (type === 'image') {
            // Inputs where type="image".
            const imgalt = $el.getAttribute('alt');
            if (!imgalt || imgalt === ' ') {
              if ($el.getAttribute('aria-label')) {
                // Good.
              } else {
                results.push({
                  element: $el,
                  type: Constants.Global.ERROR,
                  content: Lang.sprintf('LABELS_MISSING_IMAGE_INPUT_MESSAGE'),
                  inline: false,
                  position: 'beforebegin',
                });
              }
            }
          } else if (type === 'reset') {
            // Recommendation to remove reset buttons.
            const key = Utils.prepareDismissal(`INPUT${ariaLabel}`);
            results.push({
              element: $el,
              type: Constants.Global.WARNING,
              content: Lang.sprintf('LABELS_INPUT_RESET_MESSAGE'),
              inline: false,
              position: 'beforebegin',
              dismiss: key,
            });
          } else if ($el.getAttribute('aria-label') || $el.getAttribute('aria-labelledby') || $el.getAttribute('title')) {
            // Uses ARIA. Warn them to ensure there's a visible label.
            if ($el.getAttribute('title')) {
              ariaLabel = $el.getAttribute('title');
              const key = Utils.prepareDismissal(`INPUT${ariaLabel}`);
              const sanitizedText = Utils.sanitizeHTML(ariaLabel);
              results.push({
                element: $el,
                type: Constants.Global.WARNING,
                content: Lang.sprintf('LABELS_ARIA_LABEL_INPUT_MESSAGE', sanitizedText),
                inline: false,
                position: 'beforebegin',
                dismiss: key,
              });
            } else {
              const key = Utils.prepareDismissal(`INPUT${ariaLabel}`);
              const sanitizedText = Utils.sanitizeHTML(ariaLabel);
              results.push({
                element: $el,
                type: Constants.Global.WARNING,
                content: Lang.sprintf('LABELS_ARIA_LABEL_INPUT_MESSAGE', sanitizedText),
                inline: false,
                position: 'beforebegin',
                dismiss: key,
              });
            }
          } else if ($el.closest('label') && $el.closest('label').textContent.trim()) {
            // Implicit labels.
            // Do nothing if label has text.
          } else if ($el.getAttribute('id')) {
            // Has an ID but doesn't have a matching FOR attribute.
            let hasFor = false;

            Elements.Found.Labels.forEach(($l) => {
              if (hasFor) return;
              if ($l.getAttribute('for') === $el.getAttribute('id')) {
                hasFor = true;
              }
            });

            if (!hasFor) {
              const id = $el.getAttribute('id');
              results.push({
                element: $el,
                type: Constants.Global.ERROR,
                content: Lang.sprintf('LABELS_NO_FOR_ATTRIBUTE_MESSAGE', id),
                inline: false,
                position: 'beforebegin',
              });
            }
          } else {
            results.push({
              element: $el,
              type: Constants.Global.ERROR,
              content: Lang.sprintf('LABELS_MISSING_LABEL_MESSAGE'),
              inline: false,
              position: 'beforebegin',
            });
          }
        }
      });
    }
  }
  return { results };
}
