#!/usr/bin/env node

/**
 * Lists all ACT rules and their mapping status in Editoria11y.
 *
 * Reads wcag-mapping.json (from the cached w3c/wcag-act-rules repo) for the
 * full rule list, and compares against act-rule-mapping.js for mapping status.
 *
 * Usage:
 *   node conformance/scripts/list-rules.js              # show all rules
 *   node conformance/scripts/list-rules.js --unmapped    # show only unmapped rules
 *   node conformance/scripts/list-rules.js --json        # output as JSON
 */

import { readFile } from 'node:fs/promises';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
import { actRuleMapping } from '../mapping/act-rule-mapping.js';

const __dirname = dirname(fileURLToPath(import.meta.url));
const CACHE_DIR = join(__dirname, '..', '.cache');
const MAPPING_PATH = join(CACHE_DIR, 'wcag-mapping.json');

const args = process.argv.slice(2);
const unmappedOnly = args.includes('--unmapped');
const jsonOutput = args.includes('--json');

/**
 * Extract WCAG success criteria IDs from a rule's accessibility_requirements.
 */
function extractWcagCriteria(requirements) {
  if (!requirements) return [];
  const criteria = [];
  for (const key of Object.keys(requirements)) {
    // Match keys like "wcag20:1.1.1" or "wcag21:1.4.12"
    const match = key.match(/^wcag\d+:(.+)$/);
    if (match) {
      criteria.push(match[1]);
    }
  }
  return [...new Set(criteria)].sort();
}

async function main() {
  let wcagMapping;
  try {
    const raw = await readFile(MAPPING_PATH, 'utf-8');
    wcagMapping = JSON.parse(raw);
  } catch (err) {
    if (err.code === 'ENOENT') {
      console.error(
        'wcag-mapping.json not found. Run "npm run conformance:download" first.',
      );
      process.exit(1);
    }
    throw err;
  }

  const allRules = wcagMapping['act-rules'] || [];
  const mappedIds = new Set(Object.keys(actRuleMapping));

  const rules = allRules.map((rule) => {
    const id = rule.frontmatter?.id || '';
    const name = rule.title || rule.frontmatter?.name || '';
    const deprecated = rule.deprecated || false;
    const proposed = rule.proposed || false;
    const wcag = extractWcagCriteria(
      rule.frontmatter?.accessibility_requirements,
    );
    const mapping = actRuleMapping[id];

    let status;
    if (mapping) {
      status = mapping.coverage; // 'full', 'partial', or 'todo'
    } else {
      status = 'unmapped';
    }

    return { id, name, status, wcag, deprecated, proposed };
  });

  // Sort: mapped first (full > partial > todo), then unmapped, deprecated last
  const statusOrder = { full: 0, partial: 1, todo: 2, unmapped: 3 };
  rules.sort((a, b) => {
    if (a.deprecated !== b.deprecated) return a.deprecated ? 1 : -1;
    if (statusOrder[a.status] !== statusOrder[b.status]) {
      return statusOrder[a.status] - statusOrder[b.status];
    }
    return a.name.localeCompare(b.name);
  });

  const filtered = unmappedOnly
    ? rules.filter((r) => r.status === 'unmapped')
    : rules;

  if (jsonOutput) {
    console.log(JSON.stringify(filtered, null, 2));
    return;
  }

  // Summary
  const counts = { full: 0, partial: 0, todo: 0, unmapped: 0 };
  const deprecatedCount = rules.filter((r) => r.deprecated).length;
  for (const r of rules) counts[r.status]++;

  console.log('ACT Rule Mapping Status');
  console.log('═══════════════════════');
  console.log(
    `  Full: ${counts.full}  Partial: ${counts.partial}  Todo: ${counts.todo}  Unmapped: ${counts.unmapped}  (${deprecatedCount} deprecated)`,
  );
  console.log(
    `  Total: ${rules.length} rules, ${rules.length - counts.unmapped} mapped\n`,
  );

  // Table
  const STATUS_LABELS = {
    full: '  FULL   ',
    partial: '  PARTIAL',
    todo: '  TODO   ',
    unmapped: '         ',
  };

  for (const r of filtered) {
    const flags = [
      r.deprecated ? 'DEPRECATED' : '',
      r.proposed ? 'proposed' : '',
    ]
      .filter(Boolean)
      .join(', ');

    const wcagStr = r.wcag.length > 0 ? r.wcag.join(', ') : '(non-WCAG)';
    const label = STATUS_LABELS[r.status];

    console.log(
      `${label}  ${r.id}  ${r.name}${flags ? ` [${flags}]` : ''}`,
    );
    console.log(`                    WCAG: ${wcagStr}`);
  }
}

main().catch((err) => {
  console.error('Fatal error:', err);
  process.exit(1);
});
