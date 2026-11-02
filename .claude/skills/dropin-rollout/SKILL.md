---
name: dropin-rollout
description: 이 PC에서 단디 구성을 쓰는 프로젝트 전체를 한 번에 최신화한다 — 프로젝트별 변경과 질문을 모아 한 번에 승인받고, 각 프로젝트 기본 브랜치에서 만든 별도 워크트리에서 무인 적용해 작업 브랜치에 커밋한다. 작업 중인 폴더는 건드리지 않는다. 단디 저장소 클론에서 실행한다. 한 프로젝트만 최신화할 때는 그 프로젝트에서 /dropin-sync.
disable-model-invocation: true
argument-hint: "[점검] [only=<경로>] [add=<경로>]"
---

# /dropin-rollout — 이 PC의 단디 적용 프로젝트 전체 일괄 최신화

**역할 경계**: 한 프로젝트의 최신화는 `/dropin-sync`다. 이 스킬은 그것을 프로젝트마다 무인으로 돌리기 위해 **질문을 한 번에 모으고 격리된 워크트리를 준비할 뿐**이다. 설치 절차의 정본은 `00_통합-설치.md`와 각 `dropin-*` 스킬이고 여기 옮겨 적지 않는다.

**`/dropin-sync`와 다른 점**: `claude -p`는 질문할 수 없다. 답을 받지 못한 항목은 고치지 않고 `남은 일`로 보고한다. 그런 프로젝트는 그 폴더에서 `/dropin-sync`를 돌린다.

**인수**: `점검`이면 수집한 표만 보고하고 아무것도 적용하지 않는다. `only=<경로>`는 그 프로젝트만, `add=<경로>`는 후보에 추가한다.

## 0) 전제
- `git remote get-url origin`이 `EleninJayTech/claude` 또는 `EleninJayTech/claude-dev`가 아니면 "단디 저장소 클론에서 실행"을 안내하고 중단한다.
- 작업 트리가 clean이고 기본 브랜치 위면 `git pull --ff-only`. 더티·비기본 브랜치면 그 문서 버전이 모든 프로젝트 기록에 찍힌다고 알리고 AskUserQuestion(`계속` / `중단`). `git fetch`로 뒤처졌으면 알리고 중단한다(사용자 결정). fetch가 실패하면 보고에 `기준 미확인`을 달고 같은 질문을 낸다. 이 폴더를 **기준 클론**이라 부른다. 기준은 이 클론의 문서다.
- `~/.claude/skills/*dropin-{update,check,apply,sync}*/SKILL.md`가 없으면 중단하고 설치를 안내한다.
- `claude --version`을 보고한다.
- 임시 폴더 `<OS temp>/dropin-rollout-<YYYYMMDD-HHMM>/`을 만든다(프롬프트·결과·답 저장). **프로젝트 안에 두지 않는다.**

## 1) 대상 열거
1. `~/.claude/projects/*/`에서 가장 최근 `*.jsonl`의 첫 `cwd`를 읽는다(폴더명을 경로로 되돌리지 않는다).
2. 후보 = 그 경로들 ∪ 그 경로들 **부모 폴더의 바로 아래 폴더** ∪ `add=` 경로. 세션 흔적이 없는 프로젝트를 찾아 보여 주기 위해서다(5 참고).
3. 워크트리 경로는 `git rev-parse --git-common-dir`로 본체로 접고 중복을 제거한다. 실재하지 않는 경로는 버린다.
4. `CLAUDE.md` 또는 `.claude/CLAUDE.md`에 `^\s*<!--\s*dropin-applied` 줄이 있는 것만 남긴다.
5. 제외한다(사유와 함께 목록에 표시):
   - git repo가 아님
   - origin이 단디 저장소(정본·배포)
   - 통합 워크스페이스(바로 아래 폴더에 자체 `.git`과 기록이 있음) → "해당 폴더에서 `/dropin-sync`"
   - 세션 흔적 없이 부모 폴더에서만 찾은 후보 → 기본 제외, `add=`로만 포함한다. `-p`는 신뢰 대화상자 없이 그 repo의 훅·`.mcp.json`을 실행한다(공식 headless)
