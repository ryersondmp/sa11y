/*!
      * Sa11y, the accessibility quality assurance assistant.
      * @version 5.0.0
      * @author Adam Chaboryk
      * @license GPL-2.0-or-later
      * @copyright © 2020 - 2026 Toronto Metropolitan University.
      * @contact adam.chaboryk@torontomu.ca
      * GitHub: git+https://github.com/ryersondmp/sa11y.git | Website: https://sa11y.netlify.app
      * The above copyright notice shall be included in all copies or substantial portions of the Software.
    **/
const defaultOptions = {
  // Target area to check
  checkRoot: "body",
  fixedRoots: false,
  // Exclusions
  containerIgnore: ".sa11y-ignore",
  contrastIgnore: ".sr-only",
  outlineIgnore: "",
  headerIgnore: "",
  headerIgnoreSpan: "",
  headerIgnoreStrings: "",
  imageIgnore: "",
  linkIgnore: "",
  linkIgnoreSpan: "",
  linkIgnoreStrings: [],
  paragraphIgnore: "table p",
  ignoreContentOutsideRoots: false,
  ignoreByTest: {
    LABELS_ARIA_LABELS_INPUT: ':is(header, footer) [type="search"]',
    LABELS_PLACEHOLDER: ':is(header, footer) [type="search"]'
  },
  // Control panel settings
  aboutContent: "",
  panelPosition: "right",
  showMovePanelToggle: true,
  checkAllHideToggles: false,
  developerChecksOnByDefault: false,
  // Page outline
  showHinPageOutline: false,
  showTitleInPageOutline: true,
  // Image outline
  showImageOutline: true,
  editImageURLofCMS: "",
  relativePathImageSRC: "",
  relativePathImageID: "",
  ignoreEditImageURL: [],
  ignoreEditImageClass: [],
  // Other features
  delayCheck: 0,
  delayCustomCheck: 500,
  detectSPArouting: false,
  doNotRun: "",
  headless: false,
  selectorPath: false,
  shadowComponents: "",
  autoDetectShadowComponents: false,
  pepper: window.location.hostname,
  // Provide a string to seed hashes.
  unitTestMode: false,
  // Annotations
  showGoodImageButton: true,
  showGoodLinkButton: true,
  dismissAnnotations: true,
  dismissAll: true,
  ignoreHiddenOverflow: "",
  insertAnnotationBefore: "",
  // Readability
  readabilityPlugin: true,
  readabilityRoot: "body",
  readabilityIgnore: "",
  // Contrast
  contrastPlugin: true,
  contrastAlgorithm: "AA",
  // AA, AAA, APCA
  // Other plugins
  customChecks: false,
  formLabelsPlugin: true,
  embeddedContentPlugin: true,
  developerPlugin: true,
  externalDeveloperChecks: false,
  colourFilterPlugin: true,
  exportResultsPlugin: false,
  // Options for accName computation: Ignore ARIA on these elements.
  ignoreAriaOnElements: false,
  // e.g. 'h1,h2,h3,h4,h5,h6'
  ignoreTextInElements: false,
  // e.g. '.inner-node-hidden-in-CSS'
  // Shared properties for some checks
  altPlaceholder: [],
  susAltStopWords: "",
  linkStopWords: "",
  extraPlaceholderStopWords: "",
  imageWithinLightbox: "",
  initialHeadingLevel: [],
  // Shared properties for page language detection
  langOfPartsPlugin: false,
  langOfPartsCache: true,
  // All checks
  checks: {
    // Heading checks
    HEADING_SKIPPED_LEVEL: true,
    HEADING_EMPTY_WITH_IMAGE: true,
    HEADING_EMPTY: true,
    HEADING_FIRST: true,
    HEADING_LONG: {
      maxLength: 170
    },
    HEADING_MISSING_ONE: true,
    // Image checks
    MISSING_ALT_LINK: true,
    MISSING_ALT_LINK_HAS_TEXT: true,
    MISSING_ALT: true,
    IMAGE_DECORATIVE_CAROUSEL: {
      sources: ".carousel"
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
      maxLength: 250
    },
    IMAGE_ALT_TOO_LONG: {
      maxLength: 250
    },
    LINK_IMAGE_ALT: {
      dismissAll: true
    },
    LINK_IMAGE_ALT_AND_TEXT: true,
    IMAGE_FIGURE_DUPLICATE_ALT: true,
    IMAGE_PASS: {
      dismissAll: true
    },
    ALT_UNPRONOUNCEABLE: true,
    LINK_ALT_UNPRONOUNCEABLE: true,
    ALT_MAYBE_BAD: {
      minLength: 15
    },
    LINK_ALT_MAYBE_BAD: {
      minLength: 15
    },
    ALT_MAYBE_BAD_WARNING: true,
    LINK_ALT_MAYBE_BAD_WARNING: true,
    // Link checks
    DUPLICATE_TITLE: {
      dismissAll: true
    },
    LINK_EMPTY_LABELLEDBY: true,
    LINK_EMPTY_NO_LABEL: true,
    LINK_STOPWORD: true,
    LINK_STOPWORD_ARIA: true,
    LINK_SYMBOLS: true,
    LINK_CLICK_HERE: true,
    LINK_DOI: {
      dismissAll: true
    },
    LINK_URL: {
      maxLength: 40
    },
    LINK_LABEL: {
      dismissAll: true
    },
    LINK_EMPTY: true,
    LINK_IDENTICAL_NAME: {
      dismissAll: true
    },
    LINK_NEW_TAB: {
      dismissAll: true
    },
    LINK_FILE_EXT: true,
    LINK_UNPRONOUNCEABLE: true,
    // Form labels checks
    LABELS_MISSING_IMAGE_INPUT: true,
    LABELS_INPUT_RESET: true,
    LABELS_MISSING_LABEL: true,
    LABELS_NO_FOR_ATTRIBUTE: true,
    LABELS_PLACEHOLDER: true,
    LABELS_ARIA_LABEL_INPUT: true,
    // Embedded content checks
    EMBED_AUDIO: {
      sources: ""
    },
    EMBED_VIDEO: {
      sources: ""
    },
    EMBED_DATA_VIZ: {
      sources: ""
    },
    EMBED_UNFOCUSABLE: true,
    EMBED_MISSING_TITLE: true,
    EMBED_GENERAL: true,
    // Quality assurance checks
    QA_BAD_LINK: {
      sources: ""
    },
    QA_STRONG_ITALICS: true,
    QA_IN_PAGE_LINK: true,
    QA_DOCUMENT: {
      sources: "",
      dismissAll: true
    },
    QA_PDF: {
      dismissAll: true
    },
    QA_BLOCKQUOTE: true,
    TABLES_MISSING_HEADINGS: true,
    TABLES_SEMANTIC_HEADING: true,
    TABLES_EMPTY_HEADING: true,
    TABLES_INVALID_HEADERS_REF: true,
    QA_FAKE_HEADING: true,
    QA_FAKE_LIST: true,
    QA_UPPERCASE: true,
    QA_UNDERLINE: true,
    QA_SUBSCRIPT: true,
    QA_NESTED_COMPONENTS: {
      sources: ""
    },
    QA_JUSTIFY: {
      dismissAll: true
    },
    QA_SMALL_TEXT: {
      dismissAll: true
    },
    // Meta checks
    META_LANG: true,
    META_LANG_VALID: true,
    META_LANG_SUGGEST: true,
    META_SCALABLE: true,
    META_MAX: true,
    META_REFRESH: true,
    PAGE_LANG_CONFIDENCE: {
      confidence: 0.95
    },
    LANG_OF_PARTS: true,
    LANG_MISMATCH: true,
    LANG_OF_PARTS_ALT: true,
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
    LINK_MAYBE_BUTTON: true,
    // Contrast checks
    CONTRAST_WARNING: {
      dismissAll: true
    },
    CONTRAST_INPUT: true,
    CONTRAST_ERROR: true,
    CONTRAST_PLACEHOLDER: true,
    CONTRAST_PLACEHOLDER_UNSUPPORTED: true,
    CONTRAST_ERROR_GRAPHIC: true,
    CONTRAST_WARNING_GRAPHIC: {
      dismissAll: true
    },
    CONTRAST_UNSUPPORTED: {
      dismissAll: true
    }
  }
};
const State = {
  option: { ...defaultOptions },
  results: [],
  headingOutline: [],
  imageResults: [],
  counts: {
    error: 0,
    warning: 0,
    dismissed: 0
  },
  customChecks: {
    running: false,
    finished: 0
  },
  dismissedResults: [],
  start: 0
};
const resetState = () => {
  State.results = [];
  State.headingOutline = [];
  State.imageResults = [];
  State.counts.error = 0;
  State.counts.warning = 0;
  State.counts.dismissed = 0;
  State.customChecks.running = false;
  State.customChecks.finished = 0;
  State.dismissedResults = [];
  State.start = 0;
};
const setState = (newOptions) => {
  State.option = {
    ...State.option,
    ...newOptions,
    checks: {
      ...State.option.checks,
      ...newOptions.checks || {}
    }
  };
};
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
    const el2 = document.createElement("div");
    const p = document.createElement("p");
    p.innerHTML = transString;
    el2.appendChild(p);
    if (args?.length) {
      args.forEach((_arg, index2) => {
        p.innerHTML = p.innerHTML.replace(/%\([a-zA-Z_]+\)/, `<span data-arg='${index2}'></span>`);
      });
      args.forEach((arg, index2) => {
        const replacement = el2.querySelector(`[data-arg="${index2}"]`);
        if (!replacement || arg === null) return;
        replacement.textContent = this.truncateString(String(arg), 300);
      });
    }
    return el2;
  },
  translate(string) {
    return this.langStrings[string] || string;
  },
  prepHTML($el) {
    return $el.replaceAll(/<hr>/g, '<hr aria-hidden="true">').replaceAll(/<a[\s]href=/g, '<a target="_blank" rel="noopener noreferrer" href=').replaceAll(/<\/a>/g, `<span class="visually-hidden"> (${Lang._("NEW_TAB")})</span></a>`).replaceAll(/{C}/g, 'class="colour"').replaceAll(/{B}/g, 'class="badge"').replaceAll(/{ALT}/g, `<strong class="badge">${Lang._("ALT")}</strong>`).replaceAll(
      /{L}/g,
      `<strong class="badge"><span class="link-icon"></span><span class="visually-hidden">${Lang._("LINKED")}</span></strong>`
    );
  },
  truncateString(string, maxLength) {
    const truncatedString = string.substring(0, maxLength).trimEnd();
    return string.length > maxLength ? `${truncatedString}...` : string;
  }
};
function removeAlert() {
  if (State.option.headless) return;
  const Sa11yPanel = document.querySelector("sa11y-control-panel").shadowRoot;
  const alert = Sa11yPanel.getElementById("panel-alert");
  const alertText = Sa11yPanel.getElementById("panel-alert-text");
  const alertPreview = Sa11yPanel.getElementById("panel-alert-preview");
  alert.classList.remove("active");
  alertPreview.classList.remove("panel-alert-preview");
  while (alertText.firstChild) {
    alertText.removeChild(alertText.firstChild);
  }
  while (alertPreview.firstChild) {
    alertPreview.removeChild(alertPreview.firstChild);
  }
}
function createAlert(alertMessage, errorPreview, extendedPreview, dismissable = false) {
  if (State.option.headless) return;
  const storageKey = dismissable ? `sa11y-dismissed-alert-${alertMessage.textContent.substring(0, 20)}` : "";
  if (dismissable && store.getItem(storageKey)) return;
  removeAlert();
  const Sa11yPanel = document.querySelector("sa11y-control-panel").shadowRoot;
  const alert = Sa11yPanel.getElementById("panel-alert");
  const alertText = Sa11yPanel.getElementById("panel-alert-text");
  const alertPreview = Sa11yPanel.getElementById("panel-alert-preview");
  const alertClose = Sa11yPanel.getElementById("close-alert");
  const skipButton = Sa11yPanel.getElementById("skip-button");
  alert.classList.add("active");
  if (typeof alertMessage === "string") {
    alertText.textContent = alertMessage;
  } else {
    alertText.appendChild(alertMessage);
  }
  alertPreview.innerHTML = "";
  if (errorPreview) {
    alertPreview.classList.add("panel-alert-preview");
    if (extendedPreview) {
      const elementPreview = document.createElement("div");
      elementPreview.className = "element-preview";
      if (typeof extendedPreview === "string") {
        elementPreview.textContent = extendedPreview;
      } else {
        elementPreview.appendChild(extendedPreview);
      }
      alertPreview.appendChild(elementPreview);
    }
    const previewMessage = document.createElement("div");
    previewMessage.className = "preview-message";
    if (typeof errorPreview === "string") {
      previewMessage.textContent = errorPreview;
    } else {
      previewMessage.appendChild(errorPreview);
    }
    alertPreview.appendChild(previewMessage);
  }
  if (dismissable) {
    const dismissBtn = document.createElement("button");
    dismissBtn.setAttribute("type", "button");
    dismissBtn.setAttribute("class", "dismiss-alert");
    dismissBtn.textContent = Lang._("Dismiss");
    dismissBtn.id = "dismiss-alert";
    dismissBtn.setAttribute("aria-labelledby", "dismiss-alert alert-heading");
    dismissBtn.setAttribute("aria-describedby", "panel-alert-text");
    dismissBtn.addEventListener("click", () => {
      store.setItem(storageKey, "true");
      closeAlert();
    });
    alertText.appendChild(dismissBtn);
  }
  setTimeout(() => alertClose.focus(), 300);
  function closeAlert() {
    removeAlert();
    const focusTarget = skipButton.hasAttribute("disabled") ? Sa11yPanel.getElementById("toggle") : skipButton;
    focusTarget.focus();
  }
  alertClose.addEventListener("click", closeAlert);
  alert.onkeydown = (e) => {
    const evt = e || window.event;
    if (evt.key === "Escape" && alert.classList.contains("active")) {
      closeAlert();
    }
  };
}
const Constants = /* @__PURE__ */ (function myConstants() {
  const Global = {};
  function initializeGlobal() {
    Global.html = document.querySelector("html");
    Global.shadowDetection = State.option.shadowComponents.length > 0 || State.option.autoDetectShadowComponents === true;
    const panelPositions = /* @__PURE__ */ new Set(["top-left", "top-right", "left", "right"]);
    const positionValue = State.option.panelPosition?.trim().toLowerCase();
    Global.panelPosition = panelPositions.has(positionValue) ? positionValue : "right";
    Global.contrastAlgorithm = State.option.contrastAlgorithm.toUpperCase();
    let reducedMotion = false;
    if (typeof window.matchMedia === "function") {
      reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
    }
    Global.scrollBehaviour = !reducedMotion || reducedMotion.matches ? "auto" : "smooth";
    Global.langDirection = Global.html.getAttribute("dir")?.trim()?.toLowerCase() === "rtl" ? "rtl" : "ltr";
    const documentSources = State.option.checks.QA_DOCUMENT.sources;
    const defaultDocumentSources = 'a[href$=".doc"], a[href$=".docx"], a[href*=".doc?"], a[href*=".docx?"], a[href$=".ppt"], a[href$=".pptx"], a[href*=".ppt?"], a[href*=".pptx?"], a[href^="https://drive.google.com/file"], a[href^="https://docs.google."], a[href^="https://sway."]';
    if (documentSources) {
      Global.documentSources = `${defaultDocumentSources}, ${documentSources}`;
    } else {
      Global.documentSources = defaultDocumentSources;
    }
    const videoSources = State.option.checks.EMBED_VIDEO.sources;
    const defaultVideoSources = 'video, [src*="Video"], [src*="video"], [src*="watch"], [src*="youtube.com"], [src*="vimeo.com"], [src*="panopto.com"], [src*="wistia.com"], [src*="dailymotion.com"], [src*="brightcove.com"], [src*="vidyard.com"]';
    if (videoSources) {
      const videos = videoSources.split(/\s*[\s,]\s*/).map(($el) => `[src*="${$el}"]`);
      Global.VideoSources = `${defaultVideoSources}, ${videos.join(", ")}`;
    } else {
      Global.VideoSources = defaultVideoSources;
    }
    const audioSources = State.option.checks.EMBED_AUDIO.sources;
    const defaultAudioSources = 'audio, [src*="soundcloud.com"], [src*="simplecast.com"], [src*="podbean.com"], [src*="buzzsprout.com"], [src*="blubrry.com"], [src*="transistor.fm"], [src*="fusebox.fm"], [src*="libsyn.com"], [src*="spotify.com"], [src*="podcasts.apple.com"], [src*="castbox.fm"], [src*="megaphone.fm"], [src*="spreaker.com"], [src*="anchor.fm"], [src*="rss.com"], [src*="redcircle.com"]';
    if (audioSources) {
      const audio = audioSources.split(/\s*[\s,]\s*/).map(($el) => `[src*="${$el}"]`);
      Global.AudioSources = `${defaultAudioSources}, ${audio.join(", ")}`;
    } else {
      Global.AudioSources = defaultAudioSources;
    }
    const dataVizSources = State.option.checks.EMBED_DATA_VIZ.sources;
    const defaultDataVizSources = '[src*="datastudio"], [src*="tableau"], [src*="lookerstudio"], [src*="powerbi"], [src*="qlik"]';
    if (dataVizSources) {
      const data = dataVizSources.split(/\s*[\s,]\s*/).map(($el) => `[src*="${$el}"]`);
      Global.VisualizationSources = `${defaultDataVizSources}, ${data.join(", ")}`;
    } else {
      Global.VisualizationSources = defaultDataVizSources;
    }
    Global.AllEmbeddedContent = `${Global.VideoSources}, ${Global.AudioSources}, ${Global.VisualizationSources}`;
  }
  const Root = {};
  function initializeRoot(desiredRoot, desiredReadabilityRoot, fixedRoots) {
    Root.areaToCheck = [];
    Root.Readability = [];
    if (fixedRoots) {
      Root.areaToCheck = fixedRoots;
      Root.Readability = fixedRoots;
      return;
    }
    try {
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
    if (Root.areaToCheck.length === 0 && Global.headless === false) {
      createAlert(Lang.sprintf("MISSING_ROOT", desiredRoot));
      Root.areaToCheck.push(document.body);
    }
    try {
      const roots = document.querySelectorAll(desiredReadabilityRoot);
      if (roots.length > 0) {
        roots.forEach((root) => {
          Constants.Root.Readability.push(root);
        });
      } else {
        Root.Readability = Root.areaToCheck;
        console.error(
          `Sa11y: The target readability root (${desiredReadabilityRoot}) does not exist.`
        );
        setTimeout(() => {
          const { readabilityDetails, readabilityToggle } = Constants.Panel;
          const readabilityOn = readabilityToggle?.getAttribute("aria-pressed") === "true";
          const alert = Constants.Panel.readability.querySelector("#readability-alert");
          if (readabilityDetails && readabilityOn && !alert) {
            const roots2 = Root.areaToCheck.map((el2) => {
              if (el2.id) return `#${el2.id}`;
              if (el2.className) return `.${el2.className.split(/\s+/).filter(Boolean).join(".")}`;
              return el2.tagName.toLowerCase();
            }).join(", ");
            const note = document.createElement("div");
            note.id = "readability-alert";
            note.appendChild(document.createElement("hr"));
            const message = Lang.sprintf("MISSING_READABILITY_ROOT", roots2, desiredReadabilityRoot);
            note.appendChild(message);
            readabilityDetails.insertAdjacentElement("afterend", note);
          }
        }, 100);
      }
    } catch {
      Root.Readability.length = 0;
    }
  }
  const Panel = {};
  function initializePanelSelectors() {
    const Sa11yPanel = document.querySelector("sa11y-control-panel").shadowRoot;
    Panel.panel = Sa11yPanel.getElementById("panel");
    Panel.content = Sa11yPanel.getElementById("panel-content");
    Panel.controls = Sa11yPanel.getElementById("panel-controls");
    Panel.outline = Sa11yPanel.getElementById("outline-panel");
    Panel.outlineContent = Sa11yPanel.getElementById("outline-content");
    Panel.outlineList = Sa11yPanel.getElementById("outline-list");
    Panel.outlineHeader = Sa11yPanel.getElementById("outline-header");
    Panel.images = Sa11yPanel.getElementById("images-panel");
    Panel.imagesContent = Sa11yPanel.getElementById("images-content");
    Panel.imagesList = Sa11yPanel.getElementById("images-list");
    Panel.imagesHeader = Sa11yPanel.getElementById("images-header");
    Panel.notifBadge = Sa11yPanel.getElementById("notification-badge");
    Panel.notifCount = Sa11yPanel.getElementById("notification-count");
    Panel.notifText = Sa11yPanel.getElementById("notification-text");
    Panel.status = Sa11yPanel.getElementById("status");
    Panel.pageIssues = Sa11yPanel.getElementById("page-issues");
    Panel.pageIssuesList = Sa11yPanel.getElementById("page-issues-list");
    Panel.pageIssuesHeader = Sa11yPanel.getElementById("page-issues-header");
    Panel.pageIssuesContent = Sa11yPanel.getElementById("page-issues-content");
    Panel.settings = Sa11yPanel.getElementById("settings-panel");
    Panel.settingsHeader = Sa11yPanel.getElementById("settings-header");
    Panel.settingsContent = Sa11yPanel.getElementById("settings-content");
    Panel.developerToggle = Sa11yPanel.getElementById("developer-toggle");
    Panel.readabilityToggle = Sa11yPanel.getElementById("readability-toggle");
    Panel.themeToggle = Sa11yPanel.getElementById("theme-toggle");
    Panel.developerItem = Sa11yPanel.getElementById("developer-item");
    Panel.readabilityItem = Sa11yPanel.getElementById("readability-item");
    Panel.darkModeItem = Sa11yPanel.getElementById("dark-mode-item");
    Panel.colourPanel = Sa11yPanel.getElementById("panel-colour-filters");
    Panel.colourFilterItem = Sa11yPanel.getElementById("colour-filter-item");
    Panel.colourFilterSelect = Sa11yPanel.getElementById("colour-filter-select");
    Panel.colourFilterIcon = Sa11yPanel.getElementById("filter-icon");
    Panel.toggle = Sa11yPanel.getElementById("toggle");
    Panel.outlineToggle = Sa11yPanel.getElementById("outline-toggle");
    Panel.imagesToggle = Sa11yPanel.getElementById("images-toggle");
    Panel.settingsToggle = Sa11yPanel.getElementById("settings-toggle");
    Panel.movePanelToggle = Sa11yPanel.getElementById("move-panel");
    Panel.skipButton = Sa11yPanel.getElementById("skip-button");
    Panel.dismissButton = Sa11yPanel.getElementById("dismiss-button");
    Panel.dismissTooltip = Sa11yPanel.getElementById("dismiss-tooltip");
    Panel.skipToPageIssues = Sa11yPanel.getElementById("skip-to-page-issues");
    Panel.exportHTML = Sa11yPanel.getElementById("export-html");
    Panel.exportCSV = Sa11yPanel.getElementById("export-csv");
    Panel.alert = Sa11yPanel.getElementById("panel-alert");
    Panel.alertText = Sa11yPanel.getElementById("panel-alert-text");
    Panel.alertPreview = Sa11yPanel.getElementById("panel-alert-preview");
    Panel.alertClose = Sa11yPanel.getElementById("close-alert");
    Panel.readability = Sa11yPanel.getElementById("readability-panel");
    Panel.readabilityInfo = Sa11yPanel.getElementById("readability-info");
    Panel.readabilityDetails = Sa11yPanel.getElementById("readability-details");
  }
  const Readability = {};
  function initializeReadability() {
    if (State.option.readabilityPlugin) {
      const supported = [
        "en",
        "fr",
        "es",
        "de",
        "nl",
        "it",
        "sv",
        "fi",
        "da",
        "no",
        "nb",
        "nn",
        "pt"
      ];
      const langCode = Lang._("LANG_CODE").substring(0, 2);
      const pageLang = Constants.Global.html.getAttribute("lang")?.trim()?.toLowerCase().substring(0, 2);
      Readability.Lang = langCode;
      const isSupported = pageLang && supported.includes(pageLang) && supported.includes(langCode);
      Readability.Plugin = Boolean(isSupported);
    }
  }
  const Exclusions = {};
  function initializeExclusions() {
    Exclusions.Sa11yElements = [
      "sa11y-heading-label",
      "sa11y-heading-anchor",
      "sa11y-annotation",
      "sa11y-tooltips",
      "sa11y-panel-tooltips",
      "sa11y-control-panel",
      "#sa11y-colour-filters",
      "#sa11y-colour-filters *"
    ];
    const exclusions = ["style", "script", "noscript"];
    Exclusions.Container = ["#wpadminbar", "#wpadminbar *", ...exclusions];
    if (State.option.containerIgnore) {
      const containerSelectors = State.option.containerIgnore.split(",").map((item) => item.trim());
      Exclusions.Container = Exclusions.Container.concat(
        containerSelectors.flatMap((item) => [`${item} *`, item])
      );
    }
    Exclusions.Contrast = [
      "link",
      "hr",
      "option",
      "audio",
      "audio *",
      "video",
      "video *",
      'input[type="color"]',
      'input[type="range"]',
      "progress",
      "progress *",
      "meter",
      "meter *",
      "iframe",
      "svg",
      "svg *",
      "script",
      "style",
      "noscript",
      "template",
      "head",
      "head *",
      "title",
      "meta",
      "link",
      "base",
      "datalist",
      "datalist *",
      ...exclusions
    ];
    if (State.option.contrastIgnore) {
      Exclusions.Contrast = State.option.contrastIgnore.split(",").map(($el) => $el.trim()).flatMap(($el) => [$el, `${$el} *`]).concat(Exclusions.Contrast);
    }
    Exclusions.Readability = ["nav li", '[role="navigation"] li', ...exclusions];
    if (State.option.readabilityIgnore) {
      Exclusions.Readability = State.option.readabilityIgnore.split(",").map(($el) => $el.trim()).flatMap(($el) => [$el, `${$el} *`]).concat(Exclusions.Readability);
    }
    Exclusions.Headings = State.option.headerIgnore ? State.option.headerIgnore.split(",").map(($el) => $el.trim()) : [];
    Exclusions.HeaderSpan = State.option.headerIgnoreSpan ? State.option.headerIgnoreSpan.split(",").map(($el) => $el.trim()) : [];
    Exclusions.Outline = State.option.outlineIgnore ? State.option.outlineIgnore.split(",").map(($el) => $el.trim()) : [];
    Exclusions.Images = [
      'img[role="presentation"]:not(a img[role="presentation"]), img[aria-hidden="true"]:not(a img[aria-hidden="true"]), img[role="none"]:not(a img[role="none"])'
    ];
    if (State.option.imageIgnore) {
      Exclusions.Images = State.option.imageIgnore.split(",").map(($el) => $el.trim()).concat(Exclusions.Images);
    }
    Exclusions.Links = [".anchorjs-link", '[aria-hidden="true"][tabindex^="-"]'];
    if (State.option.linkIgnore) {
      Exclusions.Links = State.option.linkIgnore.split(",").map(($el) => $el.trim()).concat(Exclusions.Links);
    }
    Exclusions.LinkSpan = State.option.linkIgnoreSpan ? State.option.linkIgnoreSpan.split(",").map(($el) => $el.trim()) : [];
    Exclusions.Paragraphs = State.option.paragraphIgnore ? State.option.paragraphIgnore.split(",").map(($el) => $el.trim()) : [];
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
    Exclusions
  };
})();
function find(selector, desiredRoot, exclude) {
  const root = [];
  if (desiredRoot === "document") {
    root.push(document.body);
    if (State.option.fixedRoots) {
      root.push(State.option.fixedRoots);
    }
  } else if (desiredRoot === "root") {
    root.push(Constants.Root.areaToCheck);
  } else {
    root.push(document.querySelectorAll(desiredRoot));
  }
  const exclusions = Constants.Exclusions.Container.join(", ");
  const additionalExclusions = exclude?.join(", ") || "";
  const additional = additionalExclusions ? `, ${additionalExclusions}` : "";
  let list = [];
  root.flat().filter(Boolean)?.forEach((r) => {
    const shadowComponents = r?.querySelectorAll("[data-sa11y-has-shadow-root]");
    const shadow = shadowComponents ? ", [data-sa11y-has-shadow-root]" : "";
    const elements = Array.from(
      r.querySelectorAll(`:is(${selector}${shadow}):not(${exclusions}${additional})`)
    );
    if (shadowComponents.length) {
      const shadowFind = [];
      elements.forEach((el2, i) => {
        if (el2?.matches?.("[data-sa11y-has-shadow-root]") && el2?.shadowRoot) {
          shadowFind[i] = el2.shadowRoot.querySelectorAll(
            `:is(${selector}):not(${exclusions}${additional})`
          );
        }
      });
      if (shadowFind.length > 0) {
        for (let index2 = shadowFind.length - 1; index2 >= 0; index2--) {
          if (shadowFind[index2]) {
            elements.splice(index2, 1, ...shadowFind[index2]);
          }
        }
      }
    }
    list = list.concat(elements.filter((node) => node.parentNode.tagName !== "SLOT"));
  });
  return list;
}
function documentLoadingCheck(callback) {
  if (document.readyState === "complete") {
    callback();
  } else {
    window.addEventListener("load", callback);
  }
}
function isScreenReaderOnly(element) {
  const style = getCachedStyle(element);
  if (style.getPropertyValue("clip-path").startsWith("inset(50%)")) {
    return true;
  }
  if (style.clip === "rect(1px, 1px, 1px, 1px)" || style.clip === "rect(0px, 0px, 0px, 0px)") {
    return true;
  }
  const indent = parseInt(style.textIndent, 10);
  if (!Number.isNaN(indent) && Math.abs(indent) > 5e3) {
    return true;
  }
  if (style.overflow === "hidden" && parseFloat(style.width) < 2 && parseFloat(style.height) < 2) {
    return true;
  }
  if (style.position === "absolute" && ["left", "right", "top", "bottom"].some((p) => Math.abs(parseInt(style[p], 10)) > 5e3)) {
    return true;
  }
  return parseFloat(style.fontSize) < 2;
}
function isElementHidden(element) {
  if (element.hidden) return true;
  const styles2 = getCachedStyle(element);
  return styles2.getPropertyValue("display") === "none" || styles2.getPropertyValue("visibility") === "hidden";
}
function isAriaHidden($el) {
  if (!$el || typeof $el.getAttribute !== "function") return false;
  return $el.getAttribute("aria-hidden")?.trim().toLowerCase() === "true";
}
function isPresentational($el) {
  if (!$el || typeof $el.getAttribute !== "function") return false;
  const roleAttr = $el.getAttribute("role");
  if (!roleAttr) return false;
  return roleAttr.toLowerCase().split(/\s+/).some((role) => role === "presentation" || role === "none");
}
function isNegativeTabindex($el) {
  return $el && $el.tabIndex < 0;
}
function isHiddenAndUnfocusable($el) {
  return (isPresentational($el) || isAriaHidden($el)) && isNegativeTabindex($el);
}
function isDisabled($el) {
  if (!$el || typeof $el.getAttribute !== "function") return false;
  const isNativeDisabled = $el.hasAttribute("disabled") || $el.disabled === true;
  const isAriaDisabled = $el.getAttribute("aria-disabled")?.trim().toLowerCase() === "true";
  return isNativeDisabled || isAriaDisabled;
}
function isElementVisuallyHiddenOrHidden(element) {
  if (element.offsetWidth === 0 && element.offsetHeight === 0 || element.clientHeight === 1 && element.clientWidth === 1) {
    return true;
  }
  return isElementHidden(element);
}
function stripAllSpecialCharacters(string) {
  if (!string) return "";
  return string.replace(/[^\p{L}\p{N}\s]/gu, "").replace(/\s+/g, " ").trim();
}
const invalidProtocolRegex = /^([^\w]*)(javascript|data|vbscript)/im;
const htmlEntitiesRegex = /&#(\w+)(^\w|;)?/g;
const htmlCtrlEntityRegex = /&(newline|tab);/gi;
const ctrlCharactersRegex = (
  // biome-ignore lint/suspicious/noControlCharactersInRegex: original lib.
  /[\u0000-\u001F\u007F-\u009F\u2000-\u200D\uFEFF]/gim
);
const urlSchemeRegex = /^.+(:|&colon;)/gim;
const whitespaceEscapeCharsRegex = /(\\|%5[cC])((%(6[eE]|72|74))|[nrt])/g;
const relativeFirstCharacters = [".", "/"];
const BLANK_URL = "about:blank";
function isRelativeUrlWithoutProtocol(url2) {
  return relativeFirstCharacters.indexOf(url2[0]) > -1;
}
function decodeHtmlCharacters(str) {
  const removedNullByte = str.replace(ctrlCharactersRegex, "");
  return removedNullByte.replace(htmlEntitiesRegex, (match, dec) => {
    return String.fromCharCode(dec);
  });
}
function isValidUrl(url2) {
  if (typeof URL.canParse === "function") {
    return URL.canParse(url2);
  }
  try {
    const parsedUrl = new URL(url2);
    return Boolean(parsedUrl);
  } catch {
    return false;
  }
}
const decodeURIs = (uri) => {
  try {
    return decodeURIComponent(uri);
  } catch {
    return uri;
  }
};
function sanitizeURL(url2) {
  if (!url2 || typeof url2 !== "string") return BLANK_URL;
  const isBase64Data = /^data:([a-z]+\/[a-z0-9-+.]+)?;base64,/i.test(url2.trim());
  if (isBase64Data) return url2.trim();
  let charsToDecode;
  let decodedUrl = decodeURIs(url2.trim());
  do {
    decodedUrl = decodeHtmlCharacters(decodedUrl).replace(htmlCtrlEntityRegex, "").replace(ctrlCharactersRegex, "").replace(whitespaceEscapeCharsRegex, "").trim();
    decodedUrl = decodeURIs(decodedUrl);
    charsToDecode = decodedUrl.match(ctrlCharactersRegex) || decodedUrl.match(htmlEntitiesRegex) || decodedUrl.match(htmlCtrlEntityRegex) || decodedUrl.match(whitespaceEscapeCharsRegex);
  } while (charsToDecode && charsToDecode.length > 0);
  const sanitizedUrl = decodedUrl;
  if (!sanitizedUrl) return BLANK_URL;
  if (isRelativeUrlWithoutProtocol(sanitizedUrl)) return sanitizedUrl;
  const trimmedUrl = sanitizedUrl.trimStart();
  const urlSchemeParseResults = trimmedUrl.match(urlSchemeRegex);
  if (!urlSchemeParseResults) return sanitizedUrl;
  const urlScheme = urlSchemeParseResults[0].toLowerCase().trim();
  if (invalidProtocolRegex.test(urlScheme)) return BLANK_URL;
  const backSanitized = trimmedUrl.replace(/\\/g, "/");
  if (urlScheme === "mailto:" || urlScheme.includes("://")) return backSanitized;
  if (urlScheme === "http:" || urlScheme === "https:") {
    if (!isValidUrl(backSanitized)) return BLANK_URL;
    const url3 = new URL(backSanitized);
    url3.protocol = url3.protocol.toLowerCase();
    url3.hostname = url3.hostname.toLowerCase();
    return url3.toString();
  }
  return backSanitized;
}
const allowedTags = [
  "a",
  "abbr",
  "address",
  "article",
  "aside",
  "audio",
  "b",
  "bdo",
  "blockquote",
  "br",
  "button",
  "canvas",
  "cite",
  "code",
  "data",
  "dd",
  "del",
  "details",
  "dfn",
  "div",
  "dl",
  "dt",
  "em",
  "fieldset",
  "figcaption",
  "figure",
  "footer",
  "form",
  "h1",
  "h2",
  "h3",
  "h4",
  "h5",
  "h6",
  "header",
  "hr",
  "i",
  "iframe",
  "img",
  "input",
  "ins",
  "kbd",
  "label",
  "li",
  "main",
  "mark",
  "meter",
  "nav",
  "noscript",
  "ol",
  "output",
  "p",
  "picture",
  "pre",
  "progress",
  "q",
  "rp",
  "rt",
  "s",
  "samp",
  "section",
  "select",
  "small",
  "source",
  "span",
  "strong",
  "sub",
  "summary",
  "sup",
  "svg",
  "table",
  "tbody",
  "td",
  "textarea",
  "tfoot",
  "th",
  "thead",
  "time",
  "tr",
  "track",
  "u",
  "ul",
  "var",
  "video",
  "wbr",
  "path"
];
const attrWhitelist = {
  a: ["href", "title", "target", "rel", "download"],
  img: ["src", "alt", "title", "width", "height", "loading", "srcset", "sizes"],
  iframe: [
    "src",
    "width",
    "height",
    "title",
    "frameborder",
    "allowfullscreen",
    "loading",
    "sandbox"
  ],
  details: ["open"],
  ol: ["start", "type", "reversed"],
  li: ["value"],
  td: ["colspan", "rowspan"],
  th: ["colspan", "rowspan", "scope"],
  global: ["class", "id", "role", "lang", "dir", "name"],
  path: ["d", "fill", "fill-rule"]
};
function sanitizeHTML(string) {
  const parser = new DOMParser();
  const doc = parser.parseFromString(string, "text/html");
  const allElements = doc.body.querySelectorAll("*");
  allElements.forEach((node) => {
    const tag = node.tagName.toLowerCase();
    if (!allowedTags.includes(tag)) {
      node.remove();
      return;
    }
    const allowedForThisTag = attrWhitelist[tag] || [];
    const globals = attrWhitelist.global;
    [...node.attributes].forEach(({ name, value }) => {
      const isAria = name.startsWith("aria-");
      const isAllowed = allowedForThisTag.includes(name) || globals.includes(name) || isAria;
      const isUrlAttr = ["src", "href", "srcset"].includes(name);
      if (!isAllowed) {
        node.removeAttribute(name);
      } else if (isUrlAttr) {
        const cleanURL = sanitizeURL(value);
        if (!cleanURL) {
          node.removeAttribute(name);
        } else {
          node.setAttribute(name, cleanURL);
        }
      }
    });
  });
  return doc.body.innerHTML;
}
const baseIgnores = "noscript,script,style,audio,video,form,iframe";
function fnIgnore(element, selectors = []) {
  const ignoreQuery = selectors.length ? `${baseIgnores},${selectors.join(",")}` : baseIgnores;
  if (!element || element.nodeType !== Node.ELEMENT_NODE) {
    return element ? element.cloneNode(true) : null;
  }
  function cloneTree(node, isRoot = false) {
    const type = node.nodeType;
    if (type === Node.ELEMENT_NODE) {
      if (node.matches(ignoreQuery) && !isRoot) {
        return null;
      }
      const clone = node.cloneNode(false);
      if (node.matches(ignoreQuery) && isRoot) {
        return clone;
      }
      let child = node.firstChild;
      while (child) {
        const clonedChild = cloneTree(child);
        if (clonedChild) clone.appendChild(clonedChild);
        child = child.nextSibling;
      }
      return clone;
    }
    if (type === Node.TEXT_NODE) return node.cloneNode(true);
    return null;
  }
  return cloneTree(element, true);
}
let gotText = /* @__PURE__ */ new WeakMap();
function getText(element) {
  if (gotText.has(element)) {
    return gotText.get(element);
  }
  const ignore = fnIgnore(element);
  const text = ignore.textContent.replace(/[\r\n]+/g, "").replace(/\s+/g, " ").trim();
  gotText.set(element, text);
  return text;
}
function resetGetText() {
  gotText = /* @__PURE__ */ new WeakMap();
}
let styleCaches = {};
const getCachedStyle = (node, pseudoElt = null) => {
  if (!node) return null;
  const cacheKey = pseudoElt || "base";
  if (!styleCaches[cacheKey]) {
    styleCaches[cacheKey] = /* @__PURE__ */ new WeakMap();
  }
  const targetCache = styleCaches[cacheKey];
  if (!targetCache.has(node)) {
    targetCache.set(node, getComputedStyle(node, pseudoElt));
  }
  return targetCache.get(node);
};
const resetStyleCache = () => {
  styleCaches = {};
};
let parentCache = /* @__PURE__ */ new WeakMap();
function getCachedClosest(element, selector) {
  if (!element || !selector) return null;
  if (!parentCache.has(element)) {
    parentCache.set(element, /* @__PURE__ */ new Map());
  }
  const elementCache = parentCache.get(element);
  if (elementCache.has(selector)) {
    return elementCache.get(selector);
  }
  const result = element.closest(selector);
  elementCache.set(selector, result);
  return result;
}
function resetParentCache() {
  parentCache = /* @__PURE__ */ new WeakMap();
}
function removeWhitespace(string) {
  return string.replace(/[\r\n]+/g, " ").replace(/\s+/g, " ").trim();
}
function normalizeString(string) {
  return removeWhitespace(string.replace(/[\u0000-\u001F\u007F-\u009F]/g, ""));
}
function truncateString(string, maxLength) {
  const truncatedString = string.substring(0, maxLength).trimEnd();
  return string.length > maxLength ? `${truncatedString}...` : string;
}
function debounce(callback, wait) {
  let timeoutId = null;
  return (...args) => {
    window.clearTimeout(timeoutId);
    timeoutId = window.setTimeout(() => {
      callback(...args);
    }, wait);
  };
}
function findVisibleParent(element, property, value) {
  let $el = element;
  while ($el) {
    const style = getCachedStyle($el);
    const propValue = style.getPropertyValue(property);
    if (propValue === value) {
      return $el;
    }
    $el = $el.parentElement;
  }
  return null;
}
function offsetTop(element) {
  const rect = element.getBoundingClientRect();
  const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
  return { top: rect.top + scrollTop };
}
const store = {
  getItem(key) {
    try {
      if (localStorage.getItem(key) === null) {
        return sessionStorage.getItem(key);
      }
      return localStorage.getItem(key);
    } catch {
      return false;
    }
  },
  setItem(key, value) {
    try {
      localStorage.setItem(key, value);
    } catch {
      sessionStorage.setItem(key, value);
    }
    return true;
  },
  removeItem(key) {
    try {
      localStorage.removeItem(key);
    } catch {
      sessionStorage.removeItem(key);
    }
    return true;
  }
};
function addPulse(element) {
  const border = "data-sa11y-pulse-border";
  element.setAttribute(border, "");
  setTimeout(() => element.removeAttribute(border), 2500);
}
function getNextSibling(element, selector) {
  let sibling = element.nextElementSibling;
  if (!selector) {
    return sibling;
  }
  while (sibling) {
    if (sibling.matches(selector)) {
      return sibling;
    }
    sibling = sibling.nextElementSibling;
  }
  return "";
}
function prepareDismissal(string) {
  return String(string).replace(/([^0-9a-zA-Z])/g, "").substring(0, 256);
}
function generateSelectorPath(element) {
  const path = [];
  let currentElement = element;
  while (currentElement) {
    let selector = currentElement.localName;
    if (currentElement.id) {
      selector += `#${currentElement.id}`;
      path.unshift(selector);
      break;
    } else {
      const classAttr = currentElement.getAttribute ? currentElement.getAttribute("class") : null;
      if (classAttr) {
        const classSelector = classAttr.trim().replace(/\s+/g, ".");
        if (classSelector) {
          selector += `.${classSelector}`;
        }
      }
    }
    const parentElement = currentElement.parentNode;
    if (parentElement) {
      const siblings = parentElement.children;
      if (siblings.length > 1) {
        const index2 = Array.prototype.indexOf.call(siblings, currentElement) + 1;
        selector += `:nth-child(${index2})`;
      }
      path.unshift(selector);
    } else {
      break;
    }
    currentElement = currentElement.parentNode.host || currentElement.parentNode;
  }
  return path.join(" > ");
}
function trapFocus(element) {
  const focusable = element.querySelectorAll(
    'a[href]:not([disabled]), button:not([disabled]), input[type="color"]'
  );
  const firstFocusable = focusable[0];
  const lastFocusable = focusable[focusable.length - 1];
  element.addEventListener("keydown", (e) => {
    const isTabPressed = e.key === "Tab" || e.keyCode === 9;
    const root = element.getRootNode();
    if (!isTabPressed) {
      return;
    }
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
function resetAttributes(attributes, root) {
  attributes.forEach((attr) => {
    const reset = find(`[${attr}]`, `${root}`);
    reset.forEach(($el) => {
      $el.removeAttribute(attr);
    });
  });
}
function remove(elements, root) {
  const allElements = find(`${elements}`, `${root}`);
  allElements.forEach(($el) => {
    $el?.parentNode?.removeChild($el);
  });
}
function isScrollable(scrollArea, container, ariaLabel) {
  setTimeout(() => {
    if (scrollArea.scrollHeight > container.clientHeight) {
      container.classList.add("scrollable");
      scrollArea.setAttribute("tabindex", "0");
      if (ariaLabel) {
        scrollArea.setAttribute("aria-label", ariaLabel);
        scrollArea.setAttribute("role", "region");
      }
    } else {
      container.classList.remove("scrollable");
    }
  }, 50);
}
function getBestImageSource(element) {
  const getLastSrc = (src) => src?.split(/,\s+/).pop()?.trim()?.split(/\s+/)[0];
  const resolveUrl = (src) => src ? new URL(src, window.location.href).href : null;
  const dataSrc = getLastSrc(element.getAttribute("data-src") || element.getAttribute("srcset"));
  if (dataSrc) return resolveUrl(dataSrc);
  const pictureSrcset = getCachedClosest(element, "picture")?.querySelector("source[srcset]")?.getAttribute("srcset");
  const pictureSrc = getLastSrc(pictureSrcset);
  if (pictureSrc) return resolveUrl(pictureSrc);
  return resolveUrl(element.getAttribute("src"));
}
const blobToBase64 = (blob) => new Promise((resolve, reject) => {
  const reader = new FileReader();
  reader.onloadend = () => {
    let { result } = reader;
    const detectedMime = blob?.type?.startsWith("image/") ? blob.type : "image/png";
    if (result.startsWith("data:application/octet-stream")) {
      result = result.replace("data:application/octet-stream", `data:${detectedMime}`);
    }
    resolve(result);
  };
  reader.onerror = reject;
  reader.readAsDataURL(blob);
});
function generateElementPreview(issueObject, convertBase64 = false) {
  const issueElement = issueObject.element;
  const createCodeFallback = () => {
    const pre = document.createElement("pre");
    const code = document.createElement("code");
    code.textContent = truncateString(issueObject.htmlPath, 400);
    pre.appendChild(code);
    return pre;
  };
  const simple = (element) => {
    const text = getText(element);
    if (text.length > 0) {
      const span = document.createElement("span");
      span.textContent = truncateString(text, 100);
      return span;
    }
    return createCodeFallback();
  };
  const tagHandlers = {
    SPAN: simple,
    P: simple,
    A: (element) => {
      const text = getText(element);
      if (text.length > 1 && element.href && !element.hasAttribute("role")) {
        const anchor = document.createElement("a");
        anchor.href = sanitizeURL(element.href);
        anchor.textContent = truncateString(text, 100);
        return anchor;
      }
      return createCodeFallback();
    },
    IMG: (element) => {
      const src = getBestImageSource(element);
      if (!src) return createCodeFallback();
      const containerAnchor = getCachedClosest(element, "a[href]");
      const buildImgElement = (url2) => {
        const img = document.createElement("img");
        img.src = url2.startsWith("data:image/") ? url2 : sanitizeURL(url2);
        if (element.alt) img.alt = element.alt;
        if (containerAnchor) {
          const a = document.createElement("a");
          a.href = sanitizeURL(containerAnchor.href);
          a.rel = "noopener noreferrer";
          a.appendChild(img);
          return a;
        }
        return img;
      };
      if (!convertBase64) return buildImgElement(src);
      return (async () => {
        try {
          if (new URL(src, window.location.origin).origin !== window.location.origin)
            throw new Error();
          const response = await fetch(src);
          const blob = await response.blob();
          const b64 = await blobToBase64(blob);
          return buildImgElement(b64);
        } catch {
          return buildImgElement(src);
        }
      })();
    }
  };
  const handler = tagHandlers[issueElement.tagName];
  return handler ? handler(issueElement) : createCodeFallback();
}
function isVisibleTextInAccName($el, accName, exclusions = [], linkIgnoreStrings) {
  let text = "";
  const excludeSelector = exclusions?.length ? exclusions.join(",") : "";
  const ignoreStrings = Array.isArray(linkIgnoreStrings) ? linkIgnoreStrings : null;
  const stripIgnored = (value = "") => ignoreStrings ? ignoreStrings.reduce((result, str) => result.replace(str, ""), value) : value;
  $el.childNodes.forEach((node) => {
    if (node.nodeType === Node.TEXT_NODE) {
      text += stripIgnored(node.textContent);
    }
    if (node.nodeType !== Node.ELEMENT_NODE) {
      return;
    }
    if (excludeSelector && node.matches(excludeSelector)) {
      return;
    }
    if (!isElementVisuallyHiddenOrHidden(node)) {
      text += stripIgnored(getText(node));
    }
  });
  const emojiRegex = /[\p{Emoji_Presentation}\p{Extended_Pictographic}]/gu;
  let visibleText = text.replace(emojiRegex, "");
  visibleText = removeWhitespace(visibleText).toLowerCase();
  if (/^[x×✕✖✗✘]$/i.test(visibleText)) {
    return false;
  }
  return visibleText.length !== 0 && !accName.toLowerCase().includes(visibleText);
}
function standardizeHref($el) {
  let href = $el.getAttribute("href");
  href = removeWhitespace(href).toLowerCase();
  if (href.endsWith("/")) {
    href = href.slice(0, -1);
  }
  href = href.replace(/^https?:\/\/(www\.)?/, "");
  href = href.replace(/\.(html|php|htm|asp|aspx)$/i, "");
  return href;
}
function initRovingTabindex(container, children) {
  let current = 0;
  const handleKeyDown = (e) => {
    if (!["ArrowUp", "ArrowDown", "Space"].includes(e.code)) {
      return;
    }
    if (e.code === "Space") {
      children[current].click();
      e.preventDefault();
      return;
    }
    const selected = children[current];
    selected.setAttribute("tabindex", -1);
    let next;
    if (e.code === "ArrowDown") {
      next = current + 1;
      if (current === children.length - 1) {
        next = 0;
      }
    } else if (e.code === "ArrowUp") {
      next = current - 1;
      if (current === 0) {
        next = children.length - 1;
      }
    }
    children[next].setAttribute("tabindex", 0);
    children[next].focus();
    current = next;
    e.preventDefault();
  };
  container.addEventListener("focus", () => {
    if (children.length > 0) {
      container.setAttribute("tabindex", -1);
      children[current].setAttribute("tabindex", 0);
      children[current].focus();
    }
    container.addEventListener("keydown", handleKeyDown);
  });
  container.addEventListener("blur", () => {
    container.removeEventListener("keydown", handleKeyDown);
  });
}
function supportsAnchorPositioning() {
  return CSS.supports("anchor-name: --sa11y") && CSS.supports("position-anchor: --sa11y");
}
function generateRegexString(input, matchStart = false) {
  if (!input) return null;
  if (input instanceof RegExp) return input;
  let patterns = [];
  if (Array.isArray(input)) {
    patterns = input;
  } else if (typeof input === "string") {
    patterns = input.split(",").map((s) => s.trim());
  } else {
    return null;
  }
  patterns = patterns.filter((p) => p && p.length > 0);
  if (patterns.length === 0) return null;
  const escapeRegExp = (string) => {
    return string.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
  };
  const joinedPatterns = patterns.map(escapeRegExp).join("|");
  const finalPattern = matchStart ? `^(?:${joinedPatterns})` : joinedPatterns;
  return new RegExp(finalPattern, "gi");
}
async function dismissDigest(pepper, message) {
  const msgUint8 = new TextEncoder().encode(pepper + message);
  const hashBuffer = await window.crypto.subtle.digest("SHA-256", msgUint8);
  if (Uint8Array.prototype.toHex) {
    return new Uint8Array(hashBuffer).toHex();
  }
  const hashArray = Array.from(new Uint8Array(hashBuffer));
  return hashArray.map((b) => b.toString(16).padStart(2, "0")).join("");
}
let langCache;
function validateLang(code, displayLangCode) {
  if (typeof code !== "string") return { valid: false };
  const norm = code.trim().replace(/_/g, "-");
  if (!langCache && typeof Intl !== "undefined") {
    try {
      langCache = new Intl.DisplayNames([displayLangCode], { type: "language", fallback: "none" });
    } catch {
    }
  }
  if (langCache) {
    const check = (val) => {
      try {
        return langCache.of(val);
      } catch {
        return false;
      }
    };
    if (check(code)) return { valid: true };
    if (check(norm)) return { valid: false, suggest: norm };
    return { valid: false };
  }
  return { valid: /^[a-z]{2,3}(-[a-z]{4})?(-[a-z]{2,4})?$/i.test(norm) };
}
const Utils = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  addPulse,
  blobToBase64,
  debounce,
  dismissDigest,
  documentLoadingCheck,
  findVisibleParent,
  fnIgnore,
  generateElementPreview,
  generateRegexString,
  generateSelectorPath,
  getBestImageSource,
  getCachedClosest,
  getCachedStyle,
  getNextSibling,
  getText,
  initRovingTabindex,
  isAriaHidden,
  isDisabled,
  isElementHidden,
  isElementVisuallyHiddenOrHidden,
  isHiddenAndUnfocusable,
  isNegativeTabindex,
  isPresentational,
  isScreenReaderOnly,
  isScrollable,
  isVisibleTextInAccName,
  normalizeString,
  offsetTop,
  prepareDismissal,
  remove,
  removeWhitespace,
  resetAttributes,
  resetGetText,
  resetParentCache,
  resetStyleCache,
  sanitizeHTML,
  sanitizeURL,
  standardizeHref,
  store,
  stripAllSpecialCharacters,
  supportsAnchorPositioning,
  trapFocus,
  truncateString,
  validateLang
}, Symbol.toStringTag, { value: "Module" }));
const styles$1 = "[data-sa11y-overflow]{overflow:auto!important}[data-sa11y-error]{outline-offset:2px;outline:5px solid var(--sa11y-error)!important}a[data-sa11y-error]:empty{margin:1px}[data-sa11y-warning]:not([data-sa11y-error]){outline-offset:2px;outline:5px solid var(--sa11y-warning)!important}[data-sa11y-pulse-border]{box-shadow:0;animation:1s 2 pulse;outline:5px solid var(--sa11y-focus-color)!important}[data-sa11y-pulse-border]:hover,[data-sa11y-pulse-border]:focus{animation:none}@keyframes pulse{0%{box-shadow:0 0 0 5px var(--sa11y-focus-color)}50%{box-shadow:0 0 0 12px var(--sa11y-pulse-color)}to{box-shadow:0 0 0 5px var(--sa11y-pulse-color)}}img[data-sa11y-pulse-border],h1[data-sa11y-pulse-border],h2[data-sa11y-pulse-border],h3[data-sa11y-pulse-border],h4[data-sa11y-pulse-border],h5[data-sa11y-pulse-border],h6[data-sa11y-pulse-border]{animation:1s 2 pulse-scale}@keyframes pulse-scale{0%{opacity:1;transform:scale(1)}50%{opacity:.7;transform:scale(1.02)}to{opacity:1;transform:scale(1)}}@media (prefers-reduced-motion:reduce){[data-sa11y-pulse-border]{animation:none!important}}@media (forced-colors:active){[data-sa11y-error],[data-sa11y-warning],[data-sa11y-good],[data-sa11y-error-inline],[data-sa11y-warning-inline],[data-sa11y-pulse-border]{forced-color-adjust:none}}";
const addStyleUtilities = (component) => {
  const CSSUtils = component.shadowRoot.querySelectorAll(".sa11y-css-utilities");
  if (CSSUtils.length === 0) {
    const style = document.createElement("style");
    style.setAttribute("class", "sa11y-css-utilities");
    style.textContent = styles$1;
    component.shadowRoot.appendChild(style);
  }
};
function findShadowComponents() {
  if (State.option.autoDetectShadowComponents) {
    const ignore = Constants.Exclusions.Sa11yElements;
    const root = document.querySelector(State.option.checkRoot);
    const search = root ? Array.from(root.querySelectorAll(`*:not(${ignore})`)) : Array.from(document.body.querySelectorAll(`*:not(${ignore})`));
    search.forEach((component) => {
      if (component.shadowRoot && component.shadowRoot.mode === "open") {
        component.setAttribute("data-sa11y-has-shadow-root", "");
        addStyleUtilities(component);
      }
    });
  } else if (State.option.shadowComponents) {
    const providedShadow = document.querySelectorAll(State.option.shadowComponents);
    providedShadow.forEach((component) => {
      component.setAttribute("data-sa11y-has-shadow-root", "");
      addStyleUtilities(component);
    });
  }
}
const Elements = (function myElements() {
  const Found = {};
  const contrastExcludedTags = /* @__PURE__ */ new Set([
    "AUDIO",
    "VIDEO",
    "IFRAME",
    "SVG",
    "SCRIPT",
    "STYLE",
    "NOSCRIPT",
    "TEMPLATE",
    "HEAD",
    "TITLE",
    "META",
    "BASE",
    "DATALIST",
    "PROGRESS",
    "METER",
    "LINK",
    "HR",
    "OPTION"
  ]);
  const contrastAncestorSelector = "audio,video,meter,progress,datalist,head,svg";
  let contrastAttrSelector = "";
  function buildContrastAttrSelector() {
    const base = ['input[type="color"]', 'input[type="range"]'];
    if (State.option.contrastIgnore) {
      const userSelectors = State.option.contrastIgnore.split(",").map((s) => s.trim()).flatMap((s) => [s, `${s} *`]);
      base.push(...userSelectors);
    }
    contrastAttrSelector = base.join(",");
  }
  let _pageTextComputed = false;
  let _pageTextValue = null;
  let _readabilityComputed = false;
  let _readabilityValue = null;
  Object.defineProperty(Found, "pageText", {
    get() {
      if (!_pageTextComputed) {
        _pageTextValue = computePageText();
        _pageTextComputed = true;
      }
      return _pageTextValue;
    },
    set(val) {
      _pageTextValue = val;
      _pageTextComputed = true;
    },
    configurable: true,
    enumerable: true
  });
  Object.defineProperty(Found, "Readability", {
    get() {
      if (!_readabilityComputed) {
        _readabilityValue = computeReadabilityText();
        _readabilityComputed = true;
      }
      return _readabilityValue;
    },
    set(val) {
      _readabilityValue = val;
      _readabilityComputed = true;
    },
    configurable: true,
    enumerable: true
  });
  function computePageText() {
    const elementSet = new Set(Found.Everything);
    return Found.Everything.filter(($el) => {
      if ($el instanceof HTMLImageElement) return true;
      let parent = $el.parentElement;
      while (parent) {
        if (elementSet.has(parent)) return false;
        parent = parent.parentElement;
      }
      return true;
    }).map(($el) => {
      let text = "";
      if ($el instanceof HTMLImageElement) {
        text = $el.alt || "";
      } else if ($el.tagName === "LI") {
        text = Array.from($el.childNodes).filter((n) => n.nodeType === 3).map((n) => n.textContent).join(" ");
      } else {
        const clone = $el.cloneNode(true);
        if (clone.querySelectorAll) {
          const nestedLangNodes = clone.querySelectorAll("[lang]");
          for (const node of nestedLangNodes) node.remove();
        }
        text = getText(fnIgnore(clone));
      }
      return normalizeString(text);
    }).filter(Boolean);
  }
  function computeReadabilityText() {
    const readabilityExclusions = ($el) => Constants.Root.Readability.some((rootEl) => rootEl.contains($el)) && !Constants.Exclusions.Readability.some((selector) => $el.matches(selector));
    return [
      ...Found.Paragraphs.filter(readabilityExclusions),
      ...Found.Lists.filter(readabilityExclusions)
    ].map(($el) => getText(fnIgnore($el))).filter(Boolean);
  }
  function initializeElements() {
    _pageTextComputed = false;
    _pageTextValue = null;
    _readabilityComputed = false;
    _readabilityValue = null;
    buildContrastAttrSelector();
    const badLinkSourcesRaw = State.option.checks.QA_BAD_LINK.sources;
    const badLinkSelectors = badLinkSourcesRaw.length ? badLinkSourcesRaw.split(",").map((s) => s.trim()) : [];
    const nestedSources = State.option.checks.QA_NESTED_COMPONENTS.sources || '[role="tablist"], details';
    Found.Everything = find("*", "root", Constants.Exclusions.Sa11yElements);
    Found.Images = [];
    Found.Links = [];
    Found.Paragraphs = [];
    Found.Lists = [];
    Found.Blockquotes = [];
    Found.Tables = [];
    Found.StrongItalics = [];
    Found.Subscripts = [];
    Found.Buttons = [];
    Found.Inputs = [];
    Found.Labels = [];
    Found.iframes = [];
    Found.Svg = [];
    Found.Contrast = [];
    Found.TabIndex = [];
    Found.NestedComponents = [];
    Found.CustomErrorLinks = [];
    Found.LangTags = [];
    const imageRoles = /* @__PURE__ */ new Set(["img", "graphics-document", "graphics-symbol", "graphics-object"]);
    for (let i = 0; i < Found.Everything.length; i++) {
      const $el = Found.Everything[i];
      const tag = $el.tagName;
      const role = $el.getAttribute("role")?.trim().toLowerCase();
      let handledByRole = false;
      if (role) {
        if (imageRoles.has(role) && !Constants.Exclusions.Images.some((s) => $el.matches(s))) {
          Found.Images.push($el);
          handledByRole = true;
        } else if (role === "link" && !Constants.Exclusions.Links.some((s) => $el.matches(s))) {
          Found.Links.push($el);
          handledByRole = true;
        } else if (role === "button") {
          Found.Buttons.push($el);
          handledByRole = true;
        }
      }
      if (!handledByRole) {
        switch (tag) {
          case "IMG":
            if (!Constants.Exclusions.Images.some((s) => $el.matches(s))) Found.Images.push($el);
            break;
          case "A":
          // HTML anchor
          case "a":
            if ($el.hasAttribute("href") && !$el.matches('[role="button"]') && !Constants.Exclusions.Links.some((s) => $el.matches(s))) {
              Found.Links.push($el);
              if (badLinkSelectors.length > 0 && badLinkSelectors.some((s) => $el.matches(s))) {
                Found.CustomErrorLinks.push($el);
              }
            }
            break;
          case "P":
            if (!Constants.Exclusions.Paragraphs.some((s) => $el.matches(s)))
              Found.Paragraphs.push($el);
            break;
          case "LI":
            Found.Lists.push($el);
            break;
          case "BLOCKQUOTE":
            Found.Blockquotes.push($el);
            break;
          case "TABLE":
            if (!$el.matches('[role="presentation"],[role="none"]')) Found.Tables.push($el);
            break;
          case "STRONG":
          case "EM":
            Found.StrongItalics.push($el);
            break;
          case "SUP":
          case "SUB":
            Found.Subscripts.push($el);
            break;
          case "BUTTON": {
            Found.Buttons.push($el);
            break;
          }
          case "INPUT":
          case "SELECT":
          case "TEXTAREA":
          case "METER":
          case "PROGRESS":
            Found.Inputs.push($el);
            break;
          case "LABEL":
            Found.Labels.push($el);
            break;
          case "IFRAME":
          case "AUDIO":
          case "VIDEO":
            Found.iframes.push($el);
            break;
          case "svg":
            Found.Svg.push($el);
            break;
        }
      }
      if ($el.hasAttribute("tabindex") && $el.tabIndex >= 0) Found.TabIndex.push($el);
      if ($el.matches(nestedSources)) Found.NestedComponents.push($el);
      if (!contrastExcludedTags.has(tag)) {
        if (!getCachedClosest($el, contrastAncestorSelector)) {
          if (!contrastAttrSelector || !$el.matches(contrastAttrSelector)) {
            Found.Contrast.push($el);
          }
        }
      }
      if ($el.hasAttribute("lang")) {
        Found.LangTags.push($el);
      }
    }
    const headingScope = State.option.ignoreContentOutsideRoots || State.option.fixedRoots ? "root" : "document";
    Found.Headings = find(
      'h1, h2, h3, h4, h5, h6, [role="heading"][aria-level]',
      headingScope,
      Constants.Exclusions.Headings
    );
    Found.HeadingOne = Found.Headings.filter(
      ($el) => $el.tagName === "H1" || $el.matches('[role="heading"]') && $el.getAttribute("aria-level") === "1"
    );
    Found.HeadingOverrideStart = /* @__PURE__ */ new WeakMap();
    Found.HeadingOverrideEnd = /* @__PURE__ */ new WeakMap();
    if (State.option.initialHeadingLevel) {
      State.option.initialHeadingLevel.forEach((section) => {
        const headingsInSection = find(
          `${section.selector} :is(h1,h2,h3,h4,h5,h6,[aria-role=heading][aria-level])`,
          headingScope,
          Constants.Exclusions.Headings
        );
        if (headingsInSection.length > 0) {
          Found.HeadingOverrideStart.set(headingsInSection[0], section.previousHeading);
          Found.HeadingOverrideEnd.set(headingsInSection.pop(), section.previousHeading);
        }
      });
    }
    Found.ExcludedHeadings = [];
    Found.ExcludedOutlineHeadings = [];
    for (const heading of Found.Headings) {
      if (Constants.Exclusions.Headings.some((ex) => heading.matches(ex)))
        Found.ExcludedHeadings.push(heading);
      if (Constants.Exclusions.Outline.some((ex) => heading.matches(ex)))
        Found.ExcludedOutlineHeadings.push(heading);
    }
    Found.OutlineIgnore = Found.ExcludedOutlineHeadings.concat(Found.ExcludedHeadings);
    Found.Videos = [];
    Found.Audio = [];
    Found.Visualizations = [];
    Found.EmbeddedContent = [];
    for (const $el of Found.iframes) {
      let matched = false;
      if ($el.matches(Constants.Global.VideoSources)) {
        Found.Videos.push($el);
        matched = true;
      }
      if ($el.matches(Constants.Global.AudioSources)) {
        Found.Audio.push($el);
        matched = true;
      }
      if ($el.matches(Constants.Global.VisualizationSources)) {
        Found.Visualizations.push($el);
        matched = true;
      }
      if (!matched) {
        Found.EmbeddedContent.push($el);
      }
    }
    Found.html = document.querySelector("html");
    Found.Language = Found.html.getAttribute("lang")?.trim();
    Found.Focusable = [
      ...Elements.Found.Links || [],
      ...Elements.Found.Buttons || [],
      ...Elements.Found.Inputs || [],
      ...Elements.Found.TabIndex || []
    ];
  }
  function initializeFilterElements() {
    buildContrastAttrSelector();
    Found.Everything = find("*", "root", Constants.Exclusions.Sa11yElements);
    Found.Images = [];
    Found.Links = [];
    Found.Contrast = [];
    for (let i = 0; i < Found.Everything.length; i++) {
      const $el = Found.Everything[i];
      const tag = $el.tagName;
      switch (tag) {
        case "IMG":
          if (!Constants.Exclusions.Images.some((s) => $el.matches(s))) Found.Images.push($el);
          break;
        case "A":
        case "a":
          if ($el.hasAttribute("href") && !$el.matches('[role="button"]') && !Constants.Exclusions.Links.some((s) => $el.matches(s))) {
            Found.Links.push($el);
          }
          break;
      }
      if (!contrastExcludedTags.has(tag)) {
        if (!getCachedClosest($el, contrastAncestorSelector)) {
          if (!contrastAttrSelector || !$el.matches(contrastAttrSelector)) {
            Found.Contrast.push($el);
          }
        }
      }
    }
    Found.Headings = find(
      'h1, h2, h3, h4, h5, h6, [role="heading"][aria-level]',
      "root",
      Constants.Exclusions.Headings
    );
    Found.ExcludedHeadings = [];
    Found.ExcludedOutlineHeadings = [];
    for (const heading of Found.Headings) {
      if (Constants.Exclusions.Headings.some((ex) => heading.matches(ex)))
        Found.ExcludedHeadings.push(heading);
      if (Constants.Exclusions.Outline.some((ex) => heading.matches(ex)))
        Found.ExcludedOutlineHeadings.push(heading);
    }
    Found.OutlineIgnore = Found.ExcludedOutlineHeadings.concat(Found.ExcludedHeadings);
  }
  const Annotations2 = {};
  function initializeAnnotations() {
    Annotations2.Array = find("sa11y-annotation", "document");
    Annotations2.Array.forEach((annotation, i) => {
      annotation.setAttribute("data-sa11y-position", i);
    });
  }
  return {
    initializeElements,
    initializeFilterElements,
    Found,
    initializeAnnotations,
    Annotations: Annotations2
  };
})();
const styles = ":host{z-index:999999;background:var(--sa11y-panel-bg);border-top:5px solid var(--sa11y-panel-bg-splitter);width:100%;height:fit-content;display:block;position:fixed;bottom:0;left:0;right:0}*{font-size:var(--sa11y-normal-text);color:var(--sa11y-panel-primary);font-family:var(--sa11y-font-face)!important;-webkit-font-smoothing:auto!important;line-height:22px!important}#dialog{max-width:900px;margin:20px auto;padding:20px}h2{font-size:var(--sa11y-large-text);margin-top:0}a{color:var(--sa11y-hyperlink);cursor:pointer;text-decoration:underline}a:hover,a:focus{text-decoration:none}p{margin-top:0}.error{color:var(--sa11y-error-text);background:var(--sa11y-error);border:2px dashed #f08080;max-height:300px;margin-bottom:0;padding:5px;overflow:scroll}";
const sharedStyles = '.visually-hidden{clip:rect(1px, 1px, 1px, 1px);white-space:nowrap;clip-path:inset(50%);border:0;width:1px;height:1px;padding:0;display:block;position:absolute;overflow:hidden}[hidden]{display:none!important}h2,.header-text-inline,.header-text{font-size:var(--sa11y-large-text);color:var(--sa11y-panel-primary);margin-bottom:3px;font-weight:600;display:block}.header-text-inline{display:inline-block!important}code{font-size:calc(var(--sa11y-normal-text) - 1px);font-weight:600;font-family:monospace!important}pre code{white-space:pre-wrap;overflow:auto}pre,code,kbd,.kbd{color:var(--sa11y-panel-primary);background-color:var(--sa11y-panel-badge);border-radius:3.2px;padding:1.6px 4.8px}.bold{font-weight:600}.error .colour,.red-text{font-family:var(--sa11y-font-face);color:var(--sa11y-red-text)}.warning .colour,.yellow-text{font-family:var(--sa11y-font-face);color:var(--sa11y-yellow-text)}.normal-badge,.badge{min-width:10px;color:var(--sa11y-panel-primary);text-align:center;white-space:nowrap;vertical-align:baseline;background-color:var(--sa11y-panel-badge);border-radius:10px;outline:1px solid #0000;padding:1px 5px 1.75px;font-size:14px;line-height:1;display:inline;font-weight:700!important}.error .badge{color:var(--sa11y-error-text);background:var(--sa11y-error)}.error-badge{color:var(--sa11y-error-text)!important;background:var(--sa11y-error)!important}.warning .badge{color:var(--sa11y-panel-bg);background:var(--sa11y-yellow-text)}.warning-badge{color:var(--sa11y-panel-bg)!important;background:var(--sa11y-yellow-text)!important}.good-contrast{color:var(--sa11y-good-text)!important;background:var(--sa11y-good)!important}#contrast-preview{overflow-wrap:break-word;border:2px dashed var(--sa11y-panel-bg-splitter);background-color:#e8e8e8;background-image:linear-gradient(45deg,#ccc 25%,#0000 25% 75%,#ccc 75%,#ccc),linear-gradient(45deg,#ccc 25%,#0000 25% 75%,#ccc 75%,#ccc);background-position:0 0,5px 5px;background-size:10px 10px;border-radius:3.2px;max-height:100px;margin-top:10px;padding:5px;line-height:1;overflow:clip}#contrast-preview:empty{display:none}#color-pickers{justify-content:space-between;margin-top:10px;margin-bottom:10px;display:flex}#color-pickers label{align-items:center;display:flex}#color-pickers input{cursor:pointer;margin-inline-start:7px}#fg-color-wrapper.unknown,#bg-color-wrapper.unknown{display:inline-block;position:relative}:is(#fg-color-wrapper.unknown,#bg-color-wrapper.unknown):after{z-index:2;color:#fff;pointer-events:none;content:"?";justify-content:center;align-items:center;width:44px;height:44px;margin:-46px 7px;font-size:22px;display:flex;position:absolute}input[type=color i]{background:var(--sa11y-panel-bg-secondary);border-color:var(--sa11y-button-outline);border-style:solid;border-width:1px;border-radius:50%;block-size:44px;inline-size:44px;padding:2px}input[type=color i]::-webkit-color-swatch-wrapper{padding:1px}input[type=color i]::-webkit-color-swatch{border-color:var(--sa11y-button-outline);border-radius:50%}input[type=color i]::-moz-color-swatch{border-color:var(--sa11y-button-outline);border-radius:50%}input[type=color i].unknown{box-shadow:0 0 0 3px var(--sa11y-yellow-text)}.close-btn{float:var(--sa11y-float-rtl);width:32px;height:32px;font-size:var(--sa11y-normal-text);color:var(--sa11y-panel-primary);cursor:pointer;background:var(--sa11y-panel-bg-secondary);border:2px solid var(--sa11y-button-outline);border-radius:50%;margin:0;font-weight:400;transition:all .2s ease-in-out;position:relative}.close-btn:hover,.close-btn:focus{background-color:var(--sa11y-shortcut-hover)}.close-btn:after{content:"";background:var(--sa11y-setting-switch-bg-off);-webkit-mask:var(--sa11y-close-btn-svg) center no-repeat;mask:var(--sa11y-close-btn-svg) center no-repeat;position:absolute;inset:-7px}@media screen and (forced-colors:active){.close-btn:after{filter:invert()}}#container [tabindex="0"]:focus,#container [tabindex="-1"]:focus,#container input:focus,#container select:focus,#container button:focus,#container a:focus{box-shadow:0 0 0 5px var(--sa11y-focus-color);outline:0}#container .switch:focus,#container #panel-controls button:focus{box-shadow:inset 0 0 0 4px var(--sa11y-focus-color);outline:0}#container [tabindex="0"]:focus:not(:focus-visible),#container [tabindex="-1"]:focus:not(:focus-visible),#container input:focus:not(:focus-visible),#container button:focus:not(:focus-visible),#container select:focus:not(:focus-visible),#container #panel-controls button:focus:not(:focus-visible){box-shadow:none;outline:0}#container a:focus-visible,#container button:not(#panel-controls button,.switch):focus-visible,#container select:focus-visible,#container input:focus-visible,#container [tabindex="0"]:focus-visible,#container [tabindex="-1"]:focus-visible{box-shadow:0 0 0 5px var(--sa11y-focus-color);outline:0}#container .switch:focus-visible,#container #panel-controls button:focus-visible{box-shadow:inset 0 0 0 4px var(--sa11y-focus-color);outline:0}@media screen and (forced-colors:active){#panel-controls button:focus{border:inset 3px solid transparent}.close-btn:focus{outline:3px solid #0000!important}#container a:focus,#container [tabindex="-1"]:focus,#container [tabindex="0"]:focus,#container select:focus,#container button:focus{outline:3px solid #0000!important}}';
class ConsoleErrors extends HTMLElement {
  constructor(error) {
    super();
    this.error = error;
  }
  connectedCallback() {
    const shadow = this.attachShadow({ mode: "open" });
    const style = document.createElement("style");
    style.textContent = styles + sharedStyles;
    shadow.appendChild(style);
    const content = document.createElement("div");
    content.setAttribute("id", "dialog");
    content.setAttribute("tabindex", "-1");
    const url2 = sanitizeURL(window.location.href);
    const template = `## Error description
\`\`\`javascript
${this.error.stack}
\`\`\`

## Configuration options
\`\`\`javascript
${JSON.stringify(State.option)}
\`\`\`

## Details
- **URL:** ${url2}
- **Version:** ${"5.0.0"}

## Comments
`;
    const closeBtn = document.createElement("button");
    closeBtn.className = "close-btn";
    closeBtn.setAttribute("aria-label", Lang._("ALERT_CLOSE"));
    const h2 = document.createElement("h2");
    h2.textContent = Lang._("ERROR");
    const p1 = document.createElement("p");
    p1.append(Lang.sprintf("CONSOLE_ERROR"));
    const p2 = document.createElement("p");
    p2.className = "error";
    p2.append(
      this.error.stack,
      document.createElement("br"),
      document.createElement("br"),
      `Version: ${"5.0.0"}`,
      document.createElement("br"),
      `URL: ${url2}`,
      document.createElement("br"),
      document.createElement("br"),
      `Config options: ${JSON.stringify(State.option)}`
    );
    content.append(closeBtn, h2, p1, p2);
    shadow.appendChild(content);
    setTimeout(() => {
      Constants.Panel.toggle.style.display = "none";
      const container = document.querySelector("sa11y-console-error");
      const dialog = container.shadowRoot.getElementById("dialog");
      dialog.focus();
      const close = container.shadowRoot.querySelector(".close-btn");
      close.addEventListener("click", () => {
        container.remove();
      });
      const encodedTemplate = encodeURIComponent(template);
      const github = container.shadowRoot.querySelector(
        'a[href="https://github.com/ryersondmp/sa11y/issues/new?title=Bug%20report"]'
      );
      const href = github.getAttribute("href");
      if (href) {
        const newHref = `${href}&body=${encodedTemplate}`;
        github.setAttribute("href", newHref);
      }
    }, 10);
  }
}
const isElementVisible = (element) => {
  return !!(element?.offsetWidth && element?.offsetHeight);
};
const closeAnyActiveTooltips = () => {
  const tooltip = document.querySelector("sa11y-tooltips").shadowRoot;
  const button = tooltip.querySelector("button");
  if (button !== null) {
    button.click();
  }
};
const getHiddenParent = ($el) => {
  const shadowHost = $el.getRootNode().host;
  const visibleParent = findVisibleParent(shadowHost, "display", "none");
  if (visibleParent !== null) {
    const hiddenParent = visibleParent.previousElementSibling;
    if (hiddenParent) {
      addPulse(hiddenParent);
    } else {
      addPulse(visibleParent.parentNode);
    }
  }
};
const getScrollPosition = ($el, results) => {
  if (isElementVisible($el) === false) {
    const annotationHost = $el.getRootNode().host;
    const visiblePosition = findVisibleParent(annotationHost, "display", "none");
    const annotationIndex = parseInt(annotationHost.getAttribute("data-sa11y-annotation"), 10);
    const issueObject = results.find((issue) => issue.id === annotationIndex);
    const elementPreview = generateElementPreview(issueObject);
    getHiddenParent($el);
    const result = State.results.find((item) => String(item.id) === String(annotationIndex));
    if (result.content instanceof Element) {
      result.content.setAttribute("lang", Lang._("LANG_CODE"));
      result.content.className = result.type;
      let h3 = result.content.querySelector(".issue-label");
      if (!h3) {
        h3 = document.createElement("h3");
        h3.className = "issue-label";
        result.content.prepend(h3);
      }
      h3.textContent = result.issueLabel;
    }
    createAlert(`${Lang._("NOT_VISIBLE")}`, result.finalContent, elementPreview);
    closeAnyActiveTooltips();
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
  const latestDismissed = store.getItem("sa11y-latest-dismissed");
  if (latestDismissed !== null) {
    index = parseInt(latestDismissed, 10) - 1;
  }
  store.removeItem("sa11y-latest-dismissed");
  const opened = find("[data-sa11y-opened]", "root");
  if (opened[0]) {
    index = parseInt(opened[0].getAttribute("data-sa11y-position"), 10);
  }
};
const goToNext = (results) => {
  determineIndex();
  const issues = Elements.Annotations.Array;
  if (index >= issues.length - 1) {
    index = -1;
  }
  const annotation = issues[index + 1];
  const button = annotation.shadowRoot.querySelector("button");
  const scrollPos = getScrollPosition(button, results);
  window.scrollTo({
    top: scrollPos,
    behavior: `${Constants.Global.scrollBehaviour}`
  });
  if (isElementVisible(button)) {
    button.focus();
    button.click();
  }
  index += 1;
};
const goToPrev = (results) => {
  determineIndex();
  const issues = Elements.Annotations.Array;
  if (index <= 0) {
    index = issues.length;
  }
  const button = Elements.Annotations.Array[index - 1].shadowRoot.querySelector("button");
  const scrollPos = getScrollPosition(button, results);
  window.scrollTo({
    top: scrollPos,
    behavior: `${Constants.Global.scrollBehaviour}`
  });
  if (isElementVisible(button)) {
    button.focus();
    button.click();
  }
  index -= 1;
  if (index === -1) {
    index = Elements.Annotations.Array.length - 1;
  }
};
function keyboardShortcut(e, results) {
  if (Elements.Annotations.Array.length && !Constants.Panel.skipButton.hasAttribute("disabled")) {
    if (e.altKey && (e.code === "KeyS" || e.code === "Period")) {
      e.preventDefault();
      goToNext(results);
    } else if (e.altKey && (e.code === "KeyW" || e.code === "Comma")) {
      e.preventDefault();
      goToPrev(results);
    }
  }
}
let keyboardShortcutHandler;
let handleSkipButtonHandler;
function skipToIssue() {
  keyboardShortcutHandler = (e) => {
    keyboardShortcut(e, State.results);
  };
  handleSkipButtonHandler = () => {
    goToNext(State.results);
  };
  document.addEventListener("keydown", keyboardShortcutHandler);
  Constants.Panel.skipButton.addEventListener("click", handleSkipButtonHandler);
}
function removeSkipBtnListeners() {
  document.removeEventListener("keydown", keyboardShortcutHandler);
  Constants.Panel.skipButton.removeEventListener("click", handleSkipButtonHandler);
}
const exportResultsStyles = `:root{--font-primary:system-ui, "Segoe UI", roboto, helvetica, arial, sans-serif;--font-secondary:consolas, monaco, "Ubuntu Mono", "Liberation Mono", "Courier New", courier, monospace;--body-text:#333;--bg-primary:#fff;--bg-secondary:#f6f8fa;--bg-tertiary:#d7d7d7;--link-primary:#004c9b;--red-text:#d30017;--warning-text:#966f0d;--hr:#d7d7d74d;--sa11y-link-icon-svg:url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 640 512'%3E%3Cpath d='M579.8 267.7c56.5-56.5 56.5-148 0-204.5c-50-50-128.8-56.5-186.3-15.4l-1.6 1.1c-14.4 10.3-17.7 30.3-7.4 44.6s30.3 17.7 44.6 7.4l1.6-1.1c32.1-22.9 76-19.3 103.8 8.6c31.5 31.5 31.5 82.5 0 114L422.3 334.8c-31.5 31.5-82.5 31.5-114 0c-27.9-27.9-31.5-71.8-8.6-103.8l1.1-1.6c10.3-14.4 6.9-34.4-7.4-44.6s-34.4-6.9-44.6 7.4l-1.1 1.6C206.5 251.2 213 330 263 380c56.5 56.5 148 56.5 204.5 0L579.8 267.7zM60.2 244.3c-56.5 56.5-56.5 148 0 204.5c50 50 128.8 56.5 186.3 15.4l1.6-1.1c14.4-10.3 17.7-30.3 7.4-44.6s-30.3-17.7-44.6-7.4l-1.6 1.1c-32.1 22.9-76 19.3-103.8-8.6C74 372 74 321 105.5 289.5L217.7 177.2c31.5-31.5 82.5-31.5 114 0c27.9 27.9 31.5 71.8 8.6 103.9l-1.1 1.6c-10.3 14.4-6.9 34.4 7.4 44.6s34.4 6.9 44.6-7.4l1.1-1.6C433.5 260.8 427 182 377 132c-56.5-56.5-148-56.5-204.5 0L60.2 244.3z'/%3E%3C/svg%3E")}@media (prefers-color-scheme:dark){:root{--body-text:#dde8ff;--bg-primary:#0a2051;--bg-secondary:#072c7c;--bg-tertiary:#0041c9;--link-primary:#64b2ff;--red-text:#ffa2a2;--warning-text:#ffdb59;--hr:#0041c94d}}*{margin:0;padding:0}article,aside,nav,ol,p,pre,section,ul{margin-bottom:1rem}body{max-width:70ch;font-family:var(--font-primary);color:var(--body-text);word-break:break-word;overflow-wrap:break-word;background:var(--bg-primary);margin:0 auto;padding:2rem;font-size:1rem;line-height:1.5;overflow-x:hidden}h1,h2,h3{color:var(--body-text);margin-bottom:8px;padding-top:.875rem;padding-bottom:2px;line-height:1}h1{font-size:2.25rem}h2{font-size:1.85rem}h3{font-size:1.55rem}a{color:var(--link-primary)}a:hover,a:focus{text-decoration:none}header,footer{background:var(--bg-secondary);padding:2rem calc(50vw - 50%)}header{border-bottom:1px solid var(--bg-tertiary);margin:-2rem calc(-50vw + 50%) 2rem}footer{text-align:center;border-top:1px solid var(--bg-tertiary);margin:3rem calc(-50vw + 50%) -2rem}header>:first-child{margin-top:0;padding-top:0}header>:last-child{margin-bottom:0}hr{background:var(--hr);opacity:1;border:none;height:1px;margin:10px 0;padding:0}code,samp,kbd,pre{font-family:var(--font-secondary);background:var(--bg-secondary);border:1px solid var(--bg-tertiary);border-radius:4px;padding:3px 6px;font-size:.9rem}pre{max-width:100%;padding:1rem 1.4rem;display:block;overflow:auto}pre code{font-size:inherit;color:inherit;background:inherit;border:0;margin:0;padding:0}code pre{font-size:inherit;color:inherit;background:inherit;border:0;margin:0;padding:0;display:inline}details{background:var(--bg-primary);border:2px solid var(--link-primary);border-radius:4px;padding:.6rem 1rem}summary{cursor:pointer;font-weight:700}details[open]{padding-bottom:.75rem}details[open] summary{margin-bottom:6px}details[open]>:last-child{margin-bottom:0}.two-columns{display:flex}.column{flex:1;margin-inline-end:20px}.count{max-width:220px}dl{padding-top:10px}.column dl{width:100%}dt{font-weight:700}dd{padding-bottom:10px}ul ul,ol ul,ul ol,ol ol{margin-bottom:0}ul li{margin-bottom:.5rem}ol,ul{padding-left:2rem}ol li:not(li li){margin-bottom:4rem}iframe,img{background:var(--bg-tertiary);border-radius:5px;max-width:50%;padding:5px;display:block}video,audio{border:0;display:block}.red-text{color:var(--red-text)}.visually-hidden{clip:rect(1px, 1px, 1px, 1px);white-space:nowrap;clip-path:inset(50%);border:0;width:1px;height:1px;padding:0;display:block;position:absolute;overflow:hidden}.badge{color:#fff;text-align:center;white-space:nowrap;vertical-align:baseline;border-radius:10px;outline:1px solid #0000;min-width:10px;padding:1px 5px 1.75px;font-size:14px;line-height:1;display:inline;font-weight:700!important}.error .colour{color:var(--red-text)}.error .badge{color:#fff;background:#d30017}.warning .colour{color:var(--warning-text)}.warning .badge{color:#fff;background:#966f0d}.link-icon{width:16px;height:16px;-webkit-mask:var(--sa11y-link-icon-svg) center no-repeat;mask:var(--sa11y-link-icon-svg) center no-repeat;background:#fff;margin-bottom:-3.5px;display:inline-block}li pre,li li pre,li li img,li li iframe,li li video,li li audio{margin-top:1rem}li li{margin-top:1rem;list-style:none}`;
function el(tagOrNode, props = {}, ...children) {
  const node = typeof tagOrNode === "string" ? document.createElement(tagOrNode) : tagOrNode;
  for (const [key, val] of Object.entries(props)) {
    if (key === "textContent") {
      node.textContent = val;
    } else if (key === "className") {
      node.className = val;
    } else {
      node.setAttribute(key, val);
    }
  }
  for (const child of children) {
    if (child == null) continue;
    if (typeof child === "string") {
      node.appendChild(document.createTextNode(child));
    } else {
      node.appendChild(child);
    }
  }
  return node;
}
function generateMetaData() {
  const today = /* @__PURE__ */ new Date();
  const day = String(today.getDate()).padStart(2, "0");
  const month = String(today.getMonth() + 1).padStart(2, "0");
  const year = today.getFullYear();
  const date = (/* @__PURE__ */ new Date()).toLocaleString();
  const numericDate = `${month}-${day}-${year}`;
  const title = document.querySelector("head title");
  const titleCheck = !title || title.textContent.trim().length === 0;
  const metaTitle = !titleCheck ? title.textContent : "";
  const pageURL = sanitizeURL(window.location.href);
  return { date, numericDate, titleCheck, metaTitle, pageURL };
}
function sanitizeCSVCell(value) {
  const strValue = String(value ?? "");
  const escaped = strValue.replaceAll('"', '""');
  if (/^[=+\-@\t\r]/.test(escaped)) {
    return `'${escaped}`;
  }
  return escaped;
}
async function generateList(issues, type) {
  if (!issues.length) return null;
  const typeLabels = {
    error: Lang._("ERRORS"),
    warning: Lang._("WARNINGS"),
    dismissed: Lang._("DISMISSED")
  };
  const fragment = document.createDocumentFragment();
  fragment.appendChild(el("h2", { textContent: typeLabels[type] }));
  const ol = el("ol", { className: type });
  for (const issue of issues) {
    const li = document.createElement("li");
    const msgContainer = document.createElement("div");
    const importedBody = document.importNode(issue.content, true);
    msgContainer.append(...importedBody.childNodes);
    li.appendChild(msgContainer);
    const ul = document.createElement("ul");
    if (issue.element) {
      if (["IMG"].includes(issue.element.tagName)) {
        const previewLi = document.createElement("li");
        const strong = el("strong", { textContent: `${Lang._("PREVIEW")}: ` });
        previewLi.appendChild(strong);
        const previewNode = await generateElementPreview(issue, true);
        const previewContainer = document.createElement("div");
        previewContainer.appendChild(previewNode);
        previewLi.appendChild(previewContainer);
        ul.appendChild(previewLi);
      }
      const elemLi = document.createElement("li");
      elemLi.appendChild(el("strong", { textContent: `${Lang._("ELEMENT")}: ` }));
      const elemPre = document.createElement("pre");
      elemPre.appendChild(el("code", { textContent: issue.htmlPath }));
      elemLi.appendChild(elemPre);
      ul.appendChild(elemLi);
    }
    if (issue.cssPath) {
      const pathLi = document.createElement("li");
      pathLi.appendChild(el("strong", { textContent: `${Lang._("PATH")}: ` }));
      const pathPre = document.createElement("pre");
      pathPre.appendChild(el("code", { textContent: issue.cssPath }));
      pathLi.appendChild(pathPre);
      ul.appendChild(pathLi);
    }
    li.appendChild(ul);
    ol.appendChild(li);
  }
  if (type === "dismissed") {
    const details = document.createElement("details");
    details.className = "warning";
    details.appendChild(
      el("summary", {}, Lang.sprintf("PANEL_DISMISS_BUTTON", State.counts.dismissed))
    );
    details.appendChild(ol);
    fragment.appendChild(details);
  } else {
    fragment.appendChild(ol);
  }
  return fragment;
}
async function generateHTMLTemplate() {
  const errors = State.results.filter((issue) => issue.type === "error");
  const warnings = State.results.filter((issue) => issue.type === "warning");
  const meta = generateMetaData();
  const doc = document.implementation.createHTMLDocument("");
  doc.documentElement.setAttribute("lang", Lang._("LANG_CODE"));
  el("meta", { charset: "UTF-8" });
  const existingMeta = doc.querySelector("meta[charset]");
  if (existingMeta) {
    existingMeta.setAttribute("charset", "UTF-8");
  } else {
    doc.head.insertBefore(el("meta", { charset: "UTF-8" }), doc.head.firstChild);
  }
  doc.head.appendChild(
    el("meta", { name: "viewport", content: "width=device-width, initial-scale=1.0" })
  );
  doc.title = `${Lang._("RESULTS")}: ${meta.metaTitle}`;
  const styleEl = doc.createElement("style");
  styleEl.textContent = exportResultsStyles;
  doc.head.appendChild(styleEl);
  const header = doc.createElement("header");
  header.appendChild(el("h1", { textContent: Lang._("RESULTS") }));
  const dl = el("dl", { className: "two-columns" });
  const leftCol = el("div", { className: "column" });
  if (!meta.titleCheck) {
    leftCol.appendChild(el("dt", { textContent: Lang._("PAGE_TITLE") }));
    leftCol.appendChild(el("dd", { textContent: meta.metaTitle }));
  }
  leftCol.appendChild(el("dt", { textContent: "URL" }));
  const urlAnchor = el("a", { href: meta.pageURL, textContent: meta.pageURL });
  leftCol.appendChild(el("dd", {}, urlAnchor));
  leftCol.appendChild(el("dt", { textContent: Lang._("DATE") }));
  leftCol.appendChild(el("dd", { textContent: meta.date }));
  dl.appendChild(leftCol);
  const rightCol = el("div", { className: "column count" });
  if (State.counts.error !== 0) {
    rightCol.appendChild(el("dt", { textContent: Lang._("ERRORS") }));
    rightCol.appendChild(el("dd", { textContent: String(State.counts.error) }));
  }
  if (State.counts.warning !== 0) {
    rightCol.appendChild(el("dt", { textContent: Lang._("WARNINGS") }));
    rightCol.appendChild(el("dd", { textContent: String(State.counts.warning) }));
  }
  if (State.counts.dismissed !== 0) {
    rightCol.appendChild(el("dt", { textContent: Lang._("DISMISSED") }));
    rightCol.appendChild(el("dd", { textContent: String(State.counts.dismissed) }));
  }
  dl.appendChild(rightCol);
  header.appendChild(dl);
  const main = doc.createElement("main");
  const listEntries = [
    [errors, "error"],
    [warnings, "warning"],
    [State.dismissedResults, "dismissed"]
  ];
  for (const [issues, type] of listEntries) {
    const fragment = await generateList(issues, type);
    if (fragment) main.appendChild(fragment);
  }
  const footer = document.createElement("footer");
  const generatedBy = Lang.sprintf("GENERATED");
  footer.appendChild(generatedBy);
  doc.body.appendChild(header);
  doc.body.appendChild(main);
  doc.body.appendChild(footer);
  return new XMLSerializer().serializeToString(doc);
}
async function downloadHTMLTemplate() {
  const htmlContent = await generateHTMLTemplate();
  const meta = generateMetaData();
  const blob = new Blob([htmlContent], { type: "text/html" });
  const link = document.createElement("a");
  const title = !meta.titleCheck ? `_${meta.metaTitle.trim().replace(/ /g, "")}` : "";
  link.href = window.URL.createObjectURL(blob);
  link.download = `Sa11y_${meta.numericDate + title}.html`;
  document.body.appendChild(link);
  link.click();
  setTimeout(() => {
    document.body.removeChild(link);
    window.URL.revokeObjectURL(link.href);
  }, 100);
}
function downloadCSVTemplate() {
  const meta = generateMetaData();
  const filteredObjects = State.results.filter((issue) => issue.type === "warning" || issue.type === "error").map((issue) => {
    const { type, content, htmlPath, cssPath } = issue;
    const clone = content.cloneNode(true);
    clone.querySelectorAll(".visually-hidden").forEach((n) => {
      n.remove();
    });
    clone.querySelectorAll("hr").forEach((hr) => {
      hr.replaceWith(" | ");
    });
    const encoded = clone.textContent.replaceAll('"', '""');
    const columns = {
      Title: `"${sanitizeCSVCell(meta.metaTitle)}"`,
      URL: `"${sanitizeCSVCell(meta.pageURL)}"`,
      Type: `"${sanitizeCSVCell(String(type))}"`,
      Issue: `"${sanitizeCSVCell(encoded)}"`,
      Element: `"${sanitizeCSVCell(htmlPath)}"`
    };
    if (cssPath) {
      columns.Path = `"${sanitizeCSVCell(cssPath)}"`;
    }
    return columns;
  });
  const headers = Object.keys(filteredObjects[0]);
  const csvContent = `${headers.join(",")}
${filteredObjects.map((obj) => headers.map((header) => obj[header] ?? '""').join(",")).join("\n")}`;
  const bom = new Uint8Array([239, 187, 191]);
  const blob = new Blob([bom, csvContent], { type: "text/csv;charset=utf-8;" });
  const url2 = window.URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url2;
  const fileNameTitle = !meta.titleCheck ? `_${meta.metaTitle.trim().replace(/ /g, "")}` : "";
  link.setAttribute("download", `Sa11y_${meta.numericDate + fileNameTitle}.csv`);
  document.body.appendChild(link);
  link.click();
  link.href = "";
  window.URL.revokeObjectURL(link.href);
}
let exportHTMLHandler;
let exportCSVHandler;
function exportResults() {
  if (!State.option.exportResultsPlugin) return;
  exportHTMLHandler = async () => {
    await downloadHTMLTemplate();
  };
  exportCSVHandler = () => {
    downloadCSVTemplate();
  };
  Constants.Panel.exportHTML.addEventListener("click", exportHTMLHandler);
  Constants.Panel.exportCSV.addEventListener("click", exportCSVHandler);
}
function removeExportListeners() {
  if (State.option.exportResultsPlugin) {
    Constants.Panel.exportHTML.removeEventListener("click", exportHTMLHandler);
    Constants.Panel.exportCSV.removeEventListener("click", exportCSVHandler);
  }
}
function addColourFilters() {
  if (State.option.colourFilterPlugin) {
    if (State.option.headless === false) {
      const svg = document.createElement("div");
      svg.id = "sa11y-colour-filters";
      svg.innerHTML = `
        <!-- DaltonLens SVG filters to simulate color vision deficiencies -->
        <svg id="sa11y-svg-filters" aria-hidden="true" xmlns="http://www.w3.org/2000/svg">
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
            <feColorMatrix type="matrix" in="SourceGraphic" values="
              0.950, 0.050, 0.000, 0, 0
              0.000, 0.433, 0.567, 0, 0
              0.000, 0.475, 0.525, 0, 0
              0.000, 0.000, 0.000, 1, 0
            "/>
          </filter>
          <filter id="sa11y-monochromacy">
            <feColorMatrix values="0.299,0.587,0.114,0,0,0.299,0.587,0.114,0,0,0.299,0.587,0.114,0,0,0,0,0,1,0"></feColorMatrix>
          </filter>
        </svg>`;
      document.body.appendChild(svg);
    }
  }
}
function resetColourFilters() {
  if (State.option.colourFilterPlugin) {
    document.body.removeAttribute("data-sa11y-filter");
    Constants.Panel.settingsContent.classList.remove("hide-settings-border");
    Constants.Panel.colourFilterSelect.value = 0;
    Constants.Panel.colourPanel.removeAttribute("data-colour");
    Constants.Panel.colourPanel.classList.remove("active");
    Constants.Panel.colourFilterSelect.classList.remove("active");
    Constants.Panel.content.hidden = false;
    Constants.Panel.controls.hidden = false;
  }
}
const annotationStyles = '.annotation{display:block;position:relative}.annotation-inline{text-align:end;display:inline-block;position:relative}button{cursor:pointer;border-radius:50%;width:36px;height:36px;padding:0;transition:all .2s ease-in-out;display:block;position:absolute;box-shadow:0 0 16px #0000004f}button:after{content:"";width:36px;height:36px;padding:7px;position:absolute;top:-7px;left:-7px}.error-btn{z-index:9999;background:50% 50% var(--sa11y-error-svg) no-repeat;background-color:var(--sa11y-error);border:1px solid var(--sa11y-error);background-size:22px}.error-btn:hover,.error-btn:focus{background-color:var(--sa11y-error-hover)}.good-btn{z-index:9977;background:50% 50% var(--sa11y-good) var(--sa11y-good-svg) no-repeat;background-color:var(--sa11y-good);border:1px solid var(--sa11y-good);background-size:20px}.good-btn:hover,.good-btn:focus{background-color:var(--sa11y-good-hover)}.warning-btn{z-index:9988;background:50% 50% var(--sa11y-warning) var(--sa11y-warning-svg) no-repeat;background-color:var(--sa11y-warning);border:1px solid var(--sa11y-warning);transform:scaleX(var(--sa11y-icon-direction));background-size:24px}.warning-btn:hover,.warning-btn:focus{background-color:var(--sa11y-warning-hover)}button:active,button:focus{box-shadow:0 0 0 5px var(--sa11y-focus-color);outline:0}@media screen and (forced-colors:active){button{forced-color-adjust:none;border:1px solid #0000!important;outline:3px solid #0000!important}}';
class Annotations extends HTMLElement {
  connectedCallback() {
    if (this.shadowRoot) return;
    const shadow = this.attachShadow({ mode: "open" });
    const style = document.createElement("style");
    style.textContent = annotationStyles + sharedStyles;
    shadow.appendChild(style);
  }
}
const annotationButtons = [];
function annotate(issue) {
  const {
    element,
    type,
    content,
    inline = false,
    position = "beforebegin",
    id,
    dismiss,
    margin,
    issueLabel
  } = issue;
  if (!type && !element) return;
  if (element) {
    if (type === "good") {
      if (!State.option.showGoodImageButton && element?.tagName === "IMG") {
        return;
      }
      if (!State.option.showGoodLinkButton && element?.tagName === "A") {
        return;
      }
    }
    const tagMap = {
      error: "data-sa11y-error",
      warning: "data-sa11y-warning",
      good: "data-sa11y-good"
    };
    if (tagMap[type]) {
      element.setAttribute(tagMap[type], "");
    }
    const annotation = document.createElement("sa11y-annotation");
    annotation.setAttribute("data-sa11y-annotation", id);
    if (State.option.unitTestMode) {
      annotation.setAttribute("data-content", `${issueLabel} ${content.textContent}`);
    }
    if (supportsAnchorPositioning()) {
      annotation.style.position = "absolute";
      annotation.style.positionAnchor = `--sa11y-anchor-${id}`;
      annotation.style.top = "anchor(top)";
      annotation.style.left = "anchor(left)";
      const existingNames = element.style.anchorName ? element.style.anchorName.split(",").map((name) => name.trim()) : [];
      const filteredNames = existingNames.filter((name) => !name.startsWith("--sa11y-anchor-"));
      filteredNames.push(`--sa11y-anchor-${id}`);
      element.style.anchorName = filteredNames.join(", ");
    }
    const buttonWrapper = document.createElement("div");
    buttonWrapper.classList.add(inline ? "annotation-inline" : "annotation");
    const button = document.createElement("button");
    button.type = "button";
    button.className = `${type}-btn`;
    button.setAttribute("aria-label", issueLabel);
    button.setAttribute("aria-haspopup", "dialog");
    button.style.margin = `${inline ? "-10px" : ""} ${margin}`;
    buttonWrapper.appendChild(button);
    annotationButtons.push(button);
    const insertBefore = State.option.insertAnnotationBefore ? `, ${State.option.insertAnnotationBefore}` : "";
    const location = getCachedClosest(element, "svg") || getCachedClosest(element, `a, button, [role="link"], [role="button"] ${insertBefore}`) || element;
    location.insertAdjacentElement(position, annotation);
    annotation.shadowRoot.appendChild(buttonWrapper);
    const ignoredElements = State.option.ignoreHiddenOverflow ? State.option.ignoreHiddenOverflow.split(",").flatMap((selector) => [...document.querySelectorAll(selector)]) : [];
    const parent = findVisibleParent(element, "overflow", "hidden");
    if (parent && !ignoredElements.includes(parent)) {
      parent.setAttribute("data-sa11y-overflow", "");
    }
  } else {
    const dismissBtn = State.option.dismissAnnotations && ["warning", "good"].includes(type) && dismiss ? Object.assign(document.createElement("button"), {
      type: "button",
      textContent: Lang._("DISMISS")
    }) : null;
    if (dismissBtn) dismissBtn.dataset.sa11yDismiss = id;
    const listItem = document.createElement("li");
    listItem.classList.add([type]);
    const heading = document.createElement("h3");
    heading.textContent = issueLabel;
    listItem.appendChild(heading);
    listItem.append(content, dismissBtn || "");
    if (State.option.unitTestMode) {
      const test = Lang.sprintf("<hr><strong>Test ID:</strong> <code>%(TEST)</code>", issue.test);
      listItem.append(test);
    }
    Constants.Panel.pageIssuesList.prepend(listItem);
    Constants.Panel.pageIssues.classList.add("active");
    Constants.Panel.panel.classList.add("has-page-issues");
  }
}
const SA98G = {
  mainTRC: 2.4,
  sRco: 0.2126729,
  sGco: 0.7151522,
  sBco: 0.072175,
  normBG: 0.56,
  normTXT: 0.57,
  revTXT: 0.62,
  revBG: 0.65,
  blkThrs: 0.022,
  blkClmp: 1.414,
  scaleBoW: 1.14,
  scaleWoB: 1.14,
  loBoWoffset: 0.027,
  loWoBoffset: 0.027,
  deltaYmin: 5e-4,
  loClip: 0.1
};
function APCAcontrast(txtY, bgY, places = -1) {
  const icp = [0, 1.1];
  if (isNaN(txtY) || isNaN(bgY) || Math.min(txtY, bgY) < icp[0] || Math.max(txtY, bgY) > icp[1]) {
    return 0;
  }
  let SAPC = 0;
  let outputContrast = 0;
  let polCat = "BoW";
  txtY = txtY > SA98G.blkThrs ? txtY : txtY + Math.pow(SA98G.blkThrs - txtY, SA98G.blkClmp);
  bgY = bgY > SA98G.blkThrs ? bgY : bgY + Math.pow(SA98G.blkThrs - bgY, SA98G.blkClmp);
  if (Math.abs(bgY - txtY) < SA98G.deltaYmin) {
    return 0;
  }
  if (bgY > txtY) {
    SAPC = (Math.pow(bgY, SA98G.normBG) - Math.pow(txtY, SA98G.normTXT)) * SA98G.scaleBoW;
    outputContrast = SAPC < SA98G.loClip ? 0 : SAPC - SA98G.loBoWoffset;
  } else {
    polCat = "WoB";
    SAPC = (Math.pow(bgY, SA98G.revBG) - Math.pow(txtY, SA98G.revTXT)) * SA98G.scaleWoB;
    outputContrast = SAPC > -0.1 ? 0 : SAPC + SA98G.loWoBoffset;
  }
  if (places < 0) {
    return outputContrast * 100;
  } else if (places == 0) {
    return Math.round(Math.abs(outputContrast) * 100) + "<sub>" + polCat + "</sub>";
  } else if (Number.isInteger(places)) {
    return (outputContrast * 100).toFixed(places);
  } else {
    return 0;
  }
}
function fontLookupAPCA(contrast, places = 2) {
  const fontMatrixAscend = [
    ["Lc", 100, 200, 300, 400, 500, 600, 700, 800, 900],
    [0, 999, 999, 999, 999, 999, 999, 999, 999, 999],
    [10, 999, 999, 999, 999, 999, 999, 999, 999, 999],
    [15, 777, 777, 777, 777, 777, 777, 777, 777, 777],
    [20, 777, 777, 777, 777, 777, 777, 777, 777, 777],
    [25, 777, 777, 777, 120, 120, 108, 96, 96, 96],
    [30, 777, 777, 120, 108, 108, 96, 72, 72, 72],
    [35, 777, 120, 108, 96, 72, 60, 48, 48, 48],
    [40, 120, 108, 96, 60, 48, 42, 32, 32, 32],
    [45, 108, 96, 72, 42, 32, 28, 24, 24, 24],
    [50, 96, 72, 60, 32, 28, 24, 21, 21, 21],
    [55, 80, 60, 48, 28, 24, 21, 18, 18, 18],
    [60, 72, 48, 42, 24, 21, 18, 16, 16, 18],
    [65, 68, 46, 32, 21.75, 19, 17, 15, 16, 18],
    [70, 64, 44, 28, 19.5, 18, 16, 14.5, 16, 18],
    [75, 60, 42, 24, 18, 16, 15, 14, 16, 18],
    [80, 56, 38.25, 23, 17.25, 15.81, 14.81, 14, 16, 18],
    [85, 52, 34.5, 22, 16.5, 15.625, 14.625, 14, 16, 18],
    [90, 48, 32, 21, 16, 15.5, 14.5, 14, 16, 18],
    [95, 45, 28, 19.5, 15.5, 15, 14, 13.5, 16, 18],
    [100, 42, 26.5, 18.5, 15, 14.5, 13.5, 13, 16, 18],
    [105, 39, 25, 18, 14.5, 14, 13, 12, 16, 18],
    [110, 36, 24, 18, 14, 13, 12, 11, 16, 18],
    [115, 34.5, 22.5, 17.25, 12.5, 11.875, 11.25, 10.625, 14.5, 16.5],
    [120, 33, 21, 16.5, 11, 10.75, 10.5, 10.25, 13, 15],
    [125, 32, 20, 16, 10, 10, 10, 10, 12, 14]
  ];
  const fontDeltaAscend = [
    ["∆Lc", 100, 200, 300, 400, 500, 600, 700, 800, 900],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [10, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [15, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [20, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [25, 0, 0, 0, 12, 12, 12, 24, 24, 24],
    [30, 0, 0, 12, 12, 36, 36, 24, 24, 24],
    [35, 0, 12, 12, 36, 24, 18, 16, 16, 16],
    [40, 12, 12, 24, 18, 16, 14, 8, 8, 8],
    [45, 12, 24, 12, 10, 4, 4, 3, 3, 3],
    [50, 16, 12, 12, 4, 4, 3, 3, 3, 3],
    [55, 8, 12, 6, 4, 3, 3, 2, 2, 0],
    [60, 4, 2, 10, 2.25, 2, 1, 1, 0, 0],
    [65, 4, 2, 4, 2.25, 1, 1, 0.5, 0, 0],
    [70, 4, 2, 4, 1.5, 2, 1, 0.5, 0, 0],
    [75, 4, 3.75, 1, 0.75, 0.188, 0.188, 0, 0, 0],
    [80, 4, 3.75, 1, 0.75, 0.188, 0.188, 0, 0, 0],
    [85, 4, 2.5, 1, 0.5, 0.125, 0.125, 0, 0, 0],
    [90, 3, 4, 1.5, 0.5, 0.5, 0.5, 0.5, 0, 0],
    [95, 3, 1.5, 1, 0.5, 0.5, 0.5, 0.5, 0, 0],
    [100, 3, 1.5, 0.5, 0.5, 0.5, 0.5, 1, 0, 0],
    [105, 3, 1, 0, 0.5, 1, 1, 1, 0, 0],
    [110, 1.5, 1.5, 0.75, 1.5, 1.125, 0.75, 0.375, 1.5, 1.5],
    [115, 1.5, 1.5, 0.75, 1.5, 1.125, 0.75, 0.375, 1.5, 1.5],
    [120, 1, 1, 0.5, 1, 0.75, 0.5, 0.25, 1, 1],
    [125, 0, 0, 0, 0, 0, 0, 0, 0, 0]
  ];
  const weightArray = [0, 100, 200, 300, 400, 500, 600, 700, 800, 900];
  const weightArrayLen = weightArray.length;
  let returnArray = [contrast.toFixed(places), 0, 0, 0, 0, 0, 0, 0, 0, 0];
  returnArray.length;
  let tempFont = 777;
  contrast = Math.abs(contrast);
  const factor = 0.2;
  const index2 = contrast == 0 ? 1 : contrast * factor | 0;
  let w = 0;
  let scoreAdj = (contrast - fontMatrixAscend[index2][w]) * factor;
  w++;
  for (; w < weightArrayLen; w++) {
    tempFont = fontMatrixAscend[index2][w];
    if (tempFont > 400) {
      returnArray[w] = tempFont;
    } else if (contrast < 14.5) {
      returnArray[w] = 999;
    } else if (contrast < 29.5) {
      returnArray[w] = 777;
    } else {
      tempFont > 24 ? returnArray[w] = Math.round(tempFont - fontDeltaAscend[index2][w] * scoreAdj) : returnArray[w] = tempFont - (2 * fontDeltaAscend[index2][w] * scoreAdj | 0) * 0.5;
    }
  }
  return returnArray;
}
function sRGBtoY(rgb = [0, 0, 0]) {
  function simpleExp(chan) {
    return Math.pow(chan / 255, SA98G.mainTRC);
  }
  return SA98G.sRco * simpleExp(rgb[0]) + SA98G.sGco * simpleExp(rgb[1]) + SA98G.sBco * simpleExp(rgb[2]);
}
function alphaBlend(rgbaFG = [0, 0, 0, 1], rgbBG = [0, 0, 0], round2 = true) {
  rgbaFG[3] = Math.max(Math.min(rgbaFG[3], 1), 0);
  let compBlend = 1 - rgbaFG[3];
  let rgbOut = [0, 0, 0, 1, true];
  for (let i = 0; i < 3; i++) {
    rgbOut[i] = rgbBG[i] * compBlend + rgbaFG[i] * rgbaFG[3];
    if (round2) rgbOut[i] = Math.min(Math.round(rgbOut[i]), 255);
  }
  return rgbOut;
}
const maxCacheSize = 500;
const colorCache = /* @__PURE__ */ new Map();
let sharedContext = null;
function getSharedContext(colorSpace = "srgb") {
  if (!sharedContext) {
    if (typeof OffscreenCanvas !== "undefined") {
      const canvas = new OffscreenCanvas(1, 1);
      sharedContext = canvas.getContext("2d", { colorSpace, willReadFrequently: true });
    } else {
      const canvas = document.createElement("canvas");
      canvas.width = 1;
      canvas.height = 1;
      sharedContext = canvas.getContext("2d", { willReadFrequently: true });
    }
  }
  return sharedContext;
}
function setCache$1(key, value) {
  if (colorCache.size >= maxCacheSize) {
    const firstKey = colorCache.keys().next().value;
    colorCache.delete(firstKey);
  }
  colorCache.set(key, value);
}
function convertToRGBA(color, opacity = 1) {
  const cacheKey = `${color}_${opacity}`;
  if (colorCache.has(cacheKey)) {
    return colorCache.get(cacheKey);
  }
  let r;
  let g;
  let b;
  let a = 1;
  if (color.startsWith("#")) {
    const hex = color.slice(1);
    const len = hex.length;
    if (len === 3) {
      r = parseInt(hex[0] + hex[0], 16);
      g = parseInt(hex[1] + hex[1], 16);
      b = parseInt(hex[2] + hex[2], 16);
    } else {
      r = parseInt(hex.substring(0, 2), 16);
      g = parseInt(hex.substring(2, 4), 16);
      b = parseInt(hex.substring(4, 6), 16);
    }
  } else if (color.startsWith("rgb")) {
    const values = color.match(/[\d.]+/g);
    if (values) {
      r = parseInt(values[0], 10);
      g = parseInt(values[1], 10);
      b = parseInt(values[2], 10);
      a = values[3] !== void 0 ? parseFloat(values[3]) : 1;
    }
  } else {
    const colorSpace = color.startsWith("color(display-p3") ? "display-p3" : "srgb";
    const ctx = getSharedContext(colorSpace);
    if (!ctx || color.startsWith("color(rec2020")) return "unsupported";
    ctx.fillStyle = color;
    ctx.fillRect(0, 0, 1, 1);
    const imageData = ctx.getImageData(0, 0, 1, 1);
    [r, g, b, a] = imageData.data;
    a = a / 255;
  }
  const finalAlpha = opacity < 1 ? Number((a * opacity).toFixed(2)) : a;
  const result = [r, g, b, finalAlpha];
  setCache$1(cacheKey, result);
  return result;
}
function memoize(fn, keyResolver) {
  const cache = /* @__PURE__ */ new Map();
  const memoized = (...args) => {
    const key = keyResolver ? keyResolver(...args) : JSON.stringify(args);
    if (cache.has(key)) {
      return cache.get(key);
    }
    const result = fn.apply(this, args);
    cache.set(key, result);
    return result;
  };
  memoized.clear = () => {
    cache.clear();
  };
  return memoized;
}
function resetContrastCaches() {
  clearBackgroundCache();
  if (getLuminance.clear) getLuminance.clear();
  if (getAPCAValue.clear) getAPCAValue.clear();
  if (calculateContrast.clear) calculateContrast.clear();
  if (suggestColorWCAG.clear) suggestColorWCAG.clear();
  if (suggestColorAPCA.clear) suggestColorAPCA.clear();
  if (extractColorFromString.clear) extractColorFromString.clear();
}
function normalizeFontWeight(weight) {
  const numericWeight = parseInt(weight, 10);
  if (!Number.isNaN(numericWeight)) {
    return numericWeight;
  }
  const weightMap = {
    lighter: 100,
    normal: 400,
    bold: 700,
    bolder: 900
  };
  return weightMap[weight] || 400;
}
let backgroundCache = /* @__PURE__ */ new WeakMap();
function getBackground($el, shadowDetection) {
  if (backgroundCache.has($el)) {
    return backgroundCache.get($el);
  }
  const getVisualParent = (node) => {
    if (!node) return null;
    if (shadowDetection) {
      if (node.assignedSlot) return node.assignedSlot;
      if (node instanceof ShadowRoot) return node.host;
    }
    return node.parentElement || node.parentNode;
  };
  let targetEl = $el;
  let finalBackground = [255, 255, 255];
  while (targetEl && (targetEl.nodeType === 1 || targetEl.nodeType === 11)) {
    if (targetEl instanceof ShadowRoot) {
      targetEl = targetEl.host;
      continue;
    }
    const styles2 = getCachedStyle(targetEl);
    const bgImage = styles2.backgroundImage;
    if (bgImage && bgImage !== "none") {
      finalBackground = { type: "image", value: bgImage };
      break;
    }
    const bgColor = convertToRGBA(styles2.backgroundColor);
    if (bgColor[3] !== 0 && bgColor !== "transparent") {
      if (bgColor[3] < 1) {
        let parentEl = getVisualParent(targetEl);
        let parentBgColor = "rgba(255, 255, 255, 1)";
        while (parentEl && (parentEl.nodeType === 1 || parentEl.nodeType === 11)) {
          if (parentEl instanceof ShadowRoot) {
            parentEl = parentEl.host;
            continue;
          }
          const parentStyles = getCachedStyle(parentEl);
          const currentParentBg = parentStyles.backgroundColor;
          if (currentParentBg !== "rgba(0, 0, 0, 0)" && currentParentBg !== "transparent") {
            parentBgColor = currentParentBg;
            break;
          }
          parentEl = getVisualParent(parentEl);
        }
        if (parentBgColor === "rgba(0, 0, 0, 0)" || parentBgColor === "transparent") {
          parentBgColor = "rgba(255, 255, 255, 1)";
        }
        const parentColor = convertToRGBA(parentBgColor);
        finalBackground = alphaBlend(bgColor, parentColor);
        break;
      }
      finalBackground = bgColor;
      break;
    }
    if (targetEl.tagName === "HTML") {
      finalBackground = [255, 255, 255];
      break;
    }
    targetEl = getVisualParent(targetEl);
  }
  backgroundCache.set($el, finalBackground);
  return finalBackground;
}
function clearBackgroundCache() {
  backgroundCache = /* @__PURE__ */ new WeakMap();
}
const getLuminance = memoize(
  function getLuminance2(color) {
    const rgb = color.slice(0, 3).map((x) => {
      const normalized = x / 255;
      return normalized <= 0.03928 ? normalized / 12.92 : ((normalized + 0.055) / 1.055) ** 2.4;
    });
    return 0.2126 * rgb[0] + 0.7152 * rgb[1] + 0.0722 * rgb[2];
  },
  (color) => color.join(",")
  // Key resolver: e.g., "255,255,255,1"
);
const getAPCAValue = memoize(
  function getAPCAValue2(color, bg) {
    const blendedColor = alphaBlend(color, bg).slice(0, 4);
    const foreground = sRGBtoY(blendedColor);
    const background = sRGBtoY(bg);
    const ratio = APCAcontrast(foreground, background);
    return { ratio, blendedColor };
  },
  (color, bg) => `${color.join(",")}|${bg.join(",")}`
);
function getWCAG2Ratio(l1, l2) {
  const lighter = Math.max(l1, l2);
  const darker = Math.min(l1, l2);
  return (lighter + 0.05) / (darker + 0.05);
}
function brighten(color, amount) {
  return color.map((value, index2) => {
    if (index2 < 3) {
      const newValue = Math.ceil(value + (255 - value) * amount);
      return newValue >= 255 ? 255 : newValue;
    }
    return value;
  });
}
function darken(color, amount) {
  return color.map((value, index2) => {
    if (index2 < 3) {
      const newValue = Math.floor(value * (1 - amount));
      return newValue <= 0 ? 0 : newValue;
    }
    return value;
  });
}
function getHex(color) {
  const [r, g, b] = color.map((value) => Math.min(255, Math.max(0, value)));
  const hexR = r.toString(16).padStart(2, "0");
  const hexG = g.toString(16).padStart(2, "0");
  const hexB = b.toString(16).padStart(2, "0");
  return `#${hexR}${hexG}${hexB}`;
}
function displayAPCAValue(value) {
  return Math.abs(Number(value.toFixed(1)));
}
function displayWCAGRatio(value) {
  const truncatedRatio = Math.trunc(value * 10) / 10;
  const formattedRatio = Number.isInteger(truncatedRatio) ? truncatedRatio.toFixed(0) : truncatedRatio;
  return `${formattedRatio}:1`;
}
function ratioToDisplay(value, contrastAlgorithm) {
  return contrastAlgorithm === "APCA" ? displayAPCAValue(value) : displayWCAGRatio(value);
}
const calculateContrast = memoize(
  function calculateContrast2(color, bg, contrastAlgorithm) {
    let ratio;
    const blendedColor = alphaBlend(color, bg).slice(0, 4);
    if (contrastAlgorithm === "APCA") {
      const foreground = sRGBtoY(blendedColor);
      const background = sRGBtoY(bg);
      ratio = APCAcontrast(foreground, background);
    } else {
      const foreground = getLuminance(blendedColor);
      const background = getLuminance(bg);
      ratio = getWCAG2Ratio(foreground, background);
    }
    return { ratio, blendedColor };
  },
  (color, bg, alg) => `${color.join(",")}|${bg.join(",")}|${alg}`
);
const suggestColorWCAG = memoize(
  function suggestColorWCAG2(color, background, isLargeText, contrastAlgorithm) {
    let minContrastRatio;
    if (contrastAlgorithm === "AAA") {
      minContrastRatio = isLargeText ? 4.5 : 7;
    } else {
      minContrastRatio = isLargeText ? 3 : 4.5;
    }
    const fgLuminance = getLuminance(color);
    const bgLuminance = getLuminance(background);
    const adjustMode = fgLuminance > bgLuminance ? getWCAG2Ratio(1, bgLuminance) > minContrastRatio : getWCAG2Ratio(0, bgLuminance) < minContrastRatio;
    const adjustColor = (foregroundColor, amount, mode) => mode ? brighten(foregroundColor, amount) : darken(foregroundColor, amount);
    let adjustedColor = color;
    let lastValidColor = adjustedColor;
    let contrastRatio = getWCAG2Ratio(fgLuminance, bgLuminance);
    let bestContrast = contrastRatio;
    let previousColor = color;
    let step = 0.16;
    const percentChange = 0.5;
    const precision = 0.01;
    let iterations = 0;
    const maxIterations = 100;
    while (step >= precision) {
      iterations += 1;
      if (iterations > maxIterations) {
        return { color: null };
      }
      adjustedColor = adjustColor(adjustedColor, step, adjustMode);
      const newLuminance = getLuminance(adjustedColor);
      contrastRatio = getWCAG2Ratio(newLuminance, bgLuminance);
      if (contrastRatio >= minContrastRatio) {
        lastValidColor = contrastRatio <= bestContrast ? adjustedColor : lastValidColor;
        bestContrast = contrastRatio;
        adjustedColor = previousColor;
        step *= percentChange;
      }
      previousColor = adjustedColor;
    }
    return { color: getHex(lastValidColor) };
  },
  (color, bg, isLargeText, alg) => `${color.join(",")}|${bg.join(",")}|${isLargeText}|${alg}`
);
const getOptimalAPCACombo = (background, fontWeight) => {
  const contrastWithDark = getAPCAValue(background, [0, 0, 0, 1]);
  const contrastWithLight = getAPCAValue(background, [255, 255, 255, 1]);
  const isDarkBetter = Math.abs(contrastWithDark.ratio) > Math.abs(contrastWithLight.ratio);
  const suggestedColor = isDarkBetter ? [0, 0, 0, 1] : [255, 255, 255, 1];
  const bestContrastRatio = isDarkBetter ? contrastWithDark.ratio : contrastWithLight.ratio;
  const newFontLookup = fontLookupAPCA(bestContrastRatio).slice(1);
  const size = Math.ceil(newFontLookup[Math.floor(fontWeight / 100) - 1]);
  return { suggestedColor, size };
};
const suggestColorAPCA = memoize(
  function suggestColorAPCA2(color, background, fontWeight, fontSize) {
    const graphicMinLc = 45;
    const isGraphic = fontWeight == null || fontSize == null;
    const bgLuminance = sRGBtoY(background);
    const adjustColor = (foregroundColor, amount) => bgLuminance <= 0.179 ? brighten(foregroundColor, amount) : darken(foregroundColor, amount);
    let adjustedColor = color;
    let contrast = getAPCAValue(adjustedColor, background);
    let { ratio } = contrast;
    let bestTextCombo = null;
    let bestContrast = ratio;
    let lastValidColor = null;
    let fontLookup;
    let fontWeightIndex;
    let minimumSizeRequired;
    const passesText = () => {
      fontLookup = fontLookupAPCA(ratio).slice(1);
      fontWeightIndex = Math.min(
        Math.max(Math.floor(fontWeight / 100) - 1, 0),
        fontLookup.length - 1
      );
      minimumSizeRequired = fontLookup[fontWeightIndex];
      return minimumSizeRequired <= fontSize && minimumSizeRequired !== 999 && minimumSizeRequired !== 777;
    };
    const passesGraphic = () => Math.abs(ratio) >= graphicMinLc;
    if (!isGraphic) {
      bestTextCombo = getOptimalAPCACombo(background, fontWeight);
      if (bestTextCombo.size > fontSize) {
        return {
          color: getHex(bestTextCombo.suggestedColor),
          size: bestTextCombo.size
        };
      }
      if (passesText()) {
        return { color: getHex(color), size: null };
      }
    } else if (passesGraphic()) {
      return { color: getHex(color), size: null };
    }
    let previousColor = color;
    let step = 0.16;
    const percentChange = 0.5;
    const precision = 0.01;
    let iterations = 0;
    const maxIterations = 50;
    while (step >= precision && iterations < maxIterations) {
      iterations += 1;
      adjustedColor = adjustColor(adjustedColor, step);
      contrast = getAPCAValue(adjustedColor, background);
      ratio = contrast.ratio;
      const passes = isGraphic ? passesGraphic() : passesText();
      if (passes) {
        if (Math.abs(ratio) <= Math.abs(bestContrast) || !lastValidColor) {
          lastValidColor = adjustedColor;
          bestContrast = ratio;
        }
        adjustedColor = previousColor;
        step *= percentChange;
      }
      previousColor = adjustedColor;
    }
    if (lastValidColor) {
      return { color: getHex(lastValidColor), size: null };
    }
    if (!isGraphic && bestTextCombo) {
      return {
        color: getHex(bestTextCombo.suggestedColor),
        size: bestTextCombo.size
      };
    }
    return { color: getHex(color), size: null };
  },
  (color, bg, weight, size) => `${color.join(",")}|${bg.join(",")}|${weight}|${size}`
);
function wcagAlgorithm($el, color, background, fontSize, fontWeight, opacity, contrastAlgorithm) {
  const { ratio, blendedColor } = calculateContrast(color, background);
  const isLargeText = fontSize >= 24 || fontSize >= 18.67 && fontWeight >= 700;
  const tagName = $el.tagName.toLowerCase();
  const isCloseIcon = /^[x×✕✖✗✘]$/i.test($el.textContent);
  const isCloseButton = (tagName === "button" || tagName === "a") && isCloseIcon;
  let hasLowContrast;
  if (isCloseButton) {
    hasLowContrast = ratio > 0 && ratio < 3;
  } else if (contrastAlgorithm === "AAA") {
    hasLowContrast = isLargeText ? ratio < 4.5 : ratio < 7;
  } else {
    const hasLowContrastNormalText = ratio > 0 && ratio < 4.5;
    hasLowContrast = isLargeText ? ratio < 3 : hasLowContrastNormalText;
  }
  if (hasLowContrast) {
    return {
      $el,
      ratio: displayWCAGRatio(ratio),
      color: blendedColor,
      background,
      fontSize,
      fontWeight,
      isLargeText,
      opacity,
      textUnderline: getCachedStyle($el).textDecorationLine
    };
  }
  return null;
}
function apcaAlgorithm($el, color, background, fontSize, fontWeight, opacity, contrastAlgorithm) {
  const { ratio, blendedColor } = calculateContrast(color, background, contrastAlgorithm);
  const fontLookup = fontLookupAPCA(ratio).slice(1);
  const fontWeightIndex = Math.floor(fontWeight / 100) - 1;
  const minFontSize = fontLookup[fontWeightIndex];
  if (fontSize < minFontSize) {
    return {
      $el,
      ratio: displayAPCAValue(ratio),
      color: blendedColor,
      background,
      fontWeight,
      fontSize,
      opacity,
      textUnderline: getCachedStyle($el).textDecorationLine
    };
  }
  return null;
}
function checkElementContrast($el, color, background, fontSize, fontWeight, opacity, contrastAlgorithm) {
  const algorithm = contrastAlgorithm === "APCA" ? apcaAlgorithm : wcagAlgorithm;
  return algorithm($el, color, background, fontSize, fontWeight, opacity, contrastAlgorithm);
}
const colorTokenPattern = /#(?:[\da-f]{3,4}|[\da-f]{6}|[\da-f]{8})\b|\b(?:rgb|hsl|lab|lch|oklab|oklch)a?\([^)]+\)|\b[a-z]+\b/gi;
const extractColorFromString = memoize(
  function extractColorFromString2(cssValue) {
    const tokens = cssValue.match(colorTokenPattern);
    if (!tokens) return [];
    const colors = [];
    for (const token of tokens) {
      if (/^[a-z]+$/i.test(token) && !CSS.supports("color", token)) continue;
      const color = convertToRGBA(token);
      if (color) colors.push(color);
    }
    return colors;
  },
  (cssValue) => cssValue
);
async function resetAll(restartPanel = true) {
  resetGetText();
  resetStyleCache();
  resetParentCache();
  resetContrastCaches();
  resetState();
  window.sa11yCheckComplete = null;
  if (State.option.headless) return;
  Constants.Global.html.removeAttribute("data-sa11y-active");
  remove(
    [
      "sa11y-annotation",
      "sa11y-heading-label",
      "sa11y-heading-anchor",
      "sa11y-image-anchor",
      "sa11y-tooltips"
    ],
    "document"
  );
  annotationButtons.length = 0;
  if (supportsAnchorPositioning()) {
    find("[style]", "document").forEach(($el) => {
      const anchor = $el;
      const anchors = (anchor.style.anchorName || "").split(",").map((s) => s.trim()).filter((s) => s && !s.startsWith("--sa11y-anchor"));
      if (anchors.length) {
        anchor.style.anchorName = anchors.join(", ");
      } else {
        anchor.style.removeProperty("anchor-name");
        if (!anchor.style.length) {
          anchor.removeAttribute("style");
        }
      }
    });
  }
  resetAttributes(
    [
      "data-sa11y-parent",
      "data-sa11y-error",
      "data-sa11y-warning",
      "data-sa11y-good",
      "data-sa11y-overflow",
      "data-sa11y-image",
      "data-sa11y-pulse-border",
      "data-sa11y-filter",
      "data-sa11y-has-shadow-root"
    ],
    "document"
  );
  Constants.Panel.outlineList.innerHTML = "";
  if (State.option.showImageOutline) {
    Constants.Panel.imagesList.innerHTML = "";
  }
  Constants.Panel.pageIssuesList.innerHTML = "";
  Constants.Panel.readabilityInfo.innerHTML = "";
  Constants.Panel.readabilityDetails.innerHTML = "";
  Constants.Panel.panel.classList.remove("has-page-issues");
  Constants.Panel.pageIssues.classList.remove("active");
  Constants.Panel.settingsContent.classList.remove("hide-settings-border");
  Constants.Panel.panel.querySelector("#readability-alert")?.remove();
  removeAlert();
  removeSkipBtnListeners();
  removeExportListeners();
  removeDismissListeners();
  resetColourFilters();
  while (Constants.Panel.status.firstChild) {
    Constants.Panel.status.removeChild(Constants.Panel.status.firstChild);
  }
  document.querySelectorAll("[data-sa11y-has-shadow-root]").forEach((el2) => {
    el2.shadowRoot.querySelectorAll("style.sa11y-css-utilities").forEach((style) => {
      style.remove();
    });
    el2.removeAttribute("data-sa11y-has-shadow-root");
  });
  if (restartPanel) {
    Constants.Panel.panel.classList.remove("active");
  }
}
function initializeDismissals() {
  State.dismissedIssues = JSON.parse(store.getItem("sa11y-dismissed-digest") || "[]");
  const currentPath = window.location.pathname;
  const isSoloDismissed = (issue, dismissed) => dismissed.key.includes(issue.dismissDigest) && dismissed.href === currentPath && (issue.type === "warning" || issue.type === "good");
  const dismissAll = (issue, dismissed) => typeof dismissed.dismissAll === "string" && issue.dismissAll === dismissed.dismissAll && dismissed.href === currentPath;
  const soloDismissed = State.results.filter(
    (issue) => State.dismissedIssues.some((dismissed) => isSoloDismissed(issue, dismissed))
  );
  const allDismissed = State.results.filter(
    (issue) => State.dismissedIssues.some((dismissed) => dismissAll(issue, dismissed))
  );
  const mergeDismissed = [...soloDismissed, ...allDismissed];
  State.dismissedResults = [
    ...new Map(mergeDismissed.map((issue) => [issue.dismiss, issue])).values()
  ];
  State.counts.dismissed = State.dismissedResults.length;
  State.results = State.results.filter(
    (issue) => !State.dismissedResults.some(
      (dismissed) => dismissed.dismiss === issue.dismiss && (issue.type === "warning" || issue.type === "good")
    )
  );
  if (State.counts.dismissed) {
    Constants.Panel.dismissButton.classList.add("active");
    Constants.Panel.dismissTooltip.appendChild(
      Lang.sprintf("PANEL_DISMISS_BUTTON", State.counts.dismissed)
    );
  } else {
    Constants.Panel.dismissButton.classList.remove("active");
  }
}
let restoreDismissedHandler;
let dismissHandler;
const dismissIssueButton = async (e) => {
  let savedDismissKeys = JSON.parse(store.getItem("sa11y-dismissed-digest"));
  const dismissButton = e.target;
  if (dismissButton.tagName === "BUTTON" && dismissButton.hasAttribute("data-sa11y-dismiss")) {
    const dismissItem = parseInt(dismissButton.getAttribute("data-sa11y-dismiss"), 10);
    const issue = State.results.find(($el) => $el.id === dismissItem);
    if (savedDismissKeys === null) {
      setTimeout(() => createAlert(Lang.sprintf("DISMISS_REMINDER")), 0);
      savedDismissKeys = [];
    }
    if (issue.dismissDigest) {
      const dismissAllSelected = dismissButton.hasAttribute("data-sa11y-dismiss-all") ? issue.dismissAll : "";
      const dismissalDetails = {
        key: issue.dismissDigest,
        href: window.location.pathname,
        ...dismissAllSelected ? { dismissAll: dismissAllSelected } : {}
      };
      const item = find(`[data-sa11y-annotation='${issue.id}']`, "root");
      const latestDismissed = item[0] ? item[0].getAttribute("data-sa11y-position") : 0;
      store.setItem("sa11y-latest-dismissed", latestDismissed);
      store.setItem("sa11y-dismiss-item", JSON.stringify(dismissalDetails));
      savedDismissKeys.push(dismissalDetails);
      store.setItem("sa11y-dismissed-digest", JSON.stringify(savedDismissKeys));
      store.removeItem("sa11y-dismiss-item");
      const tooltip = dismissButton ? getCachedClosest(dismissButton, "[data-tippy-root]") : null;
      if (tooltip) {
        setTimeout(() => {
          tooltip.remove();
        }, 0);
      }
      resetAll(false);
      await checkAll();
    }
  }
};
const restoreDismissButton = async () => {
  State.panelTooltips.dismissTooltip.hide();
  const filtered = State.dismissedIssues.filter((item) => item.href !== window.location.pathname);
  store.setItem("sa11y-dismissed-digest", JSON.stringify(filtered));
  Constants.Panel.dismissButton.classList.remove("active");
  resetAll(false);
  await checkAll();
};
function dismissButtons() {
  if (State.option.dismissAnnotations) {
    dismissHandler = (e) => dismissIssueButton(e);
    const tooltips = document.querySelector("sa11y-tooltips").shadowRoot;
    tooltips.addEventListener("click", dismissHandler);
    Constants.Panel.panel.addEventListener("click", dismissHandler);
  }
  restoreDismissedHandler = () => restoreDismissButton();
  Constants.Panel.dismissButton?.addEventListener("click", restoreDismissedHandler);
}
function removeDismissListeners() {
  Constants.Panel.panel?.removeEventListener("click", dismissHandler);
  Constants.Panel.dismissButton?.removeEventListener("click", restoreDismissedHandler);
}
const outlineTemplate = document.createElement("template");
outlineTemplate.innerHTML = `
  <li>
    <button type="button" tabindex="-1">
      <span class="badge"></span>
      <span class="outline-list-item"></span>
    </button>
  </li>
`;
function generatePageOutline() {
  const outlineHandler = () => {
    Constants.Panel.outlineList.textContent = "";
    const fragment = document.createDocumentFragment();
    const findDismissedHeadings = State.dismissedResults.map((e) => State.headingOutline.find((f) => e.dismiss === f.dismiss)).filter(Boolean);
    findDismissedHeadings.forEach(($el) => {
      $el.dismissedHeading = true;
    });
    if (State.option.showTitleInPageOutline && store.getItem("sa11y-developer") === "On") {
      const metaTitleElement = document.querySelector("head title");
      const li = document.createElement("li");
      if (!metaTitleElement || metaTitleElement.textContent.trim().length === 0) {
        li.innerHTML = `
          <div class="badge error-badge"><span aria-hidden="true"><span class="error-icon"></span></span> ${Lang._("TITLE")}</div>
          <div class="badge error-badge">${Lang._("MISSING")}</div>
        `;
      } else {
        const titleBadge = document.createElement("span");
        titleBadge.className = "badge";
        titleBadge.textContent = Lang._("TITLE");
        li.appendChild(titleBadge);
        li.appendChild(document.createTextNode(` ${getText(metaTitleElement)}`));
      }
      fragment.appendChild(li);
    }
    State.headingOutline.forEach((heading, i) => {
      const { element, headingLevel, text, type, dismissedHeading, isWithinRoot } = heading;
      const hidden = isElementVisuallyHiddenOrHidden(element);
      const visibleIcon = hidden ? `<span class="hidden-icon"></span><span class="visually-hidden">${Lang._("HIDDEN")}</span>` : "";
      const badgeH = State.option.showHinPageOutline === true || State.option.showHinPageOutline === 1 ? "H" : "";
      const clone = outlineTemplate.content.cloneNode(true);
      const li = clone.querySelector("li");
      const badge = clone.querySelector(".badge");
      const listItemText = clone.querySelector(".outline-list-item");
      li.className = `outline-${headingLevel}`;
      listItemText.textContent = text;
      if (type === "error" && isWithinRoot === true) {
        badge.className = "badge error-badge";
        badge.innerHTML = `<span aria-hidden="true">${visibleIcon}<span class="error-icon"></span></span><span class="visually-hidden">${Lang._("ERROR")}</span>${badgeH}${headingLevel}`;
        const strongText = document.createElement("strong");
        strongText.className = "outline-list-item red-text";
        strongText.textContent = text;
        listItemText.replaceWith(strongText);
      } else if (type === "warning" && !dismissedHeading && isWithinRoot === true) {
        badge.className = "badge warning-badge";
        badge.innerHTML = `<span aria-hidden="true">${visibleIcon} &#x3f;</span><span class="visually-hidden">${Lang._("WARNING")}</span> ${badgeH}${headingLevel}`;
        const strongText = document.createElement("strong");
        strongText.className = "outline-list-item yellow-text";
        strongText.textContent = text;
        listItemText.replaceWith(strongText);
      } else {
        badge.innerHTML = `${visibleIcon}${badgeH}${headingLevel}`;
      }
      fragment.appendChild(clone);
      const label = document.createElement("sa11y-heading-label");
      label.hidden = true;
      element?.insertAdjacentElement("beforeend", label);
      const anchor = document.createElement("sa11y-heading-anchor");
      anchor.id = `sa11y-h${i}`;
      if (hidden) {
        const parent = findVisibleParent(element, "display", "none");
        const target = parent?.previousElementSibling || parent?.parentNode;
        target?.insertAdjacentElement("beforebegin", anchor);
        target?.setAttribute("data-sa11y-parent", `h${i}`);
      } else {
        label?.insertAdjacentElement("beforebegin", anchor);
      }
      const content = document.createElement("span");
      content.classList.add("heading-label");
      content.textContent = `H${headingLevel}`;
      label.shadowRoot.appendChild(content);
      if (store.getItem("sa11y-outline") === "Opened") {
        label.hidden = false;
      }
    });
    if (State.headingOutline.length === 0) {
      const emptyLi = document.createElement("li");
      emptyLi.textContent = Lang._("PANEL_NO_HEADINGS");
      fragment.appendChild(emptyLi);
    }
    Constants.Panel.outlineList.appendChild(fragment);
    setTimeout(() => {
      const buttons = Constants.Panel.outlineList.querySelectorAll("button");
      buttons.forEach((button, i) => {
        button.addEventListener("click", () => {
          const heading = find(
            `#sa11y-h${i}, [data-sa11y-parent="h${i}"]`,
            "document",
            Constants.Exclusions.Container
          )[0];
          if (heading) {
            heading.scrollIntoView({
              behavior: `${Constants.Global.scrollBehaviour}`,
              block: "center"
            });
            addPulse(heading.parentNode || heading);
          }
          removeAlert();
          if (!heading || button.querySelector("span.hidden-icon")) {
            createAlert(Lang._("NOT_VISIBLE"));
          }
        });
      });
      initRovingTabindex(Constants.Panel.outlineList, buttons);
    }, 0);
    document.removeEventListener("sa11y-build-heading-outline", outlineHandler);
  };
  if (store.getItem("sa11y-outline") === "Opened") {
    outlineHandler();
  }
  document.addEventListener("sa11y-build-heading-outline", outlineHandler);
}
const wrapPseudoContent = (element, string) => {
  const getAltText = (content) => {
    if (content === "none") {
      return "";
    }
    const match = content.includes("url(") || content.includes("image-set(") ? content.match(/\/\s*"([^"]+)"/) : content.match(/"([^"]+)"/);
    return match ? match[1] : "";
  };
  const before = getAltText(getCachedStyle(element, ":before").getPropertyValue("content"));
  const after = getAltText(getCachedStyle(element, ":after").getPropertyValue("content"));
  return `${before}${string}${after}`;
};
const nextTreeBranch = (tree) => {
  for (let i = 0; i < 1e3; i++) {
    if (tree.nextSibling()) {
      return tree.previousNode();
    }
    if (!tree.parentNode()) {
      return false;
    }
  }
  return false;
};
const computeAriaLabel = (element, recursing = false) => {
  if (State.option.ignoreAriaOnElements && element.matches(State.option.ignoreAriaOnElements)) {
    return "noAria";
  }
  if (State.option.ignoreTextInElements && element.matches(State.option.ignoreTextInElements)) {
    return "";
  }
  const labelledBy = element.getAttribute("aria-labelledby");
  if (!recursing && labelledBy) {
    return labelledBy.split(/\s+/).filter((id) => id.trim()).map((id) => {
      const targetElement = document.querySelector(`#${CSS.escape(id)}`);
      return targetElement ? computeAccessibleName(targetElement, "", 1) : "";
    }).join(" ");
  }
  const { ariaLabel } = element;
  if (ariaLabel && ariaLabel.trim().length > 0) {
    return ariaLabel;
  }
  return "noAria";
};
const computeAccessibleName = (element, exclusions = [], recursing = 0) => {
  const ariaLabel = computeAriaLabel(element, recursing);
  if (ariaLabel !== "noAria") {
    return ariaLabel;
  }
  let computedText = "";
  const and = (word) => {
    computedText += ` ${word}`;
  };
  if (!element.children.length) {
    computedText = wrapPseudoContent(element, element.textContent);
    if (!computedText.trim() && element.hasAttribute("title")) {
      return element.getAttribute("title");
    }
    return computedText;
  }
  function createTreeWalker(root, showElement, showText) {
    const acceptNode = (node) => {
      if (node.nodeType === Node.ELEMENT_NODE) {
        return NodeFilter.FILTER_ACCEPT;
      }
      if (node.nodeType === Node.TEXT_NODE) {
        return NodeFilter.FILTER_ACCEPT;
      }
      return NodeFilter.FILTER_REJECT;
    };
    return document.createTreeWalker(root, NodeFilter.SHOW_ALL, { acceptNode });
  }
  const treeWalker = createTreeWalker(element);
  const alwaysExclude = ["noscript", "style", "script", "video", "audio"];
  const excludeSelector = [...exclusions, ...alwaysExclude].join(", ");
  const exclude = excludeSelector ? element.querySelectorAll(excludeSelector) : [];
  let addTitleIfNoName = false;
  let aText = false;
  let count = 0;
  let continueWalker = true;
  while (treeWalker.nextNode() && continueWalker) {
    count += 1;
    const node = treeWalker.currentNode;
    const excluded = Array.from(exclude).some((ex) => ex.contains(node));
    if (excluded) {
      continue;
    }
    if (node.shadowRoot) {
      const shadowChildren = node.shadowRoot.querySelectorAll("*");
      for (let i = 0; i < shadowChildren.length; i++) {
        const child = shadowChildren[i];
        if (!excludeSelector || !getCachedClosest(child, excludeSelector)) {
          and(computeAccessibleName(child, exclusions, recursing + 1));
        }
      }
    }
    if (node.nodeType === Node.TEXT_NODE) {
      if (node.parentNode.tagName !== "SLOT") {
        and(node.nodeValue);
      }
      continue;
    }
    if (addTitleIfNoName && !getCachedClosest(node, "a")) {
      if (aText === computedText) {
        and(addTitleIfNoName);
      }
      addTitleIfNoName = false;
      aText = false;
    }
    if (node.ariaHidden === "true" && !(recursing && count < 3)) {
      if (!nextTreeBranch(treeWalker)) {
        continueWalker = false;
      }
      continue;
    }
    const aria = computeAriaLabel(node, recursing);
    if (aria !== "noAria") {
      and(aria);
      if (!nextTreeBranch(treeWalker)) {
        continueWalker = false;
      }
      continue;
    }
    switch (node.tagName) {
      case "IMG": {
        const role = node.getAttribute("role");
        if (node.hasAttribute("alt") && role !== "presentation" && role !== "none") {
          and(node.getAttribute("alt"));
        }
        break;
      }
      case "SVG":
        if (node.role === "img" || node.role === "graphics-document") {
          and(computeAriaLabel(node));
        } else {
          const title = node.querySelector("title");
          if (title) {
            and(title.textContent);
          }
        }
        break;
      case "A":
        if (node.hasAttribute("title")) {
          addTitleIfNoName = node.getAttribute("title");
          aText = computedText;
        } else {
          addTitleIfNoName = false;
          aText = false;
        }
        and(wrapPseudoContent(node, ""));
        break;
      case "INPUT":
        and(wrapPseudoContent(treeWalker.currentNode, ""));
        if (treeWalker.currentNode.hasAttribute("title")) {
          addTitleIfNoName = treeWalker.currentNode.getAttribute("title");
        }
        break;
      case "SLOT": {
        const children = node.assignedNodes?.() || [];
        let slotText = "";
        children.forEach((child) => {
          if (child.nodeType === Node.ELEMENT_NODE) {
            slotText += computeAccessibleName(child);
          } else if (child.nodeType === Node.TEXT_NODE) {
            slotText += child.nodeValue;
          }
        });
        and(slotText);
        and(wrapPseudoContent(node, ""));
        break;
      }
      case "SPAN": {
        and(wrapPseudoContent(treeWalker.currentNode, ""));
        if (treeWalker.currentNode.hasAttribute("title")) {
          addTitleIfNoName = treeWalker.currentNode.getAttribute("title");
        }
        break;
      }
      default:
        and(wrapPseudoContent(node, ""));
        break;
    }
  }
  if (addTitleIfNoName && !aText) {
    and(addTitleIfNoName);
  }
  computedText = computedText.replace(/[\uE000-\uF8FF]/gu, "");
  if (!computedText.trim()) {
    computedText = wrapPseudoContent(element, "");
    if (!computedText.trim() && element.hasAttribute("title")) {
      return element.getAttribute("title");
    }
  }
  return computedText;
};
const imageOutlineTemplate = document.createElement("template");
imageOutlineTemplate.innerHTML = `
  <li>
    <button type="button" tabindex="-1">
      <img alt="" />
      <div class="alt">
        <span class="badges-container"></span>
        <span class="alt-text-container"></span>
      </div>
    </button>
  </li>
`;
const generateEditLinkElement = (image) => {
  const { src } = image.element;
  const urlExclusions = State.option.ignoreEditImageURL.some((ignore) => src.includes(ignore));
  const classExclusions = State.option.ignoreEditImageClass.some(
    (ignore) => image.element.classList.contains(ignore)
  );
  if (urlExclusions || classExclusions) {
    return null;
  }
  const relativePath = State.option.relativePathImageSRC || window.location.host;
  const fileExtension = src.split(relativePath)[1] || "";
  const imageID = State.option.relativePathImageID;
  let imageUniqueID;
  if (imageID.length && image.element.classList.length) {
    image.element.classList.forEach((className) => {
      if (className.startsWith(imageID)) {
        const [digit] = className.match(/\d+/) || [];
        imageUniqueID = digit;
      }
    });
  }
  const editURL = relativePath && imageID.length ? State.option.editImageURLofCMS + imageUniqueID : State.option.editImageURLofCMS + fileExtension;
  const isRelativeLink = (imageSrc) => imageSrc.includes(window.location.host) || imageSrc.startsWith(relativePath);
  if (imageID.length && imageUniqueID !== void 0 || !imageID) {
    if (isRelativeLink(src)) {
      const wrapper = document.createElement("div");
      wrapper.className = "edit-block";
      const anchor = document.createElement("a");
      anchor.href = editURL;
      anchor.tabIndex = -1;
      anchor.target = "_blank";
      anchor.rel = "noopener noreferrer";
      anchor.className = "edit";
      anchor.textContent = Lang._("EDIT");
      wrapper.appendChild(anchor);
      return wrapper;
    }
  }
  return null;
};
function generateImageOutline() {
  if (!State.option.showImageOutline) return;
  const imageOutlineHandler = () => {
    Constants.Panel.imagesList.textContent = "";
    const fragment = document.createDocumentFragment();
    let hasImages = false;
    State.imageResults.forEach((image, i) => {
      hasImages = true;
      const isDismissed = State.dismissedResults.some(
        (key) => key.dismissDigest === image.dismissDigest
      );
      if (isDismissed) {
        Object.assign(image, { dismissedImage: true });
      }
      const { element, type, developer, dismissedImage } = image;
      const ariaLabel = computeAriaLabel(element);
      const altText = ariaLabel === "noAria" ? element.getAttribute("alt") ?? "" : ariaLabel ?? "";
      const hidden = isElementVisuallyHiddenOrHidden(element);
      if (hidden) {
        const parent = findVisibleParent(element, "display", "none");
        const anchor = document.createElement("sa11y-image-anchor");
        anchor.setAttribute("data-sa11y-parent", `image${i}`);
        const target = parent?.previousElementSibling || parent?.parentNode;
        target?.insertAdjacentElement("beforebegin", anchor);
      } else {
        element.setAttribute("data-sa11y-image", i);
      }
      const dev = store.getItem("sa11y-developer");
      const devChecksOff = dev === "Off" || dev === null;
      const showDeveloperChecks = devChecksOff && (type === "error" || type === "warning") && developer === true;
      const source = getBestImageSource(element);
      let decorative = altText === "";
      if (!decorative && State.option.altPlaceholder.length) {
        const altPlaceholderPattern = generateRegexString(State.option.altPlaceholder, true);
        decorative = altText.match(altPlaceholderPattern)?.[0];
      }
      const clone = imageOutlineTemplate.content.cloneNode(true);
      const li = clone.querySelector("li");
      const img = clone.querySelector("img");
      const badgesContainer = clone.querySelector(".badges-container");
      const altTextContainer = clone.querySelector(".alt-text-container");
      img.src = source;
      let badgesHTML = "";
      if (hidden) {
        badgesHTML += `<div class="badge"><span class="hidden-icon"></span><span class="visually-hidden">${Lang._("HIDDEN")}</span></div> `;
      }
      const anchorSelector = State.option.imageWithinLightbox ? `a[href]:not(${State.option.imageWithinLightbox})` : "a[href]";
      if (getCachedClosest(element, anchorSelector)) {
        badgesHTML += `<div class="badge"><span class="link-icon"></span><span class="visually-hidden">${Lang._("LINKED")}</span></div> `;
      }
      if (type === "error" && !showDeveloperChecks) {
        li.className = "error";
        if (altText.length === 0) badgesHTML += `<div class="badge">${Lang._("MISSING")}</div> `;
        badgesHTML += `<div class="badge"><span class="error-icon"></span><span class="visually-hidden">${Lang._("ERROR")}</span> ${Lang._("ALT")}</div> `;
        if (!decorative) {
          const strong = document.createElement("strong");
          strong.className = "red-text";
          strong.textContent = altText;
          altTextContainer.replaceWith(strong);
        }
      } else if (type === "warning" && !dismissedImage && !showDeveloperChecks) {
        li.className = "warning";
        if (decorative) badgesHTML += `<div class="badge">${Lang._("DECORATIVE")}</div> `;
        badgesHTML += `<div class="badge"><span aria-hidden="true">&#63;</span> <span class="visually-hidden">${Lang._("WARNING")}</span> ${Lang._("ALT")}</div> `;
        if (!decorative) {
          const strong = document.createElement("strong");
          strong.className = "yellow-text";
          strong.textContent = altText;
          altTextContainer.replaceWith(strong);
        }
      } else {
        li.className = "good";
        if (decorative) badgesHTML += `<div class="badge">${Lang._("DECORATIVE")}</div> `;
        badgesHTML += `<div class="badge">${Lang._("ALT")}</div> `;
        if (!decorative) {
          altTextContainer.textContent = ` ${altText}`;
        }
      }
      badgesContainer.innerHTML = badgesHTML;
      if (State.option.editImageURLofCMS) {
        const editEl = generateEditLinkElement(image);
        if (editEl) li.appendChild(editEl);
      }
      fragment.appendChild(clone);
    });
    if (!hasImages) {
      const emptyLi = document.createElement("li");
      emptyLi.className = "no-images";
      emptyLi.textContent = Lang._("NO_IMAGES");
      fragment.appendChild(emptyLi);
    }
    Constants.Panel.imagesList.appendChild(fragment);
    setTimeout(() => {
      const buttons = Constants.Panel.imagesList.querySelectorAll("button");
      buttons.forEach(($el, i) => {
        $el.addEventListener("click", () => {
          const image = find(
            `[data-sa11y-image='${i}'], [data-sa11y-parent='image${i}']`,
            "document",
            Constants.Exclusions.Container
          )[0];
          if (image) {
            image.scrollIntoView({
              behavior: `${Constants.Global.scrollBehaviour}`,
              block: "center"
            });
            addPulse(image);
          }
          removeAlert();
          if (!image || $el.querySelector("span.hidden-icon")) {
            createAlert(Lang._("NOT_VISIBLE"));
          }
        });
      });
      const tabbable = Constants.Panel.imagesList.querySelectorAll("a, button");
      initRovingTabindex(Constants.Panel.imagesList, tabbable);
    }, 0);
    document.removeEventListener("sa11y-build-image-outline", imageOutlineHandler);
  };
  if (store.getItem("sa11y-images") === "Opened") {
    imageOutlineHandler();
  }
  document.addEventListener("sa11y-build-image-outline", imageOutlineHandler);
}
function updatePanel() {
  Constants.Panel.skipButton.disabled = false;
  Constants.Panel.panel.classList.add("active");
  Constants.Global.html.setAttribute("data-sa11y-active", "true");
  Constants.Panel.skipButton.classList.add("active");
  if (State.counts.error > 0 && State.counts.warning > 0) {
    Constants.Panel.content.setAttribute("class", "errors");
    Constants.Panel.status.innerHTML = `${Lang._("ERRORS")} <span class="panel-count">${State.counts.error}</span> ${Lang._("WARNINGS")} <span class="panel-count" id="warning-count">${State.counts.warning}</span>`;
  } else if (State.counts.error > 0) {
    Constants.Panel.content.setAttribute("class", "errors");
    Constants.Panel.status.innerHTML = `${Lang._("ERRORS")} <span class="panel-count">${State.counts.error}</span>`;
  } else if (State.counts.warning > 0) {
    Constants.Panel.content.setAttribute("class", "warnings");
    Constants.Panel.status.innerHTML = `${Lang._("WARNINGS")} <span class="panel-count" id="warning-count">${State.counts.warning}</span>`;
  } else if (State.counts.dismissed > 0) {
    Constants.Panel.status.innerHTML = `${Lang._("DISMISSED")} <span class="panel-count">${State.counts.dismissed}</span>`;
    Constants.Panel.skipButton.classList.remove("active");
  } else {
    Constants.Panel.content.setAttribute("class", "good");
    Constants.Panel.status.textContent = Lang._("NO_ERRORS_FOUND");
  }
  const annotations = document.querySelectorAll("sa11y-annotation");
  if (annotations.length === 0) {
    Constants.Panel.skipButton.disabled = true;
  }
}
function updateBadge() {
  const totalCount = State.counts.error + State.counts.warning;
  if (totalCount === 0) {
    Constants.Panel.notifCount.innerText = "";
    Constants.Panel.notifText.innerText = "";
    Constants.Panel.notifBadge.style.display = "none";
  } else if (State.counts.warning > 0 && State.counts.error === 0) {
    Constants.Panel.notifBadge.classList.add("notification-badge-warning");
    Constants.Panel.notifCount.innerText = `${State.counts.warning}`;
    Constants.Panel.notifText.innerText = `${Lang._("WARNINGS_FOUND")}`;
  } else {
    Constants.Panel.notifBadge.classList.remove("notification-badge-warning");
    Constants.Panel.notifCount.innerText = `${totalCount}`;
    Constants.Panel.notifText.innerText = Lang._("TOTAL_FOUND");
  }
  if (store.getItem("sa11y-panel") === "Opened" || totalCount === 0) {
    Constants.Panel.notifBadge.style.display = "none";
  } else {
    Constants.Panel.notifBadge.style.display = "flex";
  }
}
function updateCount() {
  State.results.forEach((_, i) => {
    const issue = State.results[i].type;
    if (issue === "error") {
      State.counts.error += 1;
    } else if (issue === "warning") {
      State.counts.warning += 1;
    }
  });
}
function disabled() {
  setTimeout(() => {
    if (store.getItem("sa11y-panel") === "Opened") {
      Constants.Panel.toggle?.click();
    }
    Constants.Panel.toggle.disabled = true;
  }, State.option.delayCheck + 10);
}
function enabled() {
  if (Constants.Panel.toggle) {
    Constants.Panel.toggle.disabled = false;
  }
}
const tooltipStyles = 'h1,h2,div,p,span,ol,ul,li,a,button,svg,strong,kbd,code{all:unset;box-sizing:border-box!important}div{display:block}:before,:after{all:unset}[data-animation=fade][data-state=hidden]{opacity:0}.sa11y-theme{max-width:375px}@media (forced-colors:active){[role=dialog],[role=tooltip]{border:2px solid #0000;border-radius:5px}}.arrow{background:inherit;visibility:hidden;width:8px;height:8px;position:absolute}.arrow:before{content:"";background:inherit;visibility:visible;width:8px;height:8px;position:absolute;transform:rotate(45deg)}[data-placement^=top]>.arrow{bottom:-4px}[data-placement^=bottom]>.arrow{top:-4px}[data-placement^=left]>.arrow{right:-4px}[data-placement^=right]>.arrow{left:-4px}.content{z-index:1;padding:5px 9px;position:relative}[role=tooltip]{box-sizing:border-box!important}[role=tooltip][data-animation=fade][data-state=hidden]{opacity:0}[role=tooltip][data-inertia][data-state=visible]{transition-timing-function:cubic-bezier(.54,1.5,.38,1.11)}[role=dialog]{text-align:start;word-wrap:break-word;min-width:300px}[role=tooltip]{text-align:center;min-width:185px;max-width:250px}.sa11y-panel{border:1px solid var(--sa11y-panel-bg-splitter);box-shadow:var(--sa11y-box-shadow)}.sa11y-theme:not(.sa11y-panel){box-shadow:0 0 20px 4px #9aa1b126,0 4px 80px -8px #24282f40,0 4px 4px -2px #5b5e6926!important}.sa11y-theme{font-family:var(--sa11y-font-face);font-size:var(--sa11y-normal-text);color:var(--sa11y-panel-primary);letter-spacing:normal;background-color:var(--sa11y-panel-bg);-webkit-font-smoothing:auto;border-radius:4px;outline:0;padding:8px;font-weight:400;line-height:22px;transition-property:transform,visibility,opacity;display:block;position:relative}.sa11y-theme pre code{white-space:pre-wrap;display:block;overflow:auto}.sa11y-theme code{font-family:monospace;font-size:calc(var(--sa11y-normal-text) - 1px);font-weight:500}.sa11y-theme pre,.sa11y-theme code,.sa11y-theme kbd{color:var(--sa11y-panel-primary);letter-spacing:normal;background-color:var(--sa11y-panel-badge);-webkit-font-smoothing:auto;border-radius:3.2px;padding:1.6px 4.8px;line-height:22px}.sa11y-theme sub,.sa11y-theme sup{font-size:var(--sa11y-small-text)}.sa11y-theme ul{margin:0;margin-block:0;padding:0;position:relative}.sa11y-theme li{margin:5px 10px 0 20px;padding-bottom:5px;display:list-item}.sa11y-theme a{color:var(--sa11y-hyperlink);cursor:pointer;font-weight:500;text-decoration:underline}.sa11y-theme a:hover,.sa11y-theme a:focus{text-decoration:none}.sa11y-theme .good .colour{font-weight:400}.sa11y-theme strong{font-weight:600}.sa11y-theme hr{background:var(--sa11y-panel-bg-splitter);opacity:1;border:none;height:1px;margin:10px 0;padding:0}.sa11y-theme button.close-btn{margin-inline-start:10px;margin-bottom:10px}.sa11y-theme button#suggest-size,.sa11y-theme button#suggest{cursor:pointer;padding:.2rem;transition:background-color .2s,color .2s;position:relative}:is(.sa11y-theme button#suggest-size,.sa11y-theme button#suggest):after{content:"";position:absolute;inset:-10px -5px -14px}:is(.sa11y-theme button#suggest-size,.sa11y-theme button#suggest):hover,:is(.sa11y-theme button#suggest-size,.sa11y-theme button#suggest):focus-visible{color:#000!important;background-color:#fff!important}.sa11y-theme .dismiss-group{margin-top:5px}.sa11y-theme .dismiss-group button{margin:10px 5px 5px 0;color:var(--sa11y-panel-primary);cursor:pointer;background:var(--sa11y-panel-bg-secondary);border:2px solid var(--sa11y-button-outline);border-radius:5px;margin-inline-end:15px;padding:4px 8px;display:inline-block}.sa11y-theme .dismiss-group button:hover,.sa11y-theme .dismiss-group button:focus{background:var(--sa11y-shortcut-hover)}.sa11y-theme .good-icon{background:var(--sa11y-good-text);width:14px;height:14px;-webkit-mask:var(--sa11y-good-svg) center no-repeat;mask:var(--sa11y-good-svg) center no-repeat;margin-bottom:-2.5px;display:inline-block}.sa11y-theme .link-icon{background:var(--sa11y-panel-primary);width:16px;height:16px;-webkit-mask:var(--sa11y-link-icon-svg) center no-repeat;mask:var(--sa11y-link-icon-svg) center no-repeat;margin-bottom:-3.5px;display:inline-block}.sa11y-theme .error .badge{color:var(--sa11y-error-text);background:var(--sa11y-error)}.sa11y-theme .error .colour{color:var(--sa11y-red-text)}.sa11y-theme .error .link-icon{background:var(--sa11y-error-text)}.sa11y-theme .warning .badge{color:var(--sa11y-panel-bg);background:var(--sa11y-yellow-text)}.sa11y-theme .warning .colour{color:var(--sa11y-yellow-text)}.sa11y-theme .warning .link-icon{background:var(--sa11y-panel-bg)}.sa11y-theme[data-placement^=top] .arrow:before{border-top-color:var(--sa11y-panel-bg)}.sa11y-theme[data-placement^=bottom] .arrow:before{border-bottom-color:var(--sa11y-panel-bg)}.sa11y-theme[data-placement^=left] .arrow:before{border-left-color:var(--sa11y-panel-bg)}.sa11y-theme[data-placement^=right] .arrow:before{border-right-color:var(--sa11y-panel-bg)}@media (forced-colors:active){.sa11y-theme[data-placement^=top] .arrow:before,.sa11y-theme[data-placement^=bottom] .arrow:before,.sa11y-theme[data-placement^=left] .arrow:before,.sa11y-theme[data-placement^=right] .arrow:before{forced-color-adjust:none}.sa11y-theme .arrow{z-index:-1}}.sa11y-theme a:focus,.sa11y-theme input:focus,.sa11y-theme button:focus,.sa11y-theme button:active,.sa11y-theme [tabindex="-1"]:focus{box-shadow:0 0 0 5px var(--sa11y-focus-color);outline:0}.sa11y-theme input:focus:not(:focus-visible),.sa11y-theme a:focus:not(:focus-visible),.sa11y-theme button:focus:not(:focus-visible),.sa11y-theme [tabindex="-1"]:focus:not(:focus-visible){box-shadow:none;outline:0}.sa11y-theme a:focus-visible,.sa11y-theme button:focus-visible,.sa11y-theme input:focus-visible,.sa11y-theme [tabindex="-1"]:focus-visible{box-shadow:0 0 0 5px var(--sa11y-focus-color);outline:0}@media screen and (forced-colors:active){.sa11y-theme .error-icon,.sa11y-theme .link-icon,.sa11y-theme .hidden-icon{filter:invert()}.sa11y-theme a:focus,.sa11y-theme button:focus,.sa11y-theme [tabindex="-1"]:focus{outline:3px solid #0000!important}}.sa11y-theme{animation:.15s ease-out forwards fade-in}@keyframes fade-in{0%{opacity:0}to{opacity:1;transform:translateY(0)}}';
function generateContrastTools(contrastDetails) {
  const { previewText, color, background, fontWeight, fontSize, ratio, textUnderline } = contrastDetails;
  const hasBackgroundColor = background && background.type !== "image";
  const backgroundHex = hasBackgroundColor ? getHex(background) : "#000000";
  const foregroundHex = color ? getHex(color) : "#000000";
  const hasFontWeight = fontWeight ? `font-weight:${fontWeight};` : "";
  const hasFontSize = fontSize ? `font-size:${fontSize}px;` : "";
  const textDecoration = textUnderline ? `text-decoration:${textUnderline};` : "";
  const unknownFG = color ? "" : 'class="unknown"';
  const unknownBG = background && background.type !== "image" ? "" : 'class="unknown"';
  const unknownFGText = color ? "" : `<span id="fg-input-unknown" class="visually-hidden">(${Lang._("UNKNOWN")})</span>`;
  const unknownBGText = background ? "" : `<span id="bg-input-unknown" class="visually-hidden">(${Lang._("UNKNOWN")})</span>`;
  let displayedRatio;
  if (Constants.Global.contrastAlgorithm === "APCA") {
    displayedRatio = Math.abs(ratio) === 0 ? 0 : Math.abs(ratio) || Lang._("UNKNOWN");
  } else {
    displayedRatio = ratio || Lang._("UNKNOWN");
  }
  const contrastTools = document.createElement("div");
  contrastTools.id = "contrast-tools";
  contrastTools.innerHTML = `
      <hr aria-hidden="true">
      <div id="contrast" class="badge">${Lang._("CONTRAST")}</div>
      <div id="value" class="badge">${displayedRatio}</div>
      <div id="good" class="badge good-contrast" hidden>${Lang._("GOOD")} <span class="good-icon"></span></div>
      <div id="contrast-preview" style="color:${foregroundHex};${hasBackgroundColor ? `background:${backgroundHex};` : ""}${hasFontWeight + hasFontSize + textDecoration}"></div>
      <div id="color-pickers">
        <label for="fg-text">${Lang._("FG")} ${unknownFGText}
          <div id="fg-color-wrapper" ${unknownFG}>
            <input type="color" id="fg-input" value="${foregroundHex}" ${unknownFG}/>
          </div>
        </label>
        <label for="bg">${Lang._("BG")} ${unknownBGText}
          <div id="bg-color-wrapper" ${unknownBG}>
            <input type="color" id="bg-input" value="${backgroundHex}" ${unknownBG}/>
          </div>
        </label>
      </div>`;
  contrastTools.querySelector("#contrast-preview").textContent = previewText;
  return contrastTools;
}
function initializeContrastTools(container, contrastDetails) {
  const contrastTools = container?.querySelector("#contrast-tools");
  if (!contrastTools) return;
  const { fontSize: initialFontSize, fontWeight, type, isLargeText } = contrastDetails;
  const contrast = container.querySelector("#contrast");
  const contrastPreview = container.querySelector("#contrast-preview");
  const fgInput = container.querySelector("#fg-input");
  const bgInput = container.querySelector("#bg-input");
  const ratio = container.querySelector("#value");
  const good = container.querySelector("#good");
  const toggleBadges = (elements, condition) => {
    elements.forEach(($el) => {
      $el.classList.toggle("good-contrast", condition);
      $el.classList.toggle("error-badge", !condition);
    });
  };
  const getPreviewFontSize = () => {
    if (contrastPreview.style.fontSize) {
      const match = contrastPreview.style.fontSize.match(/([\d.]+)/);
      if (match) return parseFloat(match[1]);
    }
    const computed = getCachedStyle(contrastPreview).fontSize;
    if (computed) {
      const match = computed.match(/([\d.]+)/);
      if (match) return parseFloat(match[1]);
    }
    return initialFontSize;
  };
  const updatePreview = (e) => {
    const fgColor = fgInput.value;
    const bgColor = bgInput.value;
    const currentFontSize = getPreviewFontSize();
    setTimeout(() => {
      const unknownFG = fgInput.classList.contains("unknown");
      const unknownBG = bgInput.classList.contains("unknown");
      contrastPreview.style.color = unknownFG ? "" : fgColor;
      contrastPreview.style.backgroundColor = unknownBG ? "" : bgColor;
      contrastPreview.style.backgroundImage = unknownBG ? "" : "none";
    }, 0);
    if (e?.target) {
      e.target.classList.remove("unknown");
      e.target.parentElement.classList.remove("unknown");
      container.querySelector(`#${e.target.id}-unknown`)?.remove();
    }
    if (fgInput.classList.contains("unknown") || bgInput.classList.contains("unknown")) return;
    const algorithm = Constants.Global.contrastAlgorithm;
    const contrastValue = calculateContrast(
      convertToRGBA(fgColor),
      convertToRGBA(bgColor),
      Constants.Global.contrastAlgorithm
    );
    const elementsToToggle = [ratio, contrast];
    if (algorithm === "APCA") {
      const value = contrastValue.ratio;
      ratio.textContent = displayAPCAValue(value);
      const fontArray = fontLookupAPCA(value).slice(1);
      const nonTextPasses = value >= 45 && fontArray[0] >= 0 && fontArray[0] <= 777;
      let passes;
      switch (type) {
        case "svg-error":
        case "svg-warning": {
          good.hidden = !nonTextPasses;
          passes = nonTextPasses;
          toggleBadges(elementsToToggle, passes);
          break;
        }
        default: {
          const minFontSize = fontArray[Math.floor(fontWeight / 100) - 1];
          passes = currentFontSize >= minFontSize;
          toggleBadges(elementsToToggle, passes);
          good.hidden = !passes;
          break;
        }
      }
    } else {
      const value = contrastValue.ratio;
      ratio.textContent = displayWCAGRatio(value);
      const useAAA = algorithm === "AAA";
      const nonTextThreshold = 3;
      const normalTextThreshold = useAAA ? 7 : 4.5;
      const largeTextThreshold = useAAA ? 4.5 : 3;
      const passesNonText = value >= nonTextThreshold;
      const dynamicIsLargeText = currentFontSize >= 24 || currentFontSize >= 18.66 && fontWeight >= 700 || isLargeText;
      const passesNormalText = value >= normalTextThreshold;
      const passesLargeText = value >= largeTextThreshold;
      switch (type) {
        case "svg-error":
        case "svg-text":
        case "svg-warning": {
          good.hidden = !passesNonText;
          toggleBadges(elementsToToggle, passesNonText);
          break;
        }
        default: {
          if (dynamicIsLargeText) {
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
  fgInput.addEventListener("input", updatePreview);
  bgInput.addEventListener("input", updatePreview);
  setTimeout(() => {
    const bindSuggest = (id, action) => {
      const el2 = container.querySelector(id);
      if (!el2) return;
      el2.addEventListener("click", () => {
        action(el2.textContent);
        updatePreview();
        navigator.clipboard.writeText(el2.textContent).catch(() => {
        });
      });
    };
    bindSuggest("#suggest", (val) => {
      fgInput.value = val;
    });
    bindSuggest("#suggest-size", (val) => {
      contrastPreview.style.fontSize = val;
    });
  }, 0);
}
function generateColorSuggestion(contrastDetails) {
  const { color, background, fontWeight, fontSize, isLargeText, type, opacity } = contrastDetails;
  if (!color || !background || background.type === "image" || !(type === "text" || type === "svg-error" || type === "input" || type === "placeholder")) {
    return;
  }
  const suggested = Constants.Global.contrastAlgorithm === "APCA" ? suggestColorAPCA(color, background, fontWeight, fontSize) : suggestColorWCAG(
    color,
    background,
    isLargeText,
    Constants.Global.contrastAlgorithm
  );
  const adviceContainer = document.createElement("div");
  adviceContainer.id = "advice";
  const createHr = () => {
    const hr = document.createElement("hr");
    hr.setAttribute("aria-hidden", "true");
    return hr;
  };
  const createColorBadge = (suggestedColor) => {
    const btn = document.createElement("button");
    btn.id = "suggest";
    btn.className = "badge";
    const bgHex = getHex(background);
    btn.style.color = suggestedColor;
    btn.style.backgroundColor = bgHex;
    btn.textContent = suggestedColor;
    return btn;
  };
  const createSizeBadge = (size) => {
    const btn = document.createElement("button");
    btn.id = "suggest-size";
    btn.className = "normal-badge";
    btn.textContent = `${size}px`;
    return btn;
  };
  if (opacity < 1) {
    adviceContainer.append(createHr(), " ", Lang.sprintf("CONTRAST_OPACITY"));
    return adviceContainer;
  }
  const algo = Constants.Global.contrastAlgorithm;
  if (algo === "AA" || algo === "AAA") {
    if (suggested.color === null) {
      adviceContainer.append(createHr(), " ", Lang._("NO_SUGGESTION"));
    } else {
      adviceContainer.append(
        createHr(),
        " ",
        Lang._("CONTRAST_COLOR"),
        " ",
        createColorBadge(suggested.color)
      );
    }
  } else {
    const hasColor = !!suggested.color;
    const hasSize = !!suggested.size;
    if (hasColor || hasSize) {
      adviceContainer.append(createHr(), " ");
      if (hasColor && hasSize) {
        adviceContainer.append(
          Lang._("CONTRAST_APCA"),
          " ",
          createColorBadge(suggested.color),
          " ",
          createSizeBadge(suggested.size)
        );
      } else if (hasColor) {
        adviceContainer.append(Lang._("CONTRAST_COLOR"), " ", createColorBadge(suggested.color));
      } else if (hasSize) {
        adviceContainer.append(Lang._("CONTRAST_SIZE"), " ", createSizeBadge(suggested.size));
      }
    }
  }
  return adviceContainer;
}
const sides = ["top", "right", "bottom", "left"];
const alignments = ["start", "end"];
const placements = /* @__PURE__ */ sides.reduce((acc, side) => acc.concat(side, side + "-" + alignments[0], side + "-" + alignments[1]), []);
const min = Math.min;
const max = Math.max;
const round = Math.round;
const floor = Math.floor;
const createCoords = (v) => ({
  x: v,
  y: v
});
const oppositeSideMap = {
  left: "right",
  right: "left",
  bottom: "top",
  top: "bottom"
};
function clamp(start, value, end) {
  return max(start, min(value, end));
}
function evaluate(value, param) {
  return typeof value === "function" ? value(param) : value;
}
function getSide(placement) {
  return placement.split("-")[0];
}
function getAlignment(placement) {
  return placement.split("-")[1];
}
function getOppositeAxis(axis) {
  return axis === "x" ? "y" : "x";
}
function getAxisLength(axis) {
  return axis === "y" ? "height" : "width";
}
function getSideAxis(placement) {
  const firstChar = placement[0];
  return firstChar === "t" || firstChar === "b" ? "y" : "x";
}
function getAlignmentAxis(placement) {
  return getOppositeAxis(getSideAxis(placement));
}
function getAlignmentSides(placement, rects, rtl) {
  if (rtl === void 0) {
    rtl = false;
  }
  const alignment = getAlignment(placement);
  const alignmentAxis = getAlignmentAxis(placement);
  const length = getAxisLength(alignmentAxis);
  let mainAlignmentSide = alignmentAxis === "x" ? alignment === (rtl ? "end" : "start") ? "right" : "left" : alignment === "start" ? "bottom" : "top";
  if (rects.reference[length] > rects.floating[length]) {
    mainAlignmentSide = getOppositePlacement(mainAlignmentSide);
  }
  return [mainAlignmentSide, getOppositePlacement(mainAlignmentSide)];
}
function getExpandedPlacements(placement) {
  const oppositePlacement = getOppositePlacement(placement);
  return [getOppositeAlignmentPlacement(placement), oppositePlacement, getOppositeAlignmentPlacement(oppositePlacement)];
}
function getOppositeAlignmentPlacement(placement) {
  return placement.includes("start") ? placement.replace("start", "end") : placement.replace("end", "start");
}
const lrPlacement = ["left", "right"];
const rlPlacement = ["right", "left"];
const tbPlacement = ["top", "bottom"];
const btPlacement = ["bottom", "top"];
function getSideList(side, isStart, rtl) {
  switch (side) {
    case "top":
    case "bottom":
      if (rtl) return isStart ? rlPlacement : lrPlacement;
      return isStart ? lrPlacement : rlPlacement;
    case "left":
    case "right":
      return isStart ? tbPlacement : btPlacement;
    default:
      return [];
  }
}
function getOppositeAxisPlacements(placement, flipAlignment, direction, rtl) {
  const alignment = getAlignment(placement);
  let list = getSideList(getSide(placement), direction === "start", rtl);
  if (alignment) {
    list = list.map((side) => side + "-" + alignment);
    if (flipAlignment) {
      list = list.concat(list.map(getOppositeAlignmentPlacement));
    }
  }
  return list;
}
function getOppositePlacement(placement) {
  const side = getSide(placement);
  return oppositeSideMap[side] + placement.slice(side.length);
}
function expandPaddingObject(padding) {
  return {
    top: 0,
    right: 0,
    bottom: 0,
    left: 0,
    ...padding
  };
}
function getPaddingObject(padding) {
  return typeof padding !== "number" ? expandPaddingObject(padding) : {
    top: padding,
    right: padding,
    bottom: padding,
    left: padding
  };
}
function rectToClientRect(rect) {
  const {
    x,
    y,
    width,
    height
  } = rect;
  return {
    width,
    height,
    top: y,
    left: x,
    right: x + width,
    bottom: y + height,
    x,
    y
  };
}
function computeCoordsFromPlacement(_ref, placement, rtl) {
  let {
    reference,
    floating
  } = _ref;
  const sideAxis = getSideAxis(placement);
  const alignmentAxis = getAlignmentAxis(placement);
  const alignLength = getAxisLength(alignmentAxis);
  const side = getSide(placement);
  const isVertical = sideAxis === "y";
  const commonX = reference.x + reference.width / 2 - floating.width / 2;
  const commonY = reference.y + reference.height / 2 - floating.height / 2;
  const commonAlign = reference[alignLength] / 2 - floating[alignLength] / 2;
  let coords;
  switch (side) {
    case "top":
      coords = {
        x: commonX,
        y: reference.y - floating.height
      };
      break;
    case "bottom":
      coords = {
        x: commonX,
        y: reference.y + reference.height
      };
      break;
    case "right":
      coords = {
        x: reference.x + reference.width,
        y: commonY
      };
      break;
    case "left":
      coords = {
        x: reference.x - floating.width,
        y: commonY
      };
      break;
    default:
      coords = {
        x: reference.x,
        y: reference.y
      };
  }
  switch (getAlignment(placement)) {
    case "start":
      coords[alignmentAxis] -= commonAlign * (rtl && isVertical ? -1 : 1);
      break;
    case "end":
      coords[alignmentAxis] += commonAlign * (rtl && isVertical ? -1 : 1);
      break;
  }
  return coords;
}
async function detectOverflow(state, options) {
  var _await$platform$isEle;
  if (options === void 0) {
    options = {};
  }
  const {
    x,
    y,
    platform: platform2,
    rects,
    elements,
    strategy
  } = state;
  const {
    boundary = "clippingAncestors",
    rootBoundary = "viewport",
    elementContext = "floating",
    altBoundary = false,
    padding = 0
  } = evaluate(options, state);
  const paddingObject = getPaddingObject(padding);
  const altContext = elementContext === "floating" ? "reference" : "floating";
  const element = elements[altBoundary ? altContext : elementContext];
  const clippingClientRect = rectToClientRect(await platform2.getClippingRect({
    element: ((_await$platform$isEle = await (platform2.isElement == null ? void 0 : platform2.isElement(element))) != null ? _await$platform$isEle : true) ? element : element.contextElement || await (platform2.getDocumentElement == null ? void 0 : platform2.getDocumentElement(elements.floating)),
    boundary,
    rootBoundary,
    strategy
  }));
  const rect = elementContext === "floating" ? {
    x,
    y,
    width: rects.floating.width,
    height: rects.floating.height
  } : rects.reference;
  const offsetParent = await (platform2.getOffsetParent == null ? void 0 : platform2.getOffsetParent(elements.floating));
  const offsetScale = await (platform2.isElement == null ? void 0 : platform2.isElement(offsetParent)) ? await (platform2.getScale == null ? void 0 : platform2.getScale(offsetParent)) || {
    x: 1,
    y: 1
  } : {
    x: 1,
    y: 1
  };
  const elementClientRect = rectToClientRect(platform2.convertOffsetParentRelativeRectToViewportRelativeRect ? await platform2.convertOffsetParentRelativeRectToViewportRelativeRect({
    elements,
    rect,
    offsetParent,
    strategy
  }) : rect);
  return {
    top: (clippingClientRect.top - elementClientRect.top + paddingObject.top) / offsetScale.y,
    bottom: (elementClientRect.bottom - clippingClientRect.bottom + paddingObject.bottom) / offsetScale.y,
    left: (clippingClientRect.left - elementClientRect.left + paddingObject.left) / offsetScale.x,
    right: (elementClientRect.right - clippingClientRect.right + paddingObject.right) / offsetScale.x
  };
}
const MAX_RESET_COUNT = 50;
const computePosition$1 = async (reference, floating, config) => {
  const {
    placement = "bottom",
    strategy = "absolute",
    middleware = [],
    platform: platform2
  } = config;
  const platformWithDetectOverflow = platform2.detectOverflow ? platform2 : {
    ...platform2,
    detectOverflow
  };
  const rtl = await (platform2.isRTL == null ? void 0 : platform2.isRTL(floating));
  let rects = await platform2.getElementRects({
    reference,
    floating,
    strategy
  });
  let {
    x,
    y
  } = computeCoordsFromPlacement(rects, placement, rtl);
  let statefulPlacement = placement;
  let resetCount = 0;
  const middlewareData = {};
  for (let i = 0; i < middleware.length; i++) {
    const currentMiddleware = middleware[i];
    if (!currentMiddleware) {
      continue;
    }
    const {
      name,
      fn
    } = currentMiddleware;
    const {
      x: nextX,
      y: nextY,
      data,
      reset
    } = await fn({
      x,
      y,
      initialPlacement: placement,
      placement: statefulPlacement,
      strategy,
      middlewareData,
      rects,
      platform: platformWithDetectOverflow,
      elements: {
        reference,
        floating
      }
    });
    x = nextX != null ? nextX : x;
    y = nextY != null ? nextY : y;
    middlewareData[name] = {
      ...middlewareData[name],
      ...data
    };
    if (reset && resetCount < MAX_RESET_COUNT) {
      resetCount++;
      if (typeof reset === "object") {
        if (reset.placement) {
          statefulPlacement = reset.placement;
        }
        if (reset.rects) {
          rects = reset.rects === true ? await platform2.getElementRects({
            reference,
            floating,
            strategy
          }) : reset.rects;
        }
        ({
          x,
          y
        } = computeCoordsFromPlacement(rects, statefulPlacement, rtl));
      }
      i = -1;
    }
  }
  return {
    x,
    y,
    placement: statefulPlacement,
    strategy,
    middlewareData
  };
};
const arrow$1 = (options) => ({
  name: "arrow",
  options,
  async fn(state) {
    const {
      x,
      y,
      placement,
      rects,
      platform: platform2,
      elements,
      middlewareData
    } = state;
    const {
      element,
      padding = 0
    } = evaluate(options, state) || {};
    if (element == null) {
      return {};
    }
    const paddingObject = getPaddingObject(padding);
    const coords = {
      x,
      y
    };
    const axis = getAlignmentAxis(placement);
    const length = getAxisLength(axis);
    const arrowDimensions = await platform2.getDimensions(element);
    const isYAxis = axis === "y";
    const minProp = isYAxis ? "top" : "left";
    const maxProp = isYAxis ? "bottom" : "right";
    const clientProp = isYAxis ? "clientHeight" : "clientWidth";
    const endDiff = rects.reference[length] + rects.reference[axis] - coords[axis] - rects.floating[length];
    const startDiff = coords[axis] - rects.reference[axis];
    const arrowOffsetParent = await (platform2.getOffsetParent == null ? void 0 : platform2.getOffsetParent(element));
    let clientSize = arrowOffsetParent ? arrowOffsetParent[clientProp] : 0;
    if (!clientSize || !await (platform2.isElement == null ? void 0 : platform2.isElement(arrowOffsetParent))) {
      clientSize = elements.floating[clientProp] || rects.floating[length];
    }
    const centerToReference = endDiff / 2 - startDiff / 2;
    const largestPossiblePadding = clientSize / 2 - arrowDimensions[length] / 2 - 1;
    const minPadding = min(paddingObject[minProp], largestPossiblePadding);
    const maxPadding = min(paddingObject[maxProp], largestPossiblePadding);
    const min$1 = minPadding;
    const max2 = clientSize - arrowDimensions[length] - maxPadding;
    const center = clientSize / 2 - arrowDimensions[length] / 2 + centerToReference;
    const offset2 = clamp(min$1, center, max2);
    const shouldAddOffset = !middlewareData.arrow && getAlignment(placement) != null && center !== offset2 && rects.reference[length] / 2 - (center < min$1 ? minPadding : maxPadding) - arrowDimensions[length] / 2 < 0;
    const alignmentOffset = shouldAddOffset ? center < min$1 ? center - min$1 : center - max2 : 0;
    return {
      [axis]: coords[axis] + alignmentOffset,
      data: {
        [axis]: offset2,
        centerOffset: center - offset2 - alignmentOffset,
        ...shouldAddOffset && {
          alignmentOffset
        }
      },
      reset: shouldAddOffset
    };
  }
});
function getPlacementList(alignment, autoAlignment, allowedPlacements) {
  const allowedPlacementsSortedByAlignment = alignment ? [...allowedPlacements.filter((placement) => getAlignment(placement) === alignment), ...allowedPlacements.filter((placement) => getAlignment(placement) !== alignment)] : allowedPlacements.filter((placement) => getSide(placement) === placement);
  return allowedPlacementsSortedByAlignment.filter((placement) => {
    if (alignment) {
      return getAlignment(placement) === alignment || (autoAlignment ? getOppositeAlignmentPlacement(placement) !== placement : false);
    }
    return true;
  });
}
const autoPlacement$1 = function(options) {
  if (options === void 0) {
    options = {};
  }
  return {
    name: "autoPlacement",
    options,
    async fn(state) {
      var _middlewareData$autoP, _middlewareData$autoP2, _placementsThatFitOnE;
      const {
        rects,
        middlewareData,
        placement,
        platform: platform2,
        elements
      } = state;
      const {
        crossAxis = false,
        alignment,
        allowedPlacements = placements,
        autoAlignment = true,
        ...detectOverflowOptions
      } = evaluate(options, state);
      const placements$1 = alignment !== void 0 || allowedPlacements === placements ? getPlacementList(alignment || null, autoAlignment, allowedPlacements) : allowedPlacements;
      const overflow = await platform2.detectOverflow(state, detectOverflowOptions);
      const currentIndex = ((_middlewareData$autoP = middlewareData.autoPlacement) == null ? void 0 : _middlewareData$autoP.index) || 0;
      const currentPlacement = placements$1[currentIndex];
      if (currentPlacement == null) {
        return {};
      }
      const alignmentSides = getAlignmentSides(currentPlacement, rects, await (platform2.isRTL == null ? void 0 : platform2.isRTL(elements.floating)));
      if (placement !== currentPlacement) {
        return {
          reset: {
            placement: placements$1[0]
          }
        };
      }
      const currentOverflows = [overflow[getSide(currentPlacement)], overflow[alignmentSides[0]], overflow[alignmentSides[1]]];
      const allOverflows = [...((_middlewareData$autoP2 = middlewareData.autoPlacement) == null ? void 0 : _middlewareData$autoP2.overflows) || [], {
        placement: currentPlacement,
        overflows: currentOverflows
      }];
      const nextPlacement = placements$1[currentIndex + 1];
      if (nextPlacement) {
        return {
          data: {
            index: currentIndex + 1,
            overflows: allOverflows
          },
          reset: {
            placement: nextPlacement
          }
        };
      }
      const placementsSortedByMostSpace = allOverflows.map((d) => {
        const alignment2 = getAlignment(d.placement);
        return [d.placement, alignment2 && crossAxis ? (
          // Check along the mainAxis and main crossAxis side.
          d.overflows.slice(0, 2).reduce((acc, v) => acc + v, 0)
        ) : (
          // Check only the mainAxis.
          d.overflows[0]
        ), d.overflows];
      }).sort((a, b) => a[1] - b[1]);
      const placementsThatFitOnEachSide = placementsSortedByMostSpace.filter((d) => d[2].slice(
        0,
        // Aligned placements should not check their opposite crossAxis
        // side.
        getAlignment(d[0]) ? 2 : 3
      ).every((v) => v <= 0));
      const resetPlacement = ((_placementsThatFitOnE = placementsThatFitOnEachSide[0]) == null ? void 0 : _placementsThatFitOnE[0]) || placementsSortedByMostSpace[0][0];
      if (resetPlacement !== placement) {
        return {
          data: {
            index: currentIndex + 1,
            overflows: allOverflows
          },
          reset: {
            placement: resetPlacement
          }
        };
      }
      return {};
    }
  };
};
const flip$1 = function(options) {
  if (options === void 0) {
    options = {};
  }
  return {
    name: "flip",
    options,
    async fn(state) {
      var _middlewareData$arrow, _middlewareData$flip;
      const {
        placement,
        middlewareData,
        rects,
        initialPlacement,
        platform: platform2,
        elements
      } = state;
      const {
        mainAxis: checkMainAxis = true,
        crossAxis: checkCrossAxis = true,
        fallbackPlacements: specifiedFallbackPlacements,
        fallbackStrategy = "bestFit",
        fallbackAxisSideDirection = "none",
        flipAlignment = true,
        ...detectOverflowOptions
      } = evaluate(options, state);
      if ((_middlewareData$arrow = middlewareData.arrow) != null && _middlewareData$arrow.alignmentOffset) {
        return {};
      }
      const side = getSide(placement);
      const initialSideAxis = getSideAxis(initialPlacement);
      const isBasePlacement = getSide(initialPlacement) === initialPlacement;
      const rtl = await (platform2.isRTL == null ? void 0 : platform2.isRTL(elements.floating));
      const fallbackPlacements = specifiedFallbackPlacements || (isBasePlacement || !flipAlignment ? [getOppositePlacement(initialPlacement)] : getExpandedPlacements(initialPlacement));
      const hasFallbackAxisSideDirection = fallbackAxisSideDirection !== "none";
      if (!specifiedFallbackPlacements && hasFallbackAxisSideDirection) {
        fallbackPlacements.push(...getOppositeAxisPlacements(initialPlacement, flipAlignment, fallbackAxisSideDirection, rtl));
      }
      const placements2 = [initialPlacement, ...fallbackPlacements];
      const overflow = await platform2.detectOverflow(state, detectOverflowOptions);
      const overflows = [];
      let overflowsData = ((_middlewareData$flip = middlewareData.flip) == null ? void 0 : _middlewareData$flip.overflows) || [];
      if (checkMainAxis) {
        overflows.push(overflow[side]);
      }
      if (checkCrossAxis) {
        const sides2 = getAlignmentSides(placement, rects, rtl);
        overflows.push(overflow[sides2[0]], overflow[sides2[1]]);
      }
      overflowsData = [...overflowsData, {
        placement,
        overflows
      }];
      if (!overflows.every((side2) => side2 <= 0)) {
        var _middlewareData$flip2, _overflowsData$filter;
        const nextIndex = (((_middlewareData$flip2 = middlewareData.flip) == null ? void 0 : _middlewareData$flip2.index) || 0) + 1;
        const nextPlacement = placements2[nextIndex];
        if (nextPlacement) {
          const ignoreCrossAxisOverflow = checkCrossAxis === "alignment" ? initialSideAxis !== getSideAxis(nextPlacement) : false;
          if (!ignoreCrossAxisOverflow || // We leave the current main axis only if every placement on that axis
          // overflows the main axis.
          overflowsData.every((d) => getSideAxis(d.placement) === initialSideAxis ? d.overflows[0] > 0 : true)) {
            return {
              data: {
                index: nextIndex,
                overflows: overflowsData
              },
              reset: {
                placement: nextPlacement
              }
            };
          }
        }
        let resetPlacement = (_overflowsData$filter = overflowsData.filter((d) => d.overflows[0] <= 0).sort((a, b) => a.overflows[1] - b.overflows[1])[0]) == null ? void 0 : _overflowsData$filter.placement;
        if (!resetPlacement) {
          switch (fallbackStrategy) {
            case "bestFit": {
              var _overflowsData$filter2;
              const placement2 = (_overflowsData$filter2 = overflowsData.filter((d) => {
                if (hasFallbackAxisSideDirection) {
                  const currentSideAxis = getSideAxis(d.placement);
                  return currentSideAxis === initialSideAxis || // Create a bias to the `y` side axis due to horizontal
                  // reading directions favoring greater width.
                  currentSideAxis === "y";
                }
                return true;
              }).map((d) => [d.placement, d.overflows.filter((overflow2) => overflow2 > 0).reduce((acc, overflow2) => acc + overflow2, 0)]).sort((a, b) => a[1] - b[1])[0]) == null ? void 0 : _overflowsData$filter2[0];
              if (placement2) {
                resetPlacement = placement2;
              }
              break;
            }
            case "initialPlacement":
              resetPlacement = initialPlacement;
              break;
          }
        }
        if (placement !== resetPlacement) {
          return {
            reset: {
              placement: resetPlacement
            }
          };
        }
      }
      return {};
    }
  };
};
const originSides = /* @__PURE__ */ new Set(["left", "top"]);
async function convertValueToCoords(state, options) {
  const {
    placement,
    platform: platform2,
    elements
  } = state;
  const rtl = await (platform2.isRTL == null ? void 0 : platform2.isRTL(elements.floating));
  const side = getSide(placement);
  const alignment = getAlignment(placement);
  const isVertical = getSideAxis(placement) === "y";
  const mainAxisMulti = originSides.has(side) ? -1 : 1;
  const crossAxisMulti = rtl && isVertical ? -1 : 1;
  const rawValue = evaluate(options, state);
  let {
    mainAxis,
    crossAxis,
    alignmentAxis
  } = typeof rawValue === "number" ? {
    mainAxis: rawValue,
    crossAxis: 0,
    alignmentAxis: null
  } : {
    mainAxis: rawValue.mainAxis || 0,
    crossAxis: rawValue.crossAxis || 0,
    alignmentAxis: rawValue.alignmentAxis
  };
  if (alignment && typeof alignmentAxis === "number") {
    crossAxis = alignment === "end" ? alignmentAxis * -1 : alignmentAxis;
  }
  return isVertical ? {
    x: crossAxis * crossAxisMulti,
    y: mainAxis * mainAxisMulti
  } : {
    x: mainAxis * mainAxisMulti,
    y: crossAxis * crossAxisMulti
  };
}
const offset$1 = function(options) {
  if (options === void 0) {
    options = 0;
  }
  return {
    name: "offset",
    options,
    async fn(state) {
      var _middlewareData$offse, _middlewareData$arrow;
      const {
        x,
        y,
        placement,
        middlewareData
      } = state;
      const diffCoords = await convertValueToCoords(state, options);
      if (placement === ((_middlewareData$offse = middlewareData.offset) == null ? void 0 : _middlewareData$offse.placement) && (_middlewareData$arrow = middlewareData.arrow) != null && _middlewareData$arrow.alignmentOffset) {
        return {};
      }
      return {
        x: x + diffCoords.x,
        y: y + diffCoords.y,
        data: {
          ...diffCoords,
          placement
        }
      };
    }
  };
};
const shift$1 = function(options) {
  if (options === void 0) {
    options = {};
  }
  return {
    name: "shift",
    options,
    async fn(state) {
      const {
        x,
        y,
        placement,
        platform: platform2
      } = state;
      const {
        mainAxis: checkMainAxis = true,
        crossAxis: checkCrossAxis = false,
        limiter = {
          fn: (_ref) => {
            let {
              x: x2,
              y: y2
            } = _ref;
            return {
              x: x2,
              y: y2
            };
          }
        },
        ...detectOverflowOptions
      } = evaluate(options, state);
      const coords = {
        x,
        y
      };
      const overflow = await platform2.detectOverflow(state, detectOverflowOptions);
      const crossAxis = getSideAxis(getSide(placement));
      const mainAxis = getOppositeAxis(crossAxis);
      let mainAxisCoord = coords[mainAxis];
      let crossAxisCoord = coords[crossAxis];
      if (checkMainAxis) {
        const minSide = mainAxis === "y" ? "top" : "left";
        const maxSide = mainAxis === "y" ? "bottom" : "right";
        const min2 = mainAxisCoord + overflow[minSide];
        const max2 = mainAxisCoord - overflow[maxSide];
        mainAxisCoord = clamp(min2, mainAxisCoord, max2);
      }
      if (checkCrossAxis) {
        const minSide = crossAxis === "y" ? "top" : "left";
        const maxSide = crossAxis === "y" ? "bottom" : "right";
        const min2 = crossAxisCoord + overflow[minSide];
        const max2 = crossAxisCoord - overflow[maxSide];
        crossAxisCoord = clamp(min2, crossAxisCoord, max2);
      }
      const limitedCoords = limiter.fn({
        ...state,
        [mainAxis]: mainAxisCoord,
        [crossAxis]: crossAxisCoord
      });
      return {
        ...limitedCoords,
        data: {
          x: limitedCoords.x - x,
          y: limitedCoords.y - y,
          enabled: {
            [mainAxis]: checkMainAxis,
            [crossAxis]: checkCrossAxis
          }
        }
      };
    }
  };
};
function hasWindow() {
  return typeof window !== "undefined";
}
function getNodeName(node) {
  if (isNode(node)) {
    return (node.nodeName || "").toLowerCase();
  }
  return "#document";
}
function getWindow(node) {
  var _node$ownerDocument;
  return (node == null || (_node$ownerDocument = node.ownerDocument) == null ? void 0 : _node$ownerDocument.defaultView) || window;
}
function getDocumentElement(node) {
  var _ref;
  return (_ref = (isNode(node) ? node.ownerDocument : node.document) || window.document) == null ? void 0 : _ref.documentElement;
}
function isNode(value) {
  if (!hasWindow()) {
    return false;
  }
  return value instanceof Node || value instanceof getWindow(value).Node;
}
function isElement(value) {
  if (!hasWindow()) {
    return false;
  }
  return value instanceof Element || value instanceof getWindow(value).Element;
}
function isHTMLElement(value) {
  if (!hasWindow()) {
    return false;
  }
  return value instanceof HTMLElement || value instanceof getWindow(value).HTMLElement;
}
function isShadowRoot(value) {
  if (!hasWindow() || typeof ShadowRoot === "undefined") {
    return false;
  }
  return value instanceof ShadowRoot || value instanceof getWindow(value).ShadowRoot;
}
function isOverflowElement(element) {
  const {
    overflow,
    overflowX,
    overflowY,
    display
  } = getComputedStyle$1(element);
  return /auto|scroll|overlay|hidden|clip/.test(overflow + overflowY + overflowX) && display !== "inline" && display !== "contents";
}
function isTableElement(element) {
  return /^(table|td|th)$/.test(getNodeName(element));
}
function isTopLayer(element) {
  try {
    if (element.matches(":popover-open")) {
      return true;
    }
  } catch (_e) {
  }
  try {
    return element.matches(":modal");
  } catch (_e) {
    return false;
  }
}
const willChangeRe = /transform|translate|scale|rotate|perspective|filter/;
const containRe = /paint|layout|strict|content/;
const isNotNone = (value) => !!value && value !== "none";
let isWebKitValue;
function isContainingBlock(elementOrCss) {
  const css = isElement(elementOrCss) ? getComputedStyle$1(elementOrCss) : elementOrCss;
  return isNotNone(css.transform) || isNotNone(css.translate) || isNotNone(css.scale) || isNotNone(css.rotate) || isNotNone(css.perspective) || !isWebKit() && (isNotNone(css.backdropFilter) || isNotNone(css.filter)) || willChangeRe.test(css.willChange || "") || containRe.test(css.contain || "");
}
function getContainingBlock(element) {
  let currentNode = getParentNode(element);
  while (isHTMLElement(currentNode) && !isLastTraversableNode(currentNode)) {
    if (isContainingBlock(currentNode)) {
      return currentNode;
    } else if (isTopLayer(currentNode)) {
      return null;
    }
    currentNode = getParentNode(currentNode);
  }
  return null;
}
function isWebKit() {
  if (isWebKitValue == null) {
    isWebKitValue = typeof CSS !== "undefined" && CSS.supports && CSS.supports("-webkit-backdrop-filter", "none");
  }
  return isWebKitValue;
}
function isLastTraversableNode(node) {
  return /^(html|body|#document)$/.test(getNodeName(node));
}
function getComputedStyle$1(element) {
  return getWindow(element).getComputedStyle(element);
}
function getNodeScroll(element) {
  if (isElement(element)) {
    return {
      scrollLeft: element.scrollLeft,
      scrollTop: element.scrollTop
    };
  }
  return {
    scrollLeft: element.scrollX,
    scrollTop: element.scrollY
  };
}
function getParentNode(node) {
  if (getNodeName(node) === "html") {
    return node;
  }
  const result = (
    // Step into the shadow DOM of the parent of a slotted node.
    node.assignedSlot || // DOM Element detected.
    node.parentNode || // ShadowRoot detected.
    isShadowRoot(node) && node.host || // Fallback.
    getDocumentElement(node)
  );
  return isShadowRoot(result) ? result.host : result;
}
function getNearestOverflowAncestor(node) {
  const parentNode = getParentNode(node);
  if (isLastTraversableNode(parentNode)) {
    return node.ownerDocument ? node.ownerDocument.body : node.body;
  }
  if (isHTMLElement(parentNode) && isOverflowElement(parentNode)) {
    return parentNode;
  }
  return getNearestOverflowAncestor(parentNode);
}
function getOverflowAncestors(node, list, traverseIframes) {
  var _node$ownerDocument2;
  if (list === void 0) {
    list = [];
  }
  if (traverseIframes === void 0) {
    traverseIframes = true;
  }
  const scrollableAncestor = getNearestOverflowAncestor(node);
  const isBody = scrollableAncestor === ((_node$ownerDocument2 = node.ownerDocument) == null ? void 0 : _node$ownerDocument2.body);
  const win = getWindow(scrollableAncestor);
  if (isBody) {
    const frameElement = getFrameElement(win);
    return list.concat(win, win.visualViewport || [], isOverflowElement(scrollableAncestor) ? scrollableAncestor : [], frameElement && traverseIframes ? getOverflowAncestors(frameElement) : []);
  } else {
    return list.concat(scrollableAncestor, getOverflowAncestors(scrollableAncestor, [], traverseIframes));
  }
}
function getFrameElement(win) {
  return win.parent && Object.getPrototypeOf(win.parent) ? win.frameElement : null;
}
function getCssDimensions(element) {
  const css = getComputedStyle$1(element);
  let width = parseFloat(css.width) || 0;
  let height = parseFloat(css.height) || 0;
  const hasOffset = isHTMLElement(element);
  const offsetWidth = hasOffset ? element.offsetWidth : width;
  const offsetHeight = hasOffset ? element.offsetHeight : height;
  const shouldFallback = round(width) !== offsetWidth || round(height) !== offsetHeight;
  if (shouldFallback) {
    width = offsetWidth;
    height = offsetHeight;
  }
  return {
    width,
    height,
    $: shouldFallback
  };
}
function unwrapElement(element) {
  return !isElement(element) ? element.contextElement : element;
}
function getScale(element) {
  const domElement = unwrapElement(element);
  if (!isHTMLElement(domElement)) {
    return createCoords(1);
  }
  const rect = domElement.getBoundingClientRect();
  const {
    width,
    height,
    $
  } = getCssDimensions(domElement);
  let x = ($ ? round(rect.width) : rect.width) / width;
  let y = ($ ? round(rect.height) : rect.height) / height;
  if (!x || !Number.isFinite(x)) {
    x = 1;
  }
  if (!y || !Number.isFinite(y)) {
    y = 1;
  }
  return {
    x,
    y
  };
}
const noOffsets = /* @__PURE__ */ createCoords(0);
function getVisualOffsets(element) {
  const win = getWindow(element);
  if (!isWebKit() || !win.visualViewport) {
    return noOffsets;
  }
  return {
    x: win.visualViewport.offsetLeft,
    y: win.visualViewport.offsetTop
  };
}
function shouldAddVisualOffsets(element, isFixed, floatingOffsetParent) {
  if (isFixed === void 0) {
    isFixed = false;
  }
  if (!floatingOffsetParent || isFixed && floatingOffsetParent !== getWindow(element)) {
    return false;
  }
  return isFixed;
}
function getBoundingClientRect(element, includeScale, isFixedStrategy, offsetParent) {
  if (includeScale === void 0) {
    includeScale = false;
  }
  if (isFixedStrategy === void 0) {
    isFixedStrategy = false;
  }
  const clientRect = element.getBoundingClientRect();
  const domElement = unwrapElement(element);
  let scale = createCoords(1);
  if (includeScale) {
    if (offsetParent) {
      if (isElement(offsetParent)) {
        scale = getScale(offsetParent);
      }
    } else {
      scale = getScale(element);
    }
  }
  const visualOffsets = shouldAddVisualOffsets(domElement, isFixedStrategy, offsetParent) ? getVisualOffsets(domElement) : createCoords(0);
  let x = (clientRect.left + visualOffsets.x) / scale.x;
  let y = (clientRect.top + visualOffsets.y) / scale.y;
  let width = clientRect.width / scale.x;
  let height = clientRect.height / scale.y;
  if (domElement) {
    const win = getWindow(domElement);
    const offsetWin = offsetParent && isElement(offsetParent) ? getWindow(offsetParent) : offsetParent;
    let currentWin = win;
    let currentIFrame = getFrameElement(currentWin);
    while (currentIFrame && offsetParent && offsetWin !== currentWin) {
      const iframeScale = getScale(currentIFrame);
      const iframeRect = currentIFrame.getBoundingClientRect();
      const css = getComputedStyle$1(currentIFrame);
      const left = iframeRect.left + (currentIFrame.clientLeft + parseFloat(css.paddingLeft)) * iframeScale.x;
      const top = iframeRect.top + (currentIFrame.clientTop + parseFloat(css.paddingTop)) * iframeScale.y;
      x *= iframeScale.x;
      y *= iframeScale.y;
      width *= iframeScale.x;
      height *= iframeScale.y;
      x += left;
      y += top;
      currentWin = getWindow(currentIFrame);
      currentIFrame = getFrameElement(currentWin);
    }
  }
  return rectToClientRect({
    width,
    height,
    x,
    y
  });
}
function getWindowScrollBarX(element, rect) {
  const leftScroll = getNodeScroll(element).scrollLeft;
  if (!rect) {
    return getBoundingClientRect(getDocumentElement(element)).left + leftScroll;
  }
  return rect.left + leftScroll;
}
function getHTMLOffset(documentElement, scroll) {
  const htmlRect = documentElement.getBoundingClientRect();
  const x = htmlRect.left + scroll.scrollLeft - getWindowScrollBarX(documentElement, htmlRect);
  const y = htmlRect.top + scroll.scrollTop;
  return {
    x,
    y
  };
}
function convertOffsetParentRelativeRectToViewportRelativeRect(_ref) {
  let {
    elements,
    rect,
    offsetParent,
    strategy
  } = _ref;
  const isFixed = strategy === "fixed";
  const documentElement = getDocumentElement(offsetParent);
  const topLayer = elements ? isTopLayer(elements.floating) : false;
  if (offsetParent === documentElement || topLayer && isFixed) {
    return rect;
  }
  let scroll = {
    scrollLeft: 0,
    scrollTop: 0
  };
  let scale = createCoords(1);
  const offsets = createCoords(0);
  const isOffsetParentAnElement = isHTMLElement(offsetParent);
  if (isOffsetParentAnElement || !isOffsetParentAnElement && !isFixed) {
    if (getNodeName(offsetParent) !== "body" || isOverflowElement(documentElement)) {
      scroll = getNodeScroll(offsetParent);
    }
    if (isOffsetParentAnElement) {
      const offsetRect = getBoundingClientRect(offsetParent);
      scale = getScale(offsetParent);
      offsets.x = offsetRect.x + offsetParent.clientLeft;
      offsets.y = offsetRect.y + offsetParent.clientTop;
    }
  }
  const htmlOffset = documentElement && !isOffsetParentAnElement && !isFixed ? getHTMLOffset(documentElement, scroll) : createCoords(0);
  return {
    width: rect.width * scale.x,
    height: rect.height * scale.y,
    x: rect.x * scale.x - scroll.scrollLeft * scale.x + offsets.x + htmlOffset.x,
    y: rect.y * scale.y - scroll.scrollTop * scale.y + offsets.y + htmlOffset.y
  };
}
function getClientRects(element) {
  return Array.from(element.getClientRects());
}
function getDocumentRect(element) {
  const html = getDocumentElement(element);
  const scroll = getNodeScroll(element);
  const body = element.ownerDocument.body;
  const width = max(html.scrollWidth, html.clientWidth, body.scrollWidth, body.clientWidth);
  const height = max(html.scrollHeight, html.clientHeight, body.scrollHeight, body.clientHeight);
  let x = -scroll.scrollLeft + getWindowScrollBarX(element);
  const y = -scroll.scrollTop;
  if (getComputedStyle$1(body).direction === "rtl") {
    x += max(html.clientWidth, body.clientWidth) - width;
  }
  return {
    width,
    height,
    x,
    y
  };
}
const SCROLLBAR_MAX = 25;
function getViewportRect(element, strategy) {
  const win = getWindow(element);
  const html = getDocumentElement(element);
  const visualViewport = win.visualViewport;
  let width = html.clientWidth;
  let height = html.clientHeight;
  let x = 0;
  let y = 0;
  if (visualViewport) {
    width = visualViewport.width;
    height = visualViewport.height;
    const visualViewportBased = isWebKit();
    if (!visualViewportBased || visualViewportBased && strategy === "fixed") {
      x = visualViewport.offsetLeft;
      y = visualViewport.offsetTop;
    }
  }
  const windowScrollbarX = getWindowScrollBarX(html);
  if (windowScrollbarX <= 0) {
    const doc = html.ownerDocument;
    const body = doc.body;
    const bodyStyles = getComputedStyle(body);
    const bodyMarginInline = doc.compatMode === "CSS1Compat" ? parseFloat(bodyStyles.marginLeft) + parseFloat(bodyStyles.marginRight) || 0 : 0;
    const clippingStableScrollbarWidth = Math.abs(html.clientWidth - body.clientWidth - bodyMarginInline);
    if (clippingStableScrollbarWidth <= SCROLLBAR_MAX) {
      width -= clippingStableScrollbarWidth;
    }
  } else if (windowScrollbarX <= SCROLLBAR_MAX) {
    width += windowScrollbarX;
  }
  return {
    width,
    height,
    x,
    y
  };
}
function getInnerBoundingClientRect(element, strategy) {
  const clientRect = getBoundingClientRect(element, true, strategy === "fixed");
  const top = clientRect.top + element.clientTop;
  const left = clientRect.left + element.clientLeft;
  const scale = isHTMLElement(element) ? getScale(element) : createCoords(1);
  const width = element.clientWidth * scale.x;
  const height = element.clientHeight * scale.y;
  const x = left * scale.x;
  const y = top * scale.y;
  return {
    width,
    height,
    x,
    y
  };
}
function getClientRectFromClippingAncestor(element, clippingAncestor, strategy) {
  let rect;
  if (clippingAncestor === "viewport") {
    rect = getViewportRect(element, strategy);
  } else if (clippingAncestor === "document") {
    rect = getDocumentRect(getDocumentElement(element));
  } else if (isElement(clippingAncestor)) {
    rect = getInnerBoundingClientRect(clippingAncestor, strategy);
  } else {
    const visualOffsets = getVisualOffsets(element);
    rect = {
      x: clippingAncestor.x - visualOffsets.x,
      y: clippingAncestor.y - visualOffsets.y,
      width: clippingAncestor.width,
      height: clippingAncestor.height
    };
  }
  return rectToClientRect(rect);
}
function hasFixedPositionAncestor(element, stopNode) {
  const parentNode = getParentNode(element);
  if (parentNode === stopNode || !isElement(parentNode) || isLastTraversableNode(parentNode)) {
    return false;
  }
  return getComputedStyle$1(parentNode).position === "fixed" || hasFixedPositionAncestor(parentNode, stopNode);
}
function getClippingElementAncestors(element, cache) {
  const cachedResult = cache.get(element);
  if (cachedResult) {
    return cachedResult;
  }
  let result = getOverflowAncestors(element, [], false).filter((el2) => isElement(el2) && getNodeName(el2) !== "body");
  let currentContainingBlockComputedStyle = null;
  const elementIsFixed = getComputedStyle$1(element).position === "fixed";
  let currentNode = elementIsFixed ? getParentNode(element) : element;
  while (isElement(currentNode) && !isLastTraversableNode(currentNode)) {
    const computedStyle = getComputedStyle$1(currentNode);
    const currentNodeIsContaining = isContainingBlock(currentNode);
    if (!currentNodeIsContaining && computedStyle.position === "fixed") {
      currentContainingBlockComputedStyle = null;
    }
    const shouldDropCurrentNode = elementIsFixed ? !currentNodeIsContaining && !currentContainingBlockComputedStyle : !currentNodeIsContaining && computedStyle.position === "static" && !!currentContainingBlockComputedStyle && (currentContainingBlockComputedStyle.position === "absolute" || currentContainingBlockComputedStyle.position === "fixed") || isOverflowElement(currentNode) && !currentNodeIsContaining && hasFixedPositionAncestor(element, currentNode);
    if (shouldDropCurrentNode) {
      result = result.filter((ancestor) => ancestor !== currentNode);
    } else {
      currentContainingBlockComputedStyle = computedStyle;
    }
    currentNode = getParentNode(currentNode);
  }
  cache.set(element, result);
  return result;
}
function getClippingRect(_ref) {
  let {
    element,
    boundary,
    rootBoundary,
    strategy
  } = _ref;
  const elementClippingAncestors = boundary === "clippingAncestors" ? isTopLayer(element) ? [] : getClippingElementAncestors(element, this._c) : [].concat(boundary);
  const clippingAncestors = [...elementClippingAncestors, rootBoundary];
  const firstRect = getClientRectFromClippingAncestor(element, clippingAncestors[0], strategy);
  let top = firstRect.top;
  let right = firstRect.right;
  let bottom = firstRect.bottom;
  let left = firstRect.left;
  for (let i = 1; i < clippingAncestors.length; i++) {
    const rect = getClientRectFromClippingAncestor(element, clippingAncestors[i], strategy);
    top = max(rect.top, top);
    right = min(rect.right, right);
    bottom = min(rect.bottom, bottom);
    left = max(rect.left, left);
  }
  return {
    width: right - left,
    height: bottom - top,
    x: left,
    y: top
  };
}
function getDimensions(element) {
  const {
    width,
    height
  } = getCssDimensions(element);
  return {
    width,
    height
  };
}
function getRectRelativeToOffsetParent(element, offsetParent, strategy) {
  const isOffsetParentAnElement = isHTMLElement(offsetParent);
  const documentElement = getDocumentElement(offsetParent);
  const isFixed = strategy === "fixed";
  const rect = getBoundingClientRect(element, true, isFixed, offsetParent);
  let scroll = {
    scrollLeft: 0,
    scrollTop: 0
  };
  const offsets = createCoords(0);
  function setLeftRTLScrollbarOffset() {
    offsets.x = getWindowScrollBarX(documentElement);
  }
  if (isOffsetParentAnElement || !isOffsetParentAnElement && !isFixed) {
    if (getNodeName(offsetParent) !== "body" || isOverflowElement(documentElement)) {
      scroll = getNodeScroll(offsetParent);
    }
    if (isOffsetParentAnElement) {
      const offsetRect = getBoundingClientRect(offsetParent, true, isFixed, offsetParent);
      offsets.x = offsetRect.x + offsetParent.clientLeft;
      offsets.y = offsetRect.y + offsetParent.clientTop;
    } else if (documentElement) {
      setLeftRTLScrollbarOffset();
    }
  }
  if (isFixed && !isOffsetParentAnElement && documentElement) {
    setLeftRTLScrollbarOffset();
  }
  const htmlOffset = documentElement && !isOffsetParentAnElement && !isFixed ? getHTMLOffset(documentElement, scroll) : createCoords(0);
  const x = rect.left + scroll.scrollLeft - offsets.x - htmlOffset.x;
  const y = rect.top + scroll.scrollTop - offsets.y - htmlOffset.y;
  return {
    x,
    y,
    width: rect.width,
    height: rect.height
  };
}
function isStaticPositioned(element) {
  return getComputedStyle$1(element).position === "static";
}
function getTrueOffsetParent(element, polyfill) {
  if (!isHTMLElement(element) || getComputedStyle$1(element).position === "fixed") {
    return null;
  }
  if (polyfill) {
    return polyfill(element);
  }
  let rawOffsetParent = element.offsetParent;
  if (getDocumentElement(element) === rawOffsetParent) {
    rawOffsetParent = rawOffsetParent.ownerDocument.body;
  }
  return rawOffsetParent;
}
function getOffsetParent(element, polyfill) {
  const win = getWindow(element);
  if (isTopLayer(element)) {
    return win;
  }
  if (!isHTMLElement(element)) {
    let svgOffsetParent = getParentNode(element);
    while (svgOffsetParent && !isLastTraversableNode(svgOffsetParent)) {
      if (isElement(svgOffsetParent) && !isStaticPositioned(svgOffsetParent)) {
        return svgOffsetParent;
      }
      svgOffsetParent = getParentNode(svgOffsetParent);
    }
    return win;
  }
  let offsetParent = getTrueOffsetParent(element, polyfill);
  while (offsetParent && isTableElement(offsetParent) && isStaticPositioned(offsetParent)) {
    offsetParent = getTrueOffsetParent(offsetParent, polyfill);
  }
  if (offsetParent && isLastTraversableNode(offsetParent) && isStaticPositioned(offsetParent) && !isContainingBlock(offsetParent)) {
    return win;
  }
  return offsetParent || getContainingBlock(element) || win;
}
const getElementRects = async function(data) {
  const getOffsetParentFn = this.getOffsetParent || getOffsetParent;
  const getDimensionsFn = this.getDimensions;
  const floatingDimensions = await getDimensionsFn(data.floating);
  return {
    reference: getRectRelativeToOffsetParent(data.reference, await getOffsetParentFn(data.floating), data.strategy),
    floating: {
      x: 0,
      y: 0,
      width: floatingDimensions.width,
      height: floatingDimensions.height
    }
  };
};
function isRTL(element) {
  return getComputedStyle$1(element).direction === "rtl";
}
const platform = {
  convertOffsetParentRelativeRectToViewportRelativeRect,
  getDocumentElement,
  getClippingRect,
  getOffsetParent,
  getElementRects,
  getClientRects,
  getDimensions,
  getScale,
  isElement,
  isRTL
};
function rectsAreEqual(a, b) {
  return a.x === b.x && a.y === b.y && a.width === b.width && a.height === b.height;
}
function observeMove(element, onMove) {
  let io = null;
  let timeoutId;
  const root = getDocumentElement(element);
  function cleanup() {
    var _io;
    clearTimeout(timeoutId);
    (_io = io) == null || _io.disconnect();
    io = null;
  }
  function refresh(skip, threshold) {
    if (skip === void 0) {
      skip = false;
    }
    if (threshold === void 0) {
      threshold = 1;
    }
    cleanup();
    const elementRectForRootMargin = element.getBoundingClientRect();
    const {
      left,
      top,
      width,
      height
    } = elementRectForRootMargin;
    if (!skip) {
      onMove();
    }
    if (!width || !height) {
      return;
    }
    const insetTop = floor(top);
    const insetRight = floor(root.clientWidth - (left + width));
    const insetBottom = floor(root.clientHeight - (top + height));
    const insetLeft = floor(left);
    const rootMargin = -insetTop + "px " + -insetRight + "px " + -insetBottom + "px " + -insetLeft + "px";
    const options = {
      rootMargin,
      threshold: max(0, min(1, threshold)) || 1
    };
    let isFirstUpdate = true;
    function handleObserve(entries) {
      const ratio = entries[0].intersectionRatio;
      if (ratio !== threshold) {
        if (!isFirstUpdate) {
          return refresh();
        }
        if (!ratio) {
          timeoutId = setTimeout(() => {
            refresh(false, 1e-7);
          }, 1e3);
        } else {
          refresh(false, ratio);
        }
      }
      if (ratio === 1 && !rectsAreEqual(elementRectForRootMargin, element.getBoundingClientRect())) {
        refresh();
      }
      isFirstUpdate = false;
    }
    try {
      io = new IntersectionObserver(handleObserve, {
        ...options,
        // Handle <iframe>s
        root: root.ownerDocument
      });
    } catch (_e) {
      io = new IntersectionObserver(handleObserve, options);
    }
    io.observe(element);
  }
  refresh(true);
  return cleanup;
}
function autoUpdate(reference, floating, update, options) {
  if (options === void 0) {
    options = {};
  }
  const {
    ancestorScroll = true,
    ancestorResize = true,
    elementResize = typeof ResizeObserver === "function",
    layoutShift = typeof IntersectionObserver === "function",
    animationFrame = false
  } = options;
  const referenceEl = unwrapElement(reference);
  const ancestors = ancestorScroll || ancestorResize ? [...referenceEl ? getOverflowAncestors(referenceEl) : [], ...floating ? getOverflowAncestors(floating) : []] : [];
  ancestors.forEach((ancestor) => {
    ancestorScroll && ancestor.addEventListener("scroll", update, {
      passive: true
    });
    ancestorResize && ancestor.addEventListener("resize", update);
  });
  const cleanupIo = referenceEl && layoutShift ? observeMove(referenceEl, update) : null;
  let reobserveFrame = -1;
  let resizeObserver = null;
  if (elementResize) {
    resizeObserver = new ResizeObserver((_ref) => {
      let [firstEntry] = _ref;
      if (firstEntry && firstEntry.target === referenceEl && resizeObserver && floating) {
        resizeObserver.unobserve(floating);
        cancelAnimationFrame(reobserveFrame);
        reobserveFrame = requestAnimationFrame(() => {
          var _resizeObserver;
          (_resizeObserver = resizeObserver) == null || _resizeObserver.observe(floating);
        });
      }
      update();
    });
    if (referenceEl && !animationFrame) {
      resizeObserver.observe(referenceEl);
    }
    if (floating) {
      resizeObserver.observe(floating);
    }
  }
  let frameId;
  let prevRefRect = animationFrame ? getBoundingClientRect(reference) : null;
  if (animationFrame) {
    frameLoop();
  }
  function frameLoop() {
    const nextRefRect = getBoundingClientRect(reference);
    if (prevRefRect && !rectsAreEqual(prevRefRect, nextRefRect)) {
      update();
    }
    prevRefRect = nextRefRect;
    frameId = requestAnimationFrame(frameLoop);
  }
  update();
  return () => {
    var _resizeObserver2;
    ancestors.forEach((ancestor) => {
      ancestorScroll && ancestor.removeEventListener("scroll", update);
      ancestorResize && ancestor.removeEventListener("resize", update);
    });
    cleanupIo == null || cleanupIo();
    (_resizeObserver2 = resizeObserver) == null || _resizeObserver2.disconnect();
    resizeObserver = null;
    if (animationFrame) {
      cancelAnimationFrame(frameId);
    }
  };
}
const offset = offset$1;
const autoPlacement = autoPlacement$1;
const shift = shift$1;
const flip = flip$1;
const arrow = arrow$1;
const computePosition = (reference, floating, options) => {
  const cache = /* @__PURE__ */ new Map();
  const mergedOptions = {
    platform,
    ...options
  };
  const platformWithCache = {
    ...mergedOptions.platform,
    _c: cache
  };
  return computePosition$1(reference, floating, {
    ...mergedOptions,
    platform: platformWithCache
  });
};
let activeInstance = null;
function setupFloatingUI(references, options) {
  const {
    appendTo,
    content,
    onShow,
    onHide,
    theme,
    placement,
    offset: offsetVal,
    interactive,
    allowHTML = false,
    clickTrigger = true,
    role
  } = options;
  const targets = Array.isArray(references) ? references : [references];
  const mainReference = targets[0];
  let popper = null;
  let cleanup = null;
  const hide = () => {
    if (popper?.parentNode) {
      if (cleanup) {
        cleanup();
        cleanup = null;
      }
      if (onHide) onHide({ reference: mainReference, popper });
      popper.remove();
      popper = null;
      if (activeInstance === hide) activeInstance = null;
    }
  };
  const updatePosition = () => {
    if (!popper) return;
    const arrowEl = popper.querySelector(".arrow");
    const middleware = [offset(offsetVal)];
    if (placement === "auto" || placement === "auto-start" || placement === "auto-end") {
      middleware.push(
        autoPlacement({
          alignment: placement.split("-")[1] || null,
          padding: 5
        })
      );
    } else {
      middleware.push(
        flip({
          padding: 5,
          fallbackPlacements: ["bottom", "right", "left"]
        })
      );
    }
    middleware.push(shift({ padding: 5 }), arrow({ element: arrowEl }));
    computePosition(mainReference, popper, {
      placement: placement?.includes("auto") ? void 0 : placement,
      middleware
    }).then(({ x, y, placement: finalPlacement, middlewareData }) => {
      Object.assign(popper.style, { left: `${x}px`, top: `${y}px` });
      if (middlewareData.arrow) {
        const { x: ax, y: ay } = middlewareData.arrow;
        const side = { top: "bottom", right: "left", bottom: "top", left: "right" }[finalPlacement.split("-")[0]];
        Object.assign(arrowEl.style, {
          left: ax != null ? `${ax}px` : "",
          top: ay != null ? `${ay}px` : "",
          [side]: "-4px"
        });
      }
      popper.setAttribute("data-placement", finalPlacement);
    });
  };
  const show = (eventType) => {
    if (activeInstance && activeInstance !== hide) activeInstance();
    if (popper) return;
    popper = document.createElement("div");
    popper.className = `${theme || ""}`;
    popper.setAttribute("role", role || "tooltip");
    popper.style.cssText = `position: absolute; z-index: 2147483645; left: 0; top: 0;`;
    popper.innerHTML = `<div class="content"></div><div class="arrow"></div>`;
    const contentEl = popper.querySelector(".content");
    const actualContent = typeof content === "function" ? content(mainReference) : content;
    if (actualContent instanceof Node) {
      contentEl.appendChild(actualContent);
    } else if (allowHTML) {
      contentEl.innerHTML = actualContent;
    } else {
      contentEl.textContent = actualContent;
    }
    appendTo.appendChild(popper);
    activeInstance = hide;
    cleanup = autoUpdate(mainReference, popper, updatePosition);
    requestAnimationFrame(() => {
      if (popper) popper.classList.add("visible");
    });
    if (onShow) onShow({ reference: mainReference, popper, hide, eventType });
  };
  targets.forEach((target) => {
    target.addEventListener("mouseenter", () => !popper && show("mouseenter"));
    target.addEventListener("mouseleave", () => {
      const isPersistent = clickTrigger && popper?.getAttribute("data-trigger") === "click";
      if (!popper || isPersistent) return;
      if (interactive) {
        setTimeout(() => {
          const isOverAnyTarget = targets.some((t) => t.matches(":hover"));
          if (!popper?.matches(":hover") && !isOverAnyTarget) {
            hide();
          }
        }, 100);
      } else {
        hide();
      }
    });
    if (clickTrigger) {
      target.addEventListener("click", (e) => {
        e.stopPropagation();
        if (popper && popper.getAttribute("data-trigger") === "click") {
          hide();
        } else {
          if (!popper) show("click");
          popper.setAttribute("data-trigger", "click");
        }
      });
    }
  });
  return { show, hide, popper: () => popper };
}
class AnnotationTooltips extends HTMLElement {
  connectedCallback() {
    const shadowRoot = this.attachShadow({ mode: "open" });
    const style = document.createElement("style");
    style.textContent = tooltipStyles + sharedStyles;
    shadowRoot.appendChild(style);
    annotationButtons.forEach((btn) => {
      setupFloatingUI(btn, {
        interactive: true,
        offset: 8,
        theme: "sa11y-theme",
        placement: "auto-start",
        appendTo: shadowRoot,
        role: "dialog",
        content: (ref) => {
          const host = ref.getRootNode().host;
          const id = host.getAttribute("data-sa11y-annotation");
          const result = State.results.find((item) => String(item.id) === String(id));
          if (!result) return null;
          const wrapper = document.createElement("div");
          wrapper.innerHTML = `<button type="button" class="close-btn close-tooltip" aria-label="${Lang._("ALERT_CLOSE")}"></button><div class="sa11y-content-body"></div>`;
          const body = wrapper.querySelector(".sa11y-content-body");
          if (result.finalContent instanceof Node) {
            body.appendChild(result.finalContent);
          } else {
            body.textContent = result.finalContent;
          }
          let contrastDiv = body.querySelector("[data-sa11y-contrast-details]");
          if (result.contrastDetails && !contrastDiv) {
            contrastDiv = document.createElement("div");
            contrastDiv.setAttribute("data-sa11y-contrast-details", "");
            const tools = generateContrastTools(result.contrastDetails);
            contrastDiv.appendChild(tools);
            const suggestion = generateColorSuggestion(result.contrastDetails);
            if (suggestion) contrastDiv.appendChild(suggestion);
            const target = body.querySelector(".dismiss-group");
            target ? target.before(contrastDiv) : body.append(contrastDiv);
          }
          return wrapper;
        },
        onShow: ({ reference, popper, hide, eventType }) => {
          const host = reference.getRootNode().host;
          host?.setAttribute("data-sa11y-opened", "");
          const rawId = host?.getAttribute("data-sa11y-annotation");
          const issueObject = State.results.find((i) => String(i.id) === String(rawId));
          popper.setAttribute("lang", Lang._("LANG_CODE"));
          if (issueObject) popper.classList.add(issueObject.type);
          if (issueObject?.contrastDetails && !popper.hasAttribute("contrast-tools-initialized")) {
            initializeContrastTools(popper, issueObject.contrastDetails);
            popper.setAttribute("contrast-tools-initialized", "true");
          }
          const closeBtn = popper.querySelector(".close-btn");
          const handleClose = () => {
            hide();
            reference.focus();
          };
          closeBtn?.addEventListener("click", handleClose);
          const esc = (e) => e.key === "Escape" && handleClose();
          document.addEventListener("keydown", esc, { once: true });
          if (eventType === "click") {
            requestAnimationFrame(() => {
              closeBtn?.focus();
              trapFocus(popper);
            });
          }
        },
        onHide: ({ reference }) => {
          reference.getRootNode().host?.removeAttribute("data-sa11y-opened");
        }
      });
    });
  }
}
class PanelTooltips extends HTMLElement {
  connectedCallback() {
    const shadowRoot = this.attachShadow({ mode: "open" });
    const style = document.createElement("style");
    style.textContent = tooltipStyles + sharedStyles;
    shadowRoot.appendChild(style);
    const baseOptions = {
      appendTo: shadowRoot,
      offset: 8,
      theme: "sa11y-theme sa11y-panel",
      placement: "top",
      clickTrigger: false,
      allowHTML: true
      // Safe: No user supplied content here.
    };
    const shortcut = navigator.userAgent.includes("Mac") ? "Option + S" : "Alt + S";
    setupFloatingUI(Constants.Panel.skipButton, {
      ...baseOptions,
      content: `${Lang._("SKIP_TO_ISSUE")} &raquo; <br> <span class="kbd">${shortcut}</span>`
    });
    this.dismissTooltip = setupFloatingUI(Constants.Panel.dismissButton, {
      ...baseOptions,
      content: () => Lang.sprintf("PANEL_DISMISS_BUTTON", State.counts.dismissed)
    });
    const devIcon = Constants.Panel.developerItem?.querySelector(".info-icon");
    if (State.option.developerPlugin && devIcon) {
      this.devTooltip = setupFloatingUI([devIcon, Constants.Panel.developerItem], {
        ...baseOptions,
        content: Lang._("DEVELOPER_DESC")
      });
    }
    const readIcon = Constants.Panel.readabilityItem?.querySelector(".info-icon");
    if (State.option.readabilityPlugin && readIcon) {
      this.readTooltip = setupFloatingUI([readIcon, Constants.Panel.readabilityItem], {
        ...baseOptions,
        content: Lang._("READABILITY_DESC")
      });
    }
  }
}
const STORAGE_KEY = "sa11y-lang-detection";
const MAX_CACHE_SIZE = 200;
let detectorPromise = null;
function getLanguageDetector() {
  if (detectorPromise) return detectorPromise;
  detectorPromise = (async () => {
    try {
      if (!("LanguageDetector" in globalThis)) {
        if (!store.getItem(STORAGE_KEY)) {
          store.setItem(STORAGE_KEY, []);
          console.error(`Sa11y: ${Lang._("LANG_UNSUPPORTED")}`);
        }
        return null;
      }
      return await globalThis.LanguageDetector.create();
    } catch {
      console.error(`Sa11y: ${Lang._("LANG_UNSUPPORTED")}`);
      return null;
    }
  })();
  return detectorPromise;
}
const getLanguageLabel = (lang) => {
  try {
    const canonicalLang = Intl.getCanonicalLocales(lang)[0];
    const baseLang = new Intl.Locale(canonicalLang).language;
    const label = new Intl.DisplayNames(Lang._("LANG_CODE") || navigator.language, {
      type: "language"
    }).of(baseLang);
    return label;
  } catch {
    return lang;
  }
};
const primary = (lang) => String(lang).toLowerCase().split("-")[0];
const getCache = () => {
  try {
    const get = store.getItem(STORAGE_KEY);
    return get ? JSON.parse(get) : [];
  } catch (e) {
    console.error("Sa11y: Error loading cache", e);
    return [];
  }
};
const setCache = (data) => {
  if (!State.option.langOfPartsCache) {
    store.removeItem(STORAGE_KEY);
    return;
  }
  try {
    const cache = getCache().filter((item) => item.key !== data.key);
    cache.push(data);
    while (cache.length > MAX_CACHE_SIZE) cache.shift();
    store.setItem(STORAGE_KEY, JSON.stringify(cache));
  } catch (e) {
    console.error("Sa11y: Error saving cache.", e);
  }
};
const nonLatinRegex = /[^\p{Script=Latin}\p{M}\p{Z}\p{P}\p{N}\p{S}\p{C}]/u;
async function checkPageLanguage() {
  const start = performance.now();
  if (!State.option.langOfPartsPlugin) return;
  if (!await getLanguageDetector()) return;
  if (!State.option.langOfPartsCache) store.removeItem(STORAGE_KEY);
  const isDeclaredValid = Elements.Found.Language ? validateLang(Elements.Found.Language) : null;
  if (!isDeclaredValid) return;
  const declared = primary(Elements.Found.Language);
  const pageText = (Elements.Found.pageText || []).join(" ");
  if (pageText.length < 100) return;
  const cacheKey = window.location.href;
  const cached = getCache().find((item) => item.key === cacheKey);
  const langChanged = cached?.declared && cached.declared !== declared;
  let isStale = cached && (Math.abs(cached.textLength - pageText.length) > 5 || langChanged);
  if (cached && !isStale && cached.element) {
    const currentElement = find(cached.element, "root")[0];
    if (!currentElement) {
      isStale = true;
    } else if (currentElement.getAttribute("lang") === cached.args[0]) {
      isStale = true;
    }
  }
  if (cached && !isStale) {
    if (cached.test) {
      const getElement = cached.element ? find(cached.element, "root")[0] : null;
      const elementText = getElement ? getText(getElement) : null;
      const processArgs = cached.args.map((arg) => getLanguageLabel(arg));
      const finalArgs = [...processArgs];
      if (elementText) finalArgs.push(elementText);
      const mainContent = Lang.sprintf(
        State.option.checks[cached.test].content || [cached.test],
        ...finalArgs
      );
      const contentContainer = document.createElement("div");
      contentContainer.append(mainContent);
      if (cached.element) {
        contentContainer.append(" ", Lang.sprintf("LANG_TIP"));
      }
      State.results.push({
        element: getElement || null,
        test: cached.test,
        type: State.option.checks[cached.test].type || cached.type,
        content: contentContainer,
        dismiss: prepareDismissal(cached.test),
        developer: State.option.checks[cached.test].developer ?? false,
        confidence: cached.confidence,
        textLength: cached.textLength,
        cached: true
      });
    }
    return;
  }
  const detector = await getLanguageDetector();
  const detected = await detector.detect(pageText);
  const detectedLangCode = primary(detected[0].detectedLanguage);
  let test = null;
  let type = null;
  let content = null;
  let element = null;
  let dismiss = null;
  let confidence = null;
  let args = null;
  if (detectedLangCode !== declared) {
    test = "PAGE_LANG_CONFIDENCE";
    content = Lang.sprintf(
      State.option.checks.PAGE_LANG_CONFIDENCE.content || "PAGE_LANG_CONFIDENCE",
      getLanguageLabel(detectedLangCode),
      getLanguageLabel(declared)
    );
    dismiss = prepareDismissal(cacheKey);
    type = detected[0].confidence >= 0.6 ? "error" : "warning";
    confidence = detected[0].confidence;
    args = [detectedLangCode, declared];
    setCache({
      key: cacheKey,
      test,
      type,
      args,
      confidence,
      textLength: pageText.length,
      declared
    });
  }
  if (detectedLangCode === declared) {
    const langAttributes = find("[lang]", "root");
    const confidenceTarget = State.option.PAGE_LANG_CONFIDENCE?.confidence || 0.95;
    if (detected[0].confidence >= confidenceTarget && langAttributes.length === 0) {
      setCache({
        key: cacheKey,
        textLength: pageText.length,
        declared,
        confidence: detected[0].confidence
      });
      return;
    }
    for (let i = 0; i < Elements.Found.Everything.length; i++) {
      const node = Elements.Found.Everything[i];
      const isImage = node.nodeName === "IMG";
      if (!isImage) {
        if (!node.textContent) continue;
        const isShort = node.textContent.length < 30;
        const hasNonEnglish = nonLatinRegex.test(node.textContent);
        if (isShort && !hasNonEnglish) {
          continue;
        }
      }
      let textString = "";
      if (isImage) {
        textString = node.alt || "";
      } else {
        textString = Array.from(node.childNodes).filter((child) => child.nodeType === Node.TEXT_NODE).map((child) => child.textContent).join(" ");
      }
      const nodeText = normalizeString(textString);
      if (nodeText.length <= 30 && !nonLatinRegex.test(nodeText)) continue;
      const detectNode = await detector.detect(nodeText);
      const nodeLang = primary(detectNode[0].detectedLanguage);
      const nodeConfidence = detectNode[0].confidence;
      if (nodeConfidence >= 0.6) {
        const langAttribute = node.getAttribute("lang") ? primary(node.getAttribute("lang")) : "";
        const selector = generateSelectorPath(node);
        if (langAttribute && langAttribute !== nodeLang) {
          test = "LANG_MISMATCH";
          content = Lang.sprintf(
            State.option.checks.LANG_MISMATCH.content || "LANG_MISMATCH",
            getLanguageLabel(nodeLang),
            getLanguageLabel(langAttribute),
            textString
          );
          args = [nodeLang, langAttribute];
        } else if (!langAttribute && nodeLang !== declared) {
          if (isImage && node.alt) {
            test = "LANG_OF_PARTS_ALT";
            content = Lang.sprintf(
              State.option.checks.LANG_OF_PARTS_ALT.content || "LANG_OF_PARTS_ALT",
              getLanguageLabel(nodeLang),
              getLanguageLabel(declared),
              node.alt
            );
            args = [nodeLang, declared, node.alt];
          } else {
            test = "LANG_OF_PARTS";
            content = Lang.sprintf(
              State.option.checks.LANG_OF_PARTS.content || "LANG_OF_PARTS",
              getLanguageLabel(declared),
              getLanguageLabel(nodeLang),
              textString
            );
            args = [declared, nodeLang];
          }
        } else {
          continue;
        }
        element = node;
        type = nodeConfidence >= 0.9 ? "error" : "warning";
        dismiss = prepareDismissal(nodeText.slice(0, 256));
        confidence = nodeConfidence;
        setCache({
          key: cacheKey,
          test,
          element: selector,
          type,
          args,
          confidence: nodeConfidence,
          textLength: pageText.length,
          declared
        });
        break;
      }
    }
  }
  if (test) {
    const wrapper = document.createElement("div");
    wrapper.append(content, " ", Lang.sprintf("LANG_TIP"));
    State.results.push({
      element,
      test,
      type: State.option.checks[test].type || type,
      content: element ? wrapper : content,
      dismiss,
      developer: State.option.checks[test].developer ?? false,
      cached: false,
      pageText: pageText.length,
      confidence,
      time: `${(performance.now() - start).toFixed(2)}ms`
    });
  }
}
async function updateResults() {
  const { option } = State;
  const ignoreByTest = option.ignoreByTest || {};
  const devChecks = store.getItem("sa11y-developer");
  const isDevOff = !devChecks || devChecks === "Off";
  State.results = State.results.filter((issue, _, src) => {
    if (issue.isWithinRoot === false || (isDevOff || option.externalDeveloperChecks) && issue.developer || isDevOff && issue.external)
      return false;
    if (State.option.langOfPartsPlugin && issue?.element?.tagName === "IMG" && issue.type === "good") {
      return !src.some(
        (i) => i.element === issue.element && (i.type === "error" || i.type === "warning") && i.element?.alt === issue.element?.alt
      );
    }
    if (State.option.langOfPartsPlugin && issue.test === "PAGE_LANG_CONFIDENCE") {
      return !src.some(
        (i) => i.test === "META_LANG" || i.test === "META_LANG_SUGGEST" || i.test === "META_LANG_VALID"
      );
    }
    if (ignoreByTest[issue.test] && issue.element) {
      try {
        if (issue.element.matches(ignoreByTest[issue.test])) return false;
      } catch (e) {
        console.error(`Sa11y: Invalid CSS selector for ignoreByTest prop "${issue.test}"`, e);
      }
    }
    return true;
  });
  await Promise.all(
    State.results.map(async (item, id) => {
      item.id = id;
      item.cssPath = option.selectorPath ? generateSelectorPath(item.element) : "";
      item.htmlPath = item.element?.outerHTML.replace(/\s{2,}/g, " ").trim() || "";
      if (item.dismiss) item.dismissDigest = await dismissDigest(item.dismiss);
      if (typeof item.content === "string") {
        const wrapper = document.createElement("div");
        wrapper.innerHTML = sanitizeHTML(item.content);
        item.content = wrapper;
      }
      const validTypes = ["error", "warning", "good"];
      if (item.type && validTypes.indexOf(item.type) === -1) {
        throw Error(`Invalid type [${item.type}] for annotation`);
      }
      const mapLabel = {
        [validTypes[0]]: Lang._("ERROR"),
        [validTypes[1]]: Lang._("WARNING"),
        [validTypes[2]]: Lang._("GOOD")
      };
      item.issueLabel = mapLabel[item.type];
    })
  );
  if (!option.headless) syncUI();
  const duration = `${(performance.now() - State.start).toFixed(2)}ms`;
  const detail = { results: State.results, page: window.location.pathname, time: duration };
  window.sa11yCheckComplete = detail;
  document.dispatchEvent(new CustomEvent("sa11y-check-complete", { detail }));
}
async function syncUI() {
  State.imageResults = Elements.Found.Images.map(
    (image) => State.results.find((i) => i.element === image)
  ).filter(Boolean).map(({ element, type, dismissDigest: dismissDigest2, developer }) => ({
    element,
    type,
    dismissDigest: dismissDigest2,
    developer
  }));
  initializeDismissals();
  updateCount();
  updateBadge();
  if (store.getItem("sa11y-panel") === "Opened") {
    const counts = /* @__PURE__ */ new Map();
    State.results.forEach((issue) => {
      if (issue.element) {
        if (!issue.margin) {
          const index2 = counts.get(issue.element) || 0;
          counts.set(issue.element, index2 + 1);
          issue.margin = `${index2 * 20 + (issue.inline ? 0 : 15)}px`;
        }
        issue.finalContent = issue?.content?.cloneNode(true);
        issue.finalContent.setAttribute("lang", Lang._("LANG_CODE"));
        issue.finalContent.className = issue.type;
        const reviewText = issue.type === "good" && ["IMAGE_PASS", "LINK_LABEL"].some((val) => issue.test.includes(val)) ? Lang._("REVIEW") : issue.issueLabel;
        const header = document.createElement("h2");
        header.textContent = reviewText;
        issue.finalContent?.prepend(header);
        const dismissable = State.option.dismissAnnotations && (issue.type === "warning" || issue.type === "good");
        const showDismissAll = dismissable && State.option.dismissAll && typeof issue.dismissAll === "string";
        const showDismiss = dismissable && issue.dismiss;
        if (showDismiss || showDismissAll) {
          const container = document.createElement("div");
          container.className = "dismiss-group";
          const createBtn = (text, isAll) => {
            const btn = document.createElement("button");
            btn.type = "button";
            btn.textContent = Lang._(text);
            btn.setAttribute("data-sa11y-dismiss", issue.id);
            if (isAll) btn.setAttribute("data-sa11y-dismiss-all", "");
            return btn;
          };
          if (showDismiss) container.append(createBtn("DISMISS", false));
          if (showDismissAll) container.append(createBtn("DISMISS_ALL", true));
          issue.finalContent.append(container);
        }
        if (State.option.unitTestMode) {
          const test = Lang.sprintf(
            "<hr><strong>Test ID:</strong> <code>%(TEST)</code>",
            issue.test
          );
          issue.finalContent.append(test);
        }
      }
      annotate(issue);
    });
    Elements.initializeAnnotations();
    document.body.appendChild(new AnnotationTooltips());
    dismissButtons();
    generatePageOutline();
    generateImageOutline();
    updatePanel();
    skipToIssue();
    exportResults();
    if (State.option.langOfPartsPlugin && await getLanguageDetector() === null) {
      createAlert(Lang.sprintf("LANG_UNSUPPORTED"), null, null, true);
    }
    isScrollable(Constants.Panel.pageIssuesList, Constants.Panel.pageIssuesContent);
  }
  Constants.Panel.toggle.disabled = false;
}
const url = [
  ".avif",
  ".png",
  ".jpg",
  ".jpeg",
  ".webp",
  ".gif",
  ".tiff",
  ".svg",
  ".heif",
  ".heic",
  "http"
];
function checkImages() {
  const susAltWords = State.option.susAltStopWords ? State.option.susAltStopWords.split(",").map((word) => word.trim().toLowerCase()).filter(Boolean) : Lang._("SUS_ALT_STOPWORDS");
  const placeholderAltSet = new Set(Lang._("PLACEHOLDER_ALT_STOPWORDS"));
  const altPlaceholderPattern = generateRegexString(State.option.altPlaceholder, true);
  const linkIgnoreStringPattern = generateRegexString(State.option.linkIgnoreStrings);
  const extraPlaceholderStopWords = State.option.extraPlaceholderStopWords.split(",").map((word) => word.trim().toLowerCase()).filter(Boolean);
  const containsAltTextStopWords = (alt) => {
    const altLowerCase = removeWhitespace(alt).toLowerCase();
    const altOnlyLetters = removeWhitespace(altLowerCase.replace(/[^\p{L}\s]/gu, ""));
    const hit = [null, null, null];
    for (const urlHit of url) {
      if (altLowerCase.includes(urlHit)) {
        hit[0] = urlHit;
        break;
      }
    }
    if (!hit[0]) {
      const match = altLowerCase.match(/\b\d{2,6}\s*x\s*\d{2,6}\b/);
      if (match) hit[0] = match[0];
    }
    for (const word of susAltWords) {
      const index2 = altLowerCase.indexOf(word);
      if (index2 > -1 && index2 < 6) {
        hit[1] = word;
        break;
      }
    }
    if (placeholderAltSet.has(altLowerCase) || placeholderAltSet.has(altOnlyLetters)) {
      hit[2] = alt;
    }
    if (extraPlaceholderStopWords.length) {
      for (const word of extraPlaceholderStopWords) {
        const index2 = altLowerCase.indexOf(word);
        if (index2 > -1 && index2 < 6) {
          hit[2] = word;
          break;
        }
      }
    }
    return hit;
  };
  Elements.Found.Images.forEach(($el) => {
    const alt = computeAriaLabel($el) === "noAria" ? $el.getAttribute("alt") ?? $el.getAttribute("title") : computeAriaLabel($el);
    if ($el.height < 2 && $el.width < 2 && (isElementHidden($el) || alt === "")) {
      return;
    }
    const link = getCachedClosest(
      $el,
      State.option.imageWithinLightbox ? `a[href]:not(${State.option.imageWithinLightbox})` : "a[href]"
    );
    if (isHiddenAndUnfocusable(link)) return;
    const src = $el.getAttribute("src") ? $el.getAttribute("src").split("?")[0] : $el.getAttribute("srcset");
    const linkText = link ? fnIgnore(link, Constants.Exclusions.LinkSpan).textContent.replace(
      linkIgnoreStringPattern,
      ""
    ) : "";
    const linkTextLength = removeWhitespace(linkText).length;
    if (alt === null) {
      if (link) {
        const hasAriaHiddenOrPresentationRole = linkTextLength > 0 && (isPresentational($el) || isAriaHidden($el));
        if (!hasAriaHiddenOrPresentationRole) {
          const rule = linkTextLength === 0 ? State.option.checks.MISSING_ALT_LINK : State.option.checks.MISSING_ALT_LINK_HAS_TEXT;
          const conditional = linkTextLength === 0 ? "MISSING_ALT_LINK" : "MISSING_ALT_LINK_HAS_TEXT";
          if (rule) {
            State.results.push({
              test: conditional,
              element: $el,
              type: rule.type || "error",
              content: Lang.sprintf(rule.content || conditional),
              dismiss: prepareDismissal(`${conditional + src + linkTextLength}`),
              dismissAll: rule.dismissAll ? conditional : false,
              developer: rule.developer || false
            });
          }
        }
      } else if (State.option.checks.MISSING_ALT) {
        State.results.push({
          test: "MISSING_ALT",
          element: $el,
          type: State.option.checks.MISSING_ALT.type || "error",
          content: Lang.sprintf(State.option.checks.MISSING_ALT.content || "MISSING_ALT"),
          dismiss: prepareDismissal(`MISSING_ALT ${src}`),
          dismissAll: State.option.checks.MISSING_ALT.dismissAll ? "MISSING_ALT" : false,
          developer: State.option.checks.MISSING_ALT.developer || false
        });
      }
      return;
    }
    const altText = removeWhitespace(alt);
    const hasAria = $el.getAttribute("aria-label") || $el.getAttribute("aria-labelledby");
    if (State.option.checks.MISSING_ALT) {
      if (hasAria && alt === "") {
        State.results.push({
          test: "MISSING_ALT",
          element: $el,
          type: State.option.checks.MISSING_ALT.type || "error",
          content: Lang.sprintf(State.option.checks.MISSING_ALT.content || "MISSING_ALT"),
          dismiss: prepareDismissal(`MISSING_ALT ${hasAria + src}`),
          dismissAll: State.option.checks.MISSING_ALT.dismissAll ? "MISSING_ALT" : false,
          developer: State.option.checks.MISSING_ALT.developer || false
        });
        return;
      }
    }
    let decorative = alt === "";
    const figure = getCachedClosest($el, "figure");
    const figcaption = figure?.querySelector("figcaption");
    const figcaptionText = figcaption ? getText(figcaption) : "";
    const maxAltCharactersLinks = State.option.checks.LINK_IMAGE_LONG_ALT.maxLength || 250;
    const maxAltCharacters = State.option.checks.IMAGE_ALT_TOO_LONG.maxLength || 250;
    if (!decorative && State.option.altPlaceholder.length) {
      decorative = alt.match(altPlaceholderPattern)?.[0];
    }
    if (decorative) {
      if (getCachedClosest($el, `button, [role='button']`)) return;
      const carouselSources = State.option.checks.IMAGE_DECORATIVE_CAROUSEL.sources;
      const carousel = carouselSources ? getCachedClosest($el, carouselSources) : "";
      if (carousel) {
        const numberOfSlides = carousel.querySelectorAll("img");
        const rule = numberOfSlides.length === 1 ? State.option.checks.IMAGE_DECORATIVE : State.option.checks.IMAGE_DECORATIVE_CAROUSEL;
        const conditional = numberOfSlides.length === 1 ? "IMAGE_DECORATIVE" : "IMAGE_DECORATIVE_CAROUSEL";
        if (rule) {
          State.results.push({
            test: conditional,
            element: $el,
            type: rule.type || "warning",
            content: Lang.sprintf(rule.content || conditional),
            dismiss: prepareDismissal(conditional + src),
            dismissAll: rule.dismissAll ? conditional : false,
            developer: rule.developer || false
          });
        }
      } else if (link) {
        const rule = linkTextLength === 0 ? State.option.checks.LINK_IMAGE_NO_ALT_TEXT : State.option.checks.LINK_IMAGE_TEXT;
        const conditional = linkTextLength === 0 ? "LINK_IMAGE_NO_ALT_TEXT" : "LINK_IMAGE_TEXT";
        if (rule) {
          State.results.push({
            test: conditional,
            element: $el,
            type: rule.type || (linkTextLength === 0 ? "error" : "good"),
            content: Lang.sprintf(rule.content || conditional),
            dismiss: prepareDismissal(`${conditional + src + linkTextLength}`),
            dismissAll: rule.dismissAll ? conditional : false,
            developer: rule.developer || false
          });
        }
      } else if (figure) {
        const rule = figcaption && figcaptionText.length ? State.option.checks.IMAGE_FIGURE_DECORATIVE : State.option.checks.IMAGE_DECORATIVE;
        const conditional = figcaption && figcaptionText.length ? "IMAGE_FIGURE_DECORATIVE" : "IMAGE_DECORATIVE";
        if (rule) {
          State.results.push({
            test: conditional,
            element: $el,
            type: rule.type || "warning",
            content: Lang.sprintf(rule.content || conditional),
            dismiss: prepareDismissal(`${conditional + src + figcaptionText}`),
            dismissAll: rule.dismissAll ? conditional : false,
            developer: rule.developer || false
          });
        }
      } else if (State.option.checks.IMAGE_DECORATIVE) {
        State.results.push({
          test: "IMAGE_DECORATIVE",
          element: $el,
          type: State.option.checks.IMAGE_DECORATIVE.type || "warning",
          content: Lang.sprintf(State.option.checks.IMAGE_DECORATIVE.content || "IMAGE_DECORATIVE"),
          dismiss: prepareDismissal(`IMAGE_DECORATIVE ${src}`),
          dismissAll: State.option.checks.IMAGE_DECORATIVE.dismissAll ? "IMAGE_DECORATIVE" : false,
          developer: State.option.checks.IMAGE_DECORATIVE.developer || false
        });
      }
      return;
    }
    const unpronounceable = link ? State.option.checks.LINK_ALT_UNPRONOUNCEABLE : State.option.checks.ALT_UNPRONOUNCEABLE;
    if (unpronounceable) {
      if (alt.replace(/"|'|\?|\.|-|\s+/g, "") === "" && linkTextLength === 0) {
        const conditional = link ? "LINK_ALT_UNPRONOUNCEABLE" : "ALT_UNPRONOUNCEABLE";
        State.results.push({
          test: conditional,
          element: $el,
          type: unpronounceable.type || "error",
          content: Lang.sprintf(unpronounceable.content || conditional, altText),
          args: [altText],
          dismiss: prepareDismissal(`${conditional + src}`),
          dismissAll: unpronounceable.dismissAll ? "ALT_UNPRONOUNCEABLE" : false,
          developer: unpronounceable.developer || false
        });
        return;
      }
    }
    const error = containsAltTextStopWords(altText);
    const maybeBadAlt = link ? State.option.checks.LINK_ALT_MAYBE_BAD : State.option.checks.ALT_MAYBE_BAD;
    const isTooLongSingleWord = new RegExp(`^\\S{${maybeBadAlt.minLength || 15},}$`);
    const containsNonAlphaChar = /[^\p{L}\-,.!? ]/u.test(altText);
    const isBadFilename = new RegExp(
      `^(?=[^_-]*([_-][^_-]*){3,})\\S{${maybeBadAlt.minLength || 15},}$`
    ).test(altText);
    const hasTooMuchNoise = /^(?:\s*\d){5,}\s*$/.test(altText) || // Is a number longer than 5 digits.
    (altText.match(/[_-]/g) || []).length >= 3;
    if (error[0] !== null) {
      const rule = link ? State.option.checks.LINK_ALT_FILE_EXT : State.option.checks.ALT_FILE_EXT;
      const conditional = link ? "LINK_ALT_FILE_EXT" : "ALT_FILE_EXT";
      if (rule) {
        State.results.push({
          test: conditional,
          element: $el,
          type: rule.type || "error",
          content: Lang.sprintf(rule.content || conditional, error[0], altText),
          args: [error[0], altText],
          dismiss: prepareDismissal(`${conditional + src + alt}`),
          dismissAll: rule.dismissAll ? conditional : false,
          developer: rule.developer || false
        });
      }
    } else if (error[2] !== null) {
      const rule = link ? State.option.checks.LINK_PLACEHOLDER_ALT : State.option.checks.ALT_PLACEHOLDER;
      const conditional = link ? "LINK_PLACEHOLDER_ALT" : "ALT_PLACEHOLDER";
      if (rule) {
        State.results.push({
          test: conditional,
          element: $el,
          type: rule.type || "error",
          content: Lang.sprintf(rule.content || conditional, altText),
          args: [altText],
          dismiss: prepareDismissal(`${conditional + src + alt}`),
          dismissAll: rule.dismissAll ? conditional : false,
          developer: rule.developer || false
        });
      }
    } else if (error[1] !== null) {
      const rule = link ? State.option.checks.LINK_SUS_ALT : State.option.checks.SUS_ALT;
      const conditional = link ? "LINK_SUS_ALT" : "SUS_ALT";
      if (rule) {
        State.results.push({
          test: conditional,
          element: $el,
          type: rule.type || "warning",
          content: Lang.sprintf(rule.content || conditional, error[1], altText),
          args: [error[1], altText],
          dismiss: prepareDismissal(`${conditional + src + alt}`),
          dismissAll: rule.dismissAll ? conditional : false,
          developer: rule.developer || false
        });
      }
    } else if (isBadFilename || maybeBadAlt && isTooLongSingleWord.test(alt) && containsNonAlphaChar) {
      const rule = link ? State.option.checks.LINK_ALT_MAYBE_BAD : State.option.checks.ALT_MAYBE_BAD;
      const conditional = link ? "LINK_ALT_MAYBE_BAD" : "ALT_MAYBE_BAD";
      if (rule) {
        State.results.push({
          test: conditional,
          element: $el,
          type: rule.type || "error",
          content: Lang.sprintf(rule.content || conditional, altText),
          args: [altText],
          dismiss: prepareDismissal(`${conditional + src + alt}`),
          dismissAll: rule.dismissAll ? conditional : false,
          developer: rule.developer || false
        });
      }
    } else if (hasTooMuchNoise) {
      const conditional = link ? "LINK_ALT_MAYBE_BAD" : "ALT_MAYBE_BAD";
      const rule = link ? State.option.checks.LINK_ALT_MAYBE_BAD_WARNING : State.option.checks.ALT_MAYBE_BAD_WARNING;
      if (rule) {
        State.results.push({
          test: link ? "LINK_ALT_MAYBE_BAD_WARNING" : "ALT_MAYBE_BAD_WARNING",
          element: $el,
          type: rule.type || "warning",
          content: Lang.sprintf(rule.content || conditional, altText),
          args: [altText],
          dismiss: prepareDismissal(`${conditional}WARNING${src + alt} `),
          dismissAll: rule.dismissAll ? conditional : false,
          developer: rule.developer || false
        });
      }
    } else if (link ? alt.length > maxAltCharactersLinks : alt.length > maxAltCharacters) {
      const rule = link ? State.option.checks.LINK_IMAGE_LONG_ALT : State.option.checks.IMAGE_ALT_TOO_LONG;
      const conditional = link ? "LINK_IMAGE_LONG_ALT" : "IMAGE_ALT_TOO_LONG";
      if (rule) {
        State.results.push({
          test: conditional,
          element: $el,
          type: rule.type || "warning",
          content: Lang.sprintf(rule.content || conditional, alt.length, altText),
          args: [alt.length, altText],
          dismiss: prepareDismissal(`${conditional + src + alt}`),
          dismissAll: rule.dismissAll ? conditional : false,
          developer: rule.developer || false
        });
      }
    } else if (link) {
      const rule = linkTextLength === 0 ? State.option.checks.LINK_IMAGE_ALT : State.option.checks.LINK_IMAGE_ALT_AND_TEXT;
      const conditional = linkTextLength === 0 ? "LINK_IMAGE_ALT" : "LINK_IMAGE_ALT_AND_TEXT";
      if (rule) {
        const linkAccName = computeAccessibleName(link);
        const accName = removeWhitespace(linkAccName);
        const tooltip = Lang.sprintf(
          linkTextLength === 0 ? Lang._("LINK_IMAGE_ALT") : Lang._("LINK_IMAGE_ALT_AND_TEXT") + Lang._("ACC_NAME_TIP"),
          altText,
          accName
        );
        State.results.push({
          test: conditional,
          element: $el,
          type: rule.type || "warning",
          content: rule.content ? Lang.sprintf(rule.content, altText, accName) : tooltip,
          args: [altText, accName],
          dismiss: prepareDismissal(`${conditional + src + alt}`),
          dismissAll: rule.dismissAll ? conditional : false,
          developer: rule.developer || false
        });
      }
    } else if (figure) {
      const duplicate = !!figcaption && figcaptionText.toLowerCase() === alt.toLowerCase();
      if (duplicate) {
        if (State.option.checks.IMAGE_FIGURE_DUPLICATE_ALT) {
          State.results.push({
            test: "IMAGE_FIGURE_DUPLICATE_ALT",
            element: $el,
            type: State.option.checks.IMAGE_FIGURE_DUPLICATE_ALT.type || "warning",
            content: Lang.sprintf(
              State.option.checks.IMAGE_FIGURE_DUPLICATE_ALT.content || "IMAGE_FIGURE_DUPLICATE_ALT",
              altText
            ),
            args: [altText],
            dismiss: prepareDismissal(`IMAGE_FIGURE_DUPLICATE_ALT ${src}`),
            dismissAll: State.option.checks.IMAGE_FIGURE_DUPLICATE_ALT.dismissAll ? "IMAGE_FIGURE_DUPLICATE_ALT" : false,
            developer: State.option.checks.IMAGE_FIGURE_DUPLICATE_ALT.developer || false
          });
        }
      } else if (State.option.checks.IMAGE_PASS) {
        State.results.push({
          test: "IMAGE_PASS",
          element: $el,
          type: State.option.checks.IMAGE_PASS.type || "good",
          content: Lang.sprintf(State.option.checks.IMAGE_PASS.content || "IMAGE_PASS", altText),
          args: [altText],
          dismiss: prepareDismissal(`IMAGE_PASS FIGURE ${src + alt}`),
          dismissAll: State.option.checks.IMAGE_PASS.dismissAll ? "IMAGE_PASS" : false,
          developer: State.option.checks.IMAGE_PASS.developer || false
        });
      }
    } else if (State.option.checks.IMAGE_PASS) {
      const button = getCachedClosest($el, 'button, [role="button"]');
      if (!button) {
        State.results.push({
          test: "IMAGE_PASS",
          element: $el,
          type: State.option.checks.IMAGE_PASS.type || "good",
          content: Lang.sprintf(State.option.checks.IMAGE_PASS.content || "IMAGE_PASS", altText),
          args: [altText],
          dismiss: prepareDismissal(`IMAGE_PASS ${src + alt}`),
          dismissAll: State.option.checks.IMAGE_PASS.dismissAll ? "IMAGE_PASS" : false,
          developer: State.option.checks.IMAGE_PASS.developer || false
        });
      }
    }
    const title = $el.getAttribute("title");
    if (title !== null && title.trim().toLowerCase() === $el.getAttribute("alt")?.trim().toLowerCase()) {
      if (State.option.checks.DUPLICATE_TITLE) {
        State.results.push({
          test: "DUPLICATE_TITLE",
          element: $el,
          type: State.option.checks.DUPLICATE_TITLE.type || "warning",
          content: Lang.sprintf(State.option.checks.DUPLICATE_TITLE.content || "DUPLICATE_TITLE"),
          inline: true,
          dismiss: prepareDismissal(`DUPLICATE_TITLE ${alt}`),
          dismissAll: State.option.checks.DUPLICATE_TITLE.dismissAll ? "DUPLICATE_TITLE" : false,
          developer: State.option.checks.DUPLICATE_TITLE.developer || false
        });
      }
    }
  });
}
function checkHeaders() {
  let prevLevel;
  let prevHeadingText = "";
  const stringExclusionPattern = generateRegexString(State.option.headerIgnoreStrings);
  Elements.Found.Headings.forEach(($el, i) => {
    const accName = computeAccessibleName($el, Constants.Exclusions.HeaderSpan);
    const stringMatchExclusions = accName.replace(stringExclusionPattern, "");
    const headingText = removeWhitespace(stringMatchExclusions);
    const rootContainsHeading = Constants.Root.areaToCheck.some((root) => root.contains($el));
    const rootContainsShadowHeading = Constants.Root.areaToCheck.some(
      (root) => root.contains($el.getRootNode().host)
    );
    const isWithinRoot = rootContainsHeading || rootContainsShadowHeading;
    const headingStartsOverride = Elements.Found.HeadingOverrideStart.get($el);
    if (headingStartsOverride) {
      prevLevel = headingStartsOverride;
    }
    const level = parseInt($el.getAttribute("aria-level") || $el.tagName.slice(1), 10);
    const headingLength = headingText.length;
    const maxHeadingLength = State.option.checks.HEADING_LONG.maxLength || 160;
    let test = null;
    let type = null;
    let content = null;
    let developer = null;
    let dismissAll = null;
    let margin = null;
    let args = null;
    if (headingLength === 0) {
      const image = $el.querySelector("img");
      if (image) {
        const alt = image?.getAttribute("alt");
        if (image && (!alt || alt.trim() === "" || accName === "")) {
          if (State.option.checks.HEADING_EMPTY_WITH_IMAGE) {
            test = "HEADING_EMPTY_WITH_IMAGE";
            type = State.option.checks.HEADING_EMPTY_WITH_IMAGE.type || "error";
            content = Lang.sprintf(
              State.option.checks.HEADING_EMPTY_WITH_IMAGE.content || "HEADING_EMPTY_WITH_IMAGE",
              level
            );
            args = [level];
            developer = State.option.checks.HEADING_EMPTY_WITH_IMAGE.developer || false;
            dismissAll = State.option.checks.HEADING_EMPTY_WITH_IMAGE.dismissAll ? "HEADING_EMPTY_WITH_IMAGE" : false;
            margin = "-15px 30px";
          }
        }
      } else if (State.option.checks.HEADING_EMPTY) {
        test = "HEADING_EMPTY";
        type = State.option.checks.HEADING_EMPTY.type || "error";
        content = Lang.sprintf(State.option.checks.HEADING_EMPTY.content || "HEADING_EMPTY", level);
        args = [level];
        developer = State.option.checks.HEADING_EMPTY.developer || false;
        dismissAll = State.option.checks.HEADING_EMPTY.dismissAll ? "HEADING_EMPTY" : false;
        margin = "0";
      }
    } else if (level - prevLevel > 1 && (i !== 0 || headingStartsOverride)) {
      if (State.option.checks.HEADING_SKIPPED_LEVEL) {
        test = "HEADING_SKIPPED_LEVEL";
        type = State.option.checks.HEADING_SKIPPED_LEVEL.type || "error";
        content = Lang.sprintf(
          State.option.checks.HEADING_SKIPPED_LEVEL.content || "HEADING_SKIPPED_LEVEL",
          prevLevel,
          level,
          truncateString(headingText, 60),
          truncateString(prevHeadingText, 60),
          prevLevel + 1
        );
        args = [
          prevLevel,
          level,
          truncateString(headingText, 60),
          truncateString(prevHeadingText, 60),
          prevLevel + 1
        ];
        developer = State.option.checks.HEADING_SKIPPED_LEVEL.developer || false;
        dismissAll = State.option.checks.HEADING_SKIPPED_LEVEL.dismissAll ? "HEADING_SKIPPED_LEVEL" : false;
      }
    } else if (i === 0 && level !== 1 && level !== 2) {
      if (State.option.checks.HEADING_FIRST) {
        test = "HEADING_FIRST";
        type = State.option.checks.HEADING_FIRST.type || "error";
        content = Lang.sprintf(State.option.checks.HEADING_FIRST.content || "HEADING_FIRST");
        developer = State.option.checks.HEADING_FIRST.developer || false;
        dismissAll = State.option.checks.HEADING_FIRST.dismissAll ? "HEADING_FIRST" : false;
      }
    } else if (headingLength > maxHeadingLength) {
      if (State.option.checks.HEADING_LONG) {
        test = "HEADING_LONG";
        type = State.option.checks.HEADING_LONG.type || "warning";
        content = Lang.sprintf(
          State.option.checks.HEADING_LONG.content || "HEADING_LONG",
          maxHeadingLength,
          headingLength,
          headingText
        );
        args = [maxHeadingLength, headingLength, headingText];
        developer = State.option.checks.HEADING_LONG.developer || false;
        dismissAll = State.option.checks.HEADING_LONG.dismissAll ? "HEADING_LONG" : false;
      }
    }
    if (content && type) {
      State.results.push({
        test,
        element: $el,
        type,
        content,
        args,
        dismiss: prepareDismissal(`${test + level + headingText}`),
        dismissAll,
        isWithinRoot,
        developer,
        margin
      });
    }
    prevLevel = level;
    prevHeadingText = headingText;
    if (!Elements.Found.OutlineIgnore.includes($el)) {
      State.headingOutline.push({
        element: $el,
        headingLevel: level,
        text: headingText,
        type,
        dismiss: prepareDismissal(`${test + level + headingText}`),
        isWithinRoot
      });
    }
  });
  if (State.option.checks.HEADING_MISSING_ONE && Elements.Found.HeadingOne.length === 0) {
    State.results.push({
      test: "HEADING_MISSING_ONE",
      type: State.option.checks.HEADING_MISSING_ONE.type || "warning",
      content: Lang.sprintf(
        State.option.checks.HEADING_MISSING_ONE.content || "HEADING_MISSING_ONE"
      ),
      dismiss: "HEADING_MISSING_ONE",
      developer: State.option.checks.HEADING_MISSING_ONE.developer || false
    });
  }
}
const defaultFileTypes = [
  "pdf",
  "doc",
  "docx",
  "word",
  "mp3",
  "ppt",
  "text",
  "pptx",
  "txt",
  "exe",
  "dmg",
  "rtf",
  "windows",
  "macos",
  "csv",
  "xls",
  "xlsx",
  "mp4",
  "mov",
  "avi",
  "zip"
];
const cssFileTypeSelectors = 'a[href$=".pdf"], a[href$=".doc"], a[href$=".docx"], a[href$=".zip"], a[href$=".mp3"], a[href$=".txt"], a[href$=".exe"], a[href$=".dmg"], a[href$=".rtf"], a[href$=".pptx"], a[href$=".ppt"], a[href$=".xls"], a[href$=".xlsx"], a[href$=".csv"], a[href$=".mp4"], a[href$=".mov"], a[href$=".avi"]';
const citationPattern = /(doi\.org\/|dl\.acm\.org\/|link\.springer\.com\/|pubmed\.ncbi\.nlm\.nih\.gov\/|scholar\.google\.com\/|ieeexplore\.ieee\.org\/|researchgate\.net\/publication\/|sciencedirect\.com\/science\/article\/|10\.\d{4,}\/)[a-z0-9/.-]+/i;
const urlEndings = /\b(?:\.edu\/|\.gob\/|\.gov\/|\.app\/|\.com\/|\.net\/|\.org\/|\.us\/|\.ca\/|\.de\/|\.icu\/|\.uk\/|\.ru\/|\.info\/|\.top\/|\.xyz\/|\.tk\/|\.cn\/|\.ga\/|\.cf\/|\.nl\/|\.io\/|\.fr\/|\.pe\/|\.nz\/|\.pt\/|\.es\/|\.pl\/|\.ua\/)\b/i;
const specialCharPattern = /[^a-zA-Z0-9]/;
const htmlSymbols = /([<>↣↳←→↓«»↴]+)/;
const checkStopWords = (textContent, stopWordsSet, stripStrings) => {
  const stripped = textContent.replace(stripStrings, "").trim();
  if (stopWordsSet.has(stripped)) return stripped;
  return null;
};
function checkLinkText() {
  const customStopWords = State.option.linkStopWords ? State.option.linkStopWords.split(",").map((word) => word.toLowerCase().trim()) : [];
  const linkStopWords = /* @__PURE__ */ new Set([...Lang._("LINK_STOPWORDS"), ...customStopWords]);
  const linkIgnoreStrings = new Set(
    State.option.linkIgnoreStrings.map((word) => word.toLowerCase())
  );
  const clickRegex = generateRegexString(Lang._("CLICK"));
  const newWindowRegex = generateRegexString(Lang._("NEW_WINDOW_PHRASES"));
  const fileTypeRegex = generateRegexString(defaultFileTypes);
  const ignorePattern = generateRegexString(State.option.linkIgnoreStrings);
  const seen = {};
  Elements.Found.Links.forEach(($el) => {
    const href = $el.href ? standardizeHref($el) : "";
    const titleAttr = $el.getAttribute("title");
    const targetBlank = $el.getAttribute("target")?.trim()?.toLowerCase() === "_blank";
    const ariaLabel = $el.getAttribute("aria-label");
    const ariaLabelledby = $el.getAttribute("aria-labelledby");
    const childLabelledby = !ariaLabelledby ? $el.querySelector("[aria-labelledby]") : null;
    const hasAriaLabelledby = ariaLabelledby || childLabelledby;
    const hasAria = hasAriaLabelledby || ariaLabel || $el.querySelector("[aria-label]");
    const accName = removeWhitespace(
      computeAccessibleName($el, Constants.Exclusions.LinkSpan)
    );
    const linkText = accName.replace(ignorePattern, "");
    const lowercaseLinkText = linkText.toLowerCase();
    const strippedLinkText = stripAllSpecialCharacters(lowercaseLinkText);
    const textContent = getText($el).toLowerCase();
    const textContentIgnoredStrings = getText(
      fnIgnore($el, Constants.Exclusions.LinkSpan)
    ).replace(ignorePattern, "");
    const containsNewWindowPhrases = lowercaseLinkText.match(newWindowRegex)?.[0] || textContent.match(newWindowRegex)?.[0];
    const containsFileTypePhrases = lowercaseLinkText.match(fileTypeRegex)?.[0] || textContent.match(fileTypeRegex)?.[0];
    const fileTypeMatch = $el.matches(cssFileTypeSelectors);
    if (!$el.querySelector("img")) {
      if (hasAria && linkText.length !== 0) {
        const excludeSpan = fnIgnore($el, Constants.Exclusions.LinkSpan);
        const visibleLinkText = getText(excludeSpan).replace(ignorePattern, "");
        const cleanedString = stripAllSpecialCharacters(visibleLinkText);
        const stopword = checkStopWords(cleanedString, linkStopWords);
        const visibleTextInName = isVisibleTextInAccName(
          $el,
          accName,
          Constants.Exclusions.LinkSpan,
          State.option.linkIgnoreStrings
        );
        if (State.option.checks.LINK_STOPWORD_ARIA && stopword !== null) {
          State.results.push({
            test: "LINK_STOPWORD_ARIA",
            element: $el,
            type: State.option.checks.LINK_STOPWORD_ARIA.type || "warning",
            content: Lang.sprintf(
              State.option.checks.LINK_STOPWORD_ARIA.content || Lang._("LINK_STOPWORD_ARIA") + Lang._("LINK_TIP"),
              stopword,
              linkText
            ),
            args: [stopword, linkText],
            inline: true,
            dismiss: prepareDismissal(`LINK_STOPWORD_ARIA ${strippedLinkText}`),
            dismissAll: State.option.checks.LINK_STOPWORD_ARIA.dismissAll ? " LINK_STOPWORD_ARIA" : false,
            developer: State.option.checks.LINK_STOPWORD_ARIA.developer || true
          });
        } else if (State.option.checks.LABEL_IN_NAME && visibleTextInName && textContent.length !== 0) {
          State.results.push({
            test: "LABEL_IN_NAME",
            element: $el,
            type: State.option.checks.LABEL_IN_NAME.type || "warning",
            content: Lang.sprintf(
              State.option.checks.LABEL_IN_NAME.content || Lang._("LABEL_IN_NAME") + Lang._("ACC_NAME_TIP"),
              textContentIgnoredStrings,
              linkText
            ),
            args: [textContentIgnoredStrings, linkText],
            inline: true,
            position: "afterend",
            dismiss: prepareDismissal(`LABEL_IN_NAME ${strippedLinkText}`),
            dismissAll: State.option.checks.LABEL_IN_NAME.dismissAll ? "BTN_LABEL_IN_NAME" : false,
            developer: State.option.checks.LABEL_IN_NAME.developer || true
          });
        } else if (State.option.checks.LINK_LABEL) {
          State.results.push({
            test: "LINK_LABEL",
            element: $el,
            type: State.option.checks.LINK_LABEL.type || "good",
            content: Lang.sprintf(
              State.option.checks.LINK_LABEL.content || Lang._("ACC_NAME") + Lang._("ACC_NAME_TIP"),
              linkText
            ),
            args: [linkText],
            inline: true,
            position: "afterend",
            dismiss: prepareDismissal(`LINK_LABEL ${strippedLinkText}`),
            dismissAll: State.option.checks.LINK_LABEL.dismissAll ? "LINK_LABEL" : false,
            developer: State.option.checks.LINK_LABEL.developer || true
          });
        }
      }
      let oneStop;
      const addStopWordResult = (element) => {
        if (State.option.checks.LINK_STOPWORD && !oneStop) {
          oneStop = true;
          State.results.push({
            test: "LINK_STOPWORD",
            element,
            type: State.option.checks.LINK_STOPWORD.type || "error",
            content: Lang.sprintf(
              State.option.checks.LINK_STOPWORD.content || Lang._("LINK_STOPWORD") + Lang._("LINK_TIP"),
              linkText
            ),
            args: [linkText],
            inline: true,
            position: "afterend",
            dismiss: prepareDismissal(`LINK_STOPWORD ${strippedLinkText}`),
            dismissAll: State.option.checks.LINK_STOPWORD.dismissAll ? "LINK_STOPWORD" : false,
            developer: State.option.checks.LINK_STOPWORD.developer || false
          });
        }
      };
      const isLinkIgnoreStrings = checkStopWords(textContent, linkIgnoreStrings);
      if (isLinkIgnoreStrings === textContent || isLinkIgnoreStrings === strippedLinkText) {
        addStopWordResult($el);
      } else if (containsNewWindowPhrases === textContent || containsNewWindowPhrases === strippedLinkText) {
        addStopWordResult($el);
        return;
      }
      if (linkText.length === 0) {
        if (hasAriaLabelledby) {
          if (State.option.checks.LINK_EMPTY_LABELLEDBY) {
            State.results.push({
              test: "LINK_EMPTY_LABELLEDBY",
              element: $el,
              type: State.option.checks.LINK_EMPTY_LABELLEDBY.type || "error",
              content: Lang.sprintf(
                State.option.checks.LINK_EMPTY_LABELLEDBY.content || "LINK_EMPTY_LABELLEDBY"
              ),
              inline: true,
              position: "afterend",
              dismiss: prepareDismissal(`LINK_EMPTY_LABELLEDBY ${href}`),
              dismissAll: State.option.checks.LINK_EMPTY_LABELLEDBY.dismissAll ? "LINK_EMPTY_LABELLEDBY" : false,
              developer: State.option.checks.LINK_EMPTY_LABELLEDBY.developer || true
            });
          }
        } else if ($el.children.length) {
          let hasStopWordWarning = false;
          if (State.option.linkIgnoreSpan) {
            const spanEl = $el.querySelector(State.option.linkIgnoreSpan);
            if (spanEl) {
              const spanText = stripAllSpecialCharacters(spanEl.textContent).trim().toLowerCase();
              if (spanText === textContent) {
                addStopWordResult($el);
                hasStopWordWarning = true;
              }
            }
          }
          if (!hasStopWordWarning && State.option.checks.LINK_EMPTY_NO_LABEL) {
            State.results.push({
              test: "LINK_EMPTY_NO_LABEL",
              element: $el,
              type: State.option.checks.LINK_EMPTY_NO_LABEL.type || "error",
              content: Lang.sprintf(
                State.option.checks.LINK_EMPTY_NO_LABEL.content || "LINK_EMPTY_NO_LABEL"
              ),
              inline: true,
              position: "afterend",
              dismiss: prepareDismissal(`LINK_EMPTY_NO_LABEL ${href}`),
              dismissAll: State.option.checks.LINK_EMPTY_NO_LABEL.dismissAll ? "LINK_EMPTY_NO_LABEL" : false,
              developer: State.option.checks.LINK_EMPTY_NO_LABEL.developer || false
            });
          }
        } else if (!isLinkIgnoreStrings && State.option.checks.LINK_EMPTY) {
          State.results.push({
            test: "LINK_EMPTY",
            element: $el,
            type: State.option.checks.LINK_EMPTY.type || "error",
            content: Lang.sprintf(State.option.checks.LINK_EMPTY.content || "LINK_EMPTY"),
            inline: true,
            position: "afterend",
            dismiss: prepareDismissal(`LINK_EMPTY ${href}`),
            dismissAll: State.option.checks.LINK_EMPTY.dismissAll ? "LINK_EMPTY" : false,
            developer: State.option.checks.LINK_EMPTY.developer || false
          });
        }
        return;
      }
      const isStopWord = checkStopWords(strippedLinkText, linkStopWords, newWindowRegex);
      const hasClickWord = strippedLinkText.match(clickRegex)?.[0] || textContent.match(clickRegex)?.[0];
      const isCitation = lowercaseLinkText.match(citationPattern)?.[0];
      const hasUrlPrefix = lowercaseLinkText.startsWith("www.") || lowercaseLinkText.startsWith("http");
      const hasUrlEnding = Boolean(lowercaseLinkText.match(urlEndings));
      const isUrlFragment = hasUrlPrefix || hasUrlEnding;
      const isSingleSpecialChar = linkText.length === 1 && specialCharPattern.test(linkText);
      const matchedSymbol = lowercaseLinkText.match(htmlSymbols)?.[0];
      if (isStopWord) {
        addStopWordResult($el);
      } else if (isCitation) {
        if (linkText.length > 8) {
          if (State.option.checks.LINK_DOI) {
            State.results.push({
              test: "LINK_DOI",
              element: $el,
              type: State.option.checks.LINK_DOI.type || "warning",
              content: Lang.sprintf(State.option.checks.LINK_DOI.content || "LINK_DOI", linkText),
              args: [linkText],
              inline: true,
              dismiss: prepareDismissal(`LINK_DOI ${strippedLinkText}`),
              dismissAll: State.option.checks.LINK_DOI.dismissAll ? "LINK_DOI" : false,
              developer: State.option.checks.LINK_DOI.developer || false
            });
          }
        }
      } else if (isUrlFragment) {
        if (!hasAria && linkText.length > (State.option.checks.LINK_URL.maxLength || 40)) {
          if (State.option.checks.LINK_URL) {
            State.results.push({
              test: "LINK_URL",
              element: $el,
              type: State.option.checks.LINK_URL.type || "warning",
              content: Lang.sprintf(
                State.option.checks.LINK_URL.content || Lang._("LINK_URL") + Lang._("LINK_TIP"),
                linkText
              ),
              args: [linkText],
              inline: true,
              dismiss: prepareDismissal(`LINK_URL ${strippedLinkText}`),
              dismissAll: State.option.checks.LINK_URL.dismissAll ? "LINK_URL" : false,
              developer: State.option.checks.LINK_URL.developer || false
            });
          }
        }
      } else if (matchedSymbol && linkText.length > 1) {
        if (State.option.checks.LINK_SYMBOLS) {
          State.results.push({
            test: "LINK_SYMBOLS",
            element: $el,
            type: State.option.checks.LINK_SYMBOLS.type || "warning",
            content: Lang.sprintf(
              State.option.checks.LINK_SYMBOLS.content || "LINK_SYMBOLS",
              matchedSymbol,
              linkText
            ),
            args: [matchedSymbol, linkText],
            inline: true,
            dismiss: prepareDismissal(`LINK_SYMBOLS ${strippedLinkText}`),
            dismissAll: State.option.checks.LINK_SYMBOLS.dismissAll ? "LINK_SYMBOLS" : false,
            developer: State.option.checks.LINK_SYMBOLS.developer || false
          });
        }
      } else if ((isSingleSpecialChar || matchedSymbol) && !titleAttr) {
        if (State.option.checks.LINK_UNPRONOUNCEABLE) {
          State.results.push({
            test: "LINK_UNPRONOUNCEABLE",
            element: $el,
            type: State.option.checks.LINK_UNPRONOUNCEABLE.type || "error",
            content: Lang.sprintf(
              State.option.checks.LINK_UNPRONOUNCEABLE.content || Lang._("LINK_UNPRONOUNCEABLE") + Lang._("LINK_TIP"),
              linkText
            ),
            args: [linkText],
            inline: true,
            position: "afterend",
            dismiss: prepareDismissal(`LINK_UNPRONOUNCEABLE ${href}`),
            dismissAll: State.option.checks.LINK_UNPRONOUNCEABLE.dismissAll ? "LINK_UNPRONOUNCEABLE" : false,
            developer: State.option.checks.LINK_UNPRONOUNCEABLE.developer || false
          });
        }
        return;
      }
      if (hasClickWord) {
        if (State.option.checks.LINK_CLICK_HERE) {
          State.results.push({
            test: "LINK_CLICK_HERE",
            element: $el,
            type: State.option.checks.LINK_CLICK_HERE.type || "warning",
            content: Lang.sprintf(
              State.option.checks.LINK_CLICK_HERE.content || Lang._("LINK_CLICK_HERE") + Lang._("LINK_TIP"),
              linkText
            ),
            args: [linkText],
            inline: true,
            dismiss: prepareDismissal(`LINK_CLICK_HERE ${strippedLinkText}`),
            dismissAll: State.option.checks.LINK_CLICK_HERE.dismissAll ? "LINK_CLICK_HERE" : false,
            developer: State.option.checks.LINK_CLICK_HERE.developer || false
          });
        }
      }
      if (textContent.length !== 0 && titleAttr?.toLowerCase() === linkText.toLowerCase()) {
        if (State.option.checks.DUPLICATE_TITLE) {
          State.results.push({
            test: "DUPLICATE_TITLE",
            element: $el,
            type: State.option.checks.DUPLICATE_TITLE.type || "warning",
            content: Lang.sprintf(State.option.checks.DUPLICATE_TITLE.content || "DUPLICATE_TITLE"),
            inline: true,
            dismiss: prepareDismissal(`DUPLICATE_TITLE ${strippedLinkText}`),
            dismissAll: State.option.checks.DUPLICATE_TITLE.dismissAll ? "DUPLICATE_TITLE" : false,
            developer: State.option.checks.DUPLICATE_TITLE.developer || false
          });
        }
      }
    }
    if (strippedLinkText.length !== 0) {
      if (seen[strippedLinkText] && !seen[href]) {
        const ignored = isHiddenAndUnfocusable($el);
        const hasAttributes = $el.hasAttribute("role") || isDisabled($el);
        const condition = linkText.toLowerCase() !== textContentIgnoredStrings.toLowerCase();
        const diffAccName = condition ? `<hr> ${Lang._("ACC_NAME")}` : `<hr> ${Lang._("LINK_TEXT")}`;
        const variable = condition ? linkText : textContentIgnoredStrings;
        if (State.option.checks.LINK_IDENTICAL_NAME && !hasAttributes && !ignored) {
          State.results.push({
            test: "LINK_IDENTICAL_NAME",
            element: $el,
            type: State.option.checks.LINK_IDENTICAL_NAME.type || "warning",
            content: Lang.sprintf(
              State.option.checks.LINK_IDENTICAL_NAME.content || Lang._("LINK_IDENTICAL_NAME") + diffAccName + Lang._("LINK_TIP"),
              variable
            ),
            args: [textContentIgnoredStrings, linkText],
            inline: true,
            dismiss: prepareDismissal(`LINK_IDENTICAL_NAME ${strippedLinkText}`),
            dismissAll: State.option.checks.LINK_IDENTICAL_NAME.dismissAll ? "LINK_IDENTICAL_NAME" : false,
            developer: State.option.checks.LINK_IDENTICAL_NAME.developer || false
          });
        }
      } else {
        seen[strippedLinkText] = href;
        seen[href] = true;
      }
      if (targetBlank && !fileTypeMatch && !containsNewWindowPhrases) {
        const condition = linkText.toLowerCase() !== textContentIgnoredStrings.toLowerCase();
        const diffAccName = condition ? `<hr> ${Lang._("ACC_NAME") + Lang._("ACC_NAME_TIP")}` : `<hr> ${Lang._("LINK_TEXT")}`;
        if (State.option.checks.LINK_NEW_TAB) {
          State.results.push({
            test: "LINK_NEW_TAB",
            element: $el,
            type: State.option.checks.LINK_NEW_TAB.type || "warning",
            content: Lang.sprintf(
              State.option.checks.LINK_NEW_TAB.content || Lang._("LINK_NEW_TAB") + diffAccName,
              linkText
            ),
            args: [linkText],
            inline: true,
            dismiss: prepareDismissal(`LINK_NEW_TAB ${strippedLinkText}`),
            dismissAll: State.option.checks.LINK_NEW_TAB.dismissAll ? "LINK_NEW_TAB" : false,
            developer: State.option.checks.LINK_NEW_TAB.developer || false
          });
        }
      }
      if (fileTypeMatch && !containsFileTypePhrases) {
        if (State.option.checks.LINK_FILE_EXT) {
          State.results.push({
            test: "LINK_FILE_EXT",
            element: $el,
            type: State.option.checks.LINK_FILE_EXT.type || "warning",
            content: Lang.sprintf(
              State.option.checks.LINK_FILE_EXT.content || "LINK_FILE_EXT",
              linkText
            ),
            args: [linkText],
            inline: true,
            dismiss: prepareDismissal(`LINK_FILE_EXT ${strippedLinkText}`),
            dismissAll: State.option.checks.LINK_FILE_EXT.dismissAll ? "LINK_FILE_EXT" : false,
            developer: State.option.checks.LINK_FILE_EXT.developer || false
          });
        }
      }
    }
    const hasExtension = $el.matches(Constants.Global.documentSources);
    const hasPDF = $el.matches('a[href$=".pdf"], a[href*=".pdf?"]');
    if (State.option.checks.QA_DOCUMENT && hasExtension) {
      State.results.push({
        test: "QA_DOCUMENT",
        element: $el,
        type: State.option.checks.QA_DOCUMENT.type || "warning",
        content: Lang.sprintf(State.option.checks.QA_DOCUMENT.content || "QA_DOCUMENT", linkText),
        args: [linkText],
        inline: true,
        dismiss: prepareDismissal(`QA_DOCUMENT ${href}`),
        dismissAll: State.option.checks.QA_DOCUMENT.dismissAll ? "QA_DOCUMENT" : false,
        developer: State.option.checks.QA_DOCUMENT.developer || false
      });
    } else if (State.option.checks.QA_PDF && hasPDF) {
      State.results.push({
        test: "QA_PDF",
        element: $el,
        type: State.option.checks.QA_PDF.type || "warning",
        content: Lang.sprintf(State.option.checks.QA_PDF.content || "QA_PDF", linkText),
        args: [linkText],
        inline: true,
        dismiss: prepareDismissal(`QA_PDF ${href}`),
        dismissAll: State.option.checks.QA_PDF.dismissAll ? "QA_PDF" : false,
        developer: State.option.checks.QA_PDF.developer || false
      });
    }
    if (State.option.checks.QA_IN_PAGE_LINK || State.option.checks.LINK_MAYBE_BUTTON) {
      const hasText = getText($el).length !== 0;
      const ignored = isHiddenAndUnfocusable($el);
      const hasAttributes = $el.hasAttribute("role") || $el.hasAttribute("aria-haspopup") || $el.hasAttribute("aria-expanded") || $el.hasAttribute("onclick") || isDisabled($el) || !!getCachedClosest($el, 'nav, [role="navigation"]');
      const rawHref = $el.getAttribute("href");
      if ((!rawHref || rawHref.startsWith("#")) && hasText && !ignored && !hasAttributes) {
        const targetId = rawHref.substring(1);
        const ariaControls = $el.getAttribute("aria-controls");
        const decoded = targetId ? decodeURIComponent(targetId) : "";
        const encoded = targetId ? encodeURIComponent(targetId) : "";
        const targetElement = targetId && (document.getElementById(targetId) || ariaControls && document.getElementById(ariaControls) || decoded !== targetId && document.getElementById(decoded) || encoded !== targetId && document.getElementById(encoded) || document.querySelector(`a[name="${CSS.escape(targetId)}"]`));
        if (!targetElement) {
          let isFauxButton = false;
          if (State.option.checks.LINK_MAYBE_BUTTON) {
            const keywords = Lang._("POTENTIAL_UI_ELEMENTS");
            const matchedKeyword = keywords.find((word) => accName.toLowerCase().includes(word));
            if (matchedKeyword && accName.length <= 15) {
              isFauxButton = true;
              State.results.push({
                test: "LINK_MAYBE_BUTTON",
                element: $el,
                type: State.option.checks.LINK_MAYBE_BUTTON.type || "error",
                content: Lang.sprintf(
                  State.option.checks.LINK_MAYBE_BUTTON.content || "LINK_MAYBE_BUTTON",
                  matchedKeyword,
                  accName
                ),
                args: [matchedKeyword, accName],
                inline: true,
                dismiss: prepareDismissal(`LINK_MAYBE_BUTTON_${matchedKeyword}`),
                dismissAll: State.option.checks.LINK_MAYBE_BUTTON.dismissAll ? "LINK_MAYBE_BUTTON" : false,
                developer: State.option.checks.LINK_MAYBE_BUTTON.developer || true
              });
            }
          }
          if (State.option.checks.QA_IN_PAGE_LINK && !isFauxButton) {
            State.results.push({
              test: "QA_IN_PAGE_LINK",
              element: $el,
              type: State.option.checks.QA_IN_PAGE_LINK.type || "error",
              content: Lang.sprintf(
                State.option.checks.QA_IN_PAGE_LINK.content || "QA_IN_PAGE_LINK",
                targetId,
                accName
              ),
              args: [targetId, accName],
              inline: true,
              dismiss: prepareDismissal(`QA_IN_PAGE_LINK ${href}`),
              dismissAll: State.option.checks.QA_IN_PAGE_LINK.dismissAll ? "QA_IN_PAGE_LINK" : false,
              developer: State.option.checks.QA_IN_PAGE_LINK.developer || false
            });
          }
        }
      }
    }
  });
}
function checkContrast() {
  if (!State.option.contrastPlugin) return;
  const contrastResults = [];
  const elements = Elements.Found.Contrast;
  const contrastAlgorithm = State.option.contrastAlgorithm;
  const shadowDetection = Constants.Global.shadowDetection;
  const inputTags = /* @__PURE__ */ new Set(["SELECT", "INPUT", "TEXTAREA"]);
  for (let i = 0; i < elements.length; i++) {
    const $el = elements[i];
    const checkInputs = inputTags.has($el.tagName);
    let text = "";
    if (!checkInputs) {
      const nodes = $el.childNodes;
      for (let j = 0; j < nodes.length; j++) {
        if (nodes[j].nodeType === 3) text += nodes[j].textContent;
      }
      text = text.trim();
      if (!text) continue;
    }
    const style = getCachedStyle($el);
    const opacity = parseFloat(style.opacity);
    const fontSize = parseFloat(style.fontSize);
    if (opacity === 0 || fontSize === 0 || isElementHidden($el)) continue;
    if (isScreenReaderOnly($el)) continue;
    if (isDisabled($el) || isDisabled(getCachedClosest($el, "label")?.control) || isDisabled(getCachedClosest($el, "fieldset")) || isDisabled(getCachedClosest($el, '[role="group"]')))
      continue;
    if (!checkInputs && !/[\p{L}\p{N}]/u.test(text)) continue;
    const color = convertToRGBA(style.color, opacity);
    const getFontWeight = style.fontWeight;
    const fontWeight = normalizeFontWeight(getFontWeight);
    const background = getBackground($el, shadowDetection);
    const isLargeText = fontSize >= 24 || fontSize >= 18.67 && fontWeight >= 700;
    if (color === "unsupported" || background === "unsupported") {
      contrastResults.push({
        $el,
        type: "unsupported",
        fontSize,
        fontWeight,
        isLargeText,
        opacity,
        ...background !== "unsupported" && { background },
        ...color !== "unsupported" && { color }
      });
      continue;
    }
    if (color && color[3] === 0) continue;
    if (background.type === "image") {
      const extractColours = extractColorFromString(background.value);
      const hasFailure = !extractColours || extractColours.some(
        (gradientStop) => checkElementContrast(
          $el,
          color,
          gradientStop,
          fontSize,
          fontWeight,
          opacity,
          contrastAlgorithm
        )
      );
      if (hasFailure || background.value.includes("url(")) {
        contrastResults.push({
          $el,
          type: "background-image",
          color,
          isLargeText,
          background,
          fontSize,
          fontWeight,
          opacity
        });
      }
    } else if (getHex(color) !== getHex(background)) {
      const result = checkElementContrast(
        $el,
        color,
        background,
        fontSize,
        fontWeight,
        opacity,
        contrastAlgorithm
      );
      if (result) {
        result.type = checkInputs ? "input" : "text";
        contrastResults.push(result);
      }
    }
  }
  Elements.Found.Svg.forEach(($el) => {
    const generalWarning = { $el, type: "svg-warning" };
    const background = getBackground($el, Constants.Global.shadowDetection);
    const hasBackground = background !== "unsupported" && background.type !== "image";
    const shapes = $el.querySelectorAll("path, rect, circle, ellipse, polygon, text, use");
    const complex = $el.querySelectorAll(
      "*:not(path):not(rect):not(circle):not(ellipse):not(polygon):not(text):not(use):not(title)"
    );
    let allSameColour = false;
    if (shapes.length) {
      const ref = getCachedStyle(shapes[0]);
      allSameColour = Array.from(shapes).every((node) => {
        const style = getCachedStyle(node);
        return style.fill === ref.fill && style.fillOpacity === ref.fillOpacity && style.stroke === ref.stroke && style.strokeOpacity === ref.strokeOpacity && style.opacity === ref.opacity;
      });
    }
    if ((shapes.length === 1 || allSameColour) && complex.length === 0) {
      const style = getCachedStyle(shapes[0]);
      const { fill, stroke, strokeWidth, opacity } = style;
      let strokePx = 0;
      const { width, height } = $el.getBBox();
      if (stroke && stroke !== "none") {
        if (strokeWidth.endsWith("%")) {
          strokePx = parseFloat(strokeWidth) / 100 * Math.min(width, height);
        } else {
          strokePx = ["inherit", "initial", "unset"].includes(strokeWidth) ? 1 : parseFloat(strokeWidth);
        }
      }
      const threshold = Math.min(width, height) < 50 ? 1 : 3;
      const hasStroke = stroke && strokePx >= threshold && stroke !== "none";
      const hasFill = fill && fill !== "none" && !fill.startsWith("url(");
      const resolvedFill = fill === "currentColor" ? convertToRGBA(getCachedStyle(shapes[0]).color, opacity) : convertToRGBA(fill, opacity);
      const resolvedStroke = stroke === "currentColor" ? convertToRGBA(getCachedStyle(shapes[0]).color, opacity) : convertToRGBA(stroke, opacity);
      const supported = ![resolvedFill, resolvedStroke].includes("unsupported");
      if (supported && hasBackground) {
        let contrastValue;
        let fillPasses = false;
        let strokePasses = false;
        if (hasFill) {
          contrastValue = calculateContrast(
            resolvedFill,
            background,
            State.option.contrastAlgorithm
          );
          fillPasses = State.option.contrastAlgorithm === "APCA" ? contrastValue.ratio >= 45 : contrastValue.ratio >= 3;
        }
        if (hasStroke) {
          contrastValue = calculateContrast(
            resolvedStroke,
            background,
            State.option.contrastAlgorithm
          );
          strokePasses = State.option.contrastAlgorithm === "APCA" ? contrastValue.ratio >= 45 : contrastValue.ratio >= 3;
        }
        const failsBoth = hasFill && hasStroke && !fillPasses && !strokePasses;
        const failsFill = hasFill && !hasStroke && !fillPasses;
        const failsStroke = !hasFill && hasStroke && !strokePasses;
        if (failsBoth || failsFill || failsStroke) {
          const bgHex = getHex(background);
          const fillHex = getHex(resolvedFill);
          const strokeHex = getHex(resolvedStroke);
          if (fillHex === bgHex && !hasStroke || strokeHex === bgHex && !hasFill) {
            return;
          }
          contrastResults.push({
            $el,
            ratio: ratioToDisplay(contrastValue.ratio, State.option.contrastAlgorithm),
            color: contrastValue.blendedColor,
            type: "svg-error",
            isLargeText: true,
            // To push a suggested colour (3:1).
            background
          });
        }
      } else {
        if (hasFill && resolvedFill !== "unsupported") {
          generalWarning.color = resolvedFill;
        } else if (hasStroke && resolvedStroke !== "unsupported") {
          generalWarning.color = resolvedStroke;
        }
        if (hasBackground) {
          generalWarning.background = background;
        }
        contrastResults.push(generalWarning);
      }
    } else {
      if (hasBackground) {
        generalWarning.background = background;
      }
      contrastResults.push(generalWarning);
    }
  });
  Elements.Found.Inputs.forEach(($el) => {
    if ($el.placeholder && $el.placeholder.length !== 0) {
      const placeholder = getCachedStyle($el, "::placeholder");
      const pColor = convertToRGBA(placeholder.getPropertyValue("color"));
      const pSize = parseFloat(placeholder.fontSize);
      const pWeight = normalizeFontWeight(placeholder.fontWeight);
      const pBackground = getBackground($el, Constants.Global.shadowDetection);
      const pOpacity = parseFloat(placeholder.opacity);
      if (pColor === "unsupported") {
        contrastResults.push({ $el, type: "placeholder-unsupported" });
      } else if (pBackground.type === "image") ;
      else {
        const result = checkElementContrast(
          $el,
          pColor,
          pBackground,
          pSize,
          pWeight,
          pOpacity,
          State.option.contrastAlgorithm
        );
        if (result) {
          result.type = "placeholder";
          contrastResults.push(result);
        }
      }
    }
  });
  const processWarnings = (warnings) => {
    const backgroundImages = warnings.filter((warning) => warning.type === "background-image");
    const otherWarnings = warnings.filter((warning) => warning.type !== "background-image");
    let processedBackgroundWarnings;
    if (State.option.contrastAlgorithm === "APCA") {
      processedBackgroundWarnings = backgroundImages.map((warning) => ({ ...warning }));
    } else {
      const groupedWarnings = backgroundImages.reduce((groups, warning) => {
        const grouped = groups;
        const groupKey = JSON.stringify({
          background: warning.background.value,
          color: warning.color,
          isLargeText: warning.isLargeText
        });
        if (!grouped[groupKey]) {
          grouped[groupKey] = [];
        }
        grouped[groupKey].push(warning);
        return grouped;
      }, {});
      processedBackgroundWarnings = Object.values(groupedWarnings).map((group) => ({
        ...group[0]
      }));
    }
    return [...processedBackgroundWarnings, ...otherWarnings];
  };
  const processedResults = processWarnings(contrastResults);
  processedResults.forEach((item) => {
    const { $el, ratio } = item;
    const updatedItem = item;
    const element = $el.tagName === "OPTION" ? getCachedClosest($el, "datalist, select, optgroup") : $el;
    const nodeText = fnIgnore(element, ["option:not(option:first-child)"]);
    const text = getText(nodeText);
    const truncatedText = truncateString(text, 80);
    let previewText;
    if (item.type === "placeholder" || item.type === "placeholder-unsupported") {
      previewText = $el.placeholder;
    } else if (item.type === "svg-error" || item.type === "svg-warning") {
      previewText = "";
    } else {
      previewText = truncatedText;
    }
    updatedItem.previewText = previewText;
    const isWcag = State.option.contrastAlgorithm === "AA" || State.option.contrastAlgorithm === "AAA";
    const normal = State.option.contrastAlgorithm === "AAA" ? "7:1" : "4.5:1";
    const large = State.option.contrastAlgorithm === "AAA" ? "4.5:1" : "3:1";
    const ratioToDisplay2 = item.isLargeText ? large : normal;
    const ratioRequirementKey = item.isLargeText ? "CONTRAST_LARGE" : "CONTRAST_NORMAL";
    switch (item.type) {
      case "text":
        if (State.option.checks.CONTRAST_ERROR) {
          State.results.push({
            test: "CONTRAST_ERROR",
            element: $el,
            type: State.option.checks.CONTRAST_ERROR.type || "error",
            content: Lang.sprintf(
              State.option.checks.CONTRAST_ERROR.content || (isWcag ? `${Lang._("CONTRAST_ERROR")} ${Lang._(ratioRequirementKey)}` : Lang._("CONTRAST_ERROR")),
              ratioToDisplay2
            ),
            dismiss: prepareDismissal(`CONTRAST_ERROR ${previewText}`),
            dismissAll: State.option.checks.CONTRAST_ERROR.dismissAll ? "CONTRAST_ERROR" : false,
            developer: State.option.checks.CONTRAST_ERROR.developer || false,
            contrastDetails: updatedItem
          });
        }
        break;
      case "input":
        if (State.option.checks.CONTRAST_INPUT) {
          State.results.push({
            test: "CONTRAST_INPUT",
            element,
            type: State.option.checks.CONTRAST_INPUT.type || "error",
            content: Lang.sprintf(
              State.option.checks.CONTRAST_INPUT.content || (isWcag ? `${Lang._("CONTRAST_INPUT")} ${Lang._(ratioRequirementKey)}` : Lang._("CONTRAST_INPUT")),
              ratio,
              ratioToDisplay2
            ),
            dismiss: prepareDismissal(`CONTRAST_INPUT ${$el.outerHTML}`),
            dismissAll: State.option.checks.CONTRAST_INPUT.dismissAll ? "CONTRAST_INPUT" : false,
            developer: State.option.checks.CONTRAST_INPUT.developer || true,
            contrastDetails: updatedItem
          });
        }
        break;
      case "placeholder":
        if (State.option.checks.CONTRAST_PLACEHOLDER) {
          State.results.push({
            test: "CONTRAST_PLACEHOLDER",
            element: $el,
            type: State.option.checks.CONTRAST_PLACEHOLDER.type || "error",
            content: Lang.sprintf(
              State.option.checks.CONTRAST_PLACEHOLDER.content || (isWcag ? `${Lang._("CONTRAST_PLACEHOLDER")} ${Lang._(ratioRequirementKey)}` : Lang._("CONTRAST_PLACEHOLDER")),
              ratioToDisplay2
            ),
            position: "afterend",
            dismiss: prepareDismissal(`CONTRAST_PLACEHOLDER ${$el.outerHTML}`),
            dismissAll: State.option.checks.CONTRAST_PLACEHOLDER.dismissAll ? "CONTRAST_PLACEHOLDER" : false,
            developer: State.option.checks.CONTRAST_PLACEHOLDER.developer || true,
            contrastDetails: updatedItem
          });
        }
        break;
      case "placeholder-unsupported":
        if (State.option.checks.CONTRAST_PLACEHOLDER_UNSUPPORTED) {
          State.results.push({
            test: "CONTRAST_PLACEHOLDER_UNSUPPORTED",
            element: $el,
            type: State.option.checks.CONTRAST_PLACEHOLDER_UNSUPPORTED.type || "warning",
            content: Lang.sprintf(
              State.option.checks.CONTRAST_PLACEHOLDER_UNSUPPORTED.content || (isWcag ? `${Lang._("CONTRAST_PLACEHOLDER_UNSUPPORTED")} ${Lang._(ratioRequirementKey)}` : Lang._("CONTRAST_PLACEHOLDER_UNSUPPORTED")),
              ratioToDisplay2
            ),
            position: "afterend",
            dismiss: prepareDismissal(`CONTRAST_PLACEHOLDER_UNSUPPORTED ${$el.outerHTML}`),
            dismissAll: State.option.checks.CONTRAST_PLACEHOLDER_UNSUPPORTED.dismissAll ? "CONTRAST_PLACEHOLDER_UNSUPPORTED" : false,
            developer: State.option.checks.CONTRAST_PLACEHOLDER_UNSUPPORTED.developer || true,
            contrastDetails: updatedItem
          });
        }
        break;
      case "svg-error":
        if (State.option.checks.CONTRAST_ERROR_GRAPHIC) {
          State.results.push({
            test: "CONTRAST_ERROR_GRAPHIC",
            element: $el,
            type: State.option.checks.CONTRAST_ERROR_GRAPHIC.type || "error",
            content: Lang.sprintf(
              State.option.checks.CONTRAST_ERROR_GRAPHIC.content || (State.option.contrastAlgorithm !== "APCA" ? `${Lang._("CONTRAST_ERROR_GRAPHIC")} ${Lang._("CONTRAST_TIP_GRAPHIC")}` : Lang._("CONTRAST_ERROR_GRAPHIC"))
            ),
            dismiss: prepareDismissal(`CONTRAST_ERROR_GRAPHIC ${$el.outerHTML}`),
            dismissAll: State.option.checks.CONTRAST_ERROR_GRAPHIC.dismissAll ? "CONTRAST_ERROR_GRAPHIC" : false,
            developer: State.option.checks.CONTRAST_ERROR_GRAPHIC.developer || true,
            contrastDetails: updatedItem,
            margin: "-25px"
          });
        }
        break;
      case "svg-warning":
        if (State.option.checks.CONTRAST_WARNING_GRAPHIC) {
          State.results.push({
            test: "CONTRAST_WARNING_GRAPHIC",
            element: $el,
            type: State.option.checks.CONTRAST_WARNING_GRAPHIC.type || "warning",
            content: Lang.sprintf(
              State.option.checks.CONTRAST_WARNING_GRAPHIC.content || (State.option.contrastAlgorithm !== "APCA" ? `${Lang._("CONTRAST_WARNING_GRAPHIC")} ${Lang._("CONTRAST_TIP_GRAPHIC")}` : Lang._("CONTRAST_WARNING_GRAPHIC"))
            ),
            dismiss: prepareDismissal(`CONTRAST_WARNING_GRAPHIC ${$el.outerHTML}`),
            dismissAll: State.option.checks.CONTRAST_WARNING_GRAPHIC.dismissAll ? "CONTRAST_WARNING_GRAPHIC" : false,
            developer: State.option.checks.CONTRAST_WARNING_GRAPHIC.developer || true,
            contrastDetails: updatedItem,
            margin: "-25px"
          });
        }
        break;
      case "background-image":
        if (State.option.checks.CONTRAST_WARNING) {
          State.results.push({
            test: "CONTRAST_WARNING",
            element,
            type: State.option.checks.CONTRAST_WARNING.type || "warning",
            content: Lang.sprintf(
              State.option.checks.CONTRAST_WARNING.content || (isWcag ? `${Lang._("CONTRAST_WARNING")} ${Lang._(ratioRequirementKey)}` : Lang._("CONTRAST_WARNING")),
              ratioToDisplay2
            ),
            dismiss: prepareDismissal(`CONTRAST_WARNING ${previewText}`),
            dismissAll: State.option.checks.CONTRAST_WARNING.dismissAll ? "CONTRAST_WARNING" : false,
            developer: State.option.checks.CONTRAST_WARNING.developer || false,
            contrastDetails: updatedItem
          });
        }
        break;
      case "unsupported":
        if (State.option.checks.CONTRAST_UNSUPPORTED) {
          State.results.push({
            test: "CONTRAST_UNSUPPORTED",
            element,
            type: State.option.checks.CONTRAST_UNSUPPORTED.type || "warning",
            content: Lang.sprintf(
              State.option.checks.CONTRAST_UNSUPPORTED.content || (isWcag ? `${Lang._("CONTRAST_WARNING")} ${Lang._(ratioRequirementKey)}` : Lang._("CONTRAST_WARNING")),
              ratioToDisplay2
            ),
            dismiss: prepareDismissal(`CONTRAST_UNSUPPORTED ${previewText}`),
            dismissAll: State.option.checks.CONTRAST_UNSUPPORTED.dismissAll ? "CONTRAST_UNSUPPORTED" : false,
            developer: State.option.checks.CONTRAST_UNSUPPORTED.developer || false,
            contrastDetails: updatedItem
          });
        }
        break;
    }
  });
}
function checkLabels() {
  if (State.option.formLabelsPlugin) {
    Elements.Found.Inputs.forEach(($el) => {
      if (isElementHidden($el) || isHiddenAndUnfocusable($el) || isPresentational($el) && isDisabled($el))
        return;
      const computeName = computeAccessibleName($el);
      const inputName = removeWhitespace(computeName);
      const type = $el.getAttribute("type");
      const hasTitle = $el.getAttribute("title");
      const hasAria = $el.getAttribute("aria-label") || $el.getAttribute("aria-labelledby");
      if (type === "submit" || type === "button" || type === "hidden") {
        return;
      }
      if (type === "image") {
        if (State.option.checks.LABELS_MISSING_IMAGE_INPUT && inputName === "") {
          State.results.push({
            test: "LABELS_MISSING_IMAGE_INPUT",
            element: $el,
            type: State.option.checks.LABELS_MISSING_IMAGE_INPUT.type || "error",
            content: Lang.sprintf(
              State.option.checks.LABELS_MISSING_IMAGE_INPUT.content || "LABELS_MISSING_IMAGE_INPUT"
            ),
            dismiss: prepareDismissal(`LABELS_MISSING_IMAGE_INPUT ${type + inputName}`),
            dismissAll: State.option.checks.LABELS_MISSING_IMAGE_INPUT.dismissAll ? "LABELS_MISSING_IMAGE_INPUT" : false,
            developer: State.option.checks.LABELS_MISSING_IMAGE_INPUT.developer || true
          });
        }
        return;
      }
      if (type === "reset") {
        if (State.option.checks.LABELS_INPUT_RESET) {
          State.results.push({
            test: "LABELS_INPUT_RESET",
            element: $el,
            type: State.option.checks.LABELS_INPUT_RESET.type || "warning",
            content: Lang.sprintf(
              State.option.checks.LABELS_INPUT_RESET.content || "LABELS_INPUT_RESET"
            ),
            dismiss: prepareDismissal(`LABELS_INPUT_RESET ${type + inputName}`),
            dismissAll: State.option.checks.LABELS_INPUT_RESET.dismissAll ? "LABELS_INPUT_RESET" : false,
            developer: State.option.checks.LABELS_INPUT_RESET.developer || false
          });
        }
        return;
      }
      const hasPlaceholder = $el.placeholder && $el.placeholder !== 0;
      if (hasPlaceholder && State.option.checks.LABELS_PLACEHOLDER) {
        State.results.push({
          test: "LABELS_PLACEHOLDER",
          element: $el,
          type: State.option.checks.LABELS_PLACEHOLDER.type || "warning",
          content: Lang.sprintf(
            State.option.checks.LABELS_PLACEHOLDER.content || "LABELS_PLACEHOLDER"
          ),
          dismiss: prepareDismissal(`LABELS_PLACEHOLDER ${type + inputName}`),
          dismissAll: State.option.checks.LABELS_PLACEHOLDER.dismissAll ? "LABELS_PLACEHOLDER" : false,
          developer: State.option.checks.LABELS_PLACEHOLDER.developer || true
        });
      }
      if (hasAria || hasTitle) {
        if (inputName.length === 0) {
          if (State.option.checks.LABELS_MISSING_LABEL) {
            State.results.push({
              test: "LABELS_MISSING_LABEL",
              element: $el,
              type: State.option.checks.LABELS_MISSING_LABEL.type || "error",
              content: Lang.sprintf(
                State.option.checks.LABELS_MISSING_LABEL.content || "LABELS_MISSING_LABEL"
              ),
              dismiss: prepareDismissal(`LABELS_MISSING_LABEL ${type + inputName}`),
              dismissAll: State.option.checks.LABELS_MISSING_LABEL.dismissAll ? "LABELS_MISSING_LABEL" : false,
              developer: State.option.checks.LABELS_MISSING_LABEL.developer || true
            });
          }
        } else if (State.option.checks.LABELS_ARIA_LABEL_INPUT) {
          const ariaLabelledBy = $el.getAttribute("aria-labelledby");
          if (ariaLabelledBy) {
            const ids = ariaLabelledBy.trim().split(/\s+/);
            if (ids.length === 1) {
              const target = find(`#${ids[0]}`, "root")?.[0];
              if (target && !isElementHidden(target)) return;
            }
          }
          State.results.push({
            test: "LABELS_ARIA_LABEL_INPUT",
            element: $el,
            type: State.option.checks.LABELS_ARIA_LABEL_INPUT.type || "warning",
            content: State.option.checks.LABELS_ARIA_LABEL_INPUT.content ? Lang.sprintf(State.option.checks.LABELS_ARIA_LABEL_INPUT.content, inputName) : Lang.sprintf(Lang._("LABELS_ARIA_LABEL_INPUT") + Lang._("ACC_NAME_TIP"), inputName),
            args: [inputName],
            dismiss: prepareDismissal(`LABELS_ARIA_LABEL_INPUT ${type + inputName}`),
            dismissAll: State.option.checks.LABELS_ARIA_LABEL_INPUT.dismissAll ? "LABELS_ARIA_LABEL_INPUT" : false,
            developer: State.option.checks.LABELS_ARIA_LABEL_INPUT.developer || true
          });
        }
        return;
      }
      const closestLabel = getCachedClosest($el, "label");
      const labelName = closestLabel ? computeAccessibleName(closestLabel) : "";
      if (closestLabel && labelName.length) return;
      const id = $el.getAttribute("id");
      if (id) {
        const hasMatchingLabel = Elements.Found.Labels.some(
          (label) => label.getAttribute("for") === id
        );
        if (hasMatchingLabel) return;
        if (State.option.checks.LABELS_NO_FOR_ATTRIBUTE) {
          State.results.push({
            test: "LABELS_NO_FOR_ATTRIBUTE",
            element: $el,
            type: State.option.checks.LABELS_NO_FOR_ATTRIBUTE.type || "error",
            content: Lang.sprintf(
              State.option.checks.LABELS_NO_FOR_ATTRIBUTE.content || "LABELS_NO_FOR_ATTRIBUTE",
              id
            ),
            args: [id],
            dismiss: prepareDismissal(`LABELS_NO_FOR_ATTRIBUTE ${type + inputName}`),
            dismissAll: State.option.checks.LABELS_NO_FOR_ATTRIBUTE.dismissAll ? "LABELS_NO_FOR_ATTRIBUTE" : false,
            developer: State.option.checks.LABELS_NO_FOR_ATTRIBUTE.developer || true
          });
        }
      } else if (State.option.checks.LABELS_MISSING_LABEL) {
        State.results.push({
          test: "LABELS_MISSING_LABEL",
          element: $el,
          type: State.option.checks.LABELS_MISSING_LABEL.type || "error",
          content: Lang.sprintf(
            State.option.checks.LABELS_MISSING_LABEL.content || "LABELS_MISSING_LABEL"
          ),
          dismiss: prepareDismissal(`LABELS_MISSING_LABEL ${type + inputName}`),
          dismissAll: State.option.checks.LABELS_MISSING_LABEL.dismissAll ? "LABELS_MISSING_LABEL" : false,
          developer: State.option.checks.LABELS_MISSING_LABEL.developer || true
        });
      }
    });
  }
  return State.results;
}
function computeReadability(textArray, lang) {
  const readabilityArray = [];
  const punctuation = [".", "?", "!"];
  textArray.forEach((text) => {
    const lastCharacter = text[text.length - 1];
    const sentence = punctuation.includes(lastCharacter) ? text : `${text}.`;
    readabilityArray.push(sentence);
  });
  const pageText = readabilityArray.join(" ").replace(/[\u0000-\u001F\u007F-\u009F]/g, "");
  if (pageText.length === 0) return null;
  if (["en", "es", "fr", "de", "nl", "it", "pt"].includes(lang)) {
    const numberOfSyllables = (el2) => {
      let wordCheck = el2;
      wordCheck = wordCheck.toLowerCase().replace(".", "").replace("\n", "");
      if (wordCheck.length <= 3) {
        return 1;
      }
      wordCheck = wordCheck.replace(/(?:[^laeiouy]es|ed|[^laeiouy]e)$/, "");
      wordCheck = wordCheck.replace(/^y/, "");
      const syllableString = wordCheck.match(/[aeiouy]{1,2}/g);
      let syllables = 0;
      if (syllableString) {
        syllables = syllableString.length;
      }
      return syllables;
    };
    const wordsRaw = pageText.replace(/[.!?-]+/g, " ").split(" ");
    let words = 0;
    for (let i = 0; i < wordsRaw.length; i++) {
      if (wordsRaw[i].trim() !== "") {
        words += 1;
      }
    }
    const sentenceRaw = pageText.split(/[.!?]+/);
    let sentences = 0;
    for (let i = 0; i < sentenceRaw.length; i++) {
      if (sentenceRaw[i] !== "") {
        sentences += 1;
      }
    }
    let totalSyllables = 0;
    let syllables1 = 0;
    let syllables2 = 0;
    for (let i = 0; i < wordsRaw.length; i++) {
      const word = wordsRaw[i];
      if (word.length > 0) {
        const syllableCount = numberOfSyllables(word);
        if (syllableCount === 1) {
          syllables1 += 1;
        } else if (syllableCount === 2) {
          syllables2 += 1;
        }
        totalSyllables += syllableCount;
      }
    }
    let flesch = false;
    if (lang === "en") {
      flesch = 206.835 - 1.015 * (words / sentences) - 84.6 * (totalSyllables / words);
    } else if (lang === "fr") {
      flesch = 207 - 1.015 * (words / sentences) - 73.6 * (totalSyllables / words);
    } else if (lang === "es") {
      flesch = 206.84 - 1.02 * (words / sentences) - 0.6 * (100 * (totalSyllables / words));
    } else if (lang === "de") {
      flesch = 180 - words / sentences - 58.5 * (totalSyllables / words);
    } else if (lang === "nl") {
      flesch = 206.84 - 0.77 * (100 * (totalSyllables / words)) - 0.93 * (words / sentences);
    } else if (lang === "it") {
      flesch = 217 - 1.3 * (words / sentences) - 0.6 * (100 * (totalSyllables / words));
    } else if (lang === "pt") {
      flesch = 248.835 - 1.015 * (words / sentences) - 84.6 * (totalSyllables / words);
    }
    if (flesch > 100) {
      flesch = 100;
    } else if (flesch < 0) {
      flesch = 0;
    }
    const fleschScore = Number(flesch.toFixed(1));
    const avgWordsPerSentence = Number((words / sentences).toFixed(1));
    const complexWords = Math.round(100 * ((words - (syllables1 + syllables2)) / words));
    let difficultyToken;
    if (fleschScore <= 30) {
      difficultyToken = "VERY_DIFFICULT";
    } else if (fleschScore <= 50) {
      difficultyToken = "DIFFICULT";
    } else if (fleschScore <= 60) {
      difficultyToken = "FAIRLY_DIFFICULT";
    } else {
      difficultyToken = "GOOD";
    }
    return {
      score: fleschScore,
      averageWordsPerSentence: avgWordsPerSentence,
      complexWords,
      difficultyToken,
      wordCount: words,
      charCount: pageText.length
    };
  }
  if (["sv", "fi", "da", "no", "nb", "nn"].includes(lang)) {
    const lixWords = () => pageText.replace(/[-'.]/gi, "").split(/[^a-zA-ZöäåÖÄÅÆæØø0-9]/g).filter(Boolean);
    const splitSentences = () => {
      const splitter = /\?|!|\.|\n/g;
      return pageText.split(splitter).filter(Boolean);
    };
    const wordsArr = lixWords();
    const wordCount = wordsArr.length;
    const longWordsCount = wordsArr.filter((w) => w.length > 6).length;
    const sentenceCount = splitSentences().length || 1;
    const score = Math.round(wordCount / sentenceCount + longWordsCount * 100 / wordCount);
    const avgWordsPerSentence = Number((wordCount / sentenceCount).toFixed(1));
    const complexWords = Math.round(100 * (longWordsCount / wordCount));
    let difficultyToken;
    if (score <= 40) {
      difficultyToken = "GOOD";
    } else if (score <= 50) {
      difficultyToken = "FAIRLY_DIFFICULT";
    } else if (score <= 60) {
      difficultyToken = "DIFFICULT";
    } else {
      difficultyToken = "VERY_DIFFICULT";
    }
    return {
      score,
      averageWordsPerSentence: avgWordsPerSentence,
      complexWords,
      difficultyToken,
      wordCount,
      charCount: pageText.length
    };
  }
  return null;
}
function checkReadability() {
  const computed = computeReadability(Elements.Found.Readability, Constants.Readability.Lang);
  let result;
  if (computed) {
    result = {
      test: "READABILITY",
      difficultyLevel: Lang._(computed.difficultyToken),
      ...computed
    };
    State.results.push(result);
  }
  if (State.option.headless === false) {
    if (computed && result.wordCount > 30) {
      Constants.Panel.readabilityInfo.innerHTML = `${Math.ceil(result.score)} <span class="readability-score">${result.difficultyLevel}</span>`;
      Constants.Panel.readabilityDetails.innerHTML = `<li><strong>${Lang._("AVG_SENTENCE")}</strong> ${Math.ceil(result.averageWordsPerSentence)}</li><li><strong>${Lang._("COMPLEX_WORDS")}</strong> ${result.complexWords}%</li><li><strong>${Lang._("TOTAL_WORDS")}</strong> ${result.wordCount}</li>`;
    } else {
      Constants.Panel.readabilityInfo.innerHTML = `<br>${Lang._("READABILITY_NOT_ENOUGH")}`;
    }
  }
}
function checkEmbeddedContent() {
  if (!State.option.embeddedContentPlugin) return;
  const src = ($el) => $el.getAttribute("src") || $el.querySelector("source[src]")?.getAttribute("src") || $el.querySelector("[src]")?.getAttribute("src") || null;
  if (State.option.checks.EMBED_AUDIO) {
    Elements.Found.Audio.forEach(($el) => {
      State.results.push({
        test: "EMBED_AUDIO",
        element: $el,
        type: State.option.checks.EMBED_AUDIO.type || "warning",
        content: Lang.sprintf(State.option.checks.EMBED_AUDIO.content || "EMBED_AUDIO"),
        dismiss: prepareDismissal(`EMBED_AUDIO ${src($el)}`),
        dismissAll: State.option.checks.EMBED_AUDIO.dismissAll ? "EMBED_AUDIO" : false,
        developer: State.option.checks.EMBED_AUDIO.developer || false
      });
    });
  }
  if (State.option.checks.EMBED_VIDEO) {
    Elements.Found.Videos.forEach(($el) => {
      const track = $el.querySelector("track");
      const trackSrc = track?.getAttribute("src");
      if (track === null || trackSrc === null || trackSrc.trim().length === 0) {
        State.results.push({
          test: "EMBED_VIDEO",
          element: $el,
          type: State.option.checks.EMBED_VIDEO.type || "warning",
          content: Lang.sprintf(State.option.checks.EMBED_VIDEO.content || "EMBED_VIDEO"),
          dismiss: prepareDismissal(`EMBED_VIDEO ${src($el)}`),
          dismissAll: State.option.checks.EMBED_VIDEO.dismissAll ? "EMBED_VIDEO" : false,
          developer: State.option.checks.EMBED_VIDEO.developer || false
        });
      }
    });
  }
  if (State.option.checks.EMBED_DATA_VIZ) {
    Elements.Found.Visualizations.forEach(($el) => {
      State.results.push({
        test: "EMBED_DATA_VIZ",
        element: $el,
        type: State.option.checks.EMBED_DATA_VIZ.type || "warning",
        content: Lang.sprintf(State.option.checks.EMBED_DATA_VIZ.content || "EMBED_DATA_VIZ"),
        dismiss: prepareDismissal(`EMBED_DATA_VIZ ${src($el)}`),
        dismissAll: State.option.checks.EMBED_DATA_VIZ.dismissAll ? "EMBED_DATA_VIZ" : false,
        developer: State.option.checks.EMBED_DATA_VIZ.developer || false
      });
    });
  }
  Elements.Found.iframes.forEach(($el) => {
    const videoAudio = $el.tagName === "VIDEO" || $el.tagName === "AUDIO";
    if (isElementHidden($el) || videoAudio || isHiddenAndUnfocusable($el) || isPresentational($el)) {
      return;
    }
    if (isNegativeTabindex($el)) {
      if (State.option.checks.EMBED_UNFOCUSABLE) {
        State.results.push({
          test: "EMBED_UNFOCUSABLE",
          element: $el,
          type: State.option.checks.EMBED_UNFOCUSABLE.type || "error",
          content: Lang.sprintf(
            State.option.checks.EMBED_UNFOCUSABLE.content || "EMBED_UNFOCUSABLE"
          ),
          dismiss: prepareDismissal(`EMBED_UNFOCUSABLE ${src($el)}`),
          dismissAll: State.option.checks.EMBED_UNFOCUSABLE.dismissAll ? "EMBED_UNFOCUSABLE" : false,
          developer: State.option.checks.EMBED_UNFOCUSABLE.developer || true
        });
      }
      return;
    }
    if (State.option.checks.EMBED_MISSING_TITLE) {
      const aria = computeAriaLabel($el);
      const checkTitle = aria === "noAria" ? $el.getAttribute("title") || "" : aria;
      const accessibleName = removeWhitespace(checkTitle);
      if (accessibleName.length === 0) {
        State.results.push({
          test: "EMBED_MISSING_TITLE",
          element: $el,
          type: State.option.checks.EMBED_MISSING_TITLE.type || "error",
          content: Lang.sprintf(
            State.option.checks.EMBED_MISSING_TITLE.content || "EMBED_MISSING_TITLE"
          ),
          dismiss: prepareDismissal(`EMBED_MISSING_TITLE ${src($el)}`),
          dismissAll: State.option.checks.EMBED_MISSING_TITLE.dismissAll ? "EMBED_MISSING_TITLE" : false,
          developer: State.option.checks.EMBED_MISSING_TITLE.developer || true
        });
      }
    }
  });
  if (State.option.checks.EMBED_GENERAL) {
    Elements.Found.EmbeddedContent.forEach(($el) => {
      if (isElementHidden($el) || isHiddenAndUnfocusable($el)) return;
      if ($el.tagName === "VIDEO" || $el.tagName === "AUDIO") return;
      State.results.push({
        test: "EMBED_GENERAL",
        element: $el,
        type: State.option.checks.EMBED_GENERAL.type || "warning",
        content: Lang.sprintf(State.option.checks.EMBED_GENERAL.content || "EMBED_GENERAL"),
        dismiss: prepareDismissal(`EMBED_GENERAL ${src($el)}`),
        dismissAll: State.option.checks.EMBED_GENERAL.dismissAll ? "EMBED_GENERAL" : false,
        developer: State.option.checks.EMBED_GENERAL.developer || false
      });
    });
  }
  return State.results;
}
function checkQA() {
  if (State.option.checks.QA_BAD_LINK) {
    Elements.Found.CustomErrorLinks.forEach(($el) => {
      const text = getText($el);
      State.results.push({
        test: "QA_BAD_LINK",
        element: $el,
        type: State.option.checks.QA_BAD_LINK.type || "error",
        content: Lang.sprintf(State.option.checks.QA_BAD_LINK.content || "QA_BAD_LINK", $el, text),
        args: [$el, text],
        inline: true,
        dismiss: prepareDismissal(`QA_BAD_LINK ${$el.tagName + $el.textContent}`),
        dismissAll: State.option.checks.QA_BAD_LINK.dismissAll ? "QA_BAD_LINK" : false,
        developer: State.option.checks.QA_BAD_LINK.developer || false
      });
    });
  }
  if (State.option.checks.QA_STRONG_ITALICS) {
    Elements.Found.StrongItalics.forEach(($el) => {
      const text = getText($el);
      if (text.length !== 0 && text.length > 400) {
        State.results.push({
          test: "QA_STRONG_ITALICS",
          element: $el.parentNode,
          type: State.option.checks.QA_STRONG_ITALICS.type || "warning",
          content: Lang.sprintf(
            State.option.checks.QA_STRONG_ITALICS.content || "QA_STRONG_ITALICS",
            text
          ),
          args: [text],
          dismiss: prepareDismissal(`QA_STRONG_ITALICS ${$el.tagName + $el.textContent}`),
          dismissAll: State.option.checks.QA_STRONG_ITALICS.dismissAll ? "QA_STRONG_ITALICS" : false,
          developer: State.option.checks.QA_STRONG_ITALICS.developer || false
        });
      }
    });
  }
  if (State.option.checks.QA_BLOCKQUOTE) {
    Elements.Found.Blockquotes.forEach(($el) => {
      const text = getText($el);
      if (text.length !== 0 && text.length < 25) {
        State.results.push({
          test: "QA_BLOCKQUOTE",
          element: $el,
          type: State.option.checks.QA_BLOCKQUOTE.type || "warning",
          content: Lang.sprintf(State.option.checks.QA_BLOCKQUOTE.content || "QA_BLOCKQUOTE", text),
          args: [text],
          dismiss: prepareDismissal(`QA_BLOCKQUOTE ${text}`),
          dismissAll: State.option.checks.QA_BLOCKQUOTE.dismissAll ? "QA_BLOCKQUOTE" : false,
          developer: State.option.checks.QA_BLOCKQUOTE.developer || false
        });
      }
    });
  }
  Elements.Found.Tables.forEach(($el) => {
    if (isElementHidden($el)) return;
    const role = $el.getAttribute("role")?.trim().toLowerCase();
    if (role && !["table", "grid", "treegrid"].includes(role)) return;
    const tableHeaders = $el.querySelectorAll('th, [role="columnheader"]');
    const semanticHeadings = $el.querySelectorAll("h1, h2, h3, h4, h5, h6");
    const firstRow = $el.querySelector("tr") ? $el.querySelector("tr").innerHTML : $el.innerHTML;
    const invalidIds = [];
    const cellsWithHeaders = $el.querySelectorAll("[headers]");
    cellsWithHeaders.forEach((cell) => {
      const headersAttr = cell.getAttribute("headers");
      const headerIds = headersAttr.trim().split(/\s+/);
      headerIds.forEach((id) => {
        const referencedElement = $el.querySelector(`#${id}`);
        const doesNotExist = !referencedElement;
        const isNotInTable = referencedElement && !$el.contains(referencedElement);
        let isNotHeader = true;
        if (referencedElement) {
          const tagName = referencedElement.tagName.toLowerCase();
          const role2 = referencedElement.getAttribute("role")?.trim().toLowerCase();
          if (tagName === "th" || role2 === "rowheader" || role2 === "columnheader")
            isNotHeader = false;
        }
        if (doesNotExist || isNotInTable || isNotHeader) invalidIds.push(id);
      });
    });
    if (State.option.checks.TABLES_INVALID_HEADERS_REF && invalidIds.length > 0) {
      State.results.push({
        test: "TABLES_INVALID_HEADERS_REF",
        element: $el,
        type: State.option.checks.TABLES_INVALID_HEADERS_REF.type || "error",
        content: Lang.sprintf(
          State.option.checks.TABLES_INVALID_HEADERS_REF.content || "TABLES_INVALID_HEADERS_REF",
          invalidIds.join(", ")
        ),
        args: [invalidIds.join(", ")],
        dismiss: prepareDismissal(`TABLES_INVALID_HEADERS_REF ${firstRow}`),
        dismissAll: State.option.checks.TABLES_INVALID_HEADERS_REF.dismissAll ? "TABLES_INVALID_HEADERS_REF" : false,
        developer: State.option.checks.TABLES_INVALID_HEADERS_REF.developer || true
      });
    }
    if (State.option.checks.TABLES_MISSING_HEADINGS && tableHeaders.length === 0) {
      State.results.push({
        test: "TABLES_MISSING_HEADINGS",
        element: $el,
        type: State.option.checks.TABLES_MISSING_HEADINGS.type || "error",
        content: Lang.sprintf(
          State.option.checks.TABLES_MISSING_HEADINGS.content || "TABLES_MISSING_HEADINGS"
        ),
        dismiss: prepareDismissal(`TABLES_MISSING_HEADINGS ${firstRow}`),
        dismissAll: State.option.checks.TABLES_MISSING_HEADINGS.dismissAll ? "TABLES_MISSING_HEADINGS" : false,
        developer: State.option.checks.TABLES_MISSING_HEADINGS.developer || false
      });
    }
    if (State.option.checks.TABLES_SEMANTIC_HEADING && semanticHeadings.length > 0) {
      semanticHeadings.forEach((heading) => {
        State.results.push({
          test: "TABLES_SEMANTIC_HEADING",
          element: heading,
          type: State.option.checks.TABLES_SEMANTIC_HEADING.type || "error",
          content: Lang.sprintf(
            State.option.checks.TABLES_SEMANTIC_HEADING.content || "TABLES_SEMANTIC_HEADING"
          ),
          dismiss: prepareDismissal(`TABLES_SEMANTIC_HEADING ${firstRow}`),
          dismissAll: State.option.checks.TABLES_SEMANTIC_HEADING.dismissAll ? "TABLES_SEMANTIC_HEADING" : false,
          developer: State.option.checks.TABLES_SEMANTIC_HEADING.developer || false
        });
      });
    }
    tableHeaders.forEach((th) => {
      if (State.option.checks.TABLES_EMPTY_HEADING && th.textContent.trim().length === 0) {
        State.results.push({
          test: "TABLES_EMPTY_HEADING",
          element: th,
          type: State.option.checks.TABLES_EMPTY_HEADING.type || "error",
          content: Lang.sprintf(
            State.option.checks.TABLES_EMPTY_HEADING.content || "TABLES_EMPTY_HEADING"
          ),
          position: "afterbegin",
          dismiss: prepareDismissal(`TABLES_EMPTY_HEADING ${firstRow}`),
          dismissAll: State.option.checks.TABLES_EMPTY_HEADING.dismissAll ? "TABLES_EMPTY_HEADING" : false,
          developer: State.option.checks.TABLES_EMPTY_HEADING.developer || false
        });
      }
    });
  });
  if (State.option.checks.QA_FAKE_HEADING) {
    const addResult = (element, text) => {
      State.results.push({
        test: "QA_FAKE_HEADING",
        element,
        type: State.option.checks.QA_FAKE_HEADING.type || "warning",
        content: Lang.sprintf(
          State.option.checks.QA_FAKE_HEADING.content || "QA_FAKE_HEADING",
          text
        ),
        args: [text],
        dismiss: prepareDismissal(`QA_FAKE_HEADING ${text}`),
        inline: true,
        dismissAll: State.option.checks.QA_FAKE_HEADING.dismissAll ? "QA_FAKE_HEADING" : false,
        developer: State.option.checks.QA_FAKE_HEADING.developer || false
      });
    };
    const isPreviousElementAHeading = (p) => {
      const previousElement = p.previousElementSibling;
      if (!previousElement) return false;
      const headingTags = ["H1", "H2", "H3", "H4", "H5", "H6"];
      return headingTags.includes(previousElement.tagName);
    };
    const ignoreParents = 'h1, h2, h3, h4, h5, h6, [role="heading"][aria-level], blockquote, table';
    const computeLargeParagraphs = (p) => {
      const size = parseFloat(getCachedStyle(p).fontSize);
      const getText$1 = getText(p);
      const maybeSentence = getText$1.match(/[.;?!"]/) === null;
      const typicalHeadingLength = getText$1.length >= 4 && getText$1.length <= 120;
      if (size >= 24 && !getCachedClosest(p, ignoreParents) && typicalHeadingLength && maybeSentence && !isPreviousElementAHeading(p)) {
        addResult(p, getText$1);
      }
    };
    const computeBoldTextParagraphs = (p) => {
      const html = p.innerHTML.trim();
      if (html[0] !== "<") return;
      const likelyFakeHeading = /^<\s*(?:strong|b)\b[^>]*>[\s\S]*?<\/\s*(?:strong|b)\s*>(?:<\s*\/?\s*br\s*>|$)/i.test(html);
      if (!likelyFakeHeading || getCachedClosest(p, ignoreParents)) return;
      const possibleHeading = p.querySelector("strong, b");
      if (!possibleHeading) return;
      const text = getText(possibleHeading);
      if (text.length < 3 || text.length > 120 || /[.:;?!"']/.test(text)) return;
      const paragraph = fnIgnore(p, ["strong", "b"]).textContent.trim();
      if (paragraph && paragraph.length <= 250) return;
      addResult(possibleHeading, text);
    };
    Elements.Found.Paragraphs.forEach((p) => {
      computeLargeParagraphs(p);
      computeBoldTextParagraphs(p);
    });
  }
  if (State.option.checks.QA_FAKE_LIST) {
    const numberMatch = new RegExp(/(([023456789][\d\s])|(1\d))/, "");
    const alphabeticMatch = new RegExp(/(^[aA1αаΑ]|[^\p{Alphabetic}\s])[-\s.)\]]/, "u");
    const emojiMatch = new RegExp(/\p{Extended_Pictographic}/, "u");
    const secondTextNoMatch = ["a", "A", "α", "Α", "а", "А", "1"];
    const specialCharsMatch = /[([{#]/;
    const prefixDecrement = {
      2: "1",
      b: "a",
      B: "A",
      β: "α",
      Β: "Α",
      б: "а",
      Б: "А"
    };
    const decrement = (element) => element.replace(/^b|^B|^б|^Б|^β|^В|^[2-9]/, (match) => prefixDecrement[match]);
    let activeMatch = "";
    let firstText = "";
    let lastHitWasEmoji = false;
    Elements.Found.Paragraphs.forEach((p, i) => {
      let secondText = false;
      let hit = false;
      firstText = firstText || getText(p).replace(/[([]/, "");
      const firstPrefix = firstText.substring(0, 2);
      const isAlphabetic = firstPrefix.match(alphabeticMatch);
      const isNumber = firstPrefix.match(numberMatch);
      const isEmoji = firstPrefix.match(emojiMatch);
      const isSpecialChar = specialCharsMatch.test(firstPrefix.charAt(0));
      const isRoman = /^(I|i)[.)\]]/.test(firstPrefix);
      if (firstPrefix.length > 0 && firstPrefix !== activeMatch && !isNumber && (isAlphabetic || isEmoji || isSpecialChar || isRoman)) {
        if (/^[A-Z]\.[A-Z]\./.test(firstText)) return;
        const secondP = Elements.Found.Paragraphs[i + 1];
        if (secondP) {
          secondText = getText(secondP).replace(/[([]/, "").substring(0, 2);
          if (secondTextNoMatch.includes(secondText?.toLowerCase().trim())) {
            return;
          }
          const secondPrefix = decrement(secondText);
          if (isRoman) {
            if (secondText.toLowerCase() === "ii") {
              hit = true;
            }
          } else if (isAlphabetic) {
            const firstChar = firstPrefix.charAt(0);
            const secondChar = secondText.charAt(0);
            if (decrement(secondChar) === firstChar && !/\w/.test(secondText.charAt(1))) {
              hit = true;
            }
          } else if (isEmoji && !lastHitWasEmoji) {
            if (secondPrefix.match(emojiMatch)) {
              hit = true;
              lastHitWasEmoji = true;
            }
          }
        }
        if (!hit) {
          let textAfterBreak = p?.querySelector("br")?.nextSibling?.nodeValue;
          if (textAfterBreak) {
            textAfterBreak = textAfterBreak.replace(/<\/?[^>]+(>|$)/g, "").trim().substring(0, 2);
            const checkForOtherPrefixChars = specialCharsMatch.test(textAfterBreak.charAt(0));
            if (checkForOtherPrefixChars || firstPrefix === decrement(textAfterBreak) || isRoman && textAfterBreak.toLowerCase() === "ii" || !lastHitWasEmoji && textAfterBreak.match(emojiMatch)) {
              hit = true;
            }
          }
        }
        if (hit) {
          State.results.push({
            test: "QA_FAKE_LIST",
            element: p,
            type: State.option.checks.QA_FAKE_LIST.type || "warning",
            content: Lang.sprintf(
              State.option.checks.QA_FAKE_LIST.content || "QA_FAKE_LIST",
              firstPrefix,
              firstText
            ),
            args: [firstPrefix, firstText],
            dismiss: prepareDismissal(`QA_FAKE_LIST ${p.textContent}`),
            dismissAll: State.option.checks.QA_FAKE_LIST.dismissAll ? "QA_FAKE_LIST" : false,
            developer: State.option.checks.QA_FAKE_LIST.developer || false
          });
          activeMatch = firstPrefix;
        } else {
          activeMatch = "";
        }
      } else {
        activeMatch = "";
      }
      firstText = secondText ? "" : secondText;
    });
  }
  if (State.option.checks.QA_UPPERCASE) {
    const checkCaps = ($el) => {
      let thisText = "";
      if ($el.tagName === "LI") {
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
        State.results.push({
          test: "QA_UPPERCASE",
          element: $el,
          type: State.option.checks.QA_UPPERCASE.type || "warning",
          content: Lang.sprintf(
            State.option.checks.QA_UPPERCASE.content || "QA_UPPERCASE",
            thisText
          ),
          args: [thisText],
          dismiss: prepareDismissal(`QA_UPPERCASE ${thisText}`),
          dismissAll: State.option.checks.QA_UPPERCASE.dismissAll ? "QA_UPPERCASE" : false,
          developer: State.option.checks.QA_UPPERCASE.developer || false
        });
      }
    };
    Elements.Found.Paragraphs.forEach(($el) => {
      checkCaps($el);
    });
    Elements.Found.Headings.forEach(($el) => {
      checkCaps($el);
    });
    Elements.Found.Lists.forEach(($el) => {
      checkCaps($el);
    });
    Elements.Found.Blockquotes.forEach(($el) => {
      checkCaps($el);
    });
  }
  const addUnderlineResult = ($el) => {
    const text = getText($el);
    State.results.push({
      test: "QA_UNDERLINE",
      element: $el,
      type: State.option.checks.QA_UNDERLINE.type || "warning",
      content: Lang.sprintf(State.option.checks.QA_UNDERLINE.content || "QA_UNDERLINE", text),
      args: [text],
      inline: true,
      dismiss: prepareDismissal(`QA_UNDERLINE ${text}`),
      dismissAll: State.option.checks.QA_UNDERLINE.dismissAll ? "QA_UNDERLINE" : false,
      developer: State.option.checks.QA_UNDERLINE.developer || false
    });
  };
  const addJustifyResult = ($el) => {
    const text = getText($el);
    State.results.push({
      test: "QA_JUSTIFY",
      element: $el,
      type: State.option.checks.QA_JUSTIFY.type || "warning",
      content: Lang.sprintf(State.option.checks.QA_JUSTIFY.content || "QA_JUSTIFY", text),
      args: [text],
      dismiss: prepareDismissal(`QA_JUSTIFY ${text}`),
      dismissAll: State.option.checks.QA_JUSTIFY.dismissAll ? "QA_JUSTIFY" : true,
      developer: State.option.checks.QA_JUSTIFY.developer || false
    });
  };
  const addSmallTextResult = ($el) => {
    const text = getText($el);
    State.results.push({
      test: "QA_SMALL_TEXT",
      element: $el,
      type: State.option.checks.QA_SMALL_TEXT.type || "warning",
      content: Lang.sprintf(State.option.checks.QA_SMALL_TEXT.content || "QA_SMALL_TEXT", text),
      args: [text],
      dismiss: prepareDismissal(`QA_SMALL_TEXT ${text}`),
      dismissAll: State.option.checks.QA_SMALL_TEXT.dismissAll ? "QA_SMALL_TEXT" : true,
      developer: State.option.checks.QA_SMALL_TEXT.developer || false
    });
  };
  const checkUnderline = State.option.checks.QA_UNDERLINE;
  const checkSmallText = State.option.checks.QA_SMALL_TEXT;
  const checkJustify = State.option.checks.QA_JUSTIFY;
  if (checkUnderline || checkJustify || checkSmallText) {
    const defaultSize = checkSmallText?.fontSize || 10;
    const interactiveSelector = 'a[href], button, abbr, [role="link"], [role="button"], [tabindex="0"], [onclick]';
    const hasDirectText = (el2) => {
      let node = el2.firstChild;
      while (node) {
        if (node.nodeType === 3 && node.nodeValue.trim().length > 0) {
          return true;
        }
        node = node.nextSibling;
      }
      return false;
    };
    for (let i = 0; i < Elements.Found.Everything.length; i++) {
      const $el = Elements.Found.Everything[i];
      if (!hasDirectText($el)) continue;
      const style = getCachedStyle($el);
      const parentStyle = getCachedStyle($el.parentElement);
      if (checkUnderline) {
        if ((style.textDecorationLine === "underline" || getCachedClosest($el, "u")) && !$el.matches(interactiveSelector) && !getCachedClosest($el, interactiveSelector)) {
          addUnderlineResult($el);
        }
      }
      if (checkSmallText) {
        const computedFontSize = parseFloat(style.fontSize);
        if (computedFontSize > 1 && computedFontSize <= defaultSize) {
          const parentFontSize = parentStyle ? parseFloat(parentStyle.fontSize) : null;
          const isInherited = parentFontSize === computedFontSize;
          if (!isInherited && !getCachedClosest($el, "sup, sub")) {
            addSmallTextResult($el);
          }
        }
      }
      if (checkJustify && style.textAlign === "justify") {
        const parentJustify = parentStyle ? parentStyle.textAlign : null;
        const justifyInherited = parentJustify === style.textAlign;
        if (!justifyInherited) {
          addJustifyResult($el);
        }
      }
    }
  }
  if (State.option.checks.QA_SUBSCRIPT) {
    Elements.Found.Subscripts.forEach(($el) => {
      const text = getText($el);
      if (text.length >= 80) {
        State.results.push({
          test: "QA_SUBSCRIPT",
          element: $el,
          type: State.option.checks.QA_SUBSCRIPT.type || "warning",
          content: Lang.sprintf(State.option.checks.QA_SUBSCRIPT.content || "QA_SUBSCRIPT", text),
          args: [text],
          inline: true,
          dismiss: prepareDismissal(`QA_SUBSCRIPT ${$el.tagName + text}`),
          dismissAll: State.option.checks.QA_SUBSCRIPT.dismissAll ? "QA_SUBSCRIPT" : false,
          developer: State.option.checks.QA_SUBSCRIPT.developer || false
        });
      }
    });
  }
  if (State.option.checks.QA_NESTED_COMPONENTS) {
    Elements.Found.NestedComponents.forEach(($el) => {
      const sources = State.option.checks.QA_NESTED_COMPONENTS.sources || '[role="tablist"], details';
      const component = $el.querySelector(sources);
      if (component) {
        State.results.push({
          test: "QA_NESTED_COMPONENTS",
          element: $el,
          type: State.option.checks.QA_NESTED_COMPONENTS.type || "warning",
          content: Lang.sprintf(
            State.option.checks.QA_NESTED_COMPONENTS.content || "QA_NESTED_COMPONENTS"
          ),
          dismiss: prepareDismissal(`QA_NESTED_COMPONENTS ${$el.textContent}`),
          dismissAll: State.option.checks.QA_NESTED_COMPONENTS.dismissAll ? "QA_NESTED_COMPONENTS" : false,
          developer: State.option.checks.QA_NESTED_COMPONENTS.developer || false
        });
      }
    });
  }
}
function checkDeveloper() {
  const report = (key, $el, ...args) => {
    const rule = State.option.checks[key];
    if (!rule) return;
    const result = {
      test: key,
      type: rule.type || "error",
      content: Lang.sprintf(rule.content || key, ...args),
      args: [...args],
      dismiss: prepareDismissal(key),
      developer: rule.developer || true
    };
    if ($el) {
      result.element = $el;
    }
    State.results.push(result);
  };
  if (!Elements.Found.Language) {
    report("META_LANG", null);
  } else {
    const { valid, suggest } = validateLang(Elements.Found.Language, Lang._("LANG_CODE"));
    if (!valid) {
      if (suggest) {
        report("META_LANG_SUGGEST", null, Elements.Found.Language, suggest);
      } else {
        report("META_LANG_VALID", null, "html", Elements.Found.Language);
      }
    }
  }
  if (Elements.Found.LangTags && Elements.Found.LangTags.length > 0) {
    Elements.Found.LangTags.forEach(($el) => {
      const langValue = $el.getAttribute("lang")?.trim();
      const { valid, suggest } = validateLang(langValue, Lang._("LANG_CODE"));
      if (!valid) {
        if (suggest) {
          report("META_LANG_SUGGEST", $el, langValue, suggest);
        } else {
          report("META_LANG_VALID", $el, $el.tagName.toLowerCase(), langValue);
        }
      }
    });
  }
  if (State.option.checks.META_TITLE) {
    const metaTitle = document.querySelector("title:not(svg title)");
    if (!metaTitle || metaTitle.textContent.trim().length === 0) {
      State.results.push({
        test: "META_TITLE",
        type: State.option.checks.META_TITLE.type || "error",
        content: Lang.sprintf(State.option.checks.META_TITLE.content || "META_TITLE"),
        dismiss: prepareDismissal("META_TITLE"),
        developer: State.option.checks.META_TITLE.developer || true
      });
    }
  }
  if (State.option.checks.META_SCALABLE || State.option.checks.META_MAX) {
    const metaViewport = document.querySelector('meta[name="viewport"]');
    if (metaViewport) {
      const content = metaViewport.getAttribute("content");
      if (content) {
        const params = content.split(",").reduce((acc, param) => {
          const [key, value] = param.split("=").map((s) => s.trim());
          acc[key] = value;
          return acc;
        }, {});
        if (State.option.checks.META_SCALABLE && (params["user-scalable"] === "no" || params["user-scalable"] === "0")) {
          State.results.push({
            test: "META_SCALABLE",
            type: State.option.checks.META_SCALABLE.type || "error",
            content: Lang.sprintf(State.option.checks.META_SCALABLE.content || "META_SCALABLE"),
            dismiss: prepareDismissal("META_SCALABLE"),
            developer: State.option.checks.META_SCALABLE.developer || true
          });
        }
        const maxScale = parseFloat(params["maximum-scale"]);
        if (State.option.checks.META_MAX && !Number.isNaN(maxScale) && maxScale < 2) {
          State.results.push({
            test: "META_MAX",
            type: State.option.checks.META_MAX.type || "error",
            content: Lang.sprintf(State.option.checks.META_MAX.content || "META_MAX"),
            dismiss: prepareDismissal("META_MAX"),
            developer: State.option.checks.META_MAX.developer || true
          });
        }
      }
    }
  }
  if (State.option.checks.META_REFRESH) {
    const actuallyRefreshes = Array.from(
      document.querySelectorAll('meta[http-equiv="refresh" i]')
    ).some((tag) => parseInt(tag.getAttribute("content"), 10) > 0);
    if (actuallyRefreshes) {
      const option = State.option.checks.META_REFRESH;
      State.results.push({
        test: "META_REFRESH",
        type: option.type || "error",
        content: Lang.sprintf(option.content || "META_REFRESH"),
        dismiss: prepareDismissal("META_REFRESH"),
        developer: option.developer ?? true
      });
    }
  }
  if (State.option.checks.DUPLICATE_ID) {
    const doms = document.querySelectorAll("body, [data-sa11y-has-shadow-root]");
    doms.forEach((dom) => {
      const allIds = /* @__PURE__ */ new Set();
      const findDuplicateIds = (ids, withinDOM) => {
        ids.forEach(($el) => {
          const { id } = $el;
          if (typeof id !== "string" || id.trim().length === 0) {
            return;
          }
          if (id && !allIds.has(id)) {
            allIds.add(id);
          } else {
            const ariaReference = Array.from(
              withinDOM.querySelectorAll(`
                a[href*="${id}"],
                label[for*="${id}"],
                [aria-labelledby*="${id}"],
                [aria-controls*="${id}"],
                [aria-owns*="${id}"]`)
            );
            if (ariaReference.length > 0) {
              State.results.push({
                test: "DUPLICATE_ID",
                element: $el,
                type: State.option.checks.DUPLICATE_ID.type || "error",
                content: Lang.sprintf(
                  State.option.checks.DUPLICATE_ID.content || "DUPLICATE_ID",
                  id
                ),
                args: [id],
                dismiss: prepareDismissal(`DUPLICATE_ID ${id}${$el.textContent}`),
                dismissAll: State.option.checks.DUPLICATE_ID.dismissAll ? "DUPLICATE_ID" : false,
                developer: State.option.checks.DUPLICATE_ID.developer || true
              });
            }
          }
        });
      };
      if (dom.shadowRoot) {
        const shadowRootIds = Array.from(
          dom.shadowRoot.querySelectorAll(`[id]:not(${Constants.Exclusions.Container})`)
        );
        findDuplicateIds(shadowRootIds, dom.shadowRoot);
      }
      const regularIds = Array.from(
        dom.querySelectorAll(`[id]:not(${Constants.Exclusions.Container})`)
      );
      findDuplicateIds(regularIds, dom);
    });
  }
  if (State.option.checks.BTN_EMPTY || State.option.checks.BTN_EMPTY_LABELLEDBY || State.option.checks.BTN_LABEL || State.option.checks.HIDDEN_FOCUSABLE || State.option.checks.LABEL_IN_NAME) {
    Elements.Found.Buttons.forEach(($el) => {
      if (isHiddenAndUnfocusable($el) || isElementHidden($el) || isPresentational($el) && isDisabled($el))
        return;
      const accName = computeAccessibleName($el);
      const buttonText = accName.replace(/'|"|-|\.|\s+/g, "").toLowerCase();
      const textContent = getText($el);
      const hasAria = $el.querySelector(":scope [aria-labelledby], :scope [aria-label]") || $el.getAttribute("aria-labelledby") || $el.getAttribute("aria-label");
      const hasAriaLabelledby = $el.querySelector(":scope [aria-labelledby]") || $el.getAttribute("aria-labelledby");
      if (buttonText.length === 0) {
        if (State.option.checks.BTN_EMPTY_LABELLEDBY && hasAriaLabelledby) {
          State.results.push({
            test: "BTN_EMPTY_LABELLEDBY",
            element: $el,
            type: State.option.checks.BTN_EMPTY_LABELLEDBY.type || "error",
            content: Lang.sprintf(
              State.option.checks.BTN_EMPTY_LABELLEDBY.content || Lang._("BTN_EMPTY_LABELLEDBY") + Lang._("BTN_TIP")
            ),
            dismiss: prepareDismissal(
              `BTN_EMPTY_LABELLEDBY ${$el.tagName + $el.id + $el.className + accName}`
            ),
            dismissAll: State.option.checks.BTN_EMPTY_LABELLEDBY.dismissAll ? "BTN_EMPTY_LABELLEDBY" : false,
            developer: State.option.checks.BTN_EMPTY_LABELLEDBY.developer || true
          });
        } else if (State.option.checks.BTN_EMPTY) {
          State.results.push({
            test: "BTN_EMPTY",
            element: $el,
            type: State.option.checks.BTN_EMPTY.type || "error",
            content: Lang.sprintf(
              State.option.checks.BTN_EMPTY.content || Lang._("BTN_EMPTY") + Lang._("BTN_TIP")
            ),
            dismiss: prepareDismissal(`BTN_EMPTY ${$el.tagName + $el.id + $el.className}`),
            dismissAll: State.option.checks.BTN_EMPTY.dismissAll ? "BTN_EMPTY" : false,
            developer: State.option.checks.BTN_EMPTY.developer || true
          });
        }
        return;
      }
      const isVisibleTextInAccName$1 = isVisibleTextInAccName($el, accName);
      if (State.option.checks.LABEL_IN_NAME && hasAria && isVisibleTextInAccName$1) {
        State.results.push({
          test: "LABEL_IN_NAME",
          element: $el,
          type: State.option.checks.LABEL_IN_NAME.type || "warning",
          content: Lang.sprintf(
            State.option.checks.LABEL_IN_NAME.content || Lang._("LABEL_IN_NAME") + Lang._("ACC_NAME_TIP"),
            textContent,
            accName
          ),
          args: [textContent, accName],
          dismiss: prepareDismissal(
            `LABEL_IN_NAME ${$el.tagName + $el.id + $el.className + accName}`
          ),
          dismissAll: State.option.checks.LABEL_IN_NAME.dismissAll ? "BTN_LABEL_IN_NAME" : false,
          developer: State.option.checks.LABEL_IN_NAME.developer || true
        });
        return;
      }
      if (State.option.checks.BTN_ROLE_IN_NAME && accName.includes(Lang._("BTN"))) {
        State.results.push({
          test: "BTN_ROLE_IN_NAME",
          element: $el,
          type: State.option.checks.BTN_ROLE_IN_NAME.type || "warning",
          content: Lang.sprintf(
            State.option.checks.BTN_ROLE_IN_NAME.content || Lang._("BTN_ROLE_IN_NAME") + Lang._("ACC_NAME_TIP") + Lang._("BTN_TIP"),
            accName
          ),
          args: [accName],
          dismiss: prepareDismissal(
            `BTN_ROLE_IN_NAME ${$el.tagName + $el.id + $el.className + accName}`
          ),
          dismissAll: State.option.checks.BTN_ROLE_IN_NAME.dismissAll ? "BTN_ROLE_IN_NAME" : false,
          developer: State.option.checks.BTN_ROLE_IN_NAME.developer || true
        });
      }
    });
  }
  if (State.option.checks.UNCONTAINED_LI) {
    Elements.Found.Lists.forEach(($el) => {
      if (!getCachedClosest($el, "ul, ol, menu")) {
        const text = getText($el);
        State.results.push({
          test: "UNCONTAINED_LI",
          element: $el,
          type: State.option.checks.UNCONTAINED_LI.type || "error",
          content: Lang.sprintf(
            State.option.checks.UNCONTAINED_LI.content || "UNCONTAINED_LI",
            text
          ),
          args: [text],
          dismiss: prepareDismissal(`UNCONTAINED_LI ${$el.textContent}`),
          dismissAll: State.option.checks.UNCONTAINED_LI.dismissAll ? "UNCONTAINED_LI" : false,
          developer: State.option.checks.UNCONTAINED_LI.developer || true
        });
      }
    });
  }
  if (State.option.checks.TABINDEX_ATTR) {
    Elements.Found.TabIndex.forEach(($el) => {
      if ($el.tabIndex <= 0) return;
      State.results.push({
        test: "TABINDEX_ATTR",
        element: $el,
        type: State.option.checks.TABINDEX_ATTR.type || "error",
        content: Lang.sprintf(State.option.checks.TABINDEX_ATTR.content || "TABINDEX_ATTR"),
        dismiss: prepareDismissal(`TABINDEX_ATTR ${$el.tagName + $el.id + $el.className}`),
        dismissAll: State.option.checks.TABINDEX_ATTR.dismissAll ? "TABINDEX_ATTR" : false,
        developer: State.option.checks.TABINDEX_ATTR.developer || true
      });
    });
  }
  if (State.option.checks.HIDDEN_FOCUSABLE) {
    const flaggedForAriaHidden = /* @__PURE__ */ new Set();
    Elements.Found.Focusable.forEach(($el) => {
      if (flaggedForAriaHidden.has($el)) return;
      if (isDisabled($el) || isNegativeTabindex($el) || isElementHidden($el))
        return;
      const hiddenContainer = getCachedClosest($el, '[aria-hidden="true"]');
      if (hiddenContainer) {
        const outerHTML = truncateString($el.outerHTML, 100);
        State.results.push({
          test: "HIDDEN_FOCUSABLE",
          element: $el,
          type: State.option.checks.HIDDEN_FOCUSABLE.type || "error",
          content: Lang.sprintf(
            State.option.checks.HIDDEN_FOCUSABLE.content || "HIDDEN_FOCUSABLE",
            outerHTML
          ),
          args: [outerHTML],
          dismiss: prepareDismissal(
            `HIDDEN_FOCUSABLE ${$el.tagName + $el.id + $el.className}`
          ),
          dismissAll: State.option.checks.HIDDEN_FOCUSABLE.dismissAll ? "HIDDEN_FOCUSABLE" : false,
          developer: State.option.checks.HIDDEN_FOCUSABLE.developer || true
        });
        flaggedForAriaHidden.add($el);
      }
    });
  }
  return State.results;
}
function checkCustom(results) {
  return results;
}
async function checkAll(desiredRoot = State.option.checkRoot, desiredReadabilityRoot = State.option.readabilityRoot, fixedRoots = State.option.fixedRoots) {
  try {
    State.start = performance.now();
    Constants.initializeRoot(desiredRoot, desiredReadabilityRoot, fixedRoots);
    findShadowComponents();
    Elements.initializeElements();
    checkHeaders();
    checkLinkText();
    checkImages();
    checkLabels();
    checkQA();
    checkDeveloper();
    checkEmbeddedContent();
    checkContrast();
    if (State.option.readabilityPlugin || store.getItem("sa11y-readability") === "On") {
      checkReadability();
    }
    await checkPageLanguage();
    if (State.option.customChecks === true) {
      checkCustom();
    } else if (typeof State.option.customChecks === "object") {
      State.results.push(...State.option.customChecks);
    } else if (State.option.customChecks === "listen") {
      State.customChecksRunning = true;
      State.customChecksFinished = 0;
      document.addEventListener("sa11y-resume", () => {
        State.customChecksFinished += 1;
        if (State.customChecksFinished === 1) {
          State.customChecksRunning = false;
          updateResults();
        }
      });
      window.setTimeout(() => {
        if (State.customChecksRunning === true) {
          State.customChecksRunning = false;
          updateResults();
          throw Error("Sa11y: No custom checks were returned.");
        }
      }, State.option.delayCustomCheck);
      window.setTimeout(() => {
        const customChecks = new CustomEvent("sa11y-custom-checks");
        document.dispatchEvent(customChecks);
      }, 0);
    }
    if (!State.customChecksRunning) updateResults();
  } catch (error) {
    const consoleErrors = new ConsoleErrors(error);
    document.body.appendChild(consoleErrors);
    throw error;
  }
}
function detectPageChanges() {
  if (State.option.detectSPArouting === true) {
    let url2 = window.location.href;
    const checkURL = debounce(async () => {
      if (url2 !== window.location.href) {
        if (store.getItem("sa11y-panel") === "Closed" || !store.getItem("sa11y-panel")) {
          checkAll();
        } else {
          resetAll(false);
          await checkAll();
        }
        url2 = window.location.href;
      }
    }, 250);
    window.addEventListener("click", checkURL);
    window.addEventListener("keydown", checkURL);
  }
}
function mainToggle() {
  Constants.Panel.toggle.addEventListener("click", (e) => {
    if (store.getItem("sa11y-panel") === "Opened") {
      e.preventDefault();
      store.setItem("sa11y-panel", "Closed");
      Constants.Panel.toggle.classList.remove("on");
      Constants.Panel.toggle.setAttribute("aria-expanded", "false");
      resetAll();
      if (Constants.Panel.notifCount.textContent.trim().length === 0) {
        Constants.Panel.notifBadge.style.display = "none";
      } else {
        Constants.Panel.notifBadge.style.display = "flex";
      }
    } else {
      e.preventDefault();
      store.setItem("sa11y-panel", "Opened");
      Constants.Panel.toggle.classList.add("on");
      Constants.Panel.toggle.setAttribute("aria-expanded", "true");
      resetAll();
      checkAll();
      isScrollable(Constants.Panel.outlineList, Constants.Panel.outlineContent);
    }
  });
  if (store.getItem("sa11y-panel") === "Opened") {
    Constants.Panel.toggle.classList.add("on");
    Constants.Panel.toggle.setAttribute("aria-expanded", "true");
    Constants.Panel.panel.style.transform = "";
  }
  document.onkeydown = (e) => {
    const evt = e || window.event;
    if (evt.altKey && evt.code === "KeyA") {
      Constants.Panel.toggle.click();
      Constants.Panel.toggle.focus();
    }
  };
}
const panelStyles = 'h1,h2,h3,div,p,span,ol,ul,li,a,label,button,svg,strong,kbd,pre,code{all:unset;box-sizing:border-box!important}:before,:after{all:unset}div{display:block}*{font-family:var(--sa11y-font-face)!important;-webkit-font-smoothing:auto!important}p,ol,ul,li,label{font-size:var(--sa11y-normal-text);text-align:start;letter-spacing:normal;word-break:break-word;font-weight:400;line-height:22px!important}.sa11y-overflow{overflow:auto}img,video,iframe{border:0;max-width:100%;height:auto;display:block}audio{max-width:100%}#toggle{bottom:var(--sa11y-toggle-y-offset);z-index:2147483644;color:#fff;cursor:pointer;background:linear-gradient(#00bcd4,#e040fb);background-color:var(--sa11y-setting-switch-bg-off);width:55px;height:55px;background-size:150% 150%;border-radius:50%;justify-content:center;align-items:center;margin:0;transition:all .2s ease-in-out;display:flex;position:fixed;inset-inline-end:var(--sa11y-toggle-x-offset);overflow:visible}#toggle.left,#toggle.top-left{inset-inline-start:var(--sa11y-toggle-x-offset)}#toggle.top-left,#toggle.top-right{top:var(--sa11y-toggle-y-offset);bottom:unset}@media screen and (forced-colors:active){#toggle{border:2px solid #0000;background:buttonface!important}}#toggle svg{width:35px;height:35px}#toggle svg path{fill:var(--sa11y-panel-bg)}#toggle:hover,#toggle:focus{animation:3s sa11y-toggle-gradient}#toggle:disabled:hover,#toggle:disabled:focus{animation:none}#toggle.on{background:linear-gradient(#e040fb,#00bcd4)}#toggle:disabled{cursor:not-allowed;background:unset;background-color:var(--sa11y-setting-switch-bg-off)}#notification-badge{color:#fff;text-wrap:nowrap;background-color:#eb0000;border:1px solid #0000;border-radius:12px;justify-content:center;align-items:center;min-width:20px;padding:2.5px;font-size:13.5px;font-weight:400;line-height:1;display:none;position:absolute;top:-5.5px;right:-3px}#notification-badge.notification-badge-warning{color:var(--sa11y-warning-text);background-color:var(--sa11y-warning-hover);border:1px solid var(--sa11y-warning)}#panel{bottom:calc(var(--sa11y-toggle-y-offset) + var(--sa11y-panel-y-gap));z-index:2147483643;visibility:hidden;background:var(--sa11y-panel-bg);opacity:0;transition:transform .2s, opacity .2s background .2s;transform-origin:100% 100%;border-radius:4px;position:fixed;inset-inline-end:calc(var(--sa11y-toggle-x-offset) + var(--sa11y-panel-x-gap));overflow:visible;transform:scale(0);box-shadow:0 0 20px 4px #9aa1b126,0 4px 80px -8px #24282f40,0 4px 4px -2px #5b5e6926}#panel.left,#panel.top-left{inset-inline-start:calc(var(--sa11y-toggle-x-offset) + var(--sa11y-panel-x-gap));inset-inline-end:unset}#panel.top-right,#panel.top-left{top:calc(var(--sa11y-toggle-y-offset) + var(--sa11y-panel-y-gap) + 10px);bottom:unset}#panel.active{visibility:visible;opacity:1;transform-origin:100% 100%;height:auto;transition:transform .2s,opacity .2s;transform:scale(1)}@media screen and (forced-colors:active){#panel{border:2px solid #0000}}#panel.active.left,[dir=rtl] #panel.active{transform-origin:0 100%}#panel.active.top-left{transform-origin:0 0}#panel.active.top-right{transform-origin:100% 0}#panel-alert{opacity:0;display:none}#panel-alert.active{opacity:1;display:block}#panel-alert-content{max-height:400px;color:var(--sa11y-panel-primary);border-bottom:1px solid var(--sa11y-panel-bg-splitter);align-items:center;padding:15px 20px 15px 15px;line-height:22px;position:relative;overflow-y:auto}:is(.top-left,.top-right) #panel-alert-content{border:0}#panel-alert-preview .close-tooltip{display:none}#panel-alert-preview,#panel-alert-text{font-family:var(--sa11y-font-face);font-size:var(--sa11y-normal-text);font-weight:400;line-height:22px}.panel-alert-preview{background:var(--sa11y-panel-bg-secondary);border:1px dashed var(--sa11y-panel-bg-splitter);border-radius:5px;margin-top:15px;padding:10px}.panel-alert-preview ul{margin:0;margin-block:0;padding:0;position:relative}.panel-alert-preview li{margin:5px 10px 0 20px;padding-bottom:5px;display:list-item}.element-preview{overflow-wrap:break-word;background-color:var(--sa11y-element-preview);border-radius:3.2px;margin-bottom:10px;padding:5px}.dismiss-alert,button[data-sa11y-dismiss]{color:var(--sa11y-panel-primary);cursor:pointer;background:var(--sa11y-panel-bg-secondary);border:2px solid var(--sa11y-button-outline);margin:10px 5px 5px 0;border-radius:5px;margin-inline-end:15px;padding:4px 8px;display:block}:is(.dismiss-alert,button[data-sa11y-dismiss]):hover,:is(.dismiss-alert,button[data-sa11y-dismiss]):focus{background:var(--sa11y-shortcut-hover)}h2{font-size:var(--sa11y-large-text);margin-bottom:3px;font-weight:700;display:block}h3{font-size:calc(var(--sa11y-large-text) - 1px);margin-bottom:3px;font-weight:600;display:block}strong{font-weight:600}a:not(#outline-list a,#images-list a){color:var(--sa11y-hyperlink);cursor:pointer;border-bottom:0;font-weight:500;text-decoration:underline}a:hover,a:focus{text-decoration:none!important}hr{background:var(--sa11y-panel-bg-splitter);opacity:1;border:none;height:1px;margin:10px 0;padding:0}#dismiss-button,#skip-button{text-align:center;cursor:pointer;background:var(--sa11y-panel-bg-secondary);border:1px solid var(--sa11y-button-outline);border-radius:50px;width:36px;height:36px;margin-inline:2px 8px;transition:all .1s ease-in-out;display:none;position:relative;overflow:visible}:is(#dismiss-button,#skip-button).active{display:block}:is(#dismiss-button,#skip-button):disabled{cursor:default;box-shadow:none;background:0 0;border:0}:is(#dismiss-button,#skip-button):before{content:"";position:absolute;inset:-5px}:is(#dismiss-button,#skip-button):hover:not(:disabled),:is(#dismiss-button,#skip-button):focus:not(:disabled){background-color:var(--sa11y-shortcut-hover)}:is(#panel.top-left,#panel.left) #dismiss-button,:is(#panel.top-left,#panel.left) #skip-button{margin-inline:8px 2px}.dismiss-icon{background:var(--sa11y-setting-switch-bg-off);width:24px;height:24px;-webkit-mask:var(--sa11y-dismiss-icon) center no-repeat;mask:var(--sa11y-dismiss-icon) center no-repeat;margin-bottom:-4px;display:inline-block}.dismiss-group{display:flex}@media screen and (forced-colors:active){.dismiss-icon{filter:invert()}}#panel-content{color:var(--sa11y-panel-primary);align-items:center;padding:6px;display:flex}#panel-content.errors .panel-icon,#panel-content.good .panel-icon,#panel-content.warnings .panel-icon{width:26px;height:26px;margin:0 auto}#panel-content.errors .panel-icon{background:var(--sa11y-panel-error);-webkit-mask:var(--sa11y-error-svg) center no-repeat;mask:var(--sa11y-error-svg) center no-repeat;margin-top:-2px}#panel-content.good .panel-icon{background:var(--sa11y-good);-webkit-mask:var(--sa11y-good-svg) center no-repeat;mask:var(--sa11y-good-svg) center no-repeat}#panel-content.warnings .panel-icon{background:var(--sa11y-yellow-text);transform:scaleX(var(--sa11y-icon-direction));-webkit-mask:var(--sa11y-warning-svg) center no-repeat;mask:var(--sa11y-warning-svg) center no-repeat}@media screen and (forced-colors:active){#panel-content.errors .panel-icon,#panel-content.good .panel-icon,#panel-content.warnings .panel-icon{filter:invert()}}#panel.top-left #panel-content,#panel.left #panel-content{flex-direction:row-reverse}#status{font-size:var(--sa11y-large-text);color:var(--sa11y-panel-primary)}.panel-count{color:var(--sa11y-panel-primary);background-color:var(--sa11y-panel-badge);border-radius:4px;margin-left:3px;margin-right:3px;padding:2px 4px;font-size:15px;font-weight:400}#page-issues,#images-panel,#settings-panel,#outline-panel{color:var(--sa11y-panel-primary);opacity:0;display:none}#page-issues.active,#images-panel.active,#settings-panel.active,#outline-panel.active{opacity:1;display:block}.panel-header{text-align:start;justify-content:space-between;padding:10px 15px 0;display:flex}#about-content{padding-top:5px}#about-content p{margin-block-end:1em;display:block}#images-content,#page-issues-content,#settings-content,#outline-content{border-bottom:1px solid var(--sa11y-panel-bg-splitter);padding:0 15px 10px}.top-right :is(#images-content,#page-issues-content,#settings-content,#outline-content),.top-left :is(#images-content,#page-issues-content,#settings-content,#outline-content){border:0}#images-content{padding-inline:5px}#page-issues-content{max-height:160px;overflow-y:auto}#settings-content{max-height:400px;overflow-y:auto}#images-content,#outline-content{max-height:250px;overflow-y:auto}#settings-panel .sa11y-red-text,#outline-panel .outline-list-item.sa11y-red-text{color:var(--sa11y-red-text)}#outline-list{margin:0;padding:0;display:block}#outline-list button{cursor:pointer;text-decoration:none;display:block}#outline-list button:hover,#outline-list button:focus{background:var(--sa11y-panel-outline-hover);box-shadow:0 0 0 2px var(--sa11y-panel-outline-hover);border-radius:5px;display:block}#outline-list li{margin-top:0;margin-bottom:4.5px;padding:0;list-style-type:none;display:block}#outline-list li:first-child{margin-top:5px}#outline-list .outline-2{margin-inline-start:15px}#outline-list .outline-3{margin-inline-start:30px}#outline-list .outline-4{margin-inline-start:45px}#outline-list .outline-5{margin-inline-start:60px}#outline-list .outline-6{margin-inline-start:75px}#images-list{margin:0;padding:0;display:block}#images-list button{cursor:pointer;min-height:44px;margin:10px 5px;text-decoration:none;display:block}#images-list button:hover,#images-list button:focus{background:var(--sa11y-panel-outline-hover);box-shadow:0 0 0 2px var(--sa11y-panel-outline-hover);border-radius:5px;display:block}#images-list li{border-bottom:1px solid var(--sa11y-panel-bg-splitter);flex-direction:column;width:100%;list-style-type:none;display:flex;overflow:hidden}#images-list li.no-images{padding-inline:10px}#images-list li:last-child{border:none;margin-bottom:0}#images-list li .alt{padding:2px 5px 10px}#images-list li .edit-block{justify-content:flex-end;margin-bottom:15px;display:flex}#images-list li .edit{color:var(--sa11y-panel-primary);cursor:pointer;background:var(--sa11y-panel-bg-secondary);border:2px solid var(--sa11y-button-outline);border-radius:5px;margin-inline-end:5px;padding:4px 7px;text-decoration:none;position:relative}#images-list li .edit:hover,#images-list li .edit:focus{background-color:var(--sa11y-shortcut-hover)}#images-list li .edit:before{content:"";position:absolute;inset:-10px}#images-list li img{float:inline-start;border-radius:5px;max-width:110px;margin:5px}#images-list li.warning .alt{color:var(--sa11y-yellow-text)}#images-list li.warning img{background-color:var(--sa11y-yellow-text);border:5px solid var(--sa11y-yellow-text)}#images-list li.error .alt{color:var(--sa11y-error)}#images-list li.error img{background-color:var(--sa11y-error);border:5px solid var(--sa11y-error)}#images-list li.good img{background-color:var(--sa11y-panel-badge);border:5px solid var(--sa11y-panel-badge)}@media screen and (forced-colors:active){#images-list li img{background-color:buttonborder!important}}.move-panel-icon{vertical-align:middle;background:var(--sa11y-setting-switch-bg-off);width:18px;height:18px;-webkit-mask:var(--sa11y-move-panel-icon);mask:var(--sa11y-move-panel-icon)}.info-icon{vertical-align:middle;background:var(--sa11y-setting-switch-bg-off);width:20px;height:20px;-webkit-mask:var(--sa11y-info-icon);mask:var(--sa11y-info-icon);margin-top:-2px}.sun-icon{vertical-align:middle;background:var(--sa11y-setting-switch-bg-off);width:18px;height:18px;-webkit-mask:var(--sa11y-sun-icon);mask:var(--sa11y-sun-icon)}.moon-icon{vertical-align:middle;background:var(--sa11y-setting-switch-bg-off);width:18px;height:18px;-webkit-mask:var(--sa11y-moon-icon);mask:var(--sa11y-moon-icon)}.error-icon{background:var(--sa11y-error-text);width:16px;height:16px;-webkit-mask:var(--sa11y-error-svg);mask:var(--sa11y-error-svg);margin-bottom:-4px}.hidden-icon{background:var(--sa11y-panel-primary);width:16px;height:16px;-webkit-mask:var(--sa11y-hidden-icon-svg);mask:var(--sa11y-hidden-icon-svg);margin-bottom:-3px}.link-icon{background:var(--sa11y-panel-primary);width:16px;height:16px;-webkit-mask:var(--sa11y-link-icon-svg);mask:var(--sa11y-link-icon-svg);margin-bottom:-3.5px}.move-panel-icon,.info-icon,.sun-icon,.moon-icon,.error-icon,.hidden-icon,.link-icon{display:inline-block;-webkit-mask-position:50%;mask-position:50%;-webkit-mask-repeat:no-repeat;mask-repeat:no-repeat}.error-badge .link-icon,.error-badge .hidden-icon{background:var(--sa11y-error-text)!important}.warning-badge .link-icon,.warning-badge .hidden-icon{background:var(--sa11y-panel-bg)}.error .hidden-icon,.error .link-icon{background:var(--sa11y-error-text)}.warning .hidden-icon,.warning .link-icon{background:var(--sa11y-panel-bg)}@media screen and (forced-colors:active){.move-panel-icon,.sun-icon,.moon-icon,.info-icon,.error-icon,.link-icon,.hidden-icon{filter:invert()}}#outline-list [class$=-icon]{margin-inline-end:3px}#panel-controls{border-bottom:1px solid var(--sa11y-panel-bg-splitter);border-radius:0 0 4px 4px;display:flex;overflow:hidden}#panel-controls button{width:100%;height:30px;font-size:var(--sa11y-normal-text);color:var(--sa11y-panel-secondary);text-align:center;cursor:pointer;background:var(--sa11y-panel-bg-secondary);background-color:var(--sa11y-panel-bg-secondary);border-top:1px solid var(--sa11y-panel-bg-splitter);border-inline-end:1px solid var(--sa11y-panel-bg-splitter);opacity:1;outline:0;margin:0;padding:0;font-weight:400;line-height:0;transition:background .2s;display:block;position:relative}#panel-controls button:hover,#panel-controls button.active{background-color:var(--sa11y-shortcut-hover)}#panel-controls button.active{font-weight:600}#export-results-mode,label{width:100%;color:var(--sa11y-panel-primary);margin:0;font-weight:400;display:inline-block}label:not(#colour-filter-mode,#export-results-mode){cursor:pointer}#panel.right #panel-controls[data-image-panel]:after{content:"";width:80px}#panel.left #panel-controls[data-image-panel]:before{content:"";width:50px}#settings-panel .export-results-group,#settings-panel .appearance-group{margin:5px 0;display:flex}:is(#settings-panel .export-results-group,#settings-panel .appearance-group) button{text-align:center;white-space:nowrap;cursor:pointer;border:2px solid var(--sa11y-setting-switch-bg-off);border-radius:5px;justify-content:center;align-items:center;min-width:44px;min-height:34px;margin:2px 0;margin-inline:8px 4px;display:flex;position:relative}:is(#settings-panel .export-results-group,#settings-panel .appearance-group) button:hover,:is(#settings-panel .export-results-group,#settings-panel .appearance-group) button:focus,:is(#settings-panel .export-results-group,#settings-panel .appearance-group) button:focus-within{background:var(--sa11y-shortcut-hover)}:is(#settings-panel .export-results-group,#settings-panel .appearance-group) button:before{content:"";position:absolute;inset:-7px}:is(#settings-panel .export-results-group,#settings-panel .appearance-group) button .text{color:var(--sa11y-setting-switch-bg-off);padding:0 6px;font-weight:600}#settings-panel .switch{width:105px;height:44px;font-size:var(--sa11y-normal-text);color:var(--sa11y-setting-switch-bg-off);text-align:end;cursor:pointer;background:0 0;border:0;border-radius:5px;margin:0;padding:7px 10px;font-weight:600;position:relative}#settings-panel .switch[aria-pressed=true]:after,#settings-panel .switch[aria-pressed=false]:after{vertical-align:middle;content:"";width:27px;height:27px;margin:0 4px 4px;display:inline-block}#settings-panel .switch[aria-pressed=true]:after{background:var(--sa11y-setting-switch-bg-on);-webkit-mask:var(--sa11y-setting-switch-on-svg) center no-repeat;mask:var(--sa11y-setting-switch-on-svg) center no-repeat}#settings-panel .switch[aria-pressed=false]:after{background:var(--sa11y-setting-switch-bg-off);-webkit-mask:var(--sa11y-setting-switch-off-svg) center no-repeat;mask:var(--sa11y-setting-switch-off-svg) center no-repeat}@media screen and (forced-colors:active){#settings-panel .switch[aria-pressed=false]:after,#settings-panel .switch[aria-pressed=true]:after{filter:invert()}}#settings-panel #settings-options li{border-bottom:1px solid var(--sa11y-panel-bg-splitter);justify-content:space-between;align-items:center;padding:1px 0;list-style-type:none;display:flex}#settings-panel #settings-options li:last-child{border:none}#page-issues{color:var(--sa11y-panel-primary);align-items:center}#page-issues-list{margin-top:4px;display:block}#page-issues-list li{margin:0 0 10px;display:block}:is(.top-left,.top-right).has-page-issues #page-issues{border-top:1px solid var(--sa11y-panel-bg-splitter);margin-top:-1px}#panel-colour-filters{font-family:var(--sa11y-font-face);font-size:var(--sa11y-normal-text);color:var(--sa11y-panel-primary);align-items:center;font-weight:400;line-height:22px;display:none}#panel-colour-filters.active{display:flex}#panel-colour-filters p{width:100%;padding:6px 20px 6px 6px}#panel-colour-filters[data-colour=protanopia],#panel-colour-filters[data-colour=deuteranopia],#panel-colour-filters[data-colour=tritanopia],#panel-colour-filters[data-colour=monochromacy]{border-bottom:6px solid #0000;border-image-slice:1}#panel-colour-filters[data-colour=protanopia]{border-image:linear-gradient(94deg,#786719 11%,#e0c600 36% 47%,#0059e3 75%,#0042aa 91%)}#panel-colour-filters[data-colour=deuteranopia]{border-image:linear-gradient(270deg,#567fdb 0%,#a4a28d 48%,#c3ad14 69%,#a79505 100%)}#panel-colour-filters[data-colour=tritanopia]{border-image:linear-gradient(270deg,#b1506f 0%,#0696c1 35%,#f3a9ba 70%,#d91c5d 87%,#fe015c 100%)}#panel-colour-filters[data-colour=monochromacy]{border-image:linear-gradient(270deg,#000 0%,#a7a7a7 50%,#000 100%)}#panel-colour-filters[data-colour=protanopia] .panel-icon{background:var(--sa11y-panel-error)}#panel-colour-filters[data-colour=deuteranopia] .panel-icon{background:var(--sa11y-good-hover)}#panel-colour-filters[data-colour=tritanopia] .panel-icon{background:var(--sa11y-blue)}#panel-colour-filters[data-colour=monochromacy] .panel-icon{background:linear-gradient(90deg,#38a459 20%,red 50%,#0077c8 80%)}#panel-colour-filters .panel-icon{width:30px;height:30px;-webkit-mask:var(--sa11y-low-vision-icon) center no-repeat;mask:var(--sa11y-low-vision-icon) center no-repeat;margin-inline:10px 5px}@media screen and (forced-colors:active){#panel-colour-filters .panel-icon{forced-color-adjust:none}}.select-dropdown{align-items:center;display:flex;position:relative}.select-dropdown:after{content:" ";border-top:5px solid var(--sa11y-setting-switch-bg-off);border-left:5px solid #0000;border-right:5px solid #0000;position:absolute;inset-inline-end:14px}#colour-filter-select{appearance:none;height:30px;font-size:var(--sa11y-normal-text);color:var(--sa11y-setting-switch-bg-off);text-align:end;vertical-align:middle;cursor:pointer;background:var(--sa11y-panel-bg);border:2px solid var(--sa11y-setting-switch-bg-off);border-radius:5px;margin-inline-end:4px;padding-inline:5px 25px;font-weight:400;position:relative}#colour-filter-select:hover,#colour-filter-select:focus{background:var(--sa11y-shortcut-hover)}#colour-filter-select.active{box-shadow:0 0 0 2px var(--sa11y-setting-switch-bg-on)}#colour-filter-item label,#colour-filter-item select{margin-top:10px;margin-bottom:9px}#readability-panel{opacity:0;display:none}#readability-panel.active{opacity:1;display:block}:is(.top-left,.top-right) #readability-content{border-top:1px solid var(--sa11y-panel-bg-splitter)}:is(.left,.right) #readability-content{border-bottom:1px solid var(--sa11y-panel-bg-splitter)}#readability-content{width:100%;color:var(--sa11y-panel-primary);padding:10px 15px}#readability-details{white-space:normal;margin:0;padding:0;list-style-type:none;display:block}#readability-details li{margin:0;padding-inline-end:10px;list-style-type:none;display:inline-block}.readability-score{color:var(--sa11y-panel-primary);background-color:var(--sa11y-panel-badge);border-radius:4px;margin-inline-start:5px;padding:2px 5px}#readability-info{margin-inline-start:10px}#skip-to-page-issues{display:none}#panel.has-page-issues #skip-to-page-issues{clip:rect(0, 0, 0, 0);white-space:nowrap;background:var(--sa11y-panel-bg);border:0;border-radius:5px;width:1px;height:1px;margin:-1px;padding:0;font-weight:600;display:block;position:absolute;overflow:hidden}#panel.has-page-issues #skip-to-page-issues:focus{z-index:1;clip:auto;white-space:normal;width:auto;height:auto;margin:0;padding:7px 10px;overflow:visible}.hide-settings-border{border-bottom:0!important;padding:0 15px!important}.hide-settings-border li:not(#colour-filter-item){display:none!important}.hide-settings-border #about-content{display:none}.hide-settings-border.scrollable:before{all:unset}#contrast-tools{display:none}::-webkit-scrollbar{width:7px;height:6px}::-webkit-scrollbar-thumb{background-color:var(--sa11y-button-outline);border-radius:6px}*{scrollbar-color:var(--sa11y-button-outline);scrollbar-width:thin}.scrollable:before{z-index:-1;content:"";background:linear-gradient(180deg, #0000 70%, var(--sa11y-panel-scrollable) 100%);background-position:bottom;width:100%;height:250px;transition:opacity 1s ease-in-out;animation:1s ease-in-out fade;position:absolute;inset:auto 0}#settings-content.scrollable:before{height:400px}.top-right .scrollable:before,.top-left .scrollable:before{border-radius:5px}#page-issues-content.scrollable:before{height:160px}#panel-alert.scrollable:before{height:200px}@keyframes sa11y-toggle-gradient{0%{background-position:50% 0}50%{background-position:50% 100%}to{background-position:50% 0}}@keyframes fade{0%{opacity:0}to{opacity:1}}@media (prefers-reduced-motion:reduce){*{transition:none!important;animation:none!important;transform:none!important}}#panel{width:440px}#container:lang(en) #panel{width:315px}:is(#container:lang(nb),#container:lang(da),#container:lang(pl),#container:lang(de),#container:lang(sv),#container:lang(zh)) #panel{width:365px}:is(#container:lang(bg),#container:lang(es)) .switch:not(#export-results-item *){width:230px!important}#container:not(:lang(en),:lang(de)) .switch{width:205px}';
class ControlPanel extends HTMLElement {
  connectedCallback() {
    this.attachShadow({ mode: "open" });
    const style = document.createElement("style");
    style.textContent = panelStyles + sharedStyles;
    this.shadowRoot.appendChild(style);
    const MainToggleIcon = '<svg aria-hidden="true" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path d="M256 48c114.953 0 208 93.029 208 208 0 114.953-93.029 208-208 208-114.953 0-208-93.029-208-208 0-114.953 93.029-208 208-208m0-40C119.033 8 8 119.033 8 256s111.033 248 248 248 248-111.033 248-248S392.967 8 256 8zm0 56C149.961 64 64 149.961 64 256s85.961 192 192 192 192-85.961 192-192S362.039 64 256 64zm0 44c19.882 0 36 16.118 36 36s-16.118 36-36 36-36-16.118-36-36 16.118-36 36-36zm117.741 98.023c-28.712 6.779-55.511 12.748-82.14 15.807.851 101.023 12.306 123.052 25.037 155.621 3.617 9.26-.957 19.698-10.217 23.315-9.261 3.617-19.699-.957-23.316-10.217-8.705-22.308-17.086-40.636-22.261-78.549h-9.686c-5.167 37.851-13.534 56.208-22.262 78.549-3.615 9.255-14.05 13.836-23.315 10.217-9.26-3.617-13.834-14.056-10.217-23.315 12.713-32.541 24.185-54.541 25.037-155.621-26.629-3.058-53.428-9.027-82.141-15.807-8.6-2.031-13.926-10.648-11.895-19.249s10.647-13.926 19.249-11.895c96.686 22.829 124.283 22.783 220.775 0 8.599-2.03 17.218 3.294 19.249 11.895 2.029 8.601-3.297 17.219-11.897 19.249z"/></svg>';
    const rememberDeveloper = store.getItem("sa11y-developer") === "On";
    const rememberReadability = store.getItem("sa11y-readability") === "On";
    const rememberTheme = store.getItem("sa11y-theme");
    const rememberPanelPosition = store.getItem("sa11y-position");
    const checkAll2 = State.option.checkAllHideToggles;
    const developerPlugin = State.option.developerPlugin ? `
      <li id="developer-item" ${checkAll2 ? "hidden" : ""}>
        <label id="check-developer" for="developer-toggle">
          ${Lang._("DEVELOPER_CHECKS")} <span class="info-icon"></span>
        </label>
        <button type="button" id="developer-toggle" class="switch"
          aria-labelledby="check-developer" aria-describedby="check-developer-desc"
          aria-pressed="${rememberDeveloper ? "true" : "false"}"
        >${rememberDeveloper ? Lang._("ON") : Lang._("OFF")}</button>
        <div id="check-developer-desc" hidden>${Lang._("DEVELOPER_DESC")}</div>
      </li>` : "";
    const readabilityPlugin = Constants.Readability.Plugin ? `
      <li id="readability-item">
        <label id="check-readability" for="readability-toggle">${Lang._("READABILITY")} <span class="info-icon"></span></label>
        <button type="button" id="readability-toggle" aria-labelledby="check-readability" class="switch"
          aria-pressed="${rememberReadability ? "true" : "false"}"
        >${rememberReadability ? Lang._("ON") : Lang._("OFF")}</button>
        <div id="check-readability-desc" hidden>${Lang._("READABILITY_DESC")}</div>
      </li>` : "";
    const colourFilterPlugin = State.option.colourFilterPlugin ? `
      <li id="colour-filter-item">
        <label id="colour-filter-mode" for="colour-filter">${Lang._("COLOUR_FILTER")}</label>
        <div class="select-dropdown">
          <select id="colour-filter-select">
            <option value="0">${Lang._("OFF")}</option>
            <option value="1">${Lang._("PROTANOPIA")}</option>
            <option value="2">${Lang._("DEUTERANOPIA")}</option>
            <option value="3">${Lang._("TRITANOPIA")}</option>
            <option value="4">${Lang._("MONOCHROMACY")}</option>
          </select>
        </div>
      </li>` : "";
    const colourFilterPanel = State.option.colourFilterPlugin ? `
      <div id="panel-colour-filters" role="region" aria-labelledby="colour-filter-mode">
        <div id="filter-icon" class="panel-icon" role="img"></div>
        <p>${Lang._("COLOUR_FILTER_MESSAGE")}</p>
      </div>` : "";
    const exportResultsPlugin = State.option.exportResultsPlugin ? `
      <li id="export-results-item">
        <span id="export-results-mode">${Lang._("EXPORT_RESULTS")}</span>
        <div class="export-results-group">
          <button type="button" id="export-csv" aria-describedby="export-results-mode">
            <span class="text">CSV</span>
          </button>
          <button type="button" id="export-html" aria-describedby="export-results-mode">
            <span class="text">HTML</span>
          </button>
        </div>
      </li>` : "";
    const aboutSection = State.option.aboutContent ? `
      <div id="about-content">${State.option.aboutContent}</div>` : "";
    const mainToggle2 = `
      <button type="button" aria-expanded="false" id="toggle" part="toggle" aria-describedby="notification-badge" aria-label="${Lang._("MAIN_TOGGLE_LABEL")}" class="${rememberPanelPosition}" disabled>
        ${MainToggleIcon}
        <div id="notification-badge">
          <span id="notification-count"></span>
          <span id="notification-text" class="visually-hidden"></span>
        </div>
      </button>`;
    const pageIssues = `
      <div id="page-issues">
        <div class="panel-header">
          <h2 id="page-issues-header" tabindex="-1">${Lang._("PAGE_ISSUES")}</h2>
        </div>
        <div id="page-issues-content">
          <ul id="page-issues-list" role="list" aria-labelledby="page-issues-header"></ul>
        </div>
      </div>`;
    const pageOutline = `
      <div id="outline-panel" role="tabpanel" aria-labelledby="outline-header">
        <div class="panel-header">
          <h2 id="outline-header" tabindex="-1">${Lang._("OUTLINE")}</h2>
        </div>
        <div id="outline-content">
          <ul id="outline-list" tabindex="0" role="list" aria-labelledby="outline-header"></ul>
        </div>
        <div id="readability-panel">
          <div id="readability-content">
            <h2 class="header-text-inline">${Lang._("READABILITY")}</h2>
            <p id="readability-info"></p>
            <ul id="readability-details"></ul>
          </div>
        </div>
      </div>`;
    const imagesOutline = State.option.showImageOutline ? `
      <div id="images-panel" role="tabpanel" aria-labelledby="images-header">
        <div class="panel-header">
          <h2 id="images-header" tabindex="-1">${Lang._("IMAGES")}</h2>
        </div>
        <div id="images-content">
          <ul id="images-list" tabindex="0" role="list" aria-labelledby="images-header"></ul>
        </div>
      </div>` : "";
    const leftPressed = rememberPanelPosition === "left" || rememberPanelPosition === "top-left";
    const panelMoved = leftPressed ? "true" : "false";
    const panelPositionToggle = State.option.showMovePanelToggle ? `<button type="button" id="move-panel"
          aria-label="${Lang._("MOVE_PANEL")}"
          aria-pressed="${panelMoved}"
          ><span class="move-panel-icon"></span>
        </button>` : "";
    const pageSettings = `
      <div id="settings-panel" role="tabpanel" aria-labelledby="settings-header">
        <div class="panel-header">
          <h2 id="settings-header" tabindex="-1">${Lang._("SETTINGS")}</h2>
        </div>
        <div id="settings-content">
          <ul id="settings-options">
            ${developerPlugin}
            ${readabilityPlugin}
            <li id="appearance-item">
              <span id="appearance-mode">${Lang._("APPEARANCE")}</span>
              <div class="appearance-group">
                <button type="button" id="theme-toggle"
                  aria-label="${Lang._("DARK_MODE")}"
                  aria-pressed=${rememberTheme === "dark" ? "true" : "false"}
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
    const panelAlerts = `
      <div id="panel-alert" role="alertdialog" aria-labelledby="alert-heading" aria-describedby="panel-alert-text">
        <div id="panel-alert-content">
          <div class="header-text">
            <button type="button" id="close-alert" class="close-btn" aria-label="${Lang._("ALERT_CLOSE")}"></button>
            <h2 id="alert-heading">${Lang._("ALERT_TEXT")}</h2>
          </div>
          <p id="panel-alert-text"></p>
          <div id="panel-alert-preview"></div>
        </div>
      </div>`;
    const panelStatus = `
      <div id="panel-content">
        <button type="button" id="skip-to-page-issues">
          ${Lang._("SKIP_TO_PAGE_ISSUES")}
        </button>
        <button type="button" id="skip-button">
          <div class="panel-icon"></div>
          <span class="visually-hidden">${Lang._("SHORTCUT_SR")}</span>
        </button>
        <button type="button" id="dismiss-button">
          <div class="dismiss-icon"></div>
          <span id="dismiss-tooltip" class="visually-hidden"></span>
        </button>
        <div id="panel-text">
          <h1 class="visually-hidden">${Lang._("PANEL_HEADING")}</h1>
          <p id="status" aria-live="polite"></p>
        </div>
      </div>`;
    const imageToggleButton = `<button type="button" role="tab" aria-expanded="false" id="images-toggle" aria-controls="images-panel">${Lang._("IMAGES")}</button>`;
    const imagePanelEnabled = State.option.showImageOutline ? "data-image-panel" : "";
    const tabToggles = `
      <div id="panel-controls" role="tablist" aria-orientation="horizontal" ${imagePanelEnabled}>
        <button type="button" role="tab" aria-expanded="false" id="outline-toggle" aria-controls="outline-panel">${Lang._("OUTLINE")}</button>
        ${State.option.showImageOutline ? imageToggleButton : ""}
        <button type="button" role="tab" aria-expanded="false" id="settings-toggle" aria-controls="settings-panel">${Lang._("SETTINGS")}</button>
      </div>`;
    const container = document.createElement("div");
    container.setAttribute("id", "container");
    container.setAttribute("role", "region");
    container.setAttribute("data-sa11y-version", "5.0.0");
    container.setAttribute("lang", Lang._("LANG_CODE"));
    container.setAttribute("aria-label", Lang._("CONTAINER_LABEL"));
    container.setAttribute("dir", Constants.Global.langDirection);
    if (rememberPanelPosition === "top-left" || rememberPanelPosition === "top-right") {
      container.innerHTML = `
        ${mainToggle2}
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
        ${mainToggle2}
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
    this.shadowRoot.appendChild(container);
    Constants.initializePanelSelectors();
  }
}
function settingsPanelToggles() {
  if (State.option.showMovePanelToggle) {
    Constants.Panel.movePanelToggle.onclick = async () => {
      const panelPosition = store.getItem("sa11y-position");
      const [position1, position2] = panelPosition.includes("top") ? ["top-right", "top-left"] : ["right", "left"];
      const newPosition = panelPosition === position1 ? position2 : position1;
      store.setItem("sa11y-position", newPosition);
      [position1, position2].forEach((classname) => {
        Constants.Panel.toggle.classList.replace(classname, newPosition);
        Constants.Panel.panel.classList.replace(classname, newPosition);
      });
      Constants.Panel.movePanelToggle.setAttribute(
        "aria-pressed",
        panelPosition === position1 ? "true" : "false"
      );
    };
  }
  if (State.option.developerPlugin) {
    Constants.Panel.developerToggle.onclick = async () => {
      if (store.getItem("sa11y-developer") === "On") {
        store.setItem("sa11y-developer", "Off");
        Constants.Panel.developerToggle.textContent = `${Lang._("OFF")}`;
        Constants.Panel.developerToggle.setAttribute("aria-pressed", "false");
        resetAll(false);
        await checkAll();
      } else {
        store.setItem("sa11y-developer", "On");
        Constants.Panel.developerToggle.textContent = `${Lang._("ON")}`;
        Constants.Panel.developerToggle.setAttribute("aria-pressed", "true");
        resetAll(false);
        await checkAll();
      }
    };
  } else {
    store.setItem("sa11y-developer", "Off");
  }
  if (Constants.Readability.Plugin) {
    Constants.Panel.readabilityToggle.onclick = async () => {
      if (store.getItem("sa11y-readability") === "On") {
        store.setItem("sa11y-readability", "Off");
        Constants.Panel.readabilityToggle.textContent = `${Lang._("OFF")}`;
        Constants.Panel.readabilityToggle.setAttribute("aria-pressed", "false");
        Constants.Panel.readability.classList.remove("active");
        resetAll(false);
        await checkAll();
      } else {
        store.setItem("sa11y-readability", "On");
        Constants.Panel.readabilityToggle.textContent = `${Lang._("ON")}`;
        Constants.Panel.readabilityToggle.setAttribute("aria-pressed", "true");
        Constants.Panel.readability.classList.add("active");
        resetAll(false);
        await checkAll();
      }
    };
    if (store.getItem("sa11y-readability") === "On") {
      Constants.Panel.readability.classList.add("active");
    }
  }
  const systemInitiatedDark = window.matchMedia("(prefers-color-scheme: dark)");
  const { themeToggle } = Constants.Panel;
  const { html } = Constants.Global;
  const storeTheme = (theme) => {
    html.setAttribute("data-sa11y-theme", theme);
    store.setItem("sa11y-theme", theme);
    const icon = themeToggle.querySelector("span").classList;
    icon.toggle("moon-icon", theme === "light");
    icon.toggle("sun-icon", theme === "dark");
    themeToggle.setAttribute("aria-pressed", theme === "dark" ? "true" : "false");
  };
  const initialTheme = store.getItem("sa11y-theme") || (systemInitiatedDark.matches ? "dark" : "light");
  storeTheme(initialTheme);
  systemInitiatedDark.addEventListener("change", () => {
    storeTheme(systemInitiatedDark.matches ? "dark" : "light");
  });
  themeToggle.onclick = () => {
    const currentTheme = store.getItem("sa11y-theme") || (systemInitiatedDark.matches ? "dark" : "light");
    const preferredTheme = currentTheme === "dark" ? "light" : "dark";
    storeTheme(preferredTheme);
  };
  if (State.option.colourFilterPlugin) {
    Constants.Panel.colourFilterSelect.addEventListener("change", async () => {
      const option = parseInt(Constants.Panel.colourFilterSelect.value, 10);
      const filters = ["protanopia", "deuteranopia", "tritanopia", "monochromacy"];
      const icons = [
        Lang._("RED_EYE"),
        Lang._("GREEN_EYE"),
        Lang._("BLUE_EYE"),
        Lang._("MONO_EYE")
      ];
      if (option >= 1 && option <= 4) {
        if (window.matchMedia("(forced-colors: active)").matches) {
          createAlert(Lang._("COLOUR_FILTER_HIGH_CONTRAST"));
        } else {
          document.body.setAttribute("data-sa11y-filter", filters[option - 1]);
          Constants.Panel.colourFilterIcon.setAttribute("aria-label", icons[option - 1]);
          resetAttributes(
            ["data-sa11y-error", "data-sa11y-warning", "data-sa11y-good", "data-sa11y-overflow"],
            "document"
          );
          remove(["sa11y-annotation", "sa11y-tooltips", "sa11y-heading-label"], "document");
          Constants.Panel.skipButton.disabled = true;
          Constants.Panel.pageIssues.classList.remove("active");
          Constants.Panel.settingsContent.classList.add("hide-settings-border");
          Constants.Panel.controls.hidden = true;
          Constants.Panel.colourFilterSelect.classList.add("active");
          Constants.Panel.colourPanel.classList.add("active");
          Constants.Panel.colourPanel.setAttribute("data-colour", filters[option - 1]);
          Constants.Panel.content.hidden = true;
        }
      } else {
        resetColourFilters();
        resetAll(false);
        await checkAll();
      }
    });
  }
}
const openOutline = () => {
  Constants.Panel.outlineToggle.classList.add("active");
  Constants.Panel.outline.classList.add("active");
  Constants.Panel.outlineToggle.setAttribute("aria-expanded", "true");
  store.setItem("sa11y-outline", "Opened");
  isScrollable(Constants.Panel.outlineList, Constants.Panel.outlineContent);
  const headingLabels = find("sa11y-heading-label", "document");
  headingLabels.forEach(($el) => {
    $el.hidden = false;
  });
  const event = new CustomEvent("sa11y-build-heading-outline");
  document.dispatchEvent(event);
};
const closeOutline = () => {
  Constants.Panel.outline.classList.remove("active");
  Constants.Panel.outlineToggle.classList.remove("active");
  Constants.Panel.outlineToggle.setAttribute("aria-expanded", "false");
  store.setItem("sa11y-outline", "Closed");
  const headingLabels = find("sa11y-heading-label", "document");
  headingLabels.forEach(($el) => {
    $el.hidden = true;
  });
};
const openImages = () => {
  Constants.Panel.imagesToggle.classList.add("active");
  Constants.Panel.images.classList.add("active");
  Constants.Panel.imagesToggle.setAttribute("aria-expanded", "true");
  store.setItem("sa11y-images", "Opened");
  isScrollable(Constants.Panel.imagesList, Constants.Panel.imagesContent);
  const event = new CustomEvent("sa11y-build-image-outline");
  document.dispatchEvent(event);
};
const closeImages = () => {
  if (State.option.showImageOutline) {
    Constants.Panel.imagesToggle.classList.remove("active");
    Constants.Panel.images.classList.remove("active");
    Constants.Panel.imagesToggle.setAttribute("aria-expanded", "false");
    store.setItem("sa11y-images", "Closed");
  }
};
const openSettings = () => {
  Constants.Panel.settingsToggle.classList.add("active");
  Constants.Panel.settings.classList.add("active");
  Constants.Panel.settingsToggle.setAttribute("aria-expanded", "true");
  store.setItem("sa11y-settings", "Opened");
  isScrollable(
    Constants.Panel.settingsContent,
    Constants.Panel.settingsContent,
    Lang._("SETTINGS")
  );
};
const closeSettings = () => {
  Constants.Panel.settings.classList.remove("active");
  Constants.Panel.settingsToggle.classList.remove("active");
  Constants.Panel.settingsToggle.setAttribute("aria-expanded", "false");
  store.setItem("sa11y-settings", "Closed");
};
function initializePanelToggles() {
  Constants.Panel.outlineToggle.addEventListener("click", () => {
    if (Constants.Panel.outlineToggle.getAttribute("aria-expanded") === "true") {
      closeOutline();
    } else {
      openOutline();
      closeSettings();
      closeImages();
    }
    Constants.Panel.outlineHeader.focus();
  });
  if (store.getItem("sa11y-outline") === "Opened") {
    openOutline();
  }
  if (State.option.showImageOutline) {
    Constants.Panel.imagesToggle.addEventListener("click", () => {
      if (Constants.Panel.imagesToggle.getAttribute("aria-expanded") === "true") {
        closeImages();
      } else {
        openImages();
        closeOutline();
        closeSettings();
      }
      Constants.Panel.imagesHeader.focus();
    });
    if (store.getItem("sa11y-images") === "Opened") {
      openImages();
    }
  }
  Constants.Panel.settingsToggle.addEventListener("click", () => {
    if (Constants.Panel.settingsToggle.getAttribute("aria-expanded") === "true") {
      closeSettings();
    } else {
      openSettings();
      closeOutline();
      closeImages();
    }
    Constants.Panel.settingsHeader.focus();
  });
  if (store.getItem("sa11y-settings") === "Opened") {
    openSettings();
  }
  Constants.Panel.skipToPageIssues.addEventListener("click", () => {
    Constants.Panel.pageIssuesHeader.focus();
  });
  const tabs = Constants.Panel.panel.querySelectorAll("[role=tab]");
  if (tabs.length !== 0) {
    tabs.forEach((tab) => {
      tab.addEventListener("keydown", (e) => {
        if (e.key !== "ArrowRight" && e.key !== "ArrowLeft") {
          return;
        }
        e.preventDefault();
        const currentIndex = Array.from(tabs).indexOf(e.currentTarget);
        let nextIndex;
        if (e.key === "ArrowRight") {
          nextIndex = (currentIndex + 1) % tabs.length;
        } else {
          nextIndex = (currentIndex - 1 + tabs.length) % tabs.length;
        }
        tabs[nextIndex].focus();
      });
    });
  }
}
class HeadingAnchor extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: "open" });
  }
}
class HeadingLabel extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: "open" });
  }
  connectedCallback() {
    const style = document.createElement("style");
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
    this.shadowRoot.appendChild(style);
  }
}
function initialize() {
  const { option } = State;
  if (option.doNotRun?.trim() && document.querySelector(option.doNotRun)) return;
  customElements.define("sa11y-heading-label", HeadingLabel);
  customElements.define("sa11y-heading-anchor", HeadingAnchor);
  customElements.define("sa11y-annotation", Annotations);
  customElements.define("sa11y-tooltips", AnnotationTooltips);
  customElements.define("sa11y-panel-tooltips", PanelTooltips);
  customElements.define("sa11y-control-panel", ControlPanel);
  customElements.define("sa11y-console-error", ConsoleErrors);
  Constants.initializeGlobal();
  Constants.initializeReadability();
  Constants.initializeExclusions();
  if (option.developerChecksOnByDefault) {
    if (store.getItem("sa11y-developer") === null || option.checkAllHideToggles) {
      store.setItem("sa11y-developer", "On");
    }
  }
  documentLoadingCheck(() => {
    if (option.headless) {
      checkAll();
      store.removeItem("sa11y-dismissed-digest");
      return;
    }
    const savedPos = store.getItem("sa11y-position");
    const position = Constants.Global.panelPosition;
    const isTop = (position2) => position2.includes("top");
    if (option.showMovePanelToggle && (!savedPos || isTop(savedPos) !== isTop(position))) {
      store.setItem("sa11y-position", position);
    }
    const controlPanel = new ControlPanel();
    document.body.appendChild(controlPanel);
    settingsPanelToggles();
    initializePanelToggles();
    addColourFilters();
    detectPageChanges();
    mainToggle();
    State.panelTooltips = new PanelTooltips();
    document.body.appendChild(State.panelTooltips);
    Constants.Panel.toggle.disabled = option.delayCheck >= 700;
    setTimeout(() => {
      resetAll();
      checkAll();
    }, option.delayCheck);
  });
}
class Sa11y {
  constructor(options) {
    setState(options);
    initialize();
    Object.assign(this, Utils, {
      checkAll,
      resetAll,
      find,
      enabled,
      disabled
    });
  }
  // Get main results array.
  get results() {
    return State.results;
  }
  // Get found elements.
  get elements() {
    return Elements.Found;
  }
}
export {
  Lang,
  Sa11y
};
