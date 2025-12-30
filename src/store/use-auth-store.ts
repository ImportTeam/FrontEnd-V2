import { create } from "zustand";

interface User {
  id: string;
  name: string;
  email: string;
}

interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  login: (user: User) => void;
  logout: () => void;
}

/**
 * Zustand Auth Store (Server Action 호환)
 * - localStorage 제거 (Server Action에서 사용 불가)
 * - 토큰은 HttpOnly Cookie로 관리
 * - 클라이언트 UI 상태만 동기화
 */
export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  isAuthenticated: false,
  login: (user) => set({ user, isAuthenticated: true }),
  logout: () => set({ user: null, isAuthenticated: false }),
}));
