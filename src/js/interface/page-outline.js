/**
 * Create Page Outline.
*/
import * as Utils from '../utils/utils';
import Lang from '../utils/lang';
import Constants from '../utils/constants';
import find from '../utils/find';

export default function generatePageOutline(dismissed, headingOutline, showHinPageOutline) {
  // Create a single array that gets appended to heading outline.
  const outlineArray = [];

  // Find all dismissed headings and update headingOutline array.
  const findDismissedHeadings = dismissed.map((e) => {
    const found = headingOutline.find((f) => (e.key.includes(f.dismiss) && e.href === window.location.pathname));
    if (found === undefined) return '';
    return found;
  });
  findDismissedHeadings.forEach(($el) => {
    Object.assign($el, { dismissedHeading: true });
  });

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

    // Filter out specified headings in outlineIgnore prop.
    const ignoreArray = Constants.Exclusions.Outline ? Array.from(document.querySelectorAll(Constants.Exclusions.Outline)) : [];

    if (!ignoreArray.includes($el)) {
      // Indicate if heading is totally hidden or visually hidden.
      const visibleIcon = (visibility === true) ? '<span class="hidden-icon"></span><span class="visually-hidden">Hidden</span>' : '';
      const visibleStatus = (visibility === true) ? 'class="hidden-h"' : '';
      const badgeH = (showHinPageOutline === true) ? 'H' : '';

      let append;
      if (issue === 'error' && isWithinRoot === true) {
        append = `
        <li class="outline-${level}">
          <a role="button" id="sa11y-link-${i}" tabindex="-1" ${visibleStatus}>
            <span class="badge error-badge">
            <span aria-hidden="true">${visibleIcon}
              <span class="error-icon"></span>
            </span>
            <span class="visually-hidden">${Lang._('ERROR')}</span> ${badgeH + level}</span>
            <strong class="outline-list-item red-text">${headingText}</strong>
          </a>
        </li>`;
        outlineArray.push(append);
      } else if (issue === 'warning' && !dismissedH && isWithinRoot === true) {
        append = `
        <li class="outline-${level}">
          <a role="button" id="sa11y-link-${i}" tabindex="-1" ${visibleStatus}>
            <span class="badge warning-badge">
            <span aria-hidden="true">${visibleIcon} &#x3f;</span>
            <span class="visually-hidden">${Lang._('WARNING')}</span> ${badgeH + level}</span>
            <strong class="outline-list-item yellow-text">${headingText}</strong>
          </a>
        </li>`;
        outlineArray.push(append);
      } else {
        append = `
        <li class="outline-${level}">
          <a role="button" id="sa11y-link-${i}" tabindex="-1" ${visibleStatus}>
            <span class="badge">${visibleIcon} ${badgeH + level}</span>
            <span class="outline-list-item">${headingText}</span>
          </a>
        </li>`;
        outlineArray.push(append);
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
      if (Utils.store.getItem('sa11y-remember-outline') === 'Opened') {
        label.hidden = false;
      }
    }
  });

  // Append headings to Page Outline.
  Constants.Panel.outlineList.innerHTML = (outlineArray.length === 0)
    ? `<li>${Lang._('PANEL_NO_HEADINGS')}</li>`
    : outlineArray.join(' ');

  // Make clickable!
  setTimeout(() => {
    const panel = document.querySelector('sa11y-control-panel');
    const shadow = panel.shadowRoot;
    const children = Array.from(shadow.querySelectorAll('#outline-list a'));

    children.forEach(($el, i) => {
      // Make Page Outline clickable.
      const outlineLink = shadow.getElementById(`sa11y-link-${i}`);

      const headingID = find(
        `#sa11y-h${i}, [data-sa11y-parent="h${i}"]`,
        'document',
        Constants.Exclusions.Container,
      );

      // Scroll to.
      const pulseAndScroll = (heading) => {
        Utils.addPulse(heading.parentElement);
        heading.scrollIntoView({
          behavior: `${Constants.Global.scrollBehaviour}`,
          block: 'center',
        });
      };

      // Add pulse.
      const smoothPulse = (e) => {
        if ((e.type === 'keyup' && e.code === 'Enter') || e.type === 'click') {
          headingID.forEach((heading) => {
            pulseAndScroll(heading);
          });

          if (outlineLink.classList.contains('hidden-h')) {
            Utils.createAlert(`${Lang._('HEADING_NOT_VISIBLE_ALERT')}`);
          } else if (Constants.Panel.alert.classList.contains('active')) {
            Utils.removeAlert();
          }
        }
        e.preventDefault();
      };

      // Attach event listeners.
      outlineLink?.addEventListener('click', smoothPulse, false);
      outlineLink?.addEventListener('keyup', smoothPulse, false);
    });

    /**
     * Roving tabindex menu for page outline.
     * Thanks to Srijan for this snippet!
     * @link https://blog.srij.dev/roving-tabindex-from-scratch
    */
    let current = 0;
    const handleKeyDown = (e) => {
      if (!['ArrowUp', 'ArrowDown', 'Space'].includes(e.code)) return;
      if (e.code === 'Space') {
        children[current].click();
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
      } else if ((e.code === 'ArrowUp')) {
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
    Constants.Panel.outlineList.addEventListener('focus', () => {
      if (children.length > 0) {
        Constants.Panel.outlineList.setAttribute('tabindex', -1);
        children[current].setAttribute('tabindex', 0);
        children[current].focus();
      }
      Constants.Panel.outlineList.addEventListener('keydown', handleKeyDown);
    });
    Constants.Panel.outlineList.addEventListener('blur', () => {
      Constants.Panel.outlineList.removeEventListener('keydown', handleKeyDown);
    });
  }, 0);
  return dismissed;
}
