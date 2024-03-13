import { loadSa11y } from './_loadSa11y';

const langCode = 'lv';
const message = {
  close: 'Aizvērt',
  heading: 'Nepieciešama atjaunināšana',
  message: 'Lūdzu, atjauniniet Sa11y grāmatzīmi, pievienojot zemāk norādīto saiti savam grāmatzīmju joslam.',
  features: 'Jaunās grāmatzīmes funkcijas',
  a: 'Automātiska lapas valodas noteikšana',
  aContent: 'Šī grāmatzīme automātiski parāda Sa11y tulkojumu atkarībā no lapas valodas. Ja valoda nav atbalstīta, tiks izmantota angļu valoda.',
  b: 'Sistēmas drošības politikas brīdinājums',
  bContent: 'Parādīsies brīdinājums, ja tīmekļa vietne piemēro sistēmas drošības politikas, kas ierobežo Sa11y darbību uz saviem lapām.',
};
loadSa11y(langCode, message);
