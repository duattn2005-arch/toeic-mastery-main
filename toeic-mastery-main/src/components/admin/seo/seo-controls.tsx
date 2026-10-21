"use client";

import * as React from "react";
import { useRouter } from "next/navigation";
import { Check, Copy, Loader2 } from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import type { SeoActionResult } from "@/lib/actions/admin-seo";

type Action = () => Promise<SeoActionResult>;

function report(result: SeoActionResult) {
  if (result.error) toast.error(result.error);
  else if (result.message) toast.success(result.message);
}

/** A button bound to one server action (pass `action.bind(null, id)`). */
export function SeoActionButton({
  action,
  children,
  confirm,
  variant = "outline",
  size = "sm",
}: {
  action: Action;
  children: React.ReactNode;
  confirm?: string;
  variant?: "default" | "outline" | "secondary" | "ghost" | "destructive";
  size?: "xs" | "sm" | "default";
}) {
  const [pending, start] = React.useTransition();
  return (
    <Button
      type="button"
      variant={variant}
      size={size}
      disabled={pending}
      onClick={() => {
        if (confirm && !window.confirm(confirm)) return;
        start(async () => report(await action()));
      }}
    >
      {pending && <Loader2 className="size-3.5 animate-spin" />}
      {children}
    </Button>
  );
}

/** Re-fetches the page every few seconds while background work is running,
 * so statuses move on their own (analysis / writing take minutes). */
export function SeoAutoRefresh({ active, everyMs = 5000 }: { active: boolean; everyMs?: number }) {
  const router = useRouter();
  React.useEffect(() => {
    if (!active) return;
    const id = setInterval(() => router.refresh(), everyMs);
    return () => clearInterval(id);
  }, [active, everyMs, router]);
  return active ? (
    <span className="inline-flex items-center gap-1.5 text-xs text-muted-foreground">
      <Loader2 className="size-3.5 animate-spin" /> Đang chạy nền, trang tự cập nhật…
    </span>
  ) : null;
}

export function CompetitorUrlForm({ action }: { action: (text: string) => Promise<SeoActionResult> }) {
  const [text, setText] = React.useState("");
  const [pending, start] = React.useTransition();
  return (
    <form
      className="flex flex-col gap-2"
      onSubmit={(e) => {
        e.preventDefault();
        start(async () => {
          const result = await action(text);
          report(result);
          if (!result.error) setText("");
        });
      }}
    >
      <textarea
        value={text}
        onChange={(e) => setText(e.target.value)}
        rows={5}
        placeholder={"Dán URL bài blog của đối thủ, mỗi dòng một URL\nhttps://example.com/blog/meo-lam-bai-toeic-part-7"}
        className="w-full rounded-xl border border-input bg-background px-3 py-2 font-mono text-xs"
      />
      <div>
        <Button type="submit" size="sm" disabled={pending || !text.trim()}>
          {pending && <Loader2 className="size-3.5 animate-spin" />} Thêm và phân tích
        </Button>
      </div>
    </form>
  );
}

export function TopicForms({
  generate,
  add,
}: {
  generate: (count: number) => Promise<SeoActionResult>;
  add: (primaryKeyword: string, title: string) => Promise<SeoActionResult>;
}) {
  const [count, setCount] = React.useState(5);
  const [keyword, setKeyword] = React.useState("");
  const [title, setTitle] = React.useState("");
  const [pending, start] = React.useTransition();
  const input = "rounded-lg border border-input bg-background px-3 py-1.5 text-sm";
  return (
    <div className="grid gap-4 md:grid-cols-2">
      <div className="flex flex-col gap-2">
        <p className="text-sm font-semibold">Để AI đề xuất từ dữ liệu đối thủ</p>
        <div className="flex items-center gap-2">
          <input type="number" min={1} max={15} value={count} onChange={(e) => setCount(Number(e.target.value))} className={`${input} w-20`} />
          <Button type="button" size="sm" disabled={pending} onClick={() => start(async () => report(await generate(count)))}>
            {pending && <Loader2 className="size-3.5 animate-spin" />} Đề xuất chủ đề
          </Button>
        </div>
      </div>
      <form
        className="flex flex-col gap-2"
        onSubmit={(e) => {
          e.preventDefault();
          start(async () => {
            const result = await add(keyword, title);
            report(result);
            if (!result.error) {
              setKeyword("");
              setTitle("");
            }
          });
        }}
      >
        <p className="text-sm font-semibold">Tự thêm từ khoá</p>
        <input value={keyword} onChange={(e) => setKeyword(e.target.value)} placeholder="Từ khoá chính, vd: cách luyện nghe toeic part 2" className={input} />
        <input value={title} onChange={(e) => setTitle(e.target.value)} placeholder="Tiêu đề định hướng (không bắt buộc)" className={input} />
        <div>
          <Button type="submit" size="sm" variant="outline" disabled={pending || !keyword.trim()}>
            Thêm chủ đề
          </Button>
        </div>
      </form>
    </div>
  );
}

