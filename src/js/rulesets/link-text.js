import Constants from '../utils/constants';
import Elements from '../utils/elements';
import * as Utils from '../utils/utils';
import Lang from '../utils/lang';

export default function checkLinkText(results, showGoodLinkButton) {
  const containsLinkTextStopWords = (textContent) => {
    const urlText = [
      'http',
      '.asp',
      '.htm',
      '.php',
      '.edu/',
      '.com/',
      '.net/',
      '.org/',
      '.us/',
      '.ca/',
      '.de/',
      '.icu/',
      '.uk/',
      '.ru/',
      '.info/',
      '.top/',
      '.xyz/',
      '.tk/',
      '.cn/',
      '.ga/',
      '.cf/',
      '.nl/',
      '.io/',
      '.fr/',
      '.pe/',
      '.nz/',
      '.pt/',
      '.es/',
      '.pl/',
      '.ua/',
    ];

    const hit = [null, null, null];

    // Flag partial stop words.
    Lang._('PARTIAL_ALT_STOPWORDS').forEach((word) => {
      if (
        textContent.length === word.length && textContent.toLowerCase().indexOf(word) >= 0
      ) {
        hit[0] = word;
      }
      return false;
    });

    // Other warnings we want to add.
    Lang._('WARNING_ALT_STOPWORDS').forEach((word) => {
      if (textContent.toLowerCase().indexOf(word) >= 0) {
        hit[1] = word;
      }
      return false;
    });

    // Flag link text containing URLs.
    urlText.forEach((word) => {
      if (textContent.toLowerCase().indexOf(word) >= 0) {
        hit[2] = word;
      }
      return false;
    });
    return hit;
  };

  Elements.Found.Links.forEach(($el) => {
    let linkText = Utils.computeAccessibleName($el);
    const hasAriaLabelledBy = $el.getAttribute('aria-labelledby');
    const hasAriaLabel = $el.getAttribute('aria-label');
    let childAriaLabelledBy = null;
    let childAriaLabel = null;
    const hasTitle = $el.getAttribute('title');
    const href = $el.getAttribute('href');

    if ($el.children.length) {
      const $firstChild = $el.children[0];
      childAriaLabelledBy = $firstChild.getAttribute('aria-labelledby');
      childAriaLabel = $firstChild.getAttribute('aria-label');
    }

    if (linkText === 'noAria') {
      // Plain text content.
      linkText = Utils.getText($el);
      const $img = $el.querySelector('img');

      // If an image exists within the link. Help with AccName computation.
      if ($img) {
        // Check if there's aria on the image.
        const imgText = Utils.computeAccessibleName($img);
        if (imgText !== 'noAria') {
          linkText += imgText;
        } else {
          // No aria? Process alt on image.
          linkText += $img ? ($img.getAttribute('alt') || '') : '';
        }
      }
    }

    // Ignore provided linkSpanIgnore prop, <style> tags, and special characters.
    const error = containsLinkTextStopWords(
      Utils.fnIgnore(
        $el, Constants.Exclusions.LinkSpan,
      ).textContent.replace(/[!*?↣↳→↓»↴]/g, '').trim(),
    );

    if ($el.querySelectorAll('img').length) {
      // Do nothing. Don't overlap with Alt Text module.
    } else if (href && !linkText) {
      // Flag empty hyperlinks.
      if ($el && hasTitle) {
        // If empty but has title attribute.
      } else if ($el.children.length) {
        // Has child elements (e.g. SVG or SPAN) <a><i></i></a>
        results.push({
          element: $el,
          type: Constants.Global.ERROR,
          content: Lang.sprintf('LINK_EMPTY_LINK_NO_LABEL'),
          inline: true,
          position: 'afterend',
        });
      } else {
        // Completely empty <a></a>
        results.push({
          element: $el,
          type: Constants.Global.ERROR,
          content: Lang.sprintf('LINK_EMPTY'),
          inline: true,
          position: 'afterend',
        });
      }
    } else if (error[0] != null) {
      // Contains stop words.
      if (hasAriaLabelledBy || hasAriaLabel || childAriaLabelledBy || childAriaLabel) {
        const sanitizedText = Utils.sanitizeHTML(linkText);
        if (showGoodLinkButton === true) {
          results.push({
            element: $el,
            type: Constants.Global.GOOD,
            content: Lang.sprintf('LINK_LABEL', sanitizedText),
            inline: true,
            position: 'afterend',
          });
        }
      } else if ($el.getAttribute('aria-hidden') === 'true' && $el.getAttribute('tabindex') === '-1') {
        // Do nothing.
      } else {
        results.push({
          element: $el,
          type: Constants.Global.ERROR,
          content: Lang.sprintf('LINK_STOPWORD', error[0]),
          inline: true,
          position: 'afterend',
        });
      }
    } else if (error[1] != null) {
      const key = Utils.prepareDismissal(`LINK${linkText + error[1] + href}`);
      // Contains warning words.
      results.push({
        element: $el,
        type: Constants.Global.WARNING,
        content: Lang.sprintf('LINK_BEST_PRACTICES', error[1]),
        inline: true,
        position: 'beforebegin',
        dismiss: key,
      });
    } else if (error[2] != null) {
      const key = Utils.prepareDismissal(`LINK${linkText + error[2] + href}`);
      // Contains URL in link text.
      if (linkText.length > 40) {
        results.push({
          element: $el,
          type: Constants.Global.WARNING,
          content: Lang.sprintf('LINK_URL'),
          inline: true,
          position: 'beforebegin',
          dismiss: key,
        });
      }
    } else if (hasAriaLabelledBy || hasAriaLabel || childAriaLabelledBy || childAriaLabel) {
      // If the link has any ARIA, append a "Good" link button.
      if (showGoodLinkButton === true) {
        const sanitizedText = Utils.sanitizeHTML(linkText);
        results.push({
          element: $el,
          type: Constants.Global.GOOD,
          content: Lang.sprintf('LINK_LABEL', sanitizedText),
          inline: true,
          position: 'afterend',
        });
      }
    }
  });
  return { results };
}
