![Sa11y, the accessibility quality assurance tool.](https://ryersondmp.github.io/sa11y/github-banner.png)

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
- Over 80 checks that encourage quality accessibility.
- **Automatic:** checks content on page load.
- **Customizable:** JSON-like props to fine tune the experience for content authors.
- **Focus on the issues:** Turn off or hide irrelevant checks.
- **Scalable:** Check every page for accessibility.
- Support for checking items within web components/shadow DOM and headless checks.
- Fully encapsulated user interface with dark mode.
- Offered in various [languages.](https://github.com/ryersondmp/sa11y/tree/master/src/js/lang)

### Table layout warnings
Single-column tables with multiple rows (`TABLES_SINGLE_COLUMN`) and single-cell tables
(`TABLES_SINGLE_CELL`) produce an "Is this a table?" warning instead of a missing-header
error. These checks include both data and header cells, account for cell spans, and
exclude nested tables when counting rows and columns. Hidden and presentational tables
remain excluded. Other table diagnostics still apply.

Both checks are enabled by default and can be disabled individually through `checks`.
Disabling a layout warning restores the usual missing-header check for that table.
The new warning messages currently use English in all language packs, pending translation.

## Install
For setup instructions, including local development, installation, or CDN links, please visit the [developer documentation.](https://sa11y.netlify.app/developers/)

## Contributing
Want to help translate or improve Sa11y? Consider [contributing!](https://github.com/ryersondmp/sa11y/blob/master/CONTRIBUTING.md) Translations may either be contributed back to the repository with a pull request, or translated files can be returned to: [adam.chaboryk@torontomu.ca](mailto:adam.chaboryk@torontomu.ca). When submitting a pull request, please ensure you create your translated file within the `/src/js/lang/` directory.

## Contact
Have a question or any feedback? Email: [adam.chaboryk@torontomu.ca](mailto:adam.chaboryk@torontomu.ca)
