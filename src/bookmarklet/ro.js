/* eslint-disable no-alert */
import { loadSa11y } from './_loadSa11y';

const langCode = 'ro';

if (typeof Sa11y !== 'object') {
  loadSa11y(langCode);
} else {
  alert('Trageți butonul "Sa11y" în bara de marcaje. Apoi faceți clic pe marcaj pe orice pagină web.');
}
