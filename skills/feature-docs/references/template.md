# 기능 문서 템플릿과 CLAUDE.md 규칙

## 기능 파일 템플릿 (`docs/features/F-001_기능명.md`)

항목을 빼거나 순서를 바꾸지 않는다. 채울 수 없는 항목은 비우고 [미확인] 을 적는다.

```markdown
---
id: F-001
name: 기능명
platform: web | android | ios
status: 확인됨 | 코드만 확인 | 화면만 확인 | 미확인 | 실행 미검증 | 폐기
doc_version: 1.0
created: YYYY-MM-DD
last_verified: YYYY-MM-DD
verified_branch: 브랜치
verified_commit: 해시
verified_tag: 태그 또는 -
app_version: x.y.z (빌드)
verified_env: 브라우저 / 기기·OS / 대상 서버
related: [F-002]
---

## 목적
사용자가 이 기능으로 무엇을 하는지 1~2문장.

## 진입 경로
- 화면: 메뉴 > 서브메뉴 > 버튼, 또는 URL / 딥링크
- 사전 조건: 로그인 상태, 권한, 필요한 데이터

## 동작 단계
1. [사용자 행동] — 대상: `CSS 셀렉터 / data-testid / resource-id / accessibility id` → [시스템 반응]
2. ...

## 입력 규칙과 유효성 검사
| 필드 | 필수 | 형식/제한 | 오류 메시지 | 코드 위치 |
|---|---|---|---|---|

## 예외·오류 케이스
- [조건] → [화면 표시 결과] — 코드: `경로:라인`

## 코드 참조
- 프론트: `경로:라인` — 역할
- 백엔드/API: `METHOD /path` — `경로:라인`
- DB/모델: `경로`

## 화면 증거
- `screenshots/F-001_01_initial.png` — 초기 상태
- `screenshots/F-001_02_result.png` — 성공 결과

## 자동 테스트 케이스
한 케이스에 하나의 검증. 다른 AI 세션이 그대로 실행할 수 있게 쓴다.

### TC-F001-01: 케이스명
- 전제: 상태
- 단계:
  1. `URL 또는 화면` 이동
  2. `셀렉터` 에 `값` 입력
  3. `셀렉터` 클릭
- 기대: `셀렉터` 텍스트 = `값` / URL 변경 / 요소 표시 여부
- 정리: 테스트 후 되돌릴 작업, 없으면 "없음"

### TC-F001-02: 실패 케이스명
...

## 변경 이력
| 문서버전 | 날짜 | 커밋 | 앱 버전 | 변경 내용 |
|---|---|---|---|---|
| 1.0 | YYYY-MM-DD | abc1234 | 1.2.0 | 최초 작성 |
```

## PROJECT.md 형식

```markdown
# 프로젝트 탐지 결과
- 이름:
- 플랫폼:            (web / android / ios / flutter / backend-only)
- 기술 스택:
- 버전 파일:         (경로와 읽는 키)
- 실행 명령:         (웹 dev 서버, 앱 빌드·실행)
- 웹 URL:
- 테스트 계정 위치:  (값이 아니라 위치)
- 에뮬레이터/기기:
- 사용 도구:         (Chrome MCP 여부, adb/xcrun 등)
- 테스트 스크립트:   (Playwright/Maestro/Appium 경로, 없으면 -)
- 탐지일 / 커밋:
```

## VERSION.md 형식

```markdown
docs_version: 1.0
generated: YYYY-MM-DD
repo_branch:
repo_commit:
repo_tag:
app_version:        (플랫폼별로 나열)
environment:        (브라우저 버전, 기기·OS, 대상 서버)
feature_count:      전체 N (확인됨 N / 코드만 N / 화면만 N / 미확인 N / 실행 미검증 N / 폐기 N)

## history
| docs_version | 날짜 | 커밋 | 내용 |
|---|---|---|---|
| 1.0 | YYYY-MM-DD | abc1234 | 최초 작성 |
```

## CLAUDE.md 에 추가할 "기능 문서 유지 규칙"

프로젝트 루트 CLAUDE.md 에 아래 섹션을 추가한다. 이미 있으면 덮어쓰지 말고 비교해서
빠진 규칙만 보탠다.

```markdown
## 기능 문서 유지 규칙 (docs/features/)
- 기능을 추가·수정·삭제하는 모든 작업은 같은 커밋(또는 PR) 안에서 docs/features/ 의
  해당 문서를 함께 갱신한다. 완료 보고 시 "갱신한 기능 문서: F-xxx" 를 명시한다.
- 갱신 시 doc_version, last_verified, verified_branch/commit/tag, app_version,
  verified_env, 변경 이력을 수정한다. 날짜·커밋은 명령으로 확인한 값만 쓴다.
- 화면이 바뀌면 스크린샷을 다시 찍고, 셀렉터가 바뀌면 테스트 케이스를 고친다.
- 새 기능은 00_inventory.md 와 03_test_index.md 에 행을 추가한다.
- 기능 삭제 시 파일을 지우지 않고 status 를 폐기로 바꾸고 사유를 이력에 남긴다.
- 기능 문서를 하나라도 고치면 VERSION.md 의 docs_version 을 올리고 history 에 추가한다.
  앱 버전이 오르면 VERSION.md 의 app_version 을 갱신하고, 전체 기능 문서와 대조해
  뒤처진 문서를 목록으로 보고한다.
- 커밋 전 `/feature-docs sync`, 정기적으로 `/feature-test` 를 실행한다.
- 주기 점검은 `/feature-doc-audit`(문서 상태만), 커밋 가드는 `/feature-doc-guard install`,
  무인 실행용 스크립트는 `/test-to-script`, 배포 시 `/release-notes` 를 쓴다 (설치된 경우).
- `/feature-test` 결과가 (B) 문서 노후로 판정되면 사용자 승인 후 `/feature-docs sync` 로 고친다.
```
