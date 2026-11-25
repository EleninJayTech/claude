# Windows 터미널 구성 설치 — Claude Code가 읽고 진행하는 문서

> 기준일 **2026-11-25** · 원본 「Claude Code Windows 터미널 따라하기」(통합본, 기준일 2026-11-24)의 설치·설정 단계를 Claude Code가 실행할 수 있게 옮겼다.
> **단디 통합 설치(00 문서·`/dropin-apply`)에 들어가지 않는 독립 문서다.** 사용자가 이 문서를 가리키며 요청할 때만 진행한다. 소개와 사용법은 사람용 페이지 `pages/terminal.html`(한국어 `pages/terminal.ko.html`)이 맡는다.
> 호출: `https://raw.githubusercontent.com/EleninJayTech/claude/main/terminal-setup.md` 를 읽고 "이 PC에 터미널 구성을 진행해 줘"라고 요청한다. 본문은 **프로젝트 밖 임시 폴더에 바이트 그대로** 받는다(`curl`/`Invoke-WebRequest` — WebFetch는 요약 도구라 쓰지 않는다).

## 0. 규칙 (먼저 읽는다)

1. **순서**: 진단(읽기 전용) → 판정표 보고 → 항목별 승인 → 적용 → 검증 → 보고. 판정표 보고 전에 아무것도 바꾸지 않는다.
2. **읽기 전용 점검 명령만 승인 없이 실행한다.** 설치·설정 변경·파일 수정은 항목마다 사용자에게 한 번 묻고 승인된 것만 한다. 일괄 승인("다 해줘")이 와도 아래 **승인 게이트**(§2)는 항목마다 따로 묻는다.
3. **파일 전체를 덮어쓰지 않는다.** `settings.json`(Claude Code·Windows Terminal 둘 다)과 `$PROFILE`·`~/.tmux.conf`는 **고치기 전에 백업**하고, 기존 내용이 있으면 **필요한 키·블록만 합친다.** JSON은 엄격해서 주석과 끝 쉼표가 있으면 오류가 난다.
4. 설치·설정 명령과 설정 조각은 **원문 그대로** 쓴다. 문서에 없는 명령으로 바꾸지 않는다. 막히면 §6으로 가고, 거기에도 없으면 멈추고 사용자에게 알린다.
5. 각 단계의 **완료 조건**을 실행해 출력을 증거로 보고한다. 기대 출력이 아니면 다음 단계로 가지 않는다.
6. **시크릿은 읽지 않는다**(`.env`·키·인증서). 이 문서의 어떤 단계도 필요로 하지 않는다.
7. 문서가 **미확인**이라고 표시한 항목은 확인된 것처럼 보고하지 않는다. 마지막 보고에 미확인 목록(§8)을 그대로 싣는다.
8. 한 단계가 실패하면 그 뒤 의존 단계를 건너뛰고 사유를 보고한다. 기본 구성(Windows Terminal + PowerShell 7)은 어떤 경우에도 바꾸지 않는다.

## 1. 진단 (읽기 전용 — 승인 불필요)

PowerShell 7 창에서 실행한다. **`pwsh`가 아니면(5.1) 7부터 안내하고 멈춘다.**

```powershell
$PSVersionTable.PSVersion
winget --version
git --version
claude --version
Get-Command psmux,yazi,zoxide,eza,lazygit -ErrorAction SilentlyContinue | Select-Object Name,Source
Test-Path $PROFILE
Test-Path $HOME\.tmux.conf
[Environment]::OSVersion.Version
```

**회사 PC 사전 점검**(개인 PC면 건너뛴다. 모두 읽기 전용):

```powershell
# 1) 관리자 여부
([Security.Principal.WindowsPrincipal][Security.Principal.WindowsIdentity]::GetCurrent()).IsInRole([Security.Principal.WindowsBuiltInRole]::Administrator)

# 2) 스크립트 실행 정책: MachinePolicy 또는 UserPolicy에 값이 있으면 회사가 강제한 것
Get-ExecutionPolicy -List

# 3) 쓸 수 있는 패키지 매니저
Get-Command winget,scoop,choco -ErrorAction SilentlyContinue | Select-Object Name,Source

# 4) GitHub 접근
try { (Invoke-WebRequest https://github.com -Method Head -UseBasicParsing).StatusCode } catch { "GitHub 차단: $($_.Exception.Message)" }

# 5) 프록시
netsh winhttp show proxy
$env:HTTPS_PROXY
```

**단디 적용 여부**(프로젝트 폴더에서):

```powershell
Select-String -Path .\CLAUDE.md, $HOME\.claude\CLAUDE.md -Pattern '^dropin-applied' -ErrorAction SilentlyContinue
```

줄이 하나라도 나오면 **단디 적용 PC**다. §5의 경계 규칙을 따른다.

### 판정표 — 진단 결과를 이렇게 대입해 보고한다

| 항목 | 판정 |
| --- | --- |
| PC 유형 | **개인 / 회사** — 사용자에게 묻는다(회사 PC면 §2 첫 줄의 사내 정책 확인이 먼저) |
| 단디 | 적용됨 / 없음 |
| 도구별 상태 | psmux·yazi·zoxide·eza·lazygit — 설치됨(버전) / 없음 |
| 설치 경로 | 아래 A·B·C 중 하나 |
| 기존 파일 | `$PROFILE`·`~/.tmux.conf`·`~/.claude/settings.json`·Windows Terminal `settings.json` — 있음 / 없음 |

**설치 경로**(§3 S4에서 쓴다):

| 점검 결과 | 경로 | 뜻 |
| --- | --- | --- |
| 개인 PC이고 winget이 있음 | **winget** | S4의 winget 블록 |
| Scoop 사용이 허용되고, 실행 정책이 MachinePolicy/UserPolicy에서 Restricted·AllSigned로 강제되지 않음 | **A. Scoop** | 사용자 범위 설치. 프로필과 별칭 모두 사용 |
| 실행 정책이 강제됐거나 Scoop 불허, GitHub에서 zip은 받을 수 있음 | **B. zip** | 압축만 풀어 사용자 PATH에 등록. 프로필이 막히면 별칭은 .cmd 파일로 |
| 서명 없는 exe가 실행 차단되거나 GitHub가 막힘 | **C. 최소 구성** | 도구 설치를 건너뛰고 Claude Code 자체 기능만 사용 |

서명 없는 exe가 막히는지는 미리 알기 어렵다. A나 B로 설치한 뒤 S5 테스트에서 실행이 거부되면 C로 내려간다.

판정표를 보고하고, 진행할 단계를 **사용자가 고르게** 한다(S1~S16 중 기본은 S1~S9, 나머지는 선택).

## 2. 승인 게이트 — 항목마다 따로 묻는다

| 게이트 | 이유 |
| --- | --- |
| **회사 PC: 사내 정책 확인** | 설치 전에 사용자에게 소프트웨어 설치·원격 접속 정책을 확인했는지 묻는다. 확인하지 않았으면 진행하지 않는다 |
| `irm … \| iex` 설치(S2 Claude Code, 경로 A의 Scoop) | 받은 스크립트를 바로 실행한다. 서명 확인(S2)을 함께 한다. 보안 솔루션이 막으면 **우회하지 말고** 서명자 확인 절차를 근거로 보안팀에 예외를 요청하도록 안내한다 |
| `Set-ExecutionPolicy -Scope CurrentUser RemoteSigned` | 실행 정책 변경. 회사가 강제한 값(MachinePolicy/UserPolicy)은 바꿀 수 없고 바꾸려 하지 않는다 |
| `-ExecutionPolicy Bypass` | 이 문서는 쓰지 않는다. 필요해 보이면 멈추고 사용자에게 알린다 |
| OpenSSH Server 설치와 `administrators_authorized_keys`(S12) | 원격에서 PC로 들어오는 경로를 연다. 관리자 PowerShell이 필요하다 |
| 보안 SW 예외 추가 | 사용자가 보안 SW에서 직접 한다. Claude는 대신 설정하지 않는다 |
| Remote Control(S12) | **대화가 Anthropic 서버를 거친다.** 회사 PC는 조직 정책이 허용하는지 먼저 확인한다 |
| 사용자 PATH 변경(경로 B) | 환경 변수 영구 변경 |

