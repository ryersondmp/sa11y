#!/usr/bin/env node

/**
 * Generate ACT conformance reports from test results.
 *
 * Reads: conformance/reports/conformance-data.json (output of Playwright tests)
 * Writes:
 *   conformance/reports/earl-report.json      — EARL JSON-LD for W3C submission
 *   conformance/reports/conformance-report.html — human-readable report with HTML snippets
 *
 * Usage:
 *   node conformance/scripts/generate-report.js
 */

import { readFile, writeFile, mkdir } from 'node:fs/promises';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
import { actRuleMapping } from '../mapping/act-rule-mapping.js';

const __dirname = dirname(fileURLToPath(import.meta.url));
const REPORTS_DIR = join(__dirname, '..', 'reports');
const CACHE_DIR = join(__dirname, '..', '.cache');
const PROJECT_ROOT = join(__dirname, '..', '..');

async function loadData() {
  const partsDir = join(REPORTS_DIR, 'parts');
  const { readdir } = await import('node:fs/promises');
  const files = await readdir(partsDir);
  const allOutcomes = [];
  for (const file of files) {
    if (!file.endsWith('.json')) continue;
    const raw = await readFile(join(partsDir, file), 'utf-8');
    allOutcomes.push(...JSON.parse(raw));
  }
  return allOutcomes;
}

async function loadVersion() {
  const pkg = JSON.parse(
    await readFile(join(PROJECT_ROOT, 'package.json'), 'utf-8'),
  );
  return pkg.version;
}

/**
 * Try to read the cached HTML for a test case to include in the report.
 */
async function loadTestcaseHtml(ruleId, testcaseId, relativePath) {
  try {
    const ext = relativePath.endsWith('.svg') ? '.svg' : '.html';
    const filePath = join(CACHE_DIR, 'pages', ruleId, `${testcaseId}${ext}`);
    return await readFile(filePath, 'utf-8');
  } catch {
    return null;
  }
}

// ── EARL Report ─────────────────────────────────────────────────────

function generateEarl(outcomes, version) {
  const graph = [];

  // Assertor
  graph.push({
    '@type': 'Assertor',
    name: 'Sa11y',
    description: 'Inline accessibility checker for web content authors',
    homepage: 'https://sa11y.netlify.app',
    release: {
      '@type': 'Version',
      revision: version,
    },
  });

  // Group outcomes by test case URL
  const byTestcase = new Map();
  for (const o of outcomes) {
    if (!byTestcase.has(o.testcaseUrl)) {
      byTestcase.set(o.testcaseUrl, []);
    }
    byTestcase.get(o.testcaseUrl).push(o);
  }

  for (const [url, assertions] of byTestcase) {
    const subject = {
      '@type': 'TestSubject',
      source: url,
      assertions: assertions.map((a) => ({
        '@type': 'Assertion',
        result: { outcome: a.earlOutcome },
        test: {
          title: a.ruleName,
          isPartOf: (actRuleMapping[a.ruleId]?.wcag || []).map(
            (sc) => `WCAG2:${sc}`,
          ),
        },
      })),
    };
    graph.push(subject);
  }

  return {
    '@context':
      'https://www.w3.org/WAI/content-assets/wcag-act-rules/earl-context.json',
    '@graph': graph,
  };
}

// ── HTML Report ─────────────────────────────────────────────────────

