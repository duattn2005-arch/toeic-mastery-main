"use client";

import * as React from "react";
import { useRouter } from "next/navigation";
import { Loader2, RotateCcw } from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
  AlertDialog,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { resetVocabularyProgressAction } from "@/lib/actions/vocabulary";

/** Settings card for "Học lại từ vựng từ đầu" — confirms first, since the
 * reset can't be undone. */
export function ResetVocabularyCard() {
  const router = useRouter();
  const [open, setOpen] = React.useState(false);
  const [includeSaved, setIncludeSaved] = React.useState(true);
  const [pending, startTransition] = React.useTransition();

  function handleReset() {
    startTransition(async () => {
      const result = await resetVocabularyProgressAction(includeSaved);
      if (result.error) {
        toast.error(result.error);
        return;
      }
      toast.success(`Đã xóa dữ liệu từ vựng (${result.deletedWords ?? 0} từ trong lịch ôn). Bạn có thể học lại từ đầu!`);
      setOpen(false);
      router.refresh();
    });
  }

  return (
    <div className="flex flex-col gap-4 rounded-2xl border border-destructive/30 bg-card p-6 shadow-soft">
      <div>
        <h2 className="text-base font-semibold">Học lại từ vựng từ đầu</h2>
        <p className="mt-1 text-sm text-muted-foreground">
          Xóa toàn bộ tiến độ từ vựng của bạn: lịch ôn tập (lặp lại ngắt quãng), tiến độ lộ trình 20 ngày và IIG Vocab, đánh giá thành thạo từ vựng của AI
          Mentor. Thời gian học và lịch sử làm đề được giữ nguyên.
        </p>
      </div>

      <AlertDialog open={open} onOpenChange={(next) => !pending && setOpen(next)}>
        <AlertDialogTrigger asChild>
          <Button variant="destructive" className="w-fit">
            <RotateCcw className="size-4" /> Học lại từ đầu
          </Button>
        </AlertDialogTrigger>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Xóa toàn bộ dữ liệu từ vựng?</AlertDialogTitle>
            <AlertDialogDescription>
              Thao tác này không thể hoàn tác. Mọi từ trong lịch ôn, sao và tiến độ các ngày học sẽ bị xóa để bạn bắt đầu lại.
            </AlertDialogDescription>
          </AlertDialogHeader>

          <label className="flex items-start gap-3 rounded-xl border border-border p-3 text-sm">
            <Checkbox checked={includeSaved} onCheckedChange={(checked) => setIncludeSaved(checked === true)} className="mt-0.5" />
            <span>
              Xóa cả danh sách <strong>Đã lưu</strong> (từ đã đánh dấu và từ tự thêm)
            </span>
          </label>

          <AlertDialogFooter>
            <AlertDialogCancel disabled={pending}>Hủy</AlertDialogCancel>
            <Button variant="destructive" onClick={handleReset} disabled={pending}>
              {pending ? <Loader2 className="size-4 animate-spin" /> : <RotateCcw className="size-4" />}
              Xóa và học lại
            </Button>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
