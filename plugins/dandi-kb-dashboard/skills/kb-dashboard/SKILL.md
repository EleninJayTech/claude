---
name: kb-dashboard
description: 마크다운 지식 베이스(frontmatter로 분류한 기록 저장소)의 할일·아티팩트 링크·팁·기록을 로컬 HTML 대시보드 한 장으로 만들어 보여 준다 — 대시보드, 기록 한눈에 보기, 할일 현황 화면, 게시한 아티팩트 링크 기록을 말할 때 쓴다. 보기 전용이고 페이지는 저장소 밖에 만든다.
argument-hint: "[없음 | 아티팩트 <URL> <제목> | 설정 | 점검]"
disable-model-invocation: true
---

# /dandi-kb-dashboard:kb-dashboard — 지식 베이스 로컬 대시보드

기록이 파일로 흩어져 있어 물어봐야만 확인되는 저장소를, 브라우저로 여는 **로컬 HTML 한 장**으로 모아 본다. 생성은 동봉 스크립트가 하고(결과가 매번 같고 토큰을 쓰지 않는다) 이 스킬은 설정·기록·보고만 맡는다.

스킬 폴더는 `${CLAUDE_SKILL_DIR}`이다. 스크립트는 `${CLAUDE_SKILL_DIR}/scripts/kb-dashboard.mjs`, 설정 안내는 `references/config.md`다.

## 지키는 것
- **보기 전용이다.** 페이지에서 고칠 수 없고, 스크립트가 저장소에 쓰는 것은 `아티팩트` 인수의 한 줄뿐이다.
- **페이지는 저장소 밖에 만든다**(기본 `~/.claude/kb-dashboard/<저장소 폴더명>.html`). 기록 본문 사본이 git으로 돌지 않게 하려는 것이라, 저장소 안 경로는 스크립트가 거부한다.
- **만든 페이지를 Artifact로 게시하거나 외부 서비스에 올리지 않는다** — 회사 기록이 섞인 저장소일 수 있다. 사용자가 게시를 요청하면 본문 전체가 밖으로 나간다는 점을 먼저 알리고 확인받는다.
- 저장소 규칙(대상 폴더·타입·할일 상태어·화면 언어)은 `<저장소>/.claude/kb-dashboard.json`만 따른다. 스크립트는 `CLAUDE.md`를 읽지 않는다.
- 시크릿이 든 폴더·파일이 대상 폴더 안에 있으면 설정의 `exclude`에 넣는다. `.env`·키·인증서는 읽지 않는다.
- Node.js 18 이상이 필요하다. `node --version`이 안 되면 멈추고 그 사실만 알린다(대신 손으로 HTML을 쓰지 않는다).

## 0. 준비 (모든 인수 공통)
1. 저장소 루트를 정한다 — git이면 `git rev-parse --show-toplevel`, 아니면 현재 폴더. 다른 폴더 세션에서 불렸고 지식 베이스가 어디인지 모르면 묻는다.
2. `<루트>/.claude/kb-dashboard.json`이 없으면 **「설정」 절차부터** 한다(인수와 무관).
3. 설정 파일도 없고 분류 규칙도 없는 폴더(루트 `CLAUDE.md`가 없거나 그 안에 분류 표가 없다)면 지식 베이스가 아직 없는 것이다 — `/dandi-kb-dashboard:kb-init`으로 먼저 만들 수 있다고 한 줄로 알리고 멈춘다. 이 스킬이 대신 폴더·규칙을 만들지 않는다.

## 인수별 절차

### 없음 — 페이지 만들고 열기
```
node "${CLAUDE_SKILL_DIR}/scripts/kb-dashboard.mjs" build --root "<루트>" --open
```
출력 한 줄(`OK <경로> records=… todos=… artifacts=… outputs=… tips=… warnings=…`)을 그대로 보고한다. `warnings`가 0이 아니면 `점검`으로 무엇인지 볼 수 있다고 한 줄 덧붙인다. 브라우저가 열리지 않는 환경이면 경로만 알린다.

### `아티팩트 <URL> <제목>` — 게시한 아티팩트 링크 한 줄 기록
1. 설정의 `targets`가 여럿이면 **어느 대상에 남길지 묻는다**(추측하지 않는다 — 저장소 `CLAUDE.md`가 대상을 정하는 규칙을 갖고 있으면 그것을 따른다).
2. 용도·프로젝트는 대화에서 분명하면 넣고, 아니면 생략한다(지어내지 않는다).
3. 실행:
   ```
   node "${CLAUDE_SKILL_DIR}/scripts/kb-dashboard.mjs" add-artifact --root "<루트>" --target "<대상>" --url "<URL>" --title "<제목>" [--purpose "<용도>"] [--project "<프로젝트>"]
   ```
   `targets`가 빈 배열인 저장소는 `--target`을 빼고 부른다.
4. `OK <파일>`(추가) 또는 `EXISTS <파일>`(같은 URL이 이미 있음)을 한 줄로 보고한다. **커밋하지 않는다** — 커밋은 그 저장소의 규칙과 사용자 결정에 맡긴다.

URL은 `https://`만 받는다. 줄 형식은 `references/config.md` 「아티팩트 줄 형식」이 정본이다 — 손으로 줄을 쓰지 말고 이 명령을 쓴다.

### `설정` — 설정 파일 만들기·고치기
`references/config.md`의 「초안 절차」를 따른다. 요지: 저장소 `CLAUDE.md`와 폴더 구조를 읽어 초안을 만들고 → 사용자에게 보여 확인받고 → 저장한 뒤 `check`로 검증한다. 확인 없이 저장하지 않는다.

### `점검` — 설정과 기록 형식 확인
```
node "${CLAUDE_SKILL_DIR}/scripts/kb-dashboard.mjs" check --root "<루트>"
```
JSON을 대상별 표(기록·할일·아티팩트·산출물·팁·경고 수)로 보고하고, `warningList`와 `missingTargets`가 있으면 경로와 사유를 함께 적는다. 경고는 고치지 않는다 — 기록을 고칠지는 사용자가 정한다.

## 오류일 때
스크립트는 설정·인수 오류면 종료 코드 2와 함께 사유 한 줄을 낸다. 그 줄을 그대로 전하고, 설정 문제면 `설정` 절차를 제안한다. 스크립트를 고쳐 쓰지 않는다.
