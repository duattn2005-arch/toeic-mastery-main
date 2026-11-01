import Link from "next/link";
import { Crown } from "lucide-react";
import { SkillRadar } from "@/components/shared/skill-radar";
import type { PartAccuracy } from "@/lib/services/recommendation";

/** Made-up shape behind the blur. Free accounts get this instead of their own
 * numbers, because blurring real data would still send it to the browser. */
const SAMPLE: PartAccuracy[] = [
  { part: "PART1", accuracy: 0.8, attempted: 0 },
  { part: "PART2", accuracy: 0.55, attempted: 0 },
  { part: "PART3", accuracy: 0.65, attempted: 0 },
  { part: "PART4", accuracy: 0.45, attempted: 0 },
  { part: "PART5", accuracy: 0.7, attempted: 0 },
  { part: "PART6", accuracy: 0.5, attempted: 0 },
  { part: "PART7", accuracy: 0.6, attempted: 0 },
];

export function ProLockedRadar({ height }: { height?: number }) {
  return (
    <div className="relative">
      <div className="pointer-events-none opacity-30 blur-[3px]" aria-hidden>
        <SkillRadar data={SAMPLE} height={height} />
      </div>
      <div className="absolute inset-0 flex flex-col items-center justify-center gap-3 text-center">
        <Crown className="size-6 text-primary" />
        <p className="text-base font-bold">Radar kỹ năng dành cho gói Pro</p>
        <p className="max-w-[34ch] text-sm text-muted-foreground">Nâng cấp để xem bạn mạnh, yếu ở Part nào và nên luyện gì tiếp theo.</p>
        <Link
          href="/pricing"
          className="mt-1 inline-flex h-10 items-center rounded-full bg-primary px-5 text-sm font-semibold text-primary-foreground transition-colors duration-300 hover:bg-[var(--primary-hover)]"
        >
          Nâng cấp Pro
        </Link>
      </div>
    </div>
  );
}
