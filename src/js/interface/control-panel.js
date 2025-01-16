import Lang from '../utils/lang';
import { store } from '../utils/utils';
import Constants from '../utils/constants';
import version from '../../../version';

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
    const MainToggleIcon = '<svg aria-hidden="true" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path d="M256 48c114.953 0 208 93.029 208 208 0 114.953-93.029 208-208 208-114.953 0-208-93.029-208-208 0-114.953 93.029-208 208-208m0-40C119.033 8 8 119.033 8 256s111.033 248 248 248 248-111.033 248-248S392.967 8 256 8zm0 56C149.961 64 64 149.961 64 256s85.961 192 192 192 192-85.961 192-192S362.039 64 256 64zm0 44c19.882 0 36 16.118 36 36s-16.118 36-36 36-36-16.118-36-36 16.118-36 36-36zm117.741 98.023c-28.712 6.779-55.511 12.748-82.14 15.807.851 101.023 12.306 123.052 25.037 155.621 3.617 9.26-.957 19.698-10.217 23.315-9.261 3.617-19.699-.957-23.316-10.217-8.705-22.308-17.086-40.636-22.261-78.549h-9.686c-5.167 37.851-13.534 56.208-22.262 78.549-3.615 9.255-14.05 13.836-23.315 10.217-9.26-3.617-13.834-14.056-10.217-23.315 12.713-32.541 24.185-54.541 25.037-155.621-26.629-3.058-53.428-9.027-82.141-15.807-8.6-2.031-13.926-10.648-11.895-19.249s10.647-13.926 19.249-11.895c96.686 22.829 124.283 22.783 220.775 0 8.599-2.03 17.218 3.294 19.249 11.895 2.029 8.601-3.297 17.219-11.897 19.249z"/></svg>';

    const rememberDeveloper = store.getItem('sa11y-developer') === 'On';
    const rememberReadability = store.getItem('sa11y-readability') === 'On';

    // If admin wants users to check everything, without toggleable checks.
    const checkAll = Constants.Global.checkAllHideToggles;

    // Panel position: left or right side.
    const { panelPosition } = Constants.Global;

    /* TOGGLEABLE PLUGINS */
    const developerPlugin = Constants.Global.developerPlugin ? `
      <li id="developer-item" ${checkAll ? 'hidden' : ''}>
        <label id="check-developer" for="developer-toggle">${Lang._('DEVELOPER_CHECKS')}</label>
        <button id="developer-toggle"
          aria-labelledby="check-developer"
          aria-describedby="check-developer-desc"
          class="switch"
          aria-pressed="${rememberDeveloper ? 'true' : 'false'}">${rememberDeveloper ? Lang._('ON') : Lang._('OFF')}</button>
        <div id="check-developer-desc" hidden>${Lang._('DEVELOPER_DESC')}</div>
      </li>` : '';

    const readabilityPlugin = Constants.Readability.Plugin ? `
      <li id="readability-item">
        <label id="check-readability" for="readability-toggle">${Lang._('READABILITY')}</label>
        <button id="readability-toggle"
          aria-labelledby="check-readability"
          class="switch"
          aria-pressed="${rememberReadability ? 'true' : 'false'}">${rememberReadability ? Lang._('ON') : Lang._('OFF')}</button>
      </li>` : '';

    const colourFilterPlugin = Constants.Global.colourFilterPlugin ? `
      <li id="colour-filter-item">
        <label id="colour-filter-mode" for="colour-filter">${Lang._('COLOUR_FILTER')}</label>
        <div class="select-dropdown">
          <select id="colour-filter-select">
            <option value="0">${Lang._('OFF')}</option>
            <option value="1">${Lang._('PROTANOPIA')}</option>
            <option value="2">${Lang._('DEUTERANOPIA')}</option>
            <option value="3">${Lang._('TRITANOPIA')}</option>
            <option value="4">${Lang._('MONOCHROMACY')}</option>
          </select>
        </div>
      </li>` : '';

    const colourFilterPanel = Constants.Global.colourFilterPlugin ? `
      <div id="panel-colour-filters" role="region" aria-labelledby="colour-filter-mode">
        <div id="filter-icon" class="panel-icon" role="img"></div>
        <p>${Lang._('COLOUR_FILTER_MESSAGE')}</p>
      </div>` : '';

    const exportResultsPlugin = Constants.Global.exportResultsPlugin ? `
      <li id="export-results-item">
        <span id="export-results-mode">${Lang._('EXPORT_RESULTS')}</span>
        <button id="export-csv" class="switch" aria-describedby="export-results-mode">
          <span>CSV</span>
        </button>
        <button id="export-html" class="switch" aria-describedby="export-results-mode">
          <span>HTML</span>
        </button>
      </li>` : '';

    /* CUSTOMIZABLE ABOUT SECTION */
    const aboutSection = Constants.Global.aboutContent ? `
      <div id="about-content">
        ${Constants.Global.aboutContent}
      </div>` : '';

    /* MAIN TOGGLE */
    const mainToggle = `
      <button type="button" aria-expanded="false" id="toggle" aria-describedby="notification-badge" aria-label="${Lang._('MAIN_TOGGLE_LABEL')}" class="${panelPosition}" disabled>
        ${MainToggleIcon}
        <div id="notification-badge">
          <span id="notification-count"></span>
          <span id="notification-text" class="visually-hidden"></span>
        </div>
      </button>`;

    /* PAGE ISSUES */
    const pageIssues = `
      <div id="page-issues">
        <div class="panel-header">
          <h2 id="page-issues-header" tabindex="-1">${Lang._('PAGE_ISSUES')}</h2>
        </div>
        <div id="page-issues-content">
          <ul id="page-issues-list" role="list" aria-labelledby="page-issues-header"></ul>
        </div>
      </div>`;

    /* PAGE OUTLINE */
    const pageOutline = `
      <div id="outline-panel" role="tabpanel" aria-labelledby="outline-header">
        <div class="panel-header">
          <h2 id="outline-header" tabindex="-1">${Lang._('OUTLINE')}</h2>
        </div>
        <div id="outline-content">
          <ul
            id="outline-list"
            tabindex="0"
            role="list"
            aria-labelledby="outline-header"></ul>
        </div>
        <div id="readability-panel">
          <div id="readability-content">
            <h2 class="header-text-inline">${Lang._('READABILITY')}</h2>
            <p id="readability-info"></p>
            <ul id="readability-details"></ul>
          </div>
        </div>
      </div>`;

    /* IMAGES OUTLINE */
    const imagesOutline = Constants.Global.showImageOutline ? `
      <div id="images-panel" role="tabpanel" aria-labelledby="images-header">
        <div class="panel-header">
          <h2 id="images-header" tabindex="-1">${Lang._('IMAGES')}</h2>
        </div>
        <div id="images-content">
          <ul
            id="images-list"
            tabindex="0"
            role="list"
            aria-labelledby="images-header"></ul>
        </div>
      </div>` : '';

    /* PAGE SETTINGS */
    const pageSettings = `
      <div id="settings-panel" role="tabpanel" aria-labelledby="settings-header">
        <div class="panel-header">
          <h2 id="settings-header" tabindex="-1">${Lang._('SETTINGS')}</h2>
        </div>
        <div id="settings-content">
          <ul id="settings-options">
            ${developerPlugin}
            ${readabilityPlugin}
            <li id="dark-mode-item">
              <label id="dark-mode" for="theme-toggle">${Lang._('DARK_MODE')}</label>
              <button id="theme-toggle"
                aria-labelledby="dark-mode"
                class="switch"></button>
            </li>
            ${exportResultsPlugin}
            ${colourFilterPlugin}
          </ul>
          ${aboutSection}
        </div>
      </div>`;

    /* PANEL ALERTS */
    const panelAlerts = `
      <div
        id="panel-alert"
        role="alertdialog"
        aria-labelledby="alert-heading"
        aria-describedby="panel-alert-text">
        <div id="panel-alert-content">
          <div class="header-text">
            <button id="close-alert" class="close-btn" aria-label="${Lang._('ALERT_CLOSE')}"></button>
            <h2 id="alert-heading">${Lang._('ALERT_TEXT')}</h2>
          </div>
          <p id="panel-alert-text"></p>
          <div id="panel-alert-preview"></div>
        </div>
      </div>`;

    /* PANEL STATUS */
    const panelStatus = `
      <div id="panel-content">
        <button id="skip-to-page-issues" type="button">
          ${Lang._('SKIP_TO_PAGE_ISSUES')}
        </button>
        <button id="skip-button" type="button">
          <div class="panel-icon"></div>
          <span class="visually-hidden">${Lang._('SHORTCUT_SR')}</span>
        </button>
        <button id="dismiss-button" type="button">
          <div class="dismiss-icon"></div>
          <span id="dismiss-tooltip" class="visually-hidden"></span>
        </button>
        <div id="panel-text">
          <h1 class="visually-hidden">${Lang._('PANEL_HEADING')}</h1>
          <p id="status" aria-live="polite"></p>
        </div>
      </div>`;

    /* OUTLINE & SETTING TAB TOGGLES. */
    const imageToggleButton = `<button type="button" role="tab" aria-expanded="false" id="images-toggle" aria-controls="images-panel">${Lang._('IMAGES')}</button>`;

    // Spacer for toggle width...
    const spacer = Constants.Global.showImageOutline
      ? '<div style="width:80px"></div>'
      : '<div style="width:40px"></div>';

    const tabToggles = `
      <div id="panel-controls" role="tablist" aria-orientation="horizontal">
        ${(panelPosition === 'left') ? spacer : ''}
        <button type="button" role="tab" aria-expanded="false" id="outline-toggle" aria-controls="outline-panel">${Lang._('OUTLINE')}</button>
        ${Constants.Global.showImageOutline ? imageToggleButton : ''}
        <button type="button" role="tab" aria-expanded="false" id="settings-toggle" aria-controls="settings-panel">${Lang._('SETTINGS')}</button>
        ${(panelPosition === 'right') ? spacer : ''}
      </div>`;

    /* MAIN CONTAINER */
    const container = document.createElement('div');
    container.setAttribute('id', 'container');
    container.setAttribute('role', 'region');
    container.setAttribute('data-sa11y-version', version);
    container.setAttribute('lang', Lang._('LANG_CODE'));
    container.setAttribute('aria-label', Lang._('CONTAINER_LABEL'));
    container.setAttribute('dir', Constants.Global.langDirection);

    if (panelPosition === 'top-left' || panelPosition === 'top-right') {
      container.innerHTML = `
        ${mainToggle}
        <div id="panel" class="${panelPosition}">
          ${panelStatus}
          ${colourFilterPanel}
          ${tabToggles}
          ${pageOutline}
          ${imagesOutline}
          ${pageSettings}
          ${panelAlerts}
          ${pageIssues}
        </div>`;
    } else {
      container.innerHTML = `
        ${mainToggle}
        <div id="panel" class="${panelPosition}">
          ${pageIssues}
          ${pageOutline}
          ${imagesOutline}
          ${pageSettings}
          ${panelAlerts}
          ${colourFilterPanel}
          ${panelStatus}
          ${tabToggles}
        </div>`;
    }

    // Append before closing body tag.
    this.shadowRoot.appendChild(container);

    // Initialize global constants/selectors once main panel is constructed.
    Constants.initializePanelSelectors();
  }
}
