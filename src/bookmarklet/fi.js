import { loadSa11y } from './_loadSa11y';

const langCode = 'fi';
const message = {
  close: 'Sulje',
  heading: 'Päivitys vaadittu',
  message: 'Päivitä Sa11y kirjanmerkkityökalu lisäämällä seuraava linkki kirjanmerkkiriviisi.',
  features: 'Uudet kirjanmerkkityökalun ominaisuudet',
  a: 'Sivukielen automaattinen tunnistus',
  aContent: 'Tämä kirjanmerkkityökalu näyttää automaattisesti käännetyn version Sa11y:stä sivun kieleen perustuen. Jos kieltä ei tueta, käytetään englantia.',
  b: 'Turvapoliittinen varoitus',
  bContent: 'Varoitus ilmestyy, jos verkkosivusto soveltaa turvapoliittisia rajoituksia, jotka estävät Sa11yn toimimisen sen sivuilla.',
};
loadSa11y(langCode, message);
