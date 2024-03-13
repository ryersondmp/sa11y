import { loadSa11y } from './_loadSa11y';

const langCode = 'hu';
const message = {
  close: 'Bezárás',
  heading: 'Frissítés szükséges',
  message: 'Kérjük, frissítse a Sa11y könyvjelzőt a következő hivatkozás hozzáadásával a könyvjelző sávjához.',
  features: 'Új könyvjelző funkciók',
  a: 'Automatikus oldalnyelv felismerés',
  aContent: 'Ez a könyvjelző automatikusan megjeleníti a Sa11y lefordított verzióját az oldal nyelve alapján. Ha a nyelv nem támogatott, akkor az alapértelmezés szerint az angol lesz.',
  b: 'Biztonsági irányelvek figyelmeztetése',
  bContent: 'Figyelmeztetés jelenik meg, ha a webhely biztonsági irányelveket alkalmaz, amelyek korlátozzák a Sa11y működését az oldalain.',
};
loadSa11y(langCode, message);
