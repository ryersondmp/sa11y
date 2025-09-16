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

// Inject Sa11y's stylesheet in header.
const loadStyleSheet = () => new Promise((resolve, reject) => {
  const link = document.createElement('link');
  link.rel = 'stylesheet';
  link.href = `https://raw.githack.com/ryersondmp/sa11y/${version}/dist/css/sa11y.css`;
  link.onload = resolve;
  link.onerror = reject;
  document.head.appendChild(link);
});

// Then inject Sa11y's javascript in the body of the page.
const loadScript = (lang) => new Promise((resolve, reject) => {
  const urls = [
    `https://raw.githack.com/ryersondmp/sa11y/${version}/dist/js/sa11y.umd.js`,
    `https://raw.githack.com/ryersondmp/sa11y/${version}/dist/js/lang/${lang}.umd.js`,
  ];
  let i = 0;
  // eslint-disable-next-line consistent-return
  function loadNext() {
    if (i >= urls.length) return resolve();
    const script = document.createElement('script');
    // eslint-disable-next-line no-plusplus
    script.src = urls[i++];
    script.onload = loadNext;
    script.onerror = reject;
    document.body.appendChild(script);
  }
  loadNext();
});

// Once scripts are loaded, instantiate Sa11y.
const onLoadScript = (lang) => {
  // Instantiate.
  const instantiate = () => {
    const objectKey = `Sa11yLang${lang.charAt(0).toUpperCase() + lang.slice(1)}`;
    Sa11y.Lang.addI18n(window[objectKey].strings);
    new Sa11y.Sa11y({
      autoDetectShadowComponents: true,
      customChecks: false,
      exportResultsPlugin: true,
      detectSPArouting: true,
    });
  };

  // Vendor specific work-arounds...
  const url = window.location.href;
  if (url.includes('https://360.articulate.com/review/content')) {
    const iframe = document.querySelector('iframe.player');
    const src = iframe.getAttribute('src');
    if (iframe && src) {
      document.getElementById('sa11y-loading').remove();
      if (window.confirm('Press OK to be redirected to a page where you can check the accessibility of the content. The page will open in a new tab.')) {
        window.open(src, '_blank');
      }
    } else {
      instantiate();
    }
  } else {
    instantiate();

    // Remove loading spinner once Sa11y is instantiated.
    document.getElementById('sa11y-loading').remove();
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

  // Get page locale.
  const getLangResult = document.documentElement.lang || 'en';
  const splitLang = getLangResult.split('-');
  let lang = splitLang[0];
  const country = (splitLang[1]) ? splitLang[1].toLowerCase() : '';

  // Sa11y is available in the following languages.
  const supportedLang = [
    'bg', 'cs', 'da', 'de', 'el', 'en', 'es', 'et', 'fi', 'fr', 'hu', 'id', 'it', 'ja', 'ko',
    'lt', 'lv', 'nb', 'nl', 'pl', 'pt', 'ro', 'sl', 'sk', 'sv', 'tr', 'uk', 'ua', 'zh',
  ];

  // Check if Sa11y supports language.
  if (!supportedLang.includes(lang)) {
    lang = 'en';
  } else if (lang === 'pt') {
    lang = country === 'br' ? 'ptBR' : 'ptPT';
  } else if (lang === 'uk') {
    lang = 'ua';
  } else if (lang === 'en') {
    lang = country === 'us' ? 'enUS' : 'en';
  }

  // Load scripts & then instantiate Sa11y.
  loadStyleSheet()
    .then(() => loadScript(lang))
    .then(() => onLoadScript(lang))
    .catch((error) => new Error('Error loading Sa11y:', error));
};

// Initialize.
initialize();
