import { initializeDismissals, dismissButtons } from '../features/dismissals';
import { exportResults } from '../features/export-results';
import generatePageOutline from '../interface/page-outline';
import generateImageOutline from '../interface/image-outline';
import { updatePanel, updateBadge, updateCount } from './update-panel';
import { AnnotationTooltips } from '../interface/tooltips';
import { annotate } from '../interface/annotations';
import { skipToIssue } from './skip-to-issue';
import * as Utils from '../utils/utils';
import { State } from './state';
import Elements from '../utils/elements';
import Constants from '../utils/constants';
import Lang from '../utils/lang';

/* *********************************************************** */
/*  Update results array.                                      */
/* *********************************************************** */
export default async function updateResults() {
  const { option } = State;

  // Ignore by test key
  const ignoreByTest = option.ignoreByTest || {};

  // Get developer checks.
  const devChecks = Utils.store.getItem('sa11y-developer');
  const isDevOff = !devChecks || devChecks === 'Off';

  // 1. Data filtering:
  State.results = State.results.filter((issue, _, src) => {
    // a) Filter out issues that are outside of the target root.
    // b) Filter out dev checks if toggled off or using externally supplied developer checks.
    if (
      issue.isWithinRoot === false ||
      ((isDevOff || option.externalDeveloperChecks) && issue.developer) ||
      (isDevOff && issue.external)
    )
      return false;

    // c) Filter out "Good" annotations for images that have an error or warning (page language detection conflict).
    if (
      State.option.langOfPartsPlugin &&
      issue?.element?.tagName === 'IMG' &&
      issue.type === 'good'
    ) {
      return !src.some(
        (i) =>
          i.element === issue.element &&
          (i.type === 'error' || i.type === 'warning') &&
          i.element?.alt === issue.element?.alt,
      );
    }

    // d) Filter out page language confidence check if page lang isn't valid or missing.
    if (State.option.langOfPartsPlugin && issue.test === 'PAGE_LANG_CONFIDENCE') {
      return !src.some(
        (i) =>
          i.test === 'META_LANG' || i.test === 'META_LANG_SUGGEST' || i.test === 'META_LANG_VALID',
      );
    }

    // e) Ignore by test key
    if (ignoreByTest[issue.test] && issue.element) {
      try {
        if (issue.element.matches(ignoreByTest[issue.test])) return false;
      } catch (e) {
        console.error(`Sa11y: Invalid CSS selector for ignoreByTest prop "${issue.test}"`, e);
      }
    }

    return true;
  });

  // 2. Data enrichment. Generate...
  // a) ID
  // b) (Optional) CSS selector path,
  // c) HTML path of element.
  // d) Encrypted dismiss keys.
  await Promise.all(
    State.results.map(async (item, id) => {
      item.id = id;
      item.cssPath = option.selectorPath ? Utils.generateSelectorPath(item.element) : '';
      item.htmlPath = item.element?.outerHTML.replace(/\s{2,}/g, ' ').trim() || '';
      if (item.dismiss) item.dismissDigest = await Utils.dismissDigest(item.dismiss);

      // Update tooltip content wrapper.
      if (item.content instanceof Element) {
        item.content.setAttribute('lang', Lang._('LANG_CODE'));
        item.content.className = item.type;
      }
    }),
  );

  // 3. Update interface (if not headless mode))
  if (!option.headless) syncUI();

  // 4. Dispatch custom event that stores the results array.
  const detail = { results: State.results, page: window.location.pathname };
  window.sa11yCheckComplete = detail;
  document.dispatchEvent(new CustomEvent('sa11y-check-complete', { detail }));
}

/* *********************************************************** */
/*  Sync all UI elements.                                      */
/* *********************************************************** */
function syncUI() {
  // Build array of images to be used for image panel.
  State.imageResults = Elements.Found.Images.map((image) =>
    State.results.find((i) => i.element === image),
  )
    .filter(Boolean)
    .map(({ element, type, dismissDigest, developer }) => ({
      element,
      type,
      dismissDigest,
      developer,
    }));

  // Check for dismissed items and update results array.
  initializeDismissals();

  // Update count & badge.
  updateCount();
  updateBadge();

  // If panel is OPENED.
  if (Utils.store.getItem('sa11y-panel') === 'Opened') {
    const counts = new Map();
    State.results.forEach((issue) => {
      // Dynamically alter margins if an element has multiple issues.
      if (issue.element && !issue.margin) {
        const index = counts.get(issue.element) || 0;
        counts.set(issue.element, index + 1);
        issue.margin = `${index * 20 + (issue.inline ? 0 : 15)}px`;
      }

      // Paint the page with annotations.
      annotate(issue);
    });

    // After annotations are painted, find & cache.
    Elements.initializeAnnotations();

    // Initialize tooltips
    document.body.appendChild(new AnnotationTooltips());

    dismissButtons();
    generatePageOutline();
    generateImageOutline();
    updatePanel();
    skipToIssue();
    exportResults();

    // Page issues: add gradient if scrollable list.
    Utils.isScrollable(Constants.Panel.pageIssuesList, Constants.Panel.pageIssuesContent);
  }

  // Make sure toggle isn't disabled after checking.
  Constants.Panel.toggle.disabled = false;
}
