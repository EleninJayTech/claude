#!/usr/bin/env node
// session-board — 같은 폴더(git 최상위)에서 동시에 도는 Claude Code 세션을 서로 알린다.
// 훅이 부른다: node board.mjs <start|prompt|pre|post|end>   (stdin = 훅 입력 JSON)
// 사람이 부른다: node board.mjs list
// 원칙: 자기 세션 파일만 쓴다(경합 없음) · 모델을 부르지 않는다 · 막지 않는다(경고만) · 어떤 오류도 exit 0.
import fs from 'node:fs';
import path from 'node:path';
import os from 'node:os';
import { execFileSync } from 'node:child_process';

const DIR = process.env.SESSION_BOARD_DIR || path.join(os.homedir(), '.claude', 'session-board');
const ACTIVE_MS = 3 * 60 * 60 * 1000;   // 마지막 활동이 3시간 안이면 활성
const PURGE_MS = 24 * 60 * 60 * 1000;   // 24시간 지난 파일은 지운다
const MAX_FILES = 50;
const MAX_TEXT = 1500;

const now = Date.now();
const norm = p => {
  let s = path.resolve(String(p)).replace(/\\/g, '/');
  return process.platform === 'win32' ? s.toLowerCase() : s;
};
const fileOf = sid => path.join(DIR, String(sid).replace(/[^A-Za-z0-9_-]/g, '_') + '.json');
const readJson = f => { try { return JSON.parse(fs.readFileSync(f, 'utf8')); } catch { return null; } };
const save = s => {
  fs.mkdirSync(DIR, { recursive: true });
  const f = fileOf(s.sid), tmp = f + '.' + process.pid + '.tmp';
  fs.writeFileSync(tmp, JSON.stringify(s));
  fs.renameSync(tmp, f);
};
const git = (cwd, args) => {
  try { return execFileSync('git', ['-C', cwd, ...args], { encoding: 'utf8', timeout: 2000, stdio: ['ignore', 'pipe', 'ignore'] }).trim(); }
  catch { return ''; }
};
const all = () => {
  try {
    return fs.readdirSync(DIR).filter(n => n.endsWith('.json')).map(n => readJson(path.join(DIR, n))).filter(Boolean);
  } catch { return []; }
};
const active = (me) => all().filter(s => !s.ended && now - (s.updated || 0) < ACTIVE_MS && s.sid !== me.sid && s.root === me.root);
const mins = t => Math.max(0, Math.round((now - t) / 60000));
const label = s => s.title || s.first || '(제목 없음)';
const rel = (root, p) => {
  const n = norm(p);
  return root && n.startsWith(root + '/') ? n.slice(root.length + 1) : n;
};
const out = (event, text) => {
  process.stdout.write(JSON.stringify({ hookSpecificOutput: { hookEventName: event, additionalContext: text } }));
};
const summary = others => {
  const lines = [`[세션 보드] 같은 폴더에서 다른 세션 ${others.length}개가 진행 중이다.`];
  for (const o of others) {
    const f = (o.files || []).slice(0, 5).map(x => x.p);
    const more = (o.files || []).length - f.length;
    lines.push(`- ${label(o)} · 브랜치 ${o.branch || '?'} · ${mins(o.updated)}분 전 활동 · 수정: ${f.length ? f.join(', ') : '없음'}${more > 0 ? ` 외 ${more}` : ''}`);
  }
  lines.push('겹치는 파일을 고칠 작업이면 시작 전에 사용자에게 `claude --worktree <이름>`으로 옮길지 한 줄 제안한다. 관련 작업이면 그 세션의 수정 파일을 먼저 읽는다. 필요하면 SendMessage로 그 세션에 직접 묻는다.');
  let t = lines.join('\n');
  return t.length > MAX_TEXT ? t.slice(0, MAX_TEXT - 1) + '…' : t;
};

function load(input) {
  const sid = input.session_id;
  if (!sid) return null;
  return readJson(fileOf(sid));
}

