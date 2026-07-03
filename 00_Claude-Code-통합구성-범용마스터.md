# Claude Code 통합 구성 — 범용 마스터 (드롭인 적용)

> **문서 버전: v1.1** · 최종 갱신: **2026-07-03** · 기준: Claude Code v2.1.x (Opus 4.8 · Sonnet 5 · Fable 5)
>
> | 버전 | 날짜 | 변경 내용 |
> | --- | --- | --- |
> | v1.0 | 2026-07-03 | 8개 소스 통합 초판 (setup-followalong v8 반영) |
> | v1.1 | 2026-07-03 | 공식 문서 재검증: deny 파일명령 감지(v2.0.22+) 반영, `includeCoAuthoredBy`→`attribution` 교체, PowerShell deny 패턴(`type`/`Get-Content`/`gc`) 추가, Windows sandbox 미지원 명시, deny→ask→allow 우선순위 명시 |
>
> ※ 갱신 시: 이 표에 한 줄 추가 + 하단 "문서 정보" 날짜 수정 + §L 재검증 체크리스트 수행.

> **사용법**: 이 파일을 아무 프로젝트 루트(또는 `docs/`)에 넣고 Claude에게
> **"이 문서를 학습해서 이 프로젝트에 적용해줘"** 라고 하면 된다.
> Claude는 ① 환경(단일/통합/MSA)을 스스로 판별 → ② 모르는 것만 질문 → ③ 이 프로젝트에 맞는 구성만 골라 생성 → ④ 동작 확인 한다.
>
> **정직한 고지**: Claude Code는 자주 바뀐다. 이 문서는 완벽하지 않으며, 🔴🟡 표시·보안 설정은 본인 환경/공식 문서로 검증한다. (§L 재검증)

---

## 0. 이 문서가 하는 일
- **무엇**: Claude Code를 (1인 단일 repo ~ 다중 repo 통합 ~ 여러 팀원 MSA)까지 **환경에 맞게** 세팅하고, 세션 기록(PROGRESS/DECISIONS/PROJECT_PLAN)을 자동 관리하게 한다.
- **왜**: 프로젝트마다 repo 수·팀 규모·동시성이 다르므로 고정 템플릿이 아니라 **판별 + 필요한 부분만** 적용한다.
- **결과**: 글로벌 셋업(PC당 1회) + 프로젝트 셋업(환경별) + `/resume`·`/wrap` 루틴이 동작.

---

## A. Claude 실행 프로토콜 (적용하면 이 순서대로)

**STEP 1 — 환경 자동 판별.** 코드/폴더로 아래를 확인해 §B의 유형(B / A-1 / A-2 / +MSA)을 정한다.
- 현재 루트 아래 **독립 git repo가 몇 개**인가(각 폴더의 `.git` 유무)?
- 상위 폴더가 git인가? 하위 repo들이 한 폴더 아래 모여 있나, 흩어져 있나?
- 빌드/스택 감지(`package.json`·`pom.xml`·`build.gradle`·`composer.json`·`go.mod`·`Cargo.toml`…).
- 기존 `CLAUDE.md`·`docs/`·`.claude/` 유무, git 브랜치·미커밋.

**STEP 2 — 부족분 질문(모르는 것만, §I).** 특히: (a) 환경 유형 확정, (b) **여러 팀원이 같은 단위를 동시 편집**하는가(→ MSA 단위분할 필요 판단), (c) 커밋 양식, (d) 자주 함께 고치는 repo(→ `additionalDirectories`). 이미 코드로 안 것은 "이렇게 이해했다"로 확인만.

**STEP 3 — 필요한 구성만 생성.** §D(글로벌, 없으면) + §E(환경별 프로젝트 셋업) + §F(SSOT 블록)에서 **해당 시나리오 부분만** 골라 파일 생성. 불필요한 것(단일 repo에 MSA 단위분할 등)은 만들지 않는다.

**STEP 4 — 확인.** 무엇을 만들었는지 요약 보고 → `/` 자동완성으로 `/resume`·`/wrap` 확인 → 승인 후 커밋 안내(§E 커밋 규칙).

