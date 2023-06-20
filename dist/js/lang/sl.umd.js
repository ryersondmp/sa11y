
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
(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
  typeof define === 'function' && define.amd ? define(factory) :
  (global = typeof globalThis !== 'undefined' ? globalThis : global || self, global.Sa11yLangSl = factory());
})(this, (function () { 'use strict';

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
      OUTLINE: 'Osnutek strani',
      PAGE_ISSUES: 'Vprašanja strani',
      SETTINGS: 'Nastavitve',
      CONTRAST: 'Kontrast',
      FORM_LABELS: 'Nalepke na obrazcih',
      LINKS_ADVANCED: 'Povezave (za napredne uporabnike)',
      DARK_MODE: 'Temni način',
      SHORTCUT_SCREEN_READER: 'Preskoči na številko. Bližnjica do tipkovnice: Alt S',
      SHORTCUT_TOOLTIP: 'Preskoči na vprašanje',
      NEW_TAB: 'Odpre nov zavihek',
      PANEL_HEADING: 'Preverjanje dostopnosti',
      PANEL_STATUS_NONE: 'Ni bilo najdenih napak.',
      PANEL_ICON_WARNINGS: 'najdenih opozoril.',
      PANEL_ICON_TOTAL: 'skupno število najdenih vprašanj.',
      NOT_VISIBLE_ALERT: 'Element, ki si ga želite ogledati, ni viden; morda je skrit ali pa je znotraj komponente harmonike ali zavihka. Tukaj je predogled:',
      ERROR_MISSING_ROOT_TARGET: 'Celotna stran je bila preverjena glede dostopnosti, ker ciljno območje <code>%(root)</code> ne obstaja.',
      HEADING_NOT_VISIBLE_ALERT: 'Glava ni vidna; lahko je skrita ali znotraj komponente harmonike ali zavihka.',
      SKIP_TO_PAGE_ISSUES: 'Preskoči na stran Vprašanja',
      CONSOLE_ERROR_MESSAGE: 'Opravičujemo se, vendar je na tej strani prišlo do težave s preverjanjem dostopnosti. Ali jo lahko <a href="%(link)">prijavite prek tega obrazca</a> ali na <a href="%(link)">GitHub</a>?',
      PANEL_DISMISS_BUTTON: 'Prikaži %(dismissCount) zavrnjenih opozoril',
      DISMISS: 'Zavrnite',
      DISMISSED: 'Zavrnjena opozorila',
      DISMISS_REMINDER: 'Upoštevajte, da so opozorila le <strong>začasno</strong> zavrnjena. Z brisanjem zgodovine brskalnika in piškotkov se bodo na vseh straneh obnovila vsa predhodno zavrnjena opozorila.',
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
      COLOUR_FILTER_HIGH_CONTRAST_MESSAGE: 'Barvni filtri ne delujejo v načinu visokega kontrasta.',
      SUSPICIOUS_ALT_STOPWORDS: [
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
        'kliknite tukaj za več informacij.',
        'kliknite tukaj',
        'kliknite tukaj.',
        'si oglejte',
        'podrobno tukaj',
        'podrobno tukaj.',
        'prenesi',
        'prenesi tukaj',
        'prenesi tukaj.',
        'ugotovite',
        'izvedite več',
        'izveste več.',
        'izvedeti več >',
        'obrazec',
        'tukaj',
        'tukaj.',
        'informacije',
        'informacije',
        'povezava',
        'naučite se',
        'več informacij',
        'Več informacij.',
        'Več informacij >',
        'se naučite',
        'več',
        'več >',
        'stran',
        'papir',
        'preberi več',
        'Preberite več >',
        'Preberite',
        'preberi to',
        'ta',
        'ta stran',
        'na tej strani.',
        'to spletno mesto',
        'to spletno mesto.',
        'ogled',
        'si oglejte naš',
        'spletna stran',
      ],
      WARNING_ALT_STOPWORDS: [
        'kliknite tukaj',
      ],
      NEW_WINDOW_PHRASES: [
        'zunanji',
        'nov zavihek',
        'novo okno',
        'pop-up',
        'pojaviti se',
      ],
      FILE_TYPE_PHRASES: ['dokument', 'preglednica', 'računski list', 'stisnjena datoteka', 'arhivirana datoteka', 'delovni list', 'powerpoint', 'predstavitev', 'namestitev', 'video', 'zvok', 'pdf'],
      LANG_READABILITY: 'Berljivost',
      LANG_AVG_SENTENCE: 'Povprečno število besed na stavek:',
      LANG_COMPLEX_WORDS: 'Kompleksne besede:',
      LANG_TOTAL_WORDS: 'Besede:',
      LANG_VERY_DIFFICULT: 'Zelo težko',
      LANG_DIFFICULT: 'Težavno',
      LANG_FAIRLY_DIFFICULT: 'Precej težko',
      LANG_GOOD: 'Dobro',
      READABILITY_NO_P_OR_LI_MESSAGE: 'Ni mogoče izračunati ocene berljivosti. Ni najden odstavek <code>&lt;p&gt;</code> ali vsebina seznama <code>&lt;li&gt;</code>.',
      READABILITY_NOT_ENOUGH_CONTENT_MESSAGE: 'Premalo vsebine za izračun ocene berljivosti.',
      HEADING_NON_CONSECUTIVE_LEVEL: 'Uporabljena je raven brez zaporednih naslovov. Naslovi nikoli ne smejo preskočiti ravni ali preiti iz <strong>Nadpis %(prevLevel)</strong> na <strong {r}>Nadpis %(level)</strong>.',
      HEADING_EMPTY: 'Najden je bil prazen naslov! To popravite tako, da izbrišete to vrstico ali spremenite njeno obliko iz <strong {r}>Glavica %(level)</strong> v <strong>Normalno</strong> ali <strong>Odstavek</strong>.',
      HEADING_LONG: 'Smer je dolga! Naslovi se uporabljajo za urejanje vsebine in izražanje strukture. Biti morajo kratki, informativni in edinstveni. Naj bodo naslovi krajši od 160 znakov (največ en stavek). <hr> Število znakov: <strong {r}>%(headingLength)</strong>',
      HEADING_FIRST: 'Prvi naslov na strani mora biti običajno naslov 1 ali 2. Naslov 1 mora biti začetek poglavja z glavno vsebino in je glavni naslov, ki opisuje splošni namen strani. Preberite več o <a href="https://www.w3.org/WAI/tutorials/page-structure/headings/">Strukturi naslovov.</a>',
      HEADING_MISSING_ONE: 'Manjka naslov 1. Naslov 1 mora biti začetek glavnega vsebinskega področja in je glavni naslov, ki opisuje splošni namen strani. Preberite več o <a href="https://www.w3.org/WAI/tutorials/page-structure/headings/">Strukturi naslovov.</a>',
      HEADING_EMPTY_WITH_IMAGE: 'Naslov nima besedila, vsebuje pa sliko. Če to ni naslov, spremenite njegovo obliko iz <strong {r}>Nadpis %(level)</strong> v <strong>Normalno</strong> ali <strong>Odstavek</strong>. V nasprotnem primeru sliki dodajte besedilo alt, če ni okrasno.',
      PANEL_HEADING_MISSING_ONE: 'Manjka naslov 1!',
      LINK_EMPTY: 'Odstranite prazne povezave brez besedila.',
      LINK_EMPTY_LINK_NO_LABEL: 'Povezava nima razločljivega besedila, ki bi bilo vidno za bralnike zaslona in drugo podporno tehnologijo. Popravek: </li><li>Dodajte nekaj jedrnatega besedila, ki opisuje, kam vas bo povezava pripeljala.</li><li>Če gre za povezavo <a href="https://a11y-101.com/development/icons-and-links">ikona ali SVG,</a>, ji verjetno manjka opisna oznaka.</li><li>Če menite, da je ta povezava napaka zaradi napake pri kopiranju/prilepljanju, razmislite o njenem izbrisu.</li></ul>',
      LINK_LABEL: '<strong>Etiketa povezave:</strong> %(sanitizedText)',
      LINK_STOPWORD: 'Besedilo povezave morda ni dovolj opisno, če ni v kontekstu: <strong {r}>%(error)</strong><hr><strong>Tip!</strong> Besedilo povezave mora biti vedno jasno, edinstveno in smiselno. Izogibajte se pogostim besedam, kot sta &quot;kliknite tukaj&quot; ali &quot;izvedeti več&quot;',
      LINK_BEST_PRACTICES: 'Razmislite o zamenjavi besedila povezave: <strong {r}>%(error)</strong><hr><ul><li>&quot;Kliknite tukaj&quot; se osredotoča na mehaniko miške, čeprav veliko ljudi ne uporablja miške ali pa si to spletno mesto morda ogleduje na mobilni napravi. Razmislite o uporabi drugega glagola, ki se nanaša na nalogo.</li><li>Izogibajte se uporabi simbolov HTML kot klicev k dejanjem, razen če so skriti za podporne tehnologije.</li></ul>',
      LINK_URL: 'Daljše in manj razumljive naslove URL, ki se uporabljajo kot besedilo povezav, je morda težko poslušati s pomožno tehnologijo. V večini primerov je bolje, da namesto URL-ja uporabite človeku berljivo besedilo. Kratki naslovi URL (kot je domača stran spletnega mesta) so v redu.<hr><strong>Tip!</strong> Besedilo povezave mora biti vedno jasno, edinstveno in smiselno, da ga je mogoče razumeti brez konteksta.',
      LINK_DOI: 'Pri spletnih straneh ali spletnih virih vodnik <a href="https://apastyle.apa.org/style-grammar-guidelines/paper-format/accessibility/urls#:~:text=descriptive%20links">APA Style</a> priporoča uporabo opisnih povezav, tako da URL ali DOI dela ovijete okoli njegovega naslova. Daljši in manj razumljivi naslovi URL, ki se uporabljajo kot besedilo povezave, so lahko pri dostopu s pomožno tehnologijo težko razumljivi.',
      NEW_TAB_WARNING: 'Povezava se brez opozorila odpre v novem zavihku ali oknu. To je lahko moteče, zlasti za ljudi, ki imajo težave z zaznavanjem vizualne vsebine. Drugič, ni vedno dobra praksa, da bi nadzorovali izkušnjo nekoga ali sprejemali odločitve namesto njega. Navedite, da se povezava odpre v novem oknu, v besedilu povezave<hr><strong>Tip!</strong> Spoznajte najboljše prakse: <a href="https://www.nngroup.com/articles/new-browser-windows-and-tabs/">odpiranje povezav v novih oknih in zavihkih brskalnika.</a>',
      FILE_TYPE_WARNING: 'Povezava kaže na datoteko PDF ali datoteko za prenos (npr. MP3, Zip, Wordov dokument) brez opozorila. V besedilu povezave navedite vrsto datoteke. Če gre za veliko datoteko, razmislite o vključitvi velikosti datoteke.<hr><strong>Primer:</strong> Izvršno poročilo (PDF, 3 MB)',
      LINK_IDENTICAL_NAME: 'Povezava ima enako besedilo kot druga povezava, čeprav kaže na drugo stran. Več povezav z enakim besedilom lahko povzroči zmedo pri ljudeh, ki uporabljajo bralnike zaslona.<hr>Premislite, ali naj bo naslednja povezava bolj opisna, da jo boste lažje razlikovali od drugih povezav: <strong {r}>%(sanitizedText)</strong>',
      MISSING_ALT_LINK_BUT_HAS_TEXT_MESSAGE: 'Slika se uporablja kot povezava z okoliškim besedilom, čeprav bi moral biti atribut alt označen kot okrasni ali ničen.',
      MISSING_ALT_LINK_MESSAGE: 'Slika se uporablja kot povezava, vendar nima besedila Alt! Prepričajte se, da besedilo alt opisuje, kam vas bo povezava pripeljala.',
      MISSING_ALT_MESSAGE: 'Manjka besedilo alt! Če slika sporoča zgodbo, razpoloženje ali pomembne informacije, jo obvezno opišite.',
      LINK_IMAGE_BAD_ALT_MESSAGE: 'Najdena razširitev datoteke v besedilu alt. Prepričajte se, da besedilo alt opisuje cilj povezave in ne dobesednega opisa slike. Odstrani: <strong {r}>%(error)</strong>.<hr><strong>Vrstično besedilo:</strong> %(altText)',
      LINK_IMAGE_PLACEHOLDER_ALT_MESSAGE: 'V povezani sliki je bilo najdeno neopisno ali nadomestno besedilo alt. Prepričajte se, da besedilo alt opisuje cilj povezave in ne dobesednega opisa slike. Zamenjajte naslednje besedilo alt: <strong {r}>%(altText)</strong>',
      LINK_IMAGE_SUS_ALT_MESSAGE: 'Pomožne tehnologije že označujejo, da gre za sliko, zato je &quot;<strong {r}>%(error)</strong>&quot; morda odveč. Zagotovite, da besedilo alt opisuje cilj povezave in ne dobesednega opisa slike. <hr> <strong>Vrstično besedilo:</strong> %(altText)',
      LINK_ALT_HAS_BAD_WORD_MESSAGE: 'Najdena razširitev datoteke v besedilu alt. Če slika sporoča zgodbo, razpoloženje ali pomembne informacije, jo obvezno opišite. Odstrani: <strong {r}>%(error)</strong>.<hr><strong>Tekst besedila:</strong> %(altText)',
      ALT_PLACEHOLDER_MESSAGE: 'Najdeno neopisno ali nadomestno besedilo alt. Naslednje besedilo alt zamenjajte z bolj smiselnim: <strong {r}>%(altText)</strong>',
      ALT_HAS_SUS_WORD: 'Pomožne tehnologije že označujejo, da gre za sliko, zato je &quot;<strong {r}>%(error)</strong>&quot; morda odveč. <hr> <strong>Tekst besedila:</strong> %(altText)',
      LINK_IMAGE_ARIA_HIDDEN: 'Povezava okoli slike ima <code>aria-hidden=&quot;true&quot;</code>, vendar jo je še vedno mogoče fokusirati s tipkovnico. Če želite skriti odvečno ali podvojeno povezavo, dodajte tudi <code>tabindex=&quot;-1&quot;</code>.',
      LINK_IMAGE_NO_ALT_TEXT: 'Slika v povezavi je označena kot okrasna in nima besedila povezave. Sliki dodajte besedilo alt, ki opisuje cilj povezave.',
      LINK_IMAGE_HAS_TEXT: 'Slika je označena kot dekorativna, čeprav povezava uporablja okoliško besedilo kot opisno oznako.',
      LINK_IMAGE_LONG_ALT: 'Opis besedila Alt na povezani sliki je <strong>predolg</strong>. Besedilo alt na povezanih slikah mora opisovati, kam vodi povezava, in ne dobesednega opisa slike. <strong>Premislite, da bi kot altovsko besedilo uporabili naslov strani, na katero vodi povezava.</strong> <hr> <strong>Alt besedilo (<span {r}>%(altLength)</span> znakov):</strong> %(altText)',
      LINK_IMAGE_ALT_WARNING: 'Povezava do slike vsebuje besedilo alt. <strong>Ali besedilo opisuje, kam vas bo povezava pripeljala?</strong> Razmislite o uporabi naslova strani, na katero vodi povezava, kot alt besedila. <hr> <strong>Temeljno besedilo:</strong> %(altText)',
      LINK_IMAGE_ALT_AND_TEXT_WARNING: 'Slikovna povezava vsebuje <strong>oboje besedilo alt in okoliško besedilo povezave.</strong> Če je ta slika okrasna in se uporablja kot funkcionalna povezava na drugo stran, razmislite o označitvi slike kot okrasne ali ničelne - okoliško besedilo povezave bi moralo zadostovati. <hr> <strong>Tekst besedila:</strong> %(altText)',
      IMAGE_FIGURE_DECORATIVE: 'Slika je označena kot <strong>dekorativna</strong> in jo podporna tehnologija ne bo upoštevala. <hr> Čeprav je bil naveden <strong>naslov</strong>, bi morala imeti slika v večini primerov tudi alt besedilo. <ul><li>Temeljno besedilo mora vsebovati jedrnat opis tega, kar je na sliki.</li><li>Podpis mora običajno zagotavljati kontekst, ki sliko povezuje z okoliško vsebino, ali opozarjati na določeno informacijo.</li></ul>Preberi več: <a href="https://thoughtbot.com/blog/alt-vs-figcaption#the-figcaption-element">alt v primerjavi s figcaption.</a>',
      IMAGE_FIGURE_DUPLICATE_ALT: 'Ne uporabljajte istih besed za besedilo alta in napisa. Bralniki zaslona bodo informacije objavili dvakrat.<ul><li> Besedilo alt mora vsebovati kratek opis tega, kar je na sliki.</li><li>Podpis mora običajno vsebovati kontekst, ki sliko povezuje z okoliško vsebino, ali pa opozarja na določeno informacijo.</li></ul> Več informacij: <a href="https://thoughtbot.com/blog/alt-vs-figcaption#the-figcaption-element">alt v primerjavi s figcaption.</a> <hr> <strong>Vrstično besedilo:</strong> %(altText)',
      IMAGE_DECORATIVE: 'Slika je označena kot <strong>dekorativna</strong> in jo podporna tehnologija ne bo upoštevala. Če slika sporoča zgodbo, razpoloženje ali pomembne informacije, obvezno dodajte dodatno besedilo.',
      IMAGE_ALT_TOO_LONG: 'Opis besedila Alt je <strong>predolg</strong>. Besedilo Alt mora biti jedrnato, vendar smiselno kot <em>tweet</em> (približno 100 znakov). Če gre za zapleteno sliko ali graf, razmislite o tem, da bi dolg opis slike umestili v spodnje besedilo ali komponento harmonike. <hr> <strong>Tekst besedila (<span {r}>%(altLength)</span> znakov):</strong> %(altText)',
      IMAGE_PASS: '<strong>Tekst besedila:</strong> %(altText)',
      LABELS_MISSING_IMAGE_INPUT_MESSAGE: 'V gumbu za sliko manjka besedilo alt. Dodajte besedilo alt in zagotovite dostopno ime. Na primer: <em>Poišči</em> ali <em>Oddaj</em>.',
      LABELS_INPUT_RESET_MESSAGE: 'Gumbe za ponastavitev <strong>ne smete uporabljati, razen če je to posebej potrebno, saj jih je mogoče zlahka aktivirati po pomoti. <hr> <strong>Tip!</strong> Preberite, zakaj <a href="https://www.nngroup.com/articles/reset-and-cancel-buttons/">Gumbova Reset in Cancel predstavljata težave z uporabnostjo.</a>',
      LABELS_ARIA_LABEL_INPUT_MESSAGE: 'Vnos ima dostopno ime, vendar poskrbite, da je vidna tudi nalepka. <hr> Dostopno ime za ta vnos je: <strong>%(sanitizedText)</strong>',
      LABELS_NO_FOR_ATTRIBUTE_MESSAGE: 'S tem vnosom ni povezana nobena oznaka. Dodajte atribut <code>for</code> oznaki, ki ustreza <code>id</code> tega vnosa. <hr> ID tega vnosa je: <strong>id=&#34;%(id)&#34;</strong>.',
      LABELS_MISSING_LABEL_MESSAGE: 'S tem vnosom ni povezana nobena oznaka. Dodajte <code>id</code> temu vnosu in dodajte ustrezen atribut <code>for</code> oznaki.',
      EMBED_VIDEO: 'Poskrbite, da bodo <strong>vsi videoposnetki opremljeni s podnapisi.</strong> Zagotavljanje podnapisov za vse zvočne in video vsebine je obvezna zahteva na ravni A. Podnapisi so v pomoč gluhim in naglušnim osebam.',
      EMBED_AUDIO: 'Za vse podcaste zagotovite <strong>prepis.</strong> Zagotavljanje prepisov za zvočne vsebine je obvezna zahteva na ravni A. Prepisi so v pomoč gluhim in naglušnim osebam, koristijo pa lahko vsem. Razmislite o tem, da bi prepis umestili pod ali v akordno ploščo.',
      EMBED_DATA_VIZ: 'Tovrstni pripomočki za vizualizacijo podatkov so pogosto problematični za osebe, ki za navigacijo uporabljajo tipkovnico ali bralnik zaslona, in lahko predstavljajo veliko težavo za slabovidne ali barvno slepe osebe. Priporočljivo je, da pod gradnikom zagotovite enake informacije v alternativni obliki (besedilo ali tabela). <hr> Preberite več o <a href="https://www.w3.org/WAI/tutorials/images/complex">kompleksnih slikah.</a>',
      EMBED_MISSING_TITLE: 'Vgrajena vsebina potrebuje dostopno ime, ki opisuje njeno vsebino. V elementu <code>iframe</code> navedite edinstven atribut <code>title</code> ali <code>aria-label</code>. Preberite več o <a href="https://dequeuniversity.com/tips/provide-iframe-titles">iFrames.</a>',
      EMBED_GENERAL_WARNING: 'Ni mogoče preveriti vdelane vsebine. Prepričajte se, da imajo slike alternativno besedilo, videoposnetki podnapise, da je besedilo dovolj kontrastno in da so interaktivne komponente <a href="https://webaim.org/techniques/keyboard/">dostopne s tipkovnice.</a>',
      QA_BAD_LINK: 'Najdena slaba povezava. Zdi se, da povezava kaže na razvojno okolje. <hr> Ta povezava kaže na: <br> <strong {r}>%(el)</strong>',
      QA_BAD_ITALICS: 'Oznake krepko in poševno imajo semantični pomen in se ne smejo uporabljati za poudarjanje celotnih odstavkov. Krepko označeno besedilo je treba uporabiti za močno <strong>izpostavitev</strong> besede ali besedne zveze. Ležečo pisavo je treba uporabljati za poudarjanje lastnih imen (npr. naslovov knjig in člankov), tujih besed, narekovajev. Dolgi citati morajo biti oblikovani kot blokovski citati.',
      QA_PDF: 'Ni mogoče preveriti dostopnosti datotek PDF. Datoteke PDF veljajo za spletno vsebino in morajo biti prav tako dostopne. Datoteke PDF pogosto vsebujejo težave za ljudi, ki uporabljajo bralnike zaslona (manjkajoče strukturne oznake ali manjkajoče oznake polj obrazca), in ljudi s slabim vidom (besedilo se ne preliva, ko je povečano). <ul><li>Če gre za obrazec, razmislite o uporabi dostopnega obrazca HTML kot alternative.</li><li>Če gre za dokument, razmislite o pretvorbi v spletno stran.</li></ul>V nasprotnem primeru preverite <a href="https://helpx.adobe.com/acrobat/using/create-verify-pdf-accessibility.html">PDF za dostopnost v programu Acrobat DC.</a>',
      QA_DOCUMENT: 'Dokumenta ni mogoče preveriti glede dostopnosti. Povezani dokumenti veljajo za spletno vsebino in morajo biti prav tako dostopni. Ta dokument preglejte ročno. <ul><li>Povečajte dostopnost svojega <a href="https://support.google.com/docs/answer/6199477?hl=sl">dokumenta ali predstavitve Google Workspace.</a></li><li>Povečajte dostopnost svojih <a href="https://support.microsoft.com/sl/office/create-accessible-office-documents-868ecfcd-4f00-4224-b881-a65537a7c155">dokumentov Office.</a></li></ul>',
      QA_PAGE_LANGUAGE: 'Jezik strani ni prijavljen! Prosimo, da <a href="https://www.w3.org/International/questions/qa-html-language-declarations">deklarirate jezik na oznaki HTML.</a>',
      QA_PAGE_TITLE: 'Manjka naslov strani! Navedite <a href="https://developer.mozilla.org/sl/docs/Web/HTML/Element/title">naslov strani.</a>',
      QA_BLOCKQUOTE_MESSAGE: 'Ali je to naslov? <strong {r}>%(sanitizedText)</strong> <hr> Okvirne narekovaje je treba uporabljati samo za citate. Če naj bi bil to naslov, spremenite ta blokovnik v semantični naslov (npr. naslov 2 ali naslov 3).',
      QA_FAKE_HEADING: 'Ali je to naslov? <strong {r}>%(boldtext)</strong> <hr> Vrstica krepkega ali velikega besedila je lahko videti kot naslov, vendar oseba, ki uporablja bralnik zaslona, ne more ugotoviti, da je besedilo pomembno, ali preiti na njegovo vsebino. Krepko ali veliko besedilo ne sme nikoli nadomestiti semantičnih naslovov (naslovi od 2 do 6).',
      QA_SHOULD_BE_LIST: 'Želite ustvariti seznam? Najden je možen element seznama: <strong {r}>%(firstPrefix)</strong> <hr> Prepričajte se, da uporabljate semantične sezname tako, da namesto tega uporabite gumbe za oblikovanje kroglic ali številk. Pri uporabi semantičnega seznama lahko podporne tehnologije posredujejo informacije, kot sta skupno število elementov in relativni položaj vsakega elementa na seznamu. Preberite več o <a href="https://www.w3.org/WAI/tutorials/page-structure/content/#lists">semantičnih seznamih.</a>',
      QA_UPPERCASE_WARNING: 'Našli ste vse kapice. Nekateri bralniki zaslona lahko besedilo z veliko začetnico razumejo kot kratico in preberejo vsako črko posebej. Poleg tega se nekaterim zdi, da je vse velike črke težje brati, in lahko dajejo vtis, kot da bi kričali.',
      QA_DUPLICATE_ID: 'Najden <strong>podvojen ID</strong>. Znano je, da napake z dvojnim ID povzročajo težave podpornim tehnologijam, ko poskušajo sodelovati z vsebino. <hr> Prosimo, odstranite ali spremenite naslednji ID: <strong {r}>%(id)</strong>',
      QA_TEXT_UNDERLINE_WARNING: 'Podčrtano besedilo je mogoče zamenjati s povezavami. Razmislite o uporabi drugega sloga, kot je <code>&lt;strong&gt;</code><strong>pomembnost</strong><code>&lt;/strong&gt;</code> ali <code>&lt;em&gt;</code><em>izraz</em><code>&lt;/em&gt;</code>.',
      QA_SUBSCRIPT_WARNING: 'Možnosti oblikovanja pod- in nad-skript se lahko uporabljata le za spreminjanje položaja besedila zaradi tipografskih konvencij ali standardov. Ne smete jih <strong>uporabljati</strong> izključno za namene predstavitve ali videza. Oblikovanje celotnih stavkov povzroča težave z berljivostjo. Primerni primeri uporabe bi vključevali prikaz eksponentov, vrstilnih števil, kot je 4<sup>ti</sup> namesto četrti, in kemijskih formul (npr. H<sub>2</sub>O).',
      TABLES_MISSING_HEADINGS: 'Manjkajo glave tabel! Dostopne tabele potrebujejo oznako HTML, ki označuje celice z glavo in podatkovne celice ter določa njihovo razmerje. Te informacije zagotavljajo kontekst ljudem, ki uporabljajo podporno tehnologijo. Tabele je treba uporabljati samo za tabelarne podatke. <hr> Preberite več o <a href="https://www.w3.org/WAI/tutorials/tables/">dostopnih tabelah.</a>',
      TABLES_SEMANTIC_HEADING: 'Semantične naslove, kot sta Heading 2 ali Heading 3, lahko uporabljate samo za dele vsebine; <strong>ne</strong> v tabelah HTML. Namesto tega naslove tabel označite z elementom <code>&lt;th&gt;</code>. <hr> Preberite več o <a href="https://www.w3.org/WAI/tutorials/tables/">dostopnih tabelah.</a>',
      TABLES_EMPTY_HEADING: 'Najden je prazen naglavni del tabele! Glave tabel ne smejo biti nikoli prazne. Pomembno je, da označite glave vrstic in/ali stolpcev in tako izrazite njihovo povezanost. Te informacije zagotavljajo kontekst za osebe, ki uporabljajo podporno tehnologijo. Ne pozabite, da je treba tabele uporabljati samo za tabelarične podatke. <hr> Preberite več o <a href="https://www.w3.org/WAI/tutorials/tables/">dostopnih tabelah.</a>',
      CONTRAST_ERROR: 'Besedilo ni dovolj kontrastno glede na ozadje. Kontrastno razmerje bi moralo biti vsaj 4,5:1 za običajno besedilo in 3:1 za veliko besedilo. <hr> Kontrastno razmerje je <strong {r}>%(cratio)</strong> za naslednje besedilo: <strong {r}>%(sanitizedText)</strong>',
      CONTRAST_WARNING: 'Kontrast tega besedila ni znan in ga je treba ročno preveriti. Prepričajte se, da imata besedilo in ozadje močno kontrastne barve. Kontrastno razmerje mora biti vsaj 4,5 : 1 za običajno besedilo in 3 : 1 za veliko besedilo. <hr> <strong>Prosimo, preglejte:</strong> %(sanitizedText)',
      CONTRAST_INPUT_ERROR: 'Besedilo v tem vnosu ni dovolj kontrastno z ozadjem. Kontrastno razmerje mora biti vsaj 4,5 : 1 za običajno besedilo in 3 : 1 za veliko besedilo. <hr> Kontrastno razmerje: <strong {r}>%(cratio)</strong>',
    },
  };

  return sl;

}));
