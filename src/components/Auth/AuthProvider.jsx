import React, { useEffect } from "react";
import useAuthStore from "../../store/authStore";

const AuthProvider = ({ children }) => {
  const { initializeAuth, refreshToken, isAuthenticated } = useAuthStore();

  useEffect(() => {
    // Initialize authentication state on app startup
    initializeAuth();
  }, [initializeAuth]);

  useEffect(() => {
    // Set up token refresh interval if user is authenticated
    if (isAuthenticated) {
      const refreshInterval = setInterval(() => {
        refreshToken();
      }, 15 * 60 * 1000); // Refresh every 15 minutes

      return () => clearInterval(refreshInterval);
    }
  }, [isAuthenticated, refreshToken]);

  return children;
};

export default AuthProvider;
