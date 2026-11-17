"use client";

import * as React from "react";
import { Loader2, Sparkles, Table2, Columns2 } from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { ImportGuideCallout } from "@/components/admin/import-guide-callout";
import { PosBadges } from "@/components/vocabulary/pos-badge";
import { cn } from "@/lib/utils";
import { foldVocabLines, parseVocabTable, type VocabRow } from "@/lib/vocab-import";
import { aiExtractVocabAction } from "@/lib/actions/vocab-import";

type Mode = "table" | "pairs" | "ai";

const PAIR_SEPARATORS = [
  { id: "tab", label: "Tab", sep: "\t" },
  { id: "dash", label: "Gạch ( - )", sep: " - " },
  { id: "colon", label: "Hai chấm ( : )", sep: ":" },
  { id: "comma", label: "Phẩy", sep: "," },
] as const;

const TABLE_EXAMPLE = "Word\tPro\tType\tMean\tNote\nFavor\t/ˈfeɪ.vɚ/\tN\tSự giúp đỡ, ân huệ\tFavorable (adj): thuận lợi\n\t\tV\tThiên vị, ủng hộ\t\nDetect\t\t\tPhát hiện, nhận ra\t";

function parsePairs(text: string, sep: string): VocabRow[] {
  const lines = text
    .split(/\r?\n/)
    .map((l) => l.trim())
    .filter(Boolean)
    .map((line) => {
      const i = line.indexOf(sep);
      const term = (i === -1 ? line : line.slice(0, i)).trim();
      const definition = i === -1 ? "" : line.slice(i + sep.length).trim();
      return { term, ipa: "", pos: "", definition, note: "" };
    });
  return foldVocabLines(lines);
}

