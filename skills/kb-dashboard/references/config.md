# kb-dashboard 설정

설정 파일은 `<저장소>/.claude/kb-dashboard.json` 하나다. 커밋해서 그 저장소를 쓰는 PC가 함께 쓴다. 스크립트(`<SKILL_DIR>/scripts/kb-dashboard.mjs`)는 이 파일만 믿는다 — 저장소 `CLAUDE.md`의 표를 고쳤으면 이 파일도 함께 고친다.

## 키

| 키 | 필수 | 기본값 | 뜻 |
|---|---|---|---|
| `lang` | 예 | — | 화면 문구 언어. `ko` 또는 `en` |
| `targets` | 예 | — | 탭이 되는 폴더(저장소 루트 기준). **실제로 있는 폴더만** 탭이 된다(PC마다 체크아웃이 달라도 같은 설정을 쓴다). 빈 배열이면 저장소 루트 하나가 대상이다 |
| `types` | 예 | — | 기록 타입 목록. frontmatter `type:` 값이 이 안에 있어야 목록에 오른다. 화면의 「기록」은 이 순서로 묶인다 |
| `title` | 아니오 | 저장소 폴더명 | 페이지 제목 |
| `tipType` | 아니오 | 없음 | `types` 중 「팁」 화면으로 따로 모을 타입. 없으면 팁 화면을 만들지 않는다 |
| `todo.file` | `todo`를 쓰면 예 | — | 대상 폴더 안의 할일 파일 이름 |
| `todo.states` | `todo`를 쓰면 예 | — | 상태어 목록(화면 순서). 줄 형식은 `- [상태] 제목 — 키:값 · 키:값` |
| `todo.done` | 아니오 | 없음 | 끝난 상태어. 이 상태는 접어서 보이고 기한 경과로 치지 않는다 |
| `todo.active` | 아니오 | `states`의 둘째 | 홈 「진행 중」 카드에 올릴 상태어 |
| `todo.dueKey` | 아니오 | 없음 | 기한 필드 이름. 값의 `YYYY-MM-DD`가 오늘보다 앞이면 기한 경과 |
| `todo.archiveDir` | 아니오 | 없음 | 끝난 할일을 옮겨 두는 폴더. 안의 줄은 「보관」으로 접어 보인다 |
| `artifacts.file` | 아니오 | 없음 | 게시 링크를 한 줄씩 적는 파일 이름(대상 폴더 안) |
| `artifacts.outputsDir` | 아니오 | 없음 | 로컬 산출물 폴더. `.md`는 펼쳐 읽고 `.html`은 파일 링크로 건다. 파일명이 `YYYY-MM-DD-주제`면 날짜를 읽는다 |
| `exclude` | 아니오 | `[]` | 훑지 않을 폴더·파일 **이름**(경로가 아니다). `.git`·`.claude`·`node_modules`는 늘 뺀다 |
| `output` | 아니오 | `~/.claude/kb-dashboard/<저장소 폴더명>.html` | 페이지 경로. **저장소 안이면 거부된다** |

`todo`·`artifacts`를 통째로 빼면 그 화면을 만들지 않는다.

## 기록 파일이 갖춰야 할 것
- frontmatter의 `type:`이 `types`에 있어야 한다. `project:`(문자열)·`tags: [a, b]`(한 줄 배열)·`updated: YYYY-MM-DD`는 있으면 쓴다(`updated`가 없으면 파일 수정 시각).
- 제목은 본문의 첫 `# 제목`, 없으면 파일명이다.
- frontmatter가 없거나 `type`이 목록 밖인 `.md`는 화면의 「형식 경고」에 경로만 오른다. 일부러 분류하지 않는 파일이면 `exclude`에 이름을 넣는다.

## 아티팩트 줄 형식
`artifacts.file`의 한 줄이 한 항목이다.

```text
- <제목> — URL:<https 주소> · 용도:<한 줄> · 프로젝트:<이름> · 등록:YYYY-MM-DD
```

- 제목과 필드 사이는 ` — `(em dash 양옆 공백), 필드 사이는 ` · `다. `용도`·`프로젝트`는 생략할 수 있다.
- `lang`이 `en`이면 필드 이름을 `purpose`·`project`·`added`로 쓴다. 읽을 때는 두 표기를 모두 받는다.
- 줄은 `add-artifact` 명령이 쓴다(같은 URL은 두 번 넣지 않고, 파일이 없으면 frontmatter와 함께 만든다).

## 초안 절차
1. 저장소 `CLAUDE.md`(있으면)에서 분류 표·할일 형식·대상 폴더 규칙을 읽고, 루트의 폴더 구조를 2단계까지 본다. 기록 본문은 읽지 않는다.
2. `lang`을 정한다 — 저장소 `CLAUDE.md`의 `dropin-applied` 줄에 `언어=`가 있으면 그 값, 없으면 `~/.claude/CLAUDE.md`의 같은 줄, 둘 다 없으면 지금 대화 언어.
3. 초안을 만든다. 분류 표에 없는 폴더(임시 보관·첨부 등)와 분류하지 않는 파일(`CLAUDE.md`·`README.md` 등)은 `exclude` 후보로 올린다. 표에서 읽지 못한 값은 지어내지 말고 묻는다.
4. 초안 JSON을 보여 주고 확인받는다. 저장소에 팁·아티팩트를 둘 자리가 아직 없으면(분류 표에 타입이 없으면) 그 저장소의 규칙대로 **타입을 먼저 추가해야 한다**고 알린다 — 이 스킬이 저장소 규칙을 고치지는 않는다.
5. 저장한 뒤 `node "<SKILL_DIR>/scripts/kb-dashboard.mjs" check --root "<루트>"`를 돌려 `missingTargets`·`warningList`를 보고한다. 커밋은 사용자 결정이다.

## 예시

대상 폴더가 여럿인 저장소:

```json
{
  "title": "notes",
  "lang": "ko",
  "targets": ["home", "work", "common"],
  "types": ["회의", "프로젝트", "이슈", "절차", "프롬프트", "성과", "참고", "팁"],
  "tipType": "팁",
  "todo": { "file": "할일.md", "states": ["할일", "진행중", "보류", "완료"], "done": "완료", "dueKey": "기한", "archiveDir": "보관" },
  "artifacts": { "file": "아티팩트.md", "outputsDir": "산출물" },
  "exclude": ["임시보관", "CLAUDE.md", "CLAUDE.local.md"],
  "output": null
}
```

최소형(루트가 곧 대상, 할일·아티팩트 없음):

```json
{
  "lang": "en",
  "targets": [],
  "types": ["note", "howto", "tip"],
  "tipType": "tip"
}
```
