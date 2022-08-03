import tippy from 'tippy.js';
import Lang from '../components/translation';

export default function skipToIssueTooltip() {
  let keyboardShortcut;
  if (navigator.userAgent.indexOf('Mac') !== -1) {
    keyboardShortcut = '<span class="sa11y-kbd">Option</span> + <span class="sa11y-kbd">S</span>';
  } else {
    keyboardShortcut = '<span class="sa11y-kbd">Alt</span> + <span class="sa11y-kbd">S</span>';
  }

  tippy('#sa11y-cycle-toggle', {
    content: `<div style="text-align:center">${Lang._('SHORTCUT_TOOLTIP')} &raquo;<br>${keyboardShortcut}</div>`,
    allowHTML: true,
    delay: [900, 0],
    trigger: 'mouseenter focusin',
    arrow: true,
    placement: 'top',
    theme: 'sa11y-theme',
    aria: {
      content: null,
      expanded: false,
    },
    appendTo: document.body,
  });
}
