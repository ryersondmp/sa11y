
/*!
  * Sa11y, the accessibility quality assurance assistant.
  * @version 3.0.3
  * @author Adam Chaboryk, Toronto Metropolitan University
  * @license GPL-2.0-or-later
  * @copyright © 2020 - 2023 Toronto Metropolitan University (formerly Ryerson University).
  * @contact adam.chaboryk@torontomu.ca
  * GitHub: git+https://github.com/ryersondmp/sa11y.git | Website: https://sa11y.netlify.app
  * For all acknowledgements, please visit: https://sa11y.netlify.app/acknowledgements/
  * The above copyright notice shall be included in all copies or substantial portions of the Software.
**/
var it = {
  // Italian
  strings: {
    LANG_CODE: 'it',
    MAIN_TOGGLE_LABEL: "Controllare l'accessibilità",
    CONTAINER_LABEL: "Controllo dell'accessibilità",
    ERROR: 'Errore',
    ERRORS: 'Errori',
    WARNING: 'Avvertenze',
    WARNINGS: 'Avvertenze',
    GOOD: 'Buono',
    ON: 'Acceso',
    OFF: 'Spento',
    ALERT_TEXT: 'Allarme',
    ALERT_CLOSE: 'Chiudere',
    OUTLINE: 'Schema della pagina',
    PAGE_ISSUES: 'Problemi di pagina',
    SETTINGS: 'Impostazioni',
    CONTRAST: 'Contrasto',
    FORM_LABELS: 'Etichette del modulo',
    LINKS_ADVANCED: 'Collegamenti (avanzato)',
    DARK_MODE: 'Modalità scura',
    SHORTCUT_SCREEN_READER: 'Passa al problema. Scorciatoia da tastiera: Alt S',
    SHORTCUT_TOOLTIP: 'Passa al numero',
    NEW_TAB: 'Apre una nuova scheda',
    PANEL_HEADING: "Controllo dell'accessibilità",
    PANEL_STATUS_NONE: 'Non sono stati riscontrati errori.',
    PANEL_ICON_WARNINGS: 'avvisi riscontrati.',
    PANEL_ICON_TOTAL: 'totale dei problemi riscontrati.',
    NOT_VISIBLE_ALERT: "L'elemento che si sta cercando di visualizzare non è visibile; potrebbe essere nascosto o all'interno di un componente fisarmonica o scheda. Ecco un'anteprima:",
    ERROR_MISSING_ROOT_TARGET: "La pagina completa è stata controllata per l'accessibilità perché l'area di destinazione <code>%(root)</code> non esiste.",
    HEADING_NOT_VISIBLE_ALERT: "L'intestazione non è visibile; può essere nascosta o all'interno di un componente fisarmonica o scheda.",
    SKIP_TO_PAGE_ISSUES: 'Vai alla pagina Problemi',
    CONSOLE_ERROR_MESSAGE: "Siamo spiacenti, ma c'è un problema con il verificatore di accessibilità di questa pagina. Puoi per favore <a href=\"%(link)\">riportarlo attraverso questo modulo</a> o su <a href=\"%(link)\">GitHub</a>?",
    PANEL_DISMISS_BUTTON: 'Mostra %(dismissCount) gli avvisi respinti',
    DISMISS: 'Congedo',
    DISMISSED: 'Avvertenze respinte',
    DISMISS_REMINDER: 'Si noti che gli avvisi vengono eliminati solo <strong>temporaneamente</strong>. La cancellazione della cronologia e dei cookie del browser ripristinerà tutti gli avvisi precedentemente eliminati in tutte le pagine.',
    COLOUR_FILTER: 'Filtro colore',
    PROTANOPIA: 'Protanopia',
    DEUTERANOPIA: 'Deuteranopia',
    TRITANOPIA: 'Tritanopia',
    MONOCHROMACY: 'Monocromia',
    COLOUR_FILTER_MESSAGE: 'Verificare la presenza di elementi difficili da percepire o da distinguere rispetto ad altri colori.',
    RED_EYE: 'Rosso cieco.',
    GREEN_EYE: 'Cieco verde.',
    BLUE_EYE: 'Cieco blu.',
    MONO_EYE: 'Cieco rosso, blu e verde.',
    COLOUR_FILTER_HIGH_CONTRAST_MESSAGE: 'I filtri colore non funzionano in modalità alto contrasto.',
    SUSPICIOUS_ALT_STOPWORDS: [
      'immagine',
      'grafico',
      'immagine',
      'foto',
      'photo',
      'image',
      'graphic',
    ],
    PLACEHOLDER_ALT_STOPWORDS: [
      'alt',
      'immagine',
      'foto',
      'photo',
      'image',
      'graphic',
      'decorativo',
      'segnaposto',
      'immagine segnaposto',
      'distanziatore',
    ],
    PARTIAL_ALT_STOPWORDS: [
      'clicca',
      'clicca qui',
      'clicca qui per saperne di più',
      'clicca qui per saperne di più',
      'clicca qui per saperne di più.',
      'cliccando qui',
      'cliccando qui.',
      'controllare',
      'qui dettagliato',
      'qui.',
      'scaricare',
      'scarica qui',
      'scaricare qui.',
      'scoprirlo',
      'Per saperne di più',
      'per saperne di più.',
      'per saperne di più >',
      'forma',
      'qui',
      'qui.',
      'info',
      'informazioni',
      'link',
      'imparare',
      'Per saperne di più',
      'Per saperne di più.',
      'per saperne di più >',
      'imparare a',
      'di più',
      'di più >',
      'pagina',
      'carta',
      'Per saperne di più',
      'Per saperne di più >',
      'leggere',
      'leggere questo',
      'questo',
      'questa pagina',
      'questa pagina.',
      'questo sito web',
      'questo sito web.',
      'vista',
      'vedere il nostro',
      'sito web',
    ],
    WARNING_ALT_STOPWORDS: [
      'clicca qui',
    ],
    NEW_WINDOW_PHRASES: [
      'esterno',
      'nuova scheda',
      'nuova finestra',
      'pop-up',
      'pop up',
    ],
    FILE_TYPE_PHRASES: ['documento', 'foglio di calcolo', 'foglio di calcolo', 'file compresso', 'file archiviato', 'foglio di lavoro', 'powerpoint', 'presentazione', 'installare', 'video', 'audio', 'pdf'],
    LANG_READABILITY: 'Leggibilità',
    LANG_AVG_SENTENCE: 'Media di parole per frase:',
    LANG_COMPLEX_WORDS: 'Parole complesse:',
    LANG_TOTAL_WORDS: 'Parole:',
    LANG_VERY_DIFFICULT: 'Molto difficile',
    LANG_DIFFICULT: 'Difficile',
    LANG_FAIRLY_DIFFICULT: 'Abbastanza difficile',
    LANG_GOOD: 'Buono',
    READABILITY_NO_P_OR_LI_MESSAGE: 'Impossibile calcolare il punteggio di leggibilità. Nessun paragrafo <code>&lt;p&gt;</code> o contenuto di elenco <code>&lt;li&gt;</code> trovato.',
    READABILITY_NOT_ENOUGH_CONTENT_MESSAGE: 'Non ci sono abbastanza contenuti per calcolare il punteggio di leggibilità.',
    HEADING_NON_CONSECUTIVE_LEVEL: 'È stato utilizzato un livello di intestazione non consecutivo. I titoli non devono mai saltare livelli o passare da <strong>Heading %(prevLevel)</strong> a <strong {r}>Heading %(level)</strong>.',
    HEADING_EMPTY: 'Titolo vuoto trovato! Per risolvere il problema, eliminare questa riga o cambiare il suo formato da <strong {r}>Intonazione %(level)</strong> a <strong>Normale</strong> o <strong>Paragrafo</strong>.',
    HEADING_LONG: "L'intestazione è lunga! I titoli devono essere utilizzati per organizzare il contenuto e trasmettere la struttura. Devono essere brevi, informativi e unici. I titoli devono essere inferiori a 160 caratteri (non più di una frase). <hr> Conteggio dei caratteri: <strong {r}>%(headingLength)</strong>",
    HEADING_FIRST: "La prima intestazione di una pagina dovrebbe essere di solito un'intestazione 1 o un'intestazione 2. L'intestazione 1 dovrebbe essere l'inizio della sezione principale del contenuto ed è l'intestazione principale che descrive lo scopo generale della pagina. Per saperne di più <a href=\"https://www.w3.org/WAI/tutorials/page-structure/headings/\">Struttura delle intestazioni.</a>",
    HEADING_MISSING_ONE: "Manca l'intestazione 1. L'intestazione 1 dovrebbe essere l'inizio dell'area di contenuto principale ed è l'intestazione principale che descrive lo scopo generale della pagina. Per saperne di più <a href=\"https://www.w3.org/WAI/tutorials/page-structure/headings/\">Struttura delle intestazioni.</a>",
    HEADING_EMPTY_WITH_IMAGE: "L'intestazione non ha testo, ma contiene un'immagine. Se non si tratta di un titolo, cambiarne il formato da <strong {r}>Testamento %(level)</strong> a <strong>Normale</strong> o <strong>Paragrafo</strong>. Altrimenti, aggiungere un testo alt all'immagine, se non è decorativo.",
    PANEL_HEADING_MISSING_ONE: "Manca l'intestazione 1!",
    LINK_EMPTY: 'Rimuovere i link vuoti senza testo.',
    LINK_EMPTY_LINK_NO_LABEL: "Il link non ha un testo distinguibile che sia visibile agli screen reader e ad altre tecnologie assistive. Per risolvere il problema: <ul><li>Aggiungi un testo conciso che descriva dove porta il link.</li><li>Se si tratta di un <a href=\"https://a11y-101.com/development/icons-and-links\">collegamento a un'icona o a un SVG,</a> è probabile che manchi un'etichetta descrittiva.</li><li>Se pensi che questo link sia un errore dovuto a un bug di copia/incolla, prendi in considerazione l'idea di cancellarlo.</li></ul>",
    LINK_LABEL: '<strong>Etichetta del link:</strong> %(sanitizedText)',
    LINK_STOPWORD: 'Il testo del link potrebbe non essere abbastanza descrittivo fuori dal contesto: <strong {r}>%(error)</strong><hr><strong>Tip!</strong> Il testo del link deve essere sempre chiaro, unico e significativo. Evitate parole comuni come &quot;clicca qui&quot; o &quot;per saperne di più&quot;',
    LINK_BEST_PRACTICES: "Si consideri la possibilità di sostituire il testo del link: <strong {r}>%(error)</strong><hr><ul><li>&quot;Clicca qui&quot; pone l'attenzione sulla meccanica del mouse, quando molte persone non usano il mouse o potrebbero visualizzare il sito web su un dispositivo mobile. Considerate l'uso di un verbo diverso che si riferisca al compito.</li><li>Evitate di usare i simboli HTML come richiami alle azioni, a meno che non siano nascosti alle tecnologie assistive.</li></ul>",
    LINK_URL: "URL più lunghi e meno comprensibili utilizzati come testo di collegamento potrebbero essere difficili da comprendere quando si accede con tecnologie assistive. Nella maggior parte dei casi, è meglio utilizzare un testo leggibile dall'uomo al posto dell'URL. Gli URL brevi (come la homepage di un sito) vanno bene.<hr><strong>Tip!</strong> Il testo del link deve sempre essere chiaro, unico e significativo, in modo da poter essere compreso anche fuori dal contesto.",
    LINK_DOI: 'Per le pagine web o le risorse solo online, la <a href="https://apastyle.apa.org/style-grammar-guidelines/paper-format/accessibility/urls#:~:text=descriptive%20links">guida di stile dell\'APA</a> raccomanda di utilizzare link descrittivi avvolgendo l\'URL o il DOI dell\'opera intorno al suo titolo. URL più lunghi e meno comprensibili utilizzati come testo di collegamento potrebbero essere difficili da comprendere quando si accede con tecnologie assistive.',
    NEW_TAB_WARNING: "Il link si apre in una nuova scheda o finestra senza preavviso. Ciò può disorientare, soprattutto le persone che hanno difficoltà a percepire i contenuti visivi. In secondo luogo, non è sempre una buona pratica controllare l'esperienza di una persona o prendere decisioni al posto suo. Indicate che il link si apre in una nuova finestra all'interno del testo del link<hr><strong>Tip!</strong> Imparate le migliori pratiche: <a href=\"https://www.nngroup.com/articles/new-browser-windows-and-tabs/\">aprire i link in nuove finestre e schede del browser.</a>",
    FILE_TYPE_WARNING: 'Il link punta a un PDF o a un file scaricabile (ad es. MP3, Zip, Word Doc) senza alcun avviso. Indicate il tipo di file nel testo del link. Se si tratta di un file di grandi dimensioni, considerate la possibilità di includere la dimensione del file.<hr><strong>Esempio:</strong> Relazione esecutiva (PDF, 3MB)',
    LINK_IDENTICAL_NAME: 'Il link ha lo stesso testo di un altro link, anche se punta a una pagina diversa. Più link con lo stesso testo possono creare confusione per le persone che utilizzano gli screen reader.<hr>Considerate di rendere il seguente link più descrittivo per aiutarlo a distinguersi dagli altri link: <strong {r}>%(sanitizedText)</strong>',
    MISSING_ALT_LINK_BUT_HAS_TEXT_MESSAGE: "L'immagine viene utilizzata come link con testo circostante, anche se l'attributo alt dovrebbe essere contrassegnato come decorativo o nullo.",
    MISSING_ALT_LINK_MESSAGE: "L'immagine viene utilizzata come link ma manca il testo alt! Assicurarsi che il testo alt descriva dove porta il link.",
    MISSING_ALT_MESSAGE: "Manca il testo alt! Se l'immagine trasmette una storia, uno stato d'animo o un'informazione importante, assicuratevi di descrivere l'immagine.",
    LINK_IMAGE_BAD_ALT_MESSAGE: "Estensione del file nel testo alt trovata. Assicurarsi che il testo alt descriva la destinazione del link e non una descrizione letterale dell'immagine. Rimuovere: <strong {r}>%(error)</strong>.<hr><strong>Testo alt:</strong> %(altText)",
    LINK_IMAGE_PLACEHOLDER_ALT_MESSAGE: "Trovato testo alt non descrittivo o segnaposto in un'immagine collegata. Assicurarsi che il testo alt descriva la destinazione del link e non una descrizione letterale dell'immagine. Sostituire il seguente testo alt: <strong {r}>%(altText)</strong>",
    LINK_IMAGE_SUS_ALT_MESSAGE: "Le tecnologie assistive indicano già che si tratta di un'immagine, quindi &quot;<strong {r}>%(error)</strong>&quot; potrebbe essere ridondante. Assicuratevi che il testo alt descriva la destinazione del link e non una descrizione letterale dell'immagine. <hr> <strong>Testo alt:</strong> %(altText)",
    LINK_ALT_HAS_BAD_WORD_MESSAGE: "Estensione del file nel testo alt trovato. Se l'immagine trasmette una storia, uno stato d'animo o un'informazione importante, assicuratevi di descrivere l'immagine. Rimuovere: <strong {r}>%(error)</strong>.<hr><strong>Testo alt:</strong> %(altText)",
    ALT_PLACEHOLDER_MESSAGE: 'Trovato testo alt non descrittivo o segnaposto. Sostituire il seguente testo alt con qualcosa di più significativo: <strong {r}>%(altText)</strong>',
    ALT_HAS_SUS_WORD: "Le tecnologie assistive indicano già che si tratta di un'immagine, quindi &quot;<strong {r}>%(error)</strong>&quot; potrebbe essere ridondante. <hr> <strong>Testo alternativo:</strong> %(altText)",
    LINK_IMAGE_ARIA_HIDDEN: "Il collegamento intorno all'immagine ha <code>aria-hidden=&quot;true&quot;</code> ma è ancora focalizzabile da tastiera. Se si intende nascondere un collegamento ridondante o duplicato, aggiungere anche <code>tabindex=&quot;-1&quot;</code>.",
    LINK_IMAGE_NO_ALT_TEXT: "L'immagine all'interno del link è contrassegnata come decorativa e non c'è testo di collegamento. Aggiungere all'immagine un testo alt che descriva la destinazione del link.",
    LINK_IMAGE_HAS_TEXT: "L'immagine è contrassegnata come decorativa, anche se il link utilizza il testo circostante come etichetta descrittiva.",
    LINK_IMAGE_LONG_ALT: "La descrizione del testo alt su un'immagine collegata è <strong>troppo lunga</strong>. Il testo alt sulle immagini collegate dovrebbe descrivere dove porta il link, non una descrizione letterale dell'immagine. <strong>Considerate di usare il titolo della pagina a cui rimanda come testo alt.</strong> <hr> <strong>Testo alt (<span {r}>%(altLength)</span> caratteri):</strong> %(altText)",
    LINK_IMAGE_ALT_WARNING: "Il link all'immagine contiene un testo alt. <strong>Il testo alt descrive dove porta il link?</strong> Considerate la possibilità di utilizzare come testo alt il titolo della pagina a cui rimanda. <hr> <strong>Testo alt:</strong> %(altText)",
    LINK_IMAGE_ALT_AND_TEXT_WARNING: "Il link all'immagine contiene <strong>sia il testo alt che il testo del link circostante.</strong> Se l'immagine è decorativa e viene utilizzata come link funzionale a un'altra pagina, si consideri di contrassegnare l'immagine come decorativa o nulla - il testo del link circostante dovrebbe essere sufficiente. <hr> <strong>Testo alt:</strong> %(altText)",
    IMAGE_FIGURE_DECORATIVE: "L'immagine è contrassegnata come <strong>decorativa</strong> e sarà ignorata dalle tecnologie assistive. <hr> Sebbene sia stata fornita una <strong>caption</strong>, nella maggior parte dei casi l'immagine dovrebbe avere anche un testo alt. <ul><li>Il testo alt dovrebbe fornire una descrizione concisa di ciò che è contenuto nell'immagine.</li><li>La didascalia dovrebbe solitamente fornire un contesto per mettere in relazione l'immagine con il contenuto circostante, o dare attenzione a un particolare pezzo di informazione.</li></ul>Per saperne di più: <a href=\"https://thoughtbot.com/blog/alt-vs-figcaption#the-figcaption-element\">alt contro figcaption.</a>",
    IMAGE_FIGURE_DUPLICATE_ALT: "Non utilizzare le stesse parole sia per il testo alt che per la didascalia. Gli screen reader annunceranno le informazioni due volte.<ul><li>Il testo alt dovrebbe fornire una descrizione concisa di ciò che è presente nell'immagine.</li><li>La didascalia dovrebbe solitamente fornire un contesto per ricollegare l'immagine al contenuto circostante, o dare attenzione a un particolare pezzo di informazione.</li></ul> Per saperne di più: <a href=\"https://thoughtbot.com/blog/alt-vs-figcaption#the-figcaption-element\">alt contro figcaption.</a> <hr> <strong>Testo alt:</strong> %(altText)",
    IMAGE_DECORATIVE: "L'immagine è contrassegnata come <strong>decorativa</strong> e sarà ignorata dalle tecnologie assistive. Se l'immagine trasmette una storia, uno stato d'animo o un'informazione importante, assicuratevi di aggiungere il testo alt.",
    IMAGE_ALT_TOO_LONG: "La descrizione del testo Alt è <strong>troppo lunga</strong>. Il testo Alt dovrebbe essere conciso, ma significativo come un <em>tweet</em> (circa 100 caratteri). Se si tratta di un'immagine complessa o di un grafico, considerate la possibilità di inserire la lunga descrizione dell'immagine nel testo sottostante o in un componente a fisarmonica. <hr> <strong>Testo alt (<span {r}>%(altLength)</span> caratteri):</strong> %(altText)",
    IMAGE_PASS: '<strong>Testo alt:</strong> %(altText)',
    LABELS_MISSING_IMAGE_INPUT_MESSAGE: "Il pulsante dell'immagine manca del testo alt. Aggiungere il testo alt per fornire un nome accessibile. Ad esempio: <em>Cerca</em> o <em>Invio</em>.",
    LABELS_INPUT_RESET_MESSAGE: 'I pulsanti di reset non dovrebbero essere utilizzati se non specificamente necessari, perché è facile che si attivino per errore. <hr> <strong>Tip!</strong> Scoprite perché <a href="https://www.nngroup.com/articles/reset-and-cancel-buttons/">i pulsanti Reset e Cancel pongono problemi di usabilità.</a>',
    LABELS_ARIA_LABEL_INPUT_MESSAGE: "L'input ha un nome accessibile, anche se bisogna assicurarsi che ci sia anche un'etichetta visibile. <hr> Il nome accessibile per questo input è: <strong>%(sanitizedText)</strong>.",
    LABELS_NO_FOR_ATTRIBUTE_MESSAGE: "Non c'è un'etichetta associata a questo input. Aggiungere un attributo <code>for</code> all'etichetta che corrisponda all'<code>id</code> di questo input. <hr> L'ID di questo input è: <strong>id=&#34;%(id)&#34;</strong>.",
    LABELS_MISSING_LABEL_MESSAGE: "Non c'è un'etichetta associata a questo input. Aggiungere un <code>id</code> a questo input e aggiungere un attributo <code>for</code> corrispondente all'etichetta.",
    EMBED_VIDEO: 'Assicuratevi che <strong>tutti i video abbiano le didascalie chiuse.</strong> Fornire didascalie per tutti i contenuti audio e video è un requisito obbligatorio di livello A. Le didascalie aiutano le persone non udenti o con problemi di udito.',
    EMBED_AUDIO: 'Assicuratevi di fornire una <strong>trascrizione per tutti i podcast.</strong> Fornire trascrizioni per i contenuti audio è un requisito obbligatorio di Livello A. Le trascrizioni sono di supporto alle persone sorde o con problemi di udito, ma possono essere utili a tutti. Considerate la possibilità di inserire la trascrizione in basso o in un pannello a fisarmonica.',
    EMBED_DATA_VIZ: 'I widget di visualizzazione dei dati come questo sono spesso problematici per le persone che utilizzano una tastiera o uno screen reader per navigare e possono presentare notevoli difficoltà per le persone ipovedenti o daltoniche. Si consiglia di fornire le stesse informazioni in un formato alternativo (testo o tabella) sotto il widget. <hr> Per saperne di più su <a href="https://www.w3.org/WAI/tutorials/images/complex">immagini complesse.</a>',
    EMBED_MISSING_TITLE: "Il contenuto incorporato richiede un nome accessibile che ne descriva il contenuto. Si prega di fornire un attributo unico <code>title</code> o <code>aria-label</code> sull'elemento <code>iframe</code>. Per saperne di più su <a href=\"https://dequeuniversity.com/tips/provide-iframe-titles\">iFrames.</a>",
    EMBED_GENERAL_WARNING: 'Impossibile controllare il contenuto incorporato. Assicuratevi che le immagini abbiano un testo alt, che i video abbiano didascalie, che il testo abbia un contrasto sufficiente e che i componenti interattivi siano <a href="https://webaim.org/techniques/keyboard/">accessibili alla tastiera.</a>',
    QA_BAD_LINK: 'Trovato un link errato. Il link sembra puntare a un ambiente di sviluppo. <hr> Questo link punta a: <br> <strong {r}>%(el)</strong>',
    QA_BAD_ITALICS: 'I tag grassetto e corsivo hanno un significato semantico e non devono essere usati per evidenziare interi paragrafi. Il testo in grassetto deve essere usato per dare un forte <strong>enfasi</strong> su una parola o una frase. Il corsivo deve essere usato per evidenziare nomi propri (ad esempio, titoli di libri e articoli), parole straniere e citazioni. Le citazioni lunghe devono essere formattate come blockquote.',
    QA_PDF: "Impossibile verificare l'accessibilità dei PDF. I PDF sono considerati contenuti web e devono essere resi accessibili. I PDF spesso presentano problemi per le persone che utilizzano gli screen reader (tag strutturali mancanti o etichette dei campi del modulo mancanti) e per le persone ipovedenti (il testo non scorre quando viene ingrandito). <ul><li>Se si tratta di un modulo, considerare l'utilizzo di un modulo HTML accessibile come alternativa.</li><li>Se si tratta di un documento, considerare la conversione in una pagina web.</li></ul>Altrimenti, controllare <a href=\"https://helpx.adobe.com/acrobat/using/create-verify-pdf-accessibility.html\">PDF per l'accessibilità in Acrobat DC.</a>",
    QA_DOCUMENT: "Impossibile verificare l'accessibilità del documento. I documenti collegati sono considerati contenuti web e devono essere resi accessibili. Esaminare manualmente il documento. <ul><li>Rendi più accessibile il tuo <a href=\"https://support.google.com/docs/answer/6199477?hl=en\">documento o presentazione di Google Workspace.</a></li><li>Rendi più accessibili i tuoi <a href=\"https://support.microsoft.com/en-us/office/create-accessible-office-documents-868ecfcd-4f00-4224-b881-a65537a7c155\">documenti di Office.</a></li></ul>",
    QA_PAGE_LANGUAGE: 'Lingua della pagina non dichiarata! Si prega di <a href="https://www.w3.org/International/questions/qa-html-language-declarations">dichiarare la lingua nel tag HTML.</a>',
    QA_PAGE_TITLE: 'Titolo della pagina mancante! Si prega di fornire un <a href="https://developer.mozilla.org/en-US/docs/Web/HTML/Element/title">titolo della pagina.</a>',
    QA_BLOCKQUOTE_MESSAGE: "È un titolo? <strong {r}>%(sanitizedText)</strong> <hr> Le virgolette dovrebbero essere usate solo per le citazioni. Se si tratta di un'intestazione, cambiare questo blockquote in un'intestazione semantica (per esempio, Intestazione 2 o Intestazione 3).",
    QA_FAKE_HEADING: 'È un titolo? <strong {r}>%(boldtext)</strong> <hr> Una riga di testo in grassetto o grande può sembrare un titolo, ma chi usa uno screen reader non può capire che è importante o saltare al suo contenuto. Il testo in grassetto o grande non dovrebbe mai sostituire le intestazioni semantiche (da Titolo 2 a Titolo 6).',
    QA_SHOULD_BE_LIST: "Stai cercando di creare un elenco? Possibile elemento di elenco trovato: <strong {r}>%(firstPrefix)</strong> <hr> Assicurarsi di utilizzare gli elenchi semantici utilizzando invece i pulsanti di formattazione dei punti o dei numeri. Quando si utilizza un elenco semantico, le tecnologie assistive sono in grado di trasmettere informazioni come il numero totale di elementi e la posizione relativa di ciascun elemento nell'elenco. Per saperne di più su <a href=\"https://www.w3.org/WAI/tutorials/page-structure/content/#lists\">elenchi semantici.</a>",
    QA_UPPERCASE_WARNING: "Trovato tutto maiuscolo. Alcuni screen reader possono interpretare il testo tutto maiuscolo come un acronimo e leggono ogni lettera singolarmente. Inoltre, per alcune persone il testo tutto maiuscolo è più difficile da leggere e può dare l'impressione di urlare.",
    QA_DUPLICATE_ID: 'Trovato <strong>ID duplicato</strong>. Gli errori di ID duplicato sono noti per causare problemi alle tecnologie assistive quando cercano di interagire con i contenuti. <hr> Si prega di rimuovere o modificare il seguente ID: <strong {r}>%(id)</strong>',
    QA_TEXT_UNDERLINE_WARNING: 'Il testo sottolineato può essere confuso con i link. Considerate di usare uno stile diverso, come <code>&lt;strong&gt;</code><strong>forte importanza</strong><code>&lt;/strong&gt;</code> o <code>&lt;em&gt;</code><em>emphasis</em><code>&lt;/em&gt;</code>.',
    QA_SUBSCRIPT_WARNING: "Le opzioni di formattazione pedice e apice devono essere utilizzate solo per modificare la posizione del testo per convenzioni o standard tipografici. Non devono essere utilizzate esclusivamente per scopi di presentazione o di aspetto. La formattazione di intere frasi pone problemi di leggibilità. I casi d'uso appropriati includono la visualizzazione di esponenti, numeri ordinali come 4<sup>th</sup> invece di fourth, e formule chimiche (ad esempio H<sub>2</sub>O).",
    TABLES_MISSING_HEADINGS: 'Intestazioni di tabella mancanti! Le tabelle accessibili necessitano di un markup HTML che indichi le celle di intestazione e le celle di dati e che definisca la loro relazione. Queste informazioni forniscono un contesto alle persone che utilizzano tecnologie assistive. Le tabelle devono essere utilizzate solo per i dati tabellari. <hr> Per saperne di più su <a href="https://www.w3.org/WAI/tutorials/tables/">tabelle accessibili.</a>',
    TABLES_SEMANTIC_HEADING: "Le intestazioni semantiche come Heading 2 o Heading 3 devono essere utilizzate solo per le sezioni di contenuto; <strong>non</strong> nelle tabelle HTML. Indicare le intestazioni delle tabelle utilizzando invece l'elemento <code>&lt;th&gt;</code>. <hr> Per saperne di più su <a href=\"https://www.w3.org/WAI/tutorials/tables/\">tabelle accessibili.</a>",
    TABLES_EMPTY_HEADING: "Trovato un'intestazione di tabella vuota! Le intestazioni delle tabelle non devono mai essere vuote. È importante designare le intestazioni di riga e/o di colonna per indicare la loro relazione. Queste informazioni forniscono un contesto alle persone che utilizzano tecnologie assistive. Tenete presente che le tabelle devono essere utilizzate solo per i dati tabellari. <hr> Per saperne di più su <a href=\"https://www.w3.org/WAI/tutorials/tables/\">tabelle accessibili.</a>",
    CONTRAST_ERROR: 'Il testo non ha un contrasto sufficiente con lo sfondo. Il rapporto di contrasto dovrebbe essere almeno 4,5:1 per il testo normale e 3:1 per il testo grande. <hr> Il rapporto di contrasto è <strong {r}>%(cratio)</strong> per il seguente testo: <strong {r}>%(sanitizedText)</strong>',
    CONTRAST_WARNING: 'Il contrasto di questo testo è sconosciuto e deve essere rivisto manualmente. Assicurarsi che il testo e lo sfondo abbiano colori fortemente contrastanti. Il rapporto di contrasto dovrebbe essere almeno 4,5:1 per il testo normale e 3:1 per il testo grande. <hr> <strong>Per favore, controllare:</strong> %(sanitizedText)',
    CONTRAST_INPUT_ERROR: "Il testo all'interno di questo input non ha un contrasto sufficiente con lo sfondo. Il rapporto di contrasto dovrebbe essere di almeno 4,5:1 per il testo normale e di 3:1 per il testo grande. <hr> Rapporto di contrasto: <strong {r}>%(cratio)</strong>",
  },
};

export { it as default };
