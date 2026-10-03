import type { Metadata } from "next";
import { db } from "@/lib/db";
import { cn } from "@/lib/utils";
import { ETS_2026_LISTENING_KEYS } from "@/lib/content/ets-2026-listening-keys";
import { buildListeningKeyImportPlan } from "@/lib/data/listening-key-import";
import { ListeningKeyImportButton } from "@/components/admin/listening-key-import-button";

export const metadata: Metadata = { title: "Giải thích ETS 2026" };

const KEY_TESTS = Object.keys(ETS_2026_LISTENING_KEYS).map(Number);

/** Best-guess DB test for an ETS key number, from titles like "ETS 2026 - Test 3". */
function guessTestId(tests: { id: string; title: string }[], keyTest: number) {
  return tests.find((t) => /ets/i.test(t.title) && /2026/.test(t.title) && new RegExp(`(test|đề)\\s*0?${keyTest}\\b`, "i").test(t.title))?.id;
}

export default async function AdminExplanationsPage({ searchParams }: { searchParams: Promise<{ key?: string; test?: string }> }) {
  const params = await searchParams;
  const keyTest = KEY_TESTS.includes(Number(params.key)) ? Number(params.key) : KEY_TESTS[0];
  const tests = await db.test.findMany({ orderBy: { createdAt: "desc" }, select: { id: true, title: true } });
  const testId = params.test ?? guessTestId(tests, keyTest) ?? "";
  const plan = testId ? await buildListeningKeyImportPlan(testId, keyTest) : null;
  const mismatches = plan?.rows.filter((r) => r.dbAnswer !== r.key.answer) ?? [];

  return (
    <div className="flex flex-col gap-6">
      <div>
        <h1 className="text-2xl font-semibold tracking-tight">Giải thích ETS 2026 (Listening)</h1>
        <p className="mt-1 text-sm text-muted-foreground">
          Ghép transcript tiếng Anh và giải thích/dịch nghĩa tiếng Việt từ file “ETS 2026 Listening — Script &amp; Đáp án” (Test {KEY_TESTS[0]}–
          {KEY_TESTS[KEY_TESTS.length - 1]}) vào 100 câu Listening của một đề trên web. Câu được đánh số theo thứ tự Part 1 → 4. Xem trước bảng đối chiếu
          rồi mới bấm áp dụng; có thể áp dụng lại nhiều lần.
        </p>
      </div>

      <form className="flex flex-wrap items-end gap-3 rounded-2xl border border-border bg-card p-5 shadow-soft">
        <label className="flex flex-col gap-1 text-sm">
          <span className="text-xs font-medium text-muted-foreground">File giải thích</span>
          <select name="key" defaultValue={keyTest} className="h-9 rounded-lg border border-input bg-background px-3">
            {KEY_TESTS.map((n) => (
              <option key={n} value={n}>
                ETS 2026 — Test {n}
              </option>
            ))}
          </select>
        </label>
        <label className="flex min-w-64 flex-1 flex-col gap-1 text-sm">
          <span className="text-xs font-medium text-muted-foreground">Đề trên web</span>
          <select name="test" defaultValue={testId} className="h-9 rounded-lg border border-input bg-background px-3">
            <option value="">— Chọn đề —</option>
            {tests.map((t) => (
              <option key={t.id} value={t.id}>
                {t.title}
              </option>
            ))}
          </select>
        </label>
        <button type="submit" className="h-9 rounded-lg bg-primary px-4 text-sm font-medium text-primary-foreground hover:bg-primary/90">
          Xem trước
        </button>
      </form>

      {!plan ? (
        <p className="text-sm text-muted-foreground">Chọn đề trên web tương ứng để xem bảng đối chiếu.</p>
      ) : (
        <>
          <section className="flex flex-col gap-3 rounded-2xl border border-border bg-card p-5 shadow-soft">
            <p className="text-sm">
              <strong>{plan.testTitle}</strong> ↔ ETS 2026 Test {keyTest}: {plan.rows.length} câu ghép được
              {mismatches.length > 0 && <>, <span className="font-medium text-warning">{mismatches.length} câu đáp án khác nhau</span></>}.
            </p>
            {plan.errors.length > 0 ? (
              <ul className="list-disc pl-5 text-sm text-destructive">
                {plan.errors.slice(0, 8).map((e) => (
                  <li key={e}>{e}</li>
                ))}
              </ul>
            ) : (
              <ListeningKeyImportButton testId={testId} keyTest={keyTest} mismatchCount={mismatches.length} />
            )}
          </section>

          <div className="overflow-x-auto rounded-2xl border border-border bg-card shadow-soft">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-border text-left text-xs text-muted-foreground">
                  <th className="px-4 py-3 font-medium">Câu</th>
                  <th className="px-4 py-3 font-medium">Part</th>
                  <th className="px-4 py-3 font-medium">Đáp án web</th>
                  <th className="px-4 py-3 font-medium">Đáp án file</th>
                  <th className="px-4 py-3 font-medium">Transcript (đầu)</th>
                </tr>
              </thead>
              <tbody>
                {plan.rows.map((row) => (
                  <tr key={row.number} className={cn("border-b border-border/60", row.dbAnswer !== row.key.answer && "bg-warning/10")}>
                    <td className="px-4 py-2 font-medium">{row.number}</td>
                    <td className="px-4 py-2">{row.part}</td>
                    <td className="px-4 py-2">{row.dbAnswer}</td>
                    <td className="px-4 py-2">{row.key.answer}</td>
                    <td className="max-w-md truncate px-4 py-2 text-xs text-muted-foreground">{row.key.transcript.split("\n")[0] || "—"}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </>
      )}
    </div>
  );
}
