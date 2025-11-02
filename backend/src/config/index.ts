/**
 * Configuration management
 * Loads and validates environment variables
 */

import { z } from 'zod';
import type { AppConfig } from '../types/index.js';

const envSchema = z.object({
  // Database
  DATABASE_URL: z.string().url(),
  DATABASE_POOL_SIZE: z.string().transform(Number).pipe(z.number().min(1).max(100)).default('20'),

  // Redis
  REDIS_URL: z.string().url(),

  // Carbonmark
  CARBONMARK_API_URL: z.string().url(),
  CARBONMARK_API_KEY: z.string().min(1),
  CARBONMARK_TEST_MODE: z.string().transform(val => val === 'true').default('false'),

  // AlliedOffsets
  ALLIEDOFFSETS_API_URL: z.string().url(),
  ALLIEDOFFSETS_API_KEY: z.string().min(1),

  // EVM Chain
  CHAIN_RPC_URL: z.string().url(),
  CHAIN_ID: z.string().transform(Number).pipe(z.number()),
  COMPLIANCE_ANCHOR_ADDRESS: z.string().regex(/^0x[a-fA-F0-9]{40}$/).optional(),
  PROJECT_DIRECTORY_ADDRESS: z.string().regex(/^0x[a-fA-F0-9]{40}$/).optional(),
  TOKEN_STATUS_ADDRESS: z.string().regex(/^0x[a-fA-F0-9]{40}$/).optional(),
  DEPLOYER_PRIVATE_KEY: z.string().regex(/^(0x)?[a-fA-F0-9]{64}$/).optional(),

  // Evidence Storage
  EVIDENCE_STORE_TYPE: z.enum(['s3', 'ipfs', 'local']).default('local'),
  AWS_REGION: z.string().optional(),
  AWS_S3_BUCKET: z.string().optional(),
  AWS_KMS_KEY_ID: z.string().optional(),
  IPFS_API_URL: z.string().url().optional(),
  IPFS_GATEWAY_URL: z.string().url().optional(),

  // API
  API_PORT: z.string().transform(Number).pipe(z.number().min(1).max(65535)).default('3000'),
  API_HOST: z.string().default('0.0.0.0'),
  API_RATE_LIMIT: z.string().transform(Number).pipe(z.number().min(1)).default('100'),
  JWT_SECRET: z.string().min(32).optional(),

  // Compliance
  SANCTIONS_LIST_UPDATE_INTERVAL: z.string().transform(Number).pipe(z.number().min(60000)).default('3600000'),
  KYC_PROVIDER: z.string().optional(),
  TRAVEL_RULE_PROTOCOL: z.string().default('trisa'),

  // Sync
  SYNC_CARBONMARK_INTERVAL: z.string().transform(Number).pipe(z.number().min(60000)).default('300000'),
  SYNC_ALLIEDOFFSETS_INTERVAL: z.string().transform(Number).pipe(z.number().min(60000)).default('3600000'),

  // Observability
  LOG_LEVEL: z.enum(['fatal', 'error', 'warn', 'info', 'debug', 'trace']).default('info'),
  SENTRY_DSN: z.string().url().optional(),
});

export class Config {
  private static instance: AppConfig | null = null;

  static load(): AppConfig {
    if (this.instance) {
      return this.instance;
    }

    try {
      const env = envSchema.parse(process.env);

      this.instance = {
        database: {
          url: env.DATABASE_URL,
          poolSize: env.DATABASE_POOL_SIZE,
        },
        redis: {
          url: env.REDIS_URL,
        },
        carbonmark: {
          apiUrl: env.CARBONMARK_API_URL,
          apiKey: env.CARBONMARK_API_KEY,
          testMode: env.CARBONMARK_TEST_MODE,
        },
        alliedOffsets: {
          apiUrl: env.ALLIEDOFFSETS_API_URL,
          apiKey: env.ALLIEDOFFSETS_API_KEY,
        },
        chain: {
          rpcUrl: env.CHAIN_RPC_URL,
          chainId: env.CHAIN_ID,
          complianceAnchorAddress: env.COMPLIANCE_ANCHOR_ADDRESS || '',
          projectDirectoryAddress: env.PROJECT_DIRECTORY_ADDRESS || '',
          tokenStatusAddress: env.TOKEN_STATUS_ADDRESS || '',
          deployerPrivateKey: env.DEPLOYER_PRIVATE_KEY || '',
        },
        evidenceStore: {
          type: env.EVIDENCE_STORE_TYPE,
          s3: env.EVIDENCE_STORE_TYPE === 's3' ? {
            region: env.AWS_REGION!,
            bucket: env.AWS_S3_BUCKET!,
            kmsKeyId: env.AWS_KMS_KEY_ID!,
          } : undefined,
          ipfs: env.EVIDENCE_STORE_TYPE === 'ipfs' ? {
            apiUrl: env.IPFS_API_URL!,
            gatewayUrl: env.IPFS_GATEWAY_URL!,
          } : undefined,
          local: env.EVIDENCE_STORE_TYPE === 'local' ? {
            path: './evidence',
          } : undefined,
        },
        api: {
          port: env.API_PORT,
          host: env.API_HOST,
          rateLimit: env.API_RATE_LIMIT,
          jwtSecret: env.JWT_SECRET || '',
        },
        compliance: {
          sanctionsListUpdateInterval: env.SANCTIONS_LIST_UPDATE_INTERVAL,
          kycProvider: env.KYC_PROVIDER,
          travelRuleProtocol: env.TRAVEL_RULE_PROTOCOL,
        },
        sync: {
          carbonmarkInterval: env.SYNC_CARBONMARK_INTERVAL,
          alliedOffsetsInterval: env.SYNC_ALLIEDOFFSETS_INTERVAL,
        },
        logLevel: env.LOG_LEVEL,
      };

      return this.instance;
    } catch (error) {
      if (error instanceof z.ZodError) {
        console.error('Configuration validation failed:');
        error.errors.forEach(err => {
          console.error(`  ${err.path.join('.')}: ${err.message}`);
        });
        process.exit(1);
      }
      throw error;
    }
  }

  static get(): AppConfig {
    if (!this.instance) {
      return this.load();
    }
    return this.instance;
  }

  static reset(): void {
    this.instance = null;
  }
}

export const config = Config.get();
