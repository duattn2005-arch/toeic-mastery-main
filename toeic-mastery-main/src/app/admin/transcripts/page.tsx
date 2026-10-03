import type { Metadata } from "next";
import { TRANSCRIPT_AUDIO_PARTS, TRANSCRIPT_SETS } from "@/lib/content/transcripts";
import { getTranscriptAudioMap } from "@/lib/data/transcripts";
import { TranscriptAudioSlot } from "@/components/admin/transcript-audio-slot";

export const metadata: Metadata = { title: "Transcript nghe" };

const PART_LABELS: Record<number, string> = { 0: "Cả đề", 1: "Part 1", 2: "Part 2", 3: "Part 3", 4: "Part 4" };

export default async function AdminTranscriptsPage() {
  const audioMaps = await Promise.all(TRANSCRIPT_SETS.map((set) => getTranscriptAudioMap(set.key)));

  return (
    <div className="flex flex-col gap-8">
      <div>
        <h1 className="text-2xl font-semibold tracking-tight">Transcript nghe</h1>
        <p className="mt-1 text-sm text-muted-foreground">
          Tải file nghe cho từng đề: một file cho cả đề, hoặc riêng từng Part. Khi học viên làm một Part, web phát file của Part đó nếu có, nếu không thì phát
          file cả đề. MP3/WAV/OGG/M4A/AAC, tối đa 55MB mỗi file.
        </p>
      </div>

      {TRANSCRIPT_SETS.map((set, setIndex) => (
        <section key={set.key} className="flex flex-col gap-4">
          <h2 className="text-sm font-semibold text-muted-foreground">{set.title.toUpperCase()}</h2>
          <div className="grid gap-4 lg:grid-cols-2">
            {set.tests.map((test) => {
              const audio = audioMaps[setIndex][test.number] ?? {};
              return (
                <div key={test.number} className="flex flex-col gap-3 rounded-2xl border border-border bg-card p-5 shadow-soft">
                  <div className="flex items-center justify-between">
                    <h3 className="text-base font-semibold">Test {test.number}</h3>
                    <span className="text-xs text-muted-foreground">{Object.keys(audio).length}/5 file</span>
                  </div>
                  {TRANSCRIPT_AUDIO_PARTS.map((part) => (
                    <TranscriptAudioSlot
                      key={part}
                      setKey={set.key}
                      testNumber={test.number}
                      part={part}
                      label={PART_LABELS[part]}
                      initialUrl={audio[part] ?? null}
                    />
                  ))}
                </div>
              );
            })}
          </div>
        </section>
      ))}
    </div>
  );
}
