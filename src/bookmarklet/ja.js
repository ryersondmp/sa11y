import { loadSa11y } from './_loadSa11y';

const langCode = 'ja';
const message = {
  close: '閉じる',
  heading: '更新が必要です',
  message: '以下のリンクをブックマークバーに追加して、Sa11yブックマークレットを更新してください。',
  features: '新しいブックマークレット機能',
  a: '自動ページ言語検出',
  aContent: 'このブックマークレットは、ページの言語に基づいてSa11yの翻訳版を自動的に表示します。言語がサポートされていない場合、英語がデフォルトになります。',
  b: 'セキュリティポリシーの警告',
  bContent: 'ウェブサイトがSa11yのページでの動作を制限するセキュリティポリシーを適用している場合、警告が表示されます。',
};
loadSa11y(langCode, message);
