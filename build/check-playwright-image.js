/**
 * Verifies the Playwright Docker image pinned in the CI workflow matches the Playwright
 * version in package-lock.json (what CI's `npm ci` installs). A mismatch makes every CI
 * browser job fail with "Executable doesn't exist", so catch it locally first.
 *
 * Runs automatically before `npm test` (as `pretest`) and only warns, so local test runs
 * are never blocked. Pass --strict (or run with CI set) to exit non-zero on a problem.
 */
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const workflowPath = '.github/workflows/test.yml';
const strict = process.argv.includes('--strict') || Boolean(process.env.CI);

const fail = (message) => {
  const prefix = strict ? '::error title=Playwright image pin::' : '⚠️  ';
  console.warn(`\n${prefix}${message}\n`);
  if (strict) process.exit(1);
};

const read = (file) => fs.readFileSync(path.join(root, file), 'utf-8');

(() => {
  // Image tag in the workflow, e.g. mcr.microsoft.com/playwright:v1.64.0-noble
  let workflow;
  try {
    workflow = read(workflowPath);
  } catch {
    return fail(`Could not read ${workflowPath}; Playwright image pin was not checked.`);
  }
  const tags = [...workflow.matchAll(/mcr\.microsoft\.com\/playwright:v(\d+\.\d+\.\d+)/g)].map(
    (m) => m[1],
  );
  if (tags.length === 0) {
    return fail(`No mcr.microsoft.com/playwright image found in ${workflowPath}.`);
  }

  // Every playwright-core copy in the lockfile (normally exactly one). It determines which
  // browser builds are required.
  let lock;
  try {
    lock = JSON.parse(read('package-lock.json'));
  } catch {
    return fail('Could not read package-lock.json; Playwright image pin was not checked.');
  }
  const installed = new Set(
    Object.entries(lock.packages ?? {})
      .filter(([key]) => /(^|\/)node_modules\/playwright-core$/.test(key))
      .map(([, pkg]) => pkg.version),
  );
  if (installed.size === 0) {
    return fail('playwright-core not found in package-lock.json.');
  }

  const expected = [...installed].join(', ');
  const stale = [...new Set(tags)].filter((tag) => !installed.has(tag));
  if (installed.size > 1) {
    return fail(
      `package-lock.json contains multiple playwright-core versions (${expected}). ` +
        'Align @playwright/test and playwright to one version.',
    );
  }
  if (stale.length > 0) {
    return fail(
      `${workflowPath} pins mcr.microsoft.com/playwright:v${stale.join(', v')}, ` +
        `but package-lock.json has Playwright ${expected}. ` +
        `Update the image tag to v${expected}-noble so CI's browsers match.`,
    );
  }
})();
