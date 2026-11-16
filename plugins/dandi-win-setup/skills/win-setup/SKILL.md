---
name: win-setup
description: Windows PC를 Claude Code CLI 개발용으로 진단·정비한다(수동 호출 전용) — Windows Terminal 기본 프로필을 PowerShell 7로, 사용자 PATH 정리, 개발자 모드·긴 경로·sudo, defaultShell, jq·fd·gh 설치. 진단은 읽기 전용이고 정비는 항목별 승인 후에만 한다.
argument-hint: "[없음 | 진단만(diagnose) | 검증(verify)]"
disable-model-invocation: true
---

# /dandi-win-setup:win-setup — Windows에서 Claude Code CLI 개발 환경 진단·정비

검증 환경: Windows 11 Pro 25H2 · Windows Terminal 1.25 · PowerShell 7.7(MSIX) · Claude Code 2.1.325. 이와 다른 PC에서는 아래 「전제와 다르면 멈춘다」 규칙이 더 자주 걸린다.
스킬 폴더는 `${CLAUDE_SKILL_DIR}`이다. `references/fix.md`의 `<SKILL_DIR>`는 이 경로로 바꿔 읽는다.

## 실행 규칙

- **진단은 읽기 전용이다.** 진단을 마치기 전에는 아무것도 바꾸지 않는다.
- 판정표를 보고한 뒤, 해당하는 항목만 **사용자 승인을 받아** 실행한다.
- 이 문서의 전제(경로·값)와 실제 PC가 다르면 그 항목은 멈추고 보고한다. 임의로 판단해 진행하지 않는다.
- 변경 전에는 항상 백업을 남긴다. 백업은 `%LOCALAPPDATA%\win-setup\backup\`, 로그는 `%LOCALAPPDATA%\win-setup\logs\`에 `.txt`로 둔다(`.log`는 흔히 `Read(**/*.log)` 같은 deny 규칙의 대상이라 Claude가 다시 읽지 못할 수 있다).
- `.env`·인증서·키·`.credentials.json`은 읽지 않는다.
- 관리자 권한이 필요한 변경은 `admin-setup.ps1` 한 번으로 묶어 UAC를 한 번만 띄운다. 띄우기 전에 "UAC 창이 뜨면 예를 누르라"고 먼저 알린다.
- 시스템 PATH(HKLM)는 건드리지 않는다. 문제가 있으면 보고만 한다.

## 모드

| 인수 | 동작 |
| --- | --- |
| (없음) | 1 진단 → 2 판정표 → 3 승인 → 4 정비 → 5 보고 |
| `진단만` · `diagnose` | 1~2만 하고 끝낸다 |
| `검증` · `verify` | 재부팅 뒤 **새 터미널 탭**에서 연 세션에서 쓴다. 1~2를 다시 하고 `fix.md` 「3. 최종 검증」을 실행한다 |

## 1. 진단

PowerShell 도구로 실행한다.

```
pwsh -NoProfile -ExecutionPolicy Bypass -File "${CLAUDE_SKILL_DIR}\scripts\diagnose.ps1"
```

- `pwsh`가 없으면 같은 인수로 `powershell.exe`를 쓴다(스크립트는 5.1 호환이다).
- 실행 정책에 막히면 우회하지 말고 멈춰서 보고한다.

## 2. 판정표

출력의 `키=값`을 아래 기준으로 판정해 `항목 | 현재 값 | 판정 | 대응` 표로 보고한다. 문제없는 항목은 "정상"으로 한 줄씩 남긴다.

| 항목 | 출력 키 | 문제로 보는 조건 | 대응 (`fix.md` 절) |
| --- | --- | --- | --- |
| PowerShell 7 | `cmd=pwsh…` | 줄이 없다 | 2-0 |
| Windows Terminal · Git | `wtSettingsExists` `gitBash` | `False` | 2-0 |
| 터미널 설정 GUID | `wtFile=settings.json … invalidGuids=` | 1 이상 — 설정 전체 로드가 실패해 5.1로 뜬다 | 2-1 |
| 터미널 기본 프로필 | `defaultProfile=` | `{574e775e-4f2a-5b96-ac1e-a2962a402336}`가 아니다. 단 `{2abe14b1-3ba0-4c58-a9fb-be8d46a9361a}`(2-9 관리자 프로필)이면 정상 | 2-1 |
| 사용자 PATH | `user [exists=False]` `userPathKind` | `%`가 없는 항목이 `exists=False` · `scratchpad` 경로 · 대소문자나 끝 `\`만 다른 중복 · `userPathKind`가 `ExpandString`이 아님 | 2-2 |
| `.local\bin` | `localBinClaudeExe` `localBinInUserPath` | `True`인데 `False` | 2-2 (`-AddLocalBin`) |
| 개발자 모드 · 긴 경로 · sudo | `devMode` `longPaths` `sudoEnabled` | 각각 `1` · `1` · `3`(normal)이 아니다 | 2-3 |
| git 긴 경로 | `gitLongPaths` | `true`가 아니다 | 2-3 |
| sudo 동작 | (2-3 이후) | — | 2-4 |
| `!` 명령 셸 | `defaultShell` | 비어 있고 사용자가 PowerShell 명령을 주로 쓴다 | 2-5 |
| CLI 도구 | `jq` `fd` `gh` · `upgradable=` | `NOT FOUND` 또는 업그레이드 대상 | 2-6 |
| Git 업데이트 | `upgradable=…Git.Git` | 있음 | 2-7 (사용자가 직접) |
| 디스크 | `volume=C … freeGB` `vhdx=` | C: 여유 30GB 미만 + vhdx 있음 + 다른 드라이브 여유 | 2-8 (사용자가 직접) |
| claude 중복 설치 | `claudePath=` | 2줄 이상 | 어느 쪽을 남길지 사용자에게 묻는다 |
| 관리자 기본 프로필 (선택) | `defaultProfile` `ConsentPromptBehaviorAdmin` | 문제 아님. **사용자가 요청할 때만** 제안한다 | 2-9 |

고치지 않는 것(정상 동작):

- `group=` 줄에 `S-1-5-32-544`(Administrators, deny only)와 `S-1-16-8192`(Medium)가 함께 있다 → 관리자 계정이 UAC 필터 토큰으로 도는 것이다. Claude Code는 관리자 권한이 필요 없다. 일반 권한 터미널 + `sudo`가 권장 운용이다.
- `group=` 줄이 `S-1-16-12288`(High)이고 `defaultProfile`이 `{2abe14b1-…}`다 → 2-9를 적용한 PC다. 되돌리라고 권하지 않는다.
- `pwshMsiExists=False`인데 `pwshMsixVersion`이 있다 → PowerShell 7.7부터 winget 배포가 MSIX다. 재설치하지 않는다.
- `hibernateEnabled=0`인데 `hiberfil=True` → 최대 절전은 이미 꺼져 있다. 재부팅 후 파일이 지워지는지 확인한다.
- `WT_PROFILE_ID={61c54bbd-c2c6-5271-96e7-009a87ff44bf}` → 지금 탭이 Windows PowerShell 5.1 프로필로 뜬 상태라는 단서일 뿐이다. Claude Code의 PowerShell 도구는 부모 셸과 무관하게 `pwsh.exe`를 찾는다.
- `wtFile=settings.json.bak…` 줄은 백업 후보다. `invalidGuids=0`인 백업이 2-1 방법 A의 재료다.
- `elevateTrue` 1 이상(관리자 프로필) → 별도 창으로 뜨고 끌어다 놓기가 막힌다(UIPI). Windows 설계다.
- `machine [exists=False]` → 보고만 한다.
- 메이저 버전이 바뀌는 업그레이드(예: Node 24 → 26)는 기본으로 하지 않고 묻는다.

인수가 `진단만`(`diagnose`)이면 여기서 끝낸다.

## 3. 승인

대응이 필요한 항목을 번호 목록으로 한 번에 묻는다. 관리자 권한(UAC)이 필요한 항목과 사용자가 직접 해야 하는 항목(2-7·2-8)은 표시한다. **승인한 번호만** 실행한다.

2-9는 사용자가 "관리자로 뜨게", "이 PC처럼 관리자 프로필로" 같이 요청했을 때만 목록에 넣는다. 넣을 때는 `fix.md` 2-9의 「감수할 점」을 먼저 보여 주고, UAC 무확인(`-ConsentNoPrompt`)은 프로필과 **따로** 묻는다.

## 4. 정비

`${CLAUDE_SKILL_DIR}/references/fix.md`를 읽고 승인된 절만 2-0 → 2-1 → 2-2 → 2-3 → 2-4 → 2-5 → 2-6 → 2-9 순서로 실행한다. 각 절의 검증까지 마친 뒤 다음 절로 간다. 2-7·2-8은 실행하지 않고 안내만 한다. 예상과 다른 결과가 나오면 `fix.md` 「5. 알려진 함정」을 먼저 본다.

## 5. 보고

- `항목 | 전 | 후 | 검증` 표.
- 남은 일: 재부팅, 새 터미널 탭, 사용자가 직접 할 항목, 재부팅 뒤 `/dandi-win-setup:win-setup 검증`(`verify`).
- 백업 위치와 `fix.md` 「4. 되돌리기」.

## 범위 밖 (요청이 있을 때만)

- TEMP·휴지통·고아 프로세스 정리: `/dandi-pc-clean:pc-clean`(설치돼 있으면).
- Defender 예외 등록: 보안 수준을 낮추므로 기본으로 하지 않는다.
- PowerShell 프로필(`$PROFILE`) 작성, 시작 프로그램 조정, `.wslconfig` 메모리 제한, 메이저 버전 업그레이드.
- 샌드박스: 네이티브 Windows는 미지원이다. 필요하면 WSL2에서 Claude Code를 실행한다.
- gsudo 같은 대체 도구를 임의로 설치하지 않는다.
