/*----------------------------------------------------------------------
Sa11y: the accessibility quality assurance assistant.                
Author: Development led by Adam Chaboryk at Ryerson University.
All acknowledgements: https://github.com/ryersondmp/sa11y
License: https://github.com/ryersondmp/sa11y/blob/master/LICENSE.md
Copyright (c) 2020 - 2021 Ryerson University
The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
----------------------------------------------------------------------*/

//----------------------------------------------------------------------
// Templating for Error, Warning and Pass buttons.
//----------------------------------------------------------------------
function ButtonInserter(type, content, inline = false) {
    ValidTypes = new Set([sa11yError, sa11yWarning, sa11yGood]);
    CSSName = {
        [sa11yError]: "error",
        [sa11yWarning]: "warning",
        [sa11yGood]: "good",
    };
    // TODO: Discuss Throwing Errors.
    if (!ValidTypes.has(type)) {
        throw Error;
    }
    // Check if content is a function
    if (content && {}.toString.call(content) === "[object Function]") {
        // if it is, call it and get the value.
        content = content();
    }
    
    return `
        <div class=${inline ? "sa11y-instance-inline" : "sa11y-instance"}>
            <button
            type="button"   
            aria-label="${[type]}" 
            class="sa11y-btn 
            sa11y-${CSSName[type]}-btn${inline ? "-text" : ""}" 
            data-tippy-content="<div lang='${sa11yLangCode}'>
                <div class='sa11y-header-text'>${[type]}
                </div>
                ${content} 
            </div>
        "> 
        </button>
        </div>`;
}

//----------------------------------------------------------------------
// Templating for full-width banners.
//----------------------------------------------------------------------
function BannerInserter(type, content) {
    ValidTypes = new Set([sa11yError, sa11yWarning, sa11yGood]);
    CSSName = {
        [sa11yError]: "error",
        [sa11yWarning]: "warning",
        [sa11yGood]: "good",
    };
    // TODO: Discuss Throwing Errors.
    if (!ValidTypes.has(type)) {
        throw Error;
    }
    // Check if content is a function
    if (content && {}.toString.call(content) === "[object Function]") {
        // if it is, call it and get the value.
        content = content();
    }
    return `<div class="sa11y-${CSSName[type]}-message-container">
        <div role="region" aria-label="${[type]}" class="sa11y-${CSSName[type]}-message" lang="${sa11yLangCode}">
            ${content}
        </div>
    </div>`;
}

class Sa11y {
    constructor() {

        //Icon on the main toggle. Easy to replace.
        const MainToggleIcon =
            "<svg role='img' focusable='false' width='35px' height='35px' aria-hidden='true' xmlns='http://www.w3.org/2000/svg' viewBox='0 0 512 512'><path fill='#ffffff' d='M256 48c114.953 0 208 93.029 208 208 0 114.953-93.029 208-208 208-114.953 0-208-93.029-208-208 0-114.953 93.029-208 208-208m0-40C119.033 8 8 119.033 8 256s111.033 248 248 248 248-111.033 248-248S392.967 8 256 8zm0 56C149.961 64 64 149.961 64 256s85.961 192 192 192 192-85.961 192-192S362.039 64 256 64zm0 44c19.882 0 36 16.118 36 36s-16.118 36-36 36-36-16.118-36-36 16.118-36 36-36zm117.741 98.023c-28.712 6.779-55.511 12.748-82.14 15.807.851 101.023 12.306 123.052 25.037 155.621 3.617 9.26-.957 19.698-10.217 23.315-9.261 3.617-19.699-.957-23.316-10.217-8.705-22.308-17.086-40.636-22.261-78.549h-9.686c-5.167 37.851-13.534 56.208-22.262 78.549-3.615 9.255-14.05 13.836-23.315 10.217-9.26-3.617-13.834-14.056-10.217-23.315 12.713-32.541 24.185-54.541 25.037-155.621-26.629-3.058-53.428-9.027-82.141-15.807-8.6-2.031-13.926-10.648-11.895-19.249s10.647-13.926 19.249-11.895c96.686 22.829 124.283 22.783 220.775 0 8.599-2.03 17.218 3.294 19.249 11.895 2.029 8.601-3.297 17.219-11.897 19.249z'/></svg>";
        
        const sa11ycontainer = document.createElement("div");
        sa11ycontainer.setAttribute("id", "sa11y-container");
        sa11ycontainer.setAttribute("role", "region");
        sa11ycontainer.setAttribute("lang", sa11yLangCode);
        sa11ycontainer.setAttribute("aria-label", sa11yContainerLabel);

        let loadContrastPreference =
            localStorage.getItem("sa11y-remember-contrast") === "On";

        let loadLabelsPreference =
            localStorage.getItem("sa11y-remember-labels") === "On";

        let loadChangeRequestPreference =
            localStorage.getItem("sa11y-remember-links-advanced") === "On";

        let loadReadabilityPreference =
            localStorage.getItem("sa11y-remember-readability") === "On";

        sa11ycontainer.innerHTML =

        //Main toggle button.
        `<button type="button" aria-expanded="false" id="sa11y-toggle" aria-describedby="sa11y-notification-badge" aria-label="${sa11yMainToggleLabel}" disabled>
            ${MainToggleIcon} 
            <div id="sa11y-notification-badge">
                <span id="sa11y-notification-count"></span>
            </div>
        </button>` +

        //Start of main container.
        `<div id="sa11y-panel">` +
            
            //Page Outline tab.
            `<div id="sa11y-outline-panel" role="tabpanel" aria-labelledby="sa11y-outline-header">
                <div id="sa11y-outline-header" class="sa11y-header-text">
                    <h2 tabindex="-1">${sa11yPageOutline}</h2>
                </div>
                <div id="sa11y-outline-content">
                    <ul id="sa11y-outline-list"></ul>
                </div>` +

                //Readability tab.
                `<div id="sa11y-readability-panel">
                    <div id="sa11y-readability-content">
                        <h2 class="sa11y-header-text-inline">${sa11yReadability}</h2>
                        <p id="sa11y-readability-info"></p>
                        <ul id="sa11y-readability-details"></ul>
                    </div>
                </div>
            </div>` + //End of Page Outline tab.

            //Settings tab.
           `<div id="sa11y-settings-panel" role="tabpanel" aria-labelledby="sa11y-settings-header">
                <div id="sa11y-settings-header" class="sa11y-header-text">
                    <h2 tabindex="-1">${sa11ySettings}</h2>
                </div>
                <div id="sa11y-settings-content">
                    <ul id="sa11y-settings-options">  
                        <li>
                            <label id="check-contrast" for="sa11y-contrast-toggle">${sa11yContrast}</label>
                            <button id="sa11y-contrast-toggle" 
                            aria-labelledby="check-contrast" 
                            class="sa11y-settings-switch" 
                            aria-pressed="${
                                loadContrastPreference ? "true" : "false"
                            }">${loadContrastPreference ? sa11yOn : sa11yOff}</button>
                        </li>
                        <li>
                            <label id="check-labels" for="sa11y-labels-toggle">${sa11yFormLabels}</label>
                            <button id="sa11y-labels-toggle" aria-labelledby="check-labels" class="sa11y-settings-switch" 
                            aria-pressed="${
                                loadLabelsPreference ? "true" : "false"
                            }">${loadLabelsPreference ? sa11yOn : sa11yOff}</button>
                        </li>
                        <li>
                            <label id="check-changerequest" for="sa11y-links-advanced-toggle">${sa11yLinksAdvanced} <span class="sa11y-badge">AAA</span></label>
                            <button id="sa11y-links-advanced-toggle" aria-labelledby="check-changerequest" class="sa11y-settings-switch" 
                            aria-pressed="${
                                loadChangeRequestPreference ? "true" : "false"
                            }">${loadChangeRequestPreference ? sa11yOn : sa11yOff}</button>
                        </li>
                        <li>
                            <label id="check-readability" for="sa11y-readability-toggle">${sa11yReadability} <span class="sa11y-badge">AAA</span></label>
                            <button id="sa11y-readability-toggle" aria-labelledby="check-readability" class="sa11y-settings-switch" 
                            aria-pressed="${
                                loadReadabilityPreference ? "true" : "false"
                            }">${loadReadabilityPreference ? sa11yOn : sa11yOff}</button>
                        </li>
                        <li>
                            <label id="dark-mode" for="sa11y-theme-toggle">${sa11yDarkMode}</label>
                            <button id="sa11y-theme-toggle" aria-labelledby="dark-mode" class="sa11y-settings-switch"></button>
                        </li>
                    </ul>
                </div>
            </div>` 
            +

            //Console warning messages.
            `<div id="sa11y-panel-alert">
                <div class="sa11y-header-text">
                    <button id="sa11y-close-alert" class="sa11y-close-btn" aria-label="${sa11yAlertClose}" aria-describedby="sa11y-alert-heading sa11y-panel-alert-text"></button>
                    <h2 id="sa11y-alert-heading">${sa11yAlertText}</h2>
                </div>
                <div id="sa11y-panel-alert-text"></div>
                <div id="sa11y-panel-alert-preview"></div>
            </div>` + 

            //Main panel that conveys state of page.
            `<div id="sa11y-panel-content">
                <button id="sa11y-cycle-toggle" type="button" aria-label="${sa11yShortcutSR}">
                    <div class="sa11y-panel-icon"></div>
                </button>
                <div id="sa11y-panel-text"><p id="sa11y-status" aria-live="polite"></p></div>
            </div>` +

            //Show Outline & Show Settings button.
            `<div id="sa11y-panel-controls" role="tablist" aria-orientation="horizontal">
                <button type="button" role="tab" aria-expanded="false" id="sa11y-outline-toggle" aria-controls="sa11y-outline-panel">
                    ${sa11yShowOutline}
                </button>
                <button type="button" role="tab" aria-expanded="false" id="sa11y-settings-toggle" aria-controls="sa11y-settings-panel">
                    ${sa11yShowSettings}
                </button>
                <div aria-hidden="true">&nbsp;&nbsp;</div> 
            </div>` +

        //End of main container.
        `</div>`;

        const pagebody = document.getElementsByTagName("BODY")[0];              
        pagebody.prepend(sa11ycontainer);

        //Put before document.ready because of CSS flicker when dark mode is enabled.
        this.settingPanelToggles();
        
        //500ms to let the page settle down (e.g. slow loading JavaScript components).
        setTimeout(() => {
                
                $(document).ready(() => {
                    $("#sa11y-toggle").prop("disabled", false);
                    
                    // Preload before CheckAll function.
                    this.loadGlobals();
                    this.sa11yMainToggle();
                    this.sanitizeHTMLandComputeARIA();
                    this.initializeJumpToIssueTooltip();

                    //To-do: This needs to be completely re-thinked. On document.ready, it crudely checks the page and resets everything, except for the badge counter. Need to figure out a way to update badge counter without painting entire page with error buttons.
                    this.checkAll();
                    this.resetAll();
                });
        }, 500);
    }

