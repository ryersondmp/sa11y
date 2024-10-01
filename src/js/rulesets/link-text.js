import Elements from '../utils/elements';
import Constants from '../utils/constants';
import * as Utils from '../utils/utils';
import Lang from '../utils/lang';
import { computeAccessibleName } from '../utils/computeAccessibleName';

export default function checkLinkText(results, option) {
  const containsLinkTextStopWords = (textContent) => {
    const urlText = [
      'http',
      'www.',
      '.edu/',
      '.com/',
      '.net/',
      '.org/',
      '.us/',
      '.ca/',
      '.de/',
      '.icu/',
      '.uk/',
      '.ru/',
      '.info/',
      '.top/',
      '.xyz/',
      '.tk/',
      '.cn/',
      '.ga/',
      '.cf/',
      '.nl/',
      '.io/',
      '.fr/',
      '.pe/',
      '.nz/',
      '.pt/',
      '.es/',
      '.pl/',
      '.ua/',
    ];

    const hit = [null, null, null, null];

    // Iterate through all partialStopwords.
    Lang._('PARTIAL_ALT_STOPWORDS').forEach((word) => {
      // Remove periods to improve accuracy.
      const testTextContent = textContent.replace(/\./g, '');
      if (testTextContent.length === word.length && testTextContent.toLowerCase().indexOf(word) >= 0) {
        hit[0] = word;
      }
      return false;
    });

    // Other warnings we want to add.
    const linkStopWords = (option.linkStopWords) ? option.linkStopWords.split(',').map((word) => word.trim()) : Lang._('WARNING_ALT_STOPWORDS');
    linkStopWords.forEach((word) => {
      if (textContent.toLowerCase().indexOf(word) >= 0) {
        hit[1] = word;
      }
      return false;
    });

    // Flag citations/references. Check if link text matches a publication source.
    const doi = [
      'doi.org/',
      'dl.acm.org/',
      'link.springer.com/',
      'pubmed.ncbi.nlm.nih.gov/',
      'scholar.google.com/',
      'ieeexplore.ieee.org/',
      'researchgate.net/publication/',
      'sciencedirect.com/science/article/',
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
    const stripSpecialChars = linkText.replace(/[^\w\s./]/g, '').replace(/\s+/g, ' ').trim();
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

    // Has aria-labeledby.
    const hasAriaLabelledby = $el.querySelector(':scope [aria-labelledby]') || $el.getAttribute('aria-labelledby');

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

    if ($el.querySelectorAll('img').length) {
      // Do nothing. Don't overlap with Alt Text module.
    } else if (ariaHidden) {
      // Has aria-hidden.
      if (!negativeTabindex) {
        // If negative tabindex.
        if (option.checks.HIDDEN_FOCUSABLE) {
          results.push({
            element: $el,
            type: option.checks.HIDDEN_FOCUSABLE.type || 'error',
            content: option.checks.HIDDEN_FOCUSABLE.content || Lang.sprintf('HIDDEN_FOCUSABLE'),
            inline: true,
            position: 'afterend',
            dismiss: Utils.prepareDismissal(`A${href + linkTextTrimmed}`),
            dismissAll: option.checks.HIDDEN_FOCUSABLE.dismissAll ? 'LINK_HIDDEN_FOCUSABLE' : false,
            developer: option.checks.HIDDEN_FOCUSABLE.developer || true,
          });
        }
      }
    } else if ((href || href === '') && linkText.length === 0) {
      // Empty hyperlinks.
      if (hasAriaLabelledby) {
        // Has ariaLabelledby attribute but empty accessible name.
        if (option.checks.LINK_EMPTY_LABELLEDBY) {
          results.push({
            element: $el,
            type: option.checks.LINK_EMPTY_LABELLEDBY.type || 'error',
            content: option.checks.LINK_EMPTY_LABELLEDBY.content || Lang.sprintf('LINK_EMPTY_LABELLEDBY'),
            inline: true,
            position: 'afterend',
            dismiss: Utils.prepareDismissal(`A${href}`),
            dismissAll: option.checks.LINK_EMPTY_LABELLEDBY.dismissAll ? 'LINK_EMPTY_LABELLEDBY' : false,
            developer: option.checks.LINK_EMPTY_LABELLEDBY.developer || true,
          });
        }
      } else if ($el.children.length) {
        // Has child elements (e.g. SVG or SPAN) <a><i></i></a>
        if (option.checks.LINK_EMPTY_NO_LABEL) {
          results.push({
            element: $el,
            type: option.checks.LINK_EMPTY_NO_LABEL.type || 'error',
            content: option.checks.LINK_EMPTY_NO_LABEL.content || Lang.sprintf('LINK_EMPTY_NO_LABEL'),
            inline: true,
            position: 'afterend',
            dismiss: Utils.prepareDismissal(`A${href}`),
            dismissAll: option.checks.LINK_EMPTY_NO_LABEL.dismissAll ? 'LINK_EMPTY_NO_LABEL' : false,
            developer: option.checks.LINK_EMPTY_NO_LABEL.developer || false,
          });
        }
      } else if (option.checks.LINK_EMPTY) {
        // Completely empty <a></a>
        results.push({
          element: $el,
          type: option.checks.LINK_EMPTY.type || 'error',
          content: option.checks.LINK_EMPTY.content || Lang.sprintf('LINK_EMPTY'),
          inline: true,
          position: 'afterend',
          dismiss: Utils.prepareDismissal(`A${href}`),
          dismissAll: option.checks.LINK_EMPTY.dismissAll ? 'LINK_EMPTY' : false,
          developer: option.checks.LINK_EMPTY.developer || false,
        });
      }
    } else if (error[0] !== null) {
      // Contains stop words.
      if (option.checks.LINK_STOPWORD) {
        results.push({
          element: $el,
          type: option.checks.LINK_STOPWORD.type || 'error',
          content: option.checks.LINK_STOPWORD.content || Lang.sprintf('LINK_STOPWORD', error[0]),
          inline: true,
          position: 'afterend',
          dismiss: Utils.prepareDismissal(`A${href + linkTextTrimmed}`),
          dismissAll: option.checks.LINK_STOPWORD.dismissAll ? 'LINK_STOPWORD' : false,
          developer: option.checks.LINK_STOPWORD.developer || false,
        });
      }
    } else if (error[1] !== null || matchedSymbol !== null) {
      // Contains warning words.
      if (option.checks.LINK_BEST_PRACTICES) {
        const stopword = matchedSymbol || error[1];
        results.push({
          element: $el,
          type: option.checks.LINK_BEST_PRACTICES.type || 'warning',
          content: option.checks.LINK_BEST_PRACTICES.content || Lang.sprintf('LINK_BEST_PRACTICES', stopword),
          inline: true,
          position: 'beforebegin',
          dismiss: Utils.prepareDismissal(`LINK${href + linkTextTrimmed}`),
          dismissAll: option.checks.LINK_BEST_PRACTICES.dismissAll ? 'LINK_BEST_PRACTICES' : false,
          developer: option.checks.LINK_BEST_PRACTICES.developer || false,
        });
      }
    } else if (error[2] !== null) {
      // Contains DOI URL in link text.
      if (linkText.length > 8) {
        if (option.checks.LINK_DOI) {
          results.push({
            element: $el,
            type: option.checks.LINK_DOI.type || 'warning',
            content: option.checks.LINK_DOI.content || Lang.sprintf('LINK_DOI'),
            inline: true,
            position: 'beforebegin',
            dismiss: Utils.prepareDismissal(`LINK${href + linkTextTrimmed}`),
            dismissAll: option.checks.LINK_DOI.dismissAll ? 'LINK_DOI' : false,
            developer: option.checks.LINK_DOI.developer || false,
          });
        }
      }
    } else if (error[3] !== null) {
      // Contains URL in link text.
      if (linkText.length > option.URLTextMaxCharLength) {
        if (option.checks.LINK_URL) {
          results.push({
            element: $el,
            type: option.checks.LINK_URL.type || 'warning',
            content: option.checks.LINK_URL.content || Lang.sprintf('LINK_URL'),
            inline: true,
            position: 'beforebegin',
            dismiss: Utils.prepareDismissal(`LINK${href + linkTextTrimmed}`),
            dismissAll: option.checks.LINK_URL.dismissAll ? 'LINK_URL' : false,
            developer: option.checks.LINK_URL.developer || false,
          });
        }
      }
    } else if (hasAria) {
      // Button must have visible label as part of their accessible name.
      const isVisibleTextInAccessibleName = Utils.isVisibleTextInAccessibleName($el);
      if (option.checks.LABEL_IN_NAME && isVisibleTextInAccessibleName && $el.textContent.length !== 0) {
        const sanitizedText = Utils.sanitizeHTML(accName);
        results.push({
          element: $el,
          type: option.checks.LABEL_IN_NAME.type || 'warning',
          content: option.checks.LABEL_IN_NAME.content || `${Lang.sprintf('LABEL_IN_NAME', sanitizedText)}`,
          inline: true,
          position: 'afterend',
          dismiss: Utils.prepareDismissal(`LINK${href + linkTextTrimmed}`),
          dismissAll: option.checks.LABEL_IN_NAME.dismissAll ? 'BTN_LABEL_IN_NAME' : false,
          developer: option.checks.LABEL_IN_NAME.developer || true,
        });
      } else if (option.checks.LINK_LABEL) {
        // If the link has any ARIA, append a "Good" link button.
        const sanitizedText = Utils.sanitizeHTML(linkText);
        results.push({
          element: $el,
          type: option.checks.LINK_LABEL.type || 'good',
          content: option.checks.LINK_LABEL.content || `${Lang.sprintf('ACC_NAME', sanitizedText)} ${Lang.sprintf('ACC_NAME_TIP')}`,
          inline: true,
          position: 'afterend',
          dismiss: Utils.prepareDismissal(`LINKGOOD${href + linkTextTrimmed}`),
          dismissAll: option.checks.LINK_LABEL.dismissAll ? 'LINK_LABEL' : false,
          developer: option.checks.LINK_LABEL.developer || false,
        });
      }
    } else if (isSingleSpecialChar) {
      // Link is ONLY a period, comma, or special character.
      if (option.checks.LINK_EMPTY) {
        results.push({
          element: $el,
          type: option.checks.LINK_EMPTY.type || 'error',
          content: option.checks.LINK_EMPTY.content || Lang.sprintf('LINK_EMPTY'),
          inline: true,
          position: 'afterend',
          dismiss: Utils.prepareDismissal(`LINK${href}`),
          dismissAll: option.checks.LINK_EMPTY.dismissAll ? 'LINK_EMPTY' : false,
          developer: option.checks.LINK_EMPTY.developer || false,
        });
      }
    }

    /* LINKS developer */
    if (option.linksAdvancedPlugin) {
      if (linkTextTrimmed.length !== 0) {
      // Links with identical accessible names have equivalent purpose.
        if (seen[linkTextTrimmed] && !seen[href]) {
          // Link has identical name as another link.
          if (option.checks.LINK_IDENTICAL_NAME) {
            const sanitizedText = Utils.sanitizeHTML(linkText);
            results.push({
              element: $el,
              type: option.checks.LINK_IDENTICAL_NAME.type || 'warning',
              content: option.checks.LINK_IDENTICAL_NAME.content || `${Lang.sprintf('LINK_IDENTICAL_NAME', sanitizedText)} ${Lang.sprintf('ACC_NAME_TIP')}`,
              inline: true,
              position: 'beforebegin',
              dismiss: Utils.prepareDismissal(`LINK${href + linkTextTrimmed}`),
              dismissAll: option.checks.LINK_IDENTICAL_NAME.dismissAll ? 'LINK_IDENTICAL_NAME' : false,
              developer: option.checks.LINK_IDENTICAL_NAME.developer || false,
            });
          }
        } else if ($el.getAttribute('target') === '_blank' && !fileTypeMatch && !containsNewWindowPhrases) {
          if (option.checks.LINK_NEW_TAB) {
            results.push({
              element: $el,
              type: option.checks.LINK_NEW_TAB.type || 'warning',
              content: option.checks.LINK_NEW_TAB.content || Lang.sprintf('LINK_NEW_TAB'),
              inline: true,
              position: 'beforebegin',
              dismiss: Utils.prepareDismissal(`LINK${href + linkTextTrimmed}`),
              dismissAll: option.checks.LINK_NEW_TAB.dismissAll ? 'LINK_NEW_TAB' : false,
              developer: option.checks.LINK_NEW_TAB.developer || false,
            });
          }
        } else if (fileTypeMatch && !containsFileTypePhrases) {
          if (option.checks.LINK_FILE_EXT) {
            results.push({
              element: $el,
              type: option.checks.LINK_FILE_EXT.type || 'warning',
              content: option.checks.LINK_FILE_EXT.content || Lang.sprintf('LINK_FILE_EXT'),
              inline: true,
              position: 'beforebegin',
              dismiss: Utils.prepareDismissal(`LINK${href + linkTextTrimmed}`),
              dismissAll: option.checks.LINK_FILE_EXT.dismissAll ? 'LINK_FILE_EXT' : false,
              developer: option.checks.LINK_FILE_EXT.developer || false,
            });
          }
        } else {
          seen[linkTextTrimmed] = true;
          seen[href] = true;
        }
      }
    }
  });
  return results;
}
