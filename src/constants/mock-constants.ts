import type { Column } from '@/types/types';
import type { Subscription } from '@/types/Subscription';

export const categories = [
  'All',
  'Entertainment',
  'Utilities',
  'Productivity',
  'Others',
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
    render: (row) =>
      new Date(row.renewsOn).toLocaleDateString('en-US', {
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