    //----------------------------------------------------------------------
    // Main toggle button
    //----------------------------------------------------------------------
    sa11yMainToggle = () => {

        //Keeps checker active when navigating between pages until it is toggled off.
        const sa11yToggle = $("#sa11y-toggle");
        sa11yToggle.click(() => {
            if (localStorage.getItem("sa11y-remember-panel") === "Opened") {
                localStorage.setItem("sa11y-remember-panel", "Closed");
                sa11yToggle
                    .removeClass("sa11y-on")
                    .attr("aria-expanded", "false");
                this.resetAll();
                this.updateBadge();

            } else {
                localStorage.setItem("sa11y-remember-panel", "Opened");
                sa11yToggle
                    .addClass("sa11y-on")
                    .attr("aria-expanded", "true");
                this.checkAll();
                
                //Don't show badge when panel is opened.
                $("#sa11y-notification-badge").css("display", "none");
            }
        });

        //Remember to leave it open
        if (localStorage.getItem("sa11y-remember-panel") === "Opened") {
            sa11yToggle.addClass("sa11y-on").attr("aria-expanded", "true");
        }

        //Crudely give a little time to load any other content or slow post-rendered JS, iFrames, etc.
        if (sa11yToggle.hasClass("sa11y-on")) {
            sa11yToggle.toggleClass("loading-sa11y");
            sa11yToggle.attr("aria-expanded", "true");
            setTimeout(this.checkAll, 500);
        }

        //Escape key to shutdown.
        $(document).keyup((escape) => {
            if (
                escape.keyCode == 27 &&
                $("#sa11y-panel").hasClass("sa11y-active")
            ) {
                tippy.hideAll();
                sa11yToggle
                    .attr("aria-expanded", "false")
                    .removeClass("sa11y-on")
                    .click();
                this.resetAll();
            } else {
                this.onkeyup = null;
            }
        });
    }

    // ============================================================
    // Global configuration settings.
    // Stores the list of elements to ignore based on configuration. 
    // Credits to John Jameson, PrincetonU for this snippet. 
    // ============================================================
    loadGlobals = () => {
        // Look for a content container
        if (
            typeof sa11yCheckRoot !== "string" ||
            $(sa11yCheckRoot).length === 0
        ) {
            sa11yCheckRoot = "body";
        }
        // Combine default and custom ignores.
        let separator = ", ";
        // Container ignores apply to self and children.
        if (sa11yContainerIgnore.length > 0) {
            let containerSelectors = sa11yContainerIgnore.split(",");
            for (let i = 0; i < containerSelectors.length; i++) {
                containerSelectors[i] =
                    containerSelectors[i] + " *, " + containerSelectors[i];
            }
            sa11yContainerIgnore =
                "[aria-hidden='true']" + separator + containerSelectors.join();
        } else {
            sa11yContainerIgnore = "[aria-hidden='true']";
        }
        this.containerIgnore = sa11yContainerIgnore;
        // Images ignore defaults plus presentation role.
        if (sa11yImageIgnore.length > 1) {
            sa11yImageIgnore += separator;
        }
        this.imageIgnore =
            sa11yImageIgnore +
            this.containerIgnore +
            separator +
            "[role='presentation']";

        this.headerIgnore = sa11yHeaderIgnore;
        // Links ignore defaults plus sa11y links.
        if (sa11yLinkIgnore.length > 0) {
            sa11yLinkIgnore += separator;
        }
        this.linkIgnore =
            sa11yLinkIgnore +
            sa11yContainerIgnore +
            separator +
            "[aria-hidden='true']";
        if (sa11yHeaderIgnore.length > 0) {
            this.headerIgnore += separator + sa11yContainerIgnore;
        } else {
            this.headerIgnore = sa11yContainerIgnore;
        }
    };

    // ============================================================
    // Helpers: Sanitize HTML and compute ARIA for hyperlinks
    // ============================================================
    sanitizeHTMLandComputeARIA = () => {

        //Helper: Help clean up HTML characters for tooltips and outline panel.
        this.sanitizeForHTML = function (string) {
            let entityMap = {
                "&": "&amp;",
                "<": "&lt;",
                ">": "&gt;",
                '"': "&quot;",
                "'": "&#39;",
                "/": "&#x2F;",
                "`": "&#x60;",
                "=": "&#x3D;",
            };
            return String(string).replace(/[&<>"'`=\/]/g, function (s) {
                return entityMap[s];
            });
        };

        //Mini ignore function.
        $.fn.ignore = function(sel){
            return this.clone().find(sel||">*").remove().end();
        };
        
        //Helper: Handle ARIA labels for Link Text module.
        this.computeAriaLabel = function ($el) {
            if ($el.is("[aria-label]")) {
                return $el.attr("aria-label");
            }
            else if ($el.is("[aria-labelledby]")) {
                let target = $el.attr("aria-labelledby").split(/\s+/);
                if (target.length > 0) {
                    let returnText = "";
                    $.each($(target), function(i, el){
                        returnText += $("#" + el).ignore("span.sa11y-heading-label").text() + " ";
                    });
                    return returnText;
                } 
                else {
                    return "";
                }
            } 
            else {
                return "noAria";
            }
        };
    }

    //----------------------------------------------------------------------
    // Setting's panel: Additional ruleset toggles.
    //----------------------------------------------------------------------
    settingPanelToggles = () => {
        
        //Toggle: Contrast
        let $sa11yContrastCheck = $("#sa11y-contrast-toggle");
        $sa11yContrastCheck.click(async () => {
            if (localStorage.getItem("sa11y-remember-contrast") === "On") {
                localStorage.setItem("sa11y-remember-contrast", "Off");
                $sa11yContrastCheck.text(`${sa11yOff}`);
                $sa11yContrastCheck.attr("aria-pressed", "false");
                this.resetAll(false);
                await this.checkAll();
            } else {
                localStorage.setItem("sa11y-remember-contrast", "On");
                $sa11yContrastCheck.text(`${sa11yOn}`);
                $sa11yContrastCheck.attr("aria-pressed", "true");
                this.resetAll(false);
                await this.checkAll();
            }
        });

        //Toggle: Form labels
        let $sa11yLabelsCheck = $("#sa11y-labels-toggle");
        $sa11yLabelsCheck.click(async () => {
            if (localStorage.getItem("sa11y-remember-labels") === "On") {
                localStorage.setItem("sa11y-remember-labels", "Off");
                $sa11yLabelsCheck.text(`${sa11yOff}`);
                $sa11yLabelsCheck.attr("aria-pressed", "false");
                this.resetAll(false);
                await this.checkAll();
            } else {
                localStorage.setItem("sa11y-remember-labels", "On");
                $sa11yLabelsCheck.text(`${sa11yOn}`);
                $sa11yLabelsCheck.attr("aria-pressed", "true");
                this.resetAll(false);
                await this.checkAll();
            }
        });

        //Toggle: Links (Advanced)
        let $sa11yChangeRequestCheck = $("#sa11y-links-advanced-toggle");
        $sa11yChangeRequestCheck.click(async () => {
            if (localStorage.getItem("sa11y-remember-links-advanced") === "On") {
                localStorage.setItem("sa11y-remember-links-advanced", "Off");
                $sa11yChangeRequestCheck.text(`${sa11yOff}`);
                $sa11yChangeRequestCheck.attr("aria-pressed", "false");
                this.resetAll(false);
                await this.checkAll();
            } else {
                localStorage.setItem("sa11y-remember-links-advanced", "On");
                $sa11yChangeRequestCheck.text(`${sa11yOn}`);
                $sa11yChangeRequestCheck.attr("aria-pressed", "true");
                this.resetAll(false);
                await this.checkAll();
            }
        });

        //Toggle: Readability
        let $sa11yReadabilityCheck = $("#sa11y-readability-toggle");
        $sa11yReadabilityCheck.click(async () => {
            if (localStorage.getItem("sa11y-remember-readability") === "On") {
                localStorage.setItem("sa11y-remember-readability", "Off");
                $sa11yReadabilityCheck.text(`${sa11yOff}`);
                $sa11yReadabilityCheck.attr("aria-pressed", "false");
                $("#sa11y-readability-panel").removeClass("sa11y-active");
                this.resetAll(false);
                await this.checkAll();
            } else {
                localStorage.setItem("sa11y-remember-readability", "On");
                $sa11yReadabilityCheck.text(`${sa11yOn}`);
                $sa11yReadabilityCheck.attr("aria-pressed", "true");
                $("#sa11y-readability-panel").addClass("sa11y-active");
                this.resetAll(false);
                await this.checkAll();
            }
        });
        
        if (localStorage.getItem("sa11y-remember-readability") === "On") {
            $("#sa11y-readability-panel").addClass("sa11y-active");
        }

        //Toggle: Dark mode. (Credits: https://derekkedziora.com/blog/dark-mode-revisited)
        let systemInitiatedDark = window.matchMedia(
            "(prefers-color-scheme: dark)"
        );
        let $sa11yTheme = $("#sa11y-theme-toggle");
        let theme = localStorage.getItem("sa11y-remember-theme");
        if (systemInitiatedDark.matches) {
            $sa11yTheme.text(`${sa11yOn}`);
            $sa11yTheme.attr("aria-pressed", "true");
        } else {
            $sa11yTheme.text(`${sa11yOff}`);
            $sa11yTheme.attr("aria-pressed", "false");
        }
        function prefersColorTest(systemInitiatedDark) {
            if (systemInitiatedDark.matches) {
                $("html").attr("data-sa11y-theme", "dark");
                $sa11yTheme.text(`${sa11yOn}`);
                $sa11yTheme.attr("aria-pressed", "true");
                localStorage.setItem("sa11y-remember-theme", "");
            } else {
                $("html").attr("data-sa11y-theme", "light");
                $sa11yTheme.text(`${sa11yOff}`);
                $sa11yTheme.attr("aria-pressed", "false");
                localStorage.setItem("sa11y-remember-theme", "");
            }
        }

        systemInitiatedDark.addListener(prefersColorTest);
        $sa11yTheme.click(function () {
            let theme = localStorage.getItem("sa11y-remember-theme");
            if (theme === "dark") {
                $("html").attr("data-sa11y-theme", "light");
                localStorage.setItem("sa11y-remember-theme", "light");
                $sa11yTheme.text(`${sa11yOff}`);
                $sa11yTheme.attr("aria-pressed", "false");
            } else if (theme === "light") {
                $("html").attr("data-sa11y-theme", "dark");
                localStorage.setItem("sa11y-remember-theme", "dark");
                $sa11yTheme.text(`${sa11yOn}`);
                $sa11yTheme.attr("aria-pressed", "true");
            } else if (systemInitiatedDark.matches) {
                $("html").attr("data-sa11y-theme", "light");
                localStorage.setItem("sa11y-remember-theme", "light");
                $sa11yTheme.text(`${sa11yOff}`);
                $sa11yTheme.attr("aria-pressed", "false");
            } else {
                $("html").attr("data-sa11y-theme", "dark");
                localStorage.setItem("sa11y-remember-theme", "dark");
                $sa11yTheme.text(`${sa11yOn}`);
                $sa11yTheme.attr("aria-pressed", "true");
            }
        });
        if (theme === "dark") {
            $("html").attr("data-sa11y-theme", "dark");
            localStorage.setItem("sa11y-remember-theme", "dark");
            $sa11yTheme.text(`${sa11yOn}`);
            $sa11yTheme.attr("aria-pressed", "true");
        } else if (theme === "light") {
            $("html").attr("data-sa11y-theme", "light");
            localStorage.setItem("sa11y-remember-theme", "light");
            $sa11yTheme.text(`${sa11yOff}`);
            $sa11yTheme.attr("aria-pressed", "false");
        }
    }

