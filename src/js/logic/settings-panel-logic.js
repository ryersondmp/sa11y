import Constants from '../utils/constants';
import { store, remove, resetAttributes, createAlert } from '../utils/utils';
import Lang from '../utils/lang';

/* ************************************************************ */
/*  Initialize all toggle switches within Settings panel.       */
/* ************************************************************ */
export default function settingsPanelToggles(checkAll, resetAll) {
  /* ************************* */
  /*  Panel position toggle    */
  /* ************************* */
  if (Constants.Global.showMovePanelToggle) {
    Constants.Panel.movePanelToggle.onclick = async () => {
      const panelPosition = store.getItem('sa11y-position');
      const [position1, position2] = panelPosition.includes('top')
        ? ['top-right', 'top-left']
        : ['right', 'left'];

      const newPosition = panelPosition === position1 ? position2 : position1;
      store.setItem('sa11y-position', newPosition);

      [position1, position2].forEach((classname) => {
        Constants.Panel.toggle.classList.replace(classname, newPosition);
        Constants.Panel.panel.classList.replace(classname, newPosition);
      });

      Constants.Panel.movePanelToggle.setAttribute('aria-pressed',
        panelPosition === position1 ? 'true' : 'false');
    };
  }

  /* ************************* */
  /*  Developer checks toggle  */
  /* ************************* */
  if (Constants.Global.developerPlugin) {
    Constants.Panel.developerToggle.onclick = async () => {
      if (store.getItem('sa11y-developer') === 'On') {
        store.setItem('sa11y-developer', 'Off');
        Constants.Panel.developerToggle.textContent = `${Lang._('OFF')}`;
        Constants.Panel.developerToggle.setAttribute('aria-pressed', 'false');
        resetAll(false);
        await checkAll();
      } else {
        store.setItem('sa11y-developer', 'On');
        Constants.Panel.developerToggle.textContent = `${Lang._('ON')}`;
        Constants.Panel.developerToggle.setAttribute('aria-pressed', 'true');
        resetAll(false);
        await checkAll();
      }
    };
  } else {
    store.setItem('sa11y-developer', 'Off');
  }

  /* ****************** */
  /*  Readability       */
  /* ****************** */
  if (Constants.Readability.Plugin) {
    Constants.Panel.readabilityToggle.onclick = async () => {
      if (store.getItem('sa11y-readability') === 'On') {
        store.setItem('sa11y-readability', 'Off');
        Constants.Panel.readabilityToggle.textContent = `${Lang._('OFF')}`;
        Constants.Panel.readabilityToggle.setAttribute('aria-pressed', 'false');
        Constants.Panel.readability.classList.remove('active');
        resetAll(false);
        await checkAll();
      } else {
        store.setItem('sa11y-readability', 'On');
        Constants.Panel.readabilityToggle.textContent = `${Lang._('ON')}`;
        Constants.Panel.readabilityToggle.setAttribute('aria-pressed', 'true');
        Constants.Panel.readability.classList.add('active');
        resetAll(false);
        await checkAll();
      }
    };

    if (store.getItem('sa11y-readability') === 'On') {
      Constants.Panel.readability.classList.add('active');
    }
  }

  /**
   * Toggle: Dark Mode
   * Credits: Derek Kedziora
   * @link https://derekkedziora.com/blog/dark-mode-revisited
  */
  const systemInitiatedDark = window.matchMedia('(prefers-color-scheme: dark)');
  const { themeToggle } = Constants.Panel;
  const { html } = Constants.Global;

  const storeTheme = (theme) => {
    html.setAttribute('data-sa11y-theme', theme);
    store.setItem('sa11y-theme', theme);
    const icon = themeToggle.querySelector('span').classList;
    icon.toggle('moon-icon', theme === 'light');
    icon.toggle('sun-icon', theme === 'dark');
    themeToggle.setAttribute('aria-pressed', theme === 'dark' ? 'true' : 'false');
  };

  // Initial theme setup.
  const initialTheme = store.getItem('sa11y-theme') || (systemInitiatedDark.matches ? 'dark' : 'light');
  storeTheme(initialTheme);

  // Listen to system theme changes.
  systemInitiatedDark.addEventListener('change', () => {
    storeTheme(systemInitiatedDark.matches ? 'dark' : 'light');
  });

  // Toggle theme on based on toggle switch.
  themeToggle.onclick = () => {
    const currentTheme = store.getItem('sa11y-theme') || (systemInitiatedDark.matches ? 'dark' : 'light');
    const preferredTheme = currentTheme === 'dark' ? 'light' : 'dark';
    storeTheme(preferredTheme);
  };

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
          createAlert(Lang._('COLOUR_FILTER_HIGH_CONTRAST'));
        } else {
          // Set attributes.
          Constants.Root.areaToCheck.setAttribute('data-sa11y-filter', filters[option - 1]);
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
        Constants.Root.areaToCheck.removeAttribute('data-sa11y-filter');
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
