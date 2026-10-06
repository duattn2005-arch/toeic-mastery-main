import type { Metadata } from "next";
import Link from "next/link";
import { Suspense } from "react";
import { ChevronLeft, ChevronRight, ClipboardList, Flame, ListX } from "lucide-react";

import { getCurrentProfile } from "@/lib/auth";
import { getPracticeTotals, getTestList, type TestListFilters } from "@/lib/data/tests";
import { getMistakeCount } from "@/lib/data/mistakes";
import { PracticeFilters } from "@/components/practice/practice-filters";
import { TestCard } from "@/components/practice/test-card";
import { TestFolderCard } from "@/components/practice/test-folder-card";
import { groupTestsIntoFolders } from "@/lib/test-folders";
import { EmptyState } from "@/components/shared/empty-state";
import { PracticeTour } from "@/components/practice/practice-tour";
import { LoginRequiredGate } from "@/components/practice/login-required-gate";

export const metadata: Metadata = { title: "Luyện đề" };

/** Real count, rounded DOWN so the claim is never overstated: 1234 → "Hơn 1k+". */
function formatPracticeCount(n: number) {
  if (n < 1000) return n.toLocaleString("vi-VN");
  const k = Math.floor(n / 100) / 10;
  return `Hơn ${k.toLocaleString("vi-VN")}k+`;
}

function PracticeHeader({ questionsPracticed, attempts }: { questionsPracticed: number; attempts: number }) {
  return (
    <div>
      <h1 className="text-2xl font-semibold tracking-tight">Luyện đề</h1>
      <p className="mt-1 text-sm text-muted-foreground">Chọn đề thi phù hợp với mục tiêu của bạn.</p>
      {questionsPracticed > 0 && (
        <p className="mt-3 inline-flex items-center gap-1.5 rounded-full bg-primary/10 px-3 py-1 text-xs font-medium text-primary">
          <Flame className="size-3.5" />
          {formatPracticeCount(questionsPracticed)} lượt luyện tập trên TOEIC Mastery
          <span className="text-primary/70">· {attempts.toLocaleString("vi-VN")} lượt làm đề</span>
        </p>
      )}
    </div>
  );
}

const VALID_CATEGORIES = new Set(["ALL", "FULL", "LISTENING", "READING", "PART1", "PART2", "PART3", "PART4", "PART5", "PART6", "PART7"]);

