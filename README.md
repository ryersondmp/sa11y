![Sa11y, the accessibility quality assurance tool.](https://raw.githubusercontent.com/ryersondmp/sa11y/master/docs/assets/github-banner.png)

# Sa11y
Sa11y works as a simple in-page checker that is designed to be easily customized and integrated into any content management system (CMS) to facilitate good accessibility practices. Sa11y works best in a templated CMS environment, although can also work as a bookmarklet. Sa11y is not a comprehensive code analysis tool.
- Over 30 test conditions.
- Easy, intuitive tooltips to explain issues.
- Free and open source.
- No complex API or integrations.
- Simple rule sets.
- Easily customizable: add your own rulesets.

## Documentation and Demo
:arrow_right: [View project website and demo](https://ryersondmp.github.io/sa11y/)

## Updates
* 12-02-2021
    * Enhancement: Error, Warning and Pass buttons are slightly smaller, but still adhere to WCAG AAA Target Size.
    * Enhancement: The summarized list of headings under "Page Outline" now only display a single number without H prefix.
    * Enhancement: Updated PDF warning to include types of issues experienced with PDF and general remediation advice.
    * Enhancement: Warning to provide transcript for audio content now detects multiple providers: soundcloud, simplecast, podbean, buzzsprout, blubrry, transistor, fusebox, libsyn.
    * Enhancement: Added Tableau to data visualization detection ruleset and updated tooltip verbiage.
    * Bug fixes: Custom styling for HR element within tooltips, added selector to webkit-scrollbar.

## Contact or feedback
Have a question or any feedback? Submit it as an [issue](https://github.com/ryersondmp/sa11y/issues) or email: adam.chaboryk@ryerson.ca

## Acknowledgements
Development lead by [Adam Chaboryk](https://github.com/adamchaboryk), IT Accessibility Specialist, Digital Media Projects, Computing and Communication Services (CCS) at Ryerson University in Toronto, Canada. 

### Development and testing 
- Farhan Mohammed, Web Accessibility &amp; Usability Assistant, Ryerson University (2020/2021)
- Kyle Padernilla, Web Accessibility &amp; Usability Assistant, Ryerson University (2019/2020)
- Arshad Mohammed, Web Accessibility &amp; Usability Assistant, Ryerson University (2018/2019)
- Benjamin Luong, Web Accessibility &amp; Usability Assistant, Ryerson University (2016/2017)

### Built with
- Sa11y is an adaptation of [Tota11y by Khan Academy.](https://github.com/Khan/tota11y)
- Tooltip library by [Tippy.js](https://github.com/atomiks/tippyjs)
- [jQuery contrast plugin](https://github.com/jasonday/color-contrast) was created by jasonday.
- The icons are made by [FontAwesome.](https://github.com/FortAwesome/Font-Awesome)
- Powered with jQuery.