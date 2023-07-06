/* eslint-disable no-alert */
import { loadSa11y } from './_loadSa11y';

const langCode = 'et';

if (typeof Sa11y !== 'object') {
  loadSa11y(langCode);
} else {
  alert('Lohistage nupp "Sa11y" oma järjehoidjate riba. Seejärel klõpsake järjehoidjal ükskõik millisel veebilehel.');
}
