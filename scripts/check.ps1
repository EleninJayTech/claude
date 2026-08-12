<#
  check.ps1 — 저장소 정합성 검사 (드롭인 아님 · 이 저장소 유지보수 전용)

  판단이 필요 없는 결정적 검사만 담는다. 여기서 잡히는 것은 /audit 렌즈 B(버전·참조 무결성)와
  렌즈 E(실물↔백업 대조)의 기계적 부분이라, 사람·에이전트가 볼 이유가 없다.
  판단이 필요한 것(규칙끼리의 모순·절차 케이스 누락)은 /audit이 계속 담당한다.

  사용:  pwsh -File scripts/check.ps1          # 전체
         pwsh -File scripts/check.ps1 -Only 버전,규칙
  종료코드: FAIL 있으면 1
#>
[CmdletBinding()]
param([string[]]$Only)

$ErrorActionPreference = 'Stop'
$repo = Split-Path -Parent $PSScriptRoot
$home_ = $env:USERPROFILE
$fail = 0; $info = 0

function Section($n) { Write-Host ""; Write-Host "== $n" -ForegroundColor Cyan }
function Ok($m)   { Write-Host "   OK   $m" -ForegroundColor DarkGray }
function Bad($m)  { Write-Host "   FAIL $m" -ForegroundColor Red;    $script:fail++ }
function Note($m) { Write-Host "   INFO $m" -ForegroundColor Yellow; $script:info++ }
function Want($n) { return (-not $Only) -or ($Only -contains $n) }
function Slurp($p){ if (Test-Path -LiteralPath $p) { Get-Content -LiteralPath $p -Raw -Encoding UTF8 } else { $null } }

$dropins = Get-ChildItem -LiteralPath $repo -Filter '0*.md' | Sort-Object Name

# ─────────────────────────────────────────────── 1. 버전 4축
if (Want '버전') {
  Section "버전 4축 (헤더 = 버전 표 최신행 = 푸터 = CLAUDE.md 구성물 표)"
  $rc = Slurp (Join-Path $repo 'CLAUDE.md')
  foreach ($f in $dropins) {
    $t = Slurp $f.FullName
    $hdr = [regex]::Match($t, '\*\*문서 버전:\s*(v[\d.]+)\*\*').Groups[1].Value
    $rows = [regex]::Matches($t, '(?m)^>\s*\|\s*(v[\d.]+)\s*\|')
    $last = if ($rows.Count) { $rows[$rows.Count-1].Groups[1].Value } else { '' }
    $ftr = [regex]::Match($t, '(?m)^\*\*문서 정보\*\*.*?\*\*(v[\d.]+)\*\*').Groups[1].Value
    $tbl = [regex]::Match($rc, [regex]::Escape('`'+$f.Name+'`') + '[^\r\n]*?\|\s*(v[\d.]+)\s*\(').Groups[1].Value
    $set = @($hdr,$last,$ftr,$tbl) | Sort-Object -Unique
    if ($set.Count -eq 1 -and $set[0]) { Ok "$($f.Name.Substring(0,2))  $hdr" }
    else { Bad "$($f.Name)  헤더=$hdr 표=$last 푸터=$ftr CLAUDE.md=$tbl" }
  }
}

# ─────────────────────────────────────────────── 2. 버전 표 시간순·결번
if (Want '버전') {
  Section "버전 표 — 시간순 · 결번"
  foreach ($f in $dropins) {
    $t = Slurp $f.FullName
    $vs = [regex]::Matches($t, '(?m)^>\s*\|\s*v([\d]+)\.([\d]+)\s*\|') |
          ForEach-Object { [pscustomobject]@{ Maj=[int]$_.Groups[1].Value; Min=[int]$_.Groups[2].Value } }
    if (-not $vs) { Bad "$($f.Name) 버전 표 없음"; continue }
    $bad = @()
    for ($i=1; $i -lt $vs.Count; $i++) {
      $p=$vs[$i-1]; $c=$vs[$i]
      if ($c.Maj -lt $p.Maj -or ($c.Maj -eq $p.Maj -and $c.Min -le $p.Min)) { $bad += "역순 v$($p.Maj).$($p.Min)→v$($c.Maj).$($c.Min)" }
      elseif ($c.Maj -eq $p.Maj -and $c.Min -ne $p.Min+1) { $bad += "결번 v$($p.Maj).$($p.Min)→v$($c.Maj).$($c.Min)" }
    }
    if ($bad) { Bad "$($f.Name.Substring(0,2))  $($bad -join ' · ')" } else { Ok "$($f.Name.Substring(0,2))  $($vs.Count)행 연속" }
  }
}

