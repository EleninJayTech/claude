# 출처·범주·명령 — tool-tune

도구 이름 목록이 아니라 **어디서 찾고 어떻게 읽는지**를 적는다. 예로 든 이름은 분류를 돕는 예시일 뿐 감지 목록이 아니다 — 여기 없는 도구도 출처에 있으면 본다.

## 1. 감지 출처

| 출처 | 감지 명령 | 읽는 값 |
|---|---|---|
| MCP 서버 | `claude mcp list` · 스코프가 필요하면 `claude mcp get <이름>` | 이름·실행 명령. 버전은 명령에서 읽는다: `<패키지>@<x.y.z>`면 그 값 · `@latest`면 "실행 때 받음"(공식 미명시 — 버전을 읽을 수 없는 것으로 센다) · 버전 없는 `npx <패키지>`면 🟡 · 로컬 실행 파일이면 `<실행 파일> --version` · `http(s)://` 원격·claude.ai 커넥터는 버전 관리 대상이 아니다(세지 않는다) |
| 플러그인 | `claude plugin list --json` | `id`·`version`·`scope`·`enabled`. 내장(`@builtin`)은 세지 않는다 |
| npm 전역 | `npm ls -g --depth=0 --json` | `dependencies.<패키지>.version` |
| Dart 전역 | `dart pub global list` | `<패키지> <버전>` |
| Windows 패키지 | `winget upgrade --disable-interactivity` | 이름·ID·현재·사용 가능 — 업데이트가 있는 것만 나온다(범주 안 것만 쓴다) |
| macOS 패키지 | `brew outdated --json=v2` | `name`·`installed_versions`·`current_version` |
| Linux 패키지 | — | 배포판마다 패키지 관리자가 달라 보지 않는다. 표 아래 줄에 "Linux 패키지 — 미확인"으로 적는다 |
| 세션 내장·확장 | ToolSearch로 이름 확인: `mcp__claude-in-chrome__` · `mcp__computer-use__` · `mcp__Claude_Browser__` · `mcp__marionette__` | 있음/없음만 — 버전을 읽는 공식 경로가 없다(확장은 Chrome이, 내장 도구는 앱이 갱신한다) |
| 프로젝트 의존성 | 작업 폴더에 `package.json`이 있으면 `npm outdated --json` | `current`·`latest` — 보고만 |

위 출처로 잡히지 않고 PATH에만 있는 도구는 사용자가 이름을 대면 `<실행 파일> --version`으로 본다.

## 2. 범주 — 기능으로 나눈다

| 범주 | 기준 | 예 |
|---|---|---|
| 화면·브라우저 조작 | 브라우저를 열고 페이지를 읽거나 조작한다 | Playwright CLI·Chrome DevTools MCP·Claude in Chrome·Desktop 내장 브라우저 |
| 데스크톱·앱 조작 | OS 창이나 앱 화면을 보고 조작한다 | computer-use·Marionette |
| 검증 | 결과를 판정하거나 검수를 돕는다 — 린터·테스트 러너·접근성·스크린샷 비교·diff 검수 | lazygit·delta·difftastic |
| 문서 조회 | 라이브러리 문서나 검색 결과를 Claude에 공급한다 | ctx7·Context7 |
| 범주 밖 | 위에 들지 않는다 — 개발 기본 환경(셸·터미널·git·gh·런타임·패키지 관리자 자체)은 `/win-setup` 몫이다 | 배포 CLI·업무 앱 |

판단이 애매하면 범주 칸에 `?`를 붙여 표에 올리고 사용자가 고르게 한다.

## 3. 최신 조회와 비교

| 출처 | 최신 조회 |
|---|---|
| npm | `npm view <패키지> version`(레지스트리가 공식 배포 채널이다) |
| Dart | `curl -s https://pub.dev/api/packages/<패키지>`의 `latest.version` |
| 플러그인 | `claude plugin list --available --json`의 버전 값 — 마지막 카탈로그 갱신 시점 기준이다(갱신은 5) 승인 뒤). 버전 필드가 없으면 🟡 |
| Windows 패키지 | `winget upgrade` 출력의 사용 가능 열 |
| macOS 패키지 | `brew outdated --json=v2`의 `current_version` |
| 실행 파일 단독 | 그 도구 공식 저장소의 최신 릴리스 — `https://api.github.com/repos/<소유자>/<저장소>/releases/latest`의 `tag_name`. 저장소를 모르면 🟡 |

비교: 앞의 `v`를 떼고 점으로 나눈 숫자를 차례로 비교한다. 첫 숫자가 다르면 `메이저 업`이다 — 단 첫 숫자가 `0`이면 둘째 숫자를 메이저로 본다. `+` 뒤(빌드 메타데이터)만 다르면 `업데이트`다(내용이 바뀐 것이다). 숫자로 나눌 수 없는 버전(해시·날짜)은 문자열이 다르면 🟡로 둔다.

## 4. 적용과 되돌리기

| 출처 | 적용 | 되돌리기 |
|---|---|---|
| npm 전역 | `npm install -g <패키지>@<최신>` | `npm install -g <패키지>@<이전>` |
| Dart 전역 | `dart pub global activate <패키지> <최신>` | `dart pub global activate <패키지> <이전>` |
| 플러그인 | 카탈로그 갱신 `claude plugin marketplace update`(이름 없이 — 목록만 새로 받고 설치된 플러그인은 그대로다) → `claude plugin update <플러그인>@<마켓> --scope <scope>` | 불가 — 사용자가 이전 버전을 고르는 공식 명령이 없다(고정은 마켓 작성자의 `ref`·`sha`나 마켓 태그 고정뿐) |
| MCP(버전 고정 등록) | 등록 줄 전체를 기록에 남긴 뒤 `claude mcp remove <이름> -s <scope>` → 같은 인자로 `claude mcp add`(버전만 바꾼다) | 같은 방법으로 이전 버전 |
| Windows 패키지 | `winget upgrade --id <ID> -e` | `winget install --id <ID> -e --version <이전> --force` |
| macOS 패키지 | `brew upgrade <이름>` | 불가로 기록한다 — 일반 formula의 이전 버전 설치 경로를 공식으로 확인하지 못했다(🟡) |

- **MCP 등록에 환경변수·헤더가 있으면 자동으로 다시 등록하지 않는다** — 다시 넣으려면 시크릿 값을 읽어야 한다. 바꿀 명령만 보이고 사용자가 직접 실행하게 한다.
- **짝 패키지가 있는 도구는 짝을 함께 본다** — 예: Marionette는 앱 쪽 패키지(`marionette_flutter`)와 버전을 맞춰야 한다(단디 03 §14). 도구만 올리면 연결이 끊긴다고 승인 설명에 적고, 앱 쪽은 그 프로젝트에서 사용자가 올린다.
- 프로젝트 의존성은 적용하지 않는다(보고만).
