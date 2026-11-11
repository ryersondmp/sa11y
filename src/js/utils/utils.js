import find from './find';
import Lang from './lang';

/**
 * Checks if the document has finished loading, and if so, immediately calls the provided callback function. Otherwise, waits for the 'load' event to fire and then calls the callback function.
 * @param {function} callback The callback function to be called when the document finishes loading.
 */
export function documentLoadingCheck(callback) {
  if (document.readyState === 'complete') {
    callback();
  } else {
    window.addEventListener('load', callback);
  }
}

/**
 * Determine whether an element is visually hidden (e.g. .sr-only) based on computed properties.
 * @param {HTMLElement} element The element to check for.
 * @returns {boolean} Returns true if visually hidden based on properties.
 */
export function isScreenReaderOnly(element) {
  const style = getCachedStyle(element);

  // Modern technique: clip-path inset(50%).
  if (style.getPropertyValue('clip-path').startsWith('inset(50%)')) {
    return true;
  }

  // Legacy clipping.
  if (style.clip === 'rect(1px, 1px, 1px, 1px)' || style.clip === 'rect(0px, 0px, 0px, 0px)') {
    return true;
  }

  // Large text-indent offscreen.
  const indent = parseInt(style.textIndent, 10);
  if (!Number.isNaN(indent) && Math.abs(indent) > 5000) {
    return true;
  }

  // Tiny box offscreen.
  if (style.overflow === 'hidden' && parseFloat(style.width) < 2 && parseFloat(style.height) < 2) {
    return true;
  }

  // Absolute positioned far offscreen.
  if (
    style.position === 'absolute' &&
    ['left', 'right', 'top', 'bottom'].some((p) => Math.abs(parseInt(style[p], 10)) > 5000)
  ) {
    return true;
  }

  // Font size 1px or 0px.
  return parseFloat(style.fontSize) < 2;
}

/**
 * Checks if an element is hidden (display: none) based on its attributes and styles.
 * @param {HTMLElement} element The element to check for visibility.
 * @returns {boolean} 'true' if the element is hidden (display: none).
 */
export function isElementHidden(element) {
  if (element.hidden) return true;
  const styles = getCachedStyle(element);
  return (
    styles.getPropertyValue('display') === 'none' ||
    styles.getPropertyValue('visibility') === 'hidden'
  );
}

/**
 * Checks if an element is explicitly hidden from screen readers.
 * Safely handles whitespace and case variations.
 * @param {HTMLElement|Element} $el - The DOM element to evaluate.
 * @returns {boolean} True if aria-hidden is "true".
 */
export function isAriaHidden($el) {
  if (!$el || typeof $el.getAttribute !== 'function') return false;
  return $el.getAttribute('aria-hidden')?.trim().toLowerCase() === 'true';
}

/**
 * Checks whether an element or any of its ancestors has `aria-hidden="true"`.
 * @param {Element|null} element The element to check.
 * @returns {boolean} True if the element or an ancestor is hidden from assistive technology.
 */
export function hasAriaHiddenAncestor(element) {
  let current = element;
  while (current) {
    if (isAriaHidden(current)) return true;
    current = current.parentElement;
  }
  return false;
}

/**
 * Checks if an element's semantics have been neutralized.
 * Handles space-separated role lists (e.g., role="none presentation").
 * @param {HTMLElement|Element} $el - The DOM element to evaluate.
 * @returns {boolean} True if role includes "presentation" or "none".
 */
export function isPresentational($el) {
  if (!$el || typeof $el.getAttribute !== 'function') return false;
  const roleAttr = $el.getAttribute('role');
  if (!roleAttr) return false;
  return roleAttr
    .toLowerCase()
    .split(/\s+/)
    .some((role) => role === 'presentation' || role === 'none');
}

/**
 * Checks if an element is removed from sequential keyboard navigation.
 * Uses the native DOM property for faster, safer numerical evaluation.
 * @param {HTMLElement|Element} $el - The DOM element to evaluate.
 * @returns {boolean} True if tabindex is negative.
 */
export function isNegativeTabindex($el) {
  return $el?.hasAttribute('tabindex') && $el.tabIndex < 0;
}

/**
 * Determines if an element is properly neutralized for both AT and keyboard users.
 * Composes the individual utility functions for clean, reusable logic.
 * @param {HTMLElement|Element} $el - The DOM element to evaluate.
 * @returns {boolean} True if (role is presentation/none OR aria-hidden is true) AND tabindex is negative.
 */
export function isHiddenAndUnfocusable($el) {
  return (isPresentational($el) || isAriaHidden($el)) && isNegativeTabindex($el);
}

/**
 * Determines if an element is disabled natively or via ARIA.
 * @param {HTMLElement|Element} $el - The DOM element to evaluate.
 * @returns {boolean} True if the element has a disabled attribute/property or aria-disabled="true".
 */
export function isDisabled($el) {
  if (!$el || typeof $el.getAttribute !== 'function') return false;
  const isNativeDisabled = $el.hasAttribute('disabled') || $el.disabled === true;
  const isAriaDisabled = $el.getAttribute('aria-disabled')?.trim().toLowerCase() === 'true';
  return isNativeDisabled || isAriaDisabled;
}

/**
 * Checks if an element is invisible in layout.
 * @param {HTMLElement} element The element to check for visibility.
 * @returns {boolean} `true` if the element is visually hidden or hidden, `false` otherwise.
 */
export function isElementVisuallyHiddenOrHidden(element) {
  if (
    (element.offsetWidth === 0 && element.offsetHeight === 0) ||
    (element.clientHeight === 1 && element.clientWidth === 1)
  ) {
    return true;
  }
  return isElementHidden(element);
}

/**
 * Removes ALL punctuation and symbols and normalizes whitespace. Accounts for non-Latin characters:
 * combining marks (\p{M}) are kept, because in scripts such as Devanagari and Tamil they are part
 * of the word ("कि" and "के" must stay different).
 * @param {string} string - The input text to be sanitized.
 * @returns {string} The sanitized and trimmed string.
 */
export function stripAllSpecialCharacters(string) {
  if (typeof string !== 'string' && typeof string !== 'number') return '';
  return String(string)
    .replace(/[^\p{L}\p{M}\p{N}\s]/gu, '')
    .replace(/\s+/g, ' ')
    .trim();
}

/**
 * Lowercases a string for comparison against the localized word lists (ruleset stop words,
 * phrases and UI words). Also folds the differences that come from text being written in
 * capitals, so "ΜΕΝΟΥ" matches "μενού" and "İNDİR" / "TIKLA" match "indir" / "tıkla":
 * Greek accents are removed, as is the combining dot that toLowerCase() leaves after the
 * "i" of Turkish "İ", and dotless "ı" is folded to "i". Optional Arabic-script vowel marks
 * (harakat, shadda, tanwin, superscript alef) and tatweel are removed, so "تعرّف" matches
 * "تعرف". Other diacritics are kept. Apply it to both the list entry and the page text.
 * @param {string} string - The input text.
 * @returns {string} The folded, NFC-normalized string.
 */
