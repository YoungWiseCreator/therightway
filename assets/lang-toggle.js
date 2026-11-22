/* Language switch — DEPLOY 2026-11-21.
   The actual translation is done by the per-page i18n walker injected at
   build time (full-stack/i18n_build.py): each page carries positionally
   aligned translation arrays for es|fr|pt|ru|zh|he and the walker swaps
   text nodes when a .lang-btn is clicked (persisted as localStorage
   "nmt_lang"). The old keyed-chrome TABLES IIFE that used to live here was
   removed in this deploy — it only ever translated 14 nav/hero strings,
   which is why the switcher appeared dead. What remains below is the
   dropdown re-housing from the Stitch transplant (dropdown-only control,
   fleet law), which presents the same .lang-btn buttons the walker binds. */

/* STITCH TRANSPLANT 2026-11-21 — language switch becomes a click-to-open
   DROPDOWN (Cameron toggle-form law 2026-11-21 12:46 EST). The existing
   .lang-btn buttons keep their classes, data-lang values, order and click
   handlers; they are only re-housed inside a menu that opens on click.
   The toggle button carries data-i18n-skip so text-node translation
   walkers never count it. */
document.addEventListener('DOMContentLoaded', function () {
  var sw = document.querySelector('.lang-switch');
  if (!sw || sw.classList.contains('lang-dropdown')) return;
  sw.classList.add('lang-dropdown');
  var menu = document.createElement('span');
  menu.className = 'lang-menu';
  Array.prototype.slice.call(sw.querySelectorAll('.lang-btn')).forEach(function (b) { menu.appendChild(b); });
  var toggle = document.createElement('button');
  toggle.type = 'button';
  toggle.className = 'lang-toggle';
  toggle.setAttribute('aria-haspopup', 'true');
  toggle.setAttribute('aria-expanded', 'false');
  toggle.setAttribute('data-i18n-skip', '');
  toggle.setAttribute('aria-label', 'Choose language');
  function label() {
    var a = sw.querySelector('.lang-btn.active');
    toggle.textContent = (a ? a.textContent : 'EN') + ' \u25BE';
  }
  label();
  toggle.addEventListener('click', function (e) {
    e.stopPropagation();
    var open = sw.classList.toggle('open');
    toggle.setAttribute('aria-expanded', open ? 'true' : 'false');
  });
  document.addEventListener('click', function (e) {
    if (!sw.contains(e.target)) { sw.classList.remove('open'); toggle.setAttribute('aria-expanded', 'false'); }
  });
  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape') { sw.classList.remove('open'); toggle.setAttribute('aria-expanded', 'false'); }
  });
  menu.addEventListener('click', function () {
    sw.classList.remove('open');
    toggle.setAttribute('aria-expanded', 'false');
    setTimeout(label, 0);
  });
  sw.appendChild(toggle);
  sw.appendChild(menu);
});
