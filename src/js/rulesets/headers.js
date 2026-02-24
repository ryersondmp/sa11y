import { computeAccessibleName } from '../utils/computeAccessibleName';
import Constants from '../utils/constants';
import Elements from '../utils/elements';
import Lang from '../utils/lang';
import * as Utils from '../utils/utils';
import { State } from '../core/state';

export default function checkHeaders() {
  let prevLevel;
  let prevHeadingText = '';
  const stringExclusionPattern = Utils.generateRegexString(State.option.headerIgnoreStrings);

  // Start the loop!
  Elements.Found.Headings.forEach(($el, i) => {
    // Get accessible name of heading.
    const accName = computeAccessibleName($el, Constants.Exclusions.HeaderSpan);
    const stringMatchExclusions = accName.replace(stringExclusionPattern, '');
    const headingText = Utils.removeWhitespace(stringMatchExclusions);

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
    const headingLength = headingText.length;
    const maxHeadingLength = State.option.checks.HEADING_LONG.maxLength || 160;

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
          if (State.option.checks.HEADING_EMPTY_WITH_IMAGE) {
            test = 'HEADING_EMPTY_WITH_IMAGE';
            type = State.option.checks.HEADING_EMPTY_WITH_IMAGE.type || 'error';
            content = Lang.sprintf(
              State.option.checks.HEADING_EMPTY_WITH_IMAGE.content || 'HEADING_EMPTY_WITH_IMAGE',
              level,
            );
            developer = State.option.checks.HEADING_EMPTY_WITH_IMAGE.developer || false;
            dismissAll = State.option.checks.HEADING_EMPTY_WITH_IMAGE.dismissAll
              ? 'HEADING_EMPTY_WITH_IMAGE'
              : false;
            margin = '-15px 30px';
          }
        }
      } else if (State.option.checks.HEADING_EMPTY) {
        test = 'HEADING_EMPTY';
        type = State.option.checks.HEADING_EMPTY.type || 'error';
        content = Lang.sprintf(State.option.checks.HEADING_EMPTY.content || 'HEADING_EMPTY', level);
        developer = State.option.checks.HEADING_EMPTY.developer || false;
        dismissAll = State.option.checks.HEADING_EMPTY.dismissAll ? 'HEADING_EMPTY' : false;
        margin = '0';
      }
    } else if (level - prevLevel > 1 && (i !== 0 || headingStartsOverride)) {
      if (State.option.checks.HEADING_SKIPPED_LEVEL) {
        test = 'HEADING_SKIPPED_LEVEL';
        type = State.option.checks.HEADING_SKIPPED_LEVEL.type || 'error';
        content = Lang.sprintf(
          State.option.checks.HEADING_SKIPPED_LEVEL.content || 'HEADING_SKIPPED_LEVEL',
          prevLevel,
          level,
          Utils.truncateString(headingText, 60),
          Utils.truncateString(prevHeadingText, 60),
          prevLevel + 1,
        );
        developer = State.option.checks.HEADING_SKIPPED_LEVEL.developer || false;
        dismissAll = State.option.checks.HEADING_SKIPPED_LEVEL.dismissAll
          ? 'HEADING_SKIPPED_LEVEL'
          : false;
      }
    } else if (i === 0 && level !== 1 && level !== 2) {
      if (State.option.checks.HEADING_FIRST) {
        test = 'HEADING_FIRST';
        type = State.option.checks.HEADING_FIRST.type || 'error';
        content = Lang.sprintf(State.option.checks.HEADING_FIRST.content || 'HEADING_FIRST');
        developer = State.option.checks.HEADING_FIRST.developer || false;
        dismissAll = State.option.checks.HEADING_FIRST.dismissAll ? 'HEADING_FIRST' : false;
      }
    } else if (headingLength > maxHeadingLength) {
      if (State.option.checks.HEADING_LONG) {
        test = 'HEADING_LONG';
        type = State.option.checks.HEADING_LONG.type || 'warning';
        content = Lang.sprintf(
          State.option.checks.HEADING_LONG.content || 'HEADING_LONG',
          maxHeadingLength,
          headingLength,
        );
        developer = State.option.checks.HEADING_LONG.developer || false;
        dismissAll = State.option.checks.HEADING_LONG.dismissAll ? 'HEADING_LONG' : false;
      }
    }

    // Create State.results object.
    if (content && type) {
      State.results.push({
        test,
        element: $el,
        type,
        content,
        dismiss: Utils.prepareDismissal(`${test + level + headingText}`),
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
      State.headingOutline.push({
        element: $el,
        headingLevel: level,
        text: headingText,
        type,
        dismiss: Utils.prepareDismissal(`${test + level + headingText}`),
        isWithinRoot,
      });
    }
  });

  // Missing Heading 1
  if (State.option.checks.HEADING_MISSING_ONE && Elements.Found.HeadingOne.length === 0) {
    State.results.push({
      test: 'HEADING_MISSING_ONE',
      type: State.option.checks.HEADING_MISSING_ONE.type || 'warning',
      content: Lang.sprintf(
        State.option.checks.HEADING_MISSING_ONE.content || 'HEADING_MISSING_ONE',
      ),
      dismiss: 'HEADING_MISSING_ONE',
      developer: State.option.checks.HEADING_MISSING_ONE.developer || false,
    });
  }
}
