import Constants from '../utils/constants';
import Lang from '../utils/lang';
import { store } from '../utils/utils';
import { State } from './state';

/* ************************************************************ */
/*  Update warning and error counts on panel.                   */
/* ************************************************************ */
export function updatePanel() {
  Constants.Panel.skipButton.disabled = false;
  Constants.Panel.panel.classList.add('active');
  Constants.Global.html.setAttribute('data-sa11y-active', 'true');
  Constants.Panel.skipButton.classList.add('active');

  if (State.counts.error > 0 && State.counts.warning > 0) {
    Constants.Panel.content.setAttribute('class', 'errors');
    Constants.Panel.status.innerHTML = `${Lang._('ERRORS')} <span class="panel-count">${State.counts.error}</span> ${Lang._('WARNINGS')} <span class="panel-count" id="warning-count">${State.counts.warning}</span>`;
  } else if (State.counts.error > 0) {
    Constants.Panel.content.setAttribute('class', 'errors');
    Constants.Panel.status.innerHTML = `${Lang._('ERRORS')} <span class="panel-count">${State.counts.error}</span>`;
  } else if (State.counts.warning > 0) {
    Constants.Panel.content.setAttribute('class', 'warnings');
    Constants.Panel.status.innerHTML = `${Lang._('WARNINGS')} <span class="panel-count" id="warning-count">${State.counts.warning}</span>`;
  } else if (State.counts.dismissed > 0) {
    Constants.Panel.status.innerHTML = `${Lang._('DISMISSED')} <span class="panel-count">${State.counts.dismissed}</span>`;
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
export function updateBadge() {
  const totalCount = State.counts.error + State.counts.warning;
  if (totalCount === 0) {
    Constants.Panel.notifCount.innerText = '';
    Constants.Panel.notifText.innerText = '';
    Constants.Panel.notifBadge.style.display = 'none';
  } else if (State.counts.warning > 0 && State.counts.error === 0) {
    Constants.Panel.notifBadge.classList.add('notification-badge-warning');
    Constants.Panel.notifCount.innerText = `${State.counts.warning}`;
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
export function updateCount() {
  State.results.forEach((_, i) => {
    const issue = State.results[i].type;
    if (issue === 'error') {
      State.counts.error += 1;
    } else if (issue === 'warning') {
      State.counts.warning += 1;
    }
  });
}

// Method: Disable toggle.
export function disabled() {
  setTimeout(() => {
    if (store.getItem('sa11y-panel') === 'Opened') {
      Constants.Panel.toggle?.click();
    }
    Constants.Panel.toggle.disabled = true;
  }, State.option.delayCheck + 10);
}

// Method: Re-arm toggle.
export function enabled() {
  if (Constants.Panel.toggle) {
    Constants.Panel.toggle.disabled = false;
  }
}
