(() => {
  const menuButton = document.getElementById('menuButton');
  const mobileNav = document.getElementById('mobileNav');

  if (menuButton && mobileNav) {
    const setMenu = (open) => {
      mobileNav.classList.toggle('open', open);
      menuButton.setAttribute('aria-expanded', String(open));
      menuButton.textContent = open ? 'Close' : 'Menu';
    };

    menuButton.addEventListener('click', () => {
      setMenu(!mobileNav.classList.contains('open'));
    });

    mobileNav.querySelectorAll('a').forEach((link) => {
      link.addEventListener('click', () => setMenu(false));
    });

    document.addEventListener('keydown', (event) => {
      if (event.key === 'Escape') setMenu(false);
    });

    const desktop = window.matchMedia('(min-width: 921px)');
    const closeOnDesktop = (event) => {
      if (event.matches) setMenu(false);
    };
    if (desktop.addEventListener) desktop.addEventListener('change', closeOnDesktop);
  }

  const rows = Array.from(document.querySelectorAll('.solution-row'));
  const image = document.getElementById('solutionImage');
  const caption = document.getElementById('solutionCaption');
  const fig = document.getElementById('solutionFig');

  if (rows.length && image && caption && fig) {
    let active = rows.find((row) => row.classList.contains('active')) || rows[0];
    let swapTimer;

    rows.forEach((row) => {
      if (row.dataset.image && row.dataset.image !== image.getAttribute('src')) {
        const preload = new Image();
        preload.src = row.dataset.image;
      }
    });

    const activate = (row) => {
      if (!row || row === active) return;
      rows.forEach((item) => item.classList.remove('active'));
      row.classList.add('active');
      active = row;
      window.clearTimeout(swapTimer);
      image.style.opacity = '0';
      swapTimer = window.setTimeout(() => {
        image.src = row.dataset.image;
        image.alt = row.dataset.alt || row.dataset.caption;
        caption.innerHTML = row.dataset.caption;
        fig.textContent = 'Fig. ' + row.dataset.fig;
        image.style.opacity = '1';
      }, 140);
    };

    rows.forEach((row) => {
      row.addEventListener('mouseenter', () => activate(row));
      row.addEventListener('focus', () => activate(row));
    });
  }

  const form = document.getElementById('contactForm');
  const serviceSelect = document.getElementById('serviceSelect');

  if (form && serviceSelect) {
    const requestedService = new URLSearchParams(window.location.search).get('service');
    if (requestedService) {
      const match = Array.from(serviceSelect.options).find((option) => option.value === requestedService);
      if (match) serviceSelect.value = match.value;
    }

    const status = document.getElementById('formStatus');

    form.addEventListener('submit', (event) => {
      event.preventDefault();

      const data = new FormData(form);
      const name = String(data.get('name') || '').trim();
      const phone = String(data.get('phone') || '').trim();
      const email = String(data.get('email') || '').trim();
      const message = String(data.get('message') || '').trim();
      const selected = serviceSelect.options[serviceSelect.selectedIndex];
      const service = selected ? selected.textContent.trim() : 'General enquiry';

      if (!name || !phone || !message) {
        if (status) status.textContent = 'Please complete your name, phone and message.';
        return;
      }

      const lines = [
        'Hello BTS,',
        '',
        'I would like to enquire about: ' + service + '.',
        '',
        'Name: ' + name,
        'Phone: ' + phone,
      ];

      if (email) lines.push('Email: ' + email);
      lines.push('', 'Message:', message);

      const url = 'https://wa.me/9779868775155?text=' + encodeURIComponent(lines.join('\n'));
      if (status) status.textContent = 'Opening WhatsApp with your message…';

      const opened = window.open(url, '_blank');
      if (opened) {
        opened.opener = null;
      } else {
        window.location.href = url;
      }
    });
  }
})();
