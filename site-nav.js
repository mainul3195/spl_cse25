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

(() => {
  const button = document.createElement('button');
  button.className = 'back-to-top';
  button.type = 'button';
  button.title = 'Back to top';
  button.setAttribute('aria-label', 'Back to top');
  button.innerHTML = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M12 19V5M5 12l7-7 7 7"/></svg>';
  document.body.append(button);

  const reduced = window.matchMedia('(prefers-reduced-motion: reduce)');
  let ticking = false;

  const update = () => {
    button.classList.toggle('is-visible', window.scrollY > 400);
    ticking = false;
  };

  window.addEventListener('scroll', () => {
    if (ticking) return;
    ticking = true;
    window.requestAnimationFrame(update);
  }, { passive: true });

  button.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: reduced.matches ? 'instant' : 'smooth' });
    const heading = document.querySelector('h1');
    if (heading) {
      heading.setAttribute('tabindex', '-1');
      heading.focus({ preventScroll: true });
    }
  });

  update();
})();
