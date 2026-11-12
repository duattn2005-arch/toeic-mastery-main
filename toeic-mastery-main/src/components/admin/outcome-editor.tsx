"use client";

import { useActionState, useTransition } from "react";
import { saveOutcomesAction, resetOutcomesAction, type OutcomeSaveState } from "@/lib/actions/admin-outcomes";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

export interface EditorOutcome {
  code: string;
  tierName: string;
  levelLabel: string;
  audience: string;
  verb: string;
  content: string;
  degree: string;
  timeBound: string;
  objectives: string[];
  /** Động từ hợp lệ của đúng miền + bậc. */
  verbs: string[];
  edited: boolean;
}

export interface EditorProps {
  goal: string;
  objectives: { code: string; pillar: string; statement: string }[];
  outcomes: EditorOutcome[];
}

const LABEL = "mb-1 block text-xs font-semibold text-muted-foreground";

export function OutcomeEditor({ goal, objectives, outcomes }: EditorProps) {
  const [state, formAction, saving] = useActionState<OutcomeSaveState, FormData>(saveOutcomesAction, null);
  const [resetting, startReset] = useTransition();
  const errorsOf = (code: string) => state?.errors.find((e) => e.code === code)?.errors ?? [];

  return (
    <form action={formAction} className="flex flex-col gap-6">
      <div className="sticky top-0 z-10 flex flex-wrap items-center gap-3 rounded-2xl border border-border bg-card/95 p-4 shadow-soft backdrop-blur">
        <Button type="submit" disabled={saving || resetting}>
          {saving ? "Đang kiểm tra và lưu…" : "Lưu thay đổi"}
        </Button>
        <Button
          type="button"
          variant="outline"
          disabled={saving || resetting}
          onClick={() => {
            if (confirm("Khôi phục toàn bộ mục tiêu và chuẩn đầu ra về nội dung mặc định?")) startReset(() => resetOutcomesAction());
          }}
        >
          {resetting ? "Đang khôi phục…" : "Khôi phục mặc định"}
        </Button>
        {state && (
          <p role="status" className={state.ok ? "text-sm font-semibold text-success" : "text-sm font-semibold text-destructive"}>
            {state.message}
          </p>
        )}
      </div>

      <section className="rounded-2xl border border-border bg-card p-6 shadow-soft">
        <h2 className="mb-3 text-sm font-semibold text-muted-foreground">MỤC TIÊU CHƯƠNG TRÌNH</h2>
        <label className={LABEL} htmlFor="goal">
          Mục tiêu chung (50–100 từ)
        </label>
        <Textarea id="goal" name="goal" defaultValue={goal} rows={4} />
        <div className="mt-4 grid gap-4 sm:grid-cols-2">
          {objectives.map((p) => (
            <div key={p.code}>
              <label className={LABEL} htmlFor={`po:${p.code}`}>
                {p.code} · {p.pillar}
              </label>
              <Textarea id={`po:${p.code}`} name={`po:${p.code}`} defaultValue={p.statement} rows={3} />
            </div>
          ))}
        </div>
      </section>

      {outcomes.map((o) => {
        const errs = errorsOf(o.code);
        const verbs = o.verbs.includes(o.verb) ? o.verbs : [o.verb, ...o.verbs];
        return (
          <section key={o.code} className={`rounded-2xl border bg-card p-6 shadow-soft ${errs.length ? "border-destructive" : "border-border"}`}>
            <div className="mb-3 flex flex-wrap items-center gap-2">
              <h2 className="text-base font-extrabold">{o.code}</h2>
              <span className="text-xs text-muted-foreground">
                {o.tierName} · {o.levelLabel}
              </span>
              {o.edited && <span className="rounded-full bg-primary/10 px-2 py-0.5 text-[11px] font-bold text-primary">Đã sửa</span>}
            </div>
            {errs.length > 0 && (
              <ul className="mb-3 list-disc rounded-xl bg-destructive/10 py-2 pr-3 pl-7 text-sm text-destructive">
                {errs.map((e) => (
                  <li key={e}>{e}</li>
                ))}
              </ul>
            )}
            <div className="grid gap-3 sm:grid-cols-2">
              <div>
                <label className={LABEL} htmlFor={`${o.code}:timeBound`}>
                  Thời gian (T)
                </label>
                <Input id={`${o.code}:timeBound`} name={`${o.code}:timeBound`} defaultValue={o.timeBound} />
              </div>
              <div>
                <label className={LABEL} htmlFor={`${o.code}:audience`}>
                  A — Đối tượng
                </label>
                <Input id={`${o.code}:audience`} name={`${o.code}:audience`} defaultValue={o.audience} />
              </div>
              <div>
                <label className={LABEL} htmlFor={`${o.code}:verb`}>
                  B — Động từ ({o.levelLabel})
                </label>
                <select id={`${o.code}:verb`} name={`${o.code}:verb`} defaultValue={o.verb} className="h-9 w-full rounded-md border border-input bg-transparent px-3 text-sm dark:bg-input/30">
                  {verbs.map((v) => (
                    <option key={v} value={v}>
                      {v}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label className={LABEL} htmlFor={`${o.code}:degree`}>
                  D — Mức độ (có con số đo được)
                </label>
                <Input id={`${o.code}:degree`} name={`${o.code}:degree`} defaultValue={o.degree} />
              </div>
              <div className="sm:col-span-2">
                <label className={LABEL} htmlFor={`${o.code}:content`}>
                  C — Nội dung
                </label>
                <Textarea id={`${o.code}:content`} name={`${o.code}:content`} defaultValue={o.content} rows={2} />
              </div>
              <fieldset className="sm:col-span-2">
                <legend className={LABEL}>Đóng góp cho mục tiêu</legend>
                <div className="flex flex-wrap gap-4">
                  {objectives.map((p) => (
                    <label key={p.code} className="inline-flex items-center gap-1.5 text-sm">
                      <input type="checkbox" name={`${o.code}:objectives`} value={p.code} defaultChecked={o.objectives.includes(p.code)} className="size-4 accent-[var(--primary)]" />
                      {p.code}
                    </label>
                  ))}
                </div>
              </fieldset>
            </div>
          </section>
        );
      })}
    </form>
  );
}
