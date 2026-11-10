import type { Column, StatCard, Subscription } from '@/types/types';

export const statCards: StatCard[] = [
  {
    id: 'monthlySpend',
    label: 'Monthly spend',
    value: '$92.46',
    hint: '+$12 vs last month',
    tone: 'default',
  },
  {
    id: 'yearlyProjection',
    label: 'Yearly projection',
    value: '$1,109.52',
    hint: 'Based on current plans',
    tone: 'default',
  },
  {
    id: 'active',
    label: 'Active',
    value: '5',
    hint: '2 renewing this week',
    tone: 'default',
  },
  {
    id: 'nextRenewal',
    label: 'Next renewal',
    value: 'Netflix',
    hint: 'Nov 12 · in 4 days',
    tone: 'positive',
  },
];

export const categories = [
  'All',
  'Entertainment',
  'Utilities',
  'Productivity',
] as const;

export const subscriptionsList: Column<Subscription>[] = [
  { id: 'name', header: 'Subscription', render: (row) => row.name },
  { id: 'category', header: 'Category', render: (row) => row.category },
  {
    id: 'cost',
    header: 'Cost',
    align: 'right',
    render: (row) => `${row.currency} ${row.amount.toFixed(2)}`,
  },
  {
    id: 'renews',
    header: 'Renews',
    render: (row) => new Date(row.renewsOn).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
    }),
  },
  {
    id: 'reminder',
    header: 'Reminder',
    align: 'right',
    render: (row) => (row.reminderOn ? 'On' : 'Off'),
  },
];
