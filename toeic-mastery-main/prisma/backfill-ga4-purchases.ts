/**
 * One-time backfill: sends a GA4 "purchase" event for every real Pro grant
 * that happened before this app started firing `purchase` at
 * checkout-click time (pro-card.tsx) / before trackPaymentConfirmed
 * existed. These are real — the money or the code redemption genuinely
 * happened — they just never reached GA4 as a `purchase`.
 *
 * Covers three sources. The first two are every one ever, not just
 * currently-active Pro (a lapsed Pro still really was a purchase); the
 * third is necessarily just a current snapshot (see below):
 *   1. Payment rows with status SUCCESS — real VND amount on file, so sent
 *      with value + currency + items.
 *   2. ActivationCode rows that were redeemed — no price is stored for
 *      these (see schema), so sent as a `purchase` with NO value/currency.
 *   3. Currently-PRO profiles that trace to neither of the above — only
 *      reachable via the admin's updateUserPlanAction Free/Pro toggle
 *      (written for support/comp/test, no money recorded), which the site
 *      owner also uses for real payments sent outside the app and wants
 *      counted too, explicitly, test accounts included (her call, her
 *      property). Also sent with no value/currency. This group can only be
 *      today's currently-PRO snapshot — a past grant through this same
 *      toggle that already expired or was reset to FREE leaves no trace at
 *      all in the database, so it cannot be found and backfilled.
 * None of groups 2/3 invents a VND figure that was never on file.
 *
 * Run this ONLY on the server, where DATABASE_URL points at the real
 * database and GA4_API_SECRET / GA4_LINKED_API_SECRET are already set in
 * .env (same two secrets ga-server.ts's sendGaServerEvent reads). No
 * terminal on the server? /api/admin/ga4-backfill runs the exact same
 * code from a logged-in admin's browser instead — see that route.
 *
 * GA4 Measurement Protocol clamps any event older than 72h to "72h ago"
 * (it does not reject it, and does not keep the real date) — so every one
 * of these will land clustered on roughly the same day in GA4, not its
 * real date. Confirmed acceptable by the site owner.
 *
 * SAFE BY DEFAULT: without --live this only prints what it would send.
 * Run it for real exactly once — running it twice double-counts every
 * one of these as two separate purchases (GA4 does not dedupe across
 * separate runs of this script).
 *
 *   npx tsx prisma/backfill-ga4-purchases.ts            # dry run, prints the list
 *   npx tsx prisma/backfill-ga4-purchases.ts --live     # actually sends to GA4
 */
import "dotenv/config";
import { db } from "../src/lib/db";
import { runGa4PurchaseBackfill } from "../src/lib/services/ga4-backfill";

runGa4PurchaseBackfill(process.argv.includes("--live"))
  .then(async (result) => {
    console.log(result.lines.join("\n"));
    await db.$disconnect();
  })
  .catch((e) => {
    console.error(e);
    process.exit(1);
  });
