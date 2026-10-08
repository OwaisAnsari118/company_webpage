/**
 * PINEAPPLIX — Main JavaScript
 * Handles: navbar, mobile menu, scroll reveal, docs tabs,
 *          roadmap expand, contact form, section indicator.
 */

'use strict';

/* ─────────────────────────────────────────────
   Utilities
───────────────────────────────────────────── */
const $ = (sel, ctx = document) => ctx.querySelector(sel);
const $$ = (sel, ctx = document) => [...ctx.querySelectorAll(sel)];

const prefersReducedMotion = () =>
  window.matchMedia('(prefers-reduced-motion: reduce)').matches;

/* ─────────────────────────────────────────────
   1. NAVBAR — scroll state
───────────────────────────────────────────── */
function initNavbar() {
  const nav = $('#navbar');
  if (!nav) return;

  const update = () => {
    if (window.scrollY > 12) {
      nav.classList.add('nav--scrolled');
    } else {
      nav.classList.remove('nav--scrolled');
    }
  };

  window.addEventListener('scroll', update, { passive: true });
  update(); // run once on load
}

/* ─────────────────────────────────────────────
   2. MOBILE MENU
───────────────────────────────────────────── */
function initMobileMenu() {
  const hamburger = $('#hamburger');
  const menu      = $('#mobile-menu');
  if (!hamburger || !menu) return;

  const toggle = () => {
    const open = menu.classList.toggle('open');
    hamburger.classList.toggle('active', open);
    hamburger.setAttribute('aria-expanded', String(open));
    document.body.style.overflow = open ? 'hidden' : '';
  };

  const close = () => {
    menu.classList.remove('open');
    hamburger.classList.remove('active');
    hamburger.setAttribute('aria-expanded', 'false');
    document.body.style.overflow = '';
  };

  hamburger.addEventListener('click', toggle);

  // Close when a link is tapped
  $$('.nav__mobile-link', menu).forEach(link =>
    link.addEventListener('click', close)
  );

  // Close on backdrop click (outside menu)
  document.addEventListener('click', e => {
    if (
      menu.classList.contains('open') &&
      !menu.contains(e.target) &&
      !hamburger.contains(e.target)
    ) {
      close();
    }
  });

  // Close on Escape
  document.addEventListener('keydown', e => {
    if (e.key === 'Escape' && menu.classList.contains('open')) close();
  });
}

/* ─────────────────────────────────────────────
   3. SCROLL REVEAL
───────────────────────────────────────────── */
function initScrollReveal() {
  if (prefersReducedMotion()) {
    // Immediately mark all as revealed
    $$('.reveal').forEach(el => el.classList.add('revealed'));
    return;
  }

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('revealed');
          observer.unobserve(entry.target); // fire once
        }
      });
    },
    { threshold: 0.12, rootMargin: '0px 0px -40px 0px' }
  );

  $$('.reveal').forEach(el => observer.observe(el));
}

/* ─────────────────────────────────────────────
   4. DOCUMENTATION TABS
───────────────────────────────────────────── */
function initDocsTabs() {
  const sidebar = $('#docs-sidebar');
  if (!sidebar) return;

  const links  = $$('.docs-sidebar-link', sidebar);
  const panels = $$('.docs-content-panel');

  const activate = (targetPanel) => {
    // Deactivate all
    links.forEach(l => {
      l.classList.remove('active');
      l.setAttribute('aria-selected', 'false');
    });
    panels.forEach(p => {
      p.classList.remove('active');
      p.setAttribute('hidden', '');
    });

    // Activate target
    const activeLink = links.find(l => l.dataset.panel === targetPanel);
    const activePanel = $(`#panel-${targetPanel}`);

    if (activeLink) {
      activeLink.classList.add('active');
      activeLink.setAttribute('aria-selected', 'true');
    }
    if (activePanel) {
      activePanel.classList.add('active');
      activePanel.removeAttribute('hidden');
    }
  };

  links.forEach(link => {
    link.setAttribute('role', 'tab');
    link.setAttribute('aria-selected', link.classList.contains('active') ? 'true' : 'false');

    link.addEventListener('click', () => {
      activate(link.dataset.panel);
    });

    // Keyboard navigation within the tab list
    link.addEventListener('keydown', e => {
      if (e.key === 'ArrowDown') {
        e.preventDefault();
        const next = link.parentElement.nextElementSibling?.querySelector('button');
        if (next) next.focus();
      }
      if (e.key === 'ArrowUp') {
        e.preventDefault();
        const prev = link.parentElement.previousElementSibling?.querySelector('button');
        if (prev) prev.focus();
      }
    });
  });

  // Initialize: hide non-active panels from AT
  panels.forEach(p => {
    if (!p.classList.contains('active')) p.setAttribute('hidden', '');
  });
}

