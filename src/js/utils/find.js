import Constants from './constants';

/**
 * Finds elements in the DOM that match the given selector, within the specified root element, and excluding any specified elements.
 * @param {string} selector - The CSS selector to match elements against.
 * @param {string} desiredRoot - The root element to start the search from. Can be one of 'document', 'readability', 'heading', 'check', or a custom selector for the desired root element.
 * @param {string} exclude - Elements to exclude from the search, specified as a CSS selector (optional).
 * @returns {Array} - An array of elements that match the given selector.
 */
export default function find(selector, desiredRoot, exclude) {
  let root = [];
  if (desiredRoot === 'document') {
    root.push(document);
  } else if (desiredRoot === 'readability') {
    root.push(Constants.Readability.Root);
    if (!root) root = Constants.Root.find((x) => x !== undefined);
  } else if (desiredRoot === 'root') {
    root = Constants.Root;
  } else if (desiredRoot === 'panel') {
    root = Constants.Panel.panel;
  } else {
    root = document.querySelectorAll(desiredRoot);
  }
  if (root.length === 0) {
    root = [document.body];
  }

  // Exclusions are returned as an array & need to become a string for selector.
  const exclusions = Constants.Exclusions.Container.join(', ');
  // @todo Merge discuss: the next line. You can't join a string type.
  const additionalExclusions = exclude?.join(', ') || '';

  // Ensure no trailing commas.
  const additional = additionalExclusions ? `, ${additionalExclusions}` : '';
  let list = [];
  root?.forEach((r) => {
    const shadowComponents = r?.querySelectorAll('[data-sa11y-has-shadow-root]');
    const shadow = shadowComponents ? ', [data-sa11y-has-shadow-root]' : '';

    /* Logic yoinked from Editoria11y */
    // 1. Elements array includes web components in the selector to be used as a placeholder.
    const elements = Array.from(r.querySelectorAll(`:is(${selector}${shadow}):not(${exclusions}${additional})`));
    if (shadowComponents.length) {
      // 2. Dive into each shadow root and collect an array of its results.
      const shadowFind = [];
      elements.forEach((el, i) => {
        if (el && el.matches && el.matches('[data-sa11y-has-shadow-root]') && el.shadowRoot) {
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
    list = list.concat(elements.filter((node) => node.parentNode.tagName !== 'SLOT'));
  });

  // 4. Return the cleaned up array, filtering out <slot> placeholders.
  return list;
}
