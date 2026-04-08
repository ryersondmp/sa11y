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
import { computePosition, autoPlacement, shift, flip, offset, arrow, autoUpdate } from '@floating-ui/dom';

// Singleton management.
let activeInstance = null;

// Shared utility for setting up Floating UI tooltips.
function setupFloatingUI(references, options) {
  const {
    appendTo,
    content,
    onShow,
    onHide,
    theme,
    placement,
    offset: offsetVal,
    interactive,
    allowHTML = false,
    clickTrigger = true,
    role,
  } = options;

  // 1. Normalize triggers to an array and pick the primary anchor
  const targets = Array.isArray(references) ? references : [references];
  const mainReference = targets[0];

  let popper = null;
  let cleanup = null;

  const hide = () => {
    if (popper?.parentNode) {
      if (cleanup) {
        cleanup();
        cleanup = null;
      }

      // Pass the mainReference back to the callback for consistency
      if (onHide) onHide({ reference: mainReference, popper });

      popper.remove();
      popper = null;
      if (activeInstance === hide) activeInstance = null;
    }
  };

  const updatePosition = () => {
    if (!popper) return;
    const arrowEl = popper.querySelector('.arrow');
    const middleware = [offset(offsetVal)];

    if (placement === 'auto' || placement === 'auto-start' || placement === 'auto-end') {
      middleware.push(autoPlacement({
        alignment: placement.split('-')[1] || null,
        padding: 5,
      }));
    } else {
      middleware.push(flip({
        padding: 5,
        fallbackPlacements: ['bottom', 'right', 'left'],
      }));
    }

    middleware.push(shift({ padding: 5 }), arrow({ element: arrowEl }));

    // Position relative to mainReference
    computePosition(mainReference, popper, {
      placement: placement?.includes('auto') ? undefined : placement,
      middleware: middleware,
    }).then(({ x, y, placement: finalPlacement, middlewareData }) => {
      Object.assign(popper.style, { left: `${x}px`, top: `${y}px` });
      if (middlewareData.arrow) {
        const { x: ax, y: ay } = middlewareData.arrow;
        const side = { top: 'bottom', right: 'left', bottom: 'top', left: 'right' }[
          finalPlacement.split('-')[0]
        ];
        Object.assign(arrowEl.style, {
          left: ax != null ? `${ax}px` : '',
          top: ay != null ? `${ay}px` : '',
          [side]: '-4px',
        });
      }
      popper.setAttribute('data-placement', finalPlacement);
    });
  };

  const show = (eventType) => {
    if (activeInstance && activeInstance !== hide) activeInstance();
    if (popper) return;

    popper = document.createElement('div');
    popper.className = `${theme || ''}`;
    popper.setAttribute('role', role || 'tooltip');
    popper.style.cssText = `position: absolute; z-index: 2147483645; left: 0; top: 0;`;
    popper.innerHTML = `<div class="content"></div><div class="arrow"></div>`;

    const contentEl = popper.querySelector('.content');
    const actualContent = typeof content === 'function' ? content(mainReference) : content;

    if (actualContent instanceof Node) {
      contentEl.appendChild(actualContent);
    } else if (allowHTML) {
      contentEl.innerHTML = actualContent;
    } else {
      contentEl.textContent = actualContent;
    }

    appendTo.appendChild(popper);
    activeInstance = hide;

    cleanup = autoUpdate(mainReference, popper, updatePosition);

    requestAnimationFrame(() => {
      if (popper) popper.classList.add('visible');
    });

    if (onShow) onShow({ reference: mainReference, popper, hide, eventType });
  };

  // Attach listeners to ALL target elements.
  targets.forEach((target) => {
    target.addEventListener('mouseenter', () => !popper && show('mouseenter'));
    target.addEventListener('mouseleave', () => {
      const isPersistent = clickTrigger && popper?.getAttribute('data-trigger') === 'click';
      if (!popper || isPersistent) return;
      if (interactive) {
        setTimeout(() => {
          // Check if mouse is hovering over ANY of the triggers or the popper itself.
          const isOverAnyTarget = targets.some(t => t.matches(':hover'));
          if (!popper?.matches(':hover') && !isOverAnyTarget) {
            hide();
          }
        }, 100);
      } else {
        hide();
      }
    });

    // Only add the click logic if clickTrigger is enabled.
    if (clickTrigger) {
      target.addEventListener('click', (e) => {
        e.stopPropagation();
        if (popper && popper.getAttribute('data-trigger') === 'click') {
          hide();
        } else {
          if (!popper) show('click');
          popper.setAttribute('data-trigger', 'click');
        }
      });
    }
  });

  return { show, hide, popper: () => popper };
}

