import type { DataTableProps } from '@/types/types';

function DataTable<T>({
  rows,
  columns,
  getRowId,
  onRowClick,
  loading = false,
  emptyMessage = 'Nothing here yet',
}: DataTableProps<T>) {
  return (
    <div className="overflow-hidden rounded-xl border border-border bg-surface shadow-card">
      <table className="w-full border-collapse">
        <thead className="bg-surface-2">
          <tr>
            {columns.map((c) => (
              <th
                key={c.id}
                scope="col"
                className={[
                  'px-4.5 py-2.5 text-small font-normal text-fg-muted',
                  c.align === 'right' ? 'text-right' : 'text-left',
                  c.className ?? '',
                ].join(' ')}
              >
                {c.header}
              </th>
            ))}
          </tr>
        </thead>

        <tbody>
          {loading && (
            <tr>
              <td
                colSpan={columns.length}
                className="p-8 text-center text-small text-fg-muted"
              >
                Loading…
              </td>
            </tr>
          )}

          {!loading && rows.length === 0 && (
            <tr>
              <td
                colSpan={columns.length}
                className="p-8 text-center text-small text-fg-muted"
              >
                {emptyMessage}
              </td>
            </tr>
          )}

          {!loading &&
            rows.map((row) => (
              <tr
                key={getRowId(row)}
                className={[
                  'border-t border-border transition-colors duration-fast hover:bg-surface-2',
                  onRowClick ? 'cursor-pointer' : '',
                ].join(' ')}
                onClick={() => onRowClick?.(row)}
              >
                {columns.map((c) => (
                  <td
                    key={c.id}
                    className={[
                      'px-4.5 py-3.5 align-middle',
                      c.align === 'right'
                        ? 'text-right tabular-nums'
                        : 'text-left',
                      c.className ?? '',
                    ].join(' ')}
                  >
                    {c.render ? c.render(row) : 'NA'}
                  </td>
                ))}
              </tr>
            ))}
        </tbody>
      </table>
    </div>
  );
}

export default DataTable;
