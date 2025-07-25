import apiClient from "./apiClient";

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
  constructor() {
    this.apiClient = apiClient;
  }

  async saveMintCarbonCredit(payload) {
    try {
      let response;
      if (this.apiClient.type === "GRAPHQL") {
        response = await this.apiClient.request({
          query: GRAPHQL_QUERIES.SAVE_MINT_CARBON_CREDIT,
          variables: { payload },
        });
        response = response.saveMintCarbonCredit;
      } else {
        response = await this.apiClient.request({
          method: "POST",
          url: REST_ENDPOINTS.SAVE_MINT_CARBON_CREDIT,
          data: payload,
        });
      }
      return { success: true, data: response };
    } catch (error) {
      return { success: false, message: error.message };
    }
  }

  async getGasFees(quantity) {
    try {
      let response;
      if (this.apiClient.type === "GRAPHQL") {
        response = await this.apiClient.request({
          query: GRAPHQL_QUERIES.GET_GAS_FEES,
          variables: { quantity },
        });
        response = response.gasFees;
      } else {
        response = await this.apiClient.request({
          method: "POST",
          url: REST_ENDPOINTS.GET_GAS_FEES,
          data: { quantity },
        });
      }
      return { success: true, data: response };
    } catch (error) {
      return { success: false, message: error.message };
    }
  }
}

export default new MintingCarbonAssetsService(); 