/* ─────────────────────────────────────────────
   5. ROADMAP — expand on hover/focus/click
───────────────────────────────────────────── */
function initRoadmap() {
  const items = $$('.roadmap-item');

  items.forEach(item => {
    const detail = item.querySelector('.roadmap-item__detail');
    if (!detail) return;

    const expand = () => {
      item.classList.add('expanded');
      item.setAttribute('aria-expanded', 'true');
    };
    const collapse = () => {
      item.classList.remove('expanded');
      item.setAttribute('aria-expanded', 'false');
    };

    item.addEventListener('mouseenter', expand);
    item.addEventListener('mouseleave', collapse);
    item.addEventListener('focus', expand);
    item.addEventListener('blur', collapse);
    item.addEventListener('click', () => {
      if (item.classList.contains('expanded')) {
        collapse();
      } else {
        expand();
      }
    });

    item.addEventListener('keydown', e => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        item.classList.toggle('expanded');
        item.setAttribute('aria-expanded', item.classList.contains('expanded') ? 'true' : 'false');
      }
    });
  });
}

/* ─────────────────────────────────────────────
   6. HERO SVG — animated signal dots
───────────────────────────────────────────── */
function initHeroSignals() {
  if (prefersReducedMotion()) return;

  const svg = $('#hero-svg');
  if (!svg) return;

  // Define the signal paths (matching the SVG structure)
  const paths = [
    { d: 'M 130 75 L 175 75', color: 'rgba(91,141,222,0.9)', duration: 2800 },
    { d: 'M 300 75 L 345 75', color: 'rgba(91,141,222,0.9)', duration: 2800, delay: 800 },
    { d: 'M 240 100 L 240 145', color: 'rgba(91,141,222,0.8)', duration: 2500, delay: 400 },
    { d: 'M 240 230 L 240 265', color: 'rgba(200,148,58,0.9)', duration: 2500, delay: 1200 },
  ];

  const NS = 'http://www.w3.org/2000/svg';

  paths.forEach(({ d, color, duration, delay = 0 }) => {
    // Create signal dot
    const dot = document.createElementNS(NS, 'circle');
    dot.setAttribute('r', '3');
    dot.setAttribute('fill', color);
    dot.style.opacity = '0';

    svg.appendChild(dot);

    // Parse path to get start/end positions (simple line segments)
    const parts = d.replace(/[MLH]/g, '').trim().split(/\s+/);
    const coords = parts.map(Number).filter(n => !isNaN(n));
    if (coords.length < 4) return;

    const [x1, y1, x2, y2] = coords;
    const dx = x2 - x1;
    const dy = y2 - y1;

    let start = null;

    const animate = (timestamp) => {
      if (!start) start = timestamp + delay;
      const elapsed = timestamp - start;

      if (elapsed < 0) {
        requestAnimationFrame(animate);
        return;
      }

      const progress = (elapsed % duration) / duration;
      const ease = progress < 0.5
        ? 2 * progress * progress
        : -1 + (4 - 2 * progress) * progress;

      const t = Math.max(0, Math.min(1, ease));

      dot.setAttribute('cx', x1 + dx * t);
      dot.setAttribute('cy', y1 + dy * t);

      // Fade in and out
      const fade = t < 0.1 ? t / 0.1 : t > 0.9 ? (1 - t) / 0.1 : 1;
      dot.style.opacity = (fade * 0.85).toFixed(3);

      requestAnimationFrame(animate);
    };

    requestAnimationFrame(animate);
  });
}

