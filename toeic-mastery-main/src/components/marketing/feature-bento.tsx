import type { ReactNode } from "react";
import { BarChart3, BookA, Check, ChevronRight, Clock, Headphones, Layers, Volume2 } from "lucide-react";
import { Reveal } from "@/components/marketing/reveal";
import { cn } from "@/lib/utils";

/**
 * Landing feature grid. Each cell shows a small, real preview of the feature
 * (built from plain markup, not screenshots) so a visitor sees what the
 * product does instead of reading an icon + caption.
 */
export function FeatureBento() {
  return (
    <div className="grid grid-cols-1 gap-4 md:grid-cols-12">
      <Reveal className="md:col-span-7">
        <Cell
          icon={Headphones}
          title="Đề thi thử sát thực tế"
          description="200 câu, 120 phút, giao diện như phòng thi thật. Đồng hồ không mất khi tải lại, bài làm tự lưu."
          glow="top-right"
        >
          <ExamPreview />
        </Cell>
      </Reveal>

      <Reveal delay={0.08} className="md:col-span-5">
        <Cell
          icon={BookA}
          title="Bôi đen là tra nghĩa"
          description="Gặp từ lạ ở bất kỳ đâu trên trang, bôi đen để xem nghĩa và nghe phát âm."
        >
          <DictionaryPreview />
        </Cell>
      </Reveal>

      <Reveal className="md:col-span-5">
        <Cell
          icon={Layers}
          title="Flashcard ôn đúng lúc"
          description="Thuật toán SM-2 giãn dần lịch ôn mỗi khi bạn nhớ tốt, nên ôn ít mà nhớ lâu."
        >
          <FlashcardPreview />
        </Cell>
      </Reveal>

      <Reveal delay={0.08} className="md:col-span-7">
        <Cell
          icon={BarChart3}
          title="Biết rõ mình yếu Part nào"
          description="Radar 7 Part tính từ chính bài làm của bạn, kèm gợi ý nên luyện gì tiếp theo."
          glow="bottom-left"
        >
          <RadarPreview />
        </Cell>
      </Reveal>
    </div>
  );
}

function Cell({
  icon: Icon,
  title,
  description,
  glow,
  children,
}: {
  icon: typeof Headphones;
  title: string;
  description: string;
  glow?: "top-right" | "bottom-left";
  children: ReactNode;
}) {
  return (
    <article className="group relative flex h-full flex-col overflow-hidden rounded-[2rem] border border-border/60 bg-card/95 shadow-soft transition-[border-color,box-shadow] duration-500 ease-[cubic-bezier(0.32,0.72,0,1)] hover:border-primary/30 hover:shadow-lift">
      {glow && (
        <div
          aria-hidden
          className={cn(
            "pointer-events-none absolute size-80 rounded-full bg-primary/15 blur-3xl",
            glow === "top-right" ? "-top-32 -right-24" : "-bottom-32 -left-24"
          )}
        />
      )}
      <div className="relative flex items-start gap-4 p-7 pb-0">
        <span className="flex size-11 shrink-0 items-center justify-center rounded-xl bg-accent text-accent-foreground">
          <Icon className="size-5" strokeWidth={1.75} />
        </span>
        <div>
          <h3 className="text-lg font-bold tracking-tight md:text-xl">{title}</h3>
          <p className="mt-1 max-w-[46ch] text-sm leading-relaxed text-muted-foreground">{description}</p>
        </div>
      </div>
      <div className="relative mt-6 flex flex-1 flex-col justify-end px-7 pb-7">{children}</div>
    </article>
  );
}

/** Shared inner panel: the "screen" each preview sits on. */
function Panel({ className, children }: { className?: string; children: ReactNode }) {
  return (
    <div
      className={cn(
        "rounded-2xl border border-border/60 bg-background/70 p-5 shadow-[inset_0_1px_0_rgba(255,255,255,0.04)]",
        className
      )}
    >
      {children}
    </div>
  );
}

const EXAM_OPTIONS = [
  { key: "A", text: "present", correct: true },
  { key: "B", text: "presents" },
  { key: "C", text: "presenting" },
  { key: "D", text: "presented" },
];

