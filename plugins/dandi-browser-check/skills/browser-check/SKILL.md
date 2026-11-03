---
name: browser-check
description: 브라우저로 화면·페이지를 확인하거나 디버깅할 때 관찰 수단을 고르는 규칙 — 만든 화면 확인, UI 검증, 배포된 페이지 확인, 콘솔·네트워크 오류 디버깅, 스크린샷을 찍으려 할 때 쓴다. Playwright CLI·Desktop 내장 브라우저·Claude in Chrome·Chrome DevTools MCP 어느 것을 쓰든 적용한다. 앱을 띄우는 방법은 다루지 않는다(내장 /run·/verify 레시피 몫).
---

# browser-check

목표는 **확인이 정확한 것**이고, 토큰은 정확도가 같을 때만 아낀다. 관찰 수단은 비용이 아니라 **질문의 종류**로 고른다.

## 0. 통과 기준을 먼저 정한다
무엇이 보이거나 읽히면 통과인지(기대값)를 한 줄로 정하고 시작한다. 기준 없이 화면을 둘러보면 캡처만 늘고 판정은 흐려진다.

## 1. 질문별 관찰 수단 — 위에서부터 고른다
| 질문 | 수단 |
|---|---|
| 렌더링 없이 답이 나온다 — 서빙된 파일 내용·HTTP 상태·빌드 산출물·링크 존재 | `curl`(Windows는 `Invoke-WebRequest`) + 검색. 브라우저가 필요 없다 |
| DOM·텍스트·폼 상태·요소 존재·콘솔 오류·네트워크 실패 | 브라우저의 **텍스트 채널** — Playwright CLI: `snapshot`(파일로 저장) 후 검색·`console`·`requests` / Chrome·Desktop: 페이지 텍스트(`get_page_text`)·요소 트리(`read_page`·`find`)·콘솔/네트워크 읽기(패턴 필터) |
| 보이는 모습 자체 — 레이아웃·겹침·잘림·색·간격·디자인 시안 대조·반응형 | **스크린샷이 필수다.** 텍스트로 대체하지 않는다. 범위는 대상 요소·뷰포트로 좁히고, 변경 전후 한 쌍을 기본으로 한다 |
| 왜 느린가·왜 실패하는가 — 성능·로드 지연·메모리·Lighthouse 점수 | Chrome DevTools MCP(설치돼 있으면) — 성능 트레이스·Lighthouse·네트워크 상세. 없으면 텍스트 채널의 콘솔·네트워크까지 보고, 성능 원인은 확인하지 못했다고 밝힌다 |
| 같은 확인을 되풀이한다(수정-확인 루프 3회째·회귀) | 스크립트로 굳힌다 — 프로젝트의 e2e 도구, 있으면 `/dandi-feature-docs:test-to-script`. 실행 비용은 출력뿐이고 판정이 결정적이다 |

## 2. 안정성 — 아끼느라 틀리지 않는다
- curl 결과에 기대 문자열이 없으면 **클라이언트 렌더링(SPA)** 을 먼저 의심하고 텍스트 채널로 올린다. 없음을 곧 실패로 판정하지 않는다.
- 텍스트 채널이 비었거나 모호하면(로딩 전·canvas·svg 그림·iframe·shadow DOM·이미지 속 글자) **한 단 올려** 스크린샷으로 본다. "안 읽힌다"를 "없다"로 바꾸지 않는다.
- 대기는 고정 시간이 아니라 대상 요소·텍스트가 나타날 때까지로 한다.
- 디버깅은 콘솔·네트워크부터 — 찾을 패턴(error·4xx/5xx·특정 메시지)을 정해 걸러 읽는다. 전체 로그를 통째로 읽지 않는다.
- 페이지 원문이 길면 대화에 통째로 싣지 말고 파일로 받아 검색한다. 정확한 문자열이 판정 근거면 그 줄은 그대로 인용한다.
- JavaScript 대화상자(alert·confirm)를 띄우는 동작은 피한다 — 브라우저 도구가 멈춘다.
- 로그인이 필요한 페이지는 순서대로 — ① **테스트 계정으로 한 번 로그인해 storage state 파일로 저장**(`playwright-cli state-save <파일>`)하고 이후 `state-load <파일>`로 재사용 ② 구글·SSO·2FA처럼 테스트 계정이 안 되면 **Playwright CLI를 headed + 실제 Chrome 채널 + 저장소 밖 영구 프로필로 띄워 사용자가 직접 로그인**한다: `playwright-cli -s=<이름> open --headed --browser=chrome --persistent --profile=<저장소 밖 경로> <URL>` — 로그인은 사용자 몫이고 Claude는 기다린다. **DevTools MCP 창에선 시도하지 않는다** — Google은 자동화로 제어되는 브라우저의 로그인을 막고(공식) DevTools MCP 창은 실측 거부(2026-11-03) ③ 세션에 Claude in Chrome 도구가 이미 있으면 그 로그인 상태를 쓴다(§4-3). 상태 파일·프로필 폴더는 쿠키를 담은 시크릿이라 저장소 밖에 두고 `.gitignore`에 넣어 커밋하지 않으며, 끝나면 `playwright-cli -s=<이름> delete-data`로 지울지 묻는다. 실제 관리자 계정이 로그인된 메인 프로필을 넘기지 않는다.
- API·CLI 값과 화면 값이 다를 수 있는 대상(심사·게시·승인 상태 등)은 **화면을 정본**으로 본다 — API가 완료라 해도 화면이 검토 중이면 검토 중이다.
- Playwright CLI는 작업 폴더에 `.playwright-cli/`(스냅샷·로그 — 페이지 내용이 들어 있다)를 만든다. 커밋하지 않는다(`.gitignore`) — 작업이 끝나면 `close`하고 남길지 묻는다.

