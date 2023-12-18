import Elements from '../utils/elements';
import * as Utils from '../utils/utils';
import Lang from '../utils/lang';
import { computeAriaLabel } from '../utils/computeAccessibleName';

export default function checkEmbeddedContent(results, option) {
  if (option.embeddedContentAll) {
    // Warning: Audio content.
    if (option.embeddedContentAudio) {
      Elements.Found.Audio.forEach(($el) => {
        const src = ($el.getAttribute('src') !== 'undefined')
          ? $el.getAttribute('src')
          : $el.querySelector('[src]')?.getAttribute('src');

        // General warning for audio content.
        const key = Utils.prepareDismissal(`AUDIO${src}`);
        results.push({
          element: $el,
          type: 'warning',
          content: Lang.sprintf('EMBED_AUDIO'),
          inline: false,
          position: 'beforebegin',
          dismiss: key,
        });
      });
    }

    // Warning: Video content.
    if (option.embeddedContentVideo) {
      Elements.Found.Videos.forEach(($el) => {
        const src = ($el.getAttribute('src') !== 'undefined')
          ? $el.getAttribute('src')
          : $el.querySelector('[src]')?.getAttribute('src');

        // Warning if <track> doesn't exist, or the <track>'s src is empty.
        const track = $el.querySelector('track');
        const trackSrc = track?.getAttribute('src');
        if (track === null || trackSrc === null || trackSrc.trim().length === 0) {
          const key = Utils.prepareDismissal(`VIDEO${src}`);
          results.push({
            element: $el,
            type: 'warning',
            content: Lang.sprintf('EMBED_VIDEO'),
            inline: false,
            position: 'beforebegin',
            dismiss: key,
          });
        }
      });
    }

    // Warning: Data visualizations.
    if (option.embeddedContentDataViz) {
      Elements.Found.Visualizations.forEach(($el) => {
        const src = ($el.getAttribute('src') !== 'undefined')
          ? $el.getAttribute('src')
          : $el.querySelector('[src]')?.getAttribute('src');

        // General warning for data vizualization widgets.
        const key = Utils.prepareDismissal(`DATAVIZ${src}`);
        results.push({
          element: $el,
          type: 'warning',
          content: Lang.sprintf('EMBED_DATA_VIZ'),
          inline: false,
          position: 'beforebegin',
          dismiss: key,
        });
      });
    }

    /* Error: Check all iFrames for a missing accessible name. */
    if (option.embeddedContentTitles) {
      Elements.Found.iframes.forEach(($el) => {
        // Ignore completely hidden elements and video/audio.
        const hidden = Utils.isElementHidden($el);
        const videoAudio = $el.tagName === 'VIDEO' || $el.tagName === 'AUDIO';
        const ariaHidden = $el.getAttribute('aria-hidden') === 'true';
        const negativeTabindex = $el.getAttribute('tabindex') === '-1';
        if (hidden || videoAudio || (ariaHidden && negativeTabindex)) {
          return;
        }

        // Warning if element only has negative tabindex (without aria-hidden). Axe rulecheck.
        if (negativeTabindex) {
          results.push({
            element: $el,
            type: 'error',
            content: Lang.sprintf('EMBED_UNFOCUSABLE'),
            inline: false,
            position: 'beforebegin',
          });
          return;
        }

        // Accessible name is missing for iFrame.
        const aria = computeAriaLabel($el);
        const checkTitle = (aria === 'noAria') ? ($el.getAttribute('title') || '') : aria;
        const accessibleName = Utils.removeWhitespace(checkTitle);

        if (accessibleName.length === 0) {
          results.push({
            element: $el,
            type: 'error',
            content: Lang.sprintf('EMBED_MISSING_TITLE'),
            inline: false,
            position: 'beforebegin',
          });
        }
      });
    }

    /* Warning: for all iFrames (except video, audio, or data visualizations). */
    if (option.embeddedContentGeneral) {
      Elements.Found.EmbeddedContent.forEach(($el) => {
        // Ignore completely hidden elements.
        const ariaHidden = $el.getAttribute('aria-hidden') === 'true';
        const negativeTabindex = $el.getAttribute('tabindex') === '-1';
        const hidden = Utils.isElementHidden($el);
        if (hidden || (ariaHidden && negativeTabindex)) {
          return;
        }

        // Ignore video & audio elements.
        if ($el.tagName === 'VIDEO' || $el.tagName === 'AUDIO') {
          return;
        }

        const src = ($el.getAttribute('src') !== 'undefined')
          ? $el.getAttribute('src')
          : $el.querySelector('[src]')?.getAttribute('src');

        const key = Utils.prepareDismissal(`IFRAME${src}`);
        results.push({
          element: $el,
          type: 'warning',
          content: Lang.sprintf('EMBED_GENERAL_WARNING'),
          inline: false,
          position: 'beforebegin',
          dismiss: key,
        });
      });
    }
  }
  return results;
}
