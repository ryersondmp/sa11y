/* eslint-disable no-alert */
import { loadSa11y } from './_loadSa11y';

const langCode = 'da';

if (typeof Sa11y === 'object') {
  if (window.location.pathname.includes('sa11y')) {
    alert('Træk knappen "Sa11y" ind i din bogmærkelinje. Klik derefter på bogmærket på en hvilken som helst webside.');
  } else {
    alert('Sa11y er allerede indlæst på denne side. Vent venligst, eller genindlæs siden og prøv igen.');
  }
} else {
  loadSa11y(langCode);
}
