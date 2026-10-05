/** Browser-only word pronunciation: the word's recorded audio when it has
 * one, otherwise the browser's English text-to-speech — so every word can
 * always be heard, even ones (most collection words) with no audio file. */
export function pronounce(term: string, audioUrl?: string | null) {
  if (typeof window === "undefined") return;
  if (audioUrl) {
    new Audio(audioUrl).play().catch(() => speak(term));
    return;
  }
  speak(term);
}

function speak(term: string) {
  const synth = window.speechSynthesis;
  if (!synth) return;
  const utterance = new SpeechSynthesisUtterance(term);
  utterance.lang = "en-US";
  utterance.rate = 0.9;
  const voices = synth.getVoices();
  const voice = voices.find((v) => v.lang === "en-US" && v.localService) ?? voices.find((v) => v.lang === "en-US") ?? voices.find((v) => v.lang.startsWith("en"));
  if (voice) utterance.voice = voice;
  synth.cancel();
  synth.speak(utterance);
}

/** "/ə'fɔːd/" or "əˈfɔːd" -> "/əˈfɔːd/" — collection data stores IPA with or
 * without its slashes. */
export function formatIpa(ipa: string | null | undefined) {
  const bare = ipa?.replace(/\//g, "").trim();
  return bare ? `/${bare}/` : null;
}
