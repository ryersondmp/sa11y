import { Sa11y, Lang } from '../assets/js/sa11y.esm.js';

// Translations
import Sa11yLangEn from '../assets/js/lang/en.js';
import Sa11yLangFr from '../assets/js/lang/fr.js';
import Sa11yLangPl from '../assets/js/lang/pl.js';
import Sa11yLangUa from '../assets/js/lang/ua.js';
import SallyLangSv from '../assets/js/lang/sv.js';
import SallyLangDe from '../assets/js/lang/de.js';

// Set translations
const url = window.location.href;
if (url.indexOf("/pl/") > -1) {
  Lang.addI18n(Sa11yLangPl.strings);
} else if (url.indexOf("/fr/") > -1) {
  Lang.addI18n(Sa11yLangFr.strings);
} else if (url.indexOf("/ua/") > -1) {
  Lang.addI18n(Sa11yLangUa.strings);
} else if (url.indexOf("/sv/") > -1) {
  Lang.addI18n(SallyLangSv.strings);
} else if (url.indexOf("/de/") > -1) {
  Lang.addI18n(SallyLangDe.strings);
} else {
  Lang.addI18n(Sa11yLangEn.strings);
}

/**
 * Passing custom checks as an object before instantiating.
 */

/*
let results = [];
const root = document.querySelector('main');

const $checkAnnouncement = root.querySelectorAll('.sa11y-announcement-component');
if ($checkAnnouncement.length > 1) {
  for (let i = 1; i < $checkAnnouncement.length; i++) {
    results.push({
      element: $checkAnnouncement[i],
      type: 'warning',
      content: 'More than one Announcement component found! The Announcement component should be used strategically and sparingly. It should be used to get attention or indicate that something is important. Misuse of this component makes it less effective or impactful. Secondly, this component is semantically labeled as an Announcement for people who use screen readers.',
      inline: false,
      position: 'beforebegin',
    });
  }
}

const $checkAccordions = root.querySelectorAll('.sa11y-accordion-example');
$checkAccordions.forEach(($el) => {
  const checkForm = $el.querySelector('form');
  if (!!checkForm && checkForm.length) {
    results.push({
      element: $el,
      type: 'error',
      content: 'Do <strong>not nest forms</strong> within the Accordion component. If the form contains validation issues, a person may not see the form feedback since the accordion panel goes back to its original closed state.',
      inline: false,
      position: 'beforebegin',
    });
  }
});
*/

// Instantiate
const sa11y = new Sa11y({
  checkRoot: 'main',
  readabilityRoot: 'main',
  customChecks: 'listen',
  // delayCheck: 500,
  videoContent: 'youtube.com, vimeo.com, yuja.com, panopto.com, torontomu.ca',
  headerIgnore: '.ignore-this-heading',
  contrastIgnore: '.card-footer *, #player *',
  containerIgnore: 'footer',
  linksToFlag: "a[href^='https://www.dev.']",
  linkIgnoreSpan: '.sr-only-example',
  detectSPArouting: true,
  headless: false,
  outlineIgnore: 'header *',
  dismissAnnotations: true,
  selectorPath: false,
  checkAllHideToggles: false,
  showAltAboveImage: '.carousel',
  URLAsLinkTextWarning: true,
  exportResultsPlugin: true,

  // showHinPageOutline: true,
  readabilityPlugin: true,
  contrastPlugin: true,
  formLabelsPlugin: true,
  colourFilterPlugin: true,
  linksAdvancedPlugin: true,

  shadowComponents: '',
  autoDetectShadowComponents: true,
  panelPosition: 'right',

  // Specific checks
  linksToDOI: true,
  missingH1: true,
  nonConsecutiveHeadingIsError: true,
});

/* Console all results
document.addEventListener('sa11y-check-complete', (e) => {
  console.log(e.detail)
}); */

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
