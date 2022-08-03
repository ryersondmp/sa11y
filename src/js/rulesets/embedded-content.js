// ============================================================
// Rulesets: Embedded content.
// ============================================================
import Lang from '../components/translation';
import { ERROR, WARNING } from '../components/constants';
import { annotate } from '../components/annotate';

export default function checkEmbeddedContent() {
  // Warning: Audio content.
  if (option.embeddedContentAudio === true) {
    Sa11y.$audio.forEach(($el) => {
      $el.classList.add('sa11y-warning-border');
      $el.insertAdjacentHTML('beforebegin', annotate(WARNING, Lang._('EMBED_AUDIO')));
    });
  }

  // Warning: Video content.
  if (option.embeddedContentVideo === true) {
    Sa11y.$videos.forEach(($el) => {
      const track = $el.getElementsByTagName('TRACK');
      if ($el.tagName === 'VIDEO' && track.length) {
        // Pass if track element found.
      } else {
        $el.classList.add('sa11y-warning-border');
        $el.insertAdjacentHTML('beforebegin', annotate(WARNING, Lang._('EMBED_VIDEO')));
      }
    });
  }

  // Warning: Data visualizations.
  if (option.embeddedContentDataViz === true) {
    Sa11y.$dataviz.forEach(($el) => {
      $el.classList.add('sa11y-warning-border');
      $el.insertAdjacentHTML('beforebegin', annotate(WARNING, Lang._('EMBED_DATA_VIZ')));
    });
  }

  // Warning: Twitter timelines that are too long.
  if (option.embeddedContentTwitter === true) {
    Sa11y.$twitter.forEach(($el) => {
      const tweets = $el.contentWindow.document.body.querySelectorAll('.timeline-TweetList-tweet');
      if (tweets.length > 3) {
        $el.classList.add('sa11y-warning-border');
        $el.insertAdjacentHTML('beforebegin', annotate(WARNING, Lang._('EMBED_TWITTER')));
      }
    });
  }

  // Error: iFrame is missing accessible name.
  if (option.embeddedContentTitles === true) {
    Sa11y.$iframes.forEach(($el) => {
      if ($el.tagName === 'VIDEO'
          || $el.tagName === 'AUDIO'
          || $el.getAttribute('aria-hidden') === 'true'
          || $el.getAttribute('hidden') !== null
          || $el.style.display === 'none'
          || $el.getAttribute('role') === 'presentation') {
        // Ignore if hidden.
      } else if ($el.getAttribute('title') === null || $el.getAttribute('title') === '') {
        if ($el.getAttribute('aria-label') === null || $el.getAttribute('aria-label') === '') {
          if ($el.getAttribute('aria-labelledby') === null) {
            // Make sure red error border takes precedence
            if ($el.classList.contains('sa11y-warning-border')) {
              $el.classList.remove('sa11y-warning-border');
            }
            $el.classList.add('sa11y-error-border');
            $el.insertAdjacentHTML('beforebegin', annotate(ERROR, Lang._('EMBED_MISSING_TITLE')));
          }
        }
      } else {
        // Nothing
      }
    });
  }

  // Warning: general warning for iFrames
  if (option.embeddedContentGeneral === true) {
    Sa11y.$embeddedContent.forEach(($el) => {
      if ($el.tagName === 'VIDEO'
          || $el.tagName === 'AUDIO'
          || $el.getAttribute('aria-hidden') === 'true'
          || $el.getAttribute('hidden') !== null
          || $el.style.display === 'none'
          || $el.getAttribute('role') === 'presentation'
          || $el.getAttribute('tabindex') === '-1') {
        // Ignore if hidden.
      } else {
        $el.classList.add('sa11y-warning-border');
        $el.insertAdjacentHTML('beforebegin', annotate(WARNING, Lang._('EMBED_GENERAL_WARNING')));
      }
    });
  }
}
