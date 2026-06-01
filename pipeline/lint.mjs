#!/usr/bin/env node
// Content doctor for the Physical AI Thesaurus.
//
// Catches the things `astro build` does NOT: projects that render as "not placed"
// on an axis, grid groups silently dropped to "ungrouped", orphan projects no card
// references, images hosted without a license, attribute labels that drift from the
// shared vocabulary, and likely duplicate project records.
//
// Usage:  node pipeline/lint.mjs            (report everything)
//         node pipeline/lint.mjs --errors   (only ERROR-level findings)
//         node pipeline/lint.mjs --json      (machine-readable)
// Exit code is non-zero when any ERROR is found, so it can gate a publish.

import { readdirSync, readFileSync, existsSync } from 'node:fs';
import { join, basename } from 'node:path';

const ROOT = process.cwd();
const PROJECTS_DIR = join(ROOT, 'src/content/projects');
const CARDS_DIR = join(ROOT, 'src/content/cards');
const PUBLIC_DIR = join(ROOT, 'public');

const argv = new Set(process.argv.slice(2));
const ONLY_ERRORS = argv.has('--errors');
const AS_JSON = argv.has('--json');

const findings = [];
const add = (level, area, id, msg) => findings.push({ level, area, id, msg });

// --- minimal YAML-frontmatter parser (block style, 2-space indent + `- ` lists) ---
// Tailored to the card schema; tolerant of inline `{...}` JSON values.
function parseFrontmatter(text) {
  const m = text.match(/^---\n([\s\S]*?)\n---/);
  if (!m) return null;
  const lines = m[1].split('\n').filter((l) => l.trim() !== '' && !l.trim().startsWith('#'));
  const root = {};
  // Each frame owns entries that appear at an indent strictly greater than `parentIndent`.
  const stack = [{ parentIndent: -1, container: root, key: null, parent: null }];
  const coerce = (raw) => {
    const v = raw.trim();
    if (v === '') return undefined;
    if ((v.startsWith('{') && v.endsWith('}')) || (v.startsWith('[') && v.endsWith(']'))) {
      try { return JSON.parse(v); } catch { /* fall through */ }
    }
    if ((v.startsWith('"') && v.endsWith('"')) || (v.startsWith("'") && v.endsWith("'"))) {
      return v.slice(1, -1);
    }
    if (v === 'null') return null;
    if (v === 'true') return true;
    if (v === 'false') return false;
    if (/^-?\d+(\.\d+)?$/.test(v)) return Number(v);
    return v;
  };
  for (const line of lines) {
    const indent = line.length - line.trimStart().length;
    while (stack.length > 1 && indent <= stack[stack.length - 1].parentIndent) stack.pop();
    const frame = stack[stack.length - 1];
    const content = line.trim();
    if (content.startsWith('- ')) {
      // list item: the current frame's key holds an array
      if (!Array.isArray(frame.parent[frame.key])) frame.parent[frame.key] = [];
      frame.parent[frame.key].push(coerce(content.slice(2)));
      continue;
    }
    const ci = content.indexOf(':');
    if (ci === -1) continue;
    const key = content.slice(0, ci).trim();
    const value = coerce(content.slice(ci + 1));
    if (value === undefined) {
      // opens a nested block — object now, may become an array if `- ` lines follow
      const child = {};
      frame.container[key] = child;
      stack.push({ parentIndent: indent, container: child, key, parent: frame.container });
    } else {
      frame.container[key] = value;
    }
  }
  return root;
}

function loadProjects() {
  const map = new Map();
  if (!existsSync(PROJECTS_DIR)) return map;
  for (const f of readdirSync(PROJECTS_DIR).filter((f) => f.endsWith('.json'))) {
    const id = basename(f, '.json');
    try {
      map.set(id, { id, file: f, ...JSON.parse(readFileSync(join(PROJECTS_DIR, f), 'utf8')) });
    } catch (e) {
      add('ERROR', 'project', id, `invalid JSON: ${e.message}`);
    }
  }
  return map;
}

