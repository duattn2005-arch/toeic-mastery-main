"use client";

import * as React from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { Loader2, Send } from "lucide-react";
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
import { runGa4BackfillAction, saveGaSecretsAction } from "@/lib/actions/admin-ga4";

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