> 원칙: **승인 없이 대량 변경·커밋하지 않는다.** 시크릿(.env·키·인증서)은 읽지도 커밋하지도 않는다.

---

## B. 내 환경은? (판별표)

| 유형 | 언제 | 프로젝트 셋업 |
| --- | --- | --- |
| **🅱️ 단일 repo (B)** | 독립 repo 1개 | §E-1 |
| **🅰️ 통합 A-1** | 여러 repo가 **한 상위 폴더 아래** 나란히 | §E-2 + §E-4(루트 레이어) |
| **🅰️ 통합 A-2** | 여러 repo가 **흩어져** 있음 | §E-2 + §E-4 (단 `--add-dir` 필요) |
| **➕ MSA 단위분할** | 위에 더해 **여러 팀원이 한 repo의 같은 단위를 동시 편집** | §E-3 를 각 repo에 추가 적용 |

> MSA 단위분할은 **동시성 대응**이지 repo 수 문제가 아니다. 1인/저동시성이면 flat docs로 충분(단위분할 불필요).

---

## C. 불변 원칙 (모든 환경 공통) 🟢
1. **2층 모델** — repo *간*(cross-repo, `additionalDirectories`, 방법 A) 과 repo *안*(단위 분할) 은 별개 층. 독립 적용.
2. **폴더 분할 = 정책 / `merge=union` = 충돌 안전망** — 폴더로 쪼개도 같은 파일에 몰리면 충돌은 그대로다. 분할은 정리·타겟팅용, 동시 append 충돌은 `merge=union`이 자동 병합.
3. **토큰 진실** — `docs/`는 자동 선로딩 안 됨(필요 시만 읽힘). "구조로 토큰 절감"은 사실 아님. 분할 기준은 정리·타겟 정확도.
4. **방법 A** — 한 작업이 여러 대상(repo/단위)을 건드리면 **각 대상에 기록**(주 대상 본문 + 나머지 `[공통]` 교차 한 줄 + 링크).
5. **git-status 우선 재개(v8)** — `/resume`는 커밋 히스토리 전에 **미커밋 변경·현재 브랜치**로 "진행 중 작업"을 먼저 발견한다. 미커밋을 방치하면 다음 세션이 놓친다 → `/wrap` 후 커밋 습관화.
6. **커밋은 repo별로 따로**(독립 git). 루트 개인 레이어는 개인 소유, 팀 repo는 공유.
7. **시크릿 분리가 근본** — Read/Edit deny 규칙은 이제 파일 도구뿐 아니라 Bash 안의 "인식되는 파일 명령"(`cat`·`head` 등)에도 적용된다(v2.0.22+). 그러나 **임의의 서브프로세스**(python/node 스크립트가 파일을 직접 여는 경우)는 못 막는다(부분 안전망). 진짜 비밀은 레포에 두지 않는다.

---

## D. 글로벌 셋업 (PC당 1회) — 전 환경 공통

### D-1. 폴더
```powershell
cd C:/Users/<내계정>
New-Item -ItemType Directory -Path .claude/skills/resume -Force
New-Item -ItemType Directory -Path .claude/skills/wrap -Force
```

### D-2. 글로벌 `CLAUDE.md` (행동 규칙) — `C:/Users/<내계정>/.claude/CLAUDE.md`
```markdown
# CLAUDE.md (Global)
## 1. Think Before Coding — 가정 명시, 불확실하면 질문, 해석 갈리면 제시.
## 2. Simplicity First — 요청 이상 금지, 1회용 코드 추상화 금지.
## 3. Surgical Changes — 범위 외 코드 손대지 않기, 기존 스타일 따르기.
## 4. Goal-Driven Execution — 수정 전 검증 기준 먼저, 다단계는 짧은 계획.
## 5. Output Style — 간결하게, 전체 파일 재출력 금지(변경분만).
## 6. File Reference — 파일은 @경로/파일명으로 참조.
## 7. Compaction Priority — 압축 시 보존: 수정 파일·대기 작업·최근 결정·미해결.
## 8. Secret Safety — .env·키·인증서 읽거나 cat 금지, 시크릿은 환경변수로.
```

