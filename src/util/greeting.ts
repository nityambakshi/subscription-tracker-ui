import type { DashboardDateInfo } from '@/types/types';

export function getDashboardDateInfo(): DashboardDateInfo {
  const now = new Date();
  const hour = now.getHours();

  let greeting = '';

  if (hour >= 5 && hour < 12) {
    greeting = 'Good morning,';
  } else if (hour >= 12 && hour < 17) {
    greeting = 'Good afternoon,';
  } else if (hour >= 17 && hour < 24) {
    greeting = 'Good evening,';
  } else {
    greeting = "How's it going?";
  }

  const day = new Intl.DateTimeFormat(undefined, {
    weekday: 'long',
  }).format(now);

  const date = new Intl.DateTimeFormat(undefined, {
    month: 'long',
    day: 'numeric',
    year: 'numeric',
  }).format(now);

  return {
    greeting,
    day,
    date,
  };
}
