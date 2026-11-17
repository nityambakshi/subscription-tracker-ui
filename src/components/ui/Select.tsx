import { useId, type SelectHTMLAttributes } from 'react';

type SelectProps = SelectHTMLAttributes<HTMLSelectElement> & {
  options: { id: string; label: string }[];
  label?: string;
  className?: string;
};

function Select({ label, id, options, className = '', ...props }: SelectProps) {
  const autoId = useId();
  const selectId = id ?? autoId;

  return (
    <div className={`flex flex-col gap-1.5 ${className}`}>
      {label && (
        <div className="flex items-center justify-between">
          <label htmlFor={selectId} className="text-label font-medium text-fg">
            {label}
          </label>
        </div>
      )}
      <select
        id={selectId}
        name={selectId}
        className="h-9.5, text-body rounded-md border border-border bg-surface p-2 text-fg-muted appearance-none cursor-pointer focus:border-ring focus:ring-2 focus:ring-ring/25"
        {...props}
      >
        {options.map((option) => (
          <option key={option.id} value={option.id}>
            {option.label}
          </option>
        ))}
      </select>
    </div>
  );
}

export default Select;