## 3. 단계

각 단계는 **조건 → 명령 → 완료 조건 → 되돌리기** 순이다. 되돌리기는 §7에 모아 두었고 각 단계에는 요점만 적었다.

### S1. 단디 상태 확인과 settings 백업 (단디 적용 PC)

```powershell
Copy-Item $HOME\.claude\settings.json $HOME\.claude\settings.json.bak-ccguide
```

- 완료 조건: `Test-Path $HOME\.claude\settings.json.bak-ccguide` 가 `True`.
- 세션 안에서 `/dropin-check`(읽기 전용)로 최신 상태를 본다. 차이가 나오면 이 문서를 진행하기 전에 `/dropin-apply`를 먼저 권한다.
- 백업은 S14의 대조와 되돌리기에 쓴다. 단디 PC가 아니어도 `settings.json`을 고칠 예정이면 같은 백업을 만든다(파일이 없으면 건너뛴다).

### S2. Claude Code 설치 방식 확인

네이티브 설치본을 쓴다. 관리자 권한이 필요 없고 백그라운드로 자동 업데이트된다. winget 설치본은 자동 업데이트가 꺼져 있고, 세션이 떠 있는 동안에는 업그레이드가 실패할 수 있다. **이미 `claude --version`이 나오면 설치 명령은 건너뛰고 확인만 한다.**

```powershell
irm https://claude.ai/install.ps1 | iex

# 설치 확인
claude --version
Get-AuthenticodeSignature (Get-Command claude).Source   # 서명자: Anthropic, PBC
claude doctor
```

- 회사 PC에서 PowerShell 설치가 막히면 CMD에서 `curl -fsSL https://claude.ai/install.cmd -o install.cmd && install.cmd && del install.cmd`.
- 보안 솔루션이 `irm | iex` 패턴을 막으면 서명자 확인 절차를 근거로 보안팀에 예외를 요청한다(§2).
- 사설 인증서로 TLS를 검사하는 회사망이어도 Claude Code는 기본으로 Windows 신뢰 저장소를 읽는다.
- `claude doctor` 출력에서 Remote Control 항목을 적어 둔다(S12에서 쓴다).
- 완료 조건: `claude --version`이 버전을 출력하고, 서명자가 `Anthropic, PBC`.
- 되돌리기: 이 문서는 Claude Code 자체를 지우지 않는다.

### S3. Git Bash 연결 확인 (선택 · Git for Windows)

Git for Windows가 있으면 Claude Code가 명령 실행에 Git Bash(Bash 도구)를 쓰고, 없으면 PowerShell 도구로 대신한다. 모델이 만드는 명령은 대부분 bash 문법이라 Git Bash가 있으면 실패와 재시도가 줄어든다. 사용자가 보는 셸은 그대로 PowerShell 7이다.

Git이 없으면(개인 PC) 먼저 설치한다(회사 PC는 사내 정책 확인 뒤).

```powershell
winget install --id Git.Git -e
```

```powershell
Test-Path 'C:\Program Files\Git\bin\bash.exe'   # True면 설치된 것
```

새 터미널에서 `claude`를 띄워 “Bash 도구로 `echo $BASH_VERSION` 실행해 줘”라고 요청한다. 버전이 나오면 Claude가 Git Bash를 쓰고 있다.

**감지가 안 될 때만: 경로 지정 — 미확인.** Git을 기본 위치가 아닌 곳에 설치했으면 `~/.claude/settings.json`의 `env`에 경로를 합친다. JSON 안의 역슬래시는 두 번 쓴다. 이 환경 변수 이름은 2026-11 초 문서 기준이며 공식 문서에서 다시 확인하지 못했다.

```json
{
  "env": {
    "CLAUDE_CODE_GIT_BASH_PATH": "C:\\Program Files\\Git\\bin\\bash.exe"
  }
}
```

**Git Bash 탭을 따로 쓰고 싶으면(선택)**: Git 설치 마법사에서 “Add a Git Bash Profile to Windows Terminal”에 체크했다면 이미 있다. 없으면 Windows Terminal `settings.json`의 `profiles.list`에 추가한다.

```json
{
  "name": "Git Bash",
  "commandline": "%PROGRAMFILES%\\Git\\bin\\bash.exe -i -l",
  "icon": "%PROGRAMFILES%\\Git\\mingw64\\share\\git\\git-for-windows.ico",
  "startingDirectory": "%USERPROFILE%"
}
```

- Git Bash가 있어도 PowerShell 도구는 함께 켜져 있다. 레지스트리·서비스 같은 Windows 전용 작업은 Claude가 PowerShell로 처리한다.
- 완료 조건: `Test-Path 'C:\Program Files\Git\bin\bash.exe'`가 `True`이고 Bash 도구가 버전을 출력한다.
- 단디 PC: `env`는 단디가 정하지 않는 키다. 그 키 안에 이 항목만 합친다.

### S4. 도구 설치 — psmux · yazi · zoxide · eza · lazygit

§1 판정의 경로에 따라 **하나만** 진행한다. 이미 설치된 도구는 건너뛴다. 설치가 끝나면 터미널을 완전히 닫았다 다시 연다(PATH가 새 창부터 적용된다).

**개인 PC — winget**

```powershell
winget install psmux
winget install --id sxyazi.yazi -e
winget install ajeetdsouza.zoxide
winget install --id eza-community.eza -e
winget install -e --id=JesseDuffield.lazygit
```

**경로 A. Scoop (사용자 범위)**

```powershell
# 실행 정책이 Restricted나 Undefined일 때만 필요
Set-ExecutionPolicy -Scope CurrentUser RemoteSigned

Invoke-RestMethod -Uri https://get.scoop.sh | Invoke-Expression
scoop install git
scoop bucket add psmux https://github.com/psmux/scoop-psmux
scoop install psmux zoxide
scoop bucket add extras
scoop install lazygit
scoop search yazi
scoop search eza
```

yazi와 eza는 검색 결과에 나온 이름으로 `scoop install` 한다. 없으면 그 둘만 경로 B 방식으로 받는다.

**경로 B. zip을 풀어 사용자 PATH에 등록**

```powershell
$dst = "$env:LOCALAPPDATA\Programs\cli"
New-Item -ItemType Directory -Force $dst | Out-Null

function Get-LatestAsset($repo, $pattern) {
  $r = Invoke-RestMethod "https://api.github.com/repos/$repo/releases/latest"
  ($r.assets | Where-Object name -like $pattern | Select-Object -First 1).browser_download_url
}

$tools = @(
  @{ repo = 'psmux/psmux';            pattern = 'psmux-*-windows-x64.zip' },
  @{ repo = 'sxyazi/yazi';            pattern = 'yazi-x86_64-pc-windows-msvc.zip' },
  @{ repo = 'ajeetdsouza/zoxide';     pattern = 'zoxide-*-x86_64-pc-windows-msvc.zip' },
  @{ repo = 'eza-community/eza';      pattern = 'eza.exe_x86_64-pc-windows-gnu.zip' },
  @{ repo = 'jesseduffield/lazygit';  pattern = '*windows_x86_64.zip' }
)
foreach ($t in $tools) {
  $url = Get-LatestAsset $t.repo $t.pattern
  if (-not $url) { Write-Warning "자산을 찾지 못함: $($t.repo)"; continue }
  $zip = Join-Path $env:TEMP (Split-Path $url -Leaf)
  Invoke-WebRequest $url -OutFile $zip
  Expand-Archive $zip $dst -Force
}
# zip 안 하위 폴더의 exe를 한곳으로 모은다
Get-ChildItem $dst -Recurse -Filter *.exe | Where-Object DirectoryName -ne $dst | Move-Item -Destination $dst -Force

# 사용자 PATH에만 덧붙인다 (관리자 불필요)
$userPath = [Environment]::GetEnvironmentVariable('Path', 'User')
if ($userPath -notlike "*$dst*") {
  [Environment]::SetEnvironmentVariable('Path', "$userPath;$dst", 'User')
}
```

