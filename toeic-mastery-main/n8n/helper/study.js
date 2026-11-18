// Showcase account "studies" for real: starts a test on the site, Gemini reads the
// passages / listens to the audio and picks answers, a share of answers is then
// deliberately changed so the account sits around an ~830 learner (weaker in
// Part 3 and Part 7), and the attempt is synced + submitted like the exam runner.
//   node study.js reading|listening|full [testId]
const { chromium } = require("playwright");
const fs = require("fs");

const SITE = process.env.SITE_URL || "https://toeicmastery.click";
const STATE = __dirname + "/auth-state.json";
const MODEL = process.env.GEMINI_MODEL || "gemini-3.1-flash-lite";
const UA = "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/18.5 Safari/605.1.15";

// Share of Gemini's answers flipped to another option, per Part (the ~830 profile).
const FLIP = { PART1: 0.0, PART2: 0.08, PART3: 0.14, PART4: 0.08, PART5: 0.12, PART6: 0.14, PART7: 0.24 };
// Seconds a real learner spends per question, per Part [min, max].
const PACE = { PART1: [20, 35], PART2: [18, 30], PART3: [25, 40], PART4: [25, 40], PART5: [15, 35], PART6: [25, 50], PART7: [45, 95] };

const sleep = (ms) => new Promise((r) => setTimeout(r, ms));
const rand = (a, b) => a + Math.floor(Math.random() * (b - a + 1));
const log = (...a) => console.log(new Date().toISOString().slice(11, 19), ...a);

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

// ---------------------------------------------------------------------------
async function gemini(parts, tries = 5) {
  for (let i = 0; i < tries; i++) {
    const res = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/${MODEL}:generateContent?key=${process.env.GEMINI_API_KEY}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ contents: [{ parts }], generationConfig: { temperature: 0, responseMimeType: "application/json" } }),
    });
    if (res.status === 429 || res.status >= 500) {
      log("gemini", res.status, "retry");
      await sleep(20000 * (i + 1));
      continue;
    }
    const j = await res.json();
    const t = (j.candidates?.[0]?.content?.parts || []).map((p) => p.text || "").join("");
    try {
      return JSON.parse(t.match(/\{[\s\S]*\}/)[0]);
    } catch {
      log("gemini bad json", JSON.stringify(j).slice(0, 200));
    }
  }
  return {};
}

const abs = (u) => (/^https?:/.test(u) ? u : SITE + (u.startsWith("/") ? "" : "/") + u);
async function inline(url) {
  const res = await fetch(abs(url), { headers: { "User-Agent": UA } });
  if (!res.ok) throw new Error("download " + res.status + " " + url);
  let mime = (res.headers.get("content-type") || "").split(";")[0];
  if (!mime || mime === "application/octet-stream") mime = /\.(png)$/i.test(url) ? "image/png" : /\.(jpe?g|webp)$/i.test(url) ? "image/jpeg" : "audio/mpeg";
  return { inline_data: { mime_type: mime, data: Buffer.from(await res.arrayBuffer()).toString("base64") } };
}

const optText = (q) => q.options.map((o) => `(${o.label}) ${o.content || ""}`).join("  ");
const ASK = 'Trả về JSON dạng {"answers": {"<id câu>": "<A|B|C|D>"}} cho MỌI câu, không giải thích.';