    //----------------------------------------------------------------------
    // Tooltip for Jump-to-Issue button.
    //----------------------------------------------------------------------
    initializeJumpToIssueTooltip = () => {
        tippy('#sa11y-cycle-toggle', {
            content: `<div style="text-align:center">${sa11yShortcutTooltip} &raquo;<br><span class="sa11y-shortcut-icon"></span></div>`,
            allowHTML: true,
            delay: [900, 0],
            trigger: "mouseenter focusin",
            arrow: true,
            placement: 'top',
            theme: "sa11y-theme",
            aria: {
                content: null,
                expanded: false,
            },
            appendTo: document.body,
        });
    }

    // ----------------------------------------------------------------------
    // Check all
    // ----------------------------------------------------------------------
    checkAll = async () => {
        this.errorCount = 0;
        this.warningCount = 0;
        this.root = $(sa11yCheckRoot);

        this.findElements();
        
        //Ruleset checks
        this.checkHeaders();
        this.checkLinkText();
        this.checkAltText();

        if (localStorage.getItem("sa11y-remember-contrast") === "On") {
            this.checkContrast();
        }

        if (localStorage.getItem("sa11y-remember-labels") === "On") {
            this.checkLabels();
        }

        if (localStorage.getItem("sa11y-remember-links-advanced") === "On") {
            this.checkLinksAdvanced();
        }
        
        if (localStorage.getItem("sa11y-remember-readability") === "On") {
            this.checkReadability();
        }

        this.checkQA();

        //Update panel
        if (this.panelActive) {
            this.resetAll();
        } else {
            this.updatePanel();
        }
        this.initializeTooltips();
        this.detectOverflow();

        //Don't show badge when panel is opened.
        if ($(".sa11y-on").length == 0) {
            this.updateBadge();
        }
        
    };

    // ============================================================
    // Reset all
    // ============================================================
    resetAll = (restartPanel = true) => {
        this.panelActive = false;
        this.clearEverything();
        $("#sa11y-status").text();
        $("#sa11y-outline-toggle").off("click");
        $("#sa11y-settings-toggle").off("click");
        
        //Errors
        this.root.find(".sa11y-error-border").removeClass("sa11y-error-border");
        this.root.find(".sa11y-error-heading").removeClass("sa11y-error-heading");
        this.root.find(".sa11y-error-message-container").remove();
        this.root.find(".sa11y-error-text").removeClass("sa11y-error-text");

        //Warnings
        this.root.find(".sa11y-warning-border").removeClass("sa11y-warning-border");
        this.root.find(".sa11y-warning-text").removeClass("sa11y-warning-text");
        this.root.find("p").removeClass("sa11y-fake-list");
        this.root.find(".sa11y-warning-uppercase").contents().unwrap();
        this.root.find(".sa11y-warning-uppercase").removeClass("sa11y-warning-uppercase");

        //Remove buttons
        this.root.find(".sa11y-instance").remove();
        this.root.find(".sa11y-instance-inline").remove();

        //Etc
        this.root.find(".sa11y-heading-label").remove();
        this.root.find("#sa11y-outline-list li").remove();
        this.root.find(".sa11y-readability-period").remove();
        this.root.find("#sa11y-readability-info span, #sa11y-readability-details li").remove();
        this.root.find(".sa11y-overflow").removeClass("sa11y-overflow");
        this.root.find(".sa11y-fake-heading").removeClass("sa11y-fake-heading");
        this.root.find(".sa11y-good-border").removeClass("sa11y-good-border");
        this.root.find(".sa11y-console-warning-message-container").remove();
        this.root.find(".sa11y-pulse-border").removeClass("sa11y-pulse-border");
        this.root.find("#sa11y-panel-alert").removeClass("sa11y-active");
        this.root.find("#sa11y-panel-alert-text").empty();

        if (restartPanel) {
            $("#sa11y-panel-content").removeClass();
            this.root.find("#sa11y-panel").removeClass("sa11y-active");
        }
    };
    clearEverything = () => {};
            
    // ============================================================
    // Initialize tooltips for error/warning/pass buttons: (Tippy.js)
    // Although you can also swap this with Bootstrap's tooltip library for example.
    // ============================================================
    initializeTooltips = () => {
        tippy(".sa11y-btn", {
            interactive: true,
            trigger: "mouseenter click focusin",  //Focusin trigger to ensure "Jump to issue" button displays tooltip.
            arrow: true,
            delay: [200, 0], //Slight delay to ensure mouse doesn't quickly trigger and hide tooltip.
            theme: "sa11y-theme",
            placement: 'bottom',
            allowHTML: true,
            aria: {
                content: 'describedby',
              },
            appendTo: document.body,
        });
    }
            
    // ============================================================
    // Detect parent containers that have hidden overflow.
    // ============================================================
    detectOverflow = () => {
        $(".sa11y-btn").parents().each(function() {
            if ($(this).css("overflow") === "hidden") {
                $(this).addClass("sa11y-overflow")
            }
        });
    }

    // ============================================================
    // Update iOS style notification badge on icon.
    // ============================================================
    updateBadge = () => {
        let totalCount = this.errorCount + this.warningCount;
        if (totalCount === 0) {
            $("#sa11y-notification-badge").css("display", "none");
            $('#sa11y-notification-count').attr("aria-label", "");
        } else if (this.warningCount > 0 && this.errorCount === 0) {
            $('#sa11y-notification-badge').css("display", "flex");
            $('#sa11y-notification-badge').addClass("sa11y-notification-badge-warning");
            $('#sa11y-notification-count').text(this.warningCount);
            $('#sa11y-notification-count').attr("aria-label", this.warningCount + " warnings detected.")
        } else {
            $('#sa11y-notification-badge').css("display", "flex");
            $('#sa11y-notification-count').text(totalCount);
            $('#sa11y-notification-count').attr("aria-label", totalCount + " errors detected.")
        }
    }

    // ----------------------------------------------------------------------
    // Main panel: Display and update panel.
    // ----------------------------------------------------------------------
    updatePanel = () => {
        this.panelActive = true;
        let totalCount = this.errorCount + this.warningCount;
        let warningCount = this.warningCount;
        let errorCount = this.errorCount;
        
        this.buildPanel();
        this.jumpToIssue();

        $("#sa11y-panel").addClass("sa11y-active");

        if (this.errorCount === 1 && this.warningCount === 1) {
            $("#sa11y-panel-content").attr("class", "sa11y-errors");
            $("#sa11y-status").text(
                PanelStatus["status1"]
            );
        } else if (this.errorCount === 1 && this.warningCount > 0) {
            $("#sa11y-panel-content").attr("class", "sa11y-errors");
            $("#sa11y-status").text(
                PanelStatus["status2"](warningCount)
            );
        } else if (this.errorCount > 0 && this.warningCount === 1) {
            $("#sa11y-panel-content").attr("class", "sa11y-errors");
            $("#sa11y-status").text(
                PanelStatus["status3"](errorCount)
            );
        } else if (this.errorCount > 0 && this.warningCount > 0) {
            $("#sa11y-panel-content").attr("class", "sa11y-errors");
            $("#sa11y-status").text(
                PanelStatus["status4"](errorCount, warningCount)
            );
        } else if (this.errorCount > 0) {
            $("#sa11y-panel-content").attr("class", "sa11y-errors");
            $("#sa11y-status").text(
                this.errorCount === 1
                    ? PanelStatus["status5"]
                    : PanelStatus["status6"](errorCount)
            );
        } else if (this.warningCount > 0) {
            $("#sa11y-panel-content").attr("class", "sa11y-warnings");
            $("#sa11y-status").text(
                totalCount === 1
                    ? PanelStatus["status7"]
                    : PanelStatus["status8"](warningCount)
            );
        } else {
            $("#sa11y-panel-content").attr("class", "sa11y-good");
            $("#sa11y-status").text(PanelStatus["status9"]);
        }
    };

