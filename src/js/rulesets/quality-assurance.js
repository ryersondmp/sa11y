import Constants from '../utils/constants';
import Elements from '../utils/elements';
import * as Utils from '../utils/utils';
import Lang from '../utils/lang';

export default function checkQA(
  results,
  badLinksQA,
  strongItalicsQA,
  pdfQA,
  langQA,
  blockquotesQA,
  tablesQA,
  fakeHeadingsQA,
  fakeListQA,
  allCapsQA,
  duplicateIdQA,
  underlinedTextQA,
  pageTitleQA,
  subscriptQA,
) {
  /* *********************************************************** */
  /*  Error: Find all links pointing to development environment. */
  /* *********************************************************** */
  if (badLinksQA === true) {
    Elements.Found.CustomErrorLinks.forEach(($el) => {
      results.push({
        element: $el,
        type: Constants.Global.ERROR,
        content: Lang.sprintf('QA_BAD_LINK', $el),
        inline: true,
        position: 'beforebegin',
      });
    });
  }

  /* *********************************************************** */
  /*  Warning: Excessive bolding or italics.                     */
  /* *********************************************************** */
  if (strongItalicsQA === true) {
    Elements.Found.StrongItalics.forEach(($el) => {
      const strongItalicsText = $el.textContent.trim().length;
      const key = Utils.prepareDismissal($el.tagName + $el.textContent);
      if (strongItalicsText > 400) {
        results.push({
          element: $el.parentNode,
          type: Constants.Global.WARNING,
          content: Lang.sprintf('QA_BAD_ITALICS'),
          inline: false,
          position: 'beforebegin',
          dismiss: key,
        });
      }
    });
  }

  /* *********************************************************** */
  /*  Warning: Find all PDF documents                            */
  /* *********************************************************** */
  if (pdfQA === true) {
    Elements.Found.Pdf.forEach(($el) => {
      const href = $el.getAttribute('href');
      const key = Utils.prepareDismissal(`PDF${href}`);
      results.push({
        element: $el,
        type: Constants.Global.WARNING,
        content: Lang.sprintf('QA_PDF'),
        inline: true,
        position: 'beforebegin',
        dismiss: key,
      });
    });
  }

  /* *************************************************************** */
  /*  Error: Missing language tag. Lang should be at least 2 chars.  */
  /* *************************************************************** */
  if (langQA === true) {
    if (!Elements.Found.Language || Elements.Found.Language.length < 2) {
      results.push({
        type: Constants.Global.ERROR,
        content: Lang.sprintf('QA_PAGE_LANGUAGE'),
      });
    }
  }

  /* *************************************************************** */
  /*  Warning: Find blockquotes used as headers.                     */
  /* *************************************************************** */
  if (blockquotesQA === true) {
    Elements.Found.Blockquotes.forEach(($el) => {
      const bqHeadingText = $el.textContent;
      if (bqHeadingText.trim().length < 25) {
        const sanitizedText = Utils.sanitizeHTML(bqHeadingText);
        const key = Utils.prepareDismissal(`BLOCKQUOTE${sanitizedText}`);
        results.push({
          element: $el,
          type: Constants.Global.WARNING,
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
  if (tablesQA === true) {
    Elements.Found.Tables.forEach(($el) => {
      const findTHeaders = $el.querySelectorAll('th');
      const findHeadingTags = $el.querySelectorAll('h1, h2, h3, h4, h5, h6');
      if (findTHeaders.length === 0) {
        results.push({
          element: $el,
          type: Constants.Global.ERROR,
          content: Lang.sprintf('TABLES_MISSING_HEADINGS'),
          inline: false,
          position: 'beforebegin',
        });
      }
      if (findHeadingTags.length > 0) {
        findHeadingTags.forEach(($a) => {
          results.push({
            element: $a,
            type: Constants.Global.ERROR,
            content: Lang.sprintf('TABLES_SEMANTIC_HEADING'),
            inline: false,
            position: 'beforebegin',
          });
        });
      }
      findTHeaders.forEach(($b) => {
        if ($b.textContent.trim().length === 0) {
          results.push({
            element: $b,
            type: Constants.Global.ERROR,
            content: Lang.sprintf('TABLES_EMPTY_HEADING'),
            inline: false,
            position: 'afterbegin',
          });
        }
      });
    });
  }

  /* ****************************************************************** */
  /*  Warning: Detect fake headings                                     */
  /*  To prevent excessive warnings:                                    */
  /*  1) Parent element must not be a heading, blockquote, or table.    */
  /*  2) Must be between 4 and 120 characters (typical heading length). */
  /*  3) Doesn't contain the following characters: .;?!                 */
  /*  4) The previous element is not a semantic heading.                */
  /* ****************************************************************** */
  if (fakeHeadingsQA === true) {
    Elements.Found.Paragraphs.forEach(($el) => {
      const brAfter = $el.innerHTML.indexOf('</strong><br>');
      const brBefore = $el.innerHTML.indexOf('<br></strong>');
      const ignoreElements = 'h1, h2, h3, h4, h5, h6, [role="heading"][aria-level], blockquote';
      const ignoreParents = ignoreElements.concat(', table');
      const getTexted = Utils.getText($el);
      let boldtext;

      // Check paragraphs greater than x characters.
      if ($el && getTexted.length >= 300) {
        const { firstChild } = $el;

        // If paragraph starts with <strong> tag and ends with <br>.
        if (firstChild.tagName === 'STRONG' && (brBefore !== -1 || brAfter !== -1)) {
          boldtext = Utils.getText(firstChild);
          const maybeSentence = boldtext.match(/[.;?!"]/) !== null;
          if (
            !/[*]$/.test(boldtext)
            && !$el.closest(ignoreParents)
            && (boldtext.length >= 4 && boldtext.length <= 120)
            && maybeSentence === false
          ) {
            const sanitizedText = Utils.sanitizeHTML(boldtext);
            const key = Utils.prepareDismissal(`BOLD${sanitizedText}`);
            results.push({
              element: firstChild,
              type: Constants.Global.WARNING,
              content: Lang.sprintf('QA_FAKE_HEADING', sanitizedText),
              inline: false,
              position: 'beforebegin',
              dismiss: key,
            });
          }
        }
      }

      // If paragraph only contains <p><strong>...</strong></p>.
      if (/^<(strong)>.+<\/\1>$/.test($el.innerHTML.trim())) {
        boldtext = getTexted;
        const prevSibling = $el.previousElementSibling;
        const maybeSentence = boldtext.match(/[.;?!"]/) !== null;
        if (prevSibling !== null && prevSibling.matches(ignoreElements)) {
          // If previous element is a heading, do nothing.
        } else if (
          !/[*]$/.test(boldtext)
          && (boldtext.length >= 4 && boldtext.length <= 120)
          && !$el.closest(ignoreParents)
          && maybeSentence === false
        ) {
          const sanitizedText = Utils.sanitizeHTML(boldtext);
          const key = Utils.prepareDismissal(`BOLD${sanitizedText}`);
          results.push({
            element: $el,
            type: Constants.Global.WARNING,
            content: Lang.sprintf('QA_FAKE_HEADING', sanitizedText),
            inline: false,
            position: 'beforebegin',
            dismiss: key,
          });
        }
      }

      // Find pretend paragraph headings
      const computeLargeParagraphs = ($elem) => {
        const size = getComputedStyle($elem).fontSize.replace('px', '');
        const ignore = 'h1, h2, h3, h4, h5, h6, [role="heading"][aria-level], blockquote';
        const getText = Utils.getText($elem);
        const prevSibling = $elem.previousElementSibling;
        const maybeSentence = getText.match(/[.;?!"]/) !== null;

        if (prevSibling !== null && prevSibling.matches(ignore)) {
          // Nothing
        } else if (
          size >= 24
          && !$elem.closest(ignore)
          && (getText.length >= 4 && getText.length <= 120)
          && maybeSentence === false
        ) {
          const sanitizedText = Utils.sanitizeHTML(getText);
          const key = Utils.prepareDismissal(`BOLD${sanitizedText}`);
          results.push({
            element: $elem,
            type: Constants.Global.WARNING,
            content: Lang.sprintf('QA_FAKE_HEADING', sanitizedText),
            inline: false,
            position: 'beforebegin',
            dismiss: key,
          });
        }
      };
      computeLargeParagraphs($el);
    });
  }

  /* *************************************************************** */
  /*  Warning: Detect paragraphs that should be lists.               */
  /*  Thanks to John Jameson from PrincetonU for this ruleset!       */
  /* *************************************************************** */
  if (fakeListQA === true) {
    Elements.Found.Paragraphs.forEach(($el) => {
      let activeMatch = '';
      const prefixDecrement = {
        b: 'a',
        B: 'A',
        2: '1',
        б: 'а',
        Б: 'А',
      };
      const prefixMatch = /a\.|a\)|A\.|A\)|а\.|а\)|А\.|А\)|1\.|1\)|\*\s|-\s|--|•\s|→\s|✓\s|✔\s|✗\s|✖\s|✘\s|❯\s|›\s|»\s/;
      const decrement = (el) => el.replace(/^b|^B|^б|^Б|^2/, (match) => prefixDecrement[match]);
      let hit = false;
      const firstPrefix = $el.textContent.substring(0, 2);

      if (
        firstPrefix.trim().length > 0
        && firstPrefix !== activeMatch
        && firstPrefix.match(prefixMatch)
      ) {
        const hasBreak = $el.innerHTML.indexOf('<br>');
        if (hasBreak !== -1) {
          const subParagraph = $el
            .innerHTML
            .substring(hasBreak + 4)
            .trim();
          const subPrefix = subParagraph.substring(0, 2);
          if (firstPrefix === decrement(subPrefix)) {
            hit = true;
          }
        }

        // Decrement the second p prefix and compare .
        if (!hit) {
          const $second = Utils.getNextSibling($el, 'p');
          if ($second) {
            const secondPrefix = decrement($el.nextElementSibling.textContent.substring(0, 2));
            if (firstPrefix === secondPrefix) {
              hit = true;
            }
          }
        }
        if (hit) {
          const key = Utils.prepareDismissal(`LIST${$el.textContent}`);
          results.push({
            element: $el,
            type: Constants.Global.WARNING,
            content: Lang.sprintf('QA_SHOULD_BE_LIST', firstPrefix),
            inline: false,
            position: 'beforebegin',
            dismiss: key,
          });
          activeMatch = firstPrefix;
        } else {
          activeMatch = '';
        }
      } else {
        activeMatch = '';
      }
    });
  }

  /* *************************************************************** */
  /*  Warning: Detect uppercase text.                                */
  /* *************************************************************** */
  if (allCapsQA === true) {
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
          type: Constants.Global.WARNING,
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
  if (duplicateIdQA === true) {
    const allIds = {};
    Elements.Found.Ids.forEach(($el) => {
      const { id } = $el;
      if (id) {
        if (allIds[id] === undefined) {
          allIds[id] = 1;
        } else {
          results.push({
            element: $el,
            type: Constants.Global.ERROR,
            content: Lang.sprintf('QA_DUPLICATE_ID', id),
            inline: true,
            position: 'beforebegin',
          });
        }
      }
    });
  }

  /* *************************************************************** */
  /*  Warning: Flag underlined text.                                 */
  /*  Created by Brian Teeman.                                       */
  /* *************************************************************** */
  if (underlinedTextQA === true) {
    // Find all <u> tags.
    Elements.Found.Underlines.forEach(($el) => {
      const text = Utils.getText($el);
      const key = Utils.prepareDismissal(`UNDERLINE${text}`);
      results.push({
        element: $el,
        type: Constants.Global.WARNING,
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
          type: Constants.Global.WARNING,
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
  if (pageTitleQA === true) {
    const $title = document.querySelector('title');
    if (!$title || $title.textContent.trim().length === 0) {
      results.push({
        type: Constants.Global.ERROR,
        content: Lang.sprintf('QA_PAGE_TITLE'),
      });
    }
  }

  /* *************************************************************** */
  /*  Warning: Find inappropriate use of <sup> and <sub> tags.       */
  /* *************************************************************** */
  if (subscriptQA === true) {
    Elements.Found.Subscripts.forEach(($el) => {
      const text = Utils.getText($el);
      if (text.length >= 80) {
        const key = Utils.prepareDismissal($el.tagName + text);
        results.push({
          element: $el,
          type: Constants.Global.WARNING,
          content: Lang.sprintf('QA_SUBSCRIPT_WARNING'),
          inline: true,
          position: 'beforebegin',
          dismiss: key,
        });
      }
    });
  }

  // Return each object to results array.
  return results;
}
