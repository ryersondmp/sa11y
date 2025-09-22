import tippy from 'tippy.js';
import * as Utils from '../utils/utils';
import Lang from '../utils/lang';
import Constants from '../utils/constants';
import { generateColorSuggestion, generateContrastTools, initializeContrastTools } from '../utils/contrast-utils';
import { annotationButtons } from './annotations';

// Import processed minified styles as a string.
import tooltipStyles from '../../../dist/css/tooltips.min.css';
import sharedStyles from '../../../dist/css/shared.min.css';

/**
 * Tooltip container for all annotations.
 */
export class AnnotationTooltips extends HTMLElement {
  connectedCallback() {
    const shadowRoot = this.attachShadow({ mode: 'open' });

    // Styles
    const style = document.createElement('style');
    style.innerHTML = tooltipStyles + sharedStyles;
    shadowRoot.appendChild(style);

    // Instantiate tippy.js
    const annotations = tippy(annotationButtons, {
      interactive: true,
      trigger: 'mouseenter click',
      hideOnClick: false,
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
        // Hide previously opened tooltip.
        annotations.forEach((popper) => {
          if (popper !== instance.popper) {
            popper.hide();
          }
        });

        // Last opened tooltip.
        const annotation = instance.reference.getRootNode().host;
        annotation.setAttribute('data-sa11y-opened', '');

        // Close button for tooltip.
        const closeButton = instance.popper.querySelector('.close-btn');
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
        instance.popper.addEventListener('keydown', escapeListener);

        // Generate preview, colour pickers, and suggestions for contrast tooltips.
        // Imported from rulesets/contrast.js
        if (!instance.popper.hasAttribute('contrast-tools-initialized')) {
          const issueID = parseInt(annotation.getAttribute('data-sa11y-annotation'), 10);
          const issueObject = window.sa11yCheckComplete.results.find((issue) => issue.id === issueID);
          const { contrastDetails } = issueObject || {};

          if (contrastDetails) {
            const container = instance.popper.querySelector('[data-sa11y-contrast-details]');

            // Append color pickers and suggested color.
            const tools = generateContrastTools(contrastDetails);
            container.appendChild(tools);
            initializeContrastTools(instance.popper, contrastDetails);

            // Append suggested color.
            const suggestion = generateColorSuggestion(contrastDetails);
            if (suggestion) container.appendChild(suggestion);

            // Contrast tools has been initialized.
            instance.popper.setAttribute('contrast-tools-initialized', true);
          }
        }

        // Make tooltip stay open if colour picker is used. Use 'mousedown' event, because upon click of trigger, it sets focus on close button, which immediately closes colour input on safari.
        let firstClick = true;
        function handleMouseDown(event) {
          if (firstClick && event.target.matches('input[type="color"]')) {
            instance.reference.click();
            firstClick = false;
            instance.popper.removeEventListener('mousedown', handleMouseDown);
          }
        }
        instance.popper.addEventListener('mousedown', handleMouseDown);

        // Remove all event listeners.
        const onHiddenTooltip = () => {
          closeButton.removeEventListener('click', closeButtonHandler);
          instance.popper.removeEventListener('keydown', escapeListener);
          instance.popper.removeEventListener('hidden', onHiddenTooltip);
        };
        instance.popper.addEventListener('hidden', onHiddenTooltip);
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
        instance.popper.querySelector('.close-btn').removeEventListener('click', () => {
          instance.hide();
        });
        const annotation = instance.reference.getRootNode().host;
        annotation.removeAttribute('data-sa11y-opened');
      },
    });
  }
}

/**
 * Tooltip container for the main control panel.
 */
export class PanelTooltips extends HTMLElement {
  connectedCallback() {
    // Default options for basic tooltips (not popovers).
    const tooltipOptions = (shadowRoot) => ({
      allowHTML: true,
      delay: [500, 0],
      trigger: 'mouseenter focusin',
      arrow: true,
      placement: 'top',
      theme: 'sa11y-theme sa11y-panel',
      role: 'tooltip',
      aria: {
        content: null,
        expanded: null,
      },
      appendTo: shadowRoot,
      zIndex: 2147483645,
    });

    // Shadow root
    const shadowRoot = this.attachShadow({ mode: 'open' });

    // Styles
    const style = document.createElement('style');
    style.innerHTML = tooltipStyles + sharedStyles;
    shadowRoot.appendChild(style);

    /* 1. Tooltip for "Skip to Issue" button. */
    const keyboardShortcut = navigator.userAgent.indexOf('Mac') !== -1
      ? '<span class="kbd">Option</span> + <span class="kbd">S</span>'
      : '<span class="kbd">Alt</span> + <span class="kbd">S</span>';
    tippy(Constants.Panel.skipButton, {
      ...tooltipOptions(shadowRoot),
      offset: [0, 8],
      maxWidth: 200,
      content: `${Lang._('SKIP_TO_ISSUE')} &raquo; <br> ${keyboardShortcut}`,
    });

    /* 2. Tooltip for "Dismiss" button. */
    this.object = tippy(Constants.Panel.dismissButton, {
      offset: [0, 8],
      maxWidth: 200,
      ...tooltipOptions(shadowRoot),
    });

    /* 3. Tooltip for "Developer checks" toggle. */
    if (Constants.Global.developerPlugin) {
      const infoIcon = Constants.Panel.developerItem?.querySelector('.info-icon');
      if (infoIcon) {
        tippy(infoIcon, {
          ...tooltipOptions(shadowRoot),
          triggerTarget: [Constants.Panel.developerItem],
          offset: [0, 10],
          maxWidth: 250,
          content: Lang._('DEVELOPER_DESC'),
        });
      }
    }

    /* 4. Tooltip for "Readability" toggle. */
    if (Constants.Global.readabilityPlugin) {
      const infoIcon = Constants.Panel.readabilityItem?.querySelector('.info-icon');
      if (infoIcon) {
        tippy(infoIcon, {
          ...tooltipOptions(shadowRoot),
          triggerTarget: [Constants.Panel.readabilityItem],
          offset: [0, 10],
          maxWidth: 250,
          content: Lang._('READABILITY_DESC'),
        });
      }
    }
  }
}
