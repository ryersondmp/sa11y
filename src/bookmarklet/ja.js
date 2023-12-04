/* eslint-disable no-alert */
import { loadSa11y } from './_loadSa11y';

const langCode = 'ja';

if (typeof Sa11y === 'object') {
  if (window.location.pathname.includes('sa11y')) {
    alert('Sa11y」ボタンをブックマークバーにドラッグしてください。その後、任意のウェブページでブックマークをクリックします。');
  } else {
    alert('Sa11yはすでにこのページにロードされています。しばらくお待ちいただくか、ページを再読み込みして再度お試しください。');
  }
} else {
  loadSa11y(langCode);
}
