# win-setup 정비 절차

- SKILL.md 4단계에서 승인된 항목의 절만 읽고 실행한다.
- `<SKILL_DIR>`는 SKILL.md가 알려준 스킬 폴더 절대 경로로 바꿔 쓴다.
- 백업은 `%LOCALAPPDATA%\win-setup\backup\`, 로그는 `%LOCALAPPDATA%\win-setup\logs\`(확장자 `.txt`).

## 2. 정비 (해당하는 항목만, 승인 후)

## 2-0. 기본 구성요소 설치

검증 환경에서 실행해 보지 않은 절이다. 명령 결과가 예상과 다르면 멈추고 보고한다.

진단에서 없다고 나온 것만 설치한다.
```powershell
winget install --id Microsoft.PowerShell -e --source winget
winget install --id Microsoft.WindowsTerminal -e --source winget
winget install --id Git.Git -e --source winget
```

PowerShell 7을 새로 설치했으면 새 터미널 탭에서 Claude Code를 다시 열고 `/dandi-win-setup:win-setup`을 처음부터 다시 실행한다.

## 2-1. Windows Terminal 설정 복구

방법 A: 유효한 백업이 있으면 그 백업으로 교체한다(가장 안전하다).
```powershell
$ls = "$env:LOCALAPPDATA\Packages\Microsoft.WindowsTerminal_8wekyb3d8bbwe\LocalState"
Copy-Item "$ls\settings.json" "$ls\settings.json.bak-$(Get-Date -Format yyyyMMdd)-broken"
Copy-Item "$ls\<유효한 백업 파일>" "$ls\settings.json" -Force
```

방법 B: 백업이 없거나 깨진 프로필을 유지하고 싶으면, 깨진 GUID만 새 GUID로 바꾼다. 같은 GUID를 참조하는 `actions`·`newTabMenu` 항목도 함께 바꾼다.
```powershell
$new = "{$([guid]::NewGuid())}"; $new   # 이 값으로 깨진 GUID 문자열을 Edit 도구로 치환한다
```

- 기본 프로필을 PowerShell 7로 지정한다: `"defaultProfile": "{574e775e-4f2a-5b96-ac1e-a2962a402336}"`.
- 사용자가 "일반 터미널 + sudo" 방식을 고르면 관리자 프로필(`elevate: true`)은 만들지 않는다.

검증(`state.json`이 아니라 실제 프로세스로 확인한다):
```powershell
$j = Get-Content "$ls\settings.json" -Raw | ConvertFrom-Json
"invalid=$(@($j.profiles.list | Where-Object { $g=[guid]::Empty; -not [guid]::TryParse($_.guid,[ref]$g) }).Count)"   # 0
wt.exe -w 0 new-tab; Start-Sleep 4
Get-CimInstance Win32_Process | Where-Object { $_.Name -match '^(pwsh|powershell)\.exe$' } | ForEach-Object {
  $par = Get-CimInstance Win32_Process -Filter "ProcessId=$($_.ParentProcessId)"
  if($par.Name -eq 'WindowsTerminal.exe'){ "{0} {1:HH:mm:ss} {2}" -f $_.Name,$_.CreationDate,$_.ExecutablePath } }
