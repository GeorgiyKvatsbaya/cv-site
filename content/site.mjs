// ─────────────────────────────────────────────────────────────
// The ONLY file you need to edit for content.
//
// • Translatable strings are { en, ru }. An empty `ru` falls back to `en`
//   (the build prints a warning).
// • Anything starting with "TODO" is a placeholder — the build lists them.
// • `icon` is a simple-icons slug (https://simpleicons.org). If a brand is
//   missing there (dbt, Tableau, AWS…), a text badge is rendered instead,
//   or drop your own SVG into public/icons/<slug>.svg.
// ─────────────────────────────────────────────────────────────

export default {
  // Production URL without trailing slash — used for canonical / hreflang / OG.
  siteUrl: 'https://cv-site-georgiykvatsbaya.vercel.app', // TODO: replace with the real Vercel URL or custom domain

  monogram: 'GK',

  profile: {
    name: { en: 'Georgii Kvatsbaya', ru: 'Георгий Квацбая' }, // TODO: verify RU spelling
    role: { en: 'Senior Data Engineer', ru: 'Senior Data Engineer' },
    tagline: ['snowflake', 'dbt', 'bi'],
    location: { en: 'TODO: City, Country · Remote', ru: 'TODO: Город, страна · удалённо' },
  },

  about: {
    en: 'TODO: 2–4 sentences — who you are, what you are strong at, what you are looking for. E.g. “10+ years building analytics platforms on Snowflake and dbt…”',
    ru: 'TODO: 2–4 предложения — кто ты, в чём силён, что ищешь. Например: «10+ лет строю аналитические платформы на Snowflake и dbt…»',
  },

  highlights: [
    { value: 'TODO', label: { en: 'years in data', ru: 'лет в данных' } },
    { value: 'TODO', label: { en: 'dbt models in prod', ru: 'dbt-моделей в проде' } },
    { value: 'TODO', label: { en: 'Snowflake cost cut', ru: 'экономия на Snowflake' } },
  ],

  contact: {
    email: 'TODO: you@example.com',
    linkedin: 'TODO: https://www.linkedin.com/in/your-handle',
    // Files in public/. A missing file hides the "CV" button (with a build warning).
    cv: { en: '/cv-en.pdf', ru: '/cv-ru.pdf' },
    note: {
      en: 'Best way to reach me is email or LinkedIn. Open to TODO: senior / lead data engineering roles, remote or relocation.',
      ru: 'Лучше всего писать на почту или в LinkedIn. Рассматриваю TODO: senior / lead роли в data engineering, удалённо или с релокацией.',
    },
  },

  // Link cards on the home page. `icon`: simple-icons slug or a built-in: email, linkedin.
  links: [
    { icon: 'github', title: 'GitHub', sub: '@GeorgiyKvatsbaya', url: 'https://github.com/GeorgiyKvatsbaya' },
    { icon: 'linkedin', title: 'LinkedIn', sub: { en: 'experience & recommendations', ru: 'опыт и рекомендации' }, url: 'TODO: https://www.linkedin.com/in/your-handle' },
    { icon: 'telegram', title: 'Telegram', sub: 'TODO: @handle', url: 'TODO: https://t.me/handle' },
    { icon: 'email', title: 'Email', sub: { en: 'for work inquiries', ru: 'по рабочим вопросам' }, email: true },
  ],

  // Grouped stack. `featured: true` items show up as icons on the home page.
  stack: [
    {
      group: { en: 'Warehouse', ru: 'Хранилище' },
      items: [
        { name: 'Snowflake', icon: 'snowflake', featured: true, years: 'TODO', note: { en: 'TODO: pruning, clustering, cost governance', ru: 'TODO: pruning, кластеризация, контроль стоимости' } },
      ],
    },
    {
      group: { en: 'Transform', ru: 'Трансформации' },
      items: [
        { name: 'dbt', icon: 'dbt', featured: true, years: 'TODO', note: { en: 'TODO: incremental models, tests, macros', ru: 'TODO: инкрементальные модели, тесты, макросы' } },
        { name: 'SQL', icon: 'sql', featured: true, years: 'TODO' },
      ],
    },
    {
      group: { en: 'BI', ru: 'BI' },
      items: [
        { name: 'Tableau', icon: 'tableau', featured: true, years: 'TODO' },
      ],
    },
    {
      group: { en: 'Observability', ru: 'Наблюдаемость' },
      items: [
        { name: 'Monte Carlo', icon: 'montecarlo', featured: true, years: 'TODO' },
        { name: 'Datadog', icon: 'datadog', featured: true, years: 'TODO' },
      ],
    },
    {
      group: { en: 'Languages', ru: 'Языки' },
      items: [
        { name: 'Python', icon: 'python', featured: true, years: 'TODO' },
      ],
    },
    {
      group: { en: 'Tools', ru: 'Инструменты' },
      items: [
        { name: 'Git', icon: 'git', featured: true },
        { name: 'GitHub', icon: 'github', featured: true },
        { name: 'Jira', icon: 'jira', featured: true },
      ],
    },
  ],

  // Newest first.
  experience: [
    {
      company: 'TODO: Company',
      role: { en: 'TODO: Senior Data Engineer', ru: 'TODO: Senior Data Engineer' },
      period: { en: 'TODO: 2024 — present', ru: 'TODO: 2024 — н.в.' },
      location: { en: 'TODO: Remote', ru: 'TODO: удалённо' },
      bullets: [
        { en: 'TODO: Result with a number — e.g. cut Snowflake spend by 35% by reclustering and right-sizing warehouses.', ru: 'TODO: Результат с цифрой — например, снизил расходы на Snowflake на 35% за счёт кластеризации и подбора размеров варехаузов.' },
        { en: 'TODO: Second achievement.', ru: 'TODO: Второе достижение.' },
      ],
      stack: ['Snowflake', 'dbt', 'Tableau'],
    },
    {
      company: 'TODO: Previous company',
      role: { en: 'TODO: Data Engineer', ru: 'TODO: Data Engineer' },
      period: { en: 'TODO: 2020 — 2024', ru: 'TODO: 2020 — 2024' },
      location: { en: 'TODO: City', ru: 'TODO: Город' },
      bullets: [
        { en: 'TODO: Achievement.', ru: 'TODO: Достижение.' },
      ],
      stack: ['SQL', 'Python'],
    },
  ],
};
