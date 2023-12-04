/* eslint-disable no-alert */
import { loadSa11y } from './_loadSa11y';

const langCode = 'lt';

if (typeof Sa11y === 'object') {
  if (window.location.pathname.includes('sa11y')) {
    alert('Vilkite mygtuką "Sa11y" į skirtukų juostą. Tada spustelėkite žymę bet kuriame tinklalapyje.');
  } else {
    alert('Sa11y jau įkeltas į šį puslapį. Palaukite arba įkelkite puslapį iš naujo ir bandykite dar kartą.');
  }
} else {
  loadSa11y(langCode);
}
