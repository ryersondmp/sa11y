/* eslint-disable no-alert */
import { loadSa11y } from './_loadSa11y';

const langCode = 'zh';

if (typeof Sa11y !== 'object') {
  loadSa11y(langCode);
} else {
  alert('将 "Sa11y "按钮拖入你的书签栏。然后在任何网页上点击该书签。');
}
