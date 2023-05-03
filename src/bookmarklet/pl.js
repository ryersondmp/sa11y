/* eslint-disable no-alert */
import { loadSa11y } from './_loadSa11y';

const langCode = 'Pl';

if (typeof Sa11y !== 'object') {
  loadSa11y(langCode);
} else {
  alert('Przeciągnij przycisk „Sa11y” na pasek zakładek. Następnie kliknij zakładkę na dowolnej stronie internetowej.');
}
