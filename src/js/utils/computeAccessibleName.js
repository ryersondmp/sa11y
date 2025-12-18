import Constants from './constants';

/* Get text content of pseudo elements. */
export const wrapPseudoContent = (element, string) => {
  const getAltText = (content) => {
    if (content === 'none') {
      return '';
    }
    const match =
      content.includes('url(') || content.includes('image-set(')
        ? content.match(/\/\s*"([^"]+)"/) // Content after slash, e.g. url('image.jpg') / "alt text";
        : content.match(/"([^"]+)"/); // Content between quotes, e.g. "alt text";
    return match ? match[1] : '';
  };
  const before = getAltText(
    window.getComputedStyle(element, ':before').getPropertyValue('content'),
  );
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
  // Ignore ARIA on these elements.
  if (
    Constants.Global.ignoreAriaOnElements &&
    element.matches(Constants.Global.ignoreAriaOnElements)
  ) {
    return 'noAria';
  }

  if (
    Constants.Global.ignoreTextInElements &&
    element.matches(Constants.Global.ignoreTextInElements)
  ) {
    return '';
  }

  const labelledBy = element.getAttribute('aria-labelledby');
  if (!recursing && labelledBy) {
    return labelledBy
      .split(/\s+/)
      .filter((id) => id.trim()) // Exclude empty IDs.
      .map((id) => {
        const targetElement = document.querySelector(`#${CSS.escape(id)}`);
        return targetElement ? computeAccessibleName(targetElement, '', 1) : '';
      })
      .join(' ');
  }

  const { ariaLabel } = element;
  if (ariaLabel && ariaLabel.trim().length > 0) {
    return ariaLabel;
  }
  return 'noAria';
};

/**
 * Compute the accessible name of an element.
 * Implements a subset of the W3C Accessible Name algorithm.
 * Based on John Jameson’s Editoria11y library.
 *
 * @param {Element} element Target element.
 * @param {string[]} exclusions CSS selectors to ignore.
 * @param {number} recursing Recursion depth.
 * @returns {string} Accessible name.
 */
export const computeAccessibleName = (element, exclusions = [], recursing = 0) => {
  // Return immediately if there is an aria label.
  const ariaLabel = computeAriaLabel(element, recursing);
  if (ariaLabel !== 'noAria') {
    return ariaLabel;
  }
  // Return immediately if there is only a text node.
  let computedText = '';
  if (!element.children.length) {
    computedText = wrapPseudoContent(element, element.textContent);
    if (!computedText.trim() && element.hasAttribute('title')) {
      return element.getAttribute('title');
    }
    return computedText;
  }

  // Create tree walker object.
  function createTreeWalker(root, showElement, showText) {
    const acceptNode = (node) => {
      if (showElement && node.nodeType === Node.ELEMENT_NODE) {
        return NodeFilter.FILTER_ACCEPT;
      }
      if (showText && node.nodeType === Node.TEXT_NODE) {
        return NodeFilter.FILTER_ACCEPT;
      }
      return NodeFilter.FILTER_REJECT;
    };
    return document.createTreeWalker(root, NodeFilter.SHOW_ALL, { acceptNode });
  }
  const treeWalker = createTreeWalker(element, true, true);

  // Exclusions
  const alwaysExclude = ['noscript', 'style', 'script', 'video', 'audio'];
  const excludeSelector = [...exclusions, ...alwaysExclude].join(', ');
  const exclude = excludeSelector ? element.querySelectorAll(excludeSelector) : [];

  // Recurse into children.
  let addTitleIfNoName = false;
  let aText = false;
  let count = 0;
  let continueWalker = true;

  while (treeWalker.nextNode() && continueWalker) {
    count += 1;
    const node = treeWalker.currentNode;
    const excluded = Array.from(exclude).some((ex) => ex.contains(node));

    // Matches exclusion.
    if (excluded) {
      continue;
    }

    // Inner nodes with shadowRoots.
    if (node.shadowRoot) {
      const shadowChildren = node.shadowRoot.querySelectorAll('*');
      for (let i = 0; i < shadowChildren.length; i++) {
        const child = shadowChildren[i];
        if (!excludeSelector || !child.closest(excludeSelector)) {
          computedText += computeAccessibleName(child, exclusions, recursing + 1);
        }
      }
    }

    // Return text from text nodes.
    if (node.nodeType === Node.TEXT_NODE) {
      if (node.parentNode.tagName !== 'SLOT') {
        computedText += ` ${node.nodeValue}`;
      }
      continue;
    }

    if (addTitleIfNoName && !node.closest('a')) {
      if (aText === computedText) {
        computedText += addTitleIfNoName;
      }
      addTitleIfNoName = false;
      aText = false;
    }

    if (node.ariaHidden === 'true' && !(recursing && count < 3)) {
      if (!nextTreeBranch(treeWalker)) {
        continueWalker = false;
      }
      continue;
    }

    const aria = computeAriaLabel(node, recursing);
    if (aria !== 'noAria') {
      computedText += ` ${aria}`;
      if (!nextTreeBranch(treeWalker)) {
        continueWalker = false;
      }
      continue;
    }

    switch (node.tagName) {
      case 'IMG':
        if (node.hasAttribute('alt') && node.role !== 'presentation') {
          computedText += node.getAttribute('alt');
        }
        break;
      case 'SVG':
        if (node.role === 'img' || node.role === 'graphics-document') {
          computedText += computeAriaLabel(node);
        } else {
          const title = node.querySelector('title');
          if (title) {
            computedText += title.textContent;
          }
        }
        break;
      case 'A':
        if (node.hasAttribute('title')) {
          addTitleIfNoName = node.getAttribute('title');
          aText = computedText;
        } else {
          addTitleIfNoName = false;
          aText = false;
        }
        computedText += wrapPseudoContent(node, '');
        break;
      case 'INPUT':
        computedText += wrapPseudoContent(treeWalker.currentNode, '');
        if (treeWalker.currentNode.hasAttribute('title')) {
          addTitleIfNoName = treeWalker.currentNode.getAttribute('title');
        }
        break;
      case 'SLOT': {
        const children = node.assignedNodes?.() || [];
        let slotText = '';
        children.forEach((child) => {
          if (child.nodeType === Node.ELEMENT_NODE) {
            slotText += computeAccessibleName(child);
          } else if (child.nodeType === Node.TEXT_NODE) {
            slotText += child.nodeValue;
          }
        });
        computedText += slotText;
        computedText += wrapPseudoContent(node, '');
        break;
      }
      default:
        computedText += wrapPseudoContent(node, '');
        break;
    }
  }

  if (addTitleIfNoName && !aText) {
    computedText += ` ${addTitleIfNoName}`;
  }

  // Replace Private Use Area (PUA) unicode characters.
  // https://www.unicode.org/faq/private_use.html
  computedText = computedText.replace(/[\uE000-\uF8FF]/gu, '');

  // If computedText returns blank, fallback on title attribute.
  if (!computedText.trim() && element.hasAttribute('title')) {
    return element.getAttribute('title');
  }

  return computedText;
};
