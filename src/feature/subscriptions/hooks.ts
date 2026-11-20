import { queryKeys } from '@/api/query-keys';
import { subscriptionsApi } from './api';
import type { Subscription } from './types';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';

export function useSubscriptions() {
  return useQuery({
    queryKey: queryKeys.subscriptions.list(),
    queryFn: subscriptionsApi.list,
  });
}

export function useSetReminder() {
  const queryClient = useQueryClient();
  const listKey = queryKeys.subscriptions.list();

  return useMutation({
    mutationFn: async ({
      subscriptionId,
      reminderOn,
    }: {
      subscriptionId: string;
      reminderOn: boolean;
    }) => subscriptionsApi.setReminder(subscriptionId, reminderOn),
    onMutate: async ({ subscriptionId, reminderOn }) => {
      await queryClient.cancelQueries({ queryKey: listKey });

      const previousSubscriptions =
        queryClient.getQueryData<Subscription[]>(listKey);

      queryClient.setQueryData<Subscription[]>(listKey, (old) =>
        old?.map((subscription) =>
          subscription.id === subscriptionId
            ? { ...subscription, reminderOn }
            : subscription
        )
      );

      return { previousSubscriptions };
    },
    onError: (_error, _variables, context) => {
      if (context?.previousSubscriptions) {
        queryClient.setQueryData(listKey, context.previousSubscriptions);
      }
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.subscriptions.all });
    },
  });
}

export function useAddSubscription() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: subscriptionsApi.add,
    onSuccess: () =>
      queryClient.invalidateQueries({
        queryKey: queryKeys.subscriptions.list(),
      }),
  });
}

export function useDeleteSubscription() {
  const queryClient = useQueryClient();
  const listKey = queryKeys.subscriptions.list();

  return useMutation({
    mutationFn: subscriptionsApi.delete,
    onSuccess: () => queryClient.invalidateQueries({ queryKey: listKey }),
  });
}
