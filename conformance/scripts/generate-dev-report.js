#!/usr/bin/env node

/**
 * Generate a development conformance report with ALL ACT rules.
 *
 * Unlike the official conformance report (which only shows mapped+tested rules),
 * this includes every ACT rule and links test cases to the local review server
 * so a developer can see ed11y running in context.
 *
 * Data sources (all optional except mapping):
 *   - conformance/mapping/act-rule-mapping.js  — current mappings (required)
 *   - conformance/.cache/wcag-mapping.json     — all ACT rules + metadata
 *   - conformance/.cache/testcases.json        — test case listings
 *   - conformance/reports/parts/*.json         — test results (if tests have run)
 *   - conformance/reports/discovery-analysis.json — discovery data (if discovery has run)
 *
 * Output: conformance/reports/dev-report.html
 *
 * Usage:
 *   node conformance/scripts/generate-dev-report.js
 */

import { readFile, writeFile, mkdir, readdir } from 'node:fs/promises';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
import { actRuleMapping } from '../mapping/act-rule-mapping.js';

const __dirname = dirname(fileURLToPath(import.meta.url));
const CACHE_DIR = join(__dirname, '..', '.cache');
const REPORTS_DIR = join(__dirname, '..', 'reports');
const PROJECT_ROOT = join(__dirname, '..', '..');

// ── Data loading (graceful — each source is optional) ──────────────

async function tryReadJson(path) {
  try {
    return JSON.parse(await readFile(path, 'utf-8'));
  } catch {
    return null;
  }
}

async function loadTestResults() {
  const partsDir = join(REPORTS_DIR, 'parts');
  try {
    const files = await readdir(partsDir);
    const all = [];
    for (const file of files) {
      if (!file.endsWith('.json')) continue;
      const data = JSON.parse(await readFile(join(partsDir, file), 'utf-8'));
      all.push(...data);
    }
    return all;
  } catch {
    return [];
  }
}

// ── HTML helpers ───────────────────────────────────────────────────

