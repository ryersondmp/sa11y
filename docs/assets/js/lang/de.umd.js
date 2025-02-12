
/*!
  * Sa11y, the accessibility quality assurance assistant.
  * @version 4.0.9
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
  (global = typeof globalThis !== 'undefined' ? globalThis : global || self, global.Sa11yLangDe = factory());
})(this, (function () { 'use strict';

  var de = {
    // German
    strings: {
      LANG_CODE: 'de',
      MAIN_TOGGLE_LABEL: 'Barrierefreiheit prüfen',
      CONTAINER_LABEL: 'Barrierefreiheits-Checker',
      ERROR: 'Fehler',
      ERRORS: 'Fehler',
      WARNING: 'Warnung',
      WARNINGS: 'Warnungen',
      GOOD: 'Gut',
      ON: 'An',
      OFF: 'Aus',
      ALERT_TEXT: 'Alarm',
      ALERT_CLOSE: 'Schließen',
      OUTLINE: 'Seitenumriss',
      TITLE: 'Titel',
      ALT: 'ALT',
      IMAGES: 'Bilder',
      EDIT: 'Bearbeiten',
      NO_IMAGES: 'Keine Bilder gefunden.',
      DECORATIVE: 'Dekorativ',
      MISSING: 'Fehlend',
      PAGE_ISSUES: 'Seitenprobleme',
      SETTINGS: 'Einstellungen',
      DEVELOPER_CHECKS: 'Entwicklerprüfungen',
      DEVELOPER_DESC: 'Überprüft Probleme, deren Behebung Programmierkenntnisse erfordern kann, wie HTML-Attribute, Formulare und mehr.',
      DARK_MODE: 'Dark mode',
      SHORTCUT_SR: 'Zum Eintrag springen. Keyboard shortcut: Alt Punkt',
      SKIP_TO_ISSUE: 'Zum Eintrag springen',
      NEW_TAB: 'Öffnet neuen Tab',
      LINKED: 'Verknüpft',
      PANEL_HEADING: 'Barrierefreiheits-Check',
      NO_ERRORS_FOUND: 'Keine Fehler gefunden.',
      WARNINGS_FOUND: 'Warnungen gefunden.',
      TOTAL_FOUND: 'Einträge insgesamt gefunden.',
      NOT_VISIBLE: 'Das Element, das Sie anzeigen möchten, ist nicht sichtbar; es ist möglicherweise ausgeblendet oder befindet sich in einer Akkordeon- oder Registerkartenkomponente. Hier ist eine Vorschau:',
      MISSING_ROOT: 'Die gesamte Seite wurde auf Barrierefreiheit geprüft, da der Zielbereich <code>%(root)</code> nicht existiert.',
      MISSING_READABILITY_ROOT: 'Die Lesbarkeitsbewertung basiert auf dem Inhaltsbereich <code>%(fallback)</code>, da der Zielbereich <code>%(root)</code> nicht existiert.',
      HEADING_NOT_VISIBLE: 'Die Überschrift ist nicht sichtbar; sie kann ausgeblendet sein oder sich innerhalb einer Akkordeon- oder Registerkartenkomponente befinden.',
      SKIP_TO_PAGE_ISSUES: 'Zu Seitenproblemen springen',
      CONSOLE_ERROR: 'Leider liegt ein Problem mit der Barrierefreiheitsprüfung auf dieser Seite vor. Können Sie es bitte <a href="%(link)">über dieses Formular</a> oder auf <a href="%(link)">GitHub</a> melden?',
      APPEARANCE: 'Erscheinungsbild',
      MOVE_PANEL: 'Panel verschieben',

      // Dismiss
      PANEL_DISMISS_BUTTON: 'Zeige %(dismissCount) abgelehnte',
      DISMISS: 'Ablehnen',
      DISMISS_ALL: 'Alle ablehnen',
      DISMISSED: 'Abgelehnt',
      DISMISS_REMINDER: 'Bitte beachten Sie, dass Warnungen nur <strong>vorübergehend</strong> abgelehnt werden. Das Löschen Ihres Browserverlaufs und Ihrer Cookies stellt alle zuvor abgelehnten Warnungen auf allen Seiten wieder her.',

      // Export
      DATE: 'Datum',
      PAGE_TITLE: 'Seitentitel',
      RESULTS: 'Ergebnisse',
      EXPORT_RESULTS: 'Ergebnisse exportieren',
      GENERATED: 'Ergebnisse generiert mit %(tool).',
      PREVIEW: 'Vorschau',
      ELEMENT: 'Element',
      PATH: 'Pfad',

      // Color filters
      COLOUR_FILTER: 'Farbfilter',
      PROTANOPIA: 'Protanopie',
      DEUTERANOPIA: 'Deuteranopie',
      TRITANOPIA: 'Tritanopie',
      MONOCHROMACY: 'Monochromie',
      COLOUR_FILTER_MESSAGE: 'Suchen Sie nach Elementen, die schwer wahrnehmbar oder von anderen Farben zu unterscheiden sind.',
      RED_EYE: 'Rotblindheit',
      GREEN_EYE: 'Grünblindheit',
      BLUE_EYE: 'Blaublindheit',
      MONO_EYE: 'Rot-, Grün- und Blaublindheit.',
      COLOUR_FILTER_HIGH_CONTRAST: 'Farbfilter funktionieren nicht im Hochkontrastmodus.',

      // Alternative text stop words
      SUS_ALT_STOPWORDS: ['image', 'graphic', 'picture', 'photo', 'foto', 'bild'],
      PLACEHOLDER_ALT_STOPWORDS: ['alt', 'image', 'photo', 'foto', 'bild', 'decorative', 'placeholder', 'platzhalter', 'placeholder image', 'platzhalter bild', 'platzhalter foto', 'platzhalter photo', 'spacer', 'abstand'],
      PARTIAL_ALT_STOPWORDS: [
        'click',
        'klick',
        'click here',
        'hier klicken',
        'click here for more',
        'hier für mehr klicken',
        'click here to learn more',
        'hier klicken um mehr zu erfahren',
        'clicking here',
        'check out',
        'detailed here',
        'download',
        'herunterladen',
        'download here',
        'hier herunterladen',
        'find out',
        'herausfinden',
        'find out more',
        'mehr herausfinden',
        'form',
        'formular',
        'here',
        'hier',
        'info',
        'information',
        'link',
        'learn',
        'learn more',
        'mehr erfahren',
        'learn to',
        'more',
        'mehr',
        'page',
        'seite',
        'paper',
        'papier',
        'read more',
        'mehr lesen',
        'lesen',
        'read this',
        'dies lesen',
        'this',
        'dies',
        'this page',
        'diese seite',
        'this website',
        'diese website',
        'view',
        'anschauen',
        'view our',
        'website',
      ],
      CLICK: ['click', 'klicken'],
      NEW_WINDOW_PHRASES: ['external', 'extern', 'new tab', 'neuer tab', 'new window', 'neues fenster', 'pop-up', 'pop up'],
      FILE_TYPE_PHRASES: ['dokument', 'document', 'spreadsheet', 'tabelle', 'worksheet', 'arbeitsblatt', 'tabellenkalkulation', 'berechnungstabelle', 'komprimierte datei', 'archivierte Datei', 'arbeitsblatt', 'powerpoint', 'präsentation', 'installieren', 'video', 'audio', 'pdf'],

      // Readability
      READABILITY: 'Lesbarkeit',
      AVG_SENTENCE: 'Durchschnittliche Wörter pro Satz:',
      COMPLEX_WORDS: 'Komplexe Wörter:',
      TOTAL_WORDS: 'Wörter:',
      VERY_DIFFICULT: 'Sehr schwierig',
      DIFFICULT: 'Schwierig',
      FAIRLY_DIFFICULT: 'Ziemlich schwierig',
      READABILITY_NO_CONTENT: 'Die Lesbarkeitsbewertung kann nicht berechnet werden. Kein Absatz- <code>&lt;p&gt;</code> oder Listeninhalt <code>&lt;li&gt;</code> gefunden.',
      READABILITY_NOT_ENOUGH: 'Nicht genügend Inhalt für die Berechnung der Lesbarkeitsbewertung.',

      // Headings
      HEADING_SKIPPED_LEVEL: 'Überschriften sollten keine Ebenen überspringen oder von <strong>Überschrift %(PREV_LEVEL)</strong> zu <strong {C}>Überschrift %(LEVEL)</strong> springen, da dies die Ordnung und Hierarchie des Inhalts stört und das Folgen erschwert. <hr> Wenn <strong {C}>%(HEADING)</strong> unter den Abschnitt <strong>%(PREV_HEADING)</strong> fällt, sollten Sie in Betracht ziehen, es stattdessen als <strong>Überschrift %(LEVEL)</strong> zu formatieren.',
      HEADING_EMPTY: 'Leere Überschrift gefunden! Um dies zu beheben, löschen Sie diese Zeile oder ändern Sie ihr Format von <strong {C}>Überschrift %(level)</strong> zu <strong>Normal</strong> oder <strong>Absatz (p)</strong>.',
      HEADING_LONG: 'Die Überschrift ist lang! Überschriften sollten dazu dienen, den Inhalt zu gliedern und eine Struktur zu vermitteln. Sie sollten kurz, informativ und eindeutig sein. Überschriften sollten nicht länger als %(MAX_LENGTH) Zeichen sein (nicht länger als ein Satz). <hr> <strong {B}>%(HEADING_LENGTH) Zeichen</strong>',
      HEADING_FIRST: 'Die erste Überschrift auf einer Seite sollte in der Regel Überschrift 1 oder Überschrift 2 sein. Überschrift 1 sollte der Beginn des Hauptinhaltsabschnitts sein und ist die Hauptüberschrift, die den allgemeinen Zweck der Seite beschreibt. Erfahre mehr über <a href="https://www.w3.org/WAI/tutorials/page-structure/headings/">Überschriften-Struktur.</a>',
      HEADING_MISSING_ONE: 'Fehlende Überschrift 1: Überschrift 1 sollte am Anfang des Hauptinhaltsbereichs stehen und ist die Hauptüberschrift, die den allgemeinen Zweck der Seite beschreibt. Erfahre mehr über <a href="https://www.w3.org/WAI/tutorials/page-structure/headings/">Überschriften-Struktur.</a>',
      HEADING_EMPTY_WITH_IMAGE: 'Die Überschrift hat keinen Text, enthält aber ein Bild. Wenn es sich nicht um eine Überschrift handelt, ändere das Format von <strong {C}>Überschrift %(level)</strong> zu <strong>Normal</strong> oder <strong>Absatz (p)</strong>. Andernfalls füge bitte einen Alt-Text zum Bild hinzu, wenn es nicht dekorativ ist.',
      PANEL_HEADING_MISSING_ONE: 'Fehlende Überschrift 1!',
      PANEL_NO_HEADINGS: 'Keine Überschriften gefunden.',

      // Links
      LINK_EMPTY: 'Entferne leere Links ohne Text.',
      LINK_EMPTY_LABELLEDBY: 'Der Link hat einen Wert für <code>aria-labelledby</code>, der leer ist oder nicht mit dem Wert des <code>id</code>-Attributs eines anderen Elements auf der Seite übereinstimmt.',
      LINK_EMPTY_NO_LABEL: 'Der Link hat keinen erkennbaren Text, der für Bildschirmleser und andere unterstützenden Technologien sichtbar ist. Zu beheben: <ul><li>Füge einen kurzen Text hinzu, der beschreibt, wohin der Link führt.</li><li>Wenn es ein <a href="https://a11y-101.com/development/icons-and-links">Icon Link oder ein SVG ist,</a> ist es sehr wahrscheinlich, dass ein beschreibendes Label fehlt.</li><li>Wenn Du glaubst, dass dieser Link aufgrund eines Kopier-/Einfügefehlers fehlerhaft ist, solltest Du ihn löschen.</li></ul>',
      LINK_STOPWORD: 'Linktext ist möglicherweise außerhalb des Kontexts nicht aussagekräftig genug: <strong {C}>%(ERROR)</strong>',
      LINK_STOPWORD_ARIA: 'Obwohl ein zugänglicher Name bereitgestellt wurde, sollten Sie den sichtbaren Linktext überarbeiten. Ausdrücke wie &quot;<strong {C}>%(ERROR)</strong>&quot; sind nicht aussagekräftig.',
      LINK_TIP: '<hr> <strong>Tipp!</strong> Verwenden Sie klaren und einzigartigen Linktext, der das Ziel des Links beschreibt, in der Regel der Titel der Seite oder des Dokuments.',
      LINK_CLICK_HERE: 'Die Phrase "klicken" oder "hier klicken" konzentriert sich auf Mausmechanik, obwohl viele Personen keine Maus benutzen oder diese Webseite auf einem mobilen Gerät anzeigen. Verwenden Sie stattdessen ein anderes Verb, das zur Aufgabe passt.',
      DUPLICATE_TITLE: 'Das Attribut <code>title</code> bei Links und Bildern soll zusätzliche Informationen bereitstellen und sollte <strong>anders</strong> als der Text oder der Alternativtext sein. Der Titeltext erscheint, wenn Sie mit der Maus über ein Element fahren, ist jedoch mit Tastatur oder Touch-Eingabe nicht zugänglich. Erwägen Sie <a href="https://www.a11yproject.com/posts/title-attributes/">das Attribut title vollständig zu vermeiden.</a>',
      LINK_SYMBOLS: 'Vermeiden Sie die Verwendung von Symbolen als Handlungsaufforderungen im Linktext, es sei denn, sie sind für assistive Technologien verborgen. Bildschirmlesegeräte können die Symbole laut vorlesen, was verwirrend sein kann. Ziehen Sie in Betracht, sie zu entfernen: <strong {C}>%(ERROR)</strong>',
      LINK_URL: 'Längere, weniger verständliche URLs, die als Linktext verwendet werden, könnten beim Zugriff mit Hilfe von Hilfsmitteln schwer zu verstehen sein. In den meisten Fällen ist es besser, anstelle der URL einen von Menschen lesbaren Text zu verwenden. Kurze URLs (z. B. die Homepage einer Website) sind in Ordnung.',
      LINK_DOI: 'Für Webseiten oder reine Online-Ressourcen empfiehlt der <a href="https://apastyle.apa.org/style-grammar-guidelines/paper-format/accessibility/urls#:~:text=descriptive%20links">APA Style guide</a> die Verwendung von deskriptiven Links, indem die URL oder DOI des Werks um den Titel herumgeschrieben wird. Längere, weniger verständliche URLs, die als Linktext verwendet werden, könnten beim Zugriff mit Hilfe von Hilfsmitteln schwer zu verstehen sein.',
      LINK_NEW_TAB: 'Der Link öffnet sich in einem neuen Tab oder einem neuen Fenster ohne Warnung. Dies kann verwirrend sein, insbesondere für Menschen, die Schwierigkeiten haben, visuelle Inhalte wahrzunehmen. Zweitens ist es nicht immer eine gute Praxis, die Erfahrungen der anderen zu kontrollieren oder für sie Entscheidungen zu treffen. Gib im Linktext an, dass der Link in einem neuen Fenster geöffnet wird. <hr> <strong>Tipp!</strong> Lerne bewährte Praktiken kennen: <a href="https://www.nngroup.com/articles/new-browser-windows-and-tabs/">Öffnen von Links in neuen Browserfenstern und Tabs.</a>',
      LINK_FILE_EXT: 'Der Link verweist ohne Warnung auf eine PDF- oder herunterladbare Datei (z. B. MP3, Zip, Word Doc). Gib den Dateityp im Linktext an. Wenn es sich um eine große Datei handelt, solltest Du die Dateigröße angeben. <hr> <strong>Beispiel:</strong> Bericht der Geschäftsführung (PDF, 3MB)',
      LINK_IDENTICAL_NAME: 'Der Link hat den gleichen Text wie ein anderer Link, obwohl er auf eine andere Seite verweist. Mehrere Links mit demselben Text können bei Personen, die Bildschirmlesegeräte verwenden, zu Verwirrung führen. <strong>Erwäge, den folgenden Link beschreibender zu gestalten, um ihn von anderen Links zu unterscheiden.</strong> <hr> <strong {B}>Zugänglicher Name</strong> <strong {C}>%(TEXT)</strong>',

      // Images
      MISSING_ALT_LINK_HAS_TEXT: 'Das Bild wird als Link mit umliegendem Text verwendet, obwohl das alt-Attribut als dekorativ oder null markiert sein sollte.',
      MISSING_ALT_LINK: 'Das Bild wird als Link verwendet, aber es fehlt der Alt-Text! Bitte stellen Sie sicher, dass der Alt-Text beschreibt, wohin der Link Dich führt.',
      MISSING_ALT: 'Fehlender Alt text! Wenn das Bild eine Geschichte, eine Stimmung oder eine wichtige Information vermittelt - beschreibe das Bild unbedingt.',
      LINK_ALT_FILE_EXT: 'Dateierweiterung im Alt-Text gefunden. Achte darauf, dass der Alt-Text das Ziel des Links beschreibt und nicht eine wörtliche Beschreibung des Bildes ist. Entferne: <strong {C}>%(ERROR)</strong> <hr> {ALT} {L} <strong {C}>%(ALT_TEXT)</strong>',
      LINK_PLACEHOLDER_ALT: 'Nicht beschreibender oder Platzhalter-Alt-Text innerhalb eines verlinkten Bildes gefunden. Achte darauf, dass der Alt-Text das Ziel des Links beschreibt und nicht eine wörtliche Beschreibung des Bildes ist. Ersetzen Sie den folgenden Alt-Text. <hr> {ALT} {L} <strong {C}>%(ALT_TEXT)</strong>',
      LINK_SUS_ALT: 'Assistive Technologien zeigen bereits an, dass es sich um ein Bild handelt, so dass &quot;<strong {C}>%(ERROR)</strong>&quot; möglicherweise überflüssig ist. Achte darauf, dass der Alt-Text das Ziel des Links beschreibt und nicht eine wörtliche Beschreibung des Bildes ist. <hr> {ALT} {L} <strong {C}>%(ALT_TEXT)</strong>',
      ALT_FILE_EXT: 'Dateierweiterung im Alt-Text gefunden. Wenn das Bild eine Geschichte, eine Stimmung oder eine wichtige Information vermittelt - beschreibe das Bild unbedingt. Entferne: <strong {C}>%(ERROR)</strong> <hr> {ALT} <strong {C}>%(ALT_TEXT)</strong>',
      ALT_PLACEHOLDER: 'Nicht-beschreibender oder Platzhalter-Alt-Text gefunden. Ersetze den folgenden Alt-Text durch einen aussagekräftigeren Text. <hr> {ALT} <strong {C}>%(ALT_TEXT)</strong>',
      SUS_ALT: 'Assistive Technologien zeigen bereits an, dass es sich um ein Bild handelt, so dass &quot;<strong {C}>%(ERROR)</strong>&quot; möglicherweise überflüssig ist. <hr> {ALT} <strong {C}>%(ALT_TEXT)</strong>',
      LINK_IMAGE_NO_ALT_TEXT: 'Das Bild innerhalb des Links ist als dekorativ gekennzeichnet und es gibt keinen Linktext. Bitte füge dem Bild einen Alt-Text hinzu, der das Ziel des Links beschreibt.',
      LINK_IMAGE_TEXT: 'Das Bild ist als dekorativ gekennzeichnet, obwohl der Link den umgebenden Text als beschreibende Bezeichnung verwendet.',
      LINK_IMAGE_LONG_ALT: 'Alt-Text-Beschreibung auf einem verlinkten Bild ist <strong>zu lang</strong>. Der Alt-Text von verlinkten Bildern sollte beschreiben, wohin der Link führt, und nicht eine wörtliche Beschreibung des Bildes enthalten. <strong>Erwäge, den Titel der Seite, auf die verlinkt wird, als Alt-Text zu verwenden.</strong> <hr> {ALT} {L} <strong {B}>%(altLength) Zeichen</strong> <strong {C}>%(ALT_TEXT)</strong>',
      LINK_IMAGE_ALT: 'Der Bildlink enthält einen Alt-Text. <strong>Beschreibt der Alt-Text, wohin der Link Sie führt?</strong> Erwägen Sie, den Titel der Seite, zu der der Link führt, als Alt-Text zu verwenden. <hr> {ALT} {L} <strong {C}>%(ALT_TEXT)</strong>',
      LINK_IMAGE_ALT_AND_TEXT: 'Der Bildlink enthält <strong>beide Alt-Texte und den umgebenden Linktext.</strong> Wenn dieses Bild dekorativ ist und als funktionaler Link zu einer anderen Seite verwendet wird, sollte das Bild als dekorativ oder nichtig gekennzeichnet werden - der umgebende Linktext sollte ausreichen. <hr> {ALT} <strong {C}>%(ALT_TEXT)</strong> <hr> <strong {B}>Zugänglicher Name</strong> {L} <strong {C}>%(TEXT)</strong>',
      IMAGE_FIGURE_DECORATIVE: 'Das Bild ist als <strong>dekorativ</strong> gekennzeichnet und wird von Hilfsmitteln ignoriert. <hr> Obwohl eine <strong>Beschriftung</strong> angegeben wurde, sollte das Bild in den meisten Fällen auch einen Alt-Text haben. <ul><li>Der Alt-Text sollte eine prägnante Beschreibung des Bildes enthalten.</li><li>Die Bildunterschrift sollte in der Regel einen Zusammenhang zwischen dem Bild und dem umgebenden Inhalt herstellen oder auf eine bestimmte Information hinweisen.</li></ul>Erfahre mehr: <a href="https://thoughtbot.com/blog/alt-vs-figcaption#the-figcaption-element">alt versus figcaption.</a>',
      IMAGE_FIGURE_DUPLICATE_ALT: 'Verwende nicht genau dieselben Wörter für den Alt-Text und die Überschrift. Bildschirmlesegeräte melden die Informationen doppelt. <ul><li>Der Alt-Text sollte eine prägnante Beschreibung des Bildes enthalten.</li><li>Die Bildunterschrift sollte in der Regel einen Zusammenhang zwischen dem Bild und dem umgebenden Inhalt herstellen oder auf eine bestimmte Information hinweisen.</li></ul> Erfahre mehr: <a href="https://thoughtbot.com/blog/alt-vs-figcaption#the-figcaption-element">alt versus figcaption.</a> <hr> {ALT} <strong {C}>%(ALT_TEXT)</strong>',
      IMAGE_DECORATIVE: 'Das Bild ist als <strong>dekorativ</strong> gekennzeichnet und wird von Hilfsmitteln ignoriert. Wenn das Bild eine Geschichte, eine Stimmung oder wichtige Informationen vermittelt - füge unbedingt einen Alt-Text hinzu.',
      IMAGE_ALT_TOO_LONG: 'Die Beschreibung des Alt-Textes ist <strong>zu lang</strong>. Der Alt-Text sollte prägnant, aber aussagekräftig wie ein <em>Tweet</em> sein (etwa 100 Zeichen). Wenn es sich um ein komplexes Bild oder eine Grafik handelt, sollten Sie erwägen, die lange Beschreibung des Bildes in den Text darunter oder in eine Akkordeonkomponente zu integrieren. <hr> {ALT} <strong {B}>%(altLength) Zeichen</strong> <strong {C}>%(ALT_TEXT)</strong>',
      IMAGE_DECORATIVE_CAROUSEL: 'Das Bild ist als dekorativ gekennzeichnet, aber alle Bilder in einem Karussell oder einer Galerie sollten beschreibenden Alt-Text enthalten, um ein gleichwertiges Erlebnis für alle zu gewährleisten.',
      IMAGE_PASS: '{ALT} %(ALT_TEXT)',

      // Labels
      LABELS_MISSING_IMAGE_INPUT: 'Bildschaltfläche fehlt Alt-Text. Bitte füge alternativen Text hinzu, um einen barrierefreien Namen bereitzustellen. Zum Beispiel: <em>Suchen</em> oder <em>Senden</em>.',
      LABELS_INPUT_RESET: 'Reset-Buttons sollten <strong>nicht</strong> verwendet werden, es sei denn, dies wird ausdrücklich benötigt, da sie leicht versehentlich aktiviert werden können. <hr> <strong>Tipp!</strong> Erfahre, warum <a href="https://www.nngroup.com/articles/reset-and-cancel-buttons/">Zurücksetzen- und Abbrechen-Schaltflächen Probleme mit der Benutzerfreundlichkeit aufwerfen.</a>',
      LABELS_ARIA_LABEL_INPUT: 'Die Eingabe hat einen zugänglichen Namen, stelle bitte trotzdem sicher, dass es auch ein sichtbares Label gibt. <hr> <strong {B}>Zugänglicher Name</strong> <strong {C}>%(TEXT)</strong>',
      LABELS_NO_FOR_ATTRIBUTE: 'Dieser Eingabe ist kein Label zugeordnet. Füge dem Label ein <code>for</code>-Attribut hinzu, das der <code>id</code> dieser Eingabe entspricht. <hr> <strong {B}>ID</strong> <strong {C}>#%(id)</strong>',
      LABELS_MISSING_LABEL: 'Dieser Eingabe ist kein Label zugeordnet. Bitte füge dieser Eingabe eine <code>id</code> hinzu und füge dem Label ein passendes <code>for</code>-Attribut hinzu.',
      LABELS_PLACEHOLDER: 'Verschwindender Platzhaltertext erschwert es den Menschen, sich daran zu erinnern, welche Informationen in ein Feld gehören, und Probleme mit der Validierung zu identifizieren und zu beheben. Erwägen Sie stattdessen, einen dauerhaft sichtbaren Hinweis vor dem Formularfeld zu verwenden. <hr> Erfahren Sie mehr: <a href="https://www.nngroup.com/articles/form-design-placeholders/">Platzhalter in Formularfeldern sind schädlich.</a>',

      // Embedded content
      EMBED_VIDEO: 'Bitte stelle sicher, dass <strong>alle Videos Untertitel haben.</strong> Das Bereitstellen von Untertiteln für alle Audio- und Videoinhalte ist eine obligatorische Anforderung der Stufe-A. Bildunterschriften unterstützen Menschen, die Taub oder schwerhörig sind.',
      EMBED_AUDIO: 'Bitte stelle sicher, dass Du ein <strong>Transkript für alle Podcasts bereitstellst.</strong> Das Bereitstellen von Transkripten für Audioinhalte ist eine obligatorische Anforderung der Stufe-A. Transkripte unterstützen Menschen, die gehörlos oder schwerhörig sind, können aber allen zugute kommen. Erwäge, das Transkript unter- oder innerhalb eines Akkordeonfelds zu platzieren.',
      EMBED_DATA_VIZ: 'Datenvisualisierungs-Widgets wie dieses sind oft problematisch für Menschen, die eine Tastatur oder einen Bildschirmleser zum Navigieren verwenden, und können für Menschen mit Sehbehinderung oder Farbenblindheit erhebliche Schwierigkeiten darstellen. Es wird empfohlen, dieselben Informationen in einem alternativen (Text- oder Tabellen-)Format unterhalb des Widgets bereitzustellen. <hr> Erfahre mehr über <a href="https://www.w3.org/WAI/tutorials/images/complex">komplexe Bilder.</a>',
      EMBED_MISSING_TITLE: 'Eingebetteter Inhalt erfordert einen zugänglichen Namen, der seinen Inhalt beschreibt. Bitte gib ein eindeutiges <code>title</code>- oder <code>aria-label</code>-Attribut für das <code>iframe</code>-Element an. Erfahre mehr über <a href="https://web.dev/learn/accessibility/more-html#iframes">iFrames.</a>',
      EMBED_GENERAL: 'Eingebetteter Inhalt kann nicht überprüft werden. Bitte stelle sicher, dass Bilder Alt-Text haben, Videos Untertitel haben, Text einen ausreichenden Kontrast hat und interaktive Komponenten <a href="https://webaim.org/techniques/keyboard/">mit der Tastatur zugänglich sind.</a>',
      EMBED_UNFOCUSABLE: '<code>&lt;iframe&gt;</code> mit nicht fokussierbaren Elementen sollte kein <code>tabindex="-1"</code> haben. Der eingebettete Inhalt wird nicht mit der Tastatur erreichbar sein.',

      // Quality assurance
      QA_BAD_LINK: 'Ungültiger Link gefunden. Link scheint auf eine Entwicklungsumgebung zu verweisen. <hr> {L} <strong {C}>%(LINK)</strong>',
      QA_IN_PAGE_LINK: 'Defekter Verweis innerhalb der Seite. Das Ziel des Verweises stimmt mit keinem Element auf dieser Seite überein.',
      QA_STRONG_ITALICS: 'Fett- und Kursiv-Tags haben semantische Bedeutung und sollten <strong>nicht</strong> verwendet werden, um ganze Absätze hervorzuheben. Fettgedruckter Text sollte verwendet werden, um ein Wort oder einen Ausdruck stark <strong>zu betonen</strong>. Kursiv sollte verwendet werden, um Eigennamen (z. B. Buch- und Artikeltitel), Fremdwörter, Zitate hervorzuheben. Lange Zitate sollten als Blockquote formatiert werden.',
      QA_PDF: 'PDFs können nicht auf Barrierefreiheit geprüft werden. PDFs gelten als Webinhalte und müssen ebenfalls zugänglich gemacht werden. PDFs enthalten oft Probleme für Personen, die Screenreader verwenden (fehlende Struktur-Tags oder fehlende Beschriftungen von Formularfeldern) und Personen mit Sehbehinderung (Text umfließt beim Vergrößern nicht ). <ul><li>Wenn es sich um ein Formular handelt, solltest Du alternativ ein barrierefreies HTML-Formular verwenden.</li><li>Wenn es sich um ein Dokument handelt, solltest Du es in eine Webseite umwandeln.</li></ul> Andernfalls überprüfe bitte <a href="https://helpx.adobe.com/acrobat/using/create-verify-pdf-accessibility.html">PDF für Barrierefreiheit in Acrobat DC.</a>',
      QA_DOCUMENT: 'Das Dokument kann nicht auf Zugänglichkeit geprüft werden. Verknüpfte Dokumente gelten als Webinhalte und müssen ebenfalls zugänglich gemacht werden. Bitte überprüfen Sie dieses Dokument manuell. <ul><li>Machen Sie Ihr <a href="https://support.google.com/docs/answer/6199477?hl=de">Google Workspace-Dokument oder Ihre Präsentation besser zugänglich.</a></li><li>Machen Sie Ihre <a href="https://support.microsoft.com/de-de/office/create-accessible-office-documents-868ecfcd-4f00-4224-b881-a65537a7c155">Office-Dokumente besser zugänglich.</a></li></ul>',
      QA_BLOCKQUOTE: 'Ist das eine Überschrift? <strong {C}>%(TEXT)</strong> <hr> Blockquotes sollten nur für Zitate verwendet werden. Wenn dies eine Überschrift sein soll, ändere dieses Blockquote in eine semantische Überschrift (z. B. Überschrift 2 oder Überschrift 3).',
      QA_FAKE_HEADING: 'Ist das eine Überschrift? <strong {C}>%(TEXT)</strong> <hr> Eine Zeile mit fettem Text mag wie eine Überschrift aussehen, aber jemand, der einen Bildschirmleser verwendet, kann nicht erkennen, dass sie wichtig ist, oder zu ihrem Inhalt springen. Fettgedruckter Text sollte niemals semantische Überschriften ersetzen (Überschrift 2 bis Überschrift 6).',
      QA_FAKE_LIST: 'Versuchst Du, eine Liste zu erstellen? Mögliches gefundenes Listenelement: <strong {C}>%(firstPrefix)</strong> <hr> Stelle sicher, dass Du semantische Listen verwendest, indem Du stattdessen eine Aufzählungsliste formatierst (Zahlen oder Bullet-Points). Bei der Verwendung einer semantischen Liste sind Hilfstechnologien in der Lage, Informationen wie die Gesamtzahl der Elemente und die relative Position jedes Elements in der Liste zu übermitteln. Erfahre mehr über <a href="https://www.w3.org/WAI/tutorials/page-structure/content/#lists">semantische Listen.</a>',
      QA_UPPERCASE: 'Text in Großbuchstaben gefunden. Einige Screenreader interpretieren Text in Großbuchstaben möglicherweise als Akronym und lesen jeden Buchstaben einzeln. Außerdem finden manche Leute, dass Großbuchstaben schwieriger zu lesen sind, und es kann den Anschein erwecken, als würden man SCHREIEN.',
      QA_UNDERLINE: 'Unterstrichener Text kann mit Links verwechselt werden. Erwäge die Verwendung eines anderen Stils wie <code>&lt;strong&gt;</code><strong>starke Wichtigkeit</strong><code>&lt;/strong&gt;</code> oder <code>&lt;em&gt;</code><em>Hervorhebung</em><code>&lt;/em&gt;</code>.',
      QA_SUBSCRIPT: 'Die Formatierungsoptionen für tiefgestellten und hochgestellten Text sollten nur verwendet werden, um die Textposition für typografische Konventionen oder Standards zu ändern. Es sollte <strong>nicht</strong> ausschließlich zu Präsentations- oder Erscheinungszwecken verwendet werden. Das Formatieren ganzer Sätze wirft Lesbarkeitsprobleme auf. Geeignete Anwendungsfälle wären die Anzeige von Exponenten, Ordnungszahlen wie 4<sup>th</sup> anstelle von 4 und chemischen Formeln (z. B. H<sub>2</sub>O).',
      QA_NESTED_COMPONENTS: 'Vermeiden Sie das Verschachteln interaktiver Layoutkomponenten, wie das Platzieren von Akkordeons in Tabs oder Tabs in Akkordeons. Dies kann die Navigation komplizieren, die kognitive Belastung erhöhen und dazu führen, dass Inhalte übersehen werden.',
      QA_JUSTIFY: 'Vermeiden Sie die Verwendung von Blocksatz, der sowohl am linken als auch am rechten Rand ausgerichtet ist. Dies kann für einige Menschen aufgrund der ungleichmäßigen Abstände zwischen den Wörtern schwer lesbar sein. Verwenden Sie linksbündigen Text für eine bessere Lesbarkeit.',
      QA_SMALL_TEXT: 'Kleiner Text ist schwieriger zu lesen, insbesondere für Menschen mit Sehbehinderungen. Um eine bessere Lesbarkeit zu gewährleisten, vermeiden Sie die Verwendung von Schriftgrößen, die kleiner als die Standardeinstellung sind.',

      // Shared
      ACC_NAME: '<strong {B}>Zugänglicher Name</strong> %(TEXT)',
      ACC_NAME_TIP: '<hr> <strong>Hinweis!</strong> Der "zugängliche Name" ist das endgültige Etikett, das an Personen kommuniziert wird, die Hilfstechnologien verwenden. Dies hilft ihnen, den Zweck des Links oder der Schaltfläche zu verstehen.',
      HIDDEN_FOCUSABLE: 'Der Link oder die Schaltfläche hat <code>aria-hidden=&quot;true&quot;</code>, ist jedoch weiterhin über die Tastatur fokussierbar. Wenn Sie beabsichtigen, einen doppelten Link oder eine Schaltfläche zu verstecken, fügen Sie auch <code>tabindex=&quot;-1&quot;</code> hinzu. Andernfalls sollte <code>aria-hidden=&quot;true&quot;</code> nicht bei fokussierbaren Elementen verwendet werden. <hr> Erfahren Sie mehr über das <a href="https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/Attributes/aria-hidden">aria-hidden-Attribut.</a>',

      // Developer
      DUPLICATE_ID: '<strong>Doppelte ID</strong> gefunden. Doppelte ID-Fehler verursachen bekanntermaßen Probleme für Hilfstechnologien, wenn man versucht, mit Inhalten zu interagieren. Bitte entferne oder ändere die folgende ID. <hr> <strong {B}>ID</strong> <strong {C}>#%(id)</strong>',
      UNCONTAINED_LI: 'Alle <code>&lt;li&gt;</code> Listenelemente müssen innerhalb von <code>&lt;ul&gt;</code> ungeordneten oder <code>&lt;ol&gt;</code> geordneten Elementen platziert werden. Diese Struktur hilft Bildschirmlesern, die Liste und ihre Elemente genau anzukündigen.',
      TABINDEX_ATTR: 'Das Element sollte kein <code>tabindex</code>-Attribut größer als 0 haben.',

      // Meta checks
      META_LANG: 'Seitensprache nicht angegeben! Bitte <a href="https://www.w3.org/International/questions/qa-html-language-declarations">deklariere die Sprache im HTML-Tag.</a>',
      META_TITLE: 'Seitentitel fehlt! Bitte gib einen <a href="https://developer.mozilla.org/en-US/docs/Web/HTML/Element/title">Seitentitel</a> an.',
      META_SCALABLE: 'Entfernen Sie den Parameter <code>user-scalable="no"</code> im <a href="https://developer.mozilla.org/en-US/docs/Web/HTML/Viewport_meta_tag">Viewport-Meta-Tag</a>, um das Zoomen zu ermöglichen.',
      META_MAX: 'Stellen Sie sicher, dass der Parameter <code>maximum-scale</code> im <a href="https://developer.mozilla.org/en-US/docs/Web/HTML/Viewport_meta_tag">Viewport-Meta-Tag</a> nicht kleiner als 2 ist.',
      META_REFRESH: 'Die Seite sollte nicht automatisch mithilfe eines Meta-Tags aktualisiert werden.',

      // Buttons
      BTN_EMPTY: 'Der Schaltfläche fehlt ein zugänglicher Name, der ihren Zweck beschreibt.',
      BTN_EMPTY_LABELLEDBY: 'Die Schaltfläche hat einen <code>aria-labelledby</code>-Wert, der leer ist oder nicht mit dem <code>id</code>-Wert eines anderen Elements auf der Seite übereinstimmt.',
      BTN: 'Schaltfläche',
      BTN_TIP: 'Erfahren Sie, wie Sie eine <a href="https://www.sarasoueidan.com/blog/accessible-icon-buttons/">zugängliche Schaltfläche</a> erstellen.',
      BTN_ROLE_IN_NAME: 'Fügen Sie das Wort „Schaltfläche“ nicht in den Namen einer Schaltfläche ein. Bildschirmlesegeräte geben bereits die Rolle eines Elements zusätzlich zu seinem Namen an.',
      LABEL_IN_NAME: 'Der sichtbare Text dieses Elements scheint sich vom zugänglichen Namen zu unterscheiden, was für Benutzer von Hilfstechnologien verwirrend sein kann. Bitte überprüfen: <hr> <strong {B}>Zugänglicher Name</strong> <strong {C}>%(TEXT)</strong>',

      // Tables
      TABLES_MISSING_HEADINGS: 'Fehlende Tabellenüberschriften! Barrierefreie Tabellen benötigen eine HTML-Auszeichnung, die Kopfzellen und Datenzellen kennzeichnet und ihre Beziehung zueinander definiert. Diese Informationen liefern den Kontext für Menschen, die Hilfsmittel verwenden. Tabellen sollten nur für tabellarische Daten verwendet werden. <hr> Erfahre mehr über <a href="https://www.w3.org/WAI/tutorials/tables/">barrierefreie Tabellen.</a>',
      TABLES_SEMANTIC_HEADING: 'Semantische Überschriften wie Überschrift 2 oder Überschrift 3 sollten nur für Abschnitte des Inhalts verwendet werden; <strong>not</strong> in HTML-Tabellen. Gebe Tabellenüberschriften stattdessen mit dem <code>&lt;th&gt;</code> Element an. <hr> Erfahre mehr über <a href="https://www.w3.org/WAI/tutorials/tables/">barrierefreie Tabellen.</a>',
      TABLES_EMPTY_HEADING: 'Leerer Tabellenkopf gefunden! Tabellenüberschriften sollten <strong>niemals</strong> leer sein. Es ist wichtig, Zeilen- und/oder Spaltenüberschriften zu benennen, um ihre Beziehung zu verdeutlichen. Diese Informationen bieten Menschen, die Hilfsmittel verwenden, einen Kontext. Bitte beachte, dass Tabellen nur für tabellarische Daten verwendet werden sollten. <hr> Erfahre mehr über <a href="https://www.w3.org/WAI/tutorials/tables/">barrierefreie Tabellen.</a>',

      // Contrast
      CONTRAST_ERROR: 'Der Text hat nicht genug Kontrast zum Hintergrund, was das Lesen erschwert.',
      CONTRAST_WARNING: 'Der Kontrast dieses Textes ist unbekannt und muss manuell überprüft werden. Stellen Sie sicher, dass Text und Hintergrund starke Kontrastfarben haben.',
      CONTRAST_ERROR_GRAPHIC: 'Die Grafik hat nicht genug Kontrast zum Hintergrund, was das Erkennen erschwert.',
      CONTRAST_WARNING_GRAPHIC: 'Der Kontrast dieser Grafik ist unbekannt und muss manuell überprüft werden. Stellen Sie sicher, dass die Grafik und der Hintergrund starke Kontrastfarben haben.',
      CONTRAST_OPACITY: 'Erhöhen Sie die Deckkraft für bessere Sichtbarkeit.',
      CONTRAST_APCA: 'Das ist nicht genug Kontrast für Text in beliebiger Größe. Erwägen Sie, diese Farb- und Textgrößenkombination zu verwenden?',
      CONTRAST_COLOR: 'Erwägen Sie, stattdessen diese Farbe zu verwenden?',
      CONTRAST_SIZE: 'Erwägen Sie, die Textgröße für diese Farbkombination zu vergrößern?',
      CONTRAST_PLACEHOLDER: 'Platzhaltertext in diesem Eingabefeld hat nicht genug Kontrast zum Hintergrund, was das Lesen erschwert.',
      CONTRAST_INPUT: 'Text in diesem Eingabefeld hat nicht genug Kontrast zum Hintergrund, was das Lesen erschwert.',
      CONTRAST: 'Kontrast',
      UNKNOWN: 'Unbekannt',
      LARGE_TEXT: 'Großer Text',
      BODY_TEXT: 'Fließtext',
      FG: 'Vordergrund',
      BG: 'Hintergrund',
      NON_TEXT: 'Nicht-Text',
    },
  };

  return de;

}));
