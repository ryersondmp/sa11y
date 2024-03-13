import { loadSa11y } from './_loadSa11y';

const langCode = 'sv';
const message = {
  close: 'Stäng',
  heading: 'Uppdatering krävs',
  message: 'Var god uppdatera Sa11y bokmärket genom att lägga till följande länk i din bokmärkesfält.',
  features: 'Nya bokmärkesfunktioner',
  a: 'Automatisk sidans språkdetektering',
  aContent: 'Detta bokmärke visar automatiskt en översatt version av Sa11y baserat på sidans språk. Om språket inte stöds används engelska som standard.',
  b: 'Säkerhetspolicyn varning',
  bContent: 'En varning kommer att visas om webbplatsen tillämpar säkerhetspolicyn som begränsar Sa11ys funktionalitet på sina sidor.',
};
loadSa11y(langCode, message);
