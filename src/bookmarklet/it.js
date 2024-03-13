import { loadSa11y } from './_loadSa11y';

const langCode = 'it';
const message = {
  close: 'Chiudi',
  heading: 'Aggiornamento richiesto',
  message: 'Si prega di aggiornare il bookmarklet di Sa11y aggiungendo il seguente link alla barra dei segnalibri.',
  features: 'Nuove funzionalità del bookmarklet',
  a: 'Rilevamento automatico della lingua della pagina',
  aContent: 'Questo bookmarklet mostra automaticamente una versione tradotta di Sa11y basata sulla lingua della pagina. Se la lingua non è supportata, verrà utilizzata l\'inglese.',
  b: 'Avviso sulla politica di sicurezza',
  bContent: 'Verrà visualizzato un avviso se il sito web applica politiche di sicurezza che limitano il funzionamento di Sa11y sulle sue pagine.',
};
loadSa11y(langCode, message);
