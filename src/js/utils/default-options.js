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
  externalDeveloperChecks: false,
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
    ALT_UNPRONOUNCEABLE: true,
    LINK_ALT_UNPRONOUNCEABLE: true,
    ALT_MAYBE_BAD: {
      minLength: 15,
    },
    LINK_ALT_MAYBE_BAD: {
      minLength: 15,
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
    CONTRAST_PLACEHOLDER_UNSUPPORTED: true,
    CONTRAST_ERROR_GRAPHIC: true,
    CONTRAST_WARNING_GRAPHIC: {
      dismissAll: true,
    },
    CONTRAST_UNSUPPORTED: {
      dismissAll: true,
    },
  },
};

export default defaultOptions;
