/* eslint-disable no-alert */
import { loadSa11y } from './_loadSa11y';

const langCode = 'cs';

if (typeof Sa11y === 'object') {
  if (window.location.pathname.includes('sa11y')) {
    alert('Přetáhněte tlačítko "Sa11y" do panelu záložek. Poté klikněte na záložku na libovolné webové stránce.');
  } else {
    alert('Sa11y je již na této stránce načten. Počkejte prosím, nebo stránku načtěte znovu a zkuste to znovu.');
  }
} else {
  loadSa11y(langCode);
}
