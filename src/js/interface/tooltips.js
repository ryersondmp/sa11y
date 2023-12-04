import tippy from 'tippy.js';
import * as Utils from '../utils/utils';
import Lang from '../utils/lang';
import Constants from '../utils/constants';
import Elements from '../utils/elements';

// Import processed minified styles as a string.
import tooltipStyles from '../../../dist/css/tooltips.min.css';
import sharedStyles from '../../../dist/css/shared.min.css';

export class TooltipComponent extends HTMLElement {
  connectedCallback() {
    const shadowRoot = this.attachShadow({ mode: 'open' });

    // Styles
    const style = document.createElement('style');
    style.innerHTML = tooltipStyles + sharedStyles;
    shadowRoot.appendChild(style);

    // Hide on Escape key.
    const hideOnEsc = {
      name: 'hideOnEsc',
      defaultValue: true,
      fn({ hide }) {
        const onKeyDown = (event) => { if (event.keyCode === 27) { hide(); } };
        return {
          onShow() { document.addEventListener('keydown', onKeyDown); },
          onHide() { document.removeEventListener('keydown', onKeyDown); },
        };
      },
    };

    const buttons = [];
    Elements.Annotations.Array.forEach((annotation) => {
      const annotationButtons = annotation.shadowRoot.querySelectorAll('.sa11y-btn');
      if (annotationButtons) {
        buttons.push(...Array.from(annotationButtons));
      }
    });

    /* Page annotations */
    const annotations = tippy(buttons, {
      interactive: true,
      trigger: 'mouseenter click', // Focusin trigger to ensure "Jump to issue" button displays tooltip.
      arrow: true,
      delay: [0, 400], // Slight delay to ensure mouse doesn't quickly trigger and hide tooltip.
      theme: 'sa11y-theme',
      placement: 'right-start',
      allowHTML: true,
      role: 'dialog',
      aria: {
        content: null,
        expanded: 'auto',
      },
      appendTo: shadowRoot,
      zIndex: 2147483645,
      plugins: [hideOnEsc],
      onShow(instance) {
        const openedTooltip = instance.popper;
        annotations.forEach((popper) => {
          // Hide previously opened tooltip.
          if (popper !== openedTooltip) {
            popper.hide();
          }
        });

        // Last opened
        const annotation = instance.reference.getRootNode().host;
        annotation.setAttribute('data-sa11y-opened', '');

        // Close button for tooltip.
        openedTooltip.querySelector('.close-btn').addEventListener('click', () => {
          instance.hide();
          instance.reference.focus();
        });
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
    let keyboardShortcut;
    if (navigator.userAgent.indexOf('Mac') !== -1) {
      keyboardShortcut = '<span class="kbd">Option</span> + <span class="kbd">S</span>';
    } else {
      keyboardShortcut = '<span class="kbd">Alt</span> + <span class="kbd">S</span>';
    }
    tippy(Constants.Panel.skipButton, {
      content: `${Lang._('SHORTCUT_TOOLTIP')} &raquo; <br> ${keyboardShortcut}`,
      allowHTML: true,
      delay: [500, 0],
      trigger: 'mouseenter focusin',
      arrow: true,
      placement: 'top',
      theme: 'sa11y-theme',
      maxWidth: 165,
      role: 'tooltip',
      aria: {
        content: null,
        expanded: false,
      },
      appendTo: shadowRoot,
      zIndex: 2147483645,
    });
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
      delay: [500, 0],
      trigger: 'mouseenter focusin',
      arrow: true,
      placement: 'top',
      theme: 'sa11y-theme',
      maxWidth: 165,
      role: 'tooltip',
      aria: {
        content: null,
        expanded: false,
      },
      appendTo: shadowRoot,
      zIndex: 2147483645,
    });
  }
}
