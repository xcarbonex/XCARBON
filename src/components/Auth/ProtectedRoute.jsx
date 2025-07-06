import React, { useEffect } from "react";
import { Navigate, useLocation } from "react-router-dom";
import useAuthStore from "../../store/authStore";

const ProtectedRoute = ({
  children,
  requiredRole = null,
  requiredRoles = [],
  redirectTo = "/login",
}) => {
  const location = useLocation();
  const { isAuthenticated, user, isLoading, initializeAuth, getCurrentUser } =
    useAuthStore();

  useEffect(() => {
    // Initialize auth state on component mount
    if (!isAuthenticated && !isLoading) {
      initializeAuth();
    }
  }, [isAuthenticated, isLoading, initializeAuth]);

  useEffect(() => {
    // Refresh user data if authenticated but no user data
    if (isAuthenticated && !user && !isLoading) {
      getCurrentUser();
    }
  }, [isAuthenticated, user, isLoading, getCurrentUser]);

  // Show loading spinner while checking authentication
  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  // Redirect to login if not authenticated
  if (!isAuthenticated) {
    return <Navigate to={redirectTo} state={{ from: location }} replace />;
  }

  // Check role-based access if required
  if (requiredRole || requiredRoles.length > 0) {
    const userRole = user?.role;

    // Check single required role
    if (requiredRole && userRole !== requiredRole) {
      return (
        <div className="min-h-screen flex items-center justify-center">
          <div className="text-center">
            <h1 className="text-2xl font-bold text-gray-900 mb-4">
              Access Denied
            </h1>
            <p className="text-gray-600 mb-4">
              You don't have permission to access this page.
            </p>
            <p className="text-sm text-gray-500">
              Required role: {requiredRole}
            </p>
          </div>
        </div>
      );
    }

    // Check multiple required roles
    if (requiredRoles.length > 0 && !requiredRoles.includes(userRole)) {
      return (
        <div className="min-h-screen flex items-center justify-center">
          <div className="text-center">
            <h1 className="text-2xl font-bold text-gray-900 mb-4">
              Access Denied
            </h1>
            <p className="text-gray-600 mb-4">
              You don't have permission to access this page.
            </p>
            <p className="text-sm text-gray-500">
              Required roles: {requiredRoles.join(", ")}
            </p>
          </div>
        </div>
      );
    }
  }

  // Render protected content
  return children;
};

export default ProtectedRoute;
