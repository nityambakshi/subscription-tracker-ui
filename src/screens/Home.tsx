import type { Category, Column } from '@/types/types';
import { useState } from 'react';
import DataTable from '@/components/layout/DataTable';
import Dashboard from './Dashboard';
import { CategoryFilter } from '@/components/layout/CategoryFilter';
import { RightPanel } from '@/components/layout/RightPanel';
import { iconsBySubscription } from '@/util/getBrandIcons';
import { Chip } from '@/components/ui/Chip';
import { Toggle } from '@/components/ui/Toggle';
import type { Subscription } from '@/types/Subscription';
import { useSubscriptions } from '@/hooks/subscription-hooks';
import { LuStore } from 'react-icons/lu';
import {
  daysUntil,
  formatDate,
  formatMoney,
  formatRelativeDays,
} from '@/util/format';

function Home() {
  const [category, setCategory] = useState<Category>('All');
  const {
    data: subscriptionData,
    isLoading: isSubLoading,
    isError: isSubError,
    error: subError,
  } = useSubscriptions();

  const rows =
    category === 'All'
      ? subscriptionData
      : subscriptionData?.filter((item) => item.category === category);

  const renderTextTableCell = (text: string) => (
    <p className="text-body text-fg font-medium">{text}</p>
  );

  const subscriptionTableColumns: Column<Subscription>[] = [
    {
      id: 'name',
      header: 'Subscription',
      render: (row) => {
        const item = iconsBySubscription[row.logoKey];
        const Icon = item?.logo ?? LuStore;
        const brandColor = item?.color ?? 'currentColor';

        return (
          <div className="flex flex-1 gap-3">
            <Icon size={32} color={brandColor} />
            <div className="flex flex-col">
              {renderTextTableCell(row.name)}
              <p className="text-sm text-fg-muted">{row.cycle}</p>
            </div>
          </div>
        );
      },
    },
    {
      id: 'category',
      header: 'Category',
      render: (row) => (
        <Chip clickable={false} className="border-none">
          {row.category}
        </Chip>
      ),
    },
    {
      id: 'cost',
      header: 'Cost',
      render: (row) =>
        renderTextTableCell(formatMoney(row.amount, row.currency)),
    },
    {
      id: 'renews',
      header: 'Renews',
      render: (row) => {
        const days = daysUntil(row.renewsOn);

        return (
          <div className="flex flex-col">
            {renderTextTableCell(formatDate(row.renewsOn))}
            <span
              className={`text-small ${days < 3 ? 'text-warning' : 'text-fg-muted'}`}
            >
              {formatRelativeDays(days)}
            </span>
          </div>
        );
      },
    },
    {
      id: 'reminder',
      header: 'Reminder',
      render: (row) => {
        return (
          <Toggle checked={row.reminderOn} onChange={() => !row.reminderOn} />
        );
      },
    },
  ];

  return (
    <section className="flex flex-1">
      <aside className="flex flex-1 flex-col gap-6 px-9 py-8">
        <Dashboard />

        <CategoryFilter value={category} onChange={setCategory} />

        <div className="rounded-xl border border-border">
          <DataTable<Subscription>
            columns={subscriptionTableColumns}
            rows={rows || []}
            loading={isSubLoading}
            emptyMessage={
              isSubError ? subError.message : 'No subscriptions yet.'
            }
            getRowId={(row) => row.id}
            onRowClick={(row) => console.log('clicked row', row)}
          />
        </div>
      </aside>

      {!isSubLoading && <RightPanel sliceData={subscriptionData ?? []} />}
    </section>
  );
}

export default Home;
