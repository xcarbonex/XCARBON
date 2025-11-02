# XCARBON Backend

Finance-grade carbon credits backend with on-chain compliance anchoring for EVM-compatible chains.

## Overview

This backend system provides:

- **Carbon Project Aggregation**: Unified catalog from Carbonmark and AlliedOffsets
- **Soft Reservation System**: "This one is mine" claims with TTL and race condition handling
- **Purchase & Retirement Flow**: Programmatic buying and retiring via Carbonmark
- **On-Chain Compliance Anchoring**: Every regulated action sealed on-chain with cryptographic proof
- **Multi-Jurisdiction Compliance**: Built-in support for EU (MiCA, TFR), US (FinCEN), SG (PSN02), HK, JP, IN
- **ISO 20022 Messaging**: Standard financial message envelopes with carbon-specific supplementary data
- **Travel Rule (IVMS 101)**: Virtual asset transfers with proper originator/beneficiary information
- **KYC/AML Screening**: Sanctions lists (OFAC, EU, UN), PEP checks, risk scoring
- **Tokenization Hooks**: ERC-20/1155 for transferable credits, soulbound NFTs for retired credits

## Architecture

```
┌─────────────────────────────────────────────────────────────┐
│                      External APIs                           │
├──────────────────┬──────────────────────────────────────────┤
│   Carbonmark     │        AlliedOffsets                     │
│  (Purchase & Retire) │   (Wide Catalog & Enrichment)        │
└──────────────────┴──────────────────────────────────────────┘
           │                        │
           ↓                        ↓
┌─────────────────────────────────────────────────────────────┐
│                   Integration Layer                          │
│  • CarbonmarkClient    • AlliedOffsetsClient                │
│  • Retry & Backoff     • Bulk Exports                       │
│  • Caching             • Rate Limiting                       │
└─────────────────────────────────────────────────────────────┘
           │
           ↓
┌─────────────────────────────────────────────────────────────┐
│                   Core Services                              │
│                                                              │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐     │
│  │  Catalog     │  │ Reservation  │  │  Purchase    │     │
│  │  Service     │  │  Service     │  │  Service     │     │
│  └──────────────┘  └──────────────┘  └──────────────┘     │
│                                                              │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐     │
│  │ Compliance   │  │  ISO 20022   │  │  Travel Rule │     │
│  │  Anchoring   │  │  Messaging   │  │  (IVMS 101)  │     │
│  └──────────────┘  └──────────────┘  └──────────────┘     │
│                                                              │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐     │
│  │  Sanctions   │  │ Jurisdiction │  │ Tokenization │     │
│  │  Screening   │  │    Policy    │  │   Service    │     │
│  └──────────────┘  └──────────────┘  └──────────────┘     │
└─────────────────────────────────────────────────────────────┘
           │
           ↓
┌─────────────────────────────────────────────────────────────┐
│                   Data Layer                                 │
│  • PostgreSQL (normalized projects, orders, compliance)     │
│  • Redis (caching, queues)                                  │
│  • S3/IPFS (encrypted evidence store)                       │
└─────────────────────────────────────────────────────────────┘
           │
           ↓
┌─────────────────────────────────────────────────────────────┐
│                EVM Chain (On-Chain Anchors)                 │
│                                                              │
│  ┌─────────────────────────────────────────────────────┐   │
│  │  ComplianceAnchorRegistry                           │   │
│  │  • Append-only compliance receipts (OCRs)           │   │
│  │  • Case-based action indexing                       │   │
│  │  • Merkle root batch anchoring                      │   │
│  └─────────────────────────────────────────────────────┘   │
│                                                              │
│  ┌─────────────────────────────────────────────────────┐   │
│  │  ProjectDirectory                                    │   │
│  │  • Canonical project registry                        │   │
│  │  • Deterministic project keys                        │   │
│  └─────────────────────────────────────────────────────┘   │
│                                                              │
│  ┌─────────────────────────────────────────────────────┐   │
│  │  TokenStatus                                         │   │
│  │  • Token lifecycle (active → retired → soulbound)   │   │
│  │  • State transition validation                       │   │
│  └─────────────────────────────────────────────────────┘   │
└─────────────────────────────────────────────────────────────┘
           │
           ↓
┌─────────────────────────────────────────────────────────────┐
│                   Public REST API                            │
│  • Projects Search & Detail                                 │
│  • Reservations (claim with TTL)                            │
│  • Checkout (quote → order → retire)                        │
│  • Compliance Cases (audit trail)                           │
│  • Privacy Controls (GDPR/PDPA/DPDP)                        │
└─────────────────────────────────────────────────────────────┘
```

