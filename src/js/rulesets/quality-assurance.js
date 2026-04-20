/** biome-ignore-all lint/complexity/noUselessEscapeInRegex: Ignore. */
import Elements from '../utils/elements';
import * as Utils from '../utils/utils';
import { State } from '../core/state';
import { pushResult } from '../utils/pushResult';

export default function checkQA() {
  /* *********************************************************** */
  /*  Error: Find all links pointing to development environment. */
  /* *********************************************************** */
  if (State.option.checks.QA_BAD_LINK) {
    Elements.Found.CustomErrorLinks.forEach(($el) => {
      const text = Utils.getText($el);
      pushResult({
        test: 'QA_BAD_LINK',
        element: $el,
        args: [$el, text],
        inline: true,
        dismiss: $el.tagName + $el.textContent,
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
        pushResult({
          test: 'QA_STRONG_ITALICS',
          element: $el.parentNode,
          type: 'warning',
          args: [text],
          dismiss: $el.tagName + $el.textContent,
        });
      }
    });
  }

  /* *************************************************************** */
  /*  Warning: Find blockquotes used as headers.                     */
  /* *************************************************************** */
  if (State.option.checks.QA_BLOCKQUOTE) {
    Elements.Found.Blockquotes.forEach(($el) => {
      const text = Utils.getText($el);
      if (text.length !== 0 && text.length < 25) {
        pushResult({
          test: 'QA_BLOCKQUOTE',
          element: $el,
          type: 'warning',
          args: [text],
          dismiss: text,
        });
      }
    });
  }

  /* *************************************************************** */
  /*  Errors: Check HTML tables for issues.                          */
  /* *************************************************************** */
  Elements.Found.Tables.forEach(($el) => {
    if (Utils.isElementHidden($el)) return;

    const role = $el.getAttribute('role')?.trim().toLowerCase();
    if (role && !['table', 'grid', 'treegrid'].includes(role)) return;

    const tableHeaders = $el.querySelectorAll('th, [role="columnheader"]');
    const semanticHeadings = $el.querySelectorAll('h1, h2, h3, h4, h5, h6');
    const firstRow = $el.querySelector('tr') ? $el.querySelector('tr').innerHTML : $el.innerHTML;

    // Check for valid 'headers' references.
    const invalidIds = [];
    $el.querySelectorAll('[headers]').forEach((cell) => {
      const headerIds = cell.getAttribute('headers').trim().split(/\s+/);
      headerIds.forEach((id) => {
        const referencedElement = $el.querySelector(`#${id}`);
        const doesNotExist = !referencedElement;
        const isNotInTable = referencedElement && !$el.contains(referencedElement);
        let isNotHeader = true;
        if (referencedElement) {
          const tagName = referencedElement.tagName.toLowerCase();
          const refRole = referencedElement.getAttribute('role')?.trim().toLowerCase();
          if (tagName === 'th' || refRole === 'rowheader' || refRole === 'columnheader') {
            isNotHeader = false;
          }
        }
        if (doesNotExist || isNotInTable || isNotHeader) invalidIds.push(id);
      });
    });

    if (invalidIds.length > 0) {
      pushResult({
        test: 'TABLES_INVALID_HEADERS_REF',
        element: $el,
        args: [invalidIds.join(', ')],
        dismiss: firstRow,
        devFallback: true,
      });
    }

    if (tableHeaders.length === 0) {
      pushResult({
        test: 'TABLES_MISSING_HEADINGS',
        element: $el,
        dismiss: firstRow,
      });
    }

    semanticHeadings.forEach((heading) => {
      pushResult({
        test: 'TABLES_SEMANTIC_HEADING',
        element: heading,
        dismiss: firstRow,
      });
    });

    tableHeaders.forEach((th) => {
      if (th.textContent.trim().length === 0) {
        pushResult({
          test: 'TABLES_EMPTY_HEADING',
          element: th,
          dismiss: firstRow,
          position: 'afterbegin',
        });
      }
    });
  });

  /* ****************************************************************** */
  /*  Warning: Detect fake headings                                     */
  /* ****************************************************************** */
  if (State.option.checks.QA_FAKE_HEADING) {
    const addResult = (element, text) => {
      pushResult({
        test: 'QA_FAKE_HEADING',
        element,
        type: 'warning',
        args: [text],
        dismiss: text,
        inline: true,
      });
    };

    const isPreviousElementAHeading = (p) => {
      const previousElement = p.previousElementSibling;
      return (
        previousElement && ['H1', 'H2', 'H3', 'H4', 'H5', 'H6'].includes(previousElement.tagName)
      );
    };

    const ignoreParents = 'h1, h2, h3, h4, h5, h6, [role="heading"][aria-level], blockquote, table';

    const computeLargeParagraphs = (p) => {
      const size = parseFloat(Utils.getCachedStyle(p).fontSize);
      const getText = Utils.getText(p);
      const maybeSentence = getText.match(/[.;?!"]/) === null;
      const typicalHeadingLength = getText.length >= 4 && getText.length <= 120;

      if (
        size >= 24 &&
        !Utils.getCachedClosest(p, ignoreParents) &&
        typicalHeadingLength &&
        maybeSentence &&
        !isPreviousElementAHeading(p)
      ) {
        addResult(p, getText);
      }
    };

    const computeBoldTextParagraphs = (p) => {
      const html = p.innerHTML.trim();
      if (html[0] !== '<') return;

      const likelyFakeHeading =
        /^<\s*(?:strong|b)\b[^>]*>[\s\S]*?<\/\s*(?:strong|b)\s*>(?:<\s*\/?\s*br\s*>|$)/i.test(html);
      if (!likelyFakeHeading || Utils.getCachedClosest(p, ignoreParents)) return;

      const possibleHeading = p.querySelector('strong, b');
      if (!possibleHeading) return;

      const text = Utils.getText(possibleHeading);
      if (text.length < 3 || text.length > 120 || /[.:;?!"']/.test(text)) return;

      const paragraph = Utils.fnIgnore(p, ['strong', 'b']).textContent.trim();
      if (paragraph && paragraph.length <= 250) return;

      addResult(possibleHeading, text);
    };

    Elements.Found.Paragraphs.forEach((p) => {
      computeLargeParagraphs(p);
      computeBoldTextParagraphs(p);
    });
  }

  /* *************************************************************** */
  /*  Warning: Detect paragraphs that should be lists.               */
  /* *************************************************************** */
  if (State.option.checks.QA_FAKE_LIST) {
    const numberMatch = new RegExp(/(([023456789][\d\s])|(1\d))/, '');
    const alphabeticMatch = new RegExp(/(^[aA1αаΑ]|[^\p{Alphabetic}\s])[-\s.)\]]/, 'u');
    const emojiMatch = new RegExp(/\p{Extended_Pictographic}/, 'u');
    const secondTextNoMatch = ['a', 'A', 'α', 'Α', 'а', 'А', '1'];
    const specialCharsMatch = /[([{#]/;
    const prefixDecrement = { 2: '1', b: 'a', B: 'A', β: 'α', Β: 'Α', б: 'а', Б: 'А' };
    const decrement = (element) =>
      element.replace(/^b|^B|^б|^Б|^β|^В|^[2-9]/, (match) => prefixDecrement[match]);

    let activeMatch = '';
    let firstText = '';
    let lastHitWasEmoji = false;

    Elements.Found.Paragraphs.forEach((p, i) => {
      let secondText = false;
      let hit = false;
      firstText = firstText || Utils.getText(p).replace(/[([]/g, '');
      const firstPrefix = firstText.substring(0, 2);
      const isAlphabetic = firstPrefix.match(alphabeticMatch);
      const isNumber = firstPrefix.match(numberMatch);
      const isEmoji = firstPrefix.match(emojiMatch);
      const isSpecialChar = specialCharsMatch.test(firstPrefix.charAt(0));
      const isRoman = /^(I|i)[.)\]]/.test(firstPrefix);

      if (
        firstPrefix.length > 0 &&
        firstPrefix !== activeMatch &&
        !isNumber &&
        (isAlphabetic || isEmoji || isSpecialChar || isRoman)
      ) {
        if (/^[A-Z]\.[A-Z]\./.test(firstText)) return;

        const secondP = Elements.Found.Paragraphs[i + 1];
        if (secondP) {
          secondText = Utils.getText(secondP).replace(/[([]/g, '').substring(0, 2);
          if (secondTextNoMatch.includes(secondText?.toLowerCase().trim())) return;
          const secondPrefix = decrement(secondText);
          if (isRoman) {
            if (secondText.toLowerCase() === 'ii') hit = true;
          } else if (isAlphabetic) {
            const firstChar = firstPrefix.charAt(0);
            const secondChar = secondText.charAt(0);
            if (decrement(secondChar) === firstChar && !/\w/.test(secondText.charAt(1))) hit = true;
          } else if (isEmoji && !lastHitWasEmoji) {
            if (secondPrefix.match(emojiMatch)) {
              hit = true;
              lastHitWasEmoji = true;
            }
          }
        }

        if (!hit) {
          let textAfterBreak = p?.querySelector('br')?.nextSibling?.nodeValue;
          if (textAfterBreak) {
            textAfterBreak = textAfterBreak
              .replace(/<\/?[^>]+(>|$)/g, '')
              .trim()
              .substring(0, 2);
            if (
              specialCharsMatch.test(textAfterBreak.charAt(0)) ||
              firstPrefix === decrement(textAfterBreak) ||
              (isRoman && textAfterBreak.toLowerCase() === 'ii') ||
              (!lastHitWasEmoji && textAfterBreak.match(emojiMatch))
            ) {
              hit = true;
            }
          }
        }

        if (hit) {
          pushResult({
            test: 'QA_FAKE_LIST',
            element: p,
            type: 'warning',
            args: [firstPrefix, firstText],
            dismiss: p.textContent,
          });
          activeMatch = firstPrefix;
        } else {
          activeMatch = '';
        }
      } else {
        activeMatch = '';
      }
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
        $el.childNodes.forEach((node) => {
          if (node.nodeType === 3) thisText += node.textContent;
        });
      } else {
        thisText = Utils.getText($el);
      }

      const uppercasePattern = /([A-Z]{2,}[ ])([A-Z]{2,}[ ])([A-Z]{2,}[ ])([A-Z]{2,})/g;
      const detectUpperCase = thisText.match(uppercasePattern);
      if (detectUpperCase && detectUpperCase[0].length > 10) {
        pushResult({
          test: 'QA_UPPERCASE',
          element: $el,
          type: 'warning',
          args: [thisText],
          dismiss: thisText,
        });
      }
    };

    Elements.Found.Paragraphs.forEach(checkCaps);
    Elements.Found.Headings.forEach(checkCaps);
    Elements.Found.Lists.forEach(checkCaps);
    Elements.Found.Blockquotes.forEach(checkCaps);
  }

  /* ************************************************************** */
  /*  Various checks: underlines, justify-aligned, and small text.  */
  /* ************************************************************** */
  const checkUnderline = State.option.checks.QA_UNDERLINE;
  const checkSmallText = State.option.checks.QA_SMALL_TEXT;
  const checkJustify = State.option.checks.QA_JUSTIFY;
  if (checkUnderline || checkJustify || checkSmallText) {
    const defaultSize = checkSmallText?.fontSize || 10;
    const interactiveSelector =
      'a[href], button, abbr, [role="link"], [role="button"], [tabindex="0"], [onclick]';
    const hasDirectText = (el) => {
      let node = el.firstChild;
      while (node) {
        if (node.nodeType === 3 && node.nodeValue.trim().length > 0) return true;
        node = node.nextSibling;
      }
      return false;
    };

    for (let i = 0; i < Elements.Found.Everything.length; i++) {
      const $el = Elements.Found.Everything[i];
      if (!hasDirectText($el)) continue;
      const style = Utils.getCachedStyle($el);
      const parentStyle = Utils.getCachedStyle($el.parentElement);
      const text = Utils.getText($el);
      if (checkUnderline) {
        if (
          (style.textDecorationLine === 'underline' || Utils.getCachedClosest($el, 'u')) &&
          !$el.matches(interactiveSelector) &&
          !Utils.getCachedClosest($el, interactiveSelector)
        ) {
          pushResult({
            test: 'QA_UNDERLINE',
            element: $el,
            type: 'warning',
            args: [text],
            dismiss: text,
            inline: true,
          });
        }
      }

      if (checkSmallText) {
        const computedFontSize = parseFloat(style.fontSize);
        if (computedFontSize > 1 && computedFontSize <= defaultSize) {
          const parentFontSize = parentStyle ? parseFloat(parentStyle.fontSize) : null;
          if (parentFontSize !== computedFontSize && !Utils.getCachedClosest($el, 'sup, sub')) {
            pushResult({
              test: 'QA_SMALL_TEXT',
              element: $el,
              type: 'warning',
              args: [text],
              dismiss: text,
              dismissAll: true,
            });
          }
        }
      }

      if (checkJustify && style.textAlign === 'justify') {
        const parentJustify = parentStyle ? parentStyle.textAlign : null;
        if (parentJustify !== style.textAlign) {
          pushResult({
            test: 'QA_JUSTIFY',
            element: $el,
            type: 'warning',
            args: [text],
            dismiss: text,
            dismissAll: true,
          });
        }
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
        pushResult({
          test: 'QA_SUBSCRIPT',
          element: $el,
          type: 'warning',
          args: [text],
          dismiss: $el.tagName + text,
          inline: true,
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
      if ($el.querySelector(sources)) {
        pushResult({
          test: 'QA_NESTED_COMPONENTS',
          element: $el,
          type: 'warning',
          dismiss: $el.textContent,
        });
      }
    });
  }
}
