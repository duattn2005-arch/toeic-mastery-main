import { NextResponse, type NextRequest } from "next/server";
import { runInBackground } from "@/lib/services/seo/background";
import { runSeoAutopilot } from "@/lib/services/seo/autopilot";

/** Optional crontab trigger for the SEO autopilot — the app already runs it
 * daily on its own (instrumentation-node.ts). Starts the run in the
 * background and returns at once, since a run can take minutes. */
export async function GET(request: NextRequest) {
  if (request.headers.get("authorization") !== `Bearer ${process.env.CRON_SECRET}`) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  const started = runInBackground("autopilot", () => runSeoAutopilot("cron"));
  return NextResponse.json({ started });
}
