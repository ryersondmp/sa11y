import annotationStyles from '../../css/annotations.css?inline';
import sharedStyles from '../../css/shared.css?inline';
import Constants from '../utils/constants';
import Lang from '../utils/lang';
import { findVisibleParent, supportsAnchorPositioning } from '../utils/utils';
import { State } from '../core/state';

// Annotation wrapper <annotation>
export class Annotations extends HTMLElement {
  connectedCallback() {
    if (this.shadowRoot) return;
    const shadow = this.attachShadow({ mode: 'open' });
    const style = document.createElement('style');
    style.textContent = annotationStyles + sharedStyles;
    shadow.appendChild(style);
  }
}

// Array of all annotation triggers/buttons, imported by tooltip.js
export const annotationButtons = [];

/**
 * Create annotation buttons.
 * @param {Object} issue The issue object.
 */
export function annotate(issue) {
  // Get properties of issue object.
  const {
    element,
    type,
    content,
    inline = false,
    position = 'beforebegin',
    id,
    dismiss,
    margin,
    issueLabel,
  } = issue;

  // Readability issue object or page issue that does not correspond to an element.
  if (!type && !element) return;

  // Generate HTML for painted annotations.
  if (element) {
    // Don't paint page with "Good" annotations (if prop enabled).
    if (type === 'good') {
      if (!State.option.showGoodImageButton && element?.tagName === 'IMG') {
        return;
      }
      if (!State.option.showGoodLinkButton && element?.tagName === 'A') {
        return;
      }
    }

    // Tag element with border outline.
    const tag = {
      [type[0]]: 'data-sa11y-error',
      [type[1]]: 'data-sa11y-warning',
      [type[2]]: 'data-sa11y-good',
    };
    [type].forEach(($el) => {
      if (tag[$el]) {
        element.setAttribute(tag[$el], '');
      }
    });

    // Create 'sa11y-annotation' web component for each annotation.
    const annotation = document.createElement('sa11y-annotation');
    annotation.setAttribute('data-sa11y-annotation', id);

    // For unit tests.
    if (State.option.unitTestMode) {
      annotation.setAttribute('data-content', `${issueLabel} ${content.textContent}`);
    }

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

    // Create button annotations.
    const buttonWrapper = document.createElement('div');
    buttonWrapper.classList.add(inline ? 'annotation-inline' : 'annotation');
    const button = document.createElement('button');
    button.type = 'button';
    button.className = `${type}-btn`;
    button.setAttribute('aria-label', issueLabel);
    button.setAttribute('aria-haspopup', 'dialog');
    button.style.margin = `${inline ? '-10px' : ''} ${margin}`;
    buttonWrapper.appendChild(button);
    annotationButtons.push(button);

    // Make sure annotations always appended outside of SVGs and interactive elements.
    const insertBefore = State.option.insertAnnotationBefore
      ? `, ${State.option.insertAnnotationBefore}`
      : '';
    const location =
      element.closest(`a, button, [role="link"], [role="button"] ${insertBefore}`) || element;
    location.insertAdjacentElement(position, annotation);
    annotation.shadowRoot.appendChild(buttonWrapper);

    // Modifies the annotation's parent container with overflow: hidden, making it visible and scrollable so content authors can access it.
    const ignoredElements = State.option.ignoreHiddenOverflow
      ? State.option.ignoreHiddenOverflow
        .split(',')
        .flatMap((selector) => [...document.querySelectorAll(selector)])
      : [];
    const parent = findVisibleParent(element, 'overflow', 'hidden');
    if (parent && !ignoredElements.includes(parent)) {
      parent.setAttribute('data-sa11y-overflow', '');
    }
  } else {
    // Dismiss button for warnings and good issues.
    const dismissBtn =
      State.option.dismissAnnotations && ['warning', 'good'].includes(type) && dismiss
        ? Object.assign(document.createElement('button'), {
          type: 'button',
          textContent: Lang._('DISMISS'),
        })
        : null;
    if (dismissBtn) dismissBtn.dataset.sa11yDismiss = id;

    // Append to Page Issues.
    const listItem = document.createElement('li');
    const heading = document.createElement('h3');
    heading.textContent = issueLabel;
    listItem.appendChild(heading);
    listItem.append(content, dismissBtn || '');
    Constants.Panel.pageIssuesList.prepend(listItem);

    // Display Page Issues panel.
    Constants.Panel.pageIssues.classList.add('active');
    Constants.Panel.panel.classList.add('has-page-issues');
  }
}