// U+064B–U+0652 tanwin, harakat, shadda, sukun; U+0656–U+065F rarer vowel marks; U+0670
// superscript alef; U+0640 tatweel. U+0653–U+0655 (madda, hamza above/below) are left out:
// NFD splits أ إ آ ؤ ئ into a base letter plus one of those, and they are distinct letters.
const arabicOptionalMarksRegex = /[ً-ْٖ-ٰٟـ]/g;
export function foldForMatching(string) {
  if (typeof string !== 'string' && typeof string !== 'number') return '';
  return (
    String(string)
      .toLowerCase()
      .normalize('NFD')
      .replace(/(\p{Script=Greek})\p{M}+/gu, '$1')
      // "i" + U+0307 COMBINING DOT ABOVE (from lowercasing Turkish "İ"), or dotless "ı".
      .replace(/i\u0307|\u0131/g, 'i')
      .replace(arabicOptionalMarksRegex, '')
      .normalize('NFC')
  );
}

/**
 * Normalizes a string for an EXACT comparison against stop word lists: folds it (see
 * foldForMatching), removes punctuation and symbols, and collapses whitespace. Unlike
 * stripAllSpecialCharacters, combining marks are kept, because in scripts such as Tamil they
 * are part of the word. Apply it to both the list entries and the page text so that an entry
 * containing punctuation (e.g. French "d’informations") still matches.
 * @param {string} string - The input text.
 * @returns {string} The normalized string.
 */
export function normalizeStopWord(string) {
  return foldForMatching(string)
    .replace(/[^\p{L}\p{M}\p{N}\s]/gu, '')
    .replace(/\s+/g, ' ')
    .trim();
}

// One word segmenter per locale; creating one is relatively expensive.
const wordSegmenters = new Map();

/**
 * Returns a cached word Intl.Segmenter for a locale, or null where the API is unavailable.
 * Pass the ruleset language (Lang._('LANG_CODE')), the language of the word lists being
 * matched, so results do not depend on the visitor's browser locale. An invalid or missing tag
 * (e.g. the untranslated key "LANG_CODE") falls back to the browser default instead of throwing.
 * @param {string} [locale] - BCP 47 language tag.
 * @returns {Intl.Segmenter|null}
 */
export function getWordSegmenter(locale) {
  if (typeof Intl === 'undefined' || typeof Intl.Segmenter !== 'function') return null;
  const key = typeof locale === 'string' ? locale : '';
  let segmenter = wordSegmenters.get(key);
  if (!segmenter) {
    try {
      segmenter = new Intl.Segmenter(key || undefined, { granularity: 'word' });
    } catch {
      segmenter = new Intl.Segmenter(undefined, { granularity: 'word' });
    }
    wordSegmenters.set(key, segmenter);
  }
  return segmenter;
}

/**
 * Intl.Segmenter splits languages written without spaces, such as Chinese and Japanese.
 * The fallback only requires that no letter, mark or digit touches the word on either
 * side, so in those languages it misses rather than over-matches. The fallback avoids
 * lookbehind (Safari < 16.4) so it also works in browsers that predate Intl.Segmenter.
 * @param {string} text - The text to search.
 * @param {string} word - A single word, e.g. the localized "button".
 * @param {Intl.Segmenter|null} [segmenter] - Word segmenter to use; null forces the fallback.
 * @returns {boolean} True if the word appears on its own.
 */
export function containsWord(text, word, segmenter = getWordSegmenter(Lang._('LANG_CODE'))) {
  const haystack = foldForMatching(text);
  const needle = foldForMatching(word);
  if (!needle) return false;
  if (segmenter) {
    for (const { segment, isWordLike } of segmenter.segment(haystack)) {
      if (isWordLike && segment === needle) return true;
    }
    return false;
  }
  const escaped = needle.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
  return new RegExp(`(?:^|[^\\p{L}\\p{M}\\p{N}])${escaped}(?![\\p{L}\\p{M}\\p{N}])`, 'u').test(
    haystack,
  );
}

/**
 * Sanitize URLs. Adapted from braintree/sanitize-url (see sanitizeURL below).
 *
 * The `g` regexes below are shared module state. They are only used with String#replace and
 * String#match, which reset `lastIndex`; do not call .test() or .exec() on them, or results will
 * alternate between calls.
 */
// `i` is kept as a safeguard even though the scheme is lowercased before this test.
const invalidProtocolRegex = /^\W*(javascript|data|vbscript)/i;
// Numeric character references, decimal or hex, with or without the closing semicolon
// (the HTML parser decodes both forms inside attribute values).
const htmlEntitiesRegex = /&#(?:x([0-9a-f]+)|(\d+));?/gi;
const htmlCtrlEntityRegex = /&(newline|tab);/gi;
const ctrlCharactersRegex =
  // biome-ignore lint/suspicious/noControlCharactersInRegex: Matching control characters is the purpose.
  /[\u0000-\u001F\u007F-\u009F\u2000-\u200D\uFEFF]/g;
// Lazy, so the scheme ends at the FIRST colon: "https://host:8080/a:b" yields "https:".
const urlSchemeRegex = /^.+?(:|&colon;)/i;
const whitespaceEscapeCharsRegex = /(\\|%5[cC])((%(6[eE]|72|74))|[nrt])/g;
// Base64 raster image data URIs that may skip sanitizing. SVG is excluded because it can carry
// script. This is a MIME allowlist plus a check that the payload contains only base64
// characters (browsers ignore ASCII whitespace in it); it does not prove the bytes are a valid
// image. Anything else falls through to the checks in sanitizeURL and is rejected as data:.
const base64ImageRegex =
  /^data:image\/(?:png|gif|jpe?g|webp|avif|bmp|x-icon);base64,[a-z0-9+/=\t\n\f\r ]*$/i;
const relativeFirstCharacters = ['.', '/'];
const BLANK_URL = 'about:blank';

function isRelativeUrlWithoutProtocol(url) {
  return relativeFirstCharacters.indexOf(url[0]) > -1;
}

/**
 * Decodes one numeric character reference. Follows the HTML spec's handling of invalid values
 * (out-of-range values, surrogates and NUL become U+FFFD) instead of throwing
 * (String.fromCodePoint) or silently wrapping (String.fromCharCode). It is not a full
 * implementation: the spec's windows-1252 remapping of 0x80–0x9F is skipped, as those C1
 * controls are stripped by ctrlCharactersRegex anyway.
 * @param {string|undefined} hex - Hex digits, if the reference was &#x...;
 * @param {string|undefined} dec - Decimal digits, if the reference was &#...;
 * @returns {string} The decoded character.
 */
