// Main toggle functionaliy.

export default function mainToggle() {
  // Keeps checker active when navigating between pages until it is toggled off.
  const sa11yToggle = document.getElementById('sa11y-toggle');
  sa11yToggle.addEventListener('click', (e) => {
    if (localStorage.getItem('sa11y-remember-panel') === 'Opened') {
      localStorage.setItem('sa11y-remember-panel', 'Closed');
      sa11yToggle.classList.remove('sa11y-on');
      sa11yToggle.setAttribute('aria-expanded', 'false');
      this.resetAll();
      this.updateBadge();
      e.preventDefault();
    } else {
      localStorage.setItem('sa11y-remember-panel', 'Opened');
      sa11yToggle.classList.add('sa11y-on');
      sa11yToggle.setAttribute('aria-expanded', 'true');
      this.checkAll();
      // Don't show badge when panel is opened.
      document.getElementById('sa11y-notification-badge').style.display = 'none';
      e.preventDefault();
    }
  });

  // Remember to leave it open
  if (localStorage.getItem('sa11y-remember-panel') === 'Opened') {
    sa11yToggle.classList.add('sa11y-on');
    sa11yToggle.setAttribute('aria-expanded', 'true');
  }

  // Crudely give time to load any other content or slow post-rendered JS, iFrames, etc.
  if (sa11yToggle.classList.contains('sa11y-on')) {
    sa11yToggle.classList.toggle('loading-sa11y');
    sa11yToggle.setAttribute('aria-expanded', 'true');
    setTimeout(this.checkAll, 400);
  }

  document.onkeydown = (e) => {
    const evt = e || window.event;

    // Escape key to shutdown.
    let isEscape = false;
    if ('key' in evt) {
      isEscape = (evt.key === 'Escape' || evt.key === 'Esc');
    } else {
      isEscape = (evt.keyCode === 27);
    }
    if (isEscape && document.getElementById('sa11y-panel').classList.contains('sa11y-active')) {
      sa11yToggle.setAttribute('aria-expanded', 'false');
      sa11yToggle.classList.remove('sa11y-on');
      sa11yToggle.click();
      this.resetAll();
    }

    // Alt + A to enable accessibility checker.
    if (evt.altKey && evt.code === 'KeyA') {
      sa11yToggle.click();
      sa11yToggle.focus();
      evt.preventDefault();
    }
  };
}
