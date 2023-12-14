import Elements from '../utils/elements';
import * as Utils from '../utils/utils';
import Lang from '../utils/lang';
import Constants from '../utils/constants';
import { computeAccessibleName } from '../utils/computeAccessibleName';

export default function checkHeaders(results, option, headingOutline) {
  let prevLevel;
  Elements.Found.Headings.forEach(($el, i) => {
    const accessibleName = computeAccessibleName($el);
    const removeWhitespace = Utils.removeWhitespace(accessibleName);
    const headingText = Utils.sanitizeHTML(removeWhitespace);

    // Check if heading is within root target area.
    const rootContainsHeading = Constants.Global.Root.contains($el);
    const rootContainsShadowHeading = Constants.Global.Root.contains($el.getRootNode().host);
    const isWithinRoot = rootContainsHeading || rootContainsShadowHeading;

    // Determine heading level.
    const level = parseInt($el.getAttribute('aria-level') || $el.tagName.slice(1), 10);
    const headingLength = headingText.length;

    let error = null;
    let warning = null;

    if (level - prevLevel > 1 && i !== 0) {
      if (option.nonConsecutiveHeadingIsError) {
        error = Lang.sprintf('HEADING_NON_CONSECUTIVE_LEVEL', prevLevel, level);
        results.push({
          element: $el,
          type: 'error',
          content: error,
          inline: false,
          position: 'beforebegin',
          isWithinRoot,
        });
      } else {
        warning = Lang.sprintf('HEADING_NON_CONSECUTIVE_LEVEL', prevLevel, level);
        const key = Utils.prepareDismissal(`HEADING${level + headingText}`);
        results.push({
          element: $el,
          type: 'warning',
          content: warning,
          inline: false,
          position: 'beforebegin',
          dismiss: key,
          isWithinRoot,
        });
      }
    } else if (headingLength === 0) {
      if ($el.querySelectorAll('img').length) {
        const imgalt = $el.querySelector('img').getAttribute('alt');
        if (imgalt === null || imgalt === ' ' || imgalt === '') {
          error = Lang.sprintf('HEADING_EMPTY_WITH_IMAGE', level);
          results.push({
            element: $el,
            type: 'error',
            content: error,
            inline: false,
            position: 'beforebegin',
            isWithinRoot,
          });
        }
      } else {
        error = Lang.sprintf('HEADING_EMPTY', level);
        results.push({
          element: $el,
          type: 'error',
          content: error,
          inline: false,
          position: 'beforebegin',
          isWithinRoot,
        });
      }
    } else if (i === 0 && level !== 1 && level !== 2) {
      error = Lang.sprintf('HEADING_FIRST');
      results.push({
        element: $el,
        type: 'error',
        content: error,
        inline: false,
        position: 'beforebegin',
        isWithinRoot,
      });
    } else if (headingLength > option.headingMaxCharLength && option.flagLongHeadings) {
      warning = Lang.sprintf('HEADING_LONG', headingLength);
      const key = Utils.prepareDismissal(`HEADING${level + headingText}`);
      results.push({
        element: $el,
        type: 'warning',
        content: warning,
        inline: false,
        position: 'beforebegin',
        dismiss: key,
        isWithinRoot,
      });
    }

    prevLevel = level;
    const hiddenHeading = Utils.isElementVisuallyHiddenOrHidden($el);
    const parent = Utils.findVisibleParent($el, 'display', 'none');

    // Create an object for heading outline panel.
    if (error !== null) {
      headingOutline.push({
        element: $el,
        headingLevel: level,
        text: headingText,
        index: i,
        type: 'error',
        hidden: hiddenHeading,
        visibleParent: parent,
        isWithinRoot,
      });
    } else if (warning !== null) {
      const key = Utils.prepareDismissal(`HEADING${level + headingText}`);
      headingOutline.push({
        element: $el,
        headingLevel: level,
        text: headingText,
        index: i,
        type: 'warning',
        hidden: hiddenHeading,
        visibleParent: parent,
        dismiss: key,
        isWithinRoot,
      });
    } else if (error === null || warning === null) {
      headingOutline.push({
        element: $el,
        headingLevel: level,
        text: headingText,
        index: i,
        hidden: hiddenHeading,
        visibleParent: parent,
        isWithinRoot,
      });
    }
  });

  // Missing Heading 1
  if (Elements.Found.HeadingOne.length === 0 && option.missingH1) {
    results.push({
      type: 'warning',
      content: Lang.sprintf('HEADING_MISSING_ONE'),
      dismiss: 'missingH1',
    });
  }
  return { results, headingOutline };
}
