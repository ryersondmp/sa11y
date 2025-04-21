
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
  (global = typeof globalThis !== 'undefined' ? globalThis : global || self, global.Sa11yLangSl = factory());
})(this, (function () { 'use strict';

  /*! WARNING: This is a machine-generated translation and may contain errors or inaccuracies. */
  var sl = {
    // Slovenian
    strings: {
      LANG_CODE: 'sl',
      MAIN_TOGGLE_LABEL: 'Preverite dostopnost',
      CONTAINER_LABEL: 'Preverjanje dostopnosti',
      ERROR: 'Napaka',
      ERRORS: 'Napake',
      WARNING: 'Opozorilo',
      WARNINGS: 'Opozorila',
      GOOD: 'Dobro',
      ON: 'Vklopljeno',
      OFF: 'Izklopljeno',
      ALERT_TEXT: 'Opozorilo',
      ALERT_CLOSE: 'Zapri',
      OUTLINE: 'Oris',
      READABILITY_DESC: 'Prikaže oceno berljivosti na zavihku <strong>Oris</strong> za lažjo oceno težavnosti branja.',
      TITLE: 'Naslov',
      ALT: 'ALT',
      IMAGES: 'Slike',
      EDIT: 'Uredi',
      NO_IMAGES: 'Ni najdenih slik.',
      DECORATIVE: 'Dekorativno',
      MISSING: 'Manjka',
      PAGE_ISSUES: 'Vprašanja strani',
      SETTINGS: 'Nastavitve',
      DEVELOPER_CHECKS: 'Preverjanje razvijalca',
      DEVELOPER_DESC: 'Preverja težave, katerih odpravljanje lahko zahteva znanje kodiranja, kot so HTML atributi, obrazci in drugo.',
      DARK_MODE: 'Temni način',
      SHORTCUT_SR: 'Preskoči na številko. Bližnjica do tipkovnice: Alt S',
      SKIP_TO_ISSUE: 'Preskoči na vprašanje',
      NEW_TAB: 'Odpre nov zavihek',
      LINKED: 'Povezan',
      PANEL_HEADING: 'Preverjanje dostopnosti',
      NO_ERRORS_FOUND: 'Ni bilo najdenih napak.',
      WARNINGS_FOUND: 'najdenih opozoril.',
      TOTAL_FOUND: 'skupno število najdenih vprašanj.',
      NOT_VISIBLE: 'Element, ki si ga želite ogledati, ni viden; morda je skrit ali pa je znotraj komponente harmonike ali zavihka. Tukaj je predogled:',
      MISSING_ROOT: 'Celotna stran je bila preverjena glede dostopnosti, ker ciljno območje <code>%(root)</code> ne obstaja.',
      MISSING_READABILITY_ROOT: 'Ocena berljivosti temelji na vsebinski površini <code>%(fallback)</code>, ker ciljno območje <code>%(root)</code> ne obstaja.',
      HEADING_NOT_VISIBLE: 'Glava ni vidna; lahko je skrita ali znotraj komponente harmonike ali zavihka.',
      SKIP_TO_PAGE_ISSUES: 'Preskoči na stran Vprašanja',
      CONSOLE_ERROR: 'Opravičujemo se, vendar je na tej strani prišlo do težave s preverjanjem dostopnosti. Ali jo lahko <a href="%(link)">prijavite prek tega obrazca</a> ali na <a href="%(link)">GitHub</a>?',
      APPEARANCE: 'Izgled',
      MOVE_PANEL: 'Premakni ploščo',

      // Dismiss
      PANEL_DISMISS_BUTTON: 'Pokaži %(dismissCount) zavrnjeno',
      DISMISS: 'Zavrni',
      DISMISS_ALL: 'Zavrni vse',
      DISMISSED: 'Zavrnjen',
      DISMISS_REMINDER: 'Upoštevajte, da so opozorila samo <strong> začasno </strong> zavrnjena. Izbris zgodovine brskalnika in piškotkov bo obnovil vsa prej zavrnjena opozorila na vseh straneh.',

      // Export
      DATE: 'Datum',
      PAGE_TITLE: 'Naslov strani',
      RESULTS: 'Rezultati',
      EXPORT_RESULTS: 'Izvozi rezultate',
      GENERATED: 'Rezultati, ustvarjeni s %(tool).',
      PREVIEW: 'Predogled',
      ELEMENT: 'Element',
      PATH: 'Pot',

      // Colour filters
      COLOUR_FILTER: 'Barvni filter',
      PROTANOPIA: 'Protanopia',
      DEUTERANOPIA: 'Deuteranopija',
      TRITANOPIA: 'Tritanopia',
      MONOCHROMACY: 'Enobarvnost',
      COLOUR_FILTER_MESSAGE: 'Preverite elemente, ki jih je težko zaznati ali ločiti od drugih barv.',
      RED_EYE: 'Rdeči slepi.',
      GREEN_EYE: 'Zelena žaluzija.',
      BLUE_EYE: 'Modra žaluzija.',
      MONO_EYE: 'Rdeči, modri in zeleni slepi.',
      COLOUR_FILTER_HIGH_CONTRAST: 'Barvni filtri ne delujejo v načinu visokega kontrasta.',

      // Alternative text stop words
      SUS_ALT_STOPWORDS: [
        'slika',
        'grafični',
        'fotografija',
      ],
      PLACEHOLDER_ALT_STOPWORDS: [
        'alt',
        'slika',
        'fotografija',
        'dekorativni',
        'namestnik',
        'nadomestna slika',
        'distančnik',
      ],
      PARTIAL_ALT_STOPWORDS: [
        'kliknite',
        'kliknite tukaj',
        'kliknite tukaj za več',
        'kliknite tukaj za več informacij',
        'kliknite tukaj',
        'si oglejte',
        'podrobno tukaj',
        'prenesi',
        'prenesi tukaj',
        'ugotovite',
        'izvedite več',
        'izveste več',
        'izvedeti več',
        'obrazec',
        'tukaj',
        'informacije',
        'povezava',
        'naučite se',
        'več informacij',
        'se naučite',
        'več',
        'stran',
        'papir',
        'preberi več',
        'preberite več',
        'preberite',
        'preberi to',
        'ta',
        'ta stran',
        'na tej strani',
        'to spletno mesto',
        'ogled',
        'si oglejte naš',
        'spletna stran',
      ],
      CLICK: ['click', 'klik'],
      NEW_WINDOW_PHRASES: [
        'zunanji',
        'nov zavihek',
        'novo okno',
        'pop-up',
        'pojaviti se',
      ],
      FILE_TYPE_PHRASES: ['dokument', 'preglednica', 'računski list', 'stisnjena datoteka', 'arhivirana datoteka', 'delovni list', 'powerpoint', 'predstavitev', 'namestitev', 'video', 'zvok', 'pdf'],

      // Readability
      READABILITY: 'Berljivost',
      AVG_SENTENCE: 'Povprečno število besed na stavek:',
      COMPLEX_WORDS: 'Kompleksne besede:',
      TOTAL_WORDS: 'Besede:',
      VERY_DIFFICULT: 'Zelo težko',
      DIFFICULT: 'Težavno',
      FAIRLY_DIFFICULT: 'Precej težko',
      READABILITY_NO_CONTENT: 'Ni mogoče izračunati ocene berljivosti. Ni najden odstavek <code>&lt;p&gt;</code> ali vsebina seznama <code>&lt;li&gt;</code>.',
      READABILITY_NOT_ENOUGH: 'Premalo vsebine za izračun ocene berljivosti.',

      // Headings
      HEADING_SKIPPED_LEVEL: 'Naslovi ne bi smeli preskakovati nivoje ali skočiti z <strong>Naslova %(PREV_LEVEL)</strong> na <strong {C}>Naslov %(LEVEL)</strong>, saj to moti red in hierarhijo vsebine, zaradi česar je težje slediti. <hr> Če <strong {C}>%(HEADING)</strong> spada pod razdelek <strong>%(PREV_HEADING)</strong>, razmislite o oblikovanju kot <strong>Naslov %(LEVEL)</strong> namesto tega.',
      HEADING_EMPTY: 'Najden je bil prazen naslov! To popravite tako, da izbrišete to vrstico ali spremenite njeno obliko iz <strong {C}>Glavica %(level)</strong> v <strong>Normalno</strong> ali <strong>Odstavek</strong>.',
      HEADING_LONG: 'Smer je dolga! Naslovi se uporabljajo za urejanje vsebine in izražanje strukture. Biti morajo kratki, informativni in edinstveni. Naj bodo naslovi krajši od %(MAX_LENGTH) znakov (največ en stavek). <hr> <strong {B}>%(HEADING_LENGTH) Znakov</strong>',
      HEADING_FIRST: 'Prvi naslov na strani mora biti običajno naslov 1 ali 2. Naslov 1 mora biti začetek poglavja z glavno vsebino in je glavni naslov, ki opisuje splošni namen strani. Preberite več o <a href="https://www.w3.org/WAI/tutorials/page-structure/headings/">Strukturi naslovov.</a>',
      HEADING_MISSING_ONE: 'Manjka naslov 1. Naslov 1 mora biti začetek glavnega vsebinskega področja in je glavni naslov, ki opisuje splošni namen strani. Preberite več o <a href="https://www.w3.org/WAI/tutorials/page-structure/headings/">Strukturi naslovov.</a>',
      HEADING_EMPTY_WITH_IMAGE: 'Naslov nima besedila, vsebuje pa sliko. Če to ni naslov, spremenite njegovo obliko iz <strong {C}>Nadpis %(level)</strong> v <strong>Normalno</strong> ali <strong>Odstavek</strong>. V nasprotnem primeru sliki dodajte besedilo alt, če ni okrasno.',
      PANEL_HEADING_MISSING_ONE: 'Manjka naslov 1!',
      PANEL_NO_HEADINGS: 'Ni najdenih naslovov.',

      // Links
      LINK_EMPTY: 'Odstranite prazne povezave brez besedila.',
      LINK_EMPTY_LABELLEDBY: 'Povezava ima vrednost za <code>aria-labelledby</code>, ki je prazna ali se ne ujema z vrednostjo atributa <code>id</code> drugega elementa na strani.',
      LINK_EMPTY_NO_LABEL: 'Povezava nima razločljivega besedila, ki bi bilo vidno za bralnike zaslona in drugo podporno tehnologijo. Popravek: <ul><li>Dodajte nekaj jedrnatega besedila, ki opisuje, kam vas bo povezava pripeljala.</li><li>Če gre za povezavo <a href="https://a11y-101.com/development/icons-and-links">ikona ali SVG,</a>, ji verjetno manjka opisna oznaka.</li><li>Če menite, da je ta povezava napaka zaradi napake pri kopiranju/prilepljanju, razmislite o njenem izbrisu.</li></ul>',
      LINK_STOPWORD: 'Besedilo povezave morda ni dovolj opisno izven konteksta: <strong {C}>%(ERROR)</strong>',
      LINK_STOPWORD_ARIA: 'Čeprav je bilo zagotovljeno dostopno ime, razmislite o ponovni pregledu vidnega besedila povezave. Izrazi, kot so &quot;<strong {C}>%(ERROR)</strong>&quot;, niso smiselni.',
      LINK_TIP: '<hr> <strong>Nasvet!</strong> Uporabite jasno in edinstveno besedilo povezave, ki opisuje cilj povezave, običajno naslov strani ali dokumenta.',
      LINK_CLICK_HERE: 'Besedna zveza "kliknite" ali "kliknite tukaj" postavi poudarek na mehaniko miške, vendar mnogi ljudje ne uporabljajo miške ali si lahko ogledajo to spletno stran na mobilnem napravi. Razmislite o uporabi drugega glagola, ki se nanaša na nalogo.',
      DUPLICATE_TITLE: 'Atribut <code>title</code> pri povezavah in slikah je namenjen zagotavljanju dodatnih informacij in mora biti <strong>drugačen</strong> od besedila ali alternativnega besedila. Besedilo naslova se prikaže, ko z miško zadržite nad elementom, vendar ni dostopno s tipkovnico ali dotikom. Razmislite o <a href="https://www.a11yproject.com/posts/title-attributes/">popolnem izogibanju atributu title.</a>',
      LINK_SYMBOLS: 'Izogibajte se uporabi simbolov kot pozivov k dejanju v besedilu povezave, razen če so skriti pred asistivnimi tehnologijami. Bralniki zaslona lahko simbole preberejo na glas, kar je lahko zavajajoče. Razmislite o njihovi odstranitvi: <strong {C}>%(ERROR)</strong>',
      LINK_URL: 'Daljše in manj razumljive naslove URL, ki se uporabljajo kot besedilo povezav, je morda težko poslušati s pomožno tehnologijo. V večini primerov je bolje, da namesto URL-ja uporabite človeku berljivo besedilo. Kratki naslovi URL (kot je domača stran spletnega mesta) so v redu.',
      LINK_DOI: 'Pri spletnih straneh ali spletnih virih vodnik <a href="https://apastyle.apa.org/style-grammar-guidelines/paper-format/accessibility/urls#:~:text=descriptive%20links">APA Style</a> priporoča uporabo opisnih povezav, tako da URL ali DOI dela ovijete okoli njegovega naslova. Daljši in manj razumljivi naslovi URL, ki se uporabljajo kot besedilo povezave, so lahko pri dostopu s pomožno tehnologijo težko razumljivi.',
      LINK_NEW_TAB: 'Povezava se brez opozorila odpre v novem zavihku ali oknu. To je lahko moteče, zlasti za ljudi, ki imajo težave z zaznavanjem vizualne vsebine. Drugič, ni vedno dobra praksa, da bi nadzorovali izkušnjo nekoga ali sprejemali odločitve namesto njega. Navedite, da se povezava odpre v novem oknu, v besedilu povezave. <hr> <strong>Tip!</strong> Spoznajte najboljše prakse: <a href="https://www.nngroup.com/articles/new-browser-windows-and-tabs/">odpiranje povezav v novih oknih in zavihkih brskalnika.</a>',
      LINK_FILE_EXT: 'Povezava kaže na datoteko PDF ali datoteko za prenos (npr. MP3, Zip, Wordov dokument) brez opozorila. V besedilu povezave navedite vrsto datoteke. Če gre za veliko datoteko, razmislite o vključitvi velikosti datoteke. <hr> <strong>Primer:</strong> Izvršno poročilo (PDF, 3 MB)',
      LINK_IDENTICAL_NAME: 'Povezava ima enako besedilo kot druga povezava, čeprav kaže na drugo stran. Več povezav z enakim besedilom lahko povzroči zmedo pri ljudeh, ki uporabljajo bralnike zaslona. <strong>Premislite, ali naj bo naslednja povezava bolj opisna, da jo boste lažje razlikovali od drugih povezav.</strong> <hr> <strong {B}>Dostopno ime</strong> <strong {C}>%(TEXT)</strong>',

      // Images
      MISSING_ALT_LINK_HAS_TEXT: 'Slika se uporablja kot povezava z okoliškim besedilom, čeprav bi moral biti atribut alt označen kot okrasni ali ničen.',
      MISSING_ALT_LINK: 'Slika se uporablja kot povezava, vendar nima besedila Alt! Prepričajte se, da besedilo alt opisuje, kam vas bo povezava pripeljala.',
      MISSING_ALT: 'Manjka besedilo alt! Če slika sporoča zgodbo, razpoloženje ali pomembne informacije, jo obvezno opišite.',
      LINK_ALT_FILE_EXT: 'Alternativni tekst ne sme vsebovati končnice datotek ali dimenzije slik. Prepričajte se, da besedilo alt opisuje cilj povezave in ne dobesednega opisa slike. Odstrani: <strong {C}>%(ERROR)</strong> <hr> {ALT} {L} <strong {C}>%(ALT_TEXT)</strong>',
      LINK_PLACEHOLDER_ALT: 'V povezani sliki je bilo najdeno neopisno ali nadomestno besedilo alt. Prepričajte se, da besedilo alt opisuje cilj povezave in ne dobesednega opisa slike. Zamenjajte naslednje besedilo alt. <hr> {ALT} {L} <strong {C}>%(ALT_TEXT)</strong>',
      LINK_SUS_ALT: 'Pomožne tehnologije že označujejo, da gre za sliko, zato je &quot;<strong {C}>%(ERROR)</strong>&quot; morda odveč. Zagotovite, da besedilo alt opisuje cilj povezave in ne dobesednega opisa slike. <hr> {ALT} {L} <strong {C}>%(ALT_TEXT)</strong>',
      ALT_FILE_EXT: 'Alternativni tekst ne sme vsebovati končnice datotek ali dimenzije slik. Če slika sporoča zgodbo, razpoloženje ali pomembne informacije, jo obvezno opišite. Odstrani: <strong {C}>%(ERROR)</strong> <hr> {ALT} <strong {C}>%(ALT_TEXT)</strong>',
      ALT_PLACEHOLDER: 'Najdeno neopisno ali nadomestno besedilo alt. Naslednje besedilo alt zamenjajte z bolj smiselnim. <hr> {ALT} <strong {C}>%(ALT_TEXT)</strong>',
      SUS_ALT: 'Pomožne tehnologije že označujejo, da gre za sliko, zato je &quot;<strong {C}>%(ERROR)</strong>&quot; morda odveč. <hr> {ALT} <strong {C}>%(ALT_TEXT)</strong>',
      LINK_IMAGE_NO_ALT_TEXT: 'Slika v povezavi je označena kot okrasna in nima besedila povezave. Sliki dodajte besedilo alt, ki opisuje cilj povezave.',
      LINK_IMAGE_TEXT: 'Slika je označena kot dekorativna, čeprav povezava uporablja okoliško besedilo kot opisno oznako.',
      LINK_IMAGE_LONG_ALT: 'Opis besedila Alt na povezani sliki je <strong>predolg</strong>. Besedilo alt na povezanih slikah mora opisovati, kam vodi povezava, in ne dobesednega opisa slike. <strong>Premislite, da bi kot altovsko besedilo uporabili naslov strani, na katero vodi povezava.</strong> <hr> {ALT} {L} <strong {B}>%(altLength) Znakov</strong> <strong {C}>%(ALT_TEXT)</strong>',
      LINK_IMAGE_ALT: 'Povezava do slike vsebuje besedilo alt. <strong>Ali besedilo opisuje, kam vas bo povezava pripeljala?</strong> Razmislite o uporabi naslova strani, na katero vodi povezava, kot alt besedila. <hr> {ALT} {L} <strong {C}>%(ALT_TEXT)</strong>',
      LINK_IMAGE_ALT_AND_TEXT: 'Slikovna povezava vsebuje <strong>oboje besedilo alt in okoliško besedilo povezave.</strong> Če je ta slika okrasna in se uporablja kot funkcionalna povezava na drugo stran, razmislite o označitvi slike kot okrasne ali ničelne - okoliško besedilo povezave bi moralo zadostovati. <hr> {ALT} <strong {C}>%(ALT_TEXT)</strong> <hr> <strong {B}>Dostopno ime</strong> {L} <strong {C}>%(TEXT)</strong>',
      IMAGE_FIGURE_DECORATIVE: 'Slika je označena kot <strong>dekorativna</strong> in jo podporna tehnologija ne bo upoštevala. <hr> Čeprav je bil naveden <strong>naslov</strong>, bi morala imeti slika v večini primerov tudi alt besedilo. <ul><li>Temeljno besedilo mora vsebovati jedrnat opis tega, kar je na sliki.</li><li>Podpis mora običajno zagotavljati kontekst, ki sliko povezuje z okoliško vsebino, ali opozarjati na določeno informacijo.</li></ul> Preberi več: <a href="https://thoughtbot.com/blog/alt-vs-figcaption#the-figcaption-element">alt v primerjavi s figcaption.</a>',
      IMAGE_FIGURE_DUPLICATE_ALT: 'Ne uporabljajte istih besed za besedilo alta in napisa. Bralniki zaslona bodo informacije objavili dvakrat. <ul><li> Besedilo alt mora vsebovati kratek opis tega, kar je na sliki.</li><li>Podpis mora običajno vsebovati kontekst, ki sliko povezuje z okoliško vsebino, ali pa opozarja na določeno informacijo.</li></ul> Več informacij: <a href="https://thoughtbot.com/blog/alt-vs-figcaption#the-figcaption-element">alt v primerjavi s figcaption.</a> <hr> {ALT} <strong {C}>%(ALT_TEXT)</strong>',
      IMAGE_DECORATIVE: 'Slika je označena kot <strong>dekorativna</strong> in jo podporna tehnologija ne bo upoštevala. Če slika sporoča zgodbo, razpoloženje ali pomembne informacije, obvezno dodajte dodatno besedilo.',
      IMAGE_DECORATIVE_CAROUSEL: 'Slika je označena kot dekorativna, vendar morajo vse slike v vrtiljaku ali galeriji vključevati opisno nadomestno besedilo, da se zagotovi enakovredna izkušnja za vse.',
      IMAGE_ALT_TOO_LONG: 'Opis besedila Alt je <strong>predolg</strong>. Besedilo Alt mora biti jedrnato, vendar smiselno kot <em>tweet</em> (približno 100 znakov). Če gre za zapleteno sliko ali graf, razmislite o tem, da bi dolg opis slike umestili v spodnje besedilo ali komponento harmonike. <hr> {ALT} <strong {B}>%(altLength) Znakov</strong> <strong {C}>%(ALT_TEXT)</strong>',
      IMAGE_PASS: '{ALT} %(ALT_TEXT)',

      // Form labels
      LABELS_MISSING_IMAGE_INPUT: 'V gumbu za sliko manjka besedilo alt. Dodajte besedilo alt in zagotovite dostopno ime. Na primer: <em>Poišči</em> ali <em>Oddaj</em>.',
      LABELS_INPUT_RESET: 'Gumbe za ponastavitev <strong>ne smete uporabljati, razen če je to posebej potrebno, saj jih je mogoče zlahka aktivirati po pomoti. <hr> <strong>Tip!</strong> Preberite, zakaj <a href="https://www.nngroup.com/articles/reset-and-cancel-buttons/">Gumbova Reset in Cancel predstavljata težave z uporabnostjo.</a>',
      LABELS_ARIA_LABEL_INPUT: 'Vnos ima dostopno ime, vendar poskrbite, da je vidna tudi nalepka. <hr> <strong {B}>Dostopno ime</strong> <strong {C}>%(TEXT)</strong>',
      LABELS_NO_FOR_ATTRIBUTE: 'S tem vnosom ni povezana nobena oznaka. Dodajte atribut <code>for</code> oznaki, ki ustreza <code>id</code> tega vnosa. <hr> <strong {B}>ID</strong> <strong {C}>#%(id)</strong>',
      LABELS_MISSING_LABEL: 'S tem vnosom ni povezana nobena oznaka. Dodajte <code>id</code> temu vnosu in dodajte ustrezen atribut <code>for</code> oznaki.',
      LABELS_PLACEHOLDER: 'Izginjajoči tekst zavor se težko spomni, katera informacija spada v polje in otežuje ugotavljanje in popravljanje napak. Namesto tega razmislite o uporabi trajno vidnega namiga pred poljem obrazca. <hr> Več informacij: <a href="https://www.nngroup.com/articles/form-design-placeholders/">Zavori v obrazcih so škodljivi.</a>',

      // Embedded content
      EMBED_VIDEO: 'Poskrbite, da bodo <strong>vsi videoposnetki opremljeni s podnapisi.</strong> Zagotavljanje podnapisov za vse zvočne in video vsebine je obvezna zahteva na ravni A. Podnapisi so v pomoč gluhim in naglušnim osebam.',
      EMBED_AUDIO: 'Za vse podcaste zagotovite <strong>prepis.</strong> Zagotavljanje prepisov za zvočne vsebine je obvezna zahteva na ravni A. Prepisi so v pomoč gluhim in naglušnim osebam, koristijo pa lahko vsem. Razmislite o tem, da bi prepis umestili pod ali v akordno ploščo.',
      EMBED_DATA_VIZ: 'Tovrstni pripomočki za vizualizacijo podatkov so pogosto problematični za osebe, ki za navigacijo uporabljajo tipkovnico ali bralnik zaslona, in lahko predstavljajo veliko težavo za slabovidne ali barvno slepe osebe. Priporočljivo je, da pod gradnikom zagotovite enake informacije v alternativni obliki (besedilo ali tabela). <hr> Preberite več o <a href="https://www.w3.org/WAI/tutorials/images/complex">kompleksnih slikah.</a>',
      EMBED_MISSING_TITLE: 'Vgrajena vsebina potrebuje dostopno ime, ki opisuje njeno vsebino. V elementu <code>iframe</code> navedite edinstven atribut <code>title</code> ali <code>aria-label</code>. Preberite več o <a href="https://web.dev/learn/accessibility/more-html#iframes">iFrames.</a>',
      EMBED_GENERAL: 'Ni mogoče preveriti vdelane vsebine. Prepričajte se, da imajo slike alternativno besedilo, videoposnetki podnapise, da je besedilo dovolj kontrastno in da so interaktivne komponente <a href="https://webaim.org/techniques/keyboard/">dostopne s tipkovnice.</a>',
      EMBED_UNFOCUSABLE: '<code>&lt;iframe&gt;</code> z elementi, ki se jim ni mogoče osredotočiti, ne sme imeti <code>tabindex="-1"</code>. Vgrajena vsebina ne bo dostopna prek tipkovnice.',

      // QA
      QA_BAD_LINK: 'Najdena slaba povezava. Zdi se, da povezava kaže na razvojno okolje. <hr> {L} <strong {C}>%(LINK)</strong>',
      QA_IN_PAGE_LINK: 'Okvarjena povezava na isto stran. Cilj povezave se ne ujema z nobenim elementom na tej strani.',
      QA_STRONG_ITALICS: 'Oznake krepko in poševno imajo semantični pomen in se ne smejo uporabljati za poudarjanje celotnih odstavkov. Krepko označeno besedilo je treba uporabiti za močno <strong>izpostavitev</strong> besede ali besedne zveze. Ležečo pisavo je treba uporabljati za poudarjanje lastnih imen (npr. naslovov knjig in člankov), tujih besed, narekovajev. Dolgi citati morajo biti oblikovani kot blokovski citati.',
      QA_PDF: 'Ni mogoče preveriti dostopnosti datotek PDF. Datoteke PDF veljajo za spletno vsebino in morajo biti prav tako dostopne. Datoteke PDF pogosto vsebujejo težave za ljudi, ki uporabljajo bralnike zaslona (manjkajoče strukturne oznake ali manjkajoče oznake polj obrazca), in ljudi s slabim vidom (besedilo se ne preliva, ko je povečano). <ul><li>Če gre za obrazec, razmislite o uporabi dostopnega obrazca HTML kot alternative.</li><li>Če gre za dokument, razmislite o pretvorbi v spletno stran.</li></ul> V nasprotnem primeru preverite <a href="https://helpx.adobe.com/acrobat/using/create-verify-pdf-accessibility.html">PDF za dostopnost v programu Acrobat DC.</a>',
      QA_DOCUMENT: 'Dokumenta ni mogoče preveriti glede dostopnosti. Povezani dokumenti veljajo za spletno vsebino in morajo biti prav tako dostopni. Ta dokument preglejte ročno. <ul><li>Povečajte dostopnost svojega <a href="https://support.google.com/docs/answer/6199477?hl=sl">dokumenta ali predstavitve Google Workspace.</a></li><li>Povečajte dostopnost svojih <a href="https://support.microsoft.com/sl/office/create-accessible-office-documents-868ecfcd-4f00-4224-b881-a65537a7c155">dokumentov Office.</a></li></ul>',
      QA_BLOCKQUOTE: 'Ali je to naslov? <strong {C}>%(TEXT)</strong> <hr> Okvirne narekovaje je treba uporabljati samo za citate. Če naj bi bil to naslov, spremenite ta blokovnik v semantični naslov (npr. naslov 2 ali naslov 3).',
      QA_FAKE_HEADING: 'Ali je to naslov? <strong {C}>%(TEXT)</strong> <hr> Vrstica krepkega ali velikega besedila je lahko videti kot naslov, vendar oseba, ki uporablja bralnik zaslona, ne more ugotoviti, da je besedilo pomembno, ali preiti na njegovo vsebino. Krepko ali veliko besedilo ne sme nikoli nadomestiti semantičnih naslovov (naslovi od 2 do 6).',
      QA_FAKE_LIST: 'Želite ustvariti seznam? Najden je možen element seznama: <strong {C}>%(firstPrefix)</strong> <hr> Prepričajte se, da uporabljate semantične sezname tako, da namesto tega uporabite gumbe za oblikovanje kroglic ali številk. Pri uporabi semantičnega seznama lahko podporne tehnologije posredujejo informacije, kot sta skupno število elementov in relativni položaj vsakega elementa na seznamu. Preberite več o <a href="https://www.w3.org/WAI/tutorials/page-structure/content/#lists">semantičnih seznamih.</a>',
      QA_UPPERCASE: 'Našli ste vse kapice. Nekateri bralniki zaslona lahko besedilo z veliko začetnico razumejo kot kratico in preberejo vsako črko posebej. Poleg tega se nekaterim zdi, da je vse velike črke težje brati, in lahko dajejo vtis, kot da bi kričali.',
      QA_UNDERLINE: 'Podčrtano besedilo je mogoče zamenjati s povezavami. Razmislite o uporabi drugega sloga, kot je <code>&lt;strong&gt;</code><strong>pomembnost</strong><code>&lt;/strong&gt;</code> ali <code>&lt;em&gt;</code><em>izraz</em><code>&lt;/em&gt;</code>.',
      QA_SUBSCRIPT: 'Možnosti oblikovanja pod- in nad-skript se lahko uporabljata le za spreminjanje položaja besedila zaradi tipografskih konvencij ali standardov. Ne smete jih <strong>uporabljati</strong> izključno za namene predstavitve ali videza. Oblikovanje celotnih stavkov povzroča težave z berljivostjo. Primerni primeri uporabe bi vključevali prikaz eksponentov, vrstilnih števil, kot je 4<sup>ti</sup> namesto četrti, in kemijskih formul (npr. H<sub>2</sub>O).',
      QA_NESTED_COMPONENTS: 'Izogibajte se gnezdenju interaktivnih komponentov postavitve, kot je postavljanje akordeonov znotraj zavihkov ali zavihkov znotraj akordeonov. To lahko zaplete navigacijo, poveča kognitivno obremenitev in povzroči, da ljudje spregledajo vsebino.',
      QA_JUSTIFY: 'Izogibajte se uporabi poravnanega besedila, ki je poravnano tako na levi kot na desni rob. Zaradi neenakomernih presledkov med besedami je lahko za nekatere ljudi težko berljivo. Uporabite levo poravnano besedilo za boljšo berljivost.',
      QA_SMALL_TEXT: 'Majhno besedilo je težje brati, zlasti za osebe s slabim vidom. Za boljšo berljivost se izogibajte uporabi velikosti pisave, ki so manjše od privzetih.',

      // Shared
      ACC_NAME: '<strong {B}>Dostopno ime</strong> %(TEXT)',
      ACC_NAME_TIP: '<hr> <strong>Nasvet!</strong> "Dostopno ime" je končna oznaka, ki se sporoča ljudem, ki uporabljajo pripomočke, in se izračuna z ARIA. To jim pomaga razumeti namen povezave ali gumba.',
      HIDDEN_FOCUSABLE: 'Povezava ali gumb ima <code>aria-hidden=&quot;true&quot;</code>, vendar je še vedno dostopen s tipkovnico. Če nameravate skriti podvojeno povezavo ali gumb, dodajte tudi <code>tabindex=&quot;-1&quot;</code>. V nasprotnem primeru se <code>aria-hidden=&quot;true&quot;</code> ne sme uporabljati na elementih, ki lahko prejmejo fokus. <hr> Več o <a href="https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/Attributes/aria-hidden">atributu aria-hidden.</a>',

      // Developer
      DUPLICATE_ID: 'Najden <strong>podvojen ID</strong>. Znano je, da napake z dvojnim ID povzročajo težave podpornim tehnologijam, ko poskušajo sodelovati z vsebino. Prosimo, odstranite ali spremenite naslednji ID. <hr> <strong {B}>ID</strong> <strong {C}>#%(id)</strong>',
      UNCONTAINED_LI: 'Vse <code>&lt;li&gt;</code> postavke seznama morajo biti nameščene znotraj <code>&lt;ul&gt;</code> neurejenih ali <code>&lt;ol&gt;</code> urejenih elementov. Ta struktura pomaga bralnikom zaslona natančno napovedati seznam in njegove postavke.',
      TABINDEX_ATTR: 'Element ne sme imeti atributa <code>tabindex</code>, ki je večji od 0.',

      // Meta checks
      META_LANG: 'Jezik strani ni prijavljen! Prosimo, da <a href="https://www.w3.org/International/questions/qa-html-language-declarations">deklarirate jezik na oznaki HTML.</a>',
      META_TITLE: 'Manjka naslov strani! Navedite <a href="https://developer.mozilla.org/sl/docs/Web/HTML/Element/title">naslov strani.</a>',
      META_SCALABLE: 'Odstranite parameter <code>user-scalable="no"</code> v <a href="https://developer.mozilla.org/en-US/docs/Web/HTML/Viewport_meta_tag">meta oznaki pogleda</a>, da omogočite povečavo.',
      META_MAX: 'Poskrbite, da parameter <code>maximum-scale</code> v <a href="https://developer.mozilla.org/en-US/docs/Web/HTML/Viewport_meta_tag">meta oznaki pogleda</a> ni manjši od 2.',
      META_REFRESH: 'Stran se ne sme samodejno osveževati z uporabo meta oznake.',

      // Buttons
      BTN_EMPTY: 'Gumb nima dostopnega imena, ki bi opisovalo njegov namen.',
      BTN_EMPTY_LABELLEDBY: 'Gumb ima vrednost <code>aria-labelledby</code>, ki je prazna ali se ne ujema z vrednostjo <code>id</code> drugega elementa na strani.',
      BTN: 'gumb',
      BTN_TIP: 'Naučite se, kako narediti <a href="https://www.sarasoueidan.com/blog/accessible-icon-buttons/">dostopen gumb.</a>',
      BTN_ROLE_IN_NAME: 'Ne vključujte besede „gumb“ v ime gumba. Bralniki zaslona že posredujejo vlogo elementa poleg njegovega imena.',
      LABEL_IN_NAME: 'Vidno besedilo za ta element se zdi drugačno od dostopnega imena, kar lahko povzroči zmedo pri uporabnikih podpornih tehnologij. Preverite: <hr> <strong {B}>Dostopno ime</strong> <strong {C}>%(TEXT)</strong>',

      // Tables
      TABLES_MISSING_HEADINGS: 'Manjkajo glave tabel! Dostopne tabele potrebujejo oznako HTML, ki označuje celice z glavo in podatkovne celice ter določa njihovo razmerje. Te informacije zagotavljajo kontekst ljudem, ki uporabljajo podporno tehnologijo. Tabele je treba uporabljati samo za tabelarne podatke. <hr> Preberite več o <a href="https://www.w3.org/WAI/tutorials/tables/">dostopnih tabelah.</a>',
      TABLES_SEMANTIC_HEADING: 'Semantične naslove, kot sta Heading 2 ali Heading 3, lahko uporabljate samo za dele vsebine; <strong>ne</strong> v tabelah HTML. Namesto tega naslove tabel označite z elementom <code>&lt;th&gt;</code>. <hr> Preberite več o <a href="https://www.w3.org/WAI/tutorials/tables/">dostopnih tabelah.</a>',
      TABLES_EMPTY_HEADING: 'Najden je prazen naglavni del tabele! Glave tabel ne smejo biti nikoli prazne. Pomembno je, da označite glave vrstic in/ali stolpcev in tako izrazite njihovo povezanost. Te informacije zagotavljajo kontekst za osebe, ki uporabljajo podporno tehnologijo. Ne pozabite, da je treba tabele uporabljati samo za tabelarične podatke. <hr> Preberite več o <a href="https://www.w3.org/WAI/tutorials/tables/">dostopnih tabelah.</a>',

      // Contrast
      CONTRAST_NORMAL: 'Besedilo običajne velikosti mora imeti kontrastno razmerje vsaj %(RATIO).',
      CONTRAST_LARGE: 'Veliko besedilo mora imeti kontrastno razmerje vsaj %(RATIO).',
      CONTRAST_ERROR: 'Besedilo nima dovolj kontrasta s ozadjem, zaradi česar je težje berljivo.',
      CONTRAST_WARNING: 'Kontrast tega besedila je neznan in ga je treba ročno pregledati. Prepričajte se, da imata besedilo in ozadje močan kontrast.',
      CONTRAST_ERROR_GRAPHIC: 'Grafika nima dovolj kontrasta s ozadjem, zaradi česar je težje vidna.',
      CONTRAST_WARNING_GRAPHIC: 'Kontrast te grafike je neznan in ga je treba ročno pregledati.',
      CONTRAST_TIP_GRAPHIC: 'Grafike in uporabniški vmesniki morajo imeti kontrastno razmerje vsaj 3:1.',
      CONTRAST_OPACITY: 'Povečajte neprosojnost za boljšo vidljivost.',
      CONTRAST_APCA: 'To nima dovolj kontrasta za katero koli velikost besedila. Razmislite o uporabi te kombinacije barv in velikosti besedila?',
      CONTRAST_COLOR: 'Razmislite o uporabi te barve namesto te?',
      CONTRAST_SIZE: 'Razmislite o povečanju velikosti besedila za to barvno kombinacijo?',
      CONTRAST_PLACEHOLDER: 'Nadomestno besedilo v tem vnosnem polju nima dovolj kontrasta s ozadjem, zaradi česar je težje berljivo.',
      CONTRAST_PLACEHOLDER_UNSUPPORTED: 'Kontrast tega nadomestnega besedila ni znan in ga je treba ročno pregledati. Poskrbite, da imata besedilo in ozadje močno kontrastne barve.',
      CONTRAST_INPUT: 'Besedilo v tem vnosnem polju nima dovolj kontrasta s ozadjem, zaradi česar je težje berljivo.',
      CONTRAST: 'Kontrast',
      UNKNOWN: 'Neznano',
      FG: 'Sprednji načrt',
      BG: 'Ozadje',
      NO_SUGGESTION: 'Ni mogoče najti dostopne kombinacije samo s spremembo barve besedila. Poskusite spremeniti barvo ozadja.',
    },
  };

  return sl;

}));
