import Elements from '../utils/elements';
import Constants from '../utils/constants';
import * as Utils from '../utils/utils';
import Lang from '../utils/lang';
import { computeAriaLabel, computeAccessibleName } from '../utils/computeAccessibleName';

export default function checkImages(results, option) {
  const containsAltTextStopWords = (alt) => {
    const altUrl = [
      '.avif',
      '.png',
      '.jp',
      '.webp',
      '.gif',
      '.tiff',
      '.svg',
      '.hei',
      'http',
    ];

    const hit = [null, null, null];
    altUrl.forEach((word) => {
      if (alt.toLowerCase().indexOf(word.toLowerCase()) !== -1) {
        hit[0] = word;
      }
    });

    const susAltWordsOverride = (option.susAltStopWords) ? option.susAltStopWords.split(',').map((word) => word.trim()) : Lang._('SUS_ALT_STOPWORDS');
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

    // Image's source for key.
    const src = ($el.getAttribute('src')) ? $el.getAttribute('src') : $el.getAttribute('srcset');

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

    // Ignore tracking pixels without explicit aria-hidden or nullified alt.
    if ($el.height === 1 && $el.width === 1 && Utils.isElementHidden($el)) {
      return;
    }

    if (link && link.getAttribute('aria-hidden') === 'true') {
      // If linked image has aria-hidden, but is still focusable.
      const unfocusable = link.getAttribute('tabindex') === '-1';
      if (option.checks.HIDDEN_FOCUSABLE && !unfocusable) {
        results.push({
          element: $el,
          type: option.checks.HIDDEN_FOCUSABLE.type || 'error',
          content: option.checks.HIDDEN_FOCUSABLE.content || Lang.sprintf('HIDDEN_FOCUSABLE'),
          inline: false,
          position: 'beforebegin',
          dismiss: Utils.prepareDismissal(`IMAGEHIDDENFOCUSABLE${src}`),
          dismissAll: option.checks.HIDDEN_FOCUSABLE.dismissAll ? 'LINK_HIDDEN_FOCUSABLE' : false,
          developer: option.checks.HIDDEN_FOCUSABLE.developer || true,
        });
      }
      return;
    }

    // If alt is missing.
    if (alt === null) {
      if (link) {
        const rule = (linkTextContentLength === 0)
          ? option.checks.MISSING_ALT_LINK
          : option.checks.MISSING_ALT_LINK_HAS_TEXT;
        const conditional = linkTextContentLength === 0
          ? 'MISSING_ALT_LINK' : 'MISSING_ALT_LINK_HAS_TEXT';
        if (rule) {
          results.push({
            element: $el,
            type: rule.type || 'error',
            content: rule.content || Lang.sprintf(linkTextContentLength === 0
              ? 'MISSING_ALT_LINK' : 'MISSING_ALT_LINK_HAS_TEXT'),
            inline: false,
            position: 'beforebegin',
            dismiss: Utils.prepareDismissal(`LINKIMAGENOALT${src + linkTextContentLength}`),
            dismissAll: rule.dismissAll ? conditional : false,
            developer: rule.developer || false,
          });
        }
      } else if (option.checks.MISSING_ALT) {
        // General failure message if image is missing alt.
        results.push({
          element: $el,
          type: option.checks.MISSING_ALT.type || 'error',
          content: option.checks.MISSING_ALT.content || Lang.sprintf('MISSING_ALT'),
          inline: false,
          position: 'beforebegin',
          dismiss: Utils.prepareDismissal(`IMAGENOALT${src}`),
          dismissAll: option.checks.MISSING_ALT.dismissAll ? 'MISSING_ALT' : false,
          developer: option.checks.MISSING_ALT.developer || false,
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

      // If aria-label or aria-labelledby returns empty or invalid.
      if (hasAria && altText === '') {
        if (option.checks.MISSING_ALT) {
          results.push({
            element: $el,
            type: option.checks.MISSING_ALT.type || 'error',
            content: option.checks.MISSING_ALT.content || Lang.sprintf('MISSING_ALT'),
            inline: false,
            position: 'beforebegin',
            dismiss: Utils.prepareDismissal(`IMAGENOALT${src}`),
            dismissAll: option.checks.MISSING_ALT.dismissAll ? 'MISSING_ALT' : false,
            developer: option.checks.MISSING_ALT.developer || false,
          });
        }
        return;
      }

      // Decorative images.
      if (decorative) {
        const carouselSources = option.checks.IMAGE_DECORATIVE_CAROUSEL.sources || '.carousel';
        if (option.checks.IMAGE_DECORATIVE_CAROUSEL && $el.closest(carouselSources)) {
          results.push({
            element: $el,
            type: option.checks.IMAGE_DECORATIVE_CAROUSEL.type || 'warning',
            content: option.checks.IMAGE_DECORATIVE_CAROUSEL.content || Lang.sprintf('IMAGE_DECORATIVE_CAROUSEL'),
            inline: false,
            position: 'beforebegin',
            dismiss: Utils.prepareDismissal(`CAROUSEL${src}`),
            dismissAll: option.checks.IMAGE_DECORATIVE_CAROUSEL.dismissAll ? 'IMAGE_DECORATIVE_CAROUSEL' : false,
            developer: option.checks.IMAGE_DECORATIVE_CAROUSEL.developer || false,
          });
        } else if (link) {
          const rule = (linkTextContentLength === 0)
            ? option.checks.LINK_IMAGE_NO_ALT_TEXT
            : option.checks.LINK_IMAGE_TEXT;
          const conditional = linkTextContentLength === 0
            ? 'LINK_IMAGE_NO_ALT_TEXT' : 'LINK_IMAGE_TEXT';
          if (rule) {
            results.push({
              element: $el,
              type: rule.type || (linkTextContentLength === 0 ? 'error' : 'good'),
              content: rule.content || Lang.sprintf(conditional),
              inline: false,
              position: 'beforebegin',
              dismiss: Utils.prepareDismissal(`IMAGETEXT${src + linkTextContentLength}`),
              dismissAll: rule.dismissAll ? conditional : false,
              developer: rule.developer || false,
            });
          }
        } else if (figure) {
          const rule = (figcaption && figcaptionText.length)
            ? option.checks.IMAGE_FIGURE_DECORATIVE
            : option.checks.IMAGE_DECORATIVE;
          const conditional = figcaption && figcaptionText.length
            ? 'IMAGE_FIGURE_DECORATIVE' : 'IMAGE_DECORATIVE';
          if (rule) {
            results.push({
              element: $el,
              type: rule.type || 'warning',
              content: rule.content || Lang.sprintf(conditional),
              inline: false,
              position: 'beforebegin',
              dismiss: Utils.prepareDismissal(`FIG${src + figcaptionText}`),
              dismissAll: rule.dismissAll ? conditional : false,
              developer: rule.developer || false,
            });
          }
        } else if (option.checks.IMAGE_DECORATIVE) {
          results.push({
            element: $el,
            type: option.checks.IMAGE_DECORATIVE.type || 'warning',
            content: option.checks.IMAGE_DECORATIVE.content || Lang.sprintf('IMAGE_DECORATIVE'),
            inline: false,
            position: 'beforebegin',
            dismiss: Utils.prepareDismissal(`DECIMAGE${src}`),
            dismissAll: option.checks.IMAGE_DECORATIVE.dismissAll ? 'IMAGE_DECORATIVE' : false,
            developer: option.checks.IMAGE_DECORATIVE.developer || false,
          });
        }
        return;
      }

      // Alt text quality.
      if (error[0] !== null) {
        // Has stop words.
        const rule = (link)
          ? option.checks.LINK_ALT_FILE_EXT
          : option.checks.ALT_FILE_EXT;
        const conditional = (link) ? 'LINK_ALT_FILE_EXT' : 'ALT_FILE_EXT';
        if (rule) {
          results.push({
            element: $el,
            type: rule.type || 'error',
            content: rule.content || Lang.sprintf(link
              ? 'LINK_ALT_FILE_EXT' : 'ALT_FILE_EXT', error[0], altText),
            inline: false,
            position: 'beforebegin',
            dismiss: Utils.prepareDismissal(`IMAGE${src + altText}`),
            dismissAll: rule.dismissAll ? conditional : false,
            developer: rule.developer || false,
          });
        }
      } else if (error[2] !== null) {
        // Placeholder words.
        const rule = (link)
          ? option.checks.LINK_PLACEHOLDER_ALT
          : option.checks.ALT_PLACEHOLDER;
        const conditional = (link) ? 'LINK_PLACEHOLDER_ALT' : 'ALT_PLACEHOLDER';
        if (rule) {
          results.push({
            element: $el,
            type: rule.type || 'error',
            content: rule.content || Lang.sprintf(link
              ? 'LINK_PLACEHOLDER_ALT' : 'ALT_PLACEHOLDER', altText),
            inline: false,
            position: 'beforebegin',
            dismiss: Utils.prepareDismissal(`IMAGE${src + altText}`),
            dismissAll: rule.dismissAll ? conditional : false,
            developer: rule.developer || false,
          });
        }
      } else if (error[1] !== null) {
        // Suspicious words.
        const rule = (link)
          ? option.checks.LINK_SUS_ALT
          : option.checks.SUS_ALT;
        const conditional = (link) ? 'LINK_SUS_ALT' : 'SUS_ALT';
        if (rule) {
          results.push({
            element: $el,
            type: rule.type || 'warning',
            content: rule.content || Lang.sprintf(link
              ? 'LINK_SUS_ALT' : 'SUS_ALT', error[1], altText),
            inline: false,
            position: 'beforebegin',
            dismiss: Utils.prepareDismissal(`IMAGE${src + altText}`),
            dismissAll: rule.dismissAll ? conditional : false,
            developer: rule.developer || false,
          });
        }
      } else if (alt.length > option.altTextMaxCharLength) {
        // Alt is too long.
        const rule = (link)
          ? option.checks.LINK_IMAGE_LONG_ALT
          : option.checks.IMAGE_ALT_TOO_LONG;
        const conditional = (link) ? 'LINK_IMAGE_LONG_ALT' : 'IMAGE_ALT_TOO_LONG';
        if (rule) {
          results.push({
            element: $el,
            type: rule.type || 'warning',
            content: rule.content || Lang.sprintf(link
              ? 'LINK_IMAGE_LONG_ALT' : 'IMAGE_ALT_TOO_LONG', alt.length, altText),
            inline: false,
            position: 'beforebegin',
            dismiss: Utils.prepareDismissal(`IMAGE${src + altText}`),
            dismissAll: rule.dismissAll ? conditional : false,
            developer: rule.developer || false,
          });
        }
      } else if (link) {
        const rule = (linkTextContentLength === 0)
          ? option.checks.LINK_IMAGE_ALT
          : option.checks.LINK_IMAGE_ALT_AND_TEXT;
        const conditional = (linkTextContentLength === 0) ? 'LINK_IMAGE_ALT' : 'LINK_IMAGE_ALT_AND_TEXT';

        if (rule) {
          // Has both link text and alt text.
          const linkAccName = computeAccessibleName(link);
          const removeWhitespace = Utils.removeWhitespace(linkAccName);
          const sanitizedText = Utils.sanitizeHTML(removeWhitespace);

          const tooltip = (linkTextContentLength === 0)
            ? Lang.sprintf('LINK_IMAGE_ALT', altText)
            : `${Lang.sprintf('LINK_IMAGE_ALT_AND_TEXT', altText, sanitizedText)} ${Lang.sprintf('ACC_NAME_TIP')}`;

          results.push({
            element: $el,
            type: rule.type || 'warning',
            content: rule.content || tooltip,
            inline: false,
            position: 'beforebegin',
            dismiss: Utils.prepareDismissal(`IMAGELINK${src + altText}`),
            dismissAll: rule.dismissAll ? conditional : false,
            developer: rule.developer || false,
          });
        }
      } else if (figure) {
        // Figure element has same alt and caption text.
        const duplicate = !!figcaption && (figcaptionText.toLowerCase() === altText.trim().toLowerCase());
        if (duplicate) {
          if (option.checks.IMAGE_FIGURE_DUPLICATE_ALT) {
            results.push({
              element: $el,
              type: option.checks.IMAGE_FIGURE_DUPLICATE_ALT.type || 'warning',
              content: option.checks.IMAGE_FIGURE_DUPLICATE_ALT.content || Lang.sprintf('IMAGE_FIGURE_DUPLICATE_ALT', altText),
              inline: false,
              position: 'beforebegin',
              dismiss: Utils.prepareDismissal(`FIGIMAGEDUPLICATE${src}`),
              dismissAll: option.checks.IMAGE_FIGURE_DUPLICATE_ALT.dismissAll ? 'IMAGE_FIGURE_DUPLICATE_ALT' : false,
              developer: option.checks.IMAGE_FIGURE_DUPLICATE_ALT.developer || false,
            });
          }
        } else if (option.checks.IMAGE_PASS) {
          // Figure has alt text!
          results.push({
            element: $el,
            type: option.checks.IMAGE_PASS.type || 'good',
            content: option.checks.IMAGE_PASS.content || Lang.sprintf('IMAGE_PASS', altText),
            inline: false,
            position: 'beforebegin',
            dismiss: Utils.prepareDismissal(`IMAGEPASS${src + altText}`),
            dismissAll: option.checks.IMAGE_PASS.dismissAll ? 'IMAGE_PASS' : false,
            developer: option.checks.IMAGE_PASS.developer || false,
          });
        }
      } else if (option.checks.IMAGE_PASS) {
        // Image has alt text!
        results.push({
          element: $el,
          type: option.checks.IMAGE_PASS.type || 'good',
          content: option.checks.IMAGE_PASS.content || Lang.sprintf('IMAGE_PASS', altText),
          inline: false,
          position: 'beforebegin',
          dismiss: Utils.prepareDismissal(`IMAGEPASS${src + altText}`),
          dismissAll: option.checks.IMAGE_PASS.dismissAll ? 'IMAGE_PASS' : false,
          developer: option.checks.IMAGE_PASS.developer || false,
        });
      }
    }
  });
  return results;
}
