import Constants from '../utils/constants';
import Elements from '../utils/elements';
import * as Utils from '../utils/utils';
import Lang from '../utils/lang';

export default function checkImages(results) {
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

  Elements.Found.Images.forEach(($el) => {
    const alt = $el.getAttribute('alt');
    if (alt === null) {
      if ($el.closest('a[href]')) {
        if (Utils.fnIgnore($el.closest('a[href]')).textContent.trim().length >= 1) {
          results.push({
            element: $el,
            type: Constants.Global.ERROR,
            content: Lang.sprintf('MISSING_ALT_LINK_BUT_HAS_TEXT_MESSAGE'),
            inline: false,
            position: 'beforebegin',
          });
        } else if (Utils.fnIgnore($el.closest('a[href]')).textContent.trim().length === 0) {
          results.push({
            element: $el,
            type: Constants.Global.ERROR,
            content: Lang.sprintf('MISSING_ALT_LINK_MESSAGE'),
            inline: false,
            position: 'beforebegin',
          });
        }
      } else {
        // General failure message if image is missing alt.
        results.push({
          element: $el,
          type: Constants.Global.ERROR,
          content: Lang.sprintf('MISSING_ALT_MESSAGE'),
          inline: false,
          position: 'beforebegin',
        });
      }
    } else {
      // If alt attribute is present, further tests are done.
      const altText = Utils.sanitizeHTML(alt); // Prevent tooltip from breaking.
      const error = containsAltTextStopWords(altText);
      const altLength = alt.length;
      const baseSrc = $el.getAttribute('src').split('?')[0];

      if ($el.closest('a[href]') && $el.closest('a[href]').getAttribute('tabindex') === '-1' && $el.closest('a[href]').getAttribute('aria-hidden') === 'true') {
        // Do nothing if link has aria-hidden and negative tabindex.
      } else if (error[0] !== null && $el.closest('a[href]')) {
        // Image fails if a stop word was found.
        results.push({
          element: $el,
          type: Constants.Global.ERROR,
          content: Lang.sprintf('LINK_IMAGE_BAD_ALT_MESSAGE', error[0], altText),
          inline: false,
          position: 'beforebegin',
        });
      } else if (error[2] !== null && $el.closest('a[href]')) {
        results.push({
          element: $el,
          type: Constants.Global.ERROR,
          content: Lang.sprintf('LINK_IMAGE_PLACEHOLDER_ALT_MESSAGE', altText),
          inline: false,
          position: 'beforebegin',
        });
      } else if (error[1] !== null && $el.closest('a[href]')) {
        const key = Utils.prepareDismissal(`LINKEDIMAGE${baseSrc + altText + error[1]}`);
        results.push({
          element: $el,
          type: Constants.Global.WARNING,
          content: Lang.sprintf('LINK_IMAGE_SUS_ALT_MESSAGE', error[1], altText),
          inline: false,
          position: 'beforebegin',
          dismiss: key,
        });
      } else if (error[0] !== null) {
        results.push({
          element: $el,
          type: Constants.Global.ERROR,
          content: Lang.sprintf('LINK_ALT_HAS_BAD_WORD_MESSAGE', error[0], altText),
          inline: false,
          position: 'beforebegin',
        });
      } else if (error[2] !== null) {
        results.push({
          element: $el,
          type: Constants.Global.ERROR,
          content: Lang.sprintf('ALT_PLACEHOLDER_MESSAGE', altText),
          inline: false,
          position: 'beforebegin',
        });
      } else if (error[1] !== null) {
        const key = Utils.prepareDismissal(`IMAGE${baseSrc + altText + error[1]}`);
        results.push({
          element: $el,
          type: Constants.Global.WARNING,
          content: Lang.sprintf('ALT_HAS_SUS_WORD', error[1], altText),
          inline: false,
          position: 'beforebegin',
          dismiss: key,
        });
      } else if ((alt === '' || alt === ' ') && $el.closest('a[href]')) {
        if ($el.closest('a[href]').getAttribute('tabindex') === '-1' && $el.closest('a[href]').getAttribute('aria-hidden') === 'true') {
          // Do nothing.
        } else if ($el.closest('a[href]').getAttribute('aria-hidden') === 'true') {
          results.push({
            element: $el,
            type: Constants.Global.ERROR,
            content: Lang.sprintf('LINK_IMAGE_ARIA_HIDDEN'),
            inline: false,
            position: 'beforebegin',
          });
        } else if (Utils.fnIgnore($el.closest('a[href]')).textContent.trim().length === 0) {
          results.push({
            element: $el,
            type: Constants.Global.ERROR,
            content: Lang.sprintf('LINK_IMAGE_NO_ALT_TEXT'),
            inline: false,
            position: 'beforebegin',
          });
        } else {
          results.push({
            element: $el,
            type: Constants.Global.GOOD,
            content: Lang.sprintf('LINK_IMAGE_HAS_TEXT'),
            inline: false,
            position: 'beforebegin',
          });
        }
      } else if (alt.length > 250 && $el.closest('a[href]')) {
        const key = Utils.prepareDismissal(`LINKEDIMAGE${baseSrc + altText + alt.length}`);
        // Link and contains alt text.
        results.push({
          element: $el,
          type: Constants.Global.WARNING,
          content: Lang.sprintf('LINK_IMAGE_LONG_ALT', altLength, altText),
          inline: false,
          position: 'beforebegin',
          dismiss: key,
        });
      } else if (alt !== '' && $el.closest('a[href]') && Utils.fnIgnore($el.closest('a[href]')).textContent.trim().length === 0) {
        const key = Utils.prepareDismissal(`LINKEDIMAGE${baseSrc + altText}`);
        // Link and contains an alt text.
        results.push({
          element: $el,
          type: Constants.Global.WARNING,
          content: Lang.sprintf('LINK_IMAGE_ALT_WARNING', altText),
          inline: false,
          position: 'beforebegin',
          dismiss: key,
        });
      } else if (alt !== '' && $el.closest('a[href]') && Utils.fnIgnore($el.closest('a[href]')).textContent.trim().length >= 1) {
        const key = Utils.prepareDismissal(`LINKEDIMAGE${baseSrc + altText}`);
        // Contains alt text & surrounding link text.
        results.push({
          element: $el,
          type: Constants.Global.WARNING,
          content: Lang.sprintf('LINK_IMAGE_ALT_AND_TEXT_WARNING', altText),
          inline: false,
          position: 'beforebegin',
          dismiss: key,
        });
      } else if (alt === '' || alt === ' ') {
        // Decorative alt and not a link.
        if ($el.closest('figure')) {
          const figcaption = $el.closest('figure').querySelector('figcaption');
          if (figcaption !== null && figcaption.textContent.trim().length >= 1) {
            const key = Utils.prepareDismissal(`DECORATIVE${baseSrc}`);
            results.push({
              element: $el,
              type: Constants.Global.WARNING,
              content: Lang.sprintf('IMAGE_FIGURE_DECORATIVE'),
              inline: false,
              position: 'beforebegin',
              dismiss: key,
            });
          } else {
            const key = Utils.prepareDismissal(`DECORATIVE${baseSrc}`);
            results.push({
              element: $el,
              type: Constants.Global.WARNING,
              content: Lang.sprintf('IMAGE_DECORATIVE'),
              inline: false,
              position: 'beforebegin',
              dismiss: key,
            });
          }
        } else {
          const key = Utils.prepareDismissal(`DECORATIVE${baseSrc}`);
          results.push({
            element: $el,
            type: Constants.Global.WARNING,
            content: Lang.sprintf('IMAGE_DECORATIVE'),
            inline: false,
            position: 'beforebegin',
            dismiss: key,
          });
        }
      } else if (alt.length > 250) {
        const key = Utils.prepareDismissal(`IMAGE${baseSrc + altText + alt.length}`);
        results.push({
          element: $el,
          type: Constants.Global.WARNING,
          content: Lang.sprintf('IMAGE_ALT_TOO_LONG', altLength, altText),
          inline: false,
          position: 'beforebegin',
          dismiss: key,
        });
      } else if (alt !== '') {
        // Figure element has same alt and caption text.
        if ($el.closest('figure')) {
          const figcaption = $el.closest('figure').querySelector('figcaption');
          if (!!figcaption
            && (figcaption.textContent.trim().toLowerCase() === altText.trim().toLowerCase())) {
            const key = Utils.prepareDismissal(`FIGURE${baseSrc + altText}`);
            results.push({
              element: $el,
              type: Constants.Global.WARNING,
              content: Lang.sprintf('IMAGE_FIGURE_DUPLICATE_ALT', altText),
              inline: false,
              position: 'beforebegin',
              dismiss: key,
            });
          } else {
            results.push({
              element: $el,
              type: Constants.Global.GOOD,
              content: Lang.sprintf('IMAGE_PASS', altText),
              inline: false,
              position: 'beforebegin',
            });
          }
        } else {
          // If image has alt text - pass!
          results.push({
            element: $el,
            type: Constants.Global.GOOD,
            content: Lang.sprintf('IMAGE_PASS', altText),
            inline: false,
            position: 'beforebegin',
          });
        }
      }
    }
  });
  return { results };
}
