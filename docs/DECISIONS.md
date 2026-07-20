# DECISIONS (append 전용 · id = DEC-날짜-작성자-번호)

- **DEC-20260720-bsjeong87-01** — md 파일 3종 유지(삭제 안 함). HTML은 사람용, md는 Claude 학습용 드롭인 — 역할이 다름. 중복은 감수.
- **DEC-20260720-bsjeong87-02** — 문서 최신화는 기억이 아니라 **당일 공식 문서(code.claude.com/docs) 조회 검증**으로만 반영. 확인 못 한 항목은 🟡로 남김(§L 원칙).
- **DEC-20260720-bsjeong87-03** — `theme` 키를 settings.json 예시에서 제거(문서화 키 아님 확인). 테마는 `/config`로 안내. 개인 설정에 남아 있는 건 무방.
- **DEC-20260720-bsjeong87-04** — 글로벌 .claude 백업은 **화이트리스트 방식**(CLAUDE.md·settings.json·skills·commands만). 통째 커밋 금지 — .credentials.json·대화기록 유출 위험.
