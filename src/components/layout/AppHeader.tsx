import AddSubscriptionDialog from '@/feature/subscriptions/components/AddSubscriptionDialog';
import { Button } from '../ui/Button';
import { Input } from '../ui/Input';
import { useState } from 'react';

type AppHeaderProps = {
  message: string;
  caption: string;
  search: string;
  onSearchChange: (search: string) => void;
};

function AppHeader({
  message,
  caption,
  search,
  onSearchChange,
}: AppHeaderProps) {
  const [dialogOpen, setDialogOpen] = useState(false);

  return (
    <>
      <header className="flex items-center justify-between gap-4">
        <div className="flex flex-col gap-1">
          <h1 className="text-heading font-semibold tracking-heading text-fg">
            {message}
          </h1>
          <p className="text-body text-fg-muted">{caption}</p>
        </div>
        <div className="flex items-center gap-2.5">
          <Input
            type="search"
            className="w-55"
            aria-label="Search subscriptions"
            placeholder="Search subscriptions"
            value={search}
            onChange={(e) => onSearchChange(e.target.value)}
          />
          <Button onClick={() => setDialogOpen(true)}>
            + Add subscription
          </Button>
        </div>
      </header>

      <AddSubscriptionDialog
        open={dialogOpen}
        onClose={() => setDialogOpen(false)}
      />
    </>
  );
}

export default AppHeader;
