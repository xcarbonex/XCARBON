import apiClient from "./apiClient";

// GraphQL Queries and Mutations
const GRAPHQL_QUERIES = {
  GET_CARBON_CREDIT: `
    query GetCarbonCredit {
      carbonCredits {
        id
        project_name
        vintage
        quantity
        price
      }
    }
  `,
  GET_NEWS: `
    query GetNews($category: String!) {
      news(category: $category) {
        id
        title
        content
        source
      }
    }
  `,
  GET_CARBON_CREDIT_INFO: `
    query GetCarbonCreditInfo($id: ID!) {
      carbonCredit(id: $id) {
        id
        project_name
        vintage
        issuance_year
        project_ID
        registry_name
      }
    }
  `,
  GET_CONTRACT_TERMS: `
    query GetContractTerms {
      contractTerms {
        id
        term
        value
      }
    }
  `,
  BUY_CARBON_CREDIT: `
    mutation BuyCarbonCredit($quantity: Int!) {
      buyCarbonCredit(quantity: $quantity) {
        success
        message
      }
    }
  `,
};

// REST API Endpoints
const REST_ENDPOINTS = {
  GET_CARBON_CREDIT: "/dashboard/carbon-credits",
  GET_NEWS: "/dashboard/news",
  GET_CARBON_CREDIT_INFO: "/dashboard/carbon-credit-info",
  GET_CONTRACT_TERMS: "/dashboard/contract-terms",
  BUY_CARBON_CREDIT: "/dashboard/buy-carbon-credit",
};

class DashboardService {
  constructor() {
    this.apiClient = apiClient;
  }

  async getCarbonCredit() {
    try {
      let response;
      if (this.apiClient.type === "GRAPHQL") {
        response = await this.apiClient.request({
          query: GRAPHQL_QUERIES.GET_CARBON_CREDIT,
        });
        response = response.carbonCredits;
      } else {
        response = await this.apiClient.request({
          method: "GET",
          url: REST_ENDPOINTS.GET_CARBON_CREDIT,
        });
      }
      return { success: true, data: response };
    } catch (error) {
      return { success: false, message: error.message };
    }
  }

  async getNews(category) {
    try {
      let response;
      if (this.apiClient.type === "GRAPHQL") {
        response = await this.apiClient.request({
          query: GRAPHQL_QUERIES.GET_NEWS,
          variables: { category },
        });
        response = response.news;
      } else {
        response = await this.apiClient.request({
          method: "GET",
          url: REST_ENDPOINTS.GET_NEWS,
          params: { category },
        });
      }
      return { success: true, data: response };
    } catch (error) {
      return { success: false, message: error.message };
    }
  }

  async getCarbonCreditInfo(id) {
    try {
      let response;
      if (this.apiClient.type === "GRAPHQL") {
        response = await this.apiClient.request({
          query: GRAPHQL_QUERIES.GET_CARBON_CREDIT_INFO,
          variables: { id },
        });
        response = response.carbonCredit;
      } else {
        response = await this.apiClient.request({
          method: "GET",
          url: REST_ENDPOINTS.GET_CARBON_CREDIT_INFO,
          params: { id },
        });
      }
      return { success: true, data: response };
    } catch (error) {
      return { success: false, message: error.message };
    }
  }

  async getContractTerms() {
    try {
      let response;
      if (this.apiClient.type === "GRAPHQL") {
        response = await this.apiClient.request({
          query: GRAPHQL_QUERIES.GET_CONTRACT_TERMS,
        });
        response = response.contractTerms;
      } else {
        response = await this.apiClient.request({
          method: "GET",
          url: REST_ENDPOINTS.GET_CONTRACT_TERMS,
        });
      }
      return { success: true, data: response };
    } catch (error) {
      return { success: false, message: error.message };
    }
  }

  async buyCarbonCredit(quantity) {
    try {
      let response;
      if (this.apiClient.type === "GRAPHQL") {
        response = await this.apiClient.request({
          query: GRAPHQL_QUERIES.BUY_CARBON_CREDIT,
          variables: { quantity },
        });
        response = response.buyCarbonCredit;
      } else {
        response = await this.apiClient.request({
          method: "POST",
          url: REST_ENDPOINTS.BUY_CARBON_CREDIT,
          data: { quantity },
        });
      }
      return { success: true, data: response };
    } catch (error) {
      return { success: false, message: error.message };
    }
  }
}

export default new DashboardService(); 