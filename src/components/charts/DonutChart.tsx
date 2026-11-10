import { toneClasses, type DonutSlice } from '@/types/chart';

const SIZE = 112;
const STROKE = 16;
const RADIUS = (SIZE - STROKE) / 2;          // 48, so the outer edge is 56
const CIRCUMFERENCE = 2 * Math.PI * RADIUS;

type DonutChartProps = {
  slices: DonutSlice[];
  currency: string;
  centerLabel?: string;   // default 'per month'
};

export function DonutChart({ slices, currency, centerLabel = 'per month' }: DonutChartProps) {
  const total = slices.reduce((sum, s) => sum + s.value, 0);
  const percent = (value: number) => (total > 0 ? Math.round((value / total) * 100) : 0);

  const summary = slices.map((s) => `${s.label} ${percent(s.value)}%`).join(', ');

  // Each slice starts where the previous one ended
  let offset = 0;
  const arcs = slices.map((s) => {
    const length = total > 0 ? (s.value / total) * CIRCUMFERENCE : 0;
    const arc = { slice: s, length, offset };
    offset += length;
    return arc;
  });

  return (
    <div className="flex items-center gap-5">
      <div className="relative size-28 shrink-0">
        <svg
          viewBox={`0 0 ${SIZE} ${SIZE}`}
          role="img"
          aria-label={total > 0 ? `Spending by category: ${summary}` : 'No spending yet'}
          className="-rotate-90"
        >
          {/* Track, shown when there's nothing to draw */}
          <circle
            cx={SIZE / 2}
            cy={SIZE / 2}
            r={RADIUS}
            fill="none"
            strokeWidth={STROKE}
            className="stroke-border"
          />

          {arcs.map(({ slice, length, offset }) => (
            <circle
              key={slice.id}
              cx={SIZE / 2}
              cy={SIZE / 2}
              r={RADIUS}
              fill="none"
              strokeWidth={STROKE}
              strokeDasharray={`${length} ${CIRCUMFERENCE - length}`}
              strokeDashoffset={-offset}
              className={toneClasses[slice.tone].stroke}
            />
          ))}
        </svg>

        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <span className="text-body font-semibold tabular-nums text-fg">
            {total > 0 ? `${currency}${total.toFixed(2)}` : '—'}
          </span>
          <span className="text-micro text-fg-muted">{centerLabel}</span>
        </div>
      </div>

      <ul className="flex min-w-0 flex-1 flex-col gap-2">
        {slices.map((s) => (
          <li key={s.id} className="flex items-center gap-2 text-label">
            <span aria-hidden="true" className={`size-2 shrink-0 rounded-full ${toneClasses[s.tone].bg}`} />
            <span className="truncate text-fg">{s.label}</span>
            <span className="ml-auto tabular-nums text-fg-muted">{percent(s.value)}%</span>
          </li>
        ))}
      </ul>
    </div>
  );
}