/**
 * screenshot-service.js
 * Chụp ảnh các trang TOEIC Mastery khi đã đăng nhập tài khoản demo, rồi upload
 * lên litterbox.catbox.moe (link công khai, tự xoá sau 1 giờ) để Threads lấy ảnh.
 *
 * Cấu hình trong n8n/.env (không commit):
 *   SITE_URL=https://toeicmastery.click
 *   DEMO_EMAIL=...        tài khoản email + mật khẩu (không phải tài khoản Google)
 *   DEMO_PASSWORD=...
 *
 * Chạy: node screenshot-service.js   (cổng 3001)
 * API:  POST /screenshot  { "path": "/vocabulary" }  ->  { success, publicUrl, path }
 */

const express = require('express');
const puppeteer = require('puppeteer');
const path = require('path');
const fs = require('fs');

const PORT = 3001;
const SCREENSHOT_DIR = path.join(__dirname, 'screenshots');
const PROFILE_DIR = path.join(__dirname, '.browser-profile');
const USER_AGENT = 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/130.0.0.0 Safari/537.36';

function loadEnv() {
  const file = path.join(__dirname, '.env');
  if (!fs.existsSync(file)) return {};
  return Object.fromEntries(
    fs.readFileSync(file, 'utf8').split(/\r?\n/).filter((l) => l.includes('=') && !l.startsWith('#')).map((l) => {
      const i = l.indexOf('=');
      return [l.slice(0, i).trim(), l.slice(i + 1).trim()];
    }),
  );
}
const env = { ...loadEnv(), ...process.env };
const SITE_URL = (env.SITE_URL || 'https://toeicmastery.click').replace(/\/$/, '');

fs.mkdirSync(SCREENSHOT_DIR, { recursive: true });

const app = express();
app.use(express.json());
app.use('/screenshots', express.static(SCREENSHOT_DIR));

const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

let browser = null;
async function getBrowser() {
  if (!browser || !browser.isConnected()) {
    // Profile riêng giữ cookie đăng nhập và các popup đã tắt, nên bot luôn là một "thiết bị".
    browser = await puppeteer.launch({ headless: 'new', userDataDir: PROFILE_DIR, args: ['--lang=vi-VN'] });
  }
  return browser;
}

async function login(page) {
  if (!env.DEMO_EMAIL || !env.DEMO_PASSWORD) throw new Error('Thiếu DEMO_EMAIL / DEMO_PASSWORD trong n8n/.env');
  await page.goto(`${SITE_URL}/login`, { waitUntil: 'networkidle0', timeout: 45000 });
  await sleep(1500); // chờ React gắn sự kiện, gõ sớm hơn sẽ mất chữ
  await page.type('#email', env.DEMO_EMAIL, { delay: 20 });
  await page.type('#password', env.DEMO_PASSWORD, { delay: 20 });
  await Promise.all([
    page.waitForNavigation({ waitUntil: 'networkidle2', timeout: 45000 }).catch(() => {}),
    page.click('form button[type=submit]'),
  ]);
  if (new URL(page.url()).pathname.startsWith('/login')) {
    const toast = await page.$$eval('[data-sonner-toast]', (els) => els.map((e) => e.textContent.trim()).join(' | '));
    throw new Error(`Đăng nhập tài khoản demo thất bại${toast ? `: ${toast}` : ''}`);
  }
}

/** Tắt banner cookie, popup hướng dẫn lần đầu và popup ưu đãi che màn hình. */
async function dismissOverlays(page) {
  for (let round = 0; round < 3; round++) {
    const clicked = await page.evaluate(() => {
      const labels = ['Bỏ qua', 'Đồng ý', 'Đã hiểu', 'Để sau'];
      let n = 0;
      for (const el of document.querySelectorAll('button, [role=button]')) {
        const text = el.textContent.trim();
        const aria = (el.getAttribute('aria-label') || '').toLowerCase();
        if (labels.includes(text) || /^(đóng|close)/.test(aria)) {
          el.click();
          n++;
        }
      }
      return n;
    });
    if (!clicked) break;
    await sleep(700);
  }
}

async function uploadPublic(file) {
  const form = new FormData();
  form.append('reqtype', 'fileupload');
  form.append('time', '1h');
  form.append('fileToUpload', new Blob([fs.readFileSync(file)], { type: 'image/png' }), path.basename(file));
  const res = await fetch('https://litterbox.catbox.moe/resources/internals/api.php', { method: 'POST', body: form });
  const text = (await res.text()).trim();
  if (!res.ok || !/^https:\/\//.test(text)) throw new Error(`Upload ảnh thất bại: ${text.slice(0, 200)}`);
  return text;
}

app.post('/screenshot', async (req, res) => {
  const pagePath = String(req.body.path || '/dashboard');
  console.log(`📸 Chụp: ${pagePath}`);
  let page = null;
  try {
    page = await (await getBrowser()).newPage();
    await page.setUserAgent(USER_AGENT);
    await page.setViewport({ width: 430, height: 932, deviceScaleFactor: 2, isMobile: true, hasTouch: true });

    await page.goto(SITE_URL + pagePath, { waitUntil: 'networkidle2', timeout: 45000 });
    if (new URL(page.url()).pathname.startsWith('/login')) {
      await login(page);
      await page.goto(SITE_URL + pagePath, { waitUntil: 'networkidle2', timeout: 45000 });
    }
    await sleep(2000);
    await dismissOverlays(page);
    await sleep(800);

    const filename = `shot-${Date.now()}.png`;
    const filepath = path.join(SCREENSHOT_DIR, filename);
    await page.screenshot({ path: filepath });
    // upload: false chỉ chụp và lưu trên máy (để thử), không đưa ảnh lên mạng.
    const publicUrl = req.body.upload === false ? null : await uploadPublic(filepath);
    console.log(`✅ ${pagePath} -> ${publicUrl}`);
    res.json({ success: true, path: pagePath, filename, publicUrl });
  } catch (error) {
    console.error('❌ Lỗi chụp ảnh:', error.message);
    res.status(500).json({ success: false, path: pagePath, error: error.message });
  } finally {
    if (page) await page.close().catch(() => {});
  }
});

app.get('/health', (req, res) => res.json({ status: 'ok', port: PORT, site: SITE_URL }));

// Xoá ảnh cũ hơn 24 giờ (mỗi giờ).
setInterval(() => {
  for (const file of fs.readdirSync(SCREENSHOT_DIR)) {
    const filepath = path.join(SCREENSHOT_DIR, file);
    if (Date.now() - fs.statSync(filepath).mtimeMs > 24 * 60 * 60 * 1000) fs.unlinkSync(filepath);
  }
}, 60 * 60 * 1000);

app.listen(PORT, () => console.log(`🚀 Screenshot service: http://localhost:${PORT} (site ${SITE_URL})`));
