import { api } from "@/lib/api";
import type { Subscription } from "@/types/Subscription";

export const SubscriptionApi = {
    list: () => (
        api.get<Subscription[]>("/subscriptions").then(response => response.data)
    ),
    create: (data: Omit<Subscription, "id">) => (
        api.post<void>("/subscriptions", data).then(response => response.data)
    )
}