/**
 * screenshot-service.js
 * Node.js server chụp ảnh web bằng Puppeteer - chạy tại port 3001
 * n8n sẽ gọi POST http://localhost:3001/screenshot để lấy ảnh PNG
 *
 * Cài đặt: npm install puppeteer express
 * Chạy:    node screenshot-service.js
 */

const express = require('express');
const puppeteer = require('puppeteer');
const path = require('path');
const fs = require('fs');
const { createHash } = require('crypto');

const app = express();
app.use(express.json());

const PORT = 3001;
const SCREENSHOT_DIR = path.join(__dirname, 'screenshots');

// Tạo thư mục lưu ảnh nếu chưa có
if (!fs.existsSync(SCREENSHOT_DIR)) {
  fs.mkdirSync(SCREENSHOT_DIR, { recursive: true });
}

// Serve static files (để n8n lấy ảnh qua URL nếu cần)
app.use('/screenshots', express.static(SCREENSHOT_DIR));

let browser = null;

async function getBrowser() {
  if (!browser || !browser.isConnected()) {
    browser = await puppeteer.launch({
      headless: 'new',
      args: [
        '--no-sandbox',
        '--disable-setuid-sandbox',
        '--disable-dev-shm-usage',
        '--disable-accelerated-2d-canvas',
        '--disable-gpu',
        '--window-size=1280,900',
        '--lang=vi-VN',
      ],
    });
  }
  return browser;
}

/**
 * POST /screenshot
 * Body: { url, width?, height?, fullPage?, waitFor?, selector? }
 * Returns: JSON { success, filename, publicUrl, base64, width, height }
 */
app.post('/screenshot', async (req, res) => {
  const {
    url = 'http://localhost:3000',
    width = 1280,
    height = 800,
    fullPage = false,
    waitFor = 3000,
    selector = null,
  } = req.body;

  console.log(`📸 Chụp ảnh: ${url} (${width}x${height})`);

  let page = null;
  try {
    const b = await getBrowser();
    page = await b.newPage();

    // Viewport như người dùng thật
    await page.setViewport({ width: parseInt(width), height: parseInt(height) });

    // User agent thật để không bị block
    await page.setUserAgent(
      'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36'
    );

    // Chặn các resource không cần thiết để nhanh hơn
    await page.setRequestInterception(true);
    page.on('request', (req) => {
      const type = req.resourceType();
      if (['font', 'media'].includes(type)) {
        req.abort();
      } else {
        req.continue();
      }
    });

    await page.goto(url, {
      waitUntil: 'networkidle2',
      timeout: 30000,
    });

    // Chờ thêm để trang render đầy đủ (animation, lazy load)
    await new Promise((r) => setTimeout(r, parseInt(waitFor)));

    // Scroll xuống rồi lên lại để trigger lazy load
    await page.evaluate(() => {
      window.scrollTo(0, 500);
    });
    await new Promise((r) => setTimeout(r, 500));
    await page.evaluate(() => {
      window.scrollTo(0, 0);
    });
    await new Promise((r) => setTimeout(r, 300));

    let screenshotBuffer;

    if (selector) {
      // Chụp một element cụ thể
      try {
        const element = await page.$(selector);
        if (element) {
          screenshotBuffer = await element.screenshot({ type: 'png' });
        } else {
          screenshotBuffer = await page.screenshot({
            type: 'png',
            fullPage: fullPage,
          });
        }
      } catch {
        screenshotBuffer = await page.screenshot({
          type: 'png',
          fullPage: fullPage,
        });
      }
    } else {
      screenshotBuffer = await page.screenshot({
        type: 'png',
        fullPage: fullPage,
        clip: fullPage
          ? undefined
          : { x: 0, y: 0, width: parseInt(width), height: parseInt(height) },
      });
    }

    // Lưu file với tên dựa theo URL + timestamp
    const hash = createHash('md5')
      .update(url + Date.now())
      .digest('hex')
      .substring(0, 8);
    const filename = `screenshot-${hash}-${Date.now()}.png`;
    const filepath = path.join(SCREENSHOT_DIR, filename);
    fs.writeFileSync(filepath, screenshotBuffer);

    // Public URL (thay localhost bằng domain thật nếu dùng server)
    const publicUrl = `http://localhost:3001/screenshots/${filename}`;
    const base64 = screenshotBuffer.toString('base64');

    console.log(`✅ Đã chụp: ${filename}`);

    res.json({
      success: true,
      filename,
      publicUrl,
      base64: `data:image/png;base64,${base64}`,
      screenshotPublicUrl: publicUrl,
      width: parseInt(width),
      height: parseInt(height),
    });
  } catch (error) {
    console.error('❌ Lỗi chụp ảnh:', error.message);
    res.status(500).json({
      success: false,
      error: error.message,
      screenshotPublicUrl: null,
      base64: null,
    });
  } finally {
    if (page) {
      await page.close().catch(() => {});
    }
  }
});

// Health check
app.get('/health', (req, res) => {
  res.json({ status: 'ok', port: PORT });
});

// Xóa ảnh cũ hơn 24 giờ (chạy mỗi giờ)
setInterval(() => {
  const now = Date.now();
  const files = fs.readdirSync(SCREENSHOT_DIR);
  files.forEach((file) => {
    const filepath = path.join(SCREENSHOT_DIR, file);
    const stat = fs.statSync(filepath);
    if (now - stat.mtimeMs > 24 * 60 * 60 * 1000) {
      fs.unlinkSync(filepath);
      console.log(`🗑️  Đã xóa ảnh cũ: ${file}`);
    }
  });
}, 60 * 60 * 1000);

app.listen(PORT, () => {
  console.log(`🚀 Screenshot service chạy tại http://localhost:${PORT}`);
  console.log(`📁 Ảnh lưu tại: ${SCREENSHOT_DIR}`);
  console.log(`📸 API: POST http://localhost:${PORT}/screenshot`);
});

process.on('SIGINT', async () => {
  if (browser) await browser.close();
  process.exit(0);
});

