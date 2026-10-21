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
