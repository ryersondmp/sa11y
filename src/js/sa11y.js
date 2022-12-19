/**
 * Sa11y, the accessibility quality assurance assistant.
 * @version: 2.3.6
 * @author: Development led by Adam Chaboryk, CPWA. <adam.chaboryk@ryerson.ca>
 * @license: https://github.com/ryersondmp/sa11y/blob/master/LICENSE.md
 * @acknowledgements https://sa11y.netlify.app/acknowledgements/
 * @copyright (c) 2020 - 2022 Toronto Metropolitan University (formerly Ryerson University).
 * The above copyright notice shall be included in all copies or substantial portions of the Software.
*/

import tippy from 'tippy.js';

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
      .replaceAll(/<\/a>/g, `<span class="sa11y-visually-hidden"> (${Lang._('NEW_TAB')})</span></a>`)
      .replaceAll(/{r}/g, 'class="sa11y-red-text"');
  },
};

class Sa11yCustomChecks {
  setSa11y(sa11y) {
    this.sa11y = sa11y;
  }

  check() {}
}

class Sa11y {
  constructor(options) {
    const defaultOptions = {
      checkRoot: 'body',
      containerIgnore: '.sa11y-ignore',
      contrastIgnore: '.sr-only, [role="menu"] *',
      outlineIgnore: '',
      headerIgnore: '',
      imageIgnore: '',
      linkIgnore: 'nav *, [role="navigation"] *',
      linkIgnoreSpan: '',
      linksToFlag: '',
      nonConsecutiveHeadingIsError: true,
      flagLongHeadings: true,
      showGoodLinkButton: true,
      detectSPArouting: false,
      doNotRun: '',
      dismissAnnotations: true,
      headless: false,
      selectorPath: false,

      // Readability
      readabilityPlugin: true,
      readabilityRoot: 'body',
      readabilityLang: 'en',
      readabilityIgnore: '',

      // Other plugins
      contrastPlugin: true,
      formLabelsPlugin: true,
      linksAdvancedPlugin: true,
      customChecks: true,

      // QA rulesets
      badLinksQA: true,
      strongItalicsQA: true,
      pdfQA: true,
      langQA: true,
      blockquotesQA: true,
      tablesQA: true,
      allCapsQA: true,
      fakeHeadingsQA: true,
      fakeListQA: true,
      duplicateIdQA: true,
      underlinedTextQA: true,
      pageTitleQA: true,
      subscriptQA: true,

      // Embedded content rulesets
      embeddedContentAll: true,
      embeddedContentAudio: true,
      embeddedContentVideo: true,
      embeddedContentDataViz: true,
      embeddedContentTitles: true,
      embeddedContentGeneral: true,

      // Embedded content
      videoContent: 'youtube.com, vimeo.com, yuja.com, panopto.com',
      audioContent: 'soundcloud.com, simplecast.com, podbean.com, buzzsprout.com, blubrry.com, transistor.fm, fusebox.fm, libsyn.com',
      dataVizContent: 'datastudio.google.com, tableau',
      embeddedContent: '',
    };
    defaultOptions.embeddedContent = `${defaultOptions.videoContent}, ${defaultOptions.audioContent}, ${defaultOptions.dataVizContent}`;

    const option = {
      ...defaultOptions,
      ...options,
    };

    // Global constants.
    const ERROR = Lang._('ERROR');
    const WARNING = Lang._('WARNING');
    const GOOD = Lang._('GOOD');
    const currentPage = window.location.pathname;
    this.html = document.querySelector('html');

    this.initialize = () => {
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
        this.globals();
        this.utilities();

        // Once document has fully loaded.
        documentLoadingCheck(() => {
          if (option.headless === false) {
            this.buildSa11yUI();
            this.settingsPanelToggles();
            this.initializePanelToggles();
            this.mainToggle();
            this.skipToIssueTooltip();
            this.detectPageChanges();
            this.dismissAnnotations();

            // Pass Sa11y instance to custom checks.
            if (option.customChecks && option.customChecks.setSa11y) {
              option.customChecks.setSa11y(this);
            }

            // Check page once page is done loading.
            this.toggle.disabled = false;
            if (this.store.getItem('sa11y-remember-panel') === 'Closed' || !this.store.getItem('sa11y-remember-panel')) {
              this.panelActive = false;
              this.checkAll();
            } else {
              this.panelActive = true;
            }
          } else {
            // Headless mode: Perform all checks without loading UI.
            if (option.customChecks && option.customChecks.setSa11y) {
              option.customChecks.setSa11y(this);
            }
            this.checkAll();
          }
        });
      }
    };

    this.buildSa11yUI = () => {
      // Icon on the main toggle.
      const MainToggleIcon = "<svg role='img' focusable='false' width='35px' height='35px' aria-hidden='true' xmlns='http://www.w3.org/2000/svg' viewBox='0 0 512 512'><path fill='#ffffff' d='M256 48c114.953 0 208 93.029 208 208 0 114.953-93.029 208-208 208-114.953 0-208-93.029-208-208 0-114.953 93.029-208 208-208m0-40C119.033 8 8 119.033 8 256s111.033 248 248 248 248-111.033 248-248S392.967 8 256 8zm0 56C149.961 64 64 149.961 64 256s85.961 192 192 192 192-85.961 192-192S362.039 64 256 64zm0 44c19.882 0 36 16.118 36 36s-16.118 36-36 36-36-16.118-36-36 16.118-36 36-36zm117.741 98.023c-28.712 6.779-55.511 12.748-82.14 15.807.851 101.023 12.306 123.052 25.037 155.621 3.617 9.26-.957 19.698-10.217 23.315-9.261 3.617-19.699-.957-23.316-10.217-8.705-22.308-17.086-40.636-22.261-78.549h-9.686c-5.167 37.851-13.534 56.208-22.262 78.549-3.615 9.255-14.05 13.836-23.315 10.217-9.26-3.617-13.834-14.056-10.217-23.315 12.713-32.541 24.185-54.541 25.037-155.621-26.629-3.058-53.428-9.027-82.141-15.807-8.6-2.031-13.926-10.648-11.895-19.249s10.647-13.926 19.249-11.895c96.686 22.829 124.283 22.783 220.775 0 8.599-2.03 17.218 3.294 19.249 11.895 2.029 8.601-3.297 17.219-11.897 19.249z'/></svg>";

      const container = document.createElement('div');
      container.setAttribute('id', 'sa11y-container');
      container.setAttribute('role', 'region');
      container.setAttribute('lang', Lang._('LANG_CODE'));
      container.setAttribute('aria-label', Lang._('CONTAINER_LABEL'));

      const rememberContrast = this.store.getItem('sa11y-remember-contrast') === 'On';
      const rememberFormLabels = this.store.getItem('sa11y-remember-labels') === 'On';
      const rememberLinksAdvanced = this.store.getItem('sa11y-remember-links-advanced') === 'On';
      const rememberReadability = this.store.getItem('sa11y-remember-readability') === 'On';

      container.innerHTML = `
        <button type="button" aria-expanded="false" id="sa11y-toggle" aria-describedby="sa11y-notification-badge" aria-label="${Lang._('MAIN_TOGGLE_LABEL')}" disabled>
          ${MainToggleIcon}
          <div id="sa11y-notification-badge">
            <span id="sa11y-notification-count"></span>
            <span id="sa11y-notification-text" class="sa11y-visually-hidden"></span>
          </div>
        </button>`

        // Start of main container.
        + '<div id="sa11y-panel">'

        // Page Outline tab.
        + `<div id="sa11y-outline-panel" role="tabpanel" aria-labelledby="sa11y-outline-header">
            <div id="sa11y-outline-header" class="sa11y-header-text">
              <h2 tabindex="-1">${Lang._('PAGE_OUTLINE')}</h2>
            </div>
            <div id="sa11y-outline-content">
              <ul id="sa11y-outline-list" tabindex="0" role="list" aria-label="${Lang._('PAGE_OUTLINE')}"></ul>
            </div>
            <div id="sa11y-readability-panel">
              <div id="sa11y-readability-content">
                <h2 class="sa11y-header-text-inline">${Lang._('LANG_READABILITY')}</h2>
                <p id="sa11y-readability-info"></p>
                <ul id="sa11y-readability-details"></ul>
              </div>
            </div>
          </div>`

        // Settings tab.
        + `<div id="sa11y-settings-panel" role="tabpanel" aria-labelledby="sa11y-settings-header">
            <div id="sa11y-settings-header" class="sa11y-header-text">
              <h2 tabindex="-1">${Lang._('SETTINGS')}</h2>
            </div>
            <div id="sa11y-settings-content">
              <ul id="sa11y-settings-options">
                <li id="sa11y-contrast-item">
                  <label id="sa11y-check-contrast" for="sa11y-contrast-toggle">${Lang._('CONTRAST')}</label>
                  <button id="sa11y-contrast-toggle"
                    aria-labelledby="sa11y-check-contrast"
                    class="sa11y-settings-switch"
                    aria-pressed="${rememberContrast ? 'true' : 'false'}">${rememberContrast ? Lang._('ON') : Lang._('OFF')}
                  </button>
                </li>
                <li id="sa11y-form-labels-item">
                  <label id="sa11y-check-labels" for="sa11y-labels-toggle">${Lang._('FORM_LABELS')}</label>
                  <button id="sa11y-labels-toggle"
                    aria-labelledby="sa11y-check-labels"
                    class="sa11y-settings-switch"
                    aria-pressed="${rememberFormLabels ? 'true' : 'false'}">${rememberFormLabels ? Lang._('ON') : Lang._('OFF')}
                  </button>
                </li>
                <li id="sa11y-links-advanced-item">
                  <label id="check-changerequest" for="sa11y-links-advanced-toggle">${Lang._('LINKS_ADVANCED')} <span class="sa11y-badge">AAA</span></label>
                  <button id="sa11y-links-advanced-toggle"
                    aria-labelledby="check-changerequest"
                    class="sa11y-settings-switch"
                    aria-pressed="${rememberLinksAdvanced ? 'true' : 'false'}">${rememberLinksAdvanced ? Lang._('ON') : Lang._('OFF')}</button>
                </li>
                <li id="sa11y-readability-item">
                  <label id="check-readability" for="sa11y-readability-toggle">${Lang._('LANG_READABILITY')} <span class="sa11y-badge">AAA</span></label>
                  <button id="sa11y-readability-toggle"
                    aria-labelledby="check-readability"
                    class="sa11y-settings-switch"
                    aria-pressed="${rememberReadability ? 'true' : 'false'}">${rememberReadability ? Lang._('ON') : Lang._('OFF')}
                  </button>
                </li>
                <li>
                  <label id="sa11y-dark-mode" for="sa11y-theme-toggle">${Lang._('DARK_MODE')}</label>
                  <button id="sa11y-theme-toggle"
                    aria-labelledby="sa11y-dark-mode"
                    class="sa11y-settings-switch">
                  </button>
                </li>
              </ul>
            </div>
          </div>`

      // Console warning messages.
      + `<div id="sa11y-panel-alert">
          <div class="sa11y-header-text">
              <button id="sa11y-close-alert" class="sa11y-close-btn" aria-label="${Lang._('ALERT_CLOSE')}" aria-describedby="sa11y-alert-heading sa11y-panel-alert-text"></button>
              <h2 id="sa11y-alert-heading">${Lang._('ALERT_TEXT')}</h2>
          </div>
          <p id="sa11y-panel-alert-text"></p>
          <div id="sa11y-panel-alert-preview"></div>
        </div>`

      // Main panel that conveys state of page.
      + `<div id="sa11y-panel-content">
          <button id="sa11y-skip-button" type="button">
            <div class="sa11y-panel-icon"></div>
            <span class="sa11y-visually-hidden">${Lang._('SHORTCUT_SCREEN_READER')}</span>
          </button>
          <button id="sa11y-dismiss-button" type="button">
            <div class="sa11y-dismiss-icon"></div>
            <span id="sa11y-dismiss-tooltip" class="sa11y-visually-hidden"></span>
          </button>
          <div id="sa11y-panel-text">
            <h1 class="sa11y-visually-hidden">${Lang._('PANEL_HEADING')}</h1>
            <p id="sa11y-status" aria-live="polite"></p>
          </div>
        </div>`

      // Show Outline & Show Settings button.
      + `<div id="sa11y-panel-controls" role="tablist" aria-orientation="horizontal">
          <button type="button" role="tab" aria-expanded="false" id="sa11y-outline-toggle" aria-controls="sa11y-outline-panel">
            ${Lang._('SHOW_OUTLINE')}
          </button>
          <button type="button" role="tab" aria-expanded="false" id="sa11y-settings-toggle" aria-controls="sa11y-settings-panel">
            ${Lang._('SHOW_SETTINGS')}
          </button>
          <div style="width:40px;"></div>
        </div>`

      // End of main container.
      + '</div>';

      // Append before closing body tag.
      document.body.appendChild(container);

      // Constants available for use after control panel is constructed.
      this.container = document.getElementById('sa11y-container');
      this.panel = document.getElementById('sa11y-panel');
      this.panelContent = document.getElementById('sa11y-panel-content');
      this.panelControls = document.getElementById('sa11y-panel-controls');
      this.outlinePanel = document.getElementById('sa11y-outline-panel');
      this.outlineList = document.getElementById('sa11y-outline-list');
      this.outlineHeader = document.getElementById('sa11y-outline-header');
      this.notificationBadge = document.getElementById('sa11y-notification-badge');
      this.notificationCount = document.getElementById('sa11y-notification-count');
      this.notificationText = document.getElementById('sa11y-notification-text');
      this.dismissedBadge = document.getElementById('sa11y-dismissed-badge');
      this.status = document.getElementById('sa11y-status');

      // Settings
      this.settingsPanel = document.getElementById('sa11y-settings-panel');
      this.settingsContent = document.getElementById('sa11y-settings-content');
      this.contrastToggle = document.getElementById('sa11y-contrast-toggle');
      this.labelsToggle = document.getElementById('sa11y-labels-toggle');
      this.linksToggle = document.getElementById('sa11y-links-advanced-toggle');
      this.readabilityToggle = document.getElementById('sa11y-readability-toggle');
      this.themeToggle = document.getElementById('sa11y-theme-toggle');
      this.contrastItem = document.getElementById('sa11y-contrast-item');
      this.formLabelsItem = document.getElementById('sa11y-form-labels-item');
      this.linksAdvacedItem = document.getElementById('sa11y-links-advanced-item');
      this.readabilityItem = document.getElementById('sa11y-readability-item');

      // Buttons
      this.toggle = document.getElementById('sa11y-toggle');
      this.outlineToggle = document.getElementById('sa11y-outline-toggle');
      this.settingToggle = document.getElementById('sa11y-settings-toggle');
      this.skipButton = document.getElementById('sa11y-skip-button');
      this.restoreDismissButton = document.getElementById('sa11y-dismiss-button');
      this.dismissTooltip = document.getElementById('sa11y-dismiss-tooltip');

      // Alerts
      this.alertPanel = document.getElementById('sa11y-panel-alert');
      this.alertText = document.getElementById('sa11y-panel-alert-text');
      this.alertPreview = document.getElementById('sa11y-panel-alert-preview');
      this.closeAlert = document.getElementById('sa11y-close-alert');

      // Readability
      this.readabilityInfo = document.getElementById('sa11y-readability-info');
      this.readabilityPanel = document.getElementById('sa11y-readability-panel');
      this.readabilityDetails = document.getElementById('sa11y-readability-details');
    };

