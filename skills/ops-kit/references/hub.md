# ③ 관리 허브 — 앱별 관리 사이트 · 계정 이름 · 확인 위치를 한 화면에 (+ 프로젝트 기록 지도)

앱이 하나뿐일 때는 런북으로 충분하지만, 콘솔이 여러 곳이거나 앱이 늘면 "그 설정이 어느 사이트 어느 계정에 있었지"가 매번 검색이 된다. 허브는 그 답을 한 화면에 모은다. 목록은 **배열 하나(`APPS`)** 에서 렌더하므로 앱이 늘어도 한 줄만 추가하면 된다. 같은 화면 아래쪽에는 **프로젝트 기록 지도**를 둔다 — 정책·기능·결정 같은 기록이 이 프로젝트에 무엇이 있고 어디에 있는지를 운영자가 저장소를 열지 않고 확인한다.

## 진단 신호

| 판정 | 조건 |
| --- | --- |
| 필요 | 관리할 외부 사이트·콘솔이 2곳 이상이거나, 배포 대상(앱)이 둘 이상이다(모노레포의 앱 폴더·설정 파일 여러 벌). 또는 배포 대상이 있고 프로젝트 기록(`## 기록 지도` 표)이 2종 이상 있다 |
| 판단 보류 | 콘솔이 1곳뿐이고 프로젝트 기록이 1종 이하다 — 운영 런북의 콘솔 표로 충분할 수 있다. 앞으로 앱이 늘 계획인지 묻는다 |
| 불필요 | 배포 대상이 없다 |

## 만들 것

`docs/status/admin-hub.html`(문서 id `hub`). 골격은 `page-shell.md`.
- 앱 카드마다: 이름·상태(배포됨/대기)·주소·관리 링크 목록(라벨·URL·계정 이름·여기서 확인하는 것)·런북 링크·⑤⑥⑦ 상태 줄.
- **⑤⑥⑦ 상태 줄**: 헬스체크 켜짐 여부 · 마지막 백업 리허설 날짜 · 한도 표 확인일. 만들지 않은 항목은 "만들지 않음(사유)"으로 보인다 — 빈칸이면 켜진 것인지 잊은 것인지 구분되지 않는다.
- 계정 칸은 **이름만**. 비밀번호·토큰·복구 코드는 넣지 않는다.
- **프로젝트 기록 지도**: 아래 `## 기록 지도` 표대로 기록 종류마다 있음/없음·경로·건수·마지막 갱신일·이름 목록을 싣고, 스냅샷 날짜를 함께 보인다.

## 기록 지도

프로젝트에 쌓인 기록을 **찾아서 보여 주기만** 한다. 기록을 만들고 고치는 것은 각 기록의 담당(규칙 파일·세션 기록 절차·다른 스킬)이고, 허브는 읽기만 한다. 아래는 관례 경로다 — 그 자리에 파일이 있으면 "있음", 없으면 "없음"이고, 어떤 도구로 만들었는지는 따지지 않는다.

| 기록 | 경로 | 건수(`count`) | 이름 목록(`items`) |
| --- | --- | --- | --- |
| 정책 기록 | `.claude/rules/policy-recording.md` · `.claude/rules/policies/*.md` | 정책 파일 수 · `- P-` 항목 수 · 그중 `[추정]` 수 | `## 색인` 줄의 도메인 — 키워드 |
| 기능 변경 기록 | `.claude/rules/feature-log.md` · `.claude/rules/feature-log/*.md` | 영역 파일 수 · 항목 수 | `## 색인` 줄의 영역 — 키워드 |
| 기능 명세 | `docs/features/00_inventory.md` | 인벤토리의 기능 수 | 기능 이름 |
| 릴리스 노트 | `docs/releases/*.md` | 파일 수 | 최근 3개 파일 이름 |
| 진행 기록 | `docs/PROGRESS.md` | — | 최근 3항목의 머리(갈래·상태·제목) |
| 결정 기록 | `docs/DECISIONS.md` | — | 최근 3건의 ID와 제목 |
| 계획·미해결 | `docs/PROJECT_PLAN.md` | 열린(`- [ ]`) 항목 수 | 현재 단계 한 줄 · `다음 ○○: YYYY-MM경` 줄 |
| 계획서 | `docs/plans/*.md` | 파일 수 | 최근 3개 파일 이름 |
| 루틴 정의 | `docs/ROUTINES.md` | 루틴 수 | 루틴 이름 |
| 구성 적용 기록 | `CLAUDE.md` 맨 아래 `dropin-applied` 줄 | — | 적용일·모드 |
| 그 밖 | `CHANGELOG*` · `docs/adr/` | 파일 수 | — |

