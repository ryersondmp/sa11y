import Constants from '../utils/constants';
import Elements from '../utils/elements';
import * as Utils from '../utils/utils';
import Lang from '../utils/lang';

export default function checkQA(results, option) {
  /* *********************************************************** */
  /*  Error: Find all links pointing to development environment. */
  /* *********************************************************** */
  if (option.checks.QA_BAD_LINK) {
    Elements.Found.CustomErrorLinks.forEach(($el) => {
      results.push({
        element: $el,
        type: option.checks.QA_BAD_LINK.type || 'error',
        content: option.checks.QA_BAD_LINK.content || Lang.sprintf('QA_BAD_LINK', $el),
        inline: true,
        dismiss: Utils.prepareDismissal($el.tagName + $el.textContent),
        dismissAll: option.checks.QA_BAD_LINK.dismissAll ? 'QA_BAD_LINK' : false,
        developer: option.checks.QA_BAD_LINK.developer || false,
      });
    });
  }

  /* *********************************************************** */
  /*  Warning: Excessive bolding or italics.                     */
  /* *********************************************************** */
  if (option.checks.QA_STRONG_ITALICS) {
    Elements.Found.StrongItalics.forEach(($el) => {
      const text = Utils.getText($el);
      if (text.length !== 0 && text.length > 400) {
        results.push({
          element: $el.parentNode,
          type: option.checks.QA_STRONG_ITALICS.type || 'warning',
          content: option.checks.QA_STRONG_ITALICS.content || Lang.sprintf('QA_STRONG_ITALICS'),
          dismiss: Utils.prepareDismissal($el.tagName + $el.textContent),
          dismissAll: option.checks.QA_STRONG_ITALICS.dismissAll ? 'QA_STRONG_ITALICS' : false,
          developer: option.checks.QA_STRONG_ITALICS.developer || false,
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
      const hasExtension = $el.matches(Constants.Global.documentSources);
      const hasPDF = $el.matches('a[href$=".pdf"], a[href*=".pdf?"]');

      // Check for broken same-page links.
      if (option.checks.QA_IN_PAGE_LINK) {
        const hasAttributes = $el.getAttribute('role') === 'button' || $el.hasAttribute('aria-haspopup') || $el.hasAttribute('aria-expanded') || $el.hasAttribute('onclick');
        const hasText = Utils.getText($el).length !== 0;
        if ((href.startsWith('#') || href === '') && !hasAttributes && hasText) {
          const targetId = href.substring(1);
          const ariaControls = $el.getAttribute('aria-controls');
          const targetElement = document.getElementById(targetId)
            || document.getElementById(decodeURIComponent(targetId))
            || document.getElementById(encodeURIComponent(targetId))
            || document.getElementById(ariaControls)
            || document.querySelector(`a[name="${targetId}"]`);

          // If reference ID doesn't exist.
          if (!targetElement) {
            results.push({
              element: $el,
              type: option.checks.QA_IN_PAGE_LINK.type || 'error',
              content: option.checks.QA_IN_PAGE_LINK.content || Lang.sprintf('QA_IN_PAGE_LINK'),
              inline: true,
              dismiss: Utils.prepareDismissal(`QAINPAGE${href}`),
              dismissAll: option.checks.QA_IN_PAGE_LINK.dismissAll ? 'QA_IN_PAGE_LINK' : false,
              developer: option.checks.QA_IN_PAGE_LINK.developer || false,
            });
          }
        }
      }

      // Manually inspect documents & PDF for accessibility.
      if (option.checks.QA_DOCUMENT && hasExtension) {
        results.push({
          element: $el,
          type: option.checks.QA_DOCUMENT.type || 'warning',
          content: option.checks.QA_DOCUMENT.content || Lang.sprintf('QA_DOCUMENT'),
          inline: true,
          dismiss: Utils.prepareDismissal(`DOC${href}`),
          dismissAll: option.checks.QA_DOCUMENT.dismissAll ? 'QA_DOCUMENT' : false,
          developer: option.checks.QA_DOCUMENT.developer || false,
        });
      } else if (option.checks.QA_PDF && hasPDF) {
        results.push({
          element: $el,
          type: option.checks.QA_PDF.type || 'warning',
          content: option.checks.QA_PDF.content || Lang.sprintf('QA_PDF'),
          inline: true,
          dismiss: Utils.prepareDismissal(`PDF${href}`),
          dismissAll: option.checks.QA_PDF.dismissAll ? 'QA_PDF' : false,
          developer: option.checks.QA_PDF.developer || false,
        });
      }
    }
  });

  /* *************************************************************** */
  /*  Warning: Find blockquotes used as headers.                     */
  /* *************************************************************** */
  if (option.checks.QA_BLOCKQUOTE) {
    Elements.Found.Blockquotes.forEach(($el) => {
      const text = Utils.getText($el);
      if (text.length !== 0 && text.length < 25) {
        const sanitizedText = Utils.sanitizeHTML(text);
        results.push({
          element: $el,
          type: option.checks.QA_BLOCKQUOTE.type || 'warning',
          content: option.checks.QA_BLOCKQUOTE.content || Lang.sprintf('QA_BLOCKQUOTE', sanitizedText),
          dismiss: Utils.prepareDismissal(`BLOCKQUOTE${sanitizedText}`),
          dismissAll: option.checks.QA_BLOCKQUOTE.dismissAll ? 'QA_BLOCKQUOTE' : false,
          developer: option.checks.QA_BLOCKQUOTE.developer || false,
        });
      }
    });
  }

  /* *************************************************************** */
  /*  Errors: Check HTML tables for issues.                          */
  /* *************************************************************** */
  Elements.Found.Tables.forEach(($el) => {
    if (Utils.isElementHidden($el) === false) {
      const tableHeaders = $el.querySelectorAll('th');
      const semanticHeadings = $el.querySelectorAll('h1, h2, h3, h4, h5, h6');
      const key = Utils.prepareDismissal(`TABLE${$el.textContent}`);
      if (option.checks.TABLES_MISSING_HEADINGS && tableHeaders.length === 0) {
        results.push({
          element: $el,
          type: option.checks.TABLES_MISSING_HEADINGS.type || 'error',
          content: option.checks.TABLES_MISSING_HEADINGS.content || Lang.sprintf('TABLES_MISSING_HEADINGS'),
          dismiss: key,
          dismissAll: option.checks.TABLES_MISSING_HEADINGS.dismissAll ? 'TABLES_MISSING_HEADINGS' : false,
          developer: option.checks.TABLES_MISSING_HEADINGS.developer || false,
        });
      }
      if (option.checks.TABLES_SEMANTIC_HEADING && semanticHeadings.length > 0) {
        semanticHeadings.forEach((heading) => {
          results.push({
            element: heading,
            type: option.checks.TABLES_SEMANTIC_HEADING.type || 'error',
            content: option.checks.TABLES_SEMANTIC_HEADING.content || Lang.sprintf('TABLES_SEMANTIC_HEADING'),
            dismiss: key,
            dismissAll: option.checks.TABLES_SEMANTIC_HEADING.dismissAll ? 'TABLES_SEMANTIC_HEADING' : false,
            developer: option.checks.TABLES_SEMANTIC_HEADING.developer || false,
          });
        });
      }
      tableHeaders.forEach((th) => {
        if (option.checks.TABLES_EMPTY_HEADING && th.textContent.trim().length === 0) {
          results.push({
            element: th,
            type: option.checks.TABLES_EMPTY_HEADING.type || 'error',
            content: option.checks.TABLES_EMPTY_HEADING.content || Lang.sprintf('TABLES_EMPTY_HEADING'),
            position: 'afterbegin',
            dismiss: key,
            dismissAll: option.checks.TABLES_EMPTY_HEADING.dismissAll ? 'TABLES_EMPTY_HEADING' : false,
            developer: option.checks.TABLES_EMPTY_HEADING.developer || false,
          });
        }
      });
    }
  });

  /* ****************************************************************** */
  /*  Warning: Detect fake headings                                     */
  /* ****************************************************************** */
  if (option.checks.QA_FAKE_HEADING) {
    const addResult = (element, sanitizedText) => {
      results.push({
        element,
        type: option.checks.QA_FAKE_HEADING.type || 'warning',
        content: option.checks.QA_FAKE_HEADING.content || Lang.sprintf('QA_FAKE_HEADING', sanitizedText),
        dismiss: Utils.prepareDismissal(`BOLD${sanitizedText}`),
        dismissAll: option.checks.QA_FAKE_HEADING.dismissAll ? 'QA_FAKE_HEADING' : false,
        developer: option.checks.QA_FAKE_HEADING.developer || false,
      });
    };

    // To minimize false positives/number of warnings...
    const isPreviousElementAHeading = (p) => {
      const previousElement = p.previousElementSibling;
      if (!previousElement) return false;
      const headingTags = ['H1', 'H2', 'H3', 'H4', 'H5', 'H6'];
      return headingTags.includes(previousElement.tagName);
    };

    // Find large text as heading.
    const ignoreParents = 'h1, h2, h3, h4, h5, h6, [role="heading"][aria-level], blockquote, table';
    const computeLargeParagraphs = (p) => {
      const size = getComputedStyle(p).fontSize.replace('px', '');
      const getText = Utils.getText(p);
      const maybeSentence = getText.match(/[.;?!"]/) === null;
      const typicalHeadingLength = getText.length >= 4 && getText.length <= 120;

      if (size >= 24 && !p.closest(ignoreParents) && typicalHeadingLength && maybeSentence && !isPreviousElementAHeading(p)) {
        const sanitizedText = Utils.sanitizeHTML(getText);
        addResult(p, sanitizedText);
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
          const nonHeadingTextLength = Utils.fnIgnore(p, ['strong', 'b']).textContent.trim().length;
          if (nonHeadingTextLength !== 0 && nonHeadingTextLength <= 250) {
            return;
          }

          const sanitizedText = Utils.sanitizeHTML(possibleHeadingText);
          addResult(possibleHeading, sanitizedText);
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
  if (option.checks.QA_FAKE_LIST) {
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
          results.push({
            element: p,
            type: option.checks.QA_FAKE_LIST.type || 'warning',
            content: option.checks.QA_FAKE_LIST.content || Lang.sprintf('QA_FAKE_LIST', firstPrefix),
            dismiss: Utils.prepareDismissal(`LIST${p.textContent}`),
            dismissAll: option.checks.QA_FAKE_LIST.dismissAll ? 'QA_FAKE_LIST' : false,
            developer: option.checks.QA_FAKE_LIST.developer || false,
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

  /* **************************************** */
  /*  Warning: Detect uppercase text.         */
  /* **************************************** */
  if (option.checks.QA_UPPERCASE) {
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

      // Patterns
      const uppercasePattern = /([A-Z]{2,}[ ])([A-Z]{2,}[ ])([A-Z]{2,}[ ])([A-Z]{2,})/g;
      const detectUpperCase = thisText.match(uppercasePattern);

      if (detectUpperCase && detectUpperCase[0].length > 10) {
        results.push({
          element: $el,
          type: option.checks.QA_UPPERCASE.type || 'warning',
          content: option.checks.QA_UPPERCASE.content || Lang.sprintf('QA_UPPERCASE'),
          dismiss: Utils.prepareDismissal(`UPPERCASE${thisText}`),
          dismissAll: option.checks.QA_UPPERCASE.dismissAll ? 'QA_UPPERCASE' : false,
          developer: option.checks.QA_UPPERCASE.developer || false,
        });
      }
    };
    Elements.Found.Paragraphs.forEach(($el) => checkCaps($el));
    Elements.Found.Headings.forEach(($el) => checkCaps($el));
    Elements.Found.Lists.forEach(($el) => checkCaps($el));
    Elements.Found.Blockquotes.forEach(($el) => checkCaps($el));
  }

  /* ************************************************************** */
  /*  Various checks: underlines, justify-aligned, and small text.  */
  /* ************************************************************** */
  // Check underlined text. Created by Brian Teeman!
  const addUnderlineResult = ($el) => {
    results.push({
      element: $el,
      type: option.checks.QA_UNDERLINE.type || 'warning',
      content: option.checks.QA_UNDERLINE.content || Lang.sprintf('QA_UNDERLINE'),
      inline: true,
      dismiss: Utils.prepareDismissal(`UNDERLINE${$el.textContent}`),
      dismissAll: option.checks.QA_UNDERLINE.dismissAll ? 'QA_UNDERLINE' : false,
      developer: option.checks.QA_UNDERLINE.developer || false,
    });
  };

  const addJustifyResult = ($el) => {
    results.push({
      element: $el,
      type: option.checks.QA_JUSTIFY.type || 'warning',
      content: option.checks.QA_JUSTIFY.content || Lang._('QA_JUSTIFY'),
      dismiss: Utils.prepareDismissal(`JUSTIFIED${$el.textContent}`),
      dismissAll: option.checks.QA_JUSTIFY.dismissAll ? 'QA_JUSTIFY' : false,
      developer: option.checks.QA_JUSTIFY.developer || false,
    });
  };

  const addSmallTextResult = ($el) => {
    results.push({
      element: $el,
      type: option.checks.QA_SMALL_TEXT.type || 'warning',
      content: option.checks.QA_SMALL_TEXT.content || Lang._('QA_SMALL_TEXT'),
      dismiss: Utils.prepareDismissal(`SMALL${$el.textContent}`),
      dismissAll: option.checks.QA_SMALL_TEXT.dismissAll ? 'QA_SMALL_TEXT' : false,
      developer: option.checks.QA_SMALL_TEXT.developer || false,
    });
  };

  const computeStyle = ($el) => {
    const style = getComputedStyle($el);
    const { textDecorationLine, textAlign, fontSize } = style;

    /* Check: Underlined text. */
    if (option.checks.QA_UNDERLINE
      && textDecorationLine === 'underline'
      && !$el.closest('a[href]')
      && !$el.closest('ABBR')) {
      addUnderlineResult($el);
    }

    /* Check: Font size is greater than 0 and less than 10. */
    const defaultSize = option.checks.QA_SMALL_TEXT.fontSize || 10;
    const computedFontSize = parseFloat(fontSize);

    // Compare with parent element's font size.
    const parentFontSize = $el.parentElement
      ? parseFloat(getComputedStyle($el.parentElement).fontSize)
      : null;
    const isInherited = parentFontSize === computedFontSize;

    // Ensure the font size is specific to the element, not inherited.
    const withinRange = !isInherited && computedFontSize > 1 && computedFontSize <= defaultSize;
    if (option.checks.QA_SMALL_TEXT && withinRange) {
      addSmallTextResult($el);
    }

    /* Check: Check if text is justify-aligned. */
    if (option.checks.QA_JUSTIFY && textAlign === 'justify') {
      addJustifyResult($el);
    }
  };

  // Loop through all elements within the root area.
  if (option.checks.QA_UNDERLINE || option.checks.QA_JUSTIFY || option.checks.QA_SMALL_TEXT) {
    for (let i = 0; i < Elements.Found.Everything.length; i++) {
      const $el = Elements.Found.Everything[i];

      // Filter only text nodes.
      const textString = Array.from($el.childNodes)
        .filter((node) => node.nodeType === 3)
        .map((node) => node.textContent)
        .join('');
      const text = textString.trim();

      // Only if there's text!
      if (text.length !== 0) {
        computeStyle($el);
      }
    }
  }

  /* **************************************************** */
  /*  Find inappropriate use of <sup> and <sub> tags.     */
  /* **************************************************** */
  if (option.checks.QA_SUBSCRIPT) {
    Elements.Found.Subscripts.forEach(($el) => {
      const text = Utils.getText($el);
      if (text.length >= 80) {
        results.push({
          element: $el,
          type: option.checks.QA_SUBSCRIPT.type || 'warning',
          content: option.checks.QA_SUBSCRIPT.content || Lang.sprintf('QA_SUBSCRIPT'),
          inline: true,
          dismiss: Utils.prepareDismissal($el.tagName + text),
          dismissAll: option.checks.QA_SUBSCRIPT.dismissAll ? 'QA_SUBSCRIPT' : false,
          developer: option.checks.QA_SUBSCRIPT.developer || false,
        });
      }
    });
  }

  /* ****************************************** */
  /*  Find double nested layout components.     */
  /* ****************************************** */
  if (option.checks.QA_NESTED_COMPONENTS) {
    Elements.Found.NestedComponents.forEach(($el) => {
      const sources = option.checks.QA_NESTED_COMPONENTS.sources || '[role="tablist"], details';
      const component = $el.querySelector(sources);
      if (component) {
        results.push({
          element: $el,
          type: option.checks.QA_NESTED_COMPONENTS.type || 'warning',
          content: option.checks.QA_NESTED_COMPONENTS.content || Lang.sprintf('QA_NESTED_COMPONENTS'),
          dismiss: Utils.prepareDismissal(`NESTED${$el.textContent}`),
          dismissAll: option.checks.QA_NESTED_COMPONENTS.dismissAll ? 'QA_NESTED_COMPONENTS' : false,
          developer: option.checks.QA_NESTED_COMPONENTS.developer || false,
        });
      }
    });
  }

  return results;
}
