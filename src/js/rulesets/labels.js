import { computeAccessibleName } from '../utils/computeAccessibleName';
import Elements from '../utils/elements';
import Lang from '../utils/lang';
import * as Utils from '../utils/utils';
import { State } from '../core/state';
import find from '../utils/find';
import { pushResult } from '../utils/pushResult';

export default function checkLabels() {
  if (!State.option.formLabelsPlugin) return;

  Elements.Found.Inputs.forEach(($el) => {
    // Ignore completely hidden elements.
    const presentation = Utils.isPresentational($el) && Utils.isDisabled($el);
    if (Utils.isElementHidden($el) || Utils.isHiddenAndUnfocusable($el) || presentation) return;

    // Compute accessible name on input.
    const computeName = computeAccessibleName($el);
    const inputName = Utils.removeWhitespace(computeName);

    // Get attributes.
    const type = $el.getAttribute('type');
    const hasTitle = $el.getAttribute('title');
    const hasAria = $el.getAttribute('aria-label') || $el.getAttribute('aria-labelledby');

    // Native input.
    const nativeTags = ['INPUT', 'TEXTAREA', 'SELECT', 'METER', 'PROGRESS'];
    const isNativeInput = nativeTags.includes($el.tagName.toUpperCase());

    // Ignore if it's a submit or hidden button.
    if (['submit', 'button', 'hidden'].includes(type)) return;

    // Push to results array.
    const logResult = (params) =>
      pushResult({
        element: $el,
        type: params.type || 'error',
        developer: params.developer || true,
        dismiss: type + inputName,
        ...params,
      });

    // Error: Input with type="image" without accessible name or alt.
    if (type === 'image') {
      if (inputName === '') logResult({ test: 'LABELS_MISSING_IMAGE_INPUT' });
      return;
    }

    // Warning: to remove reset buttons.
    if (type === 'reset') {
      logResult({ test: 'LABELS_INPUT_RESET', type: 'warning', developer: false });
      return;
    }

    // Warning: against placeholder attributes.
    const hasPlaceholder = $el.placeholder && $el.placeholder !== 0;
    if (hasPlaceholder) {
      logResult({ test: 'LABELS_PLACEHOLDER', type: 'warning' });
    }

    // ARIA role based inputs.
    if (!isNativeInput && State.option.checks.ARIA_INPUT_FIELD_NAME) {
      const toggles = [
        'checkbox',
        'menu',
        'menuitemcheckbox',
        'menuitemradio',
        'radio',
        'radiogroup',
        'switch',
      ];
      const role = $el.getAttribute('role')?.trim().toLowerCase() || '';

      // If it's a toggle AND it has an accessible name (like inner text), it passes.
      if (toggles.includes(role) && inputName.length !== 0) return;

      // Accessibile name returns nothing.
      if (inputName.length === 0) {
        const outerHTML = Utils.truncateString($el.outerHTML, 100);
        const rule = State.option.checks.ARIA_INPUT_FIELD_NAME;
        const message = rule.content
          ? Lang.sprintf(rule.content)
          : Lang.sprintf(Lang._('ARIA_INPUT_FIELD_NAME') + Lang._('ACC_NAME_TIP'), outerHTML);
        logResult({
          test: 'ARIA_INPUT_FIELD_NAME',
          args: [outerHTML],
          content: message,
        });
        return;
      }
    }

    // Uses ARIA or title attr.
    if (hasAria || hasTitle) {
      if (inputName.length === 0) {
        logResult({ test: 'LABELS_MISSING_LABEL' });
      } else {
        const ariaLabelledBy = $el.getAttribute('aria-labelledby');
        if (ariaLabelledBy) {
          const ids = ariaLabelledBy.trim().split(/\s+/);
          if (ids.length === 1) {
            const target = find(`#${ids[0]}`, 'root')?.[0];
            if (target && !Utils.isElementHidden(target)) return;
          }
        }

        const rule = State.option.checks.LABELS_ARIA_LABEL_INPUT;
        if (rule) {
          const message = rule.content
            ? Lang.sprintf(rule.content, inputName)
            : Lang.sprintf(Lang._('LABELS_ARIA_LABEL_INPUT') + Lang._('ACC_NAME_TIP'), inputName);
          logResult({
            test: 'LABELS_ARIA_LABEL_INPUT',
            type: 'warning',
            args: [inputName],
            content: message,
          });
        }
      }
      return;
    }

    // Only allow implicit label & placeholder checks for native inputs.
    if (isNativeInput) {
      const closestLabel = Utils.getCachedClosest($el, 'label');
      const labelName = closestLabel ? computeAccessibleName(closestLabel) : '';
      if ((closestLabel && labelName.length) || hasPlaceholder) return;
    }

    // Missing labels & for attr.
    const id = $el.getAttribute('id');
    if (id) {
      const hasMatchingLabel = Elements.Found.Labels.some(
        (label) => label.getAttribute('for') === id,
      );
      if (hasMatchingLabel) return;
      logResult({ test: 'LABELS_NO_FOR_ATTRIBUTE', args: [id] });
    } else {
      logResult({ test: 'LABELS_MISSING_LABEL' });
    }
  });
}
