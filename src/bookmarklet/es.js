/* eslint-disable no-alert */
import { loadSa11y } from './_loadSa11y';

const langCode = 'es';

if (typeof Sa11y !== 'object') {
  loadSa11y(langCode);
} else {
  alert('Arrastra el botón "Sa11y" a tu barra de marcadores. A continuación, haz clic en el marcador en cualquier página web.');
}