function loadCards() {
  const map = new Map();
  if (!existsSync(CARDS_DIR)) return map;
  for (const f of readdirSync(CARDS_DIR).filter((f) => f.endsWith('.md'))) {
    const id = basename(f, '.md');
    const fm = parseFrontmatter(readFileSync(join(CARDS_DIR, f), 'utf8'));
    if (!fm) { add('ERROR', 'card', id, 'no frontmatter found'); continue; }
    map.set(id, { id, file: f, ...fm });
  }
  return map;
}

const projects = loadProjects();
const cards = loadCards();

// --- build reference graph ---
const referencedBy = new Map(); // projectId -> Set(cardId)
for (const card of cards.values()) {
  const ids = Array.isArray(card.project_ids) ? card.project_ids : [];
  for (const pid of ids) {
    if (!referencedBy.has(pid)) referencedBy.set(pid, new Set());
    referencedBy.get(pid).add(card.id);
    if (!projects.has(pid)) {
      add('ERROR', 'reference', card.id, `references missing project "${pid}"`);
    }
  }
}

// --- CHECK: display-mode requirements (the "not placed / not plotted / ungrouped" trap) ---
const metricsOf = (pid) => (projects.get(pid)?.metrics) || {};
const attrsOf = (pid) => (projects.get(pid)?.attributes) || {};
for (const card of cards.values()) {
  const d = card.display || { mode: 'grid' };
  const ids = Array.isArray(card.project_ids) ? card.project_ids : [];
  if (d.mode === 'axis-1d') {
    const metric = d.axis?.metric;
    if (!metric) { add('ERROR', 'display', card.id, 'axis-1d card has no axis.metric'); continue; }
    for (const pid of ids) {
      if (projects.has(pid) && typeof metricsOf(pid)[metric] !== 'number')
        add('ERROR', 'placement', card.id, `"${pid}" lacks metric "${metric}" → renders as NOT PLACED`);
    }
  } else if (d.mode === 'scatter-2d') {
    for (const ax of ['x', 'y']) {
      const metric = d[ax]?.metric;
      if (!metric) { add('ERROR', 'display', card.id, `scatter-2d card has no ${ax}.metric`); continue; }
      for (const pid of ids) {
        if (projects.has(pid) && typeof metricsOf(pid)[metric] !== 'number')
          add('ERROR', 'placement', card.id, `"${pid}" lacks ${ax} metric "${metric}" → renders as NOT PLOTTED`);
      }
    }
  } else if (d.mode === 'grid' && d.groupBy) {
    for (const pid of ids) {
      const vals = attrsOf(pid)[d.groupBy];
      if (projects.has(pid) && (!Array.isArray(vals) || vals.length === 0))
        add('WARN', 'grouping', card.id, `"${pid}" lacks attribute "${d.groupBy}" → falls into UNGROUPED`);
    }
  }
}

// --- CHECK: orphan projects (authored but no card uses them) ---
for (const p of projects.values()) {
  if (!referencedBy.has(p.id)) add('WARN', 'orphan', p.id, 'no card references this project');
}

// --- CHECK: project completeness ---
for (const p of projects.values()) {
  if (!Array.isArray(p.sources) || p.sources.length === 0)
    add('WARN', 'project', p.id, 'has no sources');
  if (!p.attributes || Object.keys(p.attributes).length === 0)
    add('WARN', 'project', p.id, 'has no attributes (will not appear in any grouped grid)');
  for (const [m, v] of Object.entries(p.metrics || {})) {
    if (typeof v !== 'number') add('ERROR', 'metric', p.id, `metric "${m}" is not a number`);
    else if (v < 1 || v > 5) add('WARN', 'metric', p.id, `metric "${m}"=${v} is outside the 1–5 scale`);
  }
}

