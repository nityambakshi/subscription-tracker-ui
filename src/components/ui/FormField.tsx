import { useId, type ReactNode } from 'react';
import { FormFieldContext } from '@/components/ui/form-field-context';

type FormFieldProps = {
  id?: string;
  label: string;
  children: ReactNode;
  error?: string;
  hint?: string;
  required?: boolean;
  labelAction?: ReactNode;
  className?: string;
};

export function FormField({
  id,
  label,
  children,
  error,
  hint,
  required = false,
  labelAction,
  className = '',
}: FormFieldProps) {
  const autoId = useId();
  const fieldId = id ?? autoId;
  const labelId = `${fieldId}-label`;
  const message = error ?? hint;
  const messageId = message ? `${fieldId}-message` : undefined;

  return (
    <FormFieldContext.Provider
      value={{ id: fieldId, labelId, error, describedBy: messageId }}
    >
      <div className={`flex w-full flex-col gap-1.5 ${className}`}>
        <div className="flex items-center justify-between gap-2">
          <label
            id={labelId}
            htmlFor={fieldId}
            className="text-label font-medium text-fg"
          >
            {label}
            {required && (
              <span className="text-danger" aria-hidden="true">
                {' '}
                *
              </span>
            )}
          </label>
          {labelAction}
        </div>

        {children}

        {message && (
          <p
            id={messageId}
            className={
              error ? 'text-small text-danger' : 'text-small text-fg-muted'
            }
          >
            {message}
          </p>
        )}
      </div>
    </FormFieldContext.Provider>
  );
}

export default FormField;
