/** biome-ignore-all lint/correctness/noUndeclaredVariables: new browser api */
import * as Utils from '../utils/utils';
import Lang from '../utils/lang';
import Elements from '../utils/elements';
import { State } from '../core/state';


let detectorPromise = null;
/**
 * Returns a singleton promise for the browser's LanguageDetector.
 * Resolves to `null` if the API is unsupported or initialization fails.
 * * @async
 * @returns {Promise<LanguageDetector|null>}
 */
export function getLanguageDetector() {
  if (detectorPromise) return detectorPromise;
  detectorPromise = (async () => {
    try {
      if (!('LanguageDetector' in globalThis)) return null;
      return await globalThis.LanguageDetector.create();
    } catch {
      console.error('Sa11y: Language detection not supported in this browser.');
      return null;
    }
  })();
  return detectorPromise;
}

// Get the reader-friendly language label, e.g. "English"
const getLanguageLabel = (lang) => {
  try {
    return new Intl.DisplayNames(navigator.language, {
      type: 'language',
    }).of(lang.split('-')[0]);
  } catch {
    return lang;
  }
};

// Identify primary language code.
const primary = (lang) => String(lang).toLowerCase().split('-')[0];

// FIFO cache for language detection. We cache up to 100 pages.
const STORAGE_KEY = 'sa11y-lang-detection';
const getStorageKey = Utils.store.getItem(STORAGE_KEY);
const MAX_CACHE_SIZE = 200;

// We're looking for significant changes for text before running this expensive check.
const getCacheKey = (declared, url, textLength) => {
  return `${declared}|${url}|${Math.floor(textLength / 100) * 100}`;
};

// Get local storage value.
const getCache = () => {
  try {
    return getStorageKey ? JSON.parse(getStorageKey) : [];
  } catch (e) {
    console.error('Sa11y: Error loading cache', e);
    return [];
  }
};

// Save minimal, but key info to cache.
const setCache = (key, test, data) => {
  if (!State.option.langOfPartsCache) return;
  try {
    const cache = getCache().filter((item) => item.key !== key);
    cache.push({ key, test, data });
    while (cache.length > MAX_CACHE_SIZE) cache.shift();
    Utils.store.setItem(STORAGE_KEY, JSON.stringify(cache));
  } catch (e) {
    console.error('Sa11y: Error saving cache.', e);
  }
};

