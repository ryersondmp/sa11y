/* eslint-disable no-alert */
import { loadSa11y } from './_loadSa11y';

const langCode = 'zh';

if (typeof Sa11y === 'object') {
  if (window.location.pathname.includes('sa11y')) {
    alert('将 "Sa11y "按钮拖入你的书签栏。然后在任何网页上点击该书签。');
  } else {
    alert('本页面已加载 Sa11y。请稍候，或重新加载页面再试。');
  }
} else {
  loadSa11y(langCode);
}
