import * as React from "react";

/** Builds a field of tiny stars as background radial-gradients, so the sky
 * costs zero DOM nodes and never re-renders. Positions are deterministic. */
function stars(count: number, seed: number, size: number, color: string) {
  return Array.from({ length: count }, (_, i) => {
    const x = (i * 37 + seed * 13) % 100;
    const y = (i * 61 + seed * 29) % 100;
    return `radial-gradient(${size}px ${size}px at ${x}% ${y}%, ${color} 50%, transparent 51%)`;
  }).join(", ");
}

const STATIC_STARS = stars(40, 1, 1.5, "rgba(255,255,255,0.75)");
const TWINKLE_STARS = stars(14, 5, 2.5, "rgba(255,255,255,0.95)");

/** Night-sky backdrop for the study games: nebula glows, static stars and
 * one twinkling layer (a single CSS opacity animation). Memoised so the
 * per-second timer re-render of the game never touches it. */
export const GameStarfield = React.memo(function GameStarfield({ nebula }: { nebula: [string, string] }) {
  return (
    <div aria-hidden className="pointer-events-none absolute inset-0">
      <div
        className="absolute inset-0"
        style={{
          backgroundImage: `radial-gradient(55% 45% at 22% 28%, ${nebula[0]}, transparent 70%), radial-gradient(50% 45% at 80% 75%, ${nebula[1]}, transparent 70%)`,
        }}
      />
      <div className="absolute inset-0" style={{ backgroundImage: STATIC_STARS }} />
      <div className="game-twinkle absolute inset-0" style={{ backgroundImage: TWINKLE_STARS }} />
    </div>
  );
});
