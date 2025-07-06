import axios from "axios";

// Configuration for API type
const getEnvVar = (key, defaultValue) => {
  try {
    return process.env[key] || defaultValue;
  } catch {
    return defaultValue;
  }
};

const API_CONFIG = {
  type: getEnvVar("REACT_APP_API_TYPE", "REST"), // 'REST' or 'GRAPHQL'
  baseURL: getEnvVar("REACT_APP_API_BASE_URL", "http://localhost:3001"),
  graphqlEndpoint: getEnvVar("REACT_APP_GRAPHQL_ENDPOINT", "/graphql"),
};

// REST API Client
const restClient = axios.create({
  baseURL: API_CONFIG.baseURL,
  timeout: 10000,
  headers: {
    "Content-Type": "application/json",
  },
});

// GraphQL Client
const graphqlClient = axios.create({
  baseURL: API_CONFIG.baseURL,
  timeout: 10000,
  headers: {
    "Content-Type": "application/json",
  },
});

// Request interceptor to add auth token
const addAuthInterceptor = (client) => {
  client.interceptors.request.use(
    (config) => {
      const token = localStorage.getItem("authToken");
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
      return config;
    },
    (error) => Promise.reject(error)
  );
};

// Response interceptor for error handling
const addResponseInterceptor = (client) => {
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
const buildGraphQLQuery = (query, variables = {}) => ({
  query,
  variables,
});

// API Client Factory
class ApiClient {
  constructor() {
    this.type = API_CONFIG.type;
  }

  // Generic request method
  async request(config) {
    try {
      if (this.type === "GRAPHQL") {
        return await this.graphqlRequest(config);
      } else {
        return await this.restRequest(config);
      }
    } catch (error) {
      throw this.handleError(error);
    }
  }

  // REST API request
  async restRequest({ method = "GET", url, data, params }) {
    const response = await restClient({
      method,
      url,
      data,
      params,
    });
    return response.data;
  }

  // GraphQL request
  async graphqlRequest({ query, variables }) {
    const response = await graphqlClient.post(
      API_CONFIG.graphqlEndpoint,
      buildGraphQLQuery(query, variables)
    );

    if (response.data.errors) {
      throw new Error(response.data.errors[0].message);
    }

    return response.data.data;
  }

  // Error handler
  handleError(error) {
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
    } else {
      // Other error
      return {
        message: error.message || "An unexpected error occurred",
        status: -1,
      };
    }
  }

  // Switch API type dynamically
  switchApiType(type) {
    if (["REST", "GRAPHQL"].includes(type)) {
      this.type = type;
    }
  }
}

export default new ApiClient();
export { API_CONFIG };
