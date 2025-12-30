/**
 * Base Axios Configuration
 * Shared configuration for both server and client instances
 */

import axios from 'axios';

// Base URL handling
const RAW_API_URL = process.env.NEXT_PUBLIC_API_URL;
const API_BASE_URL = (RAW_API_URL ?? '').replace(/\/$/, '');
const ENDS_WITH_API = API_BASE_URL.endsWith('/api');

export function apiPath(pathname: string): string {
  const normalized = pathname.startsWith('/') ? pathname : `/${pathname}`;
  if (ENDS_WITH_API) {
    return normalized;
  }
  return `/api${normalized}`;
}

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
