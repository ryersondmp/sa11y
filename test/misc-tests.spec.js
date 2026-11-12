import { test, expect } from '@playwright/test';
import { checkTooltip, waitForCheckComplete } from './unit-test-utils';

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

  // Locators pierce Sa11y's open shadow roots, and expect(locator) retries
  // until the assertion passes or times out, so no fixed sleeps are needed.
  const panel = (selector) => page.locator(`sa11y-control-panel ${selector}`);

  test('Navigate to page with no errors and toggle Sa11y', async () => {
    // Navigate to unit tests page.
    await page.goto('/test/pages/no-errors.html');

    // Toggle main toggle. click() waits for the toggle to become enabled.
    await panel('#toggle').click();
    await waitForCheckComplete(page);
  });

  test('Open status panel', async () => {
    await expect(panel('#panel')).toHaveClass(/active/);
  });

  test('Open Settings', async () => {
    await panel('#settings-toggle').click();
    await expect(panel('#settings-panel')).toHaveClass(/active/);
  });

  /* Toggle all toggleable buttons. Needed for other unit tests! */
  test('Toggle setting buttons', async () => {
    const settings = ['readability-toggle', 'theme-toggle'];
    for (const setting of settings) {
      const toggle = panel(`#${setting}`);
      await toggle.click();
      await expect(toggle, setting).toHaveAttribute('aria-pressed', 'true');
    }
    // The readability toggle re-runs all checks.
    await waitForCheckComplete(page);
  });

  test('Open Page Outline', async () => {
    await panel('#outline-toggle').click();
    await expect(panel('#outline-panel')).toHaveClass(/active/);
  });

  test('No errors found', async () => {
    await expect(panel('#readability-info')).toContainText(
      'enough content to calculate readability',
    );
    await expect(panel('#status')).toContainText('No errors found');
  });

  /* Navigate to Warnings page. */
  test('Navigate to warnings page (Count: 5)', async () => {
    await page.goto('/test/pages/warnings.html');
    await waitForCheckComplete(page);
    await expect(panel('#warning-count')).toHaveText('5');
  });

  test('Dismiss page issue (Count: 4)', async () => {
    await panel('#page-issues-list button[data-sa11y-dismiss]').first().click();
    await expect(panel('#warning-count')).toHaveText('4');
  });

  test('Dismiss annotation (Count: 3)', async () => {
    // Synthetic clicks, as before: the first annotation on this page belongs to
    // a hidden iframe, so a real (visibility-checked) click would never fire.
    await page.locator('sa11y-annotation').first().locator('button').first().dispatchEvent('click');
    await page.locator('sa11y-tooltips button[data-sa11y-dismiss]').first().dispatchEvent('click');
    await expect(panel('#warning-count')).toHaveText('3');
  });

  test('Restore all dismissed (Count: 5)', async () => {
    await panel('#dismiss-button').click();
    await expect(panel('#warning-count')).toHaveText('5');
  });

  test('Skip-to-issue toggle', async () => {
    await panel('#skip-button').click();
    await expect(panel('#panel-alert-text')).toContainText('Item is not visible');
  });

  /* Navigate to Warnings page. */
  test('Navigate to page with no props configured', async () => {
    await page.goto('/test/pages/no-props.html');
    await waitForCheckComplete(page);
    await expect(panel('#notification-count')).toHaveText('3');
  });

  test('Check for page issue on No Props page', async () => {
    await expect(panel('#page-issues-list')).toContainText(
      'The language code for this element is not valid. To fix, replace the lang attribute with a valid language code.',
    );
  });

  test('Check that i18n page loaded with Spanish language pack. ', async () => {
    await page.goto('/test/pages/i18n.html');
    await waitForCheckComplete(page);
    await expect(panel('#outline-toggle')).toContainText('Esquema');
    await expect(panel('#notification-count')).toHaveText('2');
  });

  test('Spanish language file check for alt placeholder stopword', async () => {
    const issue = await checkTooltip(
      page,
      'error-image',
      'Error Se encontró texto alternativo no descriptivo o de marcador de posición.',
    );
    expect(issue).toBe(true);
  });

  test('Spanish language file check for non-descript link text', async () => {
    const issue = await checkTooltip(
      page,
      'error-link-test',
      'El texto del enlace puede no ser lo suficientemente descriptivo fuera de contexto: leer más',
    );
    expect(issue).toBe(true);
  });

  test('Check that i18n (Cyrillic) page loaded Ukrainian language pack', async () => {
    await page.goto('/test/pages/i18n-cyrillic.html');
    await waitForCheckComplete(page);
    await expect(panel('#outline-toggle')).toContainText('Структура');
    await expect(panel('#notification-count')).toHaveText('2');

    // Readability shouldn't appear at all.
    await expect(panel('#readability-item')).toHaveCount(0);
  });

  test('Ukrainian language file check for alt placeholder stopword', async () => {
    const issue = await checkTooltip(
      page,
      'error-image',
      'Помилка Виявлено не описовий або заповнюючий текст заміщення. Замініть наступний текст заміщення чимось більш значущим.  АЛЬТ фото',
    );
    expect(issue).toBe(true);
  });

  test('Ukrainian language file check for non-descript link text', async () => {
    const issue = await checkTooltip(
      page,
      'error-link-test',
      'Помилка Текст посилання може бути недостатньо описовим без контексту: дізнатися більше  Порада! Використовуйте чіткий і унікальний текст посилання, що описує призначення посилання, зазвичай заголовок сторінки або документа.',
    );
    expect(issue).toBe(true);
  });

  test('Check that i18n (Multi) page loaded English UI with Ukrainian ruleset strings', async () => {
    await page.goto('/test/pages/i18n-multi.html');
    await waitForCheckComplete(page);
    await expect(panel('#outline-toggle')).toContainText('Outline');
  });

  test('i18n (Multi) alt placeholder stopword. Mixed English and Ukrainian.', async () => {
    const issue = await checkTooltip(
      page,
      'error-image',
      'Error Non-descript or placeholder alt text found. Replace the following alt text with something more meaningful.  ALT фото',
    );
    expect(issue).toBe(true);

    const issue2 = await checkTooltip(
      page,
      'error-image-2',
      'Error Non-descript or placeholder alt text found. Replace the following alt text with something more meaningful.  ALT photo',
    );
    expect(issue2).toBe(true);
  });
});
