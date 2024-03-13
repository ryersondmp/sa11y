import { loadSa11y } from './_loadSa11y';

const langCode = 'fr';
const message = {
  close: 'Fermer',
  heading: 'Mise à jour requise',
  message: 'Veuillez mettre à jour le marque-page Sa11y en ajoutant le lien suivant à votre barre de favoris.',
  features: 'Nouvelles fonctionnalités du marque-page',
  a: 'Détection automatique de la langue de la page',
  aContent: 'Ce marque-page affiche automatiquement une version traduite de Sa11y basée sur la langue de la page. Si la langue n\'est pas prise en charge, elle sera affichée en anglais.',
  b: 'Avertissement de politique de sécurité',
  bContent: 'Un avertissement apparaîtra si le site applique des politiques de sécurité qui restreignent le fonctionnement de Sa11y sur ses pages.',
};
loadSa11y(langCode, message);
