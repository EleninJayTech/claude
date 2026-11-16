# win-setup diagnose - READ ONLY, changes nothing.
# ASCII only + Windows PowerShell 5.1 compatible (may run before PowerShell 7 exists).
#   pwsh -NoProfile -ExecutionPolicy Bypass -File diagnose.ps1

$ErrorActionPreference = 'SilentlyContinue'

function Sec($t) { ''; "=== $t ===" }
function Ver($name) {
  $c = Get-Command $name -CommandType Application | Select-Object -First 1
  if ($c) { "{0,-7} {1}" -f $name, (& $c.Source --version 2>&1 | Select-Object -First 1) }
  else { "{0,-7} NOT FOUND" -f $name }
}

Sec '1-1 powershell'
"psVersion=$($PSVersionTable.PSVersion)"
Get-Command pwsh, powershell -All -CommandType Application | ForEach-Object { "cmd={0} {1} {2}" -f $_.Name, $_.Version, $_.Source }
"pwshMsixVersion=$((Get-AppxPackage -Name Microsoft.PowerShell).Version)"
"pwshMsiExists=$(Test-Path 'C:\Program Files\PowerShell\7\pwsh.exe')"
$p = Get-CimInstance Win32_Process -Filter "ProcessId=$PID"
for ($i = 0; $i -lt 6 -and $p; $i++) {
  "parent={0} {1}" -f $p.ProcessId, $p.Name
  $p = Get-CimInstance Win32_Process -Filter "ProcessId=$($p.ParentProcessId)"
}
"WT_PROFILE_ID=$env:WT_PROFILE_ID"

Sec '1-2 terminal'
$ls = Join-Path $env:LOCALAPPDATA 'Packages\Microsoft.WindowsTerminal_8wekyb3d8bbwe\LocalState'
"wtSettingsExists=$(Test-Path (Join-Path $ls 'settings.json'))"
foreach ($f in @(Get-ChildItem -LiteralPath $ls -Filter 'settings.json*' -File)) {
  $raw = Get-Content -LiteralPath $f.FullName -Raw
  $bad = @()
  foreach ($m in [regex]::Matches($raw, '"guid"\s*:\s*"([^"]*)"')) {
    $g = [guid]::Empty
    if (-not [guid]::TryParse($m.Groups[1].Value, [ref]$g)) { $bad += $m.Groups[1].Value }
  }
  $dp = [regex]::Match($raw, '"defaultProfile"\s*:\s*"([^"]*)"').Groups[1].Value
  $has7 = $raw -match '574e775e-4f2a-5b96-ac1e-a2962a402336'
  $elev = [regex]::Matches($raw, '"elevate"\s*:\s*true').Count
  "wtFile={0} modified={1:yyyy-MM-dd HH:mm} invalidGuids={2} defaultProfile={3} hasPwsh7Profile={4} elevateTrue={5}" -f $f.Name, $f.LastWriteTime, $bad.Count, $dp, $has7, $elev
  foreach ($b in $bad) { "  invalidGuid=$b" }
}
$d = Get-ItemProperty 'HKCU:\Console\%%Startup'
"delegationConsole=$($d.DelegationConsole) delegationTerminal=$($d.DelegationTerminal)"

Sec '1-3 privilege'
"user=$(whoami)"
"isAdmin=$(([Security.Principal.WindowsPrincipal][Security.Principal.WindowsIdentity]::GetCurrent()).IsInRole([Security.Principal.WindowsBuiltInRole]::Administrator))"
whoami /groups | Select-String 'S-1-5-32-544|S-1-16-' | ForEach-Object { "group=$($_.Line.Trim())" }
$pol = Get-ItemProperty 'HKLM:\SOFTWARE\Microsoft\Windows\CurrentVersion\Policies\System'
"EnableLUA=$($pol.EnableLUA) ConsentPromptBehaviorAdmin=$($pol.ConsentPromptBehaviorAdmin)"
"sudoExe=$(Test-Path (Join-Path $env:SystemRoot 'System32\sudo.exe'))"
"sudoEnabled=$((Get-ItemProperty 'HKLM:\SOFTWARE\Microsoft\Windows\CurrentVersion\Sudo').Enabled)"