### D-3. 글로벌 `settings.json` (deny + hooks) — `C:/Users/<내계정>/.claude/settings.json`
```json
{
  "theme": "dark",
  "autoMemoryEnabled": true,
  "attribution": { "commit": "", "pr": "" },
  "permissions": {
    "deny": [
      "Read(**/.env)", "Read(**/.env.*)", "Read(**/*.pem)", "Read(**/*.key)", "Read(**/*.p12)",
      "Bash(cat *.env)", "Bash(cat *.env.*)", "Bash(cat *.pem)", "Bash(cat *.key)",
      "Bash(type *.env*)", "Bash(Get-Content *.env*)", "Bash(gc *.env*)",
      "Read(**/node_modules/**)", "Read(**/.next/**)", "Read(**/dist/**)", "Read(**/build/**)",
      "Read(**/out/**)", "Read(**/target/**)", "Read(**/.gradle/**)", "Read(**/vendor/**)",
      "Read(**/*.jar)", "Read(**/*.class)", "Read(**/*.log)"
    ]
  },
  "hooks": {
    "PreCompact": [ { "matcher": "auto", "hooks": [
      { "type": "command", "command": "echo \"[알림] 곧 컨텍스트 압축 - /wrap 권장\" 1>&2", "async": true } ] } ],
    "SessionStart": [ { "matcher": "compact", "hooks": [
      { "type": "command", "command": "echo '압축 후 복구: docs/PROGRESS.md 최상단과 PROJECT_PLAN.md를 다시 읽어라.'" } ] } ]
  },
  "extraKnownMarketplaces": { "repomix": { "source": { "source": "github", "repo": "yamadashy/repomix" } } }
}
```
> 🔴 **deny 현행 동작(2026-07 기준)**: ① Read/Edit deny는 파일 도구 + Bash 안의 인식되는 파일 명령(`cat`/`head` 등)까지 적용(v2.0.22+). ② 단 `cat`·`ls`·`head`·`grep` 등은 **기본 무프롬프트 읽기전용 내장 명령**이라, 특정 명령에 프롬프트를 강제하려면 위처럼 ask/deny 규칙이 필요. ③ python/node 스크립트가 파일을 직접 여는 **서브프로세스 우회는 여전히 가능** → **근본은 시크릿을 레포에서 분리**(§C-7). ④ Windows/PowerShell 환경은 `type`/`Get-Content`/`gc`도 막아야 함(위 deny에 포함). 매처(`"auto"`/`"compact"`)는 정규식·대소문자 엄격.
> 🟡 `includeCoAuthoredBy`는 deprecated → `attribution` 객체로 대체(빈 문자열 `""` = 표기 숨김).

### D-4. 기본 `/resume`·`/wrap` (단일 repo용 기본형) — §F-2 A 참조. (통합/MSA는 §F-2 B·C로 덮어씀)

### D-5. 확인 — `claude` → `/` → `/resume`·`/wrap` 자동완성되면 성공.

---

## E. 프로젝트 셋업 (환경별)

> 공통: 각 repo `CLAUDE.md`(프로젝트 사실 = **본체**) + `docs/` + §F-1 규칙블록 + §F-3 프로젝트 settings + §F-5 `.gitignore`.
> `CLAUDE.md` 사실은 스택·DB·아키텍처·제약. 행동 규칙(글로벌)과 중복 금지, 30~200줄.

### E-1. 🅱️ 단일 repo (B)
- `docs/` **flat**: `PROJECT_PLAN.md` · `PROGRESS.md` · `DECISIONS.md` (§F-6 양식).
- 스킬: 글로벌 기본형(§F-2 A) 사용. `.gitattributes` merge=union(§F-4)은 다인 협업이면 권장.
- 커밋: `git add CLAUDE.md docs .claude .gitignore` → 한 repo에서 커밋.

### E-2. 🅰️ 통합 멀티레포 (A-1 공통상위 / A-2 흩어짐)
- **레포를 물리적으로 합치지 말 것**(독립 git이면 깨짐). 각 repo는 E-1(또는 +E-3)을 각자 적용.
- **A-1**(한 폴더 아래): 상위 폴더에서 `claude` 한 번 → 전 repo 인식(`--add-dir` 불필요). 상위 폴더는 보통 git 아님.
- **A-2**(흩어짐): `claude --add-dir ../repoB --add-dir ../repoC` (세션 한정) 또는 IDE 멀티루트/attach.
- **루트 통합 레이어**는 §E-4.
- 커밋: **repo별로 따로**. "변경한 repo별로 각각 add/commit" (한 번에 커밋 불가).

