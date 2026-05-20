#!/usr/bin/env node

/**
 * Discovers potential ACT rule → ed11y check key mappings.
 *
 * Runs ed11y against EVERY ACT test case (all rules, not just mapped ones)
 * with all checks enabled, records which check keys fire, and produces a
 * mapping discovery report.
 *
 * Many test case pages will trigger generic ed11y checks (e.g., "page has
 * no h1") because ACT test HTML is minimal. The analysis filters this noise
 * by computing a "signal score" for each check key per rule: keys that fire
 * on failed cases but NOT on passed/inapplicable cases are real mapping
 * candidates; keys that fire equally on all outcomes are noise.
 *
 * Output:
 *   conformance/reports/discovery-raw.json      — per-testcase results
 *   conformance/reports/discovery-analysis.json  — per-rule analysis
 *   Console summary of actionable findings
 *
 * Prerequisites: npm run conformance:download && npm run build
 *
 * Usage:
 *   node conformance/scripts/discover-mappings.js
 *   node conformance/scripts/discover-mappings.js --concurrency=8
 */

import { chromium } from '@playwright/test';
import { readFile, writeFile, mkdir } from 'node:fs/promises';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
import { spawn } from 'node:child_process';
import { conformanceOptions } from '../mapping/act-rule-mapping.js';

const __dirname = dirname(fileURLToPath(import.meta.url));
const CACHE_DIR = join(__dirname, '..', '.cache');
const REPORTS_DIR = join(__dirname, '..', 'reports');
const PROJECT_ROOT = join(__dirname, '..', '..');

const ED11Y_UMD_PATH = join(PROJECT_ROOT, 'dist', 'js', 'sa11y.umd.min.js');
const ED11Y_LANG_PATH = join(PROJECT_ROOT, 'dist', 'js', 'lang', 'en.umd.js');
const SERVER_SCRIPT = join(__dirname, 'serve-testcases.js');

// Use a different port than the default server to avoid conflicts
const PORT = 8845;

const concurrencyArg = process.argv.find((a) => a.startsWith('--concurrency='));
const CONCURRENCY = concurrencyArg
  ? Number.parseInt(concurrencyArg.split('=')[1], 10)
  : 4;

// ── Server management ──────────────────────────────────────────────

function startServer() {
  return new Promise((resolve, reject) => {
    const proc = spawn('node', [SERVER_SCRIPT, `--port=${PORT}`], {
      stdio: ['ignore', 'pipe', 'pipe'],
    });

    const timeout = setTimeout(() => {
      proc.kill();
      reject(new Error('Server failed to start within 10s'));
    }, 10000);

    proc.stdout.on('data', (data) => {
      if (data.toString().includes('running at')) {
        clearTimeout(timeout);
        resolve(proc);
      }
    });

    proc.on('error', (err) => {
      clearTimeout(timeout);
      reject(err);
    });
  });
}

// ── Ed11y injection ────────────────────────────────────────────────

