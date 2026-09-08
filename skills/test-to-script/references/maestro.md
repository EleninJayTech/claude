# Maestro 변환 규칙

## 구성
- `tests/maestro/config.yaml` 에 `appId` (PROJECT.md 의 패키지명 / 번들 ID).
- 로그인 등 공통 전제는 `tests/maestro/flows/login.yaml` 로 두고 `runFlow` 로 호출한다.
- 계정은 `${TEST_USER_ID}` 처럼 환경변수 참조. `maestro test -e TEST_USER_ID=... ` 로 주입.

## 단계 → 명령 매핑
| 문서 단계 | Maestro |
|---|---|
| 앱 실행 / 화면 이동 | `launchApp` / `tapOn` 으로 메뉴 이동 |
| `id` 에 `값` 입력 | `tapOn: { id: "x" }` 후 `inputText: "값"` |
| `id` 클릭 | `tapOn: { id: "x" }` |
| 기대: 텍스트 표시 | `assertVisible: "텍스트"` 또는 `assertVisible: { id: "x" }` |
| 기대: 화면 전환 | 전환 후 화면 고유 요소에 `assertVisible` |
| 기대: 요소 없음 | `assertNotVisible` |
| 정리 | 끝에서 되돌리는 tap 시퀀스, 또는 `clearState` 후 재실행 |

## 형식
```yaml
# TC-F003-01 정상 로그인 (F-003)
appId: ${APP_ID}
---
- launchApp:
    clearState: true
# 전제: 없음
- tapOn:
    id: "login_id"
- inputText: ${TEST_USER_ID}
- tapOn:
    id: "login_pw"
- inputText: ${TEST_USER_PW}
- tapOn:
    id: "login_submit"
# 기대
- assertVisible:
    id: "dashboard_title"
# 정리: 없음
```
- 파일 하나에 TC 하나. 파일 상단 주석에 TC ID 와 F-id 를 반드시 적는다.
- Android 의 `resource-id` 는 `패키지명:id/이름` 전체가 아니라 `id: "이름"` 만 써도 매칭된다.
- iOS 는 `accessibilityIdentifier` 를 `id` 로 매칭한다. 문서 셀렉터가 accessibility id 가
  아니면 부여를 제안한다 (SKILL.md 2단계).
