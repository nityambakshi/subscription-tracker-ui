import { api } from './client';
import type { Subscription } from '@/types/Subscription';

export const subscriptionsApi = {
  list: () => api.get<Subscription[]>('/subscriptions').then((r) => r.data),
  setReminder: (subscriptionId: string, reminderOn: boolean) =>
    api
      .patch<void>(`/subscriptions/${subscriptionId}/reminder`, { reminderOn })
      .then((r) => r.data),
};
