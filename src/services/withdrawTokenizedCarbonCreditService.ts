import apiClient from "./apiClient";
import type {
  AuthServiceResponse,
  AssetDetail,
  WithdrawAssetInput,
  WithdrawAssetsResponse,
} from "@/types/api";

// GraphQL Queries and Mutations
const GRAPHQL_QUERIES = {
  GET_ASSET_BY_ID: `
    query GetAssetById($id: ID!) {
      asset(id: $id) {
        project_id
        project_name
        type
        total_available_asset
        registry_vintage_year
        symbol
        additional_info
        asset_withdraw_status
      }
    }
  `,
  SAVE_WITHDRAW_ASSETS: `
    mutation SaveWithdrawAssets($payload: WithdrawAssetInput!) {
      saveWithdrawAssets(input: $payload) {
        success
        message
      }
    }
  `,
};

// REST API Endpoints
const REST_ENDPOINTS = {
  GET_ASSET_BY_ID: "/wallet/asset",
  SAVE_WITHDRAW_ASSETS: "/wallet/withdraw-tokenized-carbon-credit",
};

class WithdrawTokenizedCarbonCreditService {
  private apiClient = apiClient;

  async getAssetById(id: string): Promise<AuthServiceResponse<AssetDetail>> {
    try {
      let response: AssetDetail;
      if (this.apiClient.type === "GRAPHQL") {
        const result = await this.apiClient.request<{ asset: AssetDetail }>({
          query: GRAPHQL_QUERIES.GET_ASSET_BY_ID,
          variables: { id },
        });
        response = result.asset;
      } else {
        response = await this.apiClient.request<AssetDetail>({
          method: "GET",
          url: `${REST_ENDPOINTS.GET_ASSET_BY_ID}/${id}`,
        });
      }
      return { success: true, data: response };
    } catch (error) {
      const message = error instanceof Error ? error.message : "An error occurred";
      return { success: false, message };
    }
  }

  async saveWithdrawAssets(
    payload: WithdrawAssetInput
  ): Promise<AuthServiceResponse<WithdrawAssetsResponse>> {
    try {
      let response: WithdrawAssetsResponse;
      if (this.apiClient.type === "GRAPHQL") {
        const result = await this.apiClient.request<{
          saveWithdrawAssets: WithdrawAssetsResponse;
        }>({
          query: GRAPHQL_QUERIES.SAVE_WITHDRAW_ASSETS,
          variables: { payload },
        });
        response = result.saveWithdrawAssets;
      } else {
        response = await this.apiClient.request<WithdrawAssetsResponse>({
          method: "POST",
          url: REST_ENDPOINTS.SAVE_WITHDRAW_ASSETS,
          data: payload,
        });
      }
      return { success: true, data: response };
    } catch (error) {
      const message = error instanceof Error ? error.message : "An error occurred";
      return { success: false, message };
    }
  }
}

const withdrawTokenizedCarbonCreditService = new WithdrawTokenizedCarbonCreditService();
export default withdrawTokenizedCarbonCreditService;