export default async function PracticePage({
  searchParams,
}: {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
}) {
  const profile = await getCurrentProfile();
  const params = await searchParams;

  const rawCategory = typeof params.category === "string" ? params.category : "ALL";
  const filters: TestListFilters = {
    category: VALID_CATEGORIES.has(rawCategory) ? (rawCategory as TestListFilters["category"]) : "ALL",
    difficulty: (typeof params.difficulty === "string" ? params.difficulty : undefined) as TestListFilters["difficulty"],
    completion: (typeof params.completion === "string" ? params.completion : "ALL") as TestListFilters["completion"],
    sort: (typeof params.sort === "string" ? params.sort : "NEWEST") as TestListFilters["sort"],
  };

  const totals = await getPracticeTotals();

  if (!profile) {
    return (
      <div className="flex flex-col gap-6">
        <PracticeHeader {...totals} />
        <LoginRequiredGate />
      </div>
    );
  }

  const [tests, mistakeCount] = await Promise.all([getTestList(profile.id, filters), getMistakeCount(profile.id)]);

  // Tests titled "<series> Test N" are grouped into one folder per series;
  // the list opens on the folders, and ?folder=<series> shows its tests.
  const { folders, loose } = groupTestsIntoFolders(tests);
  const openFolderName = typeof params.folder === "string" ? params.folder : null;
  const openFolder = openFolderName ? folders.find((f) => f.name === openFolderName) ?? { name: openFolderName, tests: [] } : null;

  function folderHref(name: string | null) {
    const next = new URLSearchParams();
    for (const [key, value] of Object.entries(params)) if (key !== "folder" && typeof value === "string") next.set(key, value);
    if (name) next.set("folder", name);
    const query = next.toString();
    return query ? `/practice?${query}` : "/practice";
  }

  function sum(list: typeof tests, key: "usersCompleted" | "questionsPracticed") {
    return list.reduce((acc, t) => acc + t[key], 0);
  }

  function renderTests(list: typeof tests) {
    return (
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {list.map((test) => (
          <TestCard
            key={test.id}
            title={test.title}
            difficulty={test.difficulty}
            totalQuestions={test.totalQuestions}
            durationMinutes={test.durationMinutes}
            usersCompleted={test.usersCompleted}
            questionsPracticed={test.questionsPracticed}
            bestScore={test.bestScore}
            progressPercent={test.progressPercent}
            href={test.resumeAttemptId ? `/exam/${test.resumeAttemptId}` : `/practice/${test.id}`}
            ctaLabel={test.resumeAttemptId ? "Tiếp tục" : test.isCompleted ? "Làm lại" : "Bắt đầu"}
            isPro={test.isPro}
          />
        ))}
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-6">
      <PracticeHeader {...totals} />

      {mistakeCount > 0 && (
        <Link
          href="/practice/mistakes"
          className="flex items-center justify-between rounded-2xl border border-destructive/30 bg-destructive/5 px-5 py-4 transition-colors hover:bg-destructive/10"
        >
          <div className="flex items-center gap-3">
            <span className="flex size-10 items-center justify-center rounded-xl bg-destructive/10 text-destructive">
              <ListX className="size-5" />
            </span>
            <div>
              <p className="text-sm font-semibold">Ngân hàng lỗi sai</p>
              <p className="text-xs text-muted-foreground">Bạn có {mistakeCount} câu làm sai gần nhất — luyện lại ngay.</p>
            </div>
          </div>
          <span className="text-sm font-medium text-destructive">Luyện ngay →</span>
        </Link>
      )}

      <Suspense>
        <PracticeFilters />
      </Suspense>

      {openFolder ? (
        <section className="flex flex-col gap-4">
          <div className="flex flex-wrap items-center gap-1 text-sm">
            <Link href={folderHref(null)} className="flex items-center gap-1 text-muted-foreground hover:text-foreground">
              <ChevronLeft className="size-4" /> Tất cả bộ đề
            </Link>
            <ChevronRight className="size-4 text-muted-foreground" />
            <span className="font-semibold">{openFolder.name}</span>
            <span className="text-muted-foreground">
              · {openFolder.tests.length} đề · {sum(openFolder.tests, "usersCompleted").toLocaleString("vi-VN")} lượt làm ·{" "}
              {sum(openFolder.tests, "questionsPracticed").toLocaleString("vi-VN")} câu đã luyện
            </span>
          </div>
          {openFolder.tests.length === 0 ? (
            <EmptyState icon={ClipboardList} title="Không có đề phù hợp trong bộ này" description="Hãy thử thay đổi bộ lọc." />
          ) : (
            renderTests(openFolder.tests)
          )}
        </section>
      ) : tests.length === 0 ? (
        <EmptyState icon={ClipboardList} title="Không tìm thấy đề thi phù hợp" description="Hãy thử thay đổi bộ lọc." />
      ) : (
        <>
          {folders.length > 0 && (
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {folders.map((folder) => (
                <TestFolderCard
                  key={folder.name}
                  name={folder.name}
                  href={folderHref(folder.name)}
                  total={folder.tests.length}
                  completed={folder.tests.filter((t) => t.isCompleted).length}
                  attempts={sum(folder.tests, "usersCompleted")}
                  questionsPracticed={sum(folder.tests, "questionsPracticed")}
                />
              ))}
            </div>
          )}
          {loose.length > 0 && (
            <section className="flex flex-col gap-3">
              {folders.length > 0 && <h2 className="text-sm font-semibold text-muted-foreground">ĐỀ KHÁC</h2>}
              {renderTests(loose)}
            </section>
          )}
        </>
      )}

      <PracticeTour />
    </div>
  );
}