/* ─────────────────────────────────────────────
   7. ARCHITECTURE DIAGRAM — animate on scroll
───────────────────────────────────────────── */
function initArchDiagram() {
  if (prefersReducedMotion()) return;

  const diagram = $('.arch__diagram');
  if (!diagram) return;

  const connectors = $$('.arch__branch-connector.animated', diagram);

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          // Stagger connector animations
          connectors.forEach((conn, i) => {
            conn.style.animationDelay = `${i * 0.8}s`;
          });
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.3 }
  );

  observer.observe(diagram);
}

/* ─────────────────────────────────────────────
   8. SECTION INDICATOR (desktop only)
───────────────────────────────────────────── */
function initSectionIndicator() {
  const sections = [
    { id: 'hero',          label: 'Hero' },
    { id: 'philosophy',    label: 'Philosophy' },
    { id: 'products',      label: 'Products' },
    { id: 'architecture',  label: 'Architecture' },
    { id: 'technology',    label: 'Technology' },
    { id: 'documentation', label: 'Documentation' },
    { id: 'resources',     label: 'Resources' },
    { id: 'roadmap',       label: 'Roadmap' },
    { id: 'why',           label: 'Why' },
    { id: 'about',         label: 'About' },
    { id: 'contact',       label: 'Contact' },
  ];

  const indicator = document.createElement('nav');
  indicator.className = 'section-indicator';
  indicator.setAttribute('aria-label', 'Page sections');
  document.body.appendChild(indicator);

  const dots = sections.map(({ id, label }) => {
    const el = document.querySelector(`#${id}`);
    if (!el) return null;

    const dot = document.createElement('button');
    dot.className = 'section-indicator__dot';
    dot.setAttribute('aria-label', `Go to ${label}`);
    dot.title = label;
    dot.addEventListener('click', () => {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    });
    indicator.appendChild(dot);
    return { dot, el };
  }).filter(Boolean);

  // Show indicator after scrolling past hero
  const updateIndicator = () => {
    const scrollY = window.scrollY;
    const heroHeight = document.querySelector('#hero')?.offsetHeight ?? 600;

    if (scrollY > heroHeight * 0.5) {
      indicator.classList.add('visible');
    } else {
      indicator.classList.remove('visible');
    }

    // Determine active section
    let active = 0;
    dots.forEach(({ el }, i) => {
      const rect = el.getBoundingClientRect();
      if (rect.top <= window.innerHeight * 0.4) {
        active = i;
      }
    });

    dots.forEach(({ dot }, i) => {
      dot.classList.toggle('active', i === active);
    });
  };

  window.addEventListener('scroll', updateIndicator, { passive: true });
  updateIndicator();
}

