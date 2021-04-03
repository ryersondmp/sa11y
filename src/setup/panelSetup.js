import config from "../sa11y.config";
let loadContrastPreference =
    localStorage.getItem("sa11y-contrastCheck") === "On";
let loadReadabilityPreference =
    localStorage.getItem("sa11y-readabilityCheck") === "On";
const panel = `
<div
    id='sa11y-container'
    role='region'
    lang="${config["lang"]["code"]}"
    aria-label="${config["lang"]["container"]}"
>
    <button type="button" aria-expanded="false" id="sa11y-toggle" aria-describedby="sa11y-notification-badge">
        ${config["icon"]}
        <span class="sa11y-visually-hidden">
            ${config["lang"]["text"]["main"]} 
        </span>
        <div id="sa11y-notification-badge" style="display: none;">
            <span id="sa11y-notification-count"></span>
            <span class="sa11y-visually-hidden">errors detected.</span>
        </div>
    </button>
    <div id="sa11y-panel">
        <div id="sa11y-outline-panel">
        <div id="sa11y-outline-header" class="sa11y-header-text">
            <span tabindex="-1">Page outline</span>
        </div>  
        <div id="sa11y-outline-content">
            <ul id="sa11y-outline-list"></ul>
        </div>
        <div id="sa11y-readability-panel"></div>
    </div>
    <div id="sa11y-settings-panel">
        <div id="sa11y-settings-header" class="sa11y-header-text">
            <span tabindex="-1">Settings</span>
        </div>
        <div id="sa11y-settings-content">
            <ul id="sa11y-settings-options">  
                <li>
                    <label id="check-contrast" for="sa11y-contrastCheck-toggle">Check contrast</label>
                    <button id="sa11y-contrastCheck-toggle" 
                    aria-labelledby="check-contrast" 
                    class="sa11y-settings-switch" 
                    aria-pressed="${loadContrastPreference ? "true" : "false"}">
                        ${loadContrastPreference ? "On" : "Off"}
                    </button>
                </li>
                <li>
                    <label id="dark-mode" for="sa11y-theme-toggle">Dark mode</label>
                    <button id="sa11y-theme-toggle" aria-labelledby="dark-mode" class="sa11y-settings-switch"></button>
                </li>
                <li>
                    <label id="check-readability" for="sa11y-readabilityCheck-toggle">Readability <span class="sa11y-badge">AAA</span></label>
                    <button id="sa11y-readabilityCheck-toggle" aria-labelledby="check-readability" class="sa11y-settings-switch" 
                    aria-pressed="${
                        loadReadabilityPreference ? "true" : "false"
                    }">
                        ${loadReadabilityPreference ? "On" : "Off"}
                    </button>
                </li>
            </ul>
        </div>
    </div>
        <div id="sa11y-panel-content"><div class="sa11y-panel-icon"></div>
            <div id="sa11y-panel-text">
                <span id="sa11y-status"></span>
            </div>
        </div>
        <div id="sa11y-panel-controls">
            <button type="button" aria-expanded="false" id="sa11y-outline-toggle">Show Outline</button>
            <button type="button" aria-expanded="false" id="sa11y-settings-toggle">Show Settings</button>
            <div aria-hidden="true">&nbsp;&nbsp;</div>
        </div>
    </div>
</div>`;
export default panel;
