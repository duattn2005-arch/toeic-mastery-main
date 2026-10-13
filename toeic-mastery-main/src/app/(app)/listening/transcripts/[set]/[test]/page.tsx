import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { requireUser } from "@/lib/auth";
import { getTranscriptSet, getTranscriptTest } from "@/lib/content/transcripts";
import { getTranscriptAnswerKey, getTranscriptAudioMap } from "@/lib/data/transcripts";
import { getExerciseProgress } from "@/lib/data/exercise-progress";
import { TranscriptPractice } from "@/components/listening/transcript-practice";

type Params = Promise<{ set: string; test: string }>;

export async function generateMetadata({ params }: { params: Params }): Promise<Metadata> {
  const { set: key, test } = await params;
  const set = getTranscriptSet(key);
  return { title: set ? `${set.title} — Test ${test}` : "Transcript" };
}

export default async function TranscriptTestPage({ params }: { params: Params }) {
  const { set: key, test: testParam } = await params;
  const profile = await requireUser();
  const set = getTranscriptSet(key);
  const test = set && getTranscriptTest(set, Number(testParam));
  if (!set || !test) notFound();
  const progressKey = (part: number) => `transcript:${set.key}:${test.number}:${part}`;
  const [audio, progress] = await Promise.all([
    getTranscriptAudioMap(set.key, test.number),
    getExerciseProgress(profile.id, test.parts.map((p) => progressKey(p.part))),
  ]);
  const savedParts = Object.fromEntries(test.parts.flatMap((p) => (progress[progressKey(p.part)] ? [[p.part, progress[progressKey(p.part)]]] : [])));

  return (
    <TranscriptPractice
      setKey={set.key}
      setTitle={set.title}
      test={test}
      totalTests={set.tests.length}
      audio={audio[test.number] ?? {}}
      answerKey={getTranscriptAnswerKey(set.key, test)}
      savedParts={savedParts}
    />
  );
}
