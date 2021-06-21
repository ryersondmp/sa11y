/* Global defaults & Localization */
/* Language: English */

//Target area to scan.
const sa11yCheckRoot = "body"; //E.g. "main" for main content.

//Inclusions and exclusions. Use commas to seperate classes or elements.
let sa11yContainerIgnore = ".sa11y-ignore, #sa11y-container", //Ignore specific regions.
    sa11yOutlineIgnore = "", //Exclude headings from outline panel.
    sa11yHeaderIgnore = "", //Ignore specific headings. E.g. "h1.jumbotron-heading"
    sa11yImageIgnore = "", //Ignore specific images.
    sa11yLinkIgnore = ""; //Ignore specific links.

//Language of Sa11y. Some global variables to help translate.
const sa11yLangCode = "en", //Language code, e.g. "fr"
    sa11yMainToggle = "Toggle Accessibility Checker",
    sa11yContainerLabel = "Accessibility Checker",
    sa11yError = "Error", //Erreur
    sa11yWarning = "Warning", //Attention
    sa11yGood = "Good", //Bon
    sa11yOn = "On",
    sa11yOff = "Off",
    sa11yShowOutline = "Show Outline",
    sa11yHideOutline = "Hide Outline",
    sa11yShowSettings = "Show Settings",
    sa11yHideSettings = "Hide Settings",
    sa11yPageOutline = "Page outline",
    sa11ySettings = "Settings",
    sa11yContrast = "Contrast",
    sa11yFormLabels = "Form labels",
    sa11yLinksAdvanced = "Links (Advanced)",
    sa11yDarkMode = "Dark Mode";

//Readability panel translations.
const sa11yReadability = "Readability",
    sa11yReadabilityLang = "en", //Supported: en = English, fr = French, es = Spanish
    sa11yAvgWordPerSentence = "Average words per sentence:",
    sa11yComplexWords = "Complex words:",
    sa11yTotalWords = "Words:",
    sa11yVeryDifficultReadability = "Very difficult",
    sa11yDifficultReadability = "Difficult",
    sa11yFairlyDifficultReadability = "Fairly difficult",
    sa11yGoodReadability = "Good";

//Panel status
const PanelStatus = {
    status1: () => `1 accessibility error and 1 warning detected.`,
    status2: (warningCount) => `1 accessibility error and ${warningCount} warnings detected.`,
    status3: (errorCount) => `${errorCount} accessibility errors and 1 warning detected.`,
    status4: (errorCount, warningCount) => `${errorCount} accessibility errors and ${warningCount} warnings detected.`,
    status5: () => `1 accessibility error detected.`,
    status6: (errorCount) => `${errorCount} accessibility errors detected.`,
    status7: () => `Please review warning.`,
    status8: (warningCount) => `Please review ${warningCount} warnings.`,
    status9: () => `No accessibility errors found.`
}

//Alt Text stop words
const susWords = [
    "image of",
    "graphic of",
    "picture of",
    "photo of",
];
const placeholderStopWords = [
    "alt",
    "image",
    "decorative",
    "photo",
    "placeholder",
    "placeholder image",
    "spacer",
    "."
];

