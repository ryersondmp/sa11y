
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
  (global = typeof globalThis !== 'undefined' ? globalThis : global || self, global.Sa11yLangEt = factory());
})(this, (function () { 'use strict';

  /*! WARNING: This is a machine-generated translation and may contain errors or inaccuracies. */
  var et = {
    // Estonian
    strings: {
      LANG_CODE: 'et',
      MAIN_TOGGLE_LABEL: 'Kontrollida ligipääsetavust',
      CONTAINER_LABEL: 'Ligipääsetavuse kontrollija',
      ERROR: 'Viga',
      ERRORS: 'Vead',
      WARNING: 'Hoiatus',
      WARNINGS: 'Hoiatused',
      GOOD: 'Hea',
      ON: 'Veebilehel',
      OFF: 'Väljaspool',
      ALERT_TEXT: 'Hoiatus',
      ALERT_CLOSE: 'Sulge',
      OUTLINE: 'Ülesehitus',
      READABILITY_DESC: 'Kuvab loetavuse skoori vahekaardil <strong>Ülesehitus</strong>, et aidata hinnata lugemisraskust.',
      TITLE: 'Pealkiri',
      ALT: 'ALT',
      IMAGES: 'Pildid',
      EDIT: 'Muuda',
      NO_IMAGES: 'Pilte ei leitud.',
      DECORATIVE: 'Dekoratiivne',
      MISSING: 'Puudu',
      PAGE_ISSUES: 'Lehekülje probleemid',
      SETTINGS: 'Seaded',
      DEVELOPER_CHECKS: 'Arendaja kontrollid',
      DEVELOPER_DESC: 'Kontrollib probleeme, mille lahendamiseks võib vaja minna kodeerimise teadmisi, näiteks HTML atribuudid, vormid ja muu.',
      DARK_MODE: 'Tume režiim',
      SHORTCUT_SR: 'Hüpake väljaandele. Klaviatuuri otsetee: S',
      SKIP_TO_ISSUE: 'Väljundi juurde hüpata',
      NEW_TAB: 'Avab uue vahekaardi',
      LINKED: 'Seotud',
      PANEL_HEADING: 'Ligipääsetavuse kontroll',
      NO_ERRORS_FOUND: 'Vigu ei leitud.',
      WARNINGS_FOUND: 'leitud hoiatused.',
      TOTAL_FOUND: 'kõik leitud probleemid kokku.',
      NOT_VISIBLE: 'Objekt, mida üritate vaadata, ei ole nähtav; see võib olla peidetud või olla akordioni või vahekaardikomponendi sees. Siin on eelvaade:',
      MISSING_ROOT: 'Täielik lehekülg kontrolliti ligipääsetavuse osas, sest sihtala <code>%(root)</code> ei ole olemas.',
      MISSING_READABILITY_ROOT: 'Loetavuse skoor põhineb sisu alal <code>%(fallback)</code>, kuna sihtpiirkond <code>%(root)</code> ei eksisteeri.',
      HEADING_NOT_VISIBLE: 'Pealkiri ei ole nähtav; see võib olla peidetud või olla akordioni või vahekaardikomponendi sees.',
      SKIP_TO_PAGE_ISSUES: 'Skip to Page Issues (lehekülje probleemid)',
      CONSOLE_ERROR: 'Vabandame, kuid selle lehekülje ligipääsetavuse kontrolliga on probleem. Kas te saaksite <a href="%(link)">teavitada sellest selle vormi kaudu</a> või <a href="%(link)">GitHubis</a>?',
      APPEARANCE: 'Välimus',
      MOVE_PANEL: 'Liiguta paneel',

      // Dismiss
      PANEL_DISMISS_BUTTON: 'Kuva %(dismissCount) eiratud',
      DISMISS: 'Eira',
      DISMISS_ALL: 'Eira kõik',
      DISMISSED: 'Eiratud',
      DISMISS_REMINDER: 'Palun pane tähele, et hoiatuseid <strong>ajutiselt</strong> eiratakse. Brauseri ajalugu ja küpsiste kustutamine taastab kõik eelnevalt eiratud hoiatuste kõikidel lehtedel.',

      // Export
      DATE: 'Kuupäev',
      PAGE_TITLE: 'Lehe pealkiri',
      RESULTS: 'Tulemused',
      EXPORT_RESULTS: 'Ekspordi tulemused',
      GENERATED: 'Tulemused genereeritud %(tool) abil.',
      PREVIEW: 'Eelvaade',
      ELEMENT: 'Element',
      PATH: 'Rada',

      // Colour filters
      COLOUR_FILTER: 'Värvifilter',
      PROTANOPIA: 'Protanopia',
      DEUTERANOPIA: 'Deuteranopia',
      TRITANOPIA: 'Tritanopia',
      MONOCHROMACY: 'Ühevärvilisus',
      COLOUR_FILTER_MESSAGE: 'Kontrollige, kas on raske tajuda või teistest värvidest eristada elemente.',
      RED_EYE: 'Punane pime.',
      GREEN_EYE: 'Roheline pime.',
      BLUE_EYE: 'Sinine pime.',
      MONO_EYE: 'Punane, sinine ja roheline pime.',
      COLOUR_FILTER_HIGH_CONTRAST: 'Värvifiltrid ei tööta kõrge kontrastsusega režiimis.',

      // Alternative text stop words
      SUS_ALT_STOPWORDS: [
        'pilt',
        'graafiline',
        'foto',
        'photo',
        'image',
        'graphic',
      ],
      PLACEHOLDER_ALT_STOPWORDS: [
        'alt',
        'pilt',
        'foto',
        'dekoratiivsed',
        'platsihoidja',
        'kohaomaniku pilt',
        'distantsi',
        'photo',
        'image',
        'graphic',
      ],
      PARTIAL_ALT_STOPWORDS: [
        'kliki',
        'kliki siia',
        'kliki siia rohkem',
        'kliki siia, et rohkem teada saada',
        'klõpsates siin',
        'kontrollida',
        'üksikasjalikult siin',
        'lae alla',
        'alla laadida siit',
        'teada saada',
        'lisateave',
        'vorm',
        'siin',
        'info',
        'teave',
        'link',
        'õppida',
        'rohkem teada',
        'lisateave',
        'õppida',
        'rohkem',
        'lehekülg',
        'paber',
        'loe edasi',
        'loe',
        'loe seda',
        'see',
        'see lehekülg',
        'see veebileht',
        'vaadata',
        'vaadata meie',
        'veebileht',
      ],
      CLICK: ['click', 'klõps'],
      NEW_WINDOW_PHRASES: [
        'väline',
        'uus vahekaart',
        'uus aken',
        'pop-up',
        'hüpata',
      ],
      FILE_TYPE_PHRASES: ['dokument', 'arvutustabel', 'arvutusleht', 'tihendatud fail', 'arhiveeritud fail', 'tööleht', 'powerpoint', 'esitlus', 'install', 'video', 'audio', 'pdf'],

      // Readability
      READABILITY: 'Loetavus',
      AVG_SENTENCE: 'Keskmine sõna ühe lause kohta:',
      COMPLEX_WORDS: 'Keerulised sõnad:',
      TOTAL_WORDS: 'Sõnad:',
      VERY_DIFFICULT: 'Väga raske',
      DIFFICULT: 'Raske',
      FAIRLY_DIFFICULT: 'Üsna raske',
      READABILITY_NO_CONTENT: 'Ei saa arvutada loetavuse skoori. Ei leitud lõiget <code>&lt;p&gt;</code> või loetelu sisu <code>&lt;li&gt;</code>.',
      READABILITY_NOT_ENOUGH: 'Loetavuse hinde arvutamiseks ei ole piisavalt sisu.',

      // Headings
      HEADING_SKIPPED_LEVEL: 'Pealkirjad ei tohiks vahele jätta tasemeid ega hüpata <strong>Pealkiri %(PREV_LEVEL)</strong> pealt <strong {C}>Pealkiri %(LEVEL)</strong> peale, sest see rikub sisu järjekorra ja hierarhia, muutes selle jälgimise keerulisemaks. <hr> Kui <strong {C}>%(HEADING)</strong> kuulub <strong>%(PREV_HEADING)</strong> sektsiooni, siis kaaluge selle vormindamist kui <strong>Pealkiri %(LEVEL)</strong>.',
      HEADING_EMPTY: 'Tühi rubriik leitud! Parandamiseks kustutage see rida või muutke selle vorming <strong {C}>pealkiri %(level)</strong> <strong>normaalseks</strong> või <strong>paragrahviks</strong>.',
      HEADING_LONG: 'Pealkiri on pikk! Pealkirju tuleks kasutada sisu korrastamiseks ja struktuuri edastamiseks. Need peaksid olema lühikesed, informatiivsed ja unikaalsed. Palun hoidke pealkirjad alla %(MAX_LENGTH) tähemärgi (mitte rohkem kui üks lause). <hr> <strong {B}>%(HEADING_LENGTH) Tähemärki</strong>',
      HEADING_FIRST: 'Lehekülje esimene pealkiri peaks tavaliselt olema pealkiri 1 või 2. Pealkiri 1 peaks olema peamise sisuosa algus ja on peamine pealkiri, mis kirjeldab lehe üldist eesmärki. Lisateave <a href="https://www.w3.org/WAI/tutorials/page-structure/headings/">pealkirjade struktuuri kohta.</a>',
      HEADING_MISSING_ONE: 'Puudub pealkiri 1. Pealkiri 1 peaks olema peamise sisuala algus ja on peamine pealkiri, mis kirjeldab lehe üldist eesmärki. Lisateave <a href="https://www.w3.org/WAI/tutorials/page-structure/headings/">pealkirja struktuur.</a>',
      HEADING_EMPTY_WITH_IMAGE: 'Pealkiri ei sisalda teksti, kuid sisaldab pilti. Kui see ei ole pealkiri, muutke selle formaat <strong {C}>pealkiri %(level)</strong>-st <strong>normaalseks</strong> või <strong>paragrahviks</strong>. Vastasel juhul lisage pildile alt-tekst, kui see ei ole dekoratiivne.',
      PANEL_HEADING_MISSING_ONE: 'Puudub rubriik 1!',
      PANEL_NO_HEADINGS: 'Pealkirju ei leitud.',

      // Links
      LINK_EMPTY: 'Eemaldage tühjad lingid ilma tekstita.',
      LINK_EMPTY_LABELLEDBY: 'Lingil on väärtus <code>aria-labelledby</code>, mis on tühi või ei ühti lehe teise elemendi atribuudi <code>id</code> väärtusega.',
      LINK_EMPTY_NO_LABEL: 'Lingil ei ole eristatavat teksti, mis oleks nähtav ekraanilugejatele ja muudele abivahenditele. Parandada: <ul><li>Lisandage lühike tekst, mis kirjeldab, kuhu link viib.</li><li>Kui tegemist on <a href="https://a11y-101.com/development/icons-and-links">ikoonilink või SVG,</a> puudub tõenäoliselt kirjeldav märgistus.</li><li>Kui arvate, et see link on kopeerimis-/liidevigast tingitud viga, kaaluge selle kustutamist.</li><li>Kui arvate, et tegemist on kopeerimis-/liidevigast tingitud veaga, kaaluge selle kustutamist.</li></ul>',
      LINK_STOPWORD: 'Lingitekst ei pruugi olla piisavalt kirjeldav kontekstist välja: <strong {C}>%(ERROR)</strong>',
      LINK_STOPWORD_ARIA: 'Kuigi on antud ligipääsetav nimi, kaaluge nähtava lingiteksti ülevaatamist. Sellised fraasid nagu &quot;<strong {C}>%(ERROR)</strong>&quot; ei ole tähendusrikkad.',
      LINK_TIP: '<hr> <strong>Näpunäide!</strong> Kasutage selget ja ainulaadset lingiteksti, mis kirjeldab lingi sihtkohta, tavaliselt lehe või dokumendi pealkirja.',
      LINK_CLICK_HERE: '"klõpsa" või "klõpsa siia" fraasid panevad rõhu hiiremängule, kuid paljud inimesed ei kasuta hiirt ega pruugi vaadata seda veebisaiti mobiilseadmes. Kaaluge tegevuse ülesandele viitavat teist verbivormi.',
      DUPLICATE_TITLE: 'Lingid ja pildid, millel on <code>title</code> atribuut, on mõeldud täiendava teabe esitamiseks ja see peaks olema <strong>erinev</strong> tekstist või alternatiivtekstist. Pealkirja tekst kuvatakse, kui liigutate hiirega üle elemendi, kuid seda ei saa kasutada klaviatuurilt ega puutetundlikelt sisenditelt. Kaaluge <a href="https://www.a11yproject.com/posts/title-attributes/">title atribuudist täielikult hoidumist.</a>',
      LINK_SYMBOLS: 'Vältige sümbolite kasutamist tegevuse sooritamise üleskutsetena lingitekstis, välja arvatud juhul, kui need on abitehnoloogiate eest varjatud. Ekraanilugejad võivad sümboleid valjusti ette lugeda, mis võib olla segadusttekitav. Kaaluge nende eemaldamist: <strong {C}>%(ERROR)</strong>',
      LINK_URL: 'Pikemad, vähem arusaadavad URL-aadressid, mida kasutatakse linkide tekstina, võivad olla raskesti mõistetavad, kui neid kasutatakse abivahendi abil. Enamasti on parem kasutada URL-i asemel inimesele loetavat teksti. Lühikesed URL-aadressid (näiteks saidi koduleht) on okei.',
      LINK_DOI: 'Veebilehtede või ainult veebipõhiste ressursside puhul soovitab <a href="https://apastyle.apa.org/style-grammar-guidelines/paper-format/accessibility/urls#:~:text=descriptive%20links">APA stiilijuhend</a> kasutada kirjeldavaid linke, ümbritsedes teose URL-i või DOI-d selle pealkirja ümber. Pikemad, vähem arusaadavad URL-aadressid, mida kasutatakse linkide tekstina, võivad olla raskesti mõistetavad, kui neid kasutatakse abivahendi abil.',
      LINK_NEW_TAB: 'Link avaneb uues vahekaardis või aknas ilma hoiatuseta. See võib olla häiriv, eriti inimestele, kellel on raskusi visuaalse sisu tajumisega. Teiseks ei ole alati hea tava kontrollida kellegi kogemust või teha otsuseid tema eest. Märkige lingi tekstis, et link avaneb uues aknas. <hr> <strong>Nipp!</strong> Õppige ära parimad tavad: <a href="https://www.nngroup.com/articles/new-browser-windows-and-tabs/">Linkide avamine uues brauseriaknas ja vahekaardis.</a>',
      LINK_FILE_EXT: 'Link viitab ilma hoiatuseta PDF- või allalaaditavale failile (nt MP3, Zip, Word Doc). Märkige faili tüüp lingi tekstis. Kui tegemist on suure failiga, kaaluge faili suuruse lisamist. <hr> <strong>Näide:</strong> Juhtkonna aruanne (PDF, 3MB)',
      LINK_IDENTICAL_NAME: 'Lingi tekst on identne teise lingiga, kuigi see viitab teisele lehele. Mitu sama tekstiga linki võib tekitada segadust inimestele, kes kasutavad ekraanilugejaid. <strong>Võtke arvesse, et järgmine link oleks kirjeldavam, et aidata seda teistest linkidest eristada.</strong> <hr> <strong {B}>Ligipääsetav nimi</strong> <strong {C}>%(TEXT)</strong>',

      // Imags
      MISSING_ALT_LINK_HAS_TEXT: 'Pilti kasutatakse lingina koos ümbritseva tekstiga, kuigi alt-atribuut peaks olema märgitud dekoratiivseks või null.',
      MISSING_ALT_LINK: 'Pilti kasutatakse lingina, kuid puudub alt-tekst! Palun veenduge, et alt-tekst kirjeldab, kuhu link viib.',
      MISSING_ALT: 'Puuduv alt-tekst! Kui pilt edastab lugu, meeleolu või olulist teavet - kirjeldage kindlasti pilti.',
      LINK_ALT_FILE_EXT: 'Alternatiivtekst ei tohiks sisaldada faililaiendeid ega pildi mõõtmeid. Veenduge, et alt-tekst kirjeldab lingi sihtkohta, mitte pildi sõna-sõnalist kirjeldust. Eemaldage: <strong {C}>%(ERROR)</strong> <hr> {ALT} {L} <strong {C}>%(ALT_TEXT)</strong>',
      LINK_PLACEHOLDER_ALT: 'Leitud lingitud pildi sees olev mittekirjeldav või paigutatud alt-tekst. Veenduge, et alt-tekst kirjeldab lingi sihtkohta, mitte pildi sõna-sõnalist kirjeldust. Asendage järgmine alt-tekst. <hr> {ALT} {L} <strong {C}>%(ALT_TEXT)</strong>',
      LINK_SUS_ALT: 'Abitehnoloogiad näitavad juba, et tegemist on pildiga, seega võib &quot;<strong {C}>%(ERROR)</strong>&quot; olla üleliigne. Veenduge, et alt-tekst kirjeldab lingi sihtkohta, mitte pildi sõna-sõnalist kirjeldust. <hr> {ALT} {L} <strong {C}>%(ALT_TEXT)</strong>',
      ALT_FILE_EXT: 'Alternatiivtekst ei tohiks sisaldada faililaiendeid ega pildi mõõtmeid. Kui pilt edastab lugu, meeleolu või olulist teavet - kirjeldage kindlasti pilti. Eemaldage: <strong {C}>%(ERROR)</strong> <hr> {ALT} <strong {C}>%(ALT_TEXT)</strong>',
      ALT_PLACEHOLDER: 'Leitud mittekirjeldav või paigutatud alt-tekst. Asendage järgmine alt-tekst millegi sisukamaga. <hr> {ALT} <strong {C}>%(ALT_TEXT)</strong>',
      SUS_ALT: 'Abitehnoloogiad näitavad juba, et tegemist on pildiga, seega &quot;<strong {C}>%(ERROR)</strong>&quot; võib olla üleliigne. <hr> {ALT} <strong {C}>%(ALT_TEXT)</strong>',
      LINK_IMAGE_NO_ALT_TEXT: 'Linki sees olev pilt on märgitud dekoratiivseks ja lingi tekst puudub. Palun lisage pildile alt-tekst, mis kirjeldab lingi sihtkohta.',
      LINK_IMAGE_TEXT: 'Pilt on märgitud dekoratiivseks, kuigi link kasutab ümbritsevat teksti kirjeldava märgisena.',
      LINK_IMAGE_LONG_ALT: 'Lingitud pildi Alt-teksti kirjeldus on <strong>liiga pikk</strong>. Lingitud piltide alt-tekst peaks kirjeldama, kuhu link viib, mitte pildi sõna-sõnaline kirjeldus. <strong>Võta arvesse, et kasuta alt-tekstina selle lehekülje pealkirja, millele see viitab.</strong> <hr> {ALT} {L} <strong {B}>%(altLength) Tähemärki</strong> <strong {C}>%(ALT_TEXT)</strong>',
      LINK_IMAGE_ALT: 'Pildilink sisaldab alternatiivset teksti. <strong>Kas alternatiivne tekst kirjeldab, kuhu link viib?</strong> Kaaluge alternatiivse tekstina selle lehekülje pealkirja kasutamist, millele link viitab. <hr> {ALT} {L} <strong {C}>%(ALT_TEXT)</strong>',
      LINK_IMAGE_ALT_AND_TEXT: 'Pildilink sisaldab <strong>sellise alt-teksti ja ümbritseva lingi teksti.</strong> Kui see pilt on dekoratiivne ja seda kasutatakse funktsionaalse lingina teisele lehele, kaaluge pildi märkimist dekoratiivseks või nullina - ümbritsevast lingi tekstist peaks piisama. <hr> {ALT} <strong {C}>%(ALT_TEXT)</strong> <hr> <strong {B}>Ligipääsetav nimi</strong> {L} <strong {C}>%(TEXT)</strong>',
      IMAGE_FIGURE_DECORATIVE: 'Pilt on märgitud kui <strong>dekoratiivne</strong> ja abitehnoloogiad ignoreerivad seda. <hr> Kuigi on esitatud <strong>caption</strong>, peaks pildil olema enamasti ka alt-tekst. <ul><li>Alt-tekst peaks andma lühikese kirjelduse selle kohta, mis on pildil.</li><li>Tekstis peaks tavaliselt olema kontekst, et seostada pilt ümbritseva sisuga või juhtida tähelepanu konkreetsele teabele.</li></ul>Lisaks: <a href="https://thoughtbot.com/blog/alt-vs-figcaption#the-figcaption-element">alt versus figcaption.</a>',
      IMAGE_FIGURE_DUPLICATE_ALT: 'Ärge kasutage täpselt samu sõnu nii alt- kui ka tiiteltekstis. Ekraanilugejad annavad teavet kaks korda teada.<ul><li>Alt-tekst peaks andma lühikese kirjelduse selle kohta, mis on pildil.</li><li>Tekstis peaks tavaliselt olema kontekst, et seostada pilt ümbritseva sisuga või juhtida tähelepanu konkreetsele teabele.</li></ul> Lisateave: <a href="https://thoughtbot.com/blog/alt-vs-figcaption#the-figcaption-element">alt versus figcaption.</a> <hr> {ALT} <strong {C}>%(ALT_TEXT)</strong>',
      IMAGE_DECORATIVE: 'Pilt on märgitud kui <strong>dekoratiivne</strong> ja abitehnoloogiad ignoreerivad seda. Kui pilt edastab lugu, meeleolu või olulist teavet - lisage kindlasti alt-tekst.',
      IMAGE_DECORATIVE_CAROUSEL: 'Pilt on märgitud dekoratiivseks, kuid kõik karusselli või galerii pildid peaksid sisaldama kirjeldavat alternatiivteksti, et tagada kõigile võrdväärne kogemus.',
      IMAGE_ALT_TOO_LONG: 'Alt-teksti kirjeldus on <strong>liiga pikk</strong>. Alt-tekst peaks olema lühike, kuid sisukas nagu <em>tweet</em> (umbes 100 tähemärki). Kui tegemist on keerulise pildi või graafikuga, kaaluge pildi pika kirjelduse paigutamist allolevasse teksti või akordionikomponenti. <hr> {ALT} <strong {B}>%(altLength) Tähemärki</strong> <strong {C}>%(ALT_TEXT)</strong>',
      IMAGE_PASS: '{ALT} %(ALT_TEXT)',

      // Form labels
      LABELS_MISSING_IMAGE_INPUT: 'Pildi nupul puudub alt-tekst. Palun lisage alt-tekst, et anda ligipääsetav nimi. Näiteks: <em>Search</em> või <em>Submit</em>.',
      LABELS_INPUT_RESET: 'Reset-nuppe ei tohiks <strong>ei</strong> kasutada, kui see pole spetsiaalselt vajalik, sest neid on lihtne kogemata aktiveerida. <hr> <strong>Nipp!</strong> Lugege, miks <a href="https://www.nngroup.com/articles/reset-and-cancel-buttons/">Reset ja Cancel nupud tekitavad kasutatavusprobleeme.</a>',
      LABELS_ARIA_LABEL_INPUT: 'Sisendil on juurdepääsetav nimi, kuigi palun veenduge, et ka silt on nähtav. <hr> <strong {B}>Ligipääsetav nimi</strong> <strong {C}>%(TEXT)</strong>',
      LABELS_NO_FOR_ATTRIBUTE: 'Selle sisendiga ei ole seotud mingit märgistust. Lisage sildile <code>for</code> atribuut, mis vastab selle sisendi <code>id</code>. <hr> <strong {B}>ID</strong> <strong {C}>#%(id)</strong>',
      LABELS_MISSING_LABEL: 'Selle sisendiga ei ole seotud mingit märgistust. Palun lisage sellele sisendile <code>id</code> ja lisage sildile vastav <code>for</code> atribuut.',
      LABELS_PLACEHOLDER: 'Kaduv tekstiväli teeb inimestele raskeks meeles pidada, milline teave kuulub väljale, ja tuvastada ning parandada valideerimisega seotud probleeme. Selle asemel kaaluge pidevalt nähtava vihje kasutamist enne vormivälja. <hr> Lisateavet leiate: <a href="https://www.nngroup.com/articles/form-design-placeholders/">Vormiväljade kohatäidised on kahjulikud.</a>',

      // Embedded content
      EMBED_VIDEO: 'Palun veenduge, et <strong>kõik millisel videol on kinnised subtiitrid.</strong> Kogu heli- ja videosisu puhul on subtiitrite esitamine kohustuslik A-taseme nõue. Üleskirjutused toetavad kurte ja vaegkuuljaid inimesi, kes on kurdid või vaegkuuljad.',
      EMBED_AUDIO: 'Veenduge, et kõigi podcastide kohta esitatakse <strong>transkriptsioon.</strong> Audiosisu transkriptsiooni esitamine on kohustuslik A-taseme nõue. Transkriptsioonid toetavad kurte ja vaegkuuljaid, kuid neist on kasu kõigile. Kaaluge transkriptsiooni paigutamist allapoole või akordionpaneeli sisse.',
      EMBED_DATA_VIZ: 'Sellised andmete visualiseerimise vidinad on sageli problemaatilised inimestele, kes kasutavad navigeerimiseks klaviatuuri või ekraanilugejat, ning võivad tekitada märkimisväärseid raskusi inimestele, kellel on madal nägemine või värvipimedus. Soovitatav on esitada sama teave alternatiivses (teksti või tabeli) vormis vidina all. <hr> Lisateave <a href="https://www.w3.org/WAI/tutorials/images/complex">komplekspiltide kohta.</a>',
      EMBED_MISSING_TITLE: 'Varjatud sisu vajab juurdepääsetavat nime, mis kirjeldab selle sisu. Andke <code>iframe</code> elemendile <code>tiitle</code> või <code>aria-label</code> atribuut unikaalne <code>tiitle</code> või <code>aria-label</code>. Lisateave <a href="https://web.dev/learn/accessibility/more-html#iframes">iFrame\'i kohta.</a>',
      EMBED_GENERAL: 'Ei saa kontrollida varjatud sisu. Palun veenduge, et piltidel on alt-tekst, videote pealkirjad, tekst on piisavalt kontrastne ja interaktiivsed komponendid on <a href="https://webaim.org/techniques/keyboard/">tahvlile juurdepääsetavad.</a>.',
      EMBED_UNFOCUSABLE: '<code>&lt;iframe&gt;</code> koos fookustamata elementidega ei tohiks olla <code>tabindex="-1"</code>. Manustatud sisu ei ole klaviatuuriga juurdepääsetav.',

      // QA
      QA_BAD_LINK: 'Leitud halb link. Link näib viitavat arenduskeskkonnale. <hr> {L} <strong {C}>%(LINK)</strong>',
      QA_IN_PAGE_LINK: 'Katkine samalehekülje link. Lingi sihtmärk ei vasta sellel lehel ühelegi elemendile.',
      QA_STRONG_ITALICS: 'Paks ja kursiivne märgistus on semantilise tähendusega ja neid ei tohiks <strong>ei</strong> kasutada tervete lõigete esiletõstmiseks. Häälestatud teksti tuleks kasutada selleks, et rõhutada sõna või fraasi tugevalt <strong>kõrge</strong>. Kursiivkirjas tuleks kasutada pärisnimede (st raamatute ja artiklite pealkirjade), võõrsõnade, jutumärkide esiletõstmiseks. Pikad tsitaadid tuleks vormistada plokktsitaatidena.',
      QA_PDF: 'Ei saa kontrollida PDF-failide juurdepääsetavust. PDF-failid loetakse veebisisuks ja need tuleb samuti juurdepääsetavaks muuta. PDF-failid sisaldavad sageli probleeme inimeste jaoks, kes kasutavad ekraanilugejaid (puuduvad struktuurilised märgised või vormiväljade märgised) ja inimeste jaoks, kellel on vaegnägemine (tekst ei voola suurendatud kujul tagasi). <ul><li>Kui tegemist on vormiga, kaaluge alternatiivina ligipääsetava HTML-vormi kasutamist.</li><li>Kui tegemist on dokumendiga, kaaluge selle teisendamist veebileheks.</li></ul> Muudel juhtudel kontrollige <a href="https://helpx.adobe.com/acrobat/using/create-verify-pdf-accessibility.html">PDF-i ligipääsetavust Acrobat DC-s.</a>.',
      QA_DOCUMENT: 'Ei saa kontrollida dokumendi juurdepääsetavust. Lingitud dokumente loetakse veebisisuks ja need tuleb samuti juurdepääsetavaks muuta. Palun vaadake see dokument käsitsi üle. <ul><li>Muuta oma <a href="https://support.google.com/docs/answer/6199477?hl=et">Google Workspace\'i dokument või esitlus ligipääsetavamaks.</a></li></li><li>Muuta oma <a href="https://support.microsoft.com/et/office/create-accessible-office-documents-868ecfcd-4f00-4224-b881-a65537a7c155">Office\'i dokumendid ligipääsetavamaks.</a></li></ul>',
      QA_BLOCKQUOTE: 'Kas see on pealkiri? <strong {C}>%(TEXT)</strong> <hr> Plokkviiteid tuleks kasutada ainult jutumärkide jaoks. Kui see on mõeldud pealkirjaks, muutke see plokktsitaat semantiliseks pealkirjaks (nt pealkiri 2 või pealkiri 3).',
      QA_FAKE_HEADING: 'Kas see on pealkiri? <strong {C}>%(TEXT)</strong> <hr> Raske või suur tekstirida võib tunduda pealkirjana, kuid keegi, kes kasutab ekraanilugejat, ei saa aru, et see on oluline või ei saa selle sisu juurde hüpata. Paks või suur tekst ei tohiks kunagi asendada semantilisi pealkirju (rubriik 2 kuni rubriik 6).',
      QA_FAKE_LIST: 'Kas püüate koostada nimekirja? Võimalik nimekiri on leitud: <strong {C}>%(firstPrefix)</strong> <hr> Veenduge, et kasutate semantilisi nimekirju, kasutades selle asemel bullet- või numbrivormingu nuppe. Kui kasutate semantilist loetelu, saavad abivahendid edastada teavet, näiteks elementide koguarvu ja iga elemendi suhtelise positsiooni loetelus. Lisateave <a href="https://www.w3.org/WAI/tutorials/page-structure/content/#lists">semantiliste loetelude kohta.</a>',
      QA_UPPERCASE: 'Leidsin kõik suurtähed. Mõned ekraanilugejad võivad tõlgendada täistähti akronüümina ja lugeda iga tähte eraldi. Lisaks sellele on mõnedel inimestel raskem lugeda ja see võib jätta mulje, nagu oleks see HÄÄLETUS.',
      QA_UNDERLINE: 'Allakriipsutatud teksti võib segi ajada linkidega. Kaaluge teistsuguse stiili kasutamist, näiteks <code>&lt;strong&gt;</code><strong>tugev tähtsus</strong><code>&lt;/strong&gt;</code> või <code>&lt;em&gt;</code><em>emphasis</em><code>&lt;/em&gt;</code>.',
      QA_SUBSCRIPT: 'Alam- ja ülaindeksite vormindamise võimalusi tuleks kasutada ainult teksti asukoha muutmiseks tüpograafiliste konventsioonide või standardite alusel. Seda ei tohiks <strong>ei</strong> kasutada ainult esitlus- või välimuseesmärkidel. Tervete lausete vormindamine tekitab probleeme loetavusega. Asjakohased kasutusjuhud on näiteks eksponentide, ordinaalarvude, näiteks 4<sup>th</sup> asemel 4<sup>, ja keemiliste valemite (nt H<sub>2</sub>O) kuvamine.',
      QA_NESTED_COMPONENTS: 'Vältige interaktiivsete paigutuskomponentide pesastamist, näiteks akordeonide paigutamist tabide sisse või tabide paigutamist akordeonide sisse. See võib keeruliseks muuta navigeerimise, suurendada kognitiivset ülekoormust ja viia sellele, et inimesed jätavad sisu tähelepanuta.',
      QA_JUSTIFY: 'Vältige õigustatud teksti kasutamist, mis on joondatud nii vasakule kui ka paremale äärele. See võib olla raskesti loetav mõnele inimesele ebaühtlaste sõnavahede tõttu. Kasutage vasakule joondatud teksti parema loetavuse saavutamiseks.',
      QA_SMALL_TEXT: 'Väikest teksti on raskem lugeda, eriti inimestel, kellel on nägemishäired. Parema loetavuse tagamiseks vältige väiksemate fontide kasutamist kui vaikefondi suurus.',

      // Shared
      ACC_NAME: '<strong {B}>Ligipääsetav nimi</strong> %(TEXT)',
      ACC_NAME_TIP: '<hr><strong>Nõuanne!</strong> "Ligipääsetav nimi" on lõplik silt, mis edastatakse abivahendeid kasutavatele inimestele ja mille arvutamine toimub ARIA kaudu. See aitab neil mõista lingi või nupu eesmärki.',
      HIDDEN_FOCUSABLE: 'Link või nupp on <code>aria-hidden=&quot;true&quot;</code>, kuid on endiselt klaviatuurilt fookustatav. Kui kavatsete peita dubleeritud lingi või nupu, lisage ka <code>tabindex=&quot;-1&quot;</code>. Vastasel juhul ei tohiks <code>aria-hidden=&quot;true&quot;</code> kasutada elementidel, mis saavad fookust. <hr> Lisateave <a href="https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/Attributes/aria-hidden">aria-hidden atribuudi kohta.</a>',

      // Developer
      DUPLICATE_ID: 'Leiti <strong>korduv ID</strong>. Teadaolevalt põhjustavad dubleeritud ID-vead probleeme tugitehnoloogiatele, kui need üritavad sisuga suhelda. Palun eemaldage või muutke järgmine ID. <hr> <strong {B}>ID</strong> <strong {C}>#%(id)</strong>',
      UNCONTAINED_LI: 'Kõik <code>&lt;li&gt;</code> nimekirjaelemendid peavad olema paigutatud <code>&lt;ul&gt;</code> järjestamata või <code>&lt;ol&gt;</code> järjestatud elementide sisse. See struktuur aitab ekraani lugemistarkvaral nimekirja ja selle elemente täpselt kuulutada.',
      TABINDEX_ATTR: 'Elemendil ei tohiks olla <code>tabindex</code> atribuut, mis on suurem kui 0.',

      // Meta checks
      META_LANG: 'Lehekülje keel ei ole deklareeritud! Palun <a href="https://www.w3.org/International/questions/qa-html-language-declarations">deklareerige keel HTML-sildil.</a>',
      META_TITLE: 'Puudub lehekülje pealkiri! Palun sisestage <a href="https://developer.mozilla.org/et/docs/Web/HTML/Element/title">lehe pealkiri.</a>.',
      META_SCALABLE: 'Eemaldage parameeter <code>user-scalable="no"</code> <a href="https://developer.mozilla.org/en-US/docs/Web/HTML/Viewport_meta_tag">meta sildi vaatest</a>, et lubada suumimist.',
      META_MAX: 'Veenduge, et parameeter <code>maximum-scale</code> <a href="https://developer.mozilla.org/en-US/docs/Web/HTML/Viewport_meta_tag">meta sildi vaatest</a> ei oleks väiksem kui 2.',
      META_REFRESH: 'Lehte ei tohiks automaatselt värskendada, kasutades meta-silti.',

      // Buttons
      BTN_EMPTY: 'Nupul puudub ligipääsetav nimi, mis kirjeldaks selle eesmärki.',
      BTN_EMPTY_LABELLEDBY: 'Nupul on <code>aria-labelledby</code> väärtus, mis on tühi või ei vasta teise lehe elemendi <code>id</code> väärtusele.',
      BTN: 'nupp',
      BTN_TIP: 'Õpi, kuidas teha <a href="https://www.sarasoueidan.com/blog/accessible-icon-buttons/">ligipääsetav nupp.</a>',
      BTN_ROLE_IN_NAME: 'Ära lisa sõna "nupp" nupu nimesse. Ekraani lugejad edastavad juba elemendi rolli lisaks selle nimele.',
      LABEL_IN_NAME: 'Selle elemendi nähtav tekst näib olevat erinev ligipääsetavast nimest, mis võib tekitada segadust abivahendite kasutajatele. Palun vaata üle: <hr> <strong {B}>Ligipääsetav nimi</strong> <strong {C}>%(TEXT)</strong>',

      // Tables
      TABLES_MISSING_HEADINGS: 'Puuduvad tabeli päised! Kättesaadavad tabelid vajavad HTML-märgistust, mis tähistab päise- ja andmerakke, mis määratleb nende omavahelise seose. See teave annab konteksti inimestele, kes kasutavad abivahendeid. Tabeleid tuleks kasutada ainult tabeliandmete jaoks. <hr> Lisateave <a href="https://www.w3.org/WAI/tutorials/tables/">juurdepääsetavate tabelite kohta.</a>',
      TABLES_SEMANTIC_HEADING: 'Semantilisi pealkirju, nagu pealkiri 2 või pealkiri 3, tuleks kasutada ainult sisulõikudes; <strong>ei</strong> HTML-tabelites. Märkige tabelipealkirjad hoopis elemendi <code>&lt;th&gt;</code> abil. <hr> Lisateave <a href="https://www.w3.org/WAI/tutorials/tables/">juurdepääsetavate tabelite kohta.</a>',
      TABLES_EMPTY_HEADING: 'Leitud on tühi tabeli päis! Tabeli päised ei tohiks <strong>ei tohiks</strong> kunagi</strong> olla tühjad. Oluline on määrata rea ja/või veeru päised, et anda edasi nende seos. See teave annab konteksti inimestele, kes kasutavad abivahendeid. Pidage meeles, et tabeleid tuleks kasutada ainult tabeliandmete jaoks. <hr> Lisateave <a href="https://www.w3.org/WAI/tutorials/tables/">juurdepääsetavate tabelite kohta.</a>',

      // Contrast
      CONTRAST_NORMAL: 'Tavalise suurusega tekstil peaks olema kontrastsuse suhe vähemalt %(RATIO).',
      CONTRAST_LARGE: 'Suurel tekstil peaks olema kontrastsuse suhe vähemalt %(RATIO).',
      CONTRAST_ERROR: 'Tekstil pole taustaga piisavalt kontrasti, mistõttu on seda raskem lugeda.',
      CONTRAST_WARNING: 'Selle teksti kontrastsus on teadmata ja see tuleb käsitsi üle vaadata. Veenduge, et tekstil ja taustal oleks tugev värvikontrast.',
      CONTRAST_ERROR_GRAPHIC: 'Graafikal pole taustaga piisavalt kontrasti, mistõttu võib seda olla raske näha.',
      CONTRAST_WARNING_GRAPHIC: 'Selle graafika kontrastsus on teadmata ja see tuleb käsitsi üle vaadata.',
      CONTRAST_TIP_GRAPHIC: 'Graafikal ja kasutajaliidese elementidel peaks olema vähemalt 3:1 kontrastsuse suhe.',
      CONTRAST_OPACITY: 'Parandage nähtavust, suurendades läbipaistmatust.',
      CONTRAST_APCA: 'See kontrastsus pole ühegi suurusega teksti jaoks piisav. Kas kaalute selle värvi ja teksti suuruse kombinatsiooni kasutamist?',
      CONTRAST_COLOR: 'Kas kaalute selle värvi kasutamist?',
      CONTRAST_SIZE: 'Kas kaalute teksti suurendamist selle värvikombinatsiooni jaoks?',
      CONTRAST_PLACEHOLDER: 'Selle sisendi kohatäite tekstil pole taustaga piisavalt kontrasti, mistõttu on seda raskem lugeda.',
      CONTRAST_PLACEHOLDER_UNSUPPORTED: 'Selle kohatäite teksti kontrastsus on teadmata ja vajab käsitsi ülevaatamist. Veenduge, et tekstil ja taustal oleksid tugevalt kontrastsed värvid.',
      CONTRAST_INPUT: 'Selle sisendi tekstil pole taustaga piisavalt kontrasti, mistõttu on seda raskem lugeda.',
      CONTRAST: 'Kontrastsus',
      UNKNOWN: 'Teadmata',
      FG: 'Esiplaan',
      BG: 'Taust',
      NO_SUGGESTION: 'Ainult teksti värvi muutmisega ei leia ligipääsetavat kombinatsiooni. Proovige muuta taustavärvi.',
    },
  };

  return et;

}));
