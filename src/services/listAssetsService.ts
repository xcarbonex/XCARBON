import apiClient from "./apiClient";
import type {
  AuthServiceResponse,
  SaleTokenizedAsset,
  ListAssetsInput,
  ListedAsset,
} from "@/types/api";

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
  private apiClient = apiClient;

  async getSaleTokenizedAssets(): Promise<AuthServiceResponse<SaleTokenizedAsset[]>> {
    try {
      let response: SaleTokenizedAsset[];
      if (this.apiClient.type === "GRAPHQL") {
        const result = await this.apiClient.request<{
          saleTokenizedAssets: SaleTokenizedAsset[];
        }>({
          query: GRAPHQL_QUERIES.SALE_TOKENIZED_ASSETS,
        });
        response = result.saleTokenizedAssets;
      } else {
        response = await this.apiClient.request<SaleTokenizedAsset[]>({
          method: "GET",
          url: REST_ENDPOINTS.SALE_TOKENIZED_ASSETS,
        });
      }
      return { success: true, data: response };
    } catch (error) {
      const message = error instanceof Error ? error.message : "An error occurred";
      return { success: false, message };
    }
  }

  async listAssets(payload: ListAssetsInput): Promise<AuthServiceResponse<ListedAsset>> {
    try {
      let response: ListedAsset;
      if (this.apiClient.type === "GRAPHQL") {
        const result = await this.apiClient.request<{
          listAssets: ListedAsset;
        }>({
          query: GRAPHQL_QUERIES.LIST_ASSETS,
          variables: { payload },
        });
        response = result.listAssets;
      } else {
        response = await this.apiClient.request<ListedAsset>({
          method: "POST",
          url: REST_ENDPOINTS.LIST_ASSETS,
          data: payload,
        });
      }
      return { success: true, data: response };
    } catch (error) {
      const message = error instanceof Error ? error.message : "An error occurred";
      return { success: false, message };
    }
  }

  async searchAssets(id: string): Promise<AuthServiceResponse<ListedAsset>> {
    try {
      let response: ListedAsset;
      if (this.apiClient.type === "GRAPHQL") {
        const result = await this.apiClient.request<{
          searchAssets: ListedAsset;
        }>({
          query: GRAPHQL_QUERIES.SEARCH_ASSETS,
          variables: { id },
        });
        response = result.searchAssets;
      } else {
        response = await this.apiClient.request<ListedAsset>({
          method: "GET",
          url: REST_ENDPOINTS.SEARCH_ASSETS,
          params: { id },
        });
      }
      return { success: true, data: response };
    } catch (error) {
      const message = error instanceof Error ? error.message : "An error occurred";
      return { success: false, message };
    }
  }
}

const listAssetsService = new ListAssetsService();
export default listAssetsService;