    // ----------------------------------------------------------------------
    // Main panel: Build Show Outline and Settings tabs.
    // ----------------------------------------------------------------------
    buildPanel = () => {
        //Show outline panel
        let $outlineToggle = $("#sa11y-outline-toggle");
        $outlineToggle.click(() => {
            if ($outlineToggle.attr("aria-expanded") == "true") {
                $outlineToggle.removeClass("sa11y-outline-active");
                $("#sa11y-outline-panel").removeClass("sa11y-active");
                $outlineToggle.text(`${sa11yShowOutline}`);
                $outlineToggle.attr("aria-expanded", "false");
                localStorage.setItem("sa11y-remember-outline", "Closed");
            } else {
                $outlineToggle.addClass("sa11y-outline-active");
                $("#sa11y-outline-panel").addClass("sa11y-active");
                $outlineToggle.text(`${sa11yHideOutline}`);
                $outlineToggle.attr("aria-expanded", "true");
                localStorage.setItem("sa11y-remember-outline", "Opened");
            }
            
            $("#sa11y-outline-header > h2").get(0).focus();
            
            $(".sa11y-heading-label").toggleClass("sa11y-label-visible");

            //Close Settings panel when Show Outline is active.
            $("#sa11y-settings-panel").removeClass("sa11y-active");
            $settingsToggle.removeClass("sa11y-settings-active");
            $settingsToggle.attr("aria-expanded", "false");
            $settingsToggle.text(`${sa11yShowSettings}`);

            //Keyboard accessibility fix for scrollable panel content.
            if ($("#sa11y-outline-list").height() > 250) {
                $("#sa11y-outline-list").attr("tabindex", "0");
            }
        });

        //Remember to leave outline open
        if (localStorage.getItem("sa11y-remember-outline") === "Opened") {
            $outlineToggle.addClass("sa11y-outline-active");
            $("#sa11y-outline-panel").addClass("sa11y-active");
            $outlineToggle.text(`${sa11yHideOutline}`);
            $outlineToggle.attr("aria-expanded", "true");
            $(".sa11y-heading-label").toggleClass("sa11y-label-visible");

            //Keyboard accessibility fix for scrollable panel content.
            if ($("#sa11y-outline-list").height() > 250) {
                $("#sa11y-outline-list").attr("tabindex", "0");
            }
        }

        //Show settings panel
        let $settingsToggle = $("#sa11y-settings-toggle");
        $settingsToggle.click(() => {
            if ($settingsToggle.attr("aria-expanded") === "true") {
                $settingsToggle.removeClass("sa11y-settings-active");
                $("#sa11y-settings-panel").removeClass("sa11y-active");
                $settingsToggle.text(`${sa11yShowSettings}`);
                $settingsToggle.attr("aria-expanded", "false");
            } else {
                $settingsToggle.addClass("sa11y-settings-active");
                $("#sa11y-settings-panel").addClass("sa11y-active");
                $settingsToggle.text(`${sa11yHideSettings}`);
                $settingsToggle.attr("aria-expanded", "true");
            }

            $("#sa11y-settings-header > h2").get(0).focus();

            //Close Show Outline panel when Settings is active.
            $("#sa11y-outline-panel").removeClass("sa11y-active");
            $outlineToggle.removeClass("sa11y-outline-active");
            $outlineToggle.attr("aria-expanded", "false");
            $outlineToggle.text(`${sa11yShowOutline}`);
            $(".sa11y-heading-label").removeClass("sa11y-label-visible");
            localStorage.setItem("sa11y-remember-outline", "Closed");

            //Keyboard accessibility fix for scrollable panel content.
            if ($("#sa11y-settings-content").height() > 350) {
                $("#sa11y-settings-content").attr("tabindex", "0");
            }
        });

        //Enhanced keyboard accessibility for panel.
        $("[role=tablist]").keydown(function(e) {
            if (e.keyCode == 37) {
                $("[aria-expanded=true], [aria-expanded=false]").prev().focus();
                e.preventDefault();
            }
            if (e.keyCode == 38) {
                $("[aria-expanded=true], [aria-expanded=false]").prev().focus();
                e.preventDefault();
            }
            if (e.keyCode == 39) {
                $("[aria-expanded=true], [aria-expanded=false]").next().focus();
                e.preventDefault();
            }
            if (e.keyCode == 40) {
                $("[aria-expanded=true], [aria-expanded=false]").next().focus();
                e.preventDefault();
            }
        });

        let $closeAlertToggle = $("#sa11y-close-alert");
        $closeAlertToggle.click(() => {
            $("#sa11y-panel-alert").removeClass("sa11y-active");
            $("#sa11y-panel-alert-text").empty();
            $(".sa11y-pulse-border").removeClass("sa11y-pulse-border");
            $("#sa11y-cycle-toggle").focus();
        });
    }

    // ============================================================
    // Main panel: Jump to issue button.
    // ============================================================
    jumpToIssue = () => {
        let sa11yBtnLocation = 0;
        const findSa11yBtn = $(".sa11y-btn").length;

        //Disable jump to issue button if there's no buttons to view.
        if (findSa11yBtn === 0) {
            $("#sa11y-cycle-toggle").prop("disabled", true);
            $("#sa11y-cycle-toggle").attr("style", "cursor: default !important;");
        }

        //Jump to issue using keyboard shortcut.
        document.onkeyup = function(e) {
            if (e.altKey && e.code == "Period") {
                jumpToIssueToggle();
                e.preventDefault();
            }
        };
        
        //Jump to issue using click.
        $("#sa11y-cycle-toggle").off().on("click", function(){
            jumpToIssueToggle();
        });
        
        const jumpToIssueToggle = function() {
            //Calculate location of both visible and hidden buttons.
            let pos = $(".sa11y-btn").eq(sa11yBtnLocation).closest(":visible").offset().top - 50;
            let posi = $(".sa11y-btn").eq(sa11yBtnLocation).offset().top;

            if (pos >= 1) {
                $("html,body").animate({
                    scrollTop: pos}, 
                300);

                $(".sa11y-btn:hidden").each(function() { 
                    $(this).parent().closest(":visible").addClass("sa11y-pulse-border");
                });

                $(".sa11y-btn").get(sa11yBtnLocation).focus();
            } 
            
            //If location is less than 0 = hidden element (e.g. display:none);
            if (posi <= 0) {
                $("#sa11y-panel-alert").addClass("sa11y-active");
                $("#sa11y-panel-alert-text").text(PanelStatus["notVisibleAlert"]);
                $("#sa11y-panel-alert-preview").html($(".sa11y-btn")[sa11yBtnLocation].getAttribute('data-tippy-content'));
                $("#sa11y-close-alert").focus();

            } else if (posi > 1) {
                $("#sa11y-panel-alert").removeClass("sa11y-active");
                $(".sa11y-pulse-border").removeClass("sa11y-pulse-border");
            }

            sa11yBtnLocation += 1;
            if (sa11yBtnLocation >= findSa11yBtn) {
                sa11yBtnLocation = 0;
            }
        };
    }

    // ============================================================
    // Finds all elements and caches them
    // ============================================================
    findElements = () => {
        let { root, containerIgnore, imageIgnore } = this;
        this.$p = root.find("p").not(containerIgnore);
        this.$h = root
            .find("h1, h2, h3, h4, h5, h6, [role='heading'][aria-level]")
            .not(containerIgnore);
        this.$mainPandLi = root
            .find("main p, main li, [role='main'] p, [role='main'] li")
            .not(containerIgnore);
        this.$img = root.find("img").not(imageIgnore);
        this.$iframe = root.find("iframe").not(containerIgnore);
        this.$table = root.find("table:visible").not("[role='presentation']").not(containerIgnore);
        this.$contrast = root
            .find("*:visible")
            .not(".sa11y-exclude *")
            .not("#sa11y-container *")
            .not(containerIgnore);
    };

    // ============================================================
    // Rulesets: Check Headings
    // ============================================================
    checkHeaders = async () => {
        let prevLevel;
        this.$h.each((i, el) => {
            let $el = $(el);
            let text = $el.text();
            let htext = this.sanitizeForHTML(text);
            let level;

            if ($el.attr("aria-level")) {
                level = +$el.attr("aria-level");
            } else {
                level = +$el[0].tagName.slice(1);
            }

            let headingLength = $el.text().trim().length;
            let error = null;
            let warning = null;

            if (level - prevLevel > 1 && i !== 0) {
                error = IM["headings"]["nonconsecLevel"](prevLevel, level);
            } else if ($el.text().trim().length < 1) {
                error = IM["headings"]["emptyHeading"](level);
                $el.addClass("sa11y-error-text");
            } else if (i === 0 && level !== 1 && level !== 2) {
                error = IM["headings"]["firstHeading"];
            } else if ($el.text().trim().length > 170) {
                warning = IM["headings"]["headingTooLong"](headingLength);
            }

            prevLevel = level;

            let li = 
            `<li class='sa11y-outline-${level}'>
                <span class='sa11y-badge'>${level}</span> 
                <span class='sa11y-outline-list-item'>${htext}</span>
            </li>`;

            let liError = 
            `<li class='sa11y-outline-${level}'>
                <span class='sa11y-badge sa11y-error-badge'>
                <span aria-hidden='true'>&#10007;</span>
                <span class='sa11y-visually-hidden'>${sa11yError}</span> ${level}</span> 
                <span class='sa11y-outline-list-item sa11y-red-text sa11y-bold'>${htext}</span>
            </li>`;

            let liWarning = 
            `<li class='sa11y-outline-${level}'>
                <span class='sa11y-badge sa11y-warning-badge'>
                <span aria-hidden='true'>&#x3f;</span>
                <span class='sa11y-visually-hidden'>${sa11yWarning}</span> ${level}</span> 
                <span class='sa11y-outline-list-item sa11y-yellow-text sa11y-bold'>${htext}</span>
            </li>`;

            if ($el.not(sa11yOutlineIgnore).length !== 0) {

                //Append heading labels.
                $el.not(sa11yOutlineIgnore).append(
                    `<span class='sa11y-heading-label'>H${level}</span>`
                );

                //Heading errors
                if (error != null && $el.closest("a").length > 0) {
                    this.errorCount++;
                    $el.addClass("sa11y-error-heading");
                    $el.closest("a").after(ButtonInserter(sa11yError, error, true));
                    $("#sa11y-outline-list").append(liError);
                }
                
                else if (error != null) {
                    this.errorCount++;
                    $el.addClass("sa11y-error-heading");
                    $el.before(ButtonInserter(sa11yError, error));
                    $("#sa11y-outline-list").append(liError);
                }

                //Heading warnings
                else if (warning != null && $el.closest("a").length > 0) {
                    this.warningCount++;
                    $el.closest("a").after(ButtonInserter(sa11yWarning, warning));
                    $("#sa11y-outline-list").append(liWarning);
                }

                else if (warning != null) {
                    this.warningCount++;
                    $el.before(ButtonInserter(sa11yWarning, warning));
                    $("#sa11y-outline-list").append(liWarning);
                }
                
                //Not an error or warning
                else if (error == null || warning == null) {
                    $("#sa11y-outline-list").append(li);
                }
            }
        });

        //Check to see there is at least one H1 on the page.
        let $h1 = this.root
            .find("h1, [role='heading'][aria-level='1']")
            .not(this.containerIgnore);
        if ($h1.length === 0) {
            this.errorCount++;

            $("#sa11y-outline-header").after(
                `<div class='sa11y-instance sa11y-missing-h1'>
                    <span class='sa11y-badge sa11y-error-badge'><span aria-hidden='true'>&#10007;</span><span class='sa11y-visually-hidden'>${sa11yError}</span></span> 
                    <span class='sa11y-red-text sa11y-bold'>${IM["headings"]["missingHeadingOnePanelText"]}</span>
                </div>`
            );

            $("#sa11y-container").after(
                BannerInserter(sa11yError, IM["headings"]["missingHeadingOne"])
            );

        }
    };

