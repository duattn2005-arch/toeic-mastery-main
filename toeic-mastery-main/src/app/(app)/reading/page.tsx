import type { Metadata } from "next";
import { requireUser, isPro } from "@/lib/auth";
import { getSkillHubData } from "@/lib/data/skill-hub";
import { SkillHubView } from "@/components/skills/skill-hub-view";
import { ReadingTour } from "@/components/reading/reading-tour";

export const metadata: Metadata = { title: "Reading" };

export default async function ReadingPage() {
  const profile = await requireUser();
  const pro = isPro(profile);
  const items = await getSkillHubData(profile.id, "READING", pro);

  return (
    <>
      <SkillHubView
        title="Reading"
        subtitle="Luyện đọc theo từng Part — Incomplete Sentences, Text Completion, Reading Comprehension."
        items={items}
        basePath="reading"
        pro={pro}
      />
      <ReadingTour />
    </>
  );
}
