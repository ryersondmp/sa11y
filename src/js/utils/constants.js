import Lang from './lang';
import findShadowComponents from '../logic/find-shadow-components';

const Constants = (function myConstants() {
  /* **************** */
  /* Global constants */
  /* **************** */
  const Global = {};
  function initializeGlobal(
    checkRoot,
    contrastPlugin,
    formLabelsPlugin,
    linksAdvancedPlugin,
    colourFilterPlugin,
    checkAllHideToggles,
    headless,
    panelPosition,
  ) {
    Global.ERROR = Lang._('ERROR');
    Global.WARNING = Lang._('WARNING');
    Global.GOOD = Lang._('GOOD');
    Global.currentPage = window.location.pathname;
    Global.html = document.querySelector('html');
    Global.headless = headless;
    Global.panelPosition = panelPosition;

    // Toggleable plugins
    Global.contrastPlugin = contrastPlugin;
    Global.formLabelsPlugin = formLabelsPlugin;
    Global.linksAdvancedPlugin = linksAdvancedPlugin;
    Global.colourFilterPlugin = colourFilterPlugin;
    Global.checkAllHideToggles = checkAllHideToggles;

    // Root element to check.
    Global.Root = document.querySelector(checkRoot);
    if (!checkRoot) {
      Global.Root = document.querySelector('body');
    }

    // A11y: Determine scroll behaviour
    let reducedMotion = false;
    if (typeof window.matchMedia === 'function') {
      reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
    }
    Global.scrollBehaviour = (!reducedMotion || reducedMotion.matches) ? 'auto' : 'smooth';

    // i18n
    Global.langDirection = (Global.html.getAttribute('dir') === 'rtl') ? 'rtl' : 'ltr';
  }

  /* *************** */
  /* Panel constants */
  /* *************** */
  const Panel = {};
  function initializePanelSelectors() {
    const Sa11yPanel = document.querySelector('sa11y-control-panel').shadowRoot;

    Panel.panel = Sa11yPanel.getElementById('panel');
    Panel.content = Sa11yPanel.getElementById('panel-content');
    Panel.controls = Sa11yPanel.getElementById('panel-controls');
    Panel.outline = Sa11yPanel.getElementById('outline-panel');
    Panel.outlineContent = Sa11yPanel.getElementById('outline-content');
    Panel.outlineList = Sa11yPanel.getElementById('outline-list');
    Panel.outlineHeader = Sa11yPanel.getElementById('outline-header');
    Panel.notifBadge = Sa11yPanel.getElementById('notification-badge');
    Panel.notifCount = Sa11yPanel.getElementById('notification-count');
    Panel.notifText = Sa11yPanel.getElementById('notification-text');
    Panel.status = Sa11yPanel.getElementById('status');

    // Page Issues
    Panel.pageIssues = Sa11yPanel.getElementById('page-issues');
    Panel.pageIssuesList = Sa11yPanel.getElementById('page-issues-list');
    Panel.pageIssuesHeader = Sa11yPanel.getElementById('page-issues-header');
    Panel.pageIssuesContent = Sa11yPanel.getElementById('page-issues-content');

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
    Panel.darkModeItem = Sa11yPanel.getElementById('dark-mode-item');

    Panel.colourPanel = Sa11yPanel.getElementById('panel-colour-filters');
    Panel.colourFilterItem = Sa11yPanel.getElementById('colour-filter-item');
    Panel.colourFilterSelect = Sa11yPanel.getElementById('colour-filter-select');
    Panel.colourFilterIcon = Sa11yPanel.getElementById('filter-icon');

    // Buttons
    Panel.toggle = Sa11yPanel.getElementById('toggle');
    Panel.outlineToggle = Sa11yPanel.getElementById('outline-toggle');
    Panel.settingsToggle = Sa11yPanel.getElementById('settings-toggle');
    Panel.skipButton = Sa11yPanel.getElementById('skip-button');
    Panel.dismissButton = Sa11yPanel.getElementById('dismiss-button');
    Panel.dismissTooltip = Sa11yPanel.getElementById('dismiss-tooltip');
    Panel.skipToPageIssues = Sa11yPanel.getElementById('skip-to-page-issues');

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

  /* ***************** */
  /* Readability Setup */
  /* ***************** */
  const Readability = {};
  function initializeReadability(
    readabilityPlugin,
    readabilityRoot,
    readabilityLang,
  ) {
    Readability.Lang = readabilityLang;
    Readability.Root = document.querySelector(readabilityRoot);
    if (!readabilityRoot) {
      Readability.Root = Global.Root;
    }

    // Supported readability languages. Turn module off if not supported.
    const supported = ['en', 'fr', 'es', 'de', 'nl', 'it', 'sv', 'fi', 'da', 'no', 'nb', 'nn'];
    const pageLang = Constants.Global.html.getAttribute('lang');

    if (!pageLang) {
      Readability.Plugin = false;
    } else {
      const pageLangLowerCase = pageLang.toLowerCase();
      if (!supported.some(($el) => pageLangLowerCase.includes($el))) {
        Readability.Plugin = false;
      } else {
        Readability.Plugin = readabilityPlugin;
      }
    }
  }

  /* **************** */
  /* Exclusions Setup */
  /* **************** */
  const Exclusions = {};
  function initializeExclusions(
    containerIgnore,
    contrastIgnore,
    readabilityIgnore,
    headerIgnore,
    outlineIgnore,
    imageIgnore,
    linkIgnore,
    linkIgnoreSpan,
  ) {
    // Main container.
    if (containerIgnore) {
      const containerSelectors = containerIgnore.split(',').map(($el) => `${$el} *, ${$el}`);
      Exclusions.Container = `[aria-hidden], #wpadminbar *, ${containerSelectors.join(', ')}`;
    } else {
      Exclusions.Container = '[aria-hidden], #wpadminbar *';
    }

    // Contrast exclusions
    Exclusions.Contrast = 'script, style, link';
    if (contrastIgnore) {
      Exclusions.Contrast = `${contrastIgnore}, ${Exclusions.Contrast}`;
    }

    // Ignore specific regions for readability module.
    Exclusions.Readability = 'nav li, [role="navigation"] li';
    if (readabilityIgnore) {
      Exclusions.Readability = `${readabilityIgnore}, ${Exclusions.Readability}`;
    }

    // Ignore specific headings
    if (headerIgnore) {
      Exclusions.Headings = `${headerIgnore}`;
    }

    // Don't add heading label or include in panel.
    if (outlineIgnore) {
      Exclusions.Outline = `${outlineIgnore}`;
    }

    // Ignore specific images.
    Exclusions.Images = '[role="presentation"]';
    if (imageIgnore) {
      Exclusions.Images = `${imageIgnore}, ${Exclusions.Images}`;
    }

    // Ignore specific links
    Exclusions.Links = '[aria-hidden="true"], .anchorjs-link';
    if (linkIgnore) {
      Exclusions.Links = `${linkIgnore}, ${Exclusions.Links}`;
    }

    // Ignore specific classes within links.
    if (linkIgnoreSpan) {
      const linkIgnoreSpanSelectors = linkIgnoreSpan.split(',').map(($el) => `${$el} *, ${$el}`);
      Exclusions.LinkSpan = `noscript, ${linkIgnoreSpanSelectors.join(', ')}`;
    } else {
      Exclusions.LinkSpan = 'noscript';
    }
  }

  /* ********************** */
  /* Embedded Content Setup */
  /* ********************** */
  const EmbeddedContent = {};
  function initializeEmbeddedContent(
    videoContent,
    audioContent,
    dataVizContent,
  ) {
    // Video sources.
    if (videoContent) {
      const videos = videoContent.split(/\s*[\s,]\s*/).map(($el) => `[src*='${$el}']`);
      EmbeddedContent.Video = `video, ${videos.join(', ')}`;
    } else {
      EmbeddedContent.Video = 'video';
    }

    // Audio sources.
    if (audioContent) {
      const audio = audioContent.split(/\s*[\s,]\s*/).map(($el) => `[src*='${$el}']`);
      EmbeddedContent.Audio = `audio, ${audio.join(', ')}`;
    } else {
      EmbeddedContent.Audio = 'audio';
    }

    // Data viz sources.
    if (dataVizContent) {
      const data = dataVizContent.split(/\s*[\s,]\s*/).map(($el) => `[src*='${$el}']`);
      EmbeddedContent.Visualization = data.join(', ');
    } else {
      EmbeddedContent.Visualization = 'datastudio.google.com, tableau';
    }

    // Embedded content all
    EmbeddedContent.All = `${EmbeddedContent.Video}, ${EmbeddedContent.Audio}, ${EmbeddedContent.Visualization}`;
  }

  /* ***************** */
  /* Shadow Components */
  /* ***************** */
  const Shadow = {};
  function initializeShadowSearch(checkRoot, autoDetectShadowComponents, shadowComponents) {
    Shadow.Components = findShadowComponents(
      checkRoot,
      autoDetectShadowComponents,
      shadowComponents,
    );
  }

  return {
    initializeGlobal,
    Global,
    initializePanelSelectors,
    Panel,
    initializeReadability,
    Readability,
    initializeExclusions,
    Exclusions,
    initializeEmbeddedContent,
    EmbeddedContent,
    initializeShadowSearch,
    Shadow,
  };
}());

export default Constants;
