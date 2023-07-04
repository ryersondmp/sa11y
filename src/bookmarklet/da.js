/* eslint-disable no-alert */
import { loadSa11y } from './_loadSa11y';

const langCode = 'da';

if (typeof Sa11y !== 'object') {
  loadSa11y(langCode);
} else {
  alert('Træk knappen "Sa11y" ind i din bogmærkelinje. Klik derefter på bogmærket på en hvilken som helst webside.');
}
