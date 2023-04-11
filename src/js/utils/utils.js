/**
 * Utility: Checks whether the document has finished loading.
 * @param {Function} callback - The function to execute once the document has finished loading.
 */
export function documentLoadingCheck(callback) {
  if (document.readyState === 'complete') {
    callback();
  } else {
    window.addEventListener('load', callback);
  }
}

/**
 * Utility: Check if element is hidden (display: none) OR visually hidden (.sr-only)
 * @param  {Node} element Node to test.
 * @return {Boolean} boolean.
*/
export function isElementVisuallyHiddenOrHidden(element) {
  if (element.getAttribute('hidden') || (element.offsetWidth === 0 && element.offsetHeight === 0) || (element.clientHeight === 1 && element.clientWidth === 1)) {
    return true;
  }
  const compStyles = getComputedStyle(element);
  return compStyles.getPropertyValue('display') === 'none';
}

/**
 * Utility: Check if element is hidden.
 * @param  {Node} element The element.
 * @return {Boolean}
*/
export function isElementHidden(element) {
  if (element.getAttribute('hidden') || (element.offsetWidth === 0 && element.offsetHeight === 0)) {
    return true;
  }
  const compStyles = getComputedStyle(element);
  return compStyles.getPropertyValue('display') === 'none';
}

/**
 * Utility: Escape HTML, encode HTML symbols.
 * @param  {String} string  The user-submitted string.
 * @return {String} string The encoded string.
*/
export function escapeHTML(string) {
  const $div = document.createElement('div');
  $div.textContent = string;
  return $div.innerHTML.replaceAll('"', '&quot;').replaceAll("'", '&#039;').replaceAll('`', '&#x60;');
}

/**
 * Utility: Sanitize and encode all HTML in a user-submitted string
 * @link https://portswigger.net/web-security/cross-site-scripting/preventing
 * @param  {String} string  The user-submitted string.
 * @return {String} string  The sanitized string.
*/
export function sanitizeHTML(string) {
  return string.replace(/[^\w. ]/gi, (c) => `&#${c.charCodeAt(0)};`);
}

/**
 * Utility: Replace newlines and double spaces with a single space.
 * @param {Node} element
 * @return {String} Returns plain text string.
*/
export function getText(element) {
  return element.textContent.replace(/[\n\r]+|[\s]{2,}/g, ' ').trim();
}

/**
 * Utility: Compute alt text on images within a text node.
 * @param  {Node} element  Element to check.
 * @return {String} str  Return text back.
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
 * Utility: Debounce
 * @link https://www.joshwcomeau.com/snippets/javascript/debounce/
 * @callback callback
 * @argument {wait}
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
 * Utility: Used to ignore child elements within an anchor.
 * @param  {Node} element  Element to target.
 * @param  {Node} selector Element to ignore.
 * @return {Node} Returns back element excluding the ignored node.
*/
export function fnIgnore(element, selector) {
  const $clone = element.cloneNode(true);
  const $exclude = Array.from(selector ? $clone.querySelectorAll(selector) : $clone.children);
  $exclude.forEach(($c) => {
    $c.parentElement.removeChild($c);
  });
  return $clone;
}

/**
 * Utility: Compute accessible name for elements with ARIA.
 * @param  {Node} element  Element to target.
 * @return {String} Returns a string back with the computed accessible name.
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
 * Utility: Find visible parent of hidden element.
 * @param  {Node} element  Element to target.
 * @param  {String} property  CSS property. E.g. 'display'
 * @param  {String} value CSS value. E.g. 'none'
 * @return {Node} Returns parent node of element that is visible.
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
 * Utility: Calculate top of element.
 * @param  {Node} element  Element to target.
 * @return {Number} Returns number greater than 0!
*/
export function offsetTop(element) {
  const rect = element.getBoundingClientRect();
  const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
  return {
    top: rect.top + scrollTop,
  };
}

/**
 * Utility: Local storage with fall back to session storage.
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
 * Utility: Add & remove pulsing border for wayfinding.
 * @param  {Node} element Element to add border too.
*/
export function addPulse(element) {
  const border = 'data-sa11y-pulse-border';
  element.setAttribute(border, '');
  setTimeout(() => {
    element.removeAttribute(border);
  }, 2500);
}

/**
 * Utility: Get next sibling of an element that matches a selector.
 * @param {Node} element The node to start from.
 * @param {String} selector The element you are looking for.
 * @return {Node} Return.
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
 * Utility: Prepare dismiss key.
 * @param {String} string The node to start from.
 * @return {String} Returns 256 character string without spaces.
*/
export function prepareDismissal(string) {
  return String(string).substring(0, 256);
}

/**
 * Utility: Generate CSS selector path of element. Only traverses one level deep. Replace with proper library if needed.
 * @param {Node} element the element's node.
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
 * Utility: Trap focus of elements within a contained area.
 * @param {String} element The element where you'd like to trap keyboard focus.
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
 * Utility: Call this function without any parameters to remove any alerts in the panel.
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
 * Utility: Send an alert to main panel.
 * @param  {String} alertMessage The message you'd to show in the alert.
 * @param  {String} errorPreview An optional secondary message or preview of the element.
*/
export function createAlert(alertMessage, errorPreview) {
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
  }, 500);

  // Closing alert sets focus back to Skip to Issue toggle.
  alertClose.addEventListener('click', () => {
    removeAlert();
    skipButton.focus();
  });
}
