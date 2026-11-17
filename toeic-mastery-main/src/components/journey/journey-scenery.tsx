import type { CSSProperties } from "react";

/**
 * Hand-drawn scenery for the journey map. Every fill is a --jm-* token
 * (globals.css .journey-scene), so the meadow follows light/dark and the
 * site theme. Pure decoration: aria-hidden, no pointer events.
 */

type Decor = { className?: string; style?: CSSProperties };

export function PineTree({ className, style }: Decor) {
  return (
    <svg viewBox="0 0 40 60" aria-hidden className={className} style={style}>
      <rect x="18" y="46" width="4" height="12" rx="1" fill="var(--jm-trunk)" />
      <path d="M20 22 2 48h36Z" fill="var(--jm-tree)" />
      <path d="M20 12 5 35h30Z" fill="var(--jm-tree)" />
      <path d="M20 3 8 23h24Z" fill="var(--jm-tree)" />
      <path d="M20 22 2 48h18Z M20 12 5 35h15Z M20 3 8 23h12Z" fill="var(--jm-tree-light)" opacity="0.55" />
    </svg>
  );
}

export function RoundTree({ className, style }: Decor) {
  return (
    <svg viewBox="0 0 50 60" aria-hidden className={className} style={style}>
      <rect x="23" y="36" width="4" height="22" rx="1.5" fill="var(--jm-trunk)" />
      <circle cx="25" cy="24" r="17" fill="var(--jm-tree)" />
      <circle cx="35" cy="30" r="10" fill="var(--jm-tree)" />
      <circle cx="18" cy="19" r="10" fill="var(--jm-tree-light)" opacity="0.7" />
      <circle cx="14" cy="31" r="7" fill="var(--jm-tree)" />
    </svg>
  );
}

export function Bush({ className, style }: Decor) {
  return (
    <svg viewBox="0 0 44 22" aria-hidden className={className} style={style}>
      <circle cx="11" cy="15" r="8" fill="var(--jm-bush)" />
      <circle cx="23" cy="11" r="11" fill="var(--jm-bush)" />
      <circle cx="34" cy="15" r="8" fill="var(--jm-bush)" />
      <circle cx="19" cy="8" r="4" fill="var(--jm-tree-light)" opacity="0.6" />
      <rect x="2" y="17" width="40" height="5" rx="2.5" fill="var(--jm-bush)" />
    </svg>
  );
}

export function Rock({ className, style }: Decor) {
  return (
    <svg viewBox="0 0 34 18" aria-hidden className={className} style={style}>
      <path d="M3 17c-2-6 3-12 11-13 9-1 17 3 18 9 .3 2-1 4-3 4Z" fill="var(--jm-rock)" />
      <path d="M8 9c2-3 6-4 10-4" stroke="var(--jm-rock-light)" strokeWidth="2.2" strokeLinecap="round" fill="none" />
    </svg>
  );
}

export function GrassTuft({ className, style }: Decor) {
  return (
    <svg viewBox="0 0 22 12" aria-hidden className={className} style={style}>
      <path d="M4 12C4 7 2 4 1 2M9 12c0-5 1-8 3-11M14 12c0-4 2-6 5-8" stroke="var(--jm-tree-light)" strokeWidth="2" strokeLinecap="round" fill="none" />
    </svg>
  );
}

export function Flowers({ className, style }: Decor) {
  return (
    <svg viewBox="0 0 26 12" aria-hidden className={className} style={style}>
      <circle cx="4" cy="7" r="2.4" fill="#fff" opacity="0.85" />
      <circle cx="13" cy="4" r="2.4" fill="var(--jm-flower)" />
      <circle cx="21" cy="8" r="2.4" fill="#fff" opacity="0.85" />
      <circle cx="13" cy="4" r="0.9" fill="var(--jm-trunk)" />
    </svg>
  );
}

export function Cottage({ className, style }: Decor) {
  return (
    <svg viewBox="0 0 60 52" aria-hidden className={className} style={style}>
      <rect x="11" y="24" width="38" height="25" rx="2" fill="var(--jm-wall)" />
      <path d="M5 27 30 7l25 20Z" fill="var(--jm-roof)" />
      <path d="M5 27 30 7v6L9 30Z" fill="#000" opacity="0.12" />
      <rect x="40" y="9" width="5" height="10" fill="var(--jm-roof)" />
      <rect x="25" y="34" width="10" height="15" rx="1.5" fill="var(--jm-trunk)" />
      <rect x="15" y="31" width="7" height="7" rx="1" fill="var(--jm-flower)" opacity="0.85" />
      <rect x="39" y="31" width="7" height="7" rx="1" fill="var(--jm-flower)" opacity="0.85" />
    </svg>
  );
}

