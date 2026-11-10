// Cấu hình trình duyệt dùng chung cho screenshot-service.js và login-helper.js.
const path = require('path');
const fs = require('fs');

const PROFILE_DIR = path.join(__dirname, '.browser-profile');

function loadEnv() {
  const file = path.join(__dirname, '.env');
  const fromFile = !fs.existsSync(file)
    ? {}
    : Object.fromEntries(
        fs.readFileSync(file, 'utf8').split(/\r?\n/).filter((l) => l.includes('=') && !l.startsWith('#')).map((l) => {
          const i = l.indexOf('=');
          return [l.slice(0, i).trim(), l.slice(i + 1).trim()];
        }),
      );
  return { ...fromFile, ...process.env };
}

/** Chrome đã cài trên máy (CHROME_PATH trong .env) thay vì Chrome của puppeteer:
 * Google chặn đăng nhập trên trình duyệt tự động, Chrome thật thì không. */
function launchOptions(env) {
  return {
    userDataDir: PROFILE_DIR,
    args: ['--lang=vi-VN'],
    ...(env.CHROME_PATH ? { executablePath: env.CHROME_PATH, ignoreDefaultArgs: ['--enable-automation'] } : {}),
  };
}

module.exports = { PROFILE_DIR, loadEnv, launchOptions };
