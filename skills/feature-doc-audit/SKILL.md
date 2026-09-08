---
name: feature-doc-audit
description: docs/features/ 기능 문서의 상태를 테스트 실행 없이 점검한다 — HEAD 보다 뒤처진 문서, 미확인 항목이 남은 문서, 인벤토리와 파일의 불일치, 존재하지 않는 코드 참조, 테스트 인덱스 누락을 표로 뽑고 어느 기능부터 /feature-docs sync 해야 할지 우선순위를 제안한다. 사용자가 문서 상태 점검, 문서 노후 확인, 문서 감사, 어떤 문서가 오래됐는지, sync 대상 확인을 언급하면 반드시 이 스킬을 쓴다. 가볍기 때문에 주기 실행에 적합하다.
argument-hint: "[뒤처짐 기준 커밋 수, 기본 5]"
allowed-tools: Bash(python *) Bash(python3 *) Bash(git rev-parse *) Bash(git rev-list *) Bash(git log *)
---

# feature-doc-audit

`docs/features/` 가 없으면 "먼저 `/feature-docs init` 을 실행하라" 고 안내하고 중단한다.

## 실행

1. 프로젝트 루트에서 점검 스크립트를 실행한다. Windows 에서 `python3` 가 없으면 `python`.
   ```
   python ${CLAUDE_SKILL_DIR}/scripts/audit.py --threshold $ARGUMENTS
   ```
   인수가 없으면 `--threshold 5`. 스크립트는 JSON 을 출력한다.
2. 출력을 읽고 아래 표로 정리해 채팅에 보여준다. 스크립트가 실패하면 원인을 보고하고
   같은 항목을 직접 확인한다 (frontmatter 파싱, `git rev-list --count 커밋..HEAD`, 경로 존재 여부).

## 점검 항목 (스크립트가 계산)

| 항목 | 기준 |
|---|---|
| 뒤처진 문서 | `verified_commit` 이 HEAD 보다 threshold 커밋 이상 뒤 |
| 미확인 잔존 | status 가 확인됨/폐기가 아니거나 본문에 `[미확인]` `[화면 미확인]` `[출처 불명]` 이 남음 |
| 인벤토리 불일치 | 00_inventory.md 에 있는데 파일이 없음 / 파일이 있는데 인벤토리에 없음 |
| 깨진 코드 참조 | "코드 참조" 절의 `경로:라인` 중 파일이 없는 것 |
| 테스트 인덱스 누락 | 문서의 TC-id 가 03_test_index.md 에 없거나 그 반대 |
| 앱 버전 불일치 | 문서 `app_version` 이 VERSION.md 의 app_version 과 다름 |

## 보고 형식

```
## 문서 상태 (HEAD abc1234, docs_version 3.2)
기능 문서 N개 · 확인됨 N · 미확인 잔존 N · 뒤처짐 N · 깨진 참조 N

### sync 우선순위
| 순위 | 기능 | 사유 | 뒤처진 커밋 수 |
(뒤처짐 × 해당 구간 커밋이 건드린 파일 수 로 정렬. 코드 참조가 실제로 바뀐 기능이 먼저)

### 인벤토리 / 테스트 인덱스 불일치
### 깨진 코드 참조
### 미확인 잔존
```

## 하지 않는 것
- 문서를 고치지 않는다. 결과만 보고하고, 사용자가 원하면 `/feature-docs sync F-id` 를 안내한다.
- 테스트를 실행하지 않는다. 실행은 `/feature-test`.
- 리포트 파일을 만들지 않는다. 채팅 출력만. (기록이 필요하면 사용자가 요청할 때
  `docs/features/audit_reports/YYYY-MM-DD.md` 에 저장)
