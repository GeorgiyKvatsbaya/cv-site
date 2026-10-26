// HTML templates. Every function takes a render context:
//   { site, lang, page, t, icon, asset, isTodo }
// built in build.mjs.

export const LANGS = ['en', 'ru'];
export const PAGES = ['home', 'experience', 'projects', 'stack'];

const UI = {
  nav: { home: { en: 'Home', ru: 'Главная' }, experience: { en: 'Experience', ru: 'Опыт' }, projects: { en: 'Projects', ru: 'Проекты' }, stack: { en: 'Stack', ru: 'Стек' } },
  cv: { en: 'Download CV', ru: 'Скачать CV' },
  emailMe: { en: 'Email me', ru: 'Написать' },
  about: { en: 'about', ru: 'о себе' },
  stack: { en: 'stack', ru: 'стек' },
  fullStack: { en: 'full stack', ru: 'весь стек' },
  links: { en: 'links', ru: 'ссылки' },
  projectsTitle: { en: 'Projects', ru: 'Проекты' },
  projectsSub: { en: 'things I built outside work', ru: 'что я сделал вне работы' },
  openSite: { en: 'Open site', ru: 'Открыть сайт' },
  sourceCode: { en: 'Source code', ru: 'Исходный код' },
  contact: { en: 'contact', ru: 'контакты' },
  experienceTitle: { en: 'Experience', ru: 'Опыт' },
  experienceSub: { en: 'where I worked and what I shipped', ru: 'где работал и что сделал' },
  education: { en: 'education', ru: 'образование' },
  languages: { en: 'languages', ru: 'языки' },
  stackTitle: { en: 'Stack', ru: 'Стек' },
  stackSub: { en: 'tools I use day to day', ru: 'инструменты, с которыми работаю каждый день' },
  years: { en: 'yrs', ru: 'лет' },
  langLabel: { en: 'Language', ru: 'Язык' },
  theme: {
    auto: { en: 'Theme: system (click for light)', ru: 'Тема: как в системе (нажмите — светлая)' },
    light: { en: 'Theme: light (click for dark)', ru: 'Тема: светлая (нажмите — тёмная)' },
    dark: { en: 'Theme: dark (click for system)', ru: 'Тема: тёмная (нажмите — как в системе)' },
  },
  navLabel: { en: 'sections', ru: 'разделы' },
  notFound: { en: 'Page not found', ru: 'Страница не найдена' },
  backHome: { en: 'Back to home', ru: 'На главную' },
  description: {
    en: (name, role) => `${name} — ${role}. Experience, stack and contacts.`,
    ru: (name, role) => `${name} — ${role}. Опыт, стек и контакты.`,
  },
};

const esc = (s) =>
  String(s ?? '').replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' })[c]);

export const pagePath = (lang, page) =>
  (lang === 'en' ? '/' : `/${lang}/`) + (page === 'home' ? '' : `${page}/`);

const ui = (ctx, key) => ctx.t(UI[key]);

// ── Built-in line icons (not brands) ───────────────────────────
const LINE = {
  arrow: '<polyline points="9 6 15 12 9 18"/>',
  auto: '<rect x="3" y="4" width="18" height="12" rx="2"/><path d="M8 20h8M12 16v4"/>',
  sun: '<circle cx="12" cy="12" r="4"/><path d="M12 2v2M12 20v2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M2 12h2M20 12h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4"/>',
  moon: '<path d="M21 12.8A9 9 0 1 1 11.2 3a7 7 0 0 0 9.8 9.8z"/>',
  download: '<path d="M12 3v12"/><polyline points="7 10 12 15 17 10"/><path d="M5 21h14"/>',
  external: '<path d="M14 4h6v6"/><path d="M20 4l-9 9"/><path d="M19 14v5a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1V6a1 1 0 0 1 1-1h5"/>',
  mail: '<rect x="3" y="5" width="18" height="14" rx="2"/><polyline points="3 7 12 13 21 7"/>',
};
export const line = (name, size = 18) =>
  `<svg class="line" width="${size}" height="${size}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${LINE[name]}</svg>`;

