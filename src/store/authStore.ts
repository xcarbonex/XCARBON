import { create } from "zustand";
import { persist } from "zustand/middleware";
import authService from "../services/authService";
import { withDevtools } from "./withDevtools";
import type { User, RegisterRequest } from "@/types/api";

interface AuthState {
  user: User | null;
  token: string | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  error: string | null;
  login: (
    email: string,
    password: string
  ) => Promise<{ success: boolean; message?: string }>;
  register: (
    userData: RegisterRequest
  ) => Promise<{ success: boolean; message?: string }>;
  logout: () => Promise<{ success: boolean; message?: string }>;
  refreshToken: () => Promise<{ success: boolean; message?: string }>;
  getCurrentUser: () => Promise<{
    success: boolean;
    data?: User;
    message?: string;
  }>;
  initializeAuth: () => void;
  clearError: () => void;
  updateUser: (userData: Partial<User>) => void;
  hasRole: (role: string) => boolean;
  hasAnyRole: (roles: string[]) => boolean;
}

const useAuthStore = create<AuthState>()(
  withDevtools(
    persist(
      (set, get): AuthState => ({
        // State
        user: null,
        token: null,
        isAuthenticated: false,
        isLoading: false,
        error: null,

        // Actions
        login: async (email: string, password: string) => {
          set({ isLoading: true, error: null });

          try {
            const result = await authService.login(email, password);

            if (result.success && result.data) {
              set({
                user: result.data.user,
                token: result.data.token,
                isAuthenticated: true,
                isLoading: false,
                error: null,
              });
              return { success: true, message: result.message };
            } else {
              set({
                isLoading: false,
                error: result.message,
              });
              return { success: false, message: result.message };
            }
          } catch (error) {
            const errorMessage =
              error instanceof Error ? error.message : "Login failed";
            set({
              isLoading: false,
              error: errorMessage,
            });
            return { success: false, message: errorMessage };
          }
        },

        register: async (userData: RegisterRequest) => {
          set({ isLoading: true, error: null });

          try {
            const result = await authService.register(userData);

            if (result.success && result.data) {
              set({
                user: result.data.user,
                token: result.data.token,
                isAuthenticated: true,
                isLoading: false,
                error: null,
              });
              return { success: true, message: result.message };
            } else {
              set({
                isLoading: false,
                error: result.message,
              });
              return { success: false, message: result.message };
            }
          } catch (error) {
            const errorMessage =
              error instanceof Error ? error.message : "Registration failed";
            set({
              isLoading: false,
              error: errorMessage,
            });
            return { success: false, message: errorMessage };
          }
        },

        logout: async () => {
          set({ isLoading: true });

          try {
            await authService.logout();
            set({
              user: null,
              token: null,
              isAuthenticated: false,
              isLoading: false,
              error: null,
            });
            return { success: true, message: "Logged out successfully" };
          } catch {
            // Even if logout API fails, clear local state
            set({
              user: null,
              token: null,
              isAuthenticated: false,
              isLoading: false,
              error: null,
            });
            return { success: true, message: "Logged out successfully" };
          }
        },

        refreshToken: async () => {
          try {
            const result = await authService.refreshToken();

            if (result.success && result.data) {
              set({
                token: result.data.token,
                error: null,
              });
              return { success: true };
            } else {
              // If refresh fails, logout user
              get().logout();
              return { success: false, message: result.message };
            }
          } catch (error) {
            get().logout();
            const message =
              error instanceof Error ? error.message : "Token refresh failed";
            return { success: false, message };
          }
        },

        getCurrentUser: async () => {
          set({ isLoading: true });

          try {
            const result = await authService.getCurrentUser();

            if (result.success && result.data) {
              set({
                user: result.data,
                isLoading: false,
                error: null,
              });
              return { success: true, data: result.data };
            } else {
              set({
                isLoading: false,
                error: result.message,
              });
              return { success: false, message: result.message };
            }
          } catch (error) {
            const errorMessage =
              error instanceof Error ? error.message : "Failed to get user data";
            set({
              isLoading: false,
              error: errorMessage,
            });
            return { success: false, message: errorMessage };
          }
        },

        // Initialize auth state from localStorage
        initializeAuth: () => {
          const isAuthenticated = authService.isAuthenticated();
          const user = authService.getStoredUser();
          const token = authService.getStoredToken();

          if (isAuthenticated && user && token) {
            set({
              user,
              token,
              isAuthenticated: true,
              error: null,
            });
          } else {
            // Clear any partial data
            authService.clearAuthData();
            set({
              user: null,
              token: null,
              isAuthenticated: false,
              error: null,
            });
          }
        },

        // Clear error
        clearError: () => {
          set({ error: null });
        },

        // Update user profile
        updateUser: (userData: Partial<User>) => {
          const currentUser = get().user;
          const updatedUser = { ...currentUser, ...userData } as User;

          set({ user: updatedUser });
          localStorage.setItem("user", JSON.stringify(updatedUser));
        },

        // Check if user has specific role
        hasRole: (role: string) => {
          const user = get().user;
          return user?.role === role;
        },

        // Check if user has any of the specified roles
        hasAnyRole: (roles: string[]) => {
          const user = get().user;
          return user?.role ? roles.includes(user.role) : false;
        },
      }),
      {
        name: "auth-storage",
        partialize: (state) => ({
          user: state.user,
          token: state.token,
          isAuthenticated: state.isAuthenticated,
        }),
      }
    ),
    "AuthStore"
  )
);

export default useAuthStore;
