import { loadSa11y } from './_loadSa11y';

const langCode = 'da';
const message = {
  close: 'Luk',
  heading: 'Opdatering påkrævet',
  message: 'Venligst opdater Sa11y bogmærket ved at tilføje følgende link til din bogmærkelinje.',
  features: 'Nye bogmærkefunktioner',
  a: 'Automatisk sidesproggenkendelse',
  aContent: 'Dette bogmærke viser automatisk en oversat version af Sa11y baseret på sidesproget. Hvis sproget ikke understøttes, vil det standardisere til engelsk.',
  b: 'Advarsel om sikkerhedspolitik',
  bContent: 'En advarsel vises, hvis hjemmesiden håndhæver sikkerhedspolitikker, der begrænser Sa11ys funktionalitet på dens sider.',
};
loadSa11y(langCode, message);
