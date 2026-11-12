export type Subscription = {
    id: string;
    name: string;
    logoKey: string;
    category: string;
    amount: number;
    currency: string;
    cycle: BillingCycle;
    renewsOn: string;
    reminderOn: boolean;
}

export type BillingCycle = "MONTHLY" | "YEARLY";