"use client";

import * as React from "react";
import {
  AudioLines,
  AudioWaveform,
  Loader2,
  Search,
  Bird,
  CloudDrizzle,
  CloudLightning,
  CloudRainWind,
  ExternalLink,
  Flame,
  Pause,
  Play,
  Plus,
  SkipBack,
  SkipForward,
  Turtle,
  Volume2,
  Waves,
  Wind,
  X,
} from "lucide-react";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Slider } from "@/components/ui/slider";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { useAmbientSounds } from "@/hooks/use-ambient-sounds";
import { useYouTubePlayer } from "@/hooks/use-youtube-player";
import { useAmbientStore } from "@/store/ambient-store";
import { useListeningAudioStore } from "@/store/listening-audio-store";
import { extractYouTubeVideoId } from "@/lib/youtube";
import { cn } from "@/lib/utils";
import type { AmbientSoundId } from "@/lib/services/ambient-sound-engine";
import type { YouTubeSearchResult } from "@/app/api/youtube-search/route";

/** Steady broadband noise, the classic focus aids: white masks chatter,
 * pink is the balanced one studied for focus and memory, brown is deep and
 * calm. */
const FOCUS_NOISES: { id: AmbientSoundId; label: string; hint: string; dot: string }[] = [
  { id: "whiteNoise", label: "Trắng", hint: "Che tiếng ồn xung quanh", dot: "#94a3b8" },
  { id: "pinkNoise", label: "Hồng", hint: "Cân bằng, giúp tập trung và ghi nhớ", dot: "#f472b6" },
  { id: "brownNoise", label: "Nâu", hint: "Trầm ấm, thư giãn sâu", dot: "#b45309" },
];

const AMBIENT_SOUNDS: { id: AmbientSoundId; label: string; icon: typeof CloudDrizzle }[] = [
  { id: "chillRain", label: "Mưa nhẹ", icon: CloudDrizzle },
  { id: "heavyRain", label: "Mưa to", icon: CloudRainWind },
  { id: "thunder", label: "Sấm sét", icon: CloudLightning },
  { id: "wind", label: "Gió", icon: Wind },
  { id: "ocean", label: "Sóng biển", icon: Waves },
  { id: "bonfire", label: "Lửa trại", icon: Flame },
  { id: "frog", label: "Ếch kêu", icon: Turtle },
  { id: "chirp", label: "Chim hót", icon: Bird },
];

/** Shown pre-added the first time anyone opens the panel, so the YouTube
 * section is never just an empty box — paste a different link to replace
 * it, per the user's request. */
const DEFAULT_YOUTUBE_URL = "https://www.youtube.com/watch?v=9kzE8isXlQY";

