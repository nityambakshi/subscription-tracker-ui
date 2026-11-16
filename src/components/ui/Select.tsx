import { useId, type SelectHTMLAttributes } from 'react';

type SelectProps = SelectHTMLAttributes<HTMLSelectElement> & {
  options: { id: string; label: string }[];
  label?: string;
  placeholder?: string;
  className?: string;
};

function Select({
  placeholder,
  label,
  id,
  options,
  className = '',
  ...props
}: SelectProps) {
  const autoId = useId();
  const selectId = id ?? autoId;

  return (
    <div className="flex flex-col gap-1.5">
      {label && (
        <div className="flex items-center justify-between">
          <label
            htmlFor={placeholder}
            className="text-label font-medium text-fg"
          >
            {label}
          </label>
        </div>
      )}
      <select
        id={selectId}
        name={selectId}
        className={[
          'rounded-md border border-border bg-surface p-2 text-fg-muted appearance-none cursor-pointer',
          className,
        ].join(' ')}
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
