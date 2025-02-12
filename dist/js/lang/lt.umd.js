
/*!
  * Sa11y, the accessibility quality assurance assistant.
  * @version 4.0.8
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
  (global = typeof globalThis !== 'undefined' ? globalThis : global || self, global.Sa11yLangLt = factory());
})(this, (function () { 'use strict';

  /*! WARNING: This is a machine-generated translation and may contain errors or inaccuracies. */
  var lt = {
    // Lithuanian
    strings: {
      LANG_CODE: 'lt',
      MAIN_TOGGLE_LABEL: 'Patikrinkite prieinamumą',
      CONTAINER_LABEL: 'Prieinamumo tikrintuvas',
      ERROR: 'Klaida',
      ERRORS: 'Klaidos',
      WARNING: 'Įspėjimas',
      WARNINGS: 'Įspėjimai',
      GOOD: 'Geras',
      ON: 'įjungta',
      OFF: 'Išjungta',
      ALERT_TEXT: 'Įspėjimas',
      ALERT_CLOSE: 'Uždaryti',
      OUTLINE: 'Apžvalga',
      TITLE: 'Pavadinimas',
      ALT: 'ALT',
      IMAGES: 'Vaizdai',
      EDIT: 'Redaguoti',
      NO_IMAGES: 'Vaizdų nerasta.',
      DECORATIVE: 'Dekoratyvinis',
      MISSING: 'Trūksta',
      PAGE_ISSUES: 'Puslapio problemos',
      SETTINGS: 'Nustatymai',
      DEVELOPER_CHECKS: 'Kūrėjo patikros',
      DEVELOPER_DESC: 'Tikrina problemas, kurioms išspręsti gali prireikti kodavimo žinių, pavyzdžiui, HTML atributus, formas ir kt.',
      DARK_MODE: 'Tamsusis režimas',
      SHORTCUT_SR: 'Pereiti prie klausimo. Spartusis klavišo klavišas: Alt S',
      SKIP_TO_ISSUE: 'Pereiti prie klausimo',
      NEW_TAB: 'Atidaromas naujas skirtukas',
      LINKED: 'Susietas',
      PANEL_HEADING: 'Prieinamumo patikrinimas',
      NO_ERRORS_FOUND: 'Klaidų nerasta.',
      WARNINGS_FOUND: 'rasta įspėjimų.',
      TOTAL_FOUND: 'iš viso rasta problemų.',
      NOT_VISIBLE: 'Elementas, kurį bandote peržiūrėti, nėra matomas; jis gali būti paslėptas arba būti akordeono ar skirtuko komponento viduje. Čia pateikiama peržiūra:',
      MISSING_ROOT: 'Buvo patikrintas viso puslapio prieinamumas, nes tikslinė sritis <code>%(root)</code> neegzistuoja.',
      MISSING_READABILITY_ROOT: 'Skaitymo įvertinimas pagrįstas turinio sritimi <code>%(fallback)</code>, nes tikslinė sritis <code>%(root)</code> neegzistuoja.',
      HEADING_NOT_VISIBLE: 'Antraštė nėra matoma; ji gali būti paslėpta arba akordeono ar skirtuko komponento viduje.',
      SKIP_TO_PAGE_ISSUES: 'Pereiti prie puslapio klausimų',
      CONSOLE_ERROR: 'Atsiprašome, bet šiame puslapyje yra problema su prieinamumo tikrintuvu. Ar galite apie tai <a href="%(link)">pranešti per šią formą</a> arba <a href="%(link)">GitHub</a>?',
      APPEARANCE: 'Išvaizda',
      MOVE_PANEL: 'Perkelti skydelį',

      // Dismiss
      PANEL_DISMISS_BUTTON: 'Rodyti %(dismissCount) atmestų',
      DISMISS: 'Atmesti',
      DISMISS_ALL: 'Atmesti visus',
      DISMISSED: 'Atmestas',
      DISMISS_REMINDER: 'Atkreipkite dėmesį, kad įspėjimai yra tik <strong>laikinai</strong> atmesti. Ištrynus naršymo istoriją ir slapukus, bus atkurtas visas anksčiau atmestas įspėjimas visose puslapiuose.',

      // Export
      DATE: 'Data',
      PAGE_TITLE: 'Puslapio pavadinimas',
      RESULTS: 'Rezultatai',
      EXPORT_RESULTS: 'Eksportuoti rezultatus',
      GENERATED: 'Rezultatai sugeneruoti su %(tool).',
      PREVIEW: 'Peržiūra',
      ELEMENT: 'Elementas',
      PATH: 'Kelias',

      // Colour filters
      COLOUR_FILTER: 'Spalvų filtras',
      PROTANOPIA: 'Protanopia',
      DEUTERANOPIA: 'Deuteranopija',
      TRITANOPIA: 'Tritanopia',
      MONOCHROMACY: 'Vienspalviai',
      COLOUR_FILTER_MESSAGE: 'Patikrinkite, ar nėra elementų, kuriuos sunku pastebėti arba atskirti nuo kitų spalvų.',
      RED_EYE: 'Raudonas aklasis.',
      GREEN_EYE: 'Žaliosios žaliosios aklės.',
      BLUE_EYE: 'Mėlyna aklina.',
      MONO_EYE: 'Raudonas, mėlynas ir žalias aklasis.',
      COLOUR_FILTER_HIGH_CONTRAST: 'Spalviniai filtrai neveikia didelio kontrasto režimu.',

      // Alternative text stop words
      SUS_ALT_STOPWORDS: [
        'vaizdas',
        'grafinis',
        'paveikslėlis',
        'nuotrauka',
        'photo',
        'image',
        'graphic',
      ],
      PLACEHOLDER_ALT_STOPWORDS: [
        'alt',
        'vaizdas',
        'nuotrauka',
        'dekoratyvinis',
        'nuotrauka',
        'vietoj',
        'vietoj paveikslėlio',
        'tarpinė',
        'photo',
        'image',
        'graphic',
      ],
      PARTIAL_ALT_STOPWORDS: [
        'spustelėkite',
        'spauskite čia',
        'spausdami čia',
        'spauskite čia, kad sužinotumėte daugiau',
        'spustelėkite čia, kad sužinotumėte daugiau',
        'patikrinkite',
        'išsamiai aprašyta čia',
        'atsisiųsti',
        'atsisiųsti čia',
        'sužinoti',
        'sužinokite daugiau',
        'sužinoti daugiau',
        'forma',
        'čia',
        'informacija',
        'nuoroda',
        'mokytis',
        'išmokti',
        'daugiau',
        'puslapis',
        'popierius',
        'skaityti daugiau',
        'skaityti',
        'perskaitykite tai',
        'šis',
        'šiame puslapyje',
        'ši svetainė',
        'šioje svetainėje',
        'peržiūrėti',
        'peržiūrėti mūsų',
        'svetainė',
      ],
      CLICK: ['click', 'spustelėkite'],
      NEW_WINDOW_PHRASES: [
        'išorinis',
        'naujas skirtukas',
        'naujas langas',
        'iššokantis',
        'iššokti',
      ],
      FILE_TYPE_PHRASES: ['dokumentas', 'skaičiuoklė', 'skaičiuoklė', 'suspausta rinkmena', 'archyvuota rinkmena', 'darbalapis', 'powerpoint', 'prezentacija', 'įdiegti', 'vaizdo įrašas', 'garsas', 'pdf'],

      // Readability
      READABILITY: 'Įskaitomumas',
      AVG_SENTENCE: 'Vidutinis žodžių skaičius sakinyje:',
      COMPLEX_WORDS: 'Sudėtiniai žodžiai:',
      TOTAL_WORDS: 'Žodžiai:',
      VERY_DIFFICULT: 'Labai sunku',
      DIFFICULT: 'Sudėtinga',
      FAIRLY_DIFFICULT: 'Gana sudėtinga',
      READABILITY_NO_CONTENT: 'Nepavyksta apskaičiuoti skaitomumo balo. Nerastas nei paragrafas <code>&lt;p&gt;</code>, nei sąrašo turinys <code>&lt;li&gt;</code>.',
      READABILITY_NOT_ENOUGH: 'Nepakankamai turinio, kad būtų galima apskaičiuoti skaitomumo balą.',

      // Headings
      HEADING_SKIPPED_LEVEL: 'Antraštės neturėtų praleisti lygių arba peršokti nuo <strong>Antraštės %(PREV_LEVEL)</strong> prie <strong {C}>Antraštės %(LEVEL)</strong>, nes tai sutrikdo turinio tvarką ir hierarchiją, todėl sunkiau sekti. <hr> Jei <strong {C}>%(HEADING)</strong> patenka į <strong>%(PREV_HEADING)</strong> skyrių, apsvarstykite galimybę formatuoti ją kaip <strong>Antraštė %(LEVEL)</strong>.',
      HEADING_EMPTY: 'Rasta tuščia antraštė! Norėdami ištaisyti, ištrinkite šią eilutę arba pakeiskite jos formatą iš <strong {C}>Heading %(level)</strong> į <strong>Normal</strong> arba <strong>Paragraph</strong>.',
      HEADING_LONG: 'Antraštė ilga! Antraštės turėtų būti naudojamos turiniui tvarkyti ir struktūrai perteikti. Jos turėtų būti trumpos, informatyvios ir unikalios. Prašome, kad antraštės būtų trumpesnės nei %(MAX_LENGTH) ženklų (ne ilgesnės nei sakinys). <hr> <strong {B}>%(HEADING_LENGTH) Ženklai</strong>',
      HEADING_FIRST: 'Pirmoji puslapio antraštė paprastai turėtų būti 1 arba 2 antraštė. 1 antraštė turėtų būti pagrindinio turinio skyriaus pradžia ir yra pagrindinė antraštė, apibūdinanti bendrą puslapio tikslą. Sužinokite daugiau apie <a href="https://www.w3.org/WAI/tutorials/page-structure/headings/">Galvutės struktūrą.</a>',
      HEADING_MISSING_ONE: 'Trūksta 1 antraštės. 1 antraštė turėtų būti pagrindinės turinio srities pradžia ir yra pagrindinė antraštė, apibūdinanti bendrą puslapio tikslą. Sužinokite daugiau apie <a href="https://www.w3.org/WAI/tutorials/page-structure/headings/">Pavadinimų struktūrą.</a>',
      HEADING_EMPTY_WITH_IMAGE: 'Antraštėje nėra teksto, bet yra paveikslėlis. Jei tai nėra antraštė, pakeiskite jos formatą iš <strong {C}>Heading %(level)</strong> į <strong>Normal</strong> arba <strong>Paragraph</strong>. Kitu atveju pridėkite paveikslėlio alt tekstą, jei jis nėra dekoratyvinis.',
      PANEL_HEADING_MISSING_ONE: 'Trūksta 1 antraštės!',
      PANEL_NO_HEADINGS: 'Antraščių nerasta.',

      // Links
      LINK_EMPTY: 'Pašalinkite tuščias nuorodas be jokio teksto.',
      LINK_EMPTY_LABELLEDBY: 'Nuoroda turi <code>aria-labelledby</code> reikšmę, kuri yra tuščia arba neatitinka kito puslapio elemento atributo <code>id</code> reikšmės.',
      LINK_EMPTY_NO_LABEL: 'Nuorodoje nėra įskaitomo teksto, kuris būtų matomas ekrano skaitytuvams ir kitoms pagalbinėms technologijoms. Ištaisyti: <ul><li>Pridėkite glaustą tekstą, kuriame būtų aprašyta, kur nuoroda veda.</li><li>Jeigu tai yra <a href="https://a11y-101.com/development/icons-and-links">paveiksliuko arba SVG nuoroda,</a> greičiausiai trūksta aprašomosios etiketės.</li><li>Jeigu manote, kad ši nuoroda yra klaida dėl kopijavimo ir įkėlimo klaidos, apsvarstykite galimybę ją ištrinti.</li></ul>',
      LINK_STOPWORD: 'Nuorodos tekstas gali būti nepakankamai aiškus be konteksto: <strong {C}>%(ERROR)</strong>',
      LINK_STOPWORD_ARIA: 'Nors buvo pateiktas prieinamas pavadinimas, apsvarstykite galimybę peržiūrėti matomą nuorodos tekstą. Tokios frazės kaip &quot;<strong {C}>%(ERROR)</strong>&quot; nėra prasmingos.',
      LINK_TIP: '<hr> <strong>Patarimas!</strong> Naudokite aiškų ir unikalų nuorodos tekstą, kuris apibūdintų nuorodos tikslą, paprastai – puslapio ar dokumento pavadinimą.',
      LINK_CLICK_HERE: 'Frazė "spustelėkite" arba "spustelėkite čia" sutelkia dėmesį į pelės mechaniką, nors daugelis žmonių nenaudoja pelės arba gali žiūrėti šią svetainę mobiliuoju įrenginiu. Apsvarstykite kito, su užduotimi susijusio veiksmažodžio naudojimą.',
      DUPLICATE_TITLE: 'Nuorodų ir paveikslėlių atributas <code>title</code> yra skirtas pateikti papildomą informaciją ir turėtų būti <strong>skirtingas</strong> nei tekstas ar alt tekstas. Pavadinimo tekstas rodomas, kai pelės žymeklis užvedamas ant elemento, bet nepasiekiamas klaviatūra ar lietimui jautriu įvestimi. Apsvarstykite <a href="https://www.a11yproject.com/posts/title-attributes/">visai atsisakyti title atributo.</a>',
      LINK_SYMBOLS: 'Venkite naudoti simbolius kaip kvietimą veikti nuorodos tekste, nebent jie yra paslėpti nuo pagalbinių technologijų. Ekrano skaitytuvai gali garsiai perskaityti simbolius, o tai gali būti klaidinantis. Apsvarstykite jų pašalinimą: <strong {C}>%(ERROR)</strong>',
      LINK_URL: 'Ilgesni, mažiau suprantami URL adresai, naudojami kaip nuorodos tekstas, gali būti sunkiai suprantami naudojantis pagalbinėmis technologijomis. Daugeliu atvejų vietoj URL adreso geriau naudoti žmogui suprantamą tekstą. Trumpi URL adresai (pavyzdžiui, svetainės pagrindinis puslapis) yra tinkami.',
      LINK_DOI: 'Interneto puslapiuose arba tik internete esančiuose ištekliuose <a href="https://apastyle.apa.org/style-grammar-guidelines/paper-format/accessibility/urls#:~:text=descriptive%20links">APA stiliaus vadove</a> rekomenduojama naudoti aprašomąsias nuorodas, aplink kūrinio pavadinimą nurodant jo URL arba DOI. Ilgesni, mažiau suprantami URL adresai, naudojami kaip nuorodos tekstas, gali būti sunkiai suprantami naudojantis pagalbinėmis technologijomis.',
      LINK_NEW_TAB: 'Nuoroda atsidaro naujame skirtuke arba lange be įspėjimo. Tai gali trikdyti, ypač žmones, kuriems sunku suvokti vaizdinį turinį. Antra, ne visada yra gera praktika kontroliuoti kieno nors patirtį ar priimti sprendimus už jį. Nuorodos tekste nurodykite, kad nuoroda atidaroma naujame lange. <hr> <strong>Tipas!</strong> Išmokite geriausios praktikos: <a href="https://www.nngroup.com/articles/new-browser-windows-and-tabs/">atidaryti nuorodas naujuose naršyklės languose ir skirtukuose.</a>',
      LINK_FILE_EXT: 'Nuoroda nukreipia į PDF arba atsisiunčiamą failą (pvz., MP3, Zip, "Word" dokumentą) be įspėjimo. Nuorodos tekste nurodykite failo tipą. Jei tai didelis failas, apsvarstykite galimybę nurodyti failo dydį. <hr> <strong>Pavyzdys:</strong> Vykdomoji ataskaita (PDF, 3 MB)',
      LINK_IDENTICAL_NAME: 'Nuoroda turi tokį patį tekstą kaip ir kita nuoroda, nors nukreipia į kitą puslapį. Kelios nuorodos su tuo pačiu tekstu gali klaidinti ekrano skaitytuvus naudojančius žmones. <strong>Pagalvokite, ar nevertėtų šios nuorodos aprašyti labiau, kad ją būtų lengviau atskirti nuo kitų nuorodų.</strong> <hr> <strong {B}>Prieinamas pavadinimas</strong> <strong {C}>%(TEXT)</strong>',

      // Images
      MISSING_ALT_LINK_HAS_TEXT: 'Paveikslas naudojamas kaip nuoroda su aplinkiniu tekstu, nors atributas alt turėtų būti pažymėtas kaip dekoratyvinis arba nulinis.',
      MISSING_ALT_LINK: 'Paveiksliukas naudojamas kaip nuoroda, bet nėra teksto alt! Užtikrinkite, kad alt tekste būtų aprašyta, kur nukreipia nuoroda.',
      MISSING_ALT: 'Trūksta alt teksto! Jei paveikslėlis perteikia istoriją, nuotaiką ar svarbią informaciją, būtinai jį aprašykite.',
      LINK_ALT_FILE_EXT: 'Rastas failo plėtinys alt tekste. Užtikrinkite, kad alt tekstas apibūdintų nuorodos paskirties vietą, o ne pažodinį paveikslėlio aprašymą. Pašalinti: <strong {C}>%(ERROR)</strong>.<hr> {ALT} {L} <strong {C}>%(ALT_TEXT)</strong>',
      LINK_PLACEHOLDER_ALT: 'Rastas ne aprašomasis arba pakaitinis alt tekstas susietame paveikslėlyje. Užtikrinkite, kad alt tekstas apibūdintų nuorodos paskirties vietą, o ne pažodinį paveikslėlio aprašymą. Pakeiskite šį alt tekstą. <hr> {ALT} {L} <strong {C}>%(ALT_TEXT)</strong>',
      LINK_SUS_ALT: 'Pagalbinėse technologijose jau nurodoma, kad tai yra paveikslėlis, todėl &quot;<strong {C}>%(ERROR)</strong>&quot; gali būti nereikalingas. Užtikrinkite, kad alt tekstas apibūdintų nuorodos paskirties vietą, o ne pažodinį paveikslėlio aprašymą. <hr> {ALT} {L} <strong {C}>%(ALT_TEXT)</strong>',
      ALT_FILE_EXT: 'Rastas failo plėtinys alt tekste. Jei vaizdas perteikia istoriją, nuotaiką ar svarbią informaciją, būtinai aprašykite vaizdą. Pašalinti: <strong {C}>%(ERROR)</strong> <hr> {ALT} <strong {C}>%(ALT_TEXT)</strong>',
      ALT_PLACEHOLDER: 'Rastas neaprašytas arba pakaitinis alt tekstas. Pakeiskite šį alt tekstą į prasmingesnį. <hr> {ALT} <strong {C}>%(ALT_TEXT)</strong>',
      SUS_ALT: 'Pagalbinėse technologijose jau nurodoma, kad tai yra paveikslėlis, todėl &quot;<strong {C}>%(ERROR)</strong>&quot; gali būti nereikalingas. <hr> {ALT} <strong {C}>%(ALT_TEXT)</strong>',
      LINK_IMAGE_NO_ALT_TEXT: 'Nuorodoje esantis paveikslėlis pažymėtas kaip dekoratyvinis, o nuorodos teksto nėra. Prie paveikslėlio pridėkite alt tekstą, kuriame būtų aprašyta nuorodos paskirtis.',
      LINK_IMAGE_TEXT: 'Paveikslas pažymėtas kaip dekoratyvinis, nors nuorodoje aplinkinis tekstas naudojamas kaip aprašomoji etiketė.',
      LINK_IMAGE_LONG_ALT: 'Susieto paveikslėlio Alt teksto aprašymas yra <strong>per ilgas</strong>. Susietų paveikslėlių alt tekstas turėtų apibūdinti, kur nukreipia nuoroda, o ne pažodinis paveikslėlio aprašymas. <strong>Svarstykite galimybę kaip alt tekstą naudoti puslapio, į kurį nukreipia nuoroda, pavadinimą.</strong> <hr> {ALT} {L} <strong {B}>%(altLength) Ženklai</strong> <strong {C}>%(ALT_TEXT)</strong>',
      LINK_IMAGE_ALT: 'Paveikslėlio nuorodoje yra teksto alt. <strong>Ar alt tekste aprašoma, kur nukreipia nuoroda?</strong> Apsvarstykite galimybę kaip alt tekstą naudoti puslapio, į kurį nukreipia nuoroda, pavadinimą. <hr> {ALT} {L} <strong {C}>%(ALT_TEXT)</strong>',
      LINK_IMAGE_ALT_AND_TEXT: 'Paveikslėlio nuorodoje yra <strong>ir alt tekstas, ir aplink esantis nuorodos tekstas.</strong> Jei šis paveikslėlis yra dekoratyvinis ir naudojamas kaip funkcinė nuoroda į kitą puslapį, apsvarstykite galimybę pažymėti paveikslėlį kaip dekoratyvinį arba nulinį - aplink esančio nuorodos teksto turėtų pakakti. <hr> {ALT} <strong {C}>%(ALT_TEXT)</strong> <hr> <strong {B}>Prieinamas pavadinimas</strong> {L} <strong {C}>%(TEXT)</strong>',
      IMAGE_FIGURE_DECORATIVE: 'Vaizdas pažymėtas kaip <strong>dekoratyvinis</strong>, todėl pagalbinės technologijos jį ignoruos. <hr> Nors buvo pateikta <strong>antrašė</strong>, daugeliu atvejų paveikslėlis taip pat turėtų turėti alt tekstą. <ul><li>Alt tekste turėtų būti glaustai aprašyta, kas yra paveikslėlyje.</li><li>Paprastai antraštėje turėtų būti pateiktas kontekstas, kad paveikslėlis būtų susietas su aplinkiniu turiniu, arba atkreiptas dėmesys į tam tikrą informaciją.</li></ul>Sužinokite daugiau: <a href="https://thoughtbot.com/blog/alt-vs-figcaption#the-figcaption-element">alt versus figcaption.</a>',
      IMAGE_FIGURE_DUPLICATE_ALT: 'Nenaudokite tų pačių žodžių ir alt, ir antraštės tekstui. Ekrano skaitytuvai informaciją skelbs du kartus. <ul><li>Alt tekste turėtų būti glaustai aprašyta, kas yra paveikslėlyje.</li><li>Tapatybėje paprastai turėtų būti pateiktas kontekstas, kad paveikslėlis būtų susietas su aplinkiniu turiniu arba atkreiptas dėmesys į tam tikrą informaciją.</li></ul> Sužinokite daugiau: <a href="https://thoughtbot.com/blog/alt-vs-figcaption#the-figcaption-element">alt versus figcaption.</a> <hr> {ALT} <strong {C}>%(ALT_TEXT)</strong>',
      IMAGE_DECORATIVE: 'Vaizdas pažymėtas kaip <strong>dekoratyvinis</strong>, todėl pagalbinės technologijos jį ignoruos. Jei vaizdas perteikia istoriją, nuotaiką ar svarbią informaciją - būtinai pridėkite alt tekstą.',
      IMAGE_DECORATIVE_CAROUSEL: 'Vaizdas pažymėtas kaip dekoratyvinis, tačiau visi karuselėje ar galerijoje esantys vaizdai turėtų turėti aprašomąjį alternatyvų tekstą, kad būtų užtikrinta vienoda patirtis visiems.',
      IMAGE_ALT_TOO_LONG: 'Alt teksto aprašymas yra <strong>per ilgas</strong>. Alt tekstas turėtų būti glaustas, bet prasmingas, kaip <em>tweet</em> (apie 100 simbolių). Jei tai sudėtingas paveikslėlis arba grafikas, apsvarstykite galimybę ilgą paveikslėlio aprašymą pateikti žemiau esančiame tekste arba akordeono komponente. <hr> {ALT} <strong {B}>%(altLength) Ženklai</strong> <strong {C}>%(ALT_TEXT)</strong>',
      IMAGE_PASS: '{ALT} %(ALT_TEXT)',

      // Form labels
      LABELS_MISSING_IMAGE_INPUT: 'Nėra paveikslėlio mygtuko alt teksto. Pridėkite alt tekstą ir pateikite prieinamą pavadinimą. Pavyzdžiui: <em>Ieškoti</em> arba <em>Pateikti</em>.',
      LABELS_INPUT_RESET: 'Atstatymo mygtukai turėtų būti <strong>nenaudojami, nebent jų specialiai reikia, nes juos lengva įjungti per klaidą. <hr> <strong>Tipas!</strong> Sužinokite, kodėl <a href="https://www.nngroup.com/articles/reset-and-cancel-buttons/">Mygtukai "Reset" ir "Cancel" kelia patogumo problemų.</a>',
      LABELS_ARIA_LABEL_INPUT: 'Įvestis turi prieinamą pavadinimą, tačiau užtikrinkite, kad būtų matoma ir etiketė. <hr> <strong {B}>Prieinamas pavadinimas</strong> <strong {C}>%(TEXT)</strong>',
      LABELS_NO_FOR_ATTRIBUTE: 'Su šia įvestimi nėra susieta jokia etiketė. Pridėkite <code>for</code> atributą prie etiketės, atitinkančios šios įvesties <code>id</code>. <hr> <strong {B}>ID</strong> <strong {C}>#%(id)</strong>',
      LABELS_MISSING_LABEL: 'Su šia įvestimi nėra susieta jokia etiketė. Pridėkite <code>id</code> prie šios įvesties ir pridėkite atitinkamą <code>for</code> atributą prie etiketės.',
      LABELS_PLACEHOLDER: 'Dingstantis vietos laikiklio tekstas apsunkina žmonėms atsiminti, kokia informacija priklauso laukeliui, ir nustatyti bei ištaisyti galiojimo problemas. Vietoj to, apsvarstykite galimybę naudoti nuolat matomą užuominą prieš formos laukelį. <hr> Sužinokite daugiau: <a href="https://www.nngroup.com/articles/form-design-placeholders/">Vietos laikikliai formų laukeliuose yra žalingi.</a>',

      // Embedded content
      EMBED_VIDEO: 'Užtikrinkite, kad <strong>visuose vaizdo įrašuose būtų uždaros antraštės.</strong> Visų garso ir vaizdo įrašų titrų pateikimas yra privalomas A lygio reikalavimas. Titrai padeda kurtiesiems ir neprigirdintiesiems.',
      EMBED_AUDIO: 'Užtikrinkite, kad pateiktumėte <strong>visų podkastų transkripciją.</strong> Garso turinio transkripcijų pateikimas yra privalomas A lygio reikalavimas. Transkripcijos padeda kurtiesiems ir neprigirdintiesiems, tačiau jos gali būti naudingos visiems. Apsvarstykite galimybę transkripciją pateikti žemiau arba akordeono skydelyje.',
      EMBED_DATA_VIZ: 'Tokie duomenų vizualizavimo valdikliai dažnai kelia problemų žmonėms, kurie naudojasi klaviatūra arba ekrano skaitytuvu, ir gali kelti didelių sunkumų silpnaregiams arba spalvinio aklumo žmonėms. Rekomenduojama tą pačią informaciją pateikti alternatyviu (teksto arba lentelės) formatu po valdikliu. <hr> Sužinokite daugiau apie <a href="https://www.w3.org/WAI/tutorials/images/complex">sudėtingus vaizdus.</a>',
      EMBED_MISSING_TITLE: 'Įterptajam turiniui reikalingas prieinamas pavadinimas, apibūdinantis jo turinį. Elemente <code>iframe</code> nurodykite unikalų <code>title</code> arba <code>aria-label</code> atributą. Sužinokite daugiau apie <a href="https://web.dev/learn/accessibility/more-html#iframes">iRėmus.</a>.',
      EMBED_GENERAL: 'Nepavyksta patikrinti įterpto turinio. Įsitikinkite, kad paveikslėliuose yra "alt" tekstas, vaizdo įrašuose - antraštės, tekstas pakankamai kontrastingas, o interaktyvūs komponentai yra <a href="https://webaim.org/techniques/keyboard/">prieinami klaviatūra.</a>',
      EMBED_UNFOCUSABLE: '<code>&lt;iframe&gt;</code> su elementais, į kuriuos negalima sutelkti dėmesio, neturėtų turėti <code>tabindex="-1"</code>. Įterptasis turinys nebus pasiekiamas naudojant klaviatūrą.',

      // QA
      QA_BAD_LINK: 'Rasta bloga nuoroda. Atrodo, kad nuoroda nukreipia į kūrimo aplinką. <hr> {L} <strong {C}>%(LINK)</strong>',
      QA_IN_PAGE_LINK: 'Nugriautas tos pačios puslapio nuorodas. Nuorodos tikslas nesutampa su jokiu šios puslapio elementu.',
      QA_STRONG_ITALICS: 'Paryškinimo ir kursyvo žymės turi semantinę reikšmę ir neturėtų būti naudojamos <strong>ne</strong> ištisoms pastraipoms paryškinti. Paryškintas tekstas turėtų būti naudojamas stipriai <strong>pabrėžti</strong> žodį ar frazę. Kursyvu reikėtų paryškinti tikruosius vardus (t. y. knygų ir straipsnių pavadinimus), svetimžodžius, kabutes. Ilgos citatos turėtų būti formatuojamos kaip blokinė citata.',
      QA_PDF: 'Nepavyksta patikrinti PDF failų prieinamumo. PDF yra laikomi žiniatinklio turiniu, todėl jie taip pat turi būti prieinami. PDF dažnai kyla problemų žmonėms, kurie naudojasi ekrano skaitytuvais (trūksta struktūrinių žymų arba formos laukų etikečių), ir silpnaregiams (padidinus tekstą, jis neatsinaujina). <ul><li>Jei tai yra forma, apsvarstykite galimybę kaip alternatyvą naudoti prieinamą HTML formą.</li><li>Jei tai yra dokumentas, apsvarstykite galimybę jį konvertuoti į tinklalapį.</li></ul>Kitu atveju patikrinkite <a href="https://helpx.adobe.com/acrobat/using/create-verify-pdf-accessibility.html">PDF prieinamumą programoje Acrobat DC.</a>',
      QA_DOCUMENT: 'Nepavyksta patikrinti dokumento prieinamumo. Susieti dokumentai laikomi žiniatinklio turiniu ir taip pat turi būti prieinami. Prašome peržiūrėti šį dokumentą rankiniu būdu. <ul><li>Padarykite savo <a href="https://support.google.com/docs/answer/6199477?hl=lt">Google Workspace dokumentą arba pristatymą prieinamesnį.</a></li><li>Padarykite savo <a href="https://support.microsoft.com/lt/office/create-accessible-office-documents-868ecfcd-4f00-4224-b881-a65537a7c155">Office dokumentus prieinamesnius.</a></li></ul>',
      QA_BLOCKQUOTE: 'Ar tai antraštė? <strong {C}>%(TEXT)</strong> <hr> Blokinės kabutės turėtų būti naudojamos tik citatoms. Jei tai turi būti antraštė, pakeiskite šią blokinę kabutę į semantinę antraštę (pvz., 2 arba 3 antraštę).',
      QA_FAKE_HEADING: 'Ar tai antraštė? <strong {C}>%(TEXT)</strong> <hr> Paryškinto ar didelio teksto eilutė gali atrodyti kaip antraštė, tačiau ekrano skaitytuvu besinaudojantis žmogus negali pasakyti, kad ji yra svarbi, arba pereiti prie jos turinio. Paryškintas ar didelis tekstas niekada neturėtų pakeisti semantinių antraščių (nuo 2 iki 6 antraštės).',
      QA_FAKE_LIST: 'Ar bandote sudaryti sąrašą? Rastas galimas sąrašo elementas: <strong {C}>%(firstPrefix)</strong> <hr> Įsitikinkite, kad naudojate semantinius sąrašus, vietoj jų naudodami kulkų arba skaičių formatavimo mygtukus. Naudojant semantinį sąrašą pagalbinės technologijos gali perteikti tokią informaciją, kaip bendras elementų skaičius ir kiekvieno elemento santykinė padėtis sąraše. Sužinokite daugiau apie <a href="https://www.w3.org/WAI/tutorials/page-structure/content/#lists">semantinius sąrašus.</a>.',
      QA_UPPERCASE: 'Rastos visos didžiosios raidės. Kai kurie ekrano skaitytuvai tekstą visomis didžiosiomis raidėmis gali interpretuoti kaip akronimą ir skaityti kiekvieną raidę atskirai. Be to, kai kurie žmonės mano, kad visos didžiosios raidės yra sunkiau įskaitomos, ir tai gali sudaryti šauksmo įspūdį.',
      QA_UNDERLINE: 'Pabrauktą tekstą galima supainioti su nuorodomis. Apsvarstykite galimybę naudoti kitą stilių, pavyzdžiui, <code>&lt;strong&gt;</code><strong>strong svarba</strong><code>&lt;/strong&gt;</code> arba <code>&lt;em&gt;</code><em>pabrėžimas</em><code>&lt;/em&gt;</code>.',
      QA_SUBSCRIPT: 'Subskripcijos ir superskripcijos formatavimo parinktys turėtų būti naudojamos tik teksto padėčiai pakeisti dėl tipografinių susitarimų ar standartų. Jos neturėtų būti <strong>nenaudojamos</strong> tik pateikimo ar išvaizdos tikslais. Formatuojant ištisus sakinius kyla skaitomumo problemų. Tinkami naudojimo atvejai būtų eksponentų, eilės numerių, pavyzdžiui, 4<sup>th</sup> vietoj fourth, ir cheminių formulių (pvz., H<sub>2</sub>O) rodymas.',
      QA_NESTED_COMPONENTS: 'Venkite interaktyvių išdėstymo komponentų įdėjimo į vieną kitą, pavyzdžiui, akordeonų įdėjimo į skirtukus arba skirtukų įdėjimo į akordeonus. Tai gali sudėtinginti navigaciją, padidinti kognityvinę apkrovą ir sukelti turinio ignoravimą.',
      QA_JUSTIFY: 'Venkite naudoti lygiuotą tekstą, kuris sulygiuotas tiek prie kairiojo, tiek prie dešiniojo krašto. Tai gali būti sunkiai skaitoma dėl nevienodų tarpų tarp žodžių. Naudokite kairiuoju kraštu sulygiuotą tekstą, kad užtikrintumėte geresnį skaitomumą.',
      QA_SMALL_TEXT: 'Mažas tekstas yra sunkiau skaitomas, ypač žmonėms, turintiems silpną regėjimą. Siekiant geresnio skaitomumo, venkite naudoti šrifto dydžių, mažesnių už numatytąjį.',

      // Shared
      ACC_NAME: '<strong {B}>Prieinamas pavadinimas</strong> %(TEXT)',
      ACC_NAME_TIP: '<hr><strong>Patarimas!</strong> "Prieinamas pavadinimas" yra galutinis etiketas, kuris perduodamas žmonėms, naudojantiems pagalbines technologijas, ir skaičiuojamas ARIA. Tai padeda jiems suprasti nuorodos ar mygtuko tikslą.',
      HIDDEN_FOCUSABLE: 'Saites vai pogas atribūtam ir <code>aria-hidden=&quot;true&quot;</code>, bet tas ir joprojām fokusējams no tastatūras. Ja jūs vēlaties paslēpt dublējošu saiti vai pogu, pievienojiet arī <code>tabindex=&quot;-1&quot;</code>. Pretējā gadījumā <code>aria-hidden=&quot;true&quot;</code> nedrīkst izmantot elementiem, kas var saņemt fokusu. <hr> Uzziniet vairāk par <a href="https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/Attributes/aria-hidden">aria-hidden atribūtu.</a>',

      // Developer
      DUPLICATE_ID: 'Rastas <strong>dvigubas ID</strong>. Yra žinoma, kad pasikartojančio ID klaidos sukelia problemų pagalbinėms technologijoms, kai jos bando sąveikauti su turiniu. Prašome pašalinti arba pakeisti šį ID. <hr> <strong {B}>ID</strong> <strong {C}>#%(id)</strong>',
      UNCONTAINED_LI: 'Visi <code>&lt;li&gt;</code> sąrašo elementai turi būti įdėti į <code>&lt;ul&gt;</code> nesurūšiuotus arba <code>&lt;ol&gt;</code> surūšiuotus elementus. Ši struktūra padeda ekranų skaitytuvams tiksliai paskelbti sąrašą ir jo elementus.',
      TABINDEX_ATTR: 'Elementas neturėtų turėti <code>tabindex</code> atributo, didesnio nei 0.',

      // Meta checks
      META_LANG: 'Puslapio kalba nedeklaruota! Prašome <a href="https://www.w3.org/International/questions/qa-html-language-declarations">deklaruoti kalbą HTML žymėje.</a>',
      META_TITLE: 'Trūksta puslapio pavadinimo! Pateikite <a href="https://developer.mozilla.org/lt/docs/Web/HTML/Element/title">puslapio pavadinimą.</a>',
      META_SCALABLE: 'Pašalinkite <code>user-scalable="no"</code> parametrą iš <a href="https://developer.mozilla.org/en-US/docs/Web/HTML/Viewport_meta_tag">meta žymos vaizde</a>, kad būtų galima priartinti.',
      META_MAX: 'Įsitikinkite, kad <code>maximum-scale</code> parametras <a href="https://developer.mozilla.org/en-US/docs/Web/HTML/Viewport_meta_tag">meta žymos vaizde</a> nėra mažesnis nei 2.',
      META_REFRESH: 'Puslapis neturėtų automatiškai atsinaujinti naudojant meta žymę.',

      // Buttons
      BTN_EMPTY: 'Mygtukas neturi prieinamo pavadinimo, kuris apibūdina jo paskirtį.',
      BTN_EMPTY_LABELLEDBY: 'Mygtukas turi <code>aria-labelledby</code> vertę, kuri yra tuščia arba nesutampa su kito puslapio elemento <code>id</code> verte.',
      BTN: 'mygtukas',
      BTN_TIP: 'Sužinokite, kaip sukurti <a href="https://www.sarasoueidan.com/blog/accessible-icon-buttons/">prieinamą mygtuką.</a>',
      BTN_ROLE_IN_NAME: 'Nepalikite žodžio „mygtukas“ mygtuko pavadinime. Ekrano skaitytuvai jau praneša elemento vaidmenį be jo pavadinimo.',
      LABEL_IN_NAME: 'Matomas šio elemento tekstas atrodo skirtingas nei prieinamas pavadinimas, kas gali sukelti painiavą pagalbinių technologijų naudotojams. Peržiūrėkite: <hr> <strong {B}>Prieinamas Pavadinimas</strong> <strong {C}>%(TEXT)</strong>',

      // Tables
      TABLES_MISSING_HEADINGS: 'Trūksta lentelių antraščių! Prieinamoms lentelėms reikia HTML žymėjimo, kuris nurodo antraštės langelius ir duomenų langelius, apibrėžiančius jų ryšį. Ši informacija suteikia kontekstą žmonėms, kurie naudojasi pagalbinėmis technologijomis. Lentelės turėtų būti naudojamos tik lentelėms su duomenimis. <hr> Sužinokite daugiau apie <a href="https://www.w3.org/WAI/tutorials/tables/">prieinamas lenteles.</a>',
      TABLES_SEMANTIC_HEADING: 'Semantinės antraštės, pavyzdžiui, Heading 2 arba Heading 3, turėtų būti naudojamos tik turinio skyriams; <strong>ne</strong> HTML lentelėse. Vietoj to lentelių antraštes nurodykite naudodami elementą <code>&lt;th&gt;</code>. <hr> Sužinokite daugiau apie <a href="https://www.w3.org/WAI/tutorials/tables/">prieinamas lenteles.</a>',
      TABLES_EMPTY_HEADING: 'Rasta tuščia lentelės antraštė! Lentelės antraštės <strong>niekada</strong> neturėtų būti tuščios. Svarbu nurodyti eilučių ir (arba) stulpelių antraštes, kad būtų išreikštas jų ryšys. Ši informacija suteikia kontekstą žmonėms, kurie naudojasi pagalbinėmis technologijomis. Atminkite, kad lentelės turėtų būti naudojamos tik lentelėms su lentelių duomenimis. <hr> Sužinokite daugiau apie <a href="https://www.w3.org/WAI/tutorials/tables/">prieinamas lenteles.</a>',

      // Contrast
      CONTRAST_ERROR: 'Tekstui trūksta pakankamo kontrasto su fonu, todėl jį sunku skaityti.',
      CONTRAST_WARNING: 'Šio teksto kontrastas yra nežinomas ir reikia jį patikrinti rankiniu būdu. Įsitikinkite, kad tekstas ir fonas turi stiprų kontrastą.',
      CONTRAST_ERROR_GRAPHIC: 'Grafika neturi pakankamai kontrasto su fonu, todėl ją sunkiau matyti.',
      CONTRAST_WARNING_GRAPHIC: 'Šios grafikos kontrastas yra nežinomas ir reikia ją patikrinti rankiniu būdu. Įsitikinkite, kad grafika ir fonas turi stiprų kontrastą.',
      CONTRAST_OPACITY: 'Padidinkite nepralaidumą, kad pagerintumėte matomumą.',
      CONTRAST_APCA: 'Šio kontrasto nepakanka bet kokiam teksto dydžiui. Apsvarstykite galimybę naudoti šią spalvą ir teksto dydžio kombinaciją?',
      CONTRAST_COLOR: 'Apsvarstykite galimybę naudoti šią spalvą vietoje?',
      CONTRAST_SIZE: 'Apsvarstykite galimybę padidinti teksto dydį šiai spalvų kombinacijai?',
      CONTRAST_PLACEHOLDER: 'Šio įvesties laukelio užpildymo tekstas neturi pakankamo kontrasto su fonu, todėl sunku jį perskaityti.',
      CONTRAST_INPUT: 'Šio įvesties laukelio tekstas neturi pakankamo kontrasto su fonu, todėl sunku jį perskaityti.',
      CONTRAST: 'Kontrastas',
      UNKNOWN: 'Nežinomas',
      LARGE_TEXT: 'Didelis tekstas',
      BODY_TEXT: 'Teksto kūnas',
      FG: 'Priekinis planas',
      BG: 'Fonas',
      NON_TEXT: 'Ne-tekstas',
    },
  };

  return lt;

}));
