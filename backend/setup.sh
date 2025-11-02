#!/bin/bash

# XCARBON Backend Setup Script
# This script installs dependencies and sets up the development environment

set -e

echo "🚀 XCARBON Backend Setup"
echo "========================"
echo ""

# Check Node.js version
NODE_VERSION=$(node -v | cut -d 'v' -f 2 | cut -d '.' -f 1)
if [ "$NODE_VERSION" -lt 20 ]; then
  echo "❌ Node.js version 20 or higher is required"
  echo "   Current version: $(node -v)"
  exit 1
fi
echo "✅ Node.js version: $(node -v)"

# Check if package.json exists
if [ ! -f "package.json" ]; then
  echo "❌ package.json not found. Are you in the backend directory?"
  exit 1
fi

echo ""
echo "📦 Installing dependencies..."
npm install

echo ""
echo "✅ Dependencies installed"

# Check for .env file
if [ ! -f ".env" ]; then
  echo ""
  echo "⚠️  .env file not found"
  echo "   Copying .env.example to .env..."
  cp .env.example .env
  echo "   ⚠️  Please edit .env with your configuration before starting the server"
else
  echo ""
  echo "✅ .env file exists"
fi

# Check PostgreSQL
echo ""
echo "🔍 Checking PostgreSQL..."
if command -v psql &> /dev/null; then
  echo "✅ PostgreSQL client found"
  if pg_isready &> /dev/null; then
    echo "✅ PostgreSQL server is running"
  else
    echo "⚠️  PostgreSQL server is not running"
    echo "   Start it with: brew services start postgresql@14  (macOS)"
    echo "   or: sudo systemctl start postgresql  (Linux)"
  fi
else
  echo "⚠️  PostgreSQL client not found"
  echo "   Install it with: brew install postgresql@14  (macOS)"
  echo "   or: sudo apt-get install postgresql  (Linux)"
fi

# Check Redis
echo ""
echo "🔍 Checking Redis..."
if command -v redis-cli &> /dev/null; then
  echo "✅ Redis client found"
  if redis-cli ping &> /dev/null; then
    echo "✅ Redis server is running"
  else
    echo "⚠️  Redis server is not running"
    echo "   Start it with: brew services start redis  (macOS)"
    echo "   or: sudo systemctl start redis-server  (Linux)"
    echo "   or: docker run -d -p 6379:6379 redis:7-alpine  (Docker)"
  fi
else
  echo "⚠️  Redis client not found"
  echo "   Install it with: brew install redis  (macOS)"
  echo "   or: sudo apt-get install redis-server  (Linux)"
fi

echo ""
echo "========================"
echo "✅ Setup complete!"
echo ""
echo "Next steps:"
echo "1. Edit .env with your API keys and database credentials"
echo "2. Create PostgreSQL database: createdb xcarbon"
echo "3. Run database migrations: psql -U xcarbon -d xcarbon -f db/schema.sql"
echo "4. Start development server: npm run dev"
echo ""
echo "For detailed instructions, see QUICKSTART.md"
