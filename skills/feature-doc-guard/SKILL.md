---
name: feature-doc-guard
description: 기능 코드를 고쳤는데 docs/features/ 의 해당 기능 문서를 함께 갱신하지 않은 커밋을 막는 가드를 현재 프로젝트에 설치·제거·점검한다. git pre-commit 훅과 Claude Code PreToolUse 훅 두 가지를 설치하며, 스테이징된 소스 파일을 00_inventory.md 의 담당 코드 위치와 기능 문서의 코드 참조로 역추적해 문서 파일이 같이 스테이징됐는지 확인한다. 사용자가 문서 누락 방지, 커밋 가드, 문서 강제, pre-commit 훅, 문서 안 고치고 커밋 막기를 언급하면 반드시 이 스킬을 쓴다.
argument-hint: "install | uninstall | check"
allowed-tools: Bash(python *) Bash(python3 *) Bash(git diff *) Bash(git rev-parse *)
---

# feature-doc-guard

`$0` 가 install / uninstall / check 중 하나다. 없으면 세 가지를 설명하고 고르게 한다.
`docs/features/00_inventory.md` 가 없으면 "먼저 `/feature-docs init`" 을 안내하고 중단한다.

## install

1. `${CLAUDE_SKILL_DIR}/scripts/check_docs_sync.py` 를 프로젝트의
   `.claude/hooks/check_docs_sync.py` 로 복사한다 (프로젝트 안에 두어야 팀원과 CI 에서도 동작).
2. **git pre-commit 훅**: `.git/hooks/pre-commit` 이 없으면 만들고, 있으면 끝에 추가한다.
   Windows 에서도 git 이 sh 로 실행하므로 sh 문법으로 쓴다.
   ```sh
   #!/bin/sh
   # feature-doc-guard
   python .claude/hooks/check_docs_sync.py --staged || exit 1
   ```
   `python` 이 없고 `python3` 만 있는 환경이면 그에 맞춘다. 실행 권한을 준다.
3. **Claude Code 훅**: 프로젝트 `.claude/settings.json` 의 `hooks.PreToolUse` 에 아래를 추가한다
   (기존 훅은 보존). 이러면 Claude 가 `git commit` 을 실행하기 직전에도 검사한다.
   ```json
   {
     "matcher": "Bash",
     "hooks": [{
       "type": "command",
       "command": "python .claude/hooks/check_docs_sync.py --staged --only-on-commit"
     }]
   }
   ```
   `--only-on-commit` 은 stdin 으로 들어오는 도구 입력에 `git commit` 이 포함될 때만 검사한다.
4. `.claude/hooks/` 와 settings.json 을 커밋 대상에 포함하라고 안내한다.
5. 설치 후 `check` 를 한 번 실행해 동작을 보여준다.

## uninstall
pre-commit 에서 `# feature-doc-guard` 블록을, settings.json 에서 해당 훅 항목을 제거한다.
`.claude/hooks/check_docs_sync.py` 는 사용자에게 물은 뒤 삭제한다.

## check
`python .claude/hooks/check_docs_sync.py --staged` 를 실행해 결과를 보여준다.
설치 전이면 `${CLAUDE_SKILL_DIR}/scripts/check_docs_sync.py` 로 실행한다.

## 동작 규칙 (스크립트)
- 스테이징된 파일 중 docs/, 테스트, 설정, 잠금 파일을 제외한 소스 파일을 대상으로 한다.
- 각 파일을 00_inventory.md 의 "담당 코드 위치" 열과 각 F-xxx 문서의 "코드 참조" 절에서
  찾아 영향 기능을 구한다. 접두 일치(디렉터리)도 인정한다.
- 영향 기능의 F-xxx 파일이 스테이징에 없으면 목록을 출력하고 종료 코드 1 로 커밋을 막는다.
- 어느 기능에도 매핑되지 않는 소스 파일은 "새 기능 후보" 로 경고만 하고 막지 않는다.
- 우회: `FEATURE_DOC_GUARD=0` 환경변수, 또는 커밋 메시지에 `[skip-doc]`.
  (`git commit -m "... [skip-doc]"` 은 pre-commit 시점에 메시지를 읽을 수 없으므로 환경변수를 쓴다.)
