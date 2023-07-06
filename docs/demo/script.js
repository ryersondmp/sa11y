import { Sa11y, Lang } from '../assets/js/sa11y.esm.js';

// Translations
import Sa11yLangEn from '../assets/js/lang/en.js';
import Sa11yLangFr from '../assets/js/lang/fr.js';
import Sa11yLangPl from '../assets/js/lang/pl.js';
import Sa11yLangUa from '../assets/js/lang/ua.js';
import SallyLangSv from '../assets/js/lang/sv.js';
import SallyLangDe from '../assets/js/lang/de.js';

// Set translations
const url = window.location.href;
if (url.indexOf("/pl/") > -1) {
  Lang.addI18n(Sa11yLangPl.strings);
} else if (url.indexOf("/fr/") > -1) {
  Lang.addI18n(Sa11yLangFr.strings);
} else if (url.indexOf("/ua/") > -1) {
  Lang.addI18n(Sa11yLangUa.strings);
} else if (url.indexOf("/sv/") > -1) {
  Lang.addI18n(SallyLangSv.strings);
} else if (url.indexOf("/de/") > -1) {
  Lang.addI18n(SallyLangDe.strings);
} else {
  Lang.addI18n(Sa11yLangEn.strings);
}

// Instantiate
const sa11y = new Sa11y({
  checkRoot: 'body',
  readabilityRoot: 'main',
  customChecks: true,
  videoContent: 'youtube.com, vimeo.com, yuja.com, panopto.com, torontomu.ca',
  headerIgnore: '.ignore-this-heading',
  contrastIgnore: '.card-footer *, #player *',
  containerIgnore: 'footer',
  linksToFlag: "a[href^='https://www.dev.']",
  linkIgnoreSpan: '.sr-only-example',
  detectSPArouting: true,
  headless: false,
  dismissAnnotations: true,
  selectorPath: true,
  checkAllHideToggles: false,

  readabilityPlugin: true,
  contrastPlugin: true,
  formLabelsPlugin: true,
  colourFilterPlugin: true,
  linksAdvancedPlugin: true,

  shadowComponents: '',
  autoDetectShadowComponents: true,
  panelPosition: 'right',

  // Specific checks
  linksToDOI: true,
  missingH1: true,
  nonConsecutiveHeadingIsError: true,
});
