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
        position: 'beforebegin',
        dismiss: Utils.prepareDismissal($el.tagName + $el.textContent),
        developer: option.checks.QA_BAD_LINK.developer || false,
      });
    });
  }

  /* *********************************************************** */
  /*  Warning: Excessive bolding or italics.                     */
  /* *********************************************************** */
  if (option.checks.QA_STRONG_ITALICS) {
    Elements.Found.StrongItalics.forEach(($el) => {
      if ($el.textContent.trim().length > 400) {
        results.push({
          element: $el.parentNode,
          type: option.checks.QA_STRONG_ITALICS.type || 'warning',
          content: option.checks.QA_STRONG_ITALICS.content || Lang.sprintf('QA_STRONG_ITALICS'),
          inline: false,
          position: 'beforebegin',
          dismiss: Utils.prepareDismissal($el.tagName + $el.textContent),
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
      const hasExtension = $el.matches(Constants.Global.documentLinks);
      const hasPDF = $el.matches('a[href$=".pdf"], a[href*=".pdf?"]');

      // Dismiss key.
      const key = Utils.prepareDismissal(`DOCUMENT${href}`);

      // Check for broken same-page links.
      if (option.checks.QA_IN_PAGE_LINK) {
        const hasButtonRole = $el.getAttribute('role') === 'button';
        const hasText = $el.textContent.trim().length !== 0;
        const hasClick = $el.hasAttribute('onclick');
        if ((href.startsWith('#') || href === '') && !hasButtonRole && hasText && !hasClick) {
          const targetId = href.substring(1);
          const ariaControls = $el.getAttribute('aria-controls');
          const targetElement = document.getElementById(targetId) || document.getElementById(decodeURIComponent(targetId)) || document.getElementById(encodeURIComponent(targetId)) || document.getElementById(ariaControls);

          // If reference ID doesn't exist.
          if (!targetElement) {
            results.push({
              element: $el,
              type: option.checks.QA_IN_PAGE_LINK.type || 'error',
              content: option.checks.QA_IN_PAGE_LINK.content || Lang.sprintf('QA_IN_PAGE_LINK'),
              inline: true,
              position: 'beforebegin',
              dismiss: key,
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
          position: 'beforebegin',
          dismiss: key,
          developer: option.checks.QA_DOCUMENT.developer || false,
        });
      } else if (option.checks.QA_PDF && hasPDF) {
        results.push({
          element: $el,
          type: option.checks.QA_PDF.type || 'warning',
          content: option.checks.QA_PDF.content || Lang.sprintf('QA_PDF'),
          inline: true,
          position: 'beforebegin',
          dismiss: key,
          dismissAll: 'QA_PDF',
          developer: option.checks.QA_PDF.developer || false,
        });
      }
    }
  });

  /* *************************************************************** */
  /*  Error: Missing language tag. Lang should be at least 2 chars.  */
  /* *************************************************************** */
  if (option.checks.QA_PAGE_LANG) {
    if (!Elements.Found.Language || Elements.Found.Language.length < 2) {
      results.push({
        type: option.checks.QA_PAGE_LANG.type || 'error',
        content: option.checks.QA_PAGE_LANG.content || Lang.sprintf('QA_PAGE_LANG'),
        dismiss: Utils.prepareDismissal('LANG'),
        developer: option.checks.QA_PAGE_LANG.developer || true,
      });
    }
  }

  /* *************************************************************** */
  /*  Warning: Find blockquotes used as headers.                     */
  /* *************************************************************** */
  if (option.checks.QA_BLOCKQUOTE) {
    Elements.Found.Blockquotes.forEach(($el) => {
      const bqHeadingText = $el.textContent;
      if (bqHeadingText.trim().length < 25) {
        const sanitizedText = Utils.sanitizeHTML(bqHeadingText);
        results.push({
          element: $el,
          type: option.checks.QA_BLOCKQUOTE.type || 'warning',
          content: option.checks.QA_BLOCKQUOTE.content || Lang.sprintf('QA_BLOCKQUOTE', sanitizedText),
          inline: false,
          position: 'beforebegin',
          dismiss: Utils.prepareDismissal(`BLOCKQUOTE${sanitizedText}`),
          developer: option.checks.QA_BLOCKQUOTE.developer || false,
        });
      }
    });
  }

  /* *************************************************************** */
  /*  Errors: Check HTML tables for issues.                          */
  /* *************************************************************** */
  Elements.Found.Tables.forEach(($el) => {
    const tableHeaders = $el.querySelectorAll('th');
    const semanticHeadings = $el.querySelectorAll('h1, h2, h3, h4, h5, h6');
    const key = Utils.prepareDismissal(`TABLE${$el.textContent}`);
    if (option.checks.TABLES_MISSING_HEADINGS && tableHeaders.length === 0) {
      results.push({
        element: $el,
        type: option.checks.TABLES_MISSING_HEADINGS.type || 'error',
        content: option.checks.TABLES_MISSING_HEADINGS.content || Lang.sprintf('TABLES_MISSING_HEADINGS'),
        inline: false,
        position: 'beforebegin',
        dismiss: key,
        developer: option.checks.TABLES_MISSING_HEADINGS.developer || false,
      });
    }
    if (option.checks.TABLES_SEMANTIC_HEADING && semanticHeadings.length > 0) {
      semanticHeadings.forEach((heading) => {
        results.push({
          element: heading,
          type: option.checks.TABLES_SEMANTIC_HEADING.type || 'error',
          content: option.checks.TABLES_SEMANTIC_HEADING.content || Lang.sprintf('TABLES_SEMANTIC_HEADING'),
          inline: false,
          position: 'beforebegin',
          dismiss: key,
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
          inline: false,
          position: 'afterbegin',
          dismiss: key,
          developer: option.checks.TABLES_EMPTY_HEADING.developer || false,
        });
      }
    });
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
        inline: false,
        position: 'beforebegin',
        dismiss: Utils.prepareDismissal(`BOLD${sanitizedText}`),
        developer: option.checks.QA_FAKE_HEADING.developer || false,
      });
    };

    // Find large text as heading.
    const ignoreParents = 'h1, h2, h3, h4, h5, h6, [role="heading"][aria-level], blockquote, table';
    const computeLargeParagraphs = (p) => {
      const size = getComputedStyle(p).fontSize.replace('px', '');
      const getText = Utils.getText(p);
      const maybeSentence = getText.match(/[.;?!"]/) === null;
      const typicalHeadingLength = getText.length >= 4 && getText.length <= 120;

      if (size >= 24 && !p.closest(ignoreParents) && typicalHeadingLength && maybeSentence) {
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
          const nonHeadingTextLength = Utils.fnIgnore(p, 'strong, bold').textContent.trim().length;
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
            inline: false,
            position: 'beforebegin',
            dismiss: Utils.prepareDismissal(`LIST${p.textContent}`),
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

  /* *************************************************************** */
  /*  Warning: Detect uppercase text.                                */
  /* *************************************************************** */
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
      const uppercasePattern = /([A-Z]{2,}[ ])([A-Z]{2,}[ ])([A-Z]{2,}[ ])([A-Z]{2,})/g;
      const detectUpperCase = thisText.match(uppercasePattern);

      if (detectUpperCase && detectUpperCase[0].length > 10) {
        results.push({
          element: $el,
          type: option.checks.QA_UPPERCASE.type || 'warning',
          content: option.checks.QA_UPPERCASE.content || Lang.sprintf('QA_UPPERCASE'),
          inline: false,
          position: 'beforebegin',
          dismiss: Utils.prepareDismissal(`UPPERCASE${thisText}`),
          developer: option.checks.QA_UPPERCASE.developer || false,
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
  if (option.checks.QA_DUPLICATE_ID) {
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
                type: option.checks.QA_DUPLICATE_ID.type || 'error',
                content: option.checks.QA_DUPLICATE_ID.content || Lang.sprintf('QA_DUPLICATE_ID', id),
                inline: true,
                position: 'beforebegin',
                dismiss: Utils.prepareDismissal(`DUPLICATEID${id}${$el.textContent}`),
                developer: option.checks.QA_DUPLICATE_ID.developer || true,
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
  /*  Warning: Flag underlined & justified text.                     */
  /*  Thanks to Brian Teeman (@brianteeman)                          */
  /* *************************************************************** */
  // Helper function to add underline results.
  const addUnderlineResult = ($el, inline) => {
    const text = Utils.getText($el);
    results.push({
      element: $el,
      type: option.checks.QA_UNDERLINE.type || 'warning',
      content: option.checks.QA_UNDERLINE.content || Lang.sprintf('QA_UNDERLINE'),
      inline,
      position: 'beforebegin',
      dismiss: Utils.prepareDismissal(`UNDERLINE${text}`),
      developer: option.checks.QA_UNDERLINE.developer || false,
    });
  };

  // For individual <u>underlined</u> elements.
  if (option.checks.QA_UNDERLINE) {
    Elements.Found.Underlines.forEach(($el) => {
      addUnderlineResult($el, true);
    });
  }

  // Get computed styles.
  const computeStyle = ($el) => {
    const style = getComputedStyle($el);
    const { textDecorationLine, textAlign } = style;

    // Underlined text.
    if (option.checks.QA_UNDERLINE && textDecorationLine === 'underline') {
      addUnderlineResult($el, false); // Inline false for computed underlines.
    }

    // Justified text.
    if (option.checks.QA_JUSTIFY && textAlign === 'justify') {
      const text = Utils.getText($el);
      results.push({
        element: $el,
        type: option.checks.QA_JUSTIFY.type || 'warning',
        content: option.checks.QA_JUSTIFY.content || Lang._('QA_JUSTIFY'),
        inline: false,
        position: 'beforebegin',
        dismiss: Utils.prepareDismissal(`JUSTIFIED${text}`),
        developer: option.checks.QA_JUSTIFY.developer || false,
      });
    }
  };

  if (option.checks.QA_UNDERLINE || option.checks.QA_JUSTIFY) {
    Elements.Found.Paragraphs.forEach(computeStyle);
    Elements.Found.Headings.forEach(computeStyle);
    Elements.Found.Lists.forEach(computeStyle);
    Elements.Found.Blockquotes.forEach(computeStyle);
    Elements.Found.Spans.forEach(computeStyle);
  }

  /* *************************************************************** */
  /*  Error: Page is missing meta page <title>                       */
  /* *************************************************************** */
  if (option.checks.QA_PAGE_TITLE) {
    const metaTitle = document.querySelector('head title');
    if (!metaTitle || metaTitle.textContent.trim().length === 0) {
      results.push({
        type: option.checks.QA_PAGE_TITLE.type || 'error',
        content: option.checks.QA_PAGE_TITLE.content || Lang.sprintf('QA_PAGE_TITLE'),
        dismiss: Utils.prepareDismissal('TITLE'),
        developer: option.checks.QA_PAGE_TITLE.developer || true,
      });
    }
  }

  /* *************************************************************** */
  /*  Warning: Find inappropriate use of <sup> and <sub> tags.       */
  /* *************************************************************** */
  if (option.checks.QA_SUBSCRIPT) {
    Elements.Found.Subscripts.forEach(($el) => {
      const text = Utils.getText($el);
      if (text.length >= 80) {
        results.push({
          element: $el,
          type: option.checks.QA_SUBSCRIPT.type || 'warning',
          content: option.checks.QA_SUBSCRIPT.content || Lang.sprintf('QA_SUBSCRIPT'),
          inline: true,
          position: 'beforebegin',
          dismiss: Utils.prepareDismissal($el.tagName + text),
          developer: option.checks.QA_SUBSCRIPT.developer || false,
        });
      }
    });
  }

  /* *************************************************************** */
  /*  Warning: Find double nested layout components.                 */
  /* *************************************************************** */
  if (option.checks.QA_NESTED_COMPONENTS) {
    Elements.Found.NestedComponents.forEach(($el) => {
      const component = $el.querySelector(option.nestedComponentSources);
      if (component) {
        results.push({
          element: $el,
          type: option.checks.QA_NESTED_COMPONENTS.type || 'warning',
          content: option.checks.QA_NESTED_COMPONENTS.content || Lang.sprintf('QA_NESTED_COMPONENTS'),
          inline: false,
          position: 'beforebegin',
          dismiss: Utils.prepareDismissal(`NESTED${$el.textContent}`),
          developer: option.checks.QA_NESTED_COMPONENTS.developer || false,
        });
      }
    });
  }

  /* *************************************************************** */
  /*  Error: <li> elements must be contained in a <ul>/<ol>/<menu>.  */
  /* *************************************************************** */
  if (option.checks.QA_UNCONTAINED_LI) {
    Elements.Found.UncontainedLi.forEach(($el) => {
      results.push({
        element: $el,
        type: option.checks.QA_UNCONTAINED_LI.type || 'error',
        content: option.checks.QA_UNCONTAINED_LI.content || Lang._('QA_UNCONTAINED_LI'),
        inline: false,
        position: 'beforebegin',
        dismiss: Utils.prepareDismissal(`UNCONTAINEDLI${$el.textContent}`),
        developer: option.checks.QA_UNCONTAINED_LI.developer || true,
      });
    });
  }

  /* *************************************************************** */
  /*  Error: Zooming and scaling must not be disabled.               */
  /* *************************************************************** */
  if (option.checks.QA_META_SCALABLE || option.checks.QA_META_MAX) {
    const metaViewport = document.querySelector('meta[name="viewport"]');
    if (metaViewport) {
      const content = metaViewport.getAttribute('content');
      if (content) {
        // Parse the content attribute to extract parameters.
        const params = content.split(',').reduce((acc, param) => {
          const [key, value] = param.split('=').map((s) => s.trim());
          acc[key] = value;
          return acc;
        }, {});

        // Check for user-scalable parameter.
        if (option.checks.QA_META_SCALABLE && params['user-scalable'] === 'no') {
          results.push({
            type: option.checks.QA_META_SCALABLE.type || 'error',
            content: option.checks.QA_META_SCALABLE.content || Lang._('QA_META_SCALABLE'),
            dismiss: Utils.prepareDismissal('SCALABLE'),
            developer: option.checks.QA_META_SCALABLE.developer || true,
          });
        }

        // Check maximum-scale parameter.
        const maxScale = parseFloat(params['maximum-scale']);
        if (option.checks.QA_META_MAX && !Number.isNaN(maxScale) && maxScale < 2) {
          results.push({
            type: option.checks.QA_META_MAX.type || 'error',
            content: option.checks.QA_META_MAX.content || Lang._('QA_META_MAX'),
            dismiss: Utils.prepareDismissal('MAXSCALE'),
            developer: option.checks.QA_META_MAX.developer || true,
          });
        }
      }
    }
  }

  return results;
}
