"use client";

import * as React from "react";
import { useRouter } from "next/navigation";
import { Check, Loader2, Upload, Wand2 } from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { cn } from "@/lib/utils";
import { importListeningKeysAction } from "@/lib/actions/admin-listening-keys";
import type { KeySection } from "@/lib/data/listening-key-import";

export interface PartStat {
  part: number;
  /** File questions of this Part matched on the web. */
  matched: number;
  mismatches: number;
  structureIssues: number;
  /** File questions of this Part not on the web yet. */
  missing: number;
}

export function ListeningKeyImportButton({
  testId,
  keyTest,
  section,
  partStats,
  fixAnswersByDefault,
}: {
  testId: string;
  keyTest: number;
  section: KeySection;
  /** Per file Part — what applying to that Part would change. */
  partStats: PartStat[];
  /** Pre-tick "fix answers" when the preview raised no warnings. */
  fixAnswersByDefault: boolean;
}) {
  const router = useRouter();
  const [updateAnswers, setUpdateAnswers] = React.useState(fixAnswersByDefault);
  const [pending, setPending] = React.useState<"apply" | "fix" | null>(null);
  const [parts, setParts] = React.useState<number[]>(() => partStats.map((p) => p.part));
  const allParts = parts.length === partStats.length;
  const selected = partStats.filter((p) => parts.includes(p.part));
  const mismatchCount = selected.reduce((n, p) => n + p.mismatches, 0);
  const structureIssues = selected.reduce((n, p) => n + p.structureIssues, 0);
  const scopeLabel = allParts ? "toàn bộ" : `Part ${parts.join(", ")}`;

  function togglePart(part: number) {
    setParts((prev) => (prev.includes(part) ? prev.filter((p) => p !== part) : [...prev, part].sort((a, b) => a - b)));
  }
  const script = section !== "reading" ? "transcript, giải thích" : "giải thích, dịch đoạn văn";

  async function run(mode: "apply" | "fix") {
    setPending(mode);
    try {
      const result = await importListeningKeysAction(testId, keyTest, updateAnswers, section, mode === "fix", allParts ? undefined : parts);
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
          result.createdQuestions ? `tạo mới ${result.createdQuestions} câu còn thiếu` : "",
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
      <div className="flex flex-col gap-2 text-sm">
        <p className="font-medium">Chọn Part muốn sửa theo file:</p>
        <div className="flex flex-wrap gap-2">
          {partStats.map((p) => {
            const on = parts.includes(p.part);
            const changes = p.mismatches + p.structureIssues + p.missing;
            return (
              <button
                key={p.part}
                type="button"
                onClick={() => togglePart(p.part)}
                aria-pressed={on}
                className={cn(
                  "flex flex-col items-start rounded-xl border px-3 py-2 text-left transition-colors",
                  on ? "border-primary bg-primary/15" : "border-border text-muted-foreground hover:border-primary/40"
                )}
              >
                <span className="flex items-center gap-2 font-semibold">
                  <span
                    className={cn(
                      "flex size-4 items-center justify-center rounded border",
                      on ? "border-primary bg-primary text-primary-foreground" : "border-muted-foreground/50"
                    )}
                  >
                    {on && <Check className="size-3" />}
                  </span>
                  Part {p.part}
                </span>
                <span className="text-xs text-muted-foreground">
                  {p.matched} câu{changes > 0 ? ` · ${changes} chỗ cần sửa` : " · đã khớp"}
                </span>
              </button>
            );
          })}
        </div>
        <div className="flex gap-3 text-xs">
          <button type="button" className="text-primary hover:underline" onClick={() => setParts(partStats.map((p) => p.part))}>
            Chọn tất cả
          </button>
          <button
            type="button"
            className="text-primary hover:underline"
            onClick={() => setParts(partStats.filter((p) => p.mismatches + p.structureIssues + p.missing > 0).map((p) => p.part))}
          >
            Chỉ Part cần sửa
          </button>
        </div>
      </div>

      <div className="flex flex-col gap-2 rounded-xl border border-primary/40 bg-primary/10 p-3 text-sm">
        <p>
          <strong>Sửa {scopeLabel} theo file</strong>{!allParts && <> (Part khác giữ nguyên)</>}: xếp lại đúng số thứ tự câu như trong file
          {structureIssues > 0 && <> ({structureIssues} câu đang lệch thứ tự/sai Part)</>}, chuyển câu nằm sai Part về đúng Part, sửa đáp án cho khớp file
          {mismatchCount > 0 && <> ({mismatchCount} câu)</>} và chèn {script}. Nội dung câu hỏi/lựa chọn trên web giữ nguyên.
        </p>
        <Button onClick={() => run("fix")} disabled={pending !== null || parts.length === 0} className="w-fit">
          {pending === "fix" ? <Loader2 className="size-4 animate-spin" /> : <Wand2 className="size-4" />}
          {allParts ? "Sửa toàn bộ theo file" : `Sửa Part ${parts.join(", ")} theo file`}
        </Button>
      </div>

      <div className="flex flex-col gap-2 text-sm">
        <p className="text-muted-foreground">
          Hoặc chỉ chèn {script} cho {allParts ? "mọi Part" : `Part ${parts.join(", ")}`}, không đổi thứ tự/Part:
        </p>
        {mismatchCount > 0 && (
          <label className="flex items-start gap-3 rounded-xl border border-warning/40 bg-warning/10 p-3">
            <Checkbox checked={updateAnswers} onCheckedChange={(checked) => setUpdateAnswers(checked === true)} className="mt-0.5" />
            <span>
              Sửa luôn <strong>{mismatchCount}</strong> đáp án trên web cho khớp với file
            </span>
          </label>
        )}
        <Button variant="outline" onClick={() => run("apply")} disabled={pending !== null || parts.length === 0} className="w-fit">
          {pending === "apply" ? <Loader2 className="size-4 animate-spin" /> : <Upload className="size-4" />}
          Chỉ chèn giải thích
        </Button>
      </div>
    </div>
  );
}
