/**
 * Benchmark harness for test/pages/performance.html, driven by test/performance.spec.js.
 * Times each phase of a check separately, with every cache cleared between runs.
 */
import { Sa11y, Lang } from '../../../src/js/sa11y.js';
import Sa11yLangEn from '../../../src/lang/en.js';
import Constants from '../../../src/js/utils/constants.js';
import Elements from '../../../src/js/utils/elements.js';
import resetCaches from '../../../src/js/core/reset-caches.js';
import { resetState } from '../../../src/js/core/state.js';
import findShadowComponents from '../../../src/js/core/find-shadow-components.js';
import checkImages from '../../../src/js/rulesets/images.js';
import checkHeaders from '../../../src/js/rulesets/headers.js';
import checkLinkText from '../../../src/js/rulesets/link-text.js';
import checkContrast from '../../../src/js/contrast/checkContrast.js';
import checkLabels from '../../../src/js/rulesets/labels.js';
import checkReadability from '../../../src/js/rulesets/readability.js';
import checkEmbeddedContent from '../../../src/js/rulesets/embedded-content.js';
import checkQA from '../../../src/js/rulesets/quality-assurance.js';
import checkDeveloper from '../../../src/js/rulesets/developer.js';

Lang.addI18n(Sa11yLangEn.strings);
const sa11y = new Sa11y({
  headless: true,
  checkRoot: 'body',
  developerChecksOnByDefault: true,
  autoDetectShadowComponents: true,
  readabilityPlugin: true,
});

/**
 * Phases in the order core/checkAll.js runs them. Keep this list in sync when a ruleset is added
 * there, or its cost will not be measured. checkPageLanguage is left out: it depends on the
 * browser's LanguageDetector API, which is not available or deterministic everywhere.
 */
const phases = {
  findShadowComponents,
  initializeElements: () => Elements.initializeElements(),
  checkHeaders,
  checkLinkText,
  checkImages,
  checkLabels,
  checkQA,
  checkDeveloper,
  checkEmbeddedContent,
  checkContrast,
  checkReadability,
};

const median = (values) => {
  const sorted = [...values].sort((a, b) => a - b);
  const mid = Math.floor(sorted.length / 2);
  return sorted.length % 2 ? sorted[mid] : (sorted[mid - 1] + sorted[mid]) / 2;
};

/**
 * Order-sensitive digest of every result. Not asserted: it lets a refactor that is meant to be
 * performance-only confirm the results did not change.
 */
function fingerprint() {
  const indexOf = new Map([...document.querySelectorAll('*')].map((el, i) => [el, i]));
  const source = sa11y.results
    .map((r) => {
      const c = r.contrastDetails;
      return [
        r.test,
        r.type,
        indexOf.get(r.element) ?? r.element?.tagName,
        c ? JSON.stringify([c.ratio, c.color, c.background, c.type]) : '',
      ].join('|');
    })
    .join('\n');
  let hash = 0;
  for (let i = 0; i < source.length; i++) hash = (Math.imul(hash, 31) + source.charCodeAt(i)) | 0;
  return hash;
}

/**
 * Run the checks repeatedly and return the median time of each phase.
 * @param {number} iterations Measured runs.
 * @param {number} warmup Unmeasured runs first, so the JIT has warmed up.
 * @returns {Object} Median ms per phase and in total, plus page and result details.
 */
window.runBenchmark = (iterations = 15, warmup = 3) => {
  const samples = Object.fromEntries(Object.keys(phases).map((name) => [name, []]));
  samples.total = [];
  for (let i = 0; i < warmup + iterations; i++) {
    // Same resets as a real check (core/checkAll.js), so every run starts cold.
    resetCaches();
    resetState();
    Constants.initializeRoot('body', 'body', false);
    let total = 0;
    for (const [name, fn] of Object.entries(phases)) {
      const start = performance.now();
      fn();
      const elapsed = performance.now() - start;
      total += elapsed;
      if (i >= warmup) samples[name].push(elapsed);
    }
    if (i >= warmup) samples.total.push(total);
  }
  const round = (n) => Math.round(n * 100) / 100;
  return {
    elements: window.benchElementCount,
    results: sa11y.results.length,
    fingerprint: fingerprint(),
    medians: Object.fromEntries(Object.entries(samples).map(([k, v]) => [k, round(median(v))])),
  };
};

window.benchmarkReady = true;