- **제목·색인 수준만 싣는다.** 정책 문장(`→` 뒤)·결정 본문·기능 정의는 옮기지 않는다 — 옮기면 원본의 사본이 되어 낡고, 게시하면 기획 규칙 본문이 저장소 밖에 놓인다. 한 항목은 한 줄(80자 안팎)로 줄이고, 목록이 20개를 넘으면 앞 20개 뒤에 "외 n건"을 붙인다.
- **마지막 갱신일**은 `git log -1 --format=%cs -- <경로>`로 얻는다(git이 없으면 파일 수정일). 건수를 셀 수 없는 형식이면 `count`를 비운다 — 짐작으로 채우지 않는다.
- **스냅샷이다.** 페이지는 저장소 파일을 읽지 못하므로 만든 날의 상태를 담는다. `RECORDS_AS_OF`에 날짜를 적는다. `sync`와 허브 재생성이 이 표를 다시 읽어 고친다.
- **경로는 링크가 아니라 글자로** 보인다 — 게시된 페이지에서는 저장소 파일 링크가 열리지 않는다.
- **없는 기록**은 `found: false`로 두어 "없음" 줄에 이름만 모은다 — 빈칸이면 없는 것인지 빠뜨린 것인지 구분되지 않는다. 설치를 권하지 않는다(허브는 현황판이다).
- 단위로 나눈 기록(`docs/<단위>/PROGRESS.md` 등)은 단위마다 한 항목으로 싣고 `kind`에 단위 이름을 붙인다(예: `진행 기록 (api)`).
- 시크릿·토큰처럼 보이는 문자열이 든 줄은 목록에 넣지 않는다.

## 형식·템플릿

`<!-- 본문 -->` 자리에 아래를 넣는다. `APPS`·`RECORDS`·`RECORDS_AS_OF`만 프로젝트 값으로 채운다.

