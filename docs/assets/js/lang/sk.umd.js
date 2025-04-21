
/*!
  * Sa11y, the accessibility quality assurance assistant.
  * @version 4.1.9
  * @author Adam Chaboryk
  * @license GPL-2.0-or-later
  * @copyright © 2020 - 2025 Toronto Metropolitan University.
  * @contact adam.chaboryk@torontomu.ca
  * GitHub: git+https://github.com/ryersondmp/sa11y.git | Website: https://sa11y.netlify.app
  * For all acknowledgements, please visit: https://sa11y.netlify.app/acknowledgements/
  * The above copyright notice shall be included in all copies or substantial portions of the Software.
**/
(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
  typeof define === 'function' && define.amd ? define(factory) :
  (global = typeof globalThis !== 'undefined' ? globalThis : global || self, global.Sa11yLangSk = factory());
})(this, (function () { 'use strict';

  /*! WARNING: This is a machine-generated translation and may contain errors or inaccuracies. */
  var sk = {
    // Slovak
    strings: {
      LANG_CODE: 'sk',
      MAIN_TOGGLE_LABEL: 'Kontrola dostupnosti',
      CONTAINER_LABEL: 'Kontrola prístupnosti',
      ERROR: 'Chyba',
      ERRORS: 'Chyby',
      WARNING: 'Upozornenie',
      WARNINGS: 'Upozornenia',
      GOOD: 'Dobrý',
      ON: 'Na stránke',
      OFF: 'Vypnuté',
      ALERT_TEXT: 'Upozornenie',
      ALERT_CLOSE: 'Zatvoriť',
      OUTLINE: 'Osnova',
      READABILITY_DESC: 'Zobrazuje skóre čitateľnosti na karte <strong>Osnova</strong>, ktoré pomáha posúdiť náročnosť čítania.',
      TITLE: 'Titul',
      ALT: 'ALT',
      IMAGES: 'Obrázky',
      EDIT: 'Upraviť',
      NO_IMAGES: 'Žiadne obrázky nenájdené.',
      DECORATIVE: 'Dekoratívny',
      MISSING: 'Chýbajúci',
      PAGE_ISSUES: 'Problémy so stránkami',
      SETTINGS: 'Nastavenia',
      DEVELOPER_CHECKS: 'Kontroly vývojáře',
      DEVELOPER_DESC: 'Kontroluje problémy, ktorých oprava môže vyžadovať znalosti kódovania, ako sú HTML atribúty, formuláre a ďalšie.',
      DARK_MODE: 'Tmavý režim',
      SHORTCUT_SR: 'Prejsť na vydanie. Klávesová skratka: Alt S',
      SKIP_TO_ISSUE: 'Prejsť na vydanie',
      NEW_TAB: 'Otvorí sa nová karta',
      LINKED: 'Prepojené',
      PANEL_HEADING: 'Kontrola prístupnosti',
      NO_ERRORS_FOUND: 'Nenašli sa žiadne chyby.',
      WARNINGS_FOUND: 'nájdené varovania.',
      TOTAL_FOUND: 'celkový počet nájdených problémov.',
      NOT_VISIBLE: 'Položka, ktorú sa snažíte zobraziť, nie je viditeľná; môže byť skrytá alebo sa nachádza v komponente akordeónu alebo karty. Tu je náhľad:',
      MISSING_ROOT: 'Celá stránka bola skontrolovaná z hľadiska prístupnosti, pretože cieľová oblasť <code>%(root)</code> neexistuje.',
      MISSING_READABILITY_ROOT: 'Skóre čitateľnosti je založené na obsahovej oblasti <code>%(fallback)</code>, pretože cieľová oblasť <code>%(root)</code> neexistuje.',
      HEADING_NOT_VISIBLE: 'Záhlavie nie je viditeľné; môže byť skryté alebo sa nachádzať v komponente akordeónu alebo karty.',
      SKIP_TO_PAGE_ISSUES: 'Prejsť na stránku Problémy',
      CONSOLE_ERROR: 'Je nám ľúto, ale na tejto stránke je problém s kontrolou prístupnosti. Môžete to prosím <a href="%(link)">nahlásiť prostredníctvom tohto formulára</a> alebo na <a href="%(link)">GitHub</a>?',
      APPEARANCE: 'Vzhľad',
      MOVE_PANEL: 'Presunúť panel',

      // Dismiss
      PANEL_DISMISS_BUTTON: 'Zobraziť %(dismissCount) zamietnuté',
      DISMISS: 'Zamietnuť',
      DISMISS_ALL: 'Zamietnuť všetko',
      DISMISSED: 'Zamietnuté',
      DISMISS_REMINDER: 'Vezmite prosím na vedomie, že upozornenia sú iba <strong>dočasne</strong> zamietnuté. Vymazanie histórie prehliadača a súborov cookie obnoví všetky predtým zamietnuté upozornenia na všetkých stránkach.',

      // Export
      DATE: 'Dátum',
      PAGE_TITLE: 'Názov stránky',
      RESULTS: 'Výsledky',
      EXPORT_RESULTS: 'Exportovať výsledky',
      GENERATED: 'Výsledky vygenerované s %(tool).',
      PREVIEW: 'Náhľad',
      ELEMENT: 'Prvok',
      PATH: 'Cesta',

      // Colour filters
      COLOUR_FILTER: 'Farebný filter',
      PROTANOPIA: 'Protanopia',
      DEUTERANOPIA: 'Deuteranopia',
      TRITANOPIA: 'Tritanopia',
      MONOCHROMACY: 'Monochromatickosť',
      COLOUR_FILTER_MESSAGE: 'Skontrolujte, či nie sú prítomné prvky, ktoré je ťažké vnímať alebo rozlíšiť na pozadí iných farieb.',
      RED_EYE: 'Červená slepá.',
      GREEN_EYE: 'Zelená roleta.',
      BLUE_EYE: 'Modrá roleta.',
      MONO_EYE: 'Červená, modrá a zelená farba pre nevidiacich.',
      COLOUR_FILTER_HIGH_CONTRAST: 'Farebné filtre nefungujú v režime vysokého kontrastu.',

      // Alternative text stop words
      SUS_ALT_STOPWORDS: [
        'obrázok',
        'grafika',
        'obrázok',
        'foto',
      ],
      PLACEHOLDER_ALT_STOPWORDS: [
        'alt',
        'obrázok',
        'foto',
        'dekoratívne',
        'zástupný symbol',
        'zástupný obrázok',
        'dištančný rámik',
      ],
      PARTIAL_ALT_STOPWORDS: [
        'kliknite na',
        'kliknite sem',
        'kliknite sem pre viac informácií',
        'kliknite sem a dozviete sa viac',
        'kliknutím sem',
        'pozrite si',
        'podrobne tu',
        'stiahnuť',
        'stiahnuť tu',
        'zistiť',
        'dozvedieť sa viac',
        'formulár',
        'tu',
        'informácie',
        'informácie',
        'odkaz',
        'naučiť sa',
        'dozvedieť sa viac',
        'naučiť sa',
        'viac',
        'stránka',
        'papier',
        'čítaj viac',
        'prečítajte si',
        'prečítajte si toto',
        'tento',
        'táto stránka',
        'táto webová stránka',
        'zobraziť',
        'pozrite si náš',
        'webová stránka',
      ],
      CLICK: ['click', 'kliknutie'],
      NEW_WINDOW_PHRASES: [
        'externé',
        'nová karta',
        'nové okno',
        'pop-up',
        'vyskakovať',
      ],
      FILE_TYPE_PHRASES: [
        'dokument',
        'tabuľka',
        'výpočtový hárok',
        'komprimovaný súbor',
        'archivovaný súbor',
        'pracovný list',
        'PowerPoint',
        'prezentácia',
        'nainštalovať',
        'video',
        'audio',
        'pdf',
      ],

      // Readability
      READABILITY: 'Čitateľnosť',
      AVG_SENTENCE: 'Priemerný počet slov na vetu:',
      COMPLEX_WORDS: 'Zložené slová:',
      TOTAL_WORDS: 'Slová:',
      VERY_DIFFICULT: 'Veľmi ťažké',
      DIFFICULT: 'Ťažké',
      FAIRLY_DIFFICULT: 'Pomerne ťažké',
      READABILITY_NO_CONTENT: 'Nie je možné vypočítať skóre čitateľnosti. Nenašiel sa žiadny odsek <code>&lt;p&gt;</code> ani obsah zoznamu <code>&lt;li&gt;</code>.',
      READABILITY_NOT_ENOUGH: 'Nedostatok obsahu na výpočet skóre čitateľnosti.',

      // Heading
      HEADING_SKIPPED_LEVEL: 'Nadpisy by nemali preskakovať úrovne alebo preskočiť z <strong>Nadpisu %(PREV_LEVEL)</strong> na <strong {C}>Nadpis %(LEVEL)</strong>, pretože to narúša poriadok a hierarchiu obsahu, čo sťažuje jeho sledovanie. <hr> Ak <strong {C}>%(HEADING)</strong> patrí pod sekciu <strong>%(PREV_HEADING)</strong>, zvážte jeho formátovanie ako <strong>Nadpis %(LEVEL)</strong> namiesto toho.',
      HEADING_EMPTY: 'Nájdená prázdna položka! Ak to chcete opraviť, odstráňte tento riadok alebo zmeňte jeho formát z <strong {C}>Head %(level)</strong> na <strong>Normal</strong> alebo <strong>Paragraph</strong>.',
      HEADING_LONG: 'Smerovanie je dlhé! Nadpisy by sa mali používať na usporiadanie obsahu a vyjadrenie štruktúry. Mali by byť stručné, informatívne a jedinečné. Prosím, aby nadpisy mali menej ako %(MAX_LENGTH) znakov (nie viac ako jednu vetu). <hr> <strong {B}>%(HEADING_LENGTH) Znakov</strong>',
      HEADING_FIRST: 'Prvý nadpis na stránke by mal byť zvyčajne nadpis 1 alebo 2. Nadpis 1 by mal byť začiatkom hlavnej časti obsahu a je to hlavný nadpis, ktorý opisuje celkový účel stránky. Viac informácií o <a href="https://www.w3.org/WAI/tutorials/page-structure/headings/">štruktúre nadpisov.</a>',
      HEADING_MISSING_ONE: 'Chýba nadpis 1. Nadpis 1 by mal byť začiatkom hlavnej oblasti obsahu a je to hlavný nadpis, ktorý opisuje celkový účel stránky. Viac informácií o <a href="https://www.w3.org/WAI/tutorials/page-structure/headings/">štruktúre nadpisov.</a>',
      HEADING_EMPTY_WITH_IMAGE: 'Nadpis neobsahuje žiadny text, ale obsahuje obrázok. Ak to nie je nadpis, zmeňte jeho formát z <strong {C}>Nadpis %(level)</strong> na <strong>Normálny</strong> alebo <strong>Odsek</strong>. V opačnom prípade pridajte k obrázku alt text, ak nie je dekoratívny.',
      PANEL_HEADING_MISSING_ONE: 'Chýba položka 1!',
      PANEL_NO_HEADINGS: 'Nenašli sa žiadne záhlavia.',

      // Links
      LINK_EMPTY: 'Odstránenie prázdnych odkazov bez textu.',
      LINK_EMPTY_LABELLEDBY: 'Odkaz má hodnotu <code>aria-labelledby</code>, ktorá je prázdna alebo nezodpovedá hodnote atribútu <code>id</code> iného prvku na stránke.',
      LINK_EMPTY_NO_LABEL: 'Odkaz nemá rozoznateľný text, ktorý je viditeľný pre čítačky obrazovky a iné asistenčné technológie. Oprava: <ul><li>Pridajte stručný text, ktorý popisuje, kam vás odkaz zavedie.</li><li>Ak ide o <a href="https://a11y-101.com/development/icons-and-links">odkaz na ikonu alebo SVG,</a> pravdepodobne chýba popisný štítok.</li><li>Ak si myslíte, že tento odkaz je chybou spôsobenou chybou kopírovania/vkladania, zvážte jeho odstránenie.</li></ul>',
      LINK_STOPWORD: 'Text odkazu nemusí byť dostatočne popisný mimo kontextu: <strong {C}>%(ERROR)</strong>',
      LINK_STOPWORD_ARIA: 'Aj keď bolo poskytnuté prístupné meno, zvážte revíziu viditeľného textu odkazu. Výrazy ako &quot;<strong {C}>%(ERROR)</strong>&quot; nemajú zmysel.',
      LINK_TIP: '<hr> <strong>Tip!</strong> Používajte jasný a jedinečný text odkazu, ktorý opisuje cieľ odkazu, zvyčajne názov stránky alebo dokumentu.',
      LINK_CLICK_HERE: 'Výraz "kliknite" alebo "kliknite sem" kladie dôraz na mechaniku myši, hoci mnoho ľudí nepoužíva myš alebo si môže tento web prezerať na mobilnom zariadení. Zvážte použitie iného slovesa, ktoré súvisí s úlohou.',
      DUPLICATE_TITLE: 'Atribút <code>title</code> na odkazoch a obrázkoch je určený na poskytovanie ďalších informácií a mal by byť <strong>odlišný</strong> od textu alebo alternatívneho textu. Text titulu sa zobrazí, keď sa nad elementom podrží myš, ale nie je prístupný klávesnicou alebo dotykovým vstupom. Zvážte <a href="https://www.a11yproject.com/posts/title-attributes/">úplné vyhnutie sa atribútu title.</a>',
      LINK_SYMBOLS: 'Vyhnite sa používaniu symbolov ako výzvy na akciu v texte odkazu, pokiaľ nie sú skryté pred asistívnymi technológiami. Čítačky obrazovky môžu symboly nahlas prečítať, čo môže byť mätúce. Zvážte ich odstránenie: <strong {C}>%(ERROR)</strong>',
      LINK_URL: 'Dlhšie a menej zrozumiteľné adresy URL použité ako text odkazu by mohli byť ťažko zrozumiteľné pre asistenčné technológie. Vo väčšine prípadov je lepšie namiesto adresy URL použiť text čitateľný pre človeka. Krátke adresy URL (napríklad domovská stránka webu) sú v poriadku.',
      LINK_DOI: 'V prípade webových stránok alebo len online zdrojov odporúča <a href="https://apastyle.apa.org/style-grammar-guidelines/paper-format/accessibility/urls#:~:text=descriptive%20links">príručka štýlu APA</a> používať popisné odkazy tak, že okolo názvu diela uvediete jeho URL alebo DOI. Dlhšie, menej zrozumiteľné adresy URL použité ako text odkazu by mohli byť ťažko zrozumiteľné pomocou asistenčných technológií.',
      LINK_NEW_TAB: 'Odkaz sa otvorí v novej karte alebo okne bez upozornenia. Môže to byť dezorientujúce, najmä pre ľudí, ktorí majú problémy s vnímaním vizuálneho obsahu. Po druhé, nie vždy je dobrým postupom kontrolovať niečí zážitok alebo robiť rozhodnutia za neho. Uveďte, že sa odkaz otvára v novom okne, v texte odkazu. <hr> <strong>Tip!</strong> Naučte sa osvedčené postupy: <a href="https://www.nngroup.com/articles/new-browser-windows-and-tabs/">otváranie odkazov v nových oknách a kartách prehliadača.</a>',
      LINK_FILE_EXT: 'Odkaz odkazuje na súbor PDF alebo súbor na stiahnutie (napr. MP3, Zip, Word Doc) bez upozornenia. Typ súboru uveďte v texte odkazu. Ak ide o veľký súbor, zvážte uvedenie jeho veľkosti. <hr> <strong>Príklad:</strong> Výkonná správa (PDF, 3 MB)',
      LINK_IDENTICAL_NAME: 'Odkaz má rovnaký text ako iný odkaz, hoci odkazuje na inú stránku. Viacero odkazov s rovnakým textom môže spôsobiť zmätok u ľudí, ktorí používajú čítačky obrazovky. <strong>Premyslite si, či by nasledujúci odkaz nemal byť viac popisný, aby ste ho odlíšili od ostatných odkazov.</strong> <hr> <strong {B}>Prístupné meno</strong> <strong {C}>%(TEXT)</strong>',

      // Images
      MISSING_ALT_LINK_HAS_TEXT: 'Obrázok sa používa ako odkaz s okolitým textom, hoci atribút alt by mal byť označený ako dekoratívny alebo nulový.',
      MISSING_ALT_LINK: 'Obrázok sa používa ako odkaz, ale chýba text alt! Uistite sa, že text alt opisuje, kam vás odkaz zavedie.',
      MISSING_ALT: 'Chýbajúci text alt! Ak obrázok vyjadruje príbeh, náladu alebo dôležitú informáciu, nezabudnite ho opísať.',
      LINK_ALT_FILE_EXT: 'Alternatívny text by nemal obsahovať prípony súborov alebo rozmery obrázkov. Uistite sa, že text alt opisuje cieľ odkazu, nie doslovný opis obrázka. Odstráňte: <strong {C}>%(ERROR)</strong> <hr> {ALT} {L} <strong {C}>%(ALT_TEXT)</strong>',
      LINK_PLACEHOLDER_ALT: 'Nájdený text alt bez popisu alebo zástupný text v rámci prepojeného obrázka. Uistite sa, že text alt opisuje cieľ odkazu, nie doslovný opis obrázka. Nahraďte nasledujúci text alt. <hr> {ALT} {L} <strong {C}>%(ALT_TEXT)</strong>',
      LINK_SUS_ALT: 'Asistenčné technológie už indikujú, že ide o obrázok, takže &quot;<strong {C}>%(ERROR)</strong>&quot; môže byť zbytočné. Uistite sa, že alt text opisuje cieľ odkazu, nie doslovný opis obrázka. <hr> {ALT} {L} <strong {C}>%(ALT_TEXT)</strong>',
      ALT_FILE_EXT: 'Alternatívny text by nemal obsahovať prípony súborov alebo rozmery obrázkov. Ak obrázok vyjadruje príbeh, náladu alebo dôležitú informáciu, nezabudnite ho opísať. Odstráňte: <strong {C}>%(ERROR)</strong> <hr> {ALT} <strong {C}>%(ALT_TEXT)</strong>',
      ALT_PLACEHOLDER: 'Nájdený text alt bez popisu alebo zástupného textu. Nahraďte nasledujúci alt text niečím zmysluplnejším. <hr> {ALT} <strong {C}>%(ALT_TEXT)</strong>',
      SUS_ALT: 'Asistenčné technológie už indikujú, že ide o obrázok, takže &quot;<strong {C}>%(ERROR)</strong>&quot; môže byť zbytočné. <hr> {ALT} <strong {C}>%(ALT_TEXT)</strong>',
      LINK_IMAGE_NO_ALT_TEXT: 'Obrázok v rámci odkazu je označený ako dekoratívny a nie je v ňom žiadny text odkazu. K obrázku pridajte text alt, ktorý opisuje cieľ odkazu.',
      LINK_IMAGE_TEXT: 'Obrázok je označený ako dekoratívny, hoci odkaz používa okolitý text ako popisné označenie.',
      LINK_IMAGE_LONG_ALT: 'Popis Alt textu na prepojenom obrázku je <strong>predlžený</strong>. Text alt na prepojených obrázkoch by mal popisovať, kam vás odkaz zavedie, nie doslovný opis obrázka. <strong>Zvážte použitie názvu stránky, na ktorú odkazuje, ako alt textu.</strong> <hr> {ALT} {L} <strong {B}>%(altLength) Znakov</strong> <strong {C}>%(ALT_TEXT)</strong>',
      LINK_IMAGE_ALT: 'Odkaz na obrázok obsahuje text alt. Opisuje text alt, kam vás odkaz zavedie? <strong>Zvážte použitie názvu stránky, na ktorú odkazuje, ako alt textu.</strong> <hr> {ALT} {L} <strong {C}>%(ALT_TEXT)</strong>',
      LINK_IMAGE_ALT_AND_TEXT: 'Odkaz na obrázok obsahuje <strong>obidva texty alt a okolitý text odkazu.</strong> Ak je tento obrázok dekoratívny a používa sa ako funkčný odkaz na inú stránku, zvážte označenie obrázka ako dekoratívneho alebo nulového - okolitý text odkazu by mal stačiť. <hr> {ALT} <strong {C}>%(ALT_TEXT)</strong> <hr> <strong {B}>Prístupné meno</strong> {L} <strong {C}>%(TEXT)</strong>',
      IMAGE_FIGURE_DECORATIVE: 'Obrázok je označený ako <strong>dekoratívny</strong> a asistenčné technológie ho budú ignorovať. <hr> Hoci bol uvedený <strong>nadpis</strong>, obrázok by mal mať vo väčšine prípadov aj alt text. <ul><li>Titul alt by mal poskytovať stručný opis toho, čo je na obrázku.</li><li>Titul by mal zvyčajne poskytovať kontext, aby sa obrázok prepojil s okolitým obsahom, alebo upozorniť na konkrétnu informáciu.</li></ul> Zistite viac: <a href="https://thoughtbot.com/blog/alt-vs-figcaption#the-figcaption-element">alt versus figcaption.</a>',
      IMAGE_FIGURE_DUPLICATE_ALT: 'Nepoužívajte presne tie isté slová pre text alt aj nadpis. Čítačky obrazovky budú informáciu oznamovať dvakrát. <ul><li>Textu alt by mal poskytovať stručný opis toho, čo je na obrázku.</li><li>Titul by mal zvyčajne poskytovať kontext, aby súvisel s okolitým obsahom, alebo upozorniť na konkrétnu informáciu.</li></ul> Ďalšie informácie: <a href="https://thoughtbot.com/blog/alt-vs-figcaption#the-figcaption-element">alt verzus titulok obrázku.</a> <hr> {ALT} <strong {C}>%(ALT_TEXT)</strong>',
      IMAGE_DECORATIVE: 'Obrázok je označený ako <strong>dekoratívny</strong> a asistenčné technológie ho budú ignorovať. Ak obrázok sprostredkúva príbeh, náladu alebo dôležité informácie - nezabudnite pridať alt text.',
      IMAGE_DECORATIVE_CAROUSEL: 'Obrázok je označený ako dekoratívny, ale všetky obrázky v kolotoči alebo galérii by mali obsahovať popisný alternatívny text, aby sa zabezpečil rovnocenný zážitok pre každého.',
      IMAGE_ALT_TOO_LONG: 'Alt text popisu je <strong>príliš dlhý</strong>. Alt text by mal byť stručný, ale výstižný ako <em>tweet</em> (približne 100 znakov). Ak ide o zložitý obrázok alebo graf, zvážte umiestnenie dlhého popisu obrázka do textu pod ním alebo do akordeónového komponentu. <hr> {ALT} <strong {B}>%(altLength) Znakov</strong> <strong {C}>%(ALT_TEXT)</strong>',
      IMAGE_PASS: '{ALT} %(ALT_TEXT)',

      // Form labels
      LABELS_MISSING_IMAGE_INPUT: 'V tlačidle obrázka chýba text alt. Pridajte text alt a uveďte prístupný názov. Napríklad: <em>Vyhľadať</em> alebo <em>Odoslať</em>.',
      LABELS_INPUT_RESET: 'Tlačidlá resetovania by sa nemali používať, ak to nie je výslovne potrebné, pretože sa ľahko aktivujú omylom. <hr> <strong>Tip!</strong> Prečítajte si, prečo <a href="https://www.nngroup.com/articles/reset-and-cancel-buttons/">tlačidlá Reset a Cancel predstavujú problémy s použiteľnosťou.</a>',
      LABELS_ARIA_LABEL_INPUT: 'Vstup má prístupný názov, ale dbajte na to, aby bol viditeľný aj štítok. <hr> <strong {B}>Prístupné meno</strong> <strong {C}>%(TEXT)</strong>',
      LABELS_NO_FOR_ATTRIBUTE: 'K tomuto vstupu nie je priradený žiadny štítok. Pridajte atribút <code>for</code> k štítku, ktorý sa zhoduje s <code>id</code> tohto vstupu. <hr> <strong {B}>ID</strong> <strong {C}>#%(id)</strong>',
      LABELS_MISSING_LABEL: 'K tomuto vstupu nie je priradený žiadny štítok. Prosím, pridajte <code>id</code> k tomuto vstupu a pridajte zodpovedajúci atribút <code>for</code> k štítku.',
      LABELS_PLACEHOLDER: 'Zmiznutie textu zástupcu sťažuje ľuďom pamätať si, aké informácie patrí do poľa, a sťažuje identifikáciu a opravu chýb. Namiesto toho zvážte použitie trvalo viditeľnej nápovedy pred formulárovým poľom. <hr> Viac informácií: <a href="https://www.nngroup.com/articles/form-design-placeholders/">Zástupcovia v poľách formulára sú škodliví.</a>',

      // Embedded content
      EMBED_VIDEO: 'Uistite sa, že <strong>všetky videá majú skryté titulky.</strong> Poskytovanie titulkov pre všetok zvukový a obrazový obsah je povinnou požiadavkou úrovne A. Titulky podporujú osoby s poruchou sluchu alebo nepočujúce osoby.',
      EMBED_AUDIO: 'Zabezpečte <strong>prepis všetkých podcastov.</strong> Poskytovanie prepisov zvukového obsahu je povinnou požiadavkou úrovne A. Prepisy podporujú ľudí s poruchou sluchu alebo nepočujúcich, ale môžu byť prínosom pre všetkých. Zvážte umiestnenie prepisu pod alebo v rámci akordeónového panelu.',
      EMBED_DATA_VIZ: 'Takéto widgety na vizualizáciu údajov sú často problematické pre ľudí, ktorí na navigáciu používajú klávesnicu alebo čítačku obrazovky, a môžu predstavovať značné ťažkosti pre ľudí so slabým zrakom alebo farbosleposťou. Odporúča sa poskytnúť rovnaké informácie v alternatívnom (textovom alebo tabuľkovom) formáte pod widgetom. <hr> Ďalšie informácie o <a href="https://www.w3.org/WAI/tutorials/images/complex">komplexných obrázkoch.</a>',
      EMBED_MISSING_TITLE: 'Vložený obsah vyžaduje prístupný názov, ktorý opisuje jeho obsah. Uveďte jedinečný atribút <code>title</code> alebo <code>aria-label</code> na prvku <code>iframe</code>. Ďalšie informácie o <a href="https://web.dev/learn/accessibility/more-html#iframes">iFrame.</a>',
      EMBED_GENERAL: 'Nie je možné skontrolovať vložený obsah. Uistite sa, že obrázky majú alt text, videá majú titulky, text má dostatočný kontrast a interaktívne komponenty sú <a href="https://webaim.org/techniques/keyboard/">prístupné z klávesnice.</a>',
      EMBED_UNFOCUSABLE: '<code>&lt;iframe&gt;</code> s nezamerateľnými prvkami by nemalo mať <code>tabindex="-1"</code>. Vložený obsah nebude dostupný pomocou klávesnice.',

      // QA
      QA_BAD_LINK: 'Nájdené zlé prepojenie. Zdá sa, že odkaz smeruje na vývojové prostredie. <hr> {L} <strong {C}>%(LINK)</strong>',
      QA_IN_PAGE_LINK: 'Rozbitý odkaz na rovnakú stránku. Cieľ odkazu nezodpovedá žiadnemu prvku na tejto stránke.',
      QA_STRONG_ITALICS: 'Tučné písmo a kurzíva majú sémantický význam a nemali by sa používať na zvýraznenie celých odsekov. Tučný text by sa mal používať na výrazné <strong>zdôraznenie</strong> slova alebo frázy. Kurzíva by sa mala používať na zvýraznenie vlastných mien (t. j. názvov kníh a článkov), cudzích slov, citátov. Dlhé citáty by sa mali formátovať ako blokové citáty.',
      QA_PDF: 'Nie je možné skontrolovať prístupnosť súborov PDF. Súbory PDF sa považujú za webový obsah a musia byť tiež prístupné. Súbory PDF často obsahujú problémy pre ľudí, ktorí používajú čítačky obrazovky (chýbajúce štrukturálne značky alebo chýbajúce označenia polí formulára), a ľudí so slabým zrakom (text sa po zväčšení nezobrazuje). <ul><li>Ak ide o formulár, zvážte použitie prístupného formulára HTML ako alternatívy.</li><li>Ak ide o dokument, zvážte jeho konverziu na webovú stránku.</li></ul> V opačnom prípade skontrolujte <a href="https://helpx.adobe.com/acrobat/using/create-verify-pdf-accessibility.html">PDF pre prístupnosť v Acrobat DC.</a>',
      QA_DOCUMENT: 'Nie je možné skontrolovať prístupnosť dokumentu. Prepojené dokumenty sa považujú za webový obsah a musia byť tiež prístupné. Skontrolujte tento dokument manuálne. <ul><li>Urobte svoj <a href="https://support.google.com/docs/answer/6199477?hl=sk">dokument alebo prezentáciu v službe Google Workspace prístupnejšou.</a></li><li>Urobte svoj <a href="https://support.microsoft.com/sk/office/create-accessible-office-documents-868ecfcd-4f00-4224-b881-a65537a7c155">dokument Office prístupnejším.</a></li></ul>',
      QA_BLOCKQUOTE: 'Je to nadpis? <strong {C}>%(TEXT)</strong> <hr> Blokové úvodzovky by sa mali používať len pre citácie. Ak to má byť nadpis, zmeňte tento blokový citát na sémantický nadpis (napr. Nadpis 2 alebo Nadpis 3).',
      QA_FAKE_HEADING: 'Je to nadpis? <strong {C}>%(TEXT)</strong> <hr> Riadok tučného alebo veľkého textu môže vyzerať ako nadpis, ale osoba používajúca čítačku obrazovky nedokáže určiť, že je dôležitý, ani prejsť na jeho obsah. Tučný alebo veľký text by nikdy nemal nahrádzať sémantické nadpisy (nadpisy 2 až 6).',
      QA_FAKE_LIST: 'Snažíte sa vytvoriť zoznam? Nájdená možná položka zoznamu: <strong {C}>%(firstPrefix)</strong> <hr> Uistite sa, že používate sémantické zoznamy tak, že namiesto nich použijete tlačidlá na formátovanie odrážok alebo čísel. Pri použití sémantického zoznamu dokážu asistenčné technológie sprostredkovať informácie, ako je celkový počet položiek a relatívna pozícia každej položky v zozname. Viac informácií o <a href="https://www.w3.org/WAI/tutorials/page-structure/content/#lists">sémantických zoznamoch.</a>',
      QA_UPPERCASE: 'Nájdené všetky čiapky. Niektoré čítačky obrazovky môžu interpretovať text písaný veľkými písmenami ako skratku a budú čítať každé písmeno samostatne. Okrem toho sa niektorým ľuďom všetky veľké písmená čítajú ťažšie a môže to pôsobiť dojmom, akoby sa kričalo.',
      QA_UNDERLINE: 'Podčiarknutý text sa môže zameniť s odkazmi. Zvážte použitie iného štýlu, napríklad <code>&lt;strong&gt;</code><strong>strong importance</strong><code>&lt;/strong&gt;</code> alebo <code>&lt;em&gt;</code><em>emphasis</em><code>&lt;/em&gt;</code>.',
      QA_SUBSCRIPT: 'Možnosti formátovania dolného a horného indexu by sa mali používať len na zmenu pozície textu pre typografické konvencie alebo normy. Nemali by sa <strong>používať</strong> výlučne na účely prezentácie alebo vzhľadu. Formátovanie celých viet spôsobuje problémy s čitateľnosťou. Medzi vhodné prípady použitia by patrilo zobrazovanie exponentov, poradových čísel, ako napríklad 4<sup>th</sup> namiesto fourth, a chemických vzorcov (napr. H<sub>2</sub>O).',
      QA_NESTED_COMPONENTS: 'Vyhnite sa vnoreniu interaktívnych komponentov rozloženia, ako je umiestnenie akordeónov do kariet alebo kariet do akordeónov. To môže skomplikovať navigáciu, zvýšiť kognitívne zaťaženie a viesť k prehliadaniu obsahu.',
      QA_JUSTIFY: 'Vyhnite sa používaniu zarovnaného textu, ktorý je zarovnaný ako k ľavému, tak aj k pravému okraju. To môže byť pre niektorých ľudí ťažké čítať kvôli nerovnomerným medzerám medzi slovami. Použite text zarovnaný na ľavo pre lepšiu čitateľnosť.',
      QA_SMALL_TEXT: 'Malý text je ťažšie čitateľný, najmä pre osoby so slabým zrakom. Aby ste zabezpečili lepšiu čitateľnosť, vyhnite sa používaniu veľkostí písma menších ako predvolené.',

      // Shared
      ACC_NAME: '<strong {B}>Prístupné meno</strong> %(TEXT)',
      ACC_NAME_TIP: '<hr><strong>Tip!</strong> "Prístupné meno" je konečná nálepka, ktorá sa komunikuje ľuďom používajúcim asistenčné technológie a ktorá sa počíta pomocou ARIA. Pomáha im to pochopiť účel odkazu alebo tlačidla.',
      HIDDEN_FOCUSABLE: 'Odkaz alebo tlačidlo má <code>aria-hidden=&quot;true&quot;</code>, ale stále je prístupné cez klávesnicu. Ak chcete skryť duplikovaný odkaz alebo tlačidlo, pridajte aj <code>tabindex=&quot;-1&quot;</code>. Inak by sa <code>aria-hidden=&quot;true&quot;</code> nemalo používať na prvkoch, ktoré môžu získať fokus. <hr> Viac informácií o <a href="https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/Attributes/aria-hidden">atribúte aria-hidden.</a>',

      // Developer
      DUPLICATE_ID: 'Nájdené <strong>duplicitné ID</strong>. Je známe, že chyby duplicitného ID spôsobujú problémy asistenčným technológiám pri pokusoch o interakciu s obsahom. Odstráňte alebo zmeňte nasledujúce ID. <hr> <strong {B}>ID</strong> <strong {C}>#%(id)</strong>',
      UNCONTAINED_LI: 'Všetky položky zoznamu <code>&lt;li&gt;</code> musia byť umiestnené vo vnútri <code>&lt;ul&gt;</code> neusporiadaných alebo <code>&lt;ol&gt;</code> usporiadaných prvkov. Táto štruktúra pomáha čítačkám obrazovky presne oznamovať zoznam a jeho položky.',
      TABINDEX_ATTR: 'Prvok by nemal mať atribút <code>tabindex</code> väčší ako 0.',

      // Meta
      META_LANG: 'Jazyk stránky nie je deklarovaný! Prosím <a href="https://www.w3.org/International/questions/qa-html-language-declarations">deklarujte jazyk v značke HTML.</a>',
      META_TITLE: 'Chýba názov stránky! Uveďte prosím <a href="https://developer.mozilla.org/sk/docs/Web/HTML/Element/title">názov stránky.</a>',
      META_SCALABLE: 'Odstráňte parameter <code>user-scalable="no"</code> v <a href="https://developer.mozilla.org/en-US/docs/Web/HTML/Viewport_meta_tag">meta značke zobrazenia</a>, aby ste umožnili priblíženie.',
      META_MAX: 'Uistite sa, že parameter <code>maximum-scale</code> v <a href="https://developer.mozilla.org/en-US/docs/Web/HTML/Viewport_meta_tag">meta značke zobrazenia</a> nie je menší ako 2.',
      META_REFRESH: 'Stránka by sa nemala automaticky obnovovať pomocou meta značky.',

      // Buttons
      BTN_EMPTY: 'Tlačidlu chýba prístupné meno, ktoré popisuje jeho účel.',
      BTN_EMPTY_LABELLEDBY: 'Tlačidlo má hodnotu <code>aria-labelledby</code>, ktorá je prázdna alebo nezodpovedá hodnote <code>id</code> iného prvku na stránke.',
      BTN: 'tlačidlo',
      BTN_TIP: 'Naučte sa, ako vytvoriť <a href="https://www.sarasoueidan.com/blog/accessible-icon-buttons/">prístupné tlačidlo.</a>',
      BTN_ROLE_IN_NAME: 'Nezahŕňajte slovo „tlačidlo“ v názve tlačidla. Čítačky obrazovky už oznamujú úlohu prvku spolu s jeho názvom.',
      LABEL_IN_NAME: 'Viditeľný text tohto prvku sa zdá byť iný ako prístupné meno, čo môže spôsobiť zmätok pre používateľov asistenčných technológií. Skontrolujte prosím: <hr> <strong {B}>Prístupné meno</strong> <strong {C}>%(TEXT)</strong>',

      // Tables
      TABLES_MISSING_HEADINGS: 'Chýbajúce záhlavia tabuliek! Prístupné tabuľky potrebujú značku HTML, ktorá označuje bunky záhlavia a dátové bunky, ktoré definujú ich vzťah. Tieto informácie poskytujú kontext ľuďom, ktorí používajú asistenčné technológie. Tabuľky by sa mali používať len na tabuľkové údaje. <hr> Ďalšie informácie o <a href="https://www.w3.org/WAI/tutorials/tables/">prístupných tabuľkách.</a>',
      TABLES_SEMANTIC_HEADING: 'Sémantické nadpisy, ako napríklad Nadpis 2 alebo Nadpis 3, by sa mali používať len pre časti obsahu; <strong>nie</strong> v tabuľkách HTML. Namiesto toho označte nadpisy tabuliek pomocou prvku <code>&lt;th&gt;</code>. <hr> Ďalšie informácie o <a href="https://www.w3.org/WAI/tutorials/tables/">prístupných tabuľkách.</a>',
      TABLES_EMPTY_HEADING: 'Nájdené prázdne záhlavie tabuľky! Hlavičky tabuliek by <strong>nikdy</strong> nemali byť prázdne. Je dôležité označiť záhlavia riadkov a/alebo stĺpcov, aby sa vyjadril ich vzťah. Tieto informácie poskytujú kontext ľuďom, ktorí používajú asistenčné technológie. Majte na pamäti, že tabuľky by sa mali používať len pre tabuľkové údaje. <hr> Ďalšie informácie o <a href="https://www.w3.org/WAI/tutorials/tables/">prístupných tabuľkách.</a>',

      // Contrast
      CONTRAST_NORMAL: 'Text normálnej veľkosti by mal mať kontrastný pomer aspoň %(RATIO).',
      CONTRAST_LARGE: 'Text veľkej veľkosti by mal mať kontrastný pomer aspoň %(RATIO).',
      CONTRAST_ERROR: 'Text nemá dostatočný kontrast s pozadím, čo sťažuje jeho čitateľnosť.',
      CONTRAST_WARNING: 'Kontrast tohto textu je neznámy a musí byť manuálne skontrolovaný. Uistite sa, že text a pozadie majú dostatočný kontrast.',
      CONTRAST_ERROR_GRAPHIC: 'Grafika nemá dostatočný kontrast s pozadím, čo sťažuje jej viditeľnosť.',
      CONTRAST_WARNING_GRAPHIC: 'Kontrast tejto grafiky je neznámy a vyžaduje manuálnu kontrolu.',
      CONTRAST_TIP_GRAPHIC: 'Grafické prvky a prvky používateľského rozhrania by mali mať kontrastný pomer aspoň 3:1.',
      CONTRAST_OPACITY: 'Zvýšte nepriehľadnosť pre lepšiu viditeľnosť.',
      CONTRAST_APCA: 'Tento kontrast nie je dostatočný pre žiadnu veľkosť textu. Zvážte použitie tejto kombinácie farieb a veľkostí textu?',
      CONTRAST_COLOR: 'Zvážte použitie tejto farby namiesto aktuálnej?',
      CONTRAST_SIZE: 'Zvážte zväčšenie veľkosti textu pre túto kombináciu farieb?',
      CONTRAST_PLACEHOLDER: 'Zástupný text v tomto vstupnom poli nemá dostatočný kontrast s pozadím, čo sťažuje jeho čitateľnosť.',
      CONTRAST_PLACEHOLDER_UNSUPPORTED: 'Kontrast tohto zástupného textu nie je známy a je potrebné ho manuálne skontrolovať. Uistite sa, že text a pozadie majú silne kontrastné farby.',
      CONTRAST_INPUT: 'Text v tomto vstupnom poli nemá dostatočný kontrast s pozadím, čo sťažuje jeho čitateľnosť.',
      CONTRAST: 'Kontrast',
      UNKNOWN: 'Neznáme',
      FG: 'Popredie',
      BG: 'Pozadie',
      NO_SUGGESTION: 'Nie je možné nájsť dostupnú kombináciu iba zmenou farby textu. Skúste zmeniť farbu pozadia.',
    },
  };

  return sk;

}));
