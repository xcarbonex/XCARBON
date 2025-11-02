# XCARBON Backend - Quick Start Guide

This guide will get you up and running with the carbon credits backend in development mode.

## Prerequisites

### Required Software

- **Node.js** v20.0.0 or higher
- **PostgreSQL** v14 or higher
- **Redis** v7 or higher
- **Git**

### API Keys Required

1. **Carbonmark API Key**
   - Sign up at [Carbonmark Developer Dashboard](https://carbonmark.com/developers)
   - Create test API key (free)
   - Note: Use versioned endpoint (e.g., `v17.api.carbonmark.com`)

2. **AlliedOffsets API Key**
   - Request access at [AlliedOffsets API](https://alliedoffsets.com/api/)
   - API documentation: https://api.alliedoffsets.com/redoc

### Optional (for production)

- AWS account (for S3/KMS evidence storage)
- IPFS node (for decentralized evidence storage)

## Step 1: Clone and Install

```bash
# Navigate to backend directory
cd backend

# Install dependencies
npm install
```

## Step 2: Database Setup

### Create PostgreSQL Database

```bash
# Connect to PostgreSQL
psql -U postgres

# Create database and user
CREATE DATABASE xcarbon;
CREATE USER xcarbon WITH ENCRYPTED PASSWORD 'your_secure_password';
GRANT ALL PRIVILEGES ON DATABASE xcarbon TO xcarbon;

# Exit psql
\q
```

### Run Migrations

```bash
# Option 1: Using psql directly
psql -U xcarbon -d xcarbon -f db/schema.sql

# Option 2: Using migration script (once implemented)
npm run db:migrate
```

## Step 3: Redis Setup

### Install Redis (if not already installed)

**macOS:**
```bash
brew install redis
brew services start redis
```

**Ubuntu/Debian:**
```bash
sudo apt-get install redis-server
sudo systemctl start redis-server
```

**Docker:**
```bash
docker run -d -p 6379:6379 redis:7-alpine
```

## Step 4: Configure Environment

```bash
# Copy example environment file
cp .env.example .env

# Edit with your configuration
nano .env  # or use your preferred editor
```

### Minimum Configuration

```env
# Database
DATABASE_URL=postgresql://xcarbon:your_secure_password@localhost:5432/xcarbon
DATABASE_POOL_SIZE=20

# Redis
REDIS_URL=redis://localhost:6379

# Carbonmark API
CARBONMARK_API_URL=https://v17.api.carbonmark.com
CARBONMARK_API_KEY=your_carbonmark_api_key_here
CARBONMARK_TEST_MODE=true

# AlliedOffsets API
ALLIEDOFFSETS_API_URL=https://api.alliedoffsets.com
ALLIEDOFFSETS_API_KEY=your_alliedoffsets_api_key_here

# EVM Chain (local development)
CHAIN_RPC_URL=http://localhost:8545
CHAIN_ID=1337

# Evidence Storage (local for development)
EVIDENCE_STORE_TYPE=local

# API
API_PORT=3000
API_HOST=0.0.0.0
JWT_SECRET=your_jwt_secret_here_change_in_production

# Logging
LOG_LEVEL=info
```

## Step 5: Deploy Smart Contracts (Local)

### Start Local Ethereum Node

```bash
# Terminal 1: Start Hardhat node
npx hardhat node
```

This will:
- Start a local Ethereum node on `http://localhost:8545`
- Create test accounts with ETH
- Display private keys for testing

### Deploy Contracts

```bash
# Terminal 2: Deploy contracts
npm run contracts:deploy

# Note the deployed contract addresses
# Update .env with:
# COMPLIANCE_ANCHOR_ADDRESS=0x...
# PROJECT_DIRECTORY_ADDRESS=0x...
# TOKEN_STATUS_ADDRESS=0x...
```

## Step 6: Initial Data Sync

### Sync from AlliedOffsets

```bash
# Full export (may take several minutes)
npm run sync:alliedoffsets
```

This will:
- Fetch all projects from AlliedOffsets bulk export
- Normalize and insert into `registry_project`
- Create `source_crosswalk` mappings
- Store images and documents metadata

### Sync from Carbonmark

```bash
# Fetch projects and prices
npm run sync:carbonmark
```

This will:
- Fetch purchasable projects
- Get current prices (listings, pools, products)
- Insert into `pricing_snapshot`
- Update `source_crosswalk` for Carbonmark keys

## Step 7: Start Development Server

```bash
npm run dev
```

The API will be available at `http://localhost:3000`

### Health Check

```bash
curl http://localhost:3000/health
```

Expected response:
```json
{
  "status": "healthy",
  "services": {
    "database": "ok",
    "redis": "ok",
    "carbonmark": "ok",
    "alliedoffsets": "ok",
    "blockchain": "ok"
  }
}
```

## Step 8: Test the API

### Search Projects

```bash
curl "http://localhost:3000/api/v1/projects?country=USA&category=Renewables&limit=10"
```

### Get Project Detail

```bash
curl "http://localhost:3000/api/v1/projects/vcs/191"
```

### Create Reservation

```bash
curl -X POST http://localhost:3000/api/v1/reservations \
  -H "Content-Type: application/json" \
  -d '{
    "assetPriceSourceId": "cm:listing:abc123",
    "quantityTonnes": "100.5",
    "clientId": "test-client-1",
    "idempotencyKey": "reservation-test-001"
  }'
```

### Create Quote

```bash
curl -X POST http://localhost:3000/api/v1/checkout/quote \
  -H "Content-Type: application/json" \
  -d '{
    "assetPriceSourceId": "cm:listing:abc123",
    "quantityTonnes": "50.0",
    "idempotencyKey": "quote-test-001"
  }'
```

## Step 9: Verify On-Chain Anchoring

### Check Compliance Actions

```bash
# Query database
psql -U xcarbon -d xcarbon -c "SELECT ocr_id, action_type, tx_hash, anchored_at FROM compliance_actions ORDER BY anchored_at DESC LIMIT 10;"
```

### Verify On-Chain

```bash
# Using cast (from foundry)
cast call $COMPLIANCE_ANCHOR_ADDRESS "exists(bytes32)" $OCR_ID --rpc-url http://localhost:8545

# Get full anchor details
cast call $COMPLIANCE_ANCHOR_ADDRESS "getAnchor(bytes32)" $OCR_ID --rpc-url http://localhost:8545
```

## Development Workflow

### Running Tests

```bash
# All tests
npm test

# Watch mode
npm test -- --watch

# Specific test file
npm test -- src/services/carbonmark/client.test.ts

# Coverage
npm run test:coverage
```

### Linting

```bash
npm run lint
```

### Database Operations

```bash
# Run migrations
npm run db:migrate

# Seed test data
npm run db:seed

# Reset database (destructive!)
dropdb xcarbon && createdb xcarbon
psql -U xcarbon -d xcarbon -f db/schema.sql
npm run db:seed
```

### Contract Development

```bash
# Compile contracts
npm run contracts:compile

# Run contract tests
npm run contracts:test

# Deploy to local network
npm run contracts:deploy

# Deploy to testnet
npm run contracts:deploy -- --network sepolia
```

## Common Issues and Solutions

### Issue: Database Connection Failed

**Error:** `connection to server at "localhost", port 5432 failed`

**Solution:**
```bash
# Check if PostgreSQL is running
pg_isready

# Start PostgreSQL
# macOS
brew services start postgresql@14

# Ubuntu
sudo systemctl start postgresql

# Check connection
psql -U postgres -c "SELECT version();"
```

### Issue: Redis Connection Failed

**Error:** `Error: connect ECONNREFUSED 127.0.0.1:6379`

**Solution:**
```bash
# Check if Redis is running
redis-cli ping  # Should return "PONG"

# Start Redis
# macOS
brew services start redis

# Ubuntu
sudo systemctl start redis-server

# Docker
docker start redis  # or docker run -d -p 6379:6379 redis:7-alpine
```

### Issue: Carbonmark API Authentication Failed

**Error:** `401 Unauthorized`

**Solution:**
1. Verify API key in `.env` is correct
2. Ensure using Bearer token format
3. Check if test mode is enabled for test keys
4. Verify versioned endpoint (e.g., `v17.api.carbonmark.com`)

### Issue: Contract Deployment Failed

**Error:** `Error: could not detect network`

**Solution:**
```bash
# Ensure Hardhat node is running
npx hardhat node

# In another terminal, deploy
npm run contracts:deploy

# Or specify network explicitly
npx hardhat run scripts/deploy.ts --network localhost
```

### Issue: Out of Gas

**Error:** `Transaction ran out of gas`

**Solution:**
- Increase gas limit in Hardhat config
- For batch operations, reduce batch size
- Check contract logic for expensive operations

## Next Steps

1. **Implement Compliance Policies**
   - Add jurisdiction-specific rules in `src/services/compliance/policies/`
   - Configure Travel Rule thresholds
   - Set up sanctions list updates

2. **Set Up Monitoring**
   - Configure Prometheus metrics
   - Set up Grafana dashboards
   - Configure alerts (PagerDuty, Slack)

3. **Implement Authentication**
   - Add JWT-based API authentication
   - Implement client API key management
   - Set up rate limiting per client

4. **Add Tokenization**
   - Deploy ERC-20/1155 token contracts
   - Implement minting service
   - Set up event listeners for retirements

5. **Production Preparation**
   - Set up AWS S3 + KMS for evidence storage
   - Configure production database (RDS)
   - Set up VPC and security groups
   - Implement backup and disaster recovery

## Getting Help

- **Documentation**: See [README.md](./README.md) for full documentation
- **API Reference**: See [API.md](./docs/API.md) (once created)
- **Contract Documentation**: See [contracts/README.md](./contracts/README.md) (once created)
- **Issues**: Report bugs and request features on GitHub

## Production Deployment Checklist

Before deploying to production:

- [ ] Change all default secrets and passwords
- [ ] Use production API keys (not test keys)
- [ ] Set up SSL/TLS certificates
- [ ] Configure firewall rules
- [ ] Set up automated backups
- [ ] Implement monitoring and alerting
- [ ] Review and audit smart contracts
- [ ] Set up staging environment
- [ ] Load test the API
- [ ] Document incident response procedures
- [ ] Configure log aggregation
- [ ] Set up WAF (Web Application Firewall)
- [ ] Implement DDoS protection
- [ ] Review compliance with jurisdiction requirements
- [ ] Set up disaster recovery procedures

## Security Reminders

⚠️ **Never commit:**
- API keys
- Private keys
- Database passwords
- JWT secrets

⚠️ **Always:**
- Use environment variables
- Enable encryption at rest and in transit
- Implement proper access controls
- Audit and rotate credentials
- Monitor for suspicious activity
- Keep dependencies updated
- Follow security best practices