# ─────────────────────────────────────────────── 3. 표 파손
if (Want '표') {
  Section "마크다운 표 — 열 수 일관성"
  foreach ($f in @($dropins) + @(Get-Item (Join-Path $repo 'CLAUDE.md'))) {
    $lines = (Slurp $f.FullName) -split "`r?`n"
    $blk = @(); $start = 0; $bad = @()
    for ($i=0; $i -le $lines.Count; $i++) {
      $l = if ($i -lt $lines.Count) { $lines[$i].TrimStart() } else { '' }
      if ($l -match '^>?\s*\|') {
        if (-not $blk.Count) { $start = $i+1 }
        $blk += ($l -replace '\\\|','') # 이스케이프된 파이프는 열 구분자가 아니다
      } elseif ($blk.Count) {
        if ($blk.Count -ge 2) {
          $counts = $blk | ForEach-Object { ([regex]::Matches($_, '\|')).Count } | Sort-Object -Unique
          if ($counts.Count -gt 1) { $bad += "줄 $start~$i (열수 $($counts -join '/'))" }
        }
        $blk = @()
      }
    }
    if ($bad) { Bad "$($f.Name)  $($bad -join ' · ')" } else { Ok "$($f.Name)" }
  }
}

# ─────────────────────────────────────────────── 4. BOM
if (Want 'bom') {
  Section "UTF-8 BOM (frontmatter를 무력화한다 — 2026-08-12 skill-setup 실버그)"
  $targets = @()
  $targets += $dropins.FullName
  $targets += (Join-Path $repo 'CLAUDE.md')
  $targets += (Get-ChildItem -LiteralPath $repo\docs -Filter '*.md' -EA SilentlyContinue).FullName
  foreach ($sub in 'skills','commands','output-styles') {
    $p = Join-Path $home_ ".claude\$sub"
    if (Test-Path $p) { $targets += (Get-ChildItem -LiteralPath $p -Recurse -Filter '*.md').FullName }
  }
  $hit = @()
  foreach ($t in ($targets | Where-Object { $_ })) {
    $b = [System.IO.File]::ReadAllBytes($t)
    if ($b.Length -ge 3 -and $b[0] -eq 0xEF -and $b[1] -eq 0xBB -and $b[2] -eq 0xBF) { $hit += $t }
  }
  if ($hit) { $hit | ForEach-Object { Bad "BOM: $_" } } else { Ok "$($targets.Count)개 파일 · BOM 0" }
}

# ─────────────────────────────────────────────── 5. frontmatter
if (Want 'front') {
  Section "frontmatter — name ↔ 폴더/파일명"
  foreach ($scope in @(@{p="$home_\.claude\skills"; kind='skill'}, @{p="$repo\.claude\skills"; kind='skill'}, @{p="$home_\.claude\commands"; kind='cmd'})) {
    if (-not (Test-Path $scope.p)) { continue }
    $files = if ($scope.kind -eq 'skill') { Get-ChildItem -LiteralPath $scope.p -Recurse -Filter 'SKILL.md' } else { Get-ChildItem -LiteralPath $scope.p -Filter '*.md' }
    foreach ($f in $files) {
      $expect = if ($scope.kind -eq 'skill') { $f.Directory.Name } else { $f.BaseName }
      $t = Slurp $f.FullName
      if ($t -notmatch '^---\r?\n') { Bad "$expect — frontmatter 시작 `---` 없음"; continue }
      $name = [regex]::Match($t, '(?m)^name:\s*(\S+)').Groups[1].Value
      if (-not $name) { Bad "$expect — name 키 없음" }
      elseif ($name -ne $expect) { Bad "$expect — name=$name (폴더/파일명과 불일치 → 호출 불가)" }
      else { Ok "$expect" }
    }
  }
}

