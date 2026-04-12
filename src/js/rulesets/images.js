import { computeAccessibleName, computeAriaLabel } from '../utils/computeAccessibleName';
import Constants from '../utils/constants';
import Elements from '../utils/elements';
import Lang from '../utils/lang';
import * as Utils from '../utils/utils';
import { State } from '../core/state';

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

export default function checkImages() {
  // Generate suspicious alt stop words list.
  const susAltWords = State.option.susAltStopWords
    ? State.option.susAltStopWords
        .split(',')
        .map((word) => word.trim().toLowerCase())
        .filter(Boolean)
    : Lang._('SUS_ALT_STOPWORDS');

  // Generate placeholder stop words set.
  const placeholderAltSet = new Set(Lang._('PLACEHOLDER_ALT_STOPWORDS'));

  // Generate placeholder stop words that are that the START of an alt string.
  const altPlaceholderPattern = Utils.generateRegexString(State.option.altPlaceholder, true);
  const linkIgnoreStringPattern = Utils.generateRegexString(State.option.linkIgnoreStrings);

  // Generate supplied placeholder stop words.
  const extraPlaceholderStopWords = State.option.extraPlaceholderStopWords
    .split(',')
    .map((word) => word.trim().toLowerCase())
    .filter(Boolean);

  // Utility function to process alt text for stop words.
  const containsAltTextStopWords = (alt) => {
    const altLowerCase = Utils.removeWhitespace(alt).toLowerCase();
    const altOnlyLetters = Utils.removeWhitespace(altLowerCase.replace(/[^\p{L}\s]/gu, ''));
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
    if (placeholderAltSet.has(altLowerCase) || placeholderAltSet.has(altOnlyLetters)) {
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
      computeAriaLabel($el) === 'noAria'
        ? ($el.getAttribute('alt') ?? $el.getAttribute('title'))
        : computeAriaLabel($el);
    const ariaHidden = $el?.getAttribute('aria-hidden') === 'true';
    const presentationRole = $el?.getAttribute('role') === 'presentation';
    const noneRole = $el.getAttribute('role') === 'none';

    // Ignore tracking pixels without explicit aria-hidden or nullified alt.
    if ($el.height < 2 && $el.width < 2 && (Utils.isElementHidden($el) || alt === '')) {
      return;
    }

    /* If selectors passed via prop, it will treat that image as an unlinked image. */
    const link = Utils.getCachedClosest(
      $el,
      State.option.imageWithinLightbox
        ? `a[href]:not(${State.option.imageWithinLightbox})`
        : 'a[href]',
    );

    // Image's source for key.
    const src = $el.getAttribute('src')
      ? $el.getAttribute('src').split('?')[0]
      : $el.getAttribute('srcset');

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
      if (State.option.checks.HIDDEN_FOCUSABLE && !unfocusable) {
        State.results.push({
          test: 'HIDDEN_FOCUSABLE',
          element: $el,
          type: State.option.checks.HIDDEN_FOCUSABLE.type || 'error',
          content: Lang.sprintf(State.option.checks.HIDDEN_FOCUSABLE.content || 'HIDDEN_FOCUSABLE'),
          dismiss: Utils.prepareDismissal(`HIDDEN_FOCUSABLE ${src}`),
          dismissAll: State.option.checks.HIDDEN_FOCUSABLE.dismissAll
            ? 'LINK_HIDDEN_FOCUSABLE'
            : false,
          developer: State.option.checks.HIDDEN_FOCUSABLE.developer || true,
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
          linkTextLength > 0 && (ariaHidden || presentationRole || noneRole);
        if (!hasAriaHiddenOrPresentationRole) {
          const rule =
            linkTextLength === 0
              ? State.option.checks.MISSING_ALT_LINK
              : State.option.checks.MISSING_ALT_LINK_HAS_TEXT;
          const conditional =
            linkTextLength === 0 ? 'MISSING_ALT_LINK' : 'MISSING_ALT_LINK_HAS_TEXT';
          if (rule) {
            State.results.push({
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
      } else if (State.option.checks.MISSING_ALT) {
        // General failure message if image is missing alt.
        State.results.push({
          test: 'MISSING_ALT',
          element: $el,
          type: State.option.checks.MISSING_ALT.type || 'error',
          content: Lang.sprintf(State.option.checks.MISSING_ALT.content || 'MISSING_ALT'),
          dismiss: Utils.prepareDismissal(`MISSING_ALT ${src}`),
          dismissAll: State.option.checks.MISSING_ALT.dismissAll ? 'MISSING_ALT' : false,
          developer: State.option.checks.MISSING_ALT.developer || false,
        });
      }
      return;
    }

    /** *************** */
    /*  HAS ALT TEXT    */
    /* **************** */
    const altText = Utils.removeWhitespace(alt);
    const hasAria = $el.getAttribute('aria-label') || $el.getAttribute('aria-labelledby');

    // If aria-label or aria-labelledby returns empty or invalid.
    if (State.option.checks.MISSING_ALT) {
      if (hasAria && alt === '') {
        State.results.push({
          test: 'MISSING_ALT',
          element: $el,
          type: State.option.checks.MISSING_ALT.type || 'error',
          content: Lang.sprintf(State.option.checks.MISSING_ALT.content || 'MISSING_ALT'),
          dismiss: Utils.prepareDismissal(`MISSING_ALT ${hasAria + src}`),
          dismissAll: State.option.checks.MISSING_ALT.dismissAll ? 'MISSING_ALT' : false,
          developer: State.option.checks.MISSING_ALT.developer || false,
        });
        return;
      }
    }

    /* ************** */
    /*  DECORATIVE    */
    /* ************** */
    let decorative = alt === '';

    // Figure elements.
    const figure = Utils.getCachedClosest($el, 'figure');
    const figcaption = figure?.querySelector('figcaption');
    const figcaptionText = figcaption ? Utils.getText(figcaption) : '';

    // Maximum alt text length
    const maxAltCharactersLinks = State.option.checks.LINK_IMAGE_LONG_ALT.maxLength || 250;
    const maxAltCharacters = State.option.checks.IMAGE_ALT_TOO_LONG.maxLength || 250;

    // If alt text starts with a very specific string provided via props.
    if (!decorative && State.option.altPlaceholder.length) {
      decorative = alt.match(altPlaceholderPattern)?.[0];
    }

    // Decorative images.
    if (decorative) {
      const carouselSources = State.option.checks.IMAGE_DECORATIVE_CAROUSEL.sources;
      const carousel = carouselSources ? Utils.getCachedClosest($el, carouselSources) : '';
      if (carousel) {
        const numberOfSlides = carousel.querySelectorAll('img');
        const rule =
          numberOfSlides.length === 1
            ? State.option.checks.IMAGE_DECORATIVE
            : State.option.checks.IMAGE_DECORATIVE_CAROUSEL;
        const conditional =
          numberOfSlides.length === 1 ? 'IMAGE_DECORATIVE' : 'IMAGE_DECORATIVE_CAROUSEL';
        if (rule) {
          State.results.push({
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
            ? State.option.checks.LINK_IMAGE_NO_ALT_TEXT
            : State.option.checks.LINK_IMAGE_TEXT;
        const conditional = linkTextLength === 0 ? 'LINK_IMAGE_NO_ALT_TEXT' : 'LINK_IMAGE_TEXT';
        if (rule) {
          State.results.push({
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
            ? State.option.checks.IMAGE_FIGURE_DECORATIVE
            : State.option.checks.IMAGE_DECORATIVE;
        const conditional =
          figcaption && figcaptionText.length ? 'IMAGE_FIGURE_DECORATIVE' : 'IMAGE_DECORATIVE';
        if (rule) {
          State.results.push({
            test: conditional,
            element: $el,
            type: rule.type || 'warning',
            content: Lang.sprintf(rule.content || conditional),
            dismiss: Utils.prepareDismissal(`${conditional + src + figcaptionText}`),
            dismissAll: rule.dismissAll ? conditional : false,
            developer: rule.developer || false,
          });
        }
      } else if (State.option.checks.IMAGE_DECORATIVE) {
        State.results.push({
          test: 'IMAGE_DECORATIVE',
          element: $el,
          type: State.option.checks.IMAGE_DECORATIVE.type || 'warning',
          content: Lang.sprintf(State.option.checks.IMAGE_DECORATIVE.content || 'IMAGE_DECORATIVE'),
          dismiss: Utils.prepareDismissal(`IMAGE_DECORATIVE ${src}`),
          dismissAll: State.option.checks.IMAGE_DECORATIVE.dismissAll ? 'IMAGE_DECORATIVE' : false,
          developer: State.option.checks.IMAGE_DECORATIVE.developer || false,
        });
      }
      return;
    }

    /* ********************** */
    /*  UNPRONOUNCEABLE ALT   */
    /* ********************** */
    const unpronounceable = link
      ? State.option.checks.LINK_ALT_UNPRONOUNCEABLE
      : State.option.checks.ALT_UNPRONOUNCEABLE;
    if (unpronounceable) {
      if (alt.replace(/"|'|\?|\.|-|\s+/g, '') === '' && linkTextLength === 0) {
        const conditional = link ? 'LINK_ALT_UNPRONOUNCEABLE' : 'ALT_UNPRONOUNCEABLE';
        State.results.push({
          test: conditional,
          element: $el,
          type: unpronounceable.type || 'error',
          content: Lang.sprintf(unpronounceable.content || conditional, altText),
          args: [altText],
          dismiss: Utils.prepareDismissal(`${conditional + src}`),
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
    const maybeBadAlt = link
      ? State.option.checks.LINK_ALT_MAYBE_BAD
      : State.option.checks.ALT_MAYBE_BAD;
    const isTooLongSingleWord = new RegExp(`^\\S{${maybeBadAlt.minLength || 15},}$`);
    const containsNonAlphaChar = /[^\p{L}\-,.!? ]/u.test(altText);

    // No spaces AND at least 15 chars AND at least 3 dashes/underscores
    const isBadFilename = new RegExp(
      `^(?=[^_-]*([_-][^_-]*){3,})\\S{${maybeBadAlt.minLength || 15},}$`,
    ).test(altText);

    // Maybe bad alt... but not high confidence.
    const hasTooMuchNoise =
      /^(?:\s*\d){5,}\s*$/.test(altText) || // Is a number longer than 5 digits.
      (altText.match(/[_-]/g) || []).length >= 3; // Contains more than 3 delimiters (- or _)

    if (error[0] !== null) {
      // Has stop words.
      const rule = link ? State.option.checks.LINK_ALT_FILE_EXT : State.option.checks.ALT_FILE_EXT;
      const conditional = link ? 'LINK_ALT_FILE_EXT' : 'ALT_FILE_EXT';
      if (rule) {
        State.results.push({
          test: conditional,
          element: $el,
          type: rule.type || 'error',
          content: Lang.sprintf(rule.content || conditional, error[0], altText),
          args: [error[0], altText],
          dismiss: Utils.prepareDismissal(`${conditional + src + alt}`),
          dismissAll: rule.dismissAll ? conditional : false,
          developer: rule.developer || false,
        });
      }
    } else if (error[2] !== null) {
      // Placeholder words.
      const rule = link
        ? State.option.checks.LINK_PLACEHOLDER_ALT
        : State.option.checks.ALT_PLACEHOLDER;
      const conditional = link ? 'LINK_PLACEHOLDER_ALT' : 'ALT_PLACEHOLDER';
      if (rule) {
        State.results.push({
          test: conditional,
          element: $el,
          type: rule.type || 'error',
          content: Lang.sprintf(rule.content || conditional, altText),
          args: [altText],
          dismiss: Utils.prepareDismissal(`${conditional + src + alt}`),
          dismissAll: rule.dismissAll ? conditional : false,
          developer: rule.developer || false,
        });
      }
    } else if (error[1] !== null) {
      // Suspicious words.
      const rule = link ? State.option.checks.LINK_SUS_ALT : State.option.checks.SUS_ALT;
      const conditional = link ? 'LINK_SUS_ALT' : 'SUS_ALT';
      if (rule) {
        State.results.push({
          test: conditional,
          element: $el,
          type: rule.type || 'warning',
          content: Lang.sprintf(rule.content || conditional, error[1], altText),
          args: [error[1], altText],
          dismiss: Utils.prepareDismissal(`${conditional + src + alt}`),
          dismissAll: rule.dismissAll ? conditional : false,
          developer: rule.developer || false,
        });
      }
    } else if (
      isBadFilename ||
      (maybeBadAlt && isTooLongSingleWord.test(alt) && containsNonAlphaChar)
    ) {
      // Alt text is a single word greater than 15 characters that is potentially auto-generated.
      const rule = link
        ? State.option.checks.LINK_ALT_MAYBE_BAD
        : State.option.checks.ALT_MAYBE_BAD;
      const conditional = link ? 'LINK_ALT_MAYBE_BAD' : 'ALT_MAYBE_BAD';
      if (rule) {
        State.results.push({
          test: conditional,
          element: $el,
          type: rule.type || 'error',
          content: Lang.sprintf(rule.content || conditional, altText),
          args: [altText],
          dismiss: Utils.prepareDismissal(`${conditional + src + alt}`),
          dismissAll: rule.dismissAll ? conditional : false,
          developer: rule.developer || false,
        });
      }
    } else if (hasTooMuchNoise) {
      const conditional = link ? 'LINK_ALT_MAYBE_BAD' : 'ALT_MAYBE_BAD';
      const rule = link
        ? State.option.checks.LINK_ALT_MAYBE_BAD_WARNING
        : State.option.checks.ALT_MAYBE_BAD_WARNING;
      if (rule) {
        State.results.push({
          test: link ? 'LINK_ALT_MAYBE_BAD_WARNING' : 'ALT_MAYBE_BAD_WARNING',
          element: $el,
          type: rule.type || 'warning',
          content: Lang.sprintf(rule.content || conditional, altText),
          args: [altText],
          dismiss: Utils.prepareDismissal(`${conditional}WARNING${src + alt} `),
          dismissAll: rule.dismissAll ? conditional : false,
          developer: rule.developer || false,
        });
      }
    } else if (link ? alt.length > maxAltCharactersLinks : alt.length > maxAltCharacters) {
      // Alt is too long.
      const rule = link
        ? State.option.checks.LINK_IMAGE_LONG_ALT
        : State.option.checks.IMAGE_ALT_TOO_LONG;
      const conditional = link ? 'LINK_IMAGE_LONG_ALT' : 'IMAGE_ALT_TOO_LONG';
      if (rule) {
        State.results.push({
          test: conditional,
          element: $el,
          type: rule.type || 'warning',
          content: Lang.sprintf(rule.content || conditional, alt.length, altText),
          args: [alt.length, altText],
          dismiss: Utils.prepareDismissal(`${conditional + src + alt}`),
          dismissAll: rule.dismissAll ? conditional : false,
          developer: rule.developer || false,
        });
      }
    } else if (link) {
      const rule =
        linkTextLength === 0
          ? State.option.checks.LINK_IMAGE_ALT
          : State.option.checks.LINK_IMAGE_ALT_AND_TEXT;
      const conditional = linkTextLength === 0 ? 'LINK_IMAGE_ALT' : 'LINK_IMAGE_ALT_AND_TEXT';

      if (rule) {
        // Has both link text and alt text.
        const linkAccName = computeAccessibleName(link);
        const accName = Utils.removeWhitespace(linkAccName);

        const tooltip = Lang.sprintf(
          linkTextLength === 0
            ? Lang._('LINK_IMAGE_ALT')
            : Lang._('LINK_IMAGE_ALT_AND_TEXT') + Lang._('ACC_NAME_TIP'),
          altText,
          accName,
        );

        State.results.push({
          test: conditional,
          element: $el,
          type: rule.type || 'warning',
          content: rule.content ? Lang.sprintf(rule.content, altText, accName) : tooltip,
          args: [altText, accName],
          dismiss: Utils.prepareDismissal(`${conditional + src + alt}`),
          dismissAll: rule.dismissAll ? conditional : false,
          developer: rule.developer || false,
        });
      }
    } else if (figure) {
      // Figure element has same alt and caption text.
      const duplicate = !!figcaption && figcaptionText.toLowerCase() === alt.toLowerCase();
      if (duplicate) {
        if (State.option.checks.IMAGE_FIGURE_DUPLICATE_ALT) {
          State.results.push({
            test: 'IMAGE_FIGURE_DUPLICATE_ALT',
            element: $el,
            type: State.option.checks.IMAGE_FIGURE_DUPLICATE_ALT.type || 'warning',
            content: Lang.sprintf(
              State.option.checks.IMAGE_FIGURE_DUPLICATE_ALT.content ||
                'IMAGE_FIGURE_DUPLICATE_ALT',
              altText,
            ),
            args: [altText],
            dismiss: Utils.prepareDismissal(`IMAGE_FIGURE_DUPLICATE_ALT ${src}`),
            dismissAll: State.option.checks.IMAGE_FIGURE_DUPLICATE_ALT.dismissAll
              ? 'IMAGE_FIGURE_DUPLICATE_ALT'
              : false,
            developer: State.option.checks.IMAGE_FIGURE_DUPLICATE_ALT.developer || false,
          });
        }
      } else if (State.option.checks.IMAGE_PASS) {
        // Figure has alt text!
        State.results.push({
          test: 'IMAGE_PASS',
          element: $el,
          type: State.option.checks.IMAGE_PASS.type || 'good',
          content: Lang.sprintf(State.option.checks.IMAGE_PASS.content || 'IMAGE_PASS', altText),
          args: [altText],
          dismiss: Utils.prepareDismissal(`IMAGE_PASS FIGURE ${src + alt}`),
          dismissAll: State.option.checks.IMAGE_PASS.dismissAll ? 'IMAGE_PASS' : false,
          developer: State.option.checks.IMAGE_PASS.developer || false,
        });
      }
    } else if (State.option.checks.IMAGE_PASS) {
      const button = Utils.getCachedClosest($el, 'button, [role="button"]');
      if (!button) {
        // Image has alt text!
        State.results.push({
          test: 'IMAGE_PASS',
          element: $el,
          type: State.option.checks.IMAGE_PASS.type || 'good',
          content: Lang.sprintf(State.option.checks.IMAGE_PASS.content || 'IMAGE_PASS', altText),
          args: [altText],
          dismiss: Utils.prepareDismissal(`IMAGE_PASS ${src + alt}`),
          dismissAll: State.option.checks.IMAGE_PASS.dismissAll ? 'IMAGE_PASS' : false,
          developer: State.option.checks.IMAGE_PASS.developer || false,
        });
      }
    }

    /* ************************ */
    /*  DUPLICATE ALT & TITLE.  */
    /* ************************ */
    const titleAttr = $el.getAttribute('title');
    if (
      $el.getAttribute('alt') &&
      $el.getAttribute('alt')?.toLowerCase() === titleAttr?.toLowerCase()
    ) {
      if (State.option.checks.DUPLICATE_TITLE) {
        State.results.push({
          test: 'DUPLICATE_TITLE',
          element: $el,
          type: State.option.checks.DUPLICATE_TITLE.type || 'warning',
          content: Lang.sprintf(State.option.checks.DUPLICATE_TITLE.content || 'DUPLICATE_TITLE'),
          inline: true,
          dismiss: Utils.prepareDismissal(`DUPLICATE_TITLE ${alt}`),
          dismissAll: State.option.checks.DUPLICATE_TITLE.dismissAll ? 'DUPLICATE_TITLE' : false,
          developer: State.option.checks.DUPLICATE_TITLE.developer || false,
        });
      }
    }
  });
}
