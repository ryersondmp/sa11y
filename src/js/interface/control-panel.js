import Lang from '../utils/lang';
import { store } from '../utils/utils';
import Constants from '../utils/constants';

// Import processed minified styles as a string.
import panelStyles from '../../../dist/css/control-panel.min.css';
import sharedStyles from '../../../dist/css/shared.min.css';

export default class ControlPanel extends HTMLElement {
  connectedCallback() {
    this.attachShadow({ mode: 'open' });

    // Styles
    const style = document.createElement('style');
    style.textContent = panelStyles + sharedStyles;
    this.shadowRoot.appendChild(style);

    // Icon for the main toggle.
    const MainToggleIcon = "<svg role='img' focusable='false' width='35px' height='35px' aria-hidden='true' xmlns='http://www.w3.org/2000/svg' viewBox='0 0 512 512'><path fill='#ffffff' d='M256 48c114.953 0 208 93.029 208 208 0 114.953-93.029 208-208 208-114.953 0-208-93.029-208-208 0-114.953 93.029-208 208-208m0-40C119.033 8 8 119.033 8 256s111.033 248 248 248 248-111.033 248-248S392.967 8 256 8zm0 56C149.961 64 64 149.961 64 256s85.961 192 192 192 192-85.961 192-192S362.039 64 256 64zm0 44c19.882 0 36 16.118 36 36s-16.118 36-36 36-36-16.118-36-36 16.118-36 36-36zm117.741 98.023c-28.712 6.779-55.511 12.748-82.14 15.807.851 101.023 12.306 123.052 25.037 155.621 3.617 9.26-.957 19.698-10.217 23.315-9.261 3.617-19.699-.957-23.316-10.217-8.705-22.308-17.086-40.636-22.261-78.549h-9.686c-5.167 37.851-13.534 56.208-22.262 78.549-3.615 9.255-14.05 13.836-23.315 10.217-9.26-3.617-13.834-14.056-10.217-23.315 12.713-32.541 24.185-54.541 25.037-155.621-26.629-3.058-53.428-9.027-82.141-15.807-8.6-2.031-13.926-10.648-11.895-19.249s10.647-13.926 19.249-11.895c96.686 22.829 124.283 22.783 220.775 0 8.599-2.03 17.218 3.294 19.249 11.895 2.029 8.601-3.297 17.219-11.897 19.249z'/></svg>";

    // Create main container.
    const container = document.createElement('div');
    container.setAttribute('id', 'container');
    container.setAttribute('role', 'region');
    container.setAttribute('lang', Lang._('LANG_CODE'));
    container.setAttribute('aria-label', Lang._('CONTAINER_LABEL'));

    const rememberContrast = store.getItem('sa11y-remember-contrast') === 'On';
    const rememberFormLabels = store.getItem('sa11y-remember-labels') === 'On';
    const rememberLinksAdvanced = store.getItem('sa11y-remember-links-advanced') === 'On';
    const rememberReadability = store.getItem('sa11y-remember-readability') === 'On';

    // If admin wants users to check everything, without toggleable checks.
    const hide = 'class="hide"';
    const checkAll = Constants.Global.checkAllHideToggles === true;

    /* TOGGLEABLE PLUGINS */
    const contrastPlugin = (Constants.Global.contrastPlugin === true) ? `
      <li id="contrast-item" ${checkAll ? hide : ''}>
        <label id="check-contrast" for="contrast-toggle">${Lang._('CONTRAST')}</label>
        <button id="contrast-toggle"
          aria-labelledby="check-contrast"
          class="switch"
          aria-pressed="${rememberContrast ? 'true' : 'false'}">${rememberContrast ? Lang._('ON') : Lang._('OFF')}</button>
      </li>` : '';

    const formLabelsPlugin = (Constants.Global.formLabelsPlugin === true) ? `
      <li id="form-labels-item" ${checkAll ? hide : ''}>
        <label id="check-labels" for="labels-toggle">${Lang._('FORM_LABELS')}</label>
        <button id="labels-toggle"
          aria-labelledby="check-labels"
          class="switch"
          aria-pressed="${rememberFormLabels ? 'true' : 'false'}">${rememberFormLabels ? Lang._('ON') : Lang._('OFF')}</button>
      </li>` : '';

    const linksAdvancedPlugin = (Constants.Global.linksAdvancedPlugin === true) ? `
      <li id="links-advanced-item" ${checkAll ? hide : ''}>
        <label id="check-changerequest" for="links-advanced-toggle">${Lang._('LINKS_ADVANCED')} <span class="badge">AAA</span></label>
        <button id="links-advanced-toggle"
          aria-labelledby="check-changerequest"
          class="switch"
          aria-pressed="${rememberLinksAdvanced ? 'true' : 'false'}">${rememberLinksAdvanced ? Lang._('ON') : Lang._('OFF')}</button>
      </li>` : '';

    const readabilityPlugin = (Constants.Global.readabilityPlugin === true) ? `
      <li id="readability-item">
        <label id="check-readability" for="readability-toggle">${Lang._('LANG_READABILITY')} <span class="badge">AAA</span></label>
        <button id="readability-toggle"
          aria-labelledby="check-readability"
          class="switch"
          aria-pressed="${rememberReadability ? 'true' : 'false'}">${rememberReadability ? Lang._('ON') : Lang._('OFF')}</button>
      </li>` : '';

    const colourFilterPlugin = (Constants.Global.colourFilterPlugin === true) ? `
      <li id="colour-filter-item">
        <label id="colour-filter-mode" for="colour-filter">${Lang._('COLOUR_FILTER')}</label>
        <select id="colour-filter">
          <option value="0">${Lang._('OFF')}</option>
          <option value="1">${Lang._('PROTANOPIA')}</option>
          <option value="2">${Lang._('DEUTERANOPIA')}</option>
          <option value="3">${Lang._('TRITANOPIA')}</option>
          <option value="4">${Lang._('ACHROMATOPSIA')}</option>
        </select>
      </li>` : '';

    /* MAIN CONTAINER */
    container.innerHTML = `
      <button type="button" aria-expanded="false" id="toggle" aria-describedby="notification-badge" aria-label="${Lang._('MAIN_TOGGLE_LABEL')}" disabled>
        ${MainToggleIcon}
        <div id="notification-badge">
          <span id="notification-count"></span>
          <span id="notification-text" class="visually-hidden"></span>
        </div>
      </button>`

      // Start of main container.
      + '<div id="panel">'

      // Full width banner errors.
      + '<div id="page-errors"></div>'

      // Page Outline tab.
      + `<div id="outline-panel" role="tabpanel" aria-labelledby="outline-header">
          <div class="panel-header">
            <h2 id="outline-header" tabindex="-1">${Lang._('OUTLINE')}</h2>
          </div>
          <div id="outline-content">
            <ul id="outline-list" tabindex="0" role="list" aria-label="${Lang._('OUTLINE')}"></ul>
          </div>
          <div id="readability-panel">
            <div id="readability-content">
              <h2 class="header-text-inline">${Lang._('LANG_READABILITY')}</h2>
              <p id="readability-info"></p>
              <ul id="readability-details"></ul>
            </div>
          </div>
        </div>`

      // Settings tab.
      + `<div id="settings-panel" role="tabpanel" aria-labelledby="settings-header">
          <div class="panel-header">
            <h2 id="settings-header" tabindex="-1">${Lang._('SETTINGS')}</h2>
          </div>
          <div id="settings-content">
            <ul id="settings-options">
              ${contrastPlugin}
              ${formLabelsPlugin}
              ${linksAdvancedPlugin}
              ${readabilityPlugin}
              <li id="dark-mode-item">
                <label id="dark-mode" for="theme-toggle">${Lang._('DARK_MODE')}</label>
                <button id="theme-toggle"
                  aria-labelledby="dark-mode"
                  class="switch"></button>
              </li>
              ${colourFilterPlugin}
            </ul>
          </div>
        </div>`

      // Console warning messages.
      + `<div id="panel-alert">
        <div class="header-text">
            <button id="close-alert" class="close-btn" aria-label="${Lang._('ALERT_CLOSE')}" aria-describedby="alert-heading panel-alert-text"></button>
            <h2 id="alert-heading">${Lang._('ALERT_TEXT')}</h2>
        </div>
        <p id="panel-alert-text"></p>
        <div id="panel-alert-preview"></div>
      </div>`

      // Main panel that conveys state of page.
      + `<div id="panel-content">
        <button id="skip-button" type="button">
          <div class="panel-icon"></div>
          <span class="visually-hidden">${Lang._('SHORTCUT_SCREEN_READER')}</span>
        </button>
        <button id="dismiss-button" type="button">
          <div class="dismiss-icon"></div>
          <span id="dismiss-tooltip" class="visually-hidden"></span>
        </button>
        <div id="panel-text">
          <h1 class="visually-hidden">${Lang._('PANEL_HEADING')}</h1>
          <p id="status" aria-live="polite"></p>
        </div>
      </div>`

      // Show Outline & Show Settings button.
      + `<div id="panel-controls" role="tablist" aria-orientation="horizontal">
        <button type="button" role="tab" aria-expanded="false" id="outline-toggle" aria-controls="outline-panel">
          ${Lang._('OUTLINE')}
        </button>
        <button type="button" role="tab" aria-expanded="false" id="settings-toggle" aria-controls="settings-panel">
          ${Lang._('SETTINGS')}
        </button>
        <div style="width:40px;"></div>
      </div>`

      // End of main container.
      + '</div>';

    // Append before closing body tag.
    this.shadowRoot.appendChild(container);

    // Initialize global constants/selectors once main panel is constructed.
    Constants.initializePanelSelectors();
  }
}
