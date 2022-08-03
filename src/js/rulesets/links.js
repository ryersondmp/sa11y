// ============================================================
// Rulesets: Link text
// ============================================================
import Lang from '../components/translation';
import { ERROR, WARNING } from '../components/constants';
import * as utilities from '../components/utilities';
import { annotate } from '../components/annotate';

export default function checkLinkText() {
  const containsLinkTextStopWords = (textContent) => {
    const urlText = [
      'http',
      '.asp',
      '.htm',
      '.php',
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

    const hit = [null, null, null];

    // Flag partial stop words.
    Lang._('PARTIAL_ALT_STOPWORDS').forEach((word) => {
      if (
        textContent.length === word.length && textContent.toLowerCase().indexOf(word) >= 0
      ) {
        hit[0] = word;
      }
      return false;
    });

    // Other warnings we want to add.
    Lang._('WARNING_ALT_STOPWORDS').forEach((word) => {
      if (textContent.toLowerCase().indexOf(word) >= 0) {
        hit[1] = word;
      }
      return false;
    });

    // Flag link text containing URLs.
    urlText.forEach((word) => {
      if (textContent.toLowerCase().indexOf(word) >= 0) {
        hit[2] = word;
      }
      return false;
    });
    return hit;
  };

  Sa11y.$links.forEach((el) => {
    let linkText = utilities.computeAriaLabel(el);
    const hasAriaLabelledBy = el.getAttribute('aria-labelledby');
    const hasAriaLabel = el.getAttribute('aria-label');
    let childAriaLabelledBy = null;
    let childAriaLabel = null;
    const hasTitle = el.getAttribute('title');

    if (el.children.length) {
      const $firstChild = el.children[0];
      childAriaLabelledBy = $firstChild.getAttribute('aria-labelledby');
      childAriaLabel = $firstChild.getAttribute('aria-label');
    }

    if (linkText === 'noAria') {
      // Plain text content.
      linkText = el.textContent.trim();
      const $img = el.querySelector('img');

      // If an image exists within the link. Help with AccName computation.
      if ($img) {
        // Check if there's aria on the image.
        const imgText = utilities.computeAriaLabel($img);
        if (imgText !== 'noAria') {
          linkText += imgText;
        } else {
          // No aria? Process alt on image.
          linkText += $img ? ($img.getAttribute('alt') || '') : '';
        }
      }
    }

    const linkTextTrimmed = linkText.replace(/\s+/g, ' ').trim();
    const error = containsLinkTextStopWords(utilities.fnIgnore(el, option.linkIgnoreSpan).textContent.replace(/[!*?↣↳→↓»↴]/g, '').trim());

    if (el.querySelectorAll('img').length) {
      // Do nothing. Don't overlap with Alt Text module.
    } else if (el.getAttribute('href') && !linkTextTrimmed) {
      // Flag empty hyperlinks.
      if (el && hasTitle) {
        // If empty but has title attribute.
      } else if (el.children.length) {
        // Has child elements (e.g. SVG or SPAN) <a><i></i></a>
        el.classList.add('sa11y-error-border');
        el.insertAdjacentHTML('afterend', annotate(ERROR, Lang._('LINK_EMPTY_LINK_NO_LABEL'), true));
      } else {
        // Completely empty <a></a>
        el.classList.add('sa11y-error-border');
        el.insertAdjacentHTML('afterend', annotate(ERROR, Lang._('LINK_EMPTY'), true));
      }
    } else if (error[0] != null) {
      // Contains stop words.
      if (hasAriaLabelledBy || hasAriaLabel || childAriaLabelledBy || childAriaLabel) {
        if (option.showGoodLinkButton === true) {
          el.insertAdjacentHTML(
            'beforebegin',
            annotate(GOOD, Lang.sprintf('LINK_LABEL', linkText), true),
          );
        }
      } else if (el.getAttribute('aria-hidden') === 'true' && el.getAttribute('tabindex') === '-1') {
        // Do nothing.
      } else {
        el.classList.add('sa11y-error-text');
        el.insertAdjacentHTML(
          'afterend',
          annotate(ERROR, Lang.sprintf('LINK_STOPWORD', error[0]), true),
        );
      }
    } else if (error[1] != null) {
      // Contains warning words.
      el.classList.add('sa11y-warning-text');
      el.insertAdjacentHTML(
        'afterend',
        annotate(WARNING, Lang.sprintf('LINK_BEST_PRACTICES', error[1]), true),
      );
    } else if (error[2] != null) {
      // Contains URL in link text.
      if (linkText.length > 40) {
        el.classList.add('sa11y-warning-text');
        el.insertAdjacentHTML('afterend', annotate(WARNING, Lang._('LINK_URL'), true));
      }
    } else if (hasAriaLabelledBy || hasAriaLabel || childAriaLabelledBy || childAriaLabel) {
      // If the link has any ARIA, append a "Good" link button.
      if (option.showGoodLinkButton === true) {
        el.insertAdjacentHTML(
          'beforebegin',
          annotate(GOOD, Lang.sprintf('LINK_LABEL', linkText), true),
        );
      }
    }
  });
};