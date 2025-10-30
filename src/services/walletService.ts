import apiClient from "./apiClient";
import type { AuthServiceResponse } from "@/types/api";

interface TransactionHistory {
  id: string;
  date: string;
  assets: string;
  type: string;
  amount: number;
  status: string;
  blockchainTransactionID: string;
}

interface ContractDeliverySchedule {
  id: string;
  contractID: string;
  assets: string;
  nextDelivery: string;
  totalDelivery: number;
  status: string;
}

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
  private apiClient = apiClient;

  async getTransactionHistory(): Promise<AuthServiceResponse<TransactionHistory[]>> {
    try {
      let response: TransactionHistory[];
      if (this.apiClient.type === "GRAPHQL") {
        const result = await this.apiClient.request<{ transactionHistory: TransactionHistory[] }>({
          query: GRAPHQL_QUERIES.GET_TRANSACTION_HISTORY,
        });
        response = result.transactionHistory;
      } else {
        response = await this.apiClient.request<TransactionHistory[]>({
          method: "GET",
          url: REST_ENDPOINTS.GET_TRANSACTION_HISTORY,
        });
      }
      return { success: true, data: response };
    } catch (error) {
      return {
        success: false,
        message: error instanceof Error ? error.message : "Failed to fetch transaction history",
      };
    }
  }

  async getContractDeliverySchedule(): Promise<AuthServiceResponse<ContractDeliverySchedule[]>> {
    try {
      let response: ContractDeliverySchedule[];
      if (this.apiClient.type === "GRAPHQL") {
        const result = await this.apiClient.request<{
          contractDeliverySchedule: ContractDeliverySchedule[];
        }>({
          query: GRAPHQL_QUERIES.GET_CONTRACT_DELIVERY_SCHEDULE,
        });
        response = result.contractDeliverySchedule;
      } else {
        response = await this.apiClient.request<ContractDeliverySchedule[]>({
          method: "GET",
          url: REST_ENDPOINTS.GET_CONTRACT_DELIVERY_SCHEDULE,
        });
      }
      return { success: true, data: response };
    } catch (error) {
      return {
        success: false,
        message:
          error instanceof Error ? error.message : "Failed to fetch contract delivery schedule",
      };
    }
  }
}

const walletService = new WalletService();
export default walletService;