/* ─────────────────────────────────────────────
   9. CONTACT FORM
───────────────────────────────────────────── */
function initContactForm() {
  const form    = $('#contact-form');
  const success = $('#form-success');
  if (!form) return;

  const showError = (input, msg) => {
    input.style.borderColor = 'rgba(208, 90, 90, 0.6)';
    input.setAttribute('aria-invalid', 'true');
    let err = input.parentElement.querySelector('.form-error');
    if (!err) {
      err = document.createElement('span');
      err.className = 'form-error';
      err.style.cssText = `
        display: block;
        font-family: var(--font-mono);
        font-size: 0.625rem;
        color: #d05a5a;
        margin-top: 4px;
        letter-spacing: 0.06em;
      `;
      input.parentElement.appendChild(err);
    }
    err.textContent = msg;
  };

  const clearError = (input) => {
    input.style.borderColor = '';
    input.removeAttribute('aria-invalid');
    const err = input.parentElement.querySelector('.form-error');
    if (err) err.remove();
  };

  const validate = () => {
    let valid = true;

    const name  = $('#contact-name');
    const email = $('#contact-email');

    if (!name.value.trim()) {
      showError(name, 'NAME REQUIRED');
      valid = false;
    } else {
      clearError(name);
    }

    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email.value.trim()) {
      showError(email, 'EMAIL REQUIRED');
      valid = false;
    } else if (!emailPattern.test(email.value)) {
      showError(email, 'INVALID EMAIL ADDRESS');
      valid = false;
    } else {
      clearError(email);
    }

    return valid;
  };

  // Live clear errors on input
  ['#contact-name', '#contact-email'].forEach(sel => {
    const el = $(sel);
    if (el) el.addEventListener('input', () => clearError(el));
  });

  form.addEventListener('submit', async (e) => {
    e.preventDefault();

    if (!validate()) return;

    const btn = $('#contact-submit-btn');
    const originalText = btn.innerHTML;

    btn.disabled = true;
    btn.innerHTML = `<span style="font-family:var(--font-mono); font-size:0.75rem; letter-spacing:0.08em;">SENDING...</span>`;

    // Simulate async submission (replace with actual endpoint)
    await new Promise(r => setTimeout(r, 1200));

    form.style.display = 'none';
    if (success) {
      success.classList.add('visible');
    }

    // NOTE: To connect to a real backend, replace the timeout above with:
    //   const res = await fetch('/api/contact', {
    //     method: 'POST',
    //     headers: { 'Content-Type': 'application/json' },
    //     body: JSON.stringify(Object.fromEntries(new FormData(form)))
    //   });
    //   if (!res.ok) { /* handle error */ }
  });
}

/* ─────────────────────────────────────────────
   10. SMOOTH SCROLL — internal anchor links
───────────────────────────────────────────── */
function initSmoothScroll() {
  document.addEventListener('click', e => {
    const link = e.target.closest('a[href^="#"]');
    if (!link) return;

    const targetId = link.getAttribute('href').slice(1);
    const target   = document.getElementById(targetId);
    if (!target) return;

    e.preventDefault();

    const navHeight = parseInt(
      getComputedStyle(document.documentElement).getPropertyValue('--nav-height'),
      10
    ) || 68;

    const top = target.getBoundingClientRect().top + window.scrollY - navHeight - 8;

    window.scrollTo({
      top: Math.max(0, top),
      behavior: prefersReducedMotion() ? 'instant' : 'smooth',
    });
  });
}

/* ─────────────────────────────────────────────
   11. PRODUCT CARD TILT (subtle, desktop only)
───────────────────────────────────────────── */
function initCardTilt() {
  if (prefersReducedMotion()) return;
  if (window.matchMedia('(hover: none)').matches) return; // skip touch devices

  const cards = $$('.product-card:not(.product-card--future):not(.product-card--wide)');

  cards.forEach(card => {
    card.addEventListener('mousemove', e => {
      const rect   = card.getBoundingClientRect();
      const x      = (e.clientX - rect.left) / rect.width  - 0.5;
      const y      = (e.clientY - rect.top)  / rect.height - 0.5;
      const rX     = -(y * 4).toFixed(2);
      const rY     =  (x * 4).toFixed(2);
      card.style.transform = `translateY(-2px) rotateX(${rX}deg) rotateY(${rY}deg)`;
    });

    card.addEventListener('mouseleave', () => {
      card.style.transform = '';
    });
  });
}

