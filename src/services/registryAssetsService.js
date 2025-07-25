import apiClient from "./apiClient";

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
  constructor() {
    this.apiClient = apiClient;
  }

  async getCcAssets(params) {
    try {
      let response;
      if (this.apiClient.type === "GRAPHQL") {
        response = await this.apiClient.request({
          query: GRAPHQL_QUERIES.GET_CC_ASSETS,
          variables: params,
        });
        response = response.ccAssets;
      } else {
        response = await this.apiClient.request({
          method: "GET",
          url: REST_ENDPOINTS.GET_CC_ASSETS,
          params: params,
        });
      }
      return { success: true, data: response };
    } catch (error) {
      return { success: false, message: error.message };
    }
  }

  async getTokenizedCcDataByTokenizeAssetId(tokenizeAssetId) {
    try {
      let response;
      if (this.apiClient.type === "GRAPHQL") {
        response = await this.apiClient.request({
          query: GRAPHQL_QUERIES.GET_TOKENIZED_CC_DATA_BY_TOKENIZE_ASSET_ID,
          variables: { tokenizeAssetId },
        });
        response = response.tokenizedCcData;
      } else {
        response = await this.apiClient.request({
          method: "GET",
          url: REST_ENDPOINTS.GET_TOKENIZED_CC_DATA_BY_TOKENIZE_ASSET_ID,
          params: { tokenizeAssetId },
        });
      }
      return { success: true, data: response };
    } catch (error) {
      return { success: false, message: error.message };
    }
  }
}

export default new RegistryAssetsService(); 