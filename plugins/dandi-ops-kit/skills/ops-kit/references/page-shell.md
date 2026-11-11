# 공용 HTML 골격 — ① 배포 런북 · ② 운영 런북 · ③ 관리 허브

세 HTML 산출물이 같은 골격을 쓴다. 운영자는 휴대폰으로도 열고 밤에도 열므로 **모바일 폭·다크 모드**가 기본이다. 외부 스크립트·웹폰트는 쓰지 않는다 — 오프라인으로 열어도 깨지지 않고, 폰트 라이선스를 따질 일이 없다.

## 만들 것

- 파일 하나에 CSS·JS를 모두 인라인으로 넣는다.
- `<meta name="robots" content="noindex">` — 실수로 공개되어도 검색에 걸리지 않게.
- 색은 `:root` 토큰으로만 쓰고 다크 모드에서 토큰만 바꾼다.
- 단계 블록은 `<details>`로 접고 펼친다. 명령 블록마다 복사 버튼을 둔다(시크릿 값을 넣는 블록이 아니라 **명령**을 복사하는 버튼이다).
- 머리에 **문서 id·마지막 확인일·원본 경로**를 둔다(보고 틀의 `<문서 id>`와 같은 값).

## 형식·템플릿

이 골격을 그대로 쓰고 `<!-- 본문 -->` 자리만 채운다. `lang`은 산출물 언어로 바꾼다.

```html
<!doctype html>
<html lang="ko">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<meta name="robots" content="noindex">
<title>배포 런북</title>
<style>
:root {
  --bg: #ffffff; --surface: #f5f6f8; --text: #1a1c20; --muted: #5b616e;
  --border: #d9dce2; --accent: #2457c5; --ok: #1d7a46; --warn: #a15c00; --bad: #b42318;
  --code-bg: #eef0f4;
}
@media (prefers-color-scheme: dark) {
  :root {
    --bg: #14161a; --surface: #1d2026; --text: #e6e8ec; --muted: #9aa1ad;
    --border: #2e333c; --accent: #7aa2ff; --ok: #5cc98a; --warn: #f0b45a; --bad: #ff7b72;
    --code-bg: #0f1114;
  }
}
* { box-sizing: border-box; }
body {
  margin: 0; background: var(--bg); color: var(--text);
  font: 16px/1.6 system-ui, -apple-system, "Segoe UI", "Apple SD Gothic Neo", "Malgun Gothic", "Noto Sans KR", sans-serif;
}
main { max-width: 860px; margin: 0 auto; padding: 24px 16px 64px; }
header .meta { color: var(--muted); font-size: 14px; }
h1 { font-size: 26px; margin: 0 0 4px; }
h2 { font-size: 20px; margin: 32px 0 8px; padding-top: 8px; border-top: 1px solid var(--border); }
a { color: var(--accent); }
code { font: 14px/1.5 ui-monospace, "Cascadia Mono", Consolas, monospace; }
:not(pre) > code { background: var(--code-bg); padding: 1px 5px; border-radius: 4px; }
details.step { background: var(--surface); border: 1px solid var(--border); border-radius: 10px; margin: 12px 0; padding: 0 14px; }
details.step > summary { cursor: pointer; padding: 12px 0; font-weight: 600; min-height: 44px; }
.cmd { position: relative; }
.cmd pre { background: var(--code-bg); border: 1px solid var(--border); border-radius: 8px; padding: 12px; overflow-x: auto; margin: 8px 0; }
.cmd button { position: absolute; top: 6px; right: 6px; min-height: 32px; padding: 4px 10px; border-radius: 6px;
  border: 1px solid var(--border); background: var(--bg); color: var(--text); cursor: pointer; }
.label { font-size: 13px; font-weight: 700; color: var(--muted); margin-top: 10px; }
.muted { color: var(--muted); } .ok { color: var(--ok); } .warn { color: var(--warn); } .bad { color: var(--bad); }
.recheck { color: var(--warn); font-weight: 600; }
table { border-collapse: collapse; width: 100%; font-size: 15px; }
th, td { border-bottom: 1px solid var(--border); padding: 8px 6px; text-align: left; vertical-align: top; }
.table-wrap { overflow-x: auto; }
</style>
</head>
<body>
<main>
<header>
  <h1>배포 런북</h1>
  <p class="meta">문서 id <code>deploy</code> · 마지막 확인 YYYY-MM-DD · 원본 <code>docs/status/deploy-runbook.html</code></p>
</header>

<!-- 본문 -->

</main>
<script>
document.querySelectorAll(".cmd").forEach((box) => {
  const pre = box.querySelector("pre");
  const btn = document.createElement("button");
  btn.type = "button"; btn.textContent = "복사";
  btn.addEventListener("click", async () => {
    try { await navigator.clipboard.writeText(pre.innerText); btn.textContent = "복사됨"; }
    catch { btn.textContent = "직접 선택"; }
    setTimeout(() => (btn.textContent = "복사"), 1500);
  });
  box.appendChild(btn);
});
</script>
</body>
</html>
```

**단계 블록 하나**(런북 본문에 반복한다 — SKILL.md §4의 네 칸):

```html
<details class="step" id="deploy-3">
  <summary>3. 시크릿 등록 — <code>ADMIN_TOKEN</code></summary>
  <p class="label">명령 (서버 폴더에서)</p>
  <div class="cmd"><pre>$t = Read-Host -MaskInput "ADMIN_TOKEN"; $t.Length
$t | npx wrangler secret put ADMIN_TOKEN
Remove-Variable t</pre></div>
  <p>출력된 길이가 <b>32 이상</b>이어야 한다. 값은 비밀번호 관리자의 <code>&lt;항목명&gt;</code>에 있다.</p>
  <p class="label">성공하면</p><p><code>Success!</code>로 시작하는 줄 <span class="recheck">[재확인]</span></p>
  <p class="label">실패하면</p><ul><li>길이가 짧다 → 값을 다시 받는다(붙여넣기 실패).</li></ul>
  <p class="label">Claude에게</p>
  <div class="cmd"><pre>[ops-kit deploy/3] 결과: &lt;성공 문구 또는 오류 첫 줄&gt; · 다음: deploy/4</pre></div>
</details>
```

## 검증

- 파일을 브라우저로 열어(또는 `browser-check` 스킬의 관찰 수단으로) 라이트·다크와 폭 360px에서 가로 스크롤이 본문에 생기지 않는지 본다. 확인 수단이 없으면 "화면은 확인하지 못했다"고 보고한다.
- `grep -n "fonts.googleapis\|<script src" <파일>` 결과가 0건인지 본다.
