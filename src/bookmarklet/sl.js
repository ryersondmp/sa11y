/* eslint-disable no-alert */
import { loadSa11y } from './_loadSa11y';

const langCode = 'sl';

if (typeof Sa11y !== 'object') {
  loadSa11y(langCode);
} else {
  alert('Gumb "Sa11y" povlecite v vrstico zaznamkov. Nato kliknite zaznamek na kateri koli spletni strani.');
}
