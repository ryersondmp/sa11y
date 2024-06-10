/* eslint-disable no-alert */
/* eslint-disable no-undef */
/* eslint-disable no-new */

/* ENGLISH - No automatic language detection. */

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
  link.href = `https://cdn.jsdelivr.net/gh/ryersondmp/sa11y@${version}/dist/css/sa11y.min.css`;
  link.onload = resolve;
  link.onerror = reject;
  document.head.appendChild(link);
});

// Then inject Sa11y's javascript in the body of the page.
const loadScript = () => new Promise((resolve, reject) => {
  const script = document.createElement('script');
  script.src = `https://cdn.jsdelivr.net/combine/gh/ryersondmp/sa11y@${version}/dist/js/lang/en.umd.min.js,gh/ryersondmp/sa11y@${version}/dist/js/sa11y.umd.min.js`;
  script.onload = resolve;
  script.onerror = reject;
  document.body.appendChild(script);
});

// Once scripts are loaded, instantiate Sa11y.
const onLoadScript = () => {
  // Instantiate.
  const instantiate = () => {
    Sa11y.Lang.addI18n(Sa11yLangEn.strings);
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

  // Load scripts & then instantiate Sa11y.
  loadStyleSheet()
    .then(() => loadScript())
    .then(() => onLoadScript())
    .catch((error) => new Error('Error loading Sa11y:', error));
};

// Initialize.
initialize();
