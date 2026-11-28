#!/usr/bin/env node
// kb-init — 빈 폴더에 마크다운 지식 베이스 한 벌을 만든다(kb-dashboard가 바로 읽는 설정 포함).
// 사용: node kb-init.mjs <plan|apply|selftest> --root <폴더> --answers <답 JSON 파일>
// 원칙: 외부 패키지 없음(Node 18+) · 있는 파일은 쓰지 않는다 · 루트 CLAUDE.md나 대시보드 설정이 있으면 거부 ·
//       루트 밖에는 쓰지 않는다 · git 명령을 실행하지 않는다.
import fs from 'node:fs';
import path from 'node:path';
import os from 'node:os';
import { fileURLToPath, pathToFileURL } from 'node:url';

class Fail extends Error { constructor(msg, code = 2) { super(msg); this.code = code; } }
const fail = (msg, code = 2) => { throw new Fail(msg, code); };

const HERE = path.dirname(fileURLToPath(import.meta.url));
const TEMPLATES = path.join(HERE, '..', 'templates');
const TEMPLATE_FILES = ['claude-root.md', 'claude-target.md', 'claude-local-example.md', 'readme.md',
  'skill-log.md', 'skill-find.md', 'skill-todo.md', 'skill-report.md'];
const TYPE_KEYS = ['meeting', 'project', 'issue', 'howto', 'prompt', 'achievement', 'tip', 'reference'];

// ---------- 프리셋 (키 집합은 selftest가 대조한다) ----------
// types: [이름=폴더, 무엇, 파일명 규칙, 예]
export const PRESET = {
  ko: {
    types: {
      meeting: ['회의', '회의록', '`YYYY-MM-DD-주제.md`', '`2026-01-15-주간회의.md`'],
      project: ['프로젝트', '프로젝트·솔루션 정보', '`이름.md`', '`블로그-개편.md`'],
      issue: ['이슈', '문제와 해결 방안', '`대상-증상.md`', '`프린터-연결-끊김.md`'],
      howto: ['절차', '재사용하는 방법·설정 기록', '`무엇-하는법.md`', '`포맷-후-설정.md`'],
      prompt: ['프롬프트', '자주 쓰는 AI 프롬프트', '`용도.md`', '`주간보고-작성.md`'],
      achievement: ['성과', '성과 기록(평가 근거)', '`YYYY.md` 연도별 누적', '`2026.md`'],
      tip: ['팁', '짧은 요령·단축키·알아 두면 좋은 것', '`주제.md`', '`git-워크트리.md`'],
      reference: ['참고', '위 어디에도 안 맞는 것', '`주제.md`', '`자주-쓰는-주소.md`'],
    },
    todoType: '할일', todoFile: '할일.md', todoHeading: '할일',
    artType: '아티팩트', artFile: '아티팩트.md', artHeading: '아티팩트',
    outDir: '산출물', archiveDir: '보관',
    states: ['할일', '진행중', '보류', '완료'], done: '완료',
    keys: { project: '프로젝트', due: '기한', added: '등록' },
    kind: { work: '회사', personal: '개인' },
    pMulti: '<대상>/', pLabelMulti: '`<대상>/`', pLabelRoot: '저장소 루트',
    listSep: ' · ', dirSep: '·',
    todoWhat: '해야 할 일. 상태 추적 대상', artWhat: '게시한 Artifact·페이지 링크',
    oneLine: ' 한 줄 추가', single: '(단일 파일)', artWrites: d => ` — \`${d} 아티팩트\`가 쓴다`,
    tree: { todo: '활성 할일 (한 줄 = 한 항목)', art: '게시한 링크 (한 줄 = 한 항목)', out: '생성한 md·html', archive: '완료·만료분' },
    todoComments: a => [
      '<!-- 형식: - [상태] 제목 — 프로젝트:<이름> · 기한:<YYYY-MM-DD> · 등록:<YYYY-MM-DD> · <메모> -->',
      '<!-- 상태: 할일 | 진행중 | 보류 | 완료  (대괄호 안 단어만 교체한다) -->',
      '<!-- 프로젝트·기한·메모는 없으면 생략. 등록일은 항상 적는다. -->',
      `<!-- [완료]가 20줄을 넘으면 ${a}/완료-YYYY.md 로 옮긴다. -->`,
    ],
  },
  en: {
    types: {
      meeting: ['meeting', 'Meeting notes', '`YYYY-MM-DD-topic.md`', '`2026-01-15-weekly.md`'],
      project: ['project', 'Project facts', '`name.md`', '`blog-redesign.md`'],
      issue: ['issue', 'A problem and its fix', '`subject-symptom.md`', '`printer-drops-connection.md`'],
      howto: ['howto', 'Reusable steps and settings', '`how-to-what.md`', '`setup-after-reinstall.md`'],
      prompt: ['prompt', 'Prompts you reuse', '`purpose.md`', '`weekly-report.md`'],
      achievement: ['achievement', 'Achievements (review evidence)', '`YYYY.md`, one per year', '`2026.md`'],
      tip: ['tip', 'Short tips and shortcuts', '`topic.md`', '`git-worktree.md`'],
      reference: ['reference', 'Anything that fits nowhere else', '`topic.md`', '`useful-addresses.md`'],
    },
    todoType: 'todo', todoFile: 'todo.md', todoHeading: 'Todo',
    artType: 'artifact', artFile: 'artifacts.md', artHeading: 'Artifacts',
    outDir: 'outputs', archiveDir: 'archive',
    states: ['todo', 'doing', 'hold', 'done'], done: 'done',
    keys: { project: 'project', due: 'due', added: 'added' },
    kind: { work: 'work', personal: 'personal' },
    pMulti: '<target>/', pLabelMulti: '`<target>/`', pLabelRoot: 'the repository root',
    listSep: ', ', dirSep: ', ',
    todoWhat: 'Things to do, tracked by state', artWhat: 'Published Artifact and page links',
    oneLine: ', one line each', single: '(single file)', artWrites: d => ` — added by \`${d}\``,
    tree: { todo: 'active todos (one line each)', art: 'published links (one line each)', out: 'generated md and html', archive: 'finished todos' },
    todoComments: a => [
      '<!-- format: - [state] title — project:<name> · due:<YYYY-MM-DD> · added:<YYYY-MM-DD> · <note> -->',
      '<!-- states: todo | doing | hold | done  (replace only the word inside the brackets) -->',
      '<!-- project, due and note are optional. Always write the added date. -->',
      `<!-- When [done] passes 20 lines, move them to ${a}/done-YYYY.md -->`,
    ],
  },
};

