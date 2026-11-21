import type { Metadata } from "next";
import { requireSuperAdmin } from "@/lib/auth";
import { GA_LINKED_MEASUREMENT_ID, GA_MEASUREMENT_ID } from "@/lib/ga-config";
import { getGaTargets } from "@/lib/services/ga-secrets";
import { getGa4BatchProgress, previewGa4Backfill } from "@/lib/services/ga4-backfill";
import { previewGa4Refunds, refundDayKey } from "@/lib/services/ga4-refund";
import { GaAllowResendButton, GaBackfillButton, GaRefundButton, GaRefundByDay, GaBatchSender, GaSampleButton, GaSecretsForm, GaTestEventButton } from "@/components/admin/ga4-settings-forms";

export const metadata: Metadata = { title: "GA4" };

const KIND_LABEL = { order: "Đơn thanh toán", code: "Mã kích hoạt", manual: "Bật Pro tay" } as const;

/** Owner-only: the GA4 Measurement Protocol secrets every server-side GA4
 * event needs (no SSH to put them in .env), and the one-time purchase
 * backfill. */
export default async function AdminGa4Page() {
  await requireSuperAdmin();
  const [targets, preview, refunds] = await Promise.all([getGaTargets(), previewGa4Backfill(), previewGa4Refunds()]);
  const batch = await getGa4BatchProgress(preview);
  const dayCounts = new Map<string, number>();
  for (const c of refunds.candidates) dayCounts.set(refundDayKey(c.createdAt), (dayCounts.get(refundDayKey(c.createdAt)) ?? 0) + 1);
  const refundDays = [...dayCounts].map(([day, available]) => ({ day, available }));
  const status = [
    { id: GA_MEASUREMENT_ID, name: "Property chính" },
    { id: GA_LINKED_MEASUREMENT_ID, name: "Property liên kết" },
  ].map((p) => ({ ...p, target: targets.find((t) => t.measurementId === p.id) }));
  const byKind = (["order", "code", "manual"] as const).map((k) => ({ k, items: preview.items.filter((i) => i.kind === k) }));

  return (
    <div className="flex flex-col gap-6">
      <div>
        <h1 className="text-2xl font-semibold tracking-tight">GA4</h1>
        <p className="mt-1 text-sm text-muted-foreground">
          Khoá để server gửi sự kiện lên Google Analytics (duyệt chuyển khoản, bật Pro tay), và gửi bù purchase cũ. Trang này chỉ chủ tài khoản xem
          được.
        </p>
      </div>

      <section className="flex flex-col gap-4 rounded-2xl border border-border bg-card p-5 shadow-soft">
        <div>
          <h2 className="text-base font-semibold">1. Khoá Measurement Protocol</h2>
          <p className="mt-1 text-sm text-muted-foreground">
            Lấy ở GA4 → Quản trị → Luồng dữ liệu → chọn luồng web → Khoá bí mật API Measurement Protocol → Tạo → copy &quot;Giá trị bí mật&quot;. Mỗi
            property một khoá.
          </p>
        </div>
        <ul className="grid gap-2 sm:grid-cols-2">
          {status.map((s) => (
            <li key={s.id} className="flex items-center justify-between gap-3 rounded-xl border border-border px-3 py-2.5 text-sm">
              <span>
                <span className="font-medium">{s.name}</span> <span className="text-muted-foreground">{s.id}</span>
              </span>
              {s.target ? (
                <span className="rounded-full bg-success/15 px-2.5 py-0.5 text-xs font-bold text-success">
                  {s.target.source === "env" ? "Có (.env)" : `Đã lưu ••••${s.target.secret.slice(-4)}`}
                </span>
              ) : (
                <span className="rounded-full bg-destructive/12 px-2.5 py-0.5 text-xs font-bold text-destructive">Chưa có — sự kiện bị bỏ qua</span>
              )}
            </li>
          ))}
        </ul>
        <GaSecretsForm primaryId={GA_MEASUREMENT_ID} linkedId={GA_LINKED_MEASUREMENT_ID} />
        <div className="flex flex-col gap-2 border-t border-border pt-4">
          <p className="text-sm text-muted-foreground">
            Thử thật: bấm nút rồi mở GA4 → Báo cáo → Thời gian thực, trong vài chục giây phải thấy sự kiện <b>server_test</b>. Không thấy = khoá hoặc
            luồng dữ liệu chưa đúng (GA4 luôn trả &quot;OK&quot; kể cả khi bỏ dữ liệu).
          </p>
          <GaTestEventButton />
        </div>
      </section>

      <section className="flex flex-col gap-4 rounded-2xl border-2 border-destructive/30 bg-card p-5 shadow-soft">
        <div>
          <h2 className="text-base font-semibold">Rút doanh thu ảo khỏi GA4</h2>
          <p className="mt-1 text-sm text-muted-foreground">
            Trước đây web tính purchase ngay khi khách mở màn hình QR, và lần gửi bù tính cả đơn chưa duyệt — nên các đơn <b>chưa chuyển tiền</b>,{" "}
            <b>đã từ chối</b> hay <b>đã hoàn tiền</b> vẫn nằm trong doanh thu GA4. Danh sách dưới là các đơn đó (web tự tìm từ những gì đã gửi lên GA4).
            Bấm rút, web gửi sự kiện hoàn tiền cho từng đơn để GA4 trừ ra. Đơn tạo trong 24 giờ qua chưa được rút vì khách có thể vẫn đang chuyển.
            Mã kích hoạt và Pro bật tay giữ nguyên.
          </p>
        </div>
        <div className="flex flex-wrap gap-2 text-sm">
          <span className="rounded-full bg-destructive/10 px-3 py-1 font-bold text-destructive tabular-nums">
            Cần rút: {refunds.candidates.length} đơn · {refunds.totalValue.toLocaleString("vi-VN")}đ
          </span>
          {refunds.refundedCount > 0 && (
            <span className="rounded-full bg-success/10 px-3 py-1 font-medium text-success tabular-nums">
              Đã rút: {refunds.refundedCount} đơn · {refunds.refundedValue.toLocaleString("vi-VN")}đ
            </span>
          )}
        </div>
        {targets.length === 0 && <p className="rounded-xl bg-warning/10 px-3 py-2 text-sm font-medium text-warning">Lưu khoá ở bước 1 trước rồi mới rút được.</p>}
        <GaRefundButton count={refunds.candidates.length} value={refunds.totalValue} disabled={targets.length === 0} />
        <GaRefundByDay days={refundDays} disabled={targets.length === 0} />
        {refunds.candidates.length > 0 && (
          <div className="max-h-96 overflow-auto rounded-xl border border-border">
            <table className="w-full min-w-[640px] text-sm">
              <thead className="sticky top-0 bg-muted text-left text-xs text-muted-foreground">
                <tr>
                  <th className="px-3 py-2 font-medium">Mã đơn</th>
                  <th className="px-3 py-2 font-medium">Người dùng</th>
                  <th className="px-3 py-2 font-medium">Trạng thái</th>
                  <th className="px-3 py-2 text-right font-medium">Giá trị</th>
                </tr>
              </thead>
              <tbody>
                {refunds.candidates.map((c) => (
                  <tr key={c.orderId} className="border-t border-border">
                    <td className="px-3 py-2 font-mono text-xs">{c.orderId}</td>
                    <td className="px-3 py-2">{c.who}</td>
                    <td className="px-3 py-2 text-muted-foreground">
                      {c.status} · {new Date(c.createdAt).toLocaleDateString("vi-VN")}
                      {c.source === "backfill" ? " · gửi bù" : ""}
                    </td>
                    <td className="px-3 py-2 text-right tabular-nums">{c.value.toLocaleString("vi-VN")}đ</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </section>

      <section className="flex flex-col gap-4 rounded-2xl border border-border bg-card p-5 shadow-soft">
        <div>
          <h2 className="text-base font-semibold">2. Gửi bù purchase cũ (1 lần)</h2>
          <p className="mt-1 text-sm text-muted-foreground">
            Mọi đơn tạo trước khi web tính purchase lúc bấm thanh toán (kể cả đơn chưa duyệt), mọi mã kích hoạt đã dùng, và tài khoản Pro bật tay
            không có đơn nào — hai nhóm sau tính theo giá Pro 1 tháng.
          </p>
        </div>
        <div className="flex flex-wrap gap-2 text-sm">
          {byKind.map(({ k, items }) => (
            <span key={k} className="rounded-full bg-muted px-3 py-1 font-medium tabular-nums">
              {KIND_LABEL[k]}: {items.length}
            </span>
          ))}
          <span className="rounded-full bg-accent px-3 py-1 font-bold text-accent-foreground tabular-nums">
            Tổng {preview.total} · {preview.totalValue.toLocaleString("vi-VN")}đ
          </span>
        </div>
        {preview.doneAt ? (
          <div className="flex flex-col gap-2">
            <p className="rounded-xl bg-success/10 px-3 py-2 text-sm font-medium text-success">
              Đã gửi bù lúc {new Date(preview.doneAt).toLocaleString("vi-VN")} — không gửi lại để tránh tính trùng.
            </p>
            <GaAllowResendButton />
          </div>
        ) : targets.length === 0 ? (
          <p className="rounded-xl bg-warning/10 px-3 py-2 text-sm font-medium text-warning">Lưu khoá ở bước 1 trước rồi mới gửi được.</p>
        ) : null}
        <div className="flex flex-col gap-1.5">
          <p className="text-sm text-muted-foreground">
            Thử trước 1 purchase trị giá 1đ (mã giao dịch riêng, không đụng đơn thật): mở GA4 → Thời gian thực, bấm nút, phải thấy sự kiện <b>purchase</b>.
          </p>
          <GaTestEventButton purchase />
        </div>
        <div className="flex flex-col gap-2 rounded-xl border border-border p-3">
          <p className="text-sm font-medium">Gửi rải nhiều ngày (khuyên dùng)</p>
          <p className="text-sm text-muted-foreground">
            GA4 chỉ ghi các lượt này vào ngày gửi, nên mỗi ngày bấm 1 lần một ít để biểu đồ không bị dồn một cục. Đã gửi {batch.sent}/{preview.total}, còn{" "}
            {batch.remaining} đơn ({batch.remainingValue.toLocaleString("vi-VN")}đ). Chạy độc lập với nút &quot;Gửi {preview.total} purchase&quot; bên dưới — đừng dùng cả hai.
          </p>
          <GaBatchSender remaining={batch.remaining} disabled={targets.length === 0} />
        </div>
        <GaSampleButton disabled={targets.length === 0 || preview.total === 0} />
        <GaBackfillButton total={preview.total} totalValue={preview.totalValue} disabled={!!preview.doneAt || targets.length === 0} />
        <div className="max-h-96 overflow-auto rounded-xl border border-border">
          <table className="w-full min-w-[640px] text-sm">
            <thead className="sticky top-0 bg-muted text-left text-xs text-muted-foreground">
              <tr>
                <th className="px-3 py-2 font-medium">Loại</th>
                <th className="px-3 py-2 font-medium">Người dùng</th>
                <th className="px-3 py-2 font-medium">Chi tiết</th>
                <th className="px-3 py-2 text-right font-medium">Giá trị</th>
              </tr>
            </thead>
            <tbody>
              {preview.items.map((i) => (
                <tr key={i.transactionId} className="border-t border-border">
                  <td className="px-3 py-2 whitespace-nowrap">{KIND_LABEL[i.kind]}</td>
                  <td className="px-3 py-2">{i.who}</td>
                  <td className="px-3 py-2 text-muted-foreground">
                    {i.detail}
                    {i.date && ` · ${new Date(i.date).toLocaleDateString("vi-VN")}`}
                  </td>
                  <td className="px-3 py-2 text-right tabular-nums">{i.value.toLocaleString("vi-VN")}đ</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
}