```html
<section id="apps"></section>
<p class="meta">목록 원본: 이 파일의 <code>APPS</code> — 앱이 늘면 한 줄 추가한다.</p>

<h2>프로젝트 기록</h2>
<p class="meta">스냅샷 <span id="records-asof"></span> — 원본은 저장소의 각 경로다. 이 목록은 그날의 상태이고, 허브를 동기화하면 다시 읽어 고친다.</p>
<section id="records"></section>
<script>
// status: "live" | "wait"   ops 값이 null이면 "만들지 않음"으로 보인다
const APPS = [
  {
    slug: "app1", name: "<앱 이름>", status: "live", deployed: "YYYY-MM-DD",
    url: "https://<주소>",
    links: [
      { label: "호스팅 콘솔", url: "https://<콘솔 주소>", account: "<계정 이름>", where: "<여기서 확인하는 것>" },
    ],
    runbooks: [
      { label: "배포 런북", url: "<게시 URL 또는 docs/status/deploy-runbook.html>" },
      { label: "운영 런북", url: "<게시 URL 또는 docs/status/ops-runbook.html>" },
    ],
    ops: { health: "켜짐 (YYYY-MM-DD~)", lastBackupRehearsal: "YYYY-MM-DD", limitsCheckedAt: "YYYY-MM-DD" },
  },
];

// 프로젝트 기록 지도 — 만든 날의 스냅샷. found: false면 "없음" 줄에 이름만 모인다
const RECORDS_AS_OF = "YYYY-MM-DD";
const RECORDS = [
  { kind: "정책 기록", found: true, path: ".claude/rules/policies/", count: "파일 2 · 정책 9 (추정 3)", updated: "YYYY-MM-DD",
    items: ["<도메인> — <키워드>"] },
  { kind: "기능 변경 기록", found: false },
];

const esc = (s) => String(s ?? "").replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[c]);
const safeUrl = (u) => (/^(https?:\/\/|docs\/|\.\/)/.test(String(u)) ? esc(u) : "#");
const opsLine = (label, v) => `<li>${label}: ${v ? esc(v) : '<span class="warn">만들지 않음</span>'}</li>`;

function card(a) {
  const links = (a.links || []).map((l) =>
    `<tr><td><a href="${safeUrl(l.url)}" target="_blank" rel="noopener">${esc(l.label)}</a></td><td><code>${esc(l.account)}</code></td><td>${esc(l.where)}</td></tr>`).join("");
  const books = (a.runbooks || []).map((r) => `<a href="${safeUrl(r.url)}" target="_blank" rel="noopener">${esc(r.label)}</a>`).join(" · ");
  const o = a.ops || {};
  return `<details class="step" id="${esc(a.slug)}" ${a.status === "live" ? "open" : ""}>
    <summary>${esc(a.name)} — ${a.status === "live" ? `<span class="ok">배포됨 ${esc(a.deployed)}</span>` : '<span class="muted">대기</span>'}</summary>
    ${a.url ? `<p>주소 <code>${esc(a.url)}</code></p>` : ""}
    <div class="table-wrap"><table><thead><tr><th>관리 사이트</th><th>계정</th><th>여기서 확인</th></tr></thead><tbody>${links}</tbody></table></div>
    ${books ? `<p>런북: ${books}</p>` : ""}
    <ul>${opsLine("헬스체크", o.health)}${opsLine("마지막 백업 리허설", o.lastBackupRehearsal)}${opsLine("한도 표 확인일", o.limitsCheckedAt)}</ul>
  </details>`;
}
document.getElementById("apps").innerHTML = APPS.map(card).join("");

function record(r) {
  const items = (r.items || []).map((i) => `<li>${esc(i)}</li>`).join("");
  return `<details class="step">
    <summary>${esc(r.kind)}${r.count ? ` — ${esc(r.count)}` : ""}${r.updated ? ` <span class="muted">· 갱신 ${esc(r.updated)}</span>` : ""}</summary>
    <p>위치 <code>${esc(r.path)}</code></p>
    ${items ? `<ul>${items}</ul>` : ""}
  </details>`;
}
const foundRecords = RECORDS.filter((r) => r.found);
const missingRecords = RECORDS.filter((r) => !r.found);
document.getElementById("records-asof").textContent = RECORDS_AS_OF;
document.getElementById("records").innerHTML =
  (foundRecords.length ? foundRecords.map(record).join("") : '<p class="muted">찾은 기록이 없다.</p>') +
  (missingRecords.length ? `<p class="muted">없음: ${missingRecords.map((r) => esc(r.kind)).join(" · ")}</p>` : "");
</script>
```

- 링크 URL은 `safeUrl`로 `http(s)`·상대 경로만 허용한다(배열에 실수로 `javascript:`가 들어가도 실행되지 않게).
- 게시한 런북이 있으면 `runbooks`에 게시 URL을, 없으면 원본 상대 경로를 넣는다.
- `RECORDS`에는 `## 기록 지도` 표의 종류를 **전부** 한 항목씩 넣는다(있으면 `found: true`와 값, 없으면 `found: false`).

## 검증

- `APPS`의 앱 수가 조사에서 찾은 배포 대상 수와 같은지 본다.
- 계정 칸·URL에 비밀번호·토큰·쿼리스트링 키(`?key=`·`token=`)가 없는지 본다.
- ⑤⑥⑦ 상태 줄 값이 상태 파일의 확인일·기각 기록과 일치하는지 본다.
- `RECORDS`의 `found: true` 항목마다 그 경로가 실제로 있고, `found: false` 항목의 경로는 실제로 없는지 본다.
- `items`에 기록 본문(정책의 `→` 뒤 문장·결정 본문)이 옮겨지지 않았는지 본다.
- 생성 뒤 `git status --short`에 기록 파일(`.claude/rules/`·`docs/`의 기록)의 변경이 없는지 본다 — 허브는 기록을 읽기만 한다.
- 상태 파일 표에 ③ 행을 추가·갱신한다.
