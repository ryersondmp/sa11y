/* eslint-disable no-alert */
import { loadSa11y } from './_loadSa11y';

const langCode = 'En';

if (typeof Sa11y !== 'object') {
  loadSa11y(langCode);
} else {
  alert('Faites glisser le bouton "Sa11y" dans votre barre de favoris. Cliquez ensuite sur le signet de n\'importe quelle page Web.');
}
