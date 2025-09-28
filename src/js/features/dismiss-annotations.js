import Constants from '../utils/constants';
import { store, createAlert } from '../utils/utils';
import find from '../utils/find';
import Lang from '../utils/lang';

/* ************************************************************ */
/*  Update results array before painting annotations to page.   */
/* ************************************************************ */
export function dismissLogic(results, dismissTooltip) {
  // Get dismissed items and re-parse back into object.
  const dismissedIssues = JSON.parse(localStorage.getItem('sa11y-dismissed') || '[]');
  const currentPath = window.location.pathname;

  // Helper function to check if an issue is individually dismissed.
  const isSoloDismissed = (issue, dismissed) => dismissed.key.includes(issue.dismiss)
    && dismissed.href === currentPath
    && (issue.type === 'warning' || issue.type === 'good');

  // Helper function to check if "dismiss all".
  const dismissAll = (issue, dismissed) => typeof dismissed.dismissAll === 'string'
    && issue.dismissAll === dismissed.dismissAll
    && dismissed.href === currentPath;

  // Process individually dismissed issues.
  const soloDismissed = results.filter((issue) => dismissedIssues.some((dismissed) => isSoloDismissed(issue, dismissed)));

  // Process dismiss all issues.
  const allDismissed = results.filter((issue) => dismissedIssues.some((dismissed) => dismissAll(issue, dismissed)));

  // Combine all dismissed results and filter out duplicates.
  const mergeDismissed = [...soloDismissed, ...allDismissed];
  const dismissedResults = [...new Map(mergeDismissed.map((issue) => [issue.dismiss, issue])).values()];
  const dismissCount = dismissedResults.length;

  // Update results array (exclude dismissed and dismissed all checks).
  const updatedResults = results.filter((issue) => !dismissedResults.some((dismissed) => dismissed.dismiss === issue.dismiss && (issue.type === 'warning' || issue.type === 'good')));

  // Show dismiss button in panel.
  if (dismissCount) {
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
  const dismissButton = e.target;
  const dismissContainer = document.querySelector('sa11y-panel-tooltips');
  dismissContainer.hidden = false;

  // Make sure event listener is attached to dismiss button.
  if (dismissButton.tagName === 'BUTTON' && dismissButton.hasAttribute('data-sa11y-dismiss')) {
    // Find corresponding issue within main results object and mark as dismissed.
    const dismissItem = parseInt(dismissButton.getAttribute('data-sa11y-dismiss'), 10);
    const issue = results.find(($el) => $el.id === dismissItem);

    // Give a one time reminder that dismissed items are temporary.
    if (savedDismissKeys === null) {
      setTimeout(() => createAlert(Lang._('DISMISS_REMINDER')), 0);
      // If no existing entries, create empty array to iterate on.
      savedDismissKeys = [];
    }

    // Update dismiss array.
    if (issue.dismiss) {
      // If dismiss all selected, then indicate so within dismiss object.
      const dismissAllSelected = dismissButton.hasAttribute('data-sa11y-dismiss-all')
        ? issue.dismissAll : '';
      // Dismissal object.
      const dismissalDetails = {
        key: issue.dismiss,
        href: window.location.pathname,
        ...(dismissAllSelected ? { dismissAll: dismissAllSelected } : {}),
      };

      // Get the position of the last annotation that was dismissed.
      const item = find(`[data-sa11y-annotation='${issue.id}']`);
      const latestDismissed = item[0]
        ? item[0].getAttribute('data-sa11y-position') : 0;
      store.setItem('sa11y-latest-dismissed', latestDismissed);

      // Add dismissed item to local storage object.
      store.setItem('sa11y-dismiss-item', JSON.stringify(dismissalDetails));
      savedDismissKeys.push(dismissalDetails);
      store.setItem('sa11y-dismissed', JSON.stringify(savedDismissKeys));
      store.removeItem('sa11y-dismiss-item'); // Remove temporary storage item.

      // Remove tooltip.
      const tooltip = dismissButton?.closest('[data-tippy-root]');
      if (tooltip) {
        setTimeout(() => {
          tooltip.remove();
        }, 0);
      }

      // Async scan upon dismiss.
      resetAll(false);
      await checkAll();
    }
  }
};

/* 2. Restore hidden alerts on the CURRENT page only. */
const restoreDismissButton = async (dismissed, checkAll, resetAll) => {
  const dismissContainer = document.querySelector('sa11y-panel-tooltips');
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
    dismissHandler = (e) => dismissIssueButton(e, results, checkAll, resetAll);

    // Dismiss button exists in both tooltip and control panel.
    const tooltips = document.querySelector('sa11y-tooltips').shadowRoot;
    tooltips.addEventListener('click', dismissHandler);
    Constants.Panel.panel.addEventListener('click', dismissHandler);
  }

  // Initialize restore alerts button regardless if plugin enabled or not.
  restoreDismissedHandler = () => restoreDismissButton(dismissed, checkAll, resetAll);
  Constants.Panel.dismissButton?.addEventListener('click', restoreDismissedHandler);
}

// Imported by Reset function.
export function removeDismissListeners() {
  Constants.Panel.panel?.removeEventListener('click', dismissHandler);
  Constants.Panel.dismissButton?.removeEventListener('click', restoreDismissedHandler);
}
