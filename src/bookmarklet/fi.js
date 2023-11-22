/* eslint-disable no-alert */
import { loadSa11y } from './_loadSa11y';

const langCode = 'fi';

if (typeof Sa11y === 'object') {
  if (window.location.pathname.includes('sa11y')) {
    alert('Lohistage nupp "Sa11y" oma järjehoidjate riba. Seejärel klõpsake järjehoidjal ükskõik millisel veebilehel.');
  } else {
    alert('Sa11y on jo ladattu tälle sivulle. Odota, tai lataa sivu uudelleen ja yritä uudelleen.');
  }
} else {
  loadSa11y(langCode);
}
