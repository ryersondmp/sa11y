import Elements from '../utils/elements';
import * as Utils from '../utils/utils';
import Lang from '../utils/lang';
import { computeAriaLabel } from '../utils/computeAccessibleName';

export default function checkEmbeddedContent(results, option) {
  // iFrame's SRC attribute.
  const src = ($el) => ($el.getAttribute('src') !== 'undefined'
    ? $el.getAttribute('src')
    : $el.querySelector('[src]')?.getAttribute('src'));

  // Warning: Audio content.
  if (option.checks.EMBED_AUDIO) {
    Elements.Found.Audio.forEach(($el) => {
      // General warning for audio content.
      results.push({
        element: $el,
        type: option.checks.EMBED_AUDIO.type || 'warning',
        content: option.checks.EMBED_AUDIO.content || Lang.sprintf('EMBED_AUDIO'),
        dismiss: Utils.prepareDismissal(`AUDIO${src($el)}`),
        dismissAll: option.checks.EMBED_AUDIO.dismissAll ? 'EMBED_AUDIO' : false,
        developer: option.checks.EMBED_AUDIO.developer || false,
      });
    });
  }

  // Warning: Video content.
  if (option.checks.EMBED_VIDEO) {
    Elements.Found.Videos.forEach(($el) => {
      // Warning if <track> doesn't exist, or the <track>'s src is empty.
      const track = $el.querySelector('track');
      const trackSrc = track?.getAttribute('src');
      if (track === null || trackSrc === null || trackSrc.trim().length === 0) {
        results.push({
          element: $el,
          type: option.checks.EMBED_VIDEO.type || 'warning',
          content: option.checks.EMBED_VIDEO.content || Lang.sprintf('EMBED_VIDEO'),
          dismiss: Utils.prepareDismissal(`VIDEO${src($el)}`),
          dismissAll: option.checks.EMBED_VIDEO.dismissAll ? 'EMBED_VIDEO' : false,
          developer: option.checks.EMBED_VIDEO.developer || false,
        });
      }
    });
  }

  // Warning: Data visualizations.
  if (option.checks.EMBED_DATA_VIZ) {
    Elements.Found.Visualizations.forEach(($el) => {
      // General warning for data vizualization widgets.
      results.push({
        element: $el,
        type: option.checks.EMBED_DATA_VIZ.type || 'warning',
        content: option.checks.EMBED_DATA_VIZ.content || Lang.sprintf('EMBED_DATA_VIZ'),
        dismiss: Utils.prepareDismissal(`DATAVIZ${src($el)}`),
        dismissAll: option.checks.EMBED_DATA_VIZ.dismissAll ? 'EMBED_DATA_VIZ' : false,
        developer: option.checks.EMBED_DATA_VIZ.developer || false,
      });
    });
  }

  /* Error: Check all iFrames for a missing accessible name. */
  Elements.Found.iframes.forEach(($el) => {
    // Ignore hidden elements and video/audio.
    const presentation = ['presentation', 'none'].includes($el.getAttribute('role'));
    const hidden = Utils.isElementHidden($el);
    const videoAudio = $el.tagName === 'VIDEO' || $el.tagName === 'AUDIO';
    const ariaHidden = $el.getAttribute('aria-hidden') === 'true';
    const negativeTabindex = $el.getAttribute('tabindex') === '-1';
    if (hidden || videoAudio || (ariaHidden && negativeTabindex) || presentation) {
      return;
    }

    // Warning if element only has negative tabindex (without aria-hidden). Axe rulecheck.
    if (negativeTabindex) {
      if (option.checks.EMBED_UNFOCUSABLE) {
        results.push({
          element: $el,
          type: option.checks.EMBED_UNFOCUSABLE.type || 'error',
          content: option.checks.EMBED_UNFOCUSABLE.content || Lang.sprintf('EMBED_UNFOCUSABLE'),
          dismiss: Utils.prepareDismissal(`EMBEDUNFOCUSABLE${src($el)}`),
          dismissAll: option.checks.EMBED_UNFOCUSABLE.dismissAll ? 'EMBED_UNFOCUSABLE' : false,
          developer: option.checks.EMBED_UNFOCUSABLE.developer || true,
        });
      }
      return;
    }

    if (option.checks.EMBED_MISSING_TITLE) {
      // Accessible name is missing for iFrame.
      const aria = computeAriaLabel($el);
      const checkTitle = (aria === 'noAria') ? ($el.getAttribute('title') || '') : aria;
      const accessibleName = Utils.removeWhitespace(checkTitle);
      if (accessibleName.length === 0) {
        results.push({
          element: $el,
          type: option.checks.EMBED_MISSING_TITLE.type || 'error',
          content: option.checks.EMBED_MISSING_TITLE.content || Lang.sprintf('EMBED_MISSING_TITLE'),
          dismiss: Utils.prepareDismissal(`EMBEDMISSTITLE${src($el)}`),
          dismissAll: option.checks.EMBED_MISSING_TITLE.dismissAll ? 'EMBED_MISSING_TITLE' : false,
          developer: option.checks.EMBED_MISSING_TITLE.developer || true,
        });
      }
    }
  });

  /* Warning: for all iFrames (except video, audio, or data visualizations). */
  if (option.checks.EMBED_GENERAL) {
    Elements.Found.EmbeddedContent.forEach(($el) => {
      // Ignore hidden elements.
      const presentation = ['presentation', 'none'].includes($el.getAttribute('role'));
      const ariaHidden = $el.getAttribute('aria-hidden') === 'true';
      const negativeTabindex = $el.getAttribute('tabindex') === '-1';
      const hidden = Utils.isElementHidden($el);
      if (hidden || (ariaHidden && negativeTabindex) || presentation) {
        return;
      }

      // Ignore video & audio elements.
      if ($el.tagName === 'VIDEO' || $el.tagName === 'AUDIO') {
        return;
      }

      results.push({
        element: $el,
        type: option.checks.EMBED_GENERAL.type || 'warning',
        content: option.checks.EMBED_GENERAL.content || Lang.sprintf('EMBED_GENERAL'),
        dismiss: Utils.prepareDismissal(`IFRAMEGENERAL${src($el)}`),
        dismissAll: option.checks.EMBED_GENERAL.dismissAll ? 'EMBED_GENERAL' : false,
        developer: option.checks.EMBED_GENERAL.developer || false,
      });
    });
  }
  return results;
}
