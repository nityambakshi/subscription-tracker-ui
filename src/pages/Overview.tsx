import { useState } from 'react';
import DataTable, { type Column } from '@/components/ui/DataTable';
import { Chip } from '@/components/ui/Chip';
import { Toggle } from '@/components/ui/Toggle';
import Dashboard from '../feature/subscriptions/components/Dashboard';
import { CategoryFilter } from '@/feature/subscriptions/components/CategoryFilter';
import { RightPanel } from '@/feature/subscriptions/components/RightPanel';
import { iconsBySubscription } from '@/feature/subscriptions/utils/brand-icons';
import type { Category, Subscription } from '@/feature/subscriptions/types';
import {
  useSetReminder,
  useSubscriptions,
} from '@/feature/subscriptions/hooks';
import { LuStore, LuTrash2 } from 'react-icons/lu';
import {
  daysUntil,
  formatDate,
  formatMoney,
  formatRelativeDays,
} from '@/lib/format';
import DeleteConfirmationDialog from '@/feature/subscriptions/components/DeleteConfirmationDialog';

function Overview() {
  const [searchQuery, setSearchQuery] = useState('');
  const [category, setCategory] = useState<Category>('All');
  const [row, setRow] = useState<Subscription | undefined>(undefined);
  const [deleteConfirmationDialogOpen, setDeleteConfirmationDialogOpen] =
    useState(false);

  const {
    data: subscriptionData,
    isLoading: isSubLoading,
    isError: isSubError,
    error: subError,
  } = useSubscriptions();
  const { mutate: setReminder } = useSetReminder();

  const handleReminderToggle = (row: Subscription, checked: boolean) => {
    setReminder({ subscriptionId: row.id, reminderOn: checked });
  };

  const categoryRows =
    category === 'All'
      ? (subscriptionData ?? [])
      : (subscriptionData ?? []).filter((item) => item.category === category);

  const searchTerm = searchQuery.trim().toLowerCase();
  const rows = searchTerm
    ? categoryRows.filter((item) =>
        item.name.toLowerCase().includes(searchTerm)
      )
    : categoryRows;

  const renderTextTableCell = (text: string) => (
    <p className="text-body text-fg font-medium">{text}</p>
  );

  const handleDeleteSubscription = async (subscription: Subscription) => {
    setRow(subscription);
    setDeleteConfirmationDialogOpen(true);
  };

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
            <Toggle
              checked={row.reminderOn}
              onChange={(checked) => handleReminderToggle(row, checked)}
            />
            <div
              className="rounded-full p-2 hover:bg-warning-soft text-fg-muted hover:text-danger transition-colors duration-fast cursor-pointer"
              role="button"
              onClick={() => handleDeleteSubscription(row)}
            >
              <LuTrash2 size={16} />
            </div>
          </div>
        );
      },
    },
  ];

  return (
    <section className="flex flex-1">
      <div className="flex flex-1 flex-col gap-6 px-9 py-8">
        <Dashboard search={searchQuery} onSearchChange={setSearchQuery} />

        <CategoryFilter value={category} onChange={setCategory} />

        <div className="rounded-xl border border-border">
          <DataTable<Subscription>
            columns={subscriptionTableColumns}
            rows={rows || []}
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
        </div>
      </div>

      {!isSubLoading && <RightPanel sliceData={subscriptionData ?? []} />}

      <DeleteConfirmationDialog
        open={deleteConfirmationDialogOpen}
        onClose={() => setDeleteConfirmationDialogOpen(false)}
        subscription={row ?? ({} as Subscription)}
      />
    </section>
  );
}

export default Overview;
