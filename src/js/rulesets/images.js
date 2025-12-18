import { computeAccessibleName, computeAriaLabel } from '../utils/computeAccessibleName';
import Constants from '../utils/constants';
import Elements from '../utils/elements';
import Lang from '../utils/lang';
import * as Utils from '../utils/utils';

const url = [
  '.avif',
  '.png',
  '.jpg',
  '.jpeg',
  '.webp',
  '.gif',
  '.tiff',
  '.svg',
  '.heif',
  '.heic',
  'http',
];

export default function checkImages(results, option) {
  // Generate suspicious alt stop words list.
  const susAltWords = option.susAltStopWords
    ? option.susAltStopWords
        .split(',')
        .map((word) => word.trim().toLowerCase())
        .filter(Boolean)
    : Lang._('SUS_ALT_STOPWORDS');

  // Generate placeholder stop words set.
  const placeholderAltSet = new Set(Lang._('PLACEHOLDER_ALT_STOPWORDS'));

  // Generate placeholder stop words that are that the START of an alt string.
  const altPlaceholderPattern = Utils.generateRegexString(option.altPlaceholder, true);
  const linkIgnoreStringPattern = Utils.generateRegexString(option.linkIgnoreStrings);

  // Generate supplied placeholder stop words.
  const extraPlaceholderStopWords = option.extraPlaceholderStopWords
    .split(',')
    .map((word) => word.trim().toLowerCase())
    .filter(Boolean);

  // Utility function to process alt text for stop words.
  const containsAltTextStopWords = (alt) => {
    const altLowerCase = alt.toLowerCase();
    const altNoNumbers = altLowerCase.replace(/\d+/g, '').trim();
    const hit = [null, null, null];

    // 1) URL hit.
    for (const urlHit of url) {
      if (altLowerCase.includes(urlHit)) {
        hit[0] = urlHit;
        break;
      }
    }

    // 2) Only if no URL hit, check dimensions, e.g. '123x456' or '123 X 456'
    if (!hit[0]) {
      const match = altLowerCase.match(/\b\d{2,6}\s*x\s*\d{2,6}\b/);
      if (match) hit[0] = match[0];
    }

    // 3) Suspicious alt words near the beginning of a string.
    for (const word of susAltWords) {
      const index = altLowerCase.indexOf(word);
      if (index > -1 && index < 6) {
        hit[1] = word;
        break;
      }
    }

    // 4) Catch placeholder alt text, e.g. "placeholder", "hero image 1"
    if (placeholderAltSet.has(altLowerCase) || placeholderAltSet.has(altNoNumbers)) {
      hit[2] = alt;
    }

    // 5) Extra placeholder stopwords (near the start of alt)
    if (extraPlaceholderStopWords.length) {
      for (const word of extraPlaceholderStopWords) {
        const index = altLowerCase.indexOf(word);
        if (index > -1 && index < 6) {
          hit[2] = word;
          break;
        }
      }
    }
    return hit;
  };

  /** ************************ */
  /*  Loop through all images  */
  /* ************************* */
  Elements.Found.Images.forEach(($el) => {
    const alt =
      computeAriaLabel($el) === 'noAria' ? $el.getAttribute('alt') : computeAriaLabel($el);
    const ariaHidden = $el?.getAttribute('aria-hidden') === 'true';
    const presentationRole = $el?.getAttribute('role') === 'presentation';

    // Ignore tracking pixels without explicit aria-hidden or nullified alt.
    if ($el.height < 2 && $el.width < 2 && (Utils.isElementHidden($el) || alt === '')) {
      return;
    }

    // If selectors passed via prop, it will treat that image as an unlinked image.
    const link = $el.closest(
      option.imageWithinLightbox ? `a[href]:not(${option.imageWithinLightbox})` : 'a[href]',
    );

    // Image's source for key.
    const src = $el.getAttribute('src') ? $el.getAttribute('src') : $el.getAttribute('srcset');

    // Process link text exclusions.
    const linkText = link
      ? Utils.fnIgnore(link, Constants.Exclusions.LinkSpan).textContent.replace(
          linkIgnoreStringPattern,
          '',
        )
      : '';
    const linkTextLength = Utils.removeWhitespace(linkText).length;

    /** ******************** */
    /*  HIDDEN BUT FOCUSABE  */
    /* ********************* */
    if (link && link.getAttribute('aria-hidden') === 'true') {
      // If linked image has aria-hidden, but is still focusable.
      const unfocusable = link.getAttribute('tabindex') === '-1';
      if (option.checks.HIDDEN_FOCUSABLE && !unfocusable) {
        results.push({
          test: 'HIDDEN_FOCUSABLE',
          element: $el,
          type: option.checks.HIDDEN_FOCUSABLE.type || 'error',
          content: Lang.sprintf(option.checks.HIDDEN_FOCUSABLE.content || 'HIDDEN_FOCUSABLE'),
          dismiss: Utils.prepareDismissal(`IMGHIDDENFOCUSABLE${src}`),
          dismissAll: option.checks.HIDDEN_FOCUSABLE.dismissAll ? 'LINK_HIDDEN_FOCUSABLE' : false,
          developer: option.checks.HIDDEN_FOCUSABLE.developer || true,
        });
      }
      return;
    }

    /** **************** */
    /*  ALT IS MISSING   */
    /* ***************** */
    if (alt === null) {
      if (link) {
        const hasAriaHiddenOrPresentationRole =
          linkTextLength > 0 && (ariaHidden || presentationRole);
        if (!hasAriaHiddenOrPresentationRole) {
          const rule =
            linkTextLength === 0
              ? option.checks.MISSING_ALT_LINK
              : option.checks.MISSING_ALT_LINK_HAS_TEXT;
          const conditional =
            linkTextLength === 0 ? 'MISSING_ALT_LINK' : 'MISSING_ALT_LINK_HAS_TEXT';
          if (rule) {
            results.push({
              test: conditional,
              element: $el,
              type: rule.type || 'error',
              content: Lang.sprintf(rule.content || conditional),
              dismiss: Utils.prepareDismissal(`${conditional + src + linkTextLength}`),
              dismissAll: rule.dismissAll ? conditional : false,
              developer: rule.developer || false,
            });
          }
        }
      } else if (option.checks.MISSING_ALT) {
        // General failure message if image is missing alt.
        results.push({
          test: 'MISSING_ALT',
          element: $el,
          type: option.checks.MISSING_ALT.type || 'error',
          content: Lang.sprintf(option.checks.MISSING_ALT.content || 'MISSING_ALT'),
          dismiss: Utils.prepareDismissal(`IMGNOALT${src}`),
          dismissAll: option.checks.MISSING_ALT.dismissAll ? 'MISSING_ALT' : false,
          developer: option.checks.MISSING_ALT.developer || false,
        });
      }
      return;
    }

    /** *************** */
    /*  HAS ALT TEXT    */
    /* **************** */
    const sanitizedAlt = Utils.sanitizeHTML(alt);
    const altText = Utils.removeWhitespace(sanitizedAlt);
    const hasAria = $el.getAttribute('aria-label') || $el.getAttribute('aria-labelledby');

    // If aria-label or aria-labelledby returns empty or invalid.
    if (option.checks.MISSING_ALT) {
      if (hasAria && altText === '') {
        results.push({
          test: 'MISSING_ALT',
          element: $el,
          type: option.checks.MISSING_ALT.type || 'error',
          content: Lang.sprintf(option.checks.MISSING_ALT.content || 'MISSING_ALT'),
          dismiss: Utils.prepareDismissal(`IMGNOALTARIA${src}`),
          dismissAll: option.checks.MISSING_ALT.dismissAll ? 'MISSING_ALT' : false,
          developer: option.checks.MISSING_ALT.developer || false,
        });
        return;
      }
    }

    /* ************** */
    /*  DECORATIVE    */
    /* ************** */
    const decorative = alt === '';

    // Figure elements.
    const figure = $el.closest('figure');
    const figcaption = figure?.querySelector('figcaption');
    const figcaptionText = figcaption ? Utils.getText(figcaption) : '';

    // Maximum alt text length
    const maxAltCharactersLinks = option.checks.LINK_IMAGE_LONG_ALT.maxLength || 250;
    const maxAltCharacters = option.checks.IMAGE_ALT_TOO_LONG.maxLength || 250;

    // If alt text starts with a very specific string provided via props.
    const startsWithSpecificAlt = alt.match(altPlaceholderPattern)?.[0];

    // Decorative images.
    if (decorative || startsWithSpecificAlt) {
      const carouselSources = option.checks.IMAGE_DECORATIVE_CAROUSEL.sources;
      const carousel = carouselSources ? $el.closest(carouselSources) : '';
      if (carousel) {
        const numberOfSlides = carousel.querySelectorAll('img');
        const rule =
          numberOfSlides.length === 1
            ? option.checks.IMAGE_DECORATIVE
            : option.checks.IMAGE_DECORATIVE_CAROUSEL;
        const conditional =
          numberOfSlides.length === 1 ? 'IMAGE_DECORATIVE' : 'IMAGE_DECORATIVE_CAROUSEL';
        if (rule) {
          results.push({
            test: conditional,
            element: $el,
            type: rule.type || 'warning',
            content: Lang.sprintf(rule.content || conditional),
            dismiss: Utils.prepareDismissal(conditional + src),
            dismissAll: rule.dismissAll ? conditional : false,
            developer: rule.developer || false,
          });
        }
      } else if (link) {
        const rule =
          linkTextLength === 0
            ? option.checks.LINK_IMAGE_NO_ALT_TEXT
            : option.checks.LINK_IMAGE_TEXT;
        const conditional = linkTextLength === 0 ? 'LINK_IMAGE_NO_ALT_TEXT' : 'LINK_IMAGE_TEXT';
        if (rule) {
          results.push({
            test: conditional,
            element: $el,
            type: rule.type || (linkTextLength === 0 ? 'error' : 'good'),
            content: Lang.sprintf(rule.content || conditional),
            dismiss: Utils.prepareDismissal(`${conditional + src + linkTextLength}`),
            dismissAll: rule.dismissAll ? conditional : false,
            developer: rule.developer || false,
          });
        }
      } else if (figure) {
        const rule =
          figcaption && figcaptionText.length
            ? option.checks.IMAGE_FIGURE_DECORATIVE
            : option.checks.IMAGE_DECORATIVE;
        const conditional =
          figcaption && figcaptionText.length ? 'IMAGE_FIGURE_DECORATIVE' : 'IMAGE_DECORATIVE';
        if (rule) {
          results.push({
            test: conditional,
            element: $el,
            type: rule.type || 'warning',
            content: Lang.sprintf(rule.content || conditional),
            dismiss: Utils.prepareDismissal(`${conditional + src + figcaptionText}`),
            dismissAll: rule.dismissAll ? conditional : false,
            developer: rule.developer || false,
          });
        }
      } else if (option.checks.IMAGE_DECORATIVE) {
        results.push({
          test: 'IMAGE_DECORATIVE',
          element: $el,
          type: option.checks.IMAGE_DECORATIVE.type || 'warning',
          content: Lang.sprintf(option.checks.IMAGE_DECORATIVE.content || 'IMAGE_DECORATIVE'),
          dismiss: Utils.prepareDismissal(`DECIMAGE${src}`),
          dismissAll: option.checks.IMAGE_DECORATIVE.dismissAll ? 'IMAGE_DECORATIVE' : false,
          developer: option.checks.IMAGE_DECORATIVE.developer || false,
        });
      }
      return;
    }

    /* ********************** */
    /*  UNPRONOUNCEABLE ALT   */
    /* ********************** */
    const unpronounceable = link
      ? option.checks.LINK_ALT_UNPRONOUNCEABLE
      : option.checks.ALT_UNPRONOUNCEABLE;
    if (unpronounceable) {
      if (alt.replace(/"|'|\?|\.|-|\s+/g, '') === '' && linkTextLength === 0) {
        const conditional = link ? 'LINK_ALT_UNPRONOUNCEABLE' : 'ALT_UNPRONOUNCEABLE';
        results.push({
          test: conditional,
          element: $el,
          type: unpronounceable.type || 'error',
          content: Lang.sprintf(unpronounceable.content || conditional, altText),
          dismiss: Utils.prepareDismissal(`UNPRONOUNCEABLE${src}`),
          dismissAll: unpronounceable.dismissAll ? 'ALT_UNPRONOUNCEABLE' : false,
          developer: unpronounceable.developer || false,
        });
        return;
      }
    }

    /* ********************* */
    /*  ALT TEXT QUALITY     */
    /* ********************* */
    const error = containsAltTextStopWords(altText);

    // Potentially contains auto-generated placeholder text.
    const maybeBadAlt = link ? option.checks.LINK_ALT_MAYBE_BAD : option.checks.ALT_MAYBE_BAD;
    const isTooLongSingleWord = new RegExp(`^\\S{${maybeBadAlt.minLength || 15},}$`);
    const containsNonAlphaChar = /[^\p{L}\-,.!?]/u.test(alt);

    if (error[0] !== null) {
      // Has stop words.
      const rule = link ? option.checks.LINK_ALT_FILE_EXT : option.checks.ALT_FILE_EXT;
      const conditional = link ? 'LINK_ALT_FILE_EXT' : 'ALT_FILE_EXT';
      if (rule) {
        results.push({
          test: conditional,
          element: $el,
          type: rule.type || 'error',
          content: Lang.sprintf(rule.content || conditional, error[0], altText),
          dismiss: Utils.prepareDismissal(`${conditional + src + altText}`),
          dismissAll: rule.dismissAll ? conditional : false,
          developer: rule.developer || false,
        });
      }
    } else if (error[2] !== null) {
      // Placeholder words.
      const rule = link ? option.checks.LINK_PLACEHOLDER_ALT : option.checks.ALT_PLACEHOLDER;
      const conditional = link ? 'LINK_PLACEHOLDER_ALT' : 'ALT_PLACEHOLDER';
      if (rule) {
        results.push({
          test: conditional,
          element: $el,
          type: rule.type || 'error',
          content: Lang.sprintf(rule.content || conditional, altText),
          dismiss: Utils.prepareDismissal(`${conditional + src + altText}`),
          dismissAll: rule.dismissAll ? conditional : false,
          developer: rule.developer || false,
        });
      }
    } else if (error[1] !== null) {
      // Suspicious words.
      const rule = link ? option.checks.LINK_SUS_ALT : option.checks.SUS_ALT;
      const conditional = link ? 'LINK_SUS_ALT' : 'SUS_ALT';
      if (rule) {
        results.push({
          test: conditional,
          element: $el,
          type: rule.type || 'warning',
          content: Lang.sprintf(rule.content || conditional, error[1], altText),
          dismiss: Utils.prepareDismissal(`${conditional + src + altText}`),
          dismissAll: rule.dismissAll ? conditional : false,
          developer: rule.developer || false,
        });
      }
    } else if (maybeBadAlt && isTooLongSingleWord.test(alt) && containsNonAlphaChar) {
      // Alt text is a single word greater than 15 characters that is potentially auto-generated.
      const conditional = link ? 'LINK_ALT_MAYBE_BAD' : 'ALT_MAYBE_BAD';
      results.push({
        test: conditional,
        element: $el,
        type: maybeBadAlt.type || 'error',
        content: Lang.sprintf(maybeBadAlt.content || conditional, altText),
        dismiss: Utils.prepareDismissal(`${conditional + src + altText}`),
        dismissAll: maybeBadAlt.dismissAll ? conditional : false,
        developer: maybeBadAlt.developer || false,
      });
    } else if (link ? alt.length > maxAltCharactersLinks : alt.length > maxAltCharacters) {
      // Alt is too long.
      const rule = link ? option.checks.LINK_IMAGE_LONG_ALT : option.checks.IMAGE_ALT_TOO_LONG;
      const conditional = link ? 'LINK_IMAGE_LONG_ALT' : 'IMAGE_ALT_TOO_LONG';
      const truncated = Utils.truncateString(altText, 600);
      if (rule) {
        results.push({
          test: conditional,
          element: $el,
          type: rule.type || 'warning',
          content: Lang.sprintf(rule.content || conditional, alt.length, truncated),
          dismiss: Utils.prepareDismissal(`${conditional + src + altText}`),
          dismissAll: rule.dismissAll ? conditional : false,
          developer: rule.developer || false,
        });
      }
    } else if (link) {
      const rule =
        linkTextLength === 0 ? option.checks.LINK_IMAGE_ALT : option.checks.LINK_IMAGE_ALT_AND_TEXT;
      const conditional = linkTextLength === 0 ? 'LINK_IMAGE_ALT' : 'LINK_IMAGE_ALT_AND_TEXT';

      if (rule) {
        // Has both link text and alt text.
        const linkAccName = computeAccessibleName(link);
        const removeWhitespace = Utils.removeWhitespace(linkAccName);
        const sanitizedText = Utils.sanitizeHTML(removeWhitespace);

        const tooltip =
          linkTextLength === 0
            ? Lang.sprintf('LINK_IMAGE_ALT', altText)
            : `${Lang.sprintf('LINK_IMAGE_ALT_AND_TEXT', altText, sanitizedText)} ${Lang.sprintf('ACC_NAME_TIP')}`;

        results.push({
          test: conditional,
          element: $el,
          type: rule.type || 'warning',
          content: rule.content ? Lang.sprintf(rule.content, altText, sanitizedText) : tooltip,
          dismiss: Utils.prepareDismissal(`${conditional + src + altText}`),
          dismissAll: rule.dismissAll ? conditional : false,
          developer: rule.developer || false,
        });
      }
    } else if (figure) {
      // Figure element has same alt and caption text.
      const duplicate = !!figcaption && figcaptionText.toLowerCase() === altText.toLowerCase();
      if (duplicate) {
        if (option.checks.IMAGE_FIGURE_DUPLICATE_ALT) {
          results.push({
            test: 'IMAGE_FIGURE_DUPLICATE_ALT',
            element: $el,
            type: option.checks.IMAGE_FIGURE_DUPLICATE_ALT.type || 'warning',
            content: Lang.sprintf(
              option.checks.IMAGE_FIGURE_DUPLICATE_ALT.content || 'IMAGE_FIGURE_DUPLICATE_ALT',
              altText,
            ),
            dismiss: Utils.prepareDismissal(`FIGDUPLICATE${src}`),
            dismissAll: option.checks.IMAGE_FIGURE_DUPLICATE_ALT.dismissAll
              ? 'IMAGE_FIGURE_DUPLICATE_ALT'
              : false,
            developer: option.checks.IMAGE_FIGURE_DUPLICATE_ALT.developer || false,
          });
        }
      } else if (option.checks.IMAGE_PASS) {
        // Figure has alt text!
        results.push({
          test: 'IMAGE_PASS',
          element: $el,
          type: option.checks.IMAGE_PASS.type || 'good',
          content: Lang.sprintf(option.checks.IMAGE_PASS.content || 'IMAGE_PASS', altText),
          dismiss: Utils.prepareDismissal(`FIGIMGPASS${src + altText}`),
          dismissAll: option.checks.IMAGE_PASS.dismissAll ? 'IMAGE_PASS' : false,
          developer: option.checks.IMAGE_PASS.developer || false,
        });
      }
    } else if (option.checks.IMAGE_PASS) {
      if (!$el.closest('button, [role="button"]')) {
        // Image has alt text!
        results.push({
          test: 'IMAGE_PASS',
          element: $el,
          type: option.checks.IMAGE_PASS.type || 'good',
          content: Lang.sprintf(option.checks.IMAGE_PASS.content || 'IMAGE_PASS', altText),
          dismiss: Utils.prepareDismissal(`IMAGEPASS${src + altText}`),
          dismissAll: option.checks.IMAGE_PASS.dismissAll ? 'IMAGE_PASS' : false,
          developer: option.checks.IMAGE_PASS.developer || false,
        });
      }
    }

    /* ************************ */
    /*  DUPLICATE ALT & TITLE.  */
    /* ************************ */
    const titleAttr = $el.getAttribute('title');
    if (titleAttr?.toLowerCase() === alt.toLowerCase()) {
      if (option.checks.DUPLICATE_TITLE) {
        results.push({
          test: 'DUPLICATE_TITLE',
          element: $el,
          type: option.checks.DUPLICATE_TITLE.type || 'warning',
          content: Lang.sprintf(option.checks.DUPLICATE_TITLE.content || 'DUPLICATE_TITLE'),
          inline: true,
          dismiss: Utils.prepareDismissal(`ALTDUPLICATETITLE${altText}`),
          dismissAll: option.checks.DUPLICATE_TITLE.dismissAll ? 'DUPLICATE_TITLE' : false,
          developer: option.checks.DUPLICATE_TITLE.developer || false,
        });
      }
    }
  });
  return results;
}
