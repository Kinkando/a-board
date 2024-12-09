import axios from 'axios';
import config from '@/config/config';
import { JWT } from '@/core/@types/authen';

const instance = axios.create({
  baseURL: config.apiHost,
  timeout: 1000 * 30,
  headers: {
    'Content-Type': 'application/json',
  },
});

export async function login(username: string) {
  const { data } = await instance.request<JWT>({
    url: '/auth/login',
    method: 'POST',
    data: { username },
    headers: {
      'X-Api-Key': config.apiKey,
    },
  });
  return data;
}

export async function refreshToken(refreshToken: string) {
  const { data } = await instance.request<JWT>({
    url: '/auth/token/refresh',
    method: 'POST',
    data: { refreshToken },
  });
  return data;
}
