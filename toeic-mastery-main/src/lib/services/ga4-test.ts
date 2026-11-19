/**
 * End-to-end GA4 check from /admin/ga4: sends one harmless `server_test`
 * event per property with its saved secret. The Measurement Protocol
 * collect endpoint answers 204 even when it drops the hit (wrong secret,
 * wrong stream), so success here only means "sent" — the owner confirms in
 * GA4 → Báo cáo → Thời gian thực → Số lượt sự kiện theo Tên sự kiện.
 *
 * The /debug/mp/collect endpoint is also called, but it only validates the
 * payload shape, never the secret — it is reported separately.
 */
import { getGaTargets, mpUrl } from "@/lib/services/ga-secrets";

export interface GaTestResult {
  measurementId: string;
  sent: boolean;
  payloadProblems: string[];
}

export async function sendGaTestEvent(): Promise<GaTestResult[]> {
  const targets = await getGaTargets();
  const body = JSON.stringify({
    client_id: "server.admin-test",
    events: [{ name: "server_test", params: { engagement_time_msec: 1, source: "admin_ga4_page" } }],
  });
  return Promise.all(
    targets.map(async (t) => {
      const debugUrl = mpUrl(t).replace("/mp/collect", "/debug/mp/collect");
      const payloadProblems = await fetch(debugUrl, { method: "POST", body, signal: AbortSignal.timeout(6000) })
        .then((r) => r.json())
        .then((j: { validationMessages?: { description?: string }[] }) => (j.validationMessages ?? []).map((m) => m.description ?? "lỗi không rõ"))
        .catch(() => ["Không gọi được endpoint kiểm tra"]);
      const sent = await fetch(mpUrl(t), { method: "POST", body, signal: AbortSignal.timeout(6000) })
        .then((r) => r.ok)
        .catch(() => false);
      return { measurementId: t.measurementId, sent, payloadProblems };
    })
  );
}
