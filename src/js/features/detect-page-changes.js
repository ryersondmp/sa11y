import { store, debounce } from '../utils/utils';

/* ******************************************************** */
/*  Feature to detect if URL changed for bookmarklet/SPAs.  */
/* ******************************************************** */
export default function detectPageChanges(detectSPArouting, checkAll, resetAll) {
  if (detectSPArouting === true) {
    // Current URL.
    let url = window.location.href;
    // Debounce function to re-check page.
    const checkURL = debounce(async () => {
      if (url !== window.location.href) {
        if (store.getItem('sa11y-remember-panel') === 'Closed' || !store.getItem('sa11y-remember-panel')) {
          checkAll();
        } else {
          resetAll(false);
          await checkAll();
        }
        url = window.location.href; // Update current URL
      }
    }, 250);
    window.addEventListener('click', checkURL);
    window.addEventListener('keydown', checkURL);
  }
}