// One Gemini call per group (a passage, or a batch of standalone questions).
async function solveGroup(qs, passage) {
  const parts = [];
  const part = qs[0].part;
  const listening = ["PART1", "PART2", "PART3", "PART4"].includes(part);
  parts.push({ text: `Bạn là thí sinh TOEIC trình độ cao. Hãy làm các câu ${part.replace("PART", "Part ")} sau.` });
  if (passage) {
    if (passage.audioUrl) parts.push({ text: "Audio đoạn hội thoại/bài nói:" }, await inline(passage.audioUrl));
    for (const img of passage.imageUrls || []) parts.push({ text: "Hình/biểu đồ kèm theo:" }, await inline(img));
    if (passage.transcript && !passage.audioUrl) parts.push({ text: "Lời thoại: " + passage.transcript });
    for (const t of passage.texts || []) parts.push({ text: `${t.label ? t.label + ": " : ""}${t.content}` });
  }
  for (const q of qs) {
    parts.push({ text: `Câu id=${q.id}: ${q.prompt || "(nghe audio)"}  ${optText(q)}` });
    if (q.imageUrl) parts.push({ text: "Ảnh của câu này:" }, await inline(q.imageUrl));
    if (q.audioUrl) parts.push({ text: "Audio của câu này:" }, await inline(q.audioUrl));
    if (q.transcript && !q.audioUrl) parts.push({ text: "Lời thoại: " + q.transcript });
  }
  if (listening && part === "PART2") parts.push({ text: "Part 2: chọn câu đáp lại phù hợp nhất (A/B/C) cho câu hỏi trong audio." });
  if (part === "PART1") parts.push({ text: "Part 1: chọn câu mô tả đúng nhất bức ảnh (A/B/C/D) theo audio." });
  parts.push({ text: ASK });
  const out = await gemini(parts);
  return out.answers || {};
}

// RSC flight payload -> the ExamRunner's `data` prop.
function examDataFrom(flight) {
  const key = '"questions":[';
  const i = flight.indexOf(key);
  if (i < 0) throw new Error("không tìm thấy dữ liệu đề");
  // Walk back to the object start that owns "attemptId".
  let start = flight.lastIndexOf('{"attemptId"', i);
  let depth = 0, inStr = false, esc = false, end = -1;
  for (let k = start; k < flight.length; k++) {
    const c = flight[k];
    if (inStr) { if (esc) esc = false; else if (c === "\\") esc = true; else if (c === '"') inStr = false; continue; }
    if (c === '"') inStr = true;
    else if (c === "{" || c === "[") depth++;
    else if (c === "}" || c === "]") { depth--; if (depth === 0) { end = k + 1; break; } }
  }
  const unescape = (v) => (typeof v === "string" && v.startsWith("$$") ? v.slice(1) : v);
  return JSON.parse(flight.slice(start, end), (_, v) => unescape(v));
}

