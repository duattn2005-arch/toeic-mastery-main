/** Browser-only word pronunciation in a British (UK) accent, like a UK
 * dictionary: the word's recorded audio when it has one, otherwise the best
 * British English text-to-speech voice the device offers — so every word
 * can always be heard, even ones (most collection words) with no audio file. */
export function pronounce(term: string, audioUrl?: string | null) {
  if (typeof window === "undefined") return;
  stopAll();
  if (audioUrl) {
    const audio = cachedAudio(audioUrl);
    audio.currentTime = 0;
    playing = audio;
    audio.play().catch(() => speak(term));
    return;
  }
  speak(term);
}

/** Recorded pronunciations are fetched once and reused, so a tap plays them
 * at once instead of waiting on the network every time. */
const audioCache = new Map<string, HTMLAudioElement>();
let playing: HTMLAudioElement | null = null;

function cachedAudio(url: string) {
  let audio = audioCache.get(url);
  if (!audio) {
    audio = new Audio(url);
    audio.preload = "auto";
    audioCache.set(url, audio);
  }
  return audio;
}

/** Cuts off whatever is still being read, so the newest tap is heard right
 * away rather than queued behind the previous word. */
function stopAll() {
  if (playing) {
    playing.pause();
    playing = null;
  }
  const synth = window.speechSynthesis;
  if (synth && (synth.speaking || synth.pending)) synth.cancel();
}

/** Warm up a round's words before they are tapped: start downloading their
 * recorded audio and pick the speech voice ahead of time. */
export function preloadPronunciations(words: { audioUrl?: string | null }[]) {
  if (typeof window === "undefined") return;
  for (const word of words) if (word.audioUrl) cachedAudio(word.audioUrl);
  if (window.speechSynthesis) pickVoice(window.speechSynthesis);
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
  synth.speak(utterance);
}

/** "/ə'fɔːd/" or "əˈfɔːd" -> "/əˈfɔːd/" — collection data stores IPA with or
 * without its slashes. */
export function formatIpa(ipa: string | null | undefined) {
  const bare = ipa?.replace(/\//g, "").trim();
  return bare ? `/${bare}/` : null;
}