    // ============================================================
    // Rulesets: Link text
    // ============================================================
    checkLinkText = function () {
        let containsLinkTextStopWords = function (textContent) {
            let urlText = [
                "http", 
                ".asp", 
                ".htm", 
                ".php", 
                ".edu/", 
                ".com/", 
                ".net/", 
                ".org/", 
                ".us/", 
                ".ca/",
                ".de/",
                ".icu/",
                ".uk/",
                ".ru/",
                ".info/",
                ".top/",
                ".xyz/",
                ".tk/",
                ".cn/",
                ".ga/",
                ".cf/",
                ".nl/",
                ".io/"
            ];

            let hit = [null, null, null];

            // Flag partial stop words.
            $.each(partialStopWords, function (index, word) {
                if (
                    textContent.length === word.length &&
                    textContent.toLowerCase().indexOf(word) >= 0
                ) {
                    hit[0] = word;
                    return false;
                }
            });
    
            // Other warnings we want to add.
            $.each(warningWords, function (index, word) {
                if (textContent.toLowerCase().indexOf(word) >= 0) {
                    hit[1] = word;
                    return false;
                }
            });
            
            // Flag link text containing URLs.
            $.each(urlText, function (index, word) {
                if (textContent.toLowerCase().indexOf(word) >= 0) {
                    hit[2] = word;
                    return false;
                }
            });
            return hit;
        };

        /* Mini function if you need to exclude any text contained with a span. We created this function to ignore automatically appended sr-only text for external links and document filetypes.

        $.fn.ignore = function(sel){
            return this.clone().find(sel||">*").remove().end();
        };

        $el.ignore("span.sr-only").text().trim();
            
        Example: <a href="#">learn more <span class="sr-only">(external)</span></a>
        
        This function will ignore the text "(external)", and correctly flag this link as an error for non descript link text. */

        $.fn.ignore = function(sel){
            return this.clone().find(sel||">*").remove().end();
        };

        let $links = this.root.find("a[href]").not(this.linkIgnore);
        
        const M = IM["linktext"];
        
        $links.each((i, el) => {
            let $el = $(el);
            let linkText = this.computeAriaLabel($el);

            var hasAriaLabelledBy = $el.attr("aria-labelledby");
            var hasAriaLabel = $el.attr("aria-label");
            var hasTitle = $el.attr("title");
            
            var error = containsLinkTextStopWords($el.ignore("noscript, " + sa11yLinkIgnoreSpan).text().trim());
            
            if (linkText === "noAria") {
                linkText = $el.text();
            }

            //Flag empty hyperlinks
            if (
                $el.attr("href") !== undefined &&
                $el.text().trim().length == 0
            ) {
                if ($el.find("img").length) {
                    // Do nothing
                }
                else if (hasAriaLabelledBy != null) {
                    $el.addClass("sa11y-good-border")
                    $el.before(
                        ButtonInserter(sa11yGood, M["linkLabel"](linkText), true)
                    );
                } 
                else if (hasAriaLabel != null) {
                    $el.addClass("sa11y-good-border")
                    $el.before(
                        ButtonInserter(sa11yGood, M["linkLabel"](linkText), true)
                    );
                } 
                else if (hasTitle != null) {
                    let linkText = $el.attr("title");
                    $el.addClass("sa11y-good-border")
                    $el.before(
                        ButtonInserter(sa11yGood, M["linkLabel"](linkText), true)
                    );
                }
                else if ($el.children().length == 0) {
                    this.errorCount++;
                    $el.addClass("sa11y-error-border");
                    $el.after(ButtonInserter(sa11yError, M["linkErrorMessage"], true));
                } 
                else {
                    this.errorCount++;
                    $el.addClass("sa11y-error-border");
                    $el.after(ButtonInserter(sa11yError, M["emptyLinkNoLabel"], true));
                }
            } 
            
            else if (error[0] != null) {
                if (hasAriaLabelledBy != null) {
                    $el.before(
                        ButtonInserter(sa11yGood, M["linkLabel"](linkText), true)
                    );
                } else if (hasAriaLabel != null) {
                    $el.before(
                        ButtonInserter(sa11yGood, M["linkLabel"](hasAriaLabel), true)
                    );
                } else if ($el.attr("aria-hidden") == "true" && $el.attr("tabindex") == "-1") {
                    //Do nothing.
                } else {
                    this.errorCount++;
                    $el.addClass("sa11y-error-text");
                    $el.after(ButtonInserter(sa11yError, M["stopWordMessage"](error[0]), true));
                }
            } 
            
            else if (error[1] != null) {
                this.warningCount++;
                $el.addClass("sa11y-warning-text");
                $el.after(ButtonInserter(sa11yWarning, M["linkBestPractices"](error[1]), true));
            }

            else if (error[2] != null) {
                if (linkText.length > 40) {
                this.warningCount++;
                $el.addClass("sa11y-warning-text");
                $el.after(ButtonInserter(sa11yWarning, M["linkStopWordMessage"], true));
                }  
            } 
        });
    };

    // ============================================================
    // Rulesets: Links (Advanced)
    // ============================================================
    checkLinksAdvanced = () => {

        const M = IM["linksAdvanced"];

        let $linksTargetBlank = this.root
            .find("a[href]")
            .not(this.linkIgnore)
            .not("#sa11y-container a")
            .not(".sa11y-exclude");

        var seen = {};
        $linksTargetBlank.each((i, el) => {
            let $el = $(el);
            let linkText = this.computeAriaLabel($el);

            if (linkText === "noAria") {
                linkText = $el.text();
            }

            const fileTypeMatch = $el.filter(`
                a[href$='.pdf'], 
                a[href$='.doc'], 
                a[href$='.zip'], 
                a[href$='.mp3'], 
                a[href$='.txt'], 
                a[href$='.exe'], 
                a[href$='.dmg'], 
                a[href$='.rtf'],
                a[href$='.pptx'],
                a[href$='.ppt'],
                a[href$='.xls'],
                a[href$='.xlsx'],
                a[href$='.csv'],
                a[href$='.mp4'],
                a[href$='.mov'],
                a[href$='.avi']
            `).length;

            //Links with identical accessible names have equivalent purpose.
            
            //If link has an image, process alt attribute,
            //To-do: Kinda hacky. Doesn't return accessible name of link in correct order.
            var alt = $el.find("img").attr("alt");
            if (alt === undefined) {
                alt = "";
            }
            
            //Return link text and image's alt text.
            var linkTextTrimmed = linkText.trim().toLowerCase() + " " + alt;
            var href = $el.attr("href");
            
            if (seen[linkTextTrimmed] && linkTextTrimmed.length !== 0) {
                if (seen[href]) {
                    //Nothing
                }
                else {
                    this.warningCount++;
                    $el.addClass("sa11y-warning-text");
                    $el.after(ButtonInserter(sa11yWarning, M["linkIdenticalName"](linkText), true));
                }
            } 
            else {
                seen[linkTextTrimmed] = true;
                seen[href] = true;
            }
            
            //New tab or new window.
            var containsNewWindowPhrases = newWindowPhrases.some(function(pass) {
                return linkText.toLowerCase().indexOf(pass) >= 0;
            });

            //Link that points to a file type indicates that it does.
            var containsFileTypePhrases = fileTypePhrases.some(function(pass) {
                return linkText.toLowerCase().indexOf(pass) >= 0;
            });

            if ($el.attr("target") === "_blank" && fileTypeMatch === 0 && !containsNewWindowPhrases) {
                this.warningCount++;
                $el.addClass("sa11y-warning-text");
                $el.after(ButtonInserter(sa11yWarning, M["newTabWarning"], true));
            }

            if (fileTypeMatch === 1 && !containsFileTypePhrases) {
                this.warningCount++;
                $el.addClass("sa11y-warning-text");
                $el.before(ButtonInserter(sa11yWarning, M["fileTypeWarning"], true));
            }
            
        });
    }

