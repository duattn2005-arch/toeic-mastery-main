import Link from "next/link";
import { BookText } from "lucide-react";
import { IIG_TOPICS } from "@/lib/content/iig-vocab";

/** Grid of IIG Vocab topic cards — one card per topic,
 *  linking to /vocabulary/iig/[slug] for the detail/study page. */
export function IigVocabGrid() {
  return (
    <div className="flex flex-col gap-4">
      <p className="text-xs text-muted-foreground">
        Từ vựng IIG theo 9 chủ đề thực tế — mỗi chủ đề gồm danh sách từ có phiên âm, nghĩa, ví dụ, ghi chú phân biệt và bài tập trắc nghiệm.
      </p>
      <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
        {IIG_TOPICS.map((topic, index) => (
          <Link
            key={topic.slug}
            href={`/vocabulary/iig/${topic.slug}`}
            className="group flex flex-col gap-3 rounded-2xl border border-border bg-card p-4 shadow-soft transition-colors hover:border-primary/40"
          >
            <span className="flex size-10 items-center justify-center rounded-xl bg-accent text-accent-foreground">
              <BookText className="size-5" />
            </span>
            <div>
              <p className="text-xs font-bold text-primary">#{index + 1}</p>
              <p className="text-sm font-semibold">{topic.title}</p>
              <p className="mt-0.5 text-xs text-muted-foreground">{topic.titleVi}</p>
              <p className="mt-1 text-xs text-muted-foreground">{topic.words.length} từ · {topic.quiz.length} câu hỏi</p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
