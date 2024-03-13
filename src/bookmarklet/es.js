import { loadSa11y } from './_loadSa11y';

const langCode = 'es';
const message = {
  close: 'Cerrar',
  heading: 'Actualización requerida',
  message: 'Por favor, actualiza el marcador Sa11y añadiendo el siguiente enlace a tu barra de marcadores.',
  features: 'Nuevas características del marcador',
  a: 'Detección automática del idioma de la página',
  aContent: 'Este marcador muestra automáticamente una versión traducida de Sa11y basada en el idioma de la página. Si el idioma no es compatible, se utilizará el inglés.',
  b: 'Advertencia de política de seguridad',
  bContent: 'Aparecerá una advertencia si el sitio web aplica políticas de seguridad que restrinjan el funcionamiento de Sa11y en sus páginas.',
};
loadSa11y(langCode, message);
