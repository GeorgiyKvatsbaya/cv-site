// Static site builder: content/site.mjs + src/templates.mjs → dist/
//   node build.mjs           build once
//   node build.mjs --serve   build and serve dist/ on http://localhost:3000
//                            (npm run dev restarts it on file changes)
//   node build.mjs --og      regenerate public/og/<lang>.png with local Chrome, then build
import fs from 'node:fs';
import path from 'node:path';
import http from 'node:http';
import crypto from 'node:crypto';
import os from 'node:os';
import { execFileSync } from 'node:child_process';
import { pathToFileURL } from 'node:url';
import * as simpleIcons from 'simple-icons';
import site from './content/site.mjs';
import * as T from './src/templates.mjs';

const ROOT = path.dirname(new URL(import.meta.url).pathname);
const DIST = path.join(ROOT, 'dist');
const PUBLIC = path.join(ROOT, 'public');
const SRC = path.join(ROOT, 'src');

const warnings = new Set();

// ── Icons: public/icons/<slug>.svg override → simple-icons → null (text badge) ──
const iconCache = new Map();
const missingIcons = new Set();

function luminance(hex) {
  const [r, g, b] = [0, 2, 4].map((i) => {
    const c = parseInt(hex.slice(i, i + 2), 16) / 255;
    return c <= 0.03928 ? c / 12.92 : ((c + 0.055) / 1.055) ** 2.4;
  });
  return 0.2126 * r + 0.7152 * g + 0.0722 * b;
}

function icon(slug) {
  if (!slug) return null;
  if (iconCache.has(slug)) return iconCache.get(slug);
  let result = null;
  const override = path.join(PUBLIC, 'icons', `${slug}.svg`);
  if (fs.existsSync(override)) {
    const raw = fs.readFileSync(override, 'utf8');
    const svg = raw.replace(/<\?xml[^>]*>\s*/, '').replace(/<!--[\s\S]*?-->\s*/g, '').trim()
      .replace(/\sdata-hex="[^"]*"/, '')
      .replace('<svg', '<svg aria-hidden="true" focusable="false"');
    // Optional brand colour for hover: <svg data-hex="FF694B" …>
    result = { svg, hex: raw.match(/data-hex="([0-9a-fA-F]{6})"/)?.[1] ?? null };
  } else {
    const si = simpleIcons[`si${slug.charAt(0).toUpperCase()}${slug.slice(1)}`];
    if (si) {
      // Near-black / near-white brand colours vanish on one of the themes → use the accent instead.
      const lum = luminance(si.hex);
      result = {
        svg: `<svg viewBox="0 0 24 24" aria-hidden="true" focusable="false"><path d="${si.path}"/></svg>`,
        hex: lum > 0.03 && lum < 0.8 ? si.hex : null,
      };
    } else {
      missingIcons.add(slug);
    }
  }
  iconCache.set(slug, result);
  return result;
}

// ── Helpers ──────────────────────────────────────────────────
const isTodo = (v) => typeof v === 'string' && v.trimStart().startsWith('TODO');

function findTodos(node, trail = []) {
  if (typeof node === 'string') return node.includes('TODO') ? [trail.join('.')] : [];
  if (node && typeof node === 'object')
    return Object.entries(node).flatMap(([k, v]) => findTodos(v, [...trail, k]));
  return [];
}

const hashes = {};
function asset(name) {
  hashes[name] ??= crypto.createHash('sha1').update(fs.readFileSync(path.join(SRC, name))).digest('hex').slice(0, 8);
  return `/${name}?v=${hashes[name]}`;
}

