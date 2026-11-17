#!/usr/bin/env node
// kb-dashboard — 마크다운 지식 베이스를 로컬 HTML 한 장으로 모아 본다(보기 전용).
// 사용: node kb-dashboard.mjs <build|add-artifact|check|selftest> --root <저장소> [옵션]
// 원칙: 저장소 규칙은 <저장소>/.claude/kb-dashboard.json만 믿는다 · 외부 패키지 없음(Node 18+) ·
//       add-artifact 외에는 저장소에 쓰지 않는다 · 페이지는 저장소 밖에만 만든다 · 외부 리소스를 싣지 않는다.
import fs from 'node:fs';
import path from 'node:path';
import os from 'node:os';
import { spawn } from 'node:child_process';
import { pathToFileURL } from 'node:url';

const MAX_BODY = 200000;
const LONG_VALUE = 120;

class Fail extends Error { constructor(msg, code = 2) { super(msg); this.code = code; } }
const fail = (msg, code = 2) => { throw new Fail(msg, code); };

// ---------- 문구 표 (키 집합은 selftest가 대조한다) ----------
const T = {
  ko: {
    home: '홈', todo: '할일', art: '아티팩트', tip: '팁', rec: '기록', tag: '태그·프로젝트', warn: '형식 경고',
    searchPh: '제목·태그·본문 검색', generated: '만든 시각', overdue: '기한 경과', active: '진행 중',
    recentArt: '최근 아티팩트', recentTip: '최근 팁', recentChange: '최근 변경', none: '없음', more: '전체 보기',
    archive: '보관', links: '게시 링크', outputs: '로컬 산출물', output: '산출물', all: '전체',
    projects: '프로젝트', tags: '태그', noResult: '검색 결과가 없습니다.',
    notConfigured: '설정에 없어 표시하지 않습니다.', truncated: '(본문이 길어 여기서 잘렸습니다)',
    warnHint: '분류 정보가 없거나 설정과 맞지 않아 목록에 넣지 못한 항목입니다.',
    noFm: 'frontmatter 없음', badType: '설정에 없는 type', badState: '설정에 없는 상태', badUrl: 'http(s) 주소가 아님',
    viewOnly: '보기 전용 페이지입니다. 다시 만들려면 스킬을 호출하세요.', targets: '대상', menu: '메뉴',
  },
  en: {
    home: 'Home', todo: 'Todos', art: 'Artifacts', tip: 'Tips', rec: 'Records', tag: 'Tags & projects', warn: 'Format warnings',
    searchPh: 'Search titles, tags, text', generated: 'Generated', overdue: 'Overdue', active: 'In progress',
    recentArt: 'Recent artifacts', recentTip: 'Recent tips', recentChange: 'Recently changed', none: 'None', more: 'View all',
    archive: 'Archive', links: 'Published links', outputs: 'Local outputs', output: 'Output', all: 'All',
    projects: 'Projects', tags: 'Tags', noResult: 'No results.',
    notConfigured: 'Not shown because it is not in the config.', truncated: '(Truncated here because the text is long)',
    warnHint: 'Items left out of the lists because their classification is missing or does not match the config.',
    noFm: 'no frontmatter', badType: 'type not in config', badState: 'state not in config', badUrl: 'not an http(s) address',
    viewOnly: 'This page is view-only. Call the skill to rebuild it.', targets: 'Targets', menu: 'Menu',
  },
};
// 아티팩트 줄의 필드 이름 — 읽을 때는 두 언어 모두 받고, 쓸 때는 설정 lang을 따른다.
const AK = {
  ko: { purpose: '용도', project: '프로젝트', added: '등록', type: '아티팩트', heading: '아티팩트' },
  en: { purpose: 'purpose', project: 'project', added: 'added', type: 'artifact', heading: 'Artifacts' },
};

// ---------- 공용 ----------
const esc = s => String(s).replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
const readText = f => fs.readFileSync(f, 'utf8').replace(/^﻿/, '').replace(/\r\n?/g, '\n');
const today = () => { const d = new Date(); return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`; };
const dateOf = ms => { const d = new Date(ms); return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`; };
const isDir = p => { try { return fs.statSync(p).isDirectory(); } catch { return false; } };
const isFile = p => { try { return fs.statSync(p).isFile(); } catch { return false; } };
const normCase = p => (process.platform === 'win32' ? p.toLowerCase() : p);
const isInside = (child, parent) => {
  const rel = path.relative(normCase(path.resolve(parent)), normCase(path.resolve(child)));
  return rel === '' || (!rel.startsWith('..') && !path.isAbsolute(rel));
};
const isHttp = u => /^https?:\/\/\S+$/i.test(String(u));

// ---------- 설정 ----------
export function loadConfig(root, configPath) {
  const file = configPath ? path.resolve(configPath) : path.join(root, '.claude', 'kb-dashboard.json');
  if (!isFile(file)) fail(`config not found: ${file}`);
  let cfg;
  try { cfg = JSON.parse(readText(file)); } catch (e) { fail(`config is not valid JSON: ${file} (${e.message})`); }
  if (!cfg || typeof cfg !== 'object' || Array.isArray(cfg)) fail('config must be a JSON object');
  if (!T[cfg.lang]) fail('config "lang" must be "ko" or "en"');
  const strArr = (v, name, allowEmpty) => {
    if (!Array.isArray(v) || v.some(x => typeof x !== 'string' || !x.trim()) || (!allowEmpty && !v.length)) fail(`config "${name}" must be an array of strings${allowEmpty ? '' : ' (not empty)'}`);
  };
  strArr(cfg.targets, 'targets', true);
  strArr(cfg.types, 'types', false);
  for (const t of cfg.targets) if (path.isAbsolute(t) || t.split(/[\\/]/).includes('..')) fail(`config "targets" must be folders inside the repository: ${t}`);
  if (cfg.exclude != null) strArr(cfg.exclude, 'exclude', true);
  if (cfg.todo != null) {
    if (typeof cfg.todo.file !== 'string' || !cfg.todo.file) fail('config "todo.file" is required when "todo" is set');
    strArr(cfg.todo.states, 'todo.states', false);
  }
  if (cfg.artifacts != null && typeof cfg.artifacts !== 'object') fail('config "artifacts" must be an object');
  return { title: path.basename(path.resolve(root)), exclude: [], tipType: null, todo: null, artifacts: null, output: null, ...cfg };
}