function ExamPreview() {
  return (
    <Panel>
      <div className="flex items-center justify-between text-xs">
        <span className="font-semibold text-muted-foreground">Part 5 · Câu 103</span>
        <span className="inline-flex items-center gap-1.5 rounded-full bg-accent px-2.5 py-1 font-semibold text-accent-foreground tabular-nums">
          <Clock className="size-3.5" strokeWidth={2} /> 118:42
        </span>
      </div>
      <p className="mt-4 text-[15px] leading-relaxed">
        The marketing team will{" "}
        <span className="inline-block min-w-16 border-b-2 border-primary text-center font-semibold text-primary">
          present
        </span>{" "}
        the survey results at Friday&apos;s meeting.
      </p>
      <div className="mt-4 grid grid-cols-2 gap-2">
        {EXAM_OPTIONS.map((option) => (
          <div
            key={option.key}
            className={cn(
              "flex items-center gap-2.5 rounded-xl border px-3 py-2.5 text-sm",
              option.correct
                ? "border-primary/50 bg-primary/10 font-semibold text-foreground"
                : "border-border/70 text-muted-foreground"
            )}
          >
            <span
              className={cn(
                "flex size-6 shrink-0 items-center justify-center rounded-lg text-xs font-bold",
                option.correct ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground"
              )}
            >
              {option.correct ? <Check className="size-3.5" strokeWidth={3} /> : option.key}
            </span>
            {option.text}
          </div>
        ))}
      </div>
    </Panel>
  );
}

function DictionaryPreview() {
  return (
    <Panel className="pb-6">
      <p className="text-[15px] leading-relaxed text-muted-foreground">
        Please send the{" "}
        <span className="rounded-md bg-primary/25 px-1 py-0.5 font-semibold text-foreground">invoice</span> to our
        accounting office before the deadline.
      </p>
      <div className="relative mt-4 ml-6 max-w-64">
        <span aria-hidden className="absolute -top-1.5 left-10 size-3 rotate-45 border-t border-l border-border/70 bg-card" />
        <div className="rounded-xl border border-border/70 bg-card p-4 shadow-lift">
          <div className="flex items-center justify-between gap-3">
            <div>
              <p className="text-base font-bold">invoice</p>
              <p className="font-[Segoe_UI,Noto_Sans,Arial,sans-serif] text-xs text-muted-foreground">/ˈɪnvɔɪs/</p>
            </div>
            <span className="flex size-8 items-center justify-center rounded-full bg-accent text-accent-foreground">
              <Volume2 className="size-4" strokeWidth={1.75} />
            </span>
          </div>
          <p className="mt-3 text-sm">
            <span className="mr-1.5 rounded-md bg-muted px-1.5 py-0.5 text-[11px] font-semibold text-muted-foreground">
              danh từ
            </span>
            hóa đơn
          </p>
        </div>
      </div>
    </Panel>
  );
}

/** Real SM-2 progression with an ease factor of 2.5: 1, 6, then ×2.5. */
const INTERVALS = ["1 ngày", "6 ngày", "15 ngày", "38 ngày"];

