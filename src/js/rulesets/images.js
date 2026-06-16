import { computeAccessibleName, computeAriaLabel } from '../utils/computeAccessibleName';
import Constants from '../utils/constants';
import Elements from '../utils/elements';
import Lang from '../utils/lang';
import * as Utils from '../utils/utils';
import { State } from '../core/state';
import { pushResult } from '../utils/pushResult';

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

  // 3) Suspicious alt words checking the first two and the last word.
  let wordsToCheck = [];
  // Check if the modern Segmenter API is supported in this environment.
  if (typeof Intl !== 'undefined' && Intl.Segmenter) {
    const segmenter = new Intl.Segmenter(undefined, { granularity: 'word' });
    const allWords = [...segmenter.segment(altLowerCase)]
      .filter((segment) => segment.isWordLike)
      .map((segment) => segment.segment);
    // We want to check the first two words, and the very last word in the string.
    wordsToCheck = [...allWords.slice(0, 2), ...allWords.slice(-1)];
  } else {
    // Fallback for older browsers that do not support Segmenter API.
    const altOnlyLetters = Utils.removeWhitespace(altLowerCase.replace(/[^\p{L}\s]/gu, ''));
    const allWords = altOnlyLetters.split(/\s+/).filter(Boolean);
    wordsToCheck = [...allWords.slice(0, 2), ...allWords.slice(-1)];
  }
  for (const word of Constants.Global.susAltWords) {
    if (wordsToCheck.includes(word)) {
      hit[1] = word;
      break;
    }
  }

  // 4) Catch placeholder alt text, e.g. "placeholder", "hero image 1"
  if (
    Constants.Global.placeholderAltSet.has(altLowerCase) ||
    Constants.Global.placeholderAltSet.has(altOnlyLetters)
  ) {
    hit[2] = alt;
  }

  // 5) Extra placeholder stopwords (near the start of alt)
  if (Constants.Global.extraPlaceholderStopWords.length) {
    for (const word of Constants.Global.extraPlaceholderStopWords) {
      const index = altLowerCase.indexOf(word);
      if (index > -1 && index < 6) {
        hit[2] = word;
        break;
      }
    }
  }
  return hit;
};

