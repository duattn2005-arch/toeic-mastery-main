# One command to put everything on the live site:
#   check the code -> commit all changes -> merge into main and push (deploy.ps1).
# Usage (from this folder):  .\ship.cmd "mo ta thay doi"
param([string]$Message = "chore: cap nhat web")
Set-Location $PSScriptRoot
$Branch = "feat/bloom-analytics"

function Step($label, [scriptblock]$cmd) {
  Write-Host "> $label" -ForegroundColor Cyan
  & $cmd
  if ($LASTEXITCODE -ne 0) { Write-Host "Loi o buoc: $label - chua day len web." -ForegroundColor Red; exit 1 }
}

if ((git branch --show-current) -ne $Branch) { Step "git checkout $Branch" { git checkout $Branch } }

# A broken build would take the live site down, so stop here if the code doesn't pass.
Push-Location toeic-mastery-main
Step "kiem tra kieu (typecheck)" { npm run typecheck }
Step "chay kiem thu (test)" { npm test }
Pop-Location

Step "git add -A" { git add -A }
git diff --cached --quiet
if ($LASTEXITCODE -ne 0) {
  Step "git commit" { git commit -m $Message }
} else {
  Write-Host "Khong co thay doi moi de commit." -ForegroundColor Yellow
}

& "$PSScriptRoot\deploy.ps1" $Branch
exit $LASTEXITCODE