function decodeCharacterReference(hex, dec) {
  const codePoint = hex !== undefined ? Number.parseInt(hex, 16) : Number.parseInt(dec, 10);
  const isInvalid =
    !Number.isFinite(codePoint) ||
    codePoint === 0 ||
    codePoint > 0x10ffff ||
    (codePoint >= 0xd800 && codePoint <= 0xdfff);
  return isInvalid ? '\uFFFD' : String.fromCodePoint(codePoint);
}

function decodeHtmlCharacters(str) {
  const removedNullByte = str.replace(ctrlCharactersRegex, '');
  return removedNullByte.replace(htmlEntitiesRegex, (_match, hex, dec) =>
    decodeCharacterReference(hex, dec),
  );
}

function isValidUrl(url) {
  if (typeof URL.canParse === 'function') {
    return URL.canParse(url);
  }

  // Fallback for environments without URL.canParse support.
  try {
    const parsedUrl = new URL(url);
    return Boolean(parsedUrl);
  } catch {
    return false;
  }
}

const decodeURIs = (uri) => {
  try {
    return decodeURIComponent(uri);
  } catch {
    return uri;
  }
};

/**
 * Escapes HTML special characters in a string.
 * @param {string} string The string to escape.
 * @returns {string} The escaped string with HTML special characters replaced by their corresponding entities.
 */
