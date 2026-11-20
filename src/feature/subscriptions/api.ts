import { api } from '@/api/client';
import type { Subscription } from './types';

export const subscriptionsApi = {
  list: () => api.get<Subscription[]>('/subscriptions').then((r) => r.data),
  setReminder: (subscriptionId: string, reminderOn: boolean) =>
    api
      .patch<void>(`/subscriptions/${subscriptionId}/reminder`, { reminderOn })
      .then((r) => r.data),
  add: (subscription: Omit<Subscription, 'id'>) =>
    api.post<Subscription>('/subscriptions', subscription).then((r) => r.data),
  delete: (subscriptionId: string) =>
    api.delete<void>(`/subscriptions/${subscriptionId}`).then((r) => r.data),
};
