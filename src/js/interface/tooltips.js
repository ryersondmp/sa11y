import tippy from 'tippy.js';
import * as Utils from '../utils/utils';
import Lang from '../utils/lang';
import Constants from '../utils/constants';
import Elements from '../utils/elements';
import { generateColorSuggestion } from '../rulesets/contrast';

// Import processed minified styles as a string.
import tooltipStyles from '../../../dist/css/tooltips.min.css';
import sharedStyles from '../../../dist/css/shared.min.css';

// Default options for basic tooltips (not popovers).
const tooltipOptions = (shadowRoot) => ({
  allowHTML: true,
  delay: [500, 0],
  trigger: 'mouseenter focusin',
  arrow: true,
  maxWidth: 200,
  placement: 'top',
  theme: 'sa11y-theme',
  role: 'tooltip',
  aria: {
    content: null,
    expanded: null,
  },
  appendTo: shadowRoot,
  zIndex: 2147483645,
});

export class TooltipComponent extends HTMLElement {
  connectedCallback() {
    const shadowRoot = this.attachShadow({ mode: 'open' });

    // Styles
    const style = document.createElement('style');
    style.innerHTML = tooltipStyles + sharedStyles;
    shadowRoot.appendChild(style);

    // Get all annotations on page
    const buttons = [];
    Elements.Annotations.Array.forEach((annotation) => {
      const annotationButtons = annotation.shadowRoot.querySelectorAll('.sa11y-btn');
      if (annotationButtons) {
        buttons.push(...Array.from(annotationButtons));
      }
    });

    // Instantiate tippy.js
    const annotations = tippy(buttons, {
      interactive: true,
      trigger: 'mouseenter click',
      arrow: true,
      offset: [0, 8],
      delay: [0, 400],
      maxWidth: 375,
      theme: 'sa11y-theme',
      placement: 'auto-start',
      allowHTML: true,
      role: 'dialog',
      aria: {
        content: null,
        expanded: 'auto',
      },
      appendTo: shadowRoot,
      zIndex: 2147483645,
      onShow(instance) {
        const openedTooltip = instance.popper;

        // Hide previously opened tooltip.
        annotations.forEach((popper) => {
          if (popper !== openedTooltip) {
            popper.hide();
          }
        });

        // Last opened tooltip.
        const annotation = instance.reference.getRootNode().host;
        annotation.setAttribute('data-sa11y-opened', '');

        // Close button for tooltip.
        const closeButton = openedTooltip.querySelector('.close-btn');
        const closeButtonHandler = () => {
          instance.hide();
          instance.reference.focus();
        };
        closeButton.addEventListener('click', closeButtonHandler);

        // Event listener for the escape key.
        const escapeListener = (event) => {
          if (event.key === 'Escape') {
            instance.hide();
            instance.reference.focus();
          }
        };
        openedTooltip.addEventListener('keydown', escapeListener);

        // Generate colour suggestions to improve contrast.
        if (Constants.Global.contrastSuggestions) {
          const hasColorSuggestion = instance.popper?.querySelector('[data-sa11y-suggestion]');
          if (hasColorSuggestion) {
            const colorObject = hasColorSuggestion?.getAttribute('data-sa11y-suggestion');
            const suggestion = generateColorSuggestion(JSON.parse(colorObject));
            hasColorSuggestion.innerHTML = suggestion;
          }
        }

        // Remove all event listeners.
        const onHiddenTooltip = () => {
          closeButton.removeEventListener('click', closeButtonHandler);
          openedTooltip.removeEventListener('keydown', escapeListener);
          openedTooltip.removeEventListener('hidden', onHiddenTooltip);
        };
        openedTooltip.addEventListener('hidden', onHiddenTooltip);
      },
      onTrigger(instance, event) {
        if (event.type === 'click') {
          // Set focus to close button 'click' event.
          setTimeout(() => {
            instance.popper.querySelector('.close-btn').focus();
            Utils.trapFocus(instance.popper);
          }, 0);
        }
      },
      onHide(instance) {
        const openedTooltip = instance.popper;
        openedTooltip.querySelector('.close-btn').removeEventListener('click', () => {
          instance.hide();
        });
        const annotation = instance.reference.getRootNode().host;
        annotation.removeAttribute('data-sa11y-opened');
      },
    });

    /* Skip to Issue toggle button */
    const keyboardShortcut = navigator.userAgent.indexOf('Mac') !== -1
      ? '<span class="kbd">Option</span> + <span class="kbd">S</span>'
      : '<span class="kbd">Alt</span> + <span class="kbd">S</span>';

    tippy(Constants.Panel.skipButton, {
      ...tooltipOptions(shadowRoot),
      offset: [0, 8],
      content: `${Lang._('SKIP_TO_ISSUE')} &raquo; <br> ${keyboardShortcut}`,
    });

    if (Constants.Global.developerPlugin) {
      tippy(Constants.Panel.developerToggle, {
        ...tooltipOptions(shadowRoot),
        triggerTarget: [Constants.Panel.developerItem],
        offset: [0, 0],
        content: Lang._('DEVELOPER_DESC'),
      });
    }
  }
}

export class DismissTooltip extends HTMLElement {
  connectedCallback() {
    const shadowRoot = this.attachShadow({ mode: 'open' });

    // Styles
    const style = document.createElement('style');
    style.innerHTML = tooltipStyles + sharedStyles;
    shadowRoot.appendChild(style);

    this.object = tippy(Constants.Panel.dismissButton, {
      offset: [0, 8],
      ...tooltipOptions(shadowRoot),
    });
  }
}
