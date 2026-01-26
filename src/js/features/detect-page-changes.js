import { debounce, store } from '../utils/utils';
import { resetAll } from '../core/resetAll';
import { State } from '../core/state';

/* ******************************************************** */
/*  Feature to detect if URL changed for bookmarklet/SPAs.  */
/* ******************************************************** */
export default function detectPageChanges(checkAll) {
  if (State.option.detectSPArouting === true) {
    // Current URL.
    let url = window.location.href;
    // Debounce function to re-check page.
    const checkURL = debounce(async () => {
      if (url !== window.location.href) {
        if (store.getItem('sa11y-panel') === 'Closed' || !store.getItem('sa11y-panel')) {
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
