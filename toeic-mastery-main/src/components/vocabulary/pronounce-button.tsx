"use client";

import { Volume2 } from "lucide-react";
import { cn } from "@/lib/utils";
import { pronounce } from "@/lib/pronounce";

/** Speaker button for one word — recorded audio if any, else browser TTS. */
export function PronounceButton({ term, audioUrl, className }: { term: string; audioUrl?: string | null; className?: string }) {
  return (
    <button
      type="button"
      onClick={(e) => {
        e.stopPropagation();
        pronounce(term, audioUrl);
      }}
      aria-label={`Phát âm ${term}`}
      className={cn("inline-flex size-8 shrink-0 items-center justify-center rounded-full text-primary transition-colors hover:bg-primary/10", className)}
    >
      <Volume2 className="size-4" />
    </button>
  );
}
