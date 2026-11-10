/**
 * login-helper.js
 * Mở Chrome (có giao diện) với profile của bot chụp ảnh để bạn tự đăng nhập web
 * một lần, ví dụ bằng "Đăng nhập với Google". Phiên đăng nhập được lưu trong
 * n8n/.browser-profile và screenshot-service.js dùng lại phiên đó.
 *
 * Chạy: npm run login   (tắt screenshot-service.js trước, hai bên dùng chung profile)
 */

const path = require('path');
const puppeteer = require('puppeteer');
const { loadEnv, PROFILE_DIR, launchOptions } = require('./browser-config');

const env = loadEnv();
const SITE_URL = (env.SITE_URL || 'https://toeicmastery.click').replace(/\/$/, '');

(async () => {
  const browser = await puppeteer.launch({ ...launchOptions(env), headless: false, defaultViewport: null });
  const [page] = await browser.pages();
  await page.goto(`${SITE_URL}/login?next=%2Fdashboard`, { waitUntil: 'domcontentloaded' });
  console.log('👉 Đăng nhập trong cửa sổ Chrome vừa mở (chờ tối đa 10 phút)...');

  const deadline = Date.now() + 10 * 60 * 1000;
  while (Date.now() < deadline) {
    const pages = await browser.pages();
    const done = pages.some((p) => {
      const url = p.url();
      return url.startsWith(SITE_URL) && !/\/(login|register|auth)/.test(new URL(url).pathname);
    });
    if (done) {
      await new Promise((r) => setTimeout(r, 3000)); // để cookie phiên kịp ghi xuống profile
      console.log(`✅ Đã đăng nhập. Phiên lưu ở ${path.relative(process.cwd(), PROFILE_DIR) || PROFILE_DIR}`);
      await browser.close();
      return;
    }
    await new Promise((r) => setTimeout(r, 1000));
  }
  console.log('⏰ Hết 10 phút mà chưa đăng nhập xong.');
  await browser.close();
  process.exitCode = 1;
})().catch((e) => {
  console.error(e.message);
  process.exit(1);
});
