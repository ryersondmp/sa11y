/* eslint-disable no-alert */
import { loadSa11y } from './_loadSa11y';

const langCode = 'lv';

if (typeof Sa11y !== 'object') {
  loadSa11y(langCode);
} else {
  alert('Velciet pogu "Sa11y" uz grāmatzīmju joslu. Pēc tam noklikšķiniet uz grāmatzīmes jebkurā tīmekļa vietnē.');
}
