// ============================================================
// Rulesets: Check Headings
// ============================================================
import Lang from '../components/translation';
import { ERROR, WARNING } from '../components/constants';
import * as utilities from '../components/utilities';
import { annotate, annotateBanner } from '../components/annotate';

export default function checkHeaders() {
  let prevLevel;
  Sa11y.$h.forEach(($el, i) => {
    const text = utilities.computeTextNodeWithImage($el);
    const htext = utilities.sanitizeForHTML(text);
    let level;

    if ($el.getAttribute('aria-level')) {
      level = +$el.getAttribute('aria-level');
    } else {
      level = +$el.tagName.slice(1);
    }

    const headingLength = $el.textContent.trim().length;
    let error = null;
    let warning = null;

    if (level - prevLevel > 1 && i !== 0) {
      if (option.nonConsecutiveHeadingIsError === true) {
        error = Lang.sprintf('HEADING_NON_CONSECUTIVE_LEVEL', prevLevel, level);
      } else {
        warning = Lang.sprintf('HEADING_NON_CONSECUTIVE_LEVEL', prevLevel, level);
      }
    } else if ($el.textContent.trim().length === 0) {
      if ($el.querySelectorAll('img').length) {
        const imgalt = $el.querySelector('img').getAttribute('alt');
        if (imgalt === null || imgalt === ' ' || imgalt === '') {
          error = Lang.sprintf('HEADING_EMPTY_WITH_IMAGE', level);
          $el.classList.add('sa11y-error-text');
        }
      } else {
        error = Lang.sprintf('HEADING_EMPTY', level);
        $el.classList.add('sa11y-error-text');
      }
    } else if (i === 0 && level !== 1 && level !== 2) {
      error = Lang._('HEADING_FIRST');
    } else if ($el.textContent.trim().length > 170 && option.flagLongHeadings === true) {
      warning = Lang.sprintf('HEADING_LONG', headingLength);
    }

    prevLevel = level;

    const li = `<li class='sa11y-outline-${level}'>
                    <span class='sa11y-badge'>${level}</span>
                    <span class='sa11y-outline-list-item'>${htext}</span>
                </li>`;

    const liError = `<li class='sa11y-outline-${level}'>
                    <span class='sa11y-badge sa11y-error-badge'>
                    <span aria-hidden='true'>&#10007;</span>
                    <span class='sa11y-visually-hidden'>${Lang._('ERROR')}</span> ${level}</span>
                    <span class='sa11y-outline-list-item sa11y-red-text sa11y-bold'>${htext}</span>
                </li>`;

    const liWarning = `<li class='sa11y-outline-${level}'>
                    <span class='sa11y-badge sa11y-warning-badge'>
                    <span aria-hidden='true'>&#x3f;</span>
                    <span class='sa11y-visually-hidden'>${Lang._('WARNING')}</span> ${level}</span>
                    <span class='sa11y-outline-list-item sa11y-yellow-text sa11y-bold'>${htext}</span>
                </li>`;

    let ignoreArray = [];
    if (option.outlineIgnore) {
      ignoreArray = Array.from(document.querySelectorAll(this.outlineIgnore));
    }

    if (!ignoreArray.includes($el)) {
      // Append heading labels.
      $el.insertAdjacentHTML('beforeend', `<span class='sa11y-heading-label'>H${level}</span>`);

      // Heading errors
      if (error !== null && $el.closest('a') !== null) {
        $el.classList.add('sa11y-error-border');
        $el.closest('a').insertAdjacentHTML('afterend', annotate(ERROR, error, true));
        document.querySelector('#sa11y-outline-list').insertAdjacentHTML('beforeend', liError);
      } else if (error !== null) {
        $el.classList.add('sa11y-error-border');
        $el.insertAdjacentHTML('beforebegin', annotate(ERROR, error));
        document.querySelector('#sa11y-outline-list').insertAdjacentHTML('beforeend', liError);
      } else if (warning !== null && $el.closest('a') !== null) {
        $el.closest('a').insertAdjacentHTML('afterend', annotate(WARNING, warning));
        document.querySelector('#sa11y-outline-list').insertAdjacentHTML('beforeend', liWarning);
      } else if (warning !== null) {
        $el.insertAdjacentHTML('beforebegin', annotate(WARNING, warning));
        document.querySelector('#sa11y-outline-list').insertAdjacentHTML('beforeend', liWarning);
      } else if (error === null || warning === null) {
        document.querySelector('#sa11y-outline-list').insertAdjacentHTML('beforeend', li);
      }
    }
  });

  // Check to see there is at least one H1 on the page.
  if (Sa11y.$h1.length === 0) {
    const updateH1Outline = `<div class='sa11y-instance sa11y-missing-h1'>
                    <span class='sa11y-badge sa11y-error-badge'><span aria-hidden='true'>&#10007;</span><span class='sa11y-visually-hidden'>${Lang._('ERROR')}</span></span>
                    <span class='sa11y-red-text sa11y-bold'>${Lang._('PANEL_HEADING_MISSING_ONE')}</span>
                </div>`;
    document.getElementById('sa11y-outline-header').insertAdjacentHTML('afterend', updateH1Outline);
    Sa11y.panel.insertAdjacentHTML('afterend', annotateBanner(ERROR, Lang._('HEADING_MISSING_ONE')));
  }
};