## 3. 보고
- 판정 근거는 **읽은 값이나 명령 출력**으로 남긴다. 시각 판정의 근거는 스크린샷이다.
- 실패는 재현 단계와 증거(값 또는 스크린샷 1장)를 함께 남긴다.

## 4. 도구 — 설치된 것 중에서
0. 먼저 **설치·연결된 수단을 확인**한다 — `playwright-cli --version`(PowerShell은 `Get-Command playwright-cli`), ToolSearch로 `mcp__claude-in-chrome__*`·`mcp__chrome-devtools__*` 존재, Desktop 세션이면 내장 Browser. 확인하지 않고 아래 순서를 건너뛰지 않는다.
1. 기본: Playwright CLI(헤드리스 — 사용자 브라우저를 점유하지 않고 세션을 여럿 띄울 수 있다. 명령은 `playwright-cli --help`).
2. Playwright CLI가 없고 Desktop 앱 로컬 세션이면 내장 Browser — Claude가 띄운 localhost 개발 서버를 바로 연다(깨끗한 프로필).
3. 세션에 Claude in Chrome 도구가 **이미 있을 때**(시작 때 `claude --chrome`이었거나 Enabled by default) 내 실제 로그인 세션이 필요한 화면에 쓴다 — 사이트 권한은 대상 도메인으로만. **도구가 없으면 확장을 지금 열어도 이 세션엔 생기지 않는다**(공식 — 설정은 다음 세션부터): 지금 필요하면 `claude --chrome`으로 재시작, 매 세션 쓰면 `/chrome` → Enabled by default(매 세션 컨텍스트 비용)를 사용자에게 안내한다. 있던 연결이 끊긴 것이면 `/chrome` → Reconnect extension. 로그인 화면 자체는 §2의 headed 프로필로도 되므로 여기서 막히지 않는다.
4. 원인 디버깅: Chrome DevTools MCP(전용 프로필 — 실행 중인 내 Chrome에 붙는 연결 모드 `--autoConnect`는 쓰지 않는다). 구글 계정 로그인이 필요한 화면엔 쓰지 않는다(§2). 서버가 재시작되면 page id가 바뀌므로 `list_pages`로 다시 받는다(실측 2026-11-03).
5. 하나도 없으면 curl 단까지만 하고, 화면은 확인하지 못했다고 밝힌다.

## 5. 문제 해결 — Playwright가 브라우저를 띄우지 못할 때
증상: `playwright-cli open`이 `Daemon process exited with code 1`·`TargetClosedError`로 즉시 실패하고 브라우저 stderr는 비어 있다(헤드리스·`--headed`·Chrome·Edge 모두).
1. 보안 제품·네트워크를 의심하기 전에 **같은 브라우저를 직접 헤드리스로** 실행한다 — `chrome.exe --headless --dump-dom <URL>`(Edge는 `msedge.exe`). 직접 실행은 되고 Playwright만 실패하면 **실행 옵션 문제**다.
2. Windows면 브라우저 정책 레지스트리를 **읽기만** 한다 — `HKLM\SOFTWARE\Policies\Google\Chrome`·`HKLM\SOFTWARE\Policies\Microsoft\Edge`(HKCU 같은 경로도). `ExtensionInstallForcelist`(확장 강제 설치)가 있으면 Playwright 기본 옵션 `--disable-extensions`와의 충돌을 먼저 의심한다(실측 2026-11-03 — 이 조합에서 브라우저가 종료 코드 1로 즉시 종료).
3. 대처: `ignoreDefaultArgs`(공식 — 기본 인자 중 지정한 것만 뺀다)를 담은 설정 파일을 **저장소 밖**(`<사용자 홈>` 아래 등)에 두고 `playwright-cli open --config=<그 경로> <URL>`로 연다.
   `{"browser": {"browserName": "chromium", "launchOptions": {"channel": "chrome", "headless": true, "ignoreDefaultArgs": ["--disable-extensions"]}}}`
   playwright-core 직접 사용: `chromium.launch({ channel: 'chrome', ignoreDefaultArgs: ['--disable-extensions'] })`. 업무 저장소에 `.playwright/cli.config.json`(CLI가 실행 폴더에서 자동으로 읽는 기본 위치)을 커밋하지 않는다 — 다른 사람 PC의 동작까지 바뀐다.
4. 원인이 다른 옵션일 수도 있다 — 일반 절차는 **최소 옵션으로 기동 확인**(playwright-core `ignoreDefaultArgs: true` + `--headless --remote-debugging-pipe --no-first-run --user-data-dir=<임시>`) → **기본 옵션을 하나씩 더해 실패를 일으키는 옵션을 특정**.
- `--disable-extensions` 제외는 **증상이 있을 때만** 쓴다 — 정책이 없는 PC에서 기본으로 빼면 사용자 확장이 자동화 브라우저에 끼어든다. 정책을 바꾸거나 우회하라고 안내하지 않는다(회사 보안 정책).
