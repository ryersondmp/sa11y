// ----------------------------------------------------------------------
// Check all
// ----------------------------------------------------------------------
import { nudge, detectOverflow } from './utilities';
import initializeTooltips from './tooltips';
import findElements from './find-elements';
import resetAll from './reset';

// Update panel
import updatePanel from '../panel/update-panel';
import updateBadge from '../panel/update-badge';

// Import rulesets
import checkHeaders from '../rulesets/headings';
import checkLinkText from '../rulesets/links';
import checkAltText from '../rulesets/images';
import checkContrast from '../rulesets/contrast';
import checkLabels from '../rulesets/labels';
import checkLinksAdvanced from '../rulesets/links-advanced';
import checkReadability from '../rulesets/readability';
import checkEmbeddedContent from '../rulesets/embedded-content';
import checkQA from '../rulesets/qa';

export default async function checkAll() {
  Sa11y.errorCount = 0;
  Sa11y.warningCount = 0;

  // Error handling. If specified selector doesn't exist on page.
  const rootTarget = document.querySelector(option.checkRoot);
  if (!rootTarget) {
    // If target root can't be found, scan the body of page instead.
    Sa11y.root = document.querySelector('body');

    // Send an alert to panel.
    const $alertPanel = document.getElementById('sa11y-panel-alert');
    const $alertText = document.getElementById('sa11y-panel-alert-text');

    const root = option.checkRoot;
    $alertText.innerHTML = `${Lang.sprintf('ERROR_MISSING_ROOT_TARGET', root)}`;
    $alertPanel.classList.add('sa11y-active');
  } else {
    Sa11y.root = document.querySelector(option.checkRoot);
  }

  findElements();

  // Ruleset checks
  checkHeaders();
  checkLinkText();
  checkAltText();

  // Contrast plugin
  if (option.contrastPlugin === true) {
    if (localStorage.getItem('sa11y-remember-contrast') === 'On') {
      checkContrast();
    }
  } else {
    const contrastLi = document.getElementById('sa11y-contrast-li');
    contrastLi.setAttribute('style', 'display: none !important;');
    localStorage.setItem('sa11y-remember-contrast', 'Off');
  }

  // Form labels plugin
  if (option.formLabelsPlugin === true) {
    if (localStorage.getItem('sa11y-remember-labels') === 'On') {
      checkLabels();
    }
  } else {
    const formLabelsLi = document.getElementById('sa11y-form-labels-li');
    formLabelsLi.setAttribute('style', 'display: none !important;');
    localStorage.setItem('sa11y-remember-labels', 'Off');
  }

  // Links (Advanced) plugin
  if (option.linksAdvancedPlugin === true) {
    if (localStorage.getItem('sa11y-remember-links-advanced') === 'On') {
      checkLinksAdvanced();
    }
  } else {
    const linksAdvancedLi = document.getElementById('sa11y-links-advanced-li');
    linksAdvancedLi.setAttribute('style', 'display: none !important;');
    localStorage.setItem('sa11y-remember-links-advanced', 'Off');
  }

  // Readability plugin
  if (option.readabilityPlugin === true) {
    if (localStorage.getItem('sa11y-remember-readability') === 'On') {
      checkReadability();
    }
  } else {
    const readabilityLi = document.getElementById('sa11y-readability-li');
    const readabilityPanel = document.getElementById('sa11y-readability-panel');
    readabilityLi.setAttribute('style', 'display: none !important;');
    readabilityPanel.classList.remove('sa11y-active');
    // localStorage.setItem("sa11y-remember-readability", "Off");
  }

  // Embedded content plugin
  if (option.embeddedContentAll === true) {
    checkEmbeddedContent();
  }

  // QA module checks.
  checkQA();

  /* Custom checks abstracted to seperate class.
  if (option.customChecks === true) {
    if (typeof Sa11yCustomChecks !== 'undefined') {
      this.customChecks.check();
    }
  } */

  // Update panel
  if (this.panelActive) {
    resetAll();
  } else {
    updatePanel();
  }
  initializeTooltips();
  detectOverflow();
  nudge();

  // Don't show badge when panel is opened.
  if (!document.getElementsByClassName('sa11y-on').length) {
    updateBadge();
  }
}
