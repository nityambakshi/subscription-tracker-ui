import z from 'zod';

export const addSubscriptionSchema = z.object({
  name: z.string().trim().min(1, 'Name is required'),
  amount: z
    .number({ error: 'Amount is required' })
    .positive('Amount must be greater than 0'),
  currency: z.enum(['inr', 'usd']),
  billingCycle: z.enum(['Monthly', 'Yearly']),
  category: z.enum(['Entertainment', 'Productivity', 'Utilities', 'Others']),
  renewsOn: z.date({ error: 'Renewal date is required' }),
});

export type AddSubscriptionForm = z.infer<typeof addSubscriptionSchema>;
