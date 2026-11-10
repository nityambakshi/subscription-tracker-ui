import type { ButtonHTMLAttributes } from 'react';

type ChipProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  active?: boolean;
  clickable?: boolean;
};

export function Chip({
  active = false,
  clickable = false,
  className = '',
  children,
  ...props
}: ChipProps) {
  return (
    <button
      type="button"
      aria-pressed={active}
      className={[
        'inline-flex h-7.5 shrink-0 items-center rounded-full px-3 text-label font-medium',
        'transition-colors duration-fast focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring',
        clickable ? 'hover:cursor-pointer' : '',
        active
          ? 'bg-inverse text-inverse-fg'
          : 'border border-border bg-surface text-fg-muted',
        clickable && active ? 'hover:text-fg' : '',
        className,
      ].join(' ')}
      {...props}
    >
      {children}
    </button>
  );
}
