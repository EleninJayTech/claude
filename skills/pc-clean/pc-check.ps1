# PC 느려짐 점검 — 읽기 전용. 아무것도 바꾸지 않는다.
# 정리는 pc-clean.ps1 이 맡는다. 절차는 같은 폴더의 SKILL.md.
#
#   pwsh -NoProfile -File .\pc-check.ps1
#   pwsh -NoProfile -File .\pc-check.ps1 -TempDays 3

param(
    [int]$TempDays = 7
)

$ErrorActionPreference = 'SilentlyContinue'

function GB($bytes) { '{0:N2}GB' -f ($bytes / 1GB) }

# 이 스크립트를 띄운 조상 프로세스(현재 Claude 세션 포함)는 정리 대상에서 뺀다
$self = @()
$p = Get-CimInstance Win32_Process -Filter "ProcessId=$PID"
while ($p) { $self += $p.ProcessId; $p = Get-CimInstance Win32_Process -Filter "ProcessId=$($p.ParentProcessId)" }

'=== 기본 ==='
$os = Get-CimInstance Win32_OperatingSystem
$c  = Get-PSDrive C
'C: 여유 {0} / 전체 {1}' -f (GB $c.Free), (GB ($c.Used + $c.Free))
'메모리 여유 {0:N1}GB / 전체 {1:N1}GB' -f ($os.FreePhysicalMemory / 1MB), ($os.TotalVisibleMemorySize / 1MB)
$up = (Get-Date) - $os.LastBootUpTime
'부팅 후 경과 {0}일 {1}시간 (마지막 부팅 {2:yyyy-MM-dd HH:mm})' -f $up.Days, $up.Hours, $os.LastBootUpTime
'CPU 부하 {0}%' -f (Get-CimInstance Win32_Processor | Measure-Object LoadPercentage -Average).Average

''
'=== 프로세스 ==='
$nodes = @(Get-CimInstance Win32_Process -Filter "Name='node.exe'")
$orphan = @($nodes | Where-Object { $_.ProcessId -notin $self -and -not (Get-Process -Id $_.ParentProcessId) })
'node.exe 전체 {0}개 / 고아(부모 없음) {1}개, 메모리 {2}' -f $nodes.Count, $orphan.Count, (GB (($orphan | Measure-Object WorkingSetSize -Sum).Sum))
if ($orphan.Count) { '  고아 PID: ' + (($orphan.ProcessId | Sort-Object) -join ' ') }

$claude = @(Get-CimInstance Win32_Process -Filter "Name='claude.exe'")
$old = @($claude | Where-Object { $_.ProcessId -notin $self -and $_.CreationDate -lt (Get-Date).Date })
'claude.exe 세션 {0}개 / 오늘 이전 시작 {1}개 (현재 세션 제외)' -f $claude.Count, $old.Count
foreach ($o in $old) { '  PID {0}  시작 {1:yyyy-MM-dd HH:mm}  메모리 {2}' -f $o.ProcessId, $o.CreationDate, (GB $o.WorkingSetSize) }

''
'=== 상위 메모리 프로세스 ==='
Get-Process | Group-Object Name | ForEach-Object {
    [pscustomobject]@{ Name = $_.Name; Count = $_.Count; MB = [math]::Round(($_.Group | Measure-Object WorkingSet64 -Sum).Sum / 1MB) }
} | Sort-Object MB -Descending | Select-Object -First 8 | ForEach-Object { '  {0,-22} {1,3}개 {2,7}MB' -f $_.Name, $_.Count, $_.MB }

''
'=== 용량 ==='
$tempDir = [IO.Path]::GetFullPath($env:TEMP)
$tf = @(Get-ChildItem -LiteralPath $tempDir -Recurse -Force -File)
$cut = (Get-Date).AddDays(-$TempDays)
$tfOld = @($tf | Where-Object { $_.LastWriteTime -lt $cut })
'TEMP 전체 {0} / {1}일 이상 {2} ({3}개)  [{4}]' -f (GB (($tf | Measure-Object Length -Sum).Sum)), $TempDays, (GB (($tfOld | Measure-Object Length -Sum).Sum)), $tfOld.Count, $tempDir

$bin = (New-Object -ComObject Shell.Application).NameSpace(0xA).Items()
$binSize = 0; foreach ($i in $bin) { $binSize += $i.ExtendedProperty('System.Size') }
'휴지통 {0} ({1}개)' -f (GB $binSize), $bin.Count

$ol = Join-Path $tempDir 'Outlook Logging'
if (Test-Path -LiteralPath $ol) {
    $of = @(Get-ChildItem -LiteralPath $ol -Recurse -Force -File)
    'Outlook Logging {0} ({1}개)  [{2}]' -f (GB (($of | Measure-Object Length -Sum).Sum)), $of.Count, $ol
} else { 'Outlook Logging 폴더 없음' }
