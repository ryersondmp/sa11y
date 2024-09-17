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
  linksAdvancedPlugin: true,
  formLabelsPlugin: true,
  embeddedContentPlugin: true,
  developerPlugin: true,
  colourFilterPlugin: true,
  customChecks: false,
  checkAllHideToggles: false,
  exportResultsPlugin: false,

  // Customizing checks.
  altTextMaxCharLength: 250,
  susAltStopWords: '',
  decorativeShouldHaveAlt: '.carousel',
  linkStopWords: '',
  extraPlaceholderStopWords: '',
  headingMaxCharLength: 170,

  // QA ruleset customizations.
  URLTextMaxCharLength: 40,
  linksToFlag: '',
  documentLinks: 'a[href$=".doc"], a[href$=".docx"], a[href*=".doc?"], a[href*=".docx?"], a[href$=".ppt"], a[href$=".pptx"], a[href*=".ppt?"], a[href*=".pptx?"], a[href^="https://drive.google.com/file"], a[href^="https://docs.google."], a[href^="https://sway."]',
  nestedComponentSources: '[role="tablist"], details',

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

    // Developer
    PAGE_LANG: true,
    DUPLICATE_ID: true,
    META_TITLE: true,
    HIDDEN_FOCUSABLE: true,
    UNCONTAINED_LI: true,
    META_SCALABLE: true,
    META_MAX: true,
    META_REFRESH: true,
    TABINDEX_ATTR: true,

    // Buttons
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

export default defaultOptions;
