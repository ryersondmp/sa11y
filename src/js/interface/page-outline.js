/**
 * Create Page Outline.
*/
import * as Utils from '../utils/utils';
import Lang from '../utils/lang';
import Constants from '../utils/constants';
import Elements from '../utils/elements';
import find from '../utils/find';

export default function generatePageOutline(dismissed, headingOutline, option) {
  const outlineHandler = () => {
    const outlineArray = [];

    // Find all dismissed headings and update headingOutline array.
    const findDismissedHeadings = dismissed.map((e) => headingOutline.find((f) => e.dismiss === f.dismiss)).filter(Boolean);
    findDismissedHeadings.forEach(($el) => Object.assign($el, { dismissedHeading: true }));

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
    headingOutline.forEach((heading) => {
      const $el = heading.element;
      const level = heading.headingLevel;
      const headingText = heading.text;
      const i = heading.index;
      const issue = heading.type;
      const visibility = heading.hidden;
      const parent = heading.visibleParent;
      const dismissedH = heading.dismissedHeading;
      const { isWithinRoot } = heading;

      // Filter out specified headings in outlineIgnore and headerIgnore props.
      if (!Elements.Found.OutlineIgnore.includes($el)) {
        // Indicate if heading is totally hidden or visually hidden.
        const visibleIcon = (visibility === true)
          ? `<span class="hidden-icon"></span><span class="visually-hidden">${Lang._('HIDDEN')}</span>` : '';
        const visibleStatus = (visibility === true) ? 'class="hidden-h"' : '';
        const badgeH = (option.showHinPageOutline === true || option.showHinPageOutline === 1) ? 'H' : '';

        let append;
        if (issue === 'error' && isWithinRoot === true) {
          append = `
            <li class="outline-${level}">
              <button tabindex="-1" ${visibleStatus}>
                <span class="badge error-badge">
                <span aria-hidden="true">${visibleIcon}
                  <span class="error-icon"></span>
                </span>
                <span class="visually-hidden">${Lang._('ERROR')}</span> ${badgeH + level}</span>
                <strong class="outline-list-item red-text">${headingText}</strong>
              </button>
            </li>`;
          outlineArray.push(append);
        } else if (issue === 'warning' && !dismissedH && isWithinRoot === true) {
          append = `
            <li class="outline-${level}">
              <button tabindex="-1" ${visibleStatus}>
                <span class="badge warning-badge">
                <span aria-hidden="true">${visibleIcon} &#x3f;</span>
                <span class="visually-hidden">${Lang._('WARNING')}</span> ${badgeH + level}</span>
                <strong class="outline-list-item yellow-text">${headingText}</strong>
              </button>
            </li>`;
          outlineArray.push(append);
        } else {
          append = `
            <li class="outline-${level}">
              <button tabindex="-1" ${visibleStatus}>
                <span class="badge">${visibleIcon} ${badgeH + level}</span>
                <span class="outline-list-item">${headingText}</span>
              </button>
            </li>`;
          outlineArray.push(append);
        }
      }

      /**
       * Append heading labels.
      */
      const label = document.createElement('sa11y-heading-label');
      const anchor = document.createElement('sa11y-heading-anchor');
      label.hidden = true;

      // If heading is in a hidden container, place the anchor just before it's most visible parent.
      if (parent !== null) {
        $el.insertAdjacentElement('beforeend', label);
        const hiddenParent = parent.previousElementSibling;
        anchor.setAttribute('id', `sa11y-h${i}`);
        if (hiddenParent) {
          hiddenParent.insertAdjacentElement('beforebegin', anchor);
          hiddenParent.setAttribute('data-sa11y-parent', `h${i}`);
        } else {
          parent.parentNode.insertAdjacentElement('beforebegin', anchor);
          parent.parentNode.setAttribute('data-sa11y-parent', `h${i}`);
        }
      } else {
        // If the heading isn't hidden, append visible label.
        $el.insertAdjacentElement('beforeend', label);

        // Create anchor above visible label.
        label.insertAdjacentElement('beforebegin', anchor);
        anchor.setAttribute('id', `sa11y-h${i}`);
      }

      // Populate heading label.
      const content = document.createElement('span');
      content.classList.add('heading-label');
      content.innerHTML = `H${level}`;
      label.shadowRoot.appendChild(content);

      // Make heading labels visible when panel is open.
      if (Utils.store.getItem('sa11y-outline') === 'Opened') label.hidden = false;
    });

    // Append headings to Page Outline.
    Constants.Panel.outlineList.innerHTML = (headingOutline.length === 0)
      ? `${outlineItem || ''} <li>${Lang._('PANEL_NO_HEADINGS')}</li>`
      : outlineArray.join(' ');

    // Make clickable!
    setTimeout(() => {
      const buttons = Constants.Panel.outlineList.querySelectorAll('button');
      buttons.forEach(($el, i) => {
        $el.addEventListener('click', () => {
          // Query DOM for target elements.
          const heading = find(`#sa11y-h${i}, [data-sa11y-parent="h${i}"]`, 'document', Constants.Exclusions.Container);

          // Scroll to and pulse.
          heading[0].scrollIntoView({ behavior: `${Constants.Global.scrollBehaviour}`, block: 'center' });
          Utils.addPulse(heading[0].parentElement);

          // Alert if hidden.
          Utils.removeAlert();
          if ($el.classList.contains('hidden-h')) Utils.createAlert(Lang._('NOT_VISIBLE'));
        });
      });

      Utils.initRovingTabindex(Constants.Panel.outlineList, buttons);
    }, 0);

    // Remove event listener and returned dismissed results.
    document.removeEventListener('sa11y-build-heading-outline', outlineHandler);
  };

  // Generate heading outline based on local storage or if "Outline" button is selected.
  if (Utils.store.getItem('sa11y-outline') === 'Opened') outlineHandler();
  document.addEventListener('sa11y-build-heading-outline', outlineHandler);
}