### E-3. ➕ MSA 단위 분할 (여러 팀원 동시편집 시, 각 repo에 추가)
그 repo의 1차 단위로 docs를 쪼갠다(프론트=app, 백엔드=module, RAG=domain 등).
```text
<repo>/docs/
├── PROJECT_PLAN.md        # [공통] 마스터 로드맵 + 활성 단위 인덱스 (루트 공유)
├── README.md              # 색인
├── <unitA>/               # 📂 단위별 폴더 (정책)
│   ├── PROGRESS.md        #   append 전용 + 메타데이터, 충돌은 merge=union
│   └── DECISIONS.md
└── <unitB>/ ...
```
- `.gitattributes`(§F-4) + **솔루션-aware 스킬**(§F-2 B)로 대상 단위 판별.
- 주제 문서는 평면(`docs/<unit>/이름.md`)으로 시작 → 한 단위 3개+면 하위 폴더 승격. 빈 폴더 금지.

### E-4. 🅰️ 루트 통합 레이어 (A-1/A-2에 얹는 개인 영역)
하위 repo는 **손대지 않는다.** 루트(상위 폴더)에만 추가:
- 루트 `CLAUDE.md` = **짧은 라우터**(§F-2 D). 50줄 안팎, repo 사실은 넣지 않음(각 repo가 본체).
- 루트 `.claude/skills/` = **통합 `/resume`·`/wrap`**(§F-2 C). 하위 repo 솔루션-aware 스킬은 루트 실행 시 자동 등록 안 되므로 필요.
- (선택) 루트 `docs/INDEX.md` = **얇은 크로스-repo 인덱스**(§F-2 E). 크로스-repo 세션만 한 줄+링크.
- 루트를 개인 git repo로 둘 수도 있음(백업용) → 하위 repo들을 `.gitignore`로 제외.

---

## F. 단일 출처 블록 (SSOT · 복붙)

### F-1. 문서·기록 규칙 블록 ⭐ (각 repo `CLAUDE.md` 끝에 추가 — **이 블록 하나가 정본**)
```markdown
## 문서·기록 규칙 (Claude가 자동 적용)

### 작업 기록 구조
- 기록(PROGRESS·DECISIONS)은 flat(docs/) 또는 단위 분할(docs/<단위>/, MSA 정책). 마스터 PROJECT_PLAN.md만 docs/ 루트.
- /resume·/wrap은 대상(repo+단위)을 PWD>브랜치>질문 순으로 판별.
- 기록 항목 양식: [단위][상태(Done/Pending/Blocked)] 설명 — @작성자 (브랜치). 최상단 append.

### 동시편집 충돌
- PROGRESS·DECISIONS는 append 전용(기존 줄 수정 금지). .gitattributes의 merge=union이 동시 append를 자동 합침.
- DECISIONS id는 동시 발번 충돌을 피해 날짜+작성자 포함(예: DEC-20260703-min).

### 여러 대상 동시 변경 (방법 A)
- 주 대상 docs에 본문, 함께 바뀐 대상엔 [공통] 교차 한 줄 + 링크.
- 다른 repo는 접근 가능(cwd 또는 additionalDirectories)하면 자동 교차기록, 불가하면 "○○에 기록 필요" 알림.

### 세션 워크플로 규율
- append-only(과거 수정·삭제 금지). 결정이 바뀌면 새 DEC + 기존에 "Superseded by DEC-…" 표시. 상호참조는 [[DEC-…]]·날짜.
- /resume: **먼저 git status·브랜치로 미커밋(진행 중) 작업 발견** → 그다음 PROGRESS 최상단 + PROJECT_PLAN 현재 Phase + 최근 DEC 3건.
- /wrap: PROGRESS append + 새 DEC + PROJECT_PLAN 체크박스 갱신 + **미커밋이면 경고**(커밋 전엔 다음 /resume가 git status로만 발견).

### 길이 관리
- PROGRESS가 약 800줄/분기 경계를 넘으면 가장 오래된 분기를 docs/archive/로 옮기고 활성 파일 맨 아래 포인터 한 줄.

### 공유 vs 개인 / 시크릿
- 공유(커밋): CLAUDE.md·.claude/skills·.claude/settings.json·.gitattributes·docs/.
- 개인(커밋 금지): .claude/settings.local.json·CLAUDE.local.md. 개인 노트는 auto-memory(~/.claude/projects/<proj>/memory, 머신 로컬·200줄/25KB).
- 시크릿(.env·키·비밀번호)은 읽지도 커밋하지도 않는다.

### 토큰 참고
- docs/는 자동 선로딩되지 않고 필요 시만 읽힌다. 분할은 토큰이 아니라 정리·타겟 정확도용.
```

