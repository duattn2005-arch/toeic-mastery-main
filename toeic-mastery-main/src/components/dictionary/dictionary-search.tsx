"use client";

import * as React from "react";
import { useRouter } from "next/navigation";
import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { trackEvent } from "@/lib/analytics";

/** `compact` is the small corner box on "Đã lưu"; the default is the big
 * search on /dictionary. */
export function DictionarySearch({ defaultValue = "", compact = false }: { defaultValue?: string; compact?: boolean }) {
  const [value, setValue] = React.useState(defaultValue);
  const router = useRouter();

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const trimmed = value.trim();
    if (!trimmed) return;
    trackEvent("search", { search_term: trimmed, search_type: "dictionary" });
    router.push(`/dictionary/${encodeURIComponent(trimmed)}`);
  }

  if (compact) {
    return (
      <form onSubmit={handleSubmit} role="search" className="relative w-full sm:w-72">
        <Search className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
        <Input
          value={value}
          onChange={(e) => setValue(e.target.value)}
          placeholder="Tra từ điển…"
          aria-label="Tra từ điển"
          className="h-10 rounded-xl pl-9 text-sm"
        />
      </form>
    );
  }

  return (
    <form onSubmit={handleSubmit} data-tour="dictionary-search" className="flex gap-2">
      <div className="relative flex-1">
        <Search className="pointer-events-none absolute left-4 top-1/2 size-5 -translate-y-1/2 text-muted-foreground" />
        <Input
          value={value}
          onChange={(e) => setValue(e.target.value)}
          placeholder="Nhập từ tiếng Anh cần tra, ví dụ: negotiation..."
          className="h-14 rounded-2xl pl-12 text-base"
        />
      </div>
      <Button type="submit" size="lg" className="h-14 rounded-2xl px-6">
        Tra cứu
      </Button>
    </form>
  );
}
