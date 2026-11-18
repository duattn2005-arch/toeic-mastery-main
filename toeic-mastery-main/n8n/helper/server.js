// Local helper for n8n: screenshots a toeicmastery.click page (login popup and
// cookie notice pre-dismissed via storage) and uploads it to a public host,
// because the Threads API only accepts a public image_url.
//   GET /shot?path=/tu-vung  ->  {"url": "https://files.catbox.moe/xxxx.png", "page": "..."}
const http = require("http");
const { chromium } = require("playwright");

const SITE = process.env.SITE_URL || "https://toeicmastery.click";
const PORT = Number(process.env.HELPER_PORT || 5690);

let browserPromise;
function browser() {
  if (!browserPromise) {
    browserPromise = chromium.launch().then((b) => {
      b.on("disconnected", () => (browserPromise = undefined)); // relaunch next call
      return b;
    });
  }
  return browserPromise;
}

async function screenshot(path) {
  const b = await browser();
  const ctx = await b.newContext({
    viewport: { width: 540, height: 675 },
    deviceScaleFactor: 2, // 1080x1350, Threads' 4:5 portrait
    colorScheme: "dark",
    locale: "vi-VN",
    // The site's WAF answers "Forbidden" to the default HeadlessChrome UA.
    userAgent:
      "Mozilla/5.0 (iPhone; CPU iPhone OS 18_5 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/18.5 Mobile/15E148 Safari/604.1",
    isMobile: true,
    hasTouch: true,
  });
  await ctx.addInitScript(() => {
    try {
      sessionStorage.setItem("toeic-mastery:landing-auth-popup-dismissed", "1");
      localStorage.setItem("toeic-mastery:cookie-notice-accepted", "1");
    } catch {}
  });
  const page = await ctx.newPage();
  try {
    const resp = await page.goto(SITE + path, { waitUntil: "networkidle", timeout: 45000 });
    if (!resp || resp.status() !== 200) throw new Error("page returned " + (resp ? resp.status() : "no response"));
    await page.waitForTimeout(1500);
    // Some pages still open a login dialog (e.g. gated features) — close it.
    await page.keyboard.press("Escape").catch(() => {});
    await page.waitForTimeout(400);
    return await page.screenshot({ type: "png" });
  } finally {
    await ctx.close();
  }
}

async function upload(png) {
  const form = new FormData();
  form.append("reqtype", "fileupload");
  form.append("fileToUpload", new Blob([png], { type: "image/png" }), "toeic.png");
  const res = await fetch("https://catbox.moe/user/api.php", { method: "POST", body: form });
  const text = (await res.text()).trim();
  if (!res.ok || !text.startsWith("https://")) throw new Error("upload failed: " + text.slice(0, 200));
  return text;
}

http
  .createServer(async (req, res) => {
    const u = new URL(req.url, "http://localhost");
    const send = (code, body) => {
      res.writeHead(code, { "Content-Type": "application/json" });
      res.end(JSON.stringify(body));
    };
    if (u.pathname === "/health") return send(200, { ok: true });
    if (u.pathname !== "/shot") return send(404, { error: "not found" });
    const path = u.searchParams.get("path") || "/";
    if (!path.startsWith("/")) return send(400, { error: "path must start with /" });
    try {
      const url = await upload(await screenshot(path));
      send(200, { url, page: SITE + path });
    } catch (e) {
      send(500, { error: String(e.message || e) });
    }
  })
  .listen(PORT, "127.0.0.1", () => console.log("helper on http://127.0.0.1:" + PORT));