// ---------- 공용 ----------
const readText = f => fs.readFileSync(f, 'utf8').replace(/^﻿/, '').replace(/\r\n?/g, '\n');
const today = () => { const d = new Date(); return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`; };
const isDir = p => { try { return fs.statSync(p).isDirectory(); } catch { return false; } };
const exists = p => { try { fs.statSync(p); return true; } catch { return false; } };

// ---------- 답 검증 ----------
const goodName = s => typeof s === 'string' && s.trim() === s && s.length > 0 && s !== '..' &&
  !s.startsWith('.') && !/[\\/<>:"|?*\x00-\x1f]/.test(s);

export function normalize(raw, root) {
  if (!raw || typeof raw !== 'object' || Array.isArray(raw)) fail('answers must be a JSON object');
  if (!PRESET[raw.lang]) fail('answers "lang" must be "ko" or "en"');
  const A = { lang: raw.lang, title: raw.title == null ? path.basename(path.resolve(root)) : raw.title };
  if (typeof A.title !== 'string' || !A.title.trim() || /[\r\n]/.test(A.title)) fail('answers "title" must be a one-line string');
  const targets = raw.targets == null ? [] : raw.targets;
  if (!Array.isArray(targets)) fail('answers "targets" must be an array');
  const seen = new Set();
  A.targets = targets.map(t => {
    if (!t || typeof t !== 'object' || !goodName(t.dir)) fail(`answers "targets[].dir" must be a plain folder name: ${JSON.stringify(t && t.dir)}`);
    if (!['work', 'personal'].includes(t.kind)) fail(`answers "targets[].kind" must be "work" or "personal": ${t.dir}`);
    if (seen.has(t.dir.toLowerCase())) fail(`answers "targets" has a duplicate folder: ${t.dir}`);
    seen.add(t.dir.toLowerCase());
    return { dir: t.dir, kind: t.kind };
  });
  A.shared = raw.shared == null ? null : raw.shared;
  if (A.shared != null) {
    if (!A.targets.length) fail('answers "shared" needs at least one target');
    if (!goodName(A.shared)) fail(`answers "shared" must be a plain folder name: ${JSON.stringify(A.shared)}`);
    if (seen.has(A.shared.toLowerCase())) fail(`answers "shared" must differ from the target folders: ${A.shared}`);
  }
  const types = raw.types == null ? TYPE_KEYS : raw.types;
  if (!Array.isArray(types)) fail('answers "types" must be an array');
  for (const k of types) if (!TYPE_KEYS.includes(k)) fail(`answers "types" has an unknown key: ${k} (known: ${TYPE_KEYS.join(', ')})`);
  A.types = TYPE_KEYS.filter(k => types.includes(k) || k === 'reference');
  for (const k of ['todo', 'artifacts']) {
    A[k] = raw[k] == null ? true : raw[k];
    if (typeof A[k] !== 'boolean') fail(`answers "${k}" must be true or false`);
  }
  A.commandPrefix = raw.commandPrefix == null ? '' : raw.commandPrefix;
  if (typeof A.commandPrefix !== 'string' || !/^[a-z0-9-]*$/.test(A.commandPrefix)) fail('answers "commandPrefix" must match ^[a-z0-9-]*$');
  A.dashboardCmd = raw.dashboardCmd == null ? '/kb-dashboard' : raw.dashboardCmd;
  if (typeof A.dashboardCmd !== 'string' || !/^\/\S+$/.test(A.dashboardCmd)) fail('answers "dashboardCmd" must look like /name');
  return A;
}

// ---------- 템플릿 ----------
export function render(text, vars, flags) {
  const out = [];
  let block = null; // null = 블록 밖, true/false = 블록 안(살림/지움)
  for (const line of String(text).replace(/\r\n?/g, '\n').split('\n')) {
    const m = line.trim().match(/^<!--if:(!?)([a-z]+)-->$/);
    if (m) {
      if (block !== null) fail('template: nested <!--if--> blocks are not supported');
      if (!(m[2] in flags)) fail(`template: unknown flag ${m[2]}`);
      block = m[1] ? !flags[m[2]] : !!flags[m[2]];
      continue;
    }
    if (line.trim() === '<!--endif-->') {
      if (block === null) fail('template: <!--endif--> without <!--if-->');
      block = null; continue;
    }
    if (block === false) continue;
    out.push(line);
  }
  if (block !== null) fail('template: <!--if--> without <!--endif-->');
  const res = out.join('\n').replace(/\{\{([A-Z_]+)\}\}/g, (_, k) => {
    if (!(k in vars)) fail(`template: unknown variable ${k}`);
    return String(vars[k]);
  });
  if (res.includes('{{')) fail('template: unresolved {{ left after rendering');
  return res;
}

const tpl = (lang, name) => readText(path.join(TEMPLATES, lang, name));

// ---------- 생성 목록 ----------
export function buildFiles(A, day = today()) {
  const L = PRESET[A.lang];
  const T = k => L.types[k];
  const multi = A.targets.length > 0;
  const P = multi ? L.pMulti : '';
  const cmd = n => '/' + A.commandPrefix + n;
  const name = n => A.commandPrefix + n;
  const ref = T('reference')[0];

  const rows = [];
  if (A.todo) rows.push(`| \`${L.todoType}\` | ${L.todoWhat} | \`${P}${L.todoFile}\`${L.oneLine} | ${L.single} | — |`);
  for (const k of A.types) if (k !== 'reference') { const [n, w, r, e] = T(k); rows.push(`| \`${n}\` | ${w} | \`${P}${n}/\` | ${r} | ${e} |`); }
  if (A.artifacts) rows.push(`| \`${L.artType}\` | ${L.artWhat} | \`${P}${L.artFile}\`${L.oneLine} | ${L.single}${L.artWrites(A.dashboardCmd)} | — |`);
  { const [n, w, r, e] = T('reference'); rows.push(`| \`${n}\` | ${w} | \`${P}${n}/\` | ${r} | ${e} |`); }

  const sharedDirs = A.shared ? [A.types.includes('prompt') ? T('prompt')[0] : null, ref].filter(Boolean) : [];
  const tree = [];
  const pad = s => s + ' — '; // 한글 폭은 고정폭 정렬이 어긋나 구분자로만 나눈다
  if (A.todo) tree.push(pad(L.todoFile) + L.tree.todo);
  if (A.artifacts) tree.push(pad(L.artFile) + L.tree.art);
  for (const k of A.types) tree.push(pad(T(k)[0] + '/') + T(k)[1]);
  tree.push(pad(L.outDir + '/') + L.tree.out);
  if (A.todo) tree.push(pad(L.archiveDir + '/') + L.tree.archive);

  const vars = {
    TITLE: A.title, TODAY: day, P, P_LABEL: multi ? L.pLabelMulti : L.pLabelRoot,
    TYPE_TABLE: rows.join('\n'),
    TARGET_LIST: A.targets.map(t => `\`${t.dir}/\`(${L.kind[t.kind]})`).join(L.listSep),
    SHARED_DIRS: sharedDirs.map(d => `\`${A.shared}/${d}/\``).join(L.dirSep),
    REF: ref, TODO_FILE: L.todoFile, ART_FILE: L.artFile, OUT_DIR: L.outDir, ARCHIVE_DIR: L.archiveDir,
    CMD_LOG: cmd('log'), CMD_FIND: cmd('find'), CMD_TODO: cmd('todo'), CMD_REPORT: cmd('report'),
    NAME_LOG: name('log'), NAME_FIND: name('find'), NAME_TODO: name('todo'), NAME_REPORT: name('report'),
    CMD_DASH: A.dashboardCmd, FOLDER_TREE: tree.join('\n'),
    SPARSE_LINES: A.targets.map(t => `git sparse-checkout set .claude${A.shared ? ' ' + A.shared : ''} ${t.dir}   # ${L.kind[t.kind]}`).join('\n'),
    TARGET_DIR: '', TARGET_KIND: '',
  };
  const flags = { multi, many: A.targets.length > 1, shared: !!A.shared, todo: A.todo, artifacts: A.artifacts, work: false };
  const r = (file, v = {}, f = {}) => render(tpl(A.lang, file), { ...vars, ...v }, { ...flags, ...f });

  const files = [];
  const add = (p, content) => files.push({ path: p, content: content.endsWith('\n') || content === '' ? content : content + '\n' });
  add('CLAUDE.md', r('claude-root.md'));
  add('README.md', r('readme.md'));
  add('.gitignore', readText(path.join(TEMPLATES, 'gitignore.txt')));

  const dash = {
    title: A.title, lang: A.lang,
    targets: [...A.targets.map(t => t.dir), ...(A.shared ? [A.shared] : [])],
    types: A.types.map(k => T(k)[0]),
  };
  if (A.types.includes('tip')) dash.tipType = T('tip')[0];
  if (A.todo) dash.todo = { file: L.todoFile, states: L.states, done: L.done, dueKey: L.keys.due, archiveDir: L.archiveDir };
  dash.artifacts = A.artifacts ? { file: L.artFile, outputsDir: L.outDir } : { outputsDir: L.outDir };
  dash.exclude = ['CLAUDE.md', 'CLAUDE.local.md', 'CLAUDE.local.md.example', 'README.md'];
  add('.claude/kb-dashboard.json', JSON.stringify(dash, null, 2));

  for (const n of ['log', 'find', ...(A.todo ? ['todo'] : []), 'report']) add(`.claude/skills/${name(n)}/SKILL.md`, r(`skill-${n}.md`));

  const bases = multi ? A.targets : [{ dir: '', kind: null }];
  for (const t of bases) {
    const B = t.dir ? t.dir + '/' : '';
    const label = t.dir || A.title;
    if (t.dir) add(`${B}CLAUDE.md`, r('claude-target.md', { TARGET_DIR: t.dir, TARGET_KIND: L.kind[t.kind] }, { work: t.kind === 'work' }));
    add(`${B}CLAUDE.local.md.example`, r('claude-local-example.md'));
    if (A.todo) add(`${B}${L.todoFile}`, ['---', `type: ${L.todoType}`, `updated: ${day}`, '---', '', `# ${L.todoHeading} (${label})`, '', ...L.todoComments(L.archiveDir)].join('\n'));
    if (A.artifacts) add(`${B}${L.artFile}`, `---\ntype: ${L.artType}\nupdated: ${day}\n---\n\n# ${L.artHeading} (${label})\n\n`);
    for (const k of A.types) add(`${B}${T(k)[0]}/.gitkeep`, '');
    add(`${B}${L.outDir}/.gitkeep`, '');
    if (A.todo) add(`${B}${L.archiveDir}/.gitkeep`, '');
  }
  if (A.shared) for (const d of [ref, ...(A.types.includes('prompt') ? [T('prompt')[0]] : [])]) add(`${A.shared}/${d}/.gitkeep`, '');
  return files;
}

