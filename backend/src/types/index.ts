/**
 * Core type definitions for carbon credits backend
 */

// ============================================================================
// CARBON PROJECTS
// ============================================================================

export type Registry = 'VCS' | 'GS' | 'Puro' | 'CAR' | 'ACR' | 'Other';

export interface CarbonProject {
  projectKey: string;  // hex string
  registry: Registry;
  projectId: string;
  name: string;
  description?: string;
  country?: string;    // ISO 3166-1 alpha-3
  coordinates?: {
    lat: number;
    lon: number;
  };
  methodology?: string;
  category?: string;
  developer?: string;
  standard?: string;
  status?: string;
  vintageStart?: number;
  vintageEnd?: number;
  images?: ProjectImage[];
  documents?: ProjectDocument[];
  tags?: string[];
  sourceAttributions?: Record<string, any>;
  metadataHash?: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface ProjectImage {
  url: string;
  hash?: string;
  source?: string;
  caption?: string;
}

export interface ProjectDocument {
  type: string;
  url: string;
  hash?: string;
  title?: string;
}

export interface SourceCrosswalk {
  id: number;
  projectKey: string;
  source: string;
  externalId: string;
  externalKey?: string;
  metadata?: Record<string, any>;
  createdAt: Date;
}

// ============================================================================
// PRICING
// ============================================================================

export type PricingSourceType = 'listing' | 'carbon_pool' | 'product';

export interface PricingSnapshot {
  id: number;
  projectKey?: string;
  source: string;
  sourceType: PricingSourceType;
  assetPriceSourceId: string;
  unitPrice: string;  // decimal string
  currency: string;
  minFill?: string;
  supply?: string;
  vintage?: number;
  metadata?: Record<string, any>;
  asOf: Date;
  createdAt: Date;
}

// ============================================================================
// RESERVATIONS
// ============================================================================

export type HoldStatus = 'active' | 'expired' | 'converted' | 'cancelled';

export interface InventoryHold {
  holdId: string;  // UUID
  projectKey: string;
  assetPriceSourceId: string;
  quantityTonnes: string;
  status: HoldStatus;
  clientId: string;
  idempotencyKey: string;
  quoteUuid?: string;
  expiresAt: Date;
  convertedAt?: Date;
  metadata?: Record<string, any>;
  createdAt: Date;
  updatedAt: Date;
}

export interface CreateHoldRequest {
  projectKey: string;
  assetPriceSourceId: string;
  quantityTonnes: string;
  clientId: string;
  idempotencyKey: string;
  beneficiaryHint?: string;
  ttlSeconds?: number;
}

export interface CreateHoldResponse {
  holdId: string;
  expiresAt: Date;
  quoteUuid?: string;
  warning?: string;
}

// ============================================================================
// ORDERS & RETIREMENTS
// ============================================================================

export type OrderStatus = 'pending' | 'quoted' | 'submitted' | 'confirmed' | 'failed' | 'cancelled';

export interface Order {
  orderId: string;  // UUID
  holdId?: string;
  projectKey: string;
  assetPriceSourceId: string;
  quantityTonnes: string;
  status: OrderStatus;
  
  // Carbonmark references
  quoteUuid?: string;
  quoteCostUsdc?: string;
  quoteExpiresAt?: Date;
  carbonmarkOrderId?: string;
  
  // Order details
  beneficiaryName?: string;
  retirementMessage?: string;
  consumptionMetadata?: Record<string, any>;
  
  // Financial
  costUsdc?: string;
  paymentMethod?: string;
  paymentRef?: string;
  
  // Receipts
  receipt?: Record<string, any>;
  certificateUrl?: string;
  certificateHash?: string;
  
  // Client tracking
  clientId: string;
  idempotencyKey: string;
  
  createdAt: Date;
  updatedAt: Date;
  confirmedAt?: Date;
}

export interface Retirement {
  retirementId: string;  // UUID
  orderId: string;
  projectKey: string;
  
  registry: string;
  registryRetirementId?: string;
  serialNumbers?: string[];
  
  quantityTonnes: string;
  vintage?: number;
  
  beneficiaryName: string;
  beneficiaryAddress?: string;
  retirementMessage?: string;
  retirementReason?: string;
  
  certificateUrl?: string;
  certificateHash?: string;
  certificateData?: Record<string, any>;
  