    this.globals = () => {
      // Readability root
      if (!option.readabilityRoot) {
        option.readabilityRoot = option.checkRoot;
      }

      // Supported readability languages. Turn module off if not supported.
      const supportedLang = ['en', 'fr', 'es', 'de', 'nl', 'it', 'sv', 'fi', 'da', 'no', 'nb', 'nn'];
      const pageLang = this.html.getAttribute('lang');

      // If lang attribute is missing, turn off readability plugin.
      if (!pageLang) {
        option.readabilityPlugin = false;
      } else {
        const pageLangLowerCase = pageLang.toLowerCase();
        if (!supportedLang.some(($el) => pageLangLowerCase.includes($el))) {
          option.readabilityPlugin = false;
        }
      }

      /* Exclusions */
      // Container ignores apply to self and children.
      if (option.containerIgnore) {
        const containerSelectors = option.containerIgnore.split(',').map(($el) => `${$el} *, ${$el}`);
        option.containerIgnore = `[aria-hidden], [data-tippy-root] *, #sa11y-container *, #wpadminbar *, ${containerSelectors.join(', ')}`;
      } else {
        option.containerIgnore = '[aria-hidden], [data-tippy-root] *, #sa11y-container *, #wpadminbar *';
      }
      this.containerIgnore = option.containerIgnore;

      // Contrast exclusions
      this.contrastIgnore = `${this.containerIgnore}, .sa11y-heading-label, script`;
      if (option.contrastIgnore) {
        this.contrastIgnore = `${option.contrastIgnore}, ${this.contrastIgnore}`;
      }

      // Ignore specific regions for readability module.
      this.readabilityIgnore = `${this.containerIgnore}, nav li, [role="navigation"] li`;
      if (option.readabilityIgnore) {
        this.readabilityIgnore = `${option.readabilityIgnore}, ${this.readabilityIgnore}`;
      }

      // Ignore specific headings
      this.headerIgnore = this.containerIgnore;
      if (option.headerIgnore) {
        this.headerIgnore = `${option.headerIgnore}, ${this.headerIgnore}`;
      }

      // Don't add heading label or include in panel.
      if (option.outlineIgnore) {
        this.outlineIgnore = `${option.outlineIgnore}, #sa11y-container h1, #sa11y-container h2`;
      }

      // Ignore specific images.
      this.imageIgnore = `${this.containerIgnore}, [role='presentation']`;
      if (option.imageIgnore) {
        this.imageIgnore = `${option.imageIgnore}, ${this.imageIgnore}`;
      }

      // Ignore specific links
      this.linkIgnore = `${this.containerIgnore}, [aria-hidden="true"], .anchorjs-link`;
      if (option.linkIgnore) {
        this.linkIgnore = `${option.linkIgnore}, ${this.linkIgnore}`;
      }

      // Ignore specific classes within links.
      if (option.linkIgnoreSpan) {
        const linkIgnoreSpanSelectors = option.linkIgnoreSpan.split(',').map(($el) => `${$el} *, ${$el}`);
        option.linkIgnoreSpan = `noscript, ${linkIgnoreSpanSelectors.join(', ')}`;
      } else {
        option.linkIgnoreSpan = 'noscript';
      }

      /* Embedded content sources */
      // Video sources.
      if (option.videoContent) {
        const videoContent = option.videoContent.split(/\s*[\s,]\s*/).map(($el) => `[src*='${$el}']`);
        option.videoContent = `video, ${videoContent.join(', ')}`;
      } else {
        option.videoContent = 'video';
      }

      // Audio sources.
      if (option.audioContent) {
        const audioContent = option.audioContent.split(/\s*[\s,]\s*/).map(($el) => `[src*='${$el}']`);
        option.audioContent = `audio, ${audioContent.join(', ')}`;
      } else {
        option.audioContent = 'audio';
      }

      // Data viz sources.
      if (option.dataVizContent) {
        const dataVizContent = option.dataVizContent.split(/\s*[\s,]\s*/).map(($el) => `[src*='${$el}']`);
        option.dataVizContent = dataVizContent.join(', ');
      } else {
        option.dataVizContent = 'datastudio.google.com, tableau';
      }

      // Embedded content all
      if (option.embeddedContent) {
        const embeddedContent = option.embeddedContent.split(/\s*[\s,]\s*/).map(($el) => `[src*='${$el}']`);
        option.embeddedContent = embeddedContent.join(', ');
      }

      // A11y: Determine scroll behaviour
      let reducedMotion = false;
      if (typeof window.matchMedia === 'function') {
        reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
      }
      this.scrollBehaviour = (!reducedMotion || reducedMotion.matches) ? 'auto' : 'smooth';
    };

    this.mainToggle = () => {
      // Keeps checker active when navigating between pages until it is toggled off.
      this.toggle.addEventListener('click', (e) => {
        if (this.store.getItem('sa11y-remember-panel') === 'Opened') {
          this.store.setItem('sa11y-remember-panel', 'Closed');
          this.toggle.classList.remove('sa11y-on');
          this.toggle.setAttribute('aria-expanded', 'false');
          this.resetAll();
          this.updateBadge();
          e.preventDefault();
        } else {
          this.store.setItem('sa11y-remember-panel', 'Opened');
          this.toggle.classList.add('sa11y-on');
          this.toggle.setAttribute('aria-expanded', 'true');
          this.checkAll();
          // Don't show badge when panel is opened.
          this.notificationBadge.style.display = 'none';
          e.preventDefault();
        }
      });

      // Remember to leave it open
      if (this.store.getItem('sa11y-remember-panel') === 'Opened') {
        this.toggle.classList.add('sa11y-on');
        this.toggle.setAttribute('aria-expanded', 'true');
      }

      // Crudely give time to load any other content or slow post-rendered JS, iFrames, etc.
      if (this.toggle.classList.contains('sa11y-on')) {
        this.toggle.classList.toggle('loading-sa11y');
        this.toggle.setAttribute('aria-expanded', 'true');
        setTimeout(this.checkAll, 400);
      }

      document.onkeydown = (e) => {
        const evt = e || window.event;
        if (evt.key === 'Escape' && this.panel.classList.contains('sa11y-active')) {
          this.toggle.setAttribute('aria-expanded', 'false');
          this.toggle.classList.remove('sa11y-on');
          this.toggle.click();
          this.resetAll();
        }

        // Alt + A to enable accessibility checker.
        if (evt.altKey && evt.code === 'KeyA') {
          this.toggle.click();
          this.toggle.focus();
          evt.preventDefault();
        }
      };
    };

    // ============================================================
    // Utilities: Various utilities.
    // ============================================================
    this.utilities = () => {
      /**
       * Utility: Check if element is hidden.
       * @param  {Node} element The element.
       * @return {Boolean}
      */
      this.isElementHidden = (element) => {
        if (element.getAttribute('hidden') || (element.offsetWidth === 0 && element.offsetHeight === 0)) {
          return true;
        }
        const compStyles = getComputedStyle(element);
        return compStyles.getPropertyValue('display') === 'none';
      };

      /**
       * Utility: Check if element is hidden (display: none) OR visually hidden (.sr-only)
       * @param  {Node} element Node to test.
       * @return {Boolean} boolean.
      */
      this.isElementVisuallyHiddenOrHidden = (element) => {
        if (element.getAttribute('hidden') || (element.offsetWidth === 0 && element.offsetHeight === 0) || (element.clientHeight === 1 && element.clientWidth === 1)) {
          return true;
        }
        const compStyles = getComputedStyle(element);
        return compStyles.getPropertyValue('display') === 'none';
      };

      /**
       * Utility: Escape HTML, encode HTML symbols.
       * @param  {String} text  The user-submitted string.
       * @return {String} text The encoded string.
      */
      this.escapeHTML = (text) => {
        const $div = document.createElement('div');
        $div.textContent = text;
        return $div.innerHTML.replaceAll('"', '&quot;').replaceAll("'", '&#039;').replaceAll('`', '&#x60;');
      };

      /**
       * Utility: Sanitize and encode all HTML in a user-submitted string
       * @link https://portswigger.net/web-security/cross-site-scripting/preventing
       * @param  {String} str  The user-submitted string.
       * @return {String} str  The sanitized string.
      */
      this.sanitizeHTML = (str) => str.replace(/[^\w. ]/gi, (c) => `&#${c.charCodeAt(0)};`);

      /**
       * Utility: Unicode encoder for escaping.
       * @link https://portswigger.net/web-security/cross-site-scripting/preventing
       * @param  {String} str  The sanitized string.
       * @return {String} str  The encoded string.
      */
      this.jsEscape = (str) => String(str).replace(/[^\w. ]/gi, (c) => `\\u${(`0000${c.charCodeAt(0).toString(16)}`).slice(-4)}`);

      /**
       * Utility: Compute alt text on images within a text node.
       * @param  {Node} element  Element to check.
       * @return {String} str  Return text back.
      */
      this.computeTextNodeWithImage = (element) => {
        const textContent = this.getText(element);
        const imgArray = Array.from(element.querySelectorAll('img'));
        let returnText = '';
        // No image, has text.
        if (imgArray.length === 0 && textContent.length > 1) {
          returnText = textContent;
        } else if (imgArray.length && textContent.length === 0) {
          // Has image.
          const imgalt = imgArray[0].getAttribute('alt');
          if (!imgalt || imgalt === ' ' || imgalt === '') {
            returnText = '';
          } else if (imgalt !== undefined) {
            returnText = imgalt;
          }
        } else if (imgArray.length && textContent.length) {
          // Has image and text.
          // To-do: This is a hack? Any way to do this better?
          imgArray.forEach((img) => {
            img.insertAdjacentHTML('afterend', ` <span class='sa11y-clone-image-text' aria-hidden='true'>${imgArray[0].getAttribute('alt')}</span>`);
          });
          returnText = textContent;
        }
        return returnText;
      };

      /**
       * Utility: Debounce
       * @link https://www.joshwcomeau.com/snippets/javascript/debounce/
       * @callback callback
       * @argument {wait}
      */
      this.debounce = (callback, wait) => {
        let timeoutId = null;
        return (...args) => {
          window.clearTimeout(timeoutId);
          timeoutId = window.setTimeout(() => {
            callback(...args);
          }, wait);
        };
      };

      /**
       * Utility: Used to ignore child elements within an anchor.
       * @param  {Node} element  Element to target.
       * @param  {Node} selector Element to ignore.
       * @return {Node} Returns back element excluding the ignored node.
      */
      this.fnIgnore = (element, selector) => {
        const $clone = element.cloneNode(true);
        const $exclude = Array.from(selector ? $clone.querySelectorAll(selector) : $clone.children);
        $exclude.forEach(($c) => {
          $c.parentElement.removeChild($c);
        });
        return $clone;
      };

      /**
       * Utility: Compute accessible name for elements with ARIA.
       * @param  {Node} element  Element to target.
       * @return {String} Returns a string back with the computed accessible name.
      */
      this.computeAriaLabel = (element) => {
        // aria-label
        if (element.matches('[aria-label]')) {
          return element.getAttribute('aria-label');
        }

        // aria-labeledby
        if (element.matches('[aria-labelledby]')) {
          const target = element.getAttribute('aria-labelledby').split(/\s+/);
          if (target.length > 0) {
            let returnText = '';
            target.forEach((x) => {
              const targetSelector = document.querySelector(`#${x}`);
              if (targetSelector === null) {
                returnText += ' ';
              } else if (targetSelector.hasAttribute('aria-label')) {
                returnText += `${targetSelector.getAttribute('aria-label')}`;
              } else {
                returnText += `${targetSelector.firstChild.nodeValue} `;
              }
            });
            return returnText;
          }
        }

        // Child with aria-label
        if (Array.from(element.children).filter((x) => x.matches('[aria-label]')).length > 0) {
          const child = Array.from(element.childNodes);
          let returnText = '';

          // Process each child within node.
          child.forEach((x) => {
            if (x.nodeType === 1) {
              // Ignore HTML comments and make sure label is not null.
              if (x.nodeType === 3 || x.ariaLabel === null) {
                returnText += x.innerText;
              } else {
                returnText += x.getAttribute('aria-label');
              }
            } else {
              returnText += x.nodeValue;
            }
          });
          return returnText;
        }

        // Child with aria-labelledby
        if (Array.from(element.children).filter((x) => x.matches('[aria-labelledby]')).length > 0) {
          const child = Array.from(element.childNodes);
          let returnText = '';

          // Process each child within node.
          child.forEach((y) => {
            if (y.nodeType === 8) {
              // Ignore HTML comments and make sure label is not null.
            } else if (y.nodeType === 3 || y.getAttribute('aria-labelledby') === null) {
              returnText += y.nodeValue;
            } else {
              const target = y.getAttribute('aria-labelledby').split(/\s+/);
              if (target.length > 0) {
                let returnAria = '';
                target.forEach((z) => {
                  if (document.querySelector(`#${z}`) === null) {
                    returnAria += ' ';
                  } else {
                    returnAria += `${document.querySelector(`#${z}`).firstChild.nodeValue} `;
                  }
                });
                returnText += returnAria;
              }
            }
          });
          return returnText;
        }

        // Return if noAria;
        return 'noAria';
      };

      /**
       * Utility: Find visible parent of hidden element.
       * @param  {Node} element  Element to target.
       * @param  {String} property  CSS property. E.g. 'display'
       * @param  {String} value CSS value. E.g. 'none'
       * @return {Node} Returns parent node of element that is visible.
      */
      this.findVisibleParent = (element, property, value) => {
        let $el = element;
        while ($el !== null) {
          const style = window.getComputedStyle($el);
          const propValue = style.getPropertyValue(property);
          if (propValue === value) {
            return $el;
          }
          $el = $el.parentElement;
        }
        return null;
      };

      /**
       * Utility: Calculate top of element.
       * @param  {Node} element  Element to target.
       * @return {Number} Returns number greater than 0!
      */
      this.offsetTop = (element) => {
        const rect = element.getBoundingClientRect();
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        return {
          top: rect.top + scrollTop,
        };
      };

      /**
       * Utility: Local storage with fall back to session storage.
       * @param  {String} key
       * @param  {string} value
       * @return {String} Return key.
      */
      this.store = {
        getItem(key) {
          try {
            if (localStorage.getItem(key) === null) {
              return sessionStorage.getItem(key);
            }
            return localStorage.getItem(key);
          } catch (error) {
            // Cookies totally disabled.
            return false;
          }
        },
        setItem(key, value) {
          try {
            localStorage.setItem(key, value);
          } catch (error) {
            sessionStorage.setItem(key, value);
          }
          return true;
        },
        removeItem(key) {
          try {
            localStorage.removeItem(key);
          } catch (error) {
            sessionStorage.removeItem(key);
          }
          return true;
        },
      };

      /**
       * Utility: Add & remove pulsing border for wayfinding.
       * @param  {Node} element Element to add border too.
      */
      this.addPulse = (element) => {
        const border = 'sa11y-pulse-border';
        document.querySelectorAll(`.${border}`).forEach((el) => el.classList.remove(border));
        element.classList.add(border);
        setTimeout(() => {
          element.classList.remove(border);
        }, 2500);
      };

      /**
       * Utility: Send an alert to main panel.
       * @param  {String} alertMessage The message you'd to show in the alert.
       * @param  {String} errorPreview An optional secondary message or preview of the element.
      */
      this.createAlert = (alertMessage, errorPreview) => {
        this.alertPanel.classList.add('sa11y-active');
        this.alertText.innerHTML = alertMessage;
        if (errorPreview) {
          this.alertPreview.classList.add('sa11y-panel-alert-preview');
          this.alertPreview.innerHTML = errorPreview;
        }
        setTimeout(() => {
          this.closeAlert.focus();
        }, 500);

        // Closing alert sets focus back to Skip to Issue toggle.
        this.closeAlert.addEventListener('click', () => {
          this.removeAlert();
          this.skipButton.focus();
        });
      };

      /**
       * Utility: Call this function without any parameters to remove any alerts in the panel.
      */
      this.removeAlert = () => {
        this.alertPanel.classList.remove('sa11y-active');
        this.alertPreview.classList.remove('sa11y-panel-alert-preview');
        while (this.alertText.firstChild) this.alertText.removeChild(this.alertText.firstChild);
        while (this.alertPreview.firstChild) this.alertPreview.removeChild(this.alertPreview.firstChild);
      };

      /**
       * Utility: Replace newlines and double spaces with a single space.
       * @param {Node} element
       * @return {String} Returns plain text string.
      */
      this.getText = (element) => element.textContent.replace(/[\n\r]+|[\s]{2,}/g, ' ').trim();

      /**
       * Utility: Get next sibling of an element that matches a selector.
       * @param {Node} element The node to start from.
       * @param {String} selector The element you are looking for.
       * @return {Node} Return.
      */
      this.getNextSibling = (element, selector) => {
        let sibling = element.nextElementSibling;
        if (!selector) return sibling;
        while (sibling) {
          if (sibling.matches(selector)) return sibling;
          sibling = sibling.nextElementSibling;
        }
        return '';
      };

      /**
       * Utility: Prepare dismiss key.
       * @param {String} text The node to start from.
       * @return {String} Returns 256 character string without spaces.
      */
      this.prepareDismissal = (text) => String(text).substring(0, 256);

      /**
       * Utility: Generate CSS selector path of element.
       * @param {Node} element the element's node.
       * @link https://www.geeksforgeeks.org/how-to-create-a-function-generateselector-to-generate-css-selector-path-of-a-dom-element/
       * @link https://dev.to/aniket_chauhan/generate-a-css-selector-path-of-a-dom-element-4aim
      */
      this.generateSelectorPath = (element) => {
        const selectorPath = [];
        let pathSelector;
        let target = element;
        while (target.tagName) {
          let i = 0;
          if (target.parentNode) {
            const { children } = target.parentNode;
            while (i < children.length && children[i] !== target) {
              i += 1;
            }
          }
          const { className } = target;
          const idName = target.id;
          pathSelector = target.localName
                          + (className ? `.${className}` : '')
                          + (idName ? `#${idName}` : '');
          selectorPath.unshift(pathSelector + (i > 0 ? `:nth-child(${i + 1})` : ''));
          target = target.parentNode;
        }
        return selectorPath.join(' > ');
      };

      /**
       * Utility: Trap focus of elements within a contained area.
       * @param {String} element The element where you'd like to trap keyboard focus.
       * @author Hidde de Vries
       * @link https://hidde.blog/using-javascript-to-trap-focus-in-an-element/
      */
      Sa11y.trapFocus = (element) => {
        const focusable = element.querySelectorAll('a[href]:not([disabled]), button:not([disabled])');
        const firstFocusable = focusable[0];
        const lastFocusable = focusable[focusable.length - 1];
        element.addEventListener('keydown', (e) => {
          const isTabPressed = (e.key === 'Tab' || e.keyCode === 9);
          if (!isTabPressed) return;
          if (e.shiftKey) {
            if (document.activeElement === firstFocusable) {
              lastFocusable.focus();
              e.preventDefault();
            }
          } else if (document.activeElement === lastFocusable) {
            firstFocusable.focus();
            e.preventDefault();
          }
        });
      };
    };

