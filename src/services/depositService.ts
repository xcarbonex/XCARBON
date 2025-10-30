import apiClient from "./apiClient";
import type { AuthServiceResponse } from "@/types/api";

interface DepositResponse {
  success: boolean;
  message: string;
}

interface DepositListItem {
  id: string;
  currency: string;
  amount: number;
  method: string;
  status: string;
  transactionID: string;
}

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
  private apiClient = apiClient;

  async deposit(
    currency: string,
    amount: number,
    method: string
  ): Promise<AuthServiceResponse<DepositResponse>> {
    try {
      let response: DepositResponse;
      if (this.apiClient.type === "GRAPHQL") {
        const result = await this.apiClient.request<{ deposit: DepositResponse }>({
          query: GRAPHQL_QUERIES.DEPOSIT,
          variables: { currency, amount, method },
        });
        response = result.deposit;
      } else {
        response = await this.apiClient.request<DepositResponse>({
          method: "POST",
          url: REST_ENDPOINTS.DEPOSIT,
          data: { currency, amount, method },
        });
      }
      return { success: true, data: response };
    } catch (error) {
      return {
        success: false,
        message: error instanceof Error ? error.message : "Failed to deposit",
      };
    }
  }

  async getDepositList(): Promise<AuthServiceResponse<DepositListItem[]>> {
    try {
      let response: DepositListItem[];
      if (this.apiClient.type === "GRAPHQL") {
        const result = await this.apiClient.request<{ depositList: DepositListItem[] }>({
          query: GRAPHQL_QUERIES.GET_DEPOSIT_LIST,
        });
        response = result.depositList;
      } else {
        response = await this.apiClient.request<DepositListItem[]>({
          method: "GET",
          url: REST_ENDPOINTS.GET_DEPOSIT_LIST,
        });
      }
      return { success: true, data: response };
    } catch (error) {
      return {
        success: false,
        message: error instanceof Error ? error.message : "Failed to fetch deposit list",
      };
    }
  }
}

const depositService = new DepositService();
export default depositService;
