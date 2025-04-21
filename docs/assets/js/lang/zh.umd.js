
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
  (global = typeof globalThis !== 'undefined' ? globalThis : global || self, global.Sa11yLangZh = factory());
})(this, (function () { 'use strict';

  /*! WARNING: This is a machine-generated translation and may contain errors or inaccuracies. */
  var zh = {
    // Chinese (simplified)
    strings: {
      LANG_CODE: 'zh',
      MAIN_TOGGLE_LABEL: '检查可及性',
      CONTAINER_LABEL: '可访问性检查器',
      ERROR: '误差',
      ERRORS: '错误',
      WARNING: '警告',
      WARNINGS: '警告',
      GOOD: '良好',
      ON: '在',
      OFF: '关闭',
      ALERT_TEXT: '警报',
      ALERT_CLOSE: '关闭',
      OUTLINE: '大纲',
      READABILITY_DESC: '在<strong>大纲</strong>标签页中显示可读性得分，以帮助衡量阅读难度。',
      TITLE: '标题',
      ALT: 'ALT',
      IMAGES: '图片',
      EDIT: '编辑',
      NO_IMAGES: '未找到图片。',
      DECORATIVE: '装饰性',
      MISSING: '缺失',
      PAGE_ISSUES: '页码问题',
      SETTINGS: '设置',
      DEVELOPER_CHECKS: '开发者检查',
      DEVELOPER_DESC: '检查可能需要编码知识来修复的问题，例如 HTML 属性、表单等。',
      DARK_MODE: '黑暗模式',
      SHORTCUT_SR: '跳到问题。键盘快捷方式: Alt S',
      SKIP_TO_ISSUE: '跳到问题',
      NEW_TAB: '打开新标签',
      LINKED: '已链接',
      PANEL_HEADING: '无障碍检查',
      NO_ERRORS_FOUND: '没有发现错误。',
      WARNINGS_FOUND: '发现的警告。',
      TOTAL_FOUND: '发现的总问题。',
      NOT_VISIBLE: '你试图查看的项目是不可见的；它可能是隐藏的或在一个手风琴或标签组件内。这里有一个预览: ',
      MISSING_ROOT: '由于目标区域<code>%(root)</code>不存在, 全页面被检查为可访问性。',
      MISSING_READABILITY_ROOT: '可读性评分基于<code>%(fallback)</code>内容区域，因为目标区域<code>%(root)</code>不存在。',
      HEADING_NOT_VISIBLE: '标题是不可见的；它可能是隐藏的或在手风琴或标签组件内。',
      SKIP_TO_PAGE_ISSUES: '跳到页面问题',
      CONSOLE_ERROR: '对不起, 本页面的可访问性检查器有问题。您能否<a href="%(link)">通过此表格</a>或<a href="%(link)">GitHub</a>报告?',
      APPEARANCE: '外观',
      MOVE_PANEL: '移动面板',

      // Dismiss
      PANEL_DISMISS_BUTTON: '显示 %(dismissCount) 被忽略的',
      DISMISS: '忽略',
      DISMISS_ALL: '忽略所有',
      DISMISSED: '已忽略',
      DISMISS_REMINDER: '请注意，警告仅被 <strong>暂时</strong> 忽略。清除浏览器历史记录和 Cookies 将恢复所有先前忽略的警告，在所有页面上都有效。',

      // Export
      DATE: '日期',
      PAGE_TITLE: '页面标题',
      RESULTS: '结果',
      EXPORT_RESULTS: '导出结果',
      GENERATED: '使用 %(tool) 生成的结果。',
      PREVIEW: '预览',
      ELEMENT: '元素',
      PATH: '路径',

      // Colour filters
      COLOUR_FILTER: '彩色过滤器',
      PROTANOPIA: '原住民',
      DEUTERANOPIA: '氘代苯丙胺(Deuteranopia)',
      TRITANOPIA: 'Tritanopia',
      MONOCHROMACY: '单色系',
      COLOUR_FILTER_MESSAGE: '检查是否有难以察觉或难以与其他颜色区分的元素。',
      RED_EYE: '红盲。',
      GREEN_EYE: '绿色盲区。',
      BLUE_EYE: '蓝盲。',
      MONO_EYE: '红、蓝、绿三色盲。',
      COLOUR_FILTER_HIGH_CONTRAST: '彩色滤镜在高对比度模式下不工作。',

      // Alternative text stop words
      SUS_ALT_STOPWORDS: [
        '形象',
        '图形',
        '图片',
        '照片',
      ],
      PLACEHOLDER_ALT_STOPWORDS: [
        '备选',
        '形象',
        '照片',
        '装饰性',
        '照片',
        '占位符',
        '占位图片',
        '垫片',
      ],
      PARTIAL_ALT_STOPWORDS: [
        '点击',
        '点击这里',
        '点击这里了解更多',
        '查阅',
        '在此详细说明',
        '在此详细说明。',
        '下载',
        '在此下载',
        '在这里下载',
        '查出',
        '了解更多',
        '形式',
        '这里',
        '信息',
        '链接',
        '学习',
        '了解更多',
        '学会',
        '更多',
        '页',
        '纸',
        '阅读更多',
        '阅读',
        '阅读此文',
        '这个',
        '本页',
        '这一页',
        '本网站',
        '观点',
        '查看我们的',
        '网站',
      ],
      CLICK: ['click', '点击'],
      NEW_WINDOW_PHRASES: [
        '外来的',
        '新标签',
        '新窗口',
        '弹出式',
        '弹出',
      ],
      FILE_TYPE_PHRASES: ['文档', '电子表格', '计算表', '压缩文件', '归档文件', '工作表', '幻灯片', '演示文稿', '安装', '视频', '音频', 'pdf'],

      // Readability
      READABILITY: '可读性',
      AVG_SENTENCE: '每句的平均字数: ',
      COMPLEX_WORDS: '复杂的词语: ',
      TOTAL_WORDS: '言语: ',
      VERY_DIFFICULT: '非常困难',
      DIFFICULT: '困难的',
      FAIRLY_DIFFICULT: '相当困难',
      READABILITY_NO_CONTENT: '无法计算可读性得分。没有找到段落<code>&lt;p&gt;</code>或列表内容<code>&lt;li&gt;</code>。',
      READABILITY_NOT_ENOUGH: '没有足够的内容来计算可读性得分。',

      // Headings
      HEADING_SKIPPED_LEVEL: '标题不应跳过级别或从<strong>标题 %(PREV_LEVEL)</strong>跳到<strong {C}>标题 %(LEVEL)</strong>，因为这会破坏内容的顺序和层次结构，增加阅读难度。<hr>如果 <strong {C}>%(HEADING)</strong> 属于 <strong>%(PREV_HEADING)</strong> 部分，建议将其格式化为 <strong>标题 %(LEVEL)</strong>。',
      HEADING_EMPTY: '发现空的标题!要解决这个问题, 请删除这一行或将其格式从<strong {C}>标题%(level)</strong>改为<strong>正常</strong>或<strong>段落</strong>。',
      HEADING_LONG: '标题很长!标题应被用来组织内容和传达结构。它们应该是简短的、信息丰富的和独特的。请将标题保持在%(MAX_LENGTH)个字符以内 (不超过一个句子) 。<hr> <strong {B}>%(HEADING_LENGTH) 字符</strong>。',
      HEADING_FIRST: '一个页面的第一个标题通常应该是标题1或标题2。标题1应该是主要内容部分的开始, 也是描述页面整体目的的主要标题。了解更多关于<a href="https://www.w3.org/WAI/tutorials/page-structure/headings/">标题结构。</a>的信息。',
      HEADING_MISSING_ONE: '缺少标题1。标题1应该是主要内容区的开始, 是描述页面整体目的的主要标题。了解更多关于<a href="https://www.w3.org/WAI/tutorials/page-structure/headings/">标题结构.</a>的信息。',
      HEADING_EMPTY_WITH_IMAGE: '标题没有文字, 但包含一个图像。如果这不是一个标题, 请将其格式从<strong {C}>标题%(level)</strong>改为<strong>正常</strong>或<strong>段落</strong>。否则, 如果图片不是装饰性的, 请为其添加alt文本。',
      PANEL_HEADING_MISSING_ONE: '缺少标题1!',
      PANEL_NO_HEADINGS: '未找到标题.',

      // Links
      LINK_EMPTY: '删除没有任何文字的空链接。',
      LINK_EMPTY_LABELLEDBY: '链接具有<code>aria-labelledby</code>的值为空或不与页面上另一个元素的<code>id</code>属性值匹配。',
      LINK_EMPTY_NO_LABEL: '链接没有可识别的文字, 对屏幕阅读器和其他辅助技术是可见的。要解决这个问题: <ul><li>添加一些简明的文字, 描述该链接带你到哪里。</li><li>如果它是一个<a href="https://a11y-101.com/development/icons-and-links">图标链接或SVG,</a>它可能缺少一个描述性的标签。</li><li>如果你认为这个链接是一个由于复制/粘贴错误造成的错误, 考虑删除它。</li></ul>。',
      LINK_STOPWORD: '链接文本在没有上下文的情况下可能不够描述性：<strong {C}>%(ERROR)</strong>',
      LINK_STOPWORD_ARIA: '尽管提供了可访问的名称，但请考虑修订可见的链接文本。像&quot;<strong {C}>%(ERROR)</strong>&quot;这样的短语没有意义。',
      LINK_TIP: '<hr> <strong>提示！</strong> 使用清晰且独特的链接文本，描述链接的目标，通常是页面或文档标题。',
      LINK_CLICK_HERE: '“点击”或“点击这里”这种表述专注于鼠标操作，但许多人不使用鼠标，或者可能在移动设备上查看此网站。请考虑使用与任务相关的其他动词。',
      DUPLICATE_TITLE: '链接和图像上的<code>title</code>属性旨在提供额外信息，并且应该与文本或替代文本<strong>不同</strong>。标题文本在鼠标悬停时显示，但无法通过键盘或触控输入访问。请考虑<a href="https://www.a11yproject.com/posts/title-attributes/">完全避免使用title属性。</a>',
      LINK_SYMBOLS: '避免在链接文本中使用符号作为行动号召，除非这些符号对辅助技术隐藏。屏幕阅读器可能会大声朗读这些符号，这可能会引起困惑。请考虑移除：<strong {C}>%(ERROR)</strong>',
      LINK_URL: '用作链接文本的较长的、不太容易理解的URL可能难以用辅助技术听懂。在大多数情况下, 最好使用人类可读的文本来代替URL。',
      LINK_DOI: '对于网页或纯在线资源，<a href="https://apastyle.apa.org/style-grammar-guidelines/paper-format/accessibility/urls#:~:text=descriptive%20links">APA风格指南</a>建议使用描述性链接，将作品的URL或DOI包裹在其标题上。使用较长的、不易理解的URL作为链接文本，在使用辅助技术访问时可能难以理解。',
      LINK_NEW_TAB: '链接在新的标签或窗口中打开, 没有警告。这样做可能会使人迷失方向, 特别是对那些对视觉内容有感知困难的人来说。其次, 控制别人的体验或为他们做决定并不总是一种好的做法。在链接文本中指出该链接在新窗口中打开 <hr> <strong>提示！</strong>学习最佳做法: <a href="https://www.nngroup.com/articles/new-browser-windows-and-tabs/">在新的浏览器窗口和标签中打开链接。</a>',
      LINK_FILE_EXT: '链接指向PDF或可下载的文件 (如MP3、Zip、Word Doc) , 而没有警告。在链接文本中指出文件类型。如果是大文件, 可以考虑包括文件大小。<hr> <strong>示例:</strong>执行报告 (PDF, 3MB) 。',
      LINK_IDENTICAL_NAME: '链接的文字与另一个链接相同, 但它指向不同的页面。<strong>考虑使以下链接更具描述性, 以帮助将其与其他链接区分开来。</strong> <hr> <strong {B}>可访问名称</strong> <strong {C}>%(TEXT)</strong>',

      // Images
      MISSING_ALT_LINK_HAS_TEXT: '图片被用作带有周围文本的链接, 尽管alt属性应被标记为装饰性或空。',
      MISSING_ALT_LINK: '图像被用作链接，但缺少替代文本！请确保替代文本描述了链接将您带到的位置。',
      MISSING_ALT: '缺少替代文本！如果图像传达了故事、情绪或重要信息 - 请务必描述图像。',
      LINK_ALT_FILE_EXT: '替代文本不应包含文件扩展名或图像尺寸。确保alt文本描述链接的目的地, 而不是图片的字面描述。删除: <strong {C}>%(ERROR)</strong>. <hr> {ALT} {L} <strong {C}>%(ALT_TEXT)</strong>',
      LINK_PLACEHOLDER_ALT: '发现链接图片中的非描述性或占位符的alt文本。确保alt文本描述了链接的目的地, 而不是图像的字面描述。替换以下alt文本. <hr> {ALT} {L} <strong {C}>%(ALT_TEXT)</strong>',
      LINK_SUS_ALT: '辅助技术已经表明这是一张图片, 所以&quot;<strong {C}>%(ERROR)</strong>&quot; 可能是多余的。确保alt文本描述了链接的目的地, 而不是图像的字面描述。<hr> {ALT} {L} <strong {C}>%(ALT_TEXT)</strong>',
      ALT_FILE_EXT: '替代文本不应包含文件扩展名或图像尺寸。如果图片传达了一个故事、情绪或重要信息--一定要描述图片。删除: <strong {C}>%(ERROR)</strong> <hr> {ALT} <strong {C}>%(ALT_TEXT)</strong>',
      ALT_PLACEHOLDER: '发现非描述性或占位符的alt文本。用更有意义的内容替换下面的alt文本. <hr> {ALT} <strong {C}>%(ALT_TEXT)</strong>。',
      SUS_ALT: '辅助技术已经表明这是一张图片, 所以&quot;<strong {C}>%(ERROR)</strong>&quot; 可能是多余的。<hr> {ALT} <strong {C}>%(ALT_TEXT)</strong>',
      LINK_IMAGE_NO_ALT_TEXT: '链接中的图像被标记为装饰性的, 没有链接文本。请在图片上添加描述链接目的地的alt文本。',
      LINK_IMAGE_TEXT: '图片被标记为装饰性的, 尽管链接是使用周围的文字作为描述性的标签。',
      LINK_IMAGE_LONG_ALT: '链接图片的alt文本描述<strong>太长</strong>。链接图片的alt文本应该描述链接的位置, 而不是图片的字面描述。<strong>考虑使用它所链接的页面的标题作为alt文本。</strong> <hr> {ALT} {L} <strong {B}>%(altLength) 字符</strong> <strong {C}>%(ALT_TEXT)</strong>',
      LINK_IMAGE_ALT: '图片链接包含alt文本。符号文本是否描述了该链接的位置？可以考虑使用它所链接的页面的标题作为alt文本。 <hr> {ALT} {L} <strong {C}>%(ALT_TEXT)</strong>',
      LINK_IMAGE_ALT_AND_TEXT: '图片链接包含<strong>alt文本和周围的链接文本。</strong>如果该图片是装饰性的, 并被用作另一个页面的功能链接, 请考虑将该图片标记为装饰性或无效--周围的链接文本应该足够了。<hr> {ALT} <strong {C}>%(ALT_TEXT)</strong> <hr> <strong {B}>可访问名称</strong> {L} <strong {C}>%(TEXT)</strong>',
      IMAGE_FIGURE_DECORATIVE: '图片被标记为<strong>装饰性</strong>, 将被辅助技术所忽略。<hr> 虽然提供了一个<strong>标题</strong>, 但在大多数情况下, 图像也应该有alt文本。<ul><li>alt文本应该对图像中的内容进行简明的描述。</li><li>标题通常应该提供背景, 将图像与周围的内容联系起来, 或者对某一特定的信息给予关注: <a href="https://thoughtbot.com/blog/alt-vs-figcaption#the-figcaption-element">alt与figcaption.</a>',
      IMAGE_FIGURE_DUPLICATE_ALT: '不要在 alt 文本和标题文本中使用完全相同的词语。屏幕阅读器会重复宣读信息。<ul><li>alt 文本应提供对图像内容的简洁描述。</li><li>标题通常应提供上下文以将图像与周围内容联系起来，或者关注特定信息。</li></ul>了解更多：<a href="https://thoughtbot.com/blog/alt-vs-figcaption#the-figcaption-element">alt 与 figcaption 的区别。</a> <hr> {ALT} <strong {C}>%(ALT_TEXT)</strong>',
      IMAGE_DECORATIVE: '图片被标记为<strong>装饰性</strong>, 将被辅助技术所忽略。如果图片传达了一个故事、情绪或重要的信息--请务必添加alt文本。',
      IMAGE_DECORATIVE_CAROUSEL: '图像被标记为装饰性，但轮播或画廊中的所有图像都应包括描述性替代文本，以确保每个人都能获得同等的体验。',
      IMAGE_ALT_TOO_LONG: 'Alt文本描述<strong>太长</strong>。Alt文本应该是简洁的, 但又像<em>tweet</em>一样有意义 (大约100个字符) 。如果这是一张复杂的图片或图表, 可以考虑将图片的长篇描述放在下面的文字或手风琴组件中。<hr> {ALT} <strong {B}>%(altLength) 字符</strong> <strong {C}>%(ALT_TEXT)</strong>',
      IMAGE_PASS: '{ALT} %(ALT_TEXT)',

      // Form labels
      LABELS_MISSING_IMAGE_INPUT: '图片按钮缺少alt文本。请添加alt文本, 提供一个可访问的名称。比如说: <em>Search</em>或<em>Submit</em>。',
      LABELS_INPUT_RESET: '除非特别需要, 否则不应<strong></strong>使用重置按钮, 因为它们很容易被错误激活。<hr> <strong>提示！</strong>了解为什么<a href="https://www.nngroup.com/articles/reset-and-cancel-buttons/">复位和取消按钮会带来可用性问题。</a>',
      LABELS_ARIA_LABEL_INPUT: '输入有一个无障碍名称, 但请确保也有一个可见的标签。<hr> <strong {B}>可访问名称</strong> <strong {C}>%(TEXT)</strong>',
      LABELS_NO_FOR_ATTRIBUTE: '没有与此输入相关的标签。给标签添加一个<code>for</code>属性, 该属性与该输入的<code>id</code>相匹配。<hr> <strong {B}>ID</strong> <strong {C}>#%(id)</strong>',
      LABELS_MISSING_LABEL: '没有与此输入相关的标签。请为这个输入添加一个<code>id</code>, 并为标签添加一个匹配的<code>for</code>属性。',
      LABELS_PLACEHOLDER: '消失的占位符文本使人们很难记住哪些信息属于某个字段，并使识别和纠正错误变得具有挑战性。相反，请考虑在表单字段之前使用永久可见的提示。<hr> 了解更多信息：<a href="https://www.nngroup.com/articles/form-design-placeholders/">表单字段中的占位符是有害的。</a>',

      // Embedded content
      EMBED_VIDEO: '请确保<strong>所有视频都有闭合字幕。</strong>为所有音频和视频内容提供字幕是一项强制性的A级要求。字幕支持聋哑人或听力困难的人。',
      EMBED_AUDIO: '请确保为所有播客提供<strong>文字记录。</strong>为音频内容提供文字记录是一项强制性的A级要求。转录支持聋哑人或听力困难的人, 但也能使所有人受益。考虑将文字记录放在下面或放在一个手风琴面板内。',
      EMBED_DATA_VIZ: '像这样的数据可视化部件对于使用键盘或屏幕阅读器导航的人来说往往是有问题的, 而且对于低视力或色盲的人来说也会带来很大的困难。建议在小组件下方以替代 (文本或表格) 的形式提供相同的信息。<hr> 了解更多关于<a href="https://www.w3.org/WAI/tutorials/images/complex">复杂图像的信息。</a>',
      EMBED_MISSING_TITLE: '嵌入式内容需要一个描述其内容的可访问名称。请在 <code>iframe</code> 元素上提供一个唯一的 <code>title</code> 或 <code>aria-label</code> 属性。了解更多关于 <a href="https://web.dev/learn/accessibility/more-html#iframes">iFrames。</a>',
      EMBED_GENERAL: '无法检查嵌入式内容。请确保图像有alt文本, 视频有标题, 文本有足够的对比度, 互动组件是<a href="https://webaim.org/techniques/keyboard/">键盘可访问的。</a>',
      EMBED_UNFOCUSABLE: '带有无法聚焦元素的 <code>&lt;iframe&gt;</code> 不应具有 <code>tabindex="-1"</code>。嵌入内容将无法通过键盘访问。',

      // QA
      QA_BAD_LINK: '发现坏的链接。链接似乎指向一个开发环境。<hr> {L} <strong {C}>%(LINK)</strong>',
      QA_IN_PAGE_LINK: '破损的同页链接。链接目标与此页面上的任何元素都不匹配。',
      QA_STRONG_ITALICS: '粗体和斜体标签具有语义, 不应<strong></strong>用于突出整个段落。加粗的文字应该用于对一个词或短语进行强烈的<strong>强调</strong>。斜体字应该用来突出专有名词 (即书名和文章标题) 、外国词、引号。长篇引语应采用块状引语的格式。',
      QA_PDF: '无法检查PDF的可访问性。PDF被认为是网络内容, 也必须做到无障碍。对于使用屏幕阅读器的人 (缺失结构标签或缺失表格字段标签) 和低视力的人 (文本在放大时不回流) 来说, PDF经常包含一些问题。<ul><li>如果这是一个表格, 请考虑使用可访问的HTML表格作为替代。</li><li>如果这是一个文档, 请考虑将其转换为网页。</li></ul>否则, 请在Acrobat DC中检查<a href="https://helpx.adobe.com/acrobat/using/create-verify-pdf-accessibility.html">PDF的可访问性。</a>',
      QA_DOCUMENT: '无法检查文件的可访问性。链接文件被认为是网络内容, 也必须做到无障碍。请手动审查该文件。<ul><li>使您的<a href="https://support.google.com/docs/answer/6199477?hl=zh">Google Workspace文档或演示文稿更易于访问。</a></li><li>使您的<a href="https://support.microsoft.com/zh/office/create-accessible-office-documents-868ecfcd-4f00-4224-b881-a65537a7c155">Office文档更易于访问。</a></li></ul>。',
      QA_BLOCKQUOTE: '这是一个标题吗？<strong {C}>%(TEXT)</strong> <hr> 方块引号应该只用于引号。如果这是一个标题, 请将这个区块引号改为语义标题 (例如标题2或标题3) 。',
      QA_FAKE_HEADING: '这是一个标题吗？<strong {C}>%(TEXT)</strong> <hr> 一行粗体或大字体可能看起来像一个标题, 但使用屏幕阅读器的人无法看出它的重要性或跳到它的内容。粗体或大字体永远不应取代语义标题 (标题2至标题6) 。',
      QA_FAKE_LIST: '您是否试图创建一个列表？找到了可能的列表项: <strong {C}>%(firstPrefix)</strong> <hr> 请确保使用语义列表, 用子弹或数字格式按钮代替。当使用语义列表时, 辅助技术能够传达信息, 如项目的总数和每个项目在列表中的相对位置。了解更多关于<a href="https://www.w3.org/WAI/tutorials/page-structure/content/#lists">语义列表的信息。</a>',
      QA_UPPERCASE: '发现全大写。一些屏幕阅读器可能会将所有大写字母的文本解释为缩写, 并会单独阅读每个字母。此外, 有些人觉得全大写的文字更难读, 而且可能给人一种大喊大叫的感觉。',
      QA_UNDERLINE: '带下划线的文本可能会与链接相混淆。考虑使用不同的风格, 如<code>&lt;strong&gt;</code><strong>strong重要性</strong><code>&lt;/strong&gt;</code>或<code>&lt;em&gt;</code><em>emphasis</em><code>&lt；/em&gt；</code>。',
      QA_SUBSCRIPT: '下标和上标格式化选项只能用于改变文字的位置, 以符合排版习惯或标准。它不应该<strong></strong>仅仅用于演示或外观目的。对整个句子进行格式化会带来可读性问题。适当的使用情况包括显示指数、序数, 如4<sup>th</sup>而不是第四, 以及化学公式 (如H<sub>2</sub>O) 。',
      QA_NESTED_COMPONENTS: '避免将交互式布局组件嵌套，例如将手风琴放在标签内或将标签放在手风琴内。这可能会使导航变得复杂，增加认知负担，并导致人们忽视内容。',
      QA_JUSTIFY: '避免使用两端对齐的文本，两端对齐的文本会同时对齐左侧和右侧边距。由于单词之间的间距不均匀，这可能会使一些人难以阅读。使用左对齐文本以提高可读性。',
      QA_SMALL_TEXT: '小号文字更难阅读，尤其是对于视力低下的人。为了确保更好的可读性，请避免使用小于默认大小的字体。',

      // Shared
      ACC_NAME: '<strong {B}>可访问名称</strong> %(TEXT)',
      ACC_NAME_TIP: '<hr> <strong>提示！</strong> “可访问名称”是传达给使用辅助技术的人的最终标签，并由 ARIA 计算。这有助于他们理解链接或按钮的目的。',
      HIDDEN_FOCUSABLE: '链接或按钮已设置 <code>aria-hidden=&quot;true&quot;</code>，但仍然可以通过键盘聚焦。如果您打算隐藏重复的链接或按钮，请添加 <code>tabindex=&quot;-1&quot;</code>。否则，不应在可以接收焦点的元素上使用 <code>aria-hidden=&quot;true&quot;</code>。了解更多关于 <a href="https://developer.mozilla.org/zh-CH/docs/Web/Accessibility/ARIA/Attributes/aria-hidden">aria-hidden 属性</a>。',

      // Developer
      DUPLICATE_ID: '发现<strong>重复的ID</strong>。众所周知, 当辅助技术试图与内容互动时, 重复的ID错误会给辅助技术带来问题。请删除或更改以下ID. <hr> <strong {B}>ID</strong> <strong {C}>#%(id)</strong>',
      UNCONTAINED_LI: '所有 <code>&lt;li&gt;</code> 列表项必须放置在 <code>&lt;ul&gt;</code> 无序列表或 <code>&lt;ol&gt;</code> 有序列表元素内部。这个结构帮助屏幕阅读器准确地读取列表及其项。',
      TABINDEX_ATTR: '元素不应具有大于 0 的 <code>tabindex</code> 属性。',

      // Meta checks
      META_LANG: '页面语言未声明!请<a href="https://www.w3.org/International/questions/qa-html-language-declarations">在HTML标签上声明语言。</a>',
      META_TITLE: '缺少页面标题!请提供一个<a href="https://developer.mozilla.org/zh/docs/Web/HTML/Element/title">页面标题。</a>',
      META_SCALABLE: '删除<a href="https://developer.mozilla.org/zh-CN/docs/Web/HTML/Viewport_meta_tag">视口元标签</a>中的 <code>user-scalable="no"</code> 参数，以允许缩放。',
      META_MAX: '确保<a href="https://developer.mozilla.org/zh-CN/docs/Web/HTML/Viewport_meta_tag">视口元标签</a>中的 <code>maximum-scale</code> 参数不少于 2。',
      META_REFRESH: '页面不应使用 meta 标签自动刷新。',

      // Buttons
      BTN_EMPTY: '按钮缺少一个描述其用途的可访问名称。',
      BTN_EMPTY_LABELLEDBY: '按钮的<code>aria-labelledby</code>值为空或不匹配页面上其他元素的<code>id</code>值。',
      BTN: '按钮',
      BTN_TIP: '了解如何制作一个<a href="https://www.sarasoueidan.com/blog/accessible-icon-buttons/">可访问的按钮。</a>',
      BTN_ROLE_IN_NAME: '不要在按钮的名称中包含“按钮”一词。屏幕阅读器已经会传达元素的角色和名称。',
      LABEL_IN_NAME: '此元素的可见文本似乎与可访问名称不同，可能会对辅助技术用户造成混淆。请检查：<hr> <strong {B}>可访问名称</strong> <strong {C}>%(TEXT)</strong>',

      // Tables
      TABLES_MISSING_HEADINGS: '缺少表头!可访问的表格需要HTML标记, 表明标题单元和数据单元, 定义它们的关系。这种信息为使用辅助技术的人提供了背景。表格应该只用于表格式的数据。<hr> 了解更多关于<a href="https://www.w3.org/WAI/tutorials/tables/">无障碍表格的信息。</a>',
      TABLES_SEMANTIC_HEADING: '语义标题, 如Heading 2或Heading 3, 只能用于内容的章节；<strong>不能</strong>用于HTML表格。使用<code>&lt;th&gt;</code>元素来表示表格的标题。<hr> 了解更多关于<a href="https://www.w3.org/WAI/tutorials/tables/">可访问的表格。</a>',
      TABLES_EMPTY_HEADING: '发现空的表头!表头应该<strong>永远不会</strong>是空的。指定行和/或列的标题以表达它们的关系是很重要的。这一信息为使用辅助技术的人提供了背景。请记住, 表格应该只用于表格式数据。<hr> 了解更多关于<a href="https://www.w3.org/WAI/tutorials/tables/">可访问的表格。</a>',

      // Contrast
      CONTRAST_NORMAL: '普通大小的文本应至少具有 %(RATIO) 的对比度。',
      CONTRAST_LARGE: '大号文本应至少具有 %(RATIO) 的对比度。',
      CONTRAST_ERROR: '文本与背景的对比度不足，可能导致阅读困难。',
      CONTRAST_WARNING: '此文本的对比度未知，需要手动检查。请确保文本与背景具有足够的对比度。',
      CONTRAST_ERROR_GRAPHIC: '图形与背景的对比度不足，可能导致难以看清。',
      CONTRAST_WARNING_GRAPHIC: '此图形的对比度未知，需要手动检查。',
      CONTRAST_TIP_GRAPHIC: '图形和用户界面元素的对比度应至少为 3:1。',
      CONTRAST_OPACITY: '提高不透明度以增强可见性。',
      CONTRAST_APCA: '此对比度不足以适用于任何文本大小。考虑使用此颜色和文本大小的组合？',
      CONTRAST_COLOR: '考虑使用此颜色？',
      CONTRAST_SIZE: '考虑增加文本大小以适配此颜色组合？',
      CONTRAST_PLACEHOLDER: '此输入框中的占位符文本与背景的对比度不足，可能导致难以阅读。',
      CONTRAST_PLACEHOLDER_UNSUPPORTED: '此占位符文本的对比度未知，需要手动检查。请确保文本与背景具有强烈的对比色。',
      CONTRAST_INPUT: '此输入框中的文本与背景的对比度不足，可能导致难以阅读。',
      CONTRAST: '对比度',
      UNKNOWN: '未知',
      FG: '前景',
      BG: '背景',
      NO_SUGGESTION: '仅更改文本颜色无法找到可访问的组合。请尝试更改背景颜色。',
    },
  };

  return zh;

}));
