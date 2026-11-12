# Merge the feature branch into main and push, so the live site redeploys.
# Usage (from this folder):  .\deploy.cmd [branch]
param([string]$Branch = "feat/bloom-analytics")
Set-Location $PSScriptRoot

# Args go to git as-is (no Invoke-Expression): PowerShell would mangle "stash@{0}".
function Run {
  Write-Host "> git $args" -ForegroundColor Cyan
  & git @args
  if ($LASTEXITCODE -ne 0) { Write-Host "Loi o buoc: git $args" -ForegroundColor Red; exit 1 }
}

if (Test-Path .git/MERGE_HEAD) {
  # A merge was left half-done (e.g. Vim closed without saving): finish it.
  Run commit --no-edit
} else {
  if ((git branch --show-current) -ne $Branch) { Run checkout $Branch }
  if (git status --porcelain --untracked-files=no) { Run stash push -m deploy-auto }
  Run checkout main
  Run pull --no-edit origin main
  Run merge --no-edit $Branch
}

Run push origin main
Run checkout $Branch
Run push origin $Branch

# Bring back the work that was set aside before merging.
$stash = git stash list | Where-Object { $_ -match [regex]::Escape($Branch) } | Select-Object -First 1
if ($stash) { Run stash pop ($stash.Split(':')[0]) }

Write-Host "Xong. Cho khoang 5 phut de web build lai, roi Ctrl+Shift+R." -ForegroundColor Green
