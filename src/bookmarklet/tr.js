/* eslint-disable no-alert */
import { loadSa11y } from './_loadSa11y';

const langCode = 'tr';

if (typeof Sa11y === 'object') {
  if (window.location.pathname.includes('sa11y')) {
    alert('Dra knappen "Sa11y" till ditt bokmärkesfält. Klicka sedan på bokmärket på valfri webbsida.');
  } else {
    alert('"Sa11y" düğmesini yer imleri çubuğunuza sürükleyin. Ardından herhangi bir web sayfasında yer imine tıklayın.');
  }
} else {
  loadSa11y(langCode);
}
