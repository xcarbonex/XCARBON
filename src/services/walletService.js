import apiClient from "./apiClient";

// GraphQL Queries and Mutations
const GRAPHQL_QUERIES = {
  GET_TRANSACTION_HISTORY: `
    query GetTransactionHistory {
      transactionHistory {
        id
        date
        assets
        type
        amount
        status
        blockchainTransactionID
      }
    }
  `,
  GET_CONTRACT_DELIVERY_SCHEDULE: `
    query GetContractDeliverySchedule {
      contractDeliverySchedule {
        id
        contractID
        assets
        nextDelivery
        totalDelivery
        status
      }
    }
  `,
};

// REST API Endpoints
const REST_ENDPOINTS = {
  GET_TRANSACTION_HISTORY: "/wallet/transaction-history",
  GET_CONTRACT_DELIVERY_SCHEDULE: "/wallet/contract-delivery-schedule",
};

class WalletService {
  constructor() {
    this.apiClient = apiClient;
  }

  async getTransactionHistory() {
    try {
      let response;
      if (this.apiClient.type === "GRAPHQL") {
        response = await this.apiClient.request({
          query: GRAPHQL_QUERIES.GET_TRANSACTION_HISTORY,
        });
        response = response.transactionHistory;
      } else {
        response = await this.apiClient.request({
          method: "GET",
          url: REST_ENDPOINTS.GET_TRANSACTION_HISTORY,
        });
      }
      return { success: true, data: response };
    } catch (error) {
      return { success: false, message: error.message };
    }
  }

  async getContractDeliverySchedule() {
    try {
      let response;
      if (this.apiClient.type === "GRAPHQL") {
        response = await this.apiClient.request({
          query: GRAPHQL_QUERIES.GET_CONTRACT_DELIVERY_SCHEDULE,
        });
        response = response.contractDeliverySchedule;
      } else {
        response = await this.apiClient.request({
          method: "GET",
          url: REST_ENDPOINTS.GET_CONTRACT_DELIVERY_SCHEDULE,
        });
      }
      return { success: true, data: response };
    } catch (error) {
      return { success: false, message: error.message };
    }
  }
}

export default new WalletService(); 