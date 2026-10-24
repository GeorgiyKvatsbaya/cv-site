// Progressive enhancements only — the site works without this file.

// Email links: address is stored reversed + base64 in data-e.
document.querySelectorAll('[data-e]').forEach((a) => {
  const email = [...atob(a.dataset.e)].reverse().join('');
  a.href = `mailto:${email}`;
  const sub = a.querySelector('.sub');
  if (sub) sub.textContent = email;
});

// Theme toggle: system → light → dark. The inline <head> script applies the saved choice before paint.
const toggle = document.querySelector('.theme-toggle');
if (toggle) {
  const root = document.documentElement;
  const order = ['auto', 'light', 'dark'];
  const metas = [...document.querySelectorAll('meta[name="theme-color"]')];
  const original = metas.map((m) => m.content);
  const apply = (mode) => {
    if (mode === 'auto') delete root.dataset.theme;
    else root.dataset.theme = mode;
    metas.forEach((m, i) => { m.content = mode === 'auto' ? original[i] : mode === 'dark' ? '#0d0f13' : '#f6f7f9'; });
    toggle.dataset.mode = mode;
    const label = toggle.dataset[`label${mode[0].toUpperCase()}${mode.slice(1)}`];
    toggle.setAttribute('aria-label', label);
    toggle.title = label;
  };
  let mode = root.dataset.theme || 'auto';
  apply(mode);
  toggle.addEventListener('click', () => {
    mode = order[(order.indexOf(mode) + 1) % order.length];
    apply(mode);
    try {
      if (mode === 'auto') localStorage.removeItem('theme');
      else localStorage.setItem('theme', mode);
    } catch {}
  });
}

// CV downloads → virtual pageview in Vercel Web Analytics (custom events need the Pro plan).
document.querySelectorAll('[data-track]').forEach((a) => {
  a.addEventListener('click', () => window.va?.('pageview', { route: a.dataset.track, path: a.dataset.track }));
});

// Reveal sections on scroll.
const items = document.querySelectorAll('.reveal');
if ('IntersectionObserver' in window) {
  const io = new IntersectionObserver((entries) => {
    entries.forEach((e) => {
      if (e.isIntersecting) { e.target.classList.add('in'); io.unobserve(e.target); }
    });
  }, { rootMargin: '0px 0px -8% 0px' });
  items.forEach((el) => io.observe(el));
} else {
  items.forEach((el) => el.classList.add('in'));
}
