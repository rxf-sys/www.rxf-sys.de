/* =============================================================
   rxf-sys.de — Welcome Hub · Motion & Interactions
   ============================================================= */

(() => {
  'use strict';

  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const $  = (s, r = document) => r.querySelector(s);
  const $$ = (s, r = document) => Array.from(r.querySelectorAll(s));

  // ============== YEAR + ANCHOR SMOOTH SCROLL ==============
  const yearEl = $('#year');
  if (yearEl) yearEl.textContent = String(new Date().getFullYear());

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

  // ============== BOOT SEQUENCE ==============
  const boot = $('#boot');
  const bootLines = $('#bootLines');
  const bootSkip = $('#bootSkip');

  const seq = [
    { tag: 'BOOT', tagClass: '', text: 'rxf-sys daemon starting…' },
    { tag: 'INIT', tagClass: 'info', text: 'loading service registry · 3 entries' },
    { tag: ' OK ', tagClass: 'ok',   text: 'portfolio.rxf-sys.de · listening on :443' },
    { tag: ' OK ', tagClass: 'ok',   text: 'admin.rxf-sys.de · Cloudflare Access · verified' },
    { tag: 'WAIT', tagClass: 'warn', text: 'lab.rxf-sys.de · staging · not yet public' },
    { tag: ' OK ', tagClass: 'ok',   text: 'cloudflare tunnel · 4 hostnames · healthy' },
    { tag: ' OK ', tagClass: 'ok',   text: 'proxmox host · 99.98% uptime · ready' },
    { tag: 'DONE', tagClass: 'acc',  text: 'welcome ↵' },
  ];

  let bootCancelled = false;
  function endBoot() {
    if (!boot) return;
    boot.classList.add('boot--done');
    document.body.classList.add('booted');
    setTimeout(() => boot && boot.remove(), 700);
  }
  function runBoot() {
    if (!boot || !bootLines) { endBoot(); return; }
    if (reduceMotion || sessionStorage.getItem('rxf-booted') === '1') {
      endBoot();
      return;
    }
    sessionStorage.setItem('rxf-booted', '1');

    seq.forEach((line, i) => {
      const el = document.createElement('div');
      el.className = 'boot-line';
      el.innerHTML = `<span class="arrow">›</span><span class="tag ${line.tagClass}">[${line.tag}]</span> ${line.text}`;
      bootLines.appendChild(el);
      setTimeout(() => {
        if (bootCancelled) return;
        // Remove cursor from prior line, attach to this one
        bootLines.querySelectorAll('.boot-line.cursor-host').forEach((n) => n.classList.remove('cursor-host'));
        el.classList.add('in', 'cursor-host');
        if (i === seq.length - 1) {
          setTimeout(endBoot, 600);
        }
      }, 130 + i * 160);
    });
  }
  if (bootSkip) bootSkip.addEventListener('click', () => { bootCancelled = true; endBoot(); });

  // Defer boot to next tick so CSS is applied (setTimeout works even when iframe is hidden)
  setTimeout(runBoot, 0);

  // ============== HERO TITLE — CHAR REVEAL (Web Animations API · runs reliably in hidden iframes) ==============
  const charEase = 'cubic-bezier(.2,.8,.2,1)';
  function splitChars(el, baseDelay = 0) {
    if (!el) return;
    const text = el.dataset.text || el.textContent;
    el.textContent = '';
    [...text].forEach((ch, i) => {
      const span = document.createElement('span');
      span.className = 'char' + (ch === ' ' ? ' space' : '');
      span.textContent = ch === ' ' ? '\u00A0' : ch;
      el.appendChild(span);
      if (reduceMotion) {
        span.classList.add('in');
      } else {
        // Stage the element invisible immediately, then animate via WAA
        span.classList.add('in'); // sets the visible final state
        span.animate(
          [
            { opacity: 0, transform: 'translateY(0.3em)' },
            { opacity: 1, transform: 'translateY(0)' },
          ],
          { duration: 700, delay: baseDelay + i * 25, easing: charEase, fill: 'backwards' }
        );
      }
    });
  }
  $$('.split').forEach((el) => {
    const delay = parseInt(el.dataset.delay || '0', 10);
    splitChars(el, delay);
  });

  // Reveal lede, hero-meta, live-ticker via WAA
  function revealAt(selector, delay) {
    const el = $(selector);
    if (!el) return;
    el.classList.add('in');
    if (reduceMotion) return;
    el.animate(
      [
        { opacity: 0, transform: 'translateY(8px)' },
        { opacity: 1, transform: 'translateY(0)' },
      ],
      { duration: 800, delay, easing: 'ease', fill: 'backwards' }
    );
  }
  revealAt('.hero .lede', 900);
  revealAt('.hero .hero-meta', 1100);
  revealAt('.hero .live-ticker', 1400);
  const dreiWord = $('.word--drei');
  if (dreiWord) {
    dreiWord.classList.add('bar-in');
    if (!reduceMotion) {
      // animate the underline pseudo via the class — pseudo can't be animated directly,
      // but we can use the transition on ::after via class toggle. As a fallback in case
      // transitions don't tick in a hidden tab, also animate the word's CSS var driving the bar.
      // For now, rely on the class toggle (no pseudo WAA needed since the bar is decorative).
    }
  }

  // ============== CURSOR SPOTLIGHT ==============
  let rafSpot = null;
  let lastSpotX = 0.5, lastSpotY = 0.3;
  window.addEventListener('pointermove', (e) => {
    lastSpotX = e.clientX / window.innerWidth;
    lastSpotY = e.clientY / window.innerHeight;
    if (rafSpot) return;
    rafSpot = requestAnimationFrame(() => {
      document.documentElement.style.setProperty('--mx', `${(lastSpotX * 100).toFixed(2)}%`);
      document.documentElement.style.setProperty('--my', `${(lastSpotY * 100).toFixed(2)}%`);
      rafSpot = null;
    });
  }, { passive: true });

  // ============== SCROLL PROGRESS ==============
  const sp = $('#scrollProgress');
  if (sp) {
    let rafSp = null;
    const updateSp = () => {
      const h = document.documentElement;
      const max = h.scrollHeight - h.clientHeight;
      const pct = max > 0 ? (h.scrollTop / max) * 100 : 0;
      sp.style.width = `${pct}%`;
      rafSp = null;
    };
    window.addEventListener('scroll', () => {
      if (!rafSp) rafSp = requestAnimationFrame(updateSp);
    }, { passive: true });
    updateSp();
  }

  // ============== CONSTELLATION BACKDROP ==============
  function buildConstellation() {
    const svg = $('#constellation');
    if (!svg) return;
    const W = 1600, H = 900;
    svg.setAttribute('viewBox', `0 0 ${W} ${H}`);
    svg.setAttribute('preserveAspectRatio', 'xMidYMid slice');

    // Seeded random for stable layout
    let s = 19821;
    const rand = () => { s = (s * 9301 + 49297) % 233280; return s / 233280; };

    const N = 28;
    const nodes = [];
    for (let i = 0; i < N; i++) {
      // Avoid the central focus area for hero text
      let x, y, attempts = 0;
      do {
        x = rand() * W;
        y = rand() * H;
        attempts++;
      } while (attempts < 20 && Math.abs(x - W / 2) < 200 && Math.abs(y - H / 2) < 180);
      nodes.push({ x, y, r: 1.4 + rand() * 1.6 });
    }

    // Build links (Delaunay-lite: connect each node to its 2 nearest neighbours)
    const links = [];
    nodes.forEach((n, i) => {
      const dists = nodes
        .map((m, j) => ({ j, d: (m.x - n.x) ** 2 + (m.y - n.y) ** 2 }))
        .filter((o) => o.j !== i)
        .sort((a, b) => a.d - b.d)
        .slice(0, 2);
      dists.forEach((o) => {
        const a = Math.min(i, o.j), b = Math.max(i, o.j);
        if (!links.find((l) => l.a === a && l.b === b)) links.push({ a, b });
      });
    });

    // Render
    const ns = 'http://www.w3.org/2000/svg';
    const linksG = document.createElementNS(ns, 'g');
    const nodesG = document.createElementNS(ns, 'g');
    const packetsG = document.createElementNS(ns, 'g');
    svg.appendChild(linksG);
    svg.appendChild(nodesG);
    svg.appendChild(packetsG);

    links.forEach((l) => {
      const a = nodes[l.a], b = nodes[l.b];
      const line = document.createElementNS(ns, 'line');
      line.setAttribute('class', 'link');
      line.setAttribute('x1', a.x); line.setAttribute('y1', a.y);
      line.setAttribute('x2', b.x); line.setAttribute('y2', b.y);
      linksG.appendChild(line);
    });

    nodes.forEach((n) => {
      const c = document.createElementNS(ns, 'circle');
      c.setAttribute('class', 'node');
      c.setAttribute('cx', n.x); c.setAttribute('cy', n.y);
      c.setAttribute('r', n.r);
      nodesG.appendChild(c);
    });

    if (reduceMotion) return;

    // Animated packets — pick random links and animate dots traveling along
    const packetCount = 6;
    for (let i = 0; i < packetCount; i++) {
      const p = document.createElementNS(ns, 'circle');
      p.setAttribute('class', 'packet');
      p.setAttribute('r', 1.8);
      packetsG.appendChild(p);
      animatePacket(p, links, nodes, i * 800);
    }
  }
  function animatePacket(el, links, nodes, delay = 0) {
    function step() {
      const link = links[Math.floor(Math.random() * links.length)];
      const a = nodes[link.a], b = nodes[link.b];
      const dur = 2200 + Math.random() * 1800;
      const startT = performance.now();
      const reverse = Math.random() < 0.5;
      const from = reverse ? b : a;
      const to   = reverse ? a : b;
      function frame(now) {
        const t = Math.min(1, (now - startT) / dur);
        const ease = t < 0.5 ? 2 * t * t : 1 - Math.pow(-2 * t + 2, 2) / 2;
        const x = from.x + (to.x - from.x) * ease;
        const y = from.y + (to.y - from.y) * ease;
        el.setAttribute('cx', x);
        el.setAttribute('cy', y);
        el.style.opacity = t < 0.1 ? t * 10 : t > 0.9 ? (1 - t) * 10 : 1;
        if (t < 1) requestAnimationFrame(frame);
        else setTimeout(step, 200 + Math.random() * 600);
      }
      requestAnimationFrame(frame);
    }
    setTimeout(step, delay);
  }
  buildConstellation();

  // ============== HUB CARDS — 3D TILT + SHEEN ==============
  const tiltCards = $$('.hub-card:not(.hub-card--soon)');
  tiltCards.forEach((card) => {
    let raf = null;
    let sweepAngle = 0;
    let sweepRaf = null;
    let hovered = false;

    function spinSweep() {
      if (!hovered) { sweepRaf = null; return; }
      sweepAngle = (sweepAngle + 1.2) % 360;
      card.style.setProperty('--sweep', `${sweepAngle}deg`);
      sweepRaf = requestAnimationFrame(spinSweep);
    }

    card.addEventListener('pointerenter', () => {
      hovered = true;
      if (!sweepRaf && !reduceMotion) sweepRaf = requestAnimationFrame(spinSweep);
    });
    card.addEventListener('pointermove', (e) => {
      if (reduceMotion) return;
      const rect = card.getBoundingClientRect();
      const px = (e.clientX - rect.left) / rect.width;
      const py = (e.clientY - rect.top) / rect.height;
      if (raf) return;
      raf = requestAnimationFrame(() => {
        const ry = (px - 0.5) * 8;    // rotateY
        const rx = (0.5 - py) * 8;    // rotateX
        card.style.setProperty('--tx', `${ry.toFixed(2)}deg`);
        card.style.setProperty('--ty', `${rx.toFixed(2)}deg`);
        card.style.setProperty('--gx', `${(px * 100).toFixed(1)}%`);
        card.style.setProperty('--gy', `${(py * 100).toFixed(1)}%`);
        raf = null;
      });
    });
    card.addEventListener('pointerleave', () => {
      hovered = false;
      card.style.setProperty('--tx', `0deg`);
      card.style.setProperty('--ty', `0deg`);
    });
  });

  // ============== SPARKLINES IN HUB CARDS ==============
  function drawSpark(svg, points, seed = 1) {
    const W = 100, H = 28;
    svg.setAttribute('viewBox', `0 0 ${W} ${H}`);
    svg.setAttribute('preserveAspectRatio', 'none');
    const step = W / (points - 1);
    let s = seed;
    const rand = () => { s = (s * 9301 + 49297) % 233280; return s / 233280; };
    const ys = [];
    let prev = H * 0.5;
    for (let i = 0; i < points; i++) {
      prev += (rand() - 0.5) * 8;
      prev = Math.max(4, Math.min(H - 4, prev));
      ys.push(prev);
    }
    const pathD = ys.map((y, i) => `${i === 0 ? 'M' : 'L'} ${(i * step).toFixed(1)} ${y.toFixed(1)}`).join(' ');
    const areaD = pathD + ` L ${W} ${H} L 0 ${H} Z`;
    svg.innerHTML = `
      <defs>
        <linearGradient id="sparkGrad${seed}" x1="0" x2="0" y1="0" y2="1">
          <stop offset="0%" stop-color="var(--accent)" stop-opacity=".5"/>
          <stop offset="100%" stop-color="var(--accent)" stop-opacity="0"/>
        </linearGradient>
      </defs>
      <path class="area" d="${areaD}" fill="url(#sparkGrad${seed})"/>
      <path class="line" d="${pathD}"/>
    `;
  }
  $$('.hub-spark-svg').forEach((svg, i) => drawSpark(svg, 24, 17 + i * 7));

  // ============== STATS COUNT-UP ==============
  function animateCountUp(el, to, opts = {}) {
    if (reduceMotion) { el.textContent = formatNum(to, opts); return; }
    const dur = opts.duration || 1400;
    const start = performance.now();
    const from = 0;
    function frame(now) {
      const t = Math.min(1, (now - start) / dur);
      const eased = 1 - Math.pow(1 - t, 3);
      const v = from + (to - from) * eased;
      el.textContent = formatNum(v, opts);
      if (t < 1) requestAnimationFrame(frame);
      else el.textContent = formatNum(to, opts);
    }
    requestAnimationFrame(frame);
  }
  function formatNum(v, opts) {
    if (opts.decimals != null) return v.toFixed(opts.decimals);
    if (opts.integer) return Math.round(v).toLocaleString('de-DE');
    return Math.round(v).toString();
  }

  const io = ('IntersectionObserver' in window)
    ? new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          const el = entry.target;
          const to = parseFloat(el.dataset.to);
          const dec = el.dataset.decimals != null ? parseInt(el.dataset.decimals, 10) : null;
          const integer = el.dataset.integer === '1';
          animateCountUp(el, to, { decimals: dec, integer });
          io.unobserve(el);
        });
      }, { threshold: 0.4 })
    : null;
  $$('[data-count]').forEach((el) => {
    if (io) io.observe(el);
    else el.textContent = formatNum(parseFloat(el.dataset.to), {
      decimals: el.dataset.decimals != null ? parseInt(el.dataset.decimals, 10) : null,
      integer: el.dataset.integer === '1',
    });
  });

  // ============== MAGNETIC BUTTON ==============
  $$('[data-magnetic]').forEach((btn) => {
    let raf = null;
    btn.addEventListener('pointermove', (e) => {
      if (reduceMotion) return;
      const r = btn.getBoundingClientRect();
      const x = e.clientX - (r.left + r.width / 2);
      const y = e.clientY - (r.top + r.height / 2);
      if (raf) return;
      raf = requestAnimationFrame(() => {
        btn.style.transform = `translate(${(x * 0.18).toFixed(1)}px, ${(y * 0.18).toFixed(1)}px)`;
        raf = null;
      });
    });
    btn.addEventListener('pointerleave', () => {
      btn.style.transform = '';
    });
  });

  // ============== THEME TOGGLE ==============
  const themeBtn = $('#themeToggle');
  function applyTheme(theme) {
    document.documentElement.dataset.theme = theme;
    try { localStorage.setItem('rxf-theme', theme); } catch (e) {}
    if (themeBtn) {
      themeBtn.innerHTML = theme === 'light'
        ? '<i class="fas fa-moon" aria-hidden="true"></i>'
        : '<i class="fas fa-sun" aria-hidden="true"></i>';
      themeBtn.setAttribute('aria-label', theme === 'light' ? 'Dunkles Theme aktivieren' : 'Helles Theme aktivieren');
    }
  }
  let initialTheme = 'dark';
  try {
    initialTheme = localStorage.getItem('rxf-theme') ||
      (window.matchMedia('(prefers-color-scheme: light)').matches ? 'light' : 'dark');
  } catch (e) {}
  applyTheme(initialTheme);
  if (themeBtn) themeBtn.addEventListener('click', () => {
    applyTheme(document.documentElement.dataset.theme === 'light' ? 'dark' : 'light');
  });

  // ============== LIVE CLOCK (Dormagen / Europe/Berlin) ==============
  const clock = $('#liveClock');
  if (clock) {
    const fmt = new Intl.DateTimeFormat('de-DE', {
      hour: '2-digit', minute: '2-digit', second: '2-digit',
      timeZone: 'Europe/Berlin', hour12: false,
    });
    const tick = () => {
      clock.textContent = fmt.format(new Date()) + ' MEZ';
    };
    tick();
    setInterval(tick, 1000);
  }

})();
