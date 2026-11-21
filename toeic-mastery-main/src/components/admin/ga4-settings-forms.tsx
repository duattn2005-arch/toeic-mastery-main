"use client";

import * as React from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { Loader2, Send, Undo2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { allowGa4ResendAction, runGa4BackfillSampleAction, runGa4BackfillBatchAction, runGa4BackfillAction, runGa4RefundsAction, saveGaSecretsAction, sendGaTestEventAction, sendGaTestPurchaseAction } from "@/lib/actions/admin-ga4";

export function GaSecretsForm({ primaryId, linkedId }: { primaryId: string; linkedId: string }) {
  const router = useRouter();
  const [primary, setPrimary] = React.useState("");
  const [linked, setLinked] = React.useState("");
  const [pending, startTransition] = React.useTransition();

  function save(e: React.FormEvent) {
    e.preventDefault();
    startTransition(async () => {
      const result = await saveGaSecretsAction({ primary, linked });
      if (result.error) {
        toast.error(result.error);
        return;
      }
      toast.success(`Đã lưu ${result.saved} khoá`);
      setPrimary("");
      setLinked("");
      router.refresh();
    });
  }

  return (
    <form onSubmit={save} className="flex flex-col gap-3">
      <div className="grid gap-3 sm:grid-cols-2">
        <div className="flex flex-col gap-1.5">
          <Label htmlFor="ga-primary">Khoá property chính ({primaryId})</Label>
          <Input id="ga-primary" type="password" autoComplete="off" value={primary} onChange={(e) => setPrimary(e.target.value)} placeholder="Để trống = giữ khoá cũ" />
        </div>
        <div className="flex flex-col gap-1.5">
          <Label htmlFor="ga-linked">Khoá property liên kết ({linkedId})</Label>
          <Input id="ga-linked" type="password" autoComplete="off" value={linked} onChange={(e) => setLinked(e.target.value)} placeholder="Để trống = giữ khoá cũ" />
        </div>
      </div>
      <Button type="submit" disabled={pending || (!primary.trim() && !linked.trim())} className="w-fit">
        {pending && <Loader2 className="size-4 animate-spin" />} Lưu khoá
      </Button>
    </form>
  );
}

export function GaTestEventButton({ purchase = false }: { purchase?: boolean }) {
  const [pending, startTransition] = React.useTransition();

  function run() {
    startTransition(async () => {
      const results = await (purchase ? sendGaTestPurchaseAction() : sendGaTestEventAction());
      if (results.length === 0) {
        toast.error("Chưa có khoá nào để thử.");
        return;
      }
      for (const r of results) {
        if (!r.sent) toast.error(`${r.measurementId}: gửi thất bại (mạng/GA4 từ chối).`);
        else if (r.payloadProblems.length > 0) toast.warning(`${r.measurementId}: GA4 báo dữ liệu có lỗi — ${r.payloadProblems.join("; ")}`);
        else toast.success(`${r.measurementId}: đã gửi ${purchase ? "purchase thử 1đ" : "sự kiện server_test"} — xem GA4 → Thời gian thực.`);
      }
    });
  }

  return (
    <Button type="button" variant="outline" onClick={run} disabled={pending} className="w-fit">
      {pending && <Loader2 className="size-4 animate-spin" />} {purchase ? "Gửi thử 1 purchase (1đ)" : "Gửi sự kiện thử (server_test)"}
    </Button>
  );
}

export function GaSampleButton({ disabled }: { disabled: boolean }) {
  const [pending, startTransition] = React.useTransition();

  function run() {
    startTransition(async () => {
      const result = await runGa4BackfillSampleAction();
      if ("error" in result) {
        toast.error(result.error);
        return;
      }
      const list = result.items.map((i) => `${i.who} ${i.value.toLocaleString("vi-VN")}đ`).join(" · ");
      if (result.failed > 0) toast.warning(`Đã gửi ${result.sent}, lỗi ${result.failed}. ${list}`);
      else toast.success(`Đã gửi thử ${result.sent} purchase: ${list}`);
    });
  }

  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button variant="outline" disabled={disabled || pending} className="w-fit">
          {pending && <Loader2 className="size-4 animate-spin" />} Gửi thử 5 purchase thật
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Gửi thử 5 purchase thật?</AlertDialogTitle>
          <AlertDialogDescription>
            Gửi lại 5 đơn đầu tiên trong danh sách bên dưới, không đụng dấu &quot;đã gửi bù&quot;. Nếu lần gửi trước đã vào GA4 thì 5 đơn này bị tính hai
            lần (chỉ vài trăm nghìn đồng). Mở GA4 → Thời gian thực trước khi bấm.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Hủy</AlertDialogCancel>
          <AlertDialogAction onClick={run}>Gửi 5 cái</AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}

export function GaBatchSender({ remaining, disabled }: { remaining: number; disabled: boolean }) {
  const router = useRouter();
  const [count, setCount] = React.useState("15");
  const [spread, setSpread] = React.useState("0");
  const [pending, startTransition] = React.useTransition();

  function run() {
    startTransition(async () => {
      const result = await runGa4BackfillBatchAction(Number(count), Number(spread));
      if ("error" in result) {
        toast.error(result.error);
        return;
      }
      if (result.failed > 0) toast.warning(`Đã gửi ${result.sent}, lỗi ${result.failed}. Còn ${result.remaining} đơn.`);
      else toast.success(`Đã gửi ${result.sent} purchase · ${result.value.toLocaleString("vi-VN")}đ. Còn ${result.remaining} đơn.`);
      router.refresh();
    });
  }

  return (
    <div className="flex flex-wrap items-end gap-3">
      <div className="flex flex-col gap-1.5">
        <Label htmlFor="ga-batch">Số đơn gửi mỗi lần</Label>
        <Input id="ga-batch" type="number" min={1} max={87} value={count} onChange={(e) => setCount(e.target.value)} className="w-28" />
      </div>
      <div className="flex flex-col gap-1.5">
        <Label htmlFor="ga-spread">Trải về quá khứ</Label>
        <select id="ga-spread" value={spread} onChange={(e) => setSpread(e.target.value)} className="h-9 rounded-md border border-input bg-background px-2 text-sm">
          <option value="0">Không (ghi vào lúc gửi)</option>
          <option value="1">Trong 1 ngày trước</option>
          <option value="2">Trong 2 ngày trước</option>
          <option value="3">Trong ~3 ngày trước (tối đa)</option>
        </select>
      </div>
      <Button type="button" onClick={run} disabled={disabled || pending || remaining === 0}>
        {pending ? <Loader2 className="size-4 animate-spin" /> : <Send className="size-4" />} Gửi {count || 0} đơn tiếp theo
      </Button>
    </div>
  );
}

export function GaAllowResendButton() {
  const router = useRouter();
  const [pending, startTransition] = React.useTransition();

  function run() {
    startTransition(async () => {
      await allowGa4ResendAction();
      toast.success("Đã mở khoá — có thể gửi bù lại.");
      router.refresh();
    });
  }

  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button variant="outline" disabled={pending} className="w-fit">
          {pending && <Loader2 className="size-4 animate-spin" />} Cho phép gửi lại
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Cho phép gửi bù lại?</AlertDialogTitle>
          <AlertDialogDescription>
            Chỉ làm khi chắc chắn GA4 chưa nhận gì (vd khoá sai, đã xem báo cáo Sự kiện sau 48 giờ mà không có purchase). Nếu GA4 đã nhận lần
            trước, gửi lại sẽ làm doanh thu bị tính gấp đôi.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Hủy</AlertDialogCancel>
          <AlertDialogAction onClick={run}>Mở khoá gửi lại</AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}

export function GaBackfillButton({ total, totalValue, disabled }: { total: number; totalValue: number; disabled: boolean }) {
  const router = useRouter();
  const [pending, startTransition] = React.useTransition();

  function run() {
    startTransition(async () => {
      const result = await runGa4BackfillAction();
      if ("error" in result) {
        toast.error(result.error);
        return;
      }
      if (result.failed > 0) toast.warning(`Đã gửi ${result.sent}, lỗi ${result.failed} lượt (mạng/GA4 không nhận).`);
      else toast.success(`Đã gửi ${result.sent} purchase lên GA4 · ${result.totalValue.toLocaleString("vi-VN")}đ`);
      router.refresh();
    });
  }

  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button disabled={disabled || pending || total === 0} className="w-fit">
          {pending ? <Loader2 className="size-4 animate-spin" /> : <Send className="size-4" />}
          Gửi {total} purchase lên GA4
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Gửi {total} purchase lên GA4?</AlertDialogTitle>
          <AlertDialogDescription>
            Tổng {totalValue.toLocaleString("vi-VN")}đ. Chỉ gửi được đúng 1 lần — GA4 không gộp trùng, nên sau khi gửi nút này sẽ khoá. GA4 sẽ xếp
            các lượt này vào khoảng 3 ngày trước, không theo ngày mua thật.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Hủy</AlertDialogCancel>
          <AlertDialogAction onClick={run}>Gửi ngay</AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}

export function GaRefundButton({ count, value, disabled }: { count: number; value: number; disabled: boolean }) {
  const router = useRouter();
  const [pending, startTransition] = React.useTransition();

  function run() {
    startTransition(async () => {
      const result = await runGa4RefundsAction();
      if ("error" in result) {
        toast.error(result.error);
        return;
      }
      if (result.failed > 0) toast.warning(`Đã rút ${result.sent} đơn (${result.value.toLocaleString("vi-VN")}đ), lỗi ${result.failed} đơn — bấm lại để thử tiếp.`);
      else toast.success(`Đã rút ${result.sent} đơn · ${result.value.toLocaleString("vi-VN")}đ khỏi doanh thu GA4`);
      router.refresh();
    });
  }

  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button variant="destructive" disabled={disabled || pending || count === 0} className="w-fit">
          {pending ? <Loader2 className="size-4 animate-spin" /> : <Undo2 className="size-4" />}
          Rút {count} đơn · {value.toLocaleString("vi-VN")}đ khỏi GA4
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Rút {value.toLocaleString("vi-VN")}đ khỏi doanh thu GA4?</AlertDialogTitle>
          <AlertDialogDescription>
            Gửi sự kiện hoàn tiền (refund) cho {count} đơn chưa thu được tiền. GA4 trừ khoản này vào ngày hôm nay, không sửa lại các ngày cũ. Không
            hoàn tác được — mỗi đơn chỉ rút 1 lần.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Hủy</AlertDialogCancel>
          <AlertDialogAction onClick={run}>Rút ngay</AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}

/** Rút một phần: chọn mỗi ngày bao nhiêu đơn (cũ nhất trước) thay vì rút hết. */
export function GaRefundByDay({ days, total: all, disabled }: { days: { day: string; available: number }[]; total: number; disabled: boolean }) {
  const router = useRouter();
  const [pending, startTransition] = React.useTransition();
  const [counts, setCounts] = React.useState<Record<string, string>>({});
  const [quick, setQuick] = React.useState("");
  if (days.length === 0) return null;

  // "Rút nhanh": the oldest N of the whole list — spelled out per day so the
  // confirm dialog shows exactly which days that reaches.
  const quickN = Math.min(all, Math.max(0, Math.floor(Number(quick)) || 0));
  const quickLimits: Record<string, number> = {};
  let left = quickN;
  for (const d of days) {
    const n = Math.min(d.available, left);
    if (n > 0) quickLimits[d.day] = n;
    left -= n;
  }

  const limits: Record<string, number> = {};
  if (quickN > 0) Object.assign(limits, quickLimits);
  else
    for (const d of days) {
      const n = Math.min(d.available, Math.max(0, Math.floor(Number(counts[d.day])) || 0));
      if (n > 0) limits[d.day] = n;
    }
  const total = Object.values(limits).reduce((a, b) => a + b, 0);
  const label = (day: string) => day.split("-").reverse().slice(0, 2).join("/");

  function run() {
    startTransition(async () => {
      const result = await runGa4RefundsAction(limits);
      if ("error" in result) {
        toast.error(result.error);
        return;
      }
      if (result.failed > 0) toast.warning(`Đã rút ${result.sent} đơn (${result.value.toLocaleString("vi-VN")}đ), lỗi ${result.failed} đơn — bấm lại để thử tiếp.`);
      else toast.success(`Đã rút ${result.sent} đơn · ${result.value.toLocaleString("vi-VN")}đ khỏi doanh thu GA4`);
      setCounts({});
      setQuick("");
      router.refresh();
    });
  }

  return (
    <div className="flex flex-col gap-3 rounded-xl border border-border p-3">
      <p className="text-sm font-medium">Hoặc rút một phần</p>
      <label className="flex flex-wrap items-center gap-2 text-sm">
        <span>Rút nhanh</span>
        <Input type="number" min={0} max={all} value={quick} onChange={(e) => setQuick(e.target.value)} className="h-8 w-20" placeholder="0" />
        <span className="text-xs text-muted-foreground">đơn đầu danh sách (cũ nhất trước) · tối đa {all}</span>
      </label>
      <p className="text-xs text-muted-foreground">Hoặc chọn từng ngày (đơn cũ nhất của ngày đó trước) — bỏ qua nếu đã nhập ô trên:</p>
      <div className="flex flex-wrap gap-3">
        {days.map((d) => (
          <label key={d.day} className="flex items-center gap-2 text-sm">
            <span className="tabular-nums">{label(d.day)}</span>
            <Input
              type="number"
              min={0}
              max={d.available}
              value={counts[d.day] ?? ""}
              onChange={(e) => setCounts((c) => ({ ...c, [d.day]: e.target.value }))}
              className="h-8 w-16"
              placeholder="0"
            />
            <span className="text-xs text-muted-foreground">/ {d.available}</span>
          </label>
        ))}
      </div>
      <AlertDialog>
        <AlertDialogTrigger asChild>
          <Button variant="destructive" disabled={disabled || pending || total === 0} className="w-fit">
            {pending ? <Loader2 className="size-4 animate-spin" /> : <Undo2 className="size-4" />}
            Rút {total} đơn đã chọn
          </Button>
        </AlertDialogTrigger>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Rút {total} đơn khỏi doanh thu GA4?</AlertDialogTitle>
            <AlertDialogDescription>
              {Object.entries(limits)
                .map(([day, n]) => `${n} đơn ngày ${label(day)}`)
                .join(", ")}
              . Không hoàn tác được — mỗi đơn chỉ rút 1 lần.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Hủy</AlertDialogCancel>
            <AlertDialogAction onClick={run}>Rút ngay</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
