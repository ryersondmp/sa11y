//Global defaults. Use commas to seperate classes or elements.
let sa11yCheckRoot = "body"; //Use "main" for main content.

//Language of Sa11y. Some global variables to help translate.
let sa11yLangCode = "en", //Language code, e.g. "fr"
    sa11yMainToggleLang = "Toggle Accessibility Checker",
    sa11yContainerLang = "Accessibility Checker",
    sa11yErrorLang = "Error", //Erreur
    sa11yWarningLang = "Warning", //Attention
    sa11yPassLang = "Good"; //Bon

//Inclusions and exclusions
let sa11yContainerIgnore = ".sa11y-ignore, #sa11y-container"; //Ignore specific regions.
let sa11yOutlineIgnore = ""; //Exclude headings from outline panel.
let sa11yHeaderIgnore = ""; //Ignore specific headings. E.g. "h1.jumbotron-heading"
let sa11yImageIgnore = ""; //Ignore specific images.
let sa11yLinkIgnore = ""; //Ignore specific links.

if (window.navigator.userAgent.match(/MSIE|Trident/) === null) {
    var Sa11y = new Sa11y(); //No IE support.
}

function Sa11y() {
    this.checkAll = async function () {
        this.errorCount = 0;
        this.warningCount = 0;
        this.checkRoot = $(sa11yCheckRoot);
        this.findElements();
        this.checkHeaders();
        this.checkLinkText();
        this.checkContrast();
        this.checkLabels();
        this.checkAltText();
        this.checkQA();

        if (this.panelActive) {
            Sa11y.reset();
            this.panelActive = false;
        } else {
            this.displayPanel();
            this.panelActive = true;
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

    //Icon on the main toggle. Easy to replace.
    var MainToggleIcon =
        "<svg role='img' focusable='false' width='35px' height='35px' aria-hidden='true' xmlns='http://www.w3.org/2000/svg' viewBox='0 0 512 512'><path fill='#ffffff' d='M256 48c114.953 0 208 93.029 208 208 0 114.953-93.029 208-208 208-114.953 0-208-93.029-208-208 0-114.953 93.029-208 208-208m0-40C119.033 8 8 119.033 8 256s111.033 248 248 248 248-111.033 248-248S392.967 8 256 8zm0 56C149.961 64 64 149.961 64 256s85.961 192 192 192 192-85.961 192-192S362.039 64 256 64zm0 44c19.882 0 36 16.118 36 36s-16.118 36-36 36-36-16.118-36-36 16.118-36 36-36zm117.741 98.023c-28.712 6.779-55.511 12.748-82.14 15.807.851 101.023 12.306 123.052 25.037 155.621 3.617 9.26-.957 19.698-10.217 23.315-9.261 3.617-19.699-.957-23.316-10.217-8.705-22.308-17.086-40.636-22.261-78.549h-9.686c-5.167 37.851-13.534 56.208-22.262 78.549-3.615 9.255-14.05 13.836-23.315 10.217-9.26-3.617-13.834-14.056-10.217-23.315 12.713-32.541 24.185-54.541 25.037-155.621-26.629-3.058-53.428-9.027-82.141-15.807-8.6-2.031-13.926-10.648-11.895-19.249s10.647-13.926 19.249-11.895c96.686 22.829 124.283 22.783 220.775 0 8.599-2.03 17.218 3.294 19.249 11.895 2.029 8.601-3.297 17.219-11.897 19.249z'/></svg>";

    var sa11ycontainer = document.createElement("div");
    sa11ycontainer.setAttribute("id", "sa11y-container");
    sa11ycontainer.setAttribute("role", "region");
    sa11ycontainer.setAttribute("lang", sa11yLangCode);
    sa11ycontainer.setAttribute("aria-label", sa11yContainerLang);
    sa11ycontainer.innerHTML =
        '<button type="button" aria-expanded="false" id="sa11y-toggle">' +
        MainToggleIcon +
        '<span class="sa11y-visually-hidden">' +
        sa11yMainToggleLang +
        "</span></button>" +
        '<div id="sa11y-panel">' +
        '<div id="sa11y-outline-panel"><div id="sa11y-outline-header" class="sa11y-header-text" tabindex="-1">Page outline</div><ul id="sa11y-outline-list"></ul></div>' +
        '<div id="sa11y-settings-panel"><div id="sa11y-settings-header" class="sa11y-header-text" tabindex="-1">Settings</div><div id="sa11y-settings-content"><div class="sa11y-panel-controls"><button class="btn btn-sm btn-primary" id="theme-toggle"></button></div><div class="sa11y-header-text">About Sa11y</div><span></span></div></div>' +
        '<div id="sa11y-panel-content"><div class="sa11y-panel-icon"></div><div id="sa11y-panel-text"><span id="sa11y-status"></span></div></div>' +
        '<div id="sa11y-panel-controls"><button type="button" aria-expanded="false" id="sa11y-outline-toggle">Show Outline</button><button type="button" aria-expanded="false" id="sa11y-settings-toggle">Show Settings</button><div aria-hidden="true">&nbsp;&nbsp;</div></div>' +
        "</div>";
    $("body").prepend(sa11ycontainer);

    // Templated buttons to make it easier to swap tooltip libraries. If you're swapping libraries, you should only need to swap out "data-tippy-content". E.g. Bootstrap is data-toggle="tooltip"
    var start = '<div class="sa11y-instance">',
        startInline = '<div class="sa11y-instance-inline">';

    //Start of tooltip container which includes header text.
    var errorHeader =
            "<div lang='" +
            sa11yLangCode +
            "'><div class='sa11y-header-text'>" +
            sa11yErrorLang +
            "</div>",
        warningHeader =
            "<div lang='" +
            sa11yLangCode +
            "'><div class='sa11y-header-text'>" +
            sa11yWarningLang +
            "</div>",
        passHeader =
            "<div lang='" +
            sa11yLangCode +
            "'><div class='sa11y-header-text'>" +
            sa11yPassLang +
            "</div>";

    //Start of button.
    var errorBtn =
            '<button type="button" aria-label="' +
            sa11yErrorLang +
            '" class="sa11y-btn sa11y-error-btn" data-tippy-content="' +
            errorHeader,
        errorBtnText =
            '<button type="button" aria-label="' +
            sa11yErrorLang +
            '" class="sa11y-btn sa11y-error-btn-text" data-tippy-content="' +
            errorHeader,
        warningBtn =
            '<button type="button" aria-label="' +
            sa11yWarningLang +
            '" class="sa11y-btn sa11y-warning-btn" data-tippy-content="' +
            warningHeader,
        warningBtnText =
            '<button type="button" aria-label="' +
            sa11yWarningLang +
            '" class="sa11y-btn sa11y-warning-btn-text" data-tippy-content="' +
            warningHeader,
        passBtn =
            '<button type="button" aria-label="' +
            sa11yPassLang +
            '" class="sa11y-btn sa11y-pass-btn" data-tippy-content="' +
            passHeader,
        passBtnText =
            '<button type="button" aria-label="' +
            sa11yPassLang +
            '" class="sa11y-btn sa11y-pass-btn-text" data-tippy-content="' +
            passHeader;

    var end = '</div>"></button></div>'; //End of tooltip content, button, instance.

    //Full width error banners appended to top of page.
    var errorMessageStart =
            '<div class="sa11y-error-message-container"><div class="sa11y-error-message" lang="' +
            sa11yLangCode +
            '"><span class="sa11y-visually-hidden">' +
            sa11yErrorLang +
            "</span> ",
        errorMessageEnd = "</div></div>";

    //Build main panel.
    this.displayPanel = function () {
        let totalCount = this.errorCount + this.warningCount;
        $("#sa11y-panel").addClass("sa11y-active");
        if (totalCount > 0) {
            if (this.errorCount > 0) {
                $("#sa11y-status").text(
                    totalCount === 1
                        ? "One accessibility issue detected."
                        : totalCount + " accessibility issues detected."
                );
                $("#sa11y-panel-content").addClass("sa11y-errors");
            } else if (this.warningCount > 0) {
                $("#sa11y-status").text(
                    totalCount === 1
                        ? "Please review warning."
                        : "Please review " + totalCount + " warnings."
                );
                $("#sa11y-panel-content").addClass("sa11y-warnings");
            }
        } else {
            $("#sa11y-panel-content").addClass("sa11y-pass");
            $("#sa11y-status").text("No accessibility errors found.");
        }

        //Show outline panel
        let $outlineToggle = $("#sa11y-outline-toggle");
        $outlineToggle.click(function () {
            $(this).toggleClass("sa11y-outline-active");
            $("#sa11y-outline-panel").toggleClass("sa11y-active");
            $(this).text(function (i, v) {
                return v === "Show Outline" ? "Hide Outline" : "Show Outline";
            });
            $(this).attr("aria-expanded", function (i, attr) {
                return attr == "true" ? "false" : "true";
            });
            $("#sa11y-outline-header").focus();
            $(".sa11y-heading-label").toggleClass("sa11y-label-visible");

            //Remove settings panel
            $("#sa11y-settings-panel").removeClass("sa11y-active");
            $settingsToggle.removeClass("sa11y-settings-active");
            $settingsToggle.attr("aria-expanded", "false");
            $settingsToggle.text("Show Settings");
        });

        //Show settings panel
        let $settingsToggle = $("#sa11y-settings-toggle");
        $settingsToggle.click(function () {
            $(this).toggleClass("sa11y-settings-active");
            $("#sa11y-settings-panel").toggleClass("sa11y-active");
            $(this).text(function (i, v) {
                return v === "Show Settings"
                    ? "Hide Settings"
                    : "Show Settings";
            });
            $(this).attr("aria-expanded", function (i, attr) {
                return attr == "true" ? "false" : "true";
            });
            $("#sa11y-settings-header").focus();

            //Remove outline panel
            $("#sa11y-outline-panel").removeClass("sa11y-active");
            $outlineToggle.removeClass("sa11y-outline-active");
            $outlineToggle.attr("aria-expanded", "false");
            $outlineToggle.text("Show Outline");
            $(".sa11y-heading-label").removeClass("sa11y-label-visible");
        });
    };

    // Resets all changes made by the tool.
    this.reset = function () {
        this.clearEverything();
        this.errorCount = 0;
        this.warningCount = 0;
        $("#sa11y-panel-content").removeClass();
        $("#sa11y-status").text();
    };

    //Find and cache.
    this.findElements = function () {
        this.$p = this.checkRoot.find("p").not(this.containerIgnore);
        this.$h = this.checkRoot
            .find("h1, h2, h3, h4, h5, h6, [role='heading'][aria-level]")
            .not(":hidden")
            .not(this.containerIgnore);
        this.$img = this.checkRoot.find("img").not(this.imageIgnore);
        this.$iframe = this.checkRoot.find("iframe").not(this.containerIgnore);
        this.$table = this.checkRoot.find("table").not(this.containerIgnore);
        Sa11y.$contrast = this.checkRoot
            .find("*:visible")
            .not(".sa11y-exclude *")
            .not("#sa11y-container *")
            .not(this.containerIgnore);
    };

    this.loadGlobals = function () {
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

    this.clearEverything = function () {
        this.checkRoot
            .find(".sa11y-error-border")
            .removeClass("sa11y-error-border");
        this.checkRoot
            .find(".sa11y-error-heading")
            .removeClass("sa11y-error-heading");
        this.checkRoot.find(".sa11y-error-message-container").remove();
        this.checkRoot
            .find(".sa11y-error-text")
            .removeClass("sa11y-error-text");

        this.checkRoot
            .find(".sa11y-warning-border")
            .removeClass("sa11y-warning-border");
        this.checkRoot
            .find(".sa11y-warning-text")
            .removeClass("sa11y-warning-text");
        this.checkRoot.find(".sa11y-warning-uppercase").contents().unwrap();

        this.checkRoot.find(".sa11y-instance").remove();
        this.checkRoot.find(".sa11y-instance-inline").remove();
        this.checkRoot.find(".sa11y-heading-label").remove();
        this.checkRoot.find("#sa11y-panel").removeClass("sa11y-active");
        this.checkRoot.find("#sa11y-outline-list li").remove();
    };

    $(function () {
        //To-do: Figure out what to do with this guy.
        Sa11y.loadGlobals();

        //Keeps checker active when navigating between pages until it is toggled off.
        var sa11yToggle = $("#sa11y-toggle");
        sa11yToggle.addClass(localStorage.enableSa11y);
        sa11yToggle.on("click", function () {
            if (localStorage.enableSa11y != "sa11y-on") {
                localStorage.enableSa11y = "sa11y-on";
                sa11yToggle
                    .addClass("sa11y-on", true)
                    .attr("aria-expanded", "true");
                Sa11y.checkAll();
            } else {
                sa11yToggle
                    .removeClass("sa11y-on", false)
                    .attr("aria-expanded", "false")
                    .removeClass("loading-sa11y");
                localStorage.enableSa11y = "";
                Sa11y.checkAll();
            }
        });

        // Crudely give a little time to load any other content or slow post-rendered JS, iFrames, etc.
        if (sa11yToggle.hasClass("sa11y-on")) {
            sa11yToggle
                .toggleClass("loading-sa11y")
                .attr("aria-expanded", "true");
            setTimeout(function () {
                Sa11y.checkAll();
            }, 1200);
        }

        //Escape key to shutdown.
        $(document).keyup(function (escape) {
            if (
                escape.keyCode == 27 &&
                $("#sa11y-panel").hasClass("sa11y-active")
            ) {
                tippy.hideAll();
                localStorage.enableSa11y = "";
                Sa11y.checkAll();
            } else {
                this.onkeyup = null;
            }
        });

        //Dark mode. Credits: https://derekkedziora.com/blog/dark-mode-revisited
        let systemInitiatedDark = window.matchMedia(
            "(prefers-color-scheme: dark)"
        );
        let theme = sessionStorage.getItem("sa11y-theme");
        if (systemInitiatedDark.matches) {
            $("#theme-toggle").text("Light");
        } else {
            $("#theme-toggle").text("Dark");
        }

        function prefersColorTest(systemInitiatedDark) {
            if (systemInitiatedDark.matches) {
                $("html").attr("data-sa11y-theme", "dark");
                $("#theme-toggle").text("Light");
                sessionStorage.setItem("sa11y-theme", "");
            } else {
                $("html").attr("data-sa11y-theme", "light");
                $("#theme-toggle").text("Dark");
                sessionStorage.setItem("sa11y-theme", "");
            }
        }
        systemInitiatedDark.addListener(prefersColorTest);
        $("#theme-toggle").click(function () {
            let theme = sessionStorage.getItem("sa11y-theme");
            if (theme === "dark") {
                $("html").attr("data-sa11y-theme", "light");
                sessionStorage.setItem("sa11y-theme", "light");
                $("#theme-toggle").text("Dark");
            } else if (theme === "light") {
                $("html").attr("data-sa11y-theme", "dark");
                sessionStorage.setItem("sa11y-theme", "dark");
                $("#theme-toggle").text("Light");
            } else if (systemInitiatedDark.matches) {
                $("html").attr("data-sa11y-theme", "light");
                sessionStorage.setItem("sa11y-theme", "light");
                $("theme-toggle").text("Dark");
            } else {
                $("html").attr("data-sa11y-theme", "dark");
                sessionStorage.setItem("sa11y-theme", "dark");
                $("#theme-toggle").text("Light");
            }
        });
        if (theme === "dark") {
            $("html").attr("data-sa11y-theme", "dark");
            sessionStorage.setItem("sa11y-theme", "dark");
            $("#theme-toggle").text("Light");
        } else if (theme === "light") {
            $("html").attr("data-sa11y-theme", "light");
            sessionStorage.setItem("sa11y-theme", "light");
            $("theme-toggle").text("Dark");
        }
    });

    /*================== HEADING STRUCTURE MODULE ===================*/
    this.checkHeaders = async function () {
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
                error =
                    "Non-consecutive heading level used. Headings should never skip levels, or go from <span class='sa11y-bold'>Heading " +
                    prevLevel +
                    "</span> to <span class='sa11y-red-text sa11y-bold'>Heading " +
                    level +
                    ".</span>";
            } else if ($el.text().trim().length < 1) {
                error = "Empty heading found! Please remove empty header tags.";
            } else if ($el.text().trim().length > 170) {
                error =
                    "Heading is too long! Headings are used to organize content and convey structure. They should be brief, clear, informative and unique. Please keep headings less than 160 characters (no more than a sentence).<hr aria-hidden='true' class='sa11y-hr'>Character count: <span class='sa11y-bold sa11y-red-text'>" +
                    headingLength +
                    "</span>";
            } else if (i === 0 && level !== 1 && level !== 2) {
                error =
                    "First heading on page should usually be a Heading 1 or Heading 2. Heading 1 should be the start of the main content section, and is the main heading that describes the overall purpose of the page. Learn more about <a href='https://www.w3.org/WAI/tutorials/page-structure/headings/' target='_blank'>Heading Structure.<span class='sa11y-visually-hidden'> (Opens in new tab)</span></a>";
            }
            prevLevel = level;

            let li =
                "<li class='sa11y-outline-" +
                level +
                "'><span class='sa11y-badge'>" +
                level +
                "</span> <span class='sa11y-outline-list-item'>" +
                $el.text() +
                "</span></li>";

            let liError =
                "<li class='sa11y-outline-" +
                level +
                "'><span class='sa11y-badge sa11y-error-badge'><span aria-hidden='true'>&#10007;</span><span class='sa11y-visually-hidden'>" +
                sa11yErrorLang +
                "</span> " +
                level +
                "</span> <span class='sa11y-outline-list-item sa11y-red-text sa11y-bold'>" +
                $el.text() +
                "</span></li>";

            if ($el.not(sa11yOutlineIgnore).length !== 0) {
                $el.not(sa11yOutlineIgnore).append(
                    " <span class='sa11y-heading-label'>H" + level + "</span> "
                );

                if (error != null && $el.closest("a").length > 0) {
                    this.errorCount++;
                    $el.addClass("sa11y-error-heading");
                    $el.closest("a").after(
                        startInline + errorBtnText + error + end
                    );
                    $("#sa11y-outline-list").append(liError);
                } else if (error != null) {
                    this.errorCount++;
                    $el.addClass("sa11y-error-heading");
                    $el.before(startInline + errorBtnText + error + end);
                    $("#sa11y-outline-list").append(liError);
                } else if (error == null) {
                    $("#sa11y-outline-list").append(li);
                }
            }
        });

        //Check to see there is at least one H1 on the page.
        let $h1 = this.checkRoot
            .find("h1, [role='heading'][aria-level='1']")
            .not(this.containerIgnore);
        if ($h1.length === 0) {
            this.errorCount++;
            $("#sa11y-outline-header").after(
                "<div class='sa11y-instance'><span class='sa11y-badge sa11y-error-badge'><span aria-hidden='true'>&#10007;</span><span class='sa11y-visually-hidden'>" +
                    sa11yErrorLang +
                    "</span></span> <span class='sa11y-red-text sa11y-bold'>Missing Heading 1!</span></div>"
            );

            MissingHeading1Message =
                "Missing Heading 1. Heading 1 should be the start of the main content section, and is the main heading that describes the overall purpose of the page. Learn more about <a href='https://www.w3.org/WAI/tutorials/page-structure/headings/' target='_blank'>Heading Structure.<span class='sa11y-visually-hidden'> (Opens in new tab)</span></a>";
            $("#sa11y-container").after(
                errorMessageStart + MissingHeading1Message + errorMessageEnd
            );
        }
    };

    /*====================== LINK TEXT MODULE =======================*/
    this.checkLinkText = function () {
        /* Mini function if you need to exclude any text contained with a span. We created this function to ignore automatically appended sr-only text for external links and document filetypes.

    $.fn.ignore = function(sel){
      return this.clone().find(sel||">*").remove().end();
    };

    Example: If you need to ignore any text within <span class="sr-only">test</span>.
    $el.ignore("span.sr-only").text().trim(); */

        let $links = this.checkRoot.find("a[href]").not(this.linkIgnore);

        $links.each((i, el) => {
            let $el = $(el);
            var linktext = $el.text();
            var hasarialabelledby = $el.attr("aria-labelledby");
            var hasarialabel = $el.attr("aria-label");
            var hasariahidden = $el.attr("aria-hidden");
            var hastabindex = $el.attr("tabindex");
            var error = this.containsLinkTextStopWords($el.text().trim());

            if (
                $el.children().length == 0 &&
                $el.attr("href") !== undefined &&
                $el.text().length == 0 &&
                $el.is(":visible")
            ) {
                this.errorCount++;
                LinkErrorMessage = "Found an empty hyperlink without any text!";
                $el.addClass("sa11y-error-text");
                $el.after(startInline + errorBtnText + LinkErrorMessage + end);
            } else if (error != null) {
                if (hasarialabelledby != null) {
                    var acclinkname = document.getElementById(hasarialabelledby)
                        .textContent;
                    var LinkHasAriaLabelledbyMessage =
                        "The descriptive label for this link is: <span class='sa11y-bold'>" +
                        linktext +
                        " " +
                        acclinkname +
                        "</span>";
                    $el.after(
                        startInline +
                            passBtnText +
                            LinkHasAriaLabelledbyMessage +
                            end
                    );
                } else if (hasarialabel != null) {
                    LinkHasAriaLabelMessage =
                        "The descriptive label for this link is: <span class='sa11y-bold'>" +
                        hasarialabel +
                        "</span>";
                    $el.after(
                        startInline +
                            passBtnText +
                            LinkHasAriaLabelMessage +
                            end
                    );
                } else if (hasariahidden == "true" && hastabindex == "-1") {
                    //do nothing.
                } else {
                    this.errorCount++;
                    $el.addClass("sa11y-error-text");
                    StopWordMessage =
                        "Link text may not be descriptive enough, consider changing word: <span class='sa11y-red-text sa11y-bold'>" +
                        error +
                        "</span><hr aria-hidden='true' class='sa11y-hr'><span class='sa11y-bold'>Tip!</span> Link text should always be unique and meaningful so it could be understood out of context.";
                    $el.after(
                        startInline + errorBtnText + StopWordMessage + end
                    );
                }
            }
        });
    };

    // Checks if text is not descriptive and returns the word(s) that are making the text inaccessible.
    //showStopper words will always flag an issue if contained in a hyperlink.
    //partialStopWords will only be flagged as an issue if it's the only hyperlink text.
    this.containsLinkTextStopWords = function (textContent) {
        let stopWords = [
            "click here",
            "<",
            ">",
            "http://",
            "https://",
            ".aspx",
            ".html",
            ".php",
            "here.",
        ];
        let partialStopWords = [
            "learn more",
            "learn",
            "more",
            "register",
            "register now",
            "this page",
            "check out",
            "learn to",
            "view",
            "view our",
            "read more",
            ".",
            ",",
            ":",
            "page",
            "this page",
            "download",
            "form",
            "link",
            "here",
            "this",
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

    /*======================== CONTRAST MODULE =======================*/
    this.checkContrast = function () {
        var contrastErrors = {
            errors: [],
            warnings: [],
        };
        var contrast = {
            // Parse rgb(r, g, b) and rgba(r, g, b, a) strings into an array.
            // Adapted from https://github.com/gka/chroma.js
            parseRgb: function (css) {
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
            check: function () {
                Sa11y.$contrast.each(function () {
                    var $this = $(this),
                        color = $this.css("color"),
                        background = contrast.getBackground($this),
                        htmlTag = $this[0].tagName,
                        textCheck = $this
                            .clone()
                            .children()
                            .remove()
                            .end()
                            .text(),
                        ratingString,
                        fontSizeString,
                        failed;

                    if (htmlTag === "SVG") {
                        var fill = $this.css("fill"),
                            ratio =
                                Math.round(
                                    contrast.contrastRatio(fill, background) *
                                        100
                                ) / 100,
                            ratioText = ratio + ":1";
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
        $.each(contrastErrors.errors, (index, item) => {
            var name = item.name;
            var cdetail = item.detail;
            var cratio = item.ratio;
            var nodename = name[0].nodeName;
            var nodetext = name[0].textContent;
            this.errorCount++;
            ContrastErrorMessage =
                "" +
                cdetail +
                " does not have enough contrast with the background. The contrast ratio should be at least 4.5:1 for normal text and 3:1 for large text. <hr class='sa11y-hr' aria-hidden='true'> The contrast ratio is <span class='sa11y-red-text sa11y-bold'>" +
                cratio +
                "</span> for the following text: <span class='sa11y-bold sa11y-red-text'>" +
                nodetext +
                "</span>";
            $(name).before(
                startInline + errorBtnText + ContrastErrorMessage + end
            );
        });

        $.each(contrastErrors.warnings, (index, item) => {
            var name = item.name;
            var nodetext = name[0].textContent;
            this.warningCount++;
            ContrastWarningMessage =
                "The contrast of this text is unknown and needs to be manually reviewed. Ensure the text and the background have strong contrasting colours. The contrast ratio should be at least 4.5:1 for normal text and 3:1 for large text. <hr class='sa11y-hr' aria-hidden='true'>Please review contrast of the following text:<br> <span class='sa11y-bold'>" +
                nodetext +
                "</span>";
            $(name)
                .addClass("sa11y-warning-border")
                .before(
                    startInline + warningBtnText + ContrastWarningMessage + end
                );
        });
    };
    /*======================== INPUTS MODULE =======================*/
    this.checkLabels = function () {
        let $inputs = this.checkRoot
            .find("input")
            .not(this.containerIgnore)
            .not("input:hidden");
        $inputs.each((i, el) => {
            let $el = $(el);

            if (
                !$el.attr("id") &&
                !$el.attr("aria-label") &&
                !$el.attr("aria-labelledby")
            ) {
                this.errorCount++;
                $el.addClass("sa11y-error-border");
                MissingLabelMessage =
                    "There is no label associated with this input. Please add an <span class='sa11y-kbd'>id</span> to this input, and add a matching <span class='sa11y-kbd'>for</span> attribute to the label.";
                $el.after(
                    startInline + errorBtnText + MissingLabelMessage + end
                );
            } else if ($el.attr("aria-label")) {
                /*Optional: add pass border.*/
            } else if ($el.prev().is("label")) {
                label = $el.prev();
                if (label.attr("for") == $el.attr("id")) {
                    /*Optional: add pass border.*/
                } else {
                    this.errorCount++;
                    $el.addClass("sa11y-error-border");
                    NoForAttributeMessage =
                        "There is no label associated with this input. Add a <span class='sa11y-kbd'>for</span> attribute to the label that matches the <span class='sa11y-kbd'>id</span> of this input. <hr class='sa11y-hr' aria-hidden='true'> The ID for this input is: <span class='sa11y-bold'>id=&#34;" +
                        $el.attr("id") +
                        "&#34;</span>";
                    $el.after(
                        startInline + errorBtnText + NoForAttributeMessage + end
                    );
                }
            }
        });
    };

    /*================== ALTERNATIVE TEXT MODULE ====================*/
    this.checkAltText = function () {
        // Test each image for alternative text.
        this.$img.each((i, el) => {
            let $el = $(el);
            let text = $el.attr("alt");

            if (text == undefined) {
                this.errorCount++;

                // Image fails if it is used as a link and is missing an alt attribute.
                if ($el.parents().is("a[href]")) {
                    //Image contains both hyperlink
                    if ($el.parents("a").text().trim().length > 1) {
                        $el.addClass("sa11y-error-border");
                        MissingAltLinkButHasTextMessage =
                            "Image is being used as a hyperlink with surrounding text, although the alt attribute should be marked as decorative or null.";
                        $el.closest("a").before(
                            startInline +
                                errorBtn +
                                MissingAltLinkButHasTextMessage +
                                end
                        );
                    } else if ($el.parents("a").text().trim().length == 0) {
                        $el.addClass("sa11y-error-border");
                        MissingAltLinkMessage =
                            "Image is being used as a hyperlink but is missing alt text! Please ensure alt text describes where the link takes you.";
                        $el.closest("a").before(
                            startInline + errorBtn + MissingAltLinkMessage + end
                        );
                    }
                }
                // General failure message if image is missing alt.
                else {
                    $el.addClass("sa11y-error-border");
                    MissingAltMessage =
                        "Missing alt text! If the image conveys a story, a mood or important information - be sure to describe the image.";
                    $el.before(start + errorBtn + MissingAltMessage + end);
                }
            }

            // If alt attribute is present, further tests are done.
            else {
                let altText = Sa11y.sanitizeForHTML(text); //Prevent tooltip from breaking.
                let error = this.containsAltTextStopWords(altText);
                let altLength = text.length;

                // Image fails if a stop word was found.
                if (error != null && $el.parents().is("a[href]")) {
                    this.errorCount++;
                    $el.addClass("sa11y-error-border");
                    LinkImageBadAltMessage =
                        "Detected poor alt text in hyperlinked image. Ensure alt text describes destination of link, not a literal description of the picture. Remove word: <span class='sa11y-red-text sa11y-bold'>" +
                        error +
                        "</span>. <hr aria-hidden='true' class='sa11y-hr'> The alt text for this image is: <span class='sa11y-bold'>" +
                        altText +
                        "</span>";
                    $el.closest("a").before(
                        startInline + errorBtn + LinkImageBadAltMessage + end
                    );
                } else if (error != null) {
                    this.errorCount++;
                    $el.addClass("sa11y-error-border");
                    AltHasBadWordMessage =
                        "Poor alt text found. It is not necessary to include words like <em>image</em>, <em>graphic</em> or the file extension. Consider removing the word: <span class='sa11y-red-text sa11y-bold'>" +
                        error +
                        "</span>. <hr aria-hidden='true' class='sa11y-hr'> The alt text for this image is: <span class='sa11y-bold'>" +
                        altText +
                        "</span>";
                    $el.before(
                        startInline + errorBtn + AltHasBadWordMessage + end
                    );
                } else if (text == "" && $el.parents().is("a[href]")) {
                    if ($el.parents("a").text().trim().length == 0) {
                        this.errorCount++;
                        $el.addClass("sa11y-error-border");
                        ImageLinkNullAltNoTextMessage =
                            "Image within hyperlink is marked as decorative and there is no link text. Please add alt text to image that describes destination of link.";
                        $el.closest("a").before(
                            startInline +
                                errorBtn +
                                ImageLinkNullAltNoTextMessage +
                                end
                        );
                    } else {
                        LinkHasAltMessage =
                            "Image is marked as decorative, although the hyperlink is using the surrounding text as a descriptive label.";
                        $el.closest("a").before(
                            startInline + passBtn + LinkHasAltMessage + end
                        );
                    }
                }

                //Decorative alt and not a link.
                else if (text == "" && $el.parents().not("a[href]")) {
                    DecorativeMessage =
                        "Image marked as <span class='sa11y-bold'>decorative.</span> However, if the image conveys a story, a mood or important information - be sure to add alt text.";
                    $el.before(start + passBtn + DecorativeMessage + end);
                }

                //Link and contains alt text.
                else if (text.length > 160 && $el.parents().is("a")) {
                    this.errorCount++;
                    $el.addClass("sa11y-error-border");
                    HyperlinkAltLengthMessage =
                        "Alt text description on hyperlinked image is <span class='sa11y-bold'>too long</span>. The alt text on hyperlinked images should describe where the link takes you, not a literal description of the image. <span class='sa11y-bold'>Consider using the title of the page it links to as the alt text.</span> <hr aria-hidden='true' class='sa11y-hr'> The alt text is <span class='sa11y-red-text sa11y-bold'>" +
                        altLength +
                        "</span> characters: <span class='sa11y-red-text sa11y-bold'>" +
                        altText +
                        "</span>";
                    $el.closest("a").before(
                        startInline + errorBtn + HyperlinkAltLengthMessage + end
                    );
                }

                //Link and contains an alt text.
                else if (
                    text != "" &&
                    $el.parents().is("a") &&
                    $el.parents("a").text().trim().length == 0
                ) {
                    this.warningCount++;
                    $el.addClass("sa11y-warning-border");
                    ImageLinkAltTextMessage =
                        "Image link contains alt text, although please ensure alt text describes the destination page. <span class='sa11y-bold'>Consider using the title of the page it links to as the alt text.</span> Does the alt text describe where the link takes you? <hr aria-hidden='true' class='sa11y-hr'>Alt text: <span class='sa11y-bold'>" +
                        altText +
                        "</span>";
                    $el.closest("a").before(
                        startInline + warningBtn + ImageLinkAltTextMessage + end
                    );
                }

                //Contains alt text & surrounding link text.
                else if (
                    text != "" &&
                    $el.parents().is("a") &&
                    $el.parents("a").text().trim().length > 1
                ) {
                    this.warningCount++;
                    $el.addClass("sa11y-warning-border");
                    AnchorLinkAndAltMessage =
                        "Image link contains <span class='sa11y-bold'>both alt text and surrounding link text.</span> If this image is decorative and is being used as a functional link to another page, consider marking the image as decorative or null - the surrounding link text should suffice. <hr aria-hidden='true' class='sa11y-hr'>Alt text: <span class='sa11y-bold'>" +
                        altText +
                        "</span>";
                    $el.closest("a").before(
                        startInline + warningBtn + AnchorLinkAndAltMessage + end
                    );
                } else if (text.length > 160) {
                    this.warningCount++;
                    $el.addClass("sa11y-warning-border");
                    AltTooLongMessage =
                        "Alt text description is <span class='sa11y-bold'>too long</span>. Alt text should be concise, yet meaningful like a <em>tweet</em> (around 100 characters). If this is a complex image or a graph, consider putting the long description of the image in text below or in an accordion component. <hr aria-hidden='true' class='sa11y-hr'> The alt text is <span class='sa11y-red-text sa11y-bold'>" +
                        altLength +
                        "</span> characters: <span class='sa11y-red-text sa11y-bold'>" +
                        altText +
                        "</span>";
                    $el.before(start + warningBtn + AltTooLongMessage + end);
                } else if (text != "") {
                    PassAltMessage =
                        "The alt text for this image is: <span class='sa11y-bold'>" +
                        altText +
                        "</span>";
                    $el.before(start + passBtn + PassAltMessage + end);
                }
            }
        });
    };

    this.containsAltTextStopWords = function (textContent) {
        let stopWords = [
            ".png",
            "DSC",
            ".jpg",
            ".jpeg",
            "image of",
            "graphic of",
            "picture of",
            "placeholder",
        ];
        var hit = null;
        $.each(stopWords, function (index, word) {
            if (textContent.toLowerCase().indexOf(word) >= 0) {
                hit = word;
                return word;
            }
        });
        return hit;
    };

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

    /*================== QUALITY ASSURANCE MODULE ===================*/
    this.checkQA = function () {
        var $videos = this.checkRoot
            .find(
                "video, iframe[src*='youtube.com'], iframe[src*='vimeo.com'], iframe[src*='yuja.com'], iframe[src*='panopto.com']"
            )
            .not(this.containerIgnore);
        $videos.each((i, el) => {
            let $el = $(el);
            this.warningCount++;
            $videos.addClass("sa11y-warning-border");
            VideoMessage =
                "Please ensure <span class='sa11y-bold'>all videos have closed captioning.</span> Providing captions for all audio and video content is a mandatory Level A requirement. Captions are meant to support people who are D/deaf or hard-of-hearing.";
            $videos.first().before(start + warningBtn + VideoMessage + end);
        });

        let $audio = this.checkRoot
            .find(
                "audio, iframe[src*='soundcloud.com'], iframe[src*='simplecast.com'], iframe[src*='podbean.com'], iframe[src*='buzzsprout.com'], iframe[src*='blubrry.com'], iframe[src*='transistor.fm'], iframe[src*='fusebox.fm'], iframe[src*='libsyn.com']"
            )
            .not(this.containerIgnore);
        $audio.each((i, el) => {
            let $el = $(el);
            this.warningCount++;
            $audio.addClass("sa11y-warning-border");
            AudioMessage =
                "Please ensure to provide a <span class='sa11y-bold'>transcript for all podcasts.</span> Providing transcripts for audio content is a mandatory Level A requirement. Transcripts are meant to support people who are D/deaf or hard-of-hearing, but can benefit everyone. Consider placing the transcript below or within an accordion panel.";
            $audio.first().before(start + warningBtn + AudioMessage + end);
        });

        let $dataviz = this.checkRoot
            .find(
                "iframe[src*='datastudio.google.com'], iframe[src*='tableau']"
            )
            .not(this.containerIgnore);
        $dataviz.each((i, el) => {
            let $el = $(el);
            this.warningCount++;
            $dataviz.addClass("sa11y-warning-border");
            DataVizMessage =
                "Data visualization widgets like this are often problematic for people who use a keyboard or screen reader to navigate, and can present significant difficulties for people with low vision or colorblindness. It's recommended to provide the same information in an alternative (text or table) format below the widget.";
            $dataviz.first().before(start + warningBtn + DataVizMessage + end);
        });

        let $twitterWarning = this.checkRoot
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
                TwitterMessage =
                    "The default Twitter timeline may cause accessibility issues for keyboard users. Secondly, the inline scrolling of the Twitter timeline may cause usability issues for mobile. It's recommended to add the following data attributes to the embed code. <hr aria-hidden='true' class='sa11y-hr'><span class='sa11y-bold'>It's recommended to:</span><ul><li>Add <span class='sa11y-kbd'>data-tweet-limit=&#34;2&#34;</span> to limit the amount of tweets.</li><li>Add <span class='sa11y-kbd'>data-chrome=&#34;nofooter noheader&#34;</span> to remove the widget's header and footer.</li></ul>";
                $el.before(start + warningBtnText + TwitterMessage + end);
            }
        });

        // Warn users of TARGET BLANK within main content.
        let $linksTargetBlank = this.checkRoot
            .find("a[target='_blank']")
            .not(this.linkIgnore)
            .not("a[href$='.pdf']")
            .not("a[href$='.docx']")
            .not("#sa11y-container a")
            .not(".sa11y-exclude");
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
                NewTabMessage =
                    "Please use <span class='sa11y-bold'>target=&ldquo;_blank&rdquo;</span> sparingly. Opening links in new tabs or windows can be very disorienting for people, especially for people who have difficulty perceiving visual content. Secondly, it's not always a good practice to control a user's experience or make decisions for them. Alert the user that the link opens in a new window within the link text.";
                $el.first().after(
                    startInline + warningBtnText + NewTabMessage + end
                );
            }
        });

        //Error: Find all links pointing to development environment. Customize as needed.
        let $badDevLinks = this.checkRoot
            .find("a[href^='https://www.dev.'], a[href*='wp-admin']")
            .not(this.linkIgnore);
        $badDevLinks.each((i, el) => {
            let $el = $(el);
            this.errorCount++;
            $el.addClass("sa11y-error-text");
            BadLinkMessage =
                "Bad link found. Link appears to point to a development environment. Make sure the link does not contain <em>dev</em> or <em>wp-admin</em> in the URL. <hr aria-hidden='true' class='sa11y-hr'>This link points to: <br><span class='sa11y-bold sa11y-red-text'>" +
                el +
                "</span>";
            $el.after(startInline + errorBtnText + BadLinkMessage + end);
        });

        //Warning: Find all PDFs. Although only append warning icon to first PDF on page.
        let checkPDF = this.checkRoot
            .find("a[href$='.pdf']")
            .not(this.containerIgnore);
        let firstPDF = this.checkRoot
            .find("a[href$='.pdf']:first")
            .not(this.containerIgnore);
        if (checkPDF.length > 0) {
            this.warningCount++;
            checkPDF.addClass("sa11y-warning-text");
            checkPDF.has("img").removeClass("sa11y-warning-text");
            PDFMessage =
                "PDFs are considered web content and must be made accessible as well. PDFs often contain issues for people who use screen readers (missing structural tags or missing form field labels) and people with low vision (text does not reflow when enlarged). If this PDF is a form, consider using an accessible HTML form as an alternative. If this PDF is a document, consider converting it into a web page. Otherwise, please <span class='sa11y-bold'>check PDF for accessibility in Acrobat DC.</span>";
            firstPDF.after(startInline + warningBtnText + PDFMessage + end);
        }

        //Find blockquotes used as headers.
        let $blockquotes = this.checkRoot
            .find("blockquote")
            .not(this.containerIgnore);
        $blockquotes.each((i, el) => {
            let $el = $(el);
            if ($el.text().trim().length < 25) {
                this.errorCount++;
                $el.addClass("sa11y-error-border");
                BlockquoteMessage =
                    "Blockquotes should be used for quotes only. They should never be used as headings. Please replace with a semantic heading (e.g. Heading 2 or Heading 3).";
                $el.before(start + errorBtnText + BlockquoteMessage + end);
            }
        });

        //Warning: Detect uppercase.
        let $queryUppercase = this.checkRoot
            .find(
                'h1, h2, h3, h4, h5, h6, p, li:not([class^="sa11y"]), blockquote'
            )
            .not(this.containerIgnore);

        $queryUppercase.each(function () {
            let $this = $(this);

            var UppercaseWarning =
                "All caps detected. Avoid typing sentences or phrases in uppercase. Some screen readers may interpret all capital text as an acronym and will read each letter individually. Additionally, all caps are more difficult to read and give the appearance of SHOUTING.";

            var uppercasePattern = /(?!<a[^>]*?>)(\b[A-Z]['!:A-Z\s]{15,}|\b[A-Z]{15,}\b)(?![^<]*?<\/a>)/g;

            var replaceUppercase =
                '<span class="sa11y-warning-uppercase">$1</span>' +
                startInline +
                warningBtnText +
                UppercaseWarning +
                end;

            $this.each(function () {
                $(this).html(
                    $(this).html().replace(uppercasePattern, replaceUppercase)
                );
            });

            if ($(".sa11y-warning-uppercase").length > 0) {
                this.warningCount++;
            }
        });

        //Tables check.
        this.$table.each((i, el) => {
            let $el = $(el);
            let findTHeaders = $el.find("th");
            let findHeadingTags = $el.find("h1, h2, h3, h4, h5, h6");

            if (findTHeaders.length == 0) {
                this.errorCount++;
                $el.addClass("sa11y-error-border");
                MissingHeadingsError =
                    "Missing table headers! Accessible tables need HTML markup that indicates header cells and data cells which defines their relationship. This information provides context to people who use assistive technology. Tables should be used for tabular data only.";
                $el.before(start + errorBtnText + MissingHeadingsError + end);
            }
            if (findHeadingTags.length > 0) {
                findHeadingTags.addClass("sa11y-error-heading");
                findHeadingTags.parent().addClass("sa11y-error-border");
                SemanticHeadingTableError =
                    "Semantic headings such as Heading 2 or Heading 3 should only be used for sections of content; <span class='sa11y-bold'>not</span> in HTML tables. Indicate table headings using the <span class='sa11y-bold'>th</span> element instead.";
                findHeadingTags.before(
                    start + errorBtnText + SemanticHeadingTableError + end
                );
            }
            findTHeaders.each(function () {
                let $th = $(this);
                if ($th.text().trim().length < 1) {
                    this.errorCount++;
                    findTHeaders.addClass("sa11y-error-border");
                    EmptyTableHeaderError =
                        "Empty table header found! Table headers should <em>never</em> be empty. It is important to designate row and/or column headers to convey their relationship. This information provides context to people who use assistive technology. Please keep in mind that tables should be used for tabular data only.";
                    findTHeaders.append(
                        start + errorBtnText + EmptyTableHeaderError + end
                    );
                }
            });
        });

        //Error: Check for duplicate IDs.
        let $checkDuplicateIDs = this.checkRoot
            .find("[id]")
            .not(this.containerIgnore);
        $checkDuplicateIDs.each(function () {
            var ids = {};
            var found = false;

            if (this.id && ids[this.id]) {
                found = true;
                this.errorCount++;
                $(this).addClass("sa11y-error-text");
                DuplicateIDMessage =
                    "Found <span class='sa11y-bold'>duplicate ID</span>. Duplicate ID errors are known to cause problems for assistive technologies when they are trying to interact with content. <hr aria-hidden='true' class='sa11y-hr'>Please remove or change the following ID: <span class='sa11y-bold sa11y-red-text'>" +
                    this.id +
                    "</span>";
                $(this).before(
                    startInline + errorBtnText + DuplicateIDMessage + end
                );
            }
            ids[this.id] = 1;
        });

        //Error: Missing language tag. Lang should be at least 2 characters.
        var lang = this.checkRoot.find("html").attr("lang");
        if (
            $("html").attr("lang") == undefined ||
            $("html").attr("lang").length < 2
        ) {
            this.errorCount++;
            PageLanguageMessage =
                "Page language not declared! Please <a href='https://www.w3.org/International/questions/qa-html-language-declarations' target='_blank'>declare language on HTML tag.<span class='sa11y-visually-hidden'> (opens new tab)</span></a>";
            $("#sa11y-container").after(
                errorMessageStart + PageLanguageMessage + errorMessageEnd
            );
        }

        //Example ruleset. Be creative.
        let $checkAnnouncement = this.checkRoot
            .find(".announcement-component")
            .not(this.containerIgnore).length;
        if ($checkAnnouncement > 1) {
            this.warningCount++;
            WarningMessage =
                "More than one Announcement component found! The Announcement component should be used strategically and sparingly. It should be used to get attention or warn users about something important. Misuse of this component makes it less effective or impactful. Secondly, this component is semantically labeled as an Announcement for people who use screen readers.";
            $(".announcement-component:gt(0)").addClass("sa11y-warning-border");
            $(".announcement-component:gt(0)").before(
                start + warningBtn + WarningMessage + end
            );
        }
    };
}
