//----------------------------------------------------------------------
// Feature to detect if URL changed for bookmarklet/SPAs.
//----------------------------------------------------------------------
import checkAll from './check';
import resetAll from './reset';
import { debounce } from './utilities';

export default function detectPageChanges(option) {
  // Feature to detect page changes (e.g. SPAs).
  if (option.detectSPArouting === true) {
    let url = window.location.href;
    const checkURL = debounce(async () => {
      if (url !== window.location.href) {
        // If panel is closed.
        if (localStorage.getItem('sa11y-remember-panel') === 'Closed' || !localStorage.getItem('sa11y-remember-panel')) {
          this.panelActive = true;
          checkAll();
        }
        // Async scan while panel is open.
        if (this.panelActive === true) {
          resetAll(false);
          await checkAll();
        }
        // Performance: New URL becomes current.
        url = window.location.href;
      }
    }, 250);
    window.addEventListener('mousemove', checkURL);
    window.addEventListener('keydown', checkURL);
  }
}