//Link Text stop words
const partialStopWords = [
    "click",
    "click here",
    "click here for more",
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

const warningWords = [
    "< ", 
    " >", 
    "click here"
];

//Link Text (Advanced)
const newWindowPhrases = [
    "external",
    "new tab", 
    "new window", 
    "pop-up", 
    "pop up"
];

//Tooltip formatting shortcuts
const hr = `<hr aria-hidden='true' class='sa11y-hr'>`;
const newTab = `<span class='sa11y-visually-hidden'>(Opens in new tab)</span>`;

// IM - Issue Message
const IM = {
    headings: {

        nonconsecLevel: (
            prevLevel,
            level
        ) => 
            `Non-consecutive heading level used. Headings should never skip levels, or go from <span class='sa11y-bold'>Heading ${prevLevel}</span> to <span class='sa11y-red-text sa11y-bold'>Heading ${level}</span>.`,

        emptyHeading: (level) =>
            `Detected empty heading! To fix, delete this line or change its format from <span class='sa11y-red-text sa11y-bold'>Heading ${level}</span> to <span class='sa11y-bold'>Normal</span> or <span class='sa11y-bold'>Paragraph</span>.`,

        headingTooLong: (
            headingLength
        ) => 
            `Heading is too long! Headings are used to organize content and convey structure. They should be brief, clear, informative and unique. Please keep headings less than 160 characters (no more than a sentence).
            ${hr}
            Character count: <span class='sa11y-bold sa11y-red-text'>${headingLength}</span>.`,

        firstHeading: () =>
            `First heading on page should usually be a Heading 1 or Heading 2. Heading 1 should be the start of the main content section, and is the main heading that describes the overall purpose of the page. Learn more about <a href='https://www.w3.org/WAI/tutorials/page-structure/headings/' target='_blank'>Heading Structure. ${newTab}</a>`,

        missingHeadingOne: () =>
            `Missing Heading 1. Heading 1 should be the start of the main content section, and is the main heading that describes the overall purpose of the page. Learn more about <a href='https://www.w3.org/WAI/tutorials/page-structure/headings/' target='_blank'>Heading Structure. ${newTab}</a>`,
    },

    linktext: {

        linkErrorMessage: () => 
            `Remove empty hyperlinks without any text.`,

        emptyLinkNoLabel: () => 
            `Hyperlink does not have discernable text that is visible to screen readers and other assistive technology. To fix:
            <ul>
                <li>Add some concise text that describes where the link takes you.</li>
                <li>If it's an <a href='https://a11y-101.com/development/icons-and-links' target='_blank'>icon link,${newTab}</a> it is likely missing a descriptive label.</li>
                <li>If you think this link is an error due to a copy/paste bug, consider deleting it.</li>
            </ul>`,

        linkLabel: (linkText) =>
            `The descriptive label for this link is: <span class='sa11y-bold'>${linkText}</span>`,

        stopWordMessage: (error) =>
            `Link text may not be descriptive enough out of context: <span class='sa11y-red-text sa11y-bold'>${error}</span>
            ${hr}
            <span class='sa11y-bold'>Tip!</span> Link text should always be clear, unique, and meaningful. Avoid common words like &quot;click here&quot; or &quot;learn more&quot;.`,

        linkBestPractices: (error) =>
            `Consider replacing link text: <span class='sa11y-red-text sa11y-bold'>${error}</span>
            ${hr}
            <ul>
                <li>&quot;Click here&quot; places focus on mouse mechanics, when many people do not use a mouse or may be viewing this website on a mobile device. Consider using a different verb that relates to the task.</li>
                <li>Avoid using HTML symbols as call to actions unless they are hidden to assistive technologies.</li>
            </ul>
            `,

        linkStopWordMessage: () =>
            `Longer, less intelligible URLs used as link text might  be difficult to listen to with assistive technology. In most cases, it is better to use human-readable text instead of the URL. Short URLs (such as a site's homepage) are okay.
            ${hr}
            <span class='sa11y-bold'>Tip!</span> Link text should always be clear, unique, and meaningful so it could be understood out of context.`,
    },

    linksAdvanced: {

        newTabWarning: () =>
            `Link opens in new tab or window without warning. Doing so can be disorienting, especially for people who have difficulty perceiving visual content. Secondly, it's not always a good practice to control someone's experience or make decisions for them. Indicate that the link opens in a new window within the link text.
            ${hr}
            <span class='sa11y-bold'>Tip!</span> Learn best practices: <a href='https://www.nngroup.com/articles/new-browser-windows-and-tabs/'>opening links in new browser windows and tabs.</a>`,

        fileTypeWarning: () =>
            `Link points to a PDF or downloadable file (e.g. MP3, Zip, Word Doc) without warning. Indicate the file type within the link text. If it's a large file, consider including the file size.
            ${hr}
            <span class='sa11y-bold'>Example:</span> Executive Report (PDF, 3MB)`,
            
        linkIdenticalName: (linkText) => 
            `Link has identical text as another link, although it points to a different page. Multiple links with the same text may cause confusion for people who use screen readers.
            ${hr}
            Consider making the following link more descriptive to help distinguish it from other links: <span class='sa11y-red-text sa11y-bold'>${linkText}</span>`
    },

    images: {

        missingAltLinkButHasTextMessage: () =>
            `Image is being used as a hyperlink with surrounding text, although the alt attribute should be marked as decorative or null.`,

        missingAltLinkMessage: () =>
            `Image is being used as a hyperlink but is missing alt text! Please ensure alt text describes where the link takes you.`,
            
        missingAltMessage: () =>
            `Missing alt text! If the image conveys a story, a mood or important information - be sure to describe the image.`,

        linkImageBadAltMessage: (altText, error) =>
            `Detected file extension within alt text. Ensure the alt text describes destination of link, not a literal description of the picture. Remove: <span class='sa11y-red-text sa11y-bold'>${error}</span>.
            ${hr}
            The alt text for this image is: <span class='sa11y-bold'>${altText}</span>`,

        linkImageSusAltMessage: (
            altText,
            error
        ) => 
            `Detected redundant alt text. Ensure the alt text describes destination of link, not a literal description of the picture. 
            Consider removing word: <span class='sa11y-red-text sa11y-bold'>${error}</span>. 
            ${hr} 
            The alt text for this image is: <span class='sa11y-bold'>${altText}</span>`,

        altHasBadWordMessage: (
            altText,
            error
        ) => 
            `Detected file extension within alt text. If the image conveys a story, a mood or important information - be sure to describe the image. 
            Remove: <span class='sa11y-red-text sa11y-bold'>${error}</span>.
            ${hr} 
            The alt text for this image is: <span class='sa11y-bold'>${altText}</span>`,

        altPlaceholderMessage: (
            altText
        ) => 
            `Detected non-descript or placeholder alternative text. Replace the following alternative text with something more meaningful: <span class='sa11y-bold sa11y-red-text'>${altText}</span>.`,

        linkImagePlaceholderAltMessage: (
            altText
        ) => 
            `Detected non-descript or placeholder alternative text within hyperlinked image. Ensure the alt text describes destination of link, not a literal description of the picture. Replace the following alternative text: <span class='sa11y-bold sa11y-red-text'>${altText}</span>.`,

        altHasSusWordMessage: (
            altText,
            error
        ) => 
            `Detected redundant alt text. It is not necessary to include words like <em>image</em>, <em>graphic</em> or the file extension. 
            Consider removing the word: <span class='sa11y-red-text sa11y-bold'>${error}</span>.
            ${hr}
            The alt text for this image is: <span class='sa11y-bold'>${altText}</span>`,

        imageLinkNullAltNoTextMessage: () =>
            `Image within hyperlink is marked as decorative and there is no link text. Please add alt text to image that describes destination of link.`,

        linkHasAltMessage: () =>
            `Image is marked as decorative, although the hyperlink is using the surrounding text as a descriptive label.`,

        decorativeMessage: () =>
            `Image marked as <span class='sa11y-bold'>decorative</span> and will be ignored by assistive technology. If the image conveys a story, mood or important information - be sure to add alt text.`,

        hyperlinkedImageAriaHidden: () => 
            `Hyperlink around image has <span class='sa11y-kbd'>aria-hidden=&quot;true&quot;</span> but is still keyboard focusable. If you are intending to hide a redundant or duplicate hyperlink, add <span class='sa11y-kbd'>tabindex=&quot;-1&quot;</span> as well.`,

        hyperlinkAltLengthMessage: (
            altText,
            altLength
        ) => 
            `Alt text description on hyperlinked image is <span class='sa11y-bold'>too long</span>. 
            The alt text on hyperlinked images should describe where the link takes you, not a literal description of the image. 
            <span class='sa11y-bold'>Consider using the title of the page it links to as the alt text.</span> 
            ${hr} 
            The alt text is <span class='sa11y-red-text sa11y-bold'>${altLength}</span> characters: 
            <span class='sa11y-red-text sa11y-bold'>${altText}</span>`,

        imageLinkAltTextMessage: (
            altText
        ) => 
            `Image link contains alt text, although please ensure alt text describes the destination page. 
            <span class='sa11y-bold'>Consider using the title of the page it links to as the alt text.</span>
            Does the alt text describe where the link takes you? 
            ${hr}
            Alt text: <span class='sa11y-bold'>${altText}</span>`,

        anchorLinkAndAltMessage: (
            altText
        ) => 
            `Image link contains <span class='sa11y-bold'>both alt text and surrounding link text.</span> If this image is decorative and is being used as a functional link to another page, consider marking the image as decorative or null - the surrounding link text should suffice. 
            ${hr}
            Alt text: <span class='sa11y-bold'>${altText}</span>`,

        altTooLongMessage: (
            altText,
            altLength
        ) => 
            `Alt text description is <span class='sa11y-bold'>too long</span>. Alt text should be concise, yet meaningful like a <em>tweet</em> (around 100 characters). 
            If this is a complex image or a graph, consider putting the long description of the image in text below or in an accordion component. 
            ${hr} 
            The alt text is <span class='sa11y-red-text sa11y-bold'>${altLength}</span> characters: 
            <span class='sa11y-red-text sa11y-bold'>${altText}</span>`,

        passAlt: (altText) =>
            `The alt text for this image is: <span class='sa11y-bold'>${altText}</span>`,

    },
    labels: {

        inputResetMessage: () => 
            `Reset buttons should <span class='sa11y-bold'>not</span> be used unless specifically needed, because they are easy to activate by mistake.
            ${hr} 
            <span class='sa11y-bold'>Tip!</span> Learn why <a href='https://www.nngroup.com/articles/reset-and-cancel-buttons/' target='_blank'>Reset and Cancel buttons pose usability issues. ${newTab}</a>`,

        missingLabelMessage: () =>
            `There is no label associated with this input. Please add an <span class='sa11y-kbd'>id</span> to this input, and add a matching <span class='sa11y-kbd'>for</span> attribute to the label.`,

        ariaLabelInputMessage: () =>
            `Detected an <span class='sa11y-kbd'>aria-label</span> with this input, although make sure there is a visible label too.`,

        noForAttributeMessage: (t) =>
            `There is no label associated with this input. Add a <span class='sa11y-kbd'>for</span> attribute to the label that matches the <span class='sa11y-kbd'>id</span> of this input. 
            ${hr} 
            The ID for this input is: <span class='sa11y-bold'>id=&#34;${t}&#34;</span>`,
    },

    QA: {
        video: () =>
            `Please ensure <span class='sa11y-bold'>all videos have closed captioning.</span> Providing captions for all audio and video content is a mandatory Level A requirement. Captions support people who are D/deaf or hard-of-hearing.`,

        audio: () =>
            `Please ensure to provide a <span class='sa11y-bold'>transcript for all podcasts.</span> Providing transcripts for audio content is a mandatory Level A requirement. Transcripts support people who are D/deaf or hard-of-hearing, but can benefit everyone. Consider placing the transcript below or within an accordion panel.`,

        dataViz: () =>
            `Data visualization widgets like this are often problematic for people who use a keyboard or screen reader to navigate, and can present significant difficulties for people who have low vision or colorblindness. It's recommended to provide the same information in an alternative (text or table) format below the widget.
            ${hr}
            Learn more about <a href='https://www.w3.org/WAI/tutorials/images/complex/' target='_blank'>complex images. ${newTab}</a>`,

        twitter: () =>
            `The default Twitter timeline may cause accessibility issues for people who use a keyboard to navigate. Secondly, the inline scrolling of the Twitter timeline may cause usability issues for mobile. It's recommended to add the following data attributes to the embed code. 
            ${hr}
            <span class='sa11y-bold'>It's recommended to:</span>
                <ul>
                    <li>Add <span class='sa11y-kbd'>data-tweet-limit=&#34;2&#34;</span> to limit the amount of tweets.</li>
                    <li>Add <span class='sa11y-kbd'>data-chrome=&#34;nofooter noheader&#34;</span> to remove the widget's header and footer.</li>
                </ul>`,

        badLink: (el) =>
            `Bad link found. Link appears to point to a development environment. Make sure the link does not contain <em>dev</em> or <em>wp-admin</em> in the URL. 
            ${hr}
            This link points to:
            <br>
            <span class='sa11y-bold sa11y-red-text'>${el}</span>`,

        fakeHeading: (boldtext) => 
            `Is this a heading? <span class='sa11y-bold sa11y-red-text'>${boldtext}</span>
            ${hr}
            A line of bold text might look like a heading, but someone using a screen reader cannot tell that it is important or jump to its content. Bolded text should never replace semantic headings (Heading 2 to Heading 6).
            `,

        pdf: (pdfCount) =>
            `PDFs are considered web content and must be made accessible as well. PDFs often contain issues for people who use screen readers (missing structural tags or missing form field labels) and people who have low vision (text does not reflow when enlarged). 
            <ul>
                <li>If this is a form, consider using an accessible HTML form as an alternative.</li>
                <li>If this is a document, consider converting it into a web page.</li>
            </ul>
            Otherwise, please check <span class='sa11y-bold sa11y-red-text'>${pdfCount}</span> <a href='https://www.adobe.com/accessibility/products/acrobat/using-acrobat-pro-accessibility-checker.html' target='_blank'>PDF(s) for accessibility in Acrobat DC. ${newTab}</a>`,

        blockquoteMessage: (bqHeadingText) =>
            `Is this a heading? <span class='sa11y-bold sa11y-red-text'>${bqHeadingText}</span> 
            ${hr}
            Blockquotes should be used for quotes only. If this is intended to be a heading, change this blockquote to a semantic heading (e.g. Heading 2 or Heading 3).`,

        uppercaseWarning: () =>
            `Detected all caps. Some screen readers may interpret all caps text as an acronym and will read each letter individually. Additionally, some people find all caps more difficult to read and it may give the appearance of SHOUTING.`,

        tables: {

            missingHeadings: () =>
                `Missing table headers! Accessible tables need HTML markup that indicates header cells and data cells which defines their relationship. This information provides context to people who use assistive technology. Tables should be used for tabular data only.
                ${hr}
                Learn more about <a href='https://www.w3.org/WAI/tutorials/tables/' target='_blank'>accessible tables. ${newTab}</a>`,

            semanticHeading: () =>
                `Semantic headings such as Heading 2 or Heading 3 should only be used for sections of content; <span class='sa11y-bold'>not</span> in HTML tables. Indicate table headings using the <span class='sa11y-bold'>th</span> element instead.
                ${hr}
                Learn more about <a href='https://www.w3.org/WAI/tutorials/tables/' target='_blank'>accessible tables. ${newTab}</a>`,

            emptyHeading: () =>
                `Empty table header found! Table headers should <em>never</em> be empty. It is important to designate row and/or column headers to convey their relationship. This information provides context to people who use assistive technology. Please keep in mind that tables should be used for tabular data only.
                ${hr}
                Learn more about <a href='https://www.w3.org/WAI/tutorials/tables/' target='_blank'>accessible tables. ${newTab}</a>`,
        },

        badItalics: () =>
            `Bold and italic tags have semantic meaning, and should <span class='sa11y-bold'>not</span> be used to highlight entire paragraphs. Bolded text should be used to provide strong <span class='sa11y-bold'>emphasis</span> on a word or phrase. Italics should be used to highlight proper names (i.e. book and article titles), foreign words, quotes. Long quotes should be formatted as a blockquote.`,

        pageLanguageMessage: () =>
            `Page language not declared! Please <a href='https://www.w3.org/International/questions/qa-html-language-declarations' target='_blank'>declare language on HTML tag. ${newTab}</a>`,

        shouldBeList: (firstPrefix) =>
            `Are you trying to create a list? Possible list item detected: <span class='sa11y-bold sa11y-red-text'>${firstPrefix}</span>
            ${hr} 
            Make sure to use semantic lists by using the bullet or number formatting buttons instead. When using a semantic list, assistive technologies are able to convey information such as the total number of items and the relative position of each item in the list. Learn more about <a href='https://www.w3.org/WAI/tutorials/page-structure/content/#lists' target='_blank'>semantic lists. ${newTab}</a>`,

        announcementWarning: () =>
            `More than one Announcement component found! The Announcement component should be used strategically and sparingly. It should be used to get attention or indicate that something is important. Misuse of this component makes it less effective or impactful. Secondly, this component is semantically labeled as an Announcement for people who use screen readers.`,
    },

    contrast: {

        errorM: (
            cdetail,
            cratio,
            nodetext
        ) => 
            `${cdetail} does not have enough contrast with the background. 
            The contrast ratio should be at least 4.5:1 for normal text and 3:1 for large text. 
            ${hr} 
            The contrast ratio is <span class='sa11y-red-text sa11y-bold'>${cratio}</span> for the following text: 
            <span class='sa11y-bold sa11y-red-text'>${nodetext}</span>`,

        warningM: (nodetext) =>
            `The contrast of this text is unknown and needs to be manually reviewed. Ensure the text and the background have strong contrasting colours. The contrast ratio should be at least 4.5:1 for normal text and 3:1 for large text. 
            ${hr}Please review contrast of the following text:
            <br>
            <span class='sa11y-bold'>${nodetext}</span>`,
    },

    readability: {

        missingMainContentMessage: () =>
        `Please identify the <a href="https://www.w3.org/WAI/tutorials/page-structure/regions/#main-content" target="_blank">main content region to calculate readability score. ${newTab}</a>`,

        noPorLiMessage: () =>
        `No paragraph <span class="sa11y-badge">&lt;p&gt;</span> or list content <span class="sa11y-badge">&lt;li&gt;</span> detected within main content area.`,

        notEnoughContentMessage: () =>
        `Not enough content to calculate readability score.`

    }
};