function start(input, emit = true) {
  try {
    for (const n of fs.readdirSync(DIR)) {
      const f = path.join(DIR, n);
      try { if (now - fs.statSync(f).mtimeMs > PURGE_MS) fs.unlinkSync(f); } catch {}
    }
  } catch {}
  const cwd = input.cwd || process.cwd();
  const prev = load(input) || {};
  const top = git(cwd, ['rev-parse', '--show-toplevel']);
  const me = {
    sid: input.session_id, root: norm(top || cwd), branch: git(cwd, ['branch', '--show-current']),
    title: input.session_title || prev.title || '', first: prev.first || '',
    started: prev.started || now, updated: now, files: prev.files || [],
    notified: [], warned: prev.warned || [], ended: false,
  };
  const others = active(me);
  me.notified = others.map(o => o.sid);
  if (!emit) me.notified = [];
  save(me);
  if (emit && others.length) out('SessionStart', summary(others));
  return me;
}

function prompt(input) {
  const me = load(input) || start(input, false);
  me.updated = now; me.ended = false;
  if (!me.first && input.prompt) me.first = String(input.prompt).split(/\r?\n/)[0].slice(0, 80);
  if (input.session_title) me.title = input.session_title;
  const others = active(me);
  const fresh = others.filter(o => !me.notified.includes(o.sid));
  if (fresh.length) me.notified.push(...fresh.map(o => o.sid));
  save(me);
  if (fresh.length) out('UserPromptSubmit', summary(others));
}

const target = input => {
  const ti = input.tool_input || {};
  return ti.file_path || ti.notebook_path || '';
};

function post(input) {
  const me = load(input);
  const p = target(input);
  if (!me || !p) return;
  const r = rel(me.root, p);
  me.files = [{ p: r, t: now }, ...(me.files || []).filter(x => x.p !== r)].slice(0, MAX_FILES);
  me.updated = now;
  save(me);
}

function pre(input) {
  const me = load(input);
  const p = target(input);
  if (!me || !p) return;
  const r = rel(me.root, p);
  const hits = [];
  for (const o of active(me)) {
    const f = (o.files || []).find(x => x.p === r);
    const key = o.sid + '|' + r;
    if (f && !me.warned.includes(key)) { hits.push({ o, f }); me.warned.push(key); }
  }
  if (!hits.length) return;
  save(me);
  const who = hits.map(h => `${label(h.o)}(${mins(h.f.t)}분 전)`).join(', ');
  out('PreToolUse', `[세션 보드] ${r}는 다른 세션 ${who}이 수정했다. 미커밋 변경이 섞일 수 있으니 고치기 전에 사용자에게 한 줄 알린다.`);
}

function end(input) {
  const me = load(input);
  if (!me) return;
  me.ended = true; me.updated = now;
  save(me);
}

function list() {
  const live = all().filter(s => !s.ended && now - (s.updated || 0) < ACTIVE_MS);
  if (!live.length) { console.log('활성 세션 없음 (보드: ' + DIR + ')'); return; }
  const byRoot = {};
  for (const s of live) (byRoot[s.root] ||= []).push(s);
  for (const [root, ss] of Object.entries(byRoot)) {
    console.log(`## ${root} — 세션 ${ss.length}개`);
    for (const s of ss) {
      const f = (s.files || []).slice(0, 8).map(x => x.p);
      console.log(`- ${label(s)} · 브랜치 ${s.branch || '?'} · ${mins(s.updated)}분 전 · 세션 ${String(s.sid).slice(0, 8)} · 수정: ${f.length ? f.join(', ') : '없음'}`);
    }
  }
}

async function readStdin() {
  if (process.stdin.isTTY) return {};
  let data = '';
  for await (const c of process.stdin) data += c;
  try { return JSON.parse(data); } catch { return null; }
}

try {
  const cmd = process.argv[2];
  if (cmd === 'list') list();
  else {
    const input = await readStdin();
    if (input && input.session_id) {
      ({ start, prompt, pre, post, end })[cmd]?.(input);
    }
  }
} catch { /* 훅은 Claude를 막지 않는다 */ }
process.exit(0);
