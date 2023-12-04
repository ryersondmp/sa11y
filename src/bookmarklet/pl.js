/* eslint-disable no-alert */
import { loadSa11y } from './_loadSa11y';

const langCode = 'pl';

if (typeof Sa11y === 'object') {
  if (window.location.pathname.includes('sa11y')) {
    alert('Przeciągnij przycisk „Sa11y” na pasek zakładek. Następnie kliknij zakładkę na dowolnej stronie internetowej.');
  } else {
    alert('Sa11y jest już załadowany na tej stronie. Poczekaj lub przeładuj stronę i spróbuj ponownie.');
  }
} else {
  loadSa11y(langCode);
}
