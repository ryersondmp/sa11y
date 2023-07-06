import Constants from '../utils/constants';
import Elements from '../utils/elements';
import * as Utils from '../utils/utils';
import Lang from '../utils/lang';

export default function checkLinksAdvanced(results, option) {
  if (option.linksAdvancedPlugin === true) {
    if (
      Utils.store.getItem('sa11y-remember-links-advanced') === 'On'
      || option.headless === true
      || option.checkAllHideToggles === true
    ) {
      const seen = {};
      Elements.Found.Links.forEach(($el) => {
        let linkText = Utils.computeAccessibleName($el);
        const $img = $el.querySelector('img');

        // If link has no ARIA.
        if (linkText === 'noAria') {
          linkText = Utils.fnIgnore($el, Constants.Exclusions.LinkSpan);
          linkText = Utils.getText(linkText); // Get inner text within anchor.

          // If an image exists within the link.
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

        // Remove whitespace, special characters, etc.
        const linkTextTrimmed = linkText.replace(/'|"|-|\.|\s+/g, '').toLowerCase();

        // Links with identical accessible names have equivalent purpose.
        const href = $el.getAttribute('href');

        if (linkText.length !== 0) {
          if (seen[linkTextTrimmed] && linkTextTrimmed.length !== 0) {
            if (seen[href]) {
              // Nothing
            } else {
              const key = Utils.prepareDismissal(`LINK${linkTextTrimmed + href}`);
              const sanitizedText = Utils.sanitizeHTML(linkText);
              results.push({
                element: $el,
                type: 'warning',
                content: Lang.sprintf('LINK_IDENTICAL_NAME', sanitizedText),
                inline: true,
                position: 'beforebegin',
                dismiss: key,
              });
            }
          } else {
            seen[linkTextTrimmed] = true;
            seen[href] = true;
          }
        }

        // New tab or new window.
        const containsNewWindowPhrases = Lang._('NEW_WINDOW_PHRASES').some((pass) => {
          if (linkText.trim().length === 0 && !!$el.getAttribute('title')) {
            linkText = $el.getAttribute('title');
          }
          return linkText.toLowerCase().indexOf(pass) >= 0;
        });

        // Link that points to a file type and indicates as such.
        const defaultFileTypes = ['pdf', 'doc', 'docx', 'word', 'mp3', 'ppt', 'text', 'pptx', 'txt', 'exe', 'dmg', 'rtf', 'windows', 'macos', 'csv', 'xls', 'xlsx', 'mp4', 'mov', 'avi', 'zip'];
        const fileTypes = defaultFileTypes.concat(Lang._('FILE_TYPE_PHRASES'));
        const containsFileTypePhrases = fileTypes.some((pass) => linkText.toLowerCase().indexOf(pass) >= 0);
        const fileTypeMatch = $el.matches(`
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

        if (linkTextTrimmed.length !== 0 && $el.getAttribute('target') === '_blank' && !fileTypeMatch && !containsNewWindowPhrases) {
          const key = Utils.prepareDismissal(`LINK${linkTextTrimmed + href}`);
          results.push({
            element: $el,
            type: 'warning',
            content: Lang.sprintf('NEW_TAB_WARNING'),
            inline: true,
            position: 'beforebegin',
            dismiss: key,
          });
        }

        if (linkTextTrimmed.length !== 0 && fileTypeMatch && !containsFileTypePhrases) {
          const key = Utils.prepareDismissal(`LINK${linkTextTrimmed + href}`);
          results.push({
            element: $el,
            type: 'warning',
            content: Lang.sprintf('FILE_TYPE_WARNING'),
            inline: true,
            position: 'beforebegin',
            dismiss: key,
          });
        }
      });
    }
  }
  return results;
}
