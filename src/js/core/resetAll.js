import Constants from '../utils/constants';
import * as Utils from '../utils/utils';
import find from '../utils/find';
import { removeAlert } from '../interface/alert';
import { removeSkipBtnListeners } from './skip-to-issue';
import { removeExportListeners } from '../features/export-results';
import { removeDismissListeners } from '../features/dismissals';
import { resetColourFilters } from '../features/colour-filters';
import { State, resetState } from './state';

/* *********************************************************** */
/*  Reset all: Clears everything and resets the panel.         */
/* *********************************************************** */
export async function resetAll(restartPanel = true) {
  Constants.Global.html.removeAttribute('data-sa11y-active');

  // Remove from page.
  Utils.remove(
    [
      'sa11y-annotation',
      'sa11y-heading-label',
      'sa11y-heading-anchor',
      'sa11y-image-anchor',
      'sa11y-tooltips',
    ],
    'document',
  );

  // Remove Sa11y anchor positioning markup (while preserving any existing anchors).
  if (Utils.supportsAnchorPositioning()) {
    find('[data-sa11y-error], [data-sa11y-warning], [data-sa11y-good]', 'document').forEach(
      ($el) => {
        const anchor = $el;
        const anchors = (anchor.style.anchorName || '')
          .split(',')
          .map((s) => s.trim())
          .filter((s) => s && !s.startsWith('--sa11y-anchor'));
        if (anchors.length) {
          anchor.style.anchorName = anchors.join(', ');
        } else {
          anchor.style.removeProperty('anchor-name');
          if (!anchor.style.length) {
            anchor.removeAttribute('style');
          }
        }
      },
    );
  }

  // Reset all data attributes.
  Utils.resetAttributes(
    [
      'data-sa11y-parent',
      'data-sa11y-error',
      'data-sa11y-warning',
      'data-sa11y-good',
      'data-sa11y-overflow',
      'data-sa11y-image',
      'data-sa11y-pulse-border',
      'data-sa11y-filter',
      'data-sa11y-has-shadow-root',
    ],
    'document',
  );

  // Remove from panel.
  Constants.Panel.outlineList.innerHTML = '';
  if (State.option.showImageOutline) {
    Constants.Panel.imagesList.innerHTML = '';
  }
  Constants.Panel.pageIssuesList.innerHTML = '';
  Constants.Panel.readabilityInfo.innerHTML = '';
  Constants.Panel.readabilityDetails.innerHTML = '';
  Constants.Panel.panel.classList.remove('has-page-issues');
  Constants.Panel.pageIssues.classList.remove('active');
  Constants.Panel.settingsContent.classList.remove('hide-settings-border');
  Constants.Panel.panel.querySelector('#readability-alert')?.remove();

  // Remove any active alerts from panel.
  removeAlert();

  // Remove EventListeners.
  removeSkipBtnListeners();
  removeExportListeners();
  removeDismissListeners();

  // Reset colour filters.
  resetColourFilters();

  // Main panel warning and error count.
  while (Constants.Panel.status.firstChild) {
    Constants.Panel.status.removeChild(Constants.Panel.status.firstChild);
  }

  // Remove data attribute from shadow root elements.
  document.querySelectorAll('[data-sa11y-has-shadow-root]').forEach((el) => {
    el.shadowRoot.querySelectorAll('style.sa11y-css-utilities').forEach((style) => {
      style.remove();
    });
    el.removeAttribute('data-sa11y-has-shadow-root');
  });

  if (restartPanel) {
    Constants.Panel.panel.classList.remove('active');
  }

  // Reset cached getText();
  Utils.resetGetText();

  // Reset state.
  resetState();
}
