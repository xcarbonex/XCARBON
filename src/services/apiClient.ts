import axios, { AxiosInstance, AxiosRequestConfig } from "axios";
import type { ApiError, GraphQLRequestConfig, RestRequestConfig } from "@/types/api";

// Configuration for API type
const getEnvVar = (key: string, defaultValue: string): string => {
  try {
    return import.meta.env[key] || defaultValue;
  } catch {
    return defaultValue;
  }
};

interface APIConfig {
  type: "REST" | "GRAPHQL";
  baseURL: string;
  graphqlEndpoint: string;
}

const API_CONFIG: APIConfig = {
  type: getEnvVar("VITE_API_TYPE", "REST") as "REST" | "GRAPHQL",
  baseURL: getEnvVar("VITE_API_BASE_URL", "http://localhost:3001"),
  graphqlEndpoint: getEnvVar("VITE_GRAPHQL_ENDPOINT", "/graphql"),
};

// REST API Client
const restClient: AxiosInstance = axios.create({
  baseURL: API_CONFIG.baseURL,
  timeout: 10000,
  headers: {
    "Content-Type": "application/json",
  },
});

// GraphQL Client
const graphqlClient: AxiosInstance = axios.create({
  baseURL: API_CONFIG.baseURL,
  timeout: 10000,
  headers: {
    "Content-Type": "application/json",
  },
});

// Request interceptor to add auth token
const addAuthInterceptor = (client: AxiosInstance): void => {
  client.interceptors.request.use(
    (config) => {
      const token = localStorage.getItem("authToken");
      if (token && config.headers) {
        config.headers.Authorization = `Bearer ${token}`;
      }
      return config;
    },
    (error) => Promise.reject(error)
  );
};

// Response interceptor for error handling
const addResponseInterceptor = (client: AxiosInstance): void => {
  client.interceptors.response.use(
    (response) => response,
    (error) => {
      if (error.response?.status === 401) {
        // Token expired or invalid
        localStorage.removeItem("authToken");
        localStorage.removeItem("refreshToken");
        localStorage.removeItem("user");
        window.location.href = "/login";
      }
      return Promise.reject(error);
    }
  );
};

// Apply interceptors
addAuthInterceptor(restClient);
addAuthInterceptor(graphqlClient);
addResponseInterceptor(restClient);
addResponseInterceptor(graphqlClient);

// GraphQL query builder
interface GraphQLQuery {
  query: string;
  variables?: Record<string, unknown>;
}

const buildGraphQLQuery = (
  query: string,
  variables: Record<string, unknown> = {}
): GraphQLQuery => ({
  query,
  variables,
});

// API Client Factory
class ApiClient {
  private type: "REST" | "GRAPHQL";

  constructor() {
    this.type = API_CONFIG.type;
  }

  // Generic request method
  async request<T = unknown>(config: RestRequestConfig | GraphQLRequestConfig): Promise<T> {
    try {
      if (this.type === "GRAPHQL" && "query" in config) {
        return await this.graphqlRequest<T>(config);
      } else if ("url" in config) {
        return await this.restRequest<T>(config);
      }
      throw new Error("Invalid request configuration");
    } catch (error) {
      throw this.handleError(error);
    }
  }

  // REST API request
  async restRequest<T = unknown>({
    method = "GET",
    url,
    data,
    params,
  }: RestRequestConfig): Promise<T> {
    const response = await restClient({
      method,
      url,
      data,
      params,
    } as AxiosRequestConfig);
    return response.data as T;
  }

  // GraphQL request
  async graphqlRequest<T = unknown>({ query, variables }: GraphQLRequestConfig): Promise<T> {
    const response = await graphqlClient.post<{
      data: T;
      errors?: Array<{ message: string }>;
    }>(API_CONFIG.graphqlEndpoint, buildGraphQLQuery(query, variables));

    if (response.data.errors) {
      throw new Error(response.data.errors[0].message);
    }

    return response.data.data;
  }

  // Error handler
  handleError(error: unknown): ApiError {
    if (axios.isAxiosError(error)) {
      if (error.response) {
        // Server responded with error status
        return {
          message: error.response.data?.message || error.message,
          status: error.response.status,
          data: error.response.data,
        };
      } else if (error.request) {
        // Network error
        return {
          message: "Network error. Please check your connection.",
          status: 0,
        };
      }
    }
    // Other error
    return {
      message: error instanceof Error ? error.message : "An unexpected error occurred",
      status: -1,
    };
  }

  // Switch API type dynamically
  switchApiType(type: "REST" | "GRAPHQL"): void {
    if (["REST", "GRAPHQL"].includes(type)) {
      this.type = type;
    }
  }
}

const apiClient = new ApiClient();
export default apiClient;
export { API_CONFIG };
