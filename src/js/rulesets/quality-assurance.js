import Constants from '../utils/constants';
import Elements from '../utils/elements';
import Lang from '../utils/lang';
import * as Utils from '../utils/utils';
import { State } from '../core/state';

export default function checkQA() {
  /* *********************************************************** */
  /*  Error: Find all links pointing to development environment. */
  /* *********************************************************** */
  if (State.option.checks.QA_BAD_LINK) {
    Elements.Found.CustomErrorLinks.forEach(($el) => {
      State.results.push({
        test: 'QA_BAD_LINK',
        element: $el,
        type: State.option.checks.QA_BAD_LINK.type || 'error',
        content: Lang.sprintf(State.option.checks.QA_BAD_LINK.content || 'QA_BAD_LINK', $el),
        inline: true,
        dismiss: Utils.prepareDismissal(`QA_BAD_LINK ${$el.tagName + $el.textContent}`),
        dismissAll: State.option.checks.QA_BAD_LINK.dismissAll ? 'QA_BAD_LINK' : false,
        developer: State.option.checks.QA_BAD_LINK.developer || false,
      });
    });
  }

  /* *********************************************************** */
  /*  Warning: Excessive bolding or italics.                     */
  /* *********************************************************** */
  if (State.option.checks.QA_STRONG_ITALICS) {
    Elements.Found.StrongItalics.forEach(($el) => {
      const text = Utils.getText($el);
      if (text.length !== 0 && text.length > 400) {
        State.results.push({
          test: 'QA_STRONG_ITALICS',
          element: $el.parentNode,
          type: State.option.checks.QA_STRONG_ITALICS.type || 'warning',
          content: Lang.sprintf(
            State.option.checks.QA_STRONG_ITALICS.content || 'QA_STRONG_ITALICS',
          ),
          dismiss: Utils.prepareDismissal(`QA_STRONG_ITALICS ${$el.tagName + $el.textContent}`),
          dismissAll: State.option.checks.QA_STRONG_ITALICS.dismissAll
            ? 'QA_STRONG_ITALICS'
            : false,
          developer: State.option.checks.QA_STRONG_ITALICS.developer || false,
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
      if (State.option.checks.QA_IN_PAGE_LINK) {
        const hasText = Utils.getText($el).length !== 0;
        const ignored = $el.ariaHidden === 'true' && $el.getAttribute('tabindex') === '-1';
        const hasAttributes =
          $el.hasAttribute('role') ||
          $el.hasAttribute('aria-haspopup') ||
          $el.hasAttribute('aria-expanded') ||
          $el.hasAttribute('onclick') ||
          $el.hasAttribute('disabled') ||
          $el.closest('nav, [role="navigation"]');

        if ((href.startsWith('#') || href === '') && hasText && !ignored && !hasAttributes) {
          const targetId = href.substring(1);
          const ariaControls = $el.getAttribute('aria-controls');
          const targetElement =
            targetId &&
            (document.getElementById(targetId) ||
              document.getElementById(decodeURIComponent(targetId)) ||
              document.getElementById(encodeURIComponent(targetId)) ||
              document.getElementById(ariaControls) ||
              document.querySelector(`a[name="${targetId}"]`));

          // If reference ID doesn't exist.
          if (!targetElement) {
            State.results.push({
              test: 'QA_IN_PAGE_LINK',
              element: $el,
              type: State.option.checks.QA_IN_PAGE_LINK.type || 'error',
              content: Lang.sprintf(
                State.option.checks.QA_IN_PAGE_LINK.content || 'QA_IN_PAGE_LINK',
              ),
              inline: true,
              dismiss: Utils.prepareDismissal(`QA_IN_PAGE_LINK ${href}`),
              dismissAll: State.option.checks.QA_IN_PAGE_LINK.dismissAll
                ? 'QA_IN_PAGE_LINK'
                : false,
              developer: State.option.checks.QA_IN_PAGE_LINK.developer || false,
            });
          }
        }
      }

      // Manually inspect documents & PDF for accessibility.
      if (State.option.checks.QA_DOCUMENT && hasExtension) {
        State.results.push({
          test: 'QA_DOCUMENT',
          element: $el,
          type: State.option.checks.QA_DOCUMENT.type || 'warning',
          content: Lang.sprintf(State.option.checks.QA_DOCUMENT.content || 'QA_DOCUMENT'),
          inline: true,
          dismiss: Utils.prepareDismissal(`QA_DOCUMENT ${href}`),
          dismissAll: State.option.checks.QA_DOCUMENT.dismissAll ? 'QA_DOCUMENT' : false,
          developer: State.option.checks.QA_DOCUMENT.developer || false,
        });
      } else if (State.option.checks.QA_PDF && hasPDF) {
        State.results.push({
          test: 'QA_PDF',
          element: $el,
          type: State.option.checks.QA_PDF.type || 'warning',
          content: Lang.sprintf(State.option.checks.QA_PDF.content || 'QA_PDF'),
          inline: true,
          dismiss: Utils.prepareDismissal(`QA_PDF ${href}`),
          dismissAll: State.option.checks.QA_PDF.dismissAll ? 'QA_PDF' : false,
          developer: State.option.checks.QA_PDF.developer || false,
        });
      }
    }
  });

  /* *************************************************************** */
  /*  Warning: Find blockquotes used as headers.                     */
  /* *************************************************************** */
  if (State.option.checks.QA_BLOCKQUOTE) {
    Elements.Found.Blockquotes.forEach(($el) => {
      const text = Utils.getText($el);
      if (text.length !== 0 && text.length < 25) {
        const escapedText = Utils.escapeHTML(text);
        State.results.push({
          test: 'QA_BLOCKQUOTE',
          element: $el,
          type: State.option.checks.QA_BLOCKQUOTE.type || 'warning',
          content: Lang.sprintf(
            State.option.checks.QA_BLOCKQUOTE.content || 'QA_BLOCKQUOTE',
            escapedText,
          ),
          dismiss: Utils.prepareDismissal(`QA_BLOCKQUOTE ${escapedText}`),
          dismissAll: State.option.checks.QA_BLOCKQUOTE.dismissAll ? 'QA_BLOCKQUOTE' : false,
          developer: State.option.checks.QA_BLOCKQUOTE.developer || false,
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
      const firstRow = $el.querySelector('tr') ? $el.querySelector('tr').innerHTML : $el.innerHTML;

      if (State.option.checks.TABLES_MISSING_HEADINGS && tableHeaders.length === 0) {
        State.results.push({
          test: 'TABLES_MISSING_HEADINGS',
          element: $el,
          type: State.option.checks.TABLES_MISSING_HEADINGS.type || 'error',
          content: Lang.sprintf(
            State.option.checks.TABLES_MISSING_HEADINGS.content || 'TABLES_MISSING_HEADINGS',
          ),
          dismiss: Utils.prepareDismissal(`TABLES_MISSING_HEADINGS ${firstRow}`),
          dismissAll: State.option.checks.TABLES_MISSING_HEADINGS.dismissAll
            ? 'TABLES_MISSING_HEADINGS'
            : false,
          developer: State.option.checks.TABLES_MISSING_HEADINGS.developer || false,
        });
      }
      if (State.option.checks.TABLES_SEMANTIC_HEADING && semanticHeadings.length > 0) {
        semanticHeadings.forEach((heading) => {
          State.results.push({
            test: 'TABLES_SEMANTIC_HEADING',
            element: heading,
            type: State.option.checks.TABLES_SEMANTIC_HEADING.type || 'error',
            content: Lang.sprintf(
              State.option.checks.TABLES_SEMANTIC_HEADING.content || 'TABLES_SEMANTIC_HEADING',
            ),
            dismiss: Utils.prepareDismissal(`TABLES_SEMANTIC_HEADING ${firstRow}`),
            dismissAll: State.option.checks.TABLES_SEMANTIC_HEADING.dismissAll
              ? 'TABLES_SEMANTIC_HEADING'
              : false,
            developer: State.option.checks.TABLES_SEMANTIC_HEADING.developer || false,
          });
        });
      }
      tableHeaders.forEach((th) => {
        if (State.option.checks.TABLES_EMPTY_HEADING && th.textContent.trim().length === 0) {
          State.results.push({
            test: 'TABLES_EMPTY_HEADING',
            element: th,
            type: State.option.checks.TABLES_EMPTY_HEADING.type || 'error',
            content: Lang.sprintf(
              State.option.checks.TABLES_EMPTY_HEADING.content || 'TABLES_EMPTY_HEADING',
            ),
            position: 'afterbegin',
            dismiss: Utils.prepareDismissal(`TABLES_EMPTY_HEADING ${firstRow}`),
            dismissAll: State.option.checks.TABLES_EMPTY_HEADING.dismissAll
              ? 'TABLES_EMPTY_HEADING'
              : false,
            developer: State.option.checks.TABLES_EMPTY_HEADING.developer || false,
          });
        }
      });
    }
  });

  /* ****************************************************************** */
  /*  Warning: Detect fake headings                                     */
  /* ****************************************************************** */
  if (State.option.checks.QA_FAKE_HEADING) {
    const addResult = (element, escapedText) => {
      State.results.push({
        test: 'QA_FAKE_HEADING',
        element,
        type: State.option.checks.QA_FAKE_HEADING.type || 'warning',
        content: Lang.sprintf(
          State.option.checks.QA_FAKE_HEADING.content || 'QA_FAKE_HEADING',
          escapedText,
        ),
        dismiss: Utils.prepareDismissal(`QA_FAKE_HEADING ${escapedText}`),
        inline: true,
        dismissAll: State.option.checks.QA_FAKE_HEADING.dismissAll ? 'QA_FAKE_HEADING' : false,
        developer: State.option.checks.QA_FAKE_HEADING.developer || false,
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

      if (
        size >= 24 &&
        !p.closest(ignoreParents) &&
        typicalHeadingLength &&
        maybeSentence &&
        !isPreviousElementAHeading(p)
      ) {
        const escapedText = Utils.escapeHTML(getText);
        addResult(p, escapedText);
      }
    };

    // Find bolded text as headings.
    const computeBoldTextParagraphs = (p) => {
      const html = p.innerHTML.trim();

      // Quick check before doing heavier regex match.
      if (html[0] !== '<') return;

      // <p><strong>...</strong></p> or <p><strong>...</strong><br>...</p>
      const likelyFakeHeading =
        /^<\s*(?:strong|b)\b[^>]*>[\s\S]*?<\/\s*(?:strong|b)\s*>(?:<\s*\/?\s*br\s*>|$)/i.test(html);

      // Don't proceed if no match.
      if (!likelyFakeHeading || p.closest(ignoreParents)) return;

      // Get fake heading text.
      const possibleHeading = p.querySelector('strong, b');
      if (!possibleHeading) return;
      const text = Utils.getText(possibleHeading);

      // Ignore if the bolded text is potentially a sentence.
      if (text.length < 3 || text.length > 120 || /[.:;?!"']/.test(text)) return;

      // Be a little forgiving if it's a small paragraph.
      const paragraph = Utils.fnIgnore(p, ['strong', 'b']).textContent.trim();
      if (paragraph && paragraph.length <= 250) return;

      // Ok, it's most likely a fake heading.
      addResult(possibleHeading, Utils.escapeHTML(text));
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
  if (State.option.checks.QA_FAKE_LIST) {
    const numberMatch = new RegExp(/(([023456789][\d\s])|(1\d))/, ''); // All numbers but 1.
    const alphabeticMatch = new RegExp(/(^[aA1αаΑ]|[^p{Alphabetic}\s])[-\s.)]/, 'u');
    // biome-ignore lint/complexity/noUselessEscapeInRegex: Escape is indeed needed!
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
    const decrement = (element) =>
      element.replace(/^b|^B|^б|^Б|^β|^В|^2/, (match) => prefixDecrement[match]);

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
        firstPrefix.length > 0 &&
        firstPrefix !== activeMatch &&
        !isNumber &&
        (isAlphabetic || isEmoji || isSpecialChar)
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
            textAfterBreak = textAfterBreak
              .replace(/<\/?[^>]+(>|$)/g, '')
              .trim()
              .substring(0, 2);
            const checkForOtherPrefixChars = specialCharsMatch.test(textAfterBreak.charAt(0));
            if (
              checkForOtherPrefixChars ||
              firstPrefix === decrement(textAfterBreak) ||
              (!lastHitWasEmoji && textAfterBreak.match(emojiMatch))
            ) {
              hit = true;
            }
          }
        }
        if (hit) {
          State.results.push({
            test: 'QA_FAKE_LIST',
            element: p,
            type: State.option.checks.QA_FAKE_LIST.type || 'warning',
            content: Lang.sprintf(
              State.option.checks.QA_FAKE_LIST.content || 'QA_FAKE_LIST',
              firstPrefix,
            ),
            dismiss: Utils.prepareDismissal(`QA_FAKE_LIST ${p.textContent}`),
            dismissAll: State.option.checks.QA_FAKE_LIST.dismissAll ? 'QA_FAKE_LIST' : false,
            developer: State.option.checks.QA_FAKE_LIST.developer || false,
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
  if (State.option.checks.QA_UPPERCASE) {
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
        State.results.push({
          test: 'QA_UPPERCASE',
          element: $el,
          type: State.option.checks.QA_UPPERCASE.type || 'warning',
          content: Lang.sprintf(State.option.checks.QA_UPPERCASE.content || 'QA_UPPERCASE'),
          dismiss: Utils.prepareDismissal(`QA_UPPERCASE ${thisText}`),
          dismissAll: State.option.checks.QA_UPPERCASE.dismissAll ? 'QA_UPPERCASE' : false,
          developer: State.option.checks.QA_UPPERCASE.developer || false,
        });
      }
    };
    Elements.Found.Paragraphs.forEach(($el) => {
      checkCaps($el);
    });
    Elements.Found.Headings.forEach(($el) => {
      checkCaps($el);
    });
    Elements.Found.Lists.forEach(($el) => {
      checkCaps($el);
    });
    Elements.Found.Blockquotes.forEach(($el) => {
      checkCaps($el);
    });
  }

  /* ************************************************************** */
  /*  Various checks: underlines, justify-aligned, and small text.  */
  /* ************************************************************** */
  // Check underlined text. Created by Brian Teeman!
  const addUnderlineResult = ($el) => {
    State.results.push({
      test: 'QA_UNDERLINE',
      element: $el,
      type: State.option.checks.QA_UNDERLINE.type || 'warning',
      content: Lang.sprintf(State.option.checks.QA_UNDERLINE.content || 'QA_UNDERLINE'),
      inline: true,
      dismiss: Utils.prepareDismissal(`QA_UNDERLINE ${$el.textContent}`),
      dismissAll: State.option.checks.QA_UNDERLINE.dismissAll ? 'QA_UNDERLINE' : false,
      developer: State.option.checks.QA_UNDERLINE.developer || false,
    });
  };

  const addJustifyResult = ($el) => {
    State.results.push({
      test: 'QA_JUSTIFY',
      element: $el,
      type: State.option.checks.QA_JUSTIFY.type || 'warning',
      content: Lang.sprintf(State.option.checks.QA_JUSTIFY.content || 'QA_JUSTIFY'),
      dismiss: Utils.prepareDismissal(`QA_JUSTIFY ${$el.textContent}`),
      dismissAll: State.option.checks.QA_JUSTIFY.dismissAll ? 'QA_JUSTIFY' : true,
      developer: State.option.checks.QA_JUSTIFY.developer || false,
    });
  };

  const addSmallTextResult = ($el) => {
    State.results.push({
      test: 'QA_SMALL_TEXT',
      element: $el,
      type: State.option.checks.QA_SMALL_TEXT.type || 'warning',
      content: Lang.sprintf(State.option.checks.QA_SMALL_TEXT.content || 'QA_SMALL_TEXT'),
      dismiss: Utils.prepareDismissal(`QA_SMALL_TEXT ${$el.textContent}`),
      dismissAll: State.option.checks.QA_SMALL_TEXT.dismissAll ? 'QA_SMALL_TEXT' : true,
      developer: State.option.checks.QA_SMALL_TEXT.developer || false,
    });
  };

  const computeStyle = ($el) => {
    const style = getComputedStyle($el);
    const { textDecorationLine, textAlign, fontSize } = style;

    /* Check: Underlined text. */
    const interactive =
      'a[href], button, abbr, [role="link"], [role="button"], [tabindex="0"], [onclick]';
    if (
      State.option.checks.QA_UNDERLINE &&
      ($el.closest('u') || textDecorationLine === 'underline') &&
      !$el.closest(interactive) &&
      !$el.matches(interactive)
    ) {
      addUnderlineResult($el);
    }

    /* Check: Font size is greater than 0 and less than 10. */
    const defaultSize = State.option.checks.QA_SMALL_TEXT.fontSize || 10;
    const computedFontSize = parseFloat(fontSize);

    // Compare with parent element's font size.
    const parentFontSize = $el.parentElement
      ? parseFloat(getComputedStyle($el.parentElement).fontSize)
      : null;
    const isInherited = parentFontSize === computedFontSize;

    // Ensure the font size is specific to the element, not inherited.
    const withinRange = !isInherited && computedFontSize > 1 && computedFontSize <= defaultSize;
    if (State.option.checks.QA_SMALL_TEXT && withinRange) {
      addSmallTextResult($el);
    }

    /* Check: Check if text is justify-aligned. */
    const parentJustify = $el.parentElement ? getComputedStyle($el.parentElement).textAlign : null;
    const justifyInherited = parentJustify === textAlign;
    if (State.option.checks.QA_JUSTIFY && textAlign === 'justify' && !justifyInherited) {
      addJustifyResult($el);
    }
  };

  // Loop through all elements within the root area.
  if (
    State.option.checks.QA_UNDERLINE ||
    State.option.checks.QA_JUSTIFY ||
    State.option.checks.QA_SMALL_TEXT
  ) {
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
  if (State.option.checks.QA_SUBSCRIPT) {
    Elements.Found.Subscripts.forEach(($el) => {
      const text = Utils.getText($el);
      if (text.length >= 80) {
        State.results.push({
          test: 'QA_SUBSCRIPT',
          element: $el,
          type: State.option.checks.QA_SUBSCRIPT.type || 'warning',
          content: Lang.sprintf(State.option.checks.QA_SUBSCRIPT.content || 'QA_SUBSCRIPT'),
          inline: true,
          dismiss: Utils.prepareDismissal(`QA_SUBSCRIPT ${$el.tagName + text}`),
          dismissAll: State.option.checks.QA_SUBSCRIPT.dismissAll ? 'QA_SUBSCRIPT' : false,
          developer: State.option.checks.QA_SUBSCRIPT.developer || false,
        });
      }
    });
  }

  /* ****************************************** */
  /*  Find double nested layout components.     */
  /* ****************************************** */
  if (State.option.checks.QA_NESTED_COMPONENTS) {
    Elements.Found.NestedComponents.forEach(($el) => {
      const sources =
        State.option.checks.QA_NESTED_COMPONENTS.sources || '[role="tablist"], details';
      const component = $el.querySelector(sources);
      if (component) {
        State.results.push({
          test: 'QA_NESTED_COMPONENTS',
          element: $el,
          type: State.option.checks.QA_NESTED_COMPONENTS.type || 'warning',
          content: Lang.sprintf(
            State.option.checks.QA_NESTED_COMPONENTS.content || 'QA_NESTED_COMPONENTS',
          ),
          dismiss: Utils.prepareDismissal(`QA_NESTED_COMPONENTS ${$el.textContent}`),
          dismissAll: State.option.checks.QA_NESTED_COMPONENTS.dismissAll
            ? 'QA_NESTED_COMPONENTS'
            : false,
          developer: State.option.checks.QA_NESTED_COMPONENTS.developer || false,
        });
      }
    });
  }
}