async function main() {
  const kind = process.argv[2] || "reading";
  const b = await chromium.launch();
  const ctx = await b.newContext({ storageState: fs.existsSync(STATE) ? STATE : undefined, userAgent: UA, viewport: { width: 1280, height: 900 } });
  await ctx.addInitScript(INIT_STORAGE);
  const page = await ctx.newPage();
  try {
    let testId = process.argv[3];
    if (!testId) {
      await page.goto(SITE + "/practice?category=FULL", { waitUntil: "networkidle" });
      const ids = await page.$$eval('a[href^="/practice/"]', (as) => [...new Set(as.map((a) => a.getAttribute("href").split("/")[2]).filter((x) => /^[0-9a-f-]{36}$/.test(x)))]);
      if (!ids.length) throw new Error("không thấy đề nào");
      testId = ids[rand(0, Math.min(ids.length, 6) - 1)];
    }
    log("test", testId, kind);
    await page.goto(SITE + "/practice/" + testId, { waitUntil: "networkidle" });
    await page.keyboard.press("Escape").catch(() => {});
    // An unfinished attempt is resumed instead of burning another of the day's starts.
    const resume = await page.$$eval('a[href^="/exam/"]', (as) => as.map((a) => a.getAttribute("href")));
    if (resume.length) {
      log("làm tiếp", resume[0]);
      await page.goto(SITE + resume[0], { waitUntil: "networkidle" });
    } else {
      const title = { full: "Full Test", listening: "Thi Listening", reading: "Thi Reading" }[kind];
      await page.locator("button", { hasText: title }).first().click();
      await page.waitForURL(/\/exam\/|limitReached|proRequired/, { timeout: 60000 });
      if (!/\/exam\//.test(page.url())) throw new Error("không bắt đầu được: " + page.url());
      // Reached by client navigation: reload so the exam data is in the server-rendered payload.
      await page.reload({ waitUntil: "networkidle" });
    }
    // Exam data is in the server-rendered RSC payload: self.__next_f.push([1,"<js string>"]) scripts.
    const html = await page.content();
    const flight = [...html.matchAll(/self\.__next_f\.push\(\[1,("(?:[^"\\]|\\.)*")\]\)/g)].map((m) => JSON.parse(m[1])).join("");
    const data = examDataFrom(flight);
    const t0 = Date.now();
    log("attempt", data.attemptId, data.questions.length, "câu");

    // Group: passage-based questions together; standalone ones by Part (P1/P2 one by one, P5 batches of 10).
    const groups = [];
    const byPassage = new Map();
    for (const q of data.questions) {
      if (q.passageId) {
        if (!byPassage.has(q.passageId)) { byPassage.set(q.passageId, []); groups.push({ qs: byPassage.get(q.passageId), passage: data.passages[q.passageId] }); }
        byPassage.get(q.passageId).push(q);
      } else {
        const last = groups[groups.length - 1];
        const size = q.part === "PART5" ? 10 : 1;
        if (last && !last.passage && last.qs[0].part === q.part && last.qs.length < size) last.qs.push(q);
        else groups.push({ qs: [q], passage: null });
      }
    }

    const chosen = {};
    for (const [gi, g] of groups.entries()) {
      try {
        Object.assign(chosen, await solveGroup(g.qs, g.passage));
      } catch (e) {
        log("group lỗi", gi, e.message);
      }
      if (gi % 10 === 0) log(`nhóm ${gi + 1}/${groups.length}`);
      await sleep(4500);
    }

    let flipped = 0;
    const answers = data.questions.map((q) => {
      const labels = q.options.map((o) => o.label);
      let label = labels.includes(chosen[q.id]) ? chosen[q.id] : labels[rand(0, labels.length - 1)];
      if (Math.random() < (FLIP[q.part] || 0)) {
        label = labels.filter((l) => l !== label)[rand(0, labels.length - 2)];
        flipped++;
      }
      const [lo, hi] = PACE[q.part] || [20, 40];
      return { questionId: q.id, selectedLabel: label, isFlagged: false, initialSelectedLabel: label, answerChangeCount: 0, timeSpentDeltaSec: rand(lo, hi) };
    });
    // The site times an attempt from start to submit, so answers are synced in
    // chunks spread over a realistic duration instead of all at once.
    const spent = answers.reduce((s, a) => s + a.timeSpentDeltaSec, 0);
    const elapsed = Math.round((Date.now() - t0) / 1000);
    const budget = Math.max(60, Math.round(data.remainingSec * 0.92) - elapsed);
    const scale = Math.min(1, budget / spent);
    log("gemini trả lời", Object.keys(chosen).length, "/", data.questions.length, "| đổi", flipped, "| làm trong", Math.round((spent * scale) / 60), "phút");
    let remainingSec = data.remainingSec - elapsed;
    const post = (path, body) =>
      page.evaluate(
        async ({ url, body }) => {
          const r = await fetch(url, { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(body) });
          return { status: r.status, body: await r.text() };
        },
        { url: `/api/attempts/${data.attemptId}/${path}`, body }
      );
    const result = [];
    for (let i = 0; i < answers.length; i += 10) {
      const chunk = answers.slice(i, i + 10);
      const wait = Math.round(chunk.reduce((s, a) => s + a.timeSpentDeltaSec, 0) * scale);
      await sleep(wait * 1000);
      remainingSec = Math.max(30, remainingSec - wait);
      const r = await post("sync", { remainingSec, currentQuestionIndex: Math.min(i + 10, answers.length - 1), answers: chunk });
      if (r.status !== 200) log("sync", r.status, r.body.slice(0, 100));
      result.push(r);
      if (i % 50 === 0) log(`đã làm ${i + chunk.length}/${answers.length}`);
    }
    result.push(await post("submit", {}));
    log("sync/submit", result.map((r) => r.status).join(","), result[result.length - 1].body.slice(0, 120));
    await page.goto(SITE + "/history/" + data.attemptId, { waitUntil: "networkidle" });
    const summary = (await page.locator("main").innerText()).replace(/\s+/g, " ").slice(0, 400);
    log("kết quả:", summary);
    console.log(JSON.stringify({ ok: true, attemptId: data.attemptId, testId, kind, flipped }));
  } finally {
    await ctx.storageState({ path: STATE }).catch(() => {});
    await b.close();
  }
}

main().catch((e) => {
  console.error("LỖI", e.message);
  process.exit(1);
});
