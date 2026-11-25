/* DOM smoke tests for index.html + index.js (jsdom).
   Covers the theme init, the price calculator (first hour in full, then
   15-minute steps at 9,75 €), its limits, remote mode and the DE/EN switch.
   Runs without GSAP/Lenis (external scripts are not loaded), so it also
   checks the static fallback.
   Lives under .github/ so Caddy never serves it (dot paths are blocked).
   Run (CI or locally): npm install --no-save jsdom@25 && node .github/tests/dom.test.js */
'use strict';

const { JSDOM, VirtualConsole } = require('jsdom');
const fs = require('fs');
const path = require('path');

const ROOT = path.resolve(__dirname, '..', '..');
const html = fs.readFileSync(path.join(ROOT, 'index.html'), 'utf8');
const themeInit = fs.readFileSync(path.join(ROOT, 'assets', 'theme-init.js'), 'utf8');
const js = fs.readFileSync(path.join(ROOT, 'index.js'), 'utf8');

const errors = [];
const virtualConsole = new VirtualConsole();
virtualConsole.on('jsdomError', (e) => { errors.push(e.message); console.error(e); });
virtualConsole.on('error', (...a) => { errors.push(a.join(' ')); console.error(...a); });

// External <script src> tags (vendor libs, theme-init, index.js) are removed;
// theme-init.js and index.js are injected below in page order.
const dom = new JSDOM(html.replace(/<script src="[^"]+"[^>]*><\/script>/g, ''), {
  virtualConsole,
  url: 'https://rxf-sys.de/',
  runScripts: 'dangerously',
  pretendToBeVisual: true,
  beforeParse(window) {
    // jsdom has no matchMedia: report "no dark mode, no reduced motion, no fine pointer"
    window.matchMedia = (q) => ({
      matches: false, media: q,
      addEventListener() {}, removeEventListener() {},
      addListener() {}, removeListener() {},
    });
  },
});
const { window } = dom;
const { document } = window;

let pass = 0, fail = 0;
function check(name, cond) {
  if (cond) { pass++; console.log('  ✓', name); }
  else { fail++; console.log('  ✗', name); }
}
function run(code) {
  const s = document.createElement('script');
  s.textContent = code;
  document.body.appendChild(s);
}
// Intl puts a no-break space before the euro sign; compare on normal spaces
const text = (sel) => document.querySelector(sel).textContent.replace(/\s+/g, ' ').trim();
const click = (sel, n = 1) => { for (let i = 0; i < n; i++) document.querySelector(sel).click(); };

console.log('== Theme init ==');
run(themeInit);
check('html.js is set', document.documentElement.classList.contains('js'));
check('data-theme is light without a stored choice', document.documentElement.dataset.theme === 'light');

console.log('== Script start ==');
run(js);
check('index.js runs without errors', errors.length === 0);
check('static fallback: html.motion is not set without GSAP', !document.documentElement.classList.contains('motion'));

console.log('== Price calculator ==');
check('starts at 1 h 15 min', text('#rcDur') === '1 Std. 15 Min.');
check('75 min cost 48,75 €', text('#rcTotal') === '48,75 €');
check('one extra step is listed', !document.querySelector('#rcExtraRow').hidden && text('#rcExtraLabel') === '1 × 15 Min. à 9,75 €');

click('#rcMinus');
check('60 min cost 39,00 €', text('#rcDur') === '1 Std.' && text('#rcTotal') === '39,00 €');
check('no extra row at one hour', document.querySelector('#rcExtraRow').hidden);

click('#rcMinus', 3);
check('15 min are the lower limit', text('#rcDur') === '15 Min.' && document.querySelector('#rcMinus').disabled);
check('the first hour is billed in full below 60 min', text('#rcTotal') === '39,00 €' && text('#rcFirstLabel') === 'Arbeitszeit (15 Min., erste Stunde voll)');

click('#rcPlus', 7);
check('2 h cost 78,00 €', text('#rcDur') === '2 Std.' && text('#rcTotal') === '78,00 €');
click('#rcPlus', 2);
check('2 h 30 min cost 97,50 €', text('#rcDur') === '2 Std. 30 Min.' && text('#rcTotal') === '97,50 €');

check('on site: travel within Dormagen costs 0,00 €', text('#rcTravelLabel') === 'Anfahrt in Dormagen' && text('#rcTravel') === '0,00 €');
const remote = document.querySelector('#rc-mode-remote');
remote.checked = true;
remote.dispatchEvent(new window.Event('change', { bubbles: true }));
check('remote: no travel', text('#rcTravelLabel') === 'Anfahrt (Fernwartung)' && text('#rcTravel') === 'entfällt');
check('remote does not change the total', text('#rcTotal') === '97,50 €');

click('#rcPlus', 40);
check('8 h are the upper limit', text('#rcDur') === '8 Std.' && document.querySelector('#rcPlus').disabled);
check('8 h cost 312,00 €', text('#rcTotal') === '312,00 €');

console.log('== Language ==');
click('#langBtn');
check('html lang switches to en', document.documentElement.getAttribute('lang') === 'en');
check('calculator re-renders in English', text('#rcDur') === '8 h' && text('#rcTotal') === '€312.00');
check('travel label follows the language', text('#rcTravelLabel') === 'Travel (remote support)' && text('#rcTravel') === 'none');
click('#langBtn');
check('back to German', document.documentElement.getAttribute('lang') === 'de' && text('#rcTotal') === '312,00 €');

check('no errors during the run', errors.length === 0);

console.log(`\n${pass} passed, ${fail} failed`);
process.exit(fail ? 1 : 0);
