import { Panel } from './Panel';
import type { NavItem } from '../../types/types';
import { NavLink, useNavigate } from 'react-router';
import { Button } from '../ui/Button';
import { useLogout } from '@/hooks/auth-hooks';

const sideNavOptions: NavItem[] = [
  { id: 'overview', label: 'Overview', to: '/' },
  { id: 'subscriptions', label: 'Subscriptions', to: '/subscriptions' },
  { id: 'calendar', label: 'Calendar', to: '/calendar' },
  { id: 'insights', label: 'Insights', to: '/insights' },
  { id: 'settings', label: 'Settings', to: '/settings' },
];

const navItemClass =
  'rounded-md px-2.5 py-2 text-body text-fg-muted transition-colors duration-fast hover:bg-surface-2 hover:text-fg hover:cursor-pointer';
const activeNavItemClass = 'bg-accent-soft text-accent font-semibold';

function Sidebar() {
  const { mutate: logout, isPending } = useLogout();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout(undefined, {
      onSettled: () => navigate('/login', { replace: true }),
    });
  };

  return (
    <Panel side="left" size="sidebar">
      <h1 className="text-heading font-semibold tracking-tight text-fg">
        Recur
      </h1>

      <div className="flex flex-1 flex-col gap-1">
        {sideNavOptions.map((option) => (
          <NavLink
            to={option.to}
            key={option.id}
            className={({ isActive }) =>
              isActive ? `${navItemClass} ${activeNavItemClass}` : navItemClass
            }
          >
            {option.label}
          </NavLink>
        ))}
      </div>

      <div className="flex flex-col gap-1 rounded-lg bg-surface-2 p-3">
        <p className="text-label font-semibold">Monthly Budget</p>
        <p className="text-small text-fg-muted">$92 of $180. 51% used</p>
      </div>

      <Button
        variant="secondary"
        fullWidth
        onClick={handleLogout}
        disabled={isPending}
      >
        {isPending ? 'Signing out…' : 'Sign out'}
      </Button>
    </Panel>
  );
}

export default Sidebar;
