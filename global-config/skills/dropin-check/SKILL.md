---
name: dropin-check
description: 드롭인 구성 최신성 점검(읽기 전용). 대상 프로젝트의 dropin-applied 기록과 글로벌 ~/.claude 구성을 문서 저장소(EleninJayTech/claude)의 현재 버전과 대조해 차이만 보고한다. 설치·수정 없음 — 문서 사본 최신화는 /dropin-update, 재적용은 00 문서가 담당.
---

# /dropin-check — 드롭인 구성 최신성 점검 (읽기 전용)

**변경 금지**: 이 스킬은 점검·보고만 한다. 문서 사본 갱신은 `/dropin-update`, 재적용은 00_통합-설치.md("학습해서 적용해줘"),
글로벌 복원은 `global-config/` 복사(DEC-20260721-bsjeong87-01).

## 1) 기준 확보 — 문서 저장소의 현재 버전
- 로컬 클론 탐색: 기본 후보 `D:\claude`(remote가 `EleninJayTech/claude`인지 확인). 없으면 사용자에게 경로를 묻고,
  그것도 없으면 GitHub API(`https://api.github.com/repos/EleninJayTech/claude/contents/`)에서 파일 목록·download_url을 얻어 원격 조회(한글 파일명 인코딩 회피).
- 로컬 클론이면 점검 전 `git pull --ff-only`(clean일 때)로 기준을 최신화.
- 각 드롭인 문서(`NN_*.md` 전부, 현재 00~06)의 **최상단 헤더만** 읽어 `문서 버전: vX.Y` 추출(전체 Read 금지 — 앞 5줄이면 충분).

## 2) 적용 기록 점검 — 대상 프로젝트
- 대상(현재 PWD 프로젝트)의 `CLAUDE.md`(루트 또는 `.claude/`) 맨 아래 `<!-- dropin-applied: ... -->` 줄 파싱: 적용일·모드·프로필·문서별 버전·미선택.
- 글로벌만 적용한 PC면 `~/.claude/CLAUDE.md`도 확인.
- 기록이 없으면: "적용 기록 없음(미적용이거나 2026-08-04(기록 도입) 이전 적용)"으로 보고하고 문서 비교는 생략.

## 3) 글로벌 구성 대조 — 화이트리스트 4종
- `~/.claude`의 `CLAUDE.md`·`settings.json`·`skills/`·`commands/`를 저장소 `global-config/`와 파일 단위 대조(없음/내용 다름).
- `settings.json`은 머신 종속 키(model·theme·enabledPlugins·statusLine·effortLevel 등)가 달라도 정상(DEC-20260721-bsjeong87-02) —
  **구성 성격 키(permissions.deny·hooks)의 차이만** 보고.
- 어느 쪽이 최신인지 단정하지 말 것 — 백업 규칙상 원본(`~/.claude`) 수정이 백업에 자동 반영되지 않으므로, 차이의 방향(로컬이 구버전 / 백업이 구버전)을 파일 내용으로 판단해 명시.
- **중복 등록 감지**: `commands/<이름>.md`와 `skills/<이름>/`이 같은 이름이면 "구형 잔재 — `/` 자동완성 2개·구형 내용 실행 위험, commands 쪽 삭제 권고"로 보고(정본은 skills, DEC-20260810-bsjeong87-04). 프로젝트 `.claude/commands/`↔`.claude/skills/`도 동일 점검.

## 4) 보고 (표 + 증거, 변경 없음)
- 문서별: `적용 vX.Y → 현재 vX.Z` + 차이 한 줄(현재 문서 버전 표의 해당 행 인용). 미선택 문서·부분 적용 괄호 메모·"사용자 조치 대기" 항목도 표시.
- 글로벌: 항목별 일치/차이 목록(예: `skills/resume` 내용 다름 — 백업엔 pull-first 있음, 로컬은 구버전).
- 마지막 줄 권고: 문서 차이 → "로컬 문서 사본이 구버전이면 `/dropin-update`로 먼저 갱신 → 00 문서 재적용(재적용 분기가 버전 diff를 안내)" / 글로벌 차이 → "`global-config/`에서 해당 파일 복사" / 전부 일치 → "최신 — 조치 불요".
