
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
  (global = typeof globalThis !== 'undefined' ? globalThis : global || self, global.Sa11yLangDa = factory());
})(this, (function () { 'use strict';

  /*! WARNING: This is a machine-generated translation and may contain errors or inaccuracies. */
  var da = {
    // Danish
    strings: {
      LANG_CODE: 'da',
      MAIN_TOGGLE_LABEL: 'Tjek tilgængelighed',
      CONTAINER_LABEL: 'Tilgængelighedstjek',
      ERROR: 'Fejl',
      ERRORS: 'Fejl',
      WARNING: 'Advarsel',
      WARNINGS: 'Advarsler',
      GOOD: 'God',
      ON: 'På',
      OFF: 'Af',
      ALERT_TEXT: 'Alarm',
      ALERT_CLOSE: 'Luk',
      OUTLINE: 'Disposition',
      READABILITY_DESC: 'Viser læsbarhedsscoren på fanen <strong>Disposition</strong> for at hjælpe med at vurdere læsevanskeligheder.',
      TITLE: 'Titel',
      ALT: 'ALT',
      IMAGES: 'Billeder',
      EDIT: 'Rediger',
      NO_IMAGES: 'Ingen billeder fundet.',
      DECORATIVE: 'Dekorativ',
      MISSING: 'Manglende',
      PAGE_ISSUES: 'Side Problemer',
      SETTINGS: 'Indstillinger',
      DEVELOPER_CHECKS: 'Udviklerkontroller',
      DEVELOPER_DESC: 'Tjekker for problemer, der kan kræve kendskab til kodning for at blive løst, såsom HTML-attributter, formularer og mere.',
      DARK_MODE: 'Mørk tilstand',
      SHORTCUT_SR: 'Gå videre til udgaven. Tastaturgenvej: Alt S',
      SKIP_TO_ISSUE: 'Spring til nummer',
      NEW_TAB: 'Åbner ny fane',
      LINKED: 'Forbundet',
      PANEL_HEADING: 'Tilgængelighedstjek',
      NO_ERRORS_FOUND: 'Ingen fejl fundet.',
      WARNINGS_FOUND: 'advarsler fundet.',
      TOTAL_FOUND: 'samlede problemer fundet.',
      NOT_VISIBLE: 'Det element, du prøver at se, er ikke synligt; det kan være skjult eller inde i en harmonika- eller fanekomponent. Her er en forhåndsvisning:',
      MISSING_ROOT: 'Hele siden blev kontrolleret for tilgængelighed, fordi målområdet <code>%(root)</code> ikke findes.',
      MISSING_READABILITY_ROOT: 'Læsbarhedsscoren er baseret på indholdsområdet <code>%(fallback)</code>, da målområdet <code>%(root)</code> ikke findes.',
      HEADING_NOT_VISIBLE: 'Overskriften er ikke synlig; den kan være skjult eller inde i en harmonika- eller fanekomponent.',
      SKIP_TO_PAGE_ISSUES: 'Spring til sideudgaver',
      CONSOLE_ERROR: 'Beklager, men der er et problem med tilgængelighedstjekkeren på denne side. Kan du venligst <a href="%(link)">rapportere det via denne formular</a> eller på <a href="%(link)">GitHub</a>?',
      APPEARANCE: 'Udseende',
      MOVE_PANEL: 'Flyt panel',

      // Dismiss
      PANEL_DISMISS_BUTTON: 'Vis %(dismissCount) afvist',
      DISMISS: 'Afvis',
      DISMISS_ALL: 'Afvis alle',
      DISMISSED: 'Afvist',
      DISMISS_REMINDER: 'Bemærk, at advarsler kun er <strong>midlertidigt</strong> afvist. Rydning af din browserhistorik og cookies vil gendanne alle tidligere afviste advarsler på tværs af alle sider.',

      // Export
      DATE: 'Dato',
      PAGE_TITLE: 'Sidetitel',
      RESULTS: 'Resultater',
      EXPORT_RESULTS: 'Eksportér resultater',
      GENERATED: 'Resultater genereret med %(tool).',
      PREVIEW: 'Forhåndsvisning',
      ELEMENT: 'Element',
      PATH: 'Sti',

      // Colour filters
      COLOUR_FILTER: 'Farvefilter',
      PROTANOPIA: 'Protanopia',
      DEUTERANOPIA: 'Deuteranopia',
      TRITANOPIA: 'Tritanopia',
      MONOCHROMACY: 'Monokromitet',
      COLOUR_FILTER_MESSAGE: 'Tjek for elementer, der er svære at opfatte eller skelne fra andre farver.',
      RED_EYE: 'Rød blind.',
      GREEN_EYE: 'Grøn blind.',
      BLUE_EYE: 'Blå blind.',
      MONO_EYE: 'Rød, blå og grøn blind.',
      COLOUR_FILTER_HIGH_CONTRAST: 'Farvefiltre fungerer ikke i højkontrasttilstand.',

      // Alternative text stop words
      SUS_ALT_STOPWORDS: [
        'billede',
        'grafik',
        'billede',
        'foto',
      ],
      PLACEHOLDER_ALT_STOPWORDS: [
        'alt',
        'billede',
        'foto',
        'dekorativ',
        'pladsholder',
        'pladsholder-billede',
        'afstandsstykke',
      ],
      PARTIAL_ALT_STOPWORDS: [
        'klik',
        'klik her',
        'klik her for mere',
        'klik her for at læse mere',
        'ved at klikke her',
        'tjek ud',
        'beskrevet her',
        'download',
        'download her',
        'find ud af det',
        'find ud af mere',
        'formular',
        'her',
        'info',
        'information',
        'link',
        'lære',
        'lære mere',
        'få mere at vide',
        'lære at',
        'mere',
        'side',
        'papir',
        'læs mere',
        'læse',
        'læs dette',
        'dette',
        'denne side',
        'denne hjemmeside',
        'udsigt',
        'se vores',
        'hjemmeside',
      ],
      CLICK: ['click', 'klik'],
      NEW_WINDOW_PHRASES: [
        'ekstern',
        'ny fane',
        'nyt vindue',
        'pop-up',
        'dukker op',
      ],
      FILE_TYPE_PHRASES: ['document', 'dokument', 'regneark', 'beregningsark', 'komprimeret fil', 'arkiveret fil', 'regneark', 'powerpoint', 'præsentation', 'installere', 'video', 'lyd', 'pdf'],

      // Readability
      READABILITY: 'Læsbarhed',
      AVG_SENTENCE: 'Gennemsnitligt antal ord pr. sætning:',
      COMPLEX_WORDS: 'Komplekse ord:',
      TOTAL_WORDS: 'Ord:',
      VERY_DIFFICULT: 'Meget vanskeligt',
      DIFFICULT: 'Vanskeligt',
      FAIRLY_DIFFICULT: 'Temmelig vanskelig',
      READABILITY_NO_CONTENT: 'Kunne ikke beregne læsbarhedsscore. Intet afsnit <code>&lt;p&gt;</code> eller listeindhold <code>&lt;li&gt;</code> fundet.',
      READABILITY_NOT_ENOUGH: 'Ikke nok indhold til at beregne læsbarhedsscore.',

      // Headings
      HEADING_SKIPPED_LEVEL: 'Overskrifter bør ikke springe niveauer over eller hoppe fra <strong>Overskrift %(PREV_LEVEL)</strong> til <strong {C}>Overskrift %(LEVEL)</strong>, da dette forstyrrer indholdets orden og hierarki og gør det sværere at følge. <hr> Hvis <strong {C}>%(HEADING)</strong> hører under sektionen <strong>%(PREV_HEADING)</strong>, så overvej at formatere det som <strong>Overskrift %(LEVEL)</strong> i stedet.',
      HEADING_EMPTY: 'Tom overskrift fundet! For at rette skal du slette denne linje eller ændre dens format fra <strong {C}>Overskrift %(level)</strong> til <strong>Normal</strong> eller <strong>Afsnit</strong>.',
      HEADING_LONG: 'Overskriften er lang! Overskrifter skal bruges til at organisere indhold og formidle struktur. De skal være korte, informative og unikke. Hold venligst overskrifter på mindre end %(MAX_LENGTH) tegn (ikke mere end en sætning). <hr> <strong {B}>%(HEADING_LENGTH) Tegn</strong>',
      HEADING_FIRST: 'Den første overskrift på en side bør normalt være en Overskrift 1 eller Overskrift 2. Overskrift 1 bør være starten på hovedindholdssektionen og er den hovedoverskrift, der beskriver det overordnede formål med siden. Læs mere om <a href="https://www.w3.org/WAI/tutorials/page-structure/headings/">Overskriftsstruktur.</a>',
      HEADING_MISSING_ONE: 'Manglende overskrift 1. Overskrift 1 skal være starten på hovedindholdsområdet og er den hovedoverskrift, der beskriver sidens overordnede formål. Læs mere om <a href="https://www.w3.org/WAI/tutorials/page-structure/headings/">Overskriftsstruktur.</a>',
      HEADING_EMPTY_WITH_IMAGE: 'Heading har ingen tekst, men indeholder et billede. Hvis det ikke er en overskrift, skal du ændre formatet fra <strong {C}>Overskrift %(level)</strong> til <strong>Normal</strong> eller <strong>Afsnit</strong>. Ellers bedes du tilføje alt-tekst til billedet, hvis det ikke er dekorativt.',
      PANEL_HEADING_MISSING_ONE: 'Manglende overskrift 1!',
      PANEL_NO_HEADINGS: 'Ingen overskrifter fundet.',

      // Links
      LINK_EMPTY: 'Fjern tomme links uden tekst.',
      LINK_EMPTY_LABELLEDBY: 'Linket har en værdi for <code>aria-labelledby</code>, der enten er tom eller ikke matcher værdien af attributten <code>id</code> for et andet element på siden.',
      LINK_EMPTY_NO_LABEL: 'Linket har ikke tydelig tekst, der er synlig for skærmlæsere og andre hjælpemidler. Sådan rettes det: <ul><li> Tilføj en kort tekst, der beskriver, hvor linket fører dig hen.</li><li> Hvis det er et <a href="https://a11y-101.com/development/icons-and-links">ikonlink eller SVG,</a> mangler det sandsynligvis en beskrivende etiket.</li><li> Hvis du tror, at dette link er en fejl på grund af en copy/paste-fejl, kan du overveje at slette det.</li></ul>',
      LINK_STOPWORD: 'Linktekst er måske ikke beskrivende nok uden for konteksten: <strong {C}>%(ERROR)</strong>',
      LINK_STOPWORD_ARIA: 'Selvom der blev givet et tilgængeligt navn, bør du overveje at revidere den synlige linktekst. Udtryk som &quot;<strong {C}>%(ERROR)</strong>&quot; er ikke meningsfulde.',
      LINK_TIP: '<hr> <strong>Tip!</strong> Brug tydelig og unik linktekst, der beskriver destinationen for linket, typisk siden eller dokumentets titel.',
      LINK_CLICK_HERE: 'Udtrykket "klik" eller "klik her" fokuserer på musemekanik, selvom mange mennesker ikke bruger en mus eller måske ser dette websted på en mobil enhed. Overvej at bruge et andet udsagnsord, der relaterer til opgaven.',
      DUPLICATE_TITLE: 'Attributten <code>title</code> på links og billeder er beregnet til at give ekstra information og bør være <strong>forskellig</strong> fra teksten eller alt-teksten. Titelteksten vises, når du holder musen over et element, men er ikke tilgængelig med et tastatur eller en berøringsenhed. Overvej <a href="https://www.a11yproject.com/posts/title-attributes/">at undgå title-attributten helt.</a>',
      LINK_SYMBOLS: 'Undgå at bruge symboler som handlingsanvisninger i linkteksten, medmindre de er skjult fra hjælpeværktøjer. Skærmlæsere kan læse symbolerne højt, hvilket kan være forvirrende. Overvej at fjerne: <strong {C}>%(ERROR)</strong>',
      LINK_URL: 'Længere, mindre forståelige URL\'er, der bruges som linktekst, kan være svære at lytte til med hjælpemidler. I de fleste tilfælde er det bedre at bruge menneskeligt læsbar tekst i stedet for URL\'en. Korte URL\'er (som f.eks. en hjemmesides startside) er okay.',
      LINK_DOI: 'For websider eller ressourcer, der kun er online, anbefaler <a href="https://apastyle.apa.org/style-grammar-guidelines/paper-format/accessibility/urls#:~:text=descriptive%20links">APA Style guide</a> at bruge beskrivende links ved at omslutte værkets URL eller DOI omkring dets titel. Længere, mindre forståelige URL\'er, der bruges som linktekst, kan være svære at forstå, når de tilgås med hjælpemidler.',
      LINK_NEW_TAB: 'Link åbner i en ny fane eller et nyt vindue uden advarsel. Det kan være desorienterende, især for folk, der har svært ved at opfatte visuelt indhold. For det andet er det ikke altid en god praksis at kontrollere andres oplevelse eller træffe beslutninger for dem. Angiv, at linket åbner i et nyt vindue i linkteksten. <hr> <strong>Tip!</strong> Lær bedste praksis: <a href="https://www.nngroup.com/articles/new-browser-windows-and-tabs/">åbning af links i nye browservinduer og faner.</a>',
      LINK_FILE_EXT: 'Link peger på en PDF eller en downloadbar fil (f.eks. MP3, Zip, Word Doc) uden advarsel. Angiv filtypen i linkteksten. Hvis det er en stor fil, kan du overveje at inkludere filstørrelsen. <hr> <strong>Eksempel:</strong> Executive Report (PDF, 3MB)',
      LINK_IDENTICAL_NAME: 'Linket har samme tekst som et andet link, selvom det peger på en anden side. Flere links med samme tekst kan skabe forvirring for folk, der bruger skærmlæsere. <strong>Overvej at gøre følgende link mere beskrivende for at hjælpe med at skelne det fra andre links.</strong> <hr> <strong {B}>Tilgængeligt navn</strong> <strong {C}>%(TEXT)</strong>',

      // Images
      MISSING_ALT_LINK_HAS_TEXT: 'Billedet bruges som et link med omgivende tekst, selvom alt-attributten burde være markeret som dekorativ eller nul.',
      MISSING_ALT_LINK: 'Billedet bliver brugt som et link, men mangler alt-tekst! Sørg for, at alt-teksten beskriver, hvor linket fører dig hen.',
      MISSING_ALT: 'Manglende alt-tekst! Hvis billedet formidler en historie, en stemning eller vigtig information - så sørg for at beskrive billedet.',
      LINK_ALT_FILE_EXT: 'Alternativ tekst bør ikke inkludere filtypenavne eller billeddimensioner. Sørg for, at alt-teksten beskriver linkets destination, ikke en bogstavelig beskrivelse af billedet. Fjern: <strong {C}>%(ERROR)</strong> <hr> {ALT} {L} <strong {C}>%(ALT_TEXT)</strong>',
      LINK_PLACEHOLDER_ALT: 'Ikke-beskrivende eller pladsholder-alt-tekst i et linket billede fundet. Sørg for, at alt-teksten beskriver linkets destination, ikke en bogstavelig beskrivelse af billedet. Erstat den følgende alt-tekst. <hr> {ALT} {L} <strong {C}>%(ALT_TEXT)</strong>',
      LINK_SUS_ALT: 'Hjælpemidler indikerer allerede, at dette er et billede, så &quot;<strong {C}>%(ERROR)</strong>&quot; kan være overflødigt. Sørg for, at alt-teksten beskriver linkets destination, ikke en bogstavelig beskrivelse af billedet. <hr> {ALT} {L} <strong {C}>%(ALT_TEXT)</strong>',
      ALT_FILE_EXT: 'Alternativ tekst bør ikke inkludere filtypenavne eller billeddimensioner. Hvis billedet formidler en historie, en stemning eller vigtig information - så sørg for at beskrive billedet. Fjern det: <strong {C}>%(ERROR)</strong>. <hr> {ALT} <strong {C}>%(ALT_TEXT)</strong>',
      ALT_PLACEHOLDER: 'Ikke-beskrivende eller pladsholder-alt-tekst fundet. Udskift den følgende alt-tekst med noget mere meningsfuldt. <hr> {ALT} <strong {C}>%(ALT_TEXT)</strong>',
      SUS_ALT: 'Hjælpemidler indikerer allerede, at dette er et billede, så &quot;<strong {C}>%(ERROR)</strong>&quot; kan være overflødigt. <hr> {ALT} <strong {C}>%(ALT_TEXT)</strong>',
      LINK_IMAGE_NO_ALT_TEXT: 'Billedet i linket er markeret som dekorativt, og der er ingen linktekst. Tilføj venligst alt-tekst til billedet, der beskriver linkets destination.',
      LINK_IMAGE_TEXT: 'Billedet er markeret som dekorativt, selvom linket bruger den omgivende tekst som en beskrivende label.',
      LINK_IMAGE_LONG_ALT: 'Alt-tekstbeskrivelsen på et linket billede er <strong>for lang</strong>. Alt-teksten på linkede billeder skal beskrive, hvor linket fører dig hen, ikke en bogstavelig beskrivelse af billedet. <strong>Overvej at bruge titlen på den side, der linkes til, som alt-tekst.</strong> <hr> {ALT} {L} <strong {B}>%(altLength) Tegn</strong> <strong {C}>%(ALT_TEXT)</strong>',
      LINK_IMAGE_ALT: 'Billedlink indeholder alt-tekst. <strong>Beskriver alt-teksten, hvor linket fører dig hen?</strong> Overvej at bruge titlen på den side, der linkes til, som alt-tekst. <hr> {ALT} {L} <strong {C}>%(ALT_TEXT)</strong>',
      LINK_IMAGE_ALT_AND_TEXT: 'Billedlink indeholder <strong>både alt-tekst og omgivende linktekst.</strong> Hvis dette billede er dekorativt og bruges som et funktionelt link til en anden side, skal du overveje at markere billedet som dekorativt eller nul - den omgivende linktekst bør være tilstrækkelig. <hr> {ALT} <strong {C}>%(ALT_TEXT)</strong> <hr> <strong {B}>Tilgængeligt navn</strong> {L} <strong {C}>%(TEXT)</strong>',
      IMAGE_FIGURE_DECORATIVE: 'Billedet er markeret som <strong>dekorativt</strong> og vil blive ignoreret af hjælpemidler. <hr> Selvom der er angivet en <strong>caption</strong>, bør billedet i de fleste tilfælde også have en alt-tekst. <ul><li>Alt-teksten skal give en kortfattet beskrivelse af, hvad der er på billedet.</li><li>Billedteksten skal normalt give kontekst for at relatere billedet til det omgivende indhold eller gøre opmærksom på et bestemt stykke information.</li></ul>Lær mere: <a href="https://thoughtbot.com/blog/alt-vs-figcaption#the-figcaption-element">alt versus figcaption.</a>',
      IMAGE_FIGURE_DUPLICATE_ALT: 'Brug ikke nøjagtig de samme ord til både alt- og billedtekst. Skærmlæsere vil annoncere informationen to gange.<ul><li>Alt-teksten skal give en kortfattet beskrivelse af, hvad der er i billedet.</li><li>Billedteksten skal normalt give kontekst for at relatere billedet tilbage til det omgivende indhold eller gøre opmærksom på et bestemt stykke information.</li></ul> Lær mere: <a href="https://thoughtbot.com/blog/alt-vs-figcaption#the-figcaption-element">alt versus figcaption.</a> <hr> {ALT} <strong {C}>%(ALT_TEXT)</strong>',
      IMAGE_DECORATIVE: 'Billedet er markeret som <strong>dekorativt</strong> og vil blive ignoreret af hjælpemidler. Hvis billedet formidler en historie, stemning eller vigtig information - så sørg for at tilføje alt-tekst.',
      IMAGE_ALT_TOO_LONG: 'Alt-tekstbeskrivelsen er <strong>for lang</strong>. Alt-teksten skal være kortfattet, men alligevel meningsfuld som et <em>tweet</em> (omkring 100 tegn). Hvis det er et komplekst billede eller en graf, kan du overveje at placere den lange beskrivelse af billedet i teksten nedenfor eller i en harmonika-komponent. <hr> {ALT} <strong {B}>%(altLength) Tegn</strong> <strong {C}>%(ALT_TEXT)</strong>',
      IMAGE_DECORATIVE_CAROUSEL: 'Billedet er markeret som dekorativt, men alle billeder i en karrusel eller galleri bør inkludere beskrivende alt-tekst for at sikre en tilsvarende oplevelse for alle.',
      IMAGE_PASS: '{ALT} %(ALT_TEXT)',

      // Form labels
      LABELS_MISSING_IMAGE_INPUT: 'Billedknappen mangler alt-tekst. Tilføj venligst alt-tekst for at give et tilgængeligt navn. For eksempel: <em>Søg</em> eller <em>Send</em>.',
      LABELS_INPUT_RESET: 'Nulstillingsknapper bør <strong>ikke</strong> bruges, medmindre det er specifikt nødvendigt, fordi de er lette at aktivere ved en fejl. <hr> <strong>Tip!</strong> Lær, hvorfor <a href="https://www.nngroup.com/articles/reset-and-cancel-buttons/">Reset- og Cancel-knapper giver problemer med brugervenligheden.</a>',
      LABELS_ARIA_LABEL_INPUT: 'Input har et tilgængeligt navn, men sørg for, at der også er en synlig label. <hr> <strong {B}>Tilgængeligt navn</strong> <strong {C}>%(TEXT)</strong>',
      LABELS_NO_FOR_ATTRIBUTE: 'Der er ingen label knyttet til dette input. Tilføj en <code>for</code>-attribut til den label, der matcher <code>id</code> for dette input. <hr> <strong {B}>ID</strong> <strong {C}>#%(id)</strong>',
      LABELS_MISSING_LABEL: 'Der er ingen label knyttet til dette input. Tilføj venligst et <code>id</code> til dette input, og tilføj en matchende <code>for</code>-attribut til etiketten.',
      LABELS_PLACEHOLDER: 'Forbigående pladsholdertekst gør det svært for folk at huske, hvilken information der hører til i et felt, og at identificere og rette valideringsproblemer. Overvej i stedet at bruge et permanent synligt hint før formularfeltet. <hr> Læs mere: <a href="https://www.nngroup.com/articles/form-design-placeholders/">Pladsholdere i formularfelter er skadelige.</a>',

      // Embedded content
      EMBED_VIDEO: 'Sørg for, at <strong>alle videoer har undertekster.</strong> Det er et obligatorisk krav på niveau A at levere undertekster til alt lyd- og videoindhold. Undertekster støtter mennesker, der er døve eller hørehæmmede.',
      EMBED_AUDIO: 'Sørg for at levere en <strong>udskrift til alle podcasts.</strong> At levere udskrifter til lydindhold er et obligatorisk niveau A-krav. Udskrifter hjælper mennesker, der er døve eller hørehæmmede, men kan være til gavn for alle. Overvej at placere udskriften nedenfor eller i et harmonika-panel.',
      EMBED_DATA_VIZ: 'Datavisualiseringswidgets som denne er ofte problematiske for folk, der bruger et tastatur eller en skærmlæser til at navigere, og kan udgøre betydelige vanskeligheder for folk, der er svagtseende eller farveblinde. Det anbefales at give de samme oplysninger i et alternativt format (tekst eller tabel) under widgetten. <hr> Få mere at vide om <a href="https://www.w3.org/WAI/tutorials/images/complex">komplekse billeder.</a>',
      EMBED_MISSING_TITLE: 'Indlejret indhold kræver et tilgængeligt navn, der beskriver dets indhold. Angiv venligst en unik <code>title</code> eller <code>aria-label</code> attribut på <code>iframe</code>-elementet. Få mere at vide om <a href="https://web.dev/learn/accessibility/more-html#iframes">iFrames.</a>',
      EMBED_GENERAL: 'Kan ikke kontrollere indlejret indhold. Sørg for, at billeder har alt-tekst, videoer har undertekster, tekst har tilstrækkelig kontrast, og interaktive komponenter er <a href="https://webaim.org/techniques/keyboard/">tilgængelige via tastaturet.</a>',
      EMBED_UNFOCUSABLE: '<code>&lt;iframe&gt;</code> med ikke-fokuserbare elementer bør ikke have <code>tabindex="-1"</code>. Det indlejrede indhold vil ikke være tilgængeligt med tastaturet.',

      // QA
      QA_BAD_LINK: 'Dårligt link fundet. Linket ser ud til at pege på et udviklingsmiljø. <hr> {L} <strong {C}>%(LINK)</strong>',
      QA_IN_PAGE_LINK: 'Brudt samme-sides link. Linkmålet stemmer ikke overens med nogen element på denne side.',
      QA_STRONG_ITALICS: 'Fede og kursive tags har semantisk betydning og bør <strong>ikke</strong> bruges til at fremhæve hele afsnit. Fed tekst skal bruges til at give stærk <strong>fremhævelse</strong> af et ord eller en sætning. Kursiv bør bruges til at fremhæve egennavne (f.eks. bog- og artikeltitler), fremmedord og citater. Lange citater skal formateres som blokcitater.',
      QA_PDF: 'Kan ikke tjekke PDF\'er for tilgængelighed. PDF\'er betragtes som webindhold og skal også gøres tilgængelige. PDF\'er indeholder ofte problemer for folk, der bruger skærmlæsere (manglende strukturelle tags eller manglende formularfeltetiketter) og folk, der ser dårligt (teksten flyder ikke ud igen, når den forstørres). <ul><li>Hvis dette er en formular, kan du overveje at bruge en tilgængelig HTML-formular som alternativ.</li><li>Hvis dette er et dokument, kan du overveje at konvertere det til en webside.</li></ul> Ellers bedes du tjekke <a href="https://helpx.adobe.com/acrobat/using/create-verify-pdf-accessibility.html">PDF for tilgængelighed i Acrobat DC.</a>',
      QA_DOCUMENT: 'Kan ikke tjekke dokumentet for tilgængelighed. Linkede dokumenter betragtes som webindhold og skal også gøres tilgængelige. Gennemgå venligst dette dokument manuelt. <ul><li>Gør dit <a href="https://support.google.com/docs/answer/6199477?hl=da">Google Workspace-dokument eller din præsentation mere tilgængelig.</a></li><li>Gør dine <a href="https://support.microsoft.com/da/office/create-accessible-office-documents-868ecfcd-4f00-4224-b881-a65537a7c155">Office-dokumenter mere tilgængelige.</a></li></ul>',
      QA_BLOCKQUOTE: 'Er dette en overskrift? <strong {C}>%(TEXT)</strong> <hr> Blokcitater bør kun bruges til citater. Hvis dette er tænkt som en overskrift, skal du ændre dette blokcitat til en semantisk overskrift (f.eks. Overskrift 2 eller Overskrift 3).',
      QA_FAKE_HEADING: 'Er dette en overskrift? <strong {C}>%(TEXT)</strong> <hr> En linje med fed eller stor tekst kan ligne en overskrift, men en person, der bruger en skærmlæser, kan ikke se, at den er vigtig eller springe til indholdet. Fed eller stor tekst bør aldrig erstatte semantiske overskrifter (Overskrift 2 til Overskrift 6).',
      QA_FAKE_LIST: 'Prøver du at oprette en liste? Muligt listeelement fundet: <strong {C}>%(firstPrefix)</strong> <hr> Sørg for at bruge semantiske lister ved at bruge punkt- eller talformateringsknapperne i stedet. Når du bruger en semantisk liste, kan hjælpeteknologier formidle oplysninger som det samlede antal elementer og den relative placering af hvert element i listen. Få mere at vide om <a href="https://www.w3.org/WAI/tutorials/page-structure/content/#lists">semantiske lister.</a>',
      QA_UPPERCASE: 'Fundet med store bogstaver. Nogle skærmlæsere kan fortolke tekst med store bogstaver som et akronym og vil læse hvert bogstav individuelt. Derudover synes nogle mennesker, at store bogstaver er sværere at læse, og det kan se ud, som om man råber.',
      QA_UNDERLINE: 'Understreget tekst kan forveksles med links. Overvej at bruge en anden stil som <code>&lt;strong&gt;</code><strong>strong importance</strong><code>&lt;/strong&gt;</code> eller <code>&lt;em&gt;</code><em>emphasis</em><code>&lt;/em&gt;</code>.',
      QA_SUBSCRIPT: 'Formateringsindstillingerne subscript og superscript bør kun bruges til at ændre placeringen af tekst af hensyn til typografiske konventioner eller standarder. De bør <strong>ikke</strong> udelukkende bruges til præsentation eller udseende. Formatering af hele sætninger giver problemer med læsbarheden. Passende anvendelsestilfælde ville omfatte visning af eksponenter, ordenstal som 4<sup>th</sup> i stedet for fjerde og kemiske formler (f.eks. H<sub>2</sub>O).',
      QA_NESTED_COMPONENTS: 'Undgå at indlejre interaktive layoutkomponenter, såsom at placere akordeoner i faner eller faner i akordeoner. Dette kan komplicere navigationen, øge den kognitive belastning og føre til, at folk overser indhold.',
      QA_JUSTIFY: 'Undgå at bruge justeret tekst, som er justeret til både venstre og højre margen. Dette kan være svært for nogle at læse på grund af de ujævne mellemrum mellem ordene. Brug venstrejusteret tekst for bedre læsbarhed.',
      QA_SMALL_TEXT: 'Lille tekst er sværere at læse, især for dem med nedsat syn. For at sikre bedre læsbarhed skal du undgå at bruge skriftstørrelser, der er mindre end standarden.',

      // Shared
      ACC_NAME: '<strong {B}>Tilgængeligt navn</strong> %(TEXT)',
      ACC_NAME_TIP: '<hr><strong>Tip!</strong> "Tilgængeligt navn" er den endelige etiket, der kommunikeres til personer, der bruger hjælpemidler. Dette hjælper dem med at forstå formålet med linket eller knappen.',
      HIDDEN_FOCUSABLE: 'Link eller knap har <code>aria-hidden=&quot;true&quot;</code>, men kan stadig fokuseres med tastaturet. Hvis du ønsker at skjule et duplikeret link eller en knap, skal du også tilføje <code>tabindex=&quot;-1&quot;</code>. Ellers bør <code>aria-hidden=&quot;true&quot;</code> ikke bruges på elementer, der kan modtage fokus. <hr> Læs mere om <a href="https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/Attributes/aria-hidden">aria-hidden-attributten.</a>',

      // Developer
      DUPLICATE_ID: 'Fandt <strong>duplikat-ID</strong>. Fejl med dublerede ID\'er er kendt for at give problemer for hjælpeteknologier, når de forsøger at interagere med indhold. Fjern eller ændr venligst følgende ID. <hr> <strong {B}>ID</strong> <strong {C}>#%(id)</strong>',
      UNCONTAINED_LI: 'Alle <code>&lt;li&gt;</code> listeelementer skal placeres inde i <code>&lt;ul&gt;</code> uordnede eller <code>&lt;ol&gt;</code> ordnede elementer. Denne struktur hjælper skærmlæsere med at annoncere listen og dens elementer nøjagtigt.',
      TABINDEX_ATTR: 'Elementet bør ikke have et <code>tabindex</code>-attribut større end 0.',

      // Meta checks
      META_LANG: 'Sidens sprog er ikke angivet! Venligst <a href="https://www.w3.org/International/questions/qa-html-language-declarations">deklarer sprog på HTML-tag.</a>',
      META_TITLE: 'Manglende sidetitel! Angiv venligst en <a href="https://developer.mozilla.org/en-US/docs/Web/HTML/Element/title">sidetitel.</a>',
      META_SCALABLE: 'Fjern parameteren <code>user-scalable="no"</code> i <a href="https://developer.mozilla.org/en-US/docs/Web/HTML/Viewport_meta_tag">viewport meta-taggen</a> for at tillade zoomning.',
      META_MAX: 'Sørg for, at parameteren <code>maximum-scale</code> i <a href="https://developer.mozilla.org/en-US/docs/Web/HTML/Viewport_meta_tag">viewport meta-taggen</a> ikke er mindre end 2.',
      META_REFRESH: 'Siden bør ikke automatisk opdatere ved hjælp af et meta-tag.',

      // Buttons
      BTN_EMPTY: 'Knappen mangler et tilgængeligt navn, der beskriver dens formål.',
      BTN_EMPTY_LABELLEDBY: 'Knappen har en <code>aria-labelledby</code> værdi, der er tom eller ikke stemmer overens med <code>id</code> værdien af et andet element på siden.',
      BTN: 'knap',
      BTN_TIP: 'Lær, hvordan du laver en <a href="https://www.sarasoueidan.com/blog/accessible-icon-buttons/">tilgængelig knap.</a>',
      BTN_ROLE_IN_NAME: 'Inkluder ikke ordet "knap" i navnet på en knap. Skærmlæsere meddeler allerede elementets rolle ud over dets navn.',
      LABEL_IN_NAME: 'Den synlige tekst for dette element ser ud til at være forskellig fra det tilgængelige navn, hvilket kan forårsage forvirring for brugere af hjælpeværktøjer. Gennemgå venligst: <hr> <strong {B}>Tilgængeligt navn</strong> <strong {C}>%(TEXT)</strong>',

      // Tables
      TABLES_MISSING_HEADINGS: 'Manglende tabeloverskrifter! Tilgængelige tabeller har brug for HTML-markup, der angiver overskriftsceller og dataceller, som definerer deres forhold. Disse oplysninger giver kontekst til folk, der bruger hjælpemidler. Tabeller bør kun bruges til tabeldata. <hr> Få mere at vide om <a href="https://www.w3.org/WAI/tutorials/tables/">tilgængelige tabeller.</a>',
      TABLES_SEMANTIC_HEADING: 'Semantiske overskrifter som Heading 2 eller Heading 3 bør kun bruges til sektioner af indhold; <strong>ikke</strong> i HTML-tabeller. Angiv tabeloverskrifter ved hjælp af <code>&lt;th&gt;</code>-elementet i stedet. <hr> Få mere at vide om <a href="https://www.w3.org/WAI/tutorials/tables/">tilgængelige tabeller.</a>',
      TABLES_EMPTY_HEADING: 'Tom tabeloverskrift fundet! Tabeloverskrifter bør <strong>aldrig</strong> være tomme. Det er vigtigt at udpege række- og/eller kolonneoverskrifter for at formidle deres relation. Disse oplysninger giver kontekst til personer, der bruger hjælpemidler. Husk, at tabeller kun bør bruges til tabeldata. <hr> Få mere at vide om <a href="https://www.w3.org/WAI/tutorials/tables/">tilgængelige tabeller.</a>',

      // Contrast
      CONTRAST_NORMAL: 'Tekst i normal størrelse bør have en kontrastforhold på mindst %(RATIO).',
      CONTRAST_LARGE: 'Tekst i stor størrelse bør have en kontrastforhold på mindst %(RATIO).',
      CONTRAST_ERROR: 'Teksten har ikke tilstrækkelig kontrast med baggrunden, hvilket gør den sværere at læse.',
      CONTRAST_WARNING: 'Kontrasten for denne tekst er ukendt og skal manuelt gennemgås. Sørg for, at teksten og baggrunden har stærke kontrastfarver.',
      CONTRAST_ERROR_GRAPHIC: 'Grafikken har ikke tilstrækkelig kontrast med baggrunden, hvilket gør den sværere at se.',
      CONTRAST_WARNING_GRAPHIC: 'Kontrasten for denne grafik er ukendt og skal manuelt gennemgås.',
      CONTRAST_TIP_GRAPHIC: 'Grafikker og brugergrænsefladeelementer skal have mindst et 3:1-forhold.',
      CONTRAST_OPACITY: 'Øg opaciteten for bedre synlighed.',
      CONTRAST_APCA: 'Dette er ikke nok kontrast til nogen tekststørrelse. Overvej at bruge denne farve- og tekststørrelseskombination?',
      CONTRAST_COLOR: 'Overvej at bruge denne farve i stedet?',
      CONTRAST_SIZE: 'Overvej at gøre tekststørrelsen større for denne farvekombination?',
      CONTRAST_PLACEHOLDER: 'Pladsholderteksten i dette inputfelt har ikke tilstrækkelig kontrast med baggrunden, hvilket gør den sværere at læse.',
      CONTRAST_PLACEHOLDER_UNSUPPORTED: 'Kontrasten for denne pladsholdertekst er ukendt og skal gennemgås manuelt. Sørg for, at teksten og baggrunden har stærke kontrastfarver.',
      CONTRAST_INPUT: 'Teksten i dette inputfelt har ikke tilstrækkelig kontrast med baggrunden, hvilket gør den sværere at læse.',
      CONTRAST: 'Kontrast',
      UNKNOWN: 'Ukendt',
      FG: 'Forgrund',
      BG: 'Baggrund',
      NO_SUGGESTION: 'Ingen tilgængelig kombination kan findes ved at ændre tekstfarven. Prøv at ændre baggrundsfarven.',
    },
  };

  return da;

}));
