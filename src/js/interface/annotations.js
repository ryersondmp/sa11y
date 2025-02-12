import Lang from '../utils/lang';
import Constants from '../utils/constants';
import { escapeHTML } from '../utils/utils';

// Import processed minified styles as a string.
import annotationStyles from '../../../dist/css/annotations.min.css';
import sharedStyles from '../../../dist/css/shared.min.css';

export class Annotations extends HTMLElement {
  connectedCallback() {
    const shadow = this.attachShadow({ mode: 'open' });

    // Styles
    const style = document.createElement('style');
    style.innerHTML = annotationStyles + sharedStyles;
    shadow.appendChild(style);
  }
}

/**
  * Create annotation buttons.
  * @param {Object} issue The issue object.
  * @param {Object} option The options object.
*/
export function annotate(issue, option) {
  // Get properties of issue object.
  const {
    element,
    type,
    content,
    inline = false,
    position = 'beforebegin',
    id,
    dismiss,
    dismissAll,
    contrastDetails,
  } = issue;

  // Validate types to prevent errors.
  const validTypes = ['error', 'warning', 'good'];
  if (validTypes.indexOf(type) === -1) {
    throw Error(`Invalid type [${type}] for annotation`);
  }

  // Add unique ID and styles to annotation and marked element.
  [type].forEach(($el) => {
    if ($el === 'error' && element !== undefined) {
      const errorAttr = (inline ? 'data-sa11y-error-inline' : 'data-sa11y-error');
      element.setAttribute(errorAttr, id);
    } else if ($el === 'warning' && element !== undefined) {
      const warningAttr = (inline ? 'data-sa11y-warning-inline' : 'data-sa11y-warning');
      element.setAttribute(warningAttr, id);
    }
  });

  // Generate aria-label for annotations.
  const ariaLabel = {
    [validTypes[0]]: Lang._('ERROR'),
    [validTypes[1]]: Lang._('WARNING'),
    [validTypes[2]]: Lang._('GOOD'),
  };

  // Don't paint page with "Good" annotations for images with alt text and links with accessible name.
  if (option.showGoodImageButton === false
    && element?.tagName === 'IMG' && type === 'good') return;
  if (option.showGoodLinkButton === false
    && element?.tagName === 'A' && type === 'good') return;

  // Add dismiss button if prop enabled & has a dismiss key.
  const dismissBtn = (
    option.dismissAnnotations
    && (type === 'warning' || type === 'good')
    && dismiss !== undefined)
    ? `<button data-sa11y-dismiss='${id}' type='button'>${Lang._('DISMISS')}</button>` : '';

  // Add dismiss all button if prop enabled & has addition check key.
  const dismissAllBtn = (
    option.dismissAnnotations
    && (option.dismissAll && typeof dismissAll === 'string')
    && (type === 'warning' || type === 'good'))
    ? `<button data-sa11y-dismiss='${id}' data-sa11y-dismiss-all type='button'>${Lang._('DISMISS_ALL')}</button>` : '';

  // Create 'sa11y-annotation' web component for each annotation.
  // Create 'sa11y-annotation' web component for each annotation.
  const instance = document.createElement('sa11y-annotation');
  instance.setAttribute('data-sa11y-annotation', id);

  // Generate HTML for painted annotations.
  if (element === undefined) {
    // Page errors displayed to main panel.
    const listItem = document.createElement('li');
    listItem.innerHTML = `<h3>${ariaLabel[type]}</h3> ${content}${dismissBtn}`;
    Constants.Panel.pageIssuesList.insertAdjacentElement('afterbegin', listItem);

    // Display Page Issues panel.
    Constants.Panel.pageIssues.classList.add('active');
    Constants.Panel.panel.classList.add('has-page-issues');
  } else {
    // Button annotations.
    const create = document.createElement('div');
    create.classList.add(`${inline ? 'instance-inline' : 'instance'}`);
    create.innerHTML = `
    <button
      type="button"
      aria-label="${ariaLabel[type]}"
      aria-haspopup="dialog"
      class="sa11y-btn ${[type]}-btn${inline ? '-text' : ''}"
      data-tippy-content=
        "<div lang='${Lang._('LANG_CODE')}' class='${[type]}'>
          <button type='button' class='close-btn close-tooltip' aria-label='${Lang._('ALERT_CLOSE')}'></button> <h2>${ariaLabel[type]}</h2>
          ${escapeHTML(content)}
          ${contrastDetails ? '<div data-sa11y-contrast-details></div>' : ''}
          <div class='dismiss-group'>${dismissBtn}${dismissAllBtn}</div>
        </div>"
    ></button>`;

    // Make sure annotations always appended outside of SVGs and interactive elements.
    const insertBefore = option.insertAnnotationBefore ? `, ${option.insertAnnotationBefore}` : '';
    const location = element.closest(`a, button, [role="link"], [role="button"] ${insertBefore}`) || element;
    location.insertAdjacentElement(position, instance);
    instance.shadowRoot.appendChild(create);
  }
}

/**
 * Utility function for annotations that modifies the parent container with overflow: hidden, making it visible and scrollable so content authors can access Sa11y's annotations.
 * @param {string} ignoreHiddenOverflow A string of selectors to ignore and not apply overflow detection.
 */
export const detectOverflow = (ignoreHiddenOverflow) => {
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
  const annotations = document.querySelectorAll('sa11y-annotation');
  annotations.forEach(($el) => {
    const overflowing = findParentWithOverflow($el, 'overflow', 'hidden');
    if (overflowing !== null) {
      // Skip if selectors passed via ignoreHiddenOverflow prop.
      if (ignoreHiddenOverflow) {
        const selectors = ignoreHiddenOverflow.split(',');
        const matches = selectors.flatMap((selector) => [...document.querySelectorAll(selector)]);
        if (matches.includes(overflowing)) return;
      }
      // All other `overflow: hidden` containers will be made visible and scrollable.
      overflowing.setAttribute('data-sa11y-overflow', '');
    }
  });
};

/**
 * Utility function that will visually move overlapping annotations so they can be seen.
 */
export const nudge = () => {
  const annotations = document.querySelectorAll('sa11y-annotation');
  annotations.forEach(($el) => {
    const sibling = $el.nextElementSibling;
    const css = 'margin: -5px -15px !important;';
    if (sibling !== null && sibling.tagName === 'SA11Y-ANNOTATION' && customElements.get('sa11y-annotation')) {
      sibling.shadowRoot.querySelector('button').setAttribute('style', css);
    }
  });
};
