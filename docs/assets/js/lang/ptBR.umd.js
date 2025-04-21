
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
  (global = typeof globalThis !== 'undefined' ? globalThis : global || self, global.Sa11yLangPtBR = factory());
})(this, (function () { 'use strict';

  /*! WARNING: This is a machine-generated translation and may contain errors or inaccuracies. */
  var ptBR = {
    // Portuguese (Brazil)
    strings: {
      LANG_CODE: 'pt-br',
      MAIN_TOGGLE_LABEL: 'Verificar a acessibilidade',
      CONTAINER_LABEL: 'Verificador de acessibilidade',
      ERROR: 'Erro',
      ERRORS: 'Erros',
      WARNING: 'Advertência',
      WARNINGS: 'Avisos',
      GOOD: 'Bom',
      ON: 'Ligado',
      OFF: 'Desligado',
      ALERT_TEXT: 'Alerta',
      ALERT_CLOSE: 'Fechar',
      OUTLINE: 'Estrutura',
      READABILITY_DESC: 'Mostra a pontuação de legibilidade na guia <strong>Estrutura</strong> para ajudar a avaliar a dificuldade de leitura.',
      TITLE: 'Título',
      ALT: 'ALT',
      IMAGES: 'Imagens',
      EDIT: 'Editar',
      NO_IMAGES: 'Nenhuma imagem encontrada.',
      DECORATIVE: 'Decorativo',
      MISSING: 'Ausente',
      PAGE_ISSUES: 'Problemas de página',
      SETTINGS: 'Configurações',
      DEVELOPER_CHECKS: 'Verificações do desenvolvedor',
      DEVELOPER_DESC: 'Verifica problemas que podem exigir conhecimento de codificação para correção, como atributos HTML, formulários e mais.',
      DARK_MODE: 'Modo escuro',
      SHORTCUT_SR: 'Pular para a edição. Atalho de teclado: Alt S',
      SKIP_TO_ISSUE: 'Pular para a edição',
      NEW_TAB: 'Abre uma nova guia',
      LINKED: 'Vinculado',
      PANEL_HEADING: 'Verificação de acessibilidade',
      NO_ERRORS_FOUND: 'Não foram encontrados erros.',
      WARNINGS_FOUND: 'avisos encontrados.',
      TOTAL_FOUND: 'total de problemas encontrados.',
      NOT_VISIBLE: 'O item que você está tentando visualizar não está visível; ele pode estar oculto ou dentro de um componente de acordeão ou guia. Aqui está uma visualização:',
      MISSING_ROOT: 'A página inteira foi verificada quanto à acessibilidade porque a área de destino <code>%(root)</code> não existe.',
      MISSING_READABILITY_ROOT: 'A pontuação de legibilidade é baseada na área de conteúdo <code>%(fallback)</code>, pois a área alvo <code>%(root)</code> não existe.',
      HEADING_NOT_VISIBLE: 'O cabeçalho não é visível; ele pode estar oculto ou dentro de um componente de acordeão ou guia.',
      SKIP_TO_PAGE_ISSUES: 'Pular para os problemas da página',
      CONSOLE_ERROR: 'Desculpe, mas há um problema com o verificador de acessibilidade nesta página. Você pode <a href="%(link)">relatar o problema por meio deste formulário</a> ou no <a href="%(link)">GitHub</a>?',
      APPEARANCE: 'Aparência',
      MOVE_PANEL: 'Mover painel',

      // Dismiss
      PANEL_DISMISS_BUTTON: 'Mostrar %(dismissCount) ignorados',
      DISMISS: 'Ignorar',
      DISMISS_ALL: 'Ignorar todos',
      DISMISSED: 'Ignorado',
      DISMISS_REMINDER: 'Observe que os alertas são apenas <strong>temporariamente</strong> ignorados. Limpar o histórico do navegador e os cookies restaurará todos os alertas anteriormente ignorados em todas as páginas.',

      // Export
      DATE: 'Data',
      PAGE_TITLE: 'Título da página',
      RESULTS: 'Resultados',
      EXPORT_RESULTS: 'Exportar resultados',
      GENERATED: 'Resultados gerados com %(tool).',
      PREVIEW: 'Visualização',
      ELEMENT: 'Elemento',
      PATH: 'Caminho',

      // Colour filters
      COLOUR_FILTER: 'Filtro de cores',
      PROTANOPIA: 'Protanopia',
      DEUTERANOPIA: 'Deuteranopia',
      TRITANOPIA: 'Tritanopia',
      MONOCHROMACY: 'Monocromático',
      COLOUR_FILTER_MESSAGE: 'Verifique se há elementos que são difíceis de perceber ou distinguir em relação a outras cores.',
      RED_EYE: 'Cego vermelho.',
      GREEN_EYE: 'Cego verde.',
      BLUE_EYE: 'Cego azul.',
      MONO_EYE: 'Cego para vermelho, azul e verde.',
      COLOUR_FILTER_HIGH_CONTRAST: 'Os filtros de cores não funcionam no modo de alto contraste.',

      // Alternative text stop words
      SUS_ALT_STOPWORDS: [
        'imagem',
        'gráfico',
        'imagem',
        'foto',
        'photo',
        'image',
        'graphic',
      ],
      PLACEHOLDER_ALT_STOPWORDS: [
        'alt',
        'imagem',
        'foto',
        'decorativo',
        'photo',
        'image',
        'graphic',
        'espaço reservado',
        'imagem de espaço reservado',
        'espaçador',
      ],
      PARTIAL_ALT_STOPWORDS: [
        'clique',
        'clique aqui',
        'clique aqui para saber mais',
        'clicando aqui',
        'confira',
        'detalhado aqui',
        'download',
        'faça o download aqui',
        'descobrir',
        'saiba mais',
        'formulário',
        'aqui',
        'informações',
        'link',
        'aprender',
        'aprender a',
        'mais',
        'página',
        'papel',
        'leia mais',
        'ler',
        'leia isto',
        'este',
        'esta página',
        'este site',
        'visualização',
        'veja nossa',
        'site',
      ],
      CLICK: ['click', 'clique'],
      NEW_WINDOW_PHRASES: [
        'externo',
        'nova guia',
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
      READABILITY_NO_CONTENT: 'Não foi possível calcular a pontuação de legibilidade. Nenhum parágrafo <code>&lt;p&gt;</code> ou conteúdo de lista <code>&lt;li&gt;</code> encontrado.',
      READABILITY_NOT_ENOUGH: 'Não há conteúdo suficiente para calcular a pontuação de legibilidade.',

      // Headings
      HEADING_SKIPPED_LEVEL: 'Os títulos não devem pular níveis ou saltar de <strong>Título %(PREV_LEVEL)</strong> para <strong {C}>Título %(LEVEL)</strong>, pois isso interrompe a ordem e a hierarquia do conteúdo, tornando-o mais difícil de seguir. <hr> Se <strong {C}>%(HEADING)</strong> estiver sob a seção <strong>%(PREV_HEADING)</strong>, considere formatá-lo como um <strong>Título %(LEVEL)</strong> no lugar.',
      HEADING_EMPTY: 'Encontrado um título vazio! Para corrigir, exclua essa linha ou altere seu formato de <strong {C}>Título %(level)</strong> para <strong>Normal</strong> ou <strong>Parágrafo</strong>.',
      HEADING_LONG: 'O título é longo! Os títulos devem ser usados para organizar o conteúdo e transmitir estrutura. Eles devem ser breves, informativos e exclusivos. Mantenha os títulos com menos de %(MAX_LENGTH) caracteres (não mais do que uma frase). <hr> <strong {B}>%(HEADING_LENGTH) Caracteres</strong>',
      HEADING_FIRST: 'O primeiro título em uma página geralmente deve ser o Título 1 ou o Título 2. O Título 1 deve ser o início da seção de conteúdo principal e é o título principal que descreve o objetivo geral da página. Saiba mais sobre <a href="https://www.w3.org/WAI/tutorials/page-structure/headings/">Estrutura de títulos.</a>',
      HEADING_MISSING_ONE: 'Falta de título 1. O título 1 deve ser o início da área de conteúdo principal e é o título principal que descreve o objetivo geral da página. Saiba mais sobre <a href="https://www.w3.org/WAI/tutorials/page-structure/headings/">Estrutura de cabeçalho.</a>',
      HEADING_EMPTY_WITH_IMAGE: 'O cabeçalho não tem texto, mas contém uma imagem. Se esse não for um cabeçalho, altere seu formato de <strong {C}>Título %(level)</strong> para <strong>Normal</strong> ou <strong>Parágrafo</strong>. Caso contrário, adicione texto alternativo à imagem se ela não for decorativa.',
      PANEL_HEADING_MISSING_ONE: 'Falta o cabeçalho 1!',
      PANEL_NO_HEADINGS: 'Nenhuma cabeçalho encontrado.',

      // Links
      LINK_EMPTY: 'Remova links vazios sem nenhum texto.',
      LINK_EMPTY_LABELLEDBY: 'O link possui um valor para <code>aria-labelledby</code> que está vazio ou não corresponde ao valor do atributo <code>id</code> de outro elemento na página.',
      LINK_EMPTY_NO_LABEL: 'O link não tem texto discernível que seja visível para leitores de tela e outras tecnologias assistivas. Para corrigir: <ul><li>Adicione um texto conciso que descreva para onde o link o leva.</li><li>Se for um <a href="https://a11y-101.com/development/icons-and-links">link de ícone ou SVG,</a> é provável que esteja faltando um rótulo descritivo.</li><li>Se você acha que esse link é um erro devido a um bug de copiar/colar, considere excluí-lo.</li></ul>',
      LINK_STOPWORD: 'O texto do link pode não ser descritivo o suficiente fora do contexto: <strong {C}>%(ERROR)</strong>',
      LINK_STOPWORD_ARIA: 'Embora um nome acessível tenha sido fornecido, considere revisar o texto visível do link. Frases como &quot;<strong {C}>%(ERROR)</strong>&quot; não são significativas.',
      LINK_TIP: '<hr> <strong>Dica!</strong> Use um texto de link claro e único que descreva o destino do link, normalmente o título da página ou documento.',
      LINK_CLICK_HERE: 'A expressão "clique" ou "clique aqui" foca na mecânica do mouse, mas muitas pessoas não usam mouse ou podem acessar este site em um dispositivo móvel. Considere usar um verbo diferente relacionado à tarefa.',
      DUPLICATE_TITLE: 'O atributo <code>title</code> em links e imagens é destinado a fornecer informações extras e deve ser <strong>diferente</strong> do texto ou texto alternativo. O texto do título aparece ao passar o mouse sobre um elemento, mas não é acessível com teclado ou entrada por toque. Considere <a href="https://www.a11yproject.com/posts/title-attributes/">evitar completamente o atributo title.</a>',
      LINK_SYMBOLS: 'Evite usar símbolos como chamadas à ação no texto do link, a menos que estejam ocultos para tecnologias assistivas. Leitores de tela podem ler os símbolos em voz alta, o que pode causar confusão. Considere removê-los: <strong {C}>%(ERROR)</strong>',
      LINK_URL: 'URLs mais longos e menos inteligíveis usados como texto de link podem ser difíceis de compreender quando acessados com tecnologia assistiva. Na maioria dos casos, é melhor usar texto legível por humanos em vez do URL. URLs curtos (como a página inicial de um site) são aceitáveis.',
      LINK_DOI: 'Para páginas da Web ou recursos somente on-line, o <a href="https://apastyle.apa.org/style-grammar-guidelines/paper-format/accessibility/urls#:~:text=descriptive%20links">Guia de Estilo APA</a> recomenda o uso de links descritivos, envolvendo o URL ou DOI do trabalho em seu título. URLs mais longos e menos inteligíveis usados como texto de link podem ser difíceis de compreender quando acessados com tecnologia assistiva.',
      LINK_NEW_TAB: 'O link abre em uma nova guia ou janela sem aviso. Fazer isso pode ser desorientador, especialmente para pessoas que têm dificuldade de perceber o conteúdo visual. Em segundo lugar, nem sempre é uma boa prática controlar a experiência de alguém ou tomar decisões por ele. Indique que o link abre em uma nova janela no texto do link. <hr> <strong>Dica!</strong> Conheça as práticas recomendadas: <a href="https://www.nngroup.com/articles/new-browser-windows-and-tabs/">abrir links em novas janelas e guias do navegador.</a>',
      LINK_FILE_EXT: 'O link aponta para um PDF ou arquivo para download (por exemplo, MP3, Zip, Word Doc) sem aviso. Indique o tipo de arquivo no texto do link. Se for um arquivo grande, considere incluir o tamanho do arquivo. <hr> <strong>Exemplo:</strong> Relatório executivo (PDF, 3 MB)',
      LINK_IDENTICAL_NAME: 'O link tem texto idêntico ao de outro link, embora aponte para uma página diferente. Vários links com o mesmo texto podem causar confusão para pessoas que usam leitores de tela. <strong>Considere tornar o link a seguir mais descritivo para ajudar a distingui-lo de outros links.</strong> <hr> <strong {B}>Nome acessível</strong> <strong {C}>%(TEXT)</strong>',

      // Images
      MISSING_ALT_LINK_HAS_TEXT: 'A imagem está sendo usada como um link com texto ao redor, embora o atributo alt deva ser marcado como decorativo ou nulo.',
      MISSING_ALT_LINK: 'A imagem está sendo usada como um link, mas está faltando o texto alternativo! Certifique-se de que o texto alternativo descreva para onde o link leva você.',
      MISSING_ALT: 'Texto alternativo ausente! Se a imagem transmitir uma história, um clima ou informações importantes, não deixe de descrevê-la.',
      LINK_ALT_FILE_EXT: 'O texto alternativo não deve incluir extensões de arquivo ou dimensões da imagem. Certifique-se de que o texto alternativo descreva o destino do link, e não uma descrição literal da imagem. Remover: <strong {C}>%(ERROR)</strong> <hr> {ALT} {L} <strong {C}>%(ALT_TEXT)</strong>',
      LINK_PLACEHOLDER_ALT: 'Encontrado texto alternativo não descritivo ou de espaço reservado em uma imagem vinculada. Certifique-se de que o texto alternativo descreva o destino do link e não uma descrição literal da imagem. Substitua o seguinte texto alternativo. <hr> {ALT} {L} <strong {C}>%(ALT_TEXT)</strong>',
      LINK_SUS_ALT: 'As tecnologias assistivas já indicam que se trata de uma imagem, portanto, &quot;<strong {C}>%(ERROR)</strong>&quot; pode ser redundante. Certifique-se de que o texto alternativo descreva o destino do link, e não uma descrição literal da imagem. <hr> {ALT} {L} <strong {C}>%(ALT_TEXT)</strong>',
      ALT_FILE_EXT: 'O texto alternativo não deve incluir extensões de arquivo ou dimensões da imagem. Se a imagem transmitir uma história, um clima ou informações importantes, não deixe de descrevê-la. Remover: <strong {C}>%(ERROR)</strong> <hr> {ALT} <strong {C}>%(ALT_TEXT)</strong>',
      ALT_PLACEHOLDER: 'Texto alternativo não descritivo ou de espaço reservado encontrado. Substitua o texto alternativo a seguir por algo mais significativo. <hr> {ALT} <strong {C}>%(ALT_TEXT)</strong>',
      SUS_ALT: 'As tecnologias assistivas já indicam que se trata de uma imagem, portanto, &quot;<strong {C}>%(ERROR)</strong>&quot; pode ser redundante. <hr> {ALT} <strong {C}>%(ALT_TEXT)</strong>',
      LINK_IMAGE_NO_ALT_TEXT: 'A imagem no link está marcada como decorativa e não há texto de link. Adicione um texto alternativo à imagem que descreva o destino do link.',
      LINK_IMAGE_TEXT: 'A imagem é marcada como decorativa, embora o link esteja usando o texto ao redor como um rótulo descritivo.',
      LINK_IMAGE_LONG_ALT: 'A descrição do texto alternativo em uma imagem vinculada é <strong>muito longa</strong>. O texto alternativo das imagens vinculadas deve descrever para onde o link leva você, e não uma descrição literal da imagem. <strong>Considere a possibilidade de usar o título da página para a qual o link está direcionado como o texto alternativo.</strong> <hr> {ALT} {L} <strong {B}>%(altLength) Caracteres</strong> <strong {C}>%(ALT_TEXT)</strong>',
      LINK_IMAGE_ALT: 'O link da imagem contém texto alternativo. <strong>O texto alternativo descreve para onde o link leva você?</strong> Considere a possibilidade de usar o título da página para a qual o link está direcionado como texto alternativo. <hr> {ALT} {L} <strong {C}>%(ALT_TEXT)</strong>',
      LINK_IMAGE_ALT_AND_TEXT: 'O link da imagem contém <strong>texto alt e texto do link ao redor.</strong> Se essa imagem for decorativa e estiver sendo usada como um link funcional para outra página, considere marcar a imagem como decorativa ou nula - o texto do link ao redor deve ser suficiente. <hr> {ALT} <strong {C}>%(ALT_TEXT)</strong> <hr> <strong {B}>Nome acessível</strong> {L} <strong>%(TEXT)</strong>',
      IMAGE_FIGURE_DECORATIVE: 'A imagem está marcada como <strong>decorativa</strong> e será ignorada pela tecnologia assistiva. <hr> Embora uma <strong>caption</strong> tenha sido fornecida, a imagem também deve ter um texto alternativo na maioria dos casos. <ul><li>O texto alternativo deve fornecer uma descrição concisa do que está na imagem.</li><li>A legenda geralmente deve fornecer contexto para relacionar a imagem ao conteúdo ao redor ou dar atenção a uma informação específica.</li></ul> Saiba mais: <a href="https://thoughtbot.com/blog/alt-vs-figcaption#the-figcaption-element">alt versus figcaption.</a>',
      IMAGE_FIGURE_DUPLICATE_ALT: 'Não use exatamente as mesmas palavras para o texto alternativo e para a legenda. Os leitores de tela anunciarão as informações duas vezes. <ul><li>O texto alt deve fornecer uma descrição concisa do que está na imagem.</li><li>A legenda geralmente deve fornecer contexto para relacionar a imagem ao conteúdo ao redor ou dar atenção a uma informação específica.</li></ul> Saiba mais: <a href="https://thoughtbot.com/blog/alt-vs-figcaption#the-figcaption-element">alt versus figcaption.</a> <hr> {ALT} <strong {C}>%(ALT_TEXT)</strong>',
      IMAGE_DECORATIVE: 'A imagem é marcada como <strong>decorativa</strong> e será ignorada pela tecnologia assistiva. Se a imagem transmitir uma história, um clima ou informações importantes, não se esqueça de adicionar um texto alternativo.',
      IMAGE_DECORATIVE_CAROUSEL: 'A imagem está marcada como decorativa, mas todas as imagens em um carrossel ou galeria devem incluir texto alternativo descritivo para garantir uma experiência equivalente para todos.',
      IMAGE_ALT_TOO_LONG: 'A descrição do texto alternativo é <strong>muito longa</strong>. O texto alternativo deve ser conciso, mas significativo, como um <em>tweet</em> (cerca de 100 caracteres). Se essa for uma imagem complexa ou um gráfico, considere colocar a descrição longa da imagem no texto abaixo ou em um componente de acordeão. <hr> {ALT} <strong {B}>%(altLength) Caracteres</strong> <strong {C}>%(ALT_TEXT)</strong>',
      IMAGE_PASS: '{ALT} %(ALT_TEXT)',

      // Form labels
      LABELS_MISSING_IMAGE_INPUT: 'O botão de imagem está sem texto alternativo. Adicione o texto alternativo para fornecer um nome acessível. Por exemplo: <em>Search</em> ou <em>Submit</em>.',
      LABELS_INPUT_RESET: 'Os botões de reinicialização não devem ser usados, a menos que sejam especificamente necessários, pois são fáceis de serem ativados por engano. <hr> <strong>Dica!</strong> Saiba por que <a href="https://www.nngroup.com/articles/reset-and-cancel-buttons/">os botões Redefinir e Cancelar apresentam problemas de usabilidade.</a>',
      LABELS_ARIA_LABEL_INPUT: 'A entrada tem um nome acessível, mas certifique-se de que também haja um rótulo visível. <hr> <strong {B}>Nome acessível</strong> <strong {C}>%(TEXT)</strong>',
      LABELS_NO_FOR_ATTRIBUTE: 'Não há rótulo associado a esse input. Adicione um atributo <code>for</code> ao rótulo que corresponda ao <code>id</code> desse input. <hr> <strong {B}>ID</strong> <strong {C}>#%(id)</strong>',
      LABELS_MISSING_LABEL: 'Não há rótulo associado a essa entrada. Adicione um <code>id</code> a essa entrada e adicione um atributo <code>for</code> correspondente ao rótulo.',
      LABELS_PLACEHOLDER: 'Texto de espaço reservado que desaparece torna difícil para as pessoas se lembrarem de quais informações pertencem a um campo e torna desafiador identificar e corrigir erros. Em vez disso, considere usar uma dica permanentemente visível antes do campo do formulário. <hr> Saiba mais: <a href="https://www.nngroup.com/articles/form-design-placeholders/">Os espaços reservados nos campos de formulários são prejudiciais.</a>',

      // Embedded content
      EMBED_VIDEO: 'Certifique-se de que <strong>todos os vídeos tenham legendas ocultas.</strong> Fornecer legendas para todo o conteúdo de áudio e vídeo é um requisito obrigatório do Nível A. As legendas ajudam as pessoas com deficiência auditiva ou surdas.',
      EMBED_AUDIO: 'Certifique-se de fornecer uma <strong>transcrição para todos os podcasts.</strong> Fornecer transcrições para conteúdo de áudio é um requisito obrigatório do Nível A. As transcrições ajudam as pessoas com deficiência auditiva ou surdas, mas podem beneficiar a todos. Considere colocar a transcrição abaixo ou em um painel sanfonado.',
      EMBED_DATA_VIZ: 'Widgets de visualização de dados como esse costumam ser problemáticos para pessoas que usam um teclado ou leitor de tela para navegar e podem apresentar dificuldades significativas para pessoas com baixa visão ou daltonismo. Recomenda-se fornecer as mesmas informações em um formato alternativo (texto ou tabela) abaixo do widget. <hr> Saiba mais sobre <a href="https://www.w3.org/WAI/tutorials/images/complex">imagens complexas.</a>',
      EMBED_MISSING_TITLE: 'O conteúdo incorporado requer um nome acessível que descreva seu conteúdo. Forneça um atributo <code>title</code> ou <code>aria-label</code> exclusivo no elemento <code>iframe</code>. Saiba mais sobre <a href="https://web.dev/learn/accessibility/more-html#iframes">iFrames.</a>',
      EMBED_GENERAL: 'Não foi possível verificar o conteúdo incorporado. Certifique-se de que as imagens tenham texto alternativo, os vídeos tenham legendas, o texto tenha contraste suficiente e os componentes interativos sejam <a href="https://webaim.org/techniques/keyboard/">acessíveis ao teclado.</a>',
      EMBED_UNFOCUSABLE: '<code>&lt;iframe&gt;</code> com elementos não focalizáveis não deve ter <code>tabindex="-1"</code>. O conteúdo incorporado não será acessível pelo teclado.',

      // QA
      QA_BAD_LINK: 'Encontrado link incorreto. O link parece apontar para um ambiente de desenvolvimento. <hr> {L} <strong {C}>%(LINK)</strong>',
      QA_IN_PAGE_LINK: 'Link quebrado na mesma página. O destino do link não corresponde a nenhum elemento nesta página.',
      QA_STRONG_ITALICS: 'As tags negrito e itálico têm significado semântico e não devem ser usadas para destacar parágrafos inteiros. O texto em negrito deve ser usado para dar forte <strong>ênfase</strong> a uma palavra ou frase. O itálico deve ser usado para destacar nomes próprios (ou seja, títulos de livros e artigos), palavras estrangeiras e citações. As citações longas devem ser formatadas como uma citação em bloco.',
      QA_PDF: 'Não é possível verificar a acessibilidade de PDFs. Os PDFs são considerados conteúdo da Web e também devem ser acessíveis. Os PDFs geralmente contêm problemas para pessoas que usam leitores de tela (tags estruturais ausentes ou rótulos de campo de formulário ausentes) e pessoas com baixa visão (o texto não flui novamente quando ampliado). <ul><li>Se este for um formulário, considere o uso de um formulário HTML acessível como alternativa.</li><li>Se este for um documento, considere convertê-lo em uma página da Web.</li></ul> Caso contrário, verifique a acessibilidade do <a href="https://helpx.adobe.com/acrobat/using/create-verify-pdf-accessibility.html">PDF no Acrobat DC.</a>',
      QA_DOCUMENT: 'Não é possível verificar a acessibilidade do documento. Os documentos vinculados são considerados conteúdo da Web e também devem ser acessíveis. Revise manualmente este documento. <ul><li>Torne seu <a href="https://support.google.com/docs/answer/6199477?hl=pt-br">documento ou apresentação do Google Workspace mais acessível.</a></li><li>Torne seus <a href="https://support.microsoft.com/pt-br/office/create-accessible-office-documents-868ecfcd-4f00-4224-b881-a65537a7c155">documentos do Office mais acessíveis.</a></li></ul>',
      QA_BLOCKQUOTE: 'Isso é um título? <strong {C}>%(TEXT)</strong> <hr> As aspas de bloco devem ser usadas somente para citações. Se a intenção é que isso seja um título, altere essa citação de bloco para um título semântico (por exemplo, Título 2 ou Título 3).',
      QA_FAKE_HEADING: 'Isso é um título? <strong {C}>%(TEXT)</strong> <hr> Uma linha de texto em negrito ou grande pode parecer um título, mas alguém que usa um leitor de tela não pode dizer que ela é importante ou pular para o seu conteúdo. O texto em negrito ou grande nunca deve substituir os títulos semânticos (Título 2 a Título 6).',
      QA_FAKE_LIST: 'Está tentando criar uma lista? Possível item de lista encontrado: <strong {C}>%(firstPrefix)</strong> <hr> Certifique-se de usar listas semânticas usando os botões de formatação de marcadores ou números. Ao usar uma lista semântica, as tecnologias assistivas podem transmitir informações como o número total de itens e a posição relativa de cada item na lista. Saiba mais sobre <a href="https://www.w3.org/WAI/tutorials/page-structure/content/#lists">listas semânticas.</a>',
      QA_UPPERCASE: 'Encontrado em letras maiúsculas. Alguns leitores de tela podem interpretar o texto em letras maiúsculas como um acrônimo e lerão cada letra individualmente. Além disso, algumas pessoas acham que o texto em letras maiúsculas é mais difícil de ler e pode dar a impressão de estar GRITANDO.',
      QA_UNDERLINE: 'O texto sublinhado pode ser confundido com links. Considere a possibilidade de usar um estilo diferente, como <code>&lt;strong&gt;</code><strong>strong importance</strong><code>&lt;/strong&gt;</code> ou <code>&lt;em&gt;</code><em>emphasis</em><code>&lt;/em&gt;</code>.',
      QA_SUBSCRIPT: 'As opções de formatação subscrito e sobrescrito só devem ser usadas para alterar a posição do texto para convenções ou padrões tipográficos. Elas <strong>não</strong> devem ser usadas somente para fins de apresentação ou aparência. A formatação de frases inteiras apresenta problemas de legibilidade. Os casos de uso apropriados incluem a exibição de expoentes, números ordinais, como 4<sup>th</sup> em vez de quarto, e fórmulas químicas (por exemplo, H<sub>2</sub>O).',
      QA_NESTED_COMPONENTS: 'Evite aninhar componentes de layout interativos, como colocar acordeões dentro de abas ou abas dentro de acordeões. Isso pode complicar a navegação, aumentar a sobrecarga cognitiva e levar as pessoas a ignorar o conteúdo.',
      QA_JUSTIFY: 'Evite usar texto justificado, que se alinha tanto às margens esquerda quanto direita. Isso pode ser difícil de ler para algumas pessoas devido aos espaços desiguais entre as palavras. Use texto alinhado à esquerda para melhor legibilidade.',
      QA_SMALL_TEXT: 'O texto pequeno é mais difícil de ler, especialmente para pessoas com baixa visão. Para garantir melhor legibilidade, evite usar tamanhos de fonte menores que o padrão.',

      // Shared
      ACC_NAME: '<strong {B}>Nome acessível</strong> %(TEXT)',
      ACC_NAME_TIP: '<hr><strong>Dica!</strong> O "nome acessível" é o rótulo final que é comunicado às pessoas que usam tecnologia assistiva e é calculado pelo ARIA. Isso ajuda a entender o propósito do link ou botão.',
      HIDDEN_FOCUSABLE: 'O link ou botão tem <code>aria-hidden=&quot;true&quot;</code>, mas ainda é focável pelo teclado. Se você pretende ocultar um link ou botão duplicado, adicione também <code>tabindex=&quot;-1&quot;</code>. Caso contrário, <code>aria-hidden=&quot;true&quot;</code> não deve ser usado em elementos que podem receber foco. <hr> Saiba mais sobre o <a href="https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/Attributes/aria-hidden">atributo aria-hidden.</a>',

      // Developer
      DUPLICATE_ID: 'Encontrada <strong>identificação duplicada</strong>. Erros de ID duplicado são conhecidos por causar problemas para tecnologias assistivas quando elas estão tentando interagir com o conteúdo. Remova ou altere o seguinte ID. <hr> <strong {B}>ID</strong> <strong {C}>#%(id)</strong>',
      UNCONTAINED_LI: 'Todos os itens de lista <code>&lt;li&gt;</code> devem ser colocados dentro dos elementos <code>&lt;ul&gt;</code> não ordenados ou <code>&lt;ol&gt;</code> ordenados. Essa estrutura ajuda leitores de tela a anunciar a lista e seus itens com precisão.',
      TABINDEX_ATTR: 'O elemento não deve ter um atributo <code>tabindex</code> maior que 0.',

      // Meta checks
      META_LANG: 'O idioma da página não foi declarado! Por favor, <a href="https://www.w3.org/International/questions/qa-html-language-declarations">declare o idioma na tag HTML.</a>',
      META_TITLE: 'Título da página ausente! Forneça um <a href="https://developer.mozilla.org/pt-br/docs/Web/HTML/Element/title">título da página.</a>',
      META_SCALABLE: 'Remova o parâmetro <code>user-scalable="no"</code> na <a href="https://developer.mozilla.org/en-US/docs/Web/HTML/Viewport_meta_tag">meta tag do viewport</a> para permitir o zoom.',
      META_MAX: 'Certifique-se de que o parâmetro <code>maximum-scale</code> na <a href="https://developer.mozilla.org/en-US/docs/Web/HTML/Viewport_meta_tag">meta tag do viewport</a> não seja inferior a 2.',
      META_REFRESH: 'A página não deve atualizar automaticamente usando uma meta tag.',

      // Buttons
      BTN_EMPTY: 'O botão está sem um nome acessível que descreva sua finalidade.',
      BTN_EMPTY_LABELLEDBY: 'O botão tem um valor <code>aria-labelledby</code> que está vazio ou não corresponde ao valor <code>id</code> de outro elemento na página.',
      BTN: 'botão',
      BTN_TIP: 'Aprenda a criar um <a href="https://www.sarasoueidan.com/blog/accessible-icon-buttons/">botão acessível.</a>',
      BTN_ROLE_IN_NAME: 'Não inclua a palavra "botão" no nome de um botão. Os leitores de tela já informam o papel do elemento além do seu nome.',
      LABEL_IN_NAME: 'O texto visível deste elemento parece ser diferente do nome acessível, o que pode causar confusão para os usuários de tecnologias assistivas. Por favor, revise: <hr> <strong {B}>Nome Acessível</strong> <strong {C}>%(TEXT)</strong>',

      // Tables
      TABLES_MISSING_HEADINGS: 'Falta de cabeçalhos de tabela! As tabelas acessíveis precisam de marcação HTML que indique as células de cabeçalho e as células de dados que definem seu relacionamento. Essas informações fornecem contexto para as pessoas que usam tecnologia assistiva. As tabelas devem ser usadas somente para dados tabulares. <hr> Saiba mais sobre <a href="https://www.w3.org/WAI/tutorials/tables/">tabelas acessíveis.</a>',
      TABLES_SEMANTIC_HEADING: 'Os cabeçalhos semânticos, como Heading 2 ou Heading 3, devem ser usados somente para seções de conteúdo; <strong>não</strong> em tabelas HTML. Em vez disso, indique os cabeçalhos da tabela usando o elemento <code>&lt;th&gt;</code>. <hr> Saiba mais sobre <a href="https://www.w3.org/WAI/tutorials/tables/">tabelas acessíveis.</a>',
      TABLES_EMPTY_HEADING: 'Encontrado um cabeçalho de tabela vazio! Os cabeçalhos de tabela <strong>nunca</strong> devem estar vazios. É importante designar os cabeçalhos de linha e/ou coluna para transmitir sua relação. Essas informações fornecem contexto para as pessoas que usam tecnologia assistiva. Lembre-se de que as tabelas devem ser usadas somente para dados tabulares. <hr> Saiba mais sobre <a href="https://www.w3.org/WAI/tutorials/tables/">tabelas acessíveis.</a>',

      // Contrast
      CONTRAST_NORMAL: 'O texto de tamanho normal deve ter uma relação de contraste de pelo menos %(RATIO).',
      CONTRAST_LARGE: 'O texto de tamanho grande deve ter uma relação de contraste de pelo menos %(RATIO).',
      CONTRAST_ERROR: 'O texto não tem contraste suficiente com o fundo, tornando-o mais difícil de ler.',
      CONTRAST_WARNING: 'O contraste deste texto é desconhecido e precisa ser revisado manualmente. Certifique-se de que o texto e o fundo tenham cores com forte contraste.',
      CONTRAST_ERROR_GRAPHIC: 'A imagem não tem contraste suficiente com o fundo, tornando-a mais difícil de perceber.',
      CONTRAST_WARNING_GRAPHIC: 'O contraste desta imagem é desconhecido e precisa ser revisado manualmente.',
      CONTRAST_TIP_GRAPHIC: 'Imagens e elementos da interface do usuário devem ter uma proporção de contraste de pelo menos 3:1.',
      CONTRAST_OPACITY: 'Aumente a opacidade para melhor visibilidade.',
      CONTRAST_APCA: 'Isso não tem contraste suficiente para qualquer tamanho de texto. Considere usar essa combinação de cor e tamanho de texto?',
      CONTRAST_COLOR: 'Considere usar esta cor em vez dessa?',
      CONTRAST_SIZE: 'Considere aumentar o tamanho do texto para esta combinação de cores?',
      CONTRAST_PLACEHOLDER: 'O texto do marcador neste campo de entrada não tem contraste suficiente com o fundo, dificultando a leitura.',
      CONTRAST_PLACEHOLDER_UNSUPPORTED: 'O contraste deste texto de espaço reservado é desconhecido e precisa ser revisado manualmente. Certifique-se de que o texto e o fundo tenham cores fortemente contrastantes.',
      CONTRAST_INPUT: 'O texto neste campo de entrada não tem contraste suficiente com o fundo, dificultando a leitura.',
      CONTRAST: 'Contraste',
      UNKNOWN: 'Desconhecido',
      FG: 'Plano de frente',
      BG: 'Fundo',
      NO_SUGGESTION: 'Nenhuma combinação acessível pode ser encontrada apenas alterando a cor do texto. Tente alterar a cor do fundo.',
    },
  };

  return ptBR;

}));
