import { create } from "zustand";
import { persist } from "zustand/middleware";
import authService from "../services/authService";

const useAuthStore = create(
  persist(
    (set, get) => ({
      // State
      user: null,
      token: null,
      isAuthenticated: false,
      isLoading: false,
      error: null,

      // Actions
      login: async (email, password) => {
        set({ isLoading: true, error: null });

        try {
          const result = await authService.login(email, password);

          if (result.success) {
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
          const errorMessage = error.message || "Login failed";
          set({
            isLoading: false,
            error: errorMessage,
          });
          return { success: false, message: errorMessage };
        }
      },

      register: async (userData) => {
        set({ isLoading: true, error: null });

        try {
          const result = await authService.register(userData);

          if (result.success) {
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
          const errorMessage = error.message || "Registration failed";
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
        } catch (error) {
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

          if (result.success) {
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
          return { success: false, message: error.message };
        }
      },

      getCurrentUser: async () => {
        set({ isLoading: true });

        try {
          const result = await authService.getCurrentUser();

          if (result.success) {
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
          const errorMessage = error.message || "Failed to get user data";
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
      updateUser: (userData) => {
        const currentUser = get().user;
        const updatedUser = { ...currentUser, ...userData };

        set({ user: updatedUser });
        localStorage.setItem("user", JSON.stringify(updatedUser));
      },

      // Check if user has specific role
      hasRole: (role) => {
        const user = get().user;
        return user?.role === role;
      },

      // Check if user has any of the specified roles
      hasAnyRole: (roles) => {
        const user = get().user;
        return roles.includes(user?.role);
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
  )
);

export default useAuthStore;
