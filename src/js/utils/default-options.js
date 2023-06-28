const defaultOptions = {
  // Target area to check
  checkRoot: 'body',

  // Exclusions
  containerIgnore: '.sa11y-ignore',
  contrastIgnore: '.sr-only, [role="menu"] *',
  outlineIgnore: '',
  headerIgnore: '',
  imageIgnore: '',
  linkIgnore: 'nav *, [role="navigation"] *',
  linkIgnoreSpan: '',

  // Other features
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
  readabilityIgnore: '',

  // Other plugins
  contrastPlugin: true,
  formLabelsPlugin: true,
  linksAdvancedPlugin: true,
  colourFilterPlugin: true,
  customChecks: true,
  checkAllHideToggles: false,

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

export default defaultOptions;
