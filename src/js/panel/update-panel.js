// ----------------------------------------------------------------------
// Main panel: Display and update panel.
// ----------------------------------------------------------------------
import Lang from '../components/translation';
import skipToIssue from './skip';
import buildPanel from './build-panel';

export default function updatePanel() {
  this.panelActive = true;

  buildPanel();
  skipToIssue();

  const $skipBtn = document.getElementById('sa11y-cycle-toggle');
  $skipBtn.disabled = false;
  $skipBtn.setAttribute('style', 'cursor: pointer !important;');

  const $panel = document.getElementById('sa11y-panel');
  $panel.classList.add('sa11y-active');

  const html = document.querySelector('html');
  html.setAttribute('data-sa11y-active', 'true');

  const $panelContent = document.getElementById('sa11y-panel-content');
  const $status = document.getElementById('sa11y-status');
  const $findButtons = document.querySelectorAll('.sa11y-btn');

  if (Sa11y.errorCount > 0 && Sa11y.warningCount > 0) {
    $panelContent.setAttribute('class', 'sa11y-errors');
    $status.innerHTML = `${Lang._('ERRORS')} <span class="sa11y-panel-count sa11y-margin-right">${Sa11y.errorCount}</span> ${Lang._('WARNINGS')} <span class="sa11y-panel-count">${Sa11y.warningCount}</span>`;
  } else if (Sa11y.errorCount > 0) {
    $panelContent.setAttribute('class', 'sa11y-errors');
    $status.innerHTML = `${Lang._('ERRORS')} <span class="sa11y-panel-count">${Sa11y.errorCount}</span>`;
  } else if (Sa11y.warningCount > 0) {
    $panelContent.setAttribute('class', 'sa11y-warnings');
    $status.innerHTML = `${Lang._('WARNINGS')} <span class="sa11y-panel-count">${Sa11y.warningCount}</span>`;
  } else {
    $panelContent.setAttribute('class', 'sa11y-good');
    $status.textContent = `${Lang._('PANEL_STATUS_NONE')}`;

    if ($findButtons.length === 0) {
      $skipBtn.disabled = true;
      $skipBtn.setAttribute('style', 'cursor: default !important;');
    }
  }
}
