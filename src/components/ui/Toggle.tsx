type ToggleProps = {
  checked: boolean;
  onChange: (checked: boolean) => void;
  label?: string;
  disabled?: boolean;
};

export function Toggle({
  checked,
  onChange,
  label = 'Reminder',
  disabled = false,
}: ToggleProps) {
  return (
    <label className="relative inline-flex h-5 w-8.5 shrink-0 cursor-pointer items-center has-disabled:cursor-not-allowed has-disabled:opacity-50">
      <input
        type="checkbox"
        role="switch"
        aria-label={label}
        checked={checked}
        disabled={disabled}
        onChange={(e) => onChange(e.target.checked)}
        className="peer sr-only"
      />
      <span
        aria-hidden="true"
        className="absolute inset-0 rounded-full bg-border transition-colors duration-fast peer-checked:bg-accent peer-focus-visible:ring-2 peer-focus-visible:ring-ring peer-focus-visible:ring-offset-2 peer-focus-visible:ring-offset-canvas"
      />
      <span
        aria-hidden="true"
        className="pointer-events-none absolute left-0.5 size-4 rounded-full bg-white shadow-sm transition-transform duration-base peer-checked:translate-x-3.5"
      />
    </label>
  );
}