// Brand glyph or text badge fallback: "dbt", "SQL", "Monte Carlo" → "MC", "Tableau" → "T".
const glyph = (ctx, slug, name) => {
  const ic = ctx.icon(slug);
  if (ic) return ic.svg;
  const words = name.trim().split(/\s+/);
  const abbr = words.length > 1 ? words.map((w) => w[0]).join('').slice(0, 3).toUpperCase()
    : name.length <= 4 ? name : name[0].toUpperCase();
  return `<span class="badge-glyph" data-len="${abbr.length}" aria-hidden="true">${esc(abbr)}</span>`;
};
const brandStyle = (ctx, slug) => {
  const ic = ctx.icon(slug);
  return ic?.hex ? ` style="--brand:#${ic.hex}"` : '';
};

// ── Email (kept out of the HTML as plain text) ────────────────
const encodeEmail = (email) => Buffer.from([...email].reverse().join('')).toString('base64');
const noscriptEmail = (email) => esc(email.replace('@', ' [at] '));

// ── Layout ────────────────────────────────────────────────────
export function layout(ctx, { title, body, page }) {
  const { site, lang } = ctx;
  const name = ctx.t(site.profile.name);
  const role = ctx.t(site.profile.role);
  const desc = UI.description[lang](name, role);
  const url = (l) => site.siteUrl + (page ? pagePath(l, page) : '/');
  const alternates = page
    ? LANGS.map((l) => `<link rel="alternate" hreflang="${l}" href="${url(l)}">`).join('\n  ') +
      `\n  <link rel="alternate" hreflang="x-default" href="${url('en')}">`
    : '';

  return `<!doctype html>
<html lang="${lang}">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover">
  <meta name="theme-color" content="#0d0f13" media="(prefers-color-scheme: dark)">
  <meta name="theme-color" content="#f6f7f9" media="(prefers-color-scheme: light)">
  <meta name="color-scheme" content="dark light">
  <title>${esc(title)}</title>
  <meta name="description" content="${esc(desc)}">
  ${page ? `<link rel="canonical" href="${url(lang)}">\n  ${alternates}` : '<meta name="robots" content="noindex">'}
  <meta property="og:title" content="${esc(title)}">
  <meta property="og:description" content="${esc(desc)}">
  <meta property="og:type" content="website">
  <meta property="og:locale" content="${lang === 'ru' ? 'ru_RU' : 'en_US'}">
  ${page ? `<meta property="og:url" content="${url(lang)}">` : ''}
  ${ogImageTags(ctx, title)}
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap" rel="stylesheet">
  <link rel="icon" href="/favicon.svg" type="image/svg+xml">
  <link rel="stylesheet" href="${ctx.asset('style.css')}">
  <script>document.documentElement.classList.add('js');try{var t=localStorage.getItem('theme');if(t==='light'||t==='dark')document.documentElement.dataset.theme=t}catch(e){}</script>
  <script>window.va=window.va||function(){(window.vaq=window.vaq||[]).push(arguments)}</script>
  <script defer src="/_vercel/insights/script.js"></script>
  <script src="${ctx.asset('main.js')}" defer></script>
</head>
<body>
  <main>
${body}
  </main>
  <footer class="footer">© ${new Date().getFullYear()} ${esc(name)}</footer>
</body>
</html>
`;
}

// og:image / twitter:image — only when the PNG exists (generated by `npm run og`).
function ogImageTags(ctx, title) {
  const og = ctx.og(ctx.lang);
  if (!og) return '<meta name="twitter:card" content="summary">';
  const src = `${ctx.site.siteUrl}${og.path}?v=${og.hash}`;
  return `<meta property="og:image" content="${src}">
  <meta property="og:image:width" content="1200">
  <meta property="og:image:height" content="630">
  <meta property="og:image:alt" content="${esc(title)}">
  <meta name="twitter:card" content="summary_large_image">
  <meta name="twitter:image" content="${src}">`;
}

