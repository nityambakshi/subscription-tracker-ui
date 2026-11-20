import type { Subscription } from '../types';
import { formatMoney, parseIsoDate } from '@/lib/format';

type Item = { sub: Subscription; days: number };

export function UpcomingRenewals({ items }: { items: Item[] }) {
  if (items.length === 0) {
    return (
      <p className="text-small text-fg-muted">
        No renewals in the next 14 days
      </p>
    );
  }

  return (
    <ul className="flex flex-col gap-1">
      {items.map(({ sub }) => {
        const date = parseIsoDate(sub.renewsOn);

        return (
          <li
            key={sub.id}
            className="flex items-center gap-3 rounded-md p-2.5 transition-colors duration-fast hover:bg-surface-2"
          >
            <div className="flex w-10 shrink-0 flex-col items-center rounded-md bg-surface-2 py-1.5">
              <span className="text-micro font-medium uppercase text-fg-muted">
                {date.toLocaleString('en-IN', { month: 'short' })}
              </span>
              <span className="text-date font-semibold text-fg">
                {date.getDate()}
              </span>
            </div>

            <div className="flex min-w-0 flex-1 flex-col">
              <p className="truncate text-body font-medium text-fg">
                {sub.name}
              </p>
              <p className="text-small text-fg-muted">{sub.category}</p>
            </div>

            <p className="text-label tabular-nums text-fg">
              {formatMoney(sub.amount, sub.currency)}
            </p>
          </li>
        );
      })}
    </ul>
  );
}
