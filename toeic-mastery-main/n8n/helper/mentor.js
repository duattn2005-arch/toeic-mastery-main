// One-off: starts an AI Mentor conversation so the /mentor screen isn't empty.
const { chromium } = require("playwright");
(async () => {
  const b = await chromium.launch();
  const ctx = await b.newContext({ storageState: __dirname + "/auth-state.json", userAgent: "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/18.5 Safari/605.1.15" });
  await ctx.addInitScript(() => { try { localStorage.setItem("welcome_offer_view_count_v2", "99"); sessionStorage.setItem("welcome_offer_session_done", "true"); } catch {} });
  const p = await ctx.newPage();
  await p.goto(process.env.SITE_URL + "/mentor", { waitUntil: "networkidle" });
  await p.keyboard.press("Escape");
  const score = p.locator('input[type="number"]').first();
  if (await score.count()) {
    await score.fill("850");
    await p.locator('input[type="date"]').first().fill("2027-01-16").catch(() => {});
    await p.getByRole("button", { name: "Bắt đầu" }).first().click();
    await p.waitForTimeout(15000);
  }
  const box = p.getByPlaceholder(/Hỏi AI Mentor/);
  await box.fill("Mình làm Reading được 86/100 mà Part 7 hay bị hết giờ, nên luyện sao cho kịp vậy?");
  await box.press("Enter");
  await p.waitForTimeout(25000);
  console.log((await p.locator("main").innerText()).replace(/\s+/g, " ").slice(0, 700));
  await b.close();
})();
