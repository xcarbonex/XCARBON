import apiClient from "./apiClient";

// GraphQL Queries and Mutations
const GRAPHQL_QUERIES = {
  LOGIN: `
    mutation Login($email: String!, $password: String!) {
      login(email: $email, password: $password) {
        token
        refreshToken
        user {
          id
          email
          name
          role
          avatar
        }
      }
    }
  `,

  REGISTER: `
    mutation Register($input: RegisterInput!) {
      register(input: $input) {
        token
        refreshToken
        user {
          id
          email
          name
          role
          avatar
        }
      }
    }
  `,

  REFRESH_TOKEN: `
    mutation RefreshToken($refreshToken: String!) {
      refreshToken(refreshToken: $refreshToken) {
        token
        refreshToken
      }
    }
  `,

  GET_USER: `
    query GetUser {
      me {
        id
        email
        name
        role
        avatar
      }
    }
  `,

  LOGOUT: `
    mutation Logout {
      logout {
        success
        message
      }
    }
  `,
};

// REST API Endpoints
const REST_ENDPOINTS = {
  LOGIN: "/auth/login",
  REGISTER: "/auth/register",
  REFRESH_TOKEN: "/auth/refresh",
  GET_USER: "/auth/me",
  LOGOUT: "/auth/logout",
};

class AuthService {
  constructor() {
    this.apiClient = apiClient;
  }

  // Login user
  async login(email, password) {
    try {
      let response;

      if (this.apiClient.type === "GRAPHQL") {
        response = await this.apiClient.request({
          query: GRAPHQL_QUERIES.LOGIN,
          variables: { email, password },
        });
        response = response.login;
      } else {
        response = await this.apiClient.request({
          method: "POST",
          url: REST_ENDPOINTS.LOGIN,
          data: { email, password },
        });
      }

      if (response.token) {
        this.setAuthData(response);
        return {
          success: true,
          data: response,
          message: "Login successful",
        };
      }

      return {
        success: false,
        message: "Invalid credentials",
      };
    } catch (error) {
      return {
        success: false,
        message: error.message || "Login failed",
      };
    }
  }

  // Register user
  async register(userData) {
    try {
      let response;

      if (this.apiClient.type === "GRAPHQL") {
        response = await this.apiClient.request({
          query: GRAPHQL_QUERIES.REGISTER,
          variables: { input: userData },
        });
        response = response.register;
      } else {
        response = await this.apiClient.request({
          method: "POST",
          url: REST_ENDPOINTS.REGISTER,
          data: userData,
        });
      }

      if (response.token) {
        this.setAuthData(response);
        return {
          success: true,
          data: response,
          message: "Registration successful",
        };
      }

      return {
        success: false,
        message: "Registration failed",
      };
    } catch (error) {
      return {
        success: false,
        message: error.message || "Registration failed",
      };
    }
  }

  // Refresh token
  async refreshToken() {
    try {
      const refreshToken = localStorage.getItem("refreshToken");
      if (!refreshToken) {
        throw new Error("No refresh token available");
      }

      let response;

      if (this.apiClient.type === "GRAPHQL") {
        response = await this.apiClient.request({
          query: GRAPHQL_QUERIES.REFRESH_TOKEN,
          variables: { refreshToken },
        });
        response = response.refreshToken;
      } else {
        response = await this.apiClient.request({
          method: "POST",
          url: REST_ENDPOINTS.REFRESH_TOKEN,
          data: { refreshToken },
        });
      }

      if (response.token) {
        localStorage.setItem("authToken", response.token);
        if (response.refreshToken) {
          localStorage.setItem("refreshToken", response.refreshToken);
        }
        return {
          success: true,
          data: response,
        };
      }

      return {
        success: false,
        message: "Token refresh failed",
      };
    } catch (error) {
      this.logout();
      return {
        success: false,
        message: error.message || "Token refresh failed",
      };
    }
  }

  // Get current user
  async getCurrentUser() {
    try {
      let response;

      if (this.apiClient.type === "GRAPHQL") {
        response = await this.apiClient.request({
          query: GRAPHQL_QUERIES.GET_USER,
        });
        response = response.me;
      } else {
        response = await this.apiClient.request({
          method: "GET",
          url: REST_ENDPOINTS.GET_USER,
        });
      }

      return {
        success: true,
        data: response,
      };
    } catch (error) {
      return {
        success: false,
        message: error.message || "Failed to get user data",
      };
    }
  }

  // Logout user
  async logout() {
    try {
      // Call logout endpoint if available
      if (this.apiClient.type === "GRAPHQL") {
        await this.apiClient.request({
          query: GRAPHQL_QUERIES.LOGOUT,
        });
      } else {
        await this.apiClient.request({
          method: "POST",
          url: REST_ENDPOINTS.LOGOUT,
        });
      }
    } catch (error) {
      // Continue with logout even if API call fails
      console.warn("Logout API call failed:", error.message);
    } finally {
      // Clear local storage
      this.clearAuthData();
      return {
        success: true,
        message: "Logged out successfully",
      };
    }
  }

  // Set authentication data
  setAuthData(data) {
    if (data.token) {
      localStorage.setItem("authToken", data.token);
    }
    if (data.refreshToken) {
      localStorage.setItem("refreshToken", data.refreshToken);
    }
    if (data.user) {
      localStorage.setItem("user", JSON.stringify(data.user));
    }
  }

  // Clear authentication data
  clearAuthData() {
    localStorage.removeItem("authToken");
    localStorage.removeItem("refreshToken");
    localStorage.removeItem("user");
  }

  // Check if user is authenticated
  isAuthenticated() {
    const token = localStorage.getItem("authToken");
    const user = localStorage.getItem("user");
    return !!(token && user);
  }

  // Get stored user data
  getStoredUser() {
    try {
      const user = localStorage.getItem("user");
      return user ? JSON.parse(user) : null;
    } catch (error) {
      console.error("Error parsing stored user data:", error);
      return null;
    }
  }

  // Get stored token
  getStoredToken() {
    return localStorage.getItem("authToken");
  }
}

export default new AuthService();
