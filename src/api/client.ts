import axios, { type InternalAxiosRequestConfig } from 'axios';
import { tokenStore } from './token-store';
import { queryClient } from './query-client';

const BASE_URL = '/api//v1';

export const api = axios.create({
  baseURL: BASE_URL,
  withCredentials: true,
  timeout: 15_000,
  headers: { 'Content-Type': 'application/json' },
});

// api.interceptors.request.use((config: InternalAxiosRequestConfig) => {
//   const token = tokenStore.get();
//   if (token) {
//     config.headers.Authorization = `Bearer ${token}`;
//   }
//   return config;
// });

api.interceptors.response.use(
  (response) => response,
  (error) => {
    const isAuthCall = error.config?.url?.includes('/auth/');

    if (error.response?.status === 401 && !isAuthCall) {
      tokenStore.clear();
      queryClient.clear();
      window.location.assign('/login');
    }

    return Promise.reject(error);
  }
);
