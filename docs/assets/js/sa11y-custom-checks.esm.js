/* Translation object */
const Lang = {
  langStrings: {},
  addI18n(strings) {
    this.langStrings = strings;
  },
  _(string) {
    return this.translate(string);
  },
  sprintf(string, ...args) {
    let transString = this._(string);
    transString = this.prepHTML(transString);

    if (args && args.length) {
      args.forEach((arg) => {
        transString = transString.replace(/%\([a-zA-z]+\)/, arg);
      });
    }
    return transString;
  },
  translate(string) {
    return this.langStrings[string] || string;
  },
  prepHTML($el) {
    return $el.replaceAll(/<hr>/g, '<hr aria-hidden="true">')
      .replaceAll(/<a[\s]href=/g, '<a target="_blank" rel="noopener noreferrer" href=')
      .replaceAll(/<\/a>/g, `<span class="visually-hidden"> (${Lang._('NEW_TAB')})</span></a>`)
      .replaceAll(/{r}/g, 'class="red-text"');
  },
};

const Constants = (function myConstants() {
  /* Global constants */
  const Global = {};
  function initializeGlobalConstants() {
    Global.ERROR = Lang._('ERROR');
    Global.WARNING = Lang._('WARNING');
    Global.GOOD = Lang._('GOOD');
    Global.currentPage = window.location.pathname;
    Global.html = document.querySelector('html');

    // A11y: Determine scroll behaviour
    let reducedMotion = false;
    if (typeof window.matchMedia === 'function') {
      reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
    }
    Global.scrollBehaviour = (!reducedMotion || reducedMotion.matches) ? 'auto' : 'smooth';
  }

  /* The following selectors must be initilized only once Sa11y's UI/HTML is built. Create an object so they can be easily referenced anywhere. */
  const Panel = {};
  function initializePanelSelectors() {
    const Sa11yPanel = document.querySelector('sa11y-control-panel').shadowRoot;

    Panel.panel = Sa11yPanel.getElementById('panel');
    Panel.content = Sa11yPanel.getElementById('panel-content');
    Panel.controls = Sa11yPanel.getElementById('panel-controls');
    Panel.outline = Sa11yPanel.getElementById('outline-panel');
    Panel.outlineList = Sa11yPanel.getElementById('outline-list');
    Panel.outlineHeader = Sa11yPanel.getElementById('outline-header');
    Panel.notifBadge = Sa11yPanel.getElementById('notification-badge');
    Panel.notifCount = Sa11yPanel.getElementById('notification-count');
    Panel.notifText = Sa11yPanel.getElementById('notification-text');
    Panel.status = Sa11yPanel.getElementById('status');
    Panel.pageErrors = Sa11yPanel.getElementById('page-errors');

    // Settings
    Panel.settings = Sa11yPanel.getElementById('settings-panel');
    Panel.settingsHeader = Sa11yPanel.getElementById('settings-header');
    Panel.settingsContent = Sa11yPanel.getElementById('settings-content');
    Panel.contrastToggle = Sa11yPanel.getElementById('contrast-toggle');
    Panel.labelsToggle = Sa11yPanel.getElementById('labels-toggle');
    Panel.linksToggle = Sa11yPanel.getElementById('links-advanced-toggle');
    Panel.readabilityToggle = Sa11yPanel.getElementById('readability-toggle');
    Panel.themeToggle = Sa11yPanel.getElementById('theme-toggle');
    Panel.contrastItem = Sa11yPanel.getElementById('contrast-item');
    Panel.labelsItem = Sa11yPanel.getElementById('form-labels-item');
    Panel.linksItem = Sa11yPanel.getElementById('links-advanced-item');
    Panel.readabilityItem = Sa11yPanel.getElementById('readability-item');

    // Buttons
    Panel.toggle = Sa11yPanel.getElementById('toggle');
    Panel.outlineToggle = Sa11yPanel.getElementById('outline-toggle');
    Panel.settingsToggle = Sa11yPanel.getElementById('settings-toggle');
    Panel.skipButton = Sa11yPanel.getElementById('skip-button');
    Panel.dismissButton = Sa11yPanel.getElementById('dismiss-button');
    Panel.dismissTooltip = Sa11yPanel.getElementById('dismiss-tooltip');

    // Alerts
    Panel.alert = Sa11yPanel.getElementById('panel-alert');
    Panel.alertText = Sa11yPanel.getElementById('panel-alert-text');
    Panel.alertPreview = Sa11yPanel.getElementById('panel-alert-preview');
    Panel.alertClose = Sa11yPanel.getElementById('close-alert');

    // Readability
    Panel.readability = Sa11yPanel.getElementById('readability-panel');
    Panel.readabilityInfo = Sa11yPanel.getElementById('readability-info');
    Panel.readabilityDetails = Sa11yPanel.getElementById('readability-details');
  }

  return {
    initializeGlobalConstants,
    Global,
    initializePanelSelectors,
    Panel,
  };
}());

/**
 * Utility: Prepare dismiss key.
 * @param {String} string The node to start from.
 * @return {String} Returns 256 character string without spaces.
*/
function prepareDismissal(string) {
  return String(string).substring(0, 256);
}

function checkCustom(checkRoot, results) {
  const C = {
    ANNOUNCEMENT_MESSAGE:
      'More than one Announcement component found! The Announcement component should be used strategically and sparingly. It should be used to get attention or indicate that something is important. Misuse of this component makes it less effective or impactful. Secondly, this component is semantically labeled as an Announcement for people who use screen readers.',

    ACCORDION_FORM_MESSAGE:
      'Do <strong>not nest forms</strong> within the Accordion component. If the form contains validation issues, a person may not see the form feedback since the accordion panel goes back to its original closed state.',
  };

  /* Example #1 */
  const $checkAnnouncement = checkRoot.querySelectorAll('.sa11y-announcement-component');
  if ($checkAnnouncement.length > 1) {
    for (let i = 1; i < $checkAnnouncement.length; i++) {
      const key = prepareDismissal($checkAnnouncement[i].textContent);
      results.push({
        element: $checkAnnouncement[i],
        type: Constants.Global.WARNING,
        content: C.ANNOUNCEMENT_MESSAGE,
        inline: false,
        position: 'beforebegin',
        dismiss: key,
      });
    }
  }

  /* Example #2  */
  const $checkAccordions = checkRoot.querySelectorAll('.sa11y-accordion-example');
  $checkAccordions.forEach(($el) => {
    const checkForm = $el.querySelector('form');
    if (!!checkForm && checkForm.length) {
      results.push({
        element: $el,
        type: Constants.Global.ERROR,
        content: C.ACCORDION_FORM_MESSAGE,
        inline: false,
        position: 'beforebegin',
      });
    }
  });
}

export { checkCustom as default };
