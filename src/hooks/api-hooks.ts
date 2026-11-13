import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { subscriptionsApi } from '@/api/subscriptions';
import { queryKeys } from '@/api/query-keys';
import { authApi, type LoginRequest, type User } from '@/api/auth';
import { isAxiosError } from 'axios';

export function useSubscriptions() {
  return useQuery({
    queryKey: queryKeys.subscriptions.list(),
    queryFn: subscriptionsApi.list,
  });
}

export function useLogin() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (body: LoginRequest) => authApi.login(body),

    onSuccess: (user) => {
      // Drop anything cached from a previous user, then store the new one
      queryClient.clear();
      queryClient.setQueryData(queryKeys.me, user);
    },
  });
}

export function useMe() {
  return useQuery({
    queryKey: queryKeys.me,
    queryFn: async (): Promise<User | null> => {
      try {
        return await authApi.me();
      } catch (err) {
        // 401 means "not logged in": a normal answer, so return null instead of an error
        if (isAxiosError(err) && err.response?.status === 401) return null;
        throw err;
      }
    },
    retry: false,
    staleTime: 5 * 60_000,
  });
}
