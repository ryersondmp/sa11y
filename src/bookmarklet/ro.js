import { loadSa11y } from './_loadSa11y';

const langCode = 'ro';
const message = {
  close: 'Închide',
  heading: 'Actualizare necesară',
  message: 'Vă rugăm să actualizați bookmarkletul Sa11y adăugând următorul link în bara de marcaje.',
  features: 'Noi caracteristici ale bookmarkletului',
  a: 'Detectare automată a limbii paginii',
  aContent: 'Acest bookmarklet afișează automat o versiune tradusă a lui Sa11y pe baza limbii paginii. Dacă limba nu este suportată, va fi folosită limba engleză.',
  b: 'Avertisment privind politica de securitate',
  bContent: 'Va apărea un avertisment dacă site-ul aplică politici de securitate care restricționează funcționarea lui Sa11y pe paginile sale.',
};
loadSa11y(langCode, message);
