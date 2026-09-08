---
name: feature-test
description: docs/features/ 의 기능 명세에 적힌 테스트 케이스를 실제 화면(웹은 Chrome MCP, 앱은 에뮬레이터)에서 순서대로 실행하고, 실패를 코드 버그·문서 노후·환경 문제로 판정해 버전이 기록된 리포트를 남긴다. 사용자가 자동 테스트, 회귀 테스트, 기능 테스트 실행, 문서 기반 테스트, 테스트 리포트, "기능이 아직 잘 되는지 확인" 을 언급하면 반드시 이 스킬을 쓴다. 인수로 기능 ID(F-003) 또는 케이스 ID(TC-F003-01)를 주면 그 범위만 실행한다. 문서 작성·갱신은 /feature-docs 가 맡는다.
argument-hint: "[F-id 또는 TC-id] (없으면 전체)"
allowed-tools: Bash(git status *) Bash(git log *) Bash(git diff *) Bash(git rev-parse *) Bash(git branch *) Bash(git describe *) Bash(git tag *) Bash(adb devices *) Bash(emulator -list-avds *) Bash(xcrun simctl list *) Bash(flutter devices *)
---

# feature-test

`docs/features/03_test_index.md` 가 없으면 "먼저 `/feature-docs init` 을 실행하라" 고
안내하고 중단한다. 프로젝트 정보(URL, 실행 명령, 계정 위치, 기기, 테스트 스크립트 경로)는
`docs/features/PROJECT.md` 에서 읽는다. 없는 항목만 사용자에게 묻는다.

## 실행 전 확인

1. **버전** — HEAD 커밋·브랜치·태그(`git rev-parse --short HEAD`, `git branch --show-current`,
   `git describe --tags --always`), PROJECT.md 에 적힌 버전 파일의 앱 버전, 실행 환경
   (브라우저 버전, 기기·OS, 대상 서버)을 명령으로 확인한다. 추측 금지.
2. **문서 노후 의심** — VERSION.md 의 repo_commit 과 HEAD 가 다르면 그 사이 커밋 목록을
   출력하고, verified_commit 이 그보다 오래된 기능 문서를 미리 표시한다. 실행은 계속한다.
3. **대상 기동** — 웹은 URL 응답, 앱은 기기 목록으로 떠 있는지 본다. 안 떠 있으면
   PROJECT.md 의 실행 명령으로 띄우거나 사용자에게 요청한다.
4. **도구** — Chrome MCP 가 세션에 없으면 웹 케이스는 "환경 문제(C)" 로 전부 제외하고
   알린다. 앱 케이스는 캡처·UI 덤프 수단(adb / xcrun simctl)을 확인한다.

## 범위

- 인수 없음: 03_test_index.md 전체.
- `F-xxx`: 그 기능의 TC 전부. `TC-xxx`: 그 케이스 하나. 어느 쪽이든 의존 케이스(로그인 등)는
  먼저 실행한다.

## 실행 규칙

- 03_test_index.md 의 순서대로, 케이스마다 **전제 → 단계 → 기대 → 정리** 를 그대로 따른다.
  임의로 건너뛰거나 단계를 바꾸지 않는다. 문서에 적힌 셀렉터를 그대로 쓰고, 셀렉터가
  안 잡히면 실패로 기록한 뒤 대체 셀렉터로 재시도한 사실을 근거에 남긴다.
- `docs/features/04_script_map.md` 가 있으면 거기 등록된 TC 는 스크립트(Playwright/Maestro)로
  실행하고, 등록되지 않은 케이스만 직접 수행한다. 스크립트 실행 명령은 PROJECT.md 의
  "테스트 스크립트" 항목을 따른다. 스크립트 결과도 TC ID 기준으로 리포트에 합친다.
  (스크립트가 없으면 `/test-to-script` 로 만들 수 있음을 완료 보고에 한 줄 덧붙인다)
- 웹은 Chrome MCP 로, 앱은 에뮬레이터에서 실제로 조작한다. 결과 화면을 보기만 하고
  "통과" 라고 쓰지 않는다 — 기대값을 실제로 읽어 대조한다.
- `[실행 미검증]` 케이스(삭제·결제·발송·외부 API)는 실행하지 않고 "제외".
- 실패해도 나머지를 계속한다. 의존 케이스가 실패하면 후속은 "차단됨".
- 케이스마다 결과 화면을 `docs/features/test_reports/screenshots/YYYY-MM-DD_TC-id.png` 로 남긴다.
- 정리 단계는 반드시 수행한다. 테스트가 만든 데이터를 남기지 않는다.

## 실패 판정

실패한 케이스는 코드와 화면을 대조해 하나로 판정한다.

| 판정 | 뜻 | 남길 것 |
|---|---|---|
| (A) 코드 버그 | 문서가 맞고 프로그램이 틀림 | 재현 절차, 관련 코드 위치 |
| (B) 문서 노후 | 프로그램은 의도대로 바뀌었고 문서가 뒤처짐 | 근거 커밋 |
| (C) 환경 문제 | 서버 다운, 데이터 부재, 타임아웃, 도구 없음 | 무엇이 없었는지 |
| (D) 판정 불가 | 근거 부족 | 사용자가 확인할 질문 |

**문서를 고치지 않는다.** (B) 도 사용자 승인 후 `/feature-docs sync` 로 고친다.
(A) 는 수정에 착수하지 않고 리포트에만 남긴다. 사용자가 원하면 그때 별도 작업으로 한다.

## 리포트

`${CLAUDE_SKILL_DIR}/references/report.md` 의 형식대로
`docs/features/test_reports/YYYY-MM-DD_커밋해시_report.md` 에 저장하고, 요약 부분만
채팅에 출력한다. 이전 리포트가 있으면 새로 실패·새로 통과를 구분한다.
