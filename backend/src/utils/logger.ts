/**
 * Structured logging with Pino
 * Provides request ID tracking and context
 */

import pino from 'pino';
import { config } from '../config/index.js';

export const logger = pino({
  level: config.logLevel,
  formatters: {
    level: (label) => {
      return { level: label };
    },
  },
  transport: process.env.NODE_ENV !== 'production' ? {
    target: 'pino-pretty',
    options: {
      colorize: true,
      translateTime: 'HH:MM:ss.l',
      ignore: 'pid,hostname',
    },
  } : undefined,
  base: {
    env: process.env.NODE_ENV || 'development',
  },
});

/**
 * Create child logger with context
 */
export function createLogger(context: Record<string, any>) {
  return logger.child(context);
}

/**
 * Log with request context
 */
export function logRequest(requestId: string, method: string, path: string) {
  return logger.child({ requestId, method, path });
}

export default logger;
