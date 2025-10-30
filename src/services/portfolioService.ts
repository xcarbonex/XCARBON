import apiClient from "./apiClient";
import type { AuthServiceResponse } from "@/types/api";

interface OpenPosition {
  id: string;
  asset: string;
  quantity: number;
  marketValue: number;
  costBasis: number;
}

interface HistoricalTrade {
  id: string;
  asset: string;
  tradeDate: string;
  type: string;
  quantity: number;
  price: number;
}

interface PendingMonthlyContract {
  id: string;
  agreementID: string;
  nextDeliveryDate: string;
  paymentStatus: string;
}

interface Agreement {
  id: string;
  details: string;
}

interface WalletInfo {
  totalXCBStaked: number;
  totalTokenizedCarbonCredit: number;
  totalQuantity: number;
}

// GraphQL Queries and Mutations
const GRAPHQL_QUERIES = {
  GET_OPEN_POSITION: `
    query GetOpenPosition {
      openPositions {
        id
        asset
        quantity
        marketValue
        costBasis
      }
    }
  `,
  GET_HISTORICAL_TRADES: `
    query GetHistoricalTrades {
      historicalTrades {
        id
        asset
        tradeDate
        type
        quantity
        price
      }
    }
  `,
  GET_PENDING_MONTHLY_CONTRACT: `
    query GetPendingMonthlyContract {
      pendingMonthlyContracts {
        id
        agreementID
        nextDeliveryDate
        paymentStatus
      }
    }
  `,
  GET_AGREEMENT: `
    query GetAgreement {
      agreement {
        id
        details
      }
    }
  `,
  GET_WALLET_INFO: `
    query GetWalletInfo {
      walletInfo {
        totalXCBStaked
        totalTokenizedCarbonCredit
        totalQuantity
      }
    }
  `,
};

// REST API Endpoints
const REST_ENDPOINTS = {
  GET_OPEN_POSITION: "/portfolio/open-position",
  GET_HISTORICAL_TRADES: "/portfolio/historical-trades",
  GET_PENDING_MONTHLY_CONTRACT: "/portfolio/pending-monthly-contract",
  GET_AGREEMENT: "/portfolio/agreement",
  GET_WALLET_INFO: "/portfolio/wallet-info",
};

class PortfolioService {
  private apiClient = apiClient;

  async getOpenPosition(): Promise<AuthServiceResponse<OpenPosition[]>> {
    try {
      let response: OpenPosition[];
      if (this.apiClient.type === "GRAPHQL") {
        const result = await this.apiClient.request<{ openPositions: OpenPosition[] }>({
          query: GRAPHQL_QUERIES.GET_OPEN_POSITION,
        });
        response = result.openPositions;
      } else {
        response = await this.apiClient.request<OpenPosition[]>({
          method: "GET",
          url: REST_ENDPOINTS.GET_OPEN_POSITION,
        });
      }
      return { success: true, data: response };
    } catch (error) {
      return {
        success: false,
        message: error instanceof Error ? error.message : "Failed to fetch open positions",
      };
    }
  }

  async getHistoricalTrades(): Promise<AuthServiceResponse<HistoricalTrade[]>> {
    try {
      let response: HistoricalTrade[];
      if (this.apiClient.type === "GRAPHQL") {
        const result = await this.apiClient.request<{ historicalTrades: HistoricalTrade[] }>({
          query: GRAPHQL_QUERIES.GET_HISTORICAL_TRADES,
        });
        response = result.historicalTrades;
      } else {
        response = await this.apiClient.request<HistoricalTrade[]>({
          method: "GET",
          url: REST_ENDPOINTS.GET_HISTORICAL_TRADES,
        });
      }
      return { success: true, data: response };
    } catch (error) {
      return {
        success: false,
        message: error instanceof Error ? error.message : "Failed to fetch historical trades",
      };
    }
  }

  async getPendingMonthlyContract(): Promise<AuthServiceResponse<PendingMonthlyContract[]>> {
    try {
      let response: PendingMonthlyContract[];
      if (this.apiClient.type === "GRAPHQL") {
        const result = await this.apiClient.request<{
          pendingMonthlyContracts: PendingMonthlyContract[];
        }>({
          query: GRAPHQL_QUERIES.GET_PENDING_MONTHLY_CONTRACT,
        });
        response = result.pendingMonthlyContracts;
      } else {
        response = await this.apiClient.request<PendingMonthlyContract[]>({
          method: "GET",
          url: REST_ENDPOINTS.GET_PENDING_MONTHLY_CONTRACT,
        });
      }
      return { success: true, data: response };
    } catch (error) {
      return {
        success: false,
        message:
          error instanceof Error ? error.message : "Failed to fetch pending monthly contracts",
      };
    }
  }

  async getAgreement(): Promise<AuthServiceResponse<Agreement>> {
    try {
      let response: Agreement;
      if (this.apiClient.type === "GRAPHQL") {
        const result = await this.apiClient.request<{ agreement: Agreement }>({
          query: GRAPHQL_QUERIES.GET_AGREEMENT,
        });
        response = result.agreement;
      } else {
        response = await this.apiClient.request<Agreement>({
          method: "GET",
          url: REST_ENDPOINTS.GET_AGREEMENT,
        });
      }
      return { success: true, data: response };
    } catch (error) {
      return {
        success: false,
        message: error instanceof Error ? error.message : "Failed to fetch agreement",
      };
    }
  }

  async getWalletInfo(): Promise<AuthServiceResponse<WalletInfo>> {
    try {
      let response: WalletInfo;
      if (this.apiClient.type === "GRAPHQL") {
        const result = await this.apiClient.request<{ walletInfo: WalletInfo }>({
          query: GRAPHQL_QUERIES.GET_WALLET_INFO,
        });
        response = result.walletInfo;
      } else {
        response = await this.apiClient.request<WalletInfo>({
          method: "GET",
          url: REST_ENDPOINTS.GET_WALLET_INFO,
        });
      }
      return { success: true, data: response };
    } catch (error) {
      return {
        success: false,
        message: error instanceof Error ? error.message : "Failed to fetch wallet info",
      };
    }
  }
}

const portfolioService = new PortfolioService();
export default portfolioService;
