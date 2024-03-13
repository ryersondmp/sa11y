import { loadSa11y } from './_loadSa11y';

const langCode = 'zh';
const message = {
  close: '关闭',
  heading: '需要更新',
  message: '请通过将以下链接添加到您的书签栏来更新 Sa11y 书签。',
  features: '新书签功能',
  a: '自动页面语言检测',
  aContent: '此书签会根据页面语言自动显示 Sa11y 的翻译版本。如果语言不受支持，将使用英语。',
  b: '安全策略警告',
  bContent: '如果网站执行限制 Sa11y 在其页面上工作的安全策略，则会显示警告。',
};
loadSa11y(langCode, message);
