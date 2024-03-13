import { loadSa11y } from './_loadSa11y';

const langCode = 'ko';
const message = {
  close: '닫기',
  heading: '업데이트 필요',
  message: '다음 링크를 북마크 표시줄에 추가하여 Sa11y 북마크렛을 업데이트하십시오.',
  features: '새 북마크렛 기능',
  a: '자동 페이지 언어 감지',
  aContent: '이 북마크렛은 페이지 언어를 기반으로 Sa11y의 번역된 버전을 자동으로 표시합니다. 언어가 지원되지 않으면 영어로 표시됩니다.',
  b: '보안 정책 경고',
  bContent: '웹 사이트가 해당 페이지에서 Sa11y의 작동을 제한하는 보안 정책을 적용하는 경우 경고가 표시됩니다.',
};
loadSa11y(langCode, message);
