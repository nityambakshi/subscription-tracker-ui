import { QueryClient } from '@tanstack/react-query';

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 5 * 60_000, // 2 minutes: remounting doesn't refetch
      refetchOnWindowFocus: false,
      retry: 1,
    },
  },
});
