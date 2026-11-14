// Currency: each currency gets its own locale, so the grouping and symbol placement suit its readers.
const localeByCurrency: Record<string, string> = {
  INR: 'en-IN',
  USD: 'en-US',
  EUR: 'de-DE',
  GBP: 'en-GB',
  JPY: 'ja-JP',
};

const DEFAULT_LOCALE = 'en-IN';

export function formatMoney(amount: number, currency: string): string {
  return new Intl.NumberFormat(localeByCurrency[currency] ?? DEFAULT_LOCALE, {
    style: 'currency',
    currency,
  }).format(amount);
}

// Dates: parse "YYYY-MM-DD" as a local calendar date, so no timezone can shift the day.
export function parseIsoDate(iso: string): Date {
  const [year, month, day] = iso.split('-').map(Number);
  return new Date(year, month - 1, day);
}

export function formatDate(iso: string, locale = DEFAULT_LOCALE): string {
  return new Intl.DateTimeFormat(locale, {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
  }).format(parseIsoDate(iso));
}

// Days from today's local date to the renewal date. Negative means it has passed.
export function daysUntil(iso: string, today = new Date()): number {
  const start = new Date(
    today.getFullYear(),
    today.getMonth(),
    today.getDate()
  );
  return Math.round(
    (parseIsoDate(iso).getTime() - start.getTime()) / 86_400_000
  );
}

// Gives "today", "tomorrow", "in 4 days", or "2 days ago".
export function formatRelativeDays(days: number, locale = 'en'): string {
  return new Intl.RelativeTimeFormat(locale, { numeric: 'auto' }).format(
    days,
    'day'
  );
}
