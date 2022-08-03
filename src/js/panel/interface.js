import Lang from '../components/translation';

export default function buildSa11yUI() {
  // Icon on the main toggle.
  const MainToggleIcon = "<svg role='img' focusable='false' width='35px' height='35px' aria-hidden='true' xmlns='http://www.w3.org/2000/svg' viewBox='0 0 512 512'><path fill='#ffffff' d='M256 48c114.953 0 208 93.029 208 208 0 114.953-93.029 208-208 208-114.953 0-208-93.029-208-208 0-114.953 93.029-208 208-208m0-40C119.033 8 8 119.033 8 256s111.033 248 248 248 248-111.033 248-248S392.967 8 256 8zm0 56C149.961 64 64 149.961 64 256s85.961 192 192 192 192-85.961 192-192S362.039 64 256 64zm0 44c19.882 0 36 16.118 36 36s-16.118 36-36 36-36-16.118-36-36 16.118-36 36-36zm117.741 98.023c-28.712 6.779-55.511 12.748-82.14 15.807.851 101.023 12.306 123.052 25.037 155.621 3.617 9.26-.957 19.698-10.217 23.315-9.261 3.617-19.699-.957-23.316-10.217-8.705-22.308-17.086-40.636-22.261-78.549h-9.686c-5.167 37.851-13.534 56.208-22.262 78.549-3.615 9.255-14.05 13.836-23.315 10.217-9.26-3.617-13.834-14.056-10.217-23.315 12.713-32.541 24.185-54.541 25.037-155.621-26.629-3.058-53.428-9.027-82.141-15.807-8.6-2.031-13.926-10.648-11.895-19.249s10.647-13.926 19.249-11.895c96.686 22.829 124.283 22.783 220.775 0 8.599-2.03 17.218 3.294 19.249 11.895 2.029 8.601-3.297 17.219-11.897 19.249z'/></svg>";

  const sa11ycontainer = document.createElement('div');
  sa11ycontainer.setAttribute('id', 'sa11y-container');
  sa11ycontainer.setAttribute('role', 'region');
  sa11ycontainer.setAttribute('lang', Lang._('LANG_CODE'));
  sa11ycontainer.setAttribute('aria-label', Lang._('CONTAINER_LABEL'));

  const loadContrastPreference = localStorage.getItem('sa11y-remember-contrast') === 'On';
  const loadLabelsPreference = localStorage.getItem('sa11y-remember-labels') === 'On';
  const loadChangeRequestPreference = localStorage.getItem('sa11y-remember-links-advanced') === 'On';
  const loadReadabilityPreference = localStorage.getItem('sa11y-remember-readability') === 'On';

  sa11ycontainer.innerHTML = `<button type="button" aria-expanded="false" id="sa11y-toggle" aria-describedby="sa11y-notification-badge" aria-label="${Lang._('MAIN_TOGGLE_LABEL')}" disabled>
                ${MainToggleIcon}
                <div id="sa11y-notification-badge">
                    <span id="sa11y-notification-count"></span>
                    <span id="sa11y-notification-text" class="sa11y-visually-hidden"></span>
                </div>
            </button>`
    // Start of main container.
    + '<div id="sa11y-panel">'

    // Page Outline tab.
    + `<div id="sa11y-outline-panel" role="tabpanel" aria-labelledby="sa11y-outline-header">
            <div id="sa11y-outline-header" class="sa11y-header-text">
                <h2 tabindex="-1">${Lang._('PAGE_OUTLINE')}</h2>
            </div>
            <div id="sa11y-outline-content">
                <ul id="sa11y-outline-list"></ul>
            </div>`

    // Readability tab.
    + `<div id="sa11y-readability-panel">
                <div id="sa11y-readability-content">
                    <h2 class="sa11y-header-text-inline">${Lang._('LANG_READABILITY')}</h2>
                    <p id="sa11y-readability-info"></p>
                    <ul id="sa11y-readability-details"></ul>
                </div>
            </div>
        </div>`// End of Page Outline tab.

    // Settings tab.
    + `<div id="sa11y-settings-panel" role="tabpanel" aria-labelledby="sa11y-settings-header">
            <div id="sa11y-settings-header" class="sa11y-header-text">
                <h2 tabindex="-1">${Lang._('SETTINGS')}</h2>
            </div>
            <div id="sa11y-settings-content">
                <ul id="sa11y-settings-options">
                    <li id="sa11y-contrast-li">
                        <label id="sa11y-check-contrast" for="sa11y-contrast-toggle">${Lang._('CONTRAST')}</label>
                        <button id="sa11y-contrast-toggle"
                        aria-labelledby="sa11y-check-contrast"
                        class="sa11y-settings-switch"
                        aria-pressed="${loadContrastPreference ? 'true' : 'false'}">${loadContrastPreference ? Lang._('ON') : Lang._('OFF')}</button></li>
                    <li id="sa11y-form-labels-li">
                        <label id="sa11y-check-labels" for="sa11y-labels-toggle">${Lang._('FORM_LABELS')}</label>
                        <button id="sa11y-labels-toggle" aria-labelledby="sa11y-check-labels" class="sa11y-settings-switch"
                        aria-pressed="${loadLabelsPreference ? 'true' : 'false'}">${loadLabelsPreference ? Lang._('ON') : Lang._('OFF')}</button>
                    </li>
                    <li id="sa11y-links-advanced-li">
                        <label id="check-changerequest" for="sa11y-links-advanced-toggle">${Lang._('LINKS_ADVANCED')} <span class="sa11y-badge">AAA</span></label>
                        <button id="sa11y-links-advanced-toggle" aria-labelledby="check-changerequest" class="sa11y-settings-switch"
                        aria-pressed="${loadChangeRequestPreference ? 'true' : 'false'}">${loadChangeRequestPreference ? Lang._('ON') : Lang._('OFF')}</button>
                    </li>
                    <li id="sa11y-readability-li">
                        <label id="check-readability" for="sa11y-readability-toggle">${Lang._('LANG_READABILITY')} <span class="sa11y-badge">AAA</span></label>
                        <button id="sa11y-readability-toggle" aria-labelledby="check-readability" class="sa11y-settings-switch"
                        aria-pressed="${loadReadabilityPreference ? 'true' : 'false'}">${loadReadabilityPreference ? Lang._('ON') : Lang._('OFF')}</button>
                    </li>
                    <li>
                        <label id="sa11y-dark-mode" for="sa11y-theme-toggle">${Lang._('DARK_MODE')}</label>
                        <button id="sa11y-theme-toggle" aria-labelledby="sa11y-dark-mode" class="sa11y-settings-switch"></button>
                    </li>
                </ul>
            </div>
        </div>`

      // Console warning messages.
      + `<div id="sa11y-panel-alert">
            <div class="sa11y-header-text">
                <button id="sa11y-close-alert" class="sa11y-close-btn" aria-label="${Lang._('ALERT_CLOSE')}" aria-describedby="sa11y-alert-heading sa11y-panel-alert-text"></button>
                <h2 id="sa11y-alert-heading">${Lang._('ALERT_TEXT')}</h2>
            </div>
            <p id="sa11y-panel-alert-text"></p>
            <div id="sa11y-panel-alert-preview"></div>
        </div>`

    // Main panel that conveys state of page.
    + `<div id="sa11y-panel-content">
            <button id="sa11y-cycle-toggle" type="button" aria-label="${Lang._('SHORTCUT_SCREEN_READER')}">
                <div class="sa11y-panel-icon"></div>
            </button>
            <div id="sa11y-panel-text"><h1 class="sa11y-visually-hidden">${Lang._('PANEL_HEADING')}</h1>
            <p id="sa11y-status" aria-live="polite"></p>
            </div>
        </div>`

    // Show Outline & Show Settings button.
    + `<div id="sa11y-panel-controls" role="tablist" aria-orientation="horizontal">
            <button type="button" role="tab" aria-expanded="false" id="sa11y-outline-toggle" aria-controls="sa11y-outline-panel">
                ${Lang._('SHOW_OUTLINE')}
            </button>
            <button type="button" role="tab" aria-expanded="false" id="sa11y-settings-toggle" aria-controls="sa11y-settings-panel">
                ${Lang._('SHOW_SETTINGS')}
            </button>
            <div style="width:40px;"></div>
        </div>`

  // End of main container.
  + '</div>';

  const pagebody = document.getElementsByTagName('BODY')[0];
  pagebody.prepend(sa11ycontainer);
}
