/* ----------------------------- */
/*         Global defaults       */
/* ----------------------------- */

//Target area to scan.
let sa11yCheckRoot = ""; //Default: body. Use "main" for main content.

//Readability configuration.
let sa11yReadabilityRoot = ""; //Default: main, [role='main'].
const sa11yReadabilityLang = "en"; //Supported: en = English, fr = French, es = Spanish

//Inclusions and exclusions. Use commas to seperate classes or elements.
let sa11yContainerIgnore = ".sa11y-ignore", //Ignore specific regions.
    sa11yOutlineIgnore = "", //Exclude headings from outline panel.
    sa11yHeaderIgnore = "", //Ignore specific headings. E.g. "h1.jumbotron-heading"
    sa11yImageIgnore = "", //Ignore specific images.
    sa11yLinkIgnore = "", //Ignore specific links.
    sa11yLinkIgnoreSpan = "span.sr-only-example", //Ignore specific classes within links. Example: <a href="#">learn more <span class="sr-only-example">(opens new tab)</span></a>.
    sa11yLinksToFlag = "a[href^='https://www.dev.'], a[href*='wp-admin']"; //Links you don't want your content editors pointing to (e.g. development environments).

/* ------------------------------ */
/*           Localization         */
/* ------------------------------ */

//Language of Sa11y. Some global variables to help translate.
const sa11yLangCode = "en", //Language code, e.g. "fr"
    sa11yMainToggleLabel = "Check Accessibility",
    sa11yContainerLabel = "Accessibility Checker",
    sa11yError = "Error", //Erreur
    sa11yWarning = "Warning", //Attention
    sa11yGood = "Good", //Bon
    sa11yOn = "On",
    sa11yOff = "Off",
    sa11yAlertText = "Alert",
    sa11yAlertClose = "Close",
    sa11yShowOutline = "Show Outline",
    sa11yHideOutline = "Hide Outline",
    sa11yShowSettings = "Show Settings",
    sa11yHideSettings = "Hide Settings",
    sa11yPageOutline = "Page outline",
    sa11ySettings = "Settings",
    sa11yContrast = "Contrast",
    sa11yFormLabels = "Form labels",
    sa11yLinksAdvanced = "Links (Advanced)",
    sa11yDarkMode = "Dark Mode",
    sa11yShortcutSR = "Skip to issue. Keyboard shortcut: Alt period",
    sa11yShortcutTooltip = "Skip to issue";

//Readability panel translations.
const sa11yReadability = "Readability",
    sa11yAvgWordPerSentence = "Average words per sentence:",
    sa11yComplexWords = "Complex words:",
    sa11yTotalWords = "Words:",
    sa11yVeryDifficultReadability = "Very difficult",
    sa11yDifficultReadability = "Difficult",
    sa11yFairlyDifficultReadability = "Fairly difficult",
    sa11yGoodReadability = "Good";

//Panel status
const sa11yPanelStatus = {
    status1: `1 accessibility error and 1 warning found.`,
    status2: (warningCount) => `1 accessibility error and ${warningCount} warnings found.`,
    status3: (errorCount) => `${errorCount} accessibility errors and 1 warning found.`,
    status4: (errorCount, warningCount) => `${errorCount} accessibility errors and ${warningCount} warnings found.`,
    status5: `1 accessibility error found.`,
    status6: (errorCount) => `${errorCount} accessibility errors found.`,
    status7: `Please review warning.`,
    status8: (warningCount) => `Please review ${warningCount} warnings.`,
    status9: `No accessibility errors found.`,
    status10: (warningCount) => `${warningCount} <span class="sa11y-visually-hidden">warnings found.</span>`,
    status11: (totalCount) => `${totalCount} <span class="sa11y-visually-hidden">total issues found.</span>`,
    notVisibleAlert: `The item you are trying to view is not visible; it may be hidden or inside of an accordion or tab component. Here's a preview:`
}

//Embedded content.
const $sa11yVideos = "video, [src*='youtube.com'], [src*='vimeo.com'], [src*='yuja.com'], [src*='panopto.com']",
$sa11yAudio = "audio, [src*='soundcloud.com'], [src*='simplecast.com'], [src*='podbean.com'], [src*='buzzsprout.com'], [src*='blubrry.com'], [src*='transistor.fm'], [src*='fusebox.fm'], [src*='libsyn.com']",
$sa11yDataViz = "[src*='datastudio.google.com'], [src*='tableau']",
$sa11yTwitter = "[id^='twitter-widget']",
$sa11yAllEmbeddedContent = $sa11yVideos + ", " + $sa11yAudio + ", " + $sa11yDataViz + ", " + $sa11yTwitter;

