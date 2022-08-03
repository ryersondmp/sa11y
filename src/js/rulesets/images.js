// ============================================================
// Ruleset: Alternative text
// ============================================================
import Lang from '../components/translation';
import { ERROR, WARNING, GOOD } from '../components/constants';
import * as utilities from '../components/utilities';
import { annotate } from '../components/annotate';

export default function checkAltText() {
  const containsAltTextStopWords = (alt) => {
    const altUrl = [
      '.png',
      '.jpg',
      '.jpeg',
      '.webp',
      '.gif',
      '.tiff',
      '.svg',
    ];

    const hit = [null, null, null];
    altUrl.forEach((word) => {
      if (alt.toLowerCase().indexOf(word) >= 0) {
        hit[0] = word;
      }
    });
    Lang._('SUSPICIOUS_ALT_STOPWORDS').forEach((word) => {
      if (alt.toLowerCase().indexOf(word) >= 0) {
        hit[1] = word;
      }
    });
    Lang._('PLACEHOLDER_ALT_STOPWORDS').forEach((word) => {
      if (alt.length === word.length && alt.toLowerCase().indexOf(word) >= 0) {
        hit[2] = word;
      }
    });
    return hit;
  };

  Sa11y.$img.forEach(($el) => {
    const alt = $el.getAttribute('alt');
    if (alt === null) {
      if ($el.closest('a[href]')) {
        if (utilities.fnIgnore($el.closest('a[href]'), 'noscript').textContent.trim().length >= 1) {
          $el.classList.add('sa11y-error-border');
          $el.closest('a[href]').insertAdjacentHTML('beforebegin', annotate(ERROR, Lang._('MISSING_ALT_LINK_BUT_HAS_TEXT_MESSAGE')));
        } else if (utilities.fnIgnore($el.closest('a[href]'), 'noscript').textContent.trim().length === 0) {
          $el.classList.add('sa11y-error-border');
          $el.closest('a[href]').insertAdjacentHTML('beforebegin', annotate(ERROR, Lang._('MISSING_ALT_LINK_MESSAGE')));
        }
      } else {
        // General failure message if image is missing alt.
        $el.classList.add('sa11y-error-border');
        $el.insertAdjacentHTML('beforebegin', annotate(ERROR, Lang._('MISSING_ALT_MESSAGE')));
      }
    } else {
      // If alt attribute is present, further tests are done.
      const altText = utilities.sanitizeForHTML(alt); // Prevent tooltip from breaking.
      const error = containsAltTextStopWords(altText);
      const altLength = alt.length;

      // Image fails if a stop word was found.
      if (error[0] !== null && $el.closest('a[href]')) {
        $el.classList.add('sa11y-error-border');
        $el.closest('a[href]').insertAdjacentHTML('beforebegin', annotate(ERROR, Lang.sprintf('LINK_IMAGE_BAD_ALT_MESSAGE', error[0], altText)));
      } else if (error[2] !== null && $el.closest('a[href]')) {
        $el.classList.add('sa11y-error-border');
        $el.closest('a[href]').insertAdjacentHTML('beforebegin', annotate(ERROR, Lang.sprintf('LINK_IMAGE_PLACEHOLDER_ALT_MESSAGE', altText)));
      } else if (error[1] !== null && $el.closest('a[href]')) {
        $el.classList.add('sa11y-warning-border');
        $el.closest('a[href]').insertAdjacentHTML('beforebegin', annotate(WARNING, Lang.sprintf('LINK_IMAGE_SUS_ALT_MESSAGE', error[1], altText)));
      } else if (error[0] !== null) {
        $el.classList.add('sa11y-error-border');
        $el.insertAdjacentHTML('beforebegin', annotate(ERROR, Lang.sprintf('LINK_ALT_HAS_BAD_WORD_MESSAGE', altText, error[0])));
      } else if (error[2] !== null) {
        $el.classList.add('sa11y-error-border');
        $el.insertAdjacentHTML('beforebegin', annotate(ERROR, Lang.sprintf('ALT_PLACEHOLDER_MESSAGE', altText)));
      } else if (error[1] !== null) {
        $el.classList.add('sa11y-warning-border');
        $el.insertAdjacentHTML('beforebegin', annotate(WARNING, Lang.sprintf('ALT_HAS_SUS_WORD', error[1], altText)));
      } else if ((alt === '' || alt === ' ') && $el.closest('a[href]')) {
        if ($el.closest('a[href]').getAttribute('tabindex') === '-1' && $el.closest('a[href]').getAttribute('aria-hidden') === 'true') {
          // Do nothing.
        } else if ($el.closest('a[href]').getAttribute('aria-hidden') === 'true') {
          $el.classList.add('sa11y-error-border');
          $el.closest('a[href]').insertAdjacentHTML('beforebegin', annotate(ERROR, Lang._('LINK_IMAGE_ARIA_HIDDEN')));
        } else if (utilities.fnIgnore($el.closest('a[href]'), 'noscript').textContent.trim().length === 0) {
          $el.classList.add('sa11y-error-border');
          $el.closest('a[href]').insertAdjacentHTML('beforebegin', annotate(ERROR, Lang._('LINK_IMAGE_NO_ALT_TEXT')));
        } else {
          $el.closest('a[href]').insertAdjacentHTML('beforebegin', annotate(GOOD, Lang._('LINK_IMAGE_HAS_TEXT')));
        }
      } else if (alt.length > 250 && $el.closest('a[href]')) {
        // Link and contains alt text.
        $el.classList.add('sa11y-warning-border');
        $el.closest('a[href]').insertAdjacentHTML('beforebegin', annotate(WARNING, Lang.sprintf('LINK_IMAGE_LONG_ALT', altLength, altText)));
      } else if (alt !== '' && $el.closest('a[href]') && utilities.fnIgnore($el.closest('a[href]'), 'noscript').textContent.trim().length === 0) {
        // Link and contains an alt text.
        $el.classList.add('sa11y-warning-border');
        $el.closest('a[href]').insertAdjacentHTML('beforebegin', annotate(WARNING, Lang.sprintf('LINK_IMAGE_ALT_WARNING', altText)));
      } else if (alt !== '' && $el.closest('a[href]') && utilities.fnIgnore($el.closest('a[href]'), 'noscript').textContent.trim().length >= 1) {
        // Contains alt text & surrounding link text.
        $el.classList.add('sa11y-warning-border');
        $el.closest('a[href]').insertAdjacentHTML('beforebegin', annotate(WARNING, Lang.sprintf('LINK_IMAGE_ALT_AND_TEXT_WARNING', altText)));
      } else if (alt === '' || alt === ' ') {
        // Decorative alt and not a link.
        if ($el.closest('figure')) {
          const figcaption = $el.closest('figure').querySelector('figcaption');
          if (figcaption !== null && figcaption.textContent.trim().length >= 1) {
            $el.classList.add('sa11y-warning-border');
            $el.insertAdjacentHTML('beforebegin', annotate(WARNING, Lang._('IMAGE_FIGURE_DECORATIVE')));
          }
        } else {
          $el.classList.add('sa11y-warning-border');
          $el.insertAdjacentHTML('beforebegin', annotate(WARNING, Lang._('IMAGE_DECORATIVE')));
        }
      } else if (alt.length > 250) {
        $el.classList.add('sa11y-warning-border');
        $el.insertAdjacentHTML('beforebegin', annotate(WARNING, Lang.sprintf('IMAGE_ALT_TOO_LONG', altLength, altText)));
      } else if (alt !== '') {
        // Figure element has same alt and caption text.
        if ($el.closest('figure')) {
          const figcaption = $el.closest('figure').querySelector('figcaption');
          if (!!figcaption
                && (figcaption.textContent.trim().toLowerCase() === altText.trim().toLowerCase())) {
            $el.classList.add('sa11y-warning-border');
            $el.insertAdjacentHTML('beforebegin', annotate(WARNING, Lang.sprintf('IMAGE_FIGURE_DUPLICATE_ALT', altText)));
          } else {
            $el.insertAdjacentHTML('beforebegin', annotate(GOOD, Lang.sprintf('IMAGE_PASS', altText)));
          }
        } else {
          // If image has alt text - pass!
          $el.insertAdjacentHTML('beforebegin', annotate(GOOD, Lang.sprintf('IMAGE_PASS', altText)));
        }
      }
    }
  });
};