export function SoundPlayerPopover() {
  const masterVolume = useAmbientStore((s) => s.masterVolume);
  const setMasterVolume = useAmbientStore((s) => s.setMasterVolume);
  const playlist = useAmbientStore((s) => s.playlist);
  const currentIndex = useAmbientStore((s) => s.currentIndex);
  const setCurrentIndex = useAmbientStore((s) => s.setCurrentIndex);
  const addTrack = useAmbientStore((s) => s.addTrack);
  const removeTrack = useAmbientStore((s) => s.removeTrack);

  const { activeIds, toggle, setVolume } = useAmbientSounds(masterVolume);

  const ytContainerRef = React.useRef<HTMLDivElement>(null);
  const yt = useYouTubePlayer(ytContainerRef);
  const loadedIdRef = React.useRef<string | null>(null);

  const [urlInput, setUrlInput] = React.useState("");
  const [adding, setAdding] = React.useState(false);
  const [results, setResults] = React.useState<YouTubeSearchResult[] | null>(null);
  const seededDefaultRef = React.useRef(false);

  const currentTrack = playlist[currentIndex] ?? null;

  // Load whichever track is "current" into the player whenever it changes
  // (new track added, prev/next pressed) — but only once the player is
  // ready and only when the id actually differs, so re-renders don't
  // restart playback from 0.
  React.useEffect(() => {
    if (!yt.ready || !currentTrack) return;
    if (loadedIdRef.current === currentTrack.id) return;
    loadedIdRef.current = currentTrack.id;
    yt.loadVideo(currentTrack.id);
    // eslint-disable-next-line react-hooks/exhaustive-deps -- yt is stable across renders
  }, [yt.ready, currentTrack?.id]);

  const listeningAudioPlaying = useListeningAudioStore((s) => s.playingCount > 0);
  const duckedRef = React.useRef<{ ambientIds: AmbientSoundId[]; ytWasPlaying: boolean } | null>(null);

  // Ducks this background-music widget while a TOEIC listening audio (Part
  // 1-4 question audio, anywhere in the app — real exams, Mistake Practice,
  // Quick Study) is actually playing, so the two never overlap, then
  // restores only what this effect itself paused — a track the learner had
  // already paused manually before starting the listening audio doesn't get
  // resumed out from under them.
  React.useEffect(() => {
    if (listeningAudioPlaying) {
      if (duckedRef.current) return;
      const ambientIds = [...activeIds];
      const ytWasPlaying = yt.isPlaying;
      duckedRef.current = { ambientIds, ytWasPlaying };
      ambientIds.forEach((id) => toggle(id));
      if (ytWasPlaying) yt.pause();
    } else {
      const snapshot = duckedRef.current;
      duckedRef.current = null;
      if (!snapshot) return;
      snapshot.ambientIds.forEach((id) => toggle(id));
      if (snapshot.ytWasPlaying) yt.play();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps -- only react to the listening-audio flag; activeIds/toggle/yt are read fresh at the moment it flips
  }, [listeningAudioPlaying]);

  function handleVolumeChange(value: number[]) {
    const v = value[0] / 100;
    setMasterVolume(v);
    setVolume(v);
    yt.setVolume(value[0]);
  }

  const addTrackFromUrl = React.useCallback(
    async (url: string): Promise<boolean> => {
      const res = await fetch(`/api/youtube-oembed?url=${encodeURIComponent(url)}`);
      const data = await res.json();
      if (!res.ok) throw new Error(data.error ?? "Không lấy được thông tin video");
      addTrack({ id: data.id, url, title: data.title, thumbnailUrl: data.thumbnailUrl });
      return true;
    },
    [addTrack]
  );

  // One box for both: a YouTube link is added straight away, anything else
  // is searched and the results are listed below to pick from.
  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const trimmed = urlInput.trim();
    if (!trimmed) return;
    setAdding(true);
    try {
      if (extractYouTubeVideoId(trimmed)) {
        await addTrackFromUrl(trimmed);
        setUrlInput("");
        setResults(null);
      } else {
        const res = await fetch(`/api/youtube-search?q=${encodeURIComponent(trimmed)}`);
        const data = await res.json();
        if (!res.ok) throw new Error(data.error ?? "Không tìm được video");
        setResults(data.results);
        if (data.results.length === 0) toast.message("Không có kết quả phù hợp");
      }
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Không thêm được video này");
    } finally {
      setAdding(false);
    }
  }

  function pickResult(r: YouTubeSearchResult) {
    addTrack({ id: r.id, url: `https://www.youtube.com/watch?v=${r.id}`, title: r.title, thumbnailUrl: r.thumbnailUrl });
    // Picking the track that is already loaded means "play it now".
    if (loadedIdRef.current === r.id) yt.play();
  }

  // Seed the default track the first time the panel is opened with an empty
  // playlist — pasting a different link still replaces/adds to it normally
  // afterward. Triggered by the click that opens the panel (a real user
  // gesture), not on page load, so nothing plays without the user's action.
  function handleOpenChange(open: boolean) {
    if (!open || seededDefaultRef.current || playlist.length > 0) return;
    seededDefaultRef.current = true;
    addTrackFromUrl(DEFAULT_YOUTUBE_URL).catch(() => {
      seededDefaultRef.current = false;
    });
  }

  function playPrev() {
    if (playlist.length === 0) return;
    setCurrentIndex((currentIndex - 1 + playlist.length) % playlist.length);
  }
  function playNext() {
    if (playlist.length === 0) return;
    setCurrentIndex((currentIndex + 1) % playlist.length);
  }
  function togglePlay() {
    if (!currentTrack) return;
    if (yt.isPlaying) yt.pause();
    else yt.play();
  }

  return (
    <>
      {/* The real YT IFrame Player, rendered outside the Popover (which
          Radix unmounts its content for while closed) and outside the
          viewport — so background playback survives closing the panel or
          navigating between pages, instead of stopping every time. Real
          pixel dimensions (not display:none/0x0) so browsers don't throttle
          it as an inactive/invisible element. */}
      <div ref={ytContainerRef} className="fixed -left-[9999px] -top-[9999px] h-[113px] w-[200px]" aria-hidden />

      <Popover onOpenChange={handleOpenChange}>
        <PopoverTrigger asChild>
          <Button type="button" variant="ghost" size="icon" className="rounded-full" aria-label="Âm thanh nền">
            <AudioLines className="size-4" />
          </Button>
        </PopoverTrigger>
        <PopoverContent align="end" className="w-[22rem] rounded-2xl border-border/70 bg-popover/95 p-4 text-popover-foreground shadow-xl backdrop-blur-xl">
        <p className="text-[11px] font-semibold tracking-wider text-muted-foreground">TIẾNG ỒN TẬP TRUNG</p>
        <div className="mt-2 grid grid-cols-3 gap-2">
          {FOCUS_NOISES.map((n) => {
            const active = activeIds.includes(n.id);
            return (
              <button
                key={n.id}
                type="button"
                title={n.hint}
                onClick={() => toggle(n.id)}
                className={cn(
                  "flex items-center gap-2 rounded-xl border px-2.5 py-2 text-left text-xs font-medium transition-colors",
                  active ? "border-primary/60 bg-primary/15 text-foreground ring-1 ring-primary/40" : "border-border/70 bg-muted/40 text-muted-foreground hover:bg-muted hover:text-foreground"
                )}
              >
                <span className="flex size-6 shrink-0 items-center justify-center rounded-full" style={{ background: `color-mix(in oklab, ${n.dot} 25%, transparent)`, color: n.dot }}>
                  <AudioWaveform className={cn("size-3.5", active && "animate-pulse")} />
                </span>
                {n.label}
              </button>
            );
          })}
        </div>

        <p className="mt-3.5 text-[11px] font-semibold tracking-wider text-muted-foreground">THIÊN NHIÊN</p>
        <div className="mt-2 grid grid-cols-4 gap-2">
          {AMBIENT_SOUNDS.map((s) => {
            const active = activeIds.includes(s.id);
            return (
              <button
                key={s.id}
                type="button"
                onClick={() => toggle(s.id)}
                className={cn(
                  "flex flex-col items-center gap-1 rounded-xl border p-2 text-center text-[10px] leading-tight transition-colors",
                  active ? "border-primary/60 bg-primary/15 text-foreground ring-1 ring-primary/40" : "border-border/70 bg-muted/40 text-muted-foreground hover:bg-muted hover:text-foreground"
                )}
              >
                <s.icon className={cn("size-4", active && "text-primary")} />
                {s.label}
              </button>
            );
          })}
        </div>

        <div className="mt-3 flex items-center gap-2">
          <Volume2 className="size-3.5 shrink-0 text-muted-foreground" />
          <Slider value={[Math.round(masterVolume * 100)]} onValueChange={handleVolumeChange} max={100} className="flex-1" />
        </div>

        <div className="mt-4 border-t border-border/70 pt-3.5">
          <p className="text-[11px] font-semibold tracking-wider text-muted-foreground">YOUTUBE</p>
          <form onSubmit={handleSubmit} className="mt-2 flex gap-1.5">
            <div className="relative flex-1">
              <Search className="pointer-events-none absolute top-1/2 left-2.5 size-3.5 -translate-y-1/2 text-muted-foreground" />
              <Input
                value={urlInput}
                onChange={(e) => setUrlInput(e.target.value)}
                placeholder="Tìm tên bài hát hoặc dán link..."
                className="h-8 border-border/70 bg-muted/40 pl-8 text-xs placeholder:text-muted-foreground"
              />
            </div>
            <Button type="submit" size="icon" className="size-8 shrink-0" disabled={adding} aria-label="Tìm hoặc thêm">
              {adding ? <Loader2 className="size-3.5 animate-spin" /> : extractYouTubeVideoId(urlInput.trim()) ? <Plus className="size-3.5" /> : <Search className="size-3.5" />}
            </Button>
          </form>

          {results && results.length > 0 && (
            <div className="mt-2 rounded-xl border border-border/70 bg-muted/30">
              <div className="flex items-center justify-between px-2.5 pt-2 pb-1">
                <span className="text-[10px] font-semibold tracking-wider text-muted-foreground">KẾT QUẢ</span>
                <button type="button" onClick={() => setResults(null)} className="text-muted-foreground hover:text-foreground" aria-label="Đóng kết quả">
                  <X className="size-3.5" />
                </button>
              </div>
              <ul className="max-h-56 overflow-y-auto p-1">
                {results.map((r) => {
                  const playing = currentTrack?.id === r.id;
                  return (
                    <li key={r.id}>
                      <button
                        type="button"
                        onClick={() => pickResult(r)}
                        className={cn("flex w-full items-center gap-2.5 rounded-lg p-1.5 text-left transition-colors hover:bg-muted", playing && "bg-primary/10")}
                      >
                        <span className="relative h-9 w-16 shrink-0 overflow-hidden rounded-md bg-black/30">
                          {/* eslint-disable-next-line @next/next/no-img-element */}
                          <img src={r.thumbnailUrl} alt="" className="size-full object-cover" />
                          {r.duration && (
                            <span className="absolute right-0.5 bottom-0.5 rounded bg-black/75 px-1 text-[9px] font-semibold text-white tabular-nums">{r.duration}</span>
                          )}
                        </span>
                        <span className="min-w-0 flex-1">
                          <span className={cn("line-clamp-2 text-[11px] leading-snug font-medium", playing && "text-primary")}>{r.title}</span>
                          <span className="block truncate text-[10px] text-muted-foreground">{r.channel}</span>
                        </span>
                        {playing ? <AudioLines className="size-3.5 shrink-0 text-primary" /> : <Play className="size-3.5 shrink-0 text-muted-foreground" />}
                      </button>
                    </li>
                  );
                })}
              </ul>
            </div>
          )}

          <div className="mt-3 flex items-center gap-2.5 rounded-xl bg-muted/40 p-2">
            <div className="flex size-11 shrink-0 items-center justify-center overflow-hidden rounded-lg bg-black/30">
              {currentTrack && (
                // eslint-disable-next-line @next/next/no-img-element
                <img src={currentTrack.thumbnailUrl} alt="" className="size-full object-cover" />
              )}
            </div>
            <div className="min-w-0 flex-1">
              {currentTrack ? (
                <>
                  <p className="truncate text-xs font-medium">{currentTrack.title}</p>
                  <p className="text-[10px] text-muted-foreground">YouTube · {playlist.length} bài</p>
                </>
              ) : (
                <p className="text-[11px] text-muted-foreground">Tìm hoặc dán link YouTube ở trên để phát nhạc nền</p>
              )}
            </div>
            {currentTrack && (
              <>
                <a href={currentTrack.url} target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-foreground" title="Mở trên YouTube">
                  <ExternalLink className="size-3.5" />
                </a>
                <button type="button" onClick={() => removeTrack(currentTrack.id)} className="text-muted-foreground hover:text-foreground" title="Xóa khỏi danh sách">
                  <X className="size-3.5" />
                </button>
              </>
            )}
          </div>

          <div className="mt-2.5 flex items-center justify-center gap-4">
            <button type="button" onClick={playPrev} disabled={playlist.length < 2} className="text-muted-foreground hover:text-foreground disabled:opacity-30">
              <SkipBack className="size-4" />
            </button>
            <button
              type="button"
              onClick={togglePlay}
              disabled={!currentTrack}
              className="flex size-9 items-center justify-center rounded-full bg-primary text-primary-foreground shadow-[0_6px_16px_-6px_var(--primary)] transition-transform hover:scale-105 disabled:opacity-30"
            >
              {yt.isPlaying ? <Pause className="size-4" /> : <Play className="size-4 translate-x-0.5" />}
            </button>
            <button type="button" onClick={playNext} disabled={playlist.length < 2} className="text-muted-foreground hover:text-foreground disabled:opacity-30">
              <SkipForward className="size-4" />
            </button>
          </div>
        </div>
        </PopoverContent>
      </Popover>
    </>
  );
}
