// ============================================================
// Main panel: Skip to issue button.
// ============================================================
import * as utilities from '../components/utilities';
import Lang from '../components/translation';

export default function skipToIssue() {
  /* Safari Polyfill for scrollTo. Credit: https://stackoverflow.com/a/67108752 & https://github.com/iamdustan/smoothscroll */
  let reducedMotionQuery = false;
  let scrollBehavior = 'smooth';
  if (!('scrollBehavior' in document.documentElement.style)) {
    const js = document.createElement('script');
    js.src = 'https://cdn.jsdelivr.net/npm/smoothscroll-polyfill@0.4.4/dist/smoothscroll.min.js';
    document.head.appendChild(js);
  }
  if (!(document.documentMode)) {
    if (typeof window.matchMedia === 'function') {
      reducedMotionQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    }
    if (!reducedMotionQuery || reducedMotionQuery.matches) {
      scrollBehavior = 'auto';
    }
  }

  // Constants
  const $findButtons = document.querySelectorAll('[data-sa11y-annotation]');
  const $alertPanel = document.getElementById('sa11y-panel-alert');
  const $alertText = document.getElementById('sa11y-panel-alert-text');
  const $alertPanelPreview = document.getElementById('sa11y-panel-alert-preview');
  const $skipToggle = document.getElementById('sa11y-cycle-toggle');
  const $closeAlertToggle = document.getElementById('sa11y-close-alert');
  const findSa11yBtn = document.querySelectorAll('[data-sa11y-annotation]').length;

  let i = -1;

  // Add pulsing border to visible parent of hidden element.
  const hiddenParent = () => {
    $findButtons.forEach(($el) => {
      const overflowing = utilities.findVisibleParent($el, 'display', 'none');
      if (overflowing !== null) {
        const hiddenparent = overflowing.previousElementSibling;
        if (hiddenparent) {
          hiddenparent.classList.add('sa11y-pulse-border');
        } else {
          overflowing.parentNode.classList.add('sa11y-pulse-border');
        }
      }
    });
  };

  // Alert if tooltip is hidden.
  const generateAlert = () => {
    $alertPanel.classList.add('sa11y-active');
    $alertText.textContent = `${Lang._('NOT_VISIBLE_ALERT')}`;
    $alertPanelPreview.classList.add('sa11y-panel-alert-preview');
    $alertPanelPreview.innerHTML = $findButtons[i].getAttribute('data-tippy-content');
    $closeAlertToggle.focus();
  };

  // Remove alert.
  const removeAlert = () => {
    $alertPanel.classList.remove('sa11y-active');
    document.querySelectorAll('.sa11y-pulse-border').forEach(($el) => $el.classList.remove('sa11y-pulse-border'));
  };

  // Find scroll position.
  const scrollPosition = ($el) => {
    const offsetTopPosition = $el.offsetTop;
    if (offsetTopPosition === 0) {
      const visiblePosition = utilities.findVisibleParent($el, 'display', 'none');
      generateAlert();

      if (visiblePosition) {
        // Get as close to the hidden parent as possible.
        const prevSibling = visiblePosition.previousElementSibling;
        const { parentNode } = visiblePosition;
        if (prevSibling) {
          return utilities.offsetTop(prevSibling).top - 150;
        }
        return utilities.offsetTop(parentNode).top - 150;
      }
    }
    removeAlert();
    return utilities.offsetTop($el).top - 150;
  };

  // Skip to next.
  const next = () => {
    i += 1;
    const $el = $findButtons[i];
    const scrollPos = scrollPosition($el);
    window.scrollTo({
      top: scrollPos,
      behavior: scrollBehavior,
    });
    if (i >= findSa11yBtn - 1) {
      i = -1;
    }
    hiddenParent();
    $el.focus();
  };

  // Skip to previous.
  const prev = () => {
    i = Math.max(0, i -= 1);
    const $el = $findButtons[i];
    if ($el) {
      const scrollPos = scrollPosition($el);
      window.scrollTo({
        top: scrollPos,
        behavior: scrollBehavior,
      });
      hiddenParent();
      $el.focus();
    }
  };

  // Jump to issue using keyboard shortcut.
  document.addEventListener('keyup', (e) => {
    if (findSa11yBtn && (e.altKey && (e.code === 'Period' || e.code === 'KeyS'))) {
      next();
      e.preventDefault();
    }
  });

  // Previous issue keyboard shortcut.
  document.addEventListener('keyup', (e) => {
    if (findSa11yBtn && (e.altKey && (e.code === 'Comma' || e.code === 'KeyW'))) {
      prev();
      e.preventDefault();
    }
  });

  // Jump to issue using click.
  $skipToggle.addEventListener('click', (e) => {
    next();
    e.preventDefault();
  });
}
