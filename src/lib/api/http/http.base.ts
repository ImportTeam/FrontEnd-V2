/**
 * Base Axios Configuration
 * Shared configuration for both server and client instances
 */

import axios from 'axios';

// Base URL from environment (e.g., https://api.picsel.kr/api)
const API_BASE_URL = (process.env.NEXT_PUBLIC_API_BASE_URL ?? 'https://api.picsel.kr/api').replace(/\/$/, '');

export function createBaseAxiosInstance(baseURL = API_BASE_URL) {
  return axios.create({
    baseURL,
    timeout: 10000,
    headers: {
      'Content-Type': 'application/json',
    },
  });
}

export const DEFAULT_API_BASE_URL = API_BASE_URL;
