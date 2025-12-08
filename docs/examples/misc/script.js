document.addEventListener('DOMContentLoaded', async () => {
  try {
    const response = await fetch('./misc/nav.html');
    if (!response.ok) throw new Error('Failed to load nav.html');
    const html = await response.text();
    const header = document.querySelector('header');
    if (!header) throw new Error('<header> not found on this page.');
    header.insertAdjacentHTML('afterbegin', html);
  } catch (err) {
    console.error(err);
  }

  // Add aria-current='page'
  const links = document.querySelector('nav').querySelectorAll('a');
  let currentPath = window.location.pathname;
  currentPath = currentPath.replace(/\/+$/, '');
  if (currentPath === '/index.html' || currentPath === '') {
    currentPath = '/';
  }
  links.forEach((link) => {
    const url = new URL(link.href, window.location.origin);
    let linkPath = url.pathname.replace(/\/+$/, '');
    if (linkPath === '/index.html' || linkPath === '') {
      linkPath = '/';
    }

    if (linkPath === currentPath) {
      link.setAttribute('aria-current', 'page');
    }
  });
});
