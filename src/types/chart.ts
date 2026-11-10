export type ChartTone = 'chart-1' | 'chart-2' | 'chart-3' | 'chart-4';

export type DonutSlice = {
  id: string;
  label: string;
  value: number;
  tone: ChartTone;
};

export const toneClasses: Record<ChartTone, { stroke: string; bg: string }> = {
  'chart-1': { stroke: 'stroke-chart-1', bg: 'bg-chart-1' },
  'chart-2': { stroke: 'stroke-chart-2', bg: 'bg-chart-2' },
  'chart-3': { stroke: 'stroke-chart-3', bg: 'bg-chart-3' },
  'chart-4': { stroke: 'stroke-chart-4', bg: 'bg-chart-4' },
};