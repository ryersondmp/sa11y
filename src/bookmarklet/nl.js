/* eslint-disable no-alert */
import { loadSa11y } from './_loadSa11y';

const langCode = 'nl';

if (typeof Sa11y === 'object') {
  if (window.location.pathname.includes('sa11y')) {
    alert('Sleep de knop "Sa11y" naar je bladwijzerbalk. Klik vervolgens op de bladwijzer op een willekeurige webpagina.');
  } else {
    alert('Sa11y is al geladen op deze pagina. Wacht even of herlaad de pagina en probeer het opnieuw.');
  }
} else {
  loadSa11y(langCode);
}
