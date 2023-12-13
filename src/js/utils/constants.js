import Lang from './lang';
import findShadowComponents from '../logic/find-shadow-components';

const Constants = (function myConstants() {
  /* **************** */
  /* Global constants */
  /* **************** */
  const Global = {};
  function initializeGlobal(option) {
    Global.html = document.querySelector('html');
    Global.headless = option.headless;
    Global.panelPosition = option.panelPosition;
    Global.dismissAnnotations = option.dismissAnnotations;

    // Toggleable plugins
    Global.contrastPlugin = option.contrastPlugin;
    Global.formLabelsPlugin = option.formLabelsPlugin;
    Global.linksAdvancedPlugin = option.linksAdvancedPlugin;
    Global.colourFilterPlugin = option.colourFilterPlugin;
    Global.checkAllHideToggles = option.checkAllHideToggles;
    Global.exportResultsPlugin = option.exportResultsPlugin;

    // Root element to check.
    Global.Root = document.querySelector(option.checkRoot);
    if (!Global.Root) {
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

    // QA: Document links (Quality Assurance module)
    if (option.documentLinks) {
      Global.documentLinks = `${option.documentLinks}`;
    }
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
    Panel.exportHTML = Sa11yPanel.getElementById('export-html');
    Panel.exportCSV = Sa11yPanel.getElementById('export-csv');

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
  function initializeReadability(option) {
    if (option.readabilityPlugin) {
      // Readability target area to check.
      Readability.Root = document.querySelector(option.readabilityRoot);
      if (!Readability.Root) {
        if (!Global.Root) {
          Readability.Root = document.querySelector('body');
        } else {
          Readability.Root = Global.Root;
          // eslint-disable-next-line no-console
          console.error(`Sa11y configuration error: The selector '${option.readabilityRoot}' used for the property 'readabilityRoot' does not exist. '${Global.Root.tagName}' was used as a fallback.`);
        }
      }

      // Set `readabilityLang` property based on language file.
      Readability.Lang = Lang._('LANG_CODE').substring(0, 2);

      // Supported readability languages.
      const supported = [
        'en',
        'fr',
        'es',
        'de',
        'nl',
        'it',
        'sv',
        'fi',
        'da',
        'no',
        'nb',
        'nn',
        'pt',
      ];

      // Turn off readability if page language is not defined.
      const pageLang = Constants.Global.html.getAttribute('lang');
      if (!pageLang) {
        Readability.Plugin = false;
      } else {
        // Turn off readability if page language is not supported.
        const pageLangLowerCase = pageLang.toLowerCase().substring(0, 2);
        if (!supported.includes(pageLangLowerCase) || !supported.includes(Readability.Lang)) {
          Readability.Plugin = false;
        } else {
          Readability.Plugin = true;
        }
      }
    }
  }

  /* **************** */
  /* Exclusions Setup */
  /* **************** */
  const Exclusions = {};
  function initializeExclusions(option) {
    // Main container.
    if (option.containerIgnore) {
      const containerSelectors = option.containerIgnore.split(',').map(($el) => `${$el} *, ${$el}`);
      Exclusions.Container = `#wpadminbar *, ${containerSelectors.join(', ')}`;
    } else {
      Exclusions.Container = '#wpadminbar *';
    }

    // Contrast exclusions
    Exclusions.Contrast = 'script, style, link';
    if (option.contrastIgnore) {
      Exclusions.Contrast = `${option.contrastIgnore}, ${Exclusions.Contrast}`;
    }

    // Ignore specific regions for readability module.
    Exclusions.Readability = 'nav li, [role="navigation"] li';
    if (option.readabilityIgnore) {
      Exclusions.Readability = `${option.readabilityIgnore}, ${Exclusions.Readability}`;
    }

    // Ignore specific headings
    if (option.headerIgnore) {
      Exclusions.Headings = `${option.headerIgnore}`;
    }

    // Don't add heading label or include in panel.
    if (option.outlineIgnore) {
      Exclusions.Outline = `${option.outlineIgnore}`;
    }

    // Ignore specific images.
    Exclusions.Images = '[role="presentation"]';
    if (option.imageIgnore) {
      Exclusions.Images = `${option.imageIgnore}, ${Exclusions.Images}`;
    }

    // Ignore specific links
    Exclusions.Links = '.anchorjs-link';
    if (option.linkIgnore) {
      Exclusions.Links = `${option.linkIgnore}, ${Exclusions.Links}`;
    }

    // Ignore specific classes within links.
    if (option.linkIgnoreSpan) {
      Exclusions.LinkSpan = option.linkIgnoreSpan;
    }
  }

  /* ********************** */
  /* Embedded Content Setup */
  /* ********************** */
  const EmbeddedContent = {};
  function initializeEmbeddedContent(option) {
    // Video sources.
    if (option.videoContent) {
      const videos = option.videoContent.split(/\s*[\s,]\s*/).map(($el) => `[src*='${$el}']`);
      EmbeddedContent.Video = `video, ${videos.join(', ')}`;
    } else {
      EmbeddedContent.Video = 'video';
    }

    // Audio sources.
    if (option.audioContent) {
      const audio = option.audioContent.split(/\s*[\s,]\s*/).map(($el) => `[src*='${$el}']`);
      EmbeddedContent.Audio = `audio, ${audio.join(', ')}`;
    } else {
      EmbeddedContent.Audio = 'audio';
    }

    // Data viz sources.
    if (option.dataVizContent) {
      const data = option.dataVizContent.split(/\s*[\s,]\s*/).map(($el) => `[src*='${$el}']`);
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
