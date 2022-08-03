// ============================================================
// Finds all elements and cache.
// ============================================================

import * as utilities from './utilities';

export default function findElements() {
  let container = document.querySelector(option.checkRoot);
  let readabilityContainer = document.querySelector(option.readabilityRoot);

  // Error handling. If target area does not exist, scan body.
  if (!container) {
    container = document.querySelector('body');
  } else {
    container = document.querySelector(option.checkRoot);
  }

  if (!readabilityContainer) {
    readabilityContainer = document.querySelector('body');
  } else {
    readabilityContainer = document.querySelector(option.readabilityRoot);
  }

  // Sa11y's panel container
  Sa11y.panel = document.getElementById('sa11y-container');

  // Exclusions constants
  const containerExclusions = Array.from(document.querySelectorAll(this.containerIgnore));
  const readabilityExclusions = Array.from(document.querySelectorAll(this.readabilityIgnore));

  // Contrast
  const $findcontrast = Array.from(container.querySelectorAll('*'));
  const excludeContrast = Array.from(container.querySelectorAll(this.contrastIgnore));
  Sa11y.$contrast = $findcontrast.filter(($el) => !excludeContrast.includes($el));

  // Readability
  let $findreadability = Array.from(readabilityContainer.querySelectorAll('p, li'));

  // Error handling for readability.
  if (!$findreadability) {
    // If not null.
  } else {
    $findreadability = Array.from(readabilityContainer.querySelectorAll('p, li'));
  }
  Sa11y.$readability = $findreadability.filter(($el) => !readabilityExclusions.includes($el));

  // Headings
  const allHeadings = Array.from(container.querySelectorAll("h1, h2, h3, h4, h5, h6, [role='heading'][aria-level]"));
  const excludeHeadings = Array.from(container.querySelectorAll(this.headerIgnore));
  Sa11y.$h = allHeadings.filter(($el) => !excludeHeadings.includes($el));

  const allH1 = Array.from(document.querySelectorAll("h1, [role='heading'][aria-level='1']"));
  Sa11y.$h1 = allH1.filter(($el) => !excludeHeadings.includes($el));

  // Links
  const $findlinks = Array.from(container.querySelectorAll('a[href]'));
  const excludelinks = Array.from(container.querySelectorAll(this.linkIgnore));
  Sa11y.$links = $findlinks.filter(($el) => !excludelinks.includes($el));

  // Inputs
  const $findinputs = Array.from(container.querySelectorAll('input, select, textarea'));
  Sa11y.$inputs = $findinputs.filter(($el) => !containerExclusions.includes($el) && !utilities.isElementHidden($el));

  // Images
  const images = Array.from(container.querySelectorAll('img'));
  const excludeimages = Array.from(container.querySelectorAll(this.imageIgnore));
  Sa11y.$img = images.filter(($el) => !excludeimages.includes($el));

  // iFrames
  const $findiframes = Array.from(container.querySelectorAll('iframe, audio, video'));
  Sa11y.$iframes = $findiframes.filter(($el) => !containerExclusions.includes($el));
  Sa11y.$videos = Sa11y.$iframes.filter(($el) => $el.matches(option.videoContent));
  Sa11y.$audio = Sa11y.$iframes.filter(($el) => $el.matches(option.audioContent));
  Sa11y.$dataviz = Sa11y.$iframes.filter(($el) => $el.matches(option.dataVizContent));
  Sa11y.$twitter = Sa11y.$iframes.filter(($el) => $el.matches(option.twitterContent));
  Sa11y.$embeddedContent = Sa11y.$iframes.filter(($el) => !$el.matches(option.embeddedContent));

  // QA
  const $findstrongitalics = Array.from(container.querySelectorAll('strong, em'));
  Sa11y.$strongitalics = $findstrongitalics.filter(($el) => !containerExclusions.includes($el));

  const $findbadDevLinks = option.linksToFlag ? Array.from(container.querySelectorAll(option.linksToFlag)) : [];
  Sa11y.$badDevLinks = $findbadDevLinks.filter(($el) => !containerExclusions.includes($el));

  const $findPDFs = Array.from(container.querySelectorAll("a[href$='.pdf']"));
  Sa11y.$checkPDF = $findPDFs.filter(($el) => !containerExclusions.includes($el));

  const $findtables = Array.from(container.querySelectorAll("table:not([role='presentation'])"));
  Sa11y.$tables = $findtables.filter(($el) => !containerExclusions.includes($el));

  Sa11y.$lang = document.querySelector('html').getAttribute('lang');

  const $findblockquotes = Array.from(container.querySelectorAll('blockquote'));
  Sa11y.$blockquotes = $findblockquotes.filter(($el) => !containerExclusions.includes($el));

  const $findp = Array.from(container.querySelectorAll('p'));
  Sa11y.$p = $findp.filter(($el) => !containerExclusions.includes($el));

  const $findallcaps = Array.from(container.querySelectorAll("h1, h2, h3, h4, h5, h6, p, li:not([class^='sa11y']), blockquote"));
  Sa11y.$allCaps = $findallcaps.filter(($el) => !containerExclusions.includes($el));
};
