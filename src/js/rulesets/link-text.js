import { computeAccessibleName } from '../utils/computeAccessibleName';
import Constants from '../utils/constants';
import Elements from '../utils/elements';
import Lang from '../utils/lang';
import * as Utils from '../utils/utils';
import { State } from '../core/state';
import { pushResult } from '../utils/pushResult';

const cssFileTypeSelectors =
  'a[href$=".pdf"], a[href$=".doc"], a[href$=".docx"], a[href$=".zip"], a[href$=".mp3"], a[href$=".txt"], a[href$=".exe"], a[href$=".dmg"], a[href$=".rtf"], a[href$=".pptx"], a[href$=".ppt"], a[href$=".xls"], a[href$=".xlsx"], a[href$=".csv"], a[href$=".mp4"], a[href$=".mov"], a[href$=".avi"]';

// Regex pattern for common citations/publications.
const citationPattern =
  /(doi\.org\/|dl\.acm\.org\/|link\.springer\.com\/|pubmed\.ncbi\.nlm\.nih\.gov\/|scholar\.google\.com\/|ieeexplore\.ieee\.org\/|researchgate\.net\/publication\/|sciencedirect\.com\/science\/article\/|10\.\d{4,}\/)[a-z0-9/.-]+/i;

// Regex pattern for common URL endings.
const urlEndings =
  /\b(?:\.edu\/|\.gob\/|\.gov\/|\.app\/|\.com\/|\.net\/|\.org\/|\.us\/|\.ca\/|\.de\/|\.icu\/|\.uk\/|\.ru\/|\.info\/|\.top\/|\.xyz\/|\.tk\/|\.cn\/|\.ga\/|\.cf\/|\.nl\/|\.io\/|\.fr\/|\.pe\/|\.nz\/|\.pt\/|\.es\/|\.pl\/|\.ua\/)\b/i;

