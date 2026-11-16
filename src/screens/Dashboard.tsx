import { Button } from '@/components/ui/Button';
import ButtonGroup from '@/components/ui/ButtonGroup';
import { Card } from '@/components/ui/Card';
import Dialog from '@/components/ui/Dialog';
import { Input } from '@/components/ui/Input';
import Select from '@/components/ui/Select';
import { useMe } from '@/hooks/auth-hooks';
import { useSubscriptions } from '@/hooks/subscription-hooks';
import type { StatCard } from '@/types/types';
import { formatDate, formatMoney, formatRelativeDays } from '@/util/format';
import { findBrandKey, iconsBySubscription } from '@/util/getBrandIcons';
import { getDashboardDateInfo } from '@/util/greeting';
import { computeStats } from '@/util/subscription-stats';
import { useState } from 'react';
import type { IconType } from 'react-icons';
import { LuStore } from 'react-icons/lu';

type DashboardProps = {
  search: string;
  onSearchChange: (search: string) => void;
};

function Dashboard({ search, onSearchChange }: DashboardProps) {
  const [dialogOpen, setDialogOpen] = useState(false);
  const [Icon, setIcon] = useState<IconType>(() => LuStore);

  const { greeting, day, date } = getDashboardDateInfo();

  const { data: user } = useMe();
  const { data: subscriptions, isPending } = useSubscriptions();

  const stats = computeStats(subscriptions ?? []);

  const dialogActions = (
    <div className="flex justify-end gap-3">
      <Button variant="secondary" onClick={() => setDialogOpen(false)}>
        Cancel
      </Button>
      <Button onClick={() => setDialogOpen(false)}>Add subscription</Button>
    </div>
  );

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
      <header className="flex items-center justify-between gap-4">
        <div className="flex flex-col gap-1">
          <h1 className="text-heading font-semibold tracking-heading text-fg">
            {greeting} {user?.fullName?.split(' ')[0] ?? ''}
          </h1>
          <p className="text-body text-fg-muted">
            {day}, {date}
          </p>
        </div>
        <div className="flex items-center gap-2.5">
          <Input
            type="search"
            className="w-55"
            aria-label="Search subscriptions"
            placeholder="Search subscriptions"
            value={search}
            onChange={(e) => onSearchChange(e.target.value)}
          />
          <Button onClick={() => setDialogOpen(true)}>
            + Add subscription
          </Button>
        </div>
      </header>

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

      <Dialog
        open={dialogOpen}
        onClose={() => setDialogOpen(false)}
        title="Add subscription"
        actions={dialogActions}
      >
        <div className="flex flex-col gap-4">
          <div className="flex flex-col gap-3">
            <p className="text-body text-fg">Subscription name</p>
            <div className="grid w-full grid-cols-[auto_minmax(0,1fr)] items-center gap-3">
              <Icon size={32} />
              <Input
                className="w-full"
                type="text"
                placeholder="e.g. Netflix"
                onChange={(e) => {
                  const icon =
                    iconsBySubscription[findBrandKey(e.target.value)]?.logo ??
                    LuStore;
                  setIcon(() => icon);
                }}
              />
            </div>
          </div>

          <div className="flex gap-3">
            <div className="flex-1">
              <Input
                type="number"
                label="Amount"
                placeholder="0.00"
                className="text-right"
              />
            </div>
            <Select
              options={[
                { id: 'inr', label: 'INR' },
                { id: 'usd', label: 'USD' },
              ]}
              label="Currency"
              placeholder="Select currency"
              className="w-30"
            />
          </div>

          <ButtonGroup
            label="Billing cycle"
            buttons={[
              { id: 'monthly', label: 'Monthly', onClick: () => {} },
              { id: 'yearly', label: 'Yearly', onClick: () => {} },
            ]}
          />

          <Select
            options={[
              { id: 'entertainment', label: 'Entertainment' },
              { id: 'productivity', label: 'Productivity' },
              { id: 'utilities', label: 'Utilities' },
              { id: 'other', label: 'Other' },
            ]}
            label="Category"
            placeholder="Select category"
            className="w-full"
          />
        </div>

        <Input type="date" label="Renews on" placeholder="Select date" />
      </Dialog>
    </>
  );
}

export default Dashboard;
