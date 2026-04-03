/** biome-ignore-all lint/correctness/noUndeclaredVariables: new browser api */
import * as Utils from '../utils/utils';
import Lang from '../utils/lang';
import Elements from '../utils/elements';
import { State } from '../core/state';
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
          Utils.store.setItem(STORAGE_KEY, []);
          console.error(`Sa11y: ${Lang._('LANG_UNSUPPORTED')}`);
        }
        return null;
      }
      return await globalThis.LanguageDetector.create();
    } catch {
      console.error(`Sa11y: ${Lang._('LANG_UNSUPPORTED')}`);
      return null;
    }
  })();
  return detectorPromise;
}

// Get the reader-friendly language label, e.g. "English"
const getLanguageLabel = (lang) => {
  try {
    const canonicalLang = Intl.getCanonicalLocales(lang)[0];
    const baseLang = new Intl.Locale(canonicalLang).language;
    const label = new Intl.DisplayNames(Lang._('LANG_CODE') || navigator.language, {
      type: 'language',
    }).of(baseLang);
    return label;
  } catch {
    return lang;
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

  // Check validity of declared page language.
  const isDeclaredValid = Elements.Found.Language
    ? Utils.validateLang(Elements.Found.Language)
    : null;
  if (!isDeclaredValid) return;

  // Get primary lang code.
  const declared = primary(Elements.Found.Language);

  // Only run analysis on page if more than 100 characters.
  const pageText = (Elements.Found.pageText || []).join(' ');
  if (pageText.length < 100) return;

  // Generate a unique cache key so we're not running this function frequently.
  const cacheKey = window.location.href;

  // The displayed (cached) result.
  const cached = getCache().find((item) => item.key === cacheKey);

  // Text length or declared page language changed substantially.
  const langChanged = cached?.declared && cached.declared !== declared;
  let isStale = cached && (Math.abs(cached.textLength - pageText.length) > 5 || langChanged);

  // User fixed the error by adding 'lang' and correct lang attr.
  if (cached && !isStale && cached.element) {
    const currentElement = find(cached.element, 'root')[0];
    if (!currentElement) {
      isStale = true;
    } else if (currentElement.getAttribute('lang') === cached.args[0]) {
      isStale = true;
    }
  }

  // Push cached version to page.
  if (cached && !isStale) {
    if (cached.test) {
      const getElement = cached.element ? find(cached.element, 'root')[0] : null;

      // Get text of flagged element.
      const elementText = getElement ? Utils.getText(getElement) : null;

      // Get language labels.
      const processArgs = cached.args.map((arg) => getLanguageLabel(arg));

      // Push processed args to tooltip.
      const finalArgs = [...processArgs];
      if (elementText) finalArgs.push(elementText);

      // Generate tooltip content.
      const mainContent = Lang.sprintf(
        State.option.checks[cached.test].content || [cached.test],
        ...finalArgs,
      );

      // Build the content container safely
      const contentContainer = document.createElement('div');
      contentContainer.append(mainContent);
      if (cached.element) {
        contentContainer.append(' ', Lang.sprintf('LANG_TIP'));
      }

      State.results.push({
        element: getElement || null,
        test: cached.test,
        type: State.option.checks[cached.test].type || cached.type,
        content: contentContainer,
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
  let args = null;

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
    args = [detectedLangCode, declared];

    setCache({
      key: cacheKey,
      test: test,
      type: type,
      args: args,
      confidence: confidence,
      textLength: pageText.length,
      declared: declared,
    });
  }

  // If declared page language matches most likely language.
  if (detectedLangCode === declared) {
    // Check for presence of lang attributes on the page.
    const langAttributes = find('[lang]', 'root');

    // Pass if we're highly confident and there are no custom lang attributes.
    const confidenceTarget = State.option.PAGE_LANG_CONFIDENCE?.confidence || 0.95;
    if (detected[0].confidence >= confidenceTarget && langAttributes.length === 0) {
      setCache({
        key: cacheKey,
        textLength: pageText.length,
        declared: declared,
        confidence: detected[0].confidence,
      });
      return;
    }

    // Otherwise, iterate through every text node to check the language.
    // Break on the first detection of a node that doesn't match the expected language.
    for (const node of Elements.Found.Everything) {
      const isImage = node.nodeName === 'IMG';

      // Cheap check before running expensive text extraction and processing.
      if (!isImage && (!node.textContent || node.textContent.length < 30)) {
        continue;
      }

      // Get text of the node (image alt text vs text nodes).
      let textString = '';
      if (isImage) {
        textString = node.alt || '';
      } else {
        textString = Array.from(node.childNodes)
          .filter((child) => child.nodeType === Node.TEXT_NODE) // Using semantic constant instead of '3'
          .map((child) => child.textContent)
          .join(' ');
      }
      const nodeText = Utils.normalizeString(textString);

      // Skip nodes that are too short to accurately detect.
      if (nodeText.length <= 30) continue;

      // Node data.
      const detectNode = await detector.detect(nodeText);
      const nodeLang = primary(detectNode[0].detectedLanguage);
      const nodeConfidence = detectNode[0].confidence;

      // Only proceed if we have reasonable confidence in the detected language.
      if (nodeConfidence >= 0.6) {
        const langAttribute = node.getAttribute('lang') ? primary(node.getAttribute('lang')) : '';
        const selector = Utils.generateSelectorPath(node);

        // 1. 'lang' attribute contradicts detected text.
        if (langAttribute && langAttribute !== nodeLang) {
          test = 'LANG_MISMATCH';
          content = Lang.sprintf(
            State.option.checks.LANG_MISMATCH.content || 'LANG_MISMATCH',
            getLanguageLabel(nodeLang),
            getLanguageLabel(langAttribute),
            textString,
          );
          args = [nodeLang, langAttribute];

          // 2. No specific 'lang' attribute, but text contradicts page language.
        } else if (!langAttribute && nodeLang !== declared) {
          // Image alt text is different language.
          if (isImage && node.alt) {
            test = 'LANG_OF_PARTS_ALT';
            content = Lang.sprintf(
              State.option.checks.LANG_OF_PARTS_ALT.content || 'LANG_OF_PARTS_ALT',
              getLanguageLabel(nodeLang),
              getLanguageLabel(declared),
              node.alt,
            );
            args = [nodeLang, declared, node.alt];
          } else {
            // Text node is different language.
            test = 'LANG_OF_PARTS';
            content = Lang.sprintf(
              State.option.checks.LANG_OF_PARTS.content || 'LANG_OF_PARTS',
              getLanguageLabel(declared),
              getLanguageLabel(nodeLang),
              textString,
            );
            args = [declared, nodeLang];
          }
          // 3. No conflict detected.
        } else {
          continue;
        }

        // Set shared values.
        element = node;
        type = nodeConfidence >= 0.9 ? 'error' : 'warning';
        dismiss = Utils.prepareDismissal(nodeText.slice(0, 256));
        confidence = nodeConfidence;

        // Cache the result.
        setCache({
          key: cacheKey,
          test: test,
          element: selector,
          type: type,
          args: args,
          confidence: nodeConfidence,
          textLength: pageText.length,
          declared: declared,
        });
        break;
      }
    }
  }

  // Non-cached result.
  if (test) {
    // Supplementary tip if message has an associated element.
    const wrapper = document.createElement('div');
    wrapper.append(content, ' ', Lang.sprintf('LANG_TIP'));

    // Push result.
    State.results.push({
      element: element,
      test: test,
      type: State.option.checks[test].type || type,
      content: element ? wrapper : content,
      dismiss: dismiss,
      developer: State.option.checks[test].developer ?? false,
      cached: false,
      pageText: pageText.length,
      confidence: confidence,
    });
  }
}