//Alt Text stop words.
const sa11ySuspiciousAltWords = ["image", "graphic", "picture", "photo"];
const sa11yPlaceholderAltStopWords = [
    "alt",
    "image",
    "photo",
    "decorative",
    "photo",
    "placeholder",
    "placeholder image",
    "spacer",
    "."
];

//Link Text stop words
const sa11yPartialAltStopWords = [
    "click",
    "click here",
    "click here for more",
    "click here to learn more",
    "click here to learn more.",
    "check out",
    "download",
    "download here",
    "download here.",
    "find out",
    "find out more",
    "find out more.",
    "form",
    "here",
    "here.",
    "info",
    "information",
    "link",
    "learn",
    "learn more",
    "learn more.",
    "learn to",
    "more",
    "page",
    "paper",
    "read more",
    "read",
    "read this",
    "this",
    "this page",
    "this page.",
    "this website",
    "this website.",
    "view",
    "view our",
    "website",
    "."
];

const sa11yWarningAltWords = [
    "< ",
    " >",
    "click here"
];

//Link Text (Advanced)
const sa11yNewWindowPhrases = [
    "external",
    "new tab",
    "new window",
    "pop-up",
    "pop up"
];

//Link Text (Advanced). Only some items in list would need to be translated.
const sa11yFileTypePhrases = [
    "document",
    "pdf",
    "doc",
    "docx",
    "word",
    "mp3",
    "ppt",
    "text",
    "pptx",
    "powerpoint",
    "txt",
    "exe",
    "dmg",
    "rtf",
    "install",
    "windows",
    "macos",
    "spreadsheet",
    "worksheet",
    "csv",
    "xls",
    "xlsx",
    "video",
    "mp4",
    "mov",
    "avi"
];

//Tooltip formatting shortcuts
const sa11yHr = `<hr aria-hidden='true' class='sa11y-hr'>`;
const sa11yNewTab = `<span class='sa11y-visually-hidden'>(Opens in new tab)</span>`;

