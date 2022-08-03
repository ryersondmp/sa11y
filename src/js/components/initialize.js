import globals from './global-config';
import buildSa11yUI from '../panel/interface';
import settingPanelToggles from '../panel/settings';
import mainToggle from '../panel/main-toggle';
import skipToIssueTooltip from '../panel/skipTooltip';
import detectPageChanges from './detect-changes';
import checkAll from './check';

export default function initialize() {
  // Do not run Sa11y if any supplied elements detected on page.
  const checkRunPrevent = () => {
    const { doNotRun } = option;
    return doNotRun.trim().length > 0 ? document.querySelector(doNotRun) : false;
  };

  // Only call Sa11y once page has loaded.
  const documentLoadingCheck = (callback) => {
    if (document.readyState === 'complete') {
      callback();
    } else {
      window.addEventListener('load', callback);
    }
  };

  if (!checkRunPrevent()) {
    globals();

    // Once document has fully loaded.
    documentLoadingCheck(() => {
      buildSa11yUI();
      settingPanelToggles();
      mainToggle();

      skipToIssueTooltip();
      detectPageChanges();

      /* Custom rulesets class.
      if (typeof Sa11yCustomChecks !== 'undefined') {
        this.customChecks = new Sa11yCustomChecks(Sa11y);
      } */

      // Check page once page is done loading.
      document.getElementById('sa11y-toggle').disabled = false;
      if (localStorage.getItem('sa11y-remember-panel') === 'Closed' || !localStorage.getItem('sa11y-remember-panel')) {
        this.panelActive = true;
        checkAll();
      }
    });
  }
}
