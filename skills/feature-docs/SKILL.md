---
name: feature-docs
description: 프로그램의 모든 기능을 코드와 실제 화면(Chrome MCP·에뮬레이터)으로 확인해 AI가 읽고 재현·검증할 수 있는 기능 명세(docs/features/)로 만들고, 코드가 바뀔 때마다 그 문서를 갱신한다. 사용자가 기능 문서화, 기능 명세 작성, 문서 갱신, docs/features, 기능 인벤토리, 화면 검증을 언급하거나 기능을 추가·수정한 뒤 문서 반영이 필요할 때 반드시 이 스킬을 쓴다. 모드는 인수로 고른다 — init(최초·증분 문서화), sync(변경분 반영). 테스트 실행은 별도 스킬 /feature-test 가 맡는다.
argument-hint: "init | sync [기준커밋/태그]"
allowed-tools: Bash(git status *) Bash(git log *) Bash(git diff *) Bash(git rev-parse *) Bash(git branch *) Bash(git describe *) Bash(git remote *) Bash(git tag *) Bash(git show *)
---

# feature-docs

인수 `$0` 로 모드를 정한다. 없거나 모르는 값이면 두 모드를 한 줄씩 설명하고 고르게 한다.
문서 기반 테스트 실행을 요청받으면 이 스킬이 아니라 `/feature-test` 를 안내한다.

| 모드 | 할 일 | 상세 절차 |
|---|---|---|
| `init` | docs/features/ 최초 작성. 이미 있으면 누락 기능만 추가 | `${CLAUDE_SKILL_DIR}/references/init.md` |
| `sync` | 기준 커밋 이후 변경분을 문서에 반영. `$1` = 기준 커밋/태그 | `${CLAUDE_SKILL_DIR}/references/sync.md` |

모드에 해당하는 references 파일을 읽고 그 절차를 따른다. 기능 문서를 새로 쓰거나
CLAUDE.md 규칙을 추가할 때는 `${CLAUDE_SKILL_DIR}/references/template.md` 를 읽는다. 아래 공통 규칙은
두 모드 모두에 적용된다. `/feature-test` 도 같은 파일 구조와 버전 규칙을 전제로 동작하므로 바꾸지 않는다.

## 0. 프로젝트 자동 탐지

이 스킬은 어떤 프로젝트에서든 그대로 동작해야 한다. 프로젝트에 대해 미리 아는 것이
없다고 가정하고 스스로 파악한다. 사용자에게는 탐지로 알 수 없는 항목만, 마지막에
한 번 모아서 묻는다.

1. **저장된 설정** — `docs/features/PROJECT.md` 가 있으면 읽고 그 값을 쓴다.
   비어 있는 항목만 아래 탐지를 하고, 결과를 PROJECT.md 에 저장한다.
2. **환경** — OS·셸을 확인한다. Windows/PowerShell 이면 bash 전용 문법을 피한다
   (`&&` 는 PS 7 이상). `git rev-parse --is-inside-work-tree` 로 git 저장소인지
   확인하고, 아니면 중단하고 알린다.
3. **프로젝트 식별** — 이름은 git remote → 패키지 파일 name → 폴더명 순.
   플랫폼은 흔적으로 판단하며 복수 가능:
   - web: package.json 의 react/vue/angular/next/svelte, 또는 html/php/jsp/thymeleaf 뷰
   - android: build.gradle(.kts) + AndroidManifest.xml
   - ios: *.xcodeproj / *.xcworkspace / Podfile / Package.swift
   - flutter/rn: pubspec.yaml / react-native 의존성 → 양쪽 앱으로 취급
   - backend-only: 화면 흔적 없이 API 만 있음 → 화면 확인을 API 호출로 대체하고 문서에 명시
4. **버전 파일** — 존재하는 것을 전부 기록: package.json(version),
   build.gradle(.kts)(versionName/versionCode), Info.plist·project.pbxproj
   (MARKETING_VERSION/CURRENT_PROJECT_VERSION), pubspec.yaml, pom.xml, Cargo.toml,
   pyproject.toml, setup.py, VERSION, CHANGELOG.md 최상단. 없으면 git tag 를 앱 버전으로 쓴다.
5. **실행·접속** — 웹 URL 은 .env*, application*.yml/properties, vite/webpack/next 설정,
   docker-compose, README 에서 찾고 로컬 실행 스크립트(dev/start/serve)도 기록한다.
   앱은 `adb devices`, `emulator -list-avds`, macOS `xcrun simctl list devices`,
   `flutter devices` 로 기기를 확인하고, 없으면 켜 달라고 요청한다.
6. **테스트 계정** — .env.example, README, seed/fixture SQL, 테스트 코드에서 찾는다.
   비밀번호는 PROJECT.md 에 저장하지 않고 위치만 적는다 (예: ".env 의 TEST_USER_PW").
7. **도구** — 세션에 Chrome MCP 도구가 있는지 확인한다. 없으면 웹 화면 확인을
   [화면 미확인] 으로 진행하고 사용자에게 알린다. 앱은 화면 캡처와 UI 트리 덤프 수단을
   확인한다 (adb exec-out screencap / uiautomator dump, xcrun simctl io screenshot 등).

## 1. 버전 기록 규칙

문서마다 "언제, 어느 코드에서, 어느 앱 버전을 보고 썼는지" 를 남긴다.
- 날짜: 시스템 명령으로 확인한 YYYY-MM-DD. 추측 금지.
- 커밋 `git rev-parse --short HEAD`, 브랜치 `git branch --show-current`,
  태그 `git describe --tags --always`. 앱 버전은 0-4 의 파일에서 읽는다.
- doc_version: 문서 개정 번호. 최초 1.0, 내용 수정 +0.1, 동작 변경 +1.0.
- 환경: 브라우저 버전, 에뮬레이터 기기·OS, 대상 서버(로컬/개발/운영).
- 세트 전체 값은 `docs/features/VERSION.md`, 기능별 값은 각 파일 frontmatter 에 기록한다.

## 2. 검증 원칙

1. 기능은 **코드 확인 + 실제 화면 확인** 둘 다 거쳐야 "확인됨". 하나만이면
   [코드만 확인] / [화면만 확인].
2. 코드에만 있는 기능 → [숨김/비활성 추정]. 화면에만 있는 기능 → [출처 불명].
3. 추측으로 채우지 않는다. 모르면 비우고 [미확인].
4. 화면 확인은 실제로 입력하고 결과를 관찰한다. 보기만 하고 "될 것이다" 라고 쓰지 않는다.
5. 파괴적 동작(삭제·결제·발송·외부 API 호출)은 실행하지 않고 코드로만 문서화하고 [실행 미검증].
6. 문서는 한국어. 셀렉터·코드·명령은 원문. 요약·감상 없이 사실만.

## 3. 파일 구조

```
docs/features/
├── PROJECT.md          탐지 결과 (재사용용)
├── VERSION.md          문서 세트 버전·이력
├── 00_inventory.md     기능 인벤토리 표
├── 01_screen_flow.md   화면 이동 관계 (mermaid)
├── 02_data_model.md    주요 데이터·상태
├── 03_test_index.md    테스트 케이스 목록·순서·의존성
├── 04_script_map.md    TC ↔ 스크립트 매핑 (/test-to-script 가 작성)
├── F-001_기능명.md      기능 하나 = 파일 하나
├── screenshots/
└── test_reports/       /feature-test 가 작성
```
