
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
  (global = typeof globalThis !== 'undefined' ? globalThis : global || self, global.Sa11yLangNl = factory());
})(this, (function () { 'use strict';

  /*! WARNING: This is a machine-generated translation and may contain errors or inaccuracies. */
  var nl = {
    // Dutch
    strings: {
      LANG_CODE: 'nl',
      MAIN_TOGGLE_LABEL: 'Toegankelijkheid controleren',
      CONTAINER_LABEL: 'Toegankelijkheidscontrole',
      ERROR: 'Fout',
      ERRORS: 'Fouten',
      WARNING: 'Waarschuwing',
      WARNINGS: 'Waarschuwingen',
      GOOD: 'Goed',
      ON: 'Aan',
      OFF: 'Uit',
      ALERT_TEXT: 'Waarschuwing',
      ALERT_CLOSE: 'Sluit',
      OUTLINE: 'Overzicht',
      READABILITY_DESC: 'Toont de leesbaarheidsscore op het tabblad <strong>Overzicht</strong> om de leesmoeilijkheid te helpen inschatten.',
      TITLE: 'Titel',
      ALT: 'ALT',
      IMAGES: 'Afbeeldingen',
      EDIT: 'Bewerken',
      NO_IMAGES: 'Geen afbeeldingen gevonden.',
      DECORATIVE: 'Decoratief',
      MISSING: 'Ontbrekend',
      PAGE_ISSUES: 'Pagina problemen',
      SETTINGS: 'Instellingen',
      DEVELOPER_CHECKS: 'Ontwikkelaarscontroles',
      DEVELOPER_DESC: 'Controleert op problemen die mogelijk programmeerkennis vereisen om op te lossen, zoals HTML-attributen, formulieren en meer.',
      DARK_MODE: 'Donkere modus',
      SHORTCUT_SR: 'Naar problemen gaan. Sneltoets: Alt S',
      SKIP_TO_ISSUE: 'Doorgaan naar probleem',
      NEW_TAB: 'Opent nieuw tabblad',
      LINKED: 'Gekoppeld',
      PANEL_HEADING: 'Toegankelijkheid controleren',
      NO_ERRORS_FOUND: 'Geen fouten gevonden.',
      WARNINGS_FOUND: 'waarschuwingen gevonden.',
      TOTAL_FOUND: 'totaal aantal gevonden problemen.',
      NOT_VISIBLE: 'Het item dat je probeert te bekijken is niet zichtbaar; het kan verborgen zijn of in een accordeon of tabbladcomponent zitten. Hier is een voorbeeld:',
      MISSING_ROOT: 'De volledige pagina is gecontroleerd op toegankelijkheid omdat het doelgebied <code>%(root)</code> niet bestaat.',
      MISSING_READABILITY_ROOT: 'De leesbaarheidsscore is gebaseerd op het inhoudsgebied <code>%(fallback)</code>, omdat het doelgebied <code>%(root)</code> niet bestaat.',
      HEADING_NOT_VISIBLE: 'De kop is niet zichtbaar; hij kan verborgen zijn of in een accordeon- of tabbladcomponent staan.',
      SKIP_TO_PAGE_ISSUES: 'Doorgaan naar paginaproblemen',
      CONSOLE_ERROR: 'Sorry, maar er is een probleem met de toegankelijkheidscontrole op deze pagina. Kunt u dit alstublieft <a href="%(link)">melden via dit formulier</a> of op <a href="%(link)">GitHub</a>?',
      APPEARANCE: 'Uiterlijk',
      MOVE_PANEL: 'Verplaats paneel',

      // Dismiss
      PANEL_DISMISS_BUTTON: 'Toon %(dismissCount) afgewezen',
      DISMISS: 'Afwijzen',
      DISMISS_ALL: 'Alles afwijzen',
      DISMISSED: 'Afgewezen',
      DISMISS_REMINDER: 'Let op dat waarschuwingen alleen <strong>tijdelijk</strong> worden afgewezen. Het wissen van uw browsergeschiedenis en cookies zal alle eerder afgewezen waarschuwingen op alle pagina\'s herstellen.',

      // Export
      DATE: 'Datum',
      PAGE_TITLE: 'Paginatitel',
      RESULTS: 'Resultaten',
      EXPORT_RESULTS: 'Resultaten exporteren',
      GENERATED: 'Resultaten gegenereerd met %(tool).',
      PREVIEW: 'Voorbeeld',
      ELEMENT: 'Element',
      PATH: 'Pad',

      // Colour filters
      COLOUR_FILTER: 'Kleurenfilter',
      PROTANOPIA: 'Protanopia',
      DEUTERANOPIA: 'Deuteranopia',
      TRITANOPIA: 'Tritanopia',
      MONOCHROMACY: 'Monochromie',
      COLOUR_FILTER_MESSAGE: 'Controleer op elementen die moeilijk zijn waar te nemen of te onderscheiden van andere kleuren.',
      RED_EYE: 'Roodblindheid.',
      GREEN_EYE: 'Groenblindheid.',
      BLUE_EYE: 'Blauwblindheid.',
      MONO_EYE: 'Rood-, blauw- en groenblindheid.',
      COLOUR_FILTER_HIGH_CONTRAST: 'Kleurenfilters werken niet in de modus Hoog contrast.',

      // Alternative text stop words
      SUS_ALT_STOPWORDS: [
        'afbeelding',
        'grafisch',
        'afbeelding',
        'foto',
        'miniatuur',
        'icoon',
        'photo',
        'image',
        'graphic',
      ],
      PLACEHOLDER_ALT_STOPWORDS: [
        'alt',
        'grafiek',
        'decoratief',
        'afbeelding',
        'image',
        'grafisch',
        'plaatsvervanger',
        'plaatsvervangende afbeelding',
        'afstandhouder',
        'photo',
        'graphic',
        'placeholder',
      ],
      PARTIAL_ALT_STOPWORDS: [
        'klik op',
        'klik hier',
        'klik hier voor meer',
        'klik hier voor meer informatie',
        'hier klikken',
        'door hier te klikken',
        'uitchecken',
        'hier gedetailleerd',
        'downloaden',
        'hier downloaden',
        'te weten komen',
        'meer informatie',
        'kom meer te weten',
        'meer weten',
        'formulier',
        'hier',
        'info',
        'informatie',
        'link',
        'leren',
        'meer leren',
        'meer informatie',
        'meer weten',
        'leren',
        'meer',
        'pagina',
        'papier',
        'meer lezen',
        'lees meer',
        'lees',
        'lees dit',
        'deze',
        'deze pagina',
        'deze website',
        'bekijk',
        'bekijk onze',
        'website',
      ],
      CLICK: ['click', 'klik'],
      NEW_WINDOW_PHRASES: [
        'extern',
        'nieuw tabblad',
        'nieuw venster',
        'pop-up',
        'verschijnen',
      ],
      FILE_TYPE_PHRASES: ['document', 'rekenblad', 'spreadsheet', 'gecomprimeerd bestand', 'gearchiveerd bestand', 'werkblad', 'powerpoint', 'presentatie', 'installeren', 'video', 'audio', 'pdf'],

      // Readability
      READABILITY: 'Leesbaarheid',
      AVG_SENTENCE: 'Gemiddeld aantal woorden per zin:',
      COMPLEX_WORDS: 'Complexe woorden:',
      TOTAL_WORDS: 'Woorden:',
      VERY_DIFFICULT: 'Zeer moeilijk',
      DIFFICULT: 'Moeilijk',
      FAIRLY_DIFFICULT: 'Redelijk moeilijk',
      READABILITY_NO_CONTENT: 'Kan de leesbaarheidsscore niet berekenen. Geen paragraaf <code>&lt;p&gt;</code> of lijstinhoud <code>&lt;li&gt;</code> gevonden.',
      READABILITY_NOT_ENOUGH: 'Niet genoeg inhoud om een leesbaarheidsscore te berekenen.',

      // Headings
      HEADING_SKIPPED_LEVEL: 'Koppen mogen geen niveaus overslaan of van <strong>Kop %(PREV_LEVEL)</strong> naar <strong {C}>Kop %(LEVEL)</strong> springen, omdat dit de volgorde en hiërarchie van de inhoud verstoort, waardoor het moeilijker te volgen is. <hr> Als <strong {C}>%(HEADING)</strong> onder de sectie <strong>%(PREV_HEADING)</strong> valt, overweeg dan om het in plaats daarvan als een <strong>Kop %(LEVEL)</strong> op te maken.',
      HEADING_EMPTY: 'Lege koptekst gevonden! Om dit op te lossen, verwijdert u deze regel of wijzigt u de opmaak van <strong {C}>Heading %(level)</strong> in <strong>normaal</strong> of <strong>paragraaf</strong>.',
      HEADING_LONG: 'Koppen zijn lang! Koppen moeten worden gebruikt om inhoud te organiseren en structuur over te brengen. Ze moeten kort, informatief en uniek zijn. Houd koppen onder de %(MAX_LENGTH) tekens (niet meer dan een zin). <hr> <strong {B}>%(HEADING_LENGTH) Tekens</strong>',
      HEADING_FIRST: 'De eerste kop op een pagina moet meestal een Kop 1 of Kop 2 zijn. Kop 1 moet het begin zijn van het hoofdgedeelte van de inhoud en is de belangrijkste kop die het algemene doel van de pagina beschrijft. Meer informatie over <a href="https://www.w3.org/WAI/tutorials/page-structure/headings/">Koppenstructuur.</a>',
      HEADING_MISSING_ONE: 'Ontbrekende kop 1. Kop 1 moet het begin zijn van het hoofdgedeelte van de inhoud en is de belangrijkste kop die het algemene doel van de pagina beschrijft. Meer informatie over <a href="https://www.w3.org/WAI/tutorials/page-structure/headings/">Koppenstructuur.</a>',
      HEADING_EMPTY_WITH_IMAGE: 'Een kop heeft geen tekst, maar bevat een afbeelding. Als dit geen koptekst is, verander de opmaak dan van <strong {C}>Koptekst %(level)</strong> in <strong>Normaal</strong> of <strong>Paragraaf</strong>. Voeg anders alt-tekst toe aan de afbeelding als deze niet decoratief is.',
      PANEL_HEADING_MISSING_ONE: 'Kop 1 ontbreekt!',
      PANEL_NO_HEADINGS: 'Geen koppen gevonden.',

      // Links
      LINK_EMPTY: 'Verwijder lege links zonder tekst.',
      LINK_EMPTY_LABELLEDBY: 'De link heeft een waarde voor <code>aria-labelledby</code> die leeg is of niet overeenkomt met de waarde van het attribuut <code>id</code> van een ander element op de pagina.',
      LINK_EMPTY_NO_LABEL: 'Link heeft geen leesbare tekst die zichtbaar is voor schermlezers en andere ondersteunende technologie. Op te lossen: <ul><li>Voeg beknopte tekst toe die beschrijft waar de koppeling naartoe leidt.</li><li>Als het een <a href="https://a11y-101.com/development/icons-and-links">icon link of SVG,</a> is, ontbreekt waarschijnlijk een beschrijvend label.</li><li>Als u denkt dat deze koppeling een fout is als gevolg van een copy/paste-bug, kunt u overwegen deze te verwijderen.</li></ul>',
      LINK_STOPWORD: 'De linktekst is mogelijk niet beschrijvend genoeg buiten de context: <strong {C}>%(ERROR)</strong>',
      LINK_STOPWORD_ARIA: 'Overweeg, hoewel een toegankelijke naam is gebruikt, de zichtbare linktekst te verandren. Zinnen zoals &quot;<strong {C}>%(ERROR)</strong>&quot; zijn niet betekenisvol.',
      LINK_TIP: '<hr> <strong>Tip!</strong> Gebruik duidelijke en unieke linkteksten die de bestemming van de link beschrijven, meestal de titel van de pagina of het document.',
      LINK_CLICK_HERE: 'De uitdrukking "klik" of "klik hier" legt de nadruk op muisgebruik, terwijl veel mensen geen muis gebruiken of deze website op een mobiel apparaat bekijken. Overweeg een ander werkwoord te gebruiken dat gerelateerd is aan de taak.',
      DUPLICATE_TITLE: 'Het <code>title</code>-attribuut op links en afbeeldingen is bedoeld om extra informatie te geven en moet <strong>verschillend</strong> zijn van de tekst of alt-tekst. De titeltekst verschijnt wanneer je over een element zweeft, maar is niet toegankelijk met een toetsenbord of touch-input. Overweeg <a href="https://www.a11yproject.com/posts/title-attributes/">het title-attribuut volledig te vermijden.</a>',
      LINK_SYMBOLS: 'Vermijd het gebruik van symbolen als oproepen tot actie in linktekst, tenzij ze verborgen zijn voor ondersteunende technologieën. Schermlezers kunnen de symbolen hardop voorlezen, wat verwarrend kan zijn. Overweeg ze te verwijderen: <strong {C}>%(ERROR)</strong>',
      LINK_URL: "Langere, minder begrijpelijke URL's die gebruikt worden als linktekst kunnen moeilijk te begrijpen zijn met hulptechnologie. In de meeste gevallen is het beter om menselijk leesbare tekst te gebruiken in plaats van de URL. Korte URL's (zoals de startpagina van een site) zijn prima.",
      LINK_DOI: 'Voor webpagina\'s of online bronnen raadt de <a href="https://apastyle.apa.org/style-grammar-guidelines/paper-format/accessibility/urls#:~:text=descriptive%20links">APA stijlgids</a> aan om beschrijvende links te gebruiken door de URL of DOI van het werk rond de titel te plaatsen. Langere, minder begrijpelijke URL\'s die gebruikt worden als linktekst kunnen moeilijk te begrijpen zijn met hulptechnologie.',
      LINK_NEW_TAB: 'Link opent in een nieuw tabblad of venster zonder waarschuwing. Dit kan desoriënterend zijn, vooral voor mensen die moeite hebben met het waarnemen van visuele inhoud. Ten tweede is het niet altijd een goede gewoonte om iemands ervaring te controleren of beslissingen voor hem te nemen. Geef in de tekst van de koppeling aan dat deze in een nieuw venster wordt geopend. <hr> <strong>Tip!</strong> Leer de beste werkwijzen: <a href="https://www.nngroup.com/articles/new-browser-windows-and-tabs/">links openen in nieuwe browservensters en tabbladen.</a>',
      LINK_FILE_EXT: 'Link verwijst naar een PDF of downloadbaar bestand (bijv. MP3, Zip, Word Doc) zonder waarschuwing. Vermeld het bestandstype in de linktekst. Als het een groot bestand is, kun je overwegen de bestandsgrootte te vermelden. <hr> <strong>Voorbeeld:</strong> Uitvoerend rapport (PDF, 3 MB)',
      LINK_IDENTICAL_NAME: 'Link heeft dezelfde tekst als een andere link, maar verwijst naar een andere pagina. Meerdere links met dezelfde tekst kunnen verwarring veroorzaken voor mensen die schermlezers gebruiken. <strong>Overweeg om de volgende link beschrijvender te maken om hem te helpen onderscheiden van andere links.</strong> <hr> <strong {B}>Toegankelijk naam</strong> <strong {C}>%(TEXT)</strong>',

      // Images
      MISSING_ALT_LINK_HAS_TEXT: 'Afbeelding wordt gebruikt als een link met omringende tekst, hoewel het alt-attribuut als decoratief of null moet worden gemarkeerd.',
      MISSING_ALT_LINK: 'Afbeelding wordt gebruikt als link maar alt-tekst ontbreekt! Zorg ervoor dat de alt-tekst beschrijft waar de link naartoe leidt.',
      MISSING_ALT: 'Ontbrekende alt-tekst! Als de afbeelding een verhaal, sfeer of belangrijke informatie overbrengt, zorg er dan voor dat je de afbeelding beschrijft.',
      LINK_ALT_FILE_EXT: 'Alternatieve tekst mag geen bestandsextensies of afbeeldingsdimensies bevatten. Zorg ervoor dat de alt-tekst de bestemming van de link beschrijft en niet een letterlijke beschrijving van de afbeelding. Verwijderen: <strong {C}>%(ERROR)</strong>. <hr> {ALT} {L} <strong {C}>%(ALT_TEXT)</strong>',
      LINK_PLACEHOLDER_ALT: 'Niet-beschrijvende of plaatsvervangende alt-tekst binnen een gekoppelde afbeelding gevonden. Zorg ervoor dat de alt-tekst de bestemming van de link beschrijft en niet een letterlijke beschrijving van de afbeelding. Vervang de volgende alt-tekst. <hr> {ALT} {L} <strong {C}>%(ALT_TEXT)</strong>',
      LINK_SUS_ALT: 'Hulptechnologieën geven al aan dat het om een afbeelding gaat, dus &quot;<strong {C}>%(ERROR)</strong>&quot; kan overbodig zijn. Zorg ervoor dat de alt-tekst de bestemming van de link beschrijft en niet een letterlijke beschrijving van de afbeelding. <hr> {ALT} {L} <strong {C}>%(ALT_TEXT)</strong>',
      ALT_FILE_EXT: 'Alternatieve tekst mag geen bestandsextensies of afbeeldingsdimensies bevatten. Als de afbeelding een verhaal, stemming of belangrijke informatie overbrengt, zorg er dan voor dat je de afbeelding beschrijft. Verwijderen: <strong {C}>%(ERROR)</strong> <hr> {ALT} <strong {C}>%(ALT_TEXT)</strong>',
      ALT_PLACEHOLDER: 'Niet-beschrijvende of plaatshouder alt-tekst gevonden. Vervang de volgende alt-tekst door iets dat meer betekenis heeft. <hr> {ALT} <strong {C}>%(ALT_TEXT)</strong>',
      SUS_ALT: 'Hulptechnologieën geven al aan dat dit een afbeelding is, dus &quot;<strong {C}>%(ERROR)</strong>&quot; kan overbodig zijn. <hr> {ALT} <strong {C}>%(ALT_TEXT)</strong>',
      LINK_HIDDEN_FOCUSABLE: 'De link heeft <code>aria-hidden=&quot;true&quot;</code>, maar is nog steeds toegankelijk met het toetsenbord. Als je van plan bent om een overbodige of dubbele link te verbergen, voeg dan ook <code>tabindex=&quot;-1&quot;</code> toe.',
      LINK_IMAGE_NO_ALT_TEXT: 'De afbeelding in de link is gemarkeerd als decoratief en er is geen linktekst. Voeg alt-tekst toe aan de afbeelding die de bestemming van de link beschrijft.',
      LINK_IMAGE_TEXT: 'Afbeelding is gemarkeerd als decoratief, hoewel de link de omringende tekst gebruikt als beschrijvend label.',
      LINK_IMAGE_LONG_ALT: 'Alt-tekstbeschrijving op een gekoppelde afbeelding is <strong>te lang</strong>. De alt-tekst op gelinkte afbeeldingen moet beschrijven waar de link je naartoe brengt, niet een letterlijke beschrijving van de afbeelding. <strong>Overweeg om de titel van de pagina waarnaar wordt gelinkt als alt-tekst te gebruiken.</strong> <hr> {ALT} {L} <strong {B}>%(altLength) Tekens</strong> <strong {C}>%(ALT_TEXT)</strong>',
      LINK_IMAGE_ALT: 'De link naar de afbeelding bevat alt-tekst. <strong>Beschrijft de alt-tekst waar de link je naartoe brengt?</strong> Overweeg om de titel van de pagina waarnaar wordt gelinkt als alt-tekst te gebruiken. <hr> {ALT} {L} <strong {C}>%(ALT_TEXT)</strong>',
      LINK_IMAGE_ALT_AND_TEXT: 'Afbeeldingslink bevat <strong>zowel alt-tekst als omringende tekst.</strong>Als deze afbeelding decoratief is en wordt gebruikt als een functionele link naar een andere pagina, overweeg dan om de afbeelding als decoratief of null te markeren - de omringende linktekst zou moeten volstaan. <hr> {ALT} <strong {C}>%(ALT_TEXT)</strong> <hr> <strong {B}>Toegankelijk naam</strong> {L} <strong {C}>%(TEXT)</strong>',
      IMAGE_FIGURE_DECORATIVE: 'Afbeelding is gemarkeerd als <strong>decoratief</strong> en wordt genegeerd door ondersteunende technologie. <hr> Hoewel er een <strong>bijschrift</strong> is opgegeven, moet de afbeelding in de meeste gevallen ook een alt-tekst hebben. <ul><li>De alt-tekst moet een beknopte beschrijving geven van wat er in de afbeelding staat.</li><li>Het bijschrift moet meestal context bieden om de afbeelding te relateren aan de omringende inhoud, of de aandacht vestigen op een bepaald stukje informatie.</li></ul> Lees meer: <a href="https://thoughtbot.com/blog/alt-vs-figcaption#the-figcaption-element">alt versus figcaption.</a>',
      IMAGE_FIGURE_DUPLICATE_ALT: 'Gebruik niet exact dezelfde woorden voor zowel de alt- als bijschrifttekst. Schermlezers zullen de informatie twee keer aankondigen. <ul><li>De alt-tekst moet een beknopte beschrijving geven van wat er in de afbeelding staat.</li><li>Het bijschrift moet meestal context bieden om de afbeelding te relateren aan de omringende inhoud, of de aandacht vestigen op een bepaald stukje informatie.</li></ul> Meer informatie: <a href="https://thoughtbot.com/blog/alt-vs-figcaption#the-figcaption-element">alt versus figcaption.</a> <hr> {ALT} <strong {C}>%(ALT_TEXT)</strong>',
      IMAGE_DECORATIVE: 'De afbeelding is gemarkeerd als <strong>decoratief</strong> en wordt genegeerd door ondersteunende technologie. Als de afbeelding een verhaal, stemming of belangrijke informatie overbrengt, voeg dan alt-tekst toe.',
      IMAGE_DECORATIVE_CAROUSEL: 'Afbeelding is gemarkeerd als decoratief, maar alle afbeeldingen in een carrousel of galerij moeten een beschrijvende alt-tekst bevatten om een gelijkwaardige ervaring voor iedereen te garanderen.',
      IMAGE_ALT_TOO_LONG: 'Alt-tekstbeschrijving is <strong>te lang</strong>. Alt-tekst moet beknopt zijn, maar toch betekenisvol, zoals een <em>tweet</em> (ongeveer 100 tekens). Als dit een complexe afbeelding of een grafiek is, overweeg dan om de lange beschrijving van de afbeelding in de tekst eronder te zetten of in een accordeoncomponent. <hr> {ALT} <strong {B}>%(altLength) Tekens</strong> <strong {C}>%(ALT_TEXT)</strong>',
      IMAGE_PASS: '{ALT} %(ALT_TEXT)',

      // Form labels
      LABELS_MISSING_IMAGE_INPUT: 'Bij de afbeeldingsknop ontbreekt alt-tekst. Voeg alt-tekst toe om een toegankelijke naam te geven. Bijvoorbeeld: <em>Zoeken</em> of <em>Verzenden</em>.',
      LABELS_INPUT_RESET: 'Resetknoppen moeten <strong>niet</strong> worden gebruikt tenzij ze specifiek nodig zijn, omdat ze gemakkelijk per ongeluk kunnen worden geactiveerd. <hr> <strong>Tip!</strong>Lees waarom <a href="https://www.nngroup.com/articles/reset-and-cancel-buttons/">Reset- en annuleerknoppen bruikbaarheidsproblemen opleveren.</a>',
      LABELS_ARIA_LABEL_INPUT: 'De invoer heeft een toegankelijke naam, maar zorg ervoor dat er ook een zichtbaar label is. <hr> <strong {B}>Toegankelijke naam</strong> <strong {C}>%(TEXT)</strong>',
      LABELS_NO_FOR_ATTRIBUTE: 'Er is geen label gekoppeld aan deze ingang. Voeg een <code>for</code>-attribuut toe aan het label dat overeenkomt met de <code>id</code> van deze ingang. <hr> <strong {B}>ID</strong> <strong {C}>#%(id)</strong>',
      LABELS_MISSING_LABEL: 'Er is geen label gekoppeld aan deze ingang. Voeg een <code>id</code> toe aan deze invoer en voeg een overeenkomend <code>for</code> attribuut toe aan het label.',
      LABELS_PLACEHOLDER: 'Verdwijnen van placeholdertekst maakt het moeilijk voor mensen om te onthouden welke informatie in een veld thuishoort en maakt het uitdagend om fouten te identificeren en te corrigeren. Overweeg in plaats daarvan om een permanent zichtbare hint voor het formulier veld te gebruiken. <hr> Leer meer: <a href="https://www.nngroup.com/articles/form-design-placeholders/">Plaatsvervangers in formulier velden zijn schadelijk.</a>',

      // Embedded content
      EMBED_VIDEO: "Zorg ervoor dat <strong>alle video's zijn voorzien van ondertiteling.</strong> Het leveren van ondertiteling voor alle audio- en video-inhoud is een verplichte Level A-vereiste. Ondertiteling ondersteunt mensen die doof of slechthorend zijn.",
      EMBED_AUDIO: 'Zorg voor een <strong>transcript voor alle podcasts.</strong> Het leveren van transcripts voor audio-inhoud is een verplichte Level A-vereiste. Transcripties ondersteunen mensen die doof of slechthorend zijn, maar iedereen kan er baat bij hebben. Overweeg om het transcript onder of in een accordeonpaneel te plaatsen.',
      EMBED_DATA_VIZ: 'Widgets voor gegevensvisualisatie zoals deze zijn vaak problematisch voor mensen die een toetsenbord of schermlezer gebruiken om te navigeren, en kunnen aanzienlijke problemen opleveren voor mensen met slechtziendheid of kleurenblindheid. Het is aan te raden om dezelfde informatie in een alternatieve (tekst of tabel) indeling onder de widget aan te bieden. <hr> Meer informatie over <a href="https://www.w3.org/WAI/tutorials/images/complex">complexe afbeeldingen.</a>',
      EMBED_MISSING_TITLE: 'Voor ingesloten inhoud is een toegankelijke naam nodig die de inhoud beschrijft. Geef een uniek <code>title</code> of <code>aria-label</code> attribuut bij het <code>iframe</code> element. Meer informatie over <a href="https://web.dev/learn/accessibility/more-html#iframes">iFrames.</a>',
      EMBED_GENERAL: 'Kan ingesloten inhoud niet controleren. Controleer of afbeeldingen alt-tekst hebben, video\'s bijschriften, tekst voldoende contrast en interactieve onderdelen <a href="https://webaim.org/techniques/keyboard/">toetsenbordtoegankelijk zijn.</a>',
      EMBED_UNFOCUSABLE: '<code>&lt;iframe&gt;</code> met niet-focusbare elementen mag geen <code>tabindex="-1"</code> hebben. De ingesloten inhoud zal niet toegankelijk zijn met het toetsenbord.',

      // QA
      QA_BAD_LINK: 'Slechte link gevonden. Link lijkt te verwijzen naar een ontwikkelomgeving. <hr> {L} <strong {C}>%(LINK)</strong>',
      QA_IN_PAGE_LINK: 'Gebroken koppeling naar dezelfde pagina. Het koppelingsdoel komt niet overeen met enig element op deze pagina.',
      QA_STRONG_ITALICS: "Vetgedrukte en cursieve tags hebben een semantische betekenis en moeten <strong>niet</strong> worden gebruikt om hele alinea's te benadrukken. Vetgedrukte tekst moet worden gebruikt om een woord of zin sterk te <strong>accentueren</strong>. Cursief moet worden gebruikt om eigennamen (bijv. titels van boeken en artikelen), vreemde woorden en aanhalingstekens te benadrukken. Lange citaten moeten worden opgemaakt als een blokcitaat.",
      QA_PDF: 'Kan PDF\'s niet controleren op toegankelijkheid. PDF\'s worden beschouwd als webinhoud en moeten ook toegankelijk worden gemaakt. PDF\'s bevatten vaak problemen voor mensen die screenreaders gebruiken (ontbrekende structurele tags of ontbrekende labels voor formuliervelden) en mensen die slecht zien (tekst wordt niet weergegeven als deze wordt vergroot). <ul><li>Als dit een formulier is, kunt u overwegen een toegankelijk HTML-formulier te gebruiken als alternatief.</li><li>Als dit een document is, kunt u overwegen het te converteren naar een webpagina.</li></ul> Ofwel controleer <a href="https://helpx.adobe.com/acrobat/using/create-verify-pdf-accessibility.html">PDF op toegankelijkheid in Acrobat DC.</a>',
      QA_DOCUMENT: 'Kan document niet controleren op toegankelijkheid. Gekoppelde documenten worden beschouwd als webinhoud en moeten ook toegankelijk worden gemaakt. Controleer dit document handmatig. <ul><li>Maak uw <a href="https://support.google.com/docs/answer/6199477?hl=nl">Google Workspace-document of presentatie toegankelijker.</a></li><li>Maak uw <a href="https://support.microsoft.com/nl/office/create-accessible-office-documents-868ecfcd-4f00-4224-b881-a65537a7c155">Office-documenten toegankelijker.</a></li></ul>',
      QA_BLOCKQUOTE: 'Is dit een koptekst? <strong {C}>%(TEXT)</strong> <hr> Blokcitaten moeten alleen worden gebruikt voor citaten. Als dit bedoeld is als een koptekst, verander dit blokcitaat dan in een semantische koptekst (bijvoorbeeld koptekst 2 of koptekst 3).',
      QA_FAKE_HEADING: 'Is dit een koptekst? <strong {C}>%(TEXT)</strong> <hr> Een regel vette of grote tekst ziet er misschien uit als een kop, maar iemand die een schermlezer gebruikt, kan niet zien dat het belangrijk is of naar de inhoud springen. Vette of grote tekst mag nooit semantische koppen vervangen (Kop 2 tot en met Kop 6).',
      QA_FAKE_LIST: 'Probeer je een lijst te maken? Mogelijk lijstitem gevonden: <strong {C}>%(firstPrefix)</strong> <hr> Zorg ervoor dat je semantische lijsten gebruikt door in plaats daarvan de opsommingsteken- of nummeropmaakknoppen te gebruiken. Als je een semantische lijst gebruikt, kunnen hulptechnologieën informatie overbrengen zoals het totale aantal items en de relatieve positie van elk item in de lijst. Meer informatie over <a href="https://www.w3.org/WAI/tutorials/page-structure/content/#lists">semantische lijsten.</a>',
      QA_UPPERCASE: 'Allemaal hoofdletters gevonden. Sommige schermlezers interpreteren tekst met allemaal hoofdletters als een acroniem en lezen elke letter apart. Bovendien vinden sommige mensen allemaal hoofdletters moeilijker te lezen en kan het lijken alsof ze SCHREEUWEN.',
      QA_UNDERLINE: 'Onderstreepte tekst kan worden verward met links. Overweeg een andere stijl te gebruiken, zoals <code>&lt;strong&gt;</code><strong>strong importance</strong><code>&lt;/strong&gt;</code> of <code>&lt;em&gt;</code><em>emphasis</em><code>&lt;/em&gt;</code>.',
      QA_SUBSCRIPT: 'De opmaakopties subscript en superscript mogen alleen worden gebruikt om de positie van tekst te wijzigen voor typografische afspraken of standaarden. Het moet <strong>niet</strong> alleen worden gebruikt voor presentatie of uiterlijk. Het formatteren van hele zinnen geeft problemen met de leesbaarheid. Voorbeelden van geschikte toepassingen zijn het weergeven van exponenten, rangtelwoorden zoals 4<sup>th</sup> in plaats van vier, en chemische formules (bijv. H<sub>2</sub>O).',
      QA_NESTED_COMPONENTS: 'Vermijd het inbedden van interactieve lay-out componenten, zoals het plaatsen van accordeons binnen accordeons of tabbladen binnen accordeons en omgekeerd. Dit kan de navigatie compliceren, de cognitieve belasting verhogen en ertoe leiden dat mensen inhoud over het hoofd zien.',
      QA_JUSTIFY: 'Vermijd het gebruik van uitgevulde tekst, die zowel aan de linker- als aan de rechterkant is uitgelijnd. Dit kan moeilijk te lezen zijn voor sommige mensen vanwege de ongelijke ruimtes tussen de woorden. Gebruik links uitgelijnde tekst voor betere leesbaarheid.',
      QA_SMALL_TEXT: 'Kleine tekst is moeilijker te lezen, vooral voor mensen met een verminderd gezichtsvermogen. Gebruik geen lettergroottes die kleiner zijn dan de standaard, om de leesbaarheid te verbeteren.',

      // Shared
      ACC_NAME: '<strong {B}>Toegankelijk naam</strong> %(TEXT)',
      ACC_NAME_TIP: '<hr><strong>Tip!</strong> De "toegankelijke naam" is het uiteindelijke label dat wordt gecommuniceerd aan mensen die gebruik maken van ondersteunende technologie. Dit helpt hen om het doel van de link of knop te begrijpen.',
      HIDDEN_FOCUSABLE: 'De link of knop heeft <code>aria-hidden=&quot;true&quot;</code>, maar is nog steeds via het toetsenbord toegankelijk. Als u een dubbele link of knop wilt verbergen, voeg dan ook <code>tabindex=&quot;-1&quot;</code> toe. Anders moet <code>aria-hidden=&quot;true&quot;</code> niet worden gebruikt op elementen die focus kunnen ontvangen. <hr> Lees meer over het <a href="https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/Attributes/aria-hidden">aria-hidden-attribuut.</a>',

      // Developer
      DUPLICATE_ID: '<strong>Duplicate ID</strong> gevonden. Het is bekend dat dubbele ID-fouten problemen veroorzaken voor hulptechnologieën wanneer deze proberen te communiceren met inhoud. Verwijder of wijzig de volgende ID. <hr> <strong {B}>ID</strong> <strong {C}>#%(id)</strong>',
      UNCONTAINED_LI: 'Alle <code>&lt;li&gt;</code> lijstitems moeten worden geplaatst binnen <code>&lt;ul&gt;</code> ongeordende of <code>&lt;ol&gt;</code> geordende elementen. Deze structuur helpt schermlezers om de lijst en de items ervan nauwkeurig aan te kondigen.',
      TABINDEX_ATTR: 'Het element mag geen <code>tabindex</code>-attribuut groter dan 0 hebben.',

      // Meta checks
      META_LANG: 'Pagina taal niet aangegeven! Gelieve <a href="https://www.w3.org/International/questions/qa-html-language-declarations">declareer taal in HTML-tag.</a>',
      META_TITLE: 'Er ontbreekt een paginatitel! Geef een <a href="https://developer.mozilla.org/nl/docs/Web/HTML/Element/title">paginatitel.</a>',
      META_SCALABLE: 'Verwijder de parameter <code>user-scalable="no"</code> in de <a href="https://developer.mozilla.org/en-US/docs/Web/HTML/Viewport_meta_tag">meta-tag van het viewport</a> om inzoomen toe te staan.',
      META_MAX: 'Zorg ervoor dat de parameter <code>maximum-scale</code> in de <a href="https://developer.mozilla.org/en-US/docs/Web/HTML/Viewport_meta_tag">meta-tag van het viewport</a> niet kleiner is dan 2.',
      META_REFRESH: 'De pagina mag niet automatisch verversen met behulp van een meta-tag.',

      // Buttons
      BTN_EMPTY: 'De knop mist een toegankelijke naam die het doel beschrijft.',
      BTN_EMPTY_LABELLEDBY: 'De knop heeft een <code>aria-labelledby</code> waarde die leeg is of niet overeenkomt met de <code>id</code> waarde van een ander element op de pagina.',
      BTN: 'knop',
      BTN_TIP: 'Leer hoe u een <a href="https://www.sarasoueidan.com/blog/accessible-icon-buttons/">toegankelijke knop maakt.</a>',
      BTN_ROLE_IN_NAME: 'Gebruik het woord "knop" niet in de naam van een knop. Schermlezers vermelden al de rol van een element naast de naam.',
      LABEL_IN_NAME: 'De zichtbare tekst voor dit element lijkt te verschillen van de toegankelijke naam, wat verwarring kan veroorzaken voor gebruikers van ondersteunende technologieën. Controleer alstublieft: <hr> <strong {B}>Toegankelijke Naam</strong> <strong {C}>%(TEXT)</strong>',

      // Tables
      TABLES_MISSING_HEADINGS: 'Tabelkoppen ontbreken! Voor toegankelijke tabellen is HTML-markup nodig die kopcellen en gegevenscellen aangeeft en hun relatie definieert. Deze informatie geeft context aan mensen die ondersteunende technologie gebruiken. Tabellen moeten alleen worden gebruikt voor gegevens in tabelvorm. <hr> Lees meer over <a href="https://www.w3.org/WAI/tutorials/tables/">toegankelijke tabellen.</a>',
      TABLES_SEMANTIC_HEADING: 'Semantische koppen zoals Kop 2 of Kop 3 mogen alleen worden gebruikt voor gedeelten van de inhoud; <strong>niet</strong> in HTML-tabellen. Geef tabelkoppen aan met het <code>&lt;th&gt;</code>-element. <hr> Meer informatie over <a href="https://www.w3.org/WAI/tutorials/tables/">toegankelijke tabellen.</a>',
      TABLES_EMPTY_HEADING: 'Lege tabelheader gevonden! Tabelkoppen mogen <strong>nooit</strong> leeg zijn. Het is belangrijk om rij- en/of kolomkoppen aan te geven om hun relatie duidelijk te maken. Deze informatie geeft context aan mensen die ondersteunende technologie gebruiken. Houd in gedachten dat tabellen alleen mogen worden gebruikt voor gegevens in tabelvorm. <hr> Meer informatie over <a href="https://www.w3.org/WAI/tutorials/tables/">toegankelijke tabellen.</a>',

      // Contrast
      CONTRAST_NORMAL: 'Tekst met een normale grootte moet een contrastverhouding van minstens %(RATIO) hebben.',
      CONTRAST_LARGE: 'Grote tekst moet een contrastverhouding van minstens %(RATIO) hebben.',
      CONTRAST_ERROR: 'De tekst heeft niet genoeg contrast met de achtergrond, waardoor het moeilijk te lezen is.',
      CONTRAST_WARNING: 'Het contrast van deze tekst is onbekend en moet handmatig worden gecontroleerd. Zorg ervoor dat de tekst en de achtergrond een sterk contrast hebben.',
      CONTRAST_ERROR_GRAPHIC: 'De grafiek heeft niet genoeg contrast met de achtergrond, waardoor het moeilijk te zien is.',
      CONTRAST_WARNING_GRAPHIC: 'Het contrast van deze grafiek is onbekend en moet handmatig worden gecontroleerd.',
      CONTRAST_TIP_GRAPHIC: 'Grafieken en gebruikersinterface-elementen moeten een contrastverhouding van ten minste 3:1 hebben.',
      CONTRAST_OPACITY: 'Verhoog de opaciteit voor betere zichtbaarheid.',
      CONTRAST_APCA: 'Dit is niet genoeg contrast voor tekst van welke grootte dan ook. Overweeg deze kleur- en tekstgroottecombinatie te gebruiken?',
      CONTRAST_COLOR: 'Overweeg deze kleur in plaats van deze te gebruiken?',
      CONTRAST_SIZE: 'Overweeg de tekstgrootte te vergroten voor deze kleurcombinatie?',
      CONTRAST_PLACEHOLDER: 'De plaatsvervangende tekst in dit invoerveld heeft niet genoeg contrast met de achtergrond waardoor het moeilijk te lezen is.',
      CONTRAST_PLACEHOLDER_UNSUPPORTED: 'Het contrast van deze placeholdertekst is onbekend en moet handmatig worden beoordeeld. Zorg ervoor dat de tekst en de achtergrond sterk contrasterende kleuren hebben.',
      CONTRAST_INPUT: 'De tekst in dit invoerveld heeft niet genoeg contrast met de achtergrond waardoor het moeilijk te lezen is.',
      CONTRAST: 'Contrast',
      UNKNOWN: 'Onbekend',
      FG: 'Voorgrond',
      BG: 'Achtergrond',
      NO_SUGGESTION: 'Er kan geen toegankelijke combinatie worden gevonden door alleen de tekstkleur te wijzigen. Probeer de achtergrondkleur te wijzigen.',
    },
  };

  return nl;

}));
