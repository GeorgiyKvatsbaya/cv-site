// ─────────────────────────────────────────────────────────────
// The ONLY file you need to edit for content.
//
// • Translatable strings are { en, ru }. An empty `ru` falls back to `en`
//   (the build prints a warning).
// • Anything starting with "TODO" is a placeholder — the build lists them.
// • `icon` is a simple-icons slug (https://simpleicons.org). If a brand is
//   missing there (dbt, Tableau…), a text badge is rendered instead,
//   or drop your own SVG into public/icons/<slug>.svg.
// ─────────────────────────────────────────────────────────────

// Full years since a month, recalculated on every build.
const yearsSince = (year, month) => {
  const now = new Date();
  return String(Math.floor((now.getFullYear() * 12 + now.getMonth() + 1 - (year * 12 + month)) / 12));
};

const LINKEDIN = 'https://www.linkedin.com/in/georgiy-kvatsbaya-ba0645230/';

export default {
  // Production URL without trailing slash — used for canonical / hreflang / OG.
  siteUrl: 'https://georgiykvatsbaya.vercel.app',

  monogram: 'GK',

  profile: {
    name: { en: 'Georgiy Kvatsbaya', ru: 'Георгий Квацбая' },
    role: { en: 'Senior BI Engineer · Analytics Engineer', ru: 'Senior BI Engineer · Analytics Engineer' },
    tagline: ['dbt', 'tableau', 'sql'],
    location: { en: 'Tbilisi, Georgia', ru: 'Тбилиси, Грузия' },
  },

  about: {
    en: `Senior BI Engineer at Fundbox, working on finance data for Accounting and Capital Markets. ${yearsSince(2019, 10)} years in analytics across fintech, edtech, real estate and IT services: dbt data models, Airflow pipelines, data marts and Tableau dashboards — from zero to production. I like working closely with analysts, engineers and business stakeholders to turn data into decisions.`,
    ru: `Senior BI Engineer в Fundbox, работаю с финансовыми данными для бухгалтерии и Capital Markets. ${yearsSince(2019, 10)} лет в аналитике — финтех, эдтех, недвижимость и IT-сервисы: модели в dbt, пайплайны в Airflow, витрины данных и дашборды в Tableau от нуля до продакшена. Люблю работать в связке с аналитиками, разработчиками и бизнесом, чтобы данные превращались в решения.`,
  },

  highlights: [
    { value: `${yearsSince(2019, 10)}+`, label: { en: 'years in BI & data', ru: 'лет в BI и данных' } },
    { value: '6', label: { en: 'companies', ru: 'компаний' } },
    { value: 'HSE', label: { en: 'Applied Math, BSc', ru: 'прикладная математика' } },
  ],

  contact: {
    email: 'kvatsbayageorgiy@gmail.com',
    linkedin: LINKEDIN,
    // Files in public/. A missing file hides the "CV" button (with a build warning).
    cv: { en: '/cv-en.pdf', ru: '/cv-ru.pdf' },
    note: {
      en: 'The best way to reach me is email or LinkedIn — happy to talk about data modeling, BI and analytics engineering.',
      ru: 'Лучше всего писать на почту или в LinkedIn — с удовольствием обсужу моделирование данных, BI и analytics engineering.',
    },
  },

  // Link cards on the home page. `icon`: simple-icons slug or a built-in: email, linkedin.
  links: [
    { icon: 'linkedin', title: 'LinkedIn', sub: { en: 'experience & recommendations', ru: 'опыт и рекомендации' }, url: LINKEDIN },
    { icon: 'github', title: 'GitHub', sub: '@GeorgiyKvatsbaya', url: 'https://github.com/GeorgiyKvatsbaya' },
    { icon: 'email', title: 'Email', sub: { en: 'for work inquiries', ru: 'по рабочим вопросам' }, email: true },
    { icon: 'telegram', title: 'Telegram', sub: '@kvatsbaya', url: 'https://t.me/kvatsbaya' },
  ],

  // Grouped stack. `featured: true` items show up as icons on the home page.
  stack: [
    {
      group: { en: 'Modeling & SQL', ru: 'Моделирование и SQL' },
      items: [
        { name: 'dbt', icon: 'dbt', featured: true, years: `${yearsSince(2024, 2)}+`, note: { en: 'financial data models for Accounting & Capital Markets', ru: 'финансовые модели данных для бухгалтерии и Capital Markets' } },
        { name: 'SQL', icon: 'sql', featured: true, years: yearsSince(2019, 10), note: { en: 'main tool since day one; query optimization in Greenplum', ru: 'основной инструмент с первого дня; оптимизация запросов в Greenplum' } },
      ],
    },
    {
      group: { en: 'Warehouses & engines', ru: 'Хранилища и движки' },
      items: [
        { name: 'Snowflake', icon: 'snowflake', featured: true },
        { name: 'Databricks', icon: 'databricks', featured: true },
        { name: 'ClickHouse', icon: 'clickhouse', featured: true },
        { name: 'Greenplum', icon: 'greenplum' },
        { name: 'Spark SQL', icon: 'apachespark' },
        { name: 'Hadoop / Hive', icon: 'apachehive' },
      ],
    },
    {
      group: { en: 'Orchestration', ru: 'Оркестрация' },
      items: [
        { name: 'Airflow', icon: 'apacheairflow', featured: true, note: { en: 'deployed from scratch, pipeline-factory structure', ru: 'развернул с нуля, структура pipeline factory' } },
      ],
    },
    {
      group: { en: 'BI', ru: 'BI' },
      items: [
        { name: 'Tableau', icon: 'tableau', featured: true, years: yearsSince(2019, 10), note: { en: 'dashboards from zero to production, performance tuning', ru: 'дашборды от нуля до продакшена, оптимизация производительности' } },
        { name: 'Tableau Server', icon: 'tableau', note: { en: 'administration, REST / Webhooks / Document APIs, automated refreshes', ru: 'администрирование, REST / Webhooks / Document API, автоматические обновления' } },
      ],
    },
    {
      group: { en: 'Languages', ru: 'Языки' },
      items: [
        { name: 'Python', icon: 'python', featured: true, years: yearsSince(2019, 10), note: { en: 'pandas, NumPy, API integrations, automation', ru: 'pandas, NumPy, интеграции с API, автоматизация' } },
      ],
    },
    {
      group: { en: 'Tools', ru: 'Инструменты' },
      items: [
        { name: 'Git', icon: 'git' },
        { name: 'GitHub', icon: 'github' },
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
        { en: 'Build financial data models in dbt for the Accounting and Capital Markets teams.', ru: 'Разрабатываю финансовые модели данных в dbt для команд бухгалтерии и Capital Markets.' },
        { en: 'Rewrote legacy processes to be more reliable and faster.', ru: 'Переписал существующие процессы — надёжнее и быстрее.' },
        { en: 'Support Tableau dashboards, gather requirements from business stakeholders and work with backend engineers on data issues I find.', ru: 'Поддерживаю дашборды в Tableau, собираю требования у бизнеса и разбираю найденные баги в данных с бэкенд-разработчиками.' },
        { en: 'Contributed to a Slack bot powered by an LLM that answers business users’ questions about the dbt data model.', ru: 'Участвовал в создании Slack-бота на LLM, который отвечает на вопросы бизнес-пользователей о модели данных в dbt.' },
      ],
      stack: ['dbt', 'SQL', 'Tableau', 'LLM'],
    },
    {
      company: 'SAMOLET Group',
      role: { en: 'Senior Business Intelligence Developer', ru: 'Senior Business Intelligence Developer' },
      period: { en: 'Sep 2023 — Aug 2024', ru: 'сен 2023 — авг 2024' },
      location: { en: 'Tbilisi', ru: 'Тбилиси' },
      bullets: [
        { en: 'Built SQL data sources for financial reporting, including monthly and yearly accounts-receivable reports.', ru: 'Строил источники данных на SQL для финансовой отчётности, включая ежемесячные и годовые отчёты по дебиторской задолженности.' },
        { en: 'Developed new Tableau dashboards and optimized the performance of existing ones.', ru: 'Разрабатывал новые дашборды в Tableau и ускорял существующие.' },
        { en: 'Administered Tableau Server: upgrades, load management, automation and performance tuning; alerts via the Webhooks and REST APIs; license management with the vendor.', ru: 'Администрировал Tableau Server: обновления, управление нагрузкой, автоматизация и тюнинг; алерты через Webhooks и REST API; лицензии и работа с вендором.' },
      ],
      stack: ['Tableau', 'Tableau Server', 'SQL'],
    },
    {
      company: 'Careerist',
      role: { en: 'Data Engineer / BI Developer', ru: 'Data Engineer / BI Developer' },
      period: { en: 'Apr 2023 — Oct 2023', ru: 'апр 2023 — окт 2023' },
      location: { en: 'Tbilisi', ru: 'Тбилиси' },
      bullets: [
        { en: 'Deployed Airflow and designed a pipeline-factory structure.', ru: 'Развернул Airflow и спроектировал структуру pipeline factory.' },
        { en: 'Built core data marts and migrated analytics scripts to Airflow.', ru: 'Построил основные витрины данных и перенёс аналитические скрипты в Airflow.' },
        { en: 'Moved data uploads to Airflow together with developers, optimizing ingestion.', ru: 'Вместе с разработчиками перевёл загрузки данных в Airflow и оптимизировал ingestion.' },
        { en: 'Reworked Tableau dashboards to make data more accessible for decision-making.', ru: 'Переработал дашборды в Tableau, чтобы данные были доступнее для принятия решений.' },
      ],
      stack: ['Airflow', 'Python', 'SQL', 'Tableau'],
    },
    {
      company: 'EPAM Systems',
      role: { en: 'Software Engineer', ru: 'Software Engineer' },
      period: { en: 'May 2022 — Apr 2023', ru: 'май 2022 — апр 2023' },
      location: { en: 'Tbilisi', ru: 'Тбилиси' },
      bullets: [
        { en: 'Supported existing reporting and built new dashboards.', ru: 'Поддерживал существующую отчётность и разрабатывал новые дашборды.' },
        { en: 'Worked with Databricks, Python and the Tableau Document / Server APIs.', ru: 'Работал с Databricks, Python и Tableau Document / Server API.' },
      ],
      stack: ['Databricks', 'Python', 'Tableau'],
    },
    {
      company: 'Uchi.ru',
      role: { en: 'Business Intelligence Analyst', ru: 'Business Intelligence Analyst' },
      period: { en: 'Mar 2021 — Sep 2022', ru: 'мар 2021 — сен 2022' },
      location: { en: 'Tbilisi', ru: 'Тбилиси' },
      bullets: [
        { en: 'Built Tableau dashboards from zero to production on top of Spark SQL and ClickHouse.', ru: 'Делал дашборды в Tableau от нуля до продакшена на Spark SQL и ClickHouse.' },
        { en: 'Optimized the DWH architecture.', ru: 'Оптимизировал архитектуру DWH.' },
        { en: 'Built automatic dashboard refreshes triggered by data-mart updates in the DWH via the Tableau Server REST API.', ru: 'Сделал автоматическое обновление дашбордов по факту обновления витрин в DWH через Tableau Server REST API.' },
      ],
      stack: ['Spark SQL', 'ClickHouse', 'Python', 'Tableau'],
    },
    {
      company: 'Tinkoff',
      role: { en: 'Business Intelligence Analyst', ru: 'Business Intelligence Analyst' },
      period: { en: 'Oct 2019 — Mar 2021', ru: 'окт 2019 — мар 2021' },
      bullets: [
        { en: 'Built dashboards for the ATM and Payment Systems departments.', ru: 'Делал дашборды для департамента банкоматов и департамента платёжных систем.' },
        { en: 'Optimized existing Greenplum queries.', ru: 'Оптимизировал существующие запросы в Greenplum.' },
        { en: 'Automated Excel report mailings where a dashboard wasn’t needed.', ru: 'Автоматизировал рассылку Excel-отчётов там, где дашборд был не нужен.' },
      ],
      stack: ['SQL', 'Greenplum', 'Spark SQL', 'ClickHouse', 'Python', 'Tableau'],
    },
  ],

  education: [
    {
      school: { en: 'HSE University (Higher School of Economics)', ru: 'НИУ ВШЭ (Высшая школа экономики)' },
      degree: { en: 'Bachelor’s degree, Applied Mathematics', ru: 'Бакалавриат, прикладная математика' },
      period: '2017 — 2019',
    },
  ],
};
