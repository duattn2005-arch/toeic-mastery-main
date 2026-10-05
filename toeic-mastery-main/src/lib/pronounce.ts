/** Browser-only word pronunciation in a British (UK) accent, like a UK
 * dictionary: the word's recorded audio when it has one, otherwise the best
 * British English text-to-speech voice the device offers — so every word
 * can always be heard, even ones (most collection words) with no audio file. */
export function pronounce(term: string, audioUrl?: string | null) {
  if (typeof window === "undefined") return;
  if (audioUrl) {
    new Audio(audioUrl).play().catch(() => speak(term));
    return;
  }
  speak(term);
}

/** Natural-sounding British voices by name (macOS/iOS, Chrome, Edge/Windows,
 * Android), best first. */
const PREFERRED_UK_VOICES = [/Daniel/i, /Serena/i, /Kate/i, /Arthur/i, /Oliver/i, /Martha/i, /Stephanie/i, /Google UK English/i, /Sonia/i, /Libby/i, /Ryan/i, /Maisie/i, /Thomas/i, /Hazel/i, /George/i, /Susan/i];

function voiceScore(v: SpeechSynthesisVoice) {
  let score = 0;
  if (v.lang === "en-GB" || v.lang === "en_GB") score += 100;
  else if (v.lang.toLowerCase().startsWith("en")) score += 10;
  else return -1;
  if (/premium|enhanced|natural|neural/i.test(v.name)) score += 20;
  const rank = PREFERRED_UK_VOICES.findIndex((re) => re.test(v.name));
  if (rank >= 0) score += 15 - rank * 0.5;
  return score;
}

let chosenVoice: SpeechSynthesisVoice | null = null;

function pickVoice(synth: SpeechSynthesis) {
  if (chosenVoice) return chosenVoice;
  const best = synth
    .getVoices()
    .map((v) => ({ v, s: voiceScore(v) }))
    .filter((x) => x.s >= 0)
    .sort((a, b) => b.s - a.s)[0]?.v;
  if (best) chosenVoice = best;
  return best ?? null;
}

if (typeof window !== "undefined" && window.speechSynthesis) {
  // Chrome loads its voice list asynchronously; pick again once it's in.
  window.speechSynthesis.addEventListener?.("voiceschanged", () => {
    chosenVoice = null;
  });
}

function speak(term: string) {
  const synth = window.speechSynthesis;
  if (!synth) return;
  const utterance = new SpeechSynthesisUtterance(term);
  utterance.lang = "en-GB";
  utterance.rate = 0.9;
  const voice = pickVoice(synth);
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
