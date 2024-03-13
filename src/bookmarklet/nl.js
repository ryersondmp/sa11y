import { loadSa11y } from './_loadSa11y';

const langCode = 'nl';
const message = {
  close: 'Sluiten',
  heading: 'Update vereist',
  message: 'Gelieve het Sa11y-bladwijzer te updaten door de volgende link toe te voegen aan uw bladwijzerbalk.',
  features: 'Nieuwe bladwijzerfuncties',
  a: 'Automatische paginataal detectie',
  aContent: 'Deze bladwijzer toont automatisch een vertaalde versie van Sa11y op basis van de paginataal. Als de taal niet wordt ondersteund, wordt teruggevallen op Engels.',
  b: 'Waarschuwing voor beveiligingsbeleid',
  bContent: 'Er zal een waarschuwing verschijnen als de website beveiligingsbeleid afdwingt dat Sa11y beperkt in zijn werking op de pagina\'s.',
};
loadSa11y(langCode, message);
