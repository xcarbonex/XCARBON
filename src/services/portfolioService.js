import apiClient from "./apiClient";

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
  constructor() {
    this.apiClient = apiClient;
  }

  async getOpenPosition() {
    try {
      let response;
      if (this.apiClient.type === "GRAPHQL") {
        response = await this.apiClient.request({
          query: GRAPHQL_QUERIES.GET_OPEN_POSITION,
        });
        response = response.openPositions;
      } else {
        response = await this.apiClient.request({
          method: "GET",
          url: REST_ENDPOINTS.GET_OPEN_POSITION,
        });
      }
      return { success: true, data: response };
    } catch (error) {
      return { success: false, message: error.message };
    }
  }

  async getHistoricalTrades() {
    try {
      let response;
      if (this.apiClient.type === "GRAPHQL") {
        response = await this.apiClient.request({
          query: GRAPHQL_QUERIES.GET_HISTORICAL_TRADES,
        });
        response = response.historicalTrades;
      } else {
        response = await this.apiClient.request({
          method: "GET",
          url: REST_ENDPOINTS.GET_HISTORICAL_TRADES,
        });
      }
      return { success: true, data: response };
    } catch (error) {
      return { success: false, message: error.message };
    }
  }

  async getPendingMonthlyContract() {
    try {
      let response;
      if (this.apiClient.type === "GRAPHQL") {
        response = await this.apiClient.request({
          query: GRAPHQL_QUERIES.GET_PENDING_MONTHLY_CONTRACT,
        });
        response = response.pendingMonthlyContracts;
      } else {
        response = await this.apiClient.request({
          method: "GET",
          url: REST_ENDPOINTS.GET_PENDING_MONTHLY_CONTRACT,
        });
      }
      return { success: true, data: response };
    } catch (error) {
      return { success: false, message: error.message };
    }
  }

  async getAgreement() {
    try {
      let response;
      if (this.apiClient.type === "GRAPHQL") {
        response = await this.apiClient.request({
          query: GRAPHQL_QUERIES.GET_AGREEMENT,
        });
        response = response.agreement;
      } else {
        response = await this.apiClient.request({
          method: "GET",
          url: REST_ENDPOINTS.GET_AGREEMENT,
        });
      }
      return { success: true, data: response };
    } catch (error) {
      return { success: false, message: error.message };
    }
  }

  async getWalletInfo() {
    try {
      let response;
      if (this.apiClient.type === "GRAPHQL") {
        response = await this.apiClient.request({
          query: GRAPHQL_QUERIES.GET_WALLET_INFO,
        });
        response = response.walletInfo;
      } else {
        response = await this.apiClient.request({
          method: "GET",
          url: REST_ENDPOINTS.GET_WALLET_INFO,
        });
      }
      return { success: true, data: response };
    } catch (error) {
      return { success: false, message: error.message };
    }
  }
}

export default new PortfolioService(); 