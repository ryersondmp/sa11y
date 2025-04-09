
/*!
  * Sa11y, the accessibility quality assurance assistant.
  * @version 4.1.6
  * @author Adam Chaboryk
  * @license GPL-2.0-or-later
  * @copyright © 2020 - 2025 Toronto Metropolitan University.
  * @contact adam.chaboryk@torontomu.ca
  * GitHub: git+https://github.com/ryersondmp/sa11y.git | Website: https://sa11y.netlify.app
  * For all acknowledgements, please visit: https://sa11y.netlify.app/acknowledgements/
  * The above copyright notice shall be included in all copies or substantial portions of the Software.
**/
const defaultOptions = {
  // Target area to check
  checkRoot: 'body',

  // Exclusions
  containerIgnore: '.sa11y-ignore',
  contrastIgnore: '.sr-only',
  outlineIgnore: '',
  headerIgnore: '',
  headerIgnoreSpan: '',
  headerIgnoreStrings: '',
  imageIgnore: '',
  linkIgnore: '',
  linkIgnoreSpan: '',
  linkIgnoreStrings: '',

  // Control panel settings
  aboutContent: '',
  panelPosition: 'right',
  showMovePanelToggle: true,
  checkAllHideToggles: false,
  developerChecksOnByDefault: false,

  // Page outline
  showHinPageOutline: false,
  showTitleInPageOutline: true,

  // Image outline
  showImageOutline: true,
  editImageURLofCMS: '',
  relativePathImageSRC: '',
  relativePathImageID: '',
  ignoreEditImageURL: [],
  ignoreEditImageClass: [],

  // Other features
  delayCheck: 0,
  delayCustomCheck: 500,
  detectSPArouting: false,
  doNotRun: '',
  headless: false,
  selectorPath: false,
  shadowComponents: '',
  autoDetectShadowComponents: false,

  // Annotations
  showGoodImageButton: true,
  showGoodLinkButton: true,
  dismissAnnotations: true,
  dismissAll: true,
  ignoreHiddenOverflow: '',
  insertAnnotationBefore: '',

  // Readability
  readabilityPlugin: true,
  readabilityRoot: 'body',
  readabilityIgnore: '',

  // Contrast
  contrastPlugin: true,
  contrastAAA: false,
  contrastAPCA: false,

  // Other plugins
  customChecks: false,
  linksAdvancedPlugin: true,
  formLabelsPlugin: true,
  embeddedContentPlugin: true,
  developerPlugin: true,
  colourFilterPlugin: true,
  exportResultsPlugin: false,

  // Shared properties for some checks
  susAltStopWords: '',
  linkStopWords: '',
  extraPlaceholderStopWords: '',
  imageWithinLightbox: '',

  // All checks
  checks: {
    // Heading checks
    HEADING_SKIPPED_LEVEL: true,
    HEADING_EMPTY_WITH_IMAGE: true,
    HEADING_EMPTY: true,
    HEADING_FIRST: true,
    HEADING_LONG: {
      maxLength: 170,
    },
    HEADING_MISSING_ONE: true,

    // Image checks
    MISSING_ALT_LINK: true,
    MISSING_ALT_LINK_HAS_TEXT: true,
    MISSING_ALT: true,
    IMAGE_DECORATIVE_CAROUSEL: {
      sources: '.carousel',
    },
    LINK_IMAGE_NO_ALT_TEXT: true,
    LINK_IMAGE_TEXT: true,
    IMAGE_FIGURE_DECORATIVE: true,
    IMAGE_DECORATIVE: true,
    LINK_ALT_FILE_EXT: true,
    ALT_FILE_EXT: true,
    LINK_PLACEHOLDER_ALT: true,
    ALT_PLACEHOLDER: true,
    LINK_SUS_ALT: true,
    SUS_ALT: true,
    LINK_IMAGE_LONG_ALT: {
      maxLength: 250,
    },
    IMAGE_ALT_TOO_LONG: {
      maxLength: 250,
    },
    LINK_IMAGE_ALT: {
      dismissAll: true,
    },
    LINK_IMAGE_ALT_AND_TEXT: true,
    IMAGE_FIGURE_DUPLICATE_ALT: true,
    IMAGE_PASS: {
      dismissAll: true,
    },

    // Link checks
    DUPLICATE_TITLE: {
      dismissAll: true,
    },
    LINK_EMPTY_LABELLEDBY: true,
    LINK_EMPTY_NO_LABEL: true,
    LINK_STOPWORD: true,
    LINK_STOPWORD_ARIA: true,
    LINK_SYMBOLS: true,
    LINK_CLICK_HERE: true,
    LINK_DOI: {
      dismissAll: true,
    },
    LINK_URL: {
      maxLength: 40,
    },
    LINK_LABEL: {
      dismissAll: true,
    },
    LINK_EMPTY: true,
    LINK_IDENTICAL_NAME: {
      dismissAll: true,
    },
    LINK_NEW_TAB: {
      dismissAll: true,
    },
    LINK_FILE_EXT: true,

    // Form labels checks
    LABELS_MISSING_IMAGE_INPUT: true,
    LABELS_INPUT_RESET: true,
    LABELS_MISSING_LABEL: true,
    LABELS_ARIA_LABEL_INPUT: true,
    LABELS_NO_FOR_ATTRIBUTE: true,
    LABELS_PLACEHOLDER: true,

    // Embedded content checks
    EMBED_AUDIO: {
      sources: '',
    },
    EMBED_VIDEO: {
      sources: '',
    },
    EMBED_DATA_VIZ: {
      sources: '',
    },
    EMBED_UNFOCUSABLE: true,
    EMBED_MISSING_TITLE: true,
    EMBED_GENERAL: true,

    // Quality assurance checks
    QA_BAD_LINK: {
      sources: '',
    },
    QA_STRONG_ITALICS: true,
    QA_IN_PAGE_LINK: true,
    QA_DOCUMENT: {
      sources: '',
      dismissAll: true,
    },
    QA_PDF: {
      dismissAll: true,
    },
    QA_BLOCKQUOTE: true,
    TABLES_MISSING_HEADINGS: true,
    TABLES_SEMANTIC_HEADING: true,
    TABLES_EMPTY_HEADING: true,
    QA_FAKE_HEADING: true,
    QA_FAKE_LIST: true,
    QA_UPPERCASE: true,
    QA_UNDERLINE: true,
    QA_SUBSCRIPT: true,
    QA_NESTED_COMPONENTS: {
      sources: '',
    },
    QA_JUSTIFY: true,
    QA_SMALL_TEXT: true,

    // Meta checks
    META_LANG: true,
    META_SCALABLE: true,
    META_MAX: true,
    META_REFRESH: true,

    // Developer checks
    DUPLICATE_ID: true,
    META_TITLE: true,
    UNCONTAINED_LI: true,
    TABINDEX_ATTR: true,
    HIDDEN_FOCUSABLE: true,
    LABEL_IN_NAME: true,
    BTN_EMPTY: true,
    BTN_EMPTY_LABELLEDBY: true,
    BTN_ROLE_IN_NAME: true,

    // Contrast checks
    CONTRAST_WARNING: {
      dismissAll: true,
    },
    CONTRAST_INPUT: true,
    CONTRAST_ERROR: true,
    CONTRAST_PLACEHOLDER: true,
    CONTRAST_ERROR_GRAPHIC: true,
    CONTRAST_WARNING_GRAPHIC: {
      dismissAll: true,
    },
    CONTRAST_UNSUPPORTED: {
      dismissAll: true,
    },
  },
};

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
      .replaceAll(/{C}/g, 'class="colour"')
      .replaceAll(/{B}/g, 'class="badge"')
      .replaceAll(/{ALT}/g, `<strong class="badge">${Lang._('ALT')}</strong>`)
      .replaceAll(/{L}/g, `<strong class="badge"><span class="link-icon"></span><span class="visually-hidden">${Lang._('LINKED')}</span></strong>`);
  },
};

const Constants = (function myConstants() {
  /* **************** */
  /* Initialize Roots */
  /* **************** */
  const Root = {};
  function initializeRoot(desiredRoot, desiredReadabilityRoot) {
    Root.areaToCheck = document.querySelector(desiredRoot);
    if (!Root.areaToCheck) {
      Root.areaToCheck = document.querySelector('body');
    }

    // Readability target area to check.
    Root.Readability = document.querySelector(desiredReadabilityRoot);
    if (!Root.Readability) {
      if (!Root.areaToCheck) {
        Root.Readability = document.querySelector('body');
      } else {
        // If desired root area is not found, use the root target area.
        Root.Readability = Root.areaToCheck;

        // Create a warning if the desired readability root is not found.
        const { readabilityDetails, readabilityToggle } = Constants.Panel;
        const readabilityOn = readabilityToggle?.getAttribute('aria-pressed') === 'true';
        if (readabilityDetails && readabilityOn) {
          const note = document.createElement('div');
          note.id = 'readability-alert';
          note.innerHTML = `<hr aria-hidden="true"><p>${Lang.sprintf('MISSING_READABILITY_ROOT',
            Root.areaToCheck.tagName.toLowerCase(), desiredReadabilityRoot)}</p>`;
          readabilityDetails.insertAdjacentElement('afterend', note);
        }
      }
    }
  }

  /* **************** */
  /* Global constants */
  /* **************** */
  const Global = {};
  function initializeGlobal(option) {
    Global.html = document.querySelector('html');
    Global.headless = option.headless;
    Global.panelPosition = option.panelPosition;
    Global.dismissAnnotations = option.dismissAnnotations;
    Global.aboutContent = option.aboutContent;
    Global.contrastAPCA = option.contrastAPCA;
    Global.contrastSuggestions = option.contrastSuggestions;
    Global.contrastAAA = option.contrastAAA;

    // Toggleable plugins
    Global.developerPlugin = option.developerPlugin;
    Global.colourFilterPlugin = option.colourFilterPlugin;
    Global.checkAllHideToggles = option.checkAllHideToggles;
    Global.exportResultsPlugin = option.exportResultsPlugin;
    Global.readabilityPlugin = option.readabilityPlugin;
    Global.showImageOutline = option.showImageOutline;
    Global.editImageURLofCMS = option.editImageURLofCMS;
    Global.relativePathImageSRC = option.relativePathImageSRC;
    Global.relativePathImageID = option.relativePathImageID;
    Global.ignoreEditImageURL = option.ignoreEditImageURL;
    Global.ignoreEditImageClass = option.ignoreEditImageClass;
    Global.showMovePanelToggle = option.showMovePanelToggle;

    // A11y: Determine scroll behaviour
    let reducedMotion = false;
    if (typeof window.matchMedia === 'function') {
      reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
    }
    Global.scrollBehaviour = (!reducedMotion || reducedMotion.matches) ? 'auto' : 'smooth';

    // i18n
    Global.langDirection = (Global.html.getAttribute('dir') === 'rtl') ? 'rtl' : 'ltr';

    // Check for document types.
    const documentSources = option.checks.QA_DOCUMENT.sources;
    const defaultDocumentSources = 'a[href$=".doc"], a[href$=".docx"], a[href*=".doc?"], a[href*=".docx?"], a[href$=".ppt"], a[href$=".pptx"], a[href*=".ppt?"], a[href*=".pptx?"], a[href^="https://drive.google.com/file"], a[href^="https://docs.google."], a[href^="https://sway."]';
    if (documentSources) {
      Global.documentSources = `${defaultDocumentSources}, ${documentSources}`;
    } else {
      Global.documentSources = defaultDocumentSources;
    }

    /* ********************** */
    /* Embedded Content Setup */
    /* ********************** */

    // Video sources.
    const videoSources = option.checks.EMBED_VIDEO.sources;
    const defaultVideoSources = 'video, [src*="Video"], [src*="video"], [src*="watch"], [src*="youtube.com"], [src*="vimeo.com"], [src*="panopto.com"], [src*="wistia.com"], [src*="dailymotion.com"], [src*="brightcove.com"], [src*="vidyard.com"]';
    if (videoSources) {
      const videos = videoSources.split(/\s*[\s,]\s*/).map(($el) => `[src*="${$el}"]`);
      Global.VideoSources = `${defaultVideoSources}, ${videos.join(', ')}`;
    } else {
      Global.VideoSources = defaultVideoSources;
    }

    // Audio sources.
    const audioSources = option.checks.EMBED_AUDIO.sources;
    const defaultAudioSources = 'audio, [src*="soundcloud.com"], [src*="simplecast.com"], [src*="podbean.com"], [src*="buzzsprout.com"], [src*="blubrry.com"], [src*="transistor.fm"], [src*="fusebox.fm"], [src*="libsyn.com"], [src*="spotify.com"], [src*="podcasts.apple.com"], [src*="castbox.fm"], [src*="megaphone.fm"], [src*="spreaker.com"], [src*="anchor.fm"], [src*="rss.com"], [src*="redcircle.com"]';
    if (audioSources) {
      const audio = audioSources.split(/\s*[\s,]\s*/).map(($el) => `[src*="${$el}"]`);
      Global.AudioSources = `${defaultAudioSources}, ${audio.join(', ')}`;
    } else {
      Global.AudioSources = defaultAudioSources;
    }

    // Data viz sources.
    const dataVizSources = option.checks.EMBED_DATA_VIZ.sources;
    const defaultDataVizSources = '[src*="datastudio"], [src*="tableau"], [src*="lookerstudio"], [src*="powerbi"], [src*="qlik"]';
    if (dataVizSources) {
      const data = dataVizSources.split(/\s*[\s,]\s*/).map(($el) => `[src*="${$el}"]`);
      Global.VisualizationSources = `${defaultDataVizSources}, ${data.join(', ')}`;
    } else {
      Global.VisualizationSources = defaultDataVizSources;
    }

    // Embedded content all
    Global.AllEmbeddedContent = `${Global.VideoSources}, ${Global.AudioSources}, ${Global.VisualizationSources}`;
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
  function initializeReadability(option) {
    if (option.readabilityPlugin) {
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
    // List of Sa11y's interface components.
    Exclusions.Sa11yElements = ['sa11y-heading-label', 'sa11y-heading-anchor', 'sa11y-annotation', 'sa11y-tooltips', 'sa11y-panel-tooltips', 'sa11y-control-panel', '#sa11y-colour-filters', '#sa11y-colour-filters *'];

    // Global elements to exclude.
    const exclusions = ['style', 'script', 'noscript'];

    // Main container exclusions.
    Exclusions.Container = ['#wpadminbar', '#wpadminbar *', ...exclusions];
    if (option.containerIgnore) {
      const containerSelectors = option.containerIgnore.split(',').map((item) => item.trim());
      Exclusions.Container = Exclusions.Container.concat(
        containerSelectors.flatMap((item) => [`${item} *`, item]),
      );
    }

    // Contrast exclusions
    Exclusions.Contrast = ['link', 'hr', 'option', 'audio', 'audio *', 'video', 'video *', 'input[type="color"]', 'input[type="range"]', 'progress', 'progress *', 'meter', 'meter *', 'iframe', 'svg title', 'svg desc', ...exclusions];
    if (option.contrastIgnore) {
      Exclusions.Contrast = option.contrastIgnore
        .split(',')
        .map(($el) => $el.trim())
        .flatMap(($el) => [$el, `${$el} *`])
        .concat(Exclusions.Contrast);
    }

    // Ignore specific regions for readability module.
    Exclusions.Readability = ['nav li', '[role="navigation"] li', ...exclusions];
    if (option.readabilityIgnore) {
      Exclusions.Readability = option.readabilityIgnore
        .split(',')
        .map(($el) => $el.trim())
        .flatMap(($el) => [$el, `${$el} *`])
        .concat(Exclusions.Readability);
    }

    // Ignore specific headings.
    Exclusions.Headings = option.headerIgnore
      ? option.headerIgnore.split(',').map(($el) => $el.trim())
      : [];

    // Ignore specific classes within headings.
    Exclusions.HeaderSpan = option.headerIgnoreSpan
      ? option.headerIgnoreSpan.split(',').map(($el) => $el.trim())
      : [];

    // Don't add heading label or include in panel.
    Exclusions.Outline = option.outlineIgnore
      ? option.outlineIgnore.split(',').map(($el) => $el.trim())
      : [];

    // Ignore specific images.
    Exclusions.Images = ['[role="presentation"]'];
    if (option.imageIgnore) {
      Exclusions.Images = option.imageIgnore.split(',').map(($el) => $el.trim()).concat(Exclusions.Images);
    }

    // Ignore specific links
    Exclusions.Links = ['.anchorjs-link'];
    if (option.linkIgnore) {
      Exclusions.Links = option.linkIgnore.split(',').map(($el) => $el.trim()).concat(Exclusions.Links);
    }

    // Ignore specific classes within links.
    Exclusions.LinkSpan = option.linkIgnoreSpan
      ? option.linkIgnoreSpan.split(',').map(($el) => $el.trim())
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
}());

/**
 * Finds elements in the DOM that match the given selector, within the specified root element, and excluding any specified elements.
 * @param {string} selector - The CSS selector to match elements against.
 * @param {string} desiredRoot - The root element to start the search from. Can be one of 'document', 'readability', 'root', or a custom selector for the desired root element.
 * @param {string} exclude - Elements to exclude from the search, specified as a CSS selector (optional).
 * @returns {Array} - An array of elements that match the given selector.
 */
function find(selector, desiredRoot, exclude) {
  let root;
  if (desiredRoot === 'document') {
    root = document;
  } else if (desiredRoot === 'readability') {
    root = Constants.Readability.Root;
    if (!root) root = Constants.Root.areaToCheck;
  } else if (desiredRoot === 'root') {
    root = Constants.Root.areaToCheck;
    if (!root) root = document.body;
  } else if (desiredRoot === 'panel') {
    root = Constants.Panel.panel;
    if (!root) root = document.body;
  } else {
    root = document.querySelector(desiredRoot);
    if (!root) root = document.body;
  }

  const shadowComponents = document.querySelectorAll('[data-sa11y-has-shadow-root]');
  const shadow = shadowComponents ? ', [data-sa11y-has-shadow-root]' : '';

  // Exclusions are returned as an array & need to become a string for selector.
  const exclusions = Constants.Exclusions.Container.join(', ');
  const additionalExclusions = exclude?.join(', ') || '';

  // Ensure no trailing commas.
  const additional = additionalExclusions ? `, ${additionalExclusions}` : '';

  /* Logic yoinked from Editoria11y */
  // 1. Elements array includes web components in the selector to be used as a placeholder.
  const elements = Array.from(root.querySelectorAll(`:is(${selector}${shadow}):not(${exclusions}${additional})`));
  if (shadowComponents.length) {
    // 2. Dive into the each shadow root and collect an array of its results.
    const shadowFind = [];
    elements.forEach((el, i) => {
      if (el && el.matches && el.matches('[data-sa11y-has-shadow-root]') && el.shadowRoot) {
        shadowFind[i] = el.shadowRoot.querySelectorAll(`:is(${selector}):not(${exclusions}${additional})`);
      }
    });
    // 3. Replace the placeholder with any hits found in the shadow root.
    if (shadowFind.length > 0) {
      for (let index = shadowFind.length - 1; index >= 0; index--) {
        if (shadowFind[index]) {
          elements.splice(index, 1, ...shadowFind[index]);
        }
      }
    }
  }
  // 4. Return the cleaned up array, filtering out <slot> placeholders.
  return elements.filter((node) => node.parentNode.tagName !== 'SLOT');
}

/* eslint-disable no-use-before-define */

/* Get text content of pseudo elements. */
const wrapPseudoContent = (element, string) => {
  const getAltText = (content) => {
    if (content === 'none') return '';
    const match = content.includes('url(') || content.includes('image-set(')
      ? content.match(/\/\s*"([^"]+)"/) // Content after slash, e.g. url('image.jpg') / "alt text";
      : content.match(/"([^"]+)"/); // Content between quotes, e.g. "alt text";
    return match ? match[1] : '';
  };
  const before = getAltText(window.getComputedStyle(element, ':before').getPropertyValue('content'));
  const after = getAltText(window.getComputedStyle(element, ':after').getPropertyValue('content'));
  return `${before}${string}${after}`;
};

/* Sets treeWalker loop to last node before next branch. */
const nextTreeBranch = (tree) => {
  for (let i = 0; i < 1000; i++) {
    if (tree.nextSibling()) {
      // Prepare for continue to advance.
      return tree.previousNode();
    }
    // Next node will be in next branch.
    if (!tree.parentNode()) {
      return false;
    }
  }
  return false;
};

/* Compute ARIA attributes. */
const computeAriaLabel = (element, recursing = false) => {
  const labelledBy = element.getAttribute('aria-labelledby');
  if (!recursing && labelledBy) {
    return labelledBy
      .split(/\s+/)
      .filter((id) => id.trim()) // Exclude empty IDs.
      .map((id) => {
        const targetElement = document.querySelector(`#${CSS.escape(id)}`);
        return targetElement ? computeAccessibleName(targetElement, '', 1) : '';
      }).join(' ');
  }

  const ariaLabel = element.getAttribute('aria-label');
  if (ariaLabel && ariaLabel.trim().length > 0) {
    return ariaLabel;
  }
  return 'noAria';
};

/**
 * Computes the accessible name of an element.
 * @param {Element} element The element for which the accessible name needs to be computed.
 * @param {String} exclusions List of selectors which will be ignored.
 * @param {Number} recursing Recursion depth.
 * @returns {string} The computed accessible name of the element.
 * @kudos to John Jameson, creator of the Editoria11y library, for developing this more robust calculation!
 * @notes Uses a subset of the W3C accessible name algorithm.
*/
const computeAccessibleName = (element, exclusions = [], recursing = 0) => {
  // Return immediately if there is an aria label.
  const hasAria = computeAriaLabel(element, recursing);
  if (hasAria !== 'noAria') {
    return hasAria;
  }

  // Textarea with a title.
  if (element.tagName === 'TEXTAREA' && element.hasAttribute('title')) {
    return element.getAttribute('title');
  }

  // Return immediately if there is only a text node.
  let computedText = '';
  if (!element.children.length) {
    // Just text! Output immediately.
    computedText = wrapPseudoContent(element, element.textContent);
    if (!computedText.trim() && element.hasAttribute('title')) {
      return element.getAttribute('title');
    }
    return computedText;
  }

  // Create tree walker object.
  function createCustomTreeWalker(rootNode, showElement, showText) {
    const acceptNode = (node) => {
      if (showElement && node.nodeType === Node.ELEMENT_NODE) return NodeFilter.FILTER_ACCEPT;
      if (showText && node.nodeType === Node.TEXT_NODE) return NodeFilter.FILTER_ACCEPT;
      return NodeFilter.FILTER_REJECT;
    };
    return document.createTreeWalker(rootNode, NodeFilter.SHOW_ALL, { acceptNode });
  }
  const treeWalker = createCustomTreeWalker(element, true, true);

  // Otherwise, recurse into children.
  let addTitleIfNoName = false;
  let aText = false;
  let count = 0;
  let shouldContinueWalker = true;

  const alwaysExclude = ['noscript', 'style', 'script', 'video', 'audio'];

  // Combine exclusions and alwaysExclude arrays, ensuring no trailing commas.
  const validExclusions = exclusions && exclusions.length ? exclusions.join(', ') : '';
  const excludeSelector = [...(validExclusions ? [validExclusions] : []), ...alwaysExclude].join(', ');

  // Use the excludeSelector in querySelectorAll
  const exclude = element.querySelectorAll(excludeSelector);

  while (treeWalker.nextNode() && shouldContinueWalker) {
    count += 1;

    // Exclusions.
    const currentNodeMatchesExclude = Array.from(exclude).some((excludedNode) => excludedNode.contains(treeWalker.currentNode));

    if (currentNodeMatchesExclude) ; else if (treeWalker.currentNode.nodeType === Node.TEXT_NODE) {
      if (treeWalker.currentNode.parentNode.tagName !== 'SLOT') {
        computedText += ` ${treeWalker.currentNode.nodeValue}`;
      }
    } else if (addTitleIfNoName && !treeWalker.currentNode.closest('a')) {
      if (aText === computedText) {
        computedText += addTitleIfNoName;
      }
      addTitleIfNoName = false;
      aText = false;
    } else if (treeWalker.currentNode.hasAttribute('aria-hidden') && !(recursing && count < 3)) {
      if (!nextTreeBranch(treeWalker)) shouldContinueWalker = false;
    } else {
      const aria = computeAriaLabel(treeWalker.currentNode, recursing);
      if (aria !== 'noAria') {
        computedText += ` ${aria}`;
        if (!nextTreeBranch(treeWalker)) shouldContinueWalker = false;
      } else {
        switch (treeWalker.currentNode.tagName) {
          case 'IMG':
            if (treeWalker.currentNode.hasAttribute('alt')) {
              computedText += treeWalker.currentNode.getAttribute('alt');
            }
            break;
          case 'SVG':
            if (treeWalker.currentNode.hasAttribute('role') === 'img' || treeWalker.currentNode.hasAttribute('role') === 'graphics-document') {
              computedText += computeAriaLabel(treeWalker.currentNode);
            } else {
              const title = treeWalker.currentNode.querySelector('title');
              if (title) {
                computedText += title;
              }
            }
            break;
          case 'A':
            if (treeWalker.currentNode.hasAttribute('title')) {
              addTitleIfNoName = treeWalker.currentNode.getAttribute('title');
              aText = computedText;
            } else {
              addTitleIfNoName = false;
              aText = false;
            }
            computedText += wrapPseudoContent(treeWalker.currentNode, '');
            break;
          case 'SLOT':
            if (treeWalker.currentNode.assignedNodes()) {
              // Slots have specific shadow DOM methods.
              const children = treeWalker.currentNode.assignedNodes();
              let slotText = '';
              children?.forEach((child) => {
                if (child.nodeType === Node.ELEMENT_NODE) {
                  slotText += computeAccessibleName(child);
                } else if (child.nodeType === Node.TEXT_NODE) {
                  slotText += child.nodeValue;
                }
              });
              computedText += slotText;
            }
            computedText += wrapPseudoContent(treeWalker.currentNode, '');
            break;
          default:
            computedText += wrapPseudoContent(treeWalker.currentNode, '');
            break;
        }
      }
    }
  }

  if (addTitleIfNoName && !aText) {
    computedText += ` ${addTitleIfNoName}`;
  }

  // Replace Private Use Area (PUA) unicode characters.
  // https://www.unicode.org/faq/private_use.html
  const puaRegex = /[\uE000-\uF8FF]/gu;
  computedText = computedText.replace(puaRegex, '');

  // If computedText returns blank, fallback on title attribute.
  if (!computedText.trim() && element.hasAttribute('title')) {
    return element.getAttribute('title');
  }

  return computedText;
};

/**
 * Checks if the document has finished loading, and if so, immediately calls the provided callback function. Otherwise, waits for the 'load' event to fire and then calls the callback function.
 * @param {function} callback The callback function to be called when the document finishes loading.
 */
function documentLoadingCheck(callback) {
  if (document.readyState === 'complete') {
    callback();
  } else {
    window.addEventListener('load', callback);
  }
}

/**
 * Checks if an element is visually hidden or hidden based on its attributes and styles.
 * @param {HTMLElement} element The element to check for visibility.
 * @returns {boolean} `true` if the element is visually hidden or hidden, `false` otherwise.
 */
function isElementVisuallyHiddenOrHidden(element) {
  if (element.getAttribute('hidden') || (element.offsetWidth === 0 && element.offsetHeight === 0) || (element.clientHeight === 1 && element.clientWidth === 1)) {
    return true;
  }
  const compStyles = getComputedStyle(element);
  return compStyles.getPropertyValue('display') === 'none';
}

/**
 * Determine whether an element is visually hidden (e.g. .sr-only) based on computed properties.
 * @param {HTMLElement} element The element to check for.
 * @returns {boolean} Returns true if visually hidden based on properties.
 */
function isScreenReaderOnly(element) {
  const style = window.getComputedStyle(element);
  const clipPath = style.getPropertyValue('clip-path');
  const { position } = style;
  const width = parseFloat(style.width);
  const height = parseFloat(style.height);
  const { overflow } = style;
  return (
    (clipPath === 'inset(50%)') || (position === 'absolute' && width === 1 && height === 1 && overflow === 'hidden')
  );
}

/**
 * Checks if an element is hidden (display: none) based on its attributes and styles.
 * @param {HTMLElement} element The element to check for visibility.
 * @returns {boolean} 'true' if the element is hidden (display: none).
 */
function isElementHidden(element) {
  if (element.getAttribute('hidden')) {
    return true;
  }
  const compStyles = getComputedStyle(element);
  return compStyles.getPropertyValue('display') === 'none';
}

/**
 * Escapes HTML special characters in a string.
 * @param {string} string The string to escape.
 * @returns {string} The escaped string with HTML special characters replaced by their corresponding entities.
 */
function escapeHTML(string) {
  const $div = document.createElement('div');
  $div.textContent = string;
  return $div.innerHTML.replaceAll('"', '&quot;').replaceAll("'", '&#039;').replaceAll('`', '&#x60;');
}

/**
 * Decodes/unescapes HTML entities back to their corresponding character.
 * @param {string} string The string.
 * @returns {string} Decoded string.
 */
function decodeHTML(string) {
  return string.replace(/&(#?[a-zA-Z0-9]+);/g, (match, entity) => {
    switch (entity) {
      case 'amp':
        return '&';
      case 'lt':
        return '<';
      case 'gt':
        return '>';
      case 'quot':
        return '\'';
      case '#39':
        return "'"; // Convert single quotes to actual single quotes.
      default:
        // For numeric entities, convert them back to the corresponding character.
        if (entity.charAt(0) === '#') {
          return String.fromCharCode(entity.charAt(1) === 'x' ? parseInt(entity.substr(2), 16) : parseInt(entity.substr(1), 10));
        }
        return match;
    }
  });
}

/**
 * Strips HTML tags from a string.
 * @param {string} string The string.
 * @returns {string} String without any HTML tags.
 */
function stripHTMLtags(string) {
  return string.replace(/<[^>]*>/g, '');
}

/**
 * Sanitizes an HTML string by replacing special characters with their corresponding HTML entities.
 * @param {string} string The HTML string to sanitize.
 * @returns {string} The sanitized HTML string with special characters replaced by their corresponding entities.
 * @link https://portswigger.net/web-security/cross-site-scripting/preventing
 */
function sanitizeHTML(string) {
  return string.replace(/[^\w. ]/gi, (c) => `&#${c.charCodeAt(0)};`);
}

/**
 * Sanitize links (e.g. href and src values).
 * @param {string} string The URL string to sanitize.
 * @returns {string} The sanitized URL if valid, or an empty string if invalid.
 */
function sanitizeURL(string) {
  if (!string) return '#';
  const sanitizedInput = String(string).trim();

  // Remove protocols.
  if (/^javascript:/i.test(sanitizedInput)) return '#';
  if (/^data:/i.test(sanitizedInput)) return '#';

  // Ensure valid protocol.
  const protocols = ['http:', 'https:', 'mailto:', 'tel:', 'ftp:'];
  const hasValidProtocol = protocols.some((protocol) => sanitizedInput.toLowerCase().startsWith(protocol));

  // Assume relative URLs.
  if (!hasValidProtocol && !sanitizedInput.startsWith('/') && !sanitizedInput.startsWith('#')) {
    return `./${sanitizedInput}`;
  }

  // Remove any HTML tags.
  const cleanedString = sanitizedInput.replace(/<[^>]*>/g, '');
  return encodeURI(cleanedString);
}

/**
 * Sanitizes HTML by removing script tags, inline event handlers and any dangerous attributes. It returns a clean version of the HTML string.
 * @param {string} html The HTML string to sanitize.
 * @param {Boolean} allowStyles Preserve inline style attributes.
 * @returns {string} The sanitized HTML string.
 */
function sanitizeHTMLBlock(html, allowStyles = false) {
  const tempDiv = document.createElement('div');
  tempDiv.innerHTML = html;

  // Remove blocks.
  ['script', 'style', 'noscript', 'iframe', 'form'].forEach((tag) => {
    const elements = tempDiv.getElementsByTagName(tag);
    while (elements.length > 0) {
      elements[0].parentNode.removeChild(elements[0]);
    }
  });

  // Remove inline event handlers and dangerous attributes.
  const allElements = Array.from(tempDiv.getElementsByTagName('*'));
  allElements.forEach((element) => {
    Array.from(element.attributes).forEach((attr) => {
      if (attr.name.startsWith('on')) element.removeAttribute(attr.name);
    });
    if (!allowStyles) {
      element.removeAttribute('style');
    }
  });
  return tempDiv.innerHTML;
}

/**
 * Creates a clone of an element while ignoring specified elements or elements matching a selector.
 * Ignored by default: ['noscript', 'script', 'style', 'audio', 'video', 'form', 'iframe']
 * @param {Element} element The element to clone.
 * @param {Array[]} selectors The selector to match elements to be excluded from the clone. Optional.
 * @returns {Element} The cloned element with excluded elements removed.
 */
function fnIgnore(element, selectors = []) {
  const defaultIgnored = ['noscript', 'script', 'style', 'audio', 'video', 'form', 'iframe'];
  const ignore = [...defaultIgnored, ...selectors].join(', ');
  const clone = element.cloneNode(true);
  const exclude = Array.from(clone.querySelectorAll(ignore));
  exclude.forEach(($el) => {
    $el.parentElement.removeChild($el);
  });
  return clone;
}

/**
 * Retrieves the text content of an HTML element and removes extra whitespaces and line breaks.
 * @param {HTMLElement} element The HTML element to retrieve the text content from.
 * @returns {string} The text content of the HTML element with extra whitespaces and line breaks removed.
 */
function getText(element) {
  const ignore = fnIgnore(element);
  return ignore.textContent.replace(/[\r\n]+/g, '').replace(/\s+/g, ' ').trim();
}

/**
 * Removes extra whitespaces and line breaks from a string.
 * @param {string} string The string.
 * @returns {string} String with line breaks and extra white space removed.
 */
function removeWhitespace(string) {
  return string.replace(/[\r\n]+/g, ' ').replace(/\s+/g, ' ').trim();
}

/**
 * Truncate string.
 * @param {*} string The string to truncate.
 * @param {*} maxLength Desired max length of string.
 * @returns Truncated string.
 */
function truncateString(string, maxLength) {
  const truncatedString = string.substring(0, maxLength).trimEnd();
  return string.length > maxLength ? `${truncatedString}...` : string;
}

/**
 * Debounces a callback function, ensuring it is only executed after a certain wait period
 * has passed since the last invocation.
 * @param {function} callback The callback function to debounce.
 * @param {number} wait The wait period in milliseconds before the callback function is executed.
 * @returns {function} The debounced function.
 * @link https://www.joshwcomeau.com/snippets/javascript/debounce/
 */
function debounce$2(callback, wait) {
  let timeoutId = null;
  return (...args) => {
    window.clearTimeout(timeoutId);
    timeoutId = window.setTimeout(() => {
      callback(...args);
    }, wait);
  };
}

/**
 * Finds the visible parent of an element that matches a given CSS property and value.
 * @param {Element} element The element for which the visible parent needs to be found.
 * @param {string} property The CSS property to match against.
 * @param {string} value The value of the CSS property to match against.
 * @returns {Element|null} The visible parent element that matches the given property and value, or null if not found.
 */
function findVisibleParent(element, property, value) {
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
}

/**
 * Calculates the offset top of an element relative to the viewport.
 * @param {Element} element The element for which the offset top needs to be calculated.
 * @returns {Object} An object with a `top` property that represents the offset top of the element relative to the viewport.
 */
function offsetTop(element) {
  const rect = element.getBoundingClientRect();
  const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
  return {
    top: rect.top + scrollTop,
  };
}

/**
 * A utility object for handling storage operations using localStorage and sessionStorage.
 * @param  {String} key
 * @param  {string} value
 * @return {String} Return key.
*/
const store = {
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
 * Adds a pulsing border effect to an element for 2.5 seconds.
 * @param {Element} element The element to which the pulsing border effect needs to be added.
 */
function addPulse(element) {
  const border = 'data-sa11y-pulse-border';
  element.setAttribute(border, '');
  setTimeout(() => {
    element.removeAttribute(border);
  }, 2500);
}

/**
 * Generates a unique key for dismissing items.
 * @param {string} string The string to be prepared for dismissal (without special chars).
 * @returns {string} The truncated string with a maximum of 256 characters.
 */
function prepareDismissal(string) {
  return String(string).replace(/([^0-9a-zA-Z])/g, '').substring(0, 256);
}

/**
 * Generates a selector path for the given DOM element.
 * @param {Element} element The DOM element for which to generate the selector path.
 * @returns {string} The selector path as a string.
 * @link https://www.geeksforgeeks.org/how-to-create-a-function-generateselector-to-generate-css-selector-path-of-a-dom-element/
 * @link https://dev.to/aniket_chauhan/generate-a-css-selector-path-of-a-dom-element-4aim
*/
function generateSelectorPath(element) {
  const path = [];
  let currElement = element;
  while (currElement) {
    let selector = currElement.localName;
    if (currElement.id) {
      selector += `#${currElement.id}`;
      path.unshift(selector);
      break;
    } else if (currElement.className) {
      selector += `.${currElement.className.replace(/\s+/g, '.')}`;
    }
    const parentElement = currElement.parentNode;
    if (parentElement) {
      const siblings = parentElement.children;
      if (siblings.length > 1) {
        const index = Array.prototype.indexOf.call(siblings, currElement) + 1;
        selector += `:nth-child(${index})`;
      }
      path.unshift(selector);
    } else {
      break;
    }
    currElement = currElement.parentNode.host || currElement.parentNode;
  }
  return path.join(' > ');
}

/**
 * Traps focus within an element by looping focus back to the beginning or end
 * when the Tab key is pressed.
 * @param {Element} element The DOM element to trap focus within.
 * @author Hidde de Vries
 * @link https://hidde.blog/using-javascript-to-trap-focus-in-an-element/
*/
function trapFocus(element) {
  const focusable = element.querySelectorAll('a[href]:not([disabled]), button:not([disabled]), input[type="color"]');
  const firstFocusable = focusable[0];
  const lastFocusable = focusable[focusable.length - 1];
  element.addEventListener('keydown', (e) => {
    const isTabPressed = (e.key === 'Tab' || e.keyCode === 9);

    // "document.activeElement" does not work within ShadowDOM.
    const root = element.getRootNode();

    if (!isTabPressed) return;
    if (e.shiftKey) {
      if (root.activeElement === firstFocusable) {
        lastFocusable.focus();
        e.preventDefault();
      }
    } else if (root.activeElement === lastFocusable) {
      firstFocusable.focus();
      e.preventDefault();
    }
  });
}

/**
 * Removes the alert from the Sa11y control panel by clearing its content and removing CSS classes.
 * This function clears the content of the alert element and removes CSS classes 'active' from the main alert element, and 'panel-alert-preview' from the alert preview element.
 * @returns {void}
 */
function removeAlert() {
  const Sa11yPanel = document.querySelector('sa11y-control-panel').shadowRoot;
  const alert = Sa11yPanel.getElementById('panel-alert');
  const alertText = Sa11yPanel.getElementById('panel-alert-text');
  const alertPreview = Sa11yPanel.getElementById('panel-alert-preview');

  alert.classList.remove('active');
  alertPreview.classList.remove('panel-alert-preview');
  while (alertText.firstChild) alertText.removeChild(alertText.firstChild);
  while (alertPreview.firstChild) alertPreview.removeChild(alertPreview.firstChild);
}

/**
 * Creates an alert in the Sa11y control panel with the given alert message and error preview.
 * @param {string} alertMessage The alert message.
 * @param {string} errorPreview The issue's tooltip message (optional).
 * @param {string} extendedPreview The issue's HTML or escaped HTML to be previewed (optional).
 * @returns {void}
 */
function createAlert(alertMessage, errorPreview, extendedPreview) {
  // Clear alert first before creating new one.
  removeAlert();

  // Constants
  const Sa11yPanel = document.querySelector('sa11y-control-panel').shadowRoot;
  const alert = Sa11yPanel.getElementById('panel-alert');
  const alertText = Sa11yPanel.getElementById('panel-alert-text');
  const alertPreview = Sa11yPanel.getElementById('panel-alert-preview');
  const alertClose = Sa11yPanel.getElementById('close-alert');
  const skipButton = Sa11yPanel.getElementById('skip-button');

  alert.classList.add('active');
  alertText.innerHTML = alertMessage;

  // If the issue's element is being previewed.
  const elementPreview = (extendedPreview)
    ? `<div class="element-preview">${extendedPreview}</div>` : '';

  // Alert message or tooltip's message.
  if (errorPreview) {
    alertPreview.classList.add('panel-alert-preview');
    alertPreview.innerHTML = `${elementPreview}<div class="preview-message">${errorPreview}</div>`;
  }

  // A little time before setting focus on the close button.
  setTimeout(() => {
    alertClose.focus();
  }, 300);

  // Closing alert sets focus back to Skip to Issue toggle.
  function closeAlert() {
    removeAlert();
    const focusTarget = skipButton.hasAttribute('disabled')
      ? Sa11yPanel.getElementById('toggle')
      : skipButton;
    focusTarget.focus();
  }
  alertClose.addEventListener('click', closeAlert);

  // Escape key to close alert.
  alert.onkeydown = (e) => {
    const evt = e || window.event;
    if (evt.key === 'Escape' && alert.classList.contains('active')) {
      closeAlert();
    }
  };
}

/**
 * Finds all data-attributes specified in array, and removes them from the document.
 * @param {Array<string>} attributes The array of data-attributes to be reset.
 * @param {string} root The root element to search for elements (optional, defaults to 'document').
 * @returns {void}
 */
function resetAttributes(attributes, root) {
  attributes.forEach((attr) => {
    const reset = find(
      `[${attr}]`,
      `${root}`,
    );
    reset.forEach(($el) => {
      $el.removeAttribute(attr);
    });
  });
}

/**
 * Removes the specified elements from the document.
 * @param {string} root The root element to search for elements (optional, defaults to 'document').
 * @returns {void}
 */
function remove(elements, root) {
  const allElements = find(
    `${elements}`,
    `${root}`,
  );
  allElements.forEach(($el) => {
    $el.parentNode.removeChild($el);
  });
}

/**
 * Checks if a scrollable area within a container element is scrollable or not, and applies appropriate CSS classes and attributes. Make sure to add aria-label manually.
 * @param {Element} scrollArea The scrollable area element to check.
 * @param {Element} container The container element that wraps the scrollable area.
 * @param {Attribute} ariaLabel Give scroll area an accessible name and region landmark.
 */
function isScrollable(scrollArea, container, ariaLabel) {
  setTimeout(() => {
    if (scrollArea.scrollHeight > container.clientHeight) {
      container.classList.add('scrollable');
      scrollArea.setAttribute('tabindex', '0');
      if (ariaLabel) {
        scrollArea.setAttribute('aria-label', ariaLabel);
        scrollArea.setAttribute('role', 'region');
      }
    } else {
      container.classList.remove('scrollable');
    }
  }, 50);
}

/**
 * Get the best image source from an element, considering data-src, srcset, and src attributes.
 * @param {HTMLElement} element - The image element to extract the source from.
 * @returns {string} - The best available source URL.
 */
function getBestImageSource(element) {
  const getLastSrc = (src) => src?.split(',').pop()?.trim()?.split(/\s+/)[0];

  // Return absolute URLs. Necessary for HTML export.
  const resolveUrl = (src) => (src ? new URL(src, window.location.href).href : null);

  const dataSrc = getLastSrc(element.getAttribute('data-src') || element.getAttribute('srcset'));
  if (dataSrc) return resolveUrl(dataSrc);

  const picture = element.closest('picture')?.querySelector('source[srcset]')?.getAttribute('srcset');
  const pictureSrc = getLastSrc(picture);

  if (pictureSrc) return resolveUrl(pictureSrc);
  return resolveUrl(element.getAttribute('src'));
}

/**
 * Converts a Blob object to a Base64-encoded string.
 * @param {Blob} blob - The Blob object to convert.
 * @returns {Promise<string>} A promise that resolves to a Base64 string representation of the Blob.
 */
const blobToBase64 = (blob) => new Promise((resolve, reject) => {
  const reader = new FileReader();
  reader.onloadend = () => {
    let { result } = reader;
    // Ensure the correct MIME type if it's missing or wrong. Necessary for uncommon image formats.
    const detectedMime = blob.type && blob.type.startsWith('image/') ? blob.type : 'image/png'; // Default fallback
    if (result.startsWith('data:application/octet-stream')) {
      result = result.replace('data:application/octet-stream', `data:${detectedMime}`);
    }
    resolve(result);
  };
  reader.onerror = reject;
  reader.readAsDataURL(blob);
});

/**
 * Generate an HTML preview for an issue if it's an image, iframe, audio, or video element.
 * Otherwise, return escaped HTML within <code> tags. Used for Skip to Issue panel alerts and HTML page export.
 * @param {Object} issueObject The issue object.
 * @param {boolean} convertBase64 Optional. Convert image to Base64.
 * @returns {html} Returns HTML.
 */
function generateElementPreview(issueObject, convertBase64 = false) {
  const issueElement = issueObject.element;
  const cleanHTML = sanitizeHTMLBlock(issueObject.htmlPath);
  const truncatedHTML = truncateString(cleanHTML, 600);
  const htmlPath = `<pre><code>${escapeHTML(truncatedHTML)}</code></pre>`;

  // Simple output for basic text elements.
  const simple = (element) => {
    const text = getText(element);
    const truncatedText = truncateString(text, 100);
    return text.length ? sanitizeHTML(truncatedText) : htmlPath;
  };

  const tag = {
    SPAN: simple,
    P: simple,
    A: (element) => {
      const text = getText(element);
      const truncatedText = truncateString(text, 100);
      if (text.length > 1 && element.href && !element.hasAttribute('role')) {
        return `<a href="${sanitizeURL(element.href)}">${sanitizeHTML(truncatedText)}</a>`;
      }
      return htmlPath;
    },
    IMG: (element) => {
      const anchor = element.closest('a[href]');
      const alt = element.alt ? `alt="${sanitizeHTML(element.alt)}"` : 'alt';
      const source = getBestImageSource(element);

      function createImageElement(src) {
        return anchor
          ? `<a href="${sanitizeURL(anchor.href)}" rel="noopener noreferrer"><img src="${src}" ${alt}/></a>`
          : `<img src="${src}" ${alt}/>`;
      }

      // Async handling if converting images to Base64 (for HTML export).
      if (convertBase64) {
        return new Promise((resolve) => {
          if (source) {
            // Make sure we're only converting images from the same domain.
            const isSameDomain = new URL(source, window.location.origin).origin === window.location.origin;
            if (isSameDomain) {
              fetch(source)
                .then((response) => response.blob())
                .then((blob) => blobToBase64(blob))
                .then((base64Source) => {
                  const imageSource = base64Source.startsWith('data:image/')
                    ? base64Source : sanitizeURL(base64Source);
                  resolve(createImageElement(imageSource));
                })
                .catch(() => {
                  resolve(createImageElement(source));
                });
            } else {
              const imageSource = source.startsWith('data:image/') ? source : sanitizeURL(source);
              resolve(createImageElement(imageSource));
            }
          } else {
            resolve(htmlPath);
          }
        });
      }

      // Synchronous handling for skip-to-issue.
      const sanitized = source.startsWith('data:image/') ? source : sanitizeURL(source);
      if (source) return createImageElement(sanitized);
      return htmlPath;
    },
    IFRAME: (element) => {
      const source = element.src;
      const title = element.title ? element.title : '';
      const ariaLabelAttr = element.getAttribute('aria-label');
      const ariaLabel = ariaLabelAttr || '';
      if (source) {
        const iframeTitle = ariaLabel || title;
        return `<iframe src="${sanitizeURL(source)}" aria-label="${sanitizeHTML(iframeTitle)}"></iframe>`;
      }
      return htmlPath;
    },
    AUDIO: () => sanitizeHTMLBlock(issueObject.htmlPath),
    VIDEO: () => sanitizeHTMLBlock(issueObject.htmlPath),
  };

  const tagHandler = tag[issueElement.tagName];
  const elementPreview = tagHandler ? tagHandler(issueElement) : htmlPath;
  return elementPreview;
}

/**
 * Check if an element's visible text is included in the accessible name.
 * To minimize false positives: iterate through all child nodes of the element, checking for visibility.
 * @param {element} $el The element to test.
 * @returns {boolean}
 */
function isVisibleTextInAccessibleName($el) {
  let text = '';
  const accName = computeAccessibleName($el).toLowerCase();
  const nodes = $el.childNodes;
  nodes.forEach((node) => {
    if (node.nodeType === Node.TEXT_NODE) {
      text += node.textContent;
    } else if (node.nodeType === Node.ELEMENT_NODE) {
      // Only return text content if it's not hidden.
      if (!isElementVisuallyHiddenOrHidden(node)) {
        text += node.textContent;
      }
    }
  });

  // Ignore emojis.
  const emojiRegex = /[\p{Emoji_Presentation}\p{Extended_Pictographic}]/gu;
  let visibleText = text.replace(emojiRegex, '');

  // Final visible text.
  visibleText = removeWhitespace(visibleText).toLowerCase();

  // If visible text is just an x character, ignore.
  if (visibleText === 'x') {
    return false;
  }

  // Check if visible text is included in accessible name.
  return visibleText.length !== 0 && !accName.includes(visibleText);
}

/**
 * Standardize the href attribute of a link by removing any trailing slashes and stripping the protocol (http, https) and 'www.' prefix. Used to minimize false positives for link check module.
 * @param {HTMLElement} $el - The element from which to retrieve the href attribute.
 * @returns {string} - The standardized href.
 */
function standardizeHref($el) {
  let href = $el.getAttribute('href');
  href = removeWhitespace(href).toLowerCase();

  // Remove trailing slash if it exists.
  if (href.endsWith('/')) {
    href = href.slice(0, -1);
  }
  // Remove protocol and www., without affecting subdomains.
  return href.replace(/^https?:\/\/(www\.)?/, '');
}

const Elements = (function myElements() {
  const Found = {};
  function initializeElements(option) {
    // Since 4.0.0: For performance, we filter elements instead of dozens of querySelectors on the DOM.
    Found.Everything = find('*', 'root', Constants.Exclusions.Sa11yElements);

    Found.Contrast = Found.Everything.filter(($el) => {
      const matchesSelector = Constants.Exclusions.Contrast.some((exclusion) => $el.matches(exclusion));
      return !matchesSelector && !Constants.Exclusions.Contrast.includes($el);
    });

    Found.Images = Found.Everything.filter(($el) => $el.tagName === 'IMG'
      && !Constants.Exclusions.Images.some((selector) => $el.matches(selector)));

    Found.Links = Found.Everything.filter(($el) => ($el.tagName === 'A' || $el.tagName === 'a')
      && $el.hasAttribute('href')
      && !$el.matches('[role="button"]') // Exclude links with [role="button"]
      && !Constants.Exclusions.Links.some((selector) => $el.matches(selector)));

    // We want headings from the entire document for the Page Outline.
    Found.Headings = find(
      'h1, h2, h3, h4, h5, h6, [role="heading"][aria-level]',
      'document',
      Constants.Exclusions.Headings,
    );
    Found.HeadingOne = find(
      'h1, [role="heading"][aria-level="1"]',
      'document',
      Constants.Exclusions.Headings,
    );

    // Excluded via headerIgnore.
    Found.ExcludedHeadings = Found.Headings.filter((heading) => Constants.Exclusions.Headings.some((exclusion) => heading.matches(exclusion)));

    // Excluded via outlineIgnore.
    Found.ExcludedOutlineHeadings = Found.Headings.filter((heading) => Constants.Exclusions.Outline.some((exclusion) => heading.matches(exclusion)));

    // Merge both headerIgnore and outlineIgnore.
    Found.OutlineIgnore = Elements.Found.ExcludedOutlineHeadings.concat(Elements.Found.ExcludedHeadings);

    // Quality assurance module.
    Found.Paragraphs = Found.Everything.filter(($el) => $el.tagName === 'P'
      && !$el.closest('table'));

    Found.Lists = Found.Everything.filter(($el) => $el.tagName === 'LI');

    Found.Blockquotes = Found.Everything.filter(($el) => $el.tagName === 'BLOCKQUOTE');

    Found.Tables = Found.Everything.filter(($el) => $el.tagName === 'TABLE' && !$el.matches('[role="presentation"]') && !$el.matches('[role="none"]'));

    Found.StrongItalics = Found.Everything.filter(($el) => ['STRONG', 'EM'].includes($el.tagName));

    Found.Subscripts = Found.Everything.filter(($el) => ['SUP', 'SUB'].includes($el.tagName));

    const badLinkSources = option.checks.QA_BAD_LINK.sources;
    Found.CustomErrorLinks = badLinkSources.length
      ? Found.Links.filter(($el) => badLinkSources.split(',').some((selector) => $el.matches(selector.trim()))) : [];

    // Readability.
    const readabilityExclusions = ($el) => Constants.Root.Readability.contains($el)
      && !Constants.Exclusions.Readability.some((selector) => $el.matches(selector));
    Found.Readability = [
      ...Found.Paragraphs.filter(readabilityExclusions),
      ...Found.Lists.filter(readabilityExclusions),
    ];

    // Developer checks.
    const nestedSources = option.checks.QA_NESTED_COMPONENTS.sources || '[role="tablist"], details';
    Found.NestedComponents = nestedSources
      ? Found.Everything.filter(($el) => $el.matches(nestedSources)) : [];

    Found.TabIndex = Found.Everything.filter(($el) => $el.hasAttribute('tabindex')
      && $el.getAttribute('tabindex') !== '0'
      && !$el.getAttribute('tabindex').startsWith('-'));

    Found.Svg = Found.Everything.filter(($el) => $el.tagName === 'svg');

    Found.Buttons = Found.Everything.filter(($el) => $el.tagName === 'BUTTON' || $el.matches('[role="button"]'));

    Found.Inputs = Found.Everything.filter(($el) => ['INPUT', 'SELECT', 'TEXTAREA', 'METER', 'PROGRESS'].includes($el.tagName));

    Found.Labels = Found.Everything.filter(($el) => $el.tagName === 'LABEL');

    // iFrames.
    Found.iframes = Found.Everything.filter(($el) => ['IFRAME', 'AUDIO', 'VIDEO'].includes($el.tagName));
    Found.Videos = Found.iframes.filter(($el) => $el.matches(Constants.Global.VideoSources));
    Found.Audio = Found.iframes.filter(($el) => $el.matches(Constants.Global.AudioSources));
    Found.Visualizations = Found.iframes.filter(($el) => $el.matches(Constants.Global.VisualizationSources));
    Found.EmbeddedContent = Found.iframes.filter(($el) => !$el.matches(Constants.Global.AllEmbeddedContent));

    // Query select <HTML> given that the lang may change on an SPA.
    const html = document.querySelector('html');
    Found.Language = html.getAttribute('lang');
  }

  /* ************* */
  /*  Annotations  */
  /* ************* */
  const Annotations = {};
  function initializeAnnotations() {
    Annotations.Array = find('sa11y-annotation', 'document');
    Annotations.Array.forEach((annotation, i) => {
      annotation.setAttribute('data-sa11y-position', i);
    });
  }

  return {
    initializeElements,
    Found,
    initializeAnnotations,
    Annotations,
  };
}());

var styles$1 = "[data-sa11y-overflow]{overflow:auto!important}[data-sa11y-clone-image-text]{display:none!important}[data-sa11y-readability-period]{clip:rect(1px,1px,1px,1px)!important;border:0!important;clip-path:inset(50%)!important;display:block!important;height:1px!important;overflow:hidden!important;padding:0!important;position:absolute!important;white-space:nowrap!important;width:1px!important}[data-sa11y-error-inline],[data-sa11y-error]{outline:5px solid var(--sa11y-error)!important;outline-offset:2px}[data-sa11y-warning-inline]:not([data-sa11y-error-inline]),[data-sa11y-warning]:not([data-sa11y-error]){outline:5px solid var(--sa11y-warning)!important;outline-offset:2px}[data-sa11y-pulse-border]{animation:pulse 2s 3;box-shadow:0;outline:5px solid var(--sa11y-focus-color)!important}[data-sa11y-pulse-border]:focus,[data-sa11y-pulse-border]:hover{animation:none}@keyframes pulse{0%{box-shadow:0 0 0 5px var(--sa11y-focus-color)}70%{box-shadow:0 0 0 12px var(--sa11y-pulse-color)}to{box-shadow:0 0 0 5px var(--sa11y-pulse-color)}}@media (prefers-reduced-motion:reduce){[data-sa11y-pulse-border]{animation:none!important}}@media (forced-colors:active){[data-sa11y-error-inline],[data-sa11y-error],[data-sa11y-good],[data-sa11y-pulse-border],[data-sa11y-warning-inline],[data-sa11y-warning]{forced-color-adjust:none}}";

/* ************************************************************ */
/*  Auto-detect shadow DOM or process provided web components.  */
/* ************************************************************ */
const addStyleUtilities = (component) => {
  const CSSUtils = component.shadowRoot.querySelectorAll('.sa11y-css-utilities');
  if (CSSUtils.length === 0) {
    const style = document.createElement('style');
    style.setAttribute('class', 'sa11y-css-utilities');
    style.textContent = styles$1;
    component.shadowRoot.appendChild(style);
  }
};

function findShadowComponents(option) {
  if (option.autoDetectShadowComponents) {
    // Elements to ignore.
    const ignore = Constants.Exclusions.Sa11yElements;

    // Search all elements.
    const root = document.querySelector(option.checkRoot);
    const search = (root)
      ? Array.from(root.querySelectorAll(`*:not(${ignore})`))
      : Array.from(document.body.querySelectorAll(`*:not(${ignore})`));

    // Query for open shadow roots & inject CSS utilities into every shadow DOM.
    search.forEach((component) => {
      if (component.shadowRoot && component.shadowRoot.mode === 'open') {
        component.setAttribute('data-sa11y-has-shadow-root', '');
        addStyleUtilities(component);
      }
    });
  } else if (option.shadowComponents) {
    const providedShadow = document.querySelectorAll(option.shadowComponents);
    providedShadow.forEach((component) => {
      component.setAttribute('data-sa11y-has-shadow-root', '');
      addStyleUtilities(component);
    });
  }
}

/* ******************************************************** */
/*  Feature to detect if URL changed for bookmarklet/SPAs.  */
/* ******************************************************** */
function detectPageChanges(detectSPArouting, checkAll, resetAll) {
  if (detectSPArouting === true) {
    // Current URL.
    let url = window.location.href;
    // Debounce function to re-check page.
    const checkURL = debounce$2(async () => {
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

/* ************************************************************ */
/*  Update results array before painting annotations to page.   */
/* ************************************************************ */
function dismissLogic(results, dismissTooltip) {
  // Get dismissed items and re-parse back into object.
  const dismissedIssues = JSON.parse(localStorage.getItem('sa11y-dismissed') || '[]');
  const currentPath = window.location.pathname;

  // Helper function to check if an issue is individually dismissed.
  const isSoloDismissed = (issue, dismissed) => dismissed.key.includes(issue.dismiss)
    && dismissed.href === currentPath
    && (issue.type === 'warning' || issue.type === 'good');

  // Helper function to check if "dismiss all".
  const dismissAll = (issue, dismissed) => typeof dismissed.dismissAll === 'string'
    && issue.dismissAll === dismissed.dismissAll
    && dismissed.href === currentPath;

  // Process individually dismissed issues.
  const soloDismissed = results.filter((issue) => dismissedIssues.some((dismissed) => isSoloDismissed(issue, dismissed)));

  // Process dismiss all issues.
  const allDismissed = results.filter((issue) => dismissedIssues.some((dismissed) => dismissAll(issue, dismissed)));

  // Combine all dismissed results and filter out duplicates.
  const dismissedResults = [...soloDismissed, ...allDismissed];
  const dismissCount = dismissedResults.length;

  // Update results array (exclude dismissed and dismissed all checks).
  const updatedResults = results.filter((issue) => !dismissedResults.some((dismissed) => dismissed.dismiss === issue.dismiss && (issue.type === 'warning' || issue.type === 'good')));

  // Show dismiss button in panel.
  if (dismissCount) {
    Constants.Panel.dismissButton.classList.add('active');
    Constants.Panel.dismissTooltip.innerText = Lang.sprintf('PANEL_DISMISS_BUTTON', dismissCount);
    dismissTooltip.object.setContent(Lang.sprintf('PANEL_DISMISS_BUTTON', dismissCount));
  } else {
    Constants.Panel.dismissButton.classList.remove('active');
  }

  return { dismissedIssues, updatedResults, dismissCount, dismissedResults };
}

/* ************************************************************ */
/*  Logic for tooltip "Dismiss" buttons & panel restore button  */
/* ************************************************************ */
let restoreDismissedHandler;
let dismissHandler;

/* 1. Hide annotation upon click of dismiss button. */
const dismissIssueButton = async (e, results, checkAll, resetAll) => {
  // Get dismissed array from localStorage.
  let savedDismissKeys = JSON.parse(store.getItem('sa11y-dismissed'));
  const dismissButton = e.target;
  const dismissContainer = document.querySelector('sa11y-panel-tooltips');
  dismissContainer.hidden = false;

  // Make sure event listener is attached to dismiss button.
  if (dismissButton.tagName === 'BUTTON' && dismissButton.hasAttribute('data-sa11y-dismiss')) {
    // Find corresponding issue within main results object and mark as dismissed.
    const dismissItem = parseInt(dismissButton.getAttribute('data-sa11y-dismiss'), 10);
    const issue = results.find(($el) => $el.id === dismissItem);

    // Give a one time reminder that dismissed items are temporary.
    if (savedDismissKeys === null) {
      setTimeout(() => createAlert(Lang._('DISMISS_REMINDER')), 0);
      // If no existing entries, create empty array to iterate on.
      savedDismissKeys = [];
    }

    // Update dismiss array.
    if (issue.dismiss) {
      // If dismiss all selected, then indicate so within dismiss object.
      const dismissAllSelected = dismissButton.hasAttribute('data-sa11y-dismiss-all')
        ? issue.dismissAll : '';
      // Dismissal object.
      const dismissalDetails = {
        key: issue.dismiss,
        href: window.location.pathname,
        ...(dismissAllSelected ? { dismissAll: dismissAllSelected } : {}),
      };

      // Get the position of the last annotation that was dismissed.
      const item = find(`[data-sa11y-annotation='${issue.id}']`);
      const latestDismissed = item[0]
        ? item[0].getAttribute('data-sa11y-position') : 0;
      store.setItem('sa11y-latest-dismissed', latestDismissed);

      // Add dismissed item to local storage object.
      store.setItem('sa11y-dismiss-item', JSON.stringify(dismissalDetails));
      savedDismissKeys.push(dismissalDetails);
      store.setItem('sa11y-dismissed', JSON.stringify(savedDismissKeys));
      store.removeItem('sa11y-dismiss-item'); // Remove temporary storage item.

      // Remove tooltip.
      const tooltip = dismissButton?.closest('[data-tippy-root]');
      if (tooltip) {
        setTimeout(() => {
          tooltip.remove();
        }, 0);
      }

      // Async scan upon dismiss.
      resetAll(false);
      await checkAll();
    }
  }
};

/* 2. Restore hidden alerts on the CURRENT page only. */
const restoreDismissButton = async (dismissed, checkAll, resetAll) => {
  const dismissContainer = document.querySelector('sa11y-panel-tooltips');
  dismissContainer.hidden = true; // Prevent flash of tooltip.
  const filtered = dismissed.filter((item) => item.href !== window.location.pathname);
  store.setItem('sa11y-dismissed', JSON.stringify(filtered));
  Constants.Panel.dismissButton.classList.remove('active');

  // Reset & check.
  resetAll(false);
  await checkAll();
};

// Add event listeners.
function dismissButtons(results, dismissed, checkAll, resetAll) {
  if (Constants.Global.dismissAnnotations) {
    // Dismiss buttons.
    dismissHandler = (e) => {
      dismissIssueButton(e, results, checkAll, resetAll);
    };

    // Dismiss button exists in both tooltip and control panel.
    const tooltips = document.querySelector('sa11y-tooltips').shadowRoot;
    tooltips.addEventListener('click', dismissHandler);
    Constants.Panel.panel.addEventListener('click', dismissHandler);
  }

  // Initialize restore alerts button regardless if plugin enabled or not.
  restoreDismissedHandler = () => {
    restoreDismissButton(dismissed, checkAll, resetAll);
  };
  Constants.Panel.dismissButton?.addEventListener('click', restoreDismissedHandler);
}

// Imported by Reset function.
function removeDismissListeners() {
  Constants.Panel.panel?.removeEventListener('click', dismissHandler);
  Constants.Panel.dismissButton?.removeEventListener('click', restoreDismissedHandler);
}

/* ************************************************************** */
/*  DaltonLens SVG filters to simulate color vision deficiencies  */
/*  Source: https://daltonlens.org/opensource-cvd-simulation/
/*  Achromatopsia: https://github.com/chromelens/chromelens/blob/master/lenses/filters/lens_achromatopsia.js */
/* ************************************************************** */
function addColourFilters() {
  if (Constants.Global.colourFilterPlugin) {
    if (Constants.Global.headless === false) {
      const svg = document.createElement('div');
      svg.id = 'sa11y-colour-filters';
      svg.setAttribute('aria-hidden', 'true');
      // Note: Do not set 'display: none;' on parent container, otherwise it won't render in Firefox.
      svg.innerHTML = `
        <!-- DaltonLens SVG filters to simulate color vision deficiencies -->
        <svg id="sa11y-svg-filters" xmlns="http://www.w3.org/2000/svg">
          <filter id="sa11y-protanopia" color-interpolation-filters="linearRGB">
            <feColorMatrix type="matrix" in="SourceGraphic" values="
                0.10889,0.89111,-0.00000,0,0
                0.10889,0.89111,0.00000,0,0
                0.00447,-0.00447,1.00000,0,0
                0,0,0,1,0"
            />
          </filter>
          <filter id="sa11y-deuteranopia" color-interpolation-filters="linearRGB">
            <feColorMatrix type="matrix" in="SourceGraphic" values="
                0.29031,0.70969,-0.00000,0,0
                0.29031,0.70969,-0.00000,0,0
                -0.02197,0.02197,1.00000,0,0
                0,0,0,1,0"
            />
          </filter>
          <filter id="sa11y-tritanopia" color-interpolation-filters="linearRGB">
            <feColorMatrix type="matrix" in="SourceGraphic" result="ProjectionOnPlane1" values="
                1.01354, 0.14268, -0.15622, 0, 0
                -0.01181, 0.87561, 0.13619, 0, 0
                0.07707, 0.81208, 0.11085, 0, 0
                7.92482, -5.66475, -2.26007, 1, -0.2"
            />
            <feComponentTransfer in="ProjectionOnPlane1" result="ProjectionOnPlane1">
                <feFuncA type="discrete" tableValues="0 0 0 0 1"/>
            </feComponentTransfer>
            <feColorMatrix type="matrix" in="SourceGraphic" result="ProjectionOnPlane2" values="
                0.93337, 0.19999, -0.13336, 0, 0
                0.05809, 0.82565, 0.11626, 0, 0
                -0.37923, 1.13825, 0.24098, 0, 0
                0,0,0,1,0"
            />
            <feBlend in="ProjectionOnPlane1" in2="ProjectionOnPlane2" mode="normal"/>
          </filter>
          <filter id="sa11y-monochromacy">
            <feColorMatrix values="0.299,0.587,0.114,0,0,0.299,0.587,0.114,0,0,0.299,0.587,0.114,0,0,0,0,0,1,0"></feColorMatrix>
          </filter>
        </svg>`;
      document.body.appendChild(svg);
    }
  }
}

// Reset colour filters
function resetColourFilters() {
  if (Constants.Global.colourFilterPlugin) {
    Constants.Panel.colourFilterSelect.value = 0;
    Constants.Panel.colourPanel.classList.remove('active');
    Constants.Panel.colourFilterSelect.classList.remove('active');
    Constants.Panel.content.hidden = false;
  }
}

var exportResultsStyles = ":root{--font-primary:system-ui,\"Segoe UI\",roboto,helvetica,arial,sans-serif;--font-secondary:Consolas,monaco,\"Ubuntu Mono\",\"Liberation Mono\",\"Courier New\",Courier,monospace;--body-text:#333;--bg-primary:#fff;--bg-secondary:#f6f8fa;--bg-tertiary:#d7d7d7;--link-primary:#004c9b;--red-text:#d30017;--warning-text:#966f0d;--hr:hsla(0,0%,84%,.3);--sa11y-link-icon-svg:url(\"data:image/svg+xml;charset=utf-8,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 640 512'%3E%3Cpath d='M579.8 267.7c56.5-56.5 56.5-148 0-204.5-50-50-128.8-56.5-186.3-15.4l-1.6 1.1c-14.4 10.3-17.7 30.3-7.4 44.6s30.3 17.7 44.6 7.4l1.6-1.1c32.1-22.9 76-19.3 103.8 8.6 31.5 31.5 31.5 82.5 0 114L422.3 334.8c-31.5 31.5-82.5 31.5-114 0-27.9-27.9-31.5-71.8-8.6-103.8l1.1-1.6c10.3-14.4 6.9-34.4-7.4-44.6s-34.4-6.9-44.6 7.4l-1.1 1.6C206.5 251.2 213 330 263 380c56.5 56.5 148 56.5 204.5 0l112.3-112.3zM60.2 244.3c-56.5 56.5-56.5 148 0 204.5 50 50 128.8 56.5 186.3 15.4l1.6-1.1c14.4-10.3 17.7-30.3 7.4-44.6s-30.3-17.7-44.6-7.4l-1.6 1.1c-32.1 22.9-76 19.3-103.8-8.6C74 372 74 321 105.5 289.5l112.2-112.3c31.5-31.5 82.5-31.5 114 0 27.9 27.9 31.5 71.8 8.6 103.9l-1.1 1.6c-10.3 14.4-6.9 34.4 7.4 44.6s34.4 6.9 44.6-7.4l1.1-1.6C433.5 260.8 427 182 377 132c-56.5-56.5-148-56.5-204.5 0L60.2 244.3z'/%3E%3C/svg%3E\")}@media (prefers-color-scheme:dark){:root{--body-text:#dde8ff;--bg-primary:#0a2051;--bg-secondary:#072c7c;--bg-tertiary:#0041c9;--link-primary:#64b2ff;--red-text:#ffa2a2;--warning-text:#ffdb59;--hr:rgba(0,65,201,.3)}}*{margin:0;padding:0}article,aside,nav,ol,p,pre,section,ul{margin-bottom:1rem}body{background:var(--bg-primary);font-family:var(--font-primary);font-size:1rem;line-height:1.5;margin:0 auto;max-width:70ch;overflow-wrap:break-word;overflow-x:hidden;padding:2rem;word-break:break-word}body,h1,h2,h3{color:var(--body-text)}h1,h2,h3{line-height:1;margin-bottom:8px;padding-bottom:2px;padding-top:.875rem}h1{font-size:2.25rem}h2{font-size:1.85rem}h3{font-size:1.55rem}a{color:var(--link-primary)}a:focus,a:hover{text-decoration:none}footer,header{background:var(--bg-secondary);padding:2rem calc(50vw - 50%)}header{border-bottom:1px solid var(--bg-tertiary);margin:-2rem calc(-50vw + 50%) 2rem}footer{border-top:1px solid var(--bg-tertiary);margin:3rem calc(-50vw + 50%) -2rem;text-align:center}header>:first-child{margin-top:0;padding-top:0}header>:last-child{margin-bottom:0}hr{background:var(--hr);border:none;height:1px;margin:10px 0;opacity:1;padding:0}code,kbd,pre,samp{background:var(--bg-secondary);border:1px solid var(--bg-tertiary);border-radius:4px;font-family:var(--font-secondary);font-size:.9rem;padding:3px 6px}pre{display:block;max-width:100%;overflow:auto;padding:1rem 1.4rem}code pre,pre code{background:inherit;border:0;color:inherit;font-size:inherit;margin:0;padding:0}code pre{display:inline}details{background:var(--bg-primary);border:2px solid var(--link-primary);border-radius:4px;padding:.6rem 1rem}summary{cursor:pointer;font-weight:700}details[open]{padding-bottom:.75rem}details[open] summary{margin-bottom:6px}details[open]>:last-child{margin-bottom:0}.two-columns{display:flex}.column{flex:1;margin-inline-end:20px}.count{max-width:220px}.column dl{width:100%}dl{padding-top:10px}dt{font-weight:700}dd{padding-bottom:10px}ol ol,ol ul,ul ol,ul ul{margin-bottom:0}ul li{margin-bottom:.5rem}ol,ul{padding-left:2rem}li li:has(pre,img,iframe,video,audio){list-style:none;margin-top:1rem}ol li:not(li li){margin-bottom:4rem}iframe,img{background:var(--bg-tertiary);border-radius:5px;display:block;max-width:50%;padding:5px}audio,video{border:0;display:block}.red-text{color:var(--red-text)}.visually-hidden{clip:rect(1px,1px,1px,1px);border:0;clip-path:inset(50%);display:block;height:1px;overflow:hidden;padding:0;position:absolute;white-space:nowrap;width:1px}.badge{border-radius:10px;color:#fff;display:inline;font-size:14px;font-weight:700!important;line-height:1;min-width:10px;outline:1px solid transparent;padding:1px 5px 1.75px;text-align:center;vertical-align:baseline;white-space:nowrap}.error .colour{color:var(--red-text)}.error .badge{background:#d30017;color:#fff}.warning .colour{color:var(--warning-text)}.warning .badge{background:#966f0d;color:#fff}.link-icon{background:#fff;display:inline-block;height:16px;margin-bottom:-3.5px;-webkit-mask:var(--sa11y-link-icon-svg) center no-repeat;mask:var(--sa11y-link-icon-svg) center no-repeat;width:16px}";

/* ************************************************************ */
/*  Export results as CSV or HTML via Blob API.                 */
/* ************************************************************ */

// Generate meta date for both HTML and CSV templates.
function generateMetaData() {
  const today = new Date();
  const day = String(today.getDate()).padStart(2, '0');
  const month = String(today.getMonth() + 1).padStart(2, '0');
  const year = today.getFullYear();
  const date = new Date().toLocaleString();
  const numericDate = `${month}-${day}-${year}`;

  // Page title & URL
  const title = document.querySelector('head title');
  const titleCheck = !title || title.textContent.trim().length === 0;
  const metaTitle = !titleCheck ? title.textContent : '';
  const pageURL = window.location.href;

  return { date, numericDate, titleCheck, metaTitle, pageURL };
}

// Generate HTML template for download.
async function generateHTMLTemplate(results, dismissResults) {
  const errors = results.filter((issue) => issue.type === 'error');
  const warnings = results.filter((issue) => issue.type === 'warning');
  const count = { error: errors.length, warning: warnings.length, dismiss: dismissResults.length };

  async function generateList(issues, type) {
    const types = {
      error: Lang._('ERRORS'),
      warning: Lang._('WARNINGS'),
      dismissed: Lang._('DISMISSED'),
    };
    const heading = types[type];
    const hasIssues = issues.length > 0;

    if (!hasIssues) return '';

    let list = `<h2>${heading}</h2>`;
    let listOpeningTag = `<ol class="${type}">`;
    let listClosingTag = '</ol>';

    if (type === 'dismissed') {
      listOpeningTag = `<details><summary>${Lang.sprintf('PANEL_DISMISS_BUTTON', count.dismiss)}</summary><ol>`;
      listClosingTag = '</details>';
    }

    // Opening tag.
    list += listOpeningTag;

    // Create an array of promises and wait for all of them to resolve.
    const issuePromises = issues.map(async (issue) => {
      let elementPreview = '';
      if (issue.element) {
        const allowedTags = ['IMG', 'IFRAME', 'AUDIO', 'VIDEO'];
        const preview = await generateElementPreview(issue, true);
        if (allowedTags.includes(issue.element.tagName)) {
          elementPreview = `<li><strong>${Lang._('PREVIEW')}:</strong> ${preview}</li><li><strong>${Lang._('ELEMENT')}:</strong> <pre><code>${escapeHTML(issue.htmlPath)}</code></pre></li>`;
        } else {
          elementPreview = `<li><strong>${Lang._('ELEMENT')}:</strong> <pre><code>${escapeHTML(issue.htmlPath)}</code></pre></li>`;
        }
      }
      const cssPath = issue.cssPath
        ? `<li><strong>${Lang._('PATH')}:</strong> <pre><code>${issue.cssPath}</code></pre></li>`
        : '';
      return `<li>${issue.content} <ul>${elementPreview}${cssPath}</ul></li>`;
    });

    // Wait for all promises to resolve.
    const resolvedIssues = await Promise.all(issuePromises);

    // Add resolved issues to the list.
    list += resolvedIssues.join('');

    // Closing tag.
    list += listClosingTag;
    return list;
  }

  const errorsList = await generateList(errors, 'error');
  const warningList = await generateList(warnings, 'warning');
  const dismissedList = await generateList(dismissResults, 'dismissed');

  // Meta information
  const meta = generateMetaData();
  const metaTitle = !meta.titleCheck
    ? `<dt>${Lang._('PAGE_TITLE')}</dt><dd>${meta.metaTitle}</dd>` : '';
  const metaErrors = count.error !== 0
    ? `<dt>${Lang._('ERRORS')}</dt><dd>${count.error}</dd>` : '';
  const metaWarnings = count.warning !== 0
    ? `<dt>${Lang._('WARNINGS')}</dt><dd>${count.warning}</dd>` : '';
  const metaDismissed = count.dismiss !== 0
    ? `<dt>${Lang._('DISMISSED')}</dt><dd>${count.dismiss}</dd>` : '';
  const tool = '<a href="https://sa11y.netlify.app">Sa11y</a>';

  const htmlTemplate = `
      <!DOCTYPE html>
      <html lang="${Lang._('LANG_CODE')}">
      <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>${Lang._('RESULTS')}: ${meta.metaTitle}</title>
        <style>${exportResultsStyles}</style>
      </head>
      <body>
        <header>
          <h1>${Lang._('RESULTS')}</h1>
          <dl class="two-columns">
            <div class="column">
              ${metaTitle}
              <dt>URL</dt>
              <dd><a href="${meta.pageURL}">${meta.pageURL}</a></dd>
              <dt>${Lang._('DATE')}</dt>
              <dd>${meta.date}</dd>
            </div>
            <div class="column count">
              ${metaErrors}
              ${metaWarnings}
              ${metaDismissed}
            </div>
        </dl>
        </header>
        <main>
          ${errorsList}
          ${warningList}
          ${dismissedList}
        </main>
        <footer>
          <p>${Lang.sprintf('GENERATED', tool)}</p>
        </footer>
      </body>
      </html>
    `;
  return htmlTemplate;
}

/* HTML Blob */
async function downloadHTMLTemplate(results, dismissResults) {
  const htmlContent = await generateHTMLTemplate(results, dismissResults);
  const meta = generateMetaData();

  // Create blob
  const blob = new Blob([htmlContent], { type: 'text/html' });
  const link = document.createElement('a');
  const title = !meta.titleCheck ? `_${meta.metaTitle.trim().replace(/ /g, '')}` : '';
  link.href = window.URL.createObjectURL(blob);
  link.download = `Sa11y_${meta.numericDate + title}.html`;
  document.body.appendChild(link);
  link.click();

  // Remove blob
  setTimeout(() => {
    document.body.removeChild(link);
    window.URL.revokeObjectURL(link.href);
  }, 100);
}

/* CSV Blob */
function downloadCSVTemplate(results) {
  const meta = generateMetaData();
  // CSV header row
  const filteredObjects = results.filter((issue) => issue.type === 'warning' || issue.type === 'error')
    .map((issue) => {
      const { type, content, htmlPath, cssPath } = issue;

      // Make issue messages more readable in CSV format.
      const prepContent = content
        .replaceAll(/<span\s+class="visually-hidden"[^>]*>.*?<\/span>/gi, '')
        .replaceAll('<hr aria-hidden="true">', ' | ')
        .replaceAll(/"/g, '""');
      const stripHTML = stripHTMLtags(String(prepContent));
      const encoded = decodeHTML(stripHTML);

      // Column headers.
      const columns = {
        Title: `"${meta.metaTitle}"`,
        URL: `"${meta.pageURL}"`,
        Type: `"${String(type)}"`,
        Issue: `"${encoded}"`,
        Element: `"${htmlPath}"`,
      };
      if (cssPath) columns.Path = `"${cssPath}"`;
      return columns;
    });

  // CSV content
  const headers = Object.keys(filteredObjects[0]);
  const csvContent = `${headers.join(',')}\n${filteredObjects.map((obj) => headers.map((header) => obj[header]).join(',')).join('\n')}`;

  // Create blob.
  const bom = new Uint8Array([0xEF, 0xBB, 0xBF]);
  const blob = new Blob([bom, csvContent], { type: 'text/csv;charset=utf-8;' });
  const url = window.URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.href = window.URL.createObjectURL(blob);
  const fileNameTitle = !meta.titleCheck ? `_${meta.metaTitle.trim().replace(/ /g, '')}` : '';
  link.setAttribute('download', `Sa11y_${meta.numericDate + fileNameTitle}.csv`);
  document.body.appendChild(link);
  link.click();

  // Remove blob.
  setTimeout(() => {
    document.body.removeChild(link);
    window.URL.revokeObjectURL(link.href);
  }, 100);
}

// Attach event listeners.
let exportHTMLHandler;
let exportCSVHandler;
function exportResults(results, dismissResults) {
  if (Constants.Global.exportResultsPlugin) {
    exportHTMLHandler = async () => {
      await downloadHTMLTemplate(results, dismissResults);
    };
    exportCSVHandler = () => {
      downloadCSVTemplate(results);
    };
    Constants.Panel.exportHTML.addEventListener('click', exportHTMLHandler);
    Constants.Panel.exportCSV.addEventListener('click', exportCSVHandler);
  }
}

// Imported by Reset function.
function removeExportListeners() {
  if (Constants.Global.exportResultsPlugin) {
    Constants.Panel.exportHTML.removeEventListener('click', exportHTMLHandler);
    Constants.Panel.exportCSV.removeEventListener('click', exportCSVHandler);
  }
}

const version = '4.1.6';

var styles = ":host{background:var(--sa11y-panel-bg);border-top:5px solid var(--sa11y-panel-bg-splitter);bottom:0;display:block;height:-moz-fit-content;height:fit-content;left:0;position:fixed;right:0;width:100%;z-index:999999}*{-webkit-font-smoothing:auto!important;color:var(--sa11y-panel-primary);font-family:var(--sa11y-font-face)!important;font-size:var(--sa11y-normal-text);line-height:22px!important}#dialog{margin:20px auto;max-width:900px;padding:20px}h2{font-size:var(--sa11y-large-text);margin-top:0}a{color:var(--sa11y-hyperlink);cursor:pointer;text-decoration:underline}a:focus,a:hover{text-decoration:none}p{margin-top:0}.error{background:var(--sa11y-error);border:2px dashed #f08080;color:var(--sa11y-error-text);margin-bottom:0;padding:5px}";

var sharedStyles = ".visually-hidden{clip:rect(1px,1px,1px,1px);border:0;clip-path:inset(50%);display:block;height:1px;overflow:hidden;padding:0;position:absolute;white-space:nowrap;width:1px}[hidden]{display:none!important}.header-text,.header-text-inline,h2{color:var(--sa11y-panel-primary);display:block;font-size:var(--sa11y-large-text);font-weight:600;margin-bottom:3px}.header-text-inline{display:inline-block!important}code{font-family:monospace!important;font-size:calc(var(--sa11y-normal-text) - 1px);font-weight:600}.kbd,code,kbd{background-color:var(--sa11y-panel-badge);border-radius:3.2px;color:var(--sa11y-panel-primary);padding:1.6px 4.8px}.bold{font-weight:600}.error .colour,.red-text{color:var(--sa11y-red-text);font-family:var(--sa11y-font-face)}.warning .colour,.yellow-text{color:var(--sa11y-yellow-text);font-family:var(--sa11y-font-face)}.badge,.normal-badge{background-color:var(--sa11y-panel-badge);border-radius:10px;color:var(--sa11y-panel-primary);display:inline;font-size:14px;font-weight:700!important;line-height:1;min-width:10px;outline:1px solid transparent;padding:1px 5px 1.75px;text-align:center;vertical-align:baseline;white-space:nowrap}.error .badge{background:var(--sa11y-error);color:var(--sa11y-error-text)}.error-badge{background:var(--sa11y-error)!important;color:var(--sa11y-error-text)!important}.warning .badge{background:var(--sa11y-yellow-text);color:var(--sa11y-panel-bg)}.warning-badge{background:var(--sa11y-yellow-text)!important;color:var(--sa11y-panel-bg)!important}.good-contrast{background:var(--sa11y-good)!important;color:var(--sa11y-good-text)!important}#contrast-preview{background-color:#e8e8e8;background-image:linear-gradient(45deg,#ccc 25%,transparent 0,transparent 75%,#ccc 0,#ccc),linear-gradient(45deg,#ccc 25%,transparent 0,transparent 75%,#ccc 0,#ccc);background-position:0 0,5px 5px;background-size:10px 10px;border:2px dashed var(--sa11y-panel-bg-splitter);border-radius:3.2px;line-height:1;margin-top:10px;max-height:100px;overflow:clip;overflow-wrap:break-word;padding:5px}#color-pickers{display:flex;justify-content:space-between;margin-bottom:10px;margin-top:10px}#color-pickers label{align-items:center;display:flex}#color-pickers input{margin-inline-start:7px}input[type=color i]{background:var(--sa11y-panel-bg-secondary);block-size:30px;border-color:var(--sa11y-button-outline);border-radius:50%;border-style:solid;border-width:1px;inline-size:30px;padding:2px}input[type=color i]::-webkit-color-swatch-wrapper{padding:1px}input[type=color i]::-webkit-color-swatch{border-color:var(--sa11y-button-outline);border-radius:50%}input[type=color i]::-moz-color-swatch{border-color:var(--sa11y-button-outline);border-radius:50%}input[type=color i].unknown{box-shadow:0 0 0 2px var(--sa11y-yellow-text)}input[type=color i].unknown:after{align-items:center;color:#fff;content:\"?\";display:flex;font-size:18px;height:24px;justify-content:center;margin:-24px 0;pointer-events:none;position:absolute;width:24px;z-index:2}.close-btn{background:var(--sa11y-panel-bg-secondary);border:2px solid var(--sa11y-button-outline);border-radius:50%;color:var(--sa11y-panel-primary);cursor:pointer;float:var(--sa11y-float-rtl);font-size:var(--sa11y-normal-text);font-weight:400;height:32px;margin:0;position:relative;transition:all .2s ease-in-out;width:32px}.close-btn:focus,.close-btn:hover{background-color:var(--sa11y-shortcut-hover)}.close-btn:after{background:var(--sa11y-setting-switch-bg-off);content:\"\";inset:-7px;-webkit-mask:var(--sa11y-close-btn-svg) center no-repeat;mask:var(--sa11y-close-btn-svg) center no-repeat;position:absolute}@media screen and (forced-colors:active){.close-btn:after{filter:invert(1)}}#container [tabindex=\"-1\"]:focus,#container [tabindex=\"0\"]:focus,#container a:focus,#container button:focus,#container input:focus,#container select:focus{box-shadow:0 0 0 5px var(--sa11y-focus-color);outline:0}#container #panel-controls button:focus,#container .switch:focus{box-shadow:inset 0 0 0 4px var(--sa11y-focus-color);outline:0}#container #panel-controls button:focus:not(:focus-visible),#container [tabindex=\"-1\"]:focus:not(:focus-visible),#container [tabindex=\"0\"]:focus:not(:focus-visible),#container button:focus:not(:focus-visible),#container input:focus:not(:focus-visible),#container select:focus:not(:focus-visible){box-shadow:none;outline:0}#container [tabindex=\"-1\"]:focus-visible,#container [tabindex=\"0\"]:focus-visible,#container a:focus-visible,#container button:not(#panel-controls button):not(.switch):focus-visible,#container input:focus-visible,#container select:focus-visible{box-shadow:0 0 0 5px var(--sa11y-focus-color);outline:0}#container #panel-controls button:focus-visible,#container .switch:focus-visible{box-shadow:inset 0 0 0 4px var(--sa11y-focus-color);outline:0}@media screen and (forced-colors:active){#panel-controls button:focus{border:3px solid transparent}#container [tabindex=\"-1\"]:focus,#container [tabindex=\"0\"]:focus,#container a:focus,#container button:focus,#container select:focus,.close-btn:focus{outline:3px solid transparent!important}}";

class ConsoleErrors extends HTMLElement {
  constructor(error) {
    super();
    this.error = error;
  }

  connectedCallback() {
    const shadow = this.attachShadow({ mode: 'open' });

    // Styles
    const style = document.createElement('style');
    style.innerHTML = styles + sharedStyles;
    shadow.appendChild(style);

    // Container
    const content = document.createElement('div');
    content.setAttribute('id', 'dialog');
    content.setAttribute('tabindex', '-1');

    // Google Form & GitHub error link.
    const url = window.location;
    const google = 'https://forms.gle/sjzK9XykETaoqZv99';

    // GitHub template
    const template = `## Error Description
\`\`\`javascript
${this.error.stack}
\`\`\`

## Details
- **URL:** ${url}
- **Version:** ${version}

## Comments
`;
    const encodedTemplate = encodeURIComponent(template);
    const github = `https://github.com/ryersondmp/sa11y/issues/new?title=Bug%20report&body=${encodedTemplate}`;

    // Message
    content.innerHTML = `
      <button class="close-btn" aria-label="${Lang._('ALERT_CLOSE')}"></button>
      <h2>${Lang._('ERROR')}</h2>
      <p>${Lang.sprintf('CONSOLE_ERROR', google, github)}</p>
      <p class="error">${escapeHTML(this.error.stack)}<br><br>Version: ${version} <br> URL: ${url}</p>
    `;
    shadow.appendChild(content);

    // Set focus and hide Sa11y's toggle.
    setTimeout(() => {
      Constants.Panel.toggle.style.display = 'none';
      const container = document.querySelector('sa11y-console-error');
      const dialog = container.shadowRoot.getElementById('dialog');
      dialog.focus();

      const close = container.shadowRoot.querySelector('.close-btn');
      close.addEventListener('click', () => {
        container.remove();
      });
    }, 0);
  }
}

/* ************************************** */
/*  Initialize main toggle within panel.  */
/* ************************************** */
function mainToggle(checkAll, resetAll) {
  // Keeps checker active when navigating between pages until it is toggled off.
  Constants.Panel.toggle.addEventListener('click', (e) => {
    if (store.getItem('sa11y-panel') === 'Opened') {
      e.preventDefault();
      store.setItem('sa11y-panel', 'Closed');
      Constants.Panel.toggle.classList.remove('on');
      Constants.Panel.toggle.setAttribute('aria-expanded', 'false');
      resetAll();

      if (Constants.Panel.notifCount.innerHTML.trim().length === 0) {
        Constants.Panel.notifBadge.style.display = 'none';
      } else {
        Constants.Panel.notifBadge.style.display = 'flex';
      }
    } else {
      e.preventDefault();
      store.setItem('sa11y-panel', 'Opened');
      Constants.Panel.toggle.classList.add('on');
      Constants.Panel.toggle.setAttribute('aria-expanded', 'true');
      checkAll();
      isScrollable(Constants.Panel.outlineList, Constants.Panel.outlineContent);
    }
  });

  // Remember to leave it open
  if (store.getItem('sa11y-panel') === 'Opened') {
    Constants.Panel.toggle.classList.add('on');
    Constants.Panel.toggle.setAttribute('aria-expanded', 'true');
    Constants.Panel.panel.style.transform = '';
  }

  // Alt + A to enable accessibility checker.
  document.onkeydown = (e) => {
    const evt = e || window.event;
    if (evt.altKey && evt.code === 'KeyA') {
      Constants.Panel.toggle.click();
      Constants.Panel.toggle.focus();
    }
  };
}

var panelStyles = "a,button,code,div,h1,h2,h3,kbd,label,li,ol,p,pre,span,strong,svg,ul{all:unset;box-sizing:border-box!important}:after,:before{all:unset}div{display:block}*{-webkit-font-smoothing:auto!important;font-family:var(--sa11y-font-face)!important}label,li,ol,p,ul{font-size:var(--sa11y-normal-text);font-weight:400;letter-spacing:normal;line-height:22px!important;text-align:start;word-break:break-word}.sa11y-overflow{overflow:auto}iframe,img,video{border:0;display:block;height:auto;max-width:100%}audio{max-width:100%}#toggle{align-items:center;background:linear-gradient(0deg,#e040fb,#00bcd4);background-color:var(--sa11y-setting-switch-bg-off);background-size:150% 150%;border-radius:50%;bottom:var(--sa11y-toggle-y-offset);color:#fff;cursor:pointer;display:flex;height:55px;inset-inline-end:var(--sa11y-toggle-x-offset);justify-content:center;margin:0;overflow:visible;position:fixed;transition:all .2s ease-in-out;width:55px;z-index:2147483644}#toggle.left,#toggle.top-left{inset-inline-start:var(--sa11y-toggle-x-offset)}#toggle.top-left,#toggle.top-right{bottom:unset;top:var(--sa11y-toggle-y-offset)}@media screen and (forced-colors:active){#toggle{background:ButtonFace!important;border:2px solid transparent}}#toggle svg{height:35px;width:35px}#toggle svg path{fill:var(--sa11y-panel-bg)}#toggle:focus,#toggle:hover{animation:sa11y-toggle-gradient 3s ease}#toggle:disabled:focus,#toggle:disabled:hover{animation:none}#toggle.on{background:linear-gradient(180deg,#e040fb,#00bcd4)}#toggle:disabled{background:unset;background-color:var(--sa11y-setting-switch-bg-off);cursor:not-allowed}#notification-badge{text-wrap:nowrap;align-items:center;background-color:#eb0000;border:1px solid transparent;border-radius:12px;color:#fff;display:none;font-size:13.5px;font-weight:400;justify-content:center;line-height:1;min-width:20px;padding:2.5px;position:absolute;right:-3px;top:-5.5px}#notification-badge.notification-badge-warning{background-color:var(--sa11y-warning-hover);border:1px solid var(--sa11y-warning);color:var(--sa11y-warning-text)}#panel{background:var(--sa11y-panel-bg);border-radius:4px;bottom:calc(var(--sa11y-toggle-y-offset) + var(--sa11y-panel-y-gap));box-shadow:0 0 20px 4px rgba(154,161,177,.15),0 4px 80px -8px rgba(36,40,47,.25),0 4px 4px -2px rgba(91,94,105,.15);inset-inline-end:calc(var(--sa11y-toggle-x-offset) + var(--sa11y-panel-x-gap));opacity:0;overflow:visible;position:fixed;transform:scale(0);transform-origin:100% 100%;transition:transform .2s,opacity background .2s .2s;visibility:hidden;z-index:2147483643}#panel.left,#panel.top-left{inset-inline-end:unset;inset-inline-start:calc(var(--sa11y-toggle-x-offset) + var(--sa11y-panel-x-gap))}#panel.top-left,#panel.top-right{bottom:unset;top:calc(var(--sa11y-toggle-y-offset) + var(--sa11y-panel-y-gap) + 10px)}#panel.active{height:auto;opacity:1;transform:scale(1);transform-origin:bottom right;transition:transform .2s,opacity .2s;visibility:visible}@media screen and (forced-colors:active){#panel{border:2px solid transparent}}#panel.active.left,[dir=rtl] #panel.active{transform-origin:bottom left}#panel.active.top-left{transform-origin:top left}#panel.active.top-right{transform-origin:top right}#panel-alert{display:none;opacity:0}#panel-alert.active{display:block;opacity:1}#panel-alert-content{align-items:center;border-bottom:1px solid var(--sa11y-panel-bg-splitter);color:var(--sa11y-panel-primary);line-height:22px;max-height:400px;overflow-y:auto;padding:15px 20px 15px 15px;position:relative}.top-left #panel-alert-content,.top-right #panel-alert-content{border:0}#panel-alert-preview .close-tooltip{display:none}#panel-alert-preview,#panel-alert-text{font-family:var(--sa11y-font-face);font-size:var(--sa11y-normal-text);font-weight:400;line-height:22px}.panel-alert-preview{background:var(--sa11y-panel-bg-secondary);border:1px dashed var(--sa11y-panel-bg-splitter);border-radius:5px;margin-top:15px;padding:10px}.panel-alert-preview ul{margin:0;margin-block-end:0;margin-block-start:0;padding:0;position:relative}.panel-alert-preview li{display:list-item;margin:5px 10px 0 20px;padding-bottom:5px}.element-preview{background-color:var(--sa11y-element-preview);border-radius:3.2px;margin-bottom:10px;overflow-wrap:break-word;padding:5px}button[data-sa11y-dismiss]{background:var(--sa11y-panel-bg-secondary);border:2px solid var(--sa11y-button-outline);border-radius:5px;color:var(--sa11y-panel-primary);cursor:pointer;display:block;margin:10px 5px 5px 0;margin-inline-end:15px;padding:4px 8px}button[data-sa11y-dismiss]:focus,button[data-sa11y-dismiss]:hover{background:var(--sa11y-shortcut-hover)}h2{font-size:var(--sa11y-large-text);font-weight:700}h2,h3{display:block;margin-bottom:3px}h3{font-size:calc(var(--sa11y-large-text) - 1px)}h3,strong{font-weight:600}a:not(#outline-list a):not(.edit){border-bottom:0;color:var(--sa11y-hyperlink);cursor:pointer;font-weight:500;text-decoration:underline}a:focus,a:hover{text-decoration:none!important}hr{background:var(--sa11y-panel-bg-splitter);border:none;height:1px;margin:10px 0;opacity:1;padding:0}#dismiss-button,#skip-button{background:var(--sa11y-panel-bg-secondary);border:1px solid var(--sa11y-button-outline);border-radius:50px;cursor:pointer;display:none;height:36px;margin-inline-end:8px;margin-inline-start:2px;overflow:visible;position:relative;text-align:center;transition:all .1s ease-in-out;width:36px}#dismiss-button.active,#skip-button.active{display:block}#dismiss-button:disabled,#skip-button:disabled{background:none;border:0;box-shadow:none;cursor:default}#dismiss-button:before,#skip-button:before{content:\"\";inset:-5px;position:absolute}#dismiss-button:focus:not(:disabled),#dismiss-button:hover:not(:disabled),#skip-button:focus:not(:disabled),#skip-button:hover:not(:disabled){background-color:var(--sa11y-shortcut-hover)}#panel.left #dismiss-button,#panel.left #skip-button,#panel.top-left #dismiss-button,#panel.top-left #skip-button{margin-inline-end:2px;margin-inline-start:8px}.dismiss-icon{background:var(--sa11y-setting-switch-bg-off);display:inline-block;height:24px;margin-bottom:-4px;-webkit-mask:var(--sa11y-dismiss-icon) center no-repeat;mask:var(--sa11y-dismiss-icon) center no-repeat;width:24px}.dismiss-group{display:flex}@media screen and (forced-colors:active){.dismiss-icon{filter:invert(1)}}#panel-content{align-items:center;color:var(--sa11y-panel-primary);display:flex;padding:6px}#panel-content.errors .panel-icon,#panel-content.good .panel-icon,#panel-content.warnings .panel-icon{height:26px;margin:0 auto;width:26px}#panel-content.errors .panel-icon{background:var(--sa11y-panel-error);margin-top:-2px;-webkit-mask:var(--sa11y-error-svg) center no-repeat;mask:var(--sa11y-error-svg) center no-repeat}#panel-content.good .panel-icon{background:var(--sa11y-good);-webkit-mask:var(--sa11y-good-svg) center no-repeat;mask:var(--sa11y-good-svg) center no-repeat}#panel-content.warnings .panel-icon{background:var(--sa11y-yellow-text);-webkit-mask:var(--sa11y-warning-svg) center no-repeat;mask:var(--sa11y-warning-svg) center no-repeat;transform:scaleX(var(--sa11y-icon-direction))}@media screen and (forced-colors:active){#panel-content.errors .panel-icon,#panel-content.good .panel-icon,#panel-content.warnings .panel-icon{filter:invert(1)}}#panel.left #panel-content,#panel.top-left #panel-content{flex-direction:row-reverse}#status{font-size:var(--sa11y-large-text)}#status,.panel-count{color:var(--sa11y-panel-primary)}.panel-count{background-color:var(--sa11y-panel-badge);border-radius:4px;font-size:15px;font-weight:400;margin-left:3px;margin-right:3px;padding:2px 4px}#images-panel,#outline-panel,#page-issues,#settings-panel{color:var(--sa11y-panel-primary);display:none;opacity:0}#images-panel.active,#outline-panel.active,#page-issues.active,#settings-panel.active{display:block;opacity:1}.panel-header{display:flex;justify-content:space-between;padding:10px 15px 0;text-align:start}#about-content{padding-top:5px}#about-content p{display:block;margin-block-end:1em}#images-content,#outline-content,#page-issues-content,#settings-content{border-bottom:1px solid var(--sa11y-panel-bg-splitter);padding:0 15px 10px}.top-left #images-content,.top-left #outline-content,.top-left #page-issues-content,.top-left #settings-content,.top-right #images-content,.top-right #outline-content,.top-right #page-issues-content,.top-right #settings-content{border:0}#page-issues-content{max-height:160px;overflow-y:auto}#settings-content{max-height:400px;overflow-y:auto}#images-content,#outline-content{max-height:250px;overflow-y:auto}#outline-panel .outline-list-item.sa11y-red-text,#settings-panel .sa11y-red-text{color:var(--sa11y-red-text)}#outline-list{display:block;margin:0;padding:0}#outline-list a{cursor:pointer;display:block;text-decoration:none}#outline-list li{display:block;list-style-type:none;margin-bottom:3px;margin-top:0;padding:0}#outline-list li:first-child{margin-top:5px}#outline-list li a:focus,#outline-list li a:hover{background:var(--sa11y-panel-outline-hover);border-radius:5px;box-shadow:0 0 0 2px var(--sa11y-panel-outline-hover);display:block}#outline-list .outline-2{margin-inline-start:15px}#outline-list .outline-3{margin-inline-start:30px}#outline-list .outline-4{margin-inline-start:45px}#outline-list .outline-5{margin-inline-start:60px}#outline-list .outline-6{margin-inline-start:75px}#images-list{display:block;margin:0;padding:0}#images-list li{border-bottom:1px solid var(--sa11y-panel-bg-splitter);display:block;list-style-type:none;margin:15px 0;overflow:hidden;width:100%}#images-list li:first-child{margin-top:5px}#images-list li:last-child{border:none;margin-bottom:0}#images-list li .alt{padding:2px 5px 10px}#images-list li .edit-block{display:flex;justify-content:flex-end;margin-bottom:15px}#images-list li .edit{background:var(--sa11y-panel-bg-secondary);border:2px solid var(--sa11y-button-outline);border-radius:5px;color:var(--sa11y-panel-primary);cursor:pointer;margin-inline-end:5px;padding:4px 7px;position:relative;text-decoration:none}#images-list li .edit:focus,#images-list li .edit:hover{background-color:var(--sa11y-shortcut-hover)}#images-list li .edit:before{content:\"\";inset:-10px;position:absolute}#images-list li img{border-radius:5px;float:inline-start;margin-block-end:15px;margin-inline-end:10px;max-width:110px}#images-list li.warning .alt{color:var(--sa11y-yellow-text)}#images-list li.warning img{background-color:var(--sa11y-yellow-text);border:5px solid var(--sa11y-yellow-text)}#images-list li.error .alt{color:var(--sa11y-error)}#images-list li.error img{background-color:var(--sa11y-error);border:5px solid var(--sa11y-error)}#images-list li.good img{background-color:var(--sa11y-panel-badge);border:5px solid var(--sa11y-panel-badge)}@media screen and (forced-colors:active){#images-list li img{background-color:ButtonBorder!important}}.move-panel-icon{height:18px;-webkit-mask:var(--sa11y-move-panel-icon);mask:var(--sa11y-move-panel-icon);-webkit-mask-position:center;mask-position:center;-webkit-mask-repeat:no-repeat;mask-repeat:no-repeat;width:18px}.info-icon,.move-panel-icon{background:var(--sa11y-setting-switch-bg-off);display:inline-block;vertical-align:middle}.info-icon{height:20px;margin-top:-2px;-webkit-mask:var(--sa11y-info-icon);mask:var(--sa11y-info-icon);-webkit-mask-position:center;mask-position:center;-webkit-mask-repeat:no-repeat;mask-repeat:no-repeat;width:20px}.sun-icon{-webkit-mask:var(--sa11y-sun-icon);mask:var(--sa11y-sun-icon);-webkit-mask-position:center;mask-position:center;-webkit-mask-repeat:no-repeat;mask-repeat:no-repeat}.moon-icon,.sun-icon{background:var(--sa11y-setting-switch-bg-off);display:inline-block;height:18px;vertical-align:middle;width:18px}.moon-icon{-webkit-mask:var(--sa11y-moon-icon);mask:var(--sa11y-moon-icon);-webkit-mask-position:center;mask-position:center;-webkit-mask-repeat:no-repeat;mask-repeat:no-repeat}.error-icon{background:var(--sa11y-error-text);margin-bottom:-4px;-webkit-mask:var(--sa11y-error-svg);mask:var(--sa11y-error-svg);-webkit-mask-position:center;mask-position:center;-webkit-mask-repeat:no-repeat;mask-repeat:no-repeat}.error-icon,.hidden-icon{display:inline-block;height:16px;width:16px}.hidden-icon{margin-bottom:-3px;-webkit-mask:var(--sa11y-hidden-icon-svg);mask:var(--sa11y-hidden-icon-svg);-webkit-mask-position:center;mask-position:center;-webkit-mask-repeat:no-repeat;mask-repeat:no-repeat}.hidden-icon,.link-icon{background:var(--sa11y-panel-primary)}.link-icon{display:inline-block;height:16px;margin-bottom:-3.5px;-webkit-mask:var(--sa11y-link-icon-svg);mask:var(--sa11y-link-icon-svg);-webkit-mask-position:center;mask-position:center;-webkit-mask-repeat:no-repeat;mask-repeat:no-repeat;width:16px}.error-badge .hidden-icon,.error-badge .link-icon{background:var(--sa11y-error-text)}.warning-badge .hidden-icon,.warning-badge .link-icon{background:var(--sa11y-panel-bg)}.error .link-icon{background:var(--sa11y-error-text)}.warning .link-icon{background:var(--sa11y-panel-bg)}@media screen and (forced-colors:active){.error-icon,.hidden-icon,.info-icon,.link-icon,.moon-icon,.move-panel-icon,.sun-icon{filter:invert(1)}}#panel-controls{border-bottom:1px solid var(--sa11y-panel-bg-splitter);border-radius:0 0 4px 4px;display:flex;overflow:hidden}#panel-controls button{background:var(--sa11y-panel-bg-secondary);background-color:var(--sa11y-panel-bg-secondary);border-inline-end:1px solid var(--sa11y-panel-bg-splitter);border-top:1px solid var(--sa11y-panel-bg-splitter);color:var(--sa11y-panel-secondary);cursor:pointer;display:block;font-size:var(--sa11y-normal-text);font-weight:400;height:30px;line-height:0;margin:0;opacity:1;outline:0;padding:0;position:relative;text-align:center;transition:background .2s;width:100%}#panel-controls button.active,#panel-controls button:hover{background-color:var(--sa11y-shortcut-hover)}#panel-controls button.active{font-weight:600}#export-results-mode,label{color:var(--sa11y-panel-primary);display:inline-block;font-weight:400;margin:0;width:100%}label:not(#colour-filter-mode,#export-results-mode){cursor:pointer}#panel.right #panel-controls:has(#images-toggle):after{content:\"\";width:80px}#panel.left #panel-controls:has(#images-toggle):before{content:\"\";width:50px}#settings-panel .appearance-group,#settings-panel .export-results-group{display:flex;margin:5px 0}#settings-panel .appearance-group button,#settings-panel .export-results-group button{align-items:center;border:2px solid var(--sa11y-setting-switch-bg-off);border-radius:5px;cursor:pointer;display:flex;justify-content:center;margin:2px 0;margin-inline-end:4px;margin-inline-start:8px;min-height:34px;min-width:44px;position:relative;text-align:center;white-space:nowrap}#settings-panel .appearance-group button:focus,#settings-panel .appearance-group button:focus-within,#settings-panel .appearance-group button:hover,#settings-panel .export-results-group button:focus,#settings-panel .export-results-group button:focus-within,#settings-panel .export-results-group button:hover{background:var(--sa11y-shortcut-hover)}#settings-panel .appearance-group button:before,#settings-panel .export-results-group button:before{content:\"\";inset:-7px;position:absolute}#settings-panel .appearance-group button .text,#settings-panel .export-results-group button .text{color:var(--sa11y-setting-switch-bg-off);font-weight:600;padding:0 6px}#settings-panel .switch{background:none;border:0;border-radius:5px;color:var(--sa11y-setting-switch-bg-off);cursor:pointer;font-size:var(--sa11y-normal-text);font-weight:600;height:44px;margin:0;padding:7px 10px;position:relative;text-align:end;width:105px}#settings-panel .switch[aria-pressed=false]:after,#settings-panel .switch[aria-pressed=true]:after{content:\"\";display:inline-block;height:27px;margin:0 4px 4px;vertical-align:middle;width:27px}#settings-panel .switch[aria-pressed=true]:after{background:var(--sa11y-setting-switch-bg-on);-webkit-mask:var(--sa11y-setting-switch-on-svg) center no-repeat;mask:var(--sa11y-setting-switch-on-svg) center no-repeat}#settings-panel .switch[aria-pressed=false]:after{background:var(--sa11y-setting-switch-bg-off);-webkit-mask:var(--sa11y-setting-switch-off-svg) center no-repeat;mask:var(--sa11y-setting-switch-off-svg) center no-repeat}@media screen and (forced-colors:active){#settings-panel .switch[aria-pressed=false]:after,#settings-panel .switch[aria-pressed=true]:after{filter:invert(1)}}#settings-panel #settings-options li{align-items:center;border-bottom:1px solid var(--sa11y-panel-bg-splitter);display:flex;justify-content:space-between;list-style-type:none;padding:1px 0}#settings-panel #settings-options li:last-child{border:none}#page-issues{align-items:center;color:var(--sa11y-panel-primary)}#page-issues-list{display:block;margin-top:4px}#page-issues-list li{display:block;margin:0 0 10px}.top-left.has-page-issues #page-issues,.top-right.has-page-issues #page-issues{border-top:1px solid var(--sa11y-panel-bg-splitter);margin-top:-1px}#panel-colour-filters{align-items:center;color:var(--sa11y-panel-primary);display:none;font-family:var(--sa11y-font-face);font-size:var(--sa11y-normal-text);font-weight:400;line-height:22px}#panel-colour-filters.active{display:flex}#panel-colour-filters p{padding:6px 20px 6px 6px;width:100%}#panel-colour-filters[data-colour=protanopia]{border-bottom:6px solid transparent;-o-border-image:linear-gradient(94deg,#786719 11%,#e0c600 36%,#e0c600 47%,#0059e3 75%,#0042aa 91%);border-image:linear-gradient(94deg,#786719 11%,#e0c600 36%,#e0c600 47%,#0059e3 75%,#0042aa 91%);border-image-slice:1}#panel-colour-filters[data-colour=deuteranopia]{border-bottom:6px solid transparent;-o-border-image:linear-gradient(270deg,#567fdb,#a4a28d 48%,#c3ad14 69%,#a79505);border-image:linear-gradient(270deg,#567fdb,#a4a28d 48%,#c3ad14 69%,#a79505);border-image-slice:1}#panel-colour-filters[data-colour=tritanopia]{border-bottom:6px solid transparent;-o-border-image:linear-gradient(270deg,#b1506f,#0696c1 35%,#f3a9ba 70%,#d91c5d 87%,#fe015c);border-image:linear-gradient(270deg,#b1506f,#0696c1 35%,#f3a9ba 70%,#d91c5d 87%,#fe015c);border-image-slice:1}#panel-colour-filters[data-colour=monochromacy]{border-bottom:6px solid transparent;-o-border-image:linear-gradient(270deg,#000,#a7a7a7 50%,#000);border-image:linear-gradient(270deg,#000,#a7a7a7 50%,#000);border-image-slice:1}#panel-colour-filters[data-colour=protanopia] .panel-icon{background:var(--sa11y-panel-error)}#panel-colour-filters[data-colour=deuteranopia] .panel-icon{background:var(--sa11y-good-hover)}#panel-colour-filters[data-colour=tritanopia] .panel-icon{background:var(--sa11y-blue)}#panel-colour-filters[data-colour=monochromacy] .panel-icon{background:linear-gradient(90deg,#38a459 20%,red 50%,#0077c8 80%)}#panel-colour-filters .panel-icon{height:30px;margin-inline-end:5px;margin-inline-start:10px;-webkit-mask:var(--sa11y-low-vision-icon) center no-repeat;mask:var(--sa11y-low-vision-icon) center no-repeat;width:30px}@media screen and (forced-colors:active){#panel-colour-filters .panel-icon{forced-color-adjust:none}}.select-dropdown{align-items:center;display:flex;position:relative}.select-dropdown:after{border-left:5px solid transparent;border-right:5px solid transparent;border-top:5px solid var(--sa11y-setting-switch-bg-off);content:\" \";inset-inline-end:14px;position:absolute}#colour-filter-select{-webkit-appearance:none;-moz-appearance:none;appearance:none;background:var(--sa11y-panel-bg);border:2px solid var(--sa11y-setting-switch-bg-off);border-radius:5px;color:var(--sa11y-setting-switch-bg-off);cursor:pointer;font-size:var(--sa11y-normal-text);font-weight:600;height:30px;margin-inline-end:4px;padding-inline-end:25px;padding-inline-start:5px;position:relative;text-align:end;vertical-align:middle}#colour-filter-select:focus,#colour-filter-select:hover{background:var(--sa11y-shortcut-hover)}#colour-filter-select.active{box-shadow:0 0 0 2px var(--sa11y-setting-switch-bg-on)}#colour-filter-item label,#colour-filter-item select{margin-bottom:9px;margin-top:10px}#readability-panel{display:none;opacity:0}#readability-panel.active{display:block;opacity:1}.top-left #readability-content,.top-right #readability-content{border-top:1px solid var(--sa11y-panel-bg-splitter)}.left #readability-content,.right #readability-content{border-bottom:1px solid var(--sa11y-panel-bg-splitter)}#readability-content{color:var(--sa11y-panel-primary);padding:10px 15px;width:100%}#readability-details{list-style-type:none;margin:0;padding:0;white-space:normal}#readability-details li{display:inline-block;list-style-type:none;margin:0;padding-inline-end:10px}.readability-score{background-color:var(--sa11y-panel-badge);border-radius:4px;color:var(--sa11y-panel-primary);margin-inline-start:5px;padding:2px 5px}#readability-info{margin-inline-start:10px}#skip-to-page-issues{display:none}#panel.has-page-issues #skip-to-page-issues{clip:rect(0,0,0,0);background:var(--sa11y-panel-bg);border:0;border-radius:5px;display:block;font-weight:600;height:1px;margin:-1px;overflow:hidden;padding:0;position:absolute;white-space:nowrap;width:1px}#panel.has-page-issues #skip-to-page-issues:focus{clip:auto;height:auto;margin:0;overflow:visible;padding:7px 10px;white-space:normal;width:auto;z-index:1}.hide-settings-border{border-bottom:0!important;padding:0 15px!important}.hide-settings-border li:not(#colour-filter-item){display:none!important}.hide-settings-border #about-content{display:none}.hide-settings-border.scrollable:before{all:unset}#contrast-tools{display:none}::-webkit-scrollbar{height:6px;width:7px}::-webkit-scrollbar-thumb{background-color:var(--sa11y-button-outline);border-radius:6px}*{scrollbar-color:var(--sa11y-button-outline);scrollbar-width:thin}.scrollable:before{animation:fade 1s ease-in-out;background:linear-gradient(180deg,transparent 70%,var(--sa11y-panel-scrollable) 100%);background-position:bottom;bottom:auto;content:\"\";height:250px;left:0;position:absolute;right:0;top:auto;transition:opacity 1s ease-in-out;width:100%;z-index:-1}#settings-content.scrollable:before{height:400px}.top-left .scrollable:before,.top-right .scrollable:before{border-radius:5px}#page-issues-content.scrollable:before{height:160px}#panel-alert.scrollable:before{height:200px}@keyframes sa11y-toggle-gradient{0%{background-position:50% 0}50%{background-position:50% 100%}to{background-position:50% 0}}@keyframes fade{0%{opacity:0}to{opacity:1}}@media (prefers-reduced-motion:reduce){*{animation:none!important;transform:none!important;transition:none!important}}#panel{width:400px}#container:lang(en) #panel{width:315px}#container:lang(da) #panel,#container:lang(de) #panel,#container:lang(nb) #panel,#container:lang(pl) #panel,#container:lang(sv) #panel,#container:lang(zh) #panel{width:350px}#container:lang(bg) .switch:not(#export-results-item *),#container:lang(es) .switch:not(#export-results-item *){width:225px!important}#container:not(:lang(en)):not(:lang(de)) .switch{width:205px}";

class ControlPanel extends HTMLElement {
  connectedCallback() {
    this.attachShadow({ mode: 'open' });

    // Styles
    const style = document.createElement('style');
    style.textContent = panelStyles + sharedStyles;
    this.shadowRoot.appendChild(style);

    // Icon for the main toggle.
    const MainToggleIcon = '<svg aria-hidden="true" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path d="M256 48c114.953 0 208 93.029 208 208 0 114.953-93.029 208-208 208-114.953 0-208-93.029-208-208 0-114.953 93.029-208 208-208m0-40C119.033 8 8 119.033 8 256s111.033 248 248 248 248-111.033 248-248S392.967 8 256 8zm0 56C149.961 64 64 149.961 64 256s85.961 192 192 192 192-85.961 192-192S362.039 64 256 64zm0 44c19.882 0 36 16.118 36 36s-16.118 36-36 36-36-16.118-36-36 16.118-36 36-36zm117.741 98.023c-28.712 6.779-55.511 12.748-82.14 15.807.851 101.023 12.306 123.052 25.037 155.621 3.617 9.26-.957 19.698-10.217 23.315-9.261 3.617-19.699-.957-23.316-10.217-8.705-22.308-17.086-40.636-22.261-78.549h-9.686c-5.167 37.851-13.534 56.208-22.262 78.549-3.615 9.255-14.05 13.836-23.315 10.217-9.26-3.617-13.834-14.056-10.217-23.315 12.713-32.541 24.185-54.541 25.037-155.621-26.629-3.058-53.428-9.027-82.141-15.807-8.6-2.031-13.926-10.648-11.895-19.249s10.647-13.926 19.249-11.895c96.686 22.829 124.283 22.783 220.775 0 8.599-2.03 17.218 3.294 19.249 11.895 2.029 8.601-3.297 17.219-11.897 19.249z"/></svg>';

    const rememberDeveloper = store.getItem('sa11y-developer') === 'On';
    const rememberReadability = store.getItem('sa11y-readability') === 'On';
    const rememberTheme = store.getItem('sa11y-theme');
    const rememberPanelPosition = store.getItem('sa11y-position');

    // If admin wants users to check everything, without toggleable checks.
    const checkAll = Constants.Global.checkAllHideToggles;

    /* TOGGLEABLE PLUGINS */
    const developerPlugin = Constants.Global.developerPlugin ? `
      <li id="developer-item" ${checkAll ? 'hidden' : ''}>
        <label id="check-developer" for="developer-toggle">
          ${Lang._('DEVELOPER_CHECKS')} <span class="info-icon"></span>
        </label>
        <button type="button" id="developer-toggle" class="switch"
          aria-labelledby="check-developer" aria-describedby="check-developer-desc"
          aria-pressed="${rememberDeveloper ? 'true' : 'false'}"
        >${rememberDeveloper ? Lang._('ON') : Lang._('OFF')}</button>
        <div id="check-developer-desc" hidden>${Lang._('DEVELOPER_DESC')}</div>
      </li>` : '';

    const readabilityPlugin = Constants.Readability.Plugin ? `
      <li id="readability-item">
        <label id="check-readability" for="readability-toggle">${Lang._('READABILITY')} <span class="info-icon"></span></label>
        <button type="button" id="readability-toggle" aria-labelledby="check-readability" class="switch"
          aria-pressed="${rememberReadability ? 'true' : 'false'}"
        >${rememberReadability ? Lang._('ON') : Lang._('OFF')}</button>
        <div id="check-readability-desc" hidden>${Lang._('READABILITY_DESC')}</div>
      </li>` : '';

    const colourFilterPlugin = Constants.Global.colourFilterPlugin ? `
      <li id="colour-filter-item">
        <label id="colour-filter-mode" for="colour-filter">${Lang._('COLOUR_FILTER')}</label>
        <div class="select-dropdown">
          <select id="colour-filter-select">
            <option value="0">${Lang._('OFF')}</option>
            <option value="1">${Lang._('PROTANOPIA')}</option>
            <option value="2">${Lang._('DEUTERANOPIA')}</option>
            <option value="3">${Lang._('TRITANOPIA')}</option>
            <option value="4">${Lang._('MONOCHROMACY')}</option>
          </select>
        </div>
      </li>` : '';

    const colourFilterPanel = Constants.Global.colourFilterPlugin ? `
      <div id="panel-colour-filters" role="region" aria-labelledby="colour-filter-mode">
        <div id="filter-icon" class="panel-icon" role="img"></div>
        <p>${Lang._('COLOUR_FILTER_MESSAGE')}</p>
      </div>` : '';

    const exportResultsPlugin = Constants.Global.exportResultsPlugin ? `
      <li id="export-results-item">
        <span id="export-results-mode">${Lang._('EXPORT_RESULTS')}</span>
        <div class="export-results-group">
          <button type="button" id="export-csv" aria-describedby="export-results-mode">
            <span class="text">CSV</span>
          </button>
          <button type="button" id="export-html" aria-describedby="export-results-mode">
            <span class="text">HTML</span>
          </button>
        </div>
      </li>` : '';

    /* CUSTOMIZABLE ABOUT SECTION */
    const aboutSection = Constants.Global.aboutContent ? `
      <div id="about-content">${Constants.Global.aboutContent}</div>` : '';

    /* MAIN TOGGLE */
    const mainToggle = `
      <button type="button" aria-expanded="false" id="toggle" part="toggle" aria-describedby="notification-badge" aria-label="${Lang._('MAIN_TOGGLE_LABEL')}" class="${rememberPanelPosition}" disabled>
        ${MainToggleIcon}
        <div id="notification-badge">
          <span id="notification-count"></span>
          <span id="notification-text" class="visually-hidden"></span>
        </div>
      </button>`;

    /* PAGE ISSUES */
    const pageIssues = `
      <div id="page-issues">
        <div class="panel-header">
          <h2 id="page-issues-header" tabindex="-1">${Lang._('PAGE_ISSUES')}</h2>
        </div>
        <div id="page-issues-content">
          <ul id="page-issues-list" role="list" aria-labelledby="page-issues-header"></ul>
        </div>
      </div>`;

    /* PAGE OUTLINE */
    const pageOutline = `
      <div id="outline-panel" role="tabpanel" aria-labelledby="outline-header">
        <div class="panel-header">
          <h2 id="outline-header" tabindex="-1">${Lang._('OUTLINE')}</h2>
        </div>
        <div id="outline-content">
          <ul id="outline-list" tabindex="0" role="list" aria-labelledby="outline-header"></ul>
        </div>
        <div id="readability-panel">
          <div id="readability-content">
            <h2 class="header-text-inline">${Lang._('READABILITY')}</h2>
            <p id="readability-info"></p>
            <ul id="readability-details"></ul>
          </div>
        </div>
      </div>`;

    /* IMAGES OUTLINE */
    const imagesOutline = Constants.Global.showImageOutline ? `
      <div id="images-panel" role="tabpanel" aria-labelledby="images-header">
        <div class="panel-header">
          <h2 id="images-header" tabindex="-1">${Lang._('IMAGES')}</h2>
        </div>
        <div id="images-content">
          <ul id="images-list" tabindex="0" role="list" aria-labelledby="images-header"></ul>
        </div>
      </div>` : '';

    /* PANEL POSITION TOGGLE */
    const leftPressed = rememberPanelPosition === 'left' || rememberPanelPosition === 'top-left';
    const panelMoved = leftPressed ? 'true' : 'false';
    const panelPositionToggle = Constants.Global.showMovePanelToggle
      ? `<button type="button" id="move-panel"
          aria-label="${Lang._('MOVE_PANEL')}"
          aria-pressed="${panelMoved}"
          ><span class="move-panel-icon"></span>
        </button>`
      : '';

    /* PAGE SETTINGS */
    const pageSettings = `
      <div id="settings-panel" role="tabpanel" aria-labelledby="settings-header">
        <div class="panel-header">
          <h2 id="settings-header" tabindex="-1">${Lang._('SETTINGS')}</h2>
        </div>
        <div id="settings-content">
          <ul id="settings-options">
            ${developerPlugin}
            ${readabilityPlugin}
            <li id="appearance-item">
              <span id="appearance-mode">${Lang._('APPEARANCE')}</span>
              <div class="appearance-group">
                <button type="button" id="theme-toggle"
                  aria-label="${Lang._('DARK_MODE')}"
                  aria-pressed=${rememberTheme === 'dark' ? 'true' : 'false'}
                ><span class="moon-icon"></span></button>
                ${panelPositionToggle}
              </div>
            </li>
            ${exportResultsPlugin}
            ${colourFilterPlugin}
          </ul>
          ${aboutSection}
        </div>
      </div>`;

    /* PANEL ALERTS */
    const panelAlerts = `
      <div id="panel-alert" role="alertdialog" aria-labelledby="alert-heading" aria-describedby="panel-alert-text">
        <div id="panel-alert-content">
          <div class="header-text">
            <button type="button" id="close-alert" class="close-btn" aria-label="${Lang._('ALERT_CLOSE')}"></button>
            <h2 id="alert-heading">${Lang._('ALERT_TEXT')}</h2>
          </div>
          <p id="panel-alert-text"></p>
          <div id="panel-alert-preview"></div>
        </div>
      </div>`;

    /* PANEL STATUS */
    const panelStatus = `
      <div id="panel-content">
        <button type="button" id="skip-to-page-issues">
          ${Lang._('SKIP_TO_PAGE_ISSUES')}
        </button>
        <button type="button" id="skip-button">
          <div class="panel-icon"></div>
          <span class="visually-hidden">${Lang._('SHORTCUT_SR')}</span>
        </button>
        <button type="button" id="dismiss-button">
          <div class="dismiss-icon"></div>
          <span id="dismiss-tooltip" class="visually-hidden"></span>
        </button>
        <div id="panel-text">
          <h1 class="visually-hidden">${Lang._('PANEL_HEADING')}</h1>
          <p id="status" aria-live="polite"></p>
        </div>
      </div>`;

    /* OUTLINE & SETTING TAB TOGGLES. */
    const imageToggleButton = `<button type="button" role="tab" aria-expanded="false" id="images-toggle" aria-controls="images-panel">${Lang._('IMAGES')}</button>`;

    const tabToggles = `
      <div id="panel-controls" role="tablist" aria-orientation="horizontal">
        <button type="button" role="tab" aria-expanded="false" id="outline-toggle" aria-controls="outline-panel">${Lang._('OUTLINE')}</button>
        ${Constants.Global.showImageOutline ? imageToggleButton : ''}
        <button type="button" role="tab" aria-expanded="false" id="settings-toggle" aria-controls="settings-panel">${Lang._('SETTINGS')}</button>
      </div>`;

    /* MAIN CONTAINER */
    const container = document.createElement('div');
    container.setAttribute('id', 'container');
    container.setAttribute('role', 'region');
    container.setAttribute('data-sa11y-version', version);
    container.setAttribute('lang', Lang._('LANG_CODE'));
    container.setAttribute('aria-label', Lang._('CONTAINER_LABEL'));
    container.setAttribute('dir', Constants.Global.langDirection);

    if (rememberPanelPosition === 'top-left' || rememberPanelPosition === 'top-right') {
      container.innerHTML = `
        ${mainToggle}
        <div id="panel" class="${rememberPanelPosition}" part="panel">
          ${panelStatus}
          ${colourFilterPanel}
          ${tabToggles}
          ${pageOutline}
          ${imagesOutline}
          ${pageSettings}
          ${panelAlerts}
          ${pageIssues}
        </div>`;
    } else {
      container.innerHTML = `
        ${mainToggle}
        <div id="panel" class="${rememberPanelPosition}" part="panel">
          ${pageIssues}
          ${pageOutline}
          ${imagesOutline}
          ${pageSettings}
          ${panelAlerts}
          ${colourFilterPanel}
          ${panelStatus}
          ${tabToggles}
        </div>`;
    }

    // Append before closing body tag.
    this.shadowRoot.appendChild(container);

    // Initialize global constants/selectors once main panel is constructed.
    Constants.initializePanelSelectors();
  }
}

/* ************************************************************ */
/*  Initialize all toggle switches within Settings panel.       */
/* ************************************************************ */
function settingsPanelToggles(checkAll, resetAll) {
  /* ************************* */
  /*  Panel position toggle    */
  /* ************************* */
  if (Constants.Global.showMovePanelToggle) {
    Constants.Panel.movePanelToggle.onclick = async () => {
      const panelPosition = store.getItem('sa11y-position');
      const [position1, position2] = panelPosition.includes('top')
        ? ['top-right', 'top-left']
        : ['right', 'left'];

      const newPosition = panelPosition === position1 ? position2 : position1;
      store.setItem('sa11y-position', newPosition);

      [position1, position2].forEach((classname) => {
        Constants.Panel.toggle.classList.replace(classname, newPosition);
        Constants.Panel.panel.classList.replace(classname, newPosition);
      });

      Constants.Panel.movePanelToggle.setAttribute('aria-pressed',
        panelPosition === position1 ? 'true' : 'false');
    };
  }

  /* ************************* */
  /*  Developer checks toggle  */
  /* ************************* */
  if (Constants.Global.developerPlugin) {
    Constants.Panel.developerToggle.onclick = async () => {
      if (store.getItem('sa11y-developer') === 'On') {
        store.setItem('sa11y-developer', 'Off');
        Constants.Panel.developerToggle.textContent = `${Lang._('OFF')}`;
        Constants.Panel.developerToggle.setAttribute('aria-pressed', 'false');
        resetAll(false);
        await checkAll();
      } else {
        store.setItem('sa11y-developer', 'On');
        Constants.Panel.developerToggle.textContent = `${Lang._('ON')}`;
        Constants.Panel.developerToggle.setAttribute('aria-pressed', 'true');
        resetAll(false);
        await checkAll();
      }
    };
  } else {
    store.setItem('sa11y-developer', 'Off');
  }

  /* ****************** */
  /*  Readability       */
  /* ****************** */
  if (Constants.Readability.Plugin) {
    Constants.Panel.readabilityToggle.onclick = async () => {
      if (store.getItem('sa11y-readability') === 'On') {
        store.setItem('sa11y-readability', 'Off');
        Constants.Panel.readabilityToggle.textContent = `${Lang._('OFF')}`;
        Constants.Panel.readabilityToggle.setAttribute('aria-pressed', 'false');
        Constants.Panel.readability.classList.remove('active');
        resetAll(false);
        await checkAll();
      } else {
        store.setItem('sa11y-readability', 'On');
        Constants.Panel.readabilityToggle.textContent = `${Lang._('ON')}`;
        Constants.Panel.readabilityToggle.setAttribute('aria-pressed', 'true');
        Constants.Panel.readability.classList.add('active');
        resetAll(false);
        await checkAll();
      }
    };

    if (store.getItem('sa11y-readability') === 'On') {
      Constants.Panel.readability.classList.add('active');
    }
  }

  /**
   * Toggle: Dark Mode
   * Credits: Derek Kedziora
   * @link https://derekkedziora.com/blog/dark-mode-revisited
  */
  const systemInitiatedDark = window.matchMedia('(prefers-color-scheme: dark)');
  const { themeToggle } = Constants.Panel;
  const { html } = Constants.Global;

  const storeTheme = (theme) => {
    html.setAttribute('data-sa11y-theme', theme);
    store.setItem('sa11y-theme', theme);
    const icon = themeToggle.querySelector('span').classList;
    icon.toggle('moon-icon', theme === 'light');
    icon.toggle('sun-icon', theme === 'dark');
    themeToggle.setAttribute('aria-pressed', theme === 'dark' ? 'true' : 'false');
  };

  // Initial theme setup.
  const initialTheme = store.getItem('sa11y-theme') || (systemInitiatedDark.matches ? 'dark' : 'light');
  storeTheme(initialTheme);

  // Listen to system theme changes.
  systemInitiatedDark.addEventListener('change', () => {
    storeTheme(systemInitiatedDark.matches ? 'dark' : 'light');
  });

  // Toggle theme on based on toggle switch.
  themeToggle.onclick = () => {
    const currentTheme = store.getItem('sa11y-theme') || (systemInitiatedDark.matches ? 'dark' : 'light');
    const preferredTheme = currentTheme === 'dark' ? 'light' : 'dark';
    storeTheme(preferredTheme);
  };

  /* ****************** */
  /*  Colour filters    */
  /* ****************** */
  if (Constants.Global.colourFilterPlugin) {
    Constants.Panel.colourFilterSelect.addEventListener('change', async () => {
      const option = parseInt(Constants.Panel.colourFilterSelect.value, 10);

      const filters = [
        'protanopia',
        'deuteranopia',
        'tritanopia',
        'monochromacy',
      ];

      const icons = [
        Lang._('RED_EYE'),
        Lang._('GREEN_EYE'),
        Lang._('BLUE_EYE'),
        Lang._('MONO_EYE'),
      ];

      if (option >= 1 && option <= 4) {
        if (window.matchMedia('(forced-colors: active)').matches) {
          createAlert(Lang._('COLOUR_FILTER_HIGH_CONTRAST'));
        } else {
          // Set attributes.
          Constants.Root.areaToCheck.setAttribute('data-sa11y-filter', filters[option - 1]);
          Constants.Panel.colourFilterIcon.setAttribute('aria-label', icons[option - 1]);

          // Remove page markup while filters are applied. Otherwise it may confuse content authors.
          resetAttributes([
            'data-sa11y-error',
            'data-sa11y-warning',
            'data-sa11y-good',
            'data-sa11y-error-inline',
            'data-sa11y-warning-inline',
            'data-sa11y-overflow',
          ], 'document');
          remove([
            'sa11y-annotation',
            'sa11y-tooltips',
            'sa11y-heading-label',
          ], 'document');

          // Disable skip to issue button.
          Constants.Panel.skipButton.disabled = true;
          Constants.Panel.pageIssues.classList.remove('active');

          // Hide all settings while Colour Filters are enabled.
          Constants.Panel.settingsContent.classList.add('hide-settings-border');

          // Make panel visible.
          Constants.Panel.colourFilterSelect.classList.add('active');
          Constants.Panel.colourPanel.classList.add('active');
          Constants.Panel.colourPanel.setAttribute('data-colour', filters[option - 1]);

          // Hide error/warning count.
          Constants.Panel.content.hidden = true;
        }
      } else {
        // Restore panel.
        Constants.Root.areaToCheck.removeAttribute('data-sa11y-filter');
        Constants.Panel.settingsContent.classList.remove('hide-settings-border');

        // Hide colour filter panel.
        Constants.Panel.colourFilterSelect.classList.remove('active');
        Constants.Panel.colourPanel.classList.remove('active');
        Constants.Panel.colourPanel.removeAttribute('data-colour');

        // Show error/warning count.
        Constants.Panel.content.hidden = false;
        resetAll(false);
        await checkAll();
      }
    });
  }
}

/* eslint-disable no-return-assign */

/**
 * OUTLINE PANEL.
 */
const openOutline = () => {
  Constants.Panel.outlineToggle.classList.add('active');
  Constants.Panel.outline.classList.add('active');
  Constants.Panel.outlineToggle.setAttribute('aria-expanded', 'true');
  store.setItem('sa11y-outline', 'Opened');
  isScrollable(Constants.Panel.outlineList, Constants.Panel.outlineContent);

  // Toggle visibility of heading labels
  const headingLabels = find('sa11y-heading-label', 'root');
  headingLabels.forEach(($el) => $el.hidden = false);

  const event = new CustomEvent('sa11y-build-heading-outline');
  document.dispatchEvent(event);
};

const closeOutline = () => {
  Constants.Panel.outline.classList.remove('active');
  Constants.Panel.outlineToggle.classList.remove('active');
  Constants.Panel.outlineToggle.setAttribute('aria-expanded', 'false');
  store.setItem('sa11y-outline', 'Closed');

  // Toggle visibility of heading labels
  const headingLabels = find('sa11y-heading-label', 'root');
  headingLabels.forEach(($el) => $el.hidden = true);
};

/**
 * IMAGES PANEL.
 */
const openImages = () => {
  Constants.Panel.imagesToggle.classList.add('active');
  Constants.Panel.images.classList.add('active');
  Constants.Panel.imagesToggle.setAttribute('aria-expanded', 'true');
  store.setItem('sa11y-images', 'Opened');
  isScrollable(Constants.Panel.imagesList, Constants.Panel.imagesContent);

  const event = new CustomEvent('sa11y-build-image-outline');
  document.dispatchEvent(event);
};

const closeImages = () => {
  if (Constants.Global.showImageOutline) {
    Constants.Panel.imagesToggle.classList.remove('active');
    Constants.Panel.images.classList.remove('active');
    Constants.Panel.imagesToggle.setAttribute('aria-expanded', 'false');
    store.setItem('sa11y-images', 'Closed');
  }
};

/**
 * SETTINGS PANEL.
 */
const openSettings = () => {
  Constants.Panel.settingsToggle.classList.add('active');
  Constants.Panel.settings.classList.add('active');
  Constants.Panel.settingsToggle.setAttribute('aria-expanded', 'true');
  store.setItem('sa11y-settings', 'Opened');
  isScrollable(
    Constants.Panel.settingsContent,
    Constants.Panel.settingsContent,
    Lang._('SETTINGS'),
  );
};

const closeSettings = () => {
  Constants.Panel.settings.classList.remove('active');
  Constants.Panel.settingsToggle.classList.remove('active');
  Constants.Panel.settingsToggle.setAttribute('aria-expanded', 'false');
  store.setItem('sa11y-settings', 'Closed');
};

/* **************************************************************** */
/*  Main panel: Initialize Show Outline and Settings buttons/tabs.  */
/* **************************************************************** */
function initializePanelToggles() {
  /* **************** */
  /*  Outline panel   */
  /* **************** */
  Constants.Panel.outlineToggle.addEventListener('click', () => {
    if (Constants.Panel.outlineToggle.getAttribute('aria-expanded') === 'true') {
      closeOutline();
    } else {
      openOutline();
      closeSettings();
      closeImages();
    }

    // Set focus on Page Outline heading for accessibility.
    Constants.Panel.outlineHeader.focus();
  });

  // Remember to leave outline open
  if (store.getItem('sa11y-outline') === 'Opened') {
    openOutline();
  }

  /* **************** */
  /*  Images panel   */
  /* **************** */
  if (Constants.Global.showImageOutline) {
    Constants.Panel.imagesToggle.addEventListener('click', () => {
      if (Constants.Panel.imagesToggle.getAttribute('aria-expanded') === 'true') {
        closeImages();
      } else {
        openImages();
        closeOutline();
        closeSettings();
      }

      // Set focus on Images heading for accessibility.
      Constants.Panel.imagesHeader.focus();
    });

    // Remember to leave outline open
    if (store.getItem('sa11y-images') === 'Opened') {
      openImages();
    }
  }

  /* **************** */
  /*  Settings panel  */
  /* **************** */
  Constants.Panel.settingsToggle.addEventListener('click', () => {
    if (Constants.Panel.settingsToggle.getAttribute('aria-expanded') === 'true') {
      closeSettings();
    } else {
      openSettings();
      closeOutline();
      closeImages();
    }

    // Set focus on Settings heading for accessibility.
    Constants.Panel.settingsHeader.focus();
  });

  // Remember to leave settings open
  if (store.getItem('sa11y-settings') === 'Opened') {
    openSettings();
  }

  // Accessibility: Skip link to Page Issues
  Constants.Panel.skipToPageIssues.addEventListener('click', () => {
    Constants.Panel.pageIssuesHeader.focus();
  });

  /* ******************************** */
  /*  Better keyboard accessibility.  */
  /* ******************************** */
  const tabs = Constants.Panel.panel.querySelectorAll('[role=tab]');
  let currentIndex = Array.from(tabs).findIndex((tab) => tab.classList.contains('active'));
  tabs.forEach((tab) => {
    tab.addEventListener('keydown', (e) => {
      if (e.key === 'ArrowRight') {
        e.preventDefault();
        currentIndex = (currentIndex + 1) % tabs.length;
        tabs[currentIndex].focus();
      } else if (e.key === 'ArrowLeft') {
        e.preventDefault();
        currentIndex = (currentIndex - 1 + tabs.length) % tabs.length;
        tabs[currentIndex].focus();
      }
    });
  });
}

/**
 * Create Page Outline.
*/

function generatePageOutline(dismissed, headingOutline, option) {
  const outlineHandler = () => {
    // Create a single array that gets appended to heading outline.
    const outlineArray = [];

    // Find all dismissed headings and update headingOutline array.
    const findDismissedHeadings = dismissed.map((e) => headingOutline.find((f) => e.key === f.dismiss && e.href === window.location.pathname)).filter(Boolean);
    findDismissedHeadings.forEach(($el) => Object.assign($el, { dismissedHeading: true }));

    // Show meta page title in Page Outline.
    let outlineItem;
    if (option.showTitleInPageOutline) {
      const metaTitleElement = document.querySelector('head title');
      if (!metaTitleElement || metaTitleElement.textContent.trim().length === 0) {
        outlineItem = `<li><div class="badge error-badge"><span aria-hidden="true"><span class="error-icon"></span></span> ${Lang._('TITLE')}</div> <div class="badge error-badge">${Lang._('MISSING')}</div></li>`;
      } else {
        const titleText = getText(metaTitleElement);
        outlineItem = `<li><span class="badge">${Lang._('TITLE')}</span> ${sanitizeHTML(titleText)}</li>`;
      }
      outlineArray.push(outlineItem);
    }

    // Iterate through object that contains all headings (and error type).
    headingOutline.forEach((heading) => {
      const $el = heading.element;
      const level = heading.headingLevel;
      const headingText = heading.text;
      const i = heading.index;
      const issue = heading.type;
      const visibility = heading.hidden;
      const parent = heading.visibleParent;
      const dismissedH = heading.dismissedHeading;
      const { isWithinRoot } = heading;

      // Filter out specified headings in outlineIgnore and headerIgnore props.
      if (!Elements.Found.OutlineIgnore.includes($el)) {
        // Indicate if heading is totally hidden or visually hidden.
        const visibleIcon = (visibility === true) ? '<span class="hidden-icon"></span><span class="visually-hidden">Hidden</span>' : '';
        const visibleStatus = (visibility === true) ? 'class="hidden-h"' : '';
        const badgeH = (option.showHinPageOutline === true || option.showHinPageOutline === 1) ? 'H' : '';

        let append;
        if (issue === 'error' && isWithinRoot === true) {
          append = `
            <li class="outline-${level}">
              <a role="button" id="sa11y-link-${i}" tabindex="-1" ${visibleStatus}>
                <span class="badge error-badge">
                <span aria-hidden="true">${visibleIcon}
                  <span class="error-icon"></span>
                </span>
                <span class="visually-hidden">${Lang._('ERROR')}</span> ${badgeH + level}</span>
                <strong class="outline-list-item red-text">${headingText}</strong>
              </a>
            </li>`;
          outlineArray.push(append);
        } else if (issue === 'warning' && !dismissedH && isWithinRoot === true) {
          append = `
            <li class="outline-${level}">
              <a role="button" id="sa11y-link-${i}" tabindex="-1" ${visibleStatus}>
                <span class="badge warning-badge">
                <span aria-hidden="true">${visibleIcon} &#x3f;</span>
                <span class="visually-hidden">${Lang._('WARNING')}</span> ${badgeH + level}</span>
                <strong class="outline-list-item yellow-text">${headingText}</strong>
              </a>
            </li>`;
          outlineArray.push(append);
        } else {
          append = `
            <li class="outline-${level}">
              <a role="button" id="sa11y-link-${i}" tabindex="-1" ${visibleStatus}>
                <span class="badge">${visibleIcon} ${badgeH + level}</span>
                <span class="outline-list-item">${headingText}</span>
              </a>
            </li>`;
          outlineArray.push(append);
        }
      }

      /**
        * Append heading labels.
      */
      const label = document.createElement('sa11y-heading-label');
      const anchor = document.createElement('sa11y-heading-anchor');
      label.hidden = true;

      // If heading is in a hidden container, place the anchor just before it's most visible parent.
      if (parent !== null) {
        $el.insertAdjacentElement('beforeend', label);
        const hiddenParent = parent.previousElementSibling;
        anchor.setAttribute('id', `sa11y-h${i}`);
        if (hiddenParent) {
          hiddenParent.insertAdjacentElement('beforebegin', anchor);
          hiddenParent.setAttribute('data-sa11y-parent', `h${i}`);
        } else {
          parent.parentNode.insertAdjacentElement('beforebegin', anchor);
          parent.parentNode.setAttribute('data-sa11y-parent', `h${i}`);
        }
      } else {
        // If the heading isn't hidden, append visible label.
        $el.insertAdjacentElement('beforeend', label);

        // Create anchor above visible label.
        label.insertAdjacentElement('beforebegin', anchor);
        anchor.setAttribute('id', `sa11y-h${i}`);
      }

      // Populate heading label.
      const content = document.createElement('span');
      content.classList.add('heading-label');
      content.innerHTML = `H${level}`;
      label.shadowRoot.appendChild(content);

      // Make heading labels visible when panel is open.
      if (store.getItem('sa11y-outline') === 'Opened') {
        label.hidden = false;
      }
    });

    // Append headings to Page Outline.
    Constants.Panel.outlineList.innerHTML = (headingOutline.length === 0)
      ? `${outlineItem || ''} <li>${Lang._('PANEL_NO_HEADINGS')}</li>`
      : outlineArray.join(' ');

    // Make clickable!
    setTimeout(() => {
      const panel = document.querySelector('sa11y-control-panel');
      const shadow = panel.shadowRoot;
      const children = Array.from(shadow.querySelectorAll('#outline-list a'));

      children.forEach(($el, i) => {
        // Make Page Outline clickable.
        const outlineLink = shadow.getElementById(`sa11y-link-${i}`);

        const headingID = find(
          `#sa11y-h${i}, [data-sa11y-parent="h${i}"]`,
          'document',
          Constants.Exclusions.Container,
        );

        // Scroll to.
        const pulseAndScroll = (heading) => {
          addPulse(heading.parentElement);
          heading.scrollIntoView({
            behavior: `${Constants.Global.scrollBehaviour}`,
            block: 'center',
          });
        };

        // Add pulse.
        const smoothPulse = (e) => {
          if ((e.type === 'keyup' && e.code === 'Enter') || e.type === 'click') {
            headingID.forEach((heading) => {
              pulseAndScroll(heading);
            });

            if (outlineLink.classList.contains('hidden-h')) {
              createAlert(`${Lang._('HEADING_NOT_VISIBLE')}`);
            } else if (Constants.Panel.alert.classList.contains('active')) {
              removeAlert();
            }
          }
          e.preventDefault();
        };

        // Attach event listeners.
        outlineLink?.addEventListener('click', smoothPulse, false);
        outlineLink?.addEventListener('keyup', smoothPulse, false);
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
      Constants.Panel.outlineList.addEventListener('focus', () => {
        if (children.length > 0) {
          Constants.Panel.outlineList.setAttribute('tabindex', -1);
          children[current].setAttribute('tabindex', 0);
          children[current].focus();
        }
        Constants.Panel.outlineList.addEventListener('keydown', handleKeyDown);
      });
      Constants.Panel.outlineList.addEventListener('blur', () => {
        Constants.Panel.outlineList.removeEventListener('keydown', handleKeyDown);
      });
    }, 0);

    // Remove event listener and returned dismissed results.
    document.removeEventListener('sa11y-build-heading-outline', outlineHandler);
    return dismissed;
  };

  // Generate heading outline based on local storage or if "Outline" button is selected.
  const rememberOutline = store.getItem('sa11y-outline');
  if (rememberOutline === 'Opened') outlineHandler();
  document.addEventListener('sa11y-build-heading-outline', outlineHandler);
}

/**
 * Create Images outline.
*/

/**
 * Generate an "Edit" button for images in the Image outline.
 * @param {Object} image - Image object.
 * @returns {String} - HTML of edit button if hosted on the same domain.
 */
const generateEditLink = (image) => {
  // Image's src attribute.
  const { src } = image.element;

  // Exclusions. Don't show "Edit" button if image src contains string or has class.
  const urlExclusions = Constants.Global.ignoreEditImageURL.some((ignore) => src.includes(ignore));
  const classExclusions = Constants.Global.ignoreEditImageClass.some((ignore) => image.element.classList.contains(ignore));
  if (urlExclusions || classExclusions) return '';

  // Check if image's SRC attribute is hosted on same domain or is relative path.
  const relativePath = Constants.Global.relativePathImageSRC || window.location.host;
  const fileExtension = src.split(relativePath)[1] || '';

  // If admin specifies a unique class name for images via prop.
  const imageID = Constants.Global.relativePathImageID;
  let imageUniqueID;
  if (imageID.length && image.element.classList.length) {
    image.element.classList.forEach((className) => {
      if (className.startsWith(imageID)) {
        const [digit] = className.match(/\d+/) || [];
        imageUniqueID = digit;
      }
    });
  }

  // Create the href value for the image.
  const editURL = (relativePath && imageID.length)
    ? Constants.Global.editImageURLofCMS + imageUniqueID
    : Constants.Global.editImageURLofCMS + fileExtension;

  // Only add edit button to relative (locally hosted) images.
  const isRelativeLink = (imageSrc) => imageSrc.includes(window.location.host)
    || imageSrc.startsWith(relativePath);

  // Generate final HTML of edit button.
  if ((imageID.length && imageUniqueID !== undefined) || !imageID) {
    return isRelativeLink(src)
      ? `<div class="edit-block"><a href="${encodeURI(editURL)}" target="_blank" rel="noopener noreferrer" class="edit">${Lang._('EDIT')}</a></div>`
      : '';
  }
  return '';
};

/**
 * Generate Image outline.
 * @param {Object[]} dismissed - Array of dismissed objects.
 * @param {Object[]} imageResults - Array of all issues objects that is an <img> element.
 */
function generateImageOutline(dismissed, imageResults, option) {
  const imageOutlineHandler = () => {
    const imageArray = [];

    // Find all dismissed images.
    const findDismissedImages = dismissed.map((e) => imageResults.find((f) => e.key === f.dismiss && e.href === window.location.pathname)).filter(Boolean);

    imageResults.forEach((image) => {
      // Filter out dismissed images.
      const isDismissed = findDismissedImages.some((dismissedImage) => dismissedImage.element.outerHTML.toLowerCase() === image.element.outerHTML.toLowerCase());
      if (isDismissed) Object.assign(image, { dismissedImage: true });

      // Get image object's properties.
      const issue = image.type;
      const developerCheck = image.developer;
      const { dismissedImage } = image;
      const altText = escapeHTML(image.element.alt);

      // Make developer checks don't show images as error if Developer checks are off!
      const devChecksOff = store.getItem('sa11y-developer') === 'Off' || store.getItem('sa11y-developer') === null;
      const showDeveloperChecks = devChecksOff && (issue === 'error' || issue === 'warning') && developerCheck === true;

      // Account for lazy loading libraries.
      const source = getBestImageSource(image.element);

      // Generate edit link if locally hosted image and prop is enabled.
      const edit = Constants.Global.editImageURLofCMS ? generateEditLink(image) : '';

      // If image is linked.
      const anchor = option.imageWithinLightbox
        ? `a[href]:not(${option.imageWithinLightbox})`
        : 'a[href]';
      const linked = (image.element.closest(anchor))
        ? `<div class="badge ${issue}-badge"><span class="link-icon"></span><span class="visually-hidden">${Lang._('LINKED')}</span></div>`
        : '';

      let append;
      if (issue === 'error' && !showDeveloperChecks) {
        const missing = altText.length === 0
          ? `<div class="badge error-badge">${Lang._('MISSING')}</div>`
          : `<strong class="red-text">${altText}</strong>`;
        append = `
        <li class="error">
          <img src="${source}" alt/>
          <div class="alt">
            <div class="badge error-badge"><span class="error-icon"></span><span class="visually-hidden">${Lang._('ERROR')}</span> ${Lang._('ALT')}</div> ${linked} ${missing}
          </div>
          ${edit}
        </li>`;
        imageArray.push(append);
      } else if (issue === 'warning' && !dismissedImage && !showDeveloperChecks) {
        const decorative = altText.length === 0
          ? `<div class="badge warning-badge">${Lang._('DECORATIVE')}</div>`
          : '';
        append = `
        <li class="warning">
          <img src="${source}" alt/>
          <div class="alt">
            <div class="badge warning-badge"><span aria-hidden="true">&#63;</span> <span class="visually-hidden">${Lang._('WARNING')}</span> ${Lang._('ALT')}</div>
            ${linked} ${decorative} <strong class="yellow-text">${altText}</strong>
          </div>
          ${edit}
        </li>`;
        imageArray.push(append);
      } else {
        const decorative = altText.length === 0
          ? `<div class="badge">${Lang._('DECORATIVE')}</div>`
          : '';
        const goodAnchor = option.imageWithinLightbox
          ? `a[href]:not(${option.imageWithinLightbox})`
          : 'a[href]';
        const goodLinked = (image.element.closest(goodAnchor))
          ? `<div class="badge"><span class="link-icon"></span><span class="visually-hidden">${Lang._('LINKED')}</span></div>`
          : '';
        append = `
        <li class="good">
          <img src="${source}" alt/>
          <div class="alt">
            <div class="badge">${Lang._('ALT')}</div>
            ${goodLinked} ${decorative} ${altText}
          </div>
          ${edit}
        </li>`;
        imageArray.push(append);
      }
    });

    // Append headings to Page Outline.
    Constants.Panel.imagesList.innerHTML = (imageArray.length === 0)
      ? `<li>${Lang._('NO_IMAGES')}</li>`
      : imageArray.join(' ');

    // Remove event listener.
    document.removeEventListener('sa11y-build-image-outline', imageOutlineHandler);
  };

  /* Generate image outline based on local storage or if "Image" button is selected. */
  const rememberImages = store.getItem('sa11y-images');
  if (rememberImages === 'Opened') imageOutlineHandler();
  document.addEventListener('sa11y-build-image-outline', imageOutlineHandler);
}

/* ************************************************************ */
/*  Update warning and error counts on panel.                   */
/* ************************************************************ */
function updatePanel(dismissCount, errorCount, warningCount) {
  Constants.Panel.skipButton.disabled = false;
  Constants.Panel.panel.classList.add('active');
  Constants.Global.html.setAttribute('data-sa11y-active', 'true');
  Constants.Panel.skipButton.classList.add('active');

  if (errorCount > 0 && warningCount > 0) {
    Constants.Panel.content.setAttribute('class', 'errors');
    Constants.Panel.status.innerHTML = `${Lang._('ERRORS')} <span class="panel-count">${errorCount}</span> ${Lang._('WARNINGS')} <span class="panel-count" id="warning-count">${warningCount}</span>`;
  } else if (errorCount > 0) {
    Constants.Panel.content.setAttribute('class', 'errors');
    Constants.Panel.status.innerHTML = `${Lang._('ERRORS')} <span class="panel-count">${errorCount}</span>`;
  } else if (warningCount > 0) {
    Constants.Panel.content.setAttribute('class', 'warnings');
    Constants.Panel.status.innerHTML = `${Lang._('WARNINGS')} <span class="panel-count" id="warning-count">${warningCount}</span>`;
  } else if (dismissCount > 0) {
    Constants.Panel.status.innerHTML = `${Lang._('DISMISSED')} <span class="panel-count">${dismissCount}</span>`;
    Constants.Panel.skipButton.classList.remove('active');
  } else {
    Constants.Panel.content.setAttribute('class', 'good');
    Constants.Panel.status.innerHTML = `${Lang._('NO_ERRORS_FOUND')}`;
  }

  // If there are no button annotations, disable the Skip-to-Toggle switch.
  const annotations = document.querySelectorAll('sa11y-annotation');
  if (annotations.length === 0) {
    Constants.Panel.skipButton.disabled = true;
  }
}

/* ************************************************************ */
/*  Update iOS style notification badge on icon.                */
/* ************************************************************ */
function updateBadge(errorCount, warningCount) {
  const totalCount = errorCount + warningCount;
  if (totalCount === 0) {
    Constants.Panel.notifCount.innerText = '';
    Constants.Panel.notifText.innerText = '';
    Constants.Panel.notifBadge.style.display = 'none';
  } else if (warningCount > 0 && errorCount === 0) {
    Constants.Panel.notifBadge.classList.add('notification-badge-warning');
    Constants.Panel.notifCount.innerText = `${warningCount}`;
    Constants.Panel.notifText.innerText = `${Lang._('WARNINGS_FOUND')}`;
  } else {
    Constants.Panel.notifBadge.classList.remove('notification-badge-warning');
    Constants.Panel.notifCount.innerText = `${totalCount}`;
    Constants.Panel.notifText.innerText = Lang._('TOTAL_FOUND');
  }

  // Don't show badge when panel is opened.
  if (store.getItem('sa11y-panel') === 'Opened' || totalCount === 0) {
    Constants.Panel.notifBadge.style.display = 'none';
  } else {
    Constants.Panel.notifBadge.style.display = 'flex';
  }
}

/* ************************************************************ */
/*  Count number of errors and warnings on page.                */
/* ************************************************************ */
function updateCount(results, error, warning) {
  let updatedErrorCount = error;
  let updatedWarningCount = warning;

  results.forEach(($el, i) => {
    const issue = results[i].type;
    if (issue === 'error') {
      updatedErrorCount += 1;
    } else if (issue === 'warning') {
      updatedWarningCount += 1;
    }
  });

  return { error: updatedErrorCount, warning: updatedWarningCount };
}

var top = 'top';
var bottom = 'bottom';
var right = 'right';
var left = 'left';
var auto = 'auto';
var basePlacements = [top, bottom, right, left];
var start = 'start';
var end = 'end';
var clippingParents = 'clippingParents';
var viewport = 'viewport';
var popper = 'popper';
var reference = 'reference';
var variationPlacements = /*#__PURE__*/basePlacements.reduce(function (acc, placement) {
  return acc.concat([placement + "-" + start, placement + "-" + end]);
}, []);
var placements = /*#__PURE__*/[].concat(basePlacements, [auto]).reduce(function (acc, placement) {
  return acc.concat([placement, placement + "-" + start, placement + "-" + end]);
}, []); // modifiers that need to read the DOM

var beforeRead = 'beforeRead';
var read = 'read';
var afterRead = 'afterRead'; // pure-logic modifiers

var beforeMain = 'beforeMain';
var main = 'main';
var afterMain = 'afterMain'; // modifier with the purpose to write to the DOM (or write into a framework state)

var beforeWrite = 'beforeWrite';
var write = 'write';
var afterWrite = 'afterWrite';
var modifierPhases = [beforeRead, read, afterRead, beforeMain, main, afterMain, beforeWrite, write, afterWrite];

function getNodeName(element) {
  return element ? (element.nodeName || '').toLowerCase() : null;
}

function getWindow(node) {
  if (node == null) {
    return window;
  }

  if (node.toString() !== '[object Window]') {
    var ownerDocument = node.ownerDocument;
    return ownerDocument ? ownerDocument.defaultView || window : window;
  }

  return node;
}

function isElement$1(node) {
  var OwnElement = getWindow(node).Element;
  return node instanceof OwnElement || node instanceof Element;
}

function isHTMLElement(node) {
  var OwnElement = getWindow(node).HTMLElement;
  return node instanceof OwnElement || node instanceof HTMLElement;
}

function isShadowRoot(node) {
  // IE 11 has no ShadowRoot
  if (typeof ShadowRoot === 'undefined') {
    return false;
  }

  var OwnElement = getWindow(node).ShadowRoot;
  return node instanceof OwnElement || node instanceof ShadowRoot;
}

// and applies them to the HTMLElements such as popper and arrow

function applyStyles(_ref) {
  var state = _ref.state;
  Object.keys(state.elements).forEach(function (name) {
    var style = state.styles[name] || {};
    var attributes = state.attributes[name] || {};
    var element = state.elements[name]; // arrow is optional + virtual elements

    if (!isHTMLElement(element) || !getNodeName(element)) {
      return;
    } // Flow doesn't support to extend this property, but it's the most
    // effective way to apply styles to an HTMLElement
    // $FlowFixMe[cannot-write]


    Object.assign(element.style, style);
    Object.keys(attributes).forEach(function (name) {
      var value = attributes[name];

      if (value === false) {
        element.removeAttribute(name);
      } else {
        element.setAttribute(name, value === true ? '' : value);
      }
    });
  });
}

function effect$2(_ref2) {
  var state = _ref2.state;
  var initialStyles = {
    popper: {
      position: state.options.strategy,
      left: '0',
      top: '0',
      margin: '0'
    },
    arrow: {
      position: 'absolute'
    },
    reference: {}
  };
  Object.assign(state.elements.popper.style, initialStyles.popper);
  state.styles = initialStyles;

  if (state.elements.arrow) {
    Object.assign(state.elements.arrow.style, initialStyles.arrow);
  }

  return function () {
    Object.keys(state.elements).forEach(function (name) {
      var element = state.elements[name];
      var attributes = state.attributes[name] || {};
      var styleProperties = Object.keys(state.styles.hasOwnProperty(name) ? state.styles[name] : initialStyles[name]); // Set all values to an empty string to unset them

      var style = styleProperties.reduce(function (style, property) {
        style[property] = '';
        return style;
      }, {}); // arrow is optional + virtual elements

      if (!isHTMLElement(element) || !getNodeName(element)) {
        return;
      }

      Object.assign(element.style, style);
      Object.keys(attributes).forEach(function (attribute) {
        element.removeAttribute(attribute);
      });
    });
  };
} // eslint-disable-next-line import/no-unused-modules


var applyStyles$1 = {
  name: 'applyStyles',
  enabled: true,
  phase: 'write',
  fn: applyStyles,
  effect: effect$2,
  requires: ['computeStyles']
};

function getBasePlacement$1(placement) {
  return placement.split('-')[0];
}

var max = Math.max;
var min = Math.min;
var round = Math.round;

function getUAString() {
  var uaData = navigator.userAgentData;

  if (uaData != null && uaData.brands && Array.isArray(uaData.brands)) {
    return uaData.brands.map(function (item) {
      return item.brand + "/" + item.version;
    }).join(' ');
  }

  return navigator.userAgent;
}

function isLayoutViewport() {
  return !/^((?!chrome|android).)*safari/i.test(getUAString());
}

function getBoundingClientRect(element, includeScale, isFixedStrategy) {
  if (includeScale === void 0) {
    includeScale = false;
  }

  if (isFixedStrategy === void 0) {
    isFixedStrategy = false;
  }

  var clientRect = element.getBoundingClientRect();
  var scaleX = 1;
  var scaleY = 1;

  if (includeScale && isHTMLElement(element)) {
    scaleX = element.offsetWidth > 0 ? round(clientRect.width) / element.offsetWidth || 1 : 1;
    scaleY = element.offsetHeight > 0 ? round(clientRect.height) / element.offsetHeight || 1 : 1;
  }

  var _ref = isElement$1(element) ? getWindow(element) : window,
      visualViewport = _ref.visualViewport;

  var addVisualOffsets = !isLayoutViewport() && isFixedStrategy;
  var x = (clientRect.left + (addVisualOffsets && visualViewport ? visualViewport.offsetLeft : 0)) / scaleX;
  var y = (clientRect.top + (addVisualOffsets && visualViewport ? visualViewport.offsetTop : 0)) / scaleY;
  var width = clientRect.width / scaleX;
  var height = clientRect.height / scaleY;
  return {
    width: width,
    height: height,
    top: y,
    right: x + width,
    bottom: y + height,
    left: x,
    x: x,
    y: y
  };
}

// means it doesn't take into account transforms.

function getLayoutRect(element) {
  var clientRect = getBoundingClientRect(element); // Use the clientRect sizes if it's not been transformed.
  // Fixes https://github.com/popperjs/popper-core/issues/1223

  var width = element.offsetWidth;
  var height = element.offsetHeight;

  if (Math.abs(clientRect.width - width) <= 1) {
    width = clientRect.width;
  }

  if (Math.abs(clientRect.height - height) <= 1) {
    height = clientRect.height;
  }

  return {
    x: element.offsetLeft,
    y: element.offsetTop,
    width: width,
    height: height
  };
}

function contains(parent, child) {
  var rootNode = child.getRootNode && child.getRootNode(); // First, attempt with faster native method

  if (parent.contains(child)) {
    return true;
  } // then fallback to custom implementation with Shadow DOM support
  else if (rootNode && isShadowRoot(rootNode)) {
      var next = child;

      do {
        if (next && parent.isSameNode(next)) {
          return true;
        } // $FlowFixMe[prop-missing]: need a better way to handle this...


        next = next.parentNode || next.host;
      } while (next);
    } // Give up, the result is false


  return false;
}

function getComputedStyle$1(element) {
  return getWindow(element).getComputedStyle(element);
}

function isTableElement(element) {
  return ['table', 'td', 'th'].indexOf(getNodeName(element)) >= 0;
}

function getDocumentElement(element) {
  // $FlowFixMe[incompatible-return]: assume body is always available
  return ((isElement$1(element) ? element.ownerDocument : // $FlowFixMe[prop-missing]
  element.document) || window.document).documentElement;
}

function getParentNode(element) {
  if (getNodeName(element) === 'html') {
    return element;
  }

  return (// this is a quicker (but less type safe) way to save quite some bytes from the bundle
    // $FlowFixMe[incompatible-return]
    // $FlowFixMe[prop-missing]
    element.assignedSlot || // step into the shadow DOM of the parent of a slotted node
    element.parentNode || ( // DOM Element detected
    isShadowRoot(element) ? element.host : null) || // ShadowRoot detected
    // $FlowFixMe[incompatible-call]: HTMLElement is a Node
    getDocumentElement(element) // fallback

  );
}

function getTrueOffsetParent(element) {
  if (!isHTMLElement(element) || // https://github.com/popperjs/popper-core/issues/837
  getComputedStyle$1(element).position === 'fixed') {
    return null;
  }

  return element.offsetParent;
} // `.offsetParent` reports `null` for fixed elements, while absolute elements
// return the containing block


function getContainingBlock(element) {
  var isFirefox = /firefox/i.test(getUAString());
  var isIE = /Trident/i.test(getUAString());

  if (isIE && isHTMLElement(element)) {
    // In IE 9, 10 and 11 fixed elements containing block is always established by the viewport
    var elementCss = getComputedStyle$1(element);

    if (elementCss.position === 'fixed') {
      return null;
    }
  }

  var currentNode = getParentNode(element);

  if (isShadowRoot(currentNode)) {
    currentNode = currentNode.host;
  }

  while (isHTMLElement(currentNode) && ['html', 'body'].indexOf(getNodeName(currentNode)) < 0) {
    var css = getComputedStyle$1(currentNode); // This is non-exhaustive but covers the most common CSS properties that
    // create a containing block.
    // https://developer.mozilla.org/en-US/docs/Web/CSS/Containing_block#identifying_the_containing_block

    if (css.transform !== 'none' || css.perspective !== 'none' || css.contain === 'paint' || ['transform', 'perspective'].indexOf(css.willChange) !== -1 || isFirefox && css.willChange === 'filter' || isFirefox && css.filter && css.filter !== 'none') {
      return currentNode;
    } else {
      currentNode = currentNode.parentNode;
    }
  }

  return null;
} // Gets the closest ancestor positioned element. Handles some edge cases,
// such as table ancestors and cross browser bugs.


function getOffsetParent(element) {
  var window = getWindow(element);
  var offsetParent = getTrueOffsetParent(element);

  while (offsetParent && isTableElement(offsetParent) && getComputedStyle$1(offsetParent).position === 'static') {
    offsetParent = getTrueOffsetParent(offsetParent);
  }

  if (offsetParent && (getNodeName(offsetParent) === 'html' || getNodeName(offsetParent) === 'body' && getComputedStyle$1(offsetParent).position === 'static')) {
    return window;
  }

  return offsetParent || getContainingBlock(element) || window;
}

function getMainAxisFromPlacement(placement) {
  return ['top', 'bottom'].indexOf(placement) >= 0 ? 'x' : 'y';
}

function within(min$1, value, max$1) {
  return max(min$1, min(value, max$1));
}
function withinMaxClamp(min, value, max) {
  var v = within(min, value, max);
  return v > max ? max : v;
}

function getFreshSideObject() {
  return {
    top: 0,
    right: 0,
    bottom: 0,
    left: 0
  };
}

function mergePaddingObject(paddingObject) {
  return Object.assign({}, getFreshSideObject(), paddingObject);
}

function expandToHashMap(value, keys) {
  return keys.reduce(function (hashMap, key) {
    hashMap[key] = value;
    return hashMap;
  }, {});
}

var toPaddingObject = function toPaddingObject(padding, state) {
  padding = typeof padding === 'function' ? padding(Object.assign({}, state.rects, {
    placement: state.placement
  })) : padding;
  return mergePaddingObject(typeof padding !== 'number' ? padding : expandToHashMap(padding, basePlacements));
};

function arrow(_ref) {
  var _state$modifiersData$;

  var state = _ref.state,
      name = _ref.name,
      options = _ref.options;
  var arrowElement = state.elements.arrow;
  var popperOffsets = state.modifiersData.popperOffsets;
  var basePlacement = getBasePlacement$1(state.placement);
  var axis = getMainAxisFromPlacement(basePlacement);
  var isVertical = [left, right].indexOf(basePlacement) >= 0;
  var len = isVertical ? 'height' : 'width';

  if (!arrowElement || !popperOffsets) {
    return;
  }

  var paddingObject = toPaddingObject(options.padding, state);
  var arrowRect = getLayoutRect(arrowElement);
  var minProp = axis === 'y' ? top : left;
  var maxProp = axis === 'y' ? bottom : right;
  var endDiff = state.rects.reference[len] + state.rects.reference[axis] - popperOffsets[axis] - state.rects.popper[len];
  var startDiff = popperOffsets[axis] - state.rects.reference[axis];
  var arrowOffsetParent = getOffsetParent(arrowElement);
  var clientSize = arrowOffsetParent ? axis === 'y' ? arrowOffsetParent.clientHeight || 0 : arrowOffsetParent.clientWidth || 0 : 0;
  var centerToReference = endDiff / 2 - startDiff / 2; // Make sure the arrow doesn't overflow the popper if the center point is
  // outside of the popper bounds

  var min = paddingObject[minProp];
  var max = clientSize - arrowRect[len] - paddingObject[maxProp];
  var center = clientSize / 2 - arrowRect[len] / 2 + centerToReference;
  var offset = within(min, center, max); // Prevents breaking syntax highlighting...

  var axisProp = axis;
  state.modifiersData[name] = (_state$modifiersData$ = {}, _state$modifiersData$[axisProp] = offset, _state$modifiersData$.centerOffset = offset - center, _state$modifiersData$);
}

function effect$1(_ref2) {
  var state = _ref2.state,
      options = _ref2.options;
  var _options$element = options.element,
      arrowElement = _options$element === void 0 ? '[data-popper-arrow]' : _options$element;

  if (arrowElement == null) {
    return;
  } // CSS selector


  if (typeof arrowElement === 'string') {
    arrowElement = state.elements.popper.querySelector(arrowElement);

    if (!arrowElement) {
      return;
    }
  }

  if (!contains(state.elements.popper, arrowElement)) {
    return;
  }

  state.elements.arrow = arrowElement;
} // eslint-disable-next-line import/no-unused-modules


var arrow$1 = {
  name: 'arrow',
  enabled: true,
  phase: 'main',
  fn: arrow,
  effect: effect$1,
  requires: ['popperOffsets'],
  requiresIfExists: ['preventOverflow']
};

function getVariation(placement) {
  return placement.split('-')[1];
}

var unsetSides = {
  top: 'auto',
  right: 'auto',
  bottom: 'auto',
  left: 'auto'
}; // Round the offsets to the nearest suitable subpixel based on the DPR.
// Zooming can change the DPR, but it seems to report a value that will
// cleanly divide the values into the appropriate subpixels.

function roundOffsetsByDPR(_ref, win) {
  var x = _ref.x,
      y = _ref.y;
  var dpr = win.devicePixelRatio || 1;
  return {
    x: round(x * dpr) / dpr || 0,
    y: round(y * dpr) / dpr || 0
  };
}

function mapToStyles(_ref2) {
  var _Object$assign2;

  var popper = _ref2.popper,
      popperRect = _ref2.popperRect,
      placement = _ref2.placement,
      variation = _ref2.variation,
      offsets = _ref2.offsets,
      position = _ref2.position,
      gpuAcceleration = _ref2.gpuAcceleration,
      adaptive = _ref2.adaptive,
      roundOffsets = _ref2.roundOffsets,
      isFixed = _ref2.isFixed;
  var _offsets$x = offsets.x,
      x = _offsets$x === void 0 ? 0 : _offsets$x,
      _offsets$y = offsets.y,
      y = _offsets$y === void 0 ? 0 : _offsets$y;

  var _ref3 = typeof roundOffsets === 'function' ? roundOffsets({
    x: x,
    y: y
  }) : {
    x: x,
    y: y
  };

  x = _ref3.x;
  y = _ref3.y;
  var hasX = offsets.hasOwnProperty('x');
  var hasY = offsets.hasOwnProperty('y');
  var sideX = left;
  var sideY = top;
  var win = window;

  if (adaptive) {
    var offsetParent = getOffsetParent(popper);
    var heightProp = 'clientHeight';
    var widthProp = 'clientWidth';

    if (offsetParent === getWindow(popper)) {
      offsetParent = getDocumentElement(popper);

      if (getComputedStyle$1(offsetParent).position !== 'static' && position === 'absolute') {
        heightProp = 'scrollHeight';
        widthProp = 'scrollWidth';
      }
    } // $FlowFixMe[incompatible-cast]: force type refinement, we compare offsetParent with window above, but Flow doesn't detect it


    offsetParent = offsetParent;

    if (placement === top || (placement === left || placement === right) && variation === end) {
      sideY = bottom;
      var offsetY = isFixed && offsetParent === win && win.visualViewport ? win.visualViewport.height : // $FlowFixMe[prop-missing]
      offsetParent[heightProp];
      y -= offsetY - popperRect.height;
      y *= gpuAcceleration ? 1 : -1;
    }

    if (placement === left || (placement === top || placement === bottom) && variation === end) {
      sideX = right;
      var offsetX = isFixed && offsetParent === win && win.visualViewport ? win.visualViewport.width : // $FlowFixMe[prop-missing]
      offsetParent[widthProp];
      x -= offsetX - popperRect.width;
      x *= gpuAcceleration ? 1 : -1;
    }
  }

  var commonStyles = Object.assign({
    position: position
  }, adaptive && unsetSides);

  var _ref4 = roundOffsets === true ? roundOffsetsByDPR({
    x: x,
    y: y
  }, getWindow(popper)) : {
    x: x,
    y: y
  };

  x = _ref4.x;
  y = _ref4.y;

  if (gpuAcceleration) {
    var _Object$assign;

    return Object.assign({}, commonStyles, (_Object$assign = {}, _Object$assign[sideY] = hasY ? '0' : '', _Object$assign[sideX] = hasX ? '0' : '', _Object$assign.transform = (win.devicePixelRatio || 1) <= 1 ? "translate(" + x + "px, " + y + "px)" : "translate3d(" + x + "px, " + y + "px, 0)", _Object$assign));
  }

  return Object.assign({}, commonStyles, (_Object$assign2 = {}, _Object$assign2[sideY] = hasY ? y + "px" : '', _Object$assign2[sideX] = hasX ? x + "px" : '', _Object$assign2.transform = '', _Object$assign2));
}

function computeStyles(_ref5) {
  var state = _ref5.state,
      options = _ref5.options;
  var _options$gpuAccelerat = options.gpuAcceleration,
      gpuAcceleration = _options$gpuAccelerat === void 0 ? true : _options$gpuAccelerat,
      _options$adaptive = options.adaptive,
      adaptive = _options$adaptive === void 0 ? true : _options$adaptive,
      _options$roundOffsets = options.roundOffsets,
      roundOffsets = _options$roundOffsets === void 0 ? true : _options$roundOffsets;
  var commonStyles = {
    placement: getBasePlacement$1(state.placement),
    variation: getVariation(state.placement),
    popper: state.elements.popper,
    popperRect: state.rects.popper,
    gpuAcceleration: gpuAcceleration,
    isFixed: state.options.strategy === 'fixed'
  };

  if (state.modifiersData.popperOffsets != null) {
    state.styles.popper = Object.assign({}, state.styles.popper, mapToStyles(Object.assign({}, commonStyles, {
      offsets: state.modifiersData.popperOffsets,
      position: state.options.strategy,
      adaptive: adaptive,
      roundOffsets: roundOffsets
    })));
  }

  if (state.modifiersData.arrow != null) {
    state.styles.arrow = Object.assign({}, state.styles.arrow, mapToStyles(Object.assign({}, commonStyles, {
      offsets: state.modifiersData.arrow,
      position: 'absolute',
      adaptive: false,
      roundOffsets: roundOffsets
    })));
  }

  state.attributes.popper = Object.assign({}, state.attributes.popper, {
    'data-popper-placement': state.placement
  });
} // eslint-disable-next-line import/no-unused-modules


var computeStyles$1 = {
  name: 'computeStyles',
  enabled: true,
  phase: 'beforeWrite',
  fn: computeStyles,
  data: {}
};

var passive = {
  passive: true
};

function effect(_ref) {
  var state = _ref.state,
      instance = _ref.instance,
      options = _ref.options;
  var _options$scroll = options.scroll,
      scroll = _options$scroll === void 0 ? true : _options$scroll,
      _options$resize = options.resize,
      resize = _options$resize === void 0 ? true : _options$resize;
  var window = getWindow(state.elements.popper);
  var scrollParents = [].concat(state.scrollParents.reference, state.scrollParents.popper);

  if (scroll) {
    scrollParents.forEach(function (scrollParent) {
      scrollParent.addEventListener('scroll', instance.update, passive);
    });
  }

  if (resize) {
    window.addEventListener('resize', instance.update, passive);
  }

  return function () {
    if (scroll) {
      scrollParents.forEach(function (scrollParent) {
        scrollParent.removeEventListener('scroll', instance.update, passive);
      });
    }

    if (resize) {
      window.removeEventListener('resize', instance.update, passive);
    }
  };
} // eslint-disable-next-line import/no-unused-modules


var eventListeners = {
  name: 'eventListeners',
  enabled: true,
  phase: 'write',
  fn: function fn() {},
  effect: effect,
  data: {}
};

var hash$1 = {
  left: 'right',
  right: 'left',
  bottom: 'top',
  top: 'bottom'
};
function getOppositePlacement(placement) {
  return placement.replace(/left|right|bottom|top/g, function (matched) {
    return hash$1[matched];
  });
}

var hash = {
  start: 'end',
  end: 'start'
};
function getOppositeVariationPlacement(placement) {
  return placement.replace(/start|end/g, function (matched) {
    return hash[matched];
  });
}

function getWindowScroll(node) {
  var win = getWindow(node);
  var scrollLeft = win.pageXOffset;
  var scrollTop = win.pageYOffset;
  return {
    scrollLeft: scrollLeft,
    scrollTop: scrollTop
  };
}

function getWindowScrollBarX(element) {
  // If <html> has a CSS width greater than the viewport, then this will be
  // incorrect for RTL.
  // Popper 1 is broken in this case and never had a bug report so let's assume
  // it's not an issue. I don't think anyone ever specifies width on <html>
  // anyway.
  // Browsers where the left scrollbar doesn't cause an issue report `0` for
  // this (e.g. Edge 2019, IE11, Safari)
  return getBoundingClientRect(getDocumentElement(element)).left + getWindowScroll(element).scrollLeft;
}

function getViewportRect(element, strategy) {
  var win = getWindow(element);
  var html = getDocumentElement(element);
  var visualViewport = win.visualViewport;
  var width = html.clientWidth;
  var height = html.clientHeight;
  var x = 0;
  var y = 0;

  if (visualViewport) {
    width = visualViewport.width;
    height = visualViewport.height;
    var layoutViewport = isLayoutViewport();

    if (layoutViewport || !layoutViewport && strategy === 'fixed') {
      x = visualViewport.offsetLeft;
      y = visualViewport.offsetTop;
    }
  }

  return {
    width: width,
    height: height,
    x: x + getWindowScrollBarX(element),
    y: y
  };
}

// of the `<html>` and `<body>` rect bounds if horizontally scrollable

function getDocumentRect(element) {
  var _element$ownerDocumen;

  var html = getDocumentElement(element);
  var winScroll = getWindowScroll(element);
  var body = (_element$ownerDocumen = element.ownerDocument) == null ? void 0 : _element$ownerDocumen.body;
  var width = max(html.scrollWidth, html.clientWidth, body ? body.scrollWidth : 0, body ? body.clientWidth : 0);
  var height = max(html.scrollHeight, html.clientHeight, body ? body.scrollHeight : 0, body ? body.clientHeight : 0);
  var x = -winScroll.scrollLeft + getWindowScrollBarX(element);
  var y = -winScroll.scrollTop;

  if (getComputedStyle$1(body || html).direction === 'rtl') {
    x += max(html.clientWidth, body ? body.clientWidth : 0) - width;
  }

  return {
    width: width,
    height: height,
    x: x,
    y: y
  };
}

function isScrollParent(element) {
  // Firefox wants us to check `-x` and `-y` variations as well
  var _getComputedStyle = getComputedStyle$1(element),
      overflow = _getComputedStyle.overflow,
      overflowX = _getComputedStyle.overflowX,
      overflowY = _getComputedStyle.overflowY;

  return /auto|scroll|overlay|hidden/.test(overflow + overflowY + overflowX);
}

function getScrollParent(node) {
  if (['html', 'body', '#document'].indexOf(getNodeName(node)) >= 0) {
    // $FlowFixMe[incompatible-return]: assume body is always available
    return node.ownerDocument.body;
  }

  if (isHTMLElement(node) && isScrollParent(node)) {
    return node;
  }

  return getScrollParent(getParentNode(node));
}

/*
given a DOM element, return the list of all scroll parents, up the list of ancesors
until we get to the top window object. This list is what we attach scroll listeners
to, because if any of these parent elements scroll, we'll need to re-calculate the
reference element's position.
*/

function listScrollParents(element, list) {
  var _element$ownerDocumen;

  if (list === void 0) {
    list = [];
  }

  var scrollParent = getScrollParent(element);
  var isBody = scrollParent === ((_element$ownerDocumen = element.ownerDocument) == null ? void 0 : _element$ownerDocumen.body);
  var win = getWindow(scrollParent);
  var target = isBody ? [win].concat(win.visualViewport || [], isScrollParent(scrollParent) ? scrollParent : []) : scrollParent;
  var updatedList = list.concat(target);
  return isBody ? updatedList : // $FlowFixMe[incompatible-call]: isBody tells us target will be an HTMLElement here
  updatedList.concat(listScrollParents(getParentNode(target)));
}

function rectToClientRect(rect) {
  return Object.assign({}, rect, {
    left: rect.x,
    top: rect.y,
    right: rect.x + rect.width,
    bottom: rect.y + rect.height
  });
}

function getInnerBoundingClientRect(element, strategy) {
  var rect = getBoundingClientRect(element, false, strategy === 'fixed');
  rect.top = rect.top + element.clientTop;
  rect.left = rect.left + element.clientLeft;
  rect.bottom = rect.top + element.clientHeight;
  rect.right = rect.left + element.clientWidth;
  rect.width = element.clientWidth;
  rect.height = element.clientHeight;
  rect.x = rect.left;
  rect.y = rect.top;
  return rect;
}

function getClientRectFromMixedType(element, clippingParent, strategy) {
  return clippingParent === viewport ? rectToClientRect(getViewportRect(element, strategy)) : isElement$1(clippingParent) ? getInnerBoundingClientRect(clippingParent, strategy) : rectToClientRect(getDocumentRect(getDocumentElement(element)));
} // A "clipping parent" is an overflowable container with the characteristic of
// clipping (or hiding) overflowing elements with a position different from
// `initial`


function getClippingParents(element) {
  var clippingParents = listScrollParents(getParentNode(element));
  var canEscapeClipping = ['absolute', 'fixed'].indexOf(getComputedStyle$1(element).position) >= 0;
  var clipperElement = canEscapeClipping && isHTMLElement(element) ? getOffsetParent(element) : element;

  if (!isElement$1(clipperElement)) {
    return [];
  } // $FlowFixMe[incompatible-return]: https://github.com/facebook/flow/issues/1414


  return clippingParents.filter(function (clippingParent) {
    return isElement$1(clippingParent) && contains(clippingParent, clipperElement) && getNodeName(clippingParent) !== 'body';
  });
} // Gets the maximum area that the element is visible in due to any number of
// clipping parents


function getClippingRect(element, boundary, rootBoundary, strategy) {
  var mainClippingParents = boundary === 'clippingParents' ? getClippingParents(element) : [].concat(boundary);
  var clippingParents = [].concat(mainClippingParents, [rootBoundary]);
  var firstClippingParent = clippingParents[0];
  var clippingRect = clippingParents.reduce(function (accRect, clippingParent) {
    var rect = getClientRectFromMixedType(element, clippingParent, strategy);
    accRect.top = max(rect.top, accRect.top);
    accRect.right = min(rect.right, accRect.right);
    accRect.bottom = min(rect.bottom, accRect.bottom);
    accRect.left = max(rect.left, accRect.left);
    return accRect;
  }, getClientRectFromMixedType(element, firstClippingParent, strategy));
  clippingRect.width = clippingRect.right - clippingRect.left;
  clippingRect.height = clippingRect.bottom - clippingRect.top;
  clippingRect.x = clippingRect.left;
  clippingRect.y = clippingRect.top;
  return clippingRect;
}

function computeOffsets(_ref) {
  var reference = _ref.reference,
      element = _ref.element,
      placement = _ref.placement;
  var basePlacement = placement ? getBasePlacement$1(placement) : null;
  var variation = placement ? getVariation(placement) : null;
  var commonX = reference.x + reference.width / 2 - element.width / 2;
  var commonY = reference.y + reference.height / 2 - element.height / 2;
  var offsets;

  switch (basePlacement) {
    case top:
      offsets = {
        x: commonX,
        y: reference.y - element.height
      };
      break;

    case bottom:
      offsets = {
        x: commonX,
        y: reference.y + reference.height
      };
      break;

    case right:
      offsets = {
        x: reference.x + reference.width,
        y: commonY
      };
      break;

    case left:
      offsets = {
        x: reference.x - element.width,
        y: commonY
      };
      break;

    default:
      offsets = {
        x: reference.x,
        y: reference.y
      };
  }

  var mainAxis = basePlacement ? getMainAxisFromPlacement(basePlacement) : null;

  if (mainAxis != null) {
    var len = mainAxis === 'y' ? 'height' : 'width';

    switch (variation) {
      case start:
        offsets[mainAxis] = offsets[mainAxis] - (reference[len] / 2 - element[len] / 2);
        break;

      case end:
        offsets[mainAxis] = offsets[mainAxis] + (reference[len] / 2 - element[len] / 2);
        break;
    }
  }

  return offsets;
}

function detectOverflow$1(state, options) {
  if (options === void 0) {
    options = {};
  }

  var _options = options,
      _options$placement = _options.placement,
      placement = _options$placement === void 0 ? state.placement : _options$placement,
      _options$strategy = _options.strategy,
      strategy = _options$strategy === void 0 ? state.strategy : _options$strategy,
      _options$boundary = _options.boundary,
      boundary = _options$boundary === void 0 ? clippingParents : _options$boundary,
      _options$rootBoundary = _options.rootBoundary,
      rootBoundary = _options$rootBoundary === void 0 ? viewport : _options$rootBoundary,
      _options$elementConte = _options.elementContext,
      elementContext = _options$elementConte === void 0 ? popper : _options$elementConte,
      _options$altBoundary = _options.altBoundary,
      altBoundary = _options$altBoundary === void 0 ? false : _options$altBoundary,
      _options$padding = _options.padding,
      padding = _options$padding === void 0 ? 0 : _options$padding;
  var paddingObject = mergePaddingObject(typeof padding !== 'number' ? padding : expandToHashMap(padding, basePlacements));
  var altContext = elementContext === popper ? reference : popper;
  var popperRect = state.rects.popper;
  var element = state.elements[altBoundary ? altContext : elementContext];
  var clippingClientRect = getClippingRect(isElement$1(element) ? element : element.contextElement || getDocumentElement(state.elements.popper), boundary, rootBoundary, strategy);
  var referenceClientRect = getBoundingClientRect(state.elements.reference);
  var popperOffsets = computeOffsets({
    reference: referenceClientRect,
    element: popperRect,
    strategy: 'absolute',
    placement: placement
  });
  var popperClientRect = rectToClientRect(Object.assign({}, popperRect, popperOffsets));
  var elementClientRect = elementContext === popper ? popperClientRect : referenceClientRect; // positive = overflowing the clipping rect
  // 0 or negative = within the clipping rect

  var overflowOffsets = {
    top: clippingClientRect.top - elementClientRect.top + paddingObject.top,
    bottom: elementClientRect.bottom - clippingClientRect.bottom + paddingObject.bottom,
    left: clippingClientRect.left - elementClientRect.left + paddingObject.left,
    right: elementClientRect.right - clippingClientRect.right + paddingObject.right
  };
  var offsetData = state.modifiersData.offset; // Offsets can be applied only to the popper element

  if (elementContext === popper && offsetData) {
    var offset = offsetData[placement];
    Object.keys(overflowOffsets).forEach(function (key) {
      var multiply = [right, bottom].indexOf(key) >= 0 ? 1 : -1;
      var axis = [top, bottom].indexOf(key) >= 0 ? 'y' : 'x';
      overflowOffsets[key] += offset[axis] * multiply;
    });
  }

  return overflowOffsets;
}

function computeAutoPlacement(state, options) {
  if (options === void 0) {
    options = {};
  }

  var _options = options,
      placement = _options.placement,
      boundary = _options.boundary,
      rootBoundary = _options.rootBoundary,
      padding = _options.padding,
      flipVariations = _options.flipVariations,
      _options$allowedAutoP = _options.allowedAutoPlacements,
      allowedAutoPlacements = _options$allowedAutoP === void 0 ? placements : _options$allowedAutoP;
  var variation = getVariation(placement);
  var placements$1 = variation ? flipVariations ? variationPlacements : variationPlacements.filter(function (placement) {
    return getVariation(placement) === variation;
  }) : basePlacements;
  var allowedPlacements = placements$1.filter(function (placement) {
    return allowedAutoPlacements.indexOf(placement) >= 0;
  });

  if (allowedPlacements.length === 0) {
    allowedPlacements = placements$1;
  } // $FlowFixMe[incompatible-type]: Flow seems to have problems with two array unions...


  var overflows = allowedPlacements.reduce(function (acc, placement) {
    acc[placement] = detectOverflow$1(state, {
      placement: placement,
      boundary: boundary,
      rootBoundary: rootBoundary,
      padding: padding
    })[getBasePlacement$1(placement)];
    return acc;
  }, {});
  return Object.keys(overflows).sort(function (a, b) {
    return overflows[a] - overflows[b];
  });
}

function getExpandedFallbackPlacements(placement) {
  if (getBasePlacement$1(placement) === auto) {
    return [];
  }

  var oppositePlacement = getOppositePlacement(placement);
  return [getOppositeVariationPlacement(placement), oppositePlacement, getOppositeVariationPlacement(oppositePlacement)];
}

function flip(_ref) {
  var state = _ref.state,
      options = _ref.options,
      name = _ref.name;

  if (state.modifiersData[name]._skip) {
    return;
  }

  var _options$mainAxis = options.mainAxis,
      checkMainAxis = _options$mainAxis === void 0 ? true : _options$mainAxis,
      _options$altAxis = options.altAxis,
      checkAltAxis = _options$altAxis === void 0 ? true : _options$altAxis,
      specifiedFallbackPlacements = options.fallbackPlacements,
      padding = options.padding,
      boundary = options.boundary,
      rootBoundary = options.rootBoundary,
      altBoundary = options.altBoundary,
      _options$flipVariatio = options.flipVariations,
      flipVariations = _options$flipVariatio === void 0 ? true : _options$flipVariatio,
      allowedAutoPlacements = options.allowedAutoPlacements;
  var preferredPlacement = state.options.placement;
  var basePlacement = getBasePlacement$1(preferredPlacement);
  var isBasePlacement = basePlacement === preferredPlacement;
  var fallbackPlacements = specifiedFallbackPlacements || (isBasePlacement || !flipVariations ? [getOppositePlacement(preferredPlacement)] : getExpandedFallbackPlacements(preferredPlacement));
  var placements = [preferredPlacement].concat(fallbackPlacements).reduce(function (acc, placement) {
    return acc.concat(getBasePlacement$1(placement) === auto ? computeAutoPlacement(state, {
      placement: placement,
      boundary: boundary,
      rootBoundary: rootBoundary,
      padding: padding,
      flipVariations: flipVariations,
      allowedAutoPlacements: allowedAutoPlacements
    }) : placement);
  }, []);
  var referenceRect = state.rects.reference;
  var popperRect = state.rects.popper;
  var checksMap = new Map();
  var makeFallbackChecks = true;
  var firstFittingPlacement = placements[0];

  for (var i = 0; i < placements.length; i++) {
    var placement = placements[i];

    var _basePlacement = getBasePlacement$1(placement);

    var isStartVariation = getVariation(placement) === start;
    var isVertical = [top, bottom].indexOf(_basePlacement) >= 0;
    var len = isVertical ? 'width' : 'height';
    var overflow = detectOverflow$1(state, {
      placement: placement,
      boundary: boundary,
      rootBoundary: rootBoundary,
      altBoundary: altBoundary,
      padding: padding
    });
    var mainVariationSide = isVertical ? isStartVariation ? right : left : isStartVariation ? bottom : top;

    if (referenceRect[len] > popperRect[len]) {
      mainVariationSide = getOppositePlacement(mainVariationSide);
    }

    var altVariationSide = getOppositePlacement(mainVariationSide);
    var checks = [];

    if (checkMainAxis) {
      checks.push(overflow[_basePlacement] <= 0);
    }

    if (checkAltAxis) {
      checks.push(overflow[mainVariationSide] <= 0, overflow[altVariationSide] <= 0);
    }

    if (checks.every(function (check) {
      return check;
    })) {
      firstFittingPlacement = placement;
      makeFallbackChecks = false;
      break;
    }

    checksMap.set(placement, checks);
  }

  if (makeFallbackChecks) {
    // `2` may be desired in some cases – research later
    var numberOfChecks = flipVariations ? 3 : 1;

    var _loop = function _loop(_i) {
      var fittingPlacement = placements.find(function (placement) {
        var checks = checksMap.get(placement);

        if (checks) {
          return checks.slice(0, _i).every(function (check) {
            return check;
          });
        }
      });

      if (fittingPlacement) {
        firstFittingPlacement = fittingPlacement;
        return "break";
      }
    };

    for (var _i = numberOfChecks; _i > 0; _i--) {
      var _ret = _loop(_i);

      if (_ret === "break") break;
    }
  }

  if (state.placement !== firstFittingPlacement) {
    state.modifiersData[name]._skip = true;
    state.placement = firstFittingPlacement;
    state.reset = true;
  }
} // eslint-disable-next-line import/no-unused-modules


var flip$1 = {
  name: 'flip',
  enabled: true,
  phase: 'main',
  fn: flip,
  requiresIfExists: ['offset'],
  data: {
    _skip: false
  }
};

function getSideOffsets(overflow, rect, preventedOffsets) {
  if (preventedOffsets === void 0) {
    preventedOffsets = {
      x: 0,
      y: 0
    };
  }

  return {
    top: overflow.top - rect.height - preventedOffsets.y,
    right: overflow.right - rect.width + preventedOffsets.x,
    bottom: overflow.bottom - rect.height + preventedOffsets.y,
    left: overflow.left - rect.width - preventedOffsets.x
  };
}

function isAnySideFullyClipped(overflow) {
  return [top, right, bottom, left].some(function (side) {
    return overflow[side] >= 0;
  });
}

function hide(_ref) {
  var state = _ref.state,
      name = _ref.name;
  var referenceRect = state.rects.reference;
  var popperRect = state.rects.popper;
  var preventedOffsets = state.modifiersData.preventOverflow;
  var referenceOverflow = detectOverflow$1(state, {
    elementContext: 'reference'
  });
  var popperAltOverflow = detectOverflow$1(state, {
    altBoundary: true
  });
  var referenceClippingOffsets = getSideOffsets(referenceOverflow, referenceRect);
  var popperEscapeOffsets = getSideOffsets(popperAltOverflow, popperRect, preventedOffsets);
  var isReferenceHidden = isAnySideFullyClipped(referenceClippingOffsets);
  var hasPopperEscaped = isAnySideFullyClipped(popperEscapeOffsets);
  state.modifiersData[name] = {
    referenceClippingOffsets: referenceClippingOffsets,
    popperEscapeOffsets: popperEscapeOffsets,
    isReferenceHidden: isReferenceHidden,
    hasPopperEscaped: hasPopperEscaped
  };
  state.attributes.popper = Object.assign({}, state.attributes.popper, {
    'data-popper-reference-hidden': isReferenceHidden,
    'data-popper-escaped': hasPopperEscaped
  });
} // eslint-disable-next-line import/no-unused-modules


var hide$1 = {
  name: 'hide',
  enabled: true,
  phase: 'main',
  requiresIfExists: ['preventOverflow'],
  fn: hide
};

function distanceAndSkiddingToXY(placement, rects, offset) {
  var basePlacement = getBasePlacement$1(placement);
  var invertDistance = [left, top].indexOf(basePlacement) >= 0 ? -1 : 1;

  var _ref = typeof offset === 'function' ? offset(Object.assign({}, rects, {
    placement: placement
  })) : offset,
      skidding = _ref[0],
      distance = _ref[1];

  skidding = skidding || 0;
  distance = (distance || 0) * invertDistance;
  return [left, right].indexOf(basePlacement) >= 0 ? {
    x: distance,
    y: skidding
  } : {
    x: skidding,
    y: distance
  };
}

function offset(_ref2) {
  var state = _ref2.state,
      options = _ref2.options,
      name = _ref2.name;
  var _options$offset = options.offset,
      offset = _options$offset === void 0 ? [0, 0] : _options$offset;
  var data = placements.reduce(function (acc, placement) {
    acc[placement] = distanceAndSkiddingToXY(placement, state.rects, offset);
    return acc;
  }, {});
  var _data$state$placement = data[state.placement],
      x = _data$state$placement.x,
      y = _data$state$placement.y;

  if (state.modifiersData.popperOffsets != null) {
    state.modifiersData.popperOffsets.x += x;
    state.modifiersData.popperOffsets.y += y;
  }

  state.modifiersData[name] = data;
} // eslint-disable-next-line import/no-unused-modules


var offset$1 = {
  name: 'offset',
  enabled: true,
  phase: 'main',
  requires: ['popperOffsets'],
  fn: offset
};

function popperOffsets(_ref) {
  var state = _ref.state,
      name = _ref.name;
  // Offsets are the actual position the popper needs to have to be
  // properly positioned near its reference element
  // This is the most basic placement, and will be adjusted by
  // the modifiers in the next step
  state.modifiersData[name] = computeOffsets({
    reference: state.rects.reference,
    element: state.rects.popper,
    strategy: 'absolute',
    placement: state.placement
  });
} // eslint-disable-next-line import/no-unused-modules


var popperOffsets$1 = {
  name: 'popperOffsets',
  enabled: true,
  phase: 'read',
  fn: popperOffsets,
  data: {}
};

function getAltAxis(axis) {
  return axis === 'x' ? 'y' : 'x';
}

function preventOverflow(_ref) {
  var state = _ref.state,
      options = _ref.options,
      name = _ref.name;
  var _options$mainAxis = options.mainAxis,
      checkMainAxis = _options$mainAxis === void 0 ? true : _options$mainAxis,
      _options$altAxis = options.altAxis,
      checkAltAxis = _options$altAxis === void 0 ? false : _options$altAxis,
      boundary = options.boundary,
      rootBoundary = options.rootBoundary,
      altBoundary = options.altBoundary,
      padding = options.padding,
      _options$tether = options.tether,
      tether = _options$tether === void 0 ? true : _options$tether,
      _options$tetherOffset = options.tetherOffset,
      tetherOffset = _options$tetherOffset === void 0 ? 0 : _options$tetherOffset;
  var overflow = detectOverflow$1(state, {
    boundary: boundary,
    rootBoundary: rootBoundary,
    padding: padding,
    altBoundary: altBoundary
  });
  var basePlacement = getBasePlacement$1(state.placement);
  var variation = getVariation(state.placement);
  var isBasePlacement = !variation;
  var mainAxis = getMainAxisFromPlacement(basePlacement);
  var altAxis = getAltAxis(mainAxis);
  var popperOffsets = state.modifiersData.popperOffsets;
  var referenceRect = state.rects.reference;
  var popperRect = state.rects.popper;
  var tetherOffsetValue = typeof tetherOffset === 'function' ? tetherOffset(Object.assign({}, state.rects, {
    placement: state.placement
  })) : tetherOffset;
  var normalizedTetherOffsetValue = typeof tetherOffsetValue === 'number' ? {
    mainAxis: tetherOffsetValue,
    altAxis: tetherOffsetValue
  } : Object.assign({
    mainAxis: 0,
    altAxis: 0
  }, tetherOffsetValue);
  var offsetModifierState = state.modifiersData.offset ? state.modifiersData.offset[state.placement] : null;
  var data = {
    x: 0,
    y: 0
  };

  if (!popperOffsets) {
    return;
  }

  if (checkMainAxis) {
    var _offsetModifierState$;

    var mainSide = mainAxis === 'y' ? top : left;
    var altSide = mainAxis === 'y' ? bottom : right;
    var len = mainAxis === 'y' ? 'height' : 'width';
    var offset = popperOffsets[mainAxis];
    var min$1 = offset + overflow[mainSide];
    var max$1 = offset - overflow[altSide];
    var additive = tether ? -popperRect[len] / 2 : 0;
    var minLen = variation === start ? referenceRect[len] : popperRect[len];
    var maxLen = variation === start ? -popperRect[len] : -referenceRect[len]; // We need to include the arrow in the calculation so the arrow doesn't go
    // outside the reference bounds

    var arrowElement = state.elements.arrow;
    var arrowRect = tether && arrowElement ? getLayoutRect(arrowElement) : {
      width: 0,
      height: 0
    };
    var arrowPaddingObject = state.modifiersData['arrow#persistent'] ? state.modifiersData['arrow#persistent'].padding : getFreshSideObject();
    var arrowPaddingMin = arrowPaddingObject[mainSide];
    var arrowPaddingMax = arrowPaddingObject[altSide]; // If the reference length is smaller than the arrow length, we don't want
    // to include its full size in the calculation. If the reference is small
    // and near the edge of a boundary, the popper can overflow even if the
    // reference is not overflowing as well (e.g. virtual elements with no
    // width or height)

    var arrowLen = within(0, referenceRect[len], arrowRect[len]);
    var minOffset = isBasePlacement ? referenceRect[len] / 2 - additive - arrowLen - arrowPaddingMin - normalizedTetherOffsetValue.mainAxis : minLen - arrowLen - arrowPaddingMin - normalizedTetherOffsetValue.mainAxis;
    var maxOffset = isBasePlacement ? -referenceRect[len] / 2 + additive + arrowLen + arrowPaddingMax + normalizedTetherOffsetValue.mainAxis : maxLen + arrowLen + arrowPaddingMax + normalizedTetherOffsetValue.mainAxis;
    var arrowOffsetParent = state.elements.arrow && getOffsetParent(state.elements.arrow);
    var clientOffset = arrowOffsetParent ? mainAxis === 'y' ? arrowOffsetParent.clientTop || 0 : arrowOffsetParent.clientLeft || 0 : 0;
    var offsetModifierValue = (_offsetModifierState$ = offsetModifierState == null ? void 0 : offsetModifierState[mainAxis]) != null ? _offsetModifierState$ : 0;
    var tetherMin = offset + minOffset - offsetModifierValue - clientOffset;
    var tetherMax = offset + maxOffset - offsetModifierValue;
    var preventedOffset = within(tether ? min(min$1, tetherMin) : min$1, offset, tether ? max(max$1, tetherMax) : max$1);
    popperOffsets[mainAxis] = preventedOffset;
    data[mainAxis] = preventedOffset - offset;
  }

  if (checkAltAxis) {
    var _offsetModifierState$2;

    var _mainSide = mainAxis === 'x' ? top : left;

    var _altSide = mainAxis === 'x' ? bottom : right;

    var _offset = popperOffsets[altAxis];

    var _len = altAxis === 'y' ? 'height' : 'width';

    var _min = _offset + overflow[_mainSide];

    var _max = _offset - overflow[_altSide];

    var isOriginSide = [top, left].indexOf(basePlacement) !== -1;

    var _offsetModifierValue = (_offsetModifierState$2 = offsetModifierState == null ? void 0 : offsetModifierState[altAxis]) != null ? _offsetModifierState$2 : 0;

    var _tetherMin = isOriginSide ? _min : _offset - referenceRect[_len] - popperRect[_len] - _offsetModifierValue + normalizedTetherOffsetValue.altAxis;

    var _tetherMax = isOriginSide ? _offset + referenceRect[_len] + popperRect[_len] - _offsetModifierValue - normalizedTetherOffsetValue.altAxis : _max;

    var _preventedOffset = tether && isOriginSide ? withinMaxClamp(_tetherMin, _offset, _tetherMax) : within(tether ? _tetherMin : _min, _offset, tether ? _tetherMax : _max);

    popperOffsets[altAxis] = _preventedOffset;
    data[altAxis] = _preventedOffset - _offset;
  }

  state.modifiersData[name] = data;
} // eslint-disable-next-line import/no-unused-modules


var preventOverflow$1 = {
  name: 'preventOverflow',
  enabled: true,
  phase: 'main',
  fn: preventOverflow,
  requiresIfExists: ['offset']
};

function getHTMLElementScroll(element) {
  return {
    scrollLeft: element.scrollLeft,
    scrollTop: element.scrollTop
  };
}

function getNodeScroll(node) {
  if (node === getWindow(node) || !isHTMLElement(node)) {
    return getWindowScroll(node);
  } else {
    return getHTMLElementScroll(node);
  }
}

function isElementScaled(element) {
  var rect = element.getBoundingClientRect();
  var scaleX = round(rect.width) / element.offsetWidth || 1;
  var scaleY = round(rect.height) / element.offsetHeight || 1;
  return scaleX !== 1 || scaleY !== 1;
} // Returns the composite rect of an element relative to its offsetParent.
// Composite means it takes into account transforms as well as layout.


function getCompositeRect(elementOrVirtualElement, offsetParent, isFixed) {
  if (isFixed === void 0) {
    isFixed = false;
  }

  var isOffsetParentAnElement = isHTMLElement(offsetParent);
  var offsetParentIsScaled = isHTMLElement(offsetParent) && isElementScaled(offsetParent);
  var documentElement = getDocumentElement(offsetParent);
  var rect = getBoundingClientRect(elementOrVirtualElement, offsetParentIsScaled, isFixed);
  var scroll = {
    scrollLeft: 0,
    scrollTop: 0
  };
  var offsets = {
    x: 0,
    y: 0
  };

  if (isOffsetParentAnElement || !isOffsetParentAnElement && !isFixed) {
    if (getNodeName(offsetParent) !== 'body' || // https://github.com/popperjs/popper-core/issues/1078
    isScrollParent(documentElement)) {
      scroll = getNodeScroll(offsetParent);
    }

    if (isHTMLElement(offsetParent)) {
      offsets = getBoundingClientRect(offsetParent, true);
      offsets.x += offsetParent.clientLeft;
      offsets.y += offsetParent.clientTop;
    } else if (documentElement) {
      offsets.x = getWindowScrollBarX(documentElement);
    }
  }

  return {
    x: rect.left + scroll.scrollLeft - offsets.x,
    y: rect.top + scroll.scrollTop - offsets.y,
    width: rect.width,
    height: rect.height
  };
}

function order(modifiers) {
  var map = new Map();
  var visited = new Set();
  var result = [];
  modifiers.forEach(function (modifier) {
    map.set(modifier.name, modifier);
  }); // On visiting object, check for its dependencies and visit them recursively

  function sort(modifier) {
    visited.add(modifier.name);
    var requires = [].concat(modifier.requires || [], modifier.requiresIfExists || []);
    requires.forEach(function (dep) {
      if (!visited.has(dep)) {
        var depModifier = map.get(dep);

        if (depModifier) {
          sort(depModifier);
        }
      }
    });
    result.push(modifier);
  }

  modifiers.forEach(function (modifier) {
    if (!visited.has(modifier.name)) {
      // check for visited object
      sort(modifier);
    }
  });
  return result;
}

function orderModifiers(modifiers) {
  // order based on dependencies
  var orderedModifiers = order(modifiers); // order based on phase

  return modifierPhases.reduce(function (acc, phase) {
    return acc.concat(orderedModifiers.filter(function (modifier) {
      return modifier.phase === phase;
    }));
  }, []);
}

function debounce$1(fn) {
  var pending;
  return function () {
    if (!pending) {
      pending = new Promise(function (resolve) {
        Promise.resolve().then(function () {
          pending = undefined;
          resolve(fn());
        });
      });
    }

    return pending;
  };
}

function mergeByName(modifiers) {
  var merged = modifiers.reduce(function (merged, current) {
    var existing = merged[current.name];
    merged[current.name] = existing ? Object.assign({}, existing, current, {
      options: Object.assign({}, existing.options, current.options),
      data: Object.assign({}, existing.data, current.data)
    }) : current;
    return merged;
  }, {}); // IE11 does not support Object.values

  return Object.keys(merged).map(function (key) {
    return merged[key];
  });
}

var DEFAULT_OPTIONS = {
  placement: 'bottom',
  modifiers: [],
  strategy: 'absolute'
};

function areValidElements() {
  for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
    args[_key] = arguments[_key];
  }

  return !args.some(function (element) {
    return !(element && typeof element.getBoundingClientRect === 'function');
  });
}

function popperGenerator(generatorOptions) {
  if (generatorOptions === void 0) {
    generatorOptions = {};
  }

  var _generatorOptions = generatorOptions,
      _generatorOptions$def = _generatorOptions.defaultModifiers,
      defaultModifiers = _generatorOptions$def === void 0 ? [] : _generatorOptions$def,
      _generatorOptions$def2 = _generatorOptions.defaultOptions,
      defaultOptions = _generatorOptions$def2 === void 0 ? DEFAULT_OPTIONS : _generatorOptions$def2;
  return function createPopper(reference, popper, options) {
    if (options === void 0) {
      options = defaultOptions;
    }

    var state = {
      placement: 'bottom',
      orderedModifiers: [],
      options: Object.assign({}, DEFAULT_OPTIONS, defaultOptions),
      modifiersData: {},
      elements: {
        reference: reference,
        popper: popper
      },
      attributes: {},
      styles: {}
    };
    var effectCleanupFns = [];
    var isDestroyed = false;
    var instance = {
      state: state,
      setOptions: function setOptions(setOptionsAction) {
        var options = typeof setOptionsAction === 'function' ? setOptionsAction(state.options) : setOptionsAction;
        cleanupModifierEffects();
        state.options = Object.assign({}, defaultOptions, state.options, options);
        state.scrollParents = {
          reference: isElement$1(reference) ? listScrollParents(reference) : reference.contextElement ? listScrollParents(reference.contextElement) : [],
          popper: listScrollParents(popper)
        }; // Orders the modifiers based on their dependencies and `phase`
        // properties

        var orderedModifiers = orderModifiers(mergeByName([].concat(defaultModifiers, state.options.modifiers))); // Strip out disabled modifiers

        state.orderedModifiers = orderedModifiers.filter(function (m) {
          return m.enabled;
        });
        runModifierEffects();
        return instance.update();
      },
      // Sync update – it will always be executed, even if not necessary. This
      // is useful for low frequency updates where sync behavior simplifies the
      // logic.
      // For high frequency updates (e.g. `resize` and `scroll` events), always
      // prefer the async Popper#update method
      forceUpdate: function forceUpdate() {
        if (isDestroyed) {
          return;
        }

        var _state$elements = state.elements,
            reference = _state$elements.reference,
            popper = _state$elements.popper; // Don't proceed if `reference` or `popper` are not valid elements
        // anymore

        if (!areValidElements(reference, popper)) {
          return;
        } // Store the reference and popper rects to be read by modifiers


        state.rects = {
          reference: getCompositeRect(reference, getOffsetParent(popper), state.options.strategy === 'fixed'),
          popper: getLayoutRect(popper)
        }; // Modifiers have the ability to reset the current update cycle. The
        // most common use case for this is the `flip` modifier changing the
        // placement, which then needs to re-run all the modifiers, because the
        // logic was previously ran for the previous placement and is therefore
        // stale/incorrect

        state.reset = false;
        state.placement = state.options.placement; // On each update cycle, the `modifiersData` property for each modifier
        // is filled with the initial data specified by the modifier. This means
        // it doesn't persist and is fresh on each update.
        // To ensure persistent data, use `${name}#persistent`

        state.orderedModifiers.forEach(function (modifier) {
          return state.modifiersData[modifier.name] = Object.assign({}, modifier.data);
        });

        for (var index = 0; index < state.orderedModifiers.length; index++) {
          if (state.reset === true) {
            state.reset = false;
            index = -1;
            continue;
          }

          var _state$orderedModifie = state.orderedModifiers[index],
              fn = _state$orderedModifie.fn,
              _state$orderedModifie2 = _state$orderedModifie.options,
              _options = _state$orderedModifie2 === void 0 ? {} : _state$orderedModifie2,
              name = _state$orderedModifie.name;

          if (typeof fn === 'function') {
            state = fn({
              state: state,
              options: _options,
              name: name,
              instance: instance
            }) || state;
          }
        }
      },
      // Async and optimistically optimized update – it will not be executed if
      // not necessary (debounced to run at most once-per-tick)
      update: debounce$1(function () {
        return new Promise(function (resolve) {
          instance.forceUpdate();
          resolve(state);
        });
      }),
      destroy: function destroy() {
        cleanupModifierEffects();
        isDestroyed = true;
      }
    };

    if (!areValidElements(reference, popper)) {
      return instance;
    }

    instance.setOptions(options).then(function (state) {
      if (!isDestroyed && options.onFirstUpdate) {
        options.onFirstUpdate(state);
      }
    }); // Modifiers have the ability to execute arbitrary code before the first
    // update cycle runs. They will be executed in the same order as the update
    // cycle. This is useful when a modifier adds some persistent data that
    // other modifiers need to use, but the modifier is run after the dependent
    // one.

    function runModifierEffects() {
      state.orderedModifiers.forEach(function (_ref) {
        var name = _ref.name,
            _ref$options = _ref.options,
            options = _ref$options === void 0 ? {} : _ref$options,
            effect = _ref.effect;

        if (typeof effect === 'function') {
          var cleanupFn = effect({
            state: state,
            name: name,
            instance: instance,
            options: options
          });

          var noopFn = function noopFn() {};

          effectCleanupFns.push(cleanupFn || noopFn);
        }
      });
    }

    function cleanupModifierEffects() {
      effectCleanupFns.forEach(function (fn) {
        return fn();
      });
      effectCleanupFns = [];
    }

    return instance;
  };
}

var defaultModifiers = [eventListeners, popperOffsets$1, computeStyles$1, applyStyles$1, offset$1, flip$1, preventOverflow$1, arrow$1, hide$1];
var createPopper = /*#__PURE__*/popperGenerator({
  defaultModifiers: defaultModifiers
}); // eslint-disable-next-line import/no-unused-modules

/**!
* tippy.js v6.3.7
* (c) 2017-2021 atomiks
* MIT License
*/
var BOX_CLASS = "tippy-box";
var CONTENT_CLASS = "tippy-content";
var BACKDROP_CLASS = "tippy-backdrop";
var ARROW_CLASS = "tippy-arrow";
var SVG_ARROW_CLASS = "tippy-svg-arrow";
var TOUCH_OPTIONS = {
  passive: true,
  capture: true
};
var TIPPY_DEFAULT_APPEND_TO = function TIPPY_DEFAULT_APPEND_TO() {
  return document.body;
};
function getValueAtIndexOrReturn(value, index, defaultValue) {
  if (Array.isArray(value)) {
    var v = value[index];
    return v == null ? Array.isArray(defaultValue) ? defaultValue[index] : defaultValue : v;
  }

  return value;
}
function isType(value, type) {
  var str = {}.toString.call(value);
  return str.indexOf('[object') === 0 && str.indexOf(type + "]") > -1;
}
function invokeWithArgsOrReturn(value, args) {
  return typeof value === 'function' ? value.apply(void 0, args) : value;
}
function debounce(fn, ms) {
  // Avoid wrapping in `setTimeout` if ms is 0 anyway
  if (ms === 0) {
    return fn;
  }

  var timeout;
  return function (arg) {
    clearTimeout(timeout);
    timeout = setTimeout(function () {
      fn(arg);
    }, ms);
  };
}
function splitBySpaces(value) {
  return value.split(/\s+/).filter(Boolean);
}
function normalizeToArray(value) {
  return [].concat(value);
}
function pushIfUnique(arr, value) {
  if (arr.indexOf(value) === -1) {
    arr.push(value);
  }
}
function unique(arr) {
  return arr.filter(function (item, index) {
    return arr.indexOf(item) === index;
  });
}
function getBasePlacement(placement) {
  return placement.split('-')[0];
}
function arrayFrom(value) {
  return [].slice.call(value);
}
function removeUndefinedProps(obj) {
  return Object.keys(obj).reduce(function (acc, key) {
    if (obj[key] !== undefined) {
      acc[key] = obj[key];
    }

    return acc;
  }, {});
}

function div() {
  return document.createElement('div');
}
function isElement(value) {
  return ['Element', 'Fragment'].some(function (type) {
    return isType(value, type);
  });
}
function isNodeList(value) {
  return isType(value, 'NodeList');
}
function isMouseEvent(value) {
  return isType(value, 'MouseEvent');
}
function isReferenceElement(value) {
  return !!(value && value._tippy && value._tippy.reference === value);
}
function getArrayOfElements(value) {
  if (isElement(value)) {
    return [value];
  }

  if (isNodeList(value)) {
    return arrayFrom(value);
  }

  if (Array.isArray(value)) {
    return value;
  }

  return arrayFrom(document.querySelectorAll(value));
}
function setTransitionDuration(els, value) {
  els.forEach(function (el) {
    if (el) {
      el.style.transitionDuration = value + "ms";
    }
  });
}
function setVisibilityState(els, state) {
  els.forEach(function (el) {
    if (el) {
      el.setAttribute('data-state', state);
    }
  });
}
function getOwnerDocument(elementOrElements) {
  var _element$ownerDocumen;

  var _normalizeToArray = normalizeToArray(elementOrElements),
      element = _normalizeToArray[0]; // Elements created via a <template> have an ownerDocument with no reference to the body


  return element != null && (_element$ownerDocumen = element.ownerDocument) != null && _element$ownerDocumen.body ? element.ownerDocument : document;
}
function isCursorOutsideInteractiveBorder(popperTreeData, event) {
  var clientX = event.clientX,
      clientY = event.clientY;
  return popperTreeData.every(function (_ref) {
    var popperRect = _ref.popperRect,
        popperState = _ref.popperState,
        props = _ref.props;
    var interactiveBorder = props.interactiveBorder;
    var basePlacement = getBasePlacement(popperState.placement);
    var offsetData = popperState.modifiersData.offset;

    if (!offsetData) {
      return true;
    }

    var topDistance = basePlacement === 'bottom' ? offsetData.top.y : 0;
    var bottomDistance = basePlacement === 'top' ? offsetData.bottom.y : 0;
    var leftDistance = basePlacement === 'right' ? offsetData.left.x : 0;
    var rightDistance = basePlacement === 'left' ? offsetData.right.x : 0;
    var exceedsTop = popperRect.top - clientY + topDistance > interactiveBorder;
    var exceedsBottom = clientY - popperRect.bottom - bottomDistance > interactiveBorder;
    var exceedsLeft = popperRect.left - clientX + leftDistance > interactiveBorder;
    var exceedsRight = clientX - popperRect.right - rightDistance > interactiveBorder;
    return exceedsTop || exceedsBottom || exceedsLeft || exceedsRight;
  });
}
function updateTransitionEndListener(box, action, listener) {
  var method = action + "EventListener"; // some browsers apparently support `transition` (unprefixed) but only fire
  // `webkitTransitionEnd`...

  ['transitionend', 'webkitTransitionEnd'].forEach(function (event) {
    box[method](event, listener);
  });
}
/**
 * Compared to xxx.contains, this function works for dom structures with shadow
 * dom
 */

function actualContains(parent, child) {
  var target = child;

  while (target) {
    var _target$getRootNode;

    if (parent.contains(target)) {
      return true;
    }

    target = target.getRootNode == null ? void 0 : (_target$getRootNode = target.getRootNode()) == null ? void 0 : _target$getRootNode.host;
  }

  return false;
}

var currentInput = {
  isTouch: false
};
var lastMouseMoveTime = 0;
/**
 * When a `touchstart` event is fired, it's assumed the user is using touch
 * input. We'll bind a `mousemove` event listener to listen for mouse input in
 * the future. This way, the `isTouch` property is fully dynamic and will handle
 * hybrid devices that use a mix of touch + mouse input.
 */

function onDocumentTouchStart() {
  if (currentInput.isTouch) {
    return;
  }

  currentInput.isTouch = true;

  if (window.performance) {
    document.addEventListener('mousemove', onDocumentMouseMove);
  }
}
/**
 * When two `mousemove` event are fired consecutively within 20ms, it's assumed
 * the user is using mouse input again. `mousemove` can fire on touch devices as
 * well, but very rarely that quickly.
 */

function onDocumentMouseMove() {
  var now = performance.now();

  if (now - lastMouseMoveTime < 20) {
    currentInput.isTouch = false;
    document.removeEventListener('mousemove', onDocumentMouseMove);
  }

  lastMouseMoveTime = now;
}
/**
 * When an element is in focus and has a tippy, leaving the tab/window and
 * returning causes it to show again. For mouse users this is unexpected, but
 * for keyboard use it makes sense.
 * TODO: find a better technique to solve this problem
 */

function onWindowBlur() {
  var activeElement = document.activeElement;

  if (isReferenceElement(activeElement)) {
    var instance = activeElement._tippy;

    if (activeElement.blur && !instance.state.isVisible) {
      activeElement.blur();
    }
  }
}
function bindGlobalEventListeners() {
  document.addEventListener('touchstart', onDocumentTouchStart, TOUCH_OPTIONS);
  window.addEventListener('blur', onWindowBlur);
}

var isBrowser = typeof window !== 'undefined' && typeof document !== 'undefined';
var isIE11 = isBrowser ? // @ts-ignore
!!window.msCrypto : false;

var pluginProps = {
  animateFill: false,
  followCursor: false,
  inlinePositioning: false,
  sticky: false
};
var renderProps = {
  allowHTML: false,
  animation: 'fade',
  arrow: true,
  content: '',
  inertia: false,
  maxWidth: 350,
  role: 'tooltip',
  theme: '',
  zIndex: 9999
};
var defaultProps = Object.assign({
  appendTo: TIPPY_DEFAULT_APPEND_TO,
  aria: {
    content: 'auto',
    expanded: 'auto'
  },
  delay: 0,
  duration: [300, 250],
  getReferenceClientRect: null,
  hideOnClick: true,
  ignoreAttributes: false,
  interactive: false,
  interactiveBorder: 2,
  interactiveDebounce: 0,
  moveTransition: '',
  offset: [0, 10],
  onAfterUpdate: function onAfterUpdate() {},
  onBeforeUpdate: function onBeforeUpdate() {},
  onCreate: function onCreate() {},
  onDestroy: function onDestroy() {},
  onHidden: function onHidden() {},
  onHide: function onHide() {},
  onMount: function onMount() {},
  onShow: function onShow() {},
  onShown: function onShown() {},
  onTrigger: function onTrigger() {},
  onUntrigger: function onUntrigger() {},
  onClickOutside: function onClickOutside() {},
  placement: 'top',
  plugins: [],
  popperOptions: {},
  render: null,
  showOnCreate: false,
  touch: true,
  trigger: 'mouseenter focus',
  triggerTarget: null
}, pluginProps, renderProps);
var defaultKeys = Object.keys(defaultProps);
var setDefaultProps = function setDefaultProps(partialProps) {

  var keys = Object.keys(partialProps);
  keys.forEach(function (key) {
    defaultProps[key] = partialProps[key];
  });
};
function getExtendedPassedProps(passedProps) {
  var plugins = passedProps.plugins || [];
  var pluginProps = plugins.reduce(function (acc, plugin) {
    var name = plugin.name,
        defaultValue = plugin.defaultValue;

    if (name) {
      var _name;

      acc[name] = passedProps[name] !== undefined ? passedProps[name] : (_name = defaultProps[name]) != null ? _name : defaultValue;
    }

    return acc;
  }, {});
  return Object.assign({}, passedProps, pluginProps);
}
function getDataAttributeProps(reference, plugins) {
  var propKeys = plugins ? Object.keys(getExtendedPassedProps(Object.assign({}, defaultProps, {
    plugins: plugins
  }))) : defaultKeys;
  var props = propKeys.reduce(function (acc, key) {
    var valueAsString = (reference.getAttribute("data-tippy-" + key) || '').trim();

    if (!valueAsString) {
      return acc;
    }

    if (key === 'content') {
      acc[key] = valueAsString;
    } else {
      try {
        acc[key] = JSON.parse(valueAsString);
      } catch (e) {
        acc[key] = valueAsString;
      }
    }

    return acc;
  }, {});
  return props;
}
function evaluateProps(reference, props) {
  var out = Object.assign({}, props, {
    content: invokeWithArgsOrReturn(props.content, [reference])
  }, props.ignoreAttributes ? {} : getDataAttributeProps(reference, props.plugins));
  out.aria = Object.assign({}, defaultProps.aria, out.aria);
  out.aria = {
    expanded: out.aria.expanded === 'auto' ? props.interactive : out.aria.expanded,
    content: out.aria.content === 'auto' ? props.interactive ? null : 'describedby' : out.aria.content
  };
  return out;
}

var innerHTML = function innerHTML() {
  return 'innerHTML';
};

function dangerouslySetInnerHTML(element, html) {
  element[innerHTML()] = html;
}

function createArrowElement(value) {
  var arrow = div();

  if (value === true) {
    arrow.className = ARROW_CLASS;
  } else {
    arrow.className = SVG_ARROW_CLASS;

    if (isElement(value)) {
      arrow.appendChild(value);
    } else {
      dangerouslySetInnerHTML(arrow, value);
    }
  }

  return arrow;
}

function setContent(content, props) {
  if (isElement(props.content)) {
    dangerouslySetInnerHTML(content, '');
    content.appendChild(props.content);
  } else if (typeof props.content !== 'function') {
    if (props.allowHTML) {
      dangerouslySetInnerHTML(content, props.content);
    } else {
      content.textContent = props.content;
    }
  }
}
function getChildren(popper) {
  var box = popper.firstElementChild;
  var boxChildren = arrayFrom(box.children);
  return {
    box: box,
    content: boxChildren.find(function (node) {
      return node.classList.contains(CONTENT_CLASS);
    }),
    arrow: boxChildren.find(function (node) {
      return node.classList.contains(ARROW_CLASS) || node.classList.contains(SVG_ARROW_CLASS);
    }),
    backdrop: boxChildren.find(function (node) {
      return node.classList.contains(BACKDROP_CLASS);
    })
  };
}
function render(instance) {
  var popper = div();
  var box = div();
  box.className = BOX_CLASS;
  box.setAttribute('data-state', 'hidden');
  box.setAttribute('tabindex', '-1');
  var content = div();
  content.className = CONTENT_CLASS;
  content.setAttribute('data-state', 'hidden');
  setContent(content, instance.props);
  popper.appendChild(box);
  box.appendChild(content);
  onUpdate(instance.props, instance.props);

  function onUpdate(prevProps, nextProps) {
    var _getChildren = getChildren(popper),
        box = _getChildren.box,
        content = _getChildren.content,
        arrow = _getChildren.arrow;

    if (nextProps.theme) {
      box.setAttribute('data-theme', nextProps.theme);
    } else {
      box.removeAttribute('data-theme');
    }

    if (typeof nextProps.animation === 'string') {
      box.setAttribute('data-animation', nextProps.animation);
    } else {
      box.removeAttribute('data-animation');
    }

    if (nextProps.inertia) {
      box.setAttribute('data-inertia', '');
    } else {
      box.removeAttribute('data-inertia');
    }

    box.style.maxWidth = typeof nextProps.maxWidth === 'number' ? nextProps.maxWidth + "px" : nextProps.maxWidth;

    if (nextProps.role) {
      box.setAttribute('role', nextProps.role);
    } else {
      box.removeAttribute('role');
    }

    if (prevProps.content !== nextProps.content || prevProps.allowHTML !== nextProps.allowHTML) {
      setContent(content, instance.props);
    }

    if (nextProps.arrow) {
      if (!arrow) {
        box.appendChild(createArrowElement(nextProps.arrow));
      } else if (prevProps.arrow !== nextProps.arrow) {
        box.removeChild(arrow);
        box.appendChild(createArrowElement(nextProps.arrow));
      }
    } else if (arrow) {
      box.removeChild(arrow);
    }
  }

  return {
    popper: popper,
    onUpdate: onUpdate
  };
} // Runtime check to identify if the render function is the default one; this
// way we can apply default CSS transitions logic and it can be tree-shaken away

render.$$tippy = true;

var idCounter = 1;
var mouseMoveListeners = []; // Used by `hideAll()`

var mountedInstances = [];
function createTippy(reference, passedProps) {
  var props = evaluateProps(reference, Object.assign({}, defaultProps, getExtendedPassedProps(removeUndefinedProps(passedProps)))); // ===========================================================================
  // 🔒 Private members
  // ===========================================================================

  var showTimeout;
  var hideTimeout;
  var scheduleHideAnimationFrame;
  var isVisibleFromClick = false;
  var didHideDueToDocumentMouseDown = false;
  var didTouchMove = false;
  var ignoreOnFirstUpdate = false;
  var lastTriggerEvent;
  var currentTransitionEndListener;
  var onFirstUpdate;
  var listeners = [];
  var debouncedOnMouseMove = debounce(onMouseMove, props.interactiveDebounce);
  var currentTarget; // ===========================================================================
  // 🔑 Public members
  // ===========================================================================

  var id = idCounter++;
  var popperInstance = null;
  var plugins = unique(props.plugins);
  var state = {
    // Is the instance currently enabled?
    isEnabled: true,
    // Is the tippy currently showing and not transitioning out?
    isVisible: false,
    // Has the instance been destroyed?
    isDestroyed: false,
    // Is the tippy currently mounted to the DOM?
    isMounted: false,
    // Has the tippy finished transitioning in?
    isShown: false
  };
  var instance = {
    // properties
    id: id,
    reference: reference,
    popper: div(),
    popperInstance: popperInstance,
    props: props,
    state: state,
    plugins: plugins,
    // methods
    clearDelayTimeouts: clearDelayTimeouts,
    setProps: setProps,
    setContent: setContent,
    show: show,
    hide: hide,
    hideWithInteractivity: hideWithInteractivity,
    enable: enable,
    disable: disable,
    unmount: unmount,
    destroy: destroy
  }; // TODO: Investigate why this early return causes a TDZ error in the tests —
  // it doesn't seem to happen in the browser

  /* istanbul ignore if */

  if (!props.render) {

    return instance;
  } // ===========================================================================
  // Initial mutations
  // ===========================================================================


  var _props$render = props.render(instance),
      popper = _props$render.popper,
      onUpdate = _props$render.onUpdate;

  popper.setAttribute('data-tippy-root', '');
  popper.id = "tippy-" + instance.id;
  instance.popper = popper;
  reference._tippy = instance;
  popper._tippy = instance;
  var pluginsHooks = plugins.map(function (plugin) {
    return plugin.fn(instance);
  });
  var hasAriaExpanded = reference.hasAttribute('aria-expanded');
  addListeners();
  handleAriaExpandedAttribute();
  handleStyles();
  invokeHook('onCreate', [instance]);

  if (props.showOnCreate) {
    scheduleShow();
  } // Prevent a tippy with a delay from hiding if the cursor left then returned
  // before it started hiding


  popper.addEventListener('mouseenter', function () {
    if (instance.props.interactive && instance.state.isVisible) {
      instance.clearDelayTimeouts();
    }
  });
  popper.addEventListener('mouseleave', function () {
    if (instance.props.interactive && instance.props.trigger.indexOf('mouseenter') >= 0) {
      getDocument().addEventListener('mousemove', debouncedOnMouseMove);
    }
  });
  return instance; // ===========================================================================
  // 🔒 Private methods
  // ===========================================================================

  function getNormalizedTouchSettings() {
    var touch = instance.props.touch;
    return Array.isArray(touch) ? touch : [touch, 0];
  }

  function getIsCustomTouchBehavior() {
    return getNormalizedTouchSettings()[0] === 'hold';
  }

  function getIsDefaultRenderFn() {
    var _instance$props$rende;

    // @ts-ignore
    return !!((_instance$props$rende = instance.props.render) != null && _instance$props$rende.$$tippy);
  }

  function getCurrentTarget() {
    return currentTarget || reference;
  }

  function getDocument() {
    var parent = getCurrentTarget().parentNode;
    return parent ? getOwnerDocument(parent) : document;
  }

  function getDefaultTemplateChildren() {
    return getChildren(popper);
  }

  function getDelay(isShow) {
    // For touch or keyboard input, force `0` delay for UX reasons
    // Also if the instance is mounted but not visible (transitioning out),
    // ignore delay
    if (instance.state.isMounted && !instance.state.isVisible || currentInput.isTouch || lastTriggerEvent && lastTriggerEvent.type === 'focus') {
      return 0;
    }

    return getValueAtIndexOrReturn(instance.props.delay, isShow ? 0 : 1, defaultProps.delay);
  }

  function handleStyles(fromHide) {
    if (fromHide === void 0) {
      fromHide = false;
    }

    popper.style.pointerEvents = instance.props.interactive && !fromHide ? '' : 'none';
    popper.style.zIndex = "" + instance.props.zIndex;
  }

  function invokeHook(hook, args, shouldInvokePropsHook) {
    if (shouldInvokePropsHook === void 0) {
      shouldInvokePropsHook = true;
    }

    pluginsHooks.forEach(function (pluginHooks) {
      if (pluginHooks[hook]) {
        pluginHooks[hook].apply(pluginHooks, args);
      }
    });

    if (shouldInvokePropsHook) {
      var _instance$props;

      (_instance$props = instance.props)[hook].apply(_instance$props, args);
    }
  }

  function handleAriaContentAttribute() {
    var aria = instance.props.aria;

    if (!aria.content) {
      return;
    }

    var attr = "aria-" + aria.content;
    var id = popper.id;
    var nodes = normalizeToArray(instance.props.triggerTarget || reference);
    nodes.forEach(function (node) {
      var currentValue = node.getAttribute(attr);

      if (instance.state.isVisible) {
        node.setAttribute(attr, currentValue ? currentValue + " " + id : id);
      } else {
        var nextValue = currentValue && currentValue.replace(id, '').trim();

        if (nextValue) {
          node.setAttribute(attr, nextValue);
        } else {
          node.removeAttribute(attr);
        }
      }
    });
  }

  function handleAriaExpandedAttribute() {
    if (hasAriaExpanded || !instance.props.aria.expanded) {
      return;
    }

    var nodes = normalizeToArray(instance.props.triggerTarget || reference);
    nodes.forEach(function (node) {
      if (instance.props.interactive) {
        node.setAttribute('aria-expanded', instance.state.isVisible && node === getCurrentTarget() ? 'true' : 'false');
      } else {
        node.removeAttribute('aria-expanded');
      }
    });
  }

  function cleanupInteractiveMouseListeners() {
    getDocument().removeEventListener('mousemove', debouncedOnMouseMove);
    mouseMoveListeners = mouseMoveListeners.filter(function (listener) {
      return listener !== debouncedOnMouseMove;
    });
  }

  function onDocumentPress(event) {
    // Moved finger to scroll instead of an intentional tap outside
    if (currentInput.isTouch) {
      if (didTouchMove || event.type === 'mousedown') {
        return;
      }
    }

    var actualTarget = event.composedPath && event.composedPath()[0] || event.target; // Clicked on interactive popper

    if (instance.props.interactive && actualContains(popper, actualTarget)) {
      return;
    } // Clicked on the event listeners target


    if (normalizeToArray(instance.props.triggerTarget || reference).some(function (el) {
      return actualContains(el, actualTarget);
    })) {
      if (currentInput.isTouch) {
        return;
      }

      if (instance.state.isVisible && instance.props.trigger.indexOf('click') >= 0) {
        return;
      }
    } else {
      invokeHook('onClickOutside', [instance, event]);
    }

    if (instance.props.hideOnClick === true) {
      instance.clearDelayTimeouts();
      instance.hide(); // `mousedown` event is fired right before `focus` if pressing the
      // currentTarget. This lets a tippy with `focus` trigger know that it
      // should not show

      didHideDueToDocumentMouseDown = true;
      setTimeout(function () {
        didHideDueToDocumentMouseDown = false;
      }); // The listener gets added in `scheduleShow()`, but this may be hiding it
      // before it shows, and hide()'s early bail-out behavior can prevent it
      // from being cleaned up

      if (!instance.state.isMounted) {
        removeDocumentPress();
      }
    }
  }

  function onTouchMove() {
    didTouchMove = true;
  }

  function onTouchStart() {
    didTouchMove = false;
  }

  function addDocumentPress() {
    var doc = getDocument();
    doc.addEventListener('mousedown', onDocumentPress, true);
    doc.addEventListener('touchend', onDocumentPress, TOUCH_OPTIONS);
    doc.addEventListener('touchstart', onTouchStart, TOUCH_OPTIONS);
    doc.addEventListener('touchmove', onTouchMove, TOUCH_OPTIONS);
  }

  function removeDocumentPress() {
    var doc = getDocument();
    doc.removeEventListener('mousedown', onDocumentPress, true);
    doc.removeEventListener('touchend', onDocumentPress, TOUCH_OPTIONS);
    doc.removeEventListener('touchstart', onTouchStart, TOUCH_OPTIONS);
    doc.removeEventListener('touchmove', onTouchMove, TOUCH_OPTIONS);
  }

  function onTransitionedOut(duration, callback) {
    onTransitionEnd(duration, function () {
      if (!instance.state.isVisible && popper.parentNode && popper.parentNode.contains(popper)) {
        callback();
      }
    });
  }

  function onTransitionedIn(duration, callback) {
    onTransitionEnd(duration, callback);
  }

  function onTransitionEnd(duration, callback) {
    var box = getDefaultTemplateChildren().box;

    function listener(event) {
      if (event.target === box) {
        updateTransitionEndListener(box, 'remove', listener);
        callback();
      }
    } // Make callback synchronous if duration is 0
    // `transitionend` won't fire otherwise


    if (duration === 0) {
      return callback();
    }

    updateTransitionEndListener(box, 'remove', currentTransitionEndListener);
    updateTransitionEndListener(box, 'add', listener);
    currentTransitionEndListener = listener;
  }

  function on(eventType, handler, options) {
    if (options === void 0) {
      options = false;
    }

    var nodes = normalizeToArray(instance.props.triggerTarget || reference);
    nodes.forEach(function (node) {
      node.addEventListener(eventType, handler, options);
      listeners.push({
        node: node,
        eventType: eventType,
        handler: handler,
        options: options
      });
    });
  }

  function addListeners() {
    if (getIsCustomTouchBehavior()) {
      on('touchstart', onTrigger, {
        passive: true
      });
      on('touchend', onMouseLeave, {
        passive: true
      });
    }

    splitBySpaces(instance.props.trigger).forEach(function (eventType) {
      if (eventType === 'manual') {
        return;
      }

      on(eventType, onTrigger);

      switch (eventType) {
        case 'mouseenter':
          on('mouseleave', onMouseLeave);
          break;

        case 'focus':
          on(isIE11 ? 'focusout' : 'blur', onBlurOrFocusOut);
          break;

        case 'focusin':
          on('focusout', onBlurOrFocusOut);
          break;
      }
    });
  }

  function removeListeners() {
    listeners.forEach(function (_ref) {
      var node = _ref.node,
          eventType = _ref.eventType,
          handler = _ref.handler,
          options = _ref.options;
      node.removeEventListener(eventType, handler, options);
    });
    listeners = [];
  }

  function onTrigger(event) {
    var _lastTriggerEvent;

    var shouldScheduleClickHide = false;

    if (!instance.state.isEnabled || isEventListenerStopped(event) || didHideDueToDocumentMouseDown) {
      return;
    }

    var wasFocused = ((_lastTriggerEvent = lastTriggerEvent) == null ? void 0 : _lastTriggerEvent.type) === 'focus';
    lastTriggerEvent = event;
    currentTarget = event.currentTarget;
    handleAriaExpandedAttribute();

    if (!instance.state.isVisible && isMouseEvent(event)) {
      // If scrolling, `mouseenter` events can be fired if the cursor lands
      // over a new target, but `mousemove` events don't get fired. This
      // causes interactive tooltips to get stuck open until the cursor is
      // moved
      mouseMoveListeners.forEach(function (listener) {
        return listener(event);
      });
    } // Toggle show/hide when clicking click-triggered tooltips


    if (event.type === 'click' && (instance.props.trigger.indexOf('mouseenter') < 0 || isVisibleFromClick) && instance.props.hideOnClick !== false && instance.state.isVisible) {
      shouldScheduleClickHide = true;
    } else {
      scheduleShow(event);
    }

    if (event.type === 'click') {
      isVisibleFromClick = !shouldScheduleClickHide;
    }

    if (shouldScheduleClickHide && !wasFocused) {
      scheduleHide(event);
    }
  }

  function onMouseMove(event) {
    var target = event.target;
    var isCursorOverReferenceOrPopper = getCurrentTarget().contains(target) || popper.contains(target);

    if (event.type === 'mousemove' && isCursorOverReferenceOrPopper) {
      return;
    }

    var popperTreeData = getNestedPopperTree().concat(popper).map(function (popper) {
      var _instance$popperInsta;

      var instance = popper._tippy;
      var state = (_instance$popperInsta = instance.popperInstance) == null ? void 0 : _instance$popperInsta.state;

      if (state) {
        return {
          popperRect: popper.getBoundingClientRect(),
          popperState: state,
          props: props
        };
      }

      return null;
    }).filter(Boolean);

    if (isCursorOutsideInteractiveBorder(popperTreeData, event)) {
      cleanupInteractiveMouseListeners();
      scheduleHide(event);
    }
  }

  function onMouseLeave(event) {
    var shouldBail = isEventListenerStopped(event) || instance.props.trigger.indexOf('click') >= 0 && isVisibleFromClick;

    if (shouldBail) {
      return;
    }

    if (instance.props.interactive) {
      instance.hideWithInteractivity(event);
      return;
    }

    scheduleHide(event);
  }

  function onBlurOrFocusOut(event) {
    if (instance.props.trigger.indexOf('focusin') < 0 && event.target !== getCurrentTarget()) {
      return;
    } // If focus was moved to within the popper


    if (instance.props.interactive && event.relatedTarget && popper.contains(event.relatedTarget)) {
      return;
    }

    scheduleHide(event);
  }

  function isEventListenerStopped(event) {
    return currentInput.isTouch ? getIsCustomTouchBehavior() !== event.type.indexOf('touch') >= 0 : false;
  }

  function createPopperInstance() {
    destroyPopperInstance();
    var _instance$props2 = instance.props,
        popperOptions = _instance$props2.popperOptions,
        placement = _instance$props2.placement,
        offset = _instance$props2.offset,
        getReferenceClientRect = _instance$props2.getReferenceClientRect,
        moveTransition = _instance$props2.moveTransition;
    var arrow = getIsDefaultRenderFn() ? getChildren(popper).arrow : null;
    var computedReference = getReferenceClientRect ? {
      getBoundingClientRect: getReferenceClientRect,
      contextElement: getReferenceClientRect.contextElement || getCurrentTarget()
    } : reference;
    var tippyModifier = {
      name: '$$tippy',
      enabled: true,
      phase: 'beforeWrite',
      requires: ['computeStyles'],
      fn: function fn(_ref2) {
        var state = _ref2.state;

        if (getIsDefaultRenderFn()) {
          var _getDefaultTemplateCh = getDefaultTemplateChildren(),
              box = _getDefaultTemplateCh.box;

          ['placement', 'reference-hidden', 'escaped'].forEach(function (attr) {
            if (attr === 'placement') {
              box.setAttribute('data-placement', state.placement);
            } else {
              if (state.attributes.popper["data-popper-" + attr]) {
                box.setAttribute("data-" + attr, '');
              } else {
                box.removeAttribute("data-" + attr);
              }
            }
          });
          state.attributes.popper = {};
        }
      }
    };
    var modifiers = [{
      name: 'offset',
      options: {
        offset: offset
      }
    }, {
      name: 'preventOverflow',
      options: {
        padding: {
          top: 2,
          bottom: 2,
          left: 5,
          right: 5
        }
      }
    }, {
      name: 'flip',
      options: {
        padding: 5
      }
    }, {
      name: 'computeStyles',
      options: {
        adaptive: !moveTransition
      }
    }, tippyModifier];

    if (getIsDefaultRenderFn() && arrow) {
      modifiers.push({
        name: 'arrow',
        options: {
          element: arrow,
          padding: 3
        }
      });
    }

    modifiers.push.apply(modifiers, (popperOptions == null ? void 0 : popperOptions.modifiers) || []);
    instance.popperInstance = createPopper(computedReference, popper, Object.assign({}, popperOptions, {
      placement: placement,
      onFirstUpdate: onFirstUpdate,
      modifiers: modifiers
    }));
  }

  function destroyPopperInstance() {
    if (instance.popperInstance) {
      instance.popperInstance.destroy();
      instance.popperInstance = null;
    }
  }

  function mount() {
    var appendTo = instance.props.appendTo;
    var parentNode; // By default, we'll append the popper to the triggerTargets's parentNode so
    // it's directly after the reference element so the elements inside the
    // tippy can be tabbed to
    // If there are clipping issues, the user can specify a different appendTo
    // and ensure focus management is handled correctly manually

    var node = getCurrentTarget();

    if (instance.props.interactive && appendTo === TIPPY_DEFAULT_APPEND_TO || appendTo === 'parent') {
      parentNode = node.parentNode;
    } else {
      parentNode = invokeWithArgsOrReturn(appendTo, [node]);
    } // The popper element needs to exist on the DOM before its position can be
    // updated as Popper needs to read its dimensions


    if (!parentNode.contains(popper)) {
      parentNode.appendChild(popper);
    }

    instance.state.isMounted = true;
    createPopperInstance();
  }

  function getNestedPopperTree() {
    return arrayFrom(popper.querySelectorAll('[data-tippy-root]'));
  }

  function scheduleShow(event) {
    instance.clearDelayTimeouts();

    if (event) {
      invokeHook('onTrigger', [instance, event]);
    }

    addDocumentPress();
    var delay = getDelay(true);

    var _getNormalizedTouchSe = getNormalizedTouchSettings(),
        touchValue = _getNormalizedTouchSe[0],
        touchDelay = _getNormalizedTouchSe[1];

    if (currentInput.isTouch && touchValue === 'hold' && touchDelay) {
      delay = touchDelay;
    }

    if (delay) {
      showTimeout = setTimeout(function () {
        instance.show();
      }, delay);
    } else {
      instance.show();
    }
  }

  function scheduleHide(event) {
    instance.clearDelayTimeouts();
    invokeHook('onUntrigger', [instance, event]);

    if (!instance.state.isVisible) {
      removeDocumentPress();
      return;
    } // For interactive tippies, scheduleHide is added to a document.body handler
    // from onMouseLeave so must intercept scheduled hides from mousemove/leave
    // events when trigger contains mouseenter and click, and the tip is
    // currently shown as a result of a click.


    if (instance.props.trigger.indexOf('mouseenter') >= 0 && instance.props.trigger.indexOf('click') >= 0 && ['mouseleave', 'mousemove'].indexOf(event.type) >= 0 && isVisibleFromClick) {
      return;
    }

    var delay = getDelay(false);

    if (delay) {
      hideTimeout = setTimeout(function () {
        if (instance.state.isVisible) {
          instance.hide();
        }
      }, delay);
    } else {
      // Fixes a `transitionend` problem when it fires 1 frame too
      // late sometimes, we don't want hide() to be called.
      scheduleHideAnimationFrame = requestAnimationFrame(function () {
        instance.hide();
      });
    }
  } // ===========================================================================
  // 🔑 Public methods
  // ===========================================================================


  function enable() {
    instance.state.isEnabled = true;
  }

  function disable() {
    // Disabling the instance should also hide it
    // https://github.com/atomiks/tippy.js-react/issues/106
    instance.hide();
    instance.state.isEnabled = false;
  }

  function clearDelayTimeouts() {
    clearTimeout(showTimeout);
    clearTimeout(hideTimeout);
    cancelAnimationFrame(scheduleHideAnimationFrame);
  }

  function setProps(partialProps) {

    if (instance.state.isDestroyed) {
      return;
    }

    invokeHook('onBeforeUpdate', [instance, partialProps]);
    removeListeners();
    var prevProps = instance.props;
    var nextProps = evaluateProps(reference, Object.assign({}, prevProps, removeUndefinedProps(partialProps), {
      ignoreAttributes: true
    }));
    instance.props = nextProps;
    addListeners();

    if (prevProps.interactiveDebounce !== nextProps.interactiveDebounce) {
      cleanupInteractiveMouseListeners();
      debouncedOnMouseMove = debounce(onMouseMove, nextProps.interactiveDebounce);
    } // Ensure stale aria-expanded attributes are removed


    if (prevProps.triggerTarget && !nextProps.triggerTarget) {
      normalizeToArray(prevProps.triggerTarget).forEach(function (node) {
        node.removeAttribute('aria-expanded');
      });
    } else if (nextProps.triggerTarget) {
      reference.removeAttribute('aria-expanded');
    }

    handleAriaExpandedAttribute();
    handleStyles();

    if (onUpdate) {
      onUpdate(prevProps, nextProps);
    }

    if (instance.popperInstance) {
      createPopperInstance(); // Fixes an issue with nested tippies if they are all getting re-rendered,
      // and the nested ones get re-rendered first.
      // https://github.com/atomiks/tippyjs-react/issues/177
      // TODO: find a cleaner / more efficient solution(!)

      getNestedPopperTree().forEach(function (nestedPopper) {
        // React (and other UI libs likely) requires a rAF wrapper as it flushes
        // its work in one
        requestAnimationFrame(nestedPopper._tippy.popperInstance.forceUpdate);
      });
    }

    invokeHook('onAfterUpdate', [instance, partialProps]);
  }

  function setContent(content) {
    instance.setProps({
      content: content
    });
  }

  function show() {


    var isAlreadyVisible = instance.state.isVisible;
    var isDestroyed = instance.state.isDestroyed;
    var isDisabled = !instance.state.isEnabled;
    var isTouchAndTouchDisabled = currentInput.isTouch && !instance.props.touch;
    var duration = getValueAtIndexOrReturn(instance.props.duration, 0, defaultProps.duration);

    if (isAlreadyVisible || isDestroyed || isDisabled || isTouchAndTouchDisabled) {
      return;
    } // Normalize `disabled` behavior across browsers.
    // Firefox allows events on disabled elements, but Chrome doesn't.
    // Using a wrapper element (i.e. <span>) is recommended.


    if (getCurrentTarget().hasAttribute('disabled')) {
      return;
    }

    invokeHook('onShow', [instance], false);

    if (instance.props.onShow(instance) === false) {
      return;
    }

    instance.state.isVisible = true;

    if (getIsDefaultRenderFn()) {
      popper.style.visibility = 'visible';
    }

    handleStyles();
    addDocumentPress();

    if (!instance.state.isMounted) {
      popper.style.transition = 'none';
    } // If flipping to the opposite side after hiding at least once, the
    // animation will use the wrong placement without resetting the duration


    if (getIsDefaultRenderFn()) {
      var _getDefaultTemplateCh2 = getDefaultTemplateChildren(),
          box = _getDefaultTemplateCh2.box,
          content = _getDefaultTemplateCh2.content;

      setTransitionDuration([box, content], 0);
    }

    onFirstUpdate = function onFirstUpdate() {
      var _instance$popperInsta2;

      if (!instance.state.isVisible || ignoreOnFirstUpdate) {
        return;
      }

      ignoreOnFirstUpdate = true; // reflow

      void popper.offsetHeight;
      popper.style.transition = instance.props.moveTransition;

      if (getIsDefaultRenderFn() && instance.props.animation) {
        var _getDefaultTemplateCh3 = getDefaultTemplateChildren(),
            _box = _getDefaultTemplateCh3.box,
            _content = _getDefaultTemplateCh3.content;

        setTransitionDuration([_box, _content], duration);
        setVisibilityState([_box, _content], 'visible');
      }

      handleAriaContentAttribute();
      handleAriaExpandedAttribute();
      pushIfUnique(mountedInstances, instance); // certain modifiers (e.g. `maxSize`) require a second update after the
      // popper has been positioned for the first time

      (_instance$popperInsta2 = instance.popperInstance) == null ? void 0 : _instance$popperInsta2.forceUpdate();
      invokeHook('onMount', [instance]);

      if (instance.props.animation && getIsDefaultRenderFn()) {
        onTransitionedIn(duration, function () {
          instance.state.isShown = true;
          invokeHook('onShown', [instance]);
        });
      }
    };

    mount();
  }

  function hide() {


    var isAlreadyHidden = !instance.state.isVisible;
    var isDestroyed = instance.state.isDestroyed;
    var isDisabled = !instance.state.isEnabled;
    var duration = getValueAtIndexOrReturn(instance.props.duration, 1, defaultProps.duration);

    if (isAlreadyHidden || isDestroyed || isDisabled) {
      return;
    }

    invokeHook('onHide', [instance], false);

    if (instance.props.onHide(instance) === false) {
      return;
    }

    instance.state.isVisible = false;
    instance.state.isShown = false;
    ignoreOnFirstUpdate = false;
    isVisibleFromClick = false;

    if (getIsDefaultRenderFn()) {
      popper.style.visibility = 'hidden';
    }

    cleanupInteractiveMouseListeners();
    removeDocumentPress();
    handleStyles(true);

    if (getIsDefaultRenderFn()) {
      var _getDefaultTemplateCh4 = getDefaultTemplateChildren(),
          box = _getDefaultTemplateCh4.box,
          content = _getDefaultTemplateCh4.content;

      if (instance.props.animation) {
        setTransitionDuration([box, content], duration);
        setVisibilityState([box, content], 'hidden');
      }
    }

    handleAriaContentAttribute();
    handleAriaExpandedAttribute();

    if (instance.props.animation) {
      if (getIsDefaultRenderFn()) {
        onTransitionedOut(duration, instance.unmount);
      }
    } else {
      instance.unmount();
    }
  }

  function hideWithInteractivity(event) {

    getDocument().addEventListener('mousemove', debouncedOnMouseMove);
    pushIfUnique(mouseMoveListeners, debouncedOnMouseMove);
    debouncedOnMouseMove(event);
  }

  function unmount() {

    if (instance.state.isVisible) {
      instance.hide();
    }

    if (!instance.state.isMounted) {
      return;
    }

    destroyPopperInstance(); // If a popper is not interactive, it will be appended outside the popper
    // tree by default. This seems mainly for interactive tippies, but we should
    // find a workaround if possible

    getNestedPopperTree().forEach(function (nestedPopper) {
      nestedPopper._tippy.unmount();
    });

    if (popper.parentNode) {
      popper.parentNode.removeChild(popper);
    }

    mountedInstances = mountedInstances.filter(function (i) {
      return i !== instance;
    });
    instance.state.isMounted = false;
    invokeHook('onHidden', [instance]);
  }

  function destroy() {

    if (instance.state.isDestroyed) {
      return;
    }

    instance.clearDelayTimeouts();
    instance.unmount();
    removeListeners();
    delete reference._tippy;
    instance.state.isDestroyed = true;
    invokeHook('onDestroy', [instance]);
  }
}

function tippy(targets, optionalProps) {
  if (optionalProps === void 0) {
    optionalProps = {};
  }

  var plugins = defaultProps.plugins.concat(optionalProps.plugins || []);

  bindGlobalEventListeners();
  var passedProps = Object.assign({}, optionalProps, {
    plugins: plugins
  });
  var elements = getArrayOfElements(targets);

  var instances = elements.reduce(function (acc, reference) {
    var instance = reference && createTippy(reference, passedProps);

    if (instance) {
      acc.push(instance);
    }

    return acc;
  }, []);
  return isElement(targets) ? instances[0] : instances;
}

tippy.defaultProps = defaultProps;
tippy.setDefaultProps = setDefaultProps;
tippy.currentInput = currentInput;

// every time the popper is destroyed (i.e. a new target), removing the styles
// and causing transitions to break for singletons when the console is open, but
// most notably for non-transform styles being used, `gpuAcceleration: false`.

Object.assign({}, applyStyles$1, {
  effect: function effect(_ref) {
    var state = _ref.state;
    var initialStyles = {
      popper: {
        position: state.options.strategy,
        left: '0',
        top: '0',
        margin: '0'
      },
      arrow: {
        position: 'absolute'
      },
      reference: {}
    };
    Object.assign(state.elements.popper.style, initialStyles.popper);
    state.styles = initialStyles;

    if (state.elements.arrow) {
      Object.assign(state.elements.arrow.style, initialStyles.arrow);
    } // intentionally return no cleanup function
    // return () => { ... }

  }
});

tippy.setDefaultProps({
  render: render
});

///////////////////////////////////////////////////////////////////////////////
// */ //// END LOCAL TESTING SWITCH


/////  Module Scope Object Containing Constants  /////
/////   APCA   0.0.98G - 4g - W3 Compatible Constants

/////  𝒦 SA98G  ///////////////////////////////////
    const SA98G = {

        mainTRC: 2.4, // 2.4 exponent for emulating actual monitor perception

            // For reverseAPCA
        get mainTRCencode() { return 1 / this.mainTRC },

              // sRGB coefficients
        sRco: 0.2126729, 
        sGco: 0.7151522, 
        sBco: 0.0721750, 

              // G-4g constants for use with 2.4 exponent
        normBG: 0.56, 
        normTXT: 0.57,
        revTXT: 0.62,
        revBG: 0.65,

              // G-4g Clamps and Scalers
        blkThrs: 0.022,
        blkClmp: 1.414, 
        scaleBoW: 1.14,
        scaleWoB: 1.14,
        loBoWoffset: 0.027,
        loWoBoffset: 0.027,
        deltaYmin: 0.0005,
        loClip: 0.1,

          ///// MAGIC NUMBERS for UNCLAMP, for use with 0.022 & 1.414 /////
         // Magic Numbers for reverseAPCA
        mFactor: 1.94685544331710,
        get mFactInv() { return 1 / this.mFactor},
        mOffsetIn: 0.03873938165714010,
        mExpAdj: 0.2833433964208690,
        get mExp() { return this.mExpAdj / this.blkClmp},
        mOffsetOut: 0.3128657958707580,
      };




//////////////////////////////////////////////////////////////////////////////
//////////  APCA CALCULATION FUNCTIONS \/////////////////////////////////////

//////////  ƒ  APCAcontrast()  ////////////////////////////////////////////
function APCAcontrast (txtY,bgY,places = -1) {
                 // send linear Y (luminance) for text and background.
                // txtY and bgY must be between 0.0-1.0
               // IMPORTANT: Do not swap, polarity is important.

  const icp = [0.0,1.1];     // input range clamp / input error check

  if(isNaN(txtY)||isNaN(bgY)||Math.min(txtY,bgY)<icp[0]||
                              Math.max(txtY,bgY)>icp[1]){
    return 0.0;  // return zero on error
    // return 'error'; // optional string return for error
  }
//////////   SAPC LOCAL VARS   /////////////////////////////////////////

  let SAPC = 0.0;            // For raw SAPC values
  let outputContrast = 0.0; // For weighted final values
  let polCat = 'BoW';      // Alternate Polarity Indicator. N normal R reverse

  // TUTORIAL

  // Use Y for text and BG, and soft clamp black,
  // return 0 for very close luminances, determine
  // polarity, and calculate SAPC raw contrast
  // Then scale for easy to remember levels.

  // Note that reverse contrast (white text on black)
  // intentionally returns a negative number
  // Proper polarity is important!

//////////   BLACK SOFT CLAMP   ////////////////////////////////////////

          // Soft clamps Y for either color if it is near black.
  txtY = (txtY > SA98G.blkThrs) ? txtY :
                         txtY + Math.pow(SA98G.blkThrs - txtY, SA98G.blkClmp);
  bgY = (bgY > SA98G.blkThrs) ? bgY :
                          bgY + Math.pow(SA98G.blkThrs - bgY, SA98G.blkClmp);

       ///// Return 0 Early for extremely low ∆Y
  if ( Math.abs(bgY - txtY) < SA98G.deltaYmin ) { return 0.0; }


//////////   APCA/SAPC CONTRAST - LOW CLIP (W3 LICENSE)  ///////////////

  if ( bgY > txtY ) {  // For normal polarity, black text on white (BoW)

              // Calculate the SAPC contrast value and scale
    SAPC = ( Math.pow(bgY, SA98G.normBG) - 
             Math.pow(txtY, SA98G.normTXT) ) * SA98G.scaleBoW;

            // Low Contrast smooth rollout to prevent polarity reversal
           // and also a low-clip for very low contrasts
    outputContrast = (SAPC < SA98G.loClip) ? 0.0 : SAPC - SA98G.loBoWoffset;

  } else {  // For reverse polarity, light text on dark (WoB)
           // WoB should always return negative value.
    polCat = 'WoB';

    SAPC = ( Math.pow(bgY, SA98G.revBG) - 
             Math.pow(txtY, SA98G.revTXT) ) * SA98G.scaleWoB;

    outputContrast = (SAPC > -SA98G.loClip) ? 0.0 : SAPC + SA98G.loWoBoffset;
  }

         // return Lc (lightness contrast) as a signed numeric value 
        // Round to the nearest whole number as string is optional.
       // Rounded can be a signed INT as output will be within ± 127 
      // places = -1 returns signed float, 1 or more set that many places
     // 0 returns rounded string, uses BoW or WoB instead of minus sign

  if(places < 0 ){  // Default (-1) number out, all others are strings
    return  outputContrast * 100.0;
  } else if(places == 0 ){
    return  Math.round(Math.abs(outputContrast)*100.0)+'<sub>'+polCat+'</sub>';
  } else if(Number.isInteger(places)){
    return  (outputContrast * 100.0).toFixed(places);
  } else { return 0.0 }

} // End APCAcontrast()




//////////////////////////////////////////////////////////////////////////////
//////////  ƒ  fontLookupAPCA()  0.1.7 (G)  \////////////////////////////////
/////////                                    \//////////////////////////////

function fontLookupAPCA (contrast,places=2) {

////////////////////////////////////////////////////////////////////////////
/////  CONTRAST * FONT WEIGHT & SIZE  /////////////////////////////////////

// Font size interpolations. Here the chart was re-ordered to put
// the main contrast levels each on one line, instead of font size per line.
// First column is LC value, then each following column is font size by weight

// G G G G G G  Public Beta 0.1.7 (G) • MAY 28 2022

// Lc values under 70 should have Lc 15 ADDED if used for body text
// All font sizes are in px and reference font is Barlow

// 999: prohibited - too low contrast
// 777: NON TEXT at this minimum weight stroke
// 666 - this is for spot text, not fluent-Things like copyright or placeholder.
// 5xx - minimum font at this weight for content, 5xx % 500 for font-size
// 4xx - minimum font at this weight for any purpose], 4xx % 400 for font-size

// MAIN FONT SIZE LOOKUP

//// ASCENDING SORTED  Public Beta 0.1.7 (G) • MAY 28 2022  ////

//// Lc 45 * 0.2 = 9 which is the index for the row for Lc 45

// MAIN FONT LOOKUP May 28 2022 EXPANDED
// Sorted by Lc Value
// First row is standard weights 100-900
// First column is font size in px
// All other values are the Lc contrast 
// 999 = too low. 777 = non-text and spot text only


const fontMatrixAscend = [
    ['Lc',100,200,300,400,500,600,700,800,900],
    [0,999,999,999,999,999,999,999,999,999],
    [10,999,999,999,999,999,999,999,999,999],
    [15,777,777,777,777,777,777,777,777,777],
    [20,777,777,777,777,777,777,777,777,777],
    [25,777,777,777,120,120,108,96,96,96],
    [30,777,777,120,108,108,96,72,72,72],
    [35,777,120,108,96,72,60,48,48,48],
    [40,120,108,96,60,48,42,32,32,32],
    [45,108,96,72,42,32,28,24,24,24],
    [50,96,72,60,32,28,24,21,21,21],
    [55,80,60,48,28,24,21,18,18,18],
    [60,72,48,42,24,21,18,16,16,18],
    [65,68,46,32,21.75,19,17,15,16,18],
    [70,64,44,28,19.5,18,16,14.5,16,18],
    [75,60,42,24,18,16,15,14,16,18],
    [80,56,38.25,23,17.25,15.81,14.81,14,16,18],
    [85,52,34.5,22,16.5,15.625,14.625,14,16,18],
    [90,48,32,21,16,15.5,14.5,14,16,18],
    [95,45,28,19.5,15.5,15,14,13.5,16,18],
    [100,42,26.5,18.5,15,14.5,13.5,13,16,18],
    [105,39,25,18,14.5,14,13,12,16,18],
    [110,36,24,18,14,13,12,11,16,18],
    [115,34.5,22.5,17.25,12.5,11.875,11.25,10.625,14.5,16.5],
    [120,33,21,16.5,11,10.75,10.5,10.25,13,15],
    [125,32,20,16,10,10,10,10,12,14],
    ];


// ASCENDING SORTED  Public Beta 0.1.7 (G) • MAY 28 2022 ////

// DELTA - MAIN FONT LOOKUP May 28 2022 EXPANDED
// EXPANDED  Sorted by Lc Value ••  DELTA
// The pre-calculated deltas of the above array

const fontDeltaAscend = [
    ['∆Lc',100,200,300,400,500,600,700,800,900],
    [0,0,0,0,0,0,0,0,0,0],
    [10,0,0,0,0,0,0,0,0,0],
    [15,0,0,0,0,0,0,0,0,0],
    [20,0,0,0,0,0,0,0,0,0],
    [25,0,0,0,12,12,12,24,24,24],
    [30,0,0,12,12,36,36,24,24,24],
    [35,0,12,12,36,24,18,16,16,16],
    [40,12,12,24,18,16,14,8,8,8],
    [45,12,24,12,10,4,4,3,3,3],
    [50,16,12,12,4,4,3,3,3,3],
    [55,8,12,6,4,3,3,2,2,0],
    [60,4,2,10,2.25,2,1,1,0,0],
    [65,4,2,4,2.25,1,1,0.5,0,0],
    [70,4,2,4,1.5,2,1,0.5,0,0],
    [75,4,3.75,1,0.75,0.188,0.188,0,0,0],
    [80,4,3.75,1,0.75,0.188,0.188,0,0,0],
    [85,4,2.5,1,0.5,0.125,0.125,0,0,0],
    [90,3,4,1.5,0.5,0.5,0.5,0.5,0,0],
    [95,3,1.5,1,0.5,0.5,0.5,0.5,0,0],
    [100,3,1.5,0.5,0.5,0.5,0.5,1,0,0],
    [105,3,1,0,0.5,1,1,1,0,0],
    [110,1.5,1.5,0.75,1.5,1.125,0.75,0.375,1.5,1.5],
    [115,1.5,1.5,0.75,1.5,1.125,0.75,0.375,1.5,1.5],
    [120,1,1,0.5,1,0.75,0.5,0.25,1,1],
    [125,0,0,0,0,0,0,0,0,0],
    ];

  // APCA CONTRAST FONT LOOKUP TABLES
  // Copyright © 2022 by Myndex Research and Andrew Somers. All Rights Reserved
  // Public Beta 0.1.7 (G) • MAY 28 2022
  // For the following arrays, the Y axis is contrastArrayLen
  // The two x axis are weightArrayLen and scoreArrayLen

  // MAY 28 2022

  const weightArray = [0,100,200,300,400,500,600,700,800,900];
  const weightArrayLen = weightArray.length; // X axis

  let returnArray = [contrast.toFixed(places),0,0,0,0,0,0,0,0,0,];
  returnArray.length; // X axis

//// Lc 45 * 0.2 = 9, and 9 is the index for the row for Lc 45

  let tempFont = 777;
  contrast = Math.abs(contrast); // Polarity unneeded for LUT
  const factor = 0.2; // 1/5 as LUT is in increments of 5
  const index = (contrast == 0) ?
                 1 : (contrast * factor) | 0 ; // LUT row... n|0 is bw floor
  let w = 0; 
    // scoreAdj interpolates the needed font side per the Lc
  let scoreAdj = (contrast - fontMatrixAscend[index][w]) * factor;

  w++; // determines column in font matrix LUT


/////////  Font and Score Interpolation  \/////////////////////////////////

// populate returnArray with interpolated values

  for (; w < weightArrayLen; w++) {

    tempFont = fontMatrixAscend[index][w]; 

    if (tempFont > 400) { // declares a specific minimum for the weight.
        returnArray[w] = tempFont;
    } else if (contrast < 14.5 ) {
        returnArray[w] = 999; //  999 = do not use for anything
    } else if (contrast < 29.5 ) {
        returnArray[w] = 777; // 777 =  non-text only
    } else {
                // INTERPOLATION OF FONT SIZE
               // sets level for 0.5px size increments of smaller fonts
              // Note bitwise (n|0) instead of floor
      (tempFont > 24) ?
        returnArray[w] =
            Math.round(tempFont - (fontDeltaAscend[index][w] * scoreAdj)) :
        returnArray[w] =
            tempFont - ((2.0 * fontDeltaAscend[index][w] * scoreAdj) | 0) * 0.5;
                                                      // (n|0) is bitwise floor
    }
  }
/////////  End Interpolation  ////////////////////////////////////////////

  return returnArray
} // end fontLookupAPCA

/////////\                                      ///////////////////////////\
//////////\  END  fontLookupAPCA()  0.1.7 (G)  /////////////////////////////\
/////////////////////////////////////////////////////////////////////////////\




//////////////////////////////////////////////////////////////////////////////
//////////  LUMINANCE CONVERTERS  |//////////////////////////////////////////


//////////  ƒ  sRGBtoY()  //////////////////////////////////////////////////
function sRGBtoY (rgb = [0,0,0]) { // send sRGB 8bpc (0xFFFFFF) or string

// NOTE: Currently expects 0-255

/////   APCA   0.0.98G - 4g - W3 Compatible Constants   ////////////////////
/*
const mainTRC = 2.4; // 2.4 exponent emulates actual monitor perception
    
const sRco = 0.2126729, 
      sGco = 0.7151522, 
      sBco = 0.0721750; // sRGB coefficients
      */
// Future:
// 0.2126478133913640	0.7151791475336150	0.0721730390750208
// Derived from:
// xW	yW	K	xR	yR	xG	yG	xB	yB
// 0.312720	0.329030	6504	0.640	0.330	0.300	0.600	0.150	0.060

         // linearize r, g, or b then apply coefficients
        // and sum then return the resulting luminance

  function simpleExp (chan) { return Math.pow(chan/255.0, SA98G.mainTRC); }
  return SA98G.sRco * simpleExp(rgb[0]) +
         SA98G.sGco * simpleExp(rgb[1]) +
         SA98G.sBco * simpleExp(rgb[2]);
         
} // End sRGBtoY()




////////////////////////////////////////////////////////////////////////////
//////////  UTILITIES  \///////////////////////////////////////////////////


//////////  ƒ  alphaBlend()  /////////////////////////////////////////////

                      // send rgba array for text/icon, rgb for background.
                     // Only foreground allows alpha of 0.0 to 1.0 
                    // This blends using gamma encoded space (standard)
                   // rounded 0-255 or set round=false for number 0.0-255.0
function alphaBlend (rgbaFG=[0,0,0,1.0], rgbBG=[0,0,0], round = true ) {
	
	rgbaFG[3] = Math.max(Math.min(rgbaFG[3], 1.0), 0.0); // clamp alpha 0-1
	let compBlend = 1.0 - rgbaFG[3];
	let rgbOut = [0,0,0,1,true]; // or just use rgbBG to retain other elements?
	
	for (let i=0;i<3;i++) {
		rgbOut[i] = rgbBG[i] * compBlend + rgbaFG[i] * rgbaFG[3];
		if (round) rgbOut[i] = Math.min(Math.round(rgbOut[i]),255);
	}  return rgbOut;
} // End alphaBlend()




//\                                     ////////////////////////////////////////
///\                                   ////////////////////////////////////////
////\                                 ////////////////////////////////////////
/////\  END APCA 0.1.9  G-4g  BLOCK  ////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////

/**
 * Normalizes a given font weight to a numeric value. Maps keywords to their numeric equivalents.
 * @param {string|number} weight - The font weight, either as a number or a keyword.
 * @returns {number} - The numeric font weight.
*/
function normalizeFontWeight(weight) {
  const numericWeight = parseInt(weight, 10);
  if (!Number.isNaN(numericWeight)) return numericWeight;
  const weightMap = {
    lighter: 100,
    normal: 400,
    bold: 700,
    bolder: 900,
  };
  return weightMap[weight] || 400;
}

/**
 * Convert colour string to RGBA format.
 * @param {string} color The colour string to convert.
 * @param {number} opacity The computed opacity of the element (0 to 1).
 * @returns Returns colour in rgba format with alpha value.
 */
function convertToRGBA(color, opacity) {
  const colorString = color;
  let r;
  let g;
  let b;
  let a = 1; // Initialize alpha to 1 by default.

  if (!colorString.startsWith('rgb')) {
    // Unsupported color spaces.
    if (colorString.startsWith('color(rec2020') || colorString.startsWith('color(display-p3')) {
      return 'unsupported';
    }

    // Let the browser do conversion in rgb for non-supported colour spaces.
    const canvas = document.createElement('canvas');
    const context = canvas.getContext('2d');
    context.fillStyle = colorString;
    context.fillRect(0, 0, 1, 1);
    const imageData = context.getImageData(0, 0, 1, 1);
    [r, g, b, a] = imageData.data;
    a = (a / 255).toFixed(2); // Convert alpha to range [0, 1]
  } else {
    // Parse RGB or RGBA values from the color string
    const rgbaArray = colorString.match(/[\d.]+/g).map(Number);
    [r, g, b, a] = rgbaArray.length === 4 ? rgbaArray : [...rgbaArray, 1];
  }

  // If element has opacity attribute, amend the foreground text color string.
  if (opacity && opacity < 1) {
    a = (a * opacity).toFixed(2); // Adjust alpha based on the opacity
  }
  return [r, g, b, Number(a)];
}

/**
 * Retrieves the background colour of an element by traversing up the DOM tree.
 * @param {HTMLElement} $el - The DOM element from which to start searching for the background.
 * @returns {string} - The background color in RGBA format, or "image" if background image.
*/
function getBackground($el) {
  let targetEl = $el;
  while (targetEl && targetEl.nodeType === 1) {
    const styles = getComputedStyle(targetEl);
    const bgColor = convertToRGBA(styles.backgroundColor);
    const bgImage = styles.backgroundImage;
    if (bgImage !== 'none') {
      return { type: 'image', value: bgImage };
    }
    if (bgColor[3] !== 0 && bgColor !== 'transparent') {
      // If the background colour has an alpha channel.
      if (bgColor[3] < 1) {
        // We need to find the first non-transparent parent background and blend them together.
        let parentEl = targetEl.parentElement;
        let parentBgColor = 'rgba(255, 255, 255, 1)';
        while (parentEl && parentEl.nodeType === 1) {
          const parentStyles = getComputedStyle(parentEl);
          parentBgColor = parentStyles.backgroundColor;

          // Stop, valid colour found.
          if (parentBgColor !== 'rgba(0, 0, 0, 0)') break;

          // If we reach the HTML tag, default to white.
          if (parentBgColor === 'rgba(0, 0, 0, 0)' && parentEl.tagName === 'HTML') {
            parentBgColor = 'rgba(255, 255, 255, 1)';
          }

          // Move up the DOM tree.
          parentEl = parentEl.parentElement;
        }
        const parentColor = convertToRGBA(parentBgColor || 'rgba(255, 255, 255, 1)');
        const blendedBG = alphaBlend(bgColor, parentColor);
        return blendedBG;
      }
      // Return solid color immediately if no alpha channel.
      return bgColor;
    }
    if (targetEl.tagName === 'HTML') {
      return [255, 255, 255]; // Default to white if we reach the HTML tag.
    }
    targetEl = targetEl.parentNode;
  }
  return [255, 255, 255]; // Default to white if no background color is found.
}

/** Get the relative luminance of a colour based on WCAG 2.0
 * @link http://www.w3.org/TR/2008/REC-WCAG20-20081211/#relativeluminancedef
 * @param {number[]} color Colour code in [R,G,B] format.
 * @returns Luminance value.
 */
function getLuminance(color) {
  const rgb = color.slice(0, 3).map((x) => {
    const normalized = x / 255;
    return normalized <= 0.03928 ? normalized / 12.92 : ((normalized + 0.055) / 1.055) ** 2.4;
  });
  return 0.2126 * rgb[0] + 0.7152 * rgb[1] + 0.0722 * rgb[2];
}

/**
 * Get WCAG 2.0 contrast ratio from luminance value.
 * @link http://www.w3.org/TR/2008/REC-WCAG20-20081211/#contrast-ratiodef
 * @param {number} l1 Luminance value of foreground colour.
 * @param {number} l2 Luminance value of background colour.
 * @returns WCAG 2.0 contrast ratio.
 */
function getWCAG2Ratio(l1, l2) {
  const lighter = Math.max(l1, l2);
  const darker = Math.min(l1, l2);
  return (lighter + 0.05) / (darker + 0.05);
}

/**
 * Brighten a foreground text colour.
 * @param {number[]} color Text colour in [R,G,B,A] format.
 * @param {number} amount Number or increment to brighten by.
 * @returns Lighter foreground text colour.
 */
function brighten(color, amount) {
  return color.map((value, index) => {
    if (index < 3) { // Only brighten [R,G,B]
      const newValue = Math.ceil(value + (255 - value) * amount);
      return newValue >= 255 ? 255 : newValue;
    }
    return value;
  });
}

/**
 * Darken a foreground text colour.
 * @param {number[]} color Text colour in [R,G,B,A] format.
 * @param {number} amount Number or increment to darken by.
 * @returns Darker foreground text colour.
 */
function darken(color, amount) {
  return color.map((value, index) => {
    if (index < 3) { // Only darken [R,G,B]
      const newValue = Math.floor(value * (1 - amount));
      return newValue <= 0 ? 0 : newValue;
    }
    return value;
  });
}

/**
 * Get the hex code equivalent of an RGB colour.
 * @param {number[]} color Colour in [R,G,B,A] format.
 * @returns Hexcode equivalent.
 */
function getHex(color) {
  const [r, g, b] = color.map((value) => Math.min(255, Math.max(0, value)));
  const hexR = r.toString(16).padStart(2, '0');
  const hexG = g.toString(16).padStart(2, '0');
  const hexB = b.toString(16).padStart(2, '0');
  return `#${hexR}${hexG}${hexB}`;
}

/**
 * Get the display-friendly contrast value for output.
 * @param {Object} value - The value object containing the contrast ratio.
 * @returns {string|number} The formatted contrast ratio.
 */
function ratioToDisplay(value) {
  if (Constants.Global.contrastAPCA) {
    return Math.abs(Number(value.toFixed(1)));
  }
  // Round to decimal places, and display without decimals if integer.
  const rounded = Math.round(value * 100) / 100;
  if (Number.isInteger(rounded)) {
    return `${rounded}:1`;
  }
  return `${rounded.toFixed(2)}:1`;
}

/**
 * Calculate the contrast ratio or value between two colours.
 * @param {number[]} color Text colour in [R,G,B,A] format.
 * @param {Array} bg Background colour in [R,G,B,A] format.
 * @returns Either WCAG 2.0 contrast ratio or APCA contrast value.
 */
function calculateContrast(color, bg) {
  let ratio;
  const blendedColor = alphaBlend(color, bg).slice(0, 4);
  if (Constants.Global.contrastAPCA) {
    const foreground = sRGBtoY(blendedColor);
    const background = sRGBtoY(bg);
    ratio = APCAcontrast(foreground, background);
  } else {
    // Uses WCAG 2.0 contrast algorithm based on luminance.
    const foreground = getLuminance(blendedColor);
    const background = getLuminance(bg);
    ratio = getWCAG2Ratio(foreground, background);
  }
  return { ratio, blendedColor };
}

/**
 * Suggest a foreground colour with sufficient contrast.
 * @param {number[]} color Text colour in [R,G,B,A] format.
 * @param {number[]} background Background colour in [R,G,B,A] format.
 * @param {boolean} isLargeText Whether text is normal or large size.
 * @param {boolean} contrastAAA Use WCAG AAA thresholds.
 * @returns Compliant colour hexcode.
 */
function suggestColorWCAG(color, background, isLargeText, contrastAAA = false) {
  let minContrastRatio;
  if (contrastAAA) {
    minContrastRatio = isLargeText ? 4.5 : 7;
  } else {
    minContrastRatio = isLargeText ? 3 : 4.5;
  }

  // Get luminance
  const fgLuminance = getLuminance(color);
  const bgLuminance = getLuminance(background);

  // Determine if text color should be lightened or darkened (considers extreme values).
  const adjustMode = fgLuminance > bgLuminance
    ? getWCAG2Ratio(1, bgLuminance) > minContrastRatio
    : getWCAG2Ratio(0, bgLuminance) < minContrastRatio;

  const adjustColor = (foregroundColor, amount, mode) => (
    mode ? brighten(foregroundColor, amount) : darken(foregroundColor, amount)
  );

  let adjustedColor = color;
  let lastValidColor = adjustedColor;
  let contrastRatio = getWCAG2Ratio(fgLuminance, bgLuminance);
  let bestContrast = contrastRatio;
  let previousColor = color;

  // Loop parameters.
  let step = 0.16;
  const percentChange = 0.5;
  const precision = 0.01;
  let iterations = 0;
  const maxIterations = 100;

  while (step >= precision) {
    iterations += 1;

    // Return null if no colour found.
    if (iterations > maxIterations) {
      return { color: null };
    }

    adjustedColor = adjustColor(adjustedColor, step, adjustMode);
    const newLuminance = getLuminance(adjustedColor);
    contrastRatio = getWCAG2Ratio(newLuminance, bgLuminance);

    // console.log(`%c ${getHex(adjustedColor)} | ${contrastRatio}`, `color:${getHex(adjustedColor)};background:${getHex(background)}`);

    // Save valid colour, go back to previous, and continue with a smaller step.
    if (contrastRatio >= minContrastRatio) {
      // Ensure new colour is closer to the contrast minimum than old colour.
      lastValidColor = (contrastRatio <= bestContrast) ? adjustedColor : lastValidColor;
      bestContrast = contrastRatio;
      adjustedColor = previousColor;
      step *= percentChange;
    }

    previousColor = adjustedColor;
  }
  return { color: getHex(lastValidColor) };
}

/**
 * Determines the optimal contrasting color (either #000 or #FFF) for a given background color and the minimum font size required to meet APCA.
 * @param {number[]} background The background color in [R, G, B, A] format.
 * @param {number} fontWeight The computed weight of the font.
 * @returns Object containing hex code (#000/#FFF) and the recommended font size.
 */
const getOptimalAPCACombo = (background, fontWeight) => {
  const contrastWithDark = calculateContrast(background, [0, 0, 0, 1]);
  const contrastWithLight = calculateContrast(background, [255, 255, 255, 1]);
  const isDarkBetter = Math.abs(contrastWithDark.ratio) > Math.abs(contrastWithLight.ratio);
  const suggestedColor = isDarkBetter ? [0, 0, 0, 1] : [255, 255, 255, 1];
  const bestContrastRatio = isDarkBetter ? contrastWithDark.ratio : contrastWithLight.ratio;
  const newFontLookup = fontLookupAPCA(bestContrastRatio).slice(1);
  const size = Math.ceil(newFontLookup[Math.floor(fontWeight / 100) - 1]);
  return { suggestedColor, size };
};

/**
 * Suggests a new colour or font size based on APCA contrast algorithm.
 * @param {number[]} color Text colour in [R,G,B,A] format.
 * @param {number[]} background Background colour in [R,G,B,A] format.
 * @param {number} fontWeight Current font weight of the element.
 * @param {number} fontSize Current font size of the element.
 * @returns Compliant colour hexcode and/or font size combination.
 */
function suggestColorAPCA(color, background, fontWeight, fontSize) {
  const bgLuminance = sRGBtoY(background);
  // https://medium.com/@mikeyullinger/how-chameleon-text-ensures-legibility-ae414d7b069a#:~:text=0.179
  const adjustColor = (foregroundColor, amount) => (bgLuminance <= 0.179
    ? brighten(foregroundColor, amount)
    : darken(foregroundColor, amount));

  let adjustedColor = color;

  // Returns 9 font sizes in px corresponding to weights 100 thru 900.
  // Returns ['LcValue',100,200,300,400,500,600,700,800,900]
  let contrast = calculateContrast(adjustedColor, background);
  let fontLookup = fontLookupAPCA(contrast.ratio).slice(1);

  // Index of the corresponding fontWeight.
  const fontWeightIndex = Math.floor(fontWeight / 100) - 1;
  const minimumSizeRequired = fontLookup[fontWeightIndex];

  // Find another colour, because nothing will work at any size.
  const fails = fontSize < minimumSizeRequired || minimumSizeRequired === 999 || minimumSizeRequired === 777;

  // Needs new font size - no colour will work at current size.
  const best = getOptimalAPCACombo(background, fontWeight);
  if (best.size > fontSize) {
    return { color: getHex(best.suggestedColor), size: best.size };
  }

  let previousColor = color;
  let lastValidColor = adjustedColor;
  let bestContrast = contrast.ratio;

  // Loop parameters.
  let step = 0.16;
  const percentChange = 0.5;
  const precision = 0.01;
  let iterations = 0;
  const maxIterations = 50;

  // Loop to find a new colour.
  if (fails) {
    while (step >= precision) {
      iterations += 1;
      adjustedColor = adjustColor(adjustedColor, step);
      contrast = calculateContrast(adjustedColor, background);
      fontLookup = fontLookupAPCA(contrast.ratio).slice(1);

      // console.log(`%c ${getHex(adjustedColor)} | ${ratioToDisplay(contrast.ratio)} | ${fontLookup}`, `color:${getHex(adjustedColor)};background:${getHex(background)}`);

      // Save valid colour, go back to previous, and continue with a smaller step.
      if (fontLookup[fontWeightIndex] <= fontSize) {
        // Ensure new colour is closer to the contrast minimum than old colour.
        lastValidColor = (Math.abs(contrast.ratio) <= Math.abs(bestContrast)) ? adjustedColor : lastValidColor;
        bestContrast = contrast.ratio;
        lastValidColor = adjustedColor;
        adjustedColor = previousColor;
        step *= percentChange;
      }

      previousColor = adjustedColor;

      // Just in case, break the loop.
      if (iterations === maxIterations) {
        return { color: getHex(best.suggestedColor), size: best.size };
      }
    }
  }

  // Found a valid colour.
  return { color: getHex(lastValidColor), size: null };
}

/**
 * Generates and inserts color suggestions for tooltip upon tooltip opening.
 * This function is referenced within './interface/tooltips.js'.
 * For performance reasons, it is only called upon tooltip opening.
 * @param {HTMLElement} container The container where the color suggestion will be inserted.
 */
function generateColorSuggestion(contrastDetails) {
  let adviceContainer;
  const { color, background, fontWeight, fontSize, isLargeText, type } = contrastDetails;
  if (color && background && background.type !== 'image' && type === 'text') {
    const suggested = Constants.Global.contrastAPCA
      ? suggestColorAPCA(color, background, fontWeight, fontSize)
      : suggestColorWCAG(color, background, isLargeText, Constants.Global.contrastAAA);

    let advice;
    const hr = '<hr aria-hidden="true">';
    const style = `color:${suggested.color};background-color:${getHex(contrastDetails.background)};`;
    const colorBadge = `<strong class="badge" style="${style}">${suggested.color}</strong>`;
    const sizeBadge = `<strong class="normal-badge">${suggested.size}px</strong>`;

    if (!Constants.Global.contrastAPCA) {
      if (suggested.color === null) {
        advice = `${hr} ${Lang._('NO_SUGGESTION')}`;
      } else {
        advice = `${hr} ${Lang._('CONTRAST_COLOR')} ${colorBadge}`;
      }
    } else if (suggested.color && suggested.size) {
      advice = `${hr} ${Lang._('CONTRAST_APCA')} ${colorBadge} ${sizeBadge}`;
    } else if (suggested.color) {
      advice = `${hr} ${Lang._('CONTRAST_COLOR')} ${colorBadge}`;
    } else if (suggested.size) {
      advice = `${hr} ${Lang._('CONTRAST_SIZE')} ${sizeBadge}`;
    }

    // Append it to contrast details container.
    adviceContainer = document.createElement('div');
    adviceContainer.id = 'advice';

    // If low opacity, suggest increase opacity first.
    const suggestion = (contrastDetails.opacity < 1)
      ? `<hr aria-hidden="true"> ${Lang.sprintf('CONTRAST_OPACITY')}` : advice;

    // Append advice to contrast details container.
    adviceContainer.innerHTML = suggestion;
  }
  return adviceContainer;
}

/**
 * Inject contrast colour pickers into tooltip.
 * @param {HTMLElement} container The tooltip container to inject the contrast colour pickers.
 */
function generateContrastTools(contrastDetails) {
  const { sanitizedText, color, background, fontWeight, fontSize, ratio, textUnderline } = contrastDetails;

  // Initialize variables.
  const hasBackgroundColor = background && background.type !== 'image';
  const backgroundHex = hasBackgroundColor ? getHex(background) : '#000000';
  const foregroundHex = color ? getHex(color) : '#000000';

  // Other properties.
  const hasFontWeight = fontWeight ? `font-weight:${fontWeight};` : '';
  const hasFontSize = fontSize ? `font-size:${fontSize}px;` : '';
  const textDecoration = textUnderline ? `text-decoration:${textUnderline};` : '';

  // If colour or background colour is unknown; visually indicate so.
  const unknownFG = color
    ? '' : 'class="unknown"';
  const unknownBG = background && background.type !== 'image'
    ? '' : 'class="unknown"';
  const unknownFGText = color
    ? '' : `<span class="visually-hidden">(${Lang._('UNKNOWN')})</span>`;
  const unknownBGText = background
    ? '' : `<span class="visually-hidden">(${Lang._('UNKNOWN')})</span>`;

  // Ratio to be displayed.
  let displayedRatio;
  if (Constants.Global.contrastAPCA) {
    // If APCA, don't show "unknown" when value is absolute 0.
    displayedRatio = Math.abs(ratio) === 0 ? 0 : (Math.abs(ratio) || Lang._('UNKNOWN'));
  } else {
    // WCAG 2.0 ratio.
    displayedRatio = ratio || Lang._('UNKNOWN');
  }

  // Generate HTML layout.
  const contrastTools = document.createElement('div');
  contrastTools.id = 'contrast-tools';
  contrastTools.innerHTML = `
      <hr aria-hidden="true">
      <div id="contrast" class="badge">${Lang._('CONTRAST')}</div>
      <div id="value" class="badge">${displayedRatio}</div>
      <div id="good" class="badge good-contrast" hidden>${Lang._('GOOD')} <span class="good-icon"></span></div>
      <div id="apca-table" hidden></div>
      <div id="contrast-preview" style="color:${foregroundHex};${hasBackgroundColor ? `background:${backgroundHex};${sanitizedText.length ? '' : 'display: none;'}` : ''}${hasFontWeight + hasFontSize + textDecoration}">${sanitizedText}</div>
      <div id="color-pickers">
        <label for="fg-text">${Lang._('FG')} ${unknownFGText}
          <input type="color" id="fg-input" value="${foregroundHex}" ${unknownFG}/>
        </label>
        <label for="bg">${Lang._('BG')} ${unknownBGText}
          <input type="color" id="bg-input" value="${backgroundHex}" ${unknownBG}/>
        </label>
      </div>`;
  return contrastTools;
}

function createFontSizesTable(container, fontSizes) {
  const apcaTable = container;
  apcaTable.innerHTML = '';
  apcaTable.hidden = false;

  const row = document.createElement('div');
  row.classList.add('row');

  // Show only 200 thru 700 font weights.
  const filteredFontSizes = fontSizes.slice(1, 7);
  for (let i = 0; i < filteredFontSizes.length; i++) {
    const fontSize = filteredFontSizes[i];
    const fontWeight = (i + 2) * 100;

    // Only render the cell if font size is not 777 or 999.
    if (fontSize !== 777 && fontSize !== 999) {
      const cell = document.createElement('div');
      cell.classList.add('cell');

      // Font size.
      const sizeElement = document.createElement('div');
      sizeElement.classList.add('font-size');
      sizeElement.textContent = `${Math.ceil(fontSize)}px`;

      // Font weight.
      const weightElement = document.createElement('div');
      weightElement.classList.add('font-weight');
      weightElement.textContent = `${fontWeight}`;

      cell.appendChild(sizeElement);
      cell.appendChild(weightElement);
      row.appendChild(cell);
      apcaTable.appendChild(row);
    }
  }
}

/**
 * Initializes colour eyedroppers for respective tooltip.
 * This function is referenced within './interface/tooltips.js'.
 * @param {HTMLElement} container The container where the color suggestion will be inserted.
 * @param {Object} contrastDetails Contrast details object containing colour, background, etc.
 */
function initializeContrastTools(container, contrastDetails) {
  const contrastTools = container?.querySelector('#contrast-tools');
  if (contrastTools) {
    const { fontSize, fontWeight, type, isLargeText } = contrastDetails;

    // Cache selectors
    const contrast = container.querySelector('#contrast');
    const contrastPreview = container.querySelector('#contrast-preview');
    const fgInput = container.querySelector('#fg-input');
    const bgInput = container.querySelector('#bg-input');
    const ratio = container.querySelector('#value');
    const good = container.querySelector('#good');
    const apcaTable = container.querySelector('#apca-table');

    // Helper to update badge classes.
    const toggleBadges = (elements, condition) => {
      elements.forEach(($el) => {
        $el.classList.toggle('good-contrast', condition);
        $el.classList.toggle('error-badge', !condition);
      });
    };

    // Update preview colors and contrast on input change.
    const updatePreview = () => {
      const fgColor = fgInput.value;
      const bgColor = bgInput.value;

      // Remove question mark from inputs.
      [fgInput, bgInput].forEach((input) => input.classList.remove('unknown'));

      // Adjust colours in preview area.
      contrastPreview.style.color = fgColor;
      contrastPreview.style.backgroundColor = bgColor;
      contrastPreview.style.backgroundImage = 'none';

      // Change SVG color if it contains a single <path> element.
      const child = contrastPreview.querySelectorAll('svg *');
      if (child.length === 1) {
        const { fill, stroke } = getComputedStyle(child[0]);
        child[0].style.opacity = 1;
        if (fill !== 'none') child[0].style.fill = fgColor;
        if (stroke !== 'none') child[0].style.stroke = fgColor;
      }

      // Get contrast ratio.
      const contrastValue = calculateContrast(convertToRGBA(fgColor), convertToRGBA(bgColor));
      const elementsToToggle = [ratio, contrast];

      // APCA
      if (Constants.Global.contrastAPCA) {
        const value = contrastValue.ratio;
        ratio.textContent = ratioToDisplay(value);
        const fontArray = fontLookupAPCA(value).slice(1);
        const nonTextPasses = value >= 45 && fontArray[0] >= 0 && fontArray[0] <= 777;
        let passes;

        switch (type) {
          case 'svg-error':
          case 'svg-warning': {
            good.hidden = !nonTextPasses;
            passes = nonTextPasses;
            toggleBadges(elementsToToggle, passes);
            break;
          }
          case 'svg-text': {
            good.hidden = !nonTextPasses;
            passes = fontArray.slice(1, 7).some((size) => size !== 999 && size !== 777);
            toggleBadges(elementsToToggle, passes);
            createFontSizesTable(apcaTable, fontArray);
            break;
          }
          default: {
            const minFontSize = fontArray[Math.floor(fontWeight / 100) - 1];
            passes = fontSize >= minFontSize;
            toggleBadges(elementsToToggle, passes);
            good.hidden = !passes;
            break;
          }
        }
      }

      // WCAG 2.0
      if (!Constants.Global.contrastAPCA) {
        const value = contrastValue.ratio;
        ratio.textContent = ratioToDisplay(value);

        const useAAA = Constants.Global.contrastAAA; // Use AAA thresholds if true, otherwise AA
        const nonTextThreshold = 3;
        const normalTextThreshold = useAAA ? 7 : 4.5;
        const largeTextThreshold = useAAA ? 4.5 : 3;

        const passesNonText = value >= nonTextThreshold;
        const passesNormalText = value >= normalTextThreshold;
        const passesLargeText = value >= largeTextThreshold;

        switch (type) {
          case 'svg-error':
          case 'svg-text':
          case 'svg-warning': {
            good.hidden = !passesNonText;
            toggleBadges(elementsToToggle, passesNonText);
            break;
          }
          default: {
            if (isLargeText) {
              toggleBadges([ratio, contrast], passesLargeText);
              good.hidden = !passesLargeText;
            } else {
              toggleBadges([ratio, contrast], passesNormalText);
              good.hidden = !passesNormalText;
            }
            break;
          }
        }
      }
    };

    // Event listeners for both colour inputs.
    fgInput.addEventListener('input', updatePreview);
    bgInput.addEventListener('input', updatePreview);
  }
}

/**
  * Calculate an elements contrast based on WCAG 2.0 contrast algorithm.
  * @param {HTMLElement} $el The element in the DOM.
  * @param {number[]} color Text colour in [R,G,B,A] format.
  * @param {Array} background Background colour in [R,G,B,A] format.
  * @param {number} fontSize Element's font size.
  * @param {number} fontWeight Element's font weight.
  * @param {number} opacity Element's opacity value.
  * @param {boolean} contrastAAA Check if AAA threshold is required.
  * @returns {Object} Object containing the element, ratio, and extra details.
  */
function wcagAlgorithm($el, color, background, fontSize, fontWeight, opacity, contrastAAA = false) {
  const { ratio, blendedColor } = calculateContrast(color, background);
  const isLargeText = fontSize >= 24 || (fontSize >= 18.67 && fontWeight >= 700);

  let hasLowContrast;
  if (contrastAAA) {
    hasLowContrast = isLargeText ? ratio < 4.5 : ratio < 7;
  } else {
    const hasLowContrastNormalText = ratio > 1 && ratio < 4.5;
    hasLowContrast = isLargeText ? ratio < 3 : hasLowContrastNormalText;
  }

  if (hasLowContrast) {
    return {
      $el,
      ratio: ratioToDisplay(ratio),
      color: blendedColor,
      background,
      fontSize,
      fontWeight,
      isLargeText,
      opacity,
      textUnderline: getComputedStyle($el).textDecorationLine,
    };
  }
  return null;
}

/**
 * Calculate an elements contrast based on APCA algorithm.
 * @param {HTMLElement} $el The element in the DOM.
 * @param {number[]} color Text colour in [R,G,B,A] format.
 * @param {Array} background Background colour in [R,G,B,A] format.
 * @param {number} fontSize Element's font size.
 * @param {number} fontWeight Element's font weight.
 * @param {number} opacity Element's opacity value.
 * @returns {Object} Object containing the element, ratio, and extra details.
*/
function apcaAlgorithm($el, color, background, fontSize, fontWeight, opacity) {
  const { ratio, blendedColor } = calculateContrast(color, background);

  // Returns 9 font sizes in px corresponding to weights 100 thru 900.
  // Returns ['LcValue',100,200,300,400,500,600,700,800,900]
  const fontLookup = fontLookupAPCA(ratio).slice(1);

  // Get minimum font size based on weight.
  const fontWeightIndex = Math.floor(fontWeight / 100) - 1;
  const minFontSize = fontLookup[fontWeightIndex];

  if (fontSize < minFontSize) {
    return {
      $el,
      ratio: ratioToDisplay(ratio),
      color: blendedColor,
      background,
      fontWeight,
      fontSize,
      opacity,
      textUnderline: getComputedStyle($el).textDecorationLine,
    };
  }
  return null;
}

/**
 * Check an element's contrast based on APCA or WCAG 2.0 algorithm.
 * @param {HTMLElement} $el The element in the DOM.
 * @param {number[]} color Text colour in [R,G,B,A] format.
 * @param {Array} background Background colour in [R,G,B,A] format.
 * @param {number} fontSize Element's font size.
 * @param {number} fontWeight Element's font weight.
 * @param {number} opacity Element's opacity value.
 * @param {boolean} contrastAAA Use WCAG 2.0 AAA thresholds.
 * @returns {Object} Object containing the element, ratio, and extra details.
 */
function checkElementContrast(
  $el, color, background, fontSize, fontWeight, opacity, contrastAAA = false,
) {
  const algorithm = Constants.Global.contrastAPCA ? apcaAlgorithm : wcagAlgorithm;
  return algorithm($el, color, background, fontSize, fontWeight, opacity, contrastAAA);
}

var tooltipStyles = "a,button,code,div,h1,h2,kbd,li,ol,p,span,strong,svg,ul{all:unset;box-sizing:border-box!important}div{display:block}:after,:before{all:unset}.tippy-box[data-animation=fade][data-state=hidden]{opacity:0}[data-tippy-root]{max-width:calc(100vw - 10px)}@media (forced-colors:active){[data-tippy-root]{border:2px solid transparent;border-radius:5px}}.tippy-box[data-placement^=top]>.tippy-arrow{bottom:0}.tippy-box[data-placement^=top]>.tippy-arrow:before{border-top-color:initial;border-width:8px 8px 0;bottom:-7px;left:0;transform-origin:center top}.tippy-box[data-placement^=bottom]>.tippy-arrow{top:0}.tippy-box[data-placement^=bottom]>.tippy-arrow:before{border-bottom-color:initial;border-width:0 8px 8px;left:0;top:-7px;transform-origin:center bottom}.tippy-box[data-placement^=left]>.tippy-arrow{right:0}.tippy-box[data-placement^=left]>.tippy-arrow:before{border-left-color:initial;border-width:8px 0 8px 8px;right:-7px;transform-origin:center left}.tippy-box[data-placement^=right]>.tippy-arrow{left:0}.tippy-box[data-placement^=right]>.tippy-arrow:before{border-right-color:initial;border-width:8px 8px 8px 0;left:-7px;transform-origin:center right}.tippy-arrow{color:#333;height:16px;width:16px}.tippy-arrow:before{border-color:transparent;border-style:solid;content:\"\";position:absolute}.tippy-content{padding:5px 9px;position:relative;z-index:1}.tippy-box[data-theme~=sa11y-theme][role=tooltip]{box-sizing:border-box!important}.tippy-box[data-theme~=sa11y-theme][role=tooltip][data-animation=fade][data-state=hidden]{opacity:0}.tippy-box[data-theme~=sa11y-theme][role=tooltip][data-inertia][data-state=visible]{transition-timing-function:cubic-bezier(.54,1.5,.38,1.11)}[role=dialog]{word-wrap:break-word;min-width:300px;text-align:start}[role=tooltip]{min-width:185px;text-align:center}.tippy-box[data-theme~=sa11y-panel]{border:1px solid var(--sa11y-panel-bg-splitter);box-shadow:var(--sa11y-box-shadow)}.tippy-box[data-theme~=sa11y-theme]:not([data-theme~=sa11y-panel]){box-shadow:0 0 20px 4px rgba(154,161,177,.15),0 4px 80px -8px rgba(36,40,47,.25),0 4px 4px -2px rgba(91,94,105,.15)!important}.tippy-box[data-theme~=sa11y-theme]{-webkit-font-smoothing:auto;background-color:var(--sa11y-panel-bg);border-radius:4px;color:var(--sa11y-panel-primary);display:block;font-family:var(--sa11y-font-face);font-size:var(--sa11y-normal-text);font-weight:400;letter-spacing:normal;line-height:22px;outline:0;padding:8px;position:relative;transition-property:transform,visibility,opacity}.tippy-box[data-theme~=sa11y-theme] code{font-family:monospace;font-size:calc(var(--sa11y-normal-text) - 1px);font-weight:500}.tippy-box[data-theme~=sa11y-theme] code,.tippy-box[data-theme~=sa11y-theme] kbd{-webkit-font-smoothing:auto;background-color:var(--sa11y-panel-badge);border-radius:3.2px;color:var(--sa11y-panel-primary);letter-spacing:normal;line-height:22px;padding:1.6px 4.8px}.tippy-box[data-theme~=sa11y-theme] .tippy-content{padding:5px 9px}.tippy-box[data-theme~=sa11y-theme] sub,.tippy-box[data-theme~=sa11y-theme] sup{font-size:var(--sa11y-small-text)}.tippy-box[data-theme~=sa11y-theme] ul{margin:0;margin-block-end:0;margin-block-start:0;padding:0;position:relative}.tippy-box[data-theme~=sa11y-theme] li{display:list-item;margin:5px 10px 0 20px;padding-bottom:5px}.tippy-box[data-theme~=sa11y-theme] a{color:var(--sa11y-hyperlink);cursor:pointer;font-weight:500;text-decoration:underline}.tippy-box[data-theme~=sa11y-theme] a:focus,.tippy-box[data-theme~=sa11y-theme] a:hover{text-decoration:none}.tippy-box[data-theme~=sa11y-theme] strong{font-weight:600}.tippy-box[data-theme~=sa11y-theme] hr{background:var(--sa11y-panel-bg-splitter);border:none;height:1px;margin:10px 0;opacity:1;padding:0}.tippy-box[data-theme~=sa11y-theme] button.close-btn{margin:0}.tippy-box[data-theme~=sa11y-theme] .dismiss-group{margin-top:5px}.tippy-box[data-theme~=sa11y-theme] .dismiss-group button{background:var(--sa11y-panel-bg-secondary);border:2px solid var(--sa11y-button-outline);border-radius:5px;color:var(--sa11y-panel-primary);cursor:pointer;display:inline-block;margin:10px 5px 5px 0;margin-inline-end:15px;padding:4px 8px}.tippy-box[data-theme~=sa11y-theme] .dismiss-group button:focus,.tippy-box[data-theme~=sa11y-theme] .dismiss-group button:hover{background:var(--sa11y-shortcut-hover)}.tippy-box[data-theme~=sa11y-theme] .good-icon{background:var(--sa11y-good-text);display:inline-block;height:14px;margin-bottom:-2.5px;-webkit-mask:var(--sa11y-good-svg) center no-repeat;mask:var(--sa11y-good-svg) center no-repeat;width:14px}.tippy-box[data-theme~=sa11y-theme] .link-icon{background:var(--sa11y-panel-primary);display:inline-block;height:16px;margin-bottom:-3.5px;-webkit-mask:var(--sa11y-link-icon-svg) center no-repeat;mask:var(--sa11y-link-icon-svg) center no-repeat;width:16px}.tippy-box[data-theme~=sa11y-theme] .error .badge{background:var(--sa11y-error);color:var(--sa11y-error-text)}.tippy-box[data-theme~=sa11y-theme] .error .colour{color:var(--sa11y-red-text)}.tippy-box[data-theme~=sa11y-theme] .error .link-icon{background:var(--sa11y-error-text)}.tippy-box[data-theme~=sa11y-theme] .warning .badge{background:var(--sa11y-yellow-text);color:var(--sa11y-panel-bg)}.tippy-box[data-theme~=sa11y-theme] .warning .colour{color:var(--sa11y-yellow-text)}.tippy-box[data-theme~=sa11y-theme] .warning .link-icon{background:var(--sa11y-panel-bg)}.tippy-box[data-theme~=sa11y-theme] #apca-table{width:100%}.tippy-box[data-theme~=sa11y-theme] #apca-table .row{display:flex;margin-top:10px}.tippy-box[data-theme~=sa11y-theme] #apca-table .cell{align-items:center;display:flex;flex:1;flex-direction:column;padding:1px}.tippy-box[data-theme~=sa11y-theme] #apca-table .font-weight{font-size:calc(var(--sa11y-normal-text) - 2px);font-weight:700}.tippy-box[data-theme~=sa11y-theme][data-placement^=top]>.tippy-arrow:before{border-top-color:var(--sa11y-panel-bg)}.tippy-box[data-theme~=sa11y-theme][data-placement^=bottom]>.tippy-arrow:before{border-bottom-color:var(--sa11y-panel-bg)}.tippy-box[data-theme~=sa11y-theme][data-placement^=left]>.tippy-arrow:before{border-left-color:var(--sa11y-panel-bg)}.tippy-box[data-theme~=sa11y-theme][data-placement^=right]>.tippy-arrow:before{border-right-color:var(--sa11y-panel-bg)}@media (forced-colors:active){.tippy-box[data-theme~=sa11y-theme][data-placement^=bottom]>.tippy-arrow:before,.tippy-box[data-theme~=sa11y-theme][data-placement^=left]>.tippy-arrow:before,.tippy-box[data-theme~=sa11y-theme][data-placement^=right]>.tippy-arrow:before,.tippy-box[data-theme~=sa11y-theme][data-placement^=top]>.tippy-arrow:before{forced-color-adjust:none}.tippy-box[data-theme~=sa11y-theme] .tippy-arrow{z-index:-1}}.tippy-box[data-theme~=sa11y-theme] [tabindex=\"-1\"]:focus,.tippy-box[data-theme~=sa11y-theme] a:focus,.tippy-box[data-theme~=sa11y-theme] button:active,.tippy-box[data-theme~=sa11y-theme] button:focus,.tippy-box[data-theme~=sa11y-theme] input:focus{box-shadow:0 0 0 5px var(--sa11y-focus-color);outline:0}.tippy-box[data-theme~=sa11y-theme] [tabindex=\"-1\"]:focus:not(:focus-visible),.tippy-box[data-theme~=sa11y-theme] a:focus:not(:focus-visible),.tippy-box[data-theme~=sa11y-theme] button:focus:not(:focus-visible),.tippy-box[data-theme~=sa11y-theme] input:focus:not(:focus-visible){box-shadow:none;outline:0}.tippy-box[data-theme~=sa11y-theme] [tabindex=\"-1\"]:focus-visible,.tippy-box[data-theme~=sa11y-theme] a:focus-visible,.tippy-box[data-theme~=sa11y-theme] button:focus-visible,.tippy-box[data-theme~=sa11y-theme] input:focus-visible{box-shadow:0 0 0 5px var(--sa11y-focus-color);outline:0}@media screen and (forced-colors:active){.tippy-box[data-theme~=sa11y-theme] .error-icon,.tippy-box[data-theme~=sa11y-theme] .hidden-icon,.tippy-box[data-theme~=sa11y-theme] .link-icon{filter:invert(1)}.tippy-box[data-theme~=sa11y-theme] [tabindex=\"-1\"]:focus,.tippy-box[data-theme~=sa11y-theme] a:focus,.tippy-box[data-theme~=sa11y-theme] button:focus{outline:3px solid transparent!important}}";

/**
 * Tooltip container for all annotations.
 */
class AnnotationTooltips extends HTMLElement {
  connectedCallback() {
    const shadowRoot = this.attachShadow({ mode: 'open' });

    // Styles
    const style = document.createElement('style');
    style.innerHTML = tooltipStyles + sharedStyles;
    shadowRoot.appendChild(style);

    // Get all annotations on page
    const buttons = [];
    Elements.Annotations.Array.forEach((annotation) => {
      const annotationButtons = annotation.shadowRoot.querySelectorAll('.sa11y-btn');
      if (annotationButtons) {
        buttons.push(...Array.from(annotationButtons));
      }
    });

    // Instantiate tippy.js
    const annotations = tippy(buttons, {
      interactive: true,
      trigger: 'mouseenter click',
      hideOnClick: false,
      arrow: true,
      offset: [0, 8],
      delay: [0, 400],
      maxWidth: 375,
      theme: 'sa11y-theme',
      placement: 'auto-start',
      allowHTML: true,
      role: 'dialog',
      aria: {
        content: null,
        expanded: 'auto',
      },
      appendTo: shadowRoot,
      zIndex: 2147483645,
      onShow(instance) {
        // Hide previously opened tooltip.
        annotations.forEach((popper) => {
          if (popper !== instance.popper) {
            popper.hide();
          }
        });

        // Last opened tooltip.
        const annotation = instance.reference.getRootNode().host;
        annotation.setAttribute('data-sa11y-opened', '');

        // Close button for tooltip.
        const closeButton = instance.popper.querySelector('.close-btn');
        const closeButtonHandler = () => {
          instance.hide();
          instance.reference.focus();
        };
        closeButton.addEventListener('click', closeButtonHandler);

        // Event listener for the escape key.
        const escapeListener = (event) => {
          if (event.key === 'Escape') {
            instance.hide();
            instance.reference.focus();
          }
        };
        instance.popper.addEventListener('keydown', escapeListener);

        // Generate preview, colour pickers, and suggestions for contrast tooltips.
        // Imported from rulesets/contrast.js
        if (!instance.popper.hasAttribute('contrast-tools-initialized')) {
          const issueID = parseInt(annotation.getAttribute('data-sa11y-annotation'), 10);
          const issueObject = window.sa11yCheckComplete.results.find((issue) => issue.id === issueID);
          const { contrastDetails } = issueObject || {};

          if (contrastDetails) {
            const container = instance.popper.querySelector('[data-sa11y-contrast-details]');

            // Append color pickers and suggested color.
            const tools = generateContrastTools(contrastDetails);
            container.appendChild(tools);
            initializeContrastTools(instance.popper, contrastDetails);

            // Append suggested color.
            const suggestion = generateColorSuggestion(contrastDetails);
            if (suggestion) container.appendChild(suggestion);

            // Contrast tools has been initialized.
            instance.popper.setAttribute('contrast-tools-initialized', true);
          }
        }

        // Make tooltip stay open if colour picker is used. Use 'mousedown' event, because upon click of trigger, it sets focus on close button, which immediately closes colour input on safari.
        let firstClick = true;
        function handleMouseDown(event) {
          if (firstClick && event.target.matches('input[type="color"]')) {
            instance.reference.click();
            firstClick = false;
            instance.popper.removeEventListener('mousedown', handleMouseDown);
          }
        }
        instance.popper.addEventListener('mousedown', handleMouseDown);

        // Remove all event listeners.
        const onHiddenTooltip = () => {
          closeButton.removeEventListener('click', closeButtonHandler);
          instance.popper.removeEventListener('keydown', escapeListener);
          instance.popper.removeEventListener('hidden', onHiddenTooltip);
        };
        instance.popper.addEventListener('hidden', onHiddenTooltip);
      },
      onTrigger(instance, event) {
        if (event.type === 'click') {
          // Set focus to close button 'click' event.
          setTimeout(() => {
            instance.popper.querySelector('.close-btn').focus();
            trapFocus(instance.popper);
          }, 0);
        }
      },
      onHide(instance) {
        instance.popper.querySelector('.close-btn').removeEventListener('click', () => {
          instance.hide();
        });
        const annotation = instance.reference.getRootNode().host;
        annotation.removeAttribute('data-sa11y-opened');
      },
    });
  }
}

/**
 * Tooltip container for the main control panel.
 */
class PanelTooltips extends HTMLElement {
  connectedCallback() {
    // Default options for basic tooltips (not popovers).
    const tooltipOptions = (shadowRoot) => ({
      allowHTML: true,
      delay: [500, 0],
      trigger: 'mouseenter focusin',
      arrow: true,
      placement: 'top',
      theme: 'sa11y-theme sa11y-panel',
      role: 'tooltip',
      aria: {
        content: null,
        expanded: null,
      },
      appendTo: shadowRoot,
      zIndex: 2147483645,
    });

    // Shadow root
    const shadowRoot = this.attachShadow({ mode: 'open' });

    // Styles
    const style = document.createElement('style');
    style.innerHTML = tooltipStyles + sharedStyles;
    shadowRoot.appendChild(style);

    /* 1. Tooltip for "Skip to Issue" button. */
    const keyboardShortcut = navigator.userAgent.indexOf('Mac') !== -1
      ? '<span class="kbd">Option</span> + <span class="kbd">S</span>'
      : '<span class="kbd">Alt</span> + <span class="kbd">S</span>';
    tippy(Constants.Panel.skipButton, {
      ...tooltipOptions(shadowRoot),
      offset: [0, 8],
      maxWidth: 200,
      content: `${Lang._('SKIP_TO_ISSUE')} &raquo; <br> ${keyboardShortcut}`,
    });

    /* 2. Tooltip for "Dismiss" button. */
    this.object = tippy(Constants.Panel.dismissButton, {
      offset: [0, 8],
      maxWidth: 200,
      ...tooltipOptions(shadowRoot),
    });

    /* 3. Tooltip for "Developer checks" toggle. */
    if (Constants.Global.developerPlugin) {
      const infoIcon = Constants.Panel.developerItem.querySelector('.info-icon');
      tippy(infoIcon, {
        ...tooltipOptions(shadowRoot),
        triggerTarget: [Constants.Panel.developerItem],
        offset: [0, 10],
        maxWidth: 250,
        content: Lang._('DEVELOPER_DESC'),
      });
    }

    /* 4. Tooltip for "Readability" toggle. */
    if (Constants.Global.readabilityPlugin) {
      const infoIcon = Constants.Panel.readabilityItem.querySelector('.info-icon');
      tippy(infoIcon, {
        ...tooltipOptions(shadowRoot),
        triggerTarget: [Constants.Panel.readabilityItem],
        offset: [0, 10],
        maxWidth: 250,
        content: Lang._('READABILITY_DESC'),
      });
    }
  }
}

var annotationStyles = ".instance{display:block;position:relative}.instance-inline{display:inline-block;position:relative;text-align:end}button{border-radius:50%;box-shadow:0 0 16px 0 rgba(0,0,0,.31);cursor:pointer;display:block;padding:0;transition:all .2s ease-in-out;z-index:8888}button,button:after{height:36px;position:absolute;width:36px}button:after{content:\"\";left:-7px;padding:7px;top:-7px}.warning-btn{margin:20px}.error-btn,.good-btn{margin:10px}.error-btn-text,.good-btn-text,.warning-btn-text{margin:-30px 10px}.error-btn,.error-btn-text{background:50% 50% var(--sa11y-error-svg) no-repeat;background-color:var(--sa11y-error);background-size:22px;border:1px solid var(--sa11y-error)}.error-btn-text:focus,.error-btn-text:hover,.error-btn:focus,.error-btn:hover{background-color:var(--sa11y-error-hover)}.good-btn,.good-btn-text{background:50% 50% var(--sa11y-good) var(--sa11y-good-svg) no-repeat;background-color:var(--sa11y-good);background-size:20px;border:1px solid var(--sa11y-good)}.good-btn-text:focus,.good-btn-text:hover,.good-btn:focus,.good-btn:hover{background-color:var(--sa11y-good-hover)}.warning-btn,.warning-btn-text{background:50% 50% var(--sa11y-warning) var(--sa11y-warning-svg) no-repeat;background-color:var(--sa11y-warning);background-size:24px;border:1px solid var(--sa11y-warning);transform:scaleX(var(--sa11y-icon-direction))}.warning-btn-text:focus,.warning-btn-text:hover,.warning-btn:focus,.warning-btn:hover{background-color:var(--sa11y-warning-hover)}.sa11y-btn:active,.sa11y-btn:focus{box-shadow:0 0 0 5px var(--sa11y-focus-color);outline:0}@media screen and (forced-colors:active){.sa11y-btn{border:1px solid transparent!important;forced-color-adjust:none;outline:3px solid transparent!important}}";

class Annotations extends HTMLElement {
  connectedCallback() {
    const shadow = this.attachShadow({ mode: 'open' });

    // Styles
    const style = document.createElement('style');
    style.innerHTML = annotationStyles + sharedStyles;
    shadow.appendChild(style);
  }
}

/**
  * Create annotation buttons.
  * @param {Object} issue The issue object.
  * @param {Object} option The options object.
*/
function annotate(issue, option) {
  // Get properties of issue object.
  const {
    element,
    type,
    content,
    inline = false,
    position = 'beforebegin',
    id,
    dismiss,
    dismissAll,
    contrastDetails,
  } = issue;

  // Validate types to prevent errors.
  const validTypes = ['error', 'warning', 'good'];
  if (validTypes.indexOf(type) === -1) {
    throw Error(`Invalid type [${type}] for annotation`);
  }

  // Add unique ID and styles to annotation and marked element.
  [type].forEach(($el) => {
    if ($el === 'error' && element !== undefined) {
      const errorAttr = (inline ? 'data-sa11y-error-inline' : 'data-sa11y-error');
      element.setAttribute(errorAttr, id);
    } else if ($el === 'warning' && element !== undefined) {
      const warningAttr = (inline ? 'data-sa11y-warning-inline' : 'data-sa11y-warning');
      element.setAttribute(warningAttr, id);
    }
  });

  // Generate aria-label for annotations.
  const ariaLabel = {
    [validTypes[0]]: Lang._('ERROR'),
    [validTypes[1]]: Lang._('WARNING'),
    [validTypes[2]]: Lang._('GOOD'),
  };

  // Don't paint page with "Good" annotations for images with alt text and links with accessible name.
  if (option.showGoodImageButton === false
    && element?.tagName === 'IMG' && type === 'good') return;
  if (option.showGoodLinkButton === false
    && element?.tagName === 'A' && type === 'good') return;

  // Add dismiss button if prop enabled & has a dismiss key.
  const dismissBtn = (
    option.dismissAnnotations
    && (type === 'warning' || type === 'good')
    && dismiss !== undefined)
    ? `<button data-sa11y-dismiss='${id}' type='button'>${Lang._('DISMISS')}</button>` : '';

  // Add dismiss all button if prop enabled & has addition check key.
  const dismissAllBtn = (
    option.dismissAnnotations
    && (option.dismissAll && typeof dismissAll === 'string')
    && (type === 'warning' || type === 'good'))
    ? `<button data-sa11y-dismiss='${id}' data-sa11y-dismiss-all type='button'>${Lang._('DISMISS_ALL')}</button>` : '';

  // Create 'sa11y-annotation' web component for each annotation.
  // Create 'sa11y-annotation' web component for each annotation.
  const instance = document.createElement('sa11y-annotation');
  instance.setAttribute('data-sa11y-annotation', id);

  // Generate HTML for painted annotations.
  if (element === undefined) {
    // Page errors displayed to main panel.
    const listItem = document.createElement('li');
    listItem.innerHTML = `<h3>${ariaLabel[type]}</h3> ${content}${dismissBtn}`;
    Constants.Panel.pageIssuesList.insertAdjacentElement('afterbegin', listItem);

    // Display Page Issues panel.
    Constants.Panel.pageIssues.classList.add('active');
    Constants.Panel.panel.classList.add('has-page-issues');
  } else {
    // Button annotations.
    const create = document.createElement('div');
    create.classList.add(`${inline ? 'instance-inline' : 'instance'}`);
    create.innerHTML = `
    <button
      type="button"
      aria-label="${ariaLabel[type]}"
      aria-haspopup="dialog"
      class="sa11y-btn ${[type]}-btn${inline ? '-text' : ''}"
      data-tippy-content=
        "<div lang='${Lang._('LANG_CODE')}' class='${[type]}'>
          <button type='button' class='close-btn close-tooltip' aria-label='${Lang._('ALERT_CLOSE')}'></button> <h2>${ariaLabel[type]}</h2>
          ${escapeHTML(content)}
          ${contrastDetails ? '<div data-sa11y-contrast-details></div>' : ''}
          <div class='dismiss-group'>${dismissBtn}${dismissAllBtn}</div>
        </div>"
    ></button>`;

    // Make sure annotations always appended outside of SVGs and interactive elements.
    const insertBefore = option.insertAnnotationBefore ? `, ${option.insertAnnotationBefore}` : '';
    const location = element.closest(`a, button, [role="link"], [role="button"] ${insertBefore}`) || element;
    location.insertAdjacentElement(position, instance);
    instance.shadowRoot.appendChild(create);
  }
}

/**
 * Utility function for annotations that modifies the parent container with overflow: hidden, making it visible and scrollable so content authors can access Sa11y's annotations.
 * @param {string} ignoreHiddenOverflow A string of selectors to ignore and not apply overflow detection.
 */
const detectOverflow = (ignoreHiddenOverflow) => {
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
  const annotations = document.querySelectorAll('sa11y-annotation');
  annotations.forEach(($el) => {
    const overflowing = findParentWithOverflow($el, 'overflow', 'hidden');
    if (overflowing !== null) {
      // Skip if selectors passed via ignoreHiddenOverflow prop.
      if (ignoreHiddenOverflow) {
        const selectors = ignoreHiddenOverflow.split(',');
        const matches = selectors.flatMap((selector) => [...document.querySelectorAll(selector)]);
        if (matches.includes(overflowing)) return;
      }
      // All other `overflow: hidden` containers will be made visible and scrollable.
      overflowing.setAttribute('data-sa11y-overflow', '');
    }
  });
};

/**
 * Utility function that will visually move overlapping annotations so they can be seen.
 */
const nudge = () => {
  const annotations = document.querySelectorAll('sa11y-annotation');
  annotations.forEach(($el) => {
    const sibling = $el.nextElementSibling;
    const css = 'margin: -5px -15px !important;';
    if (sibling !== null && sibling.tagName === 'SA11Y-ANNOTATION' && customElements.get('sa11y-annotation')) {
      sibling.shadowRoot.querySelector('button').setAttribute('style', css);
    }
  });
};

// Empty anchors appended to the hidden heading's visible parent.
class HeadingAnchor extends HTMLElement {
  connectedCallback() {
    this.attachShadow({ mode: 'open' });
  }
}

// Visible heading annotations.
class HeadingLabel extends HTMLElement {
  connectedCallback() {
    const shadow = this.attachShadow({ mode: 'open' });
    const style = document.createElement('style');
    style.textContent = `
      span.heading-label {
        background-color: #777678;
        background-image: linear-gradient(to bottom right, #b629ce, #16aec2);
        border-radius: 5px;
        border: 1px solid #36a5c3;
        color: white;
        display: inline-block;
        font-family: var(--sa11y-font-face);
        font-weight: 500;
        font-size: 18px;
        line-height: normal;
        letter-spacing: normal;
        margin: -5px 0 0 5px;
        padding: 3px;
        position: absolute;
        text-shadow: 1px 1px black;
        -webkit-text-fill-color: white;
        word-break: keep-all;
        z-index: 200;
      }
      @media screen and (forced-colors: active) {
        span.heading-label {
          border: 2px solid transparent;
        }
      }`;
    shadow.appendChild(style);
  }
}

/* ************************************************************ */
/*  Skip to Issue button logic within panel.                    */
/* ************************************************************ */

// When annotations are hidden and tooltip message is displayed in control panel, the previous visible tooltip remains. Function is called during getHiddenParent();
const closeAnyActiveTooltips = () => {
  const tooltip = document.querySelector('sa11y-tooltips').shadowRoot;
  const button = tooltip.querySelector('button');
  if (button !== null) button.click();
};

// Find the most visible parent of an annotation.
const getHiddenParent = ($el) => {
  const shadowHost = $el.getRootNode().host;
  const visibleParent = findVisibleParent(shadowHost, 'display', 'none');
  if (visibleParent !== null) {
    const hiddenParent = visibleParent.previousElementSibling;
    if (hiddenParent) {
      addPulse(hiddenParent);
    } else {
      addPulse(visibleParent.parentNode);
    }
  }
};

// Find scroll position.
const getScrollPosition = ($el, results) => {
  const offsetTopPosition = $el.offsetTop;
  if (offsetTopPosition === 0) {
    const annotationHost = $el.getRootNode().host;
    const visiblePosition = findVisibleParent(annotationHost, 'display', 'none');
    const annotationIndex = parseInt(annotationHost.getAttribute('data-sa11y-annotation'), 10);

    // Generate element preview for panel & report.
    const issueObject = results.find((issue) => issue.id === annotationIndex);
    const elementPreview = generateElementPreview(issueObject);

    // Alert if tooltip is hidden.
    getHiddenParent($el);
    const tooltip = $el.getAttribute('data-tippy-content');
    createAlert(`${Lang._('NOT_VISIBLE')}`, tooltip, elementPreview);

    closeAnyActiveTooltips();

    // Get as close to the hidden parent as possible.
    if (visiblePosition) {
      const prevSibling = visiblePosition.previousElementSibling;
      const { parentNode } = visiblePosition;
      if (prevSibling) {
        return offsetTop(prevSibling).top - 150;
      }
      return offsetTop(parentNode).top - 150;
    }
  } else {
    removeAlert();
    Constants.Panel.skipButton.focus();
  }
  return offsetTop($el).top - 150;
};

let index = -1;

const determineIndex = () => {
  // Index of last dismissed item.
  const latestDismissed = store.getItem('sa11y-latest-dismissed');
  if (latestDismissed !== null) index = parseInt(latestDismissed, 10) - 1;
  store.removeItem('sa11y-latest-dismissed');

  // Index of last opened tooltip.
  const opened = find('[data-sa11y-opened]', 'root');
  if (opened[0]) index = parseInt(opened[0].getAttribute('data-sa11y-position'), 10);
};

const goToNext = (results) => {
  determineIndex();
  const issues = Elements.Annotations.Array;

  // Go back to first issue.
  if (index >= issues.length - 1) index = -1;

  const annotation = issues[index + 1];
  const button = annotation.shadowRoot.querySelector('button');
  const scrollPos = getScrollPosition(button, results);

  window.scrollTo({
    top: scrollPos,
    behavior: `${Constants.Global.scrollBehaviour}`,
  });

  if (button.offsetTop !== 0) {
    button.focus();
    button.click();
  }

  // Increase position by 1.
  index += 1;
};

const goToPrev = (results) => {
  determineIndex();
  const issues = Elements.Annotations.Array;

  // If at first issue, go to last issue.
  if (index <= 0) index = issues.length;

  const button = Elements.Annotations.Array[index - 1].shadowRoot.querySelector('button');
  const scrollPos = getScrollPosition(button, results);

  window.scrollTo({
    top: scrollPos,
    behavior: `${Constants.Global.scrollBehaviour}`,
  });

  if (button.offsetTop !== 0) {
    button.focus();
    button.click();
  }

  // Decrease position by 1
  index -= 1;

  // If index is -1, it means that it cycled back to the first annotation. This is needed for when user wants to go to previous annotation from the very last annotation on the page.
  if (index === -1) index = Elements.Annotations.Array.length - 1;
};

function keyboardShortcut(e, results) {
  if (
    Elements.Annotations.Array.length
    && !Constants.Panel.skipButton.hasAttribute('disabled')
  ) {
    if (e.altKey && (e.code === 'KeyS' || e.code === 'Period')) {
      e.preventDefault();
      goToNext(results);
    } else if (e.altKey && (e.code === 'KeyW' || e.code === 'Comma')) {
      e.preventDefault();
      goToPrev(results);
    }
  }
}

// Attach event listeners.
let keyboardShortcutHandler;
let handleSkipButtonHandler;
function skipToIssue(results) {
  keyboardShortcutHandler = (e) => {
    keyboardShortcut(e, results);
  };
  handleSkipButtonHandler = () => {
    goToNext(results);
  };

  document.addEventListener('keydown', keyboardShortcutHandler);
  Constants.Panel.skipButton.addEventListener('click', handleSkipButtonHandler);
}

// Imported by Reset function.
function removeSkipBtnListeners() {
  document.removeEventListener('keydown', keyboardShortcutHandler);
  Constants.Panel.skipButton.removeEventListener('click', handleSkipButtonHandler);
}

function checkImages(results, option) {
  const containsAltTextStopWords = (alt) => {
    const altUrl = [
      '.avif',
      '.png',
      '.jpg',
      '.jpeg',
      '.webp',
      '.gif',
      '.tiff',
      '.svg',
      '.heif',
      '.heic',
      'http',
    ];

    const hit = [null, null, null];
    altUrl.forEach((word) => {
      if (alt.toLowerCase().indexOf(word.toLowerCase()) !== -1) {
        hit[0] = word;
      } else {
        // Checking for image dimensions in alt text.
        const imageDimensions = /\b\d{2,6}\s*x\s*\d{2,6}\b/;
        const match = alt.toLowerCase().match(imageDimensions);
        if (match) {
          [hit[0]] = match;
        }
      }
    });

    const susAltWordsOverride = (option.susAltStopWords) ? option.susAltStopWords.split(',').map((word) => word.trim()) : Lang._('SUS_ALT_STOPWORDS');
    susAltWordsOverride.forEach((word) => {
      const susWord = alt.toLowerCase().indexOf(word);
      if (susWord > -1 && susWord < 6) {
        hit[1] = word;
      }
    });

    Lang._('PLACEHOLDER_ALT_STOPWORDS').forEach((word) => {
      if (alt.length === word.length && alt.toLowerCase().indexOf(word) >= 0) {
        hit[2] = word;
      }
    });

    // Additional placeholder stopwords to flag as an error.
    const { extraPlaceholderStopWords } = option;
    if (extraPlaceholderStopWords.length) {
      const array = extraPlaceholderStopWords.split(',').map((word) => word.trim());
      array.forEach((word) => {
        const susWord = alt.toLowerCase().indexOf(word);
        if (susWord > -1 && susWord < 6) {
          hit[2] = word;
        }
      });
    }

    return hit;
  };

  Elements.Found.Images.forEach(($el) => {
    const alt = (computeAriaLabel($el) === 'noAria') ? $el.getAttribute('alt') : computeAriaLabel($el);

    // If selectors passed via prop, it will treat that image as an unlinked image.
    const link = $el.closest(option.imageWithinLightbox
      ? `a[href]:not(${option.imageWithinLightbox})`
      : 'a[href]');

    // Image's source for key.
    const src = ($el.getAttribute('src')) ? $el.getAttribute('src') : $el.getAttribute('srcset');

    // Process link text exclusions.
    const linkSpanExclusions = link
      ? fnIgnore(link, Constants.Exclusions.LinkSpan).textContent : '';
    const stringMatchExclusions = option.linkIgnoreStrings
      ? linkSpanExclusions.replace(option.linkIgnoreStrings, '') : linkSpanExclusions;
    const linkTextContentLength = link
      ? removeWhitespace(stringMatchExclusions).length : 0;

    // Has aria-hidden.
    if ($el.getAttribute('aria-hidden') === 'true') {
      return;
    }

    // Ignore tracking pixels without explicit aria-hidden or nullified alt.
    if ($el.height === 1 && $el.width === 1 && isElementHidden($el)) {
      return;
    }

    if (link && link.getAttribute('aria-hidden') === 'true') {
      // If linked image has aria-hidden, but is still focusable.
      const unfocusable = link.getAttribute('tabindex') === '-1';
      if (option.checks.HIDDEN_FOCUSABLE && !unfocusable) {
        results.push({
          element: $el,
          type: option.checks.HIDDEN_FOCUSABLE.type || 'error',
          content: Lang.sprintf(option.checks.HIDDEN_FOCUSABLE.content || 'HIDDEN_FOCUSABLE'),
          dismiss: prepareDismissal(`IMGHIDDENFOCUSABLE${src}`),
          dismissAll: option.checks.HIDDEN_FOCUSABLE.dismissAll
            ? 'LINK_HIDDEN_FOCUSABLE' : false,
          developer: option.checks.HIDDEN_FOCUSABLE.developer || true,
        });
      }
      return;
    }

    // If alt is missing.
    if (alt === null) {
      if (link) {
        const rule = (linkTextContentLength === 0)
          ? option.checks.MISSING_ALT_LINK
          : option.checks.MISSING_ALT_LINK_HAS_TEXT;
        const conditional = linkTextContentLength === 0
          ? 'MISSING_ALT_LINK' : 'MISSING_ALT_LINK_HAS_TEXT';
        if (rule) {
          results.push({
            element: $el,
            type: rule.type || 'error',
            content: Lang.sprintf(rule.content || linkTextContentLength === 0
              ? 'MISSING_ALT_LINK' : 'MISSING_ALT_LINK_HAS_TEXT'),
            dismiss: prepareDismissal(`${conditional + src + linkTextContentLength}`),
            dismissAll: rule.dismissAll ? conditional : false,
            developer: rule.developer || false,
          });
        }
      } else if (option.checks.MISSING_ALT) {
        // General failure message if image is missing alt.
        results.push({
          element: $el,
          type: option.checks.MISSING_ALT.type || 'error',
          content: Lang.sprintf(option.checks.MISSING_ALT.content || 'MISSING_ALT'),
          dismiss: prepareDismissal(`IMGNOALT${src}`),
          dismissAll: option.checks.MISSING_ALT.dismissAll ? 'MISSING_ALT' : false,
          developer: option.checks.MISSING_ALT.developer || false,
        });
      }
    } else {
      // If image has alt.
      const sanitizedAlt = sanitizeHTML(alt);
      const altText = removeWhitespace(sanitizedAlt);
      const error = containsAltTextStopWords(altText);
      const hasAria = $el.getAttribute('aria-label') || $el.getAttribute('aria-labelledby');
      const titleAttr = $el.getAttribute('title');
      const decorative = (alt === '' || alt === ' ');

      // Figure elements.
      const figure = $el.closest('figure');
      const figcaption = figure?.querySelector('figcaption');
      const figcaptionText = (figcaption) ? figcaption.textContent.trim() : '';

      // Maximum alt text length
      const maxAltCharactersLinks = option.checks.LINK_IMAGE_LONG_ALT.maxLength || 250;
      const maxAltCharacters = option.checks.IMAGE_ALT_TOO_LONG.maxLength || 250;

      // If aria-label or aria-labelledby returns empty or invalid.
      if (hasAria && altText === '') {
        if (option.checks.MISSING_ALT) {
          results.push({
            element: $el,
            type: option.checks.MISSING_ALT.type || 'error',
            content: Lang.sprintf(option.checks.MISSING_ALT.content || 'MISSING_ALT'),
            dismiss: prepareDismissal(`IMGNOALTARIA${src}`),
            dismissAll: option.checks.MISSING_ALT.dismissAll ? 'MISSING_ALT' : false,
            developer: option.checks.MISSING_ALT.developer || false,
          });
        }
        return;
      }

      // Decorative images.
      if (decorative) {
        const carouselSources = option.checks.IMAGE_DECORATIVE_CAROUSEL.sources;
        const carousel = carouselSources ? $el.closest(carouselSources) : '';
        if (carousel) {
          const numberOfSlides = carousel.querySelectorAll('img');
          const rule = (numberOfSlides.length === 1)
            ? option.checks.IMAGE_DECORATIVE
            : option.checks.IMAGE_DECORATIVE_CAROUSEL;
          const conditional = (numberOfSlides.length === 1)
            ? 'IMAGE_DECORATIVE'
            : 'IMAGE_DECORATIVE_CAROUSEL';
          if (rule) {
            results.push({
              element: $el,
              type: rule.type || 'warning',
              content: Lang.sprintf(rule.content || conditional),
              dismiss: prepareDismissal(conditional + src),
              dismissAll: rule.dismissAll ? conditional : false,
              developer: rule.developer || false,
            });
          }
        } else if (link) {
          const rule = (linkTextContentLength === 0)
            ? option.checks.LINK_IMAGE_NO_ALT_TEXT
            : option.checks.LINK_IMAGE_TEXT;
          const conditional = linkTextContentLength === 0
            ? 'LINK_IMAGE_NO_ALT_TEXT' : 'LINK_IMAGE_TEXT';
          if (rule) {
            results.push({
              element: $el,
              type: rule.type || (linkTextContentLength === 0 ? 'error' : 'good'),
              content: Lang.sprintf(rule.content || conditional),
              dismiss: prepareDismissal(`${conditional + src + linkTextContentLength}`),
              dismissAll: rule.dismissAll ? conditional : false,
              developer: rule.developer || false,
            });
          }
        } else if (figure) {
          const rule = (figcaption && figcaptionText.length)
            ? option.checks.IMAGE_FIGURE_DECORATIVE
            : option.checks.IMAGE_DECORATIVE;
          const conditional = figcaption && figcaptionText.length
            ? 'IMAGE_FIGURE_DECORATIVE' : 'IMAGE_DECORATIVE';
          if (rule) {
            results.push({
              element: $el,
              type: rule.type || 'warning',
              content: Lang.sprintf(rule.content || conditional),
              dismiss: prepareDismissal(`${conditional + src + figcaptionText}`),
              dismissAll: rule.dismissAll ? conditional : false,
              developer: rule.developer || false,
            });
          }
        } else if (option.checks.IMAGE_DECORATIVE) {
          results.push({
            element: $el,
            type: option.checks.IMAGE_DECORATIVE.type || 'warning',
            content: Lang.sprintf(option.checks.IMAGE_DECORATIVE.content || 'IMAGE_DECORATIVE'),
            dismiss: prepareDismissal(`DECIMAGE${src}`),
            dismissAll: option.checks.IMAGE_DECORATIVE.dismissAll ? 'IMAGE_DECORATIVE' : false,
            developer: option.checks.IMAGE_DECORATIVE.developer || false,
          });
        }
        return;
      }

      // Alt text quality.
      if (error[0] !== null) {
        // Has stop words.
        const rule = (link)
          ? option.checks.LINK_ALT_FILE_EXT
          : option.checks.ALT_FILE_EXT;
        const conditional = (link) ? 'LINK_ALT_FILE_EXT' : 'ALT_FILE_EXT';
        if (rule) {
          results.push({
            element: $el,
            type: rule.type || 'error',
            content: Lang.sprintf(rule.content || link
              ? 'LINK_ALT_FILE_EXT' : 'ALT_FILE_EXT', error[0], altText),
            dismiss: prepareDismissal(`${conditional + src + altText}`),
            dismissAll: rule.dismissAll ? conditional : false,
            developer: rule.developer || false,
          });
        }
      } else if (error[2] !== null) {
        // Placeholder words.
        const rule = (link)
          ? option.checks.LINK_PLACEHOLDER_ALT
          : option.checks.ALT_PLACEHOLDER;
        const conditional = (link) ? 'LINK_PLACEHOLDER_ALT' : 'ALT_PLACEHOLDER';
        if (rule) {
          results.push({
            element: $el,
            type: rule.type || 'error',
            content: Lang.sprintf(rule.content || link
              ? 'LINK_PLACEHOLDER_ALT' : 'ALT_PLACEHOLDER', altText),
            dismiss: prepareDismissal(`${conditional + src + altText}`),
            dismissAll: rule.dismissAll ? conditional : false,
            developer: rule.developer || false,
          });
        }
      } else if (error[1] !== null) {
        // Suspicious words.
        const rule = (link)
          ? option.checks.LINK_SUS_ALT
          : option.checks.SUS_ALT;
        const conditional = (link) ? 'LINK_SUS_ALT' : 'SUS_ALT';
        if (rule) {
          results.push({
            element: $el,
            type: rule.type || 'warning',
            content: Lang.sprintf(rule.content || link
              ? 'LINK_SUS_ALT' : 'SUS_ALT', error[1], altText),
            dismiss: prepareDismissal(`${conditional + src + altText}`),
            dismissAll: rule.dismissAll ? conditional : false,
            developer: rule.developer || false,
          });
        }
      } else if (link
        ? alt.length > maxAltCharactersLinks
        : alt.length > maxAltCharacters) {
        // Alt is too long.
        const rule = (link)
          ? option.checks.LINK_IMAGE_LONG_ALT
          : option.checks.IMAGE_ALT_TOO_LONG;
        const conditional = (link) ? 'LINK_IMAGE_LONG_ALT' : 'IMAGE_ALT_TOO_LONG';
        const truncated = truncateString(altText, 600);
        if (rule) {
          results.push({
            element: $el,
            type: rule.type || 'warning',
            content: Lang.sprintf(rule.content || (link ? 'LINK_IMAGE_LONG_ALT' : 'IMAGE_ALT_TOO_LONG'), alt.length, truncated),
            dismiss: prepareDismissal(`${conditional + src + altText}`),
            dismissAll: rule.dismissAll ? conditional : false,
            developer: rule.developer || false,
          });
        }
      } else if (link) {
        const rule = (linkTextContentLength === 0)
          ? option.checks.LINK_IMAGE_ALT
          : option.checks.LINK_IMAGE_ALT_AND_TEXT;
        const conditional = (linkTextContentLength === 0) ? 'LINK_IMAGE_ALT' : 'LINK_IMAGE_ALT_AND_TEXT';

        if (rule) {
          // Has both link text and alt text.
          const linkAccName = computeAccessibleName(link);
          const removeWhitespace$1 = removeWhitespace(linkAccName);
          const sanitizedText = sanitizeHTML(removeWhitespace$1);

          const tooltip = (linkTextContentLength === 0)
            ? Lang.sprintf('LINK_IMAGE_ALT', altText)
            : `${Lang.sprintf('LINK_IMAGE_ALT_AND_TEXT', altText, sanitizedText)} ${Lang.sprintf('ACC_NAME_TIP')}`;

          results.push({
            element: $el,
            type: rule.type || 'warning',
            content: rule.content
              ? Lang.sprintf(rule.content, altText, sanitizedText)
              : tooltip,
            dismiss: prepareDismissal(`${conditional + src + altText}`),
            dismissAll: rule.dismissAll ? conditional : false,
            developer: rule.developer || false,
          });
        }
      } else if (figure) {
        // Figure element has same alt and caption text.
        const duplicate = !!figcaption && (figcaptionText.toLowerCase() === altText.trim().toLowerCase());
        if (duplicate) {
          if (option.checks.IMAGE_FIGURE_DUPLICATE_ALT) {
            results.push({
              element: $el,
              type: option.checks.IMAGE_FIGURE_DUPLICATE_ALT.type || 'warning',
              content: Lang.sprintf(option.checks.IMAGE_FIGURE_DUPLICATE_ALT.content || 'IMAGE_FIGURE_DUPLICATE_ALT', altText),
              dismiss: prepareDismissal(`FIGDUPLICATE${src}`),
              dismissAll: option.checks.IMAGE_FIGURE_DUPLICATE_ALT.dismissAll ? 'IMAGE_FIGURE_DUPLICATE_ALT' : false,
              developer: option.checks.IMAGE_FIGURE_DUPLICATE_ALT.developer || false,
            });
          }
        } else if (option.checks.IMAGE_PASS) {
          // Figure has alt text!
          results.push({
            element: $el,
            type: option.checks.IMAGE_PASS.type || 'good',
            content: Lang.sprintf(option.checks.IMAGE_PASS.content || 'IMAGE_PASS', altText),
            dismiss: prepareDismissal(`FIGIMGPASS${src + altText}`),
            dismissAll: option.checks.IMAGE_PASS.dismissAll ? 'IMAGE_PASS' : false,
            developer: option.checks.IMAGE_PASS.developer || false,
          });
        }
      } else if (option.checks.IMAGE_PASS) {
        if (!$el.closest('button, [role="button"]')) {
          // Image has alt text!
          results.push({
            element: $el,
            type: option.checks.IMAGE_PASS.type || 'good',
            content: Lang.sprintf(option.checks.IMAGE_PASS.content || 'IMAGE_PASS', altText),
            dismiss: prepareDismissal(`IMAGEPASS${src + altText}`),
            dismissAll: option.checks.IMAGE_PASS.dismissAll ? 'IMAGE_PASS' : false,
            developer: option.checks.IMAGE_PASS.developer || false,
          });
        }
      }

      // Image's title attribute is the same as the alt.
      // Since this is extra, it's okay if it overlaps "good" annotation.
      if (titleAttr?.toLowerCase() === alt.toLowerCase()) {
        if (option.checks.DUPLICATE_TITLE) {
          results.push({
            element: $el,
            type: option.checks.DUPLICATE_TITLE.type || 'warning',
            content: Lang.sprintf(option.checks.DUPLICATE_TITLE.content || 'DUPLICATE_TITLE'),
            inline: true,
            dismiss: prepareDismissal(`ALTDUPLICATETITLE${altText}`),
            dismissAll: option.checks.DUPLICATE_TITLE.dismissAll ? 'DUPLICATE_TITLE' : false,
            developer: option.checks.DUPLICATE_TITLE.developer || false,
          });
        }
      }
    }
  });
  return results;
}

function checkHeaders(results, option, headingOutline) {
  let prevLevel;
  let prevHeadingText = '';
  Elements.Found.Headings.forEach(($el, i) => {
    // Get accessible name of heading.
    const accName = computeAccessibleName($el, Constants.Exclusions.HeaderSpan);
    const stringMatchExclusions = option.headerIgnoreStrings
      ? accName.replace(option.headerIgnoreStrings, '') : accName;
    const removeWhitespace$1 = removeWhitespace(stringMatchExclusions);
    const headingText = sanitizeHTML(removeWhitespace$1);

    // Check if heading is within root target area.
    const rootContainsHeading = Constants.Root.areaToCheck.contains($el);
    const rootContainsShadowHeading = Constants.Root.areaToCheck.contains($el.getRootNode().host);
    const isWithinRoot = rootContainsHeading || rootContainsShadowHeading;

    // Determine heading level.
    const level = parseInt($el.getAttribute('aria-level') || $el.tagName.slice(1), 10);
    const headingLength = removeWhitespace$1.length;
    const maxHeadingLength = option.checks.HEADING_LONG.maxLength || 160;

    // Default.
    let type = null;
    let content = null;
    let developer = null;
    let dismissAll = null;

    // Rulesets.
    if (level - prevLevel > 1 && i !== 0) {
      if (option.checks.HEADING_SKIPPED_LEVEL) {
        type = option.checks.HEADING_SKIPPED_LEVEL.type || 'error';
        content = Lang.sprintf(option.checks.HEADING_SKIPPED_LEVEL.content || 'HEADING_SKIPPED_LEVEL', prevLevel, level, truncateString(headingText, 60), truncateString(prevHeadingText, 60), prevLevel + 1);
        developer = option.checks.HEADING_SKIPPED_LEVEL.developer || false;
        dismissAll = option.checks.HEADING_SKIPPED_LEVEL.dismissAll ? 'HEADING_SKIPPED_LEVEL' : false;
      }
    } else if (headingLength === 0) {
      if ($el.querySelectorAll('img').length) {
        const alt = $el.querySelector('img')?.getAttribute('alt');
        if ($el.querySelector('img') && (!alt || alt.trim() === '')) {
          if (option.checks.HEADING_EMPTY_WITH_IMAGE) {
            type = option.checks.HEADING_EMPTY_WITH_IMAGE.type || 'error';
            content = Lang.sprintf(option.checks.HEADING_EMPTY_WITH_IMAGE.content || 'HEADING_EMPTY_WITH_IMAGE', level);
            developer = option.checks.HEADING_EMPTY_WITH_IMAGE.developer || false;
            dismissAll = option.checks.HEADING_EMPTY_WITH_IMAGE.dismissAll ? 'HEADING_EMPTY_WITH_IMAGE' : false;
          }
        }
      } else if (option.checks.HEADING_EMPTY) {
        type = option.checks.HEADING_EMPTY.type || 'error';
        content = Lang.sprintf(option.checks.HEADING_EMPTY.content || 'HEADING_EMPTY', level);
        developer = option.checks.HEADING_EMPTY.developer || false;
        dismissAll = option.checks.HEADING_EMPTY.dismissAll ? 'HEADING_EMPTY' : false;
      }
    } else if (i === 0 && level !== 1 && level !== 2) {
      if (option.checks.HEADING_FIRST) {
        type = option.checks.HEADING_FIRST.type || 'error';
        content = Lang.sprintf(option.checks.HEADING_FIRST.content || 'HEADING_FIRST');
        developer = option.checks.HEADING_FIRST.developer || false;
        dismissAll = option.checks.HEADING_FIRST.dismissAll ? 'HEADING_FIRST' : false;
      }
    } else if (headingLength > maxHeadingLength) {
      if (option.checks.HEADING_LONG) {
        type = option.checks.HEADING_LONG.type || 'warning';
        content = Lang.sprintf(option.checks.HEADING_LONG.content || 'HEADING_LONG', maxHeadingLength, headingLength);
        developer = option.checks.HEADING_LONG.developer || false;
        dismissAll = option.checks.HEADING_LONG.dismissAll ? 'HEADING_LONG' : false;
      }
    }

    // Create results object.
    if (content && type) {
      results.push({
        element: $el,
        type,
        content,
        dismiss: prepareDismissal(`H${level + headingText}`),
        dismissAll,
        isWithinRoot,
        developer,
      });
    }

    // Reset level and text.
    prevLevel = level;
    prevHeadingText = headingText;

    // Determine if heading is visually hidden or within hidden container.
    const hiddenHeading = isElementVisuallyHiddenOrHidden($el);
    const parent = findVisibleParent($el, 'display', 'none');

    // Create an object for heading outline panel.
    headingOutline.push({
      element: $el,
      headingLevel: level,
      text: headingText,
      index: i,
      type,
      hidden: hiddenHeading,
      visibleParent: parent,
      dismiss: prepareDismissal(`H${level + headingText}`),
      isWithinRoot,
    });
  });

  // Missing Heading 1
  if (option.checks.HEADING_MISSING_ONE && Elements.Found.HeadingOne.length === 0) {
    results.push({
      type: option.checks.HEADING_MISSING_ONE.type || 'warning',
      content: Lang.sprintf(option.checks.HEADING_MISSING_ONE.content || 'HEADING_MISSING_ONE'),
      dismiss: 'MISSINGH1',
      developer: option.checks.HEADING_MISSING_ONE.developer || false,
    });
  }
  return { results, headingOutline };
}

function checkLinkText(results, option) {
  // List of partial alt stop words.
  const linkStopWords = option.linkStopWords
    ? [...Lang._('PARTIAL_ALT_STOPWORDS'), ...option.linkStopWords.split(',').map((word) => word.trim())]
    : Lang._('PARTIAL_ALT_STOPWORDS');

  // Utility function to strip all space and special chars except forward slash.
  const stripSpecialCharacters = (string) => string.replace(/[^\w\s./]/g, '').replace(/\s+/g, ' ').trim();

  // Utility function to check if text contains stop words.
  const checkStopWords = (textContent, stopWords) => {
    const testTextContent = textContent.replace(/\./g, '').toLowerCase();
    let matchedWord = null;
    stopWords.forEach((word) => {
      if (testTextContent.length === word.length && testTextContent.indexOf(word.toLowerCase()) >= 0) {
        matchedWord = word;
      }
    });
    return matchedWord;
  };

  // Check for stop words.
  const containsLinkTextStopWords = (textContent) => {
    const hit = [null, null, null, null];

    hit[0] = checkStopWords(textContent, linkStopWords);

    // When link text contains "click".
    Lang._('CLICK').forEach((word) => {
      const regex = new RegExp(`\\b${word}\\b`, 'i'); // Word boundary.
      if (regex.test(textContent)) {
        hit[1] = word;
      }
      return false;
    });

    // Flag citations/references. Check if link text matches a publication source.
    const doi = [
      'doi.org/',
      'dl.acm.org/',
      'link.springer.com/',
      'pubmed.ncbi.nlm.nih.gov/',
      'scholar.google.com/',
      'ieeexplore.ieee.org/',
      'researchgate.net/publication/',
      'sciencedirect.com/science/article/',
    ];
    doi.forEach((word) => {
      if (textContent.toLowerCase().indexOf(word) >= 0) {
        hit[2] = word;
      }
      return false;
    });

    // URL starts with.
    ['www.', 'http'].forEach((word) => {
      if (textContent.toLowerCase().startsWith(word)) {
        hit[3] = word;
      }
      return false;
    });

    // Flag link containing these typical URL endings.
    const urlEndings = ['.edu/', '.com/', '.net/', '.org/', '.us/', '.ca/', '.de/', '.icu/', '.uk/', '.ru/', '.info/', '.top/', '.xyz/', '.tk/', '.cn/', '.ga/', '.cf/', '.nl/', '.io/', '.fr/', '.pe/', '.nz/', '.pt/', '.es/', '.pl/', '.ua/'];
    urlEndings.forEach((word) => {
      if (textContent.toLowerCase().indexOf(word) >= 0) {
        hit[3] = word;
      }
      return false;
    });

    return hit;
  };

  const seen = {};
  Elements.Found.Links.forEach(($el) => {
    const href = standardizeHref($el);

    // Link text based on COMPUTED ACCESSIBLE NAME.
    const accName = computeAccessibleName($el, Constants.Exclusions.LinkSpan);
    const stringMatchExclusions = option.linkIgnoreStrings
      ? accName.replace(option.linkIgnoreStrings, '') : accName;
    const linkText = removeWhitespace(stringMatchExclusions);

    // Ignore special characters (except forward slash).
    const stripSpecialChars = stripSpecialCharacters(linkText);
    const error = containsLinkTextStopWords(stripSpecialChars);

    // Match special characters exactly 1 character in length.
    const specialCharPattern = /[^a-zA-Z0-9]/g;
    const isSingleSpecialChar = linkText.length === 1 && specialCharPattern.test(linkText);

    // HTML symbols used as call to actions.
    const htmlSymbols = /([<>↣↳←→↓«»↴]+)/;
    const matches = linkText.match(htmlSymbols);
    const matchedSymbol = matches ? matches[1] : null;

    // Attributes.
    const titleAttr = $el.getAttribute('title');
    const ariaHidden = $el.getAttribute('aria-hidden') === 'true';
    const negativeTabindex = $el.getAttribute('tabindex') === '-1';

    // Has ARIA.
    const hasAria = $el.querySelector(':scope [aria-labelledby], :scope [aria-label]') || $el.getAttribute('aria-labelledby') || $el.getAttribute('aria-label');
    const hasAriaLabelledby = $el.querySelector(':scope [aria-labelledby]') || $el.getAttribute('aria-labelledby');

    // New tab or new window.
    // Evaluate $el.textContent in addition to accessible name to bypass `linkIgnoreSpan` prop.
    const containsNewWindowPhrases = Lang._('NEW_WINDOW_PHRASES').some((pass) => linkText.toLowerCase().includes(pass) || getText($el).toLowerCase().includes(pass));

    // If visible label contains word "click" (regardless of accessible name).
    const containsClickPhrase = Lang._('CLICK').some((pass) => {
      const regex = new RegExp(`\\b${pass}\\b`, 'i'); // Word boundary.
      return regex.test($el.textContent);
    });

    // Link that points to a file type and indicates as such.
    const defaultFileTypes = ['pdf', 'doc', 'docx', 'word', 'mp3', 'ppt', 'text', 'pptx', 'txt', 'exe', 'dmg', 'rtf', 'windows', 'macos', 'csv', 'xls', 'xlsx', 'mp4', 'mov', 'avi', 'zip'];
    const fileTypes = defaultFileTypes.concat(Lang._('FILE_TYPE_PHRASES'));
    // Evaluate $el.textContent in addition to accessible name to bypass `linkIgnoreSpan` prop.
    const containsFileTypePhrases = fileTypes.some((pass) => linkText.toLowerCase().includes(pass) || getText($el).toLowerCase().includes(pass));
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

    // Remove whitespace and special characters to improve accuracy and minimize false positives.
    const linkTextTrimmed = linkText.replace(/'|"|-|\.|\s+/g, '').toLowerCase();

    // Don't overlap with Alt Text module.
    if (!$el.querySelectorAll('img').length) {
      // Has aria-hidden.
      if (ariaHidden) {
        if (!negativeTabindex) {
          // If negative tabindex.
          if (option.checks.HIDDEN_FOCUSABLE) {
            results.push({
              element: $el,
              type: option.checks.HIDDEN_FOCUSABLE.type || 'error',
              content: Lang.sprintf(option.checks.HIDDEN_FOCUSABLE.content || 'HIDDEN_FOCUSABLE'),
              inline: true,
              position: 'afterend',
              dismiss: prepareDismissal(`LINKHIDDENFOCUS${href + linkTextTrimmed}`),
              dismissAll: option.checks.HIDDEN_FOCUSABLE.dismissAll ? 'LINK_HIDDEN_FOCUSABLE' : false,
              developer: option.checks.HIDDEN_FOCUSABLE.developer || true,
            });
          }
        }
      } else if ((href || href === '') && linkText.length === 0) {
        // Empty hyperlinks.
        if (hasAriaLabelledby) {
          // Has ariaLabelledby attribute but empty accessible name.
          if (option.checks.LINK_EMPTY_LABELLEDBY) {
            results.push({
              element: $el,
              type: option.checks.LINK_EMPTY_LABELLEDBY.type || 'error',
              content: Lang.sprintf(option.checks.LINK_EMPTY_LABELLEDBY.content || 'LINK_EMPTY_LABELLEDBY'),
              inline: true,
              position: 'afterend',
              dismiss: prepareDismissal(`LINKEMPTYLABELLEDBY${href}`),
              dismissAll: option.checks.LINK_EMPTY_LABELLEDBY.dismissAll ? 'LINK_EMPTY_LABELLEDBY' : false,
              developer: option.checks.LINK_EMPTY_LABELLEDBY.developer || true,
            });
          }
        } else if ($el.children.length) {
          // Has child elements (e.g. SVG or SPAN) <a><i></i></a>
          if (option.checks.LINK_EMPTY_NO_LABEL) {
            results.push({
              element: $el,
              type: option.checks.LINK_EMPTY_NO_LABEL.type || 'error',
              content: Lang.sprintf(option.checks.LINK_EMPTY_NO_LABEL.content || 'LINK_EMPTY_NO_LABEL'),
              inline: true,
              position: 'afterend',
              dismiss: prepareDismissal(`LINKEMPTYNOLABEL${href}`),
              dismissAll: option.checks.LINK_EMPTY_NO_LABEL.dismissAll ? 'LINK_EMPTY_NO_LABEL' : false,
              developer: option.checks.LINK_EMPTY_NO_LABEL.developer || false,
            });
          }
        } else if (option.checks.LINK_EMPTY) {
          // Completely empty <a></a>
          results.push({
            element: $el,
            type: option.checks.LINK_EMPTY.type || 'error',
            content: Lang.sprintf(option.checks.LINK_EMPTY.content || 'LINK_EMPTY'),
            inline: true,
            position: 'afterend',
            dismiss: prepareDismissal(`LINKEMPTY${href}`),
            dismissAll: option.checks.LINK_EMPTY.dismissAll ? 'LINK_EMPTY' : false,
            developer: option.checks.LINK_EMPTY.developer || false,
          });
        }
      } else if (error[0] !== null) {
        // Contains stop words.
        if (option.checks.LINK_STOPWORD) {
          results.push({
            element: $el,
            type: option.checks.LINK_STOPWORD.type || 'error',
            content: option.checks.LINK_STOPWORD.content
              ? Lang.sprintf(option.checks.LINK_STOPWORD.content, error[0])
              : Lang.sprintf('LINK_STOPWORD', error[0]) + Lang.sprintf('LINK_TIP'),
            inline: true,
            position: 'afterend',
            dismiss: prepareDismissal(`LINKSTOPWORD${href + linkTextTrimmed}`),
            dismissAll: option.checks.LINK_STOPWORD.dismissAll ? 'LINK_STOPWORD' : false,
            developer: option.checks.LINK_STOPWORD.developer || false,
          });
        }
      } else if (error[2] !== null) {
        // Contains DOI URL in link text.
        if (linkText.length > 8) {
          if (option.checks.LINK_DOI) {
            results.push({
              element: $el,
              type: option.checks.LINK_DOI.type || 'warning',
              content: Lang.sprintf(option.checks.LINK_DOI.content || 'LINK_DOI'),
              inline: true,
              dismiss: prepareDismissal(`LINKDOI${href + linkTextTrimmed}`),
              dismissAll: option.checks.LINK_DOI.dismissAll ? 'LINK_DOI' : false,
              developer: option.checks.LINK_DOI.developer || false,
            });
          }
        }
      } else if (error[3] !== null) {
        // Contains URL in link text.
        if (linkText.length > (option.checks.LINK_URL.maxLength || 40)) {
          if (option.checks.LINK_URL) {
            results.push({
              element: $el,
              type: option.checks.LINK_URL.type || 'warning',
              content: option.checks.LINK_URL.content
                ? Lang.sprintf(option.checks.LINK_URL.content)
                : Lang.sprintf('LINK_URL') + Lang.sprintf('LINK_TIP'),
              inline: true,
              dismiss: prepareDismissal(`LINKURLNAME${href + linkTextTrimmed}`),
              dismissAll: option.checks.LINK_URL.dismissAll ? 'LINK_URL' : false,
              developer: option.checks.LINK_URL.developer || false,
            });
          }
        }
      } else if (hasAria) {
        // Computed accessible name,
        const sanitizedText = sanitizeHTML(linkText);

        // General warning for visible non-descript link text, regardless of ARIA label.
        const excludeSpan = fnIgnore($el, Constants.Exclusions.LinkSpan);
        const visibleLinkText = option.linkIgnoreStrings
          ? getText(excludeSpan).replace(option.linkIgnoreStrings, '') : getText(excludeSpan);
        const cleanedString = stripSpecialCharacters(visibleLinkText);
        const stopword = checkStopWords(cleanedString, linkStopWords);
        if (option.checks.LINK_STOPWORD_ARIA && stopword !== null) {
          results.push({
            element: $el,
            type: option.checks.LINK_STOPWORD_ARIA.type || 'warning',
            content: option.checks.LINK_STOPWORD_ARIA.content
              ? Lang.sprintf(option.checks.LINK_STOPWORD_ARIA.content, stopword, sanitizedText)
              : Lang.sprintf('LINK_STOPWORD_ARIA', stopword, sanitizedText) + Lang.sprintf('LINK_TIP'),
            inline: true,
            dismiss: prepareDismissal(`LINKSTOPWORDARIA${href + linkTextTrimmed}`),
            dismissAll: option.checks.LINK_STOPWORD_ARIA.dismissAll ? ' LINK_STOPWORD_ARIA' : false,
            developer: option.checks.LINK_STOPWORD_ARIA.developer || false,
          });
        } else if (option.checks.LINK_LABEL) {
          // If the link has any ARIA, append a "Good" link button.
          results.push({
            element: $el,
            type: option.checks.LINK_LABEL.type || 'good',
            content: option.checks.LINK_LABEL.content
              ? Lang.sprintf(option.checks.LINK_LABEL.content, sanitizedText)
              : `${Lang.sprintf('ACC_NAME', sanitizedText)} ${Lang.sprintf('ACC_NAME_TIP')}`,
            inline: true,
            position: 'afterend',
            dismiss: prepareDismissal(`LINKGOOD${href + linkTextTrimmed}`),
            dismissAll: option.checks.LINK_LABEL.dismissAll ? 'LINK_LABEL' : false,
            developer: option.checks.LINK_LABEL.developer || false,
          });
        }

        // Button must have visible label as part of their accessible name.
        const isVisibleTextInAccessibleName$1 = isVisibleTextInAccessibleName($el);
        if (option.checks.LABEL_IN_NAME && isVisibleTextInAccessibleName$1 && $el.textContent.length !== 0) {
          results.push({
            element: $el,
            type: option.checks.LABEL_IN_NAME.type || 'warning',
            content: Lang.sprintf(option.checks.LABEL_IN_NAME.content || 'LABEL_IN_NAME', sanitizedText),
            inline: true,
            position: 'afterend',
            dismiss: prepareDismissal(`LINKLABELNAME${href + linkTextTrimmed}`),
            dismissAll: option.checks.LABEL_IN_NAME.dismissAll ? 'BTN_LABEL_IN_NAME' : false,
            developer: option.checks.LABEL_IN_NAME.developer || true,
          });
        }
      } else if (matchedSymbol) {
        // If link contains a special character used as a CTA.
        if (option.checks.LINK_SYMBOLS) {
          results.push({
            element: $el,
            type: option.checks.LINK_SYMBOLS.type || 'warning',
            content: Lang.sprintf(option.checks.LINK_SYMBOLS.content || 'LINK_SYMBOLS', matchedSymbol),
            inline: true,
            dismiss: prepareDismissal(`LINKSYMBOL${href + linkTextTrimmed}`),
            dismissAll: option.checks.LINK_SYMBOLS.dismissAll ? 'LINK_SYMBOLS' : false,
            developer: option.checks.LINK_SYMBOLS.developer || false,
          });
        }
      } else if (isSingleSpecialChar) {
        // Link is ONLY a period, comma, or special character.
        if (option.checks.LINK_EMPTY) {
          results.push({
            element: $el,
            type: option.checks.LINK_EMPTY.type || 'error',
            content: Lang.sprintf(option.checks.LINK_EMPTY.content || 'LINK_EMPTY'),
            inline: true,
            position: 'afterend',
            dismiss: prepareDismissal(`LINKCHAR${href}`),
            dismissAll: option.checks.LINK_EMPTY.dismissAll ? 'LINK_EMPTY' : false,
            developer: option.checks.LINK_EMPTY.developer || false,
          });
        }
      }

      // Uses "click here" in the link text or accessible name.
      if (error[1] !== null || containsClickPhrase) {
        if (option.checks.LINK_CLICK_HERE) {
          results.push({
            element: $el,
            type: option.checks.LINK_CLICK_HERE.type || 'warning',
            content: option.checks.LINK_CLICK_HERE.content
              ? Lang.sprintf(option.checks.LINK_CLICK_HERE.content)
              : Lang.sprintf('LINK_CLICK_HERE') + Lang.sprintf('LINK_TIP'),
            inline: true,
            dismiss: prepareDismissal(`LINKCLICKHERE${href + linkTextTrimmed}`),
            dismissAll: option.checks.LINK_CLICK_HERE.dismissAll ? 'LINK_CLICK_HERE' : false,
            developer: option.checks.LINK_CLICK_HERE.developer || false,
          });
        }
      }

      // Link's title attribute is the same as the link text.
      if (getText($el).length !== 0 && titleAttr?.toLowerCase() === linkText.toLowerCase()) {
        if (option.checks.DUPLICATE_TITLE) {
          results.push({
            element: $el,
            type: option.checks.DUPLICATE_TITLE.type || 'warning',
            content: Lang.sprintf(option.checks.DUPLICATE_TITLE.content || 'DUPLICATE_TITLE'),
            inline: true,
            dismiss: prepareDismissal(`LINKDUPLICATETITLE${href + linkTextTrimmed}`),
            dismissAll: option.checks.DUPLICATE_TITLE.dismissAll ? 'DUPLICATE_TITLE' : false,
            developer: option.checks.DUPLICATE_TITLE.developer || false,
          });
        }
      }
    }

    if (option.linksAdvancedPlugin) {
      if (linkTextTrimmed.length !== 0) {
        // Links with identical accessible names have equivalent purpose.
        if (seen[linkTextTrimmed] && !seen[href]) {
          if (option.checks.LINK_IDENTICAL_NAME) {
            const sanitizedText = sanitizeHTML(linkText);
            results.push({
              element: $el,
              type: option.checks.LINK_IDENTICAL_NAME.type || 'warning',
              content: option.checks.LINK_IDENTICAL_NAME.content
                ? Lang.sprintf(option.checks.LINK_IDENTICAL_NAME.content, sanitizedText)
                : `${Lang.sprintf('LINK_IDENTICAL_NAME', sanitizedText)} ${Lang.sprintf('ACC_NAME_TIP')}`,
              inline: true,
              dismiss: prepareDismissal(`LINKSEEN${href + linkTextTrimmed}`),
              dismissAll: option.checks.LINK_IDENTICAL_NAME.dismissAll ? 'LINK_IDENTICAL_NAME' : false,
              developer: option.checks.LINK_IDENTICAL_NAME.developer || false,
            });
          }
        } else {
          seen[linkTextTrimmed] = true;
          seen[href] = true;
        }

        // Link opens in new tab without warning.
        if ($el.getAttribute('target')?.toLowerCase() === '_blank' && !fileTypeMatch && !containsNewWindowPhrases) {
          if (option.checks.LINK_NEW_TAB) {
            results.push({
              element: $el,
              type: option.checks.LINK_NEW_TAB.type || 'warning',
              content: Lang.sprintf(option.checks.LINK_NEW_TAB.content || 'LINK_NEW_TAB'),
              inline: true,
              dismiss: prepareDismissal(`LINKNEWTAB${href + linkTextTrimmed}`),
              dismissAll: option.checks.LINK_NEW_TAB.dismissAll ? 'LINK_NEW_TAB' : false,
              developer: option.checks.LINK_NEW_TAB.developer || false,
            });
          }
        }

        // Link points to file (non HTML resource) without warning.
        if (fileTypeMatch && !containsFileTypePhrases) {
          if (option.checks.LINK_FILE_EXT) {
            results.push({
              element: $el,
              type: option.checks.LINK_FILE_EXT.type || 'warning',
              content: Lang.sprintf(option.checks.LINK_FILE_EXT.content || 'LINK_FILE_EXT'),
              inline: true,
              dismiss: prepareDismissal(`LINKEXT${href + linkTextTrimmed}`),
              dismissAll: option.checks.LINK_FILE_EXT.dismissAll ? 'LINK_FILE_EXT' : false,
              developer: option.checks.LINK_FILE_EXT.developer || false,
            });
          }
        }
      }
    }
  });
  return results;
}

/**
 * Rulesets: Contrast
 * @param {Array} results Sa11y's results array.
 * @param {Object} option Sa11y's options object.
 * @returns Contrast results.
 * APCA contrast checking is experimental. References:
 * @link https://github.com/jasonday/color-contrast
 * @link https://github.com/gka/chroma.js
 * @link https://github.com/Myndex/SAPC-APCA
 */
function checkContrast(results, option) {
  // Initialize contrast results array.
  const contrastResults = [];

  // Iterate through all elements on the page and get computed styles.
  for (let i = 0; i < Elements.Found.Contrast.length; i++) {
    const $el = Elements.Found.Contrast[i];
    const style = getComputedStyle($el);

    // Get computed styles.
    const opacity = parseFloat(style.opacity);
    const color = convertToRGBA(style.color, opacity);
    const fontSize = parseFloat(style.fontSize);
    const getFontWeight = style.fontWeight;
    const fontWeight = normalizeFontWeight(getFontWeight);
    const background = getBackground($el);

    // Check if element is visually hidden to screen readers or explicitly hidden.
    const isVisuallyHidden = isScreenReaderOnly($el);
    const isExplicitlyHidden = isElementHidden($el);
    const isHidden = isExplicitlyHidden || isVisuallyHidden || opacity === 0;

    // Filter only text nodes.
    const textString = Array.from($el.childNodes)
      .filter((node) => node.nodeType === 3)
      .map((node) => node.textContent)
      .join('');
    const text = textString.trim();

    // Inputs to check
    const checkInputs = ['SELECT', 'INPUT', 'TEXTAREA'].includes($el.tagName);

    // Only check elements with text and inputs.
    if (text.length !== 0 || checkInputs) {
      if (color === 'unsupported' || background === 'unsupported') {
        const isLargeText = fontSize >= 24 || (fontSize >= 18.67 && fontWeight >= 700);
        contrastResults.push({
          $el,
          type: 'unsupported',
          fontSize,
          fontWeight,
          isLargeText,
          opacity,
          ...(background !== 'unsupported' && { background }),
          ...(color !== 'unsupported' && { color }),
        });
      } else if (background.type === 'image') {
        if (isHidden) ; else {
          const isLargeText = fontSize >= 24 || (fontSize >= 18.67 && fontWeight >= 700);
          contrastResults.push({
            $el,
            type: 'background-image',
            color,
            isLargeText,
            background,
            fontSize,
            fontWeight,
            opacity,
          });
        }
      } else if ($el.tagName === 'text' && $el.closest('svg')) ; else if (isHidden || getHex(color) === getHex(background)) ; else {
        const result = checkElementContrast(
          $el, color, background, fontSize, fontWeight, opacity, option.contrastAAA,
        );
        if (result) {
          result.type = checkInputs ? 'input' : 'text';
          contrastResults.push(result);
        }
      }
    }
  }

  // Iterate through all SVGs on the page, separately.
  Elements.Found.Svg.forEach(($el) => {
    const background = getBackground($el);

    // Background image.
    if (background && background.type === 'image') {
      contrastResults.push({ $el, type: 'svg-warning', background });
      return;
    }

    // Handle SVGs with <text> element
    if ($el.querySelector('text')) {
      contrastResults.push({ $el, type: 'svg-text', background });
      return;
    }

    // Process simple SVGs with a single shape.
    const shapes = $el.querySelectorAll('path, polygon, circle, rect, ellipse');
    if (shapes.length === 1) {
      const style = getComputedStyle(shapes[0]);
      const { fill, opacity, stroke, strokeWidth } = style;

      // Background image.
      if (fill.startsWith('url(')) {
        contrastResults.push({ $el, type: 'svg-warning', background });
        return;
      }

      const hasFill = fill && fill !== 'none';
      const hasStroke = stroke && stroke !== 'none' && strokeWidth !== '0px';

      if (!hasFill && !hasStroke) {
        contrastResults.push({ $el, type: 'svg-warning', background });
        return;
      }

      let fillPasses = false;
      let strokePasses = false;
      let contrastValue;

      // Check fill contrast.
      if (hasFill) {
        const resolvedFill = fill === 'currentColor'
          ? convertToRGBA(getComputedStyle($el).color, opacity)
          : convertToRGBA(fill, opacity);
        contrastValue = calculateContrast(resolvedFill, background);
        fillPasses = option.contrastAPCA
          ? contrastValue.ratio >= 45
          : contrastValue.ratio >= 3;
      }

      // Check stroke contrast.
      if (hasStroke) {
        const resolvedStroke = stroke === 'currentColor'
          ? convertToRGBA(getComputedStyle($el).color, opacity)
          : convertToRGBA(stroke, opacity);
        contrastValue = calculateContrast(resolvedStroke, background);
        strokePasses = option.contrastAPCA
          ? contrastValue.ratio >= 45
          : contrastValue.ratio >= 3;
      }

      // Failure conditions.
      const failsBoth = hasFill && hasStroke && !fillPasses && !strokePasses;
      const failsFill = hasFill && !hasStroke && !fillPasses;
      const failsStroke = !hasFill && hasStroke && !strokePasses;
      if (failsBoth || failsFill || failsStroke) {
        contrastResults.push({
          $el,
          ratio: ratioToDisplay(contrastValue.ratio),
          color: contrastValue.blendedColor,
          type: 'svg-error',
          background,
        });
      }
    } else {
      // Warn for complex SVGs with multiple shapes
      contrastResults.push({ $el, type: 'svg-warning', background });
    }
  });

  // Check contrast of all placeholder elements.
  Elements.Found.Inputs.forEach(($el) => {
    if ($el.placeholder && $el.placeholder.length !== 0) {
      const placeholder = getComputedStyle($el, '::placeholder');
      const pColor = convertToRGBA(placeholder.getPropertyValue('color'));
      const pSize = parseFloat(placeholder.fontSize);
      const pWeight = normalizeFontWeight(placeholder.fontWeight);
      const pBackground = getBackground($el);
      const pOpacity = parseFloat(placeholder.opacity);

      // Placeholder has background image.
      if (pBackground.type === 'image') ; else {
        const result = checkElementContrast($el, pColor, pBackground, pSize, pWeight, pOpacity, option.contrastAAA);
        if (result) {
          result.type = 'placeholder';
          contrastResults.push(result);
        }
      }
    }
  });

  // Do some extra processing on warnings.
  const processWarnings = (warnings) => {
    // Separate warnings based on type.
    const backgroundImages = warnings.filter((warning) => warning.type === 'background-image');
    const otherWarnings = warnings.filter((warning) => warning.type !== 'background-image');

    let processedBackgroundWarnings;

    // Process background-image warnings based on option.contrastAPCA.
    if (option.contrastAPCA) {
      // Do not group warnings, return each warning as-is.
      processedBackgroundWarnings = backgroundImages.map((warning) => ({ ...warning }));
    } else {
      // Group background-image warnings if they share same BG and FG colours.
      const groupedWarnings = backgroundImages.reduce((groups, warning) => {
        const grouped = groups;
        const groupKey = JSON.stringify({
          background: warning.background.value,
          color: warning.color,
          isLargeText: warning.isLargeText,
        });
        if (!grouped[groupKey]) grouped[groupKey] = [];
        grouped[groupKey].push(warning);
        return grouped;
      }, {});

      // Process each group.
      processedBackgroundWarnings = Object.values(groupedWarnings).map((group) => ({ ...group[0] }));
    }

    // Combine processed background-image warnings with other warnings.
    return [...processedBackgroundWarnings, ...otherWarnings];
  };

  const processedResults = processWarnings(contrastResults);

  // Iterate through all contrast results.
  processedResults.forEach((item) => {
    const { $el, ratio } = item;
    const updatedItem = item;

    // Annotation placement.
    const element = $el.tagName === 'OPTION' ? $el.closest('datalist, select, optgroup') : $el;

    // Process text within element.
    const nodeText = fnIgnore(element, ['option:not(option:first-child)']);
    const text = getText(nodeText);

    // Content for tooltip.
    const truncatedText = truncateString(text, 80);
    const sanitizedText = sanitizeHTML(truncatedText);

    // Preview text
    let previewText;
    if (item.type === 'placeholder') {
      previewText = sanitizeHTML($el.placeholder);
    } else if (item.type === 'svg-error' || item.type === 'svg-warning' || item.type === 'svg-text') {
      previewText = '';
      /**
       * @todo Better support preview for SVGs.
       * const sanitizeSvg = Utils.sanitizeHTMLBlock(updatedItem.$el.outerHTML, true);
       * previewText = Utils.removeWhitespace(sanitizeSvg);
       * */
    } else {
      previewText = sanitizedText;
    }
    updatedItem.sanitizedText = previewText;

    // Reference necessary ratios for compliance.
    let ratioTip = '';
    if (!option.contrastAPCA) {
      const normal = option.contrastAAA ? '7:1' : '4.5:1';
      const large = option.contrastAAA ? '4.5:1' : '3:1';
      const ratioToDisplay = item.isLargeText ? large : normal;
      const ratioRequirement = item.isLargeText ? 'CONTRAST_LARGE' : 'CONTRAST_NORMAL';
      ratioTip = ` ${Lang.sprintf(ratioRequirement, ratioToDisplay)}`;
    }
    const graphicsTip = option.contrastAPCA ? '' : ` ${Lang.sprintf('CONTRAST_TIP_GRAPHIC')}`;

    // Iterate through contrast results based on type.
    switch (item.type) {
      case 'text':
        if (option.checks.CONTRAST_ERROR) {
          results.push({
            element: $el,
            type: option.checks.CONTRAST_ERROR.type || 'error',
            content: option.checks.CONTRAST_ERROR.content
              ? Lang.sprintf(option.checks.CONTRAST_ERROR.content)
              : Lang.sprintf('CONTRAST_ERROR') + ratioTip,
            dismiss: prepareDismissal(`CONTRAST${sanitizedText}`),
            dismissAll: option.checks.CONTRAST_ERROR.dismissAll ? 'CONTRAST_ERROR' : false,
            developer: option.checks.CONTRAST_ERROR.developer || false,
            contrastDetails: updatedItem,
          });
        }
        break;
      case 'input':
        if (option.checks.CONTRAST_INPUT) {
          results.push({
            element,
            type: option.checks.CONTRAST_INPUT.type || 'error',
            content: option.checks.CONTRAST_INPUT.content
              ? Lang.sprintf(option.checks.CONTRAST_INPUT.content)
              : Lang.sprintf('CONTRAST_INPUT', ratio) + ratioTip,
            dismiss: prepareDismissal(`CONTRAST${$el.getAttribute('class')}${$el.tagName}${ratio}`),
            dismissAll: option.checks.CONTRAST_INPUT.dismissAll ? 'CONTRAST_INPUT' : false,
            developer: option.checks.CONTRAST_INPUT.developer || true,
            contrastDetails: updatedItem,
          });
        }
        break;
      case 'placeholder':
        if (option.checks.CONTRAST_PLACEHOLDER) {
          results.push({
            element: $el,
            type: option.checks.CONTRAST_PLACEHOLDER.type || 'error',
            content: option.checks.CONTRAST_PLACEHOLDER.content
              ? Lang.sprintf(option.checks.CONTRAST_PLACEHOLDER.content)
              : Lang.sprintf('CONTRAST_PLACEHOLDER') + ratioTip,
            position: 'afterend',
            dismiss: prepareDismissal(`CPLACEHOLDER${$el.getAttribute('class')}${$el.tagName}${ratio}`),
            dismissAll: option.checks.CONTRAST_PLACEHOLDER.dismissAll ? 'CONTRAST_PLACEHOLDER' : false,
            developer: option.checks.CONTRAST_PLACEHOLDER.developer || true,
            contrastDetails: updatedItem,
          });
        }
        break;
      case 'svg-error':
        if (option.checks.CONTRAST_ERROR_GRAPHIC) {
          results.push({
            element: $el,
            type: option.checks.CONTRAST_ERROR_GRAPHIC.type || 'error',
            content: option.checks.CONTRAST_ERROR_GRAPHIC.content
              ? Lang.sprintf(option.checks.CONTRAST_ERROR_GRAPHIC.content)
              : Lang.sprintf('CONTRAST_ERROR_GRAPHIC') + graphicsTip,
            dismiss: prepareDismissal(`CONTRASTERROR${$el.outerHTML}`),
            dismissAll: option.checks.CONTRAST_ERROR_GRAPHIC.dismissAll ? 'CONTRAST_ERROR_GRAPHIC' : false,
            developer: option.checks.CONTRAST_ERROR_GRAPHIC.developer || true,
            contrastDetails: updatedItem,
          });
        }
        break;
      case 'svg-warning':
      case 'svg-text':
        if (option.checks.CONTRAST_WARNING_GRAPHIC) {
          results.push({
            element: $el,
            type: option.checks.CONTRAST_WARNING_GRAPHIC.type || 'warning',
            content: option.checks.CONTRAST_WARNING_GRAPHIC.content
              ? Lang.sprintf(option.checks.CONTRAST_WARNING_GRAPHIC.content)
              : Lang.sprintf('CONTRAST_WARNING_GRAPHIC') + graphicsTip,
            dismiss: prepareDismissal(`CONTRASTWARNING${$el.outerHTML}`),
            dismissAll: option.checks.CONTRAST_WARNING_GRAPHIC.dismissAll ? 'CONTRAST_WARNING_GRAPHIC' : false,
            developer: option.checks.CONTRAST_WARNING_GRAPHIC.developer || true,
            contrastDetails: updatedItem,
          });
        }
        break;
      case 'background-image':
        if (option.checks.CONTRAST_WARNING) {
          results.push({
            element,
            type: option.checks.CONTRAST_WARNING.type || 'warning',
            content: option.checks.CONTRAST_WARNING.content
              ? Lang.sprintf(option.checks.CONTRAST_WARNING.content)
              : Lang.sprintf('CONTRAST_WARNING') + ratioTip,
            dismiss: prepareDismissal(`CONTRAST${sanitizedText}`),
            dismissAll: option.checks.CONTRAST_WARNING.dismissAll ? 'CONTRAST_WARNING' : false,
            developer: option.checks.CONTRAST_WARNING.developer || false,
            contrastDetails: updatedItem,
          });
        }
        break;
      case 'unsupported':
        if (option.checks.CONTRAST_UNSUPPORTED) {
          results.push({
            element,
            type: option.checks.CONTRAST_UNSUPPORTED.type || 'warning',
            content: option.checks.CONTRAST_UNSUPPORTED.content
              ? Lang.sprintf(option.checks.CONTRAST_UNSUPPORTED.content)
              : Lang.sprintf('CONTRAST_WARNING') + ratioTip,
            dismiss: prepareDismissal(`CONTRAST${sanitizedText}`),
            dismissAll: option.checks.CONTRAST_UNSUPPORTED.dismissAll ? 'CONTRAST_UNSUPPORTED' : false,
            developer: option.checks.CONTRAST_UNSUPPORTED.developer || false,
            contrastDetails: updatedItem,
          });
        }
        break;
    }
  });
  return results;
}

function checkLabels(results, option) {
  if (option.formLabelsPlugin) {
    Elements.Found.Inputs.forEach(($el) => {
      // Ignore completely hidden elements.
      const ariaHidden = $el.getAttribute('aria-hidden') === 'true';
      const negativeTabindex = $el.getAttribute('tabindex') === '-1';
      const hidden = isElementHidden($el);
      if (hidden || (ariaHidden && negativeTabindex)) {
        return;
      }

      // Compute accessible name on input.
      const computeName = computeAccessibleName($el);
      const inputName = removeWhitespace(computeName);

      // Get attributes.
      const alt = $el.getAttribute('alt');
      const type = $el.getAttribute('type');
      const hasTitle = $el.getAttribute('title');
      const hasAria = $el.getAttribute('aria-label') || $el.getAttribute('aria-labelledby');

      // Pass: Ignore if it's a submit or hidden button.
      if (type === 'submit' || type === 'button' || type === 'hidden') {
        return;
      }

      // Error: Input with type="image" without accessible name or alt.
      if (type === 'image') {
        if (option.checks.LABELS_MISSING_IMAGE_INPUT && (!alt || alt.trim() === '') && !hasAria && !hasTitle) {
          results.push({
            element: $el,
            type: option.checks.LABELS_MISSING_IMAGE_INPUT.type || 'error',
            content: Lang.sprintf(option.checks.LABELS_MISSING_IMAGE_INPUT.content || 'LABELS_MISSING_IMAGE_INPUT'),
            dismiss: prepareDismissal(`INPUTIMAGE${type + inputName}`),
            dismissAll: option.checks.LABELS_MISSING_IMAGE_INPUT.dismissAll ? 'LABELS_MISSING_IMAGE_INPUT' : false,
            developer: option.checks.LABELS_MISSING_IMAGE_INPUT.developer || true,
          });
        }
        return;
      }

      // Warning: to remove reset buttons.
      if (type === 'reset') {
        if (option.checks.LABELS_INPUT_RESET) {
          results.push({
            element: $el,
            type: option.checks.LABELS_INPUT_RESET.type || 'warning',
            content: Lang.sprintf(option.checks.LABELS_INPUT_RESET.content || 'LABELS_INPUT_RESET'),
            dismiss: prepareDismissal(`INPUTRESET${type + inputName}`),
            dismissAll: option.checks.LABELS_INPUT_RESET.dismissAll ? 'LABELS_INPUT_RESET' : false,
            developer: option.checks.LABELS_INPUT_RESET.developer || false,
          });
        }
        return;
      }

      // Uses ARIA or title attribute. Warn them to ensure there's a visible label.
      if (hasAria || hasTitle) {
        if (inputName.length === 0) {
          if (option.checks.LABELS_MISSING_LABEL) {
            results.push({
              element: $el,
              type: option.checks.LABELS_MISSING_LABEL.type || 'error',
              content: Lang.sprintf(option.checks.LABELS_MISSING_LABEL.content || 'LABELS_MISSING_LABEL'),
              dismiss: prepareDismissal(`INPUTMISSING${type + inputName}`),
              dismissAll: option.checks.LABELS_MISSING_LABEL.dismissAll ? 'LABELS_MISSING_LABEL' : false,
              developer: option.checks.LABELS_MISSING_LABEL.developer || true,
            });
          }
        } else if (option.checks.LABELS_ARIA_LABEL_INPUT) {
          const sanitizedText = sanitizeHTML(inputName);
          results.push({
            element: $el,
            type: option.checks.LABELS_ARIA_LABEL_INPUT.type || 'warning',
            content: option.checks.LABELS_ARIA_LABEL_INPUT.content
              ? Lang.sprintf(option.checks.LABELS_ARIA_LABEL_INPUT.content, sanitizedText)
              : `${Lang.sprintf('LABELS_ARIA_LABEL_INPUT', sanitizedText)} ${Lang.sprintf('ACC_NAME_TIP')}`,
            dismiss: prepareDismissal(`INPUTARIA${type + inputName}`),
            dismissAll: option.checks.LABELS_ARIA_LABEL_INPUT.dismissAll ? 'LABELS_ARIA_LABEL_INPUT' : false,
            developer: option.checks.LABELS_ARIA_LABEL_INPUT.developer || true,
          });
        }
        return;
      }

      // Implicit label: <label>First name: <input type="text"/><label>
      const closestLabel = $el.closest('label');
      const labelName = (closestLabel) ? removeWhitespace(computeAccessibleName(closestLabel)) : '';
      if (closestLabel && labelName.length) {
        return;
      }

      // Check to see if each label has a matching for and it attribute.
      const id = $el.getAttribute('id');
      if (id) {
        // Find labels without a match.
        if (!Elements.Found.Labels.some((label) => label.getAttribute('for') === id)) {
          if (option.checks.LABELS_NO_FOR_ATTRIBUTE) {
            results.push({
              element: $el,
              type: option.checks.LABELS_NO_FOR_ATTRIBUTE.type || 'error',
              content: Lang.sprintf(option.checks.LABELS_NO_FOR_ATTRIBUTE.content || 'LABELS_NO_FOR_ATTRIBUTE', id),
              dismiss: prepareDismissal(`INPUTNOFOR${type + inputName}`),
              dismissAll: option.checks.LABELS_NO_FOR_ATTRIBUTE.dismissAll ? 'LABELS_NO_FOR_ATTRIBUTE' : false,
              developer: option.checks.LABELS_NO_FOR_ATTRIBUTE.developer || true,
            });
          }
        }
      } else if (option.checks.LABELS_MISSING_LABEL) {
        // No id!
        results.push({
          element: $el,
          type: option.checks.LABELS_MISSING_LABEL.type || 'error',
          content: Lang.sprintf(option.checks.LABELS_MISSING_LABEL.content || 'LABELS_MISSING_LABEL'),
          dismiss: prepareDismissal(`INPUTNOID${type + inputName}`),
          dismissAll: option.checks.LABELS_MISSING_LABEL.dismissAll ? 'LABELS_MISSING_LABEL' : false,
          developer: option.checks.LABELS_MISSING_LABEL.developer || true,
        });
      }

      // Avoid using placeholder attributes.
      if ($el.placeholder && $el.placeholder !== 0) {
        results.push({
          element: $el,
          type: option.checks.LABELS_PLACEHOLDER.type || 'warning',
          content: Lang.sprintf(option.checks.LABELS_PLACEHOLDER.content || 'LABELS_PLACEHOLDER'),
          dismiss: prepareDismissal(`INPUTPLACEHOLDER${type + inputName}`),
          dismissAll: option.checks.LABELS_PLACEHOLDER.dismissAll ? 'LABELS_PLACEHOLDER' : false,
          developer: option.checks.LABELS_PLACEHOLDER.developer || true,
        });
      }
    });
  }
  return results;
}

/**
 * Rulesets: Readability
 * Adapted from Greg Kraus. References for other non-english languages included below.
 * @link https://accessibility.oit.ncsu.edu/it-accessibility-at-nc-state/developers/tools/readability-bookmarklet/
 * @link https://core.ac.uk/download/pdf/6552422.pdf
 * @link https://github.com/Yoast/YoastSEO.js/issues/267
 * @link http://stackoverflow.com/questions/5686483/how-to-compute-number-of-syllables-in-a-word-in-javascript
 * @link https://www.simoahava.com/analytics/calculate-readability-scores-for-content/#commento-58ac602191e5c6dc391015c5a6933cf3e4fc99d1dc92644024c331f1ee9b6093
 * @link https://oaji.net/articles/2017/601-1498133639.pdf (Portuguese adaptation).
*/

function checkReadability() {
  let results;
  const rememberReadability = store.getItem('sa11y-readability') === 'On';
  if (rememberReadability) {
    // Crude hack to add a period to the end of list items to make a complete sentence.
    Elements.Found.Readability.forEach(($el) => {
      const listText = $el.textContent;
      if (listText.length >= 120) {
        if (listText.charAt(listText.length - 1) !== '.') {
          $el.insertAdjacentHTML('beforeend', '<span data-sa11y-readability-period>.</span>');
        }
      }
    });

    // Combine all page text.
    const readabilityarray = [];
    for (let i = 0; i < Elements.Found.Readability.length; i++) {
      const current = Elements.Found.Readability[i];
      const ignore = fnIgnore(current); // Ignore unwanted tags.
      const getText$1 = getText(ignore); // Get text.
      if (getText$1 !== '') {
        readabilityarray.push(getText$1);
      }
    }
    const pageText = readabilityarray.join(' ').toString();

    /* Flesch Reading Ease for English, French, German, Dutch, and Italian. */
    if (['en', 'es', 'fr', 'de', 'nl', 'it', 'pt'].includes(Constants.Readability.Lang)) {
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
      if (Constants.Readability.Lang === 'en') {
        flesch = 206.835 - (1.015 * (words / sentences)) - (84.6 * (totalSyllables / words));
      } else if (Constants.Readability.Lang === 'fr') {
        flesch = 207 - (1.015 * (words / sentences)) - (73.6 * (totalSyllables / words));
      } else if (Constants.Readability.Lang === 'es') {
        flesch = 206.84 - (1.02 * (words / sentences)) - (0.60 * (100 * (totalSyllables / words)));
      } else if (Constants.Readability.Lang === 'de') {
        flesch = 180 - (words / sentences) - (58.5 * (totalSyllables / words));
      } else if (Constants.Readability.Lang === 'nl') {
        flesch = 206.84 - (0.77 * (100 * (totalSyllables / words))) - (0.93 * (words / sentences));
      } else if (Constants.Readability.Lang === 'it') {
        flesch = 217 - (1.3 * (words / sentences)) - (0.6 * (100 * (totalSyllables / words)));
      } else if (Constants.Readability.Lang === 'pt') {
        flesch = 248.835 - (1.015 * (words / sentences)) - (84.6 * (totalSyllables / words));
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
        difficulty = Lang._('VERY_DIFFICULT');
      } else if (fleschScore > 31 && fleschScore < 49) {
        difficulty = Lang._('DIFFICULT');
      } else if (fleschScore > 50 && fleschScore < 60) {
        difficulty = Lang._('FAIRLY_DIFFICULT');
      } else {
        difficulty = Lang._('GOOD');
      }

      // Create object for headless mode.
      results = {
        score: fleschScore,
        averageWordsPerSentence: avgWordsPerSentence,
        complexWords,
        difficultyLevel: difficulty,
        wordCount: words,
      };
    } else if (['sv', 'fi', 'da', 'no', 'nb', 'nn'].includes(Constants.Readability.Lang)) {
      /* Lix: Danish, Finnish, Norwegian (Bokmål & Nynorsk), Swedish. */
      const calculateLix = (text) => {
        const lixWords = () => text.replace(/[-'.]/ig, '').split(/[^a-zA-ZöäåÖÄÅÆæØø0-9]/g).filter(Boolean);
        const splitSentences = () => {
          const splitter = /\?|!|\.|\n/g;
          const arrayOfSentences = text.split(splitter).filter(Boolean);
          return arrayOfSentences;
        };
        const wordCount = lixWords().length;
        const longWordsCount = lixWords().filter((wordsArray) => wordsArray.length > 6).length;
        const sentenceCount = splitSentences().length;
        const score = Math.round((wordCount / sentenceCount) + ((longWordsCount * 100) / wordCount));
        const avgWordsPerSentence = (wordCount / sentenceCount).toFixed(1);
        const complexWords = Math.round(100 * (longWordsCount / wordCount));

        let difficulty;
        if (score >= 0 && score < 39) {
          difficulty = Lang._('GOOD');
        } else if (score > 40 && score < 50) {
          difficulty = Lang._('FAIRLY_DIFFICULT');
        } else if (score > 51 && score < 61) {
          difficulty = Lang._('DIFFICULT');
        } else {
          difficulty = Lang._('VERY_DIFFICULT');
        }
        return {
          score, difficulty, avgWordsPerSentence, complexWords, wordCount,
        };
      };

      // Compute LIX
      const lix = calculateLix(pageText);

      // Create object for headless mode.
      results = {
        score: lix.score,
        averageWordsPerSentence: lix.avgWordsPerSentence,
        complexWords: lix.complexWords,
        difficultyLevel: lix.difficulty,
        wordCount: lix.wordCount,
      };
    }

    // Update main panel if not in headless mode.
    if (Constants.Global.headless === false) {
      if (pageText.length === 0) {
        Constants.Panel.readabilityInfo.innerHTML = Lang._('READABILITY_NO_CONTENT');
      } else if (results.wordCount > 30) {
        Constants.Panel.readabilityInfo.innerHTML = `${results.score} <span class="readability-score">${results.difficultyLevel}</span>`;

        Constants.Panel.readabilityDetails.innerHTML = `
            <li>
              <strong>${Lang._('AVG_SENTENCE')}</strong>
              ${results.averageWordsPerSentence}
            </li>
            <li>
              <strong>${Lang._('COMPLEX_WORDS')}</strong>
              ${results.complexWords}%
            </li>
            <li>
              <strong>${Lang._('TOTAL_WORDS')}</strong>
              ${results.wordCount}
            </li>`;
      } else {
        Constants.Panel.readabilityInfo.textContent = Lang._('READABILITY_NOT_ENOUGH');
      }
    }
  }
  return results;
}

function checkEmbeddedContent(results, option) {
  // iFrame's SRC attribute.
  const src = ($el) => ($el.getAttribute('src') !== 'undefined'
    ? $el.getAttribute('src')
    : $el.querySelector('[src]')?.getAttribute('src'));

  // Warning: Audio content.
  if (option.checks.EMBED_AUDIO) {
    Elements.Found.Audio.forEach(($el) => {
      // General warning for audio content.
      results.push({
        element: $el,
        type: option.checks.EMBED_AUDIO.type || 'warning',
        content: Lang.sprintf(option.checks.EMBED_AUDIO.content || 'EMBED_AUDIO'),
        dismiss: prepareDismissal(`AUDIO${src($el)}`),
        dismissAll: option.checks.EMBED_AUDIO.dismissAll ? 'EMBED_AUDIO' : false,
        developer: option.checks.EMBED_AUDIO.developer || false,
      });
    });
  }

  // Warning: Video content.
  if (option.checks.EMBED_VIDEO) {
    Elements.Found.Videos.forEach(($el) => {
      // Warning if <track> doesn't exist, or the <track>'s src is empty.
      const track = $el.querySelector('track');
      const trackSrc = track?.getAttribute('src');
      if (track === null || trackSrc === null || trackSrc.trim().length === 0) {
        results.push({
          element: $el,
          type: option.checks.EMBED_VIDEO.type || 'warning',
          content: Lang.sprintf(option.checks.EMBED_VIDEO.content || 'EMBED_VIDEO'),
          dismiss: prepareDismissal(`VIDEO${src($el)}`),
          dismissAll: option.checks.EMBED_VIDEO.dismissAll ? 'EMBED_VIDEO' : false,
          developer: option.checks.EMBED_VIDEO.developer || false,
        });
      }
    });
  }

  // Warning: Data visualizations.
  if (option.checks.EMBED_DATA_VIZ) {
    Elements.Found.Visualizations.forEach(($el) => {
      // General warning for data visualization widgets.
      results.push({
        element: $el,
        type: option.checks.EMBED_DATA_VIZ.type || 'warning',
        content: Lang.sprintf(option.checks.EMBED_DATA_VIZ.content || 'EMBED_DATA_VIZ'),
        dismiss: prepareDismissal(`DATAVIZ${src($el)}`),
        dismissAll: option.checks.EMBED_DATA_VIZ.dismissAll ? 'EMBED_DATA_VIZ' : false,
        developer: option.checks.EMBED_DATA_VIZ.developer || false,
      });
    });
  }

  /* Error: Check all iFrames for a missing accessible name. */
  Elements.Found.iframes.forEach(($el) => {
    // Ignore hidden elements and video/audio.
    const presentation = ['presentation', 'none'].includes($el.getAttribute('role'));
    const hidden = isElementHidden($el);
    const videoAudio = $el.tagName === 'VIDEO' || $el.tagName === 'AUDIO';
    const ariaHidden = $el.getAttribute('aria-hidden') === 'true';
    const negativeTabindex = $el.getAttribute('tabindex') === '-1';
    if (hidden || videoAudio || (ariaHidden && negativeTabindex) || presentation) {
      return;
    }

    // Warning if element only has negative tabindex (without aria-hidden). Axe rulecheck.
    if (negativeTabindex) {
      if (option.checks.EMBED_UNFOCUSABLE) {
        results.push({
          element: $el,
          type: option.checks.EMBED_UNFOCUSABLE.type || 'error',
          content: Lang.sprintf(option.checks.EMBED_UNFOCUSABLE.content || 'EMBED_UNFOCUSABLE'),
          dismiss: prepareDismissal(`EMBEDUNFOCUSABLE${src($el)}`),
          dismissAll: option.checks.EMBED_UNFOCUSABLE.dismissAll ? 'EMBED_UNFOCUSABLE' : false,
          developer: option.checks.EMBED_UNFOCUSABLE.developer || true,
        });
      }
      return;
    }

    if (option.checks.EMBED_MISSING_TITLE) {
      // Accessible name is missing for iFrame.
      const aria = computeAriaLabel($el);
      const checkTitle = (aria === 'noAria') ? ($el.getAttribute('title') || '') : aria;
      const accessibleName = removeWhitespace(checkTitle);
      if (accessibleName.length === 0) {
        results.push({
          element: $el,
          type: option.checks.EMBED_MISSING_TITLE.type || 'error',
          content: Lang.sprintf(option.checks.EMBED_MISSING_TITLE.content || 'EMBED_MISSING_TITLE'),
          dismiss: prepareDismissal(`EMBEDMISSTITLE${src($el)}`),
          dismissAll: option.checks.EMBED_MISSING_TITLE.dismissAll ? 'EMBED_MISSING_TITLE' : false,
          developer: option.checks.EMBED_MISSING_TITLE.developer || true,
        });
      }
    }
  });

  /* Warning: for all iFrames (except video, audio, or data visualizations). */
  if (option.checks.EMBED_GENERAL) {
    Elements.Found.EmbeddedContent.forEach(($el) => {
      // Ignore hidden elements.
      const presentation = ['presentation', 'none'].includes($el.getAttribute('role'));
      const ariaHidden = $el.getAttribute('aria-hidden') === 'true';
      const negativeTabindex = $el.getAttribute('tabindex') === '-1';
      const hidden = isElementHidden($el);
      if (hidden || (ariaHidden && negativeTabindex) || presentation) {
        return;
      }

      // Ignore video & audio elements.
      if ($el.tagName === 'VIDEO' || $el.tagName === 'AUDIO') {
        return;
      }

      results.push({
        element: $el,
        type: option.checks.EMBED_GENERAL.type || 'warning',
        content: Lang.sprintf(option.checks.EMBED_GENERAL.content || 'EMBED_GENERAL'),
        dismiss: prepareDismissal(`IFRAMEGENERAL${src($el)}`),
        dismissAll: option.checks.EMBED_GENERAL.dismissAll ? 'EMBED_GENERAL' : false,
        developer: option.checks.EMBED_GENERAL.developer || false,
      });
    });
  }
  return results;
}

function checkQA(results, option) {
  /* *********************************************************** */
  /*  Error: Find all links pointing to development environment. */
  /* *********************************************************** */
  if (option.checks.QA_BAD_LINK) {
    Elements.Found.CustomErrorLinks.forEach(($el) => {
      results.push({
        element: $el,
        type: option.checks.QA_BAD_LINK.type || 'error',
        content: Lang.sprintf(option.checks.QA_BAD_LINK.content || 'QA_BAD_LINK', $el),
        inline: true,
        dismiss: prepareDismissal($el.tagName + $el.textContent),
        dismissAll: option.checks.QA_BAD_LINK.dismissAll ? 'QA_BAD_LINK' : false,
        developer: option.checks.QA_BAD_LINK.developer || false,
      });
    });
  }

  /* *********************************************************** */
  /*  Warning: Excessive bolding or italics.                     */
  /* *********************************************************** */
  if (option.checks.QA_STRONG_ITALICS) {
    Elements.Found.StrongItalics.forEach(($el) => {
      const text = getText($el);
      if (text.length !== 0 && text.length > 400) {
        results.push({
          element: $el.parentNode,
          type: option.checks.QA_STRONG_ITALICS.type || 'warning',
          content: Lang.sprintf(option.checks.QA_STRONG_ITALICS.content || 'QA_STRONG_ITALICS'),
          dismiss: prepareDismissal($el.tagName + $el.textContent),
          dismissAll: option.checks.QA_STRONG_ITALICS.dismissAll ? 'QA_STRONG_ITALICS' : false,
          developer: option.checks.QA_STRONG_ITALICS.developer || false,
        });
      }
    });
  }

  /* ************************************************************** */
  /*  Warning: Additional link checks.                              */
  /* ************************************************************** */
  Elements.Found.Links.forEach(($el) => {
    if ($el.hasAttribute('href')) {
      const href = $el.getAttribute('href');

      // Has file extension.
      const hasExtension = $el.matches(Constants.Global.documentSources);
      const hasPDF = $el.matches('a[href$=".pdf"], a[href*=".pdf?"]');

      // Check for broken same-page links.
      if (option.checks.QA_IN_PAGE_LINK) {
        const hasAttributes = $el.getAttribute('role') === 'button' || $el.hasAttribute('aria-haspopup') || $el.hasAttribute('aria-expanded') || $el.hasAttribute('onclick');
        const hasText = getText($el).length !== 0;
        if ((href.startsWith('#') || href === '') && !hasAttributes && hasText) {
          const targetId = href.substring(1);
          const ariaControls = $el.getAttribute('aria-controls');
          const targetElement = document.getElementById(targetId)
            || document.getElementById(decodeURIComponent(targetId))
            || document.getElementById(encodeURIComponent(targetId))
            || document.getElementById(ariaControls)
            || document.querySelector(`a[name="${targetId}"]`);

          // If reference ID doesn't exist.
          if (!targetElement) {
            results.push({
              element: $el,
              type: option.checks.QA_IN_PAGE_LINK.type || 'error',
              content: Lang.sprintf(option.checks.QA_IN_PAGE_LINK.content || 'QA_IN_PAGE_LINK'),
              inline: true,
              dismiss: prepareDismissal(`QAINPAGE${href}`),
              dismissAll: option.checks.QA_IN_PAGE_LINK.dismissAll ? 'QA_IN_PAGE_LINK' : false,
              developer: option.checks.QA_IN_PAGE_LINK.developer || false,
            });
          }
        }
      }

      // Manually inspect documents & PDF for accessibility.
      if (option.checks.QA_DOCUMENT && hasExtension) {
        results.push({
          element: $el,
          type: option.checks.QA_DOCUMENT.type || 'warning',
          content: Lang.sprintf(option.checks.QA_DOCUMENT.content || 'QA_DOCUMENT'),
          inline: true,
          dismiss: prepareDismissal(`DOC${href}`),
          dismissAll: option.checks.QA_DOCUMENT.dismissAll ? 'QA_DOCUMENT' : false,
          developer: option.checks.QA_DOCUMENT.developer || false,
        });
      } else if (option.checks.QA_PDF && hasPDF) {
        results.push({
          element: $el,
          type: option.checks.QA_PDF.type || 'warning',
          content: Lang.sprintf(option.checks.QA_PDF.content || 'QA_PDF'),
          inline: true,
          dismiss: prepareDismissal(`PDF${href}`),
          dismissAll: option.checks.QA_PDF.dismissAll ? 'QA_PDF' : false,
          developer: option.checks.QA_PDF.developer || false,
        });
      }
    }
  });

  /* *************************************************************** */
  /*  Warning: Find blockquotes used as headers.                     */
  /* *************************************************************** */
  if (option.checks.QA_BLOCKQUOTE) {
    Elements.Found.Blockquotes.forEach(($el) => {
      const text = getText($el);
      if (text.length !== 0 && text.length < 25) {
        const sanitizedText = sanitizeHTML(text);
        results.push({
          element: $el,
          type: option.checks.QA_BLOCKQUOTE.type || 'warning',
          content: Lang.sprintf(option.checks.QA_BLOCKQUOTE.content || 'QA_BLOCKQUOTE', sanitizedText),
          dismiss: prepareDismissal(`BLOCKQUOTE${sanitizedText}`),
          dismissAll: option.checks.QA_BLOCKQUOTE.dismissAll ? 'QA_BLOCKQUOTE' : false,
          developer: option.checks.QA_BLOCKQUOTE.developer || false,
        });
      }
    });
  }

  /* *************************************************************** */
  /*  Errors: Check HTML tables for issues.                          */
  /* *************************************************************** */
  Elements.Found.Tables.forEach(($el) => {
    if (isElementHidden($el) === false) {
      const tableHeaders = $el.querySelectorAll('th');
      const semanticHeadings = $el.querySelectorAll('h1, h2, h3, h4, h5, h6');
      const key = prepareDismissal(`TABLE${$el.textContent}`);
      if (option.checks.TABLES_MISSING_HEADINGS && tableHeaders.length === 0) {
        results.push({
          element: $el,
          type: option.checks.TABLES_MISSING_HEADINGS.type || 'error',
          content: Lang.sprintf(option.checks.TABLES_MISSING_HEADINGS.content || 'TABLES_MISSING_HEADINGS'),
          dismiss: key,
          dismissAll: option.checks.TABLES_MISSING_HEADINGS.dismissAll ? 'TABLES_MISSING_HEADINGS' : false,
          developer: option.checks.TABLES_MISSING_HEADINGS.developer || false,
        });
      }
      if (option.checks.TABLES_SEMANTIC_HEADING && semanticHeadings.length > 0) {
        semanticHeadings.forEach((heading) => {
          results.push({
            element: heading,
            type: option.checks.TABLES_SEMANTIC_HEADING.type || 'error',
            content: Lang.sprintf(option.checks.TABLES_SEMANTIC_HEADING.content || 'TABLES_SEMANTIC_HEADING'),
            dismiss: key,
            dismissAll: option.checks.TABLES_SEMANTIC_HEADING.dismissAll ? 'TABLES_SEMANTIC_HEADING' : false,
            developer: option.checks.TABLES_SEMANTIC_HEADING.developer || false,
          });
        });
      }
      tableHeaders.forEach((th) => {
        if (option.checks.TABLES_EMPTY_HEADING && th.textContent.trim().length === 0) {
          results.push({
            element: th,
            type: option.checks.TABLES_EMPTY_HEADING.type || 'error',
            content: Lang.sprintf(option.checks.TABLES_EMPTY_HEADING.content || 'TABLES_EMPTY_HEADING'),
            position: 'afterbegin',
            dismiss: key,
            dismissAll: option.checks.TABLES_EMPTY_HEADING.dismissAll ? 'TABLES_EMPTY_HEADING' : false,
            developer: option.checks.TABLES_EMPTY_HEADING.developer || false,
          });
        }
      });
    }
  });

  /* ****************************************************************** */
  /*  Warning: Detect fake headings                                     */
  /* ****************************************************************** */
  if (option.checks.QA_FAKE_HEADING) {
    const addResult = (element, sanitizedText) => {
      results.push({
        element,
        type: option.checks.QA_FAKE_HEADING.type || 'warning',
        content: Lang.sprintf(option.checks.QA_FAKE_HEADING.content || 'QA_FAKE_HEADING', sanitizedText),
        dismiss: prepareDismissal(`BOLD${sanitizedText}`),
        dismissAll: option.checks.QA_FAKE_HEADING.dismissAll ? 'QA_FAKE_HEADING' : false,
        developer: option.checks.QA_FAKE_HEADING.developer || false,
      });
    };

    // To minimize false positives/number of warnings...
    const isPreviousElementAHeading = (p) => {
      const previousElement = p.previousElementSibling;
      if (!previousElement) return false;
      const headingTags = ['H1', 'H2', 'H3', 'H4', 'H5', 'H6'];
      return headingTags.includes(previousElement.tagName);
    };

    // Find large text as heading.
    const ignoreParents = 'h1, h2, h3, h4, h5, h6, [role="heading"][aria-level], blockquote, table';
    const computeLargeParagraphs = (p) => {
      const size = getComputedStyle(p).fontSize.replace('px', '');
      const getText$1 = getText(p);
      const maybeSentence = getText$1.match(/[.;?!"]/) === null;
      const typicalHeadingLength = getText$1.length >= 4 && getText$1.length <= 120;

      if (size >= 24 && !p.closest(ignoreParents) && typicalHeadingLength && maybeSentence && !isPreviousElementAHeading(p)) {
        const sanitizedText = sanitizeHTML(getText$1);
        addResult(p, sanitizedText);
      }
    };

    // Find bolded text as headings.
    const computeBoldTextParagraphs = (p) => {
      const startsWithBold = /^(<strong>|<b>)/i.test(p.innerHTML.trim());

      if (startsWithBold && !p.closest(ignoreParents)) {
        const possibleHeading = p.querySelector('strong, b');
        const possibleHeadingText = getText(possibleHeading);

        // Conditions
        const notASentence = possibleHeadingText.match(/[.:;?!"']/) === null;
        const typicalHeadingLength = possibleHeadingText.length >= 3 && possibleHeadingText.length <= 120;

        if (typicalHeadingLength && notASentence) {
          // Be a little forgiving if it's a small paragraph.
          const nonHeadingTextLength = fnIgnore(p, ['strong', 'b']).textContent.trim().length;
          if (nonHeadingTextLength !== 0 && nonHeadingTextLength <= 250) {
            return;
          }

          const sanitizedText = sanitizeHTML(possibleHeadingText);
          addResult(possibleHeading, sanitizedText);
        }
      }
    };

    Elements.Found.Paragraphs.forEach((p) => {
      computeLargeParagraphs(p);
      computeBoldTextParagraphs(p);
    });
  }

  /* *************************************************************** */
  /*  Warning: Detect paragraphs that should be lists.               */
  /*  Thanks to John Jameson from PrincetonU for this ruleset!       */
  /* *************************************************************** */
  if (option.checks.QA_FAKE_LIST) {
    const numberMatch = new RegExp(/(([023456789][\d\s])|(1\d))/, ''); // All numbers but 1.
    const alphabeticMatch = new RegExp(/(^[aA1αаΑ]|[^\p{Alphabetic}\s])[-\s.)]/, 'u');
    const emojiMatch = new RegExp(/\p{Extended_Pictographic}/, 'u');
    const secondTextNoMatch = ['a', 'A', 'α', 'Α', 'а', 'А', '1'];
    const specialCharsMatch = /[([{#]/;
    const prefixDecrement = {
      2: '1',
      b: 'a',
      B: 'A',
      β: 'α',
      Β: 'Α',
      б: 'а',
      Б: 'А',
    };
    const decrement = (element) => element.replace(/^b|^B|^б|^Б|^β|^В|^2/, (match) => prefixDecrement[match]);

    // Variables to carry in loop.
    let activeMatch = ''; // Carried in loop for second paragraph.
    let firstText = ''; // Text of previous paragraph.
    let lastHitWasEmoji = false;

    Elements.Found.Paragraphs.forEach((p, i) => {
      let secondText = false;
      let hit = false;
      firstText = firstText || getText(p).replace('(', '');
      const firstPrefix = firstText.substring(0, 2);

      // Grab first two characters.
      const isAlphabetic = firstPrefix.match(alphabeticMatch);
      const isNumber = firstPrefix.match(numberMatch);
      const isEmoji = firstPrefix.match(emojiMatch);
      const isSpecialChar = specialCharsMatch.test(firstPrefix.charAt(0));

      if (
        firstPrefix.length > 0
        && firstPrefix !== activeMatch
        && !isNumber
        && (isAlphabetic || isEmoji || isSpecialChar)
      ) {
        // We have a prefix and a possible hit; check next detected paragraph.
        const secondP = Elements.Found.Paragraphs[i + 1];
        if (secondP) {
          secondText = getText(secondP).replace('(', '').substring(0, 2);
          if (secondTextNoMatch.includes(secondText?.toLowerCase().trim())) {
            // A sentence. Another sentence. (A sentence). 1 apple, 1 banana.
            return;
          }
          const secondPrefix = decrement(secondText);
          if (isAlphabetic) {
            // Check for repeats (*,*) or increments(a,b)
            if (firstPrefix !== 'A ' && firstPrefix === secondPrefix) {
              hit = true;
            }
          } else if (isEmoji && !lastHitWasEmoji) {
            // Check for two paragraphs in a row that start with emoji.
            if (secondPrefix.match(emojiMatch)) {
              hit = true;
              lastHitWasEmoji = true;
              // This is carried; better miss than have lots of positives.
            }
          }
        }
        if (!hit) {
          // Split p by carriage return if there was a firstPrefix and compare.
          let textAfterBreak = p?.querySelector('br')?.nextSibling?.nodeValue;
          if (textAfterBreak) {
            textAfterBreak = textAfterBreak.replace(/<\/?[^>]+(>|$)/g, '').trim().substring(0, 2);
            const checkForOtherPrefixChars = specialCharsMatch.test(textAfterBreak.charAt(0));
            if (checkForOtherPrefixChars
              || firstPrefix === decrement(textAfterBreak)
              || (!lastHitWasEmoji && textAfterBreak.match(emojiMatch))) {
              hit = true;
            }
          }
        } if (hit) {
          results.push({
            element: p,
            type: option.checks.QA_FAKE_LIST.type || 'warning',
            content: Lang.sprintf(option.checks.QA_FAKE_LIST.content || 'QA_FAKE_LIST', firstPrefix),
            dismiss: prepareDismissal(`LIST${p.textContent}`),
            dismissAll: option.checks.QA_FAKE_LIST.dismissAll ? 'QA_FAKE_LIST' : false,
            developer: option.checks.QA_FAKE_LIST.developer || false,
          });
          activeMatch = firstPrefix;
        } else {
          activeMatch = '';
        }
      }
      // Reset for next loop, carry over text query if available.
      firstText = secondText ? '' : secondText;
    });
  }

  /* **************************************** */
  /*  Warning: Detect uppercase text.         */
  /* **************************************** */
  if (option.checks.QA_UPPERCASE) {
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
        thisText = getText($el);
      }

      // Patterns
      const uppercasePattern = /([A-Z]{2,}[ ])([A-Z]{2,}[ ])([A-Z]{2,}[ ])([A-Z]{2,})/g;
      const detectUpperCase = thisText.match(uppercasePattern);

      if (detectUpperCase && detectUpperCase[0].length > 10) {
        results.push({
          element: $el,
          type: option.checks.QA_UPPERCASE.type || 'warning',
          content: Lang.sprintf(option.checks.QA_UPPERCASE.content || 'QA_UPPERCASE'),
          dismiss: prepareDismissal(`UPPERCASE${thisText}`),
          dismissAll: option.checks.QA_UPPERCASE.dismissAll ? 'QA_UPPERCASE' : false,
          developer: option.checks.QA_UPPERCASE.developer || false,
        });
      }
    };
    Elements.Found.Paragraphs.forEach(($el) => checkCaps($el));
    Elements.Found.Headings.forEach(($el) => checkCaps($el));
    Elements.Found.Lists.forEach(($el) => checkCaps($el));
    Elements.Found.Blockquotes.forEach(($el) => checkCaps($el));
  }

  /* ************************************************************** */
  /*  Various checks: underlines, justify-aligned, and small text.  */
  /* ************************************************************** */
  // Check underlined text. Created by Brian Teeman!
  const addUnderlineResult = ($el) => {
    results.push({
      element: $el,
      type: option.checks.QA_UNDERLINE.type || 'warning',
      content: Lang.sprintf(option.checks.QA_UNDERLINE.content || 'QA_UNDERLINE'),
      inline: true,
      dismiss: prepareDismissal(`UNDERLINE${$el.textContent}`),
      dismissAll: option.checks.QA_UNDERLINE.dismissAll ? 'QA_UNDERLINE' : false,
      developer: option.checks.QA_UNDERLINE.developer || false,
    });
  };

  const addJustifyResult = ($el) => {
    results.push({
      element: $el,
      type: option.checks.QA_JUSTIFY.type || 'warning',
      content: Lang.sprintf(option.checks.QA_JUSTIFY.content || 'QA_JUSTIFY'),
      dismiss: prepareDismissal(`JUSTIFIED${$el.textContent}`),
      dismissAll: option.checks.QA_JUSTIFY.dismissAll ? 'QA_JUSTIFY' : false,
      developer: option.checks.QA_JUSTIFY.developer || false,
    });
  };

  const addSmallTextResult = ($el) => {
    results.push({
      element: $el,
      type: option.checks.QA_SMALL_TEXT.type || 'warning',
      content: Lang.sprintf(option.checks.QA_SMALL_TEXT.content || 'QA_SMALL_TEXT'),
      dismiss: prepareDismissal(`SMALL${$el.textContent}`),
      dismissAll: option.checks.QA_SMALL_TEXT.dismissAll ? 'QA_SMALL_TEXT' : false,
      developer: option.checks.QA_SMALL_TEXT.developer || false,
    });
  };

  const computeStyle = ($el) => {
    const style = getComputedStyle($el);
    const { textDecorationLine, textAlign, fontSize } = style;

    /* Check: Underlined text. */
    if (option.checks.QA_UNDERLINE
      && textDecorationLine === 'underline'
      && !$el.closest('[onclick]')
      && !$el.closest('a[href]')
      && !$el.closest('ABBR')) {
      addUnderlineResult($el);
    }

    /* Check: Font size is greater than 0 and less than 10. */
    const defaultSize = option.checks.QA_SMALL_TEXT.fontSize || 10;
    const computedFontSize = parseFloat(fontSize);

    // Compare with parent element's font size.
    const parentFontSize = $el.parentElement
      ? parseFloat(getComputedStyle($el.parentElement).fontSize)
      : null;
    const isInherited = parentFontSize === computedFontSize;

    // Ensure the font size is specific to the element, not inherited.
    const withinRange = !isInherited && computedFontSize > 1 && computedFontSize <= defaultSize;
    if (option.checks.QA_SMALL_TEXT && withinRange) {
      addSmallTextResult($el);
    }

    /* Check: Check if text is justify-aligned. */
    const parentJustify = $el.parentElement
      ? getComputedStyle($el.parentElement).textAlign
      : null;
    const justifyInherited = parentJustify === textAlign;
    if (option.checks.QA_JUSTIFY && textAlign === 'justify' && !justifyInherited) {
      addJustifyResult($el);
    }
  };

  // Loop through all elements within the root area.
  if (option.checks.QA_UNDERLINE || option.checks.QA_JUSTIFY || option.checks.QA_SMALL_TEXT) {
    for (let i = 0; i < Elements.Found.Everything.length; i++) {
      const $el = Elements.Found.Everything[i];

      // Filter only text nodes.
      const textString = Array.from($el.childNodes)
        .filter((node) => node.nodeType === 3)
        .map((node) => node.textContent)
        .join('');
      const text = textString.trim();

      // Only if there's text!
      if (text.length !== 0) {
        computeStyle($el);
      }
    }
  }

  /* **************************************************** */
  /*  Find inappropriate use of <sup> and <sub> tags.     */
  /* **************************************************** */
  if (option.checks.QA_SUBSCRIPT) {
    Elements.Found.Subscripts.forEach(($el) => {
      const text = getText($el);
      if (text.length >= 80) {
        results.push({
          element: $el,
          type: option.checks.QA_SUBSCRIPT.type || 'warning',
          content: Lang.sprintf(option.checks.QA_SUBSCRIPT.content || 'QA_SUBSCRIPT'),
          inline: true,
          dismiss: prepareDismissal($el.tagName + text),
          dismissAll: option.checks.QA_SUBSCRIPT.dismissAll ? 'QA_SUBSCRIPT' : false,
          developer: option.checks.QA_SUBSCRIPT.developer || false,
        });
      }
    });
  }

  /* ****************************************** */
  /*  Find double nested layout components.     */
  /* ****************************************** */
  if (option.checks.QA_NESTED_COMPONENTS) {
    Elements.Found.NestedComponents.forEach(($el) => {
      const sources = option.checks.QA_NESTED_COMPONENTS.sources || '[role="tablist"], details';
      const component = $el.querySelector(sources);
      if (component) {
        results.push({
          element: $el,
          type: option.checks.QA_NESTED_COMPONENTS.type || 'warning',
          content: Lang.sprintf(option.checks.QA_NESTED_COMPONENTS.content || 'QA_NESTED_COMPONENTS'),
          dismiss: prepareDismissal(`NESTED${$el.textContent}`),
          dismissAll: option.checks.QA_NESTED_COMPONENTS.dismissAll ? 'QA_NESTED_COMPONENTS' : false,
          developer: option.checks.QA_NESTED_COMPONENTS.developer || false,
        });
      }
    });
  }

  return results;
}

function checkDeveloper(results, option) {
  /* *************************************************************** */
  /*  Error: Missing language tag. Lang should be at least 2 chars.  */
  /* *************************************************************** */
  if (option.checks.META_LANG) {
    if (!Elements.Found.Language || Elements.Found.Language.length < 2) {
      results.push({
        type: option.checks.META_LANG.type || 'error',
        content: Lang.sprintf(option.checks.META_LANG.content || 'META_LANG'),
        dismiss: prepareDismissal('LANG'),
        developer: option.checks.META_LANG.developer || true,
      });
    }
  }

  /* *************************************************************** */
  /*  Check for missing meta page title <title>                      */
  /* *************************************************************** */
  if (option.checks.META_TITLE) {
    const metaTitle = document.querySelector('title:not(svg title)');
    if (!metaTitle || metaTitle.textContent.trim().length === 0) {
      results.push({
        type: option.checks.META_TITLE.type || 'error',
        content: Lang.sprintf(option.checks.META_TITLE.content || 'META_TITLE'),
        dismiss: prepareDismissal('TITLE'),
        developer: option.checks.META_TITLE.developer || true,
      });
    }
  }

  /* ********************************************* */
  /*  Zooming and scaling must not be disabled.    */
  /* ********************************************* */
  if (option.checks.META_SCALABLE || option.checks.META_MAX) {
    const metaViewport = document.querySelector('meta[name="viewport"]');
    if (metaViewport) {
      const content = metaViewport.getAttribute('content');
      if (content) {
        // Parse the content attribute to extract parameters.
        const params = content.split(',').reduce((acc, param) => {
          const [key, value] = param.split('=').map((s) => s.trim());
          acc[key] = value;
          return acc;
        }, {});

        // Check for user-scalable parameter.
        if (option.checks.META_SCALABLE && (params['user-scalable'] === 'no' || params['user-scalable'] === '0')) {
          results.push({
            type: option.checks.META_SCALABLE.type || 'error',
            content: Lang.sprintf(option.checks.META_SCALABLE.content || 'META_SCALABLE'),
            dismiss: prepareDismissal('SCALABLE'),
            developer: option.checks.META_SCALABLE.developer || true,
          });
        }

        // Check maximum-scale parameter.
        const maxScale = parseFloat(params['maximum-scale']);
        if (option.checks.META_MAX && !Number.isNaN(maxScale) && maxScale < 2) {
          results.push({
            type: option.checks.META_MAX.type || 'error',
            content: Lang.sprintf(option.checks.META_MAX.content || 'META_MAX'),
            dismiss: prepareDismissal('MAXSCALE'),
            developer: option.checks.META_MAX.developer || true,
          });
        }
      }
    }
  }

  /* ****************************************** */
  /*  Page shouldn't automatically refresh.     */
  /* ****************************************** */
  if (option.checks.META_REFRESH) {
    const metaRefresh = document.querySelector('meta[http-equiv="refresh"]');
    if (metaRefresh) {
      results.push({
        type: option.checks.META_REFRESH.type || 'error',
        content: Lang.sprintf(option.checks.META_REFRESH.content || 'META_REFRESH'),
        dismiss: prepareDismissal('REFRESH'),
        developer: option.checks.META_REFRESH.developer || true,
      });
    }
  }

  /* *************************************************************** */
  /*  Check for duplicate IDs that are referenced by other elements. */
  /* *************************************************************** */
  if (option.checks.DUPLICATE_ID) {
    // Look for duplicate IDs within each DOM.
    const doms = document.querySelectorAll('body, [data-sa11y-has-shadow-root]');
    doms.forEach((dom) => {
      const allIds = new Set();
      const findDuplicateIds = (ids, withinDOM) => {
        ids.forEach(($el) => {
          const { id } = $el;

          // Ignore empty IDs.
          if (typeof id !== 'string' || id.trim().length === 0) {
            return;
          }

          // Only flag duplicate IDs being referenced by same-page links, aria or a label.
          // Reference: https://accessibilityinsights.io/info-examples/web/duplicate-id-aria/
          if (id && !allIds.has(id)) {
            allIds.add(id);
          } else {
            const ariaReference = Array.from(
              withinDOM.querySelectorAll(`
                a[href*="${id}"],
                label[for*="${id}"],
                [aria-labelledby*="${id}"],
                [aria-controls*="${id}"],
                [aria-owns*="${id}"]`),
            );
            if (ariaReference.length > 0) {
              results.push({
                element: $el,
                type: option.checks.DUPLICATE_ID.type || 'error',
                content: Lang.sprintf(option.checks.DUPLICATE_ID.content || 'DUPLICATE_ID', id),
                dismiss: prepareDismissal(`DUPLICATEID${id}${$el.textContent}`),
                dismissAll: option.checks.DUPLICATE_ID.dismissAll ? 'DUPLICATE_ID' : false,
                developer: option.checks.DUPLICATE_ID.developer || true,
              });
            }
          }
        });
      };

      // Look for duplicate IDs within shadow DOMs.
      if (dom.shadowRoot) {
        const shadowRootIds = Array.from(
          dom.shadowRoot.querySelectorAll(`[id]:not(${Constants.Exclusions.Container})`),
        );
        findDuplicateIds(shadowRootIds, dom.shadowRoot);
      }

      // Look for duplicates IDs in document body.
      const regularIds = Array.from(
        dom.querySelectorAll(`[id]:not(${Constants.Exclusions.Container})`),
      );
      findDuplicateIds(regularIds, dom);
    });
  }

  /* ********************************************* */
  /*  Buttons must have an accessible name.        */
  /* ********************************************* */
  if (option.checks.BTN_EMPTY || option.checks.BTN_EMPTY_LABELLEDBY || option.checks.BTN_LABEL || option.checks.HIDDEN_FOCUSABLE || option.checks.LABEL_IN_NAME) {
    Elements.Found.Buttons.forEach(($el) => {
      const accName = computeAccessibleName($el);
      const buttonText = accName.replace(/'|"|-|\.|\s+/g, '').toLowerCase();

      // Dismissal key.
      const key = prepareDismissal(`BTN${$el.tagName + $el.id + $el.className + accName}`);

      // Has ARIA
      const hasAria = $el.querySelector(':scope [aria-labelledby], :scope [aria-label]') || $el.getAttribute('aria-labelledby') || $el.getAttribute('aria-label');
      const hasAriaLabelledby = $el.querySelector(':scope [aria-labelledby]') || $el.getAttribute('aria-labelledby');
      const ariaHidden = $el.getAttribute('aria-hidden') === 'true';
      const negativeTabindex = $el.getAttribute('tabindex') === '-1';

      // Button has aria-hidden but is still focusable.
      if (ariaHidden) {
        if (!negativeTabindex) {
          if (option.checks.HIDDEN_FOCUSABLE) {
            results.push({
              element: $el,
              type: option.checks.HIDDEN_FOCUSABLE.type || 'error',
              content: Lang.sprintf(option.checks.HIDDEN_FOCUSABLE.content || 'HIDDEN_FOCUSABLE'),
              dismiss: key,
              dismissAll: option.checks.HIDDEN_FOCUSABLE.dismissAll ? 'BTN_HIDDEN_FOCUSABLE' : false,
              developer: option.checks.HIDDEN_FOCUSABLE.developer || true,
            });
          }
        }
        return;
      }

      // Button doesn't have an accessible name.
      if (buttonText.length === 0) {
        if (option.checks.BTN_EMPTY_LABELLEDBY && hasAriaLabelledby) {
          results.push({
            element: $el,
            type: option.checks.BTN_EMPTY_LABELLEDBY.type || 'error',
            content: option.checks.BTN_EMPTY_LABELLEDBY.content
              ? Lang.sprintf(option.checks.BTN_EMPTY_LABELLEDBY.content)
              : `${Lang.sprintf('BTN_EMPTY_LABELLEDBY')} ${Lang.sprintf('BTN_TIP')}`,
            dismiss: prepareDismissal(key),
            dismissAll: option.checks.BTN_EMPTY_LABELLEDBY.dismissAll ? 'BTN_EMPTY_LABELLEDBY' : false,
            developer: option.checks.BTN_EMPTY_LABELLEDBY.developer || true,
          });
        } else if (option.checks.BTN_EMPTY) {
          results.push({
            element: $el,
            type: option.checks.BTN_EMPTY.type || 'error',
            content: option.checks.BTN_EMPTY.content
              ? Lang.sprintf(option.checks.BTN_EMPTY.content)
              : `${Lang.sprintf('BTN_EMPTY')} ${Lang.sprintf('BTN_TIP')}`,
            dismiss: key,
            dismissAll: option.checks.BTN_EMPTY.dismissAll ? 'BTN_EMPTY' : false,
            developer: option.checks.BTN_EMPTY.developer || true,
          });
        }
        return;
      }

      // Button must have visible label as part of their accessible name.
      const isVisibleTextInAccessibleName$1 = isVisibleTextInAccessibleName($el);
      if (option.checks.LABEL_IN_NAME && hasAria && isVisibleTextInAccessibleName$1) {
        const sanitizedText = sanitizeHTML(accName);
        results.push({
          element: $el,
          type: option.checks.LABEL_IN_NAME.type || 'warning',
          content: option.checks.LABEL_IN_NAME.content
            ? Lang.sprintf(option.checks.LABEL_IN_NAME.content, sanitizedText)
            : `${Lang.sprintf('LABEL_IN_NAME', sanitizedText)} ${Lang.sprintf('ACC_NAME_TIP')}`,
          dismiss: key,
          dismissAll: option.checks.LABEL_IN_NAME.dismissAll ? 'BTN_LABEL_IN_NAME' : false,
          developer: option.checks.LABEL_IN_NAME.developer || true,
        });
        return;
      }

      // Has "button" in the accessible name.
      if (option.checks.BTN_ROLE_IN_NAME && accName.includes(Lang._('BTN'))) {
        results.push({
          element: $el,
          type: option.checks.BTN_ROLE_IN_NAME.type || 'warning',
          content: option.checks.BTN_ROLE_IN_NAME.content
            ? Lang.sprintf(option.checks.BTN_ROLE_IN_NAME.content)
            : `${Lang.sprintf('BTN_ROLE_IN_NAME')} ${Lang.sprintf('BTN_TIP')}`,
          dismiss: key,
          dismissAll: option.checks.BTN_ROLE_IN_NAME.dismissAll ? 'BTN_ROLE_IN_NAME' : false,
          developer: option.checks.BTN_ROLE_IN_NAME.developer || true,
        });
      }
    });
  }

  /* ********************************************************** */
  /* <li> elements must be contained in a <ul>/<ol>/<menu>.     */
  /* ********************************************************** */
  if (option.checks.UNCONTAINED_LI) {
    Elements.Found.Lists.forEach(($el) => {
      if (!$el.closest('ul, ol, menu')) {
        results.push({
          element: $el,
          type: option.checks.UNCONTAINED_LI.type || 'error',
          content: Lang.sprintf(option.checks.UNCONTAINED_LI.content || 'UNCONTAINED_LI'),
          dismiss: prepareDismissal(`UNCONTAINEDLI${$el.textContent}`),
          dismissAll: option.checks.UNCONTAINED_LI.dismissAll ? 'UNCONTAINED_LI' : false,
          developer: option.checks.UNCONTAINED_LI.developer || true,
        });
      }
    });
  }

  /* ****************************************** */
  /*  No tabindex values greater than 0.        */
  /* ****************************************** */
  if (option.checks.TABINDEX_ATTR) {
    Elements.Found.TabIndex.forEach(($el) => {
      results.push({
        element: $el,
        type: option.checks.TABINDEX_ATTR.type || 'error',
        content: Lang.sprintf(option.checks.TABINDEX_ATTR.content || 'TABINDEX_ATTR'),
        dismiss: prepareDismissal(`TABINDEX${$el.tagName + $el.id + $el.className}`),
        dismissAll: option.checks.TABINDEX_ATTR.dismissAll ? 'TABINDEX_ATTR' : false,
        developer: option.checks.TABINDEX_ATTR.developer || true,
      });
    });
  }

  return results;
}

function checkCustom(results) {
  /* Add custom rulesets here.

  // Example #1
  const $checkAnnouncement = find('.sa11y-announcement-component', 'root');
  if ($checkAnnouncement.length > 1) {
    for (let i = 1; i < $checkAnnouncement.length; i++) {
      const key = Utils.prepareDismissal($checkAnnouncement[i].textContent);
      results.push({
        element: $checkAnnouncement[i],
        type: 'warning',
        content: 'More than one Announcement component found! The Announcement component should be used strategically and sparingly. It should be used to get attention or indicate that something is important. Misuse of this component makes it less effective or impactful. Secondly, this component is semantically labeled as an Announcement for people who use screen readers.',
        inline: false,
        position: 'beforebegin',
        dismiss: key,
        developer: false,
      });
    }
  }

  // Example #2
  const $checkAccordions = find('.sa11y-accordion-example', 'root');
  $checkAccordions.forEach(($el) => {
    const checkForm = $el.querySelector('form');
    if (!!checkForm && checkForm.length) {
      results.push({
        element: $el,
        type: 'error',
        content: 'Do <strong>not nest forms</strong> within the Accordion component. If the form contains validation issues, a person may not see the form feedback since the accordion panel goes back to its original closed state.',
        inline: false,
        position: 'beforebegin',
        developer: false,
      });
    }
  }); */

  return results;
}

// Options, language object, constants, and utilities.

class Sa11y {
  constructor(options) {
    const option = {
      ...defaultOptions,
      ...options,
      checks: {
        ...defaultOptions.checks,
        ...options.checks,
      },
    };

    /* *********************************************************** */
    /*  Initialize: Start your engines.                            */
    /* *********************************************************** */
    this.initialize = () => {
      // Do not run Sa11y if any supplied elements detected on page.
      const checkRunPrevent = () => {
        const { doNotRun } = option;
        return doNotRun.trim().length > 0 ? document.querySelector(doNotRun) : false;
      };

      if (!checkRunPrevent()) {
        // Register web components
        customElements.define('sa11y-heading-label', HeadingLabel);
        customElements.define('sa11y-heading-anchor', HeadingAnchor);
        customElements.define('sa11y-annotation', Annotations);
        customElements.define('sa11y-tooltips', AnnotationTooltips);
        customElements.define('sa11y-panel-tooltips', PanelTooltips);
        customElements.define('sa11y-control-panel', ControlPanel);
        customElements.define('sa11y-console-error', ConsoleErrors);

        // Initialize global constants and exclusions.
        Constants.initializeGlobal(option);
        Constants.initializeReadability(option);
        Constants.initializeExclusions(option);

        // Make "Developer checks" on by default or if toggle switch is visually hidden.
        if (option.developerChecksOnByDefault) {
          if (store.getItem('sa11y-developer') === null || option.checkAllHideToggles) {
            store.setItem('sa11y-developer', 'On');
          }
        }

        // Once document has fully loaded.
        documentLoadingCheck(() => {
          if (option.headless) {
            // Headless: Perform all checks without loading UI.
            this.checkAll();
            store.removeItem('sa11y-dismissed');
          } else {
            // Save panel position preference if not already set or if position changes via props.
            const rememberPosition = store.getItem('sa11y-position');
            const { panelPosition } = option;
            if (option.showMovePanelToggle
              && (!rememberPosition || !rememberPosition.includes('top') !== !panelPosition.includes('top'))) {
              store.setItem('sa11y-position', panelPosition);
            }

            // Build control panel.
            const controlPanel = new ControlPanel();
            document.body.appendChild(controlPanel);

            // Initialize control panel.
            settingsPanelToggles(this.checkAll, this.resetAll);
            initializePanelToggles();
            addColourFilters();

            // Detect page changes (for SPAs).
            detectPageChanges(
              option.detectSPArouting,
              this.checkAll,
              this.resetAll,
            );

            // Initialize panel tooltips.
            this.panelTooltips = new PanelTooltips();
            document.body.appendChild(this.panelTooltips);

            // Disable toggle initially.
            Constants.Panel.toggle.disabled = false;

            // Initial check once page is done loading.
            setTimeout(() => {
              this.resetAll(); // Make sure there's a clean slate.
              this.checkAll();
            }, option.delayCheck);

            // Disable button if user needs to wait longer than 700ms.
            if (option.delayCheck >= 700) {
              Constants.Panel.toggle.disabled = true;
            }

            // Initialize main toggle
            mainToggle(this.checkAll, this.resetAll);
          }
        });
      }
    };

    /* *********************************************************** */
    /*  Check All: Where all the magic happens.                    */
    /* *********************************************************** */
    this.checkAll = async (
      desiredRoot = option.checkRoot,
      desiredReadabilityRoot = option.readabilityRoot,
    ) => {
      try {
        this.results = [];
        this.headingOutline = [];
        this.imageOutline = [];
        this.errorCount = 0;
        this.warningCount = 0;
        this.customChecksRunning = false;

        // Initialize root areas to check.
        const root = document.querySelector(desiredRoot);
        if (!root && option.headless === false) {
          createAlert(`${Lang.sprintf('MISSING_ROOT', desiredRoot)}`);
        }
        Constants.initializeRoot(desiredRoot, desiredReadabilityRoot);

        // Find all web components on the page.
        findShadowComponents(option);

        // Find and cache elements.
        Elements.initializeElements(option);

        // Ruleset checks
        checkHeaders(this.results, option, this.headingOutline);
        checkLinkText(this.results, option);
        checkImages(this.results, option);
        checkLabels(this.results, option);
        checkQA(this.results, option);
        checkDeveloper(this.results, option);
        if (option.embeddedContentPlugin) checkEmbeddedContent(this.results, option);
        if (option.contrastPlugin) checkContrast(this.results, option);
        if (option.readabilityPlugin) checkReadability();

        // Get all images from results object for Image Outline.
        this.imageResults = this.results.filter((issue, index, self) => {
          const tagName = issue.element?.tagName;
          const outerHTML = issue.element?.outerHTML;
          // Filter out duplicates based element's HTML.
          return tagName === 'IMG' && self.findIndex((other) => other.element?.outerHTML === outerHTML) === index;
        });

        /* Custom checks */
        if (option.customChecks === true) {
          // Option 1: Provide via sa11y-custom-checks.js
          checkCustom(this.results);
        } else if (typeof option.customChecks === 'object') {
          // Option 2: Provide as an object when instantiated.
          this.results.push(...option.customChecks);
        } else if (option.customChecks === 'listen') {
          // Option 3: Provide via event listener. Yoinked from Editoria11y!
          this.customChecksRunning = true;
          this.customChecksFinished = 0;
          document.addEventListener('sa11y-resume', () => {
            this.customChecksFinished += 1;
            if (this.customChecksFinished === 1) {
              this.customChecksRunning = false;
              this.updateResults();
            }
          });
          window.setTimeout(() => {
            if (this.customChecksRunning === true) {
              this.customChecksRunning = false;
              this.updateResults();
              throw Error('Sa11y: No custom checks were returned.');
            }
          }, option.delayCustomCheck);
          window.setTimeout(() => {
            const customChecks = new CustomEvent('sa11y-custom-checks');
            document.dispatchEvent(customChecks);
          }, 0);
        }

        // No custom checks running.
        if (!this.customChecksRunning) this.updateResults();
      } catch (error) {
        const consoleErrors = new ConsoleErrors(error);
        document.body.appendChild(consoleErrors);
        throw Error(error);
      }
    };

    this.updateResults = () => {
      // Filter out heading issues that are outside of the target root.
      this.results = this.results.filter((heading) => heading.isWithinRoot !== false);

      // Filter out "Developer checks" if toggled off.
      if (store.getItem('sa11y-developer') === 'Off' || store.getItem('sa11y-developer') === null) {
        this.results = this.results.filter((issue) => issue.developer !== true);
      }

      // Generate HTML path, and optionally CSS selector path of element.
      this.results.forEach(($el, id) => {
        const cssPath = option.selectorPath ? generateSelectorPath($el.element) : '';
        const htmlPath = $el.element?.outerHTML.replace(/\s{2,}/g, ' ').trim() || '';
        Object.assign($el, { htmlPath, cssPath, id });
      });

      if (option.headless === false) {
        // Check for dismissed items and update results array.
        const dismiss = dismissLogic(
          this.results,
          this.panelTooltips,
          this.checkAll,
          this.resetAll,
        );
        this.results = dismiss.updatedResults;
        this.dismissed = dismiss.dismissedIssues;

        // Update count & badge.
        const count = updateCount(
          this.results,
          this.errorCount,
          this.warningCount,
        );
        updateBadge(count.error, count.warning);

        /* If panel is OPENED. */
        if (store.getItem('sa11y-panel') === 'Opened') {
          // Paint the page with annotations.
          this.results.forEach((issue) => {
            Object.assign(issue);
            annotate(issue, option);
          });

          // After annotations are painted, find & cache.
          Elements.initializeAnnotations();

          // Initialize tooltips
          const tooltipComponent = new AnnotationTooltips();
          document.body.appendChild(tooltipComponent);

          dismissButtons(
            this.results,
            this.dismissed,
            this.checkAll,
            this.resetAll,
          );

          generatePageOutline(
            this.dismissed,
            this.headingOutline,
            option,
          );

          if (option.showImageOutline) {
            generateImageOutline(this.dismissed, this.imageResults, option);
          }

          updatePanel(
            dismiss.dismissCount,
            count.error,
            count.warning,
          );

          // Initialize Skip to Issue button.
          skipToIssue(this.results);

          // Initialize Export Results plugin.
          if (option.exportResultsPlugin) {
            exportResults(this.results, dismiss.dismissedResults);
          }

          // Page issues: add gradient if scrollable list.
          isScrollable(Constants.Panel.pageIssuesList, Constants.Panel.pageIssuesContent);

          // Extras
          detectOverflow(option.ignoreHiddenOverflow);
          nudge();
        }

        // Make sure toggle isn't disabled after checking.
        Constants.Panel.toggle.disabled = false;
      }

      // Dispatch custom event that stores the results array.
      window.sa11yCheckComplete = null;
      const event = new CustomEvent('sa11y-check-complete', {
        detail: {
          results: this.results,
          page: window.location.pathname,
        },
      });
      window.sa11yCheckComplete = event.detail;
      document.dispatchEvent(event);
    };

    /* *********************************************************** */
    /*  Reset all: Clears everything and resets the panel.         */
    /* *********************************************************** */
    this.resetAll = (restartPanel = true) => {
      Constants.Global.html.removeAttribute('data-sa11y-active');

      // Remove from page.
      remove([
        'sa11y-annotation',
        'sa11y-heading-label',
        'sa11y-heading-anchor',
        'sa11y-tooltips',
        '[data-sa11y-readability-period]',
        '[data-sa11y-clone-image-text]',
      ], 'document');

      // Reset all data attributes.
      resetAttributes([
        'data-sa11y-parent',
        'data-sa11y-error',
        'data-sa11y-warning',
        'data-sa11y-good',
        'data-sa11y-error-inline',
        'data-sa11y-warning-inline',
        'data-sa11y-overflow',
        'data-sa11y-pulse-border',
        'data-sa11y-filter',
        'data-sa11y-has-shadow-root',
      ], 'document');

      // Remove from panel.
      Constants.Panel.outlineList.innerHTML = '';
      if (option.showImageOutline) Constants.Panel.imagesList.innerHTML = '';
      Constants.Panel.pageIssuesList.innerHTML = '';
      Constants.Panel.readabilityInfo.innerHTML = '';
      Constants.Panel.readabilityDetails.innerHTML = '';
      Constants.Panel.panel.classList.remove('has-page-issues');
      Constants.Panel.pageIssues.classList.remove('active');
      Constants.Panel.settingsContent.classList.remove('hide-settings-border');
      Constants.Panel.panel.querySelector('#readability-alert')?.remove();

      // Remove any active alerts from panel.
      removeAlert();

      // Remove EventListeners.
      removeSkipBtnListeners();
      removeExportListeners();
      removeDismissListeners();

      // Reset colour filters.
      resetColourFilters();

      // Main panel warning and error count.
      while (Constants.Panel.status.firstChild) Constants.Panel.status.removeChild(Constants.Panel.status.firstChild);

      // Remove data attribute from shadow root elements.
      document.querySelectorAll('[data-sa11y-has-shadow-root]').forEach((el) => {
        el.shadowRoot.querySelectorAll('style.sa11y-css-utilities').forEach((style) => style.remove());
        el.removeAttribute('data-sa11y-has-shadow-root');
      });

      if (restartPanel) {
        Constants.Panel.panel.classList.remove('active');
      }
    };

    /* *********************************************************** */
    /*  Methods: Useful utilities for integrations.                */
    /* *********************************************************** */

    // Method: temporarily disable toggle.
    this.disabled = () => {
      setTimeout(() => {
        if (store.getItem('sa11y-panel') === 'Opened') {
          Constants.Panel.toggle.click();
        }
        Constants.Panel.toggle.disabled = true;
      }, option.delayCheck + 10);
    };

    // Method: re-enable toggle.
    this.enabled = () => {
      if (Constants.Panel.toggle) {
        Constants.Panel.toggle.disabled = false;
      }
    };

    // Method: find utility.
    this.find = (selector, desiredRoot, exclude) => find(selector, desiredRoot, exclude);

    // Method: prepare dismissal keys.
    this.prepareDismissal = (string) => prepareDismissal(string);

    // Method: sanitize HTML.
    this.sanitizeHTML = (string) => sanitizeHTML(string);

    /* *********************************************************** */
    /*  Initialize Sa11y.                                          */
    /* *********************************************************** */
    this.initialize();
  }
}

export { Lang, Sa11y };
