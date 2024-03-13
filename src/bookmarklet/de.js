import { loadSa11y } from './_loadSa11y';

const langCode = 'de';
const message = {
  close: 'Schließen',
  heading: 'Aktualisierung erforderlich',
  message: 'Bitte aktualisieren Sie das Sa11y-Lesezeichen, indem Sie den folgenden Link zu Ihrer Lesezeichenleiste hinzufügen.',
  features: 'Neue Lesezeichenfunktionen',
  a: 'Automatische Seitenspracherkennung',
  aContent: 'Dieses Lesezeichen zeigt automatisch eine übersetzte Version von Sa11y basierend auf der Seitensprache an. Wenn die Sprache nicht unterstützt wird, wird auf Englisch zurückgegriffen.',
  b: 'Warnung zur Sicherheitsrichtlinie',
  bContent: 'Es wird eine Warnung angezeigt, wenn die Website Sicherheitsrichtlinien durchsetzt, die die Funktionsweise von Sa11y auf ihren Seiten einschränken.',
};
loadSa11y(langCode, message);