- “자산을 찾지 못함” 경고가 나온 도구는 해당 저장소의 Releases 페이지에서 Windows x64 zip 이름을 확인해 패턴을 고친다. **lazygit 패턴은 확인하지 못한 값이다.**
- ARM64 장비는 `x64`를 `arm64`로, `x86_64`를 `aarch64`로 바꾼다.

**경로 C. 최소 구성**: 이 단계와 S5·S6을 건너뛰고, S8 프로필의 psmux 부분(`tm`)도 쓰지 않는다. 세션 유지는 S11(agent view)이, 화면 분할은 Windows Terminal 패널이 맡는다.

- 완료 조건(새 터미널에서): `psmux -V`, `yazi --version`, `zoxide --version`, `eza --version`, `lazygit --version`이 각각 버전을 출력한다. 경로 B는 `$env:LOCALAPPDATA\Programs\cli`가 사용자 PATH에 있다.
- lazygit은 단디 03 §16(diff 검수 도구)도 설치하는 도구다. §16이 이미 적용돼 있으면 건너뛴다. 이 문서는 lazygit 설정 파일을 만들지 않는다.
- 되돌리기: §7 「도구」.

### S5. psmux 동작 테스트 — 건너뛰지 않는다

psmux는 2025년에 시작한 tmux 복제본이다. 보안 솔루션이 막거나 일부 옵션이 다르게 동작할 수 있어, 설정을 얹기 전에 기본 동작부터 확인한다.

```powershell
psmux -V
psmux new-session -d -s smoke
psmux send-keys -t smoke "echo ok" Enter
Start-Sleep -Seconds 1
psmux capture-pane -p -t smoke
psmux kill-session -t smoke
```

- 완료 조건: `capture-pane` 출력에 `ok`가 보인다. Claude가 다른 페인을 읽고 명령을 보낼 때 쓰는 바로 그 경로다.
- 실행이 거부되거나 출력이 비면 psmux를 포기하고 경로 C로 내려간다(S6·S8의 `tm`·S10 생략). `psmux kill-session -t smoke`로 테스트 세션을 정리한다.
- 되돌리기: 테스트 세션은 위 마지막 줄이 정리한다.

### S6. `~/.tmux.conf` 만들기

psmux는 `~/.psmux.conf`, `~/.psmuxrc`, `~/.tmux.conf`, `~/.config/psmux/psmux.conf` 순으로 처음 찾은 파일 하나를 읽는다. macOS와 같은 파일을 쓰려고 `~/.tmux.conf`에 둔다. 파일이 이미 있으면 백업(`Copy-Item $HOME\.tmux.conf $HOME\.tmux.conf.bak-ccguide`) 후 **아래 줄만 합친다.** 없으면 이 내용으로 만든다.

```
# prefix는 기본값 Ctrl+b 유지 (macOS와 동일)
set -g mouse on
set -g history-limit 100000
set -g base-index 1
setw -g pane-base-index 1
set -g renumber-windows on
set -g status-interval 5

# 페인 제목 표시 (Claude 세션 구분용)
set -g pane-border-status top
set -g pane-border-format " #{pane_index}:#{pane_title} "

setw -g mode-keys vi

# 분할: prefix | 와 prefix -
bind | split-window -h -c "#{pane_current_path}"
bind - split-window -v -c "#{pane_current_path}"

# 페인 이동: prefix h j k l
bind h select-pane -L
bind j select-pane -D
bind k select-pane -U
bind l select-pane -R

# 페인 이름 지정: prefix T
bind T command-prompt -p "pane title:" "select-pane -T '%%'"
```

- prefix는 `Ctrl+b`를 유지한다. `Ctrl+Space`·`Alt+hjkl`로 바꾸는 것은 권하지 않는다(PowerShell이 `Ctrl+Space`를 `MenuComplete`로, `Alt+h`를 `ShowParameterHelp`로 쓴다).
- 완료 조건: `psmux new-session -d -s test`로 띄운 뒤 `psmux ls`에 `test`가 보이고, `~/.psmux/config-warnings.log`에 새 경고가 없다. 경고가 난 줄은 주석 처리한다. 확인 뒤 `psmux kill-session -t test`.
- 실행 중인 세션은 설정을 다시 읽지 않는다: `psmux source-file $HOME\.tmux.conf`.
- 되돌리기: 이 문서로 처음 만든 파일이면 지우고, 합쳤다면 `.bak-ccguide`로 돌린다.

### S7. (단디 PC 전용) win-setup 진단

win-setup(03 §17)이 깔려 있으면 Claude 세션에서 `/win-setup 진단만`을 실행한다(플러그인 설치면 `/dandi-win-setup:win-setup 진단만`). 터미널 기본 프로필(PowerShell 7), 사용자 PATH, Git, jq·fd·gh 상태를 판정표로 보여 준다. 문제 항목만 승인해 정비한다.

- win-setup은 `$PROFILE`을 건드리지 않는다. S8과 겹치지 않는다.
- 회사 PC: 관리자 권한이 필요한 정비 항목(UAC 창이 뜨는 것)은 건너뛴다.
- win-setup이 깔려 있지 않으면 이 단계를 건너뛴다. 이 문서는 win-setup을 설치하지 않는다.

### S8. PowerShell 프로필에 별칭과 셸 통합 넣기

```powershell
if (!(Test-Path $PROFILE)) { New-Item -ItemType File -Force $PROFILE | Out-Null }
else { Copy-Item $PROFILE "$PROFILE.bak-ccguide" }
notepad $PROFILE
```

(Claude가 파일을 직접 편집할 수 있으면 `notepad` 대신 편집한다.) **기존 내용이 있으면 지우지 말고 아래를 끝에 붙인다.** 이미 `prompt` 함수나 oh-my-posh를 쓰고 있다면 맨 아래 「Windows Terminal 셸 통합」 부분은 빼고, Microsoft 셸 통합 문서의 Oh My Posh용 변형을 쓴다.

