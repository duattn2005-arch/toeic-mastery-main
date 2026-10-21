/** Runs once when the Next.js server starts. Only the Node runtime (not the
 * edge proxy) starts background work. */
export async function register() {
  if (process.env.NEXT_RUNTIME === "nodejs") {
    const { startSeoScheduler } = await import("./instrumentation-node");
    startSeoScheduler();
  }
}