export function escapeHTML(input) {
  if (typeof input !== 'string' && typeof input !== 'number') return '';
  const htmlEntities = {
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
    '"': '&quot;',
    "'": '&#039;',
    '`': '&#x60;',
  };
  return String(input).replace(/[&<>"'`]/g, (match) => htmlEntities[match]);
}

/**
 * Sanitizes a URL to prevent XSS and ensure valid formatting.
 * MIT License: Copyright (c) 2017 Braintree
 * @link https://github.com/braintree/sanitize-url
 * @param {string} url The URL to sanitize.
 * @returns {string} The safe URL, or about:blank if invalid.
 */
export function sanitizeURL(url) {
  if (!url || typeof url !== 'string') return BLANK_URL;

  const trimmedInput = url.trim();

  // Quick bypass for legitimate base64 image data URIs. Any other data: URI (text/html,
  // image/svg+xml...) goes through the checks below and is rejected.
  if (base64ImageRegex.test(trimmedInput)) return trimmedInput;

  let charsToDecode;
  let decodedUrl = decodeURIs(trimmedInput);
  do {
    decodedUrl = decodeHtmlCharacters(decodedUrl)
      .replace(htmlCtrlEntityRegex, '')
      .replace(ctrlCharactersRegex, '')
      .replace(whitespaceEscapeCharsRegex, '')
      .trim();
    decodedUrl = decodeURIs(decodedUrl);
    charsToDecode =
      decodedUrl.match(ctrlCharactersRegex) ||
      decodedUrl.match(htmlEntitiesRegex) ||
      decodedUrl.match(htmlCtrlEntityRegex) ||
      decodedUrl.match(whitespaceEscapeCharsRegex);
  } while (charsToDecode && charsToDecode.length > 0);

  const sanitizedUrl = decodedUrl;
  if (!sanitizedUrl) return BLANK_URL;
  if (isRelativeUrlWithoutProtocol(sanitizedUrl)) return sanitizedUrl;

  // Remove any leading whitespace before checking the URL scheme.
  const trimmedUrl = sanitizedUrl.trimStart();
  const urlSchemeParseResults = trimmedUrl.match(urlSchemeRegex);
  if (!urlSchemeParseResults) return sanitizedUrl;
  const urlScheme = urlSchemeParseResults[0].toLowerCase().trim();
  if (invalidProtocolRegex.test(urlScheme)) return BLANK_URL;
  const backSanitized = trimmedUrl.replace(/\\/g, '/');

  // Handle special cases for mailto: and custom deep-link protocols.
  if (urlScheme === 'mailto:' || urlScheme.includes('://')) return backSanitized;

  // For http and https URLs, perform additional validation.
  if (urlScheme === 'http:' || urlScheme === 'https:') {
    if (!isValidUrl(backSanitized)) return BLANK_URL;
    const url = new URL(backSanitized);
    url.protocol = url.protocol.toLowerCase();
    url.hostname = url.hostname.toLowerCase();
    return url.toString();
  }
  return backSanitized;
}

// Sanitize allow list.
const allowedTags = [
  'a',
  'abbr',
  'address',
  'article',
  'aside',
  'audio',
  'b',
  'bdo',
  'blockquote',
  'br',
  'button',
  'canvas',
  'cite',
  'code',
  'data',
  'dd',
  'del',
  'details',
  'dfn',
  'div',
  'dl',
  'dt',
  'em',
  'fieldset',
  'figcaption',
  'figure',
  'footer',
  'form',
  'h1',
  'h2',
  'h3',
  'h4',
  'h5',
  'h6',
  'header',
  'hr',
  'i',
  'iframe',
  'img',
  'input',
  'ins',
  'kbd',
  'label',
  'li',
  'main',
  'mark',
  'meter',
  'nav',
  'noscript',
  'ol',
  'output',
  'p',
  'picture',
  'pre',
  'progress',
  'q',
  'rp',
  'rt',
  's',
  'samp',
  'section',
  'select',
  'small',
  'source',
  'span',
  'strong',
  'sub',
  'summary',
  'sup',
  'svg',
  'table',
  'tbody',
  'td',
  'textarea',
  'tfoot',
  'th',
  'thead',
  'time',
  'tr',
  'track',
  'u',
  'ul',
  'var',
  'video',
  'wbr',
  'path',
];
const attrWhitelist = {
  a: ['href', 'title', 'target', 'rel', 'download'],
  img: ['src', 'alt', 'title', 'width', 'height', 'loading', 'srcset', 'sizes'],
  iframe: [
    'src',
    'width',
    'height',
    'title',
    'frameborder',
    'allowfullscreen',
    'loading',
    'sandbox',
  ],
  details: ['open'],
  ol: ['start', 'type', 'reversed'],
  li: ['value'],
  td: ['colspan', 'rowspan'],
  th: ['colspan', 'rowspan', 'scope'],
  global: ['class', 'id', 'role', 'lang', 'dir', 'name'],
  path: ['d', 'fill', 'fill-rule'],
};
/**
 * A lightweight method for sanitizes HTML strings.
 * @param {string} string - The raw HTML string to sanitize.
 * @returns {string} The sanitized HTML string.
 */
export function sanitizeHTML(string) {
  const parser = new DOMParser();
  const doc = parser.parseFromString(string, 'text/html');
  const allElements = doc.body.querySelectorAll('*');
  allElements.forEach((node) => {
    const tag = node.tagName.toLowerCase();
    if (!allowedTags.includes(tag)) {
      node.remove();
      return;
    }
    const allowedForThisTag = attrWhitelist[tag] || [];
    const globals = attrWhitelist.global;
    [...node.attributes].forEach(({ name, value }) => {
      const isAria = name.startsWith('aria-');
      const isAllowed = allowedForThisTag.includes(name) || globals.includes(name) || isAria;
      const isUrlAttr = ['src', 'href', 'srcset'].includes(name);
      if (!isAllowed) {
        node.removeAttribute(name);
      } else if (isUrlAttr) {
        const cleanURL = sanitizeURL(value);
        if (!cleanURL) {
          node.removeAttribute(name);
        } else {
          node.setAttribute(name, cleanURL);
        }
      }
    });
  });
  return doc.body.innerHTML;
}

const baseIgnores = 'noscript,script,style,audio,video,form,iframe';
/**
 * Creates a clone of an element while ignoring specified elements or elements matching a selector.
 * @param {Element} element The element to clone.
 * @param {string[]} [selectors=[]] Optional array of selectors to exclude.
 * @returns {Element|null} The cloned element or null if the root itself is ignored.
 */
export function fnIgnore(element, selectors = []) {
  const ignoreQuery = selectors.length ? `${baseIgnores},${selectors.join(',')}` : baseIgnores;

  // Safety check: if it's not an element, return a clone or null.
  if (!element || element.nodeType !== Node.ELEMENT_NODE) {
    return element ? element.cloneNode(true) : null;
  }

  function cloneTree(node, isRoot = false) {
    const type = node.nodeType;

    if (type === Node.ELEMENT_NODE) {
      // If a CHILD matches, skip it.
      if (node.matches(ignoreQuery) && !isRoot) {
        return null;
      }

      const clone = node.cloneNode(false);

      // If the root was an ignored tag, we return the empty shell.
      if (node.matches(ignoreQuery) && isRoot) {
        return clone;
      }

      let child = node.firstChild;
      while (child) {
        const clonedChild = cloneTree(child);
        if (clonedChild) clone.appendChild(clonedChild);
        child = child.nextSibling;
      }
      return clone;
    }

    if (type === Node.TEXT_NODE) return node.cloneNode(true);
    return null;
  }

  return cloneTree(element, true);
}

/**
 * Retrieves the text content of an HTML element and removes extra whitespaces and line breaks.
 * @param {HTMLElement} element The HTML element to retrieve the text content from.
 * @returns {string} The text content of the HTML element with extra whitespaces and line breaks removed.
 */
let gotText = new WeakMap();
export function getText(element) {
  if (gotText.has(element)) {
    return gotText.get(element);
  }
  const ignore = fnIgnore(element);
  // Line breaks render as spaces, so they must become spaces ("Click\nhere" is "Click here").
  const text = removeWhitespace(ignore.textContent);
  gotText.set(element, text);
  return text;
}

// Garbage collection.
export function resetGetText() {
  gotText = new WeakMap();
}

let styleCaches = {};
/**
 * Retrieves the computed style for a given DOM node and optional pseudo-element.
 * @param {Element|Node|null} node - The DOM element to evaluate.
 * @param {string|null} [pseudoElt=null] - Optional pseudo-element (e.g., ':before').
 * @returns {CSSStyleDeclaration|null} The computed styles.
 */
export const getCachedStyle = (node, pseudoElt = null) => {
  if (!node) return null;

  // Determine the cache key ('base' for standard styles).
  const cacheKey = pseudoElt || 'base';

  // Lazily create a WeakMap for this specific pseudo-element type if needed.
  if (!styleCaches[cacheKey]) {
    styleCaches[cacheKey] = new WeakMap();
  }

  // Fetch or compute the style.
  const targetCache = styleCaches[cacheKey];
  if (!targetCache.has(node)) {
    targetCache.set(node, getComputedStyle(node, pseudoElt));
  }

  return targetCache.get(node);
};

// Garbage collection.
export const resetStyleCache = () => {
  styleCaches = {};
};

let parentCache = new WeakMap();
/**
 * Get cached parent element matching selector.
 * Reduces DOM traversal by caching closest() results.
 * @param {Element} element - The element to search from.
 * @param {string} selector - CSS selector to match.
 * @returns {Element|null} The matching parent or null.
 */
export function getCachedClosest(element, selector) {
  // Note: `instanceof Element` is unavailable across frames.
  if (element?.nodeType !== 1) return null;

  // Validate selector.
  if (typeof selector !== 'string' || selector.trim() === '') return null;

  try {
    // Initialize the per-element cache if missing.
    if (!parentCache.has(element)) {
      parentCache.set(element, new Map());
    }

    const elementCache = parentCache.get(element);
    // Return cached result (including nulls, as they are valid results).
    if (elementCache.has(selector)) {
      return elementCache.get(selector);
    }

    // Execute and cache.
    const result = element.closest(selector);
    elementCache.set(selector, result);
    return result;
  } catch {
    return null;
  }
}

// Garbage collection.
export function resetParentCache() {
  parentCache = new WeakMap();
}

/**
 * Removes extra whitespaces and line breaks from a string.
 * @param {string} string The string.
 * @returns {string} String with line breaks and extra white space removed.
 */
export function removeWhitespace(string) {
  if (typeof string !== 'string' && typeof string !== 'number') return '';
  return String(string).replace(/\s+/g, ' ').trim();
}

/**
 * Removes non-printable control characters and icon-font glyphs (Private Use Area) from a string,
 * and collapses whitespace. Whitespace controls (tab, line feed, vertical tab, form feed, carriage
 * return) are left for removeWhitespace() to turn into spaces, so words are not joined together.
 * @param {string} string - The input string to clean.
 * @returns {string} The string with control characters removed.
 */
// biome-ignore lint/suspicious/noControlCharactersInRegex: Matching control characters is the purpose.
const junkCharactersRegex = /[\u0000-\u0008\u000E-\u001F\u007F-\u009F\uE000-\uF8FF]/g;
export function normalizeString(string) {
  if (typeof string !== 'string' && typeof string !== 'number') return '';
  return removeWhitespace(String(string).replace(junkCharactersRegex, ''));
}

/**
 * Truncate string.
 * @param {*} string The string to truncate.
 * @param {*} maxLength Desired max length of string.
 * @returns Truncated string.
 */
export function truncateString(string, maxLength) {
  if (typeof string !== 'string' && typeof string !== 'number') return '';
  const truncatedString = String(string).substring(0, maxLength).trimEnd();
  return string.length > maxLength ? `${truncatedString}...` : String(string);
}

/**
 * Debounces a callback function, ensuring it is only executed after a certain wait period
 * has passed since the last invocation.
 * @param {function} callback The callback function to debounce.
 * @param {number} wait The wait period in milliseconds before the callback function is executed.
 * @returns {function} The debounced function.
 * @link https://www.joshwcomeau.com/snippets/javascript/debounce/
 */
export function debounce(callback, wait) {
  let timeoutId = null;
  return (...args) => {
    window.clearTimeout(timeoutId);
    timeoutId = window.setTimeout(() => {
      callback(...args);
    }, wait);
  };
}

/**
 * Finds the visible parent of an element that matches a given CSS property and value.
 * @param {Element} element The element for which the visible parent needs to be found.
 * @param {string} property The CSS property to match against.
 * @param {string} value The value of the CSS property to match against.
 * @returns {Element|null} The visible parent element that matches the given property and value, or null if not found.
 */
export function findVisibleParent(element, property, value) {
  let $el = element;
  while ($el) {
    const style = getCachedStyle($el);
    const propValue = style.getPropertyValue(property);
    if (propValue === value) {
      return $el;
    }
    $el = $el.parentElement;
  }
  return null;
}

/**
 * Calculates the offset top of an element relative to the viewport.
 * @param {Element} element The element for which the offset top needs to be calculated.
 * @returns {Object} An object with a `top` property that represents the offset top of the element relative to the viewport.
 */
export function offsetTop(element) {
  const rect = element.getBoundingClientRect();
  const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
  return { top: rect.top + scrollTop };
}

/**
 * A utility object for handling storage operations using localStorage and sessionStorage.
 * @param  {String} key
 * @param  {string} value
 * @return {String} Return key.
 */
export const store = {
  getItem(key) {
    try {
      if (localStorage.getItem(key) === null) {
        return sessionStorage.getItem(key);
      }
      return localStorage.getItem(key);
    } catch {
      // Cookies totally disabled.
      return false;
    }
  },
  setItem(key, value) {
    try {
      localStorage.setItem(key, value);
    } catch {
      sessionStorage.setItem(key, value);
    }
    return true;
  },
  removeItem(key) {
    try {
      localStorage.removeItem(key);
    } catch {
      sessionStorage.removeItem(key);
    }
    return true;
  },
};

/**
 * Adds a pulsing border effect to an element for 2.5 seconds.
 * @param {Element} element The element to which the pulsing border effect needs to be added.
 */
export function addPulse(element) {
  const border = 'data-sa11y-pulse-border';
  element.setAttribute(border, '');
  setTimeout(() => element.removeAttribute(border), 2500);
}

/**
 * Gets the next sibling element that matches the given selector, or the next sibling element if no selector is provided.
 * @param {HTMLElement} element The DOM element whose next sibling to retrieve.
 * @param {string} selector The optional selector to filter the next siblings. If not provided, the next sibling element will be returned regardless of its type.
 * @returns {HTMLElement|string} The next sibling element that matches the given selector, or the next sibling element if no selector is provided. If no matching sibling is found, an empty string is returned.
 */
export function getNextSibling(element, selector) {
  let sibling = element.nextElementSibling;
  if (!selector) {
    return sibling;
  }
  while (sibling) {
    if (sibling.matches(selector)) {
      return sibling;
    }
    sibling = sibling.nextElementSibling;
  }
  return '';
}

/**
 * Generates a unique key for dismissing items. Letters and digits are kept in every script;
 * whitespace, punctuation and symbols are removed. (An ASCII-only filter would reduce all
 * Arabic, Cyrillic, CJK etc. text to an empty string, so unrelated issues would share a key.)
 * @param {string} string The string to be prepared for dismissal.
 * @returns {string} The truncated string with a maximum of 256 characters.
 */
export function prepareDismissal(string) {
  return String(string)
    .replace(/[^\p{L}\p{N}]/gu, '')
    .substring(0, 256);
}

/**
 * Generates a selector path for the given DOM element.
 * @param {Element} element The DOM element for which to generate the selector path.
 * @returns {string} The selector path as a string.
 * @link https://www.geeksforgeeks.org/how-to-create-a-function-generateselector-to-generate-css-selector-path-of-a-dom-element/
 * @link https://dev.to/aniket_chauhan/generate-a-css-selector-path-of-a-dom-element-4aim
 */
export function generateSelectorPath(element) {
  const path = [];
  let currentElement = element;
  while (currentElement) {
    let selector = currentElement.localName;
    // Ids and classes are escaped so that e.g. Tailwind's "md:flex" or "w-1/2", or an id that
    // starts with a digit, still produce a valid selector for querySelector().
    if (currentElement.id) {
      selector += `#${CSS.escape(currentElement.id)}`;
      path.unshift(selector);
      break;
    } else {
      const classAttr = currentElement.getAttribute ? currentElement.getAttribute('class') : null;
      const classNames = classAttr?.trim();
      if (classNames) {
        selector += `.${classNames.split(/\s+/).map(CSS.escape).join('.')}`;
      }
    }

    const parentElement = currentElement.parentNode;
    if (parentElement) {
      const siblings = parentElement.children;
      if (siblings.length > 1) {
        const index = Array.prototype.indexOf.call(siblings, currentElement) + 1;
        selector += `:nth-child(${index})`;
      }
      path.unshift(selector);
    } else {
      break;
    }
    currentElement = currentElement.parentNode.host || currentElement.parentNode;
  }
  return path.join(' > ');
}

/**
 * Traps focus within an element by looping focus back to the beginning or end
 * when the Tab key is pressed.
 * @param {Element} element The DOM element to trap focus within.
 * @author Hidde de Vries
 * @link https://hidde.blog/using-javascript-to-trap-focus-in-an-element/
 */
export function trapFocus(element) {
  const focusable = element.querySelectorAll(
    'a[href]:not([disabled]), button:not([disabled]), input[type="color"]',
  );
  const firstFocusable = focusable[0];
  const lastFocusable = focusable[focusable.length - 1];
  element.addEventListener('keydown', (e) => {
    const isTabPressed = e.key === 'Tab' || e.keyCode === 9;

    // "document.activeElement" does not work within ShadowDOM.
    const root = element.getRootNode();

    if (!isTabPressed) {
      return;
    }
    if (e.shiftKey) {
      if (root.activeElement === firstFocusable) {
        lastFocusable.focus();
        e.preventDefault();
      }
    } else if (root.activeElement === lastFocusable) {
      firstFocusable.focus();
      e.preventDefault();
    }
  });
}

/**
 * Finds all data-attributes specified in array, and removes them from the document.
 * @param {Array<string>} attributes The array of data-attributes to be reset.
 * @param {string} root The root element to search for elements (optional, defaults to 'document').
 * @returns {void}
 */
export function resetAttributes(attributes, root) {
  attributes.forEach((attr) => {
    const reset = find(`[${attr}]`, `${root}`);
    reset.forEach(($el) => {
      $el.removeAttribute(attr);
    });
  });
}

/**
 * Removes the specified elements from the document.
 * @param {string} root The root element to search for elements (optional, defaults to 'document').
 * @returns {void}
 */
export function remove(elements, root) {
  const allElements = find(`${elements}`, `${root}`);
  allElements.forEach(($el) => {
    $el?.parentNode?.removeChild($el);
  });
}

/**
 * Checks if a scrollable area within a container element is scrollable or not, and applies appropriate CSS classes and attributes. Make sure to add aria-label manually.
 * @param {Element} scrollArea The scrollable area element to check.
 * @param {Element} container The container element that wraps the scrollable area.
 * @param {Attribute} ariaLabel Give scroll area an accessible name and region landmark.
 */
export function isScrollable(scrollArea, container, ariaLabel) {
  setTimeout(() => {
    if (scrollArea.scrollHeight > container.clientHeight) {
      container.classList.add('scrollable');
      scrollArea.setAttribute('tabindex', '0');
      if (ariaLabel) {
        scrollArea.setAttribute('aria-label', ariaLabel);
        scrollArea.setAttribute('role', 'region');
      }
    } else {
      container.classList.remove('scrollable');
    }
  }, 50);
}

// Spec "valid non-negative integer" and "valid floating-point number" (descriptor values).
const srcsetIntegerRegex = /^\d+$/;
const srcsetFloatRegex = /^-?(?:\d+(?:\.\d+)?|\.\d+)(?:[eE][-+]?\d+)?$/;

/**
 * Parses one candidate's descriptors following the HTML spec: at most one of "w" or "x", an
 * optional "h" only alongside "w", no duplicates, no unknown descriptors, and no zero widths or
 * heights. Any error drops the whole candidate, as browsers do. One deliberate deviation: the
 * spec's parser accepts "0x" (only authoring rules forbid it); it is rejected here so that a
 * zero density is never picked as the smallest candidate.
 * @param {string} descriptors - Whitespace-separated descriptors, already trimmed.
 * @returns {{width: number|null, density: number}|null} Null if the candidate is invalid.
 */
function parseSrcsetDescriptors(descriptors) {
  let width = null;
  let density = null;
  let height = null;
  for (const descriptor of descriptors.split(/\s+/)) {
    if (!descriptor) continue;
    const value = descriptor.slice(0, -1);
    const type = descriptor.slice(-1);
    if (type === 'w' && srcsetIntegerRegex.test(value)) {
      if (width !== null || density !== null) return null;
      width = Number(value);
      if (width === 0) return null;
    } else if (type === 'x' && srcsetFloatRegex.test(value)) {
      if (width !== null || density !== null || height !== null) return null;
      density = Number(value);
      if (!Number.isFinite(density) || density <= 0) return null;
    } else if (type === 'h' && srcsetIntegerRegex.test(value)) {
      if (height !== null || density !== null) return null;
      height = Number(value);
      if (height === 0) return null;
    } else {
      return null;
    }
  }
  if (height !== null && width === null) return null;
  return { width, density: density ?? 1 };
}

/**
 * Parses a srcset into candidates, following the HTML spec's tokenizing rules: a URL is a run
 * of non-whitespace characters, so commas INSIDE a URL (as in CDN transforms like
 * "w_300,h_200") are kept; trailing commas end the candidate; otherwise the descriptors run to
 * the next comma that is not inside parentheses. Candidates with invalid descriptors are
 * dropped (see parseSrcsetDescriptors).
 * @link https://html.spec.whatwg.org/multipage/images.html#parse-a-srcset-attribute
 * @param {string|null|undefined} srcset - The attribute value.
 * @returns {{url: string, width: number|null, density: number}[]} Candidates; density defaults to 1.
 */
export function parseSrcset(srcset) {
  if (typeof srcset !== 'string') return [];
  const candidates = [];
  const length = srcset.length;
  let position = 0;
  while (position < length) {
    // Skip whitespace and stray commas between candidates.
    while (position < length && /[\s,]/.test(srcset[position])) position += 1;
    if (position >= length) break;

    // URL: run of non-whitespace characters.
    const urlStart = position;
    while (position < length && !/\s/.test(srcset[position])) position += 1;
    let url = srcset.slice(urlStart, position);

    // Descriptors: only present if the URL did not end the candidate with a comma.
    let descriptors = '';
    if (url.endsWith(',')) {
      url = url.replace(/,+$/, '');
    } else {
      const descriptorStart = position;
      let inParens = false;
      while (position < length) {
        const char = srcset[position];
        if (char === '(') inParens = true;
        else if (char === ')') inParens = false;
        else if (char === ',' && !inParens) break;
        position += 1;
      }
      descriptors = srcset.slice(descriptorStart, position).trim();
      position += 1; // Step over the comma.
    }
    if (!url) continue;

    const parsed = parseSrcsetDescriptors(descriptors);
    if (parsed) candidates.push({ url, ...parsed });
  }
  return candidates;
}

/**
 * Picks the smallest candidate from a srcset, since the result is only used for a thumbnail.
 * Width descriptors take precedence over density (a srcset should not mix them).
 * @param {string|null|undefined} srcset - The attribute value.
 * @returns {string|undefined} The URL of the smallest candidate.
 */
function getSmallestSrc(srcset) {
  const candidates = parseSrcset(srcset);
  if (!candidates.length) return undefined;
  const withWidth = candidates.filter((c) => c.width !== null);
  const pool = withWidth.length ? withWidth : candidates;
  const size = (c) => (withWidth.length ? c.width : c.density);
  return pool.reduce((smallest, c) => (size(c) < size(smallest) ? c : smallest)).url;
}

/**
 * Get the best image source for a thumbnail, considering data-src, srcset, <picture> sources and
 * src. From a srcset, the smallest candidate is used.
 * @param {HTMLElement} element - The image element to extract the source from.
 * @returns {string|null} - The best available source URL, resolved to an absolute URL.
 */
export function getBestImageSource(element) {
  // Return absolute URLs. Necessary for HTML export. Unparseable URLs yield null so the next
  // source is tried instead of throwing.
  const resolveUrl = (src) => {
    if (!src) return null;
    try {
      return new URL(src, window.location.href).href;
    } catch {
      return null;
    }
  };

  // Lazy-loading attributes first: until the image loads, srcset/src are often placeholders.
  // data-src holds a single URL; data-srcset is a srcset.
  const pictureSrcset = () =>
    getCachedClosest(element, 'picture')?.querySelector('source[srcset]')?.getAttribute('srcset');
  return (
    resolveUrl(element.getAttribute('data-src')?.trim()) ||
    resolveUrl(getSmallestSrc(element.getAttribute('data-srcset'))) ||
    resolveUrl(getSmallestSrc(element.getAttribute('srcset'))) ||
    resolveUrl(getSmallestSrc(pictureSrcset())) ||
    resolveUrl(element.getAttribute('src'))
  );
}

/**
 * Converts a Blob object to a Base64-encoded string.
 * @param {Blob} blob - The Blob object to convert.
 * @returns {Promise<string>} A promise that resolves to a Base64 string representation of the Blob.
 */
export const blobToBase64 = (blob) =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onloadend = () => {
      let { result } = reader;
      // Ensure the correct MIME type if it's missing or wrong. Necessary for uncommon image formats.
      const detectedMime = blob?.type?.startsWith('image/') ? blob.type : 'image/png'; // Default fallback
      if (result.startsWith('data:application/octet-stream')) {
        result = result.replace('data:application/octet-stream', `data:${detectedMime}`);
      }
      resolve(result);
    };
    reader.onerror = reject;
    reader.readAsDataURL(blob);
  });

