import type { SubscriptionTableRow } from '@/types/subscription-table';

export const subscriptionTableRows: SubscriptionTableRow[] = [
  {
    id: 'netflix',
    name: 'Netflix',
    category: 'Entertainment',
    cost: '15.49',
    renews: 'Nov 12',
    reminder: true,
    cycle: 'monthly',
  },
  {
    id: 'adobe',
    name: 'Adobe CC',
    category: 'Productivity',
    cost: '54.99',
    renews: 'Nov 15',
    reminder: true,
    cycle: 'monthly',
  },
  {
    id: 'spotify',
    name: 'Spotify',
    category: 'Entertainment',
    cost: '10.99',
    renews: 'Nov 20',
    reminder: true,
    cycle: 'monthly',
  },
  {
    id: 'icloud',
    name: 'iCloud',
    category: 'Utilities',
    cost: '2.99',
    renews: 'Nov 28',
    reminder: false,
    cycle: 'monthly',
  },
  {
    id: 'notion',
    name: 'Notion',
    category: 'Productivity',
    cost: '96.00',
    renews: 'Jan 5',
    reminder: true,
    cycle: 'yearly',
  },
];
