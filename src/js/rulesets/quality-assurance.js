import Constants from '../utils/constants';
import Elements from '../utils/elements';
import * as Utils from '../utils/utils';
import Lang from '../utils/lang';

export default function checkQA(results, option) {
  /* *********************************************************** */
  /*  Error: Find all links pointing to development environment. */
  /* *********************************************************** */
  if (option.badLinksQA) {
    Elements.Found.CustomErrorLinks.forEach(($el) => {
      results.push({
        element: $el,
        type: 'error',
        content: Lang.sprintf('QA_BAD_LINK', $el),
        inline: true,
        position: 'beforebegin',
      });
    });
  }

  /* *********************************************************** */
  /*  Warning: Excessive bolding or italics.                     */
  /* *********************************************************** */
  if (option.strongItalicsQA) {
    Elements.Found.StrongItalics.forEach(($el) => {
      const strongItalicsText = $el.textContent.trim().length;
      const key = Utils.prepareDismissal($el.tagName + $el.textContent);
      if (strongItalicsText > 400) {
        results.push({
          element: $el.parentNode,
          type: 'warning',
          content: Lang.sprintf('QA_BAD_ITALICS'),
          inline: false,
          position: 'beforebegin',
          dismiss: key,
        });
      }
    });
  }

  /* ************************************************************** */
  /*  Warning: Additional link checks.                              */
  /* ************************************************************** */
  Elements.Found.Links.forEach(($el) => {
    if ($el.hasAttribute('href')) {
      const href = $el.getAttribute('href');

      // Has file extension.
      const hasExtension = $el.matches(Constants.Global.documentLinks);
      const hasPDF = $el.matches('a[href$=".pdf"], a[href*=".pdf?"]');

      // Dismiss key.
      const key = Utils.prepareDismissal(`DOCUMENT${href}`);

      // Check for broken same-page links.
      const hasButtonRole = $el.getAttribute('role') === 'button';
      const hasText = $el.textContent.trim().length !== 0;
      if (option.inPageLinkQA && (href.startsWith('#') || href === '') && !hasButtonRole && hasText) {
        const targetId = href.substring(1);
        const targetElement = document.getElementById(targetId) || document.getElementById(decodeURIComponent(targetId)) || document.getElementById(encodeURIComponent(targetId));
        if (!targetElement) {
          results.push({
            element: $el,
            type: 'error',
            content: Lang.sprintf('QA_IN_PAGE_LINK'),
            inline: true,
            position: 'beforebegin',
          });
        }
      }

      // Manually inspect documents & PDF for accessibility.
      if (option.documentQA && hasExtension) {
        results.push({
          element: $el,
          type: 'warning',
          content: Lang.sprintf('QA_DOCUMENT'),
          inline: true,
          position: 'beforebegin',
          dismiss: key,
        });
      } else if (option.pdfQA && hasPDF) {
        results.push({
          element: $el,
          type: 'warning',
          content: Lang.sprintf('QA_PDF'),
          inline: true,
          position: 'beforebegin',
          dismiss: key,
        });
      }
    }
  });

  /* *************************************************************** */
  /*  Error: Missing language tag. Lang should be at least 2 chars.  */
  /* *************************************************************** */
  if (option.langQA) {
    if (!Elements.Found.Language || Elements.Found.Language.length < 2) {
      results.push({
        type: 'error',
        content: Lang.sprintf('QA_PAGE_LANGUAGE'),
      });
    }
  }

  /* *************************************************************** */
  /*  Warning: Find blockquotes used as headers.                     */
  /* *************************************************************** */
  if (option.blockquotesQA) {
    Elements.Found.Blockquotes.forEach(($el) => {
      const bqHeadingText = $el.textContent;
      if (bqHeadingText.trim().length < 25) {
        const sanitizedText = Utils.sanitizeHTML(bqHeadingText);
        const key = Utils.prepareDismissal(`BLOCKQUOTE${sanitizedText}`);
        results.push({
          element: $el,
          type: 'warning',
          content: Lang.sprintf('QA_BLOCKQUOTE_MESSAGE', sanitizedText),
          inline: false,
          position: 'beforebegin',
          dismiss: key,
        });
      }
    });
  }

  /* *************************************************************** */
  /*  Errors: Check HTML tables for issues.                          */
  /* *************************************************************** */
  if (option.tablesQA) {
    Elements.Found.Tables.forEach(($el) => {
      const tableHeaders = $el.querySelectorAll('th');
      const semanticHeadings = $el.querySelectorAll('h1, h2, h3, h4, h5, h6');
      if (option.tablesQAmissingTH && tableHeaders.length === 0) {
        results.push({
          element: $el,
          type: 'error',
          content: Lang.sprintf('TABLES_MISSING_HEADINGS'),
          inline: false,
          position: 'beforebegin',
        });
      }
      if (option.tablesQAsemanticHeadings && semanticHeadings.length > 0) {
        semanticHeadings.forEach((heading) => {
          results.push({
            element: heading,
            type: 'error',
            content: Lang.sprintf('TABLES_SEMANTIC_HEADING'),
            inline: false,
            position: 'beforebegin',
          });
        });
      }
      tableHeaders.forEach((th) => {
        if (option.tablesQAemptyTH && th.textContent.trim().length === 0) {
          const issueType = (option.tablesQAemptyTHisError) ? 'error' : 'warning';
          const key = Utils.prepareDismissal(`TABLE${$el.textContent}`);
          results.push({
            element: th,
            type: issueType,
            content: Lang.sprintf('TABLES_EMPTY_HEADING'),
            inline: false,
            position: 'afterbegin',
            dismiss: key,
          });
        }
      });
    });
  }

  /* ****************************************************************** */
  /*  Warning: Detect fake headings                                     */
  /* ****************************************************************** */
  if (option.fakeHeadingsQA) {
    const ignoreParents = 'h1, h2, h3, h4, h5, h6, [role="heading"][aria-level], blockquote, table';

    // Find large text as heading.
    const computeLargeParagraphs = (p) => {
      const size = getComputedStyle(p).fontSize.replace('px', '');
      const getText = Utils.getText(p);
      const maybeSentence = getText.match(/[.;?!"]/) === null;
      const typicalHeadingLength = getText.length >= 4 && getText.length <= 120;

      if (size >= 24 && !p.closest(ignoreParents) && typicalHeadingLength && maybeSentence) {
        const sanitizedText = Utils.sanitizeHTML(getText);
        const key = Utils.prepareDismissal(`BOLD${sanitizedText}`);
        results.push({
          element: p,
          type: 'warning',
          content: Lang.sprintf('QA_FAKE_HEADING', sanitizedText),
          inline: false,
          position: 'beforebegin',
          dismiss: key,
        });
      }
    };

    // Find bolded text as headings.
    const computeBoldTextParagraphs = (p) => {
      const startsWithBold = /^(<strong>|<b>)/i.test(p.innerHTML.trim());

      if (startsWithBold && !p.closest(ignoreParents)) {
        const possibleHeading = p.querySelector('strong, b');
        const possibleHeadingText = Utils.getText(possibleHeading);

        // Conditions
        const notASentence = possibleHeadingText.match(/[.:;?!"']/) === null;
        const typicalHeadingLength = possibleHeadingText.length >= 3 && possibleHeadingText.length <= 120;

        if (typicalHeadingLength && notASentence) {
          // Be a little forgiving if it's a small paragraph.
          const nonHeadingTextLength = Utils.fnIgnore(p, 'strong, bold').textContent.trim().length;
          if (nonHeadingTextLength !== 0 && nonHeadingTextLength <= 250) {
            return;
          }

          const sanitizedText = Utils.sanitizeHTML(possibleHeadingText);
          const key = Utils.prepareDismissal(`BOLD${sanitizedText}`);
          results.push({
            element: possibleHeading,
            type: 'warning',
            content: Lang.sprintf('QA_FAKE_HEADING', sanitizedText),
            inline: false,
            position: 'beforebegin',
            dismiss: key,
          });
        }
      }
    };

    Elements.Found.Paragraphs.forEach((p) => {
      computeLargeParagraphs(p);
      computeBoldTextParagraphs(p);
    });
  }

  /* *************************************************************** */
  /*  Warning: Detect paragraphs that should be lists.               */
  /*  Thanks to John Jameson from PrincetonU for this ruleset!       */
  /* *************************************************************** */
  if (option.fakeListQA) {
    const numberMatch = new RegExp(/(([023456789][\d\s])|(1\d))/, ''); // All numbers but 1.
    const alphabeticMatch = new RegExp(/(^[aA1αаΑ]|[^\p{Alphabetic}\s])[-\s.)]/, 'u');
    const emojiMatch = new RegExp(/\p{Extended_Pictographic}/, 'u');
    const secondTextNoMatch = ['a', 'A', 'α', 'Α', 'а', 'А', '1'];
    const specialCharsMatch = /[([{#]/;
    const prefixDecrement = {
      2: '1',
      b: 'a',
      B: 'A',
      β: 'α',
      Β: 'Α',
      б: 'а',
      Б: 'А',
    };
    const decrement = (element) => element.replace(/^b|^B|^б|^Б|^β|^В|^2/, (match) => prefixDecrement[match]);

    // Variables to carry in loop.
    let activeMatch = ''; // Carried in loop for second paragraph.
    let firstText = ''; // Text of previous paragraph.
    let lastHitWasEmoji = false;

    Elements.Found.Paragraphs.forEach((p, i) => {
      let secondText = false;
      let hit = false;
      firstText = firstText || Utils.getText(p).replace('(', '');
      const firstPrefix = firstText.substring(0, 2);

      // Grab first two characters.
      const isAlphabetic = firstPrefix.match(alphabeticMatch);
      const isNumber = firstPrefix.match(numberMatch);
      const isEmoji = firstPrefix.match(emojiMatch);
      const isSpecialChar = specialCharsMatch.test(firstPrefix.charAt(0));

      if (
        firstPrefix.length > 0
        && firstPrefix !== activeMatch
        && !isNumber
        && (isAlphabetic || isEmoji || isSpecialChar)
      ) {
        // We have a prefix and a possible hit; check next detected paragraph.
        const secondP = Elements.Found.Paragraphs[i + 1];
        if (secondP) {
          secondText = Utils.getText(secondP).replace('(', '').substring(0, 2);
          if (secondTextNoMatch.includes(secondText?.toLowerCase().trim())) {
            // A sentence. Another sentence. (A sentence). 1 apple, 1 banana.
            return;
          }
          const secondPrefix = decrement(secondText);
          if (isAlphabetic) {
            // Check for repeats (*,*) or increments(a,b)
            if (firstPrefix !== 'A ' && firstPrefix === secondPrefix) {
              hit = true;
            }
          } else if (isEmoji && !lastHitWasEmoji) {
            // Check for two paragraphs in a row that start with emoji.
            if (secondPrefix.match(emojiMatch)) {
              hit = true;
              lastHitWasEmoji = true;
              // This is carried; better miss than have lots of positives.
            }
          }
        }
        if (!hit) {
          // Split p by carriage return if there was a firstPrefix and compare.
          let textAfterBreak = p?.querySelector('br')?.nextSibling?.nodeValue;
          if (textAfterBreak) {
            textAfterBreak = textAfterBreak.replace(/<\/?[^>]+(>|$)/g, '').trim().substring(0, 2);
            const checkForOtherPrefixChars = specialCharsMatch.test(textAfterBreak.charAt(0));
            if (checkForOtherPrefixChars
              || firstPrefix === decrement(textAfterBreak)
              || (!lastHitWasEmoji && textAfterBreak.match(emojiMatch))) {
              hit = true;
            }
          }
        } if (hit) {
          const key = Utils.prepareDismissal(`LIST${p.textContent}`);
          results.push({
            element: p,
            type: 'warning',
            content: Lang.sprintf('QA_SHOULD_BE_LIST', firstPrefix),
            inline: false,
            position: 'beforebegin',
            dismiss: key,
          });
          activeMatch = firstPrefix;
        } else {
          activeMatch = '';
        }
      }
      // Reset for next loop, carry over text query if available.
      firstText = secondText ? '' : secondText;
    });
  }

  /* *************************************************************** */
  /*  Warning: Detect uppercase text.                                */
  /* *************************************************************** */
  if (option.allCapsQA) {
    const checkCaps = ($el) => {
      let thisText = '';
      if ($el.tagName === 'LI') {
        // Prevent recursion through nested lists.
        $el.childNodes.forEach((node) => {
          if (node.nodeType === 3) {
            thisText += node.textContent;
          }
        });
      } else {
        thisText = Utils.getText($el);
      }
      const uppercasePattern = /([A-Z]{2,}[ ])([A-Z]{2,}[ ])([A-Z]{2,}[ ])([A-Z]{2,})/g;
      const detectUpperCase = thisText.match(uppercasePattern);

      if (detectUpperCase && detectUpperCase[0].length > 10) {
        const key = Utils.prepareDismissal(`UPPERCASE${thisText}`);
        results.push({
          element: $el,
          type: 'warning',
          content: Lang.sprintf('QA_UPPERCASE_WARNING'),
          inline: false,
          position: 'beforebegin',
          dismiss: key,
        });
      }
    };
    Elements.Found.Paragraphs.forEach(($el) => checkCaps($el));
    Elements.Found.Headings.forEach(($el) => checkCaps($el));
    Elements.Found.Lists.forEach(($el) => checkCaps($el));
    Elements.Found.Blockquotes.forEach(($el) => checkCaps($el));
  }

  /* *************************************************************** */
  /*  Error: Duplicate IDs                                           */
  /* *************************************************************** */
  if (option.duplicateIdQA) {
    // Look for duplicate IDs within each DOM.
    const doms = document.querySelectorAll('body, [data-sa11y-has-shadow-root]');
    doms.forEach((dom) => {
      const allIds = new Set();
      const findDuplicateIds = (ids, withinDOM) => {
        ids.forEach(($el) => {
          const { id } = $el;

          // Ignore empty IDs.
          if (typeof id !== 'string' || id.trim().length === 0) {
            return;
          }

          // Only flag duplicate IDs being referenced by same-page links, aria or a label.
          // Reference: https://accessibilityinsights.io/info-examples/web/duplicate-id-aria/
          if (id && !allIds.has(id)) {
            allIds.add(id);
          } else {
            const ariaReference = Array.from(
              withinDOM.querySelectorAll(`
                a[href*="${id}"],
                label[for*="${id}"],
                [aria-labelledby*="${id}"],
                [aria-controls*="${id}"],
                [aria-owns*="${id}"]`),
            );
            if (ariaReference.length > 0) {
              results.push({
                element: $el,
                type: 'error',
                content: Lang.sprintf('QA_DUPLICATE_ID', id),
                inline: true,
                position: 'beforebegin',
              });
            }
          }
        });
      };

      // Look for duplicate IDs within shadow DOMs.
      if (dom.shadowRoot) {
        const shadowRootIds = Array.from(
          dom.shadowRoot.querySelectorAll(`[id]:not(${Constants.Exclusions.Container})`),
        );
        findDuplicateIds(shadowRootIds, dom.shadowRoot);
      }

      // Look for duplicates IDs in document body.
      const regularIds = Array.from(
        dom.querySelectorAll(`[id]:not(${Constants.Exclusions.Container})`),
      );
      findDuplicateIds(regularIds, dom);
    });
  }

  /* *************************************************************** */
  /*  Warning: Flag underlined text.                                 */
  /*  Created by Brian Teeman.                                       */
  /* *************************************************************** */
  if (option.underlinedTextQA) {
    // Find all <u> tags.
    Elements.Found.Underlines.forEach(($el) => {
      const text = Utils.getText($el);
      const key = Utils.prepareDismissal(`UNDERLINE${text}`);
      results.push({
        element: $el,
        type: 'warning',
        content: Lang.sprintf('QA_TEXT_UNDERLINE_WARNING'),
        inline: true,
        position: 'beforebegin',
        dismiss: key,
      });
    });
    // Find underline based on computed style.
    const computeUnderline = ($el) => {
      const style = getComputedStyle($el);
      const decoration = style.textDecorationLine;
      const text = Utils.getText($el);
      if (decoration === 'underline') {
        const key = Utils.prepareDismissal(`UNDERLINE${text}`);
        results.push({
          element: $el,
          type: 'warning',
          content: Lang.sprintf('QA_TEXT_UNDERLINE_WARNING'),
          inline: false,
          position: 'beforebegin',
          dismiss: key,
        });
      }
    };
    Elements.Found.Paragraphs.forEach(($el) => computeUnderline($el));
    Elements.Found.Headings.forEach(($el) => computeUnderline($el));
    Elements.Found.Lists.forEach(($el) => computeUnderline($el));
    Elements.Found.Blockquotes.forEach(($el) => computeUnderline($el));
    Elements.Found.Spans.forEach(($el) => computeUnderline($el));
  }

  /* *************************************************************** */
  /*  Error: Page is missing meta page <title>                       */
  /* *************************************************************** */
  if (option.pageTitleQA) {
    const metaTitle = document.querySelector('head title');
    if (!metaTitle || metaTitle.textContent.trim().length === 0) {
      results.push({
        type: 'error',
        content: Lang.sprintf('QA_PAGE_TITLE'),
      });
    }
  }

  /* *************************************************************** */
  /*  Warning: Find inappropriate use of <sup> and <sub> tags.       */
  /* *************************************************************** */
  if (option.subscriptQA) {
    Elements.Found.Subscripts.forEach(($el) => {
      const text = Utils.getText($el);
      if (text.length >= 80) {
        const key = Utils.prepareDismissal($el.tagName + text);
        results.push({
          element: $el,
          type: 'warning',
          content: Lang.sprintf('QA_SUBSCRIPT_WARNING'),
          inline: true,
          position: 'beforebegin',
          dismiss: key,
        });
      }
    });
  }
  return results;
}
