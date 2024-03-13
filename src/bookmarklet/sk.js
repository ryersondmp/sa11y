import { loadSa11y } from './_loadSa11y';

const langCode = 'sk';
const message = {
  close: 'Zatvoriť',
  heading: 'Vyžaduje sa aktualizácia',
  message: 'Prosím, aktualizujte záložku Sa11y pridaním nasledujúceho odkazu do svojho panela záložiek.',
  features: 'Nové funkcie záložky',
  a: 'Automatické zistenie jazyka stránky',
  aContent: 'Táto záložka automaticky zobrazuje preloženú verziu Sa11y na základe jazyka stránky. Ak jazyk nie je podporovaný, použije sa angličtina.',
  b: 'Upozornenie na bezpečnostnú politiku',
  bContent: 'Zobrazí sa upozornenie, ak web používa bezpečnostné politiky, ktoré obmedzujú funkcie Sa11y na svojich stránkach.',
};
loadSa11y(langCode, message);
