/**
 * Common API types and interfaces
 */

// API Response wrapper
export interface ApiResponse<T = unknown> {
  data?: T;
  message?: string;
  status?: number;
  success?: boolean;
}

// API Error
export interface ApiError {
  message: string;
  status: number;
  data?: unknown;
}

// API Request Config for REST
export interface RestRequestConfig {
  method?: "GET" | "POST" | "PUT" | "DELETE" | "PATCH";
  url: string;
  data?: unknown;
  params?: Record<string, string | number | boolean>;
}

// API Request Config for GraphQL
export interface GraphQLRequestConfig {
  query: string;
  variables?: Record<string, unknown>;
}

// Combined Request Config
export type RequestConfig = RestRequestConfig | GraphQLRequestConfig;

// Pagination
export interface PaginationParams {
  page?: number;
  limit?: number;
  offset?: number;
}

export interface PaginatedResponse<T> {
  data: T[];
  total: number;
  page: number;
  limit: number;
  hasMore: boolean;
}

// User types
export interface User {
  id: string;
  email: string;
  firstName?: string;
  lastName?: string;
  role?: string;
  avatar?: string;
  createdAt?: string;
  updatedAt?: string;
}

// Auth types
export interface LoginRequest {
  email: string;
  password: string;
}

export interface LoginResponse {
  token: string;
  refreshToken?: string;
  user: User;
}

export interface SignupRequest {
  email: string;
  password: string;
  firstName?: string;
  lastName?: string;
}

export interface TokenResponse {
  token: string;
  refreshToken?: string;
  expiresIn?: number;
}
