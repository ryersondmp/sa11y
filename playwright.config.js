// @ts-check
// eslint-disable-next-line import/no-extraneous-dependencies
import { defineConfig, devices } from '@playwright/test';

// Must match server.port in vite.config.js.
const PORT = 54114;
const BASE_URL = `http://localhost:${PORT}`;

/**
 * @see https://playwright.dev/docs/test-configuration
 */
export default defineConfig({
  testDir: './test',
  /* Run tests in files in parallel */
  fullyParallel: true,
  /* Fail the build on CI if you accidentally left test.only in the source code. */
  forbidOnly: !!process.env.CI,
  /* Retry on CI only */
  retries: process.env.CI ? 2 : 0,
  /* Opt out of parallel tests on CI. */
  workers: process.env.CI ? 1 : undefined,
  /* Reporter to use. See https://playwright.dev/docs/test-reporters */
  // reporter: [['html', { open: 'on-failure' }]],
  /* On CI: inline annotations on the PR plus an HTML report to upload as an artifact. */
  reporter: process.env.CI ? [['github'], ['html', { open: 'never' }]] : 'list',
  /* Start the Vite dev server for the test pages. Locally, an already-running
     `npm run serve` is reused. BROWSER=none stops Vite from opening a browser. */
  webServer: {
    command: 'npm run serve',
    url: `${BASE_URL}/test/pages/unit-tests.html`,
    reuseExistingServer: !process.env.CI,
    timeout: 60_000,
    env: { BROWSER: 'none' },
  },
  use: {
    baseURL: BASE_URL,
    trace: 'on-first-retry',
    // headless: false,
  },

  // Stop highlighting errors in /src/
  testIgnore: '**/src/**',

  /* Configure projects for major browsers */
  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] },
    },
    {
      name: 'firefox',
      use: { ...devices['Desktop Firefox'] },
    },
    {
      name: 'webkit',
      use: { ...devices['Desktop Safari'] },
    },
  ],
});