function PreviewTable({ rows }: { rows: VocabRow[] }) {
  if (rows.length === 0) return <p className="p-4 text-sm text-muted-foreground">Chưa có dữ liệu để xem trước.</p>;
  const auto = <span className="text-[11px] text-primary/70 italic">✨ tự điền</span>;
  return (
    <table className="w-full min-w-[640px] border-collapse text-sm">
      <thead className="sticky top-0 z-10 bg-muted text-left text-[11px] font-bold tracking-wide text-muted-foreground uppercase">
        <tr>
          <th className="w-8 px-2 py-2 text-center">#</th>
          <th className="px-2 py-2">Word</th>
          <th className="px-2 py-2">Pro</th>
          <th className="px-2 py-2">Type</th>
          <th className="px-2 py-2">Mean</th>
          <th className="px-2 py-2">Note</th>
        </tr>
      </thead>
      <tbody>
        {rows.map((r, i) => (
          <tr key={`${r.term}-${i}`} className="border-t border-border align-top">
            <td className="px-2 py-2 text-center text-xs text-muted-foreground tabular-nums">{i + 1}</td>
            <td className="px-2 py-2 font-semibold">{r.term}</td>
            <td className="px-2 py-2 whitespace-nowrap text-muted-foreground">{r.ipa || auto}</td>
            <td className="px-2 py-2">{r.partOfSpeech ? <PosBadges pos={r.partOfSpeech} /> : auto}</td>
            <td className={cn("px-2 py-2", !r.definition && "text-destructive")}>{r.definition || "Thiếu nghĩa"}</td>
            <td className="max-w-[220px] px-2 py-2 text-xs whitespace-pre-line text-muted-foreground">{r.note}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

/**
 * The learner's bulk import: paste a whole vocab spreadsheet (Word · Pro ·
 * Type · Mean · Note, any order, Day/STT columns and merged cells fine),
 * plain "word – meaning" lines, or anything at all for the AI to read.
 * Whatever IPA/type is still missing gets filled by AI after import
 * (`autoFill`), and the learner sees every card before saving.
 */
export function VocabImportDialog({
  open,
  onOpenChange,
  onImport,
}: {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onImport: (rows: VocabRow[], options: { autoFill: boolean }) => void;
}) {
  const [mode, setMode] = React.useState<Mode>("table");
  const [text, setText] = React.useState("");
  const [pairSep, setPairSep] = React.useState<(typeof PAIR_SEPARATORS)[number]["id"]>("tab");
  const [aiRows, setAiRows] = React.useState<VocabRow[]>([]);
  const [aiPending, startAi] = React.useTransition();
  const [autoFill, setAutoFill] = React.useState(true);

  const table = React.useMemo(() => (mode === "table" ? parseVocabTable(text) : null), [mode, text]);
  const pairs = React.useMemo(
    () => (mode === "pairs" ? parsePairs(text, PAIR_SEPARATORS.find((p) => p.id === pairSep)!.sep) : []),
    [mode, text, pairSep]
  );
  const rows = mode === "table" ? (table?.rows ?? []) : mode === "pairs" ? pairs : aiRows;
  const valid = rows.filter((r) => r.term && r.definition);
  const missingDetails = valid.some((r) => !r.ipa || !r.partOfSpeech);

  function switchMode(next: Mode) {
    setMode(next);
    setAiRows([]);
  }

  function runAi() {
    startAi(async () => {
      const result = await aiExtractVocabAction(text);
      if (result.error || !result.rows) {
        toast.error(result.error ?? "AI chưa nhận diện được");
        return;
      }
      setAiRows(result.rows);
      toast.success(`AI nhận diện được ${result.rows.length} từ`);
    });
  }

  function confirm() {
    if (valid.length === 0) return;
    onImport(valid, { autoFill: autoFill && missingDetails });
    setText("");
    setAiRows([]);
    onOpenChange(false);
  }

  const tabs: { id: Mode; label: string; icon: typeof Table2 }[] = [
    { id: "table", label: "Bảng nhiều cột", icon: Table2 },
    { id: "pairs", label: "Từ + nghĩa", icon: Columns2 },
    { id: "ai", label: "AI nhận diện", icon: Sparkles },
  ];

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-h-[92vh] overflow-y-auto sm:max-w-4xl">
        <DialogHeader>
          <DialogTitle>Nhập nhiều từ cùng lúc</DialogTitle>
          <DialogDescription>Dán bảng từ Excel / Google Sheets, danh sách từ + nghĩa, hoặc để AI đọc giúp bất cứ đoạn nào.</DialogDescription>
        </DialogHeader>

        <div role="tablist" aria-label="Cách nhập" className="grid grid-cols-3 gap-1 rounded-2xl bg-muted p-1">
          {tabs.map((t) => (
            <button
              key={t.id}
              type="button"
              role="tab"
              aria-selected={mode === t.id}
              onClick={() => switchMode(t.id)}
              className={cn(
                "flex h-10 items-center justify-center gap-1.5 rounded-xl text-xs font-bold transition-colors duration-200 sm:text-sm",
                mode === t.id ? "bg-card text-foreground shadow-sm" : "text-muted-foreground hover:text-foreground"
              )}
            >
              <t.icon className={cn("size-4", t.id === "ai" && "text-primary")} />
              {t.label}
            </button>
          ))}
        </div>

        {mode === "table" && (
          <ImportGuideCallout>
            <p className="font-medium">Copy nguyên bảng rồi dán vào — kể cả dòng tiêu đề</p>
            <p className="text-muted-foreground">
              Nhận cột <b>Word · Pro · Type · Mean · Note</b> theo tiêu đề (thứ tự nào cũng được, tiếng Việt cũng hiểu: Từ, Phiên âm, Loại từ,
              Nghĩa, Ghi chú). Cột Day/STT tự bỏ qua, ô gộp tự hiểu, một từ nhiều dòng (Favor N / Favor V) gộp thành 1 thẻ. Thiếu Pro hay Type
              thì web tự điền.
            </p>
            <button type="button" onClick={() => setText(TABLE_EXAMPLE)} className="w-fit text-xs font-semibold text-primary hover:underline">
              Dán thử ví dụ
            </button>
          </ImportGuideCallout>
        )}
        {mode === "pairs" && (
          <ImportGuideCallout>
            <p className="font-medium">Mỗi dòng một từ: từ, dấu phân tách, rồi nghĩa</p>
            <p className="text-muted-foreground">Phiên âm và loại từ web tự điền theo đúng nghĩa bạn ghi.</p>
          </ImportGuideCallout>
        )}
        {mode === "ai" && (
          <ImportGuideCallout>
            <p className="font-medium">Dán bất cứ thứ gì có từ tiếng Anh</p>
            <p className="text-muted-foreground">
              Ghi chép lộn xộn, danh sách từ không có nghĩa, ảnh chụp đã chuyển chữ, hay một đoạn văn — AI nhặt ra từ cần học, kèm phiên âm, loại
              từ và nghĩa. Nghĩa bạn đã ghi thì giữ nguyên. Xem lại trước khi nhập nhé.
            </p>
          </ImportGuideCallout>
        )}

        <Textarea
          rows={mode === "ai" ? 7 : 8}
          value={text}
          onChange={(e) => {
            setText(e.target.value);
            if (mode === "ai") setAiRows([]);
          }}
          placeholder={
            mode === "table"
              ? "Word\tPro\tType\tMean\tNote\nFavor\t/ˈfeɪ.vɚ/\tN\tSự giúp đỡ\t…"
              : mode === "pairs"
                ? "applicant\tứng viên\npenalty\thình phạt"
                : "vd: compact, detect, dispose of — hoặc dán nguyên một email/đoạn văn tiếng Anh"
          }
          className="font-mono text-sm"
        />

        {mode === "pairs" && (
          <div className="flex flex-wrap items-center gap-1.5 text-sm">
            <span className="mr-1 text-xs font-semibold text-muted-foreground">Giữa từ và nghĩa:</span>
            {PAIR_SEPARATORS.map((p) => (
              <button
                key={p.id}
                type="button"
                onClick={() => setPairSep(p.id)}
                className={cn(
                  "h-8 rounded-full px-3 text-xs font-semibold ring-1 transition-colors",
                  pairSep === p.id ? "bg-primary text-primary-foreground ring-primary" : "ring-border hover:bg-muted"
                )}
              >
                {p.label}
              </button>
            ))}
          </div>
        )}

        {mode === "ai" && (
          <Button type="button" onClick={runAi} disabled={aiPending || !text.trim()} className="w-fit">
            {aiPending ? <Loader2 className="size-4 animate-spin" /> : <Sparkles className="size-4" />}
            {aiPending ? "AI đang đọc…" : aiRows.length > 0 ? "Nhận diện lại" : "Nhận diện bằng AI"}
          </Button>
        )}

        <div>
          <p className="mb-2 flex flex-wrap items-baseline gap-x-2 text-sm font-semibold">
            Xem trước <span className="font-normal text-muted-foreground">{valid.length} từ</span>
            {table && table.merged > 0 && <span className="text-xs font-normal text-muted-foreground">· gộp {table.merged} dòng trùng từ</span>}
            {table && table.rows.length > 0 && (
              <span className="text-xs font-normal text-muted-foreground">· {table.fromHeader ? "nhận cột theo tiêu đề" : "tự đoán cột"}</span>
            )}
          </p>
          <div className="max-h-72 overflow-auto rounded-xl border border-border">
            <PreviewTable rows={rows} />
          </div>
        </div>

        <DialogFooter className="items-center gap-3 sm:justify-between">
          {missingDetails ? (
            <label className="flex items-center gap-2 text-sm">
              <input type="checkbox" checked={autoFill} onChange={(e) => setAutoFill(e.target.checked)} className="size-4 accent-primary" />
              Tự điền phiên âm & loại từ còn thiếu
            </label>
          ) : (
            <span />
          )}
          <div className="flex gap-2">
            <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>
              Hủy
            </Button>
            <Button type="button" onClick={confirm} disabled={valid.length === 0}>
              Nhập {valid.length > 0 ? valid.length : ""} từ
            </Button>
          </div>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
