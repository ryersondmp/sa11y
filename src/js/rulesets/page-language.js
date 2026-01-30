/** biome-ignore-all lint/correctness/noUndeclaredVariables: new browser api */
import * as Utils from '../utils/utils';
import Lang from '../utils/lang';
import Elements from '../utils/elements';
import { State } from '../core/state';
import { createAlert } from '../interface/alert';
import find from '../utils/find';

// FIFO cache for language detection.
const STORAGE_KEY = 'sa11y-lang-detection';
const MAX_CACHE_SIZE = 200;

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
      if (!('LanguageDetector' in globalThis)) {
        if (!Utils.store.getItem(STORAGE_KEY)) {
          createAlert(Lang.sprintf('LANG_UNSUPPORTED'));
          Utils.store.setItem(STORAGE_KEY, []);
        }
        console.error(`Sa11y: ${Lang.sprintf('LANG_UNSUPPORTED')}`);
        return null;
      }
      return await globalThis.LanguageDetector.create();
    } catch {
      createAlert(Lang.sprintf('LANG_UNSUPPORTED'));
      console.error(`Sa11y: ${Lang.sprintf('LANG_UNSUPPORTED')}`);
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

// We're looking for significant changes for text before running this expensive check.
const getCacheKey = (declared, url, textLength) => {
  return `${declared}|${url}|${Math.floor(textLength / 100) * 100}`;
};

// Get local storage value.
const getCache = () => {
  try {
    const get = Utils.store.getItem(STORAGE_KEY);
    return get ? JSON.parse(get) : [];
  } catch (e) {
    console.error('Sa11y: Error loading cache', e);
    return [];
  }
};

// Save minimal, but key info to cache.
const setCache = (key, test, element, type, variables) => {
  if (!State.option.langOfPartsCache) return;
  try {
    const cache = getCache().filter((item) => item.key !== key);
    cache.push({ key, test, element, type, variables });
    while (cache.length > MAX_CACHE_SIZE) cache.shift();
    Utils.store.setItem(STORAGE_KEY, JSON.stringify(cache));
  } catch (e) {
    console.error('Sa11y: Error saving cache.', e);
  }
};

export default async function checkPageLanguage() {
  // Hard return if neither page language checks are enabled or if feature not supported.
  if (!State.option.langOfPartsPlugin) return;
  if (!(await getLanguageDetector())) return;

  // Remove storage key if caching is turned off via prop.
  if (!State.option.langOfPartsCache && Utils.store.getItem(STORAGE_KEY))
    Utils.store.removeItem(STORAGE_KEY);

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
      const tip = cached.element ? Lang.sprintf('LANG_TIP') : '';
      const getElement = cached.element ? find(cached.element, 'root')[0] : null;
      State.results.push({
        element: getElement || null,
        test: cached.test,
        type: State.option.checks[cached.test].type || cached.type,
        content:
          Lang.sprintf(
            State.option.checks[cached.test].content || [cached.test],
            ...cached.variables,
          ) + tip,
        dismiss: Utils.prepareDismissal(cached.test),
        developer: State.option.checks[cached.test].developer ?? false,
        confidence: cached.confidence,
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
    setCache(cacheKey, null, null, null, null);
    return;
  }

  // Identify the primary and secondary page languages.
  const detectedLang = detected[0];
  const detectedLangCode = detectedLang.detectedLanguage;
  const declaredPageLang = getLanguageLabel(declared) || declared;
  const likelyLanguage = getLanguageLabel(detectedLangCode);

  // Cache data.
  let test = null;
  let type = null;
  let content = null;
  let element = null;
  let dismiss = null;
  let confidence = null;
  let variables = null;

  // Declared page language doesn't match the detected content.
  if (primary(detectedLangCode) !== primary(declared)) {
    test = 'PAGE_LANG_CONFIDENCE';
    content = Lang.sprintf(
      State.option.checks.PAGE_LANG_CONFIDENCE.content || 'PAGE_LANG_CONFIDENCE',
      likelyLanguage,
      declaredPageLang,
    );
    dismiss = Utils.prepareDismissal(cacheKey);
    type = detectedLang.confidence >= 0.9 ? 'error' : 'warning';
    confidence = detectedLang.confidence;
    variables = [likelyLanguage, declaredPageLang];
    setCache(cacheKey, test, null, type, variables);
    return;
  }

  // If declared page language matches most likely language.
  if (primary(detectedLangCode) === primary(declared)) {
    // Pass if we're 90% confident.
    const confidenceTarget = State.option.PAGE_LANG_CONFIDENCE?.confidence || 0.9;
    if (Math.floor(detectedLang.confidence * 100) >= confidenceTarget) {
      setCache(cacheKey, null, null, null, null);
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
          .map((child) => child.textContent)
          .join('')
          .trim();
      }
      const text = Utils.removeWhitespace(textString);

      // Skip nodes that are too short.
      if (text.length <= 30) continue;

      // Node data.
      const detectNode = await detector.detect(text);
      const nodeLang = detectNode[0].detectedLanguage;
      const nodeLangLabel = getLanguageLabel(nodeLang);
      const nodeConfidence = Math.floor(detectNode[0].confidence * 100);
      const langAttribute = node?.getAttribute('lang');

      if (nodeLang !== declared && nodeConfidence >= 0.5) {
        if (langAttribute && langAttribute === nodeLang) return;

        // Shared data.
        element = node;
        type = nodeConfidence >= 0.9 ? 'error' : 'warning';
        dismiss = Utils.prepareDismissal(text.slice(0, 256));
        confidence = nodeConfidence;

        if (langAttribute && langAttribute !== nodeLang) {
          test = 'LANG_MISMATCH';
          content =
            Lang.sprintf(
              State.option.checks.LANG_MISMATCH.content || 'LANG_MISMATCH',
              nodeConfidence,
              nodeLangLabel,
              getLanguageLabel(langAttribute),
            ) + Lang.sprintf('LANG_TIP');
          variables = [nodeConfidence, nodeLangLabel, getLanguageLabel(langAttribute)];
          const selector = Utils.generateSelectorPath(node);
          setCache(cacheKey, test, selector, type, variables);
          break;
        } else if (node.nodeName === 'IMG' && node?.alt?.length !== 0) {
          const alt = Utils.sanitizeHTML(node.alt);
          const altText = Utils.removeWhitespace(alt);
          test = 'LANG_OF_PARTS_ALT';
          content =
            Lang.sprintf(
              State.option.checks.LANG_OF_PARTS_ALT.content || 'LANG_OF_PARTS_ALT',
              nodeLangLabel,
              declaredPageLang,
              altText,
            ) + Lang.sprintf('LANG_TIP');
          variables = [nodeLangLabel, declaredPageLang, altText];
          const selector = Utils.generateSelectorPath(node);
          setCache(cacheKey, test, selector, type, variables);
          break;
        } else {
          test = 'LANG_OF_PARTS';
          content =
            Lang.sprintf(
              State.option.checks.LANG_OF_PARTS.content || 'LANG_OF_PARTS',
              declaredPageLang,
              nodeLangLabel,
              nodeLangLabel,
            ) + Lang.sprintf('LANG_TIP');
          variables = [declaredPageLang, nodeLangLabel, nodeLangLabel];
          const selector = Utils.generateSelectorPath(node);
          setCache(cacheKey, test, selector, type, variables);
          break;
        }
      }
    }
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
      confidence: confidence,
    });
  }
}
