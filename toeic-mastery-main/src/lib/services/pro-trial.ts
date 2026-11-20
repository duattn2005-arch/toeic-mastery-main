import "server-only";
import { db } from "@/lib/db";
import { PRO_TRIAL_DAYS, proTrialCode } from "@/lib/constants/billing";
import type { Profile } from "@/generated/prisma/client";

export interface ProTrialState {
  /** Never had Pro in any form — may start the trial now. */
  eligible: boolean;
  /** Pro right now *only* because of the trial (a purchase during the trial
   * extends proExpiresAt past the trial end, which turns this off). */
  active: boolean;
  /** Started the trial at some point (active or lapsed). */
  used: boolean;
  /** ISO end of the trial, null if never started. */
  endsAt: string | null;
}

type TrialProfile = Pick<Profile, "id" | "plan" | "proExpiresAt">;

/** Ends of the trial window for a started trial, else null. */
export async function getProTrialEnd(userId: string): Promise<Date | null> {
  const trial = await db.activationCode.findUnique({
    where: { code: proTrialCode(userId) },
    select: { usedAt: true, createdAt: true },
  });
  if (!trial) return null;
  const startedAt = trial.usedAt ?? trial.createdAt;
  return new Date(startedAt.getTime() + PRO_TRIAL_DAYS * 24 * 60 * 60 * 1000);
}

export async function getProTrialState(profile: TrialProfile): Promise<ProTrialState> {
  const now = new Date();
  const endsAt = await getProTrialEnd(profile.id);

  if (endsAt) {
    const activePro = profile.plan === "PRO" && !!profile.proExpiresAt && profile.proExpiresAt > now;
    // A minute of slack: grantProDays and the code row are written a few ms apart.
    const onlyTrial = activePro && profile.proExpiresAt!.getTime() <= endsAt.getTime() + 60_000;
    return { eligible: false, active: onlyTrial, used: true, endsAt: endsAt.toISOString() };
  }

  // Anyone who has ever had Pro (paid, code, admin grant — proExpiresAt is
  // set by all of them, or plan is PRO for a lifetime grant) already knows
  // the product, so the trial is only for accounts that never had it.
  if (profile.plan !== "FREE" || profile.proExpiresAt) {
    return { eligible: false, active: false, used: false, endsAt: null };
  }
  const [paid, code] = await Promise.all([
    db.payment.findFirst({ where: { userId: profile.id, status: { in: ["SUCCESS", "REFUNDED"] } }, select: { id: true } }),
    db.activationCode.findFirst({ where: { usedByUserId: profile.id }, select: { id: true } }),
  ]);
  return { eligible: !paid && !code, active: false, used: false, endsAt: null };
}
