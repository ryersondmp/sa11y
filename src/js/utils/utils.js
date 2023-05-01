import find from './find';

/**
 * Checks if the document has finished loading, and if so, immediately calls the provided callback function. Otherwise, waits for the 'load' event to fire and then calls the callback function.
 * @param {function} callback - The callback function to be called when the document finishes loading.
 */
export function documentLoadingCheck(callback) {
  if (document.readyState === 'complete') {
    callback();
  } else {
    window.addEventListener('load', callback);
  }
}

/**
 * Checks if an element is visually hidden or hidden based on its attributes and styles.
 * @param {HTMLElement} element - The element to check for visibility.
 * @returns {boolean} - `true` if the element is visually hidden or hidden, `false` otherwise.
 */
export function isElementVisuallyHiddenOrHidden(element) {
  if (element.getAttribute('hidden') || (element.offsetWidth === 0 && element.offsetHeight === 0) || (element.clientHeight === 1 && element.clientWidth === 1)) {
    return true;
  }
  const compStyles = getComputedStyle(element);
  return compStyles.getPropertyValue('display') === 'none';
}

/**
 * Checks if an element is hidden based on its attributes and styles.
 * @param {HTMLElement} element - The element to check for visibility.
 * @returns {boolean} - `true` if the element is hidden, `false` otherwise.
 */
export function isElementHidden(element) {
  if (element.getAttribute('hidden') || (element.offsetWidth === 0 && element.offsetHeight === 0)) {
    return true;
  }
  const compStyles = getComputedStyle(element);
  return compStyles.getPropertyValue('display') === 'none';
}

/**
 * Escapes HTML special characters in a string.
 * @param {string} string - The string to escape.
 * @returns {string} - The escaped string with HTML special characters replaced by their corresponding entities.
 */
export function escapeHTML(string) {
  const $div = document.createElement('div');
  $div.textContent = string;
  return $div.innerHTML.replaceAll('"', '&quot;').replaceAll("'", '&#039;').replaceAll('`', '&#x60;');
}

/**
 * Sanitizes an HTML string by replacing special characters with their corresponding HTML entities.
 * @param {string} string - The HTML string to sanitize.
 * @returns {string} - The sanitized HTML string with special characters replaced by their corresponding entities.
 * @link https://portswigger.net/web-security/cross-site-scripting/preventing
 */
export function sanitizeHTML(string) {
  return string.replace(/[^\w. ]/gi, (c) => `&#${c.charCodeAt(0)};`);
}

/**
 * Retrieves the text content of an HTML element and removes extra whitespaces and line breaks.
 * @param {HTMLElement} element - The HTML element to retrieve the text content from.
 * @returns {string} - The text content of the HTML element with extra whitespaces and line breaks removed.
 */
export function getText(element) {
  return element.textContent.replace(/[\n\r]+|[\s]{2,}/g, ' ').trim();
}

/**
 * Compute alt text on images within a text node.
 * @param {HTMLElement} element - The HTML element to compute the text content from.
 * @returns {string} - The computed text content of the HTML element, considering alt text of images if present.
 */
export function computeTextNodeWithImage(element) {
  const textContent = getText(element);
  const imgArray = Array.from(element.querySelectorAll('img'));
  let returnText = '';
  // No image, has text.
  if (imgArray.length === 0 && textContent.length > 1) {
    returnText = textContent;
  } else if (imgArray.length && textContent.length === 0) {
    // Has image.
    const imgalt = imgArray[0].getAttribute('alt');
    if (!imgalt || imgalt === ' ' || imgalt === '') {
      returnText = '';
    } else if (imgalt !== undefined) {
      returnText = imgalt;
    }
  } else if (imgArray.length && textContent.length) {
    // Has image and text.
    // To-do: This is a hack? Any way to do this better?
    imgArray.forEach((img) => {
      img.insertAdjacentHTML('afterend', ` <span data-sa11y-clone-image-text aria-hidden="true">${imgArray[0].getAttribute('alt')}</span>`);
    });
    returnText = textContent;
  }
  return returnText;
}

/**
 * Debounces a callback function, ensuring it is only executed after a certain wait period
 * has passed since the last invocation.
 * @param {function} callback - The callback function to debounce.
 * @param {number} wait - The wait period in milliseconds before the callback function is executed.
 * @returns {function} - The debounced function.
 * @link https://www.joshwcomeau.com/snippets/javascript/debounce/
 */
