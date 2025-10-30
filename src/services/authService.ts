import apiClient from "./apiClient";
import type {
  User,
  LoginResponse,
  RegisterRequest,
  RegisterResponse,
  RefreshTokenResponse,
  AuthServiceResponse,
  LogoutResponse,
} from "@/types/api";

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
  private apiClient = apiClient;

  // Login user
  async login(email: string, password: string): Promise<AuthServiceResponse<LoginResponse>> {
    try {
      let response: LoginResponse;

      if (this.apiClient.type === "GRAPHQL") {
        const result = await this.apiClient.request<{ login: LoginResponse }>({
          query: GRAPHQL_QUERIES.LOGIN,
          variables: { email, password },
        });
        response = result.login;
      } else {
        response = await this.apiClient.request<LoginResponse>({
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
        message: error instanceof Error ? error.message : "Login failed",
      };
    }
  }

  // Register user
  async register(userData: RegisterRequest): Promise<AuthServiceResponse<RegisterResponse>> {
    try {
      let response: RegisterResponse;

      if (this.apiClient.type === "GRAPHQL") {
        const result = await this.apiClient.request<{ register: RegisterResponse }>({
          query: GRAPHQL_QUERIES.REGISTER,
          variables: { input: userData },
        });
        response = result.register;
      } else {
        response = await this.apiClient.request<RegisterResponse>({
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
        message: error instanceof Error ? error.message : "Registration failed",
      };
    }
  }

  // Refresh token
  async refreshToken(): Promise<AuthServiceResponse<RefreshTokenResponse>> {
    try {
      const refreshToken = localStorage.getItem("refreshToken");
      if (!refreshToken) {
        throw new Error("No refresh token available");
      }

      let response: RefreshTokenResponse;

      if (this.apiClient.type === "GRAPHQL") {
        const result = await this.apiClient.request<{ refreshToken: RefreshTokenResponse }>({
          query: GRAPHQL_QUERIES.REFRESH_TOKEN,
          variables: { refreshToken },
        });
        response = result.refreshToken;
      } else {
        response = await this.apiClient.request<RefreshTokenResponse>({
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
        message: error instanceof Error ? error.message : "Token refresh failed",
      };
    }
  }

  // Get current user
  async getCurrentUser(): Promise<AuthServiceResponse<User>> {
    try {
      let response: User;

      if (this.apiClient.type === "GRAPHQL") {
        const result = await this.apiClient.request<{ me: User }>({
          query: GRAPHQL_QUERIES.GET_USER,
        });
        response = result.me;
      } else {
        response = await this.apiClient.request<User>({
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
        message: error instanceof Error ? error.message : "Failed to get user data",
      };
    }
  }

  // Logout user
  async logout(): Promise<LogoutResponse> {
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
      console.warn(
        "Logout API call failed:",
        error instanceof Error ? error.message : "Unknown error"
      );
    } finally {
      // Clear local storage
      this.clearAuthData();
    }

    return {
      success: true,
      message: "Logged out successfully",
    };
  }

  // Set authentication data
  setAuthData(data: LoginResponse | RegisterResponse): void {
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
  clearAuthData(): void {
    localStorage.removeItem("authToken");
    localStorage.removeItem("refreshToken");
    localStorage.removeItem("user");
  }

  // Check if user is authenticated
  isAuthenticated(): boolean {
    const token = localStorage.getItem("authToken");
    const user = localStorage.getItem("user");
    return !!(token && user);
  }

  // Get stored user data
  getStoredUser(): User | null {
    try {
      const user = localStorage.getItem("user");
      return user ? (JSON.parse(user) as User) : null;
    } catch (error) {
      console.error("Error parsing stored user data:", error);
      return null;
    }
  }

  // Get stored token
  getStoredToken(): string | null {
    return localStorage.getItem("authToken");
  }
}

const authService = new AuthService();
export default authService;