    //----------------------------------------------------------------------
    // Setting's panel: Additional ruleset toggles.
    //----------------------------------------------------------------------
    this.settingsPanelToggles = () => {
      // Toggle: Contrast
      this.contrastToggle.onclick = async () => {
        if (this.store.getItem('sa11y-remember-contrast') === 'On') {
          this.store.setItem('sa11y-remember-contrast', 'Off');
          this.contrastToggle.textContent = `${Lang._('OFF')}`;
          this.contrastToggle.setAttribute('aria-pressed', 'false');
          this.resetAll(false);
          await this.checkAll();
        } else {
          this.store.setItem('sa11y-remember-contrast', 'On');
          this.contrastToggle.textContent = `${Lang._('ON')}`;
          this.contrastToggle.setAttribute('aria-pressed', 'true');
          this.resetAll(false);
          await this.checkAll();
        }
      };

      // Toggle: Form labels
      this.labelsToggle.onclick = async () => {
        if (this.store.getItem('sa11y-remember-labels') === 'On') {
          this.store.setItem('sa11y-remember-labels', 'Off');
          this.labelsToggle.textContent = `${Lang._('OFF')}`;
          this.labelsToggle.setAttribute('aria-pressed', 'false');
          this.resetAll(false);
          await this.checkAll();
        } else {
          this.store.setItem('sa11y-remember-labels', 'On');
          this.labelsToggle.textContent = `${Lang._('ON')}`;
          this.labelsToggle.setAttribute('aria-pressed', 'true');
          this.resetAll(false);
          await this.checkAll();
        }
      };

      // Toggle: Links (Advanced)
      this.linksToggle.onclick = async () => {
        if (this.store.getItem('sa11y-remember-links-advanced') === 'On') {
          this.store.setItem('sa11y-remember-links-advanced', 'Off');
          this.linksToggle.textContent = `${Lang._('OFF')}`;
          this.linksToggle.setAttribute('aria-pressed', 'false');
          this.resetAll(false);
          await this.checkAll();
        } else {
          this.store.setItem('sa11y-remember-links-advanced', 'On');
          this.linksToggle.textContent = `${Lang._('ON')}`;
          this.linksToggle.setAttribute('aria-pressed', 'true');
          this.resetAll(false);
          await this.checkAll();
        }
      };

      // Toggle: Readability
      this.readabilityToggle.onclick = async () => {
        if (this.store.getItem('sa11y-remember-readability') === 'On') {
          this.store.setItem('sa11y-remember-readability', 'Off');
          this.readabilityToggle.textContent = `${Lang._('OFF')}`;
          this.readabilityToggle.setAttribute('aria-pressed', 'false');
          this.readabilityPanel.classList.remove('sa11y-active');
          this.resetAll(false);
          await this.checkAll();
        } else {
          this.store.setItem('sa11y-remember-readability', 'On');
          this.readabilityToggle.textContent = `${Lang._('ON')}`;
          this.readabilityToggle.setAttribute('aria-pressed', 'true');
          this.readabilityPanel.classList.add('sa11y-active');
          this.resetAll(false);
          await this.checkAll();
        }
      };

      if (this.store.getItem('sa11y-remember-readability') === 'On') {
        this.readabilityPanel.classList.add('sa11y-active');
      }

      /**
       * Dark Mode
       * Credits: Derek Kedziora
       * @link https://derekkedziora.com/blog/dark-mode-revisited
      */
      const systemInitiatedDark = window.matchMedia('(prefers-color-scheme: dark)');
      if (systemInitiatedDark.matches) {
        this.themeToggle.textContent = `${Lang._('ON')}`;
        this.themeToggle.setAttribute('aria-pressed', 'true');
      } else {
        this.themeToggle.textContent = `${Lang._('OFF')}`;
        this.themeToggle.setAttribute('aria-pressed', 'false');
      }
      const prefersColorTest = () => {
        if (systemInitiatedDark.matches) {
          this.html.setAttribute('data-sa11y-theme', 'dark');
          this.themeToggle.textContent = `${Lang._('ON')}`;
          this.themeToggle.setAttribute('aria-pressed', 'true');
          this.store.setItem('sa11y-remember-theme', '');
        } else {
          this.html.setAttribute('data-sa11y-theme', 'light');
          this.themeToggle.textContent = `${Lang._('OFF')}`;
          this.themeToggle.setAttribute('aria-pressed', 'false');
          this.store.setItem('sa11y-remember-theme', '');
        }
      };
      systemInitiatedDark.addEventListener('change', prefersColorTest);
      this.themeToggle.onclick = async () => {
        const theme = this.store.getItem('sa11y-remember-theme');
        if (theme === 'dark') {
          this.html.setAttribute('data-sa11y-theme', 'light');
          this.store.setItem('sa11y-remember-theme', 'light');
          this.themeToggle.textContent = `${Lang._('OFF')}`;
          this.themeToggle.setAttribute('aria-pressed', 'false');
        } else if (theme === 'light') {
          this.html.setAttribute('data-sa11y-theme', 'dark');
          this.store.setItem('sa11y-remember-theme', 'dark');
          this.themeToggle.textContent = `${Lang._('ON')}`;
          this.themeToggle.setAttribute('aria-pressed', 'true');
        } else if (systemInitiatedDark.matches) {
          this.html.setAttribute('data-sa11y-theme', 'light');
          this.store.setItem('sa11y-remember-theme', 'light');
          this.themeToggle.textContent = `${Lang._('OFF')}`;
          this.themeToggle.setAttribute('aria-pressed', 'false');
        } else {
          this.html.setAttribute('data-sa11y-theme', 'dark');
          this.store.setItem('sa11y-remember-theme', 'dark');
          this.themeToggle.textContent = `${Lang._('ON')}`;
          this.themeToggle.setAttribute('aria-pressed', 'true');
        }
      };
      const theme = this.store.getItem('sa11y-remember-theme');
      if (theme === 'dark') {
        this.html.setAttribute('data-sa11y-theme', 'dark');
        this.store.setItem('sa11y-remember-theme', 'dark');
        this.themeToggle.textContent = `${Lang._('ON')}`;
        this.themeToggle.setAttribute('aria-pressed', 'true');
      } else if (theme === 'light') {
        this.html.setAttribute('data-sa11y-theme', 'light');
        this.store.setItem('sa11y-remember-theme', 'light');
        this.themeToggle.textContent = `${Lang._('OFF')}`;
        this.themeToggle.setAttribute('aria-pressed', 'false');
      }
    };

    //----------------------------------------------------------------------
    // Tooltip for Jump-to-Issue button.
    //----------------------------------------------------------------------
    this.skipToIssueTooltip = () => {
      let keyboardShortcut;
      if (navigator.userAgent.indexOf('Mac') !== -1) {
        keyboardShortcut = '<span class="sa11y-kbd">Option</span> + <span class="sa11y-kbd">S</span>';
      } else {
        keyboardShortcut = '<span class="sa11y-kbd">Alt</span> + <span class="sa11y-kbd">S</span>';
      }

      tippy('#sa11y-skip-button', {
        content: `${Lang._('SHORTCUT_TOOLTIP')} &raquo; ${keyboardShortcut}`,
        allowHTML: true,
        delay: [500, 0],
        trigger: 'mouseenter focusin',
        arrow: true,
        placement: 'top',
        theme: 'sa11y-theme',
        maxWidth: 165,
        aria: {
          content: null,
          expanded: false,
        },
        appendTo: document.body,
        zIndex: 2147483645,
      });

      this.dismissTippy = tippy(this.restoreDismissButton, {
        delay: [500, 0],
        trigger: 'mouseenter focusin',
        arrow: true,
        placement: 'top',
        theme: 'sa11y-theme',
        maxWidth: 165,
        aria: {
          content: null,
          expanded: false,
        },
        appendTo: document.body,
        zIndex: 2147483645,
      });
    };

    //----------------------------------------------------------------------
    // Feature to detect if URL changed for bookmarklet/SPAs.
    //----------------------------------------------------------------------
    this.detectPageChanges = () => {
      // Feature to detect page changes (e.g. SPAs).
      if (option.detectSPArouting === true) {
        let url = currentPage;

        const checkURL = this.debounce(async () => {
          if (url !== currentPage) {
            // If panel is closed.
            if (this.store.getItem('sa11y-remember-panel') === 'Closed' || !this.store.getItem('sa11y-remember-panel')) {
              this.panelActive = false;
              this.checkAll();
            }
            // Async scan while panel is open.
            if (this.panelActive === true) {
              this.resetAll(false);
              await this.checkAll();
            }
            // Performance: New URL becomes current.
            url = window.location.pathname;
          }
        }, 250);
        window.addEventListener('mousemove', checkURL);
        window.addEventListener('keydown', checkURL);
      }
    };

    // ----------------------------------------------------------------------
    // Check all
    // ----------------------------------------------------------------------
    this.checkAll = async () => {
      this.results = [];
      this.headingOutline = [];
      this.errorCount = 0;
      this.warningCount = 0;

      // Find and get all dismissed elements (if not headless).
      if (option.headless === false) {
        // Get dismissed items and re-parse back into object.
        this.dismissed = this.store.getItem('sa11y-dismissed');
        this.dismissed = this.dismissed ? JSON.parse(this.dismissed) : [];

        // Get count and show dismiss panel.
        this.dismissCount = this.dismissed.filter((item) => item.href === currentPage).length;
        if (this.dismissCount) this.restoreDismissButton.classList.add('sa11y-active');
        this.dismissTooltip.innerText = Lang.sprintf('PANEL_DISMISS_BUTTON', this.dismissCount);
        this.dismissTippy.setContent(Lang.sprintf('PANEL_DISMISS_BUTTON', this.dismissCount));
      }

      // Find all elements on the page.
      this.findElements();

      // Ruleset checks
      this.checkHeaders();
      this.checkLinkText();
      this.checkImages();
      this.checkContrast();
      this.checkLabels();
      this.checkLinksAdvanced();
      this.checkReadability();
      this.checkEmbeddedContent();
      this.checkQA();

      // Custom checks abstracted to seperate class.
      if (option.customChecks && option.customChecks.setSa11y) {
        option.customChecks.check();
      }

      // Optional: Generate CSS selector path of element.
      if (option.selectorPath === true) {
        this.results.forEach(($el) => {
          if ($el.element !== undefined) {
            const path = this.generateSelectorPath($el.element);
            Object.assign($el, { cssPath: path });
          }
        });
      }

      if (option.headless === false) {
        // Return element from results array that matches dismiss key and dismiss url. Then filter through matched objects.
        const findKey = this.dismissed.map((e) => {
          const found = this.results.find((f) => (e.key.includes(f.dismiss) && e.href === currentPage));
          if (found === undefined) return '';
          return found;
        });
        this.results = this.results.filter((issue) => !findKey.find((e) => e.dismiss === issue.dismiss));

        // Count number of issues on page.
        this.updateCount();

        // Update panel
        if (this.panelActive === true) {
          // Paint the page with annotations.
          this.results.forEach(($el, i) => {
            Object.assign($el, { id: i });
            this.annotate($el.element, $el.type, $el.content, $el.inline, $el.position, $el.id);
          });
          this.initializeTooltips();
          this.generatePageOutline();
          this.updateStatus();

          // Extras.
          setTimeout(() => {
            this.detectOverflow();
            this.nudge();
          }, 0);
        } else {
          this.resetAll();
          this.updateBadge();
        }
      }
    };

    // ============================================================
    // Count number of errors and warnings on page.
    // ============================================================
    this.updateCount = () => {
      this.results.forEach(($el, i) => {
        const issue = this.results[i].type;
        if (issue === ERROR) {
          this.errorCount += 1;
        } else if (issue === WARNING) {
          this.warningCount += 1;
        }
      });
    };

    // ============================================================
    // Reset all
    // ============================================================
    this.resetAll = (restartPanel = true) => {
      this.panelActive = true;
      this.html.removeAttribute('data-sa11y-active');

      // Reset all classes on elements.
      const resetClass = ($el) => {
        $el.forEach((x) => document.querySelectorAll(`.${x}`).forEach((y) => y.classList.remove(x)));
      };
      resetClass(['sa11y-error-border', 'sa11y-error-text', 'sa11y-warning-border', 'sa11y-warning-text', 'sa11y-good-border', 'sa11y-good-text', 'sa11y-overflow']);

      // Reset all data attributes.
      const resetAttributes = ($el) => {
        $el.forEach((x) => document.querySelectorAll(`[${x}]`).forEach((y) => y.removeAttribute(x)));
      };
      resetAttributes(['data-sa11y-parent', 'data-sa11y-error', 'data-sa11y-warning', 'data-sa11y-error-inline', 'data-sa11y-warning-inline']);

      this.readabilityInfo.innerHTML = '';

      document.querySelectorAll(`
        .sa11y-element,
        .sa11y-instance,
        .sa11y-instance-inline,
        .sa11y-heading-label,
        #sa11y-outline-list li,
        .sa11y-readability-period,
        #sa11y-readability-details li,
        .sa11y-clone-image-text
      `).forEach(($el) => $el.parentNode.removeChild($el));

      // Remove any active alerts.
      this.removeAlert();

      // Remove EventListeners
      document.removeEventListener('keyup', this.shortcutAltS);

      // Main panel warning and error count.
      while (this.status.firstChild) this.status.removeChild(this.status.firstChild);

      if (restartPanel) {
        this.panel.classList.remove('sa11y-active');
      }
    };

    // ============================================================
    // Initialize tooltips for error/warning/pass buttons: (Tippy.js)
    // ============================================================
    this.initializeTooltips = () => {
      // Hide on Escape key.
      const hideOnEsc = {
        name: 'hideOnEsc',
        defaultValue: true,
        fn({ hide }) {
          const onKeyDown = (event) => { if (event.keyCode === 27) { hide(); } };
          return {
            onShow() { document.addEventListener('keydown', onKeyDown); },
            onHide() { document.removeEventListener('keydown', onKeyDown); },
          };
        },
      };
      // Main Tippy instance
      const annotations = tippy('.sa11y-btn', {
        interactive: true,
        trigger: 'mouseenter click', // Focusin trigger to ensure "Jump to issue" button displays tooltip.
        arrow: true,
        delay: [0, 400], // Slight delay to ensure mouse doesn't quickly trigger and hide tooltip.
        theme: 'sa11y-theme',
        placement: 'right-start',
        allowHTML: true,
        aria: {
          content: 'describedby',
          expanded: 'auto',
        },
        appendTo: document.body,
        zIndex: 2147483645,
        plugins: [hideOnEsc],
        onShow(instance) {
          const openedTooltip = instance.popper;
          annotations.forEach((popper) => {
            // Hide previously opened tooltip.
            if (popper !== openedTooltip) {
              popper.hide();
            }
          });

          // Close button for tooltip.
          openedTooltip.querySelector('.sa11y-close-btn').addEventListener('click', () => {
            instance.hide();
            instance.reference.focus();
          });
        },
        onTrigger(instance, event) {
          if (event.type === 'click') {
            setTimeout(() => {
              instance.popper.querySelector('.sa11y-close-btn').focus();
            }, 0);
            Sa11y.trapFocus(instance.popper);
          }
        },
        onHide(instance) {
          const openedTooltip = instance.popper;
          openedTooltip.querySelector('.sa11y-close-btn').removeEventListener('click', () => {
            instance.hide();
          });
        },
      });
    };

    // ============================================================
    // Dismiss feature.
    // ============================================================
    this.dismissAnnotations = () => {
      if (option.dismissAnnotations === true) {
        // 1) Hide annotation upon click on dismiss button on warning.
        document.addEventListener('click', async (e) => {
          // Get dismissed array from localStorage.
          let existingEntries = JSON.parse(this.store.getItem('sa11y-dismissed'));
          const element = e.target;

          // Make sure event listener is attached to dismiss button.
          if (element.tagName === 'BUTTON' && element.hasAttribute('data-sa11y-dismiss')) {
            // Find corresponding issue within main issues object and mark as dismissed.
            const dismissItem = parseInt(element.getAttribute('data-sa11y-dismiss'), 10);
            const object = this.results.find(($el) => $el.id === dismissItem);

            // If no existing entries, create empty array to iterate on.
            if (existingEntries === null) existingEntries = [];

            // Dismissal object.
            const dismissalDetails = {
              key: object.dismiss,
              href: currentPage,
            };

            const item = document.querySelector(`[data-sa11y-annotation='${object.id}']`);
            this.latestDismissed = item.getAttribute('data-sa11y-position');

            this.store.setItem('sa11y-dismiss-item', JSON.stringify(dismissalDetails));
            existingEntries.push(dismissalDetails);
            this.store.setItem('sa11y-dismissed', JSON.stringify(existingEntries));
            this.store.removeItem('sa11y-dismiss-item'); // Remove temporary storage item.
            this.restoreDismissButton.classList.add('sa11y-active'); // Make panel active.

            // Remove tooltip.
            if (element.closest('[data-tippy-root]') !== null) {
              element.closest('[data-tippy-root]').remove();
            }

            // Async scan upon dismiss.
            this.resetAll(false);
            await this.checkAll();
          }
        }, false);

        // 2) Restore hidden alerts on the CURRENT page only.
        this.restoreDismissButton.onclick = async () => {
          this.dismissTippy.hide(); // Prevent flash of tooltip.
          const filtered = this.dismissed.filter((item) => item.href !== currentPage);
          this.store.setItem('sa11y-dismissed', JSON.stringify(filtered));
          this.restoreDismissButton.classList.remove('sa11y-active');
          this.resetAll(false);
          await this.checkAll();
        };
      }
    };

