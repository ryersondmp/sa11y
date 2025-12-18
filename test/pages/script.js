import { Sa11y, Lang } from '../../src/js/sa11y.js';
import Sa11yLangEn from '../../src/js/lang/en.js';

const isWarningsPage = window.location.pathname.includes('warnings.html');
const warningsPageChecks = isWarningsPage
  ? {
    HEADING_SKIPPED_LEVEL: {
      type: 'warning',
    },
    TABLES_EMPTY_HEADING: {
      type: 'warning',
    },
  }
  : {};

// Instantiate
Lang.addI18n(Sa11yLangEn.strings);
const sa11y = new Sa11y({
  headerIgnore: '#nothing-ignore-this-heading *, .ignore-this-heading',
  autoDetectShadowComponents: true,
  linkIgnoreSpan: '.sr-only-example',
  linkIgnoreStrings: ['(External link)'],
  developerChecksOnByDefault: true,
  imageIgnore: '.logo',
  customChecks: 'listen',
  linkStopWords: 'взнати більше',

  // Customize checks.
  checks: {
    QA_BAD_LINK: {
      sources: 'a[href*="dev."]',
    },
    ...warningsPageChecks,
  },
});

/* Console all results */
document.addEventListener('sa11y-check-complete', (e) => {
  console.log(e.detail);
});

/**
 * Custom checks via event listeners.
 */
document.addEventListener('sa11y-custom-checks', () => {
  const $checkAnnouncement = sa11y.find('.sa11y-announcement-component', 'root');
  if ($checkAnnouncement.length > 1) {
    for (let i = 1; i < $checkAnnouncement.length; i++) {
      const key = sa11y.prepareDismissal($checkAnnouncement[i].textContent);
      sa11y.results.push({
        element: $checkAnnouncement[i],
        type: 'warning',
        content: `More than one Announcement component found! The Announcement component should be used strategically and sparingly. It should be used to get attention or indicate that something is important. Misuse of this component makes it less effective or impactful. Secondly, this component is semantically labeled as an Announcement for people who use screen readers. <hr> <pre><code>${sa11y.truncateString(sa11y.sanitizeHTML($checkAnnouncement[i].outerHTML), 100)}</pre></code>`,
        inline: false,
        position: 'beforebegin',
        dismiss: key,
      });
    }
  }

  const $checkAccordions = sa11y.find('.sa11y-accordion-example', 'root');
  $checkAccordions.forEach(($el) => {
    const checkForm = $el.querySelector('form');
    if (!!checkForm && checkForm.length) {
      sa11y.results.push({
        element: $el,
        type: 'error',
        content: 'Do <strong>not nest forms</strong> within the Accordion component. If the form contains validation issues, a person may not see the form feedback since the accordion panel goes back to its original closed state.',
        inline: false,
        position: 'beforebegin',
      });
    }
  });

  const allDone = new CustomEvent('sa11y-resume');
  document.dispatchEvent(allDone);
});