export function debounce(callback, wait) {
  let timeoutId = null;
  return (...args) => {
    window.clearTimeout(timeoutId);
    timeoutId = window.setTimeout(() => {
      callback(...args);
    }, wait);
  };
}

/**
 * Creates a clone of an element while ignoring specified elements or elements matching a selector.
 * @param {Element} element - The element to clone.
 * @param {string} selector - The selector to match elements to be excluded from the clone. Optional.
 * @returns {Element} - The cloned element with excluded elements removed.
 */
export function fnIgnore(element, selector) {
  const defaultIgnored = 'noscript, script, style';
  const ignore = (!selector) ? defaultIgnored : `${defaultIgnored}, ${selector}`;
  const clone = element.cloneNode(true);
  const exclude = Array.from(clone.querySelectorAll(ignore));
  exclude.forEach((c) => {
    c.parentElement.removeChild(c);
  });
  return clone;
}

/**
 * Computes the accessible name of an element based on various aria-* attributes.
 * @param {Element} element - The element for which the accessible name needs to be computed.
 * @returns {string} - The computed accessible name of the element.
 */
export function computeAccessibleName(element) {
  // aria-label
  if (element.matches('[aria-label]')) {
    return element.getAttribute('aria-label');
  }

  // aria-labeledby
  if (element.matches('[aria-labelledby]')) {
    const target = element.getAttribute('aria-labelledby').split(/\s+/);
    if (target.length > 0) {
      let returnText = '';
      target.forEach((x) => {
        const targetSelector = document.querySelector(`#${CSS.escape(x)}`);
        if (targetSelector === null) {
          returnText += ' ';
        } else if (targetSelector.hasAttribute('aria-label')) {
          returnText += `${targetSelector.getAttribute('aria-label')}`;
        } else {
          returnText += `${targetSelector.firstChild.nodeValue} `;
        }
      });
      return returnText;
    }
  }

  // Child with aria-label
  if (Array.from(element.children).filter((x) => x.matches('[aria-label]')).length > 0) {
    const child = Array.from(element.childNodes);
    let returnText = '';

    // Process each child within node.
    child.forEach((x) => {
      if (x.nodeType === 1) {
        // Ignore HTML comments and make sure label is not null.
        if (x.nodeType === 3 || x.ariaLabel === null) {
          returnText += x.innerText;
        } else {
          returnText += x.getAttribute('aria-label');
        }
      } else {
        returnText += x.nodeValue;
      }
    });
    return returnText;
  }

  // Child with aria-labelledby
  if (Array.from(element.children).filter((x) => x.matches('[aria-labelledby]')).length > 0) {
    const child = Array.from(element.childNodes);
    let returnText = '';

    // Process each child within node.
    child.forEach((y) => {
      if (y.nodeType === 8) {
        // Ignore HTML comments and make sure label is not null.
      } else if (y.nodeType === 3 || y.getAttribute('aria-labelledby') === null) {
        returnText += y.nodeValue;
      } else {
        const target = y.getAttribute('aria-labelledby').split(/\s+/);
        if (target.length > 0) {
          let returnAria = '';
          target.forEach((z) => {
            if (document.querySelector(`#${CSS.escape(z)}`) === null) {
              returnAria += ' ';
            } else {
              returnAria += `${document.querySelector(`#${CSS.escape(z)}`).firstChild.nodeValue} `;
            }
          });
          returnText += returnAria;
        }
      }
    });
    return returnText;
  }

  // Return if noAria;
  return 'noAria';
}

/**
 * Finds the visible parent of an element that matches a given CSS property and value.
 * @param {Element} element - The element for which the visible parent needs to be found.
 * @param {string} property - The CSS property to match against.
 * @param {string} value - The value of the CSS property to match against.
 * @returns {Element|null} - The visible parent element that matches the given property and value, or null if not found.
 */
export function findVisibleParent(element, property, value) {
  let $el = element;
  while ($el !== null) {
    const style = window.getComputedStyle($el);
    const propValue = style.getPropertyValue(property);
    if (propValue === value) {
      return $el;
    }
    $el = $el.parentElement;
  }
  return null;
}

