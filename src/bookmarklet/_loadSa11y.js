/* eslint-disable no-new */
/* eslint-disable no-undef */

/* If TESTING, change production to FALSE */
const production = true;
const env = (production === true) ? '' : '-development';

// Version based on package.json
const version = Sa11yVersion;

// Customize props within this section.
const onLoadScript = (lang) => {
  const objectKey = `Sa11yLang${lang.charAt(0).toUpperCase() + lang.slice(1)}`;
  Sa11y.Lang.addI18n(window[objectKey].strings);
  new Sa11y.Sa11y({
    autoDetectShadowComponents: true,
    customChecks: false,
    exportResultsPlugin: true,
    detectSPArouting: true,
  });
};

export function loadSa11y(langCode) {
  // Append styles
  const sa11ycss = document.createElement('link');
  const sa11yhead = document.getElementsByTagName('head')[0];
  sa11ycss.rel = 'stylesheet';
  sa11ycss.href = `https://cdn.jsdelivr.net/gh/ryersondmp/sa11y@${version}${env}/dist/css/sa11y.min.css`;
  sa11ycss.type = 'text/css';
  sa11yhead.appendChild(sa11ycss);

  // Append javascript
  const sa11yscript = document.createElement('script');
  sa11yscript.src = `https://cdn.jsdelivr.net/combine/gh/ryersondmp/sa11y@${version}${env}/dist/js/lang/${langCode}.umd.min.js,gh/ryersondmp/sa11y@${version}${env}/dist/js/sa11y.umd.min.js`;
  document.body.appendChild(sa11yscript);

  sa11yscript.onload = () => onLoadScript(langCode);
  sa11yscript.onreadystatechange = () => onLoadScript(langCode);
}
