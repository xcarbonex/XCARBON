import apiClient from "./apiClient";

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
  constructor() {
    this.apiClient = apiClient;
  }

  async getDetail() {
    try {
      let response;
      if (this.apiClient.type === "GRAPHQL") {
        response = await this.apiClient.request({
          query: GRAPHQL_QUERIES.GET_DETAIL,
        });
        response = response.detail;
      } else {
        response = await this.apiClient.request({
          method: "GET",
          url: REST_ENDPOINTS.GET_DETAIL,
        });
      }
      return { success: true, data: response };
    } catch (error) {
      return { success: false, message: error.message };
    }
  }

  async updateDetail(input) {
    try {
      let response;
      if (this.apiClient.type === "GRAPHQL") {
        response = await this.apiClient.request({
          query: GRAPHQL_QUERIES.UPDATE_DETAIL,
          variables: { input },
        });
        response = response.updateDetail;
      } else {
        response = await this.apiClient.request({
          method: "PUT",
          url: REST_ENDPOINTS.UPDATE_DETAIL,
          data: input,
        });
      }
      return { success: true, data: response };
    } catch (error) {
      return { success: false, message: error.message };
    }
  }
}

export default new SettingsService(); 