import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { db } from "@/lib/db";
import { requireAdmin } from "@/lib/auth";
import { PART_META } from "@/lib/constants/toeic";
import { getTaggingCoverage, taggingState } from "@/lib/services/tagging/run";
import { TaggingRunPanel } from "@/components/admin/tagging-run-panel";
import { Button } from "@/components/ui/button";
import { BLOOM_LEVELS, TRAP_TYPES, type TrapType } from "@/lib/bloom/config";

export const metadata: Metadata = { title: "Nhãn & chưng cất câu hỏi" };
export const dynamic = "force-dynamic";

const pct = (a: number, b: number) => (b ? `${Math.round((a / b) * 100)}%` : "—");

function Bar({ value, total }: { value: number; total: number }) {
  return (
    <div className="flex items-center gap-2">
      <div className="h-1.5 w-20 overflow-hidden rounded-full bg-muted">
        <div className="h-full rounded-full bg-primary" style={{ width: total ? `${(value / total) * 100}%` : 0 }} />
      </div>
      <span className="tabular-nums">{pct(value, total)}</span>
    </div>
  );
}

export default async function LabelsPage() {
  await requireAdmin();
  const [coverage, labels, topics] = await Promise.all([
    getTaggingCoverage(),
    db.strategicLabel.findMany({ select: { slug: true, title: true, category: true }, orderBy: { orderIndex: "asc" } }),
    db.grammarTopic.findMany({ select: { slug: true, title: true }, orderBy: { orderIndex: "asc" } }),
  ]);
  const labelCount = new Map(coverage.labels.map((l) => [l.slug, l.count]));
  const topicCount = new Map(coverage.topics.map((t) => [t.slug, t.count]));
  const total = coverage.parts.reduce((s, p) => s + p.total, 0);
  const labelled = coverage.parts.reduce((s, p) => s + p.strategy, 0);
  const diffTotal = coverage.difficulty.reduce((s, d) => s + d.count, 0);
  const bloomOf = (part: string, level: number) => coverage.bloom.find((b) => b.part === part && b.level === level)?.count ?? 0;
  const bloomTotal = (level: number) => coverage.bloom.filter((b) => b.level === level).reduce((s, b) => s + b.count, 0);
  const bloomUnset = coverage.bloom.filter((b) => b.level === null).reduce((s, b) => s + b.count, 0);
  const bloomManual = coverage.bloom.reduce((s, b) => s + b.manual, 0);
  const wrongOptions = coverage.traps.reduce((s, t) => s + t.count, 0);
  const trapped = coverage.traps.filter((t) => t.trap).reduce((s, t) => s + t.count, 0);

  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div>
          <Button asChild variant="ghost" size="sm" className="-ml-2 mb-1 gap-1">
            <Link href="/admin/questions">
              <ArrowLeft className="size-4" /> Câu hỏi
            </Link>
          </Button>
          <h1 className="text-2xl font-semibold tracking-tight">Nhãn & chưng cất câu hỏi</h1>
          <p className="mt-1 max-w-3xl text-sm text-muted-foreground">
            Mỗi câu được gắn tự động: chủ điểm ngữ pháp (Part 5–6), dạng câu hỏi / nhãn chiến lược, từ vựng trọng tâm và độ khó. Độ khó được chưng cất từ tỷ lệ đúng thực tế khi câu có đủ 12 lượt làm. Nhãn admin tự đặt
            không bao giờ bị ghi đè — sửa một câu là nhãn của câu đó thành nhãn tay.
          </p>
        </div>
      </div>

      <TaggingRunPanel initial={{ running: taggingState.running, scanned: taggingState.scanned, total: taggingState.total, last: taggingState.last }} />

      <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
        {[
          { label: "Tổng số câu", value: total.toLocaleString("vi-VN") },
          { label: "Có nhãn dạng câu", value: pct(labelled, total) },
          { label: "Độ khó theo dữ liệu thật", value: coverage.parts.reduce((s, p) => s + p.dataDifficulty, 0).toLocaleString("vi-VN") },
          { label: "Nhãn chiến lược đang dùng", value: `${coverage.labels.length}/${labels.length}` },
        ].map((s) => (
          <div key={s.label} className="rounded-2xl border border-border bg-card p-4">
            <div className="text-2xl font-bold tabular-nums">{s.value}</div>
            <div className="text-xs text-muted-foreground">{s.label}</div>
          </div>
        ))}
      </div>

      <section className="rounded-2xl border border-border bg-card p-5">
        <h2 className="mb-3 font-semibold">Độ phủ theo Part</h2>
        <div className="overflow-x-auto">
          <table className="w-full min-w-[620px] text-sm">
            <thead>
              <tr className="text-left text-xs uppercase text-muted-foreground">
                <th className="py-2 pr-3">Part</th>
                <th className="py-2 pr-3">Số câu</th>
                <th className="py-2 pr-3">Dạng câu</th>
                <th className="py-2 pr-3">Chủ điểm NP</th>
                <th className="py-2 pr-3">Từ vựng</th>
                <th className="py-2 pr-3">Độ khó từ dữ liệu</th>
              </tr>
            </thead>
            <tbody>
              {coverage.parts.map((p) => (
                <tr key={p.part} className="border-t border-border">
                  <td className="py-2 pr-3 font-medium">{PART_META[p.part].shortLabel}</td>
                  <td className="py-2 pr-3 tabular-nums">{p.total.toLocaleString("vi-VN")}</td>
                  <td className="py-2 pr-3"><Bar value={p.strategy} total={p.total} /></td>
                  <td className="py-2 pr-3">{p.part === "PART5" || p.part === "PART6" ? <Bar value={p.grammar} total={p.total} /> : <span className="text-muted-foreground">—</span>}</td>
                  <td className="py-2 pr-3"><Bar value={p.vocab} total={p.total} /></td>
                  <td className="py-2 pr-3 tabular-nums">{p.dataDifficulty.toLocaleString("vi-VN")}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <p className="mt-3 text-xs text-muted-foreground">
          Câu nghe Part 1–2 chỉ có audio (không transcript, đáp án không có chữ) sẽ chưa có dạng câu — thêm transcript cho câu đó là lần chạy sau tự gắn được.
        </p>
      </section>

      <section className="rounded-2xl border border-border bg-card p-5">
        <div className="mb-3 flex flex-wrap items-baseline justify-between gap-2">
          <h2 className="font-semibold">Thang Bloom — bậc tư duy của từng câu</h2>
          <p className="text-xs text-muted-foreground">
            {bloomManual.toLocaleString("vi-VN")} câu đã duyệt tay · {bloomUnset.toLocaleString("vi-VN")} câu chưa gắn (lần chạy tới sẽ gắn)
          </p>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full min-w-[620px] text-sm">
            <thead>
              <tr className="text-left text-xs uppercase text-muted-foreground">
                <th className="py-2 pr-3">Part</th>
                {BLOOM_LEVELS.filter((l) => l.id <= 5).map((l) => (
                  <th key={l.id} className="py-2 pr-3">
                    {l.id}. {l.nameVi}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {coverage.parts.map((p) => (
                <tr key={p.part} className="border-t border-border">
                  <td className="py-2 pr-3 font-medium">{PART_META[p.part].shortLabel}</td>
                  {BLOOM_LEVELS.filter((l) => l.id <= 5).map((l) => {
                    const n = bloomOf(p.part, l.id);
                    return (
                      <td key={l.id} className={n ? "py-2 pr-3 tabular-nums" : "py-2 pr-3 text-muted-foreground"}>
                        {n ? `${n.toLocaleString("vi-VN")} (${pct(n, p.total)})` : "—"}
                      </td>
                    );
                  })}
                </tr>
              ))}
              <tr className="border-t border-border font-semibold">
                <td className="py-2 pr-3">Tổng</td>
                {BLOOM_LEVELS.filter((l) => l.id <= 5).map((l) => (
                  <td key={l.id} className="py-2 pr-3 tabular-nums">
                    {bloomTotal(l.id).toLocaleString("vi-VN")}
                  </td>
                ))}
              </tr>
            </tbody>
          </table>
        </div>
        <div className="mt-4 border-t border-border pt-3">
          <p className="mb-2 text-xs font-semibold">
            Mã bẫy của đáp án sai: {pct(trapped, wrongOptions)} đã xác định ({trapped.toLocaleString("vi-VN")}/{wrongOptions.toLocaleString("vi-VN")})
          </p>
          <ul className="flex flex-wrap gap-2 text-xs">
            {coverage.traps
              .filter((t) => t.trap)
              .sort((a, b) => b.count - a.count)
              .map((t) => (
                <li key={t.trap} className="rounded-full bg-muted px-2.5 py-1" title={TRAP_TYPES[t.trap as TrapType]?.description}>
                  {TRAP_TYPES[t.trap as TrapType]?.nameVi ?? t.trap}: <b className="tabular-nums">{t.count.toLocaleString("vi-VN")}</b>
                </li>
              ))}
          </ul>
        </div>
        <p className="mt-3 text-xs text-muted-foreground">
          Bậc do luật gắn tự động theo nhãn của câu (src/lib/bloom/classify.ts). Mở một câu và chọn “Bậc tư duy” để duyệt tay — bậc đã duyệt không bao giờ bị ghi đè.
        </p>
      </section>

      <div className="grid gap-5 lg:grid-cols-2">
        <section className="rounded-2xl border border-border bg-card p-5">
          <h2 className="mb-3 font-semibold">Nhãn chiến lược / dạng câu</h2>
          <ul className="flex flex-col gap-1.5 text-sm">
            {labels.map((l) => (
              <li key={l.slug} className="flex items-center justify-between gap-3">
                <span className="min-w-0">
                  <span className="block truncate">{l.title}</span>
                  <span className="text-[11px] text-muted-foreground">{l.category}</span>
                </span>
                <span className="shrink-0 font-semibold tabular-nums">{(labelCount.get(l.slug) ?? 0).toLocaleString("vi-VN")}</span>
              </li>
            ))}
          </ul>
        </section>
        <div className="flex flex-col gap-5">
          <section className="rounded-2xl border border-border bg-card p-5">
            <h2 className="mb-3 font-semibold">Chủ điểm ngữ pháp</h2>
            <ul className="grid grid-cols-1 gap-1.5 text-sm sm:grid-cols-2">
              {topics.map((t) => (
                <li key={t.slug} className="flex items-center justify-between gap-3">
                  <span className="truncate">{t.title}</span>
                  <span className="font-semibold tabular-nums">{(topicCount.get(t.slug) ?? 0).toLocaleString("vi-VN")}</span>
                </li>
              ))}
            </ul>
          </section>
          <section className="rounded-2xl border border-border bg-card p-5">
            <h2 className="mb-3 font-semibold">Độ khó</h2>
            <ul className="flex flex-col gap-2 text-sm">
              {(["EASY", "MEDIUM", "HARD"] as const).map((lv) => {
                const n = coverage.difficulty.find((d) => d.level === lv)?.count ?? 0;
                return (
                  <li key={lv} className="flex items-center justify-between gap-3">
                    <span>{lv === "EASY" ? "Dễ" : lv === "MEDIUM" ? "Trung bình" : "Khó"}</span>
                    <span className="flex items-center gap-3">
                      <Bar value={n} total={diffTotal} />
                      <span className="w-14 text-right tabular-nums">{n.toLocaleString("vi-VN")}</span>
                    </span>
                  </li>
                );
              })}
            </ul>
          </section>
        </div>
      </div>
    </div>
  );
}
