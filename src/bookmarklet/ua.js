/* eslint-disable no-alert */
import { loadSa11y } from './_loadSa11y';

const langCode = 'Ua';

if (typeof Sa11y !== 'object') {
  loadSa11y(langCode);
} else {
  alert('Перетягніть кнопку «Sa11y» на панель закладок. Потім натисніть закладку на будь-якій веб-сторінці.');
}
