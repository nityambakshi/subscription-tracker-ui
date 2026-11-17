import { useId, type SelectHTMLAttributes } from 'react';
import { LuChevronDown } from 'react-icons/lu';

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
      <div className="relative">
        <select
          id={selectId}
          name={selectId}
          className="h-10 w-full cursor-pointer appearance-none rounded-md border border-border bg-surface pl-3 pr-9 text-body text-fg-muted outline-none focus:border-ring focus:ring-2 focus:ring-ring/25"
          {...props}
        >
          {options.map((option) => (
            <option key={option.id} value={option.id}>
              {option.label}
            </option>
          ))}
        </select>

        <LuChevronDown
          aria-hidden="true"
          className="pointer-events-none absolute right-3 top-1/2 size-4 -translate-y-1/2 text-fg-muted"
        />
      </div>
    </div>
  );
}

export default Select;
