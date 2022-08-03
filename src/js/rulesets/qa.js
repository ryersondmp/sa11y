// ============================================================
// Rulesets: QA
// ============================================================
import Lang from '../components/translation';
import { ERROR, WARNING } from '../components/constants';
import { annotate, annotateBanner } from '../components/annotate';

export default function checkQA() {
  // Error: Find all links pointing to development environment.
  if (option.badLinksQA === true) {
    Sa11y.$badDevLinks.forEach(($el) => {
      $el.classList.add('sa11y-error-text');
      $el.insertAdjacentHTML('afterend', annotate(ERROR, Lang.sprintf('QA_BAD_LINK', $el), true));
    });
  }

  // Warning: Excessive bolding or italics.
  if (option.strongItalicsQA === true) {
    Sa11y.$strongitalics.forEach(($el) => {
      const strongItalicsText = $el.textContent.trim().length;
      if (strongItalicsText > 400) {
        $el.insertAdjacentHTML('beforebegin', annotate(WARNING, Lang._('QA_BAD_ITALICS')));
      }
    });
  }

  // Warning: Find all PDFs.
  if (option.pdfQA === true) {
    Sa11y.$checkPDF.forEach(($el, i) => {
      const pdfCount = Sa11y.$checkPDF.length;

      // Highlight all PDFs.
      if (pdfCount > 0) {
        $el.classList.add('sa11y-warning-text');
      }
      // Only append warning button to first PDF.
      if ($el && i === 0) {
        $el.insertAdjacentHTML('afterend', annotate(WARNING, Lang.sprintf('QA_PDF', pdfCount), true));
        if ($el.querySelector('img')) {
          $el.classList.remove('sa11y-warning-text');
        }
      }
    });
  }

  // Error: Missing language tag. Lang should be at least 2 characters.
  if (option.langQA === true) {
    if (!Sa11y.$lang || Sa11y.$lang.length < 2) {
      Sa11y.panel.insertAdjacentHTML('afterend', annotateBanner(ERROR, Lang._('QA_PAGE_LANGUAGE')));
    }
  }

  // Warning: Find blockquotes used as headers.
  if (option.blockquotesQA === true) {
    Sa11y.$blockquotes.forEach(($el) => {
      const bqHeadingText = $el.textContent;
      if (bqHeadingText.trim().length < 25) {
        $el.classList.add('sa11y-warning-border');
        $el.insertAdjacentHTML('beforebegin', annotate(WARNING, Lang.sprintf('QA_BLOCKQUOTE_MESSAGE', bqHeadingText)));
      }
    });
  }

  // Tables check.
  if (option.tablesQA === true) {
    Sa11y.$tables.forEach(($el) => {
      const findTHeaders = $el.querySelectorAll('th');
      const findHeadingTags = $el.querySelectorAll('h1, h2, h3, h4, h5, h6');
      if (findTHeaders.length === 0) {
        $el.classList.add('sa11y-error-border');
        $el.insertAdjacentHTML('beforebegin',
          annotate(ERROR, Lang._('TABLES_MISSING_HEADINGS')));
      }
      if (findHeadingTags.length > 0) {
        findHeadingTags.forEach(($a) => {
          $a.classList.add('sa11y-error-border');
          $a.insertAdjacentHTML('beforebegin', annotate(ERROR, Lang._('TABLES_SEMANTIC_HEADING')));
        });
      }
      findTHeaders.forEach(($b) => {
        if ($b.textContent.trim().length === 0) {
          $b.classList.add('sa11y-error-border');
          $b.innerHTML = annotate(ERROR, Lang._('TABLES_EMPTY_HEADING'));
        }
      });
    });
  }

  // Warning: Detect fake headings.
  if (option.fakeHeadingsQA === true) {
    Sa11y.$p.forEach(($el) => {
      const brAfter = $el.innerHTML.indexOf('</strong><br>');
      const brBefore = $el.innerHTML.indexOf('<br></strong>');
      let boldtext;

      // Check paragraphs greater than x characters.
      if ($el && $el.textContent.trim().length >= 300) {
        const { firstChild } = $el;

        // If paragraph starts with <strong> tag and ends with <br>.
        if (firstChild.tagName === 'STRONG' && (brBefore !== -1 || brAfter !== -1)) {
          boldtext = firstChild.textContent;

          if (!/[*]$/.test(boldtext) && !$el.closest('table') && boldtext.length <= 120) {
            firstChild.classList.add('sa11y-fake-heading', 'sa11y-warning-border');
            $el.insertAdjacentHTML('beforebegin', annotate(WARNING, Lang.sprintf('QA_FAKE_HEADING', boldtext), true));
          }
        }
      }

      // If paragraph only contains <p><strong>...</strong></p>.
      if (/^<(strong)>.+<\/\1>$/.test($el.innerHTML.trim())) {
        // Although only flag if it:
        // 1) Has less than 120 characters (typical heading length).
        // 2) The previous element is not a heading.
        const prevElement = $el.previousElementSibling;
        let tagName = '';
        boldtext = $el.textContent;

        if (prevElement !== null) {
          tagName = prevElement.tagName;
        }

        if (!/[*]$/.test(boldtext) && !$el.closest('table') && boldtext.length <= 120 && tagName.charAt(0) !== 'H') {
          $el.classList.add('sa11y-fake-heading', 'sa11y-warning-border');
          $el.insertAdjacentHTML('beforebegin',
            annotate(WARNING, Lang.sprintf('QA_FAKE_HEADING', boldtext), true));
        }
      }
    });
  }

  // Warning: Detect paragraphs that should be lists.
  // Thanks to John Jameson from PrincetonU for this ruleset!
  if (option.fakeListQA === true) {
    Sa11y.$p.forEach(($el) => {
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

        const getNextSibling = (elem, selector) => {
          let sibling = elem.nextElementSibling;
          if (!selector) return sibling;
          while (sibling) {
            if (sibling.matches(selector)) return sibling;
            sibling = sibling.nextElementSibling;
          }
          return '';
        };

        // Decrement the second p prefix and compare .
        if (!hit) {
          const $second = getNextSibling($el, 'p');
          if ($second) {
            const secondPrefix = decrement($el.nextElementSibling.textContent.substring(0, 2));
            if (firstPrefix === secondPrefix) {
              hit = true;
            }
          }
        }
        if (hit) {
          $el.insertAdjacentHTML('beforebegin', annotate(WARNING, Lang.sprintf('QA_SHOULD_BE_LIST', firstPrefix)));
          $el.classList.add('sa11y-fake-list');
          activeMatch = firstPrefix;
        } else {
          activeMatch = '';
        }
      } else {
        activeMatch = '';
      }
    });
  }

  // Warning: Detect uppercase.
  if (option.allCapsQA === true) {
    Sa11y.$allCaps.forEach((element) => {
      const $el = element;
      const uppercasePattern = /(?!<a[^>]*?>)(\b[A-Z][',!:A-Z\s]{15,}|\b[A-Z]{15,}\b)(?![^<]*?<\/a>)/g;
      const html = $el.innerHTML;
      $el.innerHTML = html.replace(uppercasePattern, "<span class='sa11y-warning-uppercase'>$1</span>");
    });

    const $warningUppercase = Sa11y.root.querySelectorAll('.sa11y-warning-uppercase');
    $warningUppercase.forEach(($el) => {
      $el.insertAdjacentHTML('afterend', annotate(WARNING, Lang._('QA_UPPERCASE_WARNING'), true));
    });
  }

  // Error: Duplicate IDs
  if (option.duplicateIdQA === true) {
    const ids = Sa11y.root.querySelectorAll('[id]');
    const allIds = {};
    let found = false;
    ids.forEach(($el) => {
      const { id } = $el;
      if (id) {
        if (allIds[id] === undefined) {
          allIds[id] = 1;
        } else {
          found = true;
          $el.classList.add('sa11y-error-border');
          $el.insertAdjacentHTML('afterend', annotate(ERROR, Lang.sprintf('QA_DUPLICATE_ID', id), true));
        }
      }
    });
  }

  // Warning: Flag underline text.
  if (option.underlinedTextQA === true) {
    const underline = Array.from(Sa11y.root.querySelectorAll('u'));
    underline.forEach(($el) => {
      $el.classList.add('sa11y-warning-text');
      $el.insertAdjacentHTML('beforebegin', annotate(WARNING, Lang._('QA_TEXT_UNDERLINE_WARNING'), true));
    });
    const computed = Array.from(Sa11y.root.querySelectorAll('h1, h2, h3, h4, h5, h6, p, div, span, li, blockquote'));
    computed.forEach(($el) => {
      const style = getComputedStyle($el);
      const decoration = style.textDecorationLine;
      if (decoration === 'underline') {
        $el.classList.add('sa11y-warning-text');
        $el.insertAdjacentHTML('beforebegin', annotate(WARNING, Lang._('QA_TEXT_UNDERLINE_WARNING'), true));
      }
    });
  }

  // Error: Page is missing meta title.
  if (option.pageTitleQA === true) {
    const $title = document.querySelector('title');
    if (!$title || $title.textContent.trim().length === 0) {
      Sa11y.panel.insertAdjacentHTML('afterend', annotateBanner(ERROR, Lang._('QA_PAGE_TITLE')));
    }
  }
};
