import Constants from '../utils/constants';
import Lang from '../utils/lang';
import { store } from '../utils/utils';

/* ************************************************************ */
/*  Update warning and error counts on panel.                   */
/* ************************************************************ */
export function updatePanel(dismissCount, errorCount, warningCount) {
  Constants.Panel.skipButton.disabled = false;
  Constants.Panel.panel.classList.add('active');
  Constants.Global.html.setAttribute('data-sa11y-active', 'true');
  Constants.Panel.skipButton.classList.add('active');

  if (errorCount > 0 && warningCount > 0) {
    Constants.Panel.content.setAttribute('class', 'errors');
    Constants.Panel.status.innerHTML = `${Lang._('ERRORS')} <span class="panel-count">${errorCount}</span> ${Lang._('WARNINGS')} <span class="panel-count" id="warning-count">${warningCount}</span>`;
  } else if (errorCount > 0) {
    Constants.Panel.content.setAttribute('class', 'errors');
    Constants.Panel.status.innerHTML = `${Lang._('ERRORS')} <span class="panel-count">${errorCount}</span>`;
  } else if (warningCount > 0) {
    Constants.Panel.content.setAttribute('class', 'warnings');
    Constants.Panel.status.innerHTML = `${Lang._('WARNINGS')} <span class="panel-count" id="warning-count">${warningCount}</span>`;
  } else if (dismissCount > 0) {
    Constants.Panel.status.innerHTML = `${Lang._('DISMISSED')} <span class="panel-count">${dismissCount}</span>`;
    Constants.Panel.skipButton.classList.remove('active');
  } else {
    Constants.Panel.content.setAttribute('class', 'good');
    Constants.Panel.status.innerHTML = `${Lang._('NO_ERRORS_FOUND')}`;
  }

  // If there are no button annotations, disable the Skip-to-Toggle switch.
  const annotations = document.querySelectorAll('sa11y-annotation');
  if (annotations.length === 0) {
    Constants.Panel.skipButton.disabled = true;
  }
}

/* ************************************************************ */
/*  Update iOS style notification badge on icon.                */
/* ************************************************************ */
export function updateBadge(errorCount, warningCount) {
  const totalCount = errorCount + warningCount;
  if (totalCount === 0) {
    Constants.Panel.notifCount.innerText = '';
    Constants.Panel.notifText.innerText = '';
    Constants.Panel.notifBadge.style.display = 'none';
  } else if (warningCount > 0 && errorCount === 0) {
    Constants.Panel.notifBadge.classList.add('notification-badge-warning');
    Constants.Panel.notifCount.innerText = `${warningCount}`;
    Constants.Panel.notifText.innerText = `${Lang._('WARNINGS_FOUND')}`;
  } else {
    Constants.Panel.notifBadge.classList.remove('notification-badge-warning');
    Constants.Panel.notifCount.innerText = `${totalCount}`;
    Constants.Panel.notifText.innerText = Lang._('TOTAL_FOUND');
  }

  // Don't show badge when panel is opened.
  if (store.getItem('sa11y-panel') === 'Opened' || totalCount === 0) {
    Constants.Panel.notifBadge.style.display = 'none';
  } else {
    Constants.Panel.notifBadge.style.display = 'flex';
  }
}

/* ************************************************************ */
/*  Count number of errors and warnings on page.                */
/* ************************************************************ */
export function updateCount(results, error, warning) {
  let updatedErrorCount = error;
  let updatedWarningCount = warning;

  results.forEach((_, i) => {
    const issue = results[i].type;
    if (issue === 'error') {
      updatedErrorCount += 1;
    } else if (issue === 'warning') {
      updatedWarningCount += 1;
    }
  });

  return { error: updatedErrorCount, warning: updatedWarningCount };
}
