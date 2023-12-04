/* eslint-disable no-alert */
import { loadSa11y } from './_loadSa11y';

const langCode = 'cs';

if (typeof Sa11y !== 'object') {
  loadSa11y(langCode);
} else {
  alert('Přetáhněte tlačítko "Sa11y" do panelu záložek. Poté klikněte na záložku na libovolné webové stránce.');
}
