import axios, { AxiosError, type InternalAxiosRequestConfig } from 'axios';
import { queryClient } from './query-client';
import { queryKeys } from './query-keys';

const BASE_URL = '/api/v1';

export const api = axios.create({
  baseURL: BASE_URL,
  withCredentials: true,
  timeout: 15_000,
  headers: { 'Content-Type': 'application/json' },
});

const NO_REFRESH_PATHS = [
  '/auth/login',
  '/auth/signup',
  '/auth/refresh',
  '/auth/logout',
];

type RetryableConfig = InternalAxiosRequestConfig & { _retry?: boolean };

let refreshInFlight: Promise<void> | null = null;

function refreshSession(): Promise<void> {
  if (!refreshInFlight) {
    refreshInFlight = axios
      .post(`${BASE_URL}/auth/refresh`, null, { withCredentials: true })
      .then(() => undefined)
      .finally(() => (refreshInFlight = null));
  }

  return refreshInFlight;
}

function endSession() {
  queryClient.clear();
  queryClient.setQueryData(queryKeys.me, null);

  if (window.location.pathname !== '/login') {
    window.location.replace('/login');
  }
}

api.interceptors.response.use(
  (response) => response,
  async (error: AxiosError) => {
    const originalErrorConfig = error.config as RetryableConfig | undefined;
    const originalUrl = originalErrorConfig?.url ?? '';

    const shouldTryRefresh =
      error.response?.status === 401 &&
      originalErrorConfig !== undefined &&
      !originalErrorConfig._retry &&
      !NO_REFRESH_PATHS.some((path) => originalUrl.includes(path));

    if (!shouldTryRefresh || !originalErrorConfig) {
      return Promise.reject(error);
    }

    originalErrorConfig._retry = true;

    try {
      await refreshSession();
      return api(originalErrorConfig);
    } catch {
      endSession();
      return Promise.reject(error);
    }
  }
);
