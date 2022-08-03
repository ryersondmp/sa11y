// ============================================================
// Rulesets: Links (Advanced)
// ============================================================
import Lang from '../components/translation';
import { WARNING } from '../components/constants';
import * as utilities from '../components/utilities';
import { annotate } from '../components/annotate';

export default function checkLinksAdvanced() {
  const seen = {};
  Sa11y.$links.forEach((el) => {
    let linkText = utilities.computeAriaLabel(el);
    const $img = el.querySelector('img');

    if (linkText === 'noAria') {
      // Plain text content.
      linkText = el.textContent.trim();

      // If an image exists within the link.
      if ($img) {
        // Check if there's aria on the image.
        const imgText = utilities.computeAriaLabel($img);
        if (imgText !== 'noAria') {
          linkText += imgText;
        } else {
          // No aria? Process alt on image.
          linkText += $img ? ($img.getAttribute('alt') || '') : '';
        }
      }
    }

    // Remove whitespace, special characters, etc.
    const linkTextTrimmed = linkText.replace(/'|"|-|\.|\s+/g, '').trim().toLowerCase();

    // Links with identical accessible names have equivalent purpose.
    const href = el.getAttribute('href');

    if (linkText.length !== 0) {
      if (seen[linkTextTrimmed] && linkTextTrimmed.length !== 0) {
        if (seen[href]) {
          // Nothing
        } else {
          el.classList.add('sa11y-warning-text');
          el.insertAdjacentHTML(
            'afterend',
            annotate(WARNING, Lang.sprintf('LINK_IDENTICAL_NAME', linkText), true),
          );
        }
      } else {
        seen[linkTextTrimmed] = true;
        seen[href] = true;
      }
    }

    // New tab or new window.
    const containsNewWindowPhrases = Lang._('NEW_WINDOW_PHRASES').some((pass) => {
      if (linkText.trim().length === 0 && !!el.getAttribute('title')) {
        linkText = el.getAttribute('title');
      }
      return linkText.toLowerCase().indexOf(pass) >= 0;
    });

    // Link that points to a file type indicates that it does.
    const containsFileTypePhrases = Lang._('FILE_TYPE_PHRASES').some((pass) => linkText.toLowerCase().indexOf(pass) >= 0);

    const fileTypeMatch = el.matches(`
          a[href$='.pdf'],
          a[href$='.doc'],
          a[href$='.docx'],
          a[href$='.zip'],
          a[href$='.mp3'],
          a[href$='.txt'],
          a[href$='.exe'],
          a[href$='.dmg'],
          a[href$='.rtf'],
          a[href$='.pptx'],
          a[href$='.ppt'],
          a[href$='.xls'],
          a[href$='.xlsx'],
          a[href$='.csv'],
          a[href$='.mp4'],
          a[href$='.mov'],
          a[href$='.avi']
        `);

    if (el.getAttribute('target') === '_blank' && !fileTypeMatch && !containsNewWindowPhrases) {
      el.classList.add('sa11y-warning-text');
      el.insertAdjacentHTML(
        'afterend',
        annotate(WARNING, Lang._('NEW_TAB_WARNING'), true),
      );
    }

    if (fileTypeMatch && !containsFileTypePhrases) {
      el.classList.add('sa11y-warning-text');
      el.insertAdjacentHTML(
        'beforebegin',
        annotate(WARNING, Lang._('FILE_TYPE_WARNING'), true),
      );
    }
  });
};