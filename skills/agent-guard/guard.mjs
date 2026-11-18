#!/usr/bin/env node
// agent-guard — 병렬 서브에이전트 수를 이 PC의 사양(코어·메모리)과 현재 여유(메모리·CPU)에 맞춰 제한한다.
// 훅이 부른다: node guard.mjs <start|pre|sub-start|sub-stop|end>   (stdin = 훅 입력 JSON)
// 사람이 부른다: node guard.mjs <status [--json]|reset|selftest>
// 원칙: 모델을 부르지 않는다 · 실행 중 표식만 쓴다 · 상한을 넘는 Agent 스폰만 거부한다 · 어떤 오류도 허용 쪽으로(exit 0).
import fs from 'node:fs';
import path from 'node:path';
import os from 'node:os';
import { execFileSync } from 'node:child_process';
import { fileURLToPath } from 'node:url';

const SELF = fileURLToPath(import.meta.url);
const DIR = process.env.AGENT_GUARD_DIR || path.join(os.homedir(), '.claude', 'agent-guard');
const RUN = path.join(DIR, 'run');
const CONFIG = path.join(DIR, 'config.json');
const DEFAULTS = { off: false, debug: false, max: 8, reserveGB: 1.5, perAgentGB: 1, cpuHigh: 85, warmupSec: 120, pendingSec: 30, ttlMin: 45 };

const readJson = f => { try { return JSON.parse(fs.readFileSync(f, 'utf8')); } catch { return null; } };
const safe = s => String(s).replace(/[^A-Za-z0-9_-]/g, '_').slice(0, 80);
const sleep = ms => new Promise(r => setTimeout(r, ms));

function loadConfig() {
  const raw = readJson(CONFIG) || {};
  const cfg = { ...DEFAULTS };
  for (const k of Object.keys(DEFAULTS)) {
    if (!(k in raw)) continue;
    if (typeof DEFAULTS[k] === 'boolean') { cfg[k] = raw[k] === true; continue; }
    const v = Number(raw[k]);
    if (!Number.isFinite(v) || v < 0) continue;
    if ((k === 'max' || k === 'perAgentGB') && v === 0) continue;
    cfg[k] = v;
  }
  if (String(process.env.AGENT_GUARD || '').toLowerCase() === 'off') cfg.off = true;
  return cfg;
}

function cpuTimes() {
  let idle = 0, total = 0;
  for (const c of os.cpus()) { for (const v of Object.values(c.times)) total += v; idle += c.times.idle; }
  return { idle, total };
}

async function measure() {
  if (process.env.AGENT_GUARD_FAKE) {
    const f = JSON.parse(process.env.AGENT_GUARD_FAKE);
    return { cores: f.cores, totalGB: f.totalGB, availGB: f.availGB, cpu: f.cpu };
  }
  const cores = typeof os.availableParallelism === 'function' ? os.availableParallelism() : os.cpus().length;
  const totalGB = os.totalmem() / 2 ** 30;
  const availGB = (typeof process.availableMemory === 'function' ? process.availableMemory() : os.freemem()) / 2 ** 30;
  const a = cpuTimes(); await sleep(200); const b = cpuTimes();
  const dt = b.total - a.total;
  const cpu = dt > 0 ? Math.round(100 * (1 - (b.idle - a.idle) / dt)) : 0;
  return { cores, totalGB, availGB, cpu };
}

const specCapOf = (m, cfg) => Math.max(1, Math.min(cfg.max, Math.floor(m.cores / 2), Math.floor(m.totalGB / 4)));
const memRoom = (m, cfg, young) => Math.floor((m.availGB - cfg.reserveGB - young * cfg.perAgentGB) / cfg.perAgentGB);
const nowCapOf = (m, cfg) => Math.max(1, Math.min(specCapOf(m, cfg), memRoom(m, cfg, 0)));
const descOf = m => `논리 ${m.cores}코어·RAM ${Math.round(m.totalGB)}GB·여유 ${m.availGB.toFixed(1)}GB·CPU ${m.cpu}%`;