```powershell
# --- zoxide: z 폴더이름 ---
if (Get-Command zoxide -ErrorAction SilentlyContinue) {
  Invoke-Expression (& { (zoxide init powershell | Out-String) })
}

# --- eza: macOS와 같은 별칭 ---
if (Get-Command eza -ErrorAction SilentlyContinue) {
  Remove-Item Alias:ls -ErrorAction SilentlyContinue
  function ls { eza --group-directories-first @args }
  function ll { eza -l --git --group-directories-first @args }
  function la { eza -la --git --group-directories-first @args }
}
if (Get-Command lazygit -ErrorAction SilentlyContinue) { Set-Alias lg lazygit }
function y  { yazi @args }
function cc { claude --continue @args }
function ca { claude agents @args }

# --- psmux: 세션이 있으면 붙고 없으면 만든다 ---
function tm {
  param($n = 'main')
  psmux attach -t $n
  if ($LASTEXITCODE -ne 0) { psmux new-session -s $n }
}

# --- Windows Terminal 셸 통합 (OSC 133) ---
$Global:__LastHistoryId = -1
function Global:__Terminal-Get-LastExitCode {
  if ($? -eq $True) { return 0 }
  $LastHistoryEntry = $(Get-History -Count 1)
  $IsPowerShellError = $Error[0].InvocationInfo.HistoryId -eq $LastHistoryEntry.Id
  if ($IsPowerShellError) { return -1 }
  return $LastExitCode
}
function prompt {
  $gle = $(__Terminal-Get-LastExitCode)
  $LastHistoryEntry = $(Get-History -Count 1)
  $out = ""
  if ($Global:__LastHistoryId -ne -1) {
    if ($LastHistoryEntry.Id -eq $Global:__LastHistoryId) { $out += "`e]133;D`a" }
    else { $out += "`e]133;D;$gle`a" }
  }
  $loc = $($executionContext.SessionState.Path.CurrentLocation)
  $out += "`e]133;A$([char]07)"
  $out += "`e]9;9;`"$loc`"$([char]07)"
  $out += "PS $loc$('>' * ($nestedPromptLevel + 1)) "
  $out += "`e]133;B$([char]07)"
  $Global:__LastHistoryId = $LastHistoryEntry.Id
  return $out
}
```

**단디 PC**: 프로필 **맨 위**에 `if ($env:CLAUDECODE) { return }` 한 줄을 먼저 둔다. Claude Code가 띄운 셸에는 `CLAUDECODE=1`이 있어서, 훅(단디 `/compact` 게이트는 PowerShell로 돈다)이나 Claude의 셸이 프로필을 불러와도 `ls` 재정의·`prompt`·zoxide 초기화가 끼지 않는다. **훅이 프로필을 불러오는지는 확인하지 못했다(미확인).** 불러오지 않는다면 이 줄은 아무 영향이 없다.

**프로필이 실행되지 않는 회사 PC(실행 정책 강제)**: 프로필 대신 별칭을 .cmd 파일로 만들어 PATH에 둔다. zoxide의 `z`는 셸 함수가 필요해 이 방식으로는 쓸 수 없다. (경로 B는 `$dst`가 이미 PATH에 있다. 다른 경로면 그 폴더를 `$dst`로 바꾸고 PATH에 있는지 확인한다.)

```powershell
$dst = "$env:LOCALAPPDATA\Programs\cli"
'@eza -l --git --group-directories-first %*'  | Set-Content "$dst\ll.cmd" -Encoding ascii
'@eza -la --git --group-directories-first %*' | Set-Content "$dst\la.cmd" -Encoding ascii
'@lazygit %*'                                 | Set-Content "$dst\lg.cmd" -Encoding ascii
'@yazi %*'                                    | Set-Content "$dst\y.cmd"  -Encoding ascii
'@claude --continue %*'                       | Set-Content "$dst\cc.cmd" -Encoding ascii
'@claude agents %*'                           | Set-Content "$dst\ca.cmd" -Encoding ascii
"@echo off`r`npsmux attach -t main || psmux new-session -s main" | Set-Content "$dst\tm.cmd" -Encoding ascii
```

- 완료 조건: **새 PowerShell 7 탭**에서 `ll`, `z`, `lg`, `tm`이 동작한다(.cmd 방식은 `z` 제외). `(Get-Command ll).CommandType`이 `Function`.
- 되돌리기: §7 「프로필」.

### S9. Windows Terminal 설정

먼저 백업한다. 설정 화면(`Ctrl+,`) 왼쪽 아래 **JSON 파일 열기**로 `settings.json`을 열 수 있다. **파일 전체를 바꾸지 않고** 아래 키를 기존 내용에 합친다. `actions`와 `keybindings` 배열이 이미 있으면 그 안에 항목만 추가한다.

```powershell
$wt = "$env:LOCALAPPDATA\Packages\Microsoft.WindowsTerminal_8wekyb3d8bbwe\LocalState"
Copy-Item "$wt\settings.json" "$wt\settings.json.bak-ccguide"
```

```json
{
  "firstWindowPreference": "persistedWindowLayout",
  "startOnUserLogin": true,
  "profiles": {
    "defaults": {
      "autoMarkPrompts": true,
      "showMarksOnScrollbar": true
    }
  },
  "actions": [
    { "command": { "action": "scrollToMark", "direction": "previous" }, "id": "User.PrevMark" },
    { "command": { "action": "scrollToMark", "direction": "next" }, "id": "User.NextMark" },
    { "command": { "action": "selectOutput", "direction": "prev" }, "id": "User.SelectOutputPrev" },
    { "command": "quakeMode", "id": "Terminal.QuakeMode" }
  ],
  "keybindings": [
    { "keys": "ctrl+up", "id": "User.PrevMark" },
    { "keys": "ctrl+down", "id": "User.NextMark" },
    { "keys": "ctrl+shift+up", "id": "User.SelectOutputPrev" },
    { "keys": "win+`", "id": "Terminal.QuakeMode" }
  ]
}
```

| 설정 | 얻는 것 |
| --- | --- |
| `persistedWindowLayout` | 터미널을 다시 열면 창·탭·분할 배치가 돌아온다. 프로세스는 복원되지 않는다. 스크롤백까지 원하면 `persistedLayoutAndContent`(1.25 이상) |
| 마크 두 줄 + `Ctrl+↑/↓` | 명령 단위로 스크롤 이동. 스크롤바에 명령 위치와 성공·실패 표시 |
| `Ctrl+Shift+↑` | 직전 명령의 출력만 선택 |
| quakeMode | 전역 단축키로 여닫는 드롭다운 터미널. 터미널이 떠 있어야 하므로 `startOnUserLogin`과 같이 쓴다 |

- 키 문자열 ``win+` ``는 문서로 확인하지 못했다(**미확인**). 저장 후 경고가 뜨면 그 줄을 지우고 설정 화면의 **동작**에서 quakeMode에 키를 직접 지정한다.
- psmux로 바로 들어가는 프로필을 원하면 `profiles.list`에 추가한다: `{ "name": "psmux", "commandline": "psmux new -A -s main", "startingDirectory": "%USERPROFILE%" }`. `-A`는 `main` 세션이 있으면 붙고 없으면 만든다. 탭을 닫아도 detach만 된다.
- 회사 정책으로 시작 프로그램이 막혀 있으면 `startOnUserLogin`은 효과가 없다.
- Windows Terminal이 실행 중에 `settings.json`을 다시 쓰는 경우가 있다. 저장한 뒤 파일을 다시 열어 반영을 확인한다.
- 완료 조건: 저장 뒤 Windows Terminal이 경고 없이 열리고, 새 탭에서 명령을 몇 번 실행한 뒤 `Ctrl+↑`로 이전 명령으로 이동한다(출력이 화면 한 장을 넘어야 동작한다 — `1..200`).
- 되돌리기: §7 「Windows Terminal」.

### S10. 끝나면 알림 받기 (선택)

Claude Code의 데스크톱 알림은 Ghostty·Kitty·iTerm2에서만 바로 동작하고 Windows Terminal은 목록에 없다. 그래서 공식 문서가 안내하는 벨 방식을 쓴다.

1. Claude Code가 벨을 울리게 — `~/.claude/settings.json`에 합칠 키(실행 중인 세션은 다시 시작해야 반영된다):

   ```json
   {
     "preferredNotifChannel": "terminal_bell"
   }
   ```

