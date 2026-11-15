import { useSubscriptions } from '@/hooks/subscription-hooks';
import { computeStats } from '@/util/subscription-stats';
import { Card } from '../ui/Card';
import { formatMoney } from '@/util/format';

const MONTHLY_BUDGET = 5000;

function BudgetCard() {
  const { data: subscriptions, isPending } = useSubscriptions();

  const cardStyle = 'flex flex-col gap-2 px-4.5 py-4';

  if (isPending) {
    return (
      <div
        aria-busy="true"
        className={`${cardStyle} bg-surface-2 rounded-lg h-20`}
      >
        <div
          aria-hidden="true"
          className="h-3 rounded-full w-full flex justify-between"
        >
          <div className="w-4/6 h-full bg-border rounded-full animate-pulse" />
          <div className="w-1/6 h-full bg-border rounded-full animate-pulse" />
        </div>
        <div
          aria-hidden="true"
          className="h-1.5 bg-border rounded-full w-full"
        />
        <div
          aria-hidden="true"
          className="h-3 bg-border rounded-full w-full animate-pulse"
        />
      </div>
    );
  }

  const { monthly, currency } = computeStats(subscriptions ?? []);
  const percent = Math.round((monthly / MONTHLY_BUDGET) * 100);
  const width = Math.min(percent, 100);
  const isOverBudget = percent > 100;
  const isNearlyOverBudget = percent >= 80 && !isOverBudget;

  const barColor = isOverBudget
    ? 'bg-danger'
    : isNearlyOverBudget
      ? 'bg-warning'
      : 'bg-accent';

  return (
    <Card className={cardStyle}>
      <div className="flex items-center justify-between">
        <p className="text-label font-semibold text-fg">Monthly budget</p>
        <p className="text-small tabular-nums text-fg-muted">{percent}%</p>
      </div>

      <div
        aria-hidden="true"
        className="h-1.5 w-full overflow-hidden rounded-full bg-border"
      >
        <div
          className={`h-full rounded-full ${barColor}`}
          style={{ width: `${width}%` }}
        />
      </div>

      <p className="text-small text-fg-muted">
        {formatMoney(monthly, currency)} of{' '}
        {formatMoney(MONTHLY_BUDGET, currency)}
      </p>
    </Card>
  );
}

export default BudgetCard;
