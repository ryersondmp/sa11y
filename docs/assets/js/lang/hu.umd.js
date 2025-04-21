
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
  (global = typeof globalThis !== 'undefined' ? globalThis : global || self, global.Sa11yLangHu = factory());
})(this, (function () { 'use strict';

  /*! WARNING: This is a machine-generated translation and may contain errors or inaccuracies. */
  var hu = {
    // Hungarian
    strings: {
      LANG_CODE: 'hu',
      MAIN_TOGGLE_LABEL: 'Ellenőrizze az elérhetőséget',
      CONTAINER_LABEL: 'Akadálymentesítési ellenőrző',
      ERROR: 'Hiba',
      ERRORS: 'Hibák',
      WARNING: 'Figyelmeztetés',
      WARNINGS: 'Figyelmeztetések',
      GOOD: 'Jó',
      ON: 'A oldalon.',
      OFF: 'Off',
      ALERT_TEXT: 'Riasztás',
      ALERT_CLOSE: 'Zárja be a',
      OUTLINE: 'Vázlat',
      READABILITY_DESC: 'Megjeleníti az olvashatósági pontszámot a <strong>Vázlat</strong> lapon, hogy segítsen felmérni az olvasási nehézséget.',
      TITLE: 'Cím',
      ALT: 'ALT',
      IMAGES: 'Képek',
      EDIT: 'Szerkesztés',
      NO_IMAGES: 'Nem találhatók képek.',
      DECORATIVE: 'Dekoratív',
      MISSING: 'Hiányzó',
      PAGE_ISSUES: 'Oldalproblémák',
      SETTINGS: 'Beállítások',
      DEVELOPER_CHECKS: 'Fejlesztői ellenőrzések',
      DEVELOPER_DESC: 'Ellenőrzi azokat a problémákat, amelyek kijavításához kódolási ismeretekre lehet szükség, például HTML attribútumokat, űrlapokat és egyebeket.',
      DARK_MODE: 'Sötét üzemmód',
      SHORTCUT_SR: 'Ugrás a kérdésre. Billentyűzet gyorsbillentyű: S',
      SKIP_TO_ISSUE: 'Ugrás a kérdésre',
      NEW_TAB: 'Új lap megnyitása',
      LINKED: 'Kapcsolódó',
      PANEL_HEADING: 'Hozzáférhetőségi ellenőrzés',
      NO_ERRORS_FOUND: 'Nem találtunk hibát.',
      WARNINGS_FOUND: 'figyelmeztetéseket találtak.',
      TOTAL_FOUND: 'összes talált probléma.',
      NOT_VISIBLE: 'A megjeleníteni kívánt elem nem látható; lehet, hogy el van rejtve, vagy egy harmonika- vagy lapkomponens belsejében van. Itt egy előnézet:',
      MISSING_ROOT: 'A teljes oldal elérhetőségi ellenőrzése azért történt, mert a célterület <code>%(root)</code> nem létezik.',
      MISSING_READABILITY_ROOT: 'Az olvashatósági pontszám a <code>%(fallback)</code> tartalomterületen alapul, mert a célterület <code>%(root)</code> nem létezik.',
      HEADING_NOT_VISIBLE: 'A fejléc nem látható; lehet rejtett vagy egy harmonika- vagy fülkomponens belsejében.',
      SKIP_TO_PAGE_ISSUES: 'Ugrás az oldalra problémák',
      CONSOLE_ERROR: 'Sajnáljuk, de probléma van az oldal hozzáférhetőségi ellenőrzőjével. Megtenné, hogy <a href="%(link)">bejelenti ezen az űrlapon</a> vagy a <a href="%(link)">GitHubon</a>?',
      APPEARANCE: 'Megjelenés',
      MOVE_PANEL: 'Panel mozgatása',

      // Dismiss
      PANEL_DISMISS_BUTTON: 'Mutasd %(dismissCount) elutasított',
      DISMISS: 'Elutasít',
      DISMISS_ALL: 'Mindet elutasít',
      DISMISSED: 'Elutasítva',
      DISMISS_REMINDER: 'Kérjük, vegye figyelembe, hogy a figyelmeztetések csak <strong>ideiglenesen</strong> elutasítva. A böngészési előzmények és a cookie-k törlése visszaállítja az összes korábban elutasított figyelmeztetést az összes oldalon.',

      // Export
      DATE: 'Dátum',
      PAGE_TITLE: 'Oldalcím',
      RESULTS: 'Eredmények',
      EXPORT_RESULTS: 'Eredmények exportálása',
      GENERATED: 'Eredmények generálva %(tool)-vel.',
      PREVIEW: 'Előnézet',
      ELEMENT: 'Elem',
      PATH: 'Útvonal',

      // Colour filters
      COLOUR_FILTER: 'Színes szűrő',
      PROTANOPIA: 'Protanopia',
      DEUTERANOPIA: 'Deuteranopia',
      TRITANOPIA: 'Tritanopia',
      MONOCHROMACY: 'Monokrómia',
      COLOUR_FILTER_MESSAGE: 'Ellenőrizze, hogy vannak-e olyan elemek, amelyeket nehéz érzékelni vagy megkülönböztetni más színektől.',
      RED_EYE: 'Vörös vak.',
      GREEN_EYE: 'Zöld vak.',
      BLUE_EYE: 'Kék vak.',
      MONO_EYE: 'Vörös, kék és zöld vakok.',
      COLOUR_FILTER_HIGH_CONTRAST: 'A színszűrők nem működnek nagy kontrasztú üzemmódban.',

      // Alternative text stop words
      SUS_ALT_STOPWORDS: [
        'kép',
        'grafika',
        'kép',
        'fotó',
      ],
      PLACEHOLDER_ALT_STOPWORDS: [
        'alt',
        'kép',
        'fotó',
        'dekoratív',
        'helytartó',
        'helyőrző kép',
        'távtartó',
      ],
      PARTIAL_ALT_STOPWORDS: [
        'kattints a  címre.',
        'kattintson ide',
        'kattints ide további információkért',
        'kattintson ide, ha többet szeretne megtudni',
        'ide kattintva',
        'nézd meg',
        'részletesen itt',
        'letöltés',
        'letöltés itt',
        'megtudni',
        'Tudjon meg többet',
        'űrlap',
        'itt',
        'info',
        'információ',
        'link',
        'tanulni',
        'többet megtudni',
        'megtanulni',
        'további',
        'oldal',
        'papír',
        'tovább',
        'olvasd el',
        'olvassa el ezt',
        'ez',
        'ez az oldal',
        'ez a weboldal',
        'megtekintés',
        'nézze meg a',
        'weboldal',
      ],
      CLICK: ['click', 'kattintás'],
      NEW_WINDOW_PHRASES: [
        'külső',
        'új lap',
        'új ablak',
        'pop-up',
        'felbukkan',
      ],
      FILE_TYPE_PHRASES: [
        'dokumentum',
        'táblázat',
        'számítási lap',
        'tömörített fájl',
        'archivált fájl',
        'munkalap',
        'powerpoint',
        'prezentáció',
        'telepítse a',
        'videó',
        'audio',
        'pdf',
      ],

      // Readability
      READABILITY: 'Olvashatóság',
      AVG_SENTENCE: 'Átlagos szó/mondat:',
      COMPLEX_WORDS: 'Összetett szavak:',
      TOTAL_WORDS: 'Szavak:',
      VERY_DIFFICULT: 'Nagyon nehéz',
      DIFFICULT: 'Nehéz',
      FAIRLY_DIFFICULT: 'Elég nehéz',
      READABILITY_NO_CONTENT: 'Nem lehet kiszámítani az olvashatósági pontszámot. Nem találtunk bekezdést <code>&lt;p&gt;</code> vagy listatartalmat <code>&lt;li&gt;</code>.',
      READABILITY_NOT_ENOUGH: 'Nem elég tartalom az olvashatósági pontszám kiszámításához.',

      // Headings
      HEADING_SKIPPED_LEVEL: 'A címsoroknak nem szabad kihagyniuk szinteket, vagy átugraniuk a <strong>Címsor %(PREV_LEVEL)</strong> szintről a <strong {C}>Címsor %(LEVEL)</strong> szintre, mert ez megzavarja a tartalom sorrendjét és hierarchiáját, ami megnehezíti a követését. <hr> Ha a <strong {C}>%(HEADING)</strong> az <strong>%(PREV_HEADING)</strong> szekció alá tartozik, fontolja meg a formázást <strong>Címsorként %(LEVEL)</strong> helyette.',
      HEADING_EMPTY: 'Üres fejlécet találtunk! A javításhoz törölje ezt a sort, vagy változtassa meg a formátumát <strong {C}>Felirat %(level)</strong>-ról <strong>Normál</strong> vagy <strong>Paragraph</strong> formátumra.',
      HEADING_LONG: 'A fejléc hosszú! A címsorokat a tartalom rendszerezésére és a szerkezet közvetítésére kell használni. Rövidnek, informatívnak és egyedinek kell lenniük. Kérjük, hogy a címsorokat %(MAX_LENGTH) karakternél (egy mondatnál nem több) rövidebbre tartsa. <hr> <strong {B}>%(HEADING_LENGTH) Karakterek</strong>',
      HEADING_FIRST: 'Az oldal első címe általában Cím 1 vagy Cím 2 legyen.A Cím 1-nek a fő tartalom szakaszának kezdetét kell jelentenie, és ez a fő cím, amely leírja az oldal általános célját.Tudj meg többet a<a href = "https://www.w3.org/WAI/tutorials/page-structure/headings/">Fejléc szerkezetéről.</a>',
      HEADING_MISSING_ONE: 'Hiányzó Cím 1. A Cím 1-nek a fő tartalom területének kezdetét kell jelentenie, és ez a fő cím, amely leírja az oldal általános célját. További információkért látogasson el ide: <a href="https://www.w3.org/WAI/tutorials/page-structure/headings/">Fejléck struktúra.</a>',
      HEADING_EMPTY_WITH_IMAGE: 'A címsor nem tartalmaz szöveget, de képet tartalmaz. Ha ez nem címsor, akkor változtassa meg a formátumát <strong {C}>Címsor %(level)</strong> formátumra <strong>Normál</strong> vagy <strong>Bekezdés</strong>. Ellenkező esetben kérem, adja hozzá az alternatív szöveget a képhez, ha az nem díszítőelem.',
      PANEL_HEADING_MISSING_ONE: 'Hiányzik az 1. címsor!',
      PANEL_NO_HEADINGS: 'Nem találtunk címszavakat.',

      // Links
      LINK_EMPTY: 'Szöveg nélküli üres linkek eltávolítása.',
      LINK_EMPTY_LABELLEDBY: 'A hivatkozásnak van egy értéke a <code>aria-labelledby</code> számára, ami üres vagy nem egyezik meg egy másik elem <code>id</code> attribútumának az értékével az oldalon.',
      LINK_EMPTY_NO_LABEL: 'A link nem rendelkezik olyan szöveggel, amely a képernyőolvasók és más segítő technológiák számára is látható. A javításhoz: <ul><li>Adjon hozzá egy tömör szöveget, amely leírja, hogy hová vezet a link.</li><li>Ha <a href="https://a11y-101.com/development/icons-and-links">ikonos link vagy SVG,</a> akkor valószínűleg hiányzik egy leíró felirat.</li><li>Ha úgy gondolja, hogy ez a link egy másolási/beillesztési hiba miatt hibás, akkor fontolja meg a törlését.</li></ul>',
      LINK_STOPWORD: 'A link szövege kontextuson kívül nem biztos, hogy elég kifejező: <strong {C}>%(ERROR)</strong>',
      LINK_STOPWORD_ARIA: 'Bár egy akadálymentes név biztosított, fontolja meg a látható link szövegének módosítását. Az olyan kifejezések, mint &quot;<strong {C}>%(ERROR)</strong>&quot;, nem értelmesek.',
      LINK_TIP: '<hr> <strong>Tipp!</strong> Használjon egyértelmű és egyedi link szöveget, amely leírja a link célját, általában az oldal vagy dokumentum címét.',
      LINK_CLICK_HERE: 'A "kattintson" vagy "kattintson ide" kifejezés a kattintás mechanikájára összpontosít, pedig sokan nem használnak egeret, vagy mobil eszközön tekinthetik meg ezt a weboldalt. Fontolja meg egy másik, a feladathoz kapcsolódó ige használatát.',
      DUPLICATE_TITLE: 'A <code>title</code> attribútum a linkeken és képeken kiegészítő információk nyújtására szolgál, és <strong>különböznie</strong> kell a szövegtől vagy az alt szövegtől. A cím szövege az elem fölé helyezett egérmutatóval jelenik meg, de billentyűzettel vagy érintőképernyővel nem érhető el. Fontolja meg <a href="https://www.a11yproject.com/posts/title-attributes/">a title attribútum teljes elkerülését.</a>',
      LINK_SYMBOLS: 'Kerülje a szimbólumok használatát cselekvésre ösztönzésként a link szövegében, hacsak nincsenek elrejtve a segítő technológiák elől. A képernyőolvasók hangosan felolvashatják a szimbólumokat, ami zavaró lehet. Fontolja meg az eltávolításukat: <strong {C}>%(ERROR)</strong>',
      LINK_URL: 'A linkszövegként használt hosszabb, kevésbé érthető URL-címek nehezen érthetők a segítő technológiával. A legtöbb esetben jobb, ha az URL helyett ember által olvasható szöveget használ. A rövid URL-címek (például egy webhely kezdőlapja) rendben vannak.',
      LINK_DOI: 'Weboldalak vagy kizárólag online elérhető források esetében az <a href="https://apastyle.apa.org/style-grammar-guidelines/paper-format/accessibility/urls#:~:text=descriptive%20links">APA Style guide</a> leíró linkek használatát javasolja, a mű URL-jét vagy DOI-ját a cím köré tekerve. A linkszövegként használt hosszabb, kevésbé érthető URL-címek nehezen érthetőek lehetnek a segédeszközökkel.',
      LINK_NEW_TAB: 'A link figyelmeztetés nélkül új lapon vagy ablakban nyílik meg. Ez zavaró lehet, különösen azok számára, akik nehezen érzékelik a vizuális tartalmakat. Másodszor, nem mindig jó gyakorlat, ha valakinek az élményét irányítjuk, vagy döntéseket hozunk helyettük. Jelezze, hogy a link új ablakban nyílik meg a link szövegében<hr><strong>Tipp!</strong> Ismerje meg a legjobb gyakorlatokat: <a href="https://www.nngroup.com/articles/new-browser-windows-and-tabs/">Hivatkozások megnyitása új böngészőablakban és lapon.</a>',
      LINK_FILE_EXT: 'A link figyelmeztetés nélkül PDF vagy letölthető fájlra (pl. MP3, Zip, Word Doc) mutat. A hivatkozás szövegében tüntesse fel a fájl típusát. Ha nagyméretű fájlról van szó, fontolja meg a fájlméret feltüntetését. <hr> <strong>Példa:</strong> Vezetői jelentés (PDF, 3MB)',
      LINK_IDENTICAL_NAME: 'A link szövege megegyezik egy másik link szövegével, bár egy másik oldalra mutat. A több azonos szövegű hivatkozás zavart okozhat a képernyőolvasót használó emberek számára. <strong>Figyeljen arra, hogy a következő hivatkozás leíróbb legyen, hogy jobban megkülönböztethető legyen a többi hivatkozástól.</strong> <hr> <strong {B}>Hozzáférhető név</strong> <strong {C}>%(TEXT)</strong>',

      // Images
      MISSING_ALT_LINK_HAS_TEXT: 'A képet linkként használják a körülötte lévő szöveggel, bár az alt attribútumot dekoratívnak vagy nullának kell jelölni.',
      MISSING_ALT_LINK: 'A képet linkként használják, de hiányzik az alt szöveg! Kérjük, gondoskodjon arról, hogy az alt szöveg leírja, hová vezet a link.',
      MISSING_ALT: 'Hiányzó alt szöveg! Ha a kép történetet, hangulatot vagy fontos információt közvetít - mindenképpen írja le a képet.',
      LINK_ALT_FILE_EXT: 'Az alternatív szöveg nem tartalmazhat fájlkiterjesztéseket vagy képméreteket. Győződjön meg róla, hogy az alt szöveg a link célját írja le, nem pedig a kép szó szerinti leírását. Távolítsa el: <strong {C}>%(ERROR)</strong> <hr> {ALT} {L} <strong {C}>%(ALT_TEXT)</strong>',
      LINK_PLACEHOLDER_ALT: 'Nem leíró vagy helyőrző alt szöveg a linkelt képen belül. Győződjön meg róla, hogy az alt szöveg a link célját írja le, nem pedig a kép szó szerinti leírását. Cserélje ki a következő alt szöveget. <hr> {ALT} {L} <strong {C}>%(ALT_TEXT)</strong>',
      LINK_SUS_ALT: 'A segítő technológiák már jelzik, hogy ez egy kép, így a &quot;<strong {C}>%(ERROR)</strong>&quot; felesleges lehet. Győződjön meg róla, hogy az alt szöveg a link célját írja le, nem pedig a kép szó szerinti leírását. <hr> {ALT} {L} <strong {C}>%(ALT_TEXT)</strong>',
      ALT_FILE_EXT: 'Az alternatív szöveg nem tartalmazhat fájlkiterjesztéseket vagy képméreteket. Ha a kép történetet, hangulatot vagy fontos információt közvetít - mindenképpen írja le a képet. Távolítsa el: <strong {C}>%(ERROR)</strong> <hr> {ALT} <strong {C}>%(ALT_TEXT)</strong>',
      ALT_PLACEHOLDER: 'Nem leíró vagy helyőrző alt szöveg található. Cserélje ki a következő alt szöveget valami értelmesebbre. <hr> {ALT} <strong {C}>%(ALT_TEXT)</strong>',
      SUS_ALT: 'A segítő technológiák már jelzik, hogy ez egy kép, így a &quot;<strong {C}>%(ERROR)</strong>&quot; felesleges lehet. <hr> {ALT} <strong {C}>%(ALT_TEXT)</strong>',
      LINK_IMAGE_NO_ALT_TEXT: 'A linkben lévő kép dekoratívnak van jelölve, és nincs linkszöveg. Kérjük, adjon a képhez alt szöveget, amely leírja a link célját.',
      LINK_IMAGE_TEXT: 'A kép dekoratívként van megjelölve, bár a link a környező szöveget használja leíró címkeként.',
      LINK_IMAGE_LONG_ALT: 'A linkelt kép Alt szöveges leírása <strong>túl hosszú</strong>. A linkelt képek alt szövegének azt kell leírnia, hogy hová vezet a link, nem pedig a kép szó szerinti leírását. <strong>Figyeljen arra, hogy alt szövegként a linkelt oldal címét használja.</strong> <hr> {ALT} {L} <strong {B}>%(altLength) Karakterek</strong> <strong {C}>%(ALT_TEXT)</strong>',
      LINK_IMAGE_ALT: 'A kép linkje alt szöveget tartalmaz. Az alt szöveg leírja, hogy hová vezet a link? <strong>Figyeljen arra, hogy alt szövegként annak az oldalnak a címét használja, amelyre a link mutat.</strong> <hr> {ALT} {L} <strong {C}>%(ALT_TEXT)</strong>',
      LINK_IMAGE_ALT_AND_TEXT: 'A kép linkje <strong>mind az alt szöveget, mind a környező linkszöveget tartalmazza.</strong> Ha ez a kép dekoratív, és egy másik oldalra mutató funkcionális linkként használják, fontolja meg a kép dekoratív vagy nullás megjelölését - a környező linkszövegnek elegendőnek kell lennie. <hr> {ALT} <strong {C}>%(ALT_TEXT)</strong> <hr> <strong {B}>Hozzáférhető név</strong> {L} <strong {C}>%(TEXT)</strong>',
      IMAGE_FIGURE_DECORATIVE: 'A kép <strong>dekoratívnak</strong> van jelölve, és a segítő technológia figyelmen kívül hagyja. <hr> Bár <strong>feliratot</strong> adtunk meg, a képnek a legtöbb esetben alt szöveggel is rendelkeznie kell. <ul><li>Az alt szövegnek tömör leírást kell adnia arról, hogy mi található a képen.</li><li>A feliratnak általában kontextust kell biztosítania, hogy a képet a környező tartalomhoz kapcsolja, vagy egy adott információra hívja fel a figyelmet.</li></ul> Tudjon meg többet: <a href="https://thoughtbot.com/blog/alt-vs-figcaption#the-figcaption-element">alt versus figcaption.</a>',
      IMAGE_FIGURE_DUPLICATE_ALT: 'Ne használja pontosan ugyanazokat a szavakat az alt és a felirat szövegében. A képernyőolvasók kétszer fogják bemondani az információt. <ul><li>Az alt szövegnek tömör leírást kell adnia arról, hogy mi van a képen.</li><li>A feliratnak általában kontextust kell nyújtania, hogy a képet a környező tartalomhoz kapcsolja, vagy felhívja a figyelmet egy adott információra.</li></ul> További információ: <a href="https://thoughtbot.com/blog/alt-vs-figcaption#the-figcaption-element">alt versus figcaption.</a> <hr> {ALT} <strong {C}>%(ALT_TEXT)</strong>',
      IMAGE_DECORATIVE: 'A kép <strong>dekoratívnak</strong> van jelölve, és a segítő technológia figyelmen kívül hagyja. Ha a kép történetet, hangulatot vagy fontos információt közvetít - mindenképpen adjon hozzá alt szöveget.',
      IMAGE_DECORATIVE_CAROUSEL: 'A kép dekoratívnak van jelölve, de minden képnek a karusszelben vagy galériában tartalmaznia kell leíró alt szöveget, hogy biztosítsák az egyenértékű élményt mindenki számára.',
      IMAGE_ALT_TOO_LONG: 'Az Alt szöveges leírás <strong>túl hosszú</strong>. Az Alt szövegnek tömörnek, mégis értelmesnek kell lennie, mint egy <em>tweet</em> (kb. 100 karakter). Ha összetett képről vagy grafikonról van szó, fontolja meg, hogy a kép hosszú leírását az alatta lévő szövegben vagy egy harmonika komponensben helyezze el. <hr> {ALT} <strong {B}>%(altLength) Karakterek</strong> <strong {C}>%(ALT_TEXT)</strong>',
      IMAGE_PASS: '{ALT} %(ALT_TEXT)',

      // Form labels
      LABELS_MISSING_IMAGE_INPUT: 'A képgombból hiányzik az alt szöveg. Kérjük, adjon hozzá alt szöveget, hogy elérhető nevet adjon. Például: <em>Keresés</em> vagy <em>Submit</em>.',
      LABELS_INPUT_RESET: 'A visszaállító gombokat <strong>nem</strong> szabad használni, hacsak nem kifejezetten szükséges, mert könnyen aktiválhatók tévedésből. <hr> <strong>Tipp!</strong> Tudja meg, hogy a <a href="https://www.nngroup.com/articles/reset-and-cancel-buttons/">A visszaállítás és a törlés gombok miért jelentenek használhatósági problémát.</a>',
      LABELS_ARIA_LABEL_INPUT: 'A bemenetnek elérhető neve van, de kérjük, gondoskodjon arról, hogy a címke is látható legyen. <hr> <strong {B}>Hozzáférhető név</strong> <strong {C}>%(TEXT)</strong>',
      LABELS_NO_FOR_ATTRIBUTE: 'Ehhez a bemenethez nincs címke társítva. Adjon hozzá egy <code>for</code> attribútumot a címkéhez, amely megfelel a bemenet <code>id</code> azonosítójának. <hr> <strong {B}>ID</strong> <strong {C}>#%(id)</strong>',
      LABELS_MISSING_LABEL: 'Ehhez a bemenethez nincs címke társítva. Kérjük, adjon hozzá egy <code>id</code>-t ehhez a bemenethez, és adjon hozzá egy megfelelő <code>for</code> attribútumot a címkéhez.',
      LABELS_PLACEHOLDER: 'A eltűnő helyőrző szöveg megnehezíti az emberek számára, hogy emlékezzenek arra, hogy mely információk tartoznak egy mezőbe, és hogy azonosítsák és kijavítsák a validálási problémákat. Ehelyett fontolja meg, hogy állandóan látható tippet használjon a űrlapmező előtt. <hr> Tudjon meg többet: <a href="https://www.nngroup.com/articles/form-design-placeholders/">A helyőrzők a űrlapmezőkben károsak.</a>',

      // Embedded content
      EMBED_VIDEO: 'Kérjük, gondoskodjon arról, hogy <strong>minden videó feliratozással legyen ellátva.</strong> A feliratozás biztosítása minden hang- és videotartalomhoz kötelező A-szintű követelmény. A feliratozás a siket vagy nagyothalló embereket támogatja.',
      EMBED_AUDIO: 'Kérjük, gondoskodjon arról, hogy minden podcasthoz <strong>átiratot adjon.</strong> A hanganyag átiratának megadása kötelező A-szintű követelmény. Az átiratok a siket/süket vagy nagyothalló embereket támogatják, de mindenki számára hasznosak lehetnek. Fontolja meg az átirat elhelyezését alul vagy egy harmonika panelen belül.',
      EMBED_DATA_VIZ: 'Az ilyen adatvizualizációs widgetek gyakran problémát jelentenek azok számára, akik billentyűzetet vagy képernyőolvasót használnak a navigáláshoz, és jelentős nehézségeket okozhatnak a gyengén látók vagy színvakok számára. Javasoljuk, hogy ugyanezt az információt alternatív (szöveges vagy táblázatos) formátumban adjuk meg a widget alatt. <hr> Tudjon meg többet a <a href="https://www.w3.org/WAI/tutorials/images/complex">komplex képekről.</a>',
      EMBED_MISSING_TITLE: 'A beágyazott tartalomhoz hozzáférhető névre van szükség, amely leírja annak tartalmát. Kérjük, adjon meg egyedi <code>title</code> vagy <code>aria-label</code> attribútumot az <code>iframe</code> elemen. További információkért látogasson el ide: <a href="https://web.dev/learn/accessibility/more-html#iframes">iFrame-ek.</a>',
      EMBED_GENERAL: 'Beágyazott tartalom ellenőrzése nem lehetséges. Kérjük, győződjön meg róla, hogy a képek alt szöveggel, a videók felirattal, a szöveg megfelelő kontraszttal és az interaktív komponensek <a href="https://webaim.org/techniques/keyboard/">billentyűzettel elérhetőek</a>.',
      EMBED_UNFOCUSABLE: 'Azoknak a <code>&lt;iframe&gt;</code>-nek, amelyek nem fókuszálható elemekkel rendelkeznek, nem kell <code>tabindex="-1"</code> tulajdonságot rendelni. A beágyazott tartalom nem lesz billentyűzettel elérhető.',

      // QA
      QA_BAD_LINK: 'Rossz linket találtunk. Úgy tűnik, hogy a link egy fejlesztői környezetre mutat. <hr> {L} <strong {C}>%(LINK)</strong>',
      QA_IN_PAGE_LINK: 'Sérült azonos oldalú link. A hivatkozás célja nem egyezik meg egyetlen elemmel sem ezen az oldalon.',
      QA_STRONG_ITALICS: 'A vastag és dőlt betűs címkéknek szemantikai jelentésük van, és <strong>nem</strong> szabad egész bekezdések kiemelésére használni őket. A félkövérrel kiemelt szöveget egy szó vagy kifejezés erős <strong>kiemelésére</strong> kell használni. A dőlt betűt a tulajdonnevek (pl. könyv- és cikkcímek), idegen szavak, idézőjelek kiemelésére kell használni. A hosszú idézeteket blokkidézetként kell formázni.',
      QA_PDF: 'Nem lehet ellenőrizni a PDF-ek hozzáférhetőségét. A PDF-ek webes tartalomnak minősülnek, és azokat is hozzáférhetővé kell tenni. A PDF-ek gyakran tartalmaznak problémákat a képernyőolvasót használók (hiányzó szerkezeti címkék vagy hiányzó űrlapmező-címkék) és a gyengén látók (a szöveg nagyításkor nem folyik vissza) számára. <ul><li>Ha ez egy űrlap, fontolja meg egy hozzáférhető HTML űrlap használatát alternatívaként.</li><li>Ha ez egy dokumentum, fontolja meg a weboldallá alakítását.</li></ul>Máskülönben ellenőrizze a <a href="https://helpx.adobe.com/acrobat/using/create-verify-pdf-accessibility.html">PDF hozzáférhetőségét az Acrobat DC-ben.</a>Megközelíthetőségét az <a href="https://helpx.adobe.com/acrobat/using/create-verify-pdf-accessibility.html">PDF-ben.</a>.',
      QA_DOCUMENT: 'Nem lehet ellenőrizni a dokumentum hozzáférhetőségét. A hivatkozott dokumentumok webes tartalomnak minősülnek, és azokat is hozzáférhetővé kell tenni. Kérjük, kézzel ellenőrizze a dokumentumot. <ul><li>Tegye hozzáférhetőbbé <a href="https://support.google.com/docs/answer/6199477?hl=hu">Google Workspace dokumentumát vagy prezentációját.</a></li><li>Tegye hozzáférhetőbbé <a href="https://support.microsoft.com/hu/office/create-accessible-office-documents-868ecfcd-4f00-4224-b881-a65537a7c155">Office-dokumentumait.</a></li></ul>',
      QA_BLOCKQUOTE: 'Ez egy címszó? <strong {C}>%(TEXT)</strong> <hr> A blokkos idézőjeleket csak idézőjeleknél kell használni. Ha ez egy fejlécnek szánja, akkor ezt a blokkidézetet változtassa meg egy szemantikus fejlécre (pl. Fejléc 2 vagy Fejléc 3).',
      QA_FAKE_HEADING: 'Ez egy címszó? <strong {C}>%(TEXT)</strong> <hr> Egy félkövér vagy nagyméretű szövegsor címnek tűnhet, de a képernyőolvasót használó személy nem tudja megállapítani, hogy ez fontos, vagy nem tud a tartalmára ugrani. A félkövér vagy nagyméretű szöveg soha nem helyettesítheti a szemantikus címsorokat (Címsor 2-től a Címsor 6-ig).',
      QA_FAKE_LIST: 'Megpróbál listát készíteni? Lehetséges listaelemet találtunk: <strong {C}>%(firstPrefix)</strong> <hr> Győződjön meg róla, hogy szemantikus listákat használ, és használja helyette a felsorolás- vagy számformázó gombokat. Szemantikus lista használata esetén a segédtechnológiák képesek olyan információkat közvetíteni, mint az elemek teljes száma és az egyes elemek relatív pozíciója a listában. További információ a <a href="https://www.w3.org/WAI/tutorials/page-structure/content/#lists">szemantikus listákról.</a>',
      QA_UPPERCASE: 'Találtam minden nagybetűt. Egyes képernyőolvasók a csupa nagybetűs szöveget betűszónak értelmezhetik, és minden egyes betűt külön-külön olvasnak. Ezenkívül egyesek nehezebben olvashatónak találják a csupa nagybetűs szöveget, és úgy tűnhet, mintha kiabálnának.',
      QA_UNDERLINE: 'Az aláhúzott szöveg összetéveszthető a linkekkel. Fontolja meg egy másik stílus használatát, például <code>&lt;strong&gt;</code><strong>strong fontosság</strong><code>&lt;/strong&gt;</code> vagy <code>&lt;em&gt;</code><em>emphasis</em><code>&lt;/em&gt;</code>.',
      QA_SUBSCRIPT: 'Az alul- és felülírás formázási beállításokat csak a szöveg pozíciójának tipográfiai konvenciók vagy szabványok szerinti megváltoztatására szabad használni. Nem szabad <strong>nem</strong> kizárólag megjelenítési vagy megjelenési célokra használni. Teljes mondatok formázása olvashatósági problémákat vet fel. Megfelelő felhasználási esetek közé tartozhat az exponensek, rendszámok, például 4<sup>th</sup> helyett 4<sup>th</sup>, és kémiai képletek (pl. H<sub>2</sub>O) megjelenítése.',
      QA_NESTED_COMPONENTS: 'Kerülje el az interaktív elrendezési komponensek egymásba ágyazását, például az akordeonok fülekbe helyezését vagy a fülek akordeonokba helyezését. Ez bonyolíthatja a navigációt, növelheti a kognitív terhelést, és arra vezethet, hogy az emberek figyelmen kívül hagyják a tartalmat.',
      QA_JUSTIFY: 'Kerülje az igazított szöveg használatát, amely mind a bal, mind a jobb margóhoz igazodik. Ez néhány ember számára nehezen olvasható lehet a szavak közötti egyenlőtlen távolságok miatt. Használjon balra igazított szöveget a jobb olvashatóság érdekében.',
      QA_SMALL_TEXT: 'A kis betűméret nehezebben olvasható, különösen a gyengén látók számára. A jobb olvashatóság érdekében kerülje a kisebb betűméretek használatát az alapértelmezettnél.',

      // Shared
      ACC_NAME: '<strong {B}>Hozzáférhető név</strong> %(TEXT)',
      ACC_NAME_TIP: '<hr> <strong>Tippek!</strong> A "hozzáférhető név" az a végső címke, amelyet a segédeszközöket használó embereknek kommunikálnak, és amelyet az ARIA számít. Ez segít nekik megérteni a hivatkozás vagy gomb célját.',
      HIDDEN_FOCUSABLE: 'A hivatkozás vagy a gomb <code>aria-hidden=&quot;true&quot;</code>, de még mindig elérhető a billentyűzettel. Ha egy duplikált hivatkozást vagy gombot szeretne elrejteni, adjon hozzá egy <code>tabindex=&quot;-1&quot;</code> értéket is. Ellenkező esetben az <code>aria-hidden=&quot;true&quot;</code> nem használható olyan elemeknél, amelyek fókuszt kaphatnak. <hr> További információ a <a href="https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/Attributes/aria-hidden">aria-hidden attribútumról.</a>',

      // Developer
      DUPLICATE_ID: 'Találtunk <strong>duplikált azonosítót</strong>. A duplikált azonosító hibák köztudottan problémákat okoznak a segítő technológiák számára, amikor azok megpróbálnak interakcióba lépni a tartalommal. Kérjük, távolítsa el vagy változtassa meg a következő azonosítót. <hr> <strong {B}>ID</strong> <strong {C}>#%(id)</strong>',
      UNCONTAINED_LI: 'Minden <code>&lt;li&gt;</code> listatételt a <code>&lt;ul&gt;</code> rendezetlen vagy <code>&lt;ol&gt;</code> rendezett elemek belsejébe kell elhelyezni. Ez a struktúra segít a képernyőolvasóknak pontosan bejelenteni a listát és annak elemeit.',
      TABINDEX_ATTR: 'Az elemnek nem lehet <code>tabindex</code> attribútuma, amely nagyobb, mint 0.',

      // Meta checks
      META_LANG: 'Az oldal nyelve nincs megadva! Kérjük, <a href="https://www.w3.org/International/questions/qa-html-language-declarations">declare language on HTML tag.</a>',
      META_TITLE: 'Hiányzik az oldal címe! Kérjük, adjon meg egy <a href="https://developer.mozilla.org/hu/docs/Web/HTML/Element/title">oldal címet.</a>',
      META_SCALABLE: 'Távolítsa el a <code>user-scalable="no"</code> paramétert a <a href="https://developer.mozilla.org/en-US/docs/Web/HTML/Viewport_meta_tag">nézet meta tagjében</a> a nagyítás engedélyezése érdekében.',
      META_MAX: 'Győződjön meg arról, hogy a <code>maximum-scale</code> paraméter a <a href="https://developer.mozilla.org/en-US/docs/Web/HTML/Viewport_meta_tag">nézet meta tagjében</a> nem kisebb, mint 2.',
      META_REFRESH: 'Az oldalnak nem szabad automatikusan frissülnie meta címke segítségével.',

      // Buttons
      BTN_EMPTY: 'A gomb hiányzik egy akadálymentes névvel, amely leírja annak célját.',
      BTN_EMPTY_LABELLEDBY: 'A gombnak van egy <code>aria-labelledby</code> értéke, amely üres, vagy nem egyezik meg egy másik elem <code>id</code> értékével az oldalon.',
      BTN: 'gomb',
      BTN_TIP: 'Tudja meg, hogyan készíthet egy <a href="https://www.sarasoueidan.com/blog/accessible-icon-buttons/">akadálymentes gombot.</a>',
      BTN_ROLE_IN_NAME: 'Ne tartalmazza a "gomb" szót a gomb nevében. A képernyőolvasók már közlik az elem szerepét annak neve mellett.',
      LABEL_IN_NAME: 'Ennek az elemnek a látható szövege eltérhet az akadálymentes névtől, ami zavart okozhat az akadálymentes technológiákat használó felhasználók számára. Kérem, ellenőrizze: <hr> <strong {B}>Akadálymentes Név</strong> <strong {C}>%(TEXT)</strong>',

      // Tables
      TABLES_MISSING_HEADINGS: 'Hiányzó táblázatfejlécek! A hozzáférhető táblázatokhoz olyan HTML-jelölésre van szükség, amely jelzi a fejléccellákat és az adatcellákat, amelyek meghatározzák a kapcsolatukat. Ez az információ kontextust biztosít a segítő technológiát használó emberek számára. A táblázatokat csak táblázatos adatokhoz szabad használni. <hr> Tudjon meg többet a <a href="https://www.w3.org/WAI/tutorials/tables/">hozzáférhető táblázatokról.</a>',
      TABLES_SEMANTIC_HEADING: 'Az olyan szemantikus címsorokat, mint a Heading 2 vagy Heading 3, csak a tartalmi részeknél szabad használni; <strong>nem</strong> a HTML táblázatokban. A táblázatcímeket ehelyett a <code>&lt;th&gt;</code> elemmel jelezze. <hr> Tudjon meg többet a <a href="https://www.w3.org/WAI/tutorials/tables/">elérhető táblázatokról.</a>',
      TABLES_EMPTY_HEADING: 'Üres asztali fejlécet találtunk! A táblázat fejlécének <strong>soha</strong> nem szabad üresnek lennie. Fontos a sor- és/vagy oszlopfejlécek kijelölése a kapcsolatuk érzékeltetése érdekében. Ez az információ kontextust biztosít a segítő technológiát használó emberek számára. Ne feledje, hogy a táblázatok csak táblázatos adatokhoz használhatók. <hr> Tudjon meg többet a <a href="https://www.w3.org/WAI/tutorials/tables/">elérhető táblázatokról.</a>',

      // Contrast
      CONTRAST_NORMAL: 'Teks ukuran normal harus memiliki rasio kontras setidaknya %(RATIO).',
      CONTRAST_LARGE: 'Teks ukuran besar harus memiliki rasio kontras setidaknya %(RATIO).',
      CONTRAST_ERROR: 'A szövegnek nincs elég kontrasztja a háttérrel, ezért nehezebb olvasni.',
      CONTRAST_WARNING: 'Ennek a szövegnek a kontrasztja ismeretlen, és kézzel kell ellenőrizni. Győződjön meg róla, hogy a szöveg és a háttér között erős a kontraszt.',
      CONTRAST_ERROR_GRAPHIC: 'A grafikának nincs elég kontrasztja a háttérrel, ezért nehezebb látni.',
      CONTRAST_WARNING_GRAPHIC: 'A grafikának a kontrasztja ismeretlen, és kézzel kell ellenőrizni.',
      CONTRAST_TIP_GRAPHIC: 'A grafikáknak és a felhasználói felület elemeinek legalább 3:1 kontrasztarányúnak kell lenniük.',
      CONTRAST_OPACITY: 'Növelje az átlátszóságot jobb láthatóság érdekében.',
      CONTRAST_APCA: 'Ez nem elég kontraszt bármilyen méretű szöveghez. Fontolja meg ennek a szín- és szövegméret-kombinációnak a használatát?',
      CONTRAST_COLOR: 'Fontolja meg ennek a színnek a használatát?',
      CONTRAST_SIZE: 'Fontolja meg a szöveg méretének növelését ehhez a színkombinációhoz?',
      CONTRAST_PLACEHOLDER: 'A kitöltő szöveg ennek a bemeneti mezőnek nem rendelkezik elegendő kontraszttal a háttérrel, így nehezebb olvasni.',
      CONTRAST_PLACEHOLDER_UNSUPPORTED: 'Ennek a helyőrző szövegnek a kontrasztja ismeretlen, és manuálisan kell ellenőrizni. Győződjön meg róla, hogy a szöveg és a háttér erősen kontrasztos színekkel rendelkeznek.',
      CONTRAST_INPUT: 'Ennek a bemeneti mezőnek a szövege nem rendelkezik elegendő kontraszttal a háttérrel, így nehezebb olvasni.',
      CONTRAST: 'Kontraszt',
      UNKNOWN: 'Ismeretlen',
      FG: 'Előtér',
      BG: 'Háttér',
      NO_SUGGESTION: 'A szöveg színének módosításával nem található hozzáférhető kombináció. Próbálja meg módosítani a háttér színét.',
    },
  };

  return hu;

}));
