
/*!
  * Sa11y, the accessibility quality assurance assistant.
  * @version 4.0.0
  * @author Adam Chaboryk
  * @license GPL-2.0-or-later
  * @copyright © 2020 - 2024 Toronto Metropolitan University.
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
  contrastIgnore: '.sr-only, [role="menu"] *',
  outlineIgnore: '',
  headerIgnore: '',
  headerIgnoreSpan: '',
  headerIgnoreStrings: '',
  imageIgnore: '',
  linkIgnore: 'nav *, [role="navigation"] *',
  linkIgnoreSpan: '',
  linkIgnoreStrings: '',

  // Other features
  aboutContent: '',
  delayCheck: 0,
  delayCustomCheck: 500,
  showHinPageOutline: false,
  showTitleInPageOutline: true,
  showImageOutline: true,
  showGoodImageButton: true,
  showGoodLinkButton: true,
  editImageURLofCMS: '',
  relativePathImageSRC: '',
  relativePathImageID: '',
  detectSPArouting: false,
  doNotRun: '',
  dismissAnnotations: true,
  dismissAll: true,
  headless: false,
  selectorPath: false,
  shadowComponents: '',
  autoDetectShadowComponents: false,
  panelPosition: 'right',

  // Readability
  readabilityPlugin: true,
  readabilityRoot: 'body',
  readabilityIgnore: '',

  // Other plugins
  contrastPlugin: true,
  contrastAPCA: false,
  linksAdvancedPlugin: true,
  formLabelsPlugin: true,
  embeddedContentPlugin: true,
  developerPlugin: true,
  colourFilterPlugin: true,
  customChecks: false,
  checkAllHideToggles: false,
  developerChecksOnByDefault: false,
  exportResultsPlugin: false,

  // Customizing checks.
  altTextMaxCharLength: 250,
  susAltStopWords: '',
  linkStopWords: '',
  extraPlaceholderStopWords: '',
  headingMaxCharLength: 170,

  // QA ruleset customizations.
  URLTextMaxCharLength: 40,
  linksToFlag: '',
  documentLinks: 'a[href$=".doc"], a[href$=".docx"], a[href*=".doc?"], a[href*=".docx?"], a[href$=".ppt"], a[href$=".pptx"], a[href*=".ppt?"], a[href*=".pptx?"], a[href^="https://drive.google.com/file"], a[href^="https://docs.google."], a[href^="https://sway."]',

  // Embedded content sources
  videoContent: 'youtube.com, vimeo.com, yuja.com, panopto.com',
  audioContent: 'soundcloud.com, simplecast.com, podbean.com, buzzsprout.com, blubrry.com, transistor.fm, fusebox.fm, libsyn.com',
  dataVizContent: 'datastudio, tableau, lookerstudio, powerbi, qlik',

  // All checks.
  checks: {
    // Heading checks.
    HEADING_SKIPPED_LEVEL: true,
    HEADING_EMPTY_WITH_IMAGE: true,
    HEADING_EMPTY: true,
    HEADING_FIRST: true,
    HEADING_LONG: true,
    HEADING_MISSING_ONE: true,

    // Image checks.
    MISSING_ALT_LINK: true,
    MISSING_ALT_LINK_HAS_TEXT: true,
    MISSING_ALT: true,
    IMAGE_DECORATIVE_CAROUSEL: true,
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
    LINK_IMAGE_LONG_ALT: true,
    IMAGE_ALT_TOO_LONG: true,
    LINK_IMAGE_ALT: true,
    LINK_IMAGE_ALT_AND_TEXT: true,
    IMAGE_FIGURE_DUPLICATE_ALT: true,
    IMAGE_PASS: true,

    // Link checks.
    LINK_EMPTY_LABELLEDBY: true,
    LINK_EMPTY_NO_LABEL: true,
    LINK_STOPWORD: true,
    LINK_BEST_PRACTICES: true,
    LINK_DOI: {
      dismissAll: true,
    },
    LINK_URL: true,
    LINK_LABEL: true,
    LINK_EMPTY: true,
    LINK_IDENTICAL_NAME: {
      dismissAll: true,
    },
    LINK_NEW_TAB: {
      dismissAll: true,
    },
    LINK_FILE_EXT: true,

    // Form Labels checks.
    LABELS_MISSING_IMAGE_INPUT: true,
    LABELS_INPUT_RESET: true,
    LABELS_MISSING_LABEL: true,
    LABELS_ARIA_LABEL_INPUT: true,
    LABELS_NO_FOR_ATTRIBUTE: true,

    // Embedded Content checks.
    EMBED_AUDIO: true,
    EMBED_VIDEO: true,
    EMBED_DATA_VIZ: true,
    EMBED_UNFOCUSABLE: true,
    EMBED_MISSING_TITLE: true,
    EMBED_GENERAL: true,

    // Quality Assurance checks.
    QA_BAD_LINK: true,
    QA_STRONG_ITALICS: true,
    QA_IN_PAGE_LINK: true,
    QA_DOCUMENT: {
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
    QA_NESTED_COMPONENTS: true,
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

    // Contrast checks.
    CONTRAST_WARNING: {
      dismissAll: true,
    },
    CONTRAST_INPUT: true,
    CONTRAST_ERROR: true,
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
        Root.Readability = Root.areaToCheck;
        // eslint-disable-next-line no-console
        console.error(`Sa11y configuration error: The selector '${desiredReadabilityRoot}' used for the property 'readabilityRoot' does not exist. '${Root.areaToCheck.tagName}' was used as a fallback.`);
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

    // Toggleable plugins
    Global.developerPlugin = option.developerPlugin;
    Global.colourFilterPlugin = option.colourFilterPlugin;
    Global.checkAllHideToggles = option.checkAllHideToggles;
    Global.exportResultsPlugin = option.exportResultsPlugin;
    Global.showImageOutline = option.showImageOutline;
    Global.editImageURLofCMS = option.editImageURLofCMS;
    Global.relativePathImageSRC = option.relativePathImageSRC;
    Global.relativePathImageID = option.relativePathImageID;

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
    // Global elements to exclude.
    const exclusions = 'style, script, noscript, sa11y-control-panel, sa11y-dismiss-tooltip';

    // Main container.
    if (option.containerIgnore) {
      const containerSelectors = option.containerIgnore.split(',').map(($el) => `${$el} *, ${$el}`);
      Exclusions.Container = `#wpadminbar *, #sa11y-colour-filters, #sa11y-colour-filters *, ${containerSelectors.join(', ')}`;
    } else {
      Exclusions.Container = '#wpadminbar *, #sa11y-colour-filters, #sa11y-colour-filters *';
    }

    // Contrast exclusions
    Exclusions.Contrast = `link, hr, select option, video track, ${exclusions}`;
    if (option.contrastIgnore) {
      Exclusions.Contrast = `${option.contrastIgnore}, ${Exclusions.Contrast}`;
    }

    // Ignore specific regions for readability module.
    Exclusions.Readability = `nav li, [role="navigation"] li, ${exclusions}`;
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
    initializeEmbeddedContent,
    EmbeddedContent,
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
  const shadow = (shadowComponents) ? ', [data-sa11y-has-shadow-root]' : '';

  const exclusions = Constants.Exclusions.Container;
  const additional = (exclude !== undefined) ? `, ${exclude}` : '';

  /* Logic yoinked from Editoria11y */
  // 1. Elements array includes web components in the selector to be used as a placeholder.
  const elements = Array.from(root.querySelectorAll(`:is(${selector}${shadow}):not(${exclusions}${additional})`));
  if (shadowComponents.length) {
    // 2. Dive into the each shadow root and collect an array of its results.
    const shadowFind = [];
    // Remove first comma and whitespace.
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
  // 4. Return the cleaned up array.
  return elements;
}

/* eslint-disable no-use-before-define */