/* ─────────────────────────────────────────────
   12. TECH LIST REVEAL — stagger on enter
───────────────────────────────────────────── */
function initTechCards() {
  if (prefersReducedMotion()) return;

  const cards = $$('.tech-card');

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach(entry => {
        if (!entry.isIntersecting) return;

        const items = $$('.tech-list li', entry.target);
        items.forEach((item, i) => {
          item.style.opacity = '0';
          item.style.transform = 'translateX(-8px)';
          item.style.transition = `opacity 300ms ease ${i * 60}ms, transform 300ms ease ${i * 60}ms`;

          // Force reflow
          void item.offsetWidth;

          item.style.opacity = '';
          item.style.transform = '';
        });

        observer.unobserve(entry.target);
      });
    },
    { threshold: 0.3 }
  );

  cards.forEach(c => observer.observe(c));
}

/* ─────────────────────────────────────────────
   13. HERO META ITEMS — stagger in
───────────────────────────────────────────── */
function initHeroMeta() {
  if (prefersReducedMotion()) return;

  const items = $$('.hero__meta-item');
  items.forEach((item, i) => {
    item.style.opacity = '0';
    item.style.transform = 'translateY(8px)';
    item.style.transition = `opacity 400ms ease ${300 + i * 80}ms, transform 400ms ease ${300 + i * 80}ms`;

    // After next frame render
    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        item.style.opacity = '';
        item.style.transform = '';
      });
    });
  });
}

/* ─────────────────────────────────────────────
   14. BUTTON RIPPLE
───────────────────────────────────────────── */
function initRipple() {
  if (prefersReducedMotion()) return;

  document.addEventListener('click', e => {
    const btn = e.target.closest('.btn--primary');
    if (!btn) return;

    const ripple = document.createElement('span');
    const rect   = btn.getBoundingClientRect();

    ripple.style.cssText = `
      position: absolute;
      border-radius: 50%;
      background: rgba(255,255,255,0.25);
      pointer-events: none;
      transform: scale(0);
      animation: ripple-expand 500ms ease forwards;
      left: ${e.clientX - rect.left - 20}px;
      top: ${e.clientY - rect.top - 20}px;
      width: 40px;
      height: 40px;
    `;

    btn.style.position = 'relative';
    btn.style.overflow = 'hidden';
    btn.appendChild(ripple);

    ripple.addEventListener('animationend', () => ripple.remove());
  });

  // Inject the keyframe
  const style = document.createElement('style');
  style.textContent = `@keyframes ripple-expand { to { transform: scale(6); opacity: 0; } }`;
  document.head.appendChild(style);
}

/* ─────────────────────────────────────────────
   15. ACTIVE NAV LINK on scroll
───────────────────────────────────────────── */
function initActiveNavLink() {
  const navLinks = $$('.nav__link');
  const sectionIds = navLinks.map(l => l.getAttribute('href')?.replace('#', '')).filter(Boolean);

  const update = () => {
    let active = null;
    sectionIds.forEach(id => {
      const el = document.getElementById(id);
      if (!el) return;
      const rect = el.getBoundingClientRect();
      if (rect.top <= 80) active = id;
    });

    navLinks.forEach(link => {
      const href = link.getAttribute('href')?.replace('#', '');
      link.classList.toggle('nav__link--active', href === active);
      link.style.color = href === active ? 'var(--text-primary)' : '';
    });
  };

  window.addEventListener('scroll', update, { passive: true });
}

/* ─────────────────────────────────────────────
   INIT — Run everything on DOM ready
───────────────────────────────────────────── */
document.addEventListener('DOMContentLoaded', () => {
  initNavbar();
  initMobileMenu();
  initScrollReveal();
  initDocsTabs();
  initRoadmap();
  initHeroSignals();
  initArchDiagram();
  initSectionIndicator();
  initContactForm();
  initSmoothScroll();
  initCardTilt();
  initTechCards();
  initHeroMeta();
  initRipple();
  initActiveNavLink();
});

/* ─────────────────────────────────────────────
   Export for potential module use
───────────────────────────────────────────── */
if (typeof module !== 'undefined' && module.exports) {
  module.exports = {};
}
