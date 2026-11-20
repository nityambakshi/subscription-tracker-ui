import { useId } from 'react';
import { useFormField } from '@/components/ui/form-field-context';

const activeClasses = 'bg-inverse text-inverse-fg hover:opacity-90';
const inactiveClasses = 'bg-surface text-fg hover:bg-surface-2';

type ButtonGroupOption = {
  id: string;
  label: string;
};

type ButtonGroupProps = {
  options: readonly ButtonGroupOption[];
  value: string;
  onChange: (value: string) => void;
  label?: string;
  disabled?: boolean;
  className?: string;
};

function ButtonGroup({
  options,
  value,
  onChange,
  label,
  disabled = false,
  className = '',
}: ButtonGroupProps) {
  const formField = useFormField();
  const autoId = useId();
  const ownLabelId = `${autoId}-label`;
  const labelledBy = formField?.labelId ?? (label ? ownLabelId : undefined);

  return (
    <div className="flex flex-col gap-1.5">
      {!formField && label && (
        <div id={ownLabelId} className="text-label font-medium text-fg">
          {label}
        </div>
      )}
      <div
        role="group"
        id={formField?.id}
        aria-labelledby={labelledBy}
        aria-describedby={formField?.describedBy}
        className="flex h-10 items-stretch rounded-md border border-border bg-surface p-[3px]"
      >
        {options.map((option) => {
          const isActive = value === option.id;

          return (
            <button
              type="button"
              key={option.id}
              aria-pressed={isActive}
              disabled={disabled}
              onClick={() => onChange(option.id)}
              className={[
                'flex-1 cursor-pointer items-center justify-center rounded-sm px-4',
                'text-body font-medium transition-colors duration-fast',
                'disabled:cursor-not-allowed disabled:opacity-50',
                'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring',
                isActive ? activeClasses : inactiveClasses,
                className,
              ].join(' ')}
            >
              {option.label}
            </button>
          );
        })}
      </div>
    </div>
  );
}

export default ButtonGroup;
