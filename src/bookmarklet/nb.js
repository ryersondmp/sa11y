/* eslint-disable no-alert */
import { loadSa11y } from './_loadSa11y';

const langCode = 'Nb';

if (typeof Sa11y !== 'object') {
  loadSa11y(langCode);
} else {
  alert('Dra "Sa11y"-knappen til bokmerkelinjen. Klikk deretter på bokmerket på en hvilken som helst nettside.');
}