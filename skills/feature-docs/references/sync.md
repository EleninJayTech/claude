# sync 모드 — 변경분 반영

`docs/features/` 가 없으면 "먼저 `/feature-docs init` 을 실행하라" 고 안내하고 중단한다.
SKILL.md 의 "0. 프로젝트 자동 탐지" 는 PROJECT.md 를 읽는 것으로 대신한다.

## 절차

### 1. 버전 범위 확정
- 기준: `$1` 이 있으면 그 커밋/태그, 없으면 VERSION.md 의 repo_commit.
- 대상: 현재 HEAD. 커밋하지 않은 작업 중 변경도 포함한다.
- `git log --oneline 기준..HEAD` 와 `git diff 기준 --stat` 로 변경 파일을 확인한다.
- 버전 파일(PROJECT.md 에 기록된 경로)이 바뀌었으면 새 앱 버전을 기록한다.

### 2. 영향 기능 추적
- 변경 파일을 00_inventory.md 의 "담당 코드 위치" 와 각 기능 문서의 "코드 참조" 로
  역추적해 영향 기능 ID 를 나열한다.
- 어느 기능에도 매핑되지 않는 파일은 새 기능 후보로 표시한다.
- 시작 전에 "영향 기능 / 새 기능 후보 / 매핑 불가 파일" 을 사용자에게 보여준다.

### 3. 영향 기능마다
- 코드를 다시 읽고 동작 단계·유효성·예외·코드 참조를 대조한다.
- 실제 화면(웹: Chrome MCP, 앱: 에뮬레이터)에서 다시 확인하고 바뀐 부분의 스크린샷을
  갱신한다.
- 테스트 케이스를 실제로 한 번 실행해 셀렉터·기대값이 아직 맞는지 본다.
- doc_version 을 올리고 last_verified / verified_branch·commit·tag / app_version /
  verified_env 를 갱신하며 변경 이력에 행을 추가한다.
- 기능이 사라졌으면 status 를 폐기로 바꾸고 사유를 이력에 남긴다. 파일은 지우지 않는다.

### 4. 새 기능
template.md 의 템플릿대로 새 파일을 만들고 00_inventory.md 와 03_test_index.md 에 추가한다.

### 5. VERSION.md
docs_version·repo_commit·app_version 을 갱신하고 history 에
"이전 커밋 → 현재 커밋, 영향 기능 목록" 을 한 줄 추가한다.

### 6. 보고
- 버전 범위: 커밋 A→B, 앱 x.y→x.z
- 갱신한 문서 / 새로 만든 문서 / 폐기한 문서
- 확인하지 못한 항목
변경 사실을 추측으로 문서화하지 않는다. 화면 확인을 못 한 기능은 [화면 미확인] 으로 남긴다.
