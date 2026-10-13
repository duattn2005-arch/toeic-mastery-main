"use client";

import { Radar, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, ResponsiveContainer, Tooltip } from "recharts";
import { PART_META } from "@/lib/constants/toeic";
import type { PartAccuracy } from "@/lib/services/recommendation";

/**
 * Radar of accuracy per Part. The radial scale fits the learner's best Part
 * (rounded up to the next 20%, never below 40%) instead of a fixed 0-100, so
 * a beginner's shape fills the chart rather than shrinking to a dot. Each
 * axis label carries the real percentage, so the stretched scale never hides
 * the actual number.
 */
export function SkillRadar({ data }: { data: PartAccuracy[] }) {
  const chartData = data.map((d) => ({
    part: PART_META[d.part].shortLabel,
    accuracy: Math.round(d.accuracy * 100),
    attempted: d.attempted,
  }));
  const best = Math.max(0, ...chartData.map((d) => d.accuracy));
  const domainMax = Math.min(100, Math.max(40, Math.ceil((best + 5) / 20) * 20));

  return (
    <ResponsiveContainer width="100%" height={340}>
      <RadarChart data={chartData} outerRadius="78%" margin={{ top: 8, right: 24, bottom: 8, left: 24 }}>
        <defs>
          <radialGradient id="skill-radar-fill" cx="50%" cy="50%" r="60%">
            <stop offset="0%" stopColor="var(--primary)" stopOpacity={0.75} />
            <stop offset="100%" stopColor="var(--primary)" stopOpacity={0.35} />
          </radialGradient>
        </defs>
        <PolarGrid stroke="var(--border)" />
        <PolarAngleAxis
          dataKey="part"
          tick={({ x, y, payload, textAnchor }) => {
            const row = chartData.find((d) => d.part === payload.value);
            return (
              <text x={x} y={y} textAnchor={textAnchor} dominantBaseline="central" fontSize={12}>
                <tspan fill="var(--muted-foreground)" fontWeight={600}>
                  {payload.value}
                </tspan>
                <tspan fill="var(--primary)" fontWeight={800} dx={5}>
                  {row?.accuracy ?? 0}%
                </tspan>
              </text>
            );
          }}
        />
        <PolarRadiusAxis angle={90} domain={[0, domainMax]} tick={false} axisLine={false} tickCount={5} />
        <Radar
          name="Độ chính xác"
          dataKey="accuracy"
          stroke="var(--primary)"
          strokeWidth={2.5}
          fill="url(#skill-radar-fill)"
          fillOpacity={1}
          dot={{ r: 3.5, fill: "var(--primary)", strokeWidth: 0 }}
          isAnimationActive
        />
        <Tooltip
          formatter={(value) => [`${value}%`, "Độ chính xác"]}
          contentStyle={{
            background: "var(--popover)",
            border: "1px solid var(--border)",
            borderRadius: 12,
            fontSize: 12,
            color: "var(--popover-foreground)",
          }}
        />
      </RadarChart>
    </ResponsiveContainer>
  );
}
