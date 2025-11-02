/**
 * AlliedOffsets API Client
 * 
 * Implements integration with AlliedOffsets API for:
 * - Wide project catalog discovery
 * - Credit information
 * - Historical pricing data
 * - Corporate buyer data
 * - Bulk exports for full refreshes
 * 
 * Features:
 * - Comprehensive project metadata enrichment
 * - Bulk export support for full sync
 * - Rate limiting and retry logic
 * - Response caching
 * - Structured logging
 */

import axios, { AxiosInstance, AxiosError } from 'axios';
import type { AlliedOffsets } from '../../types/index.js';

export interface AlliedOffsetsConfig {
  apiUrl: string;
  apiKey: string;
  timeout?: number;
  maxRetries?: number;
  cacheTTL?: number;
}

export class AlliedOffsetsClient {
  private client: AxiosInstance;
  private config: AlliedOffsetsConfig;
  private cache: Map<string, { data: any; expires: number }>;

  constructor(config: AlliedOffsetsConfig) {
    this.config = {
      timeout: 60000, // Longer timeout for bulk operations
      maxRetries: 3,
      cacheTTL: 300000, // 5 minutes default
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

    // Request interceptor
    this.client.interceptors.request.use((config) => {
      console.log({
        msg: 'AlliedOffsets API request',
        method: config.method,
        url: config.url,
        params: config.params,
      });
      return config;
    });

    // Response interceptor
    this.client.interceptors.response.use(
      (response) => {
        console.log({
          msg: 'AlliedOffsets API response',
          status: response.status,
          url: response.config.url,
          recordCount: Array.isArray(response.data) ? response.data.length : undefined,
        });
        return response;
      },
      (error) => {
        console.error({
          msg: 'AlliedOffsets API error',
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
   * Fetch projects with filters
   */
  async getProjects(params?: {
    registry?: string;
    country?: string;
    methodology?: string;
    page?: number;
    limit?: number;
  }): Promise<AlliedOffsets.Project[]> {
    const cacheKey = `projects:${JSON.stringify(params)}`;
    const cached = this.getFromCache(cacheKey);
    if (cached) return cached;

    const response = await this.retryRequest(() =>
      this.client.get('/projects', { params })
    );

    this.setCache(cacheKey, response.data, this.config.cacheTTL!);
    return response.data;
  }

  /**
   * Fetch a single project by ID
   */
  async getProject(projectId: string): Promise<AlliedOffsets.Project> {
    const cacheKey = `project:${projectId}`;
    const cached = this.getFromCache(cacheKey);
    if (cached) return cached;

    const response = await this.retryRequest(() =>
      this.client.get(`/projects/${projectId}`)
    );

    this.setCache(cacheKey, response.data, this.config.cacheTTL! * 2);
    return response.data;
  }

  /**
   * Fetch credits for a project
   */
  async getCredits(params?: {
    projectId?: string;
    vintage?: number;
    page?: number;
    limit?: number;
  }): Promise<AlliedOffsets.Credit[]> {
    const cacheKey = `credits:${JSON.stringify(params)}`;
    const cached = this.getFromCache(cacheKey);
    if (cached) return cached;

    const response = await this.retryRequest(() =>
      this.client.get('/credits', { params })
    );

    this.setCache(cacheKey, response.data, this.config.cacheTTL!);
    return response.data;
  }

  /**
   * Fetch historical prices
   */
  async getHistoricalPrices(params?: {
    projectId?: string;
    startDate?: string;
    endDate?: string;
  }): Promise<AlliedOffsets.HistoricalPrice[]> {
    const cacheKey = `prices:${JSON.stringify(params)}`;
    const cached = this.getFromCache(cacheKey);
    if (cached) return cached;

    const response = await this.retryRequest(() =>
      this.client.get('/prices/historical', { params })
    );

    this.setCache(cacheKey, response.data, this.config.cacheTTL!);
    return response.data;
  }

  /**
   * Fetch project images
   */
  async getProjectImages(projectId: string): Promise<string[]> {
    const cacheKey = `images:${projectId}`;
    const cached = this.getFromCache(cacheKey);
    if (cached) return cached;

    const response = await this.retryRequest(() =>
      this.client.get(`/projects/${projectId}/images`)
    );

    this.setCache(cacheKey, response.data, this.config.cacheTTL! * 10);
    return response.data;
  }

  /**
   * Fetch corporate buyers data
   */
  async getCorporateBuyers(params?: {
    projectId?: string;
    year?: number;
  }): Promise<any[]> {
    const response = await this.retryRequest(() =>
      this.client.get('/corporates', { params })
    );

    return response.data;
  }

  /**
   * Bulk Export - Full projects export
   * This is the key endpoint for nightly full sync
   */
  async bulkExportProjects(): Promise<AlliedOffsets.Project[]> {
    console.log({ msg: 'Starting bulk export of projects' });

    const response = await this.retryRequest(() =>
      this.client.get('/exports/projects', {
        timeout: 300000, // 5 minutes for bulk export
      })
    );

    console.log({
      msg: 'Bulk export completed',
      recordCount: response.data.length,
    });

    return response.data;
  }

  /**
   * Bulk Export - Full credits export
   */
  async bulkExportCredits(): Promise<AlliedOffsets.Credit[]> {
    console.log({ msg: 'Starting bulk export of credits' });

    const response = await this.retryRequest(() =>
      this.client.get('/exports/credits', {
        timeout: 300000,
      })
    );

    console.log({
      msg: 'Bulk export completed',
      recordCount: response.data.length,
    });

    return response.data;
  }

  /**
   * Bulk Export - Full prices export
   */
  async bulkExportPrices(): Promise<AlliedOffsets.HistoricalPrice[]> {
    console.log({ msg: 'Starting bulk export of prices' });

    const response = await this.retryRequest(() =>
      this.client.get('/exports/prices', {
        timeout: 300000,
      })
    );

    console.log({
      msg: 'Bulk export completed',
      recordCount: response.data.length,
    });

    return response.data;
  }

  /**
   * Bulk Export - Corporate buyers
   */
  async bulkExportCorporates(): Promise<any[]> {
    console.log({ msg: 'Starting bulk export of corporates' });

    const response = await this.retryRequest(() =>
      this.client.get('/exports/corporates', {
        timeout: 300000,
      })
    );

    console.log({
      msg: 'Bulk export completed',
      recordCount: response.data.length,
    });

    return response.data;
  }

  /**
   * Search project documents (PDD digitization)
   */
  async searchDocuments(query: string): Promise<any[]> {
    const response = await this.retryRequest(() =>
      this.client.post('/documents/search', { query })
    );

    return response.data;
  }

  /**
   * Extract tables from project documents
   */
  async extractDocumentTables(documentId: string): Promise<any> {
    const response = await this.retryRequest(() =>
      this.client.get(`/documents/${documentId}/tables`)
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

      // Exponential backoff with jitter
      const baseDelay = Math.pow(2, attempt - 1) * 1000;
      const jitter = Math.random() * 1000;
      const delay = baseDelay + jitter;
      
      console.warn({
        msg: 'AlliedOffsets API retry',
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

  clearCache(): void {
    this.cache.clear();
  }

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
      await this.client.get('/projects', { 
        params: { limit: 1 },
        timeout: 5000 
      });
      return true;
    } catch {
      return false;
    }
  }
}