    // ============================================================
    // Detect parent containers that have hidden overflow.
    // ============================================================
    this.detectOverflow = () => {
      const findParentWithOverflow = (element, property, value) => {
        let $el = element;
        while ($el !== null) {
          const style = window.getComputedStyle($el);
          const propValue = style.getPropertyValue(property);
          if (propValue === value) {
            return $el;
          }
          $el = $el.parentElement;
        }
        return null;
      };
      const annotations = document.querySelectorAll('.sa11y-btn');
      annotations.forEach(($el) => {
        const overflowing = findParentWithOverflow($el, 'overflow', 'hidden');
        if (overflowing !== null) {
          overflowing.classList.add('sa11y-overflow');
        }
      });
    };

    // ============================================================
    // Nudge buttons if they overlap.
    // ============================================================
    this.nudge = () => {
      const classes = '.sa11y-instance, .sa11y-instance-inline';
      const instance = document.querySelectorAll(classes);
      instance.forEach(($el) => {
        const sibling = $el.nextElementSibling;
        const css = 'margin: -10px -20px !important;';

        // If sibling contains any sa11y markup.
        if (sibling !== null && (sibling.classList.contains('sa11y') || sibling.hasAttribute('data-sa11y-error') || sibling.hasAttribute('data-sa11y-warning'))) {
          // Append css only if sibling is a button annotation.
          if (sibling.querySelector('.sa11y-btn') !== null) {
            sibling.querySelector('.sa11y-btn').setAttribute('style', css);
          }
        }
      });
    };

    // ============================================================
    // Update iOS style notification badge on icon.
    // ============================================================
    this.updateBadge = () => {
      const totalCount = this.errorCount + this.warningCount;
      if (totalCount === 0) {
        this.notificationBadge.style.display = 'none';
      } else if (this.warningCount > 0 && this.errorCount === 0) {
        this.notificationBadge.style.display = 'flex';
        this.notificationBadge.classList.add('sa11y-notification-badge-warning');
        this.notificationCount.innerText = `${this.warningCount}`;
        this.notificationText.innerText = `${Lang._('PANEL_ICON_WARNINGS')}`;
      } else {
        this.notificationBadge.style.display = 'flex';
        this.notificationBadge.classList.remove('sa11y-notification-badge-warning');
        this.notificationCount.innerText = `${totalCount}`;
        this.notificationText.innerText = Lang._('PANEL_ICON_TOTAL');
      }
    };

    // ----------------------------------------------------------------------
    // Main panel: Display and update panel.
    // ----------------------------------------------------------------------
    this.updateStatus = () => {
      // initialize Skip to issue toggle.
      this.skipToIssue();

      this.skipButton.disabled = false;
      this.panel.classList.add('sa11y-active');
      this.html.setAttribute('data-sa11y-active', 'true');
      this.skipButton.classList.add('sa11y-active');

      if (this.errorCount > 0 && this.warningCount > 0) {
        this.panelContent.setAttribute('class', 'sa11y-errors');
        this.status.innerHTML = `${Lang._('ERRORS')} <span class="sa11y-panel-count sa11y-margin-right">${this.errorCount}</span> ${Lang._('WARNINGS')} <span class="sa11y-panel-count" id="sa11y-warning-count">${this.warningCount}</span>`;
      } else if (this.errorCount > 0) {
        this.panelContent.setAttribute('class', 'sa11y-errors');
        this.status.innerHTML = `${Lang._('ERRORS')} <span class="sa11y-panel-count">${this.errorCount}</span>`;
      } else if (this.warningCount > 0) {
        this.panelContent.setAttribute('class', 'sa11y-warnings');
        this.status.innerHTML = `${Lang._('WARNINGS')} <span class="sa11y-panel-count" id="sa11y-warning-count">${this.warningCount}</span>`;
      } else {
        if (this.dismissCount > 0) {
          this.status.innerHTML = `${Lang._('DISMISSED')} <span class="sa11y-panel-count">${this.dismissCount}</span>`;
          this.skipButton.classList.remove('sa11y-active');
        } else {
          this.panelContent.setAttribute('class', 'sa11y-good');
          this.status.innerHTML = `${Lang._('PANEL_STATUS_NONE')}`;
        }
        // If there are no button annotations, disable the Skip-to-Toggle switch.
        const buttonAnnotations = document.querySelectorAll('.sa11y-btn');
        if (buttonAnnotations.length === 0) {
          this.skipButton.disabled = true;
        }
      }
    };

    // ----------------------------------------------------------------------
    // Main panel: Build Show Outline and Settings tabs.
    // ----------------------------------------------------------------------
    this.initializePanelToggles = () => {
      // Show outline panel
      this.outlineToggle.addEventListener('click', () => {
        if (this.outlineToggle.getAttribute('aria-expanded') === 'true') {
          this.outlineToggle.classList.remove('sa11y-outline-active');
          this.outlinePanel.classList.remove('sa11y-active');
          this.outlineToggle.textContent = `${Lang._('SHOW_OUTLINE')}`;
          this.outlineToggle.setAttribute('aria-expanded', 'false');
          this.store.setItem('sa11y-remember-outline', 'Closed');
        } else {
          this.outlineToggle.classList.add('sa11y-outline-active');
          this.outlinePanel.classList.add('sa11y-active');
          this.outlineToggle.textContent = `${Lang._('HIDE_OUTLINE')}`;
          this.outlineToggle.setAttribute('aria-expanded', 'true');
          this.store.setItem('sa11y-remember-outline', 'Opened');
        }

        // Set focus on Page Outline heading for accessibility.
        document.querySelector('#sa11y-outline-header > h2').focus();

        // Toggle visibility of heading labels.
        const $headingAnnotations = document.querySelectorAll('.sa11y-heading-label');
        $headingAnnotations.forEach(($el) => $el.classList.toggle('sa11y-label-visible'));

        // Close Settings panel when Show Outline is active.
        this.settingsPanel.classList.remove('sa11y-active');
        this.settingToggle.classList.remove('sa11y-settings-active');
        this.settingToggle.setAttribute('aria-expanded', 'false');
        this.settingToggle.textContent = `${Lang._('SHOW_SETTINGS')}`;

        // Keyboard accessibility fix for scrollable panel content.
        if (this.outlineList.clientHeight > 250) {
          this.outlineList.setAttribute('tabindex', '0');
        }
      });

      // Remember to leave outline open
      if (this.store.getItem('sa11y-remember-outline') === 'Opened') {
        this.outlineToggle.classList.add('sa11y-outline-active');
        this.outlinePanel.classList.add('sa11y-active');
        this.outlineToggle.textContent = `${Lang._('HIDE_OUTLINE')}`;
        this.outlineToggle.setAttribute('aria-expanded', 'true');
      }

      // Show settings panel
      this.settingToggle.addEventListener('click', () => {
        if (this.settingToggle.getAttribute('aria-expanded') === 'true') {
          this.settingToggle.classList.remove('sa11y-settings-active');
          this.settingsPanel.classList.remove('sa11y-active');
          this.settingToggle.textContent = `${Lang._('SHOW_SETTINGS')}`;
          this.settingToggle.setAttribute('aria-expanded', 'false');
        } else {
          this.settingToggle.classList.add('sa11y-settings-active');
          this.settingsPanel.classList.add('sa11y-active');
          this.settingToggle.textContent = `${Lang._('HIDE_SETTINGS')}`;
          this.settingToggle.setAttribute('aria-expanded', 'true');
        }

        // Set focus on Settings heading for accessibility.
        document.querySelector('#sa11y-settings-header > h2').focus();

        // Close Show Outline panel when Settings is active.
        this.outlinePanel.classList.remove('sa11y-active');
        this.outlineToggle.classList.remove('sa11y-outline-active');
        this.outlineToggle.setAttribute('aria-expanded', 'false');
        this.outlineToggle.textContent = `${Lang._('SHOW_OUTLINE')}`;
        const $headingAnnotations = document.querySelectorAll('.sa11y-heading-label');
        $headingAnnotations.forEach(($el) => $el.classList.remove('sa11y-label-visible'));
        this.store.setItem('sa11y-remember-outline', 'Closed');

        // Keyboard accessibility fix for scrollable panel content.
        if (this.settingsContent.clientHeight > 350) {
          this.settingsContent.setAttribute('tabindex', '0');
          this.settingsContent.setAttribute('aria-label', `${Lang._('SETTINGS')}`);
          this.settingsContent.setAttribute('role', 'region');
        }
      });

      // Enhanced keyboard accessibility for panel.
      this.panelControls.addEventListener('keydown', (e) => {
        const $tab = document.querySelectorAll('#sa11y-outline-toggle[role=tab], #sa11y-settings-toggle[role=tab]');
        if (e.key === 'ArrowRight') {
          for (let i = 0; i < $tab.length; i++) {
            if ($tab[i].getAttribute('aria-expanded') === 'true' || $tab[i].getAttribute('aria-expanded') === 'false') {
              $tab[i + 1].focus();
              e.preventDefault();
              break;
            }
          }
        }
        if (e.key === 'ArrowDown') {
          for (let i = 0; i < $tab.length; i++) {
            if ($tab[i].getAttribute('aria-expanded') === 'true' || $tab[i].getAttribute('aria-expanded') === 'false') {
              $tab[i + 1].focus();
              e.preventDefault();
              break;
            }
          }
        }
        if (e.key === 'ArrowLeft') {
          for (let i = $tab.length - 1; i > 0; i--) {
            if ($tab[i].getAttribute('aria-expanded') === 'true' || $tab[i].getAttribute('aria-expanded') === 'false') {
              $tab[i - 1].focus();
              e.preventDefault();
              break;
            }
          }
        }
        if (e.key === 'ArrowUp') {
          for (let i = $tab.length - 1; i > 0; i--) {
            if ($tab[i].getAttribute('aria-expanded') === 'true' || $tab[i].getAttribute('aria-expanded') === 'false') {
              $tab[i - 1].focus();
              e.preventDefault();
              break;
            }
          }
        }
      });
    };

    // ============================================================
    // Main panel: Skip to issue button.
    // ============================================================

    this.skipToIssue = () => {
      // Assign value to each annotation based on DOM order.
      const results = document.querySelectorAll('[data-sa11y-annotation]');
      results.forEach(($el, i) => {
        $el.setAttribute('data-sa11y-position', i);
      });

      const annotations = document.querySelectorAll('[data-sa11y-position]');
      const annotationsLength = annotations.length;

      let i;
      if (this.latestDismissed !== undefined) {
        // Start from last dismissed element.
        i = this.latestDismissed - 1;
      } else if (this.activeAnnotation !== undefined) {
        // Start from latest opened tooltip.
        i = this.activeAnnotation;
      } else {
        // Start from first tooltip.
        i = -1;
      }

      // Add pulsing border to visible parent of hidden element.
      const hiddenParent = () => {
        annotations.forEach(($el) => {
          const overflowing = this.findVisibleParent($el, 'display', 'none');
          if (overflowing !== null) {
            const hiddenparent = overflowing.previousElementSibling;
            if (hiddenparent) {
              this.addPulse(hiddenparent);
            } else {
              this.addPulse(overflowing.parentNode);
            }
          }
        });
      };

      // Find scroll position.
      const scrollPosition = ($el) => {
        const offsetTopPosition = $el.offsetTop;
        if (offsetTopPosition === 0) {
          const visiblePosition = this.findVisibleParent($el, 'display', 'none');

          // Alert if tooltip is hidden.
          hiddenParent();
          const tooltip = annotations[i].getAttribute('data-tippy-content');
          this.createAlert(`${Lang._('NOT_VISIBLE_ALERT')}`, tooltip);

          if (visiblePosition) {
            // Get as close to the hidden parent as possible.
            const prevSibling = visiblePosition.previousElementSibling;
            const { parentNode } = visiblePosition;
            if (prevSibling) {
              return this.offsetTop(prevSibling).top - 150;
            }
            return this.offsetTop(parentNode).top - 150;
          }
        }
        this.removeAlert();
        this.skipButton.focus();
        return this.offsetTop($el).top - 150;
      };

      // Skip to next.
      const next = () => {
        // Close whatever tooltip is open before opening up another.
        const activeButton = document.querySelector('.sa11y-btn[aria-expanded=true]');
        if (activeButton) {
          this.activeAnnotation = parseInt(activeButton.getAttribute('data-sa11y-position'), 10);
          activeButton.click();
          i = this.activeAnnotation;
        }

        i += 1;

        // Get scroll position of most visible element.
        const $el = annotations[i];
        if ($el) {
          const scrollPos = scrollPosition($el);
          window.scrollTo({
            top: scrollPos,
            behavior: `${this.scrollBehaviour}`,
          });

          // Don't set focus or activate tooltip if not visible.
          if ($el.offsetTop !== 0) {
            $el.focus();
            $el.click();
          }
        }

        // Max number of annotations on page.
        if (i >= annotationsLength - 1) {
          i = -1;
        }
      };

      // Skip to previous.
      const prev = () => {
        // Close whatever tooltip is open before opening up another.
        const activeButton = document.querySelector('.sa11y-btn[aria-expanded=true]');
        if (activeButton) {
          const pos = parseInt(activeButton.getAttribute('data-sa11y-position'), 10);
          activeButton.click();
          i = pos;
        }

        i = Math.max(0, i -= 1);
        const $el = annotations[i];
        if ($el) {
          const scrollPos = scrollPosition($el);
          window.scrollTo({
            top: scrollPos,
            behavior: `${this.scrollBehaviour}`,
          });

          // Don't set focus or activate tooltip if not visible.
          if ($el.offsetTop !== 0) {
            $el.focus();
            $el.click();
          }
        }
      };

      // Jump to issue using keyboard shortcut.
      this.shortcutAltS = (e) => {
        e.preventDefault();
        if (annotationsLength && (e.altKey && (e.code === 'Period' || e.code === 'KeyS'))) {
          next();
        } else if (annotationsLength && (e.altKey && (e.code === 'Comma' || e.code === 'KeyW'))) {
          prev();
        }
      };
      document.addEventListener('keyup', this.shortcutAltS, false);

      // Jump to issue using click.
      this.skipButton.addEventListener('click', next, false);
    };

    // ============================================================
    // Finds all elements and cache.
    // ============================================================
    this.findElements = () => {
      /**
      * Find elements.
        * @param {Selector} selector: Element you would like to find.
        * @param {String} exclude: Elements you want to ignore.
        * @param {String} rootType: Select which root to search(document/readabilityRoot/checkRoot).
        * @return {Array} Returns array of elements.
      */
      const find = (selectors, exclude, rootType) => {
        let root;
        if (rootType === 'document') {
          root = document;
        } else if (rootType === 'readability') {
          root = document.querySelector(option.readabilityRoot);
        } else {
          root = document.querySelector(option.checkRoot);
          this.root = root; // Root for custom checks.
        }
        if (!root) {
          // If custom root does not exist.
          root = document.body;
          this.root = document.body; // Root for custom checks.
          this.createAlert(`${Lang.sprintf('ERROR_MISSING_ROOT_TARGET', option.checkRoot)}`);
        }
        const exclusions = Array.from(document.querySelectorAll(exclude));
        const queryDOM = Array.from(root.querySelectorAll(selectors));
        const filtered = queryDOM.filter(($el) => !exclusions.includes($el));
        return filtered;
      };

      // Main selectors
      this.contrast = find('*', this.contrastIgnore);
      this.images = find('img', this.imageIgnore);
      this.headings = find('h1, h2, h3, h4, h5, h6, [role="heading"][aria-level]', this.headerIgnore);
      this.headingOne = find('h1, [role="heading"][aria-level="1"]', this.headerIgnore, 'document');
      this.links = find('a[href]', this.linkIgnore);
      this.readability = find('p, li', this.readabilityIgnore, 'readability');

      // Quality assurance module.
      this.paragraphs = find('p', this.containerIgnore);
      this.lists = find('li', this.containerIgnore);
      this.spans = find('span', this.containerIgnore);
      this.blockquotes = find('blockquote', this.containerIgnore);
      this.tables = find('table:not([role="presentation"])', this.containerIgnore);
      this.pdf = find('a[href$=".pdf"]', this.containerIgnore);
      this.strongitalics = find('strong, em', this.containerIgnore);
      this.inputs = find('input, select, textarea', this.containerIgnore);
      this.ids = find('[id]', this.containerIgnore, 'document');
      this.underlines = find('u', this.containerIgnore);
      this.subscripts = find('sup, sub', this.containerIgnore);
      this.labels = find('label', this.containerIgnore);
      this.language = this.html.getAttribute('lang');
      this.customErrorLinks = option.linksToFlag ? find(option.linksToFlag, this.containerIgnore) : [];

      // iFrames
      this.iframes = find('iframe, audio, video', this.containerIgnore);
      this.videos = this.iframes.filter(($el) => $el.matches(option.videoContent));
      this.audio = this.iframes.filter(($el) => $el.matches(option.audioContent));
      this.datavisualizations = this.iframes.filter(($el) => $el.matches(option.dataVizContent));
      this.embeddedContent = this.iframes.filter(($el) => !$el.matches(option.embeddedContent));
    };