// IM - Issue Message
const sa11yIM = {
    headings: {

        nonConsecutiveHeadingLevel: (
                prevLevel,
                level
            ) =>
            `Non-consecutive heading level used. Headings should never skip levels, or go from <span class='sa11y-bold'>Heading ${prevLevel}</span> to <span class='sa11y-red-text sa11y-bold'>Heading ${level}</span>.`,

        emptyHeading: (level) =>
            `Empty heading found! To fix, delete this line or change its format from <span class='sa11y-red-text sa11y-bold'>Heading ${level}</span> to <span class='sa11y-bold'>Normal</span> or <span class='sa11y-bold'>Paragraph</span>.`,

        longHeading: (
                headingLength
            ) =>
            `Heading is long! Headings should be used to organize content and convey structure. They should be brief, informative, and unique. Please keep headings less than 160 characters (no more than a sentence).
            ${sa11yHr}
            Character count: <span class='sa11y-bold sa11y-red-text'>${headingLength}</span>.`,

        firstHeading: () =>
            `The first heading on a page should usually be a Heading 1 or Heading 2. Heading 1 should be the start of the main content section, and is the main heading that describes the overall purpose of the page. Learn more about <a href='https://www.w3.org/WAI/tutorials/page-structure/headings/' target='_blank'>Heading Structure. ${sa11yNewTab}</a>`,

        missingHeadingOne: () =>
            `Missing Heading 1. Heading 1 should be the start of the main content area, and is the main heading that describes the overall purpose of the page. Learn more about <a href='https://www.w3.org/WAI/tutorials/page-structure/headings/' target='_blank'>Heading Structure. ${sa11yNewTab}</a>`,
        
        emptyHeadingWithImage: (level) => 
            `Heading has no text, but contains an image. If this is not a heading, change its format from <span class='sa11y-red-text sa11y-bold'>Heading ${level}</span> to <span class='sa11y-bold'>Normal</span> or <span class='sa11y-bold'>Paragraph</span>. Otherwise, please add alt text to the image if it is not decorative.`,

        missingHeadingOnePanelText: `Missing Heading 1!`,
    },

    linktext: {

        emptyLink: () =>
            `Remove empty links without any text.`,

        emptyLinkNoLabel: () =>
            `Link does not have discernable text that is visible to screen readers and other assistive technology. To fix:
            <ul>
                <li>Add some concise text that describes where the link takes you.</li>
                <li>If it is an <a href='https://a11y-101.com/development/icons-and-links' target='_blank'>icon link or SVG,${sa11yNewTab}</a> it is likely missing a descriptive label.</li>
                <li>If you think this link is an error due to a copy/paste bug, consider deleting it.</li>
            </ul>`,

        linkLabel: (linkText) =>
            `The descriptive label for this link is: <span class='sa11y-bold'>${linkText}</span>`,

        linkStopWordMessage: (error) =>
            `Link text may not be descriptive enough out of context: <span class='sa11y-red-text sa11y-bold'>${error}</span>
            ${sa11yHr}
            <span class='sa11y-bold'>Tip!</span> Link text should always be clear, unique, and meaningful. Avoid common words like &quot;click here&quot; or &quot;learn more&quot;.`,

        linkBestPractices: (error) =>
            `Consider replacing the link text: <span class='sa11y-red-text sa11y-bold'>${error}</span>
            ${sa11yHr}
            <ul>
                <li>&quot;Click here&quot; places focus on mouse mechanics, when many people do not use a mouse or may be viewing this website on a mobile device. Consider using a different verb that relates to the task.</li>
                <li>Avoid using HTML symbols as call to actions unless they are hidden to assistive technologies.</li>
            </ul>
            `,

        linkURL: () =>
            `Longer, less intelligible URLs used as link text might be difficult to listen to with assistive technology. In most cases, it is better to use human-readable text instead of the URL. Short URLs (such as a site's homepage) are okay.
            ${sa11yHr}
            <span class='sa11y-bold'>Tip!</span> Link text should always be clear, unique, and meaningful so it could be understood out of context.`,
    },

    linksAdvanced: {

        newTabWarning: () =>
            `Link opens in a new tab or window without warning. Doing so can be disorienting, especially for people who have difficulty perceiving visual content. Secondly, it is not always a good practice to control someone's experience or make decisions for them. Indicate that the link opens in a new window within the link text.
            ${sa11yHr}
            <span class='sa11y-bold'>Tip!</span> Learn best practices: <a href='https://www.nngroup.com/articles/new-browser-windows-and-tabs/'>opening links in new browser windows and tabs.</a>`,

        fileTypeWarning: () =>
            `Link points to a PDF or downloadable file (e.g. MP3, Zip, Word Doc) without warning. Indicate the file type within the link text. If it is a large file, consider including the file size.
            ${sa11yHr}
            <span class='sa11y-bold'>Example:</span> Executive Report (PDF, 3MB)`,

        linkIdenticalName: (linkText) =>
            `Link has identical text as another link, although it points to a different page. Multiple links with the same text may cause confusion for people who use screen readers.
            ${sa11yHr}
            Consider making the following link more descriptive to help distinguish it from other links: <span class='sa11y-red-text sa11y-bold'>${linkText}</span>`
    },

    images: {

        missingAltLinkButHasTextMessage: 
            `Image is being used as a link with surrounding text, although the alt attribute should be marked as decorative or null.`,

        missingAltLinkMessage:
            `Image is being used as a link but is missing alt text! Please ensure alt text describes where the link takes you.`,

        missingAltMessage: 
            `Missing alt text! If the image conveys a story, mood, or important information - be sure to describe the image.`,

        linkImageBadAltMessage: (altText, error) =>
            `File extension within the alt text found. Ensure the alt text describes the destination of the link, not a literal description of the image. Remove: <span class='sa11y-red-text sa11y-bold'>${error}</span>.
            ${sa11yHr}
            The alt text for this image is: <span class='sa11y-bold'>${altText}</span>`,

        linkImageSusAltMessage: (altText, error) =>
            `Assistive technologies already indicate that this is an image, so &quot;<span class='sa11y-red-text sa11y-bold'>${error}</span>&quot; or &quot;${error} of&quot; may be redundant. Ensure the alt text describes the destination of the link, not a literal description of the image.
            ${sa11yHr} 
            The alt text for this image is: <span class='sa11y-bold'>${altText}</span>`,

        altHasBadWordMessage: (altText, error) =>
            `File extension within the alt text found. If the image conveys a story, mood, or important information - be sure to describe the image. 
            Remove: <span class='sa11y-red-text sa11y-bold'>${error}</span>.
            ${sa11yHr} 
            The alt text for this image is: <span class='sa11y-bold'>${altText}</span>`,

        altPlaceholderMessage: (altText) =>
            `Non-descript or placeholder alt text found. Replace the following alt text with something more meaningful: <span class='sa11y-bold sa11y-red-text'>${altText}</span>.`,

        linkImagePlaceholderAltMessage: (altText) =>
            `Non-descript or placeholder alt text within a linked image found. Ensure the alt text describes the destination of the link, not a literal description of the image. Replace the following alt text: <span class='sa11y-bold sa11y-red-text'>${altText}</span>.`,

        altHasSusWordMessage: (altText, error) =>
            `Assistive technologies already indicate that this is an image, so &quot;<span class='sa11y-red-text sa11y-bold'>${error}</span>&quot; or &quot;${error} of&quot; may be redundant.
            ${sa11yHr}
            The alt text for this image is: <span class='sa11y-bold'>${altText}</span>`,

        imageLinkNullAltNoTextMessage: 
            `Image within link is marked as decorative and there is no link text. Please add alt text to the image that describes the destination of the link.`,

        linkHasAltMessage: 
            `Image is marked as decorative, although the link is using the surrounding text as a descriptive label.`,

        decorativeMessage: 
            `Image is marked as <span class='sa11y-bold'>decorative</span> and will be ignored by assistive technology. If the image conveys a story, mood or important information - be sure to add alt text.`,

        hyperlinkedImageAriaHidden: 
            `Link around image has <span class='sa11y-kbd'>aria-hidden=&quot;true&quot;</span> but is still keyboard focusable. If you are intending to hide a redundant or duplicate link, add <span class='sa11y-kbd'>tabindex=&quot;-1&quot;</span> as well.`,

        hyperlinkAltLengthMessage: (altText, altLength) =>
            `Alt text description on a linked image is <span class='sa11y-bold'>too long</span>. 
            The alt text on linked images should describe where the link takes you, not a literal description of the image. 
            <span class='sa11y-bold'>Consider using the title of the page it links to as the alt text.</span> 
            ${sa11yHr} 
            The alt text is <span class='sa11y-red-text sa11y-bold'>${altLength}</span> characters: 
            <span class='sa11y-red-text sa11y-bold'>${altText}</span>`,

        imageLinkAltTextMessage: (altText) =>
            `Image link contains alt text, although please ensure alt text describes the destination page. 
            <span class='sa11y-bold'>Consider using the title of the page it links to as the alt text.</span>
            Does the alt text describe where the link takes you? 
            ${sa11yHr}
            Alt text: <span class='sa11y-bold'>${altText}</span>`,

        anchorLinkAndAltMessage: (altText) =>
            `Image link contains <span class='sa11y-bold'>both alt text and surrounding link text.</span> If this image is decorative and is being used as a functional link to another page, consider marking the image as decorative or null - the surrounding link text should suffice. 
            ${sa11yHr}
            Alt text: <span class='sa11y-bold'>${altText}</span>`,

        altTooLongMessage: (altText, altLength) =>
            `Alt text description is <span class='sa11y-bold'>too long</span>. Alt text should be concise, yet meaningful like a <em>tweet</em> (around 100 characters). 
            If this is a complex image or a graph, consider putting the long description of the image in the text below or an accordion component. 
            ${sa11yHr} 
            The alt text is <span class='sa11y-red-text sa11y-bold'>${altLength}</span> characters: 
            <span class='sa11y-red-text sa11y-bold'>${altText}</span>`,

        passAlt: (altText) =>
            `The alt text for this image is: <span class='sa11y-bold'>${altText}</span>`,

    },
    labels: {

        inputResetMessage: 
            `Reset buttons should <span class='sa11y-bold'>not</span> be used unless specifically needed because they are easy to activate by mistake.
            ${sa11yHr} 
            <span class='sa11y-bold'>Tip!</span> Learn why <a href='https://www.nngroup.com/articles/reset-and-cancel-buttons/' target='_blank'>Reset and Cancel buttons pose usability issues. ${sa11yNewTab}</a>`,

        missingLabelMessage: 
            `There is no label associated with this input. Please add an <span class='sa11y-kbd'>id</span> to this input, and add a matching <span class='sa11y-kbd'>for</span> attribute to the label.`,

        ariaLabelInputMessage: (ariaLabel) =>
            `Input has an accessible name, although please ensure there is a visible label too. 
            ${sa11yHr} 
            The accessible name for this input is: <span class='sa11y-bold'>${ariaLabel}</span>`,

        noForAttributeMessage: (t) =>
            `There is no label associated with this input. Add a <span class='sa11y-kbd'>for</span> attribute to the label that matches the <span class='sa11y-kbd'>id</span> of this input. 
            ${sa11yHr} 
            The ID for this input is: <span class='sa11y-bold'>id=&#34;${t}&#34;</span>`,

        missingImageInputMessage: 
            `Image button is missing alt text. Please add alt text to provide an accessible name. For example: <em>Search</em> or <em>Submit</em>.`,
    },

    embeddedContent: {

        video: 
            `Please ensure <span class='sa11y-bold'>all videos have closed captioning.</span> Providing captions for all audio and video content is a mandatory Level A requirement. Captions support people who are D/deaf or hard-of-hearing.`,

        audio: 
            `Please ensure to provide a <span class='sa11y-bold'>transcript for all podcasts.</span> Providing transcripts for audio content is a mandatory Level A requirement. Transcripts support people who are D/deaf or hard-of-hearing, but can benefit everyone. Consider placing the transcript below or within an accordion panel.`,

        dataViz: 
            `Data visualization widgets like this are often problematic for people who use a keyboard or screen reader to navigate, and can present significant difficulties for people who have low vision or colorblindness. It's recommended to provide the same information in an alternative (text or table) format below the widget.
            ${sa11yHr}
            Learn more about <a href='https://www.w3.org/WAI/tutorials/images/complex/' target='_blank'>complex images. ${sa11yNewTab}</a>`,

        twitter: 
            `The default Twitter timeline may cause accessibility issues for people who use a keyboard to navigate. Secondly, the inline scrolling of the Twitter timeline may cause usability issues for mobile. It's recommended to add the following data attributes to the embed code. 
            ${sa11yHr}
            <span class='sa11y-bold'>It's recommended to:</span>
            <ul>
                <li>Add <span class='sa11y-kbd'>data-tweet-limit=&#34;2&#34;</span> to limit the amount of tweets.</li>
                <li>Add <span class='sa11y-kbd'>data-chrome=&#34;nofooter noheader&#34;</span> to remove the widget's header and footer.</li>
            </ul>`,

        missingEmbedTitle: 
            `Embedded content requires an accessible name that describes its contents. Please provide a unique <span class='sa11y-kbd'>title</span> or <span class='sa11y-kbd'>aria-label</span> attribute on the <span class='sa11y-kbd'>iframe</span> element. Learn more about <a href='https://dequeuniversity.com/tips/provide-iframe-titles' target='_blank'>iFrames. ${sa11yNewTab}</a>`,

        generalEmbedWarning: 
            `Unable to check embedded content. Please make sure that images have alt text, videos have captions, text has sufficient contrast, and interactive components are <a href='https://webaim.org/techniques/keyboard/' target='_blank'>keyboard accessible. ${sa11yNewTab}</a>`,
    },

    QA: {

        badLink: (el) =>
            `Bad link found. Link appears to point to a development environment. Make sure the link does not contain <em>dev</em> or <em>wp-admin</em> in the URL. 
            ${sa11yHr}
            This link points to:
            <br>
            <span class='sa11y-bold sa11y-red-text'>${el}</span>`,

        fakeHeading: (boldtext) =>
            `Is this a heading? <span class='sa11y-bold sa11y-red-text'>${boldtext}</span>
            ${sa11yHr}
            A line of bold text might look like a heading, but someone using a screen reader cannot tell that it is important or jump to its content. Bolded text should never replace semantic headings (Heading 2 to Heading 6).
            `,

        pdf: (pdfCount) =>
            `PDFs are considered web content and must be made accessible as well. PDFs often contain issues for people who use screen readers (missing structural tags or missing form field labels) and people who have low vision (text does not reflow when enlarged). 
            <ul>
                <li>If this is a form, consider using an accessible HTML form as an alternative.</li>
                <li>If this is a document, consider converting it into a web page.</li>
            </ul>
            Otherwise, please check <span class='sa11y-bold sa11y-red-text'>${pdfCount}</span> <a href='https://www.adobe.com/accessibility/products/acrobat/using-acrobat-pro-accessibility-checker.html' target='_blank'>PDF(s) for accessibility in Acrobat DC. ${sa11yNewTab}</a>`,

        blockquoteMessage: (bqHeadingText) =>
            `Is this a heading? <span class='sa11y-bold sa11y-red-text'>${bqHeadingText}</span> 
            ${sa11yHr}
            Blockquotes should be used for quotes only. If this is intended to be a heading, change this blockquote to a semantic heading (e.g. Heading 2 or Heading 3).`,

        uppercaseWarning: 
            `Found all caps. Some screen readers may interpret all caps text as an acronym and will read each letter individually. Additionally, some people find all caps more difficult to read and it may give the appearance of SHOUTING.`,

        tables: {

            missingHeadings: 
                `Missing table headers! Accessible tables need HTML markup that indicates header cells and data cells which defines their relationship. This information provides context to people who use assistive technology. Tables should be used for tabular data only.
                ${sa11yHr}
                Learn more about <a href='https://www.w3.org/WAI/tutorials/tables/' target='_blank'>accessible tables. ${sa11yNewTab}</a>`,

            semanticHeading: 
                `Semantic headings such as Heading 2 or Heading 3 should only be used for sections of content; <span class='sa11y-bold'>not</span> in HTML tables. Indicate table headings using the <span class='sa11y-bold'>th</span> element instead.
                ${sa11yHr}
                Learn more about <a href='https://www.w3.org/WAI/tutorials/tables/' target='_blank'>accessible tables. ${sa11yNewTab}</a>`,

            emptyHeading: 
                `Empty table header found! Table headers should <em>never</em> be empty. It is important to designate row and/or column headers to convey their relationship. This information provides context to people who use assistive technology. Please keep in mind that tables should be used for tabular data only.
                ${sa11yHr}
                Learn more about <a href='https://www.w3.org/WAI/tutorials/tables/' target='_blank'>accessible tables. ${sa11yNewTab}</a>`,
        },

        badItalics: 
            `Bold and italic tags have semantic meaning, and should <span class='sa11y-bold'>not</span> be used to highlight entire paragraphs. Bolded text should be used to provide strong <span class='sa11y-bold'>emphasis</span> on a word or phrase. Italics should be used to highlight proper names (i.e. book and article titles), foreign words, quotes. Long quotes should be formatted as a blockquote.`,

        pageLanguageMessage: 
            `Page language not declared! Please <a href='https://www.w3.org/International/questions/qa-html-language-declarations' target='_blank'>declare language on HTML tag. ${sa11yNewTab}</a>`,

        shouldBeList: (firstPrefix) =>
            `Are you trying to create a list? Possible list item found: <span class='sa11y-bold sa11y-red-text'>${firstPrefix}</span>
            ${sa11yHr} 
            Make sure to use semantic lists by using the bullet or number formatting buttons instead. When using a semantic list, assistive technologies are able to convey information such as the total number of items and the relative position of each item in the list. Learn more about <a href='https://www.w3.org/WAI/tutorials/page-structure/content/#lists' target='_blank'>semantic lists. ${sa11yNewTab}</a>`,

        announcementWarningMessage: 
            `More than one Announcement component found! The Announcement component should be used strategically and sparingly. It should be used to get attention or indicate that something is important. Misuse of this component makes it less effective or impactful. Secondly, this component is semantically labeled as an Announcement for people who use screen readers.`,
    },

    contrast: {

        errorMessage: (cratio, nodetext) =>
            `This text does not have enough contrast with the background. 
            The contrast ratio should be at least 4.5:1 for normal text and 3:1 for large text. 
            ${sa11yHr} 
            The contrast ratio is <span class='sa11y-red-text sa11y-bold'>${cratio}</span> for the following text: 
            <span class='sa11y-bold sa11y-red-text'>${nodetext}</span>`,

        warningMessage: (nodetext) =>
            `The contrast of this text is unknown and needs to be manually reviewed. Ensure the text and the background have strong contrasting colours. The contrast ratio should be at least 4.5:1 for normal text and 3:1 for large text. 
            ${sa11yHr}Please review contrast of the following text:
            <br>
            <span class='sa11y-bold'>${nodetext}</span>`,
    },

    readability: {
        noPorLiMessage:
            `Unable to calculate readability score. No paragraph <span class="sa11y-badge">&lt;p&gt;</span> or list content <span class="sa11y-badge">&lt;li&gt;</span> found.`,

        notEnoughContentMessage:
            `Not enough content to calculate readability score.`
    }
};

/*-----------------------------------------------------------------------
Sa11y: the accessibility quality assurance assistant.                
Author: Development led by Adam Chaboryk at Ryerson University.
All acknowledgements and contributors: https://github.com/ryersondmp/sa11y
License: https://github.com/ryersondmp/sa11y/blob/master/LICENSE.md
Copyright (c) 2020 - 2021 Ryerson University
The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
-----------------------------------------------------------------------*/