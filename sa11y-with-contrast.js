var Sa11y = new Sa11y();

function Sa11y() {

    /* When checked, save to LocalStorage. Keeps checker active when navigating between pages until it is toggled off. Added setTimeout function to (unscientifically) give a little time to load any other content or slow post-rendered JS, iFrames, etc. */
    $(function () {

      var sa11yToggle = $('#sa11y-toggle');
      sa11yToggle.addClass(localStorage.enableSa11y);
      sa11yToggle.on('click',function(){
          if (localStorage.enableSa11y != "sa11y-on") {
             localStorage.enableSa11y = "sa11y-on";
             sa11yToggle.addClass("sa11y-on", true).attr("aria-expanded","true");
             Sa11y.checkAll();
          } else {
             sa11yToggle.removeClass("sa11y-on", false).attr("aria-expanded","false").removeClass("loading-sa11y");
             localStorage.enableSa11y = "";
             Sa11y.checkAll();
          }
       });

       if (sa11yToggle.hasClass("sa11y-on")) {
         sa11yToggle.toggleClass("loading-sa11y").attr("aria-expanded","true");
         setTimeout(function () {
             Sa11y.checkAll();
         }, 1200);
       }

        //Escape key to shutdown.
        $('body').keyup(function (escape) {
            if (escape.keyCode == 27 && $('#sa11y-panel').hasClass('sa11y-active')) {
                tippy.hideAll()
                localStorage.enableSa11y = "";
                Sa11y.checkAll();
            } else {
                this.onkeyup = null;
            }
        });

          const theme = localStorage.getItem('sa11y-theme');
       		if (theme === "sa11y-midnight") {
       			document.documentElement.setAttribute('data-sa11y-theme', 'sa11y-midnight');
       		}
       		const userPrefers = getComputedStyle(document.documentElement).getPropertyValue('content');
       		if (theme === "sa11y-midnight") {
       			$('#theme-switcher').text('Lights on');
       		} else if (theme === "sa11y-daylight") {
       			$('#theme-switcher').text('Lights off');
       		} else if (userPrefers === "sa11y-midnight") {
       			document.documentElement.setAttribute('data-sa11y-theme', 'sa11y-midnight');
       			window.localStorage.setItem('sa11y-theme', 'sa11y-midnight');
       			$('#theme-switcher').text('Lights on');
       		} else {
       			document.documentElement.setAttribute('data-sa11y-theme', 'sa11y-daylight');
       			window.localStorage.setItem('sa11y-theme', 'sa11y-daylight');
       			$('#theme-switcher').text('Lights off');
       		}
     		 $('#theme-switcher').on('click',function(){
       			let currentMode = document.documentElement.getAttribute('data-sa11y-theme');
       			if (currentMode === "sa11y-midnight") {
       				document.documentElement.setAttribute('data-sa11y-theme', 'sa11y-daylight');
       				window.localStorage.setItem('sa11y-theme', 'sa11y-daylight');
       				$('#theme-switcher').text('Lights off');
       			} else {
       				document.documentElement.setAttribute('data-sa11y-theme', 'sa11y-midnight');
       				window.localStorage.setItem('sa11y-theme', 'sa11y-midnight');
       				$('#theme-switcher').text('Lights on');
       			}
        });
    });

    var MainToggleIcon = "<svg role='img' focusable='false' width='35px' height='35px' aria-hidden='true' xmlns='http://www.w3.org/2000/svg' viewBox='0 0 512 512'><path fill='#ffffff' d='M256 48c114.953 0 208 93.029 208 208 0 114.953-93.029 208-208 208-114.953 0-208-93.029-208-208 0-114.953 93.029-208 208-208m0-40C119.033 8 8 119.033 8 256s111.033 248 248 248 248-111.033 248-248S392.967 8 256 8zm0 56C149.961 64 64 149.961 64 256s85.961 192 192 192 192-85.961 192-192S362.039 64 256 64zm0 44c19.882 0 36 16.118 36 36s-16.118 36-36 36-36-16.118-36-36 16.118-36 36-36zm117.741 98.023c-28.712 6.779-55.511 12.748-82.14 15.807.851 101.023 12.306 123.052 25.037 155.621 3.617 9.26-.957 19.698-10.217 23.315-9.261 3.617-19.699-.957-23.316-10.217-8.705-22.308-17.086-40.636-22.261-78.549h-9.686c-5.167 37.851-13.534 56.208-22.262 78.549-3.615 9.255-14.05 13.836-23.315 10.217-9.26-3.617-13.834-14.056-10.217-23.315 12.713-32.541 24.185-54.541 25.037-155.621-26.629-3.058-53.428-9.027-82.141-15.807-8.6-2.031-13.926-10.648-11.895-19.249s10.647-13.926 19.249-11.895c96.686 22.829 124.283 22.783 220.775 0 8.599-2.03 17.218 3.294 19.249 11.895 2.029 8.601-3.297 17.219-11.897 19.249z'/></svg>";

    var sa11ycontainer = document.createElement("div");
    sa11ycontainer.setAttribute("id", "sa11y-container");
    sa11ycontainer.setAttribute("role","region");
    sa11ycontainer.setAttribute("aria-label","Accessibility Checker");
    sa11ycontainer.innerHTML = '<button type="button" aria-expanded="false" id="sa11y-toggle">' + MainToggleIcon + '<span class="sa11y-visually-hidden">Toggle Accessibility Checker</span></button>'
        +
        '<div id="sa11y-panel">'
        +
        '<div id="sa11y-page-outline"><span id="page-outline-header" class="sa11y-header-text">Page outline</span><ul id="sa11y-outline-list" tabindex="-1" aria-labelledby="page-outline-header"></ul></div>'
        +
        '<div id="sa11y-panel-content"><div class="sa11y-panel-icon"></div><div id="sa11y-panel-text"><span id="sa11y-status"></span></div></div>'
        +
        '<button type="button" aria-expanded="false" id="sa11y-summary-toggle">Show Outline</button>'
        //+
        //'<button class="btn btn-primary" id="theme-switcher"></button>'
        +
        '</div>';
    $('body').prepend(sa11ycontainer);

    // Templated buttons to make it easier to swap tooltip libraries.
    var start = '<div class="sa11y-spotted">',
    startInline = '<div class="sa11y-spotted-inline">';

    var ErrorHeader = "<div class='sa11y-header-text'>Error</div>",
    WarningHeader = "<div class='sa11y-header-text'>Warning</div>",
    PassHeader = "<div class='sa11y-header-text'>Good</div>";

    var errorBtn = '<button type="button" aria-label="Error" class="sa11y-error-btn" data-tippy-content="' + ErrorHeader,
    errorBtnText = '<button type="button" aria-label="Error" class="sa11y-error-btn-text" data-tippy-content="' + ErrorHeader,
    warningBtn = '<button type="button" aria-label="Warning" class="sa11y-warning-btn" data-tippy-content="' + WarningHeader,
    warningBtnText = '<button type="button" aria-label="Warning" class="sa11y-warning-btn-text" data-tippy-content="' + WarningHeader,
    passBtn = '<button type="button" aria-label="Good" class="sa11y-pass-btn" data-tippy-content="' + PassHeader,
    passBtnText = '<button type="button" aria-label="Good" class="sa11y-pass-btn-text" data-tippy-content="' + PassHeader;

    var end = '"></button></div>';

    // States of the outlines, used to toggle the outlines.
    this.showingHeaders = false;
    this.showingLinkText = false;
    this.showingContrast = false;
    this.showingLabels = false;
    this.showingAltText = false;
    this.showingQA = false;

    // State of errors on page. Used to toggle pass message.
    this.noErrors = true;
    this.anyWarning = false;
    this.panelActive = false;

    // Toggles the outline of all headers, link texts, and images.
    this.checkAll = function () {
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
        tippy('[data-tippy-content]', {
            interactive: true,
            trigger: 'mouseenter click',
            arrow: true,
            theme: 'sa11y-theme',
            allowHTML: true,
            appendTo: document.body
        });

    };

    $("#sa11y-summary-toggle").click(function () {
        $(this).toggleClass("sa11y-summary-toggle-active");
        $("#sa11y-page-outline").toggleClass("sa11y-active");
        $(this).text(function (i, v) {
            return v === 'Show Outline' ? 'Hide Outline' : 'Show Outline'
        });
        $(this).attr('aria-expanded', function (i, attr) {
            return attr == 'true' ? 'false' : 'true'
        });
        $("#sa11y-outline-list").focus();
    });

    this.displayPanel = function () {
        if (this.noErrors) {
            $("#sa11y-panel").addClass("sa11y-active");

            if (this.anyWarning) {
                $("#sa11y-panel-content").addClass("sa11y-warnings");
                $("#sa11y-status").text("Please review warnings.");
            } else if (!this.anyWarning) {
                $("#sa11y-panel-content").addClass("sa11y-pass");
                $("#sa11y-status").text("No accessibility errors found.");
            }
        } else {
            $("#sa11y-panel").addClass("sa11y-active");
            $("#sa11y-panel-content").addClass("sa11y-errors");
            $("#sa11y-status").text("Accessibility errors found.");
        }
    }

    // Resets all changes made by the tool. Removing outlines and additional spans.
    this.reset = function () {
        this.clearEverything();
        this.showingAltText = false;
        this.showingHeaders = false;
        this.showingLinkText = false;
        this.showingContrast = false;
        this.showingLabels = false;
        this.showingQA = false;
        this.noErrors = true; //Reset page to "no errors" instead of refreshing page.
        this.anyWarning = false;
    };

    this.clearEverything = function () {
        var $body = $("body");

        $body.find(".sa11y-error-border").removeClass("sa11y-error-border");
        $body.find(".sa11y-error-heading").removeClass("sa11y-error-heading");
        $body.find(".sa11y-error-message").remove();
        $body.find(".sa11y-error-text").removeClass("sa11y-error-text");

        $body.find(".sa11y-warning-border").removeClass("sa11y-warning-border");
        $body.find(".sa11y-warning-text").removeClass("sa11y-warning-text");
        $body.find(".sa11y-warning-uppercase").contents().unwrap();

        $body.find(".sa11y-spotted").remove();
        $body.find(".sa11y-spotted-inline").remove();
        $body.find(".sa11y-heading-label").remove();
        $body.find("#sa11y-panel").removeClass("sa11y-active");
        $body.find("#sa11y-outline-list li").remove();
    }

    /*================== HEADING STRUCTURE MODULE ===================*/

    this.checkHeaders = function () {
        if (this.showingHeaders) {
            this.clearEverything();
            this.showingHeaders = false;
        } else {
            this.outlineHeaders();
            this.showingHeaders = true;
        }
    };

    this.outlineHeaders = function () {

        // Fetch all headers from the working document.
        let $headings = $("h1, h2, h3, h4, h5, h6");
        let prevLevel;

        // Test each header level for accessibility issues.
        $headings.each((i, el) => {
            let $el = $(el);
            let level = +$el.prop("tagName").slice(1);
            let error = null;
            let headingLength = $el.text().trim().length;

            // Tests 4 cases of inaccesibility.
            if (i === 0 && level !== 1) {
                error = "First heading on page is not a Heading 1. Heading 1 should be the start of the main content section, and is the main heading that describes the overall purpose of the page.";
            } else if (i !== 0 & level === 1) {
                error = "There must only be one Heading 1 per page. Heading 1 is the main heading that describes the overall purpose of the page.";
            } else if (prevLevel && level - prevLevel > 1) {
                error = "Non-consecutive heading level used. Headings should never skip levels, or go from <span class='sa11y-bold'>Heading " + prevLevel + "</span> to <span class='sa11y-red-text sa11y-bold'>Heading " + level + ".</span>";
            } else if ($el.text().trim().length < 1) {
                error = "Empty heading found! Please remove empty header tags.";
                $el.addClass("sa11y-error-text");
            } else if ($el.text().trim().length > 160) {
                error = "Heading is too long! Headings are used to organize content and convey structure. They should be brief, clear, informative and unique. Please keep headings less than 160 characters (no more than a sentence).<hr aria-hidden='true' class='sa11y-hr'>Character count: <span class='sa11y-bold sa11y-red-text'>" + headingLength + "</span>"
            }

            prevLevel = level;

            //If the heading error is within a hyperlink, make sure to append button after anchor tag.
            if (error != null && $el.closest("a").length > 0) {
                this.noErrors = false;
                $el.addClass("sa11y-error-heading");
                $el.closest('a').after(start + errorBtnText + error + end);
                var li = "<li class='sa11y-outline-" + level + "'><span class='sa11y-badge sa11y-error-badge'><span aria-hidden='true'>&times;</span><span class='sa11y-visually-hidden'>Error</span> " + level + "</span> <span class='sa11y-outline-list-item sa11y-red-text sa11y-bold'>" + $el.text() + "</span></li>";
                //Generate page outline.
                $("#sa11y-outline-list").append(li); //Generate page outline.
            }

            // Outline element based on error.
            else if (error != null) {
                this.noErrors = false;
                $el.addClass("sa11y-error-heading");
                $el.before(start + errorBtnText + error + end);
                var li = "<li class='sa11y-outline-" + level + "'><span class='sa11y-badge sa11y-error-badge'><span aria-hidden='true'>&times;</span><span class='sa11y-visually-hidden'>Error</span> " + level + "</span> <span class='sa11y-outline-list-item sa11y-red-text sa11y-bold'>" + $el.text() + "</span></li>"; //Generate page outline.
                $("#sa11y-outline-list").append(li); //Generate page outline.
            } else if (error == null) {
                var li = "<li class='sa11y-outline-" + level + "'><span class='sa11y-badge'>" + level + "</span> <span class='sa11y-outline-list-item'>" + $el.text() + "</span></li>"; //Generate page outline.
                $("#sa11y-outline-list").append(li); //Generate page outline.
            }

            $("#sa11y-summary-toggle").click(function () {
                if ($(this).attr('aria-expanded') == 'true') {
                    $el.append(" <span class='sa11y-heading-label'>H" + level + "</span> ");
                } else {
                    $(".sa11y-heading-label").remove();
                }
            });

        });
    };

    /*====================== LINK TEXT MODULE =======================*/

    // Toggles the outline of all inaccessible link texts.
    this.checkLinkText = function () {
        if (this.showingLinkText) {
            this.clearEverything();
            this.showingLinkText = false;
        } else {
            this.outlineLinkText();
            this.showingLinkText = true;
        }
    };

    this.outlineLinkText = function () {

        let $links = $("body").find("a").not(".sa11y-exclude");

        /* Mini function if you need to exclude any text contained with a span. We created this function to ignore automatically appended sr-only text for external links and document filetypes.

        $.fn.ignore = function(sel){
          return this.clone().find(sel||">*").remove().end();
        };

        Example: If you need to ignore any text within <span class="sr-only">test</span>.
            $el.ignore("span.sr-only").text().trim();

        */

        $links.each((i, el) => {
            let $el = $(el);
            var linktext = $el.text();
            var hasarialabelledby = $el.attr("aria-labelledby");
            var hasarialabel = $el.attr("aria-label");
            var hasariahidden = $el.attr("aria-hidden");
            var hastabindex = $el.attr("tabindex");

            // error is any words that are making this link text inaccessible.
            var error = this.containsLinkTextStopWords($el.text().trim());

            // Tests to see if this link is empty
            if ($el.children().length == 0 && $el.attr('href') !== undefined && $el.text().length == 0 && $el.is(':visible')) {
                this.noErrors = false;
                LinkErrorMessage = "Found an empty hyperlink without any text!"
                $el.addClass("sa11y-error-text");
                $el.after(startInline + errorBtnText + LinkErrorMessage + end);
            }
            // if link contains any link text stop words, then it fails.
            else if (error != null) {

                if (hasarialabelledby != null) {
                    var acclinkname = document.getElementById(hasarialabelledby).textContent;
                    var LinkHasAriaLabelledby = "The descriptive label for this link is: <span class='sa11y-bold'>" + linktext + " " + acclinkname + "</span>"
                    $el.after(startInline + passBtnText + LinkHasAriaLabelledby + end);
                } else if (hasarialabel != null) {
                    LinkHasAriaLabel = "The descriptive label for this link is: <span class='sa11y-bold'>" + hasarialabel + "</span>"
                    $el.after(startInline + passBtnText + LinkHasAriaLabel + end);
                } else if (hasariahidden == "true" && hastabindex == "-1") {
                    //do nothing.
                } else {
                    this.noErrors = false;
                    $el.addClass("sa11y-error-text");
                    StopWordMessage = "Link text may not be descriptive enough, consider changing word: <span class='sa11y-red-text sa11y-bold'>" + error + "</span><hr aria-hidden='true' class='sa11y-hr'><span class='sa11y-bold'>Tip!</span> Link text should always be unique and meaningful so it could be understood out of context."
                    $el.after(startInline + errorBtnText + StopWordMessage + end);
                }
            }
        });
    };

    // Checks if text is not descriptive and returns the word(s) that are making the text inaccessible.
    //showStopper words will always flag an issue if contained in a hyperlink.
    //partialStopWords will only be flagged as an issue if it's the only hyperlink text.
    this.containsLinkTextStopWords = function (textContent) {

        let stopWords = ["click here", "<", ">", "http://", "https://", ".aspx", ".html", ".php", "here."];
        let partialStopWords = ["learn more", "learn", "more", "register", "register now", "this page", "check out", "learn to", "view", "view our", "read more", ".", ",", ":", "page", "this page", "download", "form", "link", "here", "this"];
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
                if (textContent.length === word.length && textContent.toLowerCase().indexOf(word) >= 0) {
                    hit = word;
                    return false;
                }
            });
        }
        return hit;
    };

    /*======================== CONTRAST MODULE =======================*/
    /* Thanks to jasonday for this plugin https://www.jqueryscript.net/other/color-contrast-checker.html */
    this.checkContrast = function () {
        if (this.showingContrast) {
            this.showingContrast = false;
        } else {
            this.outlineContrast();
            this.showingContrast = true;
        }
    };

    // Outlines inaccessible link texts with a red border and a tooltip for remediation solution.
    this.outlineContrast = function () {

        var contrastErrors = {
            errors: [],
            warnings: []
        };
        var contrast = {
            // Parse rgb(r, g, b) and rgba(r, g, b, a) strings into an array.
            // Adapted from https://github.com/gka/chroma.js
            parseRgb: function (css) {
                var i, m, rgb, _i, _j;
                if (m = css.match(/rgb\(\s*(\-?\d+),\s*(\-?\d+)\s*,\s*(\-?\d+)\s*\)/)) {
                    rgb = m.slice(1, 4);
                    for (i = _i = 0; _i <= 2; i = ++_i) {
                        rgb[i] = +rgb[i];
                    }
                    rgb[3] = 1;
                } else if (m = css.match(/rgba\(\s*(\-?\d+),\s*(\-?\d+)\s*,\s*(\-?\d+)\s*,\s*([01]|[01]?\.\d+)\)/)) {
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
                    lum.push(v < 0.03928 ? v / 12.92 : Math.pow((v + 0.055) / 1.055, 2.4));
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
                var bgColor = el.css('background-color');
                var bgImage = el.css('background-image');

                if (bgColor !== 'rgba(0, 0, 0, 0)' && bgColor !== 'transparent' && bgImage === "none") {
                    return bgColor;
                } else if (bgImage !== "none") {
                    return "image";
                }

                if (el.is('html')) {
                    return 'rgb(255, 255, 255)';
                } else {
                    return contrast.getBackground(el.parent());
                }
            },
            check: function () {
                $('*:visible').not('.sa11y-exclude').not('.sa11y-exclude *').not('#sa11y-container *').not('[class*="sa11y"]').each(function () {
                    var $this = $(this),
                        color = $this.css('color'),
                        background = contrast.getBackground($this),
                        htmlTag = $this[0].tagName,
                        textCheck = $this.clone().children().remove().end().text(),
                        ratingString,
                        fontSizeString,
                        failed;

                    if (htmlTag === "SVG") {
                        var fill = $this.css('fill'),
                            ratio = Math.round(contrast.contrastRatio(fill, background) * 100) / 100,
                            ratioText = ratio + ':1';
                        if (ratio < 3) {
                            failed = true;
                            fontSizeString = "svg fill";
                            ratingString = "fail"
                        }
                    } else if ($.trim(textCheck).length || htmlTag === "INPUT" || htmlTag === "SELECT" || htmlTag === "TEXTAREA") {
                        // does element have a background image - needs to be manually reviewed
                        if (background === "image") {
                            var ratioText = "unknown";
                            ratingString = "Needs manual review";
                            fontSizeString = "N/A";
                            failed = true;
                        } else {
                            var ratio = Math.round(contrast.contrastRatio(color, background) * 100) / 100,
                                ratioText = ratio + ':1',
                                fontSize = parseInt($this.css('fontSize')),
                                fontWeight = $this.css('fontWeight');

                            if (($this.width() <= 1 || $this.height() <= 1) && $this.css("overflow") == 'hidden') {
                                /*Really unscientific condition of ignoring visually hidden screen reader text.
                                If width and height of element is less than 1px and overflow is set to hidden,
                                do not run contrast check on it...*/
                            } else if (fontSize >= 18 || (fontSize >= 14 && fontWeight >= 700)) {
                                fontSizeString = 'Large scale text'
                                if (ratio < 3) {
                                    ratingString = 'fail';
                                    failed = true;
                                } else {
                                    ratingString = 'pass';
                                    failed = false;
                                }
                            } else {
                                fontSizeString = 'Normal scale body text'
                                if (ratio < 4.5) {
                                    ratingString = 'fail';
                                    failed = true;
                                } else {
                                    ratingString = 'pass';
                                    failed = false;
                                }
                            }
                        }
                    }

                    // highlight the element in the DOM and log the element, contrast ratio and failure
                    // for testing in console
                    if (failed) {
                        var error = {};
                        error = {
                            name: $this,
                            ratio: ratioText,
                            detail: fontSizeString,
                            status: ratingString
                        }
                        if (ratingString === "fail") {
                            contrastErrors.errors.push(error);
                        } else if (ratingString === "Needs manual review") {
                            contrastErrors.warnings.push(error);
                        }
                    }
                });

                return contrastErrors;
            }
        }

        contrast.check();
        $.each(contrastErrors.errors, (index, item) => {
            var name = item.name;
            var cdetail = item.detail;
            var cratio = item.ratio;
            var nodename = name[0].nodeName;
            var nodetext = name[0].textContent;
            this.noErrors = false;
            ContrastError = "" + cdetail + " does not have enough contrast with the background. The contrast ratio should be at least 4.5:1 for normal text and 3:1 for large text. <hr class='sa11y-hr' aria-hidden='true'> The contrast ratio is <span class='sa11y-red-text sa11y-bold'>" + cratio + "</span> for the following text: <span class='sa11y-bold sa11y-red-text'>" + nodetext + "</span>"
            $(name).before(start + errorBtnText + ContrastError + end);
        });

        $.each(contrastErrors.warnings, (index, item) => {
            var name = item.name;
            var nodetext = name[0].textContent;
            this.anyWarning = true;
            ContrastWarning = "The contrast of this text is unknown and needs to be manually reviewed. Ensure the text and the background have strong contrasting colours. The contrast ratio should be at least 4.5:1 for normal text and 3:1 for large text. <hr class='sa11y-hr' aria-hidden='true'>Please review contrast of the following text:<br> <span class='sa11y-bold'>" + nodetext + "</span>"
            $(name).addClass('sa11y-warning-border').before(start + warningBtnText + end);
        });
    };

    /*======================== INPUTS MODULE =======================*/
    this.checkLabels = function () {
        if (this.showingLabels) {
            this.showingLabels = false;
        } else {
            this.outlineLabels();
            this.showingLabels = true;
        }
    };

    /* Outlines inaccessible input and form fields. */
    this.outlineLabels = function () {
        let $inputs = $("input").not("input:hidden");
        $inputs.each((i, el) => {
            let $el = $(el);

            if (!$el.attr('id') && !$el.attr('aria-label') && !$el.attr('aria-labelledby')) {
                this.noErrors = false;
                $el.addClass("sa11y-error-border");
                MissingLabelError = "There is no label associated with this input. Please add an <kbd>id</kbd> to this input, and add a matching <kbd>for</kbd> attribute to the label."
                $el.after(startInline + errorBtnText + MissingLabelError + end);
            } else if ($el.attr('aria-label')) {
                /*Optional: add pass border.*/
            } else if ($el.prev().is("label")) {

                label = $el.prev();
                if (label.attr('for') == $el.attr('id')) {
                    /*Optional: add pass border.*/
                } else {
                    this.noErrors = false;
                    $el.addClass("sa11y-error-border");
                    NoForAttributeError = "There is no label associated with this input. Add a <kbd>for</kbd> attribute to the label that matches the <kbd>id</kbd> of this input. <hr class='sa11y-hr' aria-hidden='true'> The ID for this input is: <span class='sa11y-bold'>id=&#34;" + $el.attr('id') + "&#34;</span>"
                    $el.after(startInline + errorBtnText + NoForAttributeError + end);
                }
            }
        });
    };

    /*================== ALTERNATIVE TEXT MODULE ====================*/

    // Toggles the outline of images.
    this.checkAltText = function () {
        if (this.showingAltText) {
            this.clearEverything();
            this.showingAltText = false;
        } else {
            this.outlineAltText();
            this.showingAltText = true;
        }
    };

    this.outlineAltText = function () {

        let $images = $("body").find("img").not(".sa11y-exclude");
        /* Example: Find all images within the main content area only, and exclude images containing a path.*/

        // Test each image for alternative text.
        $images.each((i, el) => {
            let $el = $(el);
            let text = $el.attr("alt");

            // Checks to see if image contains an alt attribute. If not, then image fails.
            if (text == undefined) {
                this.noErrors = false;

                // Image fails if it is used as a link and is missing an alt attribute.
                //if ($el.parent().prop("tagName") == "A") {
                if ($el.parents().is("a[href]")) {

                    //Image contains both hyperlink
                    if ($el.parents("a").text().trim().length > 1) {
                        $el.addClass("sa11y-error-border");
                        MissingAltLinkButHasTextError = "Image is being used as a hyperlink with surrounding text, although the alt attribute should be marked as decorative or null."
                        $el.closest("a").before(startInline + errorBtn + MissingAltLinkButHasTextError + end);
                    } else if ($el.parents("a").text().trim().length == 0) {
                        $el.addClass("sa11y-error-border");
                        MissingAltLinkError = "Image is being used as a hyperlink but is missing alt text! Please ensure alt text describes where the link takes you."
                        $el.closest('a').before(startInline + errorBtn + MissingAltLinkError + end);
                    }

                }
                // General failure message if Image is missing an alt attribute.
                else {
                    $el.addClass("sa11y-error-border");
                    GeneralAltText = "Missing alt text! If the image conveys a story, a mood or important information - be sure to describe the image."
                    $el.before(start + errorBtn + GeneralAltText + end);
                }
            }

            // If alt attribute is present, further tests are done.
            else {
                let altText = text.replace(/'/g, "&#39;"); //replace apostrophe with HTML ascii to prevent breaking popover.
                let error = this.containsAltTextStopWords(altText);
                let altLength = text.length;

                // Image fails if a stop word was found
                if (error != null && $el.parents().is("a[href]")) {
                    this.noErrors = false;
                    $el.addClass("sa11y-error-border");
                    LinkedImageHasBadAltWord = "Detected poor alt text in hyperlinked image. Ensure alt text describes destination of link, not a literal description of the picture. Remove word: <span class='sa11y-red-text sa11y-bold'>" + error + "</span>. <hr aria-hidden='true' class='sa11y-hr'> The alt text for this image is: <span class='sa11y-bold'>" + altText + "</span>"

                    $el.closest('a').before(startInline + errorBtn + LinkedImageHasBadAltWord + end);
                } else if (error != null) {
                    this.noErrors = false;
                    $el.addClass("sa11y-error-border");
                    AltHasBadWord = "Poor alt text found. It is not necessary to include words like <em>image</em>, <em>graphic</em> or the file extension. Consider removing the word: <span class='sa11y-red-text sa11y-bold'>" + error + "</span>. <hr aria-hidden='true' class='sa11y-hr'> The alt text for this image is: <span class='sa11y-bold'>" + altText + "</span>"
                    $el.before(startInline + errorBtn + AltHasBadWord + end);
                } else if (text == "" && $el.parents().is("a[href]")) {
                    if ($el.parents("a").text().trim().length == 0) {
                        this.noErrors = false;
                        $el.addClass("sa11y-error-border");
                        ImageLinkNullAltNoText = "Image within hyperlink is marked as decorative and there is no link text. Please add alt text to image that describes destination of link."
                        $el.closest('a').before(startInline + errorBtn + ImageLinkNullAltNoText + end);
                    } else {
                        LinkHasAltMessage = "Image is marked as decorative, although the hyperlink is using the surrounding text as a descriptive label."
                        $el.closest('a').before(startInline + passBtn + LinkHasAltMessage + end);
                    }
                }

                // Image warning if it is decorative and is not a link.
                else if (text == "" && $el.parents().not("a[href]")) {
                    DecorativePassMessage = "Image marked as <span class='sa11y-bold'>decorative.</span> However, if the image conveys a story, a mood or important information - be sure to add alt text."
                    $el.before(start + passBtn + DecorativePassMessage + end);
                }

                // Image warning if it is a link and contains an alt text.
                else if (text.length > 160 && $el.parents().is("a")) {
                    this.noErrors = false;
                    $el.addClass("sa11y-error-border");
                    HyperlinkAltLengthWarning = "Alt text description on hyperlinked image is <span class='sa11y-bold'>too long</span>. The alt text on hyperlinked images should describe where the link takes you, not a literal description of the image. <span class='sa11y-bold'>Consider using the title of the page it links to as the alt text.</span> <hr aria-hidden='true' class='sa11y-hr'> The alt text is <span class='sa11y-red-text sa11y-bold'>" + altLength + "</span> characters: <span class='sa11y-red-text sa11y-bold'>" + altText + "</span>"
                    $el.closest('a').before(startInline + errorBtn + HyperlinkAltLengthWarning + end);
                }

                // Image warning if it is a link and contains an alt text.
                else if (text != "" && $el.parents().is("a") && $el.parents("a").text().trim().length == 0) {
                    this.anyWarning = true;
                    $el.addClass("sa11y-warning-border");
                    ImageLinkAltTextWarning = "Image link contains alt text, although please ensure alt text describes the destination page. <span class='sa11y-bold'>Consider using the title of the page it links to as the alt text.</span> Does the alt text describe where the link takes you? <hr aria-hidden='true' class='sa11y-hr'>Alt text: <span class='sa11y-bold'>" + altText + "</span>"
                    $el.closest('a').before(startInline + warningBtn + ImageLinkAltTextWarning + end);
                }

                // Image warning if it is a link, contains alt text AND surrounding link text.
                else if (text != "" && $el.parents().is("a") && $el.parents("a").text().trim().length > 1) {
                    this.anyWarning = true;
                    $el.addClass("sa11y-warning-border");
                    AnchorLinkAndAlt = "Image link contains <span class='sa11y-bold'>both alt text and surrounding link text.</span> If this image is decorative and is being used as a functional link to another page, consider marking the image as decorative or null - the surrounding link text should suffice. <hr aria-hidden='true' class='sa11y-hr'>Alt text: <span class='sa11y-bold'>" + altText + "</span>"
                    $el.closest('a').before(startInline + warningBtn + AnchorLinkAndAlt + end);
                }

                // Image error if alt text is too long.
                else if (text.length > 160) {
                    this.anyWarning = true;
                    $el.addClass("sa11y-warning-border");
                    AltTooLong = "Alt text description is <span class='sa11y-bold'>too long</span>. Alt text should be concise, yet meaningful like a <em>tweet</em> (around 100 characters). If this is a complex image or a graph, consider putting the long description of the image in text below or in an accordion component. <hr aria-hidden='true' class='sa11y-hr'> The alt text is <span class='sa11y-red-text sa11y-bold'>" + altLength + "</span> characters: <span class='sa11y-red-text sa11y-bold'>" + altText + "</span>"
                    $el.before(start + warningBtn + AltTooLong + end);
                }

                // Image pass if it contains alt text.
                else if (text != "") {
                    PassAltMessage = "The alt text for this image is: <span class='sa11y-bold'>" + altText + "</span>"
                    $el.before(start + passBtn + PassAltMessage + end);
                }
            }
        });
    };

    // Checks if text is not descriptive and returns the word(s) that are making the text inaccessible.
    this.containsAltTextStopWords = function (textContent) {
        let stopWords = [".png", "DSC", ".jpg", ".jpeg", "image of", "graphic of", "picture of", "placeholder"];
        var hit = null;
        $.each(stopWords, function (index, word) {
            if (textContent.toLowerCase().indexOf(word) >= 0) {
                hit = word;
                return word;
            }
        });
        return hit;
    };

    /*================== QUALITY ASSURANCE MODULE ===================*/

    this.checkQA = function () {
        if (this.showingQA) {
            this.clearEverything();
            this.showingQA = false;
        } else {
            this.outlineQA();
            this.showingQA = true;
        }
    };

    this.outlineQA = function () {

        //Warn users to provide captions for videos.
        let $findVideos = $("video, iframe[src*='youtube.com'], iframe[src*='vimeo.com']");
        $findVideos.each((i, el) => {
            let $el = $(el);
            this.anyWarning = true;
            $el.addClass("sa11y-warning-border");
            MissingCaptionsWarning = "Please ensure <span class='sa11y-bold'>all videos have closed captioning.</span> Providing captions for all audio and video content is a mandatory Level A requirement. Captions are meant to support people who are D/deaf or hard-of-hearing."
            $el.before(start + warningBtn + MissingCaptionsWarning + end);
        });

        //Warning: Make sure all podcasts have captions.
        var soundcloudWarning = $('audio, iframe[src*="soundcloud.com"], iframe[src*="simplecast.com"], iframe[src*="podbean.com"], iframe[src*="buzzsprout.com"], iframe[src*="blubrry.com"], iframe[src*="transistor.fm"], iframe[src*="fusebox.fm"], iframe[src*="libsyn.com"]');
        if (soundcloudWarning.length > 0) {
            this.anyWarning = true;
            soundcloudWarning.addClass("sa11y-warning-border");
            SoundCloudMessage = "Please ensure to provide a <span class='sa11y-bold'>transcript for all podcasts.</span> Providing transcripts for audio content is a mandatory Level A requirement. Transcripts are meant to support people who are D/deaf or hard-of-hearing, but can benefit everyone. Consider placing the transcript below or within an accordion panel."
            soundcloudWarning.before(start + warningBtn + SoundCloudMessage + end);
        }

        //Warning: Check Google Data Studio/Tableau widget.
        var dataStudioWarning = $('iframe[src*="datastudio.google.com"], iframe[src*="tableau"]');
        if (dataStudioWarning.length > 0) {
            this.anyWarning = true;
            dataStudioWarning.addClass("sa11y-warning-border");
            DataStudioWarningMessage = "Data visualization widgets like this are often problematic for people who use a keyboard or screen reader to navigate, and can present significant difficulties for people with low vision or colorblindness. It's recommended to provide the same information in an alternative (text or table) format below the widget."
            dataStudioWarning.before(start + warningBtn + DataStudioWarningMessage + end);
        }

        //Warning: Discourage use of Twitter timelines.
        let $twitterWarning = $('[id^=twitter-widget]');
        $twitterWarning.each((i, el) => {
            let $el = $(el);
            var numberofTweets = $el.contents().find(".timeline-TweetList-tweet").length;
            if (numberofTweets > 3) {
                this.anyWarning = true;
                $el.addClass("sa11y-warning-text");
                TwitterError = "The default Twitter timeline may cause accessibility issues for keyboard users. Secondly, the inline scrolling of the Twitter timeline may cause usability issues for mobile. It's recommended to add the following data attributes to the embed code. <hr aria-hidden='true' class='sa11y-hr'><span class='sa11y-bold'>It's recommended to:</span><ul><li>Add <kbd>data-tweet-limit=&#34;2&#34;</kbd> to limit the amount of tweets.</li><li>Add <kbd>data-chrome=&#34;nofooter noheader&#34;</kbd> to remove the widget's header and footer.</li></ul>"
                $el.before(start + warningBtnText + TwitterError + end);
            }
        });

        // Warn users of TARGET BLANK within main content.
        let $linksTargetBlank = $("a[target='_blank']").not("a[href$='.pdf']").not("a[href$='.docx']").not("#sa11y-container a").not(".sa11y-exclude");
        $linksTargetBlank.each((i, el) => {
            let $el = $(el);

            //Do not add warning if they included new tab or new window within link text.
            var passWordsNewWindow = ["new tab", "new window"];
            var containsPassWordsNewWindow = passWordsNewWindow.some(function (pass) {
                return $el.text().toLowerCase().indexOf(pass) >= 0;
            });

            if ($el && !containsPassWordsNewWindow) {
                this.anyWarning = true;
                $el.addClass("sa11y-warning-text");
                WarningNewTab = "Please use <span class='sa11y-bold'>target=&ldquo;_blank&rdquo;</span> sparingly. Opening links in new tabs or windows can be very disorienting for people, especially for people who have difficulty perceiving visual content. Secondly, it's not always a good practice to control a user's experience or make decisions for them. Alert the user that the link opens in a new window within the link text."
                $el.first().after(startInline + warningBtnText + WarningNewTab + end);
            }
        });

        //Error: Find all links pointing to development environment. Customize as needed.
        let $badDevLinks = $("body").find("a[href^='https://www.dev.'], a[href*='wp-admin']");
        $badDevLinks.each((i, el) => {
            let $el = $(el);
            this.noErrors = false;
            $el.addClass("sa11y-error-text");
            BadLinkMessage = "Bad link found. Link appears to point to a development environment. Make sure the link does not contain <em>dev</em> or <em>wp-admin</em> in the URL. <hr aria-hidden='true' class='sa11y-hr'>This link points to: <br><span class='sa11y-bold sa11y-red-text'>" + el + "</span>"
            $el.after(startInline + errorBtnText + BadLinkMessage + end);
        });

        //Warning: Find all PDFs. Although only append warning icon to first PDF on page.
        var checkPDF = $("a[href$='.pdf']");
        let firstPDF = $("a[href$='.pdf']:first");
        if (checkPDF.length > 0) {
            this.anyWarning = true;
            checkPDF.addClass("sa11y-warning-text");
            checkPDF.has("img").removeClass("sa11y-warning-text");
            WarningPDFMessage = "PDFs are considered web content and must be made accessible as well. PDFs often contain issues for people who use screen readers (missing structural tags or missing form field labels) and people with low vision (text does not reflow when enlarged). If this PDF is a form, consider using an accessible HTML form as an alternative. If this PDF is a document, consider converting it into a web page. Otherwise, please <span class='sa11y-bold'>check PDF for accessibility in Acrobat DC.</span>"
            firstPDF.after(startInline + warningBtnText + WarningPDFMessage + end);
        }

        //Warning: Detect uppercase.
        let $uppercaseDetection = $('h1, h2, h3, h4, h5, h6, p, li:not([class^="sa11y"]), span, blockquote');

        var UppercaseWarning = "ALL CAPS DETECTED. Avoid typing sentences or phrases in ALL CAPITALS. Some screen readers interpret all capital text as an acronym and will read each letter individually. Additionally, all caps are more difficult to read and give the appearance of SHOUTING."

        var uppercasePattern = /(?!<a[^>]*?>)(\b[A-Z]['!:A-Z\s]{15,}|\b[A-Z]{15,}\b)(?![^<]*?<\/a>)/g;

        var replaceUppercase = '<span class="sa11y-warning-uppercase">$1</span>' + startInline + warningBtnText + UppercaseWarning + end;

        $uppercaseDetection.each(function(){
            $(this).html($(this).html().replace(uppercasePattern,replaceUppercase));
        });

        if ($(".sa11y-warning-uppercase").length > 0) {
          this.anyWarning = true;
        };

        //Check for blockquotes used as headings. If it's less than 25 characters - it's definitely not a quote.
        let $blockquotes = $("blockquote");
        $blockquotes.each((i, el) => {
            let $el = $(el);
            if ($el.text().trim().length < 25) {
                this.noErrors = false;
                $el.addClass("sa11y-error-border")
                BlockquoteError = "Blockquotes should be used for quotes only. They should never be used as headings. Please replace with a semantic heading (e.g. Heading 2 or Heading 3)."
                $el.before(start + errorBtnText + BlockquoteError + end);
            }
        });

        //Check if a table has a table header.
        let $tablesCheck = $("body").find("table");
        $tablesCheck.each((i, el) => {
            let $el = $(el);
            let findTHeaders = $el.find("th");
            let findHeadingTags = $el.find("h1, h2, h3, h4, h5, h6");
            if (findTHeaders.length == 0) {
                this.noErrors = false;
                $el.addClass("sa11y-error-border");
                MissingHeadingsError = "Missing table headers! Accessible tables need HTML markup that indicates header cells and data cells which defines their relationship. This information provides context to people who use assistive technology. Tables should be used for tabular data only."
                $el.before(start + errorBtnText + MissingHeadingsError + end);
            }
            if (findHeadingTags.length > 0) {
                findHeadingTags.addClass("sa11y-error-heading");
                findHeadingTags.parent().addClass("sa11y-error-border");
                SemanticHeadingTableError = "Semantic headings such as Heading 2 or Heading 3 should only be used for sections of content; <span class='sa11y-bold'>not</span> in HTML tables. Indicate table headings using the <span class='sa11y-bold'>th</span> element instead."
                findHeadingTags.before(start + errorBtnText + SemanticHeadingTableError + end);
            }
        });

        //Make sure all table headers are not empty.
        let $thCheck = $("th");
        $thCheck.each((i, el) => {
            let $el = $(el);
            if ($el.text().trim().length < 1) {
                $el.addClass("sa11y-error-border");
                EmptyTableHeaderError = "Empty table header found! Table headers should <em>never</em> be empty. It is important to designate row and/or column headers to convey their relationship. This information provides context to people who use assistive technology. Please keep in mind that tables should be used for tabular data only."
                $el.append(start + errorBtnText + EmptyTableHeaderError + end);
            }
        });

        //Error: Check for duplicate IDs.
        var ids = {};
        var found = false;
        $('[id]').each(function () {
            if (this.id && ids[this.id]) {
                found = true;
                this.noErrors = false;
                $(this).addClass("sa11y-error-text");
                DuplicateIDMessage = "Found <span class='sa11y-bold'>duplicate ID</span>. Duplicate ID errors are known to cause problems for assistive technologies when they are trying to interact with content. <hr aria-hidden='true' class='sa11y-hr'>Please remove or change the following ID: <span class='sa11y-bold sa11y-red-text'>" + this.id + "</span>"
                $(this).before(startInline + errorBtnText + DuplicateIDMessage + end);
            }
            ids[this.id] = 1;
        });

        //Error: Missing language tag. Lang should be at least 2 characters.
        var lang = $("html").attr("lang");
        if ($("html").attr("lang") == undefined || $("html").attr("lang").length < 2) {
            this.noErrors = false;
            $('#sa11y-container').after("<div class='sa11y-error-message'><span class='sa11y-visually-hidden'>Error:</span> Page language not declared! Please <a href='https://www.w3.org/International/questions/qa-html-language-declarations' target='_blank'>declare language on HTML tag.<span class='sa11y-visually-hidden'>(opens new window)</span></a></div>");
        }

        //Error: Never set user-scalable to 0.
        var userScalable = $("meta").attr("user-scalable");
        if (userScalable == "no" || userScalable == "0" || $("meta[content~='user-scalable=no']").length > 0) {
            this.noErrors = false;
            $('#sa11y-container').after("<div class='sa11y-error-message'><span class='sa11y-visually-hidden'>Error:</span> Remove <span class='sa11y-bold'>user-scalable=&quot;no&quot;</span> paramater from the meta element to allow zooming. This can be very problematic for people with low vision!</div>");
        }

        //Example ruleset. Be creative.
        var checkAnnouncement = $('.announcement-component').length;
        if (checkAnnouncement > 1) {
            this.anyWarning = true;
            WarningMessage = 'More than one Announcement component found! The Announcement component should be used strategically and sparingly. It should be used to get attention or warn users about something important. Misuse of this component makes it less effective or impactful. Secondly, this component is semantically labeled as an Announcement for people who use screen readers.'
          $('.announcement-component:gt(0)').addClass("sa11y-warning-border");
          $('.announcement-component:gt(0)').before(start + warningBtn + WarningMessage + end);
        }
    }
}

/*========================== License ============================*/
/* MIT License (MIT)
Copyright (c) 2020 Ryerson University

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.

View full license & acknowledgements: https://github.com/ryersondmp/sa11y/blob/master/LICENSE.md */