/** The "rương ôn tập": a wooden chest with gold fittings. Fixed palette on
 * purpose — it's an object in the scene, like the art in a game map — and
 * the caller greys it out (CSS filter) while it's locked. `open` lifts the
 * lid for a passed checkpoint. */
export function ReviewChest({ open = false, className, style }: Decor & { open?: boolean }) {
  return (
    <svg viewBox="0 0 64 60" aria-hidden className={className} style={style}>
      <ellipse cx="32" cy="56" rx="26" ry="3.5" fill="#000" opacity="0.15" />
      <rect x="6" y="27" width="52" height="27" rx="4" fill="#b8763d" />
      <rect x="6" y="27" width="52" height="6" fill="#9a5f2c" />
      <rect x="6" y="27" width="6" height="27" rx="2" fill="#e2b04a" />
      <rect x="52" y="27" width="6" height="27" rx="2" fill="#e2b04a" />
      <rect x="27" y="31" width="10" height="13" rx="2.5" fill="#f2c95c" />
      <circle cx="32" cy="36.5" r="1.8" fill="#6b3f17" />
      <rect x="31.2" y="37" width="1.6" height="4" rx="0.8" fill="#6b3f17" />
      <g transform={open ? "translate(0 -9) rotate(-8 6 26)" : undefined}>
        <path d="M6 27v-8C6 10 18 5 32 5s26 5 26 14v8Z" fill="#cb8a4c" />
        <path d="M6 27v-8C6 10 18 5 32 5v22Z" fill="#fff" opacity="0.1" />
        <path d="M6 19C6 10 12 6 12 6v21H6Z M58 19c0-9-6-13-6-13v21h6Z" fill="#e2b04a" />
      </g>
      {open && (
        <g fill="#ffe08a">
          <path d="M32 0l1.6 4.4L38 6l-4.4 1.6L32 12l-1.6-4.4L26 6l4.4-1.6Z" />
          <circle cx="18" cy="9" r="1.6" />
          <circle cx="47" cy="7" r="1.6" />
        </g>
      )}
    </svg>
  );
}

/** Decor for one stage block. `free` is the side of the banner band the
 * banner leaves empty — trees / the cottage go there, the rest is small
 * grass and flowers along the bottom, between the stops. Deterministic per
 * stage so the map doesn't reshuffle on every render. */
export function StageScenery({ stage, free }: { stage: number; free: "left" | "right" }) {
  const at = (pct: number) => (free === "right" ? { right: `${pct}%` } : { left: `${pct}%` });
  const variant = stage % 3;
  return (
    <div aria-hidden className="pointer-events-none absolute inset-0 overflow-hidden">
      {/* Banner band, on the side the banner leaves free (sm+ only: on a
          phone the banner spans the whole width). */}
      <div className="hidden sm:block">
        {variant === 1 ? (
          <>
            <Cottage className="absolute top-3 w-[64px]" style={at(9)} />
            <Bush className="absolute top-[58px] w-[46px]" style={at(3)} />
            <PineTree className="absolute top-1 w-[30px]" style={at(19)} />
          </>
        ) : variant === 2 ? (
          <>
            <RoundTree className="absolute top-1 w-[54px]" style={at(8)} />
            <PineTree className="absolute top-5 w-[34px]" style={at(17)} />
            <Rock className="absolute top-[66px] w-[30px]" style={at(4)} />
          </>
        ) : (
          <>
            <PineTree className="absolute top-0 w-[40px]" style={at(6)} />
            <PineTree className="absolute top-7 w-[30px]" style={at(13)} />
            <RoundTree className="absolute top-2 w-[44px]" style={at(19)} />
            <Flowers className="absolute top-[70px] w-[26px]" style={at(4)} />
          </>
        )}
      </div>

      {/* Row band: in the gaps between stops (stop centres sit at 16.4% /
          33.2% / 50% / 66.8% / 83.6% on sm+), clear of the labels. */}
      <div className="hidden sm:block">
        <GrassTuft className="absolute bottom-6 left-[24.8%] w-[20px] -translate-x-1/2" />
        <Flowers className="absolute bottom-7 left-[41.6%] w-[22px] -translate-x-1/2" />
        <GrassTuft className="absolute bottom-6 left-[58.4%] w-[18px] -translate-x-1/2" />
        {stage % 2 === 1 && <Rock className="absolute bottom-6 left-[75.2%] w-[22px] -translate-x-1/2" />}
      </div>
    </div>
  );
}
