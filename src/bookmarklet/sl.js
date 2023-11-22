/* eslint-disable no-alert */
import { loadSa11y } from './_loadSa11y';

const langCode = 'sl';

if (typeof Sa11y === 'object') {
  if (window.location.pathname.includes('sa11y')) {
    alert('Gumb "Sa11y" povlecite v vrstico zaznamkov. Nato kliknite zaznamek na kateri koli spletni strani.');
  } else {
    alert('Sa11y je že naložen na tej strani. Počakajte ali ponovno naložite stran in poskusite znova.');
  }
} else {
  loadSa11y(langCode);
}
