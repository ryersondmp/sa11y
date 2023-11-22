/* eslint-disable no-alert */
import { loadSa11y } from './_loadSa11y';

const langCode = 'bg';

if (typeof Sa11y === 'object') {
  if (window.location.pathname.includes('sa11y')) {
    alert('Плъзнете бутона "Sa11y" в лентата с отметки. След това щракнете върху отметките на всяка уебстраница.');
  } else {
    alert('Sa11y вече е зареден на тази страница. Моля, изчакайте или презаредете страницата и опитайте отново.');
  }
} else {
  loadSa11y(langCode);
}
