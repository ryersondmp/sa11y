/** biome-ignore-all lint/correctness/noUndeclaredVariables: new browser api */
import * as Utils from '../utils/utils';
import Lang from '../utils/lang';
import Elements from '../utils/elements';
import find from '../utils/find';

const getLanguageLabel = (lang) => {
  try {
    return new Intl.DisplayNames(navigator.language, {
      type: 'language',
    }).of(lang.split('-')[0]);
  } catch {
    return lang;
  }
};

const primary = (lang) => String(lang).toLowerCase().split('-')[0];


let lastRunKey = null;
let lastResult = null;
export default async function checkPageLanguage(results, option) {
  // Early return: Not supported in browser.
  if (!('LanguageDetector' in window)) return;

  // Early return: If page language is not returned.
  const declared = Elements.Found.Language;
  if (!declared) return;

  // Get page text.
  const text = (Elements.Found.Readability || []).join().slice(0, 10000);

  // Early return: Less than 100 characters on page.
  if (text.length < 100) return;

  // Cache key based on declared page language + text length.
  const runKey = `${primary(declared)}-${text.length}`;

  // If text hasn't changed, don't bother running the same check multiple times.
  if (runKey === lastRunKey) {
    if (lastResult) results.push(lastResult);
    return results;
  }

  // New key: reset cache state for this run.
  lastRunKey = runKey;
  lastResult = null;

  const addResult = (message) => {
    const item = {
      test: 'PAGE_LANG_CONFIDENCE',
      type: option.checks.PAGE_LANG_CONFIDENCE.type || 'warning',
      content: Lang.sprintf(
        option.checks.PAGE_LANG_CONFIDENCE.content || Lang.sprintf(message)
      ),
      dismiss: Utils.prepareDismissal(`PAGE_LANG_CONFIDENCE ${text.slice(0, 100)}`),
      developer: option.checks.PAGE_LANG_CONFIDENCE.developer ?? true,
    };
    results.push(item);
    lastResult = item; // cache the last warning so it can be replayed
    return item;
  };

  const detector = await LanguageDetector.create();
  const detected = await detector.detect(text);
  if (!detected?.length) return;

  // Primary detected page language.
  const detectedLang = detected[0];
  const detectedLangCode = detectedLang.detectedLanguage;

  // Confidence target.
  const confidenceTarget = option.PAGE_LANG_CONFIDENCE?.confidence || 0.8;

  // Human readable form of primary languages.
  const languageLabel = getLanguageLabel(declared) || declared;
  const likelyLanguage = getLanguageLabel(detectedLangCode);

  // Declared language matches highest confidence language.
  if (primary(detectedLangCode) === primary(declared)) {
    if (detectedLang.confidence >= confidenceTarget) return;

    // If second language doesn't exist, short return.
    if (detected.length < 2) return;

    // Check what the second most confident language on the page is.
    const secondLikelyLangCode = detected[1].detectedLanguage;
    const secondLikelyLanguage = getLanguageLabel(secondLikelyLangCode);

    // If the second likely language is more than 40% and no lang attributes, throw a warning.
    const langAttributes = find(`[lang="${secondLikelyLangCode}"]`, 'root');
    if (detected[1].confidence >= 0.4 && langAttributes.length === 0) {
      addResult(
        `The page language was declared as ${languageLabel}, but there appears to be ${secondLikelyLanguage} content as well. Ensure the ${secondLikelyLanguage} content is tagged appropriately. Learn more about <a href="https://www.w3.org/WAI/WCAG22/Understanding/language-of-parts.html">language of parts.</a>`
      );
    }
  } else {
    // Declared page language and detected language are different.
    addResult(
      `Most of the text on this page appears to be ${likelyLanguage}, but the declared page language is ${languageLabel}. Consider updating the declared page language to match.`
    );
  }

  return results;
}
