/* eslint-disable no-alert */
import { loadSa11y } from './_loadSa11y';

const langCode = 'sv';

if (typeof Sa11y === 'object') {
  if (window.location.pathname.includes('sa11y')) {
    alert('Dra knappen "Sa11y" till ditt bokmärkesfält. Klicka sedan på bokmärket på valfri webbsida.');
  } else {
    alert('Sa11y är redan laddad på denna sida. Vänligen vänta, eller ladda om sidan och försök igen.');
  }
} else {
  loadSa11y(langCode);
}
