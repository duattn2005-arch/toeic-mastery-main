import type { Metadata } from "next";
import { requireUser } from "@/lib/auth";
import { CONTACT_CHANNELS } from "@/lib/constants/contact";

export const metadata: Metadata = { title: "Liên hệ" };

export default async function ContactPage() {
  await requireUser();
  return (
    <div className="flex flex-col gap-6">
      <div>
        <h1 className="text-2xl font-semibold tracking-tight">Liên hệ</h1>
        <p className="mt-1 text-sm text-muted-foreground">
          Cần hỗ trợ hoặc muốn góp ý? Liên hệ với đội ngũ TOEIC Mastery qua một trong các kênh dưới đây.
        </p>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        {CONTACT_CHANNELS.map((channel) => (
          <a
            key={channel.label}
            href={channel.href}
            target={channel.href.startsWith("http") ? "_blank" : undefined}
            rel={channel.href.startsWith("http") ? "noopener noreferrer" : undefined}
            className="flex items-start gap-4 rounded-2xl border border-border bg-card p-6 shadow-soft transition-colors hover:border-primary/40"
          >
            <span className="flex size-10 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary">
              <channel.icon className="size-5" />
            </span>
            <span className="min-w-0">
              <span className="block text-sm font-semibold">{channel.label}</span>
              <span className="block truncate text-sm text-foreground">{channel.value}</span>
              <span className="mt-1 block text-xs text-muted-foreground">{channel.description}</span>
            </span>
          </a>
        ))}
      </div>
    </div>
  );
}
