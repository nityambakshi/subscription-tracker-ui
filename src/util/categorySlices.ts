// src/components/charts/categorySlices.ts
import type { SubscriptionTableRow } from '@/types/subscription-table';
import type { ChartTone, DonutSlice } from '@/types/chart';

// Fixed colours per category, so the same category always gets the same colour
const categoryTone: Record<string, ChartTone> = {
  Productivity: 'chart-1',
  Entertainment: 'chart-2',
  Utilities: 'chart-3',
};

// Monthly equivalent, so yearly plans are comparable with monthly ones
const toMonthly = (s: SubscriptionTableRow) =>
  s.cycle === 'yearly' ? Number(s.cost) / 12 : +s.cost;

export function categorySlices(subs: SubscriptionTableRow[]): DonutSlice[] {
  const totals = new Map<string, number>();
  for (const s of subs) {
    totals.set(s.category, (totals.get(s.category) ?? 0) + toMonthly(s));
  }

  return [...totals.entries()]
    .sort((a, b) => b[1] - a[1]) // largest first, as in Figma
    .map(([category, value]) => ({
      id: category,
      label: category,
      value,
      tone: categoryTone[category] ?? 'chart-4',
    }));
}
