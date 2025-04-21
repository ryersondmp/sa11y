
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
  (global = typeof globalThis !== 'undefined' ? globalThis : global || self, global.Sa11yLangPl = factory());
})(this, (function () { 'use strict';

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
      OUTLINE: 'Konspekt',
      READABILITY_DESC: 'Pokazuje wynik czytelności w zakładce <strong>Konspekt</strong>, aby pomóc ocenić trudność czytania.',
      TITLE: 'Tytuł',
      ALT: 'ALT',
      IMAGES: 'Obrazy',
      EDIT: 'Edytuj',
      NO_IMAGES: 'Nie znaleziono obrazów.',
      DECORATIVE: 'Dekoracyjny',
      MISSING: 'Brakujący',
      PAGE_ISSUES: 'Problemy ze stroną',
      SETTINGS: 'Ustawienia',
      DEVELOPER_CHECKS: 'Kontrole dewelopera',
      DEVELOPER_DESC: 'Sprawdza problemy, których naprawa może wymagać znajomości kodowania, takie jak atrybuty HTML, formularze i inne.',
      DARK_MODE: 'Tryb ciemny',
      SHORTCUT_SR: 'Przejdź do problemu. Klawisze skrótu: lewy Option',
      SKIP_TO_ISSUE: 'Przejdź do problemu',
      NEW_TAB: 'Otwórz na nowej karcie',
      LINKED: 'Połączony',
      PANEL_HEADING: 'Testuj dostępność',
      NO_ERRORS_FOUND: 'Nie znaleziono błędów.',
      WARNINGS_FOUND: 'ostrzeżeń do przeglądu.',
      TOTAL_FOUND: 'ogółem wykrytych problemów.',
      NOT_VISIBLE: 'Element, który próbujesz wyświetlić, nie jest widoczny; może być ukryty lub znajdować się wewnątrz akordeonu lub karty. Tutaj jest podgląd:',
      MISSING_ROOT: 'Sprawdzono dostępność całej strony, ponieważ obszar docelowy nie istnieje: <code>%(root)</code>',
      MISSING_READABILITY_ROOT: 'Ocena czytelności opiera się na obszarze treści <code>%(fallback)</code>, ponieważ docelowy obszar <code>%(root)</code> nie istnieje.',
      HEADING_NOT_VISIBLE: 'Nagłówek nie jest widoczny; może być ukryty lub wewnątrz komponentu akordeonu lub tabulatora.',
      SKIP_TO_PAGE_ISSUES: 'Przejdź do problemów ze stroną',
      CONSOLE_ERROR: 'Przepraszamy, ale wystąpił problem z narzędziem do sprawdzania ułatwień dostępu na tej stronie. Czy możesz <a href="%(link)">zgłosić to za pomocą tego formularza</a> lub na <a href="%(link)">GitHub</a>?',
      APPEARANCE: 'Wygląd',
      MOVE_PANEL: 'Przenieś panel',

      // Dismiss
      PANEL_DISMISS_BUTTON: 'Pokaż %(dismissCount) odrzucone',
      DISMISS: 'Odrzuć',
      DISMISS_ALL: 'Odrzuć wszystko',
      DISMISSED: 'Odrzucone',
      DISMISS_REMINDER: 'Proszę pamiętać, że ostrzeżenia są <strong>tymczasowo</strong> odrzucone. Wyczyść historię przeglądarki i pliki cookie, aby przywrócić wszystkie wcześniej odrzucone ostrzeżenia na wszystkich stronach.',

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
      COLOUR_FILTER_HIGH_CONTRAST: 'Filtry kolorów nie działają w trybie wysokiego kontrastu.',

      // Alternative text module stop words
      SUS_ALT_STOPWORDS: ['obraz', 'grafika', 'zdjęcie', 'rysunek', 'fotografia', 'foto', 'image', 'graphic', 'picture', 'photo'],
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
      CLICK: ['click', 'kliknięcie'],
      NEW_WINDOW_PHRASES: [
        'zewnętrzny',
        'nowa karta',
        'nowe okno',
        'pop-up',
        'pop up',
      ],
      FILE_TYPE_PHRASES: ['dokument', 'arkusz kalkulacyjny', 'arkusz obliczeniowy', 'plik skompresowany', 'plik zarchiwizowany', 'arkusz roboczy', 'powerpoint', 'prezentacja', 'instalacja', 'wideo', 'audio', 'pdf'],

      // Readability
      READABILITY: 'Czytelność',
      AVG_SENTENCE: 'Średnio słów w zdaniu:',
      COMPLEX_WORDS: 'Trudne słowa:',
      TOTAL_WORDS: 'Słowa:',
      VERY_DIFFICULT: 'Bardzo trudne',
      DIFFICULT: 'Trudne',
      FAIRLY_DIFFICULT: 'Dość trudne',
      READABILITY_NO_CONTENT: 'Nie można oszacować wyników testu czytelności. Nie znaleziono treści w akapitach <code>&lt;p&gt;</code> lub listach <code>&lt;li&gt;</code>',
      READABILITY_NOT_ENOUGH: 'Za mało treści, aby ocenić czytelność.',

      // Headings
      HEADING_SKIPPED_LEVEL: 'Nagłówki nie powinny pomijać poziomów ani przeskakiwać z <strong>Nagłówka %(PREV_LEVEL)</strong> na <strong {C}>Nagłówek %(LEVEL)</strong>, ponieważ zakłóca to porządek i hierarchię treści, co utrudnia śledzenie. <hr> Jeśli <strong {C}>%(HEADING)</strong> znajduje się pod sekcją <strong>%(PREV_HEADING)</strong>, rozważ jego sformatowanie jako <strong>Nagłówek %(LEVEL)</strong>.',
      HEADING_EMPTY: 'Znaleziono pusty nagłówek! Aby to naprawić, usuń tę linię lub zmień jej format z <strong {C}>Nagłówek %(level)</strong> na <strong>zwykły tekst</strong> lub <strong>akapit</strong>.',
      HEADING_LONG: 'Nagłówek jest zbyt długi! Nagłówki służą do organizowania treści i przekazywania struktury. Powinny być krótkie, jasne, opisowe i niepowtarzalne. Pisz nagłówki nie dłuższe niż %(MAX_LENGTH) znaków (nie więcej niż zdanie). <hr> <strong>%(HEADING_LENGTH) Znaków</strong>',
      HEADING_FIRST: 'Pierwszym nagłówkiem na stronie powinien być zwykle Nagłówek H1 lub Nagłówek H2. Nagłówek H1 jest głównym nagłówkiem opisującym ogólny cel strony i powinien być początkiem obszaru treści głównej. Dowiedz się więcej o <a href="https://www.w3.org/WAI/tutorials/page-structure/headings/">Strukturze nagłówków.</a>',
      HEADING_MISSING_ONE: 'Brakuje nagłówka H1. Nagłówek H1 jest głównym nagłówkiem opisującym ogólny cel strony i powinien być początkiem obszaru treści głównej. Dowiedz się więcej o <a href="https://www.w3.org/WAI/tutorials/page-structure/headings/">Strukturze nagłówków.</a>',
      HEADING_EMPTY_WITH_IMAGE: 'Nagłówek nie ma tekstu, ale zawiera obrazek. Jeśli to nie jest nagłówek, zmień jego format z <strong {C}>Nagłówek H%(level)</strong> na <strong>zwykły tekst</strong> lub <strong>akapit</strong>. W przeciwnym razie, dodaj do obrazu tekst alt, jeśli nie jest on ozdobny.',
      PANEL_HEADING_MISSING_ONE: 'Brak Nagłówka 1!',
      PANEL_NO_HEADINGS: 'Nie znaleziono nagłówków.',

      // Links
      LINK_EMPTY: 'Puste łącze bez żadnego tekstu. Usuń je!',
      LINK_EMPTY_LABELLEDBY: 'Link ma wartość <code>aria-labelledby</code>, która jest pusta lub nie pasuje do wartości atrybutu <code>id</code> innego elementu na stronie.',
      LINK_EMPTY_NO_LABEL: 'Łącze nie ma opisowego tekstu, który jest widoczny dla czytników ekranu i innych technologii wspomagających. Aby naprawić: <ul><li>Dodaj zwięzły tekst, który opisuje, dokąd prowadzi łącze.</li><li>Jeśli łączem jest <a href="https://a11y-101.com/development/icons-and-links">ikona lub SVG,</a> prawdopodobnie brakuje mu opisowej etykiety.</li><li>Jeśli uważasz, że to łącze jest błędem spowodowanym błędem kopiuj/wklej, rozważ usunięcie go.</li></ul>',
      LINK_STOPWORD: 'Tekst linku może być niewystarczająco opisowy poza kontekstem: <strong {C}>%(ERROR)</strong>',
      LINK_STOPWORD_ARIA: 'Mimo że podano dostępny tytuł, rozważ poprawę widocznego tekstu linku. Wyrażenia takie jak &quot;<strong {C}>%(ERROR)</strong>&quot; nie są znaczące.',
      LINK_TIP: '<hr> <strong>Wskazówka!</strong> Używaj jasnego i unikalnego tekstu linku, który opisuje cel linku, zwykle tytuł strony lub dokumentu.',
      LINK_CLICK_HERE: 'Zwrot "kliknij" lub "kliknij tutaj" skupia się na mechanice myszy, gdy tymczasem wiele osób nie korzysta z myszy lub może przeglądać tę witrynę na urządzeniu mobilnym. Rozważ użycie innego czasownika związanego z zadaniem.',
      DUPLICATE_TITLE: 'Atrybut <code>title</code> w linkach i obrazach ma na celu dostarczenie dodatkowych informacji i powinien być <strong>inny</strong> niż tekst lub tekst alternatywny. Tekst tytułu pojawia się po najechaniu kursorem na element, ale nie jest dostępny z poziomu klawiatury lub dotykowego wprowadzania. Rozważ <a href="https://www.a11yproject.com/posts/title-attributes/">całkowite unikanie atrybutu title.</a>',
      LINK_SYMBOLS: 'Unikaj używania symboli jako wezwania do działania w tekście linków, chyba że są ukryte przed technologiami asystującymi. Czytniki ekranu mogą odczytywać symbole na głos, co może być mylące. Rozważ ich usunięcie: <strong {C}>%(ERROR)</strong>',
      LINK_URL: 'Dłuższe, mniej zrozumiałe adresy URL używane jako tekst linku mogą być trudne do zrozumienia podczas korzystania z technologii wspomagającej. W&nbsp;większości przypadków zamiast adresu URL lepiej jest używać tekstu czytelnego dla człowieka. Krótkie adresy URL (takie jak głównej strony witryny) są w porządku.',
      LINK_DOI: 'W przypadku stron internetowych lub zasobów dostępnych tylko online, przewodnik <a href="https://apastyle.apa.org/style-grammar-guidelines/paper-format/accessibility/urls#:~:text=descriptive%20links">APA Style</a> zaleca stosowanie linków opisowych poprzez zawijanie adresu URL lub DOI pracy wokół jej tytułu. Dłuższe, mniej zrozumiałe adresy URL używane jako tekst linku mogą być trudne do zrozumienia podczas korzystania z technologii wspomagającej.',
      LINK_NEW_TAB: 'Łącze otwiera się na nowej karcie lub w oknie bez ostrzeżenia. Może to być dezorientujące, szczególnie dla osób, które mają problemy z&nbsp;odbiorem treści wizualnych. Ponadto, nie zawsze dobrym zwyczajem jest kontrolowanie czyichś doświadczeń lub podejmowanie decyzji za kogoś. Wskaż w tekście łącza, że łącze otwiera się w nowym oknie. <hr> <strong>Porada!</strong> Poznaj najlepsze praktyki: <a href="https://www.nngroup.com/articles/new-browser-windows-and-tabs/">otwieranie łączy w nowych oknach i kartach przeglądarki.</a>',
      LINK_FILE_EXT: 'Łącze wskazuje  bez ostrzeżenia na plik PDF lub plik do pobrania (np. MP3, zip, doc). Wskaż typ pliku w tekście łącza. Jeśli jest to duży plik, rozważ podanie jego rozmiaru. <hr> <strong>Przykład:</strong> Raport końcowy (PDF, 3MB)',
      LINK_IDENTICAL_NAME: 'Łącze ma identyczny tekst jak inne łącze, choć wskazuje na inną stronę. Wiele łączy z takim samym tekstem może powodować zamieszanie u osób korzystających z czytników ekranu. <strong>Rozważ nadanie poniższemu łączu bardziej opisowego charakteru, aby odróżnić je od innych łączy.</strong> <hr> <strong {B}>Dostępna nazwa</strong> <strong {C}>%(TEXT)</strong>',

      // Images
      MISSING_ALT_LINK_HAS_TEXT: 'Obraz jest używany razem z sąsiadującym tekstem jako łącze. Obraz powinien być oznaczony jako dekoracyjny albo atrybut alt obrazu powinien być pusty.',
      MISSING_ALT_LINK: 'Obraz jest używany jako łącze, ale brakuje tekstu alternatywnego! Dodaj tekst alternatywny, który mówi, dokąd prowadzi łącze.',
      MISSING_ALT: 'Brak tekstu alternatywnego! Jeśli obraz przekazuje historię, nastrój lub ważne informacje - przedstaw je w tekście alternatywnym.',
      LINK_ALT_FILE_EXT: 'Tekst alternatywny nie powinien zawierać rozszerzeń plików ani wymiarów obrazów. Upewnij się, że tekst alternatywny opisuje miejsce docelowe łącza, a nie treść lub wygląd obrazu. Usuń wyraz(y): <strong {C}>%(ERROR)</strong> <hr> {ALT} {L} <strong {C}>%(ALT_TEXT)</strong>',
      LINK_PLACEHOLDER_ALT: 'Znaleziono nieopisowy lub zastępczy tekst alt w obrazie będącym łączem. Upewnij się, że tekst alternatywny opisuje miejsce docelowe łącza, a nie treść lub wygląd obrazu. Zastąp następujący tekst alt. <hr> {ALT} {L} <strong {C}>%(ALT_TEXT)</strong>.',
      LINK_SUS_ALT: 'Technologie wspomagające już wskazują, że jest to obraz, więc &quot;<strong {C}>%(ERROR)</strong>&quot; mogą być zbędne. Upewnij się, że tekst alternatywny opisuje miejsce docelowe łącza, a nie treść lub wygląd obrazu. <hr> {ALT} {L} <strong {C}>%(ALT_TEXT)</strong>',
      ALT_FILE_EXT: 'Tekst alternatywny nie powinien zawierać rozszerzeń plików ani wymiarów obrazów. Upewnij się, że tekst alternatywny opisuje miejsce docelowe łącza, a nie treść lub wygląd obrazu. Usuń wyraz(y): <strong {C}>%(ERROR)</strong> <hr> {ALT} <strong {C}>%(ALT_TEXT)</strong>',
      ALT_PLACEHOLDER: 'Znaleziono nieopisowy lub zastępczy tekst alt. Zamień poniższy tekst alt na coś bardziej znaczącego. <hr> {ALT} <strong {C}>%(ALT_TEXT)</strong>.',
      SUS_ALT: 'Technologie wspomagające już wskazują, że jest to obraz, więc &quot;<strong {C}>%(ERROR)</strong>&quot; mogą być zbędne. <hr> {ALT} <strong {C}>%(ALT_TEXT)</strong>',
      LINK_IMAGE_NO_ALT_TEXT: 'Obraz w łączu jest oznaczony jako dekoracyjny i nie ma tekstu łącza. Dodaj do obrazu tekst alt, który opisze miejsce docelowe łącza.',
      LINK_IMAGE_TEXT: 'Obraz jest oznaczony jako dekoracyjny, ale łącze używa otaczającego go tekstu jako etykiety opisowej.',
      LINK_IMAGE_LONG_ALT: 'Tekst alternatywny opisujący obraz będący łączem jest <strong>zbyt długi</strong>. Tekst alternatywny na obrazach bedących łączami powinien przedstawiać, dokąd prowadzi łącze, a nie dosłownie opisywać obraz. <strong>Rozważ użycie jako tekstu alternatywnego tytułu strony, do którego łączy obraz.</strong> <hr> {ALT} {L} <strong {B}>%(altLength) Znaków</strong> <strong {C}>%(ALT_TEXT)</strong>',
      LINK_IMAGE_ALT: 'Link do obrazu zawiera tekst alternatywny. <strong>Czy tekst alternatywny opisuje, dokąd prowadzi link?</strong> Rozważ użycie tytułu strony, do której prowadzi link, jako tekstu alternatywnego. <hr> {ALT} {L} <strong {C}>%(ALT_TEXT)</strong>',
      LINK_IMAGE_ALT_AND_TEXT: 'Łącze graficzne ma <strong>zarówno tekst alternatywny, jak i sąsiadujący tekst łącza.</strong> Jeśli ten obraz jest dekoracyjny i jest używany w funkcji łącza do innej strony, należy rozważyć oznaczenie obrazu jako dekoracyjnego (pusty alt) - sąsiadujący tekst łącza powinien wystarczyć. <hr> {ALT} <strong {C}>%(ALT_TEXT)</strong> <hr> <strong {B}>Dostępna nazwa</strong> {L} <strong {C}>%(TEXT)</strong>',
      IMAGE_FIGURE_DECORATIVE: 'Obraz jest oznaczony jako <strong>dekoracyjny</strong> i zostanie zignorowany przez technologię wspomagającą. <hr> Mimo że podano <strong>podpis</strong>, obraz powinien w większości przypadków zawierać również tekst alternatywny. <ul><li>Tekst alternatywny powinien zawierać zwięzły opis tego, co znajduje się na obrazku.</li><li>Podpis powinien zwykle zawierać kontekst, aby powiązać obraz z otaczającą zawartością lub zwracać uwagę na konkretną informację.</li></ul> Ucz się więcej: <a href="https://thoughtbot.com/blog/alt-vs-figcaption#the-figcaption-element">alternatywny kontra podpis graficzny.</a>',
      IMAGE_FIGURE_DUPLICATE_ALT: 'Nie używaj dokładnie tych samych słów dla tekstu alternatywnego i podpisu. Czytniki ekranu podadzą informację dwukrotnie. <ul><li>Tekst alternatywny powinien zawierać zwięzły opis tego, co znajduje się na obrazku.</li><li>Podpis powinien zwykle zawierać kontekst, aby powiązać obraz z otaczającą zawartością lub zwracać uwagę na konkretną informację.</li></ul> Ucz się więcej: <a href="https://thoughtbot.com/blog/alt-vs-figcaption#the-figcaption-element">alternatywny kontra podpis graficzny.</a> <hr> {ALT} <strong {C}>%(ALT_TEXT)</strong>',
      IMAGE_DECORATIVE: 'Obraz jest oznaczony <strong>dekoracyjny</strong> i zostanie zignorowany przez technologię wspomagającą. Jeśli obraz przekazuje jakąś historię, nastrój lub ważną informację - dodaj tekst alt.',
      IMAGE_DECORATIVE_CAROUSEL: 'Obraz jest oznaczony jako dekoracyjny, ale wszystkie obrazy w karuzeli lub galerii powinny zawierać opisowy tekst alternatywny, aby zapewnić równoważne doświadczenie dla wszystkich.',
      IMAGE_ALT_TOO_LONG: 'Tekst alternatywny obrazu jest <strong>zbyt długi</strong>. Tekst alternatywny powinien być zwięzły, ale znaczący jak <em>tweet</em> (około 100 znaków). Jeśli jest to złożony obraz lub wykres, należy rozważyć umieszczenie długiego opisu obrazu w tekście poniżej lub w akordeonie. <hr> {ALT} <strong {B}>%(altLength) Znaków</strong> <strong {C}>%(ALT_TEXT)</strong>',
      IMAGE_PASS: '{ALT} %(ALT_TEXT)',

      // Form labels
      LABELS_MISSING_IMAGE_INPUT: 'Przycisk graficzny nie ma tekstu alternatywneego. Dodaj tekst alt, aby zapewnić dostępną nazwę. Na przykład: <em>Szukaj</em> lub <em>Wyślij</em>.',
      LABELS_INPUT_RESET: 'Przyciski resetowania <strong>nie powinny</strong> być używane, chyba że są specjalnie potrzebne, ponieważ łatwo je aktywować przez pomyłkę.<hr><strong>Porada!</strong> Dowiedz się, dlaczego <a href="https://www.nngroup.com/articles/reset-and-cancel-buttons/">Przyciski Resetuj i Anuluj powodują problemy z użytecznością.</a>',
      LABELS_ARIA_LABEL_INPUT: 'Pole danych ma dostępną nazwę (etykietę), ale upewnij się, że etykieta jest również widoczna. <hr> <strong {B}>Dostępna nazwa</strong> <strong {C}>%(TEXT)</strong>',
      LABELS_NO_FOR_ATTRIBUTE: 'Z tym polem input nie jest skojarzona żadna etykieta (label). Dodaj atrybut <code>for</code> do etykiety z wartością <code>id</code>  pasującą do <code>id</code> tego pola. <hr> <strong {B}>ID</strong> <strong {C}>#%(id)</strong>',
      LABELS_MISSING_LABEL: 'Z tym polem input nie jest skojarzona żadna etykieta (label). Dodaj do tego pola danych <code>id</code> i dodaj pasujący atrybut <code>for</code> do etykiety.',
      LABELS_PLACEHOLDER: 'Znikający tekst zastępczy utrudnia ludziom zapamiętanie, jakie informacje powinny znaleźć się w polu, a także utrudnia identyfikację i poprawę błędów. Zamiast tego rozważ użycie trwale widocznej wskazówki przed polem formularza. <hr> Dowiedz się więcej: <a href="https://www.nngroup.com/articles/form-design-placeholders/">Zastępniki w polach formularzy są szkodliwe.</a>',

      // Embedded content
      EMBED_VIDEO: 'Upewnij się, że <strong>wszystkie filmy mają napisy rozszerzone.</strong> Zapewnianie napisów rozszerzonych dla wszystkich treści audio i wideo jest obowiązkowym wymogiem poziomu A. Napisy mają na celu wspieranie osób Głuchych i słabosłyszących.',
      EMBED_AUDIO: 'Upewnij się, że istnieje <strong>transkrypcja dla wszystkich nagrań dźwiękowych.</strong> Zapewnianie transkrypcji treści audio jest obowiązkowym wymogiem poziomu A. Transkrypcje mają na celu wspieranie osób Głuchych i słabosłyszących, ale każdy może z nich skorzystać. Rozważ umieszczenie transkrypcji poniżej lub w panelu akordeonowym.',
      EMBED_DATA_VIZ: 'Widżety wizualizacji danych, takie jak ten, są często problematyczne dla osób, które używają klawiatury lub czytnika ekranu do nawigacji, a także mogą stanowić znaczące trudności dla osób słabo widzących lub nie rozróżniających kolorów. Zapewnij te same infromacje w alternatywnym formacie (tekst lub tabela) pod widżetem. <hr> Dowiedz się więcej o <a href="https://www.w3.org/WAI/tutorials/images/complex/">obrazach złożonych.</a>',
      EMBED_MISSING_TITLE: 'Osadzona zawartość wymaga dostępnej nazwy, która opisuje jej treść. Dodaj unikalny <code>title</code> lub atrybutu <code>aria-label</code> do elementu <code>iframe</code>. Dowiedz się więcej o <a href="https://web.dev/learn/accessibility/more-html#iframes">iFrame.</a>',
      EMBED_GENERAL: 'Nie można sprawdzić treści osadzonej. Upewnij się, że obrazy mają tekst alt, filmy mają napisy rozszerzone, tekst ma odpowiedni kontrast, a elementy interaktywne są <a href="https://webaim.org/techniques/keyboard/">dostępne z klawiatury.</a>',
      EMBED_UNFOCUSABLE: '&lt;code&gt;&lt;iframe&gt;&lt;/code&gt; z elementami, które można wybrać, nie powinno mieć <code>tabindex="-1"</code>. Osadzona zawartość nie będzie dostępna za pomocą klawiatury.',

      // Quality assurance
      QA_BAD_LINK: 'Podejrzane łącze. Łącze wydaje się wskazywać środowisko programistyczne. <hr> {L} <strong {C}>%(LINK)</strong>',
      QA_IN_PAGE_LINK: 'Uszkodzony link na tej samej stronie. Cel linku nie odpowiada żadnemu elementowi na tej stronie.',
      QA_STRONG_ITALICS: 'Znaczniki pogrubienia i kursywy mają znaczenie semantyczne i <strong>nie powinny</strong> być używane do wyróżniania całych akapitów. Pogrubiony tekst powinien być używany w celu <strong>silnego podkreślenia słowa lub frazy</strong>. Kursywa powinna być używana do wyróżnienia nazw własnych (np. tytułów książek i artykułów), wyrazów obcych, cytatów. Długie cytaty powinny być sformatowane jako blockquote.',
      QA_PDF: 'Nie można sprawdzić dostępności pliku PDF. Pliki PDF są uważane za treści internetowe i muszą być również dostępne. Pliki PDF często powodują problemy dla osób korzystających z&nbsp;czytników ekranu (brakujące znaczniki strukturalne lub etykiety pól formularzy) oraz dla osób słabowidzących (tekst nie jest ponownie wyświetlany po powiększeniu). <ul><li>Jeśli jest to formularz, rozważ użycie dostępnego formularza HTML jako alternatywy</li><li>Jeśli jest to dokument, rozważ przekonwertowanie go na stronę internetową.</li></ul> W przeciwnym razie <a href="https://helpx.adobe.com/acrobat/using/create-verify-pdf-accessibility.html">sprawdź plik pod kątem dostępności w programie Acrobat DC.</a>',
      QA_DOCUMENT: 'Nie można sprawdzić dokumentu pod kątem dostępności. Powiązane dokumenty są uważane za treści internetowe i również muszą być dostępne. Sprawdź ten dokument ręcznie. <ul><li>Zwiększ dostępność <a href="https://support.google.com/docs/answer/6199477?hl=pl">dokumentu lub prezentacji Google Workspace.</a></li><li>Zwiększ dostępność <a href="https://support.microsoft.com/pl-pl/office/create-accessible-office-documents-868ecfcd-4f00-4224-b881-a65537a7c155">dokumentów pakietu Office.</a></li></ul>',
      QA_BLOCKQUOTE: 'Czy to jest nagłówek? <strong {C}>%(TEXT)</strong> <hr> Element blockquote powinien być używany tylko do cytatów. Jeśli ma to być nagłówek, zmień ten blockquote na nagłówek semantyczny (np. Nagłówek H2 lub Nagłówek H3).',
      QA_FAKE_HEADING: 'Czy to jest nagłówek? <strong {C}>%(TEXT)</strong> <hr> Wiersz pogrubionego lub dużego tekstu może wyglądać jak nagłówek, ale osoba korzystająca z czytnika ekranu nie może stwierdzić, że jest on istotny lub przejść do jego treści. Pogrubiony lub duży tekst nigdy nie powinien zastępować nagłówków semantycznych (od Nagłówka H2 do Nagłówka H6).',
      QA_FAKE_LIST: 'Czy próbujesz utworzyć listę? Wykryto możliwe elementy listy: <strong {C}>%(firstPrefix)</strong> <hr> Upewnij się, że używasz list semantycznych, zamiast stosowania znaków punktowania (np. myślników) lub liczb. Podczas korzystania z list semantycznych technologie wspomagające są w stanie przekazać takie informacje, jak ogólna liczba elementów i względna pozycja każdego elementu na liście. Dowiedz się więcej o <a href="https://www.w3.org/WAI/tutorials/page-structure/content/#lists">semantycznych listach.</a>',
      QA_UPPERCASE: 'Wykryto WSZYSTKIE WIELKIE LITERY. Niektóre czytniki ekranu interpretują cały tekst wielkimi literami jako akronim i będą czytać każdą literę odrębnie. Ponadto, wszystkie wielkie litery są trudniejsze do odczytania i sprawiają wrażenie KRZYKU.',
      QA_UNDERLINE: 'Podkreślony tekst można pomylić z linkami. Rozważ użycie innego stylu, takiego jak &lt;strong&gt;<strong>silne znaczenie</strong>&lt;/strong&gt; lub &lt;em&gt;<em>nacisk</em>&lt;/em&gt;.',
      QA_SUBSCRIPT: 'Opcji formatowania indeksu dolnego i indeksu górnego należy używać wyłącznie do zmiany pozycji tekstu w celu dostosowania do konwencji lub standardów typograficznych. Powinna <strong>nie</strong> być używana wyłącznie do celów prezentacji lub wyglądu. Formatowanie całych zdań stwarza problemy z czytelnością. Odpowiednie przypadki użycia obejmują wyświetlanie wykładników, liczb porządkowych, takich jak 4<sup>th</sup> zamiast czwartej, oraz wzorów chemicznych (H<sub>2</sub>O).',
      QA_NESTED_COMPONENTS: 'Unikaj zagnieżdżania interaktywnych komponentów układu, takich jak umieszczanie akordeonów w zakładkach lub zakładek w akordeonach. Może to skomplikować nawigację, zwiększyć obciążenie poznawcze i prowadzić do pomijania treści.',
      QA_JUSTIFY: 'Unikaj stosowania wyjustowanego tekstu, który jest wyrównany zarówno do lewego, jak i prawego marginesu. Może to być trudne do odczytania dla niektórych osób ze względu na nierówne odstępy między słowami. Używaj tekstu wyrównanego do lewej strony dla lepszej czytelności.',
      QA_SMALL_TEXT: 'Mały tekst jest trudniejszy do odczytania, szczególnie dla osób słabowidzących. Aby zapewnić lepszą czytelność, unikaj używania czcionek mniejszych niż domyślne.',

      // Shared
      ACC_NAME: '<strong {B}>Dostępna nazwa</strong> %(TEXT)',
      ACC_NAME_TIP: '<hr><strong>Wskazówka!</strong> "Dostępna nazwa" to ostateczna etykieta, która jest przekazywana osobom korzystającym z technologii wspomagających i jest obliczana przez ARIA. Pomaga to im zrozumieć cel linku lub przycisku.',
      HIDDEN_FOCUSABLE: 'Link lub przycisk ma atrybut <code>aria-hidden=&quot;true&quot;</code>, ale wciąż może być uzyskany za pomocą klawiatury. Jeśli zamierzasz ukryć zduplikowany link lub przycisk, dodaj również <code>tabindex=&quot;-1&quot;</code>. W przeciwnym razie atrybut <code>aria-hidden=&quot;true&quot;</code> nie powinien być używany dla elementów, które mogą otrzymać fokus. <hr> Dowiedz się więcej o <a href="https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/Attributes/aria-hidden">atrybucie aria-hidden.</a>',

      // Developer
      DUPLICATE_ID: 'Znaleziono <strong>duplikat ID</strong>. Wiadomo, że błędy zduplikowanego ID powodują problemy dla technologii pomocniczych podczas próby interakcji z treścią. Usuń lub zmień następujący ID. <hr> <strong {B}>ID</strong> <strong {C}>#%(id)</strong>',
      UNCONTAINED_LI: 'Wszystkie elementy listy <code>&lt;li&gt;</code> muszą być umieszczone wewnątrz elementów <code>&lt;ul&gt;</code> nieuporządkowanych lub <code>&lt;ol&gt;</code> uporządkowanych. Ta struktura pomaga czytnikom ekranu dokładnie ogłaszać listę i jej elementy.',
      TABINDEX_ATTR: 'Element nie powinien mieć atrybutu <code>tabindex</code> większego niż 0.',

      // Meta checks
      META_LANG: 'Język strony nie zadeklarowany! <a href="https://www.w3.org/International/questions/qa-html-language-declarations">Zadeklaruj język w znaczniku HTML.</a>',
      META_TITLE: 'Brak tytułu strony! Podaj <a href="https://developer.mozilla.org/en-US/docs/Web/HTML/Element/title">tytuł strony.</a>',
      META_SCALABLE: 'Usuń parametr <code>user-scalable="no"</code> w <a href="https://developer.mozilla.org/en-US/docs/Web/HTML/Viewport_meta_tag">meta tagu widoku</a>, aby umożliwić powiększanie.',
      META_MAX: 'Upewnij się, że parametr <code>maximum-scale</code> w <a href="https://developer.mozilla.org/en-US/docs/Web/HTML/Viewport_meta_tag">meta tagu widoku</a> nie jest mniejszy niż 2.',
      META_REFRESH: 'Strona nie powinna automatycznie odświeżać się przy użyciu meta tagu.',

      // Buttons
      BTN_EMPTY: 'Przycisk nie ma dostępnej nazwy opisującej jego cel.',
      BTN_EMPTY_LABELLEDBY: 'Przycisk ma wartość <code>aria-labelledby</code>, która jest pusta lub nie pasuje do wartości <code>id</code> innego elementu na stronie.',
      BTN: 'przycisk',
      BTN_TIP: 'Dowiedz się, jak utworzyć <a href="https://www.sarasoueidan.com/blog/accessible-icon-buttons/">dostępny przycisk.</a>',
      BTN_ROLE_IN_NAME: 'Nie włączaj słowa „przycisk” w nazwie przycisku. Czytniki ekranowe już podają rolę elementu oprócz jego nazwy.',
      LABEL_IN_NAME: 'Widoczny tekst tego elementu wydaje się różnić od dostępnej nazwy, co może wprowadzać w błąd użytkowników technologii wspomagających. Sprawdź: <hr> <strong {B}>Dostępna nazwa</strong> <strong {C}>%(TEXT)</strong>',

      // Tables
      TABLES_MISSING_HEADINGS: 'Brak nagłówków tabeli! Dostępne tabele wymagają znaczników HTML, które wskazują komórki nagłówków i komórki danych, które definiują ich relację. Informacje te zapewniają kontekst osobom korzystającym z technologii wspomagających. Tabele powinny być używane tylko dla danych tabelarycznych.<hr>Dowiedz się więcej o <a href="https://www.w3.org/WAI/tutorials/tables/">dostępnych tabelach.</a>',
      TABLES_SEMANTIC_HEADING: 'Nagłówki semantyczne, takie jak nagłówek H2 lub nagłówek H3, powinny być używane tylko w odniesieniu do sekcji treści; <strong>nie</strong> w tabelach HTML. Zamiast tego należy wskazać nagłówki tabeli przy użyciu elementu <strong>th</strong>. <hr> Dowiedz się więcej o <a href="https://www.w3.org/WAI/tutorials/tables/">dostępnych tabelach.</a>',
      TABLES_EMPTY_HEADING: 'Wykryto pusty nagłówek tabeli! Nagłówki tabel <em>nigdy</em> nie powinny być puste. Ważne jest, aby wyznaczyć nagłówki wierszy i/lub kolumn, aby przekazać ich relację. Informacje te zapewniają kontekst osobom korzystającym z technologii wspomagających. Należy pamiętać, że tabele powinny być używane tylko dla danych tabelarycznych. <hr> Dowiedz się więcej o <a href="https://www.w3.org/WAI/tutorials/tables/">dostępnych tabelach.</a>',

      // Contrast
      CONTRAST_NORMAL: 'Tekst normalnej wielkości powinien mieć współczynnik kontrastu co najmniej %(RATIO).',
      CONTRAST_LARGE: 'Tekst dużej wielkości powinien mieć współczynnik kontrastu co najmniej %(RATIO).',
      CONTRAST_ERROR: 'Tekst nie ma wystarczającego kontrastu w stosunku do tła, co utrudnia jego odczytanie.',
      CONTRAST_WARNING: 'Kontrast tego tekstu jest nieznany i wymaga ręcznego sprawdzenia. Upewnij się, że tekst i tło mają mocny kontrast.',
      CONTRAST_ERROR_GRAPHIC: 'Grafika nie ma wystarczającego kontrastu w stosunku do tła, co utrudnia jej dostrzeganie.',
      CONTRAST_WARNING_GRAPHIC: 'Kontrast tej grafiki jest nieznany i wymaga ręcznego sprawdzenia.',
      CONTRAST_TIP_GRAPHIC: 'Grafiki i elementy interfejsu użytkownika powinny mieć współczynnik kontrastu co najmniej 3:1.',
      CONTRAST_OPACITY: 'Zwiększ przezroczystość, aby poprawić widoczność.',
      CONTRAST_APCA: 'To nie ma wystarczającego kontrastu dla żadnego rozmiaru tekstu. Rozważ użycie tej kombinacji koloru i rozmiaru tekstu?',
      CONTRAST_COLOR: 'Rozważ użycie tego koloru zamiast tego?',
      CONTRAST_SIZE: 'Rozważ zwiększenie rozmiaru tekstu dla tej kombinacji kolorów?',
      CONTRAST_PLACEHOLDER: 'Tekst zastępczy w tym polu wejściowym nie ma wystarczającego kontrastu w stosunku do tła, co utrudnia jego odczytanie.',
      CONTRAST_PLACEHOLDER_UNSUPPORTED: 'Kontrast tego tekstu zastępczego jest nieznany i wymaga ręcznego sprawdzenia. Upewnij się, że tekst i tło mają silnie kontrastujące kolory.',
      CONTRAST_INPUT: 'Tekst w tym polu wejściowym nie ma wystarczającego kontrastu w stosunku do tła, co utrudnia jego odczytanie.',
      CONTRAST: 'Kontrast',
      UNKNOWN: 'Nieznane',
      FG: 'Pierwszy plan',
      BG: 'Tło',
      NO_SUGGESTION: 'Nie znaleziono dostępnej kombinacji, zmieniając tylko kolor tekstu. Spróbuj zmienić kolor tła.',
    },
  };

  return pl;

}));
