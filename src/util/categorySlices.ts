import type { ChartTone, DonutSlice } from '@/types/chart';
import type { Subscription } from '@/types/Subscription';

const categoryTone: Record<string, ChartTone> = {
  Productivity: 'chart-1',
  Entertainment: 'chart-2',
  Utilities: 'chart-3',
};

const toMonthly = (s: Subscription) =>
  s.cycle === 'Yearly' ? Number(s.amount) / 12 : +s.amount;

export function categorySlices(subs: Subscription[]): DonutSlice[] {
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