# ─────────────────────────────────────────────── 6. 미러
if (Want '미러') {
  Section "정본(~/.claude) ↔ 백업(global-config) — 줄바꿈 정규화 · dropin-applied 제외"
  $norm = { param($s) ($s -replace "`r","") }
  $gc = Join-Path $repo 'global-config'
  $same = 0
  foreach ($rel in @('CLAUDE.md') + (Get-ChildItem -LiteralPath $gc -Recurse -Include 'SKILL.md','*.md' -EA SilentlyContinue |
            Where-Object { $_.FullName -match '\\(skills|commands|output-styles)\\' } |
            ForEach-Object { $_.FullName.Substring($gc.Length+1) })) {
    $src = Join-Path "$home_\.claude" $rel
    $dst = Join-Path $gc $rel
    if (-not (Test-Path -LiteralPath $src)) { Bad "정본 없음: $rel"; continue }
    $a = & $norm (Slurp $src); $b = & $norm (Slurp $dst)
    if ($rel -eq 'CLAUDE.md') {
      $a = (($a -split "`n") | Where-Object { $_ -notmatch '^\s*(<!--\s*)?dropin-applied' }) -join "`n"
      $b = (($b -split "`n") | Where-Object { $_ -notmatch '^\s*(<!--\s*)?dropin-applied' }) -join "`n"
    }
    if ($a -eq $b) { $same++ } else { Bad "차이: $rel" }
  }
  Ok "${same}개 일치"

  # settings.json — 구성 성격 키만 (포함 기준이 정본. 제외 목록을 늘리지 않는다)
  $ka = Get-Content "$home_\.claude\settings.json" -Raw -Encoding UTF8 | ConvertFrom-Json
  $kb = Get-Content (Join-Path $gc 'settings.json') -Raw -Encoding UTF8 | ConvertFrom-Json
  foreach ($k in 'permissions','hooks','attribution','autoMemoryEnabled') {
    $x = if ($null -ne $ka.$k) { $ka.$k | ConvertTo-Json -Depth 20 -Compress } else { 'null' }
    $y = if ($null -ne $kb.$k) { $kb.$k | ConvertTo-Json -Depth 20 -Compress } else { 'null' }
    if ($x -eq $y) { Ok "settings.$k" } else { Bad "settings.$k 실차이" }
  }
}

# ─────────────────────────────────────────────── 7. 규칙 대장
if (Want '규칙') {
  Section "규칙 동기화 대장 (docs/RULES.md)"
  $map = @{
    '00'="$repo\00_통합-설치.md"; '01'="$repo\01_Claude-Code-통합구성-범용마스터.md"
    '02'="$repo\02_모델분담-범용-플레이북.md"; '03'="$repo\03_확장기능-설치-체크리스트.md"
    '04'="$repo\04_검증-자동화.md"; '05'="$repo\05_출력스타일.md"; '06'="$repo\06_루틴-자동화.md"
    'RC'="$repo\CLAUDE.md"; 'GR'="$repo\global-config\README.md"
    '~resume'="$home_\.claude\skills\resume\SKILL.md"; '~wrap'="$home_\.claude\skills\wrap\SKILL.md"
    '~check'="$home_\.claude\skills\dropin-check\SKILL.md"; '~update'="$home_\.claude\skills\dropin-update\SKILL.md"
    '~setup'="$home_\.claude\commands\skill-setup.md"; '~GC'="$home_\.claude\CLAUDE.md"
    'p:audit'="$repo\.claude\skills\audit\SKILL.md"
    'p:reverify'="$repo\.claude\skills\reverify\SKILL.md"; 'p:optimize'="$repo\.claude\skills\optimize\SKILL.md"
  }
  $texts = @{}; foreach ($k in $map.Keys) { $texts[$k] = Slurp $map[$k] }

  $rules = Slurp "$repo\docs\RULES.md"
  $rows = [regex]::Matches($rules, '(?m)^\|\s*(R\d\d)\s*\|(.+?)\|\s*`(.+?)`\s*\|(.*?)\|(.*?)\|\s*$')
  if (-not $rows.Count) { Bad "RULES.md 파싱 실패 — 대장 표 형식을 확인하라" }
  foreach ($r in $rows) {
    $id = $r.Groups[1].Value
    $marker = $r.Groups[3].Value -replace '\\\|','|'
    $need = @([regex]::Matches($r.Groups[4].Value, '`([^`]+)`') | ForEach-Object { $_.Groups[1].Value })
    $okay = @([regex]::Matches($r.Groups[5].Value, '`([^`]+)`') | ForEach-Object { $_.Groups[1].Value })
    $miss = @(); $extra = @()
    foreach ($c in $need) {
      if (-not $texts.ContainsKey($c)) { $miss += "$c(코드 미정의)"; continue }
      if ($null -eq $texts[$c] -or $texts[$c] -notmatch $marker) { $miss += $c }
    }
    foreach ($c in $texts.Keys) {
      if ($need -contains $c -or $okay -contains $c) { continue }
      if ($texts[$c] -and $texts[$c] -match $marker) { $extra += $c }
    }
    if ($miss) { Bad "$id 누락 → $($miss -join ', ')" } else { Ok "$id  필수 $($need.Count)곳$(if($okay){" · 허용 $($okay.Count)"})" }
    if ($extra) { Note "$id 미등록 사본 → $($extra -join ', ')  (사본이면 필수에, 우연 일치면 허용에 등록)" }
  }
}

# ─────────────────────────────────────────────── 결과
Write-Host ""
if ($fail -gt 0) { Write-Host "FAIL $fail 건 · INFO $info 건" -ForegroundColor Red; exit 1 }
else { Write-Host "이상 없음 (INFO $info 건)" -ForegroundColor Green; exit 0 }
