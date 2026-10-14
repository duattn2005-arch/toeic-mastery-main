"use client";

import { useQuery } from "@tanstack/react-query";
import type { DictionaryApiResult } from "@/lib/types/dictionary";
import { trackEvent } from "@/lib/analytics";

async function fetchWord(word: string): Promise<DictionaryApiResult> {
  const res = await fetch(`/api/dictionary/${encodeURIComponent(word)}`);
  if (!res.ok) {
    const body = (await res.json().catch(() => ({}))) as { error?: string };
    // "LIMIT_REACHED" is a sentinel the UI checks for verbatim to show an
    // upgrade prompt instead of a generic "not found" message — see
    // dictionary-popup-content.tsx and word-detail-view.tsx.
    if (body.error === "LIMIT_REACHED") trackEvent("dictionary_limit_reached", { search_term: word });
    throw new Error(body.error ?? "Không tìm thấy từ này");
  }
  trackEvent("dictionary_lookup", { search_term: word });
  return res.json() as Promise<DictionaryApiResult>;
}

export function useDictionaryLookup(word: string | null) {
  return useQuery({
    queryKey: ["dictionary", word?.toLowerCase() ?? null],
    queryFn: () => fetchWord(word as string),
    enabled: !!word,
    staleTime: 1000 * 60 * 60 * 24,
    gcTime: 1000 * 60 * 60 * 24,
    retry: false,
  });
}
