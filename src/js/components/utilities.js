/* Utilities and helper export functions */

// Helper: Check if element is hidden.
export function isElementHidden($el) {
  if ($el.getAttribute('hidden') || ($el.offsetWidth === 0 && $el.offsetHeight === 0)) {
    return true;
  }
  const compStyles = getComputedStyle($el);
  return compStyles.getPropertyValue('display') === 'none';
}

// Helper: Escape HTML, encode HTML symbols.
export function escapeHTML(text) {
  const $div = document.createElement('div');
  $div.textContent = text;
  return $div.innerHTML.replaceAll('"', '&quot;').replaceAll("'", '&#039;').replaceAll('`', '&#x60;');
}

// Helper: Help clean up HTML characters for tooltips and outline panel.
export function sanitizeForHTML(string) {
  const entityMap = {
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
    '"': '&quot;',
    "'": '&#39;',
    '/': '&#x2F;',
    '`': '&#x60;',
    '=': '&#x3D;',
  };
  return String(string).replace(/[&<>"'`=/]/g, (s) => entityMap[s]);
}

// Helper: Compute alt text on images within a text node.
export function computeTextNodeWithImage($el) {
  const imgArray = Array.from($el.querySelectorAll('img'));
  let returnText = '';
  // No image, has text.
  if (imgArray.length === 0 && $el.textContent.trim().length > 1) {
    returnText = $el.textContent.trim();
  } else if (imgArray.length && $el.textContent.trim().length === 0) {
    // Has image.
    const imgalt = imgArray[0].getAttribute('alt');
    if (!imgalt || imgalt === ' ' || imgalt === '') {
      returnText = ' ';
    } else if (imgalt !== undefined) {
      returnText = imgalt;
    }
  } else if (imgArray.length && $el.textContent.trim().length) {
    // Has image and text.
    // To-do: This is a hack? Any way to do this better?
    imgArray.forEach((element) => {
      element.insertAdjacentHTML('afterend', ` <span class='sa11y-clone-image-text' aria-hidden='true'>${imgArray[0].getAttribute('alt')}</span>`);
    });
    returnText = $el.textContent.trim();
  }
  return returnText;
}

// Utility: https://www.joshwcomeau.com/snippets/javascript/debounce/
export function debounce(callback, wait) {
  let timeoutId = null;
  return (...args) => {
    window.clearTimeout(timeoutId);
    timeoutId = window.setTimeout(() => {
      // eslint-disable-next-line prefer-spread
      callback.apply(null, args);
    }, wait);
  };
}

// Helper: Used to ignore child elements within an anchor.
export function fnIgnore(element, selector) {
  const $clone = element.cloneNode(true);
  const $exclude = Array.from(selector ? $clone.querySelectorAll(selector) : $clone.children);
  $exclude.forEach(($c) => {
    $c.parentElement.removeChild($c);
  });
  return $clone;
}

// Helper: Handle ARIA labels for Link Text module.
export function computeAriaLabel(el) {
  // aria-label
  if (el.matches('[aria-label]')) {
    return el.getAttribute('aria-label');
  }
  // aria-labeledby.
  if (el.matches('[aria-labelledby]')) {
    const target = el.getAttribute('aria-labelledby').split(/\s+/);
    if (target.length > 0) {
      let returnText = '';
      target.forEach((x) => {
        const targetSelector = document.querySelector(`#${x}`);
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
    return '';
  }
  // Child with aria-label
  if (Array.from(el.children).filter((x) => x.matches('[aria-label]')).length > 0) {
    const child = Array.from(el.childNodes);
    let returnText = '';

    // Process each child within node.
    child.forEach((x) => {
      if (x.nodeType === 1) {
        if (x.ariaLabel === null) {
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
  if (Array.from(el.children).filter((x) => x.matches('[aria-labelledby]')).length > 0) {
    const child = Array.from(el.childNodes);
    let returnText = '';

    // Process each child within node.
    child.forEach((y) => {
      if (y.nodeType === 3) {
        returnText += y.nodeValue;
      } else {
        const target = y.getAttribute('aria-labelledby').split(/\s+/);
        if (target.length > 0) {
          let returnAria = '';
          target.forEach((z) => {
            if (document.querySelector(`#${z}`) === null) {
              returnAria += ' ';
            } else {
              returnAria += `${document.querySelector(`#${z}`).firstChild.nodeValue} `;
            }
          });
          returnText += returnAria;
        }
      }
      return '';
    });
    return returnText;
  }
  return 'noAria';
}

// Mini export function: Find visibible parent of hidden element.
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

// Mini export function: Calculate top of element.
export function offsetTop($el) {
  const rect = $el.getBoundingClientRect();
  const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
  return {
    top: rect.top + scrollTop,
  };
}

// Nudge buttons if they overlap.
export function nudge() {
  const sa11yInstance = document.querySelectorAll('.sa11y-instance, .sa11y-instance-inline');
  sa11yInstance.forEach(($el) => {
    const sibling = $el.nextElementSibling;
    if (sibling !== null && (sibling.classList.contains('sa11y-instance')
        || sibling.classList.contains('sa11y-instance-inline'))) {
      sibling.querySelector('button').setAttribute('style', 'margin: -10px -20px !important;');
    }
  });
}

// Detect parent containers that have hidden overflow.
export function detectOverflow() {
  const findParentWithOverflow = (element, property, value) => {
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
  };
  const $findButtons = document.querySelectorAll('.sa11y-btn');
  $findButtons.forEach(($el) => {
    const overflowing = findParentWithOverflow($el, 'overflow', 'hidden');
    if (overflowing !== null) {
      overflowing.classList.add('sa11y-overflow');
    }
  });
}
