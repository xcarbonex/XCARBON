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
  name?: string;
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

export interface RegisterRequest {
  email: string;
  password: string;
  name?: string;
  firstName?: string;
  lastName?: string;
  [key: string]: unknown; // Allow additional fields
}

export interface LoginResponse {
  token: string;
  refreshToken?: string;
  user: User;
}

export interface RegisterResponse {
  token: string;
  refreshToken?: string;
  user: User;
}

export interface TokenResponse {
  token: string;
  refreshToken?: string;
  expiresIn?: number;
}

export interface RefreshTokenResponse {
  token: string;
  refreshToken?: string;
}

export interface AuthServiceResponse<T = unknown> {
  success: boolean;
  data?: T;
  message?: string;
}

export interface LogoutResponse {
  success: boolean;
  message: string;
}

// Dashboard types
export interface CarbonCredit {
  id: string;
  project_name: string;
  vintage: string | number;
  quantity: number;
  price: number;
  issuance_year?: string | number;
  project_ID?: string;
  registry_name?: string;
  [key: string]: unknown; // Allow additional fields
}

export interface News {
  id: string;
  title: string;
  content: string;
  source: string;
  category?: string;
  date?: string;
}

export interface ContractTerm {
  id: string;
  term: string;
  value: string | number;
}

export interface BuyCarbonCreditResponse {
  success: boolean;
  message: string;
}

// Wallet types
export interface WalletBalance {
  currency: string;
  balance: number;
  [key: string]: unknown;
}

export interface Transaction {
  id: string;
  type: string;
  amount: number;
  currency: string;
  date: string;
  status: string;
  [key: string]: unknown;
}

// Portfolio types
export interface PortfolioAsset {
  id: string;
  name: string;
  type: string;
  quantity: number;
  value: number;
  [key: string]: unknown;
}

// Notification types
export interface Notification {
  id: string;
  title: string;
  message: string;
  type: string;
  read: boolean;
  date: string;
  [key: string]: unknown;
}

// Settings types
export interface UserSettings {
  theme?: string;
  language?: string;
  currency?: string;
  notifications?: boolean;
  [key: string]: unknown;
}

// Membership types
export interface MembershipPlan {
  id: string;
  name: string;
  price: number;
  features: string[];
  [key: string]: unknown;
}

// Asset types
export interface TokenizedAsset {
  id: string;
  name: string;
  symbol?: string;
  quantity: number;
  status: string;
  [key: string]: unknown;
}

export interface RegistryAsset {
  id: string;
  registry_name: string;
  project_name: string;
  vintage: string | number;
  quantity: number;
  [key: string]: unknown;
}

// List Assets Service types
export interface SaleTokenizedAsset {
  id: string;
  tokenizedAssetId: string;
  quantity: number;
  pricePerUnit: number;
  listingDate: string;
  status: string;
}

export interface ListAssetsInput {
  tokenizedAssetId: string;
  quantity: number;
  pricePerUnit: number;
  [key: string]: unknown;
}

export interface ListedAsset {
  id: string;
  tokenizedAssetId: string;
  quantity: number;
  pricePerUnit: number;
  listingDate: string;
  status: string;
}

// Registry Assets Service types
export interface CcAsset {
  registry_id: string;
  project_name: string;
  project_type: string;
  issuance_year: string;
  token_traces: string;
  location: string;
  certification_status: string;
  verification_body: string;
  serial_number_range: string;
  project_location_map: string;
  sdg_impact_tags: string;
  project_verified: boolean;
  registry_documentation_URL: string;
  token_quantity_at_issuance: number;
  remaining_quantity: number;
}

export interface CcAssetsParams {
  registryId?: string;
  vintage?: string;
  goldStandard?: boolean;
  climateActionReserve?: boolean;
  [key: string]: string | boolean | undefined;
}

export interface TokenizedCcData {
  asset_ID: string;
  project_name: string;
  project_type: string;
  vintage_issuance_year: string;
  token_id: string;
  available_balance: number;
  price_per_unit: number;
}

// Minting Carbon Assets Service types
export interface MintCarbonCreditInput {
  registryId: string;
  projectName: string;
  quantity: number;
  [key: string]: unknown;
}

export interface MintCarbonCreditResponse {
  success: boolean;
  message: string;
}

export interface GasFees {
  amount: number;
  currency: string;
}

// Withdraw Tokenized Carbon Credit Service types
export interface AssetDetail {
  project_id: string;
  project_name: string;
  type: string;
  total_available_asset: number;
  registry_vintage_year: string;
  symbol: string;
  additional_info: string;
  asset_withdraw_status: string;
}

export interface WithdrawAssetInput {
  assetId: string;
  quantity: number;
  withdrawalAddress: string;
  [key: string]: unknown;
}

export interface WithdrawAssetsResponse {
  success: boolean;
  message: string;
}