function writeMarker(name, data) {
  fs.mkdirSync(RUN, { recursive: true });
  const tmp = path.join(RUN, `t-${process.pid}-${Math.random().toString(36).slice(2, 8)}.json`);
  fs.writeFileSync(tmp, JSON.stringify(data));
  fs.renameSync(tmp, path.join(RUN, name));
}
const rm = name => { try { fs.unlinkSync(path.join(RUN, name)); } catch {} };

// 실행(r-)·대기(p-) 표식을 읽고 만료·손상된 것은 지운다. 폴더를 만들지 않는다.
function markers(now, cfg) {
  const out = { p: [], r: [] };
  let names = [];
  try { names = fs.readdirSync(RUN); } catch { return out; }
  for (const n of names.sort()) {
    const f = path.join(RUN, n);
    if (n.startsWith('t-')) { try { if (now - fs.statSync(f).mtimeMs > 60000) fs.unlinkSync(f); } catch {} continue; }
    const kind = n.startsWith('p-') ? 'p' : n.startsWith('r-') ? 'r' : null;
    if (!kind || !n.endsWith('.json')) continue;
    const j = readJson(f);
    const ttl = kind === 'p' ? cfg.pendingSec * 1000 : cfg.ttlMin * 60000;
    if (!j || typeof j.t !== 'number' || now - j.t > ttl) { rm(n); continue; }
    out[kind].push({ name: n, ...j });
  }
  return out;
}

function debugLog(cfg, cmd, input, result) {
  if (!cfg.debug) return;
  try {
    fs.mkdirSync(DIR, { recursive: true });
    const type = input.agent_type || input.tool_input?.subagent_type || '';
    fs.appendFileSync(path.join(DIR, 'debug.log'),
      `${new Date().toISOString()} ${cmd} sid=${input.session_id || ''} agent_id=${input.agent_id || ''} type=${type} tool_use_id=${input.tool_use_id || ''} → ${result}\n`);
  } catch {}
}

const out = (event, extra) => process.stdout.write(JSON.stringify({ hookSpecificOutput: { hookEventName: event, ...extra } }));

async function start(input, cfg) {
  const m = await measure();
  markers(Date.now(), cfg);
  const n = nowCapOf(m, cfg), s = specCapOf(m, cfg);
  out('SessionStart', { additionalContext:
    `[agent-guard] 이 PC에서 동시에 돌릴 서브에이전트는 지금 ${n}개까지다(${descOf(m)} · 사양 상한 ${s}). ` +
    `병렬 작업은 ${n}개씩 나눠 띄우고 끝나면 다음을 띄운다 — 넘는 스폰은 훅이 거부한다. ` +
    `브라우저·에뮬레이터·빌드를 돌리는 에이전트는 더 적게 띄운다. 워크플로의 동시 실행 수도 이 수에 맞춘다.` });
  return '-';
}

async function pre(input, cfg) {
  const m = await measure();
  const now = Date.now();
  const sid = String(input.session_id);
  const me = `p-${String(now).padStart(13, '0')}-${process.pid}-${Math.random().toString(36).slice(2, 8).padEnd(6, '0')}.json`;
  writeMarker(me, { sid, t: now, type: input.tool_input?.subagent_type || '' });
  const mk = markers(now, cfg);
  const ahead = mk.p.filter(x => x.name < me);
  const live = mk.r.length + ahead.length;
  const mine = [...mk.r, ...ahead].filter(x => x.sid === sid).length;
  const young = ahead.length + mk.r.filter(x => now - x.t < cfg.warmupSec * 1000).length;
  const spec = specCapOf(m, cfg);
  let why = null;
  if (mine === 0) why = null;
  else if (live >= spec) why = `사양 상한 ${spec}개`;
  else if (memRoom(m, cfg, young) < 1) why = `여유 메모리 ${m.availGB.toFixed(1)}GB`;
  else if (m.cpu >= cfg.cpuHigh) why = `CPU ${m.cpu}%`;
  if (!why) return 'allow';
  rm(me);
  out('PreToolUse', { permissionDecision: 'deny', permissionDecisionReason:
    `[agent-guard] 이 스폰은 거부됐다 — ${why} 때문에 지금은 더 띄울 수 없다(실행 중 ${mk.r.length}·대기 ${ahead.length}, ${descOf(m)}). ` +
    `실행 중인 에이전트의 완료 알림을 받은 뒤 다시 띄우거나 메인 대화에서 직접 처리한다. 바로 재시도하지 않는다. 상한 조정·끄기는 사용자가 agent-guard 스킬로 한다.` });
  return 'deny';
}

