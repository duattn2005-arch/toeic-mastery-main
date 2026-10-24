"use client";

import * as React from "react";
import { useRouter } from "next/navigation";
import { Loader2 } from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import type { SeoActionResult } from "@/lib/actions/admin-seo";

export function BankExplainerForm({
  parts,
  start,
  disabled,
}: {
  parts: { part: string; label: string; todo: number }[];
  start: (input: { parts: string[]; overwrite: boolean; limit: number; etsOnly: boolean }) => Promise<SeoActionResult>;
  disabled: boolean;
}) {
  const router = useRouter();
  const [chosen, setChosen] = React.useState(() => new Set(parts.filter((p) => p.todo > 0).map((p) => p.part)));
  const [overwrite, setOverwrite] = React.useState(false);
  const [limit, setLimit] = React.useState(0);
  const [pending, run] = React.useTransition();

  return (
    <form
      className="flex flex-col gap-4"
      onSubmit={(e) => {
        e.preventDefault();
        const etsOnly = (e.nativeEvent as SubmitEvent).submitter?.getAttribute("value") === "ets";
        if (overwrite && !window.confirm("Viết lại cả những câu ĐÃ có giải thích? Giải thích cũ sẽ bị thay.")) return;
        run(async () => {
          const result = await start({ parts: [...chosen], overwrite, limit, etsOnly });
          if (result.error) toast.error(result.error);
          else toast.success(result.message ?? "Đã bắt đầu");
          router.refresh();
        });
      }}
    >
      <div className="flex flex-wrap gap-2">
        {parts.map((p) => (
          <label key={p.part} className="flex cursor-pointer items-center gap-2 rounded-xl border border-border px-3 py-2 text-sm has-[:checked]:border-primary has-[:checked]:bg-primary/5">
            <input
              type="checkbox"
              checked={chosen.has(p.part)}
              onChange={(e) => {
                const next = new Set(chosen);
                if (e.target.checked) next.add(p.part);
                else next.delete(p.part);
                setChosen(next);
              }}
            />
            {p.label}
            <span className="text-xs text-muted-foreground">({p.todo} cần làm)</span>
          </label>
        ))}
      </div>
      <div className="flex flex-wrap items-center gap-5 text-sm">
        <label className="flex items-center gap-2">
          <input type="checkbox" checked={overwrite} onChange={(e) => setOverwrite(e.target.checked)} />
          Viết lại cả câu đã có giải thích
        </label>
        <label className="flex items-center gap-2">
          Làm tối đa
          <input
            type="number"
            min={0}
            value={limit}
            onChange={(e) => setLimit(Number(e.target.value))}
            className="h-8 w-20 rounded-lg border border-border bg-background px-2"
          />
          câu <span className="text-xs text-muted-foreground">(0 = tất cả; nên thử 10 câu trước)</span>
        </label>
      </div>
      <div className="flex flex-wrap gap-3">
        <Button type="submit" value="ets" className="w-fit" disabled={disabled || pending || chosen.size === 0}>
          {pending && <Loader2 className="size-4 animate-spin" />} Chỉ quét đề ETS (không tốn AI)
        </Button>
        <Button type="submit" value="ai" variant="outline" className="w-fit" disabled={disabled || pending || chosen.size === 0}>
          Quét ETS + AI viết câu còn thiếu
        </Button>
      </div>
    </form>
  );
}

/** Upload of a JSON file with explanations written outside the app. */
export function BankImportForm({ action }: { action: (json: string, overwrite: boolean) => Promise<SeoActionResult> }) {
  const router = useRouter();
  const [overwrite, setOverwrite] = React.useState(false);
  const [pending, run] = React.useTransition();
  return (
    <div className="flex flex-wrap items-center gap-4 text-sm">
      <label className="inline-flex cursor-pointer items-center gap-2 rounded-xl bg-primary px-4 py-2 font-medium text-primary-foreground hover:bg-primary/90">
        {pending && <Loader2 className="size-4 animate-spin" />} Nhập giải thích (file .json)
        <input
          type="file"
          accept="application/json,.json"
          className="hidden"
          disabled={pending}
          onChange={(e) => {
            const file = e.target.files?.[0];
            e.target.value = "";
            if (!file) return;
            run(async () => {
              const result = await action(await file.text(), overwrite);
              if (result.error) toast.error(result.error);
              else toast.success(result.message ?? "Đã nhập", { duration: 15000 });
              router.refresh();
            });
          }}
        />
      </label>
      <label className="flex items-center gap-2">
        <input type="checkbox" checked={overwrite} onChange={(e) => setOverwrite(e.target.checked)} />
        Thay cả giải thích đã có
      </label>
    </div>
  );
}
