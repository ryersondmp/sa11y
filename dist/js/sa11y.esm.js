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
  shadowComponents: '',
  autoDetectShadowComponents: false,
  panelPosition: 'right',

  // Readability
  readabilityPlugin: true,
  readabilityRoot: 'body',
  readabilityLang: 'en',
  readabilityIgnore: '',

  // Other plugins
  contrastPlugin: true,
  formLabelsPlugin: true,
  linksAdvancedPlugin: true,
  colourFilterPlugin: true,
  customChecks: true,
  checkAllHideToggles: false,

  // QA rulesets
  badLinksQA: true,
  strongItalicsQA: true,
  pdfQA: true,
  documentQA: true,
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
  documentLinks: '.ppt, .doc, .xls, .csv, sway.com, docs.google.com',

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
      .replaceAll(/{r}/g, 'class="red-text"');
  },
};

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

function findShadowComponents(
  checkRoot,
  autoDetectShadowComponents,
  suppliedShadowComponents,
) {
  let webComponents;
  if (autoDetectShadowComponents === true) {
    // Elements to ignore.
    const ignore = 'sa11y-heading-label, sa11y-heading-anchor, sa11y-annotation, sa11y-tooltips, sa11y-dismiss-tooltip, sa11y-control-panel, #sa11y-colour-filters, #sa11y-colour-filters *, script';

    // Search all elements.
    const root = document.querySelector(checkRoot);
    const search = (root) ? Array.from(root.querySelectorAll(`*:not(${ignore})`)) : Array.from(document.body.querySelectorAll(`*:not(${ignore})`));

    // Query for open shadow roots & inject CSS utilities into every shadow DOM.
    const foundShadows = [];
    search.forEach((component) => {
      if (component.shadowRoot && component.shadowRoot.mode === 'open') {
        foundShadows.push(component);
        addStylestoShadow(component);
      }
    });

    // Return ALL web components on the page.
    const all = Array.from(foundShadows).map((component) => component.tagName.toLowerCase());
    webComponents = (all.length === 1) ? `${all.toString()}` : all.join(', ');
  } else {
    // If autoDetectShadowComponents is OFF, use provided shadow dom.
    webComponents = suppliedShadowComponents || '';

    // Append styles to each provided shadow dom.
    if (webComponents) {
      const providedShadow = document.querySelectorAll(webComponents);
      providedShadow.forEach((component) => {
        addStylestoShadow(component);
      });
    }
  }
  return webComponents;
}

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
    documentLinks,
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

    // Document links (Quality Assurance module)
    if (documentLinks) {
      Global.documentLinks = `${documentLinks}`;
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
    if (!root) root = Constants.Global.Root;
  } else if (desiredRoot === 'root') {
    root = Constants.Global.Root;
    if (!root) root = document.body;
  } else if (desiredRoot === 'panel') {
    root = Constants.Panel.panel;
    if (!root) root = document.body;
  } else {
    root = document.querySelector(desiredRoot);
    if (!root) root = document.body;
  }

  const shadowComponents = Constants.Shadow.Components;
  const shadow = (shadowComponents) ? `, ${shadowComponents}` : '';

  const exclusions = Constants.Exclusions.Container;
  const additional = (exclude !== undefined) ? `, ${exclude}` : '';

  /* Logic yoinked from Editoria11y */
  // 1. Elements array includes web components in the selector to be used as a placeholder.
  const elements = Array.from(root.querySelectorAll(`:is(${selector}${shadow}):not(${exclusions}${additional})`));

  if (shadowComponents.length) {
    // 2. Dive into the each shadow root and collect an array of its results.
    const shadowFind = [];
    // Remove first comma and whitespace.
    const prepShadow = shadowComponents.trim().replace(/^,+/, '');
    elements.forEach((el, i) => {
      if (el.matches(prepShadow)) {
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

/**
 * Checks if the document has finished loading, and if so, immediately calls the provided callback function. Otherwise, waits for the 'load' event to fire and then calls the callback function.
 * @param {function} callback - The callback function to be called when the document finishes loading.
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
 * @param {HTMLElement} element - The element to check for visibility.
 * @returns {boolean} - `true` if the element is visually hidden or hidden, `false` otherwise.
 */
function isElementVisuallyHiddenOrHidden(element) {
  if (element.getAttribute('hidden') || (element.offsetWidth === 0 && element.offsetHeight === 0) || (element.clientHeight === 1 && element.clientWidth === 1)) {
    return true;
  }
  const compStyles = getComputedStyle(element);
  return compStyles.getPropertyValue('display') === 'none';
}

/**
 * Checks if an element is hidden based on its attributes and styles.
 * @param {HTMLElement} element - The element to check for visibility.
 * @returns {boolean} - `true` if the element is hidden, `false` otherwise.
 */
function isElementHidden(element) {
  if (element.getAttribute('hidden') || (element.offsetWidth === 0 && element.offsetHeight === 0)) {
    return true;
  }
  const compStyles = getComputedStyle(element);
  return compStyles.getPropertyValue('display') === 'none';
}

/**
 * Escapes HTML special characters in a string.
 * @param {string} string - The string to escape.
 * @returns {string} - The escaped string with HTML special characters replaced by their corresponding entities.
 */
function escapeHTML(string) {
  const $div = document.createElement('div');
  $div.textContent = string;
  return $div.innerHTML.replaceAll('"', '&quot;').replaceAll("'", '&#039;').replaceAll('`', '&#x60;');
}

/**
 * Sanitizes an HTML string by replacing special characters with their corresponding HTML entities.
 * @param {string} string - The HTML string to sanitize.
 * @returns {string} - The sanitized HTML string with special characters replaced by their corresponding entities.
 * @link https://portswigger.net/web-security/cross-site-scripting/preventing
 */
function sanitizeHTML(string) {
  return string.replace(/[^\w. ]/gi, (c) => `&#${c.charCodeAt(0)};`);
}

/**
 * Retrieves the text content of an HTML element and removes extra whitespaces and line breaks.
 * @param {HTMLElement} element - The HTML element to retrieve the text content from.
 * @returns {string} - The text content of the HTML element with extra whitespaces and line breaks removed.
 */
function getText(element) {
  return element.textContent.replace(/[\n\r]+|[\s]{2,}/g, ' ').trim();
}

/**
 * Compute alt text on images within a text node.
 * @param {HTMLElement} element - The HTML element to compute the text content from.
 * @returns {string} - The computed text content of the HTML element, considering alt text of images if present.
 */
function computeTextNodeWithImage(element) {
  const textContent = getText(element);
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
      img.insertAdjacentHTML('afterend', ` <span data-sa11y-clone-image-text aria-hidden="true">${imgArray[0].getAttribute('alt')}</span>`);
    });
    returnText = textContent;
  }
  return returnText;
}

/**
 * Debounces a callback function, ensuring it is only executed after a certain wait period
 * has passed since the last invocation.
 * @param {function} callback - The callback function to debounce.
 * @param {number} wait - The wait period in milliseconds before the callback function is executed.
 * @returns {function} - The debounced function.
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
 * @param {Element} element - The element to clone.
 * @param {string} selector - The selector to match elements to be excluded from the clone. Optional.
 * @returns {Element} - The cloned element with excluded elements removed.
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
 * Computes the accessible name of an element based on various aria-* attributes.
 * @param {Element} element - The element for which the accessible name needs to be computed.
 * @returns {string} - The computed accessible name of the element.
 */
function computeAccessibleName(element) {
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
        const targetSelector = document.querySelector(`#${CSS.escape(x)}`);
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
      if (y.nodeType === 8) ; else if (y.nodeType === 3 || y.getAttribute('aria-labelledby') === null) {
        returnText += y.nodeValue;
      } else {
        const target = y.getAttribute('aria-labelledby').split(/\s+/);
        if (target.length > 0) {
          let returnAria = '';
          target.forEach((z) => {
            if (document.querySelector(`#${CSS.escape(z)}`) === null) {
              returnAria += ' ';
            } else {
              returnAria += `${document.querySelector(`#${CSS.escape(z)}`).firstChild.nodeValue} `;
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
}

/**
 * Finds the visible parent of an element that matches a given CSS property and value.
 * @param {Element} element - The element for which the visible parent needs to be found.
 * @param {string} property - The CSS property to match against.
 * @param {string} value - The value of the CSS property to match against.
 * @returns {Element|null} - The visible parent element that matches the given property and value, or null if not found.
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
 * @param {Element} element - The element for which the offset top needs to be calculated.
 * @returns {Object} - An object with a `top` property that represents the offset top of the element relative to the viewport.
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
 * @param {Element} element - The element to which the pulsing border effect needs to be added.
 */
function addPulse(element) {
  const border = 'data-sa11y-pulse-border';
  element.setAttribute(border, '');
  setTimeout(() => {
    element.removeAttribute(border);
  }, 2500);
}

/**
 * Gets the next sibling element that matches the given selector, or the next sibling element if no selector is provided.
 * @param {HTMLElement} element - The DOM element whose next sibling to retrieve.
 * @param {string} selector - The optional selector to filter the next siblings. If not provided, the next sibling element will be returned regardless of its type.
 * @returns {HTMLElement|string} - The next sibling element that matches the given selector, or the next sibling element if no selector is provided. If no matching sibling is found, an empty string is returned.
 */
function getNextSibling(element, selector) {
  let sibling = element.nextElementSibling;
  if (!selector) return sibling;
  while (sibling) {
    if (sibling.matches(selector)) return sibling;
    sibling = sibling.nextElementSibling;
  }
  return '';
}

/**
 * Generates a unique key for dismissing items.
 * @param {string} string - The string to be prepared for dismissal (without special chars).
 * @returns {string} - The truncated string with a maximum of 256 characters.
 */
function prepareDismissal(string) {
  return String(string).replace(/([^0-9a-zA-Z])/g, '').substring(0, 256);
}

/**
 * Generates a selector path for the given DOM element.
 * @param {Element} element - The DOM element for which to generate the selector path.
 * @returns {string} - The selector path as a string.
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
 * @param {Element} element - The DOM element to trap focus within.
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
 * @param {string} alertMessage - The alert message to be displayed.
 * @param {string} errorPreview - The error preview to be displayed (optional).
 * @returns {void}
 */
function createAlert(alertMessage, errorPreview) {
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
  if (errorPreview) {
    alertPreview.classList.add('panel-alert-preview');
    alertPreview.innerHTML = errorPreview;
  }
  setTimeout(() => {
    alertClose.focus();
  }, 300);

  // Closing alert sets focus back to Skip to Issue toggle.
  alertClose.addEventListener('click', () => {
    removeAlert();
    if (skipButton.hasAttribute('disabled')) {
      Sa11yPanel.getElementById('toggle').focus();
    } else {
      skipButton.focus();
    }
  });
}

/**
 * Finds all data-attributes specified in array, and removes them from the document.
 * @param {Array<string>} attributes - The array of data-attributes to be reset.
 * @param {string} root - The root element to search for elements (optional, defaults to 'document').
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
 * @param {string} root - The root element to search for elements (optional, defaults to 'document').
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
 * @param {Element} scrollArea - The scrollable area element to check.
 * @param {Element} container - The container element that wraps the scrollable area.
 */
function isScrollable(scrollArea, container) {
  if (scrollArea.scrollHeight > container.clientHeight) {
    container.classList.add('scrollable');
    scrollArea.setAttribute('tabindex', '0');
  } else {
    container.classList.remove('scrollable');
  }
}

const Elements = (function myElements() {
  const Found = {};
  function initializeElements(linksToFlag) {
    // Main selectors
    Found.Images = find(
      'img',
      'root',
      Constants.Exclusions.Images,
    );

    Found.Headings = find(
      'h1, h2, h3, h4, h5, h6, [role="heading"][aria-level]',
      'root',
      Constants.Exclusions.Headings,
    );

    Found.HeadingOne = find(
      'h1, [role="heading"][aria-level="1"]',
      'document',
      Constants.Exclusions.Headings,
    );

    Found.Links = find(
      'a[href]',
      'root',
      Constants.Exclusions.Links,
    );

    // Toggleable rulesets
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
      'p',
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

    Found.Ids = find(
      '[id]',
      'document',
      Constants.Exclusions.Container,
    );

    Found.Underlines = find(
      'u',
      'root',
      Constants.Exclusions.Container,
    );

    Found.Subscripts = find(
      'sup, sub',
      'root',
      Constants.Exclusions.Container,
    );

    Found.Language = Constants.Global.html.getAttribute('lang');

    Found.CustomErrorLinks = linksToFlag ? find(
      linksToFlag,
      'root',
      Constants.Exclusions.Container,
    ) : [];

    // iFrames
    Found.Iframes = find(
      'iframe, audio, video',
      'root',
      Constants.Exclusions.Container,
    );

    Found.Videos = Found.Iframes.filter(($el) => $el.matches(Constants.EmbeddedContent.Video));
    Found.Audio = Found.Iframes.filter(($el) => $el.matches(Constants.EmbeddedContent.Audio));
    Found.Visualizations = Found.Iframes.filter(($el) => $el.matches(Constants.EmbeddedContent.Visualization));
    Found.EmbeddedContent = Found.Iframes.filter(($el) => !$el.matches(Constants.EmbeddedContent.All));
  }

  /* ***************** */
  /* Annotations */
  /* ***************** */
  const Annotations = {};
  function initializeAnnotations() {
    Annotations.Array = find('sa11y-annotation', 'root');
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

/* ******************************************************** */
/*  Feature to detect if URL changed for bookmarklet/SPAs.  */
/* ******************************************************** */
function detectPageChanges(detectSPArouting, checkAll, resetAll) {
  // Feature to detect page changes (e.g. SPAs).
  if (detectSPArouting === true) {
    let url = Constants.Global.currentPage;

    const checkURL = debounce$2(async () => {
      if (url !== window.location.pathname) {
        if (store.getItem('sa11y-remember-panel') === 'Closed' || !store.getItem('sa11y-remember-panel')) {
          checkAll();
        } else {
          // Async scan while panel is open.
          resetAll(false);
          await checkAll();
        }

        // Performance: New URL becomes current.
        url = window.location.pathname;
      }
    }, 250);
    window.addEventListener('mousemove', checkURL);
    window.addEventListener('keydown', checkURL);
  }
}

/* ************************************************************ */
/*  Update results array before painting annotations to page.   */
/* ************************************************************ */
function dismissAnnotationsLogic(results, dismissTooltip) {
  // Get dismissed items and re-parse back into object.
  let dismissedIssues = store.getItem('sa11y-dismissed');
  dismissedIssues = dismissedIssues ? JSON.parse(dismissedIssues) : [];

  // Return element from results array that matches dismiss key and dismiss url. Then filter through matched objects.
  const findKey = dismissedIssues.map((e) => {
    const found = results.find((f) => (e.key.includes(f.dismiss) && e.href === Constants.Global.currentPage));
    if (found === undefined) return '';
    return found;
  });

  // Number of dismissed items found on the page.
  const dismissCount = results.filter((issue) => findKey.find((e) => e.dismiss === issue.dismiss)).length;

  // Update results array (exclude dismissed items).
  const updatedResults = results.filter((issue) => !findKey.find((e) => e.dismiss === issue.dismiss));

  // Show dismiss button in panel.
  if (dismissCount >= 1) {
    Constants.Panel.dismissButton.classList.add('active');
    Constants.Panel.dismissTooltip.innerText = Lang.sprintf('PANEL_DISMISS_BUTTON', dismissCount);
    dismissTooltip.object.setContent(Lang.sprintf('PANEL_DISMISS_BUTTON', dismissCount));
  } else {
    Constants.Panel.dismissButton.classList.remove('active');
  }

  return { dismissedIssues, updatedResults, dismissCount };
}

/* ************************************************************ */
/*  Logic for tooltip "Dismiss" buttons & panel restore button  */
/* ************************************************************ */
function dismissAnnotationsButtons(
  dismissAnnotationsOption,
  results,
  dismissed,
  checkAll,
  resetAll,
) {
  if (dismissAnnotationsOption === true) {
    // 1) Hide annotation upon click on dismiss button on warning. Dismiss button exists in both tooltip and control panel. Need to add event listeners to both components.
    const tooltips = document.querySelector('sa11y-tooltips').shadowRoot;
    const controlPanel = document.querySelector('sa11y-control-panel').shadowRoot;
    const dismissTooltipContainer = document.querySelector('sa11y-dismiss-tooltip');

    const handleClick = async (e) => {
      // Get dismissed array from localStorage.
      let savedDismissKeys = JSON.parse(store.getItem('sa11y-dismissed'));
      const element = e.target;
      dismissTooltipContainer.hidden = false;

      // Make sure event listener is attached to dismiss button.
      if (element.tagName === 'BUTTON' && element.hasAttribute('data-sa11y-dismiss')) {
        // Find corresponding issue within main issues object and mark as dismissed.
        const dismissItem = parseInt(element.getAttribute('data-sa11y-dismiss'), 10);
        const object = results.find(($el) => $el.id === dismissItem);

        if (savedDismissKeys === null) {
          // Give a one time reminder that dismissed items are temporary.
          setTimeout(() => createAlert(Lang._('DISMISS_REMINDER')), 0);
          // If no existing entries, create empty array to iterate on.
          savedDismissKeys = [];
        }

        // Dismissal object.
        const dismissalDetails = {
          key: object.dismiss,
          href: Constants.Global.currentPage,
        };

        const item = find(`[data-sa11y-annotation='${object.id}']`);
        const latestDismissed = item[0].getAttribute('data-sa11y-position');
        store.setItem('sa11y-latest-dismissed', latestDismissed);

        // Update dismiss array.
        store.setItem('sa11y-dismiss-item', JSON.stringify(dismissalDetails));
        savedDismissKeys.push(dismissalDetails);
        store.setItem('sa11y-dismissed', JSON.stringify(savedDismissKeys));
        store.removeItem('sa11y-dismiss-item'); // Remove temporary storage item.

        // Remove tooltip.
        if (element.closest('[data-tippy-root]') !== null) {
          element.closest('[data-tippy-root]').remove();
        }

        // Async scan upon dismiss.
        resetAll(false);
        await checkAll();

        // Reset event listeners.
        tooltips.removeEventListener('click', handleClick);
        controlPanel.removeEventListener('click', handleClick);
      }
    };

    tooltips.addEventListener('click', handleClick);
    controlPanel.addEventListener('click', handleClick);

    // 2) Restore hidden alerts on the CURRENT page only.
    Constants.Panel.dismissButton.onclick = async () => {
      dismissTooltipContainer.hidden = true; // Prevent flash of tooltip.
      const filtered = dismissed.filter((item) => item.href !== Constants.Global.currentPage);
      store.setItem('sa11y-dismissed', JSON.stringify(filtered));
      Constants.Panel.dismissButton.classList.remove('active');
      resetAll(false);
      await checkAll();
    };
  }
}

/* ************************************************************** */
/*  DaltonLens SVG filters to simulate color vision deficiencies  */
/*  Source: https://daltonlens.org/opensource-cvd-simulation/     */
/* ************************************************************** */
function addColourFilters() {
  if (Constants.Global.colourFilterPlugin === true) {
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

var styles = ":host{background:var(--sa11y-panel-bg);border-top:5px solid var(--sa11y-panel-bg-splitter);bottom:0;display:block;height:fit-content;position:fixed;width:100%;z-index:999999}*{-webkit-font-smoothing:auto!important;color:var(--sa11y-panel-primary);font-family:var(--sa11y-font-face)!important;font-size:var(--sa11y-normal-text);line-height:22px!important}#dialog{margin:20px auto;max-width:900px;padding:20px}h2{font-size:var(--sa11y-large-text);margin-top:0}a{color:var(--sa11y-hyperlink);cursor:pointer;text-decoration:underline}a:focus,a:hover{text-decoration:none}p{margin-top:0}.error{background:var(--sa11y-error);border:2px dashed #f08080;color:var(--sa11y-error-text);margin-bottom:0;padding:5px}";

var sharedStyles = ".visually-hidden{clip:rect(1px,1px,1px,1px);border:0;clip-path:inset(50%);display:block;height:1px;overflow:hidden;padding:0;position:absolute;white-space:nowrap;width:1px}[hidden]{display:none!important}.header-text,.header-text-inline,h2{color:var(--sa11y-panel-primary);display:block;font-size:var(--sa11y-large-text);font-weight:600;margin-bottom:3px}.header-text-inline{display:inline-block!important}.kbd,code,kbd{background-color:var(--sa11y-panel-badge);border-radius:3.2px;color:var(--sa11y-panel-primary);padding:1.6px 4.8px}code{font-family:monospace}.bold{font-weight:600}.red-text{color:var(--sa11y-red-text)}.red-text,.yellow-text{font-family:var(--sa11y-font-face);font-size:var(--sa11y-normal-text)}.yellow-text{color:var(--sa11y-yellow-text)}.close-btn{background:none;border:1px solid var(--sa11y-button-outline);border-radius:50%;color:var(--sa11y-panel-primary);cursor:pointer;float:var(--sa11y-float-rtl);font-size:var(--sa11y-normal-text);font-weight:400;height:32px;margin:0;position:relative;transition:all .2s ease-in-out;width:32px}.close-btn:focus,.close-btn:hover{background-color:var(--sa11y-shortcut-hover)}.close-btn:after{background:var(--sa11y-setting-switch-bg-off);bottom:-7px;content:\"\";left:-7px;mask:var(--sa11y-close-btn-svg) center no-repeat;-webkit-mask:var(--sa11y-close-btn-svg) center no-repeat;position:absolute;right:-7px;top:-7px}@media screen and (forced-colors:active){.close-btn:after{filter:invert(1)}}#container [tabindex=\"-1\"]:focus,#container [tabindex=\"0\"]:focus,#container a:focus,#container button:not(#settings-toggle):not(#outline-toggle):not(.switch):focus,#container select:focus{box-shadow:0 0 0 5px var(--sa11y-focus-color);outline:0}#container #outline-toggle:focus,#container #settings-toggle:focus,#container .switch:focus{box-shadow:inset 0 0 0 4px var(--sa11y-focus-color);outline:0}.tippy-box[data-theme~=sa11y-theme] [tabindex=\"-1\"]:focus,.tippy-box[data-theme~=sa11y-theme] a:focus,.tippy-box[data-theme~=sa11y-theme] button:active,.tippy-box[data-theme~=sa11y-theme] button:focus{box-shadow:0 0 0 5px var(--sa11y-focus-color);outline:0}#container #outline-toggle:focus:not(:focus-visible),#container #settings-toggle:focus:not(:focus-visible),#container [tabindex=\"-1\"]:focus:not(:focus-visible),#container [tabindex=\"0\"]:focus:not(:focus-visible),#container button:focus:not(:focus-visible),#container select:focus:not(:focus-visible){box-shadow:none;outline:0}.tippy-box[data-theme~=sa11y-theme] [tabindex=\"-1\"]:focus:not(:focus-visible),.tippy-box[data-theme~=sa11y-theme] a:focus:not(:focus-visible),.tippy-box[data-theme~=sa11y-theme] button:focus:not(:focus-visible){box-shadow:none;outline:0}#container [tabindex=\"-1\"]:focus-visible,#container [tabindex=\"0\"]:focus-visible,#container a:focus-visible,#container button:not(#settings-toggle):not(#outline-toggle):not(.switch):focus-visible,#container select:focus-visible{box-shadow:0 0 0 5px var(--sa11y-focus-color);outline:0}#container #outline-toggle:focus-visible,#container #settings-toggle:focus-visible,#container .switch:focus-visible{box-shadow:inset 0 0 0 4px var(--sa11y-focus-color);outline:0}.tippy-box[data-theme~=sa11y-theme] [tabindex=\"-1\"]:focus-visible,.tippy-box[data-theme~=sa11y-theme] a:focus-visible,.tippy-box[data-theme~=sa11y-theme] button:focus-visible{box-shadow:0 0 0 5px var(--sa11y-focus-color);outline:0}@media screen and (forced-colors:active){#outline-toggle:focus,#settings-toggle:focus{border:3px solid transparent}#container [tabindex=\"-1\"]:focus,#container [tabindex=\"0\"]:focus,#container a:focus,#container button:focus,#container select:focus,.close-btn:focus,.tippy-box[data-theme~=sa11y-theme] [tabindex=\"-1\"]:focus,.tippy-box[data-theme~=sa11y-theme] a:focus,.tippy-box[data-theme~=sa11y-theme] button:focus{outline:3px solid transparent!important}}";

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
      <p>${Lang.sprintf('CONSOLE_ERROR_MESSAGE', google, github)}</p>
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
    if (store.getItem('sa11y-remember-panel') === 'Opened') {
      e.preventDefault();
      store.setItem('sa11y-remember-panel', 'Closed');
      Constants.Panel.toggle.classList.remove('on');
      Constants.Panel.toggle.setAttribute('aria-expanded', 'false');
      resetAll();

      if (Constants.Panel.notifCount.innerHTML.trim() === '') {
        Constants.Panel.notifBadge.style.display = 'none';
      } else {
        Constants.Panel.notifBadge.style.display = 'flex';
      }
    } else {
      e.preventDefault();
      store.setItem('sa11y-remember-panel', 'Opened');
      Constants.Panel.toggle.classList.add('on');
      Constants.Panel.toggle.setAttribute('aria-expanded', 'true');
      checkAll();
      isScrollable(Constants.Panel.outlineList, Constants.Panel.outlineContent);
    }
  });

  // Remember to leave it open
  if (store.getItem('sa11y-remember-panel') === 'Opened') {
    Constants.Panel.toggle.classList.add('on');
    Constants.Panel.toggle.setAttribute('aria-expanded', 'true');
    Constants.Panel.panel.style.transform = '';
  }

  document.onkeydown = (e) => {
    const evt = e || window.event;
    if (evt.key === 'Escape' && Constants.Panel.panel.classList.contains('active')) {
      Constants.Panel.toggle.setAttribute('aria-expanded', 'false');
      Constants.Panel.toggle.classList.remove('on');
      Constants.Panel.toggle.click();
      resetAll();
    }

    // Alt + A to enable accessibility checker.
    if (evt.altKey && evt.code === 'KeyA') {
      Constants.Panel.toggle.click();
      Constants.Panel.toggle.focus();
      evt.preventDefault();
    }
  };
}

var panelStyles = "a,button,code,div,h1,h2,kbd,label,li,ol,p,span,strong,svg,ul{all:unset;box-sizing:border-box!important}:after,:before{all:unset}div{display:block}*{-webkit-font-smoothing:auto!important;font-family:var(--sa11y-font-face)!important;line-height:22px!important}label,li,ol,p,ul{font-size:var(--sa11y-normal-text);font-weight:400;letter-spacing:normal;word-break:normal}.sa11y-overflow{overflow:auto}#toggle{align-items:center;background:linear-gradient(0deg,#e040fb,#00bcd4);background-color:var(--sa11y-blue);background-size:150% 150%;border-radius:50%;bottom:15px;color:#fff;cursor:pointer;display:flex;height:55px;inset-inline-end:18px;justify-content:center;margin:0;overflow:visible;position:fixed;transition:all .2s ease-in-out;width:55px;z-index:2147483644}#toggle.left,#toggle.top-left{inset-inline-start:18px}#toggle.top-left,#toggle.top-right{bottom:unset;top:15px}@media screen and (forced-colors:active){#toggle{border:2px solid transparent}}#toggle svg{height:35px;width:35px}#toggle svg path{fill:var(--sa11y-panel-bg)}#toggle:focus,#toggle:hover{-webkit-animation:sa11y-toggle-gradient 3s ease;-moz-animation:sa11y-toggle-gradient 3s ease;animation:sa11y-toggle-gradient 3s ease}#toggle:disabled:focus,#toggle:disabled:hover{-webkit-animation:none;-moz-animation:none;animation:none}#toggle.on{background:linear-gradient(180deg,#e040fb,#00bcd4);background-color:var(--sa11y-blue)}#notification-badge{align-items:center;background-color:#eb0000;border:1px solid transparent;border-radius:50%;color:#fff;display:none;font-size:13px;font-weight:400;height:20px;justify-content:center;position:absolute;right:-3px;top:-3px;width:20px}#notification-badge.notification-badge-warning{background-color:var(--sa11y-warning-hover);border:1px solid var(--sa11y-warning);color:var(--sa11y-warning-text)}#panel{background:var(--sa11y-panel-bg);border-radius:4px;bottom:25px;box-shadow:0 0 20px 4px rgba(154,161,177,.15),0 4px 80px -8px rgba(36,40,47,.25),0 4px 4px -2px rgba(91,94,105,.15);inset-inline-end:42px;opacity:0;overflow:visible;position:fixed;transform:scale(0);transform-origin:100% 100%;transition:transform .2s,opacity .2s;transition:background .2s;visibility:hidden;z-index:2147483643}#panel.left,#panel.top-left{inset-inline-start:42px}#panel.top-left,#panel.top-right{bottom:unset;top:50px}#panel.active{height:auto;opacity:1;transform:scale(1);transform-origin:bottom right;transition:transform .2s,opacity .2s;visibility:visible}@media screen and (forced-colors:active){#panel{border:2px solid transparent}}#panel.active.left,[dir=rtl] #panel.active{transform-origin:bottom left}#panel.active.top-left{transform-origin:top left}#panel.active.top-right{transform-origin:top right}#panel-alert{display:none;opacity:0}#panel-alert.active{display:block;opacity:1}#panel-alert-content{align-items:center;border-bottom:1px solid var(--sa11y-panel-bg-splitter);color:var(--sa11y-panel-primary);max-height:200px;overflow-y:auto;padding:15px 20px 15px 15px;position:relative}#panel-alert-preview .close-tooltip{display:none}#panel-alert-preview,#panel-alert-text{font-family:var(--sa11y-font-face);font-size:var(--sa11y-normal-text);font-weight:400;line-height:22px}.panel-alert-preview{background:var(--sa11y-panel-bg-secondary);border:1px dashed var(--sa11y-panel-bg-splitter);border-radius:5px;margin-top:15px;padding:10px}button[data-sa11y-dismiss]{background:var(--sa11y-panel-bg);border:1px solid var(--sa11y-button-outline);border-radius:5px;color:var(--sa11y-panel-primary);cursor:pointer;display:block;margin:10px 5px 5px 0;padding:4px 8px}button[data-sa11y-dismiss]:focus,button[data-sa11y-dismiss]:hover{background:var(--sa11y-shortcut-hover)}h2{display:block;font-size:var(--sa11y-large-text);margin-bottom:3px}h2,strong{font-weight:600}a:not(#outline-list a){border-bottom:0;color:var(--sa11y-hyperlink);cursor:pointer;text-decoration:underline}a:focus,a:hover{text-decoration:none!important}hr{background:var(--sa11y-panel-bg-splitter);border:none;height:1px;margin:10px 0;opacity:1;padding:0}#dismiss-button,#skip-button{background:var(--sa11y-panel-bg-secondary);border:1px solid var(--sa11y-button-outline);border-radius:50px;cursor:pointer;display:none;height:36px;margin-inline-end:8px;margin-inline-start:2px;overflow:visible;position:relative;text-align:center;transition:all .1s ease-in-out;width:36px}#dismiss-button.active,#skip-button.active{display:block}#dismiss-button:disabled,#skip-button:disabled{background:none;border:0;box-shadow:none;cursor:default}#dismiss-button:before,#skip-button:before{bottom:-5px;content:\"\";left:-5px;position:absolute;right:-5px;top:-5px}#dismiss-button:focus:not(:disabled),#dismiss-button:hover:not(:disabled),#skip-button:focus:not(:disabled),#skip-button:hover:not(:disabled){background-color:var(--sa11y-shortcut-hover)}#panel.left #dismiss-button,#panel.left #skip-button,#panel.top-left #dismiss-button,#panel.top-left #skip-button{margin-inline-end:2px;margin-inline-start:8px}.dismiss-icon{background:var(--sa11y-setting-switch-bg-off);display:inline-block;height:24px;margin-bottom:-4px;mask:var(--sa11y-dismiss-icon) center no-repeat;-webkit-mask:var(--sa11y-dismiss-icon) center no-repeat;width:24px}@media screen and (forced-colors:active){.dismiss-icon{filter:invert(1)}}#panel-content{align-items:center;color:var(--sa11y-panel-primary);display:flex;padding:6px}#panel-content.errors .panel-icon,#panel-content.good .panel-icon,#panel-content.warnings .panel-icon{height:34px;width:34px}#panel-content.errors .panel-icon{background:var(--sa11y-panel-error);margin-top:-2px;mask:var(--sa11y-error-svg) center no-repeat;-webkit-mask:var(--sa11y-error-svg) center no-repeat}#panel-content.good .panel-icon{background:var(--sa11y-good);mask:var(--sa11y-good-svg) center no-repeat;-webkit-mask:var(--sa11y-good-svg) center no-repeat}#panel-content.warnings .panel-icon{background:var(--sa11y-warning-svg-color);mask:var(--sa11y-warning-svg) center no-repeat;-webkit-mask:var(--sa11y-warning-svg) center no-repeat;transform:scaleX(var(--sa11y-icon-direction))}@media screen and (forced-colors:active){#panel-content.errors .panel-icon,#panel-content.good .panel-icon,#panel-content.warnings .panel-icon{filter:invert(1)}}#panel.left #panel-content,#panel.top-left #panel-content{flex-direction:row-reverse}#status{font-size:var(--sa11y-large-text)}#status,.panel-count{color:var(--sa11y-panel-primary)}.panel-count{background-color:var(--sa11y-panel-badge);border-radius:4px;font-size:15px;font-weight:400;margin-left:3px;margin-right:3px;padding:2px 4px}#outline-panel,#page-issues,#settings-panel{color:var(--sa11y-panel-primary);display:none;opacity:0}#outline-panel.active,#page-issues.active,#settings-panel.active{display:block;opacity:1}.panel-header{padding:10px 15px 0}#outline-content,#page-issues-content,#settings-content{border-bottom:1px solid var(--sa11y-panel-bg-splitter);padding:0 15px 10px}#page-issues-content{max-height:160px;overflow-y:auto}#outline-content{max-height:250px;overflow-y:auto}#outline-panel .outline-list-item.sa11y-red-text,#settings-panel .sa11y-red-text{color:var(--sa11y-red-text)}#outline-list{display:block;margin:0;padding:0}#outline-list a{cursor:pointer;display:block;text-decoration:none}#outline-list li{display:block;list-style-type:none;margin-bottom:3px;margin-top:0;padding:0}#outline-list li:first-child{margin-top:5px}#outline-list li a:focus,#outline-list li a:hover{background:var(--sa11y-panel-outline-hover);border-radius:5px;box-shadow:0 0 0 2px var(--sa11y-panel-outline-hover);display:block}#outline-list .outline-2{margin-inline-start:15px}#outline-list .outline-3{margin-inline-start:30px}#outline-list .outline-4{margin-inline-start:45px}#outline-list .outline-5{margin-inline-start:60px}#outline-list .outline-6{margin-inline-start:75px}.badge{background-color:var(--sa11y-panel-badge);border:1px solid transparent;border-radius:10px;color:var(--sa11y-panel-primary);display:inline;font-size:13px;font-weight:700;min-width:10px;padding:2px 5px;text-align:center;white-space:nowrap}.error-badge{background:var(--sa11y-error);color:var(--sa11y-error-text)}.warning-badge{background:var(--sa11y-yellow-text);color:var(--sa11y-panel-bg)}.hidden-icon{background:var(--sa11y-panel-primary);display:inline-block;height:16px;margin-bottom:-3px;mask:var(--sa11y-hidden-icon-svg) center no-repeat;-webkit-mask:var(--sa11y-hidden-icon-svg) center no-repeat;width:16px}.error-badge .hidden-icon{background:var(--sa11y-error-text)}.warning-badge .hidden-icon{background:var(--sa11y-panel-bg)}@media screen and (forced-colors:active){.hidden-icon{filter:invert(1)}}#panel-controls{border-radius:0 0 4px 4px;display:flex;overflow:hidden}#outline-toggle,#settings-toggle{background:var(--sa11y-panel-bg-secondary);background-color:var(--sa11y-panel-bg-secondary);border-bottom:1px solid var(--sa11y-panel-bg-splitter);border-top:1px solid var(--sa11y-panel-bg-splitter);color:var(--sa11y-panel-secondary);cursor:pointer;display:block;font-size:var(--sa11y-normal-text);font-weight:400;height:30px;line-height:0;margin:0;opacity:1;outline:0;padding:0;position:relative;text-align:center;transition:background .2s;width:100%}#outline-toggle.outline-active,#outline-toggle.settings-active,#outline-toggle:hover,#settings-toggle.outline-active,#settings-toggle.settings-active,#settings-toggle:hover{background-color:var(--sa11y-shortcut-hover)}#outline-toggle.outline-active,#outline-toggle.settings-active,#settings-toggle.outline-active,#settings-toggle.settings-active{font-weight:500}#outline-toggle{border-inline-end:1px solid var(--sa11y-panel-bg-splitter)}label{display:inline-block;width:100%}#settings-panel .switch,label{color:var(--sa11y-panel-primary);cursor:pointer;font-weight:400;margin:0}#settings-panel .switch{background:none;border:0;border-radius:5px;font-size:var(--sa11y-normal-text);height:44px;padding:7px 10px;position:relative;text-align:end;width:105px}#settings-panel .switch[aria-pressed=false]:after,#settings-panel .switch[aria-pressed=true]:after{content:\"\";display:inline-block;height:27px;margin:0 4px 4px;vertical-align:middle;width:27px}#settings-panel .switch[aria-pressed=true]:after{background:var(--sa11y-setting-switch-bg-on);mask:var(--sa11y-setting-switch-on-svg) center no-repeat;-webkit-mask:var(--sa11y-setting-switch-on-svg) center no-repeat}#settings-panel .switch[aria-pressed=false]:after{background:var(--sa11y-setting-switch-bg-off);mask:var(--sa11y-setting-switch-off-svg) center no-repeat;-webkit-mask:var(--sa11y-setting-switch-off-svg) center no-repeat}@media screen and (forced-colors:active){#settings-panel .switch[aria-pressed=false]:after,#settings-panel .switch[aria-pressed=true]:after{filter:invert(1)}}#settings-panel #settings-options li{align-items:center;border-bottom:1px solid;border-color:var(--sa11y-panel-bg-splitter);display:flex;justify-content:space-between;list-style-type:none;padding:1px 0}#settings-panel #settings-options li:last-child{border:none}#page-issues{align-items:center;color:var(--sa11y-panel-primary)}#page-issues-list{display:block;margin-top:4px}#page-issues-list li{display:block;margin:0 0 10px}#page-issues-list strong{display:block}#panel-colour-filters{align-items:center;color:var(--sa11y-panel-primary);display:none;font-family:var(--sa11y-font-face);font-size:var(--sa11y-normal-text);font-weight:400;line-height:22px}#panel-colour-filters.active{display:flex}#panel-colour-filters p{padding:6px 20px 6px 6px;width:100%}#panel-colour-filters[data-colour=protanopia]{border-bottom:6px solid transparent;border-image:linear-gradient(94deg,#786719 11%,#e0c600 36%,#e0c600 47%,#0059e3 75%,#0042aa 91%);border-image-slice:1}#panel-colour-filters[data-colour=deuteranopia]{border-bottom:6px solid transparent;border-image:linear-gradient(270deg,#567fdb,#a4a28d 48%,#c3ad14 69%,#a79505);border-image-slice:1}#panel-colour-filters[data-colour=tritanopia]{border-bottom:6px solid transparent;border-image:linear-gradient(270deg,#b1506f,#0696c1 35%,#f3a9ba 70%,#d91c5d 87%,#fe015c);border-image-slice:1}#panel-colour-filters[data-colour=monochromacy]{border-bottom:6px solid transparent;border-image:linear-gradient(270deg,#000,#a7a7a7 50%,#000);border-image-slice:1}#panel-colour-filters[data-colour=protanopia] .panel-icon{background:var(--sa11y-panel-error)}#panel-colour-filters[data-colour=deuteranopia] .panel-icon{background:var(--sa11y-good-hover)}#panel-colour-filters[data-colour=tritanopia] .panel-icon{background:var(--sa11y-blue)}#panel-colour-filters[data-colour=monochromacy] .panel-icon{background:linear-gradient(90deg,#38a459 20%,red 50%,#0077c8 80%)}#panel-colour-filters .panel-icon{height:30px;margin-inline-end:5px;margin-inline-start:10px;mask:var(--sa11y-low-vision-icon) center no-repeat;-webkit-mask:var(--sa11y-low-vision-icon) center no-repeat;width:30px}@media screen and (forced-colors:active){#panel-colour-filters .panel-icon{forced-color-adjust:none}}.select-dropdown:after{border-left:5px solid transparent;border-right:5px solid transparent;border-top:5px solid var(--sa11y-setting-switch-bg-off);content:\" \";height:0;inset-inline-end:25px;margin-top:22.5px;position:absolute;width:0}#colour-filter-select{-webkit-appearance:none;-moz-appearance:none;appearance:none;background:none;border:2px solid var(--sa11y-setting-switch-bg-off);border-radius:5px;color:var(--sa11y-panel-primary);cursor:pointer;font-size:var(--sa11y-normal-text);font-weight:400;height:30px;padding-inline-end:25px;padding-inline-start:5px;position:relative;text-align:end;vertical-align:middle}#colour-filter-select.active{box-shadow:0 0 0 2px var(--sa11y-setting-switch-bg-on)}#colour-filter-item label,#colour-filter-item select{margin-bottom:9px;margin-top:10px}#readability-panel{display:none;opacity:0}#readability-panel.active{display:block;opacity:1}#readability-content{border-bottom:1px solid var(--sa11y-panel-bg-splitter);color:var(--sa11y-panel-primary);padding:10px 15px;width:100%}#readability-details{list-style-type:none;margin:0;padding:0;white-space:normal}#readability-details li{display:inline-block;list-style-type:none;margin:0;padding-inline-end:10px}.readability-score{background-color:var(--sa11y-panel-badge);border-radius:4px;color:var(--sa11y-panel-primary);margin-inline-start:5px;padding:2px 5px}#readability-info{margin-inline-start:10px}#skip-to-page-issues{display:none}#panel.has-page-issues #skip-to-page-issues{clip:rect(0,0,0,0);background:var(--sa11y-panel-bg);border:0;border-radius:5px;display:block;height:1px;margin:-1px;overflow:hidden;padding:0;position:absolute;white-space:nowrap;width:1px}#panel.has-page-issues #skip-to-page-issues:focus{clip:auto;height:auto;margin:0;overflow:visible;padding:5px 7px;white-space:normal;width:auto;z-index:1}.hide-settings-border{border-bottom:0!important;padding:0 15px!important}::-webkit-scrollbar{width:7px}::-webkit-scrollbar-thumb{background-color:var(--sa11y-button-outline);border-radius:6px}*{scrollbar-color:var(--sa11y-button-outline);scrollbar-width:thin}.scrollable:before{animation:fade 1s ease-in-out;background-image:linear-gradient(180deg,transparent 0,transparent 70%,var(--sa11y-panel-scrollable) 100%);background-position:bottom;bottom:auto;content:\"\";height:250px;left:0;position:absolute;right:0;top:auto;transition:opacity 1s ease-in-out;z-index:-1}#page-issues-content.scrollable:before{height:160px}#panel-alert.scrollable:before{height:200px}@keyframes sa11y-toggle-gradient{0%{background-position:50% 0}50%{background-position:50% 100%}to{background-position:50% 0}}@keyframes fade{0%{opacity:0}to{opacity:1}}@media (prefers-reduced-motion:reduce){*{animation:none!important;transform:none!important;transition:none!important}}#panel{width:375px}#container:lang(en) #panel{width:305px}#container:lang(de) #panel,#container:lang(pl) #panel,#container:lang(sv) #panel{width:335px}#container:lang(fr) .switch,#container:lang(ua) .switch{width:205px}";

class ControlPanel extends HTMLElement {
  connectedCallback() {
    this.attachShadow({ mode: 'open' });

    // Styles
    const style = document.createElement('style');
    style.textContent = panelStyles + sharedStyles;
    this.shadowRoot.appendChild(style);

    // Icon for the main toggle.
    const MainToggleIcon = '<svg aria-hidden="true" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path d="M256 48c114.953 0 208 93.029 208 208 0 114.953-93.029 208-208 208-114.953 0-208-93.029-208-208 0-114.953 93.029-208 208-208m0-40C119.033 8 8 119.033 8 256s111.033 248 248 248 248-111.033 248-248S392.967 8 256 8zm0 56C149.961 64 64 149.961 64 256s85.961 192 192 192 192-85.961 192-192S362.039 64 256 64zm0 44c19.882 0 36 16.118 36 36s-16.118 36-36 36-36-16.118-36-36 16.118-36 36-36zm117.741 98.023c-28.712 6.779-55.511 12.748-82.14 15.807.851 101.023 12.306 123.052 25.037 155.621 3.617 9.26-.957 19.698-10.217 23.315-9.261 3.617-19.699-.957-23.316-10.217-8.705-22.308-17.086-40.636-22.261-78.549h-9.686c-5.167 37.851-13.534 56.208-22.262 78.549-3.615 9.255-14.05 13.836-23.315 10.217-9.26-3.617-13.834-14.056-10.217-23.315 12.713-32.541 24.185-54.541 25.037-155.621-26.629-3.058-53.428-9.027-82.141-15.807-8.6-2.031-13.926-10.648-11.895-19.249s10.647-13.926 19.249-11.895c96.686 22.829 124.283 22.783 220.775 0 8.599-2.03 17.218 3.294 19.249 11.895 2.029 8.601-3.297 17.219-11.897 19.249z"/></svg>';

    const rememberContrast = store.getItem('sa11y-remember-contrast') === 'On';
    const rememberFormLabels = store.getItem('sa11y-remember-labels') === 'On';
    const rememberLinksAdvanced = store.getItem('sa11y-remember-links-advanced') === 'On';
    const rememberReadability = store.getItem('sa11y-remember-readability') === 'On';

    // If admin wants users to check everything, without toggleable checks.
    const checkAll = Constants.Global.checkAllHideToggles === true;

    // Panel position: left or right side.
    const { panelPosition } = Constants.Global;

    /* TOGGLEABLE PLUGINS */
    const contrastPlugin = (Constants.Global.contrastPlugin === true) ? `
      <li id="contrast-item" ${checkAll ? 'hidden' : ''}>
        <label id="check-contrast" for="contrast-toggle">${Lang._('CONTRAST')}</label>
        <button id="contrast-toggle"
          aria-labelledby="check-contrast"
          class="switch"
          aria-pressed="${rememberContrast ? 'true' : 'false'}">${rememberContrast ? Lang._('ON') : Lang._('OFF')}</button>
      </li>` : '';

    const formLabelsPlugin = (Constants.Global.formLabelsPlugin === true) ? `
      <li id="form-labels-item" ${checkAll ? 'hidden' : ''}>
        <label id="check-labels" for="labels-toggle">${Lang._('FORM_LABELS')}</label>
        <button id="labels-toggle"
          aria-labelledby="check-labels"
          class="switch"
          aria-pressed="${rememberFormLabels ? 'true' : 'false'}">${rememberFormLabels ? Lang._('ON') : Lang._('OFF')}</button>
      </li>` : '';

    const linksAdvancedPlugin = (Constants.Global.linksAdvancedPlugin === true) ? `
      <li id="links-advanced-item" ${checkAll ? 'hidden' : ''}>
        <label id="check-changerequest" for="links-advanced-toggle">${Lang._('LINKS_ADVANCED')} <span class="badge">AAA</span></label>
        <button id="links-advanced-toggle"
          aria-labelledby="check-changerequest"
          class="switch"
          aria-pressed="${rememberLinksAdvanced ? 'true' : 'false'}">${rememberLinksAdvanced ? Lang._('ON') : Lang._('OFF')}</button>
      </li>` : '';

    const readabilityPlugin = (Constants.Readability.Plugin === true) ? `
      <li id="readability-item">
        <label id="check-readability" for="readability-toggle">${Lang._('LANG_READABILITY')} <span class="badge">AAA</span></label>
        <button id="readability-toggle"
          aria-labelledby="check-readability"
          class="switch"
          aria-pressed="${rememberReadability ? 'true' : 'false'}">${rememberReadability ? Lang._('ON') : Lang._('OFF')}</button>
      </li>` : '';

    const colourFilterPlugin = (Constants.Global.colourFilterPlugin === true) ? `
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

    const colourFilterPanel = (Constants.Global.colourFilterPlugin === true) ? `
      <div id="panel-colour-filters" role="region" aria-labelledby="colour-filter-mode">
        <div id="filter-icon" class="panel-icon" role="img"></div>
        <p>${Lang._('COLOUR_FILTER_MESSAGE')}</p>
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
            <h2 class="header-text-inline">${Lang._('LANG_READABILITY')}</h2>
            <p id="readability-info"></p>
            <ul id="readability-details"></ul>
          </div>
        </div>
      </div>`;

    /* PAGE SETTINGS */
    const pageSettings = `
      <div id="settings-panel" role="tabpanel" aria-labelledby="settings-header">
        <div class="panel-header">
          <h2 id="settings-header" tabindex="-1">${Lang._('SETTINGS')}</h2>
        </div>
        <div id="settings-content">
          <ul id="settings-options">
            ${contrastPlugin}
            ${formLabelsPlugin}
            ${linksAdvancedPlugin}
            ${readabilityPlugin}
            <li id="dark-mode-item">
              <label id="dark-mode" for="theme-toggle">${Lang._('DARK_MODE')}</label>
              <button id="theme-toggle"
                aria-labelledby="dark-mode"
                class="switch"></button>
            </li>
            ${colourFilterPlugin}
          </ul>
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
          <span class="visually-hidden">${Lang._('SHORTCUT_SCREEN_READER')}</span>
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
    const tabToggles = `
      <div id="panel-controls" role="tablist" aria-orientation="horizontal">
        ${(panelPosition === 'left') ? '<div style="width:40px"></div>' : ''}
        <button type="button" role="tab" aria-expanded="false" id="outline-toggle" aria-controls="outline-panel">${Lang._('OUTLINE')}</button>
        <button type="button" role="tab" aria-expanded="false" id="settings-toggle" aria-controls="settings-panel">${Lang._('SETTINGS')}</button>
        ${(panelPosition === 'right') ? '<div style="width:40px"></div>' : ''}
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
  /* ***************** */
  /*  Contrast toggle  */
  /* ***************** */
  if (Constants.Global.contrastPlugin === true) {
    Constants.Panel.contrastToggle.onclick = async () => {
      if (store.getItem('sa11y-remember-contrast') === 'On') {
        store.setItem('sa11y-remember-contrast', 'Off');
        Constants.Panel.contrastToggle.textContent = `${Lang._('OFF')}`;
        Constants.Panel.contrastToggle.setAttribute('aria-pressed', 'false');
        resetAll(false);
        await checkAll();
      } else {
        store.setItem('sa11y-remember-contrast', 'On');
        Constants.Panel.contrastToggle.textContent = `${Lang._('ON')}`;
        Constants.Panel.contrastToggle.setAttribute('aria-pressed', 'true');
        resetAll(false);
        await checkAll();
      }
    };
  } else {
    store.setItem('sa11y-remember-contrast', 'Off');
  }

  /* ***************** */
  /*  Form Labels      */
  /* ***************** */
  if (Constants.Global.formLabelsPlugin === true) {
    Constants.Panel.labelsToggle.onclick = async () => {
      if (store.getItem('sa11y-remember-labels') === 'On') {
        store.setItem('sa11y-remember-labels', 'Off');
        Constants.Panel.labelsToggle.textContent = `${Lang._('OFF')}`;
        Constants.Panel.labelsToggle.setAttribute('aria-pressed', 'false');
        resetAll(false);
        await checkAll();
      } else {
        store.setItem('sa11y-remember-labels', 'On');
        Constants.Panel.labelsToggle.textContent = `${Lang._('ON')}`;
        Constants.Panel.labelsToggle.setAttribute('aria-pressed', 'true');
        resetAll(false);
        await checkAll();
      }
    };
  } else {
    store.setItem('sa11y-remember-labels', 'Off');
  }

  /* ****************** */
  /*  Links (Advanced)  */
  /* ****************** */
  if (Constants.Global.linksAdvancedPlugin === true) {
    Constants.Panel.linksToggle.onclick = async () => {
      if (store.getItem('sa11y-remember-links-advanced') === 'On') {
        store.setItem('sa11y-remember-links-advanced', 'Off');
        Constants.Panel.linksToggle.textContent = `${Lang._('OFF')}`;
        Constants.Panel.linksToggle.setAttribute('aria-pressed', 'false');
        resetAll(false);
        await checkAll();
      } else {
        store.setItem('sa11y-remember-links-advanced', 'On');
        Constants.Panel.linksToggle.textContent = `${Lang._('ON')}`;
        Constants.Panel.linksToggle.setAttribute('aria-pressed', 'true');
        resetAll(false);
        await checkAll();
      }
    };
  } else {
    store.setItem('sa11y-remember-links-advanced', 'Off');
  }

  /* ****************** */
  /*  Readability       */
  /* ****************** */
  if (Constants.Readability.Plugin === true) {
    Constants.Panel.readabilityToggle.onclick = async () => {
      if (store.getItem('sa11y-remember-readability') === 'On') {
        store.setItem('sa11y-remember-readability', 'Off');
        Constants.Panel.readabilityToggle.textContent = `${Lang._('OFF')}`;
        Constants.Panel.readabilityToggle.setAttribute('aria-pressed', 'false');
        Constants.Panel.readability.classList.remove('active');
        resetAll(false);
        await checkAll();
      } else {
        store.setItem('sa11y-remember-readability', 'On');
        Constants.Panel.readabilityToggle.textContent = `${Lang._('ON')}`;
        Constants.Panel.readabilityToggle.setAttribute('aria-pressed', 'true');
        Constants.Panel.readability.classList.add('active');
        resetAll(false);
        await checkAll();
      }
    };

    if (store.getItem('sa11y-remember-readability') === 'On') {
      Constants.Panel.readability.classList.add('active');
    }
  }

  /**
   * Toggle: Dark Mode
   * Credits: Derek Kedziora
   * @link https://derekkedziora.com/blog/dark-mode-revisited
  */
  const systemInitiatedDark = window.matchMedia('(prefers-color-scheme: dark)');
  if (systemInitiatedDark.matches) {
    Constants.Panel.themeToggle.textContent = `${Lang._('ON')}`;
    Constants.Panel.themeToggle.setAttribute('aria-pressed', 'true');
  } else {
    Constants.Panel.themeToggle.textContent = `${Lang._('OFF')}`;
    Constants.Panel.themeToggle.setAttribute('aria-pressed', 'false');
  }
  const prefersColorTest = () => {
    if (systemInitiatedDark.matches) {
      Constants.Global.html.setAttribute('data-sa11y-theme', 'dark');
      Constants.Panel.themeToggle.textContent = `${Lang._('ON')}`;
      Constants.Panel.themeToggle.setAttribute('aria-pressed', 'true');
      store.setItem('sa11y-remember-theme', '');
    } else {
      Constants.Global.html.setAttribute('data-sa11y-theme', 'light');
      Constants.Panel.themeToggle.textContent = `${Lang._('OFF')}`;
      Constants.Panel.themeToggle.setAttribute('aria-pressed', 'false');
      store.setItem('sa11y-remember-theme', '');
    }
  };
  systemInitiatedDark.addEventListener('change', prefersColorTest);
  Constants.Panel.themeToggle.onclick = async () => {
    const theme = store.getItem('sa11y-remember-theme');
    if (theme === 'dark') {
      Constants.Global.html.setAttribute('data-sa11y-theme', 'light');
      store.setItem('sa11y-remember-theme', 'light');
      Constants.Panel.themeToggle.textContent = `${Lang._('OFF')}`;
      Constants.Panel.themeToggle.setAttribute('aria-pressed', 'false');
    } else if (theme === 'light') {
      Constants.Global.html.setAttribute('data-sa11y-theme', 'dark');
      store.setItem('sa11y-remember-theme', 'dark');
      Constants.Panel.themeToggle.textContent = `${Lang._('ON')}`;
      Constants.Panel.themeToggle.setAttribute('aria-pressed', 'true');
    } else if (systemInitiatedDark.matches) {
      Constants.Global.html.setAttribute('data-sa11y-theme', 'light');
      store.setItem('sa11y-remember-theme', 'light');
      Constants.Panel.themeToggle.textContent = `${Lang._('OFF')}`;
      Constants.Panel.themeToggle.setAttribute('aria-pressed', 'false');
    } else {
      Constants.Global.html.setAttribute('data-sa11y-theme', 'dark');
      store.setItem('sa11y-remember-theme', 'dark');
      Constants.Panel.themeToggle.textContent = `${Lang._('ON')}`;
      Constants.Panel.themeToggle.setAttribute('aria-pressed', 'true');
    }
  };
  const theme = store.getItem('sa11y-remember-theme');
  if (theme === 'dark') {
    Constants.Global.html.setAttribute('data-sa11y-theme', 'dark');
    store.setItem('sa11y-remember-theme', 'dark');
    Constants.Panel.themeToggle.textContent = `${Lang._('ON')}`;
    Constants.Panel.themeToggle.setAttribute('aria-pressed', 'true');
  } else if (theme === 'light') {
    Constants.Global.html.setAttribute('data-sa11y-theme', 'light');
    store.setItem('sa11y-remember-theme', 'light');
    Constants.Panel.themeToggle.textContent = `${Lang._('OFF')}`;
    Constants.Panel.themeToggle.setAttribute('aria-pressed', 'false');
  }

  /* ****************** */
  /*  Colour filters    */
  /* ****************** */
  if (Constants.Global.colourFilterPlugin === true) {
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
          createAlert(Lang._('COLOUR_FILTER_HIGH_CONTRAST_MESSAGE'));
        } else {
          // Set attributes.
          Constants.Global.Root.setAttribute('data-sa11y-filter', filters[option - 1]);
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
        Constants.Global.Root.removeAttribute('data-sa11y-filter');
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

/* **************************************************************** */
/*  Main panel: Initialize Show Outline and Settings buttons/tabs.  */
/* **************************************************************** */
function initializePanelToggles() {
  // Show outline panel
  Constants.Panel.outlineToggle.addEventListener('click', () => {
    if (Constants.Panel.outlineToggle.getAttribute('aria-expanded') === 'true') {
      Constants.Panel.outlineToggle.classList.remove('outline-active');
      Constants.Panel.outline.classList.remove('active');
      Constants.Panel.outlineToggle.setAttribute('aria-expanded', 'false');
      store.setItem('sa11y-remember-outline', 'Closed');

      // Toggle visibility of heading labels
      const $headingAnnotations = document.querySelectorAll('sa11y-heading-label');
      // eslint-disable-next-line no-return-assign, no-param-reassign
      $headingAnnotations.forEach(($el) => $el.hidden = true);
      isScrollable(Constants.Panel.outlineList, Constants.Panel.outlineContent);
    } else {
      Constants.Panel.outlineToggle.classList.add('outline-active');
      Constants.Panel.outline.classList.add('active');
      Constants.Panel.outlineToggle.setAttribute('aria-expanded', 'true');
      store.setItem('sa11y-remember-outline', 'Opened');

      // Toggle visibility of heading labels
      const $headingAnnotations = document.querySelectorAll('sa11y-heading-label');
      // eslint-disable-next-line no-return-assign, no-param-reassign
      $headingAnnotations.forEach(($el) => $el.hidden = false);
    }

    // Set focus on Page Outline heading for accessibility.
    Constants.Panel.outlineHeader.focus();

    // Close Settings panel when Show Outline is active.
    Constants.Panel.settings.classList.remove('active');
    Constants.Panel.settingsToggle.classList.remove('settings-active');
    Constants.Panel.settingsToggle.setAttribute('aria-expanded', 'false');
    isScrollable(Constants.Panel.outlineList, Constants.Panel.outlineContent);
  });

  // Remember to leave outline open
  if (store.getItem('sa11y-remember-outline') === 'Opened') {
    Constants.Panel.outlineToggle.classList.add('outline-active');
    Constants.Panel.outline.classList.add('active');
    Constants.Panel.outlineToggle.setAttribute('aria-expanded', 'true');

    setTimeout(() => {
      isScrollable(Constants.Panel.outlineList, Constants.Panel.outlineContent);
    }, 0);
  }

  // Show settings panel
  Constants.Panel.settingsToggle.addEventListener('click', () => {
    if (Constants.Panel.settingsToggle.getAttribute('aria-expanded') === 'true') {
      Constants.Panel.settingsToggle.classList.remove('settings-active');
      Constants.Panel.settings.classList.remove('active');
      Constants.Panel.settingsToggle.setAttribute('aria-expanded', 'false');
    } else {
      Constants.Panel.settingsToggle.classList.add('settings-active');
      Constants.Panel.settings.classList.add('active');
      Constants.Panel.settingsToggle.setAttribute('aria-expanded', 'true');
    }

    // Set focus on Settings heading for accessibility.
    Constants.Panel.settingsHeader.focus();

    // Toggle visibility of heading labels
    const $headingAnnotations = document.querySelectorAll('sa11y-heading-label');
    // eslint-disable-next-line no-return-assign, no-param-reassign
    $headingAnnotations.forEach(($el) => $el.hidden = true);

    // Close Show Outline panel when Settings is active.
    Constants.Panel.outline.classList.remove('active');
    Constants.Panel.outlineToggle.classList.remove('outline-active');
    Constants.Panel.outlineToggle.setAttribute('aria-expanded', 'false');
    store.setItem('sa11y-remember-outline', 'Closed');

    // Keyboard accessibility fix for scrollable panel content.
    if (Constants.Panel.settingsContent.clientHeight > 350) {
      Constants.Panel.settingsContent.setAttribute('tabindex', '0');
      Constants.Panel.settingsContent.setAttribute('aria-label', `${Lang._('SETTINGS')}`);
      Constants.Panel.settingsContent.setAttribute('role', 'region');
    }
  });

  // Accessibility: Skip link to Page Issues
  Constants.Panel.skipToPageIssues.addEventListener('click', () => {
    Constants.Panel.pageIssuesHeader.focus();
  });

  // Page issues: add gradient if scrollable list.
  setTimeout(() => {
    isScrollable(Constants.Panel.pageIssuesList, Constants.Panel.pageIssuesContent);
  }, 0);

  // Enhanced keyboard accessibility for panel.
  Constants.Panel.controls.addEventListener('keydown', (e) => {
    const $tab = Constants.Panel.panel.querySelectorAll('#outline-toggle[role=tab], #settings-toggle[role=tab]');
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
}

/**
 * Create Page Outline.
*/

function generatePageOutline(
  dismissed,
  headingOutline,
) {
  // Create a single array that gets appended to heading outline, instead of creating a new HTML element everytime you iterate through each object.
  const outlineArray = [];

  // Find all dismissed headings and update headingOutline array.
  const findDismissedHeadings = dismissed.map((e) => {
    const found = headingOutline.find((f) => (e.key.includes(f.dismiss) && e.href === Constants.Global.currentPage));
    if (found === undefined) return '';
    return found;
  });
  findDismissedHeadings.forEach(($el) => {
    Object.assign($el, { dismissedHeading: true });
  });

  // Iterate through object that contains all headings (and error type).
  headingOutline.forEach((obj) => {
    const $el = obj.element;
    const level = obj.headingLevel;
    const headingText = obj.text;
    const i = obj.index;
    const issue = obj.type;
    const visibility = obj.hidden;
    const parent = obj.visibleParent;
    const dismissedH = obj.dismissedHeading;

    // Filter out specified headings in outlineIgnore prop.
    let ignoreArray = [];
    if (Constants.Exclusions.Outline) {
      ignoreArray = Array.from(document.querySelectorAll(Constants.Exclusions.Outline));
    }
    if (!ignoreArray.includes($el)) {
      // Indicate if heading is totally hidden or visually hidden.
      const visibleIcon = (visibility === true) ? '<span class="hidden-icon"></span><span class="visually-hidden">Hidden</span>' : '';
      const visibleStatus = (visibility === true) ? 'class="hidden-h"' : '';

      let append;
      if (issue === Constants.Global.ERROR) {
        append = `
        <li class="outline-${level}">
          <a role="button" id="sa11y-link-${i}" tabindex="-1" ${visibleStatus}>
            <span class="badge error-badge">
            <span aria-hidden="true">${visibleIcon} &#33;</span>
            <span class="visually-hidden">${Lang._('ERROR')}</span> ${level}</span>
            <strong class="outline-list-item red-text">${headingText}</strong>
          </a>
        </li>`;
        outlineArray.push(append);
      } else if (issue === Constants.Global.WARNING && !dismissedH) {
        append = `
        <li class="outline-${level}">
          <a role="button" id="sa11y-link-${i}" tabindex="-1" ${visibleStatus}>
            <span class="badge warning-badge">
            <span aria-hidden="true">${visibleIcon} &#x3f;</span>
            <span class="visually-hidden">${Lang._('WARNING')}</span> ${level}</span>
            <strong class="outline-list-item yellow-text">${headingText}</strong>
          </a>
        </li>`;
        outlineArray.push(append);
      } else {
        append = `
        <li class="outline-${level}">
          <a role="button" id="sa11y-link-${i}" tabindex="-1" ${visibleStatus}>
            <span class="badge">${visibleIcon} ${level}</span>
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
    if (store.getItem('sa11y-remember-outline') === 'Opened') {
      label.hidden = false;
    }
  });

  // Append headings to Page Outline.
  Constants.Panel.outlineList.innerHTML = outlineArray.join(' ');

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
        'root',
        Constants.Exclusions.Container,
      );

      const pulseAndScroll = (heading) => {
        addPulse(heading.parentElement);
        heading.scrollIntoView({
          behavior: `${Constants.Global.scrollBehaviour}`,
          block: 'center',
        });
      };

      const smoothPulse = (e) => {
        if ((e.type === 'keyup' && e.code === 'Enter') || e.type === 'click') {
          headingID.forEach((heading) => {
            pulseAndScroll(heading);
          });

          if (outlineLink.classList.contains('hidden-h')) {
            createAlert(`${Lang._('HEADING_NOT_VISIBLE_ALERT')}`);
          } else if (Constants.Panel.alert.classList.contains('active')) {
            removeAlert();
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
  return dismissed;
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
  } else {
    if (dismissCount > 0) {
      Constants.Panel.status.innerHTML = `${Lang._('DISMISSED')} <span class="panel-count">${dismissCount}</span>`;
      Constants.Panel.skipButton.classList.remove('active');
    } else {
      Constants.Panel.content.setAttribute('class', 'good');
      Constants.Panel.status.innerHTML = `${Lang._('PANEL_STATUS_NONE')}`;
    }
    // If there are no button annotations, disable the Skip-to-Toggle switch.
    const annotations = document.querySelectorAll('sa11y-annotation');
    if (annotations.length === 0) {
      Constants.Panel.skipButton.disabled = true;
    }
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
    Constants.Panel.notifText.innerText = `${Lang._('PANEL_ICON_WARNINGS')}`;
  } else {
    Constants.Panel.notifBadge.classList.remove('notification-badge-warning');
    Constants.Panel.notifCount.innerText = `${totalCount}`;
    Constants.Panel.notifText.innerText = Lang._('PANEL_ICON_TOTAL');
  }

  // Don't show badge when panel is opened.
  if (store.getItem('sa11y-remember-panel') === 'Opened' || totalCount === 0) {
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
    if (issue === Constants.Global.ERROR) {
      updatedErrorCount += 1;
    } else if (issue === Constants.Global.WARNING) {
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

var tooltipStyles = "a,button,code,div,h1,h2,kbd,li,ol,p,span,strong,svg,ul{all:unset;box-sizing:border-box!important}div{display:block}:after,:before{all:unset}.tippy-box[data-animation=fade][data-state=hidden]{opacity:0}[data-tippy-root]{max-width:calc(100vw - 10px)}@media (forced-colors:active){[data-tippy-root]{border:2px solid transparent;border-radius:5px}}.tippy-box[data-placement^=top]>.tippy-arrow{bottom:0}.tippy-box[data-placement^=top]>.tippy-arrow:before{border-top-color:initial;border-width:8px 8px 0;bottom:-7px;left:0;transform-origin:center top}.tippy-box[data-placement^=bottom]>.tippy-arrow{top:0}.tippy-box[data-placement^=bottom]>.tippy-arrow:before{border-bottom-color:initial;border-width:0 8px 8px;left:0;top:-7px;transform-origin:center bottom}.tippy-box[data-placement^=left]>.tippy-arrow{right:0}.tippy-box[data-placement^=left]>.tippy-arrow:before{border-left-color:initial;border-width:8px 0 8px 8px;right:-7px;transform-origin:center left}.tippy-box[data-placement^=right]>.tippy-arrow{left:0}.tippy-box[data-placement^=right]>.tippy-arrow:before{border-right-color:initial;border-width:8px 8px 8px 0;left:-7px;transform-origin:center right}.tippy-arrow{color:#333;height:16px;width:16px}.tippy-arrow:before{border-color:transparent;border-style:solid;content:\"\";position:absolute}.tippy-content{padding:5px 9px;position:relative;z-index:1}.tippy-box[data-theme~=sa11y-theme][role=tooltip]{box-sizing:border-box!important}.tippy-box[data-theme~=sa11y-theme][role=tooltip][data-animation=fade][data-state=hidden]{opacity:0}.tippy-box[data-theme~=sa11y-theme][role=tooltip][data-inertia][data-state=visible]{transition-timing-function:cubic-bezier(.54,1.5,.38,1.11)}[role=dialog]{min-width:300px}[role=tooltip]{text-align:center}.tippy-box[data-theme~=sa11y-theme]{-webkit-font-smoothing:auto;background-color:var(--sa11y-panel-bg);border-radius:4px;box-shadow:0 0 20px 4px rgba(154,161,177,.15),0 4px 80px -8px rgba(36,40,47,.25),0 4px 4px -2px rgba(91,94,105,.15)!important;color:var(--sa11y-panel-primary);display:block;font-family:var(--sa11y-font-face);font-size:var(--sa11y-normal-text);font-weight:400;letter-spacing:normal;line-height:22px;outline:0;padding:8px;position:relative;transition-property:transform,visibility,opacity}.tippy-box[data-theme~=sa11y-theme] code{font-family:monospace}.tippy-box[data-theme~=sa11y-theme] code,.tippy-box[data-theme~=sa11y-theme] kbd{-webkit-font-smoothing:auto;background-color:var(--sa11y-panel-badge);border-radius:3.2px;color:var(--sa11y-panel-primary);letter-spacing:normal;line-height:22px;padding:1.6px 4.8px}.tippy-box[data-theme~=sa11y-theme][data-placement^=top]{text-align:center}.tippy-box[data-theme~=sa11y-theme] .tippy-content{padding:5px 9px}.tippy-box[data-theme~=sa11y-theme] sub,.tippy-box[data-theme~=sa11y-theme] sup{font-size:var(--sa11y-small-text)}.tippy-box[data-theme~=sa11y-theme] ul{margin:0;margin-block-end:0;margin-block-start:0;padding:0;position:relative}.tippy-box[data-theme~=sa11y-theme] li{display:list-item;margin:5px 10px 0 20px;padding-bottom:5px}.tippy-box[data-theme~=sa11y-theme] a{color:var(--sa11y-hyperlink);cursor:pointer;text-decoration:underline}.tippy-box[data-theme~=sa11y-theme] a:focus,.tippy-box[data-theme~=sa11y-theme] a:hover{text-decoration:none}.tippy-box[data-theme~=sa11y-theme] strong{font-weight:600}.tippy-box[data-theme~=sa11y-theme] hr{background:var(--sa11y-panel-bg-splitter);border:none;height:1px;margin:10px 0;opacity:1;padding:0}.tippy-box[data-theme~=sa11y-theme] button.close-btn{margin:0}.tippy-box[data-theme~=sa11y-theme] button[data-sa11y-dismiss]{background:var(--sa11y-panel-bg-secondary);border:1px solid var(--sa11y-button-outline);border-radius:5px;color:var(--sa11y-panel-primary);cursor:pointer;display:block;margin:10px 5px 5px 0;padding:4px 8px}.tippy-box[data-theme~=sa11y-theme] button[data-sa11y-dismiss]:focus,.tippy-box[data-theme~=sa11y-theme] button[data-sa11y-dismiss]:hover{background:var(--sa11y-shortcut-hover)}.tippy-box[data-theme~=sa11y-theme][data-placement^=top]>.tippy-arrow:before{border-top-color:var(--sa11y-panel-bg)}.tippy-box[data-theme~=sa11y-theme][data-placement^=bottom]>.tippy-arrow:before{border-bottom-color:var(--sa11y-panel-bg)}.tippy-box[data-theme~=sa11y-theme][data-placement^=left]>.tippy-arrow:before{border-left-color:var(--sa11y-panel-bg)}.tippy-box[data-theme~=sa11y-theme][data-placement^=right]>.tippy-arrow:before{border-right-color:var(--sa11y-panel-bg)}@media (forced-colors:active){.tippy-box[data-theme~=sa11y-theme][data-placement^=bottom]>.tippy-arrow:before,.tippy-box[data-theme~=sa11y-theme][data-placement^=left]>.tippy-arrow:before,.tippy-box[data-theme~=sa11y-theme][data-placement^=right]>.tippy-arrow:before,.tippy-box[data-theme~=sa11y-theme][data-placement^=top]>.tippy-arrow:before{filter:invert(1);forced-color-adjust:none}.tippy-box[data-theme~=sa11y-theme] .tippy-arrow{z-index:-1}}";

class TooltipComponent extends HTMLElement {
  connectedCallback() {
    const shadowRoot = this.attachShadow({ mode: 'open' });

    // Styles
    const style = document.createElement('style');
    style.innerHTML = tooltipStyles + sharedStyles;
    shadowRoot.appendChild(style);

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

    const buttons = [];
    Elements.Annotations.Array.forEach((annotation) => {
      const annotationButtons = annotation.shadowRoot.querySelectorAll('.sa11y-btn');
      if (annotationButtons) {
        buttons.push(...Array.from(annotationButtons));
      }
    });

    /* Page annotations */
    const annotations = tippy(buttons, {
      interactive: true,
      trigger: 'mouseenter click', // Focusin trigger to ensure "Jump to issue" button displays tooltip.
      arrow: true,
      delay: [0, 400], // Slight delay to ensure mouse doesn't quickly trigger and hide tooltip.
      theme: 'sa11y-theme',
      placement: 'right-start',
      allowHTML: true,
      role: 'dialog',
      aria: {
        content: null,
        expanded: 'auto',
      },
      appendTo: shadowRoot,
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

        // Last opened
        const annotation = instance.reference.getRootNode().host;
        annotation.setAttribute('data-sa11y-opened', '');

        // Close button for tooltip.
        openedTooltip.querySelector('.close-btn').addEventListener('click', () => {
          instance.hide();
          instance.reference.focus();
        });
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
    let keyboardShortcut;
    if (navigator.userAgent.indexOf('Mac') !== -1) {
      keyboardShortcut = '<span class="kbd">Option</span> + <span class="kbd">S</span>';
    } else {
      keyboardShortcut = '<span class="kbd">Alt</span> + <span class="kbd">S</span>';
    }
    tippy(Constants.Panel.skipButton, {
      content: `${Lang._('SHORTCUT_TOOLTIP')} &raquo; <br> ${keyboardShortcut}`,
      allowHTML: true,
      delay: [500, 0],
      trigger: 'mouseenter focusin',
      arrow: true,
      placement: 'top',
      theme: 'sa11y-theme',
      maxWidth: 165,
      role: 'tooltip',
      aria: {
        content: null,
        expanded: false,
      },
      appendTo: shadowRoot,
      zIndex: 2147483645,
    });
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
      delay: [500, 0],
      trigger: 'mouseenter focusin',
      arrow: true,
      placement: 'top',
      theme: 'sa11y-theme',
      maxWidth: 165,
      role: 'tooltip',
      aria: {
        content: null,
        expanded: false,
      },
      appendTo: shadowRoot,
      zIndex: 2147483645,
    });
  }
}

var annotationStyles = ".instance{display:block}.instance-inline{display:inline-block;text-align:end}button{border-radius:50%;box-shadow:0 0 16px 0 rgba(0,0,0,.31);cursor:pointer;display:block;font-size:0;line-height:normal;min-width:0;padding:0;transition:all .2s ease-in-out;z-index:8888}button,button:after{height:36px;position:absolute;width:36px}button:after{content:\"\";left:-7px;padding:7px;top:-7px}button.warning-btn{margin:20px}button.error-btn,button.good-btn{margin:10px}button.error-btn-text,button.good-btn-text,button.warning-btn-text{margin:-30px 10px}button.error-btn,button.error-btn-text{background:50% 50% var(--sa11y-error-svg) no-repeat;background-color:var(--sa11y-error);background-size:22px;border:1px solid var(--sa11y-error)}button.error-btn-text:focus,button.error-btn-text:hover,button.error-btn:focus,button.error-btn:hover{background-color:var(--sa11y-error-hover)}button.good-btn,button.good-btn-text{background:50% 50% var(--sa11y-good) var(--sa11y-good-svg) no-repeat;background-color:var(--sa11y-good);background-size:20px;border:1px solid var(--sa11y-good)}button.good-btn-text:focus,button.good-btn-text:hover,button.good-btn:focus,button.good-btn:hover{background-color:var(--sa11y-good-hover)}button.warning-btn,button.warning-btn-text{background:50% 50% var(--sa11y-warning) var(--sa11y-warning-svg) no-repeat;background-color:var(--sa11y-warning);background-size:24px;border:1px solid var(--sa11y-warning);transform:scaleX(var(--sa11y-icon-direction))}button.warning-btn-text:focus,button.warning-btn-text:hover,button.warning-btn:focus,button.warning-btn:hover{background-color:var(--sa11y-warning-hover)}button.sa11y-btn:active,button.sa11y-btn:focus{box-shadow:0 0 0 5px var(--sa11y-focus-color);outline:0}@media screen and (forced-colors:active){button.sa11y-btn{border:1px solid transparent!important;forced-color-adjust:none;outline:3px solid transparent!important}}";

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
*/
function annotate(
  element,
  type,
  content,
  inline = false,
  position,
  index,
  dismissAnnotationsOption,
) {
  const validTypes = [
    Constants.Global.ERROR,
    Constants.Global.WARNING,
    Constants.Global.GOOD,
  ];

  if (validTypes.indexOf(type) === -1) {
    throw Error(`Invalid type [${type}] for annotation`);
  }
  // Add unique ID and styles to annotation and marked element.
  [type].forEach(($el) => {
    if ($el === Constants.Global.ERROR && element !== undefined) {
      const errorAttr = (inline ? 'data-sa11y-error-inline' : 'data-sa11y-error');
      element.setAttribute(errorAttr, index);
    } else if ($el === Constants.Global.WARNING) {
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
  const dismiss = (dismissAnnotationsOption === true && CSSName[type] === 'warning') ? `<button data-sa11y-dismiss='${index}' type='button'>${Lang._('DISMISS')}</button>` : '';

  const instance = document.createElement('sa11y-annotation');
  instance.setAttribute('data-sa11y-annotation', index);
  const create = document.createElement('div');
  const listItem = document.createElement('li');

  if (element === undefined) {
    // Page errors displayed to main panel.
    Constants.Panel.pageIssues.classList.add('active');
    Constants.Panel.panel.classList.add('has-page-issues');
    listItem.innerHTML = `<strong>${[type]}</strong> ${content}`;
    Constants.Panel.pageIssuesList.insertAdjacentElement('afterbegin', listItem);
  } else {
    // Button annotations.
    create.classList.add(`${inline ? 'instance-inline' : 'instance'}`);
    create.innerHTML = `
    <button
      type="button"
      aria-label="${[type]}"
      aria-haspopup="dialog"
      class="sa11y-btn ${CSSName[type]}-btn${inline ? '-text' : ''}"
      data-tippy-content=
        "<div lang='${Lang._('LANG_CODE')}'>
          <button class='close-btn close-tooltip' aria-label='${Lang._('ALERT_CLOSE')}'></button>
          <div class='header-text'><h2>${[type]}</h2></div>
          ${escapeHTML(content)}
          ${dismiss}
        </div>"
    ></button>`;

    // Make sure annotations always appended outside of interactive elements.
    let location = element.closest('a, button');
    if (!location) {
      location = element;
    }
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
const getScrollPosition = ($el) => {
  const offsetTopPosition = $el.offsetTop;
  if (offsetTopPosition === 0) {
    const shadowParent = $el.getRootNode().host;
    const visiblePosition = findVisibleParent(shadowParent, 'display', 'none');

    // Alert if tooltip is hidden.
    getHiddenParent($el);
    const tooltip = $el.getAttribute('data-tippy-content');
    createAlert(`${Lang._('NOT_VISIBLE_ALERT')}`, tooltip);

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

const goToNext = () => {
  determineIndex();
  const issues = Elements.Annotations.Array;

  // Go back to first issue.
  if (index >= issues.length - 1) index = -1;

  const annotation = issues[index + 1];
  const button = annotation.shadowRoot.querySelector('button');
  const scrollPos = getScrollPosition(button);

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

const goToPrev = () => {
  determineIndex();
  if (index > 0) {
    const button = Elements.Annotations.Array[index - 1].shadowRoot.querySelector('button');
    const scrollPos = getScrollPosition(button);

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
  }
};

function keyboardShortcut(e) {
  if (
    Elements.Annotations.Array.length
    && !Constants.Panel.skipButton.hasAttribute('disabled')
  ) {
    if (e.altKey && e.code === 'KeyS') {
      e.preventDefault();
      goToNext();
    } else if (e.altKey && e.code === 'KeyW') {
      e.preventDefault();
      goToPrev();
    }
  }
}

function handleSkipButton() {
  goToNext();
}

const keyboardShortcutHandler = (event) => keyboardShortcut(event);
const handleSkipButtonHandler = (event) => handleSkipButton();

function skipToIssue() {
  // Attach keyboard and click event listeners.
  document.addEventListener('keydown', keyboardShortcutHandler);
  Constants.Panel.skipButton.addEventListener('click', handleSkipButtonHandler);
}

// Imported by reset.js
function removeSkipBtnListeners() {
  document.removeEventListener('keydown', keyboardShortcutHandler);
  Constants.Panel.skipButton.removeEventListener('click', handleSkipButtonHandler);
}

function checkImages(results) {
  const containsAltTextStopWords = (alt) => {
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

  Elements.Found.Images.forEach(($el) => {
    const alt = $el.getAttribute('alt');
    if (alt === null) {
      if ($el.closest('a[href]')) {
        if (fnIgnore($el.closest('a[href]')).textContent.trim().length >= 1) {
          results.push({
            element: $el,
            type: Constants.Global.ERROR,
            content: Lang.sprintf('MISSING_ALT_LINK_BUT_HAS_TEXT_MESSAGE'),
            inline: false,
            position: 'beforebegin',
          });
        } else if (fnIgnore($el.closest('a[href]')).textContent.trim().length === 0) {
          results.push({
            element: $el,
            type: Constants.Global.ERROR,
            content: Lang.sprintf('MISSING_ALT_LINK_MESSAGE'),
            inline: false,
            position: 'beforebegin',
          });
        }
      } else {
        // General failure message if image is missing alt.
        results.push({
          element: $el,
          type: Constants.Global.ERROR,
          content: Lang.sprintf('MISSING_ALT_MESSAGE'),
          inline: false,
          position: 'beforebegin',
        });
      }
    } else {
      // If alt attribute is present, further tests are done.
      const altText = sanitizeHTML(alt); // Prevent tooltip from breaking.
      const error = containsAltTextStopWords(altText);
      const altLength = alt.length;
      const src = $el.getAttribute('src');
      const baseSrc = (!src) ? $el.getAttribute('srcset') : src;

      if ($el.closest('a[href]') && $el.closest('a[href]').getAttribute('tabindex') === '-1' && $el.closest('a[href]').getAttribute('aria-hidden') === 'true') ; else if (error[0] !== null && $el.closest('a[href]')) {
        // Image fails if a stop word was found.
        results.push({
          element: $el,
          type: Constants.Global.ERROR,
          content: Lang.sprintf('LINK_IMAGE_BAD_ALT_MESSAGE', error[0], altText),
          inline: false,
          position: 'beforebegin',
        });
      } else if (error[2] !== null && $el.closest('a[href]')) {
        results.push({
          element: $el,
          type: Constants.Global.ERROR,
          content: Lang.sprintf('LINK_IMAGE_PLACEHOLDER_ALT_MESSAGE', altText),
          inline: false,
          position: 'beforebegin',
        });
      } else if (error[1] !== null && $el.closest('a[href]')) {
        const key = prepareDismissal(`LINKEDIMAGE${baseSrc + altText + error[1]}`);
        results.push({
          element: $el,
          type: Constants.Global.WARNING,
          content: Lang.sprintf('LINK_IMAGE_SUS_ALT_MESSAGE', error[1], altText),
          inline: false,
          position: 'beforebegin',
          dismiss: key,
        });
      } else if (error[0] !== null) {
        results.push({
          element: $el,
          type: Constants.Global.ERROR,
          content: Lang.sprintf('LINK_ALT_HAS_BAD_WORD_MESSAGE', error[0], altText),
          inline: false,
          position: 'beforebegin',
        });
      } else if (error[2] !== null) {
        results.push({
          element: $el,
          type: Constants.Global.ERROR,
          content: Lang.sprintf('ALT_PLACEHOLDER_MESSAGE', altText),
          inline: false,
          position: 'beforebegin',
        });
      } else if (error[1] !== null) {
        const key = prepareDismissal(`IMAGE${baseSrc + altText + error[1]}`);
        results.push({
          element: $el,
          type: Constants.Global.WARNING,
          content: Lang.sprintf('ALT_HAS_SUS_WORD', error[1], altText),
          inline: false,
          position: 'beforebegin',
          dismiss: key,
        });
      } else if ((alt === '' || alt === ' ') && $el.closest('a[href]')) {
        if ($el.closest('a[href]').getAttribute('tabindex') === '-1' && $el.closest('a[href]').getAttribute('aria-hidden') === 'true') ; else if ($el.closest('a[href]').getAttribute('aria-hidden') === 'true') {
          results.push({
            element: $el,
            type: Constants.Global.ERROR,
            content: Lang.sprintf('LINK_IMAGE_ARIA_HIDDEN'),
            inline: false,
            position: 'beforebegin',
          });
        } else if (fnIgnore($el.closest('a[href]')).textContent.trim().length === 0) {
          results.push({
            element: $el,
            type: Constants.Global.ERROR,
            content: Lang.sprintf('LINK_IMAGE_NO_ALT_TEXT'),
            inline: false,
            position: 'beforebegin',
          });
        } else {
          results.push({
            element: $el,
            type: Constants.Global.GOOD,
            content: Lang.sprintf('LINK_IMAGE_HAS_TEXT'),
            inline: false,
            position: 'beforebegin',
          });
        }
      } else if (alt.length > 250 && $el.closest('a[href]')) {
        const key = prepareDismissal(`LINKEDIMAGE${baseSrc + altText + alt.length}`);
        // Link and contains alt text.
        results.push({
          element: $el,
          type: Constants.Global.WARNING,
          content: Lang.sprintf('LINK_IMAGE_LONG_ALT', altLength, altText),
          inline: false,
          position: 'beforebegin',
          dismiss: key,
        });
      } else if (alt !== '' && $el.closest('a[href]') && fnIgnore($el.closest('a[href]')).textContent.trim().length === 0) {
        const key = prepareDismissal(`LINKEDIMAGE${baseSrc + altText}`);
        // Link and contains an alt text.
        results.push({
          element: $el,
          type: Constants.Global.WARNING,
          content: Lang.sprintf('LINK_IMAGE_ALT_WARNING', altText),
          inline: false,
          position: 'beforebegin',
          dismiss: key,
        });
      } else if (alt !== '' && $el.closest('a[href]') && fnIgnore($el.closest('a[href]')).textContent.trim().length >= 1) {
        const key = prepareDismissal(`LINKEDIMAGE${baseSrc + altText}`);
        // Contains alt text & surrounding link text.
        results.push({
          element: $el,
          type: Constants.Global.WARNING,
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
            const key = prepareDismissal(`DECORATIVE${baseSrc}`);
            results.push({
              element: $el,
              type: Constants.Global.WARNING,
              content: Lang.sprintf('IMAGE_FIGURE_DECORATIVE'),
              inline: false,
              position: 'beforebegin',
              dismiss: key,
            });
          } else {
            const key = prepareDismissal(`DECORATIVE${baseSrc}`);
            results.push({
              element: $el,
              type: Constants.Global.WARNING,
              content: Lang.sprintf('IMAGE_DECORATIVE'),
              inline: false,
              position: 'beforebegin',
              dismiss: key,
            });
          }
        } else {
          const key = prepareDismissal(`DECORATIVE${baseSrc}`);
          results.push({
            element: $el,
            type: Constants.Global.WARNING,
            content: Lang.sprintf('IMAGE_DECORATIVE'),
            inline: false,
            position: 'beforebegin',
            dismiss: key,
          });
        }
      } else if (alt.length > 250) {
        const key = prepareDismissal(`IMAGE${baseSrc + altText + alt.length}`);
        results.push({
          element: $el,
          type: Constants.Global.WARNING,
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
            const key = prepareDismissal(`FIGURE${baseSrc + altText}`);
            results.push({
              element: $el,
              type: Constants.Global.WARNING,
              content: Lang.sprintf('IMAGE_FIGURE_DUPLICATE_ALT', altText),
              inline: false,
              position: 'beforebegin',
              dismiss: key,
            });
          } else {
            results.push({
              element: $el,
              type: Constants.Global.GOOD,
              content: Lang.sprintf('IMAGE_PASS', altText),
              inline: false,
              position: 'beforebegin',
            });
          }
        } else {
          // If image has alt text - pass!
          results.push({
            element: $el,
            type: Constants.Global.GOOD,
            content: Lang.sprintf('IMAGE_PASS', altText),
            inline: false,
            position: 'beforebegin',
          });
        }
      }
    }
  });
  return { results };
}

function checkHeaders(
  results,
  nonConsecutiveHeadingIsError,
  flagLongHeadings,
  headingOutline,
) {
  let prevLevel;
  Elements.Found.Headings.forEach(($el, i) => {
    const ignore = fnIgnore($el); // Ignore unwanted <style>, <script>, etc tags.
    const text = computeTextNodeWithImage(ignore);
    const headingText = sanitizeHTML(text);

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
      if (nonConsecutiveHeadingIsError === true) {
        error = Lang.sprintf('HEADING_NON_CONSECUTIVE_LEVEL', prevLevel, level);
        results.push({
          element: $el,
          type: Constants.Global.ERROR,
          content: error,
          inline: false,
          position: 'beforebegin',
        });
      } else {
        warning = Lang.sprintf('HEADING_NON_CONSECUTIVE_LEVEL', prevLevel, level);
        const key = prepareDismissal(`HEADING${level + headingText}`);
        results.push({
          element: $el,
          type: Constants.Global.WARNING,
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
          results.push({
            element: $el,
            type: Constants.Global.ERROR,
            content: error,
            inline: false,
            position: 'beforebegin',
          });
        }
      } else {
        error = Lang.sprintf('HEADING_EMPTY', level);
        results.push({
          element: $el,
          type: Constants.Global.ERROR,
          content: error,
          inline: false,
          position: 'beforebegin',
        });
      }
    } else if (i === 0 && level !== 1 && level !== 2) {
      error = Lang.sprintf('HEADING_FIRST');
      results.push({
        element: $el,
        type: Constants.Global.ERROR,
        content: error,
        inline: false,
        position: 'beforebegin',
      });
    } else if (headingLength > 170 && flagLongHeadings === true) {
      warning = Lang.sprintf('HEADING_LONG', headingLength);
      const key = prepareDismissal(`HEADING${level + headingText}`);
      results.push({
        element: $el,
        type: Constants.Global.WARNING,
        content: warning,
        inline: false,
        position: 'beforebegin',
        dismiss: key,
      });
    }
    prevLevel = level;

    const hiddenHeading = isElementVisuallyHiddenOrHidden($el);
    const parent = findVisibleParent($el, 'display', 'none');
    // Create an object for heading outline panel.
    if (error !== null) {
      headingOutline.push({
        element: $el, headingLevel: level, text: headingText, index: i, type: Constants.Global.ERROR, hidden: hiddenHeading, visibleParent: parent,
      });
    } else if (warning !== null) {
      const key = prepareDismissal(`HEADING${level + headingText}`);
      headingOutline.push({
        element: $el, headingLevel: level, text: headingText, index: i, type: Constants.Global.WARNING, hidden: hiddenHeading, visibleParent: parent, dismiss: key,
      });
    } else if (error === null || warning === null) {
      headingOutline.push({
        element: $el, headingLevel: level, text: headingText, index: i, hidden: hiddenHeading, visibleParent: parent,
      });
    }
  });
  // Missing Heading 1
  if (Elements.Found.HeadingOne.length === 0) {
    results.push({
      type: Constants.Global.ERROR,
      content: Lang.sprintf('HEADING_MISSING_ONE'),
    });
  }
  return { results, headingOutline };
}

function checkLinkText(results, showGoodLinkButton) {
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

  Elements.Found.Links.forEach(($el) => {
    let linkText = computeAccessibleName($el);
    const hasAriaLabelledBy = $el.getAttribute('aria-labelledby');
    const hasAriaLabel = $el.getAttribute('aria-label');
    let childAriaLabelledBy = null;
    let childAriaLabel = null;
    const hasTitle = $el.getAttribute('title');
    const href = $el.getAttribute('href');

    if ($el.children.length) {
      const $firstChild = $el.children[0];
      childAriaLabelledBy = $firstChild.getAttribute('aria-labelledby');
      childAriaLabel = $firstChild.getAttribute('aria-label');
    }

    if (linkText === 'noAria') {
      // Plain text content.
      linkText = getText($el);
      const $img = $el.querySelector('img');

      // If an image exists within the link. Help with AccName computation.
      if ($img) {
        // Check if there's aria on the image.
        const imgText = computeAccessibleName($img);
        if (imgText !== 'noAria') {
          linkText += imgText;
        } else {
          // No aria? Process alt on image.
          linkText += $img ? ($img.getAttribute('alt') || '') : '';
        }
      }
    }

    // Ignore provided linkSpanIgnore prop, <style> tags, and special characters.
    const error = containsLinkTextStopWords(
      fnIgnore(
        $el, Constants.Exclusions.LinkSpan,
      ).textContent.replace(/[!*?↣↳→↓»↴]/g, '').trim(),
    );

    if ($el.querySelectorAll('img').length) ; else if (href && !linkText) {
      // Flag empty hyperlinks.
      if ($el && hasTitle) ; else if ($el.children.length) {
        // Has child elements (e.g. SVG or SPAN) <a><i></i></a>
        results.push({
          element: $el,
          type: Constants.Global.ERROR,
          content: Lang.sprintf('LINK_EMPTY_LINK_NO_LABEL'),
          inline: true,
          position: 'afterend',
        });
      } else {
        // Completely empty <a></a>
        results.push({
          element: $el,
          type: Constants.Global.ERROR,
          content: Lang.sprintf('LINK_EMPTY'),
          inline: true,
          position: 'afterend',
        });
      }
    } else if (error[0] != null) {
      // Contains stop words.
      if (hasAriaLabelledBy || hasAriaLabel || childAriaLabelledBy || childAriaLabel) {
        const sanitizedText = sanitizeHTML(linkText);
        if (showGoodLinkButton === true) {
          results.push({
            element: $el,
            type: Constants.Global.GOOD,
            content: Lang.sprintf('LINK_LABEL', sanitizedText),
            inline: true,
            position: 'afterend',
          });
        }
      } else if ($el.getAttribute('aria-hidden') === 'true' && $el.getAttribute('tabindex') === '-1') ; else {
        results.push({
          element: $el,
          type: Constants.Global.ERROR,
          content: Lang.sprintf('LINK_STOPWORD', error[0]),
          inline: true,
          position: 'afterend',
        });
      }
    } else if (error[1] != null) {
      const key = prepareDismissal(`LINK${linkText + error[1] + href}`);
      // Contains warning words.
      results.push({
        element: $el,
        type: Constants.Global.WARNING,
        content: Lang.sprintf('LINK_BEST_PRACTICES', error[1]),
        inline: true,
        position: 'beforebegin',
        dismiss: key,
      });
    } else if (error[2] != null) {
      const key = prepareDismissal(`LINK${linkText + error[2] + href}`);
      // Contains URL in link text.
      if (linkText.length > 40) {
        results.push({
          element: $el,
          type: Constants.Global.WARNING,
          content: Lang.sprintf('LINK_URL'),
          inline: true,
          position: 'beforebegin',
          dismiss: key,
        });
      }
    } else if (hasAriaLabelledBy || hasAriaLabel || childAriaLabelledBy || childAriaLabel) {
      // If the link has any ARIA, append a "Good" link button.
      if (showGoodLinkButton === true) {
        const sanitizedText = sanitizeHTML(linkText);
        results.push({
          element: $el,
          type: Constants.Global.GOOD,
          content: Lang.sprintf('LINK_LABEL', sanitizedText),
          inline: true,
          position: 'afterend',
        });
      }
    }
  });
  return { results };
}

/**
 * Rulesets: Contrast
 * Color contrast plugin by Jason Day.
 * @link https://github.com/jasonday/color-contrast
 * @link https://github.com/gka/chroma.js (Parse RGB)
*/

function checkContrast(results) {
  if (Constants.Global.contrastPlugin === true) {
    if (
      store.getItem('sa11y-remember-contrast') === 'On'
      || Constants.Global.headless === true
      || Constants.Global.checkAllHideToggles === true
    ) {
      let contrastErrors = {
        errors: [],
        warnings: [],
      };

      /* eslint-disable */
      const contrastObject = {
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
          const l1 = contrastObject.relativeLuminance(contrastObject.parseRgb(x));
          const l2 = contrastObject.relativeLuminance(contrastObject.parseRgb(y));
          return (Math.max(l1, l2) + 0.05) / (Math.min(l1, l2) + 0.05);
        },

        getBackground(el) {
          // If item is shadowRoot (nodeType 11)
          if (el.nodeType === 11) {
            // find the parentNode outside shadow: most likely the inherited bg colour.
            const parent = el.getRootNode().host.parentNode;
            if (parent !== null) {
              el = parent;
            } else {
              // Return warning or manual check otherwise.
              return 'alpha';
            }
          }

          const styles = getComputedStyle(el);
          const bgColor = styles.backgroundColor;
          const bgImage = styles.backgroundImage;
          const rgb = `${contrastObject.parseRgb(bgColor)}`;
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
          return contrastObject.getBackground(el.parentNode);
        },
        /* eslint-disable */
        check() {
          // resets results
          contrastErrors = {
            errors: [],
            warnings: [],
          };

          for (let i = 0; i < Elements.Found.Contrast.length; i++) {
            const elem = Elements.Found.Contrast[i];

            if (Elements.Found.Contrast) {
              const style = getComputedStyle(elem);
              const { color } = style;
              const { fill } = style;
              const fontSize = parseInt(style.fontSize, 10);
              const pointSize = fontSize * (3 / 4);
              const { fontWeight } = style;
              const htmlTag = elem.tagName;
              const background = contrastObject.getBackground(elem);
              const textString = [].reduce.call(elem.childNodes, (a, b) => a + (b.nodeType === 3 ? b.textContent : ''), '');
              const text = textString.trim();
              const clip = window.getComputedStyle(elem).clip.replace(/\s/g, '');
              const width = parseFloat(window.getComputedStyle(elem).width);
              const height = parseFloat(window.getComputedStyle(elem).height);
              let ratio;
              let error;
              let warning;

              if ((width === 1 && height === 1) && (clip === "rect(0,0,0,0)" || clip === "rect(1px,1px,1px,1px)")) ; else if (htmlTag === 'SVG') {
                ratio = Math.round(contrastObject.contrastRatio(fill, background) * 100) / 100;
                if (ratio < 3) {
                  error = {
                    elem,
                    ratio: `${ratio}:1`,
                  };
                  contrastErrors.errors.push(error);
                }
              } else if (text.length || htmlTag === 'INPUT' || htmlTag === 'SELECT' || htmlTag === 'TEXTAREA') {
                const type = elem.getAttribute('type');
                if (type === 'range' || type === 'color') ; else if (background === 'image') {
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
                  ratio = Math.round(contrastObject.contrastRatio(color, background) * 100) / 100;
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

      contrastObject.check();

      contrastErrors.errors.forEach((item) => {
        const name = item.elem;
        const cratio = item.ratio;
        const clone = name.cloneNode(true);
        const nodeText = fnIgnore(clone, 'script, style').textContent;
        const sanitizedText = sanitizeHTML(nodeText);

        if (name.tagName === 'INPUT') {
          results.push({
            element: name,
            type: Constants.Global.ERROR,
            content: Lang.sprintf('CONTRAST_INPUT_ERROR', cratio),
            inline: false,
            position: 'beforebegin',
          });
        } else {
          results.push({
            element: name,
            type: Constants.Global.ERROR,
            content: Lang.sprintf('CONTRAST_ERROR', cratio, sanitizedText),
            inline: false,
            position: 'beforebegin',
          });
        }
      });

      contrastErrors.warnings.forEach((item) => {
        const name = item.elem;
        const clone = name.cloneNode(true);
        const nodeText = fnIgnore(clone, 'script, style').textContent;

        const key = prepareDismissal(`CONTRAST${nodeText}`);
        const sanitizedText = sanitizeHTML(nodeText);

        results.push({
          element: name,
          type: Constants.Global.WARNING,
          content: Lang.sprintf('CONTRAST_WARNING', sanitizedText),
          inline: false,
          position: 'beforebegin',
          dismiss: key,
        });
      });
    }
  }
  return results;
}

function checkLabels(results) {
  if (Constants.Global.formLabelsPlugin === true) {
    if (
      store.getItem('sa11y-remember-labels') === 'On'
      || Constants.Global.headless === true
      || Constants.Global.checkAllHideToggles === true
    ) {
      Elements.Found.Inputs.forEach(($el) => {
        // Ignore hidden inputs.
        if (isElementHidden($el) !== true) {
          let ariaLabel = computeAccessibleName($el);
          const type = $el.getAttribute('type');
          const tabindex = $el.getAttribute('tabindex');

          // If button type is submit or button: pass
          if (type === 'submit' || type === 'button' || type === 'hidden' || tabindex === '-1') ; else if (type === 'image') {
            // Inputs where type="image".
            const imgalt = $el.getAttribute('alt');
            if (!imgalt || imgalt === ' ') {
              if ($el.getAttribute('aria-label')) ; else {
                results.push({
                  element: $el,
                  type: Constants.Global.ERROR,
                  content: Lang.sprintf('LABELS_MISSING_IMAGE_INPUT_MESSAGE'),
                  inline: false,
                  position: 'beforebegin',
                });
              }
            }
          } else if (type === 'reset') {
            // Recommendation to remove reset buttons.
            const key = prepareDismissal(`INPUT${ariaLabel}`);
            results.push({
              element: $el,
              type: Constants.Global.WARNING,
              content: Lang.sprintf('LABELS_INPUT_RESET_MESSAGE'),
              inline: false,
              position: 'beforebegin',
              dismiss: key,
            });
          } else if ($el.getAttribute('aria-label') || $el.getAttribute('aria-labelledby') || $el.getAttribute('title')) {
            // Uses ARIA. Warn them to ensure there's a visible label.
            if ($el.getAttribute('title')) {
              ariaLabel = $el.getAttribute('title');
              const key = prepareDismissal(`INPUT${ariaLabel}`);
              const sanitizedText = sanitizeHTML(ariaLabel);
              results.push({
                element: $el,
                type: Constants.Global.WARNING,
                content: Lang.sprintf('LABELS_ARIA_LABEL_INPUT_MESSAGE', sanitizedText),
                inline: false,
                position: 'beforebegin',
                dismiss: key,
              });
            } else {
              const key = prepareDismissal(`INPUT${ariaLabel}`);
              const sanitizedText = sanitizeHTML(ariaLabel);
              results.push({
                element: $el,
                type: Constants.Global.WARNING,
                content: Lang.sprintf('LABELS_ARIA_LABEL_INPUT_MESSAGE', sanitizedText),
                inline: false,
                position: 'beforebegin',
                dismiss: key,
              });
            }
          } else if ($el.closest('label') && $el.closest('label').textContent.trim()) ; else if ($el.getAttribute('id')) {
            // Has an ID but doesn't have a matching FOR attribute.
            let hasFor = false;

            Elements.Found.Labels.forEach(($l) => {
              if (hasFor) return;
              if ($l.getAttribute('for') === $el.getAttribute('id')) {
                hasFor = true;
              }
            });

            if (!hasFor) {
              const id = $el.getAttribute('id');
              results.push({
                element: $el,
                type: Constants.Global.ERROR,
                content: Lang.sprintf('LABELS_NO_FOR_ATTRIBUTE_MESSAGE', id),
                inline: false,
                position: 'beforebegin',
              });
            }
          } else {
            results.push({
              element: $el,
              type: Constants.Global.ERROR,
              content: Lang.sprintf('LABELS_MISSING_LABEL_MESSAGE'),
              inline: false,
              position: 'beforebegin',
            });
          }
        }
      });
    }
  }
  return { results };
}

function checkLinksAdvanced(results) {
  if (Constants.Global.linksAdvancedPlugin === true) {
    if (
      store.getItem('sa11y-remember-links-advanced') === 'On'
      || Constants.Global.headless === true
      || Constants.Global.checkAllHideToggles === true
    ) {
      const seen = {};
      Elements.Found.Links.forEach(($el) => {
        let linkText = computeAccessibleName($el);
        const $img = $el.querySelector('img');

        // If link has no ARIA.
        if (linkText === 'noAria') {
          linkText = fnIgnore($el, Constants.Exclusions.LinkSpan);
          linkText = getText(linkText); // Get inner text within anchor.

          // If an image exists within the link.
          if ($img) {
            // Check if there's aria on the image.
            const imgText = computeAccessibleName($img);
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
            if (seen[href]) ; else {
              const key = prepareDismissal(`LINK${linkTextTrimmed + href}`);
              const sanitizedText = sanitizeHTML(linkText);
              results.push({
                element: $el,
                type: Constants.Global.WARNING,
                content: Lang.sprintf('LINK_IDENTICAL_NAME', sanitizedText),
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
          const key = prepareDismissal(`LINK${linkTextTrimmed + href}`);
          results.push({
            element: $el,
            type: Constants.Global.WARNING,
            content: Lang.sprintf('NEW_TAB_WARNING'),
            inline: true,
            position: 'beforebegin',
            dismiss: key,
          });
        }

        if (linkTextTrimmed.length !== 0 && fileTypeMatch && !containsFileTypePhrases) {
          const key = prepareDismissal(`LINK${linkTextTrimmed + href}`);
          results.push({
            element: $el,
            type: Constants.Global.WARNING,
            content: Lang.sprintf('FILE_TYPE_WARNING'),
            inline: true,
            position: 'beforebegin',
            dismiss: key,
          });
        }
      });
    }
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
*/

function checkReadability() {
  let readabilityResults;
  if (Constants.Readability.Plugin === true) {
    const rememberReadability = store.getItem('sa11y-remember-readability') === 'On';
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
      if (['en', 'fr', 'de', 'nl', 'it'].includes(Constants.Readability.Lang)) {
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
        readabilityResults = {
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
        readabilityResults = {
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
          Constants.Panel.readabilityInfo.innerHTML = Lang._('READABILITY_NO_P_OR_LI_MESSAGE');
        } else if (readabilityResults.wordCount > 30) {
          Constants.Panel.readabilityInfo.innerHTML = `${readabilityResults.score} <span class="readability-score">${readabilityResults.difficultyLevel}</span>`;

          Constants.Panel.readabilityDetails.innerHTML = `
            <li>
              <strong>${Lang._('LANG_AVG_SENTENCE')}</strong>
              ${readabilityResults.averageWordsPerSentence}
            </li>
            <li>
              <strong>${Lang._('LANG_COMPLEX_WORDS')}</strong>
              ${readabilityResults.complexWords}%
            </li>
            <li>
              <strong>${Lang._('LANG_TOTAL_WORDS')}</strong>
              ${readabilityResults.wordCount}
            </li>`;
        } else {
          Constants.Panel.readabilityInfo.textContent = Lang._('READABILITY_NOT_ENOUGH_CONTENT_MESSAGE');
        }
      }
    }
  }
  return readabilityResults;
}

function checkEmbeddedContent(
  results,
  embeddedContentAll,
  embeddedContentAudio,
  embeddedContentVideo,
  embeddedContentDataViz,
  embeddedContentTitles,
  embeddedContentGeneral,
) {
  if (embeddedContentAll === true) {
    // Warning: Audio content.
    if (embeddedContentAudio === true) {
      Elements.Found.Audio.forEach(($el) => {
        const key = prepareDismissal(`IFRAME${$el.getAttribute('src') !== 'undefined' ? $el.getAttribute('src') : $el.querySelector('[src]').getAttribute('src')}`);
        results.push({
          element: $el,
          type: Constants.Global.WARNING,
          content: Lang.sprintf('EMBED_AUDIO'),
          inline: false,
          position: 'beforebegin',
          dismiss: key,
        });
      });
    }

    // Warning: Video content.
    if (embeddedContentVideo === true) {
      Elements.Found.Videos.forEach(($el) => {
        const track = $el.getElementsByTagName('TRACK');
        if ($el.tagName === 'VIDEO' && track.length) ; else {
          const key = prepareDismissal(`IFRAME${$el.getAttribute('src') !== 'undefined' ? $el.getAttribute('src') : $el.querySelector('[src]').getAttribute('src')}`);
          results.push({
            element: $el,
            type: Constants.Global.WARNING,
            content: Lang.sprintf('EMBED_VIDEO'),
            inline: false,
            position: 'beforebegin',
            dismiss: key,
          });
        }
      });
    }

    // Warning: Data visualizations.
    if (embeddedContentDataViz === true) {
      Elements.Found.Visualizations.forEach(($el) => {
        const key = prepareDismissal(`IFRAME${$el.getAttribute('src') !== 'undefined' ? $el.getAttribute('src') : $el.querySelector('[src]').getAttribute('src')}`);
        results.push({
          element: $el,
          type: Constants.Global.WARNING,
          content: Lang.sprintf('EMBED_DATA_VIZ'),
          inline: false,
          position: 'beforebegin',
          dismiss: key,
        });
      });
    }

    // Error: iFrame is missing accessible name.
    if (embeddedContentTitles === true) {
      Elements.Found.Iframes.forEach(($el) => {
        if ($el.tagName === 'VIDEO'
          || $el.tagName === 'AUDIO'
          || $el.getAttribute('aria-hidden') === 'true'
          || $el.getAttribute('hidden') !== null
          || $el.style.display === 'none'
          || $el.getAttribute('role') === 'presentation') ; else if ($el.getAttribute('title') === null || $el.getAttribute('title') === '') {
          if ($el.getAttribute('aria-label') === null || $el.getAttribute('aria-label') === '') {
            if ($el.getAttribute('aria-labelledby') === null) {
              // TO-DO: Make sure red error border takes precedence
              if ($el.classList.contains('sa11y-warning-border')) {
                $el.classList.remove('sa11y-warning-border');
              }
              results.push({
                element: $el,
                type: Constants.Global.ERROR,
                content: Lang.sprintf('EMBED_MISSING_TITLE'),
                inline: false,
                position: 'beforebegin',
              });
            }
          }
        } else ;
      });
    }

    // Warning: general warning for iFrames
    if (embeddedContentGeneral === true) {
      Elements.Found.EmbeddedContent.forEach(($el) => {
        if ($el.tagName === 'VIDEO'
          || $el.tagName === 'AUDIO'
          || $el.getAttribute('aria-hidden') === 'true'
          || $el.getAttribute('hidden') !== null
          || $el.style.display === 'none'
          || $el.getAttribute('role') === 'presentation'
          || $el.getAttribute('tabindex') === '-1') ; else {
          const key = prepareDismissal(`IFRAME${$el.getAttribute('src') !== 'undefined' ? $el.getAttribute('src') : $el.querySelector('[src]').getAttribute('src')}`);
          results.push({
            element: $el,
            type: Constants.Global.WARNING,
            content: Lang.sprintf('EMBED_GENERAL_WARNING'),
            inline: false,
            position: 'beforebegin',
            dismiss: key,
          });
        }
      });
    }
  }
  return results;
}

function checkQA(
  results,
  badLinksQA,
  strongItalicsQA,
  pdfQA,
  documentQA,
  langQA,
  blockquotesQA,
  tablesQA,
  fakeHeadingsQA,
  fakeListQA,
  allCapsQA,
  duplicateIdQA,
  underlinedTextQA,
  pageTitleQA,
  subscriptQA,
) {
  /* *********************************************************** */
  /*  Error: Find all links pointing to development environment. */
  /* *********************************************************** */
  if (badLinksQA === true) {
    Elements.Found.CustomErrorLinks.forEach(($el) => {
      results.push({
        element: $el,
        type: Constants.Global.ERROR,
        content: Lang.sprintf('QA_BAD_LINK', $el),
        inline: true,
        position: 'beforebegin',
      });
    });
  }

  /* *********************************************************** */
  /*  Warning: Excessive bolding or italics.                     */
  /* *********************************************************** */
  if (strongItalicsQA === true) {
    Elements.Found.StrongItalics.forEach(($el) => {
      const strongItalicsText = $el.textContent.trim().length;
      const key = prepareDismissal($el.tagName + $el.textContent);
      if (strongItalicsText > 400) {
        results.push({
          element: $el.parentNode,
          type: Constants.Global.WARNING,
          content: Lang.sprintf('QA_BAD_ITALICS'),
          inline: false,
          position: 'beforebegin',
          dismiss: key,
        });
      }
    });
  }

  /* ************************************************************** */
  /*  Warning: Manually inspect documents & PDF for accessibility.  */
  /* ************************************************************** */
  Elements.Found.Links.forEach(($el) => {
    const href = $el.getAttribute('href');
    const extensions = Constants.Global.documentLinks.split(', ');
    if (href) {
      const hasExtension = extensions.some((extension) => href.includes(extension));
      const hasPDF = href.includes('.pdf');
      const key = prepareDismissal(`DOCUMENT${href}`);
      if (documentQA === true && hasExtension) {
        results.push({
          element: $el,
          type: Constants.Global.WARNING,
          content: Lang.sprintf('QA_DOCUMENT'),
          inline: true,
          position: 'beforebegin',
          dismiss: key,
        });
      } else if (pdfQA === true && hasPDF) {
        results.push({
          element: $el,
          type: Constants.Global.WARNING,
          content: Lang.sprintf('QA_PDF'),
          inline: true,
          position: 'beforebegin',
          dismiss: key,
        });
      }
    }
  });

  /* *************************************************************** */
  /*  Error: Missing language tag. Lang should be at least 2 chars.  */
  /* *************************************************************** */
  if (langQA === true) {
    if (!Elements.Found.Language || Elements.Found.Language.length < 2) {
      results.push({
        type: Constants.Global.ERROR,
        content: Lang.sprintf('QA_PAGE_LANGUAGE'),
      });
    }
  }

  /* *************************************************************** */
  /*  Warning: Find blockquotes used as headers.                     */
  /* *************************************************************** */
  if (blockquotesQA === true) {
    Elements.Found.Blockquotes.forEach(($el) => {
      const bqHeadingText = $el.textContent;
      if (bqHeadingText.trim().length < 25) {
        const sanitizedText = sanitizeHTML(bqHeadingText);
        const key = prepareDismissal(`BLOCKQUOTE${sanitizedText}`);
        results.push({
          element: $el,
          type: Constants.Global.WARNING,
          content: Lang.sprintf('QA_BLOCKQUOTE_MESSAGE', sanitizedText),
          inline: false,
          position: 'beforebegin',
          dismiss: key,
        });
      }
    });
  }

  /* *************************************************************** */
  /*  Errors: Check HTML tables for issues.                          */
  /* *************************************************************** */
  if (tablesQA === true) {
    Elements.Found.Tables.forEach(($el) => {
      const findTHeaders = $el.querySelectorAll('th');
      const findHeadingTags = $el.querySelectorAll('h1, h2, h3, h4, h5, h6');
      if (findTHeaders.length === 0) {
        results.push({
          element: $el,
          type: Constants.Global.ERROR,
          content: Lang.sprintf('TABLES_MISSING_HEADINGS'),
          inline: false,
          position: 'beforebegin',
        });
      }
      if (findHeadingTags.length > 0) {
        findHeadingTags.forEach(($a) => {
          results.push({
            element: $a,
            type: Constants.Global.ERROR,
            content: Lang.sprintf('TABLES_SEMANTIC_HEADING'),
            inline: false,
            position: 'beforebegin',
          });
        });
      }
      findTHeaders.forEach(($b) => {
        if ($b.textContent.trim().length === 0) {
          results.push({
            element: $b,
            type: Constants.Global.ERROR,
            content: Lang.sprintf('TABLES_EMPTY_HEADING'),
            inline: false,
            position: 'afterbegin',
          });
        }
      });
    });
  }

  /* ****************************************************************** */
  /*  Warning: Detect fake headings                                     */
  /*  To prevent excessive warnings:                                    */
  /*  1) Parent element must not be a heading, blockquote, or table.    */
  /*  2) Must be between 4 and 120 characters (typical heading length). */
  /*  3) Doesn't contain the following characters: .;?!                 */
  /*  4) The previous element is not a semantic heading.                */
  /* ****************************************************************** */
  if (fakeHeadingsQA === true) {
    Elements.Found.Paragraphs.forEach(($el) => {
      const brAfter = $el.innerHTML.indexOf('</strong><br>');
      const brBefore = $el.innerHTML.indexOf('<br></strong>');
      const ignoreElements = 'h1, h2, h3, h4, h5, h6, [role="heading"][aria-level], blockquote';
      const ignoreParents = ignoreElements.concat(', table');
      const getTexted = getText($el);
      let boldtext;

      // Check paragraphs greater than x characters.
      if ($el && getTexted.length >= 300) {
        const { firstChild } = $el;

        // If paragraph starts with <strong> tag and ends with <br>.
        if (firstChild.tagName === 'STRONG' && (brBefore !== -1 || brAfter !== -1)) {
          boldtext = getText(firstChild);
          const maybeSentence = boldtext.match(/[.;?!"]/) !== null;
          if (
            !/[*]$/.test(boldtext)
            && !$el.closest(ignoreParents)
            && (boldtext.length >= 4 && boldtext.length <= 120)
            && maybeSentence === false
          ) {
            const sanitizedText = sanitizeHTML(boldtext);
            const key = prepareDismissal(`BOLD${sanitizedText}`);
            results.push({
              element: firstChild,
              type: Constants.Global.WARNING,
              content: Lang.sprintf('QA_FAKE_HEADING', sanitizedText),
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
        if (prevSibling !== null && prevSibling.matches(ignoreElements)) ; else if (
          !/[*]$/.test(boldtext)
          && (boldtext.length >= 4 && boldtext.length <= 120)
          && !$el.closest(ignoreParents)
          && maybeSentence === false
        ) {
          const sanitizedText = sanitizeHTML(boldtext);
          const key = prepareDismissal(`BOLD${sanitizedText}`);
          results.push({
            element: $el,
            type: Constants.Global.WARNING,
            content: Lang.sprintf('QA_FAKE_HEADING', sanitizedText),
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
        const getText$1 = getText($elem);
        const prevSibling = $elem.previousElementSibling;
        const maybeSentence = getText$1.match(/[.;?!"]/) !== null;

        if (prevSibling !== null && prevSibling.matches(ignore)) ; else if (
          size >= 24
          && !$elem.closest(ignore)
          && (getText$1.length >= 4 && getText$1.length <= 120)
          && maybeSentence === false
        ) {
          const sanitizedText = sanitizeHTML(getText$1);
          const key = prepareDismissal(`BOLD${sanitizedText}`);
          results.push({
            element: $elem,
            type: Constants.Global.WARNING,
            content: Lang.sprintf('QA_FAKE_HEADING', sanitizedText),
            inline: false,
            position: 'beforebegin',
            dismiss: key,
          });
        }
      };
      computeLargeParagraphs($el);
    });
  }

  /* *************************************************************** */
  /*  Warning: Detect paragraphs that should be lists.               */
  /*  Thanks to John Jameson from PrincetonU for this ruleset!       */
  /* *************************************************************** */
  if (fakeListQA === true) {
    Elements.Found.Paragraphs.forEach(($el) => {
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
          const $second = getNextSibling($el, 'p');
          if ($second) {
            const secondPrefix = decrement($el.nextElementSibling.textContent.substring(0, 2));
            if (firstPrefix === secondPrefix) {
              hit = true;
            }
          }
        }
        if (hit) {
          const key = prepareDismissal(`LIST${$el.textContent}`);
          results.push({
            element: $el,
            type: Constants.Global.WARNING,
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

  /* *************************************************************** */
  /*  Warning: Detect uppercase text.                                */
  /* *************************************************************** */
  if (allCapsQA === true) {
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
      const uppercasePattern = /([A-Z]{2,}[ ])([A-Z]{2,}[ ])([A-Z]{2,}[ ])([A-Z]{2,})/g;
      const detectUpperCase = thisText.match(uppercasePattern);

      if (detectUpperCase && detectUpperCase[0].length > 10) {
        const key = prepareDismissal(`UPPERCASE${thisText}`);
        results.push({
          element: $el,
          type: Constants.Global.WARNING,
          content: Lang.sprintf('QA_UPPERCASE_WARNING'),
          inline: false,
          position: 'beforebegin',
          dismiss: key,
        });
      }
    };
    Elements.Found.Paragraphs.forEach(($el) => checkCaps($el));
    Elements.Found.Headings.forEach(($el) => checkCaps($el));
    Elements.Found.Lists.forEach(($el) => checkCaps($el));
    Elements.Found.Blockquotes.forEach(($el) => checkCaps($el));
  }

  /* *************************************************************** */
  /*  Error: Duplicate IDs                                           */
  /* *************************************************************** */
  if (duplicateIdQA === true) {
    const allIds = {};
    Elements.Found.Ids.forEach(($el) => {
      const { id } = $el;
      if (id) {
        if (allIds[id] === undefined) {
          allIds[id] = 1;
        } else {
          results.push({
            element: $el,
            type: Constants.Global.ERROR,
            content: Lang.sprintf('QA_DUPLICATE_ID', id),
            inline: true,
            position: 'beforebegin',
          });
        }
      }
    });
  }

  /* *************************************************************** */
  /*  Warning: Flag underlined text.                                 */
  /*  Created by Brian Teeman.                                       */
  /* *************************************************************** */
  if (underlinedTextQA === true) {
    // Find all <u> tags.
    Elements.Found.Underlines.forEach(($el) => {
      const text = getText($el);
      const key = prepareDismissal(`UNDERLINE${text}`);
      results.push({
        element: $el,
        type: Constants.Global.WARNING,
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
      const text = getText($el);
      if (decoration === 'underline') {
        const key = prepareDismissal(`UNDERLINE${text}`);
        results.push({
          element: $el,
          type: Constants.Global.WARNING,
          content: Lang.sprintf('QA_TEXT_UNDERLINE_WARNING'),
          inline: false,
          position: 'beforebegin',
          dismiss: key,
        });
      }
    };
    Elements.Found.Paragraphs.forEach(($el) => computeUnderline($el));
    Elements.Found.Headings.forEach(($el) => computeUnderline($el));
    Elements.Found.Lists.forEach(($el) => computeUnderline($el));
    Elements.Found.Blockquotes.forEach(($el) => computeUnderline($el));
    Elements.Found.Spans.forEach(($el) => computeUnderline($el));
  }

  /* *************************************************************** */
  /*  Error: Page is missing meta page <title>                       */
  /* *************************************************************** */
  if (pageTitleQA === true) {
    const $title = document.querySelector('title');
    if (!$title || $title.textContent.trim().length === 0) {
      results.push({
        type: Constants.Global.ERROR,
        content: Lang.sprintf('QA_PAGE_TITLE'),
      });
    }
  }

  /* *************************************************************** */
  /*  Warning: Find inappropriate use of <sup> and <sub> tags.       */
  /* *************************************************************** */
  if (subscriptQA === true) {
    Elements.Found.Subscripts.forEach(($el) => {
      const text = getText($el);
      if (text.length >= 80) {
        const key = prepareDismissal($el.tagName + text);
        results.push({
          element: $el,
          type: Constants.Global.WARNING,
          content: Lang.sprintf('QA_SUBSCRIPT_WARNING'),
          inline: true,
          position: 'beforebegin',
          dismiss: key,
        });
      }
    });
  }

  // Return each object to results array.
  return results;
}

function checkCustom(results) {
  const C = {
    ANNOUNCEMENT_MESSAGE:
      'More than one Announcement component found! The Announcement component should be used strategically and sparingly. It should be used to get attention or indicate that something is important. Misuse of this component makes it less effective or impactful. Secondly, this component is semantically labeled as an Announcement for people who use screen readers.',

    ACCORDION_FORM_MESSAGE:
      'Do <strong>not nest forms</strong> within the Accordion component. If the form contains validation issues, a person may not see the form feedback since the accordion panel goes back to its original closed state.',
  };

  /* Example #1 */
  const $checkAnnouncement = find('.sa11y-announcement-component', 'root');
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
  const $checkAccordions = find('.sa11y-accordion-example', 'root');
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

/**
 * Sa11y, the accessibility quality assurance assistant.
 * @version: 3.0.2
 * @author: Development led by Adam Chaboryk, CPWA. <adam.chaboryk@torontomu.ca>
 * @license: https://github.com/ryersondmp/sa11y/blob/master/LICENSE.md
 * @acknowledgements https://sa11y.netlify.app/acknowledgements/
 * @copyright (c) 2020 - 2022 Toronto Metropolitan University (formerly Ryerson University).
 * The above copyright notice shall be included in all copies or substantial portions of the Software.
*/

class Sa11y {
  constructor(options) {
    this.option = {
      ...defaultOptions,
      ...options,
    };

    /* *********************************************************** */
    /*  Initialize: Start your engines.                            */
    /* *********************************************************** */
    this.initialize = () => {
      // Do not run Sa11y if any supplied elements detected on page.
      const checkRunPrevent = () => {
        const { doNotRun } = this.option;
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
        Constants.initializeGlobal(
          this.option.checkRoot,
          this.option.contrastPlugin,
          this.option.formLabelsPlugin,
          this.option.linksAdvancedPlugin,
          this.option.colourFilterPlugin,
          this.option.checkAllHideToggles,
          this.option.headless,
          this.option.panelPosition,
          this.option.documentLinks,
        );
        Constants.initializeReadability(
          this.option.readabilityPlugin,
          this.option.readabilityRoot,
          this.option.readabilityLang,
        );
        Constants.initializeExclusions(
          this.option.containerIgnore,
          this.option.contrastIgnore,
          this.option.readabilityIgnore,
          this.option.headerIgnore,
          this.option.outlineIgnore,
          this.option.imageIgnore,
          this.option.linkIgnore,
          this.option.linkIgnoreSpan,
        );
        Constants.initializeEmbeddedContent(
          this.option.videoContent,
          this.option.audioContent,
          this.option.dataVizContent,
        );

        // Once document has fully loaded.
        documentLoadingCheck(() => {
          if (this.option.headless === true) {
            // Headless: Perform all checks without loading UI.
            this.checkAll();
            store.removeItem('sa11y-dismissed');
          } else {
            // Build control panel.
            const controlPanel = new ControlPanel();
            document.body.appendChild(controlPanel);

            // Initialize control panel.
            settingsPanelToggles(
              this.checkAll,
              this.resetAll,
            );
            initializePanelToggles();

            addColourFilters();

            // Detect page changes (for SPAs).
            detectPageChanges(
              this.option.detectSPArouting,
              this.checkAll,
              this.resetAll,
            );

            // Initialize dismiss tooltip.
            this.dismissTooltip = new DismissTooltip();
            document.body.appendChild(this.dismissTooltip);

            // Disable toggle initially.
            Constants.Panel.toggle.disabled = false;

            // Check page once page is done loading.
            this.checkAll();
            mainToggle(
              this.checkAll,
              this.resetAll,
            );
          }
        });
      }
    };

    /* *********************************************************** */
    /*  Check All: Where all the magic happens.                    */
    /* *********************************************************** */
    this.checkAll = async () => {
      try {
        this.results = [];
        this.headingOutline = [];
        this.errorCount = 0;
        this.warningCount = 0;

        // Panel alert if root doesn't exist.
        const root = document.querySelector(this.option.checkRoot);
        if (!root) {
          createAlert(`${Lang.sprintf('ERROR_MISSING_ROOT_TARGET', this.option.checkRoot)}`);
        }

        // Find all web components on the page.
        Constants.initializeShadowSearch(
          this.option.checkRoot,
          this.option.autoDetectShadowComponents,
          this.option.shadowComponents,
        );

        // Find and cache elements.
        Elements.initializeElements(
          this.option.linksToFlag,
        );

        // Ruleset checks
        checkHeaders(
          this.results,
          this.option.nonConsecutiveHeadingIsError,
          this.option.flagLongHeadings,
          this.headingOutline,
        );
        checkLinkText(this.results, this.option.showGoodLinkButton);
        checkImages(this.results);
        checkContrast(this.results);
        checkLabels(this.results);
        checkLinksAdvanced(this.results);
        checkQA(
          this.results,
          this.option.badLinksQA,
          this.option.strongItalicsQA,
          this.option.pdfQA,
          this.option.documentQA,
          this.option.langQA,
          this.option.blockquotesQA,
          this.option.tablesQA,
          this.option.fakeHeadingsQA,
          this.option.fakeListQA,
          this.option.allCapsQA,
          this.option.duplicateIdQA,
          this.option.underlinedTextQA,
          this.option.pageTitleQA,
          this.option.subscriptQA,
        );
        checkEmbeddedContent(
          this.results,
          this.option.embeddedContentAll,
          this.option.embeddedContentAudio,
          this.option.embeddedContentVideo,
          this.option.embeddedContentDataViz,
          this.option.embeddedContentTitles,
          this.option.embeddedContentGeneral,
        );
        checkReadability();

        // Custom checks
        if (this.option.customChecks === true) {
          checkCustom(this.results);
        }

        // Optional: Generate CSS selector path of element.
        if (this.option.selectorPath === true) {
          this.results.forEach(($el) => {
            if ($el.element !== undefined) {
              const path = generateSelectorPath($el.element);
              Object.assign($el, { cssPath: path });
            }
          });
        }

        if (this.option.headless === false) {
          // Check for dismissed items and update results array.
          const dismiss = dismissAnnotationsLogic(this.results, this.dismissTooltip);
          this.results = dismiss.updatedResults;
          this.dismissed = dismiss.dismissedIssues;
          this.dismissedCount = dismiss.dismissCount;

          // Update count.
          const count = updateCount(this.results, this.errorCount, this.warningCount);
          this.errorCount = count.error;
          this.warningCount = count.warning;

          // Update badge.
          updateBadge(this.errorCount, this.warningCount);

          /* If panel is OPENED. */
          if (store.getItem('sa11y-remember-panel') === 'Opened') {
            // Paint the page with annotations.
            this.results.forEach(($el, i) => {
              Object.assign($el, { id: i });
              annotate(
                $el.element,
                $el.type,
                $el.content,
                $el.inline,
                $el.position,
                $el.id,
                this.option.dismissAnnotations,
              );
            });

            // After annotations are painted, find & cache.
            Elements.initializeAnnotations();

            // Initialize tooltips
            const tooltipComponent = new TooltipComponent();
            document.body.appendChild(tooltipComponent);

            dismissAnnotationsButtons(
              this.option.dismissAnnotations,
              this.results,
              this.dismissed,
              this.checkAll,
              this.resetAll,
            );

            generatePageOutline(
              this.dismissed,
              this.headingOutline,
              this.option.checkRoot,
            );

            updatePanel(
              this.dismissedCount,
              this.errorCount,
              this.warningCount,
            );

            // Initialize Skip to Issue button.
            skipToIssue();

            // Extras
            detectOverflow();
            nudge();
          }
        }
      } catch (error) {
        const consoleErrors = new ConsoleErrors(error);
        document.body.appendChild(consoleErrors);
        // eslint-disable-next-line no-console
        console.error(error);
      }
    };

    /* *********************************************************** */
    /*  Reset all: Clears everything and resets the panel.         */
    /* *********************************************************** */
    this.resetAll = (restartPanel = true) => {
      Constants.Global.html.removeAttribute('data-sa11y-active');

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
      ], 'document');

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

      // Remove from panel.
      Constants.Panel.outlineList.innerHTML = '';
      Constants.Panel.pageIssuesList.innerHTML = '';
      Constants.Panel.readabilityInfo.innerHTML = '';
      Constants.Panel.readabilityDetails.innerHTML = '';
      Constants.Panel.panel.classList.remove('has-page-issues');

      // Remove any active alerts from panel.
      removeAlert();

      // Remove skip-to-issue EventListeners
      removeSkipBtnListeners();

      // Reset colour filters
      if (this.option.colourFilterPlugin === true) {
        Constants.Panel.colourFilterSelect.value = 0;
        Constants.Panel.colourPanel.classList.remove('active');
        Constants.Panel.colourFilterSelect.classList.remove('active');
        Constants.Panel.content.hidden = false;
      }

      // Main panel warning and error count.
      while (Constants.Panel.status.firstChild) Constants.Panel.status.removeChild(Constants.Panel.status.firstChild);

      if (restartPanel) {
        Constants.Panel.panel.classList.remove('active');
      }
    };

    // Initialize Sa11y.
    this.initialize();
  }
}

export { Lang, Sa11y };