export interface SeoSettingsValue {
  autoEnabled: boolean;
  autoPublish: boolean;
  draftsPerRun: number;
  competitorBatch: number;
  runHour: number;
}

export function SeoSettingsForm({ initial, save }: { initial: SeoSettingsValue; save: (v: SeoSettingsValue) => Promise<SeoActionResult> }) {
  const [value, setValue] = React.useState(initial);
  const [pending, start] = React.useTransition();
  const set = <K extends keyof SeoSettingsValue>(key: K, v: SeoSettingsValue[K]) => setValue((s) => ({ ...s, [key]: v }));
  const num = "w-20 rounded-lg border border-input bg-background px-2 py-1 text-sm";
  return (
    <form
      className="flex flex-col gap-3 text-sm"
      onSubmit={(e) => {
        e.preventDefault();
        start(async () => report(await save(value)));
      }}
    >
      <label className="flex items-start gap-2">
        <input type="checkbox" checked={value.autoEnabled} onChange={(e) => set("autoEnabled", e.target.checked)} className="mt-1" />
        <span>
          <strong>Bật chế độ tự động</strong> — mỗi ngày phân tích đối thủ, đề xuất chủ đề và viết bài mới.
        </span>
      </label>
      <label className="flex items-start gap-2">
        <input type="checkbox" checked={value.autoPublish} onChange={(e) => set("autoPublish", e.target.checked)} className="mt-1" />
        <span>
          <strong>Tự đăng bài</strong> đạt chuẩn (≥ 900 từ, có liên kết nội bộ, mục lục và câu hỏi thường gặp). Tắt thì bài chỉ ở dạng nháp chờ bạn duyệt.
        </span>
      </label>
      <div className="flex flex-wrap items-center gap-x-6 gap-y-2">
        <label className="flex items-center gap-2">
          Số bài mỗi ngày
          <input type="number" min={1} max={5} value={value.draftsPerRun} onChange={(e) => set("draftsPerRun", Number(e.target.value))} className={num} />
        </label>
        <label className="flex items-center gap-2">
          URL đối thủ phân tích mỗi ngày
          <input type="number" min={0} max={30} value={value.competitorBatch} onChange={(e) => set("competitorBatch", Number(e.target.value))} className={num} />
        </label>
        <label className="flex items-center gap-2">
          Chạy sau giờ (giờ VN)
          <input type="number" min={0} max={23} value={value.runHour} onChange={(e) => set("runHour", Number(e.target.value))} className={num} />
        </label>
      </div>
      <div>
        <Button type="submit" size="sm" disabled={pending}>
          {pending && <Loader2 className="size-3.5 animate-spin" />} Lưu cài đặt
        </Button>
      </div>
    </form>
  );
}

export interface PostMetaValue {
  title: string;
  seoTitle: string;
  description: string;
  slug: string;
  primaryKeyword: string;
  keywords: string;
  ctaTarget: string;
}

