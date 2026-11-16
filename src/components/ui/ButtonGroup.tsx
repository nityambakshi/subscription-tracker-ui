import { useState, type ButtonHTMLAttributes } from 'react';

const activeClasses = 'bg-inverse text-inverse-fg hover:opacity-90';
const inactiveClasses = 'bg-surface text-fg hover:bg-surface-2';

type ButtonGroupProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  buttons: { id: string; label: string; onClick: () => void }[];
  label?: string;
};

function ButtonGroup({ buttons, label, ...props }: ButtonGroupProps) {
  const [active, setActive] = useState<string | null>(buttons[0]?.id || null);

  const handleClick = (id: string) => {
    setActive(id);
    buttons.find((button) => button.id === id)?.onClick();
  };

  return (
    <div className="flex flex-col gap-1.5">
      {label && <div className="text-label font-medium text-fg">{label}</div>}
      <div className="inline-flex rounded-md border border-border items-center shadow-md p-0.5">
        {buttons.map((button) => (
          <button
            key={button.id}
            onClick={() => handleClick(button.id)}
            className={[
              'px-4 h-9.5 items-center justify-center rounded-md',
              'text-body font-medium transition-colors duration-fast',
              'disabled:cursor-not-allowed disabled:opacity-50',
              'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring',
              'cursor-pointer',
              active === button.id ? activeClasses : inactiveClasses,
            ].join(' ')}
            {...props}
          >
            {button.label}
          </button>
        ))}
      </div>
    </div>
  );
}

export default ButtonGroup;
