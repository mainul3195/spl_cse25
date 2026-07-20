(() => {
  const toggle = document.querySelector('.nav-toggle');
  const desktopNav = document.querySelector('.header-nav');
  if (!toggle || !desktopNav) return;

  const backdrop = document.createElement('div');
  backdrop.className = 'mobile-nav-backdrop';
  backdrop.setAttribute('aria-hidden', 'true');

  const drawer = document.createElement('aside');
  drawer.className = 'mobile-nav-drawer';
  drawer.id = 'mobileNavigation';
  drawer.setAttribute('role', 'dialog');
  drawer.setAttribute('aria-modal', 'true');
  drawer.setAttribute('aria-hidden', 'true');
  drawer.setAttribute('aria-label', 'Mobile navigation');

  const head = document.createElement('div');
  head.className = 'mobile-nav-head';

  const title = document.createElement('span');
  title.className = 'mobile-nav-title';
  title.textContent = 'Course navigation';

  const close = document.createElement('button');
  close.className = 'mobile-nav-close';
  close.type = 'button';
  close.setAttribute('aria-label', 'Close navigation');
  close.textContent = '×';

  const links = desktopNav.cloneNode(true);
  links.className = 'mobile-nav-links';
  links.setAttribute('aria-label', 'Mobile navigation links');

  head.append(title, close);
  drawer.append(head, links);
  document.body.append(backdrop, drawer);

  toggle.setAttribute('aria-controls', drawer.id);
  let previouslyFocused = null;

  const setOpen = open => {
    document.body.classList.toggle('mobile-nav-open', open);
    toggle.setAttribute('aria-expanded', String(open));
    toggle.setAttribute('aria-label', open ? 'Close navigation' : 'Open navigation');
    drawer.setAttribute('aria-hidden', String(!open));
    backdrop.setAttribute('aria-hidden', String(!open));
    if (open) {
      previouslyFocused = document.activeElement;
      close.focus();
    } else if (previouslyFocused instanceof HTMLElement) {
      previouslyFocused.focus();
    }
  };

  toggle.addEventListener('click', () => setOpen(toggle.getAttribute('aria-expanded') !== 'true'));
  close.addEventListener('click', () => setOpen(false));
  backdrop.addEventListener('click', () => setOpen(false));
  links.addEventListener('click', event => {
    if (event.target.closest('a')) setOpen(false);
  });
  document.addEventListener('keydown', event => {
    const isOpen = toggle.getAttribute('aria-expanded') === 'true';
    if (event.key === 'Escape' && isOpen) setOpen(false);
    if (event.key === 'Tab' && isOpen) {
      const focusable = [...drawer.querySelectorAll('button, a[href]')];
      const first = focusable[0];
      const last = focusable[focusable.length - 1];
      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    }
  });
  const desktopQuery = window.matchMedia('(min-width: 781px)');
  const handleDesktop = event => {
    if (event.matches) setOpen(false);
  };
  if (desktopQuery.addEventListener) desktopQuery.addEventListener('change', handleDesktop);
  else desktopQuery.addListener(handleDesktop);
})();
