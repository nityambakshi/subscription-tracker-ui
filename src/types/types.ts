import type { categories } from '@/constants/mock-constants';

export type NavItem = {
  id: string;
  label: string;
  to: string;
  badge?: number;
};

export type User = {
  id: string;
  name: string;
  email: string;
  avatarUrl?: string;
};

export interface DashboardDateInfo {
  greeting: string;
  day: string;
  date: string;
}

export type StatCard = {
  id: 'monthlySpend' | 'yearlyProjection' | 'active' | 'nextRenewal';
  label: string;
  value: string;
  hint: string;
  tone?: 'default' | 'positive';
};

export type Category = (typeof categories)[number];

export type Column<T> = {
  id: string;
  header: string;
  render?: (row: T) => React.ReactNode;
  align?: 'left' | 'right';
  className?: string; // optional width or extra classes
};

export type DataTableProps<T> = {
  rows: T[];
  columns: Column<T>[];
  getRowId: (row: T) => string;
  onRowClick?: (row: T) => void;
  loading?: boolean;
  emptyMessage?: string;
};