async function runEd11y(page, umdSource, langSource) {
  return page.evaluate(
    ({ umdSource, langSource, opts }) => {
      // Ensure <body> exists — some ACT test cases are minimal HTML
      if (!document.body) {
        const body = document.createElement('body');
        const html = document.documentElement;
        const nodesToMove = [];
        for (const child of html.childNodes) {
          if (child.nodeName !== 'HEAD') nodesToMove.push(child);
        }
        for (const node of nodesToMove) body.appendChild(node);
        html.appendChild(body);
      }

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
    { umdSource, langSource, opts: conformanceOptions },
  );
}

// ── Worker ─────────────────────────────────────────────────────────

async function worker(context, queue, results, umdSource, langSource) {
  const page = await context.newPage();

  while (queue.length > 0) {
    const tc = queue.shift();
    if (!tc) break;

    const ext = tc.relativePath?.endsWith('.svg') ? '.svg' : '.html';
    const isNonHtml = ext === '.svg' || tc.relativePath?.endsWith('.xml');

    const outcome = {
      ruleId: tc.ruleId,
      testcaseId: tc.testcaseId,
      testcaseTitle: tc.testcaseTitle,
      expected: tc.expected,
      checkKeys: [],
      timedOut: false,
      error: null,
      skipped: false,
    };

    if (isNonHtml) {
      outcome.skipped = true;
    } else {
      try {
        const url = `http://localhost:${PORT}/testcases/${tc.ruleId}/${tc.testcaseId}${ext}`;
        await page.goto(url, {
          waitUntil: 'domcontentloaded',
          timeout: 10000,
        });

        const result = await runEd11y(page, umdSource, langSource);
        outcome.checkKeys = (result.results || []).map((r) => r.test);
        outcome.timedOut = result.timedOut || false;
        outcome.error = result.error || null;
      } catch (err) {
        outcome.error = err.message;
      }
    }

    results.push(outcome);
  }

  await page.close();
}

// ── Analysis ───────────────────────────────────────────────────────

function analyze(outcomes, ruleNames) {
  // Group by rule
  const byRule = new Map();
  for (const o of outcomes) {
    if (!byRule.has(o.ruleId)) byRule.set(o.ruleId, []);
    byRule.get(o.ruleId).push(o);
  }

  const rules = [];

  for (const [ruleId, ruleOutcomes] of byRule) {
    const failed = ruleOutcomes.filter(
      (o) => o.expected === 'failed' && !o.skipped,
    );
    const passed = ruleOutcomes.filter(
      (o) => o.expected === 'passed' && !o.skipped,
    );
    const inapplicable = ruleOutcomes.filter(
      (o) => o.expected === 'inapplicable' && !o.skipped,
    );
    const nonFailed = [...passed, ...inapplicable];

    // Count check key occurrences by outcome category
    const keyStats = {};

    for (const o of failed) {
      for (const key of o.checkKeys) {
        if (!keyStats[key])
          keyStats[key] = { failed: 0, passed: 0, inapplicable: 0 };
        keyStats[key].failed++;
      }
    }
    for (const o of passed) {
      for (const key of o.checkKeys) {
        if (!keyStats[key])
          keyStats[key] = { failed: 0, passed: 0, inapplicable: 0 };
        keyStats[key].passed++;
      }
    }
    for (const o of inapplicable) {
      for (const key of o.checkKeys) {
        if (!keyStats[key])
          keyStats[key] = { failed: 0, passed: 0, inapplicable: 0 };
        keyStats[key].inapplicable++;
      }
    }

    // Compute signal score for each key
    // Signal = (failed hit rate) - (non-failed hit rate)
    // Ranges from -1 (only fires on passed) to +1 (only fires on failed)
    const keys = Object.entries(keyStats).map(([key, stats]) => {
      const failedRate = failed.length > 0 ? stats.failed / failed.length : 0;
      const nonFailedRate =
        nonFailed.length > 0
          ? (stats.passed + stats.inapplicable) / nonFailed.length
          : 0;
      const signal = failedRate - nonFailedRate;

      return { key, ...stats, failedRate, nonFailedRate, signal };
    });

    // Separate signal from noise
    // Signal: fires more on failed than non-failed (signal > 0.1)
    // Noise: fires equally or more on non-failed (signal <= 0.1)
    const signalKeys = keys
      .filter((k) => k.signal > 0.1)
      .sort((a, b) => b.signal - a.signal);
    const noiseKeys = keys
      .filter((k) => k.signal <= 0.1)
      .sort((a, b) => b.failed - a.failed);

    // How many failed cases did at least one signal key catch?
    const signalKeySet = new Set(signalKeys.map((k) => k.key));
    const detectedFailures = failed.filter((o) =>
      o.checkKeys.some((k) => signalKeySet.has(k)),
    ).length;

    rules.push({
      ruleId,
      ruleName: ruleNames[ruleId] || 'Unknown',
      failedTotal: failed.length,
      passedTotal: passed.length,
      inapplicableTotal: inapplicable.length,
      detectedFailures,
      signalKeys,
      noiseKeys,
      errors: ruleOutcomes.filter((o) => o.error).length,
      timedOut: ruleOutcomes.filter((o) => o.timedOut).length,
    });
  }

  // Sort: rules with strongest signal first
  rules.sort((a, b) => {
    // Rules with signal keys first
    if (a.signalKeys.length !== b.signalKeys.length) {
      return b.signalKeys.length - a.signalKeys.length;
    }
    // Then by detection rate
    const aRate =
      a.failedTotal > 0 ? a.detectedFailures / a.failedTotal : 0;
    const bRate =
      b.failedTotal > 0 ? b.detectedFailures / b.failedTotal : 0;
    return bRate - aRate;
  });

  return rules;
}

// ── Console output ─────────────────────────────────────────────────

function printSummary(analysis) {
  const withSignal = analysis.filter((r) => r.signalKeys.length > 0);
  const noSignal = analysis.filter(
    (r) => r.signalKeys.length === 0 && r.failedTotal > 0,
  );
  const noFailed = analysis.filter((r) => r.failedTotal === 0);

  console.log('═══════════════════════════════════════════════════════');
  console.log(' DISCOVERY REPORT: ed11y hits on ACT rule test cases');
  console.log('═══════════════════════════════════════════════════════\n');
  console.log(
    `  ${withSignal.length} rules with signal (potential mappings)`,
  );
  console.log(`  ${noSignal.length} rules with no signal (not covered)`);
  console.log(
    `  ${noFailed.length} rules with no failed test cases (inapplicable only)\n`,
  );

  // Rules with signal
  if (withSignal.length > 0) {
    console.log('── Rules with ed11y signal ────────────────────────────\n');
    console.log(
      '  Signal = (failed hit rate) - (passed hit rate)',
    );
    console.log(
      '  Higher signal = key fires on failures, not on passes\n',
    );

    for (const rule of withSignal) {
      const detRate =
        rule.failedTotal > 0
          ? `${rule.detectedFailures}/${rule.failedTotal} failed detected`
          : 'no failed cases';

      console.log(`  ${rule.ruleId}  ${rule.ruleName}`);
      console.log(
        `    ${detRate} | ${rule.passedTotal} passed | ${rule.inapplicableTotal} inapplicable`,
      );

      // Signal keys
      for (const k of rule.signalKeys) {
        const fp = k.passed + k.inapplicable;
        const fpStr = fp > 0 ? ` (${fp} false pos)` : '';
        console.log(
          `    >> ${k.key.padEnd(32)} ${k.failed}/${rule.failedTotal} failed, signal ${k.signal.toFixed(2)}${fpStr}`,
        );
      }

      // Noise keys (only show if any, abbreviated)
      if (rule.noiseKeys.length > 0) {
        const noiseList = rule.noiseKeys.map((k) => k.key).join(', ');
        console.log(`       noise: ${noiseList}`);
      }

      console.log();
    }
  }

  // Rules with no signal
  if (noSignal.length > 0) {
    console.log('── Rules with no ed11y signal ─────────────────────────\n');
    for (const rule of noSignal) {
      console.log(
        `  ${rule.ruleId}  ${rule.ruleName} (${rule.failedTotal} failed cases)`,
      );
    }
    console.log();
  }
}

// ── Main ───────────────────────────────────────────────────────────

async function main() {
  // Load test case index and ed11y source
  console.log('Loading resources...');

  const indexRaw = await readFile(join(CACHE_DIR, 'testcases.json'), 'utf-8');
  const index = JSON.parse(indexRaw);

  let umdSource;
  try {
    umdSource = await readFile(ED11Y_UMD_PATH, 'utf-8');
  } catch {
    console.error(
      `ed11y UMD bundle not found at ${ED11Y_UMD_PATH}\nRun "npm run build" first.`,
    );
    process.exit(1);
  }

  let langSource;
  try {
    langSource = await readFile(ED11Y_LANG_PATH, 'utf-8');
  } catch {
    console.error(
      `ed11y lang file not found at ${ED11Y_LANG_PATH}\nRun "npm run build" first.`,
    );
    process.exit(1);
  }

  const testcases = index.testcases.filter((tc) => tc.approved !== false);
  const ruleCount = new Set(testcases.map((tc) => tc.ruleId)).size;
  console.log(
    `${testcases.length} test cases across ${ruleCount} rules`,
  );
  console.log(`Concurrency: ${CONCURRENCY} workers\n`);

  // Build rule name lookup
  const ruleNames = {};
  for (const tc of testcases) {
    ruleNames[tc.ruleId] = tc.ruleName;
  }

  // Start server
  console.log('Starting test case server...');
  const serverProc = await startServer();

  let browser;
  try {
    browser = await chromium.launch({ headless: true });
    const context = await browser.newContext();

    // Process all test cases via worker pool
    const queue = [...testcases];
    const results = [];
    const startTime = Date.now();

    // Progress reporting
    const progressInterval = setInterval(() => {
      const done = results.length;
      const pct = Math.round((done / testcases.length) * 100);
      const elapsed = ((Date.now() - startTime) / 1000).toFixed(0);
      process.stdout.write(
        `\r  Processing: ${done}/${testcases.length} (${pct}%) — ${elapsed}s`,
      );
    }, 500);

    await Promise.all(
      Array.from({ length: CONCURRENCY }, () =>
        worker(context, queue, results, umdSource, langSource),
      ),
    );

    clearInterval(progressInterval);
    const elapsed = ((Date.now() - startTime) / 1000).toFixed(1);
    console.log(
      `\r  Done: ${results.length} test cases in ${elapsed}s          \n`,
    );

    await context.close();

    // Save raw results
    await mkdir(REPORTS_DIR, { recursive: true });
    const rawPath = join(REPORTS_DIR, 'discovery-raw.json');
    await writeFile(rawPath, JSON.stringify(results, null, 2));
    console.log(`Raw results:  ${rawPath}`);

    // Analyze and save
    const analysis = analyze(results, ruleNames);
    const analysisPath = join(REPORTS_DIR, 'discovery-analysis.json');
    await writeFile(analysisPath, JSON.stringify(analysis, null, 2));
    console.log(`Analysis:     ${analysisPath}\n`);

    // Print human-readable summary
    printSummary(analysis);
  } finally {
    if (browser) await browser.close();
    serverProc.kill();
  }
}

main().catch((err) => {
  console.error('Fatal error:', err);
  process.exit(1);
});
