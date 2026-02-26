import Constants from '../utils/constants';
import find from '../utils/find';
import Lang from '../utils/lang';
import * as Utils from '../utils/utils';
import { createAlert, removeAlert } from './alert';
import { State } from '../core/state';

/**
 * Define the base template ONCE outside the function.
 */
const outlineTemplate = document.createElement('template');
outlineTemplate.innerHTML = `
  <li>
    <button type="button" tabindex="-1">
      <span class="badge"></span>
      <span class="outline-list-item"></span>
    </button>
  </li>
`;

/**
 * Create Page Outline.
 */
export default function generatePageOutline() {
  const outlineHandler = () => {
    // Clear the container safely and prepare a fragment for batch DOM insertion
    Constants.Panel.outlineList.textContent = '';
    const fragment = document.createDocumentFragment();

    // Find all dismissed headings and update headingOutline array.
    const findDismissedHeadings = State.dismissedResults
      .map((e) => State.headingOutline.find((f) => e.dismiss === f.dismiss))
      .filter(Boolean);
    findDismissedHeadings.forEach(($el) => {
      $el.dismissedHeading = true;
    });

    // Show meta page title in Page Outline.
    if (State.option.showTitleInPageOutline) {
      const metaTitleElement = document.querySelector('head title');
      const li = document.createElement('li');

      if (!metaTitleElement || metaTitleElement.textContent.trim().length === 0) {
        li.innerHTML = `
          <div class="badge error-badge"><span aria-hidden="true"><span class="error-icon"></span></span> ${Lang._('TITLE')}</div>
          <div class="badge error-badge">${Lang._('MISSING')}</div>
        `;
      } else {
        const titleBadge = document.createElement('span');
        titleBadge.className = 'badge';
        titleBadge.textContent = Lang._('TITLE');
        li.appendChild(titleBadge);
        li.appendChild(document.createTextNode(` ${Utils.getText(metaTitleElement)}`));
      }
      fragment.appendChild(li);
    }

    // Iterate through object that contains all headings (and error type).
    State.headingOutline.forEach((heading, i) => {
      const { element, headingLevel, text, type, dismissedHeading, isWithinRoot } = heading;

      // Determine if heading is visually hidden or within hidden container.
      const hidden = Utils.isElementVisuallyHiddenOrHidden(element);

      // Indicate if heading is totally hidden or visually hidden.
      const visibleIcon = hidden
        ? `<span class="hidden-icon"></span><span class="visually-hidden">${Lang._('HIDDEN')}</span>`
        : '';
      const badgeH =
        State.option.showHinPageOutline === true || State.option.showHinPageOutline === 1
          ? 'H'
          : '';

      // Clone the pre-parsed DOM structure rapidly
      const clone = outlineTemplate.content.cloneNode(true);
      const li = clone.querySelector('li');
      const badge = clone.querySelector('.badge');
      const listItemText = clone.querySelector('.outline-list-item');
      li.className = `outline-${headingLevel}`;

      // User supplied content via textContent.
      listItemText.textContent = text;

      if (type === 'error' && isWithinRoot === true) {
        badge.className = 'badge error-badge';
        badge.innerHTML = `<span aria-hidden="true">${visibleIcon}<span class="error-icon"></span></span><span class="visually-hidden">${Lang._('ERROR')}</span>${badgeH}${headingLevel}`;

        // User supplied content.
        const strongText = document.createElement('strong');
        strongText.className = 'outline-list-item red-text';
        strongText.textContent = text;
        listItemText.replaceWith(strongText);
      } else if (type === 'warning' && !dismissedHeading && isWithinRoot === true) {
        badge.className = 'badge warning-badge';
        badge.innerHTML = `<span aria-hidden="true">${visibleIcon} &#x3f;</span><span class="visually-hidden">${Lang._('WARNING')}</span> ${badgeH}${headingLevel}`;

        // User supplied content.
        const strongText = document.createElement('strong');
        strongText.className = 'outline-list-item yellow-text';
        strongText.textContent = text;
        listItemText.replaceWith(strongText);
      } else {
        badge.innerHTML = `${visibleIcon}${badgeH}${headingLevel}`;
      }

      fragment.appendChild(clone);

      /**
       * Append heading labels to the actual DOM.
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

      // Populate heading label safely.
      const content = document.createElement('span');
      content.classList.add('heading-label');
      content.textContent = `H${headingLevel}`;
      label.shadowRoot.appendChild(content);

      // Make heading labels visible when panel is open.
      if (Utils.store.getItem('sa11y-outline') === 'Opened') {
        label.hidden = false;
      }
    });

    // Handle empty state.
    if (State.headingOutline.length === 0) {
      const emptyLi = document.createElement('li');
      emptyLi.textContent = Lang._('PANEL_NO_HEADINGS');
      fragment.appendChild(emptyLi);
    }

    // Append the fully built fragment to the DOM all at once
    Constants.Panel.outlineList.appendChild(fragment);

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
