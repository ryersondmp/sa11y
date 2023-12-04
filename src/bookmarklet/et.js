/* eslint-disable no-alert */
import { loadSa11y } from './_loadSa11y';

const langCode = 'et';

if (typeof Sa11y === 'object') {
  if (window.location.pathname.includes('sa11y')) {
    alert('Lohistage nupp "Sa11y" oma järjehoidjate riba. Seejärel klõpsake järjehoidjal ükskõik millisel veebilehel.');
  } else {
    alert('Sa11y on juba sellel leheküljel laaditud. Palun oodake või laadige leht uuesti ja proovige uuesti.');
  }
} else {
  loadSa11y(langCode);
}