## Database Schema

### Core Tables

- **`registry_project`**: Canonical carbon projects (keyed by `(registry, project_id)`)
- **`source_crosswalk`**: Maps vendor IDs to canonical project keys
- **`pricing_snapshot`**: Time-series pricing from all sources
- **`inventory_hold`**: Soft reservations with TTL and idempotency
- **`orders`**: Purchase intents and retirement orders
- **`retirements`**: Immutable retirement records with certificates
- **`token_mints`**: On-chain tokenization artifacts

### Compliance Tables

- **`compliance_actions`**: On-Chain Receipts (OCRs) for all regulated actions
- **`iso20022_messages`**: Financial messages (pain.001, pacs.008, camt.054)
- **`travel_rule_transfers`**: IVMS 101 payloads for VA transfers
- **`screening_records`**: KYC/AML/sanctions screening results
- **`sanctions_lists`**: Versioned snapshots of sanctions lists

### Views

- **`available_projects`**: Projects with current pricing and supply
- **`active_holds_summary`**: Aggregated reservation data
- **`compliance_case_timeline`**: Action sequence per case

## Smart Contracts

### ComplianceAnchorRegistry.sol

Append-only registry for compliance action anchors.

**Key Functions:**
- `anchor()`: Record a single compliance action on-chain
- `batchAnchor()`: Record multiple actions in one transaction (gas optimization)
- `getCaseActions()`: Retrieve all actions for a case
- `verify()`: Verify payload hash matches on-chain anchor

**Events:**
- `Anchored`: Emitted for each compliance action
- `BatchAnchored`: Emitted for batch operations

### ProjectDirectory.sol

Canonical directory of carbon projects with deterministic keys.

**Key Functions:**
- `registerProject()`: Register or update project metadata
- `deriveProjectKey()`: Compute deterministic key from registry + project ID
- `lookupProject()`: Query project by registry and ID

### TokenStatus.sol

Tracks token lifecycle and state transitions.

**States:**
- `Active`: Transferable, not retired
- `Locked`: Temporarily locked
- `Retired`: Retired, non-transferable
- `Soulbound`: Permanently bound to owner
- `Burned`: Destroyed

## API Integration

### Carbonmark

**Base URL**: `https://v17.api.carbonmark.com` (always use versioned endpoint)

**Key Endpoints:**
- `GET /carbonProjects` - List projects with filters
- `GET /products` - Index products (MCO2, CCO2)
- `GET /prices` - Fetch pricing by project/product IDs
- `POST /quotes` - Create retirement quote
- `POST /orders` - Create retirement order

**Authentication**: Bearer token (API key)

**Features:**
- Automatic retry with exponential backoff
- Response caching (configurable TTL)
- Idempotency-Key header support

### AlliedOffsets

**Base URL**: `https://api.alliedoffsets.com`

**Key Endpoints:**
- `GET /projects` - List projects with filters
- `GET /projects/{id}` - Project details
- `GET /credits` - Credit information
- `GET /prices/historical` - Historical pricing
- `GET /exports/projects` - **Bulk export** for full sync
- `GET /exports/credits` - Bulk credit export
- `GET /exports/prices` - Bulk price export