export function PostMetaForm({
  initial,
  ctas,
  save,
}: {
  initial: PostMetaValue;
  ctas: { key: string; label: string }[];
  save: (v: PostMetaValue) => Promise<SeoActionResult>;
}) {
  const [value, setValue] = React.useState(initial);
  const [pending, start] = React.useTransition();
  const set = (key: keyof PostMetaValue, v: string) => setValue((s) => ({ ...s, [key]: v }));
  const field = "w-full rounded-lg border border-input bg-background px-3 py-1.5 text-sm";
  const counter = (n: number, max: number) => <span className={n > max ? "text-destructive" : "text-muted-foreground"}>{n}/{max}</span>;
  return (
    <form
      className="grid gap-3 text-sm"
      onSubmit={(e) => {
        e.preventDefault();
        start(async () => report(await save(value)));
      }}
    >
      <label className="grid gap-1">
        Tiêu đề bài (H1)
        <input value={value.title} onChange={(e) => set("title", e.target.value)} className={field} />
      </label>
      <label className="grid gap-1">
        <span className="flex justify-between">Tiêu đề trên Google {counter(value.seoTitle.length, 60)}</span>
        <input value={value.seoTitle} onChange={(e) => set("seoTitle", e.target.value)} className={field} />
      </label>
      <label className="grid gap-1">
        <span className="flex justify-between">Mô tả trên Google {counter(value.description.length, 160)}</span>
        <textarea value={value.description} onChange={(e) => set("description", e.target.value)} rows={2} className={field} />
      </label>
      <div className="grid gap-3 md:grid-cols-2">
        <label className="grid gap-1">
          Đường dẫn (/blog/…)
          <input value={value.slug} onChange={(e) => set("slug", e.target.value)} className={`${field} font-mono`} />
        </label>
        <label className="grid gap-1">
          Dẫn người đọc tới
          <select value={value.ctaTarget} onChange={(e) => set("ctaTarget", e.target.value)} className={field}>
            {ctas.map((c) => (
              <option key={c.key} value={c.key}>
                {c.label}
              </option>
            ))}
          </select>
        </label>
        <label className="grid gap-1">
          Từ khoá chính
          <input value={value.primaryKeyword} onChange={(e) => set("primaryKeyword", e.target.value)} className={field} />
        </label>
        <label className="grid gap-1">
          Từ khoá phụ (cách nhau bằng dấu phẩy)
          <input value={value.keywords} onChange={(e) => set("keywords", e.target.value)} className={field} />
        </label>
      </div>
      <div>
        <Button type="submit" size="sm" disabled={pending}>
          {pending && <Loader2 className="size-3.5 animate-spin" />} Lưu thông tin
        </Button>
      </div>
    </form>
  );
}

export function PostContentEditor({ initial, save }: { initial: string; save: (json: string) => Promise<SeoActionResult> }) {
  const [text, setText] = React.useState(initial);
  const [pending, start] = React.useTransition();
  return (
    <div className="flex flex-col gap-2">
      <textarea value={text} onChange={(e) => setText(e.target.value)} rows={18} spellCheck={false} className="w-full rounded-xl border border-input bg-background p-3 font-mono text-xs" />
      <div className="flex items-center gap-2">
        <Button type="button" size="sm" disabled={pending} onClick={() => start(async () => report(await save(text)))}>
          {pending && <Loader2 className="size-3.5 animate-spin" />} Lưu nội dung
        </Button>
        <Button type="button" size="sm" variant="ghost" disabled={pending} onClick={() => setText(initial)}>
          Hoàn tác
        </Button>
      </div>
    </div>
  );
}

/** A list of short strings (ad headlines…) with a length limit and a copy button. */
export function CopyList({ title, items, max }: { title: string; items: string[]; max?: number }) {
  const [copied, setCopied] = React.useState(false);
  if (items.length === 0) return null;
  return (
    <div>
      <div className="mb-1.5 flex items-center justify-between">
        <p className="text-xs font-semibold text-muted-foreground uppercase">{title}</p>
        <Button
          type="button"
          size="xs"
          variant="ghost"
          onClick={() => {
            void navigator.clipboard.writeText(items.join("\n"));
            setCopied(true);
            setTimeout(() => setCopied(false), 1500);
          }}
        >
          {copied ? <Check className="size-3" /> : <Copy className="size-3" />} Sao chép
        </Button>
      </div>
      <ul className="flex flex-col gap-1 text-sm">
        {items.map((item) => (
          <li key={item} className="flex justify-between gap-3 rounded-lg bg-muted/50 px-3 py-1.5">
            <span>{item}</span>
            {max && <span className={item.length > max ? "text-destructive" : "text-muted-foreground"}>{item.length}</span>}
          </li>
        ))}
      </ul>
    </div>
  );
}
