import { loadSa11y } from './_loadSa11y';

const langCode = 'nb';
const message = {
  close: 'Lukk',
  heading: 'Oppdatering nødvendig',
  message: 'Vennligst oppdater Sa11y bokmerket ved å legge til følgende lenke i bokmerkelinjen din.',
  features: 'Nye bokmerkefunksjoner',
  a: 'Automatisk sidespråkgjenkjenning',
  aContent: 'Dette bokmerket viser automatisk en oversatt versjon av Sa11y basert på sidespråket. Hvis språket ikke støttes, vil det falle tilbake til engelsk.',
  b: 'Advarsel om sikkerhetspolicy',
  bContent: 'Det vil vises en advarsel hvis nettstedet håndhever sikkerhetspolicyer som begrenser Sa11ys funksjonalitet på sidene sine.',
};
loadSa11y(langCode, message);
