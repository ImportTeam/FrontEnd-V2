/**
 * Base Axios Configuration
 * Shared configuration for both server and client instances
 */

import axios from 'axios';

// Base URL handling
const RAW_API_URL = process.env.NEXT_PUBLIC_API_URL;
const API_BASE_URL = (RAW_API_URL ?? '').replace(/\/$/, '');
const HAS_API_SEGMENT = /\/api(\/|$)/.test(API_BASE_URL);

export function apiPath(pathname: string): string {
  const normalized = pathname.startsWith('/') ? pathname : `/${pathname}`;
  if (HAS_API_SEGMENT) {
    return normalized;
  }
  return `/api${normalized}`;
}

function normalizeAxiosBaseURL(baseURL: string): string {
  const trimmed = (baseURL ?? '').replace(/\/$/, '');
  if (!trimmed) return '';
  if (/\/api(\/|$)/.test(trimmed)) return trimmed;
  return `${trimmed}/api`;
}

export function createBaseAxiosInstance(baseURL = API_BASE_URL) {
  return axios.create({
    baseURL: normalizeAxiosBaseURL(baseURL),
    timeout: 10000,
    headers: {
      'Content-Type': 'application/json',
    },
  });
}

export const DEFAULT_API_BASE_URL = API_BASE_URL;
