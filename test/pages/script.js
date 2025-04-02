import { Sa11y, Lang } from '../../dist/js/sa11y.esm.js';
import Sa11yLangEn from '../../dist/js/lang/en.js';

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
      developer: false,
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
      developer: true,
    });
  }
});
*/

// Instantiate
Lang.addI18n(Sa11yLangEn.strings);
const sa11y = new Sa11y({
  checkRoot: 'body',
  readabilityRoot: '.foo',
  headerIgnore: '#nothing-ignore-this-heading *, .ignore-this-heading',
  linkIgnoreSpan: '.sr-only-example',
  linkIgnoreStrings: '(External)',
  imageIgnore: '.logo',
  outlineIgnore: '.outline-ignore',
  contrastIgnore: '.background-image-component',
  showHinPageOutline: 1,
  showTitleInPageOutline: 1,
  // contrastAAA: true,
  // contrastAPCA: true,
  ignoreHiddenOverflow: '.overlay, .modal',
  insertAnnotationBefore: '.background-container',
  // panelPosition: 'top-right',
  // showMovePanelToggle: false,
  // showImageOutline: false,
  exportResultsPlugin: true,
  autoDetectShadowComponents: true,
  developerChecksOnByDefault: true,
  imageWithinLightbox: '.lightbox',

  // Configure image panel edit button
  editImageURLofCMS: 'localhost',
  ignoreEditImageURL: ['/ignore/'],
  ignoreEditImageClass: ['ignore-me-edit-btn'],

  // Customize checks.
  checks: {
    QA_BAD_LINK: {
      sources: 'a[href*="dev."]',
    },
    IMAGE_ALT_TOO_LONG: {
      content: 'Alt text description is <strong>too long</strong>. Fix it please! This is testing the <kbd>content</kbd> override. <hr> {ALT} <strong {B}>%(altLength) Characters</strong> <strong {C}>%(ALT_TEXT)</strong>',
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
