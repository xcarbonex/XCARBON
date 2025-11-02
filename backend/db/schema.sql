-- Database Schema for Carbon Credits Backend with Compliance Anchoring
-- Version: 1.0.0
-- Generated: 2025-11-02

-- Enable required extensions
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
CREATE EXTENSION IF NOT EXISTS "pg_trgm"; -- For text search

-- ============================================================================
-- CORE CARBON PROJECT TABLES
-- ============================================================================

-- Canonical registry projects (normalized from all sources)
CREATE TABLE registry_project (
  project_key VARCHAR(66) PRIMARY KEY, -- keccak256(registry||":"||project_id)
  registry VARCHAR(50) NOT NULL,       -- VCS, Gold Standard, Puro, etc.
  project_id VARCHAR(100) NOT NULL,
  name TEXT NOT NULL,
  description TEXT,
  country VARCHAR(3),                  -- ISO 3166-1 alpha-3
  coordinates JSONB,                   -- {lat, lon}
  methodology VARCHAR(100),
  category VARCHAR(100),               -- Renewables, Forestry, etc.
  developer VARCHAR(255),
  standard VARCHAR(50),
  status VARCHAR(50),                  -- Active, Retired, etc.
  vintage_start INTEGER,
  vintage_end INTEGER,
  images JSONB,                        -- [{url, hash, source}]
  documents JSONB,                     -- [{type, url, hash}]
  tags TEXT[],
  source_attributions JSONB,           -- {carbonmark: {...}, alliedOffsets: {...}}
  metadata_hash VARCHAR(66),           -- keccak256 of canonical metadata
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  
  UNIQUE(registry, project_id)
);

CREATE INDEX idx_registry_project_registry ON registry_project(registry);
CREATE INDEX idx_registry_project_country ON registry_project(country);
CREATE INDEX idx_registry_project_category ON registry_project(category);
CREATE INDEX idx_registry_project_vintage ON registry_project(vintage_start, vintage_end);
CREATE INDEX idx_registry_project_name_trgm ON registry_project USING gin(name gin_trgm_ops);
CREATE INDEX idx_registry_project_tags ON registry_project USING gin(tags);

-- Cross-reference table for vendor IDs
CREATE TABLE source_crosswalk (
  id SERIAL PRIMARY KEY,
  project_key VARCHAR(66) NOT NULL REFERENCES registry_project(project_key),
  source VARCHAR(50) NOT NULL,         -- carbonmark, alliedoffsets, verra, goldstandard
  external_id VARCHAR(255) NOT NULL,
  external_key VARCHAR(255),           -- e.g., "VCS-191" for carbonmark
  metadata JSONB,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  
  UNIQUE(source, external_id)
);

CREATE INDEX idx_source_crosswalk_project ON source_crosswalk(project_key);
CREATE INDEX idx_source_crosswalk_source ON source_crosswalk(source, external_id);

-- ============================================================================
-- PRICING & AVAILABILITY
-- ============================================================================

CREATE TABLE pricing_snapshot (
  id BIGSERIAL PRIMARY KEY,
  project_key VARCHAR(66) REFERENCES registry_project(project_key),
  source VARCHAR(50) NOT NULL,         -- carbonmark, alliedoffsets
  source_type VARCHAR(50) NOT NULL,    -- listing, carbon_pool, product
  asset_price_source_id TEXT NOT NULL, -- e.g., "cm:listing:abc123"
  unit_price DECIMAL(18, 6) NOT NULL,
  currency VARCHAR(10) NOT NULL DEFAULT 'USDC',
  min_fill DECIMAL(18, 3),
  supply DECIMAL(18, 3),
  vintage INTEGER,
  metadata JSONB,                      -- Additional pricing metadata
  as_of TIMESTAMPTZ NOT NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  
  UNIQUE(asset_price_source_id, as_of)
);

CREATE INDEX idx_pricing_project ON pricing_snapshot(project_key);
CREATE INDEX idx_pricing_as_of ON pricing_snapshot(as_of DESC);
CREATE INDEX idx_pricing_source_type ON pricing_snapshot(source, source_type);
CREATE INDEX idx_pricing_asset_id ON pricing_snapshot(asset_price_source_id);