### F-2. `/resume`·`/wrap` 스킬 (환경에 맞는 것 하나 선택)

**A) 기본형** (단일 repo · 글로벌 `~/.claude/skills/`)
```markdown
# resume/SKILL.md
---
name: resume
description: 세션 시작 시 git status로 미커밋 작업 먼저 확인 후 CLAUDE.md·docs/PROGRESS.md 최상단·PROJECT_PLAN.md를 읽고 지난 상태·다음 작업 보고.
---
# /resume — 먼저 git status·브랜치로 미커밋(진행 중) 작업 발견 → CLAUDE.md, docs/PROGRESS.md(최상단), PROJECT_PLAN.md를 읽고 "지난 X, 다음 Y?" 보고.
```
```markdown
# wrap/SKILL.md
---
name: wrap
description: 세션 종료 시 docs/PROGRESS.md 최상단에 오늘 작업 append, 새 결정 DECISIONS, PROJECT_PLAN 체크박스, 미커밋 경고, 변경 파일 보고.
---
# /wrap — docs/PROGRESS.md 최상단 append(작업/결정/다음/미해결) + 새 DEC + PROJECT_PLAN 체크박스. 미커밋이면 경고. 변경 파일 보고.
```

**B) 솔루션-aware** (MSA 단위분할 repo · 각 repo `.claude/skills/`, 글로벌 기본형을 덮어씀)
```markdown
# resume/SKILL.md
---
name: resume
description: 단위분할 재개. git status로 미커밋 작업 먼저, 대상 단위(app/module/domain)를 PWD>브랜치>질문 순 판별해 docs/<단위>/PROGRESS.md를 읽는다.
---
# /resume (솔루션-aware)
0) 먼저 git status·현재 브랜치 확인 — 미커밋/비-main 브랜치면 그 단위 작업 우선(untracked일 수 있음).
1) 대상 단위 판별: PWD가 <단위> 안 → 그 단위 / 브랜치명(feature/<단위>) / 불명확하면 질문.
2) docs/<단위>/PROGRESS.md 최상단 + docs/PROJECT_PLAN.md + 최근 DEC 3건 → "이 단위 지난 X, 다음 Y?" 보고.
```
```markdown
# wrap/SKILL.md
---
name: wrap
description: 단위분할 마무리. 대상 단위 docs/<단위>/PROGRESS.md에 [상태]+작성자+브랜치 기록, 단위간 변경은 [공통] 교차, 미커밋 경고.
---
# /wrap (솔루션-aware)
대상 단위 판별 후 docs/<단위>/PROGRESS.md 최상단에 [Done]/[Pending]/[Blocked] 병기 기록.
다른 단위도 바뀌면 그 단위에 [공통] 교차 한 줄. 미커밋이면 경고. 완료 모호 시 확인 후 기록.
```

