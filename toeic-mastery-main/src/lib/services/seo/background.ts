import "server-only";

/** Jobs started from an admin click but too slow to wait for (an LLM call can
 * outlast Nginx's 60 s proxy timeout). The server is a long-lived Node
 * process (PM2), so a started promise keeps running after the response; the
 * job records its own progress in the database. A key can only run once at a
 * time — a second click while it runs is ignored. */
const running = new Map<string, Promise<unknown>>();

export function runInBackground(key: string, task: () => Promise<unknown>) {
  if (running.has(key)) return false;
  const promise = task()
    .catch((err) => console.error(`[seo] background job ${key} failed`, err))
    .finally(() => running.delete(key));
  running.set(key, promise);
  return true;
}

export function isRunning(prefix: string) {
  return [...running.keys()].some((key) => key.startsWith(prefix));
}
