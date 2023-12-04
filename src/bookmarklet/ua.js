/* eslint-disable no-alert */
import { loadSa11y } from './_loadSa11y';

const langCode = 'ua';

if (typeof Sa11y === 'object') {
  if (window.location.pathname.includes('sa11y')) {
    alert('Перетягніть кнопку «Sa11y» на панель закладок. Потім натисніть закладку на будь-якій веб-сторінці.');
  } else {
    alert('Sa11y вже завантажується на цій сторінці. Будь ласка, зачекайте або перезавантажте сторінку і спробуйте ще раз.');
  }
} else {
  loadSa11y(langCode);
}
