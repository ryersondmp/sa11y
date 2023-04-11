import Constants from './constants';

/**
* Find elements.
  * @param {Selector} selector: Element you would like to find.
  * @param {String} rootElement: Select which root to search(document/readabilityRoot/root).
  * @param {String} exclude: Elements you want to ignore.
  * @return {Array} Returns array of elements.
*/
export default function find(selector, desiredRoot, exclude) {
  let root;
  if (desiredRoot === 'document') {
    root = document;
  } else if (desiredRoot === 'readability') {
    root = Constants.Readability.Root;
    if (!root) root = Constants.Global.Root;
  } else if (desiredRoot === 'root') {
    root = Constants.Global.Root;
    if (!root) root = document.body;
  } else {
    root = document.querySelector(desiredRoot);
    if (!root) root = document.body;
  }

  const shadowComponents = Constants.Shadow.Components;
  const shadow = (shadowComponents) ? `, ${shadowComponents}` : '';

  const exclusions = Constants.Exclusions.Container;
  const additional = (exclude !== undefined) ? `, ${exclude}` : '';

  /* Logic yoinked from Editoria11y */
  // 1. Elements array includes web components in the selector to be used as a placeholder.
  const elements = Array.from(root.querySelectorAll(`:is(${selector}${shadow}):not(${exclusions}${additional})`));

  if (shadowComponents.length) {
    // 2. Dive into the each shadow root and collect an array of its results.
    const shadowFind = [];
    // Remove first comma and whitespace.
    const prepShadow = shadowComponents.trim().replace(/^,+/, '');
    elements.forEach((el, i) => {
      if (el.matches(prepShadow)) {
        shadowFind[i] = el.shadowRoot.querySelectorAll(`:is(${selector}):not(${exclusions}${additional})`);
      }
    });
    // 3. Replace the placeholder with any hits found in the shadow root.
    if (shadowFind.length > 0) {
      for (let index = shadowFind.length - 1; index >= 0; index--) {
        if (shadowFind[index]) {
          elements.splice(index, 1, ...shadowFind[index]);
        }
      }
    }
  }

  // 4. Return the cleaned up array.
  return elements;
}
