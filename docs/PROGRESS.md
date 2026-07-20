# PROGRESS (최상단 append)

- [docs][Done] 공식 문서 전면 재검증·최신화 — 마스터 v1.2→v1.3, 플레이북·WAVE·따라하기 v1.1→v1.2 (md 3종+html 4종 동기화). 주요 정정: 샌드박스 macOS·Linux·WSL2 지원(네이티브 Windows만 미지원), 내장 Explore=메인 모델 상속, opusplan×availableModels(v2.1.205+), frontmatter `effort:` 키 확정(🟡 2건 해소), advisor 수치 출처 확정, API 기본 1M 컨텍스트, theme 키 예시 제거. 커밋 55d0ae6·c7e4fe6 — @bsjeong87 (main) 2026-07-20
- [backup][Done] 글로벌 ~/.claude 구성 백업 `global-config/` 추가 — CLAUDE.md·settings.json·skills(resume/wrap/humanizer)·commands 화이트리스트 4종만. 시크릿(.credentials.json)·대화기록(history.jsonl, projects/) 제외. 커밋 2215127 — @bsjeong87 (main) 2026-07-20
- [repo][Done] .gitignore 신설(개인 .claude 설정 커밋 방지) + 잘못 커밋된 tmp 파일 제거 — @bsjeong87 (main) 2026-07-20