    // ============================================================
    // Ruleset: Alternative text
    // ============================================================
    checkAltText = () => {
        this.containsAltTextStopWords = function (alt) {
            let altUrl = [
                ".png", 
                ".jpg", 
                ".jpeg", 
                ".gif", 
                ".tiff",
                ".svg"
            ];

            let hit = [null, null, null];
            $.each(altUrl, function (index, word) {
                if (alt.toLowerCase().indexOf(word) >= 0) {
                    hit[0] = word;
                }
            });
            $.each(susWords, function (index, word) {
                if (alt.toLowerCase().indexOf(word) == 0) {
                    hit[1] = word;
                }
            });
            $.each(placeholderStopWords, function (index, word) {
                if (
                    alt.length === word.length &&
                    alt.toLowerCase().indexOf(word) >= 0
                ) {
                    hit[2] = word;
                }
            });

            return hit;
        };
        
        // Stores the corresponding issue text to alternative text
        const M = IM["images"];
        // Test each image for alternative text.
        this.$img.each((i, el) => {
            let $el = $(el);
            let alt = $el.attr("alt");

            if (alt == undefined) {
                this.errorCount++;

                // Image fails if it is used as a link and is missing an alt attribute.
                if ($el.parents().is("a[href]")) {

                    //Image contains both hyperlink
                    if ($el.parents("a").text().trim().length > 1) {
                        $el.addClass("sa11y-error-border");
                        $el.closest("a").before(
                            ButtonInserter(
                                sa11yError,
                                M["missingAltLinkButHasTextMessage"], false, true
                            )
                        );
                    } else if ($el.parents("a").text().trim().length == 0) {
                        $el.addClass("sa11y-error-border");
                        $el.closest("a").before(
                            ButtonInserter(sa11yError, M["missingAltLinkMessage"], false, true)
                        );
                    }
                }
                // General failure message if image is missing alt.
                else {
                    $el.addClass("sa11y-error-border");
                    $el.before(ButtonInserter(sa11yError, M["missingAltMessage"], false, true));
                }
            }

            // If alt attribute is present, further tests are done.
            else {
                let altText = this.sanitizeForHTML(alt); //Prevent tooltip from breaking.
                let error = this.containsAltTextStopWords(altText);
                let altLength = alt.length;

                // Image fails if a stop word was found.
                if (error[0] != null && $el.parents().is("a[href]")) {
                    this.errorCount++;
                    $el.addClass("sa11y-error-border");
                    $el.closest("a").before(
                        ButtonInserter(
                            sa11yError,
                            M["linkImageBadAltMessage"](altText, error[0]), false, true
                        )
                    );
                } else if (error[1] != null && $el.parents().is("a[href]")) {
                    this.warningCount++;
                    $el.addClass("sa11y-warning-border");
                    $el.closest("a").before(
                        ButtonInserter(
                            sa11yWarning,
                            M["linkImageSusAltMessage"](altText, error[1]), false, true
                        )
                    );
                } else if (error[2] != null && $el.parents().is("a[href]")) {
                    this.errorCount++;
                    $el.addClass("sa11y-error-border");
                    $el.closest("a").before(
                        ButtonInserter(
                            sa11yError,
                            M["linkImagePlaceholderAltMessage"](altText), false, true
                        )
                    );
                } else if (error[0] != null) {
                    this.errorCount++;
                    $el.addClass("sa11y-error-border");
                    $el.before(
                        ButtonInserter(
                            sa11yError,
                            M["altHasBadWordMessage"](altText, error[0]), false, true
                        )
                    );
                } else if (error[1] != null) {
                    this.warningCount++;
                    $el.addClass("sa11y-warning-border");
                    $el.before(
                        ButtonInserter(
                            sa11yWarning,
                            M["altHasSusWordMessage"](altText, error[1]), false, true
                        )
                    );
                } else if (error[2] != null) {
                    this.errorCount++;
                    $el.addClass("sa11y-error-border");
                    $el.before(
                        ButtonInserter(
                            sa11yError,
                            M["altPlaceholderMessage"](altText), false, true
                        )
                    );
                }

                else if ((alt == "" || alt == " ") && $el.parents().is("a[href]")) {
                    
                if ($el.parents("a").attr("tabindex") == "-1" && $el.parents("a").attr("aria-hidden") == "true") {
                    //Do nothing.
                }

                else if ($el.parents("a").attr("aria-hidden") == "true") {
                    this.errorCount++;
                    $el.addClass("sa11y-error-border");
                    $el.closest("a").before(
                        ButtonInserter(
                            sa11yError, M["hyperlinkedImageAriaHidden"], false, true
                        )
                    );
                }
                    
                else if ($el.parents("a").text().trim().length == 0) {
                        this.errorCount++;
                        $el.addClass("sa11y-error-border");
                        $el.closest("a").before(
                            ButtonInserter(
                                sa11yError,
                                M["imageLinkNullAltNoTextMessage"], false, true
                            )
                        );
                    } 
                    else {
                        $el.closest("a").before(
                            ButtonInserter(sa11yGood, M["linkHasAltMessage"], false, true)
                        );
                    }
                }

                //Decorative alt and not a link.
                else if ((alt == "" || alt == " ") && $el.parents().not("a[href]")) {
                    this.warningCount++;
                    $el.addClass("sa11y-warning-border");
                    $el.before(ButtonInserter(sa11yWarning, M["decorativeMessage"], false, true));
                }

                //Link and contains alt text.
                else if (alt.length > 250 && $el.parents().is("a")) {
                    this.warningCount++;
                    $el.addClass("sa11y-warning-border");
                    $el.closest("a").before(
                        ButtonInserter(
                            sa11yWarning,
                            M["hyperlinkAltLengthMessage"](altText, altLength), false, true
                        )
                    );
                }

                //Link and contains an alt text.
                else if (
                    alt != "" &&
                    $el.parents().is("a") &&
                    $el.parents("a").text().trim().length == 0
                ) {
                    this.warningCount++;
                    $el.addClass("sa11y-warning-border");
                    $el.closest("a").before(
                        ButtonInserter(
                            sa11yWarning,
                            M["imageLinkAltTextMessage"](altText), false, true
                        )
                    );
                }

                //Contains alt text & surrounding link text.
                else if (
                    alt != "" &&
                    $el.parents().is("a") &&
                    $el.parents("a").text().trim().length > 1
                ) {
                    this.warningCount++;
                    $el.addClass("sa11y-warning-border");
                    $el.closest("a").before(
                        ButtonInserter(
                            sa11yWarning,
                            M["anchorLinkAndAltMessage"](altText), false, true
                        )
                    );
                } else if (alt.length > 250) {
                    this.warningCount++;
                    $el.addClass("sa11y-warning-border");
                    $el.before(
                        ButtonInserter(
                            sa11yWarning,
                            M["altTooLongMessage"](altText, altLength), false, true
                        )
                    );
                } else if (alt != "") {
                    $el.before(ButtonInserter(sa11yGood, M["passAlt"](altText), false, true));
                }
            }
        });
    };

    // ============================================================
    // Rulesets: Labels
    // ============================================================
    checkLabels = () => {
        let $inputs = this.root
            .find("input, select, textarea")
            .not(this.containerIgnore)
            .not("input:hidden");
        $inputs.each((i, el) => {
            let $el = $(el);
            const M = IM["labels"];

            //If button type is submit or button: pass
            if ($el.attr("type") === "submit" || $el.attr("type") === "button") {
                //Do nothing
            } 

            //Implicit labels.
            else if ($el.parents().is("label")) {
                if ($el.parents("label").text().trim().length !== 0) {
                    //Do nothing if label has text.
                } else {
                    this.errorCount++;
                    $el.addClass("sa11y-error-border");
                    $el.after(ButtonInserter(sa11yError, M["missingLabelMessage"], true));
                }
            }
            
            //Recommendation to remove reset buttons.
            else if ($el.attr("type") === "reset") {
                this.warningCount++;
                $el.addClass("sa11y-warning-border");
                $el.after(ButtonInserter(sa11yWarning, M["inputResetMessage"], true));
            }

            //If input doesn't have ID or aria.
            else if (
                !$el.attr("id") &&
                !$el.attr("aria-label") &&
                !$el.attr("aria-labelledby")
            ) {
                this.errorCount++;
                $el.addClass("sa11y-error-border");
                $el.after(ButtonInserter(sa11yError, M["missingLabelMessage"], true));
            } 
            
            /* Could be a warning potentially. Removed for now.
            else if ($el.attr("aria-label")) {
                this.warningCount++;
                $el.addClass("sa11y-warning-border");
                $el.after(ButtonInserter(sa11yWarning, M["ariaLabelInputMessage"], true));
            } */
            
            else if ($el.prev().is("label")) {
                let label = $el.prev();
                
                if (label.attr("for") == $el.attr("id")) {
                    /* Optional: add pass border. */
                } 
                
                else {
                    this.errorCount++;
                    $el.addClass("sa11y-error-border");
                    $el.after(ButtonInserter(sa11yError, M["noForAttributeMessage"]($el.attr("id")),true));
                }
            }
        });
    };

