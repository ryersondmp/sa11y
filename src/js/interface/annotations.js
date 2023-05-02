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
  * @param {Node} element: The node or issue element.
  * @param {String} type: The type of issue (ERROR, WARNING, GOOD).
  * @param {String} content: The tooltip message.
  * @param {Boolean} inline: Whether the annotation should be displayed inline with text.
  * @param {String} position: Position of annotation (beforebegin, afterbegin, e.g.).
  * @param {Number} index: Index or order of issue.
*/
export function annotate(
  element,
  type,
  content,
  inline = false,
  position,
  index,
  dismissAnnotationsOption,
) {
  const validTypes = [
    Constants.Global.ERROR,
    Constants.Global.WARNING,
    Constants.Global.GOOD,
  ];

  if (validTypes.indexOf(type) === -1) {
    throw Error(`Invalid type [${type}] for annotation`);
  }
  // Add unique ID and styles to annotation and marked element.
  [type].forEach(($el) => {
    if ($el === Constants.Global.ERROR && element !== undefined) {
      const errorAttr = (inline ? 'data-sa11y-error-inline' : 'data-sa11y-error');
      element.setAttribute(errorAttr, index);
    } else if ($el === Constants.Global.WARNING) {
      const warningAttr = (inline ? 'data-sa11y-warning-inline' : 'data-sa11y-warning');
      element.setAttribute(warningAttr, index);
    }
  });

  const CSSName = {
    [validTypes[0]]: 'error',
    [validTypes[1]]: 'warning',
    [validTypes[2]]: 'good',
  };

  // Add dismiss button if prop enabled.
  const dismiss = (dismissAnnotationsOption === true && CSSName[type] === 'warning') ? `<button data-sa11y-dismiss='${index}' type='button'>${Lang._('DISMISS')}</button>` : '';

  const instance = document.createElement('sa11y-annotation');
  instance.setAttribute('data-sa11y-annotation', index);
  const create = document.createElement('div');
  const listItem = document.createElement('li');

  if (element === undefined) {
    // Page errors displayed to main panel.
    Constants.Panel.pageIssues.classList.add('active');
    Constants.Panel.panel.classList.add('has-page-issues');
    listItem.innerHTML = `<strong>${[type]}</strong> ${content}`;
    Constants.Panel.pageIssuesList.insertAdjacentElement('afterbegin', listItem);
  } else {
    // Button annotations.
    create.classList.add(`${inline ? 'instance-inline' : 'instance'}`);
    create.innerHTML = `
    <button
      type="button"
      aria-label="${[type]}"
      aria-haspopup="dialog"
      class="sa11y-btn ${CSSName[type]}-btn${inline ? '-text' : ''}"
      data-tippy-content=
        "<div lang='${Lang._('LANG_CODE')}'>
          <button class='close-btn close-tooltip' aria-label='${Lang._('ALERT_CLOSE')}'></button>
          <div class='header-text'><h2>${[type]}</h2></div>
          ${escapeHTML(content)}
          ${dismiss}
        </div>"
    ></button>`;

    // Make sure annotations always appended outside of interactive elements.
    let location = element.closest('a, button');
    if (!location) {
      location = element;
    }
    location.insertAdjacentElement(position, instance);
    instance.shadowRoot.appendChild(create);
  }
}

// ============================================================
// Detect parent containers that have hidden overflow.
// ============================================================
export const detectOverflow = () => {
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
      overflowing.setAttribute('data-sa11y-overflow', '');
    }
  });
};

// ============================================================
// Nudge buttons if they overlap.
// ============================================================
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
