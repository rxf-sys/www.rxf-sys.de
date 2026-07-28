/* =============================================================
   rxf-sys.de — IT-Service für Privatkunden · Interaktionen
   Theme, Sprache (DE/EN), Mobil-Menü, Reveal, aktive Navigation.
   Vanilla JS, kein Build-Schritt.
   ============================================================= */

(() => {
  'use strict';

  /* ============== ÜBERSETZUNGEN (EN) ============== */
  const EN = {
    'skip': 'Skip to content',

    'nav.services': 'Services', 'nav.process': 'How it works', 'nav.pricing': 'Pricing',
    'nav.about': 'About me', 'nav.faq': 'FAQ', 'nav.cta': 'Get in touch',

    'hero.eyebrow': 'IT support for private customers · Dormagen & surroundings',
    'hero.title': 'Computer trouble?<br />I&rsquo;ll <span class="accent-underline">sort it out</span>.',
    'hero.lede': 'Hi, I&rsquo;m <strong>Robin Frank</strong> — an IT specialist based in Dormagen. I help you with anything around your PC, Wi-Fi, smartphone and smart home: patiently, explained in plain language and fairly billed. At your home or conveniently by remote support.',
    'hero.m1': 'On site in <strong>Dormagen &amp; surroundings</strong>',
    'hero.m2': '<strong>Remote support</strong> Germany-wide',
    'hero.m3': '<strong>€39</strong> per hour — transparent',
    'hero.m4': 'Usually a reply within <strong>24 h</strong>',

    's1.title': 'How I can help', 's1.kicker': 'Everything for private customers',
    'svc1.title': 'PC &amp; laptop support',
    'svc1.desc': 'Your computer is acting up, running slow or needs setting up? I&rsquo;ll get it back in shape.',
    'svc1.l1': 'Setting up new PCs &amp; laptops',
    'svc1.l2': 'Windows problems &amp; error messages',
    'svc1.l3': 'Upgrades (SSD, memory)',
    'svc1.l4': 'Virus &amp; malware removal',
    'svc1.l5': 'Data transfer &amp; backups',

    'svc2.title': 'Wi-Fi &amp; home network',
    'svc2.desc': 'No more dead spots and dropped connections — stable internet in every room.',
    'svc2.l1': 'Router setup (e.g. FRITZ!Box)',
    'svc2.l2': 'Wi-Fi throughout the house (mesh, repeaters)',
    'svc2.l3': 'Finding &amp; fixing network problems',
    'svc2.l4': 'Secure configuration &amp; guest network',
    'svc2.l5': 'Moving to a new internet connection',

    'svc3.title': 'Smart home &amp; devices',
    'svc3.desc': 'From the printer to the smart bulb — I set your devices up and make them work together.',
    'svc3.l1': 'Printers, smart TVs &amp; streaming',
    'svc3.l2': 'Setting up smartphones &amp; tablets',
    'svc3.l3': 'Smart bulbs, plugs, heating',
    'svc3.l4': 'Voice assistants &amp; automations',
    'svc3.l5': 'Network storage (NAS) for photos &amp; more',

    'svc4.title': 'Remote support',
    'svc4.desc': 'Many problems can be solved without an appointment: I connect securely to your screen — and you watch live.',
    'svc4.l1': 'Help without a call-out — often the same day',
    'svc4.l2': 'Connection only with your consent',
    'svc4.l3': 'You see every step live',
    'svc4.l4': 'After the session access ends automatically',
    'svc4.l5': 'Available Germany-wide',

    's2.title': 'How it works', 's2.kicker': 'In three simple steps',
    'step1.title': 'Get in touch',
    'step1.desc': 'Send me an e-mail or give me a call. Briefly describe what&rsquo;s wrong — no technical terms needed.',
    'step2.title': 'Free initial assessment',
    'step2.desc': 'I get back to you promptly and tell you honestly whether and how the problem can be solved — remotely or on site — and we arrange an appointment.',
    'step3.title': 'Fix &amp; fair billing',
    'step3.desc': 'I solve the problem and explain in plain language what was done. You only pay for the time actually worked.',

    's3.title': 'Pricing', 's3.kicker': 'Transparent, no surprises',
    'price.label': 'On site &amp; remote', 'price.per': 'per hour',
    'price.note': 'Final price — under § 19 of the German VAT Act (small business rule) no VAT is charged.',
    'price.l1': '<strong>Free initial assessment by phone</strong> — you know where you stand beforehand',
    'price.l2': 'After the first hour billed in <strong>15-minute increments</strong>',
    'price.l3': '<strong>Travel within Dormagen included</strong> — surrounding areas by arrangement',
    'price.l4': '<strong>Flat rates on request</strong> — for larger jobs (e.g. a complete new setup) I&rsquo;m happy to quote a fixed price upfront',
    'price.l5': 'Invoice by e-mail — payment by bank transfer or cash on site',

    's4.title': 'Who is helping you', 's4.kicker': 'No call centre — one contact person',
    'about.p1': 'I&rsquo;m a trained <strong>IT specialist for application development</strong> and work as an IT system administrator. Since 2022 I have also run my own server infrastructure — technology is not just my job, it&rsquo;s my passion.',
    'about.p2': 'With me you get no jargon-filled lectures and no hidden costs: I explain what I&rsquo;m doing in plain language, only recommend what you actually need, and you have the same contact person before, during and after the appointment.',
    'about.link': 'More about my background and projects: <a href="https://portfolio.rxf-sys.de/" target="_blank" rel="noopener noreferrer">portfolio.rxf-sys.de <i class="fas fa-arrow-up-right-from-square" aria-hidden="true"></i></a>',
    'fact1': '<strong>Trained IT specialist</strong><br />Application development (IHK)',
    'fact2': '<strong>IT system administrator</strong><br />hands-on every day',
    'fact3': '<strong>Explained clearly</strong><br />patiently &amp; without jargon',
    'fact4': '<strong>Discreet &amp; careful</strong><br />your data stays your data',

    's5.title': 'Frequently asked questions', 's5.kicker': 'Answered briefly &amp; honestly',
    'faq1.q': 'Which areas do you cover?',
    'faq1.a': 'I offer on-site appointments in <strong>Dormagen and the surrounding area</strong> — including Neuss, Grevenbroich, Rommerskirchen and the outskirts of Cologne and Düsseldorf. Via <strong>remote support</strong> I help throughout Germany.',
    'faq2.q': 'How does remote support work — is it safe?',
    'faq2.a': 'You download a small program and tell me the code it displays — only then can I connect. You see live the whole time what is happening on your screen and can end the connection at any moment. After the session I no longer have any access to your computer.',
    'faq3.q': 'What will it cost me in total?',
    'faq3.a': 'The initial assessment by phone is free. After that: <strong>€39 per hour</strong>, billed in 15-minute increments after the first hour. Most typical jobs (e.g. setting up a printer, fixing a Wi-Fi problem) are done in one to two hours. For larger jobs I&rsquo;m happy to quote a flat rate upfront.',
    'faq4.q': 'When are appointments possible?',
    'faq4.a': 'We arrange appointments flexibly — usually afternoons, evenings and at weekends. Remote sessions can often be set up at short notice.',
    'faq5.q': 'What happens to my data?',
    'faq5.a': 'Your data stays on your devices — I copy nothing without explicit agreement (for an agreed backup, for example). Everything I see while working is of course treated confidentially.',
    'faq6.q': 'What if the problem cannot be solved?',
    'faq6.a': 'Honesty first: if I can already see during the initial assessment that something cannot be solved, or not economically (a hardware defect where a repair isn&rsquo;t worth it, for example), I tell you openly — before any costs arise.',

    'contact.eyebrow': 'Contact',
    'contact.head': 'Tell me <span class="accent-text">what&rsquo;s wrong</span>.',
    'contact.lede': 'Drop me a short message about what&rsquo;s going on — I usually get back to you within 24 hours with an honest initial assessment. No obligation, free of charge.',
    'ci1.label': 'Service area', 'ci1.value': 'Dormagen &amp; surroundings · remote Germany-wide',
    'ci2.label': 'Response time', 'ci2.value': 'usually within 24 hours',
    'ci3.label': 'Appointments', 'ci3.value': 'flexible — evenings &amp; weekends too',

    'foot.copy': '&copy; <span id="year">2026</span> Robin Frank · IT services',
    'foot.imprint': 'Imprint', 'foot.privacy': 'Privacy'
  };

  const LS_THEME = 'rxf-theme';
  const LS_LANG = 'rxf-lang';
  const html = document.documentElement;
  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const $  = (s, r = document) => r.querySelector(s);
  const $$ = (s, r = document) => Array.from(r.querySelectorAll(s));

  /* ============== JAHR IM FOOTER ============== */
  // Wird nach jedem Sprachwechsel neu gesetzt: die Fußzeile ist ein
  // data-i18n-html-Knoten, beim Übersetzen entsteht das Element neu.
  function setYear() {
    const el = $('#year');
    if (el) el.textContent = String(new Date().getFullYear());
  }

  /* ============== THEME ============== */
  // Initiales Theme setzt das Inline-Script im <head> (verhindert Flash).
  const themeBtn = $('#themeBtn');
  function applyTheme(theme) {
    html.dataset.theme = theme;
    if (!themeBtn) return;
    const icon = themeBtn.querySelector('i');
    if (icon) icon.className = theme === 'dark' ? 'fas fa-sun' : 'fas fa-moon';
    themeBtn.setAttribute('aria-label', theme === 'dark' ? 'Helles Theme aktivieren' : 'Dunkles Theme aktivieren');
  }
  applyTheme(html.dataset.theme === 'dark' ? 'dark' : 'light');
  if (themeBtn) {
    themeBtn.addEventListener('click', () => {
      const t = html.dataset.theme === 'dark' ? 'light' : 'dark';
      applyTheme(t);
      try { localStorage.setItem(LS_THEME, t); } catch (e) {}
    });
  }

  /* ============== SPRACHE (DE/EN) ============== */
  const langBtn = $('#langBtn');
  const originals = {};

  function collectOriginals() {
    $$('[data-i18n]').forEach((el) => {
      originals[el.getAttribute('data-i18n')] = el.textContent;
    });
    $$('[data-i18n-html]').forEach((el) => {
      originals[el.getAttribute('data-i18n-html')] = el.innerHTML;
    });
  }

  function applyLang(lang) {
    $$('[data-i18n]').forEach((el) => {
      const k = el.getAttribute('data-i18n');
      const en = EN[k];
      if (lang === 'en' && en) {
        // Der Wörterbuch-Eintrag darf Entities enthalten — über innerHTML
        // setzen, damit „&amp;" nicht wörtlich in der Seite landet.
        el.innerHTML = en;
      } else {
        el.textContent = originals[k];
      }
    });
    $$('[data-i18n-html]').forEach((el) => {
      const k = el.getAttribute('data-i18n-html');
      el.innerHTML = (lang === 'en' && EN[k]) ? EN[k] : originals[k];
    });
    html.setAttribute('lang', lang);
    if (langBtn) {
      langBtn.textContent = lang === 'en' ? 'DE' : 'EN';
      langBtn.setAttribute('aria-label', lang === 'en' ? 'Auf Deutsch umschalten' : 'Switch to English');
    }
    setYear();
  }

  collectOriginals();
  let lang = 'de';
  try { lang = localStorage.getItem(LS_LANG) || 'de'; } catch (e) {}
  applyLang(lang === 'en' ? 'en' : 'de');

  if (langBtn) {
    langBtn.addEventListener('click', () => {
      lang = lang === 'de' ? 'en' : 'de';
      applyLang(lang);
      try { localStorage.setItem(LS_LANG, lang); } catch (e) {}
    });
  }

  /* ============== MOBIL-MENÜ ============== */
  const topbar = $('#topbar');
  const navToggle = $('#navToggle');
  const topbarNav = $('#topbarNav');

  function setMenu(open) {
    if (!topbar || !navToggle) return;
    topbar.classList.toggle('nav-open', open);
    navToggle.setAttribute('aria-expanded', String(open));
    navToggle.setAttribute('aria-label', open ? 'Menü schließen' : 'Menü öffnen');
    document.body.classList.toggle('nav-locked', open);
  }
  const menuOpen = () => topbar && topbar.classList.contains('nav-open');

  if (navToggle) {
    navToggle.addEventListener('click', () => setMenu(!menuOpen()));
  }
  if (topbarNav) {
    // Ein Klick auf einen Menüpunkt schließt das Menü wieder.
    topbarNav.addEventListener('click', (e) => {
      if (e.target.closest('a')) setMenu(false);
    });
  }
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && menuOpen()) {
      setMenu(false);
      if (navToggle) navToggle.focus();
    }
  });
  document.addEventListener('click', (e) => {
    if (menuOpen() && topbar && !topbar.contains(e.target)) setMenu(false);
  });
  // Wird das Fenster über den Umbruchpunkt hinaus vergrößert, ist die
  // Navigation ohnehin wieder sichtbar — der offene Zustand muss weg.
  window.matchMedia('(min-width: 901px)').addEventListener('change', (e) => {
    if (e.matches) setMenu(false);
  });

  /* ============== SMOOTH SCROLL FÜR ANKER ============== */
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

  /* ============== STICKY TOPBAR ============== */
  if (topbar) {
    const onScroll = () => topbar.classList.toggle('scrolled', window.scrollY > 30);
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
  }

  /* ============== AKTIVE NAVIGATION ============== */
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

  /* ============== REVEAL ON SCROLL ============== */
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
