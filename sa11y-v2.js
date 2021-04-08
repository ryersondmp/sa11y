function ButtonInserter(type, content, inline = false) {
    ValidTypes = new Set([ERROR, WARNING, PASS]);
    ButtonLang = {
        [ERROR]: sa11yErrorLang,
        [WARNING]: sa11yWarningLang,
        [PASS]: sa11yPassLang,
    };
    CSSName = {
        [ERROR]: "error",
        [WARNING]: "warning",
        [PASS]: "pass",
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
            aria-label=${ButtonLang[type]} 
            class="sa11y-btn 
            sa11y-${CSSName[type]}-btn${inline ? "-text" : ""}" 
            data-tippy-content="<div lang='${sa11yLangCode}'>
                <div class='sa11y-header-text'>${ButtonLang[type]}
                </div>
                ${content} 
            </div>
        "> 
        </button>
        </div>
        `;
}
function ErrorBannerInsert(content) {
    // Check if content is a function
    if (content && {}.toString.call(content) === "[object Function]") {
        // if it is, call it and get the value.
        content = content();
    }
    return `<div class="sa11y-error-message-container">
        <div class="sa11y-error-message" lang="${sa11yLangCode}">
            ${content}
        </div>
    </div>`;
}

class Sa11y {
    constructor() {
        this.containerIgnore = sa11yContainerIgnore;
        this.outlineIgnore = sa11yOutlineIgnore;
        this.headerIgnore = sa11yHeaderIgnore;
        this.ignore = sa11yImageIgnore;
        this.linkIgnore = sa11yLinkIgnore;

        //Icon on the main toggle. Easy to replace.
        var MainToggleIcon =
            "<svg role='img' focusable='false' width='35px' height='35px' aria-hidden='true' xmlns='http://www.w3.org/2000/svg' viewBox='0 0 512 512'><path fill='#ffffff' d='M256 48c114.953 0 208 93.029 208 208 0 114.953-93.029 208-208 208-114.953 0-208-93.029-208-208 0-114.953 93.029-208 208-208m0-40C119.033 8 8 119.033 8 256s111.033 248 248 248 248-111.033 248-248S392.967 8 256 8zm0 56C149.961 64 64 149.961 64 256s85.961 192 192 192 192-85.961 192-192S362.039 64 256 64zm0 44c19.882 0 36 16.118 36 36s-16.118 36-36 36-36-16.118-36-36 16.118-36 36-36zm117.741 98.023c-28.712 6.779-55.511 12.748-82.14 15.807.851 101.023 12.306 123.052 25.037 155.621 3.617 9.26-.957 19.698-10.217 23.315-9.261 3.617-19.699-.957-23.316-10.217-8.705-22.308-17.086-40.636-22.261-78.549h-9.686c-5.167 37.851-13.534 56.208-22.262 78.549-3.615 9.255-14.05 13.836-23.315 10.217-9.26-3.617-13.834-14.056-10.217-23.315 12.713-32.541 24.185-54.541 25.037-155.621-26.629-3.058-53.428-9.027-82.141-15.807-8.6-2.031-13.926-10.648-11.895-19.249s10.647-13.926 19.249-11.895c96.686 22.829 124.283 22.783 220.775 0 8.599-2.03 17.218 3.294 19.249 11.895 2.029 8.601-3.297 17.219-11.897 19.249z'/></svg>";

        // TODO: Simplify this
        var sa11ycontainer = document.createElement("div");
        sa11ycontainer.setAttribute("id", "sa11y-container");
        sa11ycontainer.setAttribute("role", "region");
        sa11ycontainer.setAttribute("lang", sa11yLangCode);
        sa11ycontainer.setAttribute("aria-label", sa11yContainerLang);
        let loadContrastPreference =
            localStorage.getItem("sa11y-contrastCheck") === "On";
        let loadReadabilityPreference =
            localStorage.getItem("sa11y-readabilityCheck") === "On";
        sa11ycontainer.innerHTML =

            '<button type="button" aria-expanded="false" id="sa11y-toggle" aria-describedby="sa11y-notification-badge">' + MainToggleIcon + '<span class="sa11y-visually-hidden">' + sa11yMainToggleLang + '</span><div id="sa11y-notification-badge" style="display: none;"><span id="sa11y-notification-count"></span></div></button>' +

            //Start of main container.
            '<div id="sa11y-panel">' +
            //Page Outline tab.
            '<div id="sa11y-outline-panel">' +
            '<div id="sa11y-outline-header" class="sa11y-header-text"><span tabindex="-1">Page outline</span></div>' +
            '<div id="sa11y-outline-content">' +
            '<ul id="sa11y-outline-list"></ul>' +
            "</div>" +
            '<div id="sa11y-readability-panel"></div>' +
            "</div>" +
            //Settings tab.
            '<div id="sa11y-settings-panel">' +
            '<div id="sa11y-settings-header" class="sa11y-header-text"><span tabindex="-1">Settings</span></div>' +
            '<div id="sa11y-settings-content">' +
            `<ul id="sa11y-settings-options">  
                <li>
                    <label id="check-contrast" for="sa11y-contrastCheck-toggle">Check contrast</label>
                    <button id="sa11y-contrastCheck-toggle" 
                    aria-labelledby="check-contrast" 
                    class="sa11y-settings-switch" 
                    aria-pressed="${
                        loadContrastPreference ? "true" : "false"
                    }">${loadContrastPreference ? "On" : "Off"}</button>
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
                    }">${loadReadabilityPreference ? "On" : "Off"}</button>
                </li>
            </ul>` +
            "</div>" +
            "</div>" +
            //Main panel that conveys state of page.
            '<div id="sa11y-panel-content"><div class="sa11y-panel-icon"></div><div id="sa11y-panel-text"><span id="sa11y-status"></span></div></div>' +
            //Show Outline & Show Settings button.
            '<div id="sa11y-panel-controls"><button type="button" aria-expanded="false" id="sa11y-outline-toggle">Show Outline</button><button type="button" aria-expanded="false" id="sa11y-settings-toggle">Show Settings</button><div aria-hidden="true">&nbsp;&nbsp;</div></div>' +
            //End of main container.
            "</div>";

        $("body").prepend(sa11ycontainer);

        // JQuery
        $(() => {
            //To-do: Figure out what to do with this guy.
            this.loadGlobals();

            //Keeps checker active when navigating between pages until it is toggled off.
            var sa11yToggle = $("#sa11y-toggle");
            sa11yToggle.click(() => {
                if (localStorage.getItem("sa11y-panel") === "opened") {
                    localStorage.setItem("sa11y-panel", "closed");
                    sa11yToggle
                        .removeClass("sa11y-on")
                        .attr("aria-expanded", "false");
                    this.reset();
                } else {
                    localStorage.setItem("sa11y-panel", "opened");
                    sa11yToggle
                        .addClass("sa11y-on")
                        .attr("aria-expanded", "true");
                    this.checkAll();
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
                setTimeout(this.checkAll, 500);
            }

            $(document).ready(() => {
                // Updates badge counter
                this.checkAll();
                this.reset();
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
                    this.reset();
                } else {
                    this.onkeyup = null;
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
            $sa11yContrastCheck.click(async () => {
                if (localStorage.getItem("sa11y-contrastCheck") === "On") {
                    localStorage.setItem("sa11y-contrastCheck", "off");
                    $sa11yContrastCheck.text("Off");
                    $sa11yContrastCheck.attr("aria-pressed", "false");
                    this.reset(false);
                    await this.checkAll();
                } else {
                    localStorage.setItem("sa11y-contrastCheck", "On");
                    $sa11yContrastCheck.text("On");
                    $sa11yContrastCheck.attr("aria-pressed", "true");
                    this.reset(false);
                    await this.checkAll();
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
    checkAll = async (refreshPanel = true) => {
        this.errorCount = 0;
        this.warningCount = 0;
        this.root = $(sa11yCheckRoot);
        this.findElements();
        this.checkHeaders();
        this.checkLinkText();
        if (localStorage.getItem("sa11y-contrastCheck") === "On") {
            this.checkContrast();
        }
        this.checkLabels();
        this.checkAltText();
        if (localStorage.getItem("sa11y-readabilityCheck") === "On") {
            this.checkReadability();
        }
        this.checkQA();

        if (this.panelActive) {
            this.reset();
        } else {
            this.displayPanel();
        }

        let totalCount = this.errorCount + this.warningCount;
        if (totalCount === 0) {
            $("#sa11y-notification-badge").hide();
        } else if (this.warningCount > 0 && this.errorCount === 0) {
            $('#sa11y-notification-badge').show();
            $('#sa11y-notification-badge').addClass("sa11y-notification-badge-warning");
            $('#sa11y-notification-count').html(this.warningCount);
            $('#sa11y-notification-count').attr("aria-label", this.warningCount + " warnings detected.")
        } else {
            $('#sa11y-notification-badge').show();
            $('#sa11y-notification-count').html(totalCount);
            $('#sa11y-notification-count').attr("aria-label", totalCount + " errors detected.")
        }

        //Initialize tippy.js
        tippy(".sa11y-btn", {
            interactive: true,
            trigger: "mouseenter click",
            arrow: true,
            theme: "sa11y-theme",
            allowHTML: true,
            appendTo: document.body,
        });
    };

    // ============================================================
    // loadGlobals
    // Stores the list of elements to ignore based on configuration
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
                "[aria-hidden]" + separator + containerSelectors.join();
        } else {
            sa11yContainerIgnore = "[aria-hidden]";
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
            "[aria-hidden]";
        if (sa11yHeaderIgnore.length > 0) {
            this.headerIgnore += separator + sa11yContainerIgnore;
        } else {
            this.headerIgnore = sa11yContainerIgnore;
        }
    };

    // ============================================================
    // findElements
    // Finds all elements and caches them
    // ============================================================
    findElements = () => {
        let { root, containerIgnore, imageIgnore } = this;
        console.log(root);
        this.$p = root.find("p").not(containerIgnore);
        this.$h = root
            .find("h1, h2, h3, h4, h5, h6, [role='heading'][aria-level]")
            .not(":hidden")
            .not(containerIgnore);
        this.$mainPandLi = root
            .find("main p, main li, [role='main'] p, [role='main'] li")
            .not(containerIgnore);
        this.$img = root.find("img").not(imageIgnore);
        this.$iframe = root.find("iframe").not(containerIgnore);
        this.$table = root.find("table").not(containerIgnore);
        this.$contrast = root
            .find("*:visible")
            .not(".sa11y-exclude *")
            .not("#sa11y-container *")
            .not(containerIgnore);
    };

    // ============================================================
    // Headers
    // ============================================================
    checkHeaders = async () => {
        let prevLevel;
        this.$h.each((i, el) => {
            let $el = $(el);
            let level;

            if ($el.attr("aria-level")) {
                level = +$el.attr("aria-level");
            } else {
                level = +$el[0].tagName.slice(1);
            }

            let headingLength = $el.text().trim().length;
            let error = null;

            if (level - prevLevel > 1 && i !== 0) {
                error = IM["h"]["nonconsecLevel"](prevLevel, level);
            } else if ($el.text().trim().length < 1) {
                error = IM["h"]["emptyHeading"](level);
                $el.addClass("sa11y-error-text");
            } else if ($el.text().trim().length > 170) {
                error = IM["h"]["headingTooLong"](headingLength);
            } else if (i === 0 && level !== 1 && level !== 2) {
                error = IM["h"]["firstHeading"];
            }

            prevLevel = level;

            let li = `<li class='sa11y-outline-${level}'>
                <span class='sa11y-badge'>${level}</span> 
                <span class='sa11y-outline-list-item'>${$el.text()}</span>
            </li>`;

            let liError = `<li class='sa11y-outline-${level}'>
                <span class='sa11y-badge sa11y-error-badge'>
                <span aria-hidden='true'>&#10007;</span>
                <span class='sa11y-visually-hidden'>${sa11yErrorLang}</span> ${level}</span> 
                <span class='sa11y-outline-list-item sa11y-red-text sa11y-bold'>${$el.text()}</span>
            </li>`;

            if ($el.not(sa11yOutlineIgnore).length !== 0) {
                $el.not(sa11yOutlineIgnore).append(
                    `<span class='sa11y-heading-label'>H${level}</span>`
                );
                if (error != null && $el.closest("a").length > 0) {
                    this.errorCount++;
                    $el.addClass("sa11y-error-heading");
                    $el.closest("a").after(ButtonInserter(ERROR, error, true));
                    $("#sa11y-outline-list").append(liError);
                } else if (error != null) {
                    this.errorCount++;
                    $el.addClass("sa11y-error-heading");
                    $el.before(ButtonInserter(ERROR, error, true));
                    $("#sa11y-outline-list").append(liError);
                } else if (error == null) {
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

            //To-do: Make this a little prettier
            $("#sa11y-outline-header").after(
                `<div class='sa11y-instance sa11y-missing-h1'>
                    <span class='sa11y-badge sa11y-error-badge'><span aria-hidden='true'>&#10007;</span><span class='sa11y-visually-hidden'>${sa11yErrorLang}</span></span> 
                    <span class='sa11y-red-text sa11y-bold'>Missing Heading 1!</span>
                </div>`
            );

            let issueText = IM["h"]["missingHeadingOne"];
            $("#sa11y-container").after(ErrorBannerInsert(issueText));
        }
    };

    // ============================================================
    // LinkText
    // ============================================================
    checkLinkText = function () {
        /* Mini function if you need to exclude any text contained with a span. We created this function to ignore automatically appended sr-only text for external links and document filetypes.

    $.fn.ignore = function(sel){
    return this.clone().find(sel||">*").remove().end();
    };


    Example: If you need to ignore any text within <span class="sr-only">test</span>.
    $el.ignore("span.sr-only").text().trim(); */

        let containsLongUrl = function (textContent) {
            let urlText = ["http", ".asp", ".htm", ".php", ".edu/", ".com/"];

            var hit = null;
            $.each(urlText, function (index, word) {
                if (textContent.toLowerCase().indexOf(word) >= 0) {
                    hit = word;
                    return false;
                }
            });
            return hit;
        };

        /* Checks if text is not descriptive and returns the word(s) that are making the text inaccessible. stopWords will always flag an issue if contained in a hyperlink. partialStopWords will only be flagged as an issue if it's the only hyperlink text. */
        let containsLinkTextStopWords = function (textContent) {
            let stopWords = ["click here", "< ", " >"];

            let partialStopWords = [
                "click",
                "click here to learn more",
                "check out",
                "download",
                "download here",
                "find out",
                "find out more",
                "form",
                "here",
                "info",
                "information",
                "link",
                "learn",
                "learn more",
                "learn to",
                "more",
                "page",
                "paper",
                "read more",
                "read",
                "read this",
                "this",
                "this page",
                "this website",
                "view",
                "view our",
                "website",
                ".",
                ",",
                ":",
            ];

            var hit = null;

            // First check for show stoppers.
            $.each(stopWords, function (index, word) {
                if (textContent.toLowerCase().indexOf(word) >= 0) {
                    hit = word;
                    return false;
                }
            });

            // If no partial words were found, then check for total words.
            if (hit == null) {
                $.each(partialStopWords, function (index, word) {
                    if (
                        textContent.length === word.length &&
                        textContent.toLowerCase().indexOf(word) >= 0
                    ) {
                        hit = word;
                        return false;
                    }
                });
            }
            return hit;
        };
        let $links = this.root.find("a[href]").not(this.linkIgnore);
        // Stores the text for each issue
        const M = IM["linktext"];
        $links.each((i, el) => {
            let $el = $(el);
            var linkText = $el.text();
            var hasAriaLabelledBy = $el.attr("aria-labelledby");
            var hasAriaLabel = $el.attr("aria-label");
            var hasAriaHidden = $el.attr("aria-hidden");
            var hasTabIndex = $el.attr("tabindex");
            var error = containsLinkTextStopWords($el.text().trim());
            var errorURL = containsLongUrl($el.text().trim());

            if (
                $el.children().length == 0 &&
                $el.attr("href") !== undefined &&
                $el.text().length == 0 &&
                $el.is(":visible")
            ) {
                this.errorCount++;
                $el.addClass("sa11y-error-text");
                $el.after(ButtonInserter(ERROR, M["linkErrorMessage"], true));
            } else if (error != null) {
                if (hasAriaLabelledBy != null) {
                    var acclinkname = document.getElementById(hasAriaLabelledBy)
                        .textContent;
                    $el.after(
                        ButtonInserter(
                            PASS,
                            M["linkHasAriaLabelledbyMessage"](
                                linkText,
                                acclinkname
                            ),
                            true
                        )
                    );
                } else if (hasAriaLabel != null) {
                    $el.after(
                        ButtonInserter(
                            PASS,
                            M["linkHasAriaLabelMessage"](hasAriaLabel),
                            true
                        )
                    );
                } else if (hasAriaHidden == "true" && hasTabIndex == "-1") {
                    //do nothing.
                } else {
                    this.errorCount++;
                    $el.addClass("sa11y-error-text");
                    $el.after(
                        ButtonInserter(ERROR, M["stopWordMessage"](error), true)
                    );
                }
            } else if (errorURL != null && linkText.length > 40) {
                this.warningCount++;
                $el.addClass("sa11y-warning-text");
                $el.after(
                    ButtonInserter(WARNING, M["linkStopWordMessage"], true)
                );
            }
        });
    };

    // ============================================================
    // Alternative text
    // ============================================================
    checkAltText = () => {
        this.containsAltTextStopWords = function (alt) {
            let altUrl = [".png", ".jpg", ".jpeg", ".gif", ".tiff"];
            let susWords = [
                "image of",
                "graphic of",
                "picture of",
                "placeholder",
                "photo of",
            ];
            let hit = [null, null];
            $.each(altUrl, function (index, word) {
                if (alt.toLowerCase().indexOf(word) >= 0) {
                    hit[0] = word;
                }
            });
            $.each(susWords, function (index, word) {
                if (alt.toLowerCase().indexOf(word) >= 0) {
                    hit[1] = word;
                }
            });
            return hit;
        };
        let sanitizeForHTML = (string) => {
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
        // Stores the corresponding issue text to alternative text
        const M = IM["at"];
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
                                ERROR,
                                M["missingAltLinkButHasTextMessage"]
                            )
                        );
                    } else if ($el.parents("a").text().trim().length == 0) {
                        $el.addClass("sa11y-error-border");
                        $el.closest("a").before(
                            ButtonInserter(ERROR, M["missingAltLinkMessage"])
                        );
                    }
                }
                // General failure message if image is missing alt.
                else {
                    $el.addClass("sa11y-error-border");
                    $el.before(ButtonInserter(ERROR, M["missingAltMessage"]));
                }
            }

            // If alt attribute is present, further tests are done.
            else {
                let altText = sanitizeForHTML(alt); //Prevent tooltip from breaking.
                let error = this.containsAltTextStopWords(altText);
                let altLength = alt.length;

                // Image fails if a stop word was found.
                if (error[0] != null && $el.parents().is("a[href]")) {
                    this.errorCount++;
                    $el.addClass("sa11y-error-border");
                    $el.closest("a").before(
                        ButtonInserter(
                            ERROR,
                            M["linkImageBadAltMessage"](altText, error[0])
                        )
                    );
                } else if (error[1] != null && $el.parents().is("a[href]")) {
                    this.warningCount++;
                    $el.addClass("sa11y-warning-border");
                    $el.closest("a").before(
                        ButtonInserter(
                            WARNING,
                            M["linkImageSusAltMessage"](altText, error[1])
                        )
                    );
                } else if (error[0] != null) {
                    this.errorCount++;
                    $el.addClass("sa11y-error-border");
                    $el.before(
                        ButtonInserter(
                            ERROR,
                            M["altHasBadWordMessage"](altText, error[0])
                        )
                    );
                } else if (error[1] != null) {
                    this.warningCount++;
                    $el.addClass("sa11y-warning-border");
                    $el.before(
                        ButtonInserter(
                            WARNING,
                            M["altHasSusWordMessage"](altText, error[1])
                        )
                    );
                } else if (alt == "" && $el.parents().is("a[href]")) {
                    if ($el.parents("a").text().trim().length == 0) {
                        this.errorCount++;
                        $el.addClass("sa11y-error-border");
                        $el.closest("a").before(
                            ButtonInserter(
                                ERROR,
                                M["imageLinkNullAltNoTextMessage"]
                            )
                        );
                    } else {
                        $el.closest("a").before(
                            ButtonInserter(PASS, M["linkHasAltMessage"])
                        );
                    }
                }

                //Decorative alt and not a link.
                else if (alt == "" && $el.parents().not("a[href]")) {
                    $el.before(ButtonInserter(PASS, M["decorativeMessage"]));
                }

                //Link and contains alt text.
                else if (alt.length > 160 && $el.parents().is("a")) {
                    this.errorCount++;
                    $el.addClass("sa11y-error-border");
                    $el.closest("a").before(
                        ButtonInserter(
                            ERROR,
                            M["hyperlinkAltLengthMessage"](altText, altLength)
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
                            WARNING,
                            M["imageLinkAltTextMessage"](altText)
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
                            WARNING,
                            M["anchorLinkAndAltMessage"](altText)
                        )
                    );
                } else if (alt.length > 160) {
                    this.warningCount++;
                    $el.addClass("sa11y-warning-border");
                    $el.before(
                        ButtonInserter(
                            WARNING,
                            M["altTooLongMessage"](altText, altLength)
                        )
                    );
                } else if (alt != "") {
                    $el.before(ButtonInserter(PASS, M["passAlt"](altText)));
                }
            }
        });
    };

    // ============================================================
    // Labels
    // ============================================================
    checkLabels = () => {
        let $inputs = this.root
            .find("input")
            .not(this.containerIgnore)
            .not("input:hidden");
        $inputs.each((i, el) => {
            let $el = $(el);
            const M = IM["labels"];

            if (
                !$el.attr("id") &&
                !$el.attr("aria-label") &&
                !$el.attr("aria-labelledby")
            ) {
                this.errorCount++;
                $el.addClass("sa11y-error-border");
                $el.after(
                    ButtonInserter(ERROR, M["missingLabelMessage"], true)
                );
            } else if ($el.attr("aria-label")) {
                this.warningCount++;
                $el.addClass("sa11y-warning-border");
                $el.after(
                    ButtonInserter(WARNING, M["ariaLabelInputMessage"], true)
                );
            } else if ($el.prev().is("label")) {
                let label = $el.prev();
                if (label.attr("for") == $el.attr("id")) {
                    /* Optional: add pass border. */
                } else {
                    this.errorCount++;
                    $el.addClass("sa11y-error-border");
                    $el.after(
                        ButtonInserter(
                            ERROR,
                            M["noForAttributeMessage"]($el.attr("id")),
                            true
                        )
                    );
                }
            }
Seperation
        });
    };
    // ============================================================
    // QA
    // ============================================================
    checkQA = () => {
        // Stores the corresponding issue text
        const M = IM["QA"];

        var $videos = this.root
            .find(
                "video, iframe[src*='youtube.com'], iframe[src*='vimeo.com'], iframe[src*='yuja.com'], iframe[src*='panopto.com']"
            )
            .not(this.containerIgnore);

        $videos.each((i, el) => {
            let $el = $(el);
            this.warningCount++;
            // Fix: Is this supposed to be $videos.addClass or $el.addClass?
            $videos.addClass("sa11y-warning-border");
            $videos.first().before(ButtonInserter(WARNING, M["video"]));
        });

        let $audio = this.root
            .find(
                "audio, iframe[src*='soundcloud.com'], iframe[src*='simplecast.com'], iframe[src*='podbean.com'], iframe[src*='buzzsprout.com'], iframe[src*='blubrry.com'], iframe[src*='transistor.fm'], iframe[src*='fusebox.fm'], iframe[src*='libsyn.com']"
            )
            .not(this.containerIgnore);
        $audio.each((i, el) => {
            let $el = $(el);
            this.warningCount++;
            // Fix: Is this supposed to be $audio.addClass or $el.addClass?
            $audio.addClass("sa11y-warning-border");
            $audio.first().before(ButtonInserter(WARNING, M["audio"]));
        });

        let $dataviz = this.root
            .find(
                "iframe[src*='datastudio.google.com'], iframe[src*='tableau']"
            )
            .not(this.containerIgnore);
        $dataviz.each((i, el) => {
            let $el = $(el);
            this.warningCount++;
            // Fix: Is this supposed to be $dataviz.addClass or $el.addClass?
            $dataviz.addClass("sa11y-warning-border");
            $dataviz.first().before(ButtonInserter(WARNING, M["dataViz"]));
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
                $el.before(ButtonInserter(WARNING, M["twitter"]));
            }
        });

        // Warn users of TARGET BLANK within main content.
        let $linksTargetBlank = this.root
            .find("a[target='_blank']")
            .not(this.linkIgnore)
            .not("a[href$='.pdf']")
            .not("a[href$='.docx']")
            .not("#sa11y-container a")
            .not(".sa11y-exclude");

        //To-do: Adam to improve verbiage. Make clear that this is AAA.
        $linksTargetBlank.each((i, el) => {
            let $el = $(el);

            var passWordsNewWindow = ["new tab", "new window"];
            var containsPassWordsNewWindow = passWordsNewWindow.some(function (
                pass
            ) {
                return $el.text().toLowerCase().indexOf(pass) >= 0;
            });

            if ($el && !containsPassWordsNewWindow) {
                this.warningCount++;
                $el.addClass("sa11y-warning-text");
                $el.first().after(ButtonInserter(WARNING, M["newTab"], true));
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
            $el.after(ButtonInserter(ERROR, M["badLink"](el), true));
        });

        //Warning: Find all PDFs. Although only append warning icon to first PDF on page.
        let checkPDF = this.root
            .find("a[href$='.pdf']")
            .not(this.containerIgnore);
        let firstPDF = this.root
            .find("a[href$='.pdf']:first")
            .not(this.containerIgnore);
        if (checkPDF.length > 0) {
            this.warningCount++;
            checkPDF.addClass("sa11y-warning-text");
            checkPDF.has("img").removeClass("sa11y-warning-text");
            firstPDF.after(ButtonInserter(WARNING, M["pdf"], true));
        }

        //Find blockquotes used as headers.
        let $blockquotes = this.root
            .find("blockquote")
            .not(this.containerIgnore);
        $blockquotes.each((i, el) => {
            let $el = $(el);
            if ($el.text().trim().length < 25) {
                this.errorCount++;
                $el.addClass("sa11y-error-border");
                $el.before(ButtonInserter(ERROR, M["blockquoteMessage"]));
            }
        });

        //Warning: Detect uppercase.
        let $queryUppercase = this.root
            .find(
                'h1, h2, h3, h4, h5, h6, p, li:not([class^="sa11y"]), blockquote'
            )
            .not(this.containerIgnore);

        $queryUppercase.each(function () {
            let $this = $(this);

            var uppercasePattern = /(?!<a[^>]*?>)(\b[A-Z]['!:A-Z\s]{15,}|\b[A-Z]{15,}\b)(?![^<]*?<\/a>)/g;
            var replaceUppercase =
                '<span class="sa11y-warning-uppercase">$1</span>' +
                ButtonInserter(WARNING, M["uppercaseWarning"], true);

            $this.each(function () {
                $(this).html(
                    $(this).html().replace(uppercasePattern, replaceUppercase)
                );
            });
        });
        if ($(".sa11y-warning-uppercase").length > 0) {
            this.warningCount++;
        }

        //Tables check.
        this.$table.each((i, el) => {
            let $el = $(el);
            let findTHeaders = $el.find("th");
            let findHeadingTags = $el.find("h1, h2, h3, h4, h5, h6");

            if (findTHeaders.length == 0) {
                this.errorCount++;
                $el.addClass("sa11y-error-border");
                $el.before(
                    ButtonInserter(ERROR, M["table"]["missingHeadings"])
                );
            }
            if (findHeadingTags.length > 0) {
                findHeadingTags.addClass("sa11y-error-heading");
                findHeadingTags.parent().addClass("sa11y-error-border");
                findHeadingTags.before(
                    ButtonInserter(ERROR, M["table"]["semanticHeading"])
                );
            }
            findTHeaders.each(function () {
                let $th = $(this);
                if ($th.text().trim().length < 1) {
                    this.errorCount++;
                    findTHeaders.addClass("sa11y-error-border");
                    findTHeaders.append(
                        ButtonInserter(ERROR, M["table"]["emptyHeading"])
                    );
                }
            });
        });

        //Error: Missing language tag. Lang should be at least 2 characters.
        var lang = $("html").attr("lang");
        if (lang == undefined || lang.length < 2) {
            this.errorCount++;
            $("#sa11y-container").after(
                ErrorBannerInsert(M["pageLanguageMessage"])
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
                $el.before(ButtonInserter(WARNING, M["badItalics"]));
            }
        });

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
                } else if (hit) {
                    this.warningCount++;
                    $first.before(
                        ButtonInserter(WARNING, M["shouldBeList"](firstPrefix))
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
                ButtonInserter(WARNING, M["announcementWarning"])
            );
        }
    };
    // ============================================================
    // Contrast
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

        contrast.check();
        const { errorM, warningM } = IM["contrast"];
        $.each(contrastErrors.errors, (index, item) => {
            var name = item.name;
            var cdetail = item.detail;
            var cratio = item.ratio;
            // var nodename = name[0].nodeName;
            var nodetext = name[0].textContent;
            this.errorCount++;
            $(name).before(
                ButtonInserter(ERROR, errorM(cdetail, cratio, nodetext), true)
            );
        });

        $.each(contrastErrors.warnings, (index, item) => {
            var name = item.name;
            var nodetext = name[0].textContent;
            this.warningCount++;
            $(name)
                .addClass("sa11y-warning-border")
                .before(ButtonInserter(WARNING, warningM(nodetext), true));
        });
    };

    // ============================================================
    // Readability
    // ============================================================
    checkReadability = () => {
        //Crude hack to add a period to the end of list items to make a complete sentence.
        $('main li, [role="main"] li').each(function () {
            var endOfList = $(this),
                listText = endOfList.text();
            if (listText.charAt(listText.length - 1) !== ".") {
                $('main li, [role="main"] li').append(
                    '<span class="sa11y-readability-period sa11y-visually-hidden">.</span>'
                );
            }
        });

        function number_of_syllables(wordCheck) {
            wordCheck = wordCheck
                .toLowerCase()
                .replace(".", "")
                .replace("\n", "");
            if (wordCheck.length <= 3) {
                return 1;
            }
            wordCheck = wordCheck.replace(
                /(?:[^laeiouy]es|ed|[^laeiouy]e)$/,
                ""
            );
            wordCheck = wordCheck.replace(/^y/, "");
            var syllable_string = wordCheck.match(/[aeiouy]{1,2}/g);

            if (!!syllable_string) {
                var syllables = syllable_string.length;
            } else {
                syllables = 0;
            }
            return syllables;
        }

        let paragraphtext = this.$mainPandLi.not("blockquote").text();

        var words_raw = paragraphtext.replace(/[.!?-]+/g, " ").split(" ");
        var words = 0;
        for (var i = 0; i < words_raw.length; i++) {
            if (words_raw[i] != 0) {
                words = words + 1;
            }
        }

        var sentences_raw = paragraphtext.split(/[.!?]+/);
        var sentences = 0;
        for (var i = 0; i < sentences_raw.length; i++) {
            if (sentences_raw[i] != "") {
                sentences = sentences + 1;
            }
        }

        var total_syllables = 0;
        var syllables1 = 0;
        var syllables2 = 0;
        for (var i = 0; i < words_raw.length; i++) {
            if (words_raw[i] != 0) {
                var syllable_count = number_of_syllables(words_raw[i]);
                if (syllable_count == 1) {
                    syllables1 = syllables1 + 1;
                }
                if (syllable_count == 2) {
                    syllables2 = syllables2 + 1;
                }
                total_syllables = total_syllables + syllable_count;
            }
        }

        var characters = paragraphtext.replace(/[.!?|\s]+/g, "").length;
        var pollysyllables = words - (syllables1 + syllables2);
        var flesch_reading_ease =
            206.835 -
            (1.015 * words) / sentences -
            (84.6 * total_syllables) / words;

        if (flesch_reading_ease > 100) {
            flesch_reading_ease = 100;
        } else if (flesch_reading_ease < 0) {
            flesch_reading_ease = 0;
        }

        var flesch_kincaid_grade_level =
            (0.39 * words) / sentences +
            (11.8 * total_syllables) / words -
            15.9;
        var gunning_fog_index =
            (words / sentences + 100 * (pollysyllables / words)) * 0.4;
        var automated_readability_index =
            4.71 * (characters / words) + 0.5 * (words / sentences) - 21.43;
        var smog =
            1.043 * Math.sqrt((pollysyllables * 30) / sentences) + 3.1291;
        var coleman_liau =
            0.0588 * ((100 * characters) / words) -
            0.296 * ((100 * sentences) / words) -
            15.8;
        var scoreMsg = "";

        scoreMsg =
            scoreMsg +
            "[Detailed] Readability score of main content area. Please note text within a list is ignored.";
        scoreMsg = scoreMsg + "\n\n";
        scoreMsg =
            scoreMsg + "Flesch Reading Ease: " + flesch_reading_ease.toFixed(1);
        scoreMsg = scoreMsg + "\nWCAG 2.0 Level AAA requires 60 or greater.";
        scoreMsg = scoreMsg + "\n\n";
        scoreMsg =
            scoreMsg +
            "Grade Level Average: " +
            (
                (flesch_kincaid_grade_level +
                    gunning_fog_index +
                    automated_readability_index +
                    coleman_liau +
                    (sentences >= 30 ? smog : 0)) /
                (sentences >= 30 ? 5 : 4)
            ).toFixed(1);
        scoreMsg = scoreMsg + "\n\n";
        scoreMsg =
            scoreMsg +
            "(Flesch-Kincaid): " +
            flesch_kincaid_grade_level.toFixed(1);
        scoreMsg = scoreMsg + "\n";
        scoreMsg = scoreMsg + "(Gunning-Fog): " + gunning_fog_index.toFixed(1);
        scoreMsg = scoreMsg + "\n";
        scoreMsg =
            scoreMsg +
            "(Automated Readability): " +
            automated_readability_index.toFixed(1);
        scoreMsg = scoreMsg + "\n";
        scoreMsg = scoreMsg + "(Colemane-Liau): " + coleman_liau.toFixed(1);
        scoreMsg = scoreMsg + "\n";
        scoreMsg =
            scoreMsg +
            (sentences >= 30 ? "(SMOG): " + smog.toFixed(1) + "\n\n" : "");
        scoreMsg = scoreMsg + "WCAG 2.0 Level AAA requires grade 9 or lower.";
        scoreMsg = scoreMsg + "\n\n";
        scoreMsg = scoreMsg + "Words: " + words;
        scoreMsg = scoreMsg + "\n";
        scoreMsg =
            scoreMsg +
            "Complex Words: " +
            Math.round(100 * ((words - (syllables1 + syllables2)) / words)) +
            "%";
        scoreMsg = scoreMsg + "\n";
        scoreMsg = scoreMsg + "Sentences: " + sentences;
        scoreMsg = scoreMsg + "\n";
        scoreMsg =
            scoreMsg + "Words Per Sentence: " + (words / sentences).toFixed(1);
        scoreMsg = scoreMsg + "\n";
        scoreMsg = scoreMsg + "Syllables: " + total_syllables;
        scoreMsg = scoreMsg + "\n";
        scoreMsg = scoreMsg + "Characters: " + characters;
        console.log(scoreMsg);

        let readingDifficulty = "";
        let readabilityDetails = "";
        let notEnoughContent = "";

        if (words > 30) {
            var fleschScore = flesch_reading_ease.toFixed(1);
            var avgWordsPerSentence = (words / sentences).toFixed(1);

            //WCAG AAA pass if greater than 60
            if (fleschScore >= 0 && fleschScore < 30) {
                readingDifficulty =
                    '<span class="sa11y-readability-score">Very difficult</span>';
            } else if (fleschScore > 31 && fleschScore < 49) {
                readingDifficulty =
                    '<span class="sa11y-readability-score">Difficult</span>';
            } else if (fleschScore > 50 && fleschScore < 60) {
                readingDifficulty =
                    '<span class="sa11y-readability-score">Fairly difficult</span>';
            } else {
                readingDifficulty =
                    '<span class="sa11y-readability-score">Good</span>';
            }

            readabilityDetails =
                `
                <ul id="sa11y-readability-details">
                    <li><span class='sa11y-bold'>Average words per sentence:</span> ` +
                avgWordsPerSentence +
                `</li>
                    <li><span class='sa11y-bold'>Complex words:</span> ` +
                Math.round(
                    100 * ((words - (syllables1 + syllables2)) / words)
                ) +
                `%</li>
                    <li><span class='sa11y-bold'>Words:</span> ` +
                words +
                `</li>
                </ul>`;
        } else if (this.$mainPandLi.length === 0) {
            fleschScore = "";
            readingDifficulty = "";
            readabilityDetails = "";
            notEnoughContent =
                'Please identify the <a href="https://www.w3.org/WAI/tutorials/page-structure/regions/#main-content" target="_blank">main content region to calculate readability. <span class="sa11y-visually-hidden">(opens new tab)</span></a>';
        } else {
            fleschScore = "";
            readingDifficulty = "";
            readabilityDetails = "";
            notEnoughContent =
                "Not enough content to calculate readability score.";
        }

        let sa11yReadabilityPanel = document.createElement("div");
        sa11yReadabilityPanel.setAttribute("id", "sa11y-readability-content");
        sa11yReadabilityPanel.innerHTML = `
                <span class="sa11y-header-text">Readability</span>
                <div class="sa11y-readability-level">${fleschScore} ${readingDifficulty}</div> ${readabilityDetails} ${notEnoughContent}
                `;
        $("#sa11y-readability-panel").prepend(sa11yReadabilityPanel);
    };

    // ============================================================

    displayPanel = () => {
        this.panelActive = true;
        let totalCount = this.errorCount + this.warningCount;
        $("#sa11y-panel").addClass("sa11y-active");

        if (this.errorCount === 1 && this.warningCount === 1) {
            $("#sa11y-panel-content").addClass("sa11y-errors");
            $("#sa11y-status").text(
                `1 accessibility error and 1 warning detected.`
            );
        } else if (this.errorCount === 1 && this.warningCount > 0) {
            $("#sa11y-panel-content").addClass("sa11y-errors");
            $("#sa11y-status").text(
                `1 accessibility error and ${this.warningCount} warnings detected.`
            );
        } else if (this.errorCount > 0 && this.warningCount === 1) {
            $("#sa11y-panel-content").addClass("sa11y-errors");
            $("#sa11y-status").text(
                `${this.errorCount} accessibility errors and 1 warning detected.`
            );
        } else if (this.errorCount > 0 && this.warningCount > 0) {
            $("#sa11y-panel-content").addClass("sa11y-errors");
            $("#sa11y-status").text(
                `${this.errorCount} accessibility errors and ${this.warningCount} warnings detected.`
            );
        } else if (this.errorCount > 0) {
            $("#sa11y-panel-content").addClass("sa11y-errors");
            $("#sa11y-status").text(
                this.errorCount === 1
                    ? "1 accessibility issue detected."
                    : this.errorCount + " accessibility issues detected."
            );
        } else if (this.warningCount > 0) {
            $("#sa11y-panel-content").addClass("sa11y-warnings");
            $("#sa11y-status").text(
                totalCount === 1
                    ? "Please review warning."
                    : "Please review " + this.warningCount + " warnings."
            );
        } else {
            $("#sa11y-panel-content").addClass("sa11y-pass");
            $("#sa11y-status").text("No accessibility errors found.");
        }

        //Show outline panel
        let $outlineToggle = $("#sa11y-outline-toggle");
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
        let $settingsToggle = $("#sa11y-settings-toggle");
        $settingsToggle.click(function () {
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

    reset = (restartPanel = true) => {
        this.panelActive = false;
        this.clearEverything();
        $("#sa11y-status").text();
        $("#sa11y-outline-toggle").off("click");
        $("#sa11y-settings-toggle").off("click");

        this.root.find(".sa11y-error-border").removeClass("sa11y-error-border");
        this.root
            .find(".sa11y-error-heading")
            .removeClass("sa11y-error-heading");
        this.root.find(".sa11y-error-message-container").remove();
        this.root.find(".sa11y-error-text").removeClass("sa11y-error-text");

        this.root
            .find(".sa11y-warning-border")
            .removeClass("sa11y-warning-border");
        this.root.find(".sa11y-warning-text").removeClass("sa11y-warning-text");
        this.root.find(".sa11y-warning-uppercase").contents().unwrap();
        this.root.find("p").removeClass("sa11y-fake-list");

        this.root.find(".sa11y-instance").remove();
        this.root.find(".sa11y-instance-inline").remove();
        this.root.find(".sa11y-heading-label").remove();
        this.root.find("#sa11y-outline-list li").remove();
        this.root.find("#sa11y-readability-content").remove();
        this.root.find(".sa11y-readability-period").remove();

        if (restartPanel) {
            $("#sa11y-panel-content").removeClass();
            this.root.find("#sa11y-panel").removeClass("sa11y-active");
        }
    };
    clearEverything = () => {};
}

if (window.navigator.userAgent.match(/MSIE|Trident/) === null) {
    new Sa11y(); //No IE support.
}
