import { test, expect } from '@playwright/test';

test.describe.configure({ mode: 'serial' });

/* Miscellaneous unit tests */
let page;
test.describe('Sa11y miscellaneous tests', () => {
  test.beforeAll(async ({ browser }) => {
    page = await browser.newPage();
  });

  // Close everything down after running through all tests.
  test.afterAll(async () => {
    await page.evaluate(() => {
      localStorage.clear();
    });
    await page.close();
  });

  test('Navigate to page with no errors and toggle Sa11y', async () => {
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

  test('Open status panel', async () => {
    const panelOpen = await page.evaluate(() => {
      const panel = document.querySelector('sa11y-control-panel').shadowRoot;
      const item = panel.getElementById('panel');
      return item.classList.contains('active');
    });
    expect(panelOpen).toBe(true);
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
    expect(settingsPanelActive).toBe(true);
  });

  /* Toggle all toggleable buttons. Needed for other unit tests! */
  test('Toggle setting buttons', async () => {
    const toggleSettings = await page.evaluate(async () => {
      const panel = document.querySelector('sa11y-control-panel').shadowRoot;
      const settings = [
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
    expect(allTogglesActive).toBeTruthy();
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
    expect(outlinePanelActive).toBe(true);
  });

  test('No errors found', async () => {
    const readability = await page.evaluate(() => {
      const control = document.querySelector('sa11y-control-panel').shadowRoot;
      const panel = control.getElementById('readability-info').textContent;
      const textHas = panel.match(/enough content to calculate readability/g);
      return textHas;
    });
    expect(readability).toBeTruthy();

    const status = await page.evaluate(() => {
      const control = document.querySelector('sa11y-control-panel').shadowRoot;
      const panel = control.getElementById('status').textContent;
      const textHas = panel.match(/No errors found/g);
      return textHas;
    });
    expect(status).toBeTruthy();
  });

  /* Navigate to Warnings page. */
  test('Navigate to warnings page (Count: 4)', async () => {
    await page.goto('http://localhost:8080/test/pages/warnings.html');
    const warningStatus = await page.evaluate(async () => {
      const panel = document.querySelector('sa11y-control-panel').shadowRoot;
      const status = panel.getElementById('warning-count').textContent === '4';
      return status;
    });
    expect(warningStatus).toBe(true);
  });

  test('Dismiss page issue (Count: 3)', async () => {
    const warningStatus = await page.evaluate(async () => {
      const panel = document.querySelector('sa11y-control-panel').shadowRoot;
      const pageIssues = panel.getElementById('page-issues-list');
      const dismiss = pageIssues.querySelector('button[data-sa11y-dismiss]');
      dismiss.click();

      return new Promise((resolve) => {
        setTimeout(() => {
          const status = panel.getElementById('warning-count').textContent === '3';
          resolve(status);
        }, 100);
      });
    });
    expect(warningStatus).toBe(true);
  });

  test('Dismiss annotation (Count: 2)', async () => {
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
          const status = panel.getElementById('warning-count').textContent === '2';
          resolve(status);
        }, 100);
      });
    });
    expect(warningStatus).toBe(true);
  });

  test('Restore all dismissed (Count: 4)', async () => {
    const warningStatus = await page.evaluate(async () => {
      const panel = document.querySelector('sa11y-control-panel').shadowRoot;
      const restore = panel.getElementById('dismiss-button');
      restore.click();

      return new Promise((resolve) => {
        setTimeout(() => {
          const status = panel.getElementById('warning-count').textContent === '4';
          resolve(status);
        }, 100);
      });
    });
    expect(warningStatus).toBe(true);
  });

  test('Skip-to-issue toggle', async () => {
    const status = await page.evaluate(async () => {
      const panel = document.querySelector('sa11y-control-panel').shadowRoot;
      const skip = panel.getElementById('skip-button');
      skip.click();

      return new Promise((resolve) => {
        setTimeout(() => {
          const alert = panel.getElementById('panel-alert-text').textContent.includes('item you are trying to view is not visible');
          resolve(alert);
        }, 100);
      });
    });
    expect(status).toBe(true);
  });
});
