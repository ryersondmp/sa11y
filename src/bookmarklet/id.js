/* eslint-disable no-alert */
import { loadSa11y } from './_loadSa11y';

const langCode = 'id';

if (typeof Sa11y !== 'object') {
  loadSa11y(langCode);
} else {
  alert('Seret tombol "Sa11y" ke bilah penanda Anda. Kemudian klik penanda di halaman web mana pun.');
}
