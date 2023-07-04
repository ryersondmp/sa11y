/* eslint-disable no-alert */
import { loadSa11y } from './_loadSa11y';

const langCode = 'ja';

if (typeof Sa11y !== 'object') {
  loadSa11y(langCode);
} else {
  alert('Sa11y」ボタンをブックマークバーにドラッグしてください。その後、任意のウェブページでブックマークをクリックします。');
}
