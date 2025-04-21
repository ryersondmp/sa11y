
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
  (global = typeof globalThis !== 'undefined' ? globalThis : global || self, global.Sa11yLangIt = factory());
})(this, (function () { 'use strict';

  /*! WARNING: This is a machine-generated translation and may contain errors or inaccuracies. */
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
      OUTLINE: 'Struttura',
      READABILITY_DESC: 'Mostra il punteggio di leggibilità nella scheda <strong>Struttura</strong> per aiutare a valutare la difficoltà di lettura.',
      TITLE: 'Titolo',
      ALT: 'ALT',
      IMAGES: 'Immagini',
      EDIT: 'Modifica',
      NO_IMAGES: 'Nessuna immagine trovata.',
      DECORATIVE: 'Decorativo',
      MISSING: 'Mancante',
      PAGE_ISSUES: 'Problemi di pagina',
      SETTINGS: 'Impostazioni',
      DEVELOPER_CHECKS: 'Controlli sviluppatore',
      DEVELOPER_DESC: 'Controlla i problemi che potrebbero richiedere conoscenze di codifica per essere risolti, come attributi HTML, moduli e altro.',
      DARK_MODE: 'Modalità scura',
      SHORTCUT_SR: 'Passa al problema. Scorciatoia da tastiera: Alt S',
      SKIP_TO_ISSUE: 'Passa al numero',
      NEW_TAB: 'Apre una nuova scheda',
      LINKED: 'Collegato',
      PANEL_HEADING: "Controllo dell'accessibilità",
      NO_ERRORS_FOUND: 'Non sono stati riscontrati errori.',
      WARNINGS_FOUND: 'avvisi riscontrati.',
      TOTAL_FOUND: 'totale dei problemi riscontrati.',
      NOT_VISIBLE: "L'elemento che si sta cercando di visualizzare non è visibile; potrebbe essere nascosto o all'interno di un componente fisarmonica o scheda. Ecco un'anteprima:",
      MISSING_ROOT: "La pagina completa è stata controllata per l'accessibilità perché l'area di destinazione <code>%(root)</code> non esiste.",
      MISSING_READABILITY_ROOT: 'Il punteggio di leggibilità si basa sull’area di contenuto <code>%(fallback)</code>, perché l’area di destinazione <code>%(root)</code> non esiste.',
      HEADING_NOT_VISIBLE: "L'intestazione non è visibile; può essere nascosta o all'interno di un componente fisarmonica o scheda.",
      SKIP_TO_PAGE_ISSUES: 'Vai alla pagina Problemi',
      CONSOLE_ERROR: "Siamo spiacenti, ma c'è un problema con il verificatore di accessibilità di questa pagina. Puoi per favore <a href=\"%(link)\">riportarlo attraverso questo modulo</a> o su <a href=\"%(link)\">GitHub</a>?",
      APPEARANCE: 'Aspetto',
      MOVE_PANEL: 'Sposta pannello',

      // Dismiss
      PANEL_DISMISS_BUTTON: 'Mostra %(dismissCount) scartati',
      DISMISS: 'Scarta',
      DISMISS_ALL: 'Scarta tutto',
      DISMISSED: 'Scartato',
      DISMISS_REMINDER: 'Si prega di notare che gli avvisi sono solo <strong>temporaneamente</strong> scartati. La cancellazione della cronologia del browser e dei cookie ripristinerà tutti gli avvisi precedentemente scartati su tutte le pagine.',

      // Export
      DATE: 'Data',
      PAGE_TITLE: 'Titolo della pagina',
      RESULTS: 'Risultati',
      EXPORT_RESULTS: 'Esporta risultati',
      GENERATED: 'Risultati generati con %(tool).',
      PREVIEW: 'Anteprima',
      ELEMENT: 'Elemento',
      PATH: 'Percorso',

      // Colour filters
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
      COLOUR_FILTER_HIGH_CONTRAST: 'I filtri colore non funzionano in modalità alto contrasto.',

      // Alternative text stop words
      SUS_ALT_STOPWORDS: [
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
        'cliccando qui',
        'controllare',
        'qui dettagliato',
        'qui',
        'scaricare',
        'scarica qui',
        'scaricare qui',
        'scoprirlo',
        'per saperne di più',
        'forma',
        'info',
        'informazioni',
        'link',
        'imparare',
        'imparare a',
        'di più',
        'pagina',
        'carta',
        'leggere',
        'leggere questo',
        'questo',
        'questa pagina',
        'questo sito web',
        'vista',
        'vedere il nostro',
        'sito web',
      ],
      CLICK: ['click', 'clic'],
      NEW_WINDOW_PHRASES: [
        'esterno',
        'nuova scheda',
        'nuova finestra',
        'pop-up',
        'pop up',
      ],
      FILE_TYPE_PHRASES: ['documento', 'foglio di calcolo', 'foglio di calcolo', 'file compresso', 'file archiviato', 'foglio di lavoro', 'powerpoint', 'presentazione', 'installare', 'video', 'audio', 'pdf'],

      // Readability
      READABILITY: 'Leggibilità',
      AVG_SENTENCE: 'Media di parole per frase:',
      COMPLEX_WORDS: 'Parole complesse:',
      TOTAL_WORDS: 'Parole:',
      VERY_DIFFICULT: 'Molto difficile',
      DIFFICULT: 'Difficile',
      FAIRLY_DIFFICULT: 'Abbastanza difficile',
      READABILITY_NO_CONTENT: 'Impossibile calcolare il punteggio di leggibilità. Nessun paragrafo <code>&lt;p&gt;</code> o contenuto di elenco <code>&lt;li&gt;</code> trovato.',
      READABILITY_NOT_ENOUGH: 'Non ci sono abbastanza contenuti per calcolare il punteggio di leggibilità.',

      // Headings
      HEADING_SKIPPED_LEVEL: 'I titoli non dovrebbero saltare livelli o passare da <strong>Titolo %(PREV_LEVEL)</strong> a <strong {C}>Titolo %(LEVEL)</strong>, poiché ciò interrompe l\'ordine e la gerarchia del contenuto, rendendolo più difficile da seguire. <hr> Se <strong {C}>%(HEADING)</strong> ricade sotto la sezione <strong>%(PREV_HEADING)</strong>, considera di formattarlo come <strong>Titolo %(LEVEL)</strong>.',
      HEADING_EMPTY: 'Titolo vuoto trovato! Per risolvere il problema, eliminare questa riga o cambiare il suo formato da <strong {C}>Intonazione %(level)</strong> a <strong>Normale</strong> o <strong>Paragrafo</strong>.',
      HEADING_LONG: "L'intestazione è lunga! I titoli devono essere utilizzati per organizzare il contenuto e trasmettere la struttura. Devono essere brevi, informativi e unici. I titoli devono essere inferiori a %(MAX_LENGTH) caratteri (non più di una frase). <hr> <strong {B}>%(HEADING_LENGTH) Caratteri</strong>",
      HEADING_FIRST: "La prima intestazione di una pagina dovrebbe essere di solito un'intestazione 1 o un'intestazione 2. L'intestazione 1 dovrebbe essere l'inizio della sezione principale del contenuto ed è l'intestazione principale che descrive lo scopo generale della pagina. Per saperne di più <a href=\"https://www.w3.org/WAI/tutorials/page-structure/headings/\">Struttura delle intestazioni.</a>",
      HEADING_MISSING_ONE: "Manca l'intestazione 1. L'intestazione 1 dovrebbe essere l'inizio dell'area di contenuto principale ed è l'intestazione principale che descrive lo scopo generale della pagina. Per saperne di più <a href=\"https://www.w3.org/WAI/tutorials/page-structure/headings/\">Struttura delle intestazioni.</a>",
      HEADING_EMPTY_WITH_IMAGE: "L'intestazione non ha testo, ma contiene un'immagine. Se non si tratta di un titolo, cambiarne il formato da <strong {C}>Testamento %(level)</strong> a <strong>Normale</strong> o <strong>Paragrafo</strong>. Altrimenti, aggiungere un testo alt all'immagine, se non è decorativo.",
      PANEL_HEADING_MISSING_ONE: "Manca l'intestazione 1!",
      PANEL_NO_HEADINGS: 'Nessun titolo trovato.',

      // Links
      LINK_EMPTY: 'Rimuovere i link vuoti senza testo.',
      LINK_EMPTY_LABELLEDBY: 'Il link ha un valore per <code>aria-labelledby</code> che è vuoto o non corrisponde al valore dell\'attributo <code>id</code> di un altro elemento nella pagina.',
      LINK_EMPTY_NO_LABEL: "Il link non ha un testo distinguibile che sia visibile agli screen reader e ad altre tecnologie assistive. Per risolvere il problema: <ul><li>Aggiungi un testo conciso che descriva dove porta il link.</li><li>Se si tratta di un <a href=\"https://a11y-101.com/development/icons-and-links\">collegamento a un'icona o a un SVG,</a> è probabile che manchi un'etichetta descrittiva.</li><li>Se pensi che questo link sia un errore dovuto a un bug di copia/incolla, prendi in considerazione l'idea di cancellarlo.</li></ul>",
      LINK_STOPWORD: 'Il testo del link potrebbe non essere abbastanza descrittivo fuori contesto: <strong {C}>%(ERROR)</strong>',
      LINK_STOPWORD_ARIA: 'Anche se è stato fornito un nome accessibile, considera di rivedere il testo visibile del link. Frasi come &quot;<strong {C}>%(ERROR)</strong>&quot; non sono significative.',
      LINK_TIP: '<hr> <strong>Consiglio!</strong> Usa un testo del link chiaro e unico che descriva la destinazione del link, tipicamente il titolo della pagina o del documento.',
      LINK_CLICK_HERE: 'L’espressione "clicca" o "clicca qui" pone l’accento sull’uso del mouse, ma molte persone non utilizzano un mouse o potrebbero visualizzare questo sito su un dispositivo mobile. Considera di usare un verbo diverso relativo all’attività.',
      DUPLICATE_TITLE: 'L’attributo <code>title</code> su link e immagini è pensato per fornire informazioni aggiuntive e dovrebbe essere <strong>diverso</strong> dal testo o dal testo alternativo. Il testo del titolo appare quando si passa il mouse sopra un elemento, ma non è accessibile con la tastiera o il touch. Considera di <a href="https://www.a11yproject.com/posts/title-attributes/">evitare completamente l’attributo title.</a>',
      LINK_SYMBOLS: 'Evita di utilizzare simboli come inviti all’azione nel testo dei link, a meno che non siano nascosti alle tecnologie assistive. Gli screen reader potrebbero leggere i simboli ad alta voce, causando confusione. Considera di rimuoverli: <strong {C}>%(ERROR)</strong>',
      LINK_URL: "URL più lunghi e meno comprensibili utilizzati come testo di collegamento potrebbero essere difficili da comprendere quando si accede con tecnologie assistive. Nella maggior parte dei casi, è meglio utilizzare un testo leggibile dall'uomo al posto dell'URL. Gli URL brevi (come la homepage di un sito) vanno bene.",
      LINK_DOI: 'Per le pagine web o le risorse solo online, la <a href="https://apastyle.apa.org/style-grammar-guidelines/paper-format/accessibility/urls#:~:text=descriptive%20links">guida di stile dell\'APA</a> raccomanda di utilizzare link descrittivi avvolgendo l\'URL o il DOI dell\'opera intorno al suo titolo. URL più lunghi e meno comprensibili utilizzati come testo di collegamento potrebbero essere difficili da comprendere quando si accede con tecnologie assistive.',
      LINK_NEW_TAB: "Il link si apre in una nuova scheda o finestra senza preavviso. Ciò può disorientare, soprattutto le persone che hanno difficoltà a percepire i contenuti visivi. In secondo luogo, non è sempre una buona pratica controllare l'esperienza di una persona o prendere decisioni al posto suo. Indicate che il link si apre in una nuova finestra all'interno del testo del link. <hr> <strong>Tip!</strong> Imparate le migliori pratiche: <a href=\"https://www.nngroup.com/articles/new-browser-windows-and-tabs/\">aprire i link in nuove finestre e schede del browser.</a>",
      LINK_FILE_EXT: 'Il link punta a un PDF o a un file scaricabile (ad es. MP3, Zip, Word Doc) senza alcun avviso. Indicate il tipo di file nel testo del link. Se si tratta di un file di grandi dimensioni, considerate la possibilità di includere la dimensione del file. <hr> <strong>Esempio:</strong> Relazione esecutiva (PDF, 3MB)',
      LINK_IDENTICAL_NAME: 'Il link ha lo stesso testo di un altro link, anche se punta a una pagina diversa. Più link con lo stesso testo possono creare confusione per le persone che utilizzano gli screen reader. <strong>Considerate di rendere il seguente link più descrittivo per aiutarlo a distinguersi dagli altri link.</strong> <hr> <strong {B}>Nome accessibile</strong> <strong {C}>%(TEXT)</strong>',

      // Images
      MISSING_ALT_LINK_HAS_TEXT: "L'immagine viene utilizzata come link con testo circostante, anche se l'attributo alt dovrebbe essere contrassegnato come decorativo o nullo.",
      MISSING_ALT_LINK: "L'immagine viene utilizzata come link ma manca il testo alt! Assicurarsi che il testo alt descriva dove porta il link.",
      MISSING_ALT: "Manca il testo alt! Se l'immagine trasmette una storia, uno stato d'animo o un'informazione importante, assicuratevi di descrivere l'immagine.",
      LINK_ALT_FILE_EXT: "Il testo alternativo non dovrebbe includere estensioni di file o dimensioni dell'immagine. Assicurarsi che il testo alt descriva la destinazione del link e non una descrizione letterale dell'immagine. Rimuovere: <strong {C}>%(ERROR)</strong> <hr> {ALT} {L} <strong {C}>%(ALT_TEXT)</strong>",
      LINK_PLACEHOLDER_ALT: "Trovato testo alt non descrittivo o segnaposto in un'immagine collegata. Assicurarsi che il testo alt descriva la destinazione del link e non una descrizione letterale dell'immagine. Sostituire il seguente testo alt. <hr> {ALT} {L} <strong {C}>%(ALT_TEXT)</strong>",
      LINK_SUS_ALT: "Le tecnologie assistive indicano già che si tratta di un'immagine, quindi &quot;<strong {C}>%(ERROR)</strong>&quot; potrebbe essere ridondante. Assicuratevi che il testo alt descriva la destinazione del link e non una descrizione letterale dell'immagine. <hr> {ALT} {L} <strong {C}>%(ALT_TEXT)</strong>",
      ALT_FILE_EXT: "Il testo alternativo non dovrebbe includere estensioni di file o dimensioni dell'immagine. Se l'immagine trasmette una storia, uno stato d'animo o un'informazione importante, assicuratevi di descrivere l'immagine. Rimuovere: <strong {C}>%(ERROR)</strong> <hr> {ALT} <strong {C}>%(ALT_TEXT)</strong>",
      ALT_PLACEHOLDER: 'Trovato testo alt non descrittivo o segnaposto. Sostituire il seguente testo alt con qualcosa di più significativo. <hr> {ALT} <strong {C}>%(ALT_TEXT)</strong>',
      SUS_ALT: "Le tecnologie assistive indicano già che si tratta di un'immagine, quindi &quot;<strong {C}>%(ERROR)</strong>&quot; potrebbe essere ridondante. <hr> {ALT} <strong {C}>%(ALT_TEXT)</strong>",
      LINK_IMAGE_NO_ALT_TEXT: "L'immagine all'interno del link è contrassegnata come decorativa e non c'è testo di collegamento. Aggiungere all'immagine un testo alt che descriva la destinazione del link.",
      LINK_IMAGE_TEXT: "L'immagine è contrassegnata come decorativa, anche se il link utilizza il testo circostante come etichetta descrittiva.",
      LINK_IMAGE_LONG_ALT: "La descrizione del testo alt su un'immagine collegata è <strong>troppo lunga</strong>. Il testo alt sulle immagini collegate dovrebbe descrivere dove porta il link, non una descrizione letterale dell'immagine. <strong>Considerate di usare il titolo della pagina a cui rimanda come testo alt.</strong> <hr> {ALT} {L} <strong {B}>%(altLength) Caratteri</strong> <strong {C}>%(ALT_TEXT)</strong>",
      LINK_IMAGE_ALT: "Il link all'immagine contiene un testo alt. <strong>Il testo alt descrive dove porta il link?</strong> Considerate la possibilità di utilizzare come testo alt il titolo della pagina a cui rimanda. <hr> {ALT} {L} <strong {C}>%(ALT_TEXT)</strong>",
      LINK_IMAGE_ALT_AND_TEXT: "Il link all'immagine contiene <strong>sia il testo alt che il testo del link circostante.</strong> Se l'immagine è decorativa e viene utilizzata come link funzionale a un'altra pagina, si consideri di contrassegnare l'immagine come decorativa o nulla - il testo del link circostante dovrebbe essere sufficiente. <hr> {ALT} <strong {C}>%(ALT_TEXT)</strong> <hr> <strong {B}>Nome accessibile</strong> {L} <strong {C}>%(TEXT)</strong>",
      IMAGE_FIGURE_DECORATIVE: "L'immagine è contrassegnata come <strong>decorativa</strong> e sarà ignorata dalle tecnologie assistive. <hr> Sebbene sia stata fornita una <strong>caption</strong>, nella maggior parte dei casi l'immagine dovrebbe avere anche un testo alt. <ul><li>Il testo alt dovrebbe fornire una descrizione concisa di ciò che è contenuto nell'immagine.</li><li>La didascalia dovrebbe solitamente fornire un contesto per mettere in relazione l'immagine con il contenuto circostante, o dare attenzione a un particolare pezzo di informazione.</li></ul> Per saperne di più: <a href=\"https://thoughtbot.com/blog/alt-vs-figcaption#the-figcaption-element\">alt contro figcaption.</a>",
      IMAGE_FIGURE_DUPLICATE_ALT: "Non utilizzare le stesse parole sia per il testo alt che per la didascalia. Gli screen reader annunceranno le informazioni due volte. <ul><li>Il testo alt dovrebbe fornire una descrizione concisa di ciò che è presente nell'immagine.</li><li>La didascalia dovrebbe solitamente fornire un contesto per ricollegare l'immagine al contenuto circostante, o dare attenzione a un particolare pezzo di informazione.</li></ul> Per saperne di più: <a href=\"https://thoughtbot.com/blog/alt-vs-figcaption#the-figcaption-element\">alt contro figcaption.</a> <hr> {ALT} <strong {C}>%(ALT_TEXT)</strong>",
      IMAGE_DECORATIVE: "L'immagine è contrassegnata come <strong>decorativa</strong> e sarà ignorata dalle tecnologie assistive. Se l'immagine trasmette una storia, uno stato d'animo o un'informazione importante, assicuratevi di aggiungere il testo alt.",
      IMAGE_DECORATIVE_CAROUSEL: 'L\'immagine è contrassegnata come decorativa, ma tutte le immagini in un carosello o galleria dovrebbero includere un testo alternativo descrittivo per garantire un\'esperienza equivalente per tutti.',
      IMAGE_ALT_TOO_LONG: "La descrizione del testo Alt è <strong>troppo lunga</strong>. Il testo Alt dovrebbe essere conciso, ma significativo come un <em>tweet</em> (circa 100 caratteri). Se si tratta di un'immagine complessa o di un grafico, considerate la possibilità di inserire la lunga descrizione dell'immagine nel testo sottostante o in un componente a fisarmonica. <hr> {ALT} <strong {B}>%(altLength) Caratteri</strong> <strong {C}>%(ALT_TEXT)</strong>",
      IMAGE_PASS: '{ALT} %(ALT_TEXT)',

      // Form labels
      LABELS_MISSING_IMAGE_INPUT: "Il pulsante dell'immagine manca del testo alt. Aggiungere il testo alt per fornire un nome accessibile. Ad esempio: <em>Cerca</em> o <em>Invio</em>.",
      LABELS_INPUT_RESET: 'I pulsanti di reset non dovrebbero essere utilizzati se non specificamente necessari, perché è facile che si attivino per errore. <hr> <strong>Tip!</strong> Scoprite perché <a href="https://www.nngroup.com/articles/reset-and-cancel-buttons/">i pulsanti Reset e Cancel pongono problemi di usabilità.</a>',
      LABELS_ARIA_LABEL_INPUT: "L'input ha un nome accessibile, anche se bisogna assicurarsi che ci sia anche un'etichetta visibile. <hr> <strong {B}>Nome accessibile</strong> <strong {C}>%(TEXT)</strong>",
      LABELS_NO_FOR_ATTRIBUTE: "Non c'è un'etichetta associata a questo input. Aggiungere un attributo <code>for</code> all'etichetta che corrisponda all'<code>id</code> di questo input. <hr> <strong {B}>ID</strong> <strong {C}>#%(id)</strong>",
      LABELS_MISSING_LABEL: "Non c'è un'etichetta associata a questo input. Aggiungere un <code>id</code> a questo input e aggiungere un attributo <code>for</code> corrispondente all'etichetta.",
      LABELS_PLACEHOLDER: 'Il testo segnaposto che scompare rende difficile per le persone ricordare quali informazioni appartengono a un campo e identificare e correggere problemi di validazione. Invece, prendi in considerazione l’uso di un suggerimento visibile in modo permanente prima del campo del modulo. <hr> Scopri di più: <a href="https://www.nngroup.com/articles/form-design-placeholders/">I segnaposto nei campi dei moduli sono dannosi.</a>',

      // Embedded content
      EMBED_VIDEO: 'Assicuratevi che <strong>tutti i video abbiano le didascalie chiuse.</strong> Fornire didascalie per tutti i contenuti audio e video è un requisito obbligatorio di livello A. Le didascalie aiutano le persone non udenti o con problemi di udito.',
      EMBED_AUDIO: 'Assicuratevi di fornire una <strong>trascrizione per tutti i podcast.</strong> Fornire trascrizioni per i contenuti audio è un requisito obbligatorio di Livello A. Le trascrizioni sono di supporto alle persone sorde o con problemi di udito, ma possono essere utili a tutti. Considerate la possibilità di inserire la trascrizione in basso o in un pannello a fisarmonica.',
      EMBED_DATA_VIZ: 'I widget di visualizzazione dei dati come questo sono spesso problematici per le persone che utilizzano una tastiera o uno screen reader per navigare e possono presentare notevoli difficoltà per le persone ipovedenti o daltoniche. Si consiglia di fornire le stesse informazioni in un formato alternativo (testo o tabella) sotto il widget. <hr> Per saperne di più su <a href="https://www.w3.org/WAI/tutorials/images/complex">immagini complesse.</a>',
      EMBED_MISSING_TITLE: 'Il contenuto incorporato richiede un nome accessibile che ne descriva il contenuto. Si prega di fornire un attributo unico <code>title</code> o <code>aria-label</code> sull\'elemento <code>iframe</code>. Per saperne di più su <a href="https://web.dev/learn/accessibility/more-html#iframes">iFrames.</a>',
      EMBED_GENERAL: 'Impossibile controllare il contenuto incorporato. Assicuratevi che le immagini abbiano un testo alt, che i video abbiano didascalie, che il testo abbia un contrasto sufficiente e che i componenti interattivi siano <a href="https://webaim.org/techniques/keyboard/">accessibili alla tastiera.</a>',
      EMBED_UNFOCUSABLE: 'Gli <code>&lt;iframe&gt;</code> con elementi non focalizzabili non devono avere <code>tabindex="-1"</code>. Il contenuto incorporato non sarà accessibile tramite tastiera.',

      // QA
      QA_BAD_LINK: 'Trovato un link errato. Il link sembra puntare a un ambiente di sviluppo. <hr> {L} <strong {C}>%(LINK)</strong>',
      QA_IN_PAGE_LINK: 'Link interno rotto. Il target del link non corrisponde a nessun elemento di questa pagina.',
      QA_STRONG_ITALICS: 'I tag grassetto e corsivo hanno un significato semantico e non devono essere usati per evidenziare interi paragrafi. Il testo in grassetto deve essere usato per dare un forte <strong>enfasi</strong> su una parola o una frase. Il corsivo deve essere usato per evidenziare nomi propri (ad esempio, titoli di libri e articoli), parole straniere e citazioni. Le citazioni lunghe devono essere formattate come blockquote.',
      QA_PDF: "Impossibile verificare l'accessibilità dei PDF. I PDF sono considerati contenuti web e devono essere resi accessibili. I PDF spesso presentano problemi per le persone che utilizzano gli screen reader (tag strutturali mancanti o etichette dei campi del modulo mancanti) e per le persone ipovedenti (il testo non scorre quando viene ingrandito). <ul><li>Se si tratta di un modulo, considerare l'utilizzo di un modulo HTML accessibile come alternativa.</li><li>Se si tratta di un documento, considerare la conversione in una pagina web.</li></ul> Altrimenti, controllare <a href=\"https://helpx.adobe.com/acrobat/using/create-verify-pdf-accessibility.html\">PDF per l'accessibilità in Acrobat DC.</a>",
      QA_DOCUMENT: "Impossibile verificare l'accessibilità del documento. I documenti collegati sono considerati contenuti web e devono essere resi accessibili. Esaminare manualmente il documento. <ul><li>Rendi più accessibile il tuo <a href=\"https://support.google.com/docs/answer/6199477?hl=en\">documento o presentazione di Google Workspace.</a></li><li>Rendi più accessibili i tuoi <a href=\"https://support.microsoft.com/en-us/office/create-accessible-office-documents-868ecfcd-4f00-4224-b881-a65537a7c155\">documenti di Office.</a></li></ul>",
      QA_BLOCKQUOTE: "È un titolo? <strong {C}>%(TEXT)</strong> <hr> Le virgolette dovrebbero essere usate solo per le citazioni. Se si tratta di un'intestazione, cambiare questo blockquote in un'intestazione semantica (per esempio, Intestazione 2 o Intestazione 3).",
      QA_FAKE_HEADING: 'È un titolo? <strong {C}>%(TEXT)</strong> <hr> Una riga di testo in grassetto o grande può sembrare un titolo, ma chi usa uno screen reader non può capire che è importante o saltare al suo contenuto. Il testo in grassetto o grande non dovrebbe mai sostituire le intestazioni semantiche (da Titolo 2 a Titolo 6).',
      QA_FAKE_LIST: "Stai cercando di creare un elenco? Possibile elemento di elenco trovato: <strong {C}>%(firstPrefix)</strong> <hr> Assicurarsi di utilizzare gli elenchi semantici utilizzando invece i pulsanti di formattazione dei punti o dei numeri. Quando si utilizza un elenco semantico, le tecnologie assistive sono in grado di trasmettere informazioni come il numero totale di elementi e la posizione relativa di ciascun elemento nell'elenco. Per saperne di più su <a href=\"https://www.w3.org/WAI/tutorials/page-structure/content/#lists\">elenchi semantici.</a>",
      QA_UPPERCASE: "Trovato tutto maiuscolo. Alcuni screen reader possono interpretare il testo tutto maiuscolo come un acronimo e leggono ogni lettera singolarmente. Inoltre, per alcune persone il testo tutto maiuscolo è più difficile da leggere e può dare l'impressione di urlare.",
      QA_UNDERLINE: 'Il testo sottolineato può essere confuso con i link. Considerate di usare uno stile diverso, come <code>&lt;strong&gt;</code><strong>forte importanza</strong><code>&lt;/strong&gt;</code> o <code>&lt;em&gt;</code><em>emphasis</em><code>&lt;/em&gt;</code>.',
      QA_SUBSCRIPT: "Le opzioni di formattazione pedice e apice devono essere utilizzate solo per modificare la posizione del testo per convenzioni o standard tipografici. Non devono essere utilizzate esclusivamente per scopi di presentazione o di aspetto. La formattazione di intere frasi pone problemi di leggibilità. I casi d'uso appropriati includono la visualizzazione di esponenti, numeri ordinali come 4<sup>th</sup> invece di fourth, e formule chimiche (ad esempio H<sub>2</sub>O).",
      QA_NESTED_COMPONENTS: 'Evita di annidare componenti di layout interattivi, come inserire gli accordioni all\'interno delle schede o le schede all\'interno degli accordioni. Questo può complicare la navigazione, aumentare il carico cognitivo e portare le persone a trascurare i contenuti.',
      QA_JUSTIFY: 'Evitare di utilizzare il testo giustificato, che si allinea sia ai margini sinistro che destro. Questo può essere difficile da leggere per alcune persone a causa degli spazi irregolari tra le parole. Utilizzare testo allineato a sinistra per una migliore leggibilità.',
      QA_SMALL_TEXT: 'Il testo piccolo è più difficile da leggere, in particolare per coloro che hanno problemi di vista. Per garantire una migliore leggibilità, evitare di usare dimensioni di carattere inferiori a quelle predefinite.',

      // Shared
      ACC_NAME: '<strong {B}>Nome accessibile</strong> %(TEXT)',
      ACC_NAME_TIP: '<hr><strong>Consiglio!</strong> Il "nome accessibile" è l\'etichetta finale comunicata alle persone che utilizzano tecnologie assistive e viene calcolata da ARIA. Questo aiuta a comprendere lo scopo del collegamento o del pulsante.',
      HIDDEN_FOCUSABLE: 'Il link o il pulsante ha <code>aria-hidden=&quot;true&quot;</code> ma è ancora focalizzabile con la tastiera. Se intendi nascondere un link o un pulsante duplicato, aggiungi anche <code>tabindex=&quot;-1&quot;</code>. In caso contrario, <code>aria-hidden=&quot;true&quot;</code> non dovrebbe essere utilizzato su elementi che possono ricevere il focus. <hr> Scopri di più sull\' <a href="https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/Attributes/aria-hidden">attributo aria-hidden.</a>',

      // Developer
      DUPLICATE_ID: 'Trovato <strong>ID duplicato</strong>. Gli errori di ID duplicato sono noti per causare problemi alle tecnologie assistive quando cercano di interagire con i contenuti. Si prega di rimuovere o modificare il seguente ID. <hr> <strong {B}>ID</strong> <strong {C}>#%(id)</strong>',
      UNCONTAINED_LI: 'Tutti gli elementi di elenco <code>&lt;li&gt;</code> devono essere inseriti all\'interno di elementi <code>&lt;ul&gt;</code> non ordinati o <code>&lt;ol&gt;</code> ordinati. Questa struttura aiuta i lettori di schermo ad annunciare l\'elenco e i suoi elementi con precisione.',
      TABINDEX_ATTR: 'L\'elemento non deve avere un attributo <code>tabindex</code> maggiore di 0.',

      // Meta checks
      META_LANG: 'Lingua della pagina non dichiarata! Si prega di <a href="https://www.w3.org/International/questions/qa-html-language-declarations">dichiarare la lingua nel tag HTML.</a>',
      META_TITLE: 'Titolo della pagina mancante! Si prega di fornire un <a href="https://developer.mozilla.org/en-US/docs/Web/HTML/Element/title">titolo della pagina.</a>',
      META_SCALABLE: 'Rimuovi il parametro <code>user-scalable="no"</code> nel <a href="https://developer.mozilla.org/en-US/docs/Web/HTML/Viewport_meta_tag">meta tag del viewport</a> per consentire lo zoom.',
      META_MAX: 'Assicurati che il parametro <code>maximum-scale</code> nel <a href="https://developer.mozilla.org/en-US/docs/Web/HTML/Viewport_meta_tag">meta tag del viewport</a> non sia inferiore a 2.',
      META_REFRESH: 'La pagina non dovrebbe aggiornarsi automaticamente utilizzando un tag meta.',

      // Buttons
      BTN_EMPTY: 'Il pulsante è privo di un nome accessibile che descriva il suo scopo.',
      BTN_EMPTY_LABELLEDBY: 'Il pulsante ha un valore <code>aria-labelledby</code> che è vuoto o non corrisponde al valore <code>id</code> di un altro elemento sulla pagina.',
      BTN: 'pulsante',
      BTN_TIP: 'Scopri come creare un <a href="https://www.sarasoueidan.com/blog/accessible-icon-buttons/">pulsante accessibile.</a>',
      BTN_ROLE_IN_NAME: 'Non includere la parola "pulsante" nel nome di un pulsante. Gli screen reader comunicano già il ruolo di un elemento oltre al suo nome.',
      LABEL_IN_NAME: 'Il testo visibile per questo elemento sembra essere diverso dal nome accessibile, il che potrebbe causare confusione per gli utenti di tecnologie assistive. Si prega di rivedere: <hr> <strong {B}>Nome Accessibile</strong> <strong {C}>%(TEXT)</strong>',

      // Tables
      TABLES_MISSING_HEADINGS: 'Intestazioni di tabella mancanti! Le tabelle accessibili necessitano di un markup HTML che indichi le celle di intestazione e le celle di dati e che definisca la loro relazione. Queste informazioni forniscono un contesto alle persone che utilizzano tecnologie assistive. Le tabelle devono essere utilizzate solo per i dati tabellari. <hr> Per saperne di più su <a href="https://www.w3.org/WAI/tutorials/tables/">tabelle accessibili.</a>',
      TABLES_SEMANTIC_HEADING: "Le intestazioni semantiche come Heading 2 o Heading 3 devono essere utilizzate solo per le sezioni di contenuto; <strong>non</strong> nelle tabelle HTML. Indicare le intestazioni delle tabelle utilizzando invece l'elemento <code>&lt;th&gt;</code>. <hr> Per saperne di più su <a href=\"https://www.w3.org/WAI/tutorials/tables/\">tabelle accessibili.</a>",
      TABLES_EMPTY_HEADING: "Trovato un'intestazione di tabella vuota! Le intestazioni delle tabelle non devono mai essere vuote. È importante designare le intestazioni di riga e/o di colonna per indicare la loro relazione. Queste informazioni forniscono un contesto alle persone che utilizzano tecnologie assistive. Tenete presente che le tabelle devono essere utilizzate solo per i dati tabellari. <hr> Per saperne di più su <a href=\"https://www.w3.org/WAI/tutorials/tables/\">tabelle accessibili.</a>",

      // Contrast
      CONTRAST_NORMAL: 'Il testo di dimensioni normali dovrebbe avere un rapporto di contrasto di almeno %(RATIO).',
      CONTRAST_LARGE: 'Il testo di grandi dimensioni dovrebbe avere un rapporto di contrasto di almeno %(RATIO).',
      CONTRAST_ERROR: 'Il testo non ha abbastanza contrasto con lo sfondo, rendendolo difficile da leggere.',
      CONTRAST_WARNING: 'Il contrasto di questo testo è sconosciuto e deve essere verificato manualmente. Assicurati che il testo e lo sfondo abbiano un contrasto forte.',
      CONTRAST_ERROR_GRAPHIC: 'La grafica non ha abbastanza contrasto con lo sfondo, rendendola difficile da vedere.',
      CONTRAST_WARNING_GRAPHIC: 'Il contrasto di questa grafica è sconosciuto e deve essere verificato manualmente.',
      CONTRAST_TIP_GRAPHIC: 'Le grafiche e gli elementi dell\'interfaccia utente devono avere un rapporto di contrasto di almeno 3:1.',
      CONTRAST_OPACITY: 'Aumenta l\'opacità per una migliore visibilità.',
      CONTRAST_APCA: 'Questo non è abbastanza contrasto per nessuna dimensione di testo. Considera di utilizzare questa combinazione di colore e dimensione del testo?',
      CONTRAST_COLOR: 'Considera di utilizzare questo colore invece?',
      CONTRAST_SIZE: 'Considera di aumentare la dimensione del testo per questa combinazione di colori?',
      CONTRAST_PLACEHOLDER: 'Il testo del segnaposto in questo campo non ha abbastanza contrasto con lo sfondo, rendendolo difficile da leggere.',
      CONTRAST_PLACEHOLDER_UNSUPPORTED: 'Il contrasto di questo testo segnaposto è sconosciuto e deve essere esaminato manualmente. Assicurati che il testo e lo sfondo abbiano colori fortemente contrastanti.',
      CONTRAST_INPUT: 'Il testo in questo campo non ha abbastanza contrasto con lo sfondo, rendendolo difficile da leggere.',
      CONTRAST: 'Contrasto',
      UNKNOWN: 'Sconosciuto',
      FG: 'Primo piano',
      BG: 'Sfondo',
      NO_SUGGESTION: 'Non è possibile trovare una combinazione accessibile solo cambiando il colore del testo. Prova a cambiare il colore di sfondo.',
    },
  };

  return it;

}));