function FlashcardPreview() {
  return (
    <div className="flex flex-col gap-5">
      <div className="relative mx-auto h-36 w-full max-w-72">
        <div className="absolute inset-0 translate-y-3 rotate-[-4deg] rounded-2xl border border-border/50 bg-muted/60" />
        <div className="absolute inset-0 translate-y-1.5 rotate-[2.5deg] rounded-2xl border border-border/60 bg-muted" />
        <div className="absolute inset-0 flex flex-col items-center justify-center rounded-2xl border border-primary/30 bg-card shadow-lift transition-transform duration-700 ease-[cubic-bezier(0.32,0.72,0,1)] group-hover:-translate-y-1">
          <p className="text-xl font-bold">negotiate</p>
          <p className="mt-0.5 font-[Segoe_UI,Noto_Sans,Arial,sans-serif] text-xs text-muted-foreground">/nɪˈɡoʊʃieɪt/</p>
          <p className="mt-3 rounded-full bg-accent px-3 py-1 text-sm font-semibold text-accent-foreground">đàm phán</p>
        </div>
      </div>
      <div>
        <p className="mb-2 text-xs font-medium text-muted-foreground">Lịch ôn khi bạn nhớ tốt</p>
        <div className="flex flex-wrap items-center gap-1">
          {INTERVALS.map((interval, i) => (
            <span key={interval} className="flex items-center gap-1">
              <span
                className={cn(
                  "rounded-lg px-2.5 py-1 text-xs font-semibold tabular-nums",
                  i === INTERVALS.length - 1 ? "bg-primary text-primary-foreground" : "bg-muted text-foreground/80"
                )}
              >
                {interval}
              </span>
              {i < INTERVALS.length - 1 && <ChevronRight className="size-3.5 text-muted-foreground" />}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}

/** Illustrative accuracy per Part (labelled as sample data in the UI). */
const PART_ACCURACY = [85, 72, 64, 58, 79, 67, 49];
const RADAR_SIZE = 220;
const RADAR_RADIUS = 80;

function radarPoint(index: number, value: number) {
  const angle = (Math.PI * 2 * index) / PART_ACCURACY.length - Math.PI / 2;
  const r = (value / 100) * RADAR_RADIUS;
  const c = RADAR_SIZE / 2;
  return [c + Math.cos(angle) * r, c + Math.sin(angle) * r] as const;
}

function polygon(values: number[]) {
  return values.map((v, i) => radarPoint(i, v).join(",")).join(" ");
}

function RadarPreview() {
  const weakest = PART_ACCURACY.indexOf(Math.min(...PART_ACCURACY));

  return (
    <Panel className="flex flex-col items-center gap-6 sm:flex-row sm:items-center">
      <svg
        viewBox={`0 0 ${RADAR_SIZE} ${RADAR_SIZE}`}
        className="w-full max-w-56 shrink-0"
        role="img"
        aria-label="Biểu đồ radar độ chính xác 7 Part, dữ liệu minh họa"
      >
        {[25, 50, 75, 100].map((level) => (
          <polygon
            key={level}
            points={polygon(PART_ACCURACY.map(() => level))}
            fill="none"
            className="stroke-border"
            strokeWidth={1}
          />
        ))}
        {PART_ACCURACY.map((_, i) => {
          const [x, y] = radarPoint(i, 100);
          return <line key={i} x1={RADAR_SIZE / 2} y1={RADAR_SIZE / 2} x2={x} y2={y} className="stroke-border" strokeWidth={1} />;
        })}
        <polygon
          points={polygon(PART_ACCURACY)}
          className="fill-primary/20 stroke-primary"
          strokeWidth={2}
          strokeLinejoin="round"
        />
        {PART_ACCURACY.map((v, i) => {
          const [x, y] = radarPoint(i, v);
          const [lx, ly] = radarPoint(i, 122);
          return (
            <g key={i}>
              {i === weakest && <circle cx={x} cy={y} r={9} className="fill-primary/25" />}
              <circle cx={x} cy={y} r={i === weakest ? 4.5 : 3} className="fill-primary" />
              <text
                x={lx}
                y={ly}
                textAnchor="middle"
                dominantBaseline="middle"
                className={cn("text-[11px] font-semibold", i === weakest ? "fill-primary" : "fill-muted-foreground")}
              >
                P{i + 1}
              </text>
            </g>
          );
        })}
      </svg>

      <div className="w-full">
        <p className="text-xs font-medium text-muted-foreground">Cần ưu tiên</p>
        <p className="mt-1 text-2xl font-extrabold tracking-tight">Part {weakest + 1}</p>
        <p className="text-sm text-muted-foreground">Đọc hiểu đoạn văn</p>
        <p className="mt-3 text-3xl font-extrabold text-primary tabular-nums">
          {PART_ACCURACY[weakest]}%
          <span className="ml-1.5 text-sm font-medium text-muted-foreground">câu đúng</span>
        </p>
        <p className="mt-4 inline-flex items-center gap-1.5 rounded-lg bg-accent px-2.5 py-1.5 text-xs font-semibold text-accent-foreground">
          Gợi ý: luyện thêm Part {weakest + 1}
        </p>
        <p className="mt-3 text-[11px] text-muted-foreground/80">Dữ liệu minh họa</p>
      </div>
    </Panel>
  );
}