// Regex pattern to match any special characters (that isn't alpha numeric)
const specialCharPattern = /[^a-zA-Z0-9]/;

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
export default function checkLinkText() {
  const seen = {};
  Elements.Found.Links.forEach(($el) => {
    // Attributes.
    const href = $el.href ? Utils.standardizeHref($el) : '';
    const titleAttr = $el.getAttribute('title');
    const targetBlank = $el.getAttribute('target')?.trim()?.toLowerCase() === '_blank';

    // Get ARIA attributes.
    const ariaLabel = $el.getAttribute('aria-label');
    const ariaLabelledby = $el.getAttribute('aria-labelledby');
    const childLabelledby = !ariaLabelledby ? $el.querySelector('[aria-labelledby]') : null;
    const hasAriaLabelledby = ariaLabelledby || childLabelledby;
    const hasAria = hasAriaLabelledby || ariaLabel || $el.querySelector('[aria-label]');

    // Link text computation.
    const accName = Utils.removeWhitespace(
      computeAccessibleName($el, Constants.Exclusions.LinkSpan),
    );

    // Strip away text from linkIgnoreStrings prop.
    const linkText = accName.replace(Constants.Global.linkIgnorePattern, '');

    // Accessible name (lower case) for regex matching.
    const lowercaseLinkText = linkText.toLowerCase();

    // Ignore special characters (except forward slash).
    const strippedLinkText = Utils.stripAllSpecialCharacters(lowercaseLinkText);

    // Original preserved text to lowercase.
    const rawTextContent = Utils.getText($el);
    const textContent = rawTextContent.toLowerCase();
    const textContentIgnoredStrings = Utils.getText(
      Utils.fnIgnore($el, Constants.Exclusions.LinkSpan),
    ).replace(Constants.Global.linkIgnorePattern, '');

    // Shared tests.
    const containsNewWindowPhrases =
      lowercaseLinkText.match(Constants.Global.newWindowRegex)?.[0] ||
      textContent.match(Constants.Global.newWindowRegex)?.[0];
    const containsFileTypePhrases =
      lowercaseLinkText.match(Constants.Global.fileTypeRegex)?.[0] ||
      textContent.match(Constants.Global.fileTypeRegex)?.[0];
    const fileTypeMatch = $el.matches(cssFileTypeSelectors);

    // Push to results array.
    const logResult = (params) =>
      pushResult({
        element: $el,
        type: params.type || 'warning',
        dismiss: params.dismiss || href,
        inline: true,
        ...params,
      });

    // Do not conflict with alt text module.
    if (!$el.querySelector('img')) {
      // Links with ARIA
      if (hasAria && linkText.length !== 0) {
        // General warning for visible non-descript link text, regardless of ARIA label.
        const excludeSpan = Utils.fnIgnore($el, Constants.Exclusions.LinkSpan);
        const visibleLinkText = Utils.getText(excludeSpan).replace(
          Constants.Global.linkIgnorePattern,
          '',
        );
        const stopword = checkStopWords(
          Utils.stripAllSpecialCharacters(visibleLinkText),
          Constants.Global.linkStopWords,
        );

        // Label in name.
        const visibleTextInName = Utils.isVisibleTextInAccName(
          $el,
          accName,
          Constants.Exclusions.LinkSpan,
          State.option.linkIgnoreStrings,
        );

        if (stopword !== null) {
          // ARIA label contains stop word.
          logResult({
            test: 'LINK_STOPWORD_ARIA',
            args: [stopword, linkText],
            content: Lang._('LINK_STOPWORD_ARIA') + Lang._('LINK_TIP'),
            dismiss: strippedLinkText,
            developer: true,
          });
        } else if (visibleTextInName && textContent.length !== 0) {
          // Link must have visible label as part of their accessible name.
          logResult({
            test: 'LABEL_IN_NAME',
            args: [textContentIgnoredStrings, linkText],
            content: Lang._('LABEL_IN_NAME') + Lang._('ACC_NAME_TIP'),
            dismiss: strippedLinkText,
            position: 'afterend',
            developer: true,
          });
        } else {
          // If the link has any ARIA, append a "Good" link button.
          // Developer check: so full accessible name is exposed (without ignores).
          const accessibleName = Utils.removeWhitespace(computeAccessibleName($el));
          logResult({
            test: 'LINK_LABEL',
            type: 'good',
            args: [accessibleName],
            content: Lang._('ACC_NAME') + Lang._('ACC_NAME_TIP'),
            dismiss: strippedLinkText,
            position: 'afterend',
            developer: true,
          });
        }
      }

      // If link text is only "new window" or similar phrases.
      let oneStop = false;
      const triggerStopWord = () => {
        if (!oneStop && State.option.checks.LINK_STOPWORD) {
          oneStop = true;
          const textToDisplay = linkText.length === 0 ? rawTextContent : linkText;
          logResult({
            test: 'LINK_STOPWORD',
            type: 'error',
            args: [textToDisplay],
            content: Lang._('LINK_STOPWORD') + Lang._('LINK_TIP'),
            dismiss: strippedLinkText,
            position: 'afterend',
          });
        }
      };

      // Find exact stop word matches that are passed via linkIgnoreStrings prop.
      const isLinkIgnoreStrings = checkStopWords(textContent, Constants.Global.linkIgnoreStrings);

      // If link text is ONLY strings that were passed in via prop.
      // Note: these two MUST come before empty hyperlink checks.
      if (isLinkIgnoreStrings === textContent || isLinkIgnoreStrings === strippedLinkText) {
        triggerStopWord();
      } else if (
        containsNewWindowPhrases === textContent ||
        containsNewWindowPhrases === strippedLinkText
      ) {
        triggerStopWord();
        return;
      }

      /* ******************* */
      /*  Empty hyperlinks   */
      /* ******************* */

      if (linkText.length === 0) {
        if (hasAriaLabelledby) {
          // Has ariaLabelledby attribute but empty accessible name.
          logResult({
            test: 'LINK_EMPTY_LABELLEDBY',
            type: 'error',
            position: 'afterend',
            developer: true,
          });
        } else if ($el.children.length) {
          // Add correct warning when link text is only linkIgnoreSpan text.
          let hasStopWordWarning = false;
          if (State.option.linkIgnoreSpan) {
            const spanEl = $el.querySelector(State.option.linkIgnoreSpan);
            if (spanEl) {
              const spanText = Utils.stripAllSpecialCharacters(spanEl.textContent)
                .trim()
                .toLowerCase();
              if (spanText === textContent) {
                triggerStopWord();
                hasStopWordWarning = true;
              }
            }
          }
          if (!hasStopWordWarning) {
            // Has child elements (e.g. SVG or SPAN) <a><i></i></a>
            logResult({
              test: 'LINK_EMPTY_NO_LABEL',
              type: 'error',
              position: 'afterend',
            });
          }
        } else if (!isLinkIgnoreStrings) {
          // Completely empty <a></a>
          logResult({
            test: 'LINK_EMPTY',
            type: 'error',
            position: 'afterend',
          });
        }
        return;
      }

      /* ************************** */
      /*  Link text quality checks. */
      /* ************************** */

      // 1. Check for exact stop words. Strip "new window" phrases by default.
      const isStopWord = checkStopWords(
        strippedLinkText,
        Constants.Global.linkStopWords,
        Constants.Global.newWindowRegex,
      );

      // 2. Check for "click" words anywhere within string.
      const hasClickWord =
        strippedLinkText.match(Constants.Global.clickRegex)?.[0] ||
        textContent.match(Constants.Global.clickRegex)?.[0];

      // 3. Check for citations/references.
      const isCitation = lowercaseLinkText.match(citationPattern)?.[0];

      // 4. If link text resembles a URL.
      const isUrlFragment =
        lowercaseLinkText.startsWith('www.') ||
        lowercaseLinkText.startsWith('http') ||
        Boolean(lowercaseLinkText.match(urlEndings));

      // 5. Match special characters exactly 1 character in length.
      const isSingleSpecialChar = linkText.length === 1 && specialCharPattern.test(linkText);

      // 6. Match HTML symbols.
      const matchedSymbol = lowercaseLinkText.match(htmlSymbols)?.[0];

      if (isStopWord) {
        // Link is exact stop word.
        triggerStopWord();
      } else if (isCitation && linkText.length > 8) {
        // Contains DOI URL in link text.
        logResult({
          test: 'LINK_DOI',
          args: [linkText],
          dismiss: strippedLinkText,
        });
      } else if (
        isUrlFragment &&
        !hasAria &&
        linkText.length > (State.option.checks.LINK_URL?.maxLength || 40)
      ) {
        // Contains URL in link text (for non ARIA links)
        logResult({
          test: 'LINK_URL',
          args: [linkText],
          content: Lang._('LINK_URL') + Lang._('LINK_TIP'),
          dismiss: strippedLinkText,
        });
      } else if (matchedSymbol && linkText.length > 1) {
        // If link contains a special character used as a CTA.
        logResult({
          test: 'LINK_SYMBOLS',
          args: [matchedSymbol, linkText],
          dismiss: strippedLinkText,
        });
      } else if ((isSingleSpecialChar || matchedSymbol) && !titleAttr) {
        // Link is ONLY a period, comma, or special character.
        logResult({
          test: 'LINK_UNPRONOUNCEABLE',
          type: 'error',
          args: [linkText],
          content: Lang._('LINK_UNPRONOUNCEABLE') + Lang._('LINK_TIP'),
          position: 'afterend',
        });
        return;
      }

      // Uses "click here" in the link text or accessible name.
      if (hasClickWord) {
        logResult({
          test: 'LINK_CLICK_HERE',
          args: [linkText],
          content: Lang._('LINK_CLICK_HERE') + Lang._('LINK_TIP'),
          dismiss: strippedLinkText,
        });
      }

      //  Link's title attribute is the same as the link text.
      if (textContent.length !== 0 && titleAttr?.toLowerCase() === linkText.toLowerCase()) {
        logResult({
          test: 'DUPLICATE_TITLE',
          dismiss: strippedLinkText,
        });
      }
    }

    // Links with identical accessible names have equivalent purpose.
    if (strippedLinkText.length !== 0) {
      if (seen[strippedLinkText] && !seen[href]) {
        const ignored = Utils.isHiddenAndUnfocusable($el);
        const hasAttributes = $el.hasAttribute('role') || Utils.isDisabled($el);
        const condition = linkText.toLowerCase() !== textContentIgnoredStrings.toLowerCase();
        if (!hasAttributes && !ignored) {
          logResult({
            test: 'LINK_IDENTICAL_NAME',
            args: [textContentIgnoredStrings, linkText],
            content:
              Lang._('LINK_IDENTICAL_NAME') +
              (condition ? `<hr> ${Lang._('ACC_NAME')}` : `<hr> ${Lang._('LINK_TEXT')}`) +
              Lang._('LINK_TIP'),
            dismiss: strippedLinkText,
          });
        }
      } else {
        seen[strippedLinkText] = href;
        seen[href] = true;
      }

      // Link opens in new tab without warning.
      if (targetBlank && !fileTypeMatch && !containsNewWindowPhrases) {
        const condition = linkText.toLowerCase() !== textContentIgnoredStrings.toLowerCase();
        logResult({
          test: 'LINK_NEW_TAB',
          args: [linkText],
          content:
            Lang._('LINK_NEW_TAB') +
            (condition
              ? `<hr> ${Lang._('ACC_NAME') + Lang._('ACC_NAME_TIP')}`
              : `<hr> ${Lang._('LINK_TEXT')}`),
          dismiss: strippedLinkText,
        });
      }

      // Link points to file (non HTML resource) without warning.
      if (fileTypeMatch && !containsFileTypePhrases) {
        logResult({
          test: 'LINK_FILE_EXT',
          args: [linkText],
          dismiss: strippedLinkText,
        });
      }
    }

    /* ************************************************************** */
    /*  Additional link checks previously from quality-assurance.js   */
    /* ************************************************************** */
    const hasExtension = $el.matches(Constants.Global.documentSources);
    const hasPDF = State.option.checks.QA_PDF?.sources
      ? $el.matches(State.option.checks.QA_PDF.sources)
      : $el.matches('a[href$=".pdf"], a[href*=".pdf?"]');

    if (hasExtension) {
      logResult({
        test: 'QA_DOCUMENT',
        args: [linkText],
        dismissSuffix: href,
      });
    } else if (hasPDF) {
      logResult({
        test: 'QA_PDF',
        args: [linkText],
        dismissSuffix: href,
      });
    }

    // Check for broken same-page links and missing interactive semantics.
    if (State.option.checks.QA_IN_PAGE_LINK || State.option.checks.LINK_MAYBE_BUTTON) {
      const rawHref = $el.getAttribute('href');
      const hasAttributes =
        $el.hasAttribute('role') ||
        $el.hasAttribute('aria-haspopup') ||
        $el.hasAttribute('aria-expanded') ||
        $el.hasAttribute('onclick') ||
        Utils.isDisabled($el) ||
        !!Utils.getCachedClosest($el, 'nav, [role="navigation"]');

      if (
        (!rawHref || rawHref.startsWith('#')) &&
        Utils.getText($el).length !== 0 &&
        !Utils.isHiddenAndUnfocusable($el) &&
        !hasAttributes
      ) {
        const targetId = rawHref?.substring(1);
        const ariaControls = $el.getAttribute('aria-controls');
        const targetElement =
          targetId &&
          (document.getElementById(targetId) ||
            (ariaControls && document.getElementById(ariaControls)) ||
            (decodeURIComponent(targetId) !== targetId &&
              document.getElementById(decodeURIComponent(targetId))) ||
            (encodeURIComponent(targetId) !== targetId &&
              document.getElementById(encodeURIComponent(targetId))) ||
            document.querySelector(`a[name="${CSS.escape(targetId)}"]`));

        if (!targetElement) {
          let isFauxButton = false;
          const matchedKeyword = Lang._('POTENTIAL_UI_ELEMENTS').find((word) =>
            accName.toLowerCase().includes(word),
          );
          const isSlide = Object.keys($el.dataset).some((key) =>
            key.toLowerCase().includes('slide'),
          );

          // Broken same page link BUT most likely a button!
          if ((matchedKeyword || isSlide) && accName.length <= 15) {
            isFauxButton = true;
            logResult({
              test: 'LINK_MAYBE_BUTTON',
              type: 'error',
              args: [accName],
              dismiss: matchedKeyword,
              developer: true,
            });
          }

          // Mostly likely broken same-page link.
          if (!isFauxButton) {
            logResult({
              test: 'QA_IN_PAGE_LINK',
              type: 'error',
              args: [targetId, accName],
            });
          }
        }
      }
    }
  });
}
