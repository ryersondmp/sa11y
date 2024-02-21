
/*!
  * Sa11y, the accessibility quality assurance assistant.
  * @version 3.0.9
  * @author Adam Chaboryk, Toronto Metropolitan University
  * @license GPL-2.0-or-later
  * @copyright © 2020 - 2024 Toronto Metropolitan University (formerly Ryerson University).
  * @contact adam.chaboryk@torontomu.ca
  * GitHub: git+https://github.com/ryersondmp/sa11y.git | Website: https://sa11y.netlify.app
  * For all acknowledgements, please visit: https://sa11y.netlify.app/acknowledgements/
  * The above copyright notice shall be included in all copies or substantial portions of the Software.
**/
/*! WARNING: This is a machine-generated translation and may contain errors or inaccuracies. */
var lv = {
  // Latvian
  strings: {
    LANG_CODE: 'lv',
    MAIN_TOGGLE_LABEL: 'Pārbaudiet pieejamību',
    CONTAINER_LABEL: 'Pieejamības pārbaudītājs',
    ERROR: 'Kļūda',
    ERRORS: 'Kļūdas',
    WARNING: 'Brīdinājums',
    WARNINGS: 'Brīdinājumi',
    GOOD: 'Labi',
    ON: 'Ieslēgts',
    OFF: 'Izslēgts',
    ALERT_TEXT: 'Brīdinājums',
    ALERT_CLOSE: 'Aizvērt',
    OUTLINE: 'Lapas izklāsts',
    PAGE_ISSUES: 'Lapas problēmas',
    SETTINGS: 'Iestatījumi',
    CONTRAST: 'Kontrasts',
    FORM_LABELS: 'Veidlapu etiķetes',
    LINKS_ADVANCED: 'Saites (uzlabotas)',
    DARK_MODE: 'Tumšais režīms',
    SHORTCUT_SCREEN_READER: 'Pāriet uz nākamo numuru. Tastatūras saīsne: Alt S',
    SHORTCUT_TOOLTIP: 'Pāriet uz jautājumu',
    NEW_TAB: 'Atver jaunu cilni',
    PANEL_HEADING: 'Pieejamības pārbaude',
    PANEL_STATUS_NONE: 'Kļūdas nav atrastas.',
    PANEL_ICON_WARNINGS: 'atrasti brīdinājumi.',
    PANEL_ICON_TOTAL: 'kopējais atrasto problēmu skaits.',
    NOT_VISIBLE_ALERT: 'Mēģinātais apskatīt vienums nav redzams; iespējams, tas ir paslēpts vai atrodas akordeona vai cilnes komponenta iekšpusē. Šeit ir priekšskatījums:',
    ERROR_MISSING_ROOT_TARGET: 'Tika pārbaudīta visas lapas pieejamība, jo mērķa apgabals <code>%(root)</code> nepastāv.',
    HEADING_NOT_VISIBLE_ALERT: 'Virsraksts nav redzams; tas var būt paslēpts vai akordeona vai cilnes komponenta iekšpusē.',
    SKIP_TO_PAGE_ISSUES: 'Pāriet uz lapas jautājumiem',
    CONSOLE_ERROR_MESSAGE: 'Atvainojiet, bet šajā lapā ir problēma ar pieejamības pārbaudītāju. Vai varat, lūdzu, <a href="%(link)">ziņot par to, izmantojot šo formu</a> vai <a href="%(link)">GitHub</a>?',

    // Dismiss
    PANEL_DISMISS_BUTTON: 'Rādīt %(dismissCount) noraidīto brīdinājumu skaitu',
    DISMISS: 'Atbrīvot',
    DISMISSED: 'Noraidītie brīdinājumi',
    DISMISS_REMINDER: 'Lūdzu, ņemiet vērā, ka brīdinājumi tiek <strong>atcelti tikai uz laiku</strong>. Iztīrot pārlūkprogrammas vēsturi un sīkfailus, tiks atjaunoti visi iepriekš noraidītie brīdinājumi visās lapās.',

    // Export
    DATE: 'Datums',
    PAGE_TITLE: 'Lapas nosaukums',
    RESULTS: 'Rezultāti',
    EXPORT_RESULTS: 'Eksportēt rezultātus',
    GENERATED: 'Rezultāti ģenerēti ar %(tool).',
    PREVIEW: 'Priekšskatījums',
    ELEMENT: 'Elements',
    PATH: 'Ceļš',

    // Colour filters
    COLOUR_FILTER: 'Krāsu filtrs',
    PROTANOPIA: 'Protanopija',
    DEUTERANOPIA: 'Deuteranopija',
    TRITANOPIA: 'Tritanopia',
    MONOCHROMACY: 'Vienkrāsainība',
    COLOUR_FILTER_MESSAGE: 'Pārbaudiet, vai nav grūti pamanāmi vai no citām krāsām atšķirami elementi.',
    RED_EYE: 'Sarkanais aklais.',
    GREEN_EYE: 'Zaļās žalūzijas.',
    BLUE_EYE: 'Zilā žalūzija.',
    MONO_EYE: 'Sarkans, zils un zaļš akls.',
    COLOUR_FILTER_HIGH_CONTRAST_MESSAGE: 'Krāsu filtri nedarbojas augsta kontrasta režīmā.',

    // Alternative text stop words
    SUSPICIOUS_ALT_STOPWORDS: [
      'attēls',
      'grafikas',
      'foto',
      'photo',
      'image',
      'graphic',
    ],
    PLACEHOLDER_ALT_STOPWORDS: [
      'alt',
      'attēls',
      'foto',
      'dekoratīvs',
      'photo',
      'image',
      'graphic',
      'vietvārds',
      'aizvietotāja attēls',
      'starplikas',
    ],
    PARTIAL_ALT_STOPWORDS: [
      'noklikšķiniet uz',
      'klikšķiniet šeit',
      'klikšķiniet šeit, lai uzzinātu vairāk',
      'klikšķinot šeit',
      'apskatīt',
      'sīkāka informācija šeit',
      'sīkāk šeit',
      'lejupielādēt',
      'lejupielādēt šeit',
      'uzzināt',
      'uzzināt vairāk',
      'veidlapa',
      'šeit',
      'informācija',
      'saite',
      'uzzināt',
      'iemācīties',
      'vairāk',
      'lapa',
      'papīrs',
      'lasīt vairāk',
      'lasīt',
      'izlasiet šo',
      'šis',
      'šo lapu',
      'šo tīmekļa vietni',
      'skatīt',
      'apskatīt mūsu',
      'tīmekļa vietne',
    ],
    WARNING_ALT_STOPWORDS: [
      'klikšķiniet šeit',
    ],
    NEW_WINDOW_PHRASES: [
      'ārējais',
      'jauna cilne',
      'jauns logs',
      'uznirstošais',
      'uznirstošais logs',
    ],
    FILE_TYPE_PHRASES: ['dokuments', 'izklājlapa', 'aprēķinu lapa', 'saspiests fails', 'arhivēts fails', 'darblapa', 'powerpoint', 'prezentācija', 'instalēt', 'video', 'audio', 'pdf'],
    LANG_READABILITY: 'Lasāmība',
    LANG_AVG_SENTENCE: 'Vidējais vārdu skaits teikumā:',
    LANG_COMPLEX_WORDS: 'Sarežģīti vārdi:',
    LANG_TOTAL_WORDS: 'Vārdi:',
    LANG_VERY_DIFFICULT: 'Ļoti grūti',
    LANG_DIFFICULT: 'Grūtības',
    LANG_FAIRLY_DIFFICULT: 'Diezgan grūti',
    LANG_GOOD: 'Labi',
    READABILITY_NO_P_OR_LI_MESSAGE: 'Nav iespējams aprēķināt lasāmības rezultātu. Nav atrasta neviena rindkopa <code>&lt;p&gt;</code> vai saraksta saturs <code>&lt;li&gt;</code>.',
    READABILITY_NOT_ENOUGH_CONTENT_MESSAGE: 'Nepietiek satura, lai aprēķinātu lasāmības rādītāju.',
    HEADING_NON_CONSECUTIVE_LEVEL: 'Izmantots virsrakstu līmenis, kas nav secīgs. Virsraksti nekad nedrīkst izlaist līmeņus vai pāriet no <strong>virsraksta %(prevLevel)</strong> uz <strong {r}>virsraksta %(level)</strong>.',
    HEADING_EMPTY: 'Tukša pozīcija atrasta! Lai to novērstu, dzēsiet šo rindu vai mainiet tās formātu no <strong {r}>Galviņa %(level)</strong> uz <strong>Normāls</strong> vai <strong>Apakšsadaļa</strong>.',
    HEADING_LONG: 'Virsraksts ir garš! Virsraksti jāizmanto, lai sakārtotu saturu un izteiktu struktūru. Tām jābūt īsām, informatīvām un unikālām. Lūdzu, lai virsraksti būtu īsāki par 160 rakstzīmēm (ne garāki par vienu teikumu). <hr> Rakstzīmju skaits: <strong {r}>%(headingLength)</strong>',
    HEADING_FIRST: 'Pirmais virsraksts lapā parasti ir 1. vai 2. virsraksts. Ar 1. virsrakstu jāsāk galvenā satura sadaļa, un tas ir galvenais virsraksts, kas raksturo lapas vispārējo mērķi. Uzziniet vairāk par <a href="https://www.w3.org/WAI/tutorials/page-structure/headings/">Galveno virsrakstu struktūru</a>.',
    HEADING_MISSING_ONE: 'Trūkst 1. virsraksta. 1. virsrakstam jābūt galvenā satura laukuma sākumam, un tas ir galvenais virsraksts, kas apraksta lapas vispārējo mērķi. Uzziniet vairāk par <a href="https://www.w3.org/WAI/tutorials/page-structure/headings/">Galveno struktūru</a>.',
    HEADING_EMPTY_WITH_IMAGE: 'Virsrakstā nav teksta, bet ir attēls. Ja tas nav virsraksts, mainiet tā formātu no <strong {r}>Virsraksts %(level)</strong> uz <strong>Normāls</strong> vai <strong>Apakšsadaļa</strong>. Pretējā gadījumā pievienojiet attēlam alt tekstu, ja tas nav dekoratīvs.',
    PANEL_HEADING_MISSING_ONE: 'Trūkst 1. pozīcijas!',
    PANEL_NO_HEADINGS: 'Virsraksti nav atrasti.',
    LINK_EMPTY: 'Dzēst tukšas saites bez teksta.',
    LINK_EMPTY_LINK_NO_LABEL: 'Saitei nav atpazīstama teksta, kas būtu redzams ekrānlasītājiem un citām palīgtehnoloģijām. Lai labotu: </li><li>Pievienojiet īsu tekstu, kas apraksta, kur saite ved.</li><li>Ja tā ir <a href="https://a11y-101.com/development/icons-and-links">ikonas saite vai SVG,</a>, tai, visticamāk, trūkst aprakstoša marķējuma.</li><li>Ja domājat, ka šī saite ir kļūda, kas radusies kopēšanas/ielīmēšanas kļūdas dēļ, apsveriet tās dzēšanu.</li></ul>.',
    LINK_LABEL: '<strong>Saites etiķete:</strong> %(sanitizedText)',
    LINK_STOPWORD: 'Saites teksts var nebūt pietiekami aprakstošs ārpus konteksta: <strong {r}>%(kļūda)</strong><hr><strong>Padoms!</strong> Saites tekstam vienmēr jābūt skaidram, unikālam un nozīmīgam. Izvairieties no tādiem bieži lietotiem vārdiem kā &quot;klikšķiniet šeit&quot; vai &quot;uzzināt vairāk&quot;;',
    LINK_BEST_PRACTICES: 'Apsveriet iespēju aizstāt saites tekstu: <strong {r}>%(kļūda)</strong><hr><ul><ul><li>&quot;Noklikšķiniet šeit&quot; liek uzsvaru uz peles mehāniku, lai gan daudzi cilvēki neizmanto peli vai, iespējams, skatās šo vietni mobilajā ierīcē. Apsveriet iespēju izmantot citu darbības vārdu, kas attiecas uz uzdevumu.</li><li>Izvairieties no HTML simbolu izmantošanas kā aicinājumu veikt darbības, ja vien tie nav paslēpti palīgtehnoloģijām.</li></ul>.',
    LINK_URL: 'Garākus, mazāk saprotamus URL, kas tiek izmantoti kā saites teksts, var būt grūti saprast, kad tiem piekļūst ar palīgtehnoloģiju palīdzību. Vairumā gadījumu URL vietā ir labāk izmantot cilvēkam saprotamu tekstu. Īsi URL (piemēram, vietnes sākumlapa) ir piemēroti.<hr><strong>Padoms!</strong> Saites tekstam vienmēr jābūt skaidram, unikālam un jēgpilnam, lai to varētu saprast arī ārpus konteksta.',
    LINK_DOI: 'Tīmekļa lapām vai tikai tiešsaistes resursiem <a href="https://apastyle.apa.org/style-grammar-guidelines/paper-format/accessibility/urls#:~:text=descriptive%20links">APA stila rokasgrāmatā</a> ir ieteikts izmantot aprakstošas saites, ap darba virsrakstu aptinot tā URL vai DOI. Garākus, mazāk saprotamus URL, kas tiek izmantoti kā saites teksts, var būt grūti saprast, kad tiem piekļūst ar palīgtehnoloģiju palīdzību.',
    NEW_TAB_WARNING: 'Saite atveras jaunā cilnē vai logā bez brīdinājuma. Tas var radīt apjukumu, jo īpaši cilvēkiem, kuriem ir grūtības uztvert vizuālo saturu. Otrkārt, ne vienmēr ir laba prakse kontrolēt kāda cilvēka pieredzi vai pieņemt lēmumus viņa vietā. Norādiet, ka saite atveras jaunā logā, saites tekstā<hr><strong>Padoms!</strong> Apgūstiet labāko praksi: <a href="https://www.nngroup.com/articles/new-browser-windows-and-tabs/">atvērt saites jaunos pārlūkprogrammas logos un cilnēs</a>.',
    FILE_TYPE_WARNING: 'Saite norāda uz PDF vai lejupielādējamu failu (piemēram, MP3, Zip, Word Doc) bez brīdinājuma. Saites tekstā norādiet faila veidu. Ja tas ir liels fails, apsveriet iespēju norādīt faila lielumu.<hr><strong>Piemērs:</strong> Vadības ziņojums (PDF, 3 MB).',
    LINK_IDENTICAL_NAME: 'Saitei ir identisks teksts kā citai saitei, lai gan tā norāda uz citu lapu. Vairākas saites ar vienādu tekstu var radīt neskaidrības cilvēkiem, kuri izmanto ekrānlasītājus.<hr>Padomājiet, vai šādu saiti nevajadzētu padarīt aprakstošāku, lai palīdzētu to atšķirt no citām saitēm: <strong {r}>%(sanitizedText)</strong>',
    MISSING_ALT_LINK_BUT_HAS_TEXT_MESSAGE: 'Attēls tiek izmantots kā saite ar apkārtējo tekstu, lai gan atribūtam alt jābūt atzīmētam kā dekoratīvam vai nulles atribūtam.',
    MISSING_ALT_LINK_MESSAGE: 'Attēls tiek izmantots kā saite, bet tam trūkst teksta! Lūdzu, pārliecinieties, ka alt tekstā ir aprakstīts, uz kurieni jūs aizved saite.',
    MISSING_ALT_MESSAGE: 'Trūkst alt teksta! Ja attēls ir stāsts, noskaņa vai svarīga informācija, noteikti aprakstiet attēlu.',
    LINK_ALT_HAS_FILE_EXTENSION: 'Atrasts faila paplašinājums alt tekstā. Pārliecinieties, ka alt teksts apraksta saites galamērķi, nevis burtisku attēla aprakstu. Noņemt: <strong {r}>%(error)</strong>.<hr><strong>Alt teksts:</strong> %(altText)',
    LINK_IMAGE_PLACEHOLDER_ALT_MESSAGE: 'Atrasts nenoteikts vai aizvietotājs alt teksts saistītajā attēlā. Pārliecinieties, ka alt teksts apraksta saites galamērķi, nevis burtisku attēla aprakstu. Aizstājiet šādu alt tekstu: <strong {r}>%(altText)</strong>',
    LINK_IMAGE_SUS_ALT_MESSAGE: 'Palīgtehnoloģijas jau norāda, ka tas ir attēls, tāpēc &quot;<strong {r}>%(error)</strong>&quot; var būt lieks. Pārliecinieties, ka alt teksts apraksta saites galamērķi, nevis burtisku attēla aprakstu. <hr> <strong>Alt teksts:</strong> %(altText)',
    ALT_HAS_FILE_EXTENSION: 'Atrasts faila paplašinājums alt tekstā. Ja attēls ir stāsts, noskaņa vai svarīga informācija, noteikti aprakstiet attēlu. Noņemt: <strong {r}>%(error)</strong>.<hr><strong>Alt teksts:</strong> %(altText)',
    ALT_PLACEHOLDER_MESSAGE: 'Atrasts nenoteikts vai aizvietotājs alt teksts. Aizstājiet šādu alt tekstu ar jēgpilnāku: <strong {r}>%(altText)</strong>',
    ALT_HAS_SUS_WORD: 'Palīgtehnoloģijas jau norāda, ka tas ir attēls, tāpēc &quot;<strong {r}>%(error)</strong>&quot; var būt lieks. <hr> <strong>Altteksts:</strong> %(altText)',
    LINK_HIDDEN_FOCUSABLE: 'Saitē ir <code>aria-hidden=&quot;true&quot;</code>, bet tā joprojām ir pieejama ar tastatūru. Ja vēlaties paslēpt atkārtotu vai dublētu saiti, pievienojiet arī <code>tabindex=&quot;-1&quot;</code>.',
    LINK_IMAGE_NO_ALT_TEXT: 'Attēls saitē ir atzīmēts kā dekoratīvs, un saites teksta nav. Lūdzu, pievienojiet attēlam alt tekstu, kas apraksta saites galamērķi.',
    LINK_IMAGE_HAS_TEXT: 'Attēls ir atzīmēts kā dekoratīvs, lai gan saite izmanto apkārtējo tekstu kā aprakstošu etiķeti.',
    LINK_IMAGE_LONG_ALT: 'Alt teksta apraksts saistītajam attēlam ir <strong>pārāk garš</strong>. Saistīto attēlu alt tekstam ir jāapraksta, uz kurieni ved saite, nevis burtisks attēla apraksts. <strong>Vēlams kā alttekstu izmantot tās lapas virsrakstu, uz kuru ir saite.</strong> <hr> <strong> <strong>Altteksts (<span {r}>%(altLength)</span> rakstzīmes):</strong> %(altText)',
    LINK_IMAGE_ALT_WARNING: 'Attēla saitē ir ietverts alt teksts. <strong>Vai alt tekstā ir aprakstīts, uz kurieni jūs aizved saite?</strong> Apsveriet iespēju kā alt tekstu izmantot tās lapas nosaukumu, uz kuru ir saite. <hr> <strong>Altteksts:</strong> %(altText)',
    LINK_IMAGE_ALT_AND_TEXT_WARNING: 'Attēla saitē ir <strong>gan alt teksts, gan apkārt esošais saites teksts.</strong> Ja šis attēls ir dekoratīvs un tiek izmantots kā funkcionāla saite uz citu lapu, apsveriet iespēju atzīmēt attēlu kā dekoratīvu vai nulles tekstu - pietiek ar apkārtējo saites tekstu. <hr> <strong>Alt teksts:</strong> %(altText) <hr> <strong>Saites etiķete:</strong> %(sanitizedText)',
    IMAGE_FIGURE_DECORATIVE: 'Attēls ir atzīmēts kā <strong>dekoratīvs</strong>, un palīgtehnoloģijas to ignorēs. <hr> Lai gan ir sniegts <strong>uzraksts</strong>, vairumā gadījumu attēlam ir jābūt arī alt tekstam. <ul><li>Alttekstam būtu jāsniedz īss attēlā redzamā apraksts.</li><li>Parakstā parasti būtu jāsniedz konteksts, lai sasaistītu attēlu ar apkārtējo saturu vai pievērstu uzmanību kādai konkrētai informācijai.</li></ul>Uzziniet vairāk: <a href="https://thoughtbot.com/blog/alt-vs-figcaption#the-figcaption-element">alt versus figcaption.</a>.',
    IMAGE_FIGURE_DUPLICATE_ALT: 'Neizmantojiet tieši tos pašus vārdus gan alt, gan virsraksta tekstā. Ekrānlasītāji informāciju paziņos divreiz.<ul><li>Alt tekstā būtu īsi jāapraksta, kas ir attēlā.</li><li>Papildinājumā parasti būtu jāsniedz konteksts, lai attēls būtu saistīts ar apkārtējo saturu, vai jāpievērš uzmanība kādai konkrētai informācijai.</li></ul> Uzziniet vairāk: <a href="https://thoughtbot.com/blog/alt-vs-figcaption#the-figcaption-element">alt versus figcaption.</a> <hr> <strong>Altteksts:</strong> %(altText)',
    IMAGE_DECORATIVE: 'Attēls ir atzīmēts kā <strong>dekoratīvs</strong>, un palīgtehnoloģijas to ignorēs. Ja attēls atspoguļo stāstu, noskaņu vai svarīgu informāciju, noteikti pievienojiet alt tekstu.',
    IMAGE_ALT_TOO_LONG: 'Alt teksta apraksts ir <strong>pārāk garš</strong>. Alt tekstam ir jābūt īsam, bet jēgpilnam kā <em>tweet</em> (apmēram 100 rakstzīmes). Ja tas ir sarežģīts attēls vai grafiks, apsveriet iespēju ievietot garu attēla aprakstu tekstā zemāk vai akordeona komponentē. <hr> <strong>Altteksts (<span {r}>%(altLength)</span> rakstzīmes):</strong> %(altText)',
    IMAGE_PASS: '<strong>Altteksts:</strong> %(altText)',
    LABELS_MISSING_IMAGE_INPUT_MESSAGE: 'Attēla pogai trūkst alt teksta. Lūdzu, pievienojiet alt tekstu, lai nodrošinātu pieejamu nosaukumu. Piemēram: Piemēram, <em>Meklēšana</em> vai <em>Nosūtīt</em>.',
    LABELS_INPUT_RESET_MESSAGE: 'Atiestatīšanas pogas <strong>nevajadzētu izmantot, ja vien tas nav īpaši nepieciešams, jo tās var viegli aktivizēt kļūdas pēc. <hr> <strong>Tip!</strong> Uzziniet, kāpēc <a href="https://www.nngroup.com/articles/reset-and-cancel-buttons/">Pārtraukšanas un atcelšanas pogas rada lietojamības problēmas</a>.',
    LABELS_ARIA_LABEL_INPUT_MESSAGE: 'Ievadei ir pieejams nosaukums, tomēr pārliecinieties, ka ir redzams arī marķējums. <hr> <strong>Ievades etiķete:</strong> %(sanitizedText)',
    LABELS_NO_FOR_ATTRIBUTE_MESSAGE: 'Šim ievadam nav piesaistīta etiķete. Pievienojiet <code>for</code> atribūtu etiķetei, kas atbilst šīs ievades <code>id</code>. <hr> Šīs ievades ID ir: <strong>id=&#34;%(id)&#34;</strong>.',
    LABELS_MISSING_LABEL_MESSAGE: 'Šim ievadam nav piesaistīta etiķete. Lūdzu, pievienojiet šim ievadam <code>id</code> un pievienojiet etiķetei atbilstošu atribūtu <code>for</code>.',
    EMBED_VIDEO: 'Lūdzu, pārliecinieties, ka <strong>visiem videoklipiem ir slēptie titri.</strong> Visu audio un video materiālu titru nodrošināšana ir obligāta A līmeņa prasība. Titri palīdz cilvēkiem, kuri ir nedzirdīgi vai vājdzirdīgi.',
    EMBED_AUDIO: 'Lūdzu, nodrošiniet <strong>transkriptu visiem podkāstiem.</strong> Transkriptu nodrošināšana audio saturam ir obligāta A līmeņa prasība. Transkripcijas palīdz cilvēkiem, kuri ir nedzirdīgi vai vājdzirdīgi, taču tās var būt noderīgas ikvienam. Apsveriet iespēju transkriptu izvietot zem vai akordeona panelī.',
    EMBED_DATA_VIZ: 'Šādi datu vizualizācijas logrīki bieži rada problēmas cilvēkiem, kuri navigācijai izmanto tastatūru vai ekrāna lasītāju, un var radīt ievērojamas grūtības cilvēkiem ar vāju redzi vai krāsu aklumu. Ieteicams to pašu informāciju sniegt alternatīvā (teksta vai tabulas) formātā zem logrīka. <hr> Uzziniet vairāk par <a href="https://www.w3.org/WAI/tutorials/images/complex">sarežģītiem attēliem</a>.',
    EMBED_MISSING_TITLE: 'Iegultajam saturam ir nepieciešams pieejams nosaukums, kas raksturo tā saturu. Lūdzu, norādiet unikālu <code>title</code> vai <code>aria-label</code> atribūtu elementā <code>iframe</code>. Uzziniet vairāk par <a href="https://web.dev/learn/accessibility/more-html#iframes">iFrame.</a>.',
    EMBED_GENERAL_WARNING: 'Nevar pārbaudīt iegulto saturu. Lūdzu, pārliecinieties, ka attēliem ir alt teksts, videoklipiem ir uzraksti, tekstam ir pietiekams kontrasts un interaktīvie komponenti ir <a href="https://webaim.org/techniques/keyboard/">pieejami no tastatūras.</a>.',
    EMBED_UNFOCUSABLE: '<code>&lt;iframe&gt;</code> ar neuzmanāmiem elementiem nevajadzētu būt <code>tabindex="-1"</code>. Iegultais saturs nebūs pieejams ar tastatūru.',
    QA_BAD_LINK: 'Atrasta slikta saite. Šķiet, ka saite norāda uz izstrādes vidi. <hr> Šī saite norāda uz: <br> <strong {r}>%(el)</strong>',
    QA_BAD_ITALICS: 'Trešraksta un slīpraksta tagiem ir semantiska nozīme, un tos nevajadzētu izmantot, lai izceltu veselas rindkopas. Teksts treknrakstā jāizmanto, lai <strong>uzsvērtu kādu vārdu vai frāzi</strong>. Kursīvs jāizmanto, lai izceltu īpašvārdus (piemēram, grāmatu un rakstu nosaukumus), svešvārdus, citātus. Garie citāti jānoformē kā bloka citāts.',
    QA_PDF: 'Nevar pārbaudīt PDF failu pieejamību. PDF tiek uzskatīti par tīmekļa saturu, un arī tiem jābūt pieejamiem. PDF formātos bieži ir problēmas cilvēkiem, kas izmanto ekrānlasītājus (trūkst strukturālo tagu vai veidlapu lauku marķējumu), un cilvēkiem ar vāju redzi (teksts nepalielinās, kad tiek palielināts). <ul><li>Ja tā ir veidlapa, apsveriet iespēju kā alternatīvu izmantot pieejamu HTML veidlapu.</li><li>Ja tas ir dokuments, apsveriet iespēju to pārveidot par tīmekļa lapu.</li></ul>Ja tas ir dokuments, apsveriet iespēju to pārveidot par tīmekļa vietni.</li></ul>Tādā gadījumā pārbaudiet <a href="https://helpx.adobe.com/acrobat/using/create-verify-pdf-accessibility.html">PDF pieejamību programmā Acrobat DC.</a>.',
    QA_DOCUMENT: 'Nevar pārbaudīt dokumenta pieejamību. Saistītie dokumenti tiek uzskatīti par tīmekļa saturu, un arī tiem jābūt pieejamiem. Lūdzu, pārbaudiet šo dokumentu manuāli. <ul><li>Padariet savu <a href="https://support.google.com/docs/answer/6199477?hl=lv">Google Workspace dokumentu vai prezentāciju pieejamāku.</a></li></li><li>Padariet savu <a href="https://support.microsoft.com/lv/office/create-accessible-office-documents-868ecfcd-4f00-4224-b881-a65537a7c155">Office dokumentu pieejamāku.</a></li></li></ul>.',
    QA_PAGE_LANGUAGE: 'Lapas valoda nav deklarēta! Lūdzu, <a href="https://www.w3.org/International/questions/qa-html-language-declarations">deklarējiet valodu HTML tagā.</a>',
    QA_PAGE_TITLE: 'Trūkst lapas virsraksta! Lūdzu, norādiet <a href="https://developer.mozilla.org/lv/docs/Web/HTML/Element/title">lapas virsrakstu.</a>',
    QA_BLOCKQUOTE_MESSAGE: 'Vai šis ir virsraksts? <strong {r}>%(sanitizedText)</strong> <hr> Kvadrātiņi jāizmanto tikai pēdiņām. Ja tas ir paredzēts kā virsraksts, nomainiet šo blokcitāti uz semantisku virsrakstu (piemēram, 2. vai 3. virsraksts).',
    QA_FAKE_HEADING: 'Vai šis ir virsraksts? <strong {r}>%(boldtext)</strong> <hr> Rindiņa ar treknu vai lielu tekstu var izskatīties kā virsraksts, bet cilvēks, kas izmanto ekrāna lasītāju, nevar noteikt, ka tas ir svarīgs, vai pāriet uz tā saturu. Trešais vai lielais teksts nekad nedrīkst aizstāt semantiskos virsrakstus (no 2. līdz 6. virsrakstam).',
    QA_SHOULD_BE_LIST: 'Vai mēģināt izveidot sarakstu? Atrasts iespējamais saraksta vienums: <strong {r}>%(firstPrefix)</strong> <hr> Pārliecinieties, ka izmantojat semantiskos sarakstus, to vietā izmantojot lodītes vai skaitļu formatēšanas pogas. Izmantojot semantisko sarakstu, palīgtehnoloģijas spēj nodot tādu informāciju kā kopējais elementu skaits un katra elementa relatīvā pozīcija sarakstā. Uzziniet vairāk par <a href="https://www.w3.org/WAI/tutorials/page-structure/content/#lists">semantiskajiem sarakstiem</a>.',
    QA_UPPERCASE_WARNING: 'Atrasti visi vāciņi. Daži ekrāna lasītāji var interpretēt tekstu ar lielajiem burtiem kā akronīmu un lasīt katru burtu atsevišķi. Turklāt dažiem cilvēkiem ir grūtāk lasīt tekstu ar lielajiem burtiem, un tas var radīt iespaidu, ka teksts ir RAKSTS.',
    QA_DUPLICATE_ID: 'Atrasts <strong>duplicate ID</strong>. Ir zināms, ka dubultā ID kļūdas rada problēmas palīgtehnoloģijām, kad tās mēģina mijiedarboties ar saturu. <hr> Lūdzu, noņemiet vai mainiet šādu ID: <strong {r}>%(id)</strong>',
    QA_TEXT_UNDERLINE_WARNING: 'Pasvītroto tekstu var sajaukt ar saitēm. Apsveriet iespēju izmantot citu stilu, piemēram, <code>&lt;strong&gt;</code><strong>strong importance</strong><code>&lt;/strong&gt;</code> vai <code>&lt;em&gt;</code><em>emphasis</em><code>&lt;/em&gt;</code>.',
    QA_SUBSCRIPT_WARNING: 'Apakšindiksu un augšindiksu formatēšanas opcijas jāizmanto tikai, lai mainītu teksta pozīciju tipogrāfisko konvenciju vai standartu vajadzībām. Tās nevajadzētu <strong>nevajadzētu</strong> izmantot tikai noformējuma vai izskata nolūkos. Veselu teikumu formatēšana rada lasāmības problēmas. Piemēroti lietošanas gadījumi būtu eksponentu, kārtas skaitļu, piemēram, 4<sup>tā</sup> vietā ceturtā, un ķīmisko formulu (piemēram, H<sub>2</sub>O) attēlošana.',
    TABLES_MISSING_HEADINGS: 'Trūkst tabulu virsrakstu! Pieejamām tabulām ir nepieciešama HTML iezīmēšana, kas norāda virsrakstu šūnas un datu šūnas, kas nosaka to savstarpējo saistību. Šī informācija nodrošina kontekstu cilvēkiem, kuri izmanto palīgtehnoloģijas. Tabulas jāizmanto tikai tabulas datiem. <hr> Uzziniet vairāk par <a href="https://www.w3.org/WAI/tutorials/tables/">pieejamām tabulām</a>.',
    TABLES_SEMANTIC_HEADING: 'Semantiskos virsrakstus, piemēram, Heading 2 vai Heading 3, drīkst izmantot tikai satura sadaļās; <strong>ne</strong> HTML tabulās. Tabulu virsrakstus norādiet, izmantojot elementu <code>&lt;th&gt;</code>. <hr> Uzziniet vairāk par <a href="https://www.w3.org/WAI/tutorials/tables/">pieejamām tabulām</a>.',
    TABLES_EMPTY_HEADING: 'Atrasta tukša tabulas galvene! Tabulu galvenēm <strong>nevajadzētu būt tukšām. Ir svarīgi norādīt rindu un/vai kolonnu galvenes, lai atspoguļotu to saistību. Šī informācija sniedz kontekstu cilvēkiem, kuri izmanto palīgtehnoloģijas. Paturiet prātā, ka tabulas jāizmanto tikai tabulārajiem datiem. <hr> Uzziniet vairāk par <a href="https://www.w3.org/WAI/tutorials/tables/">pieejamām tabulām</a>.',
    CONTRAST_ERROR: 'Šis teksts nav pietiekami kontrastējošs ar fonu. Kontrasta attiecībai jābūt vismaz 4,5:1 parastam tekstam un 3:1 lielam tekstam. <hr> Kontrasta attiecība ir <strong {r}>%(cratio)</strong> šādam tekstam: <strong {r}>%(sanitizedText)</strong>.',
    CONTRAST_WARNING: 'Šī teksta kontrasts nav zināms, un tas ir jāpārbauda manuāli. Pārliecinieties, ka tekstam un fonam ir spēcīgi kontrastējošas krāsas. Kontrasta attiecībai jābūt vismaz 4,5:1 parastam tekstam un 3:1 lielam tekstam. <hr> <strong>Lūdzu pārskatīt:</strong> %(sanitizedText)',
    CONTRAST_INPUT_ERROR: 'Teksts šajā ievades laukā nav pietiekami kontrastējošs ar fonu. Kontrasta attiecībai jābūt vismaz 4,5:1 parastam tekstam un 3:1 lielam tekstam. <hr> Kontrasta attiecība: <strong {r}>%(cratio)</strong>',
  },
};

export { lv as default };