    /**
     * Create Page Outline.
    */
    this.generatePageOutline = () => {
      //  Missing Heading 1 in document.body (update Page Outline).
      if (this.headingOne.length === 0) {
        const updateH1Outline = `
          <div class="sa11y-instance sa11y-missing-h1">
            <span class="sa11y-badge sa11y-error-badge"><span aria-hidden="true">!</span><span class="sa11y-visually-hidden">${ERROR}</span></span>
            <span class='sa11y-red-text sa11y-bold'>${Lang._('PANEL_HEADING_MISSING_ONE')}</span>
          </div>`;
        this.outlineHeader.insertAdjacentHTML('afterend', updateH1Outline);
      }

      // Create a single array that gets appended to heading outline, instead of creating a new HTML element everytime you iterate through each object.
      const outlineArray = [];

      // Find all dismissed headings and update headingOutline array.
      const findDismissedHeadings = this.dismissed.map((e) => {
        const found = this.headingOutline.find((f) => (e.key.includes(f.dismiss) && e.href === currentPage));
        if (found === undefined) return '';
        return found;
      });
      findDismissedHeadings.forEach(($el) => {
        Object.assign($el, { dismissedHeading: true });
      });

      // Iterate through object that contains all headings (and error type).
      this.headingOutline.forEach((obj) => {
        const $el = obj.element;
        const level = obj.headingLevel;
        const headingText = obj.text;
        const i = obj.index;
        const issue = obj.type;
        const visibility = obj.hidden;
        const parent = obj.visibleParent;
        const dismissed = obj.dismissedHeading;

        // Filter out specified headings in outlineIgnore prop.
        let ignoreArray = [];
        if (option.outlineIgnore) {
          ignoreArray = Array.from(document.querySelectorAll(this.outlineIgnore));
        }
        if (!ignoreArray.includes($el)) {
          // Indicate if heading is totally hidden or visually hidden.
          const visibleIcon = (visibility === true) ? '<span class="sa11y-hidden-icon"></span><span class="sa11y-visually-hidden">Hidden</span>' : '';
          const visibleStatus = (visibility === true) ? 'class="sa11y-hidden-h"' : '';

          let append;
          if (issue === ERROR) {
            append = `
            <li class="sa11y-outline-${level}">
              <a role="button" id="sa11y-link-${i}" tabindex="-1" ${visibleStatus}>
                <span class="sa11y-badge sa11y-error-badge">
                <span aria-hidden="true">${visibleIcon} &#33;</span>
                <span class="sa11y-visually-hidden">${Lang._('ERROR')}</span> ${level}</span>
                <strong class="sa11y-outline-list-item sa11y-red-text">${headingText}</strong>
              </a>
            </li>`;
            outlineArray.push(append);
          } else if (issue === WARNING && !dismissed) {
            append = `
            <li class="sa11y-outline-${level}">
              <a role="button" id="sa11y-link-${i}" tabindex="-1" ${visibleStatus}>
                <span class="sa11y-badge sa11y-warning-badge">
                <span aria-hidden="true">${visibleIcon} &#x3f;</span>
                <span class="sa11y-visually-hidden">${Lang._('WARNING')}</span> ${level}</span>
                <strong class="sa11y-outline-list-item sa11y-yellow-text">${headingText}</strong>
              </a>
            </li>`;
            outlineArray.push(append);
          } else {
            append = `
            <li class="sa11y-outline-${level}">
              <a role="button" id="sa11y-link-${i}" tabindex="-1" ${visibleStatus}>
                <span class="sa11y-badge">${visibleIcon} ${level}</span>
                <span class="sa11y-outline-list-item">${headingText}</span>
              </a>
            </li>`;
            outlineArray.push(append);
          }
        }

        // Append heading labels.
        // If heading is in a hidden container, place the anchor just before it's most visible parent.
        const create = document.createElement('span');
        create.classList.add('sa11y-heading-label');
        create.innerHTML = `H${level}`;

        if (parent !== null) {
          $el.insertAdjacentElement('beforeend', create);
          const hiddenParent = parent.previousElementSibling;
          const anchor = `<span class="sa11y-element" id="sa11y-h${i}"></span>`;
          if (hiddenParent) {
            hiddenParent.insertAdjacentHTML('beforebegin', anchor);
            hiddenParent.setAttribute('data-sa11y-parent', `h${i}`);
          } else {
            parent.parentNode.insertAdjacentHTML('beforebegin', anchor);
            parent.parentNode.setAttribute('data-sa11y-parent', `h${i}`);
          }
        } else {
          // If the heading isn't hidden, then append id on visible label.
          create.setAttribute('id', `sa11y-h${i}`);
          $el.insertAdjacentElement('beforeend', create);
        }

        // Make heading labels visible when panel is open.
        if (this.store.getItem('sa11y-remember-outline') === 'Opened') {
          create.classList.add('sa11y-label-visible');
        }
      });

      // Append headings to Page Outline.
      this.outlineList.innerHTML = outlineArray.join(' ');

      // Make clickable!
      setTimeout(() => {
        const children = Array.from(this.outlineList.querySelectorAll('a'));
        children.forEach(($el, i) => {
        // Make Page Outline clickable.
          const outlineLink = document.getElementById(`sa11y-link-${i}`);
          const hID = document.getElementById(`sa11y-h${i}`);
          const h = hID.parentElement;
          const hParent = document.querySelector(`[data-sa11y-parent="h${i}"]`);
          const smooth = () => hID.scrollIntoView({ behavior: `${this.scrollBehaviour}`, block: 'center' });
          const pulse = () => ((hParent !== null) ? this.addPulse(hParent) : this.addPulse(h));
          const smoothPulse = (e) => {
            if ((e.type === 'keyup' && e.code === 'Enter') || e.type === 'click') {
              smooth();
              pulse();
              if (outlineLink.classList.contains('sa11y-hidden-h')) {
                this.createAlert(`${Lang._('HEADING_NOT_VISIBLE_ALERT')}`);
              } else if (this.alertPanel.classList.contains('sa11y-active')) {
                this.removeAlert();
              }
            }
            e.preventDefault();
          };
          outlineLink.addEventListener('click', smoothPulse, false);
          outlineLink.addEventListener('keyup', smoothPulse, false);
        });

        /**
         * Roving tabindex menu for page outline.
         * Thanks to Srijan for this snippet!
         * @link https://blog.srij.dev/roving-tabindex-from-scratch
        */
        let current = 0;
        const handleKeyDown = (e) => {
          if (!['ArrowUp', 'ArrowDown', 'Space'].includes(e.code)) return;
          if (e.code === 'Space') {
            children[current].click();
            return;
          }
          const selected = children[current];
          selected.setAttribute('tabindex', -1);
          let next;
          if (e.code === 'ArrowDown') {
            next = current + 1;
            if (current === children.length - 1) {
              next = 0;
            }
          } else if ((e.code === 'ArrowUp')) {
            next = current - 1;
            if (current === 0) {
              next = children.length - 1;
            }
          }
          children[next].setAttribute('tabindex', 0);
          children[next].focus();
          current = next;
          e.preventDefault();
        };
        this.outlineList.addEventListener('focus', () => {
          if (children.length > 0) {
            this.outlineList.setAttribute('tabindex', -1);
            children[current].setAttribute('tabindex', 0);
            children[current].focus();
          }
          this.outlineList.addEventListener('keydown', handleKeyDown);
        });
        this.outlineList.addEventListener('blur', () => {
          this.outlineList.removeEventListener('keydown', handleKeyDown);
        });
      }, 0);
    };

    /**
      * Create annotation buttons.
      * @param {Node} element: The node or issue element.
      * @param {String} type: The type of issue (ERROR, WARNING, GOOD).
      * @param {String} content: The tooltip message.
      * @param {Boolean} inline: Whether the annotation should be displayed inline with text.
      * @param {String} position: Position of annotation (beforebegin, afterbegin, e.g.).
      * @param {Number} index: Index or order of issue.
    */
    this.annotate = (element, type, content, inline = false, position, index) => {
      const validTypes = [
        ERROR,
        WARNING,
        GOOD,
      ];

      if (validTypes.indexOf(type) === -1) {
        throw Error(`Invalid type [${type}] for annotation`);
      }
      // Add unique ID and styles to annotation and marked element.
      [type].forEach(($el) => {
        if ($el === ERROR && element !== undefined) {
          const errorAttr = (inline ? 'data-sa11y-error-inline' : 'data-sa11y-error');
          element.setAttribute(errorAttr, index);
        } else if ($el === WARNING) {
          const warningAttr = (inline ? 'data-sa11y-warning-inline' : 'data-sa11y-warning');
          element.setAttribute(warningAttr, index);
        }
      });

      const CSSName = {
        [validTypes[0]]: 'error',
        [validTypes[1]]: 'warning',
        [validTypes[2]]: 'good',
      };

      // Add dismiss button if prop enabled.
      const dismiss = (option.dismissAnnotations === true && CSSName[type] === 'warning') ? `<button data-sa11y-dismiss='${index}' type='button'>${Lang._('DISMISS')}</button>` : '';

      const create = document.createElement('div');

      // Full width banners.
      if (element === undefined) {
        create.setAttribute('class', `sa11y-instance sa11y-${CSSName[type]}-message-container`);
        create.innerHTML = `
          <div
            role="region"
            data-sa11y-annotation="${index}"
            tabindex="-1"
            aria-label="${[type]}"
            class="sa11y-${CSSName[type]}-message"
            lang="${Lang._('LANG_CODE')}">
              ${content}
          </div>`;
        document.body.insertAdjacentElement('afterbegin', create);
      } else {
        // Button annotations.
        create.classList.add(`${inline ? 'sa11y-instance-inline' : 'sa11y-instance'}`);
        create.innerHTML = `
        <button
          data-sa11y-annotation="${index}"
          type="button"
          aria-label="${[type]}"
          class="sa11y-btn sa11y-${CSSName[type]}-btn${inline ? '-text' : ''}"
          data-tippy-content=
            "<div lang='${Lang._('LANG_CODE')}' class='sa11y-annotation-tooltip'>
              <button class='sa11y-close-btn' aria-label='${Lang._('ALERT_CLOSE')}'></button>
              <div class='sa11y-header-text'>${[type]}</div>
                ${this.escapeHTML(content)}
                ${dismiss}
            </div>"
        ></button>`;

        // Make sure annotations always appended outside of interactive elements.
        let location = element.closest('a, button');
        if (!location) {
          location = element;
        }
        location.insertAdjacentElement(position, create);
      }
    };

    // ============================================================
    // Rulesets: Check Headings
    // ============================================================
    this.checkHeaders = () => {
      let prevLevel;
      this.headings.forEach(($el, i) => {
        const text = this.computeTextNodeWithImage($el);
        const headingText = this.sanitizeHTML(text);

        let level;
        if ($el.getAttribute('aria-level')) {
          level = +$el.getAttribute('aria-level');
        } else {
          level = +$el.tagName.slice(1);
        }
        level = parseInt(level, 10);

        const headingLength = headingText.length;
        let error = null;
        let warning = null;

        if (level - prevLevel > 1 && i !== 0) {
          if (option.nonConsecutiveHeadingIsError === true) {
            error = Lang.sprintf('HEADING_NON_CONSECUTIVE_LEVEL', prevLevel, level);
            this.results.push({
              element: $el,
              type: ERROR,
              content: error,
              inline: false,
              position: 'beforebegin',
            });
          } else {
            warning = Lang.sprintf('HEADING_NON_CONSECUTIVE_LEVEL', prevLevel, level);
            const key = this.prepareDismissal(level + headingText);
            this.results.push({
              element: $el,
              type: WARNING,
              content: warning,
              inline: false,
              position: 'beforebegin',
              dismiss: key,
            });
          }
        } else if (headingLength === 0) {
          if ($el.querySelectorAll('img').length) {
            const imgalt = $el.querySelector('img').getAttribute('alt');
            if (imgalt === null || imgalt === ' ' || imgalt === '') {
              error = Lang.sprintf('HEADING_EMPTY_WITH_IMAGE', level);
              this.results.push({
                element: $el,
                type: ERROR,
                content: error,
                inline: false,
                position: 'beforebegin',
              });
            }
          } else {
            error = Lang.sprintf('HEADING_EMPTY', level);
            this.results.push({
              element: $el,
              type: ERROR,
              content: error,
              inline: false,
              position: 'beforebegin',
            });
          }
        } else if (i === 0 && level !== 1 && level !== 2) {
          error = Lang._('HEADING_FIRST');
          this.results.push({
            element: $el,
            type: ERROR,
            content: error,
            inline: false,
            position: 'beforebegin',
          });
        } else if (headingLength > 170 && option.flagLongHeadings === true) {
          warning = Lang.sprintf('HEADING_LONG', headingLength);
          const key = this.prepareDismissal(level + headingText);
          this.results.push({
            element: $el,
            type: WARNING,
            content: warning,
            inline: false,
            position: 'beforebegin',
            dismiss: key,
          });
        }
        prevLevel = level;

        const hiddenHeading = this.isElementVisuallyHiddenOrHidden($el);
        const parent = this.findVisibleParent($el, 'display', 'none');
        // Create an object for heading outline panel.
        if (error !== null) {
          this.headingOutline.push({
            element: $el, headingLevel: level, text: headingText, index: i, type: ERROR, hidden: hiddenHeading, visibleParent: parent,
          });
        } else if (warning !== null) {
          const key = this.prepareDismissal(level + headingText);
          this.headingOutline.push({
            element: $el, headingLevel: level, text: headingText, index: i, type: WARNING, hidden: hiddenHeading, visibleParent: parent, dismiss: key,
          });
        } else if (error === null || warning === null) {
          this.headingOutline.push({
            element: $el, headingLevel: level, text: headingText, index: i, hidden: hiddenHeading, visibleParent: parent,
          });
        }
      });
      // Missing Heading 1
      if (this.headingOne.length === 0) {
        this.results.push({
          type: ERROR,
          content: Lang.sprintf('HEADING_MISSING_ONE'),
        });
      }
    };

    // ============================================================
    // Rulesets: Link text
    // ============================================================
    this.checkLinkText = () => {
      const containsLinkTextStopWords = (textContent) => {
        const urlText = [
          'http',
          '.asp',
          '.htm',
          '.php',
          '.edu/',
          '.com/',
          '.net/',
          '.org/',
          '.us/',
          '.ca/',
          '.de/',
          '.icu/',
          '.uk/',
          '.ru/',
          '.info/',
          '.top/',
          '.xyz/',
          '.tk/',
          '.cn/',
          '.ga/',
          '.cf/',
          '.nl/',
          '.io/',
          '.fr/',
          '.pe/',
          '.nz/',
          '.pt/',
          '.es/',
          '.pl/',
          '.ua/',
        ];

        const hit = [null, null, null];

        // Flag partial stop words.
        Lang._('PARTIAL_ALT_STOPWORDS').forEach((word) => {
          if (
            textContent.length === word.length && textContent.toLowerCase().indexOf(word) >= 0
          ) {
            hit[0] = word;
          }
          return false;
        });

        // Other warnings we want to add.
        Lang._('WARNING_ALT_STOPWORDS').forEach((word) => {
          if (textContent.toLowerCase().indexOf(word) >= 0) {
            hit[1] = word;
          }
          return false;
        });

        // Flag link text containing URLs.
        urlText.forEach((word) => {
          if (textContent.toLowerCase().indexOf(word) >= 0) {
            hit[2] = word;
          }
          return false;
        });
        return hit;
      };

      this.links.forEach(($el) => {
        let linkText = this.computeAriaLabel($el);
        const hasAriaLabelledBy = $el.getAttribute('aria-labelledby');
        const hasAriaLabel = $el.getAttribute('aria-label');
        let childAriaLabelledBy = null;
        let childAriaLabel = null;
        const hasTitle = $el.getAttribute('title');

        if ($el.children.length) {
          const $firstChild = $el.children[0];
          childAriaLabelledBy = $firstChild.getAttribute('aria-labelledby');
          childAriaLabel = $firstChild.getAttribute('aria-label');
        }

        if (linkText === 'noAria') {
          // Plain text content.
          linkText = this.getText($el);
          const $img = $el.querySelector('img');

          // If an image exists within the link. Help with AccName computation.
          if ($img) {
            // Check if there's aria on the image.
            const imgText = this.computeAriaLabel($img);
            if (imgText !== 'noAria') {
              linkText += imgText;
            } else {
              // No aria? Process alt on image.
              linkText += $img ? ($img.getAttribute('alt') || '') : '';
            }
          }
        }

        const error = containsLinkTextStopWords(this.fnIgnore($el, option.linkIgnoreSpan).textContent.replace(/[!*?↣↳→↓»↴]/g, '').trim());

        if ($el.querySelectorAll('img').length) {
          // Do nothing. Don't overlap with Alt Text module.
        } else if ($el.getAttribute('href') && !linkText) {
          // Flag empty hyperlinks.
          if ($el && hasTitle) {
            // If empty but has title attribute.
          } else if ($el.children.length) {
            // Has child elements (e.g. SVG or SPAN) <a><i></i></a>
            this.results.push({
              element: $el,
              type: ERROR,
              content: Lang.sprintf('LINK_EMPTY_LINK_NO_LABEL'),
              inline: true,
              position: 'afterend',
            });
          } else {
            // Completely empty <a></a>
            this.results.push({
              element: $el,
              type: ERROR,
              content: Lang.sprintf('LINK_EMPTY'),
              inline: true,
              position: 'afterend',
            });
          }
        } else if (error[0] != null) {
          // Contains stop words.
          if (hasAriaLabelledBy || hasAriaLabel || childAriaLabelledBy || childAriaLabel) {
            if (option.showGoodLinkButton === true) {
              this.results.push({
                element: $el,
                type: GOOD,
                content: Lang.sprintf('LINK_LABEL', linkText),
                inline: true,
                position: 'afterend',
              });
            }
          } else if ($el.getAttribute('aria-hidden') === 'true' && $el.getAttribute('tabindex') === '-1') {
            // Do nothing.
          } else {
            this.results.push({
              element: $el,
              type: ERROR,
              content: Lang.sprintf('LINK_STOPWORD', error[0]),
              inline: true,
              position: 'afterend',
            });
          }
        } else if (error[1] != null) {
          const key = this.prepareDismissal(`link: ${linkText} ${error[1]}`);
          // Contains warning words.
          this.results.push({
            element: $el,
            type: WARNING,
            content: Lang.sprintf('LINK_BEST_PRACTICES', error[1]),
            inline: true,
            position: 'beforebegin',
            dismiss: key,
          });
        } else if (error[2] != null) {
          const key = this.prepareDismissal(`link: ${linkText} ${error[2]}`);
          // Contains URL in link text.
          if (linkText.length > 40) {
            this.results.push({
              element: $el,
              type: WARNING,
              content: Lang.sprintf('LINK_URL'),
              inline: true,
              position: 'beforebegin',
              dismiss: key,
            });
          }
        } else if (hasAriaLabelledBy || hasAriaLabel || childAriaLabelledBy || childAriaLabel) {
          // If the link has any ARIA, append a "Good" link button.
          if (option.showGoodLinkButton === true) {
            this.results.push({
              element: $el,
              type: GOOD,
              content: Lang.sprintf('LINK_LABEL', linkText),
              inline: true,
              position: 'afterend',
            });
          }
        }
      });
    };