# 방금 시각의 프로세스가 pwsh.exe면 통과. 사용자에게 설정 오류 대화상자가 없었는지도 확인한다.
```

## 2-2. 사용자 PATH 정리

번들 스크립트 `<SKILL_DIR>\scripts\fix-path.ps1`을 쓴다. 기본은 dry-run이다.

1. dry-run:
   ```powershell
   pwsh -NoProfile -ExecutionPolicy Bypass -File "<SKILL_DIR>\scripts\fix-path.ps1"
   ```
   진단에서 `localBinClaudeExe=True`·`localBinInUserPath=False`였으면 `-AddLocalBin`을 붙인다.
2. `--- remove ---` 목록을 사용자에게 보여 주고 승인받는다. 남길 항목이 있으면 `-Keep '경로1;경로2'`를 붙인다.
3. 같은 인수에 `-Apply`를 붙여 다시 실행한다 → `APPLIED kind=ExpandString backup=...`을 확인한다.

- **반드시 `ExpandString`으로 쓴다.** `[Environment]::SetEnvironmentVariable('Path',...,'User')`는 형식을 `String`으로 바꿔 `%USERPROFILE%` 항목을 깨뜨린다. `fix-path.ps1`은 레지스트리 API로 `ExpandString`을 지정한다.
- 존재하지 않아도 남겨야 하는 표준 경로(`%USERPROFILE%\.dotnet\tools` 등)는 `%`가 든 항목이라 유지된다. 절대 경로로 적힌 표준 경로가 있으면 사용자에게 묻는다.
- 시스템 PATH(HKLM)는 건드리지 않는다. 문제가 있으면 보고만 한다.
- 검증: dry-run을 다시 실행해 `NO CHANGE`가 나오는지 확인한다.

## 2-3. 관리자 설정 일괄 적용 (UAC 1회)

번들 스크립트 `<SKILL_DIR>\scripts\admin-setup.ps1`을 쓴다. 진단에서 해당하는 스위치만 붙인다: `-DevMode`(devMode≠1) `-LongPaths`(longPaths≠1) `-Sudo`(sudoEnabled≠3) `-HibernateOff`(hibernateEnabled=1이고 사용자가 원할 때만) `-ConsentNoPrompt`(2-9 4번을 따로 승인했을 때만).

실행:
```powershell
$dir = Join-Path $env:LOCALAPPDATA 'win-setup\logs'; New-Item -ItemType Directory -Force $dir | Out-Null
$log = Join-Path $dir 'admin-setup.txt'
$script = '<SKILL_DIR>\scripts\admin-setup.ps1'
# 필요한 스위치만 남긴다. 경로는 공백에 대비해 따옴표를 직접 넣는다.
Start-Process powershell.exe -Verb RunAs -Wait -ArgumentList '-NoProfile','-ExecutionPolicy','Bypass','-File',"`"$script`"",'-DevMode','-LongPaths','-Sudo','-LogPath',"`"$log`""
git config --global core.longpaths true
```

- 승격 실행기는 `powershell.exe`(5.1, `System32`)를 쓴다. 항상 있고 MSIX 별칭 승격 문제를 피한다.
- `-Wait`는 사용자가 UAC에 응답할 때까지 멈춘다. 도구 시간 제한에 걸려 백그라운드로 넘어가면 사용자에게 UAC 창(작업 표시줄의 방패 아이콘)을 확인하라고 안내하고 완료 알림을 기다린다. **같은 명령을 다시 실행하지 않는다.**
- sudo `normal`(인라인) 모드여야 결과가 같은 콘솔로 돌아와 Claude가 출력을 읽는다.

검증:
```powershell
Get-Content $log                 # elevated=True
"dev=$((Get-ItemProperty 'HKLM:\SOFTWARE\Microsoft\Windows\CurrentVersion\AppModelUnlock').AllowDevelopmentWithoutDevLicense)"   # 1
"long=$((Get-ItemProperty 'HKLM:\SYSTEM\CurrentControlSet\Control\FileSystem').LongPathsEnabled)"                               # 1
"sudo=$((Get-ItemProperty 'HKLM:\SOFTWARE\Microsoft\Windows\CurrentVersion\Sudo').Enabled)"                                     # 3 (normal)
$b = Join-Path $env:LOCALAPPDATA 'win-setup\backup'; New-Item -ItemType Directory -Force $b | Out-Null
New-Item -ItemType SymbolicLink -Path "$b\_symtest" -Target $dir | Out-Null; (Get-Item "$b\_symtest").LinkType; Remove-Item "$b\_symtest"   # SymbolicLink
```

## 2-4. sudo 동작 확인

```powershell
sudo cmd /c "whoami /groups | findstr S-1-16-12288"
```
- UAC 창이 뜬다고 먼저 알린다.
- 통과: `Mandatory Label\High Mandatory Level ... S-1-16-12288`. Claude Code 도구 안에서도 출력이 돌아온다(검증 환경에서 확인).
- 실패해도 gsudo 같은 대체 도구를 임의로 설치하지 않는다.

## 2-5. `!` 명령 셸을 PowerShell로

편집 전에 백업한다(폴더가 없으면 먼저 만든다):
```powershell
New-Item -ItemType Directory -Force (Join-Path $env:LOCALAPPDATA 'win-setup\backup') | Out-Null
Copy-Item "$env:USERPROFILE\.claude\settings.json" (Join-Path $env:LOCALAPPDATA "win-setup\backup\claude-settings-$(Get-Date -Format yyyyMMdd-HHmmss).json")
```

`%USERPROFILE%\.claude\settings.json` 최상위에 한 줄만 추가한다. 다른 키는 건드리지 않는다.
```json
"defaultShell": "powershell",
```
- 이 키는 `!` 명령만 바꾸고 PowerShell 도구가 켜져 있어야 동작한다(Git Bash가 없는 Windows는 자동으로 켜지고, 있으면 claude.ai·Console 계정에서 기본으로 켜진다 — Amazon Bedrock·Google Cloud Agent Platform·Microsoft Foundry 세션은 `CLAUDE_CODE_USE_POWERSHELL_TOOL=1`).

검증: `(Get-Content "$env:USERPROFILE\.claude\settings.json" -Raw | ConvertFrom-Json).defaultShell` → `powershell`. 다음 세션에서 `! $PSVersionTable.PSVersion`.

## 2-6. CLI 도구 설치·업데이트 (2-3 이후)

```powershell
$a = '--accept-package-agreements','--accept-source-agreements','--disable-interactivity'
winget install --id jqlang.jq -e --source winget @a
winget install --id sharkdp.fd -e --source winget @a
winget upgrade --id GitHub.cli -e --source winget @a     # MSI라 UAC가 뜰 수 있다
```
- 포터블 패키지는 `%LOCALAPPDATA%\Microsoft\WinGet\Links`를 사용자 PATH에 추가한다. 정상 항목이다.
- 새 PATH는 **새 터미널 탭**부터 적용된다. 현재 세션에서 `jq`가 안 잡혀도 실패가 아니다. `winget list --id jqlang.jq -e`로 확인한다.
- 설치 후 사용자 PATH를 다시 읽어 2-2에서 정리한 상태가 유지되는지 확인한다.

## 2-7. Git for Windows 업데이트 (사용자가 직접 수행)

Claude Code가 Git Bash를 쓰는 중이면 파일 잠금으로 실패한다. Claude는 실행하지 않고 안내만 한다.
1. 모든 Claude Code 세션과 Claude 데스크톱 앱을 닫는다.
2. 새 터미널 탭에서 `winget upgrade --id Git.Git -e --source winget`을 실행한 뒤 `git --version`으로 확인한다.

## 2-8. Docker 디스크 이미지 이동 (사용자가 직접 수행)

Docker Desktop → Settings → Resources → Advanced → Disk image location을 여유 있는 드라이브(예: `D:\Programs\DockerData`)로 지정하고 Apply & restart를 누른다.
검증: `Test-Path "$env:LOCALAPPDATA\Docker\wsl\disk\docker_data.vhdx"` → `False`.

## 2-9. 관리자 기본 프로필 (선택 — 사용자가 요청할 때만)

새 탭이 처음부터 관리자 권한 PowerShell 7로 뜨게 한다. 스킬의 권장 운용(일반 권한 + `sudo`)과 반대라 기본으로 제안하지 않는다.

감수할 점 (승인 전에 사용자에게 보여 준다):
- Claude Code가 실행하는 모든 명령이 관리자 권한으로 돈다. 잘못된 명령 하나가 `Program Files`·HKLM 레지스트리 같은 시스템 전체를 바꿀 수 있다.
- 관리자로 만든 파일·폴더(npm 전역, 캐시 등)를 나중에 일반 권한 프로그램이 고치지 못할 수 있다.
- `-ConsentNoPrompt`(UAC 무확인)는 Claude Code만이 아니라 **PC의 모든 프로그램**이 관리자 권한을 묻지 않고 얻게 한다. 이것이 가장 크게 보안을 낮춘다. 빼면 새 탭마다 UAC 창이 뜬다.

전제: `sudoEnabled=3`(normal). 아니면 2-3 `-Sudo`를 먼저 한다. `--inline`은 normal 모드에서만 같은 창으로 돈다.

1. 백업한다.
   ```powershell
   $ls = "$env:LOCALAPPDATA\Packages\Microsoft.WindowsTerminal_8wekyb3d8bbwe\LocalState"
   $b = Join-Path $env:LOCALAPPDATA 'win-setup\backup'; New-Item -ItemType Directory -Force $b | Out-Null
   Copy-Item "$ls\settings.json" "$b\wt-settings-$(Get-Date -Format yyyyMMdd-HHmmss).json"
   ```
2. Edit 도구로 `settings.json`의 `profiles.list`에 아래 객체를 추가한다. 같은 `guid`가 이미 있으면 추가하지 않는다. 파일 전체를 `ConvertTo-Json`으로 다시 쓰지 않는다(주석·순서가 사라진다).
   ```json
   {
       "commandline": "%SystemRoot%\\System32\\sudo.exe --inline -E \"%LOCALAPPDATA%\\Microsoft\\WindowsApps\\Microsoft.PowerShell_8wekyb3d8bbwe\\pwsh.exe\"",
       "guid": "{2abe14b1-3ba0-4c58-a9fb-be8d46a9361a}",
       "hidden": false,
       "icon": "ms-appx:///ProfileIcons/pwsh.png",
       "name": "PowerShell (관리자)"
   },
   ```
   - GUID는 PC마다 같은 값을 쓴다. 진단 판정표가 이 값으로 2-9 적용 PC를 알아본다.
   - `pwsh.exe` 경로는 MSIX 별칭이다. 진단의 `cmd=pwsh.exe` 줄에 이 경로가 없으면 멈추고 보고한다.
3. 같은 파일의 `"defaultProfile"` 값을 `{2abe14b1-3ba0-4c58-a9fb-be8d46a9361a}`로 바꾼다.
4. (사용자가 따로 승인했을 때만) UAC 무확인. 2-3과 같은 방식으로 UAC 1회를 띄운다. 2-3과 함께 하면 스위치를 한 번에 묶는다.
   ```powershell
   $dir = Join-Path $env:LOCALAPPDATA 'win-setup\logs'; New-Item -ItemType Directory -Force $dir | Out-Null
   $log = Join-Path $dir 'admin-setup.txt'
   $script = '<SKILL_DIR>\scripts\admin-setup.ps1'
   Start-Process powershell.exe -Verb RunAs -Wait -ArgumentList '-NoProfile','-ExecutionPolicy','Bypass','-File',"`"$script`"",'-ConsentNoPrompt','-LogPath',"`"$log`""
   Get-Content $log   # elevated=True · ConsentNoPrompt=True
   ```

검증:
```powershell
$j = Get-Content "$ls\settings.json" -Raw | ConvertFrom-Json
"default=$($j.defaultProfile)"                                    # {2abe14b1-...}
"consent=$((Get-ItemProperty 'HKLM:\SOFTWARE\Microsoft\Windows\CurrentVersion\Policies\System').ConsentPromptBehaviorAdmin)"   # 0 (4번을 했을 때)
```
그다음 사용자에게 새 탭을 열어 `whoami /groups | findstr S-1-16-12288`을 실행하게 한다. `High Mandatory Level`이 나오고 설정 오류 대화상자가 없으면 통과다.

---

## 3. 최종 검증 (재부팅 후 새 터미널 탭에서)

```powershell
$PSVersionTable.PSVersion          # 7.x
$env:WT_PROFILE_ID                 # {574e775e-4f2a-5b96-ac1e-a2962a402336}, 2-9를 했으면 {2abe14b1-3ba0-4c58-a9fb-be8d46a9361a}
claude --version
git --version; gh --version; jq --version; fd --version
sudo cmd /c "whoami /groups | findstr S-1-16-12288"
bash --version 2>&1 | Select-Object -First 2      # 'Failed to translate' 경고 없음
Test-Path C:\hiberfil.sys                          # 최대 절전을 끈 경우 False
(Get-Volume C).SizeRemaining / 1GB
```

## 4. 되돌리기

| 항목 | 방법 |
|---|---|
| 터미널 설정 | `settings.json.bak-<날짜>-broken`을 `settings.json`으로 복사 |
| 사용자 PATH | `fix-path.ps1 -RestoreFrom "<백업 파일>" -Apply` |
| 개발자 모드·긴 경로 | `reg add <같은 키> /v <같은 값> /t REG_DWORD /d 0 /f` (관리자) |
| sudo | `sudo config --disable` (관리자) |
| 최대 절전 | `powercfg /h on` (관리자) |
| `defaultShell` | `settings.json`에서 해당 줄 삭제, 또는 `backup\claude-settings-*.json` 복원 |
| 관리자 기본 프로필 | `defaultProfile`을 `{574e775e-4f2a-5b96-ac1e-a2962a402336}`로 되돌림, 또는 `backup\wt-settings-*.json` 복원 |
| UAC 무확인 | `reg add "HKLM\SOFTWARE\Microsoft\Windows\CurrentVersion\Policies\System" /v ConsentPromptBehaviorAdmin /t REG_DWORD /d 5 /f` (관리자, Windows 기본값 5) |

## 5. 알려진 함정

| 증상 | 원인 | 대응 |
|---|---|---|
| PowerShell 7로 설정했는데 5.1이 뜸 | 터미널 프로필 GUID 하나가 16진수가 아니어서 설정 전체 로드 실패 | 1-2로 GUID를 검사하고 2-1로 복구 |
| 터미널이 관리자가 아님 | UAC 필터 토큰 (정상) | 일반 권한 + `sudo` |
| 관리자 창에 파일을 끌어다 놓을 수 없음 | UIPI (Windows 설계) | 관리자 창을 쓰지 않는다 |
| `.log` 파일을 Claude가 못 읽음, `Test-Path`도 막힘 | `Read(**/*.log)` 같은 deny 규칙 | 로그는 `.txt`로 |
| `Start-Process -Verb RunAs -Wait`가 시간 초과 | 사용자가 UAC 창을 못 봄 | 방패 아이콘을 안내하고 재실행하지 않는다 |
| 복구 후에도 `state.json`이 그대로 | 내용 해시가 같으면 다시 쓰지 않음 | 프로세스로 검증 |
| `/h off` 후에도 `hiberfil.sys`가 남음 | 이미 꺼진 상태에서 남은 파일 | 재부팅 후 확인 |
| WSL bash가 `Failed to translate 'Q:\...'` 경고 | PATH에 없는 드라이브 항목 | 2-2 |
| PATH의 `%USERPROFILE%`가 깨짐 | `SetEnvironmentVariable`이 `String`으로 저장 | 레지스트리 API로 `ExpandString` 지정 |
| 승격 스크립트의 한글이 깨짐 | 5.1이 BOM 없는 UTF-8을 ANSI로 읽음 | 스크립트는 ASCII만 |
