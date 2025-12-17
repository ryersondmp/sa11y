import find from './find';

/**
 * Checks if the document has finished loading, and if so, immediately calls the provided callback function. Otherwise, waits for the 'load' event to fire and then calls the callback function.
 * @param {function} callback The callback function to be called when the document finishes loading.
 */
export function documentLoadingCheck(callback) {
  if (document.readyState === 'complete') {
    callback();
  } else {
    window.addEventListener('load', callback);
  }
}

/**
 * Determine whether an element is visually hidden (e.g. .sr-only) based on computed properties.
 * @param {HTMLElement} element The element to check for.
 * @returns {boolean} Returns true if visually hidden based on properties.
 */
export function isScreenReaderOnly(element) {
  const style = getComputedStyle(element);

  // Modern technique: clip-path inset(50%).
  if (style.getPropertyValue('clip-path').startsWith('inset(50%)')) {
    return true;
  }

  // Legacy clipping.
  if (style.clip === 'rect(1px, 1px, 1px, 1px)' || style.clip === 'rect(0px, 0px, 0px, 0px)') {
    return true;
  }

  // Large text-indent offscreen.
  const indent = parseInt(style.textIndent, 10);
  if (!Number.isNaN(indent) && Math.abs(indent) > 5000) {
    return true;
  }

  // Tiny box offscreen.
  if (style.overflow === 'hidden' && parseFloat(style.width) < 2 && parseFloat(style.height) < 2) {
    return true;
  }

  // Absolute positioned far offscreen.
  if (
    style.position === 'absolute' &&
    ['left', 'right', 'top', 'bottom'].some((p) => Math.abs(parseInt(style[p], 10)) > 5000)
  ) {
    return true;
  }

  // Font size 1px or 0px.
  return parseFloat(style.fontSize) < 2;
}

/**
 * Checks if an element is hidden (display: none) based on its attributes and styles.
 * @param {HTMLElement} element The element to check for visibility.
 * @returns {boolean} 'true' if the element is hidden (display: none).
 */
export function isElementHidden(element) {
  return element.hidden || getComputedStyle(element).getPropertyValue('display') === 'none';
}

/**
 * Checks if an element is invisible in layout.
 * @param {HTMLElement} element The element to check for visibility.
 * @returns {boolean} `true` if the element is visually hidden or hidden, `false` otherwise.
 */
export function isElementVisuallyHiddenOrHidden(element) {
  if (
    (element.offsetWidth === 0 && element.offsetHeight === 0) ||
    (element.clientHeight === 1 && element.clientWidth === 1)
  ) {
    return true;
  }
  return isElementHidden(element);
}

/**
 * Escapes HTML special characters in a string.
 * @param {string} string The string to escape.
 * @returns {string} The escaped string with HTML special characters replaced by their corresponding entities.
 */
export function escapeHTML(string) {
  const div = document.createElement('div');
  div.textContent = string;
  return div.innerHTML
    .replaceAll('"', '&quot;')
    .replaceAll("'", '&#039;')
    .replaceAll('`', '&#x60;');
}

/**
 * Decodes/unescapes HTML entities back to their corresponding character.
 * @param {string} string The string.
 * @returns {string} Decoded string.
 */
export function decodeHTML(string) {
  return string.replace(/&(#?[a-zA-Z0-9]+);/g, (match, entity) => {
    switch (entity) {
      case 'amp':
        return '&';
      case 'lt':
        return '<';
      case 'gt':
        return '>';
      case 'quot':
        return "'";
      case '#39':
        return "'"; // Convert single quotes to actual single quotes.
      default:
        // For numeric entities, convert them back to the corresponding character.
        if (entity.charAt(0) === '#') {
          return String.fromCharCode(
            entity.charAt(1) === 'x'
              ? parseInt(entity.substr(2), 16)
              : parseInt(entity.substr(1), 10),
          );
        }
        return match;
    }
  });
}

