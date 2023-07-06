/* eslint-disable no-alert */
import { loadSa11y } from './_loadSa11y';

const langCode = 'it';

if (typeof Sa11y !== 'object') {
  loadSa11y(langCode);
} else {
  alert('Trascinate il pulsante "Sa11y" nella barra dei segnalibri. Fate quindi clic sul segnalibro in qualsiasi pagina web.');
}
