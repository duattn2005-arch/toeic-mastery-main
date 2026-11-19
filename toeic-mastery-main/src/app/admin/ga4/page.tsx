import type { Metadata } from "next";
import { requireSuperAdmin } from "@/lib/auth";
import { GA_LINKED_MEASUREMENT_ID, GA_MEASUREMENT_ID } from "@/lib/ga-config";
import { getGaTargets } from "@/lib/services/ga-secrets";
import { previewGa4Backfill } from "@/lib/services/ga4-backfill";
import { GaAllowResendButton, GaBackfillButton, GaSecretsForm, GaTestEventButton } from "@/components/admin/ga4-settings-forms";

export const metadata: Metadata = { title: "GA4" };

const KIND_LABEL = { order: "Đơn thanh toán", code: "Mã kích hoạt", manual: "Bật Pro tay" } as const;

/** Owner-only: the GA4 Measurement Protocol secrets every server-side GA4
 * event needs (no SSH to put them in .env), and the one-time purchase
 * backfill. */
export default async function AdminGa4Page() {
  await requireSuperAdmin();
  const [targets, preview] = await Promise.all([getGaTargets(), previewGa4Backfill()]);
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