/* Get text content of pseudo elements. */
const wrapPseudoContent = (element, string) => {
  const pseudo = [];
  pseudo[0] = window.getComputedStyle(element, ':before').getPropertyValue('content');
  pseudo[1] = window.getComputedStyle(element, ':after').getPropertyValue('content');
  pseudo[0] = pseudo[0] === 'none' ? '' : pseudo[0].replace(/^"(.*)"$/, '$1');
  pseudo[1] = pseudo[1] === 'none' ? '' : pseudo[1].replace(/^"(.*)"$/, '$1');
  return ` ${pseudo[0]}${string}${pseudo[1]}`;
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
    const target = labelledBy.split(/\s+/);
    if (target.length > 0) {
      let returnText = '';
      target.forEach((x) => {
        const targetSelector = document.querySelector(`#${CSS.escape(x)}`);
        returnText += (!targetSelector) ? '' : `${computeAccessibleName(targetSelector, '', 1)}`;
      });
      return returnText;
    }
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
const computeAccessibleName = (element, exclusions, recursing = 0) => {
  // Return immediately if there is an aria label.
  const hasAria = computeAriaLabel(element, recursing);
  if (hasAria !== 'noAria') {
    return hasAria;
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

  const alwaysExclude = 'noscript, style, script, video, audio';
  const exclude = element.querySelectorAll(exclusions ? `${exclusions}, ${alwaysExclude}` : alwaysExclude);

  while (treeWalker.nextNode() && shouldContinueWalker) {
    count += 1;

    // Exclusions.
    const currentNodeMatchesExclude = Array.from(exclude).some((excludedNode) => excludedNode.contains(treeWalker.currentNode));

    if (currentNodeMatchesExclude) ; else if (treeWalker.currentNode.nodeType === Node.TEXT_NODE) {
      computedText += ` ${treeWalker.currentNode.nodeValue}`;
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
 * Retrieves the text content of an HTML element and removes extra whitespaces and line breaks.
 * @param {HTMLElement} element The HTML element to retrieve the text content from.
 * @returns {string} The text content of the HTML element with extra whitespaces and line breaks removed.
 */
function getText(element) {
  return element.textContent.replace(/[\r\n]+/g, '').replace(/\s+/g, ' ').trim();
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
 * Creates a clone of an element while ignoring specified elements or elements matching a selector.
 * @param {Element} element The element to clone.
 * @param {string} selector The selector to match elements to be excluded from the clone. Optional.
 * @returns {Element} The cloned element with excluded elements removed.
 */
function fnIgnore(element, selector) {
  const defaultIgnored = 'noscript, script, style';
  const ignore = (!selector) ? defaultIgnored : `${defaultIgnored}, ${selector}`;
  const clone = element.cloneNode(true);
  const exclude = Array.from(clone.querySelectorAll(ignore));
  exclude.forEach((c) => {
    c.parentElement.removeChild(c);
  });
  return clone;
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
  const focusable = element.querySelectorAll('a[href]:not([disabled]), button:not([disabled])');
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
 * @description This function clears the content of the alert element and removes CSS classes 'active' from the main alert element, and 'panel-alert-preview' from the alert preview element.
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
 * Generate an HTML preview for an issue if it's an image, iframe, audio or video element. Otherwise, return escaped HTML within <code> tags. Used for Skip to Issue panel alerts and HTML page export.
 * @param {Object} issueObject The issue object.
 * @returns {html} Returns HTML.
 */
function generateElementPreview(issueObject) {
  const issueElement = issueObject.element;
  const htmlPath = `<pre><code>${escapeHTML(issueObject.htmlPath)}</code></pre>`;

  const tag = {
    IMG: (element) => {
      const anchor = element.closest('a[href]');
      const alt = element.alt ? `alt="${sanitizeHTML(element.alt)}"` : 'alt';
      const imgSrc = element.src;

      // Account for lazy loading libraries that use 'data-src' attribute.
      const dataSrc = element.getAttribute('data-src');
      const source = (dataSrc && dataSrc.length > 3) ? dataSrc : imgSrc;

      if (imgSrc) {
        return anchor
          ? `<a href="${anchor.href}" rel="noopener noreferrer"><img src="${source}" ${alt}/></a>`
          : `<img src="${source}" ${alt}/>`;
      }
      return htmlPath;
    },
    IFRAME: (element) => {
      const source = element.src;
      const title = element.title ? element.title : '';
      const ariaLabelAttr = element.getAttribute('aria-label');
      const ariaLabel = ariaLabelAttr || '';
      if (source) {
        const iframeTitle = ariaLabel || title;
        return `<iframe src="${source}" aria-label="${sanitizeHTML(iframeTitle)}"></iframe>`;
      }
      return htmlPath;
    },
    AUDIO: () => issueObject.htmlPath,
    VIDEO: () => issueObject.htmlPath,
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

  // Ignore emojis
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
 * Truncate string.
 * @param {*} string The string to truncate.
 * @param {*} maxLength Desired max length of string.
 * @returns Truncated string.
 */
function truncateString(string, maxLength) {
  return string.length > maxLength ? `${string.substring(0, maxLength)}...` : string;
}

/**
 * Standardize the href attribute of a link by removing any trailing slashes and stripping the protocol (http, https) and 'www.' prefix. Used to minimize false positives for link check module.
 * @param {HTMLElement} $el - The element from which to retrieve the href attribute.
 * @returns {string} - The standardized href.
 */
function standardizeHref($el) {
  let href = $el.getAttribute('href');
  // Remove trailing slash if it exists
  if (href.endsWith('/')) {
    href = href.slice(0, -1);
  }
  // Remove protocol and www., without affecting subdomains.
  return href.replace(/^https?:\/\/(www\.)?/, '');
}

const Elements = (function myElements() {
  const Found = {};
  function initializeElements(option) {
    // Main selectors
    Found.Images = find(
      'img',
      'root',
      Constants.Exclusions.Images,
    );

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

    Found.Links = find(
      'a[href]:not(a[role="button"])',
      'root',
      Constants.Exclusions.Links,
    );

    Found.Buttons = find(
      'button, [role="button"]',
      'root',
      Constants.Exclusions.Container,
    );

    Found.Inputs = find(
      'input, select, textarea',
      'root',
      Constants.Exclusions.Container,
    );

    Found.Contrast = find(
      '*',
      'root',
      Constants.Exclusions.Contrast,
    );

    Found.Labels = find(
      'label',
      'root',
      Constants.Exclusions.Container,
    );

    Found.Readability = find(
      'p, li',
      'readability',
      Constants.Exclusions.Readability,
    );

    // Quality assurance module.
    Found.Paragraphs = find(
      'p:not(table p)',
      'root',
      Constants.Exclusions.Container,
    );

    Found.Lists = find(
      'li',
      'root',
      Constants.Exclusions.Container,
    );

    Found.Spans = find(
      'span',
      'root',
      Constants.Exclusions.Container,
    );

    Found.Blockquotes = find(
      'blockquote',
      'root',
      Constants.Exclusions.Container,
    );

    Found.Tables = find(
      'table:not([role="presentation"])',
      'root',
      Constants.Exclusions.Container,
    );

    Found.StrongItalics = find(
      'strong, em',
      'root',
      Constants.Exclusions.Container,
    );

    Found.Underlines = find(
      'u:not(a[href] u)',
      'root',
      Constants.Exclusions.Container,
    );

    Found.Subscripts = find(
      'sup, sub',
      'root',
      Constants.Exclusions.Container,
    );

    Found.Language = Constants.Global.html.getAttribute('lang');

    Found.CustomErrorLinks = option.linksToFlag ? find(
      option.linksToFlag,
      'root',
      Constants.Exclusions.Container,
    ) : [];

    const nestedSources = option.checks.QA_NESTED_COMPONENTS.sources || '[role="tablist"], details';
    Found.NestedComponents = nestedSources ? find(
      nestedSources,
      'root',
      Constants.Exclusions.Container,
    ) : [];

    Found.UncontainedLi = option.checks.UNCONTAINED_LI ? find(
      'li:not(ul li):not(ol li):not(menu li)',
      'root',
      Constants.Exclusions.Container,
    ) : [];

    Found.TabIndex = find(
      '[tabindex]:not([tabindex="0"], [tabindex^="-"])',
      'root',
      Constants.Exclusions.Container,
    );

    // iFrames
    Found.iframes = find(
      'iframe, audio, video',
      'root',
      Constants.Exclusions.Container,
    );

    Found.Videos = Found.iframes.filter(($el) => $el.matches(Constants.EmbeddedContent.Video));
    Found.Audio = Found.iframes.filter(($el) => $el.matches(Constants.EmbeddedContent.Audio));
    Found.Visualizations = Found.iframes.filter(($el) => $el.matches(Constants.EmbeddedContent.Visualization));
    Found.EmbeddedContent = Found.iframes.filter(($el) => !$el.matches(Constants.EmbeddedContent.All));
  }

  /* ***************** */
  /* Annotations */
  /* ***************** */
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

var styles$1 = "[data-sa11y-overflow]{overflow:auto!important}[data-sa11y-clone-image-text]{display:none!important}[data-sa11y-readability-period]{clip:rect(1px,1px,1px,1px)!important;border:0!important;clip-path:inset(50%)!important;display:block!important;height:1px!important;overflow:hidden!important;padding:0!important;position:absolute!important;white-space:nowrap!important;width:1px!important}[data-sa11y-error]{outline:5px solid var(--sa11y-error)!important}[data-sa11y-warning]{outline:5px solid var(--sa11y-warning)!important}[data-sa11y-good]{outline:5px solid var(--sa11y-good)!important}[data-sa11y-error-inline]{background-color:var(--sa11y-error)!important;box-shadow:0 0 0 4px var(--sa11y-error)!important;color:var(--sa11y-error-text)!important}[data-sa11y-error-inline],[data-sa11y-warning-inline]{border-color:transparent!important;border-radius:.25em!important}[data-sa11y-warning-inline]{background-color:var(--sa11y-warning)!important;box-shadow:0 0 0 4px var(--sa11y-warning)!important;color:var(--sa11y-warning-text)!important}[data-sa11y-pulse-border]{animation:pulse 2s 3;box-shadow:0;outline:5px solid var(--sa11y-focus-color)!important}[data-sa11y-pulse-border]:focus,[data-sa11y-pulse-border]:hover{animation:none}@keyframes pulse{0%{box-shadow:0 0 0 5px var(--sa11y-focus-color)}70%{box-shadow:0 0 0 12px var(--sa11y-pulse-color)}to{box-shadow:0 0 0 5px var(--sa11y-pulse-color)}}@media (prefers-reduced-motion:reduce){[data-sa11y-pulse-border]{animation:none!important}}@media (forced-colors:active){[data-sa11y-error-inline],[data-sa11y-error],[data-sa11y-good],[data-sa11y-pulse-border],[data-sa11y-warning-inline],[data-sa11y-warning]{forced-color-adjust:none}}";

/* ************************************************************ */
/*  Auto-detect shadow DOM or process provided web components.  */
/* ************************************************************ */
const addStylestoShadow = (component) => {
  const style = document.createElement('style');
  style.setAttribute('class', 'sa11y-css-utilities');
  style.textContent = styles$1;
  component.shadowRoot.appendChild(style);
};

function findShadowComponents(option) {
  if (option.autoDetectShadowComponents) {
    // Elements to ignore.
    const ignore = 'sa11y-heading-label, sa11y-heading-anchor, sa11y-annotation, sa11y-tooltips, sa11y-dismiss-tooltip, sa11y-control-panel, #sa11y-colour-filters, #sa11y-colour-filters *, script';

    // Search all elements.
    const root = document.querySelector(option.checkRoot);
    const search = (root) ? Array.from(root.querySelectorAll(`*:not(${ignore})`)) : Array.from(document.body.querySelectorAll(`*:not(${ignore})`));

    // Query for open shadow roots & inject CSS utilities into every shadow DOM.
    search.forEach((component) => {
      if (component.shadowRoot && component.shadowRoot.mode === 'open') {
        component.setAttribute('data-sa11y-has-shadow-root', '');
        addStylestoShadow(component);
      }
    });
  } else if (option.shadowComponents) {
    const providedShadow = document.querySelectorAll(option.shadowComponents);
    providedShadow.forEach((component) => {
      component.setAttribute('data-sa11y-has-shadow-root', '');
      addStylestoShadow(component);
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
  const dismissedResults = [...soloDismissed, ...allDismissed].filter(
    (issue, index, self) => index === self.findIndex((i) => i.id === issue.id),
  );
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
  const dismissContainer = document.querySelector('sa11y-dismiss-tooltip');
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
      const dismissAllSelected = dismissButton.hasAttribute('data-sa11y-dismiss-all') ? issue.dismissAll : '';
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
      if (dismissButton.closest('[data-tippy-root]') !== null) {
        dismissButton.closest('[data-tippy-root]').remove();
      }

      // Async scan upon dismiss.
      resetAll(false);
      await checkAll();
    }
  }
};

/* 2. Restore hidden alerts on the CURRENT page only. */
const restoreDismissButton = async (dismissed, checkAll, resetAll) => {
  const dismissContainer = document.querySelector('sa11y-dismiss-tooltip');
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
/*  Source: https://daltonlens.org/opensource-cvd-simulation/     */
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
            <feColorMatrix values="0.33 0.33 0.33 0 0                           0.33 0.33 0.33 0 0                           0.33 0.33 0.33 0 0                           0 0 0 1 0"></feColorMatrix>
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

var exportResultsStyles = ":root{--font-primary:system-ui,\"Segoe UI\",roboto,helvetica,arial,sans-serif;--font-secondary:Consolas,monaco,\"Ubuntu Mono\",\"Liberation Mono\",\"Courier New\",Courier,monospace;--body-text:#333;--bg-primary:#fff;--bg-secondary:#f6f8fa;--bg-tertiary:#d7d7d7;--link-primary:#004c9b;--red-text:#d30017}@media (prefers-color-scheme:dark){:root{--body-text:#dde8ff;--bg-primary:#0a2051;--bg-secondary:#072c7c;--bg-tertiary:#0041c9;--link-primary:#64b2ff;--red-text:#fe5b5f}}*{margin:0;padding:0}article,aside,nav,ol,p,pre,section,ul{margin-bottom:1rem}body{background:var(--bg-primary);font-family:var(--font-primary);font-size:1rem;line-height:1.5;margin:0 auto;max-width:70ch;overflow-wrap:break-word;overflow-x:hidden;padding:2rem;word-break:break-word}body,h1,h2,h3{color:var(--body-text)}h1,h2,h3{line-height:1;margin-bottom:8px;padding-bottom:2px;padding-top:.875rem}h1{font-size:2.25rem}h2{font-size:1.85rem}h3{font-size:1.55rem}a{color:var(--link-primary)}a:focus,a:hover{text-decoration:none}footer,header{background:var(--bg-secondary);padding:2rem calc(50vw - 50%)}header{border-bottom:1px solid var(--bg-tertiary);margin:-2rem calc(-50vw + 50%) 2rem}footer{border-top:1px solid var(--bg-tertiary);margin:3rem calc(-50vw + 50%) -2rem;text-align:center}header>:first-child{margin-top:0;padding-top:0}header>:last-child{margin-bottom:0}code,kbd,pre,samp{background:var(--bg-secondary);border:1px solid var(--bg-tertiary);border-radius:4px;font-family:var(--font-secondary);font-size:.9rem;padding:3px 6px}pre{display:block;max-width:100%;overflow:auto;padding:1rem 1.4rem}code pre,pre code{background:inherit;border:0;color:inherit;font-size:inherit;margin:0;padding:0}code pre{display:inline}details{background:var(--bg-primary);border:2px solid var(--link-primary);border-radius:4px;padding:.6rem 1rem}summary{cursor:pointer;font-weight:700}details[open]{padding-bottom:.75rem}details[open] summary{margin-bottom:6px}details[open]>:last-child{margin-bottom:0}.two-columns{display:flex}.column{flex:1;margin-inline-end:20px}.count{max-width:220px}.column dl{width:100%}dl{padding-top:10px}dt{font-weight:700}dd{padding-bottom:10px}ol ol,ol ul,ul ol,ul ul{margin-bottom:0}ul li{margin-bottom:.5rem}ol,ul{padding-left:2rem}li li:has(pre,img,iframe,video,audio){list-style:none;margin-top:1rem}ol li:not(li li){margin-bottom:3rem}iframe,img{border:1px solid var(--bg-tertiary);display:block;max-width:50%}audio,video{border:0;display:block}.red-text{color:var(--red-text)}.visually-hidden{clip:rect(1px,1px,1px,1px);border:0;clip-path:inset(50%);display:block;height:1px;overflow:hidden;padding:0;position:absolute;white-space:nowrap;width:1px}";

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
function generateHTMLTemplate(results, dismissResults) {
  const errors = results.filter((issue) => issue.type === 'error');
  const warnings = results.filter((issue) => issue.type === 'warning');
  const count = { error: errors.length, warning: warnings.length, dismiss: dismissResults.length };

  function generateList(issues, type) {
    const types = {
      error: Lang._('ERRORS'),
      warning: Lang._('WARNINGS'),
      dismissed: Lang._('DISMISSED'),
    };
    const heading = types[type];
    const hasIssues = issues.length > 0;

    if (!hasIssues) return '';

    let list = `<h2>${heading}</h2>`;
    let listOpeningTag = '<ol>';
    let listClosingTag = '</ol>';

    if (type === 'dismissed') {
      listOpeningTag = `<details><summary>${Lang.sprintf('PANEL_DISMISS_BUTTON', count.dismiss)}</summary><ol>`;
      listClosingTag = '</details>';
    }

    // Opening tag
    list += listOpeningTag;

    issues.forEach((issue) => {
      let elementPreview = '';
      if (issue.element) {
        const allowedTags = ['IMG', 'IFRAME', 'AUDIO', 'VIDEO'];
        if (allowedTags.includes(issue.element.tagName)) {
          elementPreview = `
              <li>
                <strong>${Lang._('PREVIEW')}:</strong>
                ${generateElementPreview(issue)}
              </li>
              <li>
                <strong>${Lang._('ELEMENT')}:</strong>
                <pre><code>${escapeHTML(issue.htmlPath)}</code></pre>
              </li>`;
        } else {
          elementPreview = `
              <li>
                <strong>${Lang._('ELEMENT')}:</strong>
                <pre><code>${escapeHTML(issue.htmlPath)}</code></pre>
              </li>`;
        }
      }
      const cssPath = issue.cssPath
        ? `<li>
            <strong>${Lang._('PATH')}:</strong>
            <pre><code>${issue.cssPath}</code></pre>
          </li>` : '';

      list += `<li>
                <p>${issue.content.replace('<hr aria-hidden="true">', ' | ')}</p>
                <ul>${elementPreview}${cssPath}</ul>
              </li>`;
    });

    // Closing tag.
    list += listClosingTag;
    return list;
  }

  const errorsList = generateList(errors, 'error');
  const warningList = generateList(warnings, 'warning');
  const dismissedList = generateList(dismissResults, 'dismissed');

  // Meta information.
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
        ${errorsList}
        ${warningList}
        ${dismissedList}
        <footer>
          <p>${Lang.sprintf('GENERATED', tool)}</p>
        </footer>
      </body>
      </html>
    `;
  return htmlTemplate;
}

/* HTML Blob */
function downloadHTMLTemplate(results, dismissResults) {
  const htmlContent = generateHTMLTemplate(results, dismissResults);
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

  // Create blob
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

  // Remove blob
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
    exportHTMLHandler = () => {
      downloadHTMLTemplate(results, dismissResults);
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

var styles = ":host{background:var(--sa11y-panel-bg);border-top:5px solid var(--sa11y-panel-bg-splitter);bottom:0;display:block;height:-moz-fit-content;height:fit-content;left:0;position:fixed;right:0;width:100%;z-index:999999}*{-webkit-font-smoothing:auto!important;color:var(--sa11y-panel-primary);font-family:var(--sa11y-font-face)!important;font-size:var(--sa11y-normal-text);line-height:22px!important}#dialog{margin:20px auto;max-width:900px;padding:20px}h2{font-size:var(--sa11y-large-text);margin-top:0}a{color:var(--sa11y-hyperlink);cursor:pointer;text-decoration:underline}a:focus,a:hover{text-decoration:none}p{margin-top:0}.error{background:var(--sa11y-error);border:2px dashed #f08080;color:var(--sa11y-error-text);margin-bottom:0;padding:5px}";

var sharedStyles = ".visually-hidden{clip:rect(1px,1px,1px,1px);border:0;clip-path:inset(50%);display:block;height:1px;overflow:hidden;padding:0;position:absolute;white-space:nowrap;width:1px}[hidden]{display:none!important}.header-text,.header-text-inline,h2{color:var(--sa11y-panel-primary);display:block;font-size:var(--sa11y-large-text);font-weight:600;margin-bottom:3px}.header-text-inline{display:inline-block!important}code{font-family:monospace!important;font-size:14px}.kbd,code,kbd{background-color:var(--sa11y-panel-badge);border-radius:3.2px;color:var(--sa11y-panel-primary);padding:1.6px 4.8px}.bold{font-weight:600}.red-text{color:var(--sa11y-red-text)}.red-text,.yellow-text{font-family:var(--sa11y-font-face)}.yellow-text{color:var(--sa11y-yellow-text)}.badge{background-color:var(--sa11y-panel-badge);border:1px solid transparent;border-radius:10px;color:var(--sa11y-panel-primary);display:inline;font-size:13px;font-weight:700!important;line-height:1;min-width:10px;padding:1px 4.5px 1.75px;text-align:center;vertical-align:baseline;white-space:nowrap}.error-badge{background:var(--sa11y-error);color:var(--sa11y-error-text)}.warning-badge{background:var(--sa11y-yellow-text);color:var(--sa11y-panel-bg)}.close-btn{background:var(--sa11y-panel-bg-secondary);border:2px solid var(--sa11y-button-outline);border-radius:50%;color:var(--sa11y-panel-primary);cursor:pointer;float:var(--sa11y-float-rtl);font-size:var(--sa11y-normal-text);font-weight:400;height:32px;margin:0;position:relative;transition:all .2s ease-in-out;width:32px}.close-btn:focus,.close-btn:hover{background-color:var(--sa11y-shortcut-hover)}.close-btn:after{background:var(--sa11y-setting-switch-bg-off);bottom:-7px;content:\"\";left:-7px;-webkit-mask:var(--sa11y-close-btn-svg) center no-repeat;mask:var(--sa11y-close-btn-svg) center no-repeat;position:absolute;right:-7px;top:-7px}@media screen and (forced-colors:active){.close-btn:after{filter:invert(1)}}#container [tabindex=\"-1\"]:focus,#container [tabindex=\"0\"]:focus,#container a:focus,#container button:not(#panel-controls button):not(.switch):focus,#container select:focus{box-shadow:0 0 0 5px var(--sa11y-focus-color);outline:0}#container #panel-controls button:focus,#container .switch:focus{box-shadow:inset 0 0 0 4px var(--sa11y-focus-color);outline:0}#container #panel-controls button:focus:not(:focus-visible),#container [tabindex=\"-1\"]:focus:not(:focus-visible),#container [tabindex=\"0\"]:focus:not(:focus-visible),#container button:focus:not(:focus-visible),#container select:focus:not(:focus-visible){box-shadow:none;outline:0}#container [tabindex=\"-1\"]:focus-visible,#container [tabindex=\"0\"]:focus-visible,#container a:focus-visible,#container button:not(#panel-controls button):not(.switch):focus-visible,#container select:focus-visible{box-shadow:0 0 0 5px var(--sa11y-focus-color);outline:0}#container #panel-controls button:focus-visible,#container .switch:focus-visible{box-shadow:inset 0 0 0 4px var(--sa11y-focus-color);outline:0}@media screen and (forced-colors:active){#panel-controls button:focus{border:3px solid transparent}#container [tabindex=\"-1\"]:focus,#container [tabindex=\"0\"]:focus,#container a:focus,#container button:focus,#container select:focus,.close-btn:focus{outline:3px solid transparent!important}}";

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
    const github = `https://github.com/ryersondmp/sa11y/issues/new?title=Bug%20report&body=%23%23%20Error%20Description%0A%60%60%60javascript%0A${encodeURIComponent(this.error.stack)}%0A%60%60%60%0A%0A%23%23%20URL%0A%60${url}%60%0A%0A%23%23%20Comments%0A`;

    // Message
    content.innerHTML = `
      <button class="close-btn" aria-label="${Lang._('ALERT_CLOSE')}"></button>
      <h2>${Lang._('ERROR')}</h2>
      <p>${Lang.sprintf('CONSOLE_ERROR', google, github)}</p>
      <p class="error">${escapeHTML(this.error.stack)}<br><br>URL: ${url}</p>
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

var panelStyles = "a,button,code,div,h1,h2,kbd,label,li,ol,p,pre,span,strong,svg,ul{all:unset;box-sizing:border-box!important}:after,:before{all:unset}div{display:block}*{-webkit-font-smoothing:auto!important;font-family:var(--sa11y-font-face)!important}label,li,ol,p,ul{font-size:var(--sa11y-normal-text);font-weight:400;letter-spacing:normal;line-height:22px!important;text-align:start;word-break:break-word}.sa11y-overflow{overflow:auto}iframe,img,video{border:0;display:block;height:auto;max-width:100%}audio{max-width:100%}#toggle{align-items:center;background:linear-gradient(0deg,#e040fb,#00bcd4);background-color:var(--sa11y-setting-switch-bg-off);background-size:150% 150%;border-radius:50%;bottom:15px;color:#fff;cursor:pointer;display:flex;height:55px;inset-inline-end:18px;justify-content:center;margin:0;overflow:visible;position:fixed;transition:all .2s ease-in-out;width:55px;z-index:2147483644}#toggle.left,#toggle.top-left{inset-inline-start:18px}#toggle.top-left,#toggle.top-right{bottom:unset;top:15px}@media screen and (forced-colors:active){#toggle{background:ButtonFace!important;border:2px solid transparent}}#toggle svg{height:35px;width:35px}#toggle svg path{fill:var(--sa11y-panel-bg)}#toggle:focus,#toggle:hover{animation:sa11y-toggle-gradient 3s ease}#toggle:disabled:focus,#toggle:disabled:hover{animation:none}#toggle.on{background:linear-gradient(180deg,#e040fb,#00bcd4)}#toggle:disabled{background:unset;background-color:var(--sa11y-setting-switch-bg-off);cursor:not-allowed}#notification-badge{text-wrap:nowrap;align-items:center;background-color:#eb0000;border:1px solid transparent;border-radius:12px;color:#fff;display:none;font-size:13.5px;font-weight:400;justify-content:center;line-height:1;min-width:20px;padding:2.5px;position:absolute;right:-3px;top:-5.5px}#notification-badge.notification-badge-warning{background-color:var(--sa11y-warning-hover);border:1px solid var(--sa11y-warning);color:var(--sa11y-warning-text)}#panel{background:var(--sa11y-panel-bg);border-radius:4px;bottom:25px;box-shadow:0 0 20px 4px rgba(154,161,177,.15),0 4px 80px -8px rgba(36,40,47,.25),0 4px 4px -2px rgba(91,94,105,.15);inset-inline-end:42px;opacity:0;overflow:visible;position:fixed;transform:scale(0);transform-origin:100% 100%;transition:transform .2s,opacity background .2s .2s;visibility:hidden;z-index:2147483643}#panel.left,#panel.top-left{inset-inline-start:42px}#panel.top-left,#panel.top-right{bottom:unset;top:35px}#panel.active{height:auto;opacity:1;transform:scale(1);transform-origin:bottom right;transition:transform .2s,opacity .2s;visibility:visible}@media screen and (forced-colors:active){#panel{border:2px solid transparent}}#panel.active.left,[dir=rtl] #panel.active{transform-origin:bottom left}#panel.active.top-left{transform-origin:top left}#panel.active.top-right{transform-origin:top right}#panel-alert{display:none;opacity:0}#panel-alert.active{display:block;opacity:1}#panel-alert-content{align-items:center;border-bottom:1px solid var(--sa11y-panel-bg-splitter);color:var(--sa11y-panel-primary);max-height:400px;overflow-y:auto;padding:15px 20px 15px 15px;position:relative}.top-left #panel-alert-content,.top-right #panel-alert-content{border:0}#panel-alert-preview .close-tooltip{display:none}#panel-alert-preview,#panel-alert-text{font-family:var(--sa11y-font-face);font-size:var(--sa11y-normal-text);font-weight:400;line-height:22px}.panel-alert-preview{background:var(--sa11y-panel-bg-secondary);border:1px dashed var(--sa11y-panel-bg-splitter);border-radius:5px;margin-top:15px;padding:10px}.element-preview{background-color:var(--sa11y-panel-badge);border-radius:3.2px;margin-bottom:10px;overflow-wrap:break-word;padding:5px}button[data-sa11y-dismiss]{background:var(--sa11y-panel-bg-secondary);border:2px solid var(--sa11y-button-outline);border-radius:5px;color:var(--sa11y-panel-primary);cursor:pointer;display:block;margin:10px 5px 5px 0;padding:4px 8px}button[data-sa11y-dismiss]:focus,button[data-sa11y-dismiss]:hover{background:var(--sa11y-shortcut-hover)}h2{display:block;font-size:var(--sa11y-large-text);margin-bottom:3px}h2,strong{font-weight:600}a:not(#outline-list a):not(.edit){border-bottom:0;color:var(--sa11y-hyperlink);cursor:pointer;text-decoration:underline}a:focus,a:hover{text-decoration:none!important}hr{background:var(--sa11y-panel-bg-splitter);border:none;height:1px;margin:10px 0;opacity:1;padding:0}#dismiss-button,#skip-button{background:var(--sa11y-panel-bg-secondary);border:1px solid var(--sa11y-button-outline);border-radius:50px;cursor:pointer;display:none;height:36px;margin-inline-end:8px;margin-inline-start:2px;overflow:visible;position:relative;text-align:center;transition:all .1s ease-in-out;width:36px}#dismiss-button.active,#skip-button.active{display:block}#dismiss-button:disabled,#skip-button:disabled{background:none;border:0;box-shadow:none;cursor:default}#dismiss-button:before,#skip-button:before{bottom:-5px;content:\"\";left:-5px;position:absolute;right:-5px;top:-5px}#dismiss-button:focus:not(:disabled),#dismiss-button:hover:not(:disabled),#skip-button:focus:not(:disabled),#skip-button:hover:not(:disabled){background-color:var(--sa11y-shortcut-hover)}#panel.left #dismiss-button,#panel.left #skip-button,#panel.top-left #dismiss-button,#panel.top-left #skip-button{margin-inline-end:2px;margin-inline-start:8px}.dismiss-icon{background:var(--sa11y-setting-switch-bg-off);display:inline-block;height:24px;margin-bottom:-4px;-webkit-mask:var(--sa11y-dismiss-icon) center no-repeat;mask:var(--sa11y-dismiss-icon) center no-repeat;width:24px}@media screen and (forced-colors:active){.dismiss-icon{filter:invert(1)}}#panel-content{align-items:center;color:var(--sa11y-panel-primary);display:flex;padding:6px}#panel-content.errors .panel-icon,#panel-content.good .panel-icon,#panel-content.warnings .panel-icon{height:26px;margin:0 auto;width:26px}#panel-content.errors .panel-icon{background:var(--sa11y-panel-error);margin-top:-2px;-webkit-mask:var(--sa11y-error-svg) center no-repeat;mask:var(--sa11y-error-svg) center no-repeat}#panel-content.good .panel-icon{background:var(--sa11y-good);-webkit-mask:var(--sa11y-good-svg) center no-repeat;mask:var(--sa11y-good-svg) center no-repeat}#panel-content.warnings .panel-icon{background:var(--sa11y-warning-svg-color);-webkit-mask:var(--sa11y-warning-svg) center no-repeat;mask:var(--sa11y-warning-svg) center no-repeat;transform:scaleX(var(--sa11y-icon-direction))}@media screen and (forced-colors:active){#panel-content.errors .panel-icon,#panel-content.good .panel-icon,#panel-content.warnings .panel-icon{filter:invert(1)}}#panel.left #panel-content,#panel.top-left #panel-content{flex-direction:row-reverse}#status{font-size:var(--sa11y-large-text)}#status,.panel-count{color:var(--sa11y-panel-primary)}.panel-count{background-color:var(--sa11y-panel-badge);border-radius:4px;font-size:15px;font-weight:400;margin-left:3px;margin-right:3px;padding:2px 4px}#images-panel,#outline-panel,#page-issues,#settings-panel{color:var(--sa11y-panel-primary);display:none;opacity:0}#images-panel.active,#outline-panel.active,#page-issues.active,#settings-panel.active{display:block;opacity:1}.panel-header{padding:10px 15px 0;text-align:start}#about-content{padding-top:5px}#about-content p{display:block;margin-block-end:1em}#images-content,#outline-content,#page-issues-content,#settings-content{border-bottom:1px solid var(--sa11y-panel-bg-splitter);padding:0 15px 10px}.top-left #images-content,.top-left #outline-content,.top-left #page-issues-content,.top-left #settings-content,.top-right #images-content,.top-right #outline-content,.top-right #page-issues-content,.top-right #settings-content{border:0}#page-issues-content{max-height:160px;overflow-y:auto}#settings-content{max-height:400px;overflow-y:auto}#images-content,#outline-content{max-height:250px;overflow-y:auto}#outline-panel .outline-list-item.sa11y-red-text,#settings-panel .sa11y-red-text{color:var(--sa11y-red-text)}#outline-list{display:block;margin:0;padding:0}#outline-list a{cursor:pointer;display:block;text-decoration:none}#outline-list li{display:block;list-style-type:none;margin-bottom:3px;margin-top:0;padding:0}#outline-list li:first-child{margin-top:5px}#outline-list li a:focus,#outline-list li a:hover{background:var(--sa11y-panel-outline-hover);border-radius:5px;box-shadow:0 0 0 2px var(--sa11y-panel-outline-hover);display:block}#outline-list .outline-2{margin-inline-start:15px}#outline-list .outline-3{margin-inline-start:30px}#outline-list .outline-4{margin-inline-start:45px}#outline-list .outline-5{margin-inline-start:60px}#outline-list .outline-6{margin-inline-start:75px}#images-list{display:block;margin:0;padding:0}#images-list li{border-bottom:1px solid var(--sa11y-panel-bg-splitter);display:block;list-style-type:none;margin:15px 0;overflow:hidden;width:100%}#images-list li:first-child{margin-top:5px}#images-list li:last-child{border:none;margin-bottom:0}#images-list li .alt{padding:2px 5px 10px}#images-list li .edit{background:var(--sa11y-panel-bg-secondary);border:2px solid var(--sa11y-button-outline);border-radius:5px;color:var(--sa11y-panel-primary);cursor:pointer;padding:4px 7px;position:relative;text-decoration:none}#images-list li .edit:focus,#images-list li .edit:hover{background-color:var(--sa11y-shortcut-hover)}#images-list li .edit:before{bottom:-10px;content:\"\";left:-10px;position:absolute;right:-10px;top:-10px}#images-list li img{border-radius:5px;float:inline-start;margin-block-end:15px;margin-inline-end:10px;max-width:110px}#images-list li.warning .alt{color:var(--sa11y-yellow-text)}#images-list li.warning img{background-color:var(--sa11y-yellow-text);border:5px solid var(--sa11y-yellow-text)}#images-list li.error .alt{color:var(--sa11y-error)}#images-list li.error img{background-color:var(--sa11y-error);border:5px solid var(--sa11y-error)}#images-list li.good img{background-color:var(--sa11y-panel-badge);border:5px solid var(--sa11y-panel-badge)}@media screen and (forced-colors:active){#images-list li img{background-color:ButtonBorder!important}}.error-icon{background:var(--sa11y-error-text);display:inline-block;height:16px;margin-bottom:-4px;-webkit-mask:var(--sa11y-error-svg) center no-repeat;mask:var(--sa11y-error-svg) center no-repeat;width:16px}.hidden-icon{margin-bottom:-3px;-webkit-mask:var(--sa11y-hidden-icon-svg) center no-repeat;mask:var(--sa11y-hidden-icon-svg) center no-repeat}.hidden-icon,.link-icon{background:var(--sa11y-panel-primary);display:inline-block;height:16px;width:16px}.link-icon{margin-bottom:-3.5px;-webkit-mask:var(--sa11y-link-icon-svg) center no-repeat;mask:var(--sa11y-link-icon-svg) center no-repeat}.error-badge .hidden-icon,.error-badge .link-icon{background:var(--sa11y-error-text)}.warning-badge .hidden-icon,.warning-badge .link-icon{background:var(--sa11y-panel-bg)}@media screen and (forced-colors:active){.error-icon,.hidden-icon,.link-icon{filter:invert(1)}}#panel-controls{border-radius:0 0 4px 4px;display:flex;overflow:hidden}#panel-controls button{background:var(--sa11y-panel-bg-secondary);background-color:var(--sa11y-panel-bg-secondary);border-bottom:1px solid var(--sa11y-panel-bg-splitter);border-inline-end:1px solid var(--sa11y-panel-bg-splitter);border-top:1px solid var(--sa11y-panel-bg-splitter);color:var(--sa11y-panel-secondary);cursor:pointer;display:block;font-size:var(--sa11y-normal-text);font-weight:400;height:30px;line-height:0;margin:0;opacity:1;outline:0;padding:0;position:relative;text-align:center;transition:background .2s;width:100%}#panel-controls button.active,#panel-controls button:hover{background-color:var(--sa11y-shortcut-hover)}#panel-controls button.active{font-weight:500}#export-results-mode,label{color:var(--sa11y-panel-primary);display:inline-block;font-weight:400;margin:0;width:100%}label:not(#colour-filter-mode,#export-results-mode){cursor:pointer}#settings-panel #export-csv,#settings-panel #export-html{padding:0;text-align:center;width:unset}#settings-panel #export-csv span,#settings-panel #export-html span{background:var(--sa11y-panel-bg-secondary);border-radius:5px;box-shadow:inset 0 0 0 2px var(--sa11y-setting-switch-bg-off);display:block;margin:0 4px;padding:7px 9px;width:65px}#settings-panel #export-csv:focus span,#settings-panel #export-csv:focus-within span,#settings-panel #export-csv:hover span,#settings-panel #export-html:focus span,#settings-panel #export-html:focus-within span,#settings-panel #export-html:hover span{background:var(--sa11y-shortcut-hover)}#settings-panel .switch{background:none;border:0;border-radius:5px;color:var(--sa11y-panel-primary);cursor:pointer;font-size:var(--sa11y-normal-text);font-weight:400;height:44px;margin:0;padding:7px 10px;position:relative;text-align:end;width:105px}#settings-panel .switch[aria-pressed=false]:after,#settings-panel .switch[aria-pressed=true]:after{content:\"\";display:inline-block;height:27px;margin:0 4px 4px;vertical-align:middle;width:27px}#settings-panel .switch[aria-pressed=true]:after{background:var(--sa11y-setting-switch-bg-on);-webkit-mask:var(--sa11y-setting-switch-on-svg) center no-repeat;mask:var(--sa11y-setting-switch-on-svg) center no-repeat}#settings-panel .switch[aria-pressed=false]:after{background:var(--sa11y-setting-switch-bg-off);-webkit-mask:var(--sa11y-setting-switch-off-svg) center no-repeat;mask:var(--sa11y-setting-switch-off-svg) center no-repeat}@media screen and (forced-colors:active){#settings-panel .switch[aria-pressed=false]:after,#settings-panel .switch[aria-pressed=true]:after{filter:invert(1)}}#settings-panel #settings-options li{align-items:center;border-bottom:1px solid var(--sa11y-panel-bg-splitter);display:flex;justify-content:space-between;list-style-type:none;padding:1px 0}#settings-panel #settings-options li:last-child{border:none}#page-issues{align-items:center;color:var(--sa11y-panel-primary)}#page-issues-list{display:block;margin-top:4px}#page-issues-list li{display:block;margin:0 0 10px}#page-issues-list strong{display:block}.top-left.has-page-issues #page-issues,.top-right.has-page-issues #page-issues{border-top:1px solid var(--sa11y-panel-bg-splitter);margin-top:-1px}#panel-colour-filters{align-items:center;color:var(--sa11y-panel-primary);display:none;font-family:var(--sa11y-font-face);font-size:var(--sa11y-normal-text);font-weight:400;line-height:22px}#panel-colour-filters.active{display:flex}#panel-colour-filters p{padding:6px 20px 6px 6px;width:100%}#panel-colour-filters[data-colour=protanopia]{border-bottom:6px solid transparent;-o-border-image:linear-gradient(94deg,#786719 11%,#e0c600 36%,#e0c600 47%,#0059e3 75%,#0042aa 91%);border-image:linear-gradient(94deg,#786719 11%,#e0c600 36%,#e0c600 47%,#0059e3 75%,#0042aa 91%);border-image-slice:1}#panel-colour-filters[data-colour=deuteranopia]{border-bottom:6px solid transparent;-o-border-image:linear-gradient(270deg,#567fdb,#a4a28d 48%,#c3ad14 69%,#a79505);border-image:linear-gradient(270deg,#567fdb,#a4a28d 48%,#c3ad14 69%,#a79505);border-image-slice:1}#panel-colour-filters[data-colour=tritanopia]{border-bottom:6px solid transparent;-o-border-image:linear-gradient(270deg,#b1506f,#0696c1 35%,#f3a9ba 70%,#d91c5d 87%,#fe015c);border-image:linear-gradient(270deg,#b1506f,#0696c1 35%,#f3a9ba 70%,#d91c5d 87%,#fe015c);border-image-slice:1}#panel-colour-filters[data-colour=monochromacy]{border-bottom:6px solid transparent;-o-border-image:linear-gradient(270deg,#000,#a7a7a7 50%,#000);border-image:linear-gradient(270deg,#000,#a7a7a7 50%,#000);border-image-slice:1}#panel-colour-filters[data-colour=protanopia] .panel-icon{background:var(--sa11y-panel-error)}#panel-colour-filters[data-colour=deuteranopia] .panel-icon{background:var(--sa11y-good-hover)}#panel-colour-filters[data-colour=tritanopia] .panel-icon{background:var(--sa11y-blue)}#panel-colour-filters[data-colour=monochromacy] .panel-icon{background:linear-gradient(90deg,#38a459 20%,red 50%,#0077c8 80%)}#panel-colour-filters .panel-icon{height:30px;margin-inline-end:5px;margin-inline-start:10px;-webkit-mask:var(--sa11y-low-vision-icon) center no-repeat;mask:var(--sa11y-low-vision-icon) center no-repeat;width:30px}@media screen and (forced-colors:active){#panel-colour-filters .panel-icon{forced-color-adjust:none}}.select-dropdown{align-items:center;display:flex;position:relative}.select-dropdown:after{border-left:5px solid transparent;border-right:5px solid transparent;border-top:5px solid var(--sa11y-setting-switch-bg-off);content:\" \";inset-inline-end:14px;position:absolute}#colour-filter-select{-webkit-appearance:none;-moz-appearance:none;appearance:none;background:var(--sa11y-panel-bg-secondary);border:2px solid var(--sa11y-setting-switch-bg-off);border-radius:5px;color:var(--sa11y-panel-primary);cursor:pointer;font-size:var(--sa11y-normal-text);font-weight:400;height:30px;margin-inline-end:4px;padding-inline-end:25px;padding-inline-start:5px;position:relative;text-align:end;vertical-align:middle}#colour-filter-select:focus,#colour-filter-select:hover{background:var(--sa11y-shortcut-hover)}#colour-filter-select.active{box-shadow:0 0 0 2px var(--sa11y-setting-switch-bg-on)}#colour-filter-item label,#colour-filter-item select{margin-bottom:9px;margin-top:10px}#readability-panel{display:none;opacity:0}#readability-panel.active{display:block;opacity:1}.top-left #readability-content,.top-right #readability-content{border-top:1px solid var(--sa11y-panel-bg-splitter)}.left #readability-content,.right #readability-content{border-bottom:1px solid var(--sa11y-panel-bg-splitter)}#readability-content{color:var(--sa11y-panel-primary);padding:10px 15px;width:100%}#readability-details{list-style-type:none;margin:0;padding:0;white-space:normal}#readability-details li{display:inline-block;list-style-type:none;margin:0;padding-inline-end:10px}.readability-score{background-color:var(--sa11y-panel-badge);border-radius:4px;color:var(--sa11y-panel-primary);margin-inline-start:5px;padding:2px 5px}#readability-info{margin-inline-start:10px}#skip-to-page-issues{display:none}#panel.has-page-issues #skip-to-page-issues{clip:rect(0,0,0,0);background:var(--sa11y-panel-bg);border:0;border-radius:5px;display:block;height:1px;margin:-1px;overflow:hidden;padding:0;position:absolute;white-space:nowrap;width:1px}#panel.has-page-issues #skip-to-page-issues:focus{clip:auto;height:auto;margin:0;overflow:visible;padding:5px 7px;white-space:normal;width:auto;z-index:1}.hide-settings-border{border-bottom:0!important;padding:0 15px!important}.hide-settings-border li:not(#colour-filter-item){display:none!important}.hide-settings-border #about-content{display:none}.hide-settings-border.scrollable:before{all:unset}::-webkit-scrollbar{height:6px;width:7px}::-webkit-scrollbar-thumb{background-color:var(--sa11y-button-outline);border-radius:6px}*{scrollbar-color:var(--sa11y-button-outline);scrollbar-width:thin}.scrollable:before{animation:fade 1s ease-in-out;background:linear-gradient(180deg,transparent 70%,var(--sa11y-panel-scrollable) 100%);background-position:bottom;bottom:auto;content:\"\";height:250px;left:0;position:absolute;right:0;top:auto;transition:opacity 1s ease-in-out;width:100%;z-index:-1}#settings-content.scrollable:before{height:400px}.top-left .scrollable:before,.top-right .scrollable:before{border-radius:5px}#page-issues-content.scrollable:before{height:160px}#panel-alert.scrollable:before{height:200px}@keyframes sa11y-toggle-gradient{0%{background-position:50% 0}50%{background-position:50% 100%}to{background-position:50% 0}}@keyframes fade{0%{opacity:0}to{opacity:1}}@media (prefers-reduced-motion:reduce){*{animation:none!important;transform:none!important;transition:none!important}}#panel{width:400px}#container:lang(en) #panel{width:305px}#container:lang(da) #panel,#container:lang(de) #panel,#container:lang(nb) #panel,#container:lang(pl) #panel,#container:lang(sv) #panel,#container:lang(zh) #panel{width:350px}#container:lang(bg) .switch:not(#export-results-item *),#container:lang(es) .switch:not(#export-results-item *){width:225px!important}#container:not(:lang(en)):not(:lang(de)) .switch{width:205px}";

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

    // If admin wants users to check everything, without toggleable checks.
    const checkAll = Constants.Global.checkAllHideToggles;

    // Panel position: left or right side.
    const { panelPosition } = Constants.Global;

    /* TOGGLEABLE PLUGINS */
    const developerPlugin = Constants.Global.developerPlugin ? `
      <li id="developer-item" ${checkAll ? 'hidden' : ''}>
        <label id="check-developer" for="developer-toggle">${Lang._('DEVELOPER_CHECKS')}</label>
        <button id="developer-toggle"
          aria-labelledby="check-developer"
          aria-describedby="check-developer-desc"
          class="switch"
          aria-pressed="${rememberDeveloper ? 'true' : 'false'}">${rememberDeveloper ? Lang._('ON') : Lang._('OFF')}</button>
        <div id="check-developer-desc" hidden>${Lang._('DEVELOPER_DESC')}</div>
      </li>` : '';

    const readabilityPlugin = Constants.Readability.Plugin ? `
      <li id="readability-item">
        <label id="check-readability" for="readability-toggle">${Lang._('READABILITY')}</label>
        <button id="readability-toggle"
          aria-labelledby="check-readability"
          class="switch"
          aria-pressed="${rememberReadability ? 'true' : 'false'}">${rememberReadability ? Lang._('ON') : Lang._('OFF')}</button>
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
        <button id="export-csv" class="switch" aria-describedby="export-results-mode">
          <span>CSV</span>
        </button>
        <button id="export-html" class="switch" aria-describedby="export-results-mode">
          <span>HTML</span>
        </button>
      </li>` : '';

    /* CUSTOMIZABLE ABOUT SECTION */
    const aboutSection = Constants.Global.aboutContent ? `
      <div id="about-content">
        ${Constants.Global.aboutContent}
      </div>` : '';

    /* MAIN TOGGLE */
    const mainToggle = `
      <button type="button" aria-expanded="false" id="toggle" aria-describedby="notification-badge" aria-label="${Lang._('MAIN_TOGGLE_LABEL')}" class="${panelPosition}" disabled>
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
          <ul
            id="outline-list"
            tabindex="0"
            role="list"
            aria-labelledby="outline-header"></ul>
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
          <ul
            id="images-list"
            tabindex="0"
            role="list"
            aria-labelledby="images-header"></ul>
        </div>
      </div>` : '';

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
            <li id="dark-mode-item">
              <label id="dark-mode" for="theme-toggle">${Lang._('DARK_MODE')}</label>
              <button id="theme-toggle"
                aria-labelledby="dark-mode"
                class="switch"></button>
            </li>
            ${exportResultsPlugin}
            ${colourFilterPlugin}
          </ul>
          ${aboutSection}
        </div>
      </div>`;

    /* PANEL ALERTS */
    const panelAlerts = `
      <div
        id="panel-alert"
        role="alertdialog"
        aria-labelledby="alert-heading"
        aria-describedby="panel-alert-text">
        <div id="panel-alert-content">
          <div class="header-text">
            <button id="close-alert" class="close-btn" aria-label="${Lang._('ALERT_CLOSE')}"></button>
            <h2 id="alert-heading">${Lang._('ALERT_TEXT')}</h2>
          </div>
          <p id="panel-alert-text"></p>
          <div id="panel-alert-preview"></div>
        </div>
      </div>`;

    /* PANEL STATUS */
    const panelStatus = `
      <div id="panel-content">
        <button id="skip-to-page-issues" type="button">
          ${Lang._('SKIP_TO_PAGE_ISSUES')}
        </button>
        <button id="skip-button" type="button">
          <div class="panel-icon"></div>
          <span class="visually-hidden">${Lang._('SHORTCUT_SR')}</span>
        </button>
        <button id="dismiss-button" type="button">
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

    // Spacer for toggle width...
    const spacer = Constants.Global.showImageOutline
      ? '<div style="width:80px"></div>'
      : '<div style="width:40px"></div>';

    const tabToggles = `
      <div id="panel-controls" role="tablist" aria-orientation="horizontal">
        ${(panelPosition === 'left') ? spacer : ''}
        <button type="button" role="tab" aria-expanded="false" id="outline-toggle" aria-controls="outline-panel">${Lang._('OUTLINE')}</button>
        ${Constants.Global.showImageOutline ? imageToggleButton : ''}
        <button type="button" role="tab" aria-expanded="false" id="settings-toggle" aria-controls="settings-panel">${Lang._('SETTINGS')}</button>
        ${(panelPosition === 'right') ? spacer : ''}
      </div>`;

    /* MAIN CONTAINER */
    const container = document.createElement('div');
    container.setAttribute('id', 'container');
    container.setAttribute('role', 'region');
    container.setAttribute('lang', Lang._('LANG_CODE'));
    container.setAttribute('aria-label', Lang._('CONTAINER_LABEL'));
    container.setAttribute('dir', Constants.Global.langDirection);

    if (panelPosition === 'top-left' || panelPosition === 'top-right') {
      container.innerHTML = `
        ${mainToggle}
        <div id="panel" class="${panelPosition}">
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
        <div id="panel" class="${panelPosition}">
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
    themeToggle.textContent = Lang._(theme === 'dark' ? 'ON' : 'OFF');
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

          // Brings select menu closer to the colour filter panel by hiding the Setting's border.
          if (Constants.Global.panelPosition === 'left' || Constants.Global.panelPosition === 'right') {
            Constants.Panel.settingsContent.classList.add('hide-settings-border');
          }

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
    const findDismissedHeadings = dismissed.map((e) => {
      const found = headingOutline.find((f) => (e.key.includes(f.dismiss) && e.href === window.location.pathname));
      if (found === undefined) return '';
      return found;
    });
    findDismissedHeadings.forEach(($el) => {
      Object.assign($el, { dismissedHeading: true });
    });

    // Show meta page title in Page Outline.
    if (option.showTitleInPageOutline) {
      let outlineItem;
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

      // Filter out specified headings in outlineIgnore prop.
      const ignoreArray = Constants.Exclusions.Outline ? Array.from(document.querySelectorAll(Constants.Exclusions.Outline)) : [];

      if (!ignoreArray.includes($el)) {
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
      }
    });

    // Append headings to Page Outline.
    Constants.Panel.outlineList.innerHTML = (outlineArray.length === 0)
      ? `<li>${Lang._('PANEL_NO_HEADINGS')}</li>`
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

function generateImageOutline(dismissed, imageResults) {
  const generateEditLink = (image) => {
    let finalURL;
    // Only generate edit link if prop is populated.
    if (Constants.Global.editImageURLofCMS.length !== 0) {
      const { src } = image.element;

      // Check if image's SRC attribute is hosted on same domain or is relative path.
      const relativePath = Constants.Global.relativePathImageSRC
        ? Constants.Global.relativePathImageSRC
        : window.location.host;

      const parts = src.split(relativePath);
      const fileExtension = parts.length > 1 ? parts[1] : '';

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

      const editURL = (relativePath && imageID.length)
        ? Constants.Global.editImageURLofCMS + imageUniqueID
        : Constants.Global.editImageURLofCMS + fileExtension;

      // Only add edit button to relative (locally hosted) images.
      const isRelativeLink = (imageSrc) => imageSrc.includes(window.location.host) || imageSrc.startsWith(relativePath);
      finalURL = (isRelativeLink(src) && imageUniqueID !== undefined)
        ? `<div class="edit-block"><a
            href="${encodeURI(editURL)}"
            target="_blank"
            rel="noopener noreferrer"
            class="edit">${Lang._('EDIT')}</a></div>`
        : '';
    }
    return finalURL ?? '';
  };

  const imageOutlineHandler = () => {
    // Create a single array that gets appended to heading outline.
    const imageArray = [];

    // Find all dismissed images and update headingOutline array.
    const findDismissedImages = dismissed.map((e) => {
      const found = imageResults.find((f) => (e.key.includes(f.dismiss) && e.href === window.location.pathname));
      if (found === undefined) return '';
      return found;
    });

    findDismissedImages.forEach(($el) => {
      Object.assign($el, { dismissedImage: true });
    });

    imageResults.forEach((image) => {
      const issue = image.type;
      const { dismissedImage } = image;
      const altText = escapeHTML(image.element.alt);

      // Account for lazy loading libraries that use 'data-src' attribute.
      const { src } = image.element;
      const dataSrc = image.element.getAttribute('data-src');
      const source = (dataSrc && dataSrc.length > 3) ? dataSrc : src;

      // Generate edit link if locally hosted image and prop is enabled.
      const edit = generateEditLink(image);

      // If image is linked.
      const linked = (image.element.closest('a[href]'))
        ? `<div class="badge ${issue}-badge"><span class="link-icon"></span><span class="visually-hidden">${Lang._('LINKED')}</span></div>`
        : '';

      let append;
      if (issue === 'error') {
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
      } else if (issue === 'warning' && !dismissedImage) {
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
        const goodLinked = (image.element.closest('a[href]'))
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

var max$5 = Math.max;
var min$5 = Math.min;
var round$6 = Math.round;

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
    scaleX = element.offsetWidth > 0 ? round$6(clientRect.width) / element.offsetWidth || 1 : 1;
    scaleY = element.offsetHeight > 0 ? round$6(clientRect.height) / element.offsetHeight || 1 : 1;
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

function within(min, value, max) {
  return max$5(min, min$5(value, max));
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
    x: round$6(x * dpr) / dpr || 0,
    y: round$6(y * dpr) / dpr || 0
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
  var width = max$5(html.scrollWidth, html.clientWidth, body ? body.scrollWidth : 0, body ? body.clientWidth : 0);
  var height = max$5(html.scrollHeight, html.clientHeight, body ? body.scrollHeight : 0, body ? body.clientHeight : 0);
  var x = -winScroll.scrollLeft + getWindowScrollBarX(element);
  var y = -winScroll.scrollTop;

  if (getComputedStyle$1(body || html).direction === 'rtl') {
    x += max$5(html.clientWidth, body ? body.clientWidth : 0) - width;
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
    accRect.top = max$5(rect.top, accRect.top);
    accRect.right = min$5(rect.right, accRect.right);
    accRect.bottom = min$5(rect.bottom, accRect.bottom);
    accRect.left = max$5(rect.left, accRect.left);
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
    var min = offset + overflow[mainSide];
    var max = offset - overflow[altSide];
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
    var preventedOffset = within(tether ? min$5(min, tetherMin) : min, offset, tether ? max$5(max, tetherMax) : max);
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
  var scaleX = round$6(rect.width) / element.offsetWidth || 1;
  var scaleY = round$6(rect.height) / element.offsetHeight || 1;
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

var tooltipStyles = "a,button,code,div,h1,h2,kbd,li,ol,p,span,strong,svg,ul{all:unset;box-sizing:border-box!important}div{display:block}:after,:before{all:unset}.tippy-box[data-animation=fade][data-state=hidden]{opacity:0}[data-tippy-root]{max-width:calc(100vw - 10px)}@media (forced-colors:active){[data-tippy-root]{border:2px solid transparent;border-radius:5px}}.tippy-box[data-placement^=top]>.tippy-arrow{bottom:0}.tippy-box[data-placement^=top]>.tippy-arrow:before{border-top-color:initial;border-width:8px 8px 0;bottom:-7px;left:0;transform-origin:center top}.tippy-box[data-placement^=bottom]>.tippy-arrow{top:0}.tippy-box[data-placement^=bottom]>.tippy-arrow:before{border-bottom-color:initial;border-width:0 8px 8px;left:0;top:-7px;transform-origin:center bottom}.tippy-box[data-placement^=left]>.tippy-arrow{right:0}.tippy-box[data-placement^=left]>.tippy-arrow:before{border-left-color:initial;border-width:8px 0 8px 8px;right:-7px;transform-origin:center left}.tippy-box[data-placement^=right]>.tippy-arrow{left:0}.tippy-box[data-placement^=right]>.tippy-arrow:before{border-right-color:initial;border-width:8px 8px 8px 0;left:-7px;transform-origin:center right}.tippy-arrow{color:#333;height:16px;width:16px}.tippy-arrow:before{border-color:transparent;border-style:solid;content:\"\";position:absolute}.tippy-content{padding:5px 9px;position:relative;z-index:1}.tippy-box[data-theme~=sa11y-theme][role=tooltip]{box-sizing:border-box!important}.tippy-box[data-theme~=sa11y-theme][role=tooltip][data-animation=fade][data-state=hidden]{opacity:0}.tippy-box[data-theme~=sa11y-theme][role=tooltip][data-inertia][data-state=visible]{transition-timing-function:cubic-bezier(.54,1.5,.38,1.11)}[role=dialog]{word-wrap:break-word;min-width:300px;text-align:start}[role=tooltip]{min-width:185px;text-align:center}.tippy-box[data-theme~=sa11y-theme]{-webkit-font-smoothing:auto;background-color:var(--sa11y-panel-bg);border-radius:4px;box-shadow:0 0 20px 4px rgba(154,161,177,.15),0 4px 80px -8px rgba(36,40,47,.25),0 4px 4px -2px rgba(91,94,105,.15)!important;color:var(--sa11y-panel-primary);display:block;font-family:var(--sa11y-font-face);font-size:var(--sa11y-normal-text);font-weight:400;letter-spacing:normal;line-height:22px;outline:0;padding:8px;position:relative;transition-property:transform,visibility,opacity}.tippy-box[data-theme~=sa11y-theme] code{font-family:monospace;font-size:calc(var(--sa11y-normal-text) - 1px)}.tippy-box[data-theme~=sa11y-theme] code,.tippy-box[data-theme~=sa11y-theme] kbd{-webkit-font-smoothing:auto;background-color:var(--sa11y-panel-badge);border-radius:3.2px;color:var(--sa11y-panel-primary);letter-spacing:normal;line-height:22px;padding:1.6px 4.8px}.tippy-box[data-theme~=sa11y-theme] .tippy-content{padding:5px 9px}.tippy-box[data-theme~=sa11y-theme] sub,.tippy-box[data-theme~=sa11y-theme] sup{font-size:var(--sa11y-small-text)}.tippy-box[data-theme~=sa11y-theme] ul{margin:0;margin-block-end:0;margin-block-start:0;padding:0;position:relative}.tippy-box[data-theme~=sa11y-theme] li{display:list-item;margin:5px 10px 0 20px;padding-bottom:5px}.tippy-box[data-theme~=sa11y-theme] a{color:var(--sa11y-hyperlink);cursor:pointer;text-decoration:underline}.tippy-box[data-theme~=sa11y-theme] a:focus,.tippy-box[data-theme~=sa11y-theme] a:hover{text-decoration:none}.tippy-box[data-theme~=sa11y-theme] strong{font-weight:600}.tippy-box[data-theme~=sa11y-theme] hr{background:var(--sa11y-panel-bg-splitter);border:none;height:1px;margin:10px 0;opacity:1;padding:0}.tippy-box[data-theme~=sa11y-theme] button.close-btn{margin:0}.tippy-box[data-theme~=sa11y-theme] .dismiss-group{margin-top:5px}.tippy-box[data-theme~=sa11y-theme] .dismiss-group button{background:var(--sa11y-panel-bg-secondary);border:2px solid var(--sa11y-button-outline);border-radius:5px;color:var(--sa11y-panel-primary);cursor:pointer;display:inline-block;margin:10px 5px 5px 0;margin-inline-end:15px;padding:4px 8px}.tippy-box[data-theme~=sa11y-theme] .dismiss-group button:focus,.tippy-box[data-theme~=sa11y-theme] .dismiss-group button:hover{background:var(--sa11y-shortcut-hover)}.tippy-box[data-theme~=sa11y-theme] .link-icon{background:var(--sa11y-panel-primary);display:inline-block;height:16px;margin-bottom:-3.5px;-webkit-mask:var(--sa11y-link-icon-svg) center no-repeat;mask:var(--sa11y-link-icon-svg) center no-repeat;width:16px}.tippy-box[data-theme~=sa11y-theme] .error .badge{background:var(--sa11y-error);color:var(--sa11y-error-text)}.tippy-box[data-theme~=sa11y-theme] .error .colour{color:var(--sa11y-red-text)}.tippy-box[data-theme~=sa11y-theme] .error .link-icon{background:var(--sa11y-error-text)}.tippy-box[data-theme~=sa11y-theme] .warning .badge{background:var(--sa11y-yellow-text);color:var(--sa11y-panel-bg)}.tippy-box[data-theme~=sa11y-theme] .warning .colour{color:var(--sa11y-yellow-text)}.tippy-box[data-theme~=sa11y-theme] .warning .link-icon{background:var(--sa11y-panel-bg)}.tippy-box[data-theme~=sa11y-theme][data-placement^=top]>.tippy-arrow:before{border-top-color:var(--sa11y-panel-bg)}.tippy-box[data-theme~=sa11y-theme][data-placement^=bottom]>.tippy-arrow:before{border-bottom-color:var(--sa11y-panel-bg)}.tippy-box[data-theme~=sa11y-theme][data-placement^=left]>.tippy-arrow:before{border-left-color:var(--sa11y-panel-bg)}.tippy-box[data-theme~=sa11y-theme][data-placement^=right]>.tippy-arrow:before{border-right-color:var(--sa11y-panel-bg)}@media (forced-colors:active){.tippy-box[data-theme~=sa11y-theme][data-placement^=bottom]>.tippy-arrow:before,.tippy-box[data-theme~=sa11y-theme][data-placement^=left]>.tippy-arrow:before,.tippy-box[data-theme~=sa11y-theme][data-placement^=right]>.tippy-arrow:before,.tippy-box[data-theme~=sa11y-theme][data-placement^=top]>.tippy-arrow:before{forced-color-adjust:none}.tippy-box[data-theme~=sa11y-theme] .tippy-arrow{z-index:-1}}.tippy-box[data-theme~=sa11y-theme] [tabindex=\"-1\"]:focus,.tippy-box[data-theme~=sa11y-theme] a:focus,.tippy-box[data-theme~=sa11y-theme] button:active,.tippy-box[data-theme~=sa11y-theme] button:focus{box-shadow:0 0 0 5px var(--sa11y-focus-color);outline:0}.tippy-box[data-theme~=sa11y-theme] [tabindex=\"-1\"]:focus:not(:focus-visible),.tippy-box[data-theme~=sa11y-theme] a:focus:not(:focus-visible),.tippy-box[data-theme~=sa11y-theme] button:focus:not(:focus-visible){box-shadow:none;outline:0}.tippy-box[data-theme~=sa11y-theme] [tabindex=\"-1\"]:focus-visible,.tippy-box[data-theme~=sa11y-theme] a:focus-visible,.tippy-box[data-theme~=sa11y-theme] button:focus-visible{box-shadow:0 0 0 5px var(--sa11y-focus-color);outline:0}@media screen and (forced-colors:active){.tippy-box[data-theme~=sa11y-theme] .error-icon,.tippy-box[data-theme~=sa11y-theme] .hidden-icon,.tippy-box[data-theme~=sa11y-theme] .link-icon{filter:invert(1)}.tippy-box[data-theme~=sa11y-theme] [tabindex=\"-1\"]:focus,.tippy-box[data-theme~=sa11y-theme] a:focus,.tippy-box[data-theme~=sa11y-theme] button:focus{outline:3px solid transparent!important}}";

// Default options for basic tooltips (not popovers).
const tooltipOptions = (shadowRoot) => ({
  allowHTML: true,
  delay: [500, 0],
  trigger: 'mouseenter focusin',
  arrow: true,
  maxWidth: 200,
  placement: 'top',
  theme: 'sa11y-theme',
  role: 'tooltip',
  aria: {
    content: null,
    expanded: null,
  },
  appendTo: shadowRoot,
  zIndex: 2147483645,
});

class TooltipComponent extends HTMLElement {
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
        const openedTooltip = instance.popper;

        // Hide previously opened tooltip.
        annotations.forEach((popper) => {
          if (popper !== openedTooltip) {
            popper.hide();
          }
        });

        // Last opened tooltip.
        const annotation = instance.reference.getRootNode().host;
        annotation.setAttribute('data-sa11y-opened', '');

        // Close button for tooltip.
        const closeButton = openedTooltip.querySelector('.close-btn');
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
        openedTooltip.addEventListener('keydown', escapeListener);

        // Remove all event listeners.
        const onHiddenTooltip = () => {
          closeButton.removeEventListener('click', closeButtonHandler);
          openedTooltip.removeEventListener('keydown', escapeListener);
          openedTooltip.removeEventListener('hidden', onHiddenTooltip);
        };
        openedTooltip.addEventListener('hidden', onHiddenTooltip);
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
        const openedTooltip = instance.popper;
        openedTooltip.querySelector('.close-btn').removeEventListener('click', () => {
          instance.hide();
        });
        const annotation = instance.reference.getRootNode().host;
        annotation.removeAttribute('data-sa11y-opened');
      },
    });

    /* Skip to Issue toggle button */
    const keyboardShortcut = navigator.userAgent.indexOf('Mac') !== -1
      ? '<span class="kbd">Option</span> + <span class="kbd">S</span>'
      : '<span class="kbd">Alt</span> + <span class="kbd">S</span>';

    tippy(Constants.Panel.skipButton, {
      ...tooltipOptions(shadowRoot),
      offset: [0, 8],
      content: `${Lang._('SKIP_TO_ISSUE')} &raquo; <br> ${keyboardShortcut}`,
    });

    if (Constants.Global.developerPlugin) {
      tippy(Constants.Panel.developerToggle, {
        ...tooltipOptions(shadowRoot),
        triggerTarget: [Constants.Panel.developerItem],
        offset: [0, 0],
        content: Lang._('DEVELOPER_DESC'),
      });
    }
  }
}

class DismissTooltip extends HTMLElement {
  connectedCallback() {
    const shadowRoot = this.attachShadow({ mode: 'open' });

    // Styles
    const style = document.createElement('style');
    style.innerHTML = tooltipStyles + sharedStyles;
    shadowRoot.appendChild(style);

    this.object = tippy(Constants.Panel.dismissButton, {
      offset: [0, 8],
      ...tooltipOptions(shadowRoot),
    });
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
  * @param {Node} element: The node or issue element.
  * @param {String} type: The type of issue (ERROR, WARNING, GOOD).
  * @param {String} content: The tooltip message.
  * @param {Boolean} inline: Whether the annotation should be displayed inline with text.
  * @param {String} position: Position of annotation (beforebegin, afterbegin, e.g.).
  * @param {Number} index: Index or order of issue.
  * @param {String} dismissKey: Unique dismiss key to identify element.
*/
function annotate(
  element,
  type,
  content,
  inline = false,
  position,
  index,
  dismissKey,
  dismissAll,
  option,
) {
  // Validate types to prevent errors.
  const validTypes = ['error', 'warning', 'good'];
  if (validTypes.indexOf(type) === -1) {
    throw Error(`Invalid type [${type}] for annotation`);
  }

  // Add unique ID and styles to annotation and marked element.
  [type].forEach(($el) => {
    if ($el === 'error' && element !== undefined) {
      const errorAttr = (inline ? 'data-sa11y-error-inline' : 'data-sa11y-error');
      element.setAttribute(errorAttr, index);
    } else if ($el === 'warning' && element !== undefined) {
      const warningAttr = (inline ? 'data-sa11y-warning-inline' : 'data-sa11y-warning');
      element.setAttribute(warningAttr, index);
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
    && dismissKey !== undefined)
    ? `<button data-sa11y-dismiss='${index}' type='button'>${Lang._('DISMISS')}</button>` : '';

  // Add dismiss all button if prop enabled & has addition check key.
  const dismissAllBtn = (
    option.dismissAnnotations
    && (option.dismissAll && typeof dismissAll === 'string')
    && (type === 'warning' || type === 'good'))
    ? `<button data-sa11y-dismiss='${index}' data-sa11y-dismiss-all type='button'>${Lang._('DISMISS_ALL')}</button>` : '';

  // Create 'sa11y-annotation' web component for each annotation.
  const instance = document.createElement('sa11y-annotation');
  instance.setAttribute('data-sa11y-annotation', index);

  // Generate HTML for painted annotations.
  if (element === undefined) {
    // Page errors displayed to main panel.
    const listItem = document.createElement('li');
    listItem.innerHTML = `<strong>${ariaLabel[type]}</strong> ${content}${dismissBtn}`;
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
          <button type='button' class='close-btn close-tooltip' aria-label='${Lang._('ALERT_CLOSE')}'></button> <h2>${ariaLabel[type]}</h2> ${escapeHTML(content)}
          <div class='dismiss-group'>${dismissBtn}${dismissAllBtn}</div>
        </div>"
    ></button>`;

    // Make sure annotations always appended outside of interactive elements.
    const location = element.closest('a, button, [role="link"], [role="button"]') || element;
    location.insertAdjacentElement(position, instance);
    instance.shadowRoot.appendChild(create);
  }
}

// ============================================================
// Detect parent containers that have hidden overflow.
// ============================================================
const detectOverflow = () => {
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
      overflowing.setAttribute('data-sa11y-overflow', '');
    }
  });
};

// ============================================================
// Nudge buttons if they overlap.
// ============================================================
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
        font-size: 17px;
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

let index$1 = -1;

const determineIndex = () => {
  // Index of last dismissed item.
  const latestDismissed = store.getItem('sa11y-latest-dismissed');
  if (latestDismissed !== null) index$1 = parseInt(latestDismissed, 10) - 1;
  store.removeItem('sa11y-latest-dismissed');

  // Index of last opened tooltip.
  const opened = find('[data-sa11y-opened]', 'root');
  if (opened[0]) index$1 = parseInt(opened[0].getAttribute('data-sa11y-position'), 10);
};

const goToNext = (results) => {
  determineIndex();
  const issues = Elements.Annotations.Array;

  // Go back to first issue.
  if (index$1 >= issues.length - 1) index$1 = -1;

  const annotation = issues[index$1 + 1];
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
  index$1 += 1;
};

const goToPrev = (results) => {
  determineIndex();
  if (index$1 > 0) {
    const button = Elements.Annotations.Array[index$1 - 1].shadowRoot.querySelector('button');
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
    index$1 -= 1;

    // If index is -1, it means that it cycled back to the first annotation. This is needed for when user wants to go to previous annotation from the very last annotation on the page.
    if (index$1 === -1) index$1 = Elements.Annotations.Array.length - 1;
  }
};

function keyboardShortcut(e, results) {
  if (
    Elements.Annotations.Array.length
    && !Constants.Panel.skipButton.hasAttribute('disabled')
  ) {
    if (e.altKey && e.code === 'KeyS') {
      e.preventDefault();
      goToNext(results);
    } else if (e.altKey && e.code === 'KeyW') {
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
    const link = $el.closest('a[href]');

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
          content: option.checks.HIDDEN_FOCUSABLE.content || Lang.sprintf('HIDDEN_FOCUSABLE'),
          inline: false,
          position: 'beforebegin',
          dismiss: prepareDismissal(`IMAGEHIDDENFOCUSABLE${src}`),
          dismissAll: option.checks.HIDDEN_FOCUSABLE.dismissAll ? 'LINK_HIDDEN_FOCUSABLE' : false,
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
            content: rule.content || Lang.sprintf(linkTextContentLength === 0
              ? 'MISSING_ALT_LINK' : 'MISSING_ALT_LINK_HAS_TEXT'),
            inline: false,
            position: 'beforebegin',
            dismiss: prepareDismissal(`LINKIMAGENOALT${src + linkTextContentLength}`),
            dismissAll: rule.dismissAll ? conditional : false,
            developer: rule.developer || false,
          });
        }
      } else if (option.checks.MISSING_ALT) {
        // General failure message if image is missing alt.
        results.push({
          element: $el,
          type: option.checks.MISSING_ALT.type || 'error',
          content: option.checks.MISSING_ALT.content || Lang.sprintf('MISSING_ALT'),
          inline: false,
          position: 'beforebegin',
          dismiss: prepareDismissal(`IMAGENOALT${src}`),
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
      const decorative = (alt === '' || alt === ' ');

      // Figure elements.
      const figure = $el.closest('figure');
      const figcaption = figure?.querySelector('figcaption');
      const figcaptionText = (figcaption) ? figcaption.textContent.trim() : '';

      // If aria-label or aria-labelledby returns empty or invalid.
      if (hasAria && altText === '') {
        if (option.checks.MISSING_ALT) {
          results.push({
            element: $el,
            type: option.checks.MISSING_ALT.type || 'error',
            content: option.checks.MISSING_ALT.content || Lang.sprintf('MISSING_ALT'),
            inline: false,
            position: 'beforebegin',
            dismiss: prepareDismissal(`IMAGENOALT${src}`),
            dismissAll: option.checks.MISSING_ALT.dismissAll ? 'MISSING_ALT' : false,
            developer: option.checks.MISSING_ALT.developer || false,
          });
        }
        return;
      }

      // Decorative images.
      if (decorative) {
        const carouselSources = option.checks.IMAGE_DECORATIVE_CAROUSEL.sources || '.carousel';
        if (option.checks.IMAGE_DECORATIVE_CAROUSEL && $el.closest(carouselSources)) {
          results.push({
            element: $el,
            type: option.checks.IMAGE_DECORATIVE_CAROUSEL.type || 'warning',
            content: option.checks.IMAGE_DECORATIVE_CAROUSEL.content || Lang.sprintf('IMAGE_DECORATIVE_CAROUSEL'),
            inline: false,
            position: 'beforebegin',
            dismiss: prepareDismissal(`CAROUSEL${src}`),
            dismissAll: option.checks.IMAGE_DECORATIVE_CAROUSEL.dismissAll ? 'IMAGE_DECORATIVE_CAROUSEL' : false,
            developer: option.checks.IMAGE_DECORATIVE_CAROUSEL.developer || false,
          });
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
              content: rule.content || Lang.sprintf(conditional),
              inline: false,
              position: 'beforebegin',
              dismiss: prepareDismissal(`IMAGETEXT${src + linkTextContentLength}`),
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
              content: rule.content || Lang.sprintf(conditional),
              inline: false,
              position: 'beforebegin',
              dismiss: prepareDismissal(`FIG${src + figcaptionText}`),
              dismissAll: rule.dismissAll ? conditional : false,
              developer: rule.developer || false,
            });
          }
        } else if (option.checks.IMAGE_DECORATIVE) {
          results.push({
            element: $el,
            type: option.checks.IMAGE_DECORATIVE.type || 'warning',
            content: option.checks.IMAGE_DECORATIVE.content || Lang.sprintf('IMAGE_DECORATIVE'),
            inline: false,
            position: 'beforebegin',
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
            content: rule.content || Lang.sprintf(link
              ? 'LINK_ALT_FILE_EXT' : 'ALT_FILE_EXT', error[0], altText),
            inline: false,
            position: 'beforebegin',
            dismiss: prepareDismissal(`IMAGE${src + altText}`),
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
            content: rule.content || Lang.sprintf(link
              ? 'LINK_PLACEHOLDER_ALT' : 'ALT_PLACEHOLDER', altText),
            inline: false,
            position: 'beforebegin',
            dismiss: prepareDismissal(`IMAGE${src + altText}`),
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
            content: rule.content || Lang.sprintf(link
              ? 'LINK_SUS_ALT' : 'SUS_ALT', error[1], altText),
            inline: false,
            position: 'beforebegin',
            dismiss: prepareDismissal(`IMAGE${src + altText}`),
            dismissAll: rule.dismissAll ? conditional : false,
            developer: rule.developer || false,
          });
        }
      } else if (alt.length > option.altTextMaxCharLength) {
        // Alt is too long.
        const rule = (link)
          ? option.checks.LINK_IMAGE_LONG_ALT
          : option.checks.IMAGE_ALT_TOO_LONG;
        const conditional = (link) ? 'LINK_IMAGE_LONG_ALT' : 'IMAGE_ALT_TOO_LONG';
        if (rule) {
          results.push({
            element: $el,
            type: rule.type || 'warning',
            content: rule.content || Lang.sprintf(link
              ? 'LINK_IMAGE_LONG_ALT' : 'IMAGE_ALT_TOO_LONG', alt.length, altText),
            inline: false,
            position: 'beforebegin',
            dismiss: prepareDismissal(`IMAGE${src + altText}`),
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
            content: rule.content || tooltip,
            inline: false,
            position: 'beforebegin',
            dismiss: prepareDismissal(`IMAGELINK${src + altText}`),
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
              content: option.checks.IMAGE_FIGURE_DUPLICATE_ALT.content || Lang.sprintf('IMAGE_FIGURE_DUPLICATE_ALT', altText),
              inline: false,
              position: 'beforebegin',
              dismiss: prepareDismissal(`FIGIMAGEDUPLICATE${src}`),
              dismissAll: option.checks.IMAGE_FIGURE_DUPLICATE_ALT.dismissAll ? 'IMAGE_FIGURE_DUPLICATE_ALT' : false,
              developer: option.checks.IMAGE_FIGURE_DUPLICATE_ALT.developer || false,
            });
          }
        } else if (option.checks.IMAGE_PASS) {
          // Figure has alt text!
          results.push({
            element: $el,
            type: option.checks.IMAGE_PASS.type || 'good',
            content: option.checks.IMAGE_PASS.content || Lang.sprintf('IMAGE_PASS', altText),
            inline: false,
            position: 'beforebegin',
            dismiss: prepareDismissal(`IMAGEPASS${src + altText}`),
            dismissAll: option.checks.IMAGE_PASS.dismissAll ? 'IMAGE_PASS' : false,
            developer: option.checks.IMAGE_PASS.developer || false,
          });
        }
      } else if (option.checks.IMAGE_PASS) {
        // Image has alt text!
        results.push({
          element: $el,
          type: option.checks.IMAGE_PASS.type || 'good',
          content: option.checks.IMAGE_PASS.content || Lang.sprintf('IMAGE_PASS', altText),
          inline: false,
          position: 'beforebegin',
          dismiss: prepareDismissal(`IMAGEPASS${src + altText}`),
          dismissAll: option.checks.IMAGE_PASS.dismissAll ? 'IMAGE_PASS' : false,
          developer: option.checks.IMAGE_PASS.developer || false,
        });
      }
    }
  });
  return results;
}

function checkHeaders(results, option, headingOutline) {
  let prevLevel;
  Elements.Found.Headings.forEach(($el, i) => {
    // Get accessible name of heading.
    const accName = computeAccessibleName($el, option.headerIgnoreSpan);
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
    const headingLength = headingText.length;

    // Default.
    let type = null;
    let content = null;
    let developer = null;
    let dismissAll = null;

    // Rulesets.
    if (level - prevLevel > 1 && i !== 0) {
      if (option.checks.HEADING_SKIPPED_LEVEL) {
        type = option.checks.HEADING_SKIPPED_LEVEL.type || 'error';
        content = option.checks.HEADING_SKIPPED_LEVEL.content || Lang.sprintf('HEADING_SKIPPED_LEVEL', prevLevel, level);
        developer = option.checks.HEADING_SKIPPED_LEVEL.developer || false;
        dismissAll = option.checks.HEADING_SKIPPED_LEVEL.dismissAll ? 'HEADING_SKIPPED_LEVEL' : false;
      }
    } else if (headingLength === 0) {
      if ($el.querySelectorAll('img').length) {
        const alt = $el.querySelector('img')?.getAttribute('alt');
        if ($el.querySelector('img') && (!alt || alt.trim() === '')) {
          if (option.checks.HEADING_EMPTY_WITH_IMAGE) {
            type = option.checks.HEADING_EMPTY_WITH_IMAGE.type || 'error';
            content = option.checks.HEADING_EMPTY_WITH_IMAGE.content || Lang.sprintf('HEADING_EMPTY_WITH_IMAGE', level);
            developer = option.checks.HEADING_EMPTY_WITH_IMAGE.developer || false;
            dismissAll = option.checks.HEADING_EMPTY_WITH_IMAGE.dismissAll ? 'HEADING_EMPTY_WITH_IMAGE' : false;
          }
        }
      } else if (option.checks.HEADING_EMPTY) {
        type = option.checks.HEADING_EMPTY.type || 'error';
        content = option.checks.HEADING_EMPTY.content || Lang.sprintf('HEADING_EMPTY', level);
        developer = option.checks.HEADING_EMPTY.developer || false;
        dismissAll = option.checks.HEADING_EMPTY.dismissAll ? 'HEADING_EMPTY' : false;
      }
    } else if (i === 0 && level !== 1 && level !== 2) {
      if (option.checks.HEADING_FIRST) {
        type = option.checks.HEADING_FIRST.type || 'error';
        content = option.checks.HEADING_FIRST.content || Lang.sprintf('HEADING_FIRST');
        developer = option.checks.HEADING_FIRST.developer || false;
        dismissAll = option.checks.HEADING_FIRST.dismissAll ? 'HEADING_FIRST' : false;
      }
    } else if (headingLength > option.headingMaxCharLength) {
      if (option.checks.HEADING_LONG) {
        type = option.checks.HEADING_LONG.type || 'warning';
        content = option.checks.HEADING_LONG.content || Lang.sprintf('HEADING_LONG', headingLength);
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
        inline: false,
        position: 'beforebegin',
        dismiss: prepareDismissal(`HEADING${level + headingText}`),
        dismissAll,
        isWithinRoot,
        developer,
      });
    }

    // Reset level.
    prevLevel = level;

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
      dismiss: prepareDismissal(`HEADING${level + headingText}`),
      isWithinRoot,
    });
  });

  // Missing Heading 1
  if (option.checks.HEADING_MISSING_ONE && Elements.Found.HeadingOne.length === 0) {
    results.push({
      type: option.checks.HEADING_MISSING_ONE.type || 'warning',
      content: option.checks.HEADING_MISSING_ONE.content || Lang.sprintf('HEADING_MISSING_ONE'),
      dismiss: 'MISSINGH1',
      developer: option.checks.HEADING_MISSING_ONE.developer || false,
    });
  }
  return { results, headingOutline };
}

function checkLinkText(results, option) {
  const containsLinkTextStopWords = (textContent) => {
    const urlText = [
      'http',
      'www.',
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

    const hit = [null, null, null, null];

    // Iterate through all partialStopwords.
    Lang._('PARTIAL_ALT_STOPWORDS').forEach((word) => {
      // Remove periods to improve accuracy.
      const testTextContent = textContent.replace(/\./g, '');
      if (testTextContent.length === word.length && testTextContent.toLowerCase().indexOf(word) >= 0) {
        hit[0] = word;
      }
      return false;
    });

    // Other warnings we want to add.
    const linkStopWords = (option.linkStopWords) ? option.linkStopWords.split(',').map((word) => word.trim()) : Lang._('WARNING_ALT_STOPWORDS');
    linkStopWords.forEach((word) => {
      if (textContent.toLowerCase().indexOf(word) >= 0) {
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

    // Flag link text containing URLs.
    urlText.forEach((word) => {
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
    const accName = computeAccessibleName($el, Constants.Exclusions.LinkSpan);
    const stringMatchExclusions = option.linkIgnoreStrings
      ? accName.replace(option.linkIgnoreStrings, '') : accName;
    const linkText = removeWhitespace(stringMatchExclusions);

    // Ignore special characters (except forward slash).
    const stripSpecialChars = linkText.replace(/[^\w\s./]/g, '').replace(/\s+/g, ' ').trim();
    const error = containsLinkTextStopWords(stripSpecialChars);

    // Match special characters exactly 1 character in length.
    const specialCharPattern = /[^a-zA-Z0-9]/g;
    const isSingleSpecialChar = linkText.length === 1 && specialCharPattern.test(linkText);

    // HTML symbols used as call to actions.
    const htmlSymbols = /([<>↣↳←→↓«»↴]+)/;
    const matches = linkText.match(htmlSymbols);
    const matchedSymbol = matches ? matches[1] : null;

    // ARIA attributes.
    const ariaHidden = $el.getAttribute('aria-hidden') === 'true';
    const negativeTabindex = $el.getAttribute('tabindex') === '-1';

    // Has ARIA.
    const hasAria = $el.querySelector(':scope [aria-labelledby], :scope [aria-label]') || $el.getAttribute('aria-labelledby') || $el.getAttribute('aria-label');
    const hasAriaLabelledby = $el.querySelector(':scope [aria-labelledby]') || $el.getAttribute('aria-labelledby');

    // New tab or new window.
    const containsNewWindowPhrases = Lang._('NEW_WINDOW_PHRASES').some((pass) => linkText.toLowerCase().includes(pass));

    // Link that points to a file type and indicates as such.
    const defaultFileTypes = ['pdf', 'doc', 'docx', 'word', 'mp3', 'ppt', 'text', 'pptx', 'txt', 'exe', 'dmg', 'rtf', 'windows', 'macos', 'csv', 'xls', 'xlsx', 'mp4', 'mov', 'avi', 'zip'];
    const fileTypes = defaultFileTypes.concat(Lang._('FILE_TYPE_PHRASES'));
    const containsFileTypePhrases = fileTypes.some((pass) => linkText.toLowerCase().includes(pass));
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

    if ($el.querySelectorAll('img').length) ; else if (ariaHidden) {
      // Has aria-hidden.
      if (!negativeTabindex) {
        // If negative tabindex.
        if (option.checks.HIDDEN_FOCUSABLE) {
          results.push({
            element: $el,
            type: option.checks.HIDDEN_FOCUSABLE.type || 'error',
            content: option.checks.HIDDEN_FOCUSABLE.content || Lang.sprintf('HIDDEN_FOCUSABLE'),
            inline: true,
            position: 'afterend',
            dismiss: prepareDismissal(`A${href + linkTextTrimmed}`),
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
            content: option.checks.LINK_EMPTY_LABELLEDBY.content || Lang.sprintf('LINK_EMPTY_LABELLEDBY'),
            inline: true,
            position: 'afterend',
            dismiss: prepareDismissal(`A${href}`),
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
            content: option.checks.LINK_EMPTY_NO_LABEL.content || Lang.sprintf('LINK_EMPTY_NO_LABEL'),
            inline: true,
            position: 'afterend',
            dismiss: prepareDismissal(`A${href}`),
            dismissAll: option.checks.LINK_EMPTY_NO_LABEL.dismissAll ? 'LINK_EMPTY_NO_LABEL' : false,
            developer: option.checks.LINK_EMPTY_NO_LABEL.developer || false,
          });
        }
      } else if (option.checks.LINK_EMPTY) {
        // Completely empty <a></a>
        results.push({
          element: $el,
          type: option.checks.LINK_EMPTY.type || 'error',
          content: option.checks.LINK_EMPTY.content || Lang.sprintf('LINK_EMPTY'),
          inline: true,
          position: 'afterend',
          dismiss: prepareDismissal(`A${href}`),
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
          content: option.checks.LINK_STOPWORD.content || Lang.sprintf('LINK_STOPWORD', error[0]),
          inline: true,
          position: 'afterend',
          dismiss: prepareDismissal(`A${href + linkTextTrimmed}`),
          dismissAll: option.checks.LINK_STOPWORD.dismissAll ? 'LINK_STOPWORD' : false,
          developer: option.checks.LINK_STOPWORD.developer || false,
        });
      }
    } else if (error[1] !== null || matchedSymbol !== null) {
      // Contains warning words.
      if (option.checks.LINK_BEST_PRACTICES) {
        const stopword = matchedSymbol || error[1];
        results.push({
          element: $el,
          type: option.checks.LINK_BEST_PRACTICES.type || 'warning',
          content: option.checks.LINK_BEST_PRACTICES.content || Lang.sprintf('LINK_BEST_PRACTICES', stopword),
          inline: true,
          position: 'beforebegin',
          dismiss: prepareDismissal(`LINK${href + linkTextTrimmed}`),
          dismissAll: option.checks.LINK_BEST_PRACTICES.dismissAll ? 'LINK_BEST_PRACTICES' : false,
          developer: option.checks.LINK_BEST_PRACTICES.developer || false,
        });
      }
    } else if (error[2] !== null) {
      // Contains DOI URL in link text.
      if (linkText.length > 8) {
        if (option.checks.LINK_DOI) {
          results.push({
            element: $el,
            type: option.checks.LINK_DOI.type || 'warning',
            content: option.checks.LINK_DOI.content || Lang.sprintf('LINK_DOI'),
            inline: true,
            position: 'beforebegin',
            dismiss: prepareDismissal(`LINK${href + linkTextTrimmed}`),
            dismissAll: option.checks.LINK_DOI.dismissAll ? 'LINK_DOI' : false,
            developer: option.checks.LINK_DOI.developer || false,
          });
        }
      }
    } else if (error[3] !== null) {
      // Contains URL in link text.
      if (linkText.length > option.URLTextMaxCharLength) {
        if (option.checks.LINK_URL) {
          results.push({
            element: $el,
            type: option.checks.LINK_URL.type || 'warning',
            content: option.checks.LINK_URL.content || Lang.sprintf('LINK_URL'),
            inline: true,
            position: 'beforebegin',
            dismiss: prepareDismissal(`LINK${href + linkTextTrimmed}`),
            dismissAll: option.checks.LINK_URL.dismissAll ? 'LINK_URL' : false,
            developer: option.checks.LINK_URL.developer || false,
          });
        }
      }
    } else if (hasAria) {
      // Button must have visible label as part of their accessible name.
      const isVisibleTextInAccessibleName$1 = isVisibleTextInAccessibleName($el);
      if (option.checks.LABEL_IN_NAME && isVisibleTextInAccessibleName$1 && $el.textContent.length !== 0) {
        const sanitizedText = sanitizeHTML(accName);
        results.push({
          element: $el,
          type: option.checks.LABEL_IN_NAME.type || 'warning',
          content: option.checks.LABEL_IN_NAME.content || `${Lang.sprintf('LABEL_IN_NAME', sanitizedText)}`,
          inline: true,
          position: 'afterend',
          dismiss: prepareDismissal(`LINK${href + linkTextTrimmed}`),
          dismissAll: option.checks.LABEL_IN_NAME.dismissAll ? 'BTN_LABEL_IN_NAME' : false,
          developer: option.checks.LABEL_IN_NAME.developer || true,
        });
      } else if (option.checks.LINK_LABEL) {
        // If the link has any ARIA, append a "Good" link button.
        const sanitizedText = sanitizeHTML(linkText);
        results.push({
          element: $el,
          type: option.checks.LINK_LABEL.type || 'good',
          content: option.checks.LINK_LABEL.content || `${Lang.sprintf('ACC_NAME', sanitizedText)} ${Lang.sprintf('ACC_NAME_TIP')}`,
          inline: true,
          position: 'afterend',
          dismiss: prepareDismissal(`LINKGOOD${href + linkTextTrimmed}`),
          dismissAll: option.checks.LINK_LABEL.dismissAll ? 'LINK_LABEL' : false,
          developer: option.checks.LINK_LABEL.developer || false,
        });
      }
    } else if (isSingleSpecialChar) {
      // Link is ONLY a period, comma, or special character.
      if (option.checks.LINK_EMPTY) {
        results.push({
          element: $el,
          type: option.checks.LINK_EMPTY.type || 'error',
          content: option.checks.LINK_EMPTY.content || Lang.sprintf('LINK_EMPTY'),
          inline: true,
          position: 'afterend',
          dismiss: prepareDismissal(`LINK${href}`),
          dismissAll: option.checks.LINK_EMPTY.dismissAll ? 'LINK_EMPTY' : false,
          developer: option.checks.LINK_EMPTY.developer || false,
        });
      }
    }

    /* LINKS developer */
    if (option.linksAdvancedPlugin) {
      if (linkTextTrimmed.length !== 0) {
        // Links with identical accessible names have equivalent purpose.
        if (seen[linkTextTrimmed] && !seen[href]) {
          // Link has identical name as another link.
          if (option.checks.LINK_IDENTICAL_NAME) {
            const sanitizedText = sanitizeHTML(linkText);
            results.push({
              element: $el,
              type: option.checks.LINK_IDENTICAL_NAME.type || 'warning',
              content: option.checks.LINK_IDENTICAL_NAME.content || `${Lang.sprintf('LINK_IDENTICAL_NAME', sanitizedText)} ${Lang.sprintf('ACC_NAME_TIP')}`,
              inline: true,
              position: 'beforebegin',
              dismiss: prepareDismissal(`LINK${href + linkTextTrimmed}`),
              dismissAll: option.checks.LINK_IDENTICAL_NAME.dismissAll ? 'LINK_IDENTICAL_NAME' : false,
              developer: option.checks.LINK_IDENTICAL_NAME.developer || false,
            });
          }
        } else if ($el.getAttribute('target') === '_blank' && !fileTypeMatch && !containsNewWindowPhrases) {
          if (option.checks.LINK_NEW_TAB) {
            results.push({
              element: $el,
              type: option.checks.LINK_NEW_TAB.type || 'warning',
              content: option.checks.LINK_NEW_TAB.content || Lang.sprintf('LINK_NEW_TAB'),
              inline: true,
              position: 'beforebegin',
              dismiss: prepareDismissal(`LINK${href + linkTextTrimmed}`),
              dismissAll: option.checks.LINK_NEW_TAB.dismissAll ? 'LINK_NEW_TAB' : false,
              developer: option.checks.LINK_NEW_TAB.developer || false,
            });
          }
        } else if (fileTypeMatch && !containsFileTypePhrases) {
          if (option.checks.LINK_FILE_EXT) {
            results.push({
              element: $el,
              type: option.checks.LINK_FILE_EXT.type || 'warning',
              content: option.checks.LINK_FILE_EXT.content || Lang.sprintf('LINK_FILE_EXT'),
              inline: true,
              position: 'beforebegin',
              dismiss: prepareDismissal(`LINK${href + linkTextTrimmed}`),
              dismissAll: option.checks.LINK_FILE_EXT.dismissAll ? 'LINK_FILE_EXT' : false,
              developer: option.checks.LINK_FILE_EXT.developer || false,
            });
          }
        } else {
          seen[linkTextTrimmed] = true;
          seen[href] = true;
        }
      }
    }
  });
  return results;
}

const { min: min$4, max: max$4 } = Math;

var limit = (x, low = 0, high = 1) => {
    return min$4(max$4(low, x), high);
};

var clip_rgb = (rgb) => {
    rgb._clipped = false;
    rgb._unclipped = rgb.slice(0);
    for (let i = 0; i <= 3; i++) {
        if (i < 3) {
            if (rgb[i] < 0 || rgb[i] > 255) rgb._clipped = true;
            rgb[i] = limit(rgb[i], 0, 255);
        } else if (i === 3) {
            rgb[i] = limit(rgb[i], 0, 1);
        }
    }
    return rgb;
};

// ported from jQuery's $.type
const classToType = {};
for (let name of [
    'Boolean',
    'Number',
    'String',
    'Function',
    'Array',
    'Date',
    'RegExp',
    'Undefined',
    'Null'
]) {
    classToType[`[object ${name}]`] = name.toLowerCase();
}
function type (obj) {
    return classToType[Object.prototype.toString.call(obj)] || 'object';
}

var unpack = (args, keyOrder = null) => {
    // if called with more than 3 arguments, we return the arguments
    if (args.length >= 3) return Array.prototype.slice.call(args);
    // with less than 3 args we check if first arg is object
    // and use the keyOrder string to extract and sort properties
    if (type(args[0]) == 'object' && keyOrder) {
        return keyOrder
            .split('')
            .filter((k) => args[0][k] !== undefined)
            .map((k) => args[0][k]);
    }
    // otherwise we just return the first argument
    // (which we suppose is an array of args)
    return args[0].slice(0);
};

var last = (args) => {
    if (args.length < 2) return null;
    const l = args.length - 1;
    if (type(args[l]) == 'string') return args[l].toLowerCase();
    return null;
};

const { PI: PI$2, min: min$3, max: max$3 } = Math;

const rnd2 = (a) => Math.round(a * 100) / 100;
const rnd3 = (a) => Math.round(a * 100) / 100;

const TWOPI = PI$2 * 2;
const PITHIRD = PI$2 / 3;
const DEG2RAD = PI$2 / 180;
const RAD2DEG = 180 / PI$2;

var input = {
    format: {},
    autodetect: []
};

class Color {
    constructor(...args) {
        const me = this;
        if (
            type(args[0]) === 'object' &&
            args[0].constructor &&
            args[0].constructor === this.constructor
        ) {
            // the argument is already a Color instance
            return args[0];
        }
        // last argument could be the mode
        let mode = last(args);
        let autodetect = false;
        if (!mode) {
            autodetect = true;

            if (!input.sorted) {
                input.autodetect = input.autodetect.sort((a, b) => b.p - a.p);
                input.sorted = true;
            }

            // auto-detect format
            for (let chk of input.autodetect) {
                mode = chk.test(...args);
                if (mode) break;
            }
        }
        if (input.format[mode]) {
            const rgb = input.format[mode].apply(
                null,
                autodetect ? args : args.slice(0, -1)
            );
            me._rgb = clip_rgb(rgb);
        } else {
            throw new Error('unknown format: ' + args);
        }
        // add alpha channel
        if (me._rgb.length === 3) me._rgb.push(1);
    }
    toString() {
        if (type(this.hex) == 'function') return this.hex();
        return `[${this._rgb.join(',')}]`;
    }
}

// this gets updated automatically
const version = '3.1.1';

const chroma = (...args) => {
    return new Color(...args);
};

chroma.version = version;

/**
	X11 color names

	http://www.w3.org/TR/css3-color/#svg-color
*/

const w3cx11 = {
    aliceblue: '#f0f8ff',
    antiquewhite: '#faebd7',
    aqua: '#00ffff',
    aquamarine: '#7fffd4',
    azure: '#f0ffff',
    beige: '#f5f5dc',
    bisque: '#ffe4c4',
    black: '#000000',
    blanchedalmond: '#ffebcd',
    blue: '#0000ff',
    blueviolet: '#8a2be2',
    brown: '#a52a2a',
    burlywood: '#deb887',
    cadetblue: '#5f9ea0',
    chartreuse: '#7fff00',
    chocolate: '#d2691e',
    coral: '#ff7f50',
    cornflowerblue: '#6495ed',
    cornsilk: '#fff8dc',
    crimson: '#dc143c',
    cyan: '#00ffff',
    darkblue: '#00008b',
    darkcyan: '#008b8b',
    darkgoldenrod: '#b8860b',
    darkgray: '#a9a9a9',
    darkgreen: '#006400',
    darkgrey: '#a9a9a9',
    darkkhaki: '#bdb76b',
    darkmagenta: '#8b008b',
    darkolivegreen: '#556b2f',
    darkorange: '#ff8c00',
    darkorchid: '#9932cc',
    darkred: '#8b0000',
    darksalmon: '#e9967a',
    darkseagreen: '#8fbc8f',
    darkslateblue: '#483d8b',
    darkslategray: '#2f4f4f',
    darkslategrey: '#2f4f4f',
    darkturquoise: '#00ced1',
    darkviolet: '#9400d3',
    deeppink: '#ff1493',
    deepskyblue: '#00bfff',
    dimgray: '#696969',
    dimgrey: '#696969',
    dodgerblue: '#1e90ff',
    firebrick: '#b22222',
    floralwhite: '#fffaf0',
    forestgreen: '#228b22',
    fuchsia: '#ff00ff',
    gainsboro: '#dcdcdc',
    ghostwhite: '#f8f8ff',
    gold: '#ffd700',
    goldenrod: '#daa520',
    gray: '#808080',
    green: '#008000',
    greenyellow: '#adff2f',
    grey: '#808080',
    honeydew: '#f0fff0',
    hotpink: '#ff69b4',
    indianred: '#cd5c5c',
    indigo: '#4b0082',
    ivory: '#fffff0',
    khaki: '#f0e68c',
    laserlemon: '#ffff54',
    lavender: '#e6e6fa',
    lavenderblush: '#fff0f5',
    lawngreen: '#7cfc00',
    lemonchiffon: '#fffacd',
    lightblue: '#add8e6',
    lightcoral: '#f08080',
    lightcyan: '#e0ffff',
    lightgoldenrod: '#fafad2',
    lightgoldenrodyellow: '#fafad2',
    lightgray: '#d3d3d3',
    lightgreen: '#90ee90',
    lightgrey: '#d3d3d3',
    lightpink: '#ffb6c1',
    lightsalmon: '#ffa07a',
    lightseagreen: '#20b2aa',
    lightskyblue: '#87cefa',
    lightslategray: '#778899',
    lightslategrey: '#778899',
    lightsteelblue: '#b0c4de',
    lightyellow: '#ffffe0',
    lime: '#00ff00',
    limegreen: '#32cd32',
    linen: '#faf0e6',
    magenta: '#ff00ff',
    maroon: '#800000',
    maroon2: '#7f0000',
    maroon3: '#b03060',
    mediumaquamarine: '#66cdaa',
    mediumblue: '#0000cd',
    mediumorchid: '#ba55d3',
    mediumpurple: '#9370db',
    mediumseagreen: '#3cb371',
    mediumslateblue: '#7b68ee',
    mediumspringgreen: '#00fa9a',
    mediumturquoise: '#48d1cc',
    mediumvioletred: '#c71585',
    midnightblue: '#191970',
    mintcream: '#f5fffa',
    mistyrose: '#ffe4e1',
    moccasin: '#ffe4b5',
    navajowhite: '#ffdead',
    navy: '#000080',
    oldlace: '#fdf5e6',
    olive: '#808000',
    olivedrab: '#6b8e23',
    orange: '#ffa500',
    orangered: '#ff4500',
    orchid: '#da70d6',
    palegoldenrod: '#eee8aa',
    palegreen: '#98fb98',
    paleturquoise: '#afeeee',
    palevioletred: '#db7093',
    papayawhip: '#ffefd5',
    peachpuff: '#ffdab9',
    peru: '#cd853f',
    pink: '#ffc0cb',
    plum: '#dda0dd',
    powderblue: '#b0e0e6',
    purple: '#800080',
    purple2: '#7f007f',
    purple3: '#a020f0',
    rebeccapurple: '#663399',
    red: '#ff0000',
    rosybrown: '#bc8f8f',
    royalblue: '#4169e1',
    saddlebrown: '#8b4513',
    salmon: '#fa8072',
    sandybrown: '#f4a460',
    seagreen: '#2e8b57',
    seashell: '#fff5ee',
    sienna: '#a0522d',
    silver: '#c0c0c0',
    skyblue: '#87ceeb',
    slateblue: '#6a5acd',
    slategray: '#708090',
    slategrey: '#708090',
    snow: '#fffafa',
    springgreen: '#00ff7f',
    steelblue: '#4682b4',
    tan: '#d2b48c',
    teal: '#008080',
    thistle: '#d8bfd8',
    tomato: '#ff6347',
    turquoise: '#40e0d0',
    violet: '#ee82ee',
    wheat: '#f5deb3',
    white: '#ffffff',
    whitesmoke: '#f5f5f5',
    yellow: '#ffff00',
    yellowgreen: '#9acd32'
};

const RE_HEX = /^#?([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/;
const RE_HEXA = /^#?([A-Fa-f0-9]{8}|[A-Fa-f0-9]{4})$/;

const hex2rgb = (hex) => {
    if (hex.match(RE_HEX)) {
        // remove optional leading #
        if (hex.length === 4 || hex.length === 7) {
            hex = hex.substr(1);
        }
        // expand short-notation to full six-digit
        if (hex.length === 3) {
            hex = hex.split('');
            hex = hex[0] + hex[0] + hex[1] + hex[1] + hex[2] + hex[2];
        }
        const u = parseInt(hex, 16);
        const r = u >> 16;
        const g = (u >> 8) & 0xff;
        const b = u & 0xff;
        return [r, g, b, 1];
    }

    // match rgba hex format, eg #FF000077
    if (hex.match(RE_HEXA)) {
        if (hex.length === 5 || hex.length === 9) {
            // remove optional leading #
            hex = hex.substr(1);
        }
        // expand short-notation to full eight-digit
        if (hex.length === 4) {
            hex = hex.split('');
            hex =
                hex[0] +
                hex[0] +
                hex[1] +
                hex[1] +
                hex[2] +
                hex[2] +
                hex[3] +
                hex[3];
        }
        const u = parseInt(hex, 16);
        const r = (u >> 24) & 0xff;
        const g = (u >> 16) & 0xff;
        const b = (u >> 8) & 0xff;
        const a = Math.round(((u & 0xff) / 0xff) * 100) / 100;
        return [r, g, b, a];
    }

    // we used to check for css colors here
    // if _input.css? and rgb = _input.css hex
    //     return rgb

    throw new Error(`unknown hex color: ${hex}`);
};

const { round: round$5 } = Math;

const rgb2hex = (...args) => {
    let [r, g, b, a] = unpack(args, 'rgba');
    let mode = last(args) || 'auto';
    if (a === undefined) a = 1;
    if (mode === 'auto') {
        mode = a < 1 ? 'rgba' : 'rgb';
    }
    r = round$5(r);
    g = round$5(g);
    b = round$5(b);
    const u = (r << 16) | (g << 8) | b;
    let str = '000000' + u.toString(16); //#.toUpperCase();
    str = str.substr(str.length - 6);
    let hxa = '0' + round$5(a * 255).toString(16);
    hxa = hxa.substr(hxa.length - 2);
    switch (mode.toLowerCase()) {
        case 'rgba':
            return `#${str}${hxa}`;
        case 'argb':
            return `#${hxa}${str}`;
        default:
            return `#${str}`;
    }
};

Color.prototype.name = function () {
    const hex = rgb2hex(this._rgb, 'rgb');
    for (let n of Object.keys(w3cx11)) {
        if (w3cx11[n] === hex) return n.toLowerCase();
    }
    return hex;
};

input.format.named = (name) => {
    name = name.toLowerCase();
    if (w3cx11[name]) return hex2rgb(w3cx11[name]);
    throw new Error('unknown color name: ' + name);
};

input.autodetect.push({
    p: 5,
    test: (h, ...rest) => {
        if (!rest.length && type(h) === 'string' && w3cx11[h.toLowerCase()]) {
            return 'named';
        }
    }
});

Color.prototype.alpha = function (a, mutate = false) {
    if (a !== undefined && type(a) === 'number') {
        if (mutate) {
            this._rgb[3] = a;
            return this;
        }
        return new Color([this._rgb[0], this._rgb[1], this._rgb[2], a], 'rgb');
    }
    return this._rgb[3];
};

Color.prototype.clipped = function () {
    return this._rgb._clipped || false;
};

const labConstants = {
    // Corresponds roughly to RGB brighter/darker
    Kn: 18,

    // D65 standard referent
    labWhitePoint: 'd65',
    Xn: 0.95047,
    Yn: 1,
    Zn: 1.08883,

    t0: 0.137931034, // 4 / 29
    t1: 0.206896552, // 6 / 29
    t2: 0.12841855, // 3 * t1 * t1
    t3: 0.008856452, // t1 * t1 * t1,

    kE: 216.0 / 24389.0,
    kKE: 8.0,
    kK: 24389.0 / 27.0,

    RefWhiteRGB: {
        // sRGB
        X: 0.95047,
        Y: 1,
        Z: 1.08883
    },

    MtxRGB2XYZ: {
        m00: 0.4124564390896922,
        m01: 0.21267285140562253,
        m02: 0.0193338955823293,
        m10: 0.357576077643909,
        m11: 0.715152155287818,
        m12: 0.11919202588130297,
        m20: 0.18043748326639894,
        m21: 0.07217499330655958,
        m22: 0.9503040785363679
    },

    MtxXYZ2RGB: {
        m00: 3.2404541621141045,
        m01: -0.9692660305051868,
        m02: 0.055643430959114726,
        m10: -1.5371385127977166,
        m11: 1.8760108454466942,
        m12: -0.2040259135167538,
        m20: -0.498531409556016,
        m21: 0.041556017530349834,
        m22: 1.0572251882231791
    },

    // used in rgb2xyz
    As: 0.9414285350000001,
    Bs: 1.040417467,
    Cs: 1.089532651,

    MtxAdaptMa: {
        m00: 0.8951,
        m01: -0.7502,
        m02: 0.0389,
        m10: 0.2664,
        m11: 1.7135,
        m12: -0.0685,
        m20: -0.1614,
        m21: 0.0367,
        m22: 1.0296
    },

    MtxAdaptMaI: {
        m00: 0.9869929054667123,
        m01: 0.43230526972339456,
        m02: -0.008528664575177328,
        m10: -0.14705425642099013,
        m11: 0.5183602715367776,
        m12: 0.04004282165408487,
        m20: 0.15996265166373125,
        m21: 0.0492912282128556,
        m22: 0.9684866957875502
    }
};

// taken from https://de.mathworks.com/help/images/ref/whitepoint.html
const ILLUMINANTS = new Map([
    // ASTM E308-01
    ['a', [1.0985, 0.35585]],
    // Wyszecki & Stiles, p. 769
    ['b', [1.0985, 0.35585]],
    // C ASTM E308-01
    ['c', [0.98074, 1.18232]],
    // D50 (ASTM E308-01)
    ['d50', [0.96422, 0.82521]],
    // D55 (ASTM E308-01)
    ['d55', [0.95682, 0.92149]],
    // D65 (ASTM E308-01)
    ['d65', [0.95047, 1.08883]],
    // E (ASTM E308-01)
    ['e', [1, 1, 1]],
    // F2 (ASTM E308-01)
    ['f2', [0.99186, 0.67393]],
    // F7 (ASTM E308-01)
    ['f7', [0.95041, 1.08747]],
    // F11 (ASTM E308-01)
    ['f11', [1.00962, 0.6435]],
    ['icc', [0.96422, 0.82521]]
]);

function setLabWhitePoint(name) {
    const ill = ILLUMINANTS.get(String(name).toLowerCase());
    if (!ill) {
        throw new Error('unknown Lab illuminant ' + name);
    }
    labConstants.labWhitePoint = name;
    labConstants.Xn = ill[0];
    labConstants.Zn = ill[1];
}

function getLabWhitePoint() {
    return labConstants.labWhitePoint;
}

/*
 * L* [0..100]
 * a [-100..100]
 * b [-100..100]
 */
const lab2rgb = (...args) => {
    args = unpack(args, 'lab');
    const [L, a, b] = args;
    const [x, y, z] = lab2xyz(L, a, b);
    const [r, g, b_] = xyz2rgb(x, y, z);
    return [r, g, b_, args.length > 3 ? args[3] : 1];
};

const lab2xyz = (L, a, b) => {
    const { kE, kK, kKE, Xn, Yn, Zn } = labConstants;

    const fy = (L + 16.0) / 116.0;
    const fx = 0.002 * a + fy;
    const fz = fy - 0.005 * b;

    const fx3 = fx * fx * fx;
    const fz3 = fz * fz * fz;

    const xr = fx3 > kE ? fx3 : (116.0 * fx - 16.0) / kK;
    const yr = L > kKE ? Math.pow((L + 16.0) / 116.0, 3.0) : L / kK;
    const zr = fz3 > kE ? fz3 : (116.0 * fz - 16.0) / kK;

    const x = xr * Xn;
    const y = yr * Yn;
    const z = zr * Zn;

    return [x, y, z];
};

const compand = (linear) => {
    /* sRGB */
    const sign = Math.sign(linear);
    linear = Math.abs(linear);
    return (
        (linear <= 0.0031308
            ? linear * 12.92
            : 1.055 * Math.pow(linear, 1.0 / 2.4) - 0.055) * sign
    );
};

const xyz2rgb = (x, y, z) => {
    const { MtxAdaptMa, MtxAdaptMaI, MtxXYZ2RGB, RefWhiteRGB, Xn, Yn, Zn } =
        labConstants;

    const As = Xn * MtxAdaptMa.m00 + Yn * MtxAdaptMa.m10 + Zn * MtxAdaptMa.m20;
    const Bs = Xn * MtxAdaptMa.m01 + Yn * MtxAdaptMa.m11 + Zn * MtxAdaptMa.m21;
    const Cs = Xn * MtxAdaptMa.m02 + Yn * MtxAdaptMa.m12 + Zn * MtxAdaptMa.m22;

    const Ad =
        RefWhiteRGB.X * MtxAdaptMa.m00 +
        RefWhiteRGB.Y * MtxAdaptMa.m10 +
        RefWhiteRGB.Z * MtxAdaptMa.m20;
    const Bd =
        RefWhiteRGB.X * MtxAdaptMa.m01 +
        RefWhiteRGB.Y * MtxAdaptMa.m11 +
        RefWhiteRGB.Z * MtxAdaptMa.m21;
    const Cd =
        RefWhiteRGB.X * MtxAdaptMa.m02 +
        RefWhiteRGB.Y * MtxAdaptMa.m12 +
        RefWhiteRGB.Z * MtxAdaptMa.m22;

    const X1 =
        (x * MtxAdaptMa.m00 + y * MtxAdaptMa.m10 + z * MtxAdaptMa.m20) *
        (Ad / As);
    const Y1 =
        (x * MtxAdaptMa.m01 + y * MtxAdaptMa.m11 + z * MtxAdaptMa.m21) *
        (Bd / Bs);
    const Z1 =
        (x * MtxAdaptMa.m02 + y * MtxAdaptMa.m12 + z * MtxAdaptMa.m22) *
        (Cd / Cs);

    const X2 =
        X1 * MtxAdaptMaI.m00 + Y1 * MtxAdaptMaI.m10 + Z1 * MtxAdaptMaI.m20;
    const Y2 =
        X1 * MtxAdaptMaI.m01 + Y1 * MtxAdaptMaI.m11 + Z1 * MtxAdaptMaI.m21;
    const Z2 =
        X1 * MtxAdaptMaI.m02 + Y1 * MtxAdaptMaI.m12 + Z1 * MtxAdaptMaI.m22;

    const r = compand(
        X2 * MtxXYZ2RGB.m00 + Y2 * MtxXYZ2RGB.m10 + Z2 * MtxXYZ2RGB.m20
    );
    const g = compand(
        X2 * MtxXYZ2RGB.m01 + Y2 * MtxXYZ2RGB.m11 + Z2 * MtxXYZ2RGB.m21
    );
    const b = compand(
        X2 * MtxXYZ2RGB.m02 + Y2 * MtxXYZ2RGB.m12 + Z2 * MtxXYZ2RGB.m22
    );

    return [r * 255, g * 255, b * 255];
};

const rgb2lab = (...args) => {
    const [r, g, b, ...rest] = unpack(args, 'rgb');
    const [x, y, z] = rgb2xyz(r, g, b);
    const [L, a, b_] = xyz2lab(x, y, z);
    return [L, a, b_, ...(rest.length > 0 && rest[0] < 1 ? [rest[0]] : [])];
};

function xyz2lab(x, y, z) {
    const { Xn, Yn, Zn, kE, kK } = labConstants;
    const xr = x / Xn;
    const yr = y / Yn;
    const zr = z / Zn;

    const fx = xr > kE ? Math.pow(xr, 1.0 / 3.0) : (kK * xr + 16.0) / 116.0;
    const fy = yr > kE ? Math.pow(yr, 1.0 / 3.0) : (kK * yr + 16.0) / 116.0;
    const fz = zr > kE ? Math.pow(zr, 1.0 / 3.0) : (kK * zr + 16.0) / 116.0;

    return [116.0 * fy - 16.0, 500.0 * (fx - fy), 200.0 * (fy - fz)];
}

function gammaAdjustSRGB(companded) {
    const sign = Math.sign(companded);
    companded = Math.abs(companded);
    const linear =
        companded <= 0.04045
            ? companded / 12.92
            : Math.pow((companded + 0.055) / 1.055, 2.4);
    return linear * sign;
}

const rgb2xyz = (r, g, b) => {
    // normalize and gamma adjust
    r = gammaAdjustSRGB(r / 255);
    g = gammaAdjustSRGB(g / 255);
    b = gammaAdjustSRGB(b / 255);

    const { MtxRGB2XYZ, MtxAdaptMa, MtxAdaptMaI, Xn, Yn, Zn, As, Bs, Cs } =
        labConstants;

    let x = r * MtxRGB2XYZ.m00 + g * MtxRGB2XYZ.m10 + b * MtxRGB2XYZ.m20;
    let y = r * MtxRGB2XYZ.m01 + g * MtxRGB2XYZ.m11 + b * MtxRGB2XYZ.m21;
    let z = r * MtxRGB2XYZ.m02 + g * MtxRGB2XYZ.m12 + b * MtxRGB2XYZ.m22;

    const Ad = Xn * MtxAdaptMa.m00 + Yn * MtxAdaptMa.m10 + Zn * MtxAdaptMa.m20;
    const Bd = Xn * MtxAdaptMa.m01 + Yn * MtxAdaptMa.m11 + Zn * MtxAdaptMa.m21;
    const Cd = Xn * MtxAdaptMa.m02 + Yn * MtxAdaptMa.m12 + Zn * MtxAdaptMa.m22;

    let X = x * MtxAdaptMa.m00 + y * MtxAdaptMa.m10 + z * MtxAdaptMa.m20;
    let Y = x * MtxAdaptMa.m01 + y * MtxAdaptMa.m11 + z * MtxAdaptMa.m21;
    let Z = x * MtxAdaptMa.m02 + y * MtxAdaptMa.m12 + z * MtxAdaptMa.m22;

    X *= Ad / As;
    Y *= Bd / Bs;
    Z *= Cd / Cs;

    x = X * MtxAdaptMaI.m00 + Y * MtxAdaptMaI.m10 + Z * MtxAdaptMaI.m20;
    y = X * MtxAdaptMaI.m01 + Y * MtxAdaptMaI.m11 + Z * MtxAdaptMaI.m21;
    z = X * MtxAdaptMaI.m02 + Y * MtxAdaptMaI.m12 + Z * MtxAdaptMaI.m22;

    return [x, y, z];
};

Color.prototype.lab = function () {
    return rgb2lab(this._rgb);
};

const lab$1 = (...args) => new Color(...args, 'lab');
Object.assign(chroma, { lab: lab$1, getLabWhitePoint, setLabWhitePoint });

input.format.lab = lab2rgb;

input.autodetect.push({
    p: 2,
    test: (...args) => {
        args = unpack(args, 'lab');
        if (type(args) === 'array' && args.length === 3) {
            return 'lab';
        }
    }
});

Color.prototype.darken = function (amount = 1) {
    const me = this;
    const lab = me.lab();
    lab[0] -= labConstants.Kn * amount;
    return new Color(lab, 'lab').alpha(me.alpha(), true);
};

Color.prototype.brighten = function (amount = 1) {
    return this.darken(-amount);
};

Color.prototype.darker = Color.prototype.darken;
Color.prototype.brighter = Color.prototype.brighten;

Color.prototype.get = function (mc) {
    const [mode, channel] = mc.split('.');
    const src = this[mode]();
    if (channel) {
        const i = mode.indexOf(channel) - (mode.substr(0, 2) === 'ok' ? 2 : 0);
        if (i > -1) return src[i];
        throw new Error(`unknown channel ${channel} in mode ${mode}`);
    } else {
        return src;
    }
};

const { pow: pow$6 } = Math;

const EPS = 1e-7;
const MAX_ITER = 20;

Color.prototype.luminance = function (lum, mode = 'rgb') {
    if (lum !== undefined && type(lum) === 'number') {
        if (lum === 0) {
            // return pure black
            return new Color([0, 0, 0, this._rgb[3]], 'rgb');
        }
        if (lum === 1) {
            // return pure white
            return new Color([255, 255, 255, this._rgb[3]], 'rgb');
        }
        // compute new color using...
        let cur_lum = this.luminance();
        let max_iter = MAX_ITER;

        const test = (low, high) => {
            const mid = low.interpolate(high, 0.5, mode);
            const lm = mid.luminance();
            if (Math.abs(lum - lm) < EPS || !max_iter--) {
                // close enough
                return mid;
            }
            return lm > lum ? test(low, mid) : test(mid, high);
        };

        const rgb = (
            cur_lum > lum
                ? test(new Color([0, 0, 0]), this)
                : test(this, new Color([255, 255, 255]))
        ).rgb();
        return new Color([...rgb, this._rgb[3]]);
    }
    return rgb2luminance(...this._rgb.slice(0, 3));
};

const rgb2luminance = (r, g, b) => {
    // relative luminance
    // see http://www.w3.org/TR/2008/REC-WCAG20-20081211/#relativeluminancedef
    r = luminance_x(r);
    g = luminance_x(g);
    b = luminance_x(b);
    return 0.2126 * r + 0.7152 * g + 0.0722 * b;
};

const luminance_x = (x) => {
    x /= 255;
    return x <= 0.03928 ? x / 12.92 : pow$6((x + 0.055) / 1.055, 2.4);
};

var index = {};

var mix = (col1, col2, f = 0.5, ...rest) => {
    let mode = rest[0] || 'lrgb';
    if (!index[mode] && !rest.length) {
        // fall back to the first supported mode
        mode = Object.keys(index)[0];
    }
    if (!index[mode]) {
        throw new Error(`interpolation mode ${mode} is not defined`);
    }
    if (type(col1) !== 'object') col1 = new Color(col1);
    if (type(col2) !== 'object') col2 = new Color(col2);
    return index[mode](col1, col2, f).alpha(
        col1.alpha() + f * (col2.alpha() - col1.alpha())
    );
};

Color.prototype.mix = Color.prototype.interpolate = function (
    col2,
    f = 0.5,
    ...rest
) {
    return mix(this, col2, f, ...rest);
};

Color.prototype.premultiply = function (mutate = false) {
    const rgb = this._rgb;
    const a = rgb[3];
    if (mutate) {
        this._rgb = [rgb[0] * a, rgb[1] * a, rgb[2] * a, a];
        return this;
    } else {
        return new Color([rgb[0] * a, rgb[1] * a, rgb[2] * a, a], 'rgb');
    }
};

const { sin: sin$3, cos: cos$4 } = Math;

const lch2lab = (...args) => {
    /*
    Convert from a qualitative parameter h and a quantitative parameter l to a 24-bit pixel.
    These formulas were invented by David Dalrymple to obtain maximum contrast without going
    out of gamut if the parameters are in the range 0-1.

    A saturation multiplier was added by Gregor Aisch
    */
    let [l, c, h] = unpack(args, 'lch');
    if (isNaN(h)) h = 0;
    h = h * DEG2RAD;
    return [l, cos$4(h) * c, sin$3(h) * c];
};

const lch2rgb = (...args) => {
    args = unpack(args, 'lch');
    const [l, c, h] = args;
    const [L, a, b_] = lch2lab(l, c, h);
    const [r, g, b] = lab2rgb(L, a, b_);
    return [r, g, b, args.length > 3 ? args[3] : 1];
};

const hcl2rgb = (...args) => {
    const hcl = unpack(args, 'hcl').reverse();
    return lch2rgb(...hcl);
};

const { sqrt: sqrt$4, atan2: atan2$2, round: round$4 } = Math;

const lab2lch = (...args) => {
    const [l, a, b] = unpack(args, 'lab');
    const c = sqrt$4(a * a + b * b);
    let h = (atan2$2(b, a) * RAD2DEG + 360) % 360;
    if (round$4(c * 10000) === 0) h = Number.NaN;
    return [l, c, h];
};

const rgb2lch = (...args) => {
    const [r, g, b, ...rest] = unpack(args, 'rgb');
    const [l, a, b_] = rgb2lab(r, g, b);
    const [L, c, h] = lab2lch(l, a, b_);
    return [L, c, h, ...(rest.length > 0 && rest[0] < 1 ? [rest[0]] : [])];
};

Color.prototype.lch = function () {
    return rgb2lch(this._rgb);
};
Color.prototype.hcl = function () {
    return rgb2lch(this._rgb).reverse();
};

const lch$1 = (...args) => new Color(...args, 'lch');
const hcl = (...args) => new Color(...args, 'hcl');

Object.assign(chroma, { lch: lch$1, hcl });

input.format.lch = lch2rgb;
input.format.hcl = hcl2rgb;
['lch', 'hcl'].forEach((m) =>
    input.autodetect.push({
        p: 2,
        test: (...args) => {
            args = unpack(args, m);
            if (type(args) === 'array' && args.length === 3) {
                return m;
            }
        }
    })
);

Color.prototype.saturate = function (amount = 1) {
    const me = this;
    const lch = me.lch();
    lch[1] += labConstants.Kn * amount;
    if (lch[1] < 0) lch[1] = 0;
    return new Color(lch, 'lch').alpha(me.alpha(), true);
};

Color.prototype.desaturate = function (amount = 1) {
    return this.saturate(-amount);
};

Color.prototype.set = function (mc, value, mutate = false) {
    const [mode, channel] = mc.split('.');
    const src = this[mode]();
    if (channel) {
        const i = mode.indexOf(channel) - (mode.substr(0, 2) === 'ok' ? 2 : 0);
        if (i > -1) {
            if (type(value) == 'string') {
                switch (value.charAt(0)) {
                    case '+':
                        src[i] += +value;
                        break;
                    case '-':
                        src[i] += +value;
                        break;
                    case '*':
                        src[i] *= +value.substr(1);
                        break;
                    case '/':
                        src[i] /= +value.substr(1);
                        break;
                    default:
                        src[i] = +value;
                }
            } else if (type(value) === 'number') {
                src[i] = value;
            } else {
                throw new Error(`unsupported value for Color.set`);
            }
            const out = new Color(src, mode);
            if (mutate) {
                this._rgb = out._rgb;
                return this;
            }
            return out;
        }
        throw new Error(`unknown channel ${channel} in mode ${mode}`);
    } else {
        return src;
    }
};

Color.prototype.tint = function (f = 0.5, ...rest) {
    return mix(this, 'white', f, ...rest);
};

Color.prototype.shade = function (f = 0.5, ...rest) {
    return mix(this, 'black', f, ...rest);
};

const rgb$1 = (col1, col2, f) => {
    const xyz0 = col1._rgb;
    const xyz1 = col2._rgb;
    return new Color(
        xyz0[0] + f * (xyz1[0] - xyz0[0]),
        xyz0[1] + f * (xyz1[1] - xyz0[1]),
        xyz0[2] + f * (xyz1[2] - xyz0[2]),
        'rgb'
    );
};

// register interpolator
index.rgb = rgb$1;

const { sqrt: sqrt$3, pow: pow$5 } = Math;

const lrgb = (col1, col2, f) => {
    const [x1, y1, z1] = col1._rgb;
    const [x2, y2, z2] = col2._rgb;
    return new Color(
        sqrt$3(pow$5(x1, 2) * (1 - f) + pow$5(x2, 2) * f),
        sqrt$3(pow$5(y1, 2) * (1 - f) + pow$5(y2, 2) * f),
        sqrt$3(pow$5(z1, 2) * (1 - f) + pow$5(z2, 2) * f),
        'rgb'
    );
};

// register interpolator
index.lrgb = lrgb;

const lab = (col1, col2, f) => {
    const xyz0 = col1.lab();
    const xyz1 = col2.lab();
    return new Color(
        xyz0[0] + f * (xyz1[0] - xyz0[0]),
        xyz0[1] + f * (xyz1[1] - xyz0[1]),
        xyz0[2] + f * (xyz1[2] - xyz0[2]),
        'lab'
    );
};

// register interpolator
index.lab = lab;

var interpolate_hsx = (col1, col2, f, m) => {
    let xyz0, xyz1;
    if (m === 'hsl') {
        xyz0 = col1.hsl();
        xyz1 = col2.hsl();
    } else if (m === 'hsv') {
        xyz0 = col1.hsv();
        xyz1 = col2.hsv();
    } else if (m === 'hcg') {
        xyz0 = col1.hcg();
        xyz1 = col2.hcg();
    } else if (m === 'hsi') {
        xyz0 = col1.hsi();
        xyz1 = col2.hsi();
    } else if (m === 'lch' || m === 'hcl') {
        m = 'hcl';
        xyz0 = col1.hcl();
        xyz1 = col2.hcl();
    } else if (m === 'oklch') {
        xyz0 = col1.oklch().reverse();
        xyz1 = col2.oklch().reverse();
    }

    let hue0, hue1, sat0, sat1, lbv0, lbv1;
    if (m.substr(0, 1) === 'h' || m === 'oklch') {
        [hue0, sat0, lbv0] = xyz0;
        [hue1, sat1, lbv1] = xyz1;
    }

    let sat, hue, lbv, dh;

    if (!isNaN(hue0) && !isNaN(hue1)) {
        // both colors have hue
        if (hue1 > hue0 && hue1 - hue0 > 180) {
            dh = hue1 - (hue0 + 360);
        } else if (hue1 < hue0 && hue0 - hue1 > 180) {
            dh = hue1 + 360 - hue0;
        } else {
            dh = hue1 - hue0;
        }
        hue = hue0 + f * dh;
    } else if (!isNaN(hue0)) {
        hue = hue0;
        if ((lbv1 == 1 || lbv1 == 0) && m != 'hsv') sat = sat0;
    } else if (!isNaN(hue1)) {
        hue = hue1;
        if ((lbv0 == 1 || lbv0 == 0) && m != 'hsv') sat = sat1;
    } else {
        hue = Number.NaN;
    }

    if (sat === undefined) sat = sat0 + f * (sat1 - sat0);
    lbv = lbv0 + f * (lbv1 - lbv0);
    return m === 'oklch'
        ? new Color([lbv, sat, hue], m)
        : new Color([hue, sat, lbv], m);
};

const lch = (col1, col2, f) => {
    return interpolate_hsx(col1, col2, f, 'lch');
};

// register interpolator
index.lch = lch;
index.hcl = lch;

const num2rgb = (num) => {
    if (type(num) == 'number' && num >= 0 && num <= 0xffffff) {
        const r = num >> 16;
        const g = (num >> 8) & 0xff;
        const b = num & 0xff;
        return [r, g, b, 1];
    }
    throw new Error('unknown num color: ' + num);
};

const rgb2num = (...args) => {
    const [r, g, b] = unpack(args, 'rgb');
    return (r << 16) + (g << 8) + b;
};

Color.prototype.num = function () {
    return rgb2num(this._rgb);
};

const num$1 = (...args) => new Color(...args, 'num');

Object.assign(chroma, { num: num$1 });

input.format.num = num2rgb;

input.autodetect.push({
    p: 5,
    test: (...args) => {
        if (
            args.length === 1 &&
            type(args[0]) === 'number' &&
            args[0] >= 0 &&
            args[0] <= 0xffffff
        ) {
            return 'num';
        }
    }
});

const num = (col1, col2, f) => {
    const c1 = col1.num();
    const c2 = col2.num();
    return new Color(c1 + f * (c2 - c1), 'num');
};

// register interpolator
index.num = num;

const { floor: floor$3 } = Math;

/*
 * this is basically just HSV with some minor tweaks
 *
 * hue.. [0..360]
 * chroma .. [0..1]
 * grayness .. [0..1]
 */

const hcg2rgb = (...args) => {
    args = unpack(args, 'hcg');
    let [h, c, _g] = args;
    let r, g, b;
    _g = _g * 255;
    const _c = c * 255;
    if (c === 0) {
        r = g = b = _g;
    } else {
        if (h === 360) h = 0;
        if (h > 360) h -= 360;
        if (h < 0) h += 360;
        h /= 60;
        const i = floor$3(h);
        const f = h - i;
        const p = _g * (1 - c);
        const q = p + _c * (1 - f);
        const t = p + _c * f;
        const v = p + _c;
        switch (i) {
            case 0:
                [r, g, b] = [v, t, p];
                break;
            case 1:
                [r, g, b] = [q, v, p];
                break;
            case 2:
                [r, g, b] = [p, v, t];
                break;
            case 3:
                [r, g, b] = [p, q, v];
                break;
            case 4:
                [r, g, b] = [t, p, v];
                break;
            case 5:
                [r, g, b] = [v, p, q];
                break;
        }
    }
    return [r, g, b, args.length > 3 ? args[3] : 1];
};

const rgb2hcg = (...args) => {
    const [r, g, b] = unpack(args, 'rgb');
    const minRgb = min$3(r, g, b);
    const maxRgb = max$3(r, g, b);
    const delta = maxRgb - minRgb;
    const c = (delta * 100) / 255;
    const _g = (minRgb / (255 - delta)) * 100;
    let h;
    if (delta === 0) {
        h = Number.NaN;
    } else {
        if (r === maxRgb) h = (g - b) / delta;
        if (g === maxRgb) h = 2 + (b - r) / delta;
        if (b === maxRgb) h = 4 + (r - g) / delta;
        h *= 60;
        if (h < 0) h += 360;
    }
    return [h, c, _g];
};

Color.prototype.hcg = function () {
    return rgb2hcg(this._rgb);
};

const hcg$1 = (...args) => new Color(...args, 'hcg');
chroma.hcg = hcg$1;

input.format.hcg = hcg2rgb;

input.autodetect.push({
    p: 1,
    test: (...args) => {
        args = unpack(args, 'hcg');
        if (type(args) === 'array' && args.length === 3) {
            return 'hcg';
        }
    }
});

const hcg = (col1, col2, f) => {
    return interpolate_hsx(col1, col2, f, 'hcg');
};

// register interpolator
index.hcg = hcg;

const { cos: cos$3 } = Math;

/*
 * hue [0..360]
 * saturation [0..1]
 * intensity [0..1]
 */
const hsi2rgb = (...args) => {
    /*
    borrowed from here:
    http://hummer.stanford.edu/museinfo/doc/examples/humdrum/keyscape2/hsi2rgb.cpp
    */
    args = unpack(args, 'hsi');
    let [h, s, i] = args;
    let r, g, b;

    if (isNaN(h)) h = 0;
    if (isNaN(s)) s = 0;
    // normalize hue
    if (h > 360) h -= 360;
    if (h < 0) h += 360;
    h /= 360;
    if (h < 1 / 3) {
        b = (1 - s) / 3;
        r = (1 + (s * cos$3(TWOPI * h)) / cos$3(PITHIRD - TWOPI * h)) / 3;
        g = 1 - (b + r);
    } else if (h < 2 / 3) {
        h -= 1 / 3;
        r = (1 - s) / 3;
        g = (1 + (s * cos$3(TWOPI * h)) / cos$3(PITHIRD - TWOPI * h)) / 3;
        b = 1 - (r + g);
    } else {
        h -= 2 / 3;
        g = (1 - s) / 3;
        b = (1 + (s * cos$3(TWOPI * h)) / cos$3(PITHIRD - TWOPI * h)) / 3;
        r = 1 - (g + b);
    }
    r = limit(i * r * 3);
    g = limit(i * g * 3);
    b = limit(i * b * 3);
    return [r * 255, g * 255, b * 255, args.length > 3 ? args[3] : 1];
};

const { min: min$2, sqrt: sqrt$2, acos } = Math;

const rgb2hsi = (...args) => {
    /*
    borrowed from here:
    http://hummer.stanford.edu/museinfo/doc/examples/humdrum/keyscape2/rgb2hsi.cpp
    */
    let [r, g, b] = unpack(args, 'rgb');
    r /= 255;
    g /= 255;
    b /= 255;
    let h;
    const min_ = min$2(r, g, b);
    const i = (r + g + b) / 3;
    const s = i > 0 ? 1 - min_ / i : 0;
    if (s === 0) {
        h = NaN;
    } else {
        h = (r - g + (r - b)) / 2;
        h /= sqrt$2((r - g) * (r - g) + (r - b) * (g - b));
        h = acos(h);
        if (b > g) {
            h = TWOPI - h;
        }
        h /= TWOPI;
    }
    return [h * 360, s, i];
};

Color.prototype.hsi = function () {
    return rgb2hsi(this._rgb);
};

const hsi$1 = (...args) => new Color(...args, 'hsi');
chroma.hsi = hsi$1;

input.format.hsi = hsi2rgb;

input.autodetect.push({
    p: 2,
    test: (...args) => {
        args = unpack(args, 'hsi');
        if (type(args) === 'array' && args.length === 3) {
            return 'hsi';
        }
    }
});

const hsi = (col1, col2, f) => {
    return interpolate_hsx(col1, col2, f, 'hsi');
};

// register interpolator
index.hsi = hsi;

const hsl2rgb = (...args) => {
    args = unpack(args, 'hsl');
    const [h, s, l] = args;
    let r, g, b;
    if (s === 0) {
        r = g = b = l * 255;
    } else {
        const t3 = [0, 0, 0];
        const c = [0, 0, 0];
        const t2 = l < 0.5 ? l * (1 + s) : l + s - l * s;
        const t1 = 2 * l - t2;
        const h_ = h / 360;
        t3[0] = h_ + 1 / 3;
        t3[1] = h_;
        t3[2] = h_ - 1 / 3;
        for (let i = 0; i < 3; i++) {
            if (t3[i] < 0) t3[i] += 1;
            if (t3[i] > 1) t3[i] -= 1;
            if (6 * t3[i] < 1) c[i] = t1 + (t2 - t1) * 6 * t3[i];
            else if (2 * t3[i] < 1) c[i] = t2;
            else if (3 * t3[i] < 2) c[i] = t1 + (t2 - t1) * (2 / 3 - t3[i]) * 6;
            else c[i] = t1;
        }
        [r, g, b] = [c[0] * 255, c[1] * 255, c[2] * 255];
    }
    if (args.length > 3) {
        // keep alpha channel
        return [r, g, b, args[3]];
    }
    return [r, g, b, 1];
};

/*
 * supported arguments:
 * - rgb2hsl(r,g,b)
 * - rgb2hsl(r,g,b,a)
 * - rgb2hsl([r,g,b])
 * - rgb2hsl([r,g,b,a])
 * - rgb2hsl({r,g,b,a})
 */
const rgb2hsl$1 = (...args) => {
    args = unpack(args, 'rgba');
    let [r, g, b] = args;

    r /= 255;
    g /= 255;
    b /= 255;

    const minRgb = min$3(r, g, b);
    const maxRgb = max$3(r, g, b);

    const l = (maxRgb + minRgb) / 2;
    let s, h;

    if (maxRgb === minRgb) {
        s = 0;
        h = Number.NaN;
    } else {
        s =
            l < 0.5
                ? (maxRgb - minRgb) / (maxRgb + minRgb)
                : (maxRgb - minRgb) / (2 - maxRgb - minRgb);
    }

    if (r == maxRgb) h = (g - b) / (maxRgb - minRgb);
    else if (g == maxRgb) h = 2 + (b - r) / (maxRgb - minRgb);
    else if (b == maxRgb) h = 4 + (r - g) / (maxRgb - minRgb);

    h *= 60;
    if (h < 0) h += 360;
    if (args.length > 3 && args[3] !== undefined) return [h, s, l, args[3]];
    return [h, s, l];
};

Color.prototype.hsl = function () {
    return rgb2hsl$1(this._rgb);
};

const hsl$1 = (...args) => new Color(...args, 'hsl');
chroma.hsl = hsl$1;

input.format.hsl = hsl2rgb;

input.autodetect.push({
    p: 2,
    test: (...args) => {
        args = unpack(args, 'hsl');
        if (type(args) === 'array' && args.length === 3) {
            return 'hsl';
        }
    }
});

const hsl = (col1, col2, f) => {
    return interpolate_hsx(col1, col2, f, 'hsl');
};

// register interpolator
index.hsl = hsl;

const { floor: floor$2 } = Math;

const hsv2rgb = (...args) => {
    args = unpack(args, 'hsv');
    let [h, s, v] = args;
    let r, g, b;
    v *= 255;
    if (s === 0) {
        r = g = b = v;
    } else {
        if (h === 360) h = 0;
        if (h > 360) h -= 360;
        if (h < 0) h += 360;
        h /= 60;

        const i = floor$2(h);
        const f = h - i;
        const p = v * (1 - s);
        const q = v * (1 - s * f);
        const t = v * (1 - s * (1 - f));

        switch (i) {
            case 0:
                [r, g, b] = [v, t, p];
                break;
            case 1:
                [r, g, b] = [q, v, p];
                break;
            case 2:
                [r, g, b] = [p, v, t];
                break;
            case 3:
                [r, g, b] = [p, q, v];
                break;
            case 4:
                [r, g, b] = [t, p, v];
                break;
            case 5:
                [r, g, b] = [v, p, q];
                break;
        }
    }
    return [r, g, b, args.length > 3 ? args[3] : 1];
};

const { min: min$1, max: max$2 } = Math;

/*
 * supported arguments:
 * - rgb2hsv(r,g,b)
 * - rgb2hsv([r,g,b])
 * - rgb2hsv({r,g,b})
 */
const rgb2hsl = (...args) => {
    args = unpack(args, 'rgb');
    let [r, g, b] = args;
    const min_ = min$1(r, g, b);
    const max_ = max$2(r, g, b);
    const delta = max_ - min_;
    let h, s, v;
    v = max_ / 255.0;
    if (max_ === 0) {
        h = Number.NaN;
        s = 0;
    } else {
        s = delta / max_;
        if (r === max_) h = (g - b) / delta;
        if (g === max_) h = 2 + (b - r) / delta;
        if (b === max_) h = 4 + (r - g) / delta;
        h *= 60;
        if (h < 0) h += 360;
    }
    return [h, s, v];
};

Color.prototype.hsv = function () {
    return rgb2hsl(this._rgb);
};

const hsv$1 = (...args) => new Color(...args, 'hsv');
chroma.hsv = hsv$1;

input.format.hsv = hsv2rgb;

input.autodetect.push({
    p: 2,
    test: (...args) => {
        args = unpack(args, 'hsv');
        if (type(args) === 'array' && args.length === 3) {
            return 'hsv';
        }
    }
});

const hsv = (col1, col2, f) => {
    return interpolate_hsx(col1, col2, f, 'hsv');
};

// register interpolator
index.hsv = hsv;

// from https://www.w3.org/TR/css-color-4/multiply-matrices.js
function multiplyMatrices(A, B) {
    let m = A.length;

    if (!Array.isArray(A[0])) {
        // A is vector, convert to [[a, b, c, ...]]
        A = [A];
    }

    if (!Array.isArray(B[0])) {
        // B is vector, convert to [[a], [b], [c], ...]]
        B = B.map((x) => [x]);
    }

    let p = B[0].length;
    let B_cols = B[0].map((_, i) => B.map((x) => x[i])); // transpose B
    let product = A.map((row) =>
        B_cols.map((col) => {
            if (!Array.isArray(row)) {
                return col.reduce((a, c) => a + c * row, 0);
            }

            return row.reduce((a, c, i) => a + c * (col[i] || 0), 0);
        })
    );

    if (m === 1) {
        product = product[0]; // Avoid [[a, b, c, ...]]
    }

    if (p === 1) {
        return product.map((x) => x[0]); // Avoid [[a], [b], [c], ...]]
    }

    return product;
}

const oklab2rgb = (...args) => {
    args = unpack(args, 'lab');
    const [L, a, b, ...rest] = args;
    const [X, Y, Z] = OKLab_to_XYZ([L, a, b]);
    const [r, g, b_] = xyz2rgb(X, Y, Z);
    return [r, g, b_, ...(rest.length > 0 && rest[0] < 1 ? [rest[0]] : [])];
};

// from https://www.w3.org/TR/css-color-4/#color-conversion-code
function OKLab_to_XYZ(OKLab) {
    // Given OKLab, convert to XYZ relative to D65
    var LMStoXYZ = [
        [1.2268798758459243, -0.5578149944602171, 0.2813910456659647],
        [-0.0405757452148008, 1.112286803280317, -0.0717110580655164],
        [-0.0763729366746601, -0.4214933324022432, 1.5869240198367816]
    ];
    var OKLabtoLMS = [
        [1.0, 0.3963377773761749, 0.2158037573099136],
        [1.0, -0.1055613458156586, -0.0638541728258133],
        [1.0, -0.0894841775298119, -1.2914855480194092]
    ];

    var LMSnl = multiplyMatrices(OKLabtoLMS, OKLab);
    return multiplyMatrices(
        LMStoXYZ,
        LMSnl.map((c) => c ** 3)
    );
}

const rgb2oklab = (...args) => {
    const [r, g, b, ...rest] = unpack(args, 'rgb');
    const xyz = rgb2xyz(r, g, b);
    const oklab = XYZ_to_OKLab(xyz);
    return [...oklab, ...(rest.length > 0 && rest[0] < 1 ? [rest[0]] : [])];
};

// from https://www.w3.org/TR/css-color-4/#color-conversion-code
function XYZ_to_OKLab(XYZ) {
    // Given XYZ relative to D65, convert to OKLab
    const XYZtoLMS = [
        [0.819022437996703, 0.3619062600528904, -0.1288737815209879],
        [0.0329836539323885, 0.9292868615863434, 0.0361446663506424],
        [0.0481771893596242, 0.2642395317527308, 0.6335478284694309]
    ];
    const LMStoOKLab = [
        [0.210454268309314, 0.7936177747023054, -0.0040720430116193],
        [1.9779985324311684, -2.4285922420485799, 0.450593709617411],
        [0.0259040424655478, 0.7827717124575296, -0.8086757549230774]
    ];

    const LMS = multiplyMatrices(XYZtoLMS, XYZ);
    // JavaScript Math.cbrt returns a sign-matched cube root
    // beware if porting to other languages
    // especially if tempted to use a general power function
    return multiplyMatrices(
        LMStoOKLab,
        LMS.map((c) => Math.cbrt(c))
    );
    // L in range [0,1]. For use in CSS, multiply by 100 and add a percent
}

Color.prototype.oklab = function () {
    return rgb2oklab(this._rgb);
};

const oklab$1 = (...args) => new Color(...args, 'oklab');
Object.assign(chroma, { oklab: oklab$1 });

input.format.oklab = oklab2rgb;

input.autodetect.push({
    p: 2,
    test: (...args) => {
        args = unpack(args, 'oklab');
        if (type(args) === 'array' && args.length === 3) {
            return 'oklab';
        }
    }
});

const oklab = (col1, col2, f) => {
    const xyz0 = col1.oklab();
    const xyz1 = col2.oklab();
    return new Color(
        xyz0[0] + f * (xyz1[0] - xyz0[0]),
        xyz0[1] + f * (xyz1[1] - xyz0[1]),
        xyz0[2] + f * (xyz1[2] - xyz0[2]),
        'oklab'
    );
};

// register interpolator
index.oklab = oklab;

const oklch$1 = (col1, col2, f) => {
    return interpolate_hsx(col1, col2, f, 'oklch');
};

// register interpolator
index.oklch = oklch$1;

const { pow: pow$4, sqrt: sqrt$1, PI: PI$1, cos: cos$2, sin: sin$2, atan2: atan2$1 } = Math;

var average = (colors, mode = 'lrgb', weights = null) => {
    const l = colors.length;
    if (!weights) weights = Array.from(new Array(l)).map(() => 1);
    // normalize weights
    const k =
        l /
        weights.reduce(function (a, b) {
            return a + b;
        });
    weights.forEach((w, i) => {
        weights[i] *= k;
    });
    // convert colors to Color objects
    colors = colors.map((c) => new Color(c));
    if (mode === 'lrgb') {
        return _average_lrgb(colors, weights);
    }
    const first = colors.shift();
    const xyz = first.get(mode);
    const cnt = [];
    let dx = 0;
    let dy = 0;
    // initial color
    for (let i = 0; i < xyz.length; i++) {
        xyz[i] = (xyz[i] || 0) * weights[0];
        cnt.push(isNaN(xyz[i]) ? 0 : weights[0]);
        if (mode.charAt(i) === 'h' && !isNaN(xyz[i])) {
            const A = (xyz[i] / 180) * PI$1;
            dx += cos$2(A) * weights[0];
            dy += sin$2(A) * weights[0];
        }
    }

    let alpha = first.alpha() * weights[0];
    colors.forEach((c, ci) => {
        const xyz2 = c.get(mode);
        alpha += c.alpha() * weights[ci + 1];
        for (let i = 0; i < xyz.length; i++) {
            if (!isNaN(xyz2[i])) {
                cnt[i] += weights[ci + 1];
                if (mode.charAt(i) === 'h') {
                    const A = (xyz2[i] / 180) * PI$1;
                    dx += cos$2(A) * weights[ci + 1];
                    dy += sin$2(A) * weights[ci + 1];
                } else {
                    xyz[i] += xyz2[i] * weights[ci + 1];
                }
            }
        }
    });

    for (let i = 0; i < xyz.length; i++) {
        if (mode.charAt(i) === 'h') {
            let A = (atan2$1(dy / cnt[i], dx / cnt[i]) / PI$1) * 180;
            while (A < 0) A += 360;
            while (A >= 360) A -= 360;
            xyz[i] = A;
        } else {
            xyz[i] = xyz[i] / cnt[i];
        }
    }
    alpha /= l;
    return new Color(xyz, mode).alpha(alpha > 0.99999 ? 1 : alpha, true);
};

const _average_lrgb = (colors, weights) => {
    const l = colors.length;
    const xyz = [0, 0, 0, 0];
    for (let i = 0; i < colors.length; i++) {
        const col = colors[i];
        const f = weights[i] / l;
        const rgb = col._rgb;
        xyz[0] += pow$4(rgb[0], 2) * f;
        xyz[1] += pow$4(rgb[1], 2) * f;
        xyz[2] += pow$4(rgb[2], 2) * f;
        xyz[3] += rgb[3] * f;
    }
    xyz[0] = sqrt$1(xyz[0]);
    xyz[1] = sqrt$1(xyz[1]);
    xyz[2] = sqrt$1(xyz[2]);
    if (xyz[3] > 0.9999999) xyz[3] = 1;
    return new Color(clip_rgb(xyz));
};

// minimal multi-purpose interface

const { pow: pow$3 } = Math;

function scale (colors) {
    // constructor
    let _mode = 'rgb';
    let _nacol = chroma('#ccc');
    let _spread = 0;
    // const _fixed = false;
    let _domain = [0, 1];
    let _pos = [];
    let _padding = [0, 0];
    let _classes = false;
    let _colors = [];
    let _out = false;
    let _min = 0;
    let _max = 1;
    let _correctLightness = false;
    let _colorCache = {};
    let _useCache = true;
    let _gamma = 1;

    // private methods

    const setColors = function (colors) {
        colors = colors || ['#fff', '#000'];
        if (
            colors &&
            type(colors) === 'string' &&
            chroma.brewer &&
            chroma.brewer[colors.toLowerCase()]
        ) {
            colors = chroma.brewer[colors.toLowerCase()];
        }
        if (type(colors) === 'array') {
            // handle single color
            if (colors.length === 1) {
                colors = [colors[0], colors[0]];
            }
            // make a copy of the colors
            colors = colors.slice(0);
            // convert to chroma classes
            for (let c = 0; c < colors.length; c++) {
                colors[c] = chroma(colors[c]);
            }
            // auto-fill color position
            _pos.length = 0;
            for (let c = 0; c < colors.length; c++) {
                _pos.push(c / (colors.length - 1));
            }
        }
        resetCache();
        return (_colors = colors);
    };

    const getClass = function (value) {
        if (_classes != null) {
            const n = _classes.length - 1;
            let i = 0;
            while (i < n && value >= _classes[i]) {
                i++;
            }
            return i - 1;
        }
        return 0;
    };

    let tMapLightness = (t) => t;
    let tMapDomain = (t) => t;

    // const classifyValue = function(value) {
    //     let val = value;
    //     if (_classes.length > 2) {
    //         const n = _classes.length-1;
    //         const i = getClass(value);
    //         const minc = _classes[0] + ((_classes[1]-_classes[0]) * (0 + (_spread * 0.5)));  // center of 1st class
    //         const maxc = _classes[n-1] + ((_classes[n]-_classes[n-1]) * (1 - (_spread * 0.5)));  // center of last class
    //         val = _min + ((((_classes[i] + ((_classes[i+1] - _classes[i]) * 0.5)) - minc) / (maxc-minc)) * (_max - _min));
    //     }
    //     return val;
    // };

    const getColor = function (val, bypassMap) {
        let col, t;
        if (bypassMap == null) {
            bypassMap = false;
        }
        if (isNaN(val) || val === null) {
            return _nacol;
        }
        if (!bypassMap) {
            if (_classes && _classes.length > 2) {
                // find the class
                const c = getClass(val);
                t = c / (_classes.length - 2);
            } else if (_max !== _min) {
                // just interpolate between min/max
                t = (val - _min) / (_max - _min);
            } else {
                t = 1;
            }
        } else {
            t = val;
        }

        // domain map
        t = tMapDomain(t);

        if (!bypassMap) {
            t = tMapLightness(t); // lightness correction
        }

        if (_gamma !== 1) {
            t = pow$3(t, _gamma);
        }

        t = _padding[0] + t * (1 - _padding[0] - _padding[1]);

        t = limit(t, 0, 1);

        const k = Math.floor(t * 10000);

        if (_useCache && _colorCache[k]) {
            col = _colorCache[k];
        } else {
            if (type(_colors) === 'array') {
                //for i in [0.._pos.length-1]
                for (let i = 0; i < _pos.length; i++) {
                    const p = _pos[i];
                    if (t <= p) {
                        col = _colors[i];
                        break;
                    }
                    if (t >= p && i === _pos.length - 1) {
                        col = _colors[i];
                        break;
                    }
                    if (t > p && t < _pos[i + 1]) {
                        t = (t - p) / (_pos[i + 1] - p);
                        col = chroma.interpolate(
                            _colors[i],
                            _colors[i + 1],
                            t,
                            _mode
                        );
                        break;
                    }
                }
            } else if (type(_colors) === 'function') {
                col = _colors(t);
            }
            if (_useCache) {
                _colorCache[k] = col;
            }
        }
        return col;
    };

    var resetCache = () => (_colorCache = {});

    setColors(colors);

    // public interface

    const f = function (v) {
        const c = chroma(getColor(v));
        if (_out && c[_out]) {
            return c[_out]();
        } else {
            return c;
        }
    };

    f.classes = function (classes) {
        if (classes != null) {
            if (type(classes) === 'array') {
                _classes = classes;
                _domain = [classes[0], classes[classes.length - 1]];
            } else {
                const d = chroma.analyze(_domain);
                if (classes === 0) {
                    _classes = [d.min, d.max];
                } else {
                    _classes = chroma.limits(d, 'e', classes);
                }
            }
            return f;
        }
        return _classes;
    };

    f.domain = function (domain) {
        if (!arguments.length) {
            return _domain;
        }
        _min = domain[0];
        _max = domain[domain.length - 1];
        _pos = [];
        const k = _colors.length;
        if (domain.length === k && _min !== _max) {
            // update positions
            for (let d of Array.from(domain)) {
                _pos.push((d - _min) / (_max - _min));
            }
        } else {
            for (let c = 0; c < k; c++) {
                _pos.push(c / (k - 1));
            }
            if (domain.length > 2) {
                // set domain map
                const tOut = domain.map((d, i) => i / (domain.length - 1));
                const tBreaks = domain.map((d) => (d - _min) / (_max - _min));
                if (!tBreaks.every((val, i) => tOut[i] === val)) {
                    tMapDomain = (t) => {
                        if (t <= 0 || t >= 1) return t;
                        let i = 0;
                        while (t >= tBreaks[i + 1]) i++;
                        const f =
                            (t - tBreaks[i]) / (tBreaks[i + 1] - tBreaks[i]);
                        const out = tOut[i] + f * (tOut[i + 1] - tOut[i]);
                        return out;
                    };
                }
            }
        }
        _domain = [_min, _max];
        return f;
    };

    f.mode = function (_m) {
        if (!arguments.length) {
            return _mode;
        }
        _mode = _m;
        resetCache();
        return f;
    };

    f.range = function (colors, _pos) {
        setColors(colors);
        return f;
    };

    f.out = function (_o) {
        _out = _o;
        return f;
    };

    f.spread = function (val) {
        if (!arguments.length) {
            return _spread;
        }
        _spread = val;
        return f;
    };

    f.correctLightness = function (v) {
        if (v == null) {
            v = true;
        }
        _correctLightness = v;
        resetCache();
        if (_correctLightness) {
            tMapLightness = function (t) {
                const L0 = getColor(0, true).lab()[0];
                const L1 = getColor(1, true).lab()[0];
                const pol = L0 > L1;
                let L_actual = getColor(t, true).lab()[0];
                const L_ideal = L0 + (L1 - L0) * t;
                let L_diff = L_actual - L_ideal;
                let t0 = 0;
                let t1 = 1;
                let max_iter = 20;
                while (Math.abs(L_diff) > 1e-2 && max_iter-- > 0) {
                    (function () {
                        if (pol) {
                            L_diff *= -1;
                        }
                        if (L_diff < 0) {
                            t0 = t;
                            t += (t1 - t) * 0.5;
                        } else {
                            t1 = t;
                            t += (t0 - t) * 0.5;
                        }
                        L_actual = getColor(t, true).lab()[0];
                        return (L_diff = L_actual - L_ideal);
                    })();
                }
                return t;
            };
        } else {
            tMapLightness = (t) => t;
        }
        return f;
    };

    f.padding = function (p) {
        if (p != null) {
            if (type(p) === 'number') {
                p = [p, p];
            }
            _padding = p;
            return f;
        } else {
            return _padding;
        }
    };

    f.colors = function (numColors, out) {
        // If no arguments are given, return the original colors that were provided
        if (arguments.length < 2) {
            out = 'hex';
        }
        let result = [];

        if (arguments.length === 0) {
            result = _colors.slice(0);
        } else if (numColors === 1) {
            result = [f(0.5)];
        } else if (numColors > 1) {
            const dm = _domain[0];
            const dd = _domain[1] - dm;
            result = __range__(0, numColors, false).map((i) =>
                f(dm + (i / (numColors - 1)) * dd)
            );
        } else {
            // returns all colors based on the defined classes
            colors = [];
            let samples = [];
            if (_classes && _classes.length > 2) {
                for (
                    let i = 1, end = _classes.length, asc = 1 <= end;
                    asc ? i < end : i > end;
                    asc ? i++ : i--
                ) {
                    samples.push((_classes[i - 1] + _classes[i]) * 0.5);
                }
            } else {
                samples = _domain;
            }
            result = samples.map((v) => f(v));
        }

        if (chroma[out]) {
            result = result.map((c) => c[out]());
        }
        return result;
    };

    f.cache = function (c) {
        if (c != null) {
            _useCache = c;
            return f;
        } else {
            return _useCache;
        }
    };

    f.gamma = function (g) {
        if (g != null) {
            _gamma = g;
            return f;
        } else {
            return _gamma;
        }
    };

    f.nodata = function (d) {
        if (d != null) {
            _nacol = chroma(d);
            return f;
        } else {
            return _nacol;
        }
    };

    return f;
}

function __range__(left, right, inclusive) {
    let range = [];
    let ascending = left < right;
    let end = !inclusive ? right : ascending ? right + 1 : right - 1;
    for (let i = left; ascending ? i < end : i > end; ascending ? i++ : i--) {
        range.push(i);
    }
    return range;
}

//

// nth row of the pascal triangle
const binom_row = function (n) {
    let row = [1, 1];
    for (let i = 1; i < n; i++) {
        let newrow = [1];
        for (let j = 1; j <= row.length; j++) {
            newrow[j] = (row[j] || 0) + row[j - 1];
        }
        row = newrow;
    }
    return row;
};

const bezier = function (colors) {
    let I, lab0, lab1, lab2;
    colors = colors.map((c) => new Color(c));
    if (colors.length === 2) {
        // linear interpolation
        [lab0, lab1] = colors.map((c) => c.lab());
        I = function (t) {
            const lab = [0, 1, 2].map((i) => lab0[i] + t * (lab1[i] - lab0[i]));
            return new Color(lab, 'lab');
        };
    } else if (colors.length === 3) {
        // quadratic bezier interpolation
        [lab0, lab1, lab2] = colors.map((c) => c.lab());
        I = function (t) {
            const lab = [0, 1, 2].map(
                (i) =>
                    (1 - t) * (1 - t) * lab0[i] +
                    2 * (1 - t) * t * lab1[i] +
                    t * t * lab2[i]
            );
            return new Color(lab, 'lab');
        };
    } else if (colors.length === 4) {
        // cubic bezier interpolation
        let lab3;
        [lab0, lab1, lab2, lab3] = colors.map((c) => c.lab());
        I = function (t) {
            const lab = [0, 1, 2].map(
                (i) =>
                    (1 - t) * (1 - t) * (1 - t) * lab0[i] +
                    3 * (1 - t) * (1 - t) * t * lab1[i] +
                    3 * (1 - t) * t * t * lab2[i] +
                    t * t * t * lab3[i]
            );
            return new Color(lab, 'lab');
        };
    } else if (colors.length >= 5) {
        // general case (degree n bezier)
        let labs, row, n;
        labs = colors.map((c) => c.lab());
        n = colors.length - 1;
        row = binom_row(n);
        I = function (t) {
            const u = 1 - t;
            const lab = [0, 1, 2].map((i) =>
                labs.reduce(
                    (sum, el, j) =>
                        sum + row[j] * u ** (n - j) * t ** j * el[i],
                    0
                )
            );
            return new Color(lab, 'lab');
        };
    } else {
        throw new RangeError('No point in running bezier with only one color.');
    }
    return I;
};

var bezier$1 = (colors) => {
    const f = bezier(colors);
    f.scale = () => scale(f);
    return f;
};

const { round: round$3 } = Math;

Color.prototype.rgb = function (rnd = true) {
    if (rnd === false) return this._rgb.slice(0, 3);
    return this._rgb.slice(0, 3).map(round$3);
};

Color.prototype.rgba = function (rnd = true) {
    return this._rgb.slice(0, 4).map((v, i) => {
        return i < 3 ? (rnd === false ? v : round$3(v)) : v;
    });
};

const rgb = (...args) => new Color(...args, 'rgb');
Object.assign(chroma, { rgb });

input.format.rgb = (...args) => {
    const rgba = unpack(args, 'rgba');
    if (rgba[3] === undefined) rgba[3] = 1;
    return rgba;
};

input.autodetect.push({
    p: 3,
    test: (...args) => {
        args = unpack(args, 'rgba');
        if (
            type(args) === 'array' &&
            (args.length === 3 ||
                (args.length === 4 &&
                    type(args[3]) == 'number' &&
                    args[3] >= 0 &&
                    args[3] <= 1))
        ) {
            return 'rgb';
        }
    }
});

/*
 * interpolates between a set of colors uzing a bezier spline
 * blend mode formulas taken from https://web.archive.org/web/20180110014946/http://www.venture-ware.com/kevin/coding/lets-learn-math-photoshop-blend-modes/
 */

const blend = (bottom, top, mode) => {
    if (!blend[mode]) {
        throw new Error('unknown blend mode ' + mode);
    }
    return blend[mode](bottom, top);
};

const blend_f = (f) => (bottom, top) => {
    const c0 = chroma(top).rgb();
    const c1 = chroma(bottom).rgb();
    return chroma.rgb(f(c0, c1));
};

const each = (f) => (c0, c1) => {
    const out = [];
    out[0] = f(c0[0], c1[0]);
    out[1] = f(c0[1], c1[1]);
    out[2] = f(c0[2], c1[2]);
    return out;
};

const normal = (a) => a;
const multiply = (a, b) => (a * b) / 255;
const darken = (a, b) => (a > b ? b : a);
const lighten = (a, b) => (a > b ? a : b);
const screen = (a, b) => 255 * (1 - (1 - a / 255) * (1 - b / 255));
const overlay = (a, b) =>
    b < 128 ? (2 * a * b) / 255 : 255 * (1 - 2 * (1 - a / 255) * (1 - b / 255));
const burn = (a, b) => 255 * (1 - (1 - b / 255) / (a / 255));
const dodge = (a, b) => {
    if (a === 255) return 255;
    a = (255 * (b / 255)) / (1 - a / 255);
    return a > 255 ? 255 : a;
};

// # add = (a,b) ->
// #     if (a + b > 255) then 255 else a + b

blend.normal = blend_f(each(normal));
blend.multiply = blend_f(each(multiply));
blend.screen = blend_f(each(screen));
blend.overlay = blend_f(each(overlay));
blend.darken = blend_f(each(darken));
blend.lighten = blend_f(each(lighten));
blend.dodge = blend_f(each(dodge));
blend.burn = blend_f(each(burn));

// cubehelix interpolation
const { pow: pow$2, sin: sin$1, cos: cos$1 } = Math;

function cubehelix (
    start = 300,
    rotations = -1.5,
    hue = 1,
    gamma = 1,
    lightness = [0, 1]
) {
    let dh = 0,
        dl;
    if (type(lightness) === 'array') {
        dl = lightness[1] - lightness[0];
    } else {
        dl = 0;
        lightness = [lightness, lightness];
    }
    const f = function (fract) {
        const a = TWOPI * ((start + 120) / 360 + rotations * fract);
        const l = pow$2(lightness[0] + dl * fract, gamma);
        const h = dh !== 0 ? hue[0] + fract * dh : hue;
        const amp = (h * l * (1 - l)) / 2;
        const cos_a = cos$1(a);
        const sin_a = sin$1(a);
        const r = l + amp * (-0.14861 * cos_a + 1.78277 * sin_a);
        const g = l + amp * (-0.29227 * cos_a - 0.90649 * sin_a);
        const b = l + amp * (+1.97294 * cos_a);
        return chroma(clip_rgb([r * 255, g * 255, b * 255, 1]));
    };
    f.start = function (s) {
        if (s == null) {
            return start;
        }
        start = s;
        return f;
    };
    f.rotations = function (r) {
        if (r == null) {
            return rotations;
        }
        rotations = r;
        return f;
    };
    f.gamma = function (g) {
        if (g == null) {
            return gamma;
        }
        gamma = g;
        return f;
    };
    f.hue = function (h) {
        if (h == null) {
            return hue;
        }
        hue = h;
        if (type(hue) === 'array') {
            dh = hue[1] - hue[0];
            if (dh === 0) {
                hue = hue[1];
            }
        } else {
            dh = 0;
        }
        return f;
    };
    f.lightness = function (h) {
        if (h == null) {
            return lightness;
        }
        if (type(h) === 'array') {
            lightness = h;
            dl = h[1] - h[0];
        } else {
            lightness = [h, h];
            dl = 0;
        }
        return f;
    };
    f.scale = () => chroma.scale(f);
    f.hue(hue);
    return f;
}

const digits = '0123456789abcdef';

const { floor: floor$1, random } = Math;

var random$1 = () => {
    let code = '#';
    for (let i = 0; i < 6; i++) {
        code += digits.charAt(floor$1(random() * 16));
    }
    return new Color(code, 'hex');
};

const { log: log$1, pow: pow$1, floor, abs: abs$1 } = Math;

function analyze(data, key = null) {
    const r = {
        min: Number.MAX_VALUE,
        max: Number.MAX_VALUE * -1,
        sum: 0,
        values: [],
        count: 0
    };
    if (type(data) === 'object') {
        data = Object.values(data);
    }
    data.forEach((val) => {
        if (key && type(val) === 'object') val = val[key];
        if (val !== undefined && val !== null && !isNaN(val)) {
            r.values.push(val);
            r.sum += val;
            if (val < r.min) r.min = val;
            if (val > r.max) r.max = val;
            r.count += 1;
        }
    });

    r.domain = [r.min, r.max];

    r.limits = (mode, num) => limits(r, mode, num);

    return r;
}

function limits(data, mode = 'equal', num = 7) {
    if (type(data) == 'array') {
        data = analyze(data);
    }
    const { min, max } = data;
    const values = data.values.sort((a, b) => a - b);

    if (num === 1) {
        return [min, max];
    }

    const limits = [];

    if (mode.substr(0, 1) === 'c') {
        // continuous
        limits.push(min);
        limits.push(max);
    }

    if (mode.substr(0, 1) === 'e') {
        // equal interval
        limits.push(min);
        for (let i = 1; i < num; i++) {
            limits.push(min + (i / num) * (max - min));
        }
        limits.push(max);
    } else if (mode.substr(0, 1) === 'l') {
        // log scale
        if (min <= 0) {
            throw new Error(
                'Logarithmic scales are only possible for values > 0'
            );
        }
        const min_log = Math.LOG10E * log$1(min);
        const max_log = Math.LOG10E * log$1(max);
        limits.push(min);
        for (let i = 1; i < num; i++) {
            limits.push(pow$1(10, min_log + (i / num) * (max_log - min_log)));
        }
        limits.push(max);
    } else if (mode.substr(0, 1) === 'q') {
        // quantile scale
        limits.push(min);
        for (let i = 1; i < num; i++) {
            const p = ((values.length - 1) * i) / num;
            const pb = floor(p);
            if (pb === p) {
                limits.push(values[pb]);
            } else {
                // p > pb
                const pr = p - pb;
                limits.push(values[pb] * (1 - pr) + values[pb + 1] * pr);
            }
        }
        limits.push(max);
    } else if (mode.substr(0, 1) === 'k') {
        // k-means clustering
        /*
        implementation based on
        http://code.google.com/p/figue/source/browse/trunk/figue.js#336
        simplified for 1-d input values
        */
        let cluster;
        const n = values.length;
        const assignments = new Array(n);
        const clusterSizes = new Array(num);
        let repeat = true;
        let nb_iters = 0;
        let centroids = null;

        // get seed values
        centroids = [];
        centroids.push(min);
        for (let i = 1; i < num; i++) {
            centroids.push(min + (i / num) * (max - min));
        }
        centroids.push(max);

        while (repeat) {
            // assignment step
            for (let j = 0; j < num; j++) {
                clusterSizes[j] = 0;
            }
            for (let i = 0; i < n; i++) {
                const value = values[i];
                let mindist = Number.MAX_VALUE;
                let best;
                for (let j = 0; j < num; j++) {
                    const dist = abs$1(centroids[j] - value);
                    if (dist < mindist) {
                        mindist = dist;
                        best = j;
                    }
                    clusterSizes[best]++;
                    assignments[i] = best;
                }
            }

            // update centroids step
            const newCentroids = new Array(num);
            for (let j = 0; j < num; j++) {
                newCentroids[j] = null;
            }
            for (let i = 0; i < n; i++) {
                cluster = assignments[i];
                if (newCentroids[cluster] === null) {
                    newCentroids[cluster] = values[i];
                } else {
                    newCentroids[cluster] += values[i];
                }
            }
            for (let j = 0; j < num; j++) {
                newCentroids[j] *= 1 / clusterSizes[j];
            }

            // check convergence
            repeat = false;
            for (let j = 0; j < num; j++) {
                if (newCentroids[j] !== centroids[j]) {
                    repeat = true;
                    break;
                }
            }

            centroids = newCentroids;
            nb_iters++;

            if (nb_iters > 200) {
                repeat = false;
            }
        }

        // finished k-means clustering
        // the next part is borrowed from gabrielflor.it
        const kClusters = {};
        for (let j = 0; j < num; j++) {
            kClusters[j] = [];
        }
        for (let i = 0; i < n; i++) {
            cluster = assignments[i];
            kClusters[cluster].push(values[i]);
        }
        let tmpKMeansBreaks = [];
        for (let j = 0; j < num; j++) {
            tmpKMeansBreaks.push(kClusters[j][0]);
            tmpKMeansBreaks.push(kClusters[j][kClusters[j].length - 1]);
        }
        tmpKMeansBreaks = tmpKMeansBreaks.sort((a, b) => a - b);
        limits.push(tmpKMeansBreaks[0]);
        for (let i = 1; i < tmpKMeansBreaks.length; i += 2) {
            const v = tmpKMeansBreaks[i];
            if (!isNaN(v) && limits.indexOf(v) === -1) {
                limits.push(v);
            }
        }
    }
    return limits;
}

var contrast = (a, b) => {
    // WCAG contrast ratio
    // see http://www.w3.org/TR/2008/REC-WCAG20-20081211/#contrast-ratiodef
    a = new Color(a);
    b = new Color(b);
    const l1 = a.luminance();
    const l2 = b.luminance();
    return l1 > l2 ? (l1 + 0.05) / (l2 + 0.05) : (l2 + 0.05) / (l1 + 0.05);
};

/**
 * @license
 *
 * The APCA contrast prediction algorithm is based of the formulas published
 * in the APCA-1.0.98G specification by Myndex. The specification is available at:
 * https://raw.githubusercontent.com/Myndex/apca-w3/master/images/APCAw3_0.1.17_APCA0.0.98G.svg
 *
 * Note that the APCA implementation is still beta, so please update to
 * future versions of chroma.js when they become available.
 *
 * You can read more about the APCA Readability Criterion at
 * https://readtech.org/ARC/
 */

// constants
const W_offset = 0.027;
const P_in = 0.0005;
const P_out = 0.1;
const R_scale = 1.14;
const B_threshold = 0.022;
const B_exp = 1.414;

var contrastAPCA = (text, bg) => {
    // parse input colors
    text = new Color(text);
    bg = new Color(bg);
    // if text color has alpha, blend against background
    if (text.alpha() < 1) {
        text = mix(bg, text, text.alpha(), 'rgb');
    }
    const l_text = lum(...text.rgb());
    const l_bg = lum(...bg.rgb());

    // soft clamp black levels
    const Y_text =
        l_text >= B_threshold
            ? l_text
            : l_text + Math.pow(B_threshold - l_text, B_exp);
    const Y_bg =
        l_bg >= B_threshold ? l_bg : l_bg + Math.pow(B_threshold - l_bg, B_exp);

    // normal polarity (dark text on light background)
    const S_norm = Math.pow(Y_bg, 0.56) - Math.pow(Y_text, 0.57);
    // reverse polarity (light text on dark background)
    const S_rev = Math.pow(Y_bg, 0.65) - Math.pow(Y_text, 0.62);
    // clamp noise then scale
    const C =
        Math.abs(Y_bg - Y_text) < P_in
            ? 0
            : Y_text < Y_bg
              ? S_norm * R_scale
              : S_rev * R_scale;
    // clamp minimum contrast then offset
    const S_apc = Math.abs(C) < P_out ? 0 : C > 0 ? C - W_offset : C + W_offset;
    // scale to 100
    return S_apc * 100;
};

function lum(r, g, b) {
    return (
        0.2126729 * Math.pow(r / 255, 2.4) +
        0.7151522 * Math.pow(g / 255, 2.4) +
        0.072175 * Math.pow(b / 255, 2.4)
    );
}

const { sqrt, pow, min, max: max$1, atan2, abs, cos, sin, exp, PI } = Math;

function deltaE (a, b, Kl = 1, Kc = 1, Kh = 1) {
    // Delta E (CIE 2000)
    // see http://www.brucelindbloom.com/index.html?Eqn_DeltaE_CIE2000.html
    var rad2deg = function (rad) {
        return (360 * rad) / (2 * PI);
    };
    var deg2rad = function (deg) {
        return (2 * PI * deg) / 360;
    };
    a = new Color(a);
    b = new Color(b);
    const [L1, a1, b1] = Array.from(a.lab());
    const [L2, a2, b2] = Array.from(b.lab());
    const avgL = (L1 + L2) / 2;
    const C1 = sqrt(pow(a1, 2) + pow(b1, 2));
    const C2 = sqrt(pow(a2, 2) + pow(b2, 2));
    const avgC = (C1 + C2) / 2;
    const G = 0.5 * (1 - sqrt(pow(avgC, 7) / (pow(avgC, 7) + pow(25, 7))));
    const a1p = a1 * (1 + G);
    const a2p = a2 * (1 + G);
    const C1p = sqrt(pow(a1p, 2) + pow(b1, 2));
    const C2p = sqrt(pow(a2p, 2) + pow(b2, 2));
    const avgCp = (C1p + C2p) / 2;
    const arctan1 = rad2deg(atan2(b1, a1p));
    const arctan2 = rad2deg(atan2(b2, a2p));
    const h1p = arctan1 >= 0 ? arctan1 : arctan1 + 360;
    const h2p = arctan2 >= 0 ? arctan2 : arctan2 + 360;
    const avgHp =
        abs(h1p - h2p) > 180 ? (h1p + h2p + 360) / 2 : (h1p + h2p) / 2;
    const T =
        1 -
        0.17 * cos(deg2rad(avgHp - 30)) +
        0.24 * cos(deg2rad(2 * avgHp)) +
        0.32 * cos(deg2rad(3 * avgHp + 6)) -
        0.2 * cos(deg2rad(4 * avgHp - 63));
    let deltaHp = h2p - h1p;
    deltaHp =
        abs(deltaHp) <= 180
            ? deltaHp
            : h2p <= h1p
              ? deltaHp + 360
              : deltaHp - 360;
    deltaHp = 2 * sqrt(C1p * C2p) * sin(deg2rad(deltaHp) / 2);
    const deltaL = L2 - L1;
    const deltaCp = C2p - C1p;
    const sl = 1 + (0.015 * pow(avgL - 50, 2)) / sqrt(20 + pow(avgL - 50, 2));
    const sc = 1 + 0.045 * avgCp;
    const sh = 1 + 0.015 * avgCp * T;
    const deltaTheta = 30 * exp(-pow((avgHp - 275) / 25, 2));
    const Rc = 2 * sqrt(pow(avgCp, 7) / (pow(avgCp, 7) + pow(25, 7)));
    const Rt = -Rc * sin(2 * deg2rad(deltaTheta));
    const result = sqrt(
        pow(deltaL / (Kl * sl), 2) +
            pow(deltaCp / (Kc * sc), 2) +
            pow(deltaHp / (Kh * sh), 2) +
            Rt * (deltaCp / (Kc * sc)) * (deltaHp / (Kh * sh))
    );
    return max$1(0, min(100, result));
}

// simple Euclidean distance
function distance (a, b, mode = 'lab') {
    // Delta E (CIE 1976)
    // see http://www.brucelindbloom.com/index.html?Equations.html
    a = new Color(a);
    b = new Color(b);
    const l1 = a.get(mode);
    const l2 = b.get(mode);
    let sum_sq = 0;
    for (let i in l1) {
        const d = (l1[i] || 0) - (l2[i] || 0);
        sum_sq += d * d;
    }
    return Math.sqrt(sum_sq);
}

var valid = (...args) => {
    try {
        new Color(...args);
        return true;
        // eslint-disable-next-line
    } catch (e) {
        return false;
    }
};

// some pre-defined color scales:

var scales = {
    cool() {
        return scale([chroma.hsl(180, 1, 0.9), chroma.hsl(250, 0.7, 0.4)]);
    },
    hot() {
        return scale(['#000', '#f00', '#ff0', '#fff']).mode(
            'rgb'
        );
    }
};

/**
    ColorBrewer colors for chroma.js

    Copyright (c) 2002 Cynthia Brewer, Mark Harrower, and The
    Pennsylvania State University.

    Licensed under the Apache License, Version 2.0 (the "License");
    you may not use this file except in compliance with the License.
    You may obtain a copy of the License at
    http://www.apache.org/licenses/LICENSE-2.0

    Unless required by applicable law or agreed to in writing, software distributed
    under the License is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR
    CONDITIONS OF ANY KIND, either express or implied. See the License for the
    specific language governing permissions and limitations under the License.
*/

const colorbrewer = {
    // sequential
    OrRd: ['#fff7ec', '#fee8c8', '#fdd49e', '#fdbb84', '#fc8d59', '#ef6548', '#d7301f', '#b30000', '#7f0000'],
    PuBu: ['#fff7fb', '#ece7f2', '#d0d1e6', '#a6bddb', '#74a9cf', '#3690c0', '#0570b0', '#045a8d', '#023858'],
    BuPu: ['#f7fcfd', '#e0ecf4', '#bfd3e6', '#9ebcda', '#8c96c6', '#8c6bb1', '#88419d', '#810f7c', '#4d004b'],
    Oranges: ['#fff5eb', '#fee6ce', '#fdd0a2', '#fdae6b', '#fd8d3c', '#f16913', '#d94801', '#a63603', '#7f2704'],
    BuGn: ['#f7fcfd', '#e5f5f9', '#ccece6', '#99d8c9', '#66c2a4', '#41ae76', '#238b45', '#006d2c', '#00441b'],
    YlOrBr: ['#ffffe5', '#fff7bc', '#fee391', '#fec44f', '#fe9929', '#ec7014', '#cc4c02', '#993404', '#662506'],
    YlGn: ['#ffffe5', '#f7fcb9', '#d9f0a3', '#addd8e', '#78c679', '#41ab5d', '#238443', '#006837', '#004529'],
    Reds: ['#fff5f0', '#fee0d2', '#fcbba1', '#fc9272', '#fb6a4a', '#ef3b2c', '#cb181d', '#a50f15', '#67000d'],
    RdPu: ['#fff7f3', '#fde0dd', '#fcc5c0', '#fa9fb5', '#f768a1', '#dd3497', '#ae017e', '#7a0177', '#49006a'],
    Greens: ['#f7fcf5', '#e5f5e0', '#c7e9c0', '#a1d99b', '#74c476', '#41ab5d', '#238b45', '#006d2c', '#00441b'],
    YlGnBu: ['#ffffd9', '#edf8b1', '#c7e9b4', '#7fcdbb', '#41b6c4', '#1d91c0', '#225ea8', '#253494', '#081d58'],
    Purples: ['#fcfbfd', '#efedf5', '#dadaeb', '#bcbddc', '#9e9ac8', '#807dba', '#6a51a3', '#54278f', '#3f007d'],
    GnBu: ['#f7fcf0', '#e0f3db', '#ccebc5', '#a8ddb5', '#7bccc4', '#4eb3d3', '#2b8cbe', '#0868ac', '#084081'],
    Greys: ['#ffffff', '#f0f0f0', '#d9d9d9', '#bdbdbd', '#969696', '#737373', '#525252', '#252525', '#000000'],
    YlOrRd: ['#ffffcc', '#ffeda0', '#fed976', '#feb24c', '#fd8d3c', '#fc4e2a', '#e31a1c', '#bd0026', '#800026'],
    PuRd: ['#f7f4f9', '#e7e1ef', '#d4b9da', '#c994c7', '#df65b0', '#e7298a', '#ce1256', '#980043', '#67001f'],
    Blues: ['#f7fbff', '#deebf7', '#c6dbef', '#9ecae1', '#6baed6', '#4292c6', '#2171b5', '#08519c', '#08306b'],
    PuBuGn: ['#fff7fb', '#ece2f0', '#d0d1e6', '#a6bddb', '#67a9cf', '#3690c0', '#02818a', '#016c59', '#014636'],
    Viridis: ['#440154', '#482777', '#3f4a8a', '#31678e', '#26838f', '#1f9d8a', '#6cce5a', '#b6de2b', '#fee825'],

    // diverging
    Spectral: ['#9e0142', '#d53e4f', '#f46d43', '#fdae61', '#fee08b', '#ffffbf', '#e6f598', '#abdda4', '#66c2a5', '#3288bd', '#5e4fa2'],
    RdYlGn: ['#a50026', '#d73027', '#f46d43', '#fdae61', '#fee08b', '#ffffbf', '#d9ef8b', '#a6d96a', '#66bd63', '#1a9850', '#006837'],
    RdBu: ['#67001f', '#b2182b', '#d6604d', '#f4a582', '#fddbc7', '#f7f7f7', '#d1e5f0', '#92c5de', '#4393c3', '#2166ac', '#053061'],
    PiYG: ['#8e0152', '#c51b7d', '#de77ae', '#f1b6da', '#fde0ef', '#f7f7f7', '#e6f5d0', '#b8e186', '#7fbc41', '#4d9221', '#276419'],
    PRGn: ['#40004b', '#762a83', '#9970ab', '#c2a5cf', '#e7d4e8', '#f7f7f7', '#d9f0d3', '#a6dba0', '#5aae61', '#1b7837', '#00441b'],
    RdYlBu: ['#a50026', '#d73027', '#f46d43', '#fdae61', '#fee090', '#ffffbf', '#e0f3f8', '#abd9e9', '#74add1', '#4575b4', '#313695'],
    BrBG: ['#543005', '#8c510a', '#bf812d', '#dfc27d', '#f6e8c3', '#f5f5f5', '#c7eae5', '#80cdc1', '#35978f', '#01665e', '#003c30'],
    RdGy: ['#67001f', '#b2182b', '#d6604d', '#f4a582', '#fddbc7', '#ffffff', '#e0e0e0', '#bababa', '#878787', '#4d4d4d', '#1a1a1a'],
    PuOr: ['#7f3b08', '#b35806', '#e08214', '#fdb863', '#fee0b6', '#f7f7f7', '#d8daeb', '#b2abd2', '#8073ac', '#542788', '#2d004b'],

    // qualitative
    Set2: ['#66c2a5', '#fc8d62', '#8da0cb', '#e78ac3', '#a6d854', '#ffd92f', '#e5c494', '#b3b3b3'],
    Accent: ['#7fc97f', '#beaed4', '#fdc086', '#ffff99', '#386cb0', '#f0027f', '#bf5b17', '#666666'],
    Set1: ['#e41a1c', '#377eb8', '#4daf4a', '#984ea3', '#ff7f00', '#ffff33', '#a65628', '#f781bf', '#999999'],
    Set3: ['#8dd3c7', '#ffffb3', '#bebada', '#fb8072', '#80b1d3', '#fdb462', '#b3de69', '#fccde5', '#d9d9d9', '#bc80bd', '#ccebc5', '#ffed6f'],
    Dark2: ['#1b9e77', '#d95f02', '#7570b3', '#e7298a', '#66a61e', '#e6ab02', '#a6761d', '#666666'],
    Paired: ['#a6cee3', '#1f78b4', '#b2df8a', '#33a02c', '#fb9a99', '#e31a1c', '#fdbf6f', '#ff7f00', '#cab2d6', '#6a3d9a', '#ffff99', '#b15928'],
    Pastel2: ['#b3e2cd', '#fdcdac', '#cbd5e8', '#f4cae4', '#e6f5c9', '#fff2ae', '#f1e2cc', '#cccccc'],
    Pastel1: ['#fbb4ae', '#b3cde3', '#ccebc5', '#decbe4', '#fed9a6', '#ffffcc', '#e5d8bd', '#fddaec', '#f2f2f2']
};

const colorbrewerTypes = Object.keys(colorbrewer);
const typeMap = new Map(colorbrewerTypes.map((key) => [key.toLowerCase(), key]));

// use Proxy to allow case-insensitive access to palettes
const colorbrewerProxy =
    typeof Proxy === 'function'
        ? new Proxy(colorbrewer, {
              get(target, prop) {
                  const lower = prop.toLowerCase();
                  if (typeMap.has(lower)) {
                      return target[typeMap.get(lower)];
                  }
              },
              getOwnPropertyNames() {
                  return Object.getOwnPropertyNames(colorbrewerTypes);
              }
          })
        : colorbrewer;

const cmyk2rgb = (...args) => {
    args = unpack(args, 'cmyk');
    const [c, m, y, k] = args;
    const alpha = args.length > 4 ? args[4] : 1;
    if (k === 1) return [0, 0, 0, alpha];
    return [
        c >= 1 ? 0 : 255 * (1 - c) * (1 - k), // r
        m >= 1 ? 0 : 255 * (1 - m) * (1 - k), // g
        y >= 1 ? 0 : 255 * (1 - y) * (1 - k), // b
        alpha
    ];
};

const { max } = Math;

const rgb2cmyk = (...args) => {
    let [r, g, b] = unpack(args, 'rgb');
    r = r / 255;
    g = g / 255;
    b = b / 255;
    const k = 1 - max(r, max(g, b));
    const f = k < 1 ? 1 / (1 - k) : 0;
    const c = (1 - r - k) * f;
    const m = (1 - g - k) * f;
    const y = (1 - b - k) * f;
    return [c, m, y, k];
};

Color.prototype.cmyk = function () {
    return rgb2cmyk(this._rgb);
};

const cmyk = (...args) => new Color(...args, 'cmyk');
Object.assign(chroma, { cmyk });

input.format.cmyk = cmyk2rgb;

input.autodetect.push({
    p: 2,
    test: (...args) => {
        args = unpack(args, 'cmyk');
        if (type(args) === 'array' && args.length === 4) {
            return 'cmyk';
        }
    }
});

/*
 * supported arguments:
 * - hsl2css(h,s,l)
 * - hsl2css(h,s,l,a)
 * - hsl2css([h,s,l], mode)
 * - hsl2css([h,s,l,a], mode)
 * - hsl2css({h,s,l,a}, mode)
 */
const hsl2css = (...args) => {
    const hsla = unpack(args, 'hsla');
    let mode = last(args) || 'lsa';
    hsla[0] = rnd2(hsla[0] || 0) + 'deg';
    hsla[1] = rnd2(hsla[1] * 100) + '%';
    hsla[2] = rnd2(hsla[2] * 100) + '%';
    if (mode === 'hsla' || (hsla.length > 3 && hsla[3] < 1)) {
        hsla[3] = '/ ' + (hsla.length > 3 ? hsla[3] : 1);
        mode = 'hsla';
    } else {
        hsla.length = 3;
    }
    return `${mode.substr(0, 3)}(${hsla.join(' ')})`;
};

/*
 * supported arguments:
 * - lab2css(l,a,b)
 * - lab2css(l,a,b,alpha)
 * - lab2css([l,a,b], mode)
 * - lab2css([l,a,b,alpha], mode)
 */
const lab2css = (...args) => {
    const laba = unpack(args, 'lab');
    let mode = last(args) || 'lab';
    laba[0] = rnd2(laba[0]) + '%';
    laba[1] = rnd2(laba[1]);
    laba[2] = rnd2(laba[2]);
    if (mode === 'laba' || (laba.length > 3 && laba[3] < 1)) {
        laba[3] = '/ ' + (laba.length > 3 ? laba[3] : 1);
    } else {
        laba.length = 3;
    }
    return `lab(${laba.join(' ')})`;
};

/*
 * supported arguments:
 * - lab2css(l,a,b)
 * - lab2css(l,a,b,alpha)
 * - lab2css([l,a,b], mode)
 * - lab2css([l,a,b,alpha], mode)
 */
const lch2css = (...args) => {
    const lcha = unpack(args, 'lch');
    let mode = last(args) || 'lab';
    lcha[0] = rnd2(lcha[0]) + '%';
    lcha[1] = rnd2(lcha[1]);
    lcha[2] = isNaN(lcha[2]) ? 'none' : rnd2(lcha[2]) + 'deg'; // add deg unit to hue
    if (mode === 'lcha' || (lcha.length > 3 && lcha[3] < 1)) {
        lcha[3] = '/ ' + (lcha.length > 3 ? lcha[3] : 1);
    } else {
        lcha.length = 3;
    }
    return `lch(${lcha.join(' ')})`;
};

const oklab2css = (...args) => {
    const laba = unpack(args, 'lab');
    laba[0] = rnd2(laba[0] * 100) + '%';
    laba[1] = rnd3(laba[1]);
    laba[2] = rnd3(laba[2]);
    if (laba.length > 3 && laba[3] < 1) {
        laba[3] = '/ ' + (laba.length > 3 ? laba[3] : 1);
    } else {
        laba.length = 3;
    }
    return `oklab(${laba.join(' ')})`;
};

const rgb2oklch = (...args) => {
    const [r, g, b, ...rest] = unpack(args, 'rgb');
    const [l, a, b_] = rgb2oklab(r, g, b);
    const [L, c, h] = lab2lch(l, a, b_);
    return [L, c, h, ...(rest.length > 0 && rest[0] < 1 ? [rest[0]] : [])];
};

const oklch2css = (...args) => {
    const lcha = unpack(args, 'lch');
    lcha[0] = rnd2(lcha[0] * 100) + '%';
    lcha[1] = rnd3(lcha[1]);
    lcha[2] = isNaN(lcha[2]) ? 'none' : rnd2(lcha[2]) + 'deg'; // add deg unit to hue
    if (lcha.length > 3 && lcha[3] < 1) {
        lcha[3] = '/ ' + (lcha.length > 3 ? lcha[3] : 1);
    } else {
        lcha.length = 3;
    }
    return `oklch(${lcha.join(' ')})`;
};

const { round: round$2 } = Math;

/*
 * supported arguments:
 * - rgb2css(r,g,b)
 * - rgb2css(r,g,b,a)
 * - rgb2css([r,g,b], mode)
 * - rgb2css([r,g,b,a], mode)
 * - rgb2css({r,g,b,a}, mode)
 */
const rgb2css = (...args) => {
    const rgba = unpack(args, 'rgba');
    let mode = last(args) || 'rgb';
    if (mode.substr(0, 3) === 'hsl') {
        return hsl2css(rgb2hsl$1(rgba), mode);
    }
    if (mode.substr(0, 3) === 'lab') {
        // change to D50 lab whitepoint since this is what W3C is using for CSS Lab colors
        const prevWhitePoint = getLabWhitePoint();
        setLabWhitePoint('d50');
        const cssColor = lab2css(rgb2lab(rgba), mode);
        setLabWhitePoint(prevWhitePoint);
        return cssColor;
    }
    if (mode.substr(0, 3) === 'lch') {
        // change to D50 lab whitepoint since this is what W3C is using for CSS Lab colors
        const prevWhitePoint = getLabWhitePoint();
        setLabWhitePoint('d50');
        const cssColor = lch2css(rgb2lch(rgba), mode);
        setLabWhitePoint(prevWhitePoint);
        return cssColor;
    }
    if (mode.substr(0, 5) === 'oklab') {
        return oklab2css(rgb2oklab(rgba));
    }
    if (mode.substr(0, 5) === 'oklch') {
        return oklch2css(rgb2oklch(rgba));
    }
    rgba[0] = round$2(rgba[0]);
    rgba[1] = round$2(rgba[1]);
    rgba[2] = round$2(rgba[2]);
    if (mode === 'rgba' || (rgba.length > 3 && rgba[3] < 1)) {
        rgba[3] = '/ ' + (rgba.length > 3 ? rgba[3] : 1);
        mode = 'rgba';
    }
    return `${mode.substr(0, 3)}(${rgba.slice(0, mode === 'rgb' ? 3 : 4).join(' ')})`;
};

const oklch2rgb = (...args) => {
    args = unpack(args, 'lch');
    const [l, c, h, ...rest] = args;
    const [L, a, b_] = lch2lab(l, c, h);
    const [r, g, b] = oklab2rgb(L, a, b_);
    return [r, g, b, ...(rest.length > 0 && rest[0] < 1 ? [rest[0]] : [])];
};

const INT_OR_PCT = /((?:-?\d+)|(?:-?\d+(?:\.\d+)?)%|none)/.source;
const FLOAT_OR_PCT = /((?:-?(?:\d+(?:\.\d*)?|\.\d+)%?)|none)/.source;
const PCT = /((?:-?(?:\d+(?:\.\d*)?|\.\d+)%)|none)/.source;
const RE_S = /\s*/.source;
const SEP = /\s+/.source;
const COMMA = /\s*,\s*/.source;
const ANLGE = /((?:-?(?:\d+(?:\.\d*)?|\.\d+)(?:deg)?)|none)/.source;
const ALPHA = /\s*(?:\/\s*((?:[01]|[01]?\.\d+)|\d+(?:\.\d+)?%))?/.source;

// e.g. rgb(250 20 0), rgb(100% 50% 20%), rgb(100% 50% 20% / 0.5)
const RE_RGB = new RegExp(
    '^rgba?\\(' +
        RE_S +
        [INT_OR_PCT, INT_OR_PCT, INT_OR_PCT].join(SEP) +
        ALPHA +
        '\\)$'
);
const RE_RGB_LEGACY = new RegExp(
    '^rgb\\(' +
        RE_S +
        [INT_OR_PCT, INT_OR_PCT, INT_OR_PCT].join(COMMA) +
        RE_S +
        '\\)$'
);
const RE_RGBA_LEGACY = new RegExp(
    '^rgba\\(' +
        RE_S +
        [INT_OR_PCT, INT_OR_PCT, INT_OR_PCT, FLOAT_OR_PCT].join(COMMA) +
        RE_S +
        '\\)$'
);

const RE_HSL = new RegExp(
    '^hsla?\\(' + RE_S + [ANLGE, PCT, PCT].join(SEP) + ALPHA + '\\)$'
);
const RE_HSL_LEGACY = new RegExp(
    '^hsl?\\(' + RE_S + [ANLGE, PCT, PCT].join(COMMA) + RE_S + '\\)$'
);
const RE_HSLA_LEGACY =
    /^hsla\(\s*(-?\d+(?:\.\d+)?),\s*(-?\d+(?:\.\d+)?)%\s*,\s*(-?\d+(?:\.\d+)?)%\s*,\s*([01]|[01]?\.\d+)\)$/;

const RE_LAB = new RegExp(
    '^lab\\(' +
        RE_S +
        [FLOAT_OR_PCT, FLOAT_OR_PCT, FLOAT_OR_PCT].join(SEP) +
        ALPHA +
        '\\)$'
);
const RE_LCH = new RegExp(
    '^lch\\(' +
        RE_S +
        [FLOAT_OR_PCT, FLOAT_OR_PCT, ANLGE].join(SEP) +
        ALPHA +
        '\\)$'
);
const RE_OKLAB = new RegExp(
    '^oklab\\(' +
        RE_S +
        [FLOAT_OR_PCT, FLOAT_OR_PCT, FLOAT_OR_PCT].join(SEP) +
        ALPHA +
        '\\)$'
);
const RE_OKLCH = new RegExp(
    '^oklch\\(' +
        RE_S +
        [FLOAT_OR_PCT, FLOAT_OR_PCT, ANLGE].join(SEP) +
        ALPHA +
        '\\)$'
);

const { round: round$1 } = Math;

const roundRGB = (rgb) => {
    return rgb.map((v, i) => (i <= 2 ? limit(round$1(v), 0, 255) : v));
};

const percentToAbsolute = (pct, min = 0, max = 100, signed = false) => {
    if (typeof pct === 'string' && pct.endsWith('%')) {
        pct = parseFloat(pct.substring(0, pct.length - 1)) / 100;
        if (signed) {
            // signed percentages are in the range -100% to 100%
            pct = min + (pct + 1) * 0.5 * (max - min);
        } else {
            pct = min + pct * (max - min);
        }
    }
    return +pct;
};

const noneToValue = (v, noneValue) => {
    return v === 'none' ? noneValue : v;
};

const css2rgb = (css) => {
    css = css.toLowerCase().trim();

    if (css === 'transparent') {
        return [0, 0, 0, 0];
    }

    let m;

    if (input.format.named) {
        try {
            return input.format.named(css);
            // eslint-disable-next-line
        } catch (e) {}
    }

    // rgb(250 20 0) or rgb(250,20,0)
    if ((m = css.match(RE_RGB)) || (m = css.match(RE_RGB_LEGACY))) {
        let rgb = m.slice(1, 4);
        for (let i = 0; i < 3; i++) {
            rgb[i] = +percentToAbsolute(noneToValue(rgb[i], 0), 0, 255);
        }
        rgb = roundRGB(rgb);
        const alpha = m[4] !== undefined ? +percentToAbsolute(m[4], 0, 1) : 1;
        rgb[3] = alpha; // default alpha
        return rgb;
    }

    // rgba(250,20,0,0.4)
    if ((m = css.match(RE_RGBA_LEGACY))) {
        const rgb = m.slice(1, 5);
        for (let i = 0; i < 4; i++) {
            rgb[i] = +percentToAbsolute(rgb[i], 0, 255);
        }
        return rgb;
    }

    // hsl(0,100%,50%)
    if ((m = css.match(RE_HSL)) || (m = css.match(RE_HSL_LEGACY))) {
        const hsl = m.slice(1, 4);
        hsl[0] = +noneToValue(hsl[0].replace('deg', ''), 0);
        hsl[1] = +percentToAbsolute(noneToValue(hsl[1], 0), 0, 100) * 0.01;
        hsl[2] = +percentToAbsolute(noneToValue(hsl[2], 0), 0, 100) * 0.01;
        const rgb = roundRGB(hsl2rgb(hsl));
        const alpha = m[4] !== undefined ? +percentToAbsolute(m[4], 0, 1) : 1;
        rgb[3] = alpha;
        return rgb;
    }

    // hsla(0,100%,50%,0.5)
    if ((m = css.match(RE_HSLA_LEGACY))) {
        const hsl = m.slice(1, 4);
        hsl[1] *= 0.01;
        hsl[2] *= 0.01;
        const rgb = hsl2rgb(hsl);
        for (let i = 0; i < 3; i++) {
            rgb[i] = round$1(rgb[i]);
        }
        rgb[3] = +m[4]; // default alpha = 1
        return rgb;
    }

    if ((m = css.match(RE_LAB))) {
        const lab = m.slice(1, 4);
        lab[0] = percentToAbsolute(noneToValue(lab[0], 0), 0, 100);
        lab[1] = percentToAbsolute(noneToValue(lab[1], 0), -125, 125, true);
        lab[2] = percentToAbsolute(noneToValue(lab[2], 0), -125, 125, true);
        // convert to D50 Lab whitepoint
        const wp = getLabWhitePoint();
        setLabWhitePoint('d50');
        const rgb = roundRGB(lab2rgb(lab));
        // convert back to original Lab whitepoint
        setLabWhitePoint(wp);
        const alpha = m[4] !== undefined ? +percentToAbsolute(m[4], 0, 1) : 1;
        rgb[3] = alpha;
        return rgb;
    }

    if ((m = css.match(RE_LCH))) {
        const lch = m.slice(1, 4);
        lch[0] = percentToAbsolute(lch[0], 0, 100);
        lch[1] = percentToAbsolute(noneToValue(lch[1], 0), 0, 150, false);
        lch[2] = +noneToValue(lch[2].replace('deg', ''), 0);
        // convert to D50 Lab whitepoint
        const wp = getLabWhitePoint();
        setLabWhitePoint('d50');
        const rgb = roundRGB(lch2rgb(lch));
        // convert back to original Lab whitepoint
        setLabWhitePoint(wp);
        const alpha = m[4] !== undefined ? +percentToAbsolute(m[4], 0, 1) : 1;
        rgb[3] = alpha;
        return rgb;
    }

    if ((m = css.match(RE_OKLAB))) {
        const oklab = m.slice(1, 4);
        oklab[0] = percentToAbsolute(noneToValue(oklab[0], 0), 0, 1);
        oklab[1] = percentToAbsolute(noneToValue(oklab[1], 0), -0.4, 0.4, true);
        oklab[2] = percentToAbsolute(noneToValue(oklab[2], 0), -0.4, 0.4, true);
        const rgb = roundRGB(oklab2rgb(oklab));
        const alpha = m[4] !== undefined ? +percentToAbsolute(m[4], 0, 1) : 1;
        rgb[3] = alpha;
        return rgb;
    }

    if ((m = css.match(RE_OKLCH))) {
        const oklch = m.slice(1, 4);
        oklch[0] = percentToAbsolute(noneToValue(oklch[0], 0), 0, 1);
        oklch[1] = percentToAbsolute(noneToValue(oklch[1], 0), 0, 0.4, false);
        oklch[2] = +noneToValue(oklch[2].replace('deg', ''), 0);
        const rgb = roundRGB(oklch2rgb(oklch));
        const alpha = m[4] !== undefined ? +percentToAbsolute(m[4], 0, 1) : 1;
        rgb[3] = alpha;
        return rgb;
    }
};

css2rgb.test = (s) => {
    return (
        // modern
        RE_RGB.test(s) ||
        RE_HSL.test(s) ||
        RE_LAB.test(s) ||
        RE_LCH.test(s) ||
        RE_OKLAB.test(s) ||
        RE_OKLCH.test(s) ||
        // legacy
        RE_RGB_LEGACY.test(s) ||
        RE_RGBA_LEGACY.test(s) ||
        RE_HSL_LEGACY.test(s) ||
        RE_HSLA_LEGACY.test(s) ||
        s === 'transparent'
    );
};

Color.prototype.css = function (mode) {
    return rgb2css(this._rgb, mode);
};

const css = (...args) => new Color(...args, 'css');
chroma.css = css;

input.format.css = css2rgb;

input.autodetect.push({
    p: 5,
    test: (h, ...rest) => {
        if (!rest.length && type(h) === 'string' && css2rgb.test(h)) {
            return 'css';
        }
    }
});

input.format.gl = (...args) => {
    const rgb = unpack(args, 'rgba');
    rgb[0] *= 255;
    rgb[1] *= 255;
    rgb[2] *= 255;
    return rgb;
};

const gl = (...args) => new Color(...args, 'gl');
chroma.gl = gl;

Color.prototype.gl = function () {
    const rgb = this._rgb;
    return [rgb[0] / 255, rgb[1] / 255, rgb[2] / 255, rgb[3]];
};

Color.prototype.hex = function (mode) {
    return rgb2hex(this._rgb, mode);
};

const hex = (...args) => new Color(...args, 'hex');
chroma.hex = hex;

input.format.hex = hex2rgb;
input.autodetect.push({
    p: 4,
    test: (h, ...rest) => {
        if (
            !rest.length &&
            type(h) === 'string' &&
            [3, 4, 5, 6, 7, 8, 9].indexOf(h.length) >= 0
        ) {
            return 'hex';
        }
    }
});

/*
 * Based on implementation by Neil Bartlett
 * https://github.com/neilbartlett/color-temperature
 */

const { log } = Math;

const temperature2rgb = (kelvin) => {
    const temp = kelvin / 100;
    let r, g, b;
    if (temp < 66) {
        r = 255;
        g =
            temp < 6
                ? 0
                : -155.25485562709179 -
                  0.44596950469579133 * (g = temp - 2) +
                  104.49216199393888 * log(g);
        b =
            temp < 20
                ? 0
                : -254.76935184120902 +
                  0.8274096064007395 * (b = temp - 10) +
                  115.67994401066147 * log(b);
    } else {
        r =
            351.97690566805693 +
            0.114206453784165 * (r = temp - 55) -
            40.25366309332127 * log(r);
        g =
            325.4494125711974 +
            0.07943456536662342 * (g = temp - 50) -
            28.0852963507957 * log(g);
        b = 255;
    }
    return [r, g, b, 1];
};

/*
 * Based on implementation by Neil Bartlett
 * https://github.com/neilbartlett/color-temperature
 **/
const { round } = Math;

const rgb2temperature = (...args) => {
    const rgb = unpack(args, 'rgb');
    const r = rgb[0],
        b = rgb[2];
    let minTemp = 1000;
    let maxTemp = 40000;
    const eps = 0.4;
    let temp;
    while (maxTemp - minTemp > eps) {
        temp = (maxTemp + minTemp) * 0.5;
        const rgb = temperature2rgb(temp);
        if (rgb[2] / rgb[0] >= b / r) {
            maxTemp = temp;
        } else {
            minTemp = temp;
        }
    }
    return round(temp);
};

Color.prototype.temp =
    Color.prototype.kelvin =
    Color.prototype.temperature =
        function () {
            return rgb2temperature(this._rgb);
        };

const temp = (...args) => new Color(...args, 'temp');
Object.assign(chroma, { temp, kelvin: temp, temperature: temp });

input.format.temp =
    input.format.kelvin =
    input.format.temperature =
        temperature2rgb;

Color.prototype.oklch = function () {
    return rgb2oklch(this._rgb);
};

const oklch = (...args) => new Color(...args, 'oklch');
Object.assign(chroma, { oklch });

input.format.oklch = oklch2rgb;

input.autodetect.push({
    p: 2,
    test: (...args) => {
        args = unpack(args, 'oklch');
        if (type(args) === 'array' && args.length === 3) {
            return 'oklch';
        }
    }
});

// feel free to comment out anything to rollup

Object.assign(chroma, {
    analyze,
    average,
    bezier: bezier$1,
    blend,
    brewer: colorbrewerProxy,
    Color,
    colors: w3cx11,
    contrast,
    contrastAPCA,
    cubehelix,
    deltaE,
    distance,
    input,
    interpolate: mix,
    limits,
    mix,
    random: random$1,
    scale,
    scales,
    valid
});

/**
 * Rulesets: Contrast
 * With help of Jason Day (color-contrast) and Gregor Aisch (chroma.js).
 * APCA contrast checking is experimental.
 * @link https://github.com/jasonday/color-contrast
 * @link https://github.com/gka/chroma.js
 * @link https://github.com/Myndex/SAPC-APCA
*/
function checkContrast(results, option) {
  let contrastResults = {
    errors: [],
    warnings: [],
  };
  const contrastObject = {
    validateColor(color, opacity, type) {
      let colorString = color;

      // Let browser do conversion in rgb for non-supported colour spaces.
      if (!colorString.startsWith('rgb')) {
        const canvas = document.createElement('canvas');
        const context = canvas.getContext('2d');
        context.fillStyle = colorString;
        context.fillRect(0, 0, 1, 1);
        const imageData = context.getImageData(0, 0, 1, 1);
        const [r, g, b, a] = imageData.data; // values in [0, 255]
        const alpha = (a / 255).toFixed(6);
        return `rgba(${r}, ${g}, ${b}, ${alpha})`;
      }

      // If element has opacity attribute; ammend the foreground text color string.
      if (opacity && opacity < 1) {
        colorString = colorString.replace('rgb', 'rgba').replace(')', `, ${opacity})`);
      }

      // Validate colour with Chroma.js.
      if (type === 'color') {
        colorString = chroma.valid(colorString) ? colorString : 'invalidColor';
      }

      return colorString;
    },
    getBackground($el) {
      let targetEl = $el;
      while (targetEl && targetEl.nodeType === 1) {
        const styles = getComputedStyle(targetEl);
        const bgColor = this.validateColor(styles.backgroundColor);
        const bgImage = styles.backgroundImage;
        if (bgImage !== 'none') {
          return 'image';
        }
        if (bgColor !== 'rgba(0, 0, 0, 0)' && bgColor !== 'transparent') {
          return bgColor; // Return the first non-transparent background color.
        }
        if (targetEl.tagName === 'HTML') {
          return 'rgb(255, 255, 255)'; // Default to white if we reach the HTML tag.
        }
        targetEl = targetEl.parentNode;
      }
      return 'rgb(255, 255, 255)'; // Default to white if no background color is found.
    },
    normalizeFontWeight(weight) {
      const numericWeight = parseInt(weight, 10);
      if (!Number.isNaN(numericWeight)) return numericWeight;
      const weightMap = {
        normal: 400,
        bold: 700,
        lighter: 100,
        bolder: 900,
      };
      return weightMap[weight] || 400;
    },
    calculateContrast(textColor, bgColor) {
      // Convert colors to Chroma.js objects.
      const color = chroma(textColor);
      const bg = chroma(bgColor);

      // If text color has alpha, mix it with the background.
      if (color.alpha() < 1) {
        const mixed = chroma.mix(bg, color, color.alpha(), 'rgb').rgb();
        return option.contrastAPCA ? chroma.contrastAPCA(mixed, bg) : chroma.contrast(mixed, bg);
      }
      return option.contrastAPCA ? chroma.contrastAPCA(color, bg) : chroma.contrast(color, bg);
    },
    isScreenReaderOnly(style) {
      const clipPath = style.getPropertyValue('clip-path');
      const { position } = style;
      const width = parseFloat(style.width);
      const height = parseFloat(style.height);
      const { overflow } = style;
      return (
        (clipPath === 'inset(50%)') || (position === 'absolute' && width === 1 && height === 1 && overflow === 'hidden')
      );
    },
    wcagAlgorithm($el, style, srOnly, color, fontSize, fontWeight, background) {
      let ratio;
      const htmlTag = $el.tagName;
      const opacity = parseFloat(style.opacity);
      if (srOnly || opacity === 0 || color === background) ; else if (htmlTag === 'SVG') {
        ratio = this.calculateContrast(style.fill, background);
        if (ratio < 3) {
          contrastResults.errors.push({ $el, ratio: `${ratio.toFixed(2)}:1` });
        }
      } else if (background === 'image') {
        if (!['INPUT', 'SELECT', 'TEXTAREA'].includes(htmlTag)) {
          // Don't flag warning for inputs with background image...
          contrastResults.warnings.push({ $el });
        }
      } else {
        ratio = this.calculateContrast(color, background);
        const isLargeText = fontSize >= 24 || (fontSize >= 18.67 && fontWeight >= 700);
        const hasLowContrast = ratio < 3;
        const hasLowContrastNormalText = ratio > 1 && ratio < 4.5;

        if (ratio === 1) ; else if (isLargeText && hasLowContrast) {
          contrastResults.errors.push({ $el, ratio: `${ratio.toFixed(2)}:1` });
        } else if (!isLargeText && hasLowContrastNormalText) {
          contrastResults.errors.push({ $el, ratio: `${ratio.toFixed(2)}:1` });
        }
      }
    },
    apcaAlgorithm($el, style, srOnly, color, fontSize, fontWeight, background) {
      const opacity = parseFloat(style.opacity);
      if (srOnly || opacity === 0 || color === background) ; else if (background === 'image') {
        if (!['INPUT', 'SELECT', 'TEXTAREA'].includes($el.tagName)) {
          // Don't flag warning for inputs with background image...
          contrastResults.warnings.push({ $el });
        }
      } else {
        const contrast = this.calculateContrast(color, background);
        const fontSizes = [12, 14, 16, 18, 24, 30, 36, 48, 60, 72, 96, 120];
        const fontWeights = [200, 300, 400, 500, 600, 700];
        const minContrastTable = {
          12: { 200: false, 300: false, 400: false, 500: 100, 600: 90, 700: 80 },
          14: { 200: false, 300: false, 400: 100, 500: 90, 600: 80, 700: 60 },
          16: { 200: false, 300: 100, 400: 90, 500: 80, 600: 60, 700: 55 },
          18: { 200: false, 300: 90, 400: 80, 500: 60, 600: 55, 700: 50 },
          24: { 200: 100, 300: 80, 400: 60, 500: 55, 600: 50, 700: 40 },
          30: { 200: 90, 300: 70, 400: 55, 500: 50, 600: 40, 700: 38 },
          36: { 200: 80, 300: 60, 400: 50, 500: 40, 600: 38, 700: 35 },
          48: { 200: 70, 300: 55, 400: 40, 500: 38, 600: 35, 700: 30 },
          60: { 200: 60, 300: 50, 400: 38, 500: 35, 600: 30, 700: 25 },
          72: { 200: 55, 300: 40, 400: 35, 500: 30, 600: 25, 700: 20 },
          96: { 200: 50, 300: 35, 400: 30, 500: 25, 600: 20, 700: 20 },
          120: { 200: 40, 300: 30, 400: 25, 500: 20, 600: 20, 700: 20 },
        };

        // Normalize font size to nearest available size.
        const normalizedSize = fontSizes.reduce((prev, curr) => (Math.abs(curr - fontSize) < Math.abs(prev - fontSize)
          ? curr : prev));

        // Normalize font weight to nearest available weight.
        const normalizedWeight = fontWeights.reduce((prev, curr) => (Math.abs(curr - fontWeight) < Math.abs(prev - fontWeight)
          ? curr : prev));

        // Get minimum required contrast.
        const minContrast = minContrastTable[normalizedSize][normalizedWeight];

        // Check if contrast meets or exceeds the minimum required.
        const passes = minContrast !== false && Math.abs(contrast) >= minContrast;
        if (!passes) {
          contrastResults.errors.push({ $el, ratio: `APCA ${contrast.toFixed(1)}` });
          console.log(
            `Text: ${getText($el)}
           Foreground: ${color}
           Background: ${background}
           Font Weight: ${fontWeight}
           Font Size: ${fontSize}
           APCA: ${contrast},
           Opacity: ${style.opacity}`,
          );
        }
      }
    },
    check() {
      contrastResults = {
        errors: [],
        warnings: [],
      };

      for (let i = 0; i < Elements.Found.Contrast.length; i++) {
        // Get computed styles of each element.
        const $el = Elements.Found.Contrast[i];
        const style = getComputedStyle($el);
        const { opacity } = style;
        const color = this.validateColor(style.color, opacity, 'color');
        const fontSize = parseInt(style.fontSize, 10);
        const getFontWeight = style.fontWeight;
        const fontWeight = this.normalizeFontWeight(getFontWeight);
        const background = this.getBackground($el);

        // If element is visually hidden via screen reader only class.
        const srOnly = this.isScreenReaderOnly(style);

        // Filter only text nodes.
        const textString = Array.from($el.childNodes)
          .filter((node) => node.nodeType === 3)
          .map((node) => node.textContent)
          .join('');
        const text = textString.trim();

        // Preferred contrast algorithm.
        const algorithm = option.contrastAPCA ? 'apcaAlgorithm' : 'wcagAlgorithm';
        if (color === 'invalidColor') {
          // Throw console error if unsupported colour.
          throw new Error(`Sa11y: Unsupported color format for contrast testing: ${color}`);
        } else if (text.length !== 0 || ($el.tagName === 'INPUT' || $el.tagName === 'TEXTAREA')) {
          // Only check for contrast on nodes with text.
          this[algorithm]($el, style, srOnly, color, fontSize, fontWeight, background);
        }
      }
      return contrastResults;
    },
  };
  contrastObject.check();

  // Utility function to clone the element, get the text content, while ignoring text within specific elements.
  const processContrastItem = (item) => {
    const { $el } = item;
    const { ratio } = item;
    const clone = $el.cloneNode(true);
    const ignoreTextWithinElements = 'script, style, noscript, select option:not(:first-child)';
    const nodeText = fnIgnore(clone, ignoreTextWithinElements);
    const text = getText(nodeText);
    const sanitizedText = sanitizeHTML(truncateString(text, 150));
    return { $el, ratio, sanitizedText };
  };

  // Contrast errors
  contrastResults.errors.forEach((item) => {
    const { $el, ratio, sanitizedText } = processContrastItem(item);
    if ($el.tagName === 'INPUT' || $el.tagName === 'TEXTAREA') {
      if (option.checks.CONTRAST_INPUT) {
        results.push({
          element: $el,
          type: option.checks.CONTRAST_INPUT.type || 'error',
          content: option.checks.CONTRAST_INPUT.content || Lang.sprintf('CONTRAST_INPUT', ratio),
          inline: false,
          position: 'beforebegin',
          dismiss: prepareDismissal(`CONTRAST${$el.getAttribute('class')}${$el.tagName}${ratio}`),
          dismissAll: option.checks.CONTRAST_INPUT.dismissAll ? 'CONTRAST_INPUT' : false,
          developer: option.checks.CONTRAST_INPUT.developer || true,
        });
      }
    } else if (option.checks.CONTRAST_ERROR && sanitizedText.length !== 0) {
      results.push({
        element: $el,
        type: option.checks.CONTRAST_ERROR.type || 'error',
        content: option.checks.CONTRAST_ERROR.content || Lang.sprintf('CONTRAST_ERROR', ratio, sanitizedText),
        inline: false,
        position: 'beforebegin',
        dismiss: prepareDismissal(`CONTRAST${sanitizedText}`),
        dismissAll: option.checks.CONTRAST_ERROR.dismissAll ? 'CONTRAST_ERROR' : false,
        developer: option.checks.CONTRAST_ERROR.developer || false,
      });
    }
  });

  // Contrast warnings
  if (option.checks.CONTRAST_WARNING) {
    contrastResults.warnings.forEach((item) => {
      const { $el, sanitizedText } = processContrastItem(item);
      if (sanitizedText.length !== 0) {
        results.push({
          element: $el,
          type: option.checks.CONTRAST_WARNING.type || 'warning',
          content: option.checks.CONTRAST_WARNING.content || Lang.sprintf('CONTRAST_WARNING', sanitizedText),
          inline: false,
          position: 'beforebegin',
          dismiss: prepareDismissal(`CONTRAST${sanitizedText}`),
          dismissAll: option.checks.CONTRAST_WARNING.dismissAll ? 'CONTRAST_WARNING' : false,
          developer: option.checks.CONTRAST_WARNING.developer || false,
        });
      }
    });
  }

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

      // Create dismiss key.
      const key = prepareDismissal(`INPUT${type + inputName}`);

      // Error: Input with type="image" without accessible name or alt.
      if (type === 'image') {
        if (option.checks.LABELS_MISSING_IMAGE_INPUT && (!alt || alt.trim() === '') && !hasAria && !hasTitle) {
          results.push({
            element: $el,
            type: option.checks.LABELS_MISSING_IMAGE_INPUT.type || 'error',
            content: option.checks.LABELS_MISSING_IMAGE_INPUT.content || Lang.sprintf('LABELS_MISSING_IMAGE_INPUT'),
            inline: false,
            position: 'beforebegin',
            dismiss: key,
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
            content: option.checks.LABELS_INPUT_RESET.content || Lang.sprintf('LABELS_INPUT_RESET'),
            inline: false,
            position: 'beforebegin',
            dismiss: key,
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
              content: option.checks.LABELS_MISSING_LABEL.content || Lang.sprintf('LABELS_MISSING_LABEL'),
              inline: false,
              position: 'beforebegin',
              dismiss: key,
              dismissAll: option.checks.LABELS_MISSING_LABEL.dismissAll ? 'LABELS_MISSING_LABEL' : false,
              developer: option.checks.LABELS_MISSING_LABEL.developer || true,
            });
          }
        } else if (option.checks.LABELS_ARIA_LABEL_INPUT) {
          const sanitizedText = sanitizeHTML(inputName);
          results.push({
            element: $el,
            type: option.checks.LABELS_ARIA_LABEL_INPUT.type || 'warning',
            content: option.checks.LABELS_ARIA_LABEL_INPUT.content || `${Lang.sprintf('LABELS_ARIA_LABEL_INPUT', sanitizedText)} ${Lang.sprintf('ACC_NAME_TIP')}`,
            inline: false,
            position: 'beforebegin',
            dismiss: key,
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
              content: option.checks.LABELS_NO_FOR_ATTRIBUTE.content || Lang.sprintf('LABELS_NO_FOR_ATTRIBUTE', id),
              inline: false,
              position: 'beforebegin',
              dismiss: key,
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
          content: option.checks.LABELS_MISSING_LABEL.content || Lang.sprintf('LABELS_MISSING_LABEL'),
          inline: false,
          position: 'beforebegin',
          dismiss: key,
          dismissAll: option.checks.LABELS_MISSING_LABEL.dismissAll ? 'LABELS_MISSING_LABEL' : false,
          developer: option.checks.LABELS_MISSING_LABEL.developer || true,
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
 * @link https://oaji.net/articles/2017/601-1498133639.pdf (Portugese adaptation).
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
      const ignore = fnIgnore(current); // Ignore unwanted <script> and <style> tags.
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
  // Warning: Audio content.
  if (option.checks.EMBED_AUDIO) {
    Elements.Found.Audio.forEach(($el) => {
      const src = ($el.getAttribute('src') !== 'undefined')
        ? $el.getAttribute('src')
        : $el.querySelector('[src]')?.getAttribute('src');

      // General warning for audio content.
      results.push({
        element: $el,
        type: option.checks.EMBED_AUDIO.type || 'warning',
        content: option.checks.EMBED_AUDIO.content || Lang.sprintf('EMBED_AUDIO'),
        inline: false,
        position: 'beforebegin',
        dismiss: prepareDismissal(`AUDIO${src}`),
        dismissAll: option.checks.EMBED_AUDIO.dismissAll ? 'EMBED_AUDIO' : false,
        developer: option.checks.EMBED_AUDIO.developer || false,
      });
    });
  }

  // Warning: Video content.
  if (option.checks.EMBED_VIDEO) {
    Elements.Found.Videos.forEach(($el) => {
      const src = ($el.getAttribute('src') !== 'undefined')
        ? $el.getAttribute('src')
        : $el.querySelector('[src]')?.getAttribute('src');

      // Warning if <track> doesn't exist, or the <track>'s src is empty.
      const track = $el.querySelector('track');
      const trackSrc = track?.getAttribute('src');
      if (track === null || trackSrc === null || trackSrc.trim().length === 0) {
        results.push({
          element: $el,
          type: option.checks.EMBED_VIDEO.type || 'warning',
          content: option.checks.EMBED_VIDEO.content || Lang.sprintf('EMBED_VIDEO'),
          inline: false,
          position: 'beforebegin',
          dismiss: prepareDismissal(`VIDEO${src}`),
          dismissAll: option.checks.EMBED_VIDEO.dismissAll ? 'EMBED_VIDEO' : false,
          developer: option.checks.EMBED_VIDEO.developer || false,
        });
      }
    });
  }

  // Warning: Data visualizations.
  if (option.checks.EMBED_DATA_VIZ) {
    Elements.Found.Visualizations.forEach(($el) => {
      const src = ($el.getAttribute('src') !== 'undefined')
        ? $el.getAttribute('src')
        : $el.querySelector('[src]')?.getAttribute('src');

      // General warning for data vizualization widgets.
      results.push({
        element: $el,
        type: option.checks.EMBED_DATA_VIZ.type || 'warning',
        content: option.checks.EMBED_DATA_VIZ.content || Lang.sprintf('EMBED_DATA_VIZ'),
        inline: false,
        position: 'beforebegin',
        dismiss: prepareDismissal(`DATAVIZ${src}`),
        dismissAll: option.checks.EMBED_DATA_VIZ.dismissAll ? 'EMBED_DATA_VIZ' : false,
        developer: option.checks.EMBED_DATA_VIZ.developer || false,
      });
    });
  }

  /* Error: Check all iFrames for a missing accessible name. */
  Elements.Found.iframes.forEach(($el) => {
    // Generate dismiss key.
    const src = ($el.getAttribute('src') !== 'undefined')
      ? $el.getAttribute('src')
      : $el.querySelector('[src]')?.getAttribute('src');
    const key = prepareDismissal(`EMBED${src}`);

    // Ignore completely hidden elements and video/audio.
    const hidden = isElementHidden($el);
    const videoAudio = $el.tagName === 'VIDEO' || $el.tagName === 'AUDIO';
    const ariaHidden = $el.getAttribute('aria-hidden') === 'true';
    const negativeTabindex = $el.getAttribute('tabindex') === '-1';
    if (hidden || videoAudio || (ariaHidden && negativeTabindex)) {
      return;
    }

    // Warning if element only has negative tabindex (without aria-hidden). Axe rulecheck.
    if (negativeTabindex) {
      if (option.checks.EMBED_UNFOCUSABLE) {
        results.push({
          element: $el,
          type: option.checks.EMBED_UNFOCUSABLE.type || 'error',
          content: option.checks.EMBED_UNFOCUSABLE.content || Lang.sprintf('EMBED_UNFOCUSABLE'),
          inline: false,
          position: 'beforebegin',
          dismiss: key,
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
          content: option.checks.EMBED_MISSING_TITLE.content || Lang.sprintf('EMBED_MISSING_TITLE'),
          inline: false,
          position: 'beforebegin',
          dismiss: key,
          dismissAll: option.checks.EMBED_MISSING_TITLE.dismissAll ? 'EMBED_MISSING_TITLE' : false,
          developer: option.checks.EMBED_MISSING_TITLE.developer || true,
        });
      }
    }
  });

  /* Warning: for all iFrames (except video, audio, or data visualizations). */
  if (option.checks.EMBED_GENERAL) {
    Elements.Found.EmbeddedContent.forEach(($el) => {
      // Ignore completely hidden elements.
      const ariaHidden = $el.getAttribute('aria-hidden') === 'true';
      const negativeTabindex = $el.getAttribute('tabindex') === '-1';
      const hidden = isElementHidden($el);
      if (hidden || (ariaHidden && negativeTabindex)) {
        return;
      }

      // Ignore video & audio elements.
      if ($el.tagName === 'VIDEO' || $el.tagName === 'AUDIO') {
        return;
      }

      // For dismiss key.
      const src = ($el.getAttribute('src') !== 'undefined')
        ? $el.getAttribute('src')
        : $el.querySelector('[src]')?.getAttribute('src');

      results.push({
        element: $el,
        type: option.checks.EMBED_GENERAL.type || 'warning',
        content: option.checks.EMBED_GENERAL.content || Lang.sprintf('EMBED_GENERAL'),
        inline: false,
        position: 'beforebegin',
        dismiss: prepareDismissal(`IFRAME${src}`),
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
        content: option.checks.QA_BAD_LINK.content || Lang.sprintf('QA_BAD_LINK', $el),
        inline: true,
        position: 'beforebegin',
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
          content: option.checks.QA_STRONG_ITALICS.content || Lang.sprintf('QA_STRONG_ITALICS'),
          inline: false,
          position: 'beforebegin',
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
      const hasExtension = $el.matches(Constants.Global.documentLinks);
      const hasPDF = $el.matches('a[href$=".pdf"], a[href*=".pdf?"]');

      // Dismiss key.
      const key = prepareDismissal(`DOCUMENT${href}`);

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
              content: option.checks.QA_IN_PAGE_LINK.content || Lang.sprintf('QA_IN_PAGE_LINK'),
              inline: true,
              position: 'beforebegin',
              dismiss: key,
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
          content: option.checks.QA_DOCUMENT.content || Lang.sprintf('QA_DOCUMENT'),
          inline: true,
          position: 'beforebegin',
          dismiss: key,
          dismissAll: option.checks.QA_DOCUMENT.dismissAll ? 'QA_DOCUMENT' : false,
          developer: option.checks.QA_DOCUMENT.developer || false,
        });
      } else if (option.checks.QA_PDF && hasPDF) {
        results.push({
          element: $el,
          type: option.checks.QA_PDF.type || 'warning',
          content: option.checks.QA_PDF.content || Lang.sprintf('QA_PDF'),
          inline: true,
          position: 'beforebegin',
          dismiss: key,
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
          content: option.checks.QA_BLOCKQUOTE.content || Lang.sprintf('QA_BLOCKQUOTE', sanitizedText),
          inline: false,
          position: 'beforebegin',
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
    const tableHeaders = $el.querySelectorAll('th');
    const semanticHeadings = $el.querySelectorAll('h1, h2, h3, h4, h5, h6');
    const key = prepareDismissal(`TABLE${$el.textContent}`);
    if (option.checks.TABLES_MISSING_HEADINGS && tableHeaders.length === 0) {
      results.push({
        element: $el,
        type: option.checks.TABLES_MISSING_HEADINGS.type || 'error',
        content: option.checks.TABLES_MISSING_HEADINGS.content || Lang.sprintf('TABLES_MISSING_HEADINGS'),
        inline: false,
        position: 'beforebegin',
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
          content: option.checks.TABLES_SEMANTIC_HEADING.content || Lang.sprintf('TABLES_SEMANTIC_HEADING'),
          inline: false,
          position: 'beforebegin',
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
          content: option.checks.TABLES_EMPTY_HEADING.content || Lang.sprintf('TABLES_EMPTY_HEADING'),
          inline: false,
          position: 'afterbegin',
          dismiss: key,
          dismissAll: option.checks.TABLES_EMPTY_HEADING.dismissAll ? 'TABLES_EMPTY_HEADING' : false,
          developer: option.checks.TABLES_EMPTY_HEADING.developer || false,
        });
      }
    });
  });

  /* ****************************************************************** */
  /*  Warning: Detect fake headings                                     */
  /* ****************************************************************** */
  if (option.checks.QA_FAKE_HEADING) {
    const addResult = (element, sanitizedText) => {
      results.push({
        element,
        type: option.checks.QA_FAKE_HEADING.type || 'warning',
        content: option.checks.QA_FAKE_HEADING.content || Lang.sprintf('QA_FAKE_HEADING', sanitizedText),
        inline: false,
        position: 'beforebegin',
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
          const nonHeadingTextLength = fnIgnore(p, 'strong, b').textContent.trim().length;
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
            content: option.checks.QA_FAKE_LIST.content || Lang.sprintf('QA_FAKE_LIST', firstPrefix),
            inline: false,
            position: 'beforebegin',
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
          content: option.checks.QA_UPPERCASE.content || Lang.sprintf('QA_UPPERCASE'),
          inline: false,
          position: 'beforebegin',
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

  /* **************************************************** */
  /*  Check for underlined and justify-aligned text.      */
  /* **************************************************** */
  if (option.checks.QA_UNDERLINE || option.checks.QA_JUSTIFY) {
    const addUnderlineResult = ($el, inline) => {
      const text = getText($el);
      if (text.length !== 0) {
        results.push({
          element: $el,
          type: option.checks.QA_UNDERLINE.type || 'warning',
          content: option.checks.QA_UNDERLINE.content || Lang.sprintf('QA_UNDERLINE'),
          inline,
          position: 'beforebegin',
          dismiss: prepareDismissal(`UNDERLINE${text}`),
          dismissAll: option.checks.QA_UNDERLINE.dismissAll ? 'QA_UNDERLINE' : false,
          developer: option.checks.QA_UNDERLINE.developer || false,
        });
      }
    };

    const addJustifyResult = ($el) => {
      const text = getText($el);
      if (text.length !== 0) {
        results.push({
          element: $el,
          type: option.checks.QA_JUSTIFY.type || 'warning',
          content: option.checks.QA_JUSTIFY.content || Lang._('QA_JUSTIFY'),
          inline: false,
          position: 'beforebegin',
          dismiss: prepareDismissal(`JUSTIFIED${text}`),
          dismissAll: option.checks.QA_JUSTIFY.dismissAll ? 'QA_JUSTIFY' : false,
          developer: option.checks.QA_JUSTIFY.developer || false,
        });
      }
    };

    const addSmallTextResult = ($el) => {
      const text = getText($el);
      if (text.length !== 0) {
        results.push({
          element: $el,
          type: option.checks.QA_SMALL_TEXT.type || 'warning',
          content: option.checks.QA_SMALL_TEXT.content || Lang._('QA_SMALL_TEXT'),
          inline: false,
          position: 'beforebegin',
          dismiss: prepareDismissal(`SMALL${text}`),
          dismissAll: option.checks.QA_SMALL_TEXT.dismissAll ? 'QA_SMALL_TEXT' : false,
          developer: option.checks.QA_SMALL_TEXT.developer || false,
        });
      }
    };

    /**
      * Check: Flag all <u> elements (underlined).
      * @author Brian Teeman
    */
    if (option.checks.QA_UNDERLINE) {
      Elements.Found.Underlines.forEach(($el) => {
        addUnderlineResult($el, true);
      });
    }

    // Get computed styles.
    const computeStyle = ($el) => {
      const style = getComputedStyle($el);
      const { textDecorationLine, textAlign, fontSize } = style;

      /** Check: underline formatted text. @author Brian Teeman */
      if (option.checks.QA_UNDERLINE && textDecorationLine === 'underline' && !$el.closest('a[href]')) {
        addUnderlineResult($el, false); // Inline false for computed underlines.
      }

      /** Check: Font size is greater than 0 and less than 10.
       * Inspired by WebAim's WAVE check. Not WCAG. */
      const defaultSize = option.checks.QA_SMALL_TEXT.fontSize || 10;
      const computedFontSize = parseFloat(fontSize);
      const withinRange = computedFontSize > 0 && computedFontSize <= defaultSize;
      if (option.checks.QA_SMALL_TEXT && withinRange) {
        addSmallTextResult($el);
      }

      /** Check: Check if text is justify-aligned. */
      if (option.checks.QA_JUSTIFY && textAlign === 'justify') {
        addJustifyResult($el);
      }
    };
    Elements.Found.Paragraphs.forEach(computeStyle);
    Elements.Found.Headings.forEach(computeStyle);
    Elements.Found.Lists.forEach(computeStyle);
    Elements.Found.Blockquotes.forEach(computeStyle);
    Elements.Found.Spans.forEach(computeStyle);
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
          content: option.checks.QA_SUBSCRIPT.content || Lang.sprintf('QA_SUBSCRIPT'),
          inline: true,
          position: 'beforebegin',
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
          content: option.checks.QA_NESTED_COMPONENTS.content || Lang.sprintf('QA_NESTED_COMPONENTS'),
          inline: false,
          position: 'beforebegin',
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
        content: option.checks.META_LANG.content || Lang.sprintf('META_LANG'),
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
        content: option.checks.META_TITLE.content || Lang.sprintf('META_TITLE'),
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
        if (option.checks.META_SCALABLE && params['user-scalable'] === 'no') {
          results.push({
            type: option.checks.META_SCALABLE.type || 'error',
            content: option.checks.META_SCALABLE.content || Lang.sprintf('META_SCALABLE'),
            dismiss: prepareDismissal('SCALABLE'),
            developer: option.checks.META_SCALABLE.developer || true,
          });
        }

        // Check maximum-scale parameter.
        const maxScale = parseFloat(params['maximum-scale']);
        if (option.checks.META_MAX && !Number.isNaN(maxScale) && maxScale < 2) {
          results.push({
            type: option.checks.META_MAX.type || 'error',
            content: option.checks.META_MAX.content || Lang.sprintf('META_MAX'),
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
        content: option.checks.META_REFRESH.content || Lang.sprintf('META_REFRESH'),
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
                content: option.checks.DUPLICATE_ID.content || Lang.sprintf('DUPLICATE_ID', id),
                inline: false,
                position: 'beforebegin',
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
              content: option.checks.HIDDEN_FOCUSABLE.content || Lang.sprintf('HIDDEN_FOCUSABLE'),
              inline: false,
              position: 'beforebegin',
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
            content: option.checks.BTN_EMPTY_LABELLEDBY.content || `${Lang.sprintf('BTN_EMPTY_LABELLEDBY')} ${Lang.sprintf('BTN_TIP')}`,
            inline: false,
            position: 'beforebegin',
            dismiss: prepareDismissal(key),
            dismissAll: option.checks.BTN_EMPTY_LABELLEDBY.dismissAll ? 'BTN_EMPTY_LABELLEDBY' : false,
            developer: option.checks.BTN_EMPTY_LABELLEDBY.developer || true,
          });
        } else if (option.checks.BTN_EMPTY) {
          results.push({
            element: $el,
            type: option.checks.BTN_EMPTY.type || 'error',
            content: option.checks.BTN_EMPTY.content || `${Lang.sprintf('BTN_EMPTY')} ${Lang.sprintf('BTN_TIP')}`,
            inline: false,
            position: 'beforebegin',
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
          content: option.checks.LABEL_IN_NAME.content || `${Lang.sprintf('LABEL_IN_NAME', sanitizedText)} ${Lang.sprintf('ACC_NAME_TIP')}`,
          inline: false,
          position: 'beforebegin',
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
          content: option.checks.BTN_ROLE_IN_NAME.content || `${Lang.sprintf('BTN_ROLE_IN_NAME')} ${Lang.sprintf('BTN_TIP')}`,
          inline: false,
          position: 'beforebegin',
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
    Elements.Found.UncontainedLi.forEach(($el) => {
      results.push({
        element: $el,
        type: option.checks.UNCONTAINED_LI.type || 'error',
        content: option.checks.UNCONTAINED_LI.content || Lang.sprintf('UNCONTAINED_LI'),
        inline: false,
        position: 'beforebegin',
        dismiss: prepareDismissal(`UNCONTAINEDLI${$el.textContent}`),
        dismissAll: option.checks.UNCONTAINED_LI.dismissAll ? 'UNCONTAINED_LI' : false,
        developer: option.checks.UNCONTAINED_LI.developer || true,
      });
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
        content: option.checks.TABINDEX_ATTR.content || Lang.sprintf('TABINDEX_ATTR'),
        inline: false,
        position: 'beforebegin',
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
        customElements.define('sa11y-tooltips', TooltipComponent);
        customElements.define('sa11y-dismiss-tooltip', DismissTooltip);
        customElements.define('sa11y-control-panel', ControlPanel);
        customElements.define('sa11y-console-error', ConsoleErrors);

        // Initialize global constants and exclusions.
        Constants.initializeGlobal(option);
        Constants.initializeReadability(option);
        Constants.initializeExclusions(option);
        Constants.initializeEmbeddedContent(option);

        /* Make "Developer checks" on by default or if toggle switch is visually hidden. */
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

            // Initialize dismiss tooltip.
            this.dismissTooltip = new DismissTooltip();
            document.body.appendChild(this.dismissTooltip);

            // Disable toggle initially.
            Constants.Panel.toggle.disabled = false;

            // Initial check once page is done loading.
            setTimeout(() => this.checkAll(), option.delayCheck);

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

        // Flagged issues that are images, for the purpose of generating Image Outline.
        this.imageResults = this.results.filter((issue) => issue.element?.tagName === 'IMG');

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
          this.dismissTooltip,
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
          this.results.forEach(($el) => {
            Object.assign($el);
            annotate(
              $el.element,
              $el.type,
              $el.content,
              $el.inline,
              $el.position,
              $el.id,
              $el.dismiss,
              $el.dismissAll,
              option,
            );
          });

          // After annotations are painted, find & cache.
          Elements.initializeAnnotations();

          // Initialize tooltips
          const tooltipComponent = new TooltipComponent();
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
            generateImageOutline(this.dismissed, this.imageResults);
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
          detectOverflow();
          nudge();
        }

        // Make sure toggle isn't disabled after checking.
        Constants.Panel.toggle.disabled = false;
      }

      // Dispatch custom event that stores the results array.
      const event = new CustomEvent('sa11y-check-complete', {
        detail: {
          results: this.results,
          page: window.location.pathname,
        },
      });
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
        '.sa11y-css-utilities',
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
      if (store.getItem('sa11y-panel') === 'Opened') {
        Constants.Panel.toggle.click();
      }
      Constants.Panel.toggle.disabled = true;
    };

    // Method: re-enable toggle.
    this.enabled = () => {
      Constants.Panel.toggle.disabled = false;
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
