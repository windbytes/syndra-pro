import { create } from 'zustand';

export interface AuthState {
  roleId: string;
  isLogin: boolean;
  setRoleId: (roleId: string) => void;
  setIsLogin: (isLogin: boolean) => void;
}

/**
 * 认证状态（Zustand）
 *
 * 维护登录用户、Token、过期时间、登录态等核心认证状态，
 * 是 AuthProvider 与守卫的核心数据源。
 */
export const useAuthStore = create<AuthState>((set) => ({
  roleId: '',
  isLogin: false,
  setRoleId: (roleId) => set({ roleId }),
  setIsLogin: (isLogin) => set({ isLogin }),
}));
