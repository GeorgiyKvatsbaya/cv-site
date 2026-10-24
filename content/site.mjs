// ─────────────────────────────────────────────────────────────
// The ONLY file you need to edit for content.
//
// • Translatable strings are { en, ru }. An empty `ru` falls back to `en`
//   (the build prints a warning).
// • Anything starting with "TODO" is a placeholder — the build lists them.
// • `icon` is a simple-icons slug (https://simpleicons.org). If a brand is
//   missing there, a text badge is rendered instead, or drop your own SVG
//   into public/icons/<slug>.svg.
// ─────────────────────────────────────────────────────────────

// Full years since a month, recalculated on every build.
const yearsSince = (year, month) => {
  const now = new Date();
  return String(Math.floor((now.getFullYear() * 12 + now.getMonth() + 1 - (year * 12 + month)) / 12));
};

const LINKEDIN = 'https://www.linkedin.com/in/georgiy-kvatsbaya-ba0645230/';
const RESUME = '/Georgiy_Kvatsbaya_Resume.pdf';

export default {
  // Production URL without trailing slash — used for canonical / hreflang / OG.
  siteUrl: 'https://georgiykvatsbaya.vercel.app',

  monogram: 'GK',

  profile: {
    name: { en: 'Georgiy Kvatsbaya', ru: 'Георгий Квацбая' },
    role: { en: 'Senior Analytics Engineer · Senior BI Engineer', ru: 'Senior Analytics Engineer · Senior BI Engineer' },
    tagline: ['snowflake', 'dbt', 'sql', 'tableau'],
    location: { en: 'Tbilisi, Georgia · open to remote / relocation', ru: 'Тбилиси, Грузия · открыт к удалёнке и релокации' },
  },

  about: {
    en: `BI / Analytics Engineer with ${yearsSince(2019, 10)}+ years of experience building financial analytics, data models, reporting platforms and executive dashboards across fintech, banking, real estate and technology. Strong in Snowflake, dbt Cloud, SQL, Tableau and Python, with hands-on ownership of finance reconciliation, Capital Markets reporting, ELT design, BI platform administration and stakeholder-facing analytics.`,
    ru: `BI / Analytics Engineer с опытом ${yearsSince(2019, 10)}+ лет: финансовая аналитика, модели данных, платформы отчётности и дашборды для руководства в финтехе, банкинге, недвижимости и IT. Сильные стороны — Snowflake, dbt Cloud, SQL, Tableau и Python; отвечал за финансовую сверку, отчётность для Capital Markets, проектирование ELT, администрирование BI-платформы и аналитику для бизнес-заказчиков.`,
  },

  highlights: [
    { value: `${yearsSince(2019, 10)}+`, label: { en: 'years in BI & data', ru: 'лет в BI и данных' } },
    { value: '6', label: { en: 'companies', ru: 'компаний' } },
    { value: '~50', label: { en: 'ELT pipelines built', ru: 'ELT-пайплайнов построено' } },
  ],

  contact: {
    email: 'kvatsbayageorgiy@gmail.com',
    linkedin: LINKEDIN,
    // Files in public/. A missing file hides the "CV" button (with a build warning).
    cv: { en: RESUME, ru: RESUME },
    note: {
      en: 'Open to remote roles and relocation. The best way to reach me is email or LinkedIn — happy to talk about analytics engineering, data modeling and BI.',
      ru: 'Открыт к удалённой работе и релокации. Лучше всего писать на почту или в LinkedIn — с удовольствием обсужу analytics engineering, моделирование данных и BI.',
    },
  },

  // Link cards on the home page. `icon`: simple-icons slug or a built-in: email, linkedin.
  links: [
    { icon: 'linkedin', title: 'LinkedIn', sub: { en: 'experience & recommendations', ru: 'опыт и рекомендации' }, url: LINKEDIN },
    { icon: 'github', title: 'GitHub', sub: '@GeorgiyKvatsbaya', url: 'https://github.com/GeorgiyKvatsbaya' },
    { icon: 'email', title: 'Email', sub: { en: 'for work inquiries', ru: 'по рабочим вопросам' }, email: true },
    { icon: 'telegram', title: 'Telegram', sub: '@kvatsbaya', url: 'https://t.me/kvatsbaya' },
  ],

  // Grouped stack. `featured: true` items show up as icons on the home page (8 fit one row on desktop).
  stack: [
    {
      group: { en: 'Analytics engineering', ru: 'Analytics engineering' },
      items: [
        { name: 'Snowflake', icon: 'snowflake', featured: true, years: `${yearsSince(2024, 2)}+`, note: { en: 'financial data models for Accounting & Capital Markets, Streamlit in Snowflake', ru: 'финансовые модели для бухгалтерии и Capital Markets, Streamlit в Snowflake' } },
        { name: 'dbt Cloud', icon: 'dbt', featured: true, years: `${yearsSince(2024, 2)}+`, note: { en: 'dimensional modeling, data marts, tests', ru: 'dimensional modeling, витрины данных, тесты' } },
        { name: 'SQL', icon: 'sql', featured: true, years: yearsSince(2019, 10), note: { en: 'main tool since day one; query optimization in Greenplum', ru: 'основной инструмент с первого дня; оптимизация запросов в Greenplum' } },
        { name: 'Monte Carlo', icon: 'montecarlo', note: { en: 'data quality & observability', ru: 'качество данных и observability' } },
      ],
    },
    {
      group: { en: 'BI & reporting', ru: 'BI и отчётность' },
      items: [
        { name: 'Tableau', icon: 'tableau', featured: true, years: yearsSince(2019, 10), note: { en: 'financial reporting, executive dashboards, performance tuning', ru: 'финансовая отчётность, дашборды для руководства, оптимизация производительности' } },
        { name: 'Tableau Server', icon: 'tableau', note: { en: 'administration, licensing, REST / Webhook APIs, automated refreshes', ru: 'администрирование, лицензии, REST / Webhook API, автоматические обновления' } },
        { name: 'Streamlit', icon: 'streamlit', featured: true, note: { en: 'Streamlit in Snowflake: cash-flow reconciliation dashboard', ru: 'Streamlit в Snowflake: дашборд сверки денежных потоков' } },
      ],
    },
    {
      group: { en: 'Pipelines & orchestration', ru: 'Пайплайны и оркестрация' },
      items: [
        { name: 'Airflow', icon: 'apacheairflow', featured: true, note: { en: 'deployed from scratch, reusable pipeline-factory structure', ru: 'развернул с нуля, переиспользуемая структура pipeline factory' } },
        { name: 'Apache NiFi', icon: 'apachenifi' },
      ],
    },
    {
      group: { en: 'Warehouses & engines', ru: 'Хранилища и движки' },
      items: [
        { name: 'BigQuery', icon: 'googlebigquery', featured: true, note: { en: 'MySQL → BigQuery ingestion and mart pipelines', ru: 'загрузка MySQL → BigQuery и пайплайны витрин' } },
        { name: 'MySQL', icon: 'mysql' },
        { name: 'Databricks', icon: 'databricks' },
        { name: 'ClickHouse', icon: 'clickhouse' },
        { name: 'Greenplum', icon: 'greenplum' },
        { name: 'Spark SQL', icon: 'apachespark' },
        { name: 'Hadoop / Hive', icon: 'apachehive' },
      ],
    },
    {
      group: { en: 'Languages', ru: 'Языки программирования' },
      items: [
        { name: 'Python', icon: 'python', featured: true, years: yearsSince(2019, 10), note: { en: 'pandas, NumPy, API integrations, report automation', ru: 'pandas, NumPy, интеграции с API, автоматизация отчётов' } },
      ],
    },
    {
      group: { en: 'Tools', ru: 'Инструменты' },
      items: [
        { name: 'GitHub', icon: 'github' },
        { name: 'Jira', icon: 'jira' },
        { name: 'Confluence', icon: 'confluence' },
        { name: 'Claude', icon: 'claude', note: { en: 'AI-assisted analytics', ru: 'AI-ассистированная аналитика' } },
      ],
    },
  ],

  // Newest first.
  experience: [
    {
      company: 'Fundbox',
      role: { en: 'Senior Business Intelligence Engineer', ru: 'Senior Business Intelligence Engineer' },
      period: { en: 'Feb 2024 — present', ru: 'фев 2024 — н.в.' },
      location: { en: 'Tbilisi', ru: 'Тбилиси' },
      bullets: [
        { en: 'Build and own financial data models in Snowflake and dbt Cloud for Accounting and Capital Markets, translating business requirements into reliable reporting datasets.', ru: 'Разрабатываю и веду финансовые модели данных в Snowflake и dbt Cloud для бухгалтерии и Capital Markets — превращаю бизнес-требования в надёжные датасеты для отчётности.' },
        { en: 'Designed a cash-flow reconciliation model and a Streamlit dashboard inside Snowflake to surface mismatches and support finance reconciliation workflows.', ru: 'Спроектировал модель сверки денежных потоков и Streamlit-дашборд внутри Snowflake, которые подсвечивают расхождения и поддерживают процессы финансовой сверки.' },
        { en: 'Developed external reporting for Capital Markets lenders; reworked existing processes for reliability and maintainability while supporting critical Tableau reporting.', ru: 'Сделал внешнюю отчётность для кредиторов Capital Markets; переработал существующие процессы ради надёжности и поддерживаемости, поддерживаю критичную отчётность в Tableau.' },
        { en: 'Partner with finance stakeholders and backend engineers on data issues; contribute to data-quality and AI-assisted analytics initiatives, including an LLM-based Slack assistant for the dbt data model.', ru: 'Разбираю проблемы в данных с финансовыми заказчиками и бэкенд-разработчиками; участвую в инициативах по качеству данных и AI-аналитике, включая Slack-ассистента на LLM по модели данных в dbt.' },
      ],
      stack: ['Snowflake', 'dbt Cloud', 'Streamlit', 'Tableau', 'Monte Carlo', 'LLM'],
    },
    {
      company: 'SAMOLET Group',
      role: { en: 'Senior Business Intelligence Developer', ru: 'Senior Business Intelligence Developer' },
      period: { en: 'Sep 2023 — Aug 2024', ru: 'сен 2023 — авг 2024' },
      location: { en: 'Tbilisi', ru: 'Тбилиси' },
      bullets: [
        { en: 'Built C-level financial dashboards for P&L, cash flow, accounts receivable and debt across business units; developed SQL data sources and optimized Tableau performance.', ru: 'Построил финансовые дашборды для C-level: P&L, денежный поток, дебиторская задолженность и долг по бизнес-юнитам; разрабатывал источники данных на SQL и ускорял Tableau.' },
        { en: 'Administered Tableau Server: upgrades, performance and load management, plugins and connectors, access coordination, licensing and REST / Webhook API integrations.', ru: 'Администрировал Tableau Server: обновления, производительность и нагрузка, плагины и коннекторы, доступы, лицензии и интеграции через REST / Webhook API.' },
      ],
      stack: ['Tableau', 'Tableau Server', 'SQL'],
    },
    {
      company: 'Careerist',
      role: { en: 'Data Engineer / BI Developer', ru: 'Data Engineer / BI Developer' },
      period: { en: 'Apr 2023 — Oct 2023', ru: 'апр 2023 — окт 2023' },
      location: { en: 'Tbilisi', ru: 'Тбилиси' },
      bullets: [
        { en: 'Joined to establish an ELT foundation for the analytics database; deployed Airflow and created a reusable pipeline-factory structure.', ru: 'Пришёл, чтобы заложить ELT-фундамент для аналитической базы; развернул Airflow и сделал переиспользуемую структуру pipeline factory.' },
        { en: 'Built ~30–40 MySQL-to-BigQuery ingestion pipelines and ~10–15 BigQuery mart pipelines, coordinating the migration of analytics workloads with developers.', ru: 'Построил ~30–40 пайплайнов загрузки MySQL → BigQuery и ~10–15 пайплайнов витрин в BigQuery, координируя с разработчиками перенос аналитических нагрузок.' },
      ],
      stack: ['Airflow', 'BigQuery', 'MySQL', 'Python'],
    },
    {
      company: 'EPAM Systems',
      role: { en: 'Software Engineer', ru: 'Software Engineer' },
      period: { en: 'May 2022 — Apr 2023', ru: 'май 2022 — апр 2023' },
      location: { en: 'Tbilisi', ru: 'Тбилиси' },
      bullets: [
        { en: 'Maintained and optimized Tableau reporting, improving dashboard performance and supporting workflows built on Databricks, Python and Tableau APIs.', ru: 'Поддерживал и оптимизировал отчётность в Tableau: ускорял дашборды и поддерживал процессы на Databricks, Python и Tableau API.' },
      ],
      stack: ['Tableau', 'Databricks', 'Python'],
    },
    {
      company: 'Uchi.ru',
      role: { en: 'Business Intelligence Analyst', ru: 'Business Intelligence Analyst' },
      period: { en: 'Mar 2021 — Sep 2022', ru: 'мар 2021 — сен 2022' },
      location: { en: 'Tbilisi', ru: 'Тбилиси' },
      bullets: [
        { en: 'Cleaned up DWH model dependencies that caused inefficient Airflow DAG execution.', ru: 'Расчистил зависимости моделей в DWH, из-за которых DAG-и в Airflow выполнялись неэффективно.' },
        { en: 'Built Tableau reporting on Spark SQL and ClickHouse, with automated refreshes based on DWH readiness via the Tableau REST API.', ru: 'Строил отчётность в Tableau на Spark SQL и ClickHouse с автоматическим обновлением по готовности DWH через Tableau REST API.' },
      ],
      stack: ['Tableau', 'Airflow', 'Spark SQL', 'ClickHouse', 'Python'],
    },
    {
      company: 'Tinkoff',
      role: { en: 'Business Intelligence Analyst', ru: 'Business Intelligence Analyst' },
      period: { en: 'Oct 2019 — Mar 2021', ru: 'окт 2019 — мар 2021' },
      bullets: [
        { en: 'Built BI reporting for the ATM and Payments teams.', ru: 'Строил BI-отчётность для команд банкоматов и платежей.' },
        { en: 'Optimized Greenplum SQL and automated recurring Excel reporting with Python across Greenplum, Spark SQL, ClickHouse and Tableau.', ru: 'Оптимизировал SQL в Greenplum и автоматизировал регулярную Excel-отчётность на Python поверх Greenplum, Spark SQL, ClickHouse и Tableau.' },
      ],
      stack: ['SQL', 'Greenplum', 'Spark SQL', 'ClickHouse', 'Python', 'Tableau'],
    },
  ],

  education: [
    {
      school: { en: 'HSE University (Higher School of Economics)', ru: 'НИУ ВШЭ (Высшая школа экономики)' },
      degree: { en: 'Applied Mathematics (coursework)', ru: 'Прикладная математика (обучение)' },
      period: '2016 — 2020',
    },
  ],

  languages: [
    { name: { en: 'Russian', ru: 'Русский' }, level: { en: 'native', ru: 'родной' } },
    { name: { en: 'English', ru: 'Английский' }, level: { en: 'B2 · professional working', ru: 'B2 · рабочий' } },
    { name: { en: 'Georgian', ru: 'Грузинский' }, level: { en: 'B1', ru: 'B1' } },
  ],
};
