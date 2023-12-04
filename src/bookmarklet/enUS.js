/* eslint-disable no-alert */
import { loadSa11y } from './_loadSa11y';

const langCode = 'enUS';

if (typeof Sa11y === 'object') {
  if (window.location.pathname.includes('sa11y')) {
    alert('Drag the "Sa11y" button into your bookmarks bar. Then click the bookmark on any webpage.');
  } else {
    alert('Sa11y is already loaded on this page. Please wait, or reload the page and try again.');
  }
} else {
  loadSa11y(langCode);
}
