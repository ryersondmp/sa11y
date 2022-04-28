/*-----------------------------------------------------------------------
* Sa11y, the accessibility quality assurance assistant.    
* @version: 2.2.2      
* @language: Polish (translation by Stefan Wajda https://github.com/lepszyweb/tad)  
* @author: Development led by Adam Chaboryk, CPWA
* @acknowledgements: https://sa11y.netlify.app/acknowledgements/
* @license: https://github.com/ryersondmp/sa11y/blob/master/LICENSE.md
* Copyright (c) 2020 - 2022 Toronto Metropolitan University (formerly Ryerson University).
* The above copyright notice shall be included in all copies or substantial portions of the Software.
------------------------------------------------------------------------*/

//Tooltip formatting shortcuts.
const sa11yHr = `<hr aria-hidden='true' class='sa11y-hr'>`;
const sa11yNewTab = `<span class='sa11y-visually-hidden'>(Otwórz na nowej karcie)</span>`;
const sa11yLang = {

    // Main interface
    LANG_CODE: 'pl',
    MAIN_TOGGLE_LABEL: 'Testuj dostępność',
    CONTAINER_LABEL: 'Tester dostępności',
    ERROR: 'Błąd',
    WARNING: 'Ostrzeżenie', 
    GOOD: 'Dobrze',
    ON: 'Wł',
    OFF: 'Wył',
    ALERT_TEXT: 'Alert',
    ALERT_CLOSE: 'Zamknij',
    SHOW_OUTLINE: 'Pokaż konspekt',
    HIDE_OUTLINE: 'Ukryj konspekt',
    SHOW_SETTINGS: 'Pokaż ustawienia',
    HIDE_SETTINGS: 'Ukryj ustawienia',
    PAGE_OUTLINE: 'Konspekt strony',
    SETTINGS: 'Ustawienia',
    CONTRAST: 'Kontrast',
    FORM_LABELS: 'Etykiety formularzy',
    LINKS_ADVANCED: 'Łącza (zaawansowane)',
    DARK_MODE: 'Tryb ciemny',
    SHORTCUT_SCREEN_READER: 'Przejdź do problemu. Klawisze skrótu: lewy Option',
    SHORTCUT_TOOLTIP: 'Przejdź do problemu',

    // Alternative text module stop words
    SUSPICIOUS_ALT_STOPWORDS: ["obraz", "grafika", "zdjęcie", "rysunek", "fotografia", "foto", "image", "graphic", "picture", "photo"],
    PLACEHOLDER_ALT_STOPWORDS: [
        "alt",
        "obraz",
        "foto",
        "fotografia",
        "dekoracja",
        "przykładowy tekst",
        "tekst przykładowy",	
        "image",	
        "photo",
        "decorative",
        "photo",
        "placeholder",
        "placeholder image",
        "spacer",
        "."
    ],
    PARTIAL_ALT_STOPWORDS: [
        "kliknij",
        "kliknij tutaj",
        "kliknij tu",	
        "kliknij tutaj, aby dowiedzieć się więcej",
        "kliknij tu, aby dowiedzieć się więcej",
        "kliknij tutaj, aby dowiedzieć się więcej.",
        "kliknij tutaj, aby dowiedzieć się więcej >",
        "check out",
        "pobierz",
        "pobierz tutaj",
        "pobierz tutaj.",
        "dowiedz się",
        "dowiedz się więcej",
        "dowiedz się więcej.",
        "dowiedz się więcej >",
        "formularz",
        "tutaj",
        "tutaj.",
        "info",
        "informacja",
        "link",
        "czytaj",
        "czytaj więcej",
        "czytaj więcej.",
        "czytaj więcej >",
        "czytaj to",
        "wiecej",
        "czytaj tu",
        "to",
        "tę stronę",
        "tej stronie.",
        "tej stronie >",
        "tę witrynę",
        "tej witrynie.",
        "tej witrynie >",
        "zobacz",
        "zobacz naszą",
        "stronę",	
        "witrynę",
        "."
    ],
    WARNING_ALT_STOPWORDS: ['< ', ' >', 'kliknij tutaj'],
    NEW_WINDOW_PHRASES: [
        "zewnętrzny",
        "nowa karta",
        "nowe okno",
        "pop-up",
        "pop up"
    ],

    // Only some items in list would need to be translated.
    FILE_TYPE_PHRASES: ['document', 'dokument', 'spreadsheet', 'worksheet', 'install', 'video', 'pdf', 'doc', 'docx', 'word', 'mp3', 'ppt', 'text', 'pptx', 'powerpoint', 'txt', 'exe', 'dmg', 'rtf', 'windows', 'macos', 'csv', 'xls', 'xlsx', 'mp4', 'mov', 'avi', 'zip'],

    // Panel status
    PANEL_HEADING: `Testuj dostępność`,
    PANEL_STATUS_BOTH: (errorCount, warningCount) => `Błędy <span class="sa11y-panel-count sa11y-margin-right">${errorCount}</span> Ostrzeżenia <span class="sa11y-panel-count">${warningCount}</span>`,
    PANEL_STATUS_ERRORS: (errorCount) => `Błędy <span class="sa11y-panel-count">${errorCount}</span>`,
    PANEL_STATUS_WARNINGS: (warningCount) => `
    Ostrzeżenia <span class="sa11y-panel-count">${warningCount}</span>`,
    PANEL_STATUS_NONE: `Nie znaleziono błędów.`,
    PANEL_ICON_WARNINGS: (warningCount) => `${warningCount} <span class="sa11y-visually-hidden">ostrzeżeń do przeglądu.</span>`,
    PANEL_ICON_TOTAL: (totalCount) => `${totalCount} <span class="sa11y-visually-hidden">ogółem wykrytych problemów.</span>`,
    NOT_VISIBLE_ALERT: `Element, który próbujesz wyświetlić, nie jest widoczny; może być ukryty lub znajdować się wewnątrz akordeonu lub karty. Tutaj jest podgląd:`,
    
    // Error handling.
    ERROR_MISSING_ROOT_TARGET: (root) => `Sprawdzono dostępność całej strony, ponieważ obszar docelowy nie istnieje: <span class="sa11y-kbd">${root}</span>`,

    // Readability
    LANG_READABILITY: 'Czytelność',
    LANG_AVG_SENTENCE: 'Średnio słów w zdaniu:',
    LANG_COMPLEX_WORDS: 'Trudne słowa:',
    LANG_TOTAL_WORDS: 'Słowa:',
    LANG_VERY_DIFFICULT: 'Bardzo trudne',
    LANG_DIFFICULT: 'Trudne',
    LANG_FAIRLY_DIFFICULT: 'Dość trudne',
    LANG_GOOD: 'Dobrze',

    //Headings
    HEADING_NON_CONSECUTIVE_LEVEL: (prevLevel, level) =>
        `Niespójny poziom nagłówka. Zastosowane poziomy nie następują po sobie. Nagłówki nigdy nie powinny pomijać poziomów np. od <strong>Nagłówek ${prevLevel}</strong> do <strong class='sa11y-red-text'>Nagłówek ${level}</strong>.`,

    HEADING_EMPTY: (level) =>
        `Znaleziono pusty nagłówek! Aby to naprawić, usuń tę linię lub zmień jej format z <span class='sa11y-red-text sa11y-bold'>Nagłówek ${level}</span> na <span class='sa11y-bold'>zwykły tekst</span> lub <span class='sa11y-bold'>akapit</span>.`,

    HEADING_LONG: (headingLength) =>
        `Nagłówek jest zbyt długi! Nagłówki służą do organizowania treści i przekazywania struktury. Powinny być krótkie, jasne, opisowe i niepowtarzalne. Pisz nagłówki nie dłuższe niż 160 znaków (nie więcej niż zdanie).
        ${sa11yHr}
        Liczba znaków: <span class='sa11y-bold sa11y-red-text'>${headingLength}</span>.`,

    HEADING_FIRST: 
        `Pierwszym nagłówkiem na stronie powinien być zwykle Nagłówek H1 lub Nagłówek H2. Nagłówek H1 jest głównym nagłówkiem opisującym ogólny cel strony i powinien być początkiem obszaru treści głównej. Dowiedz się więcej o <a href='https://www.w3.org/WAI/tutorials/page-structure/headings/' target='_blank'>Strukturze nagłówków. ${sa11yNewTab}</a>`,

    HEADING_MISSING_ONE: 
        `Brakuje nagłówka H1. Nagłówek H1 jest głównym nagłówkiem opisującym ogólny cel strony i powinien być początkiem obszaru treści głównej. Dowiedz się więcej o <a href='https://www.w3.org/WAI/tutorials/page-structure/headings/' target='_blank'>Strukturze nagłówków. ${sa11yNewTab}</a>`,

    HEADING_EMPTY_WITH_IMAGE: (level) =>
        `Nagłówek nie ma tekstu, ale zawiera obrazek. Jeśli to nie jest nagłówek, zmień jego format z <span class='sa11y-red-text sa11y-bold'>Nagłówek H${level}</span> na <span class='sa11y-bold'>zwykły tekst</span> lub <span class='sa11y-bold'>akapit</span>. W przeciwnym razie, dodaj do obrazu tekst alt, jeśli nie jest on ozdobny.`,

    PANEL_HEADING_MISSING_ONE: 
        `Brak Nagłówka 1!`,

    //Links
    LINK_EMPTY: 
        `Puste łącze bez żadnego tekstu. Usuń je!`,

    LINK_EMPTY_LINK_NO_LABEL: 
        `Łącze nie ma opisowego tekstu, który jest widoczny dla czytników ekranu i innych technologii wspomagających. Aby naprawić:
        <ul>
            <li>Dodaj zwięzły tekst, który opisuje, dokąd prowadzi łącze.</li>
            <li>Jeśli łączem jest <a href='https://a11y-101.com/development/icons-and-links' target='_blank'>ikona lub SVG, ${sa11yNewTab}</a> prawdopodobnie brakuje mu opisowej etykiety.</li>
            <li>Jeśli uważasz, że to łącze jest błędem spowodowanym błędem kopiuj/wklej, rozważ usunięcie go.</li>
        </ul>`,

    LINK_LABEL: (linkText) =>
        `<strong>Etykieta łącza:</strong> ${linkText}`,

    LINK_STOPWORD: (error) =>
        `Tekst łącza może nie być wystarczająco opisowy w kontekście: <span class='sa11y-red-text sa11y-bold'>${error}</span>
        ${sa11yHr}
        <span class='sa11y-bold'>Porada!</span> Tekst łącza powinien być zawsze jasny, unikalny i znaczący. Unikaj typowych słów takich jak &quot;kliknij tutaj&quot; lub &quot;czytaj więcej&quot;.`,

    LINK_BEST_PRACTICES: (error) =>
        `Rozważ zastąpienie tekstu łącza: <span class='sa11y-red-text sa11y-bold'>${error}</span>
        ${sa11yHr}
        <ul>
            <li>&bdquo;Kliknij tutaj&rdquo; skupia się na mechanice myszy, podczas gdy wiele osób nie używa myszy lub może przeglądać tę stronę na urządzeniu mobilnym. Rozważ użycie innego czasownika, który odnosi się do zadania.</li>
            <li>Unikaj używania symboli HTML jako wezwań do działania, chyba że są one ukryte dla technologii wspomagających.</li>
        </ul>`,

    LINK_URL: () =>
        `Dłuższe, mniej zrozumiałe adresy URL używane jako tekst odnośnika mogą być trudne do odsłuchania za pomocą technologii wspomagającej. W&nbsp;większości przypadków zamiast adresu URL lepiej jest używać tekstu czytelnego dla człowieka. Krótkie adresy URL (takie jak głównej strony witryny) są w porządku.
        ${sa11yHr}
        <span class='sa11y-bold'>Porada!</span> Tekst łącza powinien być zawsze jasny, unikalny i znaczący, aby mógł być zrozumiany bez kontekstu.`,

    // Links advanced
    NEW_TAB_WARNING:
        `Łącze otwiera się na nowej karcie lub w oknie bez ostrzeżenia. Może to być dezorientujące, szczególnie dla osób, które mają problemy z&nbsp;odbiorem treści wizualnych. Ponadto, nie zawsze dobrym zwyczajem jest kontrolowanie czyichś doświadczeń lub podejmowanie decyzji za kogoś. Wskaż w tekście łącza, że łącze otwiera się w nowym oknie.
        ${sa11yHr}
        <span class='sa11y-bold'>Porada!</span> Poznaj najlepsze praktyki: <a href='https://www.nngroup.com/articles/new-browser-windows-and-tabs/'>otwieranie łączy w nowych oknach i kartach przeglądarki.</a>`,

    FILE_TYPE_WARNING:
        `Łącze wskazuje  bez ostrzeżenia na plik PDF lub plik do pobrania (np. MP3, zip, doc). Wskaż typ pliku w tekście łącza. Jeśli jest to duży plik, rozważ podanie jego rozmiaru.
        ${sa11yHr}
        <span class='sa11y-bold'>Przykład:</span> Raport końcowy (PDF, 3MB)`,

    LINK_IDENTICAL_NAME: (linkText) =>
        `Łącze ma identyczny tekst jak inne łącze, choć wskazuje na inną stronę. Wiele łączy z takim samym tekstem może powodować zamieszanie u osób korzystających z czytników ekranu.
        ${sa11yHr}
        Rozważ nadanie poniższemu łączu bardziej opisowego charakteru, aby odróżnić je od innych łączy: <span class='sa11y-red-text sa11y-bold'>${linkText}</span>`,

    // Images
    MISSING_ALT_LINK_BUT_HAS_TEXT_MESSAGE: 
        `Obraz jest używany razem z sąsiadującym tekstem jako łącze. Obraz powinien być oznaczony jako dekoracyjny albo atrybut alt obrazu powinien być pusty.`,

    MISSING_ALT_LINK_MESSAGE: 
        `Obraz jest używany jako łącze, ale brakuje tekstu alternatywnego! Dodaj tekst alternatywny, który mówi, dokąd prowadzi łącze.`,

    MISSING_ALT_MESSAGE: 
        `Brak tekstu alternatywnego! Jeśli obraz przekazuje historię, nastrój lub ważne informacje - przedstaw je w tekście alternatywnym.`,

    LINK_IMAGE_BAD_ALT_MESSAGE: (altText, error) =>
        `W tekście alt znaleziono rozszerzenie nazwy pliku. Upewnij się, że tekst alternatywny opisuje miejsce docelowe łącza, a nie treść lub wygląd obrazu. Usuń wyraz(y): <span class='sa11y-red-text sa11y-bold'>${error}</span>.
        ${sa11yHr}
        <span class='sa11y-bold'>Tekst alternatywny:</span> ${altText}`,

    LINK_IMAGE_PLACEHOLDER_ALT_MESSAGE: (altText) =>
        `Znaleziono nieopisowy lub zastępczy tekst alt w obrazie będącym łączem. Upewnij się, że tekst alternatywny opisuje miejsce docelowe łącza, a nie treść lub wygląd obrazu. Zastąp następujący tekst alt: <span class='sa11y-bold sa11y-red-text'>${altText}</span>.`,

    LINK_IMAGE_SUS_ALT_MESSAGE: (altText, error) =>
        `Technologie wspomagające już wskazują, że jest to obraz, więc &quot;<span class='sa11y-red-text sa11y-bold'>${error}</span>&quot; lub &quot;${error} z&quot; mogą być zbędne. Upewnij się, że tekst alternatywny opisuje miejsce docelowe łącza, a nie treść lub wygląd obrazu.
        ${sa11yHr} 
        <span class='sa11y-bold'>Tekst alternatywny:</span> ${altText}`,

    LINK_ALT_HAS_BAD_WORD_MESSAGE: (altText, error) =>
        `W tekście alt znaleziono rozszerzenie nazwy pliku. Upewnij się, że tekst alternatywny opisuje miejsce docelowe łącza, a nie treść lub wygląd obrazu. Usuń wyraz(y): <span class='sa11y-red-text sa11y-bold'>${error}</span>.
        ${sa11yHr}
        <span class='sa11y-bold'>Tekst alternatywny:</span> ${altText}`,

    ALT_PLACEHOLDER_MESSAGE: (altText) =>
        `Znaleziono nieopisowy lub zastępczy tekst alt. Zamień poniższy tekst alt na coś bardziej znaczącego: <span class='sa11y-bold sa11y-red-text'>${altText}</span>.`,

    ALT_HAS_SUS_WORD: (altText, error) =>
        `Technologie wspomagające już wskazują, że jest to obraz, więc &quot;<span class='sa11y-red-text sa11y-bold'>${error}</span>&quot; lub &quot;${error} z&quot; mogą być zbędne.
        ${sa11yHr}
        <span class='sa11y-bold'>Tekst alternatywny:</span> ${altText}`,

    LINK_IMAGE_ARIA_HIDDEN: 
        `Łącze wokół obrazu ma <span class='sa11y-kbd'>aria-hidden=&quot;true&quot;</span>, ale nadal można na nim ustawić fokus klawiatury. Jeśli chcesz ukryć zbędne lub zduplikowane łącze, dodaj również <span class='sa11y-kbd'>tabindex=&quot;-1&quot;</span>`,

    LINK_IMAGE_NO_ALT_TEXT: 
        `Obraz w łączu jest oznaczony jako dekoracyjny i nie ma tekstu łącza. Dodaj do obrazu tekst alt, który opisze miejsce docelowe łącza.`,

    LINK_IMAGE_HAS_TEXT: 
        `Obraz jest oznaczony jako dekoracyjny, ale łącze używa otaczającego go tekstu jako etykiety opisowej.`,

    LINK_IMAGE_LONG_ALT: (altText, altLength) =>
        `Tekst alternatywny opisujący obraz będący łączem jest <span class='sa11y-bold'>zbyt długi</span>. 
        Tekst alternatywny na obrazach bedących łączami powinien przedstawiać, dokąd prowadzi łącze, a nie dosłownie opisywać obraz. 
        <span class='sa11y-bold'>Rozważ użycie jako tekstu alternatywnego tytułu strony, do którego łączy obraz.</span> 
        ${sa11yHr} 
        <span class='sa11y-bold'>Tekst alternatywny (<span class='sa11y-red-text sa11y-bold'>${altLength}</span> znaków):</span> ${altText}`,

    LINK_IMAGE_ALT_WARNING: (altText) =>
        `Obraz będący łączem ma tekst alternatywny, ale upewnij się, że tekst alternatywny wskazuje na stronę docelową. 
        <span class='sa11y-bold'>Rozważ użycie jako tekstu alternatywnego tytułu strony, do którego łączy obraz.</span>
        Czy tekst alternatywny mówi, dokąd prowadzi łącze? 
        ${sa11yHr}
        <span class='sa11y-bold'>Tekst alternatywny:</span> ${altText}`,

    LINK_IMAGE_ALT_AND_TEXT_WARNING: (altText) =>
        `Łącze graficzne ma <span class='sa11y-bold'>zarówno tekst alternatywny, jak i sąsiadujący tekst łącza.</span> Jeśli ten obraz jest dekoracyjny i jest używany w funkcji łącza do innej strony, należy rozważyć oznaczenie obrazu jako dekoracyjnego (pusty alt) - sąsiadujący tekst łącza powinien wystarczyć. 
        ${sa11yHr}
        <span class='sa11y-bold'>Tekst alternatywny:</span> ${altText}`,

    IMAGE_FIGURE_DECORATIVE: 
        `Obraz jest oznaczony jako <strong>dekoracyjny</strong> i zostanie zignorowany przez technologię wspomagającą.
        ${sa11yHr} 
        Mimo że podano <strong>podpis</strong>, obraz powinien w większości przypadków zawierać również tekst alternatywny. 
        <ul>
            <li>Tekst alternatywny powinien zawierać zwięzły opis tego, co znajduje się na obrazku.
            </li>
            <li>Podpis powinien zwykle zawierać kontekst, aby powiązać obraz z otaczającą zawartością lub zwracać uwagę na konkretną informację.</li>
        </ul>
        Ucz się więcej: <a href='https://thoughtbot.com/blog/alt-vs-figcaption#the-figcaption-element' target='_blank' rel='noopener noreferrer'>alternatywny kontra podpis graficzny. ${sa11yNewTab}</a>`,

    IMAGE_FIGURE_DUPLICATE_ALT: (altText) =>  
        `Nie używaj dokładnie tych samych słów dla tekstu alternatywnego i podpisu. Czytniki ekranu podadzą informację dwukrotnie.
        <ul>
            <li>Tekst alternatywny powinien zawierać zwięzły opis tego, co znajduje się na obrazku.
            </li>
            <li>Podpis powinien zwykle zawierać kontekst, aby powiązać obraz z otaczającą zawartością lub zwracać uwagę na konkretną informację.</li>
        </ul>
        Ucz się więcej: <a href='https://thoughtbot.com/blog/alt-vs-figcaption#the-figcaption-element' target='_blank' rel='noopener noreferrer'>alternatywny kontra podpis graficzny. ${sa11yNewTab}</a>
        ${sa11yHr}
        <span class='sa11y-bold'>Tekst alternatywny:</span> ${altText}`,

    IMAGE_DECORATIVE: 
        `Obraz jest oznaczony <span class='sa11y-bold'>dekoracyjny</span> i zostanie zignorowany przez technologię wspomagającą. Jeśli obraz przekazuje jakąś historię, nastrój lub ważną informację - dodaj tekst alt.`,

    IMAGE_ALT_TOO_LONG: (altText, altLength) =>
        `Tekst alternatywny obrazu jest <span class='sa11y-bold'>zbyt długi</span>. Tekst alternatywny powinien być zwięzły, ale znaczący jak <em>tweet</em> (około 100 znaków). 
        Jeśli jest to złożony obraz lub wykres, należy rozważyć umieszczenie długiego opisu obrazu w tekście poniżej lub w akordeonie. 
        ${sa11yHr} 
        <span class='sa11y-bold'>Tekst alternatywny (<span class='sa11y-red-text sa11y-bold'>${altLength}</span> znaków):</span> ${altText}`,

    IMAGE_PASS: (altText) =>
        `<span class='sa11y-bold'>Tekst alternatywny:</span> ${altText}`,

    //Labels
    LABELS_MISSING_IMAGE_INPUT_MESSAGE: 
        `Przycisk graficzny nie ma tekstu alternatywneego. Dodaj tekst alt, aby zapewnić dostępną nazwę. Na przykład: <em>Szukaj</em> lub <em>Wyślij</em>.`,

    LABELS_INPUT_RESET_MESSAGE: 
        `Przyciski resetowania <span class='sa11y-bold'>nie powinny</span> być używane, chyba że są specjalnie potrzebne, ponieważ łatwo je aktywować przez pomyłkę.
        ${sa11yHr} 
        <span class='sa11y-bold'>Porada!</span> Dowiedz się, dlaczego <a href='https://www.nngroup.com/articles/reset-and-cancel-buttons/' target='_blank'>Przyciski Resetuj i Anuluj powodują problemy z użytecznością. ${sa11yNewTab}</a>`,

    LABELS_ARIA_LABEL_INPUT_MESSAGE: (ariaLabel) =>
        `Pole danych ma dostępną nazwę (etykietę), ale upewnij się, że etykieta jest również widoczna. 
        ${sa11yHr} 
        Dostępna nazwa tego pola to: <span class='sa11y-bold'>${ariaLabel}</span>`,

    LABELS_NO_FOR_ATTRIBUTE_MESSAGE: (id) =>
        `Z tym polem input nie jest skojarzona żadna etykieta (label). Dodaj atrybut <span class='sa11y-kbd'>for</span> do etykiety z wartością <span class='sa11y-kbd'>id</span>  pasującą do <span class='sa11y-kbd'>id</span> tego pola. 
        ${sa11yHr} 
        ID tego pola to: <span class='sa11y-bold'>id=&#34;${t}&#34;</span>`,

    LABELS_MISSING_LABEL_MESSAGE: 
        `Z tym polem input nie jest skojarzona żadna etykieta (label). Dodaj do tego pola danych <span class='sa11y-kbd'>id</span> i dodaj pasujący atrybut <span class='sa11y-kbd'>for</span> do etykiety.`,

    // Embedded content
    EMBED_VIDEO: 
        `Upewnij się, że <span class='sa11y-bold'>wszystkie filmy mają napisy rozszerzone.</span> Zapewnianie napisów rozszerzonych dla wszystkich treści audio i wideo jest obowiązkowym wymogiem poziomu A. Napisy mają na celu wspieranie osób Głuchych i słabosłyszących.`,

    EMBED_AUDIO: 
        `Upewnij się, że istnieje <span class='sa11y-bold'>transkrypcja dla wszystkich nagrań dźwiękowych.</span> Zapewnianie transkrypcji treści audio jest obowiązkowym wymogiem poziomu A. Transkrypcje mają na celu wspieranie osób Głuchych i słabosłyszących, ale każdy może z nich skorzystać. Rozważ umieszczenie transkrypcji poniżej lub w panelu akordeonowym.`,

    EMBED_DATA_VIZ: 
        `Widżety wizualizacji danych, takie jak ten, są często problematyczne dla osób, które używają klawiatury lub czytnika ekranu do nawigacji, a także mogą stanowić znaczące trudności dla osób słabo widzących lub nie rozróżniających kolorów. Zapewnij te same infromacje w alternatywnym formacie (tekst lub tabela) pod widżetem.
        ${sa11yHr}
        Dowiedz się więcej o <a href='https://www.w3.org/WAI/tutorials/images/complex/' target='_blank'>obrazach złożonych. ${sa11yNewTab}</a>`,

    EMBED_TWITTER: 
        `Domyślna oś czasu Twittera może powodować problemy z dostępnością dla użytkowników klawiatury. Ponadto, przewijanie w linii osi czasu Twittera może powodować problemy z użytecznością na urządzeniach mobilnych. Zaleca się dodanie następujących atrybutów danych do kodu osadzającego oś czasu. 
        ${sa11yHr}
        <span class='sa11y-bold'>Zalecany kod:</span>
        <ul>
            <li>Dodaj <span class='sa11y-kbd'>data-tweet-limit=&#34;2&#34;</span>, aby ograniczyć ilość tweetów.</li>
            <li>Dodaj <span class='sa11y-kbd'>data-chrome=&#34;nofooter noheader&#34;</span>, aby usunąć nagłówek i stopkę widżetu.</li>
        </ul>`,

    EMBED_MISSING_TITLE: 
        `Osadzona zawartość wymaga dostępnej nazwy, która opisuje jej treść. Dodaj unikalny <span class='sa11y-kbd'>title</span> lub atrybutu <span class='sa11y-kbd'>aria-label</span> do elementu <span class='sa11y-kbd'>iframe</span>. Dowiedz się więcej o <a href='https://dequeuniversity.com/tips/provide-iframe-titles' target='_blank'>iFrame. ${sa11yNewTab}</a>`,

    EMBED_GENERAL_WARNING: 
        `Nie można sprawdzić treści osadzonej. Upewnij się, że obrazy mają tekst alt, filmy mają napisy rozszerzone, tekst ma odpowiedni kontrast, a elementy interaktywne są <a href='https://webaim.org/techniques/keyboard/' target='_blank'>dostępne z klawiatury. ${sa11yNewTab}</a>`,

    // Quality assurance
    QA_BAD_LINK: (el) =>
        `Podejrzane łącze. Łącze wydaje się wskazywać środowisko programistyczne. 
        ${sa11yHr}
        Łącze wskazuje na:
        <br>
        <span class='sa11y-bold sa11y-red-text'>${el}</span>`,

    QA_BAD_ITALICS: 
        `Znaczniki pogrubienia i kursywy mają znaczenie semantyczne i <span class='sa11y-bold'>nie powinny</span> być używane do wyróżniania całych akapitów. Pogrubiony tekst powinien być używany w celu <span class='sa11y-bold'>silnego podkreślenia słowa lub frazy</span>. Kursywa powinna być używana do wyróżnienia nazw własnych (np. tytułów książek i artykułów), wyrazów obcych, cytatów. Długie cytaty powinny być sformatowane jako blockquote.`,

    QA_PDF: (pdfCount) =>
        `Pliki PDF są uważane za treści internetowe i muszą być również dostępne. Pliki PDF często powodują problemy dla osób korzystających z&nbsp;czytników ekranu (brakujące znaczniki strukturalne lub etykiety pól formularzy) oraz dla osób słabowidzących (tekst nie jest ponownie wyświetlany po powiększeniu).
        <ul>
            <li>Jeśli jest to formularz, rozważ użycie dostępnego formularza HTML jako alternatywy</li>
            <li>Jeśli jest to dokument, rozważ przekonwertowanie go na stronę internetową.</li>
        </ul>
        W przeciwnym razie <span class='sa11y-bold sa11y-red-text'>${pdfCount}</span> <a href='https://www.adobe.com/accessibility/products/acrobat/using-acrobat-pro-accessibility-checker.html' target='_blank'>sprawdź plik pod kątem dostępności w programie Acrobat DC. ${sa11yNewTab}</a>`,

    QA_PAGE_LANGUAGE: 
        `Język strony nie zadeklarowany! <a href='https://www.w3.org/International/questions/qa-html-language-declarations' target='_blank'>Zadeklaruj język w znaczniku HTML. ${sa11yNewTab}</a>`,

    QA_PAGE_TITLE: 
        `Brak tytułu strony! Podaj <a href='https://developer.mozilla.org/en-US/docs/Web/HTML/Element/title' target='_blank' rel='noopener noreferrer'>tytuł strony. ${sa11yNewTab}</a>`,

    QA_BLOCKQUOTE_MESSAGE: (bqHeadingText) =>
        `Czy to jest nagłówek? <span class='sa11y-bold sa11y-red-text'>${bqHeadingText}</span> 
        ${sa11yHr}
        Element blockquote powinien być używany tylko do cytatów. Jeśli ma to być nagłówek, zmień ten blockquote na nagłówek semantyczny (np. Nagłówek H2 lub Nagłówek H3).`,

    TABLES_MISSING_HEADINGS: 
        `Brak nagłówków tabeli! Dostępne tabele wymagają znaczników HTML, które wskazują komórki nagłówków i komórki danych, które definiują ich relację. Informacje te zapewniają kontekst osobom korzystającym z technologii wspomagających. Tabele powinny być używane tylko dla danych tabelarycznych.
        ${sa11yHr}
        Dowiedz się więcej o <a href='https://www.w3.org/WAI/tutorials/tables/' target='_blank'>dostępnych tabelach. ${sa11yNewTab}</a>`,

    TABLES_SEMANTIC_HEADING: 
        `Nagłówki semantyczne, takie jak nagłówek H2 lub nagłówek H3, powinny być używane tylko w odniesieniu do sekcji treści; <span class='sa11y-bold'>nie</span> w tabelach HTML. Zamiast tego należy wskazać nagłówki tabeli przy użyciu elementu <span class='sa11y-bold'>th</span>.
        ${sa11yHr}
        Dowiedz się więcej o <a href='https://www.w3.org/WAI/tutorials/tables/' target='_blank'>dostępnych tabelach. ${sa11yNewTab}</a>`,

    TABLES_EMPTY_HEADING: 
        `Wykryto pusty nagłówek tabeli! Nagłówki tabel <em>nigdy</em> nie powinny być puste. Ważne jest, aby wyznaczyć nagłówki wierszy i/lub kolumn, aby przekazać ich relację. Informacje te zapewniają kontekst osobom korzystającym z technologii wspomagających. Należy pamiętać, że tabele powinny być używane tylko dla danych tabelarycznych.
        ${sa11yHr}
        Dowiedz się więcej o <a href='https://www.w3.org/WAI/tutorials/tables/' target='_blank'>dostępnych tabelach. ${sa11yNewTab}</a>`,

    QA_FAKE_HEADING: (boldtext) =>
        `Czy to jest nagłówek? <span class='sa11y-bold sa11y-red-text'>${boldtext}</span>
        ${sa11yHr}
        Wiersz pogrubionego tekstu może wyglądać jak nagłówek, ale osoba korzystająca z czytnika ekranu nie może stwierdzić, że jest on istotny lub przejść do jego treści. Pogrubiony tekst nigdy nie powinien zastępować nagłówków semantycznych (od Nagłówka H2 do Nagłówka H6).`,

    QA_SHOULD_BE_LIST: (firstPrefix) =>
        `Czy próbujesz utworzyć listę? Wykryto możliwe elementy listy: <span class='sa11y-bold sa11y-red-text'>${firstPrefix}</span>
        ${sa11yHr} 
        Upewnij się, że używasz list semantycznych, zamiast stosowania znaków punktowania (np. myślników) lub liczb. Podczas korzystania z list semantycznych technologie wspomagające są w stanie przekazać takie informacje, jak ogólna liczba elementów i względna pozycja każdego elementu na liście. Dowiedz się więcej o <a href='https://www.w3.org/WAI/tutorials/page-structure/content/#lists' target='_blank'>semantycznych listach. ${sa11yNewTab}</a>`,

    QA_UPPERCASE_WARNING: 
        `Wykryto WSZYSTKIE WIELKIE LITERY. Niektóre czytniki ekranu interpretują cały tekst wielkimi literami jako akronim i będą czytać każdą literę odrębnie. Ponadto, wszystkie wielkie litery są trudniejsze do odczytania i sprawiają wrażenie KRZYKU.`,

    QA_DUPLICATE_ID: (id) =>
        `Znaleziono <strong>duplikat ID</strong>. Wiadomo, że błędy zduplikowanego ID powodują problemy dla technologii pomocniczych podczas próby interakcji z treścią.
        ${sa11yHr} 
        Usuń lub zmień następujący ID: <strong class='sa11y-red-text'>${id}</strong>`,

    QA_TEXT_UNDERLINE_WARNING: 
        `Podkreślony tekst można pomylić z linkami. Rozważ użycie innego stylu, takiego jak &lt;strong&gt;<strong>silne znaczenie</strong>&lt;/strong&gt; lub &lt;em&gt;<em>nacisk</em>&lt;/em&gt;.`,

    CONTRAST_ERROR: (cratio, nodetext) =>
        `Ten tekst nie ma wystarczającego kontrastu z tłem 
        Współczynnik kontrastu powinien wynosić co najmniej 4,5:1 dla zwykłego tekstu i 3:1 dla dużego tekstu. 
        ${sa11yHr} 
        Współczynnik kontrastu wynosi <span class='sa11y-red-text sa11y-bold'>${cratio}</span> dla następującego tekstu: 
        <span class='sa11y-bold sa11y-red-text'>${nodetext}</span>`,

    CONTRAST_WARNING: (nodetext) =>
        `Kontrast tego tekstu jest nieznany i wymaga ręcznego przeglądu. Upewnij się, że tekst i tło mają silne kontrastujące kolory. Współczynnik kontrastu powinien wynosić co najmniej 4,5:1 dla zwykłego tekstu i 3:1 dla dużego tekstu. 
        ${sa11yHr}Sprawdź kontrast następującego tekstu:
        <br>
        <span class='sa11y-bold'>${nodetext}</span>`,

    CONTRAST_INPUT_ERROR: (cratio) =>
        `Text within this input does not have enough contrast with the background. The contrast ratio should be at least 4.5:1 for normal text and 3:1 for large text. 
        ${sa11yHr} 
        Contrast ratio: <strong class='sa11y-red-text'>${cratio}</strong>`,

    READABILITY_NO_P_OR_LI_MESSAGE: 
        `Nie można oszacować wyników testu czytelności. Nie znaleziono treści w akapitach <span class="sa11y-badge">&lt;p&gt;</span> lub listach <span class="sa11y-badge">&lt;li&gt;</span>`,

    READABILITY_NOT_ENOUGH_CONTENT_MESSAGE: 
        `Za mało treści, aby ocenić czytelność.`
};