export default function checkImages() {
  Elements.Found.Images.forEach(($el) => {
    const alt =
      computeAriaLabel($el) === 'noAria'
        ? ($el.getAttribute('alt') ?? $el.getAttribute('title'))
        : computeAriaLabel($el);

    // Ignore tracking pixels without explicit aria-hidden or nullified alt.
    if ($el.height < 2 && $el.width < 2 && (Utils.isElementHidden($el) || alt === '')) return;

    /* If selectors passed via prop, it will treat that image as an unlinked image. */
    const link = Utils.getCachedClosest(
      $el,
      State.option.imageWithinLightbox
        ? `a[href]:not(${State.option.imageWithinLightbox})`
        : 'a[href]',
    );

    // Explicitly hidden.
    if (Utils.isHiddenAndUnfocusable(link)) return;

    // Image's source for key.
    const srcAttr = $el.getAttribute('src');
    const src = srcAttr ? srcAttr.split('?')[0] : $el.getAttribute('srcset');

    // Process link text exclusions.
    const linkText = link
      ? Utils.fnIgnore(link, Constants.Exclusions.LinkSpan).textContent.replace(
          Constants.Global.linkIgnoreStringPattern,
          '',
        )
      : '';
    const linkTextLength = Utils.removeWhitespace(linkText).length;

    // Push to results array.
    const logResult = (params) =>
      pushResult({
        element: $el,
        type: params.type || 'error',
        dismiss: params.dismiss || src,
        ...params,
      });

    let test;
    let key;
    let type;

    // Missing or effectively empty alt text.
    if (alt === null) {
      if (link) {
        if (linkTextLength > 0 && (Utils.isPresentational($el) || Utils.isAriaHidden($el))) return;
        test = linkTextLength === 0 ? 'MISSING_ALT_LINK' : 'MISSING_ALT_LINK_HAS_TEXT';
        key = src + linkTextLength;
      } else {
        test = 'MISSING_ALT';
        key = src;
      }
    } else if (alt === '') {
      const hasAria = $el.getAttribute('aria-label') || $el.getAttribute('aria-labelledby');
      if (hasAria) {
        test = 'MISSING_ALT';
        key = hasAria + src;
      }
    }
    if (test && State.option.checks[test]) {
      logResult({ test: test, dismiss: key });
      return;
    }

    // Continue if alt is presenting.
    const altText = Utils.removeWhitespace(alt);
    const figure = Utils.getCachedClosest($el, 'figure');
    const figcaption = figure?.querySelector('figcaption');
    const figcaptionText = figcaption ? Utils.getText(figcaption) : '';

    // Decorative images.
    let decorative = alt === '';
    if (!decorative && State.option.altPlaceholder.length) {
      decorative = !!alt.match(Constants.Global.altPlaceholderPattern);
    }
    if (decorative) {
      if (Utils.getCachedClosest($el, `button, [role='button']`)) return;
      const carouselSources = State.option.checks.IMAGE_DECORATIVE_CAROUSEL?.sources;
      const carousel = carouselSources ? Utils.getCachedClosest($el, carouselSources) : null;
      if (carousel) {
        test =
          carousel.querySelectorAll('img').length === 1
            ? 'IMAGE_DECORATIVE'
            : 'IMAGE_DECORATIVE_CAROUSEL';
        type = 'warning';
      } else if (link) {
        if (link.getAttribute('aria-label') || link.getAttribute('aria-labelledby')) return;
        test = linkTextLength === 0 ? 'LINK_IMAGE_NO_ALT_TEXT' : 'LINK_IMAGE_TEXT';
        type = linkTextLength === 0 ? 'error' : 'good';
        key = src + linkTextLength;
      } else if (figure && figcaptionText.length) {
        test = 'IMAGE_FIGURE_DECORATIVE';
        type = 'warning';
        key = src + figcaptionText;
      } else {
        test = 'IMAGE_DECORATIVE';
        type = 'warning';
      }

      if (test) {
        if (State.option.checks[test]) {
          logResult({ test: test, type: type, dismiss: key || src });
          return;
        } else {
          // If the decorative check is disabled, bypass remaining text quality rules
          // and jump straight to the GOOD pass annotation.
          if (
            !Utils.getCachedClosest($el, 'button, [role="button"]') &&
            !Constants.Global.linkIgnoreStringPattern?.test(alt)
          ) {
            logResult({ test: 'IMAGE_PASS', type: 'good', args: [altText], dismiss: src + alt });
          }
          return;
        }
      }
    }

    // Unpronounceable alt text.
    const unpTest = link ? 'LINK_ALT_UNPRONOUNCEABLE' : 'ALT_UNPRONOUNCEABLE';
    if (State.option.checks[unpTest]) {
      if (!Constants.Global.unpronounceablePattern.test(alt) && linkTextLength === 0) {
        logResult({
          test: unpTest,
          args: [altText],
        });
        return;
      }
    }

    // Alt text quality: checking for stop words, suspicious alts, placeholders.
    const error = containsAltTextStopWords(altText);
    const qualityChecks = [
      {
        hit: error[0],
        test: link ? 'LINK_ALT_FILE_EXT' : 'ALT_FILE_EXT',
        type: 'error',
        args: [error[0], altText],
      },
      {
        hit: error[2],
        test: link ? 'LINK_PLACEHOLDER_ALT' : 'ALT_PLACEHOLDER',
        type: 'error',
        args: [altText],
      },
      {
        hit: error[1],
        test: link ? 'LINK_SUS_ALT' : 'SUS_ALT',
        type: 'warning',
        args: [error[1], altText],
      },
    ];
    for (const check of qualityChecks) {
      if (check.hit !== null && State.option.checks[check.test] !== false) {
        logResult({
          test: check.test,
          type: check.type,
          args: check.args,
          dismiss: src + alt,
        });
        return;
      }
    }

    // Check for automatically generated bad alt text or filenames.
    const badAltTest = link ? 'LINK_ALT_MAYBE_BAD' : 'ALT_MAYBE_BAD';
    if (State.option.checks[badAltTest]) {
      const minLength = State.option.checks[badAltTest]?.minLength || 15;
      const isTooLongSingleWord = new RegExp(`^\\S{${minLength},}$`);
      const containsNonAlphaChar = /[^\p{L}\p{M}\-,.!? «»—]/u.test(altText);
      const isBadFilename = new RegExp(`^(?=[^_-]*([_-][^_-]*){3,})\\S{${minLength},}$`).test(
        altText,
      );
      const containsCJK =
        /[\p{Script=Han}\p{Script=Hiragana}\p{Script=Katakana}\p{Script=Hangul}]/u.test(altText);
      if (
        isBadFilename ||
        (!containsCJK && isTooLongSingleWord.test(alt) && containsNonAlphaChar)
      ) {
        logResult({
          test: badAltTest,
          args: [altText],
          dismiss: src + alt,
        });
        return;
      }
    }

    // Warning check for potentially bad alt text (lower confidence).
    const warningTest = link ? 'LINK_ALT_MAYBE_BAD_WARNING' : 'ALT_MAYBE_BAD_WARNING';
    if (State.option.checks[warningTest]) {
      const wordCount = altText.trim().split(/\s+/).length;
      const delimiterCount = (altText.match(/[_-]/g) || []).length;
      const hasTooMuchNoise =
        /^(?:\s*\d){5,}\s*$/.test(altText) || (delimiterCount >= 3 && wordCount <= 2);
      if (hasTooMuchNoise) {
        logResult({
          test: warningTest,
          type: 'warning',
          content: badAltTest, // We re-use this key for the tooltip.
          args: [altText],
          dismiss: `WARNING${src + alt}`,
        });
        return;
      }
    }

    // Alt text is too long.
    const tooLongTest = link ? 'LINK_IMAGE_LONG_ALT' : 'IMAGE_ALT_TOO_LONG';
    if (State.option.checks[tooLongTest]) {
      const maxAltChars = State.option.checks[tooLongTest]?.maxLength || 250;
      if (alt.length > maxAltChars) {
        logResult({
          test: tooLongTest,
          type: 'warning',
          args: [alt.length, altText],
          dismiss: src + alt,
        });
        return;
      }
    }

    // Has alt text and accompanying text.
    if (link && !Constants.Global.linkIgnoreStringPattern?.test(alt)) {
      const latTestName = linkTextLength === 0 ? 'LINK_IMAGE_ALT' : 'LINK_IMAGE_ALT_AND_TEXT';
      const latRule = State.option.checks[latTestName];
      if (latRule) {
        const linkAccName = computeAccessibleName(link, Constants.Exclusions.LinkSpan);
        const accName = Utils.removeWhitespace(
          linkAccName.replace(Constants.Global.linkIgnoreStringPattern, ''),
        );
        const tooltip = Lang.sprintf(
          linkTextLength === 0
            ? Lang._('LINK_IMAGE_ALT')
            : Lang._('LINK_IMAGE_ALT_AND_TEXT') + Lang._('ACC_NAME_TIP'),
          altText,
          accName,
        );
        logResult({
          test: latTestName,
          type: 'warning',
          args: [altText, accName],
          content: latRule.content ? Lang.sprintf(latRule.content, altText, accName) : tooltip,
          dismiss: src + alt,
        });
        return;
      }
    }

    // Figure image has duplicate alt and caption text.
    if (State.option.checks.IMAGE_FIGURE_DUPLICATE_ALT) {
      if (figure && figcaption && figcaptionText.toLowerCase() === alt.toLowerCase()) {
        logResult({
          test: 'IMAGE_FIGURE_DUPLICATE_ALT',
          type: 'warning',
          args: [altText],
        });
        return;
      }
    }

    // Duplicate title and alt attribute.
    const duplicateTitleTest = State.option.checks.DUPLICATE_TITLE;
    if (duplicateTitleTest) {
      const getVal = (attr) => $el.getAttribute(attr)?.trim().toLowerCase();
      if ($el.hasAttribute('title') && getVal('title') === getVal('alt')) {
        logResult({
          test: 'DUPLICATE_TITLE',
          type: 'warning',
          content: duplicateTitleTest.content
            ? Lang.sprintf(duplicateTitleTest.content, altText)
            : Lang.sprintf(`${Lang._('DUPLICATE_TITLE')}<hr>${Lang._('IMAGE_PASS')}`, altText),
          args: [altText],
          inline: true,
          dismiss: alt,
        });
        return;
      }
    }

    // Passes.
    if (!Utils.getCachedClosest($el, 'button, [role="button"]')) {
      if (Constants.Global.linkIgnoreStringPattern?.test(alt)) return;
      logResult({
        test: 'IMAGE_PASS',
        type: 'good',
        args: [altText],
        dismiss: src + alt,
      });
    }
  });
  return;
}
