/* =============================================================
   rxf-sys.de — IT-Service für Privatkunden · Interaktionen
   Theme, Sprache (DE/EN), Navigation, Anfrage-Starter, Rechenbeispiel,
   Formular (öffnet eine vorbefüllte E-Mail) und die Bewegung mit
   GSAP + ScrollTrigger + Lenis (lokal unter /assets/vendor).
   Vanilla JS, kein Build-Schritt.
   ============================================================= */

(() => {
  'use strict';

  /* ============== ÜBERSETZUNGEN (EN) ============== */
  // DE steht im Markup. Einträge dürfen HTML-Entities enthalten (werden über innerHTML gesetzt).
  const EN = {
    'skip': 'Skip to content',
    'nav.services': 'Services', 'nav.projects': 'Examples', 'nav.pricing': 'Pricing',
    'nav.about': 'About me', 'nav.faq': 'FAQ', 'nav.cta': 'Send a request',

    'hero.l1': 'Computer trouble?',
    'hero.l2': 'I&rsquo;ll <span class="mark">sort it</span>.',
    'hero.lede': 'I&rsquo;m Robin Frank, an IT specialist from Dormagen. I help with PCs, Wi-Fi and smart home, at your place or via remote support.',
    'fact1.t': 'On site', 'fact1.d': 'Dormagen and surroundings',
    'fact2.t': 'Remote support', 'fact2.d': 'all across Germany',
    'fact3.t': '€39 per hour', 'fact3.d': 'final price',
    'fact4.t': 'Reply within 24 h', 'fact4.d': 'usually faster',
    'note.t': 'Free initial assessment', 'note.d': 'by phone, no obligation',
    'img.hero': 'Hands at a laptop on a kitchen table, next to a coffee cup and reading glasses',

    'quick.title': 'What&rsquo;s wrong?',
    'quick.sub': 'Tap what fits. I&rsquo;ll prepare your request. The initial assessment is free.',
    'quick.group': 'Choose your topics', 'quick.where': 'Where do you need help?',
    'chip.wlan': 'Wi-Fi slow or gone', 'chip.printer': 'Printer acting up', 'chip.pc': 'New PC or laptop',
    'chip.virus': 'Virus or pop-ups', 'chip.smarthome': 'Set up smart home', 'chip.phone': 'Smartphone or tablet',
    'mode.onsite': 'On site', 'mode.remote': 'Remote support', 'mode.unsure': 'Not sure',

    'svc.title': 'How I can help',
    'svc.sub': 'Four areas, one contact person. Your issue isn&rsquo;t listed? Just ask.',
    'img.pc': 'Hands fitting an SSD into an open laptop',
    'svc1.title': 'PC and laptop help',
    'svc1.desc': 'Your computer is acting up, slow or needs setting up? I&rsquo;ll get it back in shape.',
    'svc1.l1': 'Setting up new PCs and laptops', 'svc1.l2': 'Windows problems and error messages',
    'svc1.l3': 'Upgrades (SSD, memory)', 'svc1.l4': 'Removing viruses and malware', 'svc1.l5': 'Data migration and backup',
    'img.wlan': 'White Wi-Fi router with green status lights on a wooden shelf in a living room',
    'svc2.title': 'Wi-Fi and home network',
    'svc2.desc': 'No more dead spots and dropouts. Stable internet in every room.',
    'svc2.l1': 'Router setup (e.g. FRITZ!Box)', 'svc2.l2': 'Wi-Fi in the whole house (mesh, repeaters)',
    'svc2.l3': 'Finding and fixing network problems', 'svc2.l4': 'Secure configuration and guest network', 'svc2.l5': 'Moving to a new connection',
    'img.smarthome': 'Hand setting a smart radiator thermostat to 21 degrees',
    'svc3.title': 'Smart home and devices',
    'svc3.desc': 'From printers to smart lamps: I set up your devices and make sure everything works together.',
    'svc3.l1': 'Printers, smart TV and streaming', 'svc3.l2': 'Setting up smartphones and tablets',
    'svc3.l3': 'Smart lamps, plugs and heating', 'svc3.l4': 'Voice assistants and automations', 'svc3.l5': 'Network storage (NAS) for photos',
    'img.remote': 'Person on the phone at a desk in the evening, in front of a laptop',
    'svc4.title': 'Remote support',
    'svc4.desc': 'Many problems can be solved without an appointment. I connect securely to your screen and you watch live.',
    'svc4.flag': 'Often the same day',
    'svc4.l1': 'Help without travel', 'svc4.l2': 'Connection only with your consent',
    'svc4.l3': 'You see every step', 'svc4.l4': 'Access ends with the session', 'svc4.l5': 'Available all across Germany',

    'mq.label': 'Devices and systems I help with',
    'mq.d1': 'Windows 11', 'mq.d2': 'macOS', 'mq.d3': 'FRITZ!Box', 'mq.d4': 'iPhone and iPad', 'mq.d5': 'Android',
    'mq.d6': 'Smart TV', 'mq.d7': 'Printers and scanners', 'mq.d8': 'Mesh Wi-Fi', 'mq.d9': 'Smart thermostats',
    'mq.d10': 'Voice assistants', 'mq.d11': 'NAS and backup',
    'mq.v1': 'Set up', 'mq.v2': 'Repair', 'mq.v3': 'Secure', 'mq.v4': 'Connect',
    'mq.v5': 'Explain', 'mq.v6': 'Clean up', 'mq.v7': 'Back up', 'mq.v8': 'Upgrade',

    'proj.title': 'Typical jobs',
    'proj.sub': 'Example bills: how long typical issues take and what they cost.',
    'proj.prev': 'Previous example', 'proj.next': 'Next example', 'proj.track': 'Typical jobs, scrolls sideways',
    'place.onsite': 'On site', 'place.remote': 'Remote support',
    'p.problem': 'Problem', 'p.solution': 'Solution',
    'p1.title': 'Mesh Wi-Fi in a terraced house',
    'p1.problem': 'Wi-Fi keeps dropping upstairs and in the garden.',
    'p1.solution': 'Set the router up again, place two mesh repeaters, add a guest network for visitors.',
    'p1.time': '2 h', 'p1.price': '€78.00',
    'p2.title': 'New laptop, old data',
    'p2.problem': 'The old PC is too slow. Photos and emails should move over.',
    'p2.solution': 'Set up the laptop, move data and printer, automatic backup to an external drive.',
    'p2.time': '2 h 30 min', 'p2.price': '€97.50',
    'p3.title': 'Printer offline after an update',
    'p3.problem': 'After a Windows update the printer stopped printing.',
    'p3.solution': 'Reinstall the driver, clear the print queue, set up scan to email.',
    'p3.time': '45 min', 'p3.price': '€39.00',
    'p4.title': 'Smart radiators',
    'p4.problem': 'Warm in the morning without the heating running all day.',
    'p4.solution': 'Fit smart thermostats, set up the app, create schedules per room.',
    'p4.time': '1 h 30 min', 'p4.price': '€58.50',
    'p5.title': 'Pop-ups in the browser',
    'p5.problem': 'Ad windows keep opening and the start page has changed.',
    'p5.solution': 'Remove the malware, reset the browser, check the antivirus.',
    'p5.time': '1 h', 'p5.price': '€39.00',

    'steps.title': 'How it works',
    'step1.title': 'Get in touch',
    'step1.desc': 'Call or write to me. Briefly describe what&rsquo;s wrong. No technical terms needed.',
    'step2.title': 'Free initial assessment',
    'step2.desc': 'I tell you honestly whether and how the problem can be solved. Then we book an appointment, on site or remote.',
    'step3.title': 'Solution and a fair bill',
    'step3.desc': 'I solve the problem and explain in plain words what I did. You only pay for the actual working time.',

    'price.title': 'One price.<br />No surprises.',
    'price.per': 'per hour,<br />on site and remote',
    'price.tax': 'Final price. As a small business under §&nbsp;19 UStG, no VAT is charged.',
    'rule1': '<strong>Free initial assessment by phone.</strong> You know where you stand beforehand.',
    'rule2': 'The first hour is billed in full, then in <strong>15-minute steps</strong> of €9.75 each.',
    'rule3': '<strong>Travel within Dormagen included.</strong> Surrounding area by arrangement.',
    'rule4': '<strong>Fixed price on request</strong> for bigger jobs, such as a complete new setup.',
    'rule5': 'Invoice by email. Payment by bank transfer or cash on site.',
    'rc.title': 'Example bill', 'rc.sub': 'Set the duration.',
    'rc.minus': '15 minutes less', 'rc.plus': '15 minutes more', 'rc.kind': 'Type of appointment',
    'rc.onsite': 'On site in Dormagen', 'rc.assess': 'Initial assessment',
    'rc.vat': 'VAT (§&nbsp;19 UStG)', 'rc.none': 'none', 'rc.total': 'Total',
    'rc.foot': 'Invoice by email. Payment by bank transfer or cash.',

    'map.title': 'Service area around Dormagen',
    'map.desc': 'Inner circle: Dormagen, travel included. Middle circle: Neuss, Düsseldorf, Cologne, Rommerskirchen and Grevenbroich by arrangement. Outer circle: remote support across Germany.',
    'map.rhine': 'RHINE', 'map.cologne': 'Cologne', 'map.caption': 'Schematic, not to scale',
    'area.title': 'Where I go',
    'zone1.title': 'Travel included',
    'zone1.desc': 'Dormagen and all its districts: Mitte, Nord, Horrem, Rheinfeld, Hackenbroich, Hackhausen, Delhoven, Zons, Stürzelberg, St.&nbsp;Peter, Nievenheim, Ückerath, Delrath, Gohr, Broich, Straberg and Knechtsteden.',
    'zone2.title': 'By arrangement',
    'zone2.desc': 'Neuss, Grevenbroich, Rommerskirchen, Cologne, Düsseldorf and the surrounding area. Further away on request.',
    'zone3.title': 'Remote support',
    'zone3.desc': 'All across Germany, no travel needed. Also for everyone who lives further away.',

    'about.title': 'Who&rsquo;s helping you',
    'about.lead': 'No call centre. One contact person, from the first question to the invoice.',
    'about.p1': 'I&rsquo;m a trained <strong>IT specialist for application development</strong> and work full-time as an IT systems administrator. Since 2022 I&rsquo;ve also been running my own server infrastructure. Technology is my job and my passion.',
    'about.p2': 'With me there&rsquo;s no jargon and no hidden costs. I explain what I do and only recommend what you really need.',
    'af1.t': 'Training', 'af1.d': 'IT specialist, application development (IHK)',
    'af2.t': 'Job', 'af2.d': 'IT systems administrator, hands-on every day',
    'af3.t': 'How I work', 'af3.d': 'Patient and without jargon',
    'af4.t': 'Your data', 'af4.d': 'Stays on your devices',
    'about.link': 'Background and projects in my portfolio',

    'img.router': 'Hand pulling the power plug at the back of a router',
    'sh.title': 'Worth trying first',
    'sh.sub': 'Four simple steps that often do the trick. And if not, they speed up the assessment.',
    'sh1.t': 'Restart', 'sh1.d': 'Switch the device off completely and on again. For the router, unplug it for 30 seconds.',
    'sh2.t': 'Check cables', 'sh2.d': 'Are power and network cables plugged in firmly? Are the lights on the router on?',
    'sh3.t': 'Photograph the message', 'sh3.d': 'A phone photo of the error message helps me assess it.',
    'sh4.t': 'Let updates finish', 'sh4.d': 'Don&rsquo;t switch the device off during an update, even if it takes a while.',

    'faq.title': 'Frequently asked questions',
    'faq.sub': 'Your question isn&rsquo;t here? Just give me a call:',
    'faq1.q': 'Which area do you cover?',
    'faq1.a': 'On site I cover <strong>Dormagen and the surrounding area</strong>, including Neuss, Grevenbroich, Rommerskirchen, Cologne and Düsseldorf. Further away on request. With <strong>remote support</strong> I help all across Germany.',
    'faq2.q': 'How does remote support work, and is it safe?',
    'faq2.a': 'You download a small program and tell me the code it shows. Only then can I connect. You see everything happening on your screen the whole time and can end the connection at any moment. After the session I no longer have access.',
    'faq3.q': 'What will it cost me in total?',
    'faq3.a': 'The initial assessment by phone is free. After that it&rsquo;s <strong>€39 per hour</strong>. The first hour is billed in full, then in 15-minute steps. Typical jobs like setting up a printer or fixing a Wi-Fi problem usually take one to two hours. For bigger jobs I&rsquo;m happy to quote a fixed price in advance.',
    'faq4.q': 'When are appointments possible?',
    'faq4.a': 'We arrange appointments flexibly, usually afternoons, evenings or at weekends. Remote support often works at short notice.',
    'faq5.q': 'What happens to my data?',
    'faq5.a': 'Your data stays on your devices. I don&rsquo;t copy anything without explicit agreement, for example for an agreed backup. Anything I see while working is kept confidential.',
    'faq6.q': 'What if the problem can&rsquo;t be solved?',
    'faq6.a': 'Then I tell you openly, before any costs arise. For example when repairing a hardware defect is no longer worth it.',

    'contact.title': 'Tell me <span class="mark">what&rsquo;s wrong</span>.',
    'contact.sub': 'I usually get back to you within 24 hours with an honest initial assessment. Free and without obligation.',
    'contact.phone': 'Phone', 'contact.mail': 'Email',
    'contact.call': 'Call', 'contact.write': 'Write an email',
    'contact.copyPhone': 'Copy phone number', 'contact.copyMail': 'Copy email address',
    'ci1.label': 'Response time', 'ci1.value': 'usually within 24 hours',
    'ci2.label': 'Appointments', 'ci2.value': 'flexible, evenings and weekends too',
    'form.name': 'Your name', 'form.reach': 'Phone or email',
    'form.topics': 'What is it about?', 'form.multi': '(choose several)',
    'topic.wlan': 'Wi-Fi', 'topic.printer': 'Printer', 'topic.pc': 'PC / laptop',
    'topic.virus': 'Virus', 'topic.smarthome': 'Smart home', 'topic.phone': 'Phone / tablet',
    'form.msg': 'What happened?', 'form.optional': '(optional)',
    'form.msgPh': 'e.g. Since yesterday the Wi-Fi upstairs keeps dropping.',
    'form.how': 'How should I help?',
    'form.place': 'Town or postcode', 'form.placePh': 'e.g. 41541 Dormagen',
    'form.time': 'Best time to reach you',
    'time.any': 'any time', 'time.morning': 'mornings', 'time.afternoon': 'afternoons', 'time.evening': 'evenings',
    'form.submit': 'Prepare request',
    'form.help': 'Your email program opens with the finished text. Nothing is stored on this website.',
    'form.ready': 'Your request is ready',
    'form.readyHelp': 'Your email program should have opened. If not: copy the text and send it to info@rxf-sys.de.',
    'form.openMail': 'Open email program', 'form.copy': 'Copy text',

    'foot.imprint': 'Imprint', 'foot.privacy': 'Privacy',
    'foot.copy': '&copy; <span id="year">2026</span> Robin Frank · IT services Dormagen',
    'mbar.call': 'Call'
  };

  /* Texte, die per Script entstehen */
  const STR = {
    de: {
      locale: 'de-DE',
      go0: 'Weiter zur Anfrage', go1: 'Weiter mit 1 Anliegen', goN: (n) => `Weiter mit ${n} Anliegen`,
      h: 'Std.', min: 'Min.',
      first: 'Arbeitszeit, erste Stunde', firstShort: (d) => `Arbeitszeit (${d}, erste Stunde voll)`,
      extra: (n) => `${n} × 15 Min. à 9,75 €`,
      travelOnsite: 'Anfahrt in Dormagen', travelRemote: 'Anfahrt (Fernwartung)', none: 'entfällt',
      errName: 'Bitte geben Sie Ihren Namen an.',
      errReachEmpty: 'Bitte Telefon oder E-Mail angeben, damit ich mich melden kann.',
      errReachBad: 'Bitte prüfen Sie Telefonnummer oder E-Mail-Adresse.',
      copied: (t) => `Kopiert: ${t}`, copiedText: 'Anfrage-Text kopiert.',
      selected: 'Text markiert. Jetzt mit Strg+C oder ⌘C kopieren.',
      toLight: 'Helles Design einschalten', toDark: 'Dunkles Design einschalten',
      menuOpen: 'Menü öffnen', menuClose: 'Menü schließen',
      mqPause: 'Laufband anhalten', mqPlay: 'Laufband fortsetzen',
      langLabel: 'Switch to English', langText: 'EN',
      subject: 'IT-Anfrage', hello: 'Hallo Herr Frank,', topicsLine: 'mein Anliegen: ', noTopics: 'ich habe ein Anliegen.',
      helpLine: 'Hilfe gewünscht: ', placeLine: 'Ort: ', reachLine: 'Erreichbar unter: ', best: (t) => ` (am besten ${t})`, bye: 'Viele Grüße',
      modes: { onsite: 'vor Ort', remote: 'per Fernwartung', unsure: 'weiß ich noch nicht' },
      times: { morning: 'vormittags', afternoon: 'nachmittags', evening: 'abends' },
      topics: { wlan: 'WLAN', drucker: 'Drucker', pc: 'PC / Laptop', virus: 'Virus / Pop-ups', smarthome: 'Smart Home', handy: 'Smartphone / Tablet' }
    },
    en: {
      locale: 'en-GB',
      go0: 'Continue to request', go1: 'Continue with 1 topic', goN: (n) => `Continue with ${n} topics`,
      h: 'h', min: 'min',
      first: 'Labour, first hour', firstShort: (d) => `Labour (${d}, first hour in full)`,
      extra: (n) => `${n} × 15 min at €9.75`,
      travelOnsite: 'Travel within Dormagen', travelRemote: 'Travel (remote support)', none: 'none',
      errName: 'Please enter your name.',
      errReachEmpty: 'Please enter a phone number or email so I can get back to you.',
      errReachBad: 'Please check the phone number or email address.',
      copied: (t) => `Copied: ${t}`, copiedText: 'Request text copied.',
      selected: 'Text selected. Press Ctrl+C or ⌘C to copy.',
      toLight: 'Switch to light theme', toDark: 'Switch to dark theme',
      menuOpen: 'Open menu', menuClose: 'Close menu',
      mqPause: 'Pause ticker', mqPlay: 'Resume ticker',
      langLabel: 'Auf Deutsch umschalten', langText: 'DE',
      subject: 'IT request', hello: 'Hello Mr Frank,', topicsLine: 'my request: ', noTopics: 'I have a request.',
      helpLine: 'Help wanted: ', placeLine: 'Location: ', reachLine: 'Contact: ', best: (t) => ` (best ${t})`, bye: 'Kind regards',
      modes: { onsite: 'on site', remote: 'via remote support', unsure: 'not sure yet' },
      times: { morning: 'in the morning', afternoon: 'in the afternoon', evening: 'in the evening' },
      topics: { wlan: 'Wi-Fi', drucker: 'Printer', pc: 'PC / laptop', virus: 'Virus / pop-ups', smarthome: 'Smart home', handy: 'Smartphone / tablet' }
    }
  };

  const LS_THEME = 'rxf-theme';
  const LS_LANG = 'rxf-lang';
  const html = document.documentElement;
  const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const finePointer = window.matchMedia('(hover: hover) and (pointer: fine)').matches;
  const EASE_OUT = 'cubic-bezier(0.23, 1, 0.32, 1)';
  const $ = (s, r = document) => r.querySelector(s);
  const $$ = (s, r = document) => Array.from(r.querySelectorAll(s));
  // Ohne GSAP oder bei reduzierter Bewegung bleibt die Seite statisch und vollständig sichtbar.
  const motion = !reduce && Boolean(window.gsap && window.ScrollTrigger);
  if (motion) html.classList.add('motion');

  let lang = 'de';
  const t = () => STR[lang];

  /* ============== TOAST ============== */
  const toastEl = $('#toast');
  let toastTimer;
  function toast(msg) {
    if (!toastEl) return;
    toastEl.textContent = msg;
    toastEl.classList.add('show');
    clearTimeout(toastTimer);
    toastTimer = setTimeout(() => toastEl.classList.remove('show'), 2600);
  }
  // Textwechsel mit kurzer Unschärfe (verdeckt den harten Sprung)
  function swapText(el, text) {
    if (!el || el.textContent === text) return;
    el.textContent = text;
    if (!reduce && el.animate) el.animate([{ filter: 'blur(3px)', opacity: 0.35 }, { filter: 'blur(0)', opacity: 1 }], { duration: 200, easing: EASE_OUT });
  }

  /* ============== THEME ============== */
  const themeBtn = $('#themeBtn');
  const syncThemeLabel = () => {
    if (themeBtn) themeBtn.setAttribute('aria-label', html.dataset.theme === 'dark' ? t().toLight : t().toDark);
  };
  if (themeBtn) {
    themeBtn.addEventListener('click', () => {
      const next = html.dataset.theme === 'dark' ? 'light' : 'dark';
      html.dataset.theme = next;
      syncThemeLabel();
      try { localStorage.setItem(LS_THEME, next); } catch (e) { /* Speicher gesperrt: gilt nur für diesen Besuch */ }
    });
  }

  /* ============== SPRACHE (DE/EN) ============== */
  const langBtn = $('#langBtn');
  const originals = { text: {}, html: {}, aria: {}, alt: {}, ph: {} };
  function collectOriginals() {
    $$('[data-i18n]').forEach((el) => { originals.text[el.dataset.i18n] = el.textContent; });
    $$('[data-i18n-html]').forEach((el) => { originals.html[el.dataset.i18nHtml] = el.innerHTML; });
    $$('[data-i18n-aria]').forEach((el) => { originals.aria[el.dataset.i18nAria] = el.getAttribute('aria-label'); });
    $$('[data-i18n-alt]').forEach((el) => { originals.alt[el.dataset.i18nAlt] = el.getAttribute('alt'); });
    $$('[data-i18n-ph]').forEach((el) => { originals.ph[el.dataset.i18nPh] = el.getAttribute('placeholder'); });
  }
  const plain = (s) => { const d = document.createElement('textarea'); d.innerHTML = s; return d.value; };
  function applyLang(next) {
    lang = next;
    const en = lang === 'en';
    $$('[data-i18n]').forEach((el) => {
      const k = el.dataset.i18n;
      if (en && EN[k]) el.innerHTML = EN[k]; else el.textContent = originals.text[k];
    });
    $$('[data-i18n-html]').forEach((el) => {
      const k = el.dataset.i18nHtml;
      el.innerHTML = en && EN[k] ? EN[k] : originals.html[k];
    });
    $$('[data-i18n-aria]').forEach((el) => {
      const k = el.dataset.i18nAria;
      el.setAttribute('aria-label', en && EN[k] ? plain(EN[k]) : originals.aria[k]);
    });
    $$('[data-i18n-alt]').forEach((el) => {
      const k = el.dataset.i18nAlt;
      el.setAttribute('alt', en && EN[k] ? plain(EN[k]) : originals.alt[k]);
    });
    $$('[data-i18n-ph]').forEach((el) => {
      const k = el.dataset.i18nPh;
      el.setAttribute('placeholder', en && EN[k] ? plain(EN[k]) : originals.ph[k]);
    });
    html.setAttribute('lang', lang);
    if (langBtn) {
      langBtn.textContent = t().langText;
      langBtn.setAttribute('aria-label', t().langLabel);
    }
    const year = $('#year');
    if (year) year.textContent = String(new Date().getFullYear());
    syncThemeLabel();
    syncMenuLabel();
    syncStarterLabel();
    syncMqLabel();
    renderReceipt();
  }

  /* ============== SMOOTH SCROLL (Lenis) ============== */
  let lenis = null;
  if (motion && window.Lenis) {
    lenis = new window.Lenis({ duration: 1.15, easing: (x) => Math.min(1, 1.001 - Math.pow(2, -10 * x)), smoothWheel: true });
    lenis.on('scroll', window.ScrollTrigger.update);
    window.gsap.ticker.add((time) => lenis.raf(time * 1000));
    window.gsap.ticker.lagSmoothing(0);
  }
  const OFFSET = 88;
  function scrollToEl(el, after) {
    if (!el) return;
    if (lenis) { lenis.scrollTo(el, { offset: -OFFSET, duration: 1.2, onComplete: after }); return; }
    el.scrollIntoView({ behavior: reduce ? 'auto' : 'smooth', block: 'start' });
    if (after) setTimeout(after, reduce ? 0 : 550);
  }
  $$('a[href^="#"]').forEach((link) => {
    link.addEventListener('click', (e) => {
      const href = link.getAttribute('href');
      const target = href && href.length > 1 ? document.getElementById(href.slice(1)) : null;
      if (!target) return;
      e.preventDefault();
      const focusTarget = () => { target.setAttribute('tabindex', '-1'); target.focus({ preventScroll: true }); };
      if (lenis) lenis.scrollTo(target.id === 'top' ? 0 : target, { offset: -OFFSET, duration: 1.2, onComplete: focusTarget });
      else { target.scrollIntoView({ behavior: reduce ? 'auto' : 'smooth', block: 'start' }); focusTarget(); }
      history.replaceState(null, '', href);
    });
  });

  /* ============== MOBIL-MENÜ ============== */
  const topbar = $('#topbar');
  const navToggle = $('#navToggle');
  const topbarNav = $('#topbarNav');
  const menuOpen = () => Boolean(topbar && topbar.classList.contains('nav-open'));
  function syncMenuLabel() {
    if (navToggle) navToggle.setAttribute('aria-label', menuOpen() ? t().menuClose : t().menuOpen);
  }
  function setMenu(open) {
    if (!topbar || !navToggle) return;
    topbar.classList.toggle('nav-open', open);
    navToggle.setAttribute('aria-expanded', String(open));
    syncMenuLabel();
    if (lenis) { if (open) lenis.stop(); else lenis.start(); }
  }
  if (navToggle) navToggle.addEventListener('click', () => setMenu(!menuOpen()));
  if (topbarNav) topbarNav.addEventListener('click', (e) => { if (e.target.closest('a')) setMenu(false); });
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && menuOpen()) { setMenu(false); if (navToggle) navToggle.focus(); }
  });
  // Klick auf den Schleier (::after der Kopfleiste) oder außerhalb schließt das Menü.
  document.addEventListener('click', (e) => {
    if (menuOpen() && topbar && (e.target === topbar || !topbar.contains(e.target))) setMenu(false);
  });
  window.matchMedia('(min-width: 901px)').addEventListener('change', (e) => { if (e.matches) setMenu(false); });
  if (topbar) {
    const onScroll = () => topbar.classList.toggle('scrolled', window.scrollY > 8);
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
  }

  /* ============== NAVIGATION: gleitender Marker + aktiver Punkt ============== */
  let moveInd = () => {};
  if (topbarNav) {
    const navInd = document.createElement('span');
    navInd.className = 'nav-ind';
    navInd.setAttribute('aria-hidden', 'true');
    topbarNav.prepend(navInd);
    topbarNav.classList.add('has-ind');
    let shown = false;
    moveInd = () => {
      const a = $('.topbar-nav a.active');
      if (!a || window.innerWidth <= 900) { navInd.style.opacity = '0'; shown = false; return; }
      if (!shown) navInd.style.transition = 'none';
      navInd.style.width = `${a.offsetWidth}px`;
      navInd.style.transform = `translateX(${a.offsetLeft}px)`;
      navInd.style.opacity = '1';
      if (!shown) { void navInd.offsetWidth; navInd.style.transition = ''; shown = true; }
    };
    window.addEventListener('resize', moveInd);
  }
  const navLinks = $$('.topbar-nav a[data-section]');
  if ('IntersectionObserver' in window && navLinks.length) {
    const spy = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        navLinks.forEach((a) => {
          const on = a.dataset.section === entry.target.id;
          a.classList.toggle('active', on);
          if (on) a.setAttribute('aria-current', 'location'); else a.removeAttribute('aria-current');
        });
        moveInd();
      });
    }, { rootMargin: '-45% 0px -50% 0px' });
    navLinks.forEach((a) => { const sec = document.getElementById(a.dataset.section); if (sec) spy.observe(sec); });
  }

  /* ============== LAUFBAND: anhalten ============== */
  const mq = $('#mq');
  const mqPause = $('#mqPause');
  let mqPaused = false;
  let mqHover = false;
  function syncMqLabel() {
    if (mqPause) mqPause.setAttribute('aria-label', mqPaused ? t().mqPlay : t().mqPause);
  }
  if (mq && mqPause) {
    mqPause.addEventListener('click', () => {
      mqPaused = !mqPaused;
      mq.classList.toggle('paused', mqPaused);
      mqPause.setAttribute('aria-pressed', String(mqPaused));
      $('use', mqPause).setAttribute('href', mqPaused ? '#i-play' : '#i-pause');
      syncMqLabel();
    });
    if (finePointer) {
      mq.addEventListener('pointerenter', () => { mqHover = true; });
      mq.addEventListener('pointerleave', () => { mqHover = false; });
    }
  }

  /* ============== ANFRAGE-STARTER + THEMEN-CHIPS ============== */
  const starterChips = $('#starterChips');
  const formChips = $('#formChips');
  const starterGo = $('#starterGo');
  const picked = (c) => (c ? $$('.chip[aria-pressed="true"]', c).map((b) => b.dataset.topic) : []);
  function syncStarterLabel() {
    const n = picked(starterChips).length;
    swapText($('#starterGoLabel'), n === 0 ? t().go0 : n === 1 ? t().go1 : t().goN(n));
  }
  [starterChips, formChips].forEach((group) => {
    if (!group) return;
    group.addEventListener('click', (e) => {
      const chip = e.target.closest('.chip');
      if (!chip) return;
      const on = chip.getAttribute('aria-pressed') !== 'true';
      chip.setAttribute('aria-pressed', String(on));
      if (motion && on) window.gsap.fromTo($('.tick', chip), { scale: 0.2, rotate: -45 }, { scale: 1, rotate: 0, duration: 0.45, ease: 'back.out(3)', clearProps: 'transform' });
      if (group === starterChips) {
        if (motion && on && picked(starterChips).length === 1) {
          window.gsap.fromTo(starterGo, { scale: 1 }, { scale: 1.05, duration: 0.18, yoyo: true, repeat: 1, ease: 'power2.out', clearProps: 'transform' });
        }
        syncStarterLabel();
      }
    });
  });
  if (starterGo) {
    starterGo.addEventListener('click', () => {
      const sel = picked(starterChips);
      $$('.chip', formChips).forEach((b) => b.setAttribute('aria-pressed', String(sel.includes(b.dataset.topic))));
      const mode = $('input[name="s-mode"]:checked');
      const target = mode ? document.getElementById(`f-mode-${mode.value}`) : null;
      if (target) target.checked = true;
      scrollToEl($('#kontakt'), () => { const n = $('#f-name'); if (n) n.focus({ preventScroll: true }); });
    });
  }

  /* ============== RECHENBEISPIEL ============== */
  // Die erste Stunde wird immer voll berechnet, danach 15-Minuten-Schritte à 9,75 €.
  const RATE = 39;
  const STEP_PRICE = 9.75;
  const MIN_MINUTES = 15;
  const MAX_MINUTES = 480;
  let minutes = 75;
  let countTween = null;
  const totalEl = $('#rcTotal');
  const euro = (v) => new Intl.NumberFormat(t().locale, { style: 'currency', currency: 'EUR' }).format(v);
  const fmtDur = (m) => [Math.floor(m / 60) ? `${Math.floor(m / 60)} ${t().h}` : '', m % 60 ? `${m % 60} ${t().min}` : ''].filter(Boolean).join(' ');
  const steps = () => Math.max(0, (minutes - 60) / 15);
  const totalNow = () => RATE + steps() * STEP_PRICE;
  function renderReceipt() {
    if (!totalEl) return;
    const remote = ($('input[name="rc-mode"]:checked') || {}).value === 'remote';
    $('#rcDur').textContent = fmtDur(minutes);
    $('#rcAssess').textContent = euro(0);
    $('#rcFirst').textContent = euro(RATE);
    $('#rcFirstLabel').textContent = minutes < 60 ? t().firstShort(fmtDur(minutes)) : t().first;
    $('#rcExtraRow').hidden = steps() === 0;
    $('#rcExtraLabel').textContent = t().extra(steps());
    $('#rcExtra').textContent = euro(steps() * STEP_PRICE);
    $('#rcTravelLabel').textContent = remote ? t().travelRemote : t().travelOnsite;
    $('#rcTravel').textContent = remote ? t().none : euro(0);
    if (countTween) { countTween.kill(); countTween = null; }
    const total = euro(totalNow());
    if (totalEl.textContent !== total) {
      totalEl.textContent = total;
      if (!reduce && totalEl.animate) totalEl.animate([{ transform: 'translateY(6px)', opacity: 0.3, filter: 'blur(2px)' }, { transform: 'none', opacity: 1, filter: 'none' }], { duration: 220, easing: EASE_OUT });
    }
    $('#rcMinus').disabled = minutes <= MIN_MINUTES;
    $('#rcPlus').disabled = minutes >= MAX_MINUTES;
  }
  // CountUp-Prinzip: Die Summe zählt beim Ausdrucken hoch.
  function countTotal(duration) {
    const proxy = { v: 0 };
    const end = totalNow();
    countTween = window.gsap.to(proxy, {
      v: end, duration, ease: 'power3.out',
      onUpdate: () => { totalEl.textContent = euro(Math.round(proxy.v * 4) / 4); },
      onComplete: () => { totalEl.textContent = euro(end); countTween = null; }
    });
  }
  if (totalEl) {
    $('#rcMinus').addEventListener('click', () => { minutes = Math.max(MIN_MINUTES, minutes - 15); renderReceipt(); });
    $('#rcPlus').addEventListener('click', () => { minutes = Math.min(MAX_MINUTES, minutes + 15); renderReceipt(); });
    $$('input[name="rc-mode"]').forEach((r) => r.addEventListener('change', renderReceipt));
  }

  /* ============== TYPISCHE EINSÄTZE: Pfeile + Fortschritt ============== */
  const track = $('#projTrack');
  const prev = $('#projPrev');
  const next = $('#projNext');
  const projBar = $('#projBar');
  if (track && prev && next && projBar) {
    const stepW = () => { const c = $('.proj', track); return c ? c.getBoundingClientRect().width + 20 : 300; };
    prev.addEventListener('click', () => track.scrollBy({ left: -stepW(), behavior: reduce ? 'auto' : 'smooth' }));
    next.addEventListener('click', () => track.scrollBy({ left: stepW(), behavior: reduce ? 'auto' : 'smooth' }));
    const syncProj = () => {
      const max = track.scrollWidth - track.clientWidth;
      prev.disabled = track.scrollLeft < 4;
      next.disabled = track.scrollLeft >= max - 4;
      const w = projBar.parentElement.clientWidth;
      const tw = Math.max(48, w * (track.clientWidth / track.scrollWidth));
      projBar.style.width = `${tw}px`;
      projBar.style.transform = `translateX(${max > 0 ? (track.scrollLeft / max) * (w - tw) : 0}px)`;
    };
    track.addEventListener('scroll', syncProj, { passive: true });
    window.addEventListener('resize', syncProj);
    syncProj();
  }

  /* ============== FORMULAR → vorbefüllte E-Mail ============== */
  const form = $('#inquiry');
  const fName = $('#f-name');
  const fReach = $('#f-reach');
  function setErr(input, msg) {
    const box = $(`#${input.id}-err`);
    input.setAttribute('aria-invalid', msg ? 'true' : 'false');
    box.hidden = !msg;
    $('span', box).textContent = msg || '';
  }
  const reachOk = (v) => /\S+@\S+\.\S+/.test(v) || v.replace(/\D/g, '').length >= 6;
  if (form && fName && fReach) {
    fName.addEventListener('input', () => { if (fName.value.trim()) setErr(fName, ''); });
    fReach.addEventListener('input', () => { if (reachOk(fReach.value.trim())) setErr(fReach, ''); });
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      const name = fName.value.trim();
      const reach = fReach.value.trim();
      let firstBad = null;
      if (!name) { setErr(fName, t().errName); firstBad = fName; } else setErr(fName, '');
      if (!reachOk(reach)) { setErr(fReach, reach ? t().errReachBad : t().errReachEmpty); firstBad = firstBad || fReach; } else setErr(fReach, '');
      if (firstBad) {
        firstBad.focus();
        if (motion) window.gsap.fromTo(firstBad, { x: 0 }, { keyframes: { x: [-8, 7, -5, 3, 0] }, duration: 0.4, ease: 'power2.out', clearProps: 'transform' });
        return;
      }
      const s = t();
      const topics = picked(formChips).map((k) => s.topics[k]);
      const mode = s.modes[form.querySelector('input[name="f-mode"]:checked').value];
      const place = $('#f-place').value.trim();
      const msg = $('#f-msg').value.trim();
      const time = $('#f-time').value;
      const subject = s.subject + (topics.length ? `: ${topics.join(', ')}` : '');
      const body = [
        s.hello, '',
        topics.length ? `${s.topicsLine}${topics.join(', ')}.` : s.noTopics,
        msg ? `\n${msg}` : '', '',
        s.helpLine + mode,
        place ? s.placeLine + place : '',
        s.reachLine + reach + (time === 'any' ? '' : s.best(s.times[time])), '',
        s.bye, name
      ].filter((l, i, a) => l !== '' || a[i - 1] !== '').join('\n');
      const href = `mailto:info@rxf-sys.de?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
      $('#resultText').textContent = `${subject}\n\n${body}`;
      $('#resultMail').href = href;
      const res = $('#formResult');
      const wasHidden = res.hidden;
      res.hidden = false;
      if (motion && wasHidden) {
        window.gsap.from(res, { autoAlpha: 0, y: 14, scale: 0.98, duration: 0.55, ease: 'expo.out', clearProps: 'all' });
        window.gsap.from($('h3 .ic', res), { scale: 0.2, rotate: -40, duration: 0.6, delay: 0.12, ease: 'back.out(3)', clearProps: 'transform' });
      }
      res.focus({ preventScroll: true });
      if (lenis) lenis.scrollTo(res, { offset: -140, duration: 1 }); else res.scrollIntoView({ behavior: reduce ? 'auto' : 'smooth', block: 'nearest' });
      window.location.href = href;
    });
  }

  /* ============== KOPIEREN ============== */
  document.addEventListener('click', (e) => {
    const b = e.target.closest('[data-copy], [data-copy-from]');
    if (!b) return;
    const fromSel = b.dataset.copyFrom;
    const text = fromSel ? $(fromSel).textContent : b.dataset.copy;
    const target = fromSel ? $(fromSel) : $(b.dataset.copyTarget);
    const fallback = () => {
      const range = document.createRange();
      range.selectNodeContents(target);
      const sel = window.getSelection();
      sel.removeAllRanges();
      sel.addRange(range);
      toast(t().selected);
    };
    if (navigator.clipboard && navigator.clipboard.writeText) {
      navigator.clipboard.writeText(text).then(() => toast(fromSel ? t().copiedText : t().copied(text)), fallback);
    } else fallback();
  });

  /* ============== MOBILE AKTIONSLEISTE ============== */
  const mbar = $('#mbar');
  if (mbar && 'IntersectionObserver' in window) {
    let heroVisible = true;
    let contactVisible = false;
    const update = () => { const show = !heroVisible && !contactVisible; mbar.classList.toggle('show', show); mbar.inert = !show; };
    new IntersectionObserver(([en]) => { heroVisible = en.isIntersecting; update(); }).observe($('#top'));
    new IntersectionObserver(([en]) => { contactVisible = en.isIntersecting; update(); }).observe($('#kontakt'));
  }

  /* ============== START ============== */
  collectOriginals();
  let stored = 'de';
  try { stored = localStorage.getItem(LS_LANG) || 'de'; } catch (e) { /* ohne Speicher: Deutsch */ }
  applyLang(stored === 'en' ? 'en' : 'de');
  if (langBtn) {
    langBtn.addEventListener('click', () => {
      applyLang(lang === 'de' ? 'en' : 'de');
      try { localStorage.setItem(LS_LANG, lang); } catch (e) { /* Speicher gesperrt */ }
      if (motion) window.ScrollTrigger.refresh();
    });
  }
  if (motion) initMotion();

  /* =====================================================================
     BEWEGUNG (GSAP + ScrollTrigger)
     Regel: Inhalte bleiben im Ruhezustand sichtbar. Ein Element wird erst in den
     Startzustand gesetzt, wenn es kurz vor dem Bild ist (noch außerhalb), und spielt
     beim Hereinscrollen ab. So flackert nichts und ohne Scrollen ist alles lesbar.
     ===================================================================== */
  function initMotion() {
    const gsap = window.gsap;
    const ScrollTrigger = window.ScrollTrigger;
    gsap.registerPlugin(ScrollTrigger);
    const EXPO = 'expo.out';
    const TRANSFORMS = ['x', 'y', 'xPercent', 'yPercent', 'scale', 'rotate', 'rotation', 'rotationX', 'rotationY'];
    const visibleNow = (el) => el.getBoundingClientRect().top < window.innerHeight;

    function endState(from) {
      const to = {};
      const clear = new Set();
      Object.keys(from).forEach((k) => {
        if (TRANSFORMS.includes(k)) { to[k] = k === 'scale' ? 1 : 0; clear.add('transform'); }
        else if (k === 'autoAlpha' || k === 'opacity') { to[k] = 1; clear.add('opacity'); clear.add('visibility'); }
        else if (k === 'filter') { to.filter = 'blur(0px)'; clear.add('filter'); }
      });
      to.clearProps = Array.from(clear).join(',');
      return to;
    }
    function reveal(trigger, targets, from, opts = {}) {
      const els = gsap.utils.toArray(targets);
      if (!trigger || !els.length) return;
      const { at = 0.88, onPrepare, onPlay, ...vars } = opts;
      ScrollTrigger.create({
        trigger, start: 'top bottom+=260', once: true,
        onEnter: () => {
          if (visibleNow(trigger)) return;
          gsap.set(els, from);
          if (onPrepare) onPrepare();
          // Abspielen, wenn die Oberkante bei `at` (Anteil der Bildschirmhöhe) ist, aber nie
          // später als kurz vor dem Seitenende, sonst bliebe z. B. der Fuß unsichtbar.
          const startAt = () => Math.min(
            ScrollTrigger.maxScroll(window) - 2,
            trigger.getBoundingClientRect().top + window.scrollY - window.innerHeight * at
          );
          ScrollTrigger.create({
            trigger, start: startAt, once: true, invalidateOnRefresh: true,
            onEnter: () => {
              gsap.to(els, { ...endState(from), duration: 0.95, ease: EXPO, overwrite: 'auto', ...vars });
              if (onPlay) onPlay();
            }
          });
        }
      });
    }
    // Wörter in Masken (Überschriften) bzw. einzeln (ScrollReveal-Satz)
    function splitWords(el, cls) {
      const walker = document.createTreeWalker(el, NodeFilter.SHOW_TEXT);
      const nodes = [];
      while (walker.nextNode()) nodes.push(walker.currentNode);
      nodes.forEach((node) => {
        if (!node.textContent.trim()) return;
        const frag = document.createDocumentFragment();
        node.textContent.split(/(\s+)/).forEach((part) => {
          if (!part) return;
          if (/^\s+$/.test(part)) { frag.appendChild(document.createTextNode(part)); return; }
          const outer = document.createElement('span');
          outer.className = cls;
          if (cls === 'w') { const inner = document.createElement('span'); inner.textContent = part; outer.appendChild(inner); } else outer.textContent = part;
          frag.appendChild(outer);
        });
        node.replaceWith(frag);
      });
    }
    const mm = gsap.matchMedia();

    /* Scroll-Fortschritt in der Kopfleiste */
    gsap.to('#progress', { scaleX: 1, ease: 'none', scrollTrigger: { trigger: document.body, start: 'top top', end: 'bottom bottom', scrub: 0.3 } });

    /* --- Hero: Eröffnung --- */
    gsap.timeline({ defaults: { ease: EXPO } })
      .from('.hero-title .line > span', { yPercent: 112, duration: 1.15, stagger: 0.12 })
      .fromTo('.hero .mark', { '--mk': 0 }, { '--mk': 1, duration: 0.6, ease: 'power3.out' }, 0.75)
      .fromTo('.hero-photo', { clipPath: 'inset(100% 0% 0% 0% round 22px)' }, { clipPath: 'inset(0% 0% 0% 0% round 22px)', duration: 1.3, ease: 'expo.inOut', clearProps: 'clipPath' }, 0.1)
      .fromTo('.hero-photo img', { scale: 1.35 }, { scale: 1.12, duration: 1.9 }, 0.1)
      .from('.lede, .hero-actions', { autoAlpha: 0, y: 18, filter: 'blur(6px)', duration: 0.9, stagger: 0.08, clearProps: 'filter,opacity,visibility,transform' }, 0.35)
      .from('.hero-facts li', { autoAlpha: 0, y: 14, duration: 0.7, stagger: 0.07, clearProps: 'opacity,visibility,transform' }, 0.55)
      .from('.hero-facts .fact-ic', { scale: 0.4, rotate: -20, duration: 0.6, stagger: 0.07, ease: 'back.out(2)', clearProps: 'transform' }, 0.6)
      .from('.photo-note', { autoAlpha: 0, y: 16, duration: 0.7, clearProps: 'opacity,visibility,transform' }, 0.95);
    const heroScrub = { trigger: '.hero', start: 'top top', end: 'bottom top', scrub: true };
    gsap.to('.hero-photo img', { yPercent: 9, ease: 'none', scrollTrigger: heroScrub });
    mm.add('(min-width: 901px)', () => {
      gsap.to('.hero-title .line:nth-child(1)', { x: -48, ease: 'none', scrollTrigger: heroScrub });
      gsap.to('.hero-title .line:nth-child(2)', { x: 48, ease: 'none', scrollTrigger: heroScrub });
    });

    /* --- Überschriften (BlurText/SplitText-Prinzip) und Untertitel --- */
    $$('.h2').forEach((h) => {
      splitWords(h, 'w');
      const words = $$('.w > span', h);
      const mark = $('.mark', h);
      reveal(h, words, { yPercent: 120 }, {
        duration: 1, stagger: 0.045,
        onPrepare: () => { if (mark) gsap.set(mark, { '--mk': 0 }); },
        onPlay: () => { if (mark) gsap.to(mark, { '--mk': 1, duration: 0.6, ease: 'power3.out', delay: 0.3 + words.length * 0.045 }); }
      });
    });
    $$('.sub, .quick-sub').forEach((p) => reveal(p, p, { autoAlpha: 0, y: 12, filter: 'blur(10px)' }, { duration: 1, delay: 0.15 }));

    /* --- Schnellstart-Band: wird wie Absperrband ausgerollt --- */
    const quick = $('#schnellstart');
    reveal(quick, quick, { clipPath: 'inset(0% 100% 0% 0%)' }, { clipPath: 'inset(0% 0% 0% 0%)', duration: 1.15, ease: 'expo.inOut', clearProps: 'clipPath' });
    reveal(quick, '#starterChips .chip', { autoAlpha: 0, scale: 0.9, y: 10 }, { stagger: 0.05, delay: 0.45, duration: 0.7, ease: 'back.out(1.6)' });
    reveal(quick, '.quick-row', { autoAlpha: 0, y: 16 }, { delay: 0.75 });

    /* --- Leistungen: Karten steigen auf, Bilder öffnen sich, der Stapel bekommt Tiefe --- */
    $$('.svc-card').forEach((card) => {
      const fig = $('.svc-photo', card);
      reveal(card, card, { autoAlpha: 0, y: 90 }, { duration: 1.1, clearProps: 'opacity,visibility' });
      reveal(card, fig, { clipPath: 'inset(0% 100% 0% 0%)' }, { clipPath: 'inset(0% 0% 0% 0%)', duration: 1.2, ease: 'expo.inOut', delay: 0.1, clearProps: 'clipPath' });
      reveal(card, $('img', fig), { scale: 1.3 }, { duration: 1.6, delay: 0.1 });
      reveal(card, $('.svc-icon', card), { scale: 0.3, rotate: -25 }, { duration: 0.7, delay: 0.25, ease: 'back.out(2)' });
      reveal(card, $$('.ticks li', card), { autoAlpha: 0, x: -18 }, { stagger: 0.05, delay: 0.35, duration: 0.7 });
    });
    mm.add('(min-width: 901px)', () => {
      const cards = $$('.svc-card');
      cards.forEach((card, i) => {
        const nextCard = cards[i + 1];
        if (!nextCard) return;
        const st = { trigger: nextCard, start: 'top bottom', end: () => `top ${96 + (i + 1) * 16 + 1}px`, scrub: true, invalidateOnRefresh: true };
        gsap.to(card, { scale: 0.94, ease: 'none', scrollTrigger: st });
        gsap.to($('.svc-dim', card), { opacity: 0.22, ease: 'none', scrollTrigger: { ...st } });
      });
    });

    /* --- Laufband (ScrollVelocity-Prinzip): Tempo und Richtung folgen dem Scrollen --- */
    const rows = $$('.mq-row').map((row, i) => ({ track: $('.mq-track', row), x: 0, w: 0, base: i % 2 ? 1 : -1 }));
    const measureRows = () => rows.forEach((r) => { r.w = r.track.firstElementChild.offsetWidth; });
    measureRows();
    window.addEventListener('resize', measureRows);
    let dir = 1;
    let boost = 0;
    const mqST = ScrollTrigger.create({
      trigger: '#mq', start: 'top bottom', end: 'bottom top',
      onUpdate: (self) => { dir = self.direction; boost = Math.min(5, Math.abs(self.getVelocity()) / 350); }
    });
    gsap.ticker.add((time, dt) => {
      boost *= 0.94;
      if (mqPaused || mqHover || !mqST.isActive) return;
      rows.forEach((r) => {
        if (!r.w) return;
        r.x = gsap.utils.wrap(-r.w, 0, r.x + r.base * dir * 60 * (dt / 1000) * (1 + boost));
        r.track.style.transform = `translate3d(${r.x.toFixed(2)}px, 0, 0)`;
      });
    });

    /* --- Typische Einsätze: Desktop pinnt die Sektion und fährt seitlich durch --- */
    const projSec = $('#projekte');
    reveal(projSec, '.proj', { autoAlpha: 0, x: 120 }, { stagger: 0.08, duration: 1.1, at: 0.75 });
    mm.add('(min-width: 901px)', () => {
      projSec.classList.add('pan');
      const dist = () => Math.max(0, track.scrollWidth - track.clientWidth);
      gsap.to(track, {
        scrollLeft: () => dist(), ease: 'none',
        scrollTrigger: { trigger: projSec, start: 'top top', end: () => `+=${dist()}`, pin: true, scrub: 0.6, invalidateOnRefresh: true, anticipatePin: 1 }
      });
      return () => { projSec.classList.remove('pan'); track.scrollLeft = 0; };
    });
    // TiltedCard-Prinzip: Karten neigen sich zur Maus
    if (finePointer) {
      $$('.proj').forEach((card) => {
        gsap.set(card, { transformPerspective: 900 });
        const rx = gsap.quickTo(card, 'rotationX', { duration: 0.5, ease: 'power3' });
        const ry = gsap.quickTo(card, 'rotationY', { duration: 0.5, ease: 'power3' });
        const lift = gsap.quickTo(card, 'y', { duration: 0.4, ease: 'power3' });
        card.addEventListener('pointerenter', () => lift(-6));
        card.addEventListener('pointermove', (e) => {
          const r = card.getBoundingClientRect();
          ry(((e.clientX - r.left) / r.width - 0.5) * 10);
          rx(-((e.clientY - r.top) / r.height - 0.5) * 10);
        });
        card.addEventListener('pointerleave', () => { rx(0); ry(0); lift(0); });
      });
    }

    /* --- Ablauf: Balken wächst mit dem Scrollen, Kreise leuchten erst, wenn er sie erreicht --- */
    const timeline = $('.timeline');
    const stepsLi = $$('.timeline li');
    let stops = [];
    function measureStops() {
      const line = getComputedStyle(timeline, '::after');
      const vertical = parseFloat(line.height) > parseFloat(line.width);
      const startPos = parseFloat(vertical ? line.top : line.left);
      const len = parseFloat(vertical ? line.height : line.width) || 1;
      stops = stepsLi.map((li) => {
        const n = $('.step-n', li);
        const c = vertical ? li.offsetTop + n.offsetTop + n.offsetHeight / 2 : li.offsetLeft + n.offsetLeft + n.offsetWidth / 2;
        return (c - startPos) / len;
      });
    }
    function lightSteps(progress) {
      stepsLi.forEach((li, i) => {
        const on = progress > 0 && progress >= stops[i] - 0.01;
        if (on === li.classList.contains('lit')) return;
        li.classList.toggle('lit', on);
        if (on) gsap.fromTo($('.step-n', li), { scale: 0.7 }, { scale: 1, duration: 0.6, ease: 'back.out(2.5)', clearProps: 'transform' });
      });
    }
    measureStops();
    ScrollTrigger.addEventListener('refresh', measureStops);
    gsap.fromTo(timeline, { '--tl': 0 }, {
      '--tl': 1, ease: 'none',
      scrollTrigger: { trigger: timeline, start: 'top 75%', end: 'bottom 50%', scrub: 0.5 },
      onUpdate() { lightSteps(this.progress()); }
    });
    reveal(timeline, stepsLi, { autoAlpha: 0, y: 40 }, { stagger: 0.14 });

    /* --- Preise: Ziffern rollen, Haken springen, Kassenbon druckt, Summe zählt hoch --- */
    const amt = $('.price-big .amt');
    reveal(amt, $$('.dg > span', amt), { yPercent: 115 }, { stagger: 0.1, duration: 1.2 });
    reveal(amt, $('.eur', amt), { autoAlpha: 0, scale: 0.4, rotate: -25 }, { delay: 0.35, duration: 0.8, ease: 'back.out(2)' });
    const rules = $('.rules');
    reveal(rules, $$('li', rules), { autoAlpha: 0, x: -24 }, { stagger: 0.07, delay: 0.1 });
    reveal(rules, $$('.ic', rules), { scale: 0, rotate: -90 }, { stagger: 0.07, delay: 0.25, duration: 0.6, ease: 'back.out(2.2)' });
    const printer = $('#printer');
    reveal(printer, '#receiptWrap', { yPercent: -100 }, { duration: 1.4, ease: 'power4.out', at: 0.75, onPlay: () => countTotal(1.3) });
    reveal(printer, $$('#receiptWrap .rc-line, #receiptWrap .rc-total'), { autoAlpha: 0, y: 6 }, { stagger: 0.07, delay: 0.75, duration: 0.5, at: 0.75 });

    /* --- Einsatzgebiet: Karte zoomt, Rhein zeichnet sich, Orte ploppen auf, Funkwellen aus Dormagen --- */
    const map = $('#areaMap');
    const river = $('.river', map);
    reveal(map, map, { autoAlpha: 0, scale: 0.94 }, {
      duration: 1.1,
      onPrepare: () => gsap.set(river, { strokeDasharray: 1, strokeDashoffset: 1 }),
      onPlay: () => {
        gsap.to(river, { strokeDashoffset: 0, duration: 1.8, ease: 'power2.inOut', delay: 0.2 });
        gsap.from($$('.dot:not(.home), .map-label:not(.home):not(.river-l)', map), { scale: 0, autoAlpha: 0, transformOrigin: '50% 50%', duration: 0.6, ease: 'back.out(2)', stagger: 0.08, delay: 0.6 });
      }
    });
    // Radius statt Skalierung: Die Wellen bleiben exakt auf Dormagen zentriert.
    ScrollTrigger.create({
      trigger: map, start: 'top 70%', once: true,
      onEnter: () => gsap.fromTo($$('.wave', map), { attr: { r: 9 }, opacity: 0.9 }, { attr: { r: 188 }, opacity: 0, duration: 3.2, ease: 'power2.out', stagger: { each: 1.05, repeat: 2 } })
    });
    reveal($('.zones'), '.zones .zone', { autoAlpha: 0, y: 26 }, { stagger: 0.09 });

    /* --- Über mich: Vorhang, Monogramm, Kernsatz wird beim Lesen scharf (ScrollReveal-Prinzip) --- */
    const portrait = $('.portrait');
    reveal(portrait, portrait, { clipPath: 'inset(100% 0% 0% 0% round 22px)' }, { clipPath: 'inset(0% 0% 0% 0% round 22px)', duration: 1.25, ease: 'expo.inOut', clearProps: 'clipPath' });
    reveal(portrait, $$('.monogram > span', portrait), { yPercent: 110 }, { stagger: 0.12, delay: 0.45, duration: 1.1 });
    const lead = $('.about-lead');
    ScrollTrigger.create({
      trigger: lead, start: 'top bottom+=260', once: true,
      onEnter: () => {
        if (visibleNow(lead)) return;
        splitWords(lead, 'sw');
        gsap.fromTo(lead, { rotate: 2.5, transformOrigin: '0% 50%' }, { rotate: 0, ease: 'none', scrollTrigger: { trigger: lead, start: 'top bottom', end: 'bottom 60%', scrub: true } });
        gsap.fromTo($$('.sw', lead), { opacity: 0.12, filter: 'blur(4px)' }, { opacity: 1, filter: 'blur(0px)', ease: 'none', stagger: 0.05, scrollTrigger: { trigger: lead, start: 'top 85%', end: 'bottom 55%', scrub: true } });
      }
    });
    reveal($('.facts'), '.facts > div', { autoAlpha: 0, y: 20 }, { stagger: 0.06, delay: 0.2 });

    /* --- Selbsthilfe: Panel, Bild-Vorhang, Symbole zeigen einmal ihre Bedeutung --- */
    const panel = $('.sh-panel');
    const shFig = $('.sh-photo', panel);
    const shItems = $$('.sh-list li', panel);
    reveal(panel, panel, { autoAlpha: 0, y: 60 }, { duration: 1.1 });
    reveal(panel, shFig, { clipPath: 'inset(0% 100% 0% 0%)' }, { clipPath: 'inset(0% 0% 0% 0%)', duration: 1.2, ease: 'expo.inOut', delay: 0.15, clearProps: 'clipPath' });
    reveal(panel, $('img', shFig), { scale: 1.3 }, { duration: 1.6, delay: 0.15 });
    reveal(panel, shItems, { autoAlpha: 0, y: 26 }, {
      stagger: 0.09, delay: 0.3,
      onPlay: () => shItems.forEach((li, i) => setTimeout(() => { li.classList.add('fx'); setTimeout(() => li.classList.remove('fx'), 900); }, 550 + i * 130))
    });

    /* --- FAQ, Kontakt, Fuß --- */
    const faqList = $('.faq-list');
    reveal(faqList, $$('.faq-item', faqList), { autoAlpha: 0, y: 24 }, { stagger: 0.06 });
    const contactCard = $('.contact-card');
    reveal(contactCard, contactCard, { autoAlpha: 0, y: 80 }, { duration: 1.1 });
    reveal(contactCard, $$('.direct li', contactCard), { autoAlpha: 0, x: -24 }, { stagger: 0.08, delay: 0.3 });
    reveal(contactCard, Array.from(form.children).filter((c) => !c.hidden), { autoAlpha: 0, y: 20 }, { stagger: 0.05, delay: 0.25 });
    reveal($('.foot-in'), '.foot-in', { autoAlpha: 0, y: 20, filter: 'blur(6px)' }, { duration: 1 });

    /* --- Magnet-Prinzip: Telefon-Knopf im Hero und „Weiter" folgen der Maus ein Stück.
           „Anfrage senden" oben rechts und „Anfrage vorbereiten" bleiben bewusst statisch. --- */
    if (finePointer) {
      const mags = $$('.hero-actions .btn-primary, #starterGo').map((el) => ({ el, inside: false }));
      window.addEventListener('pointermove', (e) => {
        mags.forEach((m) => {
          const r = m.el.getBoundingClientRect();
          const cx = r.left + r.width / 2;
          const cy = r.top + r.height / 2;
          const inside = Math.abs(e.clientX - cx) < r.width / 2 + 40 && Math.abs(e.clientY - cy) < r.height / 2 + 40;
          if (!inside && !m.inside) return;
          m.inside = inside;
          gsap.to(m.el, {
            '--mx': inside ? `${(e.clientX - cx) / 4}px` : '0px',
            '--my': inside ? `${(e.clientY - cy) / 4}px` : '0px',
            duration: inside ? 0.35 : 0.8, ease: inside ? 'power3.out' : 'elastic.out(1, 0.5)', overwrite: 'auto'
          });
        });
      }, { passive: true });
    }

    document.fonts.ready.then(() => { measureRows(); ScrollTrigger.refresh(); });
    window.addEventListener('load', () => ScrollTrigger.refresh());
  }
})();
