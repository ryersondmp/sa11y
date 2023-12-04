import Constants from '../utils/constants';
import { store, remove, resetAttributes, createAlert } from '../utils/utils';
import Lang from '../utils/lang';

/* ************************************************************ */
/*  Initialize all toggle switches within Settings panel.       */
/* ************************************************************ */
export default function settingsPanelToggles(checkAll, resetAll) {
  /* ***************** */
  /*  Contrast toggle  */
  /* ***************** */
  if (Constants.Global.contrastPlugin) {
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
  } else {
    store.setItem('sa11y-remember-contrast', 'Off');
  }

  /* ***************** */
  /*  Form Labels      */
  /* ***************** */
  if (Constants.Global.formLabelsPlugin) {
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
  } else {
    store.setItem('sa11y-remember-labels', 'Off');
  }

  /* ****************** */
  /*  Links (Advanced)  */
  /* ****************** */
  if (Constants.Global.linksAdvancedPlugin) {
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
  } else {
    store.setItem('sa11y-remember-links-advanced', 'Off');
  }

  /* ****************** */
  /*  Readability       */
  /* ****************** */
  if (Constants.Readability.Plugin) {
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
  }

  /**
   * Toggle: Dark Mode
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

  /* ****************** */
  /*  Colour filters    */
  /* ****************** */
  if (Constants.Global.colourFilterPlugin) {
    Constants.Panel.colourFilterSelect.addEventListener('change', async () => {
      const option = parseInt(Constants.Panel.colourFilterSelect.value, 10);

      const filters = [
        'protanopia',
        'deuteranopia',
        'tritanopia',
        'monochromacy',
      ];

      const icons = [
        Lang._('RED_EYE'),
        Lang._('GREEN_EYE'),
        Lang._('BLUE_EYE'),
        Lang._('MONO_EYE'),
      ];

      if (option >= 1 && option <= 4) {
        if (window.matchMedia('(forced-colors: active)').matches) {
          createAlert(Lang._('COLOUR_FILTER_HIGH_CONTRAST_MESSAGE'));
        } else {
          // Set attributes.
          Constants.Global.Root.setAttribute('data-sa11y-filter', filters[option - 1]);
          Constants.Panel.colourFilterIcon.setAttribute('aria-label', icons[option - 1]);

          // Remove page markup while filters are applied. Otherwise it may confuse content authors.
          resetAttributes([
            'data-sa11y-error',
            'data-sa11y-warning',
            'data-sa11y-good',
            'data-sa11y-error-inline',
            'data-sa11y-warning-inline',
            'data-sa11y-overflow',
          ], 'document');
          remove([
            'sa11y-annotation',
            'sa11y-tooltips',
            'sa11y-heading-label',
          ], 'document');

          // Disable skip to issue button.
          Constants.Panel.skipButton.disabled = true;
          Constants.Panel.pageIssues.classList.remove('active');

          // Brings select menu closer to the colour filter panel by hiding the Setting's border.
          if (Constants.Global.panelPosition === 'left' || Constants.Global.panelPosition === 'right') {
            Constants.Panel.settingsContent.classList.add('hide-settings-border');
          }

          // Make panel visible.
          Constants.Panel.colourFilterSelect.classList.add('active');
          Constants.Panel.colourPanel.classList.add('active');
          Constants.Panel.colourPanel.setAttribute('data-colour', filters[option - 1]);

          // Hide error/warning count.
          Constants.Panel.content.hidden = true;
        }
      } else {
        // Restore panel.
        Constants.Global.Root.removeAttribute('data-sa11y-filter');
        Constants.Panel.settingsContent.classList.remove('hide-settings-border');

        // Hide colour filter panel.
        Constants.Panel.colourFilterSelect.classList.remove('active');
        Constants.Panel.colourPanel.classList.remove('active');
        Constants.Panel.colourPanel.removeAttribute('data-colour');

        // Show error/warning count.
        Constants.Panel.content.hidden = false;
        resetAll(false);
        await checkAll();
      }
    });
  }
}