6. 기본 브랜치 = `git symbolic-ref refs/remotes/origin/HEAD`. 없으면 `main`, `master` 순으로 있는 것. 없으면 제외한다. 원격이 있으면 `git fetch`한다.
7. `only=` 인수가 있으면 그 경로만 남긴다.
8. **AskUserQuestion**으로 확인한다. 질문 문장에 대상·제외 전체와 각 항목의 현재 브랜치·미커밋 여부(작업 트리는 건드리지 않는다)를 적고, 선택지는 `전부 진행` / `중단`. Other로 제외·추가 경로를 받는다. 비용이 프로젝트 수에 비례한다고 함께 적고, 세션 흔적 없는 후보를 표시해 `-p`가 그 repo의 훅·`.mcp.json`을 묻지 않고 실행한다고 고지한다.

## 2) 글로벌 먼저 (메인 세션, 대화형)
`~/.claude/CLAUDE.md`의 글로벌 기록 버전을 기준 클론의 문서 헤더 버전과 비교한다. 모두 같고 글로벌 줄에 대기·차단 메모가 없으면 `글로벌: 최신`으로 건너뛴다. 버전이 같은데 메모만 있으면 재적용 질문 ③만 묻는다. 다르면 `~/.claude/skills/*dropin-apply*/SKILL.md`를 읽어 **대상=이 PC**로 수행한다. `점검`이면 차이만 보고한다.

## 3) 수집 (프로젝트마다 순차, 읽기 전용)
**먼저 판정한다**(claude를 부르지 않는다). `<slug>`는 repo 폴더 이름이다. 기록은 `git -C <repo> show origin/<기본 브랜치>:CLAUDE.md`(없으면 `.claude/CLAUDE.md`)에서 읽는다.
- 미병합 `chore/*-dropin-sync` 브랜치가 있으면 `병합 대기`로 표시하고 건너뛴다(둘 다 병합하면 충돌한다).
- 기본 브랜치에 기록이 없으면 `기록 없음`으로 표시하고 건너뛴다(작업 브랜치에만 있는 기록).
- 기록의 문서 버전이 전부 기준 클론 헤더와 같고 조치 대기 메모가 없으면 `이미 최신`으로 표시하고 건너뛴다.

1. `NNN` = 그 repo의 `git worktree list`·`git branch -a`에 나온 가장 큰 3자리 번호 + 1.
2. `<wt>` = `<repo>/.claude/worktrees/NNN-dropin-sync`. 그 경로가 `git check-ignore`에 안 걸리면 `<임시 폴더>/wt/<repo 이름>-NNN`을 쓴다.
3. `git -C <repo> worktree add --detach <wt> origin/<기본 브랜치>` (원격이 없으면 로컬 기본 브랜치).
4. `<임시>/<slug>.collect.txt`에 아래 **수집 프롬프트**를 쓰고, 워크트리에서 실행한다. Bash 도구의 `run_in_background`로 돌리고 끝나면 다음 프로젝트로 간다.
   ```
   cd <wt> && claude -p --permission-mode dontAsk --output-format json \
     --allowedTools "Read,Glob,Grep,Bash(git status *),Bash(git log *),Bash(git ls-files *),Bash(git show *),Bash(git rev-parse *),Bash(git check-ignore *)" \
     --disallowedTools "AskUserQuestion" \
     --add-dir <기준 클론> <repo 본체> ~/.claude \
     < <임시>/<slug>.collect.txt > <임시>/<slug>.collect.json
   ```
5. `.result`의 JSON을 파싱한다. 실패·비정상 종료면 `git worktree remove --force <wt>` 뒤 `수집 실패(사유)`로 표시하고 계속한다. 한도 초과 오류면 전체를 멈추고 남은 목록을 보고한다(재실행하면 이어진다).
6. 변경도 질문도 없으면 `git worktree remove <wt>`, `이미 최신`으로 표시한다. notes의 검토 후보는 `남은 일`에 옮긴다.

