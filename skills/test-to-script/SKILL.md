---
name: test-to-script
description: docs/features/ 기능 문서의 자동 테스트 케이스(TC-xxx)를 무인 실행 가능한 스크립트로 변환한다 — 웹은 Playwright, Android/iOS 는 Maestro. 셀렉터 안정화(data-testid 부여)를 함께 제안하고, 변환 결과를 04_script_map.md 와 PROJECT.md 에 등록해 /feature-test 가 스크립트를 우선 실행하게 만든다. 사용자가 테스트 스크립트 생성, Playwright 변환, Maestro 플로우, 무인 테스트, CI 테스트, 스케줄러 테스트, 테스트 자동화 코드를 언급하면 반드시 이 스킬을 쓴다.
argument-hint: "[F-id 또는 TC-id] (없으면 미변환 케이스 전부)"
allowed-tools: Bash(git rev-parse *) Bash(npx playwright *) Bash(maestro *)
---

# test-to-script

`docs/features/03_test_index.md` 가 없으면 "먼저 `/feature-docs init`" 을 안내하고 중단한다.
프로젝트 정보는 `docs/features/PROJECT.md` 에서 읽는다.

## 범위
- 인수 없음: `04_script_map.md` 에 아직 없는 TC 전부.
- `F-xxx` / `TC-xxx`: 해당 범위. 이미 변환된 케이스는 문서 doc_version 이 올라간 경우만 다시 만든다.

## 절차

### 1. 도구 확인·설치 제안
- 웹: `package.json` 에 `@playwright/test` 가 있는지. 없으면 설치 명령을 제안하고 승인 후 실행
  (`npm i -D @playwright/test && npx playwright install chromium`).
  프로젝트 언어가 JS/TS 가 아니어도(Java/PHP 등) 테스트 전용 `tests/e2e/` 하위에 별도 package.json 을 둔다.
- 앱: `maestro` CLI 존재 여부. 없으면 설치 안내만 하고 플로우 파일은 만든다.
- 상세 규칙은 `${CLAUDE_SKILL_DIR}/references/playwright.md`, `${CLAUDE_SKILL_DIR}/references/maestro.md`.

### 2. 셀렉터 점검
- 문서의 셀렉터가 CSS 클래스·텍스트·XPath 처럼 깨지기 쉬우면 `data-testid`(웹) /
  `resource-id`·`accessibilityLabel`(앱) 부여를 제안한다. 코드 변경이므로 **승인 없이 소스를
  고치지 않는다.** 승인되면 속성을 추가하고, 문서의 셀렉터도 함께 갱신하며 그 사실을
  변경 이력에 남긴다.
- 승인 전이거나 거부되면 문서에 적힌 셀렉터를 그대로 쓴다.

### 3. 변환
- 케이스 하나 = 테스트 하나. 테스트 제목에 TC ID 를 그대로 넣는다 (`test('TC-F003-01 정상 로그인', ...)`).
- 문서의 전제 → 단계 → 기대 → 정리를 순서대로 코드로 옮긴다. 문서에 없는 단계를 만들지 않는다.
  옮길 수 없는 단계(파일 업로드, 외부 인증 등)는 `test.skip` 과 사유를 남긴다.
- `[실행 미검증]` 케이스는 변환하지 않는다.
- 테스트 계정은 PROJECT.md 의 "위치" 에 따라 환경변수로 읽는다. 값을 코드에 넣지 않는다.
- 파일 위치: 웹 `tests/e2e/features/F-003_로그인.spec.ts`, 앱 `tests/maestro/F-003_로그인.yaml`.

### 4. 검증
- 만든 스크립트를 실제로 한 번 실행한다. 실패하면 스크립트가 틀린 것인지 문서가 틀린 것인지
  판정해 보고한다. 문서가 틀렸으면 고치지 말고 `/feature-docs sync` 를 안내한다.

### 5. 등록
- `docs/features/04_script_map.md` 에 행을 추가한다:
  `TC ID | 기능 | 스크립트 경로 | 변환일 | 문서 doc_version | 마지막 실행 결과`
- PROJECT.md 의 "테스트 스크립트" 에 실행 명령을 적는다
  (`npx playwright test tests/e2e/features`, `maestro test tests/maestro/`).
- 변환 못 한 케이스와 사유를 보고한다.

## 실행 명령 (참고)
- 전체: `npx playwright test tests/e2e/features` / `maestro test tests/maestro/`
- 특정 TC: `npx playwright test -g "TC-F003-01"` / `maestro test tests/maestro/F-003_로그인.yaml`
- 무인 정기 실행은 이 명령을 작업 스케줄러·CI 에 직접 걸거나 `claude -p "/feature-test"` 로 감싼다.
