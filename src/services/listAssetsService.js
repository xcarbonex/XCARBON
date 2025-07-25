import apiClient from "./apiClient";

// GraphQL Queries and Mutations
const GRAPHQL_QUERIES = {
  SALE_TOKENIZED_ASSETS: `
    query SaleTokenizedAssets {
      saleTokenizedAssets {
        id
        tokenizedAssetId
        quantity
        pricePerUnit
        listingDate
        status
      }
    }
  `,
  LIST_ASSETS: `
    query ListAssets($payload: ListAssetsInput!) {
      listAssets(input: $payload) {
        id
        tokenizedAssetId
        quantity
        pricePerUnit
        listingDate
        status
      }
    }
  `,
  SEARCH_ASSETS: `
    query SearchAssets($id: ID!) {
      searchAssets(id: $id) {
        id
        tokenizedAssetId
        quantity
        pricePerUnit
        listingDate
        status
      }
    }
  `,
};

// REST API Endpoints
const REST_ENDPOINTS = {
  SALE_TOKENIZED_ASSETS: "/list-tokenized-assets/for-sale",
  LIST_ASSETS: "/list-tokenized-assets/list",
  SEARCH_ASSETS: "/list-tokenized-assets/search",
};

class ListAssetsService {
  constructor() {
    this.apiClient = apiClient;
  }

  async getSaleTokenizedAssets() {
    try {
      let response;
      if (this.apiClient.type === "GRAPHQL") {
        response = await this.apiClient.request({
          query: GRAPHQL_QUERIES.SALE_TOKENIZED_ASSETS,
        });
        response = response.saleTokenizedAssets;
      } else {
        response = await this.apiClient.request({
          method: "GET",
          url: REST_ENDPOINTS.SALE_TOKENIZED_ASSETS,
        });
      }
      return { success: true, data: response };
    } catch (error) {
      return { success: false, message: error.message };
    }
  }

  async listAssets(payload) {
    try {
      let response;
      if (this.apiClient.type === "GRAPHQL") {
        response = await this.apiClient.request({
          query: GRAPHQL_QUERIES.LIST_ASSETS,
          variables: { payload },
        });
        response = response.listAssets;
      } else {
        response = await this.apiClient.request({
          method: "POST",
          url: REST_ENDPOINTS.LIST_ASSETS,
          data: payload,
        });
      }
      return { success: true, data: response };
    } catch (error) {
      return { success: false, message: error.message };
    }
  }

  async searchAssets(id) {
    try {
      let response;
      if (this.apiClient.type === "GRAPHQL") {
        response = await this.apiClient.request({
          query: GRAPHQL_QUERIES.SEARCH_ASSETS,
          variables: { id },
        });
        response = response.searchAssets;
      } else {
        response = await this.apiClient.request({
          method: "GET",
          url: REST_ENDPOINTS.SEARCH_ASSETS,
          params: { id },
        });
      }
      return { success: true, data: response };
    } catch (error) {
      return { success: false, message: error.message };
    }
  }
}

export default new ListAssetsService(); 