/**
 * Calculates the offset top of an element relative to the viewport.
 * @param {Element} element - The element for which the offset top needs to be calculated.
 * @returns {Object} - An object with a `top` property that represents the offset top of the element relative to the viewport.
 */
export function offsetTop(element) {
  const rect = element.getBoundingClientRect();
  const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
  return {
    top: rect.top + scrollTop,
  };
}

/**
 * A utility object for handling storage operations using localStorage and sessionStorage.
 * @param  {String} key
 * @param  {string} value
 * @return {String} Return key.
*/
export const store = {
  getItem(key) {
    try {
      if (localStorage.getItem(key) === null) {
        return sessionStorage.getItem(key);
      }
      return localStorage.getItem(key);
    } catch (error) {
      // Cookies totally disabled.
      return false;
    }
  },
  setItem(key, value) {
    try {
      localStorage.setItem(key, value);
    } catch (error) {
      sessionStorage.setItem(key, value);
    }
    return true;
  },
  removeItem(key) {
    try {
      localStorage.removeItem(key);
    } catch (error) {
      sessionStorage.removeItem(key);
    }
    return true;
  },
};

/**
 * Adds a pulsing border effect to an element for 2.5 seconds.
 * @param {Element} element - The element to which the pulsing border effect needs to be added.
 */
export function addPulse(element) {
  const border = 'data-sa11y-pulse-border';
  element.setAttribute(border, '');
  setTimeout(() => {
    element.removeAttribute(border);
  }, 2500);
}

/**
 * Gets the next sibling element that matches the given selector, or the next sibling element if no selector is provided.
 * @param {HTMLElement} element - The DOM element whose next sibling to retrieve.
 * @param {string} selector - The optional selector to filter the next siblings. If not provided, the next sibling element will be returned regardless of its type.
 * @returns {HTMLElement|string} - The next sibling element that matches the given selector, or the next sibling element if no selector is provided. If no matching sibling is found, an empty string is returned.
 */
export function getNextSibling(element, selector) {
  let sibling = element.nextElementSibling;
  if (!selector) return sibling;
  while (sibling) {
    if (sibling.matches(selector)) return sibling;
    sibling = sibling.nextElementSibling;
  }
  return '';
}

/**
 * Generates a unique key for dismissing items.
 * @param {string} string - The string to be prepared for dismissal (without special chars).
 * @returns {string} - The truncated string with a maximum of 256 characters.
 */
export function prepareDismissal(string) {
  return String(string).replace(/([^0-9a-zA-Z])/g, '').substring(0, 256);
}

/**
 * Generates a selector path for the given DOM element.
 * @param {Element} element - The DOM element for which to generate the selector path.
 * @returns {string} - The selector path as a string.
 * @link https://www.geeksforgeeks.org/how-to-create-a-function-generateselector-to-generate-css-selector-path-of-a-dom-element/
 * @link https://dev.to/aniket_chauhan/generate-a-css-selector-path-of-a-dom-element-4aim
*/
export function generateSelectorPath(element) {
  const path = [];
  let currElement = element;
  while (currElement) {
    let selector = currElement.localName;
    if (currElement.id) {
      selector += `#${currElement.id}`;
      path.unshift(selector);
      break;
    } else if (currElement.className) {
      selector += `.${currElement.className.replace(/\s+/g, '.')}`;
    }
    const parentElement = currElement.parentNode;
    if (parentElement) {
      const siblings = parentElement.children;
      if (siblings.length > 1) {
        const index = Array.prototype.indexOf.call(siblings, currElement) + 1;
        selector += `:nth-child(${index})`;
      }
      path.unshift(selector);
    } else {
      break;
    }
    currElement = currElement.parentNode.host || currElement.parentNode;
  }
  return path.join(' > ');
}

