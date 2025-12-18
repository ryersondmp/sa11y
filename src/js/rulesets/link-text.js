import { computeAccessibleName } from '../utils/computeAccessibleName';
import Constants from '../utils/constants';
import Elements from '../utils/elements';
import Lang from '../utils/lang';
import * as Utils from '../utils/utils';

// Link that points to a file type and indicates as such.
const defaultFileTypes = [
  'pdf',
  'doc',
  'docx',
  'word',
  'mp3',
  'ppt',
  'text',
  'pptx',
  'txt',
  'exe',
  'dmg',
  'rtf',
  'windows',
  'macos',
  'csv',
  'xls',
  'xlsx',
  'mp4',
  'mov',
  'avi',
  'zip',
];

const cssFileTypeSelectors =
  'a[href$=".pdf"], a[href$=".doc"], a[href$=".docx"], a[href$=".zip"], a[href$=".mp3"], a[href$=".txt"], a[href$=".exe"], a[href$=".dmg"], a[href$=".rtf"], a[href$=".pptx"], a[href$=".ppt"], a[href$=".xls"], a[href$=".xlsx"], a[href$=".csv"], a[href$=".mp4"], a[href$=".mov"], a[href$=".avi"]';

// Regex pattern for common citations/publications.
const citationPattern =
  /(doi\.org\/|dl\.acm\.org\/|link\.springer\.com\/|pubmed\.ncbi\.nlm\.nih\.gov\/|scholar\.google\.com\/|ieeexplore\.ieee\.org\/|researchgate\.net\/publication\/|sciencedirect\.com\/science\/article\/)[a-z0-9/.-]+/i;

// Regex pattern for common URL endings.
const urlEndings =
  /\b(?:\.edu\/|\.gob\/|\.gov\/|\.app\/|\.com\/|\.net\/|\.org\/|\.us\/|\.ca\/|\.de\/|\.icu\/|\.uk\/|\.ru\/|\.info\/|\.top\/|\.xyz\/|\.tk\/|\.cn\/|\.ga\/|\.cf\/|\.nl\/|\.io\/|\.fr\/|\.pe\/|\.nz\/|\.pt\/|\.es\/|\.pl\/|\.ua\/)\b/i;

// Regex pattern to match any special characters (that isn't alpha numeric)
const specialCharPattern = /[^a-zA-Z0-9]/g;

// Regex pattern to match HTML symbols commonly used as CTAs in link text.
const htmlSymbols = /([<>↣↳←→↓«»↴]+)/;

/**
 * Checks a string for an EXACT match against a set of predefined stop words/phrases.
 * Case-sensitive and performs an exact match on the final processed string.
 * @param {string} textContent The input string to check.
 * @param {Set<string>} stopWordsSet A Set() of words or phrases to check for an exact match.
 * @param {RegExp} stripStrings A regular expression pattern used to strip words/phrases.
 * @returns {string | null} The matched stop word/phrase if an exact match is found, otherwise null.
 */
const checkStopWords = (textContent, stopWordsSet, stripStrings) => {
  const stripped = textContent.replace(stripStrings, '').trim();
  if (stopWordsSet.has(stripped)) return stripped;
  return null;
};

