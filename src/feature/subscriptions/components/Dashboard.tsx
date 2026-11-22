import { Card } from '@/components/ui/Card';
import { useMe } from '@/feature/auth/hooks';
import { useSubscriptions } from '../hooks';
import type { StatCard } from '../types';
import { formatDate, formatMoney, formatRelativeDays } from '@/lib/format';
import { getDashboardDateInfo } from '@/lib/greeting';
import { computeStats } from '@/feature/subscriptions/utils/subscription-stats';
import AppHeader from '@/components/layout/AppHeader';

type DashboardProps = {
  search: string;
  onSearchChange: (search: string) => void;
};

function Dashboard({ search, onSearchChange }: DashboardProps) {
  const { greeting, day, date } = getDashboardDateInfo();

  const { data: user } = useMe();
  const { data: subscriptions, isPending } = useSubscriptions();

  const stats = computeStats(subscriptions ?? []);

  const statCards: StatCard[] = [
    {
      id: 'monthlySpend',
      label: 'Monthly spend',
      value: isPending ? '—' : formatMoney(stats.monthly, stats.currency),
      hint:
        stats.otherCurrencyCount > 0
          ? `Excludes ${stats.otherCurrencyCount} in other currencies`
          : 'Across current plans',
      tone: 'default',
    },
    {
      id: 'yearlyProjection',
      label: 'Yearly projection',
      value: isPending ? '—' : formatMoney(stats.yearly, stats.currency),
      hint: 'Based on current plans (Monthly × 12)',
      tone: 'default',
    },
    {
      id: 'active',
      label: 'Active',
      value: isPending ? '—' : String(stats.count),
      hint: isPending ? '—' : `${stats.renewingThisWeek} renewing this week`,
      tone: 'default',
    },
    {
      id: 'nextRenewal',
      label: 'Next renewal',
      value: stats.next ? stats.next.name : '—',
      hint: stats.next
        ? `${formatDate(stats.next.renewsOn)} · ${formatRelativeDays(stats.next.days)}`
        : 'No upcoming renewals',
      tone: 'positive',
    },
  ];

  return (
    <>
      <AppHeader
        message={`${greeting} ${user?.fullName?.split(' ')[0] ?? ''}`}
        caption={`${day}, ${date}`}
        search={search}
        onSearchChange={onSearchChange}
      />

      <div className="grid grid-cols-4 gap-3.5">
        {statCards.map((card) => (
          <Card key={card.id} className="w-full">
            <div className="flex flex-col gap-1.5 px-4.5 py-4">
              <p className="text-body text-fg-muted">{card.label}</p>
              <p className="text-stat font-semibold tracking-stat tabular-nums text-fg">
                {card.value}
              </p>
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