    // ============================================================
    // Rulesets: QA
    // ============================================================
    checkQA = () => {
        // Stores the corresponding issue text
        const M = IM["QA"];

        const $videos = this.root
            .find(
                "video, iframe[src*='youtube.com'], iframe[src*='vimeo.com'], iframe[src*='yuja.com'], iframe[src*='panopto.com']"
            )
            .not(this.containerIgnore);
        $videos.each((i, el) => {
            let $el = $(el);
            this.warningCount++;
            $el.addClass("sa11y-warning-border");
            $el.first().before(ButtonInserter(sa11yWarning, M["video"]));
        });

        let $audio = this.root
            .find(
                "audio, iframe[src*='soundcloud.com'], iframe[src*='simplecast.com'], iframe[src*='podbean.com'], iframe[src*='buzzsprout.com'], iframe[src*='blubrry.com'], iframe[src*='transistor.fm'], iframe[src*='fusebox.fm'], iframe[src*='libsyn.com']"
            )
            .not(this.containerIgnore);
        $audio.each((i, el) => {
            let $el = $(el);
            this.warningCount++;
            $el.addClass("sa11y-warning-border");
            $el.first().before(ButtonInserter(sa11yWarning, M["audio"]));
        });

        let $dataviz = this.root
            .find(
                "iframe[src*='datastudio.google.com'], iframe[src*='tableau']"
            )
            .not(this.containerIgnore);
        $dataviz.each((i, el) => {
            let $el = $(el);
            this.warningCount++;
            $el.addClass("sa11y-warning-border");
            $el.first().before(ButtonInserter(sa11yWarning, M["dataViz"]));
        });

        let $twitterWarning = this.root
            .find("[id^=twitter-widget]")
            .not(this.containerIgnore);
        $twitterWarning.each((i, el) => {
            let $el = $(el);
            var numberofTweets = $el
                .contents()
                .find(".timeline-TweetList-tweet").length;
            if (numberofTweets > 3) {
                this.warningCount++;
                $el.addClass("sa11y-warning-text");
                $el.before(ButtonInserter(sa11yWarning, M["twitter"]));
            }
        });

        //Error: Find all links pointing to development environment. Customize as needed.
        let $badDevLinks = this.root
            .find("a[href^='https://www.dev.'], a[href*='wp-admin']")
            .not(this.linkIgnore);
        $badDevLinks.each((i, el) => {
            let $el = $(el);
            this.errorCount++;
            $el.addClass("sa11y-error-text");
            $el.after(ButtonInserter(sa11yError, M["badLink"](el), true));
        });

        //Warning: Find all PDFs. Although only append warning icon to first PDF on page.
        let checkPDF = this.root
            .find("a[href$='.pdf']")
            .not(this.containerIgnore);   
        let firstPDF = this.root
            .find("a[href$='.pdf']:first")
            .not(this.containerIgnore);
        let pdfCount = checkPDF.length;
        if (checkPDF.length > 0) {
            this.warningCount++;
            checkPDF.addClass("sa11y-warning-text");
            checkPDF.has("img").removeClass("sa11y-warning-text");
            firstPDF.after(ButtonInserter(sa11yWarning, M["pdf"](pdfCount), true));
        }

        //(Old) Warning: Detect uppercase. 
        this.root.find("h1, h2, h3, h4, h5, h6, p, li:not([class^='sa11y']), blockquote")
        .not(this.containerIgnore)
        .each(function () {
            let $this = $(this);
            var uppercasePattern = /(?!<a[^>]*?>)(\b[A-Z][',!:A-Z\s]{15,}|\b[A-Z]{15,}\b)(?![^<]*?<\/a>)/g;

            var html = $this.html(); 
            $this.html(html.replace(uppercasePattern, "<span class='sa11y-warning-uppercase'>$1</span>"));
        });
    
        $(".sa11y-warning-uppercase").after(ButtonInserter(sa11yWarning, M["uppercaseWarning"], true));

        if ($(".sa11y-warning-uppercase").length > 0) {
            this.warningCount++;
        }

        /* New: Warning: Detect uppercase.
        this.root.find('h1, h2, h3, h4, h5, h6, p, li:not([class^="sa11y"]), blockquote')
        .not(this.containerIgnore).each(function () {
            let $this = $(this);
            let uppercasePattern = /([A-Z]{2,}[ ])([A-Z]{2,}[ ])([A-Z]{2,}[ ])([A-Z]{2,})/g;
     
            let detectUpperCase = $this.text().match(uppercasePattern);
    
            if (detectUpperCase && detectUpperCase[0].length > 10) {
                this.warningCount++;
                $(this)
                .before(ButtonInserter(sa11yWarning, M["uppercaseWarning"], true));
            }
        }); */

        //Tables check.
        this.$table.each((i, el) => {
            let $el = $(el);
            let findTHeaders = $el.find("th");
            let findHeadingTags = $el.find("h1, h2, h3, h4, h5, h6");

            if (findTHeaders.length == 0) {
                this.errorCount++;
                $el.addClass("sa11y-error-border");
                $el.before(
                    ButtonInserter(sa11yError, M["tables"]["missingHeadings"])
                );
            }
            if (findHeadingTags.length > 0) {
                this.errorCount++;
                findHeadingTags.addClass("sa11y-error-heading");
                findHeadingTags.parent().addClass("sa11y-error-border");
                findHeadingTags.before(
                    ButtonInserter(sa11yError, M["tables"]["semanticHeading"])
                );
            }
            findTHeaders.each(function () {
                let $th = $(this);
                if ($th.text().trim().length == 0) {
                    this.errorCount++;
                    $th.addClass("sa11y-error-border");
                    $th.append(
                        ButtonInserter(sa11yError, M["tables"]["emptyHeading"])
                    );
                }
            });
        });

        //Error: Missing language tag. Lang should be at least 2 characters.
        const lang = $("html").attr("lang");
        if (lang == undefined || lang.length < 2) {
            this.errorCount++;
            $("#sa11y-container").after(
                BannerInserter(sa11yError, M["pageLanguageMessage"])
            );
        }

        //Excessive bolding or italics.
        let $strongitalics = this.root
            .find("strong, em")
            .not(this.containerIgnore);
        $strongitalics.each((i, el) => {
            let $el = $(el);
            if ($el.text().length > 400) {
                this.warningCount++;
                $el.before(ButtonInserter(sa11yWarning, M["badItalics"]));
            }
        });

        //Find blockquotes used as headers.
        let $blockquotes = this.root
            .find("blockquote")
            .not(this.containerIgnore);
        $blockquotes.each((i, el) => {
            let $el = $(el);
            let bqHeadingText = $el.text();
            if (bqHeadingText.trim().length < 25) {
                this.warningCount++;
                $el.addClass("sa11y-warning-border");
                $el.before(ButtonInserter(sa11yWarning, M["blockquoteMessage"](bqHeadingText)));
            }
        });

        // Warning: Detect fake headings.
        this.$p.each((i, el) => {
            let $el = $(el);
            let brAfter = $el.html().indexOf("</strong><br>");
            let brBefore = $el.html().indexOf("<br></strong>");

            //Check paragraphs greater than x characters.
            if ($el && $el.text().trim().length >= 300) {
                var firstChild = $el.contents()[0];

                //If paragraph starts with <strong> tag and ends with <br>.
                if ($(firstChild).is("strong") && (brBefore !== -1 || brAfter !== -1)) {
                    let boldtext = $el.find("strong").text();

                    if ($el && boldtext.length <= 120) {
                        $el.find("strong").addClass("sa11y-fake-heading sa11y-error-heading");
                        $el.before(
                            ButtonInserter(sa11yWarning, M["fakeHeading"](boldtext))
                        );
                    }
                }
            }

            // If paragraph only contains <p><strong>...</strong></p>.
            let $fakeHeading = $el.filter(function() {
                return /^<(strong)>.+<\/\1>$/.test($.trim($(this).html()));
            });

            //Although only flag if less than 120 characters (typical heading length).
            if ($fakeHeading.text().length <= 120) {
                let boldtext = $fakeHeading.text();
                $fakeHeading.addClass("sa11y-fake-heading sa11y-error-heading");
                $fakeHeading.find("strong").after(
                    ButtonInserter(sa11yWarning, M["fakeHeading"](boldtext), true)
                );
            }

        });
        if ($(".sa11y-fake-heading").length > 0) {
            this.warningCount++;
        }

        /* Thanks to John Jameson from PrincetonU for this ruleset! */
        // Detect paragraphs that should be lists: a. A. a) A) * - -- •.
        let activeMatch = "";
        let prefixDecrement = {
            b: "a",
            B: "A",
            2: "1",
        };
        let prefixMatch = /a\.|a\)|A\.|A\)|1\.|1\)|\*\s|-\s|--|•\s|→\s|✓\s|✔\s|✗\s|✖\s|✘\s|❯\s|›\s|»\s/;
        let decrement = function (el) {
            return el.replace(/^b|^B|^2/, function (match) {
                return prefixDecrement[match];
            });
        };
        this.$p.each(function (i, el) {
            let $first = $(el);
            let hit = false;
            // Grab first two characters.
            let firstPrefix = $first.text().substring(0, 2);
            if (
                firstPrefix.trim().length > 0 &&
                firstPrefix !== activeMatch &&
                firstPrefix.match(prefixMatch)
            ) {
                // We have a prefix and a possible hit
                // Split p by carriage return if present and compare.
                let hasBreak = $first.html().indexOf("<br>");
                if (hasBreak !== -1) {
                    let subParagraph = $first
                        .html()
                        .substring(hasBreak + 4)
                        .trim();
                    let subPrefix = subParagraph.substring(0, 2);
                    if (firstPrefix === decrement(subPrefix)) {
                        hit = true;
                    }
                }
                // Decrement the second p prefix and compare .
                if (!hit) {
                    let $second = $(el).next("p");
                    if ($second) {
                        let secondPrefix = decrement(
                            $first.next().text().substring(0, 2)
                        );
                        if (firstPrefix === secondPrefix) {
                            hit = true;
                        }
                    }
                }
                if (hit) {
                    this.warningCount++;
                    $first.before(
                        ButtonInserter(sa11yWarning, M["shouldBeList"](firstPrefix))
                    );
                    $first.addClass("sa11y-fake-list");
                    activeMatch = firstPrefix;
                } else {
                    activeMatch = "";
                }
            } else {
                activeMatch = "";
            }
        });
        if ($(".sa11y-fake-list").length > 0) {
            this.warningCount++;
        }

