var en = {
  // English
  strings: {
    LANG_CODE: 'en',
    MAIN_TOGGLE_LABEL: 'Check Accessibility',
    CONTAINER_LABEL: 'Accessibility Checker',
    ERROR: 'Error',
    ERRORS: 'Errors',
    WARNING: 'Warning',
    WARNINGS: 'Warnings',
    GOOD: 'Good',
    ON: 'On',
    OFF: 'Off',
    ALERT_TEXT: 'Alert',
    ALERT_CLOSE: 'Close',
    OUTLINE: 'Page Outline',
    SETTINGS: 'Settings',
    CONTRAST: 'Contrast',
    FORM_LABELS: 'Form labels',
    LINKS_ADVANCED: 'Links (Advanced)',
    DARK_MODE: 'Dark mode',
    SHORTCUT_SCREEN_READER: 'Skip to issue. Keyboard shortcut: Alt S',
    SHORTCUT_TOOLTIP: 'Skip to issue',
    NEW_TAB: 'Opens new tab',
    PANEL_HEADING: 'Accessibility check',
    PANEL_STATUS_NONE: 'No errors found.',
    PANEL_ICON_WARNINGS: 'warnings found.',
    PANEL_ICON_TOTAL: 'total issues found.',
    NOT_VISIBLE_ALERT: 'The item you are trying to view is not visible; it may be hidden or inside of an accordion or tab component. Here is a preview:',
    ERROR_MISSING_ROOT_TARGET: 'The full page was checked for accessibility because the target area <code>%(root)</code> does not exist.',
    HEADING_NOT_VISIBLE_ALERT: 'Heading is not visible; it may be hidden or inside of an accordion or tab component.',
    PANEL_DISMISS_BUTTON: 'Show %(dismissCount) dismissed warnings',
    DISMISS: 'Dismiss',
    DISMISSED: 'Dismissed warnings',

    // Color filters
    COLOUR_FILTER: 'Colour filter',
    PROTANOPIA: 'Protanopia',
    DEUTERANOPIA: 'Deuteranopia',
    TRITANOPIA: 'Tritanopia',
    ACHROMATOPSIA: 'Achromatopsia',

    // Alternative text module stop words
    SUSPICIOUS_ALT_STOPWORDS: ['image', 'graphic', 'picture', 'photo'],
    PLACEHOLDER_ALT_STOPWORDS: ['alt', 'image', 'photo', 'decorative', 'photo', 'placeholder', 'placeholder image', 'spacer', '.'],
    PARTIAL_ALT_STOPWORDS: [
      'click',
      'click here',
      'click here for more',
      'click here to learn more',
      'click here to learn more.',
      'clicking here',
      'clicking here.',
      'check out',
      'detailed here',
      'detailed here.',
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
      '.',
    ],
    WARNING_ALT_STOPWORDS: ['< ', ' >', 'click here'],
    NEW_WINDOW_PHRASES: ['external', 'new tab', 'new window', 'pop-up', 'pop up'],

    // Only some items in list would need to be translated.
    FILE_TYPE_PHRASES: ['document', 'spreadsheet', 'worksheet', 'install', 'video', 'pdf', 'doc',
      'docx', 'word', 'mp3', 'ppt', 'text', 'pptx', 'powerpoint', 'txt', 'exe', 'dmg', 'rtf', 'windows', 'macos', 'csv', 'xls', 'xlsx', 'mp4', 'mov', 'avi', 'zip'],

    // Readability
    LANG_READABILITY: 'Readability',
    LANG_AVG_SENTENCE: 'Average words per sentence:',
    LANG_COMPLEX_WORDS: 'Complex words:',
    LANG_TOTAL_WORDS: 'Words:',
    LANG_VERY_DIFFICULT: 'Very difficult',
    LANG_DIFFICULT: 'Difficult',
    LANG_FAIRLY_DIFFICULT: 'Fairly difficult',
    LANG_GOOD: 'Good',
    READABILITY_NO_P_OR_LI_MESSAGE: 'Unable to calculate readability score. No paragraph <code>&lt;p&gt;</code> or list content <code>&lt;li&gt;</code> found.',
    READABILITY_NOT_ENOUGH_CONTENT_MESSAGE: 'Not enough content to calculate readability score.',

    // Headings
    HEADING_NON_CONSECUTIVE_LEVEL: 'Non-consecutive heading level used. Headings should never skip levels, or go from <strong>Heading %(prevLevel)</strong> to <strong {r}>Heading %(level)</strong>.',
    HEADING_EMPTY: 'Empty heading found! To fix, delete this line or change its format from <strong {r}>Heading %(level)</strong> to <strong>Normal</strong> or <strong>Paragraph</strong>.',
    HEADING_LONG: 'Heading is long! Headings should be used to organize content and convey structure. They should be brief, informative, and unique. Please keep headings less than 160 characters (no more than a sentence). <hr> Character count: <strong {r}>%(headingLength)</strong>',
    HEADING_FIRST: 'The first heading on a page should usually be a Heading 1 or Heading 2. Heading 1 should be the start of the main content section, and is the main heading that describes the overall purpose of the page. Learn more about <a href="https://www.w3.org/WAI/tutorials/page-structure/headings/">Heading Structure.</a>',
    HEADING_MISSING_ONE: 'Missing Heading 1. Heading 1 should be the start of the main content area, and is the main heading that describes the overall purpose of the page. Learn more about <a href="https://www.w3.org/WAI/tutorials/page-structure/headings/">Heading Structure.</a>',
    HEADING_EMPTY_WITH_IMAGE: 'Heading has no text, but contains an image. If this is not a heading, change its format from <strong {r}>Heading %(level)</strong> to <strong>Normal</strong> or <strong>Paragraph</strong>. Otherwise, please add alt text to the image if it is not decorative.',
    PANEL_HEADING_MISSING_ONE: 'Missing Heading 1!',

    // Links
    LINK_EMPTY: 'Remove empty links without any text.',
    LINK_EMPTY_LINK_NO_LABEL: 'Link does not have discernable text that is visible to screen readers and other assistive technology. To fix: <ul><li>Add some concise text that describes where the link takes you.</li><li>If it is an <a href="https://a11y-101.com/development/icons-and-links">icon link or SVG,</a> it is likely missing a descriptive label.</li><li>If you think this link is an error due to a copy/paste bug, consider deleting it.</li></ul>',
    LINK_LABEL: '<strong>Link label:</strong> %(linkText)',
    LINK_STOPWORD: 'Link text may not be descriptive enough out of context: <strong {r}>%(error)</strong><hr><strong>Tip!</strong> Link text should always be clear, unique, and meaningful. Avoid common words like &quot;click here&quot; or &quot;learn more&quot;',
    LINK_BEST_PRACTICES: 'Consider replacing the link text: <strong {r}>%(error)</strong><hr><ul><li>&quot;Click here&quot; places focus on mouse mechanics, when many people do not use a mouse or may be viewing this website on a mobile device. Consider using a different verb that relates to the task.</li><li>Avoid using HTML symbols as call to actions unless they are hidden to assistive technologies.</li></ul>',
    LINK_URL: 'Longer, less intelligible URLs used as link text might be difficult to listen to with assistive technology. In most cases, it is better to use human-readable text instead of the URL. Short URLs (such as a site\'s homepage) are okay.<hr><strong>Tip!</strong> Link text should always be clear, unique, and meaningful so it could be understood out of context.',

    // Links advanced
    NEW_TAB_WARNING: 'Link opens in a new tab or window without warning. Doing so can be disorienting, especially for people who have difficulty perceiving visual content. Secondly, it is not always a good practice to control someone\'s experience or make decisions for them. Indicate that the link opens in a new window within the link text<hr><strong>Tip!</strong> Learn best practices: <a href="https://www.nngroup.com/articles/new-browser-windows-and-tabs/">opening links in new browser windows and tabs.</a>',
    FILE_TYPE_WARNING: 'Link points to a PDF or downloadable file (e.g. MP3, Zip, Word Doc) without warning. Indicate the file type within the link text. If it is a large file, consider including the file size.<hr><strong>Example:</strong> Executive Report (PDF, 3MB)',
    LINK_IDENTICAL_NAME: 'Link has identical text as another link, although it points to a different page. Multiple links with the same text may cause confusion for people who use screen readers.<hr>Consider making the following link more descriptive to help distinguish it from other links: <strong {r}>%(linkText)</strong>',

    // Images
    MISSING_ALT_LINK_BUT_HAS_TEXT_MESSAGE: 'Image is being used as a link with surrounding text, although the alt attribute should be marked as decorative or null.',
    MISSING_ALT_LINK_MESSAGE: 'Image is being used as a link but is missing alt text! Please ensure alt text describes where the link takes you.',
    MISSING_ALT_MESSAGE: 'Missing alt text! If the image conveys a story, mood, or important information - be sure to describe the image.',
    LINK_IMAGE_BAD_ALT_MESSAGE: 'File extension within the alt text found. Ensure the alt text describes the destination of the link, not a literal description of the image. Remove: <strong {r}>%(error)</strong>.<hr><strong>Alt text:</strong> %(altText)',
    LINK_IMAGE_PLACEHOLDER_ALT_MESSAGE: 'Non-descript or placeholder alt text within a linked image found. Ensure the alt text describes the destination of the link, not a literal description of the image. Replace the following alt text: <strong {r}>%(altText)</strong>',
    LINK_IMAGE_SUS_ALT_MESSAGE: 'Assistive technologies already indicate that this is an image, so &quot;<strong {r}>%(error)</strong>&quot; may be redundant. Ensure the alt text describes the destination of the link, not a literal description of the image. <hr> <strong>Alt text:</strong> %(altText)',
    LINK_ALT_HAS_BAD_WORD_MESSAGE: 'File extension within the alt text found. If the image conveys a story, mood, or important information - be sure to describe the image. Remove: <strong {r}>%(error)</strong>.<hr><strong>Alt text:</strong> %(altText)',
    ALT_PLACEHOLDER_MESSAGE: 'Non-descript or placeholder alt text found. Replace the following alt text with something more meaningful: <strong {r}>%(altText)</strong>',
    ALT_HAS_SUS_WORD: 'Assistive technologies already indicate that this is an image, so &quot;<strong {r}>%(error)</strong>&quot; may be redundant. <hr> <strong>Alt text:</strong> %(altText)',
    LINK_IMAGE_ARIA_HIDDEN: 'Link around image has <code>aria-hidden=&quot;true&quot;</code> but is still keyboard focusable. If you are intending to hide a redundant or duplicate link, add <code>tabindex=&quot;-1&quot;</code> as well.',
    LINK_IMAGE_NO_ALT_TEXT: 'Image within link is marked as decorative and there is no link text. Please add alt text to the image that describes the destination of the link.',
    LINK_IMAGE_HAS_TEXT: 'Image is marked as decorative, although the link is using the surrounding text as a descriptive label.',
    LINK_IMAGE_LONG_ALT: 'Alt text description on a linked image is <strong>too long</strong>. The alt text on linked images should describe where the link takes you, not a literal description of the image. <strong>Consider using the title of the page it links to as the alt text.</strong> <hr> <strong>Alt text (<span {r}>%(altLength)</span> characters):</strong> %(altText)',
    LINK_IMAGE_ALT_WARNING: 'Image link contains alt text, although please ensure alt text describes the destination page. <strong>Consider using the title of the page it links to as the alt text.</strong> Does the alt text describe where the link takes you? <hr> <strong>Alt text:</strong> %(altText)',
    LINK_IMAGE_ALT_AND_TEXT_WARNING: 'Image link contains <strong>both alt text and surrounding link text.</strong> If this image is decorative and is being used as a functional link to another page, consider marking the image as decorative or null - the surrounding link text should suffice. <hr> <strong>Alt text:</strong> %(altText)',
    IMAGE_FIGURE_DECORATIVE: 'Image is marked as <strong>decorative</strong> and will be ignored by assistive technology. <hr> Although a <strong>caption</strong> was provided, the image should also have alt text in most cases. <ul><li>The alt text should provide a concise description of what is in the image.</li><li>The caption should usually provide context to relate the image back to the surrounding content, or give attention to a particular piece of information.</li></ul>Learn more: <a href="https://thoughtbot.com/blog/alt-vs-figcaption#the-figcaption-element">alt versus figcaption.</a>',
    IMAGE_FIGURE_DUPLICATE_ALT: 'Do not use the exact same words for both the alt and caption text. Screen readers will announce the information twice.<ul><li>The alt text should provide a concise description of what is in the image.</li><li>The caption should usually provide context to relate the image back to the surrounding content, or give attention to a particular piece of information.</li></ul> Learn more: <a href="https://thoughtbot.com/blog/alt-vs-figcaption#the-figcaption-element">alt versus figcaption.</a> <hr> <strong>Alt text:</strong> %(altText)',
    IMAGE_DECORATIVE: 'Image is marked as <strong>decorative</strong> and will be ignored by assistive technology. If the image conveys a story, mood or important information - be sure to add alt text.',
    IMAGE_ALT_TOO_LONG: 'Alt text description is <strong>too long</strong>. Alt text should be concise, yet meaningful like a <em>tweet</em> (around 100 characters). If this is a complex image or a graph, consider putting the long description of the image in the text below or an accordion component. <hr> <strong>Alt text (<span {r}>%(altLength)</span> characters):</strong> %(altText)',
    IMAGE_PASS: '<strong>Alt text:</strong> %(altText)',

    // Labels
    LABELS_MISSING_IMAGE_INPUT_MESSAGE: 'Image button is missing alt text. Please add alt text to provide an accessible name. For example: <em>Search</em> or <em>Submit</em>.',
    LABELS_INPUT_RESET_MESSAGE: 'Reset buttons should <strong>not</strong> be used unless specifically needed because they are easy to activate by mistake. <hr> <strong>Tip!</strong> Learn why <a href="https://www.nngroup.com/articles/reset-and-cancel-buttons/">Reset and Cancel buttons pose usability issues.</a>',
    LABELS_ARIA_LABEL_INPUT_MESSAGE: 'Input has an accessible name, although please ensure there is a visible label too. <hr> The accessible name for this input is: <strong>%(ariaLabel)</strong>',
    LABELS_NO_FOR_ATTRIBUTE_MESSAGE: 'There is no label associated with this input. Add a <code>for</code> attribute to the label that matches the <code>id</code> of this input. <hr> The ID for this input is: <strong>id=&#34;%(id)&#34;</strong>',
    LABELS_MISSING_LABEL_MESSAGE: 'There is no label associated with this input. Please add an <code>id</code> to this input, and add a matching <code>for</code> attribute to the label.',

    // Embedded content
    EMBED_VIDEO: 'Please ensure <strong>all videos have closed captioning.</strong> Providing captions for all audio and video content is a mandatory Level A requirement. Captions support people who are D/deaf or hard-of-hearing.',
    EMBED_AUDIO: 'Please ensure to provide a <strong>transcript for all podcasts.</strong> Providing transcripts for audio content is a mandatory Level A requirement. Transcripts support people who are D/deaf or hard-of-hearing, but can benefit everyone. Consider placing the transcript below or within an accordion panel.',
    EMBED_DATA_VIZ: 'Data visualization widgets like this are often problematic for people who use a keyboard or screen reader to navigate, and can present significant difficulties for people who have low vision or colorblindness. It\'s recommended to provide the same information in an alternative (text or table) format below the widget. <hr> Learn more about <a href="https://www.w3.org/WAI/tutorials/images/complex">complex images.</a>',
    EMBED_MISSING_TITLE: 'Embedded content requires an accessible name that describes its contents. Please provide a unique <code>title</code> or <code>aria-label</code> attribute on the <code>iframe</code> element. Learn more about <a href="https://dequeuniversity.com/tips/provide-iframe-titles">iFrames.</a>',
    EMBED_GENERAL_WARNING: 'Unable to check embedded content. Please make sure that images have alt text, videos have captions, text has sufficient contrast, and interactive components are <a href="https://webaim.org/techniques/keyboard/">keyboard accessible.</a>',

    // Quality assurance
    QA_BAD_LINK: 'Bad link found. Link appears to point to a development environment. <hr> This link points to: <br> <strong {r}>%(el)</strong>',
    QA_BAD_ITALICS: 'Bold and italic tags have semantic meaning, and should <strong>not</strong> be used to highlight entire paragraphs. Bolded text should be used to provide strong <strong>emphasis</strong> on a word or phrase. Italics should be used to highlight proper names (i.e. book and article titles), foreign words, quotes. Long quotes should be formatted as a blockquote.',
    QA_PDF: 'PDFs are considered web content and must be made accessible as well. PDFs often contain issues for people who use screen readers (missing structural tags or missing form field labels) and people who have low vision (text does not reflow when enlarged). <ul><li>If this is a form, consider using an accessible HTML form as an alternative.</li><li>If this is a document, consider converting it into a web page.</li></ul>Otherwise, please check <strong {r}>%(pdfCount)</strong> <a href="https://www.adobe.com/accessibility/products/acrobat/using-acrobat-pro-accessibility-checker.html">PDF(s) for accessibility in Acrobat DC.</a>',
    QA_PAGE_LANGUAGE: 'Page language not declared! Please <a href="https://www.w3.org/International/questions/qa-html-language-declarations">declare language on HTML tag.</a>',
    QA_PAGE_TITLE: 'Missing page title! Please provide a <a href="https://developer.mozilla.org/en-US/docs/Web/HTML/Element/title">page title.</a>',
    QA_BLOCKQUOTE_MESSAGE: 'Is this a heading? <strong {r}>%(bqHeadingText)</strong> <hr> Blockquotes should be used for quotes only. If this is intended to be a heading, change this blockquote to a semantic heading (e.g. Heading 2 or Heading 3).',
    QA_FAKE_HEADING: 'Is this a heading? <strong {r}>%(boldtext)</strong> <hr> A line of bold or large text might look like a heading, but someone using a screen reader cannot tell that it is important or jump to its content. Bold or large text should never replace semantic headings (Heading 2 to Heading 6).',
    QA_SHOULD_BE_LIST: 'Are you trying to create a list? Possible list item found: <strong {r}>%(firstPrefix)</strong> <hr> Make sure to use semantic lists by using the bullet or number formatting buttons instead. When using a semantic list, assistive technologies are able to convey information such as the total number of items and the relative position of each item in the list. Learn more about <a href="https://www.w3.org/WAI/tutorials/page-structure/content/#lists">semantic lists.</a>',
    QA_UPPERCASE_WARNING: 'Found all caps. Some screen readers may interpret all caps text as an acronym and will read each letter individually. Additionally, some people find all caps more difficult to read and it may give the appearance of SHOUTING.',
    QA_DUPLICATE_ID: 'Found <strong>duplicate ID</strong>. Duplicate ID errors are known to cause problems for assistive technologies when they are trying to interact with content. <hr> Please remove or change the following ID: <strong {r}>%(id)</strong>',
    QA_TEXT_UNDERLINE_WARNING: 'Underlined text can be confused with links. Consider using a different style such as <code>&lt;strong&gt;</code><strong>strong importance</strong><code>&lt;/strong&gt;</code> or <code>&lt;em&gt;</code><em>emphasis</em><code>&lt;/em&gt;</code>.',
    QA_SUBSCRIPT_WARNING: 'The subscript and superscript formatting options should only be used to change the position of text for typographical conventions or standards. It should <strong>not</strong> solely be used for presentation or appearance purposes. Formatting entire sentences poses readability issues. Appropriate use cases would include displaying exponents, ordinal numbers such as 4<sup>th</sup> instead of fourth, and chemical formulas (e.g. H<sub>2</sub>O).',

    // Tables
    TABLES_MISSING_HEADINGS: 'Missing table headers! Accessible tables need HTML markup that indicates header cells and data cells which defines their relationship. This information provides context to people who use assistive technology. Tables should be used for tabular data only. <hr> Learn more about <a href="https://www.w3.org/WAI/tutorials/tables/">accessible tables.</a>',
    TABLES_SEMANTIC_HEADING: 'Semantic headings such as Heading 2 or Heading 3 should only be used for sections of content; <strong>not</strong> in HTML tables. Indicate table headings using the <code>&lt;th&gt;</code> element instead. <hr> Learn more about <a href="https://www.w3.org/WAI/tutorials/tables/">accessible tables.</a>',
    TABLES_EMPTY_HEADING: 'Empty table header found! Table headers should <strong>never</strong> be empty. It is important to designate row and/or column headers to convey their relationship. This information provides context to people who use assistive technology. Please keep in mind that tables should be used for tabular data only. <hr> Learn more about <a href="https://www.w3.org/WAI/tutorials/tables/">accessible tables.</a>',

    // Contrast
    CONTRAST_ERROR: 'This text does not have enough contrast with the background. The contrast ratio should be at least 4.5:1 for normal text and 3:1 for large text. <hr> The contrast ratio is <strong {r}>%(cratio)</strong> for the following text: <strong {r}>%(nodetext)</strong>',
    CONTRAST_WARNING: 'The contrast of this text is unknown and needs to be manually reviewed. Ensure the text and the background have strong contrasting colours. The contrast ratio should be at least 4.5:1 for normal text and 3:1 for large text. <hr> <strong>Please review:</strong> %(nodetext)',
    CONTRAST_INPUT_ERROR: 'Text within this input does not have enough contrast with the background. The contrast ratio should be at least 4.5:1 for normal text and 3:1 for large text. <hr> Contrast ratio: <strong {r}>%(cratio)</strong>',
  },
};

export { en as default };
