import { State } from '../core/state';

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
 * Creates an alert in the Sa11y control panel with the given alert message and error preview.
 * @param {string} alertMessage The alert message.
 * @param {string|Node} errorPreview The issue's tooltip message (optional).
 * @param {string|Node|HTMLElement} extendedPreview The issue's DOM node to be previewed (optional).
 * @returns {void}
 */
export function createAlert(alertMessage, errorPreview, extendedPreview) {
  if (State.option.headless) return;

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
  alertText.textContent = alertMessage;

  // Clear any existing preview content.
  alertPreview.innerHTML = '';

  // Alert message or tooltip's message.
  if (errorPreview) {
    alertPreview.classList.add('panel-alert-preview');

    // If the issue's element is being previewed as a DOM node or string
    if (extendedPreview) {
      const elementPreview = document.createElement('div');
      elementPreview.className = 'element-preview';

      // Check if extendedPreview is a string or a Node
      if (typeof extendedPreview === 'string') {
        elementPreview.textContent = extendedPreview;
      } else {
        elementPreview.appendChild(extendedPreview);
      }

      alertPreview.appendChild(elementPreview);
    }

    // Append the error preview message
    const previewMessage = document.createElement('div');
    previewMessage.className = 'preview-message';

    // Check if errorPreview is a string or a Node.
    if (typeof errorPreview === 'string') {
      previewMessage.textContent = errorPreview;
    } else {
      previewMessage.appendChild(errorPreview);
    }

    alertPreview.appendChild(previewMessage);
  }

  // A little time before setting focus on the close button.
  setTimeout(() => alertClose.focus(), 300);

  // Closing alert sets focus back to Skip to Issue toggle.
  function closeAlert() {
    removeAlert();
    const focusTarget = skipButton.hasAttribute('disabled')
      ? Sa11yPanel.getElementById('toggle')
      : skipButton;
    focusTarget.focus();
  }
  alertClose.addEventListener('click', closeAlert);

  // Escape key to close alert.
  alert.onkeydown = (e) => {
    const evt = e || window.event;
    if (evt.key === 'Escape' && alert.classList.contains('active')) {
      closeAlert();
    }
  };
}
