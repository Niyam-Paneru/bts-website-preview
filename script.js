(() => {
  const body = document.body;
  const header = document.getElementById('siteHeader');
  const menuToggle = document.getElementById('menuToggle');
  const mobileMenu = document.getElementById('mobileMenu');
  const desktopQuery = window.matchMedia('(max-width: 980px)');

  /* Header shadow after scrolling */
  const updateHeader = () => {
    if (!header) return;
    header.classList.toggle('is-scrolled', window.scrollY > 6);
  };
  updateHeader();
  window.addEventListener('scroll', updateHeader, { passive: true });

  /* Mobile menu */
  let menuOpen = false;

  const setMenu = (open, restoreFocus = false) => {
    if (!menuToggle || !mobileMenu) return;
    menuOpen = open;
    body.classList.toggle('menu-open', open);
    mobileMenu.classList.toggle('is-open', open);
    mobileMenu.setAttribute('aria-hidden', String(!open));
    menuToggle.setAttribute('aria-expanded', String(open));
    menuToggle.setAttribute('aria-label', open ? 'Close menu' : 'Open menu');

    if (open) {
      const firstLink = mobileMenu.querySelector('a');
      if (firstLink) {
        let attempts = 0;
        const focusFirstLink = () => {
          if (!menuOpen) return;
          firstLink.focus({ preventScroll: true });
          if (document.activeElement !== firstLink && attempts < 12) {
            attempts += 1;
            window.setTimeout(focusFirstLink, 30);
          }
        };
        window.setTimeout(focusFirstLink, 20);
      }
    } else if (restoreFocus) {
      menuToggle.focus();
    }
  };

  if (menuToggle && mobileMenu) {
    menuToggle.addEventListener('click', () => setMenu(!menuOpen, menuOpen));

    mobileMenu.querySelectorAll('a').forEach((link) => {
      link.addEventListener('click', () => setMenu(false));
    });

    document.addEventListener('keydown', (event) => {
      if (event.key === 'Escape' && menuOpen) {
        setMenu(false, true);
      }
    });

    desktopQuery.addEventListener('change', (event) => {
      if (!event.matches && menuOpen) setMenu(false);
    });
  }

  /* Product gallery */
  const gallery = document.querySelector('[data-gallery]');
  if (gallery) {
    const main = gallery.querySelector('[data-gallery-main]');
    const stage = gallery.querySelector('[data-gallery-stage]');
    const thumbs = [...gallery.querySelectorAll('[data-gallery-thumb]')];
    const previousButton = gallery.querySelector('[data-gallery-prev]');
    const nextButton = gallery.querySelector('[data-gallery-next]');
    let current = 0;
    let switchTimer;

    const show = (index) => {
      if (!main || !thumbs.length) return;
      const thumb = thumbs[(index + thumbs.length) % thumbs.length];
      if (!thumb) return;
      current = thumbs.indexOf(thumb);

      thumbs.forEach((item) => {
        const active = item === thumb;
        item.classList.toggle('is-active', active);
        item.setAttribute('aria-pressed', String(active));
      });

      if (stage) stage.classList.add('is-switching');
      if (switchTimer) window.clearTimeout(switchTimer);
      switchTimer = window.setTimeout(() => {
        main.src = thumb.dataset.src;
        main.alt = thumb.dataset.alt || '';
        if (thumb.dataset.width) main.width = thumb.dataset.width;
        if (thumb.dataset.height) main.height = thumb.dataset.height;
        if (stage) stage.classList.remove('is-switching');
      }, 110);
    };

    if (previousButton) previousButton.addEventListener('click', () => show(current - 1));
    if (nextButton) nextButton.addEventListener('click', () => show(current + 1));

    thumbs.forEach((thumb, index) => {
      thumb.addEventListener('click', () => show(index));
      thumb.addEventListener('keydown', (event) => {
        if (event.key === 'ArrowRight' || event.key === 'ArrowDown') {
          event.preventDefault();
          const next = (index + 1) % thumbs.length;
          thumbs[next].focus();
          show(next);
        } else if (event.key === 'ArrowLeft' || event.key === 'ArrowUp') {
          event.preventDefault();
          const previous = (index - 1 + thumbs.length) % thumbs.length;
          thumbs[previous].focus();
          show(previous);
        }
      });
    });
  }

  /* Contact form → WhatsApp */
  const form = document.getElementById('whatsappForm');
  if (form) {
    const nameField = document.getElementById('name');
    const phoneField = document.getElementById('phone');
    const topicField = document.getElementById('topic');
    const messageField = document.getElementById('message');
    const status = document.getElementById('formStatus');

    const topicLabels = {
      laptop: 'buying a laptop',
      repair: 'a repair or service',
      cctv: 'CCTV or networking',
      other: 'something else',
    };

    const requestedTopic = new URLSearchParams(window.location.search).get('topic')
      || new URLSearchParams(window.location.search).get('service');

    if (requestedTopic && topicField) {
      const alias = requestedTopic === 'buy' ? 'laptop' : requestedTopic;
      if ([...topicField.options].some((option) => option.value === alias)) {
        topicField.value = alias;
      }
    }

    form.addEventListener('submit', (event) => {
      event.preventDefault();

      if (!form.reportValidity()) return;

      const name = nameField.value.trim();
      const phone = phoneField ? phoneField.value.trim() : '';
      const topic = topicLabels[topicField.value] || 'a general enquiry';
      const note = messageField.value.trim();

      let text = `Hello BTS, my name is ${name}. I'm interested in ${topic}.`;
      if (phone) text += ` My phone number is ${phone}.`;
      text += `\n\n${note}`;

      const url = 'https://wa.me/9779868775155?text=' + encodeURIComponent(text);
      const waLink = document.createElement('a');
      waLink.href = url;
      waLink.target = '_blank';
      waLink.rel = 'noopener noreferrer';
      document.body.appendChild(waLink);
      waLink.click();
      waLink.remove();

      if (status) {
        status.textContent = 'Opening WhatsApp with your message…';
        status.classList.add('is-visible');
      }
    });
  }
})();
