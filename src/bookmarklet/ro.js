/* eslint-disable no-alert */
import { loadSa11y } from './_loadSa11y';

const langCode = 'ro';

if (typeof Sa11y === 'object') {
  if (window.location.pathname.includes('sa11y')) {
    alert('Trageți butonul "Sa11y" în bara de marcaje. Apoi faceți clic pe marcaj pe orice pagină web.');
  } else {
    alert('Sa11y este deja încărcat pe această pagină. Vă rugăm să așteptați sau reîncărcați pagina și încercați din nou.');
  }
} else {
  loadSa11y(langCode);
}