// ── Shared blocks ─────────────────────────────────────────────
function langSwitch(ctx) {
  return `<nav class="lang" aria-label="${esc(ui(ctx, 'langLabel'))}">${LANGS.map((l) =>
    l === ctx.lang
      ? `<span aria-current="true">${l.toUpperCase()}</span>`
      : `<a href="${pagePath(l, ctx.page)}" hreflang="${l}" lang="${l}">${l.toUpperCase()}</a>`
  ).join('')}</nav>`;
}

// Cycles system → light → dark; state lives in localStorage (see main.js + inline <head> script).
function themeToggle(ctx) {
  const labels = UI.theme;
  return `<button type="button" class="theme-toggle" data-mode="auto" aria-label="${esc(ctx.t(labels.auto))}" title="${esc(ctx.t(labels.auto))}"
        data-label-auto="${esc(ctx.t(labels.auto))}" data-label-light="${esc(ctx.t(labels.light))}" data-label-dark="${esc(ctx.t(labels.dark))}">${line('auto', 16).replace('class="line"', 'class="line i-auto"')}${line('sun', 16).replace('class="line"', 'class="line i-light"')}${line('moon', 16).replace('class="line"', 'class="line i-dark"')}</button>`;
}

function profileHeader(ctx, { title, tagline, avatar = true }) {
  return `    <div class="topbar">${themeToggle(ctx)}${langSwitch(ctx)}</div>
    <header class="profile">
      ${avatar ? `<div class="avatar" aria-hidden="true">${esc(ctx.site.monogram)}</div>` : ''}
      <h1>${esc(title)}</h1>
      <p class="tagline">${tagline}</p>
    </header>`;
}

function nav(ctx) {
  return `    <nav class="nav" aria-label="${esc(ui(ctx, 'navLabel'))}">
      ${PAGES.map((p) => `<a href="${pagePath(ctx.lang, p)}"${p === ctx.page ? ' aria-current="page"' : ''}>${esc(ctx.t(UI.nav[p]))}</a>`).join('\n      ')}
    </nav>`;
}

const section = (titleText, inner, extra = '') => `    <section class="section reveal"${extra}>
      <p class="section-title">${esc(titleText)}</p>
${inner}
    </section>`;

// ── Home ──────────────────────────────────────────────────────
function ctaRow(ctx) {
  const { contact } = ctx.site;
  const btns = [];
  const cv = ctx.t(contact.cv);
  if (cv && ctx.hasPublic(cv)) btns.push(`<a class="btn primary" href="${esc(cv)}" download data-track="/cv-download/${ctx.lang}">${line('download', 16)}${esc(ui(ctx, 'cv'))}</a>`);
  if (!ctx.isTodo(contact.email))
    btns.push(`<a class="btn" href="#" data-e="${encodeEmail(contact.email)}">${line('mail', 16)}${esc(ui(ctx, 'emailMe'))}</a>`);
  if (!ctx.isTodo(contact.linkedin))
    btns.push(`<a class="btn" href="${esc(contact.linkedin)}" target="_blank" rel="noopener noreferrer">${glyph(ctx, 'linkedin', 'in')}LinkedIn</a>`);
  return btns.length ? `    <div class="cta reveal">\n      ${btns.join('\n      ')}\n    </div>` : '';
}

function highlights(ctx) {
  return `      <div class="stats">
        ${ctx.site.highlights.map((h) => `<div class="stat"><span class="v">${esc(h.value)}</span><span class="k">${esc(ctx.t(h.label))}</span></div>`).join('\n        ')}
      </div>`;
}

function stackTile(ctx, item) {
  return `<li class="tile"${brandStyle(ctx, item.icon)}><span class="glyph">${glyph(ctx, item.icon, item.name)}</span><span class="label">${esc(item.name)}</span></li>`;
}