-- ============================================================================
-- RESERVATION & INVENTORY
-- ============================================================================

CREATE TYPE hold_status AS ENUM ('active', 'expired', 'converted', 'cancelled');

CREATE TABLE inventory_hold (
  hold_id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  project_key VARCHAR(66) NOT NULL REFERENCES registry_project(project_key),
  asset_price_source_id TEXT NOT NULL,
  quantity_tonnes DECIMAL(18, 3) NOT NULL CHECK (quantity_tonnes > 0),
  status hold_status NOT NULL DEFAULT 'active',
  client_id VARCHAR(255) NOT NULL,
  idempotency_key VARCHAR(255) NOT NULL,
  quote_uuid UUID,                     -- Carbonmark quote
  expires_at TIMESTAMPTZ NOT NULL,
  converted_at TIMESTAMPTZ,
  metadata JSONB,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  
  UNIQUE(idempotency_key)
);

CREATE INDEX idx_hold_status ON inventory_hold(status) WHERE status = 'active';
CREATE INDEX idx_hold_expires ON inventory_hold(expires_at) WHERE status = 'active';
CREATE INDEX idx_hold_client ON inventory_hold(client_id);
CREATE INDEX idx_hold_asset ON inventory_hold(asset_price_source_id);

-- ============================================================================
-- ORDERS & RETIREMENTS
-- ============================================================================

CREATE TYPE order_status AS ENUM ('pending', 'quoted', 'submitted', 'confirmed', 'failed', 'cancelled');

CREATE TABLE orders (
  order_id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  hold_id UUID REFERENCES inventory_hold(hold_id),
  project_key VARCHAR(66) NOT NULL REFERENCES registry_project(project_key),
  asset_price_source_id TEXT NOT NULL,
  quantity_tonnes DECIMAL(18, 3) NOT NULL CHECK (quantity_tonnes > 0),
  status order_status NOT NULL DEFAULT 'pending',
  
  -- Carbonmark references
  quote_uuid UUID,
  quote_cost_usdc DECIMAL(18, 6),
  quote_expires_at TIMESTAMPTZ,
  carbonmark_order_id TEXT,
  
  -- Order details
  beneficiary_name VARCHAR(255),
  retirement_message TEXT,
  consumption_metadata JSONB,          -- Registry-specific (e.g., Puro)
  
  -- Financial
  cost_usdc DECIMAL(18, 6),
  payment_method VARCHAR(50),
  payment_ref TEXT,
  
  -- Receipts & proof
  receipt JSONB,                       -- Full Carbonmark receipt
  certificate_url TEXT,
  certificate_hash VARCHAR(66),
  
  -- Client tracking
  client_id VARCHAR(255) NOT NULL,
  idempotency_key VARCHAR(255) NOT NULL,
  
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  confirmed_at TIMESTAMPTZ,
  
  UNIQUE(idempotency_key)
);

CREATE INDEX idx_orders_status ON orders(status);
CREATE INDEX idx_orders_client ON orders(client_id);
CREATE INDEX idx_orders_project ON orders(project_key);
CREATE INDEX idx_orders_created ON orders(created_at DESC);

