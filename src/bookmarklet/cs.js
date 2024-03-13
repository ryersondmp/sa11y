import { loadSa11y } from './_loadSa11y';

const langCode = 'cs';
const message = {
  close: 'Zavřít',
  heading: 'Vyžadována aktualizace',
  message: 'Prosím, aktualizujte Sa11y bookmarklet přidáním následujícího odkazu do vaší lišty záložek.',
  features: 'Nové funkce bookmarkletu',
  a: 'Automatické rozpoznání jazyka stránky',
  aContent: 'Tento bookmarklet automaticky zobrazí přeloženou verzi Sa11y na základě jazyka stránky. Pokud není jazyk podporován, bude použit angličtina.',
  b: 'Varování o bezpečnostní politice',
  bContent: 'Pokud web uplatňuje bezpečnostní politiky, které omezují funkčnost Sa11y na svých stránkách, zobrazí se varování.',
};
loadSa11y(langCode, message);
