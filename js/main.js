/* ============================================================
   Smiling Walls — Main JavaScript
   ============================================================ */

// ---------- Navbar: Scroll shadow + Active link ----------
(function () {
  const navbar = document.querySelector('.navbar');
  const hamburger = document.querySelector('.hamburger');
  const mobileMenu = document.querySelector('.mobile-menu');

  // Scroll-based shadow
  window.addEventListener('scroll', () => {
    if (navbar) {
      navbar.classList.toggle('scrolled', window.scrollY > 20);
    }
  });

  // Hamburger toggle
  if (hamburger && mobileMenu) {
    hamburger.addEventListener('click', () => {
      hamburger.classList.toggle('open');
      mobileMenu.classList.toggle('open');
      const expanded = hamburger.classList.contains('open');
      hamburger.setAttribute('aria-expanded', expanded);
    });

    // Close mobile menu on link click
    mobileMenu.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => {
        hamburger.classList.remove('open');
        mobileMenu.classList.remove('open');
        hamburger.setAttribute('aria-expanded', false);
      });
    });
  }

  // Mark active nav link
  const currentPath = window.location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('.nav-links a, .mobile-menu a').forEach(link => {
    const href = link.getAttribute('href');
    if (href === currentPath || (currentPath === '' && href === 'index.html')) {
      link.classList.add('active');
    }
  });
})();


// ---------- Intersection Observer: Animate on scroll ----------
(function () {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
      }
    });
  }, { threshold: 0.12 });

  document.querySelectorAll('.animate-up').forEach(el => observer.observe(el));
})();


// ---------- FAQ Accordion ----------
(function () {
  document.querySelectorAll('.faq-question').forEach(btn => {
    btn.addEventListener('click', () => {
      const item = btn.closest('.faq-item');
      const isOpen = item.classList.contains('open');

      // Close all
      document.querySelectorAll('.faq-item').forEach(i => i.classList.remove('open'));

      // Open clicked (if it was closed)
      if (!isOpen) item.classList.add('open');
    });
  });
})();


// ---------- Gallery Lightbox ----------
(function () {
  const lightbox = document.getElementById('lightbox');
  if (!lightbox) return;

  const lbImg = lightbox.querySelector('.lightbox-img');
  const lbClose = lightbox.querySelector('.lightbox-close');

  document.querySelectorAll('.gallery-item').forEach(item => {
    item.addEventListener('click', () => {
      const emoji = item.dataset.emoji || '🎉';
      const label = item.dataset.label || 'Gallery Image';
      lbImg.textContent = emoji;
      lbImg.setAttribute('aria-label', label);
      lightbox.classList.add('open');
      document.body.style.overflow = 'hidden';
      lbClose.focus();
    });
  });

  const closeLightbox = () => {
    lightbox.classList.remove('open');
    document.body.style.overflow = '';
  };

  lbClose.addEventListener('click', closeLightbox);
  lightbox.addEventListener('click', e => {
    if (e.target === lightbox) closeLightbox();
  });

  document.addEventListener('keydown', e => {
    if (e.key === 'Escape') closeLightbox();
  });
})();


// ---------- Contact Form ----------
(function () {
  const form = document.getElementById('contact-form');
  if (!form) return;

  form.addEventListener('submit', e => {
    e.preventDefault();

    const btn = form.querySelector('[type="submit"]');
    btn.textContent = 'Sending...';
    btn.disabled = true;

    // Simulate async submit (replace with real fetch/AJAX call)
    setTimeout(() => {
      form.reset();
      btn.textContent = 'Send Message';
      btn.disabled = false;

      const success = document.getElementById('form-success');
      if (success) {
        success.style.display = 'block';
        setTimeout(() => { success.style.display = 'none'; }, 5000);
      }
    }, 1200);
  });
})();


// ---------- Confetti Dots (Hero) ----------
(function () {
  const container = document.querySelector('.hero-confetti');
  if (!container) return;

  const colors = ['#FF6B9D', '#FFD93D', '#C77DFF', '#4CC9F0', '#6BCB77', '#FF9A3C'];
  const sizes = [8, 12, 16, 10, 14];

  for (let i = 0; i < 18; i++) {
    const dot = document.createElement('div');
    dot.className = 'confetti-dot';
    const size = sizes[Math.floor(Math.random() * sizes.length)];
    dot.style.cssText = `
      width: ${size}px;
      height: ${size}px;
      background: ${colors[Math.floor(Math.random() * colors.length)]};
      top: ${Math.random() * 90}%;
      left: ${Math.random() * 95}%;
      opacity: ${0.3 + Math.random() * 0.4};
      animation-delay: ${Math.random() * 4}s;
      animation-duration: ${4 + Math.random() * 4}s;
    `;
    container.appendChild(dot);
  }
})();

// Whatsapp
const wa = document.querySelector('.whatsapp-float');
if (wa) {
  wa.addEventListener('click', () => {
    if (typeof gtag === 'function') gtag('event', 'whatsapp_click', { 'event_category': 'engagement', 'event_label': 'Floating Button' });
  });
}

