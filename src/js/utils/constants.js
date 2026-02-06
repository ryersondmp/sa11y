import { createAlert } from '../interface/alert';
import Lang from './lang';
import { State } from '../core/state';

const Constants = (function myConstants() {
  /* **************** */
  /* Global constants */
  /* **************** */
  const Global = {};
  function initializeGlobal() {
    Global.html = document.querySelector('html');
    Global.shadowDetection =
      State.option.shadowComponents.length > 0 || State.option.autoDetectShadowComponents === true;

    // Validate panel position.
    const panelPositions = new Set(['top-left', 'top-right', 'left', 'right']);
    const positionValue = State.option.panelPosition?.trim().toLowerCase();
    Global.panelPosition = panelPositions.has(positionValue) ? positionValue : 'right';

    // Contrast
    Global.contrastAlgorithm = State.option.contrastAlgorithm.toUpperCase();

    // A11y: Determine scroll behaviour
    let reducedMotion = false;
    if (typeof window.matchMedia === 'function') {
      reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
    }
    Global.scrollBehaviour = !reducedMotion || reducedMotion.matches ? 'auto' : 'smooth';

    // i18n
    Global.langDirection = Global.html.getAttribute('dir') === 'rtl' ? 'rtl' : 'ltr';

    // Check for document types.
    const documentSources = State.option.checks.QA_DOCUMENT.sources;
    const defaultDocumentSources =
      'a[href$=".doc"], a[href$=".docx"], a[href*=".doc?"], a[href*=".docx?"], a[href$=".ppt"], a[href$=".pptx"], a[href*=".ppt?"], a[href*=".pptx?"], a[href^="https://drive.google.com/file"], a[href^="https://docs.google."], a[href^="https://sway."]';
    if (documentSources) {
      Global.documentSources = `${defaultDocumentSources}, ${documentSources}`;
    } else {
      Global.documentSources = defaultDocumentSources;
    }

    /* ********************** */
    /* Embedded Content Setup */
    /* ********************** */

    // Video sources.
    const videoSources = State.option.checks.EMBED_VIDEO.sources;
    const defaultVideoSources =
      'video, [src*="Video"], [src*="video"], [src*="watch"], [src*="youtube.com"], [src*="vimeo.com"], [src*="panopto.com"], [src*="wistia.com"], [src*="dailymotion.com"], [src*="brightcove.com"], [src*="vidyard.com"]';
    if (videoSources) {
      const videos = videoSources.split(/\s*[\s,]\s*/).map(($el) => `[src*="${$el}"]`);
      Global.VideoSources = `${defaultVideoSources}, ${videos.join(', ')}`;
    } else {
      Global.VideoSources = defaultVideoSources;
    }

    // Audio sources.
    const audioSources = State.option.checks.EMBED_AUDIO.sources;
    const defaultAudioSources =
      'audio, [src*="soundcloud.com"], [src*="simplecast.com"], [src*="podbean.com"], [src*="buzzsprout.com"], [src*="blubrry.com"], [src*="transistor.fm"], [src*="fusebox.fm"], [src*="libsyn.com"], [src*="spotify.com"], [src*="podcasts.apple.com"], [src*="castbox.fm"], [src*="megaphone.fm"], [src*="spreaker.com"], [src*="anchor.fm"], [src*="rss.com"], [src*="redcircle.com"]';
    if (audioSources) {
      const audio = audioSources.split(/\s*[\s,]\s*/).map(($el) => `[src*="${$el}"]`);
      Global.AudioSources = `${defaultAudioSources}, ${audio.join(', ')}`;
    } else {
      Global.AudioSources = defaultAudioSources;
    }

    // Data viz sources.
    const dataVizSources = State.option.checks.EMBED_DATA_VIZ.sources;
    const defaultDataVizSources =
      '[src*="datastudio"], [src*="tableau"], [src*="lookerstudio"], [src*="powerbi"], [src*="qlik"]';
    if (dataVizSources) {
      const data = dataVizSources.split(/\s*[\s,]\s*/).map(($el) => `[src*="${$el}"]`);
      Global.VisualizationSources = `${defaultDataVizSources}, ${data.join(', ')}`;
    } else {
      Global.VisualizationSources = defaultDataVizSources;
    }

    // Embedded content all
    Global.AllEmbeddedContent = `${Global.VideoSources}, ${Global.AudioSources}, ${Global.VisualizationSources}`;
  }

  /* **************** */
  /* Initialize Roots */
  /* **************** */
  const Root = {};
  function initializeRoot(desiredRoot, desiredReadabilityRoot, fixedRoots) {
    Root.areaToCheck = [];
    Root.Readability = [];

    // If fixed roots provided.
    if (fixedRoots) {
      Root.areaToCheck = fixedRoots;
      Root.Readability = fixedRoots;
      return;
    }

    /* Main target area */
    try {
      // Iterate through each selector passed, and push valid ones to final root array.
      const roots = document.querySelectorAll(desiredRoot);
      if (roots.length > 0) {
        roots.forEach((root) => {
          Constants.Root.areaToCheck.push(root);
        });
      } else {
        console.error(`Sa11y: The target root (${desiredRoot}) does not exist.`);
      }
    } catch {
      Root.areaToCheck.length = 0;
    }

    // Push a visible UI alert if not headless and no roots at all are found.
    if (Root.areaToCheck.length === 0 && Global.headless === false) {
      createAlert(Lang.sprintf('MISSING_ROOT', desiredRoot));
      Root.areaToCheck.push(document.body);
    }

    /* Readability target area */
    try {
      const roots = document.querySelectorAll(desiredReadabilityRoot);
      if (roots.length > 0) {
        roots.forEach((root) => {
          Constants.Root.Readability.push(root);
        });
      } else {
        console.error(
          `Sa11y: The target readability root (${desiredReadabilityRoot}) does not exist.`,
        );
      }
    } catch {
      Root.Readability.length = 0;
    }

    if (Root.Readability.length === 0 && Global.headless === false) {
      if (Root.areaToCheck.length === 0) {
        Root.Readability.push(document.body);
      } else {
        // If desired root area is not found, use the root target area.
        Root.Readability = Root.areaToCheck;

        // Create a warning if the desired readability root is not found.
        setTimeout(() => {
          const { readabilityDetails, readabilityToggle } = Constants.Panel;
          const readabilityOn = readabilityToggle?.getAttribute('aria-pressed') === 'true';
          const alert = Constants.Panel.readability.querySelector('#readability-alert');
          if (readabilityDetails && readabilityOn && !alert) {
            // Roots that readability will be based on.
            const roots = Root.areaToCheck
              .map((el) => {
                if (el.id) return `#${el.id}`;
                if (el.className) return `.${el.className.split(/\s+/).filter(Boolean).join('.')}`;
                return el.tagName.toLowerCase();
              })
              .join(', ');

            // Append note to Readability panel.
            const note = document.createElement('div');
            note.id = 'readability-alert';
            note.innerHTML = `<hr><p>${Lang.sprintf('MISSING_READABILITY_ROOT', roots, desiredReadabilityRoot)}</p>`;
            readabilityDetails.insertAdjacentElement('afterend', note);
          }
        }, 100);
      }
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

    Panel.images = Sa11yPanel.getElementById('images-panel');
    Panel.imagesContent = Sa11yPanel.getElementById('images-content');
    Panel.imagesList = Sa11yPanel.getElementById('images-list');
    Panel.imagesHeader = Sa11yPanel.getElementById('images-header');

    Panel.notifBadge = Sa11yPanel.getElementById('notification-badge');
    Panel.notifCount = Sa11yPanel.getElementById('notification-count');
    Panel.notifText = Sa11yPanel.getElementById('notification-text');
    Panel.status = Sa11yPanel.getElementById('status');

    // Page Issues
    Panel.pageIssues = Sa11yPanel.getElementById('page-issues');
    Panel.pageIssuesList = Sa11yPanel.getElementById('page-issues-list');
    Panel.pageIssuesHeader = Sa11yPanel.getElementById('page-issues-header');
    Panel.pageIssuesContent = Sa11yPanel.getElementById('page-issues-content');

    // Settings panel
    Panel.settings = Sa11yPanel.getElementById('settings-panel');
    Panel.settingsHeader = Sa11yPanel.getElementById('settings-header');
    Panel.settingsContent = Sa11yPanel.getElementById('settings-content');

    // Settings toggles
    Panel.developerToggle = Sa11yPanel.getElementById('developer-toggle');
    Panel.readabilityToggle = Sa11yPanel.getElementById('readability-toggle');
    Panel.themeToggle = Sa11yPanel.getElementById('theme-toggle');
    Panel.developerItem = Sa11yPanel.getElementById('developer-item');
    Panel.readabilityItem = Sa11yPanel.getElementById('readability-item');
    Panel.darkModeItem = Sa11yPanel.getElementById('dark-mode-item');
    Panel.colourPanel = Sa11yPanel.getElementById('panel-colour-filters');
    Panel.colourFilterItem = Sa11yPanel.getElementById('colour-filter-item');
    Panel.colourFilterSelect = Sa11yPanel.getElementById('colour-filter-select');
    Panel.colourFilterIcon = Sa11yPanel.getElementById('filter-icon');

    // Buttons
    Panel.toggle = Sa11yPanel.getElementById('toggle');
    Panel.outlineToggle = Sa11yPanel.getElementById('outline-toggle');
    Panel.imagesToggle = Sa11yPanel.getElementById('images-toggle');
    Panel.settingsToggle = Sa11yPanel.getElementById('settings-toggle');
    Panel.movePanelToggle = Sa11yPanel.getElementById('move-panel');
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
  function initializeReadability() {
    if (State.option.readabilityPlugin) {
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
      const langCode = Lang._('LANG_CODE').substring(0, 2);
      const pageLang = Constants.Global.html.getAttribute('lang')?.toLowerCase().substring(0, 2);

      // Set the language property.
      Readability.Lang = langCode;

      // Validate: Must have a page language AND both must be in the supported list.
      const isSupported = pageLang && supported.includes(pageLang) && supported.includes(langCode);

      Readability.Plugin = Boolean(isSupported);
    }
  }

  /* **************** */
  /* Exclusions Setup */
  /* **************** */
  const Exclusions = {};
  function initializeExclusions() {
    // List of Sa11y's interface components.
    Exclusions.Sa11yElements = [
      'sa11y-heading-label',
      'sa11y-heading-anchor',
      'sa11y-annotation',
      'sa11y-tooltips',
      'sa11y-panel-tooltips',
      'sa11y-control-panel',
      '#sa11y-colour-filters',
      '#sa11y-colour-filters *',
    ];

    // Global elements to exclude.
    const exclusions = ['style', 'script', 'noscript'];

    // Main container exclusions.
    Exclusions.Container = ['#wpadminbar', '#wpadminbar *', ...exclusions];
    if (State.option.containerIgnore) {
      const containerSelectors = State.option.containerIgnore.split(',').map((item) => item.trim());
      Exclusions.Container = Exclusions.Container.concat(
        containerSelectors.flatMap((item) => [`${item} *`, item]),
      );
    }

    // Contrast exclusions
    Exclusions.Contrast = [
      'link',
      'hr',
      'State.option',
      'audio',
      'audio *',
      'video',
      'video *',
      'input[type="color"]',
      'input[type="range"]',
      'progress',
      'progress *',
      'meter',
      'meter *',
      'iframe',
      'svg',
      'svg *',
      'script',
      'style',
      'noscript',
      'template',
      'head',
      'head *',
      'title',
      'meta',
      'link',
      'base',
      'datalist',
      'datalist *',

      ...exclusions,
    ];
    if (State.option.contrastIgnore) {
      Exclusions.Contrast = State.option.contrastIgnore
        .split(',')
        .map(($el) => $el.trim())
        .flatMap(($el) => [$el, `${$el} *`])
        .concat(Exclusions.Contrast);
    }

    // Ignore specific regions for readability module.
    Exclusions.Readability = ['nav li', '[role="navigation"] li', ...exclusions];
    if (State.option.readabilityIgnore) {
      Exclusions.Readability = State.option.readabilityIgnore
        .split(',')
        .map(($el) => $el.trim())
        .flatMap(($el) => [$el, `${$el} *`])
        .concat(Exclusions.Readability);
    }

    // Ignore specific headings.
    Exclusions.Headings = State.option.headerIgnore
      ? State.option.headerIgnore.split(',').map(($el) => $el.trim())
      : [];

    // Ignore specific classes within headings.
    Exclusions.HeaderSpan = State.option.headerIgnoreSpan
      ? State.option.headerIgnoreSpan.split(',').map(($el) => $el.trim())
      : [];

    // Don't add heading label or include in panel.
    Exclusions.Outline = State.option.outlineIgnore
      ? State.option.outlineIgnore.split(',').map(($el) => $el.trim())
      : [];

    // Ignore specific images.
    Exclusions.Images = [
      'img[role="presentation"]:not(a img[role="presentation"]), img[aria-hidden="true"]:not(a img[aria-hidden="true"])',
    ];
    if (State.option.imageIgnore) {
      Exclusions.Images = State.option.imageIgnore
        .split(',')
        .map(($el) => $el.trim())
        .concat(Exclusions.Images);
    }

    // Ignore specific links
    Exclusions.Links = ['.anchorjs-link'];
    if (State.option.linkIgnore) {
      Exclusions.Links = State.option.linkIgnore
        .split(',')
        .map(($el) => $el.trim())
        .concat(Exclusions.Links);
    }

    // Ignore specific classes within links.
    Exclusions.LinkSpan = State.option.linkIgnoreSpan
      ? State.option.linkIgnoreSpan.split(',').map(($el) => $el.trim())
      : [];

    // Ignore specific paragraphs.
    Exclusions.Paragraphs = State.option.paragraphIgnore
      ? State.option.paragraphIgnore.split(',').map(($el) => $el.trim())
      : [];
  }

  return {
    initializeRoot,
    Root,
    initializeGlobal,
    Global,
    initializePanelSelectors,
    Panel,
    initializeReadability,
    Readability,
    initializeExclusions,
    Exclusions,
  };
})();

export default Constants;
