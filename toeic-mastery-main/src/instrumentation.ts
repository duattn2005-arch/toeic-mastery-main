export async function register() {
  if (process.env.NEXT_RUNTIME === "nodejs") {
    const { runGaBackfillOnce } = await import("./instrumentation-node");
    runGaBackfillOnce();
  }
}