function esc(str) {
  return String(str)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

function reviewUrl(ruleId, testcaseId, expected, checkKeys, ruleName) {
  const keys = (checkKeys || []).join(',');
  const params = new URLSearchParams({
    review: '',
    expected,
    keys,
    rule: ruleName,
  });
  return `/testcases/${ruleId}/${testcaseId}.html?${params}`;
}

// ── Main ───────────────────────────────────────────────────────────

async function main() {
  await mkdir(REPORTS_DIR, { recursive: true });

  // Load data sources
  const wcagMapping = await tryReadJson(join(CACHE_DIR, 'wcag-mapping.json'));
  const testcasesIndex = await tryReadJson(join(CACHE_DIR, 'testcases.json'));
  const discoveryAnalysis = await tryReadJson(
    join(REPORTS_DIR, 'discovery-analysis.json'),
  );
  const testResults = await loadTestResults();
  const version = JSON.parse(
    await readFile(join(PROJECT_ROOT, 'package.json'), 'utf-8'),
  ).version;

  if (!wcagMapping || !testcasesIndex) {
    console.error(
      'Missing cache data. Run "npm run conformance:download" first.',
    );
    process.exit(1);
  }

  // Build lookup structures
  const allRules = wcagMapping['act-rules'] || [];
  const testcasesByRule = new Map();
  for (const tc of testcasesIndex.testcases) {
    if (!testcasesByRule.has(tc.ruleId)) testcasesByRule.set(tc.ruleId, []);
    testcasesByRule.get(tc.ruleId).push(tc);
  }

  // Test results indexed by ruleId+testcaseId
  const resultLookup = new Map();
  for (const r of testResults) {
    resultLookup.set(`${r.ruleId}:${r.testcaseId}`, r);
  }

  // Discovery analysis indexed by ruleId
  const discoveryByRule = new Map();
  if (discoveryAnalysis) {
    for (const r of discoveryAnalysis) {
      discoveryByRule.set(r.ruleId, r);
    }
  }

  // Build rule list with all metadata merged
  const rules = allRules.map((rule) => {
    const id = rule.frontmatter?.id || '';
    const name = rule.title || rule.frontmatter?.name || '';
    const deprecated = rule.deprecated || false;
    const proposed = rule.proposed || false;
    const reqs = rule.frontmatter?.accessibility_requirements || {};
    const wcag = Object.keys(reqs)
      .filter((k) => k.startsWith('wcag'))
      .map((k) => k.split(':')[1])
      .sort();

    const mapping = actRuleMapping[id];
    const testcases = testcasesByRule.get(id) || [];
    const discovery = discoveryByRule.get(id);

    let status;
    if (mapping) {
      status = mapping.coverage;
    } else {
      status = 'unmapped';
    }

    return {
      id,
      name,
      status,
      wcag,
      deprecated,
      proposed,
      mapping,
      testcases,
      discovery,
    };
  });

  // Sort: mapped first, then by status, deprecated last
  const statusOrder = { full: 0, partial: 1, todo: 2, unmapped: 3 };
  rules.sort((a, b) => {
    if (a.deprecated !== b.deprecated) return a.deprecated ? 1 : -1;
    return (statusOrder[a.status] || 9) - (statusOrder[b.status] || 9);
  });

  // Stats
  const counts = { full: 0, partial: 0, todo: 0, unmapped: 0 };
  for (const r of rules) counts[r.status]++;
  const hasResults = testResults.length > 0;
  const hasDiscovery = discoveryAnalysis !== null;

  // Generate HTML
  const html = generateHtml(
    rules,
    counts,
    resultLookup,
    version,
    hasResults,
    hasDiscovery,
  );

  const outPath = join(REPORTS_DIR, 'dev-report.html');
  await writeFile(outPath, html);
  console.log(`Dev report: ${outPath}`);
  console.log(
    `  ${rules.length} rules (${counts.full} full, ${counts.partial} partial, ${counts.todo} todo, ${counts.unmapped} unmapped)`,
  );
  console.log(
    `  ${hasResults ? testResults.length + ' test results' : 'No test results (run conformance:test)'}`,
  );
  console.log(
    `  ${hasDiscovery ? 'Discovery data available' : 'No discovery data (run conformance:discover)'}`,
  );
  console.log(
    `\nServe with: node conformance/scripts/serve-testcases.js`,
  );
  console.log(
    `Then open:  http://localhost:8844/conformance/reports/dev-report.html`,
  );
}

function generateHtml(rules, counts, resultLookup, version, hasResults, hasDiscovery) {
  let rulesSections = '';

  for (const rule of rules) {
    const checkKeys = rule.mapping?.checkKeys || [];
    const wcagStr =
      rule.wcag.length > 0 ? rule.wcag.join(', ') : '(non-WCAG)';

    // Test case rows
    let caseRows = '';
    let testedCount = 0;
    let consistentCount = 0;

    for (const tc of rule.testcases) {
      if (tc.approved === false) continue;
      const ext = tc.relativePath?.endsWith('.svg') ? '.svg' : '.html';
      const isNonHtml = ext === '.svg' || tc.relativePath?.endsWith('.xml');

      const result = resultLookup.get(`${rule.id}:${tc.testcaseId}`);
      let statusCell;
      let actualCell;
      if (result) {
        testedCount++;
        if (result.consistent) consistentCount++;
        const cls = result.consistent ? 'pass' : 'fail';
        const text = result.consistent ? 'Correct' : 'MISS';
        statusCell = `<span class="badge ${cls}">${text}</span>`;

        // "Actual" = what ed11y did: flagged (found matching check keys) or clear (didn't)
        const flagged = result.matchedCheckKeys?.length > 0;
        actualCell = flagged
          ? '<code class="expected-failed">flagged</code>'
          : '<code class="expected-passed">clear</code>';
      } else {
        statusCell = '<span class="badge untested">—</span>';
        actualCell = '<span class="muted">—</span>';
      }

      const url = isNonHtml
        ? '#'
        : esc(reviewUrl(rule.id, tc.testcaseId, tc.expected, checkKeys, rule.name));

      const expectedClass = `expected-${tc.expected}`;
      const keysFound =
        result?.matchedCheckKeys?.length > 0
          ? result.matchedCheckKeys.join(', ')
          : '';
      const allKeys =
        result?.allResultKeys?.length > 0
          ? result.allResultKeys.join(', ')
          : '';

      caseRows += `
        <tr>
          <td>${statusCell}</td>
          <td><code class="${expectedClass}">${esc(tc.expected)}</code></td>
          <td>${actualCell}</td>
          <td>${isNonHtml ? esc(tc.testcaseTitle) : `<a href="${url}" target="_blank">${esc(tc.testcaseTitle)}</a>`}</td>
          <td><code>${esc(keysFound)}</code></td>
          <td><code>${esc(allKeys)}</code></td>
        </tr>`;
    }

    // Discovery info
    let discoveryHtml = '';
    if (rule.discovery && rule.discovery.signalKeys?.length > 0) {
      const signalList = rule.discovery.signalKeys
        .map(
          (k) =>
            `<code>${esc(k.key)}</code> ${k.failed}/${rule.discovery.failedTotal} failed, signal ${k.signal.toFixed(2)}${k.passed + k.inapplicable > 0 ? ` (${k.passed + k.inapplicable} FP)` : ''}`,
        )
        .join('<br>');
      discoveryHtml = `
        <div class="discovery-box">
          <strong>Discovery signal:</strong><br>${signalList}
        </div>`;
    }

    // Rule section
    const statusClass = rule.status;
    const statusBadge = rule.status !== 'unmapped'
      ? `<span class="status-badge ${rule.status}">${rule.status}</span>`
      : '<span class="status-badge unmapped">unmapped</span>';

    const resultSummary =
      testedCount > 0
        ? `${consistentCount}/${testedCount} consistent`
        : 'not tested';

    const flags = [
      rule.deprecated ? 'deprecated' : '',
      rule.proposed ? 'proposed' : '',
    ]
      .filter(Boolean)
      .join(', ');

    const mappingNotes = rule.mapping?.notes
      ? `<p class="notes"><em>${esc(rule.mapping.notes)}</em></p>`
      : '';

    const mappedKeysHtml = checkKeys.length > 0
      ? `Mapped keys: <code>${esc(checkKeys.join(', '))}</code>`
      : '';

    rulesSections += `
      <section class="rule-section ${statusClass}" id="rule-${esc(rule.id)}">
        <h3>
          ${statusBadge}
          ${esc(rule.name)}
          <small>${esc(rule.id)}${flags ? ` — ${flags}` : ''}</small>
        </h3>
        <p class="rule-meta">
          WCAG: ${esc(wcagStr)} &middot; ${resultSummary}
          ${mappedKeysHtml ? `&middot; ${mappedKeysHtml}` : ''}
        </p>
        ${mappingNotes}
        ${discoveryHtml}
        ${rule.testcases.length > 0 ? `
        <details${rule.status !== 'unmapped' ? ' open' : ''}>
          <summary>${rule.testcases.length} test cases</summary>
          <table>
            <thead>
              <tr>
                <th>Result</th>
                <th>Expected</th>
                <th>Actual</th>
                <th>Test Case</th>
                <th>Matched Keys</th>
                <th>All ed11y Results</th>
              </tr>
            </thead>
            <tbody>${caseRows}</tbody>
          </table>
        </details>` : '<p class="notes">No test cases available.</p>'}
      </section>`;
  }

  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <title>Sa11y ACT Dev Report</title>
  <style>
    :root {
      --pass: #2d7d46; --fail: #c33; --partial: #b8860b; --todo: #666;
      --bg: #f8f9fa; --unmapped-bg: #f0f0f0;
    }
    * { box-sizing: border-box; }
    body {
      font-family: system-ui, sans-serif; max-width: 1400px;
      margin: 0 auto; padding: 2rem; color: #333;
    }
    h1 { border-bottom: 3px solid #333; padding-bottom: 0.5rem; }
    h1 small { font-weight: normal; font-size: 0.5em; color: #999; }

    .summary {
      display: grid; grid-template-columns: repeat(auto-fit, minmax(140px, 1fr));
      gap: 1rem; margin: 1.5rem 0;
    }
    .stat { background: var(--bg); padding: 1rem; border-radius: 8px; text-align: center; }
    .stat .number { font-size: 1.8rem; font-weight: bold; }
    .stat .label { font-size: 0.8rem; color: #666; }

    .rule-section {
      margin: 1.5rem 0; border: 1px solid #ddd; border-radius: 8px;
      padding: 0.75rem 1.25rem;
    }
    .rule-section.full { border-left: 4px solid var(--pass); }
    .rule-section.partial { border-left: 4px solid var(--partial); }
    .rule-section.todo { border-left: 4px solid var(--todo); }
    .rule-section.unmapped { border-left: 4px solid #ccc; background: var(--unmapped-bg); }

    .rule-section h3 { margin: 0.25rem 0; font-size: 1.05rem; }
    .rule-section h3 small { font-weight: normal; color: #888; margin-left: 0.5rem; }

    .status-badge {
      display: inline-block; padding: 1px 8px; border-radius: 4px;
      color: white; font-size: 0.75rem; font-weight: bold;
      vertical-align: middle; margin-right: 0.3rem;
    }
    .status-badge.full { background: var(--pass); }
    .status-badge.partial { background: var(--partial); }
    .status-badge.todo { background: var(--todo); }
    .status-badge.unmapped { background: #bbb; }

    .rule-meta { color: #666; font-size: 0.85rem; margin: 0.25rem 0; }
    .notes { color: #888; font-size: 0.8rem; font-style: italic; margin: 0.25rem 0; }

    .discovery-box {
      background: #e8f4fd; border: 1px solid #b8d4e8; border-radius: 4px;
      padding: 6px 12px; font-size: 0.8rem; margin: 0.5rem 0;
    }

    details summary {
      cursor: pointer; color: #555; font-size: 0.85rem; padding: 4px 0;
    }

    table {
      width: 100%; border-collapse: collapse; margin-top: 0.25rem;
      font-size: 0.8rem;
    }
    th, td { padding: 4px 8px; text-align: left; border-bottom: 1px solid #eee; }
    th { background: var(--bg); font-weight: 600; position: sticky; top: 0; }

    .badge {
      display: inline-block; padding: 1px 6px; border-radius: 3px;
      font-size: 0.7rem; font-weight: bold;
    }
    .badge.pass { background: #d4edda; color: var(--pass); }
    .badge.fail { background: #f8d7da; color: var(--fail); }
    .badge.untested { background: #e9ecef; color: #999; }

    .expected-failed { color: var(--fail); }
    .expected-passed { color: var(--pass); }
    .expected-inapplicable { color: #888; }
    .muted { color: #ccc; }

    code {
      font-family: ui-monospace, monospace; font-size: 0.85em;
    }
    a { color: #0066cc; }

    .filter-bar {
      display: flex; gap: 0.5rem; flex-wrap: wrap; margin: 1rem 0;
      padding: 0.75rem; background: var(--bg); border-radius: 8px;
    }
    .filter-bar button {
      padding: 4px 12px; border: 1px solid #ccc; border-radius: 4px;
      background: white; cursor: pointer; font-size: 0.8rem;
    }
    .filter-bar button.active { background: #333; color: white; border-color: #333; }
  </style>
</head>
<body>
  <h1>
    Sa11y ACT Dev Report
    <small>v${esc(version)} — ${new Date().toISOString().slice(0, 10)}</small>
  </h1>

  <div class="summary">
    <div class="stat">
      <div class="number">${counts.full}</div>
      <div class="label">Full</div>
    </div>
    <div class="stat">
      <div class="number">${counts.partial}</div>
      <div class="label">Partial</div>
    </div>
    <div class="stat">
      <div class="number">${counts.todo}</div>
      <div class="label">Todo</div>
    </div>
    <div class="stat">
      <div class="number">${counts.unmapped}</div>
      <div class="label">Unmapped</div>
    </div>
    <div class="stat">
      <div class="number">${rules.length}</div>
      <div class="label">Total Rules</div>
    </div>
  </div>

  <div class="filter-bar">
    <strong style="line-height:28px;">Filter:</strong>
    <button class="active" data-filter="all">All</button>
    <button data-filter="full">Full</button>
    <button data-filter="partial">Partial</button>
    <button data-filter="todo">Todo</button>
    <button data-filter="unmapped">Unmapped</button>
    ${hasDiscovery ? '<button data-filter="signal">Has Signal</button>' : ''}
  </div>

  <p style="font-size:0.85rem;color:#666;">
    Test case links open in review mode with ed11y injected.
    Workflow: edit code → <code>npm run build</code> → refresh.
    ${!hasResults ? '<br><strong>No test results yet.</strong> Run <code>npm run conformance:test</code> to populate results.' : ''}
    ${!hasDiscovery ? '<br><strong>No discovery data.</strong> Run <code>npm run conformance:discover</code> to see which checks fire on unmapped rules.' : ''}
  </p>

  ${rulesSections}

  <script>
    // Client-side filter
    document.querySelector('.filter-bar').addEventListener('click', function(e) {
      if (e.target.tagName !== 'BUTTON') return;
      var filter = e.target.dataset.filter;

      // Update active button
      this.querySelectorAll('button').forEach(function(b) { b.classList.remove('active'); });
      e.target.classList.add('active');

      // Show/hide sections
      document.querySelectorAll('.rule-section').forEach(function(section) {
        if (filter === 'all') {
          section.style.display = '';
        } else if (filter === 'signal') {
          section.style.display = section.querySelector('.discovery-box') ? '' : 'none';
        } else {
          section.style.display = section.classList.contains(filter) ? '' : 'none';
        }
      });
    });
  </script>

  <footer style="margin-top: 3rem; padding-top: 1rem; border-top: 1px solid #ddd; font-size: 0.8rem; color: #999;">
    Development report — not for W3C submission.
    ACT test cases from <a href="https://www.w3.org/WAI/standards-guidelines/act/rules/">W3C ACT Rules</a>.
  </footer>
</body>
</html>`;
}

main().catch((err) => {
  console.error('Fatal error:', err);
  process.exit(1);
});
