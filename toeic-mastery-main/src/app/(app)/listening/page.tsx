import type { Metadata } from "next";
import { ETS_2026_TRANSCRIPTS } from "@/lib/content/transcripts";
import { BLANK_PATTERN } from "@/lib/content/transcripts/types";
import { requireUser } from "@/lib/auth";
import { getSkillHubData } from "@/lib/data/skill-hub";
import { getSiteThemeId } from "@/lib/data/site-theme";
import { SkillHubView } from "@/components/skills/skill-hub-view";
import { ListeningHubTour } from "@/components/listening/listening-hub-tour";
import { TranscriptMasteryBanner } from "@/components/listening/transcript-banner";

export const metadata: Metadata = { title: "Listening" };

/** Questions and fill-in blanks across the whole set, for the banner. */
function transcriptStats() {
  let questions = 0;
  let blanks = 0;
  for (const test of ETS_2026_TRANSCRIPTS.tests) {
    for (const part of test.parts) {
      for (const group of part.groups) {
        // Part 3/4 groups are a conversation/talk with three questions.
        questions += part.part >= 3 ? 3 : 1;
        for (const line of group.lines) blanks += line.text.match(BLANK_PATTERN)?.length ?? 0;
      }
    }
  }
  return { questions, blanks };
}

export default async function ListeningPage() {
  const profile = await requireUser();
  const [items, siteThemeId] = await Promise.all([getSkillHubData(profile.id, "LISTENING"), getSiteThemeId(profile.id)]);
  const stats = transcriptStats();

  return (
    <>
      <SkillHubView
        title="Listening"
        subtitle="Luyện nghe theo từng Part — Photographs, Question-Response, Conversations, Talks."
        items={items}
        basePath="listening"
        banner={
          <TranscriptMasteryBanner
            href={`/listening/transcripts/${ETS_2026_TRANSCRIPTS.key}`}
            title={ETS_2026_TRANSCRIPTS.title}
            testCount={ETS_2026_TRANSCRIPTS.tests.length}
            questionCount={stats.questions}
            blankCount={stats.blanks}
            themeId={siteThemeId}
          />
        }
      />
      <ListeningHubTour />
    </>
  );
}
