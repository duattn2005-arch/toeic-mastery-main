# Put origin/main on the live server WITHOUT the server talking to GitHub.
# The repo is private and the server's GitHub login no longer works, so its
# 2-minute auto-deploy can't fetch. Instead this machine packs main into a git
# bundle, copies it over SSH, and runs the server's own deploy script with
# GitHub's URL pointed at that bundle (build, health check and rollback stay
# exactly as /usr/local/bin/toeic-deploy.sh does them).
# FORCE=1: rebuild even when the server already has this commit (e.g. after a failed build).
# Usage (from this folder):  .\deploy-server.cmd
$Server = "root@162.4.176.19"
$Port = "24700"
$Key = "$HOME\.ssh\vps_inet_toeic"
$RepoUrl = "https://github.com/duattn2005-arch/toeic-mastery-main.git"
$Bundle = "/tmp/toeic-main.bundle"
Set-Location $PSScriptRoot

function Fail($msg) { Write-Host $msg -ForegroundColor Red; exit 1 }
$ssh = @("-i", $Key, "-o", "IdentitiesOnly=yes", "-o", "ConnectTimeout=20")

Write-Host "> Lay ban main moi nhat tu GitHub" -ForegroundColor Cyan
git fetch origin main 2>$null
if ($LASTEXITCODE -ne 0) {
  Write-Host "  Khong ket noi duoc GitHub - dung ban main dang co tren may." -ForegroundColor Yellow
} else {
  if ((git branch --show-current) -eq "main") { git merge --ff-only origin/main } else { git fetch . origin/main:main }
  if ($LASTEXITCODE -ne 0) { Fail "Khong cap nhat duoc nhanh main tren may." }
}
Write-Host ("  main = " + (git rev-parse --short main))

Write-Host "> Dong goi code" -ForegroundColor Cyan
$local = Join-Path $env:TEMP "toeic-main.bundle"
git bundle create $local main
if ($LASTEXITCODE -ne 0) { Fail "Dong goi that bai." }

Write-Host "> Gui len server" -ForegroundColor Cyan
scp @ssh -P $Port $local "${Server}:$Bundle"
if ($LASTEXITCODE -ne 0) { Fail "Khong gui duoc len server (kiem tra mang / khoa SSH)." }
Remove-Item $local -ErrorAction SilentlyContinue

Write-Host "> Build va khoi dong lai tren server (5-15 phut, dung tat terminal)..." -ForegroundColor Cyan
# One line: PowerShell 5.1 would pipe CRLF into bash. Waits for the cron run to release the lock first.
$remote = "cd /var/www/toeic-mastery && echo Server dang o: `$(git rev-parse --short HEAD); " +
  "for i in `$(seq 1 30); do flock -n /tmp/toeic-deploy.lock true && break; sleep 2; done; " +
  "FORCE=1 GIT_CONFIG_COUNT=1 GIT_CONFIG_KEY_0=url.$Bundle.insteadOf GIT_CONFIG_VALUE_0=$RepoUrl /usr/local/bin/toeic-deploy.sh; code=`$?; " +
  "rm -f $Bundle; echo; echo ===== Log deploy =====; tail -15 /var/log/toeic-deploy.log; " +
  "echo; echo Server bay gio o: `$(git rev-parse --short HEAD); exit `$code"
ssh @ssh -p $Port $Server $remote
if ($LASTEXITCODE -ne 0) { Fail "Deploy tren server that bai - xem log o tren (web van chay ban cu)." }

Write-Host "Xong. Mo web va bam Ctrl+Shift+R." -ForegroundColor Green
