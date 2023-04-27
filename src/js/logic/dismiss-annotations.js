import Constants from '../utils/constants';
import { store } from '../utils/utils';
import find from '../utils/find';
import Lang from '../utils/lang';

/* ************************************************************ */
/*  Update results array before painting annotations to page.   */
/* ************************************************************ */
export function dismissAnnotationsLogic(results, dismissTooltip) {
  // Get dismissed items and re-parse back into object.
  let dismissed = store.getItem('sa11y-dismissed');
  dismissed = dismissed ? JSON.parse(dismissed) : [];

  // Return element from results array that matches dismiss key and dismiss url. Then filter through matched objects.
  const findKey = dismissed.map((e) => {
    const found = results.find((f) => (e.key.includes(f.dismiss) && e.href === Constants.Global.currentPage));
    if (found === undefined) return '';
    return found;
  });

  // Number of dismissed items found on the page.
  const dismissCount = results.filter((issue) => findKey.find((e) => e.dismiss === issue.dismiss)).length;

  // Update results array (exclude dismissed items).
  const updatedResults = results.filter((issue) => !findKey.find((e) => e.dismiss === issue.dismiss));

  // Show dismiss button in panel.
  if (dismissCount >= 1) {
    Constants.Panel.dismissButton.classList.add('active');
    Constants.Panel.dismissTooltip.innerText = Lang.sprintf('PANEL_DISMISS_BUTTON', dismissCount);
    dismissTooltip.object.setContent(Lang.sprintf('PANEL_DISMISS_BUTTON', dismissCount));
  } else {
    Constants.Panel.dismissButton.classList.remove('active');
  }
  return { dismissed, updatedResults };
}

/* ************************************************************ */
/*  Logic for tooltip "Dismiss" buttons & panel restore button  */
/* ************************************************************ */
export function dismissAnnotationsButtons(
  dismissAnnotationsOption,
  results,
  dismissed,
  checkAll,
  resetAll,
) {
  if (dismissAnnotationsOption === true) {
    // 1) Hide annotation upon click on dismiss button on warning. Dismiss button exists in both tooltip and control panel. Need to add event listeners to both components.
    const tooltips = document.querySelector('sa11y-tooltips').shadowRoot;
    const controlPanel = document.querySelector('sa11y-control-panel').shadowRoot;
    const dismissTooltipContainer = document.querySelector('sa11y-dismiss-tooltip');

    const handleClick = async (e) => {
      // Get dismissed array from localStorage.
      let existingEntries = JSON.parse(store.getItem('sa11y-dismissed'));
      const element = e.target;
      dismissTooltipContainer.hidden = false;

      // Make sure event listener is attached to dismiss button.
      if (element.tagName === 'BUTTON' && element.hasAttribute('data-sa11y-dismiss')) {
        // Find corresponding issue within main issues object and mark as dismissed.
        const dismissItem = parseInt(element.getAttribute('data-sa11y-dismiss'), 10);
        const object = results.find(($el) => $el.id === dismissItem);

        // If no existing entries, create empty array to iterate on.
        if (existingEntries === null) existingEntries = [];

        // Dismissal object.
        const dismissalDetails = {
          key: object.dismiss,
          href: Constants.Global.currentPage,
        };

        const item = find(`[data-sa11y-annotation='${object.id}']`);
        const latestDismissed = item[0].getAttribute('data-sa11y-position');
        store.setItem('sa11y-latest-dismissed', latestDismissed);

        store.setItem('sa11y-dismiss-item', JSON.stringify(dismissalDetails));
        existingEntries.push(dismissalDetails);
        store.setItem('sa11y-dismissed', JSON.stringify(existingEntries));
        store.removeItem('sa11y-dismiss-item'); // Remove temporary storage item.
        Constants.Panel.dismissButton.classList.add('active'); // Make panel active.

        // Remove tooltip.
        if (element.closest('[data-tippy-root]') !== null) {
          element.closest('[data-tippy-root]').remove();
        }

        // Async scan upon dismiss.
        resetAll(false);
        await checkAll();
      }
    };

    tooltips.addEventListener('click', handleClick);
    controlPanel.addEventListener('click', handleClick);

    // 2) Restore hidden alerts on the CURRENT page only.
    Constants.Panel.dismissButton.onclick = async () => {
      dismissTooltipContainer.hidden = true; // Prevent flash of tooltip.
      const filtered = dismissed.filter((item) => item.href !== Constants.Global.currentPage);
      store.setItem('sa11y-dismissed', JSON.stringify(filtered));
      Constants.Panel.dismissButton.classList.remove('active');
      resetAll(false);
      await checkAll();
    };
  }
}
