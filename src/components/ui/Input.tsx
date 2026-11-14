import { useId, type InputHTMLAttributes, type ReactNode } from 'react';

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
  const autoId = useId();
  const inputId = id ?? autoId;
  const message = error ?? hint;
  const messageId = `${inputId}-message`;

  return (
    <div className="flex flex-col gap-1.5">
      <div className="flex items-center justify-between">
        {label && (
          <label htmlFor={inputId} className="text-label font-medium text-fg">
            {label}
          </label>
        )}

        {labelAction && <div>{labelAction}</div>}
      </div>

      <input
        id={inputId}
        aria-invalid={error ? true : undefined}
        aria-describedby={message ? messageId : undefined}
        className={[
          'h-10 rounded-md border border-border bg-surface px-3 text-body text-fg',
          'placeholder:text-fg-muted outline-none transition-colors duration-fast',
          'focus:border-ring focus:ring-2 focus:ring-ring/25',
          'aria-invalid:border-danger',
          'disabled:cursor-not-allowed disabled:opacity-50',
          className,
        ].join(' ')}
        {...props}
      />

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
  );
}
