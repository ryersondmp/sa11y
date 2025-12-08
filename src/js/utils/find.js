import Constants from './constants';

/**
 * Finds elements in the DOM that match the given selector, within the specified root element, and excluding any specified elements.
 * @param {string} selector - The CSS selector to match elements against.
 * @param {string} desiredRoot - The root element to start the search from. Can be one of 'document', 'root', or a custom selector for the desired root element.
 * @param {string} exclude - Elements to exclude from the search, specified as a CSS selector (optional).
 * @returns {Array} - An array of elements that match the given selector.
 * @credits Logic yoinked from Editoria11y.
 */
export default function find(selector, desiredRoot, exclude) {
  const root = [];
  if (desiredRoot === 'document') {
    root.push(document.body);
    if (Constants.Global.fixedRoots) {
      root.push(Constants.Global.fixedRoots);
    }
  } else if (desiredRoot === 'root') {
    root.push(Constants.Root.areaToCheck);
  } else {
    root.push(document.querySelectorAll(desiredRoot));
  }

  // Exclusions are returned as an array & need to become a string for selector.
  const exclusions = Constants.Exclusions.Container.join(', ');
  const additionalExclusions = exclude?.join(', ') || '';

  // Ensure no trailing commas.
  const additional = additionalExclusions ? `, ${additionalExclusions}` : '';

  let list = [];
  root
    .flat()
    .filter(Boolean)
    ?.forEach((r) => {
      const shadowComponents = r?.querySelectorAll('[data-sa11y-has-shadow-root]');
      const shadow = shadowComponents ? ', [data-sa11y-has-shadow-root]' : '';

      // 1. Elements array includes web components in the selector to be used as a placeholder.
      const elements = Array.from(
        r.querySelectorAll(`:is(${selector}${shadow}):not(${exclusions}${additional})`),
      );
      if (shadowComponents.length) {
        // 2. Dive into each shadow root and collect an array of its results.
        const shadowFind = [];
        elements.forEach((el, i) => {
          if (el?.matches?.('[data-sa11y-has-shadow-root]') && el?.shadowRoot) {
            shadowFind[i] = el.shadowRoot.querySelectorAll(
              `:is(${selector}):not(${exclusions}${additional})`,
            );
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
