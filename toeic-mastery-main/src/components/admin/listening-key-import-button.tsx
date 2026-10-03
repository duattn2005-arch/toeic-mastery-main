"use client";

import * as React from "react";
import { useRouter } from "next/navigation";
import { Loader2, Upload } from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { importListeningKeysAction } from "@/lib/actions/admin-listening-keys";

export function ListeningKeyImportButton({ testId, keyTest, mismatchCount }: { testId: string; keyTest: number; mismatchCount: number }) {
  const router = useRouter();
  const [updateAnswers, setUpdateAnswers] = React.useState(false);
  const [pending, startTransition] = React.useTransition();

  function handleImport() {
    startTransition(async () => {
      const result = await importListeningKeysAction(testId, keyTest, updateAnswers);
      if (result.error) {
        toast.error(result.error);
        return;
      }
      toast.success(
        `Đã cập nhật ${result.updatedQuestions} câu, ${result.updatedPassages} nhóm hội thoại/bài nói` +
          (result.updatedAnswers ? `, sửa ${result.updatedAnswers} đáp án` : "")
      );
      router.refresh();
    });
  }

  return (
    <div className="flex flex-col gap-3">
      {mismatchCount > 0 && (
        <label className="flex items-start gap-3 rounded-xl border border-warning/40 bg-warning/10 p-3 text-sm">
          <Checkbox checked={updateAnswers} onCheckedChange={(checked) => setUpdateAnswers(checked === true)} className="mt-0.5" />
          <span>
            Sửa luôn <strong>{mismatchCount}</strong> đáp án trên web cho khớp với file (nếu không tick, chỉ ghi transcript và giải thích)
          </span>
        </label>
      )}
      <Button onClick={handleImport} disabled={pending} className="w-fit">
        {pending ? <Loader2 className="size-4 animate-spin" /> : <Upload className="size-4" />}
        Áp dụng giải thích cho đề này
      </Button>
    </div>
  );
}
