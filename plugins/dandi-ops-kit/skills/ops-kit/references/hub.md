# ③ 관리 허브 — 앱별 관리 사이트 · 계정 이름 · 확인 위치를 한 화면에

앱이 하나뿐일 때는 런북으로 충분하지만, 콘솔이 여러 곳이거나 앱이 늘면 "그 설정이 어느 사이트 어느 계정에 있었지"가 매번 검색이 된다. 허브는 그 답을 한 화면에 모은다. 목록은 **배열 하나(`APPS`)** 에서 렌더하므로 앱이 늘어도 한 줄만 추가하면 된다.

## 진단 신호

| 판정 | 조건 |
| --- | --- |
| 필요 | 관리할 외부 사이트·콘솔이 2곳 이상이거나, 배포 대상(앱)이 둘 이상이다(모노레포의 앱 폴더·설정 파일 여러 벌) |
| 판단 보류 | 콘솔이 1곳뿐이다 — 운영 런북의 콘솔 표로 충분할 수 있다. 앞으로 앱이 늘 계획인지 묻는다 |
| 불필요 | 배포 대상이 없다 |

## 만들 것

`docs/status/admin-hub.html`(문서 id `hub`). 골격은 `page-shell.md`.
- 앱 카드마다: 이름·상태(배포됨/대기)·주소·관리 링크 목록(라벨·URL·계정 이름·여기서 확인하는 것)·런북 링크·⑤⑥⑦ 상태 줄.
- **⑤⑥⑦ 상태 줄**: 헬스체크 켜짐 여부 · 마지막 백업 리허설 날짜 · 한도 표 확인일. 만들지 않은 항목은 "만들지 않음(사유)"으로 보인다 — 빈칸이면 켜진 것인지 잊은 것인지 구분되지 않는다.
- 계정 칸은 **이름만**. 비밀번호·토큰·복구 코드는 넣지 않는다.

## 형식·템플릿

`<!-- 본문 -->` 자리에 아래를 넣는다. `APPS`만 프로젝트 값으로 채운다.

```html
<section id="apps"></section>
<p class="meta">목록 원본: 이 파일의 <code>APPS</code> — 앱이 늘면 한 줄 추가한다.</p>
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
</script>
```

- 링크 URL은 `safeUrl`로 `http(s)`·상대 경로만 허용한다(배열에 실수로 `javascript:`가 들어가도 실행되지 않게).
- 게시한 런북이 있으면 `runbooks`에 게시 URL을, 없으면 원본 상대 경로를 넣는다.

## 검증

- `APPS`의 앱 수가 조사에서 찾은 배포 대상 수와 같은지 본다.
- 계정 칸·URL에 비밀번호·토큰·쿼리스트링 키(`?key=`·`token=`)가 없는지 본다.
- ⑤⑥⑦ 상태 줄 값이 상태 파일의 확인일·기각 기록과 일치하는지 본다.
- 상태 파일 표에 ③ 행을 추가·갱신한다.
