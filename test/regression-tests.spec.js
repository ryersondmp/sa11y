import { test, expect } from '@playwright/test';
import { waitForCheckComplete } from './unit-test-utils';

test('aria-labelledby ids with CSS-special characters resolve their visible labels', async ({
  page,
}) => {
  await page.goto('/test/pages/no-props.html');
  await waitForCheckComplete(page);

  const result = await page.evaluate(async () => {
    const { default: checkAll } = await import('/src/js/core/checkAll.js');
    const fixture = document.createElement('div');
    fixture.id = 'aria-labelledby-special-id';
    const label = document.createElement('span');
    label.id = 'name:label';
    label.textContent = 'Name';
    const input = document.createElement('input');
    input.type = 'text';
    input.setAttribute('aria-labelledby', 'name:label');
    fixture.append(label, input);
    document.body.append(fixture);

    localStorage.setItem('sa11y-developer', 'On');
    window.sa11yCheckComplete = null;
    const completion = new Promise((resolve) => {
      document.addEventListener('sa11y-check-complete', () => resolve(true), { once: true });
    });
    const timeout = new Promise((resolve) => {
      setTimeout(() => resolve(false), 2000);
    });
    try {
      await checkAll();
      const completed = await Promise.race([completion, timeout]);
      const tests = (window.sa11yCheckComplete?.results || [])
        .filter((issue) => fixture.contains(issue.element))
        .map((issue) => issue.test);
      return { completed, error: '', tests };
    } catch (error) {
      return {
        completed: false,
        error: error instanceof Error ? error.message : String(error),
        tests: [],
      };
    }
  });

  expect(result.error).toBe('');
  expect(result.completed).toBe(true);
  expect(result.tests).toEqual([]);
});
