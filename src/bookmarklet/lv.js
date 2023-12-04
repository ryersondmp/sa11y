/* eslint-disable no-alert */
import { loadSa11y } from './_loadSa11y';

const langCode = 'lv';

if (typeof Sa11y === 'object') {
  if (window.location.pathname.includes('sa11y')) {
    alert('Velciet pogu "Sa11y" uz grāmatzīmju joslu. Pēc tam noklikšķiniet uz grāmatzīmes jebkurā tīmekļa vietnē.');
  } else {
    alert('Sa11y jau ir ielādēts šajā lapā. Lūdzu, pagaidiet vai ielādējiet lapu no jauna un mēģiniet vēlreiz.');
  }
} else {
  loadSa11y(langCode);
}
