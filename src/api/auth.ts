import { api } from './client';

export type User = {
  userId?: string;
  username: string;
  fullName: string;
};

export type LoginRequest = {
  email: string;
  password: string;
};

export type SignupRequest = {
  fullName: string;
  email: string;
  password: string;
};

export const authApi = {
  login: (body: LoginRequest) =>
    api.post<User>('/auth/login', body).then((r) => r.data),

  signup: (body: SignupRequest) =>
    api.post<User>('/auth/signup', body).then((r) => r.data),

  logout: () => api.post<void>('/auth/logout').then((r) => r.data),

  me: () => api.get<User>('/auth/me').then((r) => r.data),
};
