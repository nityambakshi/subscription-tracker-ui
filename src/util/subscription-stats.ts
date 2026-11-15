import type { Subscription } from '@/types/Subscription';
import { daysUntil } from '@/util/format';

// Totals are shown in one currency until conversion is added
export const DISPLAY_CURRENCY = 'INR';

// A yearly plan counts as one twelfth per month
export function toMonthlyAmount(sub: Subscription): number {
  return sub.cycle === 'Yearly' ? sub.amount / 12 : sub.amount;
}

export function computeStats(
  subs: Subscription[],
  currency = DISPLAY_CURRENCY
) {
  const inCurrency = subs.filter((s) => s.currency === currency);
  const monthly = inCurrency.reduce((sum, s) => sum + toMonthlyAmount(s), 0);

  // Only renewals that haven't passed yet, earliest first
  const upcoming = subs
    .map((sub) => ({ sub, days: daysUntil(sub.renewsOn) }))
    .filter((item) => item.days >= 0)
    .sort((a, b) => a.days - b.days);

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
