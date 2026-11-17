import { useState, type ButtonHTMLAttributes } from 'react';

const activeClasses = 'bg-inverse text-inverse-fg hover:opacity-90';
const inactiveClasses = 'bg-surface text-fg hover:bg-surface-2';

type Button = {
  id: string;
  label: string;
  onClick: () => void;
  type: ButtonHTMLAttributes<HTMLButtonElement>['type'];
};

type ButtonGroupProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  buttons: Button[];
  label?: string;
  className?: string;
};

function ButtonGroup({ buttons, label, className = '' }: ButtonGroupProps) {
  const [active, setActive] = useState<string | null>(buttons[0]?.id || null);

  const handleClick = (id: string) => {
    setActive(id);
    buttons.find((button) => button.id === id)?.onClick();
  };

  return (
    <div className="flex flex-col gap-1.5">
      {label && <div className="text-label font-medium text-fg">{label}</div>}
      <div className="flex h-10 rounded-md border border-border p-[3px] items-stretch bg-surface">
        {buttons.map((button) => {
          const isActive = active === button.id;

          return (
            <button
              type={button.type}
              key={button.id}
              aria-pressed={isActive}
              aria-label={button.label}
              onClick={() => handleClick(button.id)}
              className={[
                'flex-1 px-4 items-center justify-center rounded-sm',
                'text-body font-medium transition-colors duration-fast',
                'disabled:cursor-not-allowed disabled:opacity-50',
                'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring',
                'cursor-pointer',
                isActive ? activeClasses : inactiveClasses,
                className,
              ].join(' ')}
            >
              {button.label}
            </button>
          );
        })}
      </div>
    </div>
  );
}

export default ButtonGroup;
