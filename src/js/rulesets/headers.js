import Constants from '../utils/constants';
import Elements from '../utils/elements';
import * as Utils from '../utils/utils';
import Lang from '../utils/lang';

export default function checkHeaders(
  results,
  nonConsecutiveHeadingIsError,
  flagLongHeadings,
  headingOutline,
) {
  let prevLevel;
  Elements.Found.Headings.forEach(($el, i) => {
    const ignore = Utils.fnIgnore($el); // Ignore unwanted <style>, <script>, etc tags.
    const text = Utils.computeTextNodeWithImage(ignore);
    const headingText = Utils.sanitizeHTML(text);

    let level;
    if ($el.getAttribute('aria-level')) {
      level = +$el.getAttribute('aria-level');
    } else {
      level = +$el.tagName.slice(1);
    }
    level = parseInt(level, 10);

    const headingLength = headingText.length;
    let error = null;
    let warning = null;

    if (level - prevLevel > 1 && i !== 0) {
      if (nonConsecutiveHeadingIsError === true) {
        error = Lang.sprintf('HEADING_NON_CONSECUTIVE_LEVEL', prevLevel, level);
        results.push({
          element: $el,
          type: Constants.Global.ERROR,
          content: error,
          inline: false,
          position: 'beforebegin',
        });
      } else {
        warning = Lang.sprintf('HEADING_NON_CONSECUTIVE_LEVEL', prevLevel, level);
        const key = Utils.prepareDismissal(`HEADING${level + headingText}`);
        results.push({
          element: $el,
          type: Constants.Global.WARNING,
          content: warning,
          inline: false,
          position: 'beforebegin',
          dismiss: key,
        });
      }
    } else if (headingLength === 0) {
      if ($el.querySelectorAll('img').length) {
        const imgalt = $el.querySelector('img').getAttribute('alt');
        if (imgalt === null || imgalt === ' ' || imgalt === '') {
          error = Lang.sprintf('HEADING_EMPTY_WITH_IMAGE', level);
          results.push({
            element: $el,
            type: Constants.Global.ERROR,
            content: error,
            inline: false,
            position: 'beforebegin',
          });
        }
      } else {
        error = Lang.sprintf('HEADING_EMPTY', level);
        results.push({
          element: $el,
          type: Constants.Global.ERROR,
          content: error,
          inline: false,
          position: 'beforebegin',
        });
      }
    } else if (i === 0 && level !== 1 && level !== 2) {
      error = Lang._('HEADING_FIRST');
      results.push({
        element: $el,
        type: Constants.Global.ERROR,
        content: error,
        inline: false,
        position: 'beforebegin',
      });
    } else if (headingLength > 170 && flagLongHeadings === true) {
      warning = Lang.sprintf('HEADING_LONG', headingLength);
      const key = Utils.prepareDismissal(`HEADING${level + headingText}`);
      results.push({
        element: $el,
        type: Constants.Global.WARNING,
        content: warning,
        inline: false,
        position: 'beforebegin',
        dismiss: key,
      });
    }
    prevLevel = level;

    const hiddenHeading = Utils.isElementVisuallyHiddenOrHidden($el);
    const parent = Utils.findVisibleParent($el, 'display', 'none');
    // Create an object for heading outline panel.
    if (error !== null) {
      headingOutline.push({
        element: $el, headingLevel: level, text: headingText, index: i, type: Constants.Global.ERROR, hidden: hiddenHeading, visibleParent: parent,
      });
    } else if (warning !== null) {
      const key = Utils.prepareDismissal(`HEADING${level + headingText}`);
      headingOutline.push({
        element: $el, headingLevel: level, text: headingText, index: i, type: Constants.Global.WARNING, hidden: hiddenHeading, visibleParent: parent, dismiss: key,
      });
    } else if (error === null || warning === null) {
      headingOutline.push({
        element: $el, headingLevel: level, text: headingText, index: i, hidden: hiddenHeading, visibleParent: parent,
      });
    }
  });
  // Missing Heading 1
  if (Elements.Found.HeadingOne.length === 0) {
    results.push({
      type: Constants.Global.ERROR,
      content: Lang.sprintf('HEADING_MISSING_ONE'),
    });
  }
  return { results, headingOutline };
}