2. Windows Terminal이 벨을 깜빡임으로 — `settings.json` → `profiles.defaults`에 합친다(소리도 원하면 `"audible"` 추가). 설정 화면에서는 프로필 → 기본값 → 고급 → **벨 알림 스타일**.

   ```
   "bellStyle": ["window", "taskbar"]
   ```

3. 확인:

   ```powershell
   Write-Host "`a"   # 탭과 작업 표시줄이 깜빡이면 성공
   ```

- **소리까지 받는 Notification 훅(비프)은 단디 PC에서 넣지 않는다.** `hooks`는 단디가 관리하는 키라 S14 대조에서 `same=False`가 된다. 단디가 없는 PC에서만 선택으로 합친다:

  ```json
  "hooks": {
    "Notification": [
      { "hooks": [ { "type": "command", "command": "powershell -NoProfile -Command [console]::Beep(880,180)" } ] }
    ]
  }
  ```

- `preferredNotifChannel`은 단디가 정하지 않는 키라 합쳐도 된다.
- 완료 조건: 위 3번의 `Write-Host "`a"`로 탭 또는 작업 표시줄이 깜빡인다.
- 되돌리기: 합친 키만 지운다.

### S11. Claude Code 설정과 agent view

설정 파일은 `%USERPROFILE%\.claude\settings.json`이다. 기존 파일이 있으면 키만 합친다.

```json
{
  "autoUpdatesChannel": "stable"
}
```

**`autoUpdatesChannel`이 이미 있으면 위 줄은 넣지 않고 지금 값을 둔다.** 값을 말없이 바꾸는 것은 사용자 결정이 아니다(단디는 이 키를 정하지 않는다).

agent view는 세션 7~10개를 터미널 창과 분리해 돌리는 기능이다. 연구 프리뷰 단계라 화면과 단축키가 바뀔 수 있다. 사용법을 사용자에게 안내한다(실행하지 않는다):

```powershell
claude --bg "결제 모듈 테스트 실패 원인 조사"   # 백그라운드로 바로 시작
claude agents                                   # 세션 목록 (별칭 ca)
claude attach <id>                              # 붙기
claude logs <id>                                # 최근 출력만 보기
claude stop <id>                                # 중지
```

- 대화 중인 세션은 `/bg`로 백그라운드로 보낸다. 붙어 있는 세션에서는 빈 입력 상태의 `←`로 빠져나온다.
- 목록에서 `Enter` 붙기, `Space` 미리보기, `Ctrl+T` 고정.
- 붙어 있지 않은 세션은 한 시간쯤 쉬면 프로세스가 멈춘다. 대화는 남아 있고 붙거나 답하면 다시 뜬다. 계속 돌려야 하면 고정한다.
- 백그라운드 세션은 파일을 고치기 전에 저장소의 `.claude/worktrees/` 아래 git worktree로 옮겨 가 서로 충돌하지 않는다.
- PC를 끄면 실행 중이던 세션은 멈춘다. 다시 켠 뒤 목록에서 붙으면 이어진다.
- 세션마다 구독 사용량을 따로 쓴다.

**단디 PC**
- `claude --bg` 세션은 이름이 자동으로 붙는 워크트리에서 돈다. 단디의 `/resume NNN`으로는 찾지 못하니 `claude agents`로 찾는다. 며칠 이어 갈 작업은 단디 규칙대로 `NNN-<요약>` 워크트리에서 연다.
- `/bg`나 `←`로 보낸 세션은 같은 폴더에서 돈다. 단디의 같은 폴더 규칙을 따르고, `/session-board`(플러그인: `/dandi-session-board:session-board`)로 다른 세션이 고친 파일을 본다.
- agent-guard는 세션마다 서브에이전트 1개를 허용한다. 백그라운드 세션을 많이 띄우면 PC 전체 수가 상한을 넘는다. 세션 수는 시작 줄의 N에 맞춘다(`/agent-guard`로 상태 확인).
- 세션마다 작업을 마칠 때 그 워크트리에서 `/wrap`을 실행한다.

- 완료 조건: `claude agents`가 목록(비어 있어도)을 오류 없이 연다.
- 되돌리기: 합친 키만 지운다.

### S12. agent teams 팀원을 psmux 페인으로 (선택 · psmux가 동작할 때만)

psmux 페인 안에서 `claude`를 실행하면 agent teams의 팀원이 각각 새 페인으로 뜬다. WSL2가 필요 없다. psmux가 페인마다 `TMUX`, `CLAUDE_CODE_EXPERIMENTAL_AGENT_TEAMS=1`을 넣고, `claude`를 `--teammate-mode tmux`를 붙여 주는 래퍼 함수로 감싼다(psmux `claude-code-fix-tty` 옵션, 기본 켜짐). **사용자가 psmux 페인 안에서 직접 확인**한다(Claude의 일반 셸에서는 나오지 않는다).

```powershell
$env:CLAUDE_CODE_EXPERIMENTAL_AGENT_TEAMS   # 1
$env:PSMUX_CLAUDE_TEAMMATE_MODE             # tmux
(Get-Command claude).CommandType            # Function (psmux 래퍼)
```

agent view(`←`)를 열면 Claude Code가 자신을 다시 실행하면서 래퍼가 붙인 플래그가 빠지고, 그 뒤 팀원은 다시 안 보이는 in-process로 돈다. 설정 파일에 두면 유지된다. `~/.claude/settings.json`에 합칠 키:

```json
{
  "teammateMode": "tmux"
}
```

사용: `tm`으로 psmux에 들어가 `claude`를 실행하고 “팀을 꾸려서 프론트·백엔드·테스트를 나눠 맡겨 줘”처럼 팀을 요청한다. 팀원마다 페인이 생긴다. 페인은 `Ctrl+b` `q`로 번호를 보고, `Ctrl+b` `z`로 하나만 크게 본다.

- `-p`(print) 모드에서는 페인이 생기지 않는다. 대화형 실행에서만 된다.
- 모델이 팀원 대신 **worktree 에이전트**를 고르면 페인 없이 안 보이게 돈다. 프로젝트 `CLAUDE.md`에 “병렬 작업은 worktree 격리 대신 팀원(teammate)으로”라고 적어 두면 따르는 편이지만 보장은 아니다(이 줄은 사용자가 원할 때만 제안한다).
- 팀원마다 Claude 세션이 하나씩 늘어 구독 사용량도 그만큼 쓴다.
- 마우스 휠은 Windows 11 빌드 22523 이상에서 Claude Code 페인에 전달된다. 그보다 낮은 빌드에서는 휠이 Claude 화면에 닿지 않는다.
- **단디 PC**: `teammateMode`는 단디가 정하지 않는 키다. 이 키 하나만 합친다. 팀원 페인도 같은 PC의 Claude라 단디 훅과 스킬이 적용된다. **팀원을 agent-guard가 서브에이전트로 세는지는 확인하지 못했다(미확인)** — 팀 규모는 시작 줄의 N 이하로 둔다. psmux 래퍼는 프로필이 `claude` 함수를 이미 정의했으면 끼지 않는다. 단디 프로필 맨 위 `if ($env:CLAUDECODE) { return }`와는 충돌하지 않는다.
- 완료 조건: `settings.json`에서 `teammateMode`가 `tmux`로 읽힌다(`(Get-Content $HOME\.claude\settings.json -Raw | ConvertFrom-Json).teammateMode`).
- 되돌리기: 합친 키만 지운다.

### S13. 원격에서 이어 작업하기 (선택 · 게이트 대상)

> **게이트**: Remote Control은 대화가 Anthropic 서버를 거친다. OpenSSH Server는 외부에서 들어오는 경로를 연다. 항목마다 사용자 승인을 받는다. 회사 PC는 사내 정책부터 확인한다.

**개인 PC**

*방법 1. Remote Control (휴대폰, 다른 PC 브라우저).* Pro·Max 구독 로그인이면 바로 쓴다. 세션 안에서 `/rc`를 치면 claude.ai/code와 Claude 앱의 세션 목록에 나타난다. 모든 세션에 자동으로 켜려면 설정에 한 줄 추가한다(이미 있는 `autoUpdatesChannel` 값은 바꾸지 않는다):

```json
{
  "remoteControlAtStartup": true
}
```

상시 켜 두는 PC라면 psmux 창 하나에 서버 모드를 띄워 둔다. 원격에서 새 세션을 필요할 때마다 만들 수 있다(프로젝트 폴더에서):

```powershell
claude remote-control --spawn worktree --name "home-main"
```

- API 키, Bedrock·Vertex·Foundry, 게이트웨이 주소(`ANTHROPIC_BASE_URL`)를 쓰면 동작하지 않는다.
- 서버 모드는 네트워크가 10분쯤 끊기면 종료된다. 같은 폴더에서 다시 실행하면 4시간 안에는 이전 세션이 돌아온다.

*방법 2. SSH로 들어와 psmux에 붙기 — 관리자 PowerShell.*

```powershell
Get-WindowsCapability -Online | Where-Object Name -like 'OpenSSH*'
Add-WindowsCapability -Online -Name OpenSSH.Server~~~~0.0.1.0
Start-Service sshd
Set-Service -Name sshd -StartupType Automatic
Get-NetFirewallRule -Name OpenSSH-Server-In-TCP