CREATE TABLE retirements (
  retirement_id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  order_id UUID NOT NULL REFERENCES orders(order_id),
  project_key VARCHAR(66) NOT NULL REFERENCES registry_project(project_key),
  
  registry VARCHAR(50) NOT NULL,
  registry_retirement_id TEXT,
  serial_numbers TEXT[],
  
  quantity_tonnes DECIMAL(18, 3) NOT NULL,
  vintage INTEGER,
  
  beneficiary_name VARCHAR(255) NOT NULL,
  beneficiary_address TEXT,
  retirement_message TEXT,
  retirement_reason VARCHAR(100),
  
  certificate_url TEXT,
  certificate_hash VARCHAR(66),
  certificate_data JSONB,
  
  retired_at TIMESTAMPTZ NOT NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX idx_retirements_order ON retirements(order_id);
CREATE INDEX idx_retirements_project ON retirements(project_key);
CREATE INDEX idx_retirements_retired_at ON retirements(retired_at DESC);

-- ============================================================================
-- TOKENIZATION
-- ============================================================================

CREATE TYPE token_state AS ENUM ('active', 'locked', 'retired', 'soulbound', 'burned');
CREATE TYPE token_type AS ENUM ('ERC20', 'ERC1155', 'ERC721');

CREATE TABLE token_mints (
  mint_id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  order_id UUID REFERENCES orders(order_id),
  retirement_id UUID REFERENCES retirements(retirement_id),
  
  chain_id INTEGER NOT NULL,
  contract_address VARCHAR(42) NOT NULL,
  token_type token_type NOT NULL,
  token_id VARCHAR(78),                -- For ERC1155/721
  
  quantity DECIMAL(18, 3),             -- For ERC20/1155
  owner_address VARCHAR(42) NOT NULL,
  
  state token_state NOT NULL DEFAULT 'active',
  metadata_uri TEXT,
  metadata_hash VARCHAR(66),
  
  tx_hash VARCHAR(66) NOT NULL,
  block_number BIGINT,
  
  project_key VARCHAR(66) NOT NULL REFERENCES registry_project(project_key),
  
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX idx_token_mints_order ON token_mints(order_id);
CREATE INDEX idx_token_mints_retirement ON token_mints(retirement_id);
CREATE INDEX idx_token_mints_owner ON token_mints(owner_address);
CREATE INDEX idx_token_mints_tx ON token_mints(tx_hash);
CREATE INDEX idx_token_mints_contract ON token_mints(chain_id, contract_address, token_id);

-- ============================================================================
-- COMPLIANCE & ANCHORING
-- ============================================================================

CREATE TABLE compliance_actions (
  ocr_id VARCHAR(66) PRIMARY KEY,      -- On-Chain Receipt ID
  case_id VARCHAR(66) NOT NULL,
  action_type VARCHAR(100) NOT NULL,   -- Project.Sync.v1, Reservation.Created.v1, etc.
  
  -- References
  project_key VARCHAR(66) REFERENCES registry_project(project_key),
  hold_id UUID REFERENCES inventory_hold(hold_id),
  order_id UUID REFERENCES orders(order_id),
  retirement_id UUID REFERENCES retirements(retirement_id),
  
  -- Jurisdiction & standards
  jurisdiction_code VARCHAR(10),       -- SG, US, EU, HK, JP, IN
  standards TEXT[],                    -- PSN02, MiCA, FinCEN, etc.
  
  -- Payload & proof
  payload_hash VARCHAR(66) NOT NULL,
  merkle_root VARCHAR(66),
  evidence_uri TEXT NOT NULL,
  evidence_hash VARCHAR(66) NOT NULL,
  
  -- On-chain anchoring
  chain_id INTEGER NOT NULL,
  tx_hash VARCHAR(66) NOT NULL,
  block_number BIGINT,
  anchored_at TIMESTAMPTZ NOT NULL,
  
  -- Supersession
  supersedes VARCHAR(66),              -- Previous ocr_id if correcting
  
  -- Metadata
  actor_address VARCHAR(42) NOT NULL,
  correlation_id TEXT,
  metadata JSONB,
  
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX idx_compliance_case ON compliance_actions(case_id);
CREATE INDEX idx_compliance_type ON compliance_actions(action_type);
CREATE INDEX idx_compliance_jurisdiction ON compliance_actions(jurisdiction_code);
CREATE INDEX idx_compliance_tx ON compliance_actions(tx_hash);
CREATE INDEX idx_compliance_anchored ON compliance_actions(anchored_at DESC);
CREATE INDEX idx_compliance_references ON compliance_actions(project_key, hold_id, order_id, retirement_id);

-- ISO 20022 messages
CREATE TABLE iso20022_messages (
  message_id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  ocr_id VARCHAR(66) REFERENCES compliance_actions(ocr_id),
  message_type VARCHAR(50) NOT NULL,   -- pain.001, pacs.008, camt.054, etc.
  message_xml TEXT NOT NULL,
  message_hash VARCHAR(66) NOT NULL,
  business_application_header JSONB,
  supplementary_data JSONB,            -- Carbon-specific fields
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX idx_iso20022_ocr ON iso20022_messages(ocr_id);
CREATE INDEX idx_iso20022_type ON iso20022_messages(message_type);

-- IVMS 101 Travel Rule payloads
CREATE TABLE travel_rule_transfers (
  transfer_id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  ocr_id VARCHAR(66) REFERENCES compliance_actions(ocr_id),
  order_id UUID REFERENCES orders(order_id),
  
  originator_vasp VARCHAR(255),
  beneficiary_vasp VARCHAR(255),
  
  ivms101_payload JSONB NOT NULL,
  ivms101_hash VARCHAR(66) NOT NULL,
  
  protocol VARCHAR(50),                -- TRISA, OpenVASP, etc.
  transmission_log JSONB,
  
  threshold_amount DECIMAL(18, 6),
  currency VARCHAR(10),
  jurisdiction_rules JSONB,
  
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX idx_travel_rule_ocr ON travel_rule_transfers(ocr_id);
CREATE INDEX idx_travel_rule_order ON travel_rule_transfers(order_id);

-- KYC/AML screening
CREATE TABLE screening_records (
  screening_id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  ocr_id VARCHAR(66) REFERENCES compliance_actions(ocr_id),
  
  subject_id VARCHAR(255) NOT NULL,
  subject_type VARCHAR(50) NOT NULL,   -- individual, entity
  
  screening_type VARCHAR(50) NOT NULL, -- sanctions, pep, kyc, edd
  
  -- Lists screened
  lists_screened JSONB NOT NULL,       -- [{list: "OFAC SDN", version: "...", date: "..."}]
  
  -- Results
  hit_detected BOOLEAN NOT NULL,
  hit_details JSONB,
  risk_score INTEGER,
  case_id VARCHAR(100),
  
  decision VARCHAR(50) NOT NULL,       -- approved, denied, review
  decision_rationale TEXT,
  
  screened_at TIMESTAMPTZ NOT NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX idx_screening_ocr ON screening_records(ocr_id);
CREATE INDEX idx_screening_subject ON screening_records(subject_id);
CREATE INDEX idx_screening_type ON screening_records(screening_type);
CREATE INDEX idx_screening_hit ON screening_records(hit_detected) WHERE hit_detected = true;

-- Sanctions list snapshots
CREATE TABLE sanctions_lists (
  list_id SERIAL PRIMARY KEY,
  list_name VARCHAR(100) NOT NULL,     -- OFAC SDN, EU Consolidated, UN
  version VARCHAR(100) NOT NULL,
  published_date DATE NOT NULL,
  snapshot_hash VARCHAR(66) NOT NULL,
  snapshot_uri TEXT NOT NULL,
  entry_count INTEGER,
  metadata JSONB,
  downloaded_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  
  UNIQUE(list_name, version)
);

CREATE INDEX idx_sanctions_lists_name ON sanctions_lists(list_name, published_date DESC);

-- ============================================================================
-- SYNC & AUDIT
-- ============================================================================

CREATE TABLE sync_jobs (
  job_id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  source VARCHAR(50) NOT NULL,
  job_type VARCHAR(50) NOT NULL,      -- full_export, incremental, prices
  status VARCHAR(50) NOT NULL,         -- pending, running, completed, failed
  
  records_processed INTEGER DEFAULT 0,
  records_inserted INTEGER DEFAULT 0,
  records_updated INTEGER DEFAULT 0,
  records_failed INTEGER DEFAULT 0,
  
  error_message TEXT,
  metadata JSONB,
  
  started_at TIMESTAMPTZ,
  completed_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX idx_sync_jobs_source ON sync_jobs(source, created_at DESC);
CREATE INDEX idx_sync_jobs_status ON sync_jobs(status) WHERE status IN ('pending', 'running');

-- Audit log for all data changes
CREATE TABLE audit_log (
  log_id BIGSERIAL PRIMARY KEY,
  table_name VARCHAR(100) NOT NULL,
  record_id TEXT NOT NULL,
  operation VARCHAR(10) NOT NULL,      -- INSERT, UPDATE, DELETE
  old_data JSONB,
  new_data JSONB,
  changed_by VARCHAR(255),
  changed_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  ocr_id VARCHAR(66)
);

CREATE INDEX idx_audit_log_table ON audit_log(table_name, record_id);
CREATE INDEX idx_audit_log_changed_at ON audit_log(changed_at DESC);

-- ============================================================================
-- FUNCTIONS & TRIGGERS
-- ============================================================================

-- Update updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER update_registry_project_updated_at BEFORE UPDATE ON registry_project
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_inventory_hold_updated_at BEFORE UPDATE ON inventory_hold
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_orders_updated_at BEFORE UPDATE ON orders
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_token_mints_updated_at BEFORE UPDATE ON token_mints
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- Expire old holds
CREATE OR REPLACE FUNCTION expire_old_holds()
RETURNS INTEGER AS $$
DECLARE
  affected_count INTEGER;
BEGIN
  UPDATE inventory_hold
  SET status = 'expired'
  WHERE status = 'active'
    AND expires_at < NOW();
  
  GET DIAGNOSTICS affected_count = ROW_COUNT;
  RETURN affected_count;
END;
$$ LANGUAGE plpgsql;

-- ============================================================================
-- VIEWS
-- ============================================================================

-- Available projects with current pricing
CREATE VIEW available_projects AS
SELECT 
  p.project_key,
  p.registry,
  p.project_id,
  p.name,
  p.category,
  p.country,
  p.vintage_start,
  p.vintage_end,
  ps.asset_price_source_id,
  ps.source_type,
  ps.unit_price,
  ps.currency,
  ps.supply,
  ps.min_fill,
  ps.as_of as price_as_of
FROM registry_project p
INNER JOIN LATERAL (
  SELECT DISTINCT ON (asset_price_source_id)
    asset_price_source_id,
    source_type,
    unit_price,
    currency,
    supply,
    min_fill,
    as_of
  FROM pricing_snapshot
  WHERE project_key = p.project_key
    AND supply > 0
  ORDER BY asset_price_source_id, as_of DESC
) ps ON true
WHERE ps.supply > 0;

-- Active holds summary
CREATE VIEW active_holds_summary AS
SELECT
  project_key,
  asset_price_source_id,
  COUNT(*) as hold_count,
  SUM(quantity_tonnes) as total_held_tonnes
FROM inventory_hold
WHERE status = 'active'
  AND expires_at > NOW()
GROUP BY project_key, asset_price_source_id;

-- Compliance case timeline
CREATE VIEW compliance_case_timeline AS
SELECT
  case_id,
  array_agg(action_type ORDER BY anchored_at) as action_sequence,
  MIN(anchored_at) as case_started_at,
  MAX(anchored_at) as case_last_action_at,
  array_agg(DISTINCT jurisdiction_code) as jurisdictions,
  array_agg(DISTINCT standards) as standards_applied
FROM compliance_actions
GROUP BY case_id;

COMMENT ON TABLE registry_project IS 'Canonical carbon projects normalized from all sources';
COMMENT ON TABLE source_crosswalk IS 'Maps external vendor IDs to canonical project keys';
COMMENT ON TABLE pricing_snapshot IS 'Time-series pricing data from marketplaces';
COMMENT ON TABLE inventory_hold IS 'Soft reservations with TTL and idempotency';
COMMENT ON TABLE orders IS 'Purchase intents and retirement orders';
COMMENT ON TABLE retirements IS 'Immutable retirement records with certificates';
COMMENT ON TABLE token_mints IS 'On-chain tokenization artifacts';
COMMENT ON TABLE compliance_actions IS 'On-chain anchored compliance receipts';
COMMENT ON TABLE iso20022_messages IS 'ISO 20022 financial messages for fiat legs';
COMMENT ON TABLE travel_rule_transfers IS 'IVMS 101 Travel Rule payloads for VA transfers';
COMMENT ON TABLE screening_records IS 'KYC/AML/sanctions screening results';
