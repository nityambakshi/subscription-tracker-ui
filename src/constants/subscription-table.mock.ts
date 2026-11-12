import type { Subscription } from '@/types/Subscription';

export const subscriptionTableRows: Subscription[] = [
  {
    id: 'netflix',
    name: 'Netflix',
    category: 'Entertainment',
    amount: 499,
    renewsOn: 'Nov 12',
    reminderOn: true,
    cycle: "MONTHLY",
    logoKey: "netflix",
    currency: "INR"
  }
];