# SSH 접속 시 기본 셸을 PowerShell 7로
New-ItemProperty -Path "HKLM:\SOFTWARE\OpenSSH" -Name DefaultShell -Value "C:\Program Files\PowerShell\7\pwsh.exe" -PropertyType String -Force
```

- 다른 장비에서 `ssh 사용자@호스트` 후 `psmux attach -t main`.
- 관리자 그룹 계정의 공개 키는 `~\.ssh\authorized_keys`가 아니라 `C:\ProgramData\ssh\administrators_authorized_keys`에 넣는다. 이 파일은 Administrators와 SYSTEM만 접근하도록 권한을 좁혀야 한다. 키 내용은 사용자가 직접 넣는다.
- **이 명령들은 널리 쓰이는 것이지만 Microsoft 문서 본문과 한 줄씩 대조하지 못했다(미확인).** 집 밖에서 접속하려면 공유기 포트를 여는 대신 VPN을 쓴다.

**회사 PC** — 관리자 권한이 없으면 SSH 서버를 설치할 수 없다. 남는 수단은 Remote Control과 RDP다.

1. `claude doctor`에서 Remote Control이 가능한지 본다. 아래 중 하나라도 해당하면 쓸 수 없다.
   - API 키, Bedrock·Vertex·Foundry, 사내 게이트웨이(`ANTHROPIC_BASE_URL`)로 연결
   - Team·Enterprise에서 Owner가 Remote Control 토글을 켜지 않음
   - `CLAUDE_CODE_DISABLE_NONESSENTIAL_TRAFFIC` 또는 `DISABLE_GROWTHBOOK` 설정
   - 조직이 Zero Data Retention 또는 HIPAA 구성, 또는 관리 설정으로 차단
2. 가능하면 사용자가 프로젝트 폴더에서 한 번 직접 실행해 확인 질문 두 개(Remote Control 사용, 폴더 신뢰)에 답한다.

   ```powershell
   claude remote-control --spawn worktree --name "$env:COMPUTERNAME-work"
   ```

3. 퇴근 전에는 아래 래퍼로 띄워 둔다. 네트워크가 10분쯤 끊기면 서버가 종료되므로 다시 띄우는 반복문이다. 파일 이름은 `rc-keepalive.cmd`.

   ```bat
   @echo off
   rem 신뢰해 둔 프로젝트 폴더에서 실행
   :loop
   claude remote-control --spawn worktree --name "%COMPUTERNAME%-work"
   timeout /t 30 /nobreak >nul
   goto loop
   ```

- psmux가 동작하면 이 래퍼를 psmux 창에서 돌린다. 터미널을 닫아도 유지된다.
- git 저장소가 아닌 폴더에서는 `--spawn same-dir`를 쓴다.
- PC가 절전에 들어가면 끊긴다. 서버가 멈춘 뒤 4시간이 지나면 이전 세션은 복구되지 않는다.
- Remote Control이 안 되면 RDP가 허용되는지 확인한다. 둘 다 안 되면 이 PC에서는 원격 이어 작업을 할 수 없다.

**단디 PC**: Remote Control 세션도 이 PC에서 돌아 단디 훅·스킬이 그대로 적용된다. `--spawn worktree`의 워크트리도 이름이 자동이라 `/resume NNN` 대신 세션 목록에서 찾는다.

- 완료 조건: Remote Control은 `/rc`로 세션이 claude.ai/code 목록에 보인다(사용자 확인). SSH는 다른 장비에서 접속해 `psmux attach -t main`이 된다(사용자 확인).
- 되돌리기: §7 「원격」.

### S14. 단디 구성이 그대로인지 확인 (단디 PC)

S1의 백업과 지금 설정을 비교해, 단디가 쓰는 키가 바뀌지 않았는지 본다.

```powershell
$a = Get-Content $HOME\.claude\settings.json.bak-ccguide -Raw | ConvertFrom-Json
$b = Get-Content $HOME\.claude\settings.json -Raw | ConvertFrom-Json
foreach ($k in 'permissions','hooks','attribution','autoMemoryEnabled') {
  "{0} same={1}" -f $k, (($a.$k | ConvertTo-Json -Depth 20 -Compress) -eq ($b.$k | ConvertTo-Json -Depth 20 -Compress))
}
```

- 완료 조건: 네 줄이 모두 `same=True`.
- 하나라도 `False`면 키를 합치다가 덮어쓴 것이다. `Copy-Item $HOME\.claude\settings.json.bak-ccguide $HOME\.claude\settings.json -Force`로 되돌린 뒤 키만 다시 합친다.
- 새 터미널 탭에서 `claude`를 띄워 `[agent-guard]` 줄이 다시 보이는지, `/dropin-check` 결과가 이전과 같은지 본다.

### S15. (선택) 재부팅 대비

Windows를 끄면 psmux 세션도 사라진다. 페인 배치와 작업 폴더는 플러그인으로 되살린다. `~/.tmux.conf` 끝에 추가한다:

```
set -g @plugin 'psmux-plugins/psmux-resurrect'
set -g @plugin 'psmux-plugins/psmux-continuum'
```

- 플러그인 설치 절차는 [psmux-plugins 저장소](https://github.com/psmux/psmux-plugins)의 안내를 따른다. **TPM(tmux 플러그인 관리자) 호환은 미확인이다.**
- Claude 대화는 플러그인과 무관하게 남는다. 각 페인에서 `cc`(`claude --continue`)로 이어 가거나 `ca` 목록에서 붙는다.
- 되돌리기: 추가한 두 줄을 지운다.

### S16. (선택) WSL2로 옮길지 판단

**샌드박스가 필요할 때만** 진행한다. 아니면 여기서 끝이다. 네이티브 Windows에서는 명령이 샌드박스 없이 실행된다. Claude Code 샌드박스는 WSL2 안에서만 켤 수 있다. agent teams 분할 화면은 WSL2 사유가 아니다(S12).

```powershell
wsl --install
# 재부팅 후
wsl -l -v      # VERSION이 2인지 확인
```

```bash
sudo apt update && sudo apt install -y tmux git curl
curl -fsSL https://claude.ai/install.sh | bash
tmux new-session -A -s main
```

- 앞에서 만든 `~/.tmux.conf`를 WSL 홈에 그대로 복사한다. 별칭도 `~/.bashrc`에 같은 이름으로 만든다.
- agent teams는 기본으로 꺼져 있다. WSL 쪽 `~/.claude/settings.json`에 `"teammateMode": "auto"`와 `"env": { "CLAUDE_CODE_EXPERIMENTAL_AGENT_TEAMS": "1" }`을 넣는다.
- Java·Gradle 프로젝트를 Windows 쪽 드라이브에 둔 채 WSL에서 빌드하면 파일 입출력이 느려질 수 있다. 저장소를 WSL 파일 시스템 안에 두는 편이 낫다.
- **단디 PC**: WSL 안의 `~/.claude`는 Windows 쪽과 별개라 단디가 없다. WSL 안 프로젝트에 `00_통합-설치.md`를 넣고 “00_통합-설치.md 를 학습해서 이 프로젝트에 적용해줘”라고 해서 다시 적용한다. agent-guard 훅은 node 18 이상이 필요하다.
- 회사 PC는 관리자 권한이 필요해 보통 진행하지 않는다.

## 4. 끝낸 뒤 사용자에게 알린다

설치 뒤 쓰는 법은 사람용 페이지가 담당한다: `https://eleninjaytech.github.io/claude/pages/terminal.ko.html`(영어 `terminal.html`). 새 터미널 탭을 열어 `tm`으로 시작하고, 첫 시도는 소개 페이지의 「사용 요령」을 따라 한다.

