import apiClient from "./apiClient";
import type { AuthServiceResponse, UserSettings } from "@/types/api";

export interface DetailDocument {
  name: string;
  url: string;
  verified: boolean;
}

export interface UserDetail extends UserSettings {
  id?: string;
  name?: string;
  registrationNumber?: string;
  taxID?: string;
  phone?: string;
  address?: string;
  email?: string;
  documents?: DetailDocument[];
}

export interface UpdateDetailResponse {
  success: boolean;
  message: string;
}

// GraphQL Queries and Mutations
const GRAPHQL_QUERIES = {
  GET_DETAIL: `
    query GetDetail {
      detail {
        id
        name
        registrationNumber
        taxID
        phone
        address
        email
        documents {
          name
          url
          verified
        }
      }
    }
  `,
  UPDATE_DETAIL: `
    mutation UpdateDetail($input: UpdateDetailInput!) {
      updateDetail(input: $input) {
        success
        message
      }
    }
  `,
};

// REST API Endpoints
const REST_ENDPOINTS = {
  GET_DETAIL: "/settings/detail",
  UPDATE_DETAIL: "/settings/detail",
};

class SettingsService {
  private apiClient = apiClient;

  async getDetail(): Promise<AuthServiceResponse<UserDetail>> {
    try {
      let response: UserDetail;
      if (this.apiClient.type === "GRAPHQL") {
        const result = await this.apiClient.request<{ detail: UserDetail }>({
          query: GRAPHQL_QUERIES.GET_DETAIL,
        });
        response = result.detail;
      } else {
        response = await this.apiClient.request<UserDetail>({
          method: "GET",
          url: REST_ENDPOINTS.GET_DETAIL,
        });
      }
      return { success: true, data: response };
    } catch (error) {
      return {
        success: false,
        message: error instanceof Error ? error.message : "Failed to fetch details",
      };
    }
  }

  async updateDetail(
    input: Partial<UserDetail>
  ): Promise<AuthServiceResponse<UpdateDetailResponse>> {
    try {
      let response: UpdateDetailResponse;
      if (this.apiClient.type === "GRAPHQL") {
        const result = await this.apiClient.request<{ updateDetail: UpdateDetailResponse }>({
          query: GRAPHQL_QUERIES.UPDATE_DETAIL,
          variables: { input },
        });
        response = result.updateDetail;
      } else {
        response = await this.apiClient.request<UpdateDetailResponse>({
          method: "PUT",
          url: REST_ENDPOINTS.UPDATE_DETAIL,
          data: input,
        });
      }
      return { success: true, data: response };
    } catch (error) {
      return {
        success: false,
        message: error instanceof Error ? error.message : "Failed to update details",
      };
    }
  }
}

const settingsService = new SettingsService();
export default settingsService;
