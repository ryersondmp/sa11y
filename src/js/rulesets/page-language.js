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
    // 1. Validate and standardise the code first (e.g. cleans up 'EN-us' to 'en-US').
    const canonicalLang = Intl.getCanonicalLocales(lang)[0];

    // 2. Extract just the base language (e.g. 'en' from 'en-US').
    const baseLang = new Intl.Locale(canonicalLang).language;

    // 3. Get the human readable name.
    const displayName = new Intl.DisplayNames(navigator.language, {
      type: 'language',
    }).of(baseLang);
    return `<span lang="${navigator.language}">${displayName}</span>`;
  } catch {
    return Lang.sprintf(`<strong {C}>${lang}</strong>`);
  }
};

// Identify primary language code.
const primary = (lang) => String(lang).toLowerCase().split('-')[0];

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
const setCache = (data) => {
  // Cache featured turned off.
  if (!State.option.langOfPartsCache) {
    Utils.store.removeItem(STORAGE_KEY);
    return;
  }

  try {
    const cache = getCache().filter((item) => item.key !== data.key);
    cache.push(data);
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
  if (!State.option.langOfPartsCache) Utils.store.removeItem(STORAGE_KEY);

  // Get the declared page language.
  const declared = Elements.Found.Language ? primary(Elements.Found.Language) : null;
  if (!declared) return;

  // Leverage existing DOM query for readability given it's an expensive check.
  const pageText = (Elements.Found.pageText || []).join(' ');
  if (pageText.length < 100) {
    console.warn('Sa11y: Not enough content on this page to determine page language.');
    return;
  }

  // Generate a unique cache key so we're not running this function frequently.
  const cacheKey = window.location.href;

  // The displayed (cached) result.
  const cached = getCache().find((item) => item.key === cacheKey);

  // Text length or declared page language changed substantially.
  const langChanged = cached?.declared && cached.declared !== declared;
  let isStale = cached && (Math.abs(cached.textLength - pageText.length) > 5 || langChanged);

  // User fixed the error by adding 'lang'
  if (cached && !isStale && cached.element) {
    const currentElement = find(cached.element, 'root')[0];
    if (!currentElement) {
      isStale = true;
    } else if (currentElement.hasAttribute('lang')) {
      isStale = true;
    }
  }

  // Push cached version to page.
  if (cached && !isStale) {
    if (cached.test) {
      const tip = cached.element ? Lang.sprintf('LANG_TIP') : '';
      const getElement = cached.element ? find(cached.element, 'root')[0] : null;
      const processVariables = cached.variables.map((variable) => getLanguageLabel(variable));
      State.results.push({
        element: getElement || null,
        test: cached.test,
        type: State.option.checks[cached.test].type || cached.type,
        content:
          Lang.sprintf(
            State.option.checks[cached.test].content || [cached.test],
            ...processVariables,
          ) + tip,
        dismiss: Utils.prepareDismissal(cached.test),
        developer: State.option.checks[cached.test].developer ?? false,
        confidence: cached.confidence,
        textLength: cached.textLength,
        cached: true,
      });
    }
    return;
  }

  // Run language detection using built-in AI.
  const detector = await getLanguageDetector();
  const detected = await detector.detect(pageText);

  // Identify the primary and secondary page languages.
  const detectedLangCode = primary(detected[0].detectedLanguage);

  // Cache data.
  let test = null;
  let type = null;
  let content = null;
  let element = null;
  let dismiss = null;
  let confidence = null;
  let variables = null;

  // Declared page language doesn't match the detected content.
  if (detectedLangCode !== declared) {
    test = 'PAGE_LANG_CONFIDENCE';
    content = Lang.sprintf(
      State.option.checks.PAGE_LANG_CONFIDENCE.content || 'PAGE_LANG_CONFIDENCE',
      getLanguageLabel(detectedLangCode),
      getLanguageLabel(declared),
    );
    dismiss = Utils.prepareDismissal(cacheKey);
    type = detected[0].confidence >= 0.6 ? 'error' : 'warning';
    confidence = detected[0].confidence;
    variables = [detectedLangCode, declared];
    setCache({
      key: cacheKey,
      test: test,
      type: type,
      variables: variables,
      confidence: confidence,
      textLength: pageText.length,
      declared: declared,
    });
  }

  // If declared page language matches most likely language.
  if (detectedLangCode === declared) {
    // Pass if we're 90% confident.
    const confidenceTarget = State.option.PAGE_LANG_CONFIDENCE?.confidence || 0.95;
    if (detected[0].confidence >= confidenceTarget) {
      setCache({
        key: cacheKey,
        textLength: pageText.length,
        declared: declared,
        confidence: detected[0].confidence,
      });
      return;
    }

    // Otherwise, we're going to iterate through every text node and check the language.
    // Break on the first detection of a node that doesn't match page language.
    for (const node of Elements.Found.Everything) {
      // Cheap check before running expensive processing.
      if (node.nodeName !== 'IMG' && (!node.textContent || node.textContent.length < 30)) {
        continue;
      }

      // Get text of the node, including image alt text.
      let textString = '';
      if (node.nodeName === 'IMG') textString = node.alt || '';
      else {
        textString = Array.from(node.childNodes)
          .filter((child) => child.nodeType === 3)
          .map((child) => child.textContent)
          .join(' ');
      }
      const nodeText = Utils.normalizeString(textString);

      // Skip nodes that are too short.
      if (nodeText.length <= 30) continue;

      // Node data.
      const detectNode = await detector.detect(nodeText);
      const nodeLang = primary(detectNode[0].detectedLanguage);
      const nodeConfidence = detectNode[0].confidence;
      const langAttribute = node?.getAttribute('lang') ? primary(node.getAttribute('lang')) : null;

      if (nodeLang !== declared && nodeConfidence >= 0.6) {
        // Node or lang attribute matches detected language of node.
        if (nodeLang === declared || langAttribute === nodeLang) continue;

        // Language tag doesn't match.
        if (langAttribute && langAttribute !== nodeLang) {
          test = 'LANG_MISMATCH';
          content =
            Lang.sprintf(
              State.option.checks.LANG_MISMATCH.content || 'LANG_MISMATCH',
              getLanguageLabel(nodeLang),
              getLanguageLabel(langAttribute),
            ) + Lang.sprintf('LANG_TIP');
          variables = [nodeLang, langAttribute];
        } else if (node.nodeName === 'IMG' && node?.alt?.length !== 0) {
          // Alt text is in different language.
          const alt = Utils.sanitizeHTML(node.alt);
          const altText = Utils.truncateString(alt, 600);
          test = 'LANG_OF_PARTS_ALT';
          content =
            Lang.sprintf(
              State.option.checks.LANG_OF_PARTS_ALT.content || 'LANG_OF_PARTS_ALT',
              getLanguageLabel(nodeLang),
              getLanguageLabel(declared),
              altText,
            ) + Lang.sprintf('LANG_TIP');
          variables = [nodeLang, declared, altText];
        } else {
          // Text node is in different language.
          test = 'LANG_OF_PARTS';
          content =
            Lang.sprintf(
              State.option.checks.LANG_OF_PARTS.content || 'LANG_OF_PARTS',
              getLanguageLabel(declared),
              getLanguageLabel(nodeLang),
            ) + Lang.sprintf('LANG_TIP');
          variables = [declared, nodeLang];
        }

        // Shared data.
        element = node;
        type = nodeConfidence >= 0.9 ? 'error' : 'warning';
        dismiss = Utils.prepareDismissal(nodeText.slice(0, 256));
        confidence = nodeConfidence;
        const selector = Utils.generateSelectorPath(node);

        // Break the loop on first match.
        setCache({
          key: cacheKey,
          test: test,
          element: selector,
          type: type,
          variables: variables,
          confidence: nodeConfidence,
          textLength: pageText.length,
          declared: declared,
        });
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
      pageText: pageText.length,
      confidence: confidence,
    });
  }
}
