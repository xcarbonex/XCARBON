import apiClient from "./apiClient";
import type { AuthServiceResponse, CcAsset, CcAssetsParams, TokenizedCcData } from "@/types/api";

// GraphQL Queries and Mutations
const GRAPHQL_QUERIES = {
  GET_CC_ASSETS: `
    query GetCcAssets($registryId: String, $vintage: String, $goldStandard: Boolean, $climateActionReserve: Boolean) {
      ccAssets(registryId: $registryId, vintage: $vintage, goldStandard: $goldStandard, climateActionReserve: $climateActionReserve) {
        registry_id
        project_name
        project_type
        issuance_year
        token_traces
        location
        certification_status
        verification_body
        serial_number_range
        project_location_map
        sdg_impact_tags
        project_verified
        registry_documentation_URL
        token_quantity_at_issuance
        remaining_quantity
      }
    }
  `,
  GET_TOKENIZED_CC_DATA_BY_TOKENIZE_ASSET_ID: `
    query GetTokenizedCcDataByTokenizeAssetId($tokenizeAssetId: ID!) {
      tokenizedCcData(tokenizeAssetId: $tokenizeAssetId) {
        asset_ID
        project_name
        project_type
        vintage_issuance_year
        token_id
        available_balance
        price_per_unit
      }
    }
  `,
};

// REST API Endpoints
const REST_ENDPOINTS = {
  GET_CC_ASSETS: "/registry/cc-assets",
  GET_TOKENIZED_CC_DATA_BY_TOKENIZE_ASSET_ID: "/registry/tokenized-cc-data",
};

class RegistryAssetsService {
  private apiClient = apiClient;

  async getCcAssets(params: CcAssetsParams): Promise<AuthServiceResponse<CcAsset[]>> {
    try {
      let response: CcAsset[];
      if (this.apiClient.type === "GRAPHQL") {
        const result = await this.apiClient.request<{ ccAssets: CcAsset[] }>({
          query: GRAPHQL_QUERIES.GET_CC_ASSETS,
          variables: params as Record<string, unknown>,
        });
        response = result.ccAssets;
      } else {
        // Filter out undefined values for REST params
        const restParams = Object.entries(params).reduce(
          (acc, [key, value]) => {
            if (value !== undefined) {
              acc[key] = value;
            }
            return acc;
          },
          {} as Record<string, string | boolean>
        );
        response = await this.apiClient.request<CcAsset[]>({
          method: "GET",
          url: REST_ENDPOINTS.GET_CC_ASSETS,
          params: restParams,
        });
      }
      return { success: true, data: response };
    } catch (error) {
      const message = error instanceof Error ? error.message : "An error occurred";
      return { success: false, message };
    }
  }

  async getTokenizedCcDataByTokenizeAssetId(
    tokenizeAssetId: string
  ): Promise<AuthServiceResponse<TokenizedCcData>> {
    try {
      let response: TokenizedCcData;
      if (this.apiClient.type === "GRAPHQL") {
        const result = await this.apiClient.request<{
          tokenizedCcData: TokenizedCcData;
        }>({
          query: GRAPHQL_QUERIES.GET_TOKENIZED_CC_DATA_BY_TOKENIZE_ASSET_ID,
          variables: { tokenizeAssetId },
        });
        response = result.tokenizedCcData;
      } else {
        response = await this.apiClient.request<TokenizedCcData>({
          method: "GET",
          url: REST_ENDPOINTS.GET_TOKENIZED_CC_DATA_BY_TOKENIZE_ASSET_ID,
          params: { tokenizeAssetId },
        });
      }
      return { success: true, data: response };
    } catch (error) {
      const message = error instanceof Error ? error.message : "An error occurred";
      return { success: false, message };
    }
  }
}

const registryAssetsService = new RegistryAssetsService();
export default registryAssetsService;
