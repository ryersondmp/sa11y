import Elements from '../utils/elements';
import * as Utils from '../utils/utils';
import Lang from '../utils/lang';
import Constants from '../utils/constants';
import { computeAccessibleName } from '../utils/computeAccessibleName';

export default function checkHeaders(results, option, headingOutline) {
  let prevLevel;
  let prevHeadingText = '';
  Elements.Found.Headings.forEach(($el, i) => {
    // Get accessible name of heading.
    const accName = computeAccessibleName($el, Constants.Exclusions.HeaderSpan);
    const stringMatchExclusions = option.headerIgnoreStrings
      ? accName.replace(option.headerIgnoreStrings, '') : accName;
    const removeWhitespace = Utils.removeWhitespace(stringMatchExclusions);
    const headingText = Utils.sanitizeHTML(removeWhitespace);

    // Check if heading is within root target area.
    const rootContainsHeading = Constants.Root.areaToCheck.contains($el);
    const rootContainsShadowHeading = Constants.Root.areaToCheck.contains($el.getRootNode().host);
    const isWithinRoot = rootContainsHeading || rootContainsShadowHeading;

    // Determine heading level.
    const level = parseInt($el.getAttribute('aria-level') || $el.tagName.slice(1), 10);
    const headingLength = headingText.length;
    const maxHeadingLength = option.checks.HEADING_LONG.maxLength || 160;

    // Default.
    let type = null;
    let content = null;
    let developer = null;
    let dismissAll = null;

    // Rulesets.
    if (level - prevLevel > 1 && i !== 0) {
      if (option.checks.HEADING_SKIPPED_LEVEL) {
        type = option.checks.HEADING_SKIPPED_LEVEL.type || 'error';
        content = option.checks.HEADING_SKIPPED_LEVEL.content
          || Lang.sprintf('HEADING_SKIPPED_LEVEL', prevLevel, level, Utils.truncateString(headingText, 50), Utils.truncateString(prevHeadingText, 50), prevLevel + 1);
        developer = option.checks.HEADING_SKIPPED_LEVEL.developer || false;
        dismissAll = option.checks.HEADING_SKIPPED_LEVEL.dismissAll ? 'HEADING_SKIPPED_LEVEL' : false;
      }
    } else if (headingLength === 0) {
      if ($el.querySelectorAll('img').length) {
        const alt = $el.querySelector('img')?.getAttribute('alt');
        if ($el.querySelector('img') && (!alt || alt.trim() === '')) {
          if (option.checks.HEADING_EMPTY_WITH_IMAGE) {
            type = option.checks.HEADING_EMPTY_WITH_IMAGE.type || 'error';
            content = option.checks.HEADING_EMPTY_WITH_IMAGE.content || Lang.sprintf('HEADING_EMPTY_WITH_IMAGE', level);
            developer = option.checks.HEADING_EMPTY_WITH_IMAGE.developer || false;
            dismissAll = option.checks.HEADING_EMPTY_WITH_IMAGE.dismissAll ? 'HEADING_EMPTY_WITH_IMAGE' : false;
          }
        }
      } else if (option.checks.HEADING_EMPTY) {
        type = option.checks.HEADING_EMPTY.type || 'error';
        content = option.checks.HEADING_EMPTY.content || Lang.sprintf('HEADING_EMPTY', level);
        developer = option.checks.HEADING_EMPTY.developer || false;
        dismissAll = option.checks.HEADING_EMPTY.dismissAll ? 'HEADING_EMPTY' : false;
      }
    } else if (i === 0 && level !== 1 && level !== 2) {
      if (option.checks.HEADING_FIRST) {
        type = option.checks.HEADING_FIRST.type || 'error';
        content = option.checks.HEADING_FIRST.content || Lang.sprintf('HEADING_FIRST');
        developer = option.checks.HEADING_FIRST.developer || false;
        dismissAll = option.checks.HEADING_FIRST.dismissAll ? 'HEADING_FIRST' : false;
      }
    } else if (headingLength > maxHeadingLength) {
      if (option.checks.HEADING_LONG) {
        type = option.checks.HEADING_LONG.type || 'warning';
        content = option.checks.HEADING_LONG.content
          || Lang.sprintf('HEADING_LONG', maxHeadingLength, headingLength);
        developer = option.checks.HEADING_LONG.developer || false;
        dismissAll = option.checks.HEADING_LONG.dismissAll ? 'HEADING_LONG' : false;
      }
    }

    // Create results object.
    if (content && type) {
      results.push({
        element: $el,
        type,
        content,
        dismiss: Utils.prepareDismissal(`H${level + headingText}`),
        dismissAll,
        isWithinRoot,
        developer,
      });
    }

    // Reset level and text.
    prevLevel = level;
    prevHeadingText = headingText;

    // Determine if heading is visually hidden or within hidden container.
    const hiddenHeading = Utils.isElementVisuallyHiddenOrHidden($el);
    const parent = Utils.findVisibleParent($el, 'display', 'none');

    // Create an object for heading outline panel.
    headingOutline.push({
      element: $el,
      headingLevel: level,
      text: headingText,
      index: i,
      type,
      hidden: hiddenHeading,
      visibleParent: parent,
      dismiss: Utils.prepareDismissal(`H${level + headingText}`),
      isWithinRoot,
    });
  });

  // Missing Heading 1
  if (option.checks.HEADING_MISSING_ONE && Elements.Found.HeadingOne.length === 0) {
    results.push({
      type: option.checks.HEADING_MISSING_ONE.type || 'warning',
      content: option.checks.HEADING_MISSING_ONE.content || Lang.sprintf('HEADING_MISSING_ONE'),
      dismiss: 'MISSINGH1',
      developer: option.checks.HEADING_MISSING_ONE.developer || false,
    });
  }
  return { results, headingOutline };
}
