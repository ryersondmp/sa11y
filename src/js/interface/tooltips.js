import tippy from 'tippy.js';
import sharedStyles from '../../css/shared.css?inline';
import tooltipStyles from '../../css/tooltips.css?inline';
import {
  generateColorSuggestion,
  generateContrastTools,
  initializeContrastTools,
} from '../contrast/ui-tools';
import Constants from '../utils/constants';
import Lang from '../utils/lang';
import { annotationButtons } from './annotations';
import { State } from '../core/state';
import * as Utils from '../utils/utils';

/**
 * Tooltip container for all annotations.
 */
export class AnnotationTooltips extends HTMLElement {
  connectedCallback() {
    const shadowRoot = this.attachShadow({ mode: 'open' });

    // Styles
    const style = document.createElement('style');
    style.textContent = tooltipStyles + sharedStyles;
    shadowRoot.appendChild(style);

    const template = State.results;

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
      content(reference) {
        const id = reference.getRootNode().host.getAttribute('data-sa11y-annotation');
        const result = template.find((item) => String(item.id) === String(id));
        if (!result) return null;

        const { element, type, content, issueLabel, dismiss, dismissAll, contrastDetails } = result;
        if (!element) return;

        // 1. Create the tooltip container.
        const wrapper = document.createElement('div');
        wrapper.setAttribute('lang', Lang._('LANG_CODE'));
        wrapper.className = type;

        // 2. Build the HTML for the buttons/header.
        const dismissAllBtn =
          State.option.dismissAnnotations &&
            State.option.dismissAll &&
            typeof dismissAll === 'string' &&
            (type === 'warning' || type === 'good')
            ? `<button data-sa11y-dismiss='${id}' data-sa11y-dismiss-all type='button'>${Lang._('DISMISS_ALL')}</button>`
            : '';

        const dismissBtn =
          State.option.dismissAnnotations && (type === 'warning' || type === 'good') && dismiss
            ? `<button data-sa11y-dismiss='${id}' type='button'>${Lang._('DISMISS')}</button>`
            : '';

        // 3. Full tooltip structure.
        wrapper.innerHTML = `
          <button type='button' class='close-btn close-tooltip' aria-label='${Lang._('ALERT_CLOSE')}'></button>
          <h2>${issueLabel}</h2>
          <div class="sa11y-content-body"></div>
          ${contrastDetails ? '<div data-sa11y-contrast-details></div>' : ''}
          <div class='dismiss-group'>
            ${dismissBtn || ''}
            ${dismissAllBtn}
          </div>
        `;

        // Replace user supplied content via textContent instead of .innerHTML
        const body = wrapper.querySelector('.sa11y-content-body');
        if (content instanceof HTMLElement || content instanceof DocumentFragment) {
          body.appendChild(content);
        } else if (typeof content === 'string') {
          body.textContent += content;
        }
        return wrapper;
      },
      allowHTML: true,
      role: 'dialog',
      aria: {
        content: null,
        expanded: 'auto',
      },
      appendTo: shadowRoot,
      zIndex: 2147483645,
      onShow(instance) {
        // Ensure instance and popper exist.
        if (!instance || !instance.popper) return;

        // Hide other tooltips.
        if (Array.isArray(annotations)) {
          annotations.forEach((popper) => {
            if (popper !== instance) popper.hide();
          });
        }

        const host = instance.reference.getRootNode().host;
        if (host) {
          host.setAttribute('data-sa11y-opened', '');
        }

        const closeButton = instance.popper.querySelector('.close-btn');
        const closeButtonHandler = () => {
          instance.hide();
          instance.reference.focus();
        };

        if (closeButton) {
          closeButton.addEventListener('click', closeButtonHandler);
        }

        const escapeListener = (event) => {
          if (event.key === 'Escape') {
            instance.hide();
            instance.reference.focus();
          }
        };
        instance.popper.addEventListener('keydown', escapeListener);

        // Contrast tools initialization.
        if (!instance.popper.hasAttribute('contrast-tools-initialized')) {
          const rawId = host?.getAttribute('data-sa11y-annotation');
          const results = window.sa11yCheckComplete?.results || [];
          const issueObject = results.find((issue) => String(issue.id) === String(rawId));

          const contrastDetails = issueObject?.contrastDetails;
          if (contrastDetails) {
            const container = instance.popper.querySelector('[data-sa11y-contrast-details]');
            if (container) {
              const tools = generateContrastTools(contrastDetails);
              container.appendChild(tools);
              initializeContrastTools(instance.popper, contrastDetails);

              const suggestion = generateColorSuggestion(contrastDetails);
              if (suggestion) {
                container.appendChild(suggestion);
              }
              instance.popper.setAttribute('contrast-tools-initialized', 'true');
            }
          }
        }
        const handleMouseDown = (event) => {
          if (event.target.matches('input[type="color"]')) {
            instance.reference.click();
            instance.popper.removeEventListener('mousedown', handleMouseDown);
          }
        };
        instance.popper.addEventListener('mousedown', handleMouseDown);

        // Cleanup
        instance.setProps({
          onHidden() {
            if (closeButton) closeButton.removeEventListener('click', closeButtonHandler);
            instance.popper.removeEventListener('keydown', escapeListener);
            instance.popper.removeEventListener('mousedown', handleMouseDown);
            if (host) host.removeAttribute('data-sa11y-opened');
          },
        });
      },
      onTrigger(instance, event) {
        if (event.type === 'click') {
          // Wrap in a check to ensure the popper content is actually there
          requestAnimationFrame(() => {
            const closeBtn = instance.popper.querySelector('.close-btn');
            if (closeBtn) {
              closeBtn.focus();
              Utils.trapFocus(instance.popper);
            }
          });
        }
      },
      onHide(instance) {
        const host = instance.reference.getRootNode().host;
        if (host) {
          host.removeAttribute('data-sa11y-opened');
        }
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
    style.textContent = tooltipStyles + sharedStyles;
    shadowRoot.appendChild(style);

    /* 1. Tooltip for "Skip to Issue" button. */
    const keyboardShortcut =
      navigator.userAgent.indexOf('Mac') !== -1
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
    if (State.option.developerPlugin) {
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
    if (State.option.readabilityPlugin) {
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
