import { loadSa11y } from './_loadSa11y';

const langCode = 'sl';
const message = {
  close: 'Zapri',
  heading: 'Posodobitev potrebna',
  message: 'Prosimo, posodobite zaznamek Sa11y z dodajanjem naslednje povezave v vašo vrstico zaznamkov.',
  features: 'Nove funkcije zaznamka',
  a: 'Samodejno zaznavanje jezika strani',
  aContent: 'Ta zaznamek samodejno prikaže prevedeno različico Sa11y na podlagi jezika strani. Če je jezik nepodprt, bo uporabljen angleški jezik.',
  b: 'Opozorilo o varnostni politiki',
  bContent: 'Pojavi se opozorilo, če spletno mesto uporablja varnostne politike, ki omejujejo delovanje Sa11y na svojih straneh.',
};
loadSa11y(langCode, message);
