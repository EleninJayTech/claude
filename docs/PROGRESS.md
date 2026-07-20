# PROGRESS (최상단 append)

- [docs][Done] 02 진단의 경량 보완(A안) 반영 — 00 v1.3→**v1.4**(F-1 검증 기준 규칙·`/init`·`.mcp.json` 공유목록·§G plan mode·`/clear`·교정 2회 룰), 01 v1.2→**v1.3**(`isolation: worktree`·`claude --worktree` 병렬, `claude -p` 팬아웃 대안, reviewer 지적 범위 제한). md+html 동기화, 상세는 02 가이드가 담당(00·01은 얇게 유지) — @bsjeong87 (main) 2026-07-20

- [docs][Done] `02_진단-확장활용-가이드.html` 신설 — 00·01 공백 진단(검증 루프·plan mode·컨텍스트 관리·worktree 병렬·헤드리스 팬아웃·MCP 부재) + 확장 활용 가이드(신입 3주 로드맵 포함). 근거: code.claude.com/docs best-practices·common-workflows·worktrees·headless·mcp 당일 검증. 00·01 HTML 내비게이션에 02 링크 추가 — @bsjeong87 (main) 2026-07-20

- [docs][Done] 문서 슬림화 — `00_01_99_통합_따라하기.html`·`99_WAVE전용*`(md+html) 삭제, 00·01 HTML 내비게이션에서 99 링크 제거. 이 repo의 초점은 **범용 통합구성(00) + 모델분담(01)** 으로 확정. 삭제본은 git 히스토리(62d5abe 이전)에서 복구 가능 — @bsjeong87 (main) 2026-07-20

- [docs][Done] 공식 문서 전면 재검증·최신화 — 마스터 v1.2→v1.3, 플레이북·WAVE·따라하기 v1.1→v1.2 (md 3종+html 4종 동기화). 주요 정정: 샌드박스 macOS·Linux·WSL2 지원(네이티브 Windows만 미지원), 내장 Explore=메인 모델 상속, opusplan×availableModels(v2.1.205+), frontmatter `effort:` 키 확정(🟡 2건 해소), advisor 수치 출처 확정, API 기본 1M 컨텍스트, theme 키 예시 제거. 커밋 55d0ae6·c7e4fe6 — @bsjeong87 (main) 2026-07-20
- [backup][Done] 글로벌 ~/.claude 구성 백업 `global-config/` 추가 — CLAUDE.md·settings.json·skills(resume/wrap/humanizer)·commands 화이트리스트 4종만. 시크릿(.credentials.json)·대화기록(history.jsonl, projects/) 제외. 커밋 2215127 — @bsjeong87 (main) 2026-07-20
- [repo][Done] .gitignore 신설(개인 .claude 설정 커밋 방지) + 잘못 커밋된 tmp 파일 제거 — @bsjeong87 (main) 2026-07-20
