const CHECK_EVERY_MS = 15 * 60 * 1000;

/** The SEO autopilot's clock (docs/seo-content-engine.md): checks every 15
 * minutes whether today's run is due, so no crontab entry is needed. Skipped
 * in `next dev` and during `next build`. */
export function startSeoScheduler() {
  if (process.env.NODE_ENV !== "production" || process.env.NEXT_PHASE === "phase-production-build") return;
  const tick = async () => {
    try {
      const { maybeRunScheduledAutopilot } = await import("@/lib/services/seo/autopilot");
      await maybeRunScheduledAutopilot();
    } catch (err) {
      console.error("[seo] scheduler check failed", err);
    }
  };
  setTimeout(tick, 60_000).unref();
  setInterval(tick, CHECK_EVERY_MS).unref();
}

const TAG_STALE_EVERY_MS = 30 * 60 * 1000;
const TAG_FULL_EVERY_MS = 24 * 60 * 60 * 1000;

/** The question labeller's clock (services/tagging): a full pass shortly
 * after every start (so a deploy that changes the rules relabels the bank),
 * a cheap pass every 30 minutes for questions added or edited since, and a
 * full pass daily so difficulty keeps being re-distilled from new answers. */
export function startTaggingScheduler() {
  if (process.env.NODE_ENV !== "production" || process.env.NEXT_PHASE === "phase-production-build") return;
  const run = async (onlyStale: boolean) => {
    try {
      const { runQuestionTagging } = await import("@/lib/services/tagging/run");
      await runQuestionTagging({ onlyStale, trigger: onlyStale ? "schedule-stale" : "schedule-full" });
    } catch (err) {
      console.error("[tagging] scheduled run failed", err);
    }
  };
  setTimeout(() => run(false), 120_000).unref();
  setInterval(() => run(true), TAG_STALE_EVERY_MS).unref();
  setInterval(() => run(false), TAG_FULL_EVERY_MS).unref();
}
