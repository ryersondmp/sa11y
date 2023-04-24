/* eslint-disable no-alert */
import { loadSa11y } from './_loadSa11y';

const langCode = 'De';

if (typeof Sa11y !== 'object') {
  loadSa11y(langCode);
} else {
  alert('Ziehen Sie die Schaltfläche "Sa11y" in Ihre Lesezeichenleiste. Klicken Sie dann auf einer beliebigen Webseite auf das Lesezeichen.');
}