function subStart(input, cfg) {
  if (!input.agent_id) return '-';
  const sid = String(input.session_id), type = input.agent_type || '';
  const now = Date.now();
  writeMarker(`r-${safe(sid)}-${safe(input.agent_id)}.json`, { sid, t: now, type });
  // 같은 배치의 sub-start가 동시에 돌므로 대기 표식은 unlink 성공으로 하나씩 차지한다(실패하면 다음 후보)
  const mk = markers(now, cfg).p.filter(x => x.sid === sid);
  for (const x of [...mk.filter(x => x.type === type), ...mk.filter(x => x.type !== type)]) {
    try { fs.unlinkSync(path.join(RUN, x.name)); break; } catch {}
  }
  return '-';
}

function subStop(input) {
  if (input.agent_id) rm(`r-${safe(input.session_id)}-${safe(input.agent_id)}.json`);
  return '-';
}

function end(input, cfg) {
  const sid = String(input.session_id);
  const mk = markers(Date.now(), cfg);
  for (const x of [...mk.p, ...mk.r]) if (x.sid === sid) rm(x.name);
  return '-';
}

async function status(json) {
  const cfg = loadConfig();
  const m = await measure();
  const mk = markers(Date.now(), cfg);
  const wf = process.env.CLAUDE_CODE_WORKFLOW_MAX_CONCURRENT_AGENTS || 'unset';
  const s = { cores: m.cores, totalGB: +m.totalGB.toFixed(1), availGB: +m.availGB.toFixed(1), cpu: m.cpu,
    specCap: specCapOf(m, cfg), nowCap: nowCapOf(m, cfg), running: mk.r.length, pending: mk.p.length, off: cfg.off, workflowEnv: wf };
  if (json) { console.log(JSON.stringify(s)); return; }
  console.log(`agent-guard 상태 (상태 폴더: ${DIR})`);
  console.log(`- PC: ${descOf(m)}`);
  console.log(`- 사양 상한 ${s.specCap} · 지금 상한 ${s.nowCap}`);
  console.log(`- 실행 중 ${s.running} · 대기 ${s.pending}`);
  console.log(`- 가드: ${cfg.off ? '꺼짐(off)' : '켜짐'}`);
  console.log(`- 설정: ${CONFIG}${fs.existsSync(CONFIG) ? '' : ' (없음 — 기본값)'}`);
  console.log(`- workflow env: CLAUDE_CODE_WORKFLOW_MAX_CONCURRENT_AGENTS=${wf}`);
}

