/*!
      * Sa11y, the accessibility quality assurance assistant.
      * @version 4.4.0
      * @author Adam Chaboryk
      * @license GPL-2.0-or-later
      * @copyright © 2020 - 2025 Toronto Metropolitan University.
      * @contact adam.chaboryk@torontomu.ca
      * GitHub: git+https://github.com/ryersondmp/sa11y.git | Website: https://sa11y.netlify.app
      * The above copyright notice shall be included in all copies or substantial portions of the Software.
    **/
(function(global, factory) {
  typeof exports === "object" && typeof module !== "undefined" ? factory(exports) : typeof define === "function" && define.amd ? define(["exports"], factory) : (global = typeof globalThis !== "undefined" ? globalThis : global || self, factory(global.Sa11y = {}));
})(this, (function(exports2) {
  "use strict";
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
    ignoreContentOutsideRoots: false,
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
      // Form labels checks
      LABELS_MISSING_IMAGE_INPUT: true,
      LABELS_INPUT_RESET: true,
      LABELS_MISSING_LABEL: true,
      LABELS_ARIA_LABEL_INPUT: true,
      LABELS_NO_FOR_ATTRIBUTE: true,
      LABELS_PLACEHOLDER: true,
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
      QA_FAKE_HEADING: true,
      QA_FAKE_LIST: true,
      QA_UPPERCASE: true,
      QA_UNDERLINE: true,
      QA_SUBSCRIPT: true,
      QA_NESTED_COMPONENTS: {
        sources: ""
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
      if (args?.length) {
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
      return $el.replaceAll(/<hr>/g, '<hr aria-hidden="true">').replaceAll(/<a[\s]href=/g, '<a target="_blank" rel="noopener noreferrer" href=').replaceAll(/<\/a>/g, `<span class="visually-hidden"> (${Lang._("NEW_TAB")})</span></a>`).replaceAll(/{C}/g, 'class="colour"').replaceAll(/{B}/g, 'class="badge"').replaceAll(/{ALT}/g, `<strong class="badge">${Lang._("ALT")}</strong>`).replaceAll(
        /{L}/g,
        `<strong class="badge"><span class="link-icon"></span><span class="visually-hidden">${Lang._("LINKED")}</span></strong>`
      );
    }
  };
  function removeAlert() {
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
  function createAlert(alertMessage, errorPreview, extendedPreview) {
    removeAlert();
    const Sa11yPanel = document.querySelector("sa11y-control-panel").shadowRoot;
    const alert = Sa11yPanel.getElementById("panel-alert");
    const alertText = Sa11yPanel.getElementById("panel-alert-text");
    const alertPreview = Sa11yPanel.getElementById("panel-alert-preview");
    const alertClose = Sa11yPanel.getElementById("close-alert");
    const skipButton = Sa11yPanel.getElementById("skip-button");
    alert.classList.add("active");
    alertText.innerHTML = alertMessage;
    const elementPreview = extendedPreview ? `<div class="element-preview">${extendedPreview}</div>` : "";
    if (errorPreview) {
      alertPreview.classList.add("panel-alert-preview");
      alertPreview.innerHTML = `${elementPreview}<div class="preview-message">${errorPreview}</div>`;
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
    function initializeGlobal(option) {
      Global.html = document.querySelector("html");
      Global.headless = option.headless;
      Global.panelPosition = option.panelPosition;
      Global.dismissAnnotations = option.dismissAnnotations;
      Global.aboutContent = option.aboutContent;
      Global.shadowDetection = option.shadowComponents.length > 0 || option.autoDetectShadowComponents === true;
      Global.fixedRoots = option.fixedRoots;
      Global.ignoreAriaOnElements = option.ignoreAriaOnElements;
      Global.ignoreTextInElements = option.ignoreTextInElements;
      Global.contrastSuggestions = option.contrastSuggestions;
      Global.contrastAlgorithm = option.contrastAlgorithm.toUpperCase();
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
      let reducedMotion = false;
      if (typeof window.matchMedia === "function") {
        reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
      }
      Global.scrollBehaviour = !reducedMotion || reducedMotion.matches ? "auto" : "smooth";
      Global.langDirection = Global.html.getAttribute("dir") === "rtl" ? "rtl" : "ltr";
      const documentSources = option.checks.QA_DOCUMENT.sources;
      const defaultDocumentSources = 'a[href$=".doc"], a[href$=".docx"], a[href*=".doc?"], a[href*=".docx?"], a[href$=".ppt"], a[href$=".pptx"], a[href*=".ppt?"], a[href*=".pptx?"], a[href^="https://drive.google.com/file"], a[href^="https://docs.google."], a[href^="https://sway."]';
      if (documentSources) {
        Global.documentSources = `${defaultDocumentSources}, ${documentSources}`;
      } else {
        Global.documentSources = defaultDocumentSources;
      }
      const videoSources = option.checks.EMBED_VIDEO.sources;
      const defaultVideoSources = 'video, [src*="Video"], [src*="video"], [src*="watch"], [src*="youtube.com"], [src*="vimeo.com"], [src*="panopto.com"], [src*="wistia.com"], [src*="dailymotion.com"], [src*="brightcove.com"], [src*="vidyard.com"]';
      if (videoSources) {
        const videos = videoSources.split(/\s*[\s,]\s*/).map(($el) => `[src*="${$el}"]`);
        Global.VideoSources = `${defaultVideoSources}, ${videos.join(", ")}`;
      } else {
        Global.VideoSources = defaultVideoSources;
      }
      const audioSources = option.checks.EMBED_AUDIO.sources;
      const defaultAudioSources = 'audio, [src*="soundcloud.com"], [src*="simplecast.com"], [src*="podbean.com"], [src*="buzzsprout.com"], [src*="blubrry.com"], [src*="transistor.fm"], [src*="fusebox.fm"], [src*="libsyn.com"], [src*="spotify.com"], [src*="podcasts.apple.com"], [src*="castbox.fm"], [src*="megaphone.fm"], [src*="spreaker.com"], [src*="anchor.fm"], [src*="rss.com"], [src*="redcircle.com"]';
      if (audioSources) {
        const audio = audioSources.split(/\s*[\s,]\s*/).map(($el) => `[src*="${$el}"]`);
        Global.AudioSources = `${defaultAudioSources}, ${audio.join(", ")}`;
      } else {
        Global.AudioSources = defaultAudioSources;
      }
      const dataVizSources = option.checks.EMBED_DATA_VIZ.sources;
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
          console.error(
            `Sa11y: The target readability root (${desiredReadabilityRoot}) does not exist.`
          );
        }
      } catch {
        Root.Readability.length = 0;
      }
      if (Root.Readability.length === 0 && Global.headless === false) {
        if (Root.areaToCheck.length === 0) {
          Root.Readability.push(document.body);
        } else {
          Root.Readability = Root.areaToCheck;
          setTimeout(() => {
            const { readabilityDetails, readabilityToggle } = Constants.Panel;
            const readabilityOn = readabilityToggle?.getAttribute("aria-pressed") === "true";
            const alert = Constants.Panel.readability.querySelector("#readability-alert");
            if (readabilityDetails && readabilityOn && !alert) {
              const roots = Root.areaToCheck.map((el) => {
                if (el.id) return `#${el.id}`;
                if (el.className) return `.${el.className.split(/\s+/).filter(Boolean).join(".")}`;
                return el.tagName.toLowerCase();
              }).join(", ");
              const note = document.createElement("div");
              note.id = "readability-alert";
              note.innerHTML = `<hr><p>${Lang.sprintf("MISSING_READABILITY_ROOT", roots, desiredReadabilityRoot)}</p>`;
              readabilityDetails.insertAdjacentElement("afterend", note);
            }
          }, 100);
        }
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
    function initializeReadability(option) {
      if (option.readabilityPlugin) {
        Readability.Lang = Lang._("LANG_CODE").substring(0, 2);
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
        const pageLang = Constants.Global.html.getAttribute("lang");
        if (!pageLang) {
          Readability.Plugin = false;
        } else {
          const pageLangLowerCase = pageLang.toLowerCase().substring(0, 2);
          if (!supported.includes(pageLangLowerCase) || !supported.includes(Readability.Lang)) {
            Readability.Plugin = false;
          } else {
            Readability.Plugin = true;
          }
        }
      }
    }
    const Exclusions = {};
    function initializeExclusions(option) {
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
      if (option.containerIgnore) {
        const containerSelectors = option.containerIgnore.split(",").map((item) => item.trim());
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
        "svg title",
        "svg desc",
        ...exclusions
      ];
      if (option.contrastIgnore) {
        Exclusions.Contrast = option.contrastIgnore.split(",").map(($el) => $el.trim()).flatMap(($el) => [$el, `${$el} *`]).concat(Exclusions.Contrast);
      }
      Exclusions.Readability = ["nav li", '[role="navigation"] li', ...exclusions];
      if (option.readabilityIgnore) {
        Exclusions.Readability = option.readabilityIgnore.split(",").map(($el) => $el.trim()).flatMap(($el) => [$el, `${$el} *`]).concat(Exclusions.Readability);
      }
      Exclusions.Headings = option.headerIgnore ? option.headerIgnore.split(",").map(($el) => $el.trim()) : [];
      Exclusions.HeaderSpan = option.headerIgnoreSpan ? option.headerIgnoreSpan.split(",").map(($el) => $el.trim()) : [];
      Exclusions.Outline = option.outlineIgnore ? option.outlineIgnore.split(",").map(($el) => $el.trim()) : [];
      Exclusions.Images = [
        'img[role="presentation"]:not(a img[role="presentation"]), img[aria-hidden="true"]:not(a img[aria-hidden="true"])'
      ];
      if (option.imageIgnore) {
        Exclusions.Images = option.imageIgnore.split(",").map(($el) => $el.trim()).concat(Exclusions.Images);
      }
      Exclusions.Links = [".anchorjs-link"];
      if (option.linkIgnore) {
        Exclusions.Links = option.linkIgnore.split(",").map(($el) => $el.trim()).concat(Exclusions.Links);
      }
      Exclusions.LinkSpan = option.linkIgnoreSpan ? option.linkIgnoreSpan.split(",").map(($el) => $el.trim()) : [];
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
      if (Constants.Global.fixedRoots) {
        root.push(Constants.Global.fixedRoots);
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
        elements.forEach((el, i) => {
          if (el?.matches?.("[data-sa11y-has-shadow-root]") && el?.shadowRoot) {
            shadowFind[i] = el.shadowRoot.querySelectorAll(
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
  const Elements = /* @__PURE__ */ (function myElements() {
    const Found = {};
    function initializeElements(option) {
      Found.Everything = find("*", "root", Constants.Exclusions.Sa11yElements);
      Found.Contrast = Found.Everything.filter(($el) => {
        const matchesSelector = Constants.Exclusions.Contrast.some(
          (exclusion) => $el.matches(exclusion)
        );
        return !matchesSelector && !Constants.Exclusions.Contrast.includes($el);
      });
      Found.Images = Found.Everything.filter(
        ($el) => $el.tagName === "IMG" && !Constants.Exclusions.Images.some((selector) => $el.matches(selector))
      );
      Found.Links = Found.Everything.filter(
        ($el) => ($el.tagName === "A" || $el.tagName === "a") && $el.hasAttribute("href") && !$el.matches('[role="button"]') && // Exclude links with [role="button"]
        !Constants.Exclusions.Links.some((selector) => $el.matches(selector))
      );
      Found.Headings = find(
        'h1, h2, h3, h4, h5, h6, [role="heading"][aria-level]',
        option.ignoreContentOutsideRoots || option.fixedRoots ? "root" : "document",
        Constants.Exclusions.Headings
      );
      Found.HeadingOne = find(
        'h1, [role="heading"][aria-level="1"]',
        option.ignoreContentOutsideRoots || option.fixedRoots ? "root" : "document",
        Constants.Exclusions.Headings
      );
      Found.HeadingOverrideStart = /* @__PURE__ */ new WeakMap();
      Found.HeadingOverrideEnd = /* @__PURE__ */ new WeakMap();
      if (option.initialHeadingLevel) {
        option.initialHeadingLevel.forEach((section) => {
          const headingsInSection = find(
            `${section.selector} :is(h1,h2,h3,h4,h5,h6,[aria-role=heading][aria-level])`,
            option.ignoreContentOutsideRoots || option.fixedRoots ? "root" : "document",
            Constants.Exclusions.Headings
          );
          if (headingsInSection.length > 0) {
            Found.HeadingOverrideStart.set(headingsInSection[0], section.previousHeading);
            Found.HeadingOverrideEnd.set(headingsInSection.pop(), section.previousHeading);
          }
        });
      }
      Found.ExcludedHeadings = Found.Headings.filter(
        (heading) => Constants.Exclusions.Headings.some((exclusion) => heading.matches(exclusion))
      );
      Found.ExcludedOutlineHeadings = Found.Headings.filter(
        (heading) => Constants.Exclusions.Outline.some((exclusion) => heading.matches(exclusion))
      );
      Found.OutlineIgnore = Elements.Found.ExcludedOutlineHeadings.concat(
        Elements.Found.ExcludedHeadings
      );
      Found.Paragraphs = Found.Everything.filter(
        ($el) => $el.tagName === "P" && !$el.closest("table")
      );
      Found.Lists = Found.Everything.filter(($el) => $el.tagName === "LI");
      Found.Blockquotes = Found.Everything.filter(($el) => $el.tagName === "BLOCKQUOTE");
      Found.Tables = Found.Everything.filter(
        ($el) => $el.tagName === "TABLE" && !$el.matches('[role="presentation"]') && !$el.matches('[role="none"]')
      );
      Found.StrongItalics = Found.Everything.filter(($el) => ["STRONG", "EM"].includes($el.tagName));
      Found.Subscripts = Found.Everything.filter(($el) => ["SUP", "SUB"].includes($el.tagName));
      const badLinkSources = option.checks.QA_BAD_LINK.sources;
      Found.CustomErrorLinks = badLinkSources.length ? Found.Links.filter(
        ($el) => badLinkSources.split(",").some((selector) => $el.matches(selector.trim()))
      ) : [];
      const readabilityExclusions = ($el) => Constants.Root.Readability.some((rootEl) => rootEl.contains($el)) && !Constants.Exclusions.Readability.some((selector) => $el.matches(selector));
      Found.Readability = [
        ...Found.Paragraphs.filter(readabilityExclusions),
        ...Found.Lists.filter(readabilityExclusions)
      ];
      const nestedSources = option.checks.QA_NESTED_COMPONENTS.sources || '[role="tablist"], details';
      Found.NestedComponents = Found.Everything.filter(($el) => $el.matches(nestedSources));
      Found.TabIndex = Found.Everything.filter(
        ($el) => $el.hasAttribute("tabindex") && $el.getAttribute("tabindex") !== "0" && !$el.getAttribute("tabindex").startsWith("-")
      );
      Found.Svg = Found.Everything.filter(($el) => $el.tagName === "svg");
      Found.Buttons = Found.Everything.filter(
        ($el) => $el.tagName === "BUTTON" || $el.matches('[role="button"]')
      );
      Found.Inputs = Found.Everything.filter(
        ($el) => ["INPUT", "SELECT", "TEXTAREA", "METER", "PROGRESS"].includes($el.tagName)
      );
      Found.Labels = Found.Everything.filter(($el) => $el.tagName === "LABEL");
      Found.iframes = Found.Everything.filter(
        ($el) => ["IFRAME", "AUDIO", "VIDEO"].includes($el.tagName)
      );
      Found.Videos = Found.iframes.filter(($el) => $el.matches(Constants.Global.VideoSources));
      Found.Audio = Found.iframes.filter(($el) => $el.matches(Constants.Global.AudioSources));
      Found.Visualizations = Found.iframes.filter(
        ($el) => $el.matches(Constants.Global.VisualizationSources)
      );
      Found.EmbeddedContent = Found.iframes.filter(
        ($el) => !$el.matches(Constants.Global.AllEmbeddedContent)
      );
      const html = document.querySelector("html");
      Found.Language = html.getAttribute("lang");
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
      Found,
      initializeAnnotations,
      Annotations: Annotations2
    };
  })();
  const styles$1 = "[data-sa11y-overflow]{overflow:auto!important}[data-sa11y-error]{outline-offset:2px;outline:5px solid var(--sa11y-error)!important}[data-sa11y-warning]:not([data-sa11y-error]){outline-offset:2px;outline:5px solid var(--sa11y-warning)!important}[data-sa11y-pulse-border]{box-shadow:0;animation:1s 2 pulse;outline:5px solid var(--sa11y-focus-color)!important}[data-sa11y-pulse-border]:hover,[data-sa11y-pulse-border]:focus{animation:none}@keyframes pulse{0%{box-shadow:0 0 0 5px var(--sa11y-focus-color)}50%{box-shadow:0 0 0 12px var(--sa11y-pulse-color)}to{box-shadow:0 0 0 5px var(--sa11y-pulse-color)}}img[data-sa11y-pulse-border],h1[data-sa11y-pulse-border],h2[data-sa11y-pulse-border],h3[data-sa11y-pulse-border],h4[data-sa11y-pulse-border],h5[data-sa11y-pulse-border],h6[data-sa11y-pulse-border]{animation:1s 2 pulse-scale}@keyframes pulse-scale{0%{opacity:1;transform:scale(1)}50%{opacity:.7;transform:scale(1.02)}to{opacity:1;transform:scale(1)}}@media (prefers-reduced-motion:reduce){[data-sa11y-pulse-border]{animation:none!important}}@media (forced-colors:active){[data-sa11y-error],[data-sa11y-warning],[data-sa11y-good],[data-sa11y-error-inline],[data-sa11y-warning-inline],[data-sa11y-pulse-border]{forced-color-adjust:none}}";
  const addStyleUtilities = (component) => {
    const CSSUtils = component.shadowRoot.querySelectorAll(".sa11y-css-utilities");
    if (CSSUtils.length === 0) {
      const style = document.createElement("style");
      style.setAttribute("class", "sa11y-css-utilities");
      style.textContent = styles$1;
      component.shadowRoot.appendChild(style);
    }
  };
  function findShadowComponents(option) {
    if (option.autoDetectShadowComponents) {
      const ignore = Constants.Exclusions.Sa11yElements;
      const root = document.querySelector(option.checkRoot);
      const search = root ? Array.from(root.querySelectorAll(`*:not(${ignore})`)) : Array.from(document.body.querySelectorAll(`*:not(${ignore})`));
      search.forEach((component) => {
        if (component.shadowRoot && component.shadowRoot.mode === "open") {
          component.setAttribute("data-sa11y-has-shadow-root", "");
          addStyleUtilities(component);
        }
      });
    } else if (option.shadowComponents) {
      const providedShadow = document.querySelectorAll(option.shadowComponents);
      providedShadow.forEach((component) => {
        component.setAttribute("data-sa11y-has-shadow-root", "");
        addStyleUtilities(component);
      });
    }
  }
  function documentLoadingCheck(callback) {
    if (document.readyState === "complete") {
      callback();
    } else {
      window.addEventListener("load", callback);
    }
  }
  function isScreenReaderOnly(element) {
    const style = getComputedStyle(element);
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
    return element.hidden || getComputedStyle(element).getPropertyValue("display") === "none";
  }
  function isElementVisuallyHiddenOrHidden(element) {
    if (element.offsetWidth === 0 && element.offsetHeight === 0 || element.clientHeight === 1 && element.clientWidth === 1) {
      return true;
    }
    return isElementHidden(element);
  }
  function escapeHTML(string) {
    const div2 = document.createElement("div");
    div2.textContent = string;
    return div2.innerHTML.replaceAll('"', "&quot;").replaceAll("'", "&#039;").replaceAll("`", "&#x60;");
  }
  function decodeHTML(string) {
    return string.replace(/&(#?[a-zA-Z0-9]+);/g, (match, entity) => {
      switch (entity) {
        case "amp":
          return "&";
        case "lt":
          return "<";
        case "gt":
          return ">";
        case "quot":
          return "'";
        case "#39":
          return "'";
        // Convert single quotes to actual single quotes.
        default:
          if (entity.charAt(0) === "#") {
            return String.fromCharCode(
              entity.charAt(1) === "x" ? parseInt(entity.substr(2), 16) : parseInt(entity.substr(1), 10)
            );
          }
          return match;
      }
    });
  }
  function stripHTMLtags(string) {
    return string.replace(/<[^>]*>/g, "");
  }
  function stripAllSpecialCharacters(string) {
    return string.replace(/[^\p{L}\p{N}\s]/gu, "").replace(/\s+/g, " ").trim();
  }
  function sanitizeHTML(string) {
    return string.replace(/[^\w. ]/gi, (c) => `&#${c.charCodeAt(0)};`);
  }
  function sanitizeURL(string) {
    if (!string) return "#";
    const sanitizedInput = String(string).trim();
    if (/^javascript:/i.test(sanitizedInput)) return "#";
    if (/^data:/i.test(sanitizedInput)) return "#";
    const protocols = ["http:", "https:", "mailto:", "tel:", "ftp:"];
    const hasValidProtocol = protocols.some(
      (protocol) => sanitizedInput.toLowerCase().startsWith(protocol)
    );
    if (!hasValidProtocol && !sanitizedInput.startsWith("/") && !sanitizedInput.startsWith("#")) {
      return `./${sanitizedInput}`;
    }
    const cleanedString = sanitizedInput.replace(/<[^>]*>/g, "");
    return encodeURI(cleanedString);
  }
  function sanitizeHTMLBlock(html, allowStyles = false) {
    const tempDiv = document.createElement("div");
    tempDiv.innerHTML = html;
    ["script", "style", "noscript", "iframe", "form"].forEach((tag) => {
      const elements = tempDiv.getElementsByTagName(tag);
      while (elements.length > 0) {
        elements[0].parentNode.removeChild(elements[0]);
      }
    });
    const allElements = Array.from(tempDiv.getElementsByTagName("*"));
    allElements.forEach((element) => {
      Array.from(element.attributes).forEach((attr) => {
        if (attr.name.startsWith("on")) {
          element.removeAttribute(attr.name);
        }
      });
      if (!allowStyles) {
        element.removeAttribute("style");
      }
    });
    return tempDiv.innerHTML;
  }
  function fnIgnore(element, selectors) {
    let ignoreQuery = "noscript,script,style,audio,video,form,iframe";
    if (selectors && selectors.length > 0) {
      ignoreQuery = `${ignoreQuery},${selectors.join(",")}`;
    }
    const clone = element.cloneNode(true);
    const toRemove = clone.querySelectorAll(ignoreQuery);
    let i = toRemove.length;
    while (i--) {
      toRemove[i].remove();
    }
    return clone;
  }
  const gotText = /* @__PURE__ */ new WeakMap();
  function getText(element) {
    if (gotText.has(element)) {
      return gotText.get(element);
    }
    const ignore = fnIgnore(element);
    const text = ignore.textContent.replace(/[\r\n]+/g, "").replace(/\s+/g, " ").trim();
    gotText.set(element, text);
    return text;
  }
  function removeWhitespace(string) {
    return string.replace(/[\r\n]+/g, " ").replace(/\s+/g, " ").trim();
  }
  function truncateString(string, maxLength) {
    const truncatedString = string.substring(0, maxLength).trimEnd();
    return string.length > maxLength ? `${truncatedString}...` : string;
  }
  function debounce$2(callback, wait) {
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
      const style = window.getComputedStyle($el);
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
    if (dataSrc) {
      return resolveUrl(dataSrc);
    }
    const picture = element.closest("picture")?.querySelector("source[srcset]")?.getAttribute("srcset");
    const pictureSrc = getLastSrc(picture);
    if (pictureSrc) {
      return resolveUrl(pictureSrc);
    }
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
    const cleanHTML = sanitizeHTMLBlock(issueObject.htmlPath);
    const truncatedHTML = truncateString(cleanHTML, 600);
    const htmlPath = `<pre><code>${escapeHTML(truncatedHTML)}</code></pre>`;
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
        if (text.length > 1 && element.href && !element.hasAttribute("role")) {
          return `<a href="${sanitizeURL(element.href)}">${sanitizeHTML(truncatedText)}</a>`;
        }
        return htmlPath;
      },
      IMG: (element) => {
        const anchor = element.closest("a[href]");
        const alt = element.alt ? `alt="${sanitizeHTML(element.alt)}"` : "alt";
        const source = getBestImageSource(element);
        function createImageElement(src) {
          return anchor ? `<a href="${sanitizeURL(anchor.href)}" rel="noopener noreferrer"><img src="${src}" ${alt}/></a>` : `<img src="${src}" ${alt}/>`;
        }
        if (convertBase64) {
          return new Promise((resolve) => {
            if (source) {
              const isSameDomain = new URL(source, window.location.origin).origin === window.location.origin;
              if (isSameDomain) {
                fetch(source).then((response) => response.blob()).then((blob) => blobToBase64(blob)).then((base64Source) => {
                  const imageSource = base64Source.startsWith("data:image/") ? base64Source : sanitizeURL(base64Source);
                  resolve(createImageElement(imageSource));
                }).catch(() => {
                  resolve(createImageElement(source));
                });
              } else {
                const imageSource = source.startsWith("data:image/") ? source : sanitizeURL(source);
                resolve(createImageElement(imageSource));
              }
            } else {
              resolve(htmlPath);
            }
          });
        }
        const sanitized = source.startsWith("data:image/") ? source : sanitizeURL(source);
        if (source) {
          return createImageElement(sanitized);
        }
        return htmlPath;
      },
      IFRAME: (element) => {
        const source = element.src;
        const title = element.title ? element.title : "";
        const ariaLabelAttr = element.getAttribute("aria-label");
        const ariaLabel = ariaLabelAttr || "";
        if (source) {
          const iframeTitle = ariaLabel || title;
          return `<iframe src="${sanitizeURL(source)}" aria-label="${sanitizeHTML(iframeTitle)}"></iframe>`;
        }
        return htmlPath;
      },
      AUDIO: () => sanitizeHTMLBlock(issueObject.htmlPath),
      VIDEO: () => sanitizeHTMLBlock(issueObject.htmlPath)
    };
    const tagHandler = tag[issueElement.tagName];
    const elementPreview = tagHandler ? tagHandler(issueElement) : htmlPath;
    return elementPreview;
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
    if (visibleText === "x") {
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
  const styles = ":host{z-index:999999;background:var(--sa11y-panel-bg);border-top:5px solid var(--sa11y-panel-bg-splitter);width:100%;height:fit-content;display:block;position:fixed;bottom:0;left:0;right:0}*{font-size:var(--sa11y-normal-text);color:var(--sa11y-panel-primary);font-family:var(--sa11y-font-face)!important;-webkit-font-smoothing:auto!important;line-height:22px!important}#dialog{max-width:900px;margin:20px auto;padding:20px}h2{font-size:var(--sa11y-large-text);margin-top:0}a{color:var(--sa11y-hyperlink);cursor:pointer;text-decoration:underline}a:hover,a:focus{text-decoration:none}p{margin-top:0}.error{color:var(--sa11y-error-text);background:var(--sa11y-error);border:2px dashed #f08080;margin-bottom:0;padding:5px}";
  const sharedStyles = '.visually-hidden{clip:rect(1px,1px,1px,1px);white-space:nowrap;clip-path:inset(50%);border:0;width:1px;height:1px;padding:0;display:block;position:absolute;overflow:hidden}[hidden]{display:none!important}h2,.header-text-inline,.header-text{font-size:var(--sa11y-large-text);color:var(--sa11y-panel-primary);margin-bottom:3px;font-weight:600;display:block}.header-text-inline{display:inline-block!important}code{font-size:calc(var(--sa11y-normal-text) - 1px);font-weight:600;font-family:monospace!important}pre code{white-space:pre-wrap;overflow:auto}pre,code,kbd,.kbd{color:var(--sa11y-panel-primary);background-color:var(--sa11y-panel-badge);border-radius:3.2px;padding:1.6px 4.8px}.bold{font-weight:600}.error .colour,.red-text{font-family:var(--sa11y-font-face);color:var(--sa11y-red-text)}.warning .colour,.yellow-text{font-family:var(--sa11y-font-face);color:var(--sa11y-yellow-text)}.normal-badge,.badge{min-width:10px;color:var(--sa11y-panel-primary);text-align:center;white-space:nowrap;vertical-align:baseline;background-color:var(--sa11y-panel-badge);border-radius:10px;outline:1px solid #0000;padding:1px 5px 1.75px;font-size:14px;line-height:1;display:inline;font-weight:700!important}.error .badge{color:var(--sa11y-error-text);background:var(--sa11y-error)}.error-badge{color:var(--sa11y-error-text)!important;background:var(--sa11y-error)!important}.warning .badge{color:var(--sa11y-panel-bg);background:var(--sa11y-yellow-text)}.warning-badge{color:var(--sa11y-panel-bg)!important;background:var(--sa11y-yellow-text)!important}.good-contrast{color:var(--sa11y-good-text)!important;background:var(--sa11y-good)!important}#contrast-preview{overflow-wrap:break-word;border:2px dashed var(--sa11y-panel-bg-splitter);background-color:#e8e8e8;background-image:linear-gradient(45deg,#ccc 25%,#0000 25% 75%,#ccc 75%,#ccc),linear-gradient(45deg,#ccc 25%,#0000 25% 75%,#ccc 75%,#ccc);background-position:0 0,5px 5px;background-size:10px 10px;border-radius:3.2px;max-height:100px;margin-top:10px;padding:5px;line-height:1;overflow:clip}#contrast-preview:empty{display:none}#color-pickers{justify-content:space-between;margin-top:10px;margin-bottom:10px;display:flex}#color-pickers label{align-items:center;display:flex}#color-pickers input{cursor:pointer;margin-inline-start:7px}#fg-color-wrapper.unknown,#bg-color-wrapper.unknown{display:inline-block;position:relative}:is(#fg-color-wrapper.unknown,#bg-color-wrapper.unknown):after{z-index:2;color:#fff;pointer-events:none;content:"?";justify-content:center;align-items:center;width:44px;height:44px;margin:-46px 7px;font-size:22px;display:flex;position:absolute}input[type=color i]{background:var(--sa11y-panel-bg-secondary);border-color:var(--sa11y-button-outline);border-style:solid;border-width:1px;border-radius:50%;block-size:44px;inline-size:44px;padding:2px}input[type=color i]::-webkit-color-swatch-wrapper{padding:1px}input[type=color i]::-webkit-color-swatch{border-color:var(--sa11y-button-outline);border-radius:50%}input[type=color i]::-moz-color-swatch{border-color:var(--sa11y-button-outline);border-radius:50%}input[type=color i].unknown{box-shadow:0 0 0 3px var(--sa11y-yellow-text)}.close-btn{float:var(--sa11y-float-rtl);width:32px;height:32px;font-size:var(--sa11y-normal-text);color:var(--sa11y-panel-primary);cursor:pointer;background:var(--sa11y-panel-bg-secondary);border:2px solid var(--sa11y-button-outline);border-radius:50%;margin:0;font-weight:400;transition:all .2s ease-in-out;position:relative}.close-btn:hover,.close-btn:focus{background-color:var(--sa11y-shortcut-hover)}.close-btn:after{content:"";background:var(--sa11y-setting-switch-bg-off);-webkit-mask:var(--sa11y-close-btn-svg)center no-repeat;mask:var(--sa11y-close-btn-svg)center no-repeat;position:absolute;inset:-7px}@media screen and (forced-colors:active){.close-btn:after{filter:invert()}}#container [tabindex="0"]:focus,#container [tabindex="-1"]:focus,#container input:focus,#container select:focus,#container button:focus,#container a:focus{box-shadow:0 0 0 5px var(--sa11y-focus-color);outline:0}#container .switch:focus,#container #panel-controls button:focus{box-shadow:inset 0 0 0 4px var(--sa11y-focus-color);outline:0}#container [tabindex="0"]:focus:not(:focus-visible),#container [tabindex="-1"]:focus:not(:focus-visible),#container input:focus:not(:focus-visible),#container button:focus:not(:focus-visible),#container select:focus:not(:focus-visible),#container #panel-controls button:focus:not(:focus-visible){box-shadow:none;outline:0}#container a:focus-visible,#container button:not(#panel-controls button,.switch):focus-visible,#container select:focus-visible,#container input:focus-visible,#container [tabindex="0"]:focus-visible,#container [tabindex="-1"]:focus-visible{box-shadow:0 0 0 5px var(--sa11y-focus-color);outline:0}#container .switch:focus-visible,#container #panel-controls button:focus-visible{box-shadow:inset 0 0 0 4px var(--sa11y-focus-color);outline:0}@media screen and (forced-colors:active){#panel-controls button:focus{border:inset 3px solid transparent}.close-btn:focus{outline:3px solid #0000!important}#container a:focus,#container [tabindex="-1"]:focus,#container [tabindex="0"]:focus,#container select:focus,#container button:focus{outline:3px solid #0000!important}}';
  class ConsoleErrors extends HTMLElement {
    constructor(error) {
      super();
      this.error = error;
    }
    connectedCallback() {
      const shadow = this.attachShadow({ mode: "open" });
      const style = document.createElement("style");
      style.innerHTML = styles + sharedStyles;
      shadow.appendChild(style);
      const content = document.createElement("div");
      content.setAttribute("id", "dialog");
      content.setAttribute("tabindex", "-1");
      const url2 = window.location;
      const google = "https://forms.gle/sjzK9XykETaoqZv99";
      const template = `## Error Description
\`\`\`javascript
${this.error.stack}
\`\`\`

## Details
- **URL:** ${url2}
- **Version:** ${"4.4.0"}

## Comments
`;
      const encodedTemplate = encodeURIComponent(template);
      const github = `https://github.com/ryersondmp/sa11y/issues/new?title=Bug%20report&body=${encodedTemplate}`;
      content.innerHTML = `
      <button class="close-btn" aria-label="${Lang._("ALERT_CLOSE")}"></button>
      <h2>${Lang._("ERROR")}</h2>
      <p>${Lang.sprintf("CONSOLE_ERROR", google, github)}</p>
      <p class="error">${escapeHTML(this.error.stack)}<br><br>Version: ${"4.4.0"} <br> URL: ${url2}</p>
    `;
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
      }, 0);
    }
  }
  function detectPageChanges(detectSPArouting, checkAll, resetAll) {
    if (detectSPArouting === true) {
      let url2 = window.location.href;
      const checkURL = debounce$2(async () => {
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
  function dismissLogic(results, dismissTooltip) {
    const dismissedIssues = JSON.parse(localStorage.getItem("sa11y-dismissed") || "[]");
    const currentPath = window.location.pathname;
    const isSoloDismissed = (issue, dismissed) => dismissed.key.includes(issue.dismiss) && dismissed.href === currentPath && (issue.type === "warning" || issue.type === "good");
    const dismissAll = (issue, dismissed) => typeof dismissed.dismissAll === "string" && issue.dismissAll === dismissed.dismissAll && dismissed.href === currentPath;
    const soloDismissed = results.filter(
      (issue) => dismissedIssues.some((dismissed) => isSoloDismissed(issue, dismissed))
    );
    const allDismissed = results.filter(
      (issue) => dismissedIssues.some((dismissed) => dismissAll(issue, dismissed))
    );
    const mergeDismissed = [...soloDismissed, ...allDismissed];
    const dismissedResults = [
      ...new Map(mergeDismissed.map((issue) => [issue.dismiss, issue])).values()
    ];
    const dismissCount = dismissedResults.length;
    const updatedResults = results.filter(
      (issue) => !dismissedResults.some(
        (dismissed) => dismissed.dismiss === issue.dismiss && (issue.type === "warning" || issue.type === "good")
      )
    );
    if (dismissCount) {
      Constants.Panel.dismissButton.classList.add("active");
      Constants.Panel.dismissTooltip.innerText = Lang.sprintf("PANEL_DISMISS_BUTTON", dismissCount);
      dismissTooltip.object.setContent(Lang.sprintf("PANEL_DISMISS_BUTTON", dismissCount));
    } else {
      Constants.Panel.dismissButton.classList.remove("active");
    }
    return { dismissedIssues, updatedResults, dismissCount, dismissedResults };
  }
  let restoreDismissedHandler;
  let dismissHandler;
  const dismissIssueButton = async (e, results, checkAll, resetAll) => {
    let savedDismissKeys = JSON.parse(store.getItem("sa11y-dismissed"));
    const dismissButton = e.target;
    const dismissContainer = document.querySelector("sa11y-panel-tooltips");
    dismissContainer.hidden = false;
    if (dismissButton.tagName === "BUTTON" && dismissButton.hasAttribute("data-sa11y-dismiss")) {
      const dismissItem = parseInt(dismissButton.getAttribute("data-sa11y-dismiss"), 10);
      const issue = results.find(($el) => $el.id === dismissItem);
      if (savedDismissKeys === null) {
        setTimeout(() => createAlert(Lang._("DISMISS_REMINDER")), 0);
        savedDismissKeys = [];
      }
      if (issue.dismiss) {
        const dismissAllSelected = dismissButton.hasAttribute("data-sa11y-dismiss-all") ? issue.dismissAll : "";
        const dismissalDetails = {
          key: issue.dismiss,
          href: window.location.pathname,
          ...dismissAllSelected ? { dismissAll: dismissAllSelected } : {}
        };
        const item = find(`[data-sa11y-annotation='${issue.id}']`, "root");
        const latestDismissed = item[0] ? item[0].getAttribute("data-sa11y-position") : 0;
        store.setItem("sa11y-latest-dismissed", latestDismissed);
        store.setItem("sa11y-dismiss-item", JSON.stringify(dismissalDetails));
        savedDismissKeys.push(dismissalDetails);
        store.setItem("sa11y-dismissed", JSON.stringify(savedDismissKeys));
        store.removeItem("sa11y-dismiss-item");
        const tooltip = dismissButton?.closest("[data-tippy-root]");
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
  const restoreDismissButton = async (dismissed, checkAll, resetAll) => {
    const dismissContainer = document.querySelector("sa11y-panel-tooltips");
    dismissContainer.hidden = true;
    const filtered = dismissed.filter((item) => item.href !== window.location.pathname);
    store.setItem("sa11y-dismissed", JSON.stringify(filtered));
    Constants.Panel.dismissButton.classList.remove("active");
    resetAll(false);
    await checkAll();
  };
  function dismissButtons(results, dismissed, checkAll, resetAll) {
    if (Constants.Global.dismissAnnotations) {
      dismissHandler = (e) => dismissIssueButton(e, results, checkAll, resetAll);
      const tooltips = document.querySelector("sa11y-tooltips").shadowRoot;
      tooltips.addEventListener("click", dismissHandler);
      Constants.Panel.panel.addEventListener("click", dismissHandler);
    }
    restoreDismissedHandler = () => restoreDismissButton(dismissed, checkAll, resetAll);
    Constants.Panel.dismissButton?.addEventListener("click", restoreDismissedHandler);
  }
  function removeDismissListeners() {
    Constants.Panel.panel?.removeEventListener("click", dismissHandler);
    Constants.Panel.dismissButton?.removeEventListener("click", restoreDismissedHandler);
  }
  function addColourFilters() {
    if (Constants.Global.colourFilterPlugin) {
      if (Constants.Global.headless === false) {
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
  function resetColourFilters() {
    if (Constants.Global.colourFilterPlugin) {
      Constants.Panel.colourFilterSelect.value = 0;
      Constants.Panel.colourPanel.classList.remove("active");
      Constants.Panel.colourFilterSelect.classList.remove("active");
      Constants.Panel.content.hidden = false;
    }
  }
  const exportResultsStyles = `:root{--font-primary:system-ui,"Segoe UI",roboto,helvetica,arial,sans-serif;--font-secondary:consolas,monaco,"Ubuntu Mono","Liberation Mono","Courier New",courier,monospace;--body-text:#333;--bg-primary:#fff;--bg-secondary:#f6f8fa;--bg-tertiary:#d7d7d7;--link-primary:#004c9b;--red-text:#d30017;--warning-text:#966f0d;--hr:#d7d7d74d;--sa11y-link-icon-svg:url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 640 512'%3E%3Cpath d='M579.8 267.7c56.5-56.5 56.5-148 0-204.5c-50-50-128.8-56.5-186.3-15.4l-1.6 1.1c-14.4 10.3-17.7 30.3-7.4 44.6s30.3 17.7 44.6 7.4l1.6-1.1c32.1-22.9 76-19.3 103.8 8.6c31.5 31.5 31.5 82.5 0 114L422.3 334.8c-31.5 31.5-82.5 31.5-114 0c-27.9-27.9-31.5-71.8-8.6-103.8l1.1-1.6c10.3-14.4 6.9-34.4-7.4-44.6s-34.4-6.9-44.6 7.4l-1.1 1.6C206.5 251.2 213 330 263 380c56.5 56.5 148 56.5 204.5 0L579.8 267.7zM60.2 244.3c-56.5 56.5-56.5 148 0 204.5c50 50 128.8 56.5 186.3 15.4l1.6-1.1c14.4-10.3 17.7-30.3 7.4-44.6s-30.3-17.7-44.6-7.4l-1.6 1.1c-32.1 22.9-76 19.3-103.8-8.6C74 372 74 321 105.5 289.5L217.7 177.2c31.5-31.5 82.5-31.5 114 0c27.9 27.9 31.5 71.8 8.6 103.9l-1.1 1.6c-10.3 14.4-6.9 34.4 7.4 44.6s34.4 6.9 44.6-7.4l1.1-1.6C433.5 260.8 427 182 377 132c-56.5-56.5-148-56.5-204.5 0L60.2 244.3z'/%3E%3C/svg%3E")}@media (prefers-color-scheme:dark){:root{--body-text:#dde8ff;--bg-primary:#0a2051;--bg-secondary:#072c7c;--bg-tertiary:#0041c9;--link-primary:#64b2ff;--red-text:#ffa2a2;--warning-text:#ffdb59;--hr:#0041c94d}}*{margin:0;padding:0}article,aside,nav,ol,p,pre,section,ul{margin-bottom:1rem}body{max-width:70ch;font-family:var(--font-primary);color:var(--body-text);word-break:break-word;overflow-wrap:break-word;background:var(--bg-primary);margin:0 auto;padding:2rem;font-size:1rem;line-height:1.5;overflow-x:hidden}h1,h2,h3{color:var(--body-text);margin-bottom:8px;padding-top:.875rem;padding-bottom:2px;line-height:1}h1{font-size:2.25rem}h2{font-size:1.85rem}h3{font-size:1.55rem}a{color:var(--link-primary)}a:hover,a:focus{text-decoration:none}header,footer{background:var(--bg-secondary);padding:2rem calc(50vw - 50%)}header{border-bottom:1px solid var(--bg-tertiary);margin:-2rem calc(-50vw + 50%) 2rem}footer{text-align:center;border-top:1px solid var(--bg-tertiary);margin:3rem calc(-50vw + 50%) -2rem}header>:first-child{margin-top:0;padding-top:0}header>:last-child{margin-bottom:0}hr{background:var(--hr);opacity:1;border:none;height:1px;margin:10px 0;padding:0}code,samp,kbd,pre{font-family:var(--font-secondary);background:var(--bg-secondary);border:1px solid var(--bg-tertiary);border-radius:4px;padding:3px 6px;font-size:.9rem}pre{max-width:100%;padding:1rem 1.4rem;display:block;overflow:auto}pre code{font-size:inherit;color:inherit;background:inherit;border:0;margin:0;padding:0}code pre{font-size:inherit;color:inherit;background:inherit;border:0;margin:0;padding:0;display:inline}details{background:var(--bg-primary);border:2px solid var(--link-primary);border-radius:4px;padding:.6rem 1rem}summary{cursor:pointer;font-weight:700}details[open]{padding-bottom:.75rem}details[open] summary{margin-bottom:6px}details[open]>:last-child{margin-bottom:0}.two-columns{display:flex}.column{flex:1;margin-inline-end:20px}.count{max-width:220px}dl{padding-top:10px}.column dl{width:100%}dt{font-weight:700}dd{padding-bottom:10px}ul ul,ol ul,ul ol,ol ol{margin-bottom:0}ul li{margin-bottom:.5rem}ol,ul{padding-left:2rem}ol li:not(li li){margin-bottom:4rem}iframe,img{background:var(--bg-tertiary);border-radius:5px;max-width:50%;padding:5px;display:block}video,audio{border:0;display:block}.red-text{color:var(--red-text)}.visually-hidden{clip:rect(1px,1px,1px,1px);white-space:nowrap;clip-path:inset(50%);border:0;width:1px;height:1px;padding:0;display:block;position:absolute;overflow:hidden}.badge{color:#fff;text-align:center;white-space:nowrap;vertical-align:baseline;border-radius:10px;outline:1px solid #0000;min-width:10px;padding:1px 5px 1.75px;font-size:14px;line-height:1;display:inline;font-weight:700!important}.error .colour{color:var(--red-text)}.error .badge{color:#fff;background:#d30017}.warning .colour{color:var(--warning-text)}.warning .badge{color:#fff;background:#966f0d}.link-icon{width:16px;height:16px;-webkit-mask:var(--sa11y-link-icon-svg)center no-repeat;mask:var(--sa11y-link-icon-svg)center no-repeat;background:#fff;margin-bottom:-3.5px;display:inline-block}li pre,li li pre,li li img,li li iframe,li li video,li li audio{margin-top:1rem}li li{margin-top:1rem;list-style:none}`;
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
    const pageURL = window.location.href;
    return { date, numericDate, titleCheck, metaTitle, pageURL };
  }
  async function generateHTMLTemplate(results, dismissResults) {
    const errors = results.filter((issue) => issue.type === "error");
    const warnings = results.filter((issue) => issue.type === "warning");
    const count = { error: errors.length, warning: warnings.length, dismiss: dismissResults.length };
    async function generateList(issues, type) {
      const types = {
        error: Lang._("ERRORS"),
        warning: Lang._("WARNINGS"),
        dismissed: Lang._("DISMISSED")
      };
      const heading = types[type];
      const hasIssues = issues.length > 0;
      if (!hasIssues) {
        return "";
      }
      let list = `<h2>${heading}</h2>`;
      let listOpeningTag = `<ol class="${type}">`;
      let listClosingTag = "</ol>";
      if (type === "dismissed") {
        listOpeningTag = `<details><summary>${Lang.sprintf("PANEL_DISMISS_BUTTON", count.dismiss)}</summary><ol>`;
        listClosingTag = "</details>";
      }
      list += listOpeningTag;
      const issuePromises = issues.map(async (issue) => {
        let elementPreview = "";
        if (issue.element) {
          const allowedTags = ["IMG", "IFRAME", "AUDIO", "VIDEO"];
          const preview = await generateElementPreview(issue, true);
          if (allowedTags.includes(issue.element.tagName)) {
            elementPreview = `<li><strong>${Lang._("PREVIEW")}:</strong> ${preview}</li><li><strong>${Lang._("ELEMENT")}:</strong> <pre><code>${escapeHTML(issue.htmlPath)}</code></pre></li>`;
          } else {
            elementPreview = `<li><strong>${Lang._("ELEMENT")}:</strong> <pre><code>${escapeHTML(issue.htmlPath)}</code></pre></li>`;
          }
        }
        const cssPath = issue.cssPath ? `<li><strong>${Lang._("PATH")}:</strong> <pre><code>${issue.cssPath}</code></pre></li>` : "";
        return `<li>${issue.content} <ul>${elementPreview}${cssPath}</ul></li>`;
      });
      const resolvedIssues = await Promise.all(issuePromises);
      list += resolvedIssues.join("");
      list += listClosingTag;
      return list;
    }
    const errorsList = await generateList(errors, "error");
    const warningList = await generateList(warnings, "warning");
    const dismissedList = await generateList(dismissResults, "dismissed");
    const meta = generateMetaData();
    const metaTitle = !meta.titleCheck ? `<dt>${Lang._("PAGE_TITLE")}</dt><dd>${meta.metaTitle}</dd>` : "";
    const metaErrors = count.error !== 0 ? `<dt>${Lang._("ERRORS")}</dt><dd>${count.error}</dd>` : "";
    const metaWarnings = count.warning !== 0 ? `<dt>${Lang._("WARNINGS")}</dt><dd>${count.warning}</dd>` : "";
    const metaDismissed = count.dismiss !== 0 ? `<dt>${Lang._("DISMISSED")}</dt><dd>${count.dismiss}</dd>` : "";
    const tool = '<a href="https://sa11y.netlify.app">Sa11y</a>';
    const htmlTemplate = `
      <!DOCTYPE html>
      <html lang="${Lang._("LANG_CODE")}">
      <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>${Lang._("RESULTS")}: ${meta.metaTitle}</title>
        <style>${exportResultsStyles}</style>
      </head>
      <body>
        <header>
          <h1>${Lang._("RESULTS")}</h1>
          <dl class="two-columns">
            <div class="column">
              ${metaTitle}
              <dt>URL</dt>
              <dd><a href="${meta.pageURL}">${meta.pageURL}</a></dd>
              <dt>${Lang._("DATE")}</dt>
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
          <p>${Lang.sprintf("GENERATED", tool)}</p>
        </footer>
      </body>
      </html>
    `;
    return htmlTemplate;
  }
  async function downloadHTMLTemplate(results, dismissResults) {
    const htmlContent = await generateHTMLTemplate(results, dismissResults);
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
  function downloadCSVTemplate(results) {
    const meta = generateMetaData();
    const filteredObjects = results.filter((issue) => issue.type === "warning" || issue.type === "error").map((issue) => {
      const { type, content, htmlPath, cssPath } = issue;
      const prepContent = content.replaceAll(/<span\s+class="visually-hidden"[^>]*>.*?<\/span>/gi, "").replaceAll('<hr aria-hidden="true">', " | ").replaceAll(/"/g, '""');
      const stripHTML = stripHTMLtags(String(prepContent));
      const encoded = decodeHTML(stripHTML);
      const columns = {
        Title: `"${meta.metaTitle}"`,
        URL: `"${meta.pageURL}"`,
        Type: `"${String(type)}"`,
        Issue: `"${encoded}"`,
        Element: `"${htmlPath}"`
      };
      if (cssPath) {
        columns.Path = `"${cssPath}"`;
      }
      return columns;
    });
    const headers = Object.keys(filteredObjects[0]);
    const csvContent = `${headers.join(",")}
${filteredObjects.map((obj) => headers.map((header) => obj[header]).join(",")).join("\n")}`;
    const bom = new Uint8Array([239, 187, 191]);
    const blob = new Blob([bom, csvContent], { type: "text/csv;charset=utf-8;" });
    const url2 = window.URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url2;
    link.href = window.URL.createObjectURL(blob);
    const fileNameTitle = !meta.titleCheck ? `_${meta.metaTitle.trim().replace(/ /g, "")}` : "";
    link.setAttribute("download", `Sa11y_${meta.numericDate + fileNameTitle}.csv`);
    document.body.appendChild(link);
    link.click();
    setTimeout(() => {
      document.body.removeChild(link);
      window.URL.revokeObjectURL(link.href);
    }, 100);
  }
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
      Constants.Panel.exportHTML.addEventListener("click", exportHTMLHandler);
      Constants.Panel.exportCSV.addEventListener("click", exportCSVHandler);
    }
  }
  function removeExportListeners() {
    if (Constants.Global.exportResultsPlugin) {
      Constants.Panel.exportHTML.removeEventListener("click", exportHTMLHandler);
      Constants.Panel.exportCSV.removeEventListener("click", exportCSVHandler);
    }
  }
  function mainToggle(checkAll, resetAll) {
    Constants.Panel.toggle.addEventListener("click", (e) => {
      if (store.getItem("sa11y-panel") === "Opened") {
        e.preventDefault();
        store.setItem("sa11y-panel", "Closed");
        Constants.Panel.toggle.classList.remove("on");
        Constants.Panel.toggle.setAttribute("aria-expanded", "false");
        resetAll();
        if (Constants.Panel.notifCount.innerHTML.trim().length === 0) {
          Constants.Panel.notifBadge.style.display = "none";
        } else {
          Constants.Panel.notifBadge.style.display = "flex";
        }
      } else {
        e.preventDefault();
        store.setItem("sa11y-panel", "Opened");
        Constants.Panel.toggle.classList.add("on");
        Constants.Panel.toggle.setAttribute("aria-expanded", "true");
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
  const panelStyles = 'h1,h2,h3,div,p,span,ol,ul,li,a,label,button,svg,strong,kbd,pre,code{all:unset;box-sizing:border-box!important}:before,:after{all:unset}div{display:block}*{font-family:var(--sa11y-font-face)!important;-webkit-font-smoothing:auto!important}p,ol,ul,li,label{font-size:var(--sa11y-normal-text);text-align:start;letter-spacing:normal;word-break:break-word;font-weight:400;line-height:22px!important}.sa11y-overflow{overflow:auto}img,video,iframe{border:0;max-width:100%;height:auto;display:block}audio{max-width:100%}#toggle{bottom:var(--sa11y-toggle-y-offset);z-index:2147483644;color:#fff;cursor:pointer;background:linear-gradient(#00bcd4,#e040fb);background-color:var(--sa11y-setting-switch-bg-off);width:55px;height:55px;background-size:150% 150%;border-radius:50%;justify-content:center;align-items:center;margin:0;transition:all .2s ease-in-out;display:flex;position:fixed;inset-inline-end:var(--sa11y-toggle-x-offset);overflow:visible}#toggle.left,#toggle.top-left{inset-inline-start:var(--sa11y-toggle-x-offset)}#toggle.top-left,#toggle.top-right{top:var(--sa11y-toggle-y-offset);bottom:unset}@media screen and (forced-colors:active){#toggle{border:2px solid #0000;background:buttonface!important}}#toggle svg{width:35px;height:35px}#toggle svg path{fill:var(--sa11y-panel-bg)}#toggle:hover,#toggle:focus{animation:3s sa11y-toggle-gradient}#toggle:disabled:hover,#toggle:disabled:focus{animation:none}#toggle.on{background:linear-gradient(#e040fb,#00bcd4)}#toggle:disabled{cursor:not-allowed;background:unset;background-color:var(--sa11y-setting-switch-bg-off)}#notification-badge{color:#fff;text-wrap:nowrap;background-color:#eb0000;border:1px solid #0000;border-radius:12px;justify-content:center;align-items:center;min-width:20px;padding:2.5px;font-size:13.5px;font-weight:400;line-height:1;display:none;position:absolute;top:-5.5px;right:-3px}#notification-badge.notification-badge-warning{color:var(--sa11y-warning-text);background-color:var(--sa11y-warning-hover);border:1px solid var(--sa11y-warning)}#panel{bottom:calc(var(--sa11y-toggle-y-offset) + var(--sa11y-panel-y-gap));z-index:2147483643;visibility:hidden;background:var(--sa11y-panel-bg);opacity:0;transition:transform .2s,opacity .2s background .2s;transform-origin:100% 100%;border-radius:4px;position:fixed;inset-inline-end:calc(var(--sa11y-toggle-x-offset) + var(--sa11y-panel-x-gap));overflow:visible;transform:scale(0);box-shadow:0 0 20px 4px #9aa1b126,0 4px 80px -8px #24282f40,0 4px 4px -2px #5b5e6926}#panel.left,#panel.top-left{inset-inline-start:calc(var(--sa11y-toggle-x-offset) + var(--sa11y-panel-x-gap));inset-inline-end:unset}#panel.top-right,#panel.top-left{top:calc(var(--sa11y-toggle-y-offset) + var(--sa11y-panel-y-gap) + 10px);bottom:unset}#panel.active{visibility:visible;opacity:1;transform-origin:100% 100%;height:auto;transition:transform .2s,opacity .2s;transform:scale(1)}@media screen and (forced-colors:active){#panel{border:2px solid #0000}}#panel.active.left,[dir=rtl] #panel.active{transform-origin:0 100%}#panel.active.top-left{transform-origin:0 0}#panel.active.top-right{transform-origin:100% 0}#panel-alert{opacity:0;display:none}#panel-alert.active{opacity:1;display:block}#panel-alert-content{max-height:400px;color:var(--sa11y-panel-primary);border-bottom:1px solid var(--sa11y-panel-bg-splitter);align-items:center;padding:15px 20px 15px 15px;line-height:22px;position:relative;overflow-y:auto}:is(.top-left,.top-right) #panel-alert-content{border:0}#panel-alert-preview .close-tooltip{display:none}#panel-alert-preview,#panel-alert-text{font-family:var(--sa11y-font-face);font-size:var(--sa11y-normal-text);font-weight:400;line-height:22px}.panel-alert-preview{background:var(--sa11y-panel-bg-secondary);border:1px dashed var(--sa11y-panel-bg-splitter);border-radius:5px;margin-top:15px;padding:10px}.panel-alert-preview ul{margin:0;margin-block:0;padding:0;position:relative}.panel-alert-preview li{margin:5px 10px 0 20px;padding-bottom:5px;display:list-item}.element-preview{overflow-wrap:break-word;background-color:var(--sa11y-element-preview);border-radius:3.2px;margin-bottom:10px;padding:5px}button[data-sa11y-dismiss]{color:var(--sa11y-panel-primary);cursor:pointer;background:var(--sa11y-panel-bg-secondary);border:2px solid var(--sa11y-button-outline);margin:10px 5px 5px 0;border-radius:5px;margin-inline-end:15px;padding:4px 8px;display:block}button[data-sa11y-dismiss]:hover,button[data-sa11y-dismiss]:focus{background:var(--sa11y-shortcut-hover)}h2{font-size:var(--sa11y-large-text);margin-bottom:3px;font-weight:700;display:block}h3{font-size:calc(var(--sa11y-large-text) - 1px);margin-bottom:3px;font-weight:600;display:block}strong{font-weight:600}a:not(#outline-list a,#images-list a){color:var(--sa11y-hyperlink);cursor:pointer;border-bottom:0;font-weight:500;text-decoration:underline}a:hover,a:focus{text-decoration:none!important}hr{background:var(--sa11y-panel-bg-splitter);opacity:1;border:none;height:1px;margin:10px 0;padding:0}#dismiss-button,#skip-button{text-align:center;cursor:pointer;background:var(--sa11y-panel-bg-secondary);border:1px solid var(--sa11y-button-outline);border-radius:50px;width:36px;height:36px;margin-inline:2px 8px;transition:all .1s ease-in-out;display:none;position:relative;overflow:visible}:is(#dismiss-button,#skip-button).active{display:block}:is(#dismiss-button,#skip-button):disabled{cursor:default;box-shadow:none;background:0 0;border:0}:is(#dismiss-button,#skip-button):before{content:"";position:absolute;inset:-5px}:is(#dismiss-button,#skip-button):hover:not(:disabled),:is(#dismiss-button,#skip-button):focus:not(:disabled){background-color:var(--sa11y-shortcut-hover)}:is(#panel.top-left,#panel.left) #dismiss-button,:is(#panel.top-left,#panel.left) #skip-button{margin-inline:8px 2px}.dismiss-icon{background:var(--sa11y-setting-switch-bg-off);width:24px;height:24px;-webkit-mask:var(--sa11y-dismiss-icon)center no-repeat;mask:var(--sa11y-dismiss-icon)center no-repeat;margin-bottom:-4px;display:inline-block}.dismiss-group{display:flex}@media screen and (forced-colors:active){.dismiss-icon{filter:invert()}}#panel-content{color:var(--sa11y-panel-primary);align-items:center;padding:6px;display:flex}#panel-content.errors .panel-icon,#panel-content.good .panel-icon,#panel-content.warnings .panel-icon{width:26px;height:26px;margin:0 auto}#panel-content.errors .panel-icon{background:var(--sa11y-panel-error);-webkit-mask:var(--sa11y-error-svg)center no-repeat;mask:var(--sa11y-error-svg)center no-repeat;margin-top:-2px}#panel-content.good .panel-icon{background:var(--sa11y-good);-webkit-mask:var(--sa11y-good-svg)center no-repeat;mask:var(--sa11y-good-svg)center no-repeat}#panel-content.warnings .panel-icon{background:var(--sa11y-yellow-text);transform:scaleX(var(--sa11y-icon-direction));-webkit-mask:var(--sa11y-warning-svg)center no-repeat;mask:var(--sa11y-warning-svg)center no-repeat}@media screen and (forced-colors:active){#panel-content.errors .panel-icon,#panel-content.good .panel-icon,#panel-content.warnings .panel-icon{filter:invert()}}#panel.top-left #panel-content,#panel.left #panel-content{flex-direction:row-reverse}#status{font-size:var(--sa11y-large-text);color:var(--sa11y-panel-primary)}.panel-count{color:var(--sa11y-panel-primary);background-color:var(--sa11y-panel-badge);border-radius:4px;margin-left:3px;margin-right:3px;padding:2px 4px;font-size:15px;font-weight:400}#page-issues,#images-panel,#settings-panel,#outline-panel{color:var(--sa11y-panel-primary);opacity:0;display:none}#page-issues.active,#images-panel.active,#settings-panel.active,#outline-panel.active{opacity:1;display:block}.panel-header{text-align:start;justify-content:space-between;padding:10px 15px 0;display:flex}#about-content{padding-top:5px}#about-content p{margin-block-end:1em;display:block}#images-content,#page-issues-content,#settings-content,#outline-content{border-bottom:1px solid var(--sa11y-panel-bg-splitter);padding:0 15px 10px}.top-right :is(#images-content,#page-issues-content,#settings-content,#outline-content),.top-left :is(#images-content,#page-issues-content,#settings-content,#outline-content){border:0}#images-content{padding-inline:5px}#page-issues-content{max-height:160px;overflow-y:auto}#settings-content{max-height:400px;overflow-y:auto}#images-content,#outline-content{max-height:250px;overflow-y:auto}#settings-panel .sa11y-red-text,#outline-panel .outline-list-item.sa11y-red-text{color:var(--sa11y-red-text)}#outline-list{margin:0;padding:0;display:block}#outline-list button{cursor:pointer;text-decoration:none;display:block}#outline-list button:hover,#outline-list button:focus{background:var(--sa11y-panel-outline-hover);box-shadow:0 0 0 2px var(--sa11y-panel-outline-hover);border-radius:5px;display:block}#outline-list li{margin-top:0;margin-bottom:4.5px;padding:0;list-style-type:none;display:block}#outline-list li:first-child{margin-top:5px}#outline-list .outline-2{margin-inline-start:15px}#outline-list .outline-3{margin-inline-start:30px}#outline-list .outline-4{margin-inline-start:45px}#outline-list .outline-5{margin-inline-start:60px}#outline-list .outline-6{margin-inline-start:75px}#images-list{margin:0;padding:0;display:block}#images-list button{cursor:pointer;min-height:44px;margin:10px 5px;text-decoration:none;display:block}#images-list button:hover,#images-list button:focus{background:var(--sa11y-panel-outline-hover);box-shadow:0 0 0 2px var(--sa11y-panel-outline-hover);border-radius:5px;display:block}#images-list li{border-bottom:1px solid var(--sa11y-panel-bg-splitter);flex-direction:column;width:100%;list-style-type:none;display:flex;overflow:hidden}#images-list li.no-images{padding-inline:10px}#images-list li:last-child{border:none;margin-bottom:0}#images-list li .alt{padding:2px 5px 10px}#images-list li .edit-block{justify-content:flex-end;margin-bottom:15px;display:flex}#images-list li .edit{color:var(--sa11y-panel-primary);cursor:pointer;background:var(--sa11y-panel-bg-secondary);border:2px solid var(--sa11y-button-outline);border-radius:5px;margin-inline-end:5px;padding:4px 7px;text-decoration:none;position:relative}#images-list li .edit:hover,#images-list li .edit:focus{background-color:var(--sa11y-shortcut-hover)}#images-list li .edit:before{content:"";position:absolute;inset:-10px}#images-list li img{float:inline-start;border-radius:5px;max-width:110px;margin:5px}#images-list li.warning .alt{color:var(--sa11y-yellow-text)}#images-list li.warning img{background-color:var(--sa11y-yellow-text);border:5px solid var(--sa11y-yellow-text)}#images-list li.error .alt{color:var(--sa11y-error)}#images-list li.error img{background-color:var(--sa11y-error);border:5px solid var(--sa11y-error)}#images-list li.good img{background-color:var(--sa11y-panel-badge);border:5px solid var(--sa11y-panel-badge)}@media screen and (forced-colors:active){#images-list li img{background-color:buttonborder!important}}.move-panel-icon{vertical-align:middle;background:var(--sa11y-setting-switch-bg-off);width:18px;height:18px;-webkit-mask:var(--sa11y-move-panel-icon);mask:var(--sa11y-move-panel-icon)}.info-icon{vertical-align:middle;background:var(--sa11y-setting-switch-bg-off);width:20px;height:20px;-webkit-mask:var(--sa11y-info-icon);mask:var(--sa11y-info-icon);margin-top:-2px}.sun-icon{vertical-align:middle;background:var(--sa11y-setting-switch-bg-off);width:18px;height:18px;-webkit-mask:var(--sa11y-sun-icon);mask:var(--sa11y-sun-icon)}.moon-icon{vertical-align:middle;background:var(--sa11y-setting-switch-bg-off);width:18px;height:18px;-webkit-mask:var(--sa11y-moon-icon);mask:var(--sa11y-moon-icon)}.error-icon{background:var(--sa11y-error-text);width:16px;height:16px;-webkit-mask:var(--sa11y-error-svg);mask:var(--sa11y-error-svg);margin-bottom:-4px}.hidden-icon{background:var(--sa11y-panel-primary);width:16px;height:16px;-webkit-mask:var(--sa11y-hidden-icon-svg);mask:var(--sa11y-hidden-icon-svg);margin-bottom:-3px}.link-icon{background:var(--sa11y-panel-primary);width:16px;height:16px;-webkit-mask:var(--sa11y-link-icon-svg);mask:var(--sa11y-link-icon-svg);margin-bottom:-3.5px}.move-panel-icon,.info-icon,.sun-icon,.moon-icon,.error-icon,.hidden-icon,.link-icon{display:inline-block;-webkit-mask-position:50%;mask-position:50%;-webkit-mask-repeat:no-repeat;mask-repeat:no-repeat}.error-badge .link-icon,.error-badge .hidden-icon{background:var(--sa11y-error-text)!important}.warning-badge .link-icon,.warning-badge .hidden-icon{background:var(--sa11y-panel-bg)}.error .hidden-icon,.error .link-icon{background:var(--sa11y-error-text)}.warning .hidden-icon,.warning .link-icon{background:var(--sa11y-panel-bg)}@media screen and (forced-colors:active){.move-panel-icon,.sun-icon,.moon-icon,.info-icon,.error-icon,.link-icon,.hidden-icon{filter:invert()}}#panel-controls{border-bottom:1px solid var(--sa11y-panel-bg-splitter);border-radius:0 0 4px 4px;display:flex;overflow:hidden}#panel-controls button{width:100%;height:30px;font-size:var(--sa11y-normal-text);color:var(--sa11y-panel-secondary);text-align:center;cursor:pointer;background:var(--sa11y-panel-bg-secondary);background-color:var(--sa11y-panel-bg-secondary);border-top:1px solid var(--sa11y-panel-bg-splitter);border-inline-end:1px solid var(--sa11y-panel-bg-splitter);opacity:1;outline:0;margin:0;padding:0;font-weight:400;line-height:0;transition:background .2s;display:block;position:relative}#panel-controls button:hover,#panel-controls button.active{background-color:var(--sa11y-shortcut-hover)}#panel-controls button.active{font-weight:600}#export-results-mode,label{width:100%;color:var(--sa11y-panel-primary);margin:0;font-weight:400;display:inline-block}label:not(#colour-filter-mode,#export-results-mode){cursor:pointer}#panel.right #panel-controls[data-image-panel]:after{content:"";width:80px}#panel.left #panel-controls[data-image-panel]:before{content:"";width:50px}#settings-panel .export-results-group,#settings-panel .appearance-group{margin:5px 0;display:flex}:is(#settings-panel .export-results-group,#settings-panel .appearance-group) button{text-align:center;white-space:nowrap;cursor:pointer;border:2px solid var(--sa11y-setting-switch-bg-off);margin:2px 0;border-radius:5px;justify-content:center;align-items:center;min-width:44px;min-height:34px;margin-inline:8px 4px;display:flex;position:relative}:is(#settings-panel .export-results-group,#settings-panel .appearance-group) button:hover,:is(#settings-panel .export-results-group,#settings-panel .appearance-group) button:focus,:is(#settings-panel .export-results-group,#settings-panel .appearance-group) button:focus-within{background:var(--sa11y-shortcut-hover)}:is(#settings-panel .export-results-group,#settings-panel .appearance-group) button:before{content:"";position:absolute;inset:-7px}:is(#settings-panel .export-results-group,#settings-panel .appearance-group) button .text{color:var(--sa11y-setting-switch-bg-off);padding:0 6px;font-weight:600}#settings-panel .switch{width:105px;height:44px;font-size:var(--sa11y-normal-text);color:var(--sa11y-setting-switch-bg-off);text-align:end;cursor:pointer;background:0 0;border:0;border-radius:5px;margin:0;padding:7px 10px;font-weight:600;position:relative}#settings-panel .switch[aria-pressed=true]:after,#settings-panel .switch[aria-pressed=false]:after{vertical-align:middle;content:"";width:27px;height:27px;margin:0 4px 4px;display:inline-block}#settings-panel .switch[aria-pressed=true]:after{background:var(--sa11y-setting-switch-bg-on);-webkit-mask:var(--sa11y-setting-switch-on-svg)center no-repeat;mask:var(--sa11y-setting-switch-on-svg)center no-repeat}#settings-panel .switch[aria-pressed=false]:after{background:var(--sa11y-setting-switch-bg-off);-webkit-mask:var(--sa11y-setting-switch-off-svg)center no-repeat;mask:var(--sa11y-setting-switch-off-svg)center no-repeat}@media screen and (forced-colors:active){#settings-panel .switch[aria-pressed=false]:after,#settings-panel .switch[aria-pressed=true]:after{filter:invert()}}#settings-panel #settings-options li{border-bottom:1px solid var(--sa11y-panel-bg-splitter);justify-content:space-between;align-items:center;padding:1px 0;list-style-type:none;display:flex}#settings-panel #settings-options li:last-child{border:none}#page-issues{color:var(--sa11y-panel-primary);align-items:center}#page-issues-list{margin-top:4px;display:block}#page-issues-list li{margin:0 0 10px;display:block}:is(.top-left,.top-right).has-page-issues #page-issues{border-top:1px solid var(--sa11y-panel-bg-splitter);margin-top:-1px}#panel-colour-filters{font-family:var(--sa11y-font-face);font-size:var(--sa11y-normal-text);color:var(--sa11y-panel-primary);align-items:center;font-weight:400;line-height:22px;display:none}#panel-colour-filters.active{display:flex}#panel-colour-filters p{width:100%;padding:6px 20px 6px 6px}#panel-colour-filters[data-colour=protanopia],#panel-colour-filters[data-colour=deuteranopia],#panel-colour-filters[data-colour=tritanopia],#panel-colour-filters[data-colour=monochromacy]{border-bottom:6px solid #0000;border-image-slice:1}#panel-colour-filters[data-colour=protanopia]{border-image:linear-gradient(94deg,#786719 11%,#e0c600 36% 47%,#0059e3 75%,#0042aa 91%)}#panel-colour-filters[data-colour=deuteranopia]{border-image:linear-gradient(270deg,#567fdb 0%,#a4a28d 48%,#c3ad14 69%,#a79505 100%)}#panel-colour-filters[data-colour=tritanopia]{border-image:linear-gradient(270deg,#b1506f 0%,#0696c1 35%,#f3a9ba 70%,#d91c5d 87%,#fe015c 100%)}#panel-colour-filters[data-colour=monochromacy]{border-image:linear-gradient(270deg,#000 0%,#a7a7a7 50%,#000 100%)}#panel-colour-filters[data-colour=protanopia] .panel-icon{background:var(--sa11y-panel-error)}#panel-colour-filters[data-colour=deuteranopia] .panel-icon{background:var(--sa11y-good-hover)}#panel-colour-filters[data-colour=tritanopia] .panel-icon{background:var(--sa11y-blue)}#panel-colour-filters[data-colour=monochromacy] .panel-icon{background:linear-gradient(90deg,#38a459 20%,red 50%,#0077c8 80%)}#panel-colour-filters .panel-icon{width:30px;height:30px;-webkit-mask:var(--sa11y-low-vision-icon)center no-repeat;mask:var(--sa11y-low-vision-icon)center no-repeat;margin-inline:10px 5px}@media screen and (forced-colors:active){#panel-colour-filters .panel-icon{forced-color-adjust:none}}.select-dropdown{align-items:center;display:flex;position:relative}.select-dropdown:after{content:" ";border-top:5px solid var(--sa11y-setting-switch-bg-off);border-left:5px solid #0000;border-right:5px solid #0000;position:absolute;inset-inline-end:14px}#colour-filter-select{appearance:none;height:30px;font-size:var(--sa11y-normal-text);color:var(--sa11y-setting-switch-bg-off);text-align:end;vertical-align:middle;cursor:pointer;background:var(--sa11y-panel-bg);border:2px solid var(--sa11y-setting-switch-bg-off);border-radius:5px;margin-inline-end:4px;padding-inline:5px 25px;font-weight:400;position:relative}#colour-filter-select:hover,#colour-filter-select:focus{background:var(--sa11y-shortcut-hover)}#colour-filter-select.active{box-shadow:0 0 0 2px var(--sa11y-setting-switch-bg-on)}#colour-filter-item label,#colour-filter-item select{margin-top:10px;margin-bottom:9px}#readability-panel{opacity:0;display:none}#readability-panel.active{opacity:1;display:block}:is(.top-left,.top-right) #readability-content{border-top:1px solid var(--sa11y-panel-bg-splitter)}:is(.left,.right) #readability-content{border-bottom:1px solid var(--sa11y-panel-bg-splitter)}#readability-content{width:100%;color:var(--sa11y-panel-primary);padding:10px 15px}#readability-details{white-space:normal;margin:0;padding:0;list-style-type:none;display:block}#readability-details li{margin:0;padding-inline-end:10px;list-style-type:none;display:inline-block}.readability-score{color:var(--sa11y-panel-primary);background-color:var(--sa11y-panel-badge);border-radius:4px;margin-inline-start:5px;padding:2px 5px}#readability-info{margin-inline-start:10px}#skip-to-page-issues{display:none}#panel.has-page-issues #skip-to-page-issues{clip:rect(0,0,0,0);white-space:nowrap;background:var(--sa11y-panel-bg);border:0;border-radius:5px;width:1px;height:1px;margin:-1px;padding:0;font-weight:600;display:block;position:absolute;overflow:hidden}#panel.has-page-issues #skip-to-page-issues:focus{z-index:1;clip:auto;white-space:normal;width:auto;height:auto;margin:0;padding:7px 10px;overflow:visible}.hide-settings-border{border-bottom:0!important;padding:0 15px!important}.hide-settings-border li:not(#colour-filter-item){display:none!important}.hide-settings-border #about-content{display:none}.hide-settings-border.scrollable:before{all:unset}#contrast-tools{display:none}::-webkit-scrollbar{width:7px;height:6px}::-webkit-scrollbar-thumb{background-color:var(--sa11y-button-outline);border-radius:6px}*{scrollbar-color:var(--sa11y-button-outline);scrollbar-width:thin}.scrollable:before{z-index:-1;content:"";background:linear-gradient(180deg,#0000 70%,var(--sa11y-panel-scrollable)100%);background-position:bottom;width:100%;height:250px;transition:opacity 1s ease-in-out;animation:1s ease-in-out fade;position:absolute;inset:auto 0}#settings-content.scrollable:before{height:400px}.top-right .scrollable:before,.top-left .scrollable:before{border-radius:5px}#page-issues-content.scrollable:before{height:160px}#panel-alert.scrollable:before{height:200px}@keyframes sa11y-toggle-gradient{0%{background-position:50% 0}50%{background-position:50% 100%}to{background-position:50% 0}}@keyframes fade{0%{opacity:0}to{opacity:1}}@media (prefers-reduced-motion:reduce){*{transition:none!important;animation:none!important;transform:none!important}}#panel{width:440px}#container:lang(en) #panel{width:315px}:is(#container:lang(nb),#container:lang(da),#container:lang(pl),#container:lang(de),#container:lang(sv),#container:lang(zh)) #panel{width:365px}:is(#container:lang(bg),#container:lang(es)) .switch:not(#export-results-item *){width:230px!important}#container:not(:lang(en),:lang(de)) .switch{width:205px}';
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
      const checkAll = Constants.Global.checkAllHideToggles;
      const developerPlugin = Constants.Global.developerPlugin ? `
      <li id="developer-item" ${checkAll ? "hidden" : ""}>
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
      const colourFilterPlugin = Constants.Global.colourFilterPlugin ? `
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
      const colourFilterPanel = Constants.Global.colourFilterPlugin ? `
      <div id="panel-colour-filters" role="region" aria-labelledby="colour-filter-mode">
        <div id="filter-icon" class="panel-icon" role="img"></div>
        <p>${Lang._("COLOUR_FILTER_MESSAGE")}</p>
      </div>` : "";
      const exportResultsPlugin = Constants.Global.exportResultsPlugin ? `
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
      const aboutSection = Constants.Global.aboutContent ? `
      <div id="about-content">${Constants.Global.aboutContent}</div>` : "";
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
      const imagesOutline = Constants.Global.showImageOutline ? `
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
      const panelPositionToggle = Constants.Global.showMovePanelToggle ? `<button type="button" id="move-panel"
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
      const imagePanelEnabled = Constants.Global.showImageOutline ? "data-image-panel" : "";
      const tabToggles = `
      <div id="panel-controls" role="tablist" aria-orientation="horizontal" ${imagePanelEnabled}>
        <button type="button" role="tab" aria-expanded="false" id="outline-toggle" aria-controls="outline-panel">${Lang._("OUTLINE")}</button>
        ${Constants.Global.showImageOutline ? imageToggleButton : ""}
        <button type="button" role="tab" aria-expanded="false" id="settings-toggle" aria-controls="settings-panel">${Lang._("SETTINGS")}</button>
      </div>`;
      const container = document.createElement("div");
      container.setAttribute("id", "container");
      container.setAttribute("role", "region");
      container.setAttribute("data-sa11y-version", "4.4.0");
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
  function settingsPanelToggles(checkAll, resetAll) {
    if (Constants.Global.showMovePanelToggle) {
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
    if (Constants.Global.developerPlugin) {
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
    if (Constants.Global.colourFilterPlugin) {
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
            Constants.Panel.controls.setAttribute("hidden", "");
            Constants.Panel.colourFilterSelect.classList.add("active");
            Constants.Panel.colourPanel.classList.add("active");
            Constants.Panel.colourPanel.setAttribute("data-colour", filters[option - 1]);
            Constants.Panel.content.hidden = true;
          }
        } else {
          document.body.removeAttribute("data-sa11y-filter");
          Constants.Panel.settingsContent.classList.remove("hide-settings-border");
          Constants.Panel.controls.removeAttribute("hidden");
          Constants.Panel.colourFilterSelect.classList.remove("active");
          Constants.Panel.colourPanel.classList.remove("active");
          Constants.Panel.colourPanel.removeAttribute("data-colour");
          Constants.Panel.content.hidden = false;
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
    if (Constants.Global.showImageOutline) {
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
    if (Constants.Global.showImageOutline) {
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
  function generatePageOutline(dismissed, headingOutline, option) {
    const outlineHandler = () => {
      const outlineArray = [];
      const findDismissedHeadings = dismissed.map((e) => headingOutline.find((f) => e.dismiss === f.dismiss)).filter(Boolean);
      findDismissedHeadings.forEach(($el) => {
        $el.dismissedHeading = true;
      });
      let outlineItem;
      if (option.showTitleInPageOutline) {
        const metaTitleElement = document.querySelector("head title");
        if (!metaTitleElement || metaTitleElement.textContent.trim().length === 0) {
          outlineItem = `<li><div class="badge error-badge"><span aria-hidden="true"><span class="error-icon"></span></span> ${Lang._("TITLE")}</div> <div class="badge error-badge">${Lang._("MISSING")}</div></li>`;
        } else {
          const titleText = getText(metaTitleElement);
          outlineItem = `<li><span class="badge">${Lang._("TITLE")}</span> ${sanitizeHTML(titleText)}</li>`;
        }
        outlineArray.push(outlineItem);
      }
      headingOutline.forEach((heading, i) => {
        const { element, headingLevel, text, type, dismissedHeading, isWithinRoot } = heading;
        const hidden = isElementVisuallyHiddenOrHidden(element);
        const visibleIcon = hidden === true ? `<span class="hidden-icon"></span><span class="visually-hidden">${Lang._("HIDDEN")}</span>` : "";
        const badgeH = option.showHinPageOutline === true || option.showHinPageOutline === 1 ? "H" : "";
        let append;
        if (type === "error" && isWithinRoot === true) {
          append = `
            <li class="outline-${headingLevel}">
              <button type="button" tabindex="-1">
                <span class="badge error-badge">
                <span aria-hidden="true">${visibleIcon}
                  <span class="error-icon"></span>
                </span>
                <span class="visually-hidden">${Lang._("ERROR")}</span> ${badgeH + headingLevel}</span>
                <strong class="outline-list-item red-text">${text}</strong>
              </button>
            </li>`;
          outlineArray.push(append);
        } else if (type === "warning" && !dismissedHeading && isWithinRoot === true) {
          append = `
            <li class="outline-${headingLevel}">
              <button type="button" tabindex="-1">
                <span class="badge warning-badge">
                <span aria-hidden="true">${visibleIcon} &#x3f;</span>
                <span class="visually-hidden">${Lang._("WARNING")}</span> ${badgeH + headingLevel}</span>
                <strong class="outline-list-item yellow-text">${text}</strong>
              </button>
            </li>`;
          outlineArray.push(append);
        } else {
          append = `
            <li class="outline-${headingLevel}">
              <button type="button" tabindex="-1">
                <span class="badge">${visibleIcon} ${badgeH + headingLevel}</span>
                <span class="outline-list-item">${text}</span>
              </button>
            </li>`;
          outlineArray.push(append);
        }
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
        content.innerHTML = `H${headingLevel}`;
        label.shadowRoot.appendChild(content);
        if (store.getItem("sa11y-outline") === "Opened") {
          label.hidden = false;
        }
      });
      Constants.Panel.outlineList.innerHTML = headingOutline.length === 0 ? `${outlineItem || ""} <li>${Lang._("PANEL_NO_HEADINGS")}</li>` : outlineArray.join(" ");
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
            if (!heading || heading.hasAttribute("data-sa11y-parent")) {
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
    const before = getAltText(
      window.getComputedStyle(element, ":before").getPropertyValue("content")
    );
    const after = getAltText(window.getComputedStyle(element, ":after").getPropertyValue("content"));
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
    if (Constants.Global.ignoreAriaOnElements && element.matches(Constants.Global.ignoreAriaOnElements)) {
      return "noAria";
    }
    if (Constants.Global.ignoreTextInElements && element.matches(Constants.Global.ignoreTextInElements)) {
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
          if (!excludeSelector || !child.closest(excludeSelector)) {
            computedText += computeAccessibleName(child, exclusions, recursing + 1);
          }
        }
      }
      if (node.nodeType === Node.TEXT_NODE) {
        if (node.parentNode.tagName !== "SLOT") {
          computedText += ` ${node.nodeValue}`;
        }
        continue;
      }
      if (addTitleIfNoName && !node.closest("a")) {
        if (aText === computedText) {
          computedText += addTitleIfNoName;
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
        computedText += ` ${aria}`;
        if (!nextTreeBranch(treeWalker)) {
          continueWalker = false;
        }
        continue;
      }
      switch (node.tagName) {
        case "IMG":
          if (node.hasAttribute("alt") && node.role !== "presentation") {
            computedText += node.getAttribute("alt");
          }
          break;
        case "SVG":
          if (node.role === "img" || node.role === "graphics-document") {
            computedText += computeAriaLabel(node);
          } else {
            const title = node.querySelector("title");
            if (title) {
              computedText += title.textContent;
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
          computedText += wrapPseudoContent(node, "");
          break;
        case "INPUT":
          computedText += wrapPseudoContent(treeWalker.currentNode, "");
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
          computedText += slotText;
          computedText += wrapPseudoContent(node, "");
          break;
        }
        default:
          computedText += wrapPseudoContent(node, "");
          break;
      }
    }
    if (addTitleIfNoName && !aText) {
      computedText += ` ${addTitleIfNoName}`;
    }
    computedText = computedText.replace(/[\uE000-\uF8FF]/gu, "");
    if (!computedText.trim() && element.hasAttribute("title")) {
      return element.getAttribute("title");
    }
    return computedText;
  };
  const generateEditLink = (image) => {
    const { src } = image.element;
    const urlExclusions = Constants.Global.ignoreEditImageURL.some((ignore) => src.includes(ignore));
    const classExclusions = Constants.Global.ignoreEditImageClass.some(
      (ignore) => image.element.classList.contains(ignore)
    );
    if (urlExclusions || classExclusions) {
      return "";
    }
    const relativePath = Constants.Global.relativePathImageSRC || window.location.host;
    const fileExtension = src.split(relativePath)[1] || "";
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
    const editURL = relativePath && imageID.length ? Constants.Global.editImageURLofCMS + imageUniqueID : Constants.Global.editImageURLofCMS + fileExtension;
    const isRelativeLink = (imageSrc) => imageSrc.includes(window.location.host) || imageSrc.startsWith(relativePath);
    if (imageID.length && imageUniqueID !== void 0 || !imageID) {
      return isRelativeLink(src) ? `<div class="edit-block"><a href="${encodeURI(editURL)}" tabindex="-1" target="_blank" rel="noopener noreferrer" class="edit">${Lang._("EDIT")}</a></div>` : "";
    }
    return "";
  };
  function generateImageOutline(dismissed, imageResults, option) {
    const imageOutlineHandler = () => {
      const imageArray = [];
      imageResults.forEach((image, i) => {
        const isDismissed = dismissed.some((key) => key.dismiss === image.dismiss);
        if (isDismissed) {
          Object.assign(image, { dismissedImage: true });
        }
        const { element, type, developer, dismissedImage } = image;
        const altText = computeAriaLabel(element) === "noAria" ? escapeHTML(element.getAttribute("alt")) : computeAriaLabel(element);
        const hidden = isElementVisuallyHiddenOrHidden(element);
        if (hidden) {
          const parent = findVisibleParent(element, "display", "none");
          const anchor2 = document.createElement("sa11y-image-anchor");
          anchor2.setAttribute("data-sa11y-parent", `image${i}`);
          const target = parent?.previousElementSibling || parent?.parentNode;
          target?.insertAdjacentElement("beforebegin", anchor2);
        } else {
          element.setAttribute("data-sa11y-image", i);
        }
        const dev = store.getItem("sa11y-developer");
        const devChecksOff = dev === "Off" || dev === null;
        const showDeveloperChecks = devChecksOff && (type === "error" || type === "warning") && developer === true;
        const source = getBestImageSource(image.element);
        const edit = Constants.Global.editImageURLofCMS ? generateEditLink(image) : "";
        const decorative = element.hasAttribute("alt") && altText === "" ? `<div class="badge">${Lang._("DECORATIVE")}</div>` : "";
        const startsWithSpecificAlt = option.altPlaceholder?.some(
          (text) => altText.toLowerCase().startsWith(text.toLowerCase())
        );
        const anchor = option.imageWithinLightbox ? `a[href]:not(${option.imageWithinLightbox})` : "a[href]";
        const linked = element.closest(anchor) ? `<div class="badge"><span class="link-icon"></span><span class="visually-hidden">${Lang._("LINKED")}</span></div>` : "";
        const visibleIcon = hidden === true ? `<div class="badge"><span class="hidden-icon"></span><span class="visually-hidden">${Lang._("HIDDEN")}</span></div>` : "";
        let append;
        if (type === "error" && !showDeveloperChecks) {
          const missing = altText.length === 0 ? `<div class="badge">${Lang._("MISSING")}</div>` : "";
          append = `
        <li class="error">
          <button type="button" tabindex="-1">
            <img src="${source}" alt/>
            <div class="alt"> ${visibleIcon} ${linked} ${missing}
              <div class="badge"><span class="error-icon"></span><span class="visually-hidden">${Lang._("ERROR")}</span> ${Lang._("ALT")}</div> <strong class="red-text">${startsWithSpecificAlt ? "" : altText}</strong>
            </div>
          </button>
          ${edit}
        </li>`;
          imageArray.push(append);
        } else if (type === "warning" && !dismissedImage && !showDeveloperChecks) {
          append = `
        <li class="warning">
          <button type="button" tabindex="-1">
            <img src="${source}" alt/>
            <div class="alt"> ${visibleIcon} ${linked} ${decorative}
              <div class="badge"><span aria-hidden="true">&#63;</span> <span class="visually-hidden">${Lang._("WARNING")}</span> ${Lang._("ALT")}</div> <strong class="yellow-text">${startsWithSpecificAlt ? "" : altText}</strong>
            </div>
          </button>
          ${edit}
        </li>`;
          imageArray.push(append);
        } else {
          append = `
        <li class="good">
          <button type="button" tabindex="-1">
            <img src="${source}" alt/>
            <div class="alt"> ${visibleIcon} ${linked} ${decorative}
              <div class="badge">${Lang._("ALT")}</div> ${altText}
            </div>
          </button>
          ${edit}
        </li>`;
          imageArray.push(append);
        }
      });
      Constants.Panel.imagesList.innerHTML = imageArray.length === 0 ? `<li class="no-images">${Lang._("NO_IMAGES")}</li>` : imageArray.join(" ");
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
            if (!image || image.hasAttribute("data-sa11y-parent")) {
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
  function updatePanel(dismissCount, errorCount, warningCount) {
    Constants.Panel.skipButton.disabled = false;
    Constants.Panel.panel.classList.add("active");
    Constants.Global.html.setAttribute("data-sa11y-active", "true");
    Constants.Panel.skipButton.classList.add("active");
    if (errorCount > 0 && warningCount > 0) {
      Constants.Panel.content.setAttribute("class", "errors");
      Constants.Panel.status.innerHTML = `${Lang._("ERRORS")} <span class="panel-count">${errorCount}</span> ${Lang._("WARNINGS")} <span class="panel-count" id="warning-count">${warningCount}</span>`;
    } else if (errorCount > 0) {
      Constants.Panel.content.setAttribute("class", "errors");
      Constants.Panel.status.innerHTML = `${Lang._("ERRORS")} <span class="panel-count">${errorCount}</span>`;
    } else if (warningCount > 0) {
      Constants.Panel.content.setAttribute("class", "warnings");
      Constants.Panel.status.innerHTML = `${Lang._("WARNINGS")} <span class="panel-count" id="warning-count">${warningCount}</span>`;
    } else if (dismissCount > 0) {
      Constants.Panel.status.innerHTML = `${Lang._("DISMISSED")} <span class="panel-count">${dismissCount}</span>`;
      Constants.Panel.skipButton.classList.remove("active");
    } else {
      Constants.Panel.content.setAttribute("class", "good");
      Constants.Panel.status.innerHTML = `${Lang._("NO_ERRORS_FOUND")}`;
    }
    const annotations = document.querySelectorAll("sa11y-annotation");
    if (annotations.length === 0) {
      Constants.Panel.skipButton.disabled = true;
    }
  }
  function updateBadge(errorCount, warningCount) {
    const totalCount = errorCount + warningCount;
    if (totalCount === 0) {
      Constants.Panel.notifCount.innerText = "";
      Constants.Panel.notifText.innerText = "";
      Constants.Panel.notifBadge.style.display = "none";
    } else if (warningCount > 0 && errorCount === 0) {
      Constants.Panel.notifBadge.classList.add("notification-badge-warning");
      Constants.Panel.notifCount.innerText = `${warningCount}`;
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
  function updateCount(results, error, warning) {
    let updatedErrorCount = error;
    let updatedWarningCount = warning;
    results.forEach((_, i) => {
      const issue = results[i].type;
      if (issue === "error") {
        updatedErrorCount += 1;
      } else if (issue === "warning") {
        updatedWarningCount += 1;
      }
    });
    return { error: updatedErrorCount, warning: updatedWarningCount };
  }
  var top = "top";
  var bottom = "bottom";
  var right = "right";
  var left = "left";
  var auto = "auto";
  var basePlacements = [top, bottom, right, left];
  var start = "start";
  var end = "end";
  var clippingParents = "clippingParents";
  var viewport = "viewport";
  var popper = "popper";
  var reference = "reference";
  var variationPlacements = /* @__PURE__ */ basePlacements.reduce(function(acc, placement) {
    return acc.concat([placement + "-" + start, placement + "-" + end]);
  }, []);
  var placements = /* @__PURE__ */ [].concat(basePlacements, [auto]).reduce(function(acc, placement) {
    return acc.concat([placement, placement + "-" + start, placement + "-" + end]);
  }, []);
  var beforeRead = "beforeRead";
  var read = "read";
  var afterRead = "afterRead";
  var beforeMain = "beforeMain";
  var main = "main";
  var afterMain = "afterMain";
  var beforeWrite = "beforeWrite";
  var write = "write";
  var afterWrite = "afterWrite";
  var modifierPhases = [beforeRead, read, afterRead, beforeMain, main, afterMain, beforeWrite, write, afterWrite];
  function getNodeName(element) {
    return element ? (element.nodeName || "").toLowerCase() : null;
  }
  function getWindow(node) {
    if (node == null) {
      return window;
    }
    if (node.toString() !== "[object Window]") {
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
    if (typeof ShadowRoot === "undefined") {
      return false;
    }
    var OwnElement = getWindow(node).ShadowRoot;
    return node instanceof OwnElement || node instanceof ShadowRoot;
  }
  function applyStyles(_ref) {
    var state = _ref.state;
    Object.keys(state.elements).forEach(function(name) {
      var style = state.styles[name] || {};
      var attributes = state.attributes[name] || {};
      var element = state.elements[name];
      if (!isHTMLElement(element) || !getNodeName(element)) {
        return;
      }
      Object.assign(element.style, style);
      Object.keys(attributes).forEach(function(name2) {
        var value = attributes[name2];
        if (value === false) {
          element.removeAttribute(name2);
        } else {
          element.setAttribute(name2, value === true ? "" : value);
        }
      });
    });
  }
  function effect$2(_ref2) {
    var state = _ref2.state;
    var initialStyles = {
      popper: {
        position: state.options.strategy,
        left: "0",
        top: "0",
        margin: "0"
      },
      arrow: {
        position: "absolute"
      },
      reference: {}
    };
    Object.assign(state.elements.popper.style, initialStyles.popper);
    state.styles = initialStyles;
    if (state.elements.arrow) {
      Object.assign(state.elements.arrow.style, initialStyles.arrow);
    }
    return function() {
      Object.keys(state.elements).forEach(function(name) {
        var element = state.elements[name];
        var attributes = state.attributes[name] || {};
        var styleProperties = Object.keys(state.styles.hasOwnProperty(name) ? state.styles[name] : initialStyles[name]);
        var style = styleProperties.reduce(function(style2, property) {
          style2[property] = "";
          return style2;
        }, {});
        if (!isHTMLElement(element) || !getNodeName(element)) {
          return;
        }
        Object.assign(element.style, style);
        Object.keys(attributes).forEach(function(attribute) {
          element.removeAttribute(attribute);
        });
      });
    };
  }
  const applyStyles$1 = {
    name: "applyStyles",
    enabled: true,
    phase: "write",
    fn: applyStyles,
    effect: effect$2,
    requires: ["computeStyles"]
  };
  function getBasePlacement$1(placement) {
    return placement.split("-")[0];
  }
  var max = Math.max;
  var min = Math.min;
  var round = Math.round;
  function getUAString() {
    var uaData = navigator.userAgentData;
    if (uaData != null && uaData.brands && Array.isArray(uaData.brands)) {
      return uaData.brands.map(function(item) {
        return item.brand + "/" + item.version;
      }).join(" ");
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
    var _ref = isElement$1(element) ? getWindow(element) : window, visualViewport = _ref.visualViewport;
    var addVisualOffsets = !isLayoutViewport() && isFixedStrategy;
    var x = (clientRect.left + (addVisualOffsets && visualViewport ? visualViewport.offsetLeft : 0)) / scaleX;
    var y = (clientRect.top + (addVisualOffsets && visualViewport ? visualViewport.offsetTop : 0)) / scaleY;
    var width = clientRect.width / scaleX;
    var height = clientRect.height / scaleY;
    return {
      width,
      height,
      top: y,
      right: x + width,
      bottom: y + height,
      left: x,
      x,
      y
    };
  }
  function getLayoutRect(element) {
    var clientRect = getBoundingClientRect(element);
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
      width,
      height
    };
  }
  function contains(parent, child) {
    var rootNode = child.getRootNode && child.getRootNode();
    if (parent.contains(child)) {
      return true;
    } else if (rootNode && isShadowRoot(rootNode)) {
      var next = child;
      do {
        if (next && parent.isSameNode(next)) {
          return true;
        }
        next = next.parentNode || next.host;
      } while (next);
    }
    return false;
  }
  function getComputedStyle$1(element) {
    return getWindow(element).getComputedStyle(element);
  }
  function isTableElement(element) {
    return ["table", "td", "th"].indexOf(getNodeName(element)) >= 0;
  }
  function getDocumentElement(element) {
    return ((isElement$1(element) ? element.ownerDocument : (
      // $FlowFixMe[prop-missing]
      element.document
    )) || window.document).documentElement;
  }
  function getParentNode(element) {
    if (getNodeName(element) === "html") {
      return element;
    }
    return (
      // this is a quicker (but less type safe) way to save quite some bytes from the bundle
      // $FlowFixMe[incompatible-return]
      // $FlowFixMe[prop-missing]
      element.assignedSlot || // step into the shadow DOM of the parent of a slotted node
      element.parentNode || // DOM Element detected
      (isShadowRoot(element) ? element.host : null) || // ShadowRoot detected
      // $FlowFixMe[incompatible-call]: HTMLElement is a Node
      getDocumentElement(element)
    );
  }
  function getTrueOffsetParent(element) {
    if (!isHTMLElement(element) || // https://github.com/popperjs/popper-core/issues/837
    getComputedStyle$1(element).position === "fixed") {
      return null;
    }
    return element.offsetParent;
  }
  function getContainingBlock(element) {
    var isFirefox = /firefox/i.test(getUAString());
    var isIE = /Trident/i.test(getUAString());
    if (isIE && isHTMLElement(element)) {
      var elementCss = getComputedStyle$1(element);
      if (elementCss.position === "fixed") {
        return null;
      }
    }
    var currentNode = getParentNode(element);
    if (isShadowRoot(currentNode)) {
      currentNode = currentNode.host;
    }
    while (isHTMLElement(currentNode) && ["html", "body"].indexOf(getNodeName(currentNode)) < 0) {
      var css = getComputedStyle$1(currentNode);
      if (css.transform !== "none" || css.perspective !== "none" || css.contain === "paint" || ["transform", "perspective"].indexOf(css.willChange) !== -1 || isFirefox && css.willChange === "filter" || isFirefox && css.filter && css.filter !== "none") {
        return currentNode;
      } else {
        currentNode = currentNode.parentNode;
      }
    }
    return null;
  }
  function getOffsetParent(element) {
    var window2 = getWindow(element);
    var offsetParent = getTrueOffsetParent(element);
    while (offsetParent && isTableElement(offsetParent) && getComputedStyle$1(offsetParent).position === "static") {
      offsetParent = getTrueOffsetParent(offsetParent);
    }
    if (offsetParent && (getNodeName(offsetParent) === "html" || getNodeName(offsetParent) === "body" && getComputedStyle$1(offsetParent).position === "static")) {
      return window2;
    }
    return offsetParent || getContainingBlock(element) || window2;
  }
  function getMainAxisFromPlacement(placement) {
    return ["top", "bottom"].indexOf(placement) >= 0 ? "x" : "y";
  }
  function within(min$1, value, max$1) {
    return max(min$1, min(value, max$1));
  }
  function withinMaxClamp(min2, value, max2) {
    var v = within(min2, value, max2);
    return v > max2 ? max2 : v;
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
    return keys.reduce(function(hashMap, key) {
      hashMap[key] = value;
      return hashMap;
    }, {});
  }
  var toPaddingObject = function toPaddingObject2(padding, state) {
    padding = typeof padding === "function" ? padding(Object.assign({}, state.rects, {
      placement: state.placement
    })) : padding;
    return mergePaddingObject(typeof padding !== "number" ? padding : expandToHashMap(padding, basePlacements));
  };
  function arrow(_ref) {
    var _state$modifiersData$;
    var state = _ref.state, name = _ref.name, options = _ref.options;
    var arrowElement = state.elements.arrow;
    var popperOffsets2 = state.modifiersData.popperOffsets;
    var basePlacement = getBasePlacement$1(state.placement);
    var axis = getMainAxisFromPlacement(basePlacement);
    var isVertical = [left, right].indexOf(basePlacement) >= 0;
    var len = isVertical ? "height" : "width";
    if (!arrowElement || !popperOffsets2) {
      return;
    }
    var paddingObject = toPaddingObject(options.padding, state);
    var arrowRect = getLayoutRect(arrowElement);
    var minProp = axis === "y" ? top : left;
    var maxProp = axis === "y" ? bottom : right;
    var endDiff = state.rects.reference[len] + state.rects.reference[axis] - popperOffsets2[axis] - state.rects.popper[len];
    var startDiff = popperOffsets2[axis] - state.rects.reference[axis];
    var arrowOffsetParent = getOffsetParent(arrowElement);
    var clientSize = arrowOffsetParent ? axis === "y" ? arrowOffsetParent.clientHeight || 0 : arrowOffsetParent.clientWidth || 0 : 0;
    var centerToReference = endDiff / 2 - startDiff / 2;
    var min2 = paddingObject[minProp];
    var max2 = clientSize - arrowRect[len] - paddingObject[maxProp];
    var center = clientSize / 2 - arrowRect[len] / 2 + centerToReference;
    var offset2 = within(min2, center, max2);
    var axisProp = axis;
    state.modifiersData[name] = (_state$modifiersData$ = {}, _state$modifiersData$[axisProp] = offset2, _state$modifiersData$.centerOffset = offset2 - center, _state$modifiersData$);
  }
  function effect$1(_ref2) {
    var state = _ref2.state, options = _ref2.options;
    var _options$element = options.element, arrowElement = _options$element === void 0 ? "[data-popper-arrow]" : _options$element;
    if (arrowElement == null) {
      return;
    }
    if (typeof arrowElement === "string") {
      arrowElement = state.elements.popper.querySelector(arrowElement);
      if (!arrowElement) {
        return;
      }
    }
    if (!contains(state.elements.popper, arrowElement)) {
      return;
    }
    state.elements.arrow = arrowElement;
  }
  const arrow$1 = {
    name: "arrow",
    enabled: true,
    phase: "main",
    fn: arrow,
    effect: effect$1,
    requires: ["popperOffsets"],
    requiresIfExists: ["preventOverflow"]
  };
  function getVariation(placement) {
    return placement.split("-")[1];
  }
  var unsetSides = {
    top: "auto",
    right: "auto",
    bottom: "auto",
    left: "auto"
  };
  function roundOffsetsByDPR(_ref, win) {
    var x = _ref.x, y = _ref.y;
    var dpr = win.devicePixelRatio || 1;
    return {
      x: round(x * dpr) / dpr || 0,
      y: round(y * dpr) / dpr || 0
    };
  }
  function mapToStyles(_ref2) {
    var _Object$assign2;
    var popper2 = _ref2.popper, popperRect = _ref2.popperRect, placement = _ref2.placement, variation = _ref2.variation, offsets = _ref2.offsets, position = _ref2.position, gpuAcceleration = _ref2.gpuAcceleration, adaptive = _ref2.adaptive, roundOffsets = _ref2.roundOffsets, isFixed = _ref2.isFixed;
    var _offsets$x = offsets.x, x = _offsets$x === void 0 ? 0 : _offsets$x, _offsets$y = offsets.y, y = _offsets$y === void 0 ? 0 : _offsets$y;
    var _ref3 = typeof roundOffsets === "function" ? roundOffsets({
      x,
      y
    }) : {
      x,
      y
    };
    x = _ref3.x;
    y = _ref3.y;
    var hasX = offsets.hasOwnProperty("x");
    var hasY = offsets.hasOwnProperty("y");
    var sideX = left;
    var sideY = top;
    var win = window;
    if (adaptive) {
      var offsetParent = getOffsetParent(popper2);
      var heightProp = "clientHeight";
      var widthProp = "clientWidth";
      if (offsetParent === getWindow(popper2)) {
        offsetParent = getDocumentElement(popper2);
        if (getComputedStyle$1(offsetParent).position !== "static" && position === "absolute") {
          heightProp = "scrollHeight";
          widthProp = "scrollWidth";
        }
      }
      offsetParent = offsetParent;
      if (placement === top || (placement === left || placement === right) && variation === end) {
        sideY = bottom;
        var offsetY = isFixed && offsetParent === win && win.visualViewport ? win.visualViewport.height : (
          // $FlowFixMe[prop-missing]
          offsetParent[heightProp]
        );
        y -= offsetY - popperRect.height;
        y *= gpuAcceleration ? 1 : -1;
      }
      if (placement === left || (placement === top || placement === bottom) && variation === end) {
        sideX = right;
        var offsetX = isFixed && offsetParent === win && win.visualViewport ? win.visualViewport.width : (
          // $FlowFixMe[prop-missing]
          offsetParent[widthProp]
        );
        x -= offsetX - popperRect.width;
        x *= gpuAcceleration ? 1 : -1;
      }
    }
    var commonStyles = Object.assign({
      position
    }, adaptive && unsetSides);
    var _ref4 = roundOffsets === true ? roundOffsetsByDPR({
      x,
      y
    }, getWindow(popper2)) : {
      x,
      y
    };
    x = _ref4.x;
    y = _ref4.y;
    if (gpuAcceleration) {
      var _Object$assign;
      return Object.assign({}, commonStyles, (_Object$assign = {}, _Object$assign[sideY] = hasY ? "0" : "", _Object$assign[sideX] = hasX ? "0" : "", _Object$assign.transform = (win.devicePixelRatio || 1) <= 1 ? "translate(" + x + "px, " + y + "px)" : "translate3d(" + x + "px, " + y + "px, 0)", _Object$assign));
    }
    return Object.assign({}, commonStyles, (_Object$assign2 = {}, _Object$assign2[sideY] = hasY ? y + "px" : "", _Object$assign2[sideX] = hasX ? x + "px" : "", _Object$assign2.transform = "", _Object$assign2));
  }
  function computeStyles(_ref5) {
    var state = _ref5.state, options = _ref5.options;
    var _options$gpuAccelerat = options.gpuAcceleration, gpuAcceleration = _options$gpuAccelerat === void 0 ? true : _options$gpuAccelerat, _options$adaptive = options.adaptive, adaptive = _options$adaptive === void 0 ? true : _options$adaptive, _options$roundOffsets = options.roundOffsets, roundOffsets = _options$roundOffsets === void 0 ? true : _options$roundOffsets;
    var commonStyles = {
      placement: getBasePlacement$1(state.placement),
      variation: getVariation(state.placement),
      popper: state.elements.popper,
      popperRect: state.rects.popper,
      gpuAcceleration,
      isFixed: state.options.strategy === "fixed"
    };
    if (state.modifiersData.popperOffsets != null) {
      state.styles.popper = Object.assign({}, state.styles.popper, mapToStyles(Object.assign({}, commonStyles, {
        offsets: state.modifiersData.popperOffsets,
        position: state.options.strategy,
        adaptive,
        roundOffsets
      })));
    }
    if (state.modifiersData.arrow != null) {
      state.styles.arrow = Object.assign({}, state.styles.arrow, mapToStyles(Object.assign({}, commonStyles, {
        offsets: state.modifiersData.arrow,
        position: "absolute",
        adaptive: false,
        roundOffsets
      })));
    }
    state.attributes.popper = Object.assign({}, state.attributes.popper, {
      "data-popper-placement": state.placement
    });
  }
  const computeStyles$1 = {
    name: "computeStyles",
    enabled: true,
    phase: "beforeWrite",
    fn: computeStyles,
    data: {}
  };
  var passive = {
    passive: true
  };
  function effect(_ref) {
    var state = _ref.state, instance = _ref.instance, options = _ref.options;
    var _options$scroll = options.scroll, scroll = _options$scroll === void 0 ? true : _options$scroll, _options$resize = options.resize, resize = _options$resize === void 0 ? true : _options$resize;
    var window2 = getWindow(state.elements.popper);
    var scrollParents = [].concat(state.scrollParents.reference, state.scrollParents.popper);
    if (scroll) {
      scrollParents.forEach(function(scrollParent) {
        scrollParent.addEventListener("scroll", instance.update, passive);
      });
    }
    if (resize) {
      window2.addEventListener("resize", instance.update, passive);
    }
    return function() {
      if (scroll) {
        scrollParents.forEach(function(scrollParent) {
          scrollParent.removeEventListener("scroll", instance.update, passive);
        });
      }
      if (resize) {
        window2.removeEventListener("resize", instance.update, passive);
      }
    };
  }
  const eventListeners = {
    name: "eventListeners",
    enabled: true,
    phase: "write",
    fn: function fn() {
    },
    effect,
    data: {}
  };
  var hash$1 = {
    left: "right",
    right: "left",
    bottom: "top",
    top: "bottom"
  };
  function getOppositePlacement(placement) {
    return placement.replace(/left|right|bottom|top/g, function(matched) {
      return hash$1[matched];
    });
  }
  var hash = {
    start: "end",
    end: "start"
  };
  function getOppositeVariationPlacement(placement) {
    return placement.replace(/start|end/g, function(matched) {
      return hash[matched];
    });
  }
  function getWindowScroll(node) {
    var win = getWindow(node);
    var scrollLeft = win.pageXOffset;
    var scrollTop = win.pageYOffset;
    return {
      scrollLeft,
      scrollTop
    };
  }
  function getWindowScrollBarX(element) {
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
      if (layoutViewport || !layoutViewport && strategy === "fixed") {
        x = visualViewport.offsetLeft;
        y = visualViewport.offsetTop;
      }
    }
    return {
      width,
      height,
      x: x + getWindowScrollBarX(element),
      y
    };
  }
  function getDocumentRect(element) {
    var _element$ownerDocumen;
    var html = getDocumentElement(element);
    var winScroll = getWindowScroll(element);
    var body = (_element$ownerDocumen = element.ownerDocument) == null ? void 0 : _element$ownerDocumen.body;
    var width = max(html.scrollWidth, html.clientWidth, body ? body.scrollWidth : 0, body ? body.clientWidth : 0);
    var height = max(html.scrollHeight, html.clientHeight, body ? body.scrollHeight : 0, body ? body.clientHeight : 0);
    var x = -winScroll.scrollLeft + getWindowScrollBarX(element);
    var y = -winScroll.scrollTop;
    if (getComputedStyle$1(body || html).direction === "rtl") {
      x += max(html.clientWidth, body ? body.clientWidth : 0) - width;
    }
    return {
      width,
      height,
      x,
      y
    };
  }
  function isScrollParent(element) {
    var _getComputedStyle = getComputedStyle$1(element), overflow = _getComputedStyle.overflow, overflowX = _getComputedStyle.overflowX, overflowY = _getComputedStyle.overflowY;
    return /auto|scroll|overlay|hidden/.test(overflow + overflowY + overflowX);
  }
  function getScrollParent(node) {
    if (["html", "body", "#document"].indexOf(getNodeName(node)) >= 0) {
      return node.ownerDocument.body;
    }
    if (isHTMLElement(node) && isScrollParent(node)) {
      return node;
    }
    return getScrollParent(getParentNode(node));
  }
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
    return isBody ? updatedList : (
      // $FlowFixMe[incompatible-call]: isBody tells us target will be an HTMLElement here
      updatedList.concat(listScrollParents(getParentNode(target)))
    );
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
    var rect = getBoundingClientRect(element, false, strategy === "fixed");
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
  }
  function getClippingParents(element) {
    var clippingParents2 = listScrollParents(getParentNode(element));
    var canEscapeClipping = ["absolute", "fixed"].indexOf(getComputedStyle$1(element).position) >= 0;
    var clipperElement = canEscapeClipping && isHTMLElement(element) ? getOffsetParent(element) : element;
    if (!isElement$1(clipperElement)) {
      return [];
    }
    return clippingParents2.filter(function(clippingParent) {
      return isElement$1(clippingParent) && contains(clippingParent, clipperElement) && getNodeName(clippingParent) !== "body";
    });
  }
  function getClippingRect(element, boundary, rootBoundary, strategy) {
    var mainClippingParents = boundary === "clippingParents" ? getClippingParents(element) : [].concat(boundary);
    var clippingParents2 = [].concat(mainClippingParents, [rootBoundary]);
    var firstClippingParent = clippingParents2[0];
    var clippingRect = clippingParents2.reduce(function(accRect, clippingParent) {
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
    var reference2 = _ref.reference, element = _ref.element, placement = _ref.placement;
    var basePlacement = placement ? getBasePlacement$1(placement) : null;
    var variation = placement ? getVariation(placement) : null;
    var commonX = reference2.x + reference2.width / 2 - element.width / 2;
    var commonY = reference2.y + reference2.height / 2 - element.height / 2;
    var offsets;
    switch (basePlacement) {
      case top:
        offsets = {
          x: commonX,
          y: reference2.y - element.height
        };
        break;
      case bottom:
        offsets = {
          x: commonX,
          y: reference2.y + reference2.height
        };
        break;
      case right:
        offsets = {
          x: reference2.x + reference2.width,
          y: commonY
        };
        break;
      case left:
        offsets = {
          x: reference2.x - element.width,
          y: commonY
        };
        break;
      default:
        offsets = {
          x: reference2.x,
          y: reference2.y
        };
    }
    var mainAxis = basePlacement ? getMainAxisFromPlacement(basePlacement) : null;
    if (mainAxis != null) {
      var len = mainAxis === "y" ? "height" : "width";
      switch (variation) {
        case start:
          offsets[mainAxis] = offsets[mainAxis] - (reference2[len] / 2 - element[len] / 2);
          break;
        case end:
          offsets[mainAxis] = offsets[mainAxis] + (reference2[len] / 2 - element[len] / 2);
          break;
      }
    }
    return offsets;
  }
  function detectOverflow(state, options) {
    if (options === void 0) {
      options = {};
    }
    var _options = options, _options$placement = _options.placement, placement = _options$placement === void 0 ? state.placement : _options$placement, _options$strategy = _options.strategy, strategy = _options$strategy === void 0 ? state.strategy : _options$strategy, _options$boundary = _options.boundary, boundary = _options$boundary === void 0 ? clippingParents : _options$boundary, _options$rootBoundary = _options.rootBoundary, rootBoundary = _options$rootBoundary === void 0 ? viewport : _options$rootBoundary, _options$elementConte = _options.elementContext, elementContext = _options$elementConte === void 0 ? popper : _options$elementConte, _options$altBoundary = _options.altBoundary, altBoundary = _options$altBoundary === void 0 ? false : _options$altBoundary, _options$padding = _options.padding, padding = _options$padding === void 0 ? 0 : _options$padding;
    var paddingObject = mergePaddingObject(typeof padding !== "number" ? padding : expandToHashMap(padding, basePlacements));
    var altContext = elementContext === popper ? reference : popper;
    var popperRect = state.rects.popper;
    var element = state.elements[altBoundary ? altContext : elementContext];
    var clippingClientRect = getClippingRect(isElement$1(element) ? element : element.contextElement || getDocumentElement(state.elements.popper), boundary, rootBoundary, strategy);
    var referenceClientRect = getBoundingClientRect(state.elements.reference);
    var popperOffsets2 = computeOffsets({
      reference: referenceClientRect,
      element: popperRect,
      placement
    });
    var popperClientRect = rectToClientRect(Object.assign({}, popperRect, popperOffsets2));
    var elementClientRect = elementContext === popper ? popperClientRect : referenceClientRect;
    var overflowOffsets = {
      top: clippingClientRect.top - elementClientRect.top + paddingObject.top,
      bottom: elementClientRect.bottom - clippingClientRect.bottom + paddingObject.bottom,
      left: clippingClientRect.left - elementClientRect.left + paddingObject.left,
      right: elementClientRect.right - clippingClientRect.right + paddingObject.right
    };
    var offsetData = state.modifiersData.offset;
    if (elementContext === popper && offsetData) {
      var offset2 = offsetData[placement];
      Object.keys(overflowOffsets).forEach(function(key) {
        var multiply = [right, bottom].indexOf(key) >= 0 ? 1 : -1;
        var axis = [top, bottom].indexOf(key) >= 0 ? "y" : "x";
        overflowOffsets[key] += offset2[axis] * multiply;
      });
    }
    return overflowOffsets;
  }
  function computeAutoPlacement(state, options) {
    if (options === void 0) {
      options = {};
    }
    var _options = options, placement = _options.placement, boundary = _options.boundary, rootBoundary = _options.rootBoundary, padding = _options.padding, flipVariations = _options.flipVariations, _options$allowedAutoP = _options.allowedAutoPlacements, allowedAutoPlacements = _options$allowedAutoP === void 0 ? placements : _options$allowedAutoP;
    var variation = getVariation(placement);
    var placements$1 = variation ? flipVariations ? variationPlacements : variationPlacements.filter(function(placement2) {
      return getVariation(placement2) === variation;
    }) : basePlacements;
    var allowedPlacements = placements$1.filter(function(placement2) {
      return allowedAutoPlacements.indexOf(placement2) >= 0;
    });
    if (allowedPlacements.length === 0) {
      allowedPlacements = placements$1;
    }
    var overflows = allowedPlacements.reduce(function(acc, placement2) {
      acc[placement2] = detectOverflow(state, {
        placement: placement2,
        boundary,
        rootBoundary,
        padding
      })[getBasePlacement$1(placement2)];
      return acc;
    }, {});
    return Object.keys(overflows).sort(function(a, b) {
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
    var state = _ref.state, options = _ref.options, name = _ref.name;
    if (state.modifiersData[name]._skip) {
      return;
    }
    var _options$mainAxis = options.mainAxis, checkMainAxis = _options$mainAxis === void 0 ? true : _options$mainAxis, _options$altAxis = options.altAxis, checkAltAxis = _options$altAxis === void 0 ? true : _options$altAxis, specifiedFallbackPlacements = options.fallbackPlacements, padding = options.padding, boundary = options.boundary, rootBoundary = options.rootBoundary, altBoundary = options.altBoundary, _options$flipVariatio = options.flipVariations, flipVariations = _options$flipVariatio === void 0 ? true : _options$flipVariatio, allowedAutoPlacements = options.allowedAutoPlacements;
    var preferredPlacement = state.options.placement;
    var basePlacement = getBasePlacement$1(preferredPlacement);
    var isBasePlacement = basePlacement === preferredPlacement;
    var fallbackPlacements = specifiedFallbackPlacements || (isBasePlacement || !flipVariations ? [getOppositePlacement(preferredPlacement)] : getExpandedFallbackPlacements(preferredPlacement));
    var placements2 = [preferredPlacement].concat(fallbackPlacements).reduce(function(acc, placement2) {
      return acc.concat(getBasePlacement$1(placement2) === auto ? computeAutoPlacement(state, {
        placement: placement2,
        boundary,
        rootBoundary,
        padding,
        flipVariations,
        allowedAutoPlacements
      }) : placement2);
    }, []);
    var referenceRect = state.rects.reference;
    var popperRect = state.rects.popper;
    var checksMap = /* @__PURE__ */ new Map();
    var makeFallbackChecks = true;
    var firstFittingPlacement = placements2[0];
    for (var i = 0; i < placements2.length; i++) {
      var placement = placements2[i];
      var _basePlacement = getBasePlacement$1(placement);
      var isStartVariation = getVariation(placement) === start;
      var isVertical = [top, bottom].indexOf(_basePlacement) >= 0;
      var len = isVertical ? "width" : "height";
      var overflow = detectOverflow(state, {
        placement,
        boundary,
        rootBoundary,
        altBoundary,
        padding
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
      if (checks.every(function(check) {
        return check;
      })) {
        firstFittingPlacement = placement;
        makeFallbackChecks = false;
        break;
      }
      checksMap.set(placement, checks);
    }
    if (makeFallbackChecks) {
      var numberOfChecks = flipVariations ? 3 : 1;
      var _loop = function _loop2(_i2) {
        var fittingPlacement = placements2.find(function(placement2) {
          var checks2 = checksMap.get(placement2);
          if (checks2) {
            return checks2.slice(0, _i2).every(function(check) {
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
  }
  const flip$1 = {
    name: "flip",
    enabled: true,
    phase: "main",
    fn: flip,
    requiresIfExists: ["offset"],
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
    return [top, right, bottom, left].some(function(side) {
      return overflow[side] >= 0;
    });
  }
  function hide(_ref) {
    var state = _ref.state, name = _ref.name;
    var referenceRect = state.rects.reference;
    var popperRect = state.rects.popper;
    var preventedOffsets = state.modifiersData.preventOverflow;
    var referenceOverflow = detectOverflow(state, {
      elementContext: "reference"
    });
    var popperAltOverflow = detectOverflow(state, {
      altBoundary: true
    });
    var referenceClippingOffsets = getSideOffsets(referenceOverflow, referenceRect);
    var popperEscapeOffsets = getSideOffsets(popperAltOverflow, popperRect, preventedOffsets);
    var isReferenceHidden = isAnySideFullyClipped(referenceClippingOffsets);
    var hasPopperEscaped = isAnySideFullyClipped(popperEscapeOffsets);
    state.modifiersData[name] = {
      referenceClippingOffsets,
      popperEscapeOffsets,
      isReferenceHidden,
      hasPopperEscaped
    };
    state.attributes.popper = Object.assign({}, state.attributes.popper, {
      "data-popper-reference-hidden": isReferenceHidden,
      "data-popper-escaped": hasPopperEscaped
    });
  }
  const hide$1 = {
    name: "hide",
    enabled: true,
    phase: "main",
    requiresIfExists: ["preventOverflow"],
    fn: hide
  };
  function distanceAndSkiddingToXY(placement, rects, offset2) {
    var basePlacement = getBasePlacement$1(placement);
    var invertDistance = [left, top].indexOf(basePlacement) >= 0 ? -1 : 1;
    var _ref = typeof offset2 === "function" ? offset2(Object.assign({}, rects, {
      placement
    })) : offset2, skidding = _ref[0], distance = _ref[1];
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
    var state = _ref2.state, options = _ref2.options, name = _ref2.name;
    var _options$offset = options.offset, offset2 = _options$offset === void 0 ? [0, 0] : _options$offset;
    var data = placements.reduce(function(acc, placement) {
      acc[placement] = distanceAndSkiddingToXY(placement, state.rects, offset2);
      return acc;
    }, {});
    var _data$state$placement = data[state.placement], x = _data$state$placement.x, y = _data$state$placement.y;
    if (state.modifiersData.popperOffsets != null) {
      state.modifiersData.popperOffsets.x += x;
      state.modifiersData.popperOffsets.y += y;
    }
    state.modifiersData[name] = data;
  }
  const offset$1 = {
    name: "offset",
    enabled: true,
    phase: "main",
    requires: ["popperOffsets"],
    fn: offset
  };
  function popperOffsets(_ref) {
    var state = _ref.state, name = _ref.name;
    state.modifiersData[name] = computeOffsets({
      reference: state.rects.reference,
      element: state.rects.popper,
      placement: state.placement
    });
  }
  const popperOffsets$1 = {
    name: "popperOffsets",
    enabled: true,
    phase: "read",
    fn: popperOffsets,
    data: {}
  };
  function getAltAxis(axis) {
    return axis === "x" ? "y" : "x";
  }
  function preventOverflow(_ref) {
    var state = _ref.state, options = _ref.options, name = _ref.name;
    var _options$mainAxis = options.mainAxis, checkMainAxis = _options$mainAxis === void 0 ? true : _options$mainAxis, _options$altAxis = options.altAxis, checkAltAxis = _options$altAxis === void 0 ? false : _options$altAxis, boundary = options.boundary, rootBoundary = options.rootBoundary, altBoundary = options.altBoundary, padding = options.padding, _options$tether = options.tether, tether = _options$tether === void 0 ? true : _options$tether, _options$tetherOffset = options.tetherOffset, tetherOffset = _options$tetherOffset === void 0 ? 0 : _options$tetherOffset;
    var overflow = detectOverflow(state, {
      boundary,
      rootBoundary,
      padding,
      altBoundary
    });
    var basePlacement = getBasePlacement$1(state.placement);
    var variation = getVariation(state.placement);
    var isBasePlacement = !variation;
    var mainAxis = getMainAxisFromPlacement(basePlacement);
    var altAxis = getAltAxis(mainAxis);
    var popperOffsets2 = state.modifiersData.popperOffsets;
    var referenceRect = state.rects.reference;
    var popperRect = state.rects.popper;
    var tetherOffsetValue = typeof tetherOffset === "function" ? tetherOffset(Object.assign({}, state.rects, {
      placement: state.placement
    })) : tetherOffset;
    var normalizedTetherOffsetValue = typeof tetherOffsetValue === "number" ? {
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
    if (!popperOffsets2) {
      return;
    }
    if (checkMainAxis) {
      var _offsetModifierState$;
      var mainSide = mainAxis === "y" ? top : left;
      var altSide = mainAxis === "y" ? bottom : right;
      var len = mainAxis === "y" ? "height" : "width";
      var offset2 = popperOffsets2[mainAxis];
      var min$1 = offset2 + overflow[mainSide];
      var max$1 = offset2 - overflow[altSide];
      var additive = tether ? -popperRect[len] / 2 : 0;
      var minLen = variation === start ? referenceRect[len] : popperRect[len];
      var maxLen = variation === start ? -popperRect[len] : -referenceRect[len];
      var arrowElement = state.elements.arrow;
      var arrowRect = tether && arrowElement ? getLayoutRect(arrowElement) : {
        width: 0,
        height: 0
      };
      var arrowPaddingObject = state.modifiersData["arrow#persistent"] ? state.modifiersData["arrow#persistent"].padding : getFreshSideObject();
      var arrowPaddingMin = arrowPaddingObject[mainSide];
      var arrowPaddingMax = arrowPaddingObject[altSide];
      var arrowLen = within(0, referenceRect[len], arrowRect[len]);
      var minOffset = isBasePlacement ? referenceRect[len] / 2 - additive - arrowLen - arrowPaddingMin - normalizedTetherOffsetValue.mainAxis : minLen - arrowLen - arrowPaddingMin - normalizedTetherOffsetValue.mainAxis;
      var maxOffset = isBasePlacement ? -referenceRect[len] / 2 + additive + arrowLen + arrowPaddingMax + normalizedTetherOffsetValue.mainAxis : maxLen + arrowLen + arrowPaddingMax + normalizedTetherOffsetValue.mainAxis;
      var arrowOffsetParent = state.elements.arrow && getOffsetParent(state.elements.arrow);
      var clientOffset = arrowOffsetParent ? mainAxis === "y" ? arrowOffsetParent.clientTop || 0 : arrowOffsetParent.clientLeft || 0 : 0;
      var offsetModifierValue = (_offsetModifierState$ = offsetModifierState == null ? void 0 : offsetModifierState[mainAxis]) != null ? _offsetModifierState$ : 0;
      var tetherMin = offset2 + minOffset - offsetModifierValue - clientOffset;
      var tetherMax = offset2 + maxOffset - offsetModifierValue;
      var preventedOffset = within(tether ? min(min$1, tetherMin) : min$1, offset2, tether ? max(max$1, tetherMax) : max$1);
      popperOffsets2[mainAxis] = preventedOffset;
      data[mainAxis] = preventedOffset - offset2;
    }
    if (checkAltAxis) {
      var _offsetModifierState$2;
      var _mainSide = mainAxis === "x" ? top : left;
      var _altSide = mainAxis === "x" ? bottom : right;
      var _offset = popperOffsets2[altAxis];
      var _len = altAxis === "y" ? "height" : "width";
      var _min = _offset + overflow[_mainSide];
      var _max = _offset - overflow[_altSide];
      var isOriginSide = [top, left].indexOf(basePlacement) !== -1;
      var _offsetModifierValue = (_offsetModifierState$2 = offsetModifierState == null ? void 0 : offsetModifierState[altAxis]) != null ? _offsetModifierState$2 : 0;
      var _tetherMin = isOriginSide ? _min : _offset - referenceRect[_len] - popperRect[_len] - _offsetModifierValue + normalizedTetherOffsetValue.altAxis;
      var _tetherMax = isOriginSide ? _offset + referenceRect[_len] + popperRect[_len] - _offsetModifierValue - normalizedTetherOffsetValue.altAxis : _max;
      var _preventedOffset = tether && isOriginSide ? withinMaxClamp(_tetherMin, _offset, _tetherMax) : within(tether ? _tetherMin : _min, _offset, tether ? _tetherMax : _max);
      popperOffsets2[altAxis] = _preventedOffset;
      data[altAxis] = _preventedOffset - _offset;
    }
    state.modifiersData[name] = data;
  }
  const preventOverflow$1 = {
    name: "preventOverflow",
    enabled: true,
    phase: "main",
    fn: preventOverflow,
    requiresIfExists: ["offset"]
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
  }
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
      if (getNodeName(offsetParent) !== "body" || // https://github.com/popperjs/popper-core/issues/1078
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
    var map = /* @__PURE__ */ new Map();
    var visited = /* @__PURE__ */ new Set();
    var result = [];
    modifiers.forEach(function(modifier) {
      map.set(modifier.name, modifier);
    });
    function sort(modifier) {
      visited.add(modifier.name);
      var requires = [].concat(modifier.requires || [], modifier.requiresIfExists || []);
      requires.forEach(function(dep) {
        if (!visited.has(dep)) {
          var depModifier = map.get(dep);
          if (depModifier) {
            sort(depModifier);
          }
        }
      });
      result.push(modifier);
    }
    modifiers.forEach(function(modifier) {
      if (!visited.has(modifier.name)) {
        sort(modifier);
      }
    });
    return result;
  }
  function orderModifiers(modifiers) {
    var orderedModifiers = order(modifiers);
    return modifierPhases.reduce(function(acc, phase) {
      return acc.concat(orderedModifiers.filter(function(modifier) {
        return modifier.phase === phase;
      }));
    }, []);
  }
  function debounce$1(fn) {
    var pending;
    return function() {
      if (!pending) {
        pending = new Promise(function(resolve) {
          Promise.resolve().then(function() {
            pending = void 0;
            resolve(fn());
          });
        });
      }
      return pending;
    };
  }
  function mergeByName(modifiers) {
    var merged = modifiers.reduce(function(merged2, current) {
      var existing = merged2[current.name];
      merged2[current.name] = existing ? Object.assign({}, existing, current, {
        options: Object.assign({}, existing.options, current.options),
        data: Object.assign({}, existing.data, current.data)
      }) : current;
      return merged2;
    }, {});
    return Object.keys(merged).map(function(key) {
      return merged[key];
    });
  }
  var DEFAULT_OPTIONS = {
    placement: "bottom",
    modifiers: [],
    strategy: "absolute"
  };
  function areValidElements() {
    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }
    return !args.some(function(element) {
      return !(element && typeof element.getBoundingClientRect === "function");
    });
  }
  function popperGenerator(generatorOptions) {
    if (generatorOptions === void 0) {
      generatorOptions = {};
    }
    var _generatorOptions = generatorOptions, _generatorOptions$def = _generatorOptions.defaultModifiers, defaultModifiers2 = _generatorOptions$def === void 0 ? [] : _generatorOptions$def, _generatorOptions$def2 = _generatorOptions.defaultOptions, defaultOptions2 = _generatorOptions$def2 === void 0 ? DEFAULT_OPTIONS : _generatorOptions$def2;
    return function createPopper2(reference2, popper2, options) {
      if (options === void 0) {
        options = defaultOptions2;
      }
      var state = {
        placement: "bottom",
        orderedModifiers: [],
        options: Object.assign({}, DEFAULT_OPTIONS, defaultOptions2),
        modifiersData: {},
        elements: {
          reference: reference2,
          popper: popper2
        },
        attributes: {},
        styles: {}
      };
      var effectCleanupFns = [];
      var isDestroyed = false;
      var instance = {
        state,
        setOptions: function setOptions(setOptionsAction) {
          var options2 = typeof setOptionsAction === "function" ? setOptionsAction(state.options) : setOptionsAction;
          cleanupModifierEffects();
          state.options = Object.assign({}, defaultOptions2, state.options, options2);
          state.scrollParents = {
            reference: isElement$1(reference2) ? listScrollParents(reference2) : reference2.contextElement ? listScrollParents(reference2.contextElement) : [],
            popper: listScrollParents(popper2)
          };
          var orderedModifiers = orderModifiers(mergeByName([].concat(defaultModifiers2, state.options.modifiers)));
          state.orderedModifiers = orderedModifiers.filter(function(m) {
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
          var _state$elements = state.elements, reference3 = _state$elements.reference, popper3 = _state$elements.popper;
          if (!areValidElements(reference3, popper3)) {
            return;
          }
          state.rects = {
            reference: getCompositeRect(reference3, getOffsetParent(popper3), state.options.strategy === "fixed"),
            popper: getLayoutRect(popper3)
          };
          state.reset = false;
          state.placement = state.options.placement;
          state.orderedModifiers.forEach(function(modifier) {
            return state.modifiersData[modifier.name] = Object.assign({}, modifier.data);
          });
          for (var index2 = 0; index2 < state.orderedModifiers.length; index2++) {
            if (state.reset === true) {
              state.reset = false;
              index2 = -1;
              continue;
            }
            var _state$orderedModifie = state.orderedModifiers[index2], fn = _state$orderedModifie.fn, _state$orderedModifie2 = _state$orderedModifie.options, _options = _state$orderedModifie2 === void 0 ? {} : _state$orderedModifie2, name = _state$orderedModifie.name;
            if (typeof fn === "function") {
              state = fn({
                state,
                options: _options,
                name,
                instance
              }) || state;
            }
          }
        },
        // Async and optimistically optimized update – it will not be executed if
        // not necessary (debounced to run at most once-per-tick)
        update: debounce$1(function() {
          return new Promise(function(resolve) {
            instance.forceUpdate();
            resolve(state);
          });
        }),
        destroy: function destroy() {
          cleanupModifierEffects();
          isDestroyed = true;
        }
      };
      if (!areValidElements(reference2, popper2)) {
        return instance;
      }
      instance.setOptions(options).then(function(state2) {
        if (!isDestroyed && options.onFirstUpdate) {
          options.onFirstUpdate(state2);
        }
      });
      function runModifierEffects() {
        state.orderedModifiers.forEach(function(_ref) {
          var name = _ref.name, _ref$options = _ref.options, options2 = _ref$options === void 0 ? {} : _ref$options, effect2 = _ref.effect;
          if (typeof effect2 === "function") {
            var cleanupFn = effect2({
              state,
              name,
              instance,
              options: options2
            });
            var noopFn = function noopFn2() {
            };
            effectCleanupFns.push(cleanupFn || noopFn);
          }
        });
      }
      function cleanupModifierEffects() {
        effectCleanupFns.forEach(function(fn) {
          return fn();
        });
        effectCleanupFns = [];
      }
      return instance;
    };
  }
  var defaultModifiers = [eventListeners, popperOffsets$1, computeStyles$1, applyStyles$1, offset$1, flip$1, preventOverflow$1, arrow$1, hide$1];
  var createPopper = /* @__PURE__ */ popperGenerator({
    defaultModifiers
  });
  var BOX_CLASS = "tippy-box";
  var CONTENT_CLASS = "tippy-content";
  var BACKDROP_CLASS = "tippy-backdrop";
  var ARROW_CLASS = "tippy-arrow";
  var SVG_ARROW_CLASS = "tippy-svg-arrow";
  var TOUCH_OPTIONS = {
    passive: true,
    capture: true
  };
  var TIPPY_DEFAULT_APPEND_TO = function TIPPY_DEFAULT_APPEND_TO2() {
    return document.body;
  };
  function getValueAtIndexOrReturn(value, index2, defaultValue) {
    if (Array.isArray(value)) {
      var v = value[index2];
      return v == null ? Array.isArray(defaultValue) ? defaultValue[index2] : defaultValue : v;
    }
    return value;
  }
  function isType(value, type) {
    var str = {}.toString.call(value);
    return str.indexOf("[object") === 0 && str.indexOf(type + "]") > -1;
  }
  function invokeWithArgsOrReturn(value, args) {
    return typeof value === "function" ? value.apply(void 0, args) : value;
  }
  function debounce(fn5, ms) {
    if (ms === 0) {
      return fn5;
    }
    var timeout;
    return function(arg) {
      clearTimeout(timeout);
      timeout = setTimeout(function() {
        fn5(arg);
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
    return arr.filter(function(item, index2) {
      return arr.indexOf(item) === index2;
    });
  }
  function getBasePlacement(placement) {
    return placement.split("-")[0];
  }
  function arrayFrom(value) {
    return [].slice.call(value);
  }
  function removeUndefinedProps(obj) {
    return Object.keys(obj).reduce(function(acc, key) {
      if (obj[key] !== void 0) {
        acc[key] = obj[key];
      }
      return acc;
    }, {});
  }
  function div() {
    return document.createElement("div");
  }
  function isElement(value) {
    return ["Element", "Fragment"].some(function(type) {
      return isType(value, type);
    });
  }
  function isNodeList(value) {
    return isType(value, "NodeList");
  }
  function isMouseEvent(value) {
    return isType(value, "MouseEvent");
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
    els.forEach(function(el) {
      if (el) {
        el.style.transitionDuration = value + "ms";
      }
    });
  }
  function setVisibilityState(els, state) {
    els.forEach(function(el) {
      if (el) {
        el.setAttribute("data-state", state);
      }
    });
  }
  function getOwnerDocument(elementOrElements) {
    var _element$ownerDocumen;
    var _normalizeToArray = normalizeToArray(elementOrElements), element = _normalizeToArray[0];
    return element != null && (_element$ownerDocumen = element.ownerDocument) != null && _element$ownerDocumen.body ? element.ownerDocument : document;
  }
  function isCursorOutsideInteractiveBorder(popperTreeData, event) {
    var clientX = event.clientX, clientY = event.clientY;
    return popperTreeData.every(function(_ref) {
      var popperRect = _ref.popperRect, popperState = _ref.popperState, props = _ref.props;
      var interactiveBorder = props.interactiveBorder;
      var basePlacement = getBasePlacement(popperState.placement);
      var offsetData = popperState.modifiersData.offset;
      if (!offsetData) {
        return true;
      }
      var topDistance = basePlacement === "bottom" ? offsetData.top.y : 0;
      var bottomDistance = basePlacement === "top" ? offsetData.bottom.y : 0;
      var leftDistance = basePlacement === "right" ? offsetData.left.x : 0;
      var rightDistance = basePlacement === "left" ? offsetData.right.x : 0;
      var exceedsTop = popperRect.top - clientY + topDistance > interactiveBorder;
      var exceedsBottom = clientY - popperRect.bottom - bottomDistance > interactiveBorder;
      var exceedsLeft = popperRect.left - clientX + leftDistance > interactiveBorder;
      var exceedsRight = clientX - popperRect.right - rightDistance > interactiveBorder;
      return exceedsTop || exceedsBottom || exceedsLeft || exceedsRight;
    });
  }
  function updateTransitionEndListener(box, action, listener) {
    var method = action + "EventListener";
    ["transitionend", "webkitTransitionEnd"].forEach(function(event) {
      box[method](event, listener);
    });
  }
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
  function onDocumentTouchStart() {
    if (currentInput.isTouch) {
      return;
    }
    currentInput.isTouch = true;
    if (window.performance) {
      document.addEventListener("mousemove", onDocumentMouseMove);
    }
  }
  function onDocumentMouseMove() {
    var now = performance.now();
    if (now - lastMouseMoveTime < 20) {
      currentInput.isTouch = false;
      document.removeEventListener("mousemove", onDocumentMouseMove);
    }
    lastMouseMoveTime = now;
  }
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
    document.addEventListener("touchstart", onDocumentTouchStart, TOUCH_OPTIONS);
    window.addEventListener("blur", onWindowBlur);
  }
  var isBrowser = typeof window !== "undefined" && typeof document !== "undefined";
  var isIE11 = isBrowser ? (
    // @ts-ignore
    !!window.msCrypto
  ) : false;
  var pluginProps = {
    animateFill: false,
    followCursor: false,
    inlinePositioning: false,
    sticky: false
  };
  var renderProps = {
    allowHTML: false,
    animation: "fade",
    arrow: true,
    content: "",
    inertia: false,
    maxWidth: 350,
    role: "tooltip",
    theme: "",
    zIndex: 9999
  };
  var defaultProps = Object.assign({
    appendTo: TIPPY_DEFAULT_APPEND_TO,
    aria: {
      content: "auto",
      expanded: "auto"
    },
    delay: 0,
    duration: [300, 250],
    getReferenceClientRect: null,
    hideOnClick: true,
    ignoreAttributes: false,
    interactive: false,
    interactiveBorder: 2,
    interactiveDebounce: 0,
    moveTransition: "",
    offset: [0, 10],
    onAfterUpdate: function onAfterUpdate() {
    },
    onBeforeUpdate: function onBeforeUpdate() {
    },
    onCreate: function onCreate() {
    },
    onDestroy: function onDestroy() {
    },
    onHidden: function onHidden() {
    },
    onHide: function onHide() {
    },
    onMount: function onMount() {
    },
    onShow: function onShow() {
    },
    onShown: function onShown() {
    },
    onTrigger: function onTrigger() {
    },
    onUntrigger: function onUntrigger() {
    },
    onClickOutside: function onClickOutside() {
    },
    placement: "top",
    plugins: [],
    popperOptions: {},
    render: null,
    showOnCreate: false,
    touch: true,
    trigger: "mouseenter focus",
    triggerTarget: null
  }, pluginProps, renderProps);
  var defaultKeys = Object.keys(defaultProps);
  var setDefaultProps = function setDefaultProps2(partialProps) {
    var keys = Object.keys(partialProps);
    keys.forEach(function(key) {
      defaultProps[key] = partialProps[key];
    });
  };
  function getExtendedPassedProps(passedProps) {
    var plugins = passedProps.plugins || [];
    var pluginProps2 = plugins.reduce(function(acc, plugin) {
      var name = plugin.name, defaultValue = plugin.defaultValue;
      if (name) {
        var _name;
        acc[name] = passedProps[name] !== void 0 ? passedProps[name] : (_name = defaultProps[name]) != null ? _name : defaultValue;
      }
      return acc;
    }, {});
    return Object.assign({}, passedProps, pluginProps2);
  }
  function getDataAttributeProps(reference2, plugins) {
    var propKeys = plugins ? Object.keys(getExtendedPassedProps(Object.assign({}, defaultProps, {
      plugins
    }))) : defaultKeys;
    var props = propKeys.reduce(function(acc, key) {
      var valueAsString = (reference2.getAttribute("data-tippy-" + key) || "").trim();
      if (!valueAsString) {
        return acc;
      }
      if (key === "content") {
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
  function evaluateProps(reference2, props) {
    var out = Object.assign({}, props, {
      content: invokeWithArgsOrReturn(props.content, [reference2])
    }, props.ignoreAttributes ? {} : getDataAttributeProps(reference2, props.plugins));
    out.aria = Object.assign({}, defaultProps.aria, out.aria);
    out.aria = {
      expanded: out.aria.expanded === "auto" ? props.interactive : out.aria.expanded,
      content: out.aria.content === "auto" ? props.interactive ? null : "describedby" : out.aria.content
    };
    return out;
  }
  var innerHTML = function innerHTML2() {
    return "innerHTML";
  };
  function dangerouslySetInnerHTML(element, html) {
    element[innerHTML()] = html;
  }
  function createArrowElement(value) {
    var arrow2 = div();
    if (value === true) {
      arrow2.className = ARROW_CLASS;
    } else {
      arrow2.className = SVG_ARROW_CLASS;
      if (isElement(value)) {
        arrow2.appendChild(value);
      } else {
        dangerouslySetInnerHTML(arrow2, value);
      }
    }
    return arrow2;
  }
  function setContent(content, props) {
    if (isElement(props.content)) {
      dangerouslySetInnerHTML(content, "");
      content.appendChild(props.content);
    } else if (typeof props.content !== "function") {
      if (props.allowHTML) {
        dangerouslySetInnerHTML(content, props.content);
      } else {
        content.textContent = props.content;
      }
    }
  }
  function getChildren(popper2) {
    var box = popper2.firstElementChild;
    var boxChildren = arrayFrom(box.children);
    return {
      box,
      content: boxChildren.find(function(node) {
        return node.classList.contains(CONTENT_CLASS);
      }),
      arrow: boxChildren.find(function(node) {
        return node.classList.contains(ARROW_CLASS) || node.classList.contains(SVG_ARROW_CLASS);
      }),
      backdrop: boxChildren.find(function(node) {
        return node.classList.contains(BACKDROP_CLASS);
      })
    };
  }
  function render(instance) {
    var popper2 = div();
    var box = div();
    box.className = BOX_CLASS;
    box.setAttribute("data-state", "hidden");
    box.setAttribute("tabindex", "-1");
    var content = div();
    content.className = CONTENT_CLASS;
    content.setAttribute("data-state", "hidden");
    setContent(content, instance.props);
    popper2.appendChild(box);
    box.appendChild(content);
    onUpdate(instance.props, instance.props);
    function onUpdate(prevProps, nextProps) {
      var _getChildren = getChildren(popper2), box2 = _getChildren.box, content2 = _getChildren.content, arrow2 = _getChildren.arrow;
      if (nextProps.theme) {
        box2.setAttribute("data-theme", nextProps.theme);
      } else {
        box2.removeAttribute("data-theme");
      }
      if (typeof nextProps.animation === "string") {
        box2.setAttribute("data-animation", nextProps.animation);
      } else {
        box2.removeAttribute("data-animation");
      }
      if (nextProps.inertia) {
        box2.setAttribute("data-inertia", "");
      } else {
        box2.removeAttribute("data-inertia");
      }
      box2.style.maxWidth = typeof nextProps.maxWidth === "number" ? nextProps.maxWidth + "px" : nextProps.maxWidth;
      if (nextProps.role) {
        box2.setAttribute("role", nextProps.role);
      } else {
        box2.removeAttribute("role");
      }
      if (prevProps.content !== nextProps.content || prevProps.allowHTML !== nextProps.allowHTML) {
        setContent(content2, instance.props);
      }
      if (nextProps.arrow) {
        if (!arrow2) {
          box2.appendChild(createArrowElement(nextProps.arrow));
        } else if (prevProps.arrow !== nextProps.arrow) {
          box2.removeChild(arrow2);
          box2.appendChild(createArrowElement(nextProps.arrow));
        }
      } else if (arrow2) {
        box2.removeChild(arrow2);
      }
    }
    return {
      popper: popper2,
      onUpdate
    };
  }
  render.$$tippy = true;
  var idCounter = 1;
  var mouseMoveListeners = [];
  var mountedInstances = [];
  function createTippy(reference2, passedProps) {
    var props = evaluateProps(reference2, Object.assign({}, defaultProps, getExtendedPassedProps(removeUndefinedProps(passedProps))));
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
    var currentTarget;
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
      id,
      reference: reference2,
      popper: div(),
      popperInstance,
      props,
      state,
      plugins,
      // methods
      clearDelayTimeouts,
      setProps,
      setContent: setContent2,
      show,
      hide: hide2,
      hideWithInteractivity,
      enable,
      disable,
      unmount,
      destroy
    };
    if (!props.render) {
      return instance;
    }
    var _props$render = props.render(instance), popper2 = _props$render.popper, onUpdate = _props$render.onUpdate;
    popper2.setAttribute("data-tippy-root", "");
    popper2.id = "tippy-" + instance.id;
    instance.popper = popper2;
    reference2._tippy = instance;
    popper2._tippy = instance;
    var pluginsHooks = plugins.map(function(plugin) {
      return plugin.fn(instance);
    });
    var hasAriaExpanded = reference2.hasAttribute("aria-expanded");
    addListeners();
    handleAriaExpandedAttribute();
    handleStyles();
    invokeHook("onCreate", [instance]);
    if (props.showOnCreate) {
      scheduleShow();
    }
    popper2.addEventListener("mouseenter", function() {
      if (instance.props.interactive && instance.state.isVisible) {
        instance.clearDelayTimeouts();
      }
    });
    popper2.addEventListener("mouseleave", function() {
      if (instance.props.interactive && instance.props.trigger.indexOf("mouseenter") >= 0) {
        getDocument().addEventListener("mousemove", debouncedOnMouseMove);
      }
    });
    return instance;
    function getNormalizedTouchSettings() {
      var touch = instance.props.touch;
      return Array.isArray(touch) ? touch : [touch, 0];
    }
    function getIsCustomTouchBehavior() {
      return getNormalizedTouchSettings()[0] === "hold";
    }
    function getIsDefaultRenderFn() {
      var _instance$props$rende;
      return !!((_instance$props$rende = instance.props.render) != null && _instance$props$rende.$$tippy);
    }
    function getCurrentTarget() {
      return currentTarget || reference2;
    }
    function getDocument() {
      var parent = getCurrentTarget().parentNode;
      return parent ? getOwnerDocument(parent) : document;
    }
    function getDefaultTemplateChildren() {
      return getChildren(popper2);
    }
    function getDelay(isShow) {
      if (instance.state.isMounted && !instance.state.isVisible || currentInput.isTouch || lastTriggerEvent && lastTriggerEvent.type === "focus") {
        return 0;
      }
      return getValueAtIndexOrReturn(instance.props.delay, isShow ? 0 : 1, defaultProps.delay);
    }
    function handleStyles(fromHide) {
      if (fromHide === void 0) {
        fromHide = false;
      }
      popper2.style.pointerEvents = instance.props.interactive && !fromHide ? "" : "none";
      popper2.style.zIndex = "" + instance.props.zIndex;
    }
    function invokeHook(hook, args, shouldInvokePropsHook) {
      if (shouldInvokePropsHook === void 0) {
        shouldInvokePropsHook = true;
      }
      pluginsHooks.forEach(function(pluginHooks) {
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
      var id2 = popper2.id;
      var nodes = normalizeToArray(instance.props.triggerTarget || reference2);
      nodes.forEach(function(node) {
        var currentValue = node.getAttribute(attr);
        if (instance.state.isVisible) {
          node.setAttribute(attr, currentValue ? currentValue + " " + id2 : id2);
        } else {
          var nextValue = currentValue && currentValue.replace(id2, "").trim();
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
      var nodes = normalizeToArray(instance.props.triggerTarget || reference2);
      nodes.forEach(function(node) {
        if (instance.props.interactive) {
          node.setAttribute("aria-expanded", instance.state.isVisible && node === getCurrentTarget() ? "true" : "false");
        } else {
          node.removeAttribute("aria-expanded");
        }
      });
    }
    function cleanupInteractiveMouseListeners() {
      getDocument().removeEventListener("mousemove", debouncedOnMouseMove);
      mouseMoveListeners = mouseMoveListeners.filter(function(listener) {
        return listener !== debouncedOnMouseMove;
      });
    }
    function onDocumentPress(event) {
      if (currentInput.isTouch) {
        if (didTouchMove || event.type === "mousedown") {
          return;
        }
      }
      var actualTarget = event.composedPath && event.composedPath()[0] || event.target;
      if (instance.props.interactive && actualContains(popper2, actualTarget)) {
        return;
      }
      if (normalizeToArray(instance.props.triggerTarget || reference2).some(function(el) {
        return actualContains(el, actualTarget);
      })) {
        if (currentInput.isTouch) {
          return;
        }
        if (instance.state.isVisible && instance.props.trigger.indexOf("click") >= 0) {
          return;
        }
      } else {
        invokeHook("onClickOutside", [instance, event]);
      }
      if (instance.props.hideOnClick === true) {
        instance.clearDelayTimeouts();
        instance.hide();
        didHideDueToDocumentMouseDown = true;
        setTimeout(function() {
          didHideDueToDocumentMouseDown = false;
        });
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
      doc.addEventListener("mousedown", onDocumentPress, true);
      doc.addEventListener("touchend", onDocumentPress, TOUCH_OPTIONS);
      doc.addEventListener("touchstart", onTouchStart, TOUCH_OPTIONS);
      doc.addEventListener("touchmove", onTouchMove, TOUCH_OPTIONS);
    }
    function removeDocumentPress() {
      var doc = getDocument();
      doc.removeEventListener("mousedown", onDocumentPress, true);
      doc.removeEventListener("touchend", onDocumentPress, TOUCH_OPTIONS);
      doc.removeEventListener("touchstart", onTouchStart, TOUCH_OPTIONS);
      doc.removeEventListener("touchmove", onTouchMove, TOUCH_OPTIONS);
    }
    function onTransitionedOut(duration, callback) {
      onTransitionEnd(duration, function() {
        if (!instance.state.isVisible && popper2.parentNode && popper2.parentNode.contains(popper2)) {
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
          updateTransitionEndListener(box, "remove", listener);
          callback();
        }
      }
      if (duration === 0) {
        return callback();
      }
      updateTransitionEndListener(box, "remove", currentTransitionEndListener);
      updateTransitionEndListener(box, "add", listener);
      currentTransitionEndListener = listener;
    }
    function on(eventType, handler, options) {
      if (options === void 0) {
        options = false;
      }
      var nodes = normalizeToArray(instance.props.triggerTarget || reference2);
      nodes.forEach(function(node) {
        node.addEventListener(eventType, handler, options);
        listeners.push({
          node,
          eventType,
          handler,
          options
        });
      });
    }
    function addListeners() {
      if (getIsCustomTouchBehavior()) {
        on("touchstart", onTrigger2, {
          passive: true
        });
        on("touchend", onMouseLeave, {
          passive: true
        });
      }
      splitBySpaces(instance.props.trigger).forEach(function(eventType) {
        if (eventType === "manual") {
          return;
        }
        on(eventType, onTrigger2);
        switch (eventType) {
          case "mouseenter":
            on("mouseleave", onMouseLeave);
            break;
          case "focus":
            on(isIE11 ? "focusout" : "blur", onBlurOrFocusOut);
            break;
          case "focusin":
            on("focusout", onBlurOrFocusOut);
            break;
        }
      });
    }
    function removeListeners() {
      listeners.forEach(function(_ref) {
        var node = _ref.node, eventType = _ref.eventType, handler = _ref.handler, options = _ref.options;
        node.removeEventListener(eventType, handler, options);
      });
      listeners = [];
    }
    function onTrigger2(event) {
      var _lastTriggerEvent;
      var shouldScheduleClickHide = false;
      if (!instance.state.isEnabled || isEventListenerStopped(event) || didHideDueToDocumentMouseDown) {
        return;
      }
      var wasFocused = ((_lastTriggerEvent = lastTriggerEvent) == null ? void 0 : _lastTriggerEvent.type) === "focus";
      lastTriggerEvent = event;
      currentTarget = event.currentTarget;
      handleAriaExpandedAttribute();
      if (!instance.state.isVisible && isMouseEvent(event)) {
        mouseMoveListeners.forEach(function(listener) {
          return listener(event);
        });
      }
      if (event.type === "click" && (instance.props.trigger.indexOf("mouseenter") < 0 || isVisibleFromClick) && instance.props.hideOnClick !== false && instance.state.isVisible) {
        shouldScheduleClickHide = true;
      } else {
        scheduleShow(event);
      }
      if (event.type === "click") {
        isVisibleFromClick = !shouldScheduleClickHide;
      }
      if (shouldScheduleClickHide && !wasFocused) {
        scheduleHide(event);
      }
    }
    function onMouseMove(event) {
      var target = event.target;
      var isCursorOverReferenceOrPopper = getCurrentTarget().contains(target) || popper2.contains(target);
      if (event.type === "mousemove" && isCursorOverReferenceOrPopper) {
        return;
      }
      var popperTreeData = getNestedPopperTree().concat(popper2).map(function(popper22) {
        var _instance$popperInsta;
        var instance2 = popper22._tippy;
        var state2 = (_instance$popperInsta = instance2.popperInstance) == null ? void 0 : _instance$popperInsta.state;
        if (state2) {
          return {
            popperRect: popper22.getBoundingClientRect(),
            popperState: state2,
            props
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
      var shouldBail = isEventListenerStopped(event) || instance.props.trigger.indexOf("click") >= 0 && isVisibleFromClick;
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
      if (instance.props.trigger.indexOf("focusin") < 0 && event.target !== getCurrentTarget()) {
        return;
      }
      if (instance.props.interactive && event.relatedTarget && popper2.contains(event.relatedTarget)) {
        return;
      }
      scheduleHide(event);
    }
    function isEventListenerStopped(event) {
      return currentInput.isTouch ? getIsCustomTouchBehavior() !== event.type.indexOf("touch") >= 0 : false;
    }
    function createPopperInstance() {
      destroyPopperInstance();
      var _instance$props2 = instance.props, popperOptions = _instance$props2.popperOptions, placement = _instance$props2.placement, offset2 = _instance$props2.offset, getReferenceClientRect = _instance$props2.getReferenceClientRect, moveTransition = _instance$props2.moveTransition;
      var arrow2 = getIsDefaultRenderFn() ? getChildren(popper2).arrow : null;
      var computedReference = getReferenceClientRect ? {
        getBoundingClientRect: getReferenceClientRect,
        contextElement: getReferenceClientRect.contextElement || getCurrentTarget()
      } : reference2;
      var tippyModifier = {
        name: "$$tippy",
        enabled: true,
        phase: "beforeWrite",
        requires: ["computeStyles"],
        fn: function fn5(_ref2) {
          var state2 = _ref2.state;
          if (getIsDefaultRenderFn()) {
            var _getDefaultTemplateCh = getDefaultTemplateChildren(), box = _getDefaultTemplateCh.box;
            ["placement", "reference-hidden", "escaped"].forEach(function(attr) {
              if (attr === "placement") {
                box.setAttribute("data-placement", state2.placement);
              } else {
                if (state2.attributes.popper["data-popper-" + attr]) {
                  box.setAttribute("data-" + attr, "");
                } else {
                  box.removeAttribute("data-" + attr);
                }
              }
            });
            state2.attributes.popper = {};
          }
        }
      };
      var modifiers = [{
        name: "offset",
        options: {
          offset: offset2
        }
      }, {
        name: "preventOverflow",
        options: {
          padding: {
            top: 2,
            bottom: 2,
            left: 5,
            right: 5
          }
        }
      }, {
        name: "flip",
        options: {
          padding: 5
        }
      }, {
        name: "computeStyles",
        options: {
          adaptive: !moveTransition
        }
      }, tippyModifier];
      if (getIsDefaultRenderFn() && arrow2) {
        modifiers.push({
          name: "arrow",
          options: {
            element: arrow2,
            padding: 3
          }
        });
      }
      modifiers.push.apply(modifiers, (popperOptions == null ? void 0 : popperOptions.modifiers) || []);
      instance.popperInstance = createPopper(computedReference, popper2, Object.assign({}, popperOptions, {
        placement,
        onFirstUpdate,
        modifiers
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
      var parentNode;
      var node = getCurrentTarget();
      if (instance.props.interactive && appendTo === TIPPY_DEFAULT_APPEND_TO || appendTo === "parent") {
        parentNode = node.parentNode;
      } else {
        parentNode = invokeWithArgsOrReturn(appendTo, [node]);
      }
      if (!parentNode.contains(popper2)) {
        parentNode.appendChild(popper2);
      }
      instance.state.isMounted = true;
      createPopperInstance();
    }
    function getNestedPopperTree() {
      return arrayFrom(popper2.querySelectorAll("[data-tippy-root]"));
    }
    function scheduleShow(event) {
      instance.clearDelayTimeouts();
      if (event) {
        invokeHook("onTrigger", [instance, event]);
      }
      addDocumentPress();
      var delay = getDelay(true);
      var _getNormalizedTouchSe = getNormalizedTouchSettings(), touchValue = _getNormalizedTouchSe[0], touchDelay = _getNormalizedTouchSe[1];
      if (currentInput.isTouch && touchValue === "hold" && touchDelay) {
        delay = touchDelay;
      }
      if (delay) {
        showTimeout = setTimeout(function() {
          instance.show();
        }, delay);
      } else {
        instance.show();
      }
    }
    function scheduleHide(event) {
      instance.clearDelayTimeouts();
      invokeHook("onUntrigger", [instance, event]);
      if (!instance.state.isVisible) {
        removeDocumentPress();
        return;
      }
      if (instance.props.trigger.indexOf("mouseenter") >= 0 && instance.props.trigger.indexOf("click") >= 0 && ["mouseleave", "mousemove"].indexOf(event.type) >= 0 && isVisibleFromClick) {
        return;
      }
      var delay = getDelay(false);
      if (delay) {
        hideTimeout = setTimeout(function() {
          if (instance.state.isVisible) {
            instance.hide();
          }
        }, delay);
      } else {
        scheduleHideAnimationFrame = requestAnimationFrame(function() {
          instance.hide();
        });
      }
    }
    function enable() {
      instance.state.isEnabled = true;
    }
    function disable() {
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
      invokeHook("onBeforeUpdate", [instance, partialProps]);
      removeListeners();
      var prevProps = instance.props;
      var nextProps = evaluateProps(reference2, Object.assign({}, prevProps, removeUndefinedProps(partialProps), {
        ignoreAttributes: true
      }));
      instance.props = nextProps;
      addListeners();
      if (prevProps.interactiveDebounce !== nextProps.interactiveDebounce) {
        cleanupInteractiveMouseListeners();
        debouncedOnMouseMove = debounce(onMouseMove, nextProps.interactiveDebounce);
      }
      if (prevProps.triggerTarget && !nextProps.triggerTarget) {
        normalizeToArray(prevProps.triggerTarget).forEach(function(node) {
          node.removeAttribute("aria-expanded");
        });
      } else if (nextProps.triggerTarget) {
        reference2.removeAttribute("aria-expanded");
      }
      handleAriaExpandedAttribute();
      handleStyles();
      if (onUpdate) {
        onUpdate(prevProps, nextProps);
      }
      if (instance.popperInstance) {
        createPopperInstance();
        getNestedPopperTree().forEach(function(nestedPopper) {
          requestAnimationFrame(nestedPopper._tippy.popperInstance.forceUpdate);
        });
      }
      invokeHook("onAfterUpdate", [instance, partialProps]);
    }
    function setContent2(content) {
      instance.setProps({
        content
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
      }
      if (getCurrentTarget().hasAttribute("disabled")) {
        return;
      }
      invokeHook("onShow", [instance], false);
      if (instance.props.onShow(instance) === false) {
        return;
      }
      instance.state.isVisible = true;
      if (getIsDefaultRenderFn()) {
        popper2.style.visibility = "visible";
      }
      handleStyles();
      addDocumentPress();
      if (!instance.state.isMounted) {
        popper2.style.transition = "none";
      }
      if (getIsDefaultRenderFn()) {
        var _getDefaultTemplateCh2 = getDefaultTemplateChildren(), box = _getDefaultTemplateCh2.box, content = _getDefaultTemplateCh2.content;
        setTransitionDuration([box, content], 0);
      }
      onFirstUpdate = function onFirstUpdate2() {
        var _instance$popperInsta2;
        if (!instance.state.isVisible || ignoreOnFirstUpdate) {
          return;
        }
        ignoreOnFirstUpdate = true;
        void popper2.offsetHeight;
        popper2.style.transition = instance.props.moveTransition;
        if (getIsDefaultRenderFn() && instance.props.animation) {
          var _getDefaultTemplateCh3 = getDefaultTemplateChildren(), _box = _getDefaultTemplateCh3.box, _content = _getDefaultTemplateCh3.content;
          setTransitionDuration([_box, _content], duration);
          setVisibilityState([_box, _content], "visible");
        }
        handleAriaContentAttribute();
        handleAriaExpandedAttribute();
        pushIfUnique(mountedInstances, instance);
        (_instance$popperInsta2 = instance.popperInstance) == null ? void 0 : _instance$popperInsta2.forceUpdate();
        invokeHook("onMount", [instance]);
        if (instance.props.animation && getIsDefaultRenderFn()) {
          onTransitionedIn(duration, function() {
            instance.state.isShown = true;
            invokeHook("onShown", [instance]);
          });
        }
      };
      mount();
    }
    function hide2() {
      var isAlreadyHidden = !instance.state.isVisible;
      var isDestroyed = instance.state.isDestroyed;
      var isDisabled = !instance.state.isEnabled;
      var duration = getValueAtIndexOrReturn(instance.props.duration, 1, defaultProps.duration);
      if (isAlreadyHidden || isDestroyed || isDisabled) {
        return;
      }
      invokeHook("onHide", [instance], false);
      if (instance.props.onHide(instance) === false) {
        return;
      }
      instance.state.isVisible = false;
      instance.state.isShown = false;
      ignoreOnFirstUpdate = false;
      isVisibleFromClick = false;
      if (getIsDefaultRenderFn()) {
        popper2.style.visibility = "hidden";
      }
      cleanupInteractiveMouseListeners();
      removeDocumentPress();
      handleStyles(true);
      if (getIsDefaultRenderFn()) {
        var _getDefaultTemplateCh4 = getDefaultTemplateChildren(), box = _getDefaultTemplateCh4.box, content = _getDefaultTemplateCh4.content;
        if (instance.props.animation) {
          setTransitionDuration([box, content], duration);
          setVisibilityState([box, content], "hidden");
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
      getDocument().addEventListener("mousemove", debouncedOnMouseMove);
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
      destroyPopperInstance();
      getNestedPopperTree().forEach(function(nestedPopper) {
        nestedPopper._tippy.unmount();
      });
      if (popper2.parentNode) {
        popper2.parentNode.removeChild(popper2);
      }
      mountedInstances = mountedInstances.filter(function(i) {
        return i !== instance;
      });
      instance.state.isMounted = false;
      invokeHook("onHidden", [instance]);
    }
    function destroy() {
      if (instance.state.isDestroyed) {
        return;
      }
      instance.clearDelayTimeouts();
      instance.unmount();
      removeListeners();
      delete reference2._tippy;
      instance.state.isDestroyed = true;
      invokeHook("onDestroy", [instance]);
    }
  }
  function tippy(targets, optionalProps) {
    if (optionalProps === void 0) {
      optionalProps = {};
    }
    var plugins = defaultProps.plugins.concat(optionalProps.plugins || []);
    bindGlobalEventListeners();
    var passedProps = Object.assign({}, optionalProps, {
      plugins
    });
    var elements = getArrayOfElements(targets);
    var instances = elements.reduce(function(acc, reference2) {
      var instance = reference2 && createTippy(reference2, passedProps);
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
  Object.assign({}, applyStyles$1, {
    effect: function effect2(_ref) {
      var state = _ref.state;
      var initialStyles = {
        popper: {
          position: state.options.strategy,
          left: "0",
          top: "0",
          margin: "0"
        },
        arrow: {
          position: "absolute"
        },
        reference: {}
      };
      Object.assign(state.elements.popper.style, initialStyles.popper);
      state.styles = initialStyles;
      if (state.elements.arrow) {
        Object.assign(state.elements.arrow.style, initialStyles.arrow);
      }
    }
  });
  tippy.setDefaultProps({
    render
  });
  const tooltipStyles = 'h1,h2,div,p,span,ol,ul,li,a,button,svg,strong,kbd,code{all:unset;box-sizing:border-box!important}div{display:block}:before,:after{all:unset}.tippy-box[data-animation=fade][data-state=hidden]{opacity:0}[data-tippy-root]{max-width:calc(100vw - 10px)}@media (forced-colors:active){[data-tippy-root]{border:2px solid #0000;border-radius:5px}}.tippy-arrow{color:#333;width:16px;height:16px}.tippy-arrow:before{content:"";border-style:solid;border-color:#0000;position:absolute}.tippy-box[data-placement^=top] .tippy-arrow{bottom:0}.tippy-box[data-placement^=top] .tippy-arrow:before{border-width:8px 8px 0;border-top-color:initial;transform-origin:top;bottom:-7px;left:0}.tippy-box[data-placement^=bottom] .tippy-arrow{top:0}.tippy-box[data-placement^=bottom] .tippy-arrow:before{border-width:0 8px 8px;border-bottom-color:initial;transform-origin:bottom;top:-7px;left:0}.tippy-box[data-placement^=left] .tippy-arrow{right:0}.tippy-box[data-placement^=left] .tippy-arrow:before{border-width:8px 0 8px 8px;border-left-color:initial;transform-origin:0;right:-7px}.tippy-box[data-placement^=right] .tippy-arrow{left:0}.tippy-box[data-placement^=right] .tippy-arrow:before{border-width:8px 8px 8px 0;border-right-color:initial;transform-origin:100%;left:-7px}.tippy-content{z-index:1;padding:5px 9px;position:relative}.tippy-box[data-theme~=sa11y-theme][role=tooltip]{box-sizing:border-box!important}.tippy-box[data-theme~=sa11y-theme][role=tooltip][data-animation=fade][data-state=hidden]{opacity:0}.tippy-box[data-theme~=sa11y-theme][role=tooltip][data-inertia][data-state=visible]{transition-timing-function:cubic-bezier(.54,1.5,.38,1.11)}[role=dialog]{text-align:start;word-wrap:break-word;min-width:300px}[role=tooltip]{text-align:center;min-width:185px}.tippy-box[data-theme~=sa11y-panel]{border:1px solid var(--sa11y-panel-bg-splitter);box-shadow:var(--sa11y-box-shadow)}.tippy-box[data-theme~=sa11y-theme]:not([data-theme~=sa11y-panel]){box-shadow:0 0 20px 4px #9aa1b126,0 4px 80px -8px #24282f40,0 4px 4px -2px #5b5e6926!important}.tippy-box[data-theme~=sa11y-theme]{font-family:var(--sa11y-font-face);font-size:var(--sa11y-normal-text);color:var(--sa11y-panel-primary);letter-spacing:normal;background-color:var(--sa11y-panel-bg);-webkit-font-smoothing:auto;border-radius:4px;outline:0;padding:8px;font-weight:400;line-height:22px;transition-property:transform,visibility,opacity;display:block;position:relative}.tippy-box[data-theme~=sa11y-theme] pre code{white-space:pre-wrap;display:block;overflow:auto}.tippy-box[data-theme~=sa11y-theme] code{font-family:monospace;font-size:calc(var(--sa11y-normal-text) - 1px);font-weight:500}.tippy-box[data-theme~=sa11y-theme] pre,.tippy-box[data-theme~=sa11y-theme] code,.tippy-box[data-theme~=sa11y-theme] kbd{color:var(--sa11y-panel-primary);letter-spacing:normal;background-color:var(--sa11y-panel-badge);-webkit-font-smoothing:auto;border-radius:3.2px;padding:1.6px 4.8px;line-height:22px}.tippy-box[data-theme~=sa11y-theme] .tippy-content{padding:5px 9px}.tippy-box[data-theme~=sa11y-theme] sub,.tippy-box[data-theme~=sa11y-theme] sup{font-size:var(--sa11y-small-text)}.tippy-box[data-theme~=sa11y-theme] ul{margin:0;margin-block:0;padding:0;position:relative}.tippy-box[data-theme~=sa11y-theme] li{margin:5px 10px 0 20px;padding-bottom:5px;display:list-item}.tippy-box[data-theme~=sa11y-theme] a{color:var(--sa11y-hyperlink);cursor:pointer;font-weight:500;text-decoration:underline}.tippy-box[data-theme~=sa11y-theme] a:hover,.tippy-box[data-theme~=sa11y-theme] a:focus{text-decoration:none}.tippy-box[data-theme~=sa11y-theme] strong{font-weight:600}.tippy-box[data-theme~=sa11y-theme] hr{background:var(--sa11y-panel-bg-splitter);opacity:1;border:none;height:1px;margin:10px 0;padding:0}.tippy-box[data-theme~=sa11y-theme] button.close-btn{margin-inline-start:10px;margin-bottom:10px}.tippy-box[data-theme~=sa11y-theme] button#suggest-size,.tippy-box[data-theme~=sa11y-theme] button#suggest{cursor:pointer;padding:.2rem;transition:background-color .2s,color .2s;position:relative}:is(.tippy-box[data-theme~=sa11y-theme] button#suggest-size,.tippy-box[data-theme~=sa11y-theme] button#suggest):after{content:"";position:absolute;inset:-10px -5px -14px}:is(.tippy-box[data-theme~=sa11y-theme] button#suggest-size,.tippy-box[data-theme~=sa11y-theme] button#suggest):hover,:is(.tippy-box[data-theme~=sa11y-theme] button#suggest-size,.tippy-box[data-theme~=sa11y-theme] button#suggest):focus-visible{color:#000!important;background-color:#fff!important}.tippy-box[data-theme~=sa11y-theme] .dismiss-group{margin-top:5px}.tippy-box[data-theme~=sa11y-theme] .dismiss-group button{margin:10px 5px 5px 0;color:var(--sa11y-panel-primary);cursor:pointer;background:var(--sa11y-panel-bg-secondary);border:2px solid var(--sa11y-button-outline);border-radius:5px;margin-inline-end:15px;padding:4px 8px;display:inline-block}.tippy-box[data-theme~=sa11y-theme] .dismiss-group button:hover,.tippy-box[data-theme~=sa11y-theme] .dismiss-group button:focus{background:var(--sa11y-shortcut-hover)}.tippy-box[data-theme~=sa11y-theme] .good-icon{background:var(--sa11y-good-text);width:14px;height:14px;-webkit-mask:var(--sa11y-good-svg)center no-repeat;mask:var(--sa11y-good-svg)center no-repeat;margin-bottom:-2.5px;display:inline-block}.tippy-box[data-theme~=sa11y-theme] .link-icon{background:var(--sa11y-panel-primary);width:16px;height:16px;-webkit-mask:var(--sa11y-link-icon-svg)center no-repeat;mask:var(--sa11y-link-icon-svg)center no-repeat;margin-bottom:-3.5px;display:inline-block}.tippy-box[data-theme~=sa11y-theme] .error .badge{color:var(--sa11y-error-text);background:var(--sa11y-error)}.tippy-box[data-theme~=sa11y-theme] .error .colour{color:var(--sa11y-red-text)}.tippy-box[data-theme~=sa11y-theme] .error .link-icon{background:var(--sa11y-error-text)}.tippy-box[data-theme~=sa11y-theme] .warning .badge{color:var(--sa11y-panel-bg);background:var(--sa11y-yellow-text)}.tippy-box[data-theme~=sa11y-theme] .warning .colour{color:var(--sa11y-yellow-text)}.tippy-box[data-theme~=sa11y-theme] .warning .link-icon{background:var(--sa11y-panel-bg)}.tippy-box[data-theme~=sa11y-theme][data-placement^=top] .tippy-arrow:before{border-top-color:var(--sa11y-panel-bg)}.tippy-box[data-theme~=sa11y-theme][data-placement^=bottom] .tippy-arrow:before{border-bottom-color:var(--sa11y-panel-bg)}.tippy-box[data-theme~=sa11y-theme][data-placement^=left] .tippy-arrow:before{border-left-color:var(--sa11y-panel-bg)}.tippy-box[data-theme~=sa11y-theme][data-placement^=right] .tippy-arrow:before{border-right-color:var(--sa11y-panel-bg)}@media (forced-colors:active){.tippy-box[data-theme~=sa11y-theme][data-placement^=top] .tippy-arrow:before,.tippy-box[data-theme~=sa11y-theme][data-placement^=bottom] .tippy-arrow:before,.tippy-box[data-theme~=sa11y-theme][data-placement^=left] .tippy-arrow:before,.tippy-box[data-theme~=sa11y-theme][data-placement^=right] .tippy-arrow:before{forced-color-adjust:none}.tippy-box[data-theme~=sa11y-theme] .tippy-arrow{z-index:-1}}.tippy-box[data-theme~=sa11y-theme] a:focus,.tippy-box[data-theme~=sa11y-theme] input:focus,.tippy-box[data-theme~=sa11y-theme] button:focus,.tippy-box[data-theme~=sa11y-theme] button:active,.tippy-box[data-theme~=sa11y-theme] [tabindex="-1"]:focus{box-shadow:0 0 0 5px var(--sa11y-focus-color);outline:0}.tippy-box[data-theme~=sa11y-theme] input:focus:not(:focus-visible),.tippy-box[data-theme~=sa11y-theme] a:focus:not(:focus-visible),.tippy-box[data-theme~=sa11y-theme] button:focus:not(:focus-visible),.tippy-box[data-theme~=sa11y-theme] [tabindex="-1"]:focus:not(:focus-visible){box-shadow:none;outline:0}.tippy-box[data-theme~=sa11y-theme] a:focus-visible,.tippy-box[data-theme~=sa11y-theme] button:focus-visible,.tippy-box[data-theme~=sa11y-theme] input:focus-visible,.tippy-box[data-theme~=sa11y-theme] [tabindex="-1"]:focus-visible{box-shadow:0 0 0 5px var(--sa11y-focus-color);outline:0}@media screen and (forced-colors:active){.tippy-box[data-theme~=sa11y-theme] .error-icon,.tippy-box[data-theme~=sa11y-theme] .link-icon,.tippy-box[data-theme~=sa11y-theme] .hidden-icon{filter:invert()}.tippy-box[data-theme~=sa11y-theme] a:focus,.tippy-box[data-theme~=sa11y-theme] button:focus,.tippy-box[data-theme~=sa11y-theme] [tabindex="-1"]:focus{outline:3px solid #0000!important}}';
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
  function convertToRGBA(color, opacity) {
    const colorString = color;
    let r;
    let g;
    let b;
    let a = 1;
    if (!colorString.startsWith("rgb")) {
      if (colorString.startsWith("color(rec2020") || colorString.startsWith("color(display-p3") || colorString.startsWith("url(")) {
        return "unsupported";
      }
      const canvas = document.createElement("canvas");
      const context = canvas.getContext("2d");
      context.fillStyle = colorString;
      context.fillRect(0, 0, 1, 1);
      const imageData = context.getImageData(0, 0, 1, 1);
      [r, g, b, a] = imageData.data;
      a = (a / 255).toFixed(2);
    } else {
      const rgbaArray = colorString.match(/[\d.]+/g).map(Number);
      [r, g, b, a] = rgbaArray.length === 4 ? rgbaArray : [...rgbaArray, 1];
    }
    if (opacity && opacity < 1) {
      a = (a * opacity).toFixed(2);
    }
    return [r, g, b, Number(a)];
  }
  function getBackground($el, shadowDetection) {
    let targetEl = $el;
    while (targetEl && targetEl.nodeType === 1) {
      if (shadowDetection) {
        const root = targetEl.getRootNode();
        if (root instanceof ShadowRoot) {
          let node = targetEl;
          while (node && node !== root.host) {
            const styles3 = getComputedStyle(node);
            if (styles3.backgroundImage && styles3.backgroundImage !== "none") {
              return { type: "image", value: styles3.backgroundImage };
            }
            const bgColor2 = convertToRGBA(styles3.backgroundColor);
            if (bgColor2[3] !== 0 && bgColor2 !== "transparent") {
              return bgColor2;
            }
            node = node.parentElement;
          }
          return getBackground(root.host);
        }
      }
      const styles2 = getComputedStyle(targetEl);
      const bgImage = styles2.backgroundImage;
      if (bgImage !== "none") {
        return { type: "image", value: bgImage };
      }
      const bgColor = convertToRGBA(styles2.backgroundColor);
      if (bgColor[3] !== 0 && bgColor !== "transparent") {
        if (bgColor[3] < 1) {
          let parentEl = targetEl.parentElement;
          let parentBgColor = "rgba(255, 255, 255, 1)";
          while (parentEl && parentEl.nodeType === 1) {
            const parentStyles = getComputedStyle(parentEl);
            parentBgColor = parentStyles.backgroundColor;
            if (parentBgColor !== "rgba(0, 0, 0, 0)") {
              break;
            }
            if (parentBgColor === "rgba(0, 0, 0, 0)" && parentEl.tagName === "HTML") {
              parentBgColor = "rgba(255, 255, 255, 1)";
            }
            parentEl = parentEl.parentElement;
          }
          const parentColor = convertToRGBA(parentBgColor || "rgba(255, 255, 255, 1)");
          const blendedBG = alphaBlend(bgColor, parentColor);
          return blendedBG;
        }
        return bgColor;
      }
      if (targetEl.tagName === "HTML") {
        return [255, 255, 255];
      }
      targetEl = targetEl.parentNode;
    }
    return [255, 255, 255];
  }
  function getLuminance(color) {
    const rgb = color.slice(0, 3).map((x) => {
      const normalized = x / 255;
      return normalized <= 0.03928 ? normalized / 12.92 : ((normalized + 0.055) / 1.055) ** 2.4;
    });
    return 0.2126 * rgb[0] + 0.7152 * rgb[1] + 0.0722 * rgb[2];
  }
  function getAPCAValue(color, bg) {
    const blendedColor = alphaBlend(color, bg).slice(0, 4);
    const foreground = sRGBtoY(blendedColor);
    const background = sRGBtoY(bg);
    const ratio = APCAcontrast(foreground, background);
    return { ratio, blendedColor };
  }
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
  function calculateContrast(color, bg, contrastAlgorithm) {
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
  }
  function suggestColorWCAG(color, background, isLargeText, contrastAlgorithm) {
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
  }
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
  function suggestColorAPCA(color, background, fontWeight, fontSize) {
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
  }
  function wcagAlgorithm($el, color, background, fontSize, fontWeight, opacity, contrastAlgorithm) {
    const { ratio, blendedColor } = calculateContrast(color, background);
    const isLargeText = fontSize >= 24 || fontSize >= 18.67 && fontWeight >= 700;
    let hasLowContrast;
    if (contrastAlgorithm === "AAA") {
      hasLowContrast = isLargeText ? ratio < 4.5 : ratio < 7;
    } else {
      const hasLowContrastNormalText = ratio > 1 && ratio < 4.5;
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
        textUnderline: getComputedStyle($el).textDecorationLine
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
        textUnderline: getComputedStyle($el).textDecorationLine
      };
    }
    return null;
  }
  function checkElementContrast($el, color, background, fontSize, fontWeight, opacity, contrastAlgorithm) {
    const algorithm = contrastAlgorithm === "APCA" ? apcaAlgorithm : wcagAlgorithm;
    return algorithm($el, color, background, fontSize, fontWeight, opacity, contrastAlgorithm);
  }
  function generateContrastTools(contrastDetails) {
    const { sanitizedText, color, background, fontWeight, fontSize, ratio, textUnderline } = contrastDetails;
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
      <div id="contrast-preview" style="color:${foregroundHex};${hasBackgroundColor ? `background:${backgroundHex};` : ""}${hasFontWeight + hasFontSize + textDecoration}">${sanitizedText}</div>
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
      const computed = getComputedStyle(contrastPreview).fontSize;
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
        const el = container.querySelector(id);
        if (!el) return;
        el.addEventListener("click", () => {
          action(el.textContent);
          updatePreview();
          navigator.clipboard.writeText(el.textContent).catch(() => {
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
    let adviceContainer;
    const { color, background, fontWeight, fontSize, isLargeText, type } = contrastDetails;
    if (color && background && background.type !== "image" && (type === "text" || type === "svg-error" || type === "input")) {
      const suggested = Constants.Global.contrastAlgorithm === "APCA" ? suggestColorAPCA(color, background, fontWeight, fontSize) : suggestColorWCAG(
        color,
        background,
        isLargeText,
        Constants.Global.contrastAlgorithm
      );
      let advice;
      const hr = '<hr aria-hidden="true">';
      const bgHex = getHex(contrastDetails.background);
      const style = `color:${suggested.color};background-color:${bgHex};`;
      const colorBadge = `<button id="suggest" class="badge" style="${style}">${suggested.color}</button>`;
      const sizeBadge = `<button id="suggest-size" class="normal-badge">${suggested.size}px</button>`;
      if (Constants.Global.contrastAlgorithm === "AA" || Constants.Global.contrastAlgorithm === "AAA") {
        if (suggested.color === null) {
          advice = `${hr} ${Lang._("NO_SUGGESTION")}`;
        } else {
          advice = `${hr} ${Lang._("CONTRAST_COLOR")} ${colorBadge}`;
        }
      } else if (suggested.color && suggested.size) {
        advice = `${hr} ${Lang._("CONTRAST_APCA")} ${colorBadge} ${sizeBadge}`;
      } else if (suggested.color) {
        advice = `${hr} ${Lang._("CONTRAST_COLOR")} ${colorBadge}`;
      } else if (suggested.size) {
        advice = `${hr} ${Lang._("CONTRAST_SIZE")} ${sizeBadge}`;
      }
      adviceContainer = document.createElement("div");
      adviceContainer.id = "advice";
      const suggestion = contrastDetails.opacity < 1 ? `<hr aria-hidden="true"> ${Lang.sprintf("CONTRAST_OPACITY")}` : advice;
      adviceContainer.innerHTML = suggestion;
    }
    return adviceContainer;
  }
  const annotationStyles = '.annotation{display:block;position:relative}.annotation-inline{text-align:end;display:inline-block;position:relative}button{cursor:pointer;border-radius:50%;width:36px;height:36px;padding:0;transition:all .2s ease-in-out;display:block;position:absolute;box-shadow:0 0 16px #0000004f}button:after{content:"";width:36px;height:36px;padding:7px;position:absolute;top:-7px;left:-7px}.error-btn{z-index:9999;background:50% 50% var(--sa11y-error-svg)no-repeat;background-color:var(--sa11y-error);border:1px solid var(--sa11y-error);background-size:22px}.error-btn:hover,.error-btn:focus{background-color:var(--sa11y-error-hover)}.good-btn{z-index:9977;background:50% 50% var(--sa11y-good)var(--sa11y-good-svg)no-repeat;background-color:var(--sa11y-good);border:1px solid var(--sa11y-good);background-size:20px}.good-btn:hover,.good-btn:focus{background-color:var(--sa11y-good-hover)}.warning-btn{z-index:9988;background:50% 50% var(--sa11y-warning)var(--sa11y-warning-svg)no-repeat;background-color:var(--sa11y-warning);border:1px solid var(--sa11y-warning);transform:scaleX(var(--sa11y-icon-direction));background-size:24px}.warning-btn:hover,.warning-btn:focus{background-color:var(--sa11y-warning-hover)}button:active,button:focus{box-shadow:0 0 0 5px var(--sa11y-focus-color);outline:0}@media screen and (forced-colors:active){button{forced-color-adjust:none;border:1px solid #0000!important;outline:3px solid #0000!important}}';
  class Annotations extends HTMLElement {
    connectedCallback() {
      if (this.shadowRoot) {
        return;
      }
      const shadow = this.attachShadow({ mode: "open" });
      const style = document.createElement("style");
      style.innerHTML = annotationStyles + sharedStyles;
      shadow.appendChild(style);
    }
  }
  const annotationButtons = [];
  function annotate(issue, option) {
    const {
      element,
      type,
      content,
      inline = false,
      position = "beforebegin",
      id,
      dismiss,
      dismissAll,
      contrastDetails,
      margin
    } = issue;
    const validTypes = ["error", "warning", "good"];
    if (!type && !element) {
      return;
    }
    if (validTypes.indexOf(type) === -1) {
      throw Error(`Invalid type [${type}] for annotation`);
    }
    const ariaLabel = {
      [validTypes[0]]: Lang._("ERROR"),
      [validTypes[1]]: Lang._("WARNING"),
      [validTypes[2]]: Lang._("GOOD")
    };
    const dismissBtn = option.dismissAnnotations && (type === "warning" || type === "good") && dismiss ? `<button data-sa11y-dismiss='${id}' type='button'>${Lang._("DISMISS")}</button>` : "";
    if (element) {
      if (type === "good") {
        if (!option.showGoodImageButton && element?.tagName === "IMG") {
          return;
        }
        if (!option.showGoodLinkButton && element?.tagName === "A") {
          return;
        }
      }
      const tag = {
        [validTypes[0]]: "data-sa11y-error",
        [validTypes[1]]: "data-sa11y-warning",
        [validTypes[2]]: "data-sa11y-good"
      };
      [type].forEach(($el) => {
        if (tag[$el]) {
          element.setAttribute(tag[$el], "");
        }
      });
      const annotation = document.createElement("sa11y-annotation");
      annotation.setAttribute("data-sa11y-annotation", id);
      if (supportsAnchorPositioning()) {
        annotation.style.position = "absolute";
        annotation.style.positionAnchor = `--sa11y-anchor-${id}`;
        annotation.style.top = "anchor(top)";
        annotation.style.left = "anchor(left)";
        const existing = element.style.anchorName;
        element.style.anchorName = existing ? `${existing}, --sa11y-anchor-${id}` : `--sa11y-anchor-${id}`;
      }
      const dismissAllBtn = option.dismissAnnotations && option.dismissAll && typeof dismissAll === "string" && (type === "warning" || type === "good") ? `<button data-sa11y-dismiss='${id}' data-sa11y-dismiss-all type='button'>${Lang._("DISMISS_ALL")}</button>` : "";
      const buttonWrapper = document.createElement("div");
      buttonWrapper.classList.add(inline ? "annotation-inline" : "annotation");
      const button = document.createElement("button");
      button.type = "button";
      button.className = `${type}-btn`;
      button.setAttribute("aria-label", ariaLabel[type]);
      button.setAttribute("aria-haspopup", "dialog");
      button.style.margin = `${inline ? "-10px" : ""} ${margin}`;
      button.dataset.tippyContent = `<div lang='${Lang._("LANG_CODE")}' class='${type}'><button type='button' class='close-btn close-tooltip' aria-label='${Lang._("ALERT_CLOSE")}'></button><h2>${ariaLabel[type]}</h2> ${content} ${contrastDetails ? "<div data-sa11y-contrast-details></div>" : ""} <div class='dismiss-group'>${dismissBtn}${dismissAllBtn}</div></div>`;
      buttonWrapper.appendChild(button);
      annotationButtons.push(button);
      const insertBefore = option.insertAnnotationBefore ? `, ${option.insertAnnotationBefore}` : "";
      const location = element.closest(`a, button, [role="link"], [role="button"] ${insertBefore}`) || element;
      location.insertAdjacentElement(position, annotation);
      annotation.shadowRoot.appendChild(buttonWrapper);
      const ignoredElements = option.ignoreHiddenOverflow ? option.ignoreHiddenOverflow.split(",").flatMap((selector) => [...document.querySelectorAll(selector)]) : [];
      const parent = findVisibleParent(element, "overflow", "hidden");
      if (parent && !ignoredElements.includes(parent)) {
        parent.setAttribute("data-sa11y-overflow", "");
      }
    } else {
      const listItem = document.createElement("li");
      listItem.innerHTML = `<h3>${ariaLabel[type]}</h3> ${content}${dismissBtn}`;
      Constants.Panel.pageIssuesList.insertAdjacentElement("afterbegin", listItem);
      Constants.Panel.pageIssues.classList.add("active");
      Constants.Panel.panel.classList.add("has-page-issues");
    }
  }
  class AnnotationTooltips extends HTMLElement {
    connectedCallback() {
      const shadowRoot = this.attachShadow({ mode: "open" });
      const style = document.createElement("style");
      style.innerHTML = tooltipStyles + sharedStyles;
      shadowRoot.appendChild(style);
      const annotations = tippy(annotationButtons, {
        interactive: true,
        trigger: "mouseenter click",
        hideOnClick: false,
        arrow: true,
        offset: [0, 8],
        delay: [0, 400],
        maxWidth: 375,
        theme: "sa11y-theme",
        placement: "auto-start",
        allowHTML: true,
        role: "dialog",
        aria: {
          content: null,
          expanded: "auto"
        },
        appendTo: shadowRoot,
        zIndex: 2147483645,
        onShow(instance) {
          annotations.forEach((popper2) => {
            if (popper2 !== instance.popper) {
              popper2.hide();
            }
          });
          const annotation = instance.reference.getRootNode().host;
          annotation.setAttribute("data-sa11y-opened", "");
          const closeButton = instance.popper.querySelector(".close-btn");
          const closeButtonHandler = () => {
            instance.hide();
            instance.reference.focus();
          };
          closeButton.addEventListener("click", closeButtonHandler);
          const escapeListener = (event) => {
            if (event.key === "Escape") {
              instance.hide();
              instance.reference.focus();
            }
          };
          instance.popper.addEventListener("keydown", escapeListener);
          if (!instance.popper.hasAttribute("contrast-tools-initialized")) {
            const issueID = parseInt(annotation.getAttribute("data-sa11y-annotation"), 10);
            const issueObject = window.sa11yCheckComplete.results.find(
              (issue) => issue.id === issueID
            );
            const { contrastDetails } = issueObject || {};
            if (contrastDetails) {
              const container = instance.popper.querySelector("[data-sa11y-contrast-details]");
              const tools = generateContrastTools(contrastDetails);
              container.appendChild(tools);
              initializeContrastTools(instance.popper, contrastDetails);
              const suggestion = generateColorSuggestion(contrastDetails);
              if (suggestion) {
                container.appendChild(suggestion);
              }
              instance.popper.setAttribute("contrast-tools-initialized", true);
            }
          }
          let firstClick = true;
          function handleMouseDown(event) {
            if (firstClick && event.target.matches('input[type="color"]')) {
              instance.reference.click();
              firstClick = false;
              instance.popper.removeEventListener("mousedown", handleMouseDown);
            }
          }
          instance.popper.addEventListener("mousedown", handleMouseDown);
          const onHiddenTooltip = () => {
            closeButton.removeEventListener("click", closeButtonHandler);
            instance.popper.removeEventListener("keydown", escapeListener);
            instance.popper.removeEventListener("hidden", onHiddenTooltip);
          };
          instance.popper.addEventListener("hidden", onHiddenTooltip);
        },
        onTrigger(instance, event) {
          if (event.type === "click") {
            setTimeout(() => {
              instance.popper.querySelector(".close-btn").focus();
              trapFocus(instance.popper);
            }, 0);
          }
        },
        onHide(instance) {
          instance.popper.querySelector(".close-btn").removeEventListener("click", () => {
            instance.hide();
          });
          const annotation = instance.reference.getRootNode().host;
          annotation.removeAttribute("data-sa11y-opened");
        }
      });
    }
  }
  class PanelTooltips extends HTMLElement {
    connectedCallback() {
      const tooltipOptions = (shadowRoot2) => ({
        allowHTML: true,
        delay: [500, 0],
        trigger: "mouseenter focusin",
        arrow: true,
        placement: "top",
        theme: "sa11y-theme sa11y-panel",
        role: "tooltip",
        aria: {
          content: null,
          expanded: null
        },
        appendTo: shadowRoot2,
        zIndex: 2147483645
      });
      const shadowRoot = this.attachShadow({ mode: "open" });
      const style = document.createElement("style");
      style.innerHTML = tooltipStyles + sharedStyles;
      shadowRoot.appendChild(style);
      const keyboardShortcut2 = navigator.userAgent.indexOf("Mac") !== -1 ? '<span class="kbd">Option</span> + <span class="kbd">S</span>' : '<span class="kbd">Alt</span> + <span class="kbd">S</span>';
      tippy(Constants.Panel.skipButton, {
        ...tooltipOptions(shadowRoot),
        offset: [0, 8],
        maxWidth: 200,
        content: `${Lang._("SKIP_TO_ISSUE")} &raquo; <br> ${keyboardShortcut2}`
      });
      this.object = tippy(Constants.Panel.dismissButton, {
        offset: [0, 8],
        maxWidth: 200,
        ...tooltipOptions(shadowRoot)
      });
      if (Constants.Global.developerPlugin) {
        const infoIcon = Constants.Panel.developerItem?.querySelector(".info-icon");
        if (infoIcon) {
          tippy(infoIcon, {
            ...tooltipOptions(shadowRoot),
            triggerTarget: [Constants.Panel.developerItem],
            offset: [0, 10],
            maxWidth: 250,
            content: Lang._("DEVELOPER_DESC")
          });
        }
      }
      if (Constants.Global.readabilityPlugin) {
        const infoIcon = Constants.Panel.readabilityItem?.querySelector(".info-icon");
        if (infoIcon) {
          tippy(infoIcon, {
            ...tooltipOptions(shadowRoot),
            triggerTarget: [Constants.Panel.readabilityItem],
            offset: [0, 10],
            maxWidth: 250,
            content: Lang._("READABILITY_DESC")
          });
        }
      }
    }
  }
  class HeadingAnchor extends HTMLElement {
    connectedCallback() {
      this.attachShadow({ mode: "open" });
    }
  }
  class HeadingLabel extends HTMLElement {
    connectedCallback() {
      const shadow = this.attachShadow({ mode: "open" });
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
      shadow.appendChild(style);
    }
  }
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
    const offsetTopPosition = $el.offsetTop;
    if (offsetTopPosition === 0) {
      const annotationHost = $el.getRootNode().host;
      const visiblePosition = findVisibleParent(annotationHost, "display", "none");
      const annotationIndex = parseInt(annotationHost.getAttribute("data-sa11y-annotation"), 10);
      const issueObject = results.find((issue) => issue.id === annotationIndex);
      const elementPreview = generateElementPreview(issueObject);
      getHiddenParent($el);
      const tooltip = $el.getAttribute("data-tippy-content");
      createAlert(`${Lang._("NOT_VISIBLE")}`, tooltip, elementPreview);
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
    if (button.offsetTop !== 0) {
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
    if (button.offsetTop !== 0) {
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
  function skipToIssue(results) {
    keyboardShortcutHandler = (e) => {
      keyboardShortcut(e, results);
    };
    handleSkipButtonHandler = () => {
      goToNext(results);
    };
    document.addEventListener("keydown", keyboardShortcutHandler);
    Constants.Panel.skipButton.addEventListener("click", handleSkipButtonHandler);
  }
  function removeSkipBtnListeners() {
    document.removeEventListener("keydown", keyboardShortcutHandler);
    Constants.Panel.skipButton.removeEventListener("click", handleSkipButtonHandler);
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
  function checkImages(results, option) {
    const susAltWords = option.susAltStopWords ? option.susAltStopWords.split(",").map((word) => word.trim().toLowerCase()).filter(Boolean) : Lang._("SUS_ALT_STOPWORDS");
    const placeholderAltSet = new Set(Lang._("PLACEHOLDER_ALT_STOPWORDS"));
    const altPlaceholderPattern = generateRegexString(option.altPlaceholder, true);
    const linkIgnoreStringPattern = generateRegexString(option.linkIgnoreStrings);
    const extraPlaceholderStopWords = option.extraPlaceholderStopWords.split(",").map((word) => word.trim().toLowerCase()).filter(Boolean);
    const containsAltTextStopWords = (alt) => {
      const altLowerCase = alt.toLowerCase();
      const altNoNumbers = altLowerCase.replace(/\d+/g, "").trim();
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
      if (placeholderAltSet.has(altLowerCase) || placeholderAltSet.has(altNoNumbers)) {
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
      const alt = computeAriaLabel($el) === "noAria" ? $el.getAttribute("alt") : computeAriaLabel($el);
      const ariaHidden = $el?.getAttribute("aria-hidden") === "true";
      const presentationRole = $el?.getAttribute("role") === "presentation";
      if ($el.height < 2 && $el.width < 2 && (isElementHidden($el) || alt === "")) {
        return;
      }
      const link = $el.closest(
        option.imageWithinLightbox ? `a[href]:not(${option.imageWithinLightbox})` : "a[href]"
      );
      const src = $el.getAttribute("src") ? $el.getAttribute("src") : $el.getAttribute("srcset");
      const linkText = link ? fnIgnore(link, Constants.Exclusions.LinkSpan).textContent.replace(
        linkIgnoreStringPattern,
        ""
      ) : "";
      const linkTextLength = removeWhitespace(linkText).length;
      if (link && link.getAttribute("aria-hidden") === "true") {
        const unfocusable = link.getAttribute("tabindex") === "-1";
        if (option.checks.HIDDEN_FOCUSABLE && !unfocusable) {
          results.push({
            test: "HIDDEN_FOCUSABLE",
            element: $el,
            type: option.checks.HIDDEN_FOCUSABLE.type || "error",
            content: Lang.sprintf(option.checks.HIDDEN_FOCUSABLE.content || "HIDDEN_FOCUSABLE"),
            dismiss: prepareDismissal(`IMGHIDDENFOCUSABLE${src}`),
            dismissAll: option.checks.HIDDEN_FOCUSABLE.dismissAll ? "LINK_HIDDEN_FOCUSABLE" : false,
            developer: option.checks.HIDDEN_FOCUSABLE.developer || true
          });
        }
        return;
      }
      if (alt === null) {
        if (link) {
          const hasAriaHiddenOrPresentationRole = linkTextLength > 0 && (ariaHidden || presentationRole);
          if (!hasAriaHiddenOrPresentationRole) {
            const rule = linkTextLength === 0 ? option.checks.MISSING_ALT_LINK : option.checks.MISSING_ALT_LINK_HAS_TEXT;
            const conditional = linkTextLength === 0 ? "MISSING_ALT_LINK" : "MISSING_ALT_LINK_HAS_TEXT";
            if (rule) {
              results.push({
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
        } else if (option.checks.MISSING_ALT) {
          results.push({
            test: "MISSING_ALT",
            element: $el,
            type: option.checks.MISSING_ALT.type || "error",
            content: Lang.sprintf(option.checks.MISSING_ALT.content || "MISSING_ALT"),
            dismiss: prepareDismissal(`IMGNOALT${src}`),
            dismissAll: option.checks.MISSING_ALT.dismissAll ? "MISSING_ALT" : false,
            developer: option.checks.MISSING_ALT.developer || false
          });
        }
        return;
      }
      const sanitizedAlt = sanitizeHTML(alt);
      const altText = removeWhitespace(sanitizedAlt);
      const hasAria = $el.getAttribute("aria-label") || $el.getAttribute("aria-labelledby");
      if (option.checks.MISSING_ALT) {
        if (hasAria && altText === "") {
          results.push({
            test: "MISSING_ALT",
            element: $el,
            type: option.checks.MISSING_ALT.type || "error",
            content: Lang.sprintf(option.checks.MISSING_ALT.content || "MISSING_ALT"),
            dismiss: prepareDismissal(`IMGNOALTARIA${src}`),
            dismissAll: option.checks.MISSING_ALT.dismissAll ? "MISSING_ALT" : false,
            developer: option.checks.MISSING_ALT.developer || false
          });
          return;
        }
      }
      const decorative = alt === "";
      const figure = $el.closest("figure");
      const figcaption = figure?.querySelector("figcaption");
      const figcaptionText = figcaption ? getText(figcaption) : "";
      const maxAltCharactersLinks = option.checks.LINK_IMAGE_LONG_ALT.maxLength || 250;
      const maxAltCharacters = option.checks.IMAGE_ALT_TOO_LONG.maxLength || 250;
      const startsWithSpecificAlt = alt.match(altPlaceholderPattern)?.[0];
      if (decorative || startsWithSpecificAlt) {
        const carouselSources = option.checks.IMAGE_DECORATIVE_CAROUSEL.sources;
        const carousel = carouselSources ? $el.closest(carouselSources) : "";
        if (carousel) {
          const numberOfSlides = carousel.querySelectorAll("img");
          const rule = numberOfSlides.length === 1 ? option.checks.IMAGE_DECORATIVE : option.checks.IMAGE_DECORATIVE_CAROUSEL;
          const conditional = numberOfSlides.length === 1 ? "IMAGE_DECORATIVE" : "IMAGE_DECORATIVE_CAROUSEL";
          if (rule) {
            results.push({
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
          const rule = linkTextLength === 0 ? option.checks.LINK_IMAGE_NO_ALT_TEXT : option.checks.LINK_IMAGE_TEXT;
          const conditional = linkTextLength === 0 ? "LINK_IMAGE_NO_ALT_TEXT" : "LINK_IMAGE_TEXT";
          if (rule) {
            results.push({
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
          const rule = figcaption && figcaptionText.length ? option.checks.IMAGE_FIGURE_DECORATIVE : option.checks.IMAGE_DECORATIVE;
          const conditional = figcaption && figcaptionText.length ? "IMAGE_FIGURE_DECORATIVE" : "IMAGE_DECORATIVE";
          if (rule) {
            results.push({
              test: conditional,
              element: $el,
              type: rule.type || "warning",
              content: Lang.sprintf(rule.content || conditional),
              dismiss: prepareDismissal(`${conditional + src + figcaptionText}`),
              dismissAll: rule.dismissAll ? conditional : false,
              developer: rule.developer || false
            });
          }
        } else if (option.checks.IMAGE_DECORATIVE) {
          results.push({
            test: "IMAGE_DECORATIVE",
            element: $el,
            type: option.checks.IMAGE_DECORATIVE.type || "warning",
            content: Lang.sprintf(option.checks.IMAGE_DECORATIVE.content || "IMAGE_DECORATIVE"),
            dismiss: prepareDismissal(`DECIMAGE${src}`),
            dismissAll: option.checks.IMAGE_DECORATIVE.dismissAll ? "IMAGE_DECORATIVE" : false,
            developer: option.checks.IMAGE_DECORATIVE.developer || false
          });
        }
        return;
      }
      const unpronounceable = link ? option.checks.LINK_ALT_UNPRONOUNCEABLE : option.checks.ALT_UNPRONOUNCEABLE;
      if (unpronounceable) {
        if (alt.replace(/"|'|\?|\.|-|\s+/g, "") === "" && linkTextLength === 0) {
          const conditional = link ? "LINK_ALT_UNPRONOUNCEABLE" : "ALT_UNPRONOUNCEABLE";
          results.push({
            test: conditional,
            element: $el,
            type: unpronounceable.type || "error",
            content: Lang.sprintf(unpronounceable.content || conditional, altText),
            dismiss: prepareDismissal(`UNPRONOUNCEABLE${src}`),
            dismissAll: unpronounceable.dismissAll ? "ALT_UNPRONOUNCEABLE" : false,
            developer: unpronounceable.developer || false
          });
          return;
        }
      }
      const error = containsAltTextStopWords(altText);
      const maybeBadAlt = link ? option.checks.LINK_ALT_MAYBE_BAD : option.checks.ALT_MAYBE_BAD;
      const isTooLongSingleWord = new RegExp(`^\\S{${maybeBadAlt.minLength || 15},}$`);
      const containsNonAlphaChar = /[^\p{L}\-,.!?]/u.test(alt);
      if (error[0] !== null) {
        const rule = link ? option.checks.LINK_ALT_FILE_EXT : option.checks.ALT_FILE_EXT;
        const conditional = link ? "LINK_ALT_FILE_EXT" : "ALT_FILE_EXT";
        if (rule) {
          results.push({
            test: conditional,
            element: $el,
            type: rule.type || "error",
            content: Lang.sprintf(rule.content || conditional, error[0], altText),
            dismiss: prepareDismissal(`${conditional + src + altText}`),
            dismissAll: rule.dismissAll ? conditional : false,
            developer: rule.developer || false
          });
        }
      } else if (error[2] !== null) {
        const rule = link ? option.checks.LINK_PLACEHOLDER_ALT : option.checks.ALT_PLACEHOLDER;
        const conditional = link ? "LINK_PLACEHOLDER_ALT" : "ALT_PLACEHOLDER";
        if (rule) {
          results.push({
            test: conditional,
            element: $el,
            type: rule.type || "error",
            content: Lang.sprintf(rule.content || conditional, altText),
            dismiss: prepareDismissal(`${conditional + src + altText}`),
            dismissAll: rule.dismissAll ? conditional : false,
            developer: rule.developer || false
          });
        }
      } else if (error[1] !== null) {
        const rule = link ? option.checks.LINK_SUS_ALT : option.checks.SUS_ALT;
        const conditional = link ? "LINK_SUS_ALT" : "SUS_ALT";
        if (rule) {
          results.push({
            test: conditional,
            element: $el,
            type: rule.type || "warning",
            content: Lang.sprintf(rule.content || conditional, error[1], altText),
            dismiss: prepareDismissal(`${conditional + src + altText}`),
            dismissAll: rule.dismissAll ? conditional : false,
            developer: rule.developer || false
          });
        }
      } else if (maybeBadAlt && isTooLongSingleWord.test(alt) && containsNonAlphaChar) {
        const conditional = link ? "LINK_ALT_MAYBE_BAD" : "ALT_MAYBE_BAD";
        results.push({
          test: conditional,
          element: $el,
          type: maybeBadAlt.type || "error",
          content: Lang.sprintf(maybeBadAlt.content || conditional, altText),
          dismiss: prepareDismissal(`${conditional + src + altText}`),
          dismissAll: maybeBadAlt.dismissAll ? conditional : false,
          developer: maybeBadAlt.developer || false
        });
      } else if (link ? alt.length > maxAltCharactersLinks : alt.length > maxAltCharacters) {
        const rule = link ? option.checks.LINK_IMAGE_LONG_ALT : option.checks.IMAGE_ALT_TOO_LONG;
        const conditional = link ? "LINK_IMAGE_LONG_ALT" : "IMAGE_ALT_TOO_LONG";
        const truncated = truncateString(altText, 600);
        if (rule) {
          results.push({
            test: conditional,
            element: $el,
            type: rule.type || "warning",
            content: Lang.sprintf(rule.content || conditional, alt.length, truncated),
            dismiss: prepareDismissal(`${conditional + src + altText}`),
            dismissAll: rule.dismissAll ? conditional : false,
            developer: rule.developer || false
          });
        }
      } else if (link) {
        const rule = linkTextLength === 0 ? option.checks.LINK_IMAGE_ALT : option.checks.LINK_IMAGE_ALT_AND_TEXT;
        const conditional = linkTextLength === 0 ? "LINK_IMAGE_ALT" : "LINK_IMAGE_ALT_AND_TEXT";
        if (rule) {
          const linkAccName = computeAccessibleName(link);
          const removeWhitespace$1 = removeWhitespace(linkAccName);
          const sanitizedText = sanitizeHTML(removeWhitespace$1);
          const tooltip = linkTextLength === 0 ? Lang.sprintf("LINK_IMAGE_ALT", altText) : `${Lang.sprintf("LINK_IMAGE_ALT_AND_TEXT", altText, sanitizedText)} ${Lang.sprintf("ACC_NAME_TIP")}`;
          results.push({
            test: conditional,
            element: $el,
            type: rule.type || "warning",
            content: rule.content ? Lang.sprintf(rule.content, altText, sanitizedText) : tooltip,
            dismiss: prepareDismissal(`${conditional + src + altText}`),
            dismissAll: rule.dismissAll ? conditional : false,
            developer: rule.developer || false
          });
        }
      } else if (figure) {
        const duplicate = !!figcaption && figcaptionText.toLowerCase() === altText.toLowerCase();
        if (duplicate) {
          if (option.checks.IMAGE_FIGURE_DUPLICATE_ALT) {
            results.push({
              test: "IMAGE_FIGURE_DUPLICATE_ALT",
              element: $el,
              type: option.checks.IMAGE_FIGURE_DUPLICATE_ALT.type || "warning",
              content: Lang.sprintf(
                option.checks.IMAGE_FIGURE_DUPLICATE_ALT.content || "IMAGE_FIGURE_DUPLICATE_ALT",
                altText
              ),
              dismiss: prepareDismissal(`FIGDUPLICATE${src}`),
              dismissAll: option.checks.IMAGE_FIGURE_DUPLICATE_ALT.dismissAll ? "IMAGE_FIGURE_DUPLICATE_ALT" : false,
              developer: option.checks.IMAGE_FIGURE_DUPLICATE_ALT.developer || false
            });
          }
        } else if (option.checks.IMAGE_PASS) {
          results.push({
            test: "IMAGE_PASS",
            element: $el,
            type: option.checks.IMAGE_PASS.type || "good",
            content: Lang.sprintf(option.checks.IMAGE_PASS.content || "IMAGE_PASS", altText),
            dismiss: prepareDismissal(`FIGIMGPASS${src + altText}`),
            dismissAll: option.checks.IMAGE_PASS.dismissAll ? "IMAGE_PASS" : false,
            developer: option.checks.IMAGE_PASS.developer || false
          });
        }
      } else if (option.checks.IMAGE_PASS) {
        if (!$el.closest('button, [role="button"]')) {
          results.push({
            test: "IMAGE_PASS",
            element: $el,
            type: option.checks.IMAGE_PASS.type || "good",
            content: Lang.sprintf(option.checks.IMAGE_PASS.content || "IMAGE_PASS", altText),
            dismiss: prepareDismissal(`IMAGEPASS${src + altText}`),
            dismissAll: option.checks.IMAGE_PASS.dismissAll ? "IMAGE_PASS" : false,
            developer: option.checks.IMAGE_PASS.developer || false
          });
        }
      }
      const titleAttr = $el.getAttribute("title");
      if (titleAttr?.toLowerCase() === alt.toLowerCase()) {
        if (option.checks.DUPLICATE_TITLE) {
          results.push({
            test: "DUPLICATE_TITLE",
            element: $el,
            type: option.checks.DUPLICATE_TITLE.type || "warning",
            content: Lang.sprintf(option.checks.DUPLICATE_TITLE.content || "DUPLICATE_TITLE"),
            inline: true,
            dismiss: prepareDismissal(`ALTDUPLICATETITLE${altText}`),
            dismissAll: option.checks.DUPLICATE_TITLE.dismissAll ? "DUPLICATE_TITLE" : false,
            developer: option.checks.DUPLICATE_TITLE.developer || false
          });
        }
      }
    });
    return results;
  }
  function checkHeaders(results, option, headingOutline) {
    let prevLevel;
    let prevHeadingText = "";
    const stringExclusionPattern = generateRegexString(option.headerIgnoreStrings);
    Elements.Found.Headings.forEach(($el, i) => {
      const accName = computeAccessibleName($el, Constants.Exclusions.HeaderSpan);
      const stringMatchExclusions = accName.replace(stringExclusionPattern, "");
      const removeWhitespace$1 = removeWhitespace(stringMatchExclusions);
      const headingText = sanitizeHTML(removeWhitespace$1);
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
      const headingLength = removeWhitespace$1.length;
      const maxHeadingLength = option.checks.HEADING_LONG.maxLength || 160;
      let test = null;
      let type = null;
      let content = null;
      let developer = null;
      let dismissAll = null;
      let margin = null;
      if (headingLength === 0) {
        const image = $el.querySelector("img");
        if (image) {
          const alt = image?.getAttribute("alt");
          if (image && (!alt || alt.trim() === "")) {
            if (option.checks.HEADING_EMPTY_WITH_IMAGE) {
              test = "HEADING_EMPTY_WITH_IMAGE";
              type = option.checks.HEADING_EMPTY_WITH_IMAGE.type || "error";
              content = Lang.sprintf(
                option.checks.HEADING_EMPTY_WITH_IMAGE.content || "HEADING_EMPTY_WITH_IMAGE",
                level
              );
              developer = option.checks.HEADING_EMPTY_WITH_IMAGE.developer || false;
              dismissAll = option.checks.HEADING_EMPTY_WITH_IMAGE.dismissAll ? "HEADING_EMPTY_WITH_IMAGE" : false;
              margin = "-15px 30px";
            }
          }
        } else if (option.checks.HEADING_EMPTY) {
          test = "HEADING_EMPTY";
          type = option.checks.HEADING_EMPTY.type || "error";
          content = Lang.sprintf(option.checks.HEADING_EMPTY.content || "HEADING_EMPTY", level);
          developer = option.checks.HEADING_EMPTY.developer || false;
          dismissAll = option.checks.HEADING_EMPTY.dismissAll ? "HEADING_EMPTY" : false;
          margin = "0";
        }
      } else if (level - prevLevel > 1 && i !== 0) {
        if (option.checks.HEADING_SKIPPED_LEVEL) {
          test = "HEADING_SKIPPED_LEVEL";
          type = option.checks.HEADING_SKIPPED_LEVEL.type || "error";
          content = Lang.sprintf(
            option.checks.HEADING_SKIPPED_LEVEL.content || "HEADING_SKIPPED_LEVEL",
            prevLevel,
            level,
            truncateString(headingText, 60),
            truncateString(prevHeadingText, 60),
            prevLevel + 1
          );
          developer = option.checks.HEADING_SKIPPED_LEVEL.developer || false;
          dismissAll = option.checks.HEADING_SKIPPED_LEVEL.dismissAll ? "HEADING_SKIPPED_LEVEL" : false;
        }
      } else if (i === 0 && level !== 1 && level !== 2) {
        if (option.checks.HEADING_FIRST) {
          test = "HEADING_FIRST";
          type = option.checks.HEADING_FIRST.type || "error";
          content = Lang.sprintf(option.checks.HEADING_FIRST.content || "HEADING_FIRST");
          developer = option.checks.HEADING_FIRST.developer || false;
          dismissAll = option.checks.HEADING_FIRST.dismissAll ? "HEADING_FIRST" : false;
        }
      } else if (headingLength > maxHeadingLength) {
        if (option.checks.HEADING_LONG) {
          test = "HEADING_LONG";
          type = option.checks.HEADING_LONG.type || "warning";
          content = Lang.sprintf(
            option.checks.HEADING_LONG.content || "HEADING_LONG",
            maxHeadingLength,
            headingLength
          );
          developer = option.checks.HEADING_LONG.developer || false;
          dismissAll = option.checks.HEADING_LONG.dismissAll ? "HEADING_LONG" : false;
        }
      }
      if (content && type) {
        results.push({
          test,
          element: $el,
          type,
          content,
          dismiss: prepareDismissal(`H${level + headingText}`),
          dismissAll,
          isWithinRoot,
          developer,
          margin
        });
      }
      prevLevel = level;
      prevHeadingText = headingText;
      if (!Elements.Found.OutlineIgnore.includes($el)) {
        headingOutline.push({
          element: $el,
          headingLevel: level,
          text: headingText,
          type,
          dismiss: prepareDismissal(`H${level + headingText}`),
          isWithinRoot
        });
      }
    });
    if (option.checks.HEADING_MISSING_ONE && Elements.Found.HeadingOne.length === 0) {
      results.push({
        test: "HEADING_MISSING_ONE",
        type: option.checks.HEADING_MISSING_ONE.type || "warning",
        content: Lang.sprintf(option.checks.HEADING_MISSING_ONE.content || "HEADING_MISSING_ONE"),
        dismiss: "MISSINGH1",
        developer: option.checks.HEADING_MISSING_ONE.developer || false
      });
    }
    return { results, headingOutline };
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
  const citationPattern = /(doi\.org\/|dl\.acm\.org\/|link\.springer\.com\/|pubmed\.ncbi\.nlm\.nih\.gov\/|scholar\.google\.com\/|ieeexplore\.ieee\.org\/|researchgate\.net\/publication\/|sciencedirect\.com\/science\/article\/)[a-z0-9/.-]+/i;
  const urlEndings = /\b(?:\.edu\/|\.gob\/|\.gov\/|\.app\/|\.com\/|\.net\/|\.org\/|\.us\/|\.ca\/|\.de\/|\.icu\/|\.uk\/|\.ru\/|\.info\/|\.top\/|\.xyz\/|\.tk\/|\.cn\/|\.ga\/|\.cf\/|\.nl\/|\.io\/|\.fr\/|\.pe\/|\.nz\/|\.pt\/|\.es\/|\.pl\/|\.ua\/)\b/i;
  const specialCharPattern = /[^a-zA-Z0-9]/g;
  const htmlSymbols = /([<>↣↳←→↓«»↴]+)/;
  const checkStopWords = (textContent, stopWordsSet, stripStrings) => {
    const stripped = textContent.replace(stripStrings, "").trim();
    if (stopWordsSet.has(stripped)) return stripped;
    return null;
  };
  function checkLinkText(results, option) {
    const customStopWords = option.linkStopWords ? option.linkStopWords.split(",").map((word) => word.toLowerCase().trim()) : [];
    const linkStopWords = /* @__PURE__ */ new Set([...Lang._("LINK_STOPWORDS"), ...customStopWords]);
    const linkIgnoreStrings = new Set(option.linkIgnoreStrings.map((word) => word.toLowerCase()));
    const clickRegex = generateRegexString(Lang._("CLICK"));
    const newWindowRegex = generateRegexString(Lang._("NEW_WINDOW_PHRASES"));
    const fileTypeRegex = generateRegexString(defaultFileTypes);
    const ignorePattern = generateRegexString(option.linkIgnoreStrings);
    const seen = {};
    Elements.Found.Links.forEach(($el) => {
      const href = standardizeHref($el);
      const titleAttr = $el.getAttribute("title");
      const ariaHidden = $el.getAttribute("aria-hidden") === "true";
      const negativeTabindex = $el.getAttribute("tabindex") === "-1";
      const targetBlank = $el.getAttribute("target")?.toLowerCase() === "_blank";
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
      const containsNewWindowPhrases = lowercaseLinkText.match(newWindowRegex)?.[0] || textContent.match(newWindowRegex)?.[0];
      const containsFileTypePhrases = lowercaseLinkText.match(fileTypeRegex)?.[0] || textContent.match(fileTypeRegex)?.[0];
      const fileTypeMatch = $el.matches(cssFileTypeSelectors);
      if (!$el.querySelector("img")) {
        if (ariaHidden) {
          if (!negativeTabindex) {
            if (option.checks.HIDDEN_FOCUSABLE) {
              results.push({
                test: "HIDDEN_FOCUSABLE",
                element: $el,
                type: option.checks.HIDDEN_FOCUSABLE.type || "error",
                content: Lang.sprintf(option.checks.HIDDEN_FOCUSABLE.content || "HIDDEN_FOCUSABLE"),
                inline: true,
                position: "afterend",
                dismiss: prepareDismissal(`LINKHIDDENFOCUS${href + strippedLinkText}`),
                dismissAll: option.checks.HIDDEN_FOCUSABLE.dismissAll ? "LINK_HIDDEN_FOCUSABLE" : false,
                developer: option.checks.HIDDEN_FOCUSABLE.developer || true
              });
            }
          }
          return;
        }
        if (hasAria && linkText.length !== 0) {
          const sanitizedText = sanitizeHTML(linkText);
          const excludeSpan = fnIgnore($el, Constants.Exclusions.LinkSpan);
          const visibleLinkText = getText(excludeSpan).replace(ignorePattern, "");
          const cleanedString = stripAllSpecialCharacters(visibleLinkText);
          const stopword = checkStopWords(cleanedString, linkStopWords);
          const visibleTextInName = isVisibleTextInAccName(
            $el,
            accName,
            Constants.Exclusions.LinkSpan,
            option.linkIgnoreStrings
          );
          if (option.checks.LINK_STOPWORD_ARIA && stopword !== null) {
            results.push({
              test: "LINK_STOPWORD_ARIA",
              element: $el,
              type: option.checks.LINK_STOPWORD_ARIA.type || "warning",
              content: option.checks.LINK_STOPWORD_ARIA.content ? Lang.sprintf(option.checks.LINK_STOPWORD_ARIA.content, stopword, sanitizedText) : Lang.sprintf("LINK_STOPWORD_ARIA", stopword, sanitizedText) + Lang.sprintf("LINK_TIP"),
              inline: true,
              dismiss: prepareDismissal(`LINKSTOPWORDARIA${href + strippedLinkText}`),
              dismissAll: option.checks.LINK_STOPWORD_ARIA.dismissAll ? " LINK_STOPWORD_ARIA" : false,
              developer: option.checks.LINK_STOPWORD_ARIA.developer || true
            });
          } else if (option.checks.LABEL_IN_NAME && visibleTextInName && textContent.length !== 0) {
            results.push({
              test: "LABEL_IN_NAME",
              element: $el,
              type: option.checks.LABEL_IN_NAME.type || "warning",
              content: Lang.sprintf(
                option.checks.LABEL_IN_NAME.content || "LABEL_IN_NAME",
                sanitizedText
              ),
              inline: true,
              position: "afterend",
              dismiss: prepareDismissal(`LINKLABELNAME${href + strippedLinkText}`),
              dismissAll: option.checks.LABEL_IN_NAME.dismissAll ? "BTN_LABEL_IN_NAME" : false,
              developer: option.checks.LABEL_IN_NAME.developer || true
            });
          } else if (option.checks.LINK_LABEL) {
            results.push({
              test: "LINK_LABEL",
              element: $el,
              type: option.checks.LINK_LABEL.type || "good",
              content: option.checks.LINK_LABEL.content ? Lang.sprintf(option.checks.LINK_LABEL.content, sanitizedText) : `${Lang.sprintf("ACC_NAME", sanitizedText)} ${Lang.sprintf("ACC_NAME_TIP")}`,
              inline: true,
              position: "afterend",
              dismiss: prepareDismissal(`LINKGOOD${href + strippedLinkText}`),
              dismissAll: option.checks.LINK_LABEL.dismissAll ? "LINK_LABEL" : false,
              developer: option.checks.LINK_LABEL.developer || true
            });
          }
        }
        let oneStop;
        const addStopWordResult = (element, stopword) => {
          if (option.checks.LINK_STOPWORD && !oneStop) {
            oneStop = true;
            results.push({
              test: "LINK_STOPWORD",
              element,
              type: option.checks.LINK_STOPWORD.type || "error",
              content: option.checks.LINK_STOPWORD.content ? Lang.sprintf(option.checks.LINK_STOPWORD.content, stopword) : Lang.sprintf("LINK_STOPWORD", stopword) + Lang.sprintf("LINK_TIP"),
              inline: true,
              position: "afterend",
              dismiss: prepareDismissal(`LINKSTOPWORD${href + strippedLinkText}`),
              dismissAll: option.checks.LINK_STOPWORD.dismissAll ? "LINK_STOPWORD" : false,
              developer: option.checks.LINK_STOPWORD.developer || false
            });
          }
        };
        const isLinkIgnoreStrings = checkStopWords(textContent, linkIgnoreStrings);
        if (isLinkIgnoreStrings === textContent || isLinkIgnoreStrings === strippedLinkText) {
          addStopWordResult($el, isLinkIgnoreStrings);
        } else if (containsNewWindowPhrases === textContent || containsNewWindowPhrases === strippedLinkText) {
          addStopWordResult($el, containsNewWindowPhrases);
          return;
        }
        if (linkText.length === 0) {
          if (hasAriaLabelledby) {
            if (option.checks.LINK_EMPTY_LABELLEDBY) {
              results.push({
                test: "LINK_EMPTY_LABELLEDBY",
                element: $el,
                type: option.checks.LINK_EMPTY_LABELLEDBY.type || "error",
                content: Lang.sprintf(
                  option.checks.LINK_EMPTY_LABELLEDBY.content || "LINK_EMPTY_LABELLEDBY"
                ),
                inline: true,
                position: "afterend",
                dismiss: prepareDismissal(`LINKEMPTYLABELLEDBY${href}`),
                dismissAll: option.checks.LINK_EMPTY_LABELLEDBY.dismissAll ? "LINK_EMPTY_LABELLEDBY" : false,
                developer: option.checks.LINK_EMPTY_LABELLEDBY.developer || true
              });
            }
          } else if ($el.children.length) {
            let hasStopWordWarning = false;
            if (option.linkIgnoreSpan) {
              const spanEl = $el.querySelector(option.linkIgnoreSpan);
              if (spanEl) {
                const spanText = stripAllSpecialCharacters(spanEl.textContent).trim().toLowerCase();
                if (spanText === textContent) {
                  addStopWordResult($el, spanText);
                  hasStopWordWarning = true;
                }
              }
            }
            if (!hasStopWordWarning && option.checks.LINK_EMPTY_NO_LABEL) {
              results.push({
                test: "LINK_EMPTY_NO_LABEL",
                element: $el,
                type: option.checks.LINK_EMPTY_NO_LABEL.type || "error",
                content: Lang.sprintf(
                  option.checks.LINK_EMPTY_NO_LABEL.content || "LINK_EMPTY_NO_LABEL"
                ),
                inline: true,
                position: "afterend",
                dismiss: prepareDismissal(`LINKEMPTYNOLABEL${href}`),
                dismissAll: option.checks.LINK_EMPTY_NO_LABEL.dismissAll ? "LINK_EMPTY_NO_LABEL" : false,
                developer: option.checks.LINK_EMPTY_NO_LABEL.developer || false
              });
            }
          } else if (!isLinkIgnoreStrings && option.checks.LINK_EMPTY) {
            results.push({
              test: "LINK_EMPTY",
              element: $el,
              type: option.checks.LINK_EMPTY.type || "error",
              content: Lang.sprintf(option.checks.LINK_EMPTY.content || "LINK_EMPTY"),
              inline: true,
              position: "afterend",
              dismiss: prepareDismissal(`LINKEMPTY${href}`),
              dismissAll: option.checks.LINK_EMPTY.dismissAll ? "LINK_EMPTY" : false,
              developer: option.checks.LINK_EMPTY.developer || false
            });
          }
          return;
        }
        const isStopWord = checkStopWords(strippedLinkText, linkStopWords, newWindowRegex);
        const hasClickWord = strippedLinkText.match(clickRegex)?.[0] || textContent.match(clickRegex)?.[0];
        const isCitation = lowercaseLinkText.match(citationPattern)?.[0];
        const urlCheck = lowercaseLinkText.startsWith("www.") || lowercaseLinkText.startsWith("http");
        const isUrlFragment = urlCheck ? "URL Prefix" : lowercaseLinkText.match(urlEndings)?.[0];
        const isSingleSpecialChar = linkText.length === 1 && specialCharPattern.test(linkText);
        const matchedSymbol = lowercaseLinkText.match(htmlSymbols)?.[0];
        if (isStopWord) {
          addStopWordResult($el, isStopWord);
        } else if (isCitation) {
          if (linkText.length > 8) {
            if (option.checks.LINK_DOI) {
              results.push({
                test: "LINK_DOI",
                element: $el,
                type: option.checks.LINK_DOI.type || "warning",
                content: Lang.sprintf(option.checks.LINK_DOI.content || "LINK_DOI"),
                inline: true,
                dismiss: prepareDismissal(`LINKDOI${href + strippedLinkText}`),
                dismissAll: option.checks.LINK_DOI.dismissAll ? "LINK_DOI" : false,
                developer: option.checks.LINK_DOI.developer || false
              });
            }
          }
        } else if (isUrlFragment) {
          if (!hasAria && linkText.length > (option.checks.LINK_URL.maxLength || 40)) {
            if (option.checks.LINK_URL) {
              results.push({
                test: "LINK_URL",
                element: $el,
                type: option.checks.LINK_URL.type || "warning",
                content: option.checks.LINK_URL.content ? Lang.sprintf(option.checks.LINK_URL.content) : Lang.sprintf("LINK_URL") + Lang.sprintf("LINK_TIP"),
                inline: true,
                dismiss: prepareDismissal(`LINKURLNAME${href + strippedLinkText}`),
                dismissAll: option.checks.LINK_URL.dismissAll ? "LINK_URL" : false,
                developer: option.checks.LINK_URL.developer || false
              });
            }
          }
        } else if (matchedSymbol) {
          if (option.checks.LINK_SYMBOLS) {
            results.push({
              test: "LINK_SYMBOLS",
              element: $el,
              type: option.checks.LINK_SYMBOLS.type || "warning",
              content: Lang.sprintf(
                option.checks.LINK_SYMBOLS.content || "LINK_SYMBOLS",
                matchedSymbol
              ),
              inline: true,
              dismiss: prepareDismissal(`LINKSYMBOL${href + strippedLinkText}`),
              dismissAll: option.checks.LINK_SYMBOLS.dismissAll ? "LINK_SYMBOLS" : false,
              developer: option.checks.LINK_SYMBOLS.developer || false
            });
          }
        } else if (isSingleSpecialChar && !titleAttr) {
          if (option.checks.LINK_EMPTY) {
            results.push({
              test: "LINK_EMPTY",
              element: $el,
              type: option.checks.LINK_EMPTY.type || "error",
              content: Lang.sprintf(option.checks.LINK_EMPTY.content || "LINK_EMPTY"),
              inline: true,
              position: "afterend",
              dismiss: prepareDismissal(`LINKCHAR${href}`),
              dismissAll: option.checks.LINK_EMPTY.dismissAll ? "LINK_EMPTY" : false,
              developer: option.checks.LINK_EMPTY.developer || false
            });
          }
          return;
        }
        if (hasClickWord) {
          if (option.checks.LINK_CLICK_HERE) {
            results.push({
              test: "LINK_CLICK_HERE",
              element: $el,
              type: option.checks.LINK_CLICK_HERE.type || "warning",
              content: option.checks.LINK_CLICK_HERE.content ? Lang.sprintf(option.checks.LINK_CLICK_HERE.content) : Lang.sprintf("LINK_CLICK_HERE") + Lang.sprintf("LINK_TIP"),
              inline: true,
              dismiss: prepareDismissal(`LINKCLICKHERE${href + strippedLinkText}`),
              dismissAll: option.checks.LINK_CLICK_HERE.dismissAll ? "LINK_CLICK_HERE" : false,
              developer: option.checks.LINK_CLICK_HERE.developer || false
            });
          }
        }
        if (textContent.length !== 0 && titleAttr?.toLowerCase() === linkText.toLowerCase()) {
          if (option.checks.DUPLICATE_TITLE) {
            results.push({
              test: "DUPLICATE_TITLE",
              element: $el,
              type: option.checks.DUPLICATE_TITLE.type || "warning",
              content: Lang.sprintf(option.checks.DUPLICATE_TITLE.content || "DUPLICATE_TITLE"),
              inline: true,
              dismiss: prepareDismissal(`LINKDUPLICATETITLE${href + strippedLinkText}`),
              dismissAll: option.checks.DUPLICATE_TITLE.dismissAll ? "DUPLICATE_TITLE" : false,
              developer: option.checks.DUPLICATE_TITLE.developer || false
            });
          }
        }
      }
      if (strippedLinkText.length !== 0) {
        if (seen[strippedLinkText] && !seen[href]) {
          const ignored = $el.ariaHidden === "true" && $el.getAttribute("tabindex") === "-1";
          const hasAttributes = $el.hasAttribute("role") || $el.hasAttribute("disabled");
          if (option.checks.LINK_IDENTICAL_NAME && !hasAttributes && !ignored) {
            const sanitizedText = sanitizeHTML(linkText);
            results.push({
              test: "LINK_IDENTICAL_NAME",
              element: $el,
              type: option.checks.LINK_IDENTICAL_NAME.type || "warning",
              content: option.checks.LINK_IDENTICAL_NAME.content ? Lang.sprintf(option.checks.LINK_IDENTICAL_NAME.content, sanitizedText) : `${Lang.sprintf("LINK_IDENTICAL_NAME", sanitizedText)} ${Lang.sprintf("ACC_NAME_TIP")}`,
              inline: true,
              dismiss: prepareDismissal(`LINKSEEN${href + strippedLinkText}`),
              dismissAll: option.checks.LINK_IDENTICAL_NAME.dismissAll ? "LINK_IDENTICAL_NAME" : false,
              developer: option.checks.LINK_IDENTICAL_NAME.developer || false
            });
          }
        } else {
          seen[strippedLinkText] = true;
          seen[href] = true;
        }
        if (targetBlank && !fileTypeMatch && !containsNewWindowPhrases) {
          if (option.checks.LINK_NEW_TAB) {
            results.push({
              test: "LINK_NEW_TAB",
              element: $el,
              type: option.checks.LINK_NEW_TAB.type || "warning",
              content: Lang.sprintf(option.checks.LINK_NEW_TAB.content || "LINK_NEW_TAB"),
              inline: true,
              dismiss: prepareDismissal(`LINKNEWTAB${href + strippedLinkText}`),
              dismissAll: option.checks.LINK_NEW_TAB.dismissAll ? "LINK_NEW_TAB" : false,
              developer: option.checks.LINK_NEW_TAB.developer || false
            });
          }
        }
        if (fileTypeMatch && !containsFileTypePhrases) {
          if (option.checks.LINK_FILE_EXT) {
            results.push({
              test: "LINK_FILE_EXT",
              element: $el,
              type: option.checks.LINK_FILE_EXT.type || "warning",
              content: Lang.sprintf(option.checks.LINK_FILE_EXT.content || "LINK_FILE_EXT"),
              inline: true,
              dismiss: prepareDismissal(`LINKEXT${href + strippedLinkText}`),
              dismissAll: option.checks.LINK_FILE_EXT.dismissAll ? "LINK_FILE_EXT" : false,
              developer: option.checks.LINK_FILE_EXT.developer || false
            });
          }
        }
      }
    });
    return results;
  }
  function checkContrast(results, option) {
    const contrastResults = [];
    for (let i = 0; i < Elements.Found.Contrast.length; i++) {
      const $el = Elements.Found.Contrast[i];
      const style = getComputedStyle($el);
      const opacity = parseFloat(style.opacity);
      const color = convertToRGBA(style.color, opacity);
      const fontSize = parseFloat(style.fontSize);
      const getFontWeight = style.fontWeight;
      const fontWeight = normalizeFontWeight(getFontWeight);
      const background = getBackground($el, Constants.Global.shadowDetection);
      const isVisuallyHidden = isScreenReaderOnly($el);
      const isExplicitlyHidden = isElementHidden($el);
      const isHidden = isExplicitlyHidden || isVisuallyHidden || opacity === 0 || fontSize === 0;
      const textString = Array.from($el.childNodes).filter((node) => node.nodeType === 3).map((node) => node.textContent).join("");
      const text = textString.trim();
      const checkInputs = ["SELECT", "INPUT", "TEXTAREA"].includes($el.tagName);
      if (text.length !== 0 || checkInputs) {
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
        } else if (background.type === "image") {
          if (!isHidden) {
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
        } else if (!isHidden && getHex(color) !== getHex(background)) {
          const result = checkElementContrast(
            $el,
            color,
            background,
            fontSize,
            fontWeight,
            opacity,
            option.contrastAlgorithm
          );
          if (result) {
            result.type = checkInputs ? "input" : "text";
            contrastResults.push(result);
          }
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
        const ref = getComputedStyle(shapes[0]);
        allSameColour = Array.from(shapes).every((node) => {
          const style = getComputedStyle(node);
          return style.fill === ref.fill && style.fillOpacity === ref.fillOpacity && style.stroke === ref.stroke && style.strokeOpacity === ref.strokeOpacity && style.opacity === ref.opacity;
        });
      }
      if ((shapes.length === 1 || allSameColour) && complex.length === 0) {
        const style = getComputedStyle(shapes[0]);
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
        const resolvedFill = fill === "currentColor" ? convertToRGBA(getComputedStyle(shapes[0]).color, opacity) : convertToRGBA(fill, opacity);
        const resolvedStroke = stroke === "currentColor" ? convertToRGBA(getComputedStyle(shapes[0]).color, opacity) : convertToRGBA(stroke, opacity);
        const supported = ![resolvedFill, resolvedStroke].includes("unsupported");
        if (supported && hasBackground) {
          let contrastValue;
          let fillPasses = false;
          let strokePasses = false;
          if (hasFill) {
            contrastValue = calculateContrast(
              resolvedFill,
              background,
              option.contrastAlgorithm
            );
            fillPasses = option.contrastAlgorithm === "APCA" ? contrastValue.ratio >= 45 : contrastValue.ratio >= 3;
          }
          if (hasStroke) {
            contrastValue = calculateContrast(
              resolvedStroke,
              background,
              option.contrastAlgorithm
            );
            strokePasses = option.contrastAlgorithm === "APCA" ? contrastValue.ratio >= 45 : contrastValue.ratio >= 3;
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
              ratio: ratioToDisplay(contrastValue.ratio, option.contrastAlgorithm),
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
        const placeholder = getComputedStyle($el, "::placeholder");
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
            option.contrastAlgorithm
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
      if (option.contrastAlgorithm === "APCA") {
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
      const element = $el.tagName === "OPTION" ? $el.closest("datalist, select, optgroup") : $el;
      const nodeText = fnIgnore(element, ["option:not(option:first-child)"]);
      const text = getText(nodeText);
      const truncatedText = truncateString(text, 80);
      const sanitizedText = sanitizeHTML(truncatedText);
      let previewText;
      if (item.type === "placeholder" || item.type === "placeholder-unsupported") {
        previewText = sanitizeHTML($el.placeholder);
      } else if (item.type === "svg-error" || item.type === "svg-warning") {
        previewText = "";
      } else {
        previewText = sanitizedText;
      }
      updatedItem.sanitizedText = previewText;
      let ratioTip = "";
      if (option.contrastAlgorithm === "AA" || option.contrastAlgorithm === "AAA") {
        const normal = option.contrastAlgorithm === "AAA" ? "7:1" : "4.5:1";
        const large = option.contrastAlgorithm === "AAA" ? "4.5:1" : "3:1";
        const ratioToDisplay2 = item.isLargeText ? large : normal;
        const ratioRequirement = item.isLargeText ? "CONTRAST_LARGE" : "CONTRAST_NORMAL";
        ratioTip = ` ${Lang.sprintf(ratioRequirement, ratioToDisplay2)}`;
      }
      const graphicsTip = option.contrastAlgorithm === "APCA" ? "" : ` ${Lang.sprintf("CONTRAST_TIP_GRAPHIC")}`;
      switch (item.type) {
        case "text":
          if (option.checks.CONTRAST_ERROR) {
            results.push({
              test: "CONTRAST_ERROR",
              element: $el,
              type: option.checks.CONTRAST_ERROR.type || "error",
              content: option.checks.CONTRAST_ERROR.content ? Lang.sprintf(option.checks.CONTRAST_ERROR.content) : Lang.sprintf("CONTRAST_ERROR") + ratioTip,
              dismiss: prepareDismissal(`CONTRAST${sanitizedText}`),
              dismissAll: option.checks.CONTRAST_ERROR.dismissAll ? "CONTRAST_ERROR" : false,
              developer: option.checks.CONTRAST_ERROR.developer || false,
              contrastDetails: updatedItem
            });
          }
          break;
        case "input":
          if (option.checks.CONTRAST_INPUT) {
            const sanitizedInput = sanitizeHTMLBlock($el.outerHTML);
            results.push({
              test: "CONTRAST_INPUT",
              element,
              type: option.checks.CONTRAST_INPUT.type || "error",
              content: option.checks.CONTRAST_INPUT.content ? Lang.sprintf(option.checks.CONTRAST_INPUT.content) : Lang.sprintf("CONTRAST_INPUT", ratio) + ratioTip,
              dismiss: prepareDismissal(`CONTRAST${sanitizedInput}`),
              dismissAll: option.checks.CONTRAST_INPUT.dismissAll ? "CONTRAST_INPUT" : false,
              developer: option.checks.CONTRAST_INPUT.developer || true,
              contrastDetails: updatedItem
            });
          }
          break;
        case "placeholder":
          if (option.checks.CONTRAST_PLACEHOLDER) {
            const sanitizedPlaceholder = sanitizeHTMLBlock($el.outerHTML);
            results.push({
              test: "CONTRAST_PLACEHOLDER",
              element: $el,
              type: option.checks.CONTRAST_PLACEHOLDER.type || "error",
              content: option.checks.CONTRAST_PLACEHOLDER.content ? Lang.sprintf(option.checks.CONTRAST_PLACEHOLDER.content) : Lang.sprintf("CONTRAST_PLACEHOLDER") + ratioTip,
              position: "afterend",
              dismiss: prepareDismissal(`CPLACEHOLDER${sanitizedPlaceholder}`),
              dismissAll: option.checks.CONTRAST_PLACEHOLDER.dismissAll ? "CONTRAST_PLACEHOLDER" : false,
              developer: option.checks.CONTRAST_PLACEHOLDER.developer || true,
              contrastDetails: updatedItem
            });
          }
          break;
        case "placeholder-unsupported":
          if (option.checks.CONTRAST_PLACEHOLDER_UNSUPPORTED) {
            const sanitizedPlaceholder = sanitizeHTMLBlock($el.outerHTML);
            results.push({
              test: "CONTRAST_PLACEHOLDER_UNSUPPORTED",
              element: $el,
              type: option.checks.CONTRAST_PLACEHOLDER_UNSUPPORTED.type || "warning",
              content: option.checks.CONTRAST_PLACEHOLDER_UNSUPPORTED.content ? Lang.sprintf(option.checks.CONTRAST_PLACEHOLDER_UNSUPPORTED.content) : Lang.sprintf("CONTRAST_PLACEHOLDER_UNSUPPORTED") + ratioTip,
              position: "afterend",
              dismiss: prepareDismissal(`CPLACEHOLDERUN${sanitizedPlaceholder}`),
              dismissAll: option.checks.CONTRAST_PLACEHOLDER_UNSUPPORTED.dismissAll ? "CONTRAST_PLACEHOLDER_UNSUPPORTED" : false,
              developer: option.checks.CONTRAST_PLACEHOLDER_UNSUPPORTED.developer || true,
              contrastDetails: updatedItem
            });
          }
          break;
        case "svg-error":
          if (option.checks.CONTRAST_ERROR_GRAPHIC) {
            const sanitizedSVG = sanitizeHTMLBlock($el.outerHTML);
            results.push({
              test: "CONTRAST_ERROR_GRAPHIC",
              element: $el,
              type: option.checks.CONTRAST_ERROR_GRAPHIC.type || "error",
              content: option.checks.CONTRAST_ERROR_GRAPHIC.content ? Lang.sprintf(option.checks.CONTRAST_ERROR_GRAPHIC.content) : Lang.sprintf("CONTRAST_ERROR_GRAPHIC") + graphicsTip,
              dismiss: prepareDismissal(`CONTRASTERROR${sanitizedSVG}`),
              dismissAll: option.checks.CONTRAST_ERROR_GRAPHIC.dismissAll ? "CONTRAST_ERROR_GRAPHIC" : false,
              developer: option.checks.CONTRAST_ERROR_GRAPHIC.developer || true,
              contrastDetails: updatedItem,
              margin: "-25px"
            });
          }
          break;
        case "svg-warning":
          if (option.checks.CONTRAST_WARNING_GRAPHIC) {
            const sanitizedSVG = sanitizeHTMLBlock($el.outerHTML);
            results.push({
              test: "CONTRAST_WARNING_GRAPHIC",
              element: $el,
              type: option.checks.CONTRAST_WARNING_GRAPHIC.type || "warning",
              content: option.checks.CONTRAST_WARNING_GRAPHIC.content ? Lang.sprintf(option.checks.CONTRAST_WARNING_GRAPHIC.content) : Lang.sprintf("CONTRAST_WARNING_GRAPHIC") + graphicsTip,
              dismiss: prepareDismissal(`CONTRASTWARNING${sanitizedSVG}`),
              dismissAll: option.checks.CONTRAST_WARNING_GRAPHIC.dismissAll ? "CONTRAST_WARNING_GRAPHIC" : false,
              developer: option.checks.CONTRAST_WARNING_GRAPHIC.developer || true,
              contrastDetails: updatedItem,
              margin: "-25px"
            });
          }
          break;
        case "background-image":
          if (option.checks.CONTRAST_WARNING) {
            results.push({
              test: "CONTRAST_WARNING",
              element,
              type: option.checks.CONTRAST_WARNING.type || "warning",
              content: option.checks.CONTRAST_WARNING.content ? Lang.sprintf(option.checks.CONTRAST_WARNING.content) : Lang.sprintf("CONTRAST_WARNING") + ratioTip,
              dismiss: prepareDismissal(`CONTRAST${sanitizedText}`),
              dismissAll: option.checks.CONTRAST_WARNING.dismissAll ? "CONTRAST_WARNING" : false,
              developer: option.checks.CONTRAST_WARNING.developer || false,
              contrastDetails: updatedItem
            });
          }
          break;
        case "unsupported":
          if (option.checks.CONTRAST_UNSUPPORTED) {
            results.push({
              test: "CONTRAST_UNSUPPORTED",
              element,
              type: option.checks.CONTRAST_UNSUPPORTED.type || "warning",
              content: option.checks.CONTRAST_UNSUPPORTED.content ? Lang.sprintf(option.checks.CONTRAST_UNSUPPORTED.content) : Lang.sprintf("CONTRAST_WARNING") + ratioTip,
              dismiss: prepareDismissal(`CONTRAST${sanitizedText}`),
              dismissAll: option.checks.CONTRAST_UNSUPPORTED.dismissAll ? "CONTRAST_UNSUPPORTED" : false,
              developer: option.checks.CONTRAST_UNSUPPORTED.developer || false,
              contrastDetails: updatedItem
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
        const ariaHidden = $el.getAttribute("aria-hidden") === "true";
        const negativeTabindex = $el.getAttribute("tabindex") === "-1";
        const hidden = isElementHidden($el);
        if (hidden || ariaHidden && negativeTabindex) {
          return;
        }
        const computeName = computeAccessibleName($el);
        const inputName = removeWhitespace(computeName);
        const alt = $el.getAttribute("alt");
        const type = $el.getAttribute("type");
        const hasTitle = $el.getAttribute("title");
        const hasPlaceholder = $el.placeholder && $el.placeholder !== 0;
        const hasAria = $el.getAttribute("aria-label") || $el.getAttribute("aria-labelledby");
        if (type === "submit" || type === "button" || type === "hidden") {
          return;
        }
        if (type === "image") {
          if (option.checks.LABELS_MISSING_IMAGE_INPUT && (!alt || alt.trim() === "") && !hasAria && !hasTitle) {
            results.push({
              test: "LABELS_MISSING_IMAGE_INPUT",
              element: $el,
              type: option.checks.LABELS_MISSING_IMAGE_INPUT.type || "error",
              content: Lang.sprintf(
                option.checks.LABELS_MISSING_IMAGE_INPUT.content || "LABELS_MISSING_IMAGE_INPUT"
              ),
              dismiss: prepareDismissal(`INPUTIMAGE${type + inputName}`),
              dismissAll: option.checks.LABELS_MISSING_IMAGE_INPUT.dismissAll ? "LABELS_MISSING_IMAGE_INPUT" : false,
              developer: option.checks.LABELS_MISSING_IMAGE_INPUT.developer || true
            });
          }
          return;
        }
        if (type === "reset") {
          if (option.checks.LABELS_INPUT_RESET) {
            results.push({
              test: "LABELS_INPUT_RESET",
              element: $el,
              type: option.checks.LABELS_INPUT_RESET.type || "warning",
              content: Lang.sprintf(option.checks.LABELS_INPUT_RESET.content || "LABELS_INPUT_RESET"),
              dismiss: prepareDismissal(`INPUTRESET${type + inputName}`),
              dismissAll: option.checks.LABELS_INPUT_RESET.dismissAll ? "LABELS_INPUT_RESET" : false,
              developer: option.checks.LABELS_INPUT_RESET.developer || false
            });
          }
          return;
        }
        if (hasAria || hasTitle || hasPlaceholder) {
          if (hasPlaceholder && option.checks.LABELS_PLACEHOLDER) {
            results.push({
              test: "LABELS_PLACEHOLDER",
              element: $el,
              type: option.checks.LABELS_PLACEHOLDER.type || "warning",
              content: Lang.sprintf(option.checks.LABELS_PLACEHOLDER.content || "LABELS_PLACEHOLDER"),
              dismiss: prepareDismissal(`INPUTPLACEHOLDER${type + inputName}`),
              dismissAll: option.checks.LABELS_PLACEHOLDER.dismissAll ? "LABELS_PLACEHOLDER" : false,
              developer: option.checks.LABELS_PLACEHOLDER.developer || true
            });
          } else if (inputName.length === 0) {
            if (option.checks.LABELS_MISSING_LABEL) {
              results.push({
                test: "LABELS_MISSING_LABEL",
                element: $el,
                type: option.checks.LABELS_MISSING_LABEL.type || "error",
                content: Lang.sprintf(
                  option.checks.LABELS_MISSING_LABEL.content || "LABELS_MISSING_LABEL"
                ),
                dismiss: prepareDismissal(`INPUTMISSING${type + inputName}`),
                dismissAll: option.checks.LABELS_MISSING_LABEL.dismissAll ? "LABELS_MISSING_LABEL" : false,
                developer: option.checks.LABELS_MISSING_LABEL.developer || true
              });
            }
          } else if (option.checks.LABELS_ARIA_LABEL_INPUT) {
            const sanitizedText = sanitizeHTML(inputName);
            results.push({
              test: "LABELS_ARIA_LABEL_INPUT",
              element: $el,
              type: option.checks.LABELS_ARIA_LABEL_INPUT.type || "warning",
              content: option.checks.LABELS_ARIA_LABEL_INPUT.content ? Lang.sprintf(option.checks.LABELS_ARIA_LABEL_INPUT.content, sanitizedText) : `${Lang.sprintf("LABELS_ARIA_LABEL_INPUT", sanitizedText)} ${Lang.sprintf("ACC_NAME_TIP")}`,
              dismiss: prepareDismissal(`INPUTARIA${type + inputName}`),
              dismissAll: option.checks.LABELS_ARIA_LABEL_INPUT.dismissAll ? "LABELS_ARIA_LABEL_INPUT" : false,
              developer: option.checks.LABELS_ARIA_LABEL_INPUT.developer || true
            });
          }
          return;
        }
        const closestLabel = $el.closest("label");
        const labelName = closestLabel ? removeWhitespace(computeAccessibleName(closestLabel)) : "";
        if (closestLabel && labelName.length) {
          return;
        }
        const id = $el.getAttribute("id");
        if (id) {
          if (!Elements.Found.Labels.some((label) => label.getAttribute("for") === id)) {
            if (option.checks.LABELS_NO_FOR_ATTRIBUTE) {
              results.push({
                test: "LABELS_NO_FOR_ATTRIBUTE",
                element: $el,
                type: option.checks.LABELS_NO_FOR_ATTRIBUTE.type || "error",
                content: Lang.sprintf(
                  option.checks.LABELS_NO_FOR_ATTRIBUTE.content || "LABELS_NO_FOR_ATTRIBUTE",
                  id
                ),
                dismiss: prepareDismissal(`INPUTNOFOR${type + inputName}`),
                dismissAll: option.checks.LABELS_NO_FOR_ATTRIBUTE.dismissAll ? "LABELS_NO_FOR_ATTRIBUTE" : false,
                developer: option.checks.LABELS_NO_FOR_ATTRIBUTE.developer || true
              });
            }
          }
        } else if (option.checks.LABELS_MISSING_LABEL) {
          results.push({
            test: "LABELS_MISSING_LABEL",
            element: $el,
            type: option.checks.LABELS_MISSING_LABEL.type || "error",
            content: Lang.sprintf(
              option.checks.LABELS_MISSING_LABEL.content || "LABELS_MISSING_LABEL"
            ),
            dismiss: prepareDismissal(`INPUTNOID${type + inputName}`),
            dismissAll: option.checks.LABELS_MISSING_LABEL.dismissAll ? "LABELS_MISSING_LABEL" : false,
            developer: option.checks.LABELS_MISSING_LABEL.developer || true
          });
        }
      });
    }
    return results;
  }
  function computeReadability(textArray, lang) {
    const readabilityArray = [];
    const punctuation = [".", "?", "!"];
    textArray.forEach((text) => {
      const lastCharacter = text[text.length - 1];
      const sentence = punctuation.includes(lastCharacter) ? text : `${text}.`;
      readabilityArray.push(sentence);
    });
    const pageText = readabilityArray.join(" ");
    if (pageText.length === 0) {
      return null;
    }
    if (["en", "es", "fr", "de", "nl", "it", "pt"].includes(lang)) {
      const numberOfSyllables = (el) => {
        let wordCheck = el;
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
      if (fleschScore >= 0 && fleschScore < 30) {
        difficultyToken = "VERY_DIFFICULT";
      } else if (fleschScore > 31 && fleschScore < 49) {
        difficultyToken = "DIFFICULT";
      } else if (fleschScore > 50 && fleschScore < 60) {
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
      if (score >= 0 && score < 39) {
        difficultyToken = "GOOD";
      } else if (score > 40 && score < 50) {
        difficultyToken = "FAIRLY_DIFFICULT";
      } else if (score > 51 && score < 61) {
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
  function checkReadability(results) {
    const pageText = Elements.Found.Readability.map(
      ($el) => getText(fnIgnore($el))
    ).filter(Boolean);
    const computed = computeReadability(pageText, Constants.Readability.Lang);
    let result;
    if (computed) {
      result = {
        test: "READABILITY",
        difficultyLevel: Lang._(computed.difficultyToken),
        ...computed
      };
      results.push(result);
    }
    if (Constants.Global.headless === false) {
      if (computed && result.wordCount > 30) {
        Constants.Panel.readabilityInfo.innerHTML = `${Math.ceil(result.score)} <span class="readability-score">${result.difficultyLevel}</span>`;
        Constants.Panel.readabilityDetails.innerHTML = `<li><strong>${Lang._("AVG_SENTENCE")}</strong> ${Math.ceil(result.averageWordsPerSentence)}</li><li><strong>${Lang._("COMPLEX_WORDS")}</strong> ${result.complexWords}%</li><li><strong>${Lang._("TOTAL_WORDS")}</strong> ${result.wordCount}</li>`;
      } else {
        Constants.Panel.readabilityInfo.innerHTML = `<br>${Lang._("READABILITY_NOT_ENOUGH")}`;
      }
    }
    return results;
  }
  function checkEmbeddedContent(results, option) {
    const src = ($el) => $el.getAttribute("src") || $el.querySelector("source[src]")?.getAttribute("src") || $el.querySelector("[src]")?.getAttribute("src") || null;
    if (option.checks.EMBED_AUDIO) {
      Elements.Found.Audio.forEach(($el) => {
        results.push({
          test: "EMBED_AUDIO",
          element: $el,
          type: option.checks.EMBED_AUDIO.type || "warning",
          content: Lang.sprintf(option.checks.EMBED_AUDIO.content || "EMBED_AUDIO"),
          dismiss: prepareDismissal(`AUDIO${src($el)}`),
          dismissAll: option.checks.EMBED_AUDIO.dismissAll ? "EMBED_AUDIO" : false,
          developer: option.checks.EMBED_AUDIO.developer || false
        });
      });
    }
    if (option.checks.EMBED_VIDEO) {
      Elements.Found.Videos.forEach(($el) => {
        const track = $el.querySelector("track");
        const trackSrc = track?.getAttribute("src");
        if (track === null || trackSrc === null || trackSrc.trim().length === 0) {
          results.push({
            test: "EMBED_VIDEO",
            element: $el,
            type: option.checks.EMBED_VIDEO.type || "warning",
            content: Lang.sprintf(option.checks.EMBED_VIDEO.content || "EMBED_VIDEO"),
            dismiss: prepareDismissal(`VIDEO${src($el)}`),
            dismissAll: option.checks.EMBED_VIDEO.dismissAll ? "EMBED_VIDEO" : false,
            developer: option.checks.EMBED_VIDEO.developer || false
          });
        }
      });
    }
    if (option.checks.EMBED_DATA_VIZ) {
      Elements.Found.Visualizations.forEach(($el) => {
        results.push({
          test: "EMBED_DATA_VIZ",
          element: $el,
          type: option.checks.EMBED_DATA_VIZ.type || "warning",
          content: Lang.sprintf(option.checks.EMBED_DATA_VIZ.content || "EMBED_DATA_VIZ"),
          dismiss: prepareDismissal(`DATAVIZ${src($el)}`),
          dismissAll: option.checks.EMBED_DATA_VIZ.dismissAll ? "EMBED_DATA_VIZ" : false,
          developer: option.checks.EMBED_DATA_VIZ.developer || false
        });
      });
    }
    Elements.Found.iframes.forEach(($el) => {
      const presentation = ["presentation", "none"].includes($el.getAttribute("role"));
      const hidden = isElementHidden($el);
      const videoAudio = $el.tagName === "VIDEO" || $el.tagName === "AUDIO";
      const ariaHidden = $el.getAttribute("aria-hidden") === "true";
      const negativeTabindex = $el.getAttribute("tabindex") === "-1";
      if (hidden || videoAudio || ariaHidden && negativeTabindex || presentation) {
        return;
      }
      if (negativeTabindex) {
        if (option.checks.EMBED_UNFOCUSABLE) {
          results.push({
            test: "EMBED_UNFOCUSABLE",
            element: $el,
            type: option.checks.EMBED_UNFOCUSABLE.type || "error",
            content: Lang.sprintf(option.checks.EMBED_UNFOCUSABLE.content || "EMBED_UNFOCUSABLE"),
            dismiss: prepareDismissal(`EMBEDUNFOCUSABLE${src($el)}`),
            dismissAll: option.checks.EMBED_UNFOCUSABLE.dismissAll ? "EMBED_UNFOCUSABLE" : false,
            developer: option.checks.EMBED_UNFOCUSABLE.developer || true
          });
        }
        return;
      }
      if (option.checks.EMBED_MISSING_TITLE) {
        const aria = computeAriaLabel($el);
        const checkTitle = aria === "noAria" ? $el.getAttribute("title") || "" : aria;
        const accessibleName = removeWhitespace(checkTitle);
        if (accessibleName.length === 0) {
          results.push({
            test: "EMBED_MISSING_TITLE",
            element: $el,
            type: option.checks.EMBED_MISSING_TITLE.type || "error",
            content: Lang.sprintf(option.checks.EMBED_MISSING_TITLE.content || "EMBED_MISSING_TITLE"),
            dismiss: prepareDismissal(`EMBEDMISSTITLE${src($el)}`),
            dismissAll: option.checks.EMBED_MISSING_TITLE.dismissAll ? "EMBED_MISSING_TITLE" : false,
            developer: option.checks.EMBED_MISSING_TITLE.developer || true
          });
        }
      }
    });
    if (option.checks.EMBED_GENERAL) {
      Elements.Found.EmbeddedContent.forEach(($el) => {
        const presentation = ["presentation", "none"].includes($el.getAttribute("role"));
        const ariaHidden = $el.getAttribute("aria-hidden") === "true";
        const negativeTabindex = $el.getAttribute("tabindex") === "-1";
        const hidden = isElementHidden($el);
        if (hidden || ariaHidden && negativeTabindex || presentation) {
          return;
        }
        if ($el.tagName === "VIDEO" || $el.tagName === "AUDIO") {
          return;
        }
        results.push({
          test: "EMBED_GENERAL",
          element: $el,
          type: option.checks.EMBED_GENERAL.type || "warning",
          content: Lang.sprintf(option.checks.EMBED_GENERAL.content || "EMBED_GENERAL"),
          dismiss: prepareDismissal(`IFRAMEGENERAL${src($el)}`),
          dismissAll: option.checks.EMBED_GENERAL.dismissAll ? "EMBED_GENERAL" : false,
          developer: option.checks.EMBED_GENERAL.developer || false
        });
      });
    }
    return results;
  }
  function checkQA(results, option) {
    if (option.checks.QA_BAD_LINK) {
      Elements.Found.CustomErrorLinks.forEach(($el) => {
        results.push({
          test: "QA_BAD_LINK",
          element: $el,
          type: option.checks.QA_BAD_LINK.type || "error",
          content: Lang.sprintf(option.checks.QA_BAD_LINK.content || "QA_BAD_LINK", $el),
          inline: true,
          dismiss: prepareDismissal($el.tagName + $el.textContent),
          dismissAll: option.checks.QA_BAD_LINK.dismissAll ? "QA_BAD_LINK" : false,
          developer: option.checks.QA_BAD_LINK.developer || false
        });
      });
    }
    if (option.checks.QA_STRONG_ITALICS) {
      Elements.Found.StrongItalics.forEach(($el) => {
        const text = getText($el);
        if (text.length !== 0 && text.length > 400) {
          results.push({
            test: "QA_STRONG_ITALICS",
            element: $el.parentNode,
            type: option.checks.QA_STRONG_ITALICS.type || "warning",
            content: Lang.sprintf(option.checks.QA_STRONG_ITALICS.content || "QA_STRONG_ITALICS"),
            dismiss: prepareDismissal($el.tagName + $el.textContent),
            dismissAll: option.checks.QA_STRONG_ITALICS.dismissAll ? "QA_STRONG_ITALICS" : false,
            developer: option.checks.QA_STRONG_ITALICS.developer || false
          });
        }
      });
    }
    Elements.Found.Links.forEach(($el) => {
      if ($el.hasAttribute("href")) {
        const href = $el.getAttribute("href");
        const hasExtension = $el.matches(Constants.Global.documentSources);
        const hasPDF = $el.matches('a[href$=".pdf"], a[href*=".pdf?"]');
        if (option.checks.QA_IN_PAGE_LINK) {
          const hasText = getText($el).length !== 0;
          const ignored = $el.ariaHidden === "true" && $el.getAttribute("tabindex") === "-1";
          const hasAttributes = $el.hasAttribute("role") || $el.hasAttribute("aria-haspopup") || $el.hasAttribute("aria-expanded") || $el.hasAttribute("onclick") || $el.hasAttribute("disabled") || $el.closest('nav, [role="navigation"]');
          if ((href.startsWith("#") || href === "") && hasText && !ignored && !hasAttributes) {
            const targetId = href.substring(1);
            const ariaControls = $el.getAttribute("aria-controls");
            const targetElement = targetId && (document.getElementById(targetId) || document.getElementById(decodeURIComponent(targetId)) || document.getElementById(encodeURIComponent(targetId)) || document.getElementById(ariaControls) || document.querySelector(`a[name="${targetId}"]`));
            if (!targetElement) {
              results.push({
                test: "QA_IN_PAGE_LINK",
                element: $el,
                type: option.checks.QA_IN_PAGE_LINK.type || "error",
                content: Lang.sprintf(option.checks.QA_IN_PAGE_LINK.content || "QA_IN_PAGE_LINK"),
                inline: true,
                dismiss: prepareDismissal(`QAINPAGE${href}`),
                dismissAll: option.checks.QA_IN_PAGE_LINK.dismissAll ? "QA_IN_PAGE_LINK" : false,
                developer: option.checks.QA_IN_PAGE_LINK.developer || false
              });
            }
          }
        }
        if (option.checks.QA_DOCUMENT && hasExtension) {
          results.push({
            test: "QA_DOCUMENT",
            element: $el,
            type: option.checks.QA_DOCUMENT.type || "warning",
            content: Lang.sprintf(option.checks.QA_DOCUMENT.content || "QA_DOCUMENT"),
            inline: true,
            dismiss: prepareDismissal(`DOC${href}`),
            dismissAll: option.checks.QA_DOCUMENT.dismissAll ? "QA_DOCUMENT" : false,
            developer: option.checks.QA_DOCUMENT.developer || false
          });
        } else if (option.checks.QA_PDF && hasPDF) {
          results.push({
            test: "QA_PDF",
            element: $el,
            type: option.checks.QA_PDF.type || "warning",
            content: Lang.sprintf(option.checks.QA_PDF.content || "QA_PDF"),
            inline: true,
            dismiss: prepareDismissal(`PDF${href}`),
            dismissAll: option.checks.QA_PDF.dismissAll ? "QA_PDF" : false,
            developer: option.checks.QA_PDF.developer || false
          });
        }
      }
    });
    if (option.checks.QA_BLOCKQUOTE) {
      Elements.Found.Blockquotes.forEach(($el) => {
        const text = getText($el);
        if (text.length !== 0 && text.length < 25) {
          const sanitizedText = sanitizeHTML(text);
          results.push({
            test: "QA_BLOCKQUOTE",
            element: $el,
            type: option.checks.QA_BLOCKQUOTE.type || "warning",
            content: Lang.sprintf(
              option.checks.QA_BLOCKQUOTE.content || "QA_BLOCKQUOTE",
              sanitizedText
            ),
            dismiss: prepareDismissal(`BLOCKQUOTE${sanitizedText}`),
            dismissAll: option.checks.QA_BLOCKQUOTE.dismissAll ? "QA_BLOCKQUOTE" : false,
            developer: option.checks.QA_BLOCKQUOTE.developer || false
          });
        }
      });
    }
    Elements.Found.Tables.forEach(($el) => {
      if (isElementHidden($el) === false) {
        const tableHeaders = $el.querySelectorAll("th");
        const semanticHeadings = $el.querySelectorAll("h1, h2, h3, h4, h5, h6");
        const key = prepareDismissal(`TABLE${$el.textContent}`);
        if (option.checks.TABLES_MISSING_HEADINGS && tableHeaders.length === 0) {
          results.push({
            test: "TABLES_MISSING_HEADINGS",
            element: $el,
            type: option.checks.TABLES_MISSING_HEADINGS.type || "error",
            content: Lang.sprintf(
              option.checks.TABLES_MISSING_HEADINGS.content || "TABLES_MISSING_HEADINGS"
            ),
            dismiss: key,
            dismissAll: option.checks.TABLES_MISSING_HEADINGS.dismissAll ? "TABLES_MISSING_HEADINGS" : false,
            developer: option.checks.TABLES_MISSING_HEADINGS.developer || false
          });
        }
        if (option.checks.TABLES_SEMANTIC_HEADING && semanticHeadings.length > 0) {
          semanticHeadings.forEach((heading) => {
            results.push({
              test: "TABLES_SEMANTIC_HEADING",
              element: heading,
              type: option.checks.TABLES_SEMANTIC_HEADING.type || "error",
              content: Lang.sprintf(
                option.checks.TABLES_SEMANTIC_HEADING.content || "TABLES_SEMANTIC_HEADING"
              ),
              dismiss: key,
              dismissAll: option.checks.TABLES_SEMANTIC_HEADING.dismissAll ? "TABLES_SEMANTIC_HEADING" : false,
              developer: option.checks.TABLES_SEMANTIC_HEADING.developer || false
            });
          });
        }
        tableHeaders.forEach((th) => {
          if (option.checks.TABLES_EMPTY_HEADING && th.textContent.trim().length === 0) {
            results.push({
              test: "TABLES_EMPTY_HEADING",
              element: th,
              type: option.checks.TABLES_EMPTY_HEADING.type || "error",
              content: Lang.sprintf(
                option.checks.TABLES_EMPTY_HEADING.content || "TABLES_EMPTY_HEADING"
              ),
              position: "afterbegin",
              dismiss: key,
              dismissAll: option.checks.TABLES_EMPTY_HEADING.dismissAll ? "TABLES_EMPTY_HEADING" : false,
              developer: option.checks.TABLES_EMPTY_HEADING.developer || false
            });
          }
        });
      }
    });
    if (option.checks.QA_FAKE_HEADING) {
      const addResult = (element, sanitizedText) => {
        results.push({
          test: "QA_FAKE_HEADING",
          element,
          type: option.checks.QA_FAKE_HEADING.type || "warning",
          content: Lang.sprintf(
            option.checks.QA_FAKE_HEADING.content || "QA_FAKE_HEADING",
            sanitizedText
          ),
          dismiss: prepareDismissal(`BOLD${sanitizedText}`),
          inline: true,
          dismissAll: option.checks.QA_FAKE_HEADING.dismissAll ? "QA_FAKE_HEADING" : false,
          developer: option.checks.QA_FAKE_HEADING.developer || false
        });
      };
      const isPreviousElementAHeading = (p) => {
        const previousElement = p.previousElementSibling;
        if (!previousElement) {
          return false;
        }
        const headingTags = ["H1", "H2", "H3", "H4", "H5", "H6"];
        return headingTags.includes(previousElement.tagName);
      };
      const ignoreParents = 'h1, h2, h3, h4, h5, h6, [role="heading"][aria-level], blockquote, table';
      const computeLargeParagraphs = (p) => {
        const size = getComputedStyle(p).fontSize.replace("px", "");
        const getText$1 = getText(p);
        const maybeSentence = getText$1.match(/[.;?!"]/) === null;
        const typicalHeadingLength = getText$1.length >= 4 && getText$1.length <= 120;
        if (size >= 24 && !p.closest(ignoreParents) && typicalHeadingLength && maybeSentence && !isPreviousElementAHeading(p)) {
          const sanitizedText = sanitizeHTML(getText$1);
          addResult(p, sanitizedText);
        }
      };
      const computeBoldTextParagraphs = (p) => {
        const startsWithBold = /^<\s*(strong|b)(\s+[^>]*)?>/i.test(p.innerHTML.trim());
        if (startsWithBold && !p.closest(ignoreParents)) {
          const possibleHeading = p.querySelector("strong, b");
          const possibleHeadingText = getText(possibleHeading);
          const notASentence = possibleHeadingText.match(/[.:;?!"']/) === null;
          const typicalHeadingLength = possibleHeadingText.length >= 3 && possibleHeadingText.length <= 120;
          if (typicalHeadingLength && notASentence) {
            const nonHeadingTextLength = fnIgnore(p, ["strong", "b"]).textContent.trim().length;
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
    if (option.checks.QA_FAKE_LIST) {
      const numberMatch = new RegExp(/(([023456789][\d\s])|(1\d))/, "");
      const alphabeticMatch = new RegExp(/(^[aA1αаΑ]|[^p{Alphabetic}\s])[-\s.)]/, "u");
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
      const decrement = (element) => element.replace(/^b|^B|^б|^Б|^β|^В|^2/, (match) => prefixDecrement[match]);
      let activeMatch = "";
      let firstText = "";
      let lastHitWasEmoji = false;
      Elements.Found.Paragraphs.forEach((p, i) => {
        let secondText = false;
        let hit = false;
        firstText = firstText || getText(p).replace("(", "");
        const firstPrefix = firstText.substring(0, 2);
        const isAlphabetic = firstPrefix.match(alphabeticMatch);
        const isNumber = firstPrefix.match(numberMatch);
        const isEmoji = firstPrefix.match(emojiMatch);
        const isSpecialChar = specialCharsMatch.test(firstPrefix.charAt(0));
        if (firstPrefix.length > 0 && firstPrefix !== activeMatch && !isNumber && (isAlphabetic || isEmoji || isSpecialChar)) {
          const secondP = Elements.Found.Paragraphs[i + 1];
          if (secondP) {
            secondText = getText(secondP).replace("(", "").substring(0, 2);
            if (secondTextNoMatch.includes(secondText?.toLowerCase().trim())) {
              return;
            }
            const secondPrefix = decrement(secondText);
            if (isAlphabetic) {
              if (firstPrefix !== "A " && firstPrefix === secondPrefix) {
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
              if (checkForOtherPrefixChars || firstPrefix === decrement(textAfterBreak) || !lastHitWasEmoji && textAfterBreak.match(emojiMatch)) {
                hit = true;
              }
            }
          }
          if (hit) {
            results.push({
              test: "QA_FAKE_LIST",
              element: p,
              type: option.checks.QA_FAKE_LIST.type || "warning",
              content: Lang.sprintf(
                option.checks.QA_FAKE_LIST.content || "QA_FAKE_LIST",
                firstPrefix
              ),
              dismiss: prepareDismissal(`LIST${p.textContent}`),
              dismissAll: option.checks.QA_FAKE_LIST.dismissAll ? "QA_FAKE_LIST" : false,
              developer: option.checks.QA_FAKE_LIST.developer || false
            });
            activeMatch = firstPrefix;
          } else {
            activeMatch = "";
          }
        }
        firstText = secondText ? "" : secondText;
      });
    }
    if (option.checks.QA_UPPERCASE) {
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
          results.push({
            test: "QA_UPPERCASE",
            element: $el,
            type: option.checks.QA_UPPERCASE.type || "warning",
            content: Lang.sprintf(option.checks.QA_UPPERCASE.content || "QA_UPPERCASE"),
            dismiss: prepareDismissal(`UPPERCASE${thisText}`),
            dismissAll: option.checks.QA_UPPERCASE.dismissAll ? "QA_UPPERCASE" : false,
            developer: option.checks.QA_UPPERCASE.developer || false
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
      results.push({
        test: "QA_UNDERLINE",
        element: $el,
        type: option.checks.QA_UNDERLINE.type || "warning",
        content: Lang.sprintf(option.checks.QA_UNDERLINE.content || "QA_UNDERLINE"),
        inline: true,
        dismiss: prepareDismissal(`UNDERLINE${$el.textContent}`),
        dismissAll: option.checks.QA_UNDERLINE.dismissAll ? "QA_UNDERLINE" : false,
        developer: option.checks.QA_UNDERLINE.developer || false
      });
    };
    const addJustifyResult = ($el) => {
      results.push({
        test: "QA_JUSTIFY",
        element: $el,
        type: option.checks.QA_JUSTIFY.type || "warning",
        content: Lang.sprintf(option.checks.QA_JUSTIFY.content || "QA_JUSTIFY"),
        dismiss: prepareDismissal(`JUSTIFIED${$el.textContent}`),
        dismissAll: option.checks.QA_JUSTIFY.dismissAll ? "QA_JUSTIFY" : false,
        developer: option.checks.QA_JUSTIFY.developer || false
      });
    };
    const addSmallTextResult = ($el) => {
      results.push({
        test: "QA_SMALL_TEXT",
        element: $el,
        type: option.checks.QA_SMALL_TEXT.type || "warning",
        content: Lang.sprintf(option.checks.QA_SMALL_TEXT.content || "QA_SMALL_TEXT"),
        dismiss: prepareDismissal(`SMALL${$el.textContent}`),
        dismissAll: option.checks.QA_SMALL_TEXT.dismissAll ? "QA_SMALL_TEXT" : false,
        developer: option.checks.QA_SMALL_TEXT.developer || false
      });
    };
    const computeStyle = ($el) => {
      const style = getComputedStyle($el);
      const { textDecorationLine, textAlign, fontSize } = style;
      const interactive = 'a[href], button, abbr, [role="link"], [role="button"], [tabindex="0"], [onclick]';
      if (option.checks.QA_UNDERLINE && ($el.closest("u") || textDecorationLine === "underline") && !$el.closest(interactive) && !$el.matches(interactive)) {
        addUnderlineResult($el);
      }
      const defaultSize = option.checks.QA_SMALL_TEXT.fontSize || 10;
      const computedFontSize = parseFloat(fontSize);
      const parentFontSize = $el.parentElement ? parseFloat(getComputedStyle($el.parentElement).fontSize) : null;
      const isInherited = parentFontSize === computedFontSize;
      const withinRange = !isInherited && computedFontSize > 1 && computedFontSize <= defaultSize;
      if (option.checks.QA_SMALL_TEXT && withinRange) {
        addSmallTextResult($el);
      }
      const parentJustify = $el.parentElement ? getComputedStyle($el.parentElement).textAlign : null;
      const justifyInherited = parentJustify === textAlign;
      if (option.checks.QA_JUSTIFY && textAlign === "justify" && !justifyInherited) {
        addJustifyResult($el);
      }
    };
    if (option.checks.QA_UNDERLINE || option.checks.QA_JUSTIFY || option.checks.QA_SMALL_TEXT) {
      for (let i = 0; i < Elements.Found.Everything.length; i++) {
        const $el = Elements.Found.Everything[i];
        const textString = Array.from($el.childNodes).filter((node) => node.nodeType === 3).map((node) => node.textContent).join("");
        const text = textString.trim();
        if (text.length !== 0) {
          computeStyle($el);
        }
      }
    }
    if (option.checks.QA_SUBSCRIPT) {
      Elements.Found.Subscripts.forEach(($el) => {
        const text = getText($el);
        if (text.length >= 80) {
          results.push({
            test: "QA_SUBSCRIPT",
            element: $el,
            type: option.checks.QA_SUBSCRIPT.type || "warning",
            content: Lang.sprintf(option.checks.QA_SUBSCRIPT.content || "QA_SUBSCRIPT"),
            inline: true,
            dismiss: prepareDismissal($el.tagName + text),
            dismissAll: option.checks.QA_SUBSCRIPT.dismissAll ? "QA_SUBSCRIPT" : false,
            developer: option.checks.QA_SUBSCRIPT.developer || false
          });
        }
      });
    }
    if (option.checks.QA_NESTED_COMPONENTS) {
      Elements.Found.NestedComponents.forEach(($el) => {
        const sources = option.checks.QA_NESTED_COMPONENTS.sources || '[role="tablist"], details';
        const component = $el.querySelector(sources);
        if (component) {
          results.push({
            test: "QA_NESTED_COMPONENTS",
            element: $el,
            type: option.checks.QA_NESTED_COMPONENTS.type || "warning",
            content: Lang.sprintf(
              option.checks.QA_NESTED_COMPONENTS.content || "QA_NESTED_COMPONENTS"
            ),
            dismiss: prepareDismissal(`NESTED${$el.textContent}`),
            dismissAll: option.checks.QA_NESTED_COMPONENTS.dismissAll ? "QA_NESTED_COMPONENTS" : false,
            developer: option.checks.QA_NESTED_COMPONENTS.developer || false
          });
        }
      });
    }
    return results;
  }
  function checkDeveloper(results, option) {
    if (option.checks.META_LANG) {
      if (!Elements.Found.Language || Elements.Found.Language.length < 2) {
        results.push({
          test: "META_LANG",
          type: option.checks.META_LANG.type || "error",
          content: Lang.sprintf(option.checks.META_LANG.content || "META_LANG"),
          dismiss: prepareDismissal("LANG"),
          developer: option.checks.META_LANG.developer || true
        });
      }
    }
    if (option.checks.META_TITLE) {
      const metaTitle = document.querySelector("title:not(svg title)");
      if (!metaTitle || metaTitle.textContent.trim().length === 0) {
        results.push({
          test: "META_TITLE",
          type: option.checks.META_TITLE.type || "error",
          content: Lang.sprintf(option.checks.META_TITLE.content || "META_TITLE"),
          dismiss: prepareDismissal("TITLE"),
          developer: option.checks.META_TITLE.developer || true
        });
      }
    }
    if (option.checks.META_SCALABLE || option.checks.META_MAX) {
      const metaViewport = document.querySelector('meta[name="viewport"]');
      if (metaViewport) {
        const content = metaViewport.getAttribute("content");
        if (content) {
          const params = content.split(",").reduce((acc, param) => {
            const [key, value] = param.split("=").map((s) => s.trim());
            acc[key] = value;
            return acc;
          }, {});
          if (option.checks.META_SCALABLE && (params["user-scalable"] === "no" || params["user-scalable"] === "0")) {
            results.push({
              test: "META_SCALABLE",
              type: option.checks.META_SCALABLE.type || "error",
              content: Lang.sprintf(option.checks.META_SCALABLE.content || "META_SCALABLE"),
              dismiss: prepareDismissal("SCALABLE"),
              developer: option.checks.META_SCALABLE.developer || true
            });
          }
          const maxScale = parseFloat(params["maximum-scale"]);
          if (option.checks.META_MAX && !Number.isNaN(maxScale) && maxScale < 2) {
            results.push({
              test: "META_MAX",
              type: option.checks.META_MAX.type || "error",
              content: Lang.sprintf(option.checks.META_MAX.content || "META_MAX"),
              dismiss: prepareDismissal("MAXSCALE"),
              developer: option.checks.META_MAX.developer || true
            });
          }
        }
      }
    }
    if (option.checks.META_REFRESH) {
      const metaRefresh = document.querySelector('meta[http-equiv="refresh"]');
      if (metaRefresh) {
        results.push({
          test: "META_REFRESH",
          type: option.checks.META_REFRESH.type || "error",
          content: Lang.sprintf(option.checks.META_REFRESH.content || "META_REFRESH"),
          dismiss: prepareDismissal("REFRESH"),
          developer: option.checks.META_REFRESH.developer || true
        });
      }
    }
    if (option.checks.DUPLICATE_ID) {
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
                results.push({
                  test: "DUPLICATE_ID",
                  element: $el,
                  type: option.checks.DUPLICATE_ID.type || "error",
                  content: Lang.sprintf(option.checks.DUPLICATE_ID.content || "DUPLICATE_ID", id),
                  dismiss: prepareDismissal(`DUPLICATEID${id}${$el.textContent}`),
                  dismissAll: option.checks.DUPLICATE_ID.dismissAll ? "DUPLICATE_ID" : false,
                  developer: option.checks.DUPLICATE_ID.developer || true
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
    if (option.checks.BTN_EMPTY || option.checks.BTN_EMPTY_LABELLEDBY || option.checks.BTN_LABEL || option.checks.HIDDEN_FOCUSABLE || option.checks.LABEL_IN_NAME) {
      Elements.Found.Buttons.forEach(($el) => {
        const accName = computeAccessibleName($el);
        const buttonText = accName.replace(/'|"|-|\.|\s+/g, "").toLowerCase();
        const key = prepareDismissal(`BTN${$el.tagName + $el.id + $el.className + accName}`);
        const hasAria = $el.querySelector(":scope [aria-labelledby], :scope [aria-label]") || $el.getAttribute("aria-labelledby") || $el.getAttribute("aria-label");
        const hasAriaLabelledby = $el.querySelector(":scope [aria-labelledby]") || $el.getAttribute("aria-labelledby");
        const ariaHidden = $el.getAttribute("aria-hidden") === "true";
        const negativeTabindex = $el.getAttribute("tabindex") === "-1";
        if (ariaHidden) {
          if (!negativeTabindex) {
            if (option.checks.HIDDEN_FOCUSABLE) {
              results.push({
                test: "HIDDEN_FOCUSABLE",
                element: $el,
                type: option.checks.HIDDEN_FOCUSABLE.type || "error",
                content: Lang.sprintf(option.checks.HIDDEN_FOCUSABLE.content || "HIDDEN_FOCUSABLE"),
                dismiss: key,
                dismissAll: option.checks.HIDDEN_FOCUSABLE.dismissAll ? "BTN_HIDDEN_FOCUSABLE" : false,
                developer: option.checks.HIDDEN_FOCUSABLE.developer || true
              });
            }
          }
          return;
        }
        if (buttonText.length === 0) {
          if (option.checks.BTN_EMPTY_LABELLEDBY && hasAriaLabelledby) {
            results.push({
              test: "BTN_EMPTY_LABELLEDBY",
              element: $el,
              type: option.checks.BTN_EMPTY_LABELLEDBY.type || "error",
              content: option.checks.BTN_EMPTY_LABELLEDBY.content ? Lang.sprintf(option.checks.BTN_EMPTY_LABELLEDBY.content) : `${Lang.sprintf("BTN_EMPTY_LABELLEDBY")} ${Lang.sprintf("BTN_TIP")}`,
              dismiss: prepareDismissal(key),
              dismissAll: option.checks.BTN_EMPTY_LABELLEDBY.dismissAll ? "BTN_EMPTY_LABELLEDBY" : false,
              developer: option.checks.BTN_EMPTY_LABELLEDBY.developer || true
            });
          } else if (option.checks.BTN_EMPTY) {
            results.push({
              test: "BTN_EMPTY",
              element: $el,
              type: option.checks.BTN_EMPTY.type || "error",
              content: option.checks.BTN_EMPTY.content ? Lang.sprintf(option.checks.BTN_EMPTY.content) : `${Lang.sprintf("BTN_EMPTY")} ${Lang.sprintf("BTN_TIP")}`,
              dismiss: key,
              dismissAll: option.checks.BTN_EMPTY.dismissAll ? "BTN_EMPTY" : false,
              developer: option.checks.BTN_EMPTY.developer || true
            });
          }
          return;
        }
        const isVisibleTextInAccName$1 = isVisibleTextInAccName($el, accName);
        if (option.checks.LABEL_IN_NAME && hasAria && isVisibleTextInAccName$1) {
          const sanitizedText = sanitizeHTML(accName);
          results.push({
            test: "LABEL_IN_NAME",
            element: $el,
            type: option.checks.LABEL_IN_NAME.type || "warning",
            content: option.checks.LABEL_IN_NAME.content ? Lang.sprintf(option.checks.LABEL_IN_NAME.content, sanitizedText) : `${Lang.sprintf("LABEL_IN_NAME", sanitizedText)} ${Lang.sprintf("ACC_NAME_TIP")}`,
            dismiss: key,
            dismissAll: option.checks.LABEL_IN_NAME.dismissAll ? "BTN_LABEL_IN_NAME" : false,
            developer: option.checks.LABEL_IN_NAME.developer || true
          });
          return;
        }
        if (option.checks.BTN_ROLE_IN_NAME && accName.includes(Lang._("BTN"))) {
          results.push({
            test: "BTN_ROLE_IN_NAME",
            element: $el,
            type: option.checks.BTN_ROLE_IN_NAME.type || "warning",
            content: option.checks.BTN_ROLE_IN_NAME.content ? Lang.sprintf(option.checks.BTN_ROLE_IN_NAME.content) : `${Lang.sprintf("BTN_ROLE_IN_NAME")} ${Lang.sprintf("BTN_TIP")}`,
            dismiss: key,
            dismissAll: option.checks.BTN_ROLE_IN_NAME.dismissAll ? "BTN_ROLE_IN_NAME" : false,
            developer: option.checks.BTN_ROLE_IN_NAME.developer || true
          });
        }
      });
    }
    if (option.checks.UNCONTAINED_LI) {
      Elements.Found.Lists.forEach(($el) => {
        if (!$el.closest("ul, ol, menu")) {
          results.push({
            test: "UNCONTAINED_LI",
            element: $el,
            type: option.checks.UNCONTAINED_LI.type || "error",
            content: Lang.sprintf(option.checks.UNCONTAINED_LI.content || "UNCONTAINED_LI"),
            dismiss: prepareDismissal(`UNCONTAINEDLI${$el.textContent}`),
            dismissAll: option.checks.UNCONTAINED_LI.dismissAll ? "UNCONTAINED_LI" : false,
            developer: option.checks.UNCONTAINED_LI.developer || true
          });
        }
      });
    }
    if (option.checks.TABINDEX_ATTR) {
      Elements.Found.TabIndex.forEach(($el) => {
        results.push({
          test: "TABINDEX_ATTR",
          element: $el,
          type: option.checks.TABINDEX_ATTR.type || "error",
          content: Lang.sprintf(option.checks.TABINDEX_ATTR.content || "TABINDEX_ATTR"),
          dismiss: prepareDismissal(`TABINDEX${$el.tagName + $el.id + $el.className}`),
          dismissAll: option.checks.TABINDEX_ATTR.dismissAll ? "TABINDEX_ATTR" : false,
          developer: option.checks.TABINDEX_ATTR.developer || true
        });
      });
    }
    return results;
  }
  function checkCustom(results) {
    return results;
  }
  class Sa11y {
    constructor(options) {
      const option = {
        ...defaultOptions,
        ...options,
        checks: {
          ...defaultOptions.checks,
          ...options.checks
        }
      };
      this.initialize = () => {
        const checkRunPrevent = () => {
          const { doNotRun } = option;
          return doNotRun.trim().length > 0 ? document.querySelector(doNotRun) : false;
        };
        if (!checkRunPrevent()) {
          customElements.define("sa11y-heading-label", HeadingLabel);
          customElements.define("sa11y-heading-anchor", HeadingAnchor);
          customElements.define("sa11y-annotation", Annotations);
          customElements.define("sa11y-tooltips", AnnotationTooltips);
          customElements.define("sa11y-panel-tooltips", PanelTooltips);
          customElements.define("sa11y-control-panel", ControlPanel);
          customElements.define("sa11y-console-error", ConsoleErrors);
          Constants.initializeGlobal(option);
          Constants.initializeReadability(option);
          Constants.initializeExclusions(option);
          if (option.developerChecksOnByDefault) {
            if (store.getItem("sa11y-developer") === null || option.checkAllHideToggles) {
              store.setItem("sa11y-developer", "On");
            }
          }
          documentLoadingCheck(() => {
            if (option.headless) {
              this.checkAll();
              store.removeItem("sa11y-dismissed");
            } else {
              const rememberPosition = store.getItem("sa11y-position");
              const { panelPosition } = option;
              if (option.showMovePanelToggle && (!rememberPosition || !rememberPosition.includes("top") !== !panelPosition.includes("top"))) {
                store.setItem("sa11y-position", panelPosition);
              }
              const controlPanel = new ControlPanel();
              document.body.appendChild(controlPanel);
              settingsPanelToggles(this.checkAll, this.resetAll);
              initializePanelToggles();
              addColourFilters();
              detectPageChanges(option.detectSPArouting, this.checkAll, this.resetAll);
              this.panelTooltips = new PanelTooltips();
              document.body.appendChild(this.panelTooltips);
              Constants.Panel.toggle.disabled = false;
              setTimeout(() => {
                this.resetAll();
                this.checkAll();
              }, option.delayCheck);
              if (option.delayCheck >= 700) {
                Constants.Panel.toggle.disabled = true;
              }
              mainToggle(this.checkAll, this.resetAll);
            }
          });
        }
      };
      this.checkAll = async (desiredRoot = option.checkRoot, desiredReadabilityRoot = option.readabilityRoot, fixedRoots = option.fixedRoots) => {
        try {
          this.results = [];
          this.headingOutline = [];
          this.errorCount = 0;
          this.warningCount = 0;
          this.customChecksRunning = false;
          Constants.initializeRoot(desiredRoot, desiredReadabilityRoot, fixedRoots);
          findShadowComponents(option);
          Elements.initializeElements(option);
          checkHeaders(this.results, option, this.headingOutline);
          checkLinkText(this.results, option);
          checkImages(this.results, option);
          checkLabels(this.results, option);
          checkQA(this.results, option);
          checkDeveloper(this.results, option);
          if (option.embeddedContentPlugin) {
            checkEmbeddedContent(this.results, option);
          }
          if (option.contrastPlugin) {
            checkContrast(this.results, option);
          }
          if (option.readabilityPlugin && store.getItem("sa11y-readability") === "On") {
            checkReadability(this.results);
          }
          this.imageResults = Elements.Found.Images.map((image) => {
            const match = this.results.find((i) => i.element === image);
            return match && {
              element: image,
              type: match.type,
              dismiss: match.dismiss,
              developer: match.developer
            };
          }).filter(Boolean);
          if (option.customChecks === true) {
            checkCustom(this.results);
          } else if (typeof option.customChecks === "object") {
            this.results.push(...option.customChecks);
          } else if (option.customChecks === "listen") {
            this.customChecksRunning = true;
            this.customChecksFinished = 0;
            document.addEventListener("sa11y-resume", () => {
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
                throw Error("Sa11y: No custom checks were returned.");
              }
            }, option.delayCustomCheck);
            window.setTimeout(() => {
              const customChecks = new CustomEvent("sa11y-custom-checks");
              document.dispatchEvent(customChecks);
            }, 0);
          }
          if (!this.customChecksRunning) {
            this.updateResults();
          }
        } catch (error) {
          const consoleErrors = new ConsoleErrors(error);
          document.body.appendChild(consoleErrors);
          throw Error(error);
        }
      };
      this.updateResults = () => {
        this.results = this.results.filter((heading) => heading.isWithinRoot !== false);
        const devChecks = store.getItem("sa11y-developer") === "Off" || store.getItem("sa11y-developer") === null;
        if (devChecks || option.externalDeveloperChecks === true) {
          this.results = this.results.filter((issue) => issue.developer !== true);
        }
        if (devChecks) {
          this.results = this.results.filter((issue) => issue.external !== true);
        }
        this.results.forEach(($el, id) => {
          const cssPath = option.selectorPath ? generateSelectorPath($el.element) : "";
          const htmlPath = $el.element?.outerHTML.replace(/\s{2,}/g, " ").trim() || "";
          Object.assign($el, { htmlPath, cssPath, id });
        });
        if (option.headless === false) {
          const dismiss = dismissLogic(
            this.results,
            this.panelTooltips,
            this.checkAll,
            this.resetAll
          );
          this.results = dismiss.updatedResults;
          this.dismissed = dismiss.dismissedIssues;
          this.dismissedPageResults = dismiss.dismissedResults;
          const count = updateCount(this.results, this.errorCount, this.warningCount);
          updateBadge(count.error, count.warning);
          if (store.getItem("sa11y-panel") === "Opened") {
            const counts = /* @__PURE__ */ new Map();
            this.results.forEach((issue) => {
              let updatedIssue = issue;
              if (issue.element && !issue.margin) {
                const index2 = counts.get(issue.element) || 0;
                counts.set(issue.element, index2 + 1);
                const offset2 = issue.inline ? 0 : 15;
                updatedIssue = { ...issue, margin: `${index2 * 20 + offset2}px` };
              }
              annotate(updatedIssue, option);
            });
            Elements.initializeAnnotations();
            const tooltipComponent = new AnnotationTooltips();
            document.body.appendChild(tooltipComponent);
            dismissButtons(this.results, this.dismissed, this.checkAll, this.resetAll);
            generatePageOutline(this.dismissedPageResults, this.headingOutline, option);
            if (option.showImageOutline) {
              generateImageOutline(this.dismissedPageResults, this.imageResults, option);
            }
            updatePanel(dismiss.dismissCount, count.error, count.warning);
            skipToIssue(this.results);
            if (option.exportResultsPlugin) {
              exportResults(this.results, dismiss.dismissedResults);
            }
            isScrollable(Constants.Panel.pageIssuesList, Constants.Panel.pageIssuesContent);
          }
          Constants.Panel.toggle.disabled = false;
        }
        window.sa11yCheckComplete = null;
        const event = new CustomEvent("sa11y-check-complete", {
          detail: {
            results: this.results,
            page: window.location.pathname
          }
        });
        window.sa11yCheckComplete = event.detail;
        document.dispatchEvent(event);
      };
      this.resetAll = (restartPanel = true) => {
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
        if (supportsAnchorPositioning()) {
          find("[data-sa11y-error], [data-sa11y-warning], [data-sa11y-good]", "document").forEach(
            ($el) => {
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
            }
          );
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
        if (option.showImageOutline) {
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
        document.querySelectorAll("[data-sa11y-has-shadow-root]").forEach((el) => {
          el.shadowRoot.querySelectorAll("style.sa11y-css-utilities").forEach((style) => {
            style.remove();
          });
          el.removeAttribute("data-sa11y-has-shadow-root");
        });
        if (restartPanel) {
          Constants.Panel.panel.classList.remove("active");
        }
      };
      this.disabled = () => {
        setTimeout(() => {
          if (store.getItem("sa11y-panel") === "Opened") {
            Constants.Panel.toggle.click();
          }
          Constants.Panel.toggle.disabled = true;
        }, option.delayCheck + 10);
      };
      this.enabled = () => {
        if (Constants.Panel.toggle) {
          Constants.Panel.toggle.disabled = false;
        }
      };
      this.find = (selector, desiredRoot, exclude) => find(selector, desiredRoot, exclude);
      this.prepareDismissal = (string) => prepareDismissal(string);
      this.sanitizeHTML = (string) => sanitizeHTML(string);
      this.truncateString = (string, maxLength) => truncateString(string, maxLength);
      this.initialize();
    }
  }
  exports2.Lang = Lang;
  exports2.Sa11y = Sa11y;
  Object.defineProperty(exports2, Symbol.toStringTag, { value: "Module" });
}));