**Use Cases:**
- **Discovery**: Widest project catalog
- **Enrichment**: Images, documents, corporate buyers
- **Bulk Sync**: Nightly full refresh via exports

## Compliance Anchoring

Every regulated action creates an **On-Chain Compliance Receipt (OCR)**:

### Payload Envelope (off-chain, hashed on-chain)

```json
{
  "version": "1.0",
  "actionType": "Reservation.Created.v1",
  "timestamp": "2025-11-02T12:00:00Z",
  "case": {
    "caseId": "0x...",
    "clientRef": "user-123"
  },
  "project": {
    "registry": "VCS",
    "projectId": "191",
    "projectKey": "0x..."
  },
  "quantities": {
    "tonnes": "100.5",
    "vintages": ["2020-2022"]
  },
  "market": {
    "assetPriceSourceId": "cm:listing:abc",
    "price": "12.50",
    "currency": "USDC"
  },
  "providerRefs": {
    "carbonmark": {
      "quoteUuid": "...",
      "orderUuid": "..."
    }
  },
  "evidence": [
    {
      "uri": "ipfs://...",
      "hashAlg": "sha256",
      "hash": "0x..."
    }
  ]
}
```

### Action Types

- `Project.Sync.v1` - Catalog upsert
- `Price.Snapshot.v1` - Market price snapshot
- `Reservation.Created.v1` / `Expired.v1` / `Converted.v1`
- `Quote.Requested.v1` / `Received.v1`
- `Order.Submitted.v1` / `Failed.v1`
- `Retirement.Confirmed.v1` - Provider receipt finalized
- `Token.Minted.v1` / `StatusChanged.v1`
- `KYC.Screen.v1` / `Sanctions.Screen.v1`

### Hashing

1. **Canonicalize** JSON using JCS (RFC 8785)
2. Compute **`payloadHash = keccak256(utf8Bytes(canonicalizedJSON))`**
3. Store full payload encrypted at `evidenceUri`
4. Anchor only hash on-chain

### Verification

```bash
# Recompute hash from stored evidence
cat evidence.json | jq -cS | xxd -p -c 0 | xxd -r -p | keccak-256sum

# Compare with on-chain payloadHash
cast call $COMPLIANCE_ANCHOR "anchors(bytes32)" $ACTION_ID
```

## Jurisdiction Policies

Implemented as YAML rule packs per jurisdiction:

### EU (MiCA + TFR)
- **Travel Rule**: No de-minimis between CASPs
- **Self-hosted wallets**: Enhanced checks ≥ €1,000
- **Data retention**: Per GDPR

### US (FinCEN)
- **Threshold**: $3,000 for Travel Rule
- **Recordkeeping**: 31 CFR 1010.410(f)/(e)
- **Retention**: 5 years minimum

### Singapore (MAS PSN02)
- **Travel Rule**: All sizes (no de-minimis)
- **Enhanced data**: ≥ SGD 1,500
- **Compliance date**: April 2024 / July 2025 updates

### Hong Kong (SFC VATP)
- **Travel Rule**: Pre-/simultaneous transmission
- **Threshold**: HKD 8,000 for fuller data

### Japan (FSA/JVCEA)
- **Travel Rule**: In force, no de-minimis post-2023

### India (DPDP + FIU)
- **Data protection**: DPDP Act 2023 rules
- **FIU registration**: Required if servicing India

## ISO 20022 Integration

Financial messages use standard ISO 20022 schemas with carbon-specific extensions in `SupplementaryData`:

### Message Types
- **`pain.001`**: Payment initiation
- **`pacs.008`**: Credit transfer
- **`camt.054`/`053`**: Bank-to-customer statement

### Supplementary Data Structure