  retiredAt: Date;
  createdAt: Date;
}

export interface CreateQuoteRequest {
  assetPriceSourceId: string;
  quantityTonnes: string;
  idempotencyKey: string;
}

export interface CreateOrderRequest {
  quoteUuid: string;
  beneficiaryName: string;
  retirementMessage?: string;
  consumptionMetadata?: Record<string, any>;
  idempotencyKey: string;
  clientId: string;
}

// ============================================================================
// TOKENIZATION
// ============================================================================

export type TokenState = 'active' | 'locked' | 'retired' | 'soulbound' | 'burned';
export type TokenType = 'ERC20' | 'ERC1155' | 'ERC721';

export interface TokenMint {
  mintId: string;  // UUID
  orderId?: string;
  retirementId?: string;
  
  chainId: number;
  contractAddress: string;
  tokenType: TokenType;
  tokenId?: string;
  
  quantity?: string;
  ownerAddress: string;
  
  state: TokenState;
  metadataUri?: string;
  metadataHash?: string;
  
  txHash: string;
  blockNumber?: number;
  
  projectKey: string;
  
  createdAt: Date;
  updatedAt: Date;
}

// ============================================================================
// COMPLIANCE
// ============================================================================

export interface ComplianceAction {
  ocrId: string;  // hex string
  caseId: string;
  actionType: string;
  
  projectKey?: string;
  holdId?: string;
  orderId?: string;
  retirementId?: string;
  
  jurisdictionCode?: string;
  standards?: string[];
  
  payloadHash: string;
  merkleRoot?: string;
  evidenceUri: string;
  evidenceHash: string;
  
  chainId: number;
  txHash: string;
  blockNumber?: number;
  anchoredAt: Date;
  
  supersedes?: string;
  
  actorAddress: string;
  correlationId?: string;
  metadata?: Record<string, any>;
  
  createdAt: Date;
}

export interface CompliancePayload {
  version: string;
  actionType: string;
  timestamp: string;  // RFC3339
  case: {
    caseId: string;
    clientRef?: string;
  };
  project?: {
    registry: string;
    projectId: string;
    projectKey: string;
  };
  quantities?: {
    tonnes: string;
    vintages?: string[];
  };
  market?: {
    assetPriceSourceId: string;
    price: string;
    currency: string;
  };
  providerRefs?: {
    carbonmark?: {
      quoteUuid?: string;
      orderUuid?: string;
    };
    alliedOffsets?: {
      projectId?: string;
    };
  };
  evidence?: Array<{
    uri: string;
    hashAlg: string;
    hash: string;
  }>;
  supersedes?: string;
}

export interface ISO20022Message {
  messageId: string;
  ocrId?: string;
  messageType: string;  // pain.001, pacs.008, etc.
  messageXml: string;
  messageHash: string;
  businessApplicationHeader?: Record<string, any>;
  supplementaryData?: Record<string, any>;
  createdAt: Date;
}

export interface TravelRuleTransfer {
  transferId: string;
  ocrId?: string;
  orderId?: string;
  
  originatorVasp: string;
  beneficiaryVasp: string;
  
  ivms101Payload: Record<string, any>;
  ivms101Hash: string;
  
  protocol?: string;  // TRISA, OpenVASP
  transmissionLog?: Record<string, any>;
  
  thresholdAmount?: string;
  currency?: string;
  jurisdictionRules?: Record<string, any>;
  
  createdAt: Date;
}

export interface ScreeningRecord {
  screeningId: string;
  ocrId?: string;
  
  subjectId: string;
  subjectType: 'individual' | 'entity';
  
  screeningType: 'sanctions' | 'pep' | 'kyc' | 'edd';
  
  listsScreened: Array<{
    list: string;
    version: string;
    date: string;
  }>;
  
  hitDetected: boolean;
  hitDetails?: Record<string, any>;
  riskScore?: number;
  caseId?: string;
  
  decision: 'approved' | 'denied' | 'review';
  decisionRationale?: string;
  
  screenedAt: Date;
  createdAt: Date;
}

// ============================================================================
// SYNC & JOBS
// ============================================================================

export interface SyncJob {
  jobId: string;
  source: string;
  jobType: string;
  status: 'pending' | 'running' | 'completed' | 'failed';
  
  recordsProcessed: number;
  recordsInserted: number;
  recordsUpdated: number;
  recordsFailed: number;
  
  errorMessage?: string;
  metadata?: Record<string, any>;
  
