import {
  EVALUATE_MAX_RIGHT_TO_WRONG_SHARE,
  MASTERY_THRESHOLD,
  MIN_ATTEMPTS_PER_CELL,
  MIN_ATTEMPTS_PER_LEVEL,
  MIN_TIMED_SHARE,
  MOCK_STABILITY_MAX_SPREAD,
  MOCK_STABILITY_MIN_TESTS,
  TIMED_EVIDENCE_FROM_LEVEL,
  WEAK_THRESHOLD,
  type ScoredBloomLevel,
} from "./config";
import { impliedByHigher, isMastered, type BloomProfile, type CellResult } from "./engine";
import type { BloomLabelRow } from "./bank";

/** Rounds down, so a 79.6% score never reads as the 80% it hasn't reached. */
export const scorePct = (x: number) => `${Math.floor(x * 100 + 1e-9)}%`;
const pct = (x: number) => `${Math.round(x * 100)}%`;

export interface LevelRequirement {
  label: string;
  detail: string;
  ok: boolean;
}

export interface LevelTask {
  row: BloomLabelRow;
  cell: CellResult | null;
  state: "red" | "yellow" | "insufficient" | "untried";
  /** What this label still needs, in one sentence. */
  need: string;
  /** Level the practice set really serves: it is clamped to the label's frontier. */
  practiceLevel: ScoredBloomLevel;
  /** A lower level of this label isn't solid yet, so this level can't be served. */
  blockedBy: ScoredBloomLevel | null;
  /** Score is enough but timed evidence is short: PRACTICE attempts can't fix it. */
  needsTimed: boolean;
}

export interface LevelRoadmap {
  level: ScoredBloomLevel;
  requirements: LevelRequirement[];
  tasks: LevelTask[];
  solid: { row: BloomLabelRow; cell: CellResult }[];
  evidence: { trapHits: number; flips: number; hinted: number; noiseRemoved: number };
}

const STATE_ORDER: Record<LevelTask["state"], number> = { red: 0, yellow: 1, insufficient: 2, untried: 3 };

function needOf(cell: CellResult | null): Pick<LevelTask, "state" | "need" | "needsTimed"> {
  if (!cell) return { state: "untried", need: "Chưa làm câu nào ở bậc này.", needsTimed: false };
  if (cell.status === "insufficient") {
    const left = MIN_ATTEMPTS_PER_CELL - cell.attempts;
    return { state: "insufficient", need: `Làm thêm ${left} câu (đã có ${cell.attempts}/${MIN_ATTEMPTS_PER_CELL}) để được chấm.`, needsTimed: false };
  }
  if (cell.status === "red") {
    return { state: "red", need: `Đang hổng ở ${scorePct(cell.score)}: cần vượt ${pct(WEAK_THRESHOLD)} để hết chặn bậc, mục tiêu ${pct(MASTERY_THRESHOLD)}.`, needsTimed: false };
  }
  if (cell.cappedReason) {
    return { state: "yellow", need: `Đủ điểm nhưng mới có ${pct(cell.timedShare)} câu làm có tính giờ, cần ${pct(MIN_TIMED_SHARE)}.`, needsTimed: true };
  }
  const gap = Math.max(1, Math.ceil((MASTERY_THRESHOLD - cell.score) * 100));
  return { state: "yellow", need: `Còn thiếu ${gap}% để vững (đang ${scorePct(cell.score)}, cần ${pct(MASTERY_THRESHOLD)}).`, needsTimed: false };
}

