import type { Subscription } from '../types';
import { upcomingRenewals } from './upcoming-renewals';

// Totals are shown in one currency until conversion is added
export const DISPLAY_CURRENCY = 'inr';

// A yearly plan counts as one twelfth per month
export function toMonthlyAmount(sub: Subscription): number {
  return sub.cycle === 'Yearly' ? sub.amount / 12 : sub.amount;
}

export function inDisplayCurrency(subs: Subscription[]): Subscription[] {
  return subs.filter((sub) => sub.currency === DISPLAY_CURRENCY);
}

export function computeStats(
  subs: Subscription[],
  currency = DISPLAY_CURRENCY
) {
  const inCurrency = subs.filter((s) => s.currency === currency);
  const monthly = inCurrency.reduce((sum, s) => sum + toMonthlyAmount(s), 0);

  const upcoming = upcomingRenewals(subs, Infinity);

  const next = upcoming[0];

  return {
    currency,
    monthly,
    yearly: monthly * 12,
    count: subs.length,
    otherCurrencyCount: subs.length - inCurrency.length,
    renewingThisWeek: upcoming.filter((item) => item.days <= 7).length,
    next: next
      ? { name: next.sub.name, renewsOn: next.sub.renewsOn, days: next.days }
      : null,
  };
}
