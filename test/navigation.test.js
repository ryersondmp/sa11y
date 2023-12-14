/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable no-console */
import { test, describe, before, after } from 'node:test';
import assert from 'node:assert/strict';
import puppeteer from 'puppeteer';

/* Unit test suite. */
describe('Sa11y navigation tests', () => {
  let browser;
  let page;

  before(async () => {
    // Launch headless browser.
    browser = await puppeteer.launch({
      headless: 'new',
      devtools: true,
      args: ['--start-maximized', '--no-sandbox'],
    });
    page = await browser.newPage();

    // Console log messages to terminal.
    page.on('console', (msg) => {
      console.log(`Page Log: ${msg.text()}`);
    });

    // Navigate to unit tests page.
    await page.goto('http://localhost:8080/test/pages/no-errors.html');

    // Toggle main toggle.
    await page.evaluate(async () => {
      await new Promise((resolve) => {
        setTimeout(() => {
          const panel = document.querySelector('sa11y-control-panel').shadowRoot;
          const toggle = panel.querySelector('#toggle');
          toggle.click();
          resolve();
        }, 100);
      });
    });
  });

  // Close everything down after running through all tests.
  after(async () => {
    await page.evaluate(() => {
      localStorage.clear();
    });
    await browser.close();
  });

  test('Open status panel', async () => {
    const panelOpen = await page.evaluate(() => {
      const panel = document.querySelector('sa11y-control-panel').shadowRoot;
      const item = panel.getElementById('panel');
      return item.classList.contains('active');
    });
    assert.strictEqual(panelOpen, true);
  });

  test('Open Settings', async () => {
    // Click on the outline toggle.
    const settingsPanelActive = await page.evaluate(() => {
      const panel = document.querySelector('sa11y-control-panel').shadowRoot;
      const toggle = panel.getElementById('settings-toggle');
      toggle.click();

      return new Promise((resolve) => {
        setTimeout(() => {
          const settingsPanel = panel.getElementById('settings-panel');
          const isActive = settingsPanel.classList.contains('active');
          resolve(isActive);
        }, 100);
      });
    });
    assert.strictEqual(settingsPanelActive, true);
  });

  /* Toggle all toggleable buttons. Needed for other unit tests! */
  test('Toggle setting buttons', async () => {
    const toggleSettings = await page.evaluate(async () => {
      const panel = document.querySelector('sa11y-control-panel').shadowRoot;
      const settings = [
        'contrast-toggle',
        'labels-toggle',
        'links-advanced-toggle',
        'readability-toggle',
        'theme-toggle',
      ];

      const isActivePromises = settings.map((setting) => {
        const toggle = panel.getElementById(setting);
        toggle.click();

        return new Promise((resolve) => {
          setTimeout(() => {
            const isActive = toggle.getAttribute('aria-pressed') === 'true';
            resolve(isActive);
          }, 100);
        });
      });

      return Promise.all(isActivePromises);
    });

    const allTogglesActive = toggleSettings.every((isActive) => isActive === true);
    assert.ok(allTogglesActive);
  });

  test('Open Page Outline', async () => {
    // Click on the outline toggle.
    const outlinePanelActive = await page.evaluate(() => {
      const panel = document.querySelector('sa11y-control-panel').shadowRoot;
      const toggle = panel.getElementById('outline-toggle');
      toggle.click();

      return new Promise((resolve) => {
        setTimeout(() => {
          const outlinePanel = panel.getElementById('outline-panel');
          const isActive = outlinePanel.classList.contains('active');
          resolve(isActive);
        }, 100);
      });
    });
    assert.strictEqual(outlinePanelActive, true);
  });

  test('No errors found', async () => {
    const readability = await page.evaluate(() => {
      const control = document.querySelector('sa11y-control-panel').shadowRoot;
      const panel = control.getElementById('readability-info').textContent;
      const textHas = panel.match(/enough content to calculate readability/g);
      return textHas;
    });
    assert.ok(readability, true);

    const status = await page.evaluate(() => {
      const control = document.querySelector('sa11y-control-panel').shadowRoot;
      const panel = control.getElementById('status').textContent;
      const textHas = panel.match(/No errors found/g);
      return textHas;
    });
    assert.ok(status, true);
  });

  /* Navigate to Warnings page. */
  test('Navigate to warnings page (Count: 3)', async () => {
    await page.goto('http://localhost:8080/test/pages/warnings.html');
    const warningStatus = await page.evaluate(async () => {
      const panel = document.querySelector('sa11y-control-panel').shadowRoot;
      const status = panel.getElementById('warning-count').textContent === '3';
      return status;
    });
    assert.ok(warningStatus);
  });

  test('Dismiss page issue (Count: 2)', async () => {
    const warningStatus = await page.evaluate(async () => {
      const panel = document.querySelector('sa11y-control-panel').shadowRoot;
      const pageIssues = panel.getElementById('page-issues-list');
      const dismiss = pageIssues.querySelector('button[data-sa11y-dismiss]');
      dismiss.click();

      return new Promise((resolve) => {
        setTimeout(() => {
          const status = panel.getElementById('warning-count').textContent === '2';
          resolve(status);
        }, 100);
      });
    });
    assert.ok(warningStatus);
  });

  test('Dismiss annotation (Count: 1)', async () => {
    const warningStatus = await page.evaluate(async () => {
      const panel = document.querySelector('sa11y-control-panel').shadowRoot;
      const annotation = document.querySelector('sa11y-annotation').shadowRoot;
      const button = annotation.querySelector('button');
      button.click();

      const tooltips = document.querySelector('sa11y-tooltips').shadowRoot;
      const dismiss = tooltips.querySelector('button[data-sa11y-dismiss]');
      dismiss.click();

      return new Promise((resolve) => {
        setTimeout(() => {
          const status = panel.getElementById('warning-count').textContent === '1';
          resolve(status);
        }, 100);
      });
    });
    assert.ok(warningStatus);
  });

  test('Restore all dismissed (Count: 3)', async () => {
    const warningStatus = await page.evaluate(async () => {
      const panel = document.querySelector('sa11y-control-panel').shadowRoot;
      const restore = panel.getElementById('dismiss-button');
      restore.click();

      return new Promise((resolve) => {
        setTimeout(() => {
          const status = panel.getElementById('warning-count').textContent === '3';
          resolve(status);
        }, 100);
      });
    });
    assert.ok(warningStatus);
  });
});
