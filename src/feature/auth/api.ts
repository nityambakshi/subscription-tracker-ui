import { api } from '@/api/client';
import type { LoginRequest, SignupRequest, User } from './types';

export const authApi = {
  login: (body: LoginRequest) =>
    api.post<User>('/auth/login', body).then((r) => r.data),

  signup: (body: SignupRequest) =>
    api.post<User>('/auth/signup', body).then((r) => r.data),

  logout: () => api.post<void>('/auth/logout').then((r) => r.data),

  me: () => api.get<User>('/auth/me').then((r) => r.data),
};