function linkCard(ctx, l) {
  const sub = l.sub ? `<span class="sub">${esc(ctx.t(l.sub))}</span>` : '';
  const inner = `<span class="icon"${brandStyle(ctx, l.icon)}>${glyph(ctx, l.icon, l.title)}</span>
          <span class="body"><span class="title">${esc(l.title)}</span>${sub}</span>
          ${line('arrow')}`;
  if (l.email) {
    const email = ctx.site.contact.email;
    if (ctx.isTodo(email)) return '';
    return `<a class="card" href="#" data-e="${encodeEmail(email)}">
          ${inner}
        </a><noscript><p class="note">${noscriptEmail(email)}</p></noscript>`;
  }
  if (ctx.isTodo(l.url)) return '';
  return `<a class="card" href="${esc(l.url)}" target="_blank" rel="noopener noreferrer">
          ${inner}
        </a>`;
}

// Screenshot (light/dark pair, CSS shows the one matching the theme) + summary, bullets, stack, links.
function projectCard(ctx, p) {
  const url = ctx.t(p.url);
  const ext = 'target="_blank" rel="noopener noreferrer"';
  const img = (src, cls) => src && ctx.hasPublic(src)
    ? `<img class="${cls}" src="${esc(src)}" alt="" width="1280" height="800" loading="lazy" decoding="async">` : '';
  const shots = img(p.image, 'light') + img(p.imageDark, 'dark');
  return `<article class="project">
        ${shots ? `<a class="shot" href="${esc(url)}" ${ext} tabindex="-1" aria-hidden="true">${shots}</a>` : ''}
        <div class="project-body">
          <h3><a href="${esc(url)}" ${ext}>${esc(p.name)}</a></h3>
          <p class="lead">${esc(ctx.t(p.summary))}</p>
          ${p.bullets?.length ? `<ul class="bullets">\n            ${p.bullets.map((b) => `<li>${esc(ctx.t(b))}</li>`).join('\n            ')}\n          </ul>` : ''}
          ${p.stack?.length ? `<p class="chips">${p.stack.map((s) => `<span class="chip">${esc(s)}</span>`).join('')}</p>` : ''}
          <div class="project-links">
            <a class="btn primary" href="${esc(url)}" ${ext}>${line('external', 16)}${esc(ui(ctx, 'openSite'))}</a>
            ${p.repo ? `<a class="btn" href="${esc(p.repo)}" ${ext}>${glyph(ctx, 'github', 'GitHub')}${esc(ui(ctx, 'sourceCode'))}</a>` : ''}
          </div>
        </div>
      </article>`;
}

export function home(ctx) {
  const { site } = ctx;
  const featured = site.stack.flatMap((g) => g.items).filter((i) => i.featured);
  const tagline = site.profile.tagline.map((w) => `<b>${esc(w)}</b>`).join(' · ');
  const body = [
    profileHeader(ctx, { title: ctx.t(site.profile.name), tagline: `${esc(ctx.t(site.profile.role))}<br>${tagline}` }),
    ctaRow(ctx),
    nav(ctx),
    section(ui(ctx, 'about'), `      <p class="lead">${esc(ctx.t(site.about))}</p>\n      <p class="note">${esc(ctx.t(site.profile.location))}</p>\n${highlights(ctx)}`),
    section(
      ui(ctx, 'stack'),
      `      <ul class="tiles">\n        ${featured.map((i) => stackTile(ctx, i)).join('\n        ')}\n      </ul>
      <a class="more" href="${pagePath(ctx.lang, 'stack')}">${esc(ui(ctx, 'fullStack'))} ${line('arrow', 14)}</a>`
    ),
    section(ui(ctx, 'links'), `      <div class="grid">\n        ${site.links.map((l) => linkCard(ctx, l)).filter(Boolean).join('\n        ')}\n      </div>`),
    section(ui(ctx, 'contact'), `      <p class="note">${esc(ctx.t(site.contact.note))}</p>`),
  ].filter(Boolean).join('\n\n');
  return layout(ctx, { title: `${ctx.t(site.profile.name)} — ${ctx.t(site.profile.role)}`, body, page: 'home' });
}

