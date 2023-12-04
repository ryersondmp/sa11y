/* eslint-disable no-alert */
import { loadSa11y } from './_loadSa11y';

const langCode = 'de';

if (typeof Sa11y === 'object') {
  if (window.location.pathname.includes('sa11y')) {
    alert('Ziehen Sie die Schaltfläche "Sa11y" in Ihre Lesezeichenleiste. Klicken Sie dann auf einer beliebigen Webseite auf das Lesezeichen.');
  } else {
    alert('Sa11y ist bereits auf dieser Seite geladen. Bitte warten Sie, oder laden Sie die Seite neu und versuchen Sie es erneut.');
  }
} else {
  loadSa11y(langCode);
}
