
/*!
  * Sa11y, the accessibility quality assurance assistant.
  * @version 4.1.9
  * @author Adam Chaboryk
  * @license GPL-2.0-or-later
  * @copyright © 2020 - 2025 Toronto Metropolitan University.
  * @contact adam.chaboryk@torontomu.ca
  * GitHub: git+https://github.com/ryersondmp/sa11y.git | Website: https://sa11y.netlify.app
  * For all acknowledgements, please visit: https://sa11y.netlify.app/acknowledgements/
  * The above copyright notice shall be included in all copies or substantial portions of the Software.
**/
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
    OUTLINE: 'Outline',
    READABILITY_DESC: 'Shows the readability score in the <strong>Outline</strong> tab to help gauge reading difficulty.',
    TITLE: 'Title',
    ALT: 'ALT',
    IMAGES: 'Images',
    EDIT: 'Edit',
    NO_IMAGES: 'No images found.',
    DECORATIVE: 'Decorative',
    MISSING: 'Missing',
    PAGE_ISSUES: 'Page Issues',
    SETTINGS: 'Settings',
    DEVELOPER_CHECKS: 'Developer checks',
    DEVELOPER_DESC: 'Checks for issues that may need coding knowledge to fix, such as HTML attributes, forms, and more.',
    DARK_MODE: 'Dark mode',
    SHORTCUT_SR: 'Skip to issue. Keyboard shortcut: Alt S',
    SKIP_TO_ISSUE: 'Skip to issue',
    NEW_TAB: 'Opens new tab',
    LINKED: 'Linked',
    PANEL_HEADING: 'Accessibility check',
    NO_ERRORS_FOUND: 'No errors found.',
    WARNINGS_FOUND: 'warnings found.',
    TOTAL_FOUND: 'total issues found.',
    NOT_VISIBLE: 'The item you are trying to view is not visible; it may be hidden or inside of an accordion or tab component. Here is a preview:',
    MISSING_ROOT: 'The full page was checked for accessibility because the target area <code>%(root)</code> does not exist.',
    MISSING_READABILITY_ROOT: 'The readability score is based on the <code>%(fallback)</code> content area, because the target area <code>%(root)</code> does not exist.',
    HEADING_NOT_VISIBLE: 'Heading is not visible; it may be hidden or inside of an accordion or tab component.',
    SKIP_TO_PAGE_ISSUES: 'Skip to Page Issues',
    CONSOLE_ERROR: 'Sorry, but there is an issue with the accessibility checker on this page. Can you please <a href="%(link)">report it through this form</a> or on <a href="%(link)">GitHub</a>?',
    APPEARANCE: 'Appearance',
    MOVE_PANEL: 'Move panel',

    // Export
    DATE: 'Date',
    PAGE_TITLE: 'Page title',
    RESULTS: 'Results',
    EXPORT_RESULTS: 'Export results',
    GENERATED: 'Results generated with %(tool).',
    PREVIEW: 'Preview',
    ELEMENT: 'Element',
    PATH: 'Path',

    // Dismiss
    PANEL_DISMISS_BUTTON: 'Show %(dismissCount) dismissed',
    DISMISS: 'Dismiss',
    DISMISS_ALL: 'Dismiss all',
    DISMISSED: 'Dismissed',
    DISMISS_REMINDER: 'Please note that warnings are only <strong>temporarily</strong> dismissed. Clearing your browser history and cookies will restore all previously dismissed warnings across all pages.',

    // Colour filters
    COLOUR_FILTER: 'Colour filter',
    PROTANOPIA: 'Protanopia',
    DEUTERANOPIA: 'Deuteranopia',
    TRITANOPIA: 'Tritanopia',
    MONOCHROMACY: 'Monochromacy',
    COLOUR_FILTER_MESSAGE: 'Check for elements that are difficult to perceive or distinguish against other colours.',
    RED_EYE: 'Red blind.',
    GREEN_EYE: 'Green blind.',
    BLUE_EYE: 'Blue blind.',
    MONO_EYE: 'Red, blue, and green blind.',
    COLOUR_FILTER_HIGH_CONTRAST: 'Colour filters do not work in high contrast mode.',

    // Alternative text stop words
    SUS_ALT_STOPWORDS: ['image', 'graphic', 'picture', 'photo', 'thumbnail', 'icon'],
    PLACEHOLDER_ALT_STOPWORDS: ['alt', 'chart', 'decorative', 'image', 'graphic', 'photo', 'placeholder', 'placeholder image', 'spacer', 'tbd', 'todo', 'to do', 'thumbnail', 'icon'],
    PARTIAL_ALT_STOPWORDS: [
      'click',
      'click here',
      'click here for more',
      'click here to learn more',
      'clicking here',
      'check out',
      'detailed here',
      'discover',
      'download',
      'download here',
      'explore',
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
      'this link',
      'this website',
      'this form',
      'view',
      'view our',
      'website',
    ],
    CLICK: ['click'],
    NEW_WINDOW_PHRASES: ['external', 'new tab', 'new window', 'pop-up', 'pop up'],
    FILE_TYPE_PHRASES: ['document', 'spreadsheet', 'calculation sheet', 'compressed file', 'archived file', 'worksheet', 'powerpoint', 'presentation', 'install', 'video', 'audio', 'pdf'],

    // Readability
    READABILITY: 'Readability',
    AVG_SENTENCE: 'Average words per sentence:',
    COMPLEX_WORDS: 'Complex words:',
    TOTAL_WORDS: 'Words:',
    VERY_DIFFICULT: 'Very difficult',
    DIFFICULT: 'Difficult',
    FAIRLY_DIFFICULT: 'Fairly difficult',
    READABILITY_NO_CONTENT: 'Unable to calculate readability score. No paragraph <code>&lt;p&gt;</code> or list content <code>&lt;li&gt;</code> found.',
    READABILITY_NOT_ENOUGH: 'Not enough content to calculate readability score.',

    // Headings
    HEADING_SKIPPED_LEVEL: 'Headings should not skip levels or jump from <strong>Heading %(PREV_LEVEL)</strong> to <strong {C}>Heading %(LEVEL)</strong>, as this disrupts the content\'s order and hierarchy, making it harder to follow. <hr> If <strong {C}>%(HEADING)</strong> falls under the <strong>%(PREV_HEADING)</strong> section, then consider formatting it as a <strong>Heading %(level)</strong> instead.',
    HEADING_EMPTY: 'Empty heading found! To fix, delete this line or change its format from <strong {C}>Heading %(level)</strong> to <strong>Normal</strong> or <strong>Paragraph</strong>.',
    HEADING_LONG: 'Heading is long! Headings should be used to organize content and convey structure. They should be brief, informative, and unique. Please keep headings less than %(MAX_LENGTH) characters (no more than a sentence). <hr> <strong {B}>%(HEADING_LENGTH) Characters</strong>',
    HEADING_FIRST: 'The first heading on a page should usually be a Heading 1 or Heading 2. Heading 1 should be the start of the main content section, and is the main heading that describes the overall purpose of the page. Learn more about <a href="https://www.w3.org/WAI/tutorials/page-structure/headings/">heading structure.</a>',
    HEADING_MISSING_ONE: 'Missing Heading 1. Heading 1 should be the start of the main content area, and is the main heading that describes the overall purpose of the page. Learn more about <a href="https://www.w3.org/WAI/tutorials/page-structure/headings/">heading structure.</a>',
    HEADING_EMPTY_WITH_IMAGE: 'Heading has no text, but contains an image. If this is not a heading, change its format from <strong {C}>Heading %(level)</strong> to <strong>Normal</strong> or <strong>Paragraph</strong>. Otherwise, please add alt text to the image if it is not decorative.',
    PANEL_HEADING_MISSING_ONE: 'Missing Heading 1!',
    PANEL_NO_HEADINGS: 'No headings found.',

    // Links
    LINK_EMPTY: 'Remove empty links without any text.',
    LINK_EMPTY_LABELLEDBY: 'Link has an <code>aria-labelledby</code> value that is empty or does not match the <code>id</code> value of another element on the page.',
    LINK_EMPTY_NO_LABEL: 'Link does not have discernible text that is visible to screen readers and other assistive technology. To fix: <ul><li>Add concise text that describes where the link takes you.</li><li>If it is an <a href="https://a11y-101.com/development/icons-and-links">icon link or SVG,</a> it is likely missing a descriptive label.</li><li>If you think this link is an error due to a copy/paste bug, consider deleting it.</li></ul>',
    LINK_STOPWORD: 'Link text may not be descriptive enough out of context: <strong {C}>%(ERROR)</strong>',
    LINK_STOPWORD_ARIA: 'Although an accessible name was provided, consider revising the visible link text. Phrases like &quot;<strong {C}>%(ERROR)</strong>&quot; are not meaningful. <hr> <strong {B}>Accessible Name</strong> <strong {C}>%(TEXT)</strong>',
    LINK_TIP: '<hr> <strong>Tip!</strong> Use clear and unique link text that describes the destination of the link, typically the page or document title.',
    LINK_CLICK_HERE: 'The phrase "click" or "click here" places focus on mouse mechanics, when many people do not use a mouse or may be viewing this website on a mobile device. Consider using a different verb that relates to the task.',
    DUPLICATE_TITLE: 'The <code>title</code> attribute on links and images is meant to provide extra information, and should be <strong>different</strong> than the text or alt text. The title text appears when hovering over an element, but is not accessible with a keyboard or touch input. Consider <a href="https://www.a11yproject.com/posts/title-attributes/">avoiding the title attribute completely.</a>',
    LINK_SYMBOLS: 'Avoid using symbols as calls to action within link text unless they are hidden from assistive technologies. Screen readers may read the symbols out loud, which can be confusing. Consider removing: <strong {C}>%(ERROR)</strong>',
    LINK_URL: 'Longer, less intelligible URLs used as link text might be difficult to comprehend with assistive technology. In most cases, it is better to use human-readable text instead of the URL. Short URLs (such as a site\'s homepage) are okay.',
    LINK_DOI: 'For web pages or online-only resources, the <a href="https://apastyle.apa.org/style-grammar-guidelines/paper-format/accessibility/urls#:~:text=descriptive%20links">APA Style guide</a> recommends using descriptive links by wrapping the URL or DOI of the work around its title. Longer, less intelligible URLs used as link text might be difficult to comprehend with assistive technology.',

    // Links advanced
    LINK_NEW_TAB: 'Link opens in a new tab or window without warning. Doing so can be disorienting, especially for people who have difficulty perceiving visual content. Secondly, it is not always a good practice to control someone\'s experience or make decisions for them. Indicate that the link opens in a new window within the link text. <hr> <strong>Tip!</strong> Learn best practices: <a href="https://www.nngroup.com/articles/new-browser-windows-and-tabs/">opening links in new browser windows and tabs.</a>',
    LINK_FILE_EXT: 'Link points to a PDF or downloadable file (e.g. MP3, Zip, Word Doc) without warning. Indicate the file type within the link text. If it is a large file, consider including the file size. For example: "Executive Report (PDF, 3MB)"',
    LINK_IDENTICAL_NAME: 'Link has identical text as another link, although it points to a different page. Multiple links with the same text may cause confusion for people who use screen readers. <strong>Consider making the following link more descriptive to help distinguish it from other links.</strong> <hr> <strong {B}>Accessible Name</strong> <strong {C}>%(TEXT)</strong>',

    // Images
    MISSING_ALT_LINK_HAS_TEXT: 'Image is being used as a link with surrounding text, although the alt attribute should be marked as decorative.',
    MISSING_ALT_LINK: 'Image is being used as a link but is missing alt text! Please ensure alt text describes where the link takes you.',
    MISSING_ALT: 'Missing alt text! If the image conveys a story, mood, or important information, make sure to describe it clearly.',
    LINK_ALT_FILE_EXT: 'Alt text should not include file extensions or image dimensions. Ensure the alt text describes the destination of the link, not a literal description of the image. Remove: <strong {C}>%(ERROR)</strong> <hr> {ALT} {L} <strong {C}>%(ALT_TEXT)</strong>',
    LINK_PLACEHOLDER_ALT: 'Non-descript or placeholder alt text within a linked image found. Ensure the alt text describes the destination of the link, not a literal description of the image. Replace the following alt text. <hr> {ALT} {L} <strong {C}>%(ALT_TEXT)</strong>',
    LINK_SUS_ALT: 'Assistive technologies already indicate that this is an image, so &quot;<strong {C}>%(ERROR)</strong>&quot; may be redundant. Ensure the alt text describes the destination of the link, not a literal description of the image. <hr> {ALT} {L} <strong {C}>%(ALT_TEXT)</strong>',
    ALT_FILE_EXT: 'Alt text should not include file extensions or image dimensions. If the image conveys a story, mood, or important information, be sure to describe the image. Remove: <strong {C}>%(ERROR)</strong> <hr> {ALT} <strong {C}>%(ALT_TEXT)</strong>',
    ALT_PLACEHOLDER: 'Non-descript or placeholder alt text found. Replace the following alt text with something more meaningful. <hr> {ALT} <strong {C}>%(ALT_TEXT)</strong>',
    SUS_ALT: 'Assistive technologies already indicate that this is an image, so &quot;<strong {C}>%(ERROR)</strong>&quot; may be redundant. <hr> {ALT} <strong {C}>%(ALT_TEXT)</strong>',
    LINK_IMAGE_NO_ALT_TEXT: 'Image within link is marked as decorative and there is no link text. Please add alt text to the image that describes the destination of the link.',
    LINK_IMAGE_TEXT: 'Image is marked as decorative, although the link is using the surrounding text as a descriptive label.',
    LINK_IMAGE_LONG_ALT: 'Alt text description on a linked image is <strong>too long</strong>. The alt text on linked images should describe where the link takes you, not a literal description of the image. <strong>Consider using the title of the page it links to as the alt text.</strong> <hr> {ALT} {L} <strong {B}>%(altLength) Characters</strong> <strong {C}>%(ALT_TEXT)</strong>',
    LINK_IMAGE_ALT: 'Image link contains alt text. Does the alt text describe where the link takes you? <strong>Consider using the title of the page it links to as the alt text.</strong> <hr> {ALT} {L} <strong {C}>%(ALT_TEXT)</strong>',
    LINK_IMAGE_ALT_AND_TEXT: 'Image link contains <strong>both alt text and surrounding link text.</strong> If this image is decorative and is being used as a functional link to another page, consider marking the image as decorative. The surrounding link text should suffice. <hr> {ALT} <strong {C}>%(ALT_TEXT)</strong> <hr> <strong {B}>Accessible Name</strong> {L} <strong {C}>%(TEXT)</strong>',
    IMAGE_FIGURE_DECORATIVE: 'Image is marked as <strong>decorative</strong> and will be ignored by assistive technology. <hr> Although a <strong>caption</strong> was provided, the image should also have alt text in most cases. <ul><li>The alt text should provide a concise description of what is in the image.</li><li>The caption should usually provide context to relate the image back to the surrounding content, or give attention to a particular piece of information.</li></ul> Learn more: <a href="https://thoughtbot.com/blog/alt-vs-figcaption#the-figcaption-element">alt versus figcaption.</a>',
    IMAGE_FIGURE_DUPLICATE_ALT: 'Do not use the exact same words for both the alt and caption text. Screen readers will announce the information twice. <ul><li>The alt text should provide a concise description of what is in the image.</li><li>The caption should usually provide context to relate the image back to the surrounding content, or give attention to a particular piece of information.</li></ul> Learn more: <a href="https://thoughtbot.com/blog/alt-vs-figcaption#the-figcaption-element">alt versus figcaption.</a> <hr> {ALT} <strong {C}>%(ALT_TEXT)</strong>',
    IMAGE_DECORATIVE: 'Image is marked as <strong>decorative</strong> and will be ignored by assistive technology. If the image conveys a story, mood, or important information, make sure to add alt text.',
    IMAGE_DECORATIVE_CAROUSEL: 'Image is marked as <strong>decorative</strong>, but all images in a carousel or gallery should include descriptive alt text to ensure an equivalent experience for everyone.',
    IMAGE_ALT_TOO_LONG: 'Alt text description is <strong>too long</strong>. Alt text should be concise, yet meaningful like a <em>tweet</em> (around 100 characters). If this is a complex image or a graph, consider putting the long description of the image in the text below or an accordion component. <hr> {ALT} <strong {B}>%(altLength) Characters</strong> <strong {C}>%(ALT_TEXT)</strong>',
    IMAGE_PASS: '{ALT} %(ALT_TEXT)',

    // Labels
    LABELS_MISSING_IMAGE_INPUT: 'Image button is missing alt text. Please add alt text to provide an accessible name. For example: <em>Search</em> or <em>Submit</em>.',
    LABELS_INPUT_RESET: 'Reset buttons should not be used unless specifically needed because they are easy to activate by mistake. <hr> <strong>Tip!</strong> Learn why <a href="https://www.nngroup.com/articles/reset-and-cancel-buttons/">Reset and Cancel buttons pose usability issues.</a>',
    LABELS_ARIA_LABEL_INPUT: 'Input has an accessible name, although please ensure there is a visible label too. <hr> <strong {B}>Accessible Name</strong> <strong {C}>%(TEXT)</strong>',
    LABELS_NO_FOR_ATTRIBUTE: 'There is no label associated with this input. Add a <code>for</code> attribute to the label that matches the <code>id</code> of this input. <hr> <strong {B}>ID</strong> <strong {C}>#%(id)</strong>',
    LABELS_MISSING_LABEL: 'There is no label associated with this input. Please add an <code>id</code> to this input, and add a matching <code>for</code> attribute to the label.',
    LABELS_PLACEHOLDER: 'Disappearing placeholder text makes it hard for people to remember what information belongs in a field and to identify and correct validation issues. Instead, consider using a permanently visible hint before the form field. <hr> Learn more: <a href="https://www.nngroup.com/articles/form-design-placeholders/">Placeholders in form fields are harmful.</a>',

    // Embedded content
    EMBED_VIDEO: 'Please ensure <strong>all videos have closed captioning.</strong> Providing captions for all audio and video content is a mandatory Level A requirement. Captions support people who are D/deaf or hard-of-hearing.',
    EMBED_AUDIO: 'Please ensure to provide a <strong>transcript for all podcasts.</strong> Providing transcripts for audio content is a mandatory Level A requirement. Transcripts support people who are D/deaf or hard-of-hearing, but can benefit everyone. Consider placing the transcript below or within an accordion panel.',
    EMBED_DATA_VIZ: 'Data visualization widgets like this are often problematic for people who use a keyboard or screen reader to navigate, and can present significant difficulties for people who have low vision or colourblindness. It\'s recommended to provide the same information in an alternative (text or table) format below the widget. <hr> Learn more about <a href="https://www.w3.org/WAI/tutorials/images/complex">complex images.</a>',
    EMBED_MISSING_TITLE: 'Embedded content requires an accessible name that describes its contents. Please provide a unique <code>title</code> or <code>aria-label</code> attribute on the <code>iframe</code> element. Learn more about <a href="https://web.dev/learn/accessibility/more-html#iframes">iFrames.</a>',
    EMBED_GENERAL: 'Unable to check embedded content. Please make sure that images have alt text, videos have captions, text has sufficient contrast, and interactive components are <a href="https://webaim.org/techniques/keyboard/">keyboard accessible.</a>',
    EMBED_UNFOCUSABLE: '<code>&lt;iframe&gt;</code> with focusable elements should not have <code>tabindex="-1"</code>. The embedded content will not be keyboard accessible.',

    // Quality assurance
    QA_BAD_LINK: 'Bad link found. Link appears to point to a development environment. <hr> {L} <strong {C}>%(LINK)</strong>',
    QA_STRONG_ITALICS: 'Bold and italic tags have semantic meaning, and should <strong>not</strong> be used to highlight entire paragraphs. Bolded text should be used to provide strong <strong>emphasis</strong> on a word or phrase. Italics should be used to highlight proper names (i.e. book and article titles), foreign words, quotes. Long quotes should be formatted as a blockquote.',
    QA_PDF: 'Unable to check PDFs for accessibility. PDFs are considered web content and must be made accessible as well. PDFs often contain issues for people who use screen readers (missing structural tags or missing form field labels) and people who have low vision (text does not reflow when enlarged). <ul><li>If this is a form, consider using an accessible HTML form as an alternative.</li><li>If this is a document, consider converting it into a web page.</li></ul>Otherwise, please check <a href="https://helpx.adobe.com/acrobat/using/create-verify-pdf-accessibility.html">PDF for accessibility in Acrobat DC.</a>',
    QA_DOCUMENT: 'Unable to check document for accessibility. Linked documents are considered web content and must be made accessible as well. Please manually review this document. <ul><li>Make your <a href="https://support.google.com/docs/answer/6199477?hl=en">Google Workspace document or presentation more accessible.</a></li><li>Make your <a href="https://support.microsoft.com/en-us/office/create-accessible-office-documents-868ecfcd-4f00-4224-b881-a65537a7c155">Office documents more accessible.</a></li></ul>',
    QA_BLOCKQUOTE: 'Is this a heading? <strong {C}>%(TEXT)</strong> <hr> Blockquotes should be used for quotes only. If this is intended to be a heading, change this blockquote to a semantic heading (e.g. Heading 2 or Heading 3).',
    QA_FAKE_HEADING: 'Is this a heading? <strong {C}>%(TEXT)</strong> <hr> A line of bold or large text might look like a heading, but someone using a screen reader cannot tell that it is important or jump to its content. Bold or large text should never replace semantic headings (Heading 2 to Heading 6).',
    QA_FAKE_LIST: 'Are you trying to create a list? Possible list item found: <strong {C}>%(firstPrefix)</strong> <hr> Make sure to use semantic lists by using the bullet or number formatting buttons instead. When using a semantic list, assistive technologies are able to convey information such as the total number of items and the relative position of each item in the list. Learn more about <a href="https://www.w3.org/WAI/tutorials/page-structure/content/#lists">semantic lists.</a>',
    QA_UPPERCASE: 'Found all caps. Some screen readers may interpret all caps text as an acronym and will read each letter individually. Additionally, some people find all caps more difficult to read and it may give the appearance of SHOUTING.',
    QA_UNDERLINE: 'Underlined text can be confused with links. Consider using a different style such as <code>&lt;strong&gt;</code><strong>strong importance</strong><code>&lt;/strong&gt;</code> or <code>&lt;em&gt;</code><em>emphasis</em><code>&lt;/em&gt;</code>.',
    QA_SUBSCRIPT: 'The subscript and superscript formatting options should only be used to change the position of text for typographical conventions or standards. It should <strong>not</strong> solely be used for presentation or appearance purposes. Formatting entire sentences poses readability issues. Appropriate use cases would include displaying exponents, ordinal numbers such as 4<sup>th</sup> instead of fourth, and chemical formulas (e.g. H<sub>2</sub>O).',
    QA_IN_PAGE_LINK: 'Broken same-page link. The link target does not match any element on the page.',
    QA_NESTED_COMPONENTS: 'Avoid nesting interactive layout components, such as placing accordions within other accordions, or placing tabs inside accordions and vice versa. This can complicate navigation, increase cognitive overload, and lead to people overlooking content.',
    QA_JUSTIFY: 'Avoid using justified text, which aligns to both the left and right margins. This can be difficult for some people to read due to the uneven spaces between words. Use left-aligned text for better readability.',
    QA_SMALL_TEXT: 'Small text is harder to read, particularly for those with low vision. To ensure better readability, avoid using font sizes smaller than the default.',

    // Shared
    ACC_NAME: '<strong {B}>Accessible Name</strong> %(TEXT)',
    ACC_NAME_TIP: '<hr><strong>Tip!</strong> The "accessible name" is the final label that gets communicated to people who use assistive technology. This helps them understand the link or button\'s purpose.',
    HIDDEN_FOCUSABLE: 'Link or button has <code>aria-hidden=&quot;true&quot;</code> but is still keyboard focusable. If you are intending to hide a duplicate link or button, add <code>tabindex=&quot;-1&quot;</code> as well. Otherwise, <code>aria-hidden=&quot;true&quot;</code> should not be used on elements that can receive focus. <hr> Learn more about the <a href="https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/Attributes/aria-hidden">aria-hidden attribute.</a>',

    // Developer checks
    DUPLICATE_ID: 'Found <strong>duplicate ID</strong>. Duplicate ID errors are known to cause problems for assistive technologies when they are trying to interact with content. Please remove or change the following ID. <hr> <strong {B}>ID</strong> <strong {C}>#%(id)</strong>',
    UNCONTAINED_LI: 'All <code>&lt;li&gt;</code> list items must be placed inside <code>&lt;ul&gt;</code> unordered or <code>&lt;ol&gt;</code> ordered elements. This structure helps screen readers announce the list and its items accurately.',
    TABINDEX_ATTR: 'Element should not have a <code>tabindex</code> attribute greater than 0.',

    // Meta checks
    META_TITLE: 'Missing page title! Please provide a <a href="https://developer.mozilla.org/en-US/docs/Web/HTML/Element/title">page title.</a>',
    META_SCALABLE: 'Remove the <code>user-scalable="no"</code> parameter in the <a href="https://developer.mozilla.org/en-US/docs/Web/HTML/Viewport_meta_tag">viewport meta tag</a> in order to allow zooming.',
    META_MAX: 'Ensure the <code>maximum-scale</code> parameter in the <a href="https://developer.mozilla.org/en-US/docs/Web/HTML/Viewport_meta_tag">viewport meta tag</a> is not less than 2.',
    META_LANG: 'Page language not declared! Please <a href="https://www.w3.org/International/questions/qa-html-language-declarations">declare language on HTML tag.</a>',
    META_REFRESH: 'Page should not automatically refresh using a meta tag.',

    // Buttons
    BTN_EMPTY: 'Button is missing an accessible name that describes its purpose.',
    BTN_EMPTY_LABELLEDBY: 'Button has an <code>aria-labelledby</code> value that is empty or does not match the <code>id</code> value of another element on the page.',
    BTN: 'button',
    BTN_TIP: 'Learn how to make an <a href="https://www.sarasoueidan.com/blog/accessible-icon-buttons/">accessible button.</a>',
    BTN_ROLE_IN_NAME: 'Do not include the word "button" in the name of a button. Screen readers already convey the role of an element in addition to its name.',
    LABEL_IN_NAME: 'The visible text for this element appears to be different than the accessible name, which may cause confusion for assistive technologies users. Please review: <hr> <strong {B}>Accessible Name</strong> <strong {C}>%(TEXT)</strong>',

    // Tables
    TABLES_MISSING_HEADINGS: 'Missing table headers! Accessible tables need HTML markup that indicates header cells and data cells which defines their relationship. This information provides context to people who use assistive technology. Tables should be used for tabular data only. <hr> Learn more about <a href="https://www.w3.org/WAI/tutorials/tables/">accessible tables.</a>',
    TABLES_SEMANTIC_HEADING: 'Semantic headings such as Heading 2 or Heading 3 should only be used for sections of content; <strong>not</strong> in HTML tables. Indicate table headings using the <code>&lt;th&gt;</code> element instead. <hr> Learn more about <a href="https://www.w3.org/WAI/tutorials/tables/">accessible tables.</a>',
    TABLES_EMPTY_HEADING: 'Empty table header found! Table headers should <strong>never</strong> be empty. It is important to designate row and/or column headers to convey their relationship. This information provides context to people who use assistive technology. Please keep in mind that tables should be used for tabular data only. <hr> Learn more about <a href="https://www.w3.org/WAI/tutorials/tables/">accessible tables.</a>',

    // Contrast
    CONTRAST_NORMAL: 'Normal-sized text should have at least a %(RATIO) ratio.',
    CONTRAST_LARGE: 'Large-sized text should have at least a %(RATIO) ratio.',
    CONTRAST_ERROR: 'Text does not have enough contrast with the background, making it harder to read.',
    CONTRAST_WARNING: 'The contrast of this text is unknown and needs to be manually reviewed. Ensure the text and the background have strong contrasting colours.',
    CONTRAST_ERROR_GRAPHIC: 'Graphic does not have enough contrast with the background, making it harder to see.',
    CONTRAST_WARNING_GRAPHIC: 'The contrast of this graphic is unknown and needs to be manually reviewed.',
    CONTRAST_TIP_GRAPHIC: 'Graphics and user interface elements should have at least a 3:1 ratio.',
    CONTRAST_OPACITY: 'Increase the opacity for better visibility.',
    CONTRAST_APCA: 'This is not enough contrast for any size text. Consider using this colour and text size combination?',
    CONTRAST_COLOR: 'Consider using this colour instead?',
    CONTRAST_SIZE: 'Consider making the text size larger for this colour combination?',
    CONTRAST_PLACEHOLDER: 'Placeholder text within this input does not have enough contrast with the background, making it harder to read.',
    CONTRAST_PLACEHOLDER_UNSUPPORTED: 'The contrast of this placeholder text is unknown and needs to be manually reviewed. Ensure the text and the background have strong contrasting colours.',
    CONTRAST_INPUT: 'Text within this input does not have enough contrast with the background, making it harder to read.',
    CONTRAST: 'Contrast',
    UNKNOWN: 'Unknown',
    FG: 'Foreground',
    BG: 'Background',
    NO_SUGGESTION: 'No accessible combination can be found by changing the text colour. Try changing the background colour.',
  },
};

export { en as default };