export class AnnotationTooltips extends HTMLElement {
  connectedCallback() {
    const shadowRoot = this.attachShadow({ mode: 'open' });
    const style = document.createElement('style');
    style.textContent = tooltipStyles + sharedStyles;
    shadowRoot.appendChild(style);

    // Initialize all annotations.
    annotationButtons.forEach((btn) => {
      setupFloatingUI(btn, {
        interactive: true,
        offset: 8,
        theme: 'sa11y-theme',
        placement: 'auto-start',
        appendTo: shadowRoot,
        role: 'dialog',
        content: (ref) => {
          const host = ref.getRootNode().host;
          const id = host.getAttribute('data-sa11y-annotation');
          const result = State.results.find((item) => String(item.id) === String(id));
          if (!result) return null;

          // Tooltip wrapper.
          const wrapper = document.createElement('div');
          wrapper.innerHTML = `<button type="button" class="close-btn close-tooltip" aria-label="${Lang._('ALERT_CLOSE')}"></button><div class="sa11y-content-body"></div>`;

          // Append issue content if node, otherwise as textContent.
          const body = wrapper.querySelector('.sa11y-content-body');
          if (result.finalContent instanceof Node) {
            body.appendChild(result.finalContent);
          } else {
            body.textContent = result.finalContent;
          }

          // Check if a contrast details div already exists in the cloned body.
          let contrastDiv = body.querySelector('[data-sa11y-contrast-details]');
          if (result.contrastDetails && !contrastDiv) {
            contrastDiv = document.createElement('div');
            contrastDiv.setAttribute('data-sa11y-contrast-details', '');

            // Generate tools.
            const tools = generateContrastTools(result.contrastDetails);
            contrastDiv.appendChild(tools);

            // Generate colour contrast suggestion.
            const suggestion = generateColorSuggestion(result.contrastDetails);
            if (suggestion) contrastDiv.appendChild(suggestion);

            // Placement logic.
            const target = body.querySelector('.dismiss-group');
            target ? target.before(contrastDiv) : body.append(contrastDiv);
          }

          return wrapper;
        },
        onShow: ({ reference, popper, hide, eventType }) => {
          const host = reference.getRootNode().host;
          host?.setAttribute('data-sa11y-opened', '');

          // Reference the respective issue object from results array.
          const rawId = host?.getAttribute('data-sa11y-annotation');
          const issueObject = State.results.find((i) => String(i.id) === String(rawId));

          // Set lang and issue type.
          popper.setAttribute('lang', Lang._('LANG_CODE'));
          if (issueObject) popper.classList.add(issueObject.type);

          // Initialization contrast tools.
          if (issueObject?.contrastDetails && !popper.hasAttribute('contrast-tools-initialized')) {
            initializeContrastTools(popper, issueObject.contrastDetails);
            popper.setAttribute('contrast-tools-initialized', 'true');
          }

          // Close button.
          const closeBtn = popper.querySelector('.close-btn');
          const handleClose = () => {
            hide();
            reference.focus();
          };
          closeBtn?.addEventListener('click', handleClose);

          // Escape key.
          const esc = (e) => e.key === 'Escape' && handleClose();
          document.addEventListener('keydown', esc, { once: true });

          // Trap focus only on click.
          if (eventType === 'click') {
            requestAnimationFrame(() => {
              closeBtn?.focus();
              Utils.trapFocus(popper);
            });
          }
        },
        onHide: ({ reference }) => {
          reference.getRootNode().host?.removeAttribute('data-sa11y-opened');
        },
      });
    });
  }
}

export class PanelTooltips extends HTMLElement {
  connectedCallback() {
    const shadowRoot = this.attachShadow({ mode: 'open' });
    const style = document.createElement('style');
    style.textContent = tooltipStyles + sharedStyles;
    shadowRoot.appendChild(style);

    // Base options for tooltips.
    const baseOptions = {
      appendTo: shadowRoot,
      offset: 8,
      theme: 'sa11y-theme sa11y-panel',
      placement: 'top',
      clickTrigger: false,
      allowHTML: true, // Safe: No user supplied content here.
    };

    // Skip button.
    const shortcut = navigator.userAgent.includes('Mac') ? 'Option + S' : 'Alt + S';
    setupFloatingUI(Constants.Panel.skipButton, {
      ...baseOptions,
      content: `${Lang._('SKIP_TO_ISSUE')} &raquo; <br> <span class="kbd">${shortcut}</span>`,
    });

    // Dismiss button.
    this.dismissTooltip = setupFloatingUI(Constants.Panel.dismissButton, {
      ...baseOptions,
      content: () => Lang.sprintf('PANEL_DISMISS_BUTTON', State.counts.dismissed),
    });

    // Developer toggle.
    const devIcon = Constants.Panel.developerItem?.querySelector('.info-icon');
    if (State.option.developerPlugin && devIcon) {
      this.devTooltip = setupFloatingUI([devIcon, Constants.Panel.developerItem], {
        ...baseOptions,
        content: Lang._('DEVELOPER_DESC'),
      });
    }

    // Readability toggle.
    const readIcon = Constants.Panel.readabilityItem?.querySelector('.info-icon');
    if (State.option.readabilityPlugin && readIcon) {
      this.readTooltip = setupFloatingUI([readIcon, Constants.Panel.readabilityItem], {
        ...baseOptions,
        content: Lang._('READABILITY_DESC'),
      });
    }
  }
}
