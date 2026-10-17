import { spawn } from "node:child_process";
import { closeSync, createWriteStream, existsSync, openSync, unlinkSync } from "node:fs";
import { homedir } from "node:os";
import path from "node:path";

/** One-off, October 2026: G-CCTBJ73HK1 missed most of 2026-10-16, so on the
 * first server start after deploy, replay that day's real page views from the
 * nginx logs into it (scripts/ga-backfill.py). Runs once per server (marker
 * file), in the background, and stops trying once GA4's 72h window has passed.
 * The secret is single-use: delete it in GA4 once this has run, then remove
 * this file and its import in instrumentation.ts. */
const SECRET = process.env.GA4_BACKFILL_SECRET || "wg7oMylDRyKkH4YqyRvmvQ";
const DEADLINE = Date.parse("2026-10-18T23:00:00+07:00");
const MARKER = path.join(homedir(), ".ga-backfill-2026-10-16.done");
const OUTPUT = path.join(homedir(), "ga-backfill-2026-10-16.log");
const LOGS = ["/var/log/nginx/access.log.2.gz", "/var/log/nginx/access.log.1", "/var/log/nginx/access.log"];

export function runGaBackfillOnce() {
  if (!SECRET || Date.now() > DEADLINE) return;
  try {
    closeSync(openSync(MARKER, "wx"));
  } catch {
    return; // Already ran (or another instance is running it).
  }
  const logs = LOGS.filter((p) => existsSync(p));
  const out = createWriteStream(OUTPUT, { flags: "a" });
  out.write(`\n[${new Date().toISOString()}] logs: ${logs.join(", ") || "none found"}\n`);
  const child = spawn(
    "python3",
    [path.join(process.cwd(), "scripts/ga-backfill.py"), "--from", "2026-10-16 00:00", "--to", "2026-10-17 00:00", ...logs, "--send"],
    { env: { ...process.env, GA4_LINKED_API_SECRET: SECRET }, stdio: ["ignore", "pipe", "pipe"] },
  );
  child.stdout.pipe(out, { end: false });
  child.stderr.pipe(out, { end: false });
  let done = false;
  const finish = (failed: boolean, note: string) => {
    if (done) return;
    done = true;
    out.end(`[${new Date().toISOString()}] ${note}\n`);
    // The script only exits non-zero before sending anything (unreadable log,
    // window too old), so retrying on the next start can't double-count.
    if (failed) {
      try {
        unlinkSync(MARKER);
      } catch {}
    }
  };
  child.on("error", (err) => finish(true, `could not start python3: ${err.message}`));
  child.on("exit", (code) => finish(code !== 0, `exit ${code}`));
}
