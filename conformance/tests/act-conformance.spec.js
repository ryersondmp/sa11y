/**
 * ACT Rule Conformance Tests for Editoria11y
 *
 * For each mapped ACT rule, loads each test case HTML page in Playwright,
 * injects Sa11y in headless mode, and checks whether Sa11y's results are
 * consistent with the expected outcome.
 *
 * Each rule writes its own results file to conformance/reports/parts/,
 * and generate-report.js merges them into the final report.
 */

import { test, expect } from '@playwright/test';
import { readFile, writeFile, mkdir } from 'node:fs/promises';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
import { actRuleMapping, conformanceOptions } from '../mapping/act-rule-mapping.js';

const __dirname = dirname(fileURLToPath(import.meta.url));
const CACHE_DIR = join(__dirname, '..', '.cache');
const REPORTS_DIR = join(__dirname, '..', 'reports');
const PARTS_DIR = join(REPORTS_DIR, 'parts');
const PROJECT_ROOT = join(__dirname, '..', '..');

const Sa11y_UMD_PATH = join(PROJECT_ROOT, 'dist', 'js', 'sa11y.umd.js');
const Sa11y_LANG_PATH = join(PROJECT_ROOT, 'dist', 'js', 'lang', 'en.umd.js');

// Load test case index and Sa11y source files
let testcases;
let Sa11ySource;
let Sa11yLangSource;

test.beforeAll(async () => {
  const indexPath = join(CACHE_DIR, 'testcases.json');
  const raw = await readFile(indexPath, 'utf-8');
  testcases = JSON.parse(raw).testcases;

  Sa11ySource = await readFile(Sa11y_UMD_PATH, 'utf-8');
  Sa11yLangSource = await readFile(Sa11y_LANG_PATH, 'utf-8');

  await mkdir(PARTS_DIR, { recursive: true });
});

/**
 * Inject Sa11y into the page and run it in headless mode.
 *
 * Uses page.evaluate() with inline source instead of page.addScriptTag()
 * because some ACT test cases lack <head>/<body> elements. Also ensures
 * a <body> exists since Sa11y scans it by default.
 */
async function runSa11yOnPage(page, ruleOptions = {}) {
  const options = {
    ...conformanceOptions,
    ...ruleOptions,
    checks: {
      ...conformanceOptions.checks,
      ...(ruleOptions.checks || {}),
    },
  };

  const results = await page.evaluate(
    ({ umdSource, langSource, opts }) => {
      // Ensure <body> exists — some ACT test cases are minimal HTML without one
      if (!document.body) {
        const body = document.createElement('body');
        const html = document.documentElement;
        const nodesToMove = [];
        for (const child of html.childNodes) {
          if (child.nodeName !== 'HEAD') {
            nodesToMove.push(child);
          }
        }
        for (const node of nodesToMove) {
          body.appendChild(node);
        }
        html.appendChild(body);
      }

      // Inject Sa11y UMD bundle via indirect eval (works without <head>)
      (0, eval)(umdSource);
      (0, eval)(langSource);

      return new Promise((resolve) => {
        const timeout = setTimeout(() => {
          resolve({ results: [], timedOut: true });
        }, 15000);

        document.addEventListener('sa11yCheckComplete', (e) => {
          clearTimeout(timeout);
          const results = (e.detail.results || []).map((r) => ({
            test: r.test,
            type: r.type,
            tagName: r.element?.tagName || null,
            id: r.element?.id || null,
          }));
          resolve({ results, timedOut: false });
        });

        try {
          if (typeof Sa11y === 'undefined') {
            clearTimeout(timeout);
            resolve({ results: [], error: 'Sa11y not loaded' });
            return;
          }
          Sa11y.Lang.addI18n(Sa11yLangEn.strings);
          new Sa11y.Sa11y(opts);
        } catch (err) {
          clearTimeout(timeout);
          resolve({ results: [], error: err.message });
        }
      });
    },
    { umdSource: Sa11ySource, langSource: Sa11yLangSource, opts: options },
  );

  return results;
}

