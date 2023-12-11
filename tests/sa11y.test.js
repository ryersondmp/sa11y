/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable no-console */
import { test, describe, before, after } from 'node:test';
import assert from 'node:assert/strict';
import puppeteer from 'puppeteer';

describe('Sa11y Unit Tests', () => {
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
    await page.goto('http://localhost:8080/tests/unit-tests.html');

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

  test('Open status panel.', async () => {
    const panelOpen = await page.evaluate(() => {
      const panel = document.querySelector('sa11y-control-panel').shadowRoot;
      const item = panel.getElementById('panel');
      return item.classList.contains('active');
    });
    assert.strictEqual(panelOpen, true, 'Not open.');
  });

  test('Open Page Outline.', async () => {
    // Click on the outline toggle.
    const outlinePanelActive = await page.evaluate(() => {
      const panel = document.querySelector('sa11y-control-panel').shadowRoot;
      const outlineToggle = panel.querySelector('#outline-toggle');
      outlineToggle.click();

      return new Promise((resolve) => {
        setTimeout(() => {
          const outlinePanel = panel.getElementById('outline-panel');
          const isActive = outlinePanel.classList.contains('active');
          resolve(isActive);
        }, 100);
      });
    });
    assert.strictEqual(outlinePanelActive, true, 'Page Outline did not open.');
  });
});
