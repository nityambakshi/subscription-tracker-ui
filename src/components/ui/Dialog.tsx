import { useEffect, useRef } from 'react';

type DialogProps = {
  open: boolean;
  onClose: () => void;
  title: string;
  subtitle?: string;
  children: React.ReactNode;
};

function Dialog({ open, onClose, title, subtitle, children }: DialogProps) {
  const dialogRef = useRef<HTMLDialogElement>(null);

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;

    if (open && !dialog.open) dialog.showModal();
    if (!open && dialog.open) dialog.close();
  }, [open]);

  return (
    <dialog
      ref={dialogRef}
      onClose={onClose}
      className="fixed inset-0 m-auto h-fit w-full max-w-md rounded-xl border border-border bg-surface p-0 text-fg shadow-elevated backdrop:bg-black/50"
    >
      <div className="flex items-center justify-between border-b border-border px-6 py-4">
        <div className="flex flex-col gap-1">
          <h2 id={title} className="font-semibold text-body">
            {title}
          </h2>
          {subtitle && <p className="text-sm text-fg-muted">{subtitle}</p>}
        </div>
        <button
          type="button"
          onClick={onClose}
          aria-label="Close"
          className="rounded-md px-2 text-heading leading-none text-fg-muted hover:bg-surface-2 hover:text-fg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring cursor-pointer"
        >
          ×
        </button>
      </div>

      <div className="px-6 py-5">{children}</div>
    </dialog>
  );
}

export default Dialog;
