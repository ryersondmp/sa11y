function ButtonInserter(type, content, inline = false) {
    ValidTypes = new Set([ERROR, WARNING, PASS]);
    ButtonLang = {
        [ERROR]: sa11yErrorLang,
        [WARNING]: sa11yWarningLang,
        [PASS]: sa11yPassLang,
    };
    CSSName = {
        [ERROR]: 'error',
        [WARNING]: 'warning',
        [PASS]: 'pass',
    };
    // TODO: Discuss Throwing Errors.
    if (!ValidTypes.has(type)) {
        throw Error;
    }
    return `
        <div class=${inline ? 'sa11y-instance-inline' : 'sa11y-instance'}>
            <button   
            aria-label=${ButtonLang[type]} 
            class="sa11y-btn 
            sa11y-${CSSName[type]}-btn${inline ? '-text' : ''}" 
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
    return `<div class="sa11y-error-message-container">
        <div class="sa11y-error-message" lang="${sa11yLangCode}">
            ${content}
        </div>
    </div>`;
}

function reset(root) {
    this.panelActive = false;
    root.find('.sa11y-error-border').removeClass('sa11y-error-border');
    root.find('.sa11y-error-heading').removeClass('sa11y-error-heading');
    root.find('.sa11y-error-message-container').remove();
    root.find('.sa11y-error-text').removeClass('sa11y-error-text');

    root.find('.sa11y-warning-border').removeClass('sa11y-warning-border');
    root.find('.sa11y-warning-text').removeClass('sa11y-warning-text');
    root.find('.sa11y-warning-uppercase').contents().unwrap();
    root.find('p').removeClass('sa11y-fake-list');

    root.find('.sa11y-instance').remove();
    root.find('.sa11y-instance-inline').remove();
    root.find('.sa11y-heading-label').remove();
    root.find('#sa11y-panel').removeClass('sa11y-active');
    root.find('#sa11y-outline-list li').remove();
    root.find('#sa11y-readability-content').remove();
    root.find('.sa11y-readability-period').remove();

    $('#sa11y-panel-content').removeClass();
    $('#sa11y-status').text();
    $('#sa11y-outline-toggle').off('click');
    $('#sa11y-settings-toggle').off('click');
}
function scanpage(root, displayPanel) {
    this.root = root;
    // ============================================================
    // loadGlobals
    // Stores the list of elements to ignore based on configuration
    // ============================================================
    this.loadGlobals = () => {
        // Look for a content container
        if (typeof sa11yCheckRoot !== 'string' || $(sa11yCheckRoot).length === 0) {
            sa11yCheckRoot = 'body';
        }
        // Combine default and custom ignores.
        let separator = ', ';
        // Container ignores apply to self and children.
        if (sa11yContainerIgnore.length > 0) {
            let containerSelectors = sa11yContainerIgnore.split(',');
            for (let i = 0; i < containerSelectors.length; i++) {
                containerSelectors[i] = containerSelectors[i] + ' *, ' + containerSelectors[i];
            }
            sa11yContainerIgnore = '[aria-hidden]' + separator + containerSelectors.join();
        } else {
            sa11yContainerIgnore = '[aria-hidden]';
        }
        this.containerIgnore = sa11yContainerIgnore;
        // Images ignore defaults plus presentation role.
        if (sa11yImageIgnore.length > 1) {
            sa11yImageIgnore += separator;
        }
        this.imageIgnore =
            sa11yImageIgnore + this.containerIgnore + separator + "[role='presentation']";

        this.headerIgnore = sa11yHeaderIgnore;
        // Links ignore defaults plus sa11y links.
        if (sa11yLinkIgnore.length > 0) {
            sa11yLinkIgnore += separator;
        }
        this.linkIgnore = sa11yLinkIgnore + sa11yContainerIgnore + separator + '[aria-hidden]';
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
    this.findElements = () => {
        let { root, containerIgnore, imageIgnore } = this;
        this.$p = root.find('p').not(containerIgnore);
        this.$h = root
            .find("h1, h2, h3, h4, h5, h6, [role='heading'][aria-level]")
            .not(':hidden')
            .not(containerIgnore);
        this.$mainPandLi = root
            .find("main p, main li, [role='main'] p, [role='main'] li")
            .not(containerIgnore);
        this.$img = root.find('img').not(imageIgnore);
        this.$iframe = root.find('iframe').not(containerIgnore);
        this.$table = root.find('table').not(containerIgnore);
        this.$contrast = root
            .find('*:visible')
            .not('.sa11y-exclude *')
            .not('#sa11y-container *')
            .not(containerIgnore);
    };

    // ============================================================
    // Headers
    // ============================================================
    this.checkHeaders = async () => {
        let prevLevel;
        this.$h.each((i, el) => {
            let $el = $(el);
            let level;

            if ($el.attr('aria-level')) {
                level = +$el.attr('aria-level');
            } else {
                level = +$el[0].tagName.slice(1);
            }

            let headingLength = $el.text().trim().length;
            let error = null;

            if (level - prevLevel > 1 && i !== 0) {
                error = IM['h']['nonconsecLevel'](prevLevel, level);
            } else if ($el.text().trim().length < 1) {
                error = IM['h']['emptyHeading'](level);
                $el.addClass('sa11y-error-text');
            } else if ($el.text().trim().length > 170) {
                error = IM['h']['headingTooLong'](headingLength);
            } else if (i === 0 && level !== 1 && level !== 2) {
                error = IM['h']['firstHeading']();
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
                    `<span class='sa11y-heading-label'>H${level}</span>`,
                );
                if (error != null && $el.closest('a').length > 0) {
                    this.errorCount++;
                    $el.addClass('sa11y-error-heading');
                    $el.closest('a').after(ButtonInserter(ERROR, error, true));
                    $('#sa11y-outline-list').append(liError);
                } else if (error != null) {
                    this.errorCount++;
                    $el.addClass('sa11y-error-heading');
                    $el.before(ButtonInserter(ERROR, error, true));
                    $('#sa11y-outline-list').append(liError);
                } else if (error == null) {
                    $('#sa11y-outline-list').append(li);
                }
            }
        });

        //Check to see there is at least one H1 on the page.
        let $h1 = this.root.find("h1, [role='heading'][aria-level='1']").not(this.containerIgnore);
        if ($h1.length === 0) {
            this.errorCount++;

            //To-do: Make this a little prettier
            $('#sa11y-outline-header').after(
                `<div class='sa11y-instance sa11y-missing-h1'>
                    <span class='sa11y-badge sa11y-error-badge'><span aria-hidden='true'>&#10007;</span><span class='sa11y-visually-hidden'>${sa11yErrorLang}</span></span> 
                    <span class='sa11y-red-text sa11y-bold'>Missing Heading 1!</span>
                </div>`,
            );

            let issueText = IM['h']['missingHeadingOne']();
            $('#sa11y-container').after(ErrorBannerInsert(issueText));
        }
    };

    // ============================================================
    // LinkText
    // ============================================================
    this.checkLinkText = function () {
        /* Mini function if you need to exclude any text contained with a span. We created this function to ignore automatically appended sr-only text for external links and document filetypes.

    $.fn.ignore = function(sel){
    return this.clone().find(sel||">*").remove().end();
    };


    Example: If you need to ignore any text within <span class="sr-only">test</span>.
    $el.ignore("span.sr-only").text().trim(); */

        let containsLongUrl = function (textContent) {
            let urlText = ['http', '.asp', '.htm', '.php', '.edu/', '.com/'];

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
            let stopWords = ['click here', '< ', ' >'];

            let partialStopWords = [
                'click',
                'click here to learn more',
                'check out',
                'download',
                'download here',
                'find out',
                'find out more',
                'form',
                'here',
                'info',
                'information',
                'link',
                'learn',
                'learn more',
                'learn to',
                'more',
                'page',
                'paper',
                'read more',
                'read',
                'read this',
                'this',
                'this page',
                'this website',
                'view',
                'view our',
                'website',
                '.',
                ',',
                ':',
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
        let $links = this.root.find('a[href]').not(this.linkIgnore);

        const issueMessage = IM['linktext'];
        $links.each((i, el) => {
            let $el = $(el);
            var linkText = $el.text();
            var hasAriaLabelledBy = $el.attr('aria-labelledby');
            var hasAriaLabel = $el.attr('aria-label');
            var hasAriaHidden = $el.attr('aria-hidden');
            var hasTabIndex = $el.attr('tabindex');
            var error = containsLinkTextStopWords($el.text().trim());
            var errorURL = containsLongUrl($el.text().trim());

            if (
                $el.children().length == 0 &&
                $el.attr('href') !== undefined &&
                $el.text().length == 0 &&
                $el.is(':visible')
            ) {
                this.errorCount++;
                $el.addClass('sa11y-error-text');
                $el.after(ButtonInserter(ERROR, issueMessage['linkErrorMessage'](), true));
            } else if (error != null) {
                if (hasAriaLabelledBy != null) {
                    var acclinkname = document.getElementById(hasAriaLabelledBy).textContent;
                    $el.after(
                        ButtonInserter(
                            PASS,
                            issueMessage['linkHasAriaLabelledbyMessage'](linkText, acclinkname),
                            true,
                        ),
                    );
                } else if (hasAriaLabel != null) {
                    $el.after(
                        ButtonInserter(
                            PASS,
                            issueMessage['linkHasAriaLabelMessage'](hasAriaLabel),
                            true,
                        ),
                    );
                } else if (hasAriaHidden == 'true' && hasTabIndex == '-1') {
                    //do nothing.
                } else {
                    this.errorCount++;
                    $el.addClass('sa11y-error-text');
                    $el.after(ButtonInserter(ERROR, issueMessage['stopWordMessage'](error), true));
                }
            } else if (errorURL != null && linkText.length > 40) {
                this.warningCount++;
                $el.addClass('sa11y-warning-text');
                $el.after(ButtonInserter(WARNING, issueMessage['linkStopWordMessage'](), true));
            }
        });
    };

    // ============================================================
    // Alternative text
    // ============================================================
    this.checkAltText = () => {
        this.containsAltTextStopWords = function (alt) {
            let altUrl = ['.png', '.jpg', '.jpeg', '.gif', '.tiff'];
            let susWords = ['image of', 'graphic of', 'picture of', 'placeholder', 'photo of'];
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
                '&': '&amp;',
                '<': '&lt;',
                '>': '&gt;',
                '"': '&quot;',
                "'": '&#39;',
                '/': '&#x2F;',
                '`': '&#x60;',
                '=': '&#x3D;',
            };
            return String(string).replace(/[&<>"'`=\/]/g, function (s) {
                return entityMap[s];
            });
        };
        // Test each image for alternative text.
        this.$img.each((i, el) => {
            let $el = $(el);
            let alt = $el.attr('alt');

            if (alt == undefined) {
                this.errorCount++;

                // Image fails if it is used as a link and is missing an alt attribute.
                if ($el.parents().is('a[href]')) {
                    //Image contains both hyperlink
                    if ($el.parents('a').text().trim().length > 1) {
                        $el.addClass('sa11y-error-border');
                        let MissingAltLinkButHasTextMessage =
                            'Image is being used as a hyperlink with surrounding text, although the alt attribute should be marked as decorative or null.';
                        $el.closest('a').before(
                            ButtonInserter(ERROR, MissingAltLinkButHasTextMessage),
                        );
                    } else if ($el.parents('a').text().trim().length == 0) {
                        $el.addClass('sa11y-error-border');
                        let MissingAltLinkMessage =
                            'Image is being used as a hyperlink but is missing alt text! Please ensure alt text describes where the link takes you.';
                        $el.closest('a').before(ButtonInserter(ERROR, MissingAltLinkMessage));
                    }
                }
                // General failure message if image is missing alt.
                else {
                    $el.addClass('sa11y-error-border');
                    let MissingAltMessage =
                        'Missing alt text! If the image conveys a story, a mood or important information - be sure to describe the image.';
                    $el.before(ButtonInserter(ERROR, MissingAltMessage));
                }
            }

            // If alt attribute is present, further tests are done.
            else {
                let altText = sanitizeForHTML(alt); //Prevent tooltip from breaking.
                let error = this.containsAltTextStopWords(altText);
                let altLength = alt.length;

                // Image fails if a stop word was found.
                if (error[0] != null && $el.parents().is('a[href]')) {
                    this.errorCount++;
                    $el.addClass('sa11y-error-border');
                    let LinkImageBadAltMessage = `Detected file extension within alt text. Ensure the alt text describes destination of link, not a literal description of the picture. Remove: <span class='sa11y-red-text sa11y-bold'>${error[0]}</span>. <hr aria-hidden='true' class='sa11y-hr'> The alt text for this image is: <span class='sa11y-bold'>${altText}</span>`;
                    $el.closest('a').before(ButtonInserter(ERROR, LinkImageBadAltMessage));
                } else if (error[1] != null && $el.parents().is('a[href]')) {
                    this.warningCount++;
                    $el.addClass('sa11y-warning-border');
                    let LinkImageSusAltMessage = `Detected redundant alt text. Ensure the alt text describes destination of link, not a literal description of the picture. 
                        Consider removing word: <span class='sa11y-red-text sa11y-bold'>${error[1]}</span>. 
                        <hr aria-hidden='true' class='sa11y-hr'> 
                        The alt text for this image is: <span class='sa11y-bold'>${altText}</span>`;
                    $el.closest('a').before(ButtonInserter(WARNING, LinkImageSusAltMessage));
                } else if (error[0] != null) {
                    this.errorCount++;
                    $el.addClass('sa11y-error-border');
                    let AltHasBadWordMessage = `Detected file extension within alt text. If the image conveys a story, a mood or important information - be sure to describe the image. 
                        Remove: <span class='sa11y-red-text sa11y-bold'>${error[0]}</span>. 
                        <hr aria-hidden='true' class='sa11y-hr'> The alt text for this image is: <span class='sa11y-bold'>${altText} </span>`;
                    $el.before(ButtonInserter(ERROR, AltHasBadWordMessage));
                } else if (error[1] != null) {
                    this.warningCount++;
                    $el.addClass('sa11y-warning-border');
                    let AltHasSusWordMessage = `Detected redundant alt text. It is not necessary to include words like <em>image</em>, <em>graphic</em> or the file extension. 
                        Consider removing the word: <span class='sa11y-red-text sa11y-bold'>${error[1]}</span>. 
                        <hr aria-hidden='true' class='sa11y-hr'> 
                        The alt text for this image is: <span class='sa11y-bold'>${altText} </span>`;
                    $el.before(ButtonInserter(WARNING, AltHasSusWordMessage));
                } else if (alt == '' && $el.parents().is('a[href]')) {
                    if ($el.parents('a').text().trim().length == 0) {
                        this.errorCount++;
                        $el.addClass('sa11y-error-border');
                        let ImageLinkNullAltNoTextMessage =
                            'Image within hyperlink is marked as decorative and there is no link text. Please add alt text to image that describes destination of link.';
                        $el.closest('a').before(
                            ButtonInserter(ERROR, ImageLinkNullAltNoTextMessage),
                        );
                    } else {
                        let LinkHasAltMessage =
                            'Image is marked as decorative, although the hyperlink is using the surrounding text as a descriptive label.';
                        $el.closest('a').before(ButtonInserter(PASS, LinkHasAltMessage));
                    }
                }

                //Decorative alt and not a link.
                else if (alt == '' && $el.parents().not('a[href]')) {
                    let DecorativeMessage =
                        "Image marked as <span class='sa11y-bold'>decorative.</span> However, if the image conveys a story, a mood or important information - be sure to add alt text.";
                    $el.before(ButtonInserter(PASS, DecorativeMessage));
                }

                //Link and contains alt text.
                else if (alt.length > 160 && $el.parents().is('a')) {
                    this.errorCount++;
                    $el.addClass('sa11y-error-border');
                    let HyperlinkAltLengthMessage = `Alt text description on hyperlinked image is <span class='sa11y-bold'>too long</span>. 
                        The alt text on hyperlinked images should describe where the link takes you, not a literal description of the image. 
                        <span class='sa11y-bold'>Consider using the title of the page it links to as the alt text.</span> 
                        <hr aria-hidden='true' class='sa11y-hr'> 
                        The alt text is <span class='sa11y-red-text sa11y-bold'>${altLength}</span> characters: 
                        <span class='sa11y-red-text sa11y-bold'>${altText}</span>`;
                    $el.closest('a').before(ButtonInserter(ERROR, HyperlinkAltLengthMessage));
                }

                //Link and contains an alt text.
                else if (
                    alt != '' &&
                    $el.parents().is('a') &&
                    $el.parents('a').text().trim().length == 0
                ) {
                    this.warningCount++;
                    $el.addClass('sa11y-warning-border');
                    let ImageLinkAltTextMessage = `Image link contains alt text, although please ensure alt text describes the destination page. 
                        <span class='sa11y-bold'>Consider using the title of the page it links to as the alt text.</span>
                        Does the alt text describe where the link takes you? 
                        <hr aria-hidden='true' class='sa11y-hr'>
                        Alt text: <span class='sa11y-bold'>${altText} </span>`;
                    $el.closest('a').before(ButtonInserter(WARNING, ImageLinkAltTextMessage));
                }

                //Contains alt text & surrounding link text.
                else if (
                    alt != '' &&
                    $el.parents().is('a') &&
                    $el.parents('a').text().trim().length > 1
                ) {
                    this.warningCount++;
                    $el.addClass('sa11y-warning-border');
                    let AnchorLinkAndAltMessage = `Image link contains <span class='sa11y-bold'>both alt text and surrounding link text.</span> If this image is decorative and is being used as a functional link to another page, consider marking the image as decorative or null - the surrounding link text should suffice. <hr aria-hidden='true' class='sa11y-hr'>
                        Alt text: <span class='sa11y-bold'>${altText}</span>`;
                    $el.closest('a').before(ButtonInserter(WARNING, AnchorLinkAndAltMessage));
                } else if (alt.length > 160) {
                    this.warningCount++;
                    $el.addClass('sa11y-warning-border');
                    let AltTooLongMessage = `Alt text description is <span class='sa11y-bold'>too long</span>. Alt text should be concise, yet meaningful like a <em>tweet</em> (around 100 characters). 
                    If this is a complex image or a graph, consider putting the long description of the image in text below or in an accordion component. 
                    <hr aria-hidden='true' class='sa11y-hr'> 
                    The alt text is <span class='sa11y-red-text sa11y-bold'> ${altLength}</span> characters: 
                    <span class='sa11y-red-text sa11y-bold'>${altText}</span>`;
                    $el.before(ButtonInserter(WARNING, AltTooLongMessage));
                } else if (alt != '') {
                    let PassAltMessage = `The alt text for this image is: <span class='sa11y-bold'>${altText}</span>`;
                    $el.before(ButtonInserter(PASS, PassAltMessage));
                }
            }
        });
    };

    // ============================================================
    // Labels
    // ============================================================
    this.checkLabels = () => {
        let $inputs = this.root.find('input').not(this.containerIgnore).not('input:hidden');
        $inputs.each((i, el) => {
            let $el = $(el);

            if (!$el.attr('id') && !$el.attr('aria-label') && !$el.attr('aria-labelledby')) {
                this.errorCount++;
                $el.addClass('sa11y-error-border');
                let MissingLabelMessage =
                    "There is no label associated with this input. Please add an <span class='sa11y-kbd'>id</span> to this input, and add a matching <span class='sa11y-kbd'>for</span> attribute to the label.";
                $el.after(ButtonInserter(ERROR, MissingLabelMessage, true));
            } else if ($el.attr('aria-label')) {
                this.warningCount++;
                $el.addClass('sa11y-warning-border');
                let AriaLabelInputMessage =
                    "Detected an <span class='sa11y-kbd'>aria-label</span> with this input, although make sure there is a visible label too.";
                $el.after(ButtonInserter(WARNING, AriaLabelInputMessage, true));
            } else if ($el.prev().is('label')) {
                let label = $el.prev();
                if (label.attr('for') == $el.attr('id')) {
                    /* Optional: add pass border. */
                } else {
                    this.errorCount++;
                    $el.addClass('sa11y-error-border');
                    let NoForAttributeMessage = `There is no label associated with this input. Add a <span class='sa11y-kbd'>for</span> attribute to the label that matches the <span class='sa11y-kbd'>id</span> of this input. <hr class='sa11y-hr' aria-hidden='true'> The ID for this input is: <span class='sa11y-bold'>id=&#34;${$el.attr(
                        'id',
                    )}&#34;</span>`;
                    $el.after(ButtonInserter(ERROR, NoForAttributeMessage, true));
                }
            }
        });
    };
    // ============================================================
    // QA
    // ============================================================
    /*====================== QUALITY ASSURANCE MODULE =======================*/
    this.checkQA = () => {
        var $videos = this.root
            .find(
                "video, iframe[src*='youtube.com'], iframe[src*='vimeo.com'], iframe[src*='yuja.com'], iframe[src*='panopto.com']",
            )
            .not(this.containerIgnore);
        $videos.each((i, el) => {
            let $el = $(el);
            this.warningCount++;
            $videos.addClass('sa11y-warning-border');
            let VideoMessage =
                "Please ensure <span class='sa11y-bold'>all videos have closed captioning.</span> Providing captions for all audio and video content is a mandatory Level A requirement. Captions are meant to support people who are D/deaf or hard-of-hearing.";
            $videos.first().before(ButtonInserter(WARNING, VideoMessage));
        });

        let $audio = this.root
            .find(
                "audio, iframe[src*='soundcloud.com'], iframe[src*='simplecast.com'], iframe[src*='podbean.com'], iframe[src*='buzzsprout.com'], iframe[src*='blubrry.com'], iframe[src*='transistor.fm'], iframe[src*='fusebox.fm'], iframe[src*='libsyn.com']",
            )
            .not(this.containerIgnore);
        $audio.each((i, el) => {
            let $el = $(el);
            this.warningCount++;
            $audio.addClass('sa11y-warning-border');
            let AudioMessage =
                "Please ensure to provide a <span class='sa11y-bold'>transcript for all podcasts.</span> Providing transcripts for audio content is a mandatory Level A requirement. Transcripts are meant to support people who are D/deaf or hard-of-hearing, but can benefit everyone. Consider placing the transcript below or within an accordion panel.";
            $audio.first().before(ButtonInserter(WARNING, AudioMessage));
        });

        let $dataviz = this.root
            .find("iframe[src*='datastudio.google.com'], iframe[src*='tableau']")
            .not(this.containerIgnore);
        $dataviz.each((i, el) => {
            let $el = $(el);
            this.warningCount++;
            $dataviz.addClass('sa11y-warning-border');
            let DataVizMessage =
                "Data visualization widgets like this are often problematic for people who use a keyboard or screen reader to navigate, and can present significant difficulties for people with low vision or colorblindness. It's recommended to provide the same information in an alternative (text or table) format below the widget.";
            $dataviz.first().before(ButtonInserter(WARNING, DataVizMessage));
        });

        let $twitterWarning = this.root.find('[id^=twitter-widget]').not(this.containerIgnore);
        $twitterWarning.each((i, el) => {
            let $el = $(el);
            var numberofTweets = $el.contents().find('.timeline-TweetList-tweet').length;
            if (numberofTweets > 3) {
                this.warningCount++;
                $el.addClass('sa11y-warning-text');
                let TwitterMessage =
                    "The default Twitter timeline may cause accessibility issues for keyboard users. Secondly, the inline scrolling of the Twitter timeline may cause usability issues for mobile. It's recommended to add the following data attributes to the embed code. <hr aria-hidden='true' class='sa11y-hr'><span class='sa11y-bold'>It's recommended to:</span><ul><li>Add <span class='sa11y-kbd'>data-tweet-limit=&#34;2&#34;</span> to limit the amount of tweets.</li><li>Add <span class='sa11y-kbd'>data-chrome=&#34;nofooter noheader&#34;</span> to remove the widget's header and footer.</li></ul>";
                $el.before(ButtonInserter(WARNING, TwitterMessage));
            }
        });

        // Warn users of TARGET BLANK within main content.
        let $linksTargetBlank = this.root
            .find("a[target='_blank']")
            .not(this.linkIgnore)
            .not("a[href$='.pdf']")
            .not("a[href$='.docx']")
            .not('#sa11y-container a')
            .not('.sa11y-exclude');

        //To-do: Adam to improve verbiage. Make clear that this is AAA.
        $linksTargetBlank.each((i, el) => {
            let $el = $(el);

            var passWordsNewWindow = ['new tab', 'new window'];
            var containsPassWordsNewWindow = passWordsNewWindow.some(function (pass) {
                return $el.text().toLowerCase().indexOf(pass) >= 0;
            });

            if ($el && !containsPassWordsNewWindow) {
                this.warningCount++;
                $el.addClass('sa11y-warning-text');
                let NewTabMessage =
                    "Link opens in new tab or window without warning. Opening links in new tabs or windows can be disorienting, especially for people who have difficulty perceiving visual content. Secondly, it's not always a good practice to control a user's experience or make decisions for them. Alert the user that the link opens in a new window within the link text.";
                $el.first().after(ButtonInserter(WARNING, NewTabMessage, true));
            }
        });

        //Error: Find all links pointing to development environment. Customize as needed.
        let $badDevLinks = this.root
            .find("a[href^='https://www.dev.'], a[href*='wp-admin']")
            .not(this.linkIgnore);
        $badDevLinks.each((i, el) => {
            let $el = $(el);
            this.errorCount++;
            $el.addClass('sa11y-error-text');
            let BadLinkMessage =
                "Bad link found. Link appears to point to a development environment. Make sure the link does not contain <em>dev</em> or <em>wp-admin</em> in the URL. <hr aria-hidden='true' class='sa11y-hr'>This link points to: <br><span class='sa11y-bold sa11y-red-text'>" +
                el +
                '</span>';
            $el.after(ButtonInserter(ERROR, BadLinkMessage, true));
        });

        //Warning: Find all PDFs. Although only append warning icon to first PDF on page.
        let checkPDF = this.root.find("a[href$='.pdf']").not(this.containerIgnore);
        let firstPDF = this.root.find("a[href$='.pdf']:first").not(this.containerIgnore);
        if (checkPDF.length > 0) {
            this.warningCount++;
            checkPDF.addClass('sa11y-warning-text');
            checkPDF.has('img').removeClass('sa11y-warning-text');
            let PDFMessage =
                "PDFs are considered web content and must be made accessible as well. PDFs often contain issues for people who use screen readers (missing structural tags or missing form field labels) and people with low vision (text does not reflow when enlarged). If this PDF is a form, consider using an accessible HTML form as an alternative. If this PDF is a document, consider converting it into a web page. Otherwise, please <span class='sa11y-bold'>check PDF for accessibility in Acrobat DC.</span>";
            firstPDF.after(ButtonInserter(WARNING, PDFMessage, true));
        }

        //Find blockquotes used as headers.
        let $blockquotes = this.root.find('blockquote').not(this.containerIgnore);
        $blockquotes.each((i, el) => {
            let $el = $(el);
            if ($el.text().trim().length < 25) {
                this.errorCount++;
                $el.addClass('sa11y-error-border');
                let BlockquoteMessage =
                    'Blockquotes should be used for quotes only. They should never be used as headings. Please replace with a semantic heading (e.g. Heading 2 or Heading 3).';
                $el.before(ButtonInserter(ERROR, BlockquoteMessage));
            }
        });

        //Warning: Detect uppercase.
        let $queryUppercase = this.root
            .find('h1, h2, h3, h4, h5, h6, p, li:not([class^="sa11y"]), blockquote')
            .not(this.containerIgnore);

        $queryUppercase.each(function () {
            let $this = $(this);

            let UppercaseWarning =
                'All caps detected. Avoid typing sentences or phrases in uppercase. Some screen readers may interpret all capital text as an acronym and will read each letter individually. Additionally, all caps are more difficult to read and give the appearance of SHOUTING.';

            var uppercasePattern = /(?!<a[^>]*?>)(\b[A-Z]['!:A-Z\s]{15,}|\b[A-Z]{15,}\b)(?![^<]*?<\/a>)/g;

            var replaceUppercase =
                '<span class="sa11y-warning-uppercase">$1</span>' +
                ButtonInserter(WARNING, UppercaseWarning, true);

            $this.each(function () {
                $(this).html($(this).html().replace(uppercasePattern, replaceUppercase));
            });
        });
        if ($('.sa11y-warning-uppercase').length > 0) {
            this.warningCount++;
        }

        //Tables check.
        this.$table.each((i, el) => {
            let $el = $(el);
            let findTHeaders = $el.find('th');
            let findHeadingTags = $el.find('h1, h2, h3, h4, h5, h6');

            if (findTHeaders.length == 0) {
                this.errorCount++;
                $el.addClass('sa11y-error-border');
                let MissingHeadingsError =
                    'Missing table headers! Accessible tables need HTML markup that indicates header cells and data cells which defines their relationship. This information provides context to people who use assistive technology. Tables should be used for tabular data only.';
                $el.before(ButtonInserter(ERROR, MissingHeadingsError));
            }
            if (findHeadingTags.length > 0) {
                findHeadingTags.addClass('sa11y-error-heading');
                findHeadingTags.parent().addClass('sa11y-error-border');
                let SemanticHeadingTableError =
                    "Semantic headings such as Heading 2 or Heading 3 should only be used for sections of content; <span class='sa11y-bold'>not</span> in HTML tables. Indicate table headings using the <span class='sa11y-bold'>th</span> element instead.";
                findHeadingTags.before(ButtonInserter(ERROR, SemanticHeadingTableError));
            }
            findTHeaders.each(function () {
                let $th = $(this);
                if ($th.text().trim().length < 1) {
                    this.errorCount++;
                    findTHeaders.addClass('sa11y-error-border');
                    let EmptyTableHeaderError =
                        'Empty table header found! Table headers should <em>never</em> be empty. It is important to designate row and/or column headers to convey their relationship. This information provides context to people who use assistive technology. Please keep in mind that tables should be used for tabular data only.';
                    findTHeaders.append(ButtonInserter(ERROR, EmptyTableHeaderError));
                }
            });
        });

        //Error: Missing language tag. Lang should be at least 2 characters.
        var lang = $('html').attr('lang');
        if (lang == undefined || lang.length < 2) {
            this.errorCount++;
            let PageLanguageMessage =
                "Page language not declared! Please <a href='https://www.w3.org/International/questions/qa-html-language-declarations' target='_blank'>declare language on HTML tag. <span class='sa11y-visually-hidden'>(opens new tab)</span></a>";
            $('#sa11y-container').after(ErrorBannerInsert(PageLanguageMessage));
        }

        //Excessive bolding or italics.
        let $strongitalics = this.root.find('strong, em').not(this.containerIgnore);
        $strongitalics.each((i, el) => {
            let $el = $(el);
            if ($el.text().length > 400) {
                this.warningCount++;
                let BoldItalicsMessage =
                    "Bold and italic tags have semantic meaning, and should <span class='sa11y-bold'>not</span> be used to highlight entire paragraphs. Bolded text should be used to provide strong <span class='sa11y-bold'>emphasis</span> on a word or phrase. Italics should be used to highlight proper names (i.e. book and article titles), foreign words, quotes. Long quotes should be formatted as a blockquote.";
                $el.before(ButtonInserter(WARNING, BoldItalicsMessage));
            }
        });

        /* Thanks to John Jameson from PrincetonU for this ruleset! */
        // Detect paragraphs that should be lists: a. A. a) A) * - -- •.
        let activeMatch = '';
        let prefixDecrement = {
            b: 'a',
            B: 'A',
            2: '1',
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
                let hasBreak = $first.html().indexOf('<br>');
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
                    let $second = $(el).next('p');
                    if ($second) {
                        let secondPrefix = decrement($first.next().text().substring(0, 2));
                        if (firstPrefix === secondPrefix) {
                            hit = true;
                        }
                    }
                } else if (hit) {
                    this.warningCount++;
                    let ShouldBeListMessage =
                        "Are you trying to create a list? Possible list item detected: <span class='sa11y-bold sa11y-red-text'>" +
                        firstPrefix +
                        "</span><hr class='sa11y-hr' aria-hidden='true'> Make sure to use semantic lists by using the bullet or number formatting buttons instead. When using a semantic list, assistive technologies are able to convey information such as the total number of items and the relative position of each item in the list. Learn more about <a href='https://www.w3.org/WAI/tutorials/page-structure/content/#lists' target='_blank'>semantic lists. <span class='sa11y-visually-hidden'>(opens new tab)</span></a>";
                    $first.before(ButtonInserter(WARNING, ShouldBeListMessage));
                    $first.addClass('sa11y-fake-list');
                    activeMatch = firstPrefix;
                } else {
                    activeMatch = '';
                }
            } else {
                activeMatch = '';
            }
        });
        if ($('.sa11y-fake-list').length > 0) {
            this.warningCount++;
        }

        //Example ruleset. Be creative.
        let $checkAnnouncement = this.root.find('.announcement-component').not(this.containerIgnore)
            .length;
        if ($checkAnnouncement > 1) {
            this.warningCount++;
            let WarningMessage =
                'More than one Announcement component found! The Announcement component should be used strategically and sparingly. It should be used to get attention or warn users about something important. Misuse of this component makes it less effective or impactful. Secondly, this component is semantically labeled as an Announcement for people who use screen readers.';
            $('.announcement-component:gt(0)').addClass('sa11y-warning-border');
            $('.announcement-component:gt(0)').before(ButtonInserter(WARNING, WarningMessage));
        }
    };
    // ============================================================
    // Contrast
    // ============================================================
    this.checkContrast = () => {
        var contrastErrors = {
            errors: [],
            warnings: [],
        };
        var contrast = {
            // Parse rgb(r, g, b) and rgba(r, g, b, a) strings into an array.
            // Adapted from https://github.com/gka/chroma.js
            parseRgb: (css) => {
                var i, m, rgb, _i, _j;
                if ((m = css.match(/rgb\(\s*(\-?\d+),\s*(\-?\d+)\s*,\s*(\-?\d+)\s*\)/))) {
                    rgb = m.slice(1, 4);
                    for (i = _i = 0; _i <= 2; i = ++_i) {
                        rgb[i] = +rgb[i];
                    }
                    rgb[3] = 1;
                } else if (
                    (m = css.match(
                        /rgba\(\s*(\-?\d+),\s*(\-?\d+)\s*,\s*(\-?\d+)\s*,\s*([01]|[01]?\.\d+)\)/,
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

                if (
                    bgColor !== 'rgba(0, 0, 0, 0)' &&
                    bgColor !== 'transparent' &&
                    bgImage === 'none'
                ) {
                    return bgColor;
                } else if (bgImage !== 'none') {
                    return 'image';
                }

                if (el.is('html')) {
                    return 'rgb(255, 255, 255)';
                } else {
                    return contrast.getBackground(el.parent());
                }
            },
            check: () => {
                this.$contrast.each(function () {
                    var $this = $(this);
                    var color = $this.css('color');
                    var background = contrast.getBackground($this);
                    var htmlTag = $this[0].tagName;
                    var textCheck = $this.clone().children().remove().end().text();
                    var ratingString;
                    var fontSizeString;
                    var failed;

                    if (htmlTag === 'SVG') {
                        var fill = $this.css('fill');
                        var ratio =
                            Math.round(contrast.contrastRatio(fill, background) * 100) / 100;
                        var ratioText = ratio + ':1';
                        if (ratio < 3) {
                            failed = true;
                            fontSizeString = 'svg fill';
                            ratingString = 'fail';
                        }
                    } else if (
                        $.trim(textCheck).length ||
                        htmlTag === 'INPUT' ||
                        htmlTag === 'SELECT' ||
                        htmlTag === 'TEXTAREA'
                    ) {
                        // Background image needs to be manually reviewed
                        if (background === 'image') {
                            var ratioText = 'unknown';
                            ratingString = 'Needs manual review';
                            fontSizeString = 'N/A';
                            failed = true;
                        } else {
                            var ratio =
                                    Math.round(contrast.contrastRatio(color, background) * 100) /
                                    100,
                                ratioText = ratio + ':1',
                                fontSize = parseInt($this.css('fontSize')),
                                fontWeight = $this.css('fontWeight');

                            /* Unscientific condition of ignoring visually hidden screen reader text. If width and height of element is less than 1px and overflow is set to hidden, do not run contrast check on it...*/
                            if (
                                ($this.width() <= 1 || $this.height() <= 1) &&
                                $this.css('overflow') == 'hidden'
                            ) {
                            } else if (fontSize >= 18 || (fontSize >= 14 && fontWeight >= 700)) {
                                fontSizeString = 'Large scale text';
                                if (ratio < 3) {
                                    ratingString = 'fail';
                                    failed = true;
                                } else {
                                    ratingString = 'pass';
                                    failed = false;
                                }
                            } else {
                                fontSizeString = 'Normal scale body text';
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

                    // highlight the element in the DOM and log the element, contrast ratio and failure for testing in console
                    if (failed) {
                        var error = {};
                        error = {
                            name: $this,
                            ratio: ratioText,
                            detail: fontSizeString,
                            status: ratingString,
                        };
                        if (ratingString === 'fail') {
                            contrastErrors.errors.push(error);
                        } else if (ratingString === 'Needs manual review') {
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
            let ContrastErrorMessage = `${cdetail} does not have enough contrast with the background. 
            The contrast ratio should be at least 4.5:1 for normal text and 3:1 for large text. <hr class='sa11y-hr' aria-hidden='true'> 
            The contrast ratio is <span class='sa11y-red-text sa11y-bold'> ${cratio}</span> for the following text: 
            <span class='sa11y-bold sa11y-red-text'>${nodetext} </span>`;
            $(name).before(ButtonInserter(ERROR, ContrastErrorMessage, true));
        });

        $.each(contrastErrors.warnings, (index, item) => {
            var name = item.name;
            var nodetext = name[0].textContent;
            this.warningCount++;
            let ContrastWarningMessage = `The contrast of this text is unknown and needs to be manually reviewed. Ensure the text and the background have strong contrasting colours. The contrast ratio should be at least 4.5:1 for normal text and 3:1 for large text. <hr class='sa11y-hr' aria-hidden='true'>Please review contrast of the following text:<br> <span class='sa11y-bold'>  ${nodetext} </span>`;
            $(name)
                .addClass('sa11y-warning-border')
                .before(ButtonInserter(WARNING, ContrastWarningMessage, true));
        });
    };

    // ============================================================
    // Readability
    // ============================================================
    this.checkReadability = () => {
        //Crude hack to add a period to the end of list items to make a complete sentence.
        $('main li, [role="main"] li').each(function () {
            var endOfList = $(this),
                listText = endOfList.text();
            if (listText.charAt(listText.length - 1) !== '.') {
                $('main li, [role="main"] li').append(
                    '<span class="sa11y-readability-period sa11y-visually-hidden">.</span>',
                );
            }
        });

        function number_of_syllables(wordCheck) {
            wordCheck = wordCheck.toLowerCase().replace('.', '').replace('\n', '');
            if (wordCheck.length <= 3) {
                return 1;
            }
            wordCheck = wordCheck.replace(/(?:[^laeiouy]es|ed|[^laeiouy]e)$/, '');
            wordCheck = wordCheck.replace(/^y/, '');
            var syllable_string = wordCheck.match(/[aeiouy]{1,2}/g);

            if (!!syllable_string) {
                var syllables = syllable_string.length;
            } else {
                syllables = 0;
            }
            return syllables;
        }

        let paragraphtext = this.$mainPandLi.not('blockquote').text();

        var words_raw = paragraphtext.replace(/[.!?-]+/g, ' ').split(' ');
        var words = 0;
        for (var i = 0; i < words_raw.length; i++) {
            if (words_raw[i] != 0) {
                words = words + 1;
            }
        }

        var sentences_raw = paragraphtext.split(/[.!?]+/);
        var sentences = 0;
        for (var i = 0; i < sentences_raw.length; i++) {
            if (sentences_raw[i] != '') {
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

        var characters = paragraphtext.replace(/[.!?|\s]+/g, '').length;
        var pollysyllables = words - (syllables1 + syllables2);
        var flesch_reading_ease =
            206.835 - (1.015 * words) / sentences - (84.6 * total_syllables) / words;

        if (flesch_reading_ease > 100) {
            flesch_reading_ease = 100;
        } else if (flesch_reading_ease < 0) {
            flesch_reading_ease = 0;
        }

        var flesch_kincaid_grade_level =
            (0.39 * words) / sentences + (11.8 * total_syllables) / words - 15.9;
        var gunning_fog_index = (words / sentences + 100 * (pollysyllables / words)) * 0.4;
        var automated_readability_index =
            4.71 * (characters / words) + 0.5 * (words / sentences) - 21.43;
        var smog = 1.043 * Math.sqrt((pollysyllables * 30) / sentences) + 3.1291;
        var coleman_liau =
            0.0588 * ((100 * characters) / words) - 0.296 * ((100 * sentences) / words) - 15.8;
        var scoreMsg = '';

        scoreMsg =
            scoreMsg +
            '[Detailed] Readability score of main content area. Please note text within a list is ignored.';
        scoreMsg = scoreMsg + '\n\n';
        scoreMsg = scoreMsg + 'Flesch Reading Ease: ' + flesch_reading_ease.toFixed(1);
        scoreMsg = scoreMsg + '\nWCAG 2.0 Level AAA requires 60 or greater.';
        scoreMsg = scoreMsg + '\n\n';
        scoreMsg =
            scoreMsg +
            'Grade Level Average: ' +
            (
                (flesch_kincaid_grade_level +
                    gunning_fog_index +
                    automated_readability_index +
                    coleman_liau +
                    (sentences >= 30 ? smog : 0)) /
                (sentences >= 30 ? 5 : 4)
            ).toFixed(1);
        scoreMsg = scoreMsg + '\n\n';
        scoreMsg = scoreMsg + '(Flesch-Kincaid): ' + flesch_kincaid_grade_level.toFixed(1);
        scoreMsg = scoreMsg + '\n';
        scoreMsg = scoreMsg + '(Gunning-Fog): ' + gunning_fog_index.toFixed(1);
        scoreMsg = scoreMsg + '\n';
        scoreMsg = scoreMsg + '(Automated Readability): ' + automated_readability_index.toFixed(1);
        scoreMsg = scoreMsg + '\n';
        scoreMsg = scoreMsg + '(Colemane-Liau): ' + coleman_liau.toFixed(1);
        scoreMsg = scoreMsg + '\n';
        scoreMsg = scoreMsg + (sentences >= 30 ? '(SMOG): ' + smog.toFixed(1) + '\n\n' : '');
        scoreMsg = scoreMsg + 'WCAG 2.0 Level AAA requires grade 9 or lower.';
        scoreMsg = scoreMsg + '\n\n';
        scoreMsg = scoreMsg + 'Words: ' + words;
        scoreMsg = scoreMsg + '\n';
        scoreMsg =
            scoreMsg +
            'Complex Words: ' +
            Math.round(100 * ((words - (syllables1 + syllables2)) / words)) +
            '%';
        scoreMsg = scoreMsg + '\n';
        scoreMsg = scoreMsg + 'Sentences: ' + sentences;
        scoreMsg = scoreMsg + '\n';
        scoreMsg = scoreMsg + 'Words Per Sentence: ' + (words / sentences).toFixed(1);
        scoreMsg = scoreMsg + '\n';
        scoreMsg = scoreMsg + 'Syllables: ' + total_syllables;
        scoreMsg = scoreMsg + '\n';
        scoreMsg = scoreMsg + 'Characters: ' + characters;
        console.log(scoreMsg);

        let readingDifficulty = '';
        let readabilityDetails = '';
        let notEnoughContent = '';

        if (words > 30) {
            var fleschScore = flesch_reading_ease.toFixed(1);
            var avgWordsPerSentence = (words / sentences).toFixed(1);

            //WCAG AAA pass if greater than 60
            if (fleschScore >= 0 && fleschScore < 30) {
                readingDifficulty = '<span class="sa11y-readability-score">Very difficult</span>';
            } else if (fleschScore > 31 && fleschScore < 49) {
                readingDifficulty = '<span class="sa11y-readability-score">Difficult</span>';
            } else if (fleschScore > 50 && fleschScore < 60) {
                readingDifficulty = '<span class="sa11y-readability-score">Fairly difficult</span>';
            } else {
                readingDifficulty = '<span class="sa11y-readability-score">Good</span>';
            }

            readabilityDetails =
                `
                <ul id="sa11y-readability-details">
                    <li><span class='sa11y-bold'>Average words per sentence:</span> ` +
                avgWordsPerSentence +
                `</li>
                    <li><span class='sa11y-bold'>Complex words:</span> ` +
                Math.round(100 * ((words - (syllables1 + syllables2)) / words)) +
                `%</li>
                    <li><span class='sa11y-bold'>Words:</span> ` +
                words +
                `</li>
                </ul>`;
        } else if (this.$mainPandLi.length === 0) {
            fleschScore = '';
            readingDifficulty = '';
            readabilityDetails = '';
            notEnoughContent =
                'Please identify the <a href="https://www.w3.org/WAI/tutorials/page-structure/regions/#main-content" target="_blank">main content region to calculate readability. <span class="sa11y-visually-hidden">(opens new tab)</span></a>';
        } else {
            fleschScore = '';
            readingDifficulty = '';
            readabilityDetails = '';
            notEnoughContent = 'Not enough content to calculate readability score.';
        }

        let sa11yReadabilityPanel = document.createElement('div');
        sa11yReadabilityPanel.setAttribute('id', 'sa11y-readability-content');
        sa11yReadabilityPanel.innerHTML = `
                <span class="sa11y-header-text">Readability</span>
                <div class="sa11y-readability-level">${fleschScore} ${readingDifficulty}</div> ${readabilityDetails} ${notEnoughContent}
                `;
        $('#sa11y-readability-panel').prepend(sa11yReadabilityPanel);
    };

    // ============================================================

    this.errorCount = 0;
    this.warningCount = 0;

    this.findElements();

    this.checkHeaders();
    this.checkLinkText();
    this.checkLabels();
    this.checkAltText();
    this.checkQA();

    if (localStorage.getItem('sa11y-readabilityCheck') === 'On') {
        this.checkReadability();
    }
    if (localStorage.getItem('sa11y-contrastCheck') === 'On') {
        this.checkContrast();
    }

    if (this.panelActive) {
        reset(this.root);
    } else {
        displayPanel(errorCount, warningCount);
    }

    let totalCount = this.errorCount + this.warningCount;
    if (totalCount === 0) {
        $('#sa11y-notification-badge').hide();
    } else if (this.warningCount > 0 && this.errorCount === 0) {
        $('#sa11y-notification-badge').show();
        $('#sa11y-notification-badge').addClass('sa11y-notification-badge-warning');
        $('#sa11y-notification-count').html(this.warningCount);
    } else {
        $('#sa11y-notification-badge').show();
        $('#sa11y-notification-count').html(totalCount);
    }

    //Initialize tippy.js
    tippy('.sa11y-btn', {
        interactive: true,
        trigger: 'mouseenter click',
        arrow: true,
        theme: 'sa11y-theme',
        allowHTML: true,
        appendTo: document.body,
    });
}