// ── Experience ────────────────────────────────────────────────
export function experience(ctx) {
  const { site } = ctx;
  const items = site.experience.map((e) => `      <li class="job">
        <div class="job-head">
          <h3>${esc(e.company)}</h3>
          <span class="period">${esc(ctx.t(e.period))}</span>
        </div>
        <p class="job-role">${esc(ctx.t(e.role))}${e.location ? ` <span class="sub">· ${esc(ctx.t(e.location))}</span>` : ''}${e.tag ? ` <span class="tag">${esc(ctx.t(e.tag))}</span>` : ''}</p>
        <ul class="bullets">
          ${e.bullets.map((b) => `<li>${esc(ctx.t(b))}</li>`).join('\n          ')}
        </ul>
        ${e.stack?.length ? `<p class="chips">${e.stack.map((s) => `<span class="chip">${esc(s)}</span>`).join('')}</p>` : ''}
      </li>`).join('\n');
  const education = site.education?.length
    ? section(ui(ctx, 'education'), `      <div class="specs">
        ${site.education.map((ed) => `<div class="row"><span class="v">${esc(ctx.t(ed.school))}<span class="sub">${esc(ctx.t(ed.degree))}</span></span><span class="meta">${esc(ctx.t(ed.period))}</span></div>`).join('\n        ')}
      </div>`)
    : '';
  const languages = site.languages?.length
    ? section(ui(ctx, 'languages'), `      <div class="specs">
        ${site.languages.map((l) => `<div class="row"><span class="v">${esc(ctx.t(l.name))}</span><span class="meta">${esc(ctx.t(l.level))}</span></div>`).join('\n        ')}
      </div>`)
    : '';
  const body = [
    profileHeader(ctx, { title: ui(ctx, 'experienceTitle'), tagline: esc(ui(ctx, 'experienceSub')), avatar: false }),
    nav(ctx),
    `    <ol class="timeline reveal">\n${items}\n    </ol>`,
    education,
    languages,
  ].filter(Boolean).join('\n\n');
  return layout(ctx, { title: `${ui(ctx, 'experienceTitle')} — ${ctx.t(site.profile.name)}`, body, page: 'experience' });
}

// ── Projects ──────────────────────────────────────────────────
export function projects(ctx) {
  const { site } = ctx;
  const body = [
    profileHeader(ctx, { title: ui(ctx, 'projectsTitle'), tagline: esc(ui(ctx, 'projectsSub')), avatar: false }),
    nav(ctx),
    `    <div class="projects reveal">\n      ${(site.projects ?? []).map((p) => projectCard(ctx, p)).join('\n      ')}\n    </div>`,
  ].join('\n\n');
  return layout(ctx, { title: `${ui(ctx, 'projectsTitle')} — ${ctx.t(site.profile.name)}`, body, page: 'projects' });
}

// ── Stack ─────────────────────────────────────────────────────
export function stack(ctx) {
  const { site } = ctx;
  const groups = site.stack.map((g) => section(ctx.t(g.group), `      <div class="specs">
        ${g.items.map((i) => {
          const years = i.years ? `<span class="meta">${esc(i.years)} ${esc(ui(ctx, 'years'))}</span>` : '';
          const note = i.note ? `<span class="sub">${esc(ctx.t(i.note))}</span>` : '';
          return `<div class="row"><span class="icon"${brandStyle(ctx, i.icon)}>${glyph(ctx, i.icon, i.name)}</span><span class="v">${esc(i.name)}${note}</span>${years}</div>`;
        }).join('\n        ')}
      </div>`)).join('\n\n');
  const body = [
    profileHeader(ctx, { title: ui(ctx, 'stackTitle'), tagline: esc(ui(ctx, 'stackSub')), avatar: false }),
    nav(ctx),
    groups,
  ].join('\n\n');
  return layout(ctx, { title: `${ui(ctx, 'stackTitle')} — ${ctx.t(site.profile.name)}`, body, page: 'stack' });
}

