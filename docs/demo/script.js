import { Sa11y, Lang } from '../assets/js/sa11y.esm.js';

// Translations
import Sa11yLangEn from '../assets/js/lang/en.js';
import Sa11yLangFr from '../assets/js/lang/fr.js';
import Sa11yLangPl from '../assets/js/lang/pl.js';
import Sa11yLangUa from '../assets/js/lang/ua.js';

// Sa11y's version.
const v = "2.3.0";
const webV = document.getElementById("v");
webV.innerHTML = v;

// Set translations
const url = window.location.href;
if (url.indexOf("pl") > -1) {
  Lang.addI18n(Sa11yLangPl.strings);
} else if (url.indexOf("fr") > -1) {
  Lang.addI18n(Sa11yLangFr.strings);
} else if (url.indexOf("ua") > -1) {
  Lang.addI18n(Sa11yLangUa.strings);
} else {
  Lang.addI18n(Sa11yLangEn.strings);
}

// Instantiate
const sa11y = new Sa11y({
  checkRoot: "body",
  readabilityRoot: "main",
  containerIgnore: 'footer',
  linksToFlag: "a[href^='https://www.dev.']",
  linkIgnoreSpan: '.sr-only-example',
  detectSPArouting: true,
});