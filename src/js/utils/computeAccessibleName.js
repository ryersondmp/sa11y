/* eslint-disable no-use-before-define */

/* Get text content of pseudo elements. */
export const wrapPseudoContent = (element, string) => {
  const pseudo = [];
  pseudo[0] = window.getComputedStyle(element, ':before').getPropertyValue('content');
  pseudo[1] = window.getComputedStyle(element, ':after').getPropertyValue('content');
  pseudo[0] = pseudo[0] === 'none' ? '' : pseudo[0].replace(/^"(.*)"$/, '$1');
  pseudo[1] = pseudo[1] === 'none' ? '' : pseudo[1].replace(/^"(.*)"$/, '$1');
  return ` ${pseudo[0]}${string}${pseudo[1]}`;
};

/* Sets treeWalker loop to last node before next branch. */
const nextTreeBranch = (tree) => {
  for (let i = 0; i < 1000; i++) {
    if (tree.nextSibling()) {
      // Prepare for continue to advance.
      return tree.previousNode();
    }
    // Next node will be in next branch.
    if (!tree.parentNode()) {
      return false;
    }
  }
  return false;
};

/* Compute ARIA attributes. */
export const computeAriaLabel = (element, recursing = false) => {
  const labelledBy = element.getAttribute('aria-labelledby');
  if (!recursing && labelledBy) {
    const target = labelledBy.split(/\s+/);
    if (target.length > 0) {
      let returnText = '';
      target.forEach((x) => {
        const targetSelector = document.querySelector(`#${CSS.escape(x)}`);
        returnText += (!targetSelector) ? '' : `${computeAccessibleName(targetSelector, '', 1)}`;
      });
      return returnText;
    }
  }

  const ariaLabel = element.getAttribute('aria-label');
  if (ariaLabel && ariaLabel.trim().length > 0) {
    return ariaLabel;
  }
  return 'noAria';
};

/**
 * Computes the accessible name of an element.
 * @param {Element} element The element for which the accessible name needs to be computed.
 * @param {String} exclusions List of selectors which will be ignored.
 * @param {Number} recursing Recursion depth.
 * @returns {string} The computed accessible name of the element.
 * @kudos to John Jameson, creator of the Editoria11y library, for developing this more robust calculation!
 * @notes Uses a subset of the W3C accessible name algorithm.
*/
export const computeAccessibleName = (element, exclusions, recursing = 0) => {
  // Return immediately if there is an aria label.
  const hasAria = computeAriaLabel(element, recursing);
  if (hasAria !== 'noAria') {
    return hasAria;
  }

  // Return immediately if there is only a text node.
  let computedText = '';
  if (!element.children.length) {
    // Just text! Output immediately.
    computedText = wrapPseudoContent(element, element.textContent);
    if (!computedText.trim() && element.hasAttribute('title')) {
      return element.getAttribute('title');
    }
    return computedText;
  }

  // Create tree walker object.
  function createCustomTreeWalker(rootNode, showElement, showText) {
    const acceptNode = (node) => {
      if (showElement && node.nodeType === Node.ELEMENT_NODE) return NodeFilter.FILTER_ACCEPT;
      if (showText && node.nodeType === Node.TEXT_NODE) return NodeFilter.FILTER_ACCEPT;
      return NodeFilter.FILTER_REJECT;
    };
    return document.createTreeWalker(rootNode, NodeFilter.SHOW_ALL, { acceptNode });
  }
  const treeWalker = createCustomTreeWalker(element, true, true);

  // Otherwise, recurse into children.
  let addTitleIfNoName = false;
  let aText = false;
  let count = 0;
  let shouldContinueWalker = true;

  const alwaysExclude = 'noscript, style, script';
  const exclude = element.querySelectorAll(exclusions ? `${exclusions}, ${alwaysExclude}` : alwaysExclude);

  while (treeWalker.nextNode() && shouldContinueWalker) {
    count += 1;

    // Exclusions.
    const currentNodeMatchesExclude = Array.from(exclude).some((excludedNode) => excludedNode.contains(treeWalker.currentNode));

    if (currentNodeMatchesExclude) {
      // Exclude noscript, style, script, and selectors via exclusions param.
    } else if (treeWalker.currentNode.nodeType === Node.TEXT_NODE) {
      computedText += ` ${treeWalker.currentNode.nodeValue}`;
    } else if (addTitleIfNoName && !treeWalker.currentNode.closest('a')) {
      if (aText === computedText) {
        computedText += addTitleIfNoName;
      }
      addTitleIfNoName = false;
      aText = false;
    } else if (treeWalker.currentNode.hasAttribute('aria-hidden') && !(recursing && count < 3)) {
      if (!nextTreeBranch(treeWalker)) shouldContinueWalker = false;
    } else {
      const aria = computeAriaLabel(treeWalker.currentNode, recursing);
      if (aria !== 'noAria') {
        computedText += ` ${aria}`;
        if (!nextTreeBranch(treeWalker)) shouldContinueWalker = false;
      } else {
        switch (treeWalker.currentNode.tagName) {
          case 'IMG':
            if (treeWalker.currentNode.hasAttribute('alt')) {
              computedText += treeWalker.currentNode.getAttribute('alt');
            }
            break;
          case 'SVG':
          case 'svg':
            if (treeWalker.currentNode.getAttribute('role') === 'image'
              && treeWalker.currentNode.hasAttribute('alt')) {
              computedText += wrapPseudoContent(
                treeWalker.currentNode, treeWalker.currentNode.getAttribute('alt'),
              );
              if (!nextTreeBranch(treeWalker)) shouldContinueWalker = false;
            }
            break;
          case 'A':
            if (treeWalker.currentNode.hasAttribute('title')) {
              addTitleIfNoName = treeWalker.currentNode.getAttribute('title');
              aText = computedText;
            } else {
              addTitleIfNoName = false;
              aText = false;
            }
            computedText += wrapPseudoContent(treeWalker.currentNode, '');
            break;
          default:
            computedText += wrapPseudoContent(treeWalker.currentNode, '');
            break;
        }
      }
    }
  }

  if (addTitleIfNoName && !aText) {
    computedText += ` ${addTitleIfNoName}`;
  }

  // Replace Private Use Area (PUA) unicode characters.
  // https://www.unicode.org/faq/private_use.html
  const puaRegex = /[\uE000-\uF8FF]/gu;
  computedText = computedText.replace(puaRegex, '');

  // If computedText returns blank, fallback on title attribute.
  if (!computedText.trim() && element.hasAttribute('title')) {
    return element.getAttribute('title');
  }

  return computedText;
};
