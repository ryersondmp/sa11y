import Elements from '../utils/elements';
import Constants from '../utils/constants';
import * as Utils from '../utils/utils';
import Lang from '../utils/lang';
import { computeAriaLabel, computeAccessibleName } from '../utils/computeAccessibleName';

export default function checkImages(results, option) {
  const containsAltTextStopWords = (alt) => {
    const altUrl = [
      '.png',
      '.jpg',
      '.jpeg',
      '.webp',
      '.gif',
      '.tiff',
      '.svg',
      'DSC_',
      'IMG_',
      'Photo_',
      'Pic_',
      'Pexels_',
      'AdobeStock_',
      'ScreenShot_',
      'Picture_',
      'Snap_',
      'Capture_',
    ];

    const hit = [null, null, null];
    altUrl.forEach((word) => {
      const stopword = word.toLowerCase();
      if (alt.toLowerCase().indexOf(stopword) >= 0) {
        hit[0] = word;
      }
    });

    const susAltWordsOverride = (option.susAltStopWords) ? option.susAltStopWords.split(',').map((word) => word.trim()) : Lang._('SUSPICIOUS_ALT_STOPWORDS');
    susAltWordsOverride.forEach((word) => {
      const susWord = alt.toLowerCase().indexOf(word);
      if (susWord > -1 && susWord < 6) {
        hit[1] = word;
      }
    });

    Lang._('PLACEHOLDER_ALT_STOPWORDS').forEach((word) => {
      if (alt.length === word.length && alt.toLowerCase().indexOf(word) >= 0) {
        hit[2] = word;
      }
    });

    // Additional placeholder stopwords to flag as an error.
    const { extraPlaceholderStopWords } = option;
    if (extraPlaceholderStopWords.length) {
      const array = extraPlaceholderStopWords.split(',').map((word) => word.trim());
      array.forEach((word) => {
        const susWord = alt.toLowerCase().indexOf(word);
        if (susWord > -1 && susWord < 6) {
          hit[2] = word;
        }
      });
    }

    return hit;
  };

  Elements.Found.Images.forEach(($el) => {
    const alt = (computeAriaLabel($el) === 'noAria') ? $el.getAttribute('alt') : computeAriaLabel($el);
    const link = $el.closest('a[href]');

    // Process link text exclusions.
    const linkSpanExclusions = link
      ? Utils.fnIgnore(link, Constants.Exclusions.LinkSpan).textContent : '';
    const stringMatchExclusions = option.linkIgnoreStrings
      ? linkSpanExclusions.replace(option.linkIgnoreStrings, '') : linkSpanExclusions;
    const linkTextContentLength = link
      ? Utils.removeWhitespace(stringMatchExclusions).length : 0;

    // Has aria-hidden.
    if ($el.getAttribute('aria-hidden') === 'true') {
      return;
    }

    if (link && link.getAttribute('aria-hidden') === 'true') {
      // If linked image has aria-hidden, but is still focusable.
      const unfocusable = link.getAttribute('tabindex') === '-1';
      if (!unfocusable) {
        results.push({
          element: $el,
          type: 'error',
          content: Lang.sprintf('LINK_HIDDEN_FOCUSABLE'),
          inline: false,
          position: 'beforebegin',
        });
      }
      return;
    }

    // If alt is missing.
    if (alt === null) {
      if (link) {
        const content = (linkTextContentLength === 0)
          ? Lang.sprintf('MISSING_ALT_LINK_MESSAGE')
          : Lang.sprintf('MISSING_ALT_LINK_BUT_HAS_TEXT_MESSAGE');

        results.push({
          element: $el,
          type: 'error',
          content,
          inline: false,
          position: 'beforebegin',
        });
      } else {
        // General failure message if image is missing alt.
        results.push({
          element: $el,
          type: 'error',
          content: Lang.sprintf('MISSING_ALT_MESSAGE'),
          inline: false,
          position: 'beforebegin',
        });
      }
    } else {
      // If image has alt.
      const sanitizedAlt = Utils.sanitizeHTML(alt);
      const altText = Utils.removeWhitespace(sanitizedAlt);
      const error = containsAltTextStopWords(altText);
      const hasAria = $el.getAttribute('aria-label') || $el.getAttribute('aria-labelledby');
      const decorative = (alt === '' || alt === ' ');

      // Figure elements.
      const figure = $el.closest('figure');
      const figcaption = figure?.querySelector('figcaption');
      const figcaptionText = (figcaption) ? figcaption.textContent.trim() : '';

      // Image's source for key.
      const src = ($el.getAttribute('src')) ? $el.getAttribute('src') : $el.getAttribute('srcset');

      // If aria-label or aria-labelledby returns empty or invalid.
      if (hasAria && altText === '') {
        results.push({
          element: $el,
          type: 'error',
          content: Lang.sprintf('MISSING_ALT_MESSAGE'),
          inline: false,
          position: 'beforebegin',
        });
        return;
      }

      // Decorative images.
      if (decorative) {
        const key = Utils.prepareDismissal(`DECORATIVE${src}`);
        if (link) {
          const type = (linkTextContentLength === 0) ? 'error' : 'good';
          const content = (linkTextContentLength === 0)
            ? Lang.sprintf('LINK_IMAGE_NO_ALT_TEXT')
            : Lang.sprintf('LINK_IMAGE_HAS_TEXT');

          results.push({
            element: $el,
            type,
            content,
            inline: false,
            position: 'beforebegin',
          });
        } else if (figure) {
          const content = (figcaption && figcaptionText.length)
            ? Lang.sprintf('IMAGE_FIGURE_DECORATIVE')
            : Lang.sprintf('IMAGE_DECORATIVE');

          results.push({
            element: $el,
            type: 'warning',
            content,
            inline: false,
            position: 'beforebegin',
            dismiss: key,
          });
        } else {
          results.push({
            element: $el,
            type: 'warning',
            content: Lang.sprintf('IMAGE_DECORATIVE'),
            inline: false,
            position: 'beforebegin',
            dismiss: key,
          });
        }
        return;
      }

      // Alt text quality.
      if (error[0] !== null) {
        // Has stop words.
        const content = (link)
          ? Lang.sprintf('LINK_ALT_HAS_FILE_EXTENSION', error[0], altText)
          : Lang.sprintf('ALT_HAS_FILE_EXTENSION', error[0], altText);

        results.push({
          element: $el,
          type: 'error',
          content,
          inline: false,
          position: 'beforebegin',
        });
      } else if (error[2] !== null) {
        // Placeholder words.
        const content = (link)
          ? Lang.sprintf('LINK_IMAGE_PLACEHOLDER_ALT_MESSAGE', altText)
          : Lang.sprintf('ALT_PLACEHOLDER_MESSAGE', altText);

        results.push({
          element: $el,
          type: 'error',
          content,
          inline: false,
          position: 'beforebegin',
        });
      } else if (error[1] !== null) {
        // Suspicious words.
        const key = Utils.prepareDismissal(`${src + altText}`);
        const content = (link)
          ? Lang.sprintf('LINK_IMAGE_SUS_ALT_MESSAGE', error[1], altText)
          : Lang.sprintf('ALT_HAS_SUS_WORD', error[1], altText);

        results.push({
          element: $el,
          type: 'warning',
          content,
          inline: false,
          position: 'beforebegin',
          dismiss: key,
        });
      } else if (alt.length > option.altTextMaxCharLength) {
        // Alt is too long.
        const key = Utils.prepareDismissal(`${src + altText + alt.length}`);
        const content = (link)
          ? Lang.sprintf('LINK_IMAGE_LONG_ALT', alt.length, altText)
          : Lang.sprintf('IMAGE_ALT_TOO_LONG', alt.length, altText);

        results.push({
          element: $el,
          type: 'warning',
          content,
          inline: false,
          position: 'beforebegin',
          dismiss: key,
        });
      } else if (link) {
        // Has both link text and alt text.
        const key = Utils.prepareDismissal(`${src + altText}`);
        const linkAccName = computeAccessibleName(link);
        const removeWhitespace = Utils.removeWhitespace(linkAccName);
        const sanitizedText = Utils.sanitizeHTML(removeWhitespace);
        const content = (linkTextContentLength === 0)
          ? Lang.sprintf('LINK_IMAGE_ALT_WARNING', altText)
          : Lang.sprintf('LINK_IMAGE_ALT_AND_TEXT_WARNING', altText, sanitizedText);

        results.push({
          element: $el,
          type: 'warning',
          content,
          inline: false,
          position: 'beforebegin',
          dismiss: key,
        });
      } else if (figure) {
        // Figure element has same alt and caption text.
        const duplicate = !!figcaption && (figcaptionText.toLowerCase() === altText.trim().toLowerCase());
        if (duplicate) {
          const key = Utils.prepareDismissal(`FIGURE${src + altText}`);
          results.push({
            element: $el,
            type: 'warning',
            content: Lang.sprintf('IMAGE_FIGURE_DUPLICATE_ALT', altText),
            inline: false,
            position: 'beforebegin',
            dismiss: key,
          });
        } else {
          // Figure has alt text!
          results.push({
            element: $el,
            type: 'good',
            content: Lang.sprintf('IMAGE_PASS', altText),
            inline: false,
            position: 'beforebegin',
          });
        }
      } else {
        // Image has alt text!
        results.push({
          element: $el,
          type: 'good',
          content: Lang.sprintf('IMAGE_PASS', altText),
          inline: false,
          position: 'beforebegin',
        });
      }
    }
  });
  return results;
}
