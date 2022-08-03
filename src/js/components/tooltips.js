// ============================================================
// Initialize tooltips for error/warning/pass buttons: (Tippy.js)
// ============================================================
import tippy from 'tippy.js';

export default function initializeTooltips() {
  tippy('.sa11y-btn', {
    interactive: true,
    trigger: 'mouseenter click focusin', // Focusin trigger to ensure "Jump to issue" button displays tooltip.
    arrow: true,
    delay: [200, 0], // Slight delay to ensure mouse doesn't quickly trigger and hide tooltip.
    theme: 'sa11y-theme',
    placement: 'auto-start',
    allowHTML: true,
    aria: {
      content: 'describedby',
    },
    appendTo: document.body,
  });
}
