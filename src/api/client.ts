import axios from 'axios';

const BASE_URL = '/api/v1';

export const api = axios.create({
  baseURL: BASE_URL,
  withCredentials: true,
  timeout: 15_000,
  headers: { 'Content-Type': 'application/json' },
});
