export type SubscriptionCategory =
  | 'All'
  | 'Entertainment'
  | 'Utilities'
  | 'Productivity';

export type BillingCycle = 'monthly' | 'yearly';

export type SubscriptionTableRow = {
  id: string;
  name: string;
  category: SubscriptionCategory | string;
  cost: string;
  renews: string;
  reminder: boolean;
  cycle: BillingCycle;
};
