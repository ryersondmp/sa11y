import { Sa11y, Lang } from '../src/js/sa11y.js';
import Sa11yLangEn from '../src/js/lang/en.js';

// Instantiate
Lang.addI18n(Sa11yLangEn.strings);
const sa11y = new Sa11y({
  checkRoot: 'main',
  readabilityRoot: 'main',
  customChecks: 'listen',
  // delayCheck: 500,
  videoContent: 'youtube.com, vimeo.com, yuja.com, panopto.com, torontomu.ca',
  headerIgnore: '.ignore-this-heading',
  headerIgnoreStrings: /\(AnchorJS\)/gi,
  contrastIgnore: '.card-footer *, #player *',
  containerIgnore: 'footer',
  linkIgnoreStrings: ['(External link)', '(ignore me)'],
  linkIgnoreSpan: '.sr-only-example, .link-purpose',
  detectSPArouting: true,
  headless: false,
  // outlineIgnore: 'header *',
  dismissAnnotations: true,
  selectorPath: false,
  checkAllHideToggles: false,
  showAltAboveImage: '.carousel',
  URLAsLinkTextWarning: true,
  exportResultsPlugin: true,
  altPlaceholder: [
    'This image has an empty alt attribute; its file name is',
    'Esta imagen tiene un atributo alt vacío; its file name is'
  ],
  extraPlaceholderStopWords: 'untitled',

  // showHinPageOutline: true,
  readabilityPlugin: true,
  contrastPlugin: true,
  // contrastAlgorithm: 'APCA',
  formLabelsPlugin: true,
  colourFilterPlugin: true,
  linksAdvancedPlugin: true,

  shadowComponents: '',
  autoDetectShadowComponents: true,
  panelPosition: 'right',

  checks: {
    QA_BAD_LINK: {
      sources: "a[href^='https://www.dev.']",
    },
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
        content: 'More than one Announcement component found! The Announcement component should be used strategically and sparingly. It should be used to get attention or indicate that something is important. Misuse of this component makes it less effective or impactful. Secondly, this component is semantically labeled as an Announcement for people who use screen readers.',
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