// ---------- 명령 ----------
function guard(root) {
  if (exists(root) && !isDir(root)) fail(`--root is not a folder: ${root}`);
  for (const p of ['CLAUDE.md', path.join('.claude', 'kb-dashboard.json')]) {
    if (exists(path.join(root, p))) fail(`refusing: ${path.join(root, p)} already exists — this folder already has rules or a dashboard config (kb-init never overwrites or merges)`);
  }
}

function readAnswers(file, root) {
  if (!file) fail('--answers <json file> is required');
  let raw;
  try { raw = JSON.parse(readText(path.resolve(file))); } catch (e) { fail(`answers file is not readable JSON: ${file} (${e.message})`); }
  return normalize(raw, root);
}

export function plan({ root, answers }) {
  guard(root);
  const files = buildFiles(answers);
  const lines = files.map(f => (exists(path.join(root, f.path)) ? 'EXISTS ' : 'CREATE ') + f.path);
  const ex = lines.filter(l => l.startsWith('EXISTS')).length;
  return { text: [...lines, `PLAN ${root} create=${files.length - ex} exists=${ex}`].join('\n') };
}

export function apply({ root, answers }) {
  guard(root);
  const files = buildFiles(answers);
  let created = 0, skipped = 0;
  for (const f of files) {
    const dst = path.join(root, f.path);
    if (exists(dst)) { skipped++; continue; }
    fs.mkdirSync(path.dirname(dst), { recursive: true });
    fs.writeFileSync(dst, f.content, { flag: 'wx' });
    created++;
  }
  return { text: `OK ${root} created=${created} skipped=${skipped}`, created, skipped, files };
}

