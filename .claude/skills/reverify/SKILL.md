---
name: reverify
description: 드롭인 문서 전부(현재 00~06) 전면 재검증 + 신규 문서 후보 조사를 한 번에 실행. 당일 공식 문서 조회로 정정을 반영하고, 확장 후보는 평가만 해서 보고한다(신설은 승인 후).
disable-model-invocation: true
---
# /reverify — 전면 재검증 + 확장 조사 (이 repo 전용)

오늘 날짜 기준으로 아래를 순서대로 수행한다. 원칙: **최신화는 기억이 아니라 당일 공식 문서 조회로만**(DEC-20260720-bsjeong87-02), 확인 못 한 항목은 🟡 유지, 추측 금지.

## 0. 준비
- `git status` 확인 — 미커밋이 있으면 먼저 보고하고 진행 여부를 묻는다.
- `CLAUDE.md` 구성물 표에서 현재 문서 목록·버전 파악(00~ 전부. 문서가 늘었으면 아래 조사 범위에 자동 포함).
- `docs/PROJECT_PLAN.md`의 "다음 재검증" 체크리스트를 읽어 **직전에 남긴 🟡 잔여 항목을 조사 범위에 포함**한다.

## 1. 조사 (백그라운드 에이전트 병렬 — 결과가 모두 도착한 뒤 반영)
각 에이전트에게 "판정([유효/변경됨(무엇이)/확인불가]) + 근거 URL, 추측 금지"를 요구한다:
- **A. 모델·effort·advisor**: 최신 CLI 버전(changelog), `/model` 별칭이 가리키는 실제 모델, 기본 모델, `/effort` 단계·`ultracode`·frontmatter `effort:`, fast mode, advisor(수치·페어링 규칙), 안전 분류기 폴백, 1M 컨텍스트, 서브에이전트 동시/중첩 상한 — 02 §E·§F·§I와 01 §D-6의 서술 대조.
- **B. 권한·샌드박스·hooks·메모리**: deny 동작·우선순위·파라미터 매칭, 샌드박스 지원 OS(네이티브 Windows 여부)·credentials, `attribution`, auto-memory 한도, auto mode 요건, hooks 스키마, 스킬·rules·에이전트 frontmatter, `/code-review`(ultra), `.mcp.json` — 01 §D-3·§J·§J-1과 04 §1의 서술 대조.
- **C. 외부 소스 생존 + 중복 판정 재심**: 03의 소스(claude-hud·anthropics/skills·Chrome 확장·부록 플러그인), 04의 소스(claude-code-action 메이저·gh/glab 설치 명령), 05·06의 근거(outputStyle 키·frontmatter, routines preview→GA·`/schedule`·요금제), 00 §B raw URL 전부(HTTP 상태 코드), 글로벌 `~/.claude/commands/skill-setup.md` 카탈로그의 외부 URL 생존. **생존만이 아니라 정본 판정 유효성까지**: "중복이라 넘긴" 것(내장 statusline vs claude-hud, Superpowers·Claude Mem vs 우리 정본 등)을 내장 기능이 흡수·역전했는지 재판정(DEC-20260810-bsjeong87-02 방식).
- **D. 신규 후보 조사**: 직전 재검증 이후 changelog/whats-new의 새 기능 전부 + "기존 문서가 안 다루는 것" 중 드롭인 후보 평가 — 기준: ① 구성 파일을 생성하는가 ② 내장·기존 문서와 중복인가(중복이면 정본 지정·부록 강등) ③ 회사 업무 고려(정책 게이트 필요 여부) ④ 요금제 제약. (DEC-20260728-bsjeong87-01·DEC-20260804-bsjeong87-03의 판정 방식)

## 2. 반영 (조사 A~C 결과)
- **정정·갱신**: 변경된 서술만 해당 문서에 수술적으로 고친다(범위 외 손대지 않음). 각 문서 버전 표에 한 줄 + 버전 bump.
- **날짜 규칙**(DEC-20260804-bsjeong87-02): "최종 갱신"은 편집한 문서만, **"최근 재검증"은 전면 재검증한 오늘 날짜로 전 문서 갱신**(내용 변경이 없어도 — 그게 이 표기의 목적). "기준: Claude Code v" 버전도 최신으로.
- 적용 기록 표기는 자기 참조("최상단 문서 버전에서 읽음", DEC-20260810-bsjeong87-07)라 동기화 불요 — 대신 **하드코딩된 버전 인용이 새로 생겼는지** 점검하고 있으면 자기 참조로 교체.
- `CLAUDE.md` 구성물 표 버전 동기화. **문서 목록이 바뀌었을 때만** README·index.html·`pages/` 전부(현재 demo·intro·options·learn) 동기화(DEC-20260723-bsjeong87-04).

## 3. 확장 후보 보고 (조사 D 결과 — 신설은 하지 않는다)
후보별 표(무엇/요금제/구성 생성형 여부/중복 판정/추천 순위)로 **보고만** 하고 사용자 선택을 기다린다. 승인되면 그때: 후보별 스펙 확정 조사(전용 에이전트) → 문서 작성(03·04와 같은 형식: 감지/설치/검증/제거 + 회사 게이트 + dropin-applied) → 00 §B·§C, CLAUDE.md, README·index.html·`pages/` 동기화 → Phase 4 재검증 목록에 신규 항목 추가.

## 4. 기록·마무리
- PROGRESS 최상단 append(정정/유효/후보 요약), 새 결정은 DEC(날짜+작성자 발번), PROJECT_PLAN 갱신.
- PROJECT_PLAN의 **"다음 재검증" 예정일을 다음 주기(+6개월)로 갱신**하고 🟡 체크리스트를 잔여 항목으로 재작성한다(다음 /reverify §0이 읽는다 — /resume 예정일 안내에도 걸린다).
- 커밋·푸시(이 repo는 상시 허용) 후 **증거로 보고**: 정정 N건(무엇), 유효 확인 목록, raw URL 상태 코드, 커밋 해시, 확장 후보 표.
