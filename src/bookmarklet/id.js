import { loadSa11y } from './_loadSa11y';

const langCode = 'id';
const message = {
  close: 'Tutup',
  heading: 'Perlu diperbarui',
  message: 'Silakan perbarui bookmarklet Sa11y dengan menambahkan tautan berikut ke bilah bookmark Anda.',
  features: 'Fitur bookmarklet baru',
  a: 'Deteksi bahasa halaman otomatis',
  aContent: 'Bookmarklet ini secara otomatis menampilkan versi terjemahan Sa11y berdasarkan bahasa halaman. Jika bahasa tidak didukung, akan beralih ke bahasa Inggris.',
  b: 'Peringatan kebijakan keamanan',
  bContent: 'Peringatan akan muncul jika situs web menerapkan kebijakan keamanan yang membatasi Sa11y untuk berfungsi di halaman-halaman tersebut.',
};
loadSa11y(langCode, message);