function requirementsOf(level: ScoredBloomLevel, profile: BloomProfile): LevelRequirement[] {
  const m = profile.levels[level];
  if (m.inferredFrom !== null) {
    return [{ label: `Suy ra từ Bậc ${m.inferredFrom} đã vững`, detail: `Bậc này mới có ${m.scoredAttempts} câu, chưa đủ ${MIN_ATTEMPTS_PER_LEVEL} câu để chấm riêng`, ok: true }];
  }
  const out: LevelRequirement[] = [
    {
      label: `Có ít nhất ${MIN_ATTEMPTS_PER_LEVEL} câu ở bậc này`,
      detail: `Đã có ${m.scoredAttempts} câu được tính`,
      ok: m.score !== null,
    },
    {
      label: `Điểm bậc đạt từ ${pct(MASTERY_THRESHOLD)}`,
      detail: m.score === null ? "Chưa tính được điểm bậc" : `Hiện tại ${scorePct(m.score)}`,
      ok: m.score !== null && m.score >= MASTERY_THRESHOLD,
    },
    {
      label: `Không còn nhãn Hổng (dưới ${pct(WEAK_THRESHOLD)})`,
      detail: m.cells.red ? `Còn ${m.cells.red} nhãn đang hổng` : "Không có nhãn nào hổng",
      ok: m.cells.red === 0,
    },
  ];
  if (level >= TIMED_EVIDENCE_FROM_LEVEL) {
    out.push({
      label: `Ít nhất ${pct(MIN_TIMED_SHARE)} câu làm có tính giờ`,
      detail: m.score === null ? "Tính khi bậc đủ số câu" : `Hiện tại ${pct(m.timedShare)}. Bài Luyện tập không được tính, hãy làm đề Thi thử`,
      ok: m.score === null || m.timedShare >= MIN_TIMED_SHARE,
    });
  }
  if (level === 5) {
    const b = profile.behavior;
    out.push(
      {
        label: `Đổi đáp án đúng thành sai không quá ${pct(EVALUATE_MAX_RIGHT_TO_WRONG_SHARE)}`,
        detail: `Hiện tại ${pct(b.rightToWrongShare)} câu bậc 4–5 (${b.rightToWrong} lần)`,
        ok: b.decisionOk,
      },
      {
        label: `Điểm Mock test chênh không quá ${pct(MOCK_STABILITY_MAX_SPREAD)}`,
        detail: b.mockSpread === null ? `Cần ${MOCK_STABILITY_MIN_TESTS} Mock test để đo, hiện chưa tính vào điều kiện` : `Hiện tại chênh ${pct(b.mockSpread)}`,
        ok: b.stabilityOk !== false,
      }
    );
  }
  return out;
}

/** Everything one Bloom level needs before it counts as solid, worst blocker first. */
export function levelRoadmap(level: ScoredBloomLevel, profile: BloomProfile, rows: BloomLabelRow[]): LevelRoadmap {
  const tasks: LevelTask[] = [];
  const solid: LevelRoadmap["solid"] = [];
  const cells: CellResult[] = [];

  for (const row of rows) {
    const cell = profile.heatmap[row.label]?.[level] ?? null;
    if (cell) cells.push(cell);
    if (isMastered(cell ?? undefined)) {
      solid.push({ row, cell: cell! });
      continue;
    }
    if (!row.available.includes(level)) continue;
    // Never tried, but a solid level above implies it: nothing to do here.
    if (!cell && impliedByHigher(profile.heatmap[row.label], level)) continue;
    const practiceLevel = row.frontier.level ?? level;
    tasks.push({ row, cell, ...needOf(cell), practiceLevel, blockedBy: practiceLevel < level ? practiceLevel : null });
  }

  tasks.sort((a, b) => {
    if ((a.blockedBy === null) !== (b.blockedBy === null)) return a.blockedBy === null ? -1 : 1;
    const byState = STATE_ORDER[a.state] - STATE_ORDER[b.state];
    if (byState) return byState;
    // Red: the deepest gap first. Yellow: closest to solid first. Grey: fewest questions left first.
    if (a.state === "red") return a.cell!.score - b.cell!.score;
    if (a.state === "yellow") return b.cell!.score - a.cell!.score;
    return (b.cell?.attempts ?? 0) - (a.cell?.attempts ?? 0);
  });

  return {
    level,
    requirements: requirementsOf(level, profile),
    tasks,
    solid,
    evidence: {
      trapHits: cells.reduce((s, c) => s + c.trapHits, 0),
      flips: cells.reduce((s, c) => s + c.flips, 0),
      hinted: cells.reduce((s, c) => s + c.hinted, 0),
      noiseRemoved: cells.reduce((s, c) => s + c.noiseRemoved, 0),
    },
  };
}