const hasPublic = (p) => fs.existsSync(path.join(PUBLIC, p.replace(/^\//, '')));

// ── OG images: public/og/<lang>.png + hashes.json (hash of the card HTML they were made from) ──
const OG_DIR = path.join(PUBLIC, 'og');
const OG_HASHES = path.join(OG_DIR, 'hashes.json');
const sha8 = (s) => crypto.createHash('sha1').update(s).digest('hex').slice(0, 8);
const ogHashes = () => (fs.existsSync(OG_HASHES) ? JSON.parse(fs.readFileSync(OG_HASHES, 'utf8')) : {});

function og(lang) {
  const hash = ogHashes()[lang];
  return hash && fs.existsSync(path.join(OG_DIR, `${lang}.png`)) ? { path: `/og/${lang}.png`, hash } : null;
}

function generateOg() {
  const chrome = process.env.CHROME || '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome';
  const tmp = fs.mkdtempSync(path.join(os.tmpdir(), 'cv-og-'));
  fs.mkdirSync(OG_DIR, { recursive: true });
  const hashes = {};
  try {
    for (const lang of T.LANGS) {
      const html = T.ogCard(makeCtx(lang, 'home'));
      const file = path.join(tmp, `${lang}.html`);
      fs.writeFileSync(file, html);
      execFileSync(chrome, [
        '--headless=new', '--disable-gpu', '--hide-scrollbars', '--force-device-scale-factor=1',
        `--user-data-dir=${path.join(tmp, 'profile')}`, '--virtual-time-budget=5000',
        '--window-size=1200,630', `--screenshot=${path.join(OG_DIR, `${lang}.png`)}`, pathToFileURL(file).href,
      ], { stdio: 'ignore' });
      hashes[lang] = sha8(html);
      console.log(`✓ og image → public/og/${lang}.png`);
    }
  } finally {
    fs.rmSync(tmp, { recursive: true, force: true });
  }
  fs.writeFileSync(OG_HASHES, JSON.stringify(hashes, null, 2) + '\n');
}

function makeCtx(lang, page) {
  const t = (v) => {
    if (v == null || typeof v !== 'object' || Array.isArray(v)) return v ?? '';
    if (v[lang]) return v[lang];
    if (lang !== 'en' && v.en) warnings.add(`missing "${lang}" translation for: ${String(v.en).slice(0, 60)}`);
    return v.en ?? '';
  };
  return { site, lang, page, t, icon, asset, isTodo, hasPublic, og };
}

function write(rel, html) {
  const file = path.join(DIST, rel);
  fs.mkdirSync(path.dirname(file), { recursive: true });
  fs.writeFileSync(file, html);
}

// ── Build ────────────────────────────────────────────────────
function build() {
  fs.rmSync(DIST, { recursive: true, force: true });
  fs.mkdirSync(DIST, { recursive: true });
  if (fs.existsSync(PUBLIC)) fs.cpSync(PUBLIC, DIST, { recursive: true });
  for (const f of ['style.css', 'main.js']) fs.copyFileSync(path.join(SRC, f), path.join(DIST, f));

  const pages = [];
  for (const lang of T.LANGS) {
    for (const page of T.PAGES) {
      const rel = T.pagePath(lang, page) + 'index.html';
      write(rel, T[page](makeCtx(lang, page)));
      pages.push(rel);
    }
  }
  write('404.html', T.notFound(makeCtx('en', null)));
  pages.push('/404.html');

  const stored = ogHashes();
  for (const lang of T.LANGS) {
    if (!og(lang)) warnings.add(`no OG image for "${lang}" — run: npm run og`);
    else if (stored[lang] !== sha8(T.ogCard(makeCtx(lang, 'home')))) warnings.add(`OG image for "${lang}" is outdated (name/role/stack changed) — run: npm run og`);
  }

  for (const [lang, p] of Object.entries(site.contact.cv ?? {}))
    if (p && !hasPublic(p)) warnings.add(`CV (${lang}) not found at public${p} — button hidden`);

  console.log(`✓ built ${pages.length} pages → dist/`);
  for (const p of pages) console.log(`  ${p}`);
  if (missingIcons.size)
    console.log(`\nℹ text badges (no simple-icons glyph): ${[...missingIcons].join(', ')}\n  add public/icons/<slug>.svg to override`);
  const todos = [...new Set(findTodos(site).map((p) => p.replace(/\.(en|ru)$/, '')))];
  if (todos.length) console.log(`\n✎ ${todos.length} TODO placeholders in content/site.mjs:\n  ${todos.join('\n  ')}`);
  if (warnings.size) console.log(`\n⚠ ${[...warnings].join('\n⚠ ')}`);
}

if (process.argv.includes('--og')) generateOg();
build();

// ── Dev server ───────────────────────────────────────────────
if (process.argv.includes('--serve')) {
  const PORT = Number(process.env.PORT) || 3000;
  const TYPES = { '.html': 'text/html; charset=utf-8', '.css': 'text/css', '.js': 'text/javascript', '.svg': 'image/svg+xml', '.pdf': 'application/pdf', '.png': 'image/png', '.jpg': 'image/jpeg', '.txt': 'text/plain' };
  http.createServer((req, res) => {
    const urlPath = decodeURIComponent(new URL(req.url, 'http://x').pathname);
    let file = path.join(DIST, urlPath);
    if (!file.startsWith(DIST)) return res.writeHead(400).end();
    if (fs.existsSync(file) && fs.statSync(file).isDirectory()) {
      if (!urlPath.endsWith('/')) return res.writeHead(308, { Location: urlPath + '/' }).end(); // mirrors trailingSlash
      file = path.join(file, 'index.html');
    }
    const ok = fs.existsSync(file);
    if (!ok) file = path.join(DIST, '404.html');
    res.writeHead(ok ? 200 : 404, { 'Content-Type': TYPES[path.extname(file)] ?? 'application/octet-stream' });
    fs.createReadStream(file).pipe(res);
  }).listen(PORT, () => console.log(`\n→ http://localhost:${PORT}  (restarts on changes in src/, content/, public/)`));
}
