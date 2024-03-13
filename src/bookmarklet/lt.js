import { loadSa11y } from './_loadSa11y';

const langCode = 'lt';
const message = {
  close: 'Uždaryti',
  heading: 'Reikalingas atnaujinimas',
  message: 'Prašome atnaujinti Sa11y žymeklį pridedant žemiau pateiktą nuorodą į savo žymių juostą.',
  features: 'Naujos žymeklio funkcijos',
  a: 'Automatinis puslapio kalbos nustatymas',
  aContent: 'Šis žymeklis automatiškai rodo Sa11y išverstą versiją pagal puslapio kalbą. Jei kalba nepalaikoma, bus naudojama anglų kalba.',
  b: 'Saugumo politikos įspėjimas',
  bContent: 'Jei svetainė taiko saugumo politiką, kuri apriboja Sa11y veikimą jos puslapiuose, bus rodomas įspėjimas.',
};
loadSa11y(langCode, message);
