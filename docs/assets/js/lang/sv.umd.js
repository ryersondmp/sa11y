
/*!
  * Sa11y, the accessibility quality assurance assistant.
  * @version 4.0.0
  * @author Adam Chaboryk
  * @license GPL-2.0-or-later
  * @copyright © 2020 - 2024 Toronto Metropolitan University.
  * @contact adam.chaboryk@torontomu.ca
  * GitHub: git+https://github.com/ryersondmp/sa11y.git | Website: https://sa11y.netlify.app
  * For all acknowledgements, please visit: https://sa11y.netlify.app/acknowledgements/
  * The above copyright notice shall be included in all copies or substantial portions of the Software.
**/
(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
  typeof define === 'function' && define.amd ? define(factory) :
  (global = typeof globalThis !== 'undefined' ? globalThis : global || self, global.Sa11yLangSv = factory());
})(this, (function () { 'use strict';

  /*! WARNING: This is a machine-generated translation and may contain errors or inaccuracies. */
  var sv = {
    // Swedish
    strings: {
      LANG_CODE: 'sv',
      MAIN_TOGGLE_LABEL: 'Inspektera Tillgänglighet',
      CONTAINER_LABEL: 'Tillgänglighetskoll',
      ERROR: 'Fel',
      ERRORS: 'Fel',
      WARNING: 'Varning',
      WARNINGS: 'Varningar',
      GOOD: 'Bra',
      ON: 'På',
      OFF: 'Av',
      ALERT_TEXT: 'Varning',
      ALERT_CLOSE: 'Stäng',
      OUTLINE: 'Sidöversikt',
      TITLE: 'Titel',
      ALT: 'ALT',
      IMAGES: 'Bilder',
      EDIT: 'Redigera',
      NO_IMAGES: 'Inga bilder hittades.',
      DECORATIVE: 'Dekorativ',
      MISSING: 'Saknas',
      PAGE_ISSUES: 'Sidproblem',
      SETTINGS: 'Inställningar',
      DEVELOPER_CHECKS: 'Utvecklarkontroller',
      DEVELOPER_DESC: 'Kontrollerar problem som kan kräva kodningskunskaper för att åtgärda.',
      DARK_MODE: 'Mörkt läge',
      SHORTCUT_SR: 'Hoppa till problem. Kortkommando: Alt + punkt',
      SKIP_TO_ISSUE: 'Hoppa till problem',
      NEW_TAB: 'Öppnas i ny flik',
      LINKED: 'Länkad',
      PANEL_HEADING: 'Tillgänglighetskoll',
      NO_ERRORS_FOUND: 'Inga fel hittades.',
      WARNINGS_FOUND: 'varningar hittades.',
      TOTAL_FOUND: 'totala problem hittades.',
      NOT_VISIBLE: 'Objektet du försöker visa är inte synligt: det kan vara gömt eller finnas inuti en dragspelskomponent eller en flikkomponent. Här är en förhandsvisning:',
      MISSING_ROOT: 'Hela sidan kontrolleras för tillgänglighet eftersom målområdet <code>%(root)</code> inte existerar.',
      HEADING_NOT_VISIBLE: 'Rubriken är inte synlig; den kan vara gömd eller inuti ett dragspel eller en flikkomponent.',
      SKIP_TO_PAGE_ISSUES: 'Hoppa till sidans problem',
      CONSOLE_ERROR: 'Tyvärr, men det finns ett problem med tillgänglighetskontrollen på den här sidan. Kan du <a href="%(link)">rapportera det via det här formuläret</a> eller på <a href="%(link)">GitHub</a>?',

      // Export
      DATE: 'Datum',
      PAGE_TITLE: 'Sidtitel',
      RESULTS: 'Resultat',
      EXPORT_RESULTS: 'Exportera resultat',
      GENERATED: 'Resultat genererat med %(tool).',
      PREVIEW: 'Förhandsvisning',
      ELEMENT: 'Element',
      PATH: 'Sökväg',

      // Dismiss
      PANEL_DISMISS_BUTTON: 'Visa %(dismissCount) avvisade',
      DISMISS: 'Avvisa',
      DISMISS_ALL: 'Avvisa allt',
      DISMISSED: 'Avvisad',
      DISMISS_REMINDER: 'Observera att varningar endast är <strong>tillfälligt</strong> avvisade. Att rensa din webbläsarhistorik och cookies kommer att återställa alla tidigare avvisade varningar på alla sidor.',

      // Color filters
      COLOUR_FILTER: 'Färgfilter',
      PROTANOPIA: 'Protanopia',
      DEUTERANOPIA: 'Deuteranopia',
      TRITANOPIA: 'Tritanopia',
      MONOCHROMACY: 'Monokromati',
      COLOUR_FILTER_MESSAGE: 'Kolla efter element som är svåra att uppfatta eller särskilja från andra färger.',
      RED_EYE: 'Röd färgblindhet.',
      GREEN_EYE: 'Grön färgblindhet.',
      BLUE_EYE: 'Blå färgblindhet.',
      MONO_EYE: 'Röd, grön och blå blindhet.',
      COLOUR_FILTER_HIGH_CONTRAST: 'Färgfilter fungerar inte i högkontrastläge.',

      // Alternative text module stop words
      SUS_ALT_STOPWORDS: ['bild', 'grafik', 'fotografi', 'foto'],
      PLACEHOLDER_ALT_STOPWORDS: ['alt', 'bild', 'foto', 'dekorativ', 'fotografi', 'platshållare', 'platshållarbild', 'mellanlägg'],
      PARTIAL_ALT_STOPWORDS: [
        'klicka',
        'klicka här',
        'klicka här för mer',
        'klicka här för att läsa mer',
        'kolla upp',
        'detaljer här',
        'ladda ner',
        'ladda ner här',
        'visa',
        'visa mer',
        'mer',
        'formulär',
        'här',
        'info',
        'information',
        'länk',
        'lär dig',
        'lär dig mer',
        'lär dig att',
        'mer',
        'sida',
        'papper',
        'läs mer',
        'läs',
        'läs detta',
        'detta',
        'den här sidan',
        'denna sida',
        'den här webbplatsen',
        'visa',
        'visa vår',
        'webbplats',
      ],
      WARNING_ALT_STOPWORDS: ['klicka här'],
      NEW_WINDOW_PHRASES: ['extern', 'ny flik', 'nytt fönster', 'pop-up', 'pop up'],

      // Only some items in list would need to be translated.
      FILE_TYPE_PHRASES: ['dokument', 'kalkylark', 'arbetsblad', 'installera', 'video', 'pdf', 'doc',
        'docx', 'word', 'mp3', 'ppt', 'text', 'pptx', 'powerpoint', 'txt', 'exe', 'dmg', 'rtf', 'windows', 'macos', 'csv', 'xls', 'xlsx', 'mp4', 'mov', 'avi', 'zip'],

      // Readability
      READABILITY: 'Läsbarhet',
      AVG_SENTENCE: 'Genomsnittligt antal ord per mening:',
      COMPLEX_WORDS: 'Komplexa ord:',
      TOTAL_WORDS: 'Ord:',
      VERY_DIFFICULT: 'Mycket svårt',
      DIFFICULT: 'Svårt',
      FAIRLY_DIFFICULT: 'Ganska svårt',
      READABILITY_NO_CONTENT: 'Det går inte att beräkna läsbarhetspoäng. Inget stycke <code>&lt;p&gt;</code> eller listinnehåll <code>&lt;li&gt;</code> hittades.',
      READABILITY_NOT_ENOUGH: 'Inte tillräckligt innehåll för att beräkna läsbarhetspoäng.',

      // Headings
      HEADING_SKIPPED_LEVEL: 'Icke-konsekutiv rubriknivå används. Rubriker bör aldrig hoppa över nivåer eller gå från <strong>Rubrik %(prevLevel)</strong> till <strong {C}>Rubrik %(level)</strong>.',
      HEADING_EMPTY: 'Tom rubrik hittades! För att åtgärda, ta bort den här raden eller ändra dess format från <strong {C}>Rubrik %(level)</strong> till <strong>Normal</strong> eller <strong>Stycke</strong>.',
      HEADING_LONG: 'Rubriken är lång! Rubriker bör användas för att organisera innehåll och förmedla struktur. De ska vara korta, informativa och unika. Vänligen håll rubriker kortare än 160 tecken (högst en mening). <hr> <strong {B}>%(HEADING_LENGTH) Tecken</strong>',
      HEADING_FIRST: 'Den första rubriken på en sida bör vanligtvis vara en Rubrik 1 eller Rubrik 2. Rubrik 1 bör vara början på huvudinnehållsavsnittet och är huvudrubriken som beskriver sidans övergripande syfte. Läs mer om <a href="https://www.w3.org/WAI/tutorials/page-structure/headings/">Rubrikstruktur.</a>',
      HEADING_MISSING_ONE: 'Saknar Rubrik 1. Rubrik 1 bör vara början på huvudinnehållsområdet, och är huvudrubriken som beskriver sidans övergripande syfte. Läs mer om <a href="https://www.w3.org/WAI/tutorials/page-structure/headings/">Rubrikstruktur.</a>',
      HEADING_EMPTY_WITH_IMAGE: 'Rubriken har ingen text, men innehåller en bild. Om detta inte är en rubrik ändrar du dess format från <strong {C}>Rubrik %(level)</strong> till <strong>Normal</strong> eller <strong>Stycke</strong>. Annars, lägg till alt-text till bilden om den inte är dekorativ.',
      PANEL_HEADING_MISSING_ONE: 'Saknar rubrik 1!',
      PANEL_NO_HEADINGS: 'Inga rubriker hittades.',

      // Links
      LINK_EMPTY: 'Ta bort tomma länkar utan text.',
      LINK_EMPTY_LABELLEDBY: 'Länken har ett värde för <code>aria-labelledby</code> som antingen är tomt eller inte matchar värdet för ett annat elements attribut <code>id</code> på sidan.',
      LINK_EMPTY_NO_LABEL: 'Länken har inte urskiljbar text som är synlig för skärmläsare och andra hjälpmedel. För att fixa: <ul><li>Lägg till lite kortfattad text som beskriver vart länken tar dig.</li><li>Om det är en <a href="https://a11y-101.com/development/icons -and-links">ikonlänk eller SVG,</a> saknar den troligen en beskrivande etikett.</li><li>Om du tror att den här länken är ett fel på grund av ett kopierings-/klistra-fel, överväg att ta bort den.</li></ul>',
      LINK_LABEL: '<strong {B}>Länketikett</strong> %(TEXT)',
      LINK_STOPWORD: 'Länktexten kanske inte är tillräckligt beskrivande ur sitt sammanhang: <strong {C}>%(ERROR)</strong> <hr> <strong>Tips!</strong> Länktexten ska alltid vara tydlig, unik och meningsfull. Undvik vanliga ord som &quot;klicka här&quot; eller &quot;läs mer&quot;',
      LINK_BEST_PRACTICES: 'Överväg att ersätta länktexten: <strong {C}>%(ERROR)</strong><hr><ul><li>&quot;Klicka här&quot; platser fokuserar på musmekanik, när många människor inte använder en mus eller kanske tittar på den här webbplatsen på en mobil enhet. Överväg att använda ett annat verb som relaterar till uppgiften.</li><li>Undvik att använda HTML-symboler som uppmaning om de inte är dolda för hjälpmedel.</li></ul>',
      LINK_URL: 'Längre, mindre begripliga webbadresser som används som länktext kan vara svåra att lyssna på med hjälpmedel. I de flesta fall är det bättre att använda läsbar text istället för URL:en. Korta webbadresser (som en webbplats startsida) är okej. <hr> <strong>Tips!</strong> Länktexten ska alltid vara tydlig, unik och meningsfull så att den kan förstås tagen ur sitt sammanhang.',
      LINK_DOI: 'För webbsidor eller resurser som endast finns online rekommenderar <a href="https://apastyle.apa.org/style-grammar-guidelines/paper-format/accessibility/urls#:~:text=descriptive%20links">APA Style Guide</a> att man använder beskrivande länkar genom att linda in URL:en eller DOI:en för arbetet runt dess titel. Längre, mindre begripliga webbadresser som används som länktext kan vara svåra att lyssna på med hjälpmedel.',

      // Links advanced
      LINK_NEW_TAB: 'Länken öppnas i en ny flik eller ett nytt fönster utan förvarning. Att göra det kan vara desorienterande, särskilt för personer som har svårt att uppfatta visuellt innehåll. För det andra är det inte alltid en bra praxis att styra någons erfarenhet eller fatta beslut åt dem. Ange att länken öppnas i ett nytt fönster i länktexten. <hr> <strong>Tips!</strong> Lär dig bästa praxis: <a href="https://www.nngroup.com/articles/new-browser-windows-and-tabs/">att öppna länkar i nya webbläsarfönster och flikar.</a>',
      LINK_FILE_EXT: 'Länken pekar till en PDF eller nedladdningsbar fil (t.ex. MP3, Zip, Word Doc) utan förvarning. Ange filtypen i länktexten. Om det är en stor fil, överväg att ta med filstorleken. <hr> <strong>Exempel:</strong> Verkställande rapport (PDF, 3MB)',
      LINK_IDENTICAL_NAME: 'Länken har identisk text som en annan länk, även om den pekar på en annan sida. Flera länkar med samma text kan orsaka förvirring för personer som använder skärmläsare. <hr> Överväg att göra följande länk mer beskrivande för att hjälpa till att skilja den från andra länkar: <strong {C}>%(TEXT)</strong>',

      // Images
      MISSING_ALT_LINK_HAS_TEXT: 'Bilden används som en länk med omgivande text, dock borde alt-attributet markeras som dekorativt eller null.',
      MISSING_ALT_LINK: 'Bilden används som länk men saknar alt-text! Se till att alt-texten beskriver vart länken tar dig.',
      MISSING_ALT: 'Saknar alt-text! Om bilden förmedlar en historia, stämning eller viktig information – se till att beskriva bilden.',
      LINK_ALT_FILE_EXT: 'Filändelse hittades i alt-texten. Se till att alt-texten beskriver destinationen för länken, inte en bokstavlig beskrivning av bilden. Ta bort: <strong {C}>%(ERROR)</strong> <hr> {ALT} {L} <strong {C}>%(ALT_TEXT)</strong>',
      LINK_PLACEHOLDER_ALT: 'Hittade icke-beskrivande eller platshållande alt-text i en länkad bild. Se till att alt-texten beskriver länkens destination, och inte är en bokstavlig beskrivning av bilden. Ersätt följande alt-text. <hr> {ALT} {L} <strong {C}>%(ALT_TEXT)</strong>',
      LINK_SUS_ALT: 'Hjälpmedel visar redan att detta är en bild, så &quot;<strong {C}>%(ERROR)</strong>&quot; kan vara överflödig. Se till att alt-texten beskriver länkens destination, och inte är en bokstavlig beskrivning av bilden. <hr> {ALT} {L} <strong {C}>%(ALT_TEXT)</strong>',
      ALT_FILE_EXT: 'Filändelse hittades i alt-texten. Om bilden förmedlar en historia, stämning eller viktig information – se till att beskriva bilden. Ta bort: <strong {C}>%(ERROR)</strong> <hr> {ALT} <strong {C}>%(ALT_TEXT)</strong>',
      ALT_PLACEHOLDER: 'Hittade icke-beskrivande eller platshållande alt-text. Ersätt följande alt-text med något mer meningsfullt. <hr> {ALT} <strong {C}>%(ALT_TEXT)</strong>',
      SUS_ALT: 'Hjälpmedel visar redan att detta är en bild, så &quot;<strong {C}>%(ERROR)</strong>&quot; kan vara överflödig. <hr> {ALT} <strong {C}>%(ALT_TEXT)</strong>',
      LINK_HIDDEN_FOCUSABLE: 'Länken har <code>aria-hidden=&quot;true&quot;</code> men kan fortfarande fokuseras med hjälp av tangentbordet. Om du tänker dölja en överflödig eller duplicerad länk, lägg till <code>tabindex=&quot;-1&quot;</code> också.',
      LINK_IMAGE_NO_ALT_TEXT: 'Bilden i länken är markerad som dekorativ och det finns ingen länktext. Vänligen lägg till alternativ text till bilden som beskriver länkens destination.',
      LINK_IMAGE_TEXT: 'Bilden är markerad som dekorativ, även om länken använder den omgivande texten som en beskrivande etikett.',
      LINK_IMAGE_LONG_ALT: 'Alternativ textbeskrivning för en länkad bild är <strong>för lång</strong>. Alt-text för länkade bilder ska beskriva vart länken tar dig, inte vara en bokstavlig beskrivning av bilden. <strong>Överväg att använda titeln på sidan den länkar till som alt-text.</strong> <hr> {ALT} {L} <strong {B}>%(altLength) Tecken</strong> <strong {C}>%(ALT_TEXT)</strong>',
      LINK_IMAGE_ALT: 'Bildlänken innehåller alt-text. <strong>Beskriver alt-texten vart länken tar dig?</strong> Överväg att använda titeln på den sida som länken leder till som alt-text. <hr> {ALT} {L} <strong {C}>%(ALT_TEXT)</strong>',
      LINK_IMAGE_ALT_AND_TEXT: 'Bildlänken innehåller <strong>både alt-text och omgivande länktext.</strong> Om den här bilden är dekorativ och används som en funktionell länk till en annan sida, överväg att markera bilden som dekorativ eller null - den omgivande länktexten bör räcka. <hr> {ALT} <strong {C}>%(ALT_TEXT)</strong> <hr> <strong {B}>Länketikett</strong> {L} <strong {C}>%(TEXT)</strong>',
      IMAGE_FIGURE_DECORATIVE: 'Bilden är markerad som <strong>dekorativ</strong> och kommer att ignoreras av hjälpmedel. <hr> Även om en <strong>textning</strong> tillhandahölls, bör bilden också ha alternativ text i de flesta fall. <ul><li>Alt-texten ska ge en kortfattad beskrivning av vad som finns i bilden.</li><li>Texten ska vanligtvis ge ett sammanhang för att relatera bilden till det omgivande innehållet, eller ge uppmärksamhet åt viss information.</li></ul> Läs mer: <a href="https://thoughtbot.com/blog/alt-vs-figcaption#the-figcaption-element">alt kontra figcaption.</a>',
      IMAGE_FIGURE_DUPLICATE_ALT: 'Använd inte exakt samma ord för både alt- och bildtext. Skärmläsare kommer då att förmedla samma information två gånger. <ul><li>Alt-texten ska ge en kortfattad beskrivning av vad som finns i bilden.</li><li>Tillskriften ska vanligtvis ge sammanhang för att relatera bilden tillbaka till omgivningen innehåll eller ge uppmärksamhet åt en viss information.</li></ul> Läs mer: <a href="https://thoughtbot.com/blog/alt-vs-figcaption#the-figcaption-element">alt kontra figcaption.</a> <hr> {ALT} <strong {C}>%(ALT_TEXT)</strong>',
      IMAGE_DECORATIVE: 'Bilden är markerad som <strong>dekorativ</strong> och kommer att ignoreras av hjälpmedel. Om bilden förmedlar en historia, stämning eller annan viktig information – se till att lägga till alt-text.',
      IMAGE_DECORATIVE_CAROUSEL: 'Bilden är markerad som dekorativ, men alla bilder i en karusell eller ett galleri bör inkludera beskrivende alt-texter för att säkerställa en likvärdig upplevelse för alla.',
      IMAGE_ALT_TOO_LONG: 'Alt-texten är <strong>för lång</strong>. Alt-text ska vara kortfattad men meningsfull som en <em>tweet</em> (cirka 100 tecken). Om detta är en komplex bild eller en graf, överväg att lägga in den längre beskrivningen av bilden i under bilden, eller i en dragspelskomponent. <hr> {ALT} <strong {B}>%(altLength) Tecken</strong> <strong {C}>%(ALT_TEXT)</strong>',
      IMAGE_PASS: '{ALT} %(ALT_TEXT)',

      // Labels
      LABELS_MISSING_IMAGE_INPUT: 'Bildknappen saknar alternativ text. Lägg till alt-text för att ge knappen ett tillgängligt namn. Till exempel: <em>Sök</em> eller <em>Skicka</em>.',
      LABELS_INPUT_RESET: 'Återställningsknappar bör <strong>inte</strong> användas om de inte specifikt behövs, eftersom de är lätta att aktivera av misstag. <hr> <strong>Tips!</strong> Lär dig varför <a href="https://www.nngroup.com/articles/reset-and-cancel-buttons/">Återställ- och Avbryt-knapparna orsakar användbarhetsproblem.</a>',
      LABELS_ARIA_LABEL_INPUT: 'Inmatningsfältet har ett tillgängligt namn, men se till att det även finns en synlig etikett. <hr> <strong {B}>Inmatningsetikett</strong> <strong {C}>%(TEXT)</strong>',
      LABELS_NO_FOR_ATTRIBUTE: 'Det finns ingen etikett associerad med detta inmatningsfält. Lägg till ett <code>for</code>-attribut till etiketten som matchar <code>id</code> för detta inmatningsfält. <hr> ID:t för detta inmatningsfält är: <strong>id=&#34;%(id)&#34;</strong>',
      LABELS_MISSING_LABEL: 'Det finns ingen etikett associerad med detta inmatningsfält. Vänligen lägg till ett <code>id</code> till denna inmatning och lägg till ett matchande <code>for</code>-attribut till etiketten.',

      // Embedded content
      EMBED_VIDEO: 'Se till att <strong>alla videor har undertexter.</strong> Att tillhandahålla textning för allt ljud- och videoinnehåll är ett obligatoriskt krav för nivå A. Bildtexter stöder personer som är D/döva eller hörselskada.',
      EMBED_AUDIO: 'Se till att tillhandahålla en <strong>transkription för alla poddsändningar.</strong> Att tillhandahålla transkriptioner för ljudinnehåll är ett obligatoriskt krav för nivå A. Avskrifter stöder personer som är D/döva eller hörselskada, men kan gynna alla. Överväg att placera utskriften under poddsändingen eller i en dragspelspanel.',
      EMBED_DATA_VIZ: 'Datavisualiseringswidgetar som denna är ofta problematiska för personer som använder tangentbord eller skärmläsare för att navigera, och kan innebära betydande svårigheter för personer som har nedsatt syn eller färgblindhet. Det rekommenderas att tillhandahålla samma information i ett alternativt format (text eller tabell) under widgeten. <hr> Läs mer om <a href="https://www.w3.org/WAI/tutorials/images/complex">komplexa bilder.</a>',
      EMBED_MISSING_TITLE: 'Inbäddat innehåll kräver ett tillgängligt namn som beskriver det inbäddade innehåll. Sätt ett unikt <code>title</code>- eller <code>aria-label</code>-attribut på <code>iframe</code>-elementet. Läs mer om <a href="https://web.dev/learn/accessibility/more-html#iframes">iFrames.</a>',
      EMBED_GENERAL: 'Det gick inte att kontrollera inbäddat innehåll. Se till att bilder har alt-text, videor har undertexter, text har tillräcklig kontrast och att interaktiva komponenter är <a href="https://webaim.org/techniques/keyboard/">tillgängliga för tangentbord.</a>',
      EMBED_UNFOCUSABLE: '<code>&lt;iframe&gt;</code> med oväxlingsbara element bör inte ha <code>tabindex="-1"</code>. Det inbäddade innehållet kommer inte att vara tillgängligt med tangentbordet.',

      // Quality assurance
      QA_BAD_LINK: 'Dålig länk hittades. Länk verkar peka till en utvecklingsmiljö. <hr> Den här länken pekar på: <br> <strong {C}>%(LINK)</strong>',
      QA_IN_PAGE_LINK: 'Bruten samma-sideslänk. Länkmålet matchar inte något element på denna sida.',
      QA_STRONG_ITALICS: 'Feta och kursiva HTML-taggar har semantisk betydelse och bör <strong>inte</strong> användas för att markera hela stycken. Fetstil text bör användas för att ge ett ord eller en fras stark <strong>betoning</strong>. Kursiv stil ska användas för att markera egennamn (d.v.s. bok- och artikeltitlar), främmande ord, citat. Långa citat bör formateras som ett blockcitat.',
      QA_PDF: 'Det går inte att kontrollera PDF-filer för tillgänglighet. PDF-filer betraktas som webbinnehåll och måste också göras tillgängliga. PDF-filer är ofta problematiska för personer som använder skärmläsare (till exempel: saknade strukturella taggar eller saknade formulärfältetiketter) och personer som har nedsatt syn (texten anpassar sig inte när den förstoras). <ul><li>Om detta är ett formulär, överväg att använda ett tillgängligt HTML-formulär som ett alternativ.</li><li>Om detta är ett dokument, överväg att konvertera det till en webbsida.</li></ul> Annars kontrollerar du <a href="https://helpx.adobe.com/acrobat/using/create-verify-pdf-accessibility.html">PDF för tillgänglighet i Acrobat DC.</a>',
      QA_DOCUMENT: 'Det gick inte att kontrollera dokumentets tillgänglighet. Länkade dokument betraktas som webbinnehåll och måste också göras tillgängliga. Granska dokumentet manuellt. <ul><li>Gör ditt <a href="https://support.google.com/docs/answer/6199477?hl=sv">Google Workspace-dokument eller din presentation mer tillgänglig.</a></li><li>Gör dina <a href="https://support.microsoft.com/sv-se/office/create-accessible-office-documents-868ecfcd-4f00-4224-b881-a65537a7c155">Office-dokument mer tillgängliga.</a></li></ul>',
      QA_PAGE_LANG: 'Sidspråk är inte inställt! Vänligen <a href="https://www.w3.org/International/questions/qa-html-language-declarations">ställ in språk på HTML-taggen.</a>',
      QA_PAGE_TITLE: 'Sidtitel saknas! Ange en <a href="https://developer.mozilla.org/en-US/docs/Web/HTML/Element/title">sidtitel.</a>',
      QA_BLOCKQUOTE: 'Är detta en rubrik? <strong {C}>%(TEXT)</strong> <hr> Blockcitat bör endast användas för citattecken. Om detta är tänkt att vara en rubrik, ändra detta blockcitat till en semantisk rubrik (t.ex. Rubrik 2 eller Rubrik 3).',
      QA_FAKE_HEADING: 'Är detta en rubrik? <strong {C}>%(TEXT)</strong> <hr> En rad med fet eller stor text kan se ut som en rubrik, men någon som använder en skärmläsare kan inte se att den är viktig eller hoppa till innehållet. Fet eller stor text ska aldrig ersätta semantiska rubriker (Rubrik 2 till Rubrik 6).',
      QA_FAKE_LIST: 'Försöker du skapa en lista? Möjligt listobjekt hittat: <strong {C}>%(firstPrefix)</strong> <hr> Se till att använda semantiska listor genom att använda punkt- eller sifferformateringsknapparna istället. När du använder en semantisk lista kan hjälpmedel förmedla information som det totala antalet objekt och den relativa positionen för varje objekt i listan. Läs mer om <a href="https://www.w3.org/WAI/tutorials/page-structure/content/#lists">semantiska listor.</a>',
      QA_UPPERCASE: 'Hittade text med enbart versaler. Vissa skärmläsare kan tolka versalskrift som en akronym och läser varje bokstav individuellt. Dessutom upplever vissa personer att det är svårare att läsa versalskrift och det kan se ut som att avsändaren SKRIKER.',
      QA_DUPLICATE_ID: 'Hittade <strong>duplicerat ID</strong>. Dubbletterade ID:n är kända för att orsaka problem för hjälpmedelsverktyg när de försöker interagera med innehåll. <hr> Ta bort eller ändra följande ID: <strong {C}>%(id)</strong>',
      QA_UNDERLINE: 'Understruken text kan förväxlas med länkar. Överväg att använda en annan stil som <code>&lt;strong&gt;</code><strong>fetstil</strong><code>&lt;/strong&gt;</code> eller <code>&lt;em&gt;</code ><em>kursiv</em><code>&lt;/em&gt;</code>.',
      QA_SUBSCRIPT: 'Formateringsalternativen nedsänkt och upphöjd text bör endast användas för att ändra textens position för typografiska konventioner eller standarder. Det bör <strong>inte</strong> endast användas för presentations- eller utseendeändamål. Att formatera hela meningar ställer till läsbarhetsproblem. Lämpliga användningsfall inkluderar visning av exponenter, ordningstal som 4<sup>th</sup> istället för fjärde och kemiska formler (t.ex. H<sub>2</sub>O).',
      QA_NESTED_COMPONENTS: 'Undvik att nästla interaktiva layoutkomponenter, som att placera ackordeoner inom flikar eller flikar inom ackordeoner. Detta kan komplicera navigering, öka den kognitiva belastningen och leda till att människor överser innehåll.',
      QA_UNCONTAINED_LI: 'Alla <code>&lt;li&gt;</code> listobjekt måste placeras inuti <code>&lt;ul&gt;</code> oordnade eller <code>&lt;ol&gt;</code> ordnade element. Denna struktur hjälper skärmläsare att korrekt tillkännage listan och dess objekt.',
      QA_META_SCALABLE: 'Ta bort parametern <code>user-scalable="no"</code> i <code>&lt;meta name="viewport"&gt;</code>-elementet för att tillåta zoomning.',
      QA_META_MAX: 'Säkerställ att parametern <code>maximum-scale</code> i <code>&lt;meta name="viewport"&gt;</code>-elementet inte är mindre än 2.',

      // Tables
      TABLES_MISSING_HEADINGS: 'Tabellrubriker saknas! Tillgänglighetsanpassade tabeller behöver HTML-markup som indikerar rubrikceller och dataceller, vilket definierar deras relation. Informationen ger sammanhang till personer som använder hjälpmedelsverktyg. Tabeller bör endast användas för tabelldata. <hr> Läs mer om <a href="https://www.w3.org/WAI/tutorials/tables/">tillgängliga tabeller.</a>',
      TABLES_SEMANTIC_HEADING: 'Semantiska rubriker som Rubrik 2 eller Rubrik 3 bör endast användas för sektioner av innehåll; <strong>inte</strong> i HTML-tabeller. Ange tabellrubriker med <code>&lt;th&gt;</code>-elementet istället. <hr> Läs mer om <a href="https://www.w3.org/WAI/tutorials/tables/">tillgängliga tabeller.</a>',
      TABLES_EMPTY_HEADING: 'Tom tabellrubrik hittades! Tabellrubriker får <strong>aldrig</strong> vara tomma. Det är viktigt att ange rad- och/eller kolumnrubriker för att förmedla deras relation. Informationen ger sammanhang till personer som använder hjälpmedelsverktyg. Tänk på att tabeller endast ska användas för tabelldata. <hr> Läs mer om <a href="https://www.w3.org/WAI/tutorials/tables/">tillgängliga tabeller.</a>',

      // Contrast
      CONTRAST_ERROR: 'Denna text har inte tillräcklig kontrast mot bakgrunden. Kontrastförhållandet bör vara minst 4,5:1 för normal text och 3:1 för stor text. <hr> <strong {B}>Kontrastförhållande</strong> <strong {B}>%(RATIO)</strong> <strong {C}>%(TEXT)</strong>',
      CONTRAST_WARNING: 'Denna texts är okänd och måste granskas manuellt. Se till att texten och bakgrunden har starka kontrasterande färger. Kontrastförhållandet bör vara minst 4,5:1 för normal text och 3:1 för stor text. <hr> Granska: <strong {C}>%(TEXT)</strong>',
      CONTRAST_INPUT: 'Text i detta inmatningsfält har inte tillräcklig kontrast mot bakgrunden. Kontrastförhållandet bör vara minst 4,5:1 för normal text och 3:1 för stor text. <hr> <strong {B}>Kontrastförhållande</strong> <strong {B}>%(RATIO)</strong>',
    },
  };

  return sv;

}));
