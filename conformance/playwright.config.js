import { defineConfig } from '@playwright/test';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const projectRoot = join(__dirname, '..');

export default defineConfig({
  testDir: './tests',
  timeout: 500,
  retries: 0,
  workers: 4,
  reporter: [
    ['list'],
    ['json', { outputFile: './reports/playwright-results.json' }],
  ],
  use: {
    baseURL: 'http://localhost:8844',
    headless: false,
    browserName: 'chromium',
  },
  webServer: {
    command: 'node conformance/scripts/serve-testcases.js',
    port: 8844,
    reuseExistingServer: true,
    cwd: projectRoot,
  },
});