/**
 * Generate a DOM node preview for an issue.
 * @param {Object} issueObject The issue object.
 * @param {boolean} convertBase64 Optional. Convert image to Base64.
 * @returns {HTMLElement|Promise<HTMLElement>} Returns a DOM Node or a Promise resolving to one.
 */
export function generateElementPreview(issueObject, convertBase64 = false) {
  const issueElement = issueObject.element;

  const createCodeFallback = () => {
    const pre = document.createElement('pre');
    const code = document.createElement('code');
    code.textContent = truncateString(issueObject.htmlPath, 150);
    pre.appendChild(code);
    return pre;
  };

  const tagHandlers = {
    A: (element) => {
      const text = getText(element);
      if (text.length > 1 && element.href && !element.hasAttribute('role')) {
        const anchor = document.createElement('a');
        anchor.href = sanitizeURL(element.href);
        anchor.textContent = truncateString(text, 150);
        return anchor;
      }
      return createCodeFallback();
    },
    IMG: (element) => {
      const src = getBestImageSource(element);
      if (!src) return createCodeFallback();

      const containerAnchor = getCachedClosest(element, 'a[href]');

      const buildImgElement = (url) => {
        const img = document.createElement('img');
        // Every data:image/ URI is allowed here, including SVG, which sanitizeURL rejects:
        // <img> renders SVG in secure static mode (no script, no external loads), and SVG
        // thumbnails converted to base64 for the HTML export would otherwise break.
        img.src = url.startsWith('data:image/') ? url : sanitizeURL(url);
        if (element.alt) img.alt = element.alt;

        if (containerAnchor) {
          const a = document.createElement('a');
          a.href = sanitizeURL(containerAnchor.href);
          a.rel = 'noopener noreferrer';
          a.appendChild(img);
          return a;
        }
        return img;
      };

      if (!convertBase64) return buildImgElement(src);

      return (async () => {
        try {
          if (new URL(src, window.location.origin).origin !== window.location.origin)
            throw new Error();
          const response = await fetch(src);
          const blob = await response.blob();
          const b64 = await blobToBase64(blob);
          return buildImgElement(b64);
        } catch {
          return buildImgElement(src);
        }
      })();
    },
  };

  const handler = tagHandlers[issueElement.tagName];
  return handler ? handler(issueElement) : createCodeFallback();
}

