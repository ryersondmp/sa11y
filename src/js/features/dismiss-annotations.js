import Constants from '../utils/constants';
import { store, createAlert } from '../utils/utils';
import find from '../utils/find';
import Lang from '../utils/lang';

/* ************************************************************ */
/*  Update results array before painting annotations to page.   */
/* ************************************************************ */
export function dismissLogic(results, dismissTooltip) {
  // Get dismissed items and re-parse back into object.
  let dismissedIssues = store.getItem('sa11y-dismissed');
  dismissedIssues = dismissedIssues ? JSON.parse(dismissedIssues) : [];

  // Return element from results array that matches dismiss key and dismiss url. Then filter through matched objects.
  const findKey = dismissedIssues.map((e) => {
    const found = results.find((f) => (e.key.includes(f.dismiss) && e.href === window.location.pathname));
    if (found === undefined) return '';
    return found;
  });

  // Update results array (exclude dismissed items).
  const updatedResults = results.filter((issue) => !findKey.find((e) => e.dismiss === issue.dismiss));

  // Array containing all dismissed results for page.
  const dismissedResults = results.filter((issue) => findKey.find((e) => e.dismiss === issue.dismiss));
  const dismissCount = dismissedResults.length;

  // Show dismiss button in panel.
  if (dismissCount >= 1) {
    Constants.Panel.dismissButton.classList.add('active');
    Constants.Panel.dismissTooltip.innerText = Lang.sprintf('PANEL_DISMISS_BUTTON', dismissCount);
    dismissTooltip.object.setContent(Lang.sprintf('PANEL_DISMISS_BUTTON', dismissCount));
  } else {
    Constants.Panel.dismissButton.classList.remove('active');
  }

  return { dismissedIssues, updatedResults, dismissCount, dismissedResults };
}

/* ************************************************************ */
/*  Logic for tooltip "Dismiss" buttons & panel restore button  */
/* ************************************************************ */
let restoreDismissedHandler;
let dismissHandler;

/* 1. Hide annotation upon click of dismiss button. */
const dismissIssueButton = async (e, results, checkAll, resetAll) => {
  // Get dismissed array from localStorage.
  let savedDismissKeys = JSON.parse(store.getItem('sa11y-dismissed'));
  const element = e.target;
  const dismissContainer = document.querySelector('sa11y-dismiss-tooltip');
  dismissContainer.hidden = false;

  // Make sure event listener is attached to dismiss button.
  if (element.tagName === 'BUTTON' && element.hasAttribute('data-sa11y-dismiss')) {
    // Find corresponding issue within main results object and mark as dismissed.
    const dismissItem = parseInt(element.getAttribute('data-sa11y-dismiss'), 10);
    const object = results.find(($el) => $el.id === dismissItem);

    // Give a one time reminder that dismissed items are temporary.
    if (savedDismissKeys === null) {
      setTimeout(() => createAlert(Lang._('DISMISS_REMINDER')), 0);
      // If no existing entries, create empty array to iterate on.
      savedDismissKeys = [];
    }

    // Update dismiss array.
    if (object.dismiss) {
      // Dismissal object.
      const dismissalDetails = {
        key: object.dismiss,
        href: window.location.pathname,
      };

      // Get the position of the last annotation that was dismissed.
      const item = find(`[data-sa11y-annotation='${object.id}']`);
      const latestDismissed = item[0]
        ? item[0].getAttribute('data-sa11y-position') : 0;
      store.setItem('sa11y-latest-dismissed', latestDismissed);

      // Add dismissed item to local storage object.
      store.setItem('sa11y-dismiss-item', JSON.stringify(dismissalDetails));
      savedDismissKeys.push(dismissalDetails);
      store.setItem('sa11y-dismissed', JSON.stringify(savedDismissKeys));
      store.removeItem('sa11y-dismiss-item'); // Remove temporary storage item.

      // Remove tooltip.
      if (element.closest('[data-tippy-root]') !== null) {
        element.closest('[data-tippy-root]').remove();
      }

      // Async scan upon dismiss.
      resetAll(false);
      await checkAll();
    }
  }
};

/* 2. Restore hidden alerts on the CURRENT page only. */
const restoreDismissButton = async (dismissed, checkAll, resetAll) => {
  const dismissContainer = document.querySelector('sa11y-dismiss-tooltip');
  dismissContainer.hidden = true; // Prevent flash of tooltip.
  const filtered = dismissed.filter((item) => item.href !== window.location.pathname);
  store.setItem('sa11y-dismissed', JSON.stringify(filtered));
  Constants.Panel.dismissButton.classList.remove('active');

  // Reset & check.
  resetAll(false);
  await checkAll();
};

// Add event listeners.
export function dismissButtons(results, dismissed, checkAll, resetAll) {
  if (Constants.Global.dismissAnnotations) {
    // Dismiss buttons.
    dismissHandler = (e) => {
      dismissIssueButton(e, results, checkAll, resetAll);
    };

    // Dismiss button exists in both tooltip and control panel.
    const tooltips = document.querySelector('sa11y-tooltips').shadowRoot;
    tooltips.addEventListener('click', dismissHandler);
    Constants.Panel.panel.addEventListener('click', dismissHandler);
  }

  // Initialize restore alerts button regardless if plugin enabled or not.
  restoreDismissedHandler = () => {
    restoreDismissButton(dismissed, checkAll, resetAll);
  };
  Constants.Panel.dismissButton?.addEventListener('click', restoreDismissedHandler);
}

// Imported by Reset function.
export function removeDismissListeners() {
  Constants.Panel.panel?.removeEventListener('click', dismissHandler);
  Constants.Panel.dismissButton?.removeEventListener('click', restoreDismissedHandler);
}
