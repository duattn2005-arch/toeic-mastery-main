"use client";

import * as React from "react";
import { useRouter } from "next/navigation";
import { Loader2, RefreshCw } from "lucide-react";
import { Button } from "@/components/ui/button";
import { getTaggingProgressAction, runTaggingNowAction } from "@/lib/actions/admin-tagging";

type Progress = Awaited<ReturnType<typeof getTaggingProgressAction>>;

/** "Chạy gắn nhãn ngay" with live progress while the background run lasts. */
export function TaggingRunPanel({ initial }: { initial: Progress }) {
  const router = useRouter();
  const [progress, setProgress] = React.useState(initial);
  const [starting, setStarting] = React.useState(false);

  React.useEffect(() => {
    if (!progress.running) return;
    const id = setInterval(async () => {
      const next = await getTaggingProgressAction();
      setProgress(next);
      if (!next.running) router.refresh();
    }, 1500);
    return () => clearInterval(id);
  }, [progress.running, router]);

  const start = async () => {
    setStarting(true);
    await runTaggingNowAction();
    setProgress(await getTaggingProgressAction());
    setStarting(false);
  };

  const last = progress.last;
  return (
    <div className="flex flex-col gap-3 rounded-2xl border border-border bg-card p-5 sm:flex-row sm:items-center sm:justify-between">
      <div className="text-sm">
        {progress.running ? (
          <p className="font-semibold">
            Đang gắn nhãn… {progress.scanned.toLocaleString("vi-VN")}/{progress.total.toLocaleString("vi-VN")} câu
          </p>
        ) : last ? (
          <p>
            Lần chạy gần nhất ({new Date(last.finishedAt).toLocaleString("vi-VN")}, {last.trigger}): quét {last.scanned.toLocaleString("vi-VN")} câu, cập nhật{" "}
            <b>{last.updated.toLocaleString("vi-VN")}</b> — chủ điểm {last.grammar}, dạng câu {last.strategy}, từ vựng {last.vocab}, độ khó theo dữ liệu {last.difficultyFromData}, theo luật{" "}
            {last.difficultyFromRules}, AI đọc thêm {last.ai ?? 0}, bậc Bloom {last.bloom ?? 0}, mã bẫy {last.traps ?? 0}.
          </p>
        ) : (
          <p className="text-muted-foreground">Server tự chạy 2 phút sau mỗi lần khởi động, 30 phút một lần cho câu mới/vừa sửa, và toàn bộ mỗi ngày.</p>
        )}
        {progress.running && progress.total > 0 && (
          <div className="mt-2 h-1.5 w-full max-w-md overflow-hidden rounded-full bg-muted">
            <div className="h-full rounded-full bg-primary transition-all" style={{ width: `${Math.round((progress.scanned / progress.total) * 100)}%` }} />
          </div>
        )}
      </div>
      <Button onClick={start} disabled={starting || progress.running} className="gap-1.5 shrink-0">
        {starting || progress.running ? <Loader2 className="size-4 animate-spin" /> : <RefreshCw className="size-4" />}
        Chạy gắn nhãn toàn bộ
      </Button>
    </div>
  );
}
