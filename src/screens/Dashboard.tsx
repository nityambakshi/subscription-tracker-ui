import { Button } from '@/components/ui/Button';
import { Card } from '@/components/ui/Card';
import { statCards } from '@/constants/mock-constants';
import { useMe } from '@/hooks/auth-hooks';
import { getDashboardDateInfo } from '@/util/greeting';

function Dashboard() {
  const { greeting, day, date } = getDashboardDateInfo();
  const { data: user } = useMe();

  return (
    <>
      <header className="flex items-end justify-between gap-4">
        <div className="flex flex-col gap-1">
          <h1 className="text-heading font-semibold tracking-heading text-fg">
            {greeting} {user?.fullName?.split(' ')[0] ?? ''}
          </h1>
          <p className="text-body text-fg-muted">
            {day}, {date}
          </p>
        </div>
        <div className="flex items-center gap-2.5">
          <label
            aria-label="Search subscriptions"
            className="flex h-9.5 w-55 items-center rounded-md border border-border bg-surface px-3"
          >
            <input
              aria-label="Search subscriptions input"
              placeholder="Search subscriptions"
              className="w-full bg-transparent text-body text-fg outline-none placeholder:text-fg-muted"
            />
          </label>
          <Button>+ Add subscription</Button>
        </div>
      </header>

      <div className="grid grid-cols-4 gap-3.5">
        {statCards.map((card) => (
          <Card key={card.id} className="w-full">
            <div className="flex flex-col gap-1.5 px-4.5 py-4">
              <p className="text-body text-fg-muted">{card.label}</p>
              <p className="font-semibold text-stat text-fg">{card.value}</p>
              <p
                className={`text-small ${card.tone === 'positive' ? 'text-success' : 'text-fg-muted'}`}
              >
                {card.hint}
              </p>
            </div>
          </Card>
        ))}
      </div>
    </>
  );
}

export default Dashboard;
