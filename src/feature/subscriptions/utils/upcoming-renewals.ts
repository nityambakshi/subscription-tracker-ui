import type { Subscription } from '../types';
import { daysUntil } from '@/lib/format';

export function upcomingRenewals(subs: Subscription[], withinDays: number) {
  return subs
    .map((sub) => ({ sub, days: daysUntil(sub.renewsOn) }))
    .filter((item) => item.days >= 0 && item.days <= withinDays)
    .sort((a, b) => a.days - b.days);
}
