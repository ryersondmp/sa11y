// ============================================================
// Rulesets: Labels
// ============================================================
import Lang from '../components/translation';
import { computeAriaLabel } from '../components/utilities';
import { ERROR, WARNING } from '../components/constants';
import { annotate } from '../components/annotate';

export default function checkLabels() {
  $inputs.forEach((el) => {
    let ariaLabel = computeAriaLabel(el);
    const type = el.getAttribute('type');
    const tabindex = el.getAttribute('tabindex');

    // If button type is submit or button: pass
    if (type === 'submit' || type === 'button' || type === 'hidden' || tabindex === '-1') {
      // Do nothing
    } else if (type === 'image') {
      // Inputs where type="image".
      const imgalt = el.getAttribute('alt');
      if (!imgalt || imgalt === ' ') {
        if (el.getAttribute('aria-label')) {
          // Good.
        } else {
          el.classList.add('sa11y-error-border');
          el.insertAdjacentHTML('afterend', annotate(ERROR, Lang._('LABELS_MISSING_IMAGE_INPUT_MESSAGE'), true));
        }
      }
    } else if (type === 'reset') {
      // Recommendation to remove reset buttons.
      el.classList.add('sa11y-warning-border');
      el.insertAdjacentHTML('afterend', annotate(WARNING, Lang._('LABELS_INPUT_RESET_MESSAGE'), true));
    } else if (el.getAttribute('aria-label') || el.getAttribute('aria-labelledby') || el.getAttribute('title')) {
      // Uses ARIA. Warn them to ensure there's a visible label.
      if (el.getAttribute('title')) {
        ariaLabel = el.getAttribute('title');
        el.classList.add('sa11y-warning-border');
        el.insertAdjacentHTML('afterend', annotate(WARNING, Lang.sprintf('LABELS_ARIA_LABEL_INPUT_MESSAGE', ariaLabel), true));
      } else {
        el.classList.add('sa11y-warning-border');
        el.insertAdjacentHTML('afterend', annotate(WARNING, Lang.sprintf('LABELS_ARIA_LABEL_INPUT_MESSAGE', ariaLabel), true));
      }
    } else if (el.closest('label') && el.closest('label').textContent.trim()) {
      // Implicit labels.
      // Do nothing if label has text.
    } else if (el.getAttribute('id')) {
      // Has an ID but doesn't have a matching FOR attribute.
      const $labels = Sa11y.root.querySelectorAll('label');
      let hasFor = false;

      $labels.forEach(($l) => {
        if (hasFor) return;
        if ($l.getAttribute('for') === el.getAttribute('id')) {
          hasFor = true;
        }
      });

      if (!hasFor) {
        el.classList.add('sa11y-error-border');
        const id = el.getAttribute('id');
        el.insertAdjacentHTML('afterend', annotate(ERROR, Lang.sprintf('LABELS_NO_FOR_ATTRIBUTE_MESSAGE', id), true));
      }
    } else {
      el.classList.add('sa11y-error-border');
      el.insertAdjacentHTML('afterend', annotate(ERROR, Lang._('LABELS_MISSING_LABEL_MESSAGE'), true));
    }
  });
};
