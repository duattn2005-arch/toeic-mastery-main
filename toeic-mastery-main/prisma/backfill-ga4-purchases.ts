/**
 * CLI twin of /admin/ga4's "Gửi bù purchase" — same code
 * (src/lib/services/ga4-backfill.ts), for whoever has a terminal on the
 * server. Same once-only marker, so it can't double up with the web button.
 *
 *   npx tsx prisma/backfill-ga4-purchases.ts            # preview only
 *   npx tsx prisma/backfill-ga4-purchases.ts --live     # send, once
 */
import "dotenv/config";
import { db } from "../src/lib/db";
import { previewGa4Backfill, runGa4Backfill } from "../src/lib/services/ga4-backfill";

async function main() {
  const preview = await previewGa4Backfill();
  for (const i of preview.items) console.log(`[${i.kind}] ${i.transactionId} · ${i.value.toLocaleString("vi-VN")}đ · ${i.detail} · ${i.who}`);
  console.log(`\n${preview.total} purchase · ${preview.totalValue.toLocaleString("vi-VN")}đ · GA4: ${preview.targets.map((t) => `${t.measurementId} (${t.source})`).join(", ") || "chưa có khoá"}`);
  if (preview.doneAt) console.log(`Đã gửi bù lúc ${preview.doneAt}.`);
  if (process.argv.includes("--live")) console.log(JSON.stringify(await runGa4Backfill(null)));
  await db.$disconnect();
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
