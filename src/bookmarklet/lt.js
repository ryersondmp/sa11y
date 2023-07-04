/* eslint-disable no-alert */
import { loadSa11y } from './_loadSa11y';

const langCode = 'lt';

if (typeof Sa11y !== 'object') {
  loadSa11y(langCode);
} else {
  alert('Vilkite mygtuką "Sa11y" į skirtukų juostą. Tada spustelėkite žymę bet kuriame tinklalapyje.');
}
