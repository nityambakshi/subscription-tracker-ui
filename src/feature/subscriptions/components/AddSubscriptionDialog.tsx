import { Button } from '@/components/ui/Button';
import ButtonGroup from '@/components/ui/ButtonGroup';
import Dialog, { DialogBody, DialogFooter } from '@/components/ui/Dialog';
import { FormField } from '@/components/ui/FormField';
import { Input } from '@/components/ui/Input';
import Select from '@/components/ui/Select';
import { useAddSubscription, useSubscriptions } from '../hooks';
import { addSubscriptionSchema, type AddSubscriptionForm } from '../schema';
import type { Subscription } from '../types';
import { findBrandKey, iconsBySubscription } from '../utils/brand-icons';
import { zodResolver } from '@hookform/resolvers/zod';
import { Controller, useForm, useWatch, type Control } from 'react-hook-form';
import { LuStore } from 'react-icons/lu';
import { useState } from 'react';

const currencyOptions = [
  { id: 'inr', label: 'INR' },
  { id: 'usd', label: 'USD' },
];

const billingCycleOptions =
  addSubscriptionSchema.shape.billingCycle.options.map((cycle) => ({
    id: cycle,
    label: cycle,
  }));

const categoryOptions = addSubscriptionSchema.shape.category.options.map(
  (category) => ({ id: category, label: category })
);

type AddSubscriptionDialogProps = {
  open: boolean;
  onClose: () => void;
};

function AddSubscriptionDialog({ open, onClose }: AddSubscriptionDialogProps) {
  return (
    <Dialog
      open={open}
      onClose={onClose}
      title="Add subscription"
      id="add-subscription-dialog"
    >
      <AddSubscriptionFormContent onClose={onClose} />
    </Dialog>
  );
}

function AddSubscriptionFormContent({ onClose }: { onClose: () => void }) {
  const [error, setError] = useState('');
  const { mutateAsync: addSubscription } = useAddSubscription();
  const { data: subscriptionsList } = useSubscriptions();

  const {
    register,
    control,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<AddSubscriptionForm>({
    resolver: zodResolver(addSubscriptionSchema),
    defaultValues: {
      name: '',
      currency: 'inr',
      billingCycle: 'Monthly',
      category: 'Entertainment',
    },
  });

  const onSubmit = async (formData: AddSubscriptionForm) => {
    const subscriptionName = formData.name.trim().toLowerCase();
    setError('');

    if (
      subscriptionsList?.some(
        (subscription) => subscription.name.toLowerCase() === subscriptionName
      )
    ) {
      setError(`Subscription details for ${subscriptionName} already added.`);
      return;
    }

    const payload: Omit<Subscription, 'id'> = {
      name: formData.name.trim(),
      amount: formData.amount,
      currency: formData.currency,
      cycle: formData.billingCycle,
      category: formData.category,
      renewsOn: formData.renewsOn.toISOString(),
      logoKey: findBrandKey(formData.name),
      reminderOn: true,
    };

    try {
      await addSubscription(payload);
      onClose();
    } catch {
      setError('Could not add this subscription. Please try again.');
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} noValidate>
      <DialogBody>
        <div className="flex flex-col gap-4">
          <FormField
            id="subscription-name"
            label="Subscription name"
            error={errors.name?.message}
            required
          >
            <div className="grid w-full grid-cols-[auto_minmax(0,1fr)] items-center gap-3">
              <BrandIcon control={control} />
              <Input
                {...register('name')}
                className="w-full"
                type="text"
                placeholder="e.g. Netflix"
                autoFocus
              />
            </div>
          </FormField>

          <div className="flex gap-3">
            <FormField
              id="subscription-amount"
              label="Amount"
              error={errors.amount?.message}
              className="flex-1"
              required
            >
              <Input
                {...register('amount', { valueAsNumber: true })}
                type="number"
                inputMode="decimal"
                min={0}
                step="0.01"
                placeholder="0.00"
                className="text-right"
              />
            </FormField>
            <FormField
              id="currency-select"
              label="Currency"
              error={errors.currency?.message}
              className="w-30"
            >
              <Select {...register('currency')} options={currencyOptions} />
            </FormField>
          </div>

          <FormField
            id="billing-cycle"
            label="Billing cycle"
            error={errors.billingCycle?.message}
          >
            <Controller
              control={control}
              name="billingCycle"
              render={({ field }) => (
                <ButtonGroup
                  options={billingCycleOptions}
                  value={field.value}
                  onChange={field.onChange}
                />
              )}
            />
          </FormField>

          <FormField
            id="category-select"
            label="Category"
            error={errors.category?.message}
          >
            <Select {...register('category')} options={categoryOptions} />
          </FormField>

          <FormField
            id="renews-on"
            label="Renews on"
            error={errors.renewsOn?.message}
            required
          >
            <Input
              {...register('renewsOn', { valueAsDate: true })}
              type="date"
            />
          </FormField>
        </div>

        <p className="text-small text-danger">{error}</p>
      </DialogBody>

      <DialogFooter>
        <Button variant="secondary" onClick={onClose}>
          Cancel
        </Button>
        <Button type="submit" disabled={isSubmitting}>
          Add subscription
        </Button>
      </DialogFooter>
    </form>
  );
}

function BrandIcon({ control }: { control: Control<AddSubscriptionForm> }) {
  const name = useWatch({ control, name: 'name' });
  const brand = iconsBySubscription[findBrandKey(name)];
  const Icon = brand?.logo ?? LuStore;

  return (
    <Icon size={32} color={brand?.color ?? 'currentColor'} aria-hidden="true" />
  );
}

export default AddSubscriptionDialog;