/**
 * Emoji, plus the code points that only exist inside emoji sequences and render nothing on their
 * own: skin-tone modifiers, ZWJ (U+200D), text/emoji variation selectors (U+FE0E/FE0F) and the
 * combining keycap (U+20E3). Without them, "❤️" leaves a lone U+FE0F behind.
 */
const emojiRegex =
  /[\p{Emoji_Presentation}\p{Extended_Pictographic}\p{Emoji_Modifier}]|\u200D|\uFE0E|\uFE0F|\u20E3/gu;

/**
 * Check if an element's visible text is included in the accessible name.
 * To minimize false positives: iterate through all child nodes of the element, checking for visibility.
 * @param {element} $el The element to test.
 * @param {string} accName The computed accessible name of the element.
 * @param {Array} exclusions Array of exclusions.
 * @param {Array} linkIgnoreStrings Array of string exclusions.
 * @returns {boolean}
 */
export function isVisibleTextInAccName($el, accName, exclusions = [], linkIgnoreStrings) {
  let text = '';

  // Prep exclusions.
  const excludeSelector = exclusions?.length ? exclusions.join(',') : '';
  const ignoreStrings = Array.isArray(linkIgnoreStrings) ? linkIgnoreStrings : null;
  const stripIgnored = (value = '') =>
    ignoreStrings ? ignoreStrings.reduce((result, str) => result.replace(str, ''), value) : value;

  // Iterate though each child node.
  $el.childNodes.forEach((node) => {
    if (node.nodeType === Node.TEXT_NODE) {
      text += stripIgnored(node.textContent);
    }

    if (node.nodeType !== Node.ELEMENT_NODE) {
      return;
    }

    // Exclusions based on matched selectors.
    if (excludeSelector && node.matches(excludeSelector)) {
      return;
    }

    // Only return text content if it's not hidden.
    if (!isElementVisuallyHiddenOrHidden(node)) {
      text += stripIgnored(getText(node));
    }
  });

  // Ignore emojis, including the invisible parts of emoji sequences.
  let visibleText = text.replace(emojiRegex, '');

  // Final visible text.
  visibleText = removeWhitespace(visibleText).toLowerCase();

  // If visible text is just an x character, ignore. (Already lowercased, so no `i` flag.)
  if (/^[x×✕✖✗✘]$/.test(visibleText)) {
    return false;
  }

  // Check if visible text is included in accessible name.
  return visibleText.length !== 0 && !accName.toLowerCase().includes(visibleText);
}

