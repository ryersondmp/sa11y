/* eslint-disable no-alert */
import { loadSa11y } from './_loadSa11y';

const langCode = 'En';

if (typeof Sa11y !== 'object') {
  loadSa11y(langCode);
} else {
  alert('Drag the "Sa11y" button into your bookmarks bar. Then click the bookmark on any webpage.');
}
