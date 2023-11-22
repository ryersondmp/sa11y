/* eslint-disable no-alert */
import { loadSa11y } from './_loadSa11y';

const langCode = 'it';

if (typeof Sa11y === 'object') {
  if (window.location.pathname.includes('sa11y')) {
    alert('Trascinate il pulsante "Sa11y" nella barra dei segnalibri. Fate quindi clic sul segnalibro in qualsiasi pagina web.');
  } else {
    alert('Sa11y è già stato caricato su questa pagina. Attendere o ricaricare la pagina e riprovare.');
  }
} else {
  loadSa11y(langCode);
}
