import { useSubscriptions } from '../hooks';
import { computeStats } from '../utils/subscription-stats';
import { Card } from '@/components/ui/Card';
import { formatMoney } from '@/lib/format';

const MONTHLY_BUDGET = 5000;

function BudgetCardSkeleton() {
  return (
    <Card className="flex flex-col gap-2 px-4.5 py-4">
      <span className="sr-only">Loading monthly budget</span>
      <div aria-hidden="true" className="flex flex-col gap-2">
        <div className="flex items-center justify-between">
          <div className="h-4.5 w-28 animate-pulse rounded-full bg-border" />
          <div className="h-4 w-8 animate-pulse rounded-full bg-border" />
        </div>
        <div className="h-1.5 w-full animate-pulse rounded-full bg-border" />
        <div className="h-4 w-40 animate-pulse rounded-full bg-border" />
      </div>
    </Card>
  );
}

function BudgetCard() {
  const { data: subscriptions, isPending, isError } = useSubscriptions();

  if (isPending) return <BudgetCardSkeleton />;

  const cardStyle = 'flex flex-col gap-2 px-4.5 py-4';

  if (isError) {
    return (
      <Card className="flex flex-col gap-2 px-4.5 py-4">
        <p className="text-small text-danger">Could not load budget</p>
      </Card>
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
