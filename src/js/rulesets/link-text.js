import Constants from '../utils/constants';
import Elements from '../utils/elements';
import * as Utils from '../utils/utils';
import Lang from '../utils/lang';
import { computeAccessibleName } from '../utils/computeAccessibleName';

export default function checkLinkText(results, option) {
  const containsLinkTextStopWords = (textContent) => {
    const urlText = [
      'http',
      'edu/',
      'com/',
      'net/',
      'org/',
      'us/',
      'ca/',
      'de/',
      'icu/',
      'uk/',
      'ru/',
      'info/',
      'top/',
      'xyz/',
      'tk/',
      'cn/',
      'ga/',
      'cf/',
      'nl/',
      'io/',
      'fr/',
      'pe/',
      'nz/',
      'pt/',
      'es/',
      'pl/',
      'ua/',
    ];

    const hit = [null, null, null, null];

    // Iterate through all partialStopwords.
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

    // Flag citations/references. Check if link text matches a publication source.
    const doi = [
      'doiorg/', // doi.org
      'dlacmorg/', // dl.acm.org
      'linkspringercom/', // link.springer.com
      'pubmedncbinlmnihgov/', // pubmed.ncbi.nlm.nih.gov
      'scholargooglecom/', // scholar.google.com
      'ieeexploreieeeorg/', // ieeexplore.ieee.org
      'researchgatenet/publication', // researchgate.net/publication
      'sciencedirectcom/science/article', // sciencedirect.com/science/article
    ];
    doi.forEach((word) => {
      if (textContent.toLowerCase().indexOf(word) >= 0) {
        hit[2] = word;
      }
      return false;
    });

    // Flag link text containing URLs.
    urlText.forEach((word) => {
      if (textContent.toLowerCase().indexOf(word) >= 0) {
        hit[3] = word;
      }
      return false;
    });

    return hit;
  };

  Elements.Found.Links.forEach(($el) => {
    const exclusions = Utils.fnIgnore($el, Constants.Exclusions.LinkSpan);
    const accessibleName = computeAccessibleName(exclusions);
    const linkText = Utils.removeWhitespaceFromString(accessibleName);

    // Ignore provided linkSpanIgnore prop, <style> tags, and special characters.
    const specialCharPattern = /[!?。，、&*()\-;':"\\|,.<>↣↳←→↓«»↴]+/g;
    const error = containsLinkTextStopWords(linkText.replace(specialCharPattern, '').trim());

    // HTML symbols used as call to actions.
    const htmlSymbols = /([<>↣↳←→↓«»↴]+)/;
    const matches = linkText.match(htmlSymbols);
    const matchedSymbol = matches ? matches[1] : null;

    // ARIA attributes.
    const hasAriaLabelledBy = $el.getAttribute('aria-labelledby');
    const hasAriaLabel = $el.getAttribute('aria-label');
    const hasTitle = $el.getAttribute('title');
    const href = $el.getAttribute('href');
    const hidden = $el.getAttribute('aria-hidden') === 'true';
    const negativeTabindex = $el.getAttribute('tabindex') === '-1';

    let childAriaLabelledBy = null;
    let childAriaLabel = null;
    if ($el.children.length) {
      const $firstChild = $el.children[0];
      childAriaLabelledBy = $firstChild.getAttribute('aria-labelledby');
      childAriaLabel = $firstChild.getAttribute('aria-label');
    }

    console.log(linkText);
    if ($el.querySelectorAll('img').length) {
      // Do nothing. Don't overlap with Alt Text module.
    } else if (href && linkText.length === 0) {
      // Flag empty hyperlinks.
      if ($el && hasTitle) {
        // If empty but has title attribute.
      } else if ($el.children.length) {
        // Has child elements (e.g. SVG or SPAN) <a><i></i></a>
        results.push({
          element: $el,
          type: 'error',
          content: Lang.sprintf('LINK_EMPTY_LINK_NO_LABEL'),
          inline: true,
          position: 'afterend',
        });
      } else {
        // Completely empty <a></a>
        results.push({
          element: $el,
          type: 'error',
          content: Lang.sprintf('LINK_EMPTY'),
          inline: true,
          position: 'afterend',
        });
      }
    } else if (error[0] !== null) {
      // Contains stop words.
      if (hasAriaLabelledBy || hasAriaLabel || childAriaLabelledBy || childAriaLabel) {
        const sanitizedText = Utils.sanitizeHTML(linkText);
        if (option.showGoodLinkButton) {
          results.push({
            element: $el,
            type: 'good',
            content: Lang.sprintf('LINK_LABEL', sanitizedText),
            inline: true,
            position: 'afterend',
          });
        }
      } else if (hidden && negativeTabindex) {
        // Do nothing.
      } else {
        results.push({
          element: $el,
          type: 'error',
          content: Lang.sprintf('LINK_STOPWORD', error[0]),
          inline: true,
          position: 'afterend',
        });
      }
    } else if (error[1] !== null || matchedSymbol !== null) {
      const key = Utils.prepareDismissal(`LINK${linkText + href}`);
      const STOPWORD = matchedSymbol || error[1];
      // Contains warning words.
      results.push({
        element: $el,
        type: 'warning',
        content: Lang.sprintf('LINK_BEST_PRACTICES', STOPWORD),
        inline: true,
        position: 'beforebegin',
        dismiss: key,
      });
    } else if (error[2] !== null && option.linksToDOI) {
      const key = Utils.prepareDismissal(`LINK${linkText + error[2] + href}`);
      // Contains DOI URL in link text.
      if (linkText.length > 8) {
        results.push({
          element: $el,
          type: 'warning',
          content: Lang.sprintf('LINK_DOI'),
          inline: true,
          position: 'beforebegin',
          dismiss: key,
        });
      }
    } else if (error[3] !== null && option.URLAsLinkTextWarning) {
      const key = Utils.prepareDismissal(`LINK${linkText + error[2] + href}`);
      // Contains URL in link text.
      if (linkText.length > option.URLTextMaxCharLength) {
        results.push({
          element: $el,
          type: 'warning',
          content: Lang.sprintf('LINK_URL'),
          inline: true,
          position: 'beforebegin',
          dismiss: key,
        });
      }
    } else if (hasAriaLabelledBy || hasAriaLabel || childAriaLabelledBy || childAriaLabel) {
      // If the link has any ARIA, append a "Good" link button.
      if (option.showGoodLinkButton) {
        const sanitizedText = Utils.sanitizeHTML(linkText);
        results.push({
          element: $el,
          type: 'good',
          content: Lang.sprintf('LINK_LABEL', sanitizedText),
          inline: true,
          position: 'afterend',
        });
      }
    } else if (linkText === '.' || linkText === ',' || linkText === '/') {
      // Link is ONLY a period, comma, or slash.
      results.push({
        element: $el,
        type: 'error',
        content: Lang.sprintf('LINK_EMPTY'),
        inline: true,
        position: 'afterend',
      });
    }
  });
  return results;
}
