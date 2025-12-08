/**
 * Create Page Outline.
 */

import Constants from '../utils/constants';
import find from '../utils/find';
import Lang from '../utils/lang';
import * as Utils from '../utils/utils';
import { createAlert, removeAlert } from './alert';

export default function generatePageOutline(dismissed, headingOutline, option) {
  const outlineHandler = () => {
    const outlineArray = [];

    // Find all dismissed headings and update headingOutline array.
    const findDismissedHeadings = dismissed
      .map((e) => headingOutline.find((f) => e.dismiss === f.dismiss))
      .filter(Boolean);
    findDismissedHeadings.forEach(($el) => {
      $el.dismissedHeading = true;
    });

    // Show meta page title in Page Outline.
    let outlineItem;
    if (option.showTitleInPageOutline) {
      const metaTitleElement = document.querySelector('head title');
      if (!metaTitleElement || metaTitleElement.textContent.trim().length === 0) {
        outlineItem = `<li><div class="badge error-badge"><span aria-hidden="true"><span class="error-icon"></span></span> ${Lang._('TITLE')}</div> <div class="badge error-badge">${Lang._('MISSING')}</div></li>`;
      } else {
        const titleText = Utils.getText(metaTitleElement);
        outlineItem = `<li><span class="badge">${Lang._('TITLE')}</span> ${Utils.sanitizeHTML(titleText)}</li>`;
      }
      outlineArray.push(outlineItem);
    }

    // Iterate through object that contains all headings (and error type).
    headingOutline.forEach((heading, i) => {
      const { element, headingLevel, text, type, dismissedHeading, isWithinRoot } = heading;

      // Determine if heading is visually hidden or within hidden container.
      const hidden = Utils.isElementVisuallyHiddenOrHidden(element);

      // Indicate if heading is totally hidden or visually hidden.
      const visibleIcon =
        hidden === true
          ? `<span class="hidden-icon"></span><span class="visually-hidden">${Lang._('HIDDEN')}</span>`
          : '';
      const badgeH =
        option.showHinPageOutline === true || option.showHinPageOutline === 1 ? 'H' : '';

      let append;
      if (type === 'error' && isWithinRoot === true) {
        append = `
            <li class="outline-${headingLevel}">
              <button type="button" tabindex="-1">
                <span class="badge error-badge">
                <span aria-hidden="true">${visibleIcon}
                  <span class="error-icon"></span>
                </span>
                <span class="visually-hidden">${Lang._('ERROR')}</span> ${badgeH + headingLevel}</span>
                <strong class="outline-list-item red-text">${text}</strong>
              </button>
            </li>`;
        outlineArray.push(append);
      } else if (type === 'warning' && !dismissedHeading && isWithinRoot === true) {
        append = `
            <li class="outline-${headingLevel}">
              <button type="button" tabindex="-1">
                <span class="badge warning-badge">
                <span aria-hidden="true">${visibleIcon} &#x3f;</span>
                <span class="visually-hidden">${Lang._('WARNING')}</span> ${badgeH + headingLevel}</span>
                <strong class="outline-list-item yellow-text">${text}</strong>
              </button>
            </li>`;
        outlineArray.push(append);
      } else {
        append = `
            <li class="outline-${headingLevel}">
              <button type="button" tabindex="-1">
                <span class="badge">${visibleIcon} ${badgeH + headingLevel}</span>
                <span class="outline-list-item">${text}</span>
              </button>
            </li>`;
        outlineArray.push(append);
      }

      /**
       * Append heading labels.
       */
      const label = document.createElement('sa11y-heading-label');
      label.hidden = true;
      element?.insertAdjacentElement('beforeend', label);

      // Create anchors to focus on if heading is not visible.
      const anchor = document.createElement('sa11y-heading-anchor');
      anchor.id = `sa11y-h${i}`;
      if (hidden) {
        const parent = Utils.findVisibleParent(element, 'display', 'none');
        const target = parent?.previousElementSibling || parent?.parentNode;
        target?.insertAdjacentElement('beforebegin', anchor);
        target?.setAttribute('data-sa11y-parent', `h${i}`);
      } else {
        label?.insertAdjacentElement('beforebegin', anchor);
      }

      // Populate heading label.
      const content = document.createElement('span');
      content.classList.add('heading-label');
      content.innerHTML = `H${headingLevel}`;
      label.shadowRoot.appendChild(content);

      // Make heading labels visible when panel is open.
      if (Utils.store.getItem('sa11y-outline') === 'Opened') {
        label.hidden = false;
      }
    });

    // Append headings to Page Outline.
    Constants.Panel.outlineList.innerHTML =
      headingOutline.length === 0
        ? `${outlineItem || ''} <li>${Lang._('PANEL_NO_HEADINGS')}</li>`
        : outlineArray.join(' ');

    // Make clickable!
    setTimeout(() => {
      const buttons = Constants.Panel.outlineList.querySelectorAll('button');
      buttons.forEach((button, i) => {
        button.addEventListener('click', () => {
          // Query DOM for target elements.
          const heading = find(
            `#sa11y-h${i}, [data-sa11y-parent="h${i}"]`,
            'document',
            Constants.Exclusions.Container,
          )[0];

          // Scroll to heading and add pulsing border.
          if (heading) {
            heading.scrollIntoView({
              behavior: `${Constants.Global.scrollBehaviour}`,
              block: 'center',
            });
            Utils.addPulse(heading.parentNode || heading);
          }

          // Alert if hidden or doesn't exist.
          removeAlert();
          if (!heading || heading.hasAttribute('data-sa11y-parent')) {
            createAlert(Lang._('NOT_VISIBLE'));
          }
        });
      });

      Utils.initRovingTabindex(Constants.Panel.outlineList, buttons);
    }, 0);

    // Remove event listener and returned dismissed results.
    document.removeEventListener('sa11y-build-heading-outline', outlineHandler);
  };

  // Generate heading outline based on local storage or if "Outline" button is selected.
  if (Utils.store.getItem('sa11y-outline') === 'Opened') {
    outlineHandler();
  }
  document.addEventListener('sa11y-build-heading-outline', outlineHandler);
}