/**
 * Strips HTML tags from a string.
 * @param {string} string The string.
 * @returns {string} String without any HTML tags.
 */
export function stripHTMLtags(string) {
  return string.replace(/<[^>]*>/g, '');
}

/**
 * Removes ALL non-alphanumeric characters and normalizes whitespace. Accounts for non-Latin characters.
 * @param {string} string - The input text to be sanitized.
 * @returns {string} The sanitized and trimmed string.
 */
export function stripAllSpecialCharacters(string) {
  return string
    .replace(/[^\p{L}\p{N}\s]/gu, '')
    .replace(/\s+/g, ' ')
    .trim();
}

/**
 * Sanitizes an HTML string by replacing special characters with their corresponding HTML entities.
 * @param {string} string The HTML string to sanitize.
 * @returns {string} The sanitized HTML string with special characters replaced by their corresponding entities.
 * @link https://portswigger.net/web-security/cross-site-scripting/preventing
 */
export function sanitizeHTML(string) {
  return string.replace(/[^\w. ]/gi, (c) => `&#${c.charCodeAt(0)};`);
}

/**
 * Sanitize links (e.g. href and src values).
 * @param {string} string The URL string to sanitize.
 * @returns {string} The sanitized URL if valid, or an empty string if invalid.
 */
export function sanitizeURL(string) {
  if (!string) return '#';
  const sanitizedInput = String(string).trim();

  // Remove protocols.
  if (/^javascript:/i.test(sanitizedInput)) return '#';
  if (/^data:/i.test(sanitizedInput)) return '#';

  // Ensure valid protocol.
  const protocols = ['http:', 'https:', 'mailto:', 'tel:', 'ftp:'];
  const hasValidProtocol = protocols.some((protocol) =>
    sanitizedInput.toLowerCase().startsWith(protocol),
  );

  // Assume relative URLs.
  if (!hasValidProtocol && !sanitizedInput.startsWith('/') && !sanitizedInput.startsWith('#')) {
    return `./${sanitizedInput}`;
  }

  // Remove any HTML tags.
  const cleanedString = sanitizedInput.replace(/<[^>]*>/g, '');
  return encodeURI(cleanedString);
}

/**
 * Sanitizes HTML by removing script tags, inline event handlers and any dangerous attributes. It returns a clean version of the HTML string.
 * @param {string} html The HTML string to sanitize.
 * @param {Boolean} allowStyles Preserve inline style attributes.
 * @returns {string} The sanitized HTML string.
 */
export function sanitizeHTMLBlock(html, allowStyles = false) {
  const tempDiv = document.createElement('div');
  tempDiv.innerHTML = html;

  // Remove blocks.
  ['script', 'style', 'noscript', 'iframe', 'form'].forEach((tag) => {
    const elements = tempDiv.getElementsByTagName(tag);
    while (elements.length > 0) {
      elements[0].parentNode.removeChild(elements[0]);
    }
  });

  // Remove inline event handlers and dangerous attributes.
  const allElements = Array.from(tempDiv.getElementsByTagName('*'));
  allElements.forEach((element) => {
    Array.from(element.attributes).forEach((attr) => {
      if (attr.name.startsWith('on')) {
        element.removeAttribute(attr.name);
      }
    });
    if (!allowStyles) {
      element.removeAttribute('style');
    }
  });
  return tempDiv.innerHTML;
}

/**
 * Creates a clone of an element while ignoring specified elements or elements matching a selector.
 * Ignored by default: ['noscript', 'script', 'style', 'audio', 'video', 'form', 'iframe']
 * @param {Element} element The element to clone.
 * @param {Array[]} selectors The selector to match elements to be excluded from the clone. Optional.
 * @returns {Element} The cloned element with excluded elements removed.
 */