/**
 * Traps focus within an element by looping focus back to the beginning or end
 * when the Tab key is pressed.
 * @param {Element} element - The DOM element to trap focus within.
 * @author Hidde de Vries
 * @link https://hidde.blog/using-javascript-to-trap-focus-in-an-element/
*/
export function trapFocus(element) {
  const focusable = element.querySelectorAll('a[href]:not([disabled]), button:not([disabled])');
  const firstFocusable = focusable[0];
  const lastFocusable = focusable[focusable.length - 1];
  element.addEventListener('keydown', (e) => {
    const isTabPressed = (e.key === 'Tab' || e.keyCode === 9);

    // "document.activeElement" does not work within ShadowDOM.
    const root = element.getRootNode();

    if (!isTabPressed) return;
    if (e.shiftKey) {
      if (root.activeElement === firstFocusable) {
        lastFocusable.focus();
        e.preventDefault();
      }
    } else if (root.activeElement === lastFocusable) {
      firstFocusable.focus();
      e.preventDefault();
    }
  });
}

/**
 * Removes the alert from the Sa11y control panel by clearing its content and removing CSS classes.
 * @description This function clears the content of the alert element and removes CSS classes 'active' from the main alert element, and 'panel-alert-preview' from the alert preview element.
 * @returns {void}
 */
export function removeAlert() {
  const Sa11yPanel = document.querySelector('sa11y-control-panel').shadowRoot;
  const alert = Sa11yPanel.getElementById('panel-alert');
  const alertText = Sa11yPanel.getElementById('panel-alert-text');
  const alertPreview = Sa11yPanel.getElementById('panel-alert-preview');

  alert.classList.remove('active');
  alertPreview.classList.remove('panel-alert-preview');
  while (alertText.firstChild) alertText.removeChild(alertText.firstChild);
  while (alertPreview.firstChild) alertPreview.removeChild(alertPreview.firstChild);
}

/**
 * Creates an alert in the Sa11y control panel with the given alert message and error preview.
 * @param {string} alertMessage - The alert message to be displayed.
 * @param {string} errorPreview - The error preview to be displayed (optional).
 * @returns {void}
 */
export function createAlert(alertMessage, errorPreview) {
  // Clear alert first before creating new one.
  removeAlert();

  // Constants
  const Sa11yPanel = document.querySelector('sa11y-control-panel').shadowRoot;
  const alert = Sa11yPanel.getElementById('panel-alert');
  const alertText = Sa11yPanel.getElementById('panel-alert-text');
  const alertPreview = Sa11yPanel.getElementById('panel-alert-preview');
  const alertClose = Sa11yPanel.getElementById('close-alert');
  const skipButton = Sa11yPanel.getElementById('skip-button');

  alert.classList.add('active');
  alertText.innerHTML = alertMessage;
  if (errorPreview) {
    alertPreview.classList.add('panel-alert-preview');
    alertPreview.innerHTML = errorPreview;
  }
  setTimeout(() => {
    alertClose.focus();
  }, 300);

  // Closing alert sets focus back to Skip to Issue toggle.
  alertClose.addEventListener('click', () => {
    removeAlert();
    if (skipButton.hasAttribute('disabled')) {
      Sa11yPanel.getElementById('toggle').focus();
    } else {
      skipButton.focus();
    }
  });
}

/**
 * Finds all data-attributes specified in array, and removes them from the document.
 * @param {Array<string>} attributes - The array of data-attributes to be reset.
 * @param {string} root - The root element to search for elements (optional, defaults to 'document').
 * @returns {void}
 */
export function resetAttributes(attributes, root) {
  attributes.forEach((attr) => {
    const reset = find(
      `[${attr}]`,
      `${root}`,
    );
    reset.forEach(($el) => {
      $el.removeAttribute(attr);
    });
  });
}

/**
 * Removes the specified elements from the document.
 * @param {string} root - The root element to search for elements (optional, defaults to 'document').
 * @returns {void}
 */
export function remove(elements, root) {
  const allElements = find(
    `${elements}`,
    `${root}`,
  );
  allElements.forEach(($el) => {
    $el.parentNode.removeChild($el);
  });
}

/**
 * Checks if a scrollable area within a container element is scrollable or not, and applies appropriate CSS classes and attributes. Make sure to add aria-label manually.
 * @param {Element} scrollArea - The scrollable area element to check.
 * @param {Element} container - The container element that wraps the scrollable area.
 */
export function isScrollable(scrollArea, container) {
  if (scrollArea.scrollHeight > container.clientHeight) {
    container.classList.add('scrollable');
    scrollArea.setAttribute('tabindex', '0');
  } else {
    container.classList.remove('scrollable');
  }
}
