"use client";

import * as React from "react";
import { useRouter } from "next/navigation";
import { Loader2, Upload, Wand2 } from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { importListeningKeysAction } from "@/lib/actions/admin-listening-keys";
import type { KeySection } from "@/lib/data/listening-key-import";

export function ListeningKeyImportButton({
  testId,
  keyTest,
  section,
  mismatchCount,
  structureIssues,
  fixAnswersByDefault,
}: {
  testId: string;
  keyTest: number;
  section: KeySection;
  mismatchCount: number;
  /** Questions out of the file's order or under the wrong Part. */
  structureIssues: number;
  /** Pre-tick "fix answers" when the preview raised no warnings. */
  fixAnswersByDefault: boolean;
}) {
  const router = useRouter();
  const [updateAnswers, setUpdateAnswers] = React.useState(fixAnswersByDefault);
  const [pending, setPending] = React.useState<"apply" | "fix" | null>(null);
  const script = section === "listening" ? "transcript, giải thích" : "giải thích, dịch đoạn văn";

  async function run(mode: "apply" | "fix") {
    setPending(mode);
    try {
      const result = await importListeningKeysAction(testId, keyTest, updateAnswers, section, mode === "fix");
      if (result.error) {
        toast.error(result.error);
        return;
      }
      toast.success(
        [
          `Đã cập nhật ${result.updatedQuestions} câu`,
          result.updatedPassages ? `${result.updatedPassages} nhóm hội thoại/bài nói` : "",
          result.updatedAnswers ? `sửa ${result.updatedAnswers} đáp án` : "",
          result.movedParts ? `chuyển ${result.movedParts} câu về đúng Part` : "",
          result.reordered ? `xếp lại thứ tự ${result.reordered} câu` : "",
        ]
          .filter(Boolean)
          .join(", ")
      );
      router.refresh();
    } finally {
      setPending(null);
    }
  }

  return (
    <div className="flex flex-col gap-3">
      <div className="flex flex-col gap-2 rounded-xl border border-primary/40 bg-primary/10 p-3 text-sm">
        <p>
          <strong>Sửa toàn bộ theo file</strong>: xếp lại đúng số thứ tự câu như trong file
          {structureIssues > 0 && <> ({structureIssues} câu đang lệch thứ tự/sai Part)</>}, chuyển câu nằm sai Part về đúng Part, sửa đáp án cho khớp file
          {mismatchCount > 0 && <> ({mismatchCount} câu)</>} và chèn {script}. Nội dung câu hỏi/lựa chọn trên web giữ nguyên.
        </p>
        <Button onClick={() => run("fix")} disabled={pending !== null} className="w-fit">
          {pending === "fix" ? <Loader2 className="size-4 animate-spin" /> : <Wand2 className="size-4" />}
          Sửa toàn bộ theo file
        </Button>
      </div>

      <div className="flex flex-col gap-2 text-sm">
        <p className="text-muted-foreground">Hoặc chỉ chèn {script}, không đổi thứ tự/Part:</p>
        {mismatchCount > 0 && (
          <label className="flex items-start gap-3 rounded-xl border border-warning/40 bg-warning/10 p-3">
            <Checkbox checked={updateAnswers} onCheckedChange={(checked) => setUpdateAnswers(checked === true)} className="mt-0.5" />
            <span>
              Sửa luôn <strong>{mismatchCount}</strong> đáp án trên web cho khớp với file
            </span>
          </label>
        )}
        <Button variant="outline" onClick={() => run("apply")} disabled={pending !== null} className="w-fit">
          {pending === "apply" ? <Loader2 className="size-4 animate-spin" /> : <Upload className="size-4" />}
          Chỉ chèn giải thích
        </Button>
      </div>
    </div>
  );
}