```xml
<SplmtryData>
  <Envlp>
    <CarbonCredit>
      <ProjectKey>0x...</ProjectKey>
      <Registry>VCS</Registry>
      <ProjectID>191</ProjectID>
      <Vintage>2020</Vintage>
      <QuantityTonnes>100.5</QuantityTonnes>
      <SerialNumbers>
        <Serial>VCS-191-2020-00001</Serial>
      </SerialNumbers>
      <RetirementStatus>retired</RetirementStatus>
      <BlockchainRefs>
        <TxHash>0x...</TxHash>
        <ChainID>1337</ChainID>
      </BlockchainRefs>
    </CarbonCredit>
  </Envlp>
</SplmtryData>
```

## Travel Rule (IVMS 101)

For virtual asset transfers meeting threshold requirements:

### Payload Structure

```json
{
  "ivms101": {
    "originator": {
      "originatorPersons": [{
        "naturalPerson": {
          "name": {
            "nameIdentifier": [{
              "primaryIdentifier": "...",
              "secondaryIdentifier": "..."
            }]
          }
        }
      }],
      "accountNumber": ["0x..."]
    },
    "beneficiary": {
      "beneficiaryPersons": [{
        "naturalPerson": {
          "name": {
            "nameIdentifier": [{
              "primaryIdentifier": "...",
              "secondaryIdentifier": "..."
            }]
          }
        }
      }],
      "accountNumber": ["0x..."]
    }
  }
}
```

### Protocols Supported
- **TRISA** (preferred)
- **OpenVASP**
- Direct VASP-to-VASP exchange

## KYC/AML Screening

### Sanctions Lists

Updated automatically via scheduled jobs:

- **OFAC SDN** (US Treasury)
- **EU Consolidated Sanctions List**
- **UN Consolidated Sanctions List**

Each screening records:
- List name, version, and published date
- Hit/no-hit with details
- Risk score
- Decision (approved/denied/review)

### Screening Process

1. **Pre-transfer**: Screen originator and beneficiary
2. **Record**: Store list versions and screening results
3. **Anchor**: Create OCR with hashed screening pack
4. **Block**: If hit detected, block transfer and create case

## Tokenization

### Token Types

1. **Transferable Credits** (ERC-20 or ERC-1155)
   - Represents custody before retirement
   - Can be traded/transferred
   - Linked to `orders.order_id`

2. **Retired Credits** (Soulbound NFT or locked ERC-1155)
   - Non-transferable
   - Linked to `retirements.retirement_id`
   - Metadata includes retirement certificate

### Metadata Structure

```json
{
  "name": "VCS-191 Retirement Certificate",
  "description": "100.5 tonnes retired from VCS-191",
  "image": "ipfs://...",
  "attributes": [
    { "trait_type": "Registry", "value": "VCS" },
    { "trait_type": "Project ID", "value": "191" },
    { "trait_type": "Vintage", "value": "2020" },
    { "trait_type": "Quantity (tonnes)", "value": "100.5" },
    { "trait_type": "Beneficiary", "value": "ACME Corp" },
    { "trait_type": "Retirement Date", "value": "2025-11-02" },
    { "trait_type": "Certificate", "value": "https://..." }
  ],
  "retirement_receipt": {
    "registry_retirement_id": "...",
    "serial_numbers": ["..."],
    "certificate_url": "...",
    "certificate_hash": "0x..."
  }
}
```

## Evidence Store

### Storage Options

1. **AWS S3 + KMS** (recommended for production)
   - Server-side encryption with KMS
   - Bucket versioning enabled
   - Lifecycle policies for retention

2. **IPFS** (for decentralized storage)
   - Pin evidence to reliable nodes
   - Store CID in compliance_actions.evidence_uri

3. **Local** (development only)

### Evidence Types

- Canonical JSON payloads (JCS)
- ISO 20022 XML messages
- IVMS 101 Travel Rule payloads
- Sanctions list snapshots
- Retirement certificates (PDFs, JSON)

## API Endpoints

### Projects

```
GET    /api/v1/projects
       Query: registry, country, category, methodology, vintage, price, page, limit

GET    /api/v1/projects/:registry/:projectId
       Returns: Full project details with merged data and current prices
```

