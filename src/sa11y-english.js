/*-----------------------------------------------------------------------
* Sa11y, the accessibility quality assurance assistant.    
* @version: 2.2.1     
* @language: English        
* @author: Development led by Adam Chaboryk, CPWA
* @acknowledgements: https://sa11y.netlify.app/acknowledgements/
* @license: https://github.com/ryersondmp/sa11y/blob/master/LICENSE.md
* Copyright (c) 2020 - 2022 Toronto Metropolitan University (formerly Ryerson University).
* The above copyright notice shall be included in all copies or substantial portions of the Software.
------------------------------------------------------------------------*/

//Tooltip formatting shortcuts.
const sa11yHr = `<hr aria-hidden='true' class='sa11y-hr'>`;
const sa11yNewTab = `<span class='sa11y-visually-hidden'>(Opens in new tab)</span>`;
const sa11yLang = {

    // Main interface
    LANG_CODE: 'en',
    MAIN_TOGGLE_LABEL: 'Check Accessibility',
    CONTAINER_LABEL: 'Accessibility Checker',
    ERROR: 'Error',
    WARNING: 'Warning', 
    GOOD: 'Good',
    ON: 'On',
    OFF: 'Off',
    ALERT_TEXT: 'Alert',
    ALERT_CLOSE: 'Close',
    SHOW_OUTLINE: 'Show Outline',
    HIDE_OUTLINE: 'Hide Outline',
    SHOW_SETTINGS: 'Show Settings',
    HIDE_SETTINGS: 'Hide Settings',
    PAGE_OUTLINE: 'Page outline',
    SETTINGS: 'Settings',
    CONTRAST: 'Contrast',
    FORM_LABELS: 'Form labels',
    LINKS_ADVANCED: 'Links (Advanced)',
    DARK_MODE: 'Dark mode',
    SHORTCUT_SCREEN_READER: 'Skip to issue. Keyboard shortcut: Alt period',
    SHORTCUT_TOOLTIP: 'Skip to issue',

    // Alternative text module stop words
    SUSPICIOUS_ALT_STOPWORDS: ['image', 'graphic', 'picture', 'photo'],
    PLACEHOLDER_ALT_STOPWORDS: ['alt', 'image', 'photo', 'decorative', 'photo', 'placeholder', 'placeholder image', 'spacer', '.'],
    PARTIAL_ALT_STOPWORDS: [
        'click',
        'click here',
        'click here for more',
        'click here to learn more',
        'click here to learn more.',
        'check out',
        'download',
        'download here',
        'download here.',
        'find out',
        'find out more',
        'find out more.',
        'find out more >',
        'form',
        'here',
        'here.',
        'info',
        'information',
        'link',
        'learn',
        'learn more',
        'learn more.',
        'learn more >',
        'learn to',
        'more',
        'more >',
        'page',
        'paper',
        'read more',
        'read more >',
        'read',
        'read this',
        'this',
        'this page',
        'this page.',
        'this website',
        'this website.',
        'view',
        'view our',
        'website',
        '.'
    ],
    WARNING_ALT_STOPWORDS: ['< ', ' >', 'click here'],
    NEW_WINDOW_PHRASES: ['external', 'new tab', 'new window', 'pop-up', 'pop up'],

    // Only some items in list would need to be translated.
    FILE_TYPE_PHRASES: ['document', 'spreadsheet', 'worksheet', 'install', 'video', 'pdf', 'doc',
        'docx', 'word', 'mp3', 'ppt', 'text', 'pptx', 'powerpoint', 'txt', 'exe', 'dmg', 'rtf', 'windows', 'macos', 'csv', 'xls', 'xlsx', 'mp4', 'mov', 'avi', 'zip'],

    // Panel status
    PANEL_HEADING: `Accessibility check`,
    PANEL_STATUS_BOTH: (errorCount, warningCount) => `Errors <span class="sa11y-panel-count sa11y-margin-right">${errorCount}</span> Warnings <span class="sa11y-panel-count">${warningCount}</span>`,
    PANEL_STATUS_ERRORS: (errorCount) => `Errors <span class="sa11y-panel-count">${errorCount}</span>`,
    PANEL_STATUS_WARNINGS: (warningCount) => `Warnings <span class="sa11y-panel-count">${warningCount}</span>`,
    PANEL_STATUS_NONE: `No errors found.`,
    PANEL_ICON_WARNINGS: (warningCount) => `${warningCount} <span class="sa11y-visually-hidden">warnings found.</span>`,
    PANEL_ICON_TOTAL: (totalCount) => `${totalCount} <span class="sa11y-visually-hidden">total issues found.</span>`,
    NOT_VISIBLE_ALERT: `The item you are trying to view is not visible; it may be hidden or inside of an accordion or tab component. Here's a preview:`,
    
    // Error handling.
    ERROR_MISSING_ROOT_TARGET: (root) => `The full page was checked for accessibility because the target area <span class="sa11y-kbd">${root}</span> does not exist.`,

    // Readability
    LANG_READABILITY: 'Readability',
    LANG_AVG_SENTENCE: 'Average words per sentence:',
    LANG_COMPLEX_WORDS: 'Complex words:',
    LANG_TOTAL_WORDS: 'Words:',
    LANG_VERY_DIFFICULT: 'Very difficult',
    LANG_DIFFICULT: 'Difficult',
    LANG_FAIRLY_DIFFICULT: 'Fairly difficult',
    LANG_GOOD: 'Good',

    //Headings
    HEADING_NON_CONSECUTIVE_LEVEL: (prevLevel, level) =>
        `Non-consecutive heading level used. Headings should never skip levels, or go from <strong>Heading ${prevLevel}</strong> to <strong class='sa11y-red-text'>Heading ${level}</strong>.`,

    HEADING_EMPTY: (level) =>
        `Empty heading found! To fix, delete this line or change its format from <strong class='sa11y-red-text'>Heading ${level}</strong> to <strong>Normal</strong> or <strong>Paragraph</strong>.`,

    HEADING_LONG: (headingLength) =>
        `Heading is long! Headings should be used to organize content and convey structure. They should be brief, informative, and unique. Please keep headings less than 160 characters (no more than a sentence).
        ${sa11yHr}
        Character count: <strong class='sa11y-red-text'>${headingLength}</strong>`,

    HEADING_FIRST: 
        `The first heading on a page should usually be a Heading 1 or Heading 2. Heading 1 should be the start of the main content section, and is the main heading that describes the overall purpose of the page. Learn more about <a href='https://www.w3.org/WAI/tutorials/page-structure/headings/' target='_blank' rel='noopener noreferrer'>Heading Structure. ${sa11yNewTab}</a>`,

    HEADING_MISSING_ONE: 
        `Missing Heading 1. Heading 1 should be the start of the main content area, and is the main heading that describes the overall purpose of the page. Learn more about <a href='https://www.w3.org/WAI/tutorials/page-structure/headings/' target='_blank' rel='noopener noreferrer'>Heading Structure. ${sa11yNewTab}</a>`,

    HEADING_EMPTY_WITH_IMAGE: (level) =>
        `Heading has no text, but contains an image. If this is not a heading, change its format from <strong class='sa11y-red-text'>Heading ${level}</strong> to <strong>Normal</strong> or <strong>Paragraph</strong>. Otherwise, please add alt text to the image if it is not decorative.`,

    PANEL_HEADING_MISSING_ONE: 
        `Missing Heading 1!`,

    //Links
    LINK_EMPTY: 
        `Remove empty links without any text.`,

    LINK_EMPTY_LINK_NO_LABEL: 
        `Link does not have discernable text that is visible to screen readers and other assistive technology. To fix:
        <ul>
            <li>Add some concise text that describes where the link takes you.</li>
            <li>If it is an <a href='https://a11y-101.com/development/icons-and-links' target='_blank' rel='noopener noreferrer'>icon link or SVG,${sa11yNewTab}</a> it is likely missing a descriptive label.</li>
            <li>If you think this link is an error due to a copy/paste bug, consider deleting it.</li>
        </ul>`,

    LINK_LABEL: (linkText) =>
        `<strong>Link label:</strong> ${linkText}`,

    LINK_STOPWORD: (error) =>
        `Link text may not be descriptive enough out of context: <strong class='sa11y-red-text'>${error}</strong>
        ${sa11yHr}
        <strong>Tip!</strong> Link text should always be clear, unique, and meaningful. Avoid common words like &quot;click here&quot; or &quot;learn more&quot;.`,

    LINK_BEST_PRACTICES: (error) =>
        `Consider replacing the link text: <strong class='sa11y-red-text'>${error}</strong>
        ${sa11yHr}
        <ul>
            <li>&quot;Click here&quot; places focus on mouse mechanics, when many people do not use a mouse or may be viewing this website on a mobile device. Consider using a different verb that relates to the task.</li>
            <li>Avoid using HTML symbols as call to actions unless they are hidden to assistive technologies.</li>
        </ul>`,

    LINK_URL: () =>
        `Longer, less intelligible URLs used as link text might be difficult to listen to with assistive technology. In most cases, it is better to use human-readable text instead of the URL. Short URLs (such as a site's homepage) are okay.
        ${sa11yHr}
        <strong>Tip!</strong> Link text should always be clear, unique, and meaningful so it could be understood out of context.`,

    // Links advanced
    NEW_TAB_WARNING:
        `Link opens in a new tab or window without warning. Doing so can be disorienting, especially for people who have difficulty perceiving visual content. Secondly, it is not always a good practice to control someone's experience or make decisions for them. Indicate that the link opens in a new window within the link text.
        ${sa11yHr}
        <strong>Tip!</strong> Learn best practices: <a href='https://www.nngroup.com/articles/new-browser-windows-and-tabs/'>opening links in new browser windows and tabs.</a>`,

    FILE_TYPE_WARNING:
        `Link points to a PDF or downloadable file (e.g. MP3, Zip, Word Doc) without warning. Indicate the file type within the link text. If it is a large file, consider including the file size.
        ${sa11yHr}
        <strong>Example:</strong> Executive Report (PDF, 3MB)`,

    LINK_IDENTICAL_NAME: (linkText) =>
        `Link has identical text as another link, although it points to a different page. Multiple links with the same text may cause confusion for people who use screen readers.
        ${sa11yHr}
        Consider making the following link more descriptive to help distinguish it from other links: <strong class='sa11y-red-text'>${linkText}</strong>`,

    // Images
    MISSING_ALT_LINK_BUT_HAS_TEXT_MESSAGE: 
        `Image is being used as a link with surrounding text, although the alt attribute should be marked as decorative or null.`,

    MISSING_ALT_LINK_MESSAGE: 
        `Image is being used as a link but is missing alt text! Please ensure alt text describes where the link takes you.`,

    MISSING_ALT_MESSAGE: 
        `Missing alt text! If the image conveys a story, mood, or important information - be sure to describe the image.`,

    LINK_IMAGE_BAD_ALT_MESSAGE: (altText, error) =>
        `File extension within the alt text found. Ensure the alt text describes the destination of the link, not a literal description of the image. Remove: <strong class='sa11y-red-text'>${error}</strong>.
        ${sa11yHr}
        <strong>Alt text:</strong> ${altText}`,

    LINK_IMAGE_PLACEHOLDER_ALT_MESSAGE: (altText) =>
        `Non-descript or placeholder alt text within a linked image found. Ensure the alt text describes the destination of the link, not a literal description of the image. Replace the following alt text: <strong class='sa11y-red-text'>${altText}</strong>`,

    LINK_IMAGE_SUS_ALT_MESSAGE: (altText, error) =>
        `Assistive technologies already indicate that this is an image, so &quot;<strong class='sa11y-red-text'>${error}</strong>&quot; or &quot;${error} of&quot; may be redundant. Ensure the alt text describes the destination of the link, not a literal description of the image.
        ${sa11yHr} 
        <strong>Alt text:</strong> ${altText}`,

    LINK_ALT_HAS_BAD_WORD_MESSAGE: (altText, error) =>
        `File extension within the alt text found. If the image conveys a story, mood, or important information - be sure to describe the image. 
        Remove: <strong class='sa11y-red-text'>${error}</strong>.
        ${sa11yHr} 
        <strong>Alt text:</strong> ${altText}`,

    ALT_PLACEHOLDER_MESSAGE: (altText) =>
        `Non-descript or placeholder alt text found. Replace the following alt text with something more meaningful: <strong class=' sa11y-red-text'>${altText}</strong>`,

    ALT_HAS_SUS_WORD: (altText, error) =>
        `Assistive technologies already indicate that this is an image, so &quot;<strong class='sa11y-red-text'>${error}</strong>&quot; or &quot;${error} of&quot; may be redundant.
        ${sa11yHr}
        <strong>Alt text:</strong> ${altText}`,

    LINK_IMAGE_ARIA_HIDDEN: 
        `Link around image has <span class='sa11y-kbd'>aria-hidden=&quot;true&quot;</span> but is still keyboard focusable. If you are intending to hide a redundant or duplicate link, add <span class='sa11y-kbd'>tabindex=&quot;-1&quot;</span> as well.`,

    LINK_IMAGE_NO_ALT_TEXT: 
        `Image within link is marked as decorative and there is no link text. Please add alt text to the image that describes the destination of the link.`,

    LINK_IMAGE_HAS_TEXT: 
        `Image is marked as decorative, although the link is using the surrounding text as a descriptive label.`,

    LINK_IMAGE_LONG_ALT: (altText, altLength) =>
        `Alt text description on a linked image is <strong>too long</strong>. The alt text on linked images should describe where the link takes you, not a literal description of the image. 
        <strong>Consider using the title of the page it links to as the alt text.</strong> 
        ${sa11yHr} 
        <strong>Alt text (<span class='sa11y-red-text sa11y-bold'>${altLength}</span> characters):</strong> ${altText}`,

    LINK_IMAGE_ALT_WARNING: (altText) =>
        `Image link contains alt text, although please ensure alt text describes the destination page. <strong>Consider using the title of the page it links to as the alt text.</strong>
        Does the alt text describe where the link takes you? 
        ${sa11yHr}
        <strong>Alt text:</strong> ${altText}`,

    LINK_IMAGE_ALT_AND_TEXT_WARNING: (altText) =>
        `Image link contains <strong>both alt text and surrounding link text.</strong> If this image is decorative and is being used as a functional link to another page, consider marking the image as decorative or null - the surrounding link text should suffice. 
        ${sa11yHr}
        <strong>Alt text:</strong> ${altText}`,

    IMAGE_FIGURE_DECORATIVE: 
        `Image is marked as <strong>decorative</strong> and will be ignored by assistive technology.
        ${sa11yHr} 
        Although a <strong>caption</strong> was provided, the image should also have alt text in most cases. 
        <ul>
            <li>The alt text should provide a concise description of what is in the image.</li>
            <li>The caption should usually provide context to relate the image back to the surrounding content, or give attention to a particular piece of information.</li>
        </ul>
        Learn more: <a href='https://thoughtbot.com/blog/alt-vs-figcaption#the-figcaption-element' target='_blank' rel='noopener noreferrer'>alt versus figcaption. ${sa11yNewTab}</a>`,

    IMAGE_FIGURE_DUPLICATE_ALT: (altText) =>  
        `Do not use the exact same words for both the alt and caption text. Screen readers will announce the information twice.
        <ul>
            <li>The alt text should provide a concise description of what is in the image.</li>
            <li>The caption should usually provide context to relate the image back to the surrounding content, or give attention to a particular piece of information.</li>
        </ul>
        Learn more: <a href='https://thoughtbot.com/blog/alt-vs-figcaption#the-figcaption-element' target='_blank' rel='noopener noreferrer'>alt versus figcaption. ${sa11yNewTab}</a>
        ${sa11yHr}
        <strong>Alt text:</strong> ${altText}`,

    IMAGE_DECORATIVE: 
        `Image is marked as <strong>decorative</strong> and will be ignored by assistive technology. If the image conveys a story, mood or important information - be sure to add alt text.`,

    IMAGE_ALT_TOO_LONG: (altText, altLength) =>
        `Alt text description is <strong>too long</strong>. Alt text should be concise, yet meaningful like a <em>tweet</em> (around 100 characters). If this is a complex image or a graph, consider putting the long description of the image in the text below or an accordion component. 
        ${sa11yHr} 
        <strong>Alt text (<span class='sa11y-red-text sa11y-bold'>${altLength}</span> characters):</strong> ${altText}`,

    IMAGE_PASS: (altText) =>
        `<strong>Alt text:</strong> ${altText}`,

    //Labels
    LABELS_MISSING_IMAGE_INPUT_MESSAGE: 
        `Image button is missing alt text. Please add alt text to provide an accessible name. For example: <em>Search</em> or <em>Submit</em>.`,

    LABELS_INPUT_RESET_MESSAGE: 
        `Reset buttons should <strong>not</strong> be used unless specifically needed because they are easy to activate by mistake.
        ${sa11yHr} 
        <strong>Tip!</strong> Learn why <a href='https://www.nngroup.com/articles/reset-and-cancel-buttons/' target='_blank' rel='noopener noreferrer'>Reset and Cancel buttons pose usability issues. ${sa11yNewTab}</a>`,

    LABELS_ARIA_LABEL_INPUT_MESSAGE: (ariaLabel) =>
        `Input has an accessible name, although please ensure there is a visible label too. 
        ${sa11yHr} 
        The accessible name for this input is: <span class='sa11y-bold'>${ariaLabel}</span>`,

    LABELS_NO_FOR_ATTRIBUTE_MESSAGE: (id) =>
        `There is no label associated with this input. Add a <span class='sa11y-kbd'>for</span> attribute to the label that matches the <span class='sa11y-kbd'>id</span> of this input. 
        ${sa11yHr} 
        The ID for this input is: <strong>id=&#34;${id}&#34;</strong>`,

    LABELS_MISSING_LABEL_MESSAGE: 
        `There is no label associated with this input. Please add an <span class='sa11y-kbd'>id</span> to this input, and add a matching <span class='sa11y-kbd'>for</span> attribute to the label.`,

    // Embedded content
    EMBED_VIDEO: 
        `Please ensure <strong>all videos have closed captioning.</strong> Providing captions for all audio and video content is a mandatory Level A requirement. Captions support people who are D/deaf or hard-of-hearing.`,

    EMBED_AUDIO: 
        `Please ensure to provide a <strong>transcript for all podcasts.</strong> Providing transcripts for audio content is a mandatory Level A requirement. Transcripts support people who are D/deaf or hard-of-hearing, but can benefit everyone. Consider placing the transcript below or within an accordion panel.`,

    EMBED_DATA_VIZ: 
        `Data visualization widgets like this are often problematic for people who use a keyboard or screen reader to navigate, and can present significant difficulties for people who have low vision or colorblindness. It's recommended to provide the same information in an alternative (text or table) format below the widget.
        ${sa11yHr}
        Learn more about <a href='https://www.w3.org/WAI/tutorials/images/complex/' target='_blank' rel='noopener noreferrer'>complex images. ${sa11yNewTab}</a>`,

    EMBED_TWITTER: 
        `The default Twitter timeline may cause accessibility issues for people who use a keyboard to navigate. Secondly, the inline scrolling of the Twitter timeline may cause usability issues for mobile. It's recommended to add the following data attributes to the embed code. 
        ${sa11yHr}
        <strong>It's recommended to:</strong>
        <ul>
            <li>Add <span class='sa11y-kbd'>data-tweet-limit=&#34;2&#34;</span> to limit the amount of tweets.</li>
            <li>Add <span class='sa11y-kbd'>data-chrome=&#34;nofooter noheader&#34;</span> to remove the widget's header and footer.</li>
        </ul>`,

    EMBED_MISSING_TITLE: 
        `Embedded content requires an accessible name that describes its contents. Please provide a unique <span class='sa11y-kbd'>title</span> or <span class='sa11y-kbd'>aria-label</span> attribute on the <span class='sa11y-kbd'>iframe</span> element. Learn more about <a href='https://dequeuniversity.com/tips/provide-iframe-titles' target='_blank' rel='noopener noreferrer'>iFrames. ${sa11yNewTab}</a>`,

    EMBED_GENERAL_WARNING: 
        `Unable to check embedded content. Please make sure that images have alt text, videos have captions, text has sufficient contrast, and interactive components are <a href='https://webaim.org/techniques/keyboard/' target='_blank' rel='noopener noreferrer'>keyboard accessible. ${sa11yNewTab}</a>`,

    // Quality assurance
    QA_BAD_LINK: (el) =>
        `Bad link found. Link appears to point to a development environment.
        ${sa11yHr}
        This link points to:
        <br>
        <strong class='sa11y-red-text'>${el}</strong>`,

    QA_BAD_ITALICS: 
        `Bold and italic tags have semantic meaning, and should <strong>not</strong> be used to highlight entire paragraphs. Bolded text should be used to provide strong <strong>emphasis</strong> on a word or phrase. Italics should be used to highlight proper names (i.e. book and article titles), foreign words, quotes. Long quotes should be formatted as a blockquote.`,

    QA_PDF: (pdfCount) =>
        `PDFs are considered web content and must be made accessible as well. PDFs often contain issues for people who use screen readers (missing structural tags or missing form field labels) and people who have low vision (text does not reflow when enlarged). 
        <ul>
            <li>If this is a form, consider using an accessible HTML form as an alternative.</li>
            <li>If this is a document, consider converting it into a web page.</li>
        </ul>
        Otherwise, please check <strong class='sa11y-red-text'>${pdfCount}</strong> <a href='https://www.adobe.com/accessibility/products/acrobat/using-acrobat-pro-accessibility-checker.html' target='_blank' rel='noopener noreferrer'>PDF(s) for accessibility in Acrobat DC. ${sa11yNewTab}</a>`,

    QA_PAGE_LANGUAGE: 
        `Page language not declared! Please <a href='https://www.w3.org/International/questions/qa-html-language-declarations' target='_blank' rel='noopener noreferrer'>declare language on HTML tag. ${sa11yNewTab}</a>`,

    QA_PAGE_TITLE: 
        `Missing page title! Please provide a <a href='https://developer.mozilla.org/en-US/docs/Web/HTML/Element/title' target='_blank' rel='noopener noreferrer'>page title. ${sa11yNewTab}</a>`,

    QA_BLOCKQUOTE_MESSAGE: (bqHeadingText) =>
        `Is this a heading? <strong class='sa11y-red-text'>${bqHeadingText}</strong> 
        ${sa11yHr}
        Blockquotes should be used for quotes only. If this is intended to be a heading, change this blockquote to a semantic heading (e.g. Heading 2 or Heading 3).`,

    TABLES_MISSING_HEADINGS: 
        `Missing table headers! Accessible tables need HTML markup that indicates header cells and data cells which defines their relationship. This information provides context to people who use assistive technology. Tables should be used for tabular data only.
        ${sa11yHr}
        Learn more about <a href='https://www.w3.org/WAI/tutorials/tables/' target='_blank' rel='noopener noreferrer'>accessible tables. ${sa11yNewTab}</a>`,

    TABLES_SEMANTIC_HEADING: 
        `Semantic headings such as Heading 2 or Heading 3 should only be used for sections of content; <strong>not</strong> in HTML tables. Indicate table headings using the <span class='sa11y-kbd'>&lt;th&gt;</span> element instead.
        ${sa11yHr}
        Learn more about <a href='https://www.w3.org/WAI/tutorials/tables/' target='_blank' rel='noopener noreferrer'>accessible tables. ${sa11yNewTab}</a>`,

    TABLES_EMPTY_HEADING: 
        `Empty table header found! Table headers should <em>never</em> be empty. It is important to designate row and/or column headers to convey their relationship. This information provides context to people who use assistive technology. Please keep in mind that tables should be used for tabular data only.
        ${sa11yHr}
        Learn more about <a href='https://www.w3.org/WAI/tutorials/tables/' target='_blank' rel='noopener noreferrer'>accessible tables. ${sa11yNewTab}</a>`,

    QA_FAKE_HEADING: (boldtext) =>
        `Is this a heading? <strong class='sa11y-red-text'>${boldtext}</strong>
        ${sa11yHr}
        A line of bold text might look like a heading, but someone using a screen reader cannot tell that it is important or jump to its content. Bolded text should never replace semantic headings (Heading 2 to Heading 6).`,

    QA_SHOULD_BE_LIST: (firstPrefix) =>
        `Are you trying to create a list? Possible list item found: <strong class='sa11y-red-text'>${firstPrefix}</strong>
        ${sa11yHr} 
        Make sure to use semantic lists by using the bullet or number formatting buttons instead. When using a semantic list, assistive technologies are able to convey information such as the total number of items and the relative position of each item in the list. Learn more about <a href='https://www.w3.org/WAI/tutorials/page-structure/content/#lists' target='_blank' rel='noopener noreferrer'>semantic lists. ${sa11yNewTab}</a>`,

    QA_UPPERCASE_WARNING: 
        `Found all caps. Some screen readers may interpret all caps text as an acronym and will read each letter individually. Additionally, some people find all caps more difficult to read and it may give the appearance of SHOUTING.`,

    QA_DUPLICATE_ID: (id) =>
        `Found <strong>duplicate ID</strong>. Duplicate ID errors are known to cause problems for assistive technologies when they are trying to interact with content.
        ${sa11yHr} 
        Please remove or change the following ID: <strong class='sa11y-red-text'>${id}</strong>`,

    QA_TEXT_UNDERLINE_WARNING: 
        `Underlined text can be confused with links. Consider using a different style such as &lt;strong&gt;<strong>strong importance</strong>&lt;/strong&gt; or &lt;em&gt;<em>emphasis</em>&lt;/em&gt;.`,

    CONTRAST_ERROR: (cratio, nodetext) =>
        `This text does not have enough contrast with the background. The contrast ratio should be at least 4.5:1 for normal text and 3:1 for large text. 
        ${sa11yHr} 
        The contrast ratio is <strong class='sa11y-red-text'>${cratio}</strong> for the following text: <strong class='sa11y-red-text'>${nodetext}</strong>`,

    CONTRAST_WARNING: (nodetext) =>
        `The contrast of this text is unknown and needs to be manually reviewed. Ensure the text and the background have strong contrasting colours. The contrast ratio should be at least 4.5:1 for normal text and 3:1 for large text. 
        ${sa11yHr}
        <strong>Please review:</strong> ${nodetext}`,

    CONTRAST_INPUT_ERROR: (cratio) =>
        `Text within this input does not have enough contrast with the background. The contrast ratio should be at least 4.5:1 for normal text and 3:1 for large text. 
        ${sa11yHr} 
        Contrast ratio: <strong class='sa11y-red-text'>${cratio}</strong>`,

    READABILITY_NO_P_OR_LI_MESSAGE: 
        `Unable to calculate readability score. No paragraph <span class="sa11y-badge">&lt;p&gt;</span> or list content <span class="sa11y-badge">&lt;li&gt;</span> found.`,

    READABILITY_NOT_ENOUGH_CONTENT_MESSAGE: 
        `Not enough content to calculate readability score.`

};