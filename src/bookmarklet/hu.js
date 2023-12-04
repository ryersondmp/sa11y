/* eslint-disable no-alert */
import { loadSa11y } from './_loadSa11y';

const langCode = 'hu';

if (typeof Sa11y === 'object') {
  if (window.location.pathname.includes('sa11y')) {
    alert('Húzza a "Sa11y" gombot a könyvjelzősávba. Ezután kattintson a könyvjelzőre bármelyik weboldalon.');
  } else {
    alert('Sa11y már betöltődött ezen az oldalon. Kérjük, várjon, vagy töltse be újra az oldalt, és próbálja meg újra.');
  }
} else {
  loadSa11y(langCode);
}
