import { Sa11y, Lang } from '../src/js/sa11y.js';
import Sa11yLangEn from '../src/lang/en.js';

// Instantiate
Lang.addI18n(Sa11yLangEn.strings);
const sa11y = new Sa11y({
  checkRoot: 'body',
  readabilityRoot: 'main',
  customChecks: 'listen',
  langOfPartsCache: true,
  langOfPartsPlugin: 1,
  stopOnFirstLangMismatch: false,
  delayCheck: 500,
  videoContent: 'youtube.com, vimeo.com, yuja.com, panopto.com, torontomu.ca',
  headerIgnore: '.ignore-this-heading',
  headerIgnoreSpan: '.headerIgnoreSpan',
  headerIgnoreStrings: ['(Anchor)'],
  contrastIgnore: '.card-footer *, #player *, .sr-only',
  containerIgnore: 'footer',
  linkIgnoreStrings: ['(External link)', '(ignore me)', 'JKXLSKSK'],
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
  imageIgnore: '.ignore-img',
  linkIgnore: '.ignore-link',
  linkIgnoreSpan: '.ignore-span',
  extraPlaceholderStopWords: 'untitled',
  editImageURLofCMS: '../docs/examples/assets/',
  // showHinPageOutline: true,
  readabilityPlugin: 1,
  contrastPlugin: true,
  // contrastAlgorithm: 'APCA',
  formLabelsPlugin: true,
  colourFilterPlugin: true,
  linksAdvancedPlugin: true,
  imageWithinLightbox: '.lightbox',
  // shadowComponents: '',
  autoDetectShadowComponents: true,
  panelPosition: 'bottom-left', // invalid value, should default to right.
  unitTestMode: true,
  ignoreByTest: {
    QA_FAKE_HEADING: 'p.ignore strong',
    LINK_STOPWORD: '.mnbvcxz',
  },
  checks: {
    QA_BAD_LINK: {
      sources: "a[href^='https://www.dev.']",
    },
    // LABELS_PLACEHOLDER: false,
  },
});

window.sa11y = sa11y;

let count = 0;
let total = 0;
document.addEventListener('sa11y-check-complete', (e) => {
  count++;
  total += parseFloat(e.detail.time);
  console.log(e.detail);
  console.log(`Running Average (${count} samples): ${(total / count).toFixed(2)}ms`);
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