// ---------- selftest: 임시 폴더에 만들고 지운다 ----------
export async function selftest() {
  const tmp = fs.mkdtempSync(path.join(os.tmpdir(), 'kb-init-'));
  let n = 0;
  const ok = (cond, label) => { if (!cond) throw new Fail('selftest FAIL: ' + label, 1); n++; };
  const throws = (fn, label) => { let t = false; try { fn(); } catch (e) { t = e instanceof Fail; } ok(t, label); };
  const walk = (dir, out = []) => { for (const e of fs.readdirSync(dir, { withFileTypes: true })) { const p = path.join(dir, e.name); if (e.isDirectory()) walk(p, out); else out.push(p); } return out; };
  const texts = dir => walk(dir).filter(f => !f.endsWith('.gitkeep')).map(f => [f, fs.readFileSync(f, 'utf8')]);
  try {
    // 1. ko · 대상 2개 + 공용 · 타입 전부
    const r1 = path.join(tmp, 'ko');
    const A1 = normalize({ lang: 'ko', targets: [{ dir: 'work', kind: 'work' }, { dir: 'home', kind: 'personal' }], shared: 'common' }, r1);
    const res1 = apply({ root: r1, answers: A1 });
    ok(res1.created === buildFiles(A1).length && res1.skipped === 0, 'apply creates every planned file');
    for (const p of ['CLAUDE.md', 'README.md', '.gitignore', '.claude/kb-dashboard.json', '.claude/skills/todo/SKILL.md',
      'work/CLAUDE.md', 'work/할일.md', 'work/아티팩트.md', 'home/팁/.gitkeep', 'home/보관/.gitkeep', 'common/참고/.gitkeep', 'common/프롬프트/.gitkeep'])
      ok(exists(path.join(r1, p)), 'created: ' + p);
    // 2. 남은 템플릿 표시 없음
    ok(texts(r1).every(([, t]) => !t.includes('{{') && !t.includes('<!--if') && !t.includes('<!--endif')), 'no template markers left');
    ok(fs.readFileSync(path.join(r1, 'work/CLAUDE.md'), 'utf8').includes('회사 정보 취급') && !fs.readFileSync(path.join(r1, 'home/CLAUDE.md'), 'utf8').includes('회사 정보 취급'), 'work-only block only in work target');
    // 3. 거부
    throws(() => apply({ root: r1, answers: A1 }), 'second apply refused (root CLAUDE.md)');
    const r3 = path.join(tmp, 'cfg-only');
    fs.mkdirSync(path.join(r3, '.claude'), { recursive: true }); fs.writeFileSync(path.join(r3, '.claude/kb-dashboard.json'), '{}');
    throws(() => plan({ root: r3, answers: A1 }), 'existing dashboard config refused');
    // 4. 있는 파일은 건드리지 않는다
    const r4 = path.join(tmp, 'keep');
    fs.mkdirSync(r4); fs.writeFileSync(path.join(r4, '.gitignore'), 'mine\r\n');
    const res4 = apply({ root: r4, answers: normalize({ lang: 'ko' }, r4) });
    ok(fs.readFileSync(path.join(r4, '.gitignore'), 'utf8') === 'mine\r\n' && res4.skipped >= 1, 'existing file left byte-identical');
    ok(plan({ root: path.join(tmp, 'fresh'), answers: normalize({ lang: 'ko' }, tmp) }).text.split('\n').pop().startsWith('PLAN '), 'plan on a missing folder');
    ok(!exists(path.join(tmp, 'fresh')), 'plan writes nothing');
    // 5. 대시보드 설정
    const cfg = JSON.parse(fs.readFileSync(path.join(r1, '.claude/kb-dashboard.json'), 'utf8'));
    ok(cfg.types.join() === TYPE_KEYS.map(k => PRESET.ko.types[k][0]).join() && cfg.tipType === '팁' && cfg.todo && cfg.todo.file === '할일.md', 'dashboard config types, tip, todo');
    ok(cfg.targets.join() === 'work,home,common' && cfg.targets.every(t => isDir(path.join(r1, t))), 'dashboard targets exist');
    // 6. 분류 표
    const root1 = fs.readFileSync(path.join(r1, 'CLAUDE.md'), 'utf8');
    ok(TYPE_KEYS.every(k => root1.includes(`| \`${PRESET.ko.types[k][0]}\` |`)) && root1.includes('| `할일` |') && root1.includes('| `아티팩트` |'), 'classification table rows');
    ok(root1.includes('`<대상>/회의/`') && root1.includes('어느 쪽인지 묻는다'), 'multi-target wording');
    // 7. en · 루트 하나 · 가벼운 타입 · 할일 없음
    const r7 = path.join(tmp, 'en');
    const A7 = normalize({ lang: 'en', types: ['howto', 'tip', 'reference'], todo: false }, r7);
    apply({ root: r7, answers: A7 });
    ok(!exists(path.join(r7, 'todo.md')) && !exists(path.join(r7, '.claude/skills/todo')), 'todo off: no todo file or skill');
    ok(exists(path.join(r7, 'howto/.gitkeep')) && exists(path.join(r7, 'artifacts.md')) && !exists(path.join(r7, 'meeting')), 'en single-folder layout');
    ok(texts(r7).every(([, t]) => !/[가-힣]/.test(t)), 'en output has no Hangul');
    const cfg7 = JSON.parse(fs.readFileSync(path.join(r7, '.claude/kb-dashboard.json'), 'utf8'));
    ok(cfg7.targets.length === 0 && !cfg7.todo && cfg7.types.join() === 'howto,tip,reference', 'en dashboard config');
    // 8. 짝 대조
    const keys = o => Object.keys(o).sort().join();
    ok(keys(PRESET.ko) === keys(PRESET.en) && keys(PRESET.ko.types) === keys(PRESET.en.types), 'ko/en preset keys match');
    const names = l => fs.readdirSync(path.join(TEMPLATES, l)).sort().join();
    ok(names('ko') === names('en') && names('ko') === [...TEMPLATE_FILES].sort().join(), 'ko/en template file sets match');
    // 9. 잘못된 답
    throws(() => normalize({ lang: 'jp' }, tmp), 'bad lang');
    throws(() => normalize({ lang: 'ko', targets: [{ dir: 'a/b', kind: 'work' }] }, tmp), 'dir with a slash');
    throws(() => normalize({ lang: 'ko', shared: 'common' }, tmp), 'shared without targets');
    throws(() => normalize({ lang: 'ko', types: ['diary'] }, tmp), 'unknown type key');
    throws(() => normalize({ lang: 'ko', commandPrefix: 'KB_' }, tmp), 'bad prefix');
    ok(normalize({ lang: 'ko', types: ['tip'] }, tmp).types.join() === 'tip,reference', 'reference always added');
    // 10. 접두사
    const r10 = path.join(tmp, 'prefix');
    apply({ root: r10, answers: normalize({ lang: 'ko', commandPrefix: 'kb-' }, r10) });
    ok(/^name: kb-log$/m.test(fs.readFileSync(path.join(r10, '.claude/skills/kb-log/SKILL.md'), 'utf8')), 'prefixed skill name');
    ok(fs.readFileSync(path.join(r10, 'README.md'), 'utf8').includes('`/kb-find <질문>`'), 'prefixed command in README');
    // 11. kb-dashboard 교차 검증(형제 폴더에 있을 때만)
    const dashJs = path.join(HERE, '..', '..', 'kb-dashboard', 'scripts', 'kb-dashboard.mjs');
    let skipped = false;
    if (exists(dashJs)) {
      const D = await import(pathToFileURL(dashJs).href);
      for (const r of [r1, r7, r10]) {
        const c = JSON.parse(D.check({ root: r }).text);
        ok(c.missingTargets.length === 0 && c.targets.every(t => t.warningList.length === 0), 'kb-dashboard check clean: ' + path.basename(r));
      }
      ok(D.addArtifact({ root: r1, cfg: D.loadConfig(r1), target: 'work', url: 'https://example.com/a', title: 't' }).status === 'OK', 'kb-dashboard add-artifact on generated file');
      const c1 = JSON.parse(D.check({ root: r1 }).text);
      ok(c1.targets[0].artifacts === 1 && c1.targets[0].warningList.length === 0, 'artifact line scanned');
    } else skipped = true;
    return `selftest OK (${n} checks${skipped ? ', dashboard cross-check skipped' : ''})`;
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
    if (i + 1 >= argv.length) fail(`missing value for --${k}`);
    o[k] = argv[++i];
  }
  return o;
}

async function main() {
  const o = parseArgs(process.argv.slice(3));
  const cmd = process.argv[2];
  if (cmd === 'selftest') return selftest();
  if (cmd === 'plan' || cmd === 'apply') {
    if (!o.root) fail('--root <folder> is required');
    const root = path.resolve(o.root);
    const answers = readAnswers(o.answers, root);
    return (cmd === 'plan' ? plan : apply)({ root, answers }).text;
  }
  fail('usage: node kb-init.mjs <plan|apply|selftest> --root <folder> --answers <json file>');
}

if (process.argv[1] && pathToFileURL(path.resolve(process.argv[1])).href === import.meta.url) {
  main().then(t => console.log(t), e => {
    if (e instanceof Fail) { console.error(e.message); process.exit(e.code); }
    console.error(e); process.exit(1);
  });
}