    // ============================================================
    // Rulesets: Links (Advanced)
    // ============================================================
    this.checkLinksAdvanced = () => {
      if (option.linksAdvancedPlugin === true) {
        if (this.store.getItem('sa11y-remember-links-advanced') === 'On' || option.headless === true) {
          const seen = {};
          this.links.forEach(($el) => {
            let linkText = this.computeAriaLabel($el);
            const $img = $el.querySelector('img');

            if (linkText === 'noAria') {
              // Plain text content.
              linkText = this.getText($el);

              // If an image exists within the link.
              if ($img) {
                // Check if there's aria on the image.
                const imgText = this.computeAriaLabel($img);
                if (imgText !== 'noAria') {
                  linkText += imgText;
                } else {
                  // No aria? Process alt on image.
                  linkText += $img ? ($img.getAttribute('alt') || '') : '';
                }
              }
            }

            // Remove whitespace, special characters, etc.
            const linkTextTrimmed = linkText.replace(/'|"|-|\.|\s+/g, '').toLowerCase();

            // Links with identical accessible names have equivalent purpose.
            const href = $el.getAttribute('href');

            if (linkText.length !== 0) {
              if (seen[linkTextTrimmed] && linkTextTrimmed.length !== 0) {
                if (seen[href]) {
                  // Nothing
                } else {
                  const key = this.prepareDismissal(`link: ${linkTextTrimmed}`);
                  this.results.push({
                    element: $el,
                    type: WARNING,
                    content: Lang.sprintf('LINK_IDENTICAL_NAME', linkText),
                    inline: true,
                    position: 'beforebegin',
                    dismiss: key,
                  });
                }
              } else {
                seen[linkTextTrimmed] = true;
                seen[href] = true;
              }
            }

            // New tab or new window.
            const containsNewWindowPhrases = Lang._('NEW_WINDOW_PHRASES').some((pass) => {
              if (linkText.trim().length === 0 && !!$el.getAttribute('title')) {
                linkText = $el.getAttribute('title');
              }
              return linkText.toLowerCase().indexOf(pass) >= 0;
            });

            // Link that points to a file type indicates that it does.
            const containsFileTypePhrases = Lang._('FILE_TYPE_PHRASES').some((pass) => linkText.toLowerCase().indexOf(pass) >= 0);

            const fileTypeMatch = $el.matches(`
              a[href$='.pdf'],
              a[href$='.doc'],
              a[href$='.docx'],
              a[href$='.zip'],
              a[href$='.mp3'],
              a[href$='.txt'],
              a[href$='.exe'],
              a[href$='.dmg'],
              a[href$='.rtf'],
              a[href$='.pptx'],
              a[href$='.ppt'],
              a[href$='.xls'],
              a[href$='.xlsx'],
              a[href$='.csv'],
              a[href$='.mp4'],
              a[href$='.mov'],
              a[href$='.avi']
            `);

            if (linkTextTrimmed.length !== 0 && $el.getAttribute('target') === '_blank' && !fileTypeMatch && !containsNewWindowPhrases) {
              const key = this.prepareDismissal(`link: ${linkTextTrimmed}`);
              this.results.push({
                element: $el,
                type: WARNING,
                content: Lang.sprintf('NEW_TAB_WARNING'),
                inline: true,
                position: 'beforebegin',
                dismiss: key,
              });
            }

            if (linkTextTrimmed.length !== 0 && fileTypeMatch && !containsFileTypePhrases) {
              const key = this.prepareDismissal(`link: ${linkTextTrimmed}`);
              this.results.push({
                element: $el,
                type: WARNING,
                content: Lang.sprintf('FILE_TYPE_WARNING'),
                inline: true,
                position: 'beforebegin',
                dismiss: key,
              });
            }
          });
        }
      } else {
        // Hide Links Advanced toggle if prop is set to false.
        this.linksAdvacedItem.setAttribute('style', 'display: none !important;');
        this.store.setItem('sa11y-remember-links-advanced', 'Off');
      }
    };

    // ============================================================
    // Ruleset: Alternative text
    // ============================================================
    this.checkImages = () => {
      this.containsAltTextStopWords = (alt) => {
        const altUrl = [
          '.png',
          '.jpg',
          '.jpeg',
          '.webp',
          '.gif',
          '.tiff',
          '.svg',
        ];

        const hit = [null, null, null];
        altUrl.forEach((word) => {
          if (alt.toLowerCase().indexOf(word) >= 0) {
            hit[0] = word;
          }
        });
        Lang._('SUSPICIOUS_ALT_STOPWORDS').forEach((word) => {
          if (alt.toLowerCase().indexOf(word) >= 0) {
            hit[1] = word;
          }
        });
        Lang._('PLACEHOLDER_ALT_STOPWORDS').forEach((word) => {
          if (alt.length === word.length && alt.toLowerCase().indexOf(word) >= 0) {
            hit[2] = word;
          }
        });
        return hit;
      };

      this.images.forEach(($el) => {
        const alt = $el.getAttribute('alt');
        if (alt === null) {
          if ($el.closest('a[href]')) {
            if (this.fnIgnore($el.closest('a[href]'), 'noscript').textContent.trim().length >= 1) {
              this.results.push({
                element: $el,
                type: ERROR,
                content: Lang.sprintf('MISSING_ALT_LINK_BUT_HAS_TEXT_MESSAGE'),
                inline: false,
                position: 'beforebegin',
              });
            } else if (this.fnIgnore($el.closest('a[href]'), 'noscript').textContent.trim().length === 0) {
              this.results.push({
                element: $el,
                type: ERROR,
                content: Lang.sprintf('MISSING_ALT_LINK_MESSAGE'),
                inline: false,
                position: 'beforebegin',
              });
            }
          } else {
            // General failure message if image is missing alt.
            this.results.push({
              element: $el,
              type: ERROR,
              content: Lang.sprintf('MISSING_ALT_MESSAGE'),
              inline: false,
              position: 'beforebegin',
            });
          }
        } else {
          // If alt attribute is present, further tests are done.
          const altText = this.sanitizeHTML(alt); // Prevent tooltip from breaking.
          const error = this.containsAltTextStopWords(altText);
          const altLength = alt.length;
          const baseSrc = $el.getAttribute('src').split('?')[0];

          if ($el.closest('a[href]') && $el.closest('a[href]').getAttribute('tabindex') === '-1' && $el.closest('a[href]').getAttribute('aria-hidden') === 'true') {
            // Do nothing if link has aria-hidden and negative tabindex.
          } else if (error[0] !== null && $el.closest('a[href]')) {
            // Image fails if a stop word was found.
            this.results.push({
              element: $el,
              type: ERROR,
              content: Lang.sprintf('LINK_IMAGE_BAD_ALT_MESSAGE', error[0], altText),
              inline: false,
              position: 'beforebegin',
            });
          } else if (error[2] !== null && $el.closest('a[href]')) {
            this.results.push({
              element: $el,
              type: ERROR,
              content: Lang.sprintf('LINK_IMAGE_PLACEHOLDER_ALT_MESSAGE', altText),
              inline: false,
              position: 'beforebegin',
            });
          } else if (error[1] !== null && $el.closest('a[href]')) {
            const key = this.prepareDismissal(`link: ${baseSrc} ${altText} ${error[1]}`);
            this.results.push({
              element: $el,
              type: WARNING,
              content: Lang.sprintf('LINK_IMAGE_SUS_ALT_MESSAGE', error[1], altText),
              inline: false,
              position: 'beforebegin',
              dismiss: key,
            });
          } else if (error[0] !== null) {
            this.results.push({
              element: $el,
              type: ERROR,
              content: Lang.sprintf('LINK_ALT_HAS_BAD_WORD_MESSAGE', error[0], altText),
              inline: false,
              position: 'beforebegin',
            });
          } else if (error[2] !== null) {
            this.results.push({
              element: $el,
              type: ERROR,
              content: Lang.sprintf('ALT_PLACEHOLDER_MESSAGE', altText),
              inline: false,
              position: 'beforebegin',
            });
          } else if (error[1] !== null) {
            const key = this.prepareDismissal(baseSrc + altText + error[1]);
            this.results.push({
              element: $el,
              type: WARNING,
              content: Lang.sprintf('ALT_HAS_SUS_WORD', error[1], altText),
              inline: false,
              position: 'beforebegin',
              dismiss: key,
            });
          } else if ((alt === '' || alt === ' ') && $el.closest('a[href]')) {
            if ($el.closest('a[href]').getAttribute('tabindex') === '-1' && $el.closest('a[href]').getAttribute('aria-hidden') === 'true') {
              // Do nothing.
            } else if ($el.closest('a[href]').getAttribute('aria-hidden') === 'true') {
              this.results.push({
                element: $el,
                type: ERROR,
                content: Lang.sprintf('LINK_IMAGE_ARIA_HIDDEN'),
                inline: false,
                position: 'beforebegin',
              });
            } else if (this.fnIgnore($el.closest('a[href]'), 'noscript').textContent.trim().length === 0) {
              this.results.push({
                element: $el,
                type: ERROR,
                content: Lang.sprintf('LINK_IMAGE_NO_ALT_TEXT'),
                inline: false,
                position: 'beforebegin',
              });
            } else {
              this.results.push({
                element: $el,
                type: GOOD,
                content: Lang.sprintf('LINK_IMAGE_HAS_TEXT'),
                inline: false,
                position: 'beforebegin',
              });
            }
          } else if (alt.length > 250 && $el.closest('a[href]')) {
            const key = this.prepareDismissal(baseSrc + altText + alt.length);
            // Link and contains alt text.
            this.results.push({
              element: $el,
              type: WARNING,
              content: Lang.sprintf('LINK_IMAGE_LONG_ALT', altLength, altText),
              inline: false,
              position: 'beforebegin',
              dismiss: key,
            });
          } else if (alt !== '' && $el.closest('a[href]') && this.fnIgnore($el.closest('a[href]'), 'noscript').textContent.trim().length === 0) {
            const key = this.prepareDismissal(`image link: ${baseSrc} ${altText}`);
            // Link and contains an alt text.
            this.results.push({
              element: $el,
              type: WARNING,
              content: Lang.sprintf('LINK_IMAGE_ALT_WARNING', altText),
              inline: false,
              position: 'beforebegin',
              dismiss: key,
            });
          } else if (alt !== '' && $el.closest('a[href]') && this.fnIgnore($el.closest('a[href]'), 'noscript').textContent.trim().length >= 1) {
            const key = this.prepareDismissal(`image link: ${baseSrc} ${altText}`);
            // Contains alt text & surrounding link text.
            this.results.push({
              element: $el,
              type: WARNING,
              content: Lang.sprintf('LINK_IMAGE_ALT_AND_TEXT_WARNING', altText),
              inline: false,
              position: 'beforebegin',
              dismiss: key,
            });
          } else if (alt === '' || alt === ' ') {
            // Decorative alt and not a link.
            if ($el.closest('figure')) {
              const figcaption = $el.closest('figure').querySelector('figcaption');
              if (figcaption !== null && figcaption.textContent.trim().length >= 1) {
                const key = this.prepareDismissal(`decorative: ${baseSrc}`);
                this.results.push({
                  element: $el,
                  type: WARNING,
                  content: Lang.sprintf('IMAGE_FIGURE_DECORATIVE'),
                  inline: false,
                  position: 'beforebegin',
                  dismiss: key,
                });
              } else {
                const key = this.prepareDismissal(`decorative: ${baseSrc}`);
                this.results.push({
                  element: $el,
                  type: WARNING,
                  content: Lang.sprintf('IMAGE_DECORATIVE'),
                  inline: false,
                  position: 'beforebegin',
                  dismiss: key,
                });
              }
            } else {
              const key = this.prepareDismissal(`decorative: ${baseSrc}`);
              this.results.push({
                element: $el,
                type: WARNING,
                content: Lang.sprintf('IMAGE_DECORATIVE'),
                inline: false,
                position: 'beforebegin',
                dismiss: key,
              });
            }
          } else if (alt.length > 250) {
            const key = this.prepareDismissal(baseSrc + altText + alt.length);
            this.results.push({
              element: $el,
              type: WARNING,
              content: Lang.sprintf('IMAGE_ALT_TOO_LONG', altLength, altText),
              inline: false,
              position: 'beforebegin',
              dismiss: key,
            });
          } else if (alt !== '') {
            // Figure element has same alt and caption text.
            if ($el.closest('figure')) {
              const figcaption = $el.closest('figure').querySelector('figcaption');
              if (!!figcaption
                && (figcaption.textContent.trim().toLowerCase() === altText.trim().toLowerCase())) {
                const key = this.prepareDismissal(`figure: ${baseSrc} ${altText}`);
                this.results.push({
                  element: $el,
                  type: WARNING,
                  content: Lang.sprintf('IMAGE_FIGURE_DUPLICATE_ALT', altText),
                  inline: false,
                  position: 'beforebegin',
                  dismiss: key,
                });
              } else {
                this.results.push({
                  element: $el,
                  type: GOOD,
                  content: Lang.sprintf('IMAGE_PASS', altText),
                  inline: false,
                  position: 'beforebegin',
                });
              }
            } else {
              // If image has alt text - pass!
              this.results.push({
                element: $el,
                type: GOOD,
                content: Lang.sprintf('IMAGE_PASS', altText),
                inline: false,
                position: 'beforebegin',
              });
            }
          }
        }
      });
    };

    // ============================================================
    // Rulesets: Labels
    // ============================================================
    this.checkLabels = () => {
      if (option.formLabelsPlugin === true) {
        if (this.store.getItem('sa11y-remember-labels') === 'On' || option.headless === true) {
          this.inputs.forEach(($el) => {
            // Ignore hidden inputs.
            if (this.isElementHidden($el) !== true) {
              let ariaLabel = this.computeAriaLabel($el);
              const type = $el.getAttribute('type');
              const tabindex = $el.getAttribute('tabindex');

              // If button type is submit or button: pass
              if (type === 'submit' || type === 'button' || type === 'hidden' || tabindex === '-1') {
                // Do nothing
              } else if (type === 'image') {
                // Inputs where type="image".
                const imgalt = $el.getAttribute('alt');
                if (!imgalt || imgalt === ' ') {
                  if ($el.getAttribute('aria-label')) {
                    // Good.
                  } else {
                    this.results.push({
                      element: $el,
                      type: ERROR,
                      content: Lang.sprintf('LABELS_MISSING_IMAGE_INPUT_MESSAGE'),
                      inline: false,
                      position: 'beforebegin',
                    });
                  }
                }
              } else if (type === 'reset') {
                // Recommendation to remove reset buttons.
                const key = this.prepareDismissal(`input: ${ariaLabel}`);
                this.results.push({
                  element: $el,
                  type: WARNING,
                  content: Lang.sprintf('LABELS_INPUT_RESET_MESSAGE'),
                  inline: false,
                  position: 'beforebegin',
                  dismiss: key,
                });
              } else if ($el.getAttribute('aria-label') || $el.getAttribute('aria-labelledby') || $el.getAttribute('title')) {
                // Uses ARIA. Warn them to ensure there's a visible label.
                if ($el.getAttribute('title')) {
                  ariaLabel = $el.getAttribute('title');
                  const key = this.prepareDismissal(`input: ${ariaLabel}`);
                  this.results.push({
                    element: $el,
                    type: WARNING,
                    content: Lang.sprintf('LABELS_ARIA_LABEL_INPUT_MESSAGE', ariaLabel),
                    inline: false,
                    position: 'beforebegin',
                    dismiss: key,
                  });
                } else {
                  const key = this.prepareDismissal(`input: ${ariaLabel}`);
                  this.results.push({
                    element: $el,
                    type: WARNING,
                    content: Lang.sprintf('LABELS_ARIA_LABEL_INPUT_MESSAGE', ariaLabel),
                    inline: false,
                    position: 'beforebegin',
                    dismiss: key,
                  });
                }
              } else if ($el.closest('label') && $el.closest('label').textContent.trim()) {
                // Implicit labels.
                // Do nothing if label has text.
              } else if ($el.getAttribute('id')) {
                // Has an ID but doesn't have a matching FOR attribute.
                let hasFor = false;

                this.labels.forEach(($l) => {
                  if (hasFor) return;
                  if ($l.getAttribute('for') === $el.getAttribute('id')) {
                    hasFor = true;
                  }
                });

                if (!hasFor) {
                  const id = $el.getAttribute('id');
                  this.results.push({
                    element: $el,
                    type: ERROR,
                    content: Lang.sprintf('LABELS_NO_FOR_ATTRIBUTE_MESSAGE', id),
                    inline: false,
                    position: 'beforebegin',
                  });
                }
              } else {
                this.results.push({
                  element: $el,
                  type: ERROR,
                  content: Lang.sprintf('LABELS_MISSING_LABEL_MESSAGE'),
                  inline: false,
                  position: 'beforebegin',
                });
              }
            }
          });
        }
      } else {
        // Turn off Form Labels plugin if prop is set to false.
        this.formLabelsItem.setAttribute('style', 'display: none !important;');
        this.store.setItem('sa11y-remember-labels', 'Off');
      }
    };

    // ============================================================
    // Rulesets: Embedded content.
    // ============================================================
    this.checkEmbeddedContent = () => {
      if (option.embeddedContentAll === true) {
        // Warning: Audio content.
        if (option.embeddedContentAudio === true) {
          this.audio.forEach(($el) => {
            const key = this.prepareDismissal($el.getAttribute('src') !== 'undefined' ? $el.getAttribute('src') : $el.querySelector('[src]').getAttribute('src'));
            this.results.push({
              element: $el,
              type: WARNING,
              content: Lang.sprintf('EMBED_AUDIO'),
              inline: false,
              position: 'beforebegin',
              dismiss: key,
            });
          });
        }

        // Warning: Video content.
        if (option.embeddedContentVideo === true) {
          this.videos.forEach(($el) => {
            const track = $el.getElementsByTagName('TRACK');
            if ($el.tagName === 'VIDEO' && track.length) {
            // Pass if track element found.
            } else {
              const key = this.prepareDismissal($el.getAttribute('src') !== 'undefined' ? $el.getAttribute('src') : $el.querySelector('[src]').getAttribute('src'));
              this.results.push({
                element: $el,
                type: WARNING,
                content: Lang.sprintf('EMBED_VIDEO'),
                inline: false,
                position: 'beforebegin',
                dismiss: key,
              });
            }
          });
        }

        // Warning: Data visualizations.
        if (option.embeddedContentDataViz === true) {
          this.datavisualizations.forEach(($el) => {
            const key = this.prepareDismissal($el.getAttribute('src') !== 'undefined' ? $el.getAttribute('src') : $el.querySelector('[src]').getAttribute('src'));
            this.results.push({
              element: $el,
              type: WARNING,
              content: Lang.sprintf('EMBED_DATA_VIZ'),
              inline: false,
              position: 'beforebegin',
              dismiss: key,
            });
          });
        }

        // Error: iFrame is missing accessible name.
        if (option.embeddedContentTitles === true) {
          this.iframes.forEach(($el) => {
            if ($el.tagName === 'VIDEO'
              || $el.tagName === 'AUDIO'
              || $el.getAttribute('aria-hidden') === 'true'
              || $el.getAttribute('hidden') !== null
              || $el.style.display === 'none'
              || $el.getAttribute('role') === 'presentation') {
            // Ignore if hidden.
            } else if ($el.getAttribute('title') === null || $el.getAttribute('title') === '') {
              if ($el.getAttribute('aria-label') === null || $el.getAttribute('aria-label') === '') {
                if ($el.getAttribute('aria-labelledby') === null) {
                  // TO-DO: Make sure red error border takes precedence
                  if ($el.classList.contains('sa11y-warning-border')) {
                    $el.classList.remove('sa11y-warning-border');
                  }
                  this.results.push({
                    element: $el,
                    type: ERROR,
                    content: Lang.sprintf('EMBED_MISSING_TITLE'),
                    inline: false,
                    position: 'beforebegin',
                  });
                }
              }
            } else {
            // Nothing
            }
          });
        }

        // Warning: general warning for iFrames
        if (option.embeddedContentGeneral === true) {
          this.embeddedContent.forEach(($el) => {
            if ($el.tagName === 'VIDEO'
              || $el.tagName === 'AUDIO'
              || $el.getAttribute('aria-hidden') === 'true'
              || $el.getAttribute('hidden') !== null
              || $el.style.display === 'none'
              || $el.getAttribute('role') === 'presentation'
              || $el.getAttribute('tabindex') === '-1') {
            // Ignore if hidden.
            } else {
              const key = this.prepareDismissal($el.getAttribute('src') !== 'undefined' ? $el.getAttribute('src') : $el.querySelector('[src]').getAttribute('src'));
              this.results.push({
                element: $el,
                type: WARNING,
                content: Lang.sprintf('EMBED_GENERAL_WARNING'),
                inline: false,
                position: 'beforebegin',
                dismiss: key,
              });
            }
          });
        }
      }
    };

    /**
     * Rulesets: Quality assurance (QA) checks.
    */
    this.checkQA = () => {
      // Error: Find all links pointing to development environment.
      if (option.badLinksQA === true) {
        this.customErrorLinks.forEach(($el) => {
          this.results.push({
            element: $el,
            type: ERROR,
            content: Lang.sprintf('QA_BAD_LINK', $el),
            inline: true,
            position: 'beforebegin',
          });
        });
      }

      // Warning: Excessive bolding or italics.
      if (option.strongItalicsQA === true) {
        this.strongitalics.forEach(($el) => {
          const strongItalicsText = $el.textContent.trim().length;
          const key = this.prepareDismissal($el.tagName + $el.textContent);
          if (strongItalicsText > 400) {
            this.results.push({
              element: $el.parentNode,
              type: WARNING,
              content: Lang.sprintf('QA_BAD_ITALICS'),
              inline: false,
              position: 'beforebegin',
              dismiss: key,
            });
          }
        });
      }

      // Warning: Find all PDFs.
      if (option.pdfQA === true) {
        this.pdf.forEach(($el, i) => {
          const pdfCount = this.pdf.length;
          const href = $el.getAttribute('href');
          const key = this.prepareDismissal(`pdf: ${href}`);

          // Highlight PDFs that are not dismissed.
          if (pdfCount && this.dismissed !== undefined && !this.dismissed.filter((e) => e.key === key).length) {
            $el.setAttribute('data-sa11y-warning-inline', 'pdf');
          }

          // Only append warning button to first PDF.
          if ($el && i === 0) {
            this.results.push({
              element: $el,
              type: WARNING,
              content: Lang.sprintf('QA_PDF', pdfCount),
              inline: true,
              position: 'beforebegin',
              dismiss: key,
            });
          }
        });
      }

      // Error: Missing language tag. Lang should be at least 2 characters.
      if (option.langQA === true) {
        if (!this.language || this.language.length < 2) {
          this.results.push({
            type: ERROR,
            content: Lang.sprintf('QA_PAGE_LANGUAGE'),
          });
        }
      }

      // Warning: Find blockquotes used as headers.
      if (option.blockquotesQA === true) {
        this.blockquotes.forEach(($el) => {
          const bqHeadingText = $el.textContent;
          if (bqHeadingText.trim().length < 25) {
            const key = this.prepareDismissal(`${$el.tagName}: ${bqHeadingText}`);
            this.results.push({
              element: $el,
              type: WARNING,
              content: Lang.sprintf('QA_BLOCKQUOTE_MESSAGE', bqHeadingText),
              inline: false,
              position: 'beforebegin',
              dismiss: key,
            });
          }
        });
      }

      // Tables check.
      if (option.tablesQA === true) {
        this.tables.forEach(($el) => {
          const findTHeaders = $el.querySelectorAll('th');
          const findHeadingTags = $el.querySelectorAll('h1, h2, h3, h4, h5, h6');
          if (findTHeaders.length === 0) {
            this.results.push({
              element: $el,
              type: ERROR,
              content: Lang.sprintf('TABLES_MISSING_HEADINGS'),
              inline: false,
              position: 'beforebegin',
            });
          }
          if (findHeadingTags.length > 0) {
            findHeadingTags.forEach(($a) => {
              this.results.push({
                element: $a,
                type: ERROR,
                content: Lang.sprintf('TABLES_SEMANTIC_HEADING'),
                inline: false,
                position: 'beforebegin',
              });
            });
          }
          findTHeaders.forEach(($b) => {
            if ($b.textContent.trim().length === 0) {
              this.results.push({
                element: $b,
                type: ERROR,
                content: Lang.sprintf('TABLES_EMPTY_HEADING'),
                inline: false,
                position: 'afterbegin',
              });
            }
          });
        });
      }

      /* Warning: Detect fake headings.
        To prevent excessive warnings:
        1) Parent element must not be a heading, blockquote, or table.
        2) Must be between 4 and 120 characters (typical heading length).
        3) Doesn't contain the following characters: .;?! (assuming it's a sentence)
        4) The previous element is not a semantic heading.
      */
      if (option.fakeHeadingsQA === true) {
        this.paragraphs.forEach(($el) => {
          const brAfter = $el.innerHTML.indexOf('</strong><br>');
          const brBefore = $el.innerHTML.indexOf('<br></strong>');
          const ignoreElements = 'h1, h2, h3, h4, h5, h6, [role="heading"][aria-level], blockquote';
          const ignoreParents = ignoreElements.concat(', table');
          const getTexted = this.getText($el);
          let boldtext;

          // Check paragraphs greater than x characters.
          if ($el && getTexted.length >= 300) {
            const { firstChild } = $el;

            // If paragraph starts with <strong> tag and ends with <br>.
            if (firstChild.tagName === 'STRONG' && (brBefore !== -1 || brAfter !== -1)) {
              boldtext = this.getText(firstChild);
              const maybeSentence = boldtext.match(/[.;?!"]/) !== null;

              if (
                !/[*]$/.test(boldtext)
                && !$el.closest(ignoreParents)
                && (boldtext.length >= 4 && boldtext.length <= 120)
                && maybeSentence === false
              ) {
                const key = this.prepareDismissal(`bold: ${boldtext}`);
                this.results.push({
                  element: firstChild,
                  type: WARNING,
                  content: Lang.sprintf('QA_FAKE_HEADING', boldtext),
                  inline: false,
                  position: 'beforebegin',
                  dismiss: key,
                });
              }
            }
          }

          // If paragraph only contains <p><strong>...</strong></p>.
          if (/^<(strong)>.+<\/\1>$/.test($el.innerHTML.trim())) {
            boldtext = getTexted;
            const prevSibling = $el.previousElementSibling;
            const maybeSentence = boldtext.match(/[.;?!"]/) !== null;
            if (prevSibling !== null && prevSibling.matches(ignoreElements)) {
              // If previous element is a heading, do nothing.
            } else if (
              !/[*]$/.test(boldtext)
              && (boldtext.length >= 4 && boldtext.length <= 120)
              && !$el.closest(ignoreParents)
              && maybeSentence === false
            ) {
              const key = this.prepareDismissal(`bold: ${boldtext}`);
              this.results.push({
                element: $el,
                type: WARNING,
                content: Lang.sprintf('QA_FAKE_HEADING', boldtext),
                inline: false,
                position: 'beforebegin',
                dismiss: key,
              });
            }
          }

          // Find pretend paragraph headings
          const computeLargeParagraphs = ($elem) => {
            const size = getComputedStyle($elem).fontSize.replace('px', '');
            const ignore = 'h1, h2, h3, h4, h5, h6, [role="heading"][aria-level], blockquote';
            const getText = this.getText($elem);
            const prevSibling = $elem.previousElementSibling;
            const maybeSentence = getText.match(/[.;?!"]/) !== null;

            if (prevSibling !== null && prevSibling.matches(ignore)) {
              // Nothing
            } else if (
              size >= 24
              && !$elem.closest(ignore)
              && (getText.length >= 4 && getText.length <= 120)
              && maybeSentence === false
            ) {
              const key = this.prepareDismissal(`bold: ${getText}`);
              this.results.push({
                element: $elem,
                type: WARNING,
                content: Lang.sprintf('QA_FAKE_HEADING', getText),
                inline: false,
                position: 'beforebegin',
                dismiss: key,
              });
            }
          };
          computeLargeParagraphs($el);
        });
      }

      // Warning: Detect paragraphs that should be lists.
      // Thanks to John Jameson from PrincetonU for this ruleset!
      if (option.fakeListQA === true) {
        this.paragraphs.forEach(($el) => {
          let activeMatch = '';
          const prefixDecrement = {
            b: 'a',
            B: 'A',
            2: '1',
            б: 'а',
            Б: 'А',
          };
          const prefixMatch = /a\.|a\)|A\.|A\)|а\.|а\)|А\.|А\)|1\.|1\)|\*\s|-\s|--|•\s|→\s|✓\s|✔\s|✗\s|✖\s|✘\s|❯\s|›\s|»\s/;
          const decrement = (el) => el.replace(/^b|^B|^б|^Б|^2/, (match) => prefixDecrement[match]);
          let hit = false;
          const firstPrefix = $el.textContent.substring(0, 2);

          if (
            firstPrefix.trim().length > 0
            && firstPrefix !== activeMatch
            && firstPrefix.match(prefixMatch)
          ) {
            const hasBreak = $el.innerHTML.indexOf('<br>');
            if (hasBreak !== -1) {
              const subParagraph = $el
                .innerHTML
                .substring(hasBreak + 4)
                .trim();
              const subPrefix = subParagraph.substring(0, 2);
              if (firstPrefix === decrement(subPrefix)) {
                hit = true;
              }
            }

            // Decrement the second p prefix and compare .
            if (!hit) {
              const $second = this.getNextSibling($el, 'p');
              if ($second) {
                const secondPrefix = decrement($el.nextElementSibling.textContent.substring(0, 2));
                if (firstPrefix === secondPrefix) {
                  hit = true;
                }
              }
            }
            if (hit) {
              const key = this.prepareDismissal(`list: ${$el.textContent}`);
              this.results.push({
                element: $el,
                type: WARNING,
                content: Lang.sprintf('QA_SHOULD_BE_LIST', firstPrefix),
                inline: false,
                position: 'beforebegin',
                dismiss: key,
              });
              activeMatch = firstPrefix;
            } else {
              activeMatch = '';
            }
          } else {
            activeMatch = '';
          }
        });
      }

      // Warning: Detect uppercase. Updated logic thanks to Editoria11y!
      if (option.allCapsQA === true) {
        const checkCaps = ($el) => {
          let thisText = '';
          if ($el.tagName === 'LI') {
            // Prevent recursion through nested lists.
            $el.childNodes.forEach((node) => {
              if (node.nodeType === 3) {
                thisText += node.textContent;
              }
            });
          } else {
            thisText = this.getText($el);
          }
          const uppercasePattern = /([A-Z]{2,}[ ])([A-Z]{2,}[ ])([A-Z]{2,}[ ])([A-Z]{2,})/g;
          const detectUpperCase = thisText.match(uppercasePattern);

          if (detectUpperCase && detectUpperCase[0].length > 10) {
            const key = this.prepareDismissal(`uppercase: ${thisText}`);
            this.results.push({
              element: $el,
              type: WARNING,
              content: Lang.sprintf('QA_UPPERCASE_WARNING'),
              inline: false,
              position: 'beforebegin',
              dismiss: key,
            });
          }
        };
        this.paragraphs.forEach(($el) => checkCaps($el));
        this.headings.forEach(($el) => checkCaps($el));
        this.lists.forEach(($el) => checkCaps($el));
        this.blockquotes.forEach(($el) => checkCaps($el));
      }

      // Error: Duplicate IDs
      if (option.duplicateIdQA === true) {
        const allIds = {};
        this.ids.forEach(($el) => {
          const { id } = $el;
          if (id) {
            if (allIds[id] === undefined) {
              allIds[id] = 1;
            } else {
              this.results.push({
                element: $el,
                type: ERROR,
                content: Lang.sprintf('QA_DUPLICATE_ID', id),
                inline: true,
                position: 'beforebegin',
              });
            }
          }
        });
      }

      // Warning: Flag underline text.
      if (option.underlinedTextQA === true) {
        // Find all <u> tags.
        this.underlines.forEach(($el) => {
          const text = this.getText($el);
          const key = this.prepareDismissal(`underline: ${text}`);
          this.results.push({
            element: $el,
            type: WARNING,
            content: Lang.sprintf('QA_TEXT_UNDERLINE_WARNING'),
            inline: true,
            position: 'beforebegin',
            dismiss: key,
          });
        });
        // Find underline based on computed style.
        const computeUnderline = ($el) => {
          const style = getComputedStyle($el);
          const decoration = style.textDecorationLine;
          const text = this.getText($el);
          if (decoration === 'underline') {
            const key = this.prepareDismissal(`underline: ${text}`);
            this.results.push({
              element: $el,
              type: WARNING,
              content: Lang.sprintf('QA_TEXT_UNDERLINE_WARNING'),
              inline: false,
              position: 'beforebegin',
              dismiss: key,
            });
          }
        };
        this.paragraphs.forEach(($el) => computeUnderline($el));
        this.headings.forEach(($el) => computeUnderline($el));
        this.lists.forEach(($el) => computeUnderline($el));
        this.blockquotes.forEach(($el) => computeUnderline($el));
        this.spans.forEach(($el) => computeUnderline($el));
      }

      // Error: Page is missing meta title.
      if (option.pageTitleQA === true) {
        const $title = document.querySelector('title');
        if (!$title || $title.textContent.trim().length === 0) {
          this.results.push({
            type: ERROR,
            content: Lang.sprintf('QA_PAGE_TITLE'),
          });
        }
      }

      // Warning: Find inappropriate use of <sup> and <sub> tags.
      if (option.subscriptQA === true) {
        this.subscripts.forEach(($el) => {
          const text = this.getText($el);
          if (text.length >= 80) {
            const key = this.prepareDismissal(`${$el.tagName} ${text}`);
            this.results.push({
              element: $el,
              type: WARNING,
              content: Lang.sprintf('QA_SUBSCRIPT_WARNING'),
              inline: true,
              position: 'beforebegin',
              dismiss: key,
            });
          }
        });
      }
    };

    /**
     * Rulesets: Contrast
     * Color contrast plugin by Jason Day.
     * @link https://github.com/jasonday/color-contrast
     * @link https://github.com/gka/chroma.js (Parse RGB)
    */
    /* eslint-disable */
    this.checkContrast = () => {
      if (option.contrastPlugin === true) {
        if (this.store.getItem('sa11y-remember-contrast') === 'On' || option.headless === true) {
          let contrastErrors = {
            errors: [],
            warnings: [],
          };

          const elements = this.contrast;
          const contrast = {
            // Parse rgb(r, g, b) and rgba(r, g, b, a) strings into an array.
            parseRgb(css) {
              let i;
              let m;
              let rgb;
              let f;
              let k;
              if (m = css.match(/rgb\(\s*(\-?\d+),\s*(\-?\d+)\s*,\s*(\-?\d+)\s*\)/)) {
                rgb = m.slice(1, 4);
                for (i = f = 0; f <= 2; i = ++f) {
                  rgb[i] = +rgb[i];
                }
                rgb[3] = 1;
              } else if (m = css.match(/rgba\(\s*(\-?\d+),\s*(\-?\d+)\s*,\s*(\-?\d+)\s*,\s*([01]|[01]?\.\d+)\)/)) {
                rgb = m.slice(1, 5);
                for (i = k = 0; k <= 3; i = ++k) {
                  rgb[i] = +rgb[i];
                }
              }
              return rgb;
            },
            /**
             * Based on @link http://www.w3.org/TR/WCAG20/#relativeluminancedef
            */
            relativeLuminance(c) {
              const lum = [];
              for (let i = 0; i < 3; i++) {
                const v = c[i] / 255;
                // eslint-disable-next-line no-restricted-properties
                lum.push(v < 0.03928 ? v / 12.92 : Math.pow((v + 0.055) / 1.055, 2.4));
              }
              return (0.2126 * lum[0]) + (0.7152 * lum[1]) + (0.0722 * lum[2]);
            },
            /**
             * Based on @link http://www.w3.org/TR/WCAG20/#contrast-ratiodef
            */
            contrastRatio(x, y) {
              const l1 = contrast.relativeLuminance(contrast.parseRgb(x));
              const l2 = contrast.relativeLuminance(contrast.parseRgb(y));
              return (Math.max(l1, l2) + 0.05) / (Math.min(l1, l2) + 0.05);
            },

            getBackground(el) {
              const styles = getComputedStyle(el);
              const bgColor = styles.backgroundColor;
              const bgImage = styles.backgroundImage;
              const rgb = `${contrast.parseRgb(bgColor)}`;
              const alpha = rgb.split(',');

              // if background has alpha transparency, flag manual check
              if (alpha[3] < 1 && alpha[3] > 0) {
                return 'alpha';
              }

              // if element has no background image, or transparent return bgColor
              if (bgColor !== 'rgba(0, 0, 0, 0)' && bgColor !== 'transparent' && bgImage === 'none' && alpha[3] !== '0') {
                return bgColor;
              } if (bgImage !== 'none') {
                return 'image';
              }

              // retest if not returned above
              if (el.tagName === 'HTML') {
                return 'rgb(255, 255, 255)';
              }
              return contrast.getBackground(el.parentNode);
            },
            check() {
              // resets results
              contrastErrors = {
                errors: [],
                warnings: [],
              };

              for (let i = 0; i < elements.length; i++) {
                const elem = elements[i];
                if (contrast) {
                  const style = getComputedStyle(elem);
                  const { color } = style;
                  const { fill } = style;
                  const fontSize = parseInt(style.fontSize, 10);
                  const pointSize = fontSize * (3 / 4);
                  const { fontWeight } = style;
                  const htmlTag = elem.tagName;
                  const background = contrast.getBackground(elem);
                  const textString = [].reduce.call(elem.childNodes, (a, b) => a + (b.nodeType === 3 ? b.textContent : ''), '');
                  const text = textString.trim();
                  const clip = window.getComputedStyle(elem).clip.replace(/\s/g, '');
                  const width = parseFloat(window.getComputedStyle(elem).width);
                  const height = parseFloat(window.getComputedStyle(elem).height);
                  let ratio;
                  let error;
                  let warning;

                  if ((width === 1 && height === 1) && (clip === "rect(0,0,0,0)" || clip === "rect(1px,1px,1px,1px)")) {
                    // Ignore if visually hidden for screen readers.
                  } else if (htmlTag === 'SVG') {
                    ratio = Math.round(contrast.contrastRatio(fill, background) * 100) / 100;
                    if (ratio < 3) {
                      error = {
                        elem,
                        ratio: `${ratio}:1`,
                      };
                      contrastErrors.errors.push(error);
                    }
                  } else if (text.length || htmlTag === 'INPUT' || htmlTag === 'SELECT' || htmlTag === 'TEXTAREA') {
                    const type = elem.getAttribute('type');
                    if (type === 'range' || type === 'color') {
                      // Ignore specific input types.
                    } else if (background === 'image') {
                      warning = {
                        elem,
                      };
                      contrastErrors.warnings.push(warning);
                    } else if (background === 'alpha') {
                      warning = {
                        elem,
                      };
                      contrastErrors.warnings.push(warning);
                    } else {
                      ratio = Math.round(contrast.contrastRatio(color, background) * 100) / 100;
                      if (pointSize >= 18 || (pointSize >= 14 && fontWeight >= 700)) {
                        if (ratio < 3) {
                          error = {
                            elem,
                            ratio: `${ratio}:1`,
                          };
                          contrastErrors.errors.push(error);
                        }
                      } else if (ratio < 4.5) {
                        error = {
                          elem,
                          ratio: `${ratio}:1`,
                        };
                        contrastErrors.errors.push(error);
                      }
                    }
                  }
                }
              }
              return contrastErrors;
            },
          };

          contrast.check();

          contrastErrors.errors.forEach((item) => {
            const name = item.elem;
            const cratio = item.ratio;
            const clone = name.cloneNode(true);
            const removeSa11yHeadingLabel = clone.querySelectorAll('.sa11y-heading-label');
            for (let i = 0; i < removeSa11yHeadingLabel.length; i++) {
              clone.removeChild(removeSa11yHeadingLabel[i]);
            }

            const nodetext = this.fnIgnore(clone, 'script').textContent;
            if (name.tagName === 'INPUT') {
              this.results.push({
                element: name,
                type: ERROR,
                content: Lang.sprintf('CONTRAST_INPUT_ERROR', cratio),
                inline: false,
                position: 'beforebegin',
              });
            } else {
              this.results.push({
                element: name,
                type: ERROR,
                content: Lang.sprintf('CONTRAST_ERROR', cratio, nodetext),
                inline: false,
                position: 'beforebegin',
              });
            }
          });

          contrastErrors.warnings.forEach((item) => {
            const name = item.elem;
            const clone = name.cloneNode(true);
            const removeSa11yHeadingLabel = clone.querySelectorAll('.sa11y-heading-label');
            for (let i = 0; i < removeSa11yHeadingLabel.length; i++) {
              clone.removeChild(removeSa11yHeadingLabel[i]);
            }
            const nodetext = this.fnIgnore(clone, 'script').textContent;
            const key = this.prepareDismissal(`contrast: ${nodetext}`);
            this.results.push({
              element: name,
              type: WARNING,
              content: Lang.sprintf('CONTRAST_WARNING', nodetext),
              inline: false,
              position: 'beforebegin',
              dismiss: key,
            });
          });
        }
      } else {
        // Hide Contrast toggle if prop is set to false.
        this.contrastItem.setAttribute('style', 'display: none !important;');
        this.store.setItem('sa11y-remember-contrast', 'Off');
      }
    };
    /* eslint-disable */

    /**
     * Rulesets: Readability
     * Adapted from Greg Kraus. References for other non-english languages included below.
     * @link https://accessibility.oit.ncsu.edu/it-accessibility-at-nc-state/developers/tools/readability-bookmarklet/
     * @link https://core.ac.uk/download/pdf/6552422.pdf
     * @link https://github.com/Yoast/YoastSEO.js/issues/267
     * @link http://stackoverflow.com/questions/5686483/how-to-compute-number-of-syllables-in-a-word-in-javascript
     * @link https://www.simoahava.com/analytics/calculate-readability-scores-for-content/#commento-58ac602191e5c6dc391015c5a6933cf3e4fc99d1dc92644024c331f1ee9b6093
    */
    this.checkReadability = () => {
      if (option.readabilityPlugin === true) {
        if (this.store.getItem('sa11y-remember-readability') === 'On') {
          // Crude hack to add a period to the end of list items to make a complete sentence.
          this.readability.forEach(($el) => {
            const listText = $el.textContent;
            if (listText.length >= 120) {
              if (listText.charAt(listText.length - 1) !== '.') {
                $el.insertAdjacentHTML('beforeend', "<span class='sa11y-readability-period sa11y-visually-hidden'>.</span>");
              }
            }
          });

          // Combine all page text.
          const readabilityarray = [];
          for (let i = 0; i < this.readability.length; i++) {
            const current = this.readability[i];
            const getText = this.getText(current);
            if (getText !== '') {
              readabilityarray.push(getText);
            }
          }
          const pageText = readabilityarray.join(' ').toString();

          /* Flesch Reading Ease for English, French, German, Dutch, and Italian. */
          if (['en', 'fr', 'de', 'nl', 'it'].includes(option.readabilityLang)) {
            // Compute syllables
            const numberOfSyllables = (el) => {
              let wordCheck = el;
              wordCheck = wordCheck.toLowerCase().replace('.', '').replace('\n', '');
              if (wordCheck.length <= 3) {
                return 1;
              }
              wordCheck = wordCheck.replace(/(?:[^laeiouy]es|ed|[^laeiouy]e)$/, '');
              wordCheck = wordCheck.replace(/^y/, '');
              const syllableString = wordCheck.match(/[aeiouy]{1,2}/g);
              let syllables = 0;

              const syllString = !!syllableString;
              if (syllString) {
                syllables = syllableString.length;
              }
              return syllables;
            };

            // Words
            const wordsRaw = pageText.replace(/[.!?-]+/g, ' ').split(' ');
            let words = 0;
            for (let i = 0; i < wordsRaw.length; i++) {
            // eslint-disable-next-line eqeqeq
              if (wordsRaw[i] != 0) {
                words += 1;
              }
            }

            // Sentences
            const sentenceRaw = pageText.split(/[.!?]+/);
            let sentences = 0;
            for (let i = 0; i < sentenceRaw.length; i++) {
              if (sentenceRaw[i] !== '') {
                sentences += 1;
              }
            }

            // Syllables
            let totalSyllables = 0;
            let syllables1 = 0;
            let syllables2 = 0;
            for (let i = 0; i < wordsRaw.length; i++) {
            // eslint-disable-next-line eqeqeq
              if (wordsRaw[i] != 0) {
                const syllableCount = numberOfSyllables(wordsRaw[i]);
                if (syllableCount === 1) {
                  syllables1 += 1;
                }
                if (syllableCount === 2) {
                  syllables2 += 1;
                }
                totalSyllables += syllableCount;
              }
            }

            let flesch = false;
            if (option.readabilityLang === 'en') {
              flesch = 206.835 - (1.015 * (words / sentences)) - (84.6 * (totalSyllables / words));
            } else if (option.readabilityLang === 'fr') {
              flesch = 207 - (1.015 * (words / sentences)) - (73.6 * (totalSyllables / words));
            } else if (option.readabilityLang === 'es') {
              flesch = 206.84 - (1.02 * (words / sentences)) - (0.60 * (100 * (totalSyllables / words)));
            } else if (option.readabilityLang === 'de') {
              flesch = 180 - (words / sentences) - (58.5 * (totalSyllables / words));
            } else if (option.readabilityLang === 'nl') {
              flesch = 206.84 - (0.77 * (100 * (totalSyllables / words))) - (0.93 * (words / sentences));
            } else if (option.readabilityLang === 'it') {
              flesch = 217 - (1.3 * (words / sentences)) - (0.6 * (100 * (totalSyllables / words)));
            }

            // Score must be between 0 and 100%.
            if (flesch > 100) {
              flesch = 100;
            } else if (flesch < 0) {
              flesch = 0;
            }

            // Compute scores.
            const fleschScore = flesch.toFixed(1);
            const avgWordsPerSentence = (words / sentences).toFixed(1);
            const complexWords = Math.round(100 * ((words - (syllables1 + syllables2)) / words));

            let difficulty;
            if (fleschScore >= 0 && fleschScore < 30) {
              difficulty = Lang._('LANG_VERY_DIFFICULT');
            } else if (fleschScore > 31 && fleschScore < 49) {
              difficulty = Lang._('LANG_DIFFICULT');
            } else if (fleschScore > 50 && fleschScore < 60) {
              difficulty = Lang._('LANG_FAIRLY_DIFFICULT');
            } else {
              difficulty = Lang._('LANG_GOOD');
            }

            // Create object for headless mode.
            this.readabilityResults = {
              score: fleschScore,
              averageWordsPerSentence: avgWordsPerSentence,
              complexWords: complexWords,
              difficultyLevel: difficulty,
              wordCount: words,
            }
          } else if (['sv', 'fi', 'da', 'no', 'nb', 'nn'].includes(option.readabilityLang)) {
            /* Lix: Danish, Finnish, Norwegian (Bokmål & Nynorsk), Swedish. */
            const calculateLix = (text) => {
              const lixWords = () => text.replace(/[-'.]/ig, '').split(/[^a-zA-ZöäåÖÄÅÆæØø0-9]/g).filter(Boolean);
              const splitSentences = () => {
                const splitter = /\?|!|\.|\n/g;
                const arrayOfSentences = text.split(splitter).filter(Boolean);
                return arrayOfSentences;
              };
              const wordCount = lixWords(text).length;
              const longWordsCount = lixWords(text).filter((wordsArray) => wordsArray.length > 6).length;
              const sentenceCount = splitSentences(text).length;
              const score = Math.round((wordCount / sentenceCount) + ((longWordsCount * 100) / wordCount));
              const avgWordsPerSentence = (wordCount / sentenceCount).toFixed(1);
              const complexWords = Math.round(100 * (longWordsCount / wordCount));

              let difficulty;
              if (score >= 0 && score < 39) {
                difficulty = Lang._('LANG_GOOD');
              } else if (score > 40 && score < 50) {
                difficulty = Lang._('LANG_FAIRLY_DIFFICULT');
              } else if (score > 51 && score < 61) {
                difficulty = Lang._('LANG_DIFFICULT');
              } else {
                difficulty = Lang._('LANG_VERY_DIFFICULT');
              }
              return {
                score, difficulty, avgWordsPerSentence, complexWords, wordCount,
              };
            };

            // Compute LIX
            const lix = calculateLix(pageText);

            // Create object for headless mode.
            this.readabilityResults = {
              score: lix.score,
              averageWordsPerSentence: lix.avgWordsPerSentence,
              complexWords: lix.complexWords,
              difficultyLevel: lix.difficulty,
              wordCount: lix.wordCount,
            }
          }

          // Update main panel if not in headless mode.
          if (option.headless === false) {
            if (pageText.length === 0) {
              this.readabilityInfo.innerHTML = Lang._('READABILITY_NO_P_OR_LI_MESSAGE');
            } else if (this.readabilityResults.wordCount > 30) {
              this.readabilityInfo.innerHTML = `${this.readabilityResults.score} <span class="sa11y-readability-score">${this.readabilityResults.difficultyLevel}</span>`;

              this.readabilityDetails.innerHTML = `
                <li>
                  <strong>${Lang._('LANG_AVG_SENTENCE')}</strong>
                  ${this.readabilityResults.averageWordsPerSentence}
                </li>
                <li>
                  <strong>${Lang._('LANG_COMPLEX_WORDS')}</strong>
                  ${this.readabilityResults.complexWords}%
                </li>
                <li>
                  <strong>${Lang._('LANG_TOTAL_WORDS')}</strong>
                  ${this.readabilityResults.wordCount}
                </li>`;
            } else {
              this.readabilityInfo.textContent = Lang._('READABILITY_NOT_ENOUGH_CONTENT_MESSAGE');
            }
          }
        }
      } else {
        if (option.headless === false) {
          // Hide Readability toggle and panel if prop is set to false.
          this.readabilityItem.setAttribute('style', 'display: none !important;');
          this.readabilityPanel.classList.remove('sa11y-active');
        }
      }
    };

    // Initialize Sa11y.
    this.initialize();
  }
}

export {
  Lang,
  Sa11yCustomChecks,
  Sa11y,
};
