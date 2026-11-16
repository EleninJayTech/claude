# win-setup admin-setup - run ELEVATED with Windows PowerShell 5.1. ASCII only.
# Applies only the switches given. Pass -LogPath as an absolute path from the caller.

param(
  [switch]$DevMode,
  [switch]$LongPaths,
  [switch]$Sudo,
  [switch]$HibernateOff,
  [switch]$ConsentNoPrompt,
  [string]$LogPath = (Join-Path $env:LOCALAPPDATA 'win-setup\logs\admin-setup.txt')
)

$ErrorActionPreference = 'Continue'
New-Item -ItemType Directory -Force -Path (Split-Path $LogPath) | Out-Null

& {
  "start $(Get-Date -Format s)"
  $el = ([Security.Principal.WindowsPrincipal][Security.Principal.WindowsIdentity]::GetCurrent()).IsInRole([Security.Principal.WindowsBuiltInRole]::Administrator)
  "elevated=$el"
  "switches DevMode=$DevMode LongPaths=$LongPaths Sudo=$Sudo HibernateOff=$HibernateOff ConsentNoPrompt=$ConsentNoPrompt"
  if (-not $el) { 'not elevated - nothing applied' }
  else {
    if ($DevMode)      { reg.exe add "HKLM\SOFTWARE\Microsoft\Windows\CurrentVersion\AppModelUnlock" /v AllowDevelopmentWithoutDevLicense /t REG_DWORD /d 1 /f }
    if ($LongPaths)    { reg.exe add "HKLM\SYSTEM\CurrentControlSet\Control\FileSystem" /v LongPathsEnabled /t REG_DWORD /d 1 /f }
    if ($Sudo)         { & (Join-Path $env:SystemRoot 'System32\sudo.exe') config --enable normal }
    if ($HibernateOff) { powercfg.exe /h off }
    # Lowers security for every program: admin elevation without a UAC prompt. Only when the user approved it separately.
    if ($ConsentNoPrompt) { reg.exe add "HKLM\SOFTWARE\Microsoft\Windows\CurrentVersion\Policies\System" /v ConsentPromptBehaviorAdmin /t REG_DWORD /d 0 /f }
  }
  "end $(Get-Date -Format s)"
} *>&1 | Out-File -FilePath $LogPath -Encoding utf8