  startedAt?: Date;
  completedAt?: Date;
  createdAt: Date;
}

// ============================================================================
// API REQUESTS/RESPONSES
// ============================================================================

export interface SearchProjectsRequest {
  query?: string;
  registry?: Registry[];
  country?: string[];
  category?: string[];
  methodology?: string[];
  vintageStart?: number;
  vintageEnd?: number;
  priceMin?: string;
  priceMax?: string;
  availableOnly?: boolean;
  page?: number;
  limit?: number;
  sortBy?: 'name' | 'price' | 'vintage' | 'createdAt';
  sortOrder?: 'asc' | 'desc';
}

export interface SearchProjectsResponse {
  projects: CarbonProject[];
  total: number;
  page: number;
  limit: number;
  facets?: {
    registries: Record<string, number>;
    countries: Record<string, number>;
    categories: Record<string, number>;
  };
}

export interface ProjectDetailResponse extends CarbonProject {
  prices: PricingSnapshot[];
  availability: {
    assetPriceSourceId: string;
    sourceType: PricingSourceType;
    supply: string;
    minFill: string;
    unitPrice: string;
  }[];
}

export interface ComplianceCaseResponse {
  caseId: string;
  actions: ComplianceAction[];
  timeline: {
    actionType: string;
    timestamp: Date;
    txHash: string;
    evidenceUri: string;
  }[];
  jurisdictions: string[];
  standardsApplied: string[];
}

// ============================================================================
// EXTERNAL API TYPES (Carbonmark, AlliedOffsets)
// ============================================================================

export namespace Carbonmark {
  export interface CarbonProject {
    key: string;
    projectID: string;
    registry: string;
    name: string;
    methodologies: string[];
    vintages: string[];
    country: string;
    region: string;
    price: string;
    category: {
      id: string;
    };
  }

  export interface Product {
    id: string;
    name: string;
    description: string;
    price: string;
  }

  export interface Price {
    asset_price_source_id: string;
    type: 'listing' | 'carbon_pool' | 'product';
    unit_price: string;
    supply: string;
    min_fill_quantity: string;
  }

  export interface QuoteRequest {
    asset_price_source_id: string;
    quantity_tonnes: string;
  }

  export interface QuoteResponse {
    uuid: string;
    cost_usdc: string;
    expires_at: string;
  }

  export interface OrderRequest {
    quote_uuid: string;
    beneficiary_name: string;
    retirement_message?: string;
    consumption_metadata?: Record<string, any>;
  }

  export interface OrderResponse {
    order_id: string;
    status: string;
    receipt: any;
    certificate_url?: string;
  }
}

export namespace AlliedOffsets {
  export interface Project {
    id: string;
    registry: string;
    project_id: string;
    name: string;
    description: string;
    methodology: string;
    country: string;
    latitude: number;
    longitude: number;
    vintage_start: number;
    vintage_end: number;
    images: string[];
    documents: any[];
  }

  export interface Credit {
    id: string;
    project_id: string;
    vintage: number;
    quantity: number;
    price: number;
    currency: string;
  }

  export interface HistoricalPrice {
    project_id: string;
    date: string;
    price: number;
    currency: string;
  }
}

// ============================================================================
// CONFIGURATION
// ============================================================================

export interface AppConfig {
  database: {
    url: string;
    poolSize: number;
  };
  redis: {
    url: string;
  };
  carbonmark: {
    apiUrl: string;
    apiKey: string;
    testMode: boolean;
  };
  alliedOffsets: {
    apiUrl: string;
    apiKey: string;
  };
  chain: {
    rpcUrl: string;
    chainId: number;
    complianceAnchorAddress: string;
    projectDirectoryAddress: string;
    tokenStatusAddress: string;
    deployerPrivateKey: string;
  };
  evidenceStore: {
    type: 's3' | 'ipfs' | 'local';
    s3?: {
      region: string;
      bucket: string;
      kmsKeyId: string;
    };
    ipfs?: {
      apiUrl: string;
      gatewayUrl: string;
    };
    local?: {
      path: string;
    };
  };
  api: {
    port: number;
    host: string;
    rateLimit: number;
    jwtSecret: string;
  };
  compliance: {
    sanctionsListUpdateInterval: number;
    kycProvider?: string;
    travelRuleProtocol: string;
  };
  sync: {
    carbonmarkInterval: number;
    alliedOffsetsInterval: number;
  };
  logLevel: string;
}
