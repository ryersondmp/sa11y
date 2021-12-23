![Sa11y, the accessibility quality assurance tool.](https://ryersondmp.github.io/sa11y/assets/images/github-banner.png)

# Sa11y
Sa11y is an accessibility quality assurance tool that visually highlights common accessibility and usability issues. Geared towards content authors, Sa11y straightforwardly identifies errors or warnings at the source with a simple tooltip on how to fix them. 

Sa11y works as a simple in-page checker that is designed to be easily customized and integrated into any content management system (CMS) to facilitate good accessibility practices. Sa11y works best in a templated CMS environment, although is also available as a bookmarklet. Sa11y is _not_ a comprehensive code analysis tool. Sa11y exclusively highlights content issues.

- Over 50 test conditions.
- Free and open source.
- Concise tooltips explain issues right at the source.
- Low tech: No complex API or integrations. Vanilla JavaScript. Minimal dependencies. 
- Easily customizable: add your custom rulesets.
- Automatic: checks content on page load.
- Additional (toggleable) checks: Contrast, form labels, readability, links (Advanced).
- Dark mode.

Read [Sa11y 2.0 release notes.](https://github.com/ryersondmp/sa11y/releases/tag/2.0)

## Demo and bookmarklet 
:arrow_right: [View project website and demo](https://ryersondmp.github.io/sa11y/) or grab the latest [bookmarklet.](https://ryersondmp.github.io/sa11y/#install)

## Installation
Sa11y uses [Tippy.js](https://github.com/atomiks/tippyjs), a highly customizable tooltip library that features a positioning system. To install on your website, insert Sa11y right before the closing `</body>` tag. Include both Tippy.js and Popper.js before Sa11y. Sa11y consists of three files (located in `/src/`).

- **sa11y.css**: The main stylesheet. Should be included in the `<head>` of the document (if possible).
- **sa11y-english.js**: All text strings and tooltip messages are located here for easy translation.
- **sa11y.js**: Contains all logic and rulesets.

### Example installation:
```html
<!-- Stylesheet -->
<link rel="stylesheet" href="sa11y.css"/>

<!-- Tippy.js V6 CDN (tooltip library) -->
<script src="https://unpkg.com/@popperjs/core@2"></script>
<script src="https://unpkg.com/tippy.js@6"></script>

<!-- Sa11y (fork the latest code from GitHub) -->
<script src="sa11y-english.js"></script>
<script src="sa11y.js"></script>
<script>
    //Instantiate
    const sa11y = new Sa11y();
</script>
```

### Advanced configuration and props
Customize the experience for content editors. Add exclusions to ignore false positives. Set the main scan area - if your content editors can't edit it, don't flag it! Example configuration:
```html
<script>
    const sa11y = new Sa11y({
        checkRoot: 'main',
        readabilityRoot: 'main',
        formLabelsPlugin: false, // E.g. no forms on website.
    });
</script>
```
#### Target area and exclusions
Note: You can only pass [CSS selectors](https://www.w3schools.com/cssref/css_selectors.asp) with props. 

| Prop | Default | Description |
| :--- | :--- | :--- |
| `checkRoot`| 'body' | Target area to scan. Pass `'main'` for main content area. Accepts one value only.|
| `containerIgnore` | '.sa11y-ignore' | Ignore specific regions of the page.|
| `contrastIgnore` | '.sr-only' | Ignore specific elements from contrast check.|
| `outlineIgnore` | ' ' | Exclude specific headings from appearing in the "Show Outline" panel.|
| `headerIgnore` | ' ' | Ignore specific headings on the page (will not appear in "Show Outline" panel or recieve heading label).|
| `imageIgnore` | ' ' | Ignore specific images on the page.|
| `linkIgnore` | 'nav *, [role="navigation"] *' | Ignore specific links on the page.|
| `linkIgnoreSpan` | ' ' | Ignore specific content within a link. e.g. Refer to "Warning" page within demo for an example.|
| `linksToFlag` | ' ' | Flag URLs that you do not want your content editors linking to. E.g. 'a[href*="wp-admin"]'|

#### Readability module
| Prop | Default | Description |
| :--- | :--- | :--- |
| `readabilityPlugin` | true | Boolean. Set to `false` to turn off and hide Readability check from Settings panel.
| `readabilityRoot` | 'body' | Target area for readability check. Pass `'main'` for main content area. Accepts one value only. |
| `readabilityLang` | 'en' | Default is English. Currently supports French and Spanish. |
| `readabilityIgnore` | ' ' | Ignore specific content from readability check. Hard default excludes list (&lt;li&gt;) tags within navigation landmarks.|

#### Toggleable rulesets in Settings panel
| Prop | Default | Description |
| :--- | :--- | :--- |
| `contrastPlugin` | true | Set to `false` to turn off and hide contrast check from Settings panel. |
| `formLabelsPlugin` | true | Set to `false` to turn off and hide Form labels check from Settings panel. |
| `linksAdvancedPlugin` | true | Set to `false` to turn off and hide Links (Advanced) check from Settings panel. |

#### Default QA (quality assurance) rulesets 
| Prop | Default | Description |
| :--- | :--- | :--- |
| `badLinksQA` | true | Flag URLs that you do not want your content editors linking to. Refer to `linksToFlag` prop.|
| `strongItalicsQA` | true | Flags entire paragraphs that are bolded or italicized. |
| `pdfQA` | true | Warning about PDF content. |
| `langQA` | true | Error if page language is not set. |
| `blockquotesQA` | true | Warning if blockquote is being used as a heading. |
| `tablesQA` | true | Various errors about innaccessible HTML tables. |
| `allCapsQA` | true | Warning about use of ALL CAPS. Uses regex. Set to `false` if problematic. |
| `fakeHeadingsQA` |  true | Warning about bolded text used as headings. Uses regex. Set to `false` if problematic. |
| `fakeListQA` | true | Warning about non-semantic lists. |
| `duplicateIdQA` | true | Error if duplicate IDs are found. |
| `exampleQA` | false | Example ruleset used to warn over use of a component. Visit Warnings page within demo for example. |

#### Embedded content rulesets (iFrames)
| Prop | Default | Description |
| :--- | :--- | :--- |
| `embeddedContentAll` | true | Set to `false` to ignore all iFrames.|
| `embeddedContentAudio` | true | Warning about audio content and transcripts.|
| `embeddedContentVideo` | true | Warning about video content and captions.|
| `embeddedContentTwitter` | true | Warning about endless Twitter widgets.|
| `embeddedContentDataViz` | true | Warning about data visualizations.|
| `embeddedContentTitles` | true | Warning about iFrame missing a descriptive title or accessible name.|
| `embeddedContentGeneral` | true | General warning about unknown iFrame content.|
| `videoContent` | "video, [src*='youtube.com'], [src*='vimeo.com'], [src*='yuja.com'], [src*='panopto.com']" | Common video players. |
| `audioContent` | "audio, [src*='soundcloud.com'], [src*='simplecast.com'], [src*='podbean.com'], [src*='buzzsprout.com'], [src*='blubrry.com'], [src*='transistor.fm'], [src*='fusebox.fm'], [src*='libsyn.com']" | Common podcast widgets or audio players. |
| `dataVizContent` | "[src*='datastudio.google.com'], [src*='tableau']" | Common data visualization widgets. |
| `twitterContent` | "[class^='twitter-timeline']" | Twitter timeline. |

#### Other notes
- This version appends tooltips to the end of the body by default to ensure tooltips do not get hidden by conflicting CSS styling. If you customize the tooltips to include interactive content, please read [Tippy.js documentation on creating accessible interactive tooltips for keyboard users.](https://atomiks.github.io/tippyjs/v6/accessibility/#interactivity)

### Create your own rule sets
1. Create your condition (within the QA module for example).
2. Add `this.warningCount++;` or `this.errorCount++;` to update warning or error count.
3. Add respective CSS classes.
4. Add warning or error button before (or after) element using the `this.annotate` function, followed by the type `ERROR`, `WARNING`, `GOOD`. Finally, reference your tooltip message.

#### Example: Warn content authors of overusing a component.
The example condition detects if more than one announcement is detected on a page. If it detects more than one instance of the .announcement-component CSS class, it will be indicated as a warning. The warning button will only appear on every instance except the first component. `M['QA_TOO_MANY_COMPONENTS_EXAMPLE']` represents a string (tooltip message).

```javascript
const $checkAnnouncement = document.querySelectorAll(".announcement-component");
if ($checkAnnouncement.length > 1) {
    this.warningCount++;
    for (let i = 1; i < $checkAnnouncement.length; i++) {
        $checkAnnouncement[i].classList.add("sa11y-warning-border");
        $checkAnnouncement[i].insertAdjacentHTML("beforebegin", this.annotate(M["WARNING"], M["QA_TOO_MANY_COMPONENTS_EXAMPLE"]));
    }
}
```

## Contributing
Want to help make Sa11y better? Consider [contributing](https://github.com/ryersondmp/sa11y/blob/master/CONTRIBUTING.md)!

# Acknowledgements
Development is lead and maintained by [Adam Chaboryk](https://github.com/adamchaboryk), IT Accessibility Specialist, Digital Media Projects, Computing and Communication Services (CCS) at Ryerson University in Toronto, Canada. 

### Previous student contributors
- Dylan Le (2021)
- Janice W. (2021)
- Farhan Mohammed (2020/2021)
- Kyle Padernilla (2019/2020)
- Arshad Mohammed (2018/2019)
- Benjamin Luong (2016/2017)

### Other acknowledgements
- Sa11y is an adaptation of [Tota11y by Khan Academy.](https://github.com/Khan/tota11y)
- Tooltip library by [Tippy.js](https://github.com/atomiks/tippyjs)
- [color-contrast](https://github.com/jasonday/color-contrast) script was created by Jason Day.
- Readability feature is an adaptation of the [Readability Bookmarklet](https://accessibility.oit.ncsu.edu/it-accessibility-at-nc-state/developers/tools/readability-bookmarklet/) created by Greg Kraus at North Carolina State University.
- The icons are created by [FontAwesome.](https://github.com/FortAwesome/Font-Awesome)
- John Jameson (Princeton University) maintains a fork of Sa11y called [Editoria11y](https://github.com/itmaybejj/editoria11y/) which is available as a turnkey Drupal module. Sa11y and Editoria11y share a lot of code!
- Sa11y's bookmarklet is hosted on [jsDelivr](https://www.jsdelivr.com/) - an awesome free CDN for open source projects.
- Brian Teeman and the Joomla team who assisted with the vanilla JavaScript port. Sa11y is included in Joomla 4.1 and later - no installation necessary! 

# Contact
Have a question or any feedback? Submit it as an [issue](https://github.com/ryersondmp/sa11y/issues) or email: [adam.chaboryk@ryerson.ca](mailto:adam.chaboryk)

# Privacy statement
No personal data is *ever* collected when you use Sa11y. No tracking, no analytics, no cookies, no third party content. 

Sa11y only uses your browser’s local storage to remember the state of optional rulesets and other features you enable. For example: when you enable the Readability check or display the Page Outline panel, it will remain enabled while you browse other pages until you turn it off.

Sa11y is open source and has been adapted by many developers. Your privacy is guaranteed when you use the official repository or plugins.
