
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
  (global = typeof globalThis !== 'undefined' ? globalThis : global || self, global.Sa11yLangPtPT = factory());
})(this, (function () { 'use strict';

  /*! WARNING: This is a machine-generated translation and may contain errors or inaccuracies. */
  var ptPT = {
    // Portuguese (Portugal)
    strings: {
      LANG_CODE: 'pt-pt',
      MAIN_TOGGLE_LABEL: 'Verificar a acessibilidade',
      CONTAINER_LABEL: 'Verificador de acessibilidade',
      ERROR: 'Erro',
      ERRORS: 'Erros',
      WARNING: 'Aviso',
      WARNINGS: 'Avisos',
      GOOD: 'Bom',
      ON: 'Ligado',
      OFF: 'Desligado',
      ALERT_TEXT: 'Alerta',
      ALERT_CLOSE: 'Fechar',
      OUTLINE: 'Estrutura',
      READABILITY_DESC: 'Mostra a pontuação de legibilidade no separador <strong>Estrutura</strong> para ajudar a avaliar a dificuldade de leitura.',
      TITLE: 'Título',
      ALT: 'ALT',
      IMAGES: 'Imagens',
      EDIT: 'Editar',
      NO_IMAGES: 'Nenhuma imagem encontrada.',
      DECORATIVE: 'Decorativo',
      MISSING: 'Em falta',
      PAGE_ISSUES: 'Questões de página',
      SETTINGS: 'Definições',
      DEVELOPER_CHECKS: 'Verificações do desenvolvedor',
      DEVELOPER_DESC: 'Verifica problemas que podem exigir conhecimentos de programação para serem corrigidos, como atributos HTML, formulários e mais.',
      DARK_MODE: 'Modo escuro',
      SHORTCUT_SR: 'Saltar para a edição. Atalho de teclado: Alt S',
      SKIP_TO_ISSUE: 'Saltar para a edição',
      NEW_TAB: 'Abre um novo separador',
      LINKED: 'Vinculado',
      PANEL_HEADING: 'Controlo de acessibilidade',
      NO_ERRORS_FOUND: 'Não foram encontrados erros.',
      WARNINGS_FOUND: 'avisos encontrados.',
      TOTAL_FOUND: 'total de problemas encontrados.',
      NOT_VISIBLE: 'O item que está a tentar visualizar não está visível; pode estar oculto ou dentro de um componente de acordeão ou separador. Aqui está uma pré-visualização:',
      MISSING_ROOT: 'A página completa foi verificada quanto à acessibilidade porque a área de destino <code>%(root)</code> não existe.',
      MISSING_READABILITY_ROOT: 'A pontuação de legibilidade é baseada na área de conteúdo <code>%(fallback)</code>, porque a área alvo <code>%(root)</code> não existe.',
      HEADING_NOT_VISIBLE: 'O cabeçalho não é visível; pode estar oculto ou dentro de um componente de acordeão ou separador.',
      SKIP_TO_PAGE_ISSUES: 'Saltar para os problemas da página',
      CONSOLE_ERROR: 'Desculpe, mas há um problema com o verificador de acessibilidade nesta página. Pode, por favor, <a href="%(link)">relatar o problema através deste formulário</a> ou no <a href="%(link)">GitHub</a>?',
      APPEARANCE: 'Aparência',
      MOVE_PANEL: 'Mover painel',

      // Dismiss
      PANEL_DISMISS_BUTTON: 'Mostrar %(dismissCount) ignorados',
      DISMISS: 'Ignorar',
      DISMISS_ALL: 'Ignorar tudo',
      DISMISSED: 'Ignorado',
      DISMISS_REMINDER: 'Por favor, note que os alertas são apenas <strong>temporariamente</strong> ignorados. Limpar o histórico do navegador e os cookies restaurará todos os alertas anteriormente ignorados em todas as páginas.',

      // Export
      DATE: 'Data',
      PAGE_TITLE: 'Título da página',
      RESULTS: 'Resultados',
      EXPORT_RESULTS: 'Exportar resultados',
      GENERATED: 'Resultados gerados com %(tool).',
      PREVIEW: 'Pré-visualização',
      ELEMENT: 'Elemento',
      PATH: 'Caminho',

      // Colour filters
      COLOUR_FILTER: 'Filtro de cor',
      PROTANOPIA: 'Protanopia',
      DEUTERANOPIA: 'Deuteranopia',
      TRITANOPIA: 'Tritanopia',
      MONOCHROMACY: 'Monocromacia',
      COLOUR_FILTER_MESSAGE: 'Verificar se existem elementos difíceis de perceber ou distinguir de outras cores.',
      RED_EYE: 'Cego vermelho.',
      GREEN_EYE: 'Cego verde.',
      BLUE_EYE: 'Cego azul.',
      MONO_EYE: 'Cego vermelho, azul e verde.',
      COLOUR_FILTER_HIGH_CONTRAST: 'Os filtros de cor não funcionam no modo de alto contraste.',

      // Alternative text stop words
      SUS_ALT_STOPWORDS: [
        'imagem',
        'gráfico',
        'imagem',
        'fotografia',
        'photo',
        'image',
        'graphic',
      ],
      PLACEHOLDER_ALT_STOPWORDS: [
        'alt',
        'imagem',
        'fotografia',
        'decorativo',
        'photo',
        'image',
        'graphic',
        'marcador de posição',
        'imagem de marcador de posição',
        'espaçador',
      ],
      PARTIAL_ALT_STOPWORDS: [
        'clique',
        'clique aqui',
        'clique aqui para mais',
        'clique aqui para saber mais',
        'clicando aqui',
        'verificar',
        'detalhado aqui',
        'descarregar',
        'descarregar aqui',
        'descobrir',
        'saber mais',
        'para saber mais',
        'forma',
        'aqui',
        'informação',
        'ligação',
        'aprender',
        'aprender a',
        'mais',
        'página',
        'papel',
        'ler mais',
        'ler',
        'ler isto',
        'este',
        'esta página',
        'este sítio web',
        'ver',
        'ver a nossa',
        'sítio web',
      ],
      CLICK: ['click', 'clique'],
      NEW_WINDOW_PHRASES: [
        'externo',
        'novo separador',
        'nova janela',
        'pop-up',
        'aparecer',
      ],
      FILE_TYPE_PHRASES: ['documento', 'planilha', 'planilha de cálculo', 'arquivo compactado', 'arquivo arquivado', 'planilha', 'powerpoint', 'apresentação', 'instalar', 'vídeo', 'áudio', 'pdf'],

      // Readability
      READABILITY: 'Legibilidade',
      AVG_SENTENCE: 'Média de palavras por frase:',
      COMPLEX_WORDS: 'Palavras complexas:',
      TOTAL_WORDS: 'Palavras:',
      VERY_DIFFICULT: 'Muito difícil',
      DIFFICULT: 'Difícil',
      FAIRLY_DIFFICULT: 'Bastante difícil',
      READABILITY_NO_CONTENT: 'Não é possível calcular a pontuação de legibilidade. Nenhum parágrafo <code>&lt;p&gt;</code> ou conteúdo de lista <code>&lt;li&gt;</code> encontrado.',
      READABILITY_NOT_ENOUGH: 'Não há conteúdo suficiente para calcular a pontuação de legibilidade.',

      // Headings
      HEADING_SKIPPED_LEVEL: 'Os cabeçalhos não devem pular níveis ou saltar de <strong>Cabeçalho %(PREV_LEVEL)</strong> para <strong {C}>Cabeçalho %(LEVEL)</strong>, pois isso interrompe a ordem e a hierarquia do conteúdo, dificultando o acompanhamento. <hr> Se <strong {C}>%(HEADING)</strong> estiver sob a seção <strong>%(PREV_HEADING)</strong>, considere formatá-lo como um <strong>Cabeçalho %(LEVEL)</strong> no lugar.',
      HEADING_EMPTY: 'Encontrado um título vazio! Para corrigir, elimine esta linha ou altere o seu formato de <strong {C}>Título %(level)</strong> para <strong>Normal</strong> ou <strong>Parágrafo</strong>.',
      HEADING_LONG: 'O título é longo! Os títulos devem ser utilizados para organizar o conteúdo e transmitir estrutura. Devem ser breves, informativos e únicos. Os títulos devem ter menos de %(MAX_LENGTH) caracteres (não mais do que uma frase). <hr> <strong {B}>%(HEADING_LENGTH) Caracteres</strong>',
      HEADING_FIRST: 'O primeiro título de uma página deve ser normalmente o Título 1 ou o Título 2. O Título 1 deve ser o início da secção de conteúdo principal e é o título principal que descreve o objetivo geral da página. Saiba mais sobre <a href="https://www.w3.org/WAI/tutorials/page-structure/headings/">Estrutura de títulos.</a>',
      HEADING_MISSING_ONE: 'Falta o Título 1. O Título 1 deve ser o início da área de conteúdo principal e é o título principal que descreve o objetivo geral da página. Saiba mais sobre <a href="https://www.w3.org/WAI/tutorials/page-structure/headings/">Estrutura de cabeçalho.</a>',
      HEADING_EMPTY_WITH_IMAGE: 'O cabeçalho não tem texto, mas contém uma imagem. Se não for um cabeçalho, altere o formato de <strong {C}>Título %(level)</strong> para <strong>Normal</strong> ou <strong>Parágrafo</strong>. Caso contrário, adicione texto alternativo à imagem se esta não for decorativa.',
      PANEL_HEADING_MISSING_ONE: 'Falta o título 1!',
      PANEL_NO_HEADINGS: 'Não foram encontrados cabeçalhos.',

      // Links
      LINK_EMPTY: 'Remover ligações vazias sem qualquer texto.',
      LINK_EMPTY_LABELLEDBY: 'A ligação tem um valor para <code>aria-labelledby</code> que está vazio ou não corresponde ao valor do atributo <code>id</code> de outro elemento na página.',
      LINK_EMPTY_NO_LABEL: 'A ligação não tem texto discernível que seja visível para leitores de ecrã e outras tecnologias de assistência. Para corrigir: <ul><li>Adicione um texto conciso que descreva para onde o link o leva.</li><li>Se for um <a href="https://a11y-101.com/development/icons-and-links">link de ícone ou SVG,</a> é provável que esteja faltando um rótulo descritivo.</li><li>Se você acha que esse link é um erro devido a um bug de copiar/colar, considere excluí-lo.</li></ul>',
      LINK_STOPWORD: 'O texto do link pode não ser suficientemente descritivo fora do contexto: <strong {C}>%(ERROR)</strong>',
      LINK_STOPWORD_ARIA: 'Embora tenha sido fornecido um nome acessível, considere rever o texto visível do link. Frases como &quot;<strong {C}>%(ERROR)</strong>&quot; não são significativas.',
      LINK_TIP: '<hr> <strong>Dica!</strong> Utilize texto de link claro e único que descreva o destino do link, normalmente o título da página ou documento.',
      LINK_CLICK_HERE: 'A expressão "clique" ou "clique aqui" coloca foco na mecânica do rato, quando muitas pessoas não usam rato ou podem visualizar este site num dispositivo móvel. Considere usar outro verbo relacionado à tarefa.',
      DUPLICATE_TITLE: 'O atributo <code>title</code> em links e imagens destina-se a fornecer informações adicionais e deve ser <strong>diferente</strong> do texto ou texto alternativo. O texto do título aparece ao passar o rato sobre um elemento, mas não é acessível com teclado ou toque. Considere <a href="https://www.a11yproject.com/posts/title-attributes/">evitar totalmente o atributo title.</a>',
      LINK_SYMBOLS: 'Evite usar símbolos como chamadas à ação no texto do link, a menos que estejam ocultos para tecnologias assistivas. Os leitores de ecrã podem ler os símbolos em voz alta, o que pode ser confuso. Considere removê-los: <strong {C}>%(ERROR)</strong>',
      LINK_URL: 'URLs mais longos e menos inteligíveis utilizados como texto de ligação podem ser difíceis de compreender quando acedidos com tecnologia de assistência. Na maioria dos casos, é melhor usar texto legível por humanos em vez do URL. URLs curtos (como a página inicial de um site) são aceitáveis.',
      LINK_DOI: 'Para páginas Web ou recursos apenas em linha, o <a href="https://apastyle.apa.org/style-grammar-guidelines/paper-format/accessibility/urls#:~:text=descriptive%20links">Guia de Estilo APA</a> recomenda a utilização de hiperligações descritivas, envolvendo o URL ou DOI do trabalho no seu título. URLs mais longos e menos inteligíveis utilizados como texto de ligação podem ser difíceis de compreender quando acedidos com tecnologia de assistência.',
      LINK_NEW_TAB: 'A ligação abre num novo separador ou janela sem aviso. Se o fizer, pode ser desorientador, especialmente para as pessoas que têm dificuldade em percecionar conteúdos visuais. Em segundo lugar, nem sempre é uma boa prática controlar a experiência de alguém ou tomar decisões por ele. Indique que a hiperligação abre numa nova janela no texto da hiperligação<hr><strong>Dica!</strong> Conheça as melhores práticas: <a href="https://www.nngroup.com/articles/new-browser-windows-and-tabs/">abrir ligações em novas janelas e separadores do browser.</a>',
      LINK_FILE_EXT: 'A ligação aponta para um PDF ou um ficheiro descarregável (por exemplo, MP3, Zip, Word Doc) sem aviso. Indique o tipo de ficheiro no texto da ligação. Se for um ficheiro grande, considere incluir o tamanho do ficheiro. <hr> <strong>Exemplo:</strong> Relatório executivo (PDF, 3MB)',
      LINK_IDENTICAL_NAME: 'A ligação tem um texto idêntico ao de outra ligação, embora aponte para uma página diferente. Vários links com o mesmo texto podem causar confusão para pessoas que usam leitores de tela. <strong>Considere tornar o link a seguir mais descritivo para ajudar a distingui-lo de outros links.</strong> <hr> <strong {B}>Nome acessível</strong> <strong {C}>%(TEXT)</strong>',

      // Images
      MISSING_ALT_LINK_HAS_TEXT: 'A imagem está a ser utilizada como uma ligação com texto envolvente, embora o atributo alt deva ser marcado como decorativo ou nulo.',
      MISSING_ALT_LINK: 'A imagem está a ser utilizada como uma ligação, mas falta o texto alternativo! Certifique-se de que o texto alternativo descreve para onde a hiperligação o leva.',
      MISSING_ALT: 'Texto alternativo em falta! Se a imagem transmite uma história, um estado de espírito ou uma informação importante, não se esqueça de a descrever.',
      LINK_ALT_FILE_EXT: 'O texto alternativo não deve incluir extensões de ficheiro ou dimensões da imagem. Certifique-se de que o texto alternativo descreve o destino da hiperligação e não uma descrição literal da imagem. Remover: <strong {C}>%(ERROR)</strong> <hr> {ALT} {L} <strong {C}>%(ALT_TEXT)</strong>',
      LINK_PLACEHOLDER_ALT: 'Encontrado texto alternativo não descritivo ou de espaço reservado numa imagem ligada. Certifique-se de que o texto alternativo descreve o destino da hiperligação e não uma descrição literal da imagem. Substitua o seguinte texto alternativo. <hr> {ALT} {L} <strong {C}>%(ALT_TEXT)</strong>',
      LINK_SUS_ALT: 'As tecnologias de assistência já indicam que se trata de uma imagem, pelo que &quot;<strong {C}>%(ERROR)</strong>&quot; pode ser redundante. Certifique-se de que o texto alternativo descreve o destino da hiperligação e não uma descrição literal da imagem. <hr> {ALT} {L} <strong {C}>%(ALT_TEXT)</strong>',
      ALT_FILE_EXT: 'O texto alternativo não deve incluir extensões de ficheiro ou dimensões da imagem. Se a imagem transmitir uma história, um estado de espírito ou uma informação importante, não se esqueça de a descrever. Remover: <strong {C}>%(ERROR)</strong> <hr> {ALT} <strong {C}>%(ALT_TEXT)</strong>',
      ALT_PLACEHOLDER: 'Encontrado texto alternativo não descritivo ou de espaço reservado. Substitua o seguinte texto alternativo por algo mais significativo. <hr> {ALT} <strong {C}>%(ALT_TEXT)</strong>',
      SUS_ALT: 'As tecnologias de assistência já indicam que se trata de uma imagem, pelo que &quot;<strong {C}>%(ERROR)</strong>&quot; pode ser redundante. <hr> {ALT} <strong {C}>%(ALT_TEXT)</strong>',
      LINK_IMAGE_NO_ALT_TEXT: 'A imagem na hiperligação está marcada como decorativa e não tem texto de hiperligação. Adicione um texto alternativo à imagem que descreva o destino da hiperligação.',
      LINK_IMAGE_TEXT: 'A imagem está marcada como decorativa, embora a ligação esteja a utilizar o texto circundante como etiqueta descritiva.',
      LINK_IMAGE_LONG_ALT: 'A descrição do texto alternativo numa imagem ligada é <strong>muito longa</strong>. O texto alternativo em imagens vinculadas deve descrever para onde o link o leva, não uma descrição literal da imagem. <strong>Considere usar o título da página para a qual o link leva como o texto alternativo.</strong> <hr> {ALT} {L} <strong {B}>%(altLength) Caracteres</strong> <strong {C}>%(ALT_TEXT)</strong>',
      LINK_IMAGE_ALT: 'A hiperligação da imagem contém texto alternativo. <strong>O texto alternativo descreve para onde o link o leva?</strong> Considere a possibilidade de utilizar o título da página para a qual a ligação remete como texto alternativo. <hr> {ALT} {L} <strong {C}>%(ALT_TEXT)</strong>',
      LINK_IMAGE_ALT_AND_TEXT: 'Se esta imagem for decorativa e estiver a ser utilizada como uma ligação funcional a outra página, considere marcar a imagem como decorativa ou nula - o texto da ligação circundante deve ser suficiente. <hr> {ALT} <strong {C}>%(ALT_TEXT)</strong> <hr> <strong {B}>Nome acessível</strong> {L} <strong {C}>%(TEXT)</strong>',
      IMAGE_FIGURE_DECORATIVE: 'A imagem está marcada como <strong>decorativa</strong> e será ignorada pela tecnologia de assistência. <hr> Embora tenha sido fornecida uma <strong>capa</strong>, a imagem também deve ter um texto alternativo na maioria dos casos. <ul><li>O texto alternativo deve fornecer uma descrição concisa do que está na imagem.</li><li>A legenda deve normalmente fornecer contexto para relacionar a imagem com o conteúdo circundante ou dar atenção a uma informação específica.</li></ul> Saiba mais: <a href="https://thoughtbot.com/blog/alt-vs-figcaption#the-figcaption-element">alt versus figcaption.</a>',
      IMAGE_FIGURE_DUPLICATE_ALT: 'Não utilize exatamente as mesmas palavras para o texto alternativo e para a legenda. Os leitores de ecrã anunciarão a informação duas vezes. <ul><li>O texto alternativo deve fornecer uma descrição concisa do que está na imagem.</li><li>A legenda deve normalmente fornecer contexto para relacionar a imagem com o conteúdo circundante ou dar atenção a uma informação específica.</li></ul> Saiba mais: <a href="https://thoughtbot.com/blog/alt-vs-figcaption#the-figcaption-element">alt versus figcaption.</a> <hr> {ALT} <strong {C}>%(ALT_TEXT)</strong>',
      IMAGE_DECORATIVE: 'A imagem está marcada como <strong>decorativa</strong> e será ignorada pela tecnologia de assistência. Se a imagem transmitir uma história, um estado de espírito ou informações importantes, não se esqueça de adicionar texto alternativo.',
      IMAGE_DECORATIVE_CAROUSEL: 'A imagem está marcada como decorativa, mas todas as imagens num carrossel ou galeria devem incluir texto alternativo descritivo para garantir uma experiência equivalente para todos.',
      IMAGE_ALT_TOO_LONG: 'A descrição do texto alternativo é <strong>muito longa</strong>. O texto alternativo deve ser conciso, mas significativo, como um <em>tweet</em> (cerca de 100 caracteres). Se esta for uma imagem complexa ou um gráfico, considere colocar a descrição longa da imagem no texto abaixo ou num componente de acordeão. <hr> {ALT} <strong {B}>%(altLength) Caracteres</strong> <strong {C}>%(ALT_TEXT)</strong>',
      IMAGE_PASS: '{ALT} %(ALT_TEXT)',

      // Form labels
      LABELS_MISSING_IMAGE_INPUT: 'O botão de imagem não tem texto alternativo. Adicione texto alternativo para fornecer um nome acessível. Por exemplo: <em>Pesquisar</em> ou <em>Submeter</em>.',
      LABELS_INPUT_RESET: 'Os botões de reinicialização <strong>não</strong> devem ser usados a menos que sejam especificamente necessários, pois são fáceis de ativar por engano. <hr> <strong>Dica!</strong> Saiba por que <a href="https://www.nngroup.com/articles/reset-and-cancel-buttons/">os botões Redefinir e Cancelar apresentam problemas de usabilidade.</a>',
      LABELS_ARIA_LABEL_INPUT: 'A entrada tem um nome acessível, mas certifique-se de que também existe uma etiqueta visível. <hr> <strong {B}>Nome acessível</strong> <strong {C}>%(TEXT)</strong>',
      LABELS_NO_FOR_ATTRIBUTE: 'Não existe um rótulo associado a esta entrada. Adicione um atributo <code>for</code> ao rótulo que corresponde ao <code>id</code> desta entrada. <hr> <strong {B}>ID</strong> <strong {C}>#%(id)</strong>',
      LABELS_MISSING_LABEL: 'Não existe uma etiqueta associada a esta entrada. Adicione um <code>id</code> a esta entrada e adicione um atributo <code>for</code> correspondente à etiqueta.',
      LABELS_PLACEHOLDER: 'O texto de espaço reservado que desaparece torna difícil para as pessoas lembrarem-se de que informações pertencem a um campo e torna difícil identificar e corrigir erros. Em vez disso, considere usar uma dica permanentemente visível antes do campo do formulário. <hr> Saiba mais: <a href="https://www.nngroup.com/articles/form-design-placeholders/">Os espaços reservados nos campos de formulário são prejudiciais.</a>',

      // Embedded content
      EMBED_VIDEO: 'Por favor, certifique-se de que <strong>todos os vídeos têm legendas fechadas.</strong> Fornecer legendas para todo o conteúdo de áudio e vídeo é um requisito obrigatório de Nível A. As legendas ajudam as pessoas com deficiência auditiva ou surdas.',
      EMBED_AUDIO: 'Certifique-se de que fornece uma <strong>transcrição para todos os podcasts.</strong> Fornecer transcrições para conteúdo áudio é um requisito obrigatório de Nível A. As transcrições ajudam as pessoas surdas ou com dificuldades auditivas, mas podem beneficiar toda a gente. Considere colocar a transcrição abaixo ou num painel de acordeão.',
      EMBED_DATA_VIZ: 'Os widgets de visualização de dados como este são frequentemente problemáticos para as pessoas que utilizam um teclado ou um leitor de ecrã para navegar e podem apresentar dificuldades significativas para as pessoas com baixa visão ou daltonismo. É recomendável fornecer as mesmas informações em um formato alternativo (texto ou tabela) abaixo do widget. <hr> Saiba mais sobre <a href="https://www.w3.org/WAI/tutorials/images/complex">imagens complexas.</a>',
      EMBED_MISSING_TITLE: 'O conteúdo incorporado requer um nome acessível que descreva o seu conteúdo. Forneça um atributo <code>title</code> ou <code>aria-label</code> exclusivo no elemento <code>iframe</code>. Saiba mais sobre <a href="https://web.dev/learn/accessibility/more-html#iframes">iFrames.</a>',
      EMBED_GENERAL: 'Não é possível verificar o conteúdo incorporado. Certifique-se de que as imagens têm texto alternativo, os vídeos têm legendas, o texto tem contraste suficiente e os componentes interactivos são <a href="https://webaim.org/techniques/keyboard/">acessíveis ao teclado.</a>',
      EMBED_UNFOCUSABLE: '<code>&lt;iframe&gt;</code> com elementos não focáveis não deve ter <code>tabindex="-1"</code>. O conteúdo incorporado não será acessível pelo teclado.',

      // QA
      QA_BAD_LINK: 'Encontrada uma ligação incorrecta. O link parece apontar para um ambiente de desenvolvimento. <hr> {L} <strong {C}>%(LINK)</strong>',
      QA_IN_PAGE_LINK: 'Link quebrado na mesma página. O destino do link não corresponde a nenhum elemento nesta página.',
      QA_STRONG_ITALICS: 'As etiquetas de negrito e itálico têm um significado semântico e não devem ser utilizadas para destacar parágrafos inteiros. O texto em negrito deve ser utilizado para dar <strong>ênfase</strong> a uma palavra ou frase. O itálico deve ser usado para destacar nomes próprios (ou seja, títulos de livros e artigos), palavras estrangeiras e citações. As citações longas devem ser formatadas como uma citação em bloco.',
      QA_PDF: 'Não é possível verificar a acessibilidade dos PDFs. Os PDFs são considerados conteúdos Web e também devem ser tornados acessíveis. Os PDFs contêm frequentemente problemas para pessoas que utilizam leitores de ecrã (etiquetas estruturais em falta ou etiquetas de campos de formulário em falta) e pessoas com baixa visão (o texto não flui quando ampliado). <ul><li>Se se tratar de um formulário, considere a utilização de um formulário HTML acessível como alternativa.</li><li>Se se tratar de um documento, considere a conversão do mesmo numa página Web.</li></ul> De outra forma, verifique a acessibilidade do <a href="https://helpx.adobe.com/acrobat/using/create-verify-pdf-accessibility.html">PDF no Acrobat DC.</a>',
      QA_DOCUMENT: 'Não é possível verificar a acessibilidade do documento. Os documentos ligados são considerados conteúdos Web e também têm de ser tornados acessíveis. Reveja manualmente este documento.  <ul><li>Tornar o seu <a href="https://support.google.com/docs/answer/6199477?hl=pt-pt">documento ou apresentação do Google Workspace mais acessível.</a></li><li>Tornar os seus <a href="https://support.microsoft.com/pt-pt/office/create-accessible-office-documents-868ecfcd-4f00-4224-b881-a65537a7c155">documentos do Office mais acessíveis.</a></li></ul>',
      QA_BLOCKQUOTE: 'Isto é um cabeçalho? <strong {C}>%(TEXT)</strong> <hr> As aspas de bloco devem ser usadas apenas para citações. Se se pretende que isto seja um título, altere esta citação de bloco para um título semântico (por exemplo, Título 2 ou Título 3).',
      QA_FAKE_HEADING: 'Isto é um título? <strong {C}>%(TEXT)</strong> <hr> Uma linha de texto grande ou a negrito pode parecer um título, mas uma pessoa que utilize um leitor de ecrã não consegue perceber que é importante ou saltar para o seu conteúdo. O texto a negrito ou grande nunca deve substituir os títulos semânticos (Título 2 a Título 6).',
      QA_FAKE_LIST: 'Está a tentar criar uma lista? Possível item de lista encontrado: <strong {C}>%(firstPrefix)</strong> <hr> Certifique-se de que utiliza listas semânticas, utilizando os botões de formatação de marcadores ou números. Ao usar uma lista semântica, as tecnologias de assistência podem transmitir informações como o número total de itens e a posição relativa de cada item na lista. Saiba mais sobre <a href="https://www.w3.org/WAI/tutorials/page-structure/content/#lists">listas semânticas.</a>',
      QA_UPPERCASE: 'Encontrado em maiúsculas. Alguns leitores de ecrã podem interpretar o texto em maiúsculas como um acrónimo e lerão cada letra individualmente. Além disso, algumas pessoas consideram o texto em maiúsculas mais difícil de ler e pode dar a impressão de estar a GRITAR.',
      QA_UNDERLINE: 'O texto sublinhado pode ser confundido com links. Considere a utilização de um estilo diferente, como <code>&lt;strong&gt;</code><strong>strong importance</strong><code>&lt;/strong&gt;</code> ou <code>&lt;em&gt;</code><em>emphasis</em><code>&lt;/em&gt;</code>.',
      QA_SUBSCRIPT: 'As opções de formatação subscrito e sobrescrito só devem ser utilizadas para alterar a posição do texto para convenções ou normas tipográficas. Não devem ser utilizadas apenas para fins de apresentação ou aparência. A formatação de frases inteiras apresenta problemas de legibilidade. Casos de uso apropriados incluem a exibição de expoentes, números ordinais como 4<sup>th</sup> em vez de quarto, e fórmulas químicas (por exemplo, H<sub>2</sub>O).',
      QA_NESTED_COMPONENTS: 'Evite aninhar componentes de layout interativos, como colocar acordeões dentro de guias ou guias dentro de acordeões. Isto pode complicar a navegação, aumentar a sobrecarga cognitiva e levar a ignorar o conteúdo.',
      QA_JUSTIFY: 'Evite usar texto justificado, que se alinha tanto às margens esquerda quanto direita. Isso pode ser difícil de ler para algumas pessoas devido aos espaços desiguais entre as palavras. Use texto alinhado à esquerda para melhor legibilidade.',
      QA_SMALL_TEXT: 'O texto pequeno é mais difícil de ler, especialmente para pessoas com baixa visão. Para garantir melhor legibilidade, evite usar tamanhos de fonte menores que o padrão.',

      // Shared
      ACC_NAME: '<strong {B}>Nome acessível</strong> %(TEXT)',
      ACC_NAME_TIP: '<hr><strong>Dica!</strong> O "nome acessível" é o rótulo final que é comunicado às pessoas que utilizam tecnologia assistiva e é calculado pelo ARIA. Isso ajuda a compreender o propósito do link ou botão.',
      HIDDEN_FOCUSABLE: 'O link ou botão tem <code>aria-hidden=&quot;true&quot;</code>, mas ainda é focável pelo teclado. Se pretende ocultar um link ou botão duplicado, adicione também <code>tabindex=&quot;-1&quot;</code>. Caso contrário, <code>aria-hidden=&quot;true&quot;</code> não deve ser usado em elementos que podem receber foco. <hr> Saiba mais sobre o <a href="https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/Attributes/aria-hidden">atributo aria-hidden.</a>',

      // Developer
      DUPLICATE_ID: 'Encontrada <strong>identificação duplicada</strong>. Os erros de ID duplicada são conhecidos por causar problemas às tecnologias de assistência quando estas estão a tentar interagir com o conteúdo. Remova ou altere o seguinte ID. <hr> <strong {B}>ID</strong> <strong {C}>#%(id)</strong>',
      UNCONTAINED_LI: 'Todos os itens de lista <code>&lt;li&gt;</code> devem ser colocados dentro dos elementos <code>&lt;ul&gt;</code> não ordenados ou <code>&lt;ol&gt;</code> ordenados. Esta estrutura ajuda os leitores de ecrã a anunciar a lista e os seus itens com precisão.',
      TABINDEX_ATTR: 'O elemento não deve ter um atributo <code>tabindex</code> superior a 0.',

      // Meta checks
      META_LANG: 'Idioma da página não declarado! Por favor <a href="https://www.w3.org/International/questions/qa-html-language-declarations">declare o idioma na etiqueta HTML.</a>',
      META_TITLE: 'Título da página em falta! Forneça um <a href="https://developer.mozilla.org/pt-pt/docs/Web/HTML/Element/title">título da página.</a>',
      META_SCALABLE: 'Remova o parâmetro <code>user-scalable="no"</code> na <a href="https://developer.mozilla.org/en-US/docs/Web/HTML/Viewport_meta_tag">meta tag do viewport</a> para permitir o zoom.',
      META_MAX: 'Certifique-se de que o parâmetro <code>maximum-scale</code> na <a href="https://developer.mozilla.org/en-US/docs/Web/HTML/Viewport_meta_tag">meta tag do viewport</a> não seja inferior a 2.',
      META_REFRESH: 'A página não deve atualizar automaticamente usando uma meta tag.',

      // Buttons
      BTN_EMPTY: 'O botão está sem um nome acessível que descreva o seu propósito.',
      BTN_EMPTY_LABELLEDBY: 'O botão tem um valor <code>aria-labelledby</code> que está vazio ou não corresponde ao valor <code>id</code> de outro elemento na página.',
      BTN: 'botão',
      BTN_TIP: 'Saiba como criar um <a href="https://www.sarasoueidan.com/blog/accessible-icon-buttons/">botão acessível.</a>',
      BTN_ROLE_IN_NAME: 'Não inclua a palavra "botão" no nome de um botão. Os leitores de tela já informam o papel do elemento além do seu nome.',
      LABEL_IN_NAME: 'O texto visível deste elemento parece ser diferente do nome acessível, o que pode causar confusão para os usuários de tecnologias assistivas. Por favor, reveja: <hr> <strong {B}>Nome Acessível</strong> <strong {C}>%(TEXT)</strong>',

      // Tables
      TABLES_MISSING_HEADINGS: 'Falta de cabeçalhos de tabela! As tabelas acessíveis necessitam de marcação HTML que indique as células de cabeçalho e as células de dados que definem a sua relação. Esta informação fornece contexto às pessoas que utilizam tecnologia de apoio. As tabelas devem ser utilizadas apenas para dados tabulares. <hr> Saiba mais sobre <a href="https://www.w3.org/WAI/tutorials/tables/">tabelas acessíveis.</a>',
      TABLES_SEMANTIC_HEADING: 'Os títulos semânticos, como o Título 2 ou o Título 3, só devem ser utilizados para secções de conteúdo; <strong>não</strong> em tabelas HTML. Em vez disso, indique os cabeçalhos da tabela usando o elemento <code>&lt;th&gt;</code>. <hr> Saiba mais sobre <a href="https://www.w3.org/WAI/tutorials/tables/">tabelas acessíveis.</a>',
      TABLES_EMPTY_HEADING: 'Encontrado um cabeçalho de tabela vazio! Os cabeçalhos de tabela <strong>nunca</strong> devem estar vazios. É importante designar os cabeçalhos de linha e/ou coluna para transmitir a sua relação. Esta informação fornece contexto às pessoas que utilizam tecnologia de assistência. Lembre-se de que as tabelas devem ser usadas apenas para dados tabulares. <hr> Saiba mais sobre <a href="https://www.w3.org/WAI/tutorials/tables/">tabelas acessíveis.</a>',

      // Contrast
      CONTRAST_NORMAL: 'O texto de tamanho normal deve ter uma relação de contraste de pelo menos %(RATIO).',
      CONTRAST_LARGE: 'O texto de tamanho grande deve ter uma relação de contraste de pelo menos %(RATIO).',
      CONTRAST_ERROR: 'O texto não tem contraste suficiente com o fundo, tornando-o mais difícil de ler.',
      CONTRAST_WARNING: 'O contraste deste texto é desconhecido e precisa ser revisto manualmente. Certifique-se de que o texto e o fundo tenham cores com forte contraste.',
      CONTRAST_ERROR_GRAPHIC: 'A imagem não tem contraste suficiente com o fundo, tornando-a mais difícil de perceber.',
      CONTRAST_WARNING_GRAPHIC: 'O contraste desta imagem é desconhecido e precisa ser revisto manualmente.',
      CONTRAST_TIP_GRAPHIC: 'Imagens e elementos da interface do utilizador devem ter uma proporção de contraste de pelo menos 3:1.',
      CONTRAST_OPACITY: 'Aumente a opacidade para melhor visibilidade.',
      CONTRAST_APCA: 'Isto não tem contraste suficiente para qualquer tamanho de texto. Considere usar esta combinação de cor e tamanho de texto?',
      CONTRAST_COLOR: 'Considere usar esta cor em vez dessa?',
      CONTRAST_SIZE: 'Considere aumentar o tamanho do texto para esta combinação de cores?',
      CONTRAST_PLACEHOLDER: 'O texto do marcador neste campo de entrada não tem contraste suficiente com o fundo, dificultando a leitura.',
      CONTRAST_PLACEHOLDER_UNSUPPORTED: 'O contraste deste texto de espaço reservado é desconhecido e precisa ser revisto manualmente. Certifique-se de que o texto e o fundo tenham cores fortemente contrastantes.',
      CONTRAST_INPUT: 'O texto neste campo de entrada não tem contraste suficiente com o fundo, dificultando a leitura.',
      CONTRAST: 'Contraste',
      UNKNOWN: 'Desconhecido',
      FG: 'Plano de frente',
      BG: 'Fundo',
      NO_SUGGESTION: 'Nenhuma combinação acessível pode ser encontrada apenas alterando a cor do texto. Tente alterar a cor do fundo.',
    },
  };

  return ptPT;

}));
