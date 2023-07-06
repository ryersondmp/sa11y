/* eslint-disable no-alert */
import { loadSa11y } from './_loadSa11y';

const langCode = 'tr';

if (typeof Sa11y !== 'object') {
  loadSa11y(langCode);
} else {
  alert('"Sa11y" düğmesini yer imleri çubuğunuza sürükleyin. Ardından herhangi bir web sayfasında yer imine tıklayın.');
}
