import { useId, type InputHTMLAttributes, type ReactNode } from 'react';
import { useFormField } from '@/components/ui/form-field-context';

type InputProps = InputHTMLAttributes<HTMLInputElement> & {
  label?: string;
  hint?: string;
  error?: string;
  labelAction?: ReactNode;
};

export function Input({
  label,
  hint,
  error,
  id,
  labelAction,
  className = '',
  ...props
}: InputProps) {
  const formField = useFormField();
  const autoId = useId();

  const inputId = id ?? formField?.id ?? autoId;
  const fieldError = formField?.error ?? error;
  const message = formField ? undefined : (fieldError ?? hint);
  const messageId =
    formField?.describedBy ?? (message ? `${inputId}-message` : undefined);
  const showOwnChrome = !formField && (label || labelAction || message);

  const control = (
    <input
      {...props}
      id={inputId}
      aria-invalid={fieldError ? true : undefined}
      aria-describedby={messageId}
      className={[
        'h-9.5 rounded-md border border-border bg-surface px-3 text-body text-fg',
        'placeholder:text-fg-muted outline-none transition-colors duration-fast',
        'focus:border-ring focus:ring-2 focus:ring-ring/25',
        'aria-invalid:border-danger',
        'disabled:cursor-not-allowed disabled:opacity-50',
        className,
      ].join(' ')}
    />
  );

  if (!showOwnChrome) {
    return control;
  }

  return (
    <div className="flex flex-col gap-1.5">
      {(label || labelAction) && (
        <div className="flex items-center justify-between">
          {label && (
            <label htmlFor={inputId} className="text-label font-medium text-fg">
              {label}
            </label>
          )}
          {labelAction && <div>{labelAction}</div>}
        </div>
      )}

      {control}

      {message && (
        <p
          id={messageId}
          className={
            fieldError ? 'text-small text-danger' : 'text-small text-fg-muted'
          }
        >
          {message}
        </p>
      )}
    </div>
  );
}
