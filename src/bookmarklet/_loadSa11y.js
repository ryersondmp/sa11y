/* eslint-disable no-undef */
// Version based on package.json
// const version = Sa11yVersion;
const version = '3.0.0-development';

export function loadSa11y(onLoadScript, langCode) {
  // Append styles
  const sa11ycss = document.createElement('link');
  const sa11yhead = document.getElementsByTagName('head')[0];
  sa11ycss.rel = 'stylesheet';
  sa11ycss.href = `https://cdn.jsdelivr.net/gh/ryersondmp/sa11y@${version}/dist/css/sa11y.min.css`;
  sa11ycss.type = 'text/css';
  sa11yhead.appendChild(sa11ycss);

  // Append javascript
  const sa11yscript = document.createElement('script');
  sa11yscript.src = `https://cdn.jsdelivr.net/combine/gh/ryersondmp/sa11y@${version}/dist/js/lang/${langCode}.umd.js,gh/ryersondmp/sa11y@${version}/dist/js/sa11y.umd.min.js`;
  document.body.appendChild(sa11yscript);
  sa11yscript.onload = onLoadScript;
  sa11yscript.onreadystatechange = onLoadScript;
}