export default async function checkPageLanguage() {
  // Hard return if neither page language checks are enabled or if feature not supported.
  if (!State.option.checks.PAGE_LANG_CONFIDENCE || !State.option.checks.LANG_OF_PARTS) return;
  if (!(await getLanguageDetector())) return;

  // Remove storage key if caching is turned off via prop.
  if (!State.option.langOfPartsCache && getStorageKey) Utils.store.removeItem(STORAGE_KEY);

  // Get the declared page language.
  const declared = Elements.Found.Language;
  if (!declared) return;

  // Leverage existing DOM query for readability given it's an expensive check.
  const text = (Elements.Found.pageText || []).join().slice(0, 10000);
  if (text.length < 100) return;

  // Generate a unique cache key so we're not running this function frequently.
  const cacheKey = getCacheKey(declared, window.location.href, text.length);

  // The displayed (cached) result.
  const cached = getCache().find((item) => item.key === cacheKey);
  if (cached) {
    if (cached.test) {
      State.results.push({
        test: cached.test,
        type: State.option.checks[cached.test].type || 'warning',
        content: Lang.sprintf(State.option.checks[cached.test].content
          || [cached.test], ...cached.data),
        dismiss: Utils.prepareDismissal(cached.test),
        developer: State.option.checks[cached.test].developer ?? false,
        cached: true,
      });
    }
    return;
  }

  // Run language detection using built-in AI.
  const detector = await getLanguageDetector();
  const detected = await detector.detect(text);

  // Nothing detected.
  if (!detected?.length) {
    setCache(cacheKey, null, null);
    return;
  }

  // Identify the primary and secondary page languages.
  const detectedLang = detected[0];
  const detectedLangCode = detectedLang.detectedLanguage;
  const languageLabel = getLanguageLabel(declared) || declared;
  const likelyLanguage = getLanguageLabel(detectedLangCode);

  // Cache data.
  let test = null;
  let type = null;
  let content = null;
  let languageData = null;
  let element = null;
  let dismiss = null;

  // If declared page language matches most likely language.
  if (primary(detectedLangCode) === primary(declared)) {
    // Pass if we're 90% confident.
    const confidenceTarget = State.option.PAGE_LANG_CONFIDENCE?.confidence || 0.9;
    if (detectedLang.confidence >= confidenceTarget) {
      setCache(cacheKey, null, null);
      return;
    }

    // Otherwise, we're going to iterate through every text node and check the language.
    // Break on the first detection of a node that doesn't match page language.
    for (const node of Elements.Found.Everything) {
      // Get text of the node, including image alt text.
      let textString = '';
      if (node.nodeName === 'IMG') textString = node.alt || '';
      else {
        textString = Array.from(node.childNodes)
          .filter((child) => child.nodeType === 3)
          .map((child) => child.textContent).join('').trim();
      }
      const text = Utils.removeWhitespace(textString);

      // Skip nodes that are too short.
      if (text.length <= 20) continue;

      const detectNode = await detector.detect(text);
      const detectedLang = detectNode[0].detectedLanguage
      const detectedLangLabel = getLanguageLabel(detectedLang);
      const confidence = detectNode[0].confidence;

      const langAttribute = node?.getAttribute('lang');
      if (detectedLang !== declared) {
        if (langAttribute && langAttribute === detectedLang) {
          return;
        } else if (langAttribute && langAttribute !== detectedLang && confidence >= 0.5) {
          test = 'LANG_MISMATCH';
          element = node;
          type = confidence >= 0.9 ? 'error' : 'warning';
          content = Lang.sprintf(State.option.checks.LANG_MISMATCH.content
            || 'LANG_MISMATCH', Math.floor(detectNode[0].confidence * 100), detectedLangLabel, getLanguageLabel(langAttribute)) + Lang.sprintf('LANG_TIP');
          dismiss = Utils.prepareDismissal(text.slice(0, 256));
          break;
        } else if (node.nodeName === 'IMG' && confidence >= 0.5) {
          const alt = Utils.sanitizeHTML(node.alt);
          const altText = Utils.removeWhitespace(alt)
          test = 'LANG_OF_PARTS_ALT';
          element = node;
          type = confidence >= 0.9 ? 'error' : 'warning';
          content = Lang.sprintf(State.option.checks.LANG_OF_PARTS_ALT.content ||
            'LANG_OF_PARTS_ALT', detectedLangLabel, languageLabel, altText) + Lang.sprintf('LANG_TIP');
          dismiss = Utils.prepareDismissal(text.slice(0, 256));
          break;
        } else {
          test = 'LANG_OF_PARTS';
          element = node;
          content = Lang.sprintf(State.option.checks.LANG_OF_PARTS.content ||
            'LANG_OF_PARTS', languageLabel, detectedLangLabel, detectedLangLabel);
          dismiss = Utils.prepareDismissal(text.slice(0, 256));
          break;
        }
      }
    }

  } else {
    // Declared page language doesn't match the content of the page at all.
    test = 'PAGE_LANG_CONFIDENCE';
    languageData = [likelyLanguage, languageLabel];
    content = Lang.sprintf(State.option.checks.PAGE_LANG_CONFIDENCE.content
      || 'PAGE_LANG_CONFIDENCE', likelyLanguage, languageLabel);
    dismiss = Utils.prepareDismissal(cacheKey);

    setCache(cacheKey, test, languageData);
  }

  // Non-cached result.
  if (test) {
    State.results.push({
      element: element,
      test: test,
      type: State.option.checks[test].type || type,
      content: content,
      dismiss: dismiss,
      developer: State.option.checks[test].developer ?? false,
      cached: false,
    });
  }
}
