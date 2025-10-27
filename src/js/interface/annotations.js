import Lang from '../utils/lang';
import Constants from '../utils/constants';
import { findVisibleParent, supportsAnchorPositioning } from '../utils/utils';

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

// Array of all annotation triggers/buttons, imported by tooltip.js
export const annotationButtons = [];

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
    margin,
  } = issue;

  // Validate types to prevent errors.
  const validTypes = ['error', 'warning', 'good'];
  if (validTypes.indexOf(type) === -1) {
    throw Error(`Invalid type [${type}] for annotation`);
  }

  // Generate aria-label for annotations.
  const ariaLabel = {
    [validTypes[0]]: Lang._('ERROR'),
    [validTypes[1]]: Lang._('WARNING'),
    [validTypes[2]]: Lang._('GOOD'),
  };

  // Add dismiss button if prop enabled & has a dismiss key.
  const dismissBtn = (option.dismissAnnotations && (type === 'warning' || type === 'good') && dismiss)
    ? `<button data-sa11y-dismiss='${id}' type='button'>${Lang._('DISMISS')}</button>` : '';

  // Generate HTML for painted annotations.
  if (element) {
    // Don't paint page with "Good" annotations (if prop enabled).
    if (type === 'good') {
      if (!option.showGoodImageButton && element?.tagName === 'IMG') return;
      if (!option.showGoodLinkButton && element?.tagName === 'A') return;
    }

    // Tag element with border outline.
    const tag = {
      [validTypes[0]]: 'data-sa11y-error',
      [validTypes[1]]: 'data-sa11y-warning',
      [validTypes[2]]: 'data-sa11y-good',
    };
    [type].forEach(($el) => tag[$el] && element.setAttribute(tag[$el], ''));

    // Create 'sa11y-annotation' web component for each annotation.
    const annotation = document.createElement('sa11y-annotation');
    annotation.setAttribute('data-sa11y-annotation', id);

    // Add anchor positioning on <sa11y-annotation> web component to improve accuracy of positioning.
    if (supportsAnchorPositioning()) {
      annotation.style.position = 'absolute';
      annotation.style.positionAnchor = `--sa11y-anchor-${id}`;
      annotation.style.top = 'anchor(top)';
      annotation.style.left = 'anchor(left)';

      // Preserve original anchor name.
      const existing = element.style.anchorName;
      element.style.anchorName = existing
        ? `${existing}, --sa11y-anchor-${id}`
        : `--sa11y-anchor-${id}`;
    }

    // Add dismiss all button if prop enabled & has addition check key.
    const dismissAllBtn = (
      option.dismissAnnotations
      && (option.dismissAll && typeof dismissAll === 'string')
      && (type === 'warning' || type === 'good'))
      ? `<button data-sa11y-dismiss='${id}' data-sa11y-dismiss-all type='button'>${Lang._('DISMISS_ALL')}</button>`
      : '';

    // Create button annotations.
    const buttonWrapper = document.createElement('div');
    buttonWrapper.classList.add(inline ? 'annotation-inline' : 'annotation');
    const button = document.createElement('button');
    button.type = 'button';
    button.className = `${type}-btn`;
    button.setAttribute('aria-label', ariaLabel[type]);
    button.setAttribute('aria-haspopup', 'dialog');
    button.style.margin = `${inline ? '-10px' : ''} ${margin}`;
    button.dataset.tippyContent = `<div lang='${Lang._('LANG_CODE')}' class='${type}'><button type='button' class='close-btn close-tooltip' aria-label='${Lang._('ALERT_CLOSE')}'></button><h2>${ariaLabel[type]}</h2> ${content} ${contrastDetails ? '<div data-sa11y-contrast-details></div>' : ''} <div class='dismiss-group'>${dismissBtn}${dismissAllBtn}</div></div>`;
    buttonWrapper.appendChild(button);
    annotationButtons.push(button);

    // Make sure annotations always appended outside of SVGs and interactive elements.
    const insertBefore = option.insertAnnotationBefore ? `, ${option.insertAnnotationBefore}` : '';
    const location = element.closest(`a, button, [role="link"], [role="button"] ${insertBefore}`) || element;
    location.insertAdjacentElement(position, annotation);
    annotation.shadowRoot.appendChild(buttonWrapper);

    // Modifies the annotation's parent container with overflow: hidden, making it visible and scrollable so content authors can access it.
    const ignoredElements = option.ignoreHiddenOverflow
      ? option.ignoreHiddenOverflow.split(',').flatMap((selector) => [...document.querySelectorAll(selector)])
      : [];
    const parent = findVisibleParent(element, 'overflow', 'hidden');
    if (parent && !ignoredElements.includes(parent)) {
      parent.setAttribute('data-sa11y-overflow', '');
    }
  } else {
    // If no valid element, send issue to main panel.
    const listItem = document.createElement('li');
    listItem.innerHTML = `<h3>${ariaLabel[type]}</h3> ${content}${dismissBtn}`;
    Constants.Panel.pageIssuesList.insertAdjacentElement('afterbegin', listItem);

    // Display Page Issues panel.
    Constants.Panel.pageIssues.classList.add('active');
    Constants.Panel.panel.classList.add('has-page-issues');
  }
}
