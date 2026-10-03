import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { requireUser } from "@/lib/auth";
import { getTranscriptSet, getTranscriptTest } from "@/lib/content/transcripts";
import { getTranscriptAudioMap } from "@/lib/data/transcripts";
import { TranscriptPractice } from "@/components/listening/transcript-practice";

type Params = Promise<{ set: string; test: string }>;

export async function generateMetadata({ params }: { params: Params }): Promise<Metadata> {
  const { set: key, test } = await params;
  const set = getTranscriptSet(key);
  return { title: set ? `${set.title} — Test ${test}` : "Transcript" };
}

export default async function TranscriptTestPage({ params }: { params: Params }) {
  const { set: key, test: testParam } = await params;
  await requireUser();
  const set = getTranscriptSet(key);
  const test = set && getTranscriptTest(set, Number(testParam));
  if (!set || !test) notFound();
  const audio = await getTranscriptAudioMap(set.key, test.number);

  return (
    <TranscriptPractice
      setKey={set.key}
      setTitle={set.title}
      test={test}
      totalTests={set.tests.length}
      audio={audio[test.number] ?? {}}
    />
  );
}