**C) 통합형** (루트 통합 레이어 · 루트 `.claude/skills/`)
```markdown
# resume/SKILL.md
---
name: resume
description: 통합 워크스페이스 재개. 루트+하위 repo git status로 미커밋 먼저, 대상 repo+단위 판별해 <repo>/docs[/<단위>]/PROGRESS.md와 (있으면) 루트 docs/INDEX.md를 읽는다.
---
# /resume (통합)
0) 루트+하위 repo 각각 git status·브랜치로 미커밋(진행 중) 작업 먼저 발견.
1) 대상 repo(+단위) 판별: PWD > 브랜치 > 질문.
2) <repo>/docs[/<단위>]/PROGRESS.md 최상단 + <repo>/PROJECT_PLAN.md + 루트 docs/INDEX.md 최근 항목 → 보고.
```
```markdown
# wrap/SKILL.md
---
name: wrap
description: 통합 마무리. 건드린 repo마다 <repo>/docs[/<단위>]/PROGRESS.md 기록, 여러 repo면 [공통] 교차, (선택) 루트 INDEX 한 줄, 미커밋 경고, 커밋은 repo별 안내.
---
# /wrap (통합)
1) 각 repo git status로 변경 감지. 2) 변경 repo마다 docs[/<단위>]/PROGRESS.md 최상단 append.
3) 여러 repo면 주 대상 본문 + 나머지 [공통] 교차. 4) (선택) 루트 docs/INDEX.md 크로스-repo 한 줄+링크.
5) repo별 변경 파일 보고 + 미커밋 경고. 커밋은 repo별 따로(팀 양식).
```

**D) 루트 라우터 `CLAUDE.md`** (통합 레이어)
```markdown
# 통합 워크스페이스 (개인 라우터)
> 각 repo 사실은 그 repo의 CLAUDE.md가 본체. 여긴 길잡이만(50줄 안팎).

## 모듈 별칭 → repo
- "<프론트 …>" → <repoA> / "<백엔드 …>" → <repoB> / "<RAG …>" → <repoC>

## 통합 워크플로 규칙 (Claude가 자동 적용)
- /resume·/wrap은 대상 repo+단위를 PWD>브랜치>질문 순 판별, 그 repo docs[/<단위>]/에 기록.
- 여러 repo를 건드리면 각 repo에 기록(주 대상 본문 + [공통] 교차). 크로스-repo 세션만 루트 docs/INDEX.md에 한 줄+링크.
- 커밋은 repo별로 따로(독립 git). 루트 개인 레이어는 비공유(또는 개인 repo).
```

**E) 루트 `docs/INDEX.md`** (얇은 크로스-repo 인덱스)
```markdown
# 통합 작업 인덱스 (개인 · 얇게 · 링크 기반)
> 본문은 각 repo docs[/<단위>]/. 여긴 크로스-repo 세션 한 줄 + 링크만. 길어지면 archive.
- 2026-07-03 [<repoB>:<unit> · <repoA>:<unit>] 채널 연동 → <repoB>/docs/<unit>/PROGRESS.md · <repoA>/docs/<unit>/PROGRESS.md
```

### F-3. 프로젝트 `.claude/settings.json` (allow/ask/deny + 크로스-repo)
```json
{
  "$schema": "https://json.schemastore.org/claude-code-settings.json",
  "permissions": {
    "additionalDirectories": ["../<자주 함께 고치는 repo>"],
    "allow": [
      "Bash(git status:*)", "Bash(git log:*)", "Bash(git diff:*)", "Bash(git add:*)", "Bash(git commit:*)",
      "Bash(git switch:*)", "Bash(git checkout:*)", "Bash(git pull:*)", "Bash(git push:*)",
      "Bash(ls:*)", "Bash(cd:*)", "Bash(pwd)", "Bash(which:*)"
    ],
    "ask": [
      "Bash(git push --force:*)", "Bash(git push -f:*)", "Bash(git reset --hard:*)",
      "Bash(git clean:*)", "Bash(git rebase:*)", "Bash(rm -rf:*)"
    ],
    "deny": [
      "Bash(cat *_secure_config*)", "Bash(cat *.env*)",
      "Bash(type *.env*)", "Bash(Get-Content *.env*)", "Bash(gc *.env*)",
      "Bash(dd *)", "Bash(mkfs*)", "Bash(shutdown*)", "Bash(reboot*)",
      "Bash(rm -rf /)", "Bash(rm -rf /*)", "Bash(rm -rf ~*)"
    ]
  }
}
```
> `allow`엔 스택별 빌드/테스트 추가(`./gradlew:*`·`npm run:*`·`pytest:*` 등). 전체허용 `Bash(*)`는 개인 선택(팀 권장 아님).