function selftest() {
  const tmp = fs.mkdtempSync(path.join(os.tmpdir(), 'agent-guard-'));
  const run = path.join(tmp, 'run');
  const base = { cores: 4, totalGB: 8, availGB: 6, cpu: 10 };
  let n = 0;
  const call = (cmd, input, fake = {}, extraEnv = {}) => execFileSync(process.execPath, [SELF, cmd], {
    input: typeof input === 'string' ? input : JSON.stringify(input),
    env: { ...process.env, AGENT_GUARD_DIR: tmp, AGENT_GUARD_FAKE: JSON.stringify({ ...base, ...fake }), AGENT_GUARD: '', ...extraEnv },
    encoding: 'utf8',
  });
  const files = p => { try { return fs.readdirSync(run).filter(x => x.startsWith(p)); } catch { return []; } };
  const reset = () => fs.rmSync(run, { recursive: true, force: true });
  const ok = (cond, label) => { n++; if (!cond) throw new Error(label); };
  const pre = (sid, fake, env) => call('pre', { session_id: sid, tool_name: 'Agent', tool_input: { subagent_type: 'Explore' } }, fake, env);
  const ss = (sid, id, fake) => call('sub-start', { session_id: sid, agent_id: id, agent_type: 'Explore' }, fake);
  try {
    const s = call('start', { session_id: 'S1' });
    ok(s.includes('additionalContext') && s.includes('2개까지'), '1 start 안내');
    ok(pre('S1') === '' && files('p-').length === 1, '2 첫 pre 허용·대기 표식');
    ss('S1', 'A1'); ok(files('r-').length === 1 && files('p-').length === 0, '3 sub-start 표식 전환');
    ok(pre('S1') === '', '4 둘째 pre 허용');
    const d5 = pre('S1');
    ok(d5.includes('"permissionDecision":"deny"') && d5.includes('사양 상한') && files('').length === 2, '5 사양 상한 거부');
    ok(pre('S2') === '', '6 다른 세션 최소 1개');
    reset(); ss('S1', 'A1'); ss('S1', 'A2');
    ok(pre('S1').includes('deny'), '7a 상한 거부');
    call('sub-stop', { session_id: 'S1', agent_id: 'A1' });
    ok(pre('S1') === '', '7b sub-stop 뒤 허용');
    reset(); ss('S1', 'A1', { availGB: 2 });
    ok(pre('S1', { availGB: 2 }).includes('여유 메모리'), '8 여유 메모리 거부');
    reset(); ok(pre('S1', { availGB: 0.5 }) === '', '9 첫 스폰은 메모리 부족에도 허용');
    reset(); ss('S1', 'A1');
    ok(pre('S1', { cpu: 95 }).includes('CPU'), '10 CPU 거부');
    reset(); ss('S1', 'A1'); ss('S1', 'A2');
    ok(pre('S1', {}, { AGENT_GUARD: 'off' }) === '', '11 off면 출력 없음');
    reset(); fs.mkdirSync(run, { recursive: true });
    fs.writeFileSync(path.join(run, 'r-S1-old.json'), JSON.stringify({ sid: 'S1', t: Date.now() - 46 * 60000, type: 'x' }));
    ss('S1', 'A1');
    ok(pre('S1') === '', '12 만료 표식 무시');
    ok(call('pre', 'not json') === '', '13 잘못된 입력 무시');
    reset(); ss('S1', 'A1'); call('end', { session_id: 'S1' });
    ok(files('').filter(x => !x.startsWith('t-')).length === 0, '14 end 정리');
    console.log(`selftest OK (${n} checks)`);
  } catch (e) {
    console.log(`selftest FAIL: ${e.message}`);
    process.exitCode = 1;
  } finally {
    fs.rmSync(tmp, { recursive: true, force: true });
  }
}

async function readStdin() {
  if (process.stdin.isTTY) return null;
  let data = '';
  for await (const c of process.stdin) data += c;
  try { return JSON.parse(data); } catch { return null; }
}

const cmd = process.argv[2];
if (cmd === 'status') await status(process.argv.includes('--json'));
else if (cmd === 'reset') { fs.rmSync(RUN, { recursive: true, force: true }); console.log('reset OK'); }
else if (cmd === 'selftest') selftest();
else {
  try {
    const hooks = { start, pre, 'sub-start': subStart, 'sub-stop': subStop, end };
    const fn = hooks[cmd];
    const cfg = loadConfig();
    const input = fn ? await readStdin() : null;
    if (fn && !cfg.off && input && input.session_id) debugLog(cfg, cmd, input, await fn(input, cfg));
  } catch { /* 훅은 작업을 막지 않는다 */ }
  process.exitCode = 0;
}