### Reservations

```
POST   /api/v1/reservations
       Body: { assetPriceSourceId, quantityTonnes, clientId, idempotencyKey }
       Returns: { holdId, expiresAt, quoteUuid }
```

### Checkout

```
POST   /api/v1/checkout/quote
       Body: { assetPriceSourceId, quantityTonnes, idempotencyKey }
       Returns: { quoteUuid, costUsdc, expiresAt }

POST   /api/v1/checkout/order
       Body: { quoteUuid, beneficiaryName, retirementMessage, idempotencyKey }
       Returns: { orderId, status, receipt, certificateUrl }
```

### Retirements

```
GET    /api/v1/retirements/:id
       Returns: Immutable retirement record with certificate and chain token
```

### Prices

```
GET    /api/v1/prices
       Query: projectIds, productIds
       Returns: Current prices from all sources
```

### Compliance

```
GET    /api/v1/compliance/cases/:caseId
       Returns: Full case timeline with actions, evidence URIs, tx hashes
```

## Development

### Prerequisites

- Node.js ≥ 20
- PostgreSQL ≥ 14
- Redis ≥ 7
- Hardhat (for contracts)

### Setup

```bash
cd backend

# Install dependencies
npm install

# Copy environment template
cp .env.example .env

# Edit .env with your API keys and database credentials
nano .env

# Run database migrations
npm run db:migrate

# Compile smart contracts
npm run contracts:compile

# Deploy contracts (local)
npm run contracts:deploy

# Start development server
npm run dev
```

### Testing

```bash
# Run all tests
npm test

# With coverage
npm run test:coverage

# Test contracts
npm run contracts:test
```

### Sync Operations

```bash
# Initial full load from AlliedOffsets
npm run sync:alliedoffsets

# Sync Carbonmark prices
npm run sync:carbonmark
```

## Deployment

### Smart Contracts

1. Deploy `ComplianceAnchorRegistry`
2. Deploy `ProjectDirectory`
3. Deploy `TokenStatus`
4. Grant roles:
   - `ANCHORER_ROLE` to backend service account
   - `REGISTRAR_ROLE` to sync service
   - `STATUS_MANAGER_ROLE` to tokenization service

### Backend Services

1. Provision PostgreSQL with schema
2. Provision Redis for caching/queues
3. Set up S3 bucket with KMS encryption
4. Deploy API service with environment variables
5. Schedule sync jobs (cron or Lambda)

### Monitoring

- Structured logs → CloudWatch/DataDog
- Metrics: Prometheus/Grafana
- Alerts:
  - Upstream API failures
  - Order failure rate > threshold
  - Hold expiry without conversion
  - Sanctions list update failures

## Security

### API Keys

- Store in AWS Secrets Manager or equivalent
- Rotate quarterly
- Never log in plaintext

### Rate Limiting

- Per-client limits enforced at API layer
- WAF rules for order endpoints
- DDoS protection

### Data Protection

- **On-chain**: Only hashes (never PII)
- **Off-chain**: Encrypted at rest (KMS), encrypted in transit (TLS)
- **Retention**: Per jurisdiction requirements
- **Subject rights**: GDPR/PDPA/DPDP compliance API

## License

See [LICENSE](../LICENSE)

## References

- [Carbonmark API Docs](https://docs.carbonmark.com/)
- [AlliedOffsets API Docs](https://api.alliedoffsets.com/redoc)
- [ISO 20022 Standard](https://www.iso20022.org/)
- [FATF Recommendation 16](https://www.fatf-gafi.org/)
- [IVMS 101 Standard](https://intervasp.org/)
- [EU MiCA Regulation](https://eur-lex.europa.eu/eli/reg/2023/1114/oj)
- [Singapore MAS PSN02](https://www.mas.gov.sg/regulation/notices/psn02-aml-cft-notice---digital-payment-token-service)
