import Constants from '../utils/constants';
import { store } from '../utils/utils';

export default function mainToggle(checkAll, resetAll) {
  // Keeps checker active when navigating between pages until it is toggled off.
  Constants.Panel.toggle.addEventListener('click', (e) => {
    if (store.getItem('sa11y-remember-panel') === 'Opened') {
      e.preventDefault();
      store.setItem('sa11y-remember-panel', 'Closed');
      Constants.Panel.toggle.classList.remove('on');
      Constants.Panel.toggle.setAttribute('aria-expanded', 'false');
      resetAll();

      if (Constants.Panel.notifCount.innerHTML.trim() === '') {
        Constants.Panel.notifBadge.style.display = 'none';
      } else {
        Constants.Panel.notifBadge.style.display = 'flex';
      }
    } else {
      e.preventDefault();
      store.setItem('sa11y-remember-panel', 'Opened');
      Constants.Panel.toggle.classList.add('on');
      Constants.Panel.toggle.setAttribute('aria-expanded', 'true');
      checkAll();
    }
  });

  // Remember to leave it open
  if (store.getItem('sa11y-remember-panel') === 'Opened') {
    Constants.Panel.toggle.classList.add('on');
    Constants.Panel.toggle.setAttribute('aria-expanded', 'true');
    Constants.Panel.panel.style.transform = '';
  }

  document.onkeydown = (e) => {
    const evt = e || window.event;
    if (evt.key === 'Escape' && Constants.Panel.panel.classList.contains('active')) {
      Constants.Panel.toggle.setAttribute('aria-expanded', 'false');
      Constants.Panel.toggle.classList.remove('on');
      Constants.Panel.toggle.click();
      resetAll();
    }

    // Alt + A to enable accessibility checker.
    if (evt.altKey && evt.code === 'KeyA') {
      Constants.Panel.toggle.click();
      Constants.Panel.toggle.focus();
      evt.preventDefault();
    }
  };
}
