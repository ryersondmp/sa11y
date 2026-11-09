import { computeAriaLabel } from '../utils/computeAccessibleName';
import Elements from '../utils/elements';
import * as Utils from '../utils/utils';
import Lang from '../utils/lang';
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

    // Check for autoplay. Adapted from https://github.com/pourdev/pour-engine/blob/main/engine/rules/wcag/2.2.2-video-loop-motion.js
    if (State.option.checks.EMBED_VIDEO_AUTOPLAY) {
      if (!$el.autoplay && !$el.loop) return;
      if ($el.controls) return;

      // Skip small icon-scale / spinner-class video previews
      const rect = $el.getBoundingClientRect();
      if (rect.width < 64 && rect.height < 64) return;

      // Skip videos not playing (autoplay blocked or paused by existing control)
      if ($el.paused && $el.readyState >= 2) return;

      // Skip if a valid pause button is linked via aria-controls
      // Find pause control.
      function pauseControlFor(video) {
        const root = video.getRootNode();
        if (!root?.querySelectorAll) return null;
        const selector =
          'button[aria-controls], [role="button"][aria-controls], input[type="button"][aria-controls]';
        const isVisible = (el) =>
          el.checkVisibility
            ? el.checkVisibility({ checkOpacity: true, checkVisibilityCSS: true })
            : el.offsetWidth > 0 || el.offsetHeight > 0;
        for (const control of root.querySelectorAll(selector)) {
          if (
            control.disabled ||
            control.getAttribute('aria-disabled') === 'true' ||
            !isVisible(control)
          )
            continue;
          const ids = control.getAttribute('aria-controls').trim().split(/\s+/);
          const hasTarget = ids.some((id) => {
            const target = root.getElementById
              ? root.getElementById(id)
              : root.querySelector?.(`#${CSS.escape(id)}`);
            return target?.contains(video);
          });
          if (hasTarget) return control;
        }
        return null;
      }
      if (pauseControlFor($el)) return;

      pushResult({
        element: $el,
        test: 'EMBED_VIDEO_AUTOPLAY',
        type: 'warning',
        developer: true,
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
      $el.hasAttribute('inert') ||
      ['VIDEO', 'AUDIO'].includes($el.tagName)
    ) {
      return;
    }

    // Warning if element only has negative tabindex.
    if (Utils.isNegativeTabindex($el)) {
      if (State.option.checks.EMBED_UNFOCUSABLE) {
        pushResult({
          test: 'EMBED_UNFOCUSABLE',
          element: $el,
          dismiss: src($el),
          developer: true,
        });
        return;
      }
    }

    const aria = computeAriaLabel($el);
    const checkTitle = aria === 'noAria' ? $el.getAttribute('title') || '' : aria;
    if (Utils.removeWhitespace(checkTitle).length === 0) {
      const tagName = $el?.tagName.toLowerCase();
      pushResult({
        test: 'EMBED_MISSING_TITLE',
        element: $el,
        dismiss: src($el),
        developer: true,
        content: Lang.sprintf('EMBED_MISSING_TITLE', tagName),
        args: [tagName],
      });
    }
  });

  // General warning for embedded content.
  Elements.Found.EmbeddedContent.forEach(($el) => {
    if (
      Utils.isElementHidden($el) ||
      Utils.isHiddenAndUnfocusable($el) ||
      $el.hasAttribute('inert') ||
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
