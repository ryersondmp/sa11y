import Constants from '../utils/constants';
import { store, isScrollable } from '../utils/utils';
import Lang from '../utils/lang';

/* **************************************************************** */
/*  Main panel: Initialize Show Outline and Settings buttons/tabs.  */
/* **************************************************************** */
export default function initializePanelToggles() {
  // Show outline panel
  Constants.Panel.outlineToggle.addEventListener('click', () => {
    if (Constants.Panel.outlineToggle.getAttribute('aria-expanded') === 'true') {
      Constants.Panel.outlineToggle.classList.remove('outline-active');
      Constants.Panel.outline.classList.remove('active');
      Constants.Panel.outlineToggle.setAttribute('aria-expanded', 'false');
      store.setItem('sa11y-remember-outline', 'Closed');

      // Toggle visibility of heading labels
      const $headingAnnotations = document.querySelectorAll('sa11y-heading-label');
      // eslint-disable-next-line no-return-assign, no-param-reassign
      $headingAnnotations.forEach(($el) => $el.hidden = true);
      isScrollable(Constants.Panel.outlineList, Constants.Panel.outlineContent);
    } else {
      Constants.Panel.outlineToggle.classList.add('outline-active');
      Constants.Panel.outline.classList.add('active');
      Constants.Panel.outlineToggle.setAttribute('aria-expanded', 'true');
      store.setItem('sa11y-remember-outline', 'Opened');

      // Toggle visibility of heading labels
      const $headingAnnotations = document.querySelectorAll('sa11y-heading-label');
      // eslint-disable-next-line no-return-assign, no-param-reassign
      $headingAnnotations.forEach(($el) => $el.hidden = false);
    }

    // Set focus on Page Outline heading for accessibility.
    Constants.Panel.outlineHeader.focus();

    // Close Settings panel when Show Outline is active.
    Constants.Panel.settings.classList.remove('active');
    Constants.Panel.settingsToggle.classList.remove('settings-active');
    Constants.Panel.settingsToggle.setAttribute('aria-expanded', 'false');
    isScrollable(Constants.Panel.outlineList, Constants.Panel.outlineContent);
  });

  // Remember to leave outline open
  if (store.getItem('sa11y-remember-outline') === 'Opened') {
    Constants.Panel.outlineToggle.classList.add('outline-active');
    Constants.Panel.outline.classList.add('active');
    Constants.Panel.outlineToggle.setAttribute('aria-expanded', 'true');

    setTimeout(() => {
      isScrollable(Constants.Panel.outlineList, Constants.Panel.outlineContent);
    }, 0);
  }

  // Show settings panel
  Constants.Panel.settingsToggle.addEventListener('click', () => {
    if (Constants.Panel.settingsToggle.getAttribute('aria-expanded') === 'true') {
      Constants.Panel.settingsToggle.classList.remove('settings-active');
      Constants.Panel.settings.classList.remove('active');
      Constants.Panel.settingsToggle.setAttribute('aria-expanded', 'false');
    } else {
      Constants.Panel.settingsToggle.classList.add('settings-active');
      Constants.Panel.settings.classList.add('active');
      Constants.Panel.settingsToggle.setAttribute('aria-expanded', 'true');
    }

    // Set focus on Settings heading for accessibility.
    Constants.Panel.settingsHeader.focus();

    // Toggle visibility of heading labels
    const $headingAnnotations = document.querySelectorAll('sa11y-heading-label');
    // eslint-disable-next-line no-return-assign, no-param-reassign
    $headingAnnotations.forEach(($el) => $el.hidden = true);

    // Close Show Outline panel when Settings is active.
    Constants.Panel.outline.classList.remove('active');
    Constants.Panel.outlineToggle.classList.remove('outline-active');
    Constants.Panel.outlineToggle.setAttribute('aria-expanded', 'false');
    store.setItem('sa11y-remember-outline', 'Closed');

    // Keyboard accessibility fix for scrollable panel content.
    if (Constants.Panel.settingsContent.clientHeight > 350) {
      Constants.Panel.settingsContent.setAttribute('tabindex', '0');
      Constants.Panel.settingsContent.setAttribute('aria-label', `${Lang._('SETTINGS')}`);
      Constants.Panel.settingsContent.setAttribute('role', 'region');
    }
  });

  // Accessibility: Skip link to Page Issues
  Constants.Panel.skipToPageIssues.addEventListener('click', () => {
    Constants.Panel.pageIssuesHeader.focus();
  });

  // Page issues: add gradient if scrollable list.
  setTimeout(() => {
    isScrollable(Constants.Panel.pageIssuesList, Constants.Panel.pageIssuesContent);
  }, 0);

  // Enhanced keyboard accessibility for panel.
  Constants.Panel.controls.addEventListener('keydown', (e) => {
    const $tab = Constants.Panel.panel.querySelectorAll('#outline-toggle[role=tab], #settings-toggle[role=tab]');
    if (e.key === 'ArrowRight') {
      for (let i = 0; i < $tab.length; i++) {
        if ($tab[i].getAttribute('aria-expanded') === 'true' || $tab[i].getAttribute('aria-expanded') === 'false') {
          $tab[i + 1].focus();
          e.preventDefault();
          break;
        }
      }
    }
    if (e.key === 'ArrowDown') {
      for (let i = 0; i < $tab.length; i++) {
        if ($tab[i].getAttribute('aria-expanded') === 'true' || $tab[i].getAttribute('aria-expanded') === 'false') {
          $tab[i + 1].focus();
          e.preventDefault();
          break;
        }
      }
    }
    if (e.key === 'ArrowLeft') {
      for (let i = $tab.length - 1; i > 0; i--) {
        if ($tab[i].getAttribute('aria-expanded') === 'true' || $tab[i].getAttribute('aria-expanded') === 'false') {
          $tab[i - 1].focus();
          e.preventDefault();
          break;
        }
      }
    }
    if (e.key === 'ArrowUp') {
      for (let i = $tab.length - 1; i > 0; i--) {
        if ($tab[i].getAttribute('aria-expanded') === 'true' || $tab[i].getAttribute('aria-expanded') === 'false') {
          $tab[i - 1].focus();
          e.preventDefault();
          break;
        }
      }
    }
  });
}
