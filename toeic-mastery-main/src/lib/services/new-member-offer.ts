import "server-only";
import { db } from "@/lib/db";
import { NEW_MEMBER_OFFER_WINDOW_HOURS, POST_TRIAL_OFFER_HOURS, PRO_TRIAL_CODE_PREFIX } from "@/lib/constants/billing";
import { getProTrialEnd } from "@/lib/services/pro-trial";
import type { Profile } from "@/generated/prisma/client";

export interface NewMemberOfferState {
  eligible: boolean;
  /** ISO string (serializable to a Client Component) — null when not eligible. */
  deadline: string | null;
}

const HOUR_MS = 60 * 60 * 1000;

/** Free accounts get one shot at the welcome discount, within
 * NEW_MEMBER_OFFER_WINDOW_HOURS of signup — a hard, one-time deadline, not a
 * repeating cycle. A SUCCESS or REFUNDED payment disqualifies them early (a
 * completed purchase was made, refund or not), but a PENDING/FAILED one does
 * not, so an abandoned or cancelled checkout doesn't cost them the rest of
 * their window.
 *
 * Free-trial users (see pro-trial.ts) count as never having bought: they keep
 * the discount through the trial, and the window runs at least
 * POST_TRIAL_OFFER_HOURS past the trial's end so the offer is still there
 * the moment Pro lapses. Any other Pro (paid, code, admin grant) still
 * disqualifies, as before. */
export async function getNewMemberOfferState(
  profile: Pick<Profile, "id" | "plan" | "createdAt">
): Promise<NewMemberOfferState> {
  const trialEnd = await getProTrialEnd(profile.id);
  if (profile.plan !== "FREE" && !trialEnd) return { eligible: false, deadline: null };

  let deadlineMs = profile.createdAt.getTime() + NEW_MEMBER_OFFER_WINDOW_HOURS * HOUR_MS;
  if (trialEnd) deadlineMs = Math.max(deadlineMs, trialEnd.getTime() + POST_TRIAL_OFFER_HOURS * HOUR_MS);
  const deadline = new Date(deadlineMs);
  if (deadline <= new Date()) return { eligible: false, deadline: null };

  const [completedPayment, otherCode] = await Promise.all([
    db.payment.findFirst({
      where: { userId: profile.id, status: { in: ["SUCCESS", "REFUNDED"] } },
      select: { id: true },
    }),
    // A trial user who later redeemed a real code got Pro another way.
    trialEnd
      ? db.activationCode.findFirst({
          where: { usedByUserId: profile.id, NOT: { code: { startsWith: PRO_TRIAL_CODE_PREFIX } } },
          select: { id: true },
        })
      : null,
  ]);
  if (completedPayment || otherCode) return { eligible: false, deadline: null };

  return { eligible: true, deadline: deadline.toISOString() };
}