### F-4. `.gitattributes` (각 repo 루트 · 동시 append 충돌 자동 병합)
```
docs/PROGRESS.md       merge=union
docs/DECISIONS.md      merge=union
docs/**/PROGRESS.md    merge=union
docs/**/DECISIONS.md   merge=union
```
> ⚠️ `merge=union`은 동시 top-insert 순서가 약간 섞일 수 있음(둘 다 보존). DEC 번호는 날짜+작성자로.

### F-5. `.gitignore` (각 repo)
```
# Claude 런타임
.claude/cache/
.claude/sessions/
.claude/logs/
# Claude 개인 구성 (커밋 금지)
.claude/settings.local.json
.claude/*.local.md
CLAUDE.local.md
```
> A-1 루트를 개인 repo로 둘 때만: 루트 `.gitignore`에 하위 repo 폴더(`<repoA>/` 등)도 제외.

### F-6. 상태 뱃지 · 기록 양식
| 뱃지 | 의미 |
| --- | --- |
| 🚀 `[Done]` | PR/병합 가능한 독립 완결 |
| ⏳ `[Pending]` | 정상 빌드, 잔여 스펙 있어 이어서 |
| 🚨 `[Blocked]` | 컴파일 에러/외부 의존 교착으로 동결 |
```markdown
- [<단위>][Done] 게시판 카테고리 트리 추가 — @작성자 (feature/<단위>)
```

---

## G. 매일 운영 루틴
```text
프로젝트(또는 상위 폴더)에서 claude 실행
  → git pull            (동료 기록 동기화)
  → /resume             (git status로 미커밋 먼저 → 대상 판별 → 지난 기록)
  → @경로/파일 작업      (작게 쪼개기)
  → /wrap               (대상 docs에 [상태] 기록 + 미커밋 경고)
  → repo별 git 커밋·푸시 (독립 git이면 각각. 미커밋 두지 말 것)
```
> ⚠️ **기록만 하고 커밋 안 하면 다음 세션이 못 찾는다**(미커밋은 git status로만 발견). 반드시 커밋.

---

## H. 적응 규칙 (프로젝트마다 다른 것 → Claude가 채움)
| 변수 | 조정 |
| --- | --- |
| repo 수·위치 | B / A-1 / A-2 결정(§B) |
| 동시성(같은 단위 다인 편집) | 있으면 §E-3 단위분할+merge=union+솔루션aware, 없으면 flat |
| 스택 | `allow`의 빌드/테스트 명령, `deny`의 산출물 경로 |
| 커밋 양식 | 팀 규칙에 맞춤(아래 기본값) |
| 단위 이름 | 프론트=app / 백엔드=module / RAG=domain 등 그 repo 1차 분할축 |

**커밋 양식(기본)**: `<타입>: <스코프> - <설명>` (타입 풀워드 `feature`/`fix`/`hotfix`/`refactor`/`chore`). 팀에 다른 규칙 있으면 그걸 우선.

---

## I. 질문 템플릿 (부족하면 이걸 묻는다 · 추천값 포함)
1. **환경 유형**: 단일 repo(B) / 통합(A-1·A-2) 중 무엇? (코드로 판별했으면 확인만)
2. **동시성**: 여러 명이 같은 단위를 동시에 고치나? → 예면 MSA 단위분할 적용.
3. **크로스-repo**: 자주 함께 고치는 repo가 있나? → `additionalDirectories`에 등록.
4. **커밋 양식**: 팀 표준 커밋 메시지 규칙이 있나? (없으면 §H 기본값)
5. **루트 레이어**: 통합 환경이면 루트를 개인 git repo로 둘까(백업), 비-git로 둘까?
6. **기록 위치**: docs를 repo별로 둘까(권장) 한곳에 모을까?

---