/**
 * Standardize the href attribute of a link by removing any trailing slashes and stripping the protocol (http, https) and 'www.' prefix. Used to minimize false positives for link check module.
 * @param {HTMLElement} $el - The element from which to retrieve the href attribute.
 * @returns {string} - The standardized href.
 */
export function standardizeHref($el) {
  let href = $el.getAttribute('href');
  href = removeWhitespace(href).toLowerCase();

  // Remove trailing slash if it exists.
  if (href.endsWith('/')) {
    href = href.slice(0, -1);
  }

  // Remove protocol and www., without affecting subdomains.
  href = href.replace(/^https?:\/\/(www\.)?/, '');

  // Remove common file extensions at the end.
  href = href.replace(/\.(html|php|htm|asp|aspx)$/i, '');

  // TODO: Proposed, on hold. The result is also the fallback dismiss key in link-text.js
  // (QA_PDF, QA_DOCUMENT, QA_IN_PAGE_LINK and the PUA link check), which Editoria11y syncs
  // server-side, so changing it re-shows those dismissals. Corrected values:
  //   href.replace(/^(?:https?:)?\/\/(?:www\.)?/, '')       // also strip protocol-relative "//www."
  //   href.replace(/\.(?:html?|php|aspx?)(?=[?#]|$)/, '')   // also strip before "?query" / "#hash"
  // What changes: "//www.example.com/a" → "example.com/a"; "about.html#team" → "about#team";
  // "page.php?id=1" → "page?id=1". Links that differ only in these ways then compare as the same
  // destination, and their dismiss keys change. The `i` flag is redundant (already lowercased).

  return href;
}

/**
 * Roving tabindex menu for page outline.
 * Thanks to Srijan for this snippet!
 * @param {HTMLElement} container - Parent element (e.g., ul, div).
 * @param {HTMLElement[]} children - Focusable child elements inside container.
 */
