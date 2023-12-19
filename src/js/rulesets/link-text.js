import Elements from '../utils/elements';
import Constants from '../utils/constants';
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

  const seen = {};
  Elements.Found.Links.forEach(($el) => {
    const accName = computeAccessibleName($el, Constants.Exclusions.LinkSpan);
    const stringMatchExclusions = option.linkIgnoreStrings
      ? accName.replace(option.linkIgnoreStrings, '') : accName;
    const linkText = Utils.removeWhitespace(stringMatchExclusions);

    // Ignore special characters (except forward slash).
    const stripSpecialChars = linkText.replace(/[^\w\s/]/g, '').replace(/\s+/g, ' ').trim();
    const error = containsLinkTextStopWords(stripSpecialChars);

    // Match special characters exactly 1 character in length.
    const specialCharPattern = /[^a-zA-Z0-9]/g;
    const isSingleSpecialChar = linkText.length === 1 && specialCharPattern.test(linkText);

    // HTML symbols used as call to actions.
    const htmlSymbols = /([<>↣↳←→↓«»↴]+)/;
    const matches = linkText.match(htmlSymbols);
    const matchedSymbol = matches ? matches[1] : null;

    // ARIA attributes.
    const href = $el.getAttribute('href');
    const ariaHidden = $el.getAttribute('aria-hidden') === 'true';
    const negativeTabindex = $el.getAttribute('tabindex') === '-1';

    // Has ARIA.
    const hasAria = $el.querySelector(':scope [aria-labelledby], :scope [aria-label]') || $el.getAttribute('aria-labelledby') || $el.getAttribute('aria-label');

    if ($el.querySelectorAll('img').length) {
      // Do nothing. Don't overlap with Alt Text module.
    } else if (ariaHidden) {
      // Has aria-hidden.
      if (!negativeTabindex) {
        // If negative tabindex.
        results.push({
          element: $el,
          type: 'error',
          content: Lang.sprintf('LINK_HIDDEN_FOCUSABLE'),
          inline: true,
          position: 'afterend',
        });
      }
    } else if (href && linkText.length === 0) {
      // Empty hyperlinks.
      if ($el.children.length) {
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
      results.push({
        element: $el,
        type: 'error',
        content: Lang.sprintf('LINK_STOPWORD', error[0]),
        inline: true,
        position: 'afterend',
      });
    } else if (error[1] !== null || matchedSymbol !== null) {
      const key = Utils.prepareDismissal(`LINK${linkText + href}`);
      const stopword = matchedSymbol || error[1];
      // Contains warning words.
      results.push({
        element: $el,
        type: 'warning',
        content: Lang.sprintf('LINK_BEST_PRACTICES', stopword),
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
    } else if (hasAria) {
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
    } else if (isSingleSpecialChar) {
      // Link is ONLY a period, comma, or special character.
      results.push({
        element: $el,
        type: 'error',
        content: Lang.sprintf('LINK_EMPTY'),
        inline: true,
        position: 'afterend',
      });
    }

    /* ********************* */
    /*  Links (Advanced)     */
    /* ********************* */
    if (option.linksAdvancedPlugin) {
      const toggleCheck = Utils.store.getItem('sa11y-remember-links-advanced') === 'On';
      if (toggleCheck || option.headless || option.checkAllHideToggles) {
        // New tab or new window.
        const containsNewWindowPhrases = Lang._('NEW_WINDOW_PHRASES').some((pass) => linkText.toLowerCase().includes(pass));

        // Link that points to a file type and indicates as such.
        const defaultFileTypes = ['pdf', 'doc', 'docx', 'word', 'mp3', 'ppt', 'text', 'pptx', 'txt', 'exe', 'dmg', 'rtf', 'windows', 'macos', 'csv', 'xls', 'xlsx', 'mp4', 'mov', 'avi', 'zip'];
        const fileTypes = defaultFileTypes.concat(Lang._('FILE_TYPE_PHRASES'));
        const containsFileTypePhrases = fileTypes.some((pass) => linkText.toLowerCase().includes(pass));
        const fileTypeMatch = $el.matches(`
          a[href$='.pdf'],
          a[href$='.doc'],
          a[href$='.docx'],
          a[href$='.zip'],
          a[href$='.mp3'],
          a[href$='.txt'],
          a[href$='.exe'],
          a[href$='.dmg'],
          a[href$='.rtf'],
          a[href$='.pptx'],
          a[href$='.ppt'],
          a[href$='.xls'],
          a[href$='.xlsx'],
          a[href$='.csv'],
          a[href$='.mp4'],
          a[href$='.mov'],
          a[href$='.avi']
        `);

        // Remove whitespace and special characters to improve accuracy and minimize false positives.
        const linkTextTrimmed = linkText.replace(/'|"|-|\.|\s+/g, '').toLowerCase();

        // Links with identical accessible names have equivalent purpose.
        if (linkTextTrimmed.length !== 0) {
          if (seen[linkTextTrimmed] && !seen[href]) {
            // Link has identical name as another link.
            const key = Utils.prepareDismissal(`LINK${linkTextTrimmed + href}`);
            const sanitizedText = Utils.sanitizeHTML(linkText);
            results.push({
              element: $el,
              type: 'warning',
              content: Lang.sprintf('LINK_IDENTICAL_NAME', sanitizedText),
              inline: true,
              position: 'beforebegin',
              dismiss: key,
            });
          } else if ($el.getAttribute('target') === '_blank' && !fileTypeMatch && !containsNewWindowPhrases) {
            const key = Utils.prepareDismissal(`LINK${linkTextTrimmed + href}`);
            results.push({
              element: $el,
              type: 'warning',
              content: Lang.sprintf('NEW_TAB_WARNING'),
              inline: true,
              position: 'beforebegin',
              dismiss: key,
            });
          } else if (fileTypeMatch && !containsFileTypePhrases) {
            const key = Utils.prepareDismissal(`LINK${linkTextTrimmed + href}`);
            results.push({
              element: $el,
              type: 'warning',
              content: Lang.sprintf('FILE_TYPE_WARNING'),
              inline: true,
              position: 'beforebegin',
              dismiss: key,
            });
          } else {
            seen[linkTextTrimmed] = true;
            seen[href] = true;
          }
        }
      }
    }
  });
  return results;
}
