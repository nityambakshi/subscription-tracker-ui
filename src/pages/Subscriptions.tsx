import AppHeader from '@/components/layout/AppHeader';
import { Chip } from '@/components/ui/Chip';
import type { Column } from '@/components/ui/DataTable';
import DataTable from '@/components/ui/DataTable';
import { Toggle } from '@/components/ui/Toggle';
import { CategoryFilter } from '@/feature/subscriptions/components/CategoryFilter';
import { useSubscriptions } from '@/feature/subscriptions/hooks';
import type { Category, Subscription } from '@/feature/subscriptions/types';
import { iconsBySubscription } from '@/feature/subscriptions/utils/brand-icons';
import { computeStats } from '@/feature/subscriptions/utils/subscription-stats';
import {
  daysUntil,
  formatDate,
  formatMoney,
  formatRelativeDays,
} from '@/lib/format';
import { useState } from 'react';
import { LuStore } from 'react-icons/lu';

function Subscriptions() {
  const [category, setCategory] = useState<Category>('All');
  const [searchQuery, setSearchQuery] = useState<string>('');

  const {
    data: subscriptions,
    isLoading: isSubLoading,
    isError: isSubError,
    error: subError,
  } = useSubscriptions();

  const activeSubscriptions = subscriptions?.length;
  const totalSpend = computeStats(subscriptions ?? []).monthly;
  const formattedTotalSpend = formatMoney(totalSpend, 'INR');

  const categoryRows =
    category === 'All'
      ? (subscriptions ?? [])
      : (subscriptions ?? []).filter((item) => item.category === category);

  const searchTerm = searchQuery.trim().toLowerCase();
  const filteredSubscriptions = searchTerm
    ? categoryRows.filter((item) =>
        item.name.toLowerCase().includes(searchTerm)
      )
    : categoryRows;

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
              <p className="text-small text-fg-muted">{row.cycle}</p>
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
              className={`text-small ${days <= 3 ? 'text-warning' : 'text-fg-muted'}`}
            >
              {formatRelativeDays(days)}
            </span>
          </div>
        );
      },
    },
    {
      id: 'actions',
      header: 'Actions',
      render: (row) => {
        return (
          <div className="flex items-center gap-4 w-10">
            <Toggle checked={row.reminderOn} onChange={() => {}} />
          </div>
        );
      },
    },
  ];

  return (
    <section className="flex flex-1 flex-col gap-6 px-9 py-8">
      <AppHeader
        message="Subscriptions"
        caption={`${activeSubscriptions} active subscriptions · ${formattedTotalSpend} per month`}
        search={searchQuery}
        onSearchChange={setSearchQuery}
      />

      <CategoryFilter value={category} onChange={setCategory} />

      <DataTable<Subscription>
        columns={subscriptionTableColumns}
        rows={filteredSubscriptions ?? []}
        loading={isSubLoading}
        emptyMessage={
          isSubError
            ? subError.message
            : searchQuery || category !== 'All'
              ? 'No subscriptions match your filters.'
              : 'No subscriptions yet.'
        }
        getRowId={(row) => row.id}
        onRowClick={(row) => console.log('clicked row', row)}
      />
    </section>
  );
}

export default Subscriptions;