// Main check link text function.
export default function checkLinkText(results, option) {
  // Generate full list of EXACT stop words. These will leverage Set() instead of regex for slightly better performance.
  const customStopWords = option.linkStopWords
    ? option.linkStopWords.split(',').map((word) => word.toLowerCase().trim())
    : [];
  const linkStopWords = new Set([...Lang._('LINK_STOPWORDS'), ...customStopWords]);
  const linkIgnoreStrings = new Set(option.linkIgnoreStrings.map((word) => word.toLowerCase()));

  // Generate regex patterns from arrays.
  const clickRegex = Utils.generateRegexString(Lang._('CLICK'));
  const newWindowRegex = Utils.generateRegexString(Lang._('NEW_WINDOW_PHRASES'));
  const fileTypeRegex = Utils.generateRegexString(defaultFileTypes);
  const ignorePattern = Utils.generateRegexString(option.linkIgnoreStrings);

  // Start the loop!
  const seen = {};
  Elements.Found.Links.forEach(($el) => {
    // Attributes.
    const href = Utils.standardizeHref($el);
    const titleAttr = $el.getAttribute('title');
    const ariaHidden = $el.getAttribute('aria-hidden') === 'true';
    const negativeTabindex = $el.getAttribute('tabindex') === '-1';
    const targetBlank = $el.getAttribute('target')?.toLowerCase() === '_blank';

    // Get ARIA attributes: caches attributes and uses short-circuit logic to prevent redundant DOM queries.
    const ariaLabel = $el.getAttribute('aria-label');
    const ariaLabelledby = $el.getAttribute('aria-labelledby');
    const childLabelledby = !ariaLabelledby ? $el.querySelector('[aria-labelledby]') : null;
    const hasAriaLabelledby = ariaLabelledby || childLabelledby;
    const hasAria = hasAriaLabelledby || ariaLabel || $el.querySelector('[aria-label]');

    // Link text based on COMPUTED ACCESSIBLE NAME.
    const accName = Utils.removeWhitespace(
      computeAccessibleName($el, Constants.Exclusions.LinkSpan),
    );

    // Strip away text from linkIgnoreStrings prop.
    const linkText = accName.replace(ignorePattern, '');

    // Accessible name (lower case) for regex matching.
    const lowercaseLinkText = linkText.toLowerCase();

    // Ignore special characters (except forward slash).
    const strippedLinkText = Utils.stripAllSpecialCharacters(lowercaseLinkText);

    // Original preserved text to lowercase.
    const textContent = Utils.getText($el).toLowerCase();

    // Shared tests.
    const containsNewWindowPhrases =
      lowercaseLinkText.match(newWindowRegex)?.[0] || textContent.match(newWindowRegex)?.[0];
    const containsFileTypePhrases =
      lowercaseLinkText.match(fileTypeRegex)?.[0] || textContent.match(fileTypeRegex)?.[0];
    const fileTypeMatch = $el.matches(cssFileTypeSelectors);

    /**
     * Don't overlap with Alt Text module.
     */
    if (!$el.querySelector('img')) {
      // Has aria-hidden.
      if (ariaHidden) {
        if (!negativeTabindex) {
          // If negative tabindex.
          if (option.checks.HIDDEN_FOCUSABLE) {
            results.push({
              test: 'HIDDEN_FOCUSABLE',
              element: $el,
              type: option.checks.HIDDEN_FOCUSABLE.type || 'error',
              content: Lang.sprintf(option.checks.HIDDEN_FOCUSABLE.content || 'HIDDEN_FOCUSABLE'),
              inline: true,
              position: 'afterend',
              dismiss: Utils.prepareDismissal(`LINKHIDDENFOCUS${href + strippedLinkText}`),
              dismissAll: option.checks.HIDDEN_FOCUSABLE.dismissAll
                ? 'LINK_HIDDEN_FOCUSABLE'
                : false,
              developer: option.checks.HIDDEN_FOCUSABLE.developer || true,
            });
          }
        }
        return;
      }

      /**
       * Links with ARIA
       */
      if (hasAria && linkText.length !== 0) {
        // Computed accessible name,
        const sanitizedText = Utils.sanitizeHTML(linkText);

        // General warning for visible non-descript link text, regardless of ARIA label.
        const excludeSpan = Utils.fnIgnore($el, Constants.Exclusions.LinkSpan);
        const visibleLinkText = Utils.getText(excludeSpan).replace(ignorePattern, '');
        const cleanedString = Utils.stripAllSpecialCharacters(visibleLinkText);
        const stopword = checkStopWords(cleanedString, linkStopWords);

        // Label in name.
        const visibleTextInName = Utils.isVisibleTextInAccName(
          $el,
          accName,
          Constants.Exclusions.LinkSpan,
          option.linkIgnoreStrings,
        );

        // ARIA label contains stop word.
        if (option.checks.LINK_STOPWORD_ARIA && stopword !== null) {
          results.push({
            test: 'LINK_STOPWORD_ARIA',
            element: $el,
            type: option.checks.LINK_STOPWORD_ARIA.type || 'warning',
            content: option.checks.LINK_STOPWORD_ARIA.content
              ? Lang.sprintf(option.checks.LINK_STOPWORD_ARIA.content, stopword, sanitizedText)
              : Lang.sprintf('LINK_STOPWORD_ARIA', stopword, sanitizedText) +
                Lang.sprintf('LINK_TIP'),
            inline: true,
            dismiss: Utils.prepareDismissal(`LINKSTOPWORDARIA${href + strippedLinkText}`),
            dismissAll: option.checks.LINK_STOPWORD_ARIA.dismissAll ? ' LINK_STOPWORD_ARIA' : false,
            developer: option.checks.LINK_STOPWORD_ARIA.developer || true,
          });
        } else if (option.checks.LABEL_IN_NAME && visibleTextInName && textContent.length !== 0) {
          // Link must have visible label as part of their accessible name.
          results.push({
            test: 'LABEL_IN_NAME',
            element: $el,
            type: option.checks.LABEL_IN_NAME.type || 'warning',
            content: Lang.sprintf(
              option.checks.LABEL_IN_NAME.content || 'LABEL_IN_NAME',
              sanitizedText,
            ),
            inline: true,
            position: 'afterend',
            dismiss: Utils.prepareDismissal(`LINKLABELNAME${href + strippedLinkText}`),
            dismissAll: option.checks.LABEL_IN_NAME.dismissAll ? 'BTN_LABEL_IN_NAME' : false,
            developer: option.checks.LABEL_IN_NAME.developer || true,
          });
        } else if (option.checks.LINK_LABEL) {
          // If the link has any ARIA, append a "Good" link button.
          results.push({
            test: 'LINK_LABEL',
            element: $el,
            type: option.checks.LINK_LABEL.type || 'good',
            content: option.checks.LINK_LABEL.content
              ? Lang.sprintf(option.checks.LINK_LABEL.content, sanitizedText)
              : `${Lang.sprintf('ACC_NAME', sanitizedText)} ${Lang.sprintf('ACC_NAME_TIP')}`,
            inline: true,
            position: 'afterend',
            dismiss: Utils.prepareDismissal(`LINKGOOD${href + strippedLinkText}`),
            dismissAll: option.checks.LINK_LABEL.dismissAll ? 'LINK_LABEL' : false,
            developer: option.checks.LINK_LABEL.developer || true,
          });
        }
      }

      /**
       * If link text is only "new window" or similar phrases.
       */
      let oneStop;
      const addStopWordResult = (element, stopword) => {
        if (option.checks.LINK_STOPWORD && !oneStop) {
          oneStop = true;
          results.push({
            test: 'LINK_STOPWORD',
            element,
            type: option.checks.LINK_STOPWORD.type || 'error',
            content: option.checks.LINK_STOPWORD.content
              ? Lang.sprintf(option.checks.LINK_STOPWORD.content, stopword)
              : Lang.sprintf('LINK_STOPWORD', stopword) + Lang.sprintf('LINK_TIP'),
            inline: true,
            position: 'afterend',
            dismiss: Utils.prepareDismissal(`LINKSTOPWORD${href + strippedLinkText}`),
            dismissAll: option.checks.LINK_STOPWORD.dismissAll ? 'LINK_STOPWORD' : false,
            developer: option.checks.LINK_STOPWORD.developer || false,
          });
        }
      };

      // Find exact stop word matches that are passed via linkIgnoreStrings prop.
      const isLinkIgnoreStrings = checkStopWords(textContent, linkIgnoreStrings);

      /**
       * If link text is ONLY strings that were passed in via prop.
       * Note: these two MUST come before empty hyperlink checks.
       */
      if (isLinkIgnoreStrings === textContent || isLinkIgnoreStrings === strippedLinkText) {
        addStopWordResult($el, isLinkIgnoreStrings);
      } else if (
        containsNewWindowPhrases === textContent ||
        containsNewWindowPhrases === strippedLinkText
      ) {
        addStopWordResult($el, containsNewWindowPhrases);
        return;
      }

      /**
       * Empty hyperlinks.
       */
      if (linkText.length === 0) {
        if (hasAriaLabelledby) {
          // Has ariaLabelledby attribute but empty accessible name.
          if (option.checks.LINK_EMPTY_LABELLEDBY) {
            results.push({
              test: 'LINK_EMPTY_LABELLEDBY',
              element: $el,
              type: option.checks.LINK_EMPTY_LABELLEDBY.type || 'error',
              content: Lang.sprintf(
                option.checks.LINK_EMPTY_LABELLEDBY.content || 'LINK_EMPTY_LABELLEDBY',
              ),
              inline: true,
              position: 'afterend',
              dismiss: Utils.prepareDismissal(`LINKEMPTYLABELLEDBY${href}`),
              dismissAll: option.checks.LINK_EMPTY_LABELLEDBY.dismissAll
                ? 'LINK_EMPTY_LABELLEDBY'
                : false,
              developer: option.checks.LINK_EMPTY_LABELLEDBY.developer || true,
            });
          }
        } else if ($el.children.length) {
          // Add correct warning when link text is only linkIgnoreSpan text.
          let hasStopWordWarning = false;
          if (option.linkIgnoreSpan) {
            const spanEl = $el.querySelector(option.linkIgnoreSpan);
            if (spanEl) {
              const spanText = Utils.stripAllSpecialCharacters(spanEl.textContent)
                .trim()
                .toLowerCase();
              if (spanText === textContent) {
                addStopWordResult($el, spanText);
                hasStopWordWarning = true;
              }
            }
          }

          // Has child elements (e.g. SVG or SPAN) <a><i></i></a>
          if (!hasStopWordWarning && option.checks.LINK_EMPTY_NO_LABEL) {
            results.push({
              test: 'LINK_EMPTY_NO_LABEL',
              element: $el,
              type: option.checks.LINK_EMPTY_NO_LABEL.type || 'error',
              content: Lang.sprintf(
                option.checks.LINK_EMPTY_NO_LABEL.content || 'LINK_EMPTY_NO_LABEL',
              ),
              inline: true,
              position: 'afterend',
              dismiss: Utils.prepareDismissal(`LINKEMPTYNOLABEL${href}`),
              dismissAll: option.checks.LINK_EMPTY_NO_LABEL.dismissAll
                ? 'LINK_EMPTY_NO_LABEL'
                : false,
              developer: option.checks.LINK_EMPTY_NO_LABEL.developer || false,
            });
          }
        } else if (!isLinkIgnoreStrings && option.checks.LINK_EMPTY) {
          // Completely empty <a></a>
          results.push({
            test: 'LINK_EMPTY',
            element: $el,
            type: option.checks.LINK_EMPTY.type || 'error',
            content: Lang.sprintf(option.checks.LINK_EMPTY.content || 'LINK_EMPTY'),
            inline: true,
            position: 'afterend',
            dismiss: Utils.prepareDismissal(`LINKEMPTY${href}`),
            dismissAll: option.checks.LINK_EMPTY.dismissAll ? 'LINK_EMPTY' : false,
            developer: option.checks.LINK_EMPTY.developer || false,
          });
        }
        return;
      }

      /**
       * Alt quality/stop word checks.
       */

      // 1. Check for exact stop words. Strip "new window" phrases by default.
      const isStopWord = checkStopWords(strippedLinkText, linkStopWords, newWindowRegex);

      // 2. Check for "click" words anywhere within string.
      const hasClickWord =
        strippedLinkText.match(clickRegex)?.[0] || textContent.match(clickRegex)?.[0];

      // 3. Check for citations/references.
      const isCitation = lowercaseLinkText.match(citationPattern)?.[0];

      // 4. If link text resembles a URL.
      const urlCheck = lowercaseLinkText.startsWith('www.') || lowercaseLinkText.startsWith('http');
      const isUrlFragment = urlCheck ? 'URL Prefix' : lowercaseLinkText.match(urlEndings)?.[0];

      // 5. Match special characters exactly 1 character in length.
      const isSingleSpecialChar = linkText.length === 1 && specialCharPattern.test(linkText);

      // 6. Match HTML symbols.
      const matchedSymbol = lowercaseLinkText.match(htmlSymbols)?.[0];

      if (isStopWord) {
        // Link is exact stop word.
        addStopWordResult($el, isStopWord);
      } else if (isCitation) {
        // Contains DOI URL in link text.
        if (linkText.length > 8) {
          if (option.checks.LINK_DOI) {
            results.push({
              test: 'LINK_DOI',
              element: $el,
              type: option.checks.LINK_DOI.type || 'warning',
              content: Lang.sprintf(option.checks.LINK_DOI.content || 'LINK_DOI'),
              inline: true,
              dismiss: Utils.prepareDismissal(`LINKDOI${href + strippedLinkText}`),
              dismissAll: option.checks.LINK_DOI.dismissAll ? 'LINK_DOI' : false,
              developer: option.checks.LINK_DOI.developer || false,
            });
          }
        }
      } else if (isUrlFragment) {
        // Contains URL in link text (for non ARIA links)
        if (!hasAria && linkText.length > (option.checks.LINK_URL.maxLength || 40)) {
          if (option.checks.LINK_URL) {
            results.push({
              test: 'LINK_URL',
              element: $el,
              type: option.checks.LINK_URL.type || 'warning',
              content: option.checks.LINK_URL.content
                ? Lang.sprintf(option.checks.LINK_URL.content)
                : Lang.sprintf('LINK_URL') + Lang.sprintf('LINK_TIP'),
              inline: true,
              dismiss: Utils.prepareDismissal(`LINKURLNAME${href + strippedLinkText}`),
              dismissAll: option.checks.LINK_URL.dismissAll ? 'LINK_URL' : false,
              developer: option.checks.LINK_URL.developer || false,
            });
          }
        }
      } else if (matchedSymbol) {
        // If link contains a special character used as a CTA.
        if (option.checks.LINK_SYMBOLS) {
          results.push({
            test: 'LINK_SYMBOLS',
            element: $el,
            type: option.checks.LINK_SYMBOLS.type || 'warning',
            content: Lang.sprintf(
              option.checks.LINK_SYMBOLS.content || 'LINK_SYMBOLS',
              matchedSymbol,
            ),
            inline: true,
            dismiss: Utils.prepareDismissal(`LINKSYMBOL${href + strippedLinkText}`),
            dismissAll: option.checks.LINK_SYMBOLS.dismissAll ? 'LINK_SYMBOLS' : false,
            developer: option.checks.LINK_SYMBOLS.developer || false,
          });
        }
      } else if (isSingleSpecialChar && !titleAttr) {
        // Link is ONLY a period, comma, or special character.
        if (option.checks.LINK_EMPTY) {
          results.push({
            test: 'LINK_EMPTY',
            element: $el,
            type: option.checks.LINK_EMPTY.type || 'error',
            content: Lang.sprintf(option.checks.LINK_EMPTY.content || 'LINK_EMPTY'),
            inline: true,
            position: 'afterend',
            dismiss: Utils.prepareDismissal(`LINKCHAR${href}`),
            dismissAll: option.checks.LINK_EMPTY.dismissAll ? 'LINK_EMPTY' : false,
            developer: option.checks.LINK_EMPTY.developer || false,
          });
        }
        return;
      }

      /**
       * Uses "click here" in the link text or accessible name.
       */
      if (hasClickWord) {
        if (option.checks.LINK_CLICK_HERE) {
          results.push({
            test: 'LINK_CLICK_HERE',
            element: $el,
            type: option.checks.LINK_CLICK_HERE.type || 'warning',
            content: option.checks.LINK_CLICK_HERE.content
              ? Lang.sprintf(option.checks.LINK_CLICK_HERE.content)
              : Lang.sprintf('LINK_CLICK_HERE') + Lang.sprintf('LINK_TIP'),
            inline: true,
            dismiss: Utils.prepareDismissal(`LINKCLICKHERE${href + strippedLinkText}`),
            dismissAll: option.checks.LINK_CLICK_HERE.dismissAll ? 'LINK_CLICK_HERE' : false,
            developer: option.checks.LINK_CLICK_HERE.developer || false,
          });
        }
      }

      /**
       * Link's title attribute is the same as the link text.
       */
      if (textContent.length !== 0 && titleAttr?.toLowerCase() === linkText.toLowerCase()) {
        if (option.checks.DUPLICATE_TITLE) {
          results.push({
            test: 'DUPLICATE_TITLE',
            element: $el,
            type: option.checks.DUPLICATE_TITLE.type || 'warning',
            content: Lang.sprintf(option.checks.DUPLICATE_TITLE.content || 'DUPLICATE_TITLE'),
            inline: true,
            dismiss: Utils.prepareDismissal(`LINKDUPLICATETITLE${href + strippedLinkText}`),
            dismissAll: option.checks.DUPLICATE_TITLE.dismissAll ? 'DUPLICATE_TITLE' : false,
            developer: option.checks.DUPLICATE_TITLE.developer || false,
          });
        }
      }
    }

    if (strippedLinkText.length !== 0) {
      // Links with identical accessible names have equivalent purpose.
      if (seen[strippedLinkText] && !seen[href]) {
        const ignored = $el.ariaHidden === 'true' && $el.getAttribute('tabindex') === '-1';
        const hasAttributes = $el.hasAttribute('role') || $el.hasAttribute('disabled');
        if (option.checks.LINK_IDENTICAL_NAME && !hasAttributes && !ignored) {
          const sanitizedText = Utils.sanitizeHTML(linkText);
          results.push({
            test: 'LINK_IDENTICAL_NAME',
            element: $el,
            type: option.checks.LINK_IDENTICAL_NAME.type || 'warning',
            content: option.checks.LINK_IDENTICAL_NAME.content
              ? Lang.sprintf(option.checks.LINK_IDENTICAL_NAME.content, sanitizedText)
              : `${Lang.sprintf('LINK_IDENTICAL_NAME', sanitizedText)} ${Lang.sprintf('ACC_NAME_TIP')}`,
            inline: true,
            dismiss: Utils.prepareDismissal(`LINKSEEN${href + strippedLinkText}`),
            dismissAll: option.checks.LINK_IDENTICAL_NAME.dismissAll
              ? 'LINK_IDENTICAL_NAME'
              : false,
            developer: option.checks.LINK_IDENTICAL_NAME.developer || false,
          });
        }
      } else {
        seen[strippedLinkText] = true;
        seen[href] = true;
      }

      // Link opens in new tab without warning.
      if (targetBlank && !fileTypeMatch && !containsNewWindowPhrases) {
        if (option.checks.LINK_NEW_TAB) {
          results.push({
            test: 'LINK_NEW_TAB',
            element: $el,
            type: option.checks.LINK_NEW_TAB.type || 'warning',
            content: Lang.sprintf(option.checks.LINK_NEW_TAB.content || 'LINK_NEW_TAB'),
            inline: true,
            dismiss: Utils.prepareDismissal(`LINKNEWTAB${href + strippedLinkText}`),
            dismissAll: option.checks.LINK_NEW_TAB.dismissAll ? 'LINK_NEW_TAB' : false,
            developer: option.checks.LINK_NEW_TAB.developer || false,
          });
        }
      }

      // Link points to file (non HTML resource) without warning.
      if (fileTypeMatch && !containsFileTypePhrases) {
        if (option.checks.LINK_FILE_EXT) {
          results.push({
            test: 'LINK_FILE_EXT',
            element: $el,
            type: option.checks.LINK_FILE_EXT.type || 'warning',
            content: Lang.sprintf(option.checks.LINK_FILE_EXT.content || 'LINK_FILE_EXT'),
            inline: true,
            dismiss: Utils.prepareDismissal(`LINKEXT${href + strippedLinkText}`),
            dismissAll: option.checks.LINK_FILE_EXT.dismissAll ? 'LINK_FILE_EXT' : false,
            developer: option.checks.LINK_FILE_EXT.developer || false,
          });
        }
      }
    }
  });
  return results;
}
