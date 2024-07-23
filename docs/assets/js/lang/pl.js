
/*!
  * Sa11y, the accessibility quality assurance assistant.
  * @version 3.2.2
  * @author Adam Chaboryk
  * @license GPL-2.0-or-later
  * @copyright © 2020 - 2024 Toronto Metropolitan University.
  * @contact adam.chaboryk@torontomu.ca
  * GitHub: git+https://github.com/ryersondmp/sa11y.git | Website: https://sa11y.netlify.app
  * For all acknowledgements, please visit: https://sa11y.netlify.app/acknowledgements/
  * The above copyright notice shall be included in all copies or substantial portions of the Software.
**/
var pl = {
  // Polish
  strings: {
    LANG_CODE: 'pl',
    MAIN_TOGGLE_LABEL: 'Testuj dostępność',
    CONTAINER_LABEL: 'Tester dostępności',
    ERROR: 'Błąd',
    ERRORS: 'Błędy',
    WARNING: 'Ostrzeżenie',
    WARNINGS: 'Ostrzeżenia',
    GOOD: 'Dobrze',
    ON: 'Wł',
    OFF: 'Wył',
    ALERT_TEXT: 'Alert',
    ALERT_CLOSE: 'Zamknij',
    OUTLINE: 'Szkic',
    TITLE: 'Tytuł',
    ALT: 'ALT',
    IMAGES: 'Obrazy',
    EDIT: 'Edytuj',
    IMAGES_NOT_FOUND: 'Nie znaleziono obrazów.',
    DECORATIVE: 'Dekoracyjny',
    MISSING: 'Brakujący',
    PAGE_ISSUES: 'Problemy ze stroną',
    SETTINGS: 'Ustawienia',
    CONTRAST: 'Kontrast',
    FORM_LABELS: 'Etykiety formularzy',
    LINKS_ADVANCED: 'Łącza (zaawansowane)',
    DARK_MODE: 'Tryb ciemny',
    SHORTCUT_SCREEN_READER: 'Przejdź do problemu. Klawisze skrótu: lewy Option',
    SHORTCUT_TOOLTIP: 'Przejdź do problemu',
    NEW_TAB: 'Otwórz na nowej karcie',
    LINKED: 'Połączony',
    PANEL_HEADING: 'Testuj dostępność',
    PANEL_STATUS_NONE: 'Nie znaleziono błędów.',
    PANEL_ICON_WARNINGS: 'ostrzeżeń do przeglądu.',
    PANEL_ICON_TOTAL: 'ogółem wykrytych problemów.',
    NOT_VISIBLE_ALERT: 'Element, który próbujesz wyświetlić, nie jest widoczny; może być ukryty lub znajdować się wewnątrz akordeonu lub karty. Tutaj jest podgląd:',
    ERROR_MISSING_ROOT_TARGET: 'Sprawdzono dostępność całej strony, ponieważ obszar docelowy nie istnieje: <code>%(root)</code>',
    HEADING_NOT_VISIBLE_ALERT: 'Nagłówek nie jest widoczny; może być ukryty lub wewnątrz komponentu akordeonu lub tabulatora.',
    SKIP_TO_PAGE_ISSUES: 'Przejdź do problemów ze stroną',
    CONSOLE_ERROR_MESSAGE: 'Przepraszamy, ale wystąpił problem z narzędziem do sprawdzania ułatwień dostępu na tej stronie. Czy możesz <a href="%(link)">zgłosić to za pomocą tego formularza</a> lub na <a href="%(link)">GitHub</a>?',

    // Dismiss
    PANEL_DISMISS_BUTTON: 'Pokaż %(dismissCount) zignorowanych ostrzeżeń',
    DISMISS: 'Ignoruj',
    DISMISSED: 'Zignorowano ostrzeżenia',
    DISMISS_REMINDER: 'Proszę zauważyć, że ostrzeżenia są ignorowane tylko <strong>tymczasowo.</strong> Wyczyszczenie historii przeglądarki i plików cookie przywróci wszystkie wcześniej ignorowane ostrzeżenia na wszystkich stronach.',

    // Export
    DATE: 'Data',
    PAGE_TITLE: 'Tytuł strony',
    RESULTS: 'Wyniki',
    EXPORT_RESULTS: 'Eksportuj wyniki',
    GENERATED: 'Wyniki wygenerowane za pomocą %(tool).',
    PREVIEW: 'Podgląd',
    ELEMENT: 'Element',
    PATH: 'Ścieżka',

    // Color filters
    COLOUR_FILTER: 'Filtr kolorów',
    PROTANOPIA: 'Protanopia',
    DEUTERANOPIA: 'Deuteranopia',
    TRITANOPIA: 'Tritanopia',
    MONOCHROMACY: 'Monochromatyzm',
    COLOUR_FILTER_MESSAGE: 'Sprawdź elementy, które są trudne do zauważenia lub odróżnienia od innych kolorów.',
    RED_EYE: 'Ślepota na kolor czerwony.',
    GREEN_EYE: 'Ślepota na kolor zielony.',
    BLUE_EYE: 'Ślepota na kolor niebieski.',
    MONO_EYE: 'Ślepota na kolor czerwony, zielony i niebieski.',
    COLOUR_FILTER_HIGH_CONTRAST_MESSAGE: 'Filtry kolorów nie działają w trybie wysokiego kontrastu.',

    // Alternative text module stop words
    SUSPICIOUS_ALT_STOPWORDS: ['obraz', 'grafika', 'zdjęcie', 'rysunek', 'fotografia', 'foto', 'image', 'graphic', 'picture', 'photo'],
    PLACEHOLDER_ALT_STOPWORDS: [
      'alt',
      'obraz',
      'foto',
      'fotografia',
      'dekoracja',
      'przykładowy tekst',
      'tekst przykładowy',
      'image',
      'photo',
      'decorative',
      'placeholder',
      'placeholder image',
      'spacer',
    ],
    PARTIAL_ALT_STOPWORDS: [
      'kliknij',
      'kliknij tutaj',
      'kliknij tu',
      'kliknij tutaj, aby dowiedzieć się więcej',
      'kliknij tu, aby dowiedzieć się więcej',
      'check out',
      'pobierz',
      'pobierz tutaj',
      'dowiedz się',
      'dowiedz się więcej',
      'formularz',
      'tutaj',
      'info',
      'informacja',
      'link',
      'czytaj',
      'czytaj więcej',
      'czytaj to',
      'wiecej',
      'czytaj tu',
      'to',
      'tę stronę',
      'tej stronie',
      'tę witrynę',
      'tej witrynie',
      'zobacz',
      'zobacz naszą',
      'stronę',
      'witrynę',
    ],
    WARNING_ALT_STOPWORDS: ['kliknij tutaj'],
    NEW_WINDOW_PHRASES: [
      'zewnętrzny',
      'nowa karta',
      'nowe okno',
      'pop-up',
      'pop up',
    ],
    FILE_TYPE_PHRASES: ['dokument', 'arkusz kalkulacyjny', 'arkusz obliczeniowy', 'plik skompresowany', 'plik zarchiwizowany', 'arkusz roboczy', 'powerpoint', 'prezentacja', 'instalacja', 'wideo', 'audio', 'pdf'],

    // Readability
    LANG_READABILITY: 'Czytelność',
    LANG_AVG_SENTENCE: 'Średnio słów w zdaniu:',
    LANG_COMPLEX_WORDS: 'Trudne słowa:',
    LANG_TOTAL_WORDS: 'Słowa:',
    LANG_VERY_DIFFICULT: 'Bardzo trudne',
    LANG_DIFFICULT: 'Trudne',
    LANG_FAIRLY_DIFFICULT: 'Dość trudne',
    LANG_GOOD: 'Dobrze',
    READABILITY_NO_P_OR_LI_MESSAGE: 'Nie można oszacować wyników testu czytelności. Nie znaleziono treści w akapitach <code>&lt;p&gt;</code> lub listach <code>&lt;li&gt;</code>',
    READABILITY_NOT_ENOUGH_CONTENT_MESSAGE: 'Za mało treści, aby ocenić czytelność.',

    // Headings
    HEADING_NON_CONSECUTIVE_LEVEL: 'Niespójny poziom nagłówka. Zastosowane poziomy nie następują po sobie. Nagłówki nigdy nie powinny pomijać poziomów np. od <strong>Nagłówek %(prevLevel)</strong> do <strong {r}>Nagłówek %(level)</strong>.',
    HEADING_EMPTY: 'Znaleziono pusty nagłówek! Aby to naprawić, usuń tę linię lub zmień jej format z <strong {r}>Nagłówek %(level)</strong> na <strong>zwykły tekst</strong> lub <strong>akapit</strong>.',
    HEADING_LONG: 'Nagłówek jest zbyt długi! Nagłówki służą do organizowania treści i przekazywania struktury. Powinny być krótkie, jasne, opisowe i niepowtarzalne. Pisz nagłówki nie dłuższe niż 160 znaków (nie więcej niż zdanie). <hr> <strong>%(HEADING_LENGTH) Znaków</strong>',
    HEADING_FIRST: 'Pierwszym nagłówkiem na stronie powinien być zwykle Nagłówek H1 lub Nagłówek H2. Nagłówek H1 jest głównym nagłówkiem opisującym ogólny cel strony i powinien być początkiem obszaru treści głównej. Dowiedz się więcej o <a href="https://www.w3.org/WAI/tutorials/page-structure/headings/">Strukturze nagłówków.</a>',
    HEADING_MISSING_ONE: 'Brakuje nagłówka H1. Nagłówek H1 jest głównym nagłówkiem opisującym ogólny cel strony i powinien być początkiem obszaru treści głównej. Dowiedz się więcej o <a href="https://www.w3.org/WAI/tutorials/page-structure/headings/">Strukturze nagłówków.</a>',
    HEADING_EMPTY_WITH_IMAGE: 'Nagłówek nie ma tekstu, ale zawiera obrazek. Jeśli to nie jest nagłówek, zmień jego format z <strong {r}>Nagłówek H%(level)</strong> na <strong>zwykły tekst</strong> lub <strong>akapit</strong>. W przeciwnym razie, dodaj do obrazu tekst alt, jeśli nie jest on ozdobny.',
    PANEL_HEADING_MISSING_ONE: 'Brak Nagłówka 1!',
    PANEL_NO_HEADINGS: 'Nie znaleziono nagłówków.',

    // Links
    LINK_EMPTY: 'Puste łącze bez żadnego tekstu. Usuń je!',
    LINK_EMPTY_LABELLEDBY: 'Link ma wartość <code>aria-labelledby</code>, która jest pusta lub nie pasuje do wartości atrybutu <code>id</code> innego elementu na stronie.',
    LINK_EMPTY_LINK_NO_LABEL: 'Łącze nie ma opisowego tekstu, który jest widoczny dla czytników ekranu i innych technologii wspomagających. Aby naprawić: <ul><li>Dodaj zwięzły tekst, który opisuje, dokąd prowadzi łącze.</li><li>Jeśli łączem jest <a href="https://a11y-101.com/development/icons-and-links">ikona lub SVG,</a> prawdopodobnie brakuje mu opisowej etykiety.</li><li>Jeśli uważasz, że to łącze jest błędem spowodowanym błędem kopiuj/wklej, rozważ usunięcie go.</li></ul>',
    LINK_LABEL: '<strong {B}>Etykieta łącza</strong> %(TEXT)',
    LINK_STOPWORD: 'Tekst łącza może nie być wystarczająco opisowy w kontekście: <strong {r}>%(ERROR)</strong> <hr> <strong>Porada!</strong> Tekst łącza powinien być zawsze jasny, unikalny i znaczący. Unikaj typowych słów takich jak &quot;kliknij tutaj&quot; lub &quot;czytaj więcej&quot;.',
    LINK_BEST_PRACTICES: 'Rozważ zastąpienie tekstu łącza: <strong {r}>%(ERROR)</strong> <hr> <ul><li>&bdquo;Kliknij tutaj&rdquo; skupia się na mechanice myszy, podczas gdy wiele osób nie używa myszy lub może przeglądać tę stronę na urządzeniu mobilnym. Rozważ użycie innego czasownika, który odnosi się do zadania.</li><li>Unikaj używania symboli HTML jako wezwań do działania, chyba że są one ukryte dla technologii wspomagających.</li></ul>',
    LINK_URL: 'Dłuższe, mniej zrozumiałe adresy URL używane jako tekst linku mogą być trudne do zrozumienia podczas korzystania z technologii wspomagającej. W&nbsp;większości przypadków zamiast adresu URL lepiej jest używać tekstu czytelnego dla człowieka. Krótkie adresy URL (takie jak głównej strony witryny) są w porządku. <hr> <strong>Porada!</strong> Tekst łącza powinien być zawsze jasny, unikalny i znaczący, aby mógł być zrozumiany bez kontekstu.',
    LINK_DOI: 'W przypadku stron internetowych lub zasobów dostępnych tylko online, przewodnik <a href="https://apastyle.apa.org/style-grammar-guidelines/paper-format/accessibility/urls#:~:text=descriptive%20links">APA Style</a> zaleca stosowanie linków opisowych poprzez zawijanie adresu URL lub DOI pracy wokół jej tytułu. Dłuższe, mniej zrozumiałe adresy URL używane jako tekst linku mogą być trudne do zrozumienia podczas korzystania z technologii wspomagającej.',

    // Links advanced
    NEW_TAB_WARNING: 'Łącze otwiera się na nowej karcie lub w oknie bez ostrzeżenia. Może to być dezorientujące, szczególnie dla osób, które mają problemy z&nbsp;odbiorem treści wizualnych. Ponadto, nie zawsze dobrym zwyczajem jest kontrolowanie czyichś doświadczeń lub podejmowanie decyzji za kogoś. Wskaż w tekście łącza, że łącze otwiera się w nowym oknie. <hr> <strong>Porada!</strong> Poznaj najlepsze praktyki: <a href="https://www.nngroup.com/articles/new-browser-windows-and-tabs/">otwieranie łączy w nowych oknach i kartach przeglądarki.</a>',
    FILE_TYPE_WARNING: 'Łącze wskazuje  bez ostrzeżenia na plik PDF lub plik do pobrania (np. MP3, zip, doc). Wskaż typ pliku w tekście łącza. Jeśli jest to duży plik, rozważ podanie jego rozmiaru. <hr> <strong>Przykład:</strong> Raport końcowy (PDF, 3MB)',
    LINK_IDENTICAL_NAME: 'Łącze ma identyczny tekst jak inne łącze, choć wskazuje na inną stronę. Wiele łączy z takim samym tekstem może powodować zamieszanie u osób korzystających z czytników ekranu. <hr> Rozważ nadanie poniższemu łączu bardziej opisowego charakteru, aby odróżnić je od innych łączy: <strong {W}>%(TEXT)</strong>',

    // Images
    MISSING_ALT_LINK_BUT_HAS_TEXT_MESSAGE: 'Obraz jest używany razem z sąsiadującym tekstem jako łącze. Obraz powinien być oznaczony jako dekoracyjny albo atrybut alt obrazu powinien być pusty.',
    MISSING_ALT_LINK_MESSAGE: 'Obraz jest używany jako łącze, ale brakuje tekstu alternatywnego! Dodaj tekst alternatywny, który mówi, dokąd prowadzi łącze.',
    MISSING_ALT_MESSAGE: 'Brak tekstu alternatywnego! Jeśli obraz przekazuje historię, nastrój lub ważne informacje - przedstaw je w tekście alternatywnym.',
    LINK_ALT_HAS_FILE_EXTENSION: 'W tekście alt znaleziono rozszerzenie nazwy pliku. Upewnij się, że tekst alternatywny opisuje miejsce docelowe łącza, a nie treść lub wygląd obrazu. Usuń wyraz(y): <strong {r}>%(ERROR)</strong> <hr> {ALT} {L} <strong {r}>%(ALT_TEXT)</strong>',
    LINK_IMAGE_PLACEHOLDER_ALT_MESSAGE: 'Znaleziono nieopisowy lub zastępczy tekst alt w obrazie będącym łączem. Upewnij się, że tekst alternatywny opisuje miejsce docelowe łącza, a nie treść lub wygląd obrazu. Zastąp następujący tekst alt. <hr> {ALT} {L} <strong {r}>%(ALT_TEXT)</strong>.',
    LINK_IMAGE_SUS_ALT_MESSAGE: 'Technologie wspomagające już wskazują, że jest to obraz, więc &quot;<strong {W}>%(ERROR)</strong>&quot; mogą być zbędne. Upewnij się, że tekst alternatywny opisuje miejsce docelowe łącza, a nie treść lub wygląd obrazu. <hr> {ALT} {L} <strong {W}>%(ALT_TEXT)</strong>',
    ALT_HAS_FILE_EXTENSION: 'W tekście alt znaleziono rozszerzenie nazwy pliku. Upewnij się, że tekst alternatywny opisuje miejsce docelowe łącza, a nie treść lub wygląd obrazu. Usuń wyraz(y): <strong {r}>%(ERROR)</strong> <hr> {ALT} <strong {W}>%(ALT_TEXT)</strong>',
    ALT_PLACEHOLDER_MESSAGE: 'Znaleziono nieopisowy lub zastępczy tekst alt. Zamień poniższy tekst alt na coś bardziej znaczącego. <hr> {ALT} <strong {r}>%(ALT_TEXT)</strong>.',
    ALT_HAS_SUS_WORD: 'Technologie wspomagające już wskazują, że jest to obraz, więc &quot;<strong {r}>%(ERROR)</strong>&quot; mogą być zbędne. <hr> {ALT} <strong {W}>%(ALT_TEXT)</strong>',
    LINK_HIDDEN_FOCUSABLE: 'Link ma ustawienie <code>aria-hidden=&quot;true&quot;</code>, ale nadal można go zaznaczyć za pomocą klawiatury. Jeśli zamierzasz ukryć nadmierny lub zduplikowany link, dodaj również <code>tabindex=&quot;-1&quot;</code>.',
    LINK_IMAGE_NO_ALT_TEXT: 'Obraz w łączu jest oznaczony jako dekoracyjny i nie ma tekstu łącza. Dodaj do obrazu tekst alt, który opisze miejsce docelowe łącza.',
    LINK_IMAGE_HAS_TEXT: 'Obraz jest oznaczony jako dekoracyjny, ale łącze używa otaczającego go tekstu jako etykiety opisowej.',
    LINK_IMAGE_LONG_ALT: 'Tekst alternatywny opisujący obraz będący łączem jest <strong>zbyt długi</strong>. Tekst alternatywny na obrazach bedących łączami powinien przedstawiać, dokąd prowadzi łącze, a nie dosłownie opisywać obraz. <strong>Rozważ użycie jako tekstu alternatywnego tytułu strony, do którego łączy obraz.</strong> <hr> {ALT} {L} <strong {B}>%(altLength) Znaków</strong> <strong {W}>%(ALT_TEXT)</strong>',
    LINK_IMAGE_ALT_WARNING: 'Link do obrazu zawiera tekst alternatywny. <strong>Czy tekst alternatywny opisuje, dokąd prowadzi link?</strong> Rozważ użycie tytułu strony, do której prowadzi link, jako tekstu alternatywnego. <hr> {ALT} {L} <strong {W}>%(ALT_TEXT)</strong>',
    LINK_IMAGE_ALT_AND_TEXT_WARNING: 'Łącze graficzne ma <strong>zarówno tekst alternatywny, jak i sąsiadujący tekst łącza.</strong> Jeśli ten obraz jest dekoracyjny i jest używany w funkcji łącza do innej strony, należy rozważyć oznaczenie obrazu jako dekoracyjnego (pusty alt) - sąsiadujący tekst łącza powinien wystarczyć. <hr> {ALT} <strong {W}>%(ALT_TEXT)</strong> <hr> <strong {B}>Etykieta łącza</strong> {L} <strong {W}>%(TEXT)</strong>',
    IMAGE_FIGURE_DECORATIVE: 'Obraz jest oznaczony jako <strong>dekoracyjny</strong> i zostanie zignorowany przez technologię wspomagającą. <hr> Mimo że podano <strong>podpis</strong>, obraz powinien w większości przypadków zawierać również tekst alternatywny. <ul><li>Tekst alternatywny powinien zawierać zwięzły opis tego, co znajduje się na obrazku.</li><li>Podpis powinien zwykle zawierać kontekst, aby powiązać obraz z otaczającą zawartością lub zwracać uwagę na konkretną informację.</li></ul> Ucz się więcej: <a href="https://thoughtbot.com/blog/alt-vs-figcaption#the-figcaption-element">alternatywny kontra podpis graficzny.</a>',
    IMAGE_FIGURE_DUPLICATE_ALT: 'Nie używaj dokładnie tych samych słów dla tekstu alternatywnego i podpisu. Czytniki ekranu podadzą informację dwukrotnie. <ul><li>Tekst alternatywny powinien zawierać zwięzły opis tego, co znajduje się na obrazku.</li><li>Podpis powinien zwykle zawierać kontekst, aby powiązać obraz z otaczającą zawartością lub zwracać uwagę na konkretną informację.</li></ul> Ucz się więcej: <a href="https://thoughtbot.com/blog/alt-vs-figcaption#the-figcaption-element">alternatywny kontra podpis graficzny.</a> <hr> {ALT} <strong {W}>%(ALT_TEXT)</strong>',
    IMAGE_DECORATIVE: 'Obraz jest oznaczony <strong>dekoracyjny</strong> i zostanie zignorowany przez technologię wspomagającą. Jeśli obraz przekazuje jakąś historię, nastrój lub ważną informację - dodaj tekst alt.',
    IMAGE_ALT_TOO_LONG: 'Tekst alternatywny obrazu jest <strong>zbyt długi</strong>. Tekst alternatywny powinien być zwięzły, ale znaczący jak <em>tweet</em> (około 100 znaków). Jeśli jest to złożony obraz lub wykres, należy rozważyć umieszczenie długiego opisu obrazu w tekście poniżej lub w akordeonie. <hr> {ALT} <strong {B}>%(altLength) Znaków</strong> <strong {W}>%(ALT_TEXT)</strong>',
    IMAGE_PASS: '{ALT} %(ALT_TEXT)',

    // Labels
    LABELS_MISSING_IMAGE_INPUT_MESSAGE: 'Przycisk graficzny nie ma tekstu alternatywneego. Dodaj tekst alt, aby zapewnić dostępną nazwę. Na przykład: <em>Szukaj</em> lub <em>Wyślij</em>.',
    LABELS_INPUT_RESET_MESSAGE: 'Przyciski resetowania <strong>nie powinny</strong> być używane, chyba że są specjalnie potrzebne, ponieważ łatwo je aktywować przez pomyłkę.<hr><strong>Porada!</strong> Dowiedz się, dlaczego <a href="https://www.nngroup.com/articles/reset-and-cancel-buttons/">Przyciski Resetuj i Anuluj powodują problemy z użytecznością.</a>',
    LABELS_ARIA_LABEL_INPUT_MESSAGE: 'Pole danych ma dostępną nazwę (etykietę), ale upewnij się, że etykieta jest również widoczna. <hr> <strong {B}>Etykieta wejścia</strong> <strong {W}>%(TEXT)</strong>',
    LABELS_NO_FOR_ATTRIBUTE_MESSAGE: 'Z tym polem input nie jest skojarzona żadna etykieta (label). Dodaj atrybut <code>for</code> do etykiety z wartością <code>id</code>  pasującą do <code>id</code> tego pola.<hr>ID tego pola to: <strong>id=&#34;%(t)&#34;</strong>',
    LABELS_MISSING_LABEL_MESSAGE: 'Z tym polem input nie jest skojarzona żadna etykieta (label). Dodaj do tego pola danych <code>id</code> i dodaj pasujący atrybut <code>for</code> do etykiety.',

    // Embedded content
    EMBED_VIDEO: 'Upewnij się, że <strong>wszystkie filmy mają napisy rozszerzone.</strong> Zapewnianie napisów rozszerzonych dla wszystkich treści audio i wideo jest obowiązkowym wymogiem poziomu A. Napisy mają na celu wspieranie osób Głuchych i słabosłyszących.',
    EMBED_AUDIO: 'Upewnij się, że istnieje <strong>transkrypcja dla wszystkich nagrań dźwiękowych.</strong> Zapewnianie transkrypcji treści audio jest obowiązkowym wymogiem poziomu A. Transkrypcje mają na celu wspieranie osób Głuchych i słabosłyszących, ale każdy może z nich skorzystać. Rozważ umieszczenie transkrypcji poniżej lub w panelu akordeonowym.',
    EMBED_DATA_VIZ: 'Widżety wizualizacji danych, takie jak ten, są często problematyczne dla osób, które używają klawiatury lub czytnika ekranu do nawigacji, a także mogą stanowić znaczące trudności dla osób słabo widzących lub nie rozróżniających kolorów. Zapewnij te same infromacje w alternatywnym formacie (tekst lub tabela) pod widżetem. <hr> Dowiedz się więcej o <a href="https://www.w3.org/WAI/tutorials/images/complex/">obrazach złożonych.</a>',
    EMBED_MISSING_TITLE: 'Osadzona zawartość wymaga dostępnej nazwy, która opisuje jej treść. Dodaj unikalny <code>title</code> lub atrybutu <code>aria-label</code> do elementu <code>iframe</code>. Dowiedz się więcej o <a href="https://web.dev/learn/accessibility/more-html#iframes">iFrame.</a>',
    EMBED_GENERAL_WARNING: 'Nie można sprawdzić treści osadzonej. Upewnij się, że obrazy mają tekst alt, filmy mają napisy rozszerzone, tekst ma odpowiedni kontrast, a elementy interaktywne są <a href="https://webaim.org/techniques/keyboard/">dostępne z klawiatury.</a>',

    // Quality assurance
    QA_BAD_LINK: 'Podejrzane łącze. Łącze wydaje się wskazywać środowisko programistyczne.<hr>Łącze wskazuje na: <br> <strong {r}>%(LINK)</strong>',
    QA_IN_PAGE_LINK: 'Uszkodzony link na tej samej stronie. Cel linku nie odpowiada żadnemu elementowi na tej stronie.',
    QA_BAD_ITALICS: 'Znaczniki pogrubienia i kursywy mają znaczenie semantyczne i <strong>nie powinny</strong> być używane do wyróżniania całych akapitów. Pogrubiony tekst powinien być używany w celu <strong>silnego podkreślenia słowa lub frazy</strong>. Kursywa powinna być używana do wyróżnienia nazw własnych (np. tytułów książek i artykułów), wyrazów obcych, cytatów. Długie cytaty powinny być sformatowane jako blockquote.',
    QA_PDF: 'Nie można sprawdzić dostępności pliku PDF. Pliki PDF są uważane za treści internetowe i muszą być również dostępne. Pliki PDF często powodują problemy dla osób korzystających z&nbsp;czytników ekranu (brakujące znaczniki strukturalne lub etykiety pól formularzy) oraz dla osób słabowidzących (tekst nie jest ponownie wyświetlany po powiększeniu). <ul><li>Jeśli jest to formularz, rozważ użycie dostępnego formularza HTML jako alternatywy</li><li>Jeśli jest to dokument, rozważ przekonwertowanie go na stronę internetową.</li></ul> W przeciwnym razie <a href="https://helpx.adobe.com/acrobat/using/create-verify-pdf-accessibility.html">sprawdź plik pod kątem dostępności w programie Acrobat DC.</a>',
    QA_DOCUMENT: 'Nie można sprawdzić dokumentu pod kątem dostępności. Powiązane dokumenty są uważane za treści internetowe i również muszą być dostępne. Sprawdź ten dokument ręcznie. <ul><li>Zwiększ dostępność <a href="https://support.google.com/docs/answer/6199477?hl=pl">dokumentu lub prezentacji Google Workspace.</a></li><li>Zwiększ dostępność <a href="https://support.microsoft.com/pl-pl/office/create-accessible-office-documents-868ecfcd-4f00-4224-b881-a65537a7c155">dokumentów pakietu Office.</a></li></ul>',
    QA_PAGE_LANGUAGE: 'Język strony nie zadeklarowany! <a href="https://www.w3.org/International/questions/qa-html-language-declarations">Zadeklaruj język w znaczniku HTML.</a>',
    QA_PAGE_TITLE: 'Brak tytułu strony! Podaj <a href="https://developer.mozilla.org/en-US/docs/Web/HTML/Element/title">tytuł strony.</a>',
    QA_BLOCKQUOTE_MESSAGE: 'Czy to jest nagłówek? <strong {W}>%(TEXT)</strong> <hr> Element blockquote powinien być używany tylko do cytatów. Jeśli ma to być nagłówek, zmień ten blockquote na nagłówek semantyczny (np. Nagłówek H2 lub Nagłówek H3).',
    QA_FAKE_HEADING: 'Czy to jest nagłówek? <strong {W}>%(TEXT)</strong> <hr> Wiersz pogrubionego lub dużego tekstu może wyglądać jak nagłówek, ale osoba korzystająca z czytnika ekranu nie może stwierdzić, że jest on istotny lub przejść do jego treści. Pogrubiony lub duży tekst nigdy nie powinien zastępować nagłówków semantycznych (od Nagłówka H2 do Nagłówka H6).',
    QA_SHOULD_BE_LIST: 'Czy próbujesz utworzyć listę? Wykryto możliwe elementy listy: <strong {W}>%(firstPrefix)</strong> <hr> Upewnij się, że używasz list semantycznych, zamiast stosowania znaków punktowania (np. myślników) lub liczb. Podczas korzystania z list semantycznych technologie wspomagające są w stanie przekazać takie informacje, jak ogólna liczba elementów i względna pozycja każdego elementu na liście. Dowiedz się więcej o <a href="https://www.w3.org/WAI/tutorials/page-structure/content/#lists">semantycznych listach.</a>',
    QA_UPPERCASE_WARNING: 'Wykryto WSZYSTKIE WIELKIE LITERY. Niektóre czytniki ekranu interpretują cały tekst wielkimi literami jako akronim i będą czytać każdą literę odrębnie. Ponadto, wszystkie wielkie litery są trudniejsze do odczytania i sprawiają wrażenie KRZYKU.',
    QA_DUPLICATE_ID: 'Znaleziono <strong>duplikat ID</strong>. Wiadomo, że błędy zduplikowanego ID powodują problemy dla technologii pomocniczych podczas próby interakcji z treścią. <hr> Usuń lub zmień następujący ID: <strong {r}>%(id)</strong>',
    QA_TEXT_UNDERLINE_WARNING: 'Podkreślony tekst można pomylić z linkami. Rozważ użycie innego stylu, takiego jak &lt;strong&gt;<strong>silne znaczenie</strong>&lt;/strong&gt; lub &lt;em&gt;<em>nacisk</em>&lt;/em&gt;.',

    // Tables
    TABLES_MISSING_HEADINGS: 'Brak nagłówków tabeli! Dostępne tabele wymagają znaczników HTML, które wskazują komórki nagłówków i komórki danych, które definiują ich relację. Informacje te zapewniają kontekst osobom korzystającym z technologii wspomagających. Tabele powinny być używane tylko dla danych tabelarycznych.<hr>Dowiedz się więcej o <a href="https://www.w3.org/WAI/tutorials/tables/">dostępnych tabelach.</a>',
    TABLES_SEMANTIC_HEADING: 'Nagłówki semantyczne, takie jak nagłówek H2 lub nagłówek H3, powinny być używane tylko w odniesieniu do sekcji treści; <strong>nie</strong> w tabelach HTML. Zamiast tego należy wskazać nagłówki tabeli przy użyciu elementu <strong>th</strong>. <hr> Dowiedz się więcej o <a href="https://www.w3.org/WAI/tutorials/tables/">dostępnych tabelach.</a>',
    TABLES_EMPTY_HEADING: 'Wykryto pusty nagłówek tabeli! Nagłówki tabel <em>nigdy</em> nie powinny być puste. Ważne jest, aby wyznaczyć nagłówki wierszy i/lub kolumn, aby przekazać ich relację. Informacje te zapewniają kontekst osobom korzystającym z technologii wspomagających. Należy pamiętać, że tabele powinny być używane tylko dla danych tabelarycznych. <hr> Dowiedz się więcej o <a href="https://www.w3.org/WAI/tutorials/tables/">dostępnych tabelach.</a>',
    QA_SUBSCRIPT_WARNING: 'Opcji formatowania indeksu dolnego i indeksu górnego należy używać wyłącznie do zmiany pozycji tekstu w celu dostosowania do konwencji lub standardów typograficznych. Powinna <strong>nie</strong> być używana wyłącznie do celów prezentacji lub wyglądu. Formatowanie całych zdań stwarza problemy z czytelnością. Odpowiednie przypadki użycia obejmują wyświetlanie wykładników, liczb porządkowych, takich jak 4<sup>th</sup> zamiast czwartej, oraz wzorów chemicznych (H<sub>2</sub>O).',

    // Contrast
    CONTRAST_ERROR: 'Ten tekst nie ma wystarczającego kontrastu z tłem Współczynnik kontrastu powinien wynosić co najmniej 4,5:1 dla zwykłego tekstu i 3:1 dla dużego tekstu. <hr> <strong {B}>Stosunek kontrastu</strong> <strong {B}>%(RATIO)</strong> <strong {r}>%(TEXT)</strong>',
    CONTRAST_WARNING: 'Kontrast tego tekstu jest nieznany i wymaga ręcznego przeglądu. Upewnij się, że tekst i tło mają silne kontrastujące kolory. Współczynnik kontrastu powinien wynosić co najmniej 4,5:1 dla zwykłego tekstu i 3:1 dla dużego tekstu. <hr> Sprawdź kontrast następującego tekstu: <strong {W}>%(TEXT)</strong>',
    CONTRAST_INPUT_ERROR: 'Tekst w tym polu nie ma wystarczającego kontrastu z tłem. Stosunek kontrastu powinien wynosić co najmniej 4,5:1 dla normalnego tekstu i 3:1 dla dużego tekstu. <hr> <strong {B}>Stosunek kontrastu</strong> <strong {B}>%(RATIO)</strong>',
  },
};

export { pl as default };
