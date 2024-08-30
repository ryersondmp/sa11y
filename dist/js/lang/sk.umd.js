
/*!
  * Sa11y, the accessibility quality assurance assistant.
  * @version 3.2.3
  * @author Adam Chaboryk
  * @license GPL-2.0-or-later
  * @copyright © 2020 - 2024 Toronto Metropolitan University.
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
      OUTLINE: 'Náčrt',
      TITLE: 'Titul',
      ALT: 'ALT',
      IMAGES: 'Obrázky',
      EDIT: 'Upraviť',
      IMAGES_NOT_FOUND: 'Žiadne obrázky nenájdené.',
      DECORATIVE: 'Dekoratívny',
      MISSING: 'Chýbajúci',
      PAGE_ISSUES: 'Problémy so stránkami',
      SETTINGS: 'Nastavenia',
      CONTRAST: 'Kontrast',
      FORM_LABELS: 'Štítky formulárov',
      LINKS_ADVANCED: 'Odkazy (pre pokročilých)',
      DARK_MODE: 'Tmavý režim',
      SHORTCUT_SCREEN_READER: 'Prejsť na vydanie. Klávesová skratka: Alt S',
      SHORTCUT_TOOLTIP: 'Prejsť na vydanie',
      NEW_TAB: 'Otvorí sa nová karta',
      LINKED: 'Prepojené',
      PANEL_HEADING: 'Kontrola prístupnosti',
      PANEL_STATUS_NONE: 'Nenašli sa žiadne chyby.',
      PANEL_ICON_WARNINGS: 'nájdené varovania.',
      PANEL_ICON_TOTAL: 'celkový počet nájdených problémov.',
      NOT_VISIBLE_ALERT: 'Položka, ktorú sa snažíte zobraziť, nie je viditeľná; môže byť skrytá alebo sa nachádza v komponente akordeónu alebo karty. Tu je náhľad:',
      ERROR_MISSING_ROOT_TARGET: 'Celá stránka bola skontrolovaná z hľadiska prístupnosti, pretože cieľová oblasť <code>%(root)</code> neexistuje.',
      HEADING_NOT_VISIBLE_ALERT: 'Záhlavie nie je viditeľné; môže byť skryté alebo sa nachádzať v komponente akordeónu alebo karty.',
      SKIP_TO_PAGE_ISSUES: 'Prejsť na stránku Problémy',
      CONSOLE_ERROR_MESSAGE: 'Je nám ľúto, ale na tejto stránke je problém s kontrolou prístupnosti. Môžete to prosím <a href="%(link)">nahlásiť prostredníctvom tohto formulára</a> alebo na <a href="%(link)">GitHub</a>?',

      // Dismiss
      PANEL_DISMISS_BUTTON: 'Zobraziť %(dismissCount) zamietnutých upozornení',
      DISMISS: 'Odmietnuť',
      DISMISSED: 'Zamietnuté varovania',
      DISMISS_REMINDER: 'Upozorňujeme, že upozornenia sú len <strong>dočasne</strong> zamietnuté. Vymazaním histórie prehliadača a súborov cookie sa obnovia všetky predtým zamietnuté upozornenia na všetkých stránkach.',

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
      COLOUR_FILTER_HIGH_CONTRAST_MESSAGE: 'Farebné filtre nefungujú v režime vysokého kontrastu.',

      // Alternative text stop words
      SUSPICIOUS_ALT_STOPWORDS: [
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
      WARNING_ALT_STOPWORDS: [
        'kliknite sem',
      ],
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
      LANG_READABILITY: 'Čitateľnosť',
      LANG_AVG_SENTENCE: 'Priemerný počet slov na vetu:',
      LANG_COMPLEX_WORDS: 'Zložené slová:',
      LANG_TOTAL_WORDS: 'Slová:',
      LANG_VERY_DIFFICULT: 'Veľmi ťažké',
      LANG_DIFFICULT: 'Ťažké',
      LANG_FAIRLY_DIFFICULT: 'Pomerne ťažké',
      LANG_GOOD: 'Dobrý',
      READABILITY_NO_P_OR_LI_MESSAGE: 'Nie je možné vypočítať skóre čitateľnosti. Nenašiel sa žiadny odsek <code>&lt;p&gt;</code> ani obsah zoznamu <code>&lt;li&gt;</code>.',
      READABILITY_NOT_ENOUGH_CONTENT_MESSAGE: 'Nedostatok obsahu na výpočet skóre čitateľnosti.',
      HEADING_NON_CONSECUTIVE_LEVEL: 'Použitá nepokračujúca úroveň záhlavia. Nadpisy by nikdy nemali preskakovať úrovne alebo prechádzať z <strong>Nadpisu %(prevLevel)</strong> na <strong {R}>Nadpis %(level)</strong>.',
      HEADING_EMPTY: 'Nájdená prázdna položka! Ak to chcete opraviť, odstráňte tento riadok alebo zmeňte jeho formát z <strong {R}>Head %(level)</strong> na <strong>Normal</strong> alebo <strong>Paragraph</strong>.',
      HEADING_LONG: 'Smerovanie je dlhé! Nadpisy by sa mali používať na usporiadanie obsahu a vyjadrenie štruktúry. Mali by byť stručné, informatívne a jedinečné. Prosím, aby nadpisy mali menej ako 160 znakov (nie viac ako jednu vetu). <hr> <strong {B}>%(HEADING_LENGTH) Znakov</strong>',
      HEADING_FIRST: 'Prvý nadpis na stránke by mal byť zvyčajne nadpis 1 alebo 2. Nadpis 1 by mal byť začiatkom hlavnej časti obsahu a je to hlavný nadpis, ktorý opisuje celkový účel stránky. Viac informácií o <a href="https://www.w3.org/WAI/tutorials/page-structure/headings/">štruktúre nadpisov.</a>',
      HEADING_MISSING_ONE: 'Chýba nadpis 1. Nadpis 1 by mal byť začiatkom hlavnej oblasti obsahu a je to hlavný nadpis, ktorý opisuje celkový účel stránky. Viac informácií o <a href="https://www.w3.org/WAI/tutorials/page-structure/headings/">štruktúre nadpisov.</a>',
      HEADING_EMPTY_WITH_IMAGE: 'Nadpis neobsahuje žiadny text, ale obsahuje obrázok. Ak to nie je nadpis, zmeňte jeho formát z <strong {R}>Nadpis %(level)</strong> na <strong>Normálny</strong> alebo <strong>Odsek</strong>. V opačnom prípade pridajte k obrázku alt text, ak nie je dekoratívny.',
      PANEL_HEADING_MISSING_ONE: 'Chýba položka 1!',
      PANEL_NO_HEADINGS: 'Nenašli sa žiadne záhlavia.',
      LINK_EMPTY: 'Odstránenie prázdnych odkazov bez textu.',
      LINK_EMPTY_LABELLEDBY: 'Odkaz má hodnotu <code>aria-labelledby</code>, ktorá je prázdna alebo nezodpovedá hodnote atribútu <code>id</code> iného prvku na stránke.',
      LINK_EMPTY_LINK_NO_LABEL: 'Odkaz nemá rozoznateľný text, ktorý je viditeľný pre čítačky obrazovky a iné asistenčné technológie. Oprava: <ul><li>Pridajte stručný text, ktorý popisuje, kam vás odkaz zavedie.</li><li>Ak ide o <a href="https://a11y-101.com/development/icons-and-links">odkaz na ikonu alebo SVG,</a> pravdepodobne chýba popisný štítok.</li><li>Ak si myslíte, že tento odkaz je chybou spôsobenou chybou kopírovania/vkladania, zvážte jeho odstránenie.</li></ul>',
      LINK_LABEL: '<strong {B}>Popis</strong> %(TEXT)',
      LINK_STOPWORD: 'Text prepojenia nemusí byť dostatočne popisný mimo kontextu: <strong {R}>%(ERROR)</strong> <hr> <strong>Tip!</strong> Text prepojenia by mal byť vždy jasný, jedinečný a zmysluplný. Vyhnite sa bežným slovám ako &quot;kliknite sem&quot; alebo &quot;dozvedieť sa viac&quot;;',
      LINK_BEST_PRACTICES: 'Zvážte nahradenie textu prepojenia: <strong {W}>%(ERROR)</strong> <hr> <ul><li>&quot;Kliknite sem&quot; kladie dôraz na mechaniku myši, hoci mnoho ľudí myš nepoužíva alebo si túto webovú lokalitu možno prezerá na mobilnom zariadení. Zvážte použitie iného slovesa, ktoré súvisí s úlohou.</li><li>Vyhnite sa používaniu symbolov HTML ako výzvy k akcii, pokiaľ nie sú skryté pre asistenčné technológie.</li></ul>',
      LINK_URL: 'Dlhšie a menej zrozumiteľné adresy URL použité ako text odkazu by mohli byť ťažko zrozumiteľné pre asistenčné technológie. Vo väčšine prípadov je lepšie namiesto adresy URL použiť text čitateľný pre človeka. Krátke adresy URL (napríklad domovská stránka webu) sú v poriadku. <hr> <strong>Tip!</strong> Text odkazu by mal byť vždy jasný, jedinečný a zmysluplný, aby ho bolo možné pochopiť aj mimo kontextu.',
      LINK_DOI: 'V prípade webových stránok alebo len online zdrojov odporúča <a href="https://apastyle.apa.org/style-grammar-guidelines/paper-format/accessibility/urls#:~:text=descriptive%20links">príručka štýlu APA</a> používať popisné odkazy tak, že okolo názvu diela uvediete jeho URL alebo DOI. Dlhšie, menej zrozumiteľné adresy URL použité ako text odkazu by mohli byť ťažko zrozumiteľné pomocou asistenčných technológií.',
      NEW_TAB_WARNING: 'Odkaz sa otvorí v novej karte alebo okne bez upozornenia. Môže to byť dezorientujúce, najmä pre ľudí, ktorí majú problémy s vnímaním vizuálneho obsahu. Po druhé, nie vždy je dobrým postupom kontrolovať niečí zážitok alebo robiť rozhodnutia za neho. Uveďte, že sa odkaz otvára v novom okne, v texte odkazu. <hr> <strong>Tip!</strong> Naučte sa osvedčené postupy: <a href="https://www.nngroup.com/articles/new-browser-windows-and-tabs/">otváranie odkazov v nových oknách a kartách prehliadača.</a>',
      FILE_TYPE_WARNING: 'Odkaz odkazuje na súbor PDF alebo súbor na stiahnutie (napr. MP3, Zip, Word Doc) bez upozornenia. Typ súboru uveďte v texte odkazu. Ak ide o veľký súbor, zvážte uvedenie jeho veľkosti. <hr> <strong>Príklad:</strong> Výkonná správa (PDF, 3 MB)',
      LINK_IDENTICAL_NAME: 'Odkaz má rovnaký text ako iný odkaz, hoci odkazuje na inú stránku. Viacero odkazov s rovnakým textom môže spôsobiť zmätok u ľudí, ktorí používajú čítačky obrazovky. <hr> Premyslite si, či by nasledujúci odkaz nemal byť viac popisný, aby ste ho odlíšili od ostatných odkazov: <strong {W}>%(TEXT)</strong>',
      MISSING_ALT_LINK_BUT_HAS_TEXT_MESSAGE: 'Obrázok sa používa ako odkaz s okolitým textom, hoci atribút alt by mal byť označený ako dekoratívny alebo nulový.',
      MISSING_ALT_LINK_MESSAGE: 'Obrázok sa používa ako odkaz, ale chýba text alt! Uistite sa, že text alt opisuje, kam vás odkaz zavedie.',
      MISSING_ALT_MESSAGE: 'Chýbajúci text alt! Ak obrázok vyjadruje príbeh, náladu alebo dôležitú informáciu, nezabudnite ho opísať.',
      LINK_ALT_HAS_FILE_EXTENSION: 'Nájdená prípona súboru v texte alt. Uistite sa, že text alt opisuje cieľ odkazu, nie doslovný opis obrázka. Odstráňte: <strong {R}>%(ERROR)</strong> <hr> {ALT} {L} <strong {R}>%(ALT_TEXT)</strong>',
      LINK_IMAGE_PLACEHOLDER_ALT_MESSAGE: 'Nájdený text alt bez popisu alebo zástupný text v rámci prepojeného obrázka. Uistite sa, že text alt opisuje cieľ odkazu, nie doslovný opis obrázka. Nahraďte nasledujúci text alt. <hr> {ALT} {L} <strong {R}>%(ALT_TEXT)</strong>',
      LINK_IMAGE_SUS_ALT_MESSAGE: 'Asistenčné technológie už indikujú, že ide o obrázok, takže &quot;<strong {W}>%(ERROR)</strong>&quot; môže byť zbytočné. Uistite sa, že alt text opisuje cieľ odkazu, nie doslovný opis obrázka. <hr> {ALT} {L} <strong {W}>%(ALT_TEXT)</strong>',
      ALT_HAS_FILE_EXTENSION: 'Nájdená prípona súboru v texte alt. Ak obrázok vyjadruje príbeh, náladu alebo dôležitú informáciu, nezabudnite ho opísať. Odstráňte: <strong {R}>%(ERROR)</strong> <hr> {ALT} <strong {R}>%(ALT_TEXT)</strong>',
      ALT_PLACEHOLDER_MESSAGE: 'Nájdený text alt bez popisu alebo zástupného textu. Nahraďte nasledujúci alt text niečím zmysluplnejším. <hr> {ALT} <strong {R}>%(ALT_TEXT)</strong>',
      ALT_HAS_SUS_WORD: 'Asistenčné technológie už indikujú, že ide o obrázok, takže &quot;<strong {W}>%(ERROR)</strong>&quot; môže byť zbytočné. <hr> {ALT} <strong {W}>%(ALT_TEXT)</strong>',
      LINK_HIDDEN_FOCUSABLE: 'Odkaz má <code>aria-hidden=&quot;true&quot;</code>, ale stále je klávesnicou zamerateľný. Ak plánujete skryť nadbytočný alebo duplicitný odkaz, pridajte aj <code>tabindex=&quot;-1&quot;</code>.',
      LINK_IMAGE_NO_ALT_TEXT: 'Obrázok v rámci odkazu je označený ako dekoratívny a nie je v ňom žiadny text odkazu. K obrázku pridajte text alt, ktorý opisuje cieľ odkazu.',
      LINK_IMAGE_HAS_TEXT: 'Obrázok je označený ako dekoratívny, hoci odkaz používa okolitý text ako popisné označenie.',
      LINK_IMAGE_LONG_ALT: 'Popis Alt textu na prepojenom obrázku je <strong>predlžený</strong>. Text alt na prepojených obrázkoch by mal popisovať, kam vás odkaz zavedie, nie doslovný opis obrázka. <strong>Zvážte použitie názvu stránky, na ktorú odkazuje, ako alt textu.</strong> <hr> {ALT} {L} <strong {B}>%(altLength) Znakov</strong> <strong {W}>%(ALT_TEXT)</strong>',
      LINK_IMAGE_ALT_WARNING: 'Odkaz na obrázok obsahuje text alt. Opisuje text alt, kam vás odkaz zavedie? <strong>Zvážte použitie názvu stránky, na ktorú odkazuje, ako alt textu.</strong> <hr> {ALT} {L} <strong {W}>%(ALT_TEXT)</strong>',
      LINK_IMAGE_ALT_AND_TEXT_WARNING: 'Odkaz na obrázok obsahuje <strong>obidva texty alt a okolitý text odkazu.</strong> Ak je tento obrázok dekoratívny a používa sa ako funkčný odkaz na inú stránku, zvážte označenie obrázka ako dekoratívneho alebo nulového - okolitý text odkazu by mal stačiť. <hr> {ALT} <strong {W}>%(ALT_TEXT)</strong> <hr> <strong {B}>Označenie odkazu</strong> {L} <strong {W}>%(TEXT)</strong>',
      IMAGE_FIGURE_DECORATIVE: 'Obrázok je označený ako <strong>dekoratívny</strong> a asistenčné technológie ho budú ignorovať. <hr> Hoci bol uvedený <strong>nadpis</strong>, obrázok by mal mať vo väčšine prípadov aj alt text. <ul><li>Titul alt by mal poskytovať stručný opis toho, čo je na obrázku.</li><li>Titul by mal zvyčajne poskytovať kontext, aby sa obrázok prepojil s okolitým obsahom, alebo upozorniť na konkrétnu informáciu.</li></ul> Zistite viac: <a href="https://thoughtbot.com/blog/alt-vs-figcaption#the-figcaption-element">alt versus figcaption.</a>',
      IMAGE_FIGURE_DUPLICATE_ALT: 'Nepoužívajte presne tie isté slová pre text alt aj nadpis. Čítačky obrazovky budú informáciu oznamovať dvakrát. <ul><li>Textu alt by mal poskytovať stručný opis toho, čo je na obrázku.</li><li>Titul by mal zvyčajne poskytovať kontext, aby súvisel s okolitým obsahom, alebo upozorniť na konkrétnu informáciu.</li></ul> Ďalšie informácie: <a href="https://thoughtbot.com/blog/alt-vs-figcaption#the-figcaption-element">alt verzus titulok obrázku.</a> <hr> {ALT} <strong {W}>%(ALT_TEXT)</strong>',
      IMAGE_DECORATIVE: 'Obrázok je označený ako <strong>dekoratívny</strong> a asistenčné technológie ho budú ignorovať. Ak obrázok sprostredkúva príbeh, náladu alebo dôležité informácie - nezabudnite pridať alt text.',
      IMAGE_ALT_TOO_LONG: 'Alt text popisu je <strong>príliš dlhý</strong>. Alt text by mal byť stručný, ale výstižný ako <em>tweet</em> (približne 100 znakov). Ak ide o zložitý obrázok alebo graf, zvážte umiestnenie dlhého popisu obrázka do textu pod ním alebo do akordeónového komponentu. <hr> {ALT} <strong {B}>%(altLength) Znakov</strong> <strong {W}>%(ALT_TEXT)</strong>',
      IMAGE_PASS: '{ALT} %(ALT_TEXT)',
      LABELS_MISSING_IMAGE_INPUT_MESSAGE: 'V tlačidle obrázka chýba text alt. Pridajte text alt a uveďte prístupný názov. Napríklad: <em>Vyhľadať</em> alebo <em>Odoslať</em>.',
      LABELS_INPUT_RESET_MESSAGE: 'Tlačidlá resetovania by sa nemali používať, ak to nie je výslovne potrebné, pretože sa ľahko aktivujú omylom. <hr> <strong>Tip!</strong> Prečítajte si, prečo <a href="https://www.nngroup.com/articles/reset-and-cancel-buttons/">tlačidlá Reset a Cancel predstavujú problémy s použiteľnosťou.</a>',
      LABELS_ARIA_LABEL_INPUT_MESSAGE: 'Vstup má prístupný názov, ale dbajte na to, aby bol viditeľný aj štítok. <hr> <strong {B}>Štítok vstupu</strong> <strong {W}>%(TEXT)</strong>',
      LABELS_NO_FOR_ATTRIBUTE_MESSAGE: 'K tomuto vstupu nie je priradený žiadny štítok. Pridajte atribút <code>for</code> k štítku, ktorý sa zhoduje s <code>id</code> tohto vstupu. <hr> ID tohto vstupu je: <strong>id=&#34;%(id)&#34;</strong>',
      LABELS_MISSING_LABEL_MESSAGE: 'K tomuto vstupu nie je priradený žiadny štítok. Prosím, pridajte <code>id</code> k tomuto vstupu a pridajte zodpovedajúci atribút <code>for</code> k štítku.',
      EMBED_VIDEO: 'Uistite sa, že <strong>všetky videá majú skryté titulky.</strong> Poskytovanie titulkov pre všetok zvukový a obrazový obsah je povinnou požiadavkou úrovne A. Titulky podporujú osoby s poruchou sluchu alebo nepočujúce osoby.',
      EMBED_AUDIO: 'Zabezpečte <strong>prepis všetkých podcastov.</strong> Poskytovanie prepisov zvukového obsahu je povinnou požiadavkou úrovne A. Prepisy podporujú ľudí s poruchou sluchu alebo nepočujúcich, ale môžu byť prínosom pre všetkých. Zvážte umiestnenie prepisu pod alebo v rámci akordeónového panelu.',
      EMBED_DATA_VIZ: 'Takéto widgety na vizualizáciu údajov sú často problematické pre ľudí, ktorí na navigáciu používajú klávesnicu alebo čítačku obrazovky, a môžu predstavovať značné ťažkosti pre ľudí so slabým zrakom alebo farbosleposťou. Odporúča sa poskytnúť rovnaké informácie v alternatívnom (textovom alebo tabuľkovom) formáte pod widgetom. <hr> Ďalšie informácie o <a href="https://www.w3.org/WAI/tutorials/images/complex">komplexných obrázkoch.</a>',
      EMBED_MISSING_TITLE: 'Vložený obsah vyžaduje prístupný názov, ktorý opisuje jeho obsah. Uveďte jedinečný atribút <code>title</code> alebo <code>aria-label</code> na prvku <code>iframe</code>. Ďalšie informácie o <a href="https://web.dev/learn/accessibility/more-html#iframes">iFrame.</a>',
      EMBED_GENERAL_WARNING: 'Nie je možné skontrolovať vložený obsah. Uistite sa, že obrázky majú alt text, videá majú titulky, text má dostatočný kontrast a interaktívne komponenty sú <a href="https://webaim.org/techniques/keyboard/">prístupné z klávesnice.</a>',
      EMBED_UNFOCUSABLE: '<code>&lt;iframe&gt;</code> s nezamerateľnými prvkami by nemalo mať <code>tabindex="-1"</code>. Vložený obsah nebude dostupný pomocou klávesnice.',
      QA_BAD_LINK: 'Nájdené zlé prepojenie. Zdá sa, že odkaz smeruje na vývojové prostredie. <hr> Tento odkaz odkazuje na: <br> <strong {R}>%(LINK)</strong>',
      QA_IN_PAGE_LINK: 'Rozbitý odkaz na rovnakú stránku. Cieľ odkazu nezodpovedá žiadnemu prvku na tejto stránke.',
      QA_BAD_ITALICS: 'Tučné písmo a kurzíva majú sémantický význam a nemali by sa používať na zvýraznenie celých odsekov. Tučný text by sa mal používať na výrazné <strong>zdôraznenie</strong> slova alebo frázy. Kurzíva by sa mala používať na zvýraznenie vlastných mien (t. j. názvov kníh a článkov), cudzích slov, citátov. Dlhé citáty by sa mali formátovať ako blokové citáty.',
      QA_PDF: 'Nie je možné skontrolovať prístupnosť súborov PDF. Súbory PDF sa považujú za webový obsah a musia byť tiež prístupné. Súbory PDF často obsahujú problémy pre ľudí, ktorí používajú čítačky obrazovky (chýbajúce štrukturálne značky alebo chýbajúce označenia polí formulára), a ľudí so slabým zrakom (text sa po zväčšení nezobrazuje). <ul><li>Ak ide o formulár, zvážte použitie prístupného formulára HTML ako alternatívy.</li><li>Ak ide o dokument, zvážte jeho konverziu na webovú stránku.</li></ul> V opačnom prípade skontrolujte <a href="https://helpx.adobe.com/acrobat/using/create-verify-pdf-accessibility.html">PDF pre prístupnosť v Acrobat DC.</a>',
      QA_DOCUMENT: 'Nie je možné skontrolovať prístupnosť dokumentu. Prepojené dokumenty sa považujú za webový obsah a musia byť tiež prístupné. Skontrolujte tento dokument manuálne. <ul><li>Urobte svoj <a href="https://support.google.com/docs/answer/6199477?hl=sk">dokument alebo prezentáciu v službe Google Workspace prístupnejšou.</a></li><li>Urobte svoj <a href="https://support.microsoft.com/sk/office/create-accessible-office-documents-868ecfcd-4f00-4224-b881-a65537a7c155">dokument Office prístupnejším.</a></li></ul>',
      QA_PAGE_LANGUAGE: 'Jazyk stránky nie je deklarovaný! Prosím <a href="https://www.w3.org/International/questions/qa-html-language-declarations">deklarujte jazyk v značke HTML.</a>',
      QA_PAGE_TITLE: 'Chýba názov stránky! Uveďte prosím <a href="https://developer.mozilla.org/sk/docs/Web/HTML/Element/title">názov stránky.</a>',
      QA_BLOCKQUOTE_MESSAGE: 'Je to nadpis? <strong {W}>%(TEXT)</strong> <hr> Blokové úvodzovky by sa mali používať len pre citácie. Ak to má byť nadpis, zmeňte tento blokový citát na sémantický nadpis (napr. Nadpis 2 alebo Nadpis 3).',
      QA_FAKE_HEADING: 'Je to nadpis? <strong {W}>%(TEXT)</strong> <hr> Riadok tučného alebo veľkého textu môže vyzerať ako nadpis, ale osoba používajúca čítačku obrazovky nedokáže určiť, že je dôležitý, ani prejsť na jeho obsah. Tučný alebo veľký text by nikdy nemal nahrádzať sémantické nadpisy (nadpisy 2 až 6).',
      QA_SHOULD_BE_LIST: 'Snažíte sa vytvoriť zoznam? Nájdená možná položka zoznamu: <strong {W}>%(firstPrefix)</strong> <hr> Uistite sa, že používate sémantické zoznamy tak, že namiesto nich použijete tlačidlá na formátovanie odrážok alebo čísel. Pri použití sémantického zoznamu dokážu asistenčné technológie sprostredkovať informácie, ako je celkový počet položiek a relatívna pozícia každej položky v zozname. Viac informácií o <a href="https://www.w3.org/WAI/tutorials/page-structure/content/#lists">sémantických zoznamoch.</a>',
      QA_UPPERCASE_WARNING: 'Nájdené všetky čiapky. Niektoré čítačky obrazovky môžu interpretovať text písaný veľkými písmenami ako skratku a budú čítať každé písmeno samostatne. Okrem toho sa niektorým ľuďom všetky veľké písmená čítajú ťažšie a môže to pôsobiť dojmom, akoby sa kričalo.',
      QA_DUPLICATE_ID: 'Nájdené <strong>duplicitné ID</strong>. Je známe, že chyby duplicitného ID spôsobujú problémy asistenčným technológiám pri pokusoch o interakciu s obsahom. <hr> Odstráňte alebo zmeňte nasledujúce ID: <strong {R}>%(id)</strong>',
      QA_TEXT_UNDERLINE_WARNING: 'Podčiarknutý text sa môže zameniť s odkazmi. Zvážte použitie iného štýlu, napríklad <code>&lt;strong&gt;</code><strong>strong importance</strong><code>&lt;/strong&gt;</code> alebo <code>&lt;em&gt;</code><em>emphasis</em><code>&lt;/em&gt;</code>.',
      QA_SUBSCRIPT_WARNING: 'Možnosti formátovania dolného a horného indexu by sa mali používať len na zmenu pozície textu pre typografické konvencie alebo normy. Nemali by sa <strong>používať</strong> výlučne na účely prezentácie alebo vzhľadu. Formátovanie celých viet spôsobuje problémy s čitateľnosťou. Medzi vhodné prípady použitia by patrilo zobrazovanie exponentov, poradových čísel, ako napríklad 4<sup>th</sup> namiesto fourth, a chemických vzorcov (napr. H<sub>2</sub>O).',
      TABLES_MISSING_HEADINGS: 'Chýbajúce záhlavia tabuliek! Prístupné tabuľky potrebujú značku HTML, ktorá označuje bunky záhlavia a dátové bunky, ktoré definujú ich vzťah. Tieto informácie poskytujú kontext ľuďom, ktorí používajú asistenčné technológie. Tabuľky by sa mali používať len na tabuľkové údaje. <hr> Ďalšie informácie o <a href="https://www.w3.org/WAI/tutorials/tables/">prístupných tabuľkách.</a>',
      TABLES_SEMANTIC_HEADING: 'Sémantické nadpisy, ako napríklad Nadpis 2 alebo Nadpis 3, by sa mali používať len pre časti obsahu; <strong>nie</strong> v tabuľkách HTML. Namiesto toho označte nadpisy tabuliek pomocou prvku <code>&lt;th&gt;</code>. <hr> Ďalšie informácie o <a href="https://www.w3.org/WAI/tutorials/tables/">prístupných tabuľkách.</a>',
      TABLES_EMPTY_HEADING: 'Nájdené prázdne záhlavie tabuľky! Hlavičky tabuliek by <strong>nikdy</strong> nemali byť prázdne. Je dôležité označiť záhlavia riadkov a/alebo stĺpcov, aby sa vyjadril ich vzťah. Tieto informácie poskytujú kontext ľuďom, ktorí používajú asistenčné technológie. Majte na pamäti, že tabuľky by sa mali používať len pre tabuľkové údaje. <hr> Ďalšie informácie o <a href="https://www.w3.org/WAI/tutorials/tables/">prístupných tabuľkách.</a>',
      CONTRAST_ERROR: 'Tento text nie je dostatočne kontrastný s pozadím. Kontrastný pomer by mal byť aspoň 4,5:1 pre normálny text a 3:1 pre veľký text. <hr> <strong {B}>Kontrastný pomer</strong> <strong {B}>%(RATIO)</strong> <strong {R}>%(TEXT)</strong>',
      CONTRAST_WARNING: 'Kontrast tohto textu nie je známy a je potrebné ho manuálne skontrolovať. Uistite sa, že text a pozadie majú výrazne kontrastné farby. Kontrastný pomer by mal byť aspoň 4,5:1 pre normálny text a 3:1 pre veľký text. <hr> Prosím skontrolujte: <strong {W}>%(TEXT)</strong>',
      CONTRAST_INPUT_ERROR: 'Text v tomto vstupe nie je dostatočne kontrastný s pozadím. Kontrastný pomer by mal byť aspoň 4,5:1 pre normálny text a 3:1 pre veľký text. <hr> <strong {B}>Kontrastný pomer</strong> <strong {B}>%(RATIO)</strong>',
    },
  };

  return sk;

}));
