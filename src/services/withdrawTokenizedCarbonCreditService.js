import apiClient from "./apiClient";

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
  constructor() {
    this.apiClient = apiClient;
  }

  async getAssetById(id) {
    try {
      let response;
      if (this.apiClient.type === "GRAPHQL") {
        response = await this.apiClient.request({
          query: GRAPHQL_QUERIES.GET_ASSET_BY_ID,
          variables: { id },
        });
        response = response.asset;
      } else {
        response = await this.apiClient.request({
          method: "GET",
          url: `${REST_ENDPOINTS.GET_ASSET_BY_ID}/${id}`,
        });
      }
      return { success: true, data: response };
    } catch (error) {
      return { success: false, message: error.message };
    }
  }

  async saveWithdrawAssets(payload) {
    try {
      let response;
      if (this.apiClient.type === "GRAPHQL") {
        response = await this.apiClient.request({
          query: GRAPHQL_QUERIES.SAVE_WITHDRAW_ASSETS,
          variables: { payload },
        });
        response = response.saveWithdrawAssets;
      } else {
        response = await this.apiClient.request({
          method: "POST",
          url: REST_ENDPOINTS.SAVE_WITHDRAW_ASSETS,
          data: payload,
        });
      }
      return { success: true, data: response };
    } catch (error) {
      return { success: false, message: error.message };
    }
  }
}

export default new WithdrawTokenizedCarbonCreditService(); 