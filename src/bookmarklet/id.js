/* eslint-disable no-alert */
import { loadSa11y } from './_loadSa11y';

const langCode = 'id';

if (typeof Sa11y === 'object') {
  if (window.location.pathname.includes('sa11y')) {
    alert('Seret tombol "Sa11y" ke bilah penanda Anda. Kemudian klik penanda di halaman web mana pun.');
  } else {
    alert('Sa11y sudah dimuat di halaman ini. Mohon tunggu, atau muat ulang halaman dan coba lagi.');
  }
} else {
  loadSa11y(langCode);
}
