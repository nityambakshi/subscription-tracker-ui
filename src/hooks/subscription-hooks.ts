import { queryKeys } from "@/api/query-keys";
import { subscriptionsApi } from "@/api/subscriptions";
import { useQuery } from "@tanstack/react-query";

export function useSubscriptions() {
  return useQuery({
    queryKey: queryKeys.subscriptions.list(),
    queryFn: subscriptionsApi.list,
  });
}