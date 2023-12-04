/* eslint-disable no-alert */
import { loadSa11y } from './_loadSa11y';

const langCode = 'ptBR';

if (typeof Sa11y !== 'object') {
  loadSa11y(langCode);
} else {
  alert('Arraste o botão "Sa11y" para sua barra de favoritos. Em seguida, clique no marcador em qualquer página da Web.');
}
