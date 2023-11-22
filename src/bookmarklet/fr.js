/* eslint-disable no-alert */
import { loadSa11y } from './_loadSa11y';

const langCode = 'fr';

if (typeof Sa11y === 'object') {
  if (window.location.pathname.includes('sa11y')) {
    alert('Faites glisser le bouton "Sa11y" dans votre barre de favoris. Cliquez ensuite sur le signet de n\'importe quelle page Web.');
  } else {
    alert('Sa11y est déjà chargé sur cette page. Veuillez patienter ou recharger la page et réessayer.');
  }
} else {
  loadSa11y(langCode);
}
