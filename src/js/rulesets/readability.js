import Constants from '../utils/constants';
import Elements from '../utils/elements';
import * as Utils from '../utils/utils';
import Lang from '../utils/lang';
import computeReadability from '../utils/readability-utils';

/**
 * Build readability UI results UI.
 * @param {Object} output Readability results object.
 */
function readabilityUI(output) {
  if (Constants.Global.headless === false) {
    if (output.charCount === 0) {
      Constants.Panel.readabilityInfo.innerHTML = Lang._('READABILITY_NO_CONTENT');
    } else if (output.wordCount > 30) {
      Constants.Panel.readabilityInfo.innerHTML = `${Math.ceil(output.score)} <span class="readability-score">${output.difficultyLevel}</span>`;
      Constants.Panel.readabilityDetails.innerHTML = `<li><strong>${Lang._('AVG_SENTENCE')}</strong> ${Math.ceil(output.averageWordsPerSentence)}</li><li><strong>${Lang._('COMPLEX_WORDS')}</strong> ${output.complexWords}%</li><li><strong>${Lang._('TOTAL_WORDS')}</strong> ${output.wordCount}</li>`;
    } else {
      Constants.Panel.readabilityInfo.textContent = Lang._('READABILITY_NOT_ENOUGH');
    }
  }
}

/**
 * Turn core result into final object pushed to `results`.
 */
function handleReadabilityResult(coreResult, results, source) {
  if (!coreResult) return;

  const result = {
    ...coreResult,
    processedBy: source,
    difficultyLevel: Lang._(coreResult.difficultyToken),
  };
  results.push(result);
  readabilityUI(result);

  // Dispatch custom event when readability results are complete.
  if (source === 'worker') {
    document.dispatchEvent(
      new CustomEvent('sa11y-readability-result', { detail: result }),
    );
  }
}

/**
 * Synchronous computation on the main thread.
 */
function computeOnMainThread(pageText, results) {
  handleReadabilityResult(
    computeReadability(pageText, Constants.Readability.Lang), results, 'main thread',
  );
}

/**
 * Create web worker URL once.
 */
let readabilityWorkerUrl = null;
function getReadabilityWorkerUrl() {
  if (readabilityWorkerUrl) return readabilityWorkerUrl;

  const workerSource = `
    ${computeReadability.toString()}
    self.onmessage = function (e) {
      const data = e.data || {};
      const result = computeReadability(data.pageText, data.lang);
      self.postMessage(result);
    };
  `;
  const blob = new Blob([workerSource], { type: 'text/javascript' });
  readabilityWorkerUrl = URL.createObjectURL(blob);
  return readabilityWorkerUrl;
}

const workerSupported = typeof Worker !== 'undefined'
  && typeof Blob !== 'undefined'
  && typeof URL !== 'undefined'
  && typeof URL.createObjectURL === 'function';

/**
 * Try to compute via inline worker; fall back to main thread on failure.
 */
function computeWithWorker(pageText, results, source = 'worker') {
  if (!workerSupported) {
    console.warn('[readability] Workers not supported, using main thread');
    computeOnMainThread(pageText, results);
    return;
  }

  let worker;
  try {
    worker = new Worker(getReadabilityWorkerUrl());
  } catch (e) {
    console.warn('[readability] Worker creation failed, using main thread', e);
    computeOnMainThread(pageText, results);
    return;
  }

  worker.onmessage = (event) => {
    handleReadabilityResult(event.data || null, results, source);
    worker.terminate();
  };

  worker.onerror = (err) => {
    console.error('[readability] Worker error, falling back', err);
    worker.terminate();
    computeOnMainThread(pageText, results);
  };

  try {
    worker.postMessage({
      pageText,
      lang: Constants.Readability.Lang,
    });
  } catch (e) {
    console.error('[readability] postMessage failed, falling back', e);
    worker.terminate();
    computeOnMainThread(pageText, results);
  }
}

export default function checkReadability(results) {
  if (Utils.store.getItem('sa11y-readability') !== 'On') return results;

  // Get text.
  const pageText = [];
  Elements.Found.Readability.forEach(($el) => {
    const ignore = Utils.fnIgnore($el);
    const text = Utils.getText(ignore);
    if (!text) return;
    pageText.push(text);
  });

  // Compute readability analysis.
  if (Constants.Global.headless) {
    computeOnMainThread(pageText, results);
  } else {
    computeWithWorker(pageText, results);
  }
  return results;
}