Sec '1-4 developer settings'
"devMode=$((Get-ItemProperty 'HKLM:\SOFTWARE\Microsoft\Windows\CurrentVersion\AppModelUnlock').AllowDevelopmentWithoutDevLicense)"
"longPaths=$((Get-ItemProperty 'HKLM:\SYSTEM\CurrentControlSet\Control\FileSystem').LongPathsEnabled)"
"gitLongPaths=$(git config --global --get core.longpaths)"
"hibernateEnabled=$((Get-ItemProperty 'HKLM:\SYSTEM\CurrentControlSet\Control\Power').HibernateEnabled)"
"hiberfil=$(Test-Path C:\hiberfil.sys)"

Sec '1-5 path'
$k = Get-Item 'HKCU:\Environment'
"userPathKind=$($k.GetValueKind('Path'))"
$userRaw = $k.GetValue('Path', $null, 'DoNotExpandEnvironmentNames')
foreach ($e in ($userRaw -split ';' | Where-Object { $_ })) {
  "user    [exists={0}] {1}" -f (Test-Path -LiteralPath ([Environment]::ExpandEnvironmentVariables($e))), $e
}
foreach ($e in ([Environment]::GetEnvironmentVariable('Path', 'Machine') -split ';' | Where-Object { $_ })) {
  "machine [exists={0}] {1}" -f (Test-Path -LiteralPath $e), $e
}
$lb = Join-Path $env:USERPROFILE '.local\bin'
$inPath = @($userRaw -split ';' | Where-Object { $_ -and ([Environment]::ExpandEnvironmentVariables($_).TrimEnd('\') -ieq $lb) }).Count -gt 0
"localBinClaudeExe=$(Test-Path (Join-Path $lb 'claude.exe'))"
"localBinInUserPath=$inPath"

Sec '1-6 claude'
"claudeVersion=$(claude --version 2>&1 | Select-Object -First 1)"
Get-Command claude -All -CommandType Application | ForEach-Object { "claudePath=$($_.Source)" }
$sf = Join-Path $env:USERPROFILE '.claude\settings.json'
if (Test-Path $sf) {
  $sraw = Get-Content -LiteralPath $sf -Raw
  "defaultShell=$([regex]::Match($sraw, '"defaultShell"\s*:\s*"([^"]*)"').Groups[1].Value)"
  "denyLog=$($sraw -match 'Read\(\*\*/\*\.log\)')"
} else { 'claudeSettings=missing' }

Sec '1-7 tools'
foreach ($t in 'git', 'gh', 'node', 'npm', 'python', 'winget', 'jq', 'fd') { Ver $t }
"gitBash=$(Test-Path 'C:\Program Files\Git\bin\bash.exe')"
winget upgrade --disable-interactivity | Select-String 'Git\.Git|GitHub\.cli|OpenJS|Microsoft\.PowerShell|WindowsTerminal' | ForEach-Object { "upgradable=$($_.Line.Trim())" }

Sec '1-8 disk'
Get-Volume | Where-Object DriveLetter | ForEach-Object { "volume={0} sizeGB={1} freeGB={2}" -f $_.DriveLetter, [math]::Round($_.Size / 1GB, 1), [math]::Round($_.SizeRemaining / 1GB, 1) }
Get-ChildItem (Join-Path $env:LOCALAPPDATA 'Docker\wsl') -Recurse -Filter *.vhdx | ForEach-Object { "vhdx={0} GB={1}" -f $_.FullName, [math]::Round($_.Length / 1GB, 1) }
Get-ChildItem C:\ -Force -File | Where-Object { $_.Name -match 'hiberfil|pagefile' } | ForEach-Object { "sysfile={0} GB={1}" -f $_.Name, [math]::Round($_.Length / 1GB, 1) }

''
'=== done ==='