        //Example ruleset. Be creative.
        let $checkAnnouncement = this.root
            .find(".announcement-component")
            .not(this.containerIgnore).length;
        if ($checkAnnouncement > 1) {
            this.warningCount++;
            $(".announcement-component:gt(0)").addClass("sa11y-warning-border");
            $(".announcement-component:gt(0)").before(
                ButtonInserter(sa11yWarning, M["announcementWarning"])
            );
        }
    };

    // ============================================================
    // Rulesets: Contrast
    // Color contrast plugin by jasonday: https://github.com/jasonday/color-contrast
    // ============================================================
    checkContrast = () => {
        var contrastErrors = {
            errors: [],
            warnings: [],
        };
        var contrast = {
            // Parse rgb(r, g, b) and rgba(r, g, b, a) strings into an array.
            // Adapted from https://github.com/gka/chroma.js
            parseRgb: (css) => {
                var i, m, rgb, _i, _j;
                if (
                    (m = css.match(
                        /rgb\(\s*(\-?\d+),\s*(\-?\d+)\s*,\s*(\-?\d+)\s*\)/
                    ))
                ) {
                    rgb = m.slice(1, 4);
                    for (i = _i = 0; _i <= 2; i = ++_i) {
                        rgb[i] = +rgb[i];
                    }
                    rgb[3] = 1;
                } else if (
                    (m = css.match(
                        /rgba\(\s*(\-?\d+),\s*(\-?\d+)\s*,\s*(\-?\d+)\s*,\s*([01]|[01]?\.\d+)\)/
                    ))
                ) {
                    rgb = m.slice(1, 5);
                    for (i = _j = 0; _j <= 3; i = ++_j) {
                        rgb[i] = +rgb[i];
                    }
                }
                return rgb;
            },
            // Based on http://www.w3.org/TR/WCAG20/#relativeluminancedef
            relativeLuminance: function (c) {
                var lum = [];
                for (var i = 0; i < 3; i++) {
                    var v = c[i] / 255;
                    lum.push(
                        v < 0.03928
                            ? v / 12.92
                            : Math.pow((v + 0.055) / 1.055, 2.4)
                    );
                }
                return 0.2126 * lum[0] + 0.7152 * lum[1] + 0.0722 * lum[2];
            },
            // Based on http://www.w3.org/TR/WCAG20/#contrast-ratiodef
            contrastRatio: function (x, y) {
                var l1 = contrast.relativeLuminance(contrast.parseRgb(x));
                var l2 = contrast.relativeLuminance(contrast.parseRgb(y));
                return (Math.max(l1, l2) + 0.05) / (Math.min(l1, l2) + 0.05);
            },
            // Based on http://jsfiddle.net/Y4uDL/
            getBackground: function (el) {
                var bgColor = el.css("background-color");
                var bgImage = el.css("background-image");

                if (
                    bgColor !== "rgba(0, 0, 0, 0)" &&
                    bgColor !== "transparent" &&
                    bgImage === "none"
                ) {
                    return bgColor;
                } else if (bgImage !== "none") {
                    return "image";
                }

                if (el.is("html")) {
                    return "rgb(255, 255, 255)";
                } else {
                    return contrast.getBackground(el.parent());
                }
            },
            check: () => {
                this.$contrast.each(function () {
                    var $this = $(this);
                    var color = $this.css("color");
                    var background = contrast.getBackground($this);
                    var htmlTag = $this[0].tagName;
                    var textCheck = $this
                        .clone()
                        .children()
                        .remove()
                        .end()
                        .text();
                    var ratingString;
                    var fontSizeString;
                    var failed;

                    if (htmlTag === "SVG") {
                        var fill = $this.css("fill");
                        var ratio =
                            Math.round(
                                contrast.contrastRatio(fill, background) * 100
                            ) / 100;
                        var ratioText = ratio + ":1";
                        if (ratio < 3) {
                            failed = true;
                            fontSizeString = "svg fill";
                            ratingString = "fail";
                        }
                    } else if (
                        $.trim(textCheck).length ||
                        htmlTag === "INPUT" ||
                        htmlTag === "SELECT" ||
                        htmlTag === "TEXTAREA"
                    ) {
                        // Background image needs to be manually reviewed
                        if (background === "image") {
                            var ratioText = "unknown";
                            ratingString = "Needs manual review";
                            fontSizeString = "N/A";
                            failed = true;
                        } else {
                            var ratio =
                                    Math.round(
                                        contrast.contrastRatio(
                                            color,
                                            background
                                        ) * 100
                                    ) / 100,
                                ratioText = ratio + ":1",
                                fontSize = parseInt($this.css("fontSize")),
                                fontWeight = $this.css("fontWeight");

                            /* Unscientific condition of ignoring visually hidden screen reader text. If width and height of element is less than 1px and overflow is set to hidden, do not run contrast check on it...*/
                            if (
                                ($this.width() <= 1 || $this.height() <= 1) &&
                                $this.css("overflow") == "hidden"
                            ) {
                            } else if (
                                fontSize >= 18 ||
                                (fontSize >= 14 && fontWeight >= 700)
                            ) {
                                fontSizeString = "Large scale text";
                                if (ratio < 3) {
                                    ratingString = "fail";
                                    failed = true;
                                } else {
                                    ratingString = "pass";
                                    failed = false;
                                }
                            } else {
                                fontSizeString = "Normal scale body text";
                                if (ratio < 4.5) {
                                    ratingString = "fail";
                                    failed = true;
                                } else {
                                    ratingString = "pass";
                                    failed = false;
                                }
                            }
                        }
                    }

                    // highlight the element in the DOM and log the element, contrast ratio and failure for testing in console
                    if (failed) {
                        var error = {};
                        error = {
                            name: $this,
                            ratio: ratioText,
                            detail: fontSizeString,
                            status: ratingString,
                        };
                        if (ratingString === "fail") {
                            contrastErrors.errors.push(error);
                        } else if (ratingString === "Needs manual review") {
                            contrastErrors.warnings.push(error);
                        }
                    }
                });

                return contrastErrors;
            },
        };

        $.fn.ignore = function(sel){
            return this.clone().find(sel||">*").remove().end();
        };
        
        contrast.check();
        const { errorM, warningM } = IM["contrast"];
        $.each(contrastErrors.errors, (index, item) => {
            var name = item.name;
            var cdetail = item.detail;
            var cratio = item.ratio;
            // var nodename = name[0].nodeName;
            var nodetext = name.ignore("span.sa11y-heading-label").text();
            this.errorCount++;
            $(name).before(
                ButtonInserter(sa11yError, errorM(cdetail, cratio, nodetext))
            );
        });

        $.each(contrastErrors.warnings, (index, item) => {
            var name = item.name;
            var nodetext = name.ignore("span.sa11y-heading-label").text();
            this.warningCount++;
            $(name).before(
                ButtonInserter(sa11yWarning, warningM(nodetext))
            );
        });
    };

 // ============================================================
 // Rulesets: Readability
 // Adapted from Greg Kraus' readability script: https://accessibility.oit.ncsu.edu/it-accessibility-at-nc-state/developers/tools/readability-bookmarklet/
 // ============================================================
 checkReadability = () => {

    //Crude hack to add a period to the end of list items to make a complete sentence.
    this.$mainPandLi.each(function() {
        var endOfList = $(this), listText = endOfList.text();
        if (listText.charAt(listText.length-1) !== ".") {
            $("main li, [role='main'] li").append("<span class='sa11y-readability-period sa11y-visually-hidden'>.</span>");
        }
    });

    // Compute syllables: http://stackoverflow.com/questions/5686483/how-to-compute-number-of-syllables-in-a-word-in-javascript
    function number_of_syllables(wordCheck) {
        wordCheck = wordCheck.toLowerCase().replace('.','').replace('\n','');
        if (wordCheck.length <= 3) {
            return 1;
    }
       wordCheck = wordCheck.replace(/(?:[^laeiouy]es|ed|[^laeiouy]e)$/, '');
       wordCheck = wordCheck.replace(/^y/, '');
       var syllable_string = wordCheck.match(/[aeiouy]{1,2}/g);

        if (!!syllable_string) {
            var syllables = syllable_string.length;
        } else{
            syllables = 0;
        } return syllables;
        }

   let paragraphtext = this.$mainPandLi.not("blockquote").text();
   var words_raw = paragraphtext.replace(/[.!?-]+/g,' ').split(' ');
   var words = 0;
   for (var i = 0; i < words_raw.length; i++) {
       if(words_raw[i]!=0){
           words = words + 1;
       }
   }

   var sentences_raw = paragraphtext.split(/[.!?]+/);
   var sentences = 0;
   for (var i = 0; i < sentences_raw.length; i++) {
       if(sentences_raw[i]!=''){
           sentences = sentences + 1;
       }
   }

    var total_syllables = 0;
    var syllables1 = 0;
    var syllables2 = 0;
    for (var i = 0; i < words_raw.length; i++) {
        if(words_raw[i]!=0){
            var syllable_count = number_of_syllables(words_raw[i]);
            if(syllable_count==1){
                syllables1 = syllables1 + 1;
            }
            if(syllable_count==2){
                syllables2 = syllables2 + 1;
            }
            total_syllables = total_syllables + syllable_count;
        }
    }

    var characters = paragraphtext.replace(/[.!?|\s]+/g,'').length;

    
    //Reference: https://core.ac.uk/download/pdf/6552422.pdf
    //Reference: https://github.com/Yoast/YoastSEO.js/issues/267

    let flesch_reading_ease;
    if (sa11yReadabilityLang === "en") {
        flesch_reading_ease = 206.835 - (1.015 * words/sentences) - (84.6 * total_syllables/words);
    } 
    
    else if (sa11yReadabilityLang === "fr") {
        //French (Kandel & Moles)
        flesch_reading_ease = 207 - (1.015 * words/sentences) - (73.6 * total_syllables/words);
    } 

    else if (sa11yReadabilityLang === "es") {
        flesch_reading_ease = 206.84 - (1.02 * words/sentences) - (0.60 * (100 * total_syllables/words));
    }

    if (flesch_reading_ease > 100){
        flesch_reading_ease = 100;
    } else if (flesch_reading_ease < 0) {
       flesch_reading_ease = 0;
    }

   const M = IM["readability"];
   
        if ($("main, [role='main']").length === 0) {
            $("#sa11y-readability-info").html(M["missingMainContentMessage"]);
        } 

        else if (this.$mainPandLi.length === 0) {
            $("#sa11y-readability-info").html(M["noPorLiMessage"]);
        } 
        
        else if (words > 30) {
           var fleschScore = flesch_reading_ease.toFixed(1);
           var avgWordsPerSentence = (words/sentences).toFixed(1);
           var complexWords = Math.round(100*((words-(syllables1+syllables2))/words));
           
           //WCAG AAA pass if greater than 60
           if (fleschScore >= 0 && fleschScore < 30) {
            $("#sa11y-readability-info").html(
                `<span>${fleschScore}</span> <span class="sa11y-readability-score">${sa11yVeryDifficultReadability}</span>`);
           } 
           else if (fleschScore > 31 && fleschScore < 49) {
            $("#sa11y-readability-info").html(
                `<span>${fleschScore}</span> <span class="sa11y-readability-score">${sa11yDifficultReadability}</span>`);
           } 
           else if (fleschScore > 50 && fleschScore < 60) {
            $("#sa11y-readability-info").html(
                `<span>${fleschScore}</span> <span class="sa11y-readability-score">${sa11yFairlyDifficultReadability}</span>`);
           }   
           else {
            $("#sa11y-readability-info").html(
                `<span>${fleschScore}</span> <span class="sa11y-readability-score">${sa11yGoodReadability}</span>`);
           } 

            $("#sa11y-readability-details").html(`
                <li><span class='sa11y-bold'>${sa11yAvgWordPerSentence}</span> ` + avgWordsPerSentence + `</li>
                <li><span class='sa11y-bold'>${sa11yComplexWords}</span> ` + complexWords + `%</li>
                <li><span class='sa11y-bold'>${sa11yTotalWords}</span> ` + words + `</li>
            `);
        } 
        else {
            $("#sa11y-readability-info").text(M["notEnoughContentMessage"]);
        }
    }
}

//No IE support.
if (window.navigator.userAgent.match(/MSIE|Trident/) === null) {
    new Sa11y(); 
}