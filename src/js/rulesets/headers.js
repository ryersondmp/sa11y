import { computeAccessibleName } from '../utils/computeAccessibleName';
import Constants from '../utils/constants';
import Elements from '../utils/elements';
import Lang from '../utils/lang';
import * as Utils from '../utils/utils';

export default function checkHeaders(results, option, headingOutline) {
  let prevLevel;
  let prevHeadingText = '';
  const stringExclusionPattern = Utils.generateRegexString(option.headerIgnoreStrings);

  // Start the loop!
  Elements.Found.Headings.forEach(($el, i) => {
    // Get accessible name of heading.
    const accName = computeAccessibleName($el, Constants.Exclusions.HeaderSpan);
    const stringMatchExclusions = accName.replace(stringExclusionPattern, '');
    const removeWhitespace = Utils.removeWhitespace(stringMatchExclusions);
    const headingText = Utils.sanitizeHTML(removeWhitespace);

    // Check if heading is within root target area.
    const rootContainsHeading = Constants.Root.areaToCheck.some((root) => root.contains($el));
    const rootContainsShadowHeading = Constants.Root.areaToCheck.some((root) =>
      root.contains($el.getRootNode().host),
    );
    const isWithinRoot = rootContainsHeading || rootContainsShadowHeading;

    // Check if heading starts an override zone.
    const headingStartsOverride = Elements.Found.HeadingOverrideStart.get($el);
    if (headingStartsOverride) {
      prevLevel = headingStartsOverride;
    }

    // Determine heading level.
    const level = parseInt($el.getAttribute('aria-level') || $el.tagName.slice(1), 10);
    const headingLength = removeWhitespace.length;
    const maxHeadingLength = option.checks.HEADING_LONG.maxLength || 160;

    // Default.
    let test = null;
    let type = null;
    let content = null;
    let developer = null;
    let dismissAll = null;
    let margin = null;

    // Rulesets.
    if (headingLength === 0) {
      const image = $el.querySelector('img');
      if (image) {
        const alt = image?.getAttribute('alt');
        if (image && (!alt || alt.trim() === '')) {
          if (option.checks.HEADING_EMPTY_WITH_IMAGE) {
            test = 'HEADING_EMPTY_WITH_IMAGE';
            type = option.checks.HEADING_EMPTY_WITH_IMAGE.type || 'error';
            content = Lang.sprintf(
              option.checks.HEADING_EMPTY_WITH_IMAGE.content || 'HEADING_EMPTY_WITH_IMAGE',
              level,
            );
            developer = option.checks.HEADING_EMPTY_WITH_IMAGE.developer || false;
            dismissAll = option.checks.HEADING_EMPTY_WITH_IMAGE.dismissAll
              ? 'HEADING_EMPTY_WITH_IMAGE'
              : false;
            margin = '-15px 30px';
          }
        }
      } else if (option.checks.HEADING_EMPTY) {
        test = 'HEADING_EMPTY';
        type = option.checks.HEADING_EMPTY.type || 'error';
        content = Lang.sprintf(option.checks.HEADING_EMPTY.content || 'HEADING_EMPTY', level);
        developer = option.checks.HEADING_EMPTY.developer || false;
        dismissAll = option.checks.HEADING_EMPTY.dismissAll ? 'HEADING_EMPTY' : false;
        margin = '0';
      }
    } else if (level - prevLevel > 1 && i !== 0) {
      if (option.checks.HEADING_SKIPPED_LEVEL) {
        test = 'HEADING_SKIPPED_LEVEL';
        type = option.checks.HEADING_SKIPPED_LEVEL.type || 'error';
        content = Lang.sprintf(
          option.checks.HEADING_SKIPPED_LEVEL.content || 'HEADING_SKIPPED_LEVEL',
          prevLevel,
          level,
          Utils.truncateString(headingText, 60),
          Utils.truncateString(prevHeadingText, 60),
          prevLevel + 1,
        );
        developer = option.checks.HEADING_SKIPPED_LEVEL.developer || false;
        dismissAll = option.checks.HEADING_SKIPPED_LEVEL.dismissAll
          ? 'HEADING_SKIPPED_LEVEL'
          : false;
      }
    } else if (i === 0 && level !== 1 && level !== 2) {
      if (option.checks.HEADING_FIRST) {
        test = 'HEADING_FIRST';
        type = option.checks.HEADING_FIRST.type || 'error';
        content = Lang.sprintf(option.checks.HEADING_FIRST.content || 'HEADING_FIRST');
        developer = option.checks.HEADING_FIRST.developer || false;
        dismissAll = option.checks.HEADING_FIRST.dismissAll ? 'HEADING_FIRST' : false;
      }
    } else if (headingLength > maxHeadingLength) {
      if (option.checks.HEADING_LONG) {
        test = 'HEADING_LONG';
        type = option.checks.HEADING_LONG.type || 'warning';
        content = Lang.sprintf(
          option.checks.HEADING_LONG.content || 'HEADING_LONG',
          maxHeadingLength,
          headingLength,
        );
        developer = option.checks.HEADING_LONG.developer || false;
        dismissAll = option.checks.HEADING_LONG.dismissAll ? 'HEADING_LONG' : false;
      }
    }

    // Create results object.
    if (content && type) {
      results.push({
        test,
        element: $el,
        type,
        content,
        dismiss: Utils.prepareDismissal(`H${level + headingText}`),
        dismissAll,
        isWithinRoot,
        developer,
        margin,
      });
    }

    // Reset level and text.
    prevLevel = level;
    prevHeadingText = headingText;

    // Create an object for heading outline panel.
    // Filter out specified headings in outlineIgnore and headerIgnore props.
    if (!Elements.Found.OutlineIgnore.includes($el)) {
      headingOutline.push({
        element: $el,
        headingLevel: level,
        text: headingText,
        type,
        dismiss: Utils.prepareDismissal(`H${level + headingText}`),
        isWithinRoot,
      });
    }
  });

  // Missing Heading 1
  if (option.checks.HEADING_MISSING_ONE && Elements.Found.HeadingOne.length === 0) {
    results.push({
      test: 'HEADING_MISSING_ONE',
      type: option.checks.HEADING_MISSING_ONE.type || 'warning',
      content: Lang.sprintf(option.checks.HEADING_MISSING_ONE.content || 'HEADING_MISSING_ONE'),
      dismiss: 'MISSINGH1',
      developer: option.checks.HEADING_MISSING_ONE.developer || false,
    });
  }
  return { results, headingOutline };
}
