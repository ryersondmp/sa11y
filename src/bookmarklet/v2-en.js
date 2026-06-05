/* eslint-disable no-alert */
/* eslint-disable no-undef */
/* eslint-disable no-new */

// Version based on package.json
const version = Sa11yVersion;
const loadingSpinnerSVG = `
<style>
.loader {
  height: 55px;
  width: 55px;
  background: linear-gradient(0deg, #e040fb, #00bcd4);
  background-color: var(--sa11y-setting-switch-bg-off);
  background-size: 150% 150%;
  border-radius: 50%;
  text-align: center;
  vertical-align: middle;
  bottom: 15px;
  inset-inline-end: 18px;
  position: fixed;
  z-index: 9999;
}
</style>

<!-- Credit: https://codepen.io/aurer/pen/ZEJxpO -->
<svg version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" width="55px" height="55px" viewBox="0 0 50 50" style="enable-background:new 0 0 50 50;" xml:space="preserve">
  <path fill="#FFF" d="M25.251,6.461c-10.318,0-18.683,8.365-18.683,18.683h4.068c0-8.071,6.543-14.615,14.615-14.615V6.461z">
  <animateTransform attributeType="xml"
    attributeName="transform"
    type="rotate"
    from="0 25 25"
    to="360 25 25"
    dur="1.2s"
    repeatCount="indefinite"/>
  </path>
</svg>`;

// Helper function to safely normalize language codes based on Sa11y supported targets
const getNormalizedLang = (langString) => {
  const getLangResult = langString || 'en';
  const splitLang = getLangResult.split('-');
  let lang = splitLang[0];
  const country = (splitLang[1]) ? splitLang[1].toLowerCase() : '';

  const supportedLang = [
    'bg', 'cs', 'da', 'de', 'el', 'en', 'es', 'et', 'fi', 'fr', 'hu', 'id', 'it', 'ja', 'ko',
    'lt', 'lv', 'nb', 'nl', 'pl', 'pt', 'ro', 'sl', 'sk', 'sv', 'ta', 'tr', 'uk', 'ua', 'zh',
  ];

  if (!supportedLang.includes(lang)) {
    lang = 'en';
  } else if (lang === 'pt') {
    lang = country === 'br' ? 'ptBR' : 'ptPT';
  } else if (lang === 'uk') {
    lang = 'ua';
  } else if (lang === 'en') {
    lang = country === 'us' ? 'enUS' : 'en';
  }

  return lang;
};

// Inject Sa11y's stylesheet in header.
const loadStyleSheet = () => new Promise((resolve, reject) => {
  const link = document.createElement('link');
  link.rel = 'stylesheet';
  link.href = `https://cdn.jsdelivr.net/gh/ryersondmp/sa11y@${version}/dist/css/sa11y.min.css`;
  link.onload = resolve;
  link.onerror = reject;
  document.head.appendChild(link);
});

// Dynamically combine and inject required language packs and core file
const loadScript = (browserLang, pageLang) => new Promise((resolve, reject) => {
  const script = document.createElement('script');

  const filesToLoad = [
    `gh/ryersondmp/sa11y@${version}/dist/js/lang/${browserLang}.umd.min.js`
  ];

  // Optimize network request: only fetch page language pack if it differs from browser language
  if (browserLang !== pageLang) {
    filesToLoad.push(`gh/ryersondmp/sa11y@${version}/dist/js/lang/${pageLang}.umd.min.js`);
  }

  // Always append core execution script last
  filesToLoad.push(`gh/ryersondmp/sa11y@${version}/dist/js/sa11y.umd.min.js`);

  script.src = `https://cdn.jsdelivr.net/combine/${filesToLoad.join(',')}`;
  script.onload = resolve;
  script.onerror = reject;
  document.body.appendChild(script);
});

// Once scripts are loaded, instantiate Sa11y.
const onLoadScript = (browserLang, pageLang) => {
  // Instantiate.
  const instantiate = () => {
    const browserKey = `Sa11yLang${browserLang.charAt(0).toUpperCase() + browserLang.slice(1)}`;
    const pageKey = `Sa11yLang${pageLang.charAt(0).toUpperCase() + pageLang.slice(1)}`;

    const browserLangObj = window[browserKey] || {};
    const pageLangObj = window[pageKey] || {};

    // Combine standard UX strings from Browser Preference and Rulesets from Page Document Lang
    const mergedStrings = {
      ...(browserLangObj.strings || browserLangObj),
      ...(pageLangObj.ruleset || {})
    };

    Sa11y.Lang.addI18n(mergedStrings);
    new Sa11y.Sa11y({
      autoDetectShadowComponents: true,
      customChecks: false,
      exportResultsPlugin: true,
      detectSPArouting: true,
    });
  };

  // Vendor specific work-arounds...
  const loadingEl = document.getElementById('sa11y-loading');
  const iframeSrc = document.querySelector('iframe.player')?.getAttribute('src') || '';
  let isSafe = false;
  try {
    const { protocol, hostname } = new URL(iframeSrc);
    isSafe = protocol === 'https:' && ['360.articulate.com', 'articulate.com'].includes(hostname);
  } catch {
    isSafe = false;
  }
  const { origin, pathname } = window.location;
  const isTargetPage = origin === 'https://360.articulate.com' && pathname.startsWith('/review/content');
  if (isTargetPage && isSafe) {
    loadingEl?.remove();
    if (confirm('Redirect to check accessibility in a new tab?')) {
      window.open(iframeSrc, '_blank', 'noopener,noreferrer');
    }
  } else {
    instantiate();
    loadingEl?.remove();
  }
};

const initialize = () => {
  // Add loading spinner in case Sa11y takes a few seconds to download.
  const loadingSpinner = document.createElement('div');
  loadingSpinner.id = 'sa11y-loading';
  const shadowRoot = loadingSpinner.attachShadow({ mode: 'open' });
  const loadingSpinnerContent = document.createElement('div');
  loadingSpinnerContent.classList.add('loader');
  loadingSpinnerContent.innerHTML = loadingSpinnerSVG;
  shadowRoot.appendChild(loadingSpinnerContent);
  document.body.appendChild(loadingSpinner);

  // Compute normalized source targets
  const pageLang = getNormalizedLang(document.documentElement.lang);
  const browserLang = getNormalizedLang(navigator.language || navigator.languages?.[0]);

  // Load scripts & then instantiate Sa11y.
  loadStyleSheet()
    .then(() => loadScript(browserLang, pageLang))
    .then(() => onLoadScript(browserLang, pageLang))
    .catch((error) => new Error('Error loading Sa11y:', error));
};

// Initialize.
initialize();