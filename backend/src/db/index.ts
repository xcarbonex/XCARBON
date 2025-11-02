/**
 * PostgreSQL database connection and query utilities
 */

import pg from 'pg';
import { config } from '../config/index.js';
import logger from '../utils/logger.js';

const { Pool } = pg;

export class Database {
  private static pool: pg.Pool | null = null;

  static initialize(): pg.Pool {
    if (this.pool) {
      return this.pool;
    }

    this.pool = new Pool({
      connectionString: config.database.url,
      max: config.database.poolSize,
      idleTimeoutMillis: 30000,
      connectionTimeoutMillis: 10000,
    });

    // Error handling
    this.pool.on('error', (err) => {
      logger.error({ err }, 'Unexpected database pool error');
    });

    this.pool.on('connect', () => {
      logger.debug('New database connection established');
    });

    logger.info({ poolSize: config.database.poolSize }, 'Database pool initialized');

    return this.pool;
  }

  static getPool(): pg.Pool {
    if (!this.pool) {
      return this.initialize();
    }
    return this.pool;
  }

  static async query<T = any>(text: string, params?: any[]): Promise<pg.QueryResult<T>> {
    const pool = this.getPool();
    const start = Date.now();
    
    try {
      const result = await pool.query<T>(text, params);
      const duration = Date.now() - start;
      
      logger.debug({
        query: text.substring(0, 100),
        duration,
        rows: result.rowCount,
      }, 'Database query executed');
      
      return result;
    } catch (error) {
      logger.error({
        err: error,
        query: text.substring(0, 100),
        params,
      }, 'Database query failed');
      throw error;
    }
  }

  static async getClient(): Promise<pg.PoolClient> {
    const pool = this.getPool();
    return pool.connect();
  }

  static async transaction<T>(
    callback: (client: pg.PoolClient) => Promise<T>
  ): Promise<T> {
    const client = await this.getClient();
    
    try {
      await client.query('BEGIN');
      logger.debug('Transaction started');
      
      const result = await callback(client);
      
      await client.query('COMMIT');
      logger.debug('Transaction committed');
      
      return result;
    } catch (error) {
      await client.query('ROLLBACK');
      logger.error({ err: error }, 'Transaction rolled back');
      throw error;
    } finally {
      client.release();
    }
  }

  static async healthCheck(): Promise<boolean> {
    try {
      const result = await this.query('SELECT 1 as health');
      return result.rows[0]?.health === 1;
    } catch (error) {
      logger.error({ err: error }, 'Database health check failed');
      return false;
    }
  }

  static async close(): Promise<void> {
    if (this.pool) {
      await this.pool.end();
      this.pool = null;
      logger.info('Database pool closed');
    }
  }
}

/**
 * Query builder helpers
 */
export class QueryBuilder {
  private conditions: string[] = [];
  private params: any[] = [];
  private paramIndex = 1;

  where(condition: string, value: any): this {
    this.conditions.push(condition);
    this.params.push(value);
    this.paramIndex++;
    return this;
  }

  whereIn(column: string, values: any[]): this {
    if (values.length === 0) return this;
    
    const placeholders = values.map((_, i) => `$${this.paramIndex + i}`).join(', ');
    this.conditions.push(`${column} IN (${placeholders})`);
    this.params.push(...values);
    this.paramIndex += values.length;
    return this;
  }

  whereLike(column: string, value: string): this {
    this.conditions.push(`${column} ILIKE $${this.paramIndex}`);
    this.params.push(`%${value}%`);
    this.paramIndex++;
    return this;
  }

  whereRange(column: string, min?: any, max?: any): this {
    if (min !== undefined) {
      this.conditions.push(`${column} >= $${this.paramIndex}`);
      this.params.push(min);
      this.paramIndex++;
    }
    if (max !== undefined) {
      this.conditions.push(`${column} <= $${this.paramIndex}`);
      this.params.push(max);
      this.paramIndex++;
    }
    return this;
  }

  build(): { where: string; params: any[] } {
    return {
      where: this.conditions.length > 0 ? `WHERE ${this.conditions.join(' AND ')}` : '',
      params: this.params,
    };
  }
}

/**
 * Pagination helper
 */
export interface PaginationParams {
  page?: number;
  limit?: number;
}

export interface PaginatedResult<T> {
  data: T[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}

export function buildPagination(params: PaginationParams): { limit: number; offset: number } {
  const page = Math.max(1, params.page || 1);
  const limit = Math.min(100, Math.max(1, params.limit || 10));
  const offset = (page - 1) * limit;
  
  return { limit, offset };
}

export function createPaginatedResult<T>(
  data: T[],
  total: number,
  page: number,
  limit: number
): PaginatedResult<T> {
  return {
    data,
    total,
    page,
    limit,
    totalPages: Math.ceil(total / limit),
  };
}

export default Database;
