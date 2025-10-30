import apiClient from "./apiClient";
import type {
  AuthServiceResponse,
  CarbonCredit,
  News,
  ContractTerm,
  BuyCarbonCreditResponse,
} from "@/types/api";

// GraphQL Queries and Mutations
const GRAPHQL_QUERIES = {
  GET_CARBON_CREDIT: `
    query GetCarbonCredit {
      carbonCredits {
        id
        project_name
        vintage
        quantity
        price
      }
    }
  `,
  GET_NEWS: `
    query GetNews($category: String!) {
      news(category: $category) {
        id
        title
        content
        source
      }
    }
  `,
  GET_CARBON_CREDIT_INFO: `
    query GetCarbonCreditInfo($id: ID!) {
      carbonCredit(id: $id) {
        id
        project_name
        vintage
        issuance_year
        project_ID
        registry_name
      }
    }
  `,
  GET_CONTRACT_TERMS: `
    query GetContractTerms {
      contractTerms {
        id
        term
        value
      }
    }
  `,
  BUY_CARBON_CREDIT: `
    mutation BuyCarbonCredit($quantity: Int!) {
      buyCarbonCredit(quantity: $quantity) {
        success
        message
      }
    }
  `,
};

// REST API Endpoints
const REST_ENDPOINTS = {
  GET_CARBON_CREDIT: "/dashboard/carbon-credits",
  GET_NEWS: "/dashboard/news",
  GET_CARBON_CREDIT_INFO: "/dashboard/carbon-credit-info",
  GET_CONTRACT_TERMS: "/dashboard/contract-terms",
  BUY_CARBON_CREDIT: "/dashboard/buy-carbon-credit",
};

class DashboardService {
  private apiClient = apiClient;

  async getCarbonCredit(): Promise<AuthServiceResponse<CarbonCredit[]>> {
    try {
      let response: CarbonCredit[];
      if (this.apiClient.type === "GRAPHQL") {
        const result = await this.apiClient.request<{ carbonCredits: CarbonCredit[] }>({
          query: GRAPHQL_QUERIES.GET_CARBON_CREDIT,
        });
        response = result.carbonCredits;
      } else {
        response = await this.apiClient.request<CarbonCredit[]>({
          method: "GET",
          url: REST_ENDPOINTS.GET_CARBON_CREDIT,
        });
      }
      return { success: true, data: response };
    } catch (error) {
      return {
        success: false,
        message: error instanceof Error ? error.message : "Failed to fetch carbon credits",
      };
    }
  }

  async getNews(category: string): Promise<AuthServiceResponse<News[]>> {
    try {
      let response: News[];
      if (this.apiClient.type === "GRAPHQL") {
        const result = await this.apiClient.request<{ news: News[] }>({
          query: GRAPHQL_QUERIES.GET_NEWS,
          variables: { category },
        });
        response = result.news;
      } else {
        response = await this.apiClient.request<News[]>({
          method: "GET",
          url: REST_ENDPOINTS.GET_NEWS,
          params: { category },
        });
      }
      return { success: true, data: response };
    } catch (error) {
      return {
        success: false,
        message: error instanceof Error ? error.message : "Failed to fetch news",
      };
    }
  }

  async getCarbonCreditInfo(id: string): Promise<AuthServiceResponse<CarbonCredit>> {
    try {
      let response: CarbonCredit;
      if (this.apiClient.type === "GRAPHQL") {
        const result = await this.apiClient.request<{ carbonCredit: CarbonCredit }>({
          query: GRAPHQL_QUERIES.GET_CARBON_CREDIT_INFO,
          variables: { id },
        });
        response = result.carbonCredit;
      } else {
        response = await this.apiClient.request<CarbonCredit>({
          method: "GET",
          url: REST_ENDPOINTS.GET_CARBON_CREDIT_INFO,
          params: { id },
        });
      }
      return { success: true, data: response };
    } catch (error) {
      return {
        success: false,
        message: error instanceof Error ? error.message : "Failed to fetch carbon credit info",
      };
    }
  }

  async getContractTerms(): Promise<AuthServiceResponse<ContractTerm[]>> {
    try {
      let response: ContractTerm[];
      if (this.apiClient.type === "GRAPHQL") {
        const result = await this.apiClient.request<{ contractTerms: ContractTerm[] }>({
          query: GRAPHQL_QUERIES.GET_CONTRACT_TERMS,
        });
        response = result.contractTerms;
      } else {
        response = await this.apiClient.request<ContractTerm[]>({
          method: "GET",
          url: REST_ENDPOINTS.GET_CONTRACT_TERMS,
        });
      }
      return { success: true, data: response };
    } catch (error) {
      return {
        success: false,
        message: error instanceof Error ? error.message : "Failed to fetch contract terms",
      };
    }
  }

  async buyCarbonCredit(quantity: number): Promise<AuthServiceResponse<BuyCarbonCreditResponse>> {
    try {
      let response: BuyCarbonCreditResponse;
      if (this.apiClient.type === "GRAPHQL") {
        const result = await this.apiClient.request<{ buyCarbonCredit: BuyCarbonCreditResponse }>({
          query: GRAPHQL_QUERIES.BUY_CARBON_CREDIT,
          variables: { quantity },
        });
        response = result.buyCarbonCredit;
      } else {
        response = await this.apiClient.request<BuyCarbonCreditResponse>({
          method: "POST",
          url: REST_ENDPOINTS.BUY_CARBON_CREDIT,
          data: { quantity },
        });
      }
      return { success: true, data: response };
    } catch (error) {
      return {
        success: false,
        message: error instanceof Error ? error.message : "Failed to buy carbon credit",
      };
    }
  }
}

const dashboardService = new DashboardService();
export default dashboardService;
