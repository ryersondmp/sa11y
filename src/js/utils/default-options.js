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
  showGoodLinkButton: true,
  showGoodImageButton: true,
  showHinPageOutline: false,
  showTitleInPageOutline: true,
  showImageOutline: true,
  editImageURLofCMS: '',
  relativePathImageSRC: '',
  relativePathImageID: '',
  detectSPArouting: false,
  doNotRun: '',
  dismissAnnotations: true,
  headless: false,
  selectorPath: false,
  shadowComponents: '',
  autoDetectShadowComponents: false,
  panelPosition: 'right',
  altTextMaxCharLength: 250,
  susAltStopWords: '',
  linkStopWords: '',
  extraPlaceholderStopWords: '',
  headingMaxCharLength: 170,
  URLTextMaxCharLength: 40,
  URLAsLinkTextWarning: true,

  // Readability
  readabilityPlugin: true,
  readabilityRoot: 'body',
  readabilityIgnore: '',

  // Other plugins
  contrastPlugin: true,
  formLabelsPlugin: true,
  linksAdvancedPlugin: true,
  colourFilterPlugin: true,
  customChecks: false,
  checkAllHideToggles: false,
  exportResultsPlugin: false,

  // Specific rulesets
  linksToFlag: '',
  linksToDOI: true,
  missingH1: true,
  flagLongHeadings: true,
  nonConsecutiveHeadingIsError: true,

  // QA rulesets
  badLinksQA: true,
  strongItalicsQA: true,
  pdfQA: true,
  documentQA: true,
  documentLinks: 'a[href$=".doc"], a[href$=".docx"], a[href*=".doc?"], a[href*=".docx?"], a[href$=".ppt"], a[href$=".pptx"], a[href*=".ppt?"], a[href*=".pptx?"], a[href^="https://docs.google"], a[href^="https://sway."]',
  langQA: true,
  blockquotesQA: true,
  allCapsQA: true,
  fakeHeadingsQA: true,
  fakeListQA: true,
  duplicateIdQA: true,
  underlinedTextQA: true,
  pageTitleQA: true,
  subscriptQA: true,
  inPageLinkQA: true,

  // Tables
  tablesQA: true,
  tablesQAmissingTH: true,
  tablesQAsemanticHeadings: true,
  tablesQAemptyTH: true,
  tablesQAemptyTHisError: true,

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
  dataVizContent: 'datastudio, tableau, lookerstudio, powerbi, qlik',
};

export default defaultOptions;
