import { computeAccessibleName } from '../utils/computeAccessibleName';
import Constants from '../utils/constants';
import Elements from '../utils/elements';
import * as Utils from '../utils/utils';
import { State } from '../core/state';
import { pushResult } from '../utils/pushResult';

export default function checkHeaders() {
  let prevLevel;
  let prevHeadingText = '';

  Elements.Found.Headings.forEach(($el, i) => {
    // Get accessible name of heading.
    const accName = computeAccessibleName($el, Constants.Exclusions.HeaderSpan);
    const headingText = Utils.removeWhitespace(
      accName.replace(Constants.Global.headerStringExclusionPattern, ''),
    );

    // Check if heading is within root target area.
    const rootContainsHeading = Constants.Root.areaToCheck.some((root) => root.contains($el));
    const rootContainsShadowHeading = Constants.Root.areaToCheck.some((root) =>
      root.contains($el.getRootNode().host),
    );
    const isWithinRoot = rootContainsHeading || rootContainsShadowHeading;

    // Check if heading starts an override zone.
    const headingStartsOverride = Elements.Found.HeadingOverrideStart.get($el);
    if (headingStartsOverride) prevLevel = headingStartsOverride;

    // Determine heading level and limits.
    const level = parseInt($el.getAttribute('aria-level') || $el.tagName.slice(1), 10);
    const headingLength = headingText.length;
    const maxHeadingLength = State.option.checks.HEADING_LONG?.maxLength || 160;

    // Push to results array.
    const logResult = (params) =>
      pushResult({
        element: $el,
        dismiss: level + headingText,
        ...params,
      });

    let result = null;

    // Evaluate.
    if (headingLength === 0) {
      const image = $el.querySelector('img');
      const alt = image?.getAttribute('alt');

      if (image && (!alt || alt.trim() === '' || accName === '')) {
        result = logResult({
          test: 'HEADING_EMPTY_WITH_IMAGE',
          args: [level],
          margin: '-15px 30px',
        });
      } else {
        result = logResult({
          test: 'HEADING_EMPTY',
          args: [level],
          margin: '0',
        });
      }
    } else if (level - prevLevel > 1 && (i !== 0 || headingStartsOverride)) {
      result = logResult({
        test: 'HEADING_SKIPPED_LEVEL',
        args: [
          prevLevel,
          level,
          Utils.truncateString(headingText, 60),
          Utils.truncateString(prevHeadingText, 60),
          prevLevel + 1,
        ],
      });
    } else if (i === 0 && level !== 1 && level !== 2) {
      result = logResult({ test: 'HEADING_FIRST' });
    } else if (headingLength > maxHeadingLength) {
      result = logResult({
        test: 'HEADING_LONG',
        type: 'warning',
        args: [maxHeadingLength, headingLength, headingText],
      });
    }

    // Outline panel creation.
    if (!Elements.Found.OutlineIgnore.includes($el)) {
      State.headingOutline.push({
        element: $el,
        headingLevel: level,
        text: headingText,
        type: result?.type || null,
        dismiss: Utils.prepareDismissal(`${result?.test || ''}${level}${headingText}`.trim()),
        isWithinRoot,
      });
    }

    // Reset level and text for the next loop iteration.
    prevLevel = level;
    prevHeadingText = headingText;
  });

  // Missing heading 1.
  if (State.option.checks.HEADING_MISSING_ONE && Elements.Found.HeadingOne.length === 0) {
    pushResult({
      test: 'HEADING_MISSING_ONE',
      type: 'warning',
      dismiss: 'HEADING_MISSING_ONE',
    });
  }
}
