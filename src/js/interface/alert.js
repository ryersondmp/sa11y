import { State } from '../core/state';
import { store } from '../utils/utils';
import Lang from '../utils/lang';

/**
 * Removes the alert from the Sa11y control panel by clearing its content and removing CSS classes.
 * This function clears the content of the alert element and removes CSS classes 'active' from the main alert element, and 'panel-alert-preview' from the alert preview element.
 * @returns {void}
 */
export function removeAlert() {
  if (State.option.headless) return;

  const Sa11yPanel = document.querySelector('sa11y-control-panel').shadowRoot;
  const alert = Sa11yPanel.getElementById('panel-alert');
  const alertText = Sa11yPanel.getElementById('panel-alert-text');
  const alertPreview = Sa11yPanel.getElementById('panel-alert-preview');

  alert.classList.remove('active');
  alertPreview.classList.remove('panel-alert-preview');
  while (alertText.firstChild) {
    alertText.removeChild(alertText.firstChild);
  }
  while (alertPreview.firstChild) {
    alertPreview.removeChild(alertPreview.firstChild);
  }
}

/**
 * Creates an alert in the Sa11y control panel.
 * @param {string} alertMessage The alert message.
 * @param {string|Node} errorPreview The issue's tooltip message (optional).
 * @param {string|Node|HTMLElement} extendedPreview The issue's DOM node to be previewed (optional).
 * @param {boolean} dismissable Whether to show a "Dismiss" button to hide this alert permanently (optional).
 * @returns {void}
 */
export function createAlert(alertMessage, errorPreview, extendedPreview, dismissable = false) {
  if (State.option.headless) return;

  // Unique key for localStorage based on the message content.
  const storageKey = dismissable
    ? `sa11y-dismissed-alert-${alertMessage.textContent.substring(0, 20)}`
    : '';

  // 1. Check if user has previously dismissed this specific alert
  if (dismissable && store.getItem(storageKey)) return;

  // Clear alert first before creating new one.
  removeAlert();

  // Constants
  const Sa11yPanel = document.querySelector('sa11y-control-panel').shadowRoot;
  const alert = Sa11yPanel.getElementById('panel-alert');
  const alertText = Sa11yPanel.getElementById('panel-alert-text');
  const alertPreview = Sa11yPanel.getElementById('panel-alert-preview');
  const alertClose = Sa11yPanel.getElementById('close-alert');
  const skipButton = Sa11yPanel.getElementById('skip-button');

  alert.classList.add('active');

  // Simple alert message.
  if (typeof alertMessage === 'string') {
    alertText.textContent = alertMessage;
  } else {
    alertText.appendChild(alertMessage);
  }

  // Clear any existing preview content.
  alertPreview.innerHTML = '';

  // Alert message or tooltip's message.
  if (errorPreview) {
    alertPreview.classList.add('panel-alert-preview');
    // ... [Rest of your existing preview logic remains the same] ...
    if (extendedPreview) {
      const elementPreview = document.createElement('div');
      elementPreview.className = 'element-preview';
      if (typeof extendedPreview === 'string') {
        elementPreview.textContent = extendedPreview;
      } else {
        elementPreview.appendChild(extendedPreview);
      }
      alertPreview.appendChild(elementPreview);
    }

    const previewMessage = document.createElement('div');
    previewMessage.className = 'preview-message';
    if (typeof errorPreview === 'string') {
      previewMessage.textContent = errorPreview;
    } else {
      previewMessage.appendChild(errorPreview);
    }
    alertPreview.appendChild(previewMessage);
  }

  // 2. Add the Dismiss Button if requested
  if (dismissable) {
    const dismissBtn = document.createElement('button');
    dismissBtn.setAttribute('type', 'button');
    dismissBtn.setAttribute('class', 'dismiss-alert');
    dismissBtn.textContent = Lang._('Dismiss');
    dismissBtn.id = 'dismiss-alert';
    dismissBtn.setAttribute('aria-labelledby', 'dismiss-alert alert-heading');
    dismissBtn.setAttribute('aria-describedby', 'panel-alert-text');

    dismissBtn.addEventListener('click', () => {
      store.setItem(storageKey, 'true');
      closeAlert();
    });

    // Append to alertText or alertPreview depending on your layout preference
    alertText.appendChild(dismissBtn);
  }

  // A little time before setting focus on the close button.
  setTimeout(() => alertClose.focus(), 300);

  function closeAlert() {
    removeAlert();
    const focusTarget = skipButton.hasAttribute('disabled')
      ? Sa11yPanel.getElementById('toggle')
      : skipButton;
    focusTarget.focus();
  }
  alertClose.addEventListener('click', closeAlert);

  alert.onkeydown = (e) => {
    const evt = e || window.event;
    if (evt.key === 'Escape' && alert.classList.contains('active')) {
      closeAlert();
    }
  };
}
