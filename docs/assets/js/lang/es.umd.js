
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
  (global = typeof globalThis !== 'undefined' ? globalThis : global || self, global.Sa11yLangEs = factory());
})(this, (function () { 'use strict';

  var es = {
    // Spanish
    strings: {
      LANG_CODE: 'es',
      MAIN_TOGGLE_LABEL: 'Comprobar Accesibilidad',
      CONTAINER_LABEL: 'Comprobador de Accesilibilidad',
      ERROR: 'Error',
      ERRORS: 'Errores',
      WARNING: 'Advertencia',
      WARNINGS: 'Advertencias',
      GOOD: 'Bien',
      ON: 'Activado',
      OFF: 'Desactivado',
      ALERT_TEXT: 'Alerta',
      ALERT_CLOSE: 'Cerrar',
      OUTLINE: 'Esquema',
      READABILITY_DESC: 'Muestra la puntuación de legibilidad en la pestaña <strong>Esquema</strong> para ayudar a evaluar la dificultad de lectura.',
      TITLE: 'Título',
      ALT: 'ALT',
      IMAGES: 'Imágenes',
      EDIT: 'Editar',
      NO_IMAGES: 'No se encontraron imágenes.',
      DECORATIVE: 'Decorativo',
      MISSING: 'Faltante',
      PAGE_ISSUES: 'Problemas de la Página',
      SETTINGS: 'Ajustes',
      DEVELOPER_CHECKS: 'Verificaciones del desarrollador',
      DEVELOPER_DESC: 'Verifica problemas que pueden requerir conocimientos de programación para solucionarse, como atributos HTML, formularios y más.',
      DARK_MODE: 'Modo Oscuro',
      SHORTCUT_SR: 'Saltar Problema. Atajo de teclado: Alt S',
      SKIP_TO_ISSUE: 'Saltar Problema',
      NEW_TAB: 'Abrir Nueva Ventana',
      LINKED: 'Vinculado',
      PANEL_HEADING: 'Comprobar Accesibilidad',
      NO_ERRORS_FOUND: 'No se encontraron errores.',
      WARNINGS_FOUND: 'Errores Encontrados.',
      TOTAL_FOUND: 'Total de problemas encontrados.',
      NOT_VISIBLE: 'El item que estas intentando ver no es visible; puede estar oculto o dentro de un componente de acordeón o pestaña. Aquí hay una vista previa:',
      MISSING_ROOT: 'Se comprobó la accesibilidad de la página completa porque el área de destino <code>%(root)</code> no existe.',
      MISSING_READABILITY_ROOT: 'La puntuación de legibilidad se basa en el área de contenido <code>%(fallback)</code>, porque el área objetivo <code>%(root)</code> no existe.',
      HEADING_NOT_VISIBLE: 'El encabezado no es visible; puede estar oculto o dentro de un componente de acordeón o pestaña.',
      SKIP_TO_PAGE_ISSUES: 'Saltar problemas de la página',
      CONSOLE_ERROR: 'Lo siento, pero hay un problema con el comprobador de accesibilidad en esta página. Puedes por favor <a href="%(link)">reportarlo a través de este formulario</a> or on <a href="%(link)">GitHub</a>?',
      APPEARANCE: 'Apariencia',
      MOVE_PANEL: 'Mover panel',

      // Export
      DATE: 'Fecha',
      PAGE_TITLE: 'Título de la página',
      RESULTS: 'Resultados',
      EXPORT_RESULTS: 'Exportar resultados',
      GENERATED: 'Resultados generados con %(tool).',
      PREVIEW: 'Vista previa',
      ELEMENT: 'Elemento',
      PATH: 'Ruta',

      // Dismiss
      PANEL_DISMISS_BUTTON: 'Mostrar %(dismissCount) ignorados',
      DISMISS: 'Ignorar',
      DISMISS_ALL: 'Ignorar todo',
      DISMISSED: 'Ignorado',
      DISMISS_REMINDER: 'Tenga en cuenta que las advertencias solo se <strong>ignoran temporalmente</strong>. Eliminar el historial del navegador y las cookies restaurará todas las advertencias previamente ignoradas en todas las páginas.',

      // Colour filters
      COLOUR_FILTER: 'Filtro de color',
      PROTANOPIA: 'Protanopia',
      DEUTERANOPIA: 'Deuteranopia',
      TRITANOPIA: 'Tritanopia',
      MONOCHROMACY: 'Monocromia',
      COLOUR_FILTER_MESSAGE: 'Comprueba elementos que sean difíciles de percibir o distinguir de otros colores.',
      RED_EYE: 'Ciego rojo.',
      GREEN_EYE: 'Ciego verde.',
      BLUE_EYE: 'Ciego azul.',
      MONO_EYE: 'Ciego rojo, azul y verde.',
      COLOUR_FILTER_HIGH_CONTRAST: 'Los filtros de color no funcionan en el modo de alto contraste.',

      // Alternative text stop words
      SUS_ALT_STOPWORDS: ['imagen', 'gráfico', 'foto'],
      PLACEHOLDER_ALT_STOPWORDS: ['alt', 'image', 'photo', 'decorative', 'placeholder', 'placeholder image', 'spacer', 'imagen', 'foto', 'decorativo', 'marcador de posición', 'espaciador'],
      PARTIAL_ALT_STOPWORDS: [
        'clic',
        'clic aquí',
        'clic aquí para mas',
        'clic aquí para saber más',
        'haciendo clic aquí',
        'verificar',
        'detallado aquí',
        'descargar',
        'descargar aquí',
        'descubrir',
        'descubrir más',
        'formulario',
        'aquí',
        'info',
        'información',
        'enlace',
        'saber',
        'saber más',
        'aprender a',
        'más',
        'página',
        'papel',
        'leer más',
        'leer',
        'leer esto',
        'esto',
        'esta página',
        'este sitio web',
        'vista',
        'ver nuestro',
        'sitio web',
      ],
      CLICK: ['click', 'clic'],
      NEW_WINDOW_PHRASES: ['externo', 'nueva página', 'nueva ventana', 'ventana emergente'],
      FILE_TYPE_PHRASES: ['documento', 'hoja de cálculo', 'hoja de cálculo', 'archivo comprimido', 'archivo archivado', 'hoja de trabajo', 'powerpoint', 'presentación', 'instalar', 'video', 'audio', 'pdf'],

      // Readability
      READABILITY: 'Legibilidad',
      AVG_SENTENCE: 'Promedio de palabras por oración:',
      COMPLEX_WORDS: 'Palabra compleja:',
      TOTAL_WORDS: 'Palabras:',
      VERY_DIFFICULT: 'Muy difícil',
      DIFFICULT: 'Dificultad',
      FAIRLY_DIFFICULT: 'Bastante defícil',
      READABILITY_NO_CONTENT: 'No se puede calcular la puntuación de legibilidad. No se encontró contenido de parrafo <code>&lt;p&gt;</code> or list <code>&lt;li&gt;</code>.',
      READABILITY_NOT_ENOUGH: 'No hay suficiente contenido para calcular la puntuación de legibilidad.',

      // Headings
      HEADING_SKIPPED_LEVEL: 'Las cabeceras no deben saltarse niveles ni pasar de <strong>Encabezado %(PREV_LEVEL)</strong> a <strong {C}>Encabezado %(LEVEL)</strong>, ya que esto interrumpe el orden y la jerarquía del contenido, lo que dificulta su seguimiento. <hr> Si <strong {C}>%(HEADING)</strong> cae bajo la sección <strong>%(PREV_HEADING)</strong>, considere formatearlo como un <strong>Encabezado %(LEVEL)</strong> en su lugar.',
      HEADING_EMPTY: 'Encabezado vacío encontrado! Para corregir, elimine esta línea o cambie su formato de <strong {C}>Encabezado %(level)</strong> a <strong>Normal</strong> o <strong>Párrafo</strong>.',
      HEADING_LONG: '¡El título es largo! Los encabezados deben usarse para organizar el contenido y transmitir la estructura. Deben ser breves, informativos y únicos. Mantenga los encabezados de menos de %(MAX_LENGTH) caracteres (no más de una oración). <hr> <strong {B}>%(HEADING_LENGTH) Caracteres</strong>',
      HEADING_FIRST: 'El primer encabezado de una página generalmente debe ser un encabezado 1 o un encabezado 2. El encabezado 1 debe ser el comienzo de la sección de contenido principal y es el encabezado principal que describe el propósito general de la página. Aprender más acerca de la <a href="https://www.w3.org/WAI/tutorials/page-structure/headings/">estructura de encabezado.</a>',
      HEADING_MISSING_ONE: 'Falta el encabezado 1. El encabezado 1 debe ser el comienzo del área de contenido principal y es el encabezado principal que describe el propósito general de la página. Aprender más acerca de la <a href="https://www.w3.org/WAI/tutorials/page-structure/headings/">estructura de encabezado.</a>',
      HEADING_EMPTY_WITH_IMAGE: 'El encabezado no tiene texto, pero contiene una imagen. Si no es un encabezado, cambie su formato de <strong {C}>Título %(level)</strong> a <strong>Normal</strong> o <strong>Párrafo</strong>. De lo contrario, agregue texto alternativo a la imagen si no es decorativa.',
      PANEL_HEADING_MISSING_ONE: 'Falta el encabezado 1!',
      PANEL_NO_HEADINGS: 'No se encontraron encabezados.',

      // Links
      LINK_EMPTY: 'Eliminar enlaces vacíos sin texto.',
      LINK_EMPTY_LABELLEDBY: 'El enlace tiene un valor para <code>aria-labelledby</code> que está vacío o no coincide con el valor del atributo <code>id</code> de otro elemento en la página.',
      LINK_EMPTY_NO_LABEL: 'El enlace no tiene texto perceptible que sea visible para los lectores de pantalla y otras tecnologías de asistencia. Para solucionarlo: <ul><li>Agregue un texto conciso que describa a dónde lo lleva el enlace.</li><li>Si es un <a href="https://a11y-101.com/development/icons-and-links">icono de enlace o SVG,</a> es probable que le falte una etiqueta descriptiva.</li><li>Si cree que este enlace es un error debido a un error de copiar/pegar, considere eliminarlo.</li></ul>',
      LINK_STOPWORD: 'El texto del enlace puede no ser lo suficientemente descriptivo fuera de contexto: <strong {C}>%(ERROR)</strong>',
      LINK_STOPWORD_ARIA: 'Aunque se proporcionó un nombre accesible, considere revisar el texto visible del enlace. Frases como &quot;<strong {C}>%(ERROR)</strong>&quot; no son significativas.',
      LINK_TIP: '<hr> <strong>¡Consejo!</strong> Use un texto de enlace claro y único que describa el destino del enlace, típicamente el título de la página o documento.',
      LINK_CLICK_HERE: 'La frase "haz clic" o "haga clic aquí" pone el foco en la mecánica del mouse, cuando muchas personas no usan un mouse o pueden estar viendo este sitio web en un dispositivo móvil. Considere usar un verbo diferente relacionado con la tarea.',
      DUPLICATE_TITLE: 'El atributo <code>title</code> en enlaces e imágenes está diseñado para proporcionar información adicional y debe ser <strong>diferente</strong> al texto o texto alternativo. El texto del título aparece al pasar el ratón sobre un elemento, pero no es accesible con teclado o entrada táctil. Considere <a href="https://www.a11yproject.com/posts/title-attributes/">evitar completamente el atributo de título.</a>',
      LINK_SYMBOLS: 'Evite usar símbolos como llamadas a la acción dentro del texto del enlace a menos que estén ocultos a las tecnologías de asistencia. Los lectores de pantalla pueden leer los símbolos en voz alta, lo que puede ser confuso. Considere eliminarlos: <strong {C}>%(ERROR)</strong>',
      LINK_URL: 'Las URL más largas y menos inteligibles utilizadas como texto de enlace pueden ser difíciles de escuchar con tecnología de asistencia. En la mayoría de los casos, es mejor usar texto legible por humanos en lugar de la URL. Las URL cortas (como la página de inicio de un sitio) están bien.',
      LINK_DOI: 'En el caso de páginas web o recursos en línea, la <a href="https://apastyle.apa.org/style-grammar-guidelines/paper-format/accessibility/urls#:~:text=descriptive%20links">Guía de estilo de la APA</a> recomienda utilizar enlaces descriptivos que incluyan la URL o el DOI de la obra alrededor de su título. Las URL más largas y menos inteligibles utilizadas como texto de enlace pueden resultar difíciles de comprender cuando se accede a ellas con tecnología de asistencia.',
      LINK_NEW_TAB: 'El enlace se abre en una nueva pestaña o ventana sin previo aviso. Si lo hace, puede ser desorientador, especialmente para las personas que tienen dificultades para percibir el contenido visual. En segundo lugar, no siempre es una buena práctica controlar la experiencia de alguien o tomar decisiones por ellos. Indique que el enlace se abre en una nueva ventana dentro del texto del enlace. <hr> <strong>¡Consejo!</strong> Aprenda las mejores prácticas: <a href="https://www.nngroup.com/articles/new-browser-windows-and-tabs/">abrir enlaces en nuevas ventanas y pestañas del navegador.</a>',
      LINK_FILE_EXT: 'El enlace apunta a un archivo PDF o descargable (por ejemplo, MP3, Zip, Word Doc) sin previo aviso. Indique el tipo de archivo dentro del texto del enlace. Si es un archivo grande, considere incluir el tamaño del archivo. <hr> <strong>Ejemplo:</strong> Informe ejecutivo (PDF, 3 MB)',
      LINK_IDENTICAL_NAME: 'El enlace tiene el mismo texto que otro enlace, aunque apunta a una página diferente. Varios enlaces con el mismo texto pueden causar confusión a las personas que usan lectores de pantalla. <strong>Considere hacer el siguiente enlace más descriptivo para ayudar a distinguirlo de otros enlaces.</strong> <hr> <strong {B}>Nombre accesible</strong> <strong {C}>%(TEXT)</strong>',

      // Images
      MISSING_ALT_LINK_HAS_TEXT: 'La imagen se utiliza como vínculo con el texto circundante, aunque el atributo alt debe marcarse como decorativo o nulo.',
      MISSING_ALT_LINK: 'La imagen se está utilizando como enlace, ¡pero falta el texto alternativo! Asegúrese de que el texto alternativo describa a dónde lo lleva el enlace.',
      MISSING_ALT: '¡Falta el texto alternativo! Si la imagen transmite una historia, un estado de ánimo o información importante, asegúrese de describir la imagen.',
      LINK_ALT_FILE_EXT: 'El texto alternativo no debe incluir extensiones de archivos ni dimensiones de imágenes. Asegúrese de que el texto alternativo describa el destino del enlace, no una descripción literal de la imagen. Eliminar: <strong {C}>%(ERROR)</strong> <hr> {ALT} {L} <strong {C}>%(ALT_TEXT)</strong>',
      LINK_PLACEHOLDER_ALT: 'Se encontró texto alternativo no descriptivo o de marcador de posición dentro de una imagen vinculada. Asegúrese de que el texto alternativo describa el destino del enlace, no una descripción literal de la imagen. Reemplace el siguiente texto alternativo. <hr> {ALT} {L} <strong {C}>%(ALT_TEXT)</strong>',
      LINK_SUS_ALT: 'Las tecnologías de asistencia ya indican que se trata de una imagen, por lo que &quot;<strong {C}>%(ERROR)</strong>&quot; puede ser redundante. Asegúrese de que el texto alternativo describa el destino del enlace, no una descripción literal de la imagen. <hr> {ALT} {L} <strong {C}>%(ALT_TEXT)</strong>',
      ALT_FILE_EXT: 'El texto alternativo no debe incluir extensiones de archivos ni dimensiones de imágenes. Si la imagen transmite una historia, un estado de ánimo o información importante, asegúrese de describir la imagen. Eliminar: <strong {C}>%(ERROR)</strong> <hr> {ALT} <strong {C}>%(ALT_TEXT)</strong>',
      ALT_PLACEHOLDER: 'Se encontró texto alternativo no descriptivo o de marcador de posición. Reemplace el siguiente texto alternativo con algo más significativo. <hr> {ALT} <strong {C}>%(ALT_TEXT)</strong>',
      SUS_ALT: 'Las tecnologías de asistencia ya indican que se trata de una imagen, por lo que &quot;<strong {C}>%(ERROR)</strong>&quot; puede ser redundante. <hr> {ALT} <strong {C}>%(ALT_TEXT)</strong>',
      LINK_IMAGE_NO_ALT_TEXT: 'La imagen dentro del enlace está marcada como decorativa y no hay texto de enlace. Agregue texto alternativo a la imagen que describa el destino del enlace.',
      LINK_IMAGE_TEXT: 'La imagen está marcada como decorativa, aunque el enlace utiliza el texto circundante como etiqueta descriptiva.',
      LINK_IMAGE_LONG_ALT: 'La descripción del texto alternativo en una imagen vinculada es <strong>demasiado larga</strong>. El texto alternativo en las imágenes vinculadas debe describir a dónde lo lleva el enlace, no una descripción literal de la imagen. <strong>Considere usar el título de la página a la que enlaza como texto alternativo.</strong> <hr> {ALT} {L} <strong {B}>%(altLength) Caracteres</strong> <strong {C}>%(ALT_TEXT)</strong>',
      LINK_IMAGE_ALT: 'El enlace de la imagen contiene un texto alternativo. <strong>¿Describe el texto alternativo a dónde lleva el enlace?</strong> Considere la posibilidad de utilizar el título de la página a la que enlaza como texto alternativo. <hr> {ALT} {L} <strong {C}>%(ALT_TEXT)</strong>',
      LINK_IMAGE_ALT_AND_TEXT: 'El enlace de la imagen contiene <strong>texto alternativo y texto del enlace que la rodea.</strong> Si esta imagen es decorativa y se usa como un enlace funcional a otra página, considere marcar la imagen como decorativa o nula; el texto del enlace que la rodea debería ser suficiente. <hr> {ALT} <strong {C}>%(ALT_TEXT)</strong> <hr> <strong {B}>Nombre accesible</strong> {L} <strong {C}>%(TEXT)</strong>',
      IMAGE_FIGURE_DECORATIVE: 'La imagen está marcada como <strong>decorativa</strong> y la tecnología de asistencia la ignorará. <hr> Aunque se proporcionó un <strong>título</strong>, la imagen también debe tener texto alternativo en la mayoría de los casos. <ul><li>El texto alternativo debe brindar una descripción concisa de lo que hay en la imagen.</li><li>La leyenda generalmente debe brindar contexto para relacionar la imagen con el contenido que la rodea, o llamar la atención sobre un tema en particular. pieza de información.</li></ul>Más información: <a href="https://thoughtbot.com/blog/alt-vs-figcaption#the-figcaption-element">alt versus figcaption.</a>',
      IMAGE_FIGURE_DUPLICATE_ALT: 'No utilices exactamente las mismas palabras para el texto alternativo y el subtítulo. Los lectores de pantalla anunciarán la información dos veces.<ul><li>El texto alternativo debe proporcionar una descripción concisa de lo que hay en la imagen.</li><li>La leyenda generalmente debe proporcionar contexto para relacionar la imagen con el entorno. contenido o preste atención a una información en particular.</li></ul> Obtenga más información: <a href="https://thoughtbot.com/blog/alt-vs-figcaption#the-figcaption-element">alt versus figcaption.</a> <hr> {ALT} <strong {C}>%(ALT_TEXT)</strong>',
      IMAGE_DECORATIVE: 'La imagen está marcada como <strong>decorativa</strong> y la tecnología de asistencia la ignorará. Si la imagen transmite una historia, un estado de ánimo o información importante, asegúrese de agregar texto alternativo.',
      IMAGE_DECORATIVE_CAROUSEL: 'La imagen está marcada como decorativa, pero todas las imágenes en un carrusel o galería deben incluir un texto alternativo descriptivo para garantizar una experiencia equivalente para todos.',
      IMAGE_ALT_TOO_LONG: 'La descripción del texto alternativo es <strong>demasiado larga</strong>. El texto alternativo debe ser conciso, pero significativo como un <em>tweet</em> (alrededor de 100 caracteres). Si se trata de una imagen compleja o un gráfico, considere colocar la descripción larga de la imagen en el texto a continuación o en un componente de acordeón. <hr> {ALT} <strong {B}>%(altLength) Caracteres</strong> <strong {C}>%(ALT_TEXT)</strong>',
      IMAGE_PASS: '{ALT} %(ALT_TEXT)',

      // Labels
      LABELS_MISSING_IMAGE_INPUT: 'Al botón de imagen le falta el texto alternativo. Agregue texto alternativo para proporcionar un nombre accesible. Por ejemplo: <em>Buscar</em> o <em>Enviar</em>.',
      LABELS_INPUT_RESET: 'Los botones de reinicio <strong>no</strong> deben usarse a menos que se necesiten específicamente porque son fáciles de activar por error. <hr> <strong>¡Consejo!</strong> Descubra por qué <a href="https://www.nngroup.com/articles/reset-and-cancel-buttons/">los botones Restablecer y Cancelar plantean problemas de uso.</a>',
      LABELS_ARIA_LABEL_INPUT: 'La entrada tiene un nombre accesible, aunque asegúrese de que también haya una etiqueta visible. <hr> <strong {B}>Nombre accesible</strong> <strong {C}>%(TEXT)</strong>',
      LABELS_NO_FOR_ATTRIBUTE: 'No hay ninguna etiqueta asociada con esta entrada. Agregue un atributo <code>for</code> a la etiqueta que coincida con el <code>id</code> de esta entrada. <hr> <strong {B}>ID</strong> <strong {C}>#%(id)</strong>',
      LABELS_MISSING_LABEL: 'No hay ninguna etiqueta asociada con esta entrada. Agregue un <code>id</code> a esta entrada y agregue un atributo <code>for</code> coincidente a la etiqueta.',
      LABELS_PLACEHOLDER: 'El texto del marcador de posición que desaparece dificulta que las personas recuerden qué información pertenece a un campo y a identificar y corregir problemas de validación. En su lugar, considere usar una pista permanentemente visible antes del campo del formulario. <hr> Obtenga más información: <a href="https://www.nngroup.com/articles/form-design-placeholders/">Los marcadores de posición en los campos de formulario son dañinos.</a>',

      // Embedded content
      EMBED_VIDEO: 'Asegúrese de que <strong>todos los videos tengan subtítulos.</strong> Proporcionar subtítulos para todo el contenido de audio y video es un requisito obligatorio de nivel A. Los subtítulos ayudan a las personas sordas o con dificultades auditivas.',
      EMBED_AUDIO: 'Asegúrese de proporcionar una <strong>transcripción para todos los podcasts</strong>. Proporcionar transcripciones para el contenido de audio es un requisito obligatorio de nivel A. Las transcripciones ayudan a las personas sordas o con dificultades auditivas, pero pueden beneficiar a todos. Considere colocar la transcripción debajo o dentro de un panel de acordeón.',
      EMBED_DATA_VIZ: 'Los widgets de visualización de datos como este a menudo son problemáticos para las personas que usan un teclado o un lector de pantalla para navegar, y pueden presentar dificultades significativas para las personas con problemas de visión o daltónicos. Se recomienda proporcionar la misma información en un formato alternativo (texto o tabla) debajo del widget. <hr> Más información sobre <a href="https://www.w3.org/WAI/tutorials/images/complex">imágenes complejas</a>',
      EMBED_MISSING_TITLE: 'El contenido incrustado requiere un nombre accesible que describa su contenido. Proporcione un atributo único <code>title</code> o <code>aria-label</code> en el elemento <code>iframe</code>. Más información sobre <a href="https://web.dev/learn/accessibility/more-html#iframes">iFrames.</a>',
      EMBED_GENERAL: 'No se puede comprobar el contenido incrustado. Asegúrese de que las imágenes tengan texto alternativo, los videos tengan subtítulos, el texto tenga suficiente contraste y los componentes interactivos sean <a href="https://webaim.org/techniques/keyboard/">accesibles mediante teclado.</a>',
      EMBED_FOCUSABLE: '<code>&lt;iframe&gt;</code> with focusable elements should not have <code>tabindex="-1"</code>. The embedded content will not be keyboard accessible.',
      EMBED_UNFOCUSABLE: '<code>&lt;iframe&gt;</code> con elementos no enfocables no debe tener <code>tabindex="-1"</code>. El contenido incrustado no será accesible mediante el teclado.',

      // Quality assurance
      QA_BAD_LINK: 'Enlace incorrecto encontrado. El enlace parece apuntar a un entorno de desarrollo. <hr> {L} <strong {C}>%(LINK)</strong>',
      QA_STRONG_ITALICS: 'Las etiquetas en negrita y cursiva tienen un significado semántico y <strong>no</strong> deben usarse para resaltar párrafos completos. El texto en negrita se debe utilizar para dar un fuerte <strong>énfasis</strong> a una palabra o frase. Se debe usar cursiva para resaltar nombres propios (es decir, títulos de libros y artículos), palabras extranjeras, citas. Las comillas largas deben formatearse como comillas en bloque.',
      QA_PDF: 'No se pueden verificar los archivos PDF para accesibilidad. Los archivos PDF se consideran contenido web y también deben ser accesibles. Los archivos PDF a menudo contienen problemas para las personas que usan lectores de pantalla (faltan etiquetas estructurales o etiquetas de campos de formulario) y personas con problemas de visión (el texto no se ajusta cuando se amplía). <ul><li>Si se trata de un formulario, considere usar un formulario HTML accesible como alternativa.</li><li>Si se trata de un documento, considere convertirlo en una página web.</li></ul> De lo contrario, consulte <a href="https://helpx.adobe.com/acrobat/using/create-verify-pdf-accessibility.html">PDF para conocer la accesibilidad en Acrobat DC.</a>',
      QA_DOCUMENT: 'No se puede comprobar la accesibilidad del documento. Los documentos vinculados se consideran contenido web y también deben ser accesibles. Por favor revise manualmente este documento. <ul><li>Haz que tu <a href="https://support.google.com/docs/answer/6199477?hl=es">documento o presentación de Google Workspace sea más accesible.</a></li> <li>Haz que tus <a href="https://support.microsoft.com/es/office/create-accessible-office-documents-868ecfcd-4f00-4224-b881-a65537a7c155">documentos de Office sean más accesibles.</a></li></ul>',
      QA_BLOCKQUOTE: '¿Es esto un encabezado? <strong {C}>%(TEXT)</strong> <hr> Las comillas en bloque deben usarse solo para comillas. Si pretende ser un encabezado, cambie esta cita en bloque a un encabezado semántico (por ejemplo, Título 2 o Título 3).',
      QA_FAKE_HEADING: '¿Es esto un encabezado? <strong {C}>%(TEXT)</strong> <hr> Una línea de texto en negrita o grande puede parecer un encabezado, pero alguien que usa un lector de pantalla no puede decir que es importante o saltar a su contenido. El texto en negrita o grande nunca debe reemplazar los encabezados semánticos (Título 2 a Título 6).',
      QA_FAKE_LIST: '¿Estás tratando de crear una lista? Posible elemento de lista encontrado: <strong {C}>%(firstPrefix)</strong> <hr> Asegúrese de usar listas semánticas utilizando los botones de formato de viñetas o números en su lugar. Cuando se utiliza una lista semántica, las tecnologías de asistencia pueden transmitir información como el número total de elementos y la posición relativa de cada elemento en la lista. Obtenga más información sobre las <a href="https://www.w3.org/WAI/tutorials/page-structure/content/#lists">listas semánticas.</a>',
      QA_UPPERCASE: 'Encontrado todo en mayúsculas. Algunos lectores de pantalla pueden interpretar todo el texto en mayúsculas como un acrónimo y leerán cada letra individualmente. Además, algunas personas encuentran que las mayúsculas son más difíciles de leer y puede dar la apariencia de GRITO.',
      QA_UNDERLINE: 'El texto subrayado se puede confundir con enlaces. Considere usar un estilo diferente como <code>&lt;strong&gt;</code><strong>gran importancia</strong><code>&lt;/strong&gt;</code> o <code>&lt;em&gt;</code><em>énfasis</em><code>&lt;/em&gt;</code>.',
      QA_SUBSCRIPT: 'Las opciones de formato de subíndice y superíndice solo deben usarse para cambiar la posición del texto por convenciones o estándares tipográficos. <strong>No</strong> debe usarse únicamente con fines de presentación o apariencia. Dar formato a oraciones completas plantea problemas de legibilidad. Los casos de uso apropiados incluirían mostrar exponentes, números ordinales como 4<sup>th</sup> en lugar de cuarto y fórmulas químicas (por ejemplo, H<sub>2</sub>O).',
      QA_IN_PAGE_LINK: 'Enlace interno roto. El destino del enlace no coincide con ningún elemento en esta página.',
      QA_NESTED_COMPONENTS: 'Evita anidar componentes de diseño interactivos, como colocar acordeones dentro de pestañas o pestañas dentro de acordeones. Esto puede complicar la navegación, aumentar la carga cognitiva y llevar a que las personas pasen por alto el contenido.',
      QA_JUSTIFY: 'Evite usar texto justificado, que se alinea tanto a los márgenes izquierdo como derecho. Esto puede ser difícil de leer para algunas personas debido a los espacios desiguales entre las palabras. Use texto alineado a la izquierda para una mejor legibilidad.',
      QA_SMALL_TEXT: 'El texto pequeño es más difícil de leer, especialmente para aquellos con baja visión. Para garantizar una mejor legibilidad, evite usar tamaños de fuente más pequeños que el predeterminado.',

      // Shared
      ACC_NAME: '<strong {B}>Nombre accesible</strong> %(TEXT)',
      ACC_NAME_TIP: '<hr> <strong>Consejo!</strong> El "nombre accesible" es la etiqueta final que se comunica a las personas que utilizan tecnología de asistencia. Esto les ayuda a entender el propósito del enlace o botón.',
      HIDDEN_FOCUSABLE: 'El enlace o botón tiene <code>aria-hidden=&quot;true&quot;</code>, pero aún es accesible con el teclado. Si tiene la intención de ocultar un enlace o botón duplicado, agregue también <code>tabindex=&quot;-1&quot;</code>. De lo contrario, no debe usarse <code>aria-hidden=&quot;true&quot;</code> en elementos que puedan recibir el enfoque. <hr> Obtenga más información sobre el <a href="https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/Attributes/aria-hidden">atributo aria-hidden.</a>',

      // Developer
      DUPLICATE_ID: '<strong>Identificación duplicada</strong> encontrada. Se sabe que los errores de ID duplicados causan problemas a las tecnologías de asistencia cuando intentan interactuar con el contenido. Elimine o cambie el siguiente ID. <hr> <strong {B}>ID</strong> <strong {C}>#%(id)</strong>',
      UNCONTAINED_LI: 'Todos los elementos de lista <code>&lt;li&gt;</code> deben colocarse dentro de elementos <code>&lt;ul&gt;</code> desordenados o <code>&lt;ol&gt;</code> ordenados. Esta estructura ayuda a los lectores de pantalla a anunciar la lista y sus elementos con precisión.',
      TABINDEX_ATTR: 'El elemento no debe tener un atributo <code>tabindex</code> mayor que 0.',

      // Meta checks
      META_LANG: '¡Idioma de la página no declarado! <a href="https://www.w3.org/International/questions/qa-html-language-declarations">declare el idioma en la etiqueta HTML.</a>',
      META_TITLE: '¡Falta el título de la página! Proporcione un <a href="https://developer.mozilla.org/es/docs/Web/HTML/Element/title">título de página.</a>',
      META_SCALABLE: 'Elimine el parámetro <code>user-scalable="no"</code> en la <a href="https://developer.mozilla.org/en-US/docs/Web/HTML/Viewport_meta_tag">meta etiqueta del viewport</a> para permitir el zoom.',
      META_MAX: 'Asegúrese de que el parámetro <code>maximum-scale</code> en la <a href="https://developer.mozilla.org/en-US/docs/Web/HTML/Viewport_meta_tag">meta etiqueta del viewport</a> no sea inferior a 2.',
      META_REFRESH: 'La página no debería actualizarse automáticamente utilizando una etiqueta meta.',

      // Buttons
      BTN_EMPTY: 'El botón carece de un nombre accesible que describa su propósito.',
      BTN_EMPTY_LABELLEDBY: 'El botón tiene un valor de <code>aria-labelledby</code> que está vacío o no coincide con el valor de <code>id</code> de otro elemento en la página.',
      BTN: 'botón',
      BTN_TIP: 'Aprende a crear un <a href="https://www.sarasoueidan.com/blog/accessible-icon-buttons/">botón accesible.</a>',
      BTN_ROLE_IN_NAME: 'No incluyas la palabra "botón" en el nombre de un botón. Los lectores de pantalla ya comunican el rol de un elemento además de su nombre.',
      LABEL_IN_NAME: 'El texto visible para este elemento parece ser diferente al nombre accesible, lo que puede causar confusión para los usuarios de tecnologías de asistencia. Por favor revisa: <hr> <strong {B}>Nombre Accesible</strong> <strong {C}>%(TEXT)</strong>',

      // Tables
      TABLES_MISSING_HEADINGS: '¡Faltan encabezados de tabla! Las tablas accesibles necesitan marcado HTML que indique las celdas de encabezado y las celdas de datos que definen su relación. Esta información brinda contexto a las personas que usan tecnología de asistencia. Las tablas deben usarse solo para datos tabulares. <hr> Más información sobre las <a href="https://www.w3.org/WAI/tutorials/tables/">tablas accesibles.</a>',
      TABLES_SEMANTIC_HEADING: 'Los encabezados semánticos como el Encabezado 2 o el Encabezado 3 solo deben usarse para secciones de contenido; <strong>no</strong> en tablas HTML. Indique los encabezados de la tabla usando el elemento <code>&lt;th&gt;</code> en su lugar. <hr> Más información sobre las <a href="https://www.w3.org/WAI/tutorials/tables/">tablas accesibles.</a>',
      TABLES_EMPTY_HEADING: '¡Encabezado de tabla vacío encontrado! Los encabezados de las tablas <strong>nunca</strong> deben estar vacíos. Es importante designar encabezados de fila y/o columna para transmitir su relación. Esta información brinda contexto a las personas que usan tecnología de asistencia. Tenga en cuenta que las tablas deben usarse solo para datos tabulares. <hr> Más información sobre las <a href="https://www.w3.org/WAI/tutorials/tables/">tablas accesibles.</a>',

      // Contrast
      CONTRAST_NORMAL: 'El texto de tamaño normal debe tener una relación de contraste de al menos %(RATIO).',
      CONTRAST_LARGE: 'El texto de tamaño grande debe tener una relación de contraste de al menos %(RATIO).',
      CONTRAST_ERROR: 'El texto no tiene suficiente contraste con el fondo, lo que dificulta su lectura.',
      CONTRAST_WARNING: 'El contraste de este texto es desconocido y debe revisarse manualmente. Asegúrese de que el texto y el fondo tengan colores con un fuerte contraste.',
      CONTRAST_ERROR_GRAPHIC: 'El gráfico no tiene suficiente contraste con el fondo, lo que dificulta su visibilidad.',
      CONTRAST_WARNING_GRAPHIC: 'El contraste de este gráfico es desconocido y debe revisarse manualmente.',
      CONTRAST_TIP_GRAPHIC: 'Los gráficos y los elementos de la interfaz de usuario deben tener al menos una relación de contraste de 3:1.',
      CONTRAST_OPACITY: 'Aumente la opacidad para una mejor visibilidad.',
      CONTRAST_APCA: 'Este contraste no es suficiente para ningún tamaño de texto. ¿Considera usar esta combinación de color y tamaño de texto?',
      CONTRAST_COLOR: '¿Considera usar este color en su lugar?',
      CONTRAST_SIZE: '¿Considera aumentar el tamaño del texto para esta combinación de colores?',
      CONTRAST_PLACEHOLDER: 'El texto del marcador de posición en esta entrada no tiene suficiente contraste con el fondo, lo que dificulta su lectura.',
      CONTRAST_PLACEHOLDER_UNSUPPORTED: 'El contraste de este texto de marcador de posición es desconocido y debe revisarse manualmente. Asegúrese de que el texto y el fondo tengan colores fuertemente contrastantes.',
      CONTRAST_INPUT: 'El texto en esta entrada no tiene suficiente contraste con el fondo, lo que dificulta su lectura.',
      CONTRAST: 'Contraste',
      UNKNOWN: 'Desconocido',
      FG: 'Primer plano',
      BG: 'Fondo',
      NO_SUGGESTION: 'No se puede encontrar una combinación accesible cambiando solo el color del texto. Intente cambiar el color de fondo.',
    },
  };

  return es;

}));
