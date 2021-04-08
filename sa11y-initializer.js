class Sa11y {
    constructor() {
        //Icon on the main toggle. Easy to replace.
        var MainToggleIcon =
            "<svg role='img' focusable='false' width='35px' height='35px' aria-hidden='true' xmlns='http://www.w3.org/2000/svg' viewBox='0 0 512 512'><path fill='#ffffff' d='M256 48c114.953 0 208 93.029 208 208 0 114.953-93.029 208-208 208-114.953 0-208-93.029-208-208 0-114.953 93.029-208 208-208m0-40C119.033 8 8 119.033 8 256s111.033 248 248 248 248-111.033 248-248S392.967 8 256 8zm0 56C149.961 64 64 149.961 64 256s85.961 192 192 192 192-85.961 192-192S362.039 64 256 64zm0 44c19.882 0 36 16.118 36 36s-16.118 36-36 36-36-16.118-36-36 16.118-36 36-36zm117.741 98.023c-28.712 6.779-55.511 12.748-82.14 15.807.851 101.023 12.306 123.052 25.037 155.621 3.617 9.26-.957 19.698-10.217 23.315-9.261 3.617-19.699-.957-23.316-10.217-8.705-22.308-17.086-40.636-22.261-78.549h-9.686c-5.167 37.851-13.534 56.208-22.262 78.549-3.615 9.255-14.05 13.836-23.315 10.217-9.26-3.617-13.834-14.056-10.217-23.315 12.713-32.541 24.185-54.541 25.037-155.621-26.629-3.058-53.428-9.027-82.141-15.807-8.6-2.031-13.926-10.648-11.895-19.249s10.647-13.926 19.249-11.895c96.686 22.829 124.283 22.783 220.775 0 8.599-2.03 17.218 3.294 19.249 11.895 2.029 8.601-3.297 17.219-11.897 19.249z'/></svg>";

        // TODO: Simplify this
        var sa11ycontainer = document.createElement("div");
        const sa11yAttr = {
            id: "sa11y-container",
            role: "region",
            lang: sa11yLangCode,
            "aria-label": sa11yContainerLang,
        };
        for (const [key, value] of Object.entries(sa11yAttr)) {
            sa11ycontainer.setAttribute(key, value);
        }
        let loadContrastPreference =
            localStorage.getItem("sa11y-contrastCheck") === "On";
        let loadReadabilityPreference =
            localStorage.getItem("sa11y-readabilityCheck") === "On";
        sa11ycontainer.innerHTML =
            `<button type="button" aria-expanded="false" id="sa11y-toggle" aria-describedby="sa11y-notification-badge">
                ${MainToggleIcon}
                <span class="sa11y-visually-hidden">${sa11yMainToggleLang}</span>
                <div id="sa11y-notification-badge" style="display: none;">
                    <span id="sa11y-notification-count"></span>
                    <span class="sa11y-visually-hidden">errors detected.</span>
                </div>
            </button>` +
            //Page Outline tab.
            `
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
                                <label id="check-contrast" for="sa11y-contrastCheck-toggle">
                                    Check contrast
                                </label>
                                <button id="sa11y-contrastCheck-toggle" aria-labelledby="check-contrast" class="sa11y-settings-switch" aria-pressed=${
                                    loadContrastPreference ? "true" : "false"
                                }>
                                    ${loadContrastPreference ? "On" : "Off"}
                                </button>
                            </li>
                            <li>
                                <label id="dark-mode" for="sa11y-theme-toggle">
                                    Dark mode
                                </label>
                                <button id="sa11y-theme-toggle" aria-labelledby="dark-mode" class="sa11y-settings-switch"></button>
                            </li>
                            <li>
                                <label id="check-readability" for="sa11y-readabilityCheck-toggle">
                                    Readability <span class="sa11y-badge">AAA</span>
                                </label>
                                <button id="sa11y-readabilityCheck-toggle" aria-labelledby="check-readability" class="sa11y-settings-switch" aria-pressed={loadReadabilityPreference ? "true" : "false"}>
                                    ${loadReadabilityPreference ? "On" : "Off"}
                                </button>
                            </li>
                        </ul>
                    </div>
                </div>
                <div id="sa11y-panel-content">
                    <div class="sa11y-panel-icon"></div>
                    <div id="sa11y-panel-text">
                        <span id="sa11y-status"></span>
                    </div>
                </div>
                <div id="sa11y-panel-controls">
                    <button type="button" aria-expanded="false" id="sa11y-outline-toggle">
                        Show Outline
                    </button>
                    <button type="button" aria-expanded="false" id="sa11y-settings-toggle">
                        Show Settings
                    </button>
                    <div aria-hidden="true">&nbsp;&nbsp;</div>
                </div>
            </div>`;

        $("body").prepend(sa11ycontainer);

        // JQuery
        $(() => {
            //To-do: Figure out what to do with this guy.
            // this.loadGlobals();

            //Keeps checker active when navigating between pages until it is toggled off.
            var sa11yToggle = $("#sa11y-toggle");
            sa11yToggle.click(() => {
                if (localStorage.getItem("sa11y-panel") === "opened") {
                    localStorage.setItem("sa11y-panel", "closed");
                    sa11yToggle
                        .removeClass("sa11y-on")
                        .attr("aria-expanded", "false");
                    Reset();
                } else {
                    localStorage.setItem("sa11y-panel", "opened");
                    sa11yToggle
                        .addClass("sa11y-on")
                        .attr("aria-expanded", "true");
                    ScanPage(this.displayPanel);
                }
            });

            //Remember to leave it open
            if (localStorage.getItem("sa11y-panel") === "opened") {
                sa11yToggle.addClass("sa11y-on").attr("aria-expanded", "true");
            }

            //Crudely give a little time to load any other content or slow post-rendered JS, iFrames, etc.
            if (sa11yToggle.hasClass("sa11y-on")) {
                sa11yToggle.toggleClass("loading-sa11y");
                sa11yToggle.attr("aria-expanded", "true");
                setTimeout(500);
            }

            $(document).ready(() => {
                // Updates badge counter
                ScanPage(this.displayPanel);
                Reset();
            });

            //Escape key to shutdown.
            $(document).keyup((escape) => {
                if (
                    escape.keyCode == 27 &&
                    $("#sa11y-panel").hasClass("sa11y-active")
                ) {
                    tippy.hideAll();
                    sessionStorage.enableSa11y = "";
                    sa11yToggle
                        .attr("aria-expanded", "false")
                        .removeClass("sa11y-on")
                        .click();
                    Reset();
                }
            });

            // ----------------------------------------------------------------------
            // Toggle Readability
            // ----------------------------------------------------------------------
            let $sa11yReadabilityCheck = $("#sa11y-readabilityCheck-toggle");
            $sa11yReadabilityCheck.click(() => {
                if (localStorage.getItem("sa11y-readabilityCheck") === "On") {
                    localStorage.setItem("sa11y-readabilityCheck", "off");
                    $sa11yReadabilityCheck.text("Off");
                    $sa11yReadabilityCheck.attr("aria-pressed", "false");
                    $("#sa11y-readability-content").remove();
                } else {
                    localStorage.setItem("sa11y-readabilityCheck", "On");
                    $sa11yReadabilityCheck.text("On");
                    $sa11yReadabilityCheck.attr("aria-pressed", "true");
                    this.checkReadability();
                }
            });

            // ----------------------------------------------------------------------
            // Toggle Contrast Check
            // ----------------------------------------------------------------------

            let $sa11yContrastCheck = $("#sa11y-contrastCheck-toggle");
            $sa11yContrastCheck.click(() => {
                if (localStorage.getItem("sa11y-contrastCheck") === "On") {
                    localStorage.setItem("sa11y-contrastCheck", "off");
                    $sa11yContrastCheck.text("Off");
                    $sa11yContrastCheck.attr("aria-pressed", "false");
                    this.reset();
                    this.checkAll();
                } else {
                    localStorage.setItem("sa11y-contrastCheck", "On");
                    $sa11yContrastCheck.text("On");
                    $sa11yContrastCheck.attr("aria-pressed", "true");
                    this.reset();
                    this.checkAll();
                }
            });

            // ----------------------------------------------------------------------
            // Dark Mode. Credits: https://derekkedziora.com/blog/dark-mode-revisited
            // ----------------------------------------------------------------------

            let systemInitiatedDark = window.matchMedia(
                "(prefers-color-scheme: dark)"
            );
            let $sa11yTheme = $("#sa11y-theme-toggle");
            let theme = sessionStorage.getItem("sa11y-theme");
            if (systemInitiatedDark.matches) {
                $sa11yTheme.text("On");
                $sa11yTheme.attr("aria-pressed", "true");
            } else {
                $sa11yTheme.text("Off");
                $sa11yTheme.attr("aria-pressed", "false");
            }
            function prefersColorTest(systemInitiatedDark) {
                if (systemInitiatedDark.matches) {
                    $("html").attr("data-sa11y-theme", "dark");
                    $sa11yTheme.text("On");
                    $sa11yTheme.attr("aria-pressed", "true");
                    sessionStorage.setItem("sa11y-theme", "");
                } else {
                    $("html").attr("data-sa11y-theme", "light");
                    $sa11yTheme.text("Off");
                    $sa11yTheme.attr("aria-pressed", "false");
                    sessionStorage.setItem("sa11y-theme", "");
                }
            }

            systemInitiatedDark.addListener(prefersColorTest);
            $sa11yTheme.click(function () {
                let theme = sessionStorage.getItem("sa11y-theme");
                if (theme === "dark") {
                    $("html").attr("data-sa11y-theme", "light");
                    sessionStorage.setItem("sa11y-theme", "light");
                    $sa11yTheme.text("Off");
                    $sa11yTheme.attr("aria-pressed", "false");
                } else if (theme === "light") {
                    $("html").attr("data-sa11y-theme", "dark");
                    sessionStorage.setItem("sa11y-theme", "dark");
                    $sa11yTheme.text("On");
                    $sa11yTheme.attr("aria-pressed", "true");
                } else if (systemInitiatedDark.matches) {
                    $("html").attr("data-sa11y-theme", "light");
                    sessionStorage.setItem("sa11y-theme", "light");
                    $sa11yTheme.text("Off");
                    $sa11yTheme.attr("aria-pressed", "false");
                } else {
                    $("html").attr("data-sa11y-theme", "dark");
                    sessionStorage.setItem("sa11y-theme", "dark");
                    $sa11yTheme.text("On");
                    $sa11yTheme.attr("aria-pressed", "true");
                }
            });
            if (theme === "dark") {
                $("html").attr("data-sa11y-theme", "dark");
                sessionStorage.setItem("sa11y-theme", "dark");
                $sa11yTheme.text("On");
                $sa11yTheme.attr("aria-pressed", "true");
            } else if (theme === "light") {
                $("html").attr("data-sa11y-theme", "light");
                sessionStorage.setItem("sa11y-theme", "light");
                $sa11yTheme.text("Off");
                $sa11yTheme.attr("aria-pressed", "false");
            }
        });
    }

    displayPanel = (errorCount, warningCount) => {
        // Store into local storage that the panel is open.
        localStorage.setItem("sa11y-panel", "opened");
        let totalCount = errorCount + warningCount;
        let $outlineToggle = $("#sa11y-outline-toggle");
        let $settingsToggle = $("#sa11y-settings-toggle");

        $("#sa11y-panel").addClass("sa11y-active");

        if (errorCount === 1 && warningCount === 1) {
            $("#sa11y-panel-content").addClass("sa11y-errors");
            $("#sa11y-status").text(
                `1 accessibility error and 1 warning detected.`
            );
        } else if (errorCount === 1 && warningCount > 0) {
            $("#sa11y-panel-content").addClass("sa11y-errors");
            $("#sa11y-status").text(
                `1 accessibility error and ${warningCount} warnings detected.`
            );
        } else if (errorCount > 0 && warningCount === 1) {
            $("#sa11y-panel-content").addClass("sa11y-errors");
            $("#sa11y-status").text(
                `${errorCount} accessibility errors and 1 warning detected.`
            );
        } else if (this.errorCount > 0 && warningCount > 0) {
            $("#sa11y-panel-content").addClass("sa11y-errors");
            $("#sa11y-status").text(
                `${errorCount} accessibility errors and ${warningCount} warnings detected.`
            );
        } else if (errorCount > 0) {
            $("#sa11y-panel-content").addClass("sa11y-errors");
            $("#sa11y-status").text(
                errorCount === 1
                    ? "1 accessibility issue detected."
                    : errorCount + " accessibility issues detected."
            );
        } else if (warningCount > 0) {
            $("#sa11y-panel-content").addClass("sa11y-warnings");
            $("#sa11y-status").text(
                totalCount === 1
                    ? "Please review warning."
                    : "Please review " + warningCount + " warnings."
            );
        } else {
            $("#sa11y-panel-content").addClass("sa11y-pass");
            $("#sa11y-status").text("No accessibility errors found.");
        }

        //Show outline panel
        $outlineToggle.click(() => {
            if ($outlineToggle.attr("aria-expanded") == "true") {
                $outlineToggle.removeClass("sa11y-outline-active");
                $("#sa11y-outline-panel").removeClass("sa11y-active");
                $outlineToggle.text("Show Outline");
                $outlineToggle.attr("aria-expanded", "false");
                localStorage.setItem("sa11y-outline", "closed");
            } else {
                $outlineToggle.addClass("sa11y-outline-active");
                $("#sa11y-outline-panel").addClass("sa11y-active");
                $outlineToggle.text("Hide Outline");
                $outlineToggle.attr("aria-expanded", "true");
                localStorage.setItem("sa11y-outline", "opened");
            }
            $("#sa11y-outline-header > span").focus();
            $(".sa11y-heading-label").toggleClass("sa11y-label-visible");

            //Close Settings panel when Show Outline is active.
            $("#sa11y-settings-panel").removeClass("sa11y-active");
            $settingsToggle.removeClass("sa11y-settings-active");
            $settingsToggle.attr("aria-expanded", "false");
            $settingsToggle.text("Show Settings");

            //Keyboard accessibility fix for scrollable panel content.
            if ($("#sa11y-outline-list").height() > 350) {
                $("#sa11y-outline-list").attr("tabindex", "0");
            }
        });

        //Remember to leave outline open
        if (localStorage.getItem("sa11y-outline") === "opened") {
            $outlineToggle.addClass("sa11y-outline-active");
            $("#sa11y-outline-panel").addClass("sa11y-active");
            $outlineToggle.text("Hide Outline");
            $outlineToggle.attr("aria-expanded", "true");
            $(".sa11y-heading-label").toggleClass("sa11y-label-visible");
        }

        //Show settings panel
        $settingsToggle.click(() => {
            if ($settingsToggle.attr("aria-expanded") === "true") {
                $settingsToggle.removeClass("sa11y-settings-active");
                $("#sa11y-settings-panel").removeClass("sa11y-active");
                $settingsToggle.text("Show Settings");
                $settingsToggle.attr("aria-expanded", "false");
            } else {
                $settingsToggle.addClass("sa11y-settings-active");
                $("#sa11y-settings-panel").addClass("sa11y-active");
                $settingsToggle.text("Hide Settings");
                $settingsToggle.attr("aria-expanded", "true");
            }

            $("#sa11y-settings-header > span").focus();

            //Close Show Outline panel when Settings is active.
            $("#sa11y-outline-panel").removeClass("sa11y-active");
            $outlineToggle.removeClass("sa11y-outline-active");
            $outlineToggle.attr("aria-expanded", "false");
            $outlineToggle.text("Show Outline");
            $(".sa11y-heading-label").removeClass("sa11y-label-visible");
            localStorage.setItem("sa11y-outline", "closed");

            //Keyboard accessibility fix for scrollable panel content.
            if ($("#sa11y-settings-content").height() > 350) {
                $("#sa11y-settings-content").attr("tabindex", "0");
            }
        });
    };
}

if (window.navigator.userAgent.match(/MSIE|Trident/) === null) {
    new Sa11y(); //No IE support.
}
