import Constants from '../utils/constants';
import { store } from '../utils/utils';
import Lang from '../utils/lang';

export default function settingsPanelToggles(checkAll, resetAll) {
  // Toggle: Contrast
  Constants.Panel.contrastToggle.onclick = async () => {
    if (store.getItem('sa11y-remember-contrast') === 'On') {
      store.setItem('sa11y-remember-contrast', 'Off');
      Constants.Panel.contrastToggle.textContent = `${Lang._('OFF')}`;
      Constants.Panel.contrastToggle.setAttribute('aria-pressed', 'false');
      resetAll(false);
      await checkAll();
    } else {
      store.setItem('sa11y-remember-contrast', 'On');
      Constants.Panel.contrastToggle.textContent = `${Lang._('ON')}`;
      Constants.Panel.contrastToggle.setAttribute('aria-pressed', 'true');
      resetAll(false);
      await checkAll();
    }
  };

  // Toggle: Form labels
  Constants.Panel.labelsToggle.onclick = async () => {
    if (store.getItem('sa11y-remember-labels') === 'On') {
      store.setItem('sa11y-remember-labels', 'Off');
      Constants.Panel.labelsToggle.textContent = `${Lang._('OFF')}`;
      Constants.Panel.labelsToggle.setAttribute('aria-pressed', 'false');
      resetAll(false);
      await checkAll();
    } else {
      store.setItem('sa11y-remember-labels', 'On');
      Constants.Panel.labelsToggle.textContent = `${Lang._('ON')}`;
      Constants.Panel.labelsToggle.setAttribute('aria-pressed', 'true');
      resetAll(false);
      await checkAll();
    }
  };

  // Toggle: Links (Advanced)
  Constants.Panel.linksToggle.onclick = async () => {
    if (store.getItem('sa11y-remember-links-advanced') === 'On') {
      store.setItem('sa11y-remember-links-advanced', 'Off');
      Constants.Panel.linksToggle.textContent = `${Lang._('OFF')}`;
      Constants.Panel.linksToggle.setAttribute('aria-pressed', 'false');
      resetAll(false);
      await checkAll();
    } else {
      store.setItem('sa11y-remember-links-advanced', 'On');
      Constants.Panel.linksToggle.textContent = `${Lang._('ON')}`;
      Constants.Panel.linksToggle.setAttribute('aria-pressed', 'true');
      resetAll(false);
      await checkAll();
    }
  };

  // Toggle: Readability
  Constants.Panel.readabilityToggle.onclick = async () => {
    if (store.getItem('sa11y-remember-readability') === 'On') {
      store.setItem('sa11y-remember-readability', 'Off');
      Constants.Panel.readabilityToggle.textContent = `${Lang._('OFF')}`;
      Constants.Panel.readabilityToggle.setAttribute('aria-pressed', 'false');
      Constants.Panel.readability.classList.remove('active');
      resetAll(false);
      await checkAll();
    } else {
      store.setItem('sa11y-remember-readability', 'On');
      Constants.Panel.readabilityToggle.textContent = `${Lang._('ON')}`;
      Constants.Panel.readabilityToggle.setAttribute('aria-pressed', 'true');
      Constants.Panel.readability.classList.add('active');
      resetAll(false);
      await checkAll();
    }
  };

  if (store.getItem('sa11y-remember-readability') === 'On') {
    Constants.Panel.readability.classList.add('active');
  }

  /**
   * Dark Mode
   * Credits: Derek Kedziora
   * @link https://derekkedziora.com/blog/dark-mode-revisited
  */
  const systemInitiatedDark = window.matchMedia('(prefers-color-scheme: dark)');
  if (systemInitiatedDark.matches) {
    Constants.Panel.themeToggle.textContent = `${Lang._('ON')}`;
    Constants.Panel.themeToggle.setAttribute('aria-pressed', 'true');
  } else {
    Constants.Panel.themeToggle.textContent = `${Lang._('OFF')}`;
    Constants.Panel.themeToggle.setAttribute('aria-pressed', 'false');
  }
  const prefersColorTest = () => {
    if (systemInitiatedDark.matches) {
      Constants.Global.html.setAttribute('data-sa11y-theme', 'dark');
      Constants.Panel.themeToggle.textContent = `${Lang._('ON')}`;
      Constants.Panel.themeToggle.setAttribute('aria-pressed', 'true');
      store.setItem('sa11y-remember-theme', '');
    } else {
      Constants.Global.html.setAttribute('data-sa11y-theme', 'light');
      Constants.Panel.themeToggle.textContent = `${Lang._('OFF')}`;
      Constants.Panel.themeToggle.setAttribute('aria-pressed', 'false');
      store.setItem('sa11y-remember-theme', '');
    }
  };
  systemInitiatedDark.addEventListener('change', prefersColorTest);
  Constants.Panel.themeToggle.onclick = async () => {
    const theme = store.getItem('sa11y-remember-theme');
    if (theme === 'dark') {
      Constants.Global.html.setAttribute('data-sa11y-theme', 'light');
      store.setItem('sa11y-remember-theme', 'light');
      Constants.Panel.themeToggle.textContent = `${Lang._('OFF')}`;
      Constants.Panel.themeToggle.setAttribute('aria-pressed', 'false');
    } else if (theme === 'light') {
      Constants.Global.html.setAttribute('data-sa11y-theme', 'dark');
      store.setItem('sa11y-remember-theme', 'dark');
      Constants.Panel.themeToggle.textContent = `${Lang._('ON')}`;
      Constants.Panel.themeToggle.setAttribute('aria-pressed', 'true');
    } else if (systemInitiatedDark.matches) {
      Constants.Global.html.setAttribute('data-sa11y-theme', 'light');
      store.setItem('sa11y-remember-theme', 'light');
      Constants.Panel.themeToggle.textContent = `${Lang._('OFF')}`;
      Constants.Panel.themeToggle.setAttribute('aria-pressed', 'false');
    } else {
      Constants.Global.html.setAttribute('data-sa11y-theme', 'dark');
      store.setItem('sa11y-remember-theme', 'dark');
      Constants.Panel.themeToggle.textContent = `${Lang._('ON')}`;
      Constants.Panel.themeToggle.setAttribute('aria-pressed', 'true');
    }
  };
  const theme = store.getItem('sa11y-remember-theme');
  if (theme === 'dark') {
    Constants.Global.html.setAttribute('data-sa11y-theme', 'dark');
    store.setItem('sa11y-remember-theme', 'dark');
    Constants.Panel.themeToggle.textContent = `${Lang._('ON')}`;
    Constants.Panel.themeToggle.setAttribute('aria-pressed', 'true');
  } else if (theme === 'light') {
    Constants.Global.html.setAttribute('data-sa11y-theme', 'light');
    store.setItem('sa11y-remember-theme', 'light');
    Constants.Panel.themeToggle.textContent = `${Lang._('OFF')}`;
    Constants.Panel.themeToggle.setAttribute('aria-pressed', 'false');
  }
}