**수집 프롬프트**
```
이 실행은 무인이다. 질문할 수 없고 어떤 파일도 쓰지 않는다.
<기준 클론>/00_통합-설치.md 전문을 읽고 이 폴더를 대상으로 §A STEP 1~3 판단만 수행한다. 하위 문서는 기준 클론에서 읽는다. 글로벌 스코프 항목은 다루지 않는다.
.gitignore에 걸린 로컬 산출물은 이 워크트리에 없으므로 <repo 본체>에서 읽어 판단한다.
기준 클론의 최신 여부는 이미 확인했으니 다시 확인하지 않는다. git 명령은 이 폴더에서 파이프·연결 없이 한 번에 하나씩 쓰고, 다른 폴더는 Read·Glob·Grep으로 읽는다.
프로젝트 안 문서 사본을 교체해야 하면 notes에 "<프로젝트에서 /dropin-update로 교체>"로 적는다. 사용자에게 물어야 할 자리는 묻지 말고 questions에 담되, 이번 실행의 범위는 **기록 버전과 현재 버전의 차이**다. 차이가 있는 문서의 불변 ①~④, 안전 질문, 그 차이로 새로 생긴 기본 해제 항목을 빠뜨리지 않는다.
버전이 같은 문서는 재적용 질문 ①②를 만들지 않는다. 기록된 미선택·제거 후보는 questions에 넣지 않고 notes에 "<프로젝트에서 /dropin-sync로 검토: 항목>"으로 적는다. 조치 대기는 해소가 관찰될 때만 questions에 넣는다.
버전 차이도 해소된 조치 대기도 없으면 delta와 questions를 비운다.
최종 응답은 아래 JSON 하나만 낸다:
{"current_record":"<이 폴더 CLAUDE.md의 현재 dropin-applied 줄 그대로>","delta":[{"id":"d1","doc":"03","from":"vX.Y","to":"vX.Z","row":"<버전 행 요약>","recommend":"적용|보류|해당없음"}],"questions":[{"id":"q1","kind":"불변|안전|기본해제|조치대기","text":"<질문>","options":["..."],"default":"<권고 또는 null>","reason":"<한 줄>"}],"notes":["..."]}
```

## 4) 묶음 승인
수집 결과를 합쳐 사람이 보는 표로 낸다. `점검`이면 이 표를 보고하고, 워크트리를 모두 제거한 뒤 7)로 간다.
- **델타**: 같은 `문서·from→to·행`을 한 줄로 묶고 대상 프로젝트를 병기한다.
- **질문**: 같은 `kind·text`를 묶어 대상을 병기한다. 프로젝트 고유 질문은 프로젝트 이름을 붙인다.
- **AskUserQuestion**(문항당 선택지 4개 상한, 넘치면 문항 분할, 선택지마다 고르면/이럴 때 한 줄):
  - 델타: 문서 단위로 `권고대로 적용` / `전부 보류` / `프로젝트 제외`(Other로 지정).
  - 불변·안전·조직 게이트 질문: **권고값이 있어도 사용자의 답을 받는다.** 회사 repo로 감지된 항목은 묶지 않고 프로젝트별로 묻는다.
- 프로젝트마다 `<임시>/<slug>.answers.json`에 `{"approved_delta":[id...],"answers":{qid:값},"unanswered":[qid...]}`를 쓴다.

## 5) 적용 (프로젝트마다 순차)
승인된 행·답이 하나도 없으면 `git worktree remove <wt>`, `전부 보류`로 표시한다.
1. `<wt>`에서 `git switch -c chore/NNN-dropin-sync`.
2. 실행 전 `git -C <repo> status --porcelain`과 기준 클론의 `git status --porcelain`을 저장한다.
3. 아래 **적용 프롬프트**로 실행한다.
   ```
   cd <wt> && claude -p --permission-mode auto --output-format json \
     --allowedTools "Read,Glob,Grep,Edit,Write" \
     --disallowedTools "AskUserQuestion,Bash(git push *),Bash(git commit *),Bash(git switch *),Bash(git checkout *),Bash(git worktree *),Bash(git reset *),Bash(git stash *),Edit(~/.claude/**),Write(~/.claude/**),Edit(//<기준 클론>/**),Write(//<기준 클론>/**)" \
     --add-dir <기준 클론> <repo 본체> ~/.claude \
     < <임시>/<slug>.apply.txt > <임시>/<slug>.apply.json
   ```
