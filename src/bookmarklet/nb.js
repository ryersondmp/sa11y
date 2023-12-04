/* eslint-disable no-alert */
import { loadSa11y } from './_loadSa11y';

const langCode = 'nb';

if (typeof Sa11y === 'object') {
  if (window.location.pathname.includes('sa11y')) {
    alert('Dra "Sa11y"-knappen til bokmerkelinjen. Klikk deretter på bokmerket på en hvilken som helst nettside.');
  } else {
    alert('Sa11y er allerede lastet inn på denne siden. Vennligst vent, eller last inn siden på nytt og prøv igjen.');
  }
} else {
  loadSa11y(langCode);
}