## J. 보안 (셋업 전 최우선) 🔴
- **deny의 현재 커버리지**: Read/Edit deny 규칙은 파일 도구 + Bash 안의 인식되는 파일 명령(`cat`/`head`/`diff` 등)까지 감지·차단한다(v2.0.22+에서 개선). 과거 "Read 도구만 막는다"는 서술은 구버전 기준.
- **남은 구멍 2개**: ① 임의 서브프로세스(python/node 스크립트가 파일을 직접 open) 우회 가능. ② `cat`·`ls`·`head`·`grep` 등 읽기전용 내장 명령은 **기본적으로 프롬프트 없이 실행**되므로, 막으려면 명시적 ask/deny 규칙 필요.
- **Windows 주의** 🔴: sandboxing은 현재 macOS 중심이며 **Windows/Linux엔 샌드박스 없음** → Windows에선 allow를 좁게, 위험 명령을 deny로 막는 규칙 기반에 의존해야 한다. PowerShell 셸이면 `type`/`Get-Content`/`gc`도 deny에 포함(§D-3·§F-3).
- **규칙 우선순위**: deny → ask → allow 순 첫 매치. 넓은 deny는 더 좁은 allow보다 항상 우선(= deny에 예외를 뚫을 수 없음).
- **최선**: 진짜 비밀번호·API 키·인증서를 **작업 레포에 두지 않기**(별도 vault·환경변수·`_secure_config` 등).
- **차선**: 불가피하면 `.env` + deny + (macOS면) sandboxing. 단 완전 차단 아님을 인지.
- 글로벌 `CLAUDE.md #8`이 "cat .env 금지"를 행동 규칙으로 보완.

---

## K. 트러블슈팅
| 증상 | 확인 |
| --- | --- |
| `/resume`·`/wrap` 자동완성 안 뜸 | IDE 재시작 / 폴더·파일명 / `SKILL.md`의 `name:` |
| IntelliJ에서 Claude 안 열림 | 플러그인 설치 후 **완전 재시작** / `Ctrl+Esc` |
| hooks 안 도는 듯 | 매처 철자(`auto`/`compact`) 정확히 |
| `/resume`가 진행 중 작업 못 찾음 | 미커밋+다른 브랜치라서 — skill이 `git status` 먼저 보는지 / **`/wrap` 후 커밋** 습관화 |
| 같은 PROGRESS Git 충돌 | `.gitattributes` merge=union 있는지 / append 전용인지 |
| A-1인데 일부 repo 못 읽음 | **상위 폴더**에서 `claude` 실행했는지 |
| A-2에서 IDE엔 보이나 Claude가 못 읽음 | `--add-dir` 빠짐(세션 한정) |
| 여러 repo 한 번에 커밋 안 됨 | 정상 — 독립 git. repo별 따로 |
| `.env`를 Claude가 읽으려 함 | deny + CLAUDE.md #8 / **근본은 시크릿 분리** |
| Windows에서 Bash 없다고 에러 | Claude Code `v2.1.120+`로 업데이트(PowerShell만으로 동작) |

---

## L. 유지보수 (6개월마다 재검증) ⭐
Claude Code는 매주 바뀐다. 6개월마다 30분:
- `code.claude.com/docs/en/whats-new` 최신 항목 확인.
- 🔴🟡: deny의 서브프로세스 우회·**Windows sandboxing 지원 여부**(permissions), `attribution` 스키마 변화, CLAUDE.local.md deprecation(memory), auto-memory 한도(200줄/25KB).
- `/model` 최신 정책(별칭이 가리키는 실제 모델), `claude --version`.
- 갱신 후 이 문서 "최종 갱신" 날짜 수정.

---

## 핵심 출처 🟢
IDE 통합·`--add-dir`(ide-integrations·large-codebases) / permissions·deny 한계 / hooks / skills / memory·auto-memory / repomix(repomix.com). — 모두 `code.claude.com/docs` 및 `docs.anthropic.com`.

**문서 정보** — 통합 마스터(범용) **v1.1**. 8개 소스(⓪ 폴더구성 · ① 셋업 · structure-guide · daily-routine · SFA 셋업/통합 · setup-followalong v8 · integrated-setup) 중복 제거·v8 반영.
최종 갱신: 2026-07-03 (변경 이력은 문서 최상단 버전 표 참조) / 참조: Claude Code v2.1.x, Opus 4.8 · Sonnet 5(v2.1.197+) · Fable 5.
