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
  HelpCircle,
  Pause,
  Play,
  Plus,
  Settings2,
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
import { Switch } from "@/components/ui/switch";
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

/** "What's new" walkthrough of the panel: shown once per account to everyone
 * (existing learners too) the first time they open it after this update. */
const GUIDE_DONE_KEY = "tour_sound-player_done";
const guideKey = (account?: string) => (account ? `${GUIDE_DONE_KEY}:${account.toLowerCase()}` : GUIDE_DONE_KEY);
type GuideSection = "focus" | "nature" | "youtube" | "settings";
const GUIDE: { section: GuideSection; title: string; text: string }[] = [
  { section: "focus", title: "Tiếng ồn tập trung", text: "Bật tiếng ồn Trắng, Hồng hoặc Nâu để che tạp âm xung quanh — rê chuột lên từng nút để xem công dụng." },
  { section: "nature", title: "Âm thanh thiên nhiên", text: "Bật cùng lúc nhiều âm (mưa + lửa trại…) để tạo không gian riêng, kéo thanh bên dưới để chỉnh âm lượng chung." },
  { section: "youtube", title: "Nhạc YouTube", text: "Gõ tên bài hoặc dán link. Nhạc vẫn chạy khi bạn chuyển trang và tự tạm dừng khi bài nghe TOEIC phát." },
  { section: "settings", title: "Tự phát khi vào web", text: "Bật công tắc này để lần sau mở web, âm thanh và bài nhạc bạn dùng gần nhất tự phát lại — khỏi phải chọn lại." },
];

const FULL_ORDER = GUIDE.map((_, i) => i);
const SETTINGS_FIRST = [GUIDE.findIndex((g) => g.section === "settings"), ...FULL_ORDER.filter((i) => GUIDE[i].section !== "settings")];

function readGuideDone(account?: string) {
  try {
    return localStorage.getItem(guideKey(account)) === "true";
  } catch {
    return true;
  }
}

/** The walkthrough card under the highlighted section. */
function GuideCallout({ order, step, onNext, onSkip }: { order: number[]; step: number; onNext: () => void; onSkip: () => void }) {
  const g = GUIDE[order[step]];
  const last = step === order.length - 1;
  return (
    <div className="relative mt-2.5 rounded-xl bg-primary p-3 text-primary-foreground shadow-lg">
      <span className="absolute -top-1.5 left-6 size-3 rotate-45 bg-primary" aria-hidden />
      <p className="flex items-center gap-1.5 text-[10px] font-semibold tracking-wider uppercase">
        {step === 0 && <span className="rounded-full bg-primary-foreground px-1.5 py-px text-primary">Mới cập nhật</span>}
        <span className="opacity-80">
          Hướng dẫn · {step + 1}/{order.length}
        </span>
      </p>
      <p className="mt-0.5 text-sm font-bold">{g.title}</p>
      <p className="mt-1 text-xs leading-relaxed opacity-95">{g.text}</p>
      <div className="mt-2.5 flex items-center justify-end gap-2">
        {!last && (
          <button type="button" onClick={onSkip} className="rounded-full px-2.5 py-1 text-xs font-medium opacity-80 hover:opacity-100">
            Bỏ qua
          </button>
        )}
        <button type="button" onClick={onNext} className="rounded-full bg-primary-foreground px-3 py-1 text-xs font-bold text-primary shadow-sm">
          {last ? "Đã hiểu" : "Tiếp"}
        </button>
      </div>
    </div>
  );
}

