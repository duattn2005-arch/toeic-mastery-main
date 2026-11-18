// One-off: creates the showcase account on the site (no email verification needed).
const { chromium } = require("playwright");
(async () => {
  const b = await chromium.launch();
  const ctx = await b.newContext({ userAgent: "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/18.5 Safari/605.1.15" });
  const p = await ctx.newPage();
  await p.goto(process.env.SITE_URL + "/register", { waitUntil: "networkidle" });
  await p.fill("#fullName", "Minh Anh");
  await p.fill("#email", process.env.SITE_EMAIL);
  await p.fill("#password", process.env.SITE_PASSWORD);
  await p.fill("#confirmPassword", process.env.SITE_PASSWORD);
  await p.click('button[type="submit"]');
  await p.waitForTimeout(8000);
  console.log("url after submit:", p.url());
  console.log((await p.locator("body").innerText()).slice(0, 300));
  await b.close();
})();
