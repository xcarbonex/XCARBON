import apiClient from "./apiClient";
import type {
  AuthServiceResponse,
  MintCarbonCreditInput,
  MintCarbonCreditResponse,
  GasFees,
} from "@/types/api";

// GraphQL Queries and Mutations
const GRAPHQL_QUERIES = {
  SAVE_MINT_CARBON_CREDIT: `
    mutation SaveMintCarbonCredit($payload: MintCarbonCreditInput!) {
      saveMintCarbonCredit(input: $payload) {
        success
        message
      }
    }
  `,
  GET_GAS_FEES: `
    query GetGasFees($quantity: Int!) {
      gasFees(quantity: $quantity) {
        amount
        currency
      }
    }
  `,
};

// REST API Endpoints
const REST_ENDPOINTS = {
  SAVE_MINT_CARBON_CREDIT: "/mint-carbon-credits",
  GET_GAS_FEES: "/mint-carbon-credits/gas-fees",
};

class MintingCarbonAssetsService {
  private apiClient = apiClient;

  async saveMintCarbonCredit(
    payload: MintCarbonCreditInput
  ): Promise<AuthServiceResponse<MintCarbonCreditResponse>> {
    try {
      let response: MintCarbonCreditResponse;
      if (this.apiClient.type === "GRAPHQL") {
        const result = await this.apiClient.request<{
          saveMintCarbonCredit: MintCarbonCreditResponse;
        }>({
          query: GRAPHQL_QUERIES.SAVE_MINT_CARBON_CREDIT,
          variables: { payload },
        });
        response = result.saveMintCarbonCredit;
      } else {
        response = await this.apiClient.request<MintCarbonCreditResponse>({
          method: "POST",
          url: REST_ENDPOINTS.SAVE_MINT_CARBON_CREDIT,
          data: payload,
        });
      }
      return { success: true, data: response };
    } catch (error) {
      const message = error instanceof Error ? error.message : "An error occurred";
      return { success: false, message };
    }
  }

  async getGasFees(quantity: number): Promise<AuthServiceResponse<GasFees>> {
    try {
      let response: GasFees;
      if (this.apiClient.type === "GRAPHQL") {
        const result = await this.apiClient.request<{ gasFees: GasFees }>({
          query: GRAPHQL_QUERIES.GET_GAS_FEES,
          variables: { quantity },
        });
        response = result.gasFees;
      } else {
        response = await this.apiClient.request<GasFees>({
          method: "POST",
          url: REST_ENDPOINTS.GET_GAS_FEES,
          data: { quantity },
        });
      }
      return { success: true, data: response };
    } catch (error) {
      const message = error instanceof Error ? error.message : "An error occurred";
      return { success: false, message };
    }
  }
}

const mintingCarbonAssetsService = new MintingCarbonAssetsService();
export default mintingCarbonAssetsService;
