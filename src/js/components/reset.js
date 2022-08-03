// ============================================================
// Reset all
// ============================================================
export default function resetAll(restartPanel = true) {
  this.panelActive = false;

  const html = document.querySelector('html');
  html.removeAttribute('data-sa11y-active');

  // Remove eventListeners on the Show Outline and Show Panel toggles.
  const $outlineToggle = document.getElementById('sa11y-outline-toggle');
  const resetOutline = $outlineToggle.cloneNode(true);
  $outlineToggle.parentNode.replaceChild(resetOutline, $outlineToggle);

  const $settingsToggle = document.getElementById('sa11y-settings-toggle');
  const resetSettings = $settingsToggle.cloneNode(true);
  $settingsToggle.parentNode.replaceChild(resetSettings, $settingsToggle);

  // Reset all classes on elements.
  const resetClass = (el) => {
    el.forEach((x) => {
      document.querySelectorAll(`.${x}`).forEach((y) => y.classList.remove(x));
    });
  };
  resetClass(['sa11y-error-border', 'sa11y-error-text', 'sa11y-warning-border', 'sa11y-warning-text', 'sa11y-good-border', 'sa11y-good-text', 'sa11y-overflow', 'sa11y-fake-heading', 'sa11y-pulse-border', 'sa11y-fake-list']);

  const allcaps = document.querySelectorAll('.sa11y-warning-uppercase');
  allcaps.forEach((el) => el.outerHTML = el.innerHTML);

  // Remove
  document.querySelectorAll(`
                .sa11y-instance,
                .sa11y-instance-inline,
                .sa11y-heading-label,
                #sa11y-outline-list li,
                .sa11y-readability-period,
                #sa11y-readability-info span,
                #sa11y-readability-details li,
                .sa11y-clone-image-text
            `).forEach((el) => el.parentNode.removeChild(el));

  // Alert within panel.
  document.querySelector('#sa11y-panel-alert').classList.remove('sa11y-active');

  const empty = document.querySelector('#sa11y-panel-alert-text');
  while (empty.firstChild) empty.removeChild(empty.firstChild);

  const emptyPreview = document.querySelector('#sa11y-panel-alert-preview');
  while (emptyPreview.firstChild) emptyPreview.removeChild(emptyPreview.firstChild);
  emptyPreview.classList.remove('sa11y-panel-alert-preview');

  // Main panel warning and error count.
  const clearStatus = document.querySelector('#sa11y-status');
  while (clearStatus.firstChild) clearStatus.removeChild(clearStatus.firstChild);

  if (restartPanel) {
    document.querySelector('#sa11y-panel').classList.remove('sa11y-active');
  }
}
