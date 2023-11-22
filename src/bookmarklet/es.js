/* eslint-disable no-alert */
import { loadSa11y } from './_loadSa11y';

const langCode = 'es';

if (typeof Sa11y === 'object') {
  if (window.location.pathname.includes('sa11y')) {
    alert('Arrastra el botón "Sa11y" a tu barra de marcadores. A continuación, haz clic en el marcador en cualquier página web.');
  } else {
    alert('Sa11y ya está cargado en esta página. Espere o vuelva a cargar la página e inténtelo de nuevo.');
  }
} else {
  loadSa11y(langCode);
}
