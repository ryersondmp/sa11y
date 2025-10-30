import { Sa11y, Lang } from '../../dist/js/sa11y.esm.js';
import Sa11yLangEn from '../../dist/js/lang/en.js';

// Instantiate
Lang.addI18n(Sa11yLangEn.strings);
window.setTimeout(() => {
  const fixedRoots = document.querySelector('iframe').contentWindow.document.body.querySelector('main');
  const sa11y = new Sa11y({
    checkRoot: 'body',
    fixedRoots: [fixedRoots],
    insertAnnotationBefore: 'iframe',
    exportResultsPlugin: false,
    autoDetectShadowComponents: false,
  });
}, 100);

/* Console all results */
document.addEventListener('sa11y-check-complete', (e) => {
  console.log(e.detail);
});
