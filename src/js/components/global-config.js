export default function globals() {
  // Readability root
  if (!option.readabilityRoot) {
    option.readabilityRoot = option.checkRoot;
  }

  // Supported readability languages. Turn module off if not supported.
  const supportedLang = ['en', 'fr', 'es', 'de', 'nl', 'it'];
  const pageLang = document.querySelector('html').getAttribute('lang');

  // If lang attribute is missing.
  if (!pageLang) {
    option.readabilityPlugin = false;
  } else {
    const pageLangLowerCase = pageLang.toLowerCase();
    if (!supportedLang.some((el) => pageLangLowerCase.includes(el))) {
      option.readabilityPlugin = false;
    }
  }

  /* Exclusions */
  // Container ignores apply to self and children.
  if (option.containerIgnore) {
    const containerSelectors = option.containerIgnore.split(',').map((el) => `${el} *, ${el}`);

    option.containerIgnore = `[aria-hidden], [data-tippy-root] *, #sa11y-container *, #wpadminbar *, ${containerSelectors.join(', ')}`;
  } else {
    option.containerIgnore = '[aria-hidden], [data-tippy-root] *, #sa11y-container *, #wpadminbar *';
  }
  this.containerIgnore = option.containerIgnore;

  // Contrast exclusions
  this.contrastIgnore = `${this.containerIgnore}, .sa11y-heading-label, script`;
  if (option.contrastIgnore) {
    this.contrastIgnore = `${option.contrastIgnore}, ${this.contrastIgnore}`;
  }

  // Ignore specific regions for readability module.
  this.readabilityIgnore = `${this.containerIgnore}, nav li, [role="navigation"] li`;
  if (option.readabilityIgnore) {
    this.readabilityIgnore = `${option.readabilityIgnore}, ${this.readabilityIgnore}`;
  }

  // Ignore specific headings
  this.headerIgnore = this.containerIgnore;
  if (option.headerIgnore) {
    this.headerIgnore = `${option.headerIgnore}, ${this.headerIgnore}`;
  }

  // Don't add heading label or include in panel.
  if (option.outlineIgnore) {
    this.outlineIgnore = `${option.outlineIgnore}, #sa11y-container h1, #sa11y-container h2`;
  }

  // Ignore specific images.
  this.imageIgnore = `${this.containerIgnore}, [role='presentation'], [src^='https://trck.youvisit.com']`;
  if (option.imageIgnore) {
    this.imageIgnore = `${option.imageIgnore}, ${this.imageIgnore}`;
  }

  // Ignore specific links
  this.linkIgnore = `${this.containerIgnore}, [aria-hidden="true"], .anchorjs-link`;
  if (option.linkIgnore) {
    this.linkIgnore = `${option.linkIgnore}, ${this.linkIgnore}`;
  }

  // Ignore specific classes within links.
  if (option.linkIgnoreSpan) {
    const linkIgnoreSpanSelectors = option.linkIgnoreSpan.split(',').map((el) => `${el} *, ${el}`);
    option.linkIgnoreSpan = `noscript, ${linkIgnoreSpanSelectors.join(', ')}`;
  } else {
    option.linkIgnoreSpan = 'noscript';
  }

  /* Embedded content sources */
  // Video sources.
  if (option.videoContent) {
    const videoContent = option.videoContent.split(/\s*[\s,]\s*/).map((el) => `[src*='${el}']`);
    option.videoContent = `video, ${videoContent.join(', ')}`;
  } else {
    option.videoContent = 'video';
  }

  // Audio sources.
  if (option.audioContent) {
    const audioContent = option.audioContent.split(/\s*[\s,]\s*/).map((el) => `[src*='${el}']`);
    option.audioContent = `audio, ${audioContent.join(', ')}`;
  } else {
    option.audioContent = 'audio';
  }

  // Data viz sources.
  if (option.dataVizContent) {
    const dataVizContent = option.dataVizContent.split(/\s*[\s,]\s*/).map((el) => `[src*='${el}']`);
    option.dataVizContent = dataVizContent.join(', ');
  } else {
    option.dataVizContent = 'datastudio.google.com, tableau';
  }

  // Twitter timeline sources.
  if (option.twitterContent) {
    const twitterContent = option.twitterContent.split(/\s*[\s,]\s*/).map((el) => `[class*='${el}']`);
    option.twitterContent = twitterContent.join(', ');
  } else {
    option.twitterContent = 'twitter-timeline';
  }

  // Embedded content all
  if (option.embeddedContent) {
    const embeddedContent = option.embeddedContent.split(/\s*[\s,]\s*/).map((el) => {
      if (el === 'twitter-timeline') {
        return `[class*='${el}']`;
      }
      return `[src*='${el}']`;
    });
    option.embeddedContent = embeddedContent.join(', ');
  }
}
