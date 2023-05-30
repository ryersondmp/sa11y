import { Sa11y, Lang } from '../assets/js/sa11y.esm.js';

// Translations
import Sa11yLangEn from '../assets/js/lang/en.js';
import Sa11yLangFr from '../assets/js/lang/fr.js';
import Sa11yLangPl from '../assets/js/lang/pl.js';
import Sa11yLangUa from '../assets/js/lang/ua.js';
import SallyLangSv from '../assets/js/lang/sv.js';
import SallyLangDe from '../assets/js/lang/de.js';

// Sa11y's version.
const v = "3.0.2";
const webV = document.getElementById("v");
webV.innerHTML = v;

// Custom checks for English demo pages only.
let readabilityISO = false;

// Set translations
const url = window.location.href;
if (url.indexOf("/pl/") > -1) {
  Lang.addI18n(Sa11yLangPl.strings);
} else if (url.indexOf("/fr/") > -1) {
  Lang.addI18n(Sa11yLangFr.strings);
  readabilityISO = 'fr';
} else if (url.indexOf("/ua/") > -1) {
  Lang.addI18n(Sa11yLangUa.strings);
} else if (url.indexOf("/sv/") > -1) {
  Lang.addI18n(SallyLangSv.strings);
  readabilityISO = 'sv';
} else if (url.indexOf("/de/") > -1) {
  Lang.addI18n(SallyLangDe.strings);
  readabilityISO = 'de';
} else {
  Lang.addI18n(Sa11yLangEn.strings);
  readabilityISO = 'en';
}

// Instantiate
const sa11y = new Sa11y({
  customChecks: true,
  videoContent: 'youtube.com, vimeo.com, yuja.com, panopto.com, torontomu.ca',
  checkRoot: 'body',
  headerIgnore: '.ignore-this-heading',
  contrastIgnore: '.card-footer *, #player *',
  readabilityRoot: 'main',
  readabilityLang: readabilityISO,
  containerIgnore: 'footer',
  linksToFlag: "a[href^='https://www.dev.']",
  linkIgnoreSpan: '.sr-only-example',
  detectSPArouting: true,
  headless: false,
  dismissAnnotations: true,
  selectorPath: false,
  checkAllHideToggles: false,

  readabilityPlugin: true,
  contrastPlugin: true,
  formLabelsPlugin: true,
  colourFilterPlugin: true,
  linksAdvancedPlugin: true,

  shadowComponents: '',
  autoDetectShadowComponents: true,
  panelPosition: 'right',
});