## 5. 단디와의 경계 — 겹치거나 어긋나는 곳

| 대상 | 겹침 | 이 문서의 처리 |
| --- | --- | --- |
| `~/.claude/settings.json` 단디 관리 키 `permissions`·`hooks`·`attribution`·`autoMemoryEnabled` | S10·S11·S12·S13이 같은 파일에 키를 합친다 | 이 네 키는 **건드리지 않는다.** 고치기 전 백업(S1), 고친 뒤 S14로 대조. 소리 훅(S10 비프)은 단디 PC에서 넣지 않는다 |
| 이 문서가 합치는 키 | `autoUpdatesChannel`·`preferredNotifChannel`·`teammateMode`·`remoteControlAtStartup`·`env`(Git Bash 경로) — 단디는 이 키들을 정하지 않는다 | 키 단위로만 합친다. 이미 있는 값은 바꾸지 않는다 |
| win-setup(03 §17) | Windows Terminal 기본 프로필·PATH·Git 점검과 같은 영역 | 겹치면 win-setup 진단을 먼저 쓴다(S7). 이 문서는 `$PROFILE`·Windows Terminal 키 바인딩만 다룬다. win-setup은 `$PROFILE`을 건드리지 않는다 |
| lazygit(03 §16 diff 검수 도구) | 같은 도구를 설치한다(S4) | §16이 적용돼 있으면 건너뛴다. 이 문서는 lazygit 설정 파일을 만들지 않는다 |
| browser-check(03 §5) | 겹침 없음 — 브라우저 관찰 규칙이고 터미널과 무관 | 처리 없음 |
| agent-guard(03 §19) | agent view 세션·agent teams 팀원이 동시 에이전트 수를 늘린다. 팀원을 세는지는 미확인 | S11·S12에 N 이하로 두라고 안내. `/agent-guard`로 상태 확인 |
| session-board(03 §12) | 백그라운드 세션이 같은 폴더에서 돈다 | S11에서 `/session-board` 안내 |
| 워크트리 번호 규칙(단디 §F-1) | agent view·`--spawn worktree`가 붙이는 자동 이름은 번호가 없다 | `/resume NNN`으로 못 찾는다고 안내(S11·S13) |
| 단디 PreCompact 훅(PowerShell) | `$PROFILE`을 불러오는지 미확인 | 프로필 맨 위 `if ($env:CLAUDECODE) { return }`(S8) |
| 세션 유지 수단 | 단디 01 §D는 멀티플렉서보다 agent view를 먼저 권한 | psmux는 그 위에 얹는 선택으로 둔다. S5 실패 시 경로 C |
| 통합 설치(00·`/dropin-apply`) | 이 문서는 기록(`dropin-applied`)을 남기지 않는다 | 독립 문서다. 적용 여부는 사용자가 이 요청으로 판단한다 |

## 6. 막혔을 때

| 이럴 때 | 까닭 | 이렇게 한다 |
| --- | --- | --- |
| `ll`, `z`, `tm`이 없다고 나옴 | 설치 전에 연 탭이거나 PowerShell 7이 아닌 탭(5.1·cmd·VS Code 확장 콘솔) | 새 PowerShell 7 탭을 연다. `$PSVersionTable.PSVersion.Major`가 7인지 본다 |
| `psmux`, `eza` 명령을 못 찾음 | 설치 전에 연 창이라 PATH가 아직 반영 안 됨 | 터미널을 완전히 닫고 다시 연다 |
| psmux 키가 안 먹음 | `Ctrl+b`와 다음 키를 함께 눌렀거나 한글 입력 상태 | `Ctrl+b`를 뗀 뒤 상태 줄 왼쪽에 빨간 PREFIX가 보이면 다음 키를 누른다. `한/영`으로 영문으로 바꾼다 |
| 창을 닫았더니 작업이 사라진 것 같음 | 사라지지 않았음. 창을 닫으면 detach로 처리됨 | 새 터미널에서 `psmux ls` → `psmux attach -t 이름` |
| psmux 안에서 `psmux`를 쳤더니 경고만 나옴 | psmux는 자기 안에 중첩 실행되지 않게 막음(tmux와 같음) | 새 세션은 `Ctrl+b` → `:` 다음 `new-session` |
| `.tmux.conf`를 고쳤는데 그대로임 | 이미 떠 있는 세션은 설정을 다시 읽지 않음 | `psmux source-file $HOME\.tmux.conf` |
| 칸 크기 조절 키(`Ctrl+b` → `Ctrl+↑↓`)가 안 먹음 | Windows Terminal이 `Ctrl+↑↓`를 명령 이동으로 먼저 가져감 | 경계선을 마우스로 끌거나 `Ctrl+b` → `Alt+방향키`(5칸씩) |
| 복사 모드에서 `v`를 눌러도 선택이 안 됨 | psmux(tmux)의 `v`는 사각형 선택 전환 | 선택 시작은 `Space`, 줄 선택은 `V` |
| vim에서 `Ctrl+V`가 안 먹음 | Windows Terminal이 먼저 붙여넣기로 가로챔 | Windows Terminal 설정에서 `Ctrl+V` 붙여넣기를 지운다. 붙여넣기는 `Ctrl+Shift+V`나 오른쪽 클릭으로 |
| 전체 화면 프로그램 안에서 휠이 안 먹음 | 프로그램이 마우스를 요청하지 않으면 휠을 보내지 않음(tmux와 같음) | 프로그램 쪽 마우스 설정을 켠다. 예: vim `:set mouse=a` |
| 명령이 끝나면 칸이 바로 닫혀 오류를 못 봄 | 기본 동작 | `set -g remain-on-exit on`. 다시 실행은 `respawn-pane -k` |
| `display-message -p`, `list-*` 결과가 비거나 멈춤 | localhost 트래픽을 걸러 내는 보안·광고 차단 프로그램이 응답을 막음 | 해당 프로그램에서 `psmux.exe`를 예외로 두도록 사용자에게 안내한다(§2: Claude가 대신 설정하지 않는다) |
| psmux가 갑자기 실행 거부됨 | 보안 프로그램 정책이 바뀜 | psmux는 접고 agent view(`ca`)와 Windows Terminal 패널로 쓴다(경로 C) |
| 원인을 모르는 psmux 오류·충돌 | — | `%USERPROFILE%\.psmux\`의 `server-startup.log`, `config-warnings.log`, `crash.log`를 본다 |
| 팀원(agent teams)이 칸으로 안 뜨고 안 보이게 돎 | agent view(`←`)를 다녀와 플래그가 빠졌거나, 모델(주로 Opus)이 worktree 방식을 고름. `-p` 모드에서는 칸이 생기지 않음 | `~/.claude/settings.json`에 `"teammateMode": "tmux"`. “팀원으로 나눠 줘”라고 다시 말한다 |
| `Ctrl+↑`로 명령 이동이 안 됨 | 출력이 화면 한 장 안에 다 들어가 스크롤할 곳이 없음. 또는 PowerShell 7 탭이 아니거나 다른 도구(oh-my-posh 등)가 prompt를 덮어씀 | `1..200`으로 출력을 길게 만든 뒤 다시 해 본다. 그래도 안 되면 프로필 끝에서 prompt를 덮는 줄이 있는지 본다 |
| Windows Terminal 설정 값이 바뀌거나 사라짐 | Windows Terminal이 실행 중에 `settings.json`을 다시 씀 | 저장한 뒤 파일을 다시 열어 확인한다. 가능하면 설정 화면(`Ctrl+,`)에서 바꾼다 |
| 로그인해도 터미널이 안 뜨고 ``Win+` `` 가 안 됨 | Windows 시작 앱에서 터미널이 꺼져 있음 | 작업 관리자 → 시작 앱에서 터미널을 “사용”으로 바꾼다. 회사 정책으로 막혔으면 터미널을 먼저 직접 연다 |
| yazi 미리보기·열기가 이상함 | 파일 형식을 판별하는 `file` 명령이 PATH에 없음(추정, **미확인**) | 사용자 환경 변수 `YAZI_FILE_ONE`을 `C:\Program Files\Git\usr\bin\file.exe`로 지정한다 |

