// One-off: gives the showcase account a goal (850, exam in January) and starts its
// personalised learning path, so /mentor/path and the dashboard have real content.
const { chromium } = require("playwright");
(async () => {
  const b = await chromium.launch();
  const ctx = await b.newContext({ storageState: __dirname + "/auth-state.json", userAgent: "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/18.5 Safari/605.1.15" });
  await ctx.addInitScript(() => { try { localStorage.setItem("welcome_offer_view_count_v2", "99"); sessionStorage.setItem("welcome_offer_session_done", "true"); } catch {} });
  const p = await ctx.newPage();
  const site = process.env.SITE_URL;
  await p.goto(site + "/account/profile", { waitUntil: "networkidle" });
  await p.keyboard.press("Escape");
  await p.fill("#targetScore", "850");
  await p.fill("#examDate", "2027-01-16");
  await p.fill("#dailyStudyTargetMinutes", "45");
  await p.locator('button[type="submit"]').first().click();
  await p.waitForTimeout(4000);
  console.log("profile saved:", (await p.locator("main").innerText()).replace(/\s+/g, " ").slice(0, 160));
  await p.goto(site + "/mentor/path", { waitUntil: "networkidle" });
  await p.keyboard.press("Escape");
  const btn = p.getByRole("button", { name: /Bắt đầu lộ trình/ });
  if (await btn.count()) {
    await btn.first().click();
    await p.waitForTimeout(8000);
  }
  console.log("path:", (await p.locator("main").innerText()).replace(/\s+/g, " ").slice(0, 300));
  await b.close();
})();
