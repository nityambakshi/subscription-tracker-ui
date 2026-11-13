export const queryKeys = {
  me: ['me'] as const,
  subscriptions: {
    all: ['subscriptions'] as const,
    list: () => ['subscriptions', 'list'] as const,
  },
};
