import { toneClasses, type DonutSlice } from './chart';
import { formatMoney } from '@/lib/format';
import { arcPath } from './donut-path';

const SIZE = 112;
const STROKE = 16;
const RADIUS = (SIZE - STROKE) / 2; // 48, so the outer edge is 56
const TWO_PI = Math.PI * 2;

function segmentsFor(start: number, end: number): [number, number][] {
  if (end - start >= TWO_PI - 1e-9) {
    const middle = start + Math.PI;
    return [
      [start, middle],
      [middle, end],
    ];
  }
  return [[start, end]];
}

type DonutChartProps = {
  slices: DonutSlice[];
  currency: string;
  centerLabel?: string; // default 'per month'
};

export function DonutChart({
  slices,
  currency,
  centerLabel = 'per month',
}: DonutChartProps) {
  const total = slices.reduce((sum, s) => sum + s.value, 0);
  const percent = (value: number) =>
    total > 0 ? Math.round((value / total) * 100) : 0;

  const summaryParts: string[] = [];
  for (const slice of slices) {
    summaryParts.push(`${slice.label} ${percent(slice.value)}%`);
  }
  const summary = summaryParts.join(', ');

  let angle = -Math.PI / 2; // start at the top
  const arcs: { slice: DonutSlice; start: number; end: number }[] = [];
  for (const slice of slices) {
    const start = angle;
    const sliceAngle = total > 0 ? (slice.value / total) * TWO_PI : 0;
    angle += sliceAngle;

    if (angle > start) {
      arcs.push({ slice, start, end: angle });
    }
  }

  return (
    <div className="flex items-center gap-5">
      <div className="relative size-28 shrink-0">
        <svg
          viewBox={`0 0 ${SIZE} ${SIZE}`}
          role="img"
          aria-label={
            total > 0 ? `Spending by category: ${summary}` : 'No spending yet'
          }
        >
          <circle
            cx={SIZE / 2}
            cy={SIZE / 2}
            r={RADIUS}
            fill="none"
            strokeWidth={STROKE}
            className="stroke-border"
          />

          {arcs.flatMap(({ slice, start, end }) =>
            segmentsFor(start, end).map(([from, to], index) => (
              <path
                key={`${slice.id}-${index}`}
                d={arcPath(from, to)}
                className={toneClasses[slice.tone].fill}
              />
            ))
          )}
        </svg>

        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <span className="text-body font-semibold tabular-nums text-fg">
            {total > 0 ? `${formatMoney(total, currency)}` : '—'}
          </span>
          <span className="text-micro text-fg-muted">{centerLabel}</span>
        </div>
      </div>

      <ul className="flex min-w-0 flex-1 flex-col gap-2">
        {slices.map((s) => (
          <li key={s.id} className="flex items-center gap-2 text-label">
            <span
              aria-hidden="true"
              className={`size-2 shrink-0 rounded-full ${toneClasses[s.tone].bg}`}
            />
            <span className="truncate text-fg">{s.label}</span>
            <span className="ml-auto tabular-nums text-fg-muted">
              {percent(s.value)}%
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
}