export function SoundPlayerPopover({ accountKey }: { accountKey?: string }) {
  const masterVolume = useAmbientStore((s) => s.masterVolume);
  const setMasterVolume = useAmbientStore((s) => s.setMasterVolume);
  const playlist = useAmbientStore((s) => s.playlist);
  const currentIndex = useAmbientStore((s) => s.currentIndex);
  const setCurrentIndex = useAmbientStore((s) => s.setCurrentIndex);
  const addTrack = useAmbientStore((s) => s.addTrack);
  const removeTrack = useAmbientStore((s) => s.removeTrack);
  const autoPlay = useAmbientStore((s) => s.autoPlay);
  const setAutoPlay = useAmbientStore((s) => s.setAutoPlay);
  const lastAmbientIds = useAmbientStore((s) => s.lastAmbientIds);
  const setLastAmbientIds = useAmbientStore((s) => s.setLastAmbientIds);
  const [showSettings, setShowSettings] = React.useState(false);
  const [guideStep, setGuideStep] = React.useState<number | null>(null);
  /** GUIDE indexes in the order shown — existing learners get the new
   * setting first (they know the rest). */
  const [guideOrder, setGuideOrder] = React.useState<number[]>(FULL_ORDER);
  const guideSection = guideStep === null ? null : GUIDE[guideOrder[guideStep]].section;
  /** Drives the "new" dot on the header icon until the guide has been seen. */
  const [guideSeen, setGuideSeen] = React.useState(true);
  React.useEffect(() => {
    // localStorage is only readable after mount.
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setGuideSeen(readGuideDone(accountKey));
  }, [accountKey]);

  const { activeIds, toggle, setVolume } = useAmbientSounds(masterVolume);

  const ytContainerRef = React.useRef<HTMLDivElement>(null);
  const yt = useYouTubePlayer(ytContainerRef);
  const loadedIdRef = React.useRef<string | null>(null);

  const [urlInput, setUrlInput] = React.useState("");
  const [adding, setAdding] = React.useState(false);
  const [results, setResults] = React.useState<YouTubeSearchResult[] | null>(null);
  const seededDefaultRef = React.useRef(false);

  const currentTrack = playlist[currentIndex] ?? null;
  /** Set once the learner picks a track in this page load (search, link,
   * prev/next). Until then, the track on screen is the one remembered from
   * last visit — the persisted playlist only hydrates after the first
   * render, so "what was there on mount" can't tell them apart. */
  const pickedRef = React.useRef(false);

  // Load whichever track is "current" into the player whenever it changes
  // (new track added, prev/next pressed) — but only once the player is
  // ready and only when the id actually differs, so re-renders don't
  // restart playback from 0.
  React.useEffect(() => {
    if (!yt.ready || !currentTrack) return;
    if (loadedIdRef.current === currentTrack.id) return;
    const restoring = loadedIdRef.current === null && !pickedRef.current;
    loadedIdRef.current = currentTrack.id;
    // The track remembered from last visit only starts by itself when the
    // learner turned auto-play on; otherwise it just sits ready.
    if (restoring && !useAmbientStore.getState().autoPlay) yt.cueVideo(currentTrack.id);
    else yt.loadVideo(currentTrack.id);
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

  // Remember which sounds are on, for auto-play — but not the ducking
  // above switching them off for a moment.
  const seenActiveRef = React.useRef(false);
  React.useEffect(() => {
    // Skip the empty list on mount, or it would wipe what auto-play restores.
    if (!seenActiveRef.current) {
      seenActiveRef.current = true;
      return;
    }
    if (duckedRef.current) return;
    setLastAmbientIds(activeIds);
  }, [activeIds, setLastAmbientIds]);

  const ytRef = React.useRef(yt);
  React.useEffect(() => {
    ytRef.current = yt;
  });

  // Auto-play: browsers only allow sound after the visitor interacts, so the
  // remembered sounds and track start on the first tap or keypress.
  const startedRef = React.useRef(false);
  React.useEffect(() => {
    if (!useAmbientStore.getState().autoPlay) return;
    const start = () => {
      if (startedRef.current) return;
      startedRef.current = true;
      remove();
      if (useListeningAudioStore.getState().playingCount > 0) return;
      useAmbientStore.getState().lastAmbientIds.forEach((id) => toggle(id));
      ytRef.current.play();
    };
    const remove = () => {
      window.removeEventListener("pointerdown", start, true);
      window.removeEventListener("keydown", start, true);
    };
    window.addEventListener("pointerdown", start, true);
    window.addEventListener("keydown", start, true);
    return remove;
    // eslint-disable-next-line react-hooks/exhaustive-deps -- once per page load
  }, []);

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
      pickedRef.current = true;
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
    pickedRef.current = true;
    addTrack({ id: r.id, url: `https://www.youtube.com/watch?v=${r.id}`, title: r.title, thumbnailUrl: r.thumbnailUrl });
    // Picking the track that is already loaded means "play it now".
    if (loadedIdRef.current === r.id) yt.play();
  }

  // Seed the default track the first time the panel is opened with an empty
  // playlist — pasting a different link still replaces/adds to it normally
  // afterward. Triggered by the click that opens the panel (a real user
  // gesture), not on page load, so nothing plays without the user's action.
  function handleOpenChange(open: boolean) {
    // Someone who has opened the panel before already has a playlist (the
    // default track is added on the first open).
    if (open && !readGuideDone(accountKey)) startGuide(useAmbientStore.getState().playlist.length > 0 ? SETTINGS_FIRST : FULL_ORDER);
    if (!open && guideStep !== null) finishGuide();
    if (!open || seededDefaultRef.current || playlist.length > 0) return;
    seededDefaultRef.current = true;
    addTrackFromUrl(DEFAULT_YOUTUBE_URL).catch(() => {
      seededDefaultRef.current = false;
    });
  }

  function finishGuide() {
    setGuideStep(null);
    setGuideSeen(true);
    try {
      localStorage.setItem(guideKey(accountKey), "true");
    } catch {
      // storage unavailable — the guide just shows again next time
    }
  }
  function startGuide(order: number[]) {
    setGuideOrder(order);
    setGuideStep(0);
    setShowSettings(GUIDE[order[0]].section === "settings");
  }
  function nextGuide() {
    if (guideStep === null) return;
    const next = guideStep + 1;
    if (next >= guideOrder.length) return finishGuide();
    setGuideStep(next);
    if (GUIDE[guideOrder[next]].section === "settings") setShowSettings(true);
  }
  const highlight = (section: GuideSection) => guideSection === section && "rounded-xl ring-2 ring-primary ring-offset-4 ring-offset-popover";
  const callout = (section: GuideSection) => guideSection === section && guideStep !== null && <GuideCallout order={guideOrder} step={guideStep} onNext={nextGuide} onSkip={finishGuide} />;
  const autoPlaySummary = [
    ...lastAmbientIds.map((id) => [...FOCUS_NOISES, ...AMBIENT_SOUNDS].find((x) => x.id === id)?.label).filter(Boolean),
    ...(currentTrack ? [currentTrack.title] : []),
  ].join(" · ");

  function playPrev() {
    if (playlist.length === 0) return;
    pickedRef.current = true;
    setCurrentIndex((currentIndex - 1 + playlist.length) % playlist.length);
  }
  function playNext() {
    if (playlist.length === 0) return;
    pickedRef.current = true;
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
          <Button type="button" variant="ghost" size="icon" className="relative rounded-full" aria-label="Âm thanh nền">
            <AudioLines className="size-4" />
            {!guideSeen && <span className="absolute top-1.5 right-1.5 size-2 rounded-full bg-primary ring-2 ring-background" aria-hidden />}
          </Button>
        </PopoverTrigger>
        <PopoverContent align="end" className="max-h-[calc(100dvh-5rem)] w-[22rem] overflow-y-auto rounded-2xl border-border/70 bg-popover/95 p-4 text-popover-foreground shadow-xl backdrop-blur-xl">
        <div className="-mt-1 mb-2.5 flex items-center justify-between gap-2">
          <p className="text-sm font-bold">Âm thanh học tập</p>
          <div className="flex items-center gap-0.5">
            <button
              type="button"
              onClick={() => startGuide(FULL_ORDER)}
              className="flex size-7 items-center justify-center rounded-full text-muted-foreground hover:bg-muted hover:text-foreground"
              title="Xem hướng dẫn"
              aria-label="Xem hướng dẫn"
            >
              <HelpCircle className="size-4" />
            </button>
            <button
              type="button"
              onClick={() => setShowSettings((v) => !v)}
              className={cn(
                "flex size-7 items-center justify-center rounded-full text-muted-foreground hover:bg-muted hover:text-foreground",
                (showSettings || guideSection === "settings") && "bg-primary/15 text-primary"
              )}
              title="Cài đặt"
              aria-label="Cài đặt âm thanh"
              aria-expanded={showSettings}
            >
              <Settings2 className="size-4" />
            </button>
          </div>
        </div>

        {showSettings && (
          <div className={cn("mb-3.5", highlight("settings"))}>
            <div className="rounded-xl border border-border/70 bg-muted/40 p-3">
              <label className="flex cursor-pointer items-start justify-between gap-3">
                <span>
                  <span className="block text-xs font-semibold">Tự phát khi vào web</span>
                  <span className="mt-0.5 block text-[11px] leading-snug text-muted-foreground">Âm thanh và bài nhạc bạn dùng gần nhất tự phát lại mỗi lần mở web.</span>
                </span>
                <Switch checked={autoPlay} onCheckedChange={setAutoPlay} className="mt-0.5" aria-label="Tự phát khi vào web" />
              </label>
              {autoPlay && (
                <div className="mt-2.5 border-t border-border/70 pt-2.5 text-[11px] leading-snug text-muted-foreground">
                  <p>
                    <span className="font-semibold text-foreground">Sẽ phát: </span>
                    {autoPlaySummary || "chưa có — hãy bật một âm thanh hoặc thêm bài nhạc."}
                  </p>
                  <p className="mt-1">Trình duyệt chỉ cho phát âm thanh sau khi bạn tương tác, nên nhạc bắt đầu ở lần chạm hoặc nhấn phím đầu tiên.</p>
                </div>
              )}
            </div>
            {callout("settings")}
          </div>
        )}

        <div className={cn(highlight("focus"))}>
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

        </div>
        {callout("focus")}

        <div className={cn("mt-3.5", highlight("nature"))}>
        <p className="text-[11px] font-semibold tracking-wider text-muted-foreground">THIÊN NHIÊN</p>
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
        </div>
        {callout("nature")}

        <div className="mt-4 border-t border-border/70 pt-3.5">
          <div className={cn(highlight("youtube"))}>
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
          {callout("youtube")}
        </div>
        </PopoverContent>
      </Popover>
    </>
  );
}
