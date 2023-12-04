/* eslint-disable no-alert */
import { loadSa11y } from './_loadSa11y';

const langCode = 'ptPT';

if (typeof Sa11y === 'object') {
  if (window.location.pathname.includes('sa11y')) {
    alert('Arraste o botão "Sa11y" para a sua barra de favoritos. Em seguida, clique no marcador em qualquer página da Web.');
  } else {
    alert('Sa11y já foi carregado nesta página. Aguarde, ou recarregue a página e tente novamente.');
  }
} else {
  loadSa11y(langCode);
}
