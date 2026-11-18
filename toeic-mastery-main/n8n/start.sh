#!/bin/zsh
# n8n + helper run as LaunchAgents (start at login, restart on crash).
# This restarts both, e.g. after editing ~/.n8n-run/.env.
for svc in n8n helper; do
  launchctl kickstart -k gui/$(id -u)/com.toeicmastery.$svc 2>/dev/null ||
    launchctl bootstrap gui/$(id -u) ~/Library/LaunchAgents/com.toeicmastery.$svc.plist
done
echo "n8n: http://localhost:5678  (log ~/.n8n-run/n8n.log)"
