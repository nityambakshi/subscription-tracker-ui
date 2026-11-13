const REFRESH_KEY = 'recur.refreshToken';

let accessToken: string | null = null;

export const tokenStore = {
  getAccess: () => accessToken,
  getRefresh: () => localStorage.getItem(REFRESH_KEY),
  set: (access: string, refresh: string) => {
    accessToken = access;
    localStorage.setItem(REFRESH_KEY, refresh);
  },
  clear: () => {
    accessToken = null;
    localStorage.removeItem(REFRESH_KEY);
  },
};
