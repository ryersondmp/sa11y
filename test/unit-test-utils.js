/**
 * Check contents of tooltip.
 * @param {page} page Page provides methods to interact with a single tab.
 * @param {string} elementId The ID on the test page.
 * @param {string} expectedText The expected tooltip message.
 * @returns {Promise<boolean>} True if the tooltip text matches, false otherwise.
 */
export async function checkTooltip(page, elementId, expectedText) {
  const tooltipMatches = await page.evaluate(({ id, text }) => {
    const element = document.getElementById(id);
    if (!element) return false;
    const annotations = element.querySelectorAll('sa11y-annotation');
    let foundMatch = false;
    annotations.forEach((annotation) => {
      const message = annotation?.getAttribute('data-content');
      if (message && message.includes(text)) {
        foundMatch = true;
      }
    });
    return foundMatch;
  }, { id: elementId, text: expectedText });
  return tooltipMatches;
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