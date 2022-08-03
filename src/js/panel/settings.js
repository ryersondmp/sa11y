//----------------------------------------------------------------------
// Setting's panel: Additional ruleset toggles.
//----------------------------------------------------------------------
import Lang from '../components/translation';

export default function settingPanelToggles() {
  // Toggle: Contrast
  const $contrastToggle = document.getElementById('sa11y-contrast-toggle');
  $contrastToggle.onclick = async () => {
    if (localStorage.getItem('sa11y-remember-contrast') === 'On') {
      localStorage.setItem('sa11y-remember-contrast', 'Off');
      $contrastToggle.textContent = `${Lang._('OFF')}`;
      $contrastToggle.setAttribute('aria-pressed', 'false');
      this.resetAll(false);
      await this.checkAll();
    } else {
      localStorage.setItem('sa11y-remember-contrast', 'On');
      $contrastToggle.textContent = `${Lang._('ON')}`;
      $contrastToggle.setAttribute('aria-pressed', 'true');
      this.resetAll(false);
      await this.checkAll();
    }
  };

  // Toggle: Form labels
  const $labelsToggle = document.getElementById('sa11y-labels-toggle');
  $labelsToggle.onclick = async () => {
    if (localStorage.getItem('sa11y-remember-labels') === 'On') {
      localStorage.setItem('sa11y-remember-labels', 'Off');
      $labelsToggle.textContent = `${Lang._('OFF')}`;
      $labelsToggle.setAttribute('aria-pressed', 'false');
      this.resetAll(false);
      await this.checkAll();
    } else {
      localStorage.setItem('sa11y-remember-labels', 'On');
      $labelsToggle.textContent = `${Lang._('ON')}`;
      $labelsToggle.setAttribute('aria-pressed', 'true');
      this.resetAll(false);
      await this.checkAll();
    }
  };

  // Toggle: Links (Advanced)
  const $linksToggle = document.getElementById('sa11y-links-advanced-toggle');
  $linksToggle.onclick = async () => {
    if (localStorage.getItem('sa11y-remember-links-advanced') === 'On') {
      localStorage.setItem('sa11y-remember-links-advanced', 'Off');
      $linksToggle.textContent = `${Lang._('OFF')}`;
      $linksToggle.setAttribute('aria-pressed', 'false');
      this.resetAll(false);
      await this.checkAll();
    } else {
      localStorage.setItem('sa11y-remember-links-advanced', 'On');
      $linksToggle.textContent = `${Lang._('ON')}`;
      $linksToggle.setAttribute('aria-pressed', 'true');
      this.resetAll(false);
      await this.checkAll();
    }
  };

  // Toggle: Readability
  const $readabilityToggle = document.getElementById('sa11y-readability-toggle');
  $readabilityToggle.onclick = async () => {
    if (localStorage.getItem('sa11y-remember-readability') === 'On') {
      localStorage.setItem('sa11y-remember-readability', 'Off');
      $readabilityToggle.textContent = `${Lang._('OFF')}`;
      $readabilityToggle.setAttribute('aria-pressed', 'false');
      document.getElementById('sa11y-readability-panel').classList.remove('sa11y-active');
      this.resetAll(false);
      await this.checkAll();
    } else {
      localStorage.setItem('sa11y-remember-readability', 'On');
      $readabilityToggle.textContent = `${Lang._('ON')}`;
      $readabilityToggle.setAttribute('aria-pressed', 'true');
      document.getElementById('sa11y-readability-panel').classList.add('sa11y-active');
      this.resetAll(false);
      await this.checkAll();
    }
  };

  if (localStorage.getItem('sa11y-remember-readability') === 'On') {
    document.getElementById('sa11y-readability-panel').classList.add('sa11y-active');
  }

  // Toggle: Dark mode. (Credits: https://derekkedziora.com/blog/dark-mode-revisited)
  const systemInitiatedDark = window.matchMedia('(prefers-color-scheme: dark)');
  const $themeToggle = document.getElementById('sa11y-theme-toggle');
  const theme = localStorage.getItem('sa11y-remember-theme');
  const html = document.querySelector('html');

  if (systemInitiatedDark.matches) {
    $themeToggle.textContent = `${Lang._('ON')}`;
    $themeToggle.setAttribute('aria-pressed', 'true');
  } else {
    $themeToggle.textContent = `${Lang._('OFF')}`;
    $themeToggle.setAttribute('aria-pressed', 'false');
  }

  const prefersColorTest = () => {
    if (systemInitiatedDark.matches) {
      html.setAttribute('data-sa11y-theme', 'dark');
      $themeToggle.textContent = `${Lang._('ON')}`;
      $themeToggle.setAttribute('aria-pressed', 'true');
      localStorage.setItem('sa11y-remember-theme', '');
    } else {
      html.setAttribute('data-sa11y-theme', 'light');
      $themeToggle.textContent = `${Lang._('OFF')}`;
      $themeToggle.setAttribute('aria-pressed', 'false');
      localStorage.setItem('sa11y-remember-theme', '');
    }
  };

  systemInitiatedDark.addEventListener('change', prefersColorTest);
  $themeToggle.onclick = async () => {
    const themeLocal = localStorage.getItem('sa11y-remember-theme');
    if (themeLocal === 'dark') {
      html.setAttribute('data-sa11y-theme', 'light');
      localStorage.setItem('sa11y-remember-theme', 'light');
      $themeToggle.textContent = `${Lang._('OFF')}`;
      $themeToggle.setAttribute('aria-pressed', 'false');
    } else if (themeLocal === 'light') {
      html.setAttribute('data-sa11y-theme', 'dark');
      localStorage.setItem('sa11y-remember-theme', 'dark');
      $themeToggle.textContent = `${Lang._('ON')}`;
      $themeToggle.setAttribute('aria-pressed', 'true');
    } else if (systemInitiatedDark.matches) {
      html.setAttribute('data-sa11y-theme', 'light');
      localStorage.setItem('sa11y-remember-theme', 'light');
      $themeToggle.textContent = `${Lang._('OFF')}`;
      $themeToggle.setAttribute('aria-pressed', 'false');
    } else {
      html.setAttribute('data-sa11y-theme', 'dark');
      localStorage.setItem('sa11y-remember-theme', 'dark');
      $themeToggle.textContent = `${Lang._('ON')}`;
      $themeToggle.setAttribute('aria-pressed', 'true');
    }
  };
  if (theme === 'dark') {
    html.setAttribute('data-sa11y-theme', 'dark');
    localStorage.setItem('sa11y-remember-theme', 'dark');
    $themeToggle.textContent = `${Lang._('ON')}`;
    $themeToggle.setAttribute('aria-pressed', 'true');
  } else if (theme === 'light') {
    html.setAttribute('data-sa11y-theme', 'light');
    localStorage.setItem('sa11y-remember-theme', 'light');
    $themeToggle.textContent = `${Lang._('OFF')}`;
    $themeToggle.setAttribute('aria-pressed', 'false');
  }
}
