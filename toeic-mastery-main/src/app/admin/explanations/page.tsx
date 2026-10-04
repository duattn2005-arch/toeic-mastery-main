import type { Metadata } from "next";
import { db } from "@/lib/db";
import { cn } from "@/lib/utils";
import { ETS_2026_LISTENING_KEYS } from "@/lib/content/ets-2026-listening-keys";
import { buildListeningKeyImportPlan, rankKeyFilesForTest } from "@/lib/data/listening-key-import";
import { ListeningKeyImportButton } from "@/components/admin/listening-key-import-button";

export const metadata: Metadata = { title: "Giải thích ETS 2026" };

const KEY_TESTS = Object.keys(ETS_2026_LISTENING_KEYS).map(Number);

/** Best-guess DB test for an ETS key number, from titles like "ETS 2026 - Test 3". */
function guessTestId(tests: { id: string; title: string }[], keyTest: number) {
  return tests.find((t) => /ets/i.test(t.title) && /2026/.test(t.title) && new RegExp(`(test|đề)\\s*0?${keyTest}\\b`, "i").test(t.title))?.id;
}

export default async function AdminExplanationsPage({ searchParams }: { searchParams: Promise<{ key?: string; test?: string }> }) {
  const params = await searchParams;
  const tests = await db.test.findMany({ orderBy: { createdAt: "desc" }, select: { id: true, title: true } });
  const requestedKey = KEY_TESTS.includes(Number(params.key)) ? Number(params.key) : null;
  const testId = params.test ?? guessTestId(tests, requestedKey ?? KEY_TESTS[0]) ?? "";
  // Which file fits this web test best — a web "Test 02" may hold a
  // different ETS test than the file numbered 2.
  const fits = testId ? await rankKeyFilesForTest(testId) : [];
  const keyTest = requestedKey ?? fits[0]?.keyTest ?? KEY_TESTS[0];
  const plan = testId ? await buildListeningKeyImportPlan(testId, keyTest) : null;
  // Picking a file that clearly isn't this test (e.g. web Test 01 with file
  // Test 4) must not look like "80 wrong answers" — say so and block it.
  const bestFit = fits.find((f) => !f.blocked);
  const chosenFit = fits.find((f) => f.keyTest === keyTest);
  const wrongPair = Boolean(bestFit && chosenFit && bestFit.keyTest !== keyTest && bestFit.avgScore - chosenFit.avgScore >= 0.2);
  const testTitle = tests.find((t) => t.id === testId)?.title;
  const webTestForKey = guessTestId(tests, keyTest);
  const mismatches = plan?.rows.filter((r) => r.dbAnswer !== r.key.answer) ?? [];

  return (
    <div className="flex flex-col gap-6">
      <div>
        <h1 className="text-2xl font-semibold tracking-tight">Giải thích ETS 2026 (Listening)</h1>
        <p className="mt-1 text-sm text-muted-foreground">
          Ghép transcript tiếng Anh và giải thích/dịch nghĩa tiếng Việt từ file “ETS 2026 Listening — Script &amp; Đáp án” (Test {KEY_TESTS[0]}–
          {KEY_TESTS[KEY_TESTS.length - 1]}) vào 100 câu Listening của một đề trên web. Câu được ghép theo nội dung (câu hỏi + đáp án) khi câu trên web có chữ, câu chỉ có audio ghép theo thứ tự hiển thị trên web.
          Xem trước bảng đối chiếu rồi mới bấm áp dụng; có thể áp dụng lại nhiều lần.
        </p>
      </div>

      <form className="flex flex-wrap items-end gap-3 rounded-2xl border border-border bg-card p-5 shadow-soft">
        <label className="flex flex-col gap-1 text-sm">
          <span className="text-xs font-medium text-muted-foreground">File giải thích</span>
          <select name="key" defaultValue={requestedKey ?? ""} className="h-9 rounded-lg border border-input bg-background px-3">
            <option value="">Tự chọn file khớp nhất</option>
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

      {fits.length > 0 && (
        <section className="flex flex-col gap-2 rounded-2xl border border-border bg-card p-5 shadow-soft">
          <h2 className="text-sm font-semibold">Đề này khớp với file nào?</h2>
          <p className="text-xs text-muted-foreground">
            So nội dung câu hỏi/đáp án của đề trên web với cả {KEY_TESTS.length} file. File khớp nhất được chọn sẵn khi bạn chưa chọn file.
          </p>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-border text-left text-xs text-muted-foreground">
                  <th className="py-2 pr-4 font-medium">File</th>
                  <th className="py-2 pr-4 font-medium">Khớp nội dung</th>
                  <th className="py-2 pr-4 font-medium">Số câu khác đáp án</th>
                  <th className="py-2 font-medium"></th>
                </tr>
              </thead>
              <tbody>
                {fits.map((fit, i) => (
                  <tr key={fit.keyTest} className={cn("border-b border-border/60", fit.keyTest === keyTest && "bg-primary/10")}>
                    <td className="py-2 pr-4 font-medium">
                      ETS 2026 — Test {fit.keyTest} {i === 0 && !fit.blocked && <span className="text-xs text-success">(khớp nhất)</span>}
                    </td>
                    <td className="py-2 pr-4">{fit.blocked ? "Không khớp số câu" : fit.contentMatched ? `${Math.round(fit.avgScore * 100)}% (${fit.contentMatched} câu)` : "Đề chỉ có audio"}</td>
                    <td className="py-2 pr-4">{fit.blocked ? "—" : fit.answerMismatches}</td>
                    <td className="py-2">
                      <a href={`?test=${testId}&key=${fit.keyTest}`} className="text-xs font-medium text-primary hover:underline">
                        Xem trước
                      </a>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>
      )}

      {wrongPair && bestFit && (
        <section className="flex flex-col gap-2 rounded-2xl border border-destructive/40 bg-destructive/10 p-5 text-sm">
          <p className="font-semibold text-destructive">Bạn đang ghép nhầm cặp — chưa áp dụng được.</p>
          <p>
            Đề <strong>{testTitle}</strong> trên web khớp với <strong>file Test {bestFit.keyTest}</strong> ({Math.round(bestFit.avgScore * 100)}%), không phải file
            Test {keyTest} ({Math.round((chosenFit?.avgScore ?? 0) * 100)}%). Các “câu khác đáp án” bên dưới là do so hai đề khác nhau, không phải đáp án sai.
          </p>
          <div className="flex flex-wrap gap-3">
            <a href={`?test=${testId}&key=${bestFit.keyTest}`} className="font-medium text-primary hover:underline">
              → Xem {testTitle} với file Test {bestFit.keyTest}
            </a>
            {webTestForKey && webTestForKey !== testId && (
              <a href={`?test=${webTestForKey}&key=${keyTest}`} className="font-medium text-primary hover:underline">
                → Xem file Test {keyTest} với {tests.find((t) => t.id === webTestForKey)?.title}
              </a>
            )}
          </div>
        </section>
      )}

      {!plan ? (
        <p className="text-sm text-muted-foreground">Chọn đề trên web tương ứng để xem bảng đối chiếu.</p>
      ) : (
        <>
          <section className="flex flex-col gap-3 rounded-2xl border border-border bg-card p-5 shadow-soft">
            <p className="text-sm">
              <strong>{plan.testTitle}</strong> ↔ ETS 2026 Test {keyTest}: {plan.rows.length} câu ghép được
              {mismatches.length > 0 && <>, <span className="font-medium text-warning">{mismatches.length} câu đáp án khác nhau</span></>}.
            </p>
            {plan.warnings.length > 0 && (
              <ul className="list-disc pl-5 text-sm text-warning">
                {plan.warnings.map((w) => (
                  <li key={w}>{w}</li>
                ))}
              </ul>
            )}
            {wrongPair ? null : plan.errors.length > 0 ? (
              <ul className="list-disc pl-5 text-sm text-destructive">
                {plan.errors.slice(0, 8).map((e) => (
                  <li key={e}>{e}</li>
                ))}
              </ul>
            ) : (
              <ListeningKeyImportButton
                key={`${testId}-${keyTest}`}
                testId={testId}
                keyTest={keyTest}
                mismatchCount={mismatches.length}
                fixAnswersByDefault={plan.warnings.length === 0}
              />
            )}
          </section>

          <div className="overflow-x-auto rounded-2xl border border-border bg-card shadow-soft">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-border text-left text-xs text-muted-foreground">
                  <th className="px-4 py-3 font-medium">Câu (file)</th>
                  <th className="px-4 py-3 font-medium">Câu trên web</th>
                  <th className="px-4 py-3 font-medium">Part</th>
                  <th className="px-4 py-3 font-medium">Đáp án web</th>
                  <th className="px-4 py-3 font-medium">Đáp án file</th>
                  <th className="px-4 py-3 font-medium">Ghép theo</th>
                  <th className="px-4 py-3 font-medium">Nội dung câu trên web</th>
                  <th className="px-4 py-3 font-medium">Nội dung trong file</th>
                </tr>
              </thead>
              <tbody>
                {plan.rows.map((row) => (
                  <tr
                    key={row.number}
                    className={cn(
                      "border-b border-border/60",
                      row.method === "content" && (row.score ?? 0) < 0.5 ? "bg-destructive/10" : row.dbAnswer !== row.key.answer && "bg-warning/10"
                    )}
                  >
                    <td className="px-4 py-2 font-medium">{row.number}</td>
                    <td className={cn("px-4 py-2", row.webNumber !== row.number && "font-semibold text-warning")}>{row.webNumber}</td>
                    <td className="px-4 py-2">{row.part}</td>
                    <td className="px-4 py-2">{row.dbAnswer}</td>
                    <td className="px-4 py-2 font-semibold">{row.key.answer}</td>
                    <td className="whitespace-nowrap px-4 py-2 text-xs">
                      {row.method === "content" ? `Nội dung ${Math.round((row.score ?? 0) * 100)}%` : "Thứ tự"}
                    </td>
                    <td className="max-w-xs truncate px-4 py-2 text-xs text-muted-foreground">{row.dbText || "— (chỉ có audio)"}</td>
                    <td className="max-w-xs truncate px-4 py-2 text-xs text-muted-foreground">{row.key.textEn}</td>
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
