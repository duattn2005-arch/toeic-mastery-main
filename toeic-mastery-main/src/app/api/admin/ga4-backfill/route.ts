import { NextResponse } from "next/server";
import { getAuthedProfileOrNull } from "@/lib/auth";
import { runGa4PurchaseBackfill } from "@/lib/services/ga4-backfill";

/**
 * Admin-only, browser-triggerable twin of prisma/backfill-ga4-purchases.ts
 * — same one-time backfill, for whoever needs to run it but only has a
 * logged-in admin session, not a terminal on the server. See that
 * script's doc comment for what this actually does and why.
 *
 * GET (no params): dry run — builds the preview, sends nothing to GA4.
 * GET ?live=1: sends for real. Visit this exactly once — running it
 * twice double-counts every payment/code/grant as two separate purchases
 * (there is no dedup across separate runs). Delete this route once run.
 */
export async function GET(request: Request) {
  const profile = await getAuthedProfileOrNull();
  if (!profile || profile.role !== "ADMIN") return NextResponse.json({ error: "Chỉ quản trị viên" }, { status: 403 });

  const live = new URL(request.url).searchParams.get("live") === "1";
  const result = await runGa4PurchaseBackfill(live);
  return new NextResponse(result.lines.join("\n"), { headers: { "content-type": "text/plain; charset=utf-8" } });
}
