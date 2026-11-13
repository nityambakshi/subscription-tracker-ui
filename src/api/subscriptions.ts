import { api } from './client';
import type { Subscription } from '@/types/Subscription';

export const subscriptionsApi = {
  list: () => api.get<Subscription[]>('/subscriptions').then((r) => r.data),
};
