# 테스트 리포트 형식

```markdown
# 테스트 리포트 YYYY-MM-DD

| 항목 | 값 |
|---|---|
| 실행 일시 | YYYY-MM-DD HH:MM |
| 브랜치 / 커밋 / 태그 | main / abc1234 / v1.2.0 |
| 앱 버전 | web 1.2.0 / android 1.2.0(45) |
| docs_version | 3.2 |
| 환경 | Chrome 128 / Pixel 8 API 34 / 로컬 |
| 범위 | 전체 또는 인수 |

## 요약
전체 N / 통과 N / 실패 N / 제외 N / 차단 N

## 실패
| TC ID | 기능 | 문서 verified_commit | 판정 | 근거 | 증거 |
|---|---|---|---|---|---|
| TC-F003-02 | F-003 로그인 | 9f1e2d3 | (A) | 잘못된 비밀번호에 오류 메시지 없음, `LoginController.java:88` 분기 누락 | screenshots/2026-09-08_TC-F003-02.png |

## 차단됨
| TC ID | 차단 원인 TC |
|---|---|

## 제외
[실행 미검증] 케이스 목록

## 이전 리포트 대비
이전(커밋 X, 앱 x.y, YYYY-MM-DD) → 이번(커밋 Y, 앱 x.z)
- 새로 실패:
- 새로 통과:
- 계속 실패:

## 문서 노후 의심 (실행 전 표시)
| 기능 | verified_commit | HEAD 와의 커밋 차이 |
|---|---|---|

## 후속 조치 제안
- (A) 항목: 수정 필요 — 사용자 지시 대기
- (B) 항목: 승인 시 `/feature-docs sync` 로 문서 갱신
- (C) 항목: 환경 복구 후 `/feature-test <TC-id>` 재실행
```

채팅에는 "요약" 과 "실패" 표, "후속 조치 제안" 만 출력한다.
