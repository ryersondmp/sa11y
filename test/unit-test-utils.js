/**
 * Check contents of tooltip.
 * @param {page} page Page provides methods to interact with a single tab.
 * @param {string} elementId The ID on the test page.
 * @param {string} expectedText The expected tooltip message.
 * @returns {Promise<boolean>} True if the tooltip text matches, false otherwise.
 */
export async function checkTooltip(page, elementId, expectedText) {
  const tooltipMatches = await page.evaluate(
    ({ id, text }) => {
      const element = document.getElementById(id);
      if (!element) return false;
      const annotations = element.querySelectorAll('sa11y-annotation');
      return Array.from(annotations).some((annotation) =>
        annotation.getAttribute('data-content')?.includes(text),
      );
    },
    { id: elementId, text: expectedText },
  );
  return tooltipMatches;
}

/**
 * Wait until Sa11y has finished its current check and painted the results.
 *
 * resetAll() sets window.sa11yCheckComplete to null when a check starts, and
 * updateResults() sets it again once results, annotations and panel counts
 * are in place. Call this after page.goto(), or after a click that re-runs the
 * checks (main toggle, dismiss, restore, readability/developer toggles).
 * After a click that does not re-run checks it simply resolves immediately.
 * @param {page} page Page provides methods to interact with a single tab.
 */
export async function waitForCheckComplete(page) {
  await page.waitForFunction(() => Boolean(window.sa11yCheckComplete));
}

/**
 * Check to ensure there's no annotation!
 * @param {class} page Page provides methods to interact with a single tab.
 * @param {selector} elementId The ID on the test page.
 */
export async function noAnnotation(page, elementId) {
  const result = await page.evaluate((id) => {
    const element = document.getElementById(id);
    if (!element) return false;
    const annotation = element.querySelector('sa11y-annotation');
    return !annotation; // Return true if annotation is absent.
  }, elementId);
  return result;
}
