#!/bin/zsh
# Foreground runner used by the LaunchAgents: `run.sh n8n` or `run.sh helper`.
export PATH=/usr/local/bin:/usr/bin:/bin:/usr/sbin:/sbin
cd ~/.n8n-run
set -a; . ./.env; set +a
export N8N_PORT=5678 N8N_BLOCK_ENV_ACCESS_IN_NODE=false GENERIC_TIMEZONE=Asia/Ho_Chi_Minh TZ=Asia/Ho_Chi_Minh
case "$1" in
  n8n) exec npx -y n8n ;;
  helper) exec node helper/server.js ;;
esac