/**
 * Evaluate consistency between Sa11y results and ACT expected outcome.
 */
function evaluateConsistency(expected, checkKeys, results) {
  const checkKeySet = new Set(checkKeys);
  const matchingResults = results.filter((r) => checkKeySet.has(r.test));
  const matchedKeys = [...new Set(matchingResults.map((r) => r.test))];

  if (expected === 'failed') {
    return {
      consistent: matchingResults.length > 0,
      outcome: matchingResults.length > 0 ? 'earl:passed' : 'earl:failed',
      matchedKeys,
    };
  }

  // "passed" or "inapplicable" — Sa11y should NOT have flagged
  return {
    consistent: matchingResults.length === 0,
    outcome: matchingResults.length === 0 ? 'earl:passed' : 'earl:failed',
    matchedKeys,
  };
}

// Generate tests dynamically for each mapped ACT rule
for (const [ruleId, ruleConfig] of Object.entries(actRuleMapping)) {
  test.describe(`ACT Rule ${ruleId}: ${ruleConfig.ruleName}`, () => {
    test(`all test cases`, async ({ page }) => {
      const ruleCases = testcases.filter(
        (tc) => tc.ruleId === ruleId && tc.approved !== false,
      );

      if (ruleCases.length === 0) {
        test.skip();
        return;
      }

      const ruleOutcomes = [];

      for (const tc of ruleCases) {
        const ext = tc.relativePath.endsWith('.svg') ? '.svg' : '.html';
        const isNonHtml = ext === '.svg' || tc.relativePath.endsWith('.xml');

        let evaluation;
        let results = [];
        let timedOut = false;
        let error = null;

        if (isNonHtml) {
          evaluation = {
            consistent: true,
            outcome: 'earl:inapplicable',
            matchedKeys: [],
          };
        } else {
          const localUrl = `/testcases/${tc.ruleId}/${tc.testcaseId}${ext}`;

          try {
            await page.goto(localUrl, { waitUntil: 'domcontentloaded' });

            const runResult = await runSa11yOnPage(
              page,
              ruleConfig.options || {},
            );
            results = runResult.results || [];
            timedOut = runResult.timedOut || false;
            error = runResult.error || null;
          } catch (err) {
            error = err.message;
          }

          if (timedOut || error) {
            evaluation = {
              consistent: false,
              outcome: 'earl:cantTell',
              matchedKeys: [],
            };
          } else {
            evaluation = evaluateConsistency(
              tc.expected,
              ruleConfig.checkKeys,
              results,
            );
          }
        }

        ruleOutcomes.push({
          ruleId,
          ruleName: ruleConfig.ruleName,
          coverage: ruleConfig.coverage,
          testcaseId: tc.testcaseId,
          testcaseTitle: tc.testcaseTitle,
          testcaseUrl: tc.url,
          expected: tc.expected,
          consistent: evaluation.consistent,
          earlOutcome: evaluation.outcome,
          matchedCheckKeys: evaluation.matchedKeys,
          allResultKeys: results.map((r) => r.test),
          timedOut,
          error,
        });
      }

      // Write this rule's results to a separate file
      await writeFile(
        join(PARTS_DIR, `${ruleId}.json`),
        JSON.stringify(ruleOutcomes, null, 2),
      );

      // Report summary
      const total = ruleOutcomes.length;
      const consistent = ruleOutcomes.filter((o) => o.consistent).length;
      const failedCases = ruleOutcomes.filter((o) => !o.consistent);

      if (failedCases.length > 0) {
        const details = failedCases
          .map(
            (o) =>
              `  ${o.testcaseTitle} (expected: ${o.expected}, ` +
              `Sa11y keys: [${o.allResultKeys.join(', ')}])`,
          )
          .join('\n');

        expect.soft(
          consistent,
          `${ruleConfig.ruleName}: ${consistent}/${total} consistent\n` +
          `Inconsistent cases:\n${details}`,
        ).toBe(total);
      }
    });
  });
}