function escapeHtml(str) {
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

async function generateHtml(outcomes, version) {
  // Group by rule
  const byRule = new Map();
  for (const o of outcomes) {
    if (!byRule.has(o.ruleId)) {
      byRule.set(o.ruleId, {
        ruleName: o.ruleName,
        coverage: o.coverage,
        cases: [],
      });
    }
    byRule.get(o.ruleId).cases.push(o);
  }

  // Calculate stats
  const totalCases = outcomes.length;
  const consistentCases = outcomes.filter((o) => o.consistent).length;
  const totalRules = byRule.size;
  const fullyConsistentRules = [...byRule.values()].filter((r) =>
    r.cases.every((c) => c.consistent),
  ).length;

  let ruleRows = '';

  for (const [ruleId, rule] of byRule) {
    const consistent = rule.cases.filter((c) => c.consistent).length;
    const total = rule.cases.length;
    const pct = Math.round((consistent / total) * 100);
    const status =
      pct === 100 ? 'consistent' : pct >= 50 ? 'partial' : 'inconsistent';

    let caseRows = '';
    for (const c of rule.cases) {
      const statusClass = c.consistent ? 'pass' : 'fail';
      const statusText = c.consistent ? 'Consistent' : 'INCONSISTENT';

      // Load HTML snippet
      const html = await loadTestcaseHtml(
        c.ruleId,
        c.testcaseId,
        // Reconstruct relative path
        `testcases/${c.ruleId}/${c.testcaseId}.html`,
      );

      // Extract just the <body> content for display, or first 2000 chars
      let snippet = '';
      if (html) {
        const bodyMatch = html.match(/<body[^>]*>([\s\S]*?)<\/body>/i);
        snippet = bodyMatch ? bodyMatch[1].trim() : html;
        if (snippet.length > 2000) {
          snippet = `${snippet.slice(0, 2000)}...`;
        }
      }

      caseRows += `
        <tr class="case-row ${statusClass}">
          <td class="status-cell ${statusClass}">${statusText}</td>
          <td>${escapeHtml(c.testcaseTitle)}</td>
          <td><code>${c.expected}</code></td>
          <td><code>${c.matchedCheckKeys.length > 0 ? c.matchedCheckKeys.join(', ') : '(none)'}</code></td>
          <td>${c.allResultKeys.length > 0 ? `<code>${c.allResultKeys.join(', ')}</code>` : '<em>no results</em>'}</td>
          <td><a href="${escapeHtml(c.testcaseUrl)}" target="_blank">W3C</a></td>
        </tr>
        ${snippet ? `<tr class="snippet-row ${statusClass}"><td colspan="6"><details><summary>HTML source</summary><pre><code>${escapeHtml(snippet)}</code></pre></details></td></tr>` : ''}`;
    }

    const ruleMapping = actRuleMapping[ruleId];
    const wcag = ruleMapping?.wcag?.length
      ? ruleMapping.wcag.map((sc) => `WCAG ${sc}`).join(', ')
      : 'ARIA';

    ruleRows += `
      <section class="rule-section ${status}">
        <h3>
          <span class="rule-status ${status}">${pct}%</span>
          ${escapeHtml(rule.ruleName)}
          <small>(${ruleId})</small>
        </h3>
        <p class="rule-meta">
          ${escapeHtml(wcag)} &middot;
          Coverage: <strong>${rule.coverage}</strong> &middot;
          ${consistent}/${total} consistent
          ${ruleMapping?.notes ? `<br><em>${escapeHtml(ruleMapping.notes)}</em>` : ''}
        </p>
        <table>
          <thead>
            <tr>
              <th>Status</th>
              <th>Test Case</th>
              <th>Expected</th>
              <th>Matched Keys</th>
              <th>All Ed11y Results</th>
              <th>Source</th>
            </tr>
          </thead>
          <tbody>
            ${caseRows}
          </tbody>
        </table>
      </section>`;
  }

  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <title>Sa11y ACT Conformance Report</title>
  <style>
    :root { --pass: #2d7d46; --fail: #c33; --partial: #b8860b; --bg: #f8f9fa; }
    * { box-sizing: border-box; }
    body { font-family: system-ui, sans-serif; max-width: 1200px; margin: 0 auto; padding: 2rem; color: #333; }
    h1 { border-bottom: 3px solid #333; padding-bottom: 0.5rem; }
    .summary { display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 1rem; margin: 1.5rem 0; }
    .stat { background: var(--bg); padding: 1rem; border-radius: 8px; text-align: center; }
    .stat .number { font-size: 2rem; font-weight: bold; }
    .stat .label { font-size: 0.85rem; color: #666; }
    .rule-section { margin: 2rem 0; border: 1px solid #ddd; border-radius: 8px; padding: 1rem 1.5rem; }
    .rule-section.consistent { border-left: 4px solid var(--pass); }
    .rule-section.partial { border-left: 4px solid var(--partial); }
    .rule-section.inconsistent { border-left: 4px solid var(--fail); }
    .rule-status { display: inline-block; padding: 2px 8px; border-radius: 4px; color: white; font-size: 0.85rem; margin-right: 0.5rem; }
    .rule-status.consistent { background: var(--pass); }
    .rule-status.partial { background: var(--partial); }
    .rule-status.inconsistent { background: var(--fail); }
    .rule-meta { color: #666; font-size: 0.9rem; }
    table { width: 100%; border-collapse: collapse; margin-top: 0.5rem; font-size: 0.85rem; }
    th, td { padding: 6px 10px; text-align: left; border-bottom: 1px solid #eee; }
    th { background: var(--bg); font-weight: 600; }
    .status-cell { font-weight: bold; }
    .status-cell.pass { color: var(--pass); }
    .status-cell.fail { color: var(--fail); }
    .case-row.fail { background: #fff5f5; }
    .snippet-row.fail { background: #fff5f5; }
    details summary { cursor: pointer; color: #666; font-size: 0.8rem; }
    details pre { background: #f0f0f0; padding: 0.75rem; border-radius: 4px; overflow-x: auto; font-size: 0.8rem; max-height: 300px; overflow-y: auto; }
    code { font-family: ui-monospace, monospace; font-size: 0.85em; }
    a { color: #0066cc; }
    .legend { margin: 1rem 0; padding: 1rem; background: var(--bg); border-radius: 8px; font-size: 0.85rem; }
  </style>
</head>
<body>
  <h1>Sa11y ACT Conformance Report</h1>
  <p>Generated: ${new Date().toISOString().slice(0, 10)} &middot; Sa11y v${version}</p>

  <div class="summary">
    <div class="stat">
      <div class="number">${totalRules}</div>
      <div class="label">Rules Tested</div>
    </div>
    <div class="stat">
      <div class="number">${fullyConsistentRules}</div>
      <div class="label">Fully Consistent</div>
    </div>
    <div class="stat">
      <div class="number">${consistentCases}/${totalCases}</div>
      <div class="label">Test Cases Consistent</div>
    </div>
    <div class="stat">
      <div class="number">${Math.round((consistentCases / totalCases) * 100)}%</div>
      <div class="label">Overall Rate</div>
    </div>
  </div>

  <div class="legend">
    <strong>How to read this report:</strong>
    For each ACT rule, every test case has an expected outcome: <code>passed</code> (no issue),
    <code>failed</code> (tool should flag), or <code>inapplicable</code> (rule doesn't apply).
    <strong>Consistent</strong> means ed11y's behavior matched the expectation.
    <strong>Inconsistent</strong> means ed11y either missed a real issue (false negative) or
    flagged a non-issue (false positive). Click "HTML source" to see the test markup.
  </div>

  ${ruleRows}

  <footer style="margin-top: 3rem; padding-top: 1rem; border-top: 1px solid #ddd; font-size: 0.8rem; color: #999;">
    ACT test cases from <a href="https://www.w3.org/WAI/standards-guidelines/act/rules/">W3C ACT Rules</a>.
    Report generated by Sa11y conformance testing suite.
  </footer>
</body>
</html>`;
}

// ── Main ────────────────────────────────────────────────────────────

async function main() {
  await mkdir(REPORTS_DIR, { recursive: true });

  const outcomes = await loadData();
  const version = await loadVersion();

  console.log(`Loaded ${outcomes.length} test outcomes`);

  // Generate EARL report
  const earl = generateEarl(outcomes, version);
  await writeFile(
    join(REPORTS_DIR, 'earl-report.json'),
    JSON.stringify(earl, null, 2),
  );
  console.log('Wrote earl-report.json');

  // Generate HTML report
  const html = await generateHtml(outcomes, version);
  await writeFile(join(REPORTS_DIR, 'conformance-report.html'), html);
  console.log('Wrote conformance-report.html');

  // Print summary to console
  const byRule = new Map();
  for (const o of outcomes) {
    if (!byRule.has(o.ruleId)) byRule.set(o.ruleId, []);
    byRule.get(o.ruleId).push(o);
  }

  console.log('\n── Summary ──────────────────────────────');
  for (const [ruleId, cases] of byRule) {
    const consistent = cases.filter((c) => c.consistent).length;
    const total = cases.length;
    const pct = Math.round((consistent / total) * 100);
    const marker = pct === 100 ? 'OK' : pct >= 50 ? '..' : 'XX';
    const mapping = actRuleMapping[ruleId];
    console.log(
      `  [${marker}] ${ruleId} ${mapping?.ruleName || 'Unknown'}: ${consistent}/${total} (${pct}%)`,
    );
  }
}

main().catch((err) => {
  console.error('Fatal error:', err);
  process.exit(1);
});
