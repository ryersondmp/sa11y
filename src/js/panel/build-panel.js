// ----------------------------------------------------------------------
// Main panel: Build Show Outline and Settings tabs.
// ----------------------------------------------------------------------
import Lang from '../components/translation';

export default function buildPanel() {
  const $outlineToggle = document.getElementById('sa11y-outline-toggle');
  const $outlinePanel = document.getElementById('sa11y-outline-panel');
  const $outlineList = document.getElementById('sa11y-outline-list');
  const $settingsToggle = document.getElementById('sa11y-settings-toggle');
  const $settingsPanel = document.getElementById('sa11y-settings-panel');
  const $settingsContent = document.getElementById('sa11y-settings-content');
  const $headingAnnotations = document.querySelectorAll('.sa11y-heading-label');

  // Show outline panel
  $outlineToggle.addEventListener('click', () => {
    if ($outlineToggle.getAttribute('aria-expanded') === 'true') {
      $outlineToggle.classList.remove('sa11y-outline-active');
      $outlinePanel.classList.remove('sa11y-active');
      $outlineToggle.textContent = `${Lang._('SHOW_OUTLINE')}`;
      $outlineToggle.setAttribute('aria-expanded', 'false');
      localStorage.setItem('sa11y-remember-outline', 'Closed');
    } else {
      $outlineToggle.classList.add('sa11y-outline-active');
      $outlinePanel.classList.add('sa11y-active');
      $outlineToggle.textContent = `${Lang._('HIDE_OUTLINE')}`;
      $outlineToggle.setAttribute('aria-expanded', 'true');
      localStorage.setItem('sa11y-remember-outline', 'Opened');
    }

    // Set focus on Page Outline heading for accessibility.
    document.querySelector('#sa11y-outline-header > h2').focus();

    // Show heading level annotations.
    $headingAnnotations.forEach(($el) => $el.classList.toggle('sa11y-label-visible'));

    // Close Settings panel when Show Outline is active.
    $settingsPanel.classList.remove('sa11y-active');
    $settingsToggle.classList.remove('sa11y-settings-active');
    $settingsToggle.setAttribute('aria-expanded', 'false');
    $settingsToggle.textContent = `${Lang._('SHOW_SETTINGS')}`;

    // Keyboard accessibility fix for scrollable panel content.
    if ($outlineList.clientHeight > 250) {
      $outlineList.setAttribute('tabindex', '0');
    }
  });

  // Remember to leave outline open
  if (localStorage.getItem('sa11y-remember-outline') === 'Opened') {
    $outlineToggle.classList.add('sa11y-outline-active');
    $outlinePanel.classList.add('sa11y-active');
    $outlineToggle.textContent = `${Lang._('HIDE_OUTLINE')}`;
    $outlineToggle.setAttribute('aria-expanded', 'true');
    $headingAnnotations.forEach(($el) => $el.classList.toggle('sa11y-label-visible'));
    // Keyboard accessibility fix for scrollable panel content.
    if ($outlineList.clientHeight > 250) {
      $outlineList.setAttribute('tabindex', '0');
    }
  }

  // Show settings panel
  $settingsToggle.addEventListener('click', () => {
    if ($settingsToggle.getAttribute('aria-expanded') === 'true') {
      $settingsToggle.classList.remove('sa11y-settings-active');
      $settingsPanel.classList.remove('sa11y-active');
      $settingsToggle.textContent = `${Lang._('SHOW_SETTINGS')}`;
      $settingsToggle.setAttribute('aria-expanded', 'false');
    } else {
      $settingsToggle.classList.add('sa11y-settings-active');
      $settingsPanel.classList.add('sa11y-active');
      $settingsToggle.textContent = `${Lang._('HIDE_SETTINGS')}`;
      $settingsToggle.setAttribute('aria-expanded', 'true');
    }

    // Set focus on Settings heading for accessibility.
    document.querySelector('#sa11y-settings-header > h2').focus();

    // Close Show Outline panel when Settings is active.
    $outlinePanel.classList.remove('sa11y-active');
    $outlineToggle.classList.remove('sa11y-outline-active');
    $outlineToggle.setAttribute('aria-expanded', 'false');
    $outlineToggle.textContent = `${Lang._('SHOW_OUTLINE')}`;
    $headingAnnotations.forEach(($el) => $el.classList.remove('sa11y-label-visible'));
    localStorage.setItem('sa11y-remember-outline', 'Closed');

    // Keyboard accessibility fix for scrollable panel content.
    if ($settingsContent.clientHeight > 350) {
      $settingsContent.setAttribute('tabindex', '0');
    }
  });

  // Enhanced keyboard accessibility for panel.
  document.getElementById('sa11y-panel-controls').addEventListener('keydown', (e) => {
    const $tab = document.querySelectorAll('#sa11y-outline-toggle[role=tab], #sa11y-settings-toggle[role=tab]');
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

  const $closeAlertToggle = document.getElementById('sa11y-close-alert');
  const $alertPanel = document.getElementById('sa11y-panel-alert');
  const $alertText = document.getElementById('sa11y-panel-alert-text');
  const $skipBtn = document.getElementById('sa11y-cycle-toggle');

  $closeAlertToggle.addEventListener('click', () => {
    $alertPanel.classList.remove('sa11y-active');
    while ($alertText.firstChild) $alertText.removeChild($alertText.firstChild);
    document.querySelectorAll('.sa11y-pulse-border').forEach((el) => el.classList.remove('sa11y-pulse-border'));
    $skipBtn.focus();
  });
}
