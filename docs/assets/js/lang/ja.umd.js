
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
  (global = typeof globalThis !== 'undefined' ? globalThis : global || self, global.Sa11yLangJa = factory());
})(this, (function () { 'use strict';

  /*! WARNING: This is a machine-generated translation and may contain errors or inaccuracies. */
  var ja = {
    // Japan
    strings: {
      LANG_CODE: 'ja',
      MAIN_TOGGLE_LABEL: 'アクセシビリティの確認',
      CONTAINER_LABEL: 'アクセシビリティチェッカー',
      ERROR: 'エラー',
      ERRORS: 'エラース',
      WARNING: '警告',
      WARNINGS: '注意事項',
      GOOD: '良い',
      ON: 'オン',
      OFF: 'オフ',
      ALERT_TEXT: 'アラート',
      ALERT_CLOSE: '閉じる',
      OUTLINE: 'アウトライン',
      READABILITY_DESC: '<strong>アウトライン</strong>タブに読みやすさスコアを表示し、読解の難易度を測るのに役立ちます。',
      TITLE: 'タイトル',
      ALT: 'ALT',
      IMAGES: '画像',
      EDIT: '編集',
      NO_IMAGES: '画像が見つかりません。',
      DECORATIVE: '装飾用',
      MISSING: '不足',
      PAGE_ISSUES: 'ページの問題',
      SETTINGS: '設定方法',
      DEVELOPER_CHECKS: '開発者チェック',
      DEVELOPER_DESC: 'HTML属性、フォームなど、修正にコーディング知識が必要な可能性がある問題をチェックします。',
      DARK_MODE: 'ダークモード',
      SHORTCUT_SR: '問題にスキップします。キーボードショートカットAlt S',
      SKIP_TO_ISSUE: '発行物へスキップ',
      NEW_TAB: '新しいタブを開く',
      LINKED: 'リンク済み',
      PANEL_HEADING: 'アクセシビリティチェック',
      NO_ERRORS_FOUND: 'エラーは見つかりませんでした。',
      WARNINGS_FOUND: 'の警告が見つかりました。',
      TOTAL_FOUND: 'が見つかりました。',
      NOT_VISIBLE: '表示しようとしているアイテムは表示されていません。非表示になっているか、アコーディオンやタブコンポーネントの中に入っている可能性があります。以下はプレビューです：',
      MISSING_ROOT: '対象領域<code>%(root)</code>が存在しないため、全ページのアクセシビリティを確認しました。',
      MISSING_READABILITY_ROOT: '可読性スコアは<code>%(fallback)</code>のコンテンツ領域に基づいています。ターゲット領域<code>%(root)</code>が存在しないためです。',
      HEADING_NOT_VISIBLE: '見出しは表示されません。非表示になっていたり、アコーディオンやタブコンポーネントの中に入っていたりすることがあります。',
      SKIP_TO_PAGE_ISSUES: 'ページの先頭へ戻る',
      CONSOLE_ERROR: '申し訳ありませんが、このページのアクセシビリティチェッカーに問題があります。<a href="%(link)">このフォーム</a>または<a href="%(link)">GitHub</a>で報告していただけませんでしょうか',
      APPEARANCE: '外観',
      MOVE_PANEL: 'パネルを移動',

      // Dismiss
      PANEL_DISMISS_BUTTON: '%(dismissCount) 無視を表示',
      DISMISS: '無視',
      DISMISS_ALL: 'すべて無視',
      DISMISSED: '無視済み',
      DISMISS_REMINDER: '警告は<strong>一時的に</strong>無視されています。ブラウザの履歴やクッキーをクリアすると、すべてのページで以前に無視された警告が復元されます。',

      // Export
      DATE: '日付',
      PAGE_TITLE: 'ページタイトル',
      RESULTS: '結果',
      EXPORT_RESULTS: '結果のエクスポート',
      GENERATED: '%(tool) で生成された結果。',
      PREVIEW: 'プレビュー',
      ELEMENT: '要素',
      PATH: 'パス',

      // Colour filters
      COLOUR_FILTER: 'カラーフィルター',
      PROTANOPIA: 'プロタノピア',
      DEUTERANOPIA: 'デューテラノピア',
      TRITANOPIA: 'トリタノピア',
      MONOCHROMACY: 'モノクロマシー',
      COLOUR_FILTER_MESSAGE: '他の色との識別が困難な要素がないか、確認する。',
      RED_EYE: '赤いブラインド。',
      GREEN_EYE: 'グリーンのブラインドです。',
      BLUE_EYE: 'ブルーブラインドです。',
      MONO_EYE: '赤、青、緑のブラインド。',
      COLOUR_FILTER_HIGH_CONTRAST: 'ハイコントラストモードでは、カラーフィルターは機能しません。',

      // Alternative text stop words
      SUS_ALT_STOPWORDS: [
        'イマージュ',
        'グラフィック',
        'がぞう',
        '写真',
      ],
      PLACEHOLDER_ALT_STOPWORDS: [
        'アルト',
        'イマージュ',
        '写真',
        'デコラティブ',
        '写真',
        'プレースホルダ',
        '待受画像',
        'スペーサ',
      ],
      PARTIAL_ALT_STOPWORDS: [
        'クリック',
        'ここをクリック',
        '続きはこちら',
        '詳しくはこちらをご覧ください',
        'をクリックしてください',
        'しらべあげる',
        'ここに詳述',
        'は、ここに詳述されています',
        'ダウンロード',
        'ダウンロードはこちら',
        'もっと詳しく知る',
        'はこちらからダウンロードしてください',
        'さがしだす',
        '詳細はこちら',
        'をご覧ください',
        '詳しくはこちら',
        '形容',
        'これ',
        'ここに',
        'インフォメーション',
        'リンク',
        '学ぶ',
        '詳しく知る',
        'をもっと知ることができます',
        'もっと詳しく見る',
        'ならう',
        'も',
        'もっと詳しく',
        'ページ',
        'ペーパー',
        '読み替える',
        '読む',
        'これを読む',
        '今',
        '本ページ',
        'このページをご覧ください',
        '本サイト',
        'このウェブサイトをご覧ください',
        'ビュー',
        '私たちを見る',
        'ウェブサイト',
      ],
      CLICK: ['click', 'クリック'],
      NEW_WINDOW_PHRASES: [
        '外形的',
        'ニュータブ',
        'ニューウィンドウ',
        'ポップアップ',
        'ポップアップ',
      ],
      FILE_TYPE_PHRASES: ['ドキュメント', 'スプレッドシート', '計算シート', '圧縮ファイル', 'アーカイブされたファイル', 'ワークシート', 'パワーポイント', 'プレゼンテーション', 'インストール', 'ビデオ', 'オーディオ', 'PDF', 'ピクシブ', 'ドック', 'ドックス', 'になる', 'エムピーディー', 'パップ', 'テキスト', 'プチプチ', 'エグゼ', 'ディーエムジー', 'レントゲン写真', 'ウィンドウズ', 'マコス', 'クサビ', 'エックスエル', 'エックスエルエックス', 'エムピーフォー', 'ムーブ', 'アビ', 'ビュッ'],

      // Readability
      READABILITY: '読みやすさ',
      AVG_SENTENCE: '1文あたりの平均単語数：',
      COMPLEX_WORDS: '複雑な言葉：',
      TOTAL_WORDS: '言葉です：',
      VERY_DIFFICULT: '非常に難しい',
      DIFFICULT: '難しい',
      FAIRLY_DIFFICULT: 'かなり難しい',
      READABILITY_NO_CONTENT: '読みやすさのスコアを計算することができません。段落 <code>&lt;p&gt;</code> またはリストコンテンツ <code>&lt;li&gt;</code> が見つかりませんでした。',
      READABILITY_NOT_ENOUGH: '読みやすさのスコアを計算するためのコンテンツが十分でない。',

      // Headings
      HEADING_SKIPPED_LEVEL: '見出しはレベルを飛ばしたり、<strong>見出し %(PREV_LEVEL)</strong> から <strong {C}>見出し %(LEVEL)</strong> へジャンプしたりしてはいけません。これによりコンテンツの順序と階層が乱れ、読みづらくなります。 <hr> <strong {C}>%(HEADING)</strong> が <strong>%(PREV_HEADING)</strong> セクションに該当する場合は、代わりに <strong>見出し %(LEVEL)</strong> としてフォーマットすることを検討してください。',
      HEADING_EMPTY: '空の見出しが見つかりました！修正するには、この行を削除するか、その形式を<strong {C}>見出し%(level)</strong>から<strong>通常</strong>または<strong>段落</strong>に変更してください。',
      HEADING_LONG: '見出しが長すぎます！見出しはコンテンツを整理し、構造を伝えるために使用されます。簡潔で情報量があり、他と区別される必要があります。見出しは%(MAX_LENGTH)文字未満に保つようにしてください（1文を超えないでください）。<hr> <strong {B}>%(HEADING_LENGTH) 文字</strong>',
      HEADING_FIRST: 'ページの最初の見出しは通常、見出し1または見出し2にする必要があります。見出し1はメインコンテンツセクションの開始であり、ページ全体の目的を説明する主要な見出しです。<a href="https://www.w3.org/WAI/tutorials/page-structure/headings/">見出しの構造</a>について詳しくはこちら。',
      HEADING_MISSING_ONE: '見出し1がありません。見出し1はメインコンテンツ領域の開始であり、ページ全体の目的を説明する主要な見出しです。<a href="https://www.w3.org/WAI/tutorials/page-structure/headings/">見出しの構造</a>について詳しくはこちら。',
      HEADING_EMPTY_WITH_IMAGE: '見出しにテキストがありませんが、画像が含まれています。これが見出しでない場合は、その形式を<strong {C}>見出し%(level)</strong>から<strong>通常</strong>または<strong>段落</strong>に変更してください。それ以外の場合は、画像に装飾的でない alt テキストを追加してください。',
      PANEL_HEADING_MISSING_ONE: '見出し1がありません！',
      PANEL_NO_HEADINGS: '見出しが見つかりません。',

      // Links
      LINK_EMPTY: 'テキストのない空のリンクを削除してください。',
      LINK_EMPTY_LABELLEDBY: 'リンクには、空の<code>aria-labelledby</code>値またはページの他の要素の<code>id</code>値と一致しない<code>aria-labelledby</code>値があります。',
      LINK_EMPTY_NO_LABEL: 'スクリーンリーダーやその他の支援技術で見える識別可能なテキストを持たないリンクです。修正するには：<ul><li>リンク先を説明する簡潔なテキストを追加してください。</li><li><a href="https://a11y-101.com/development/icons-and-links">アイコンリンクやSVG</a>の場合、おそらく説明的なラベルが不足しています。</li><li>このリンクがコピー/貼り付けのバグによるエラーであると考える場合は、削除を検討してください。</li></ul>',
      LINK_STOPWORD: 'リンクテキストが文脈外では十分に説明的ではない可能性があります: <strong {C}>%(ERROR)</strong>',
      LINK_STOPWORD_ARIA: 'アクセシブルな名前が提供されている場合でも、リンクの可視テキストを見直すことを検討してください。「&quot;<strong {C}>%(ERROR)</strong>&quot;」のような表現は意味がありません。',
      LINK_TIP: '<hr> <strong>ヒント！</strong> リンク先を説明する、明確で一意なリンクテキストを使用してください。通常はページやドキュメントのタイトルを指します。',
      LINK_CLICK_HERE: '「クリック」や「ここをクリック」という表現は、マウスの操作に焦点を当てていますが、多くの人はマウスを使用しておらず、携帯端末でこのウェブサイトを閲覧している可能性があります。タスクに関連する他の動詞の使用を検討してください。',
      DUPLICATE_TITLE: 'リンクや画像の<code>title</code>属性は追加情報を提供するためのものであり、テキストや代替テキストとは<strong>異なる</strong>ものであるべきです。タイトルテキストは要素の上にカーソルを置くと表示されますが、キーボードやタッチ操作では利用できません。<a href="https://www.a11yproject.com/posts/title-attributes/">title属性を完全に避ける</a>ことを検討してください。',
      LINK_SYMBOLS: 'リンクテキスト内で記号をアクションを促す要素として使用するのは避けてください。支援技術から隠されていない限り、スクリーンリーダーが記号を読み上げ、混乱を招く可能性があります。削除を検討してください: <strong {C}>%(ERROR)</strong>',
      LINK_URL: 'リンクテキストとして使用される長く理解しにくいURLは、支援技術で理解するのが難しい場合があります。ほとんどの場合、URLの代わりに読みやすいテキストを使用する方が良いでしょう。短いURL（サイトのホームページなど）は問題ありません。',
      LINK_DOI: 'ウェブページやオンラインのみのリソースの場合、<a href="https://apastyle.apa.org/style-grammar-guidelines/paper-format/accessibility/urls#:~:text=descriptive%20links">APAスタイルガイド</a>は、作品のURLまたはDOIをタイトルにラップすることで説明的なリンクを使用することを推奨しています。リンクテキストとして使用される長く理解しにくいURLは、支援技術で理解するのが難しい場合があります。',
      LINK_NEW_TAB: 'リンクが警告なしに新しいタブまたはウィンドウで開きます。これは、視覚的コンテンツを認識するのが難しい人々にとって特に混乱を招く可能性があります。さらに、誰かの体験を制御したり、代わりに決定したりするのは常に良い慣行ではありません。リンクテキスト内でリンクが新しいウィンドウで開くことを示してください。<hr> <strong>ヒント！</strong> ベストプラクティスを学ぶ：<a href="https://www.nngroup.com/articles/new-browser-windows-and-tabs/">新しいブラウザウィンドウとタブでのリンクの開き方。</a>',
      LINK_FILE_EXT: 'リンクが警告なしにPDFやダウンロード可能なファイル（MP3、Zip、Word Docなど）を指しています。リンクテキスト内にファイルの種類を示してください。ファイルが大きい場合は、ファイルサイズを含めることを検討してください。<hr> <strong>例:</strong> 実行レポート（PDF、3MB）',
      LINK_IDENTICAL_NAME: 'リンクが他のリンクと同じテキストを持っていますが、異なるページを指しています。同じテキストを持つ複数のリンクは、スクリーンリーダーを使用する人々に混乱を招く可能性があります。<strong>他のリンクと区別するために、次のリンクをより具体的にすることを検討してください。</strong> <hr> <strong {B}>アクセシブル名</strong> <strong {C}>%(TEXT)</strong>',

      // Images
      MISSING_ALT_LINK_HAS_TEXT: '画像が周囲のテキストと一緒にリンクとして使用されていますが、alt属性は装飾用としてマークされる必要があります。',
      MISSING_ALT_LINK: '画像がリンクとして使用されていますが、altテキストがありません！リンクがどこに向かうかを説明するaltテキストを確認してください。',
      MISSING_ALT: 'altテキストがありません！画像が物語やムード、重要な情報を伝えている場合は、画像を説明してください。',
      LINK_ALT_FILE_EXT: '代替テキストにはファイル拡張子や画像の寸法を含めてはいけません。altテキストが画像のリンク先を説明しているかどうか、画像の文字通りの説明ではないことを確認してください。<hr> {ALT} {L} <strong {C}>%(ALT_TEXT)</strong>',
      LINK_PLACEHOLDER_ALT: 'リンクされた画像内の記述のないまたはプレースホルダーのaltテキストが見つかりました。altテキストが画像のリンク先を説明していることを確認してください。<hr> {ALT} {L} <strong {C}>%(ALT_TEXT)</strong>',
      LINK_SUS_ALT: '支援技術はすでにこれが画像であることを示しているため、「<strong {C}>%(ERROR)</strong>」は冗長かもしれません。altテキストが画像のリンク先を説明していることを確認してください。<hr> {ALT} {L} <strong {C}>%(ALT_TEXT)</strong>',
      ALT_FILE_EXT: '代替テキストにはファイル拡張子や画像の寸法を含めてはいけません。画像が物語やムード、重要な情報を伝えている場合は、画像を説明してください。<hr> {ALT} <strong {C}>%(ALT_TEXT)</strong>',
      ALT_PLACEHOLDER: '記述のないまたはプレースホルダーのaltテキストが見つかりました。次のaltテキストをより意味のあるものに置き換えてください。<hr> {ALT} <strong {C}>%(ALT_TEXT)</strong>',
      SUS_ALT: '支援技術はすでにこれが画像であることを示しているため、「<strong {C}>%(ERROR)</strong>」は冗長かもしれません。<hr> {ALT} <strong {C}>%(ALT_TEXT)</strong>',
      LINK_IMAGE_NO_ALT_TEXT: '画像内のリンクが装飾用としてマークされており、リンクテキストがありません。リンクの目的を説明するaltテキストを画像に追加してください。',
      LINK_IMAGE_TEXT: '画像が装飾用としてマークされていますが、リンクが周囲のテキストを説明するラベルとして使用されています。',
      LINK_IMAGE_LONG_ALT: 'リンクされた画像のaltテキストの説明が<strong>長すぎます</strong>。リンクされた画像のaltテキストは、画像の文字通りの説明ではなく、リンクの目的を説明する必要があります。<strong>リンク先のページのタイトルをaltテキストとして使用することを検討してください。</strong> <hr> {ALT} {L} <strong {B}>%(altLength) 文字</strong> <strong {C}>%(ALT_TEXT)</strong>',
      LINK_IMAGE_ALT: '画像リンクにはaltテキストが含まれています。altテキストがリンク先を説明していますか？<strong>リンク先のページのタイトルをaltテキストとして使用することを検討してください。</strong> <hr> {ALT} {L} <strong {C}>%(ALT_TEXT)</strong>',
      LINK_IMAGE_ALT_AND_TEXT: '画像リンクには<strong>altテキストと周囲のリンクテキストの両方が含まれています。</strong> この画像が装飾用であり、他のページへの機能的なリンクとして使用されている場合は、画像を装飾用としてマークすることを検討してください。周囲のリンクテキストで十分です。<hr> {ALT} <strong {C}>%(ALT_TEXT)</strong> <hr> <strong {B}>アクセシブル名</strong> {L} <strong {C}>%(TEXT)</strong>',
      IMAGE_FIGURE_DECORATIVE: '画像が<strong>装飾用</strong>としてマークされ、支援技術によって無視されます。<hr> キャプションが提供されていますが、ほとんどの場合、画像にはaltテキストも必要です。<ul><li>altテキストは画像の内容を簡潔に説明する必要があります。</li><li>キャプションは通常、画像を周囲のコンテンツに関連付けるための文脈を提供したり、特定の情報に注意を払ったりするために使用されます。</li></ul>詳細はこちら：<a href="https://thoughtbot.com/blog/alt-vs-figcaption#the-figcaption-element">altとfigcaptionの比較</a>。',
      IMAGE_FIGURE_DUPLICATE_ALT: 'altとキャプションテキストにはまったく同じ単語を使用しないでください。スクリーンリーダーは情報を二重に発表します。<ul><li>altテキストは画像の内容を簡潔に説明する必要があります。</li><li>キャプションは通常、画像を周囲のコンテンツに関連付けるための文脈を提供したり、特定の情報に注意を払ったりするために使用されます。</li></ul>詳細はこちら：<a href="https://thoughtbot.com/blog/alt-vs-figcaption#the-figcaption-element">altとfigcaptionの比較</a> <hr> {ALT} <strong {C}>%(ALT_TEXT)</strong>',
      IMAGE_DECORATIVE: '画像が<strong>装飾用</strong>としてマークされ、支援技術によって無視されます。画像が物語やムード、重要な情報を伝えている場合は、altテキストを追加してください。',
      IMAGE_DECORATIVE_CAROUSEL: '画像は装飾的としてマークされていますが、カルーセルやギャラリー内のすべての画像には、すべての人に等しい体験を提供するために説明的な代替テキストを含める必要があります。',
      IMAGE_ALT_TOO_LONG: 'altテキストの説明が<strong>長すぎます</strong>。altテキストは簡潔でありながら意味のあるものである必要があります（ツイートのように、約100文字）。これが複雑な画像やグラフの場合は、画像の長い説明を以下のテキストまたは折りたたみコンポーネントに入れることを検討してください。<hr> {ALT} <strong {B}>%(altLength) 文字</strong> <strong {C}>%(ALT_TEXT)</strong>',
      IMAGE_PASS: '{ALT} %(ALT_TEXT)',

      // Form labels
      LABELS_MISSING_IMAGE_INPUT: '画像ボタンにaltテキストがありません。アクセス可能な名前を提供するためにaltテキストを追加してください。例：<em>検索</em>または<em>送信</em>。',
      LABELS_INPUT_RESET: 'リセットボタンは、特に必要な場合を除いて使用しないでください。間違って簡単にアクティブ化される可能性があります。<hr> <strong>ヒント！</strong> <a href="https://www.nngroup.com/articles/reset-and-cancel-buttons/">リセットおよびキャンセルボタンが使用性の問題を引き起こす理由</a>を学んでください。',
      LABELS_ARIA_LABEL_INPUT: '入力フィールドにはアクセス可能な名前がありますが、見えるラベルもあることを確認してください。<hr> <strong {B}>アクセシブル名</strong> <strong {C}>%(TEXT)</strong>',
      LABELS_NO_FOR_ATTRIBUTE: 'この入力フィールドに関連付けられたラベルがありません。この入力フィールドのラベルに一致する<code>for</code>属性を追加してください。 <hr> <strong {B}>ID</strong> <strong {C}>#%(id)</strong>',
      LABELS_MISSING_LABEL: 'この入力フィールドに関連付けられたラベルがありません。この入力フィールドに<code>id</code>を追加し、ラベルに一致する<code>for</code>属性を追加してください。',
      LABELS_PLACEHOLDER: '消えるプレースホルダー テキストは、人々がフィールドに何の情報が属しているかを思い出すのを難しくし、検証の問題を特定して修正するのを困難にします。代わりに、フォームフィールドの前に常に表示されるヒントを使用することを検討してください。 <hr> 詳細はこちら: <a href="https://www.nngroup.com/articles/form-design-placeholders/">フォームフィールドのプレースホルダーは有害です。</a>',

      // Embedded content
      EMBED_VIDEO: 'すべての動画に<strong>字幕を表示してください。</strong> 音声および動画コンテンツのすべてに字幕を提供することは、必須のレベルAの要件です。字幕は、聴覚障害者や難聴者をサポートします。',
      EMBED_AUDIO: 'すべてのポッドキャストに<strong>トランスクリプトを提供してください。</strong> 音声コンテンツのすべてにトランスクリプトを提供することは、必須のレベルAの要件です。トランスクリプトは、聴覚障害者や難聴者をサポートしますが、誰にでも利益をもたらすことがあります。トランスクリプトを下部に配置するか、アコーディオンパネル内に配置することを検討してください。',
      EMBED_DATA_VIZ: 'このようなデータ可視化ウィジェットは、キーボードやスクリーンリーダーを使用してナビゲートする人々や、視力が低い人々や色覚異常の人々にとって問題が発生することがよくあります。ウィジェットの下に代替（テキストまたは表）形式で同じ情報を提供することが推奨されています。<hr> <a href="https://www.w3.org/WAI/tutorials/images/complex">複雑な画像</a>について詳しく学びます。',
      EMBED_MISSING_TITLE: '埋め込みコンテンツには、その内容を説明するアクセス可能な名前が必要です。 <code>iframe</code>要素にユニークな<code>title</code>または<code>aria-label</code>属性を提供してください。<a href="https://web.dev/learn/accessibility/more-html#iframes">iFrames</a>について詳しく学びます。',
      EMBED_GENERAL: '埋め込みコンテンツを確認できません。画像にはaltテキスト、動画には字幕、テキストには十分なコントラスト、対話型コンポーネントには<a href="https://webaim.org/techniques/keyboard/">キーボードアクセス可能性</a>があることを確認してください。',
      EMBED_UNFOCUSABLE: '<code>&lt;iframe&gt;</code>にフォーカス可能な要素が含まれている場合、<code>tabindex="-1"</code>を持つべきではありません。埋め込みコンテンツはキーボードでアクセスできません。',

      // QA
      QA_BAD_LINK: '悪いリンクが見つかりました。リンクは開発環境を指しているようです。<hr> {L} <strong {C}>%(LINK)</strong>',
      QA_STRONG_ITALICS: '太字および斜体タグには意味があり、段落全体を強調表示するために使用してはいけません。<strong>強調</strong>するためには、太字が使用されるべきです。斜体は固有名詞（つまり、書籍や記事のタイトル）、外国語、引用を強調するために使用されるべきです。長い引用は引用ブロックとしてフォーマットする必要があります。',
      QA_PDF: 'PDFのアクセシビリティをチェックできません。PDFはWebコンテンツと見なされ、アクセシブルにする必要があります。PDFには、スクリーンリーダーを使用する人や視力が低い人向けの問題がよく含まれます（構造タグの欠落やフォームフィールドのラベルの欠落など）。<ul><li>これがフォームである場合は、代替としてアクセシブルなHTMLフォームを使用してください。</li><li>これが文書である場合は、Webページに変換してください。</li></ul>それ以外の場合は、<a href="https://helpx.adobe.com/acrobat/using/create-verify-pdf-accessibility.html">Acrobat DCでのPDFのアクセシビリティを確認してください。</a>',
      QA_DOCUMENT: '文書のアクセシビリティをチェックできません。リンクされた文書はWebコンテンツと見なされ、アクセシブルにする必要があります。この文書を手動で確認してください。<ul><li><a href="https://support.google.com/docs/answer/6199477?hl=en">Google Workspaceドキュメントやプレゼンテーションをよりアクセシブルにする方法</a></li><li><a href="https://support.microsoft.com/en-us/office/create-accessible-office-documents-868ecfcd-4f00-4224-b881-a65537a7c155">Office文書をよりアクセシブルにする方法</a></li></ul>',
      QA_BLOCKQUOTE: 'これは見出しですか？<strong {C}>%(TEXT)</strong><hr> ブロック引用は引用のためにのみ使用する必要があります。これが見出しである場合は、このブロック引用をセマンティックな見出し（例：見出し2または見出し3）に変更してください。',
      QA_FAKE_HEADING: 'これは見出しですか？<strong {C}>%(TEXT)</strong><hr> 太字や大きなテキストの行は見出しのように見えるかもしれませんが、スクリーンリーダーを使用している人はそれが重要であるかどうかを判断したり、その内容にジャンプしたりすることができません。太字や大きなテキストはセマンティックな見出し（見出し2から見出し6）を置き換えるべきではありません。',
      QA_FAKE_LIST: 'リストを作成しようとしていますか？可能なリスト項目が見つかりました：<strong {C}>%(firstPrefix)</strong> <hr> ブルレットまたは番号の書式設定ボタンを使用してセマンティックなリストを使用してください。セマンティックなリストを使用すると、支援技術が合計アイテム数やリスト内の各アイテムの相対位置などの情報を伝えることができます。<a href="https://www.w3.org/WAI/tutorials/page-structure/content/#lists">セマンティックリスト</a>について詳しく学びます。',
      QA_UPPERCASE: 'すべて大文字が見つかりました。一部のスクリーンリーダーはすべて大文字のテキストを略語と解釈し、各文字を個別に読み上げます。また、一部の人々はすべて大文字のテキストを読むのが難しく、それが叫んでいるように見えるかもしれません。',
      QA_UNDERLINE: '下線付きテキストはリンクと混同される可能性があります。<code>&lt;strong&gt;</code><strong>strong importance</strong><code>&lt;/strong&gt;</code>や<code>&lt;em&gt;</code><em>emphasis</em><code>&lt;/em&gt;</code>など、異なるスタイルを使用してください。',
      QA_SUBSCRIPT: '下付き文字および上付き文字の書式設定オプションは、テキストの位置を変更するためのものであるべきです。それは単にプレゼンテーションや外観の目的でのみ使用されるべきではありません。文章全体のフォーマットは読みにくさの問題を引き起こします。適切な使用例には、指数の表示、序数（たとえば4<sup>th</sup>）、化学式（例：H<sub>2</sub>O）などが含まれます。',
      QA_IN_PAGE_LINK: 'リンクが壊れた同じページのリンクです。リンクのターゲットはページ上のいずれの要素とも一致しません。',
      QA_NESTED_COMPONENTS: 'インタラクティブなレイアウトコンポーネントをネストすることは避けてください。例えば、アコーディオンをタブ内に配置したり、タブをアコーディオン内に配置したりすることです。これにより、ナビゲーションが複雑になり、認知的負荷が増加し、コンテンツを見落とす可能性があります。',
      QA_JUSTIFY: '左右のマージンに揃える「両端揃え」を使用しないでください。単語間の不均等なスペースのため、一部の人には読みにくくなる可能性があります。読みやすさを向上させるために、左揃えのテキストを使用してください。',
      QA_SMALL_TEXT: '小さな文字は、特に視力の低下した人にとって読みづらいです。より良い可読性を確保するため、デフォルトサイズより小さいフォントサイズの使用は避けてください。',

      // Shared
      ACC_NAME: '<strong {B}>アクセシブル名</strong> %(TEXT)',
      ACC_NAME_TIP: '<hr><strong>ヒント!</strong> "アクセシブル名"は、支援技術を使用する人々に伝えられる最終的なラベルであり、ARIAによって計算されます。これにより、リンクやボタンの目的を理解するのに役立ちます。',
      HIDDEN_FOCUSABLE: 'リンクやボタンに <code>aria-hidden=&quot;true&quot;</code> が設定されていますが、キーボードでフォーカス可能です。重複したリンクやボタンを非表示にする場合は、<code>tabindex=&quot;-1&quot;</code> も追加してください。それ以外の場合、フォーカスを受け取ることができる要素に <code>aria-hidden=&quot;true&quot;</code> を使用してはいけません。<hr> <a href="https://developer.mozilla.org/ja/docs/Web/Accessibility/ARIA/Attributes/aria-hidden">aria-hidden 属性について</a>詳しく知る。',

      // Developer
      DUPLICATE_ID: '重複した<strong>IDが見つかりました</strong>。重複したIDは、支援技術がコンテンツとの相互作用を試みる際に問題を引き起こすことが知られています。次のIDを削除または変更してください。<hr> <strong {B}>ID</strong> <strong {C}>#%(id)</strong>',
      UNCONTAINED_LI: 'すべての <code>&lt;li&gt;</code> リスト項目は、<code>&lt;ul&gt;</code> 順不同リストまたは <code>&lt;ol&gt;</code> 順序付きリストの要素内に配置する必要があります。この構造は、スクリーンリーダーがリストとその項目を正確に読み上げるのに役立ちます。',
      TABINDEX_ATTR: '要素は <code>tabindex</code> 属性が 0 より大きくてはいけません。',

      // Meta checks
      META_LANG: 'ページ言語が宣言されていません！<a href="https://www.w3.org/International/questions/qa-html-language-declarations">HTMLタグで言語を宣言してください。</a>',
      META_TITLE: 'ページタイトルがありません！<a href="https://developer.mozilla.org/en-US/docs/Web/HTML/Element/title">ページタイトルを入力してください。</a>',
      META_SCALABLE: '<a href="https://developer.mozilla.org/ja/docs/Web/HTML/Viewport_meta_tag">ビューポートのメタタグ</a>にある <code>user-scalable="no"</code> パラメータを削除して、ズームを許可してください。',
      META_MAX: '<a href="https://developer.mozilla.org/ja/docs/Web/HTML/Viewport_meta_tag">ビューポートのメタタグ</a>の <code>maximum-scale</code> パラメータが 2 未満でないことを確認してください。',
      META_REFRESH: 'ページはメタタグを使用して自動的に更新されるべきではありません。',

      // Buttons
      BTN_EMPTY: 'ボタンにはその目的を説明するアクセシブルな名前がありません。',
      BTN_EMPTY_LABELLEDBY: 'ボタンに空の <code>aria-labelledby</code> 値があるか、ページ上の他の要素の <code>id</code> と一致していません。',
      BTN: 'ボタン',
      BTN_TIP: 'アクセシブルな <a href="https://www.sarasoueidan.com/blog/accessible-icon-buttons/">ボタンの作り方</a> を学ぶ。',
      BTN_ROLE_IN_NAME: 'ボタンの名前に「ボタン」という単語を含めないでください。スクリーンリーダーは、名前に加えて要素の役割をすでに伝えています。',
      LABEL_IN_NAME: 'この要素の表示されるテキストがアクセシブルな名前と異なっているようで、支援技術を使用するユーザーに混乱を招く可能性があります。確認してください：<hr> <strong {B}>アクセシブルな名前</strong> <strong {C}>%(TEXT)</strong>',

      // Tables
      TABLES_MISSING_HEADINGS: 'テーブルヘッダーがありません！アクセシブルなテーブルには、ヘッダーセルとデータセルを示すHTMLマークアップが必要です。これにより、支援技術を使用する人々にコンテキストが提供されます。テーブルは表形式のデータのみに使用する必要があります。<hr> <a href="https://www.w3.org/WAI/tutorials/tables/">アクセシブルなテーブル</a>について詳しく学びます。',
      TABLES_SEMANTIC_HEADING: '見出し2や見出し3などのセマンティックな見出しは、コンテンツのセクションにのみ使用すべきです。HTMLテーブルでは<strong>使用しないでください</strong>。代わりに<code>&lt;th&gt;</code>要素を使用してテーブルの見出しを示します。<hr> <a href="https://www.w3.org/WAI/tutorials/tables/">アクセシブルなテーブル</a>について詳しく学びます。',
      TABLES_EMPTY_HEADING: '空のテーブルヘッダーが見つかりました！テーブルヘッダーは<strong>空にしてはいけません</strong>。行や列のヘッダーを指定して関係性を伝えることが重要です。これにより、支援技術を使用する人々にコンテキストが提供されます。テーブルは表形式のデータのみに使用する必要があります。<hr> <a href="https://www.w3.org/WAI/tutorials/tables/">アクセシブルなテーブル</a>について詳しく学びます。',

      // Contrast
      CONTRAST_NORMAL: '標準サイズのテキストは、少なくとも %(RATIO) のコントラスト比が必要です。',
      CONTRAST_LARGE: '大きなサイズのテキストは、少なくとも %(RATIO) のコントラスト比が必要です。',
      CONTRAST_ERROR: 'テキストは背景とのコントラストが不十分で、読みづらくなっています。',
      CONTRAST_WARNING: 'このテキストのコントラストは不明で、手動で確認する必要があります。テキストと背景に強いコントラストがあることを確認してください。',
      CONTRAST_ERROR_GRAPHIC: 'グラフィックは背景とのコントラストが不十分で、視認が難しくなっています。',
      CONTRAST_WARNING_GRAPHIC: 'このグラフィックのコントラストは不明で、手動で確認する必要があります。',
      CONTRAST_TIP_GRAPHIC: 'グラフィックおよびユーザーインターフェイスの要素は、少なくとも3:1のコントラスト比が必要です。',
      CONTRAST_OPACITY: '視認性を高めるために不透明度を上げてください。',
      CONTRAST_APCA: 'このコントラストは、どのサイズのテキストにも十分ではありません。これらの色とテキストサイズの組み合わせを使用することを検討しますか？',
      CONTRAST_COLOR: 'この色を代わりに使用することを検討しますか？',
      CONTRAST_SIZE: 'この色の組み合わせでテキストサイズを大きくすることを検討しますか？',
      CONTRAST_PLACEHOLDER: 'この入力のプレースホルダーテキストは背景とのコントラストが不十分で、読みづらくなっています。',
      CONTRAST_PLACEHOLDER_UNSUPPORTED: 'このプレースホルダーテキストのコントラストは不明であり、手動で確認する必要があります。テキストと背景に強いコントラストのある色を使用してください。',
      CONTRAST_INPUT: 'この入力内のテキストは背景とのコントラストが不十分で、読みづらくなっています。',
      CONTRAST: 'コントラスト',
      UNKNOWN: '不明',
      FG: '前景',
      BG: '背景',
      NO_SUGGESTION: 'テキストの色だけを変更してもアクセス可能な組み合わせは見つかりません。背景色を変更してみてください。',
    },
  };

  return ja;

}));
