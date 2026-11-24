import { computeAriaLabel } from '../utils/computeAccessibleName';
import Elements from '../utils/elements';
import * as Utils from '../utils/utils';
import Lang from '../utils/lang';
import { State } from '../core/state';
import { pushResult } from '../utils/pushResult';

/**
 * Finds a visible, enabled control that names the video (or a container of it) in aria-controls,
 * which is taken to be its pause control.
 * @param {HTMLVideoElement} video - The video.
 * @returns {Element|null} The control, or null if none is found.
 */
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
    ) {
      continue;
    }
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

/**
 * Checks whether a video plays on its own for more than five seconds with no way to pause it.
 * Adapted from https://github.com/pourdev/pour-engine/blob/main/engine/rules/wcag/2.2.2-video-loop-motion.js
 *
 * Decided from the markup where possible (the autoplay attribute rather than the playback state),
 * so the result does not depend on whether this browser blocked autoplay or how far the video
 * had loaded when the check ran. A custom pause button is only recognized when it is linked to
 * the video with aria-controls.
 * @param {Element} $el - A video source from Elements.Found.Videos (may be an iframe).
 * @returns {boolean} True if the video should be flagged.
 */
function isUnpausableAutoplay($el) {
  if ($el.tagName !== 'VIDEO') return false;

  // Starts on its own: the autoplay attribute, or already started by a script.
  if (!$el.autoplay && $el.paused) return false;

  // The browser's own controls include pause.
  if ($el.controls) return false;

  // WCAG 2.2.2 exempts motion that lasts five seconds or less. The duration is only known once
  // metadata has loaded (NaN before, Infinity for streams); a looping video never ends.
  if (!$el.loop && Number.isFinite($el.duration) && $el.duration <= 5) return false;

  // Skip small icon-scale / spinner-class video previews.
  const rect = $el.getBoundingClientRect();
  if (rect.width < 64 && rect.height < 64) return false;

  return !pauseControlFor($el);
}

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

    // Videos that move on their own and cannot be paused (WCAG 2.2.2).
    if (State.option.checks.EMBED_VIDEO_AUTOPLAY && isUnpausableAutoplay($el)) {
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
      Utils.isInert($el) ||
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
      Utils.isInert($el) ||
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