**회사 PC에서 안 되는 것**

| 기능 | 이유 | 대신 쓰는 것 |
| --- | --- | --- |
| SSH 접속 대상 | OpenSSH Server 설치에 관리자 권한 필요 | Remote Control, RDP |
| Claude Code 샌드박스 | WSL2에서만 동작 | 권한 모드를 기본값으로 두고 승인하며 사용 |
| 프로필 기반 별칭, `z` | 실행 정책이 강제된 경우 | .cmd 파일 별칭. `z`는 포기 |
| Bash 도구, Monitor 도구 | Git for Windows를 설치할 수 없는 경우 | PowerShell 도구만 사용 |

## 7. 되돌리기

적용 전 상태로 돌린다. **지우기 전에 파일 내용을 사용자에게 보여 주고 승인받는다.** 프로필과 `.tmux.conf`는 이 문서로 처음 만든 파일일 때만 지운다(백업 `.bak-ccguide`가 있으면 그것으로 되돌린다).

```powershell
# Windows Terminal 설정 (S9에서 만든 백업)
$wt = "$env:LOCALAPPDATA\Packages\Microsoft.WindowsTerminal_8wekyb3d8bbwe\LocalState"
Copy-Item "$wt\settings.json.bak-ccguide" "$wt\settings.json" -Force

# PowerShell 프로필과 psmux 설정 (이 문서로 처음 만든 경우만 — 백업이 있으면 백업을 되돌린다)
Remove-Item $PROFILE, "$HOME\.tmux.conf"

# winget으로 설치한 도구
winget uninstall --id marlocarlo.psmux -e
winget uninstall --id sxyazi.yazi -e
winget uninstall --id ajeetdsouza.zoxide -e
winget uninstall --id eza-community.eza -e
winget uninstall --id JesseDuffield.lazygit -e   # 원래 쓰던 것이면 빼고
```

- **도구**: Scoop(경로 A)으로 설치했으면 `scoop uninstall psmux yazi zoxide eza lazygit`, zip(경로 B)이면 `%LOCALAPPDATA%\Programs\cli` 폴더를 지우고 사용자 PATH에서 그 경로를 뺀다. .cmd 별칭도 그 폴더에 있다. 설치 전부터 있던 도구는 지우지 않는다.
- **프로필**: S8에서 맨 위에 `if ($env:CLAUDECODE) { return }`를 넣었다면 그 줄도 함께 지운다.
- **`~/.claude/settings.json`(단디 PC)**: S1에서 만든 백업으로 되돌린다 — `Copy-Item $HOME\.claude\settings.json.bak-ccguide $HOME\.claude\settings.json -Force`
- **`~/.claude/settings.json`(단디 없음)**: 이 문서에서 더한 키(`autoUpdatesChannel`, `remoteControlAtStartup`, `teammateMode`, `preferredNotifChannel`, `env`의 Git Bash 경로, Notification 훅)만 지운다.
- **원격**(S13): Remote Control은 `/rc`를 끄고 `remoteControlAtStartup` 키를 지운다. OpenSSH Server를 깔았다면 관리자 PowerShell에서 `Stop-Service sshd; Set-Service -Name sshd -StartupType Disabled`로 멈추고, `administrators_authorized_keys`에 넣은 키를 사용자가 지운다. 서버를 제거하려면 `Remove-WindowsCapability -Online -Name OpenSSH.Server~~~~0.0.1.0`(이 되돌리기 명령은 문서 본문과 대조하지 못했다 — 미확인).
- **Claude Code·Git·WSL**: 이 문서는 지우지 않는다.

## 8. 미확인 목록 — 마지막 보고에 그대로 싣는다

- RDP 연결 끊기·로그아웃 때 psmux 세션이 유지되는지
- TPM(tmux 플러그인 관리자) 호환
- agent-guard가 agent teams 팀원을 서브에이전트로 세는지
- quakeMode 키 문자열 ``win+` ``
- 경로 B의 lazygit zip 패턴
- 단디 훅이 PowerShell 프로필을 불러오는지
- S13 SSH 명령의 Microsoft 문서 대조(되돌리기 명령 포함)
- psmux 안에서 `Ctrl+↑` 명령 이동
- `CLAUDE_CODE_GIT_BASH_PATH` 환경 변수 이름
- yazi의 `YAZI_FILE_ONE` 필요 여부
- 원본 문서의 사실(psmux·agent teams 동작)은 2026-11-24 기준이며 이 문서를 만들면서 다시 대조하지 않았다

## 9. 근거

- psmux 공식 문서: [저장소](https://github.com/psmux/psmux) · [keybindings](https://github.com/psmux/psmux/blob/master/docs/keybindings.md) · [configuration](https://github.com/psmux/psmux/blob/master/docs/configuration.md) · [claude-code](https://github.com/psmux/psmux/blob/master/docs/claude-code.md) · [mouse-ssh](https://github.com/psmux/psmux/blob/master/docs/mouse-ssh.md) · [faq](https://github.com/psmux/psmux/blob/master/docs/faq.md) · [plugins](https://github.com/psmux/psmux/blob/master/docs/plugins.md)
- Claude Code 공식 문서: [Configure your terminal](https://code.claude.com/docs/en/terminal-config) · [Agent teams](https://code.claude.com/docs/en/agent-teams) · [Worktrees](https://code.claude.com/docs/en/worktrees) · [Hooks](https://code.claude.com/docs/en/hooks) · [Advanced setup](https://code.claude.com/docs/en/setup)
- Windows Terminal 문서: [Command line arguments](https://learn.microsoft.com/windows/terminal/command-line-arguments) · [Advanced profile settings](https://learn.microsoft.com/windows/terminal/customize-settings/profile-advanced)
