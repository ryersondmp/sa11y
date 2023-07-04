/* eslint-disable no-alert */
import { loadSa11y } from './_loadSa11y';

const langCode = 'nl';

if (typeof Sa11y !== 'object') {
  loadSa11y(langCode);
} else {
  alert('Sleep de knop "Sa11y" naar je bladwijzerbalk. Klik vervolgens op de bladwijzer op een willekeurige webpagina.');
}
