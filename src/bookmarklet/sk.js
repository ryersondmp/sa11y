/* eslint-disable no-alert */
import { loadSa11y } from './_loadSa11y';

const langCode = 'sk';

if (typeof Sa11y === 'object') {
  if (window.location.pathname.includes('sa11y')) {
    alert('Potiahnite tlačidlo "Sa11y" na panel záložiek. Potom kliknite na záložku na ľubovoľnej webovej stránke.');
  } else {
    alert('Sa11y je už načítaná na tejto stránke. Počkajte, prosím, alebo načítajte stránku znova a skúste to znova.');
  }
} else {
  loadSa11y(langCode);
}
