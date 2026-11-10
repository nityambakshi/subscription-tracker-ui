// src/components/subscriptions/NameCell.tsx
type NameCellProps = {
  name: string;
  cycle: 'monthly' | 'yearly';
  color: string;
};

function NameCell({ name, cycle, color }: NameCellProps) {
  return (
    <div className="flex min-w-0 items-center gap-3">
      <div
        aria-hidden="true"
        className="flex size-9 shrink-0 items-center justify-center rounded-md text-body font-semibold text-white"
        style={{ backgroundColor: color }}
      >
        {name.charAt(0).toUpperCase()}
      </div>

      <div className="min-w-0">
        <p className="truncate text-body font-medium text-fg">{name}</p>
        <p className="text-small text-fg-muted">
          {cycle === 'monthly' ? 'Monthly' : 'Yearly'}
        </p>
      </div>
    </div>
  );
}

export default NameCell;