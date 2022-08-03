// ============================================================
// Update iOS style notification badge on icon.
// ============================================================
import Lang from '../components/translation';

export default function updateBadge() {
  const totalCount = Sa11y.errorCount + Sa11y.warningCount;
  const { warningCount } = Sa11y;
  const notifBadge = document.getElementById('sa11y-notification-badge');
  const notifCount = document.getElementById('sa11y-notification-count');
  const notifText = document.getElementById('sa11y-notification-text');

  if (totalCount === 0) {
    notifBadge.style.display = 'none';
  } else if (Sa11y.warningCount > 0 && Sa11y.errorCount === 0) {
    notifBadge.style.display = 'flex';
    notifBadge.classList.add('sa11y-notification-badge-warning');
    notifCount.innerText = `${warningCount}`;
    notifText.innerText = `${Lang._('PANEL_ICON_WARNINGS')}`;
  } else {
    notifBadge.style.display = 'flex';
    notifBadge.classList.remove('sa11y-notification-badge-warning');
    notifCount.innerText = `${totalCount}`;
    notifText.innerText = Lang._('PANEL_ICON_TOTAL');
  }
};