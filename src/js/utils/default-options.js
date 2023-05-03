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