// ---------- 파싱 ----------
export function parseFrontmatter(text) {
  const src = String(text).replace(/^﻿/, '').replace(/\r\n?/g, '\n');
  if (!src.startsWith('---\n')) return { fm: null, body: src };
  const end = src.indexOf('\n---', 3);
  if (end < 0) return { fm: null, body: src };
  const after = src.indexOf('\n', end + 1);
  const fm = {};
  for (const line of src.slice(4, end).split('\n')) {
    const m = line.match(/^([^\s:#][^:]*):\s*(.*)$/);
    if (!m) continue;
    let v = m[2].trim();
    const unq = s => s.trim().replace(/^(["'])(.*)\1$/, '$2');
    if (/^\[.*\]$/.test(v)) fm[m[1].trim()] = v.slice(1, -1).split(',').map(unq).filter(Boolean);
    else fm[m[1].trim()] = unq(v.replace(/\s+#.*$/, ''));
  }
  return { fm, body: after < 0 ? '' : src.slice(after + 1) };
}

// "키:값 · 키:값" → [[키, 값]…]. 키 꼴이 아닌 조각은 앞 값에 이어 붙인다(값 안에 구분자가 든 경우).
function splitFields(rest) {
  const out = [];
  for (const piece of String(rest || '').split(' · ')) {
    const m = piece.match(/^([^\s:]{1,12}):(.*)$/);
    if (m && !m[2].startsWith('//')) out.push([m[1], m[2].trim()]);
    else if (out.length) out[out.length - 1][1] += ' · ' + piece;
    else if (piece.trim()) out.push(['', piece.trim()]);
  }
  return out;
}

export function parseTodoLine(line, todoCfg, now = today()) {
  const m = String(line).match(/^- \[([^\]]+)\] (.*)$/);
  if (!m) return null;
  const cut = m[2].indexOf(' — ');
  const title = (cut < 0 ? m[2] : m[2].slice(0, cut)).trim();
  const fields = cut < 0 ? [] : splitFields(m[2].slice(cut + 3));
  const state = m[1].trim();
  const known = todoCfg.states.includes(state);
  const due = todoCfg.dueKey ? (fields.find(f => f[0] === todoCfg.dueKey) || [])[1] : null;
  const dueDate = due && (due.match(/\d{4}-\d{2}-\d{2}/) || [])[0];
  const overdue = !!(dueDate && dueDate < now && state !== todoCfg.done);
  return { state, known, title, fields, overdue };
}

export function parseArtifactLine(line) {
  const m = String(line).match(/^- (.+?) — (.*)$/);
  if (!m) return null;
  const fields = splitFields(m[2]);
  const get = (...keys) => (fields.find(f => keys.includes(f[0])) || [])[1] || '';
  const url = get('URL', 'url');
  if (!url) return null;
  return { title: m[1].trim(), url, purpose: get(AK.ko.purpose, AK.en.purpose), project: get(AK.ko.project, AK.en.project), date: get(AK.ko.added, AK.en.added) };
}

// ---------- 마크다운(부분 집합) → HTML. 먼저 이스케이프하고 그 위에 마크업을 입힌다. ----------
function inline(s) {
  return String(s).split(/(`[^`]+`)/).map(p => {
    if (p.length > 2 && p.startsWith('`') && p.endsWith('`')) return '<code>' + esc(p.slice(1, -1)) + '</code>';
    let h = esc(p);
    const a = (u, t) => `<a href="${u}" target="_blank" rel="noopener noreferrer">${t}</a>`;
    h = h.replace(/\[([^\]]+)\]\(([^)\s]+)\)/g, (m, t, u) => (/^https?:\/\//i.test(u) ? a(u, t) : `${t} (${u})`));
    h = h.replace(/(^|[\s(])(https?:\/\/[^\s<)]+)/g, (m, pre, u) => {
      const tail = (u.match(/[.,;:!?]+$/) || [''])[0];
      const core = tail ? u.slice(0, -tail.length) : u;
      return pre + a(core, core) + tail;
    });
    return h.replace(/\*\*([^*]+)\*\*/g, '<strong>$1</strong>');
  }).join('');
}

export function renderMarkdown(md) {
  const L = String(md).replace(/\r\n?/g, '\n').split('\n');
  const out = [];
  const lists = [];
  let para = [];
  const LI = /^(\s*)([-*+]|\d+[.)])\s+(.*)$/;
  const SEP = /^\s*\|?\s*:?-{2,}:?\s*(\|\s*:?-{2,}:?\s*)*\|?\s*$/;
  const flushP = () => { if (para.length) { out.push('<p>' + para.map(inline).join('<br>') + '</p>'); para = []; } };
  const closeLists = (to = 0) => { while (lists.length > to) out.push('</li></' + lists.pop().tag + '>'); };
  const cells = row => row.trim().replace(/^\|/, '').replace(/\|$/, '').split('|').map(c => c.trim());
  let i = 0;
  while (i < L.length) {
    const line = L[i];
    const fence = line.match(/^\s*(```|~~~)/);
    if (fence) {
      flushP(); closeLists();
      const buf = [];
      i++;
      while (i < L.length && !L[i].trim().startsWith(fence[1])) buf.push(L[i++]);
      i++;
      out.push('<pre><code>' + esc(buf.join('\n')) + '</code></pre>');
      continue;
    }
    if (!line.trim()) {
      flushP();
      let j = i + 1;
      while (j < L.length && !L[j].trim()) j++;
      if (lists.length && !(j < L.length && (LI.test(L[j]) || /^\s{2,}\S/.test(L[j])))) closeLists();
      i = j;
      continue;
    }
    const h = line.match(/^(#{1,6})\s+(.*)$/);
    if (h) { flushP(); closeLists(); const n = Math.min(6, h[1].length + 2); out.push(`<h${n}>${inline(h[2])}</h${n}>`); i++; continue; }
    if (/^\s*([-*_])(\s*\1){2,}\s*$/.test(line)) { flushP(); closeLists(); out.push('<hr>'); i++; continue; }
    if (line.includes('|') && i + 1 < L.length && L[i + 1].includes('-') && SEP.test(L[i + 1])) {
      flushP(); closeLists();
      const head = cells(line);
      i += 2;
      const rows = [];
      while (i < L.length && L[i].includes('|') && L[i].trim()) rows.push(cells(L[i++]));
      out.push('<div class="tbl"><table><thead><tr>' + head.map(c => `<th>${inline(c)}</th>`).join('') + '</tr></thead><tbody>'
        + rows.map(r => '<tr>' + r.map(c => `<td>${inline(c)}</td>`).join('') + '</tr>').join('') + '</tbody></table></div>');
      continue;
    }
    if (/^\s*>/.test(line)) {
      flushP(); closeLists();
      const buf = [];
      while (i < L.length && /^\s*>/.test(L[i])) buf.push(L[i++].replace(/^\s*>\s?/, ''));
      out.push('<blockquote>' + buf.map(inline).join('<br>') + '</blockquote>');
      continue;
    }
    const li = line.match(LI);
    if (li) {
      flushP();
      const indent = li[1].length;
      const tag = /\d/.test(li[2]) ? 'ol' : 'ul';
      while (lists.length && lists[lists.length - 1].indent > indent) out.push('</li></' + lists.pop().tag + '>');
      const top = lists[lists.length - 1];
      if (!top || top.indent < indent) { out.push(`<${tag}><li>`); lists.push({ indent, tag }); }
      else if (top.tag !== tag) { closeLists(lists.length - 1); out.push(`<${tag}><li>`); lists.push({ indent, tag }); }
      else out.push('</li><li>');
      const cb = li[3].match(/^\[([ xX])\]\s+(.*)$/);
      out.push(cb ? (cb[1] === ' ' ? '☐ ' : '☑ ') + inline(cb[2]) : inline(li[3]));
      i++;
      continue;
    }
    if (lists.length && /^\s{2,}\S/.test(line)) { out.push('<br>' + inline(line.trim())); i++; continue; }
    closeLists();
    para.push(line.trim());
    i++;
  }
  flushP(); closeLists();
  return out.join('\n');
}

// ---------- 스캔 ----------
function walk(dir, skip, out = []) {
  let ents;
  try { ents = fs.readdirSync(dir, { withFileTypes: true }); } catch { return out; }
  for (const e of ents.sort((a, b) => a.name.localeCompare(b.name))) {
    if (skip.has(e.name)) continue;
    const p = path.join(dir, e.name);
    if (e.isDirectory()) walk(p, skip, out);
    else if (e.isFile()) out.push(p);
  }
  return out;
}

export function scanTarget(root, cfg, target, ids = { n: 0 }) {
  const dir = path.join(root, target);
  const rel = p => path.relative(root, p).replace(/\\/g, '/');
  const res = { name: target || cfg.title, records: [], todos: [], artifacts: [], outputs: [], warnings: [] };
  const record = (file, type, fm, body) => {
    const cut = body.length > MAX_BODY;
    const title = (body.match(/^#\s+(.+)$/m) || [])[1] || path.basename(file).replace(/\.[^.]+$/, '');
    let updated = (fm && fm.updated) || '';
    if (!/^\d{4}-\d{2}-\d{2}/.test(updated)) { try { updated = dateOf(fs.statSync(file).mtimeMs); } catch { updated = ''; } }
    return {
      id: 'r' + (++ids.n), path: rel(file), type, title: title.trim(),
      project: (fm && typeof fm.project === 'string' && fm.project) || '',
      tags: fm && Array.isArray(fm.tags) ? fm.tags : (fm && fm.tags ? [String(fm.tags)] : []),
      updated: updated.slice(0, 10), html: renderMarkdown(cut ? body.slice(0, MAX_BODY) : body), truncated: cut,
    };
  };
  const skip = new Set(['.git', '.claude', 'node_modules', ...cfg.exclude]);
  const todoFile = cfg.todo ? path.join(dir, cfg.todo.file) : null;
  const artFile = cfg.artifacts && cfg.artifacts.file ? path.join(dir, cfg.artifacts.file) : null;
  const archiveDir = cfg.todo && cfg.todo.archiveDir ? path.join(dir, cfg.todo.archiveDir) : null;
  const outputsDir = cfg.artifacts && cfg.artifacts.outputsDir ? path.join(dir, cfg.artifacts.outputsDir) : null;
  const same = (a, b) => a && b && normCase(path.resolve(a)) === normCase(path.resolve(b));
  // 대상이 저장소 루트 자체일 때 다른 대상 폴더를 다시 훑지 않는다.
  if (!target) for (const t of cfg.targets) skip.add(t.split(/[\\/]/)[0]);

  for (const file of walk(dir, skip)) {
    if (!file.toLowerCase().endsWith('.md')) continue;
    if (same(file, todoFile) || same(file, artFile)) continue;
    if (archiveDir && isInside(file, archiveDir)) continue;
    if (outputsDir && isInside(file, outputsDir)) continue;
    const { fm, body } = parseFrontmatter(readText(file));
    if (!fm || !fm.type) { res.warnings.push({ path: rel(file), why: 'noFm' }); continue; }
    if (!cfg.types.includes(fm.type)) { res.warnings.push({ path: rel(file), why: 'badType', detail: String(fm.type) }); continue; }
    res.records.push(record(file, fm.type, fm, body));
  }
  // 안내용 HTML 주석의 예시 줄은 항목이 아니다. 줄 단위로만 거른다 — 여러 줄 주석을 통째로 지우면
  // 주석 사이에 끼어든 실제 항목까지 사라진다.
  const bodyLines = file => parseFrontmatter(readText(file)).body.split('\n')
    .filter(l => !/^\s*<!--/.test(l) && !/-->\s*$/.test(l));
  const todoLines = (file, archived) => {
    for (const line of bodyLines(file)) {
      const td = parseTodoLine(line, cfg.todo);
      if (!td) continue;
      if (!td.known) res.warnings.push({ path: rel(file), why: 'badState', detail: td.state });
      res.todos.push({ ...td, archived });
    }
  };
  if (todoFile && isFile(todoFile)) todoLines(todoFile, false);
  if (archiveDir && isDir(archiveDir)) for (const f of walk(archiveDir, skip)) if (f.toLowerCase().endsWith('.md')) todoLines(f, true);
  if (artFile && isFile(artFile)) {
    for (const line of bodyLines(artFile)) {
      const a = parseArtifactLine(line);
      if (!a) continue;
      if (!isHttp(a.url)) { res.warnings.push({ path: rel(artFile), why: 'badUrl', detail: a.title }); continue; }
      res.artifacts.push(a);
    }
  }
  if (outputsDir && isDir(outputsDir)) {
    for (const f of walk(outputsDir, skip)) {
      const ext = path.extname(f).toLowerCase();
      if (ext !== '.md' && ext !== '.html' && ext !== '.htm') continue;
      const base = path.basename(f, path.extname(f));
      const dm = base.match(/^(\d{4}-\d{2}-\d{2})-(.+)$/);
      const o = { title: dm ? dm[2] : base, date: dm ? dm[1] : dateOf(fs.statSync(f).mtimeMs), path: rel(f), href: pathToFileURL(f).href, record: null };
      if (ext === '.md') { o.record = record(f, null, null, parseFrontmatter(readText(f)).body); o.record.title = o.title; o.record.updated = o.date; }
      res.outputs.push(o);
    }
  }
  return res;
}

export function collect(root, cfg) {
  const ids = { n: 0 };
  const names = cfg.targets.length ? cfg.targets.filter(t => isDir(path.join(root, t))) : [''];
  if (!names.length) fail('none of the configured "targets" folders exist in ' + root);
  return names.map(t => scanTarget(root, cfg, t, ids));
}

const counts = t => ({
  name: t.name, records: t.records.length, todos: t.todos.filter(x => !x.archived).length,
  artifacts: t.artifacts.length, outputs: t.outputs.length, warnings: t.warnings.length,
});

// ---------- 아티팩트 한 줄 기록(이 스크립트가 저장소에 쓰는 유일한 자리) ----------
export function addArtifact({ root, cfg, target, url, title, purpose, project }) {
  if (!cfg.artifacts || !cfg.artifacts.file) fail('config "artifacts.file" is not set');
  if (!/^https:\/\/\S+$/.test(String(url || ''))) fail('--url must be an https:// address');
  if (!title || !String(title).trim()) fail('--title is required');
  const tgt = target || '';
  if (cfg.targets.length ? !cfg.targets.includes(tgt) : tgt !== '') fail(`--target must be one of: ${cfg.targets.join(', ') || '(none - omit it)'}`);
  const dir = path.join(root, tgt);
  if (!isDir(dir)) fail(`target folder does not exist: ${dir}`);
  const k = AK[cfg.lang];
  const clean = s => String(s).replace(/[\r\n]+/g, ' ').replace(/ — /g, ' - ').replace(/ · /g, ' / ').trim();
  const day = today();
  const parts = [`URL:${url}`];
  if (purpose) parts.push(`${k.purpose}:${clean(purpose)}`);
  if (project) parts.push(`${k.project}:${clean(project)}`);
  parts.push(`${k.added}:${day}`);
  const line = `- ${clean(title)} — ${parts.join(' · ')}`;
  const file = path.join(dir, cfg.artifacts.file);
  if (!isFile(file)) {
    fs.writeFileSync(file, `---\ntype: ${k.type}\nupdated: ${day}\n---\n\n# ${k.heading} (${tgt || cfg.title})\n\n${line}\n`);
    return { status: 'OK', file };
  }
  const raw = fs.readFileSync(file, 'utf8');
  if (raw.split(/\r?\n/).some(l => { const a = parseArtifactLine(l); return a && a.url === url; })) return { status: 'EXISTS', file };
  const eol = raw.includes('\r\n') ? '\r\n' : '\n';
  let next = raw.replace(/^(---\r?\n[\s\S]*?^updated:[ \t]*)\S*/m, `$1${day}`);
  if (!next.endsWith('\n')) next += eol;
  fs.writeFileSync(file, next + line + eol);
  return { status: 'OK', file };
}

// ---------- HTML ----------
const CSS = String.raw`
:root{--bg:#F9FAFB;--surface:#FFFFFF;--raised:#F2F4F6;--ink:#191F28;--ink2:#566070;--line:#E5E8EB;--line2:#D1D6DB;
--brand:#1B64DA;--brand-soft:#E8F1FD;--err:#C5221F;--err-soft:#FDECEA;--ok:#0B6E45;--warn:#8F5200;
--r:10px;--r-sm:6px;--sans:system-ui,-apple-system,"Segoe UI","Apple SD Gothic Neo","Malgun Gothic",sans-serif;
--mono:ui-monospace,Consolas,"D2Coding","Courier New",monospace}
@media (prefers-color-scheme:dark){:root{--bg:#0F1317;--surface:#191F28;--raised:#232B36;--ink:#F2F4F6;--ink2:#B0B8C1;--line:#2B3440;--line2:#3B4654;
--brand:#7DB0FF;--brand-soft:#1C2C45;--err:#FF9C94;--err-soft:#3A1F1E;--ok:#62D3A2;--warn:#F2B866}}
*{box-sizing:border-box}[hidden]{display:none!important}
html{color-scheme:light dark}
body{margin:0;background:var(--bg);color:var(--ink);font:15px/1.6 var(--sans);-webkit-text-size-adjust:100%}
button,input{font:inherit;color:inherit}
a{color:var(--brand)}
.top{position:sticky;top:0;z-index:5;background:var(--surface);border-bottom:1px solid var(--line)}
.top-in{max-width:1320px;margin:0 auto;padding:12px 24px;display:flex;align-items:center;gap:16px}
h1{font-size:18px;margin:0;font-weight:700;white-space:nowrap}
.tabs{display:flex;gap:4px}
.tab{border:1px solid transparent;background:none;padding:6px 14px;border-radius:999px;cursor:pointer;color:var(--ink2);font-weight:600}
.tab:hover{background:var(--raised)}
.tab.on{background:var(--brand-soft);color:var(--brand);border-color:var(--brand)}
#q{flex:1;min-width:160px;max-width:420px;margin-left:auto;padding:8px 12px;border:1px solid var(--line2);border-radius:var(--r-sm);background:var(--bg)}
.gen{color:var(--ink2);font-size:13px;white-space:nowrap}
button:focus-visible,input:focus-visible,a:focus-visible,summary:focus-visible{outline:2px solid var(--brand);outline-offset:2px}
.target{max-width:1320px;margin:0 auto;padding:24px;display:grid;grid-template-columns:200px minmax(0,1fr);gap:24px;align-items:start}
nav{position:sticky;top:76px;display:flex;flex-direction:column;gap:2px}
.navbtn{display:flex;justify-content:space-between;gap:8px;text-align:left;border:0;background:none;padding:8px 12px;border-radius:var(--r-sm);cursor:pointer;color:var(--ink2)}
.navbtn:hover{background:var(--raised)}
.navbtn.on{background:var(--brand-soft);color:var(--brand);font-weight:700}
.navbtn .n{font-variant-numeric:tabular-nums;font-size:13px}
.navbtn.alert .n{color:var(--err);font-weight:700}
h2{font-size:20px;margin:0 0 16px}
h3.sec{font-size:15px;margin:24px 0 8px;color:var(--ink2);font-weight:700}
h3.sec:first-of-type{margin-top:0}
.cards{display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:16px;align-items:start}
.card{background:var(--surface);border:1px solid var(--line);border-radius:var(--r);padding:16px;min-width:0}
.card.wide{grid-column:1/-1}
.card-h{display:flex;align-items:baseline;justify-content:space-between;gap:8px;margin-bottom:8px}
.card-h h3{font-size:15px;margin:0}
.card-h .n{color:var(--ink2);font-weight:400;margin-left:6px}
.card.alert .card-h h3{color:var(--err)}
.go{border:0;background:none;color:var(--brand);cursor:pointer;padding:2px 4px;font-size:13px}
.list{display:flex;flex-direction:column;gap:8px}
.panel{background:var(--surface);border:1px solid var(--line);border-radius:var(--r);padding:8px 16px}
.panel>.list{gap:0}
.panel>.list>*{border-bottom:1px solid var(--line)}
.panel>.list>*:last-child{border-bottom:0}
.empty{color:var(--ink2);margin:8px 0}
.row{min-width:0}
.rowbtn{display:flex;flex-wrap:wrap;align-items:baseline;gap:4px 12px;width:100%;text-align:left;border:0;background:none;padding:10px 0;cursor:pointer}
.rowbtn:hover .ttl{color:var(--brand)}
.rowbtn::before{content:"▸";color:var(--ink2);font-size:12px;width:10px}
.rowbtn[aria-expanded="true"]::before{content:"▾"}
.ttl{font-weight:600;overflow-wrap:anywhere}
.meta,.tags{color:var(--ink2);font-size:13px}
.body{padding:4px 0 16px 22px}
.path{font:12px var(--mono);color:var(--ink2);margin:0 0 8px;overflow-wrap:anywhere}
.todo{padding:10px 0;display:grid;grid-template-columns:auto minmax(0,1fr);gap:4px 10px;align-items:baseline}
.badge{font-size:12px;font-weight:700;padding:1px 8px;border-radius:999px;border:1px solid var(--line2);color:var(--ink2);white-space:nowrap}
.badge.s1{color:var(--brand);border-color:var(--brand)}
.badge.s2{color:var(--warn);border-color:var(--warn)}
.badge.done{color:var(--ok);border-color:var(--ok)}
.badge.over{color:var(--err);border-color:var(--err);background:var(--err-soft)}
.chips{grid-column:2;display:flex;flex-wrap:wrap;gap:4px 6px;font-size:13px;color:var(--ink2)}
.chip{background:var(--raised);border-radius:var(--r-sm);padding:1px 8px;overflow-wrap:anywhere}
.chip b{font-weight:600;color:var(--ink);margin-right:4px}
.chip.over b,.chip.over{color:var(--err)}
details.long{grid-column:2;font-size:13px;color:var(--ink2)}
details.long summary{cursor:pointer;overflow-wrap:anywhere}
details.long div{padding:6px 0 0;overflow-wrap:anywhere;color:var(--ink)}
details.fold>summary{cursor:pointer;font-weight:700;color:var(--ink2);padding:10px 0}
.art{padding:10px 0;display:flex;flex-wrap:wrap;gap:2px 12px;align-items:baseline}
.art a{font-weight:600;overflow-wrap:anywhere}
.filters{display:flex;flex-wrap:wrap;gap:6px;margin:0 0 8px}
.chip-f{border:1px solid var(--line2);background:var(--surface);border-radius:999px;padding:3px 12px;cursor:pointer;font-size:13px}
.chip-f.on{background:var(--brand-soft);border-color:var(--brand);color:var(--brand);font-weight:700}
.warnrow{padding:8px 0;font-size:14px}
.warnrow code{font:13px var(--mono);overflow-wrap:anywhere}
.foot{max-width:1320px;margin:0 auto;padding:0 24px 32px;color:var(--ink2);font-size:13px}
.md{overflow-wrap:anywhere}
.md h3,.md h4,.md h5,.md h6{margin:20px 0 8px;line-height:1.4}
.md h3{font-size:17px}.md h4{font-size:15px}.md h5,.md h6{font-size:14px}
.md p{margin:8px 0}.md ul,.md ol{margin:8px 0;padding-left:22px}
.md code{font:13px var(--mono);background:var(--raised);padding:1px 5px;border-radius:4px}
.md pre{background:var(--raised);padding:12px;border-radius:var(--r-sm);overflow:auto}
.md pre code{background:none;padding:0}
.md blockquote{margin:8px 0;padding:4px 12px;border-left:3px solid var(--line2);color:var(--ink2)}
.md .tbl{overflow:auto}
.md table{border-collapse:collapse;font-size:14px}
.md th,.md td{border:1px solid var(--line);padding:6px 10px;text-align:left;vertical-align:top}
.md th{background:var(--raised)}
.md hr{border:0;border-top:1px solid var(--line);margin:16px 0}
@media print{.top{position:static}nav,#q{display:none}.target{display:block}}
`;

const JS = String.raw`
(()=>{
const $$=(s,r)=>[...(r||document).querySelectorAll(s)];
const secs=$$('.target'),tabs=$$('.tab'),inp=document.getElementById('q');
let cur=secs[0];
function view(v){
  $$('.view',cur).forEach(e=>{e.hidden=e.dataset.v!==v;});
  $$('.navbtn',cur).forEach(b=>{b.classList.toggle('on',b.dataset.v===v);});
  if(v!=='search')cur.dataset.cur=v;
}
function textOf(el){
  if(el._t==null){
    const tp=el.dataset.id&&document.getElementById('t-'+el.dataset.id);
    el._t=(el.textContent+' '+(tp?tp.content.textContent:'')).toLowerCase();
  }
  return el._t;
}
function search(){
  const q=inp.value.trim().toLowerCase();
  if(!q){view(cur.dataset.cur||'home');return;}
  view('search');
  let n=0;
  $$('.view[data-v="search"] [data-s]',cur).forEach(el=>{const ok=textOf(el).includes(q);el.hidden=!ok;if(ok)n++;});
  const e=cur.querySelector('.view[data-v="search"] .empty');
  if(e)e.hidden=n>0;
}
function target(name){
  cur=secs.find(s=>s.dataset.t===name)||secs[0];
  secs.forEach(s=>{s.hidden=s!==cur;});
  tabs.forEach(b=>{const on=b.dataset.t===cur.dataset.t;b.classList.toggle('on',on);b.setAttribute('aria-selected',on?'true':'false');});
  if(inp.value.trim())search();else view(cur.dataset.cur||'home');
}
document.addEventListener('click',e=>{
  const b=e.target.closest('button');
  if(!b)return;
  if(b.classList.contains('tab'))target(b.dataset.t);
  else if(b.classList.contains('navbtn')||b.classList.contains('go')){inp.value='';view(b.dataset.v);window.scrollTo(0,0);}
  else if(b.classList.contains('rowbtn')){
    const r=b.parentElement,body=r.querySelector('.body');
    if(!body.firstChild){const tp=document.getElementById('t-'+r.dataset.id);if(tp)body.appendChild(tp.content.cloneNode(true));}
    const open=body.hidden;body.hidden=!open;b.setAttribute('aria-expanded',open?'true':'false');
  }
  else if(b.classList.contains('chip-f')){
    const v=b.closest('.view'),k=b.dataset.k,val=b.dataset.val;
    $$('.chip-f',v).forEach(c=>{c.classList.toggle('on',c===b);});
    $$('.row',v).forEach(r=>{r.hidden=k==='all'?false:k==='tag'?!r.dataset.tags.includes('|'+val+'|'):r.dataset.proj!==val;});
  }
});
inp.addEventListener('input',search);
target(secs[0].dataset.t);
})();
`;

export function buildHtml(targets, cfg, generatedAt) {
  const t = T[cfg.lang];
  const templates = [];
  const byDate = (a, b) => (a.updated < b.updated ? 1 : a.updated > b.updated ? -1 : a.title.localeCompare(b.title));
  const row = (r, label) => {
    const meta = [label || r.type, r.project, r.updated].filter(Boolean).join(' · ');
    return `<div class="row" data-s data-id="${r.id}" data-tags="${esc('|' + r.tags.join('|') + '|')}" data-proj="${esc(r.project)}">`
      + `<button type="button" class="rowbtn" aria-expanded="false"><span class="ttl">${esc(r.title)}</span><span class="meta">${esc(meta)}</span>`
      + (r.tags.length ? `<span class="tags">${r.tags.map(x => '#' + esc(x)).join(' ')}</span>` : '') + `</button><div class="body" hidden></div></div>`;
  };
  const tpl = r => templates.push(`<template id="t-${r.id}"><p class="path">${esc(r.path)}</p><div class="md">${r.html}${r.truncated ? `<p><em>${esc(t.truncated)}</em></p>` : ''}</div></template>`);
  const todoHtml = td => {
    const si = cfg.todo.states.indexOf(td.state);
    const cls = td.overdue ? 'over' : td.state === cfg.todo.done ? 'done' : si === 1 ? 's1' : si === 2 ? 's2' : '';
    const chips = [];
    const longs = [];
    for (const [k, v] of td.fields) {
      if (v.length > LONG_VALUE) longs.push(`<details class="long"><summary>${k ? `<b>${esc(k)}</b> ` : ''}${esc(v.slice(0, 60))}…</summary><div>${esc(v)}</div></details>`);
      else chips.push(`<span class="chip${td.overdue && k === cfg.todo.dueKey ? ' over' : ''}">${k ? `<b>${esc(k)}</b>` : ''}${esc(v)}</span>`);
    }
    return `<div class="todo" data-s><span class="badge ${cls}">${esc(td.overdue ? t.overdue : td.state)}</span><span class="ttl">${esc(td.title)}</span>`
      + (chips.length ? `<div class="chips">${chips.join('')}</div>` : '') + longs.join('') + `</div>`;
  };
  const artHtml = a => `<div class="art" data-s><a href="${esc(a.url)}" target="_blank" rel="noopener noreferrer">${esc(a.title)}</a>`
    + `<span class="meta">${esc([a.purpose, a.project, a.date].filter(Boolean).join(' · '))}</span></div>`;
  const outHtml = o => (o.record ? row(o.record, t.output)
    : `<div class="art" data-s><a href="${esc(o.href)}" target="_blank" rel="noopener noreferrer">${esc(o.title)}</a><span class="meta">${esc([t.output, o.date].join(' · '))}</span></div>`);
  const panel = (items, emptyText) => (items.length ? `<div class="panel"><div class="list">${items.join('')}</div></div>` : `<p class="empty">${esc(emptyText || t.none)}</p>`);
  const card = (title, n, items, go, cls = '') => `<section class="card ${cls}"><div class="card-h"><h3>${esc(title)}<span class="n">${n}</span></h3>`
    + (go ? `<button type="button" class="go" data-v="${go}">${esc(t.more)}</button>` : '') + `</div>`
    + (items.length ? `<div class="list">${items.join('')}</div>` : `<p class="empty">${esc(t.none)}</p>`) + `</section>`;

  const sections = targets.map(tg => {
    const recs = [...tg.records].sort(byDate);
    recs.forEach(tpl);
    tg.outputs.forEach(o => { if (o.record) tpl(o.record); });
    const tips = cfg.tipType ? recs.filter(r => r.type === cfg.tipType) : [];
    const arts = [...tg.artifacts].sort((a, b) => (a.date < b.date ? 1 : a.date > b.date ? -1 : 0));
    const outs = [...tg.outputs].sort((a, b) => (a.date < b.date ? 1 : a.date > b.date ? -1 : 0));
    const live = tg.todos.filter(x => !x.archived);
    const over = live.filter(x => x.overdue);
    const activeState = cfg.todo ? (cfg.todo.active || cfg.todo.states[1] || cfg.todo.states[0]) : null;
    const active = live.filter(x => x.state === activeState && !x.overdue);
    const views = [];

    // 홈
    const home = [];
    if (cfg.todo) {
      home.push(card(t.overdue, over.length, over.map(todoHtml), 'todo', over.length ? 'alert' : ''));
      home.push(card(t.active, active.length, active.map(todoHtml), 'todo'));
    }
    if (cfg.artifacts) home.push(card(t.recentArt, arts.length, arts.slice(0, 5).map(artHtml), 'art'));
    if (cfg.tipType) home.push(card(t.recentTip, tips.length, tips.slice(0, 5).map(r => row(r)), 'tip'));
    home.push(card(t.recentChange, recs.length, recs.slice(0, 10).map(r => row(r)), 'rec', 'wide'));
    views.push(['home', t.home, null, `<div class="cards">${home.join('')}</div>`]);

    // 할일
    if (cfg.todo) {
      const groups = [];
      if (over.length) groups.push(`<h3 class="sec">${esc(t.overdue)} <span class="n">${over.length}</span></h3>${panel(over.map(todoHtml))}`);
      for (const st of cfg.todo.states) {
        const items = live.filter(x => x.state === st && !x.overdue);
        const head = `${esc(st)} <span class="n">${items.length}</span>`;
        if (st === cfg.todo.done) groups.push(`<details class="fold"><summary>${head}</summary>${panel(items.map(todoHtml))}</details>`);
        else groups.push(`<h3 class="sec">${head}</h3>${panel(items.map(todoHtml))}`);
      }
      const unknown = live.filter(x => !x.known && !x.overdue);
      if (unknown.length) groups.push(`<h3 class="sec">${esc(t.badState)} <span class="n">${unknown.length}</span></h3>${panel(unknown.map(todoHtml))}`);
      const arch = tg.todos.filter(x => x.archived);
      if (arch.length) groups.push(`<details class="fold"><summary>${esc(t.archive)} <span class="n">${arch.length}</span></summary>${panel(arch.map(todoHtml))}</details>`);
      views.push(['todo', t.todo, live.filter(x => x.state !== cfg.todo.done).length, groups.join(''), over.length > 0]);
    }
    // 아티팩트
    if (cfg.artifacts) {
      let h = '';
      if (cfg.artifacts.file) h += `<h3 class="sec">${esc(t.links)} <span class="n">${arts.length}</span></h3>${panel(arts.map(artHtml))}`;
      if (cfg.artifacts.outputsDir) h += `<h3 class="sec">${esc(t.outputs)} <span class="n">${outs.length}</span></h3>${panel(outs.map(outHtml))}`;
      views.push(['art', t.art, arts.length + outs.length, h]);
    }
    // 팁
    if (cfg.tipType) views.push(['tip', t.tip, tips.length, panel(tips.map(r => row(r)))]);
    // 기록(타입별)
    const others = recs.filter(r => r.type !== cfg.tipType);
    views.push(['rec', t.rec, others.length, cfg.types.filter(ty => ty !== cfg.tipType).map(ty => {
      const items = others.filter(r => r.type === ty);
      return `<h3 class="sec">${esc(ty)} <span class="n">${items.length}</span></h3>${panel(items.map(r => row(r)))}`;
    }).join('')]);
    // 태그·프로젝트
    const tally = (pick) => { const m = new Map(); for (const r of recs) for (const v of pick(r)) m.set(v, (m.get(v) || 0) + 1); return [...m].sort((a, b) => b[1] - a[1] || a[0].localeCompare(b[0])); };
    const chip = (k, v, n) => `<button type="button" class="chip-f" data-k="${k}" data-val="${esc(v)}">${esc(v)} <span class="n">${n}</span></button>`;
    const projs = tally(r => (r.project ? [r.project] : []));
    const tags = tally(r => r.tags);
    views.push(['tag', t.tag, tags.length + projs.length,
      `<div class="filters"><button type="button" class="chip-f on" data-k="all">${esc(t.all)}</button></div>`
      + (projs.length ? `<h3 class="sec">${esc(t.projects)}</h3><div class="filters">${projs.map(([v, n]) => chip('proj', v, n)).join('')}</div>` : '')
      + (tags.length ? `<h3 class="sec">${esc(t.tags)}</h3><div class="filters">${tags.map(([v, n]) => chip('tag', v, n)).join('')}</div>` : '')
      + panel(recs.map(r => row(r)))]);
    // 형식 경고
    if (tg.warnings.length) {
      views.push(['warn', t.warn, tg.warnings.length, `<p class="empty">${esc(t.warnHint)}</p>` + panel(tg.warnings.map(w =>
        `<div class="warnrow"><code>${esc(w.path)}</code> — ${esc(t[w.why] || w.why)}${w.detail ? ` (${esc(w.detail)})` : ''}</div>`))]);
    }
    // 검색(전 항목을 미리 깔아 두고 페이지 JS가 가린다)
    const all = [...recs.map(r => row(r)), ...outs.filter(o => o.record).map(outHtml), ...live.map(todoHtml), ...arts.map(artHtml), ...outs.filter(o => !o.record).map(outHtml)];
    const searchView = `<div class="view" data-v="search" hidden><h2>${esc(t.searchPh)}</h2><p class="empty" hidden>${esc(t.noResult)}</p><div class="panel"><div class="list">${all.join('')}</div></div></div>`;

    const nav = views.map(([v, label, n, , alert]) => `<button type="button" class="navbtn${alert ? ' alert' : ''}" data-v="${v}"><span>${esc(label)}</span>${n == null ? '' : `<span class="n">${n}</span>`}</button>`).join('');
    const body = views.map(([v, label, , html]) => `<div class="view" data-v="${v}" hidden>${v === 'home' ? '' : `<h2>${esc(label)}</h2>`}${html}</div>`).join('');
    return `<section class="target" data-t="${esc(tg.name)}" hidden><nav aria-label="${esc(t.menu)}">${nav}</nav><main>${body}${searchView}</main></section>`;
  });

  const tabs = targets.map(tg => `<button type="button" class="tab" role="tab" data-t="${esc(tg.name)}">${esc(tg.name)}</button>`).join('');
  return `<!doctype html>
<html lang="${cfg.lang}">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width,initial-scale=1">
<meta name="robots" content="noindex,nofollow">
<meta name="referrer" content="no-referrer">
<title>${esc(cfg.title)}</title>
<style>${CSS}</style>
</head>
<body>
<header class="top"><div class="top-in"><h1>${esc(cfg.title)}</h1><div class="tabs" role="tablist" aria-label="${esc(t.targets)}">${tabs}</div>
<input id="q" type="search" placeholder="${esc(t.searchPh)}" aria-label="${esc(t.searchPh)}" autocomplete="off">
<span class="gen">${esc(t.generated)} ${esc(generatedAt)}</span></div></header>
${sections.join('\n')}
<p class="foot">${esc(t.viewOnly)}</p>
${templates.join('\n')}
<script>${JS}</script>
</body>
</html>
`;
}

// ---------- 명령 ----------
function resolveOut(root, cfg, outArg) {
  const expand = p => (p.startsWith('~') ? path.join(os.homedir(), p.slice(1)) : p);
  const out = path.resolve(expand(outArg || cfg.output || path.join(os.homedir(), '.claude', 'kb-dashboard', path.basename(path.resolve(root)) + '.html')));
  if (isInside(out, root)) fail(`output must be outside the repository (it would put a copy of your notes under version control): ${out}`);
  return out;
}

function openFile(file) {
  try {
    const [cmd, args] = process.platform === 'win32' ? ['cmd', ['/c', 'start', '', file]]
      : process.platform === 'darwin' ? ['open', [file]] : ['xdg-open', [file]];
    const p = spawn(cmd, args, { detached: true, stdio: 'ignore', windowsHide: true });
    p.on('error', () => {});
    p.unref();
  } catch { /* 열지 못해도 페이지는 만들어졌다 — 경로만 보고한다 */ }
}

function stamp() { const d = new Date(); return `${today()} ${String(d.getHours()).padStart(2, '0')}:${String(d.getMinutes()).padStart(2, '0')}`; }

export function build({ root, config, out, json, open }) {
  const cfg = loadConfig(root, config);
  const targets = collect(root, cfg);
  if (json) return { text: JSON.stringify({ title: cfg.title, lang: cfg.lang, targets }, null, 2) };
  const file = resolveOut(root, cfg, out);
  fs.mkdirSync(path.dirname(file), { recursive: true });
  fs.writeFileSync(file, buildHtml(targets, cfg, stamp()));
  const sum = k => targets.reduce((n, t) => n + counts(t)[k], 0);
  if (open) openFile(file);
  const tips = cfg.tipType ? targets.reduce((n, t) => n + t.records.filter(r => r.type === cfg.tipType).length, 0) : 0;
  return { text: `OK ${file} records=${sum('records')} todos=${sum('todos')} artifacts=${sum('artifacts')} outputs=${sum('outputs')} tips=${tips} warnings=${sum('warnings')}`, file };
}

export function check({ root, config }) {
  const cfg = loadConfig(root, config);
  const missing = cfg.targets.filter(t => !isDir(path.join(root, t)));
  const targets = collect(root, cfg);
  return { text: JSON.stringify({ ok: true, lang: cfg.lang, missingTargets: missing, targets: targets.map(t => ({ ...counts(t), tips: cfg.tipType ? t.records.filter(r => r.type === cfg.tipType).length : 0, warningList: t.warnings })) }, null, 2) };
}

// ---------- selftest: 임시 폴더에 픽스처를 만들고 지운다(대상 저장소에 쓰지 않는다) ----------
export function selftest() {
  const tmp = fs.mkdtempSync(path.join(os.tmpdir(), 'kb-dashboard-'));
  const root = path.join(tmp, 'repo');
  let n = 0;
  const ok = (cond, name) => { if (!cond) throw new Fail('selftest FAIL: ' + name, 1); n++; };
  const throws = (fn, name) => { let t = false; try { fn(); } catch (e) { t = e instanceof Fail; } ok(t, name); };
  const w = (rel, text) => { const f = path.join(root, rel); fs.mkdirSync(path.dirname(f), { recursive: true }); fs.writeFileSync(f, text); };
  try {
    const cfgObj = {
      title: 'fixture', lang: 'ko', targets: ['a', 'b', 'missing'], types: ['note', 'tip'], tipType: 'tip',
      todo: { file: 'todo.md', states: ['할일', '진행중', '보류', '완료'], done: '완료', dueKey: '기한', archiveDir: 'old' },
      artifacts: { file: 'artifacts.md', outputsDir: 'out' }, exclude: ['skipme', 'README.md'],
    };
    w('.claude/kb-dashboard.json', JSON.stringify(cfgObj));
    w('a/notes/one.md', '---\ntype: note\nproject: p1   # comment\ntags: [alpha, "beta"]\ncreated: 2026-01-01\nupdated: 2026-01-02\n---\n# One\n\n<script>alert(1)</script>\n\n- item\n  - nested\n\n| h1 | h2 |\n| --- | --- |\n| c1 | c2 |\n\n[bad](javascript:alert(1)) [good](https://example.com/x)\n');
    w('a/tips/t.md', '---\r\ntype: tip\r\ntags: [alpha]\r\nupdated: 2026-02-01\r\n---\r\n# Tip one\r\n\r\nbody\r\n');
    w('a/nofm.md', '# no frontmatter\n');
    w('a/other.md', '---\ntype: unknown\n---\nx\n');
    w('a/skipme/x.md', '---\ntype: note\n---\nskip\n');
    w('a/README.md', 'skip\n');
    w('a/todo.md', '---\ntype: todo\nupdated: 2026-01-01\n---\n# todo\n<!-- 형식: - [상태] one-line example -->\n<!-- 형식:\n- [상태] example closing a comment -->\n- [할일] first — 기한:2000-01-01 · 등록:2026-01-01\n- [진행중] second — 현황:a · b · c\n- [완료] third — 기한:2000-01-01\n- [이상] fourth\n- [보류] fifth — 기한:2999-12-31\n');
    w('a/old/done-2026.md', '---\ntype: todo\n---\n- [완료] archived one\n');
    w('a/out/2026-03-01-report.md', '# report\ntext\n');
    w('a/out/2026-03-02-page.html', '<html></html>');
    w('b/n.md', '---\ntype: note\n---\nB note\n');

    // 파싱
    const fm = parseFrontmatter(fs.readFileSync(path.join(root, 'a/notes/one.md'), 'utf8')).fm;
    ok(Array.isArray(fm.tags) && fm.tags.join() === 'alpha,beta' && fm.project === 'p1', 'frontmatter array, quotes, comment');
    const tc = cfgObj.todo;
    const t1 = parseTodoLine('- [할일] first — 기한:2000-01-01 · 등록:2026-01-01', tc);
    ok(t1.overdue && t1.fields.length === 2 && t1.title === 'first', 'todo overdue');
    ok(!parseTodoLine('- [완료] third — 기한:2000-01-01', tc).overdue, 'done is never overdue');
    ok(!parseTodoLine('- [보류] fifth — 기한:2999-12-31', tc).overdue, 'future due is not overdue');
    ok(parseTodoLine('- [이상] fourth', tc).known === false, 'unknown state flagged');
    ok(parseTodoLine('- [진행중] second — 현황:a · b · c', tc).fields[0][1] === 'a · b · c', 'separator inside a value is kept');
    ok(parseTodoLine('plain line', tc) === null, 'non-todo line ignored');

    // 렌더러
    const md = renderMarkdown('<script>alert(1)</script>\n\n[bad](javascript:alert(1)) [good](https://example.com/x)\n\n```\n<b>\n```\n');
    ok(!md.includes('<script') && md.includes('&lt;script&gt;'), 'renderer escapes raw HTML');
    ok(!/href="javascript:/i.test(md) && md.includes('href="https://example.com/x"'), 'renderer links only http(s)');
    ok(md.includes('<pre><code>&lt;b&gt;'), 'code fence escaped');
    ok(/<ul><li>a\n?<ul><li>b/.test(renderMarkdown('- a\n  - b\n').replace(/\n/g, '')), 'nested list');

    // 스캔
    const cfg = loadConfig(root);
    const targets = collect(root, cfg);
    ok(targets.length === 2 && targets[0].name === 'a' && targets[1].name === 'b', 'only existing targets become tabs');
    const A = targets[0];
    ok(A.records.length === 2, 'records: classified files only (exclude, todo, artifacts, outputs, archive left out)');
    ok(A.warnings.some(x => x.why === 'noFm') && A.warnings.some(x => x.why === 'badType') && A.warnings.some(x => x.why === 'badState'), 'format warnings');
    ok(A.todos.filter(x => !x.archived).length === 5 && A.todos.filter(x => x.archived).length === 1, 'todos and archive');
    ok(A.outputs.length === 2 && A.outputs.some(o => o.record) && A.outputs.some(o => !o.record && o.href.startsWith('file:///')), 'outputs');

    // 아티팩트 기록
    const add = extra => addArtifact({ root, cfg, target: 'a', url: 'https://claude.ai/artifact/abc', title: 'My — page', ...extra });
    const r1 = add({ purpose: 'demo · x', project: 'p1' });
    ok(r1.status === 'OK', 'add-artifact creates the file');
    ok(add({}).status === 'EXISTS', 'duplicate URL is not added twice');
    const back = parseArtifactLine(fs.readFileSync(r1.file, 'utf8').split('\n').find(l => l.startsWith('- ')));
    ok(back && back.url === 'https://claude.ai/artifact/abc' && back.title === 'My - page' && back.project === 'p1' && back.purpose === 'demo / x', 'artifact line round trip');
    ok(addArtifact({ root, cfg, target: 'a', url: 'https://example.com/2', title: 'two' }).status === 'OK'
      && collect(root, cfg)[0].artifacts.length === 2, 'second artifact appended and scanned');
    throws(() => addArtifact({ root, cfg, target: 'a', url: 'javascript:alert(1)', title: 'x' }), 'javascript: URL rejected');
    throws(() => addArtifact({ root, cfg, target: 'a', url: 'http://example.com', title: 'x' }), 'non-https URL rejected');
    throws(() => addArtifact({ root, cfg, target: 'zzz', url: 'https://example.com/3', title: 'x' }), 'unknown target rejected');

    // 출력 위치
    throws(() => build({ root, out: path.join(root, 'dash.html') }), 'output inside the repository rejected');
    throws(() => loadConfig(root, path.join(root, 'nope.json')), 'missing config rejected');

    // HTML
    const outFile = path.join(tmp, 'out', 'dash.html');
    const res = build({ root, out: outFile });
    ok(res.text.startsWith('OK ') && isFile(outFile), 'build writes the page');
    const html = fs.readFileSync(outFile, 'utf8');
    ok((html.match(/<script/g) || []).length === 1, 'exactly one script block (note bodies cannot add one)');
    ok(!/<link\b|@import|\bsrc=|url\(/i.test(html), 'no external resources');
    ok(!/href="javascript:/i.test(html), 'no javascript: links');
    ok(html.includes('data-t="a"') && html.includes('data-t="b"') && !html.includes('data-t="missing"'), 'tabs');
    ok(html.includes('https://claude.ai/artifact/abc') && html.includes('Tip one') && html.includes('archived one'), 'content present');
    const hrefs = [...html.matchAll(/href="([^"]*)"/g)].map(m => m[1]);
    ok(hrefs.length > 0 && hrefs.every(h => /^(https?:\/\/|file:\/\/\/)/.test(h)), 'every link is http(s) or a local output file');
    fs.writeFileSync(path.join(root, '.claude/kb-dashboard.json'), JSON.stringify({ ...cfgObj, lang: 'en' }));
    build({ root, out: outFile });
    ok(fs.readFileSync(outFile, 'utf8').includes(T.en.recentChange), 'English UI when lang is en');
    ok(Object.keys(T.ko).sort().join() === Object.keys(T.en).sort().join() && Object.keys(AK.ko).sort().join() === Object.keys(AK.en).sort().join(), 'ko and en string tables have the same keys');

    // 대상이 없는 저장소(루트 하나)
    w('.claude/kb-dashboard.json', JSON.stringify({ lang: 'en', targets: [], types: ['note'] }));
    w('root-note.md', '---\ntype: note\n---\nroot\n');
    const flat = collect(root, loadConfig(root));
    ok(flat.length === 1 && flat[0].records.some(r => r.path === 'root-note.md'), 'empty targets: the repository root is the single target');
    ok(build({ root, out: outFile }).text.startsWith('OK '), 'minimal config builds');
    return `selftest OK (${n} checks)`;
  } finally {
    fs.rmSync(tmp, { recursive: true, force: true });
  }
}

// ---------- CLI ----------
function parseArgs(argv) {
  const o = { _: [] };
  for (let i = 0; i < argv.length; i++) {
    const a = argv[i];
    if (!a.startsWith('--')) { o._.push(a); continue; }
    const k = a.slice(2);
    if (k === 'open' || k === 'json') o[k] = true;
    else { if (i + 1 >= argv.length) fail(`missing value for --${k}`); o[k] = argv[++i]; }
  }
  return o;
}

function main() {
  const o = parseArgs(process.argv.slice(3));
  const cmd = process.argv[2];
  const needRoot = () => { if (!o.root) fail('--root <repository> is required'); const r = path.resolve(o.root); if (!isDir(r)) fail(`--root is not a folder: ${r}`); return r; };
  if (cmd === 'selftest') return selftest();
  if (cmd === 'build') return build({ root: needRoot(), config: o.config, out: o.out, json: o.json, open: o.open }).text;
  if (cmd === 'check') return check({ root: needRoot(), config: o.config }).text;
  if (cmd === 'add-artifact') {
    const root = needRoot();
    const r = addArtifact({ root, cfg: loadConfig(root, o.config), target: o.target, url: o.url, title: o.title, purpose: o.purpose, project: o.project });
    return `${r.status} ${r.file}`;
  }
  fail('usage: node kb-dashboard.mjs <build|add-artifact|check|selftest> --root <repository> [--config <file>] [--out <file>] [--open] [--json]');
}

if (process.argv[1] && pathToFileURL(path.resolve(process.argv[1])).href === import.meta.url) {
  try { console.log(main()); } catch (e) {
    if (e instanceof Fail) { console.error(e.message); process.exit(e.code); }
    throw e;
  }
}
