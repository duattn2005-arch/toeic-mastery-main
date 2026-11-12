import type { Metadata } from "next";
import Link from "next/link";
import { getOutcomeCatalog } from "@/lib/bloom/outcome-data";
import { LEARNING_OUTCOMES, PILLAR_LABEL, TIER_NAME, domainLevelInfo } from "@/lib/bloom/outcomes";
import { DOMAIN_LABEL } from "@/lib/bloom/domains";
import { OutcomeEditor, type EditorProps } from "@/components/admin/outcome-editor";

export const metadata: Metadata = { title: "Chỉnh sửa chuẩn đầu ra" };

export default async function EditOutcomesPage() {
  const catalog = await getOutcomeCatalog();
  const defaults = new Map(LEARNING_OUTCOMES.map((o) => [o.code, o]));

  const props: EditorProps = {
    goal: catalog.goal,
    objectives: catalog.objectives.map((p) => ({ code: p.code, pillar: PILLAR_LABEL[p.pillar].nameVi, statement: p.statement })),
    outcomes: catalog.outcomes.map((o) => {
      const info = domainLevelInfo(o.domain, o.level);
      const d = defaults.get(o.code)!;
      return {
        code: o.code,
        tierName: `Cấp ${TIER_NAME[o.tier]}`,
        levelLabel: `${DOMAIN_LABEL[o.domain].nameVi} ${info?.code ?? ""} ${info?.nameVi ?? ""}`.trim(),
        audience: o.audience,
        verb: o.verb,
        content: o.content,
        degree: o.degree,
        timeBound: o.timeBound,
        objectives: [...o.objectives],
        verbs: info?.verbs ?? [],
        edited: (["audience", "verb", "content", "degree", "timeBound"] as const).some((f) => o[f] !== d[f]) || o.objectives.join() !== d.objectives.join(),
      };
    }),
  };

  return (
    <div className="flex flex-col gap-6">
      <div>
        <Link href="/admin/outcomes" className="text-xs font-medium text-muted-foreground hover:text-foreground">
          ← Chuẩn đầu ra
        </Link>
        <h1 className="mt-1 text-2xl font-semibold tracking-tight">Chỉnh sửa mục tiêu và chuẩn đầu ra</h1>
        <p className="mt-1 max-w-[80ch] text-sm text-muted-foreground">
          Sửa câu chữ theo cấu trúc A-B-C-D. Khi lưu, hệ thống chạy checklist (động từ đúng bậc Bloom, không mơ hồ, có mức độ đo được, có thời gian…) — chuẩn đầu ra nào không đạt sẽ được đánh dấu đỏ và chưa lưu gì. Cách đo (chỉ báo, nhãn câu hỏi) giữ nguyên theo hệ thống. Thay đổi hiện ngay ở Đề cương và trang Phân tích của người học.
        </p>
      </div>
      <OutcomeEditor {...props} />
    </div>
  );
}
