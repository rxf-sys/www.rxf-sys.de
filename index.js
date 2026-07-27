/* =============================================================
   rxf-sys.de — IT-Service für Privatkunden · Interaktionen
   ============================================================= */

(() => {
  'use strict';

  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const $  = (s, r = document) => r.querySelector(s);
  const $$ = (s, r = document) => Array.from(r.querySelectorAll(s));

  // ============== JAHR IM FOOTER ==============
  const yearEl = $('#year');
  if (yearEl) yearEl.textContent = String(new Date().getFullYear());

  // ============== SMOOTH SCROLL FÜR ANKER ==============
  $$('a[href^="#"]').forEach((link) => {
    link.addEventListener('click', (e) => {
      const href = link.getAttribute('href');
      if (!href || href === '#') return;
      const target = document.querySelector(href);
      if (!target) return;
      e.preventDefault();
      target.scrollIntoView({ behavior: reduceMotion ? 'auto' : 'smooth', block: 'start' });
      history.replaceState(null, '', href);
    });
  });

  // ============== THEME TOGGLE ==============
  // Initiales Theme setzt das Inline-Script im <head> (verhindert Flash).
  const themeBtn = $('#themeToggle');
  function applyTheme(theme) {
    document.documentElement.dataset.theme = theme;
    try { localStorage.setItem('rxf-theme', theme); } catch (e) {}
    if (themeBtn) {
      themeBtn.innerHTML = theme === 'dark'
        ? '<i class="fas fa-sun" aria-hidden="true"></i>'
        : '<i class="fas fa-moon" aria-hidden="true"></i>';
      themeBtn.setAttribute('aria-label', theme === 'dark' ? 'Helles Theme aktivieren' : 'Dunkles Theme aktivieren');
    }
  }
  applyTheme(document.documentElement.dataset.theme || 'light');
  if (themeBtn) themeBtn.addEventListener('click', () => {
    applyTheme(document.documentElement.dataset.theme === 'dark' ? 'light' : 'dark');
  });

  // ============== STICKY TOPBAR ==============
  const topbar = $('.topbar');
  if (topbar) {
    const onScroll = () => topbar.classList.toggle('scrolled', window.scrollY > 30);
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
  }

  // ============== AKTIVE NAVIGATION ==============
  const navLinks = $$('.topbar-nav a[href^="#"]');
  const navTargets = navLinks
    .map((a) => ({ a, sec: document.querySelector(a.getAttribute('href')) }))
    .filter((t) => t.sec);
  if ('IntersectionObserver' in window && navTargets.length) {
    const no = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        navLinks.forEach((a) => a.classList.remove('active'));
        const hit = navTargets.find((t) => t.sec === entry.target);
        if (hit) hit.a.classList.add('active');
      });
    }, { rootMargin: '-40% 0px -55% 0px' });
    navTargets.forEach((t) => no.observe(t.sec));
  }

  // ============== REVEAL ON SCROLL ==============
  const revealEls = $$('.reveal');
  if (reduceMotion || !('IntersectionObserver' in window)) {
    revealEls.forEach((el) => el.classList.add('in'));
  } else {
    const io = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        entry.target.classList.add('in');
        io.unobserve(entry.target);
      });
    }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });
    revealEls.forEach((el) => io.observe(el));
  }
})();
