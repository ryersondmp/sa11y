![Sa11y, the accessibility quality assurance tool.](https://ryersondmp.github.io/sa11y/assets/github-banner.png)

<div align="center">

[![Over several hundred monthly requests on jsDelivr.](https://data.jsdelivr.com/v1/package/gh/ryersondmp/sa11y/badge?style=rounded)](https://www.jsdelivr.com/package/gh/ryersondmp/sa11y) [![License: GPL v2](https://img.shields.io/badge/License-GPL_v2-blue.svg)](https://github.com/ryersondmp/sa11y/blob/master/LICENSE.md) [![npm version](https://badge.fury.io/js/sa11y.svg)](https://www.npmjs.com/package/sa11y)

</div>

<h1 align="center">Sa11y</h1>
<p align="center">Meet Sa11y, the <strong>accessibility quality assurance assistant.</strong> Sa11y is a customizable, framework-agnostic JavaScript plugin. Sa11y works as a simple in-page checker that visually highlights common accessibility and usability issues. Geared towards content authors, Sa11y straightforwardly identifies errors or warnings at the source with a simple tooltip on how to fix them. Sa11y is <strong>not</strong> a comprehensive code analysis tool; it exclusively highlights content issues.</p>

* [Project website](https://sa11y.netlify.app/) 🌐
* [Developer documentation](https://sa11y.netlify.app/developers/) 📓
* [Demo](https://ryersondmp.github.io/sa11y/demo/en/) 🚀
* [Report an issue](https://github.com/ryersondmp/sa11y/issues) 🐜
* [Install the WordPress plugin](https://wordpress.org/plugins/sa11y/) 💻
* [WordPress plugin development repo](https://github.com/ryersondmp/sa11y-wp) 🛠
* [Acknowledgements](https://sa11y.netlify.app/acknowledgements/) 👤

## Features
- Over 50 checks that encourage quality accessibility.
  - Checks for issues regarding images, headings, links, form labels, and more.
  - Toggleable/optional checks: readability analysis, contrast checking, and colour filters.
- **Automatic:** checks content on page load.
- **Customizable:** JSON-like props to fine tune the experience for content authors.
- **Focus on the issues:** Turn off or hide irrelevant checks.
- **Scalable:** Check every page for accessibility.
- Support for checking items within web components/shadow DOM and headless checks.
- Fully encapsulated user interface with dark mode.
- Offered in various [languages.](https://github.com/ryersondmp/sa11y/tree/master/src/js/lang)

## Contributing
Want to help translate or improve Sa11y? Consider [contributing!](https://github.com/ryersondmp/sa11y/blob/master/CONTRIBUTING.md) Translations may either be contributed back to the repository with a pull request, or translated files can be returned to: [adam.chaboryk@torontomu.ca](mailto:adam.chaboryk@torontomu.ca). When submitting a pull request, please ensure you create your translated file within the `/src/js/lang/` directory.

## Contact
Have a question or any feedback? Email: [adam.chaboryk@torontomu.ca](mailto:adam.chaboryk@torontomu.ca)

<hr>

## Install
Sa11y is a framework-agnostic JavaScript plugin. It's made with vanilla JavaScript and CSS, and its only dependency is Tippy.js - a highly customizable tooltip library that features a positioning system.

To install on your website, insert Sa11y right before the closing `</body>` tag. Sa11y consists of three files:

- **sa11y.css** - The main stylesheet. Should be included in the `<head>` of the document (if possible).
- **lang/en.js** - All text strings and tooltip messages. View [supported languages.](https://sa11y.netlify.app/developers/#languages)
- **sa11y.js** - Contains all logic.

### NPM
`npm i sa11y`

### Example installation (modules)
````html
<!-- Stylesheet -->
<link rel="stylesheet" href="css/sa11y.min.css"/>

<!-- JavaScript -->
<script type="module">
  import { Sa11y, Lang } from '../assets/js/sa11y.esm.js';
  import Sa11yLangEn from '../assets/js/lang/en.js';

  // Set translations
  Lang.addI18n(Sa11yLangEn.strings);

  // Instantiate
  const sa11y = new Sa11y({
    checkRoot: "body",
    // Customize with props.
  });
</script>
````

### Example installation (regular script)
````html
<!-- Stylesheet -->
<link rel="stylesheet" href="css/sa11y.min.css"/>

<!-- JavaScript -->
<script src="/dist/js/sa11y.umd.min.js"></script>
<script src="/dist/js/lang/en.umd.js"></script>

<!-- Instantiate -->
<script>
  Sa11y.Lang.addI18n(Sa11yLangEn.strings);
  const sa11y = new Sa11y.Sa11y({
    checkRoot: "body",
    // Customize with props.
  });
</script>
````

### CDN
Please visit [developer documentation](https://sa11y.netlify.app/developers/) for CDN installation instructions.

## Development environment
A light server for development is included. Any change inside `/src` folder files will trigger the build process for the files and will reload the page with the new changes. To use this environment:

1. Ensure node is installed and up to date (at least v20 and up).
2. Clone this repo.
3. Run `npm install`
4. Run `npm run serve`. Then open `http://localhost:8080/docs/demo/en/` in your browser.
5. For unit tests, execute `npm run test` while the server is running.

**Tip!** To speed up compile time while developing, navigate to `rollup.config.js` and change `developmentMode` to `true`. This will only compile javascript, SCSS, and English translation strings.