// --- CHECK: images / rights / files ---
for (const p of projects.values()) {
  for (const img of p.images || []) {
    if (!img.alt_text || !String(img.alt_text).trim())
      add('WARN', 'image', p.id, `image "${img.image_id || '?'}" has empty alt_text`);
    if (img.local_image) {
      const rel = String(img.local_image).replace(/^\//, '');
      if (!existsSync(join(PUBLIC_DIR, rel)))
        add('ERROR', 'image', p.id, `local_image "${img.local_image}" not found in public/`);
      const risky = ['needs_permission', 'unknown'];
      if (risky.includes(img.rights_status))
        add('WARN', 'rights', p.id, `hosts local_image but rights_status="${img.rights_status}" — confirm license before publishing`);
    }
  }
}

// --- CHECK: interactions honor the "verified" contract ---
for (const p of projects.values()) {
  for (const ix of p.interactions || []) {
    const where = `"${ix.title || '?'}"`;
    if ((ix.provenance === 'documented' || ix.provenance === 'observed') && !ix.source_url)
      add('ERROR', 'interaction', p.id, `${ix.provenance} interaction ${where} has no source_url — cite it or mark it "proposed"`);
    if (ix.source_url && !/^https?:\/\//.test(ix.source_url))
      add('ERROR', 'interaction', p.id, `interaction ${where} has a non-URL source_url`);
    if (!ix.description || !String(ix.description).trim())
      add('WARN', 'interaction', p.id, `interaction ${where} has an empty description`);
  }
}

// --- CHECK: attribute-vocabulary drift (singleton values per key = likely typo / non-normalized) ---
const valueFreq = new Map(); // `${key}` -> Map(value -> count)
for (const p of projects.values()) {
  for (const [key, vals] of Object.entries(p.attributes || {})) {
    if (!valueFreq.has(key)) valueFreq.set(key, new Map());
    for (const v of vals || []) valueFreq.get(key).set(v, (valueFreq.get(key).get(v) || 0) + 1);
  }
}
for (const [key, freq] of valueFreq) {
  if (freq.size < 2) continue; // a key with one value overall is fine
  for (const [v, n] of freq) {
    if (n === 1) add('WARN', 'vocab', key, `value "${v}" used only once — confirm it matches the controlled vocabulary in readme.md (not a typo / variant)`);
  }
}

// --- CHECK: likely duplicate project records (same normalized name, different id) ---
const byName = new Map();
const norm = (s) => String(s || '').toLowerCase().replace(/[^a-z0-9]+/g, ' ').trim();
for (const p of projects.values()) {
  const k = norm(p.name);
  if (!k) continue;
  if (!byName.has(k)) byName.set(k, []);
  byName.get(k).push(p.id);
}
for (const [k, ids] of byName) {
  if (ids.length > 1) add('WARN', 'duplicate', ids.join(', '), `multiple project ids share the name "${k}" — should they be merged?`);
}

// --- report ---
const order = { ERROR: 0, WARN: 1 };
findings.sort((a, b) => (order[a.level] - order[b.level]) || a.area.localeCompare(b.area));
const shown = ONLY_ERRORS ? findings.filter((f) => f.level === 'ERROR') : findings;
const errors = findings.filter((f) => f.level === 'ERROR').length;
const warns = findings.filter((f) => f.level === 'WARN').length;

if (AS_JSON) {
  console.log(JSON.stringify({ errors, warns, findings: shown }, null, 2));
} else {
  const C = { ERROR: '\x1b[31m', WARN: '\x1b[33m', reset: '\x1b[0m', dim: '\x1b[2m' };
  if (shown.length === 0) console.log('\x1b[32m✓ lint-thesaurus: no findings\x1b[0m');
  for (const f of shown) {
    console.log(`${C[f.level]}${f.level.padEnd(5)}${C.reset} ${C.dim}[${f.area}]${C.reset} ${f.id}: ${f.msg}`);
  }
  console.log(`\n${projects.size} projects, ${cards.size} cards — ${errors} error(s), ${warns} warning(s)`);
}

process.exitCode = errors > 0 ? 1 : 0;
