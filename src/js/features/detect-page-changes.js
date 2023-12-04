import { store, debounce } from '../utils/utils';

/* ******************************************************** */
/*  Feature to detect if URL changed for bookmarklet/SPAs.  */
/* ******************************************************** */
export default function detectPageChanges(detectSPArouting, checkAll, resetAll) {
  // Feature to detect page changes (e.g. SPAs).
  if (detectSPArouting === true) {
    let url = window.location.pathname;

    const checkURL = debounce(async () => {
      if (url !== window.location.pathname) {
        if (store.getItem('sa11y-remember-panel') === 'Closed' || !store.getItem('sa11y-remember-panel')) {
          checkAll();
        } else {
          // Async scan while panel is open.
          resetAll(false);
          await checkAll();
        }

        // Performance: New URL becomes current.
        url = window.location.pathname;
      }
    }, 250);
    window.addEventListener('mousemove', checkURL);
    window.addEventListener('keydown', checkURL);
  }
}
