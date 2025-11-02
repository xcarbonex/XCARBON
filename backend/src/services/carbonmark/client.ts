/**
 * Carbonmark API Client
 * 
 * Implements integration with Carbonmark API for:
 * - Project discovery
 * - Product listings
 * - Price queries
 * - Quote creation
 * - Order submission
 * 
 * Features:
 * - Versioned API endpoints
 * - Automatic retry with exponential backoff
 * - Response caching
 * - Idempotency support
 * - Structured logging
 */

import axios, { AxiosInstance, AxiosError } from 'axios';
import type { Carbonmark } from '../../types/index.js';

export interface CarbonmarkConfig {
  apiUrl: string;
  apiKey: string;
  testMode: boolean;
  timeout?: number;
  maxRetries?: number;
  cacheTTL?: number;
}

export class CarbonmarkClient {
  private client: AxiosInstance;
  private config: CarbonmarkConfig;
  private cache: Map<string, { data: any; expires: number }>;

  constructor(config: CarbonmarkConfig) {
    this.config = {
      timeout: 30000,
      maxRetries: 3,
      cacheTTL: 60000, // 1 minute default
      ...config,
    };

    this.cache = new Map();

    this.client = axios.create({
      baseURL: config.apiUrl,
      timeout: this.config.timeout,
      headers: {
        'Authorization': `Bearer ${config.apiKey}`,
        'Content-Type': 'application/json',
        'User-Agent': 'XCARBON-Backend/1.0',
      },
    });

    // Request interceptor for logging
    this.client.interceptors.request.use((config) => {
      console.log({
        msg: 'Carbonmark API request',
        method: config.method,
        url: config.url,
        params: config.params,
      });
      return config;
    });

    // Response interceptor for logging
    this.client.interceptors.response.use(
      (response) => {
        console.log({
          msg: 'Carbonmark API response',
          status: response.status,
          url: response.config.url,
        });
        return response;
      },
      (error) => {
        console.error({
          msg: 'Carbonmark API error',
          status: error.response?.status,
          url: error.config?.url,
          error: error.message,
          data: error.response?.data,
        });
        return Promise.reject(error);
      }
    );
  }

  /**
   * Fetch carbon projects with filters
   */
  async getCarbonProjects(params?: {
    country?: string;
    category?: string;
    vintage?: string;
    search?: string;
    page?: number;
    pageSize?: number;
  }): Promise<Carbonmark.CarbonProject[]> {
    const cacheKey = `projects:${JSON.stringify(params)}`;
    const cached = this.getFromCache(cacheKey);
    if (cached) return cached;

    const response = await this.retryRequest(() =>
      this.client.get('/carbonProjects', { params })
    );

    this.setCache(cacheKey, response.data, this.config.cacheTTL!);
    return response.data;
  }

  /**
   * Fetch a single carbon project by key
   */
  async getCarbonProject(projectKey: string): Promise<Carbonmark.CarbonProject> {
    const cacheKey = `project:${projectKey}`;
    const cached = this.getFromCache(cacheKey);
    if (cached) return cached;

    const response = await this.retryRequest(() =>
      this.client.get(`/carbonProjects/${projectKey}`)
    );

    this.setCache(cacheKey, response.data, this.config.cacheTTL! * 2);
    return response.data;
  }

  /**
   * Fetch index products (MCO2, CCO2, etc.)
   */
  async getProducts(): Promise<Carbonmark.Product[]> {
    const cacheKey = 'products';
    const cached = this.getFromCache(cacheKey);
    if (cached) return cached;

    const response = await this.retryRequest(() =>
      this.client.get('/products')
    );

    this.setCache(cacheKey, response.data, this.config.cacheTTL! * 5);
    return response.data;
  }

