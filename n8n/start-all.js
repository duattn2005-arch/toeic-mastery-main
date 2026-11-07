/**
 * start-all.js
 * Chạy cả screenshot service + n8n cùng lúc
 * Sử dụng: node start-all.js
 */
const { spawn } = require('child_process');
const path = require('path');

console.log('🚀 Khởi động TOEIC Threads Automation...\n');

// 1. Screenshot service
const screenshot = spawn('node', ['screenshot-service.js'], {
  cwd: __dirname,
  stdio: 'inherit',
  shell: true
});
console.log('📸 Screenshot service đang khởi động (port 3001)...');

// 2. n8n
const n8n = spawn('npx', ['n8n'], {
  cwd: __dirname,
  stdio: 'inherit',
  shell: true,
  env: {
    ...process.env,
    N8N_DEFAULT_BINARY_DATA_MODE: 'filesystem',
    GENERIC_TIMEZONE: 'Asia/Ho_Chi_Minh'
  }
});
console.log('⚡ n8n đang khởi động (port 5678)...');

process.on('SIGINT', () => {
  console.log('\n🛑 Đang tắt...');
  screenshot.kill();
  n8n.kill();
  process.exit(0);
});

screenshot.on('exit', (code) => console.log(`📸 Screenshot service tắt (code ${code})`));
n8n.on('exit', (code) => console.log(`⚡ n8n tắt (code ${code})`));

