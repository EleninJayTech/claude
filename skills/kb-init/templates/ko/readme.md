# {{TITLE}}

Claude Code로 쓰는 지식 베이스다.

정보를 던지면 Claude가 분류해 저장하고, 물으면 찾아 답한다.
사람이 직접 파일을 열어 읽는 것을 전제하지 않는다 — **질문해서 답을 받는 방식**이다.

> **규칙 정본은 `CLAUDE.md`다.** 분류 체계·기록 절차·검색 절차는 전부 거기 있고,
> Claude가 세션 시작 시 자동으로 읽는 것도 그 파일이다. 이 README는 사람용 안내다.

## 쓰는 법

이 폴더에서 `claude`를 실행하고 아래를 쓴다.

| 명령 | 무엇 |
| --- | --- |
| `{{CMD_LOG}} <내용>` | 던진 내용을 분류해 저장 |
| `{{CMD_FIND}} <질문>` | 저장된 기록에서 찾아 답변 |
<!--if:todo-->
| `{{CMD_TODO}}` | 할일 조회·추가·상태 변경 |
<!--endif-->
| `{{CMD_REPORT}} <주제>` | 관련 기록을 모아 md·html 산출물 생성 |
| `{{CMD_DASH}}` | 기록 전체를 로컬 HTML 한 장으로 보기(단디 `kb-dashboard` 스킬이 깔려 있을 때) |

명령 없이 그냥 말해도 된다. "이거 기록해줘", "그거 어떻게 하더라" 같은 식이다.

## 폴더

| 경로 | 무엇 |
| --- | --- |
| `CLAUDE.md` | **규칙 정본** — 분류 체계, 기록·검색 절차, 문서 작성 원칙 |
| `.claude/skills/` | 위 명령의 실물 |
| `.claude/kb-dashboard.json` | 대시보드 설정 — 분류 표를 고치면 함께 고친다 |

기록 폴더({{P_LABEL}})의 구조:

```text
{{FOLDER_TREE}}
```

<!--if:many-->
## 여러 PC에서 쓰기

PC마다 한쪽 기록만 두려면 sparse-checkout으로 받는다.

```bash
git clone --filter=blob:none --sparse <원격 주소>
cd <폴더>
{{SPARSE_LINES}}
```

루트 **파일**(`README.md`·`CLAUDE.md`·`.gitignore`)은 위 설정과 무관하게 항상 받는다.
**`.claude/`를 빼면 명령이 내려오지 않아 아무 말 없이 동작하지 않는다.**
전체를 받으려면 `git sparse-checkout disable`을 쓴다.

<!--endif-->
## PC 고유 설정

경로·계정·도구명처럼 PC마다 다른 값은 `CLAUDE.local.md`에 둔다. 이 파일은 커밋되지 않는다.
`CLAUDE.local.md.example`을 같은 폴더에 `CLAUDE.local.md`로 복사해 채운다.

> **비밀번호·토큰은 `CLAUDE.local.md`에도 쓰지 않는다.** 어디서 관리하는지만 남긴다.