  /**
   * Fetch prices for projects or products
   */
  async getPrices(params: {
    projectIds?: string[];
    productIds?: string[];
  }): Promise<Carbonmark.Price[]> {
    if (!params.projectIds?.length && !params.productIds?.length) {
      throw new Error('Must provide projectIds or productIds');
    }

    const cacheKey = `prices:${JSON.stringify(params)}`;
    const cached = this.getFromCache(cacheKey);
    if (cached) return cached;

    const queryParams: any = {};
    if (params.projectIds) {
      queryParams.project_ids = params.projectIds.join(',');
    }
    if (params.productIds) {
      queryParams.product_ids = params.productIds.join(',');
    }

    const response = await this.retryRequest(() =>
      this.client.get('/prices', { params: queryParams })
    );

    // Short TTL for price data
    this.setCache(cacheKey, response.data, 30000); // 30 seconds
    return response.data;
  }

  /**
   * Create a retirement quote
   * @param request Quote request with asset source and quantity
   * @param idempotencyKey Unique key for idempotent operation
   */
  async createQuote(
    request: Carbonmark.QuoteRequest,
    idempotencyKey: string
  ): Promise<Carbonmark.QuoteResponse> {
    const response = await this.retryRequest(() =>
      this.client.post('/quotes', request, {
        headers: {
          'Idempotency-Key': idempotencyKey,
        },
      })
    );

    return response.data;
  }

  /**
   * Create a retirement order
   * @param request Order request with quote UUID and beneficiary details
   * @param idempotencyKey Unique key for idempotent operation
   */
  async createOrder(
    request: Carbonmark.OrderRequest,
    idempotencyKey: string
  ): Promise<Carbonmark.OrderResponse> {
    const response = await this.retryRequest(() =>
      this.client.post('/orders', request, {
        headers: {
          'Idempotency-Key': idempotencyKey,
        },
      })
    );

    return response.data;
  }

  /**
   * Get order status
   */
  async getOrder(orderId: string): Promise<Carbonmark.OrderResponse> {
    const response = await this.retryRequest(() =>
      this.client.get(`/orders/${orderId}`)
    );

    return response.data;
  }

  /**
   * Retry logic with exponential backoff
   */
  private async retryRequest<T>(
    requestFn: () => Promise<T>,
    attempt = 1
  ): Promise<T> {
    try {
      return await requestFn();
    } catch (error) {
      if (attempt >= this.config.maxRetries!) {
        throw error;
      }

      const axiosError = error as AxiosError;
      
      // Don't retry client errors (4xx) except 429
      if (
        axiosError.response?.status &&
        axiosError.response.status >= 400 &&
        axiosError.response.status < 500 &&
        axiosError.response.status !== 429
      ) {
        throw error;
      }

      // Exponential backoff: 1s, 2s, 4s
      const delay = Math.pow(2, attempt - 1) * 1000;
      
      console.warn({
        msg: 'Carbonmark API retry',
        attempt,
        delay,
        error: axiosError.message,
      });

      await this.sleep(delay);
      return this.retryRequest(requestFn, attempt + 1);
    }
  }

  /**
   * Cache management
   */
  private getFromCache(key: string): any | null {
    const cached = this.cache.get(key);
    if (!cached) return null;

    if (Date.now() > cached.expires) {
      this.cache.delete(key);
      return null;
    }

    return cached.data;
  }

  private setCache(key: string, data: any, ttl: number): void {
    this.cache.set(key, {
      data,
      expires: Date.now() + ttl,
    });
  }

  /**
   * Clear all cache
   */
  clearCache(): void {
    this.cache.clear();
  }

  /**
   * Clear specific cache entry
   */
  clearCacheEntry(key: string): void {
    this.cache.delete(key);
  }

  private sleep(ms: number): Promise<void> {
    return new Promise((resolve) => setTimeout(resolve, ms));
  }

  /**
   * Health check
   */
  async healthCheck(): Promise<boolean> {
    try {
      await this.client.get('/products', { timeout: 5000 });
      return true;
    } catch {
      return false;
    }
  }
}
