"use client";

import * as React from "react";
import { Award, BookOpenCheck, School, GraduationCap, Layers, Link2, Trophy } from "lucide-react";
import { cn } from "@/lib/utils";
import { CATEGORY_ORDER, TopicGrid, groupTopicsByCategory, type VocabularyTopicRow } from "@/components/vocabulary/topic-section-grid";
import { PathOverviewContent } from "@/components/vocabulary/path/path-overview-content";
import { CollectionGrid } from "@/components/vocabulary/collection-grid";
import type { CollectionSummary } from "@/lib/content/vocab-collections";
import type { getVocabularyPathOverview } from "@/lib/data/vocabulary-path";

type PathOverview = Awaited<ReturnType<typeof getVocabularyPathOverview>>;

const PATH_TAB = "20-ngay";
const COLLECTION_TAB_PREFIX = "collection:";

const COLLECTION_ICONS: Record<string, React.ComponentType<{ className?: string }>> = {
  iig: GraduationCap,
  "ets-2026": Award,
  thpt: School,
};

const CATEGORY_ICONS: Record<string, React.ComponentType<{ className?: string }>> = {
  [CATEGORY_ORDER[1]]: Trophy,
  [CATEGORY_ORDER[3]]: Link2,
};

/** Topic categories that no longer get their own tab ("Theo chủ đề",
 * "Theo Part"). Their topic pages still exist at /vocabulary/topic/[slug]. */
const HIDDEN_CATEGORY_TABS = new Set([CATEGORY_ORDER[0], CATEGORY_ORDER[2]]);

/** Pill-style horizontal tab bar switching between the 20-day path and each
 * topic category — the 20-day path is the default/first tab. Data for every
 * tab is fetched once server-side and handed down; switching tabs is a pure
 * client-side state flip, no navigation or re-fetch. */
export function VocabularyTabs({
  topics,
  pathOverview,
  collections,
}: {
  topics: VocabularyTopicRow[];
  pathOverview: PathOverview;
  /** Static word collections (IIG Vocab, ETS 2026) — one tab each. */
  collections: CollectionSummary[];
}) {
  const { sections, orderedKeys } = groupTopicsByCategory(topics);
  const [activeTab, setActiveTab] = React.useState<string>(PATH_TAB);

  const tabs = [
    { key: PATH_TAB, label: "Từ vựng 20 ngày", icon: BookOpenCheck },
    ...orderedKeys
      .filter((key) => !HIDDEN_CATEGORY_TABS.has(key))
      .map((key) => ({ key, label: key, icon: CATEGORY_ICONS[key] ?? Layers })),
    ...collections.map((c) => ({ key: COLLECTION_TAB_PREFIX + c.key, label: c.label, icon: COLLECTION_ICONS[c.key] ?? GraduationCap })),
  ];

  const activeCollection = collections.find((c) => COLLECTION_TAB_PREFIX + c.key === activeTab);

  return (
    <div className="flex flex-col gap-6">
      <div data-tour="vocabulary-tabs" className="flex gap-1 overflow-x-auto rounded-full bg-card p-1 shadow-soft">
        {tabs.map(({ key, label, icon: Icon }) => (
          <button
            key={key}
            type="button"
            onClick={() => setActiveTab(key)}
            className={cn(
              "flex shrink-0 items-center gap-1.5 rounded-full px-4 py-2 text-sm font-medium transition-colors",
              activeTab === key ? "bg-primary text-primary-foreground shadow-soft" : "text-muted-foreground hover:bg-accent/60 hover:text-foreground"
            )}
          >
            <Icon className="size-4" />
            {label}
          </button>
        ))}
      </div>

      {activeTab === PATH_TAB ? (
        <PathOverviewContent data={pathOverview} />
      ) : activeCollection ? (
        <CollectionGrid key={activeCollection.key} collection={activeCollection} />
      ) : (
        <TopicGrid topics={sections.get(activeTab) ?? []} />
      )}
    </div>
  );
}
