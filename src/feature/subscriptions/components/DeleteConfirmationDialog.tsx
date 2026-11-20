import { Button } from '@/components/ui/Button';
import Dialog, { DialogBody, DialogFooter } from '@/components/ui/Dialog';
import { useDeleteSubscription } from '../hooks';
import type { Subscription } from '../types';

type DeleteConfirmationDialogProps = {
  open: boolean;
  onClose: () => void;
  subscription: Subscription;
};

function DeleteConfirmationDialog({
  open,
  onClose,
  subscription,
}: DeleteConfirmationDialogProps) {
  const { mutateAsync: deleteSubscription } = useDeleteSubscription();

  const handleDelete = async (subscription: Subscription) => {
    try {
      await deleteSubscription(subscription.id);
      onClose();
    } catch (error) {
      console.log('Error deleting subscription:', error);
    }
  };

  return (
    <Dialog
      open={open}
      onClose={onClose}
      title="Delete subscription"
      id="delete-confirmation-dialog"
    >
      <DialogBody>
        <p className="text-body text-fg">
          Are you sure you want to delete subscription "{subscription.name}"?
        </p>
      </DialogBody>

      <DialogFooter>
        <Button variant="secondary" onClick={onClose}>
          Cancel
        </Button>
        <Button variant="danger" onClick={() => handleDelete(subscription)}>
          Delete
        </Button>
      </DialogFooter>
    </Dialog>
  );
}

export default DeleteConfirmationDialog;