4. **첫 프로젝트에서** auto를 쓸 수 없다는 오류가 나면 전체를 멈추고 AskUserQuestion: `acceptEdits로 계속(.claude/ 변경은 남은 일)` / `중단`.
5. `.result`를 파싱하고 `total_cost_usd`를 합산한다(없으면 생략). 파싱 실패·비정상 종료면 **커밋하지 않고** `적용 실패(사유)`로 표시해 워크트리를 남기고 다음 프로젝트로 간다(6)을 건너뛴다). 한도 초과 오류면 전체를 멈춘다.
6. 본체와 기준 클론의 `status --porcelain`이 실행 전과 다르면 **`본체 변경 감지`로 크게 보고하고 전체를 멈춘다.**

**적용 프롬프트**
```
이 실행은 무인이다. 질문할 수 없다. 이 폴더는 <repo 본체>의 기본 브랜치에서 만든 작업 트리다.
~/.claude/skills/*dropin-sync*/SKILL.md의 순서를 이 폴더에 수행한다. 기준 문서는 <기준 클론>이다.
기준 클론의 최신 여부는 이미 확인했으니 다시 확인하지 않는다. 프로젝트 안 문서 사본을 교체해야 하면 고치지 않고 unresolved에 넣는다. 승인·답은 <임시>/<slug>.answers.json이 유일한 근거다. 묻는 자리마다 거기서 답을 찾고, 없으면 그 항목을 고치지 않고 unresolved에 넣는다.
승인되지 않았거나 unresolved가 남은 문서는 dropin-applied 기록의 그 문서 버전을 올리지 않는다.
쓰기가 거부되면 우회하지 말고 denied에 넣는다.
쓰는 곳은 이 폴더뿐이다. ~/.claude·<repo 본체>·<기준 클론>은 읽기만 한다. 글로벌 스코프 항목은 건드리지 않는다. .gitignore에 걸린 로컬 파일을 고쳐야 하면 고치지 않고 unresolved에 넣는다.
커밋·브랜치 변경·push는 하지 않는다.
최종 응답은 JSON 하나만 낸다: {"applied":["..."],"unresolved":["..."],"denied":["..."],"verify":"<00 STEP 5 검증 결과 요약>","commit_subject":"<그 repo 언어=와 커밋 양식에 맞는 한 줄>"}
```

## 6) 커밋 (메인 세션, 프로젝트마다)
1. `git -C <wt> status --porcelain`. 변경이 없으면 `git -C <repo> worktree remove <wt>` 뒤 `git -C <repo> branch -d chore/NNN-dropin-sync`로 지우고 `변경 없음`으로 표시한다.
2. `settings.local.json`·`CLAUDE.local.md`를 뺀 파일을 **파일명으로** `git add`하고(`-A`·`-a` 금지) `commit_subject`로 커밋한다. 첨부 서명 줄을 넣지 않는다.
3. `git -C <repo> worktree remove <wt>`. 브랜치는 남긴다.

## 7) 통합 보고
`프로젝트 | 기준 | 결과(적용·이미 최신·병합 대기·기록 없음·전부 보류·실패) | 브랜치 | 남은 일` 표 + 합산 비용 + 제외 목록.
- 프로젝트별 병합 명령을 한 줄씩 준다(`git merge chore/NNN-dropin-sync`). 작업 중인 프로젝트는 그 사실을 함께 적는다.
- `남은 일`은 unresolved·denied이며 "그 프로젝트에서 `/dropin-sync`"로 안내한다.
- 임시 폴더 경로를 적는다.
- 중단·실패로 남은 워크트리마다 경로와 제거 명령(`git -C <repo> worktree remove --force <wt>`)을 적는다. 어느 단계에서 멈춰도 이 보고를 낸다.

## 하지 않는 것
push·병합·브랜치 삭제 안 함(자신이 만든 빈 브랜치 제외) · 사용자 작업 트리에 쓰지 않음 · 사용자의 답을 추정하지 않음 · 병렬 실행 안 함 · `bypassPermissions` 쓰지 않음 · 00·`dropin-*` 절차 복제 안 함(읽어서 위임).
