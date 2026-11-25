/* Sets the theme before first paint (loaded render-blocking in <head>).
   Lives in its own file so the CSP can forbid inline scripts. */
(function () {
  document.documentElement.classList.add('js');
  try {
    var t = localStorage.getItem('rxf-theme');
    if (!t) t = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
    document.documentElement.dataset.theme = t;
  } catch (e) { document.documentElement.dataset.theme = 'light'; }
})();
