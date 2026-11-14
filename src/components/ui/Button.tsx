import type { ButtonHTMLAttributes } from 'react';

type Variant = 'primary' | 'secondary';

const variantClasses: Record<Variant, string> = {
  primary: 'bg-inverse text-inverse-fg hover:opacity-90',
  secondary: 'border border-border bg-surface text-fg hover:bg-surface-2',
};

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: Variant;
  fullWidth?: boolean;
};

export function Button({
  variant = 'primary',
  fullWidth = false,
  className = '',
  type = 'button',
  ...props
}: ButtonProps) {
  return (
    <button
      type={type}
      className={[
        'inline-flex h-10 items-center justify-center gap-2 rounded-md px-4',
        'text-body font-medium transition-colors duration-fast',
        'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring',
        'disabled:cursor-not-allowed disabled:opacity-50',
        'hover:cursor-pointer',
        variantClasses[variant],
        fullWidth ? 'w-full' : '',
        className,
      ].join(' ')}
      {...props}
    />
  );
}
