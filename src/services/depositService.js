import apiClient from "./apiClient";

// GraphQL Queries and Mutations
const GRAPHQL_QUERIES = {
  DEPOSIT: `
    mutation Deposit($currency: String!, $amount: Float!, $method: String!) {
      deposit(currency: $currency, amount: $amount, method: $method) {
        success
        message
      }
    }
  `,
  GET_DEPOSIT_LIST: `
    query GetDepositList {
      depositList {
        id
        currency
        amount
        method
        status
        transactionID
      }
    }
  `,
};

// REST API Endpoints
const REST_ENDPOINTS = {
  DEPOSIT: "/deposit/deposit",
  GET_DEPOSIT_LIST: "/deposit/deposit-list",
};

class DepositService {
  constructor() {
    this.apiClient = apiClient;
  }

  async deposit(currency, amount, method) {
    try {
      let response;
      if (this.apiClient.type === "GRAPHQL") {
        response = await this.apiClient.request({
          query: GRAPHQL_QUERIES.DEPOSIT,
          variables: { currency, amount, method },
        });
        response = response.deposit;
      } else {
        response = await this.apiClient.request({
          method: "POST",
          url: REST_ENDPOINTS.DEPOSIT,
          data: { currency, amount, method },
        });
      }
      return { success: true, data: response };
    } catch (error) {
      return { success: false, message: error.message };
    }
  }

  async getDepositList() {
    try {
      let response;
      if (this.apiClient.type === "GRAPHQL") {
        response = await this.apiClient.request({
          query: GRAPHQL_QUERIES.GET_DEPOSIT_LIST,
        });
        response = response.depositList;
      } else {
        response = await this.apiClient.request({
          method: "GET",
          url: REST_ENDPOINTS.GET_DEPOSIT_LIST,
        });
      }
      return { success: true, data: response };
    } catch (error) {
      return { success: false, message: error.message };
    }
  }
}

export default new DepositService(); 