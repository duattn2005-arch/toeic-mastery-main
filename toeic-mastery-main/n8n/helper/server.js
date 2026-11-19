// Local helper for n8n: screenshots a toeicmastery.click page (login popup and
// cookie notice pre-dismissed via storage) and uploads it to a public host,
// because the Threads API only accepts a public image_url.
//   GET /shot?path=/tu-vung  ->  {"url": "https://files.catbox.moe/xxxx.png", "page": "..."}
const http = require("http");
const { chromium } = require("playwright");

const SITE = process.env.SITE_URL || "https://toeicmastery.click";
const PORT = Number(process.env.HELPER_PORT || 5690);

let browserPromise;
let studying = null;
function browser() {
  if (!browserPromise) {
    browserPromise = chromium.launch().then((b) => {
      b.on("disconnected", () => (browserPromise = undefined)); // relaunch next call
      return b;
    });
  }
  return browserPromise;
}

// Marks every popup/onboarding tour as already seen, so screenshots show the feature itself.
const INIT_STORAGE = () => {
  try {
    sessionStorage.setItem("toeic-mastery:landing-auth-popup-dismissed", "1");
    sessionStorage.setItem("welcome_offer_session_done", "true");
    sessionStorage.setItem("upgrade_nudge_shown_session_v1", "1");
    localStorage.setItem("toeic-mastery:cookie-notice-accepted", "1");
    localStorage.setItem("welcome_offer_view_count_v2", "99");
    localStorage.setItem("analysis_intro_seen", "1");
    for (const id of ["dashboard", "practice", "listening", "reading", "grammar", "vocabulary", "dictionary", "bookmarks", "history-list", "history-result", "transcript", "listening-news-transcript", "sound-player"])
      localStorage.setItem("tour_" + id + "_done", "true");
  } catch {}
};

const STATE = __dirname + "/auth-state.json"; // logged-in cookies of the showcase account
const fs = require("fs");

function newContext(b, withState) {
  return b.newContext({
    viewport: { width: 540, height: 675 },
    deviceScaleFactor: 2, // 1080x1350, Threads' 4:5 portrait
    colorScheme: "dark",
    locale: "vi-VN",
    // The site's WAF answers "Forbidden" to the default HeadlessChrome UA.
    userAgent:
      "Mozilla/5.0 (iPhone; CPU iPhone OS 18_5 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/18.5 Mobile/15E148 Safari/604.1",
    isMobile: true,
    hasTouch: true,
    ...(withState && fs.existsSync(STATE) ? { storageState: STATE } : {}),
  });
}

// Feature pages sit behind login: sign in as SITE_EMAIL once and reuse the cookies.
async function login(b) {
  if (!process.env.SITE_EMAIL || !process.env.SITE_PASSWORD) throw new Error("SITE_EMAIL/SITE_PASSWORD chưa có trong .env");
  const ctx = await newContext(b, false);
  const page = await ctx.newPage();
  try {
    await page.goto(SITE + "/login", { waitUntil: "networkidle", timeout: 45000 });
    await page.fill("#email", process.env.SITE_EMAIL);
    await page.fill("#password", process.env.SITE_PASSWORD);
    await page.click('button[type="submit"]');
    await page.waitForURL(/\/dashboard/, { timeout: 30000 });
    await ctx.storageState({ path: STATE });
  } finally {
    await ctx.close();
  }
}

async function screenshot(path, scroll = 0, retried = false, clicks = []) {
  const b = await browser();
  if (!fs.existsSync(STATE)) await login(b);
  const ctx = await newContext(b, true);
  await ctx.addInitScript(INIT_STORAGE);
  const page = await ctx.newPage();
  try {
    const resp = await page.goto(SITE + path, { waitUntil: "networkidle", timeout: 45000 });
    if (!resp || resp.status() !== 200) throw new Error("page returned " + (resp ? resp.status() : "no response"));
    if (/\/login/.test(page.url())) {
      if (retried) throw new Error("không đăng nhập được");
      fs.rmSync(STATE, { force: true }); // session expired: log in again
      await ctx.close();
      return screenshot(path, scroll, true, clicks);
    }
    await page.waitForTimeout(2000);
    await page.keyboard.press("Escape").catch(() => {}); // close any onboarding dialog
    // Optional taps (by visible text) to open a game/mode before the shot.
    for (const label of clicks) {
      await page.getByText(label, { exact: false }).first().click({ timeout: 8000 });
      await page.waitForTimeout(3500);
      await page.evaluate(() => window.scrollTo(0, 0));
    }
    if (scroll) await page.evaluate((y) => window.scrollTo(0, y), scroll);
    await page.waitForTimeout(800);
    const text = (await page.locator("main").first().innerText().catch(() => "")).replace(/\s+/g, " ").slice(0, 3000);
    return { png: await page.screenshot({ type: "png" }), text };
  } finally {
    await ctx.close().catch(() => {});
  }
}

// Image hosting: Threads/Facebook need a public image URL. Try catbox first, then uguu as a fallback.
async function upload(png) {
  const hosts = [
    async () => {
      const form = new FormData();
      form.append("reqtype", "fileupload");
      form.append("fileToUpload", new Blob([png], { type: "image/png" }), "toeic.png");
      const res = await fetch("https://catbox.moe/user/api.php", { method: "POST", body: form, headers: { "User-Agent": "curl/8.7.1" } });
      return (await res.text()).trim();
    },
    async () => {
      const form = new FormData();
      form.append("files[]", new Blob([png], { type: "image/png" }), "toeic.png");
      const res = await fetch("https://uguu.se/upload", { method: "POST", body: form, headers: { "User-Agent": "curl/8.7.1" } });
      const j = await res.json();
      return (j.files && j.files[0] && j.files[0].url) || "";
    },
  ];
  const errors = [];
  for (const host of hosts) {
    try {
      const url = await host();
      if (url.startsWith("https://")) return url;
      errors.push(url.slice(0, 80) || "rỗng");
    } catch (e) {
      errors.push(String(e.message).slice(0, 80));
    }
  }
  throw new Error("upload failed: " + errors.join(" | "));
}

http
  .createServer(async (req, res) => {
    const u = new URL(req.url, "http://localhost");
    const send = (code, body) => {
      res.writeHead(code, { "Content-Type": "application/json" });
      res.end(JSON.stringify(body));
    };
    if (u.pathname === "/health") return send(200, { ok: true });
    if (u.pathname === "/draft" && req.method === "POST") {
      // Group post draft: kept in drafts.md and published to the `drafts` branch for the Google Doc.
      let raw = "";
      for await (const c of req) raw += c;
      let d;
      try { d = JSON.parse(raw); } catch { return send(400, { error: "JSON không hợp lệ" }); }
      const when = new Date().toLocaleString("vi-VN", { timeZone: "Asia/Ho_Chi_Minh" });
      fs.appendFileSync(__dirname + "/../drafts.md", `\n## ${when} · ${d.kind}\n${d.imageUrl ? "Ảnh: " + d.imageUrl + "\n" : ""}\n**Bài đăng**\n${d.post}\n\n**Comment**\n${d.comment}\n\n---\n`);
      // Also published to the public `drafts` branch: the Google Doc's Apps Script
      // (time trigger) reads drafts.json from there and appends new entries.
      let doc = "đã lưu";
      try {
        const git = (...a) => require("child_process").execFileSync("git", ["-C", __dirname + "/../drafts-repo", "-c", "user.name=toeic-n8n", "-c", "user.email=n8n@localhost", ...a], { stdio: "pipe" });
        const file = __dirname + "/../drafts-repo/drafts.json";
        const list = JSON.parse(fs.readFileSync(file, "utf8"));
        list.unshift({ id: Date.now(), at: new Date().toISOString(), ...d });
        fs.writeFileSync(file, JSON.stringify(list.slice(0, 60), null, 1));
        git("add", "drafts.json");
        git("commit", "-q", "-m", "draft " + new Date().toISOString());
        git("push", "-q", "origin", "drafts");
        doc = "đã đẩy lên nhánh drafts, Google Docs sẽ nhận trong ≤15 phút";
      } catch (e) {
        doc = "lỗi đẩy GitHub: " + String(e.stderr || e.message).slice(0, 160);
      }
      return send(200, { saved: true, doc });
    }
    if (u.pathname === "/study") {
      // A study session runs for 1-2 hours (paced like a real learner), so it is
      // started in the background and only one runs at a time.
      if (studying && studying.exitCode === null) return send(409, { error: "đang có buổi học chạy" });
      const kind = u.searchParams.get("kind") || "reading";
      if (!["full", "listening", "reading"].includes(kind)) return send(400, { error: "kind không hợp lệ" });
      const logFile = __dirname + "/study-" + new Date().toISOString().slice(0, 10) + "-" + kind + ".log";
      const out = fs.openSync(logFile, "a");
      studying = require("child_process").spawn(process.execPath, [__dirname + "/study.js", kind], { stdio: ["ignore", out, out], env: process.env });
      return send(200, { started: true, kind, log: logFile });
    }
    if (u.pathname !== "/shot") return send(404, { error: "not found" });
    const path = u.searchParams.get("path") || "/";
    if (!path.startsWith("/")) return send(400, { error: "path must start with /" });
    try {
      const { png, text } = await screenshot(path, Number(u.searchParams.get("scroll") || 0), false, u.searchParams.getAll("click"));
      if (u.searchParams.get("raw")) {
        res.writeHead(200, { "Content-Type": "image/png" });
        return res.end(png);
      }
      const url = await upload(png);
      send(200, { url, page: SITE + path, text });
    } catch (e) {
      send(500, { error: String(e.message || e) });
    }
  })
  .listen(PORT, "127.0.0.1", () => console.log("helper on http://127.0.0.1:" + PORT));
