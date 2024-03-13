import { loadSa11y } from './_loadSa11y';

const langCode = 'pl';
const message = {
  close: 'Zamknij',
  heading: 'Wymagana aktualizacja',
  message: 'Proszę zaktualizować zakładkę Sa11y, dodając poniższy link do paska zakładek.',
  features: 'Nowe funkcje zakładki',
  a: 'Automatyczne wykrywanie języka strony',
  aContent: 'Ta zakładka automatycznie wyświetla przetłumaczoną wersję Sa11y w oparciu o język strony. Jeśli język nie jest obsługiwany, zostanie użyty angielski.',
  b: 'Ostrzeżenie o polityce bezpieczeństwa',
  bContent: 'Pojawi się ostrzeżenie, jeśli witryna stosuje politykę bezpieczeństwa ograniczającą działanie Sa11y na swoich stronach.',
};
loadSa11y(langCode, message);
