import type { Metadata } from "next";
import Link from "next/link";
import { requireAdmin } from "@/lib/auth";
import { PART_META } from "@/lib/constants/toeic";
import { bankStatus, currentBankJob } from "@/lib/services/explanations/bank-explainer";
import { importBankExplanationsAction, startBankExplainerAction, stopBankExplainerAction } from "@/lib/actions/admin-bank-explanations";
import { BankExplainerForm, BankImportForm } from "@/components/admin/explanations/bank-explainer-form";
import { SeoActionButton, SeoAutoRefresh } from "@/components/admin/seo/seo-controls";

export const metadata: Metadata = { title: "Giải thích ngân hàng câu hỏi" };
export const dynamic = "force-dynamic";

function QuestionLinks({ title, items }: { title: string; items: { id: string; part: string; note?: string }[] }) {
  if (items.length === 0) return null;
  return (
    <section className="rounded-2xl border border-border bg-card p-5 shadow-soft">
      <h2 className="mb-3 text-sm font-semibold text-muted-foreground">
        {title} ({items.length})
      </h2>
      <ul className="flex max-h-80 flex-col gap-2 overflow-y-auto text-sm">
        {items.slice(-200).map((q, i) => (
          <li key={`${q.id}-${i}`}>
            <Link href={`/admin/questions/${q.id}`} target="_blank" className="font-medium text-primary hover:underline">
              {q.part.replace("PART", "Part ")} · {q.id.slice(0, 8)}
            </Link>
            {q.note && <span className="text-muted-foreground"> — {q.note}</span>}
          </li>
        ))}
      </ul>
    </section>
  );
}

export default async function BankExplanationsPage() {
  await requireAdmin();
  const [status, job] = [await bankStatus(), currentBankJob()];
  const running = Boolean(job?.running);

  return (
    <div className="flex flex-col gap-6">
      <div>
        <h1 className="text-2xl font-semibold tracking-tight">Giải thích ngân hàng câu hỏi</h1>
        <p className="mt-1 max-w-3xl text-sm text-muted-foreground">
          Viết giải thích chi tiết (dạng câu hỏi, phân tích, vì sao chọn, dịch, từ vựng, vì sao các đáp án khác sai, câu trích dẫn) cho các câu trong “Ngân hàng câu hỏi luyện tập — Part 1–7”.
          Câu Listening chưa có transcript: AI nghe file audio và ghi transcript trước. Câu có ảnh: AI đọc ảnh. Đáp án trong dữ liệu luôn được giữ nguyên; câu trùng đề ETS lấy giải thích từ sách.
          Nếu AI cho rằng đáp án đang lưu bị sai, câu đó không được ghi mà được đưa vào “Báo lỗi câu hỏi” để bạn kiểm tra.
        </p>
      </div>

      <div className="overflow-x-auto rounded-2xl border border-border bg-card shadow-soft">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-border text-left text-xs text-muted-foreground">
              <th className="px-4 py-3 font-medium">Ngân hàng</th>
              <th className="px-4 py-3 font-medium">Số câu</th>
              <th className="px-4 py-3 font-medium">Thiếu giải thích</th>
              <th className="px-4 py-3 font-medium">Thiếu transcript</th>
            </tr>
          </thead>
          <tbody>
            {status.map((s) => (
              <tr key={s.part} className="border-b border-border last:border-0">
                <td className="px-4 py-3 font-medium">{PART_META[s.part].label}</td>
                <td className="px-4 py-3">{s.total}</td>
                <td className={s.weak ? "px-4 py-3 font-semibold text-warning" : "px-4 py-3 text-success"}>{s.weak || "✓"}</td>
                <td className={s.noTranscript ? "px-4 py-3 font-semibold text-warning" : "px-4 py-3 text-muted-foreground"}>{s.noTranscript || "—"}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <section className="flex flex-col gap-3 rounded-2xl border border-border bg-card p-5 shadow-soft">
        <h2 className="text-sm font-semibold text-muted-foreground">TẢI DỮ LIỆU / NHẬP GIẢI THÍCH SOẠN SẴN</h2>
        <div className="flex flex-wrap items-center gap-4 text-sm">
          <a href="/api/admin/bank-export" className="rounded-xl border border-border px-4 py-2 font-medium hover:bg-muted">
            Tải dữ liệu câu cần làm (.json)
          </a>
          <a href="/api/admin/bank-export?all=1" className="text-primary hover:underline">
            Tải toàn bộ ngân hàng
          </a>
        </div>
        <BankImportForm action={importBankExplanationsAction} />
      </section>

      <section className="rounded-2xl border border-border bg-card p-5 shadow-soft">
        <h2 className="mb-3 text-sm font-semibold text-muted-foreground">QUÉT ĐỀ ETS / AI VIẾT</h2>
        <BankExplainerForm
          parts={status.map((s) => ({ part: s.part, label: s.part.replace("PART", "Part "), todo: Math.max(s.weak, s.noTranscript) }))}
          start={startBankExplainerAction}
          disabled={running}
        />
      </section>

      {job && (
        <section className="flex flex-col gap-3 rounded-2xl border border-border bg-card p-5 shadow-soft">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-sm">
              <span className="font-semibold">
                {job.done}/{job.total} câu
              </span>
              <span>{job.fromEts} từ sách ETS</span>
              <span>{job.fromAi} do AI viết</span>
              <span>{job.transcripts} transcript mới</span>
              <span className="text-warning">{job.flagged.length} nghi sai đáp án</span>
              <span className="text-destructive">{job.failed.length} lỗi</span>
              <SeoAutoRefresh active={running} everyMs={4000} />
            </div>
            {running && (
              <SeoActionButton action={stopBankExplainerAction} variant="outline">
                Dừng
              </SeoActionButton>
            )}
          </div>
          <div className="h-2 overflow-hidden rounded-full bg-muted">
            <div className="h-full bg-primary transition-all" style={{ width: `${job.total ? Math.round((job.done / job.total) * 100) : 0}%` }} />
          </div>
          <pre className="max-h-64 overflow-y-auto rounded-xl bg-muted/50 p-3 text-xs whitespace-pre-wrap">{job.log.slice(-60).join("\n")}</pre>
        </section>
      )}

      {job && (
        <div className="grid gap-6 lg:grid-cols-3">
          <QuestionLinks title="Đã viết — bấm để xem lại" items={job.written} />
          <QuestionLinks title="AI nghi đáp án sai (chưa ghi)" items={job.flagged} />
          <QuestionLinks title="Lỗi" items={job.failed} />
        </div>
      )}
    </div>
  );
}