export function fnIgnore(element, selectors) {
  let ignoreQuery = 'noscript,script,style,audio,video,form,iframe';
  if (selectors && selectors.length > 0) {
    ignoreQuery = `${ignoreQuery},${selectors.join(',')}`;
  }
  const clone = element.cloneNode(true);
  const toRemove = clone.querySelectorAll(ignoreQuery);
  let i = toRemove.length;
  while (i--) {
    toRemove[i].remove();
  }
  return clone;
}

/**
 * Retrieves the text content of an HTML element and removes extra whitespaces and line breaks.
 * @param {HTMLElement} element The HTML element to retrieve the text content from.
 * @returns {string} The text content of the HTML element with extra whitespaces and line breaks removed.
 */
const gotText = new WeakMap();
export function getText(element) {
  if (gotText.has(element)) {
    return gotText.get(element);
  }
  const ignore = fnIgnore(element);
  const text = ignore.textContent
    .replace(/[\r\n]+/g, '')
    .replace(/\s+/g, ' ')
    .trim();
  gotText.set(element, text);
  return text;
}

/**
 * Removes extra whitespaces and line breaks from a string.
 * @param {string} string The string.
 * @returns {string} String with line breaks and extra white space removed.
 */
export function removeWhitespace(string) {
  return string
    .replace(/[\r\n]+/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();
}

/**
 * Truncate string.
 * @param {*} string The string to truncate.
 * @param {*} maxLength Desired max length of string.
 * @returns Truncated string.
 */
export function truncateString(string, maxLength) {
  const truncatedString = string.substring(0, maxLength).trimEnd();
  return string.length > maxLength ? `${truncatedString}...` : string;
}

/**
 * Debounces a callback function, ensuring it is only executed after a certain wait period
 * has passed since the last invocation.
 * @param {function} callback The callback function to debounce.
 * @param {number} wait The wait period in milliseconds before the callback function is executed.
 * @returns {function} The debounced function.
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
 * Finds the visible parent of an element that matches a given CSS property and value.
 * @param {Element} element The element for which the visible parent needs to be found.
 * @param {string} property The CSS property to match against.
 * @param {string} value The value of the CSS property to match against.
 * @returns {Element|null} The visible parent element that matches the given property and value, or null if not found.
 */
export function findVisibleParent(element, property, value) {
  let $el = element;
  while ($el) {
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
 * @param {Element} element The element for which the offset top needs to be calculated.
 * @returns {Object} An object with a `top` property that represents the offset top of the element relative to the viewport.
 */
export function offsetTop(element) {
  const rect = element.getBoundingClientRect();
  const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
  return { top: rect.top + scrollTop };
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
    } catch {
      // Cookies totally disabled.
      return false;
    }
  },
  setItem(key, value) {
    try {
      localStorage.setItem(key, value);
    } catch {
      sessionStorage.setItem(key, value);
    }
    return true;
  },
  removeItem(key) {
    try {
      localStorage.removeItem(key);
    } catch {
      sessionStorage.removeItem(key);
    }
    return true;
  },
};

/**
 * Adds a pulsing border effect to an element for 2.5 seconds.
 * @param {Element} element The element to which the pulsing border effect needs to be added.
 */
export function addPulse(element) {
  const border = 'data-sa11y-pulse-border';
  element.setAttribute(border, '');
  setTimeout(() => element.removeAttribute(border), 2500);
}

/**
 * Gets the next sibling element that matches the given selector, or the next sibling element if no selector is provided.
 * @param {HTMLElement} element The DOM element whose next sibling to retrieve.
 * @param {string} selector The optional selector to filter the next siblings. If not provided, the next sibling element will be returned regardless of its type.
 * @returns {HTMLElement|string} The next sibling element that matches the given selector, or the next sibling element if no selector is provided. If no matching sibling is found, an empty string is returned.
 */
export function getNextSibling(element, selector) {
  let sibling = element.nextElementSibling;
  if (!selector) {
    return sibling;
  }
  while (sibling) {
    if (sibling.matches(selector)) {
      return sibling;
    }
    sibling = sibling.nextElementSibling;
  }
  return '';
}

/**
 * Generates a unique key for dismissing items.
 * @param {string} string The string to be prepared for dismissal (without special chars).
 * @returns {string} The truncated string with a maximum of 256 characters.
 */
export function prepareDismissal(string) {
  return String(string)
    .replace(/([^0-9a-zA-Z])/g, '')
    .substring(0, 256);
}

/**
 * Generates a selector path for the given DOM element.
 * @param {Element} element The DOM element for which to generate the selector path.
 * @returns {string} The selector path as a string.
 * @link https://www.geeksforgeeks.org/how-to-create-a-function-generateselector-to-generate-css-selector-path-of-a-dom-element/
 * @link https://dev.to/aniket_chauhan/generate-a-css-selector-path-of-a-dom-element-4aim
 */
export function generateSelectorPath(element) {
  const path = [];
  let currentElement = element;
  while (currentElement) {
    let selector = currentElement.localName;
    if (currentElement.id) {
      selector += `#${currentElement.id}`;
      path.unshift(selector);
      break;
    } else {
      const classAttr = currentElement.getAttribute ? currentElement.getAttribute('class') : null;
      if (classAttr) {
        const classSelector = classAttr.trim().replace(/\s+/g, '.');
        if (classSelector) {
          selector += `.${classSelector}`;
        }
      }
    }

    const parentElement = currentElement.parentNode;
    if (parentElement) {
      const siblings = parentElement.children;
      if (siblings.length > 1) {
        const index = Array.prototype.indexOf.call(siblings, currentElement) + 1;
        selector += `:nth-child(${index})`;
      }
      path.unshift(selector);
    } else {
      break;
    }
    currentElement = currentElement.parentNode.host || currentElement.parentNode;
  }
  return path.join(' > ');
}

/**
 * Traps focus within an element by looping focus back to the beginning or end
 * when the Tab key is pressed.
 * @param {Element} element The DOM element to trap focus within.
 * @author Hidde de Vries
 * @link https://hidde.blog/using-javascript-to-trap-focus-in-an-element/
 */
export function trapFocus(element) {
  const focusable = element.querySelectorAll(
    'a[href]:not([disabled]), button:not([disabled]), input[type="color"]',
  );
  const firstFocusable = focusable[0];
  const lastFocusable = focusable[focusable.length - 1];
  element.addEventListener('keydown', (e) => {
    const isTabPressed = e.key === 'Tab' || e.keyCode === 9;

    // "document.activeElement" does not work within ShadowDOM.
    const root = element.getRootNode();

    if (!isTabPressed) {
      return;
    }
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
 * Finds all data-attributes specified in array, and removes them from the document.
 * @param {Array<string>} attributes The array of data-attributes to be reset.
 * @param {string} root The root element to search for elements (optional, defaults to 'document').
 * @returns {void}
 */
export function resetAttributes(attributes, root) {
  attributes.forEach((attr) => {
    const reset = find(`[${attr}]`, `${root}`);
    reset.forEach(($el) => {
      $el.removeAttribute(attr);
    });
  });
}

/**
 * Removes the specified elements from the document.
 * @param {string} root The root element to search for elements (optional, defaults to 'document').
 * @returns {void}
 */
export function remove(elements, root) {
  const allElements = find(`${elements}`, `${root}`);
  allElements.forEach(($el) => {
    $el?.parentNode?.removeChild($el);
  });
}

/**
 * Checks if a scrollable area within a container element is scrollable or not, and applies appropriate CSS classes and attributes. Make sure to add aria-label manually.
 * @param {Element} scrollArea The scrollable area element to check.
 * @param {Element} container The container element that wraps the scrollable area.
 * @param {Attribute} ariaLabel Give scroll area an accessible name and region landmark.
 */
export function isScrollable(scrollArea, container, ariaLabel) {
  setTimeout(() => {
    if (scrollArea.scrollHeight > container.clientHeight) {
      container.classList.add('scrollable');
      scrollArea.setAttribute('tabindex', '0');
      if (ariaLabel) {
        scrollArea.setAttribute('aria-label', ariaLabel);
        scrollArea.setAttribute('role', 'region');
      }
    } else {
      container.classList.remove('scrollable');
    }
  }, 50);
}

/**
 * Get the best image source from an element, considering data-src, srcset, and src attributes.
 * @param {HTMLElement} element - The image element to extract the source from.
 * @returns {string} - The best available source URL.
 */
export function getBestImageSource(element) {
  const getLastSrc = (src) => src?.split(/,\s+/).pop()?.trim()?.split(/\s+/)[0];

  // Return absolute URLs. Necessary for HTML export.
  const resolveUrl = (src) => (src ? new URL(src, window.location.href).href : null);

  const dataSrc = getLastSrc(element.getAttribute('data-src') || element.getAttribute('srcset'));
  if (dataSrc) {
    return resolveUrl(dataSrc);
  }

  const picture = element
    .closest('picture')
    ?.querySelector('source[srcset]')
    ?.getAttribute('srcset');
  const pictureSrc = getLastSrc(picture);

  if (pictureSrc) {
    return resolveUrl(pictureSrc);
  }
  return resolveUrl(element.getAttribute('src'));
}

/**
 * Converts a Blob object to a Base64-encoded string.
 * @param {Blob} blob - The Blob object to convert.
 * @returns {Promise<string>} A promise that resolves to a Base64 string representation of the Blob.
 */
export const blobToBase64 = (blob) =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onloadend = () => {
      let { result } = reader;
      // Ensure the correct MIME type if it's missing or wrong. Necessary for uncommon image formats.
      const detectedMime = blob?.type?.startsWith('image/') ? blob.type : 'image/png'; // Default fallback
      if (result.startsWith('data:application/octet-stream')) {
        result = result.replace('data:application/octet-stream', `data:${detectedMime}`);
      }
      resolve(result);
    };
    reader.onerror = reject;
    reader.readAsDataURL(blob);
  });

/**
 * Generate an HTML preview for an issue if it's an image, iframe, audio, or video element.
 * Otherwise, return escaped HTML within <code> tags. Used for Skip to Issue panel alerts and HTML page export.
 * @param {Object} issueObject The issue object.
 * @param {boolean} convertBase64 Optional. Convert image to Base64.
 * @returns {html} Returns HTML.
 */
export function generateElementPreview(issueObject, convertBase64 = false) {
  const issueElement = issueObject.element;
  const cleanHTML = sanitizeHTMLBlock(issueObject.htmlPath);
  const truncatedHTML = truncateString(cleanHTML, 600);
  const htmlPath = `<pre><code>${escapeHTML(truncatedHTML)}</code></pre>`;

  // Simple output for basic text elements.
  const simple = (element) => {
    const text = getText(element);
    const truncatedText = truncateString(text, 100);
    return text.length ? sanitizeHTML(truncatedText) : htmlPath;
  };

  const tag = {
    SPAN: simple,
    P: simple,
    A: (element) => {
      const text = getText(element);
      const truncatedText = truncateString(text, 100);
      if (text.length > 1 && element.href && !element.hasAttribute('role')) {
        return `<a href="${sanitizeURL(element.href)}">${sanitizeHTML(truncatedText)}</a>`;
      }
      return htmlPath;
    },
    IMG: (element) => {
      const anchor = element.closest('a[href]');
      const alt = element.alt ? `alt="${sanitizeHTML(element.alt)}"` : 'alt';
      const source = getBestImageSource(element);

      function createImageElement(src) {
        return anchor
          ? `<a href="${sanitizeURL(anchor.href)}" rel="noopener noreferrer"><img src="${src}" ${alt}/></a>`
          : `<img src="${src}" ${alt}/>`;
      }

      // Async handling if converting images to Base64 (for HTML export).
      if (convertBase64) {
        return new Promise((resolve) => {
          if (source) {
            // Make sure we're only converting images from the same domain.
            const isSameDomain =
              new URL(source, window.location.origin).origin === window.location.origin;
            if (isSameDomain) {
              fetch(source)
                .then((response) => response.blob())
                .then((blob) => blobToBase64(blob))
                .then((base64Source) => {
                  const imageSource = base64Source.startsWith('data:image/')
                    ? base64Source
                    : sanitizeURL(base64Source);
                  resolve(createImageElement(imageSource));
                })
                .catch(() => {
                  resolve(createImageElement(source));
                });
            } else {
              const imageSource = source.startsWith('data:image/') ? source : sanitizeURL(source);
              resolve(createImageElement(imageSource));
            }
          } else {
            resolve(htmlPath);
          }
        });
      }

      // Synchronous handling for skip-to-issue.
      const sanitized = source.startsWith('data:image/') ? source : sanitizeURL(source);
      if (source) {
        return createImageElement(sanitized);
      }
      return htmlPath;
    },
    IFRAME: (element) => {
      const source = element.src;
      const title = element.title ? element.title : '';
      const ariaLabelAttr = element.getAttribute('aria-label');
      const ariaLabel = ariaLabelAttr || '';
      if (source) {
        const iframeTitle = ariaLabel || title;
        return `<iframe src="${sanitizeURL(source)}" aria-label="${sanitizeHTML(iframeTitle)}"></iframe>`;
      }
      return htmlPath;
    },
    AUDIO: () => sanitizeHTMLBlock(issueObject.htmlPath),
    VIDEO: () => sanitizeHTMLBlock(issueObject.htmlPath),
  };

  const tagHandler = tag[issueElement.tagName];
  const elementPreview = tagHandler ? tagHandler(issueElement) : htmlPath;
  return elementPreview;
}

/**
 * Check if an element's visible text is included in the accessible name.
 * To minimize false positives: iterate through all child nodes of the element, checking for visibility.
 * @param {element} $el The element to test.
 * @param {string} accName The computed accessible name of the element.
 * @param {Array} exclusions Array of exclusions.
 * @param {Array} linkIgnoreStrings Array of string exclusions.
 * @returns {boolean}
 */
export function isVisibleTextInAccName($el, accName, exclusions = [], linkIgnoreStrings) {
  let text = '';

  // Prep exclusions.
  const excludeSelector = exclusions?.length ? exclusions.join(',') : '';
  const ignoreStrings = Array.isArray(linkIgnoreStrings) ? linkIgnoreStrings : null;
  const stripIgnored = (value = '') =>
    ignoreStrings ? ignoreStrings.reduce((result, str) => result.replace(str, ''), value) : value;

  // Iterate though each child node.
  $el.childNodes.forEach((node) => {
    if (node.nodeType === Node.TEXT_NODE) {
      text += stripIgnored(node.textContent);
    }

    if (node.nodeType !== Node.ELEMENT_NODE) {
      return;
    }

    // Exclusions based on matched selectors.
    if (excludeSelector && node.matches(excludeSelector)) {
      return;
    }

    // Only return text content if it's not hidden.
    if (!isElementVisuallyHiddenOrHidden(node)) {
      text += stripIgnored(getText(node));
    }
  });

  // Ignore emojis.
  const emojiRegex = /[\p{Emoji_Presentation}\p{Extended_Pictographic}]/gu;
  let visibleText = text.replace(emojiRegex, '');

  // Final visible text.
  visibleText = removeWhitespace(visibleText).toLowerCase();

  // If visible text is just an x character, ignore.
  if (visibleText === 'x') {
    return false;
  }

  // Check if visible text is included in accessible name.
  return visibleText.length !== 0 && !accName.toLowerCase().includes(visibleText);
}

/**
 * Standardize the href attribute of a link by removing any trailing slashes and stripping the protocol (http, https) and 'www.' prefix. Used to minimize false positives for link check module.
 * @param {HTMLElement} $el - The element from which to retrieve the href attribute.
 * @returns {string} - The standardized href.
 */
export function standardizeHref($el) {
  let href = $el.getAttribute('href');
  href = removeWhitespace(href).toLowerCase();

  // Remove trailing slash if it exists.
  if (href.endsWith('/')) {
    href = href.slice(0, -1);
  }

  // Remove protocol and www., without affecting subdomains.
  href = href.replace(/^https?:\/\/(www\.)?/, '');

  // Remove common file extensions at the end.
  href = href.replace(/\.(html|php|htm|asp|aspx)$/i, '');

  return href;
}

/**
 * Roving tabindex menu for page outline.
 * Thanks to Srijan for this snippet!
 * @param {HTMLElement} container - Parent element (e.g., ul, div).
 * @param {HTMLElement[]} children - Focusable child elements inside container.
 */
export function initRovingTabindex(container, children) {
  let current = 0;
  const handleKeyDown = (e) => {
    if (!['ArrowUp', 'ArrowDown', 'Space'].includes(e.code)) {
      return;
    }
    if (e.code === 'Space') {
      children[current].click();
      e.preventDefault();
      return;
    }
    const selected = children[current];
    selected.setAttribute('tabindex', -1);
    let next;
    if (e.code === 'ArrowDown') {
      next = current + 1;
      if (current === children.length - 1) {
        next = 0;
      }
    } else if (e.code === 'ArrowUp') {
      next = current - 1;
      if (current === 0) {
        next = children.length - 1;
      }
    }
    children[next].setAttribute('tabindex', 0);
    children[next].focus();
    current = next;
    e.preventDefault();
  };

  container.addEventListener('focus', () => {
    if (children.length > 0) {
      container.setAttribute('tabindex', -1);
      children[current].setAttribute('tabindex', 0);
      children[current].focus();
    }
    container.addEventListener('keydown', handleKeyDown);
  });

  container.addEventListener('blur', () => {
    container.removeEventListener('keydown', handleKeyDown);
  });
}

/**
 * Detects if the browser supports CSS Anchor Positioning.
 * @link https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_anchor_positioning
 */
export function supportsAnchorPositioning() {
  return CSS.supports('anchor-name: --sa11y') && CSS.supports('position-anchor: --sa11y');
}

/**
 * Generates a Regex pattern from an array OR a comma-separated string. Safely escapes all special characters.
 * @param {string[]|string} input - Array of strings (e.g. ['(External)']) OR string (e.g. "(External), [draft]").
 * @param {boolean} [exactMatch=false] - If true, wraps each pattern in word boundaries (\b) for whole-word matching.
 * @returns {RegExp|null} The compiled Regex object, or null if input is empty/invalid.
 */
export function generateRegexString(input, matchStart = false) {
  if (!input) return null;

  // Return RegExp directly.
  if (input instanceof RegExp) return input;

  // Normalize input.
  let patterns = [];
  if (Array.isArray(input)) {
    patterns = input;
  } else if (typeof input === 'string') {
    patterns = input.split(',').map((s) => s.trim());
  } else {
    return null;
  }

  // Filter out empty entries to prevent matching 'everything' (empty regex issue).
  patterns = patterns.filter((p) => p && p.length > 0);
  if (patterns.length === 0) return null;

  // Helper to escape special regex characters.
  const escapeRegExp = (string) => {
    return string.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
  };

  // Build the pattern string.
  const joinedPatterns = patterns.map(escapeRegExp).join('|');

  // If matchStart is true, wrap in ^(?: ... ) to anchor the entire group to the start.
  const finalPattern = matchStart ? `^(?:${joinedPatterns})` : joinedPatterns;

  // Compile final case-insensitive regex.
  return new RegExp(finalPattern, 'gi');
}
