/* eslint-disable no-alert */
import { loadSa11y } from './_loadSa11y';

const langCode = 'Sv';

if (typeof Sa11y !== 'object') {
  loadSa11y(langCode);
} else {
  alert('Dra knappen "Sa11y" till ditt bokmärkesfält. Klicka sedan på bokmärket på valfri webbsida.');
}
