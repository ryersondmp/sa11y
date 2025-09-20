import Lang from '../utils/lang';
import Constants from '../utils/constants';
import { escapeHTML, findVisibleParent, supportsAnchorPositioning } from '../utils/utils';

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
  if (element) {
    const map = {
      [validTypes[0]]: 'data-sa11y-error',
      [validTypes[1]]: 'data-sa11y-warning',
      [validTypes[2]]: 'data-sa11y-good',
    };
    [type].forEach(($el) => map[$el] && element.setAttribute(map[$el], ''));
  }

  // Generate aria-label for annotations.
  const ariaLabel = {
    [validTypes[0]]: Lang._('ERROR'),
    [validTypes[1]]: Lang._('WARNING'),
    [validTypes[2]]: Lang._('GOOD'),
  };

  // Don't paint page with "Good" annotations for images with alt text and links with accessible name.
  if (type === 'good') {
    if (!option.showGoodImageButton && element?.tagName === 'IMG') return;
    if (!option.showGoodLinkButton && element?.tagName === 'A') return;
  }

  // Add dismiss button if prop enabled & has a dismiss key.
  const dismissBtn = (option.dismissAnnotations && (type === 'warning' || type === 'good') && dismiss)
    ? `<button data-sa11y-dismiss='${id}' type='button'>${Lang._('DISMISS')}</button>` : '';

  // Add dismiss all button if prop enabled & has addition check key.
  const dismissAllBtn = (
    option.dismissAnnotations
    && (option.dismissAll && typeof dismissAll === 'string')
    && (type === 'warning' || type === 'good'))
    ? `<button data-sa11y-dismiss='${id}' data-sa11y-dismiss-all type='button'>${Lang._('DISMISS_ALL')}</button>` : '';

  // Create 'sa11y-annotation' web component for each annotation.
  const instance = document.createElement('sa11y-annotation');
  instance.setAttribute('data-sa11y-annotation', id);

  // Anchor positioning on sa11y-annotation web component.
  if (supportsAnchorPositioning()) {
    instance.style.position = 'absolute';
    instance.style.positionAnchor = `--sa11y-anchor-${id}`;
    instance.style.top = 'anchor(top)';
    instance.style.left = 'anchor(left)';
    if (element) {
      // Preserve original anchor name.
      const existing = element.style.anchorName;
      element.style.anchorName = existing
        ? `${existing}, --sa11y-anchor-${id}`
        : `--sa11y-anchor-${id}`;
    }
  }

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
    create.innerHTML = `<button type="button" aria-label="${ariaLabel[type]}" aria-haspopup="dialog" class="sa11y-btn ${[type]}-btn${inline ? '-text' : ''}" data-tippy-content="<div lang='${Lang._('LANG_CODE')}' class='${[type]}'><button type='button' class='close-btn close-tooltip' aria-label='${Lang._('ALERT_CLOSE')}'></button><h2>${ariaLabel[type]}</h2> ${escapeHTML(content)} ${contrastDetails ? '<div data-sa11y-contrast-details></div>' : ''}<div class='dismiss-group'>${dismissBtn}${dismissAllBtn}</div></div>"></button>`;

    // Make sure annotations always appended outside of SVGs and interactive elements.
    const insertBefore = option.insertAnnotationBefore
      ? `, ${option.insertAnnotationBefore}` : '';
    const location = element.closest(`a, button, [role="link"], [role="button"] ${insertBefore}`) || element;
    location.insertAdjacentElement(position, instance);
    instance.shadowRoot.appendChild(create);

    // Modifies the annotation's parent container with overflow: hidden, making it visible and scrollable so content authors can access it.
    const ignoredElements = option.ignoreHiddenOverflow
      ? option.ignoreHiddenOverflow.split(',').flatMap((selector) => [...document.querySelectorAll(selector)])
      : [];
    const parent = findVisibleParent(element, 'overflow', 'hidden');
    if (parent && !ignoredElements.includes(parent)) {
      parent.setAttribute('data-sa11y-overflow', '');
    }
  }
}
