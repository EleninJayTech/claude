# win-setup fix-path - cleans the USER Path (HKCU\Environment). Dry run unless -Apply.
# ASCII only + Windows PowerShell 5.1 compatible. Never touches the machine Path (HKLM).
#   -Keep 'C:\a;C:\b'    entries to keep even if missing or scratchpad
#   -AddLocalBin         append %USERPROFILE%\.local\bin when absent
#   -RestoreFrom <file>  write a backup file back (rollback); needs -Apply
#   -Name <value>        registry value name (default Path; tests use a dummy name)

param(
  [switch]$Apply,
  [string]$Keep = '',
  [switch]$AddLocalBin,
  [string]$RestoreFrom = '',
  [string]$Name = 'Path',
  [string]$BackupDir = (Join-Path $env:LOCALAPPDATA 'win-setup\backup')
)

$ErrorActionPreference = 'Stop'

function Norm($s) { $s.TrimEnd('\').ToLower() }

$raw = (Get-Item 'HKCU:\Environment').GetValue($Name, $null, 'DoNotExpandEnvironmentNames')
if (-not $raw) { "user $Name is empty or missing - nothing to do"; exit 1 }

if ($RestoreFrom) {
  $newValue = [IO.File]::ReadAllText($RestoreFrom).Trim()
  if (-not $newValue) { "backup file is empty: $RestoreFrom"; exit 1 }
  '--- restore to ---'
  $newValue -split ';'
}
else {
  $keepSet = @{}
  foreach ($e in ($Keep -split ';' | Where-Object { $_ })) { $keepSet[(Norm $e)] = $true }
  $seen = @{}; $new = @(); $removed = @(); $added = @()
  foreach ($e in ($raw -split ';' | Where-Object { $_ })) {
    $key = Norm $e
    if ($seen[$key]) { $removed += "duplicate  | $e"; continue }
    if (-not $keepSet[$key]) {
      if ($e -match '[\\/]claude[\\/].*[\\/]scratchpad([\\/]|$)') { $removed += "scratchpad | $e"; continue }
      if ($e -notmatch '%') {
        $exists = $false
        try { $exists = Test-Path -LiteralPath $e } catch { }
        if (-not $exists) { $removed += "missing    | $e"; continue }
      }
    }
    $seen[$key] = $true
    $new += $e
  }
  if ($AddLocalBin) {
    $lb = Norm (Join-Path $env:USERPROFILE '.local\bin')
    $has = @($new | Where-Object { (Norm ([Environment]::ExpandEnvironmentVariables($_))) -eq $lb }).Count -gt 0
    if (-not $has) { $new += '%USERPROFILE%\.local\bin'; $added += '%USERPROFILE%\.local\bin' }
  }
  $newValue = $new -join ';'
  '--- keep ---';   $new
  '--- remove ---'; $removed
  '--- add ---';    $added
}

$kind = (Get-Item 'HKCU:\Environment').GetValueKind($Name)
"--- kind --- $kind" + $(if ($kind -ne 'ExpandString') { ' -> ExpandString' } else { '' })
if ($newValue -ceq $raw -and $kind -eq 'ExpandString') { 'NO CHANGE - value is already clean.'; exit 0 }
if (-not $Apply) { 'DRY RUN - nothing changed. Show the lists to the user, then re-run with -Apply.'; exit 0 }

New-Item -ItemType Directory -Force -Path $BackupDir | Out-Null
$bk = Join-Path $BackupDir ("user-{0}-{1}.txt" -f $Name.ToLower(), (Get-Date -Format 'yyyyMMdd-HHmmss'))
[IO.File]::WriteAllText($bk, $raw)

# Must be ExpandString: [Environment]::SetEnvironmentVariable would store String and break %VAR% entries.
[Microsoft.Win32.Registry]::SetValue('HKEY_CURRENT_USER\Environment', $Name, $newValue, [Microsoft.Win32.RegistryValueKind]::ExpandString)
# Broadcast the environment change so new processes pick it up.
[Environment]::SetEnvironmentVariable('_PATH_REFRESH', '1', 'User')
[Environment]::SetEnvironmentVariable('_PATH_REFRESH', $null, 'User')

"APPLIED kind={0} backup={1}" -f (Get-Item 'HKCU:\Environment').GetValueKind($Name), $bk