export function initRovingTabindex(container, children) {
  let current = 0;
  const handleKeyDown = (e) => {
    if (!['ArrowUp', 'ArrowDown', 'Space'].includes(e.code)) {
      return;
    }
    if (e.code === 'Space') {
      children[current].click();
      e.preventDefault();
      return;
    }
    const selected = children[current];
    selected.setAttribute('tabindex', -1);
    let next;
    if (e.code === 'ArrowDown') {
      next = current + 1;
      if (current === children.length - 1) {
        next = 0;
      }
    } else if (e.code === 'ArrowUp') {
      next = current - 1;
      if (current === 0) {
        next = children.length - 1;
      }
    }
    children[next].setAttribute('tabindex', 0);
    children[next].focus();
    current = next;
    e.preventDefault();
  };

  container.addEventListener('focus', () => {
    if (children.length > 0) {
      container.setAttribute('tabindex', -1);
      children[current].setAttribute('tabindex', 0);
      children[current].focus();
    }
    container.addEventListener('keydown', handleKeyDown);
  });

  container.addEventListener('blur', () => {
    container.removeEventListener('keydown', handleKeyDown);
  });
}

/**
 * Detects if the browser supports CSS Anchor Positioning.
 * @link https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_anchor_positioning
 */
export function supportsAnchorPositioning() {
  return CSS.supports('anchor-name: --sa11y') && CSS.supports('position-anchor: --sa11y');
}

/**
 * Generates a Regex pattern from an array OR a comma-separated string. Safely escapes all special characters.
 * Arrays may mix strings and RegExp objects: strings are escaped literals (anchored to the start when
 * matchStart is true); RegExp entries are used as authored, with their own anchors, for patterns a literal
 * prefix cannot express (e.g. a CMS placeholder whose variable part comes first in some translations).
 * A single RegExp is treated like a one-entry array, so it matches the same way it would inside one.
 *
 * Flags: the result is always case-insensitive (`i`). Of the RegExp entries' own flags, only `u` is
 * carried over (it upgrades the whole pattern). `g` and `y` are dropped on purpose, because their
 * lastIndex state would make repeated tests flaky. `m` and `s` are not supported: they are dropped
 * with a console warning, because they would change the meaning of the other entries.
 * @param {(string|RegExp)[]|string|RegExp} input - Array (e.g. ['(External)', /^Image \d+$/]), comma-separated string (e.g. "(External), [draft]"), or a single RegExp.
 * @param {boolean} [matchStart=false] - If true, anchors the string entries to the start of the tested text.
 * @returns {RegExp|null} The compiled Regex object, or null if input is empty/invalid.
 */
export function generateRegexString(input, matchStart = false) {
  if (!input) return null;

  // Normalize input.
  let patterns = [];
  if (input instanceof RegExp) {
    patterns = [input];
  } else if (Array.isArray(input)) {
    patterns = input;
  } else if (typeof input === 'string') {
    patterns = input.split(',').map((s) => s.trim());
  } else {
    return null;
  }

  // Filter out empty entries to prevent matching 'everything' (empty regex issue).
  const literals = patterns.filter((p) => typeof p === 'string' && p.length > 0);
  const regexes = patterns.filter((p) => p instanceof RegExp && p.source !== '(?:)');
  if (literals.length === 0 && regexes.length === 0) return null;

  // Helper to escape special regex characters.
  const escapeRegExp = (string) => {
    return string.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
  };

  // Build the pattern string.
  const parts = [];
  if (literals.length) {
    const joinedPatterns = literals.map(escapeRegExp).join('|');
    // If matchStart is true, wrap in ^(?: ... ) to anchor the literal group to the start.
    parts.push(matchStart ? `^(?:${joinedPatterns})` : `(?:${joinedPatterns})`);
  }
  regexes.forEach((regex) => {
    if (regex.multiline || regex.dotAll) {
      console.warn(
        `Sa11y: the "m" and "s" flags are not supported when combining patterns; ignoring them on /${regex.source}/${regex.flags}.`,
      );
    }
    parts.push(`(?:${regex.source})`);
  });
  const finalPattern = parts.join('|');

  // Compile final case-insensitive regex. A `u` entry may rely on \p{...} or
  // code-point semantics, so it upgrades the whole pattern; a non-`u` entry
  // that is invalid in unicode mode then fails to compile, which is reported
  // rather than allowed to abort the caller's initialization.
  const flags = regexes.some((regex) => regex.unicode) ? 'iu' : 'i';
  try {
    return new RegExp(finalPattern, flags);
  } catch (error) {
    console.warn('Sa11y: could not combine patterns into one RegExp.', input, error);
    return null;
  }
}

/**
 * Removes Unicode bidirectional formatting characters (LRM, RLM, ALM, embeddings, overrides, isolates).
 * Translators and CMSes insert these around placeholders in right-to-left strings; they are invisible,
 * so comparisons against configured text should ignore them. ZWJ/ZWNJ are kept: they are orthographic
 * (e.g. Persian) and change the word.
 * @param {string} text - Text to clean.
 * @returns {string} The text without bidi control characters.
 */
export function stripBidiControls(text) {
  return typeof text === 'string'
    ? text.replace(/[\u061C\u200E\u200F\u202A-\u202E\u2066-\u2069]/g, '')
    : text;
}

/**
 * Generates a SHA-256 hex digest from a pepper + message combination, used for dismiss keys within localstorage. Yoinked from Editoria11y!
 * @async
 * @param {string} pepper - A secret or application-specific salt.
 * @param {string} message - The message or identifier to hash.
 * @returns {Promise<string>} A lowercase hexadecimal SHA-256 digest.
 */
export async function dismissDigest(pepper, message) {
  const msgUint8 = new TextEncoder().encode(pepper + message);
  const hashBuffer = await window.crypto.subtle.digest('SHA-256', msgUint8);
  if (Uint8Array.prototype.toHex) {
    return new Uint8Array(hashBuffer).toHex();
  }
  const hashArray = Array.from(new Uint8Array(hashBuffer));
  return hashArray.map((b) => b.toString(16).padStart(2, '0')).join('');
}

let langCache;
/**
 * Validates BCP 47 language code using Intl API with safe handling.
 * @param {string} code
 * @returns {{valid: boolean, suggest?: string}}
 */
export function validateLang(code, displayLangCode) {
  if (typeof code !== 'string') return { valid: false };
  const norm = code.trim().replace(/_/g, '-');
  if (!langCache && typeof Intl !== 'undefined') {
    try {
      langCache = new Intl.DisplayNames([displayLangCode], { type: 'language', fallback: 'none' });
    } catch {}
  }

  if (langCache) {
    // Safe helper to catch RangeErrors from invalid structures (e.g., "123")
    const check = (val) => {
      try {
        return langCache.of(val);
      } catch {
        return false;
      }
    };
    if (check(code)) return { valid: true };
    if (check(norm)) return { valid: false, suggest: norm };
    return { valid: false };
  }

  // Regex fallback for pre-2021 browsers.
  return { valid: /^[a-z]{2,3}(-[a-z]{4})?(-[a-z]{2,4})?$/i.test(norm) };
}
