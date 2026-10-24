// Progressive enhancements only — the site works without this file.

// Email links: address is stored reversed + base64 in data-e.
document.querySelectorAll('[data-e]').forEach((a) => {
  const email = [...atob(a.dataset.e)].reverse().join('');
  a.href = `mailto:${email}`;
  const sub = a.querySelector('.sub');
  if (sub) sub.textContent = email;
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
