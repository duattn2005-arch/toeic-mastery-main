"use client";

import * as React from "react";
import { Trophy } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ConfettiBurst } from "@/components/shared/confetti-burst";
import { cn } from "@/lib/utils";
import { buildMatchRounds, type StudyItem } from "@/lib/services/study-game";
import type { ReviewRating } from "@/lib/services/spaced-repetition";

const WRONG_FLASH_MS = 550;

/** Click term/meaning tiles to pair them up. A wrong pair briefly flashes
 * red then un-selects; a right pair locks in place. Every word in `items`
 * is played: boards of up to 8 pairs follow one another as rounds, and the
 * game finishes when the last round's pairs are all solved. */
export function MatchingGame({
  items,
  onFinish,
  onItemResult,
}: {
  items: StudyItem[];
  onFinish: () => void;
  onItemResult?: (itemId: string, rating: ReviewRating) => void;
}) {
  const [rounds] = React.useState(() => buildMatchRounds(items));
  const [round, setRound] = React.useState(0);
  const board = rounds[round] ?? [];
  const [selected, setSelected] = React.useState<string[]>([]);
  const [wrongPair, setWrongPair] = React.useState<string[]>([]);
  const [solved, setSolved] = React.useState<Set<string>>(new Set());
  const [moves, setMoves] = React.useState(0);
  // Words involved in a wrong pairing: still "Đang học" once matched.
  const missed = React.useRef(new Set<string>());

  const roundPairs = board.length / 2;
  const solvedPairs = solved.size / 2;
  const totalPairs = items.length;
  const pairsBefore = rounds.slice(0, round).reduce((n, b) => n + b.length / 2, 0);
  const roundDone = solvedPairs === roundPairs;
  const done = roundDone && round >= rounds.length - 1;

  // Next board as soon as this one is cleared (short beat to see it lock in).
  React.useEffect(() => {
    if (!roundDone || done) return;
    const t = setTimeout(() => {
      setSolved(new Set());
      setSelected([]);
      setRound((r) => r + 1);
    }, 450);
    return () => clearTimeout(t);
  }, [roundDone, done]);

  function select(tile: (typeof board)[number]) {
    if (wrongPair.length > 0 || solved.has(tile.key) || selected.includes(tile.key)) return;

    if (selected.length === 0) {
      setSelected([tile.key]);
      return;
    }

    const firstKey = selected[0];
    const first = board.find((t) => t.key === firstKey)!;
    setMoves((m) => m + 1);

    if (first.itemId === tile.itemId) {
      setSolved((prev) => new Set(prev).add(first.key).add(tile.key));
      setSelected([]);
      onItemResult?.(first.itemId, missed.current.has(first.itemId) ? "AGAIN" : "GOOD");
    } else {
      missed.current.add(first.itemId).add(tile.itemId);
      setSelected([firstKey, tile.key]);
      setWrongPair([firstKey, tile.key]);
      setTimeout(() => {
        setWrongPair([]);
        setSelected([]);
      }, WRONG_FLASH_MS);
    }
  }

  if (done) {
    return (
      <div className="flex flex-col items-center gap-4 text-center">
        <ConfettiBurst />
        <span className="flex size-16 items-center justify-center rounded-full bg-success/10 text-success">
          <Trophy className="size-8" />
        </span>
        <div>
          <p className="text-2xl font-bold">Ghép xong {totalPairs} cặp!</p>
          <p className="mt-1 text-sm text-muted-foreground">{moves} lượt bấm</p>
        </div>
        <Button type="button" onClick={onFinish}>
          Xong
        </Button>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center gap-4">
      <p className="text-sm text-muted-foreground">
        {rounds.length > 1 && <>Vòng {round + 1}/{rounds.length} · </>}
        Đã ghép {pairsBefore + solvedPairs}/{totalPairs} cặp · {moves} lượt bấm
      </p>
      <div className="grid w-full max-w-2xl grid-cols-2 gap-2.5 sm:grid-cols-4">
        {board.map((tile) => {
          const isSolved = solved.has(tile.key);
          const isSelected = selected.includes(tile.key);
          const isWrong = wrongPair.includes(tile.key);
          return (
            <button
              key={tile.key}
              type="button"
              onClick={() => select(tile)}
              disabled={isSolved}
              className={cn(
                "flex min-h-20 items-center justify-center rounded-xl border p-3 text-center text-sm font-medium transition-all",
                isSolved && "border-success/40 bg-success/10 text-success/70 opacity-60",
                isWrong && "border-destructive bg-destructive/10 text-destructive",
                !isSolved && !isWrong && isSelected && "border-primary bg-accent",
                !isSolved && !isWrong && !isSelected && "border-border bg-card hover:border-primary/40 hover:bg-accent/40"
              )}
            >
              {tile.label}
            </button>
          );
        })}
      </div>
    </div>
  );
}
