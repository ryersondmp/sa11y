#!/usr/bin/env node

/**
 * Downloads ACT Rule test cases from the w3c/wcag-act-rules Git repository.
 *
 * Performs a shallow clone (or updates an existing clone) into
 * conformance/.cache/repo/, then creates symlinks so existing scripts
 * can find test cases and metadata at their expected paths:
 *
 * /testcases/           → repo testcases directory (Root)
 * .cache/pages/         → repo testcases directory
 * .cache/testcases.json → repo testcases.json
 * .cache/wcag-mapping.json → repo wcag-mapping.json
 *
 * Usage:
 * node conformance/scripts/download-testcases.js          # clone or update
 * node conformance/scripts/download-testcases.js --force   # delete and re-clone
 */

import { mkdir, symlink, readlink, rm, access, lstat } from 'node:fs/promises';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
import { execSync } from 'node:child_process';

const __dirname = dirname(fileURLToPath(import.meta.url));
const CACHE_DIR = join(__dirname, '..', '.cache');
const ROOT_DIR = join(__dirname, '..', '..'); // Targets the Editoria11y root directory
const REPO_DIR = join(CACHE_DIR, 'repo');
const REPO_URL = 'https://github.com/w3c/wcag-act-rules.git';

// Paths inside the cloned repo (for verification)
const REPO_TESTCASES_JSON = join(
  REPO_DIR,
  'content-assets',
  'wcag-act-rules',
  'testcases.json',
);
const REPO_MAPPING_JSON = join(REPO_DIR, 'wcag-mapping.json');

// Symlink definitions: [link path, target relative to the link's location]
const SYMLINKS = [
  // Creates /testcases/ in the root directory
  [
    join(ROOT_DIR, 'testcases'),
    join('conformance', '.cache', 'repo', 'content-assets', 'wcag-act-rules', 'testcases'),
  ],
  // Creates .cache/pages/
  [
    join(CACHE_DIR, 'pages'),
    join('repo', 'content-assets', 'wcag-act-rules', 'testcases'),
  ],
  [
    join(CACHE_DIR, 'testcases.json'),
    join('repo', 'content-assets', 'wcag-act-rules', 'testcases.json'),
  ],
  [
    join(CACHE_DIR, 'wcag-mapping.json'),
    join('repo', 'wcag-mapping.json'),
  ],
];

const args = process.argv.slice(2);
const force = args.includes('--force');

async function pathExists(path) {
  try {
    await access(path);
    return true;
  } catch {
    return false;
  }
}

function run(cmd, opts = {}) {
  console.log(`  $ ${cmd}`);
  execSync(cmd, { stdio: 'inherit', ...opts });
}

/**
 * Create a relative symlink, replacing any existing file/directory at that path.
 */
async function ensureSymlink(linkPath, target) {
  // Check if a correct symlink already exists
  try {
    const existing = await readlink(linkPath);
    if (existing === target) return;
  } catch {
    // Not a symlink or doesn't exist — that's fine, we'll create it
  }

  // Remove whatever is at the link path (file, directory, or wrong symlink)
  try {
    await lstat(linkPath);
    await rm(linkPath, { recursive: true, force: true });
  } catch {
    // Nothing there — that's fine
  }

  await symlink(target, linkPath);
  console.log(`  Linked ${linkPath} → ${target}`);
}

async function main() {
  await mkdir(CACHE_DIR, { recursive: true });

  const repoExists = await pathExists(join(REPO_DIR, '.git'));

  // 1. Clone or update
  if (force && repoExists) {
    console.log('Force flag: removing existing clone...');
    await rm(REPO_DIR, { recursive: true, force: true });
  }

  if (!repoExists || force) {
    console.log(`Cloning ${REPO_URL} (shallow)...`);
    run(`git clone --depth 1 "${REPO_URL}" "${REPO_DIR}"`);
  } else {
    console.log('Updating existing clone...');
    run('git fetch --depth 1 origin main', { cwd: REPO_DIR });
    run('git reset --hard origin/main', { cwd: REPO_DIR });
  }

  // 2. Verify expected files exist in the clone
  for (const path of [REPO_TESTCASES_JSON, REPO_MAPPING_JSON]) {
    if (!(await pathExists(path))) {
      throw new Error(
        `Expected file not found: ${path}\nThe w3c/wcag-act-rules repo structure may have changed.`,
      );
    }
  }

  // 3. Create symlinks for backward compatibility (and root testcases)
  for (const [linkPath, target] of SYMLINKS) {
    await ensureSymlink(linkPath, target);
  }

  // 4. Report stats
  const { readFile } = await import('node:fs/promises');
  const indexData = JSON.parse(await readFile(REPO_TESTCASES_JSON, 'utf-8'));
  const ruleIds = new Set(indexData.testcases.map((tc) => tc.ruleId));
  console.log(
    `\nDone: ${ruleIds.size} rules, ${indexData.testcases.length} test cases available`,
  );
}

main().catch((err) => {
  console.error('Fatal error:', err);
  process.exit(1);
});