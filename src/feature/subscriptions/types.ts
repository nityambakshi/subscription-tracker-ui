import type { IconType } from 'react-icons';
import type { categories } from './constants';

export type BillingCycle = 'Monthly' | 'Yearly';

export type Subscription = {
  id: string;
  name: string;
  logoKey: string;
  category: string;
  amount: number;
  currency: string;
  cycle: BillingCycle;
  renewsOn: string;
  reminderOn: boolean;
};

export type Category = (typeof categories)[number];

export type BrandLogoDetails = {
  logo: IconType;
  color: string;
};

export type StatCard = {
  id: 'monthlySpend' | 'yearlyProjection' | 'active' | 'nextRenewal';
  label: string;
  value: string;
  hint: string;
  tone?: 'default' | 'positive';
};
