/* eslint-disable no-use-before-define */

/* Get text content of pseudo elements. */
export const wrapPseudoContent = (element, string) => {
  const getAltText = (content) => {
    if (content === 'none') return '';
    const match = content.includes('url(') || content.includes('image-set(')
      ? content.match(/\/\s*"([^"]+)"/) // Content after slash, e.g. url('image.jpg') / "alt text";
      : content.match(/"([^"]+)"/); // Content between quotes, e.g. "alt text";
    return match ? match[1] : '';
  };
  const before = getAltText(window.getComputedStyle(element, ':before').getPropertyValue('content'));
  const after = getAltText(window.getComputedStyle(element, ':after').getPropertyValue('content'));
  return `${before}${string}${after}`;
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
    return labelledBy
      .split(/\s+/)
      .filter((id) => id.trim()) // Exclude empty IDs.
      .map((id) => {
        const targetElement = document.querySelector(`#${CSS.escape(id)}`);
        return targetElement ? computeAccessibleName(targetElement, '', 1) : '';
      }).join(' ');
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
export const computeAccessibleName = (element, exclusions = [], recursing = 0) => {
  // Return immediately if there is an aria label.
  const hasAria = computeAriaLabel(element, recursing);
  if (hasAria !== 'noAria') {
    return hasAria;
  }

  // Textarea with a title.
  if (element.tagName === 'TEXTAREA' && element.hasAttribute('title')) {
    return element.getAttribute('title');
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

  const alwaysExclude = ['noscript', 'style', 'script', 'video', 'audio'];

  // Combine exclusions and alwaysExclude arrays, ensuring no trailing commas.
  const validExclusions = exclusions && exclusions.length ? exclusions.join(', ') : '';
  const excludeSelector = [...(validExclusions ? [validExclusions] : []), ...alwaysExclude].join(', ');

  // Use the excludeSelector in querySelectorAll
  const exclude = element.querySelectorAll(excludeSelector);

  while (treeWalker.nextNode() && shouldContinueWalker) {
    count += 1;

    // Exclusions.
    const currentNodeMatchesExclude = Array.from(exclude).some((excludedNode) => excludedNode.contains(treeWalker.currentNode));

    if (currentNodeMatchesExclude) {
      // Exclude noscript, style, script, and selectors via exclusions param.
    } else if (treeWalker.currentNode.nodeType === Node.TEXT_NODE) {
      if (treeWalker.currentNode.parentNode.tagName !== 'SLOT') {
        computedText += ` ${treeWalker.currentNode.nodeValue}`;
      }
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
            if (treeWalker.currentNode.hasAttribute('role') === 'img' || treeWalker.currentNode.hasAttribute('role') === 'graphics-document') {
              computedText += computeAriaLabel(treeWalker.currentNode);
            } else {
              const title = treeWalker.currentNode.querySelector('title');
              if (title) {
                computedText += title;
              }
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
          case 'SLOT':
            if (treeWalker.currentNode.assignedNodes()) {
              // Slots have specific shadow DOM methods.
              const children = treeWalker.currentNode.assignedNodes();
              let slotText = '';
              children?.forEach((child) => {
                if (child.nodeType === Node.ELEMENT_NODE) {
                  slotText += computeAccessibleName(child);
                } else if (child.nodeType === Node.TEXT_NODE) {
                  slotText += child.nodeValue;
                }
              });
              computedText += slotText;
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
