import type { Metadata } from "next";
import Link from "next/link";
import { BookA } from "lucide-react";
import { requireUser, isPro } from "@/lib/auth";
import { getBookmarks } from "@/lib/data/bookmarks";
import { BookmarksTabs } from "@/components/bookmarks/bookmarks-tabs";
import { DictionarySearch } from "@/components/dictionary/dictionary-search";

export const metadata: Metadata = { title: "Đã lưu" };

export default async function BookmarksPage() {
  const profile = await requireUser();
  const { questionBookmarks, savedWords } = await getBookmarks(profile.id);
  const categories = [...new Set(savedWords.map((w) => w.category).filter((c): c is string => !!c))].sort();

  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
        <div>
          <h1 className="text-2xl font-semibold tracking-tight">Đã lưu</h1>
          <p className="mt-1 text-sm text-muted-foreground">Từ vựng và câu hỏi bạn đã đánh dấu.</p>
        </div>
        <div className="flex flex-col gap-1.5 sm:items-end">
          <DictionarySearch compact />
          <Link href="/dictionary" className="inline-flex items-center gap-1 text-xs font-medium text-primary hover:underline">
            <BookA className="size-3.5" aria-hidden /> Mở từ điển đầy đủ
          </Link>
        </div>
      </div>

      <BookmarksTabs questionBookmarks={questionBookmarks} savedWords={savedWords} categories={categories} isPro={isPro(profile)} />
    </div>
  );
}
