/* eslint-disable no-alert */
import { loadSa11y } from './_loadSa11y';

const langCode = 'ko';

if (typeof Sa11y === 'object') {
  if (window.location.pathname.includes('sa11y')) {
    alert('"Sa11y" 버튼을 북마크 표시줄로 드래그합니다. 그런 다음 아무 웹페이지에서나 북마크를 클릭합니다.');
  } else {
    alert('이 페이지에 Sa11y가 이미 로드되었습니다. 잠시 기다리거나 페이지를 새로고침한 후 다시 시도하세요.');
  }
} else {
  loadSa11y(langCode);
}
