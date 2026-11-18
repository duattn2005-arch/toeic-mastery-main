#!/bin/zsh
# Starts the screenshot helper + n8n with the API keys from .env (kept out of git).
cd ~/.n8n-run
set -a; . ./.env; set +a
export N8N_PORT=5678 N8N_BLOCK_ENV_ACCESS_IN_NODE=false GENERIC_TIMEZONE=Asia/Ho_Chi_Minh TZ=Asia/Ho_Chi_Minh
for port in 5678 5690; do lsof -ti tcp:$port -sTCP:LISTEN | xargs kill 2>/dev/null; done; sleep 3
nohup node helper/server.js > helper/helper.log 2>&1 &
nohup npx -y n8n > n8n.log 2>&1 &
echo "n8n: http://localhost:5678  (log ~/.n8n-run/n8n.log)"