// ── 404 ───────────────────────────────────────────────────────
export function notFound(ctx) {
  const body = `    <header class="profile">
      <div class="avatar" aria-hidden="true">404</div>
      <h1>${esc(ui(ctx, 'notFound'))}</h1>
      <p class="tagline">${esc(UI.notFound.ru)}</p>
    </header>
    <p class="center"><a class="btn" href="/">${esc(ui(ctx, 'backHome'))}</a> <a class="btn" href="/ru/">${esc(UI.backHome.ru)}</a></p>`;
  return layout(ctx, { title: `404 — ${ctx.t(ctx.site.profile.name)}`, body, page: null });
}

// ── OG card (1200×630, screenshotted by `npm run og`) ────────
export function ogCard(ctx) {
  const { site } = ctx;
  const icons = site.stack.flatMap((g) => g.items)
    .filter((i) => i.featured && ctx.icon(i.icon))
    .map((i) => ctx.icon(i.icon).svg);
  const host = site.siteUrl.replace(/^https?:\/\//, '');
  const [first] = site.highlights;
  const facts = [first && `<b>${esc(first.value)}</b> ${esc(ctx.t(first.label))}`, esc(ctx.t(site.profile.location))].filter(Boolean).join(' · ');
  return `<!doctype html>
<html lang="${ctx.lang}">
<head>
<meta charset="utf-8">
<link href="https://fonts.googleapis.com/css2?family=Inter:wght@500;600;700&display=block" rel="stylesheet">
<style>
  html, body { margin: 0; width: 1200px; height: 630px; overflow: hidden; }
  body { background: #0d0f13; color: #e7eaee; font-family: Inter, sans-serif; position: relative; -webkit-font-smoothing: antialiased; }
  body::before { content: ""; position: absolute; inset: 0; background: radial-gradient(900px 560px at 88% -12%, rgba(74,222,128,0.17), transparent 70%); }
  .wrap { position: relative; box-sizing: border-box; height: 100%; padding: 76px 84px 64px; display: flex; flex-direction: column; }
  .top { display: flex; align-items: center; gap: 40px; }
  .avatar { flex: none; width: 136px; height: 136px; border-radius: 50%; display: grid; place-items: center;
    background: linear-gradient(160deg, #1c212b, #161a21); border: 2px solid rgba(255,255,255,0.16);
    color: #4ade80; font: 700 46px ui-monospace, 'SF Mono', Menlo, monospace; }
  h1 { margin: 0; font-size: 70px; font-weight: 700; letter-spacing: -0.025em; line-height: 1.05; }
  .role { margin: 14px 0 0; font-size: 31px; font-weight: 500; color: #9aa4b0; }
  .tags { display: flex; gap: 14px; margin-top: 54px; }
  .facts { margin: 30px 0 0; font-size: 27px; font-weight: 500; color: #9aa4b0; }
  .facts b { color: #e7eaee; font-weight: 600; }
  .tag { font: 600 25px ui-monospace, 'SF Mono', Menlo, monospace; color: #4ade80;
    background: rgba(74,222,128,0.12); border: 1px solid rgba(74,222,128,0.28); border-radius: 999px; padding: 9px 22px; }
  .bottom { margin-top: auto; display: flex; align-items: center; justify-content: space-between; }
  .icons { display: flex; gap: 26px; color: #6b7682; }
  .icons svg { width: 40px; height: 40px; fill: currentColor; }
  .url { font: 500 25px ui-monospace, 'SF Mono', Menlo, monospace; color: #9aa4b0; }
</style>
</head>
<body>
  <div class="wrap">
    <div class="top">
      <div class="avatar">${esc(site.monogram)}</div>
      <div>
        <h1>${esc(ctx.t(site.profile.name))}</h1>
        <p class="role">${esc(ctx.t(site.profile.role))}</p>
      </div>
    </div>
    <div class="tags">${site.profile.tagline.map((w) => `<span class="tag">${esc(w)}</span>`).join('')}</div>
    <p class="facts">${facts}</p>
    <div class="bottom">
      <div class="icons">${icons.join('')}</div>
      <div class="url">${esc(host)}</div>
    </div>
  </div>
</body>
</html>
`;
}
