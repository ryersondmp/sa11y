import { computeAriaLabel } from '../utils/computeAccessibleName';
import Elements from '../utils/elements';
import * as Utils from '../utils/utils';
import { State } from '../core/state';
import { pushResult } from '../utils/pushResult';

export default function checkEmbeddedContent() {
  if (!State.option.embeddedContentPlugin) return;

  // iFrame's SRC attribute helper.
  const src = ($el) =>
    $el.getAttribute('src') ||
    $el.querySelector('source[src]')?.getAttribute('src') ||
    $el.querySelector('[src]')?.getAttribute('src') ||
    null;

  // Audio content.
  Elements.Found.Audio.forEach(($el) => {
    pushResult({
      test: 'EMBED_AUDIO',
      element: $el,
      type: 'warning',
      dismiss: src($el),
    });
  });

  // Video content.
  Elements.Found.Videos.forEach(($el) => {
    const track = $el.querySelector('track');
    const trackSrc = track?.getAttribute('src');
    if (!track || !trackSrc || trackSrc.trim().length === 0) {
      pushResult({
        test: 'EMBED_VIDEO',
        element: $el,
        type: 'warning',
        dismiss: src($el),
      });
    }
  });

  // Data visualizations.
  Elements.Found.Visualizations.forEach(($el) => {
    pushResult({
      test: 'EMBED_DATA_VIZ',
      element: $el,
      type: 'warning',
      dismiss: src($el),
    });
  });

  // iFrames
  Elements.Found.iframes.forEach(($el) => {
    // Ignore hidden elements and video/audio.
    if (
      Utils.isElementHidden($el) ||
      Utils.isHiddenAndUnfocusable($el) ||
      Utils.isPresentational($el) ||
      ['VIDEO', 'AUDIO'].includes($el.tagName)
    ) {
      return;
    }

    // Warning if element only has negative tabindex.
    if (Utils.isNegativeTabindex($el)) {
      pushResult({
        test: 'EMBED_UNFOCUSABLE',
        element: $el,
        dismiss: src($el),
        developer: true,
      });
      return;
    }

    const aria = computeAriaLabel($el);
    const checkTitle = aria === 'noAria' ? $el.getAttribute('title') || '' : aria;
    if (Utils.removeWhitespace(checkTitle).length === 0) {
      pushResult({
        test: 'EMBED_MISSING_TITLE',
        element: $el,
        dismiss: src($el),
        developer: true,
      });
    }
  });

  // General warning for embedded content.
  Elements.Found.EmbeddedContent.forEach(($el) => {
    if (
      Utils.isElementHidden($el) ||
      Utils.isHiddenAndUnfocusable($el) ||
      ['VIDEO', 'AUDIO'].includes($el.tagName)
    ) {
      return;
    }

    pushResult({
      test: 'EMBED_GENERAL',
      element: $el,
      type: 'warning',
      dismiss: src($el),
    });
  });
}
