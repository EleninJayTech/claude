# PC 정리 — 스위치로 켠 항목만 실행한다. 스위치 없이 실행하면 아무것도 안 한다.
# 점검은 pc-check.ps1 이 맡는다. 절차는 같은 폴더의 SKILL.md.
#
#   pwsh -NoProfile -File .\pc-clean.ps1 -OrphanNode                 # 부모 없는 node.exe 종료
#   pwsh -NoProfile -Command "& .\pc-clean.ps1 -ClaudePid 9388,1884"  # 지정한 claude.exe 세션 종료 (-File 은 PID 목록을 문자열 하나로 넘겨 실패)
#   pwsh -NoProfile -File .\pc-clean.ps1 -Temp -RecycleBin -OutlookLog
#   pwsh -NoProfile -File .\pc-clean.ps1 -Temp -TempDays 3
#
# 프로세스 종료는 taskkill 로만 한다. 일부 회사 PC에서 Stop-Process 가 pwsh 를 0xc0000409 로 죽였다.

param(
    [switch]$OrphanNode,
    [int[]]$ClaudePid,
    [switch]$Temp,
    [int]$TempDays = 7,
    [switch]$RecycleBin,
    [switch]$OutlookLog
)

$ErrorActionPreference = 'SilentlyContinue'

function GB($bytes) { '{0:N2}GB' -f ($bytes / 1GB) }

# 이 스크립트를 띄운 조상 프로세스(현재 Claude 세션 포함)는 절대 죽이지 않는다
$self = @()
$p = Get-CimInstance Win32_Process -Filter "ProcessId=$PID"
while ($p) { $self += $p.ProcessId; $p = Get-CimInstance Win32_Process -Filter "ProcessId=$($p.ParentProcessId)" }

function Kill-Pids([int[]]$pids, [string]$label) {
    $pids = @($pids | Where-Object { $_ -notin $self })
    if (-not $pids.Count) { "$label 대상 없음"; return }
    $alive = 0
    for ($i = 0; $i -lt $pids.Count; $i += 20) {
        $chunk = $pids[$i..([math]::Min($i + 19, $pids.Count - 1))]
        $tk = @('/F') + ($chunk | ForEach-Object { '/PID', $_ })
        & taskkill.exe @tk 2>&1 | Out-Null
    }
    Start-Sleep -Milliseconds 500
    $alive = @($pids | Where-Object { Get-Process -Id $_ }).Count
    '{0} 대상 {1}개 → 남음 {2}개' -f $label, $pids.Count, $alive
    if ($alive) {
        '  taskkill 이 막혔습니다. cmd 에서 직접 실행하십시오:'
        '  taskkill /F ' + (($pids | Where-Object { Get-Process -Id $_ } | ForEach-Object { "/PID $_" }) -join ' ')
    }
}

$os0 = Get-CimInstance Win32_OperatingSystem
$free0 = (Get-PSDrive C).Free

if ($OrphanNode) {
    '=== A. 고아 node.exe ==='
    $orphan = @(Get-CimInstance Win32_Process -Filter "Name='node.exe'" | Where-Object { -not (Get-Process -Id $_.ParentProcessId) })
    Kill-Pids $orphan.ProcessId '고아 node'
}

if ($ClaudePid) {
    '=== B. 이전 claude.exe 세션 ==='
    # Get-Process 이름은 자동 업데이트 후 'claude.exe.old.<숫자>'가 될 수 있어 CIM Name 으로 본다.
    $ok = @($ClaudePid | Where-Object { (Get-CimInstance Win32_Process -Filter "ProcessId=$_").Name -eq 'claude.exe' })
    $bad = @($ClaudePid | Where-Object { $_ -notin $ok })
    if ($bad.Count) { '  claude.exe 가 아니라 건너뜀: ' + ($bad -join ' ') }
    Kill-Pids $ok 'claude 세션'
}

# 변수명은 대소문자를 가리지 않아 $temp 로 쓰면 [switch]$Temp 에 대입돼 경로가 "True"가 된다.
$tempDir = [IO.Path]::GetFullPath($env:TEMP)

if ($Temp) {
    "=== C. TEMP $TempDays 일 이상 ==="
    $cut = (Get-Date).AddDays(-$TempDays)
    $files = @(Get-ChildItem -LiteralPath $tempDir -Recurse -Force -File | Where-Object { $_.LastWriteTime -lt $cut })
    $tot = ($files | Measure-Object Length -Sum).Sum
    $fail = 0
    foreach ($f in $files) {
        if (-not $f.FullName.StartsWith($tempDir)) { continue }
        try { [IO.File]::Delete($f.FullName) } catch { $fail++ }
    }
    Get-ChildItem -LiteralPath $tempDir -Recurse -Force -Directory | Sort-Object FullName -Descending | ForEach-Object {
        if ($_.FullName.StartsWith($tempDir) -and -not (Get-ChildItem -LiteralPath $_.FullName -Force)) { try { [IO.Directory]::Delete($_.FullName) } catch {} }
    }
    '대상 {0} / {1}개, 잠겨서 못 지운 파일 {2}개' -f (GB $tot), $files.Count, $fail
}

if ($RecycleBin) {
    '=== D. 휴지통 ==='
    Clear-RecycleBin -Force
    '비움'
}

if ($OutlookLog) {
    '=== E. Outlook Logging ==='
    $ol = Join-Path $tempDir 'Outlook Logging'
    if (Test-Path -LiteralPath $ol) {
        $f = @(Get-ChildItem -LiteralPath $ol -Recurse -Force -File)
        $sz = ($f | Measure-Object Length -Sum).Sum
        $lock = 0
        foreach ($i in $f) { try { [IO.File]::Delete($i.FullName) } catch { $lock++ } }
        '{0} 중 잠긴 파일 {1}개 남김' -f (GB $sz), $lock
    } else { '폴더 없음' }
}

if (-not ($OrphanNode -or $ClaudePid -or $Temp -or $RecycleBin -or $OutlookLog)) {
    '스위치가 없어 아무것도 하지 않았습니다. -OrphanNode -ClaudePid -Temp -RecycleBin -OutlookLog 중 고르십시오.'
    return
}

''
'=== 결과 ==='
$os1 = Get-CimInstance Win32_OperatingSystem
'C: 여유 {0} → {1}' -f (GB $free0), (GB (Get-PSDrive C).Free)
'메모리 여유 {0:N1}GB → {1:N1}GB' -f ($os0.FreePhysicalMemory / 1MB), ($os1.FreePhysicalMemory / 1MB)
