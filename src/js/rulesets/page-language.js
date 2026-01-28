/** biome-ignore-all lint/correctness/noUndeclaredVariables: new browser api */
import * as Utils from '../utils/utils';
import Lang from '../utils/lang';
import Elements from '../utils/elements';
import { State } from '../core/state';

// Check if language detector is supported.
let languageDetectorSupported;
const supportsLanguageDetection = async () => {
  if (languageDetectorSupported !== undefined) return languageDetectorSupported;
  try {
    if ('LanguageDetector' in globalThis) {
      await globalThis.LanguageDetector.create();
      languageDetectorSupported = true;
      return true;
    }
  } catch { }
  languageDetectorSupported = false;
  console.error('Sa11y: Language detection not supported in this browser.');
  return false;
};

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
const setCache = (key, testKey, data) => {
  if (!State.option.langOfPartsCache) return;
  try {
    const cache = getCache().filter((item) => item.key !== key);
    cache.push({ key, testKey, data });
    while (cache.length > MAX_CACHE_SIZE) cache.shift();
    Utils.store.setItem(STORAGE_KEY, JSON.stringify(cache));
  } catch (e) {
    console.error('Sa11y: Error saving cache.', e);
  }
};

export default async function checkPageLanguage() {
  // Hard return if neither page language checks are enabled or if feature not supported.
  if (!State.option.checks.PAGE_LANG_CONFIDENCE || !State.option.checks.LANG_OF_PARTS) return;
  if (!(await supportsLanguageDetection())) return;

  // Remove storage key if caching is turned off via prop.
  if (!State.option.langOfPartsCache && getStorageKey) Utils.store.removeItem(STORAGE_KEY);

  // Get the declared page language.
  const declared = Elements.Found.Language;
  if (!declared) return;

  // Leverage existing DOM query for readability given it's an expensive check.
  const text = (Elements.Found.Readability || []).join().slice(0, 10000);
  if (text.length < 100) return;

  // Generate a unique cache key so we're not running this function frequently.
  const cacheKey = getCacheKey(declared, window.location.href, text.length);

  // The displayed (cached) result.
  const cached = getCache().find((item) => item.key === cacheKey);
  if (cached) {
    if (cached.testKey) {
      State.results.push({
        test: cached.testKey,
        type: State.option.checks[cached.testKey].type || 'warning',
        content: Lang.sprintf(State.option.checks[cached.testKey].content
          || [cached.testKey], ...cached.data),
        dismiss: Utils.prepareDismissal(cached.testKey),
        developer: State.option.checks[cached.testKey].developer ?? false,
        cached: true,
      });
    }
    return;
  }

  // Run language detection using built-in AI.
  const detector = await LanguageDetector.create();
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
  let testKey = null;
  let type = null;
  let content = null;
  let languageData = null;
  let element = null;
  let dismiss = null;

  // If declared page language matches most likely language.
  if (primary(detectedLangCode) === primary(declared)) {
    // We're good if we're at least 80% confident.
    const confidenceTarget = State.option.PAGE_LANG_CONFIDENCE?.confidence || 0.8;
    if (detectedLang.confidence >= confidenceTarget) {
      setCache(cacheKey, null, null);
      return;
    }

    // More than 2 languages detected? Check to see if second likely language has a corresponding lang attribute on the page before we throw a warning.
    if (detected.length >= 2) {

      // Iterate through every text node and check the language.
      for (const node of Elements.Found.Everything) {
        let textString = '';
        // 1. Handle Images
        if (node.nodeName === 'IMG') {
          textString = node.alt || '';
        }
        // 2. Handle other elements by extracting direct text children
        else {
          textString = Array.from(node.childNodes)
            .filter((child) => child.nodeType === 3)
            .map((child) => child.textContent)
            .join('')
            .trim();
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
            testKey = 'LANG_MISMATCH';
            element = node;
            type = confidence >= 0.9 ? 'error' : 'warning';
            content = Lang.sprintf(State.option.checks.LANG_MISMATCH.content
              || 'LANG_MISMATCH', Math.floor(detectNode[0].confidence * 100), detectedLangLabel, getLanguageLabel(langAttribute)) + Lang.sprintf('LANG_TIP');
            dismiss = Utils.prepareDismissal(text.slice(0, 256));
            break;
          } else if (node.nodeName === 'IMG' && confidence >= 0.5) {
            testKey = 'LANG_OF_PARTS_ALT';
            element = node;
            type = confidence >= 0.9 ? 'error' : 'warning';
            content = Lang.sprintf(State.option.checks.LANG_OF_PARTS_ALT.content ||
              'LANG_OF_PARTS_ALT', languageLabel, detectedLangLabel, node.alt);
            dismiss = Utils.prepareDismissal(text.slice(0, 256));
            break;
          } else {
            testKey = 'LANG_OF_PARTS';
            element = node;
            content = Lang.sprintf(State.option.checks.LANG_OF_PARTS.content ||
              'LANG_OF_PARTS', languageLabel, detectedLangLabel, detectedLangLabel);
            dismiss = Utils.prepareDismissal(text.slice(0, 256));
            break;
          }
        }
      }
    }
  } else {
    // Declared page language doesn't match the content of the page at all.
    testKey = 'PAGE_LANG_CONFIDENCE';
    languageData = [likelyLanguage, languageLabel];
    content = Lang.sprintf(State.option.checks.PAGE_LANG_CONFIDENCE.content
      || 'PAGE_LANG_CONFIDENCE', likelyLanguage, languageLabel);
    dismiss = Utils.prepareDismissal(cacheKey);

    setCache(cacheKey, testKey, languageData);
  }

  // Non-cached result.
  if (testKey) {
    State.results.push({
      element: element,
      test: testKey,
      type: State.option.checks[testKey].type || type,
      content: content,
      dismiss: dismiss,
      developer: State.option.checks[testKey].developer ?? false,
      cached: false,
    });
  }
}
