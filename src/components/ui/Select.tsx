import { useId, type SelectHTMLAttributes } from 'react';
import { LuChevronDown } from 'react-icons/lu';
import { useFormField } from '@/components/ui/form-field-context';

type SelectProps = SelectHTMLAttributes<HTMLSelectElement> & {
  options: { id: string; label: string }[];
  label?: string;
  className?: string;
};

function Select({ label, id, options, className = '', ...props }: SelectProps) {
  const formField = useFormField();
  const autoId = useId();
  const selectId = id ?? formField?.id ?? autoId;
  const showOwnLabel = !formField && label;

  const control = (
    <div className={`relative ${formField ? className : ''}`.trim()}>
      <select
        {...props}
        id={selectId}
        name={props.name ?? selectId}
        aria-invalid={formField?.error ? true : undefined}
        aria-describedby={formField?.describedBy}
        className="h-10 w-full cursor-pointer appearance-none rounded-md border border-border bg-surface pl-3 pr-9 text-body text-fg-muted outline-none focus:border-ring focus:ring-2 focus:ring-ring/25"
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
  );

  if (!showOwnLabel) {
    return control;
  }

  return (
    <div className={`flex flex-col gap-1.5 ${className}`}>
      <div className="flex items-center justify-between">
        <label htmlFor={selectId} className="text-label font-medium text-fg">
          {label}
        </label>
      </div>
      {control}
    </div>
  );
}

